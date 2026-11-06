/**
 * Reading a directory of an installed adapter, also for an instance on another host
 *
 * An adapter only exists on the hosts it is installed on, so its package directory - e.g. the `widgets` folder that
 * vis-2 collects - can only be read there. The js-controller of that host hands it out with the host commands
 * `listAdapterDir` and `readAdapterFile`, which use the functions here, and the adapter side (`fetchAdapterDir`)
 * checks the paths it gets back with them before it writes anything.
 *
 * Only the package directory of an adapter can be read, and not all of it: everything below `node_modules` and
 * every file or directory whose name starts with a dot (`.git`, `.env`, ...) is left out, symbolic links are not
 * followed, and the js-controller itself is no adapter in this sense.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { tools } from '@iobroker/js-controller-common-db';

/** Size of one piece of a file, as `readAdapterFile` hands it out by default */
export const ADAPTER_FILE_CHUNK_SIZE = 1024 * 1024;

/** The largest piece of a file one `readAdapterFile` hands out */
export const ADAPTER_FILE_MAX_CHUNK_SIZE = 4 * 1024 * 1024;

/** The most files a directory listing contains - a widgets folder has some hundred */
export const ADAPTER_DIR_MAX_FILES = 5_000;

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
    return name.startsWith('.') || name.toLowerCase() === 'node_modules';
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
    if (
        !relative ||
        relative.startsWith('..') ||
        path.isAbsolute(relative) ||
        relative.split(path.sep).some(isExcludedName)
    ) {
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
 * Read one piece of a file below `root`
 *
 * @param root e.g. the package directory of an adapter
 * @param filePath the file relative to `root`, e.g. `widgets/wattcycle/customWidgets.js`
 * @param offset position in the file to read from, 0 if not given
 * @param length how many bytes to read at most, {@link ADAPTER_FILE_CHUNK_SIZE} if not given
 * @returns the piece and the size of the whole file
 * @throws {Error} if the path, `offset` or `length` is invalid, or the path is no regular file
 */
export async function readFileChunk(
    root: string,
    filePath: unknown,
    offset?: unknown,
    length?: unknown,
): Promise<AdapterFileChunk> {
    const start = readInteger(offset, 'offset', 0, Number.MAX_SAFE_INTEGER, 0);
    const toRead = readInteger(length, 'length', 1, ADAPTER_FILE_MAX_CHUNK_SIZE, ADAPTER_FILE_CHUNK_SIZE);

    const file = await resolveBelow(root, splitRelativePath(filePath));
    // checked before opening it: Windows refuses to open a directory, Linux opens it
    if (!(await fs.stat(file)).isFile()) {
        throw new Error(`"${String(filePath)}" is no file`);
    }
    const handle = await fs.open(file, 'r');
    try {
        const stat = await handle.stat();
        const buffer = Buffer.alloc(Math.max(0, Math.min(toRead, stat.size - start)));
        let read = 0;
        while (read < buffer.length) {
            const { bytesRead } = await handle.read(buffer, read, buffer.length - read, start + read);
            if (!bytesRead) {
                break;
            }
            read += bytesRead;
        }
        return {
            size: stat.size,
            mtime: stat.mtimeMs,
            offset: start,
            data: buffer.subarray(0, read).toString('base64'),
        };
    } finally {
        await handle.close();
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
 */
export function readAdapterFileChunk(
    adapter: unknown,
    filePath: unknown,
    offset?: unknown,
    length?: unknown,
): Promise<AdapterFileChunk> {
    return readFileChunk(getInstalledAdapterDir(adapter), filePath, offset, length);
}
