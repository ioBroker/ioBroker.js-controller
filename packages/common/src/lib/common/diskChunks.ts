/**
 * How a file on the disk of a host goes to a requester on another host: piece by piece
 *
 * Every host command that hands out a file - `readAdapterFile`, `readAdapterFiles` and `readDiskFile` - answers with
 * the same {@link FileChunk}: the size and the modification time of the whole file, the position of the piece and the
 * piece itself, base64 encoded and, on request, compressed with gzip. Pieces of 1 MB by default and 4 MB at most keep
 * a big file (e.g. a video) out of memory as a whole and out of the states DB as one huge message. The requester
 * notices a file that changes while it is read by a different `size` or `mtime` of a later piece.
 *
 * gzip runs in the thread pool of Node.js and does not hold up the js-controller. Files that are compressed already
 * (images, videos, fonts, archives) and tiny pieces are handed out as they are.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import zlib from 'node:zlib';

/** Size of one piece of a file, as handed out by default */
export const FILE_CHUNK_SIZE = 1024 * 1024;

/** The largest piece of a file one answer holds */
export const FILE_MAX_CHUNK_SIZE = 4 * 1024 * 1024;

/** A piece smaller than this is not compressed, as gzip would win nearly nothing */
const MIN_COMPRESS_SIZE = 256;

/** Files that are compressed already, so gzip would only cost time */
const COMPRESSED_EXTENSIONS = new Set([
    '.7z',
    '.avif',
    '.br',
    '.gif',
    '.gz',
    '.jpeg',
    '.jpg',
    '.mkv',
    '.mov',
    '.mp3',
    '.mp4',
    '.ogg',
    '.png',
    '.tgz',
    '.webm',
    '.webp',
    '.woff',
    '.woff2',
    '.zip',
]);

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

/** One piece of a file, as the host commands hand it out */
export interface FileChunk {
    /** Size of the whole file in bytes */
    size: number;
    /** Time of the last modification of the file in ms, to notice a file that changes while it is read */
    mtime: number;
    /** Position of `data` in the file */
    offset: number;
    /** The bytes from `offset` on, base64 encoded; empty at the end of the file */
    data: string;
    /** Whether `data` was compressed with gzip before it was base64 encoded; `offset` and `size` count raw bytes */
    compressed?: boolean;
}

/** One piece of a file as read from the disk */
export interface FilePiece {
    /** Size of the whole file in bytes */
    size: number;
    /** Time of the last modification of the file in ms */
    mtime: number;
    /** Position of `buffer` in the file */
    offset: number;
    /** The read bytes */
    buffer: Buffer;
}

/**
 * Check that a value is an integer in the given range, or use the default if it is not given
 *
 * @param value received value
 * @param name name of the attribute for the error message
 * @param min smallest allowed value
 * @param max largest allowed value
 * @param defaultValue value if nothing was given
 * @throws {Error} if the value is given but no integer in the range
 */
export function readInteger(value: unknown, name: string, min: number, max: number, defaultValue: number): number {
    if (value === undefined || value === null) {
        return defaultValue;
    }
    if (typeof value !== 'number' || !Number.isInteger(value) || value < min || value > max) {
        throw new Error(`invalid ${name} ${JSON.stringify(value)}`);
    }
    return value;
}

/**
 * Check the flag that allows compressed pieces
 *
 * @param compress received value
 * @throws {Error} if it is given but no boolean
 */
export function readCompress(compress: unknown): boolean {
    if (compress !== undefined && compress !== null && typeof compress !== 'boolean') {
        throw new Error(`invalid compress ${JSON.stringify(compress)}`);
    }
    return compress === true;
}

/**
 * Read one piece of a file from the disk
 *
 * The caller has checked already that `file` may be read; here it is only checked to be a regular file, on the opened
 * file, so that it cannot be swapped between the check and the reading.
 *
 * @param file absolute path of the file
 * @param start position in the file to read from
 * @param toRead how many bytes to read at most
 * @param name how the file is called in an error message
 * @throws {Error} if it is no regular file
 */
