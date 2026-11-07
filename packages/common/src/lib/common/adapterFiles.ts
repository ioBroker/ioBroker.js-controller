/**
 * Reading a directory of an installed adapter, also for an instance on another host
 *
 * An adapter only exists on the hosts it is installed on, so its package directory - e.g. the `widgets` folder that
 * vis-2 collects - can only be read there. The js-controller of that host hands it out with the host commands
 * `listAdapterDir`, `readAdapterFile` and `readAdapterFiles`, which use the functions here, and the adapter side
 * (`fetchAdapterDir`) checks the paths it gets back with them before it writes anything.
 *
 * On request the pieces are compressed with gzip - the files of a widget set are mostly JavaScript, JSON and CSS and
 * shrink to a third or a quarter. This runs in the thread pool of Node.js and does not hold up the js-controller.
 *
 * Only the package directory of an adapter can be read, and not all of it: everything below `node_modules` and
 * every file or directory whose name starts with a dot (`.git`, `.env`, ...) is left out, symbolic links are not
 * followed, and the js-controller itself is no adapter in this sense. The checks that keep a path inside the package
 * are shared with `readDiskDir`, see `diskPaths.ts`.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import zlib from 'node:zlib';
import { tools } from '@iobroker/js-controller-common-db';
import { DISK_DIR_MAX_ENTRIES, isHiddenName, isInside } from './diskPaths.js';

/** Size of one piece of a file, as `readAdapterFile` hands it out by default */
export const ADAPTER_FILE_CHUNK_SIZE = 1024 * 1024;

/** The largest piece of a file one `readAdapterFile` hands out */
export const ADAPTER_FILE_MAX_CHUNK_SIZE = 4 * 1024 * 1024;

/** The most files a directory listing contains - a widgets folder has some hundred */
export const ADAPTER_DIR_MAX_FILES = DISK_DIR_MAX_ENTRIES;

/** The most files one `readAdapterFiles` hands out */
export const ADAPTER_FILES_MAX_BATCH = 100;

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

/** The longest relative path that is accepted */
const MAX_PATH_LENGTH = 1_024;

/** Name of an adapter without `iobroker.` and without instance number, e.g. `vis-2-widgets-material` */
const ADAPTER_NAME = /^[a-z0-9][a-z0-9_-]*$/i;

/** One file of a directory listing */
export interface AdapterFileEntry {
    /** Path of the file relative to the listed directory, separated by `/` */
    path: string;
    /** Size in bytes */
    size: number;
    /** Time of the last modification in ms */
    mtime: number;
}

