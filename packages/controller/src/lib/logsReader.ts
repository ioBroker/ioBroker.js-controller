import fs from 'fs-extra';
import { isLogLevelAtLeast, parseLogEntryHeader, tools } from '@iobroker/js-controller-common';

/** Rough estimate of the size of a log line, used to decide how much of the tail to read */
const BYTES_PER_LINE = 150;

/** How many lines are returned when the request does not say */
const DEFAULT_LINES = 200;

/** How a request with a `logLevel` reads the file */
export interface ReadLimits {
    /** Bytes read at once, which is about what is held in memory besides the result */
    chunkBytes: number;
    /** Never read more than this from the end of the log file while looking for matching entries */
    maxBytes: number;
}

const DEFAULT_LIMITS: ReadLimits = { chunkBytes: 256 * 1024, maxBytes: 20 * 1024 * 1024 };

/** Options of a `getLogs` request */
export interface GetLogsOptions {
    /**
     * How many lines to read, defaults to 200
     *
     * A guide rather than a hard limit: with a `logLevel` the result is trimmed to this many lines,
     * but never in the middle of a multi-line entry, so a few more can come back when the cut would
     * land inside a stack trace. Without a `logLevel` this only sizes the read window, as it always
     * did, and the result can be longer.
     */
    lines?: number;
    /** If given, only entries of this level and more severe ones are returned */
    logLevel?: ioBroker.LogLevel;
}

/** The tail of a log file together with its current size */
export interface LogTail {
    /** The log lines, oldest first */
    lines: string[];
    /** Current size of the log file in bytes */
    size: number;
}

/**
 * Reading the log file failed after its size was known
 *
 * The size is the last element of every `getLogs` answer and requesters continue from it, so it is
 * still worth answering with when the lines cannot be read, e.g. while the file is being rotated.
 */
export class LogReadError extends Error {
    /** Size of the log file in bytes */
    readonly size: number;

    /**
     * @param size size of the log file in bytes
     * @param cause why reading failed
     */
    constructor(size: number, cause: Error) {
        super(cause.message, { cause });
        this.name = 'LogReadError';
        this.size = size;
    }
}

/**
 * Read the number of lines of a request
 *
 * The old handler multiplied the message directly, so a number sent as a string worked by coercion,
 * and it keeps working. Anything that is not at least one line means the default.
 *
 * @param value the number of lines as received
 */
function toLineCount(value: unknown): number | undefined {
    const lines = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;

    if (typeof lines !== 'number' || !Number.isFinite(lines) || lines < 1) {
        return undefined;
    }

    return Math.floor(lines);
}

/**
 * Read the message of a `getLogs` request
 *
 * Historically the message was just the number of lines, so that form is still accepted. An object
 * additionally allows to ask for a minimum log level.
 *
 * @param message the message as received from the requester
 */
export function parseGetLogsMessage(message: unknown): GetLogsOptions {
    if (!message || typeof message !== 'object') {
        const lines = toLineCount(message);
        return lines === undefined ? {} : { lines };
    }

    return {
        lines: 'lines' in message ? toLineCount(message.lines) : undefined,
        logLevel:
            'logLevel' in message && typeof message.logLevel === 'string' && tools.isLogLevel(message.logLevel)
                ? message.logLevel
                : undefined,
    };
}

/**
 * Read a range of an open file
 *
 * A single `read` may return less than asked for without having reached the end of the file. Taken
 * as complete, that would silently drop the end of the range, which is the newest part of the log.
 *
 * @param fd the open file
 * @param start byte offset to start at
 * @param end byte offset to stop at
 */
async function readRange(fd: number, start: number, end: number): Promise<Buffer> {
    // only the part that was read is returned, so the buffer does not have to be zeroed
    const buffer = Buffer.allocUnsafe(Math.max(0, end - start));
    let filled = 0;

    while (filled < buffer.length) {
        const { bytesRead } = await fs.read(fd, buffer, filled, buffer.length - filled, start + filled);
        if (!bytesRead) {
            break;
        }
        filled += bytesRead;
    }

    return buffer.subarray(0, filled);
}

/**
 * Read the tail of the file in one piece, sized by the number of lines, which is what `getLogs` has
 * always done
 *
 * @param fd the open log file
 * @param size size of the file when the request came in
 * @param wanted how many lines were asked for
 */