export async function readPiece(file: string, start: number, toRead: number, name: string): Promise<FilePiece> {
    const handle = await fs.open(file, 'r');
    try {
        const stat = await handle.stat();
        if (!stat.isFile()) {
            throw new Error(`"${name}" is no file`);
        }
        const buffer = Buffer.alloc(Math.max(0, Math.min(toRead, stat.size - start)));
        let read = 0;
        while (read < buffer.length) {
            const { bytesRead } = await handle.read(buffer, read, buffer.length - read, start + read);
            if (!bytesRead) {
                break;
            }
            read += bytesRead;
        }
        return { size: stat.size, mtime: stat.mtimeMs, offset: start, buffer: buffer.subarray(0, read) };
    } finally {
        await handle.close();
    }
}

/**
 * Encode a piece for the answer, compressed if asked for and if it gets smaller by it
 *
 * @param piece the read piece
 * @param name name or path of the file, whose extension tells whether it is compressed already
 * @param compress whether the requester can take compressed pieces
 */
export async function encodePiece(piece: FilePiece, name: string, compress: boolean): Promise<FileChunk> {
    const { size, mtime, offset, buffer } = piece;
    if (
        compress &&
        buffer.length >= MIN_COMPRESS_SIZE &&
        !COMPRESSED_EXTENSIONS.has(path.extname(name).toLowerCase())
    ) {
        const packed = await gzip(buffer);
        if (packed.length < buffer.length) {
            return { size, mtime, offset, data: packed.toString('base64'), compressed: true };
        }
    }
    return { size, mtime, offset, data: buffer.toString('base64') };
}

/**
 * Read one piece of a file and encode it for the answer - what every host command that hands out a file does
 *
 * @param file absolute path of the file, already checked to be allowed
 * @param name how the file is called in an error message, and whose extension decides about the compression
 * @param offset received position in the file to read from, 0 if not given
 * @param length received number of bytes to read at most, {@link FILE_CHUNK_SIZE} if not given
 * @param compress received flag whether the piece may be compressed with gzip
 * @throws {Error} if `offset`, `length` or `compress` is invalid, or the file is no regular file
 */
export async function readChunk(
    file: string,
    name: string,
    offset?: unknown,
    length?: unknown,
    compress?: unknown,
): Promise<FileChunk> {
    const start = readInteger(offset, 'offset', 0, Number.MAX_SAFE_INTEGER, 0);
    const toRead = readInteger(length, 'length', 1, FILE_MAX_CHUNK_SIZE, FILE_CHUNK_SIZE);
    const mayCompress = readCompress(compress);
    return encodePiece(await readPiece(file, start, toRead, name), name, mayCompress);
}

/**
 * The raw bytes of a received piece, decompressed if the host compressed it
 *
 * @param chunk the received piece
 * @param chunk.data the bytes, base64 encoded
 * @param chunk.compressed whether the bytes are compressed with gzip
 * @param maxLength how many bytes the piece may hold at most, which also limits the decompression
 * @throws {Error} if `data` is no string, cannot be decompressed or is longer than `maxLength`
 */
export async function decodeChunkData(
    chunk: { data?: unknown; compressed?: unknown },
    maxLength: number,
): Promise<Buffer> {
    if (typeof chunk.data !== 'string') {
        throw new Error('invalid data');
    }
    const raw = Buffer.from(chunk.data, 'base64');
    if (chunk.compressed !== true) {
        if (raw.length > maxLength) {
            throw new Error('the piece is longer than expected');
        }
        return raw;
    }
    try {
        // limited, so that a small answer cannot blow up to any size
        return await gunzip(raw, { maxOutputLength: Math.max(1, maxLength) });
    } catch (e) {
        throw new Error(`the piece cannot be decompressed: ${e.message}`);
    }
}
