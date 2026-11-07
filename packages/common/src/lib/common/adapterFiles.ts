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
import { tools } from '@iobroker/js-controller-common-db';
import {
    FILE_CHUNK_SIZE,
    FILE_MAX_CHUNK_SIZE,
    encodePiece,
    readChunk,
    readCompress,
    readInteger,
    readPiece,
    type FileChunk,
} from './diskChunks.js';
import { DISK_DIR_MAX_ENTRIES, isHiddenName, isInside } from './diskPaths.js';

export { decodeChunkData } from './diskChunks.js';

/** Size of one piece of a file, as `readAdapterFile` hands it out by default */
export const ADAPTER_FILE_CHUNK_SIZE = FILE_CHUNK_SIZE;

/** The largest piece of a file one `readAdapterFile` hands out */
export const ADAPTER_FILE_MAX_CHUNK_SIZE = FILE_MAX_CHUNK_SIZE;

/** The most files a directory listing contains - a widgets folder has some hundred */
export const ADAPTER_DIR_MAX_FILES = DISK_DIR_MAX_ENTRIES;

/** The most files one `readAdapterFiles` hands out */
export const ADAPTER_FILES_MAX_BATCH = 100;

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

/** One piece of a file, as `readAdapterFile` hands it out - the same as every host command that hands out a file */
export type AdapterFileChunk = FileChunk;

/** The beginning of one file, as `readAdapterFiles` hands it out */
export interface AdapterFilesEntry extends AdapterFileChunk {
    /** The file as it was requested */
    path: string;
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
    const file = await resolveBelow(root, splitRelativePath(filePath));
    return readChunk(file, String(filePath), offset, length, compress);
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
        const file = await resolveBelow(root, splitRelativePath(filePath));
        const piece = await readPiece(file, 0, budget, filePath);
        budget -= piece.buffer.length;
        files.push({ path: filePath, ...(await encodePiece(piece, filePath, mayCompress)) });
    }
    return files;
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
