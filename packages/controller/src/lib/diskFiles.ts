import fs from 'node:fs/promises';
import { diskFiles } from '@iobroker/js-controller-common';

/** One piece of a file, as `sendToHost(host, 'readDiskFile', ...)` answers */
export interface DiskFileChunk {
    /** Size of the whole file in bytes */
    size: number;
    /** Modification time of the file in ms, to notice a file that changes while it is read */
    mtime: number;
    /** Position of `data` in the file */
    offset: number;
    /** The bytes from `offset` on, base64 encoded; empty at the end of the file */
    data: string;
}

/**
 * Check that a value is an integer in the given range, or use the default if it is not given
 *
 * @param value received value
 * @param name name of the attribute for the error message
 * @param min smallest allowed value
 * @param max largest allowed value
 * @param defaultValue value if nothing was given
 */
function readInteger(value: unknown, name: string, min: number, max: number, defaultValue: number): number {
    if (value === undefined || value === null) {
        return defaultValue;
    }
    if (typeof value !== 'number' || !Number.isInteger(value) || value < min || value > max) {
        throw new Error(`invalid ${name} ${JSON.stringify(value)}`);
    }
    return value;
}

/**
 * Read one piece of a file below the data directory of an instance, for `sendToHost(host, 'readDiskFile', ...)`
 *
 * The message is `{ namespace, path, offset?, length? }` - the parts of an `iobdisk://` URL plus the range to read.
 * Files are handed out in pieces, so that a big file (e.g. a video) neither has to be held in memory as a whole nor
 * goes through the states DB as one huge message.
 *
 * @param message the received message
 * @returns the piece of the file and the size of the whole file
 * @throws {Error} if the message is invalid or the file cannot be read
 */
export async function readDiskFileChunk(message: unknown): Promise<DiskFileChunk> {
    if (!message || typeof message !== 'object' || Array.isArray(message)) {
        throw new Error('invalid message, expected { namespace, path, offset, length }');
    }
    const request = message as Record<string, unknown>;
    const offset = readInteger(request.offset, 'offset', 0, Number.MAX_SAFE_INTEGER, 0);
    const length = readInteger(
        request.length,
        'length',
        1,
        diskFiles.DISK_FILE_MAX_CHUNK_SIZE,
        diskFiles.DISK_FILE_CHUNK_SIZE,
    );

    const file = await diskFiles.resolveDiskFile(request.namespace, request.path);
    const handle = await fs.open(file, 'r');
    try {
        const stat = await handle.stat();
        const toRead = Math.max(0, Math.min(length, stat.size - offset));
        const buffer = Buffer.alloc(toRead);
        let read = 0;
        while (read < toRead) {
            const { bytesRead } = await handle.read(buffer, read, toRead - read, offset + read);
            if (!bytesRead) {
                break;
            }
            read += bytesRead;
        }
        return {
            size: stat.size,
            mtime: stat.mtimeMs,
            offset,
            data: buffer.subarray(0, read).toString('base64'),
        };
    } finally {
        await handle.close();
    }
}

/**
 * Delete a file below the data directory of an instance, for `sendToHost(host, 'deleteDiskFile', ...)`
 *
 * The message is `{ namespace, path }` - the parts of an `iobdisk://` URL. Only a regular file is deleted, never a
 * directory or anything outside the data directory of the instance.
 *
 * @param message the received message
 * @returns whether the file was deleted (`false` if it did not exist)
 * @throws {Error} if the message is invalid or the file cannot be deleted
 */
export async function deleteRequestedDiskFile(message: unknown): Promise<{ deleted: boolean }> {
    if (!message || typeof message !== 'object' || Array.isArray(message)) {
        throw new Error('invalid message, expected { namespace, path }');
    }
    const request = message as Record<string, unknown>;
    return { deleted: await diskFiles.deleteDiskFile(request.namespace, request.path) };
}
