/**
 * Reading the log files the logger of js-controller writes
 *
 * An entry starts with a line like `2026-09-16 10:11:12.123  - info: admin.0 (1234) text`. The level can be wrapped
 * in color codes when colored output is configured, and an entry can go on over further lines - a stack trace -
 * which carry no time stamp. Everything that reads these files has to tell the two apart in the same way, the host
 * commands `getLogs` and `searchLogs` as well as `iobroker logs`, which is why it lives here and not next to one of
 * them.
 */

/** Log levels from the least to the most severe */
export const LOG_LEVELS: readonly ioBroker.LogLevel[] = ['silly', 'debug', 'info', 'warn', 'error'];

/** Color codes, and any other ANSI escape sequence the logger may put around parts of a line */
const ANSI_ESCAPE = new RegExp(`${String.fromCharCode(27)}\\[[0-?]*[ -/]*[@-~]`, 'g');

/**
 * The first line of an entry, once the color codes are gone
 *
 * Anchored at the time stamp on purpose. Without the anchor a level anywhere in the line counts, so a message which
 * quotes one - a parser error, a forwarded log line, a configuration dump - matches, and a line of a stack trace
 * which happens to contain one is taken for the start of a new entry. Lines that continue an entry never carry a
 * time stamp, which is what tells the two apart.
 *
 * Groups: 1 date, 2 time, 3 level, 4 everything after the level (source, PID and text), 5 source
 */
const ENTRY_HEADER =
    /^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?)\s+-\s+(silly|debug|info|warn|error):(?:\s+((\S+).*))?$/i;

/** What the first line of a log entry says about the entry */
export interface LogEntryHeader {
    /** Time of the entry in ms, read as local time - the way the logger writes it */
    ts: number;
    /** Level of the entry */
    level: ioBroker.LogLevel;
    /** Who logged it, e.g. "admin.0" or "host.raspi" */
    source: string;
    /** Everything after the level - source, PID and text - without color codes */
    message: string;
}

/**
 * Remove the color codes from a log line
 *
 * @param line a line as written to the log file
 */
export function stripLogColors(line: string): string {
    return line.replace(ANSI_ESCAPE, '');
}

/**
 * Read the first line of a log entry
 *
 * @param line a line as written to the log file, color codes included
 * @returns what the line says about its entry, or `null` if it does not start one - it continues the entry above
 *   it, or it is no log line at all
 */
export function parseLogEntryHeader(line: string): LogEntryHeader | null {
    const match = stripLogColors(line).match(ENTRY_HEADER);
    if (!match) {
        return null;
    }

    const [, date, time, level, message, source] = match;

    return {
        ts: new Date(`${date}T${time}`).getTime(),
        level: level!.toLowerCase() as ioBroker.LogLevel,
        source: source ?? '',
        message: message ?? '',
    };
}

/**
 * Check whether a level is at least as severe as another one
 *
 * @param level the level of an entry
 * @param minimum the least severe level that is still wanted
 */
export function isLogLevelAtLeast(level: ioBroker.LogLevel, minimum: ioBroker.LogLevel): boolean {
    return LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(minimum);
}
