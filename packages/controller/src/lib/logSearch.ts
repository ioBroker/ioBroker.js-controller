/**
 * Search in the log files of this host, for the host command `searchLogs`
 *
 * The Log tab of admin sends its filters and gets only the matching entries back, instead of requesting
 * every log file with `getLogFile` and searching it itself.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createInterface } from 'node:readline';
import { createGunzip } from 'node:zlib';

type LogLevel = 'silly' | 'debug' | 'info' | 'warn' | 'error';

/** Log levels from the least to the most severe */
const LOG_LEVELS: LogLevel[] = ['silly', 'debug', 'info', 'warn', 'error'];

/** More entries are never returned, whatever the request asks for */
const MAX_ROWS_LIMIT = 5000;

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const ANSI_ESCAPE = new RegExp(`${String.fromCharCode(27)}\\[[0-?]*[ -/]*[@-~]`, 'g');

/**
 * A line that starts a log entry, without color codes: `2026-09-16 10:11:12.123  - info: admin.0 (1234) text`
 *
 * Groups: 1 date, 2 time, 3 level, 4 everything after the level (source, PID and text), 5 source
 */
const LOG_LINE =
    /^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?)\s+-\s+(silly|debug|info|warn|error):\s+((\S+).*)$/i;

/** Message of the host command `searchLogs` */
export interface SearchLogsMessage {
    /** How many hours to look back */
    hours?: unknown;
    /** Only entries of this level and the more severe ones */
    level?: unknown;
    /** Only entries of this source, e.g. `admin.0` or `host.raspi` */
    source?: unknown;
    /** Only entries that contain this text, case-insensitive */
    text?: unknown;
    /** Return at most this many entries - the newest ones */
    maxRows?: unknown;
}

/** Answer of the host command `searchLogs` */
export interface SearchLogsResult {
    /**
     * The matching entries, oldest first, exactly as written in the file - color codes included. An entry
     * that spans several lines, like a stack trace, holds them joined by `\n`.
     */
    lines: string[];
    /** More entries match than were returned */
    truncated: boolean;
    /** Number of files that were read */
    files: number;
    /**
     * The files were read up to this time. An entry logged later is not in `lines`, so a client that
     * receives the live log can take everything newer than this from there without duplicates.
     */
    until: number;
}

/** A log entry while it is being collected */
interface Entry {
    ts: number;
    level: LogLevel;
    source: string;
    /** Source, PID and text without color codes, the continuation lines included */
    message: string;
    /** Lines as written in the file */
    raw: string[];
}

/**
 * Directory and naming of the rotated log files, taken from the file the logger writes now.
 *
 * @param currentFile path of this file, e.g. `/opt/iobroker/log/iobroker.2026-09-16.log`
 * @returns `null` if the name has no date, which a file written by the logger always has
 */
export function getLogFiles(currentFile: string): { directory: string; pattern: RegExp } | null {
    const match = path.basename(currentFile).match(/^(.+)\.\d{4}-\d{2}-\d{2}(?:\.\d+)?(.*)$/);
    if (!match) {
        return null;
    }
    const escape = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return {
        directory: path.dirname(currentFile),
        // Groups: 1 year, 2 month, 3 day, 4 counter - only present if a `maxSize` is configured
        pattern: new RegExp(
            `^${escape(match[1])}\\.(\\d{4})-(\\d{2})-(\\d{2})(?:\\.(\\d+))?${escape(match[2])}(?:\\.gz)?$`,
        ),
    };
}

/**
 * Read a log file line by line.
 *
 * @param file path of the file
 * @param onLine called for every line
 * @returns `false` if the file does not exist anymore, e.g. because it was compressed in the meantime
 */
async function readLines(file: string, onLine: (line: string) => void): Promise<boolean> {
    let options: { start: number; end: number } | undefined;
    if (!file.endsWith('.gz')) {
        let size: number;
        try {
            size = (await fs.promises.stat(file)).size;
        } catch {
            return false;
        }
        if (!size) {
            return true;
        }
        // only as much as the file had now, so that a line that is being written is not read half
        options = { start: 0, end: size - 1 };
    }

    const input = fs.createReadStream(file, options);
    const stream = file.endsWith('.gz') ? input.pipe(createGunzip()) : input;
    const reader = createInterface({ input: stream, crlfDelay: Infinity });
    try {
        for await (const line of reader) {
            onLine(line);
        }
        return true;
    } catch {
        return false;
    } finally {
        reader.close();
        input.destroy();
        stream.destroy();
    }
}