async function readWindow(fd: number, size: number, wanted: number): Promise<string[]> {
    const start = Math.max(0, size - BYTES_PER_LINE * wanted);
    const lines = (await readRange(fd, start, size)).toString().split('\n');

    if (start) {
        // the first line can be incomplete when we did not start at the beginning of the file
        lines.shift();
    }

    return lines;
}

/**
 * Collect the newest entries of a level and the more severe ones
 *
 * The entries of one level are spread over a much larger part of the file than the same number of
 * lines, so the file is read backwards chunk by chunk until enough entries were found, the beginning
 * of the file is reached or `maxBytes` were read. Only one chunk is held at a time, and every byte is
 * read once.
 *
 * Read backwards, the follow-up lines of an entry - a stack trace - come before its first line, which
 * is the only one that carries the level. So they wait until their first line decides whether the
 * entry is wanted. Follow-up lines whose first line is never reached are dropped, rather than
 * returned without it.
 *
 * Whole entries are added, the newest first, until there are at least `wanted` lines. So a few more
 * can come back when the last entry is a stack trace, but never a stack trace without its header.
 *
 * @param fd the open log file
 * @param size size of the file when the request came in
 * @param wanted how many lines were asked for
 * @param minLevel the least severe level that is still wanted
 * @param limits chunk size and how far back to read at most
 * @returns the lines of the matching entries, oldest first
 */
async function readEntries(
    fd: number,
    size: number,
    wanted: number,
    minLevel: ioBroker.LogLevel,
    limits: ReadLimits,
): Promise<string[]> {
    /** The lines of the matching entries, newest first */
    const found: string[] = [];
    /** Lines that continue an entry whose first line is further back in the file, newest first */
    let followUps: string[] = [];
    /** The beginning of the chunk read last, up to its first line break: the end of a line that starts further back */
    let partial: Buffer = Buffer.alloc(0);
    let start = size;

    while (start > 0 && size - start < limits.maxBytes && found.length < wanted) {
        const end = start;
        start = Math.max(0, end - limits.chunkBytes, size - limits.maxBytes);

        const chunk = Buffer.concat([await readRange(fd, start, end), partial]);
        let complete: Buffer = chunk;

        if (start) {
            // The chunk can start in the middle of a line, and even of a character: keep that part as
            // bytes until the chunk before it is read. A line break byte is never part of a character.
            const lineBreak = chunk.indexOf(0x0a);
            if (lineBreak === -1) {
                partial = chunk;
                continue;
            }
            partial = chunk.subarray(0, lineBreak);
            complete = chunk.subarray(lineBreak + 1);
        }

        const lines = complete.toString().split('\n');

        for (let i = lines.length - 1; i >= 0 && found.length < wanted; i--) {
            const header = parseLogEntryHeader(lines[i]);

            if (!header) {
                followUps.push(lines[i]);
                continue;
            }

            if (isLogLevelAtLeast(header.level, minLevel)) {
                for (const line of followUps) {
                    found.push(line);
                }
                found.push(lines[i]);
            }
            followUps = [];
        }
    }

    return found.reverse();
}

/**
 * Read the last lines of a log file
 *
 * Without a `logLevel` this reads a single chunk sized by the number of requested lines, which is
 * what this has always done. With a `logLevel` the file is read backwards until enough matching
 * entries were found, see {@link readEntries}.
 *
 * @param fileName the log file to read
 * @param options how many lines and which minimum level
 * @param limits how a request with a `logLevel` reads the file, only changed by tests
 * @throws {LogReadError} if the file could be measured but not read
 */
export async function readLogTail(
    fileName: string,
    options: GetLogsOptions,
    limits: ReadLimits = DEFAULT_LIMITS,
): Promise<LogTail> {
    const wanted = toLineCount(options.lines) ?? DEFAULT_LINES;

    let fd: number;
    try {
        fd = await fs.open(fileName, 'r');
    } catch (e) {
        // a file that exists but cannot be opened, e.g. while it is rotated, is still answered with its size
        throw new LogReadError((await fs.stat(fileName)).size, e);
    }

    try {
        // the size of the open file, not of the path: during a rotation the two can be different files
        const { size } = await fs.fstat(fd);

        try {
            const lines = options.logLevel
                ? await readEntries(fd, size, wanted, options.logLevel, limits)
                : await readWindow(fd, size, wanted);

            return { lines, size };
        } catch (e) {
            throw new LogReadError(size, e);
        }
    } finally {
        await fs.close(fd);
    }
}
