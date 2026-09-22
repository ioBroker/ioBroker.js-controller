import fs from 'fs-extra';
import { isLogLevelAtLeast, parseLogEntryHeader, tools } from '@iobroker/js-controller-common';

/** Rough estimate of the size of a log line, used to decide how much of the tail to read */
const BYTES_PER_LINE = 150;

/** Never read more than this from the end of the log file while looking for matching entries */
const MAX_READ_BYTES = 20 * 1024 * 1024;

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
 * Read the message of a `getLogs` request
 *
 * Historically the message was just the number of lines, so that form is still accepted. An object
 * additionally allows to ask for a minimum log level.
 *
 * @param message the message as received from the requester
 */
export function parseGetLogsMessage(message: unknown): GetLogsOptions {
    if (typeof message === 'number') {
        return { lines: message };
    }

    if (!message || typeof message !== 'object') {
        return {};
    }

    const { lines, logLevel } = message as Record<string, unknown>;

    return {
        lines: typeof lines === 'number' ? lines : undefined,
        logLevel: typeof logLevel === 'string' && tools.isLogLevel(logLevel) ? logLevel : undefined,
    };
}

/**
 * Keep only the entries of the wanted level or a more severe one
 *
 * A log entry can span several lines, e.g. a stack trace, and only its first line carries the
 * level. Those follow-up lines inherit the decision made for the entry they belong to, so a stack
 * trace is not cut in half.
 *
 * @param lines the log lines to filter
 * @param logLevel the lowest level to keep
 */
function filterByLevel(lines: string[], logLevel: ioBroker.LogLevel): string[] {
    const result: string[] = [];
    let keepEntry = false;

    for (const line of lines) {
        const header = parseLogEntryHeader(line);
        if (header) {
            keepEntry = isLogLevelAtLeast(header.level, logLevel);
        }

        if (keepEntry) {
            result.push(line);
        }
    }

    return result;
}

/**
 * Read a chunk from the end of a file
 *
 * @param fileName the file to read
 * @param start byte offset to start at
 * @param end byte offset to stop at
 */
async function readChunk(fileName: string, start: number, end: number): Promise<string> {
    const length = end - start;

    if (length <= 0) {
        return '';
    }

    const fd = await fs.open(fileName, 'r');

    try {
        const buffer = Buffer.alloc(length);
        const { bytesRead } = await fs.read(fd, buffer, 0, length, start);

        return buffer.subarray(0, bytesRead).toString();
    } finally {
        await fs.close(fd);
    }
}

/**
 * Trim to the last `wanted` lines without cutting an entry in half
 *
 * Slicing on line boundaries would undo what {@link filterByLevel} is for: when the cut lands
 * inside a multi-line entry, the caller gets orphaned stack frames whose header is gone. So the
 * window is extended backwards to the header of the entry it starts in, which is bounded by the
 * length of that one entry.
 *
 * @param lines the filtered log lines, oldest first
 * @param wanted how many lines were asked for
 */
function trimToEntries(lines: string[], wanted: number): string[] {
    if (lines.length <= wanted) {
        return lines;
    }

    let start = lines.length - wanted;
    while (start > 0 && !parseLogEntryHeader(lines[start])) {
        start--;
    }

    return lines.slice(start);
}

/**
 * Read the last lines of a log file
 *
 * Without a `logLevel` this reads a single chunk sized by the number of requested lines, which is
 * what this has always done. With a `logLevel` the matching entries are usually spread over a much
 * larger part of the file, so the window is enlarged until enough entries were found, the beginning
 * of the file is reached or `MAX_READ_BYTES` is hit.
 *
 * @param fileName the log file to read
 * @param options how many lines and which minimum level
 */
export async function readLogTail(fileName: string, options: GetLogsOptions): Promise<LogTail> {
    const { size } = await fs.stat(fileName);
    const wanted = options.lines || 200;

    let windowSize = BYTES_PER_LINE * wanted;
    let lines: string[] = [];

    while (true) {
        const start = size > windowSize ? size - windowSize : 0;
        const text = await readChunk(fileName, start, size);

        lines = text.split('\n');

        if (start) {
            // the first line can be incomplete when we did not start at the beginning of the file
            lines.shift();
        }

        if (!options.logLevel) {
            return { lines, size };
        }

        lines = filterByLevel(lines, options.logLevel);

        if (lines.length >= wanted || start === 0 || windowSize >= MAX_READ_BYTES) {
            break;
        }

        windowSize = Math.min(windowSize * 4, MAX_READ_BYTES);
    }

    // the enlarged window can hold more entries than asked for
    return { lines: trimToEntries(lines, wanted), size };
}