/**
 * Search the log files of this host.
 *
 * The files are read from the newest to the oldest, and the reading stops as soon as enough entries were
 * found. Lines that do not start with a time stamp belong to the entry above them.
 *
 * @param currentFile path of the file the logger writes now
 * @param message the filters
 * @param now current time, for tests
 */
export async function searchLogFiles(
    currentFile: string,
    message: SearchLogsMessage | null | undefined,
    now = Date.now(),
): Promise<SearchLogsResult> {
    const logFiles = currentFile ? getLogFiles(currentFile) : null;
    if (!logFiles) {
        throw new Error('This host does not write a log file');
    }

    const until = now;
    const minTs = until - Math.max(1, Number(message?.hours) || 1) * 60 * 60 * 1000;
    const maxRows = Math.min(Math.max(1, Math.floor(Number(message?.maxRows) || 500)), MAX_ROWS_LIMIT);
    const minLevel = Math.max(0, LOG_LEVELS.indexOf(message?.level as LogLevel));
    const source = typeof message?.source === 'string' ? message.source : '';
    const needle = typeof message?.text === 'string' ? message.text.toLowerCase() : '';

    let names: string[];
    try {
        names = await fs.promises.readdir(logFiles.directory);
    } catch (e) {
        throw new Error(`Cannot read the log directory ${logFiles.directory}: ${e.message}`);
    }

    const selected: { name: string; day: string; counter: number }[] = [];
    for (const name of names) {
        const match = name.match(logFiles.pattern);
        if (!match) {
            continue;
        }
        const [, year, month, day, counter] = match;
        const dayStart = new Date(Number(year), Number(month) - 1, Number(day)).getTime();
        // a file is written during its day, so a file of an earlier day cannot hold newer entries
        if (dayStart + ONE_DAY_MS > minTs && dayStart <= until) {
            selected.push({ name, day: `${year}-${month}-${day}`, counter: counter ? Number(counter) : 0 });
        }
    }
    selected.sort((a, b) => (a.day === b.day ? b.counter - a.counter : a.day < b.day ? 1 : -1));

    /** The newest matches, oldest first */
    let result: string[] = [];
    let truncated = false;
    let files = 0;

    for (let f = 0; f < selected.length; f++) {
        // Keep one match more than needed: it tells that the result is truncated
        const needed = maxRows - result.length;
        let matches: string[] = [];
        let entry: Entry | null = null;

        const finish = (): void => {
            if (
                entry &&
                entry.ts >= minTs &&
                entry.ts <= until &&
                LOG_LEVELS.indexOf(entry.level) >= minLevel &&
                (!source || entry.source === source) &&
                (!needle || entry.message.toLowerCase().includes(needle))
            ) {
                matches.push(entry.raw.join('\n'));
                // the older matches of this file are not needed anymore; cut them in blocks
                if (matches.length > needed * 2 + 1) {
                    matches = matches.slice(matches.length - needed - 1);
                }
            }
            entry = null;
        };

        const read = await readLines(path.join(logFiles.directory, selected[f].name), line => {
            const plain = line.replace(ANSI_ESCAPE, '');
            const match = plain.match(LOG_LINE);
            if (match) {
                finish();
                entry = {
                    ts: new Date(`${match[1]}T${match[2]}`).getTime(),
                    level: match[3].toLowerCase() as LogLevel,
                    source: match[5],
                    message: match[4],
                    raw: [line],
                };
            } else if (entry && line) {
                // continuation of a multi-line entry, e.g. a stack trace
                entry.message += `\n${plain}`;
                entry.raw.push(line);
            }
        });
        if (!read) {
            // rotated or compressed in the meantime
            continue;
        }
        finish();
        files++;

        if (matches.length > needed) {
            truncated = true;
            matches = matches.slice(matches.length - needed);
        }
        result = matches.concat(result);

        if (result.length >= maxRows) {
            // older files are not read, so there may be more entries
            truncated ||= f < selected.length - 1;
            break;
        }
    }

    return { lines: result, truncated, files, until };
}