/** One piece of a file, as `readAdapterFile` hands it out */
export interface AdapterFileChunk {
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

/** The beginning of one file, as `readAdapterFiles` hands it out */
export interface AdapterFilesEntry extends AdapterFileChunk {
    /** The file as it was requested */
    path: string;
}

/** One piece of a file as read from the disk */
interface FilePiece {
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
 * Check the name of an adapter
 *
 * @param adapter e.g. `wattcycle`, without `iobroker.` and without instance number
 * @returns the name
 * @throws {Error} if it is no valid adapter name or names the js-controller
 */
export function checkAdapterName(adapter: unknown): string {
    if (typeof adapter !== 'string' || !ADAPTER_NAME.test(adapter)) {
        throw new Error(`invalid adapter name ${JSON.stringify(adapter)}`);
    }
    if (adapter.toLowerCase() === 'js-controller') {
        throw new Error('the js-controller is no adapter whose files can be read');
    }
    return adapter;
}

/**
 * Whether a file or directory with this name is left out: hidden ones and installed modules
 *
 * @param name name of a single file or directory
 */
function isExcludedName(name: string): boolean {
    return isHiddenName(name) || name.toLowerCase() === 'node_modules';
}

/**
 * Split a relative path inside the package directory of an adapter into its parts
 *
 * @param relPath e.g. `widgets` or `widgets/wattcycle/customWidgets.js`, separated by `/`
 * @returns the parts of the path
 * @throws {Error} if the path is empty, absolute, leaves the directory or names something that is left out
 */
export function splitRelativePath(relPath: unknown): string[] {
    if (typeof relPath !== 'string' || !relPath || relPath.length > MAX_PATH_LENGTH) {
        throw new Error(`invalid path ${JSON.stringify(relPath)}`);
    }
    const parts = relPath.split('/');
    for (const part of parts) {
        // a backslash is a separator on Windows and a colon a drive or an alternate data stream
        if (!part || part === '..' || /[\\:\0]/.test(part)) {
            throw new Error(`invalid path ${JSON.stringify(relPath)}`);
        }
        if (isExcludedName(part)) {
            throw new Error(`the path ${JSON.stringify(relPath)} names a hidden file or "node_modules"`);
        }
    }
    return parts;
}

/**
 * The package directory of an adapter that is installed on this host
 *
 * @param adapter name of the adapter, e.g. `wattcycle`
 * @throws {Error} if the name is invalid or the adapter is not installed on this host
 */
export function getInstalledAdapterDir(adapter: unknown): string {
    const name = checkAdapterName(adapter);
    const dir = tools.getAdapterDir(name);
    if (!dir) {
        throw new Error(`adapter "${name}" is not installed on this host`);
    }
    return dir;
}

/**
 * Resolve a relative path below a directory, without leaving it through a symbolic link
 *
 * @param root the directory
 * @param parts the parts of the relative path, see {@link splitRelativePath}
 * @returns the real path
 */
async function resolveBelow(root: string, parts: string[]): Promise<string> {
    const realRoot = await fs.realpath(root);
    let real: string;
    try {
        real = await fs.realpath(path.join(realRoot, ...parts));
    } catch (e) {
        if (e.code === 'ENOENT' || e.code === 'ENOTDIR') {
            throw new Error(`"${parts.join('/')}" does not exist`);
        }
        throw e;
    }
    const relative = path.relative(realRoot, real);
    // the root itself is no file of it
    if (!relative || !isInside(real, realRoot) || relative.split(path.sep).some(isExcludedName)) {
        throw new Error(`"${parts.join('/')}" leads out of the directory`);
    }
    return real;
}

/**
 * List the files of a directory below `root`, with all subdirectories
 *
 * Hidden files and directories, `node_modules` and symbolic links are left out.
 *
 * @param root e.g. the package directory of an adapter
 * @param dirPath the directory relative to `root`, e.g. `widgets`
 * @returns the files sorted by path, which is relative to `dirPath`
 * @throws {Error} if the path is invalid, no directory, or holds more than {@link ADAPTER_DIR_MAX_FILES} files
 */
export async function listDir(root: string, dirPath: unknown): Promise<AdapterFileEntry[]> {
    const dir = await resolveBelow(root, splitRelativePath(dirPath));
    if (!(await fs.stat(dir)).isDirectory()) {
        throw new Error(`"${String(dirPath)}" is no directory`);
    }

    const files: AdapterFileEntry[] = [];
    const walk = async (current: string, prefix: string): Promise<void> => {
        const entries = await fs.readdir(current, { withFileTypes: true });
        for (const entry of entries) {
            if (isExcludedName(entry.name)) {
                continue;
            }
            const full = path.join(current, entry.name);
            const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
            if (entry.isDirectory()) {
                await walk(full, relative);
            } else if (entry.isFile()) {
                if (files.length >= ADAPTER_DIR_MAX_FILES) {
                    throw new Error(`"${String(dirPath)}" holds more than ${ADAPTER_DIR_MAX_FILES} files`);
                }
                const stat = await fs.stat(full);
                files.push({ path: relative, size: stat.size, mtime: stat.mtimeMs });
            }
            // symbolic links and everything that is no regular file are left out
        }
    };
    await walk(dir, '');

    return files.sort((a, b) => (a.path > b.path ? 1 : a.path < b.path ? -1 : 0));
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
 * Read one piece of a file below `root` from the disk
 *
 * @param root e.g. the package directory of an adapter
 * @param filePath the file relative to `root`
 * @param start position in the file to read from
 * @param toRead how many bytes to read at most
 */
async function readPiece(root: string, filePath: unknown, start: number, toRead: number): Promise<FilePiece> {
    const file = await resolveBelow(root, splitRelativePath(filePath));
    const handle = await fs.open(file, 'r');
    try {
        // checked on the opened file, so that it cannot be swapped between the check and the reading
        const stat = await handle.stat();
        if (!stat.isFile()) {
            throw new Error(`"${String(filePath)}" is no file`);
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
 * @param filePath the file, whose extension tells whether it is compressed already
 * @param compress whether the requester can take compressed pieces
 */
async function encodePiece(piece: FilePiece, filePath: unknown, compress: boolean): Promise<AdapterFileChunk> {
    const { size, mtime, offset, buffer } = piece;
    if (
        compress &&
        buffer.length >= MIN_COMPRESS_SIZE &&
        !COMPRESSED_EXTENSIONS.has(path.extname(String(filePath)).toLowerCase())
    ) {
        const packed = await gzip(buffer);
        if (packed.length < buffer.length) {
            return { size, mtime, offset, data: packed.toString('base64'), compressed: true };
        }
    }
    return { size, mtime, offset, data: buffer.toString('base64') };
}

/**
 * Check the flag that allows compressed pieces
 *
 * @param compress received value
 */
function readCompress(compress: unknown): boolean {
    if (compress !== undefined && compress !== null && typeof compress !== 'boolean') {
        throw new Error(`invalid compress ${JSON.stringify(compress)}`);
    }
    return compress === true;
}

/**
 * Read one piece of a file below `root`
 *
 * @param root e.g. the package directory of an adapter
 * @param filePath the file relative to `root`, e.g. `widgets/wattcycle/customWidgets.js`
 * @param offset position in the file to read from, 0 if not given
 * @param length how many bytes to read at most, {@link ADAPTER_FILE_CHUNK_SIZE} if not given
 * @param compress whether the piece may be compressed with gzip
 * @returns the piece and the size of the whole file
 * @throws {Error} if the path, `offset` or `length` is invalid, or the path is no regular file
 */
export async function readFileChunk(
    root: string,
    filePath: unknown,
    offset?: unknown,
    length?: unknown,
    compress?: unknown,
): Promise<AdapterFileChunk> {
    const start = readInteger(offset, 'offset', 0, Number.MAX_SAFE_INTEGER, 0);
    const toRead = readInteger(length, 'length', 1, ADAPTER_FILE_MAX_CHUNK_SIZE, ADAPTER_FILE_CHUNK_SIZE);
    const mayCompress = readCompress(compress);

    return encodePiece(await readPiece(root, filePath, start, toRead), filePath, mayCompress);
}

/**
 * Read several small files below `root` in one go, each from its beginning
 *
 * The files are read in the given order until `length` bytes are read in total. The last file may be cut off and the
 * following ones are left out then - the requester fetches the rest with {@link readFileChunk}.
 *
 * @param root e.g. the package directory of an adapter
 * @param filePaths the files relative to `root`, at most {@link ADAPTER_FILES_MAX_BATCH}
 * @param length how many bytes to read in total at most, {@link ADAPTER_FILE_CHUNK_SIZE} if not given
 * @param compress whether the pieces may be compressed with gzip
 * @returns the beginning of the files, in the order of `filePaths`
 * @throws {Error} if a path or `length` is invalid, or a path is no regular file
 */
export async function readFiles(
    root: string,
    filePaths: unknown,
    length?: unknown,
    compress?: unknown,
): Promise<AdapterFilesEntry[]> {
    if (!Array.isArray(filePaths) || !filePaths.length || filePaths.length > ADAPTER_FILES_MAX_BATCH) {
        throw new Error(`invalid paths, expected 1 to ${ADAPTER_FILES_MAX_BATCH} paths`);
    }
    let budget = readInteger(length, 'length', 1, ADAPTER_FILE_MAX_CHUNK_SIZE, ADAPTER_FILE_CHUNK_SIZE);
    const mayCompress = readCompress(compress);
    // checked before anything is read, so that a bad path at the end does not cost reading the others
    for (const filePath of filePaths) {
        splitRelativePath(filePath);
    }

    const files: AdapterFilesEntry[] = [];
    for (const filePath of filePaths as string[]) {
        if (budget <= 0) {
            break;
        }
        const piece = await readPiece(root, filePath, 0, budget);
        budget -= piece.buffer.length;
        files.push({ path: filePath, ...(await encodePiece(piece, filePath, mayCompress)) });
    }
    return files;
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

/**
 * List the files of a directory of an adapter installed on this host, for the host command `listAdapterDir`
 *
 * @param adapter name of the adapter, e.g. `wattcycle`
 * @param dirPath the directory inside its package, e.g. `widgets`
 */
export function listAdapterDir(adapter: unknown, dirPath: unknown): Promise<AdapterFileEntry[]> {
    return listDir(getInstalledAdapterDir(adapter), dirPath);
}

/**
 * Read one piece of a file of an adapter installed on this host, for the host command `readAdapterFile`
 *
 * @param adapter name of the adapter, e.g. `wattcycle`
 * @param filePath the file inside its package, e.g. `widgets/wattcycle/customWidgets.js`
 * @param offset position in the file to read from, 0 if not given
 * @param length how many bytes to read at most, {@link ADAPTER_FILE_CHUNK_SIZE} if not given
 * @param compress whether the piece may be compressed with gzip
 */
export function readAdapterFileChunk(
    adapter: unknown,
    filePath: unknown,
    offset?: unknown,
    length?: unknown,
    compress?: unknown,
): Promise<AdapterFileChunk> {
    return readFileChunk(getInstalledAdapterDir(adapter), filePath, offset, length, compress);
}

/**
 * Read several small files of an adapter installed on this host in one go, for the host command `readAdapterFiles`
 *
 * @param adapter name of the adapter, e.g. `wattcycle`
 * @param filePaths the files inside its package, e.g. `['widgets/wattcycle/customWidgets.js']`
 * @param length how many bytes to read in total at most, {@link ADAPTER_FILE_CHUNK_SIZE} if not given
 * @param compress whether the pieces may be compressed with gzip
 */
export function readAdapterFiles(
    adapter: unknown,
    filePaths: unknown,
    length?: unknown,
    compress?: unknown,
): Promise<AdapterFilesEntry[]> {
    return readFiles(getInstalledAdapterDir(adapter), filePaths, length, compress);
}
