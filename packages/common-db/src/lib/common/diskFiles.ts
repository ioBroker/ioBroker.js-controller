import path from 'node:path';
import fs from 'node:fs/promises';
import { getControllerDir, getDefaultDataDir } from '@/lib/common/tools.js';

/**
 * `iobdisk://` URLs point to a file on the disk of one specific host, below the data directory of an instance:
 *
 * `iobdisk://<host>/<namespace>/<path below the data directory of the instance>`
 *
 * e.g. `iobdisk://pi4/telegram.0/video/2026-11-04_10-00-00.mp4`. Unlike a plain file path, such a URL can be handed
 * to an instance on another host, which then reads the file through the js-controller of `<host>`
 * (`sendToHost(host, 'readDiskFile', ...)`).
 *
 * Only files below `iobroker-data/<namespace>` (or the older `iobroker-data/<adapter>_<instance>`) can be addressed,
 * never anything else of the host.
 */
const URL_PREFIX = 'iobdisk://';

/** Size of one chunk when a file is read from another host, in bytes */
export const DISK_FILE_CHUNK_SIZE = 1024 * 1024;

/** Largest chunk the host hands out in one answer, in bytes */
export const DISK_FILE_MAX_CHUNK_SIZE = 4 * 1024 * 1024;

/** An instance namespace like `telegram.0` - the adapter name never contains a dot */
const NAMESPACE_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9_-]*\.\d+$/;

/** The parts of an `iobdisk://` URL */
export interface DiskFileLocation {
    /** Name of the host on whose disk the file is */
    host: string;
    /** Namespace of the instance whose data directory holds the file, e.g. `telegram.0` */
    namespace: string;
    /** Path below the data directory of the instance, with `/` as separator, e.g. `video/1.mp4` */
    path: string;
}

/**
 * Whether the given value is an `iobdisk://` URL (without validating it)
 *
 * @param url value to check
 */
export function isDiskFileUrl(url: unknown): url is string {
    return typeof url === 'string' && url.toLowerCase().startsWith(URL_PREFIX);
}

/**
 * Check a namespace and return it
 *
 * @param namespace e.g. `telegram.0`
 * @throws {Error} if it is not an instance namespace
 */
function assertNamespace(namespace: unknown): string {
    if (typeof namespace !== 'string' || !NAMESPACE_REGEX.test(namespace)) {
        throw new Error(`invalid instance namespace ${JSON.stringify(namespace)}`);
    }
    return namespace;
}

/**
 * Split a relative path into its segments, accepting `/` and `\` as separators
 *
 * @param relativePath path below the data directory of an instance
 * @throws {Error} if the path is empty, absolute or leaves the directory (`..`)
 */
function splitRelativePath(relativePath: unknown): string[] {
    if (typeof relativePath !== 'string' || !relativePath) {
        throw new Error('the path of the file is missing');
    }
    if (relativePath.includes('\0')) {
        throw new Error('the path of the file contains a NUL character');
    }
    if (path.isAbsolute(relativePath) || path.posix.isAbsolute(relativePath) || path.win32.isAbsolute(relativePath)) {
        throw new Error(`the path of the file must be relative: ${relativePath}`);
    }
    const segments = relativePath.split(/[/\\]/).filter(segment => segment !== '' && segment !== '.');
    if (!segments.length) {
        throw new Error('the path of the file is missing');
    }
    if (segments.includes('..')) {
        throw new Error(`the path of the file must not contain "..": ${relativePath}`);
    }
    return segments;
}

/**
 * Build an `iobdisk://` URL
 *
 * @param location host, namespace and path of the file
 * @throws {Error} if one of the parts is invalid
 */
export function buildDiskFileUrl(location: DiskFileLocation): string {
    if (typeof location.host !== 'string' || !location.host) {
        throw new Error('the host of the file is missing');
    }
    const namespace = assertNamespace(location.namespace);
    const segments = splitRelativePath(location.path);
    return `${URL_PREFIX}${encodeURIComponent(location.host)}/${namespace}/${segments.map(encodeURIComponent).join('/')}`;
}

/**
 * Split an `iobdisk://` URL into its parts
 *
 * @param url e.g. `iobdisk://pi4/telegram.0/video/1.mp4`
 * @throws {Error} if it is not a valid `iobdisk://` URL
 */
export function parseDiskFileUrl(url: unknown): DiskFileLocation {
    if (!isDiskFileUrl(url)) {
        throw new Error(`not an ${URL_PREFIX} URL: ${JSON.stringify(url)}`);
    }
    const [host, namespace, ...segments] = url.slice(URL_PREFIX.length).split('/');
    let decoded: string[];
    try {
        decoded = [host, namespace, ...segments].map(part => decodeURIComponent(part));
    } catch {
        throw new Error(`invalid ${URL_PREFIX} URL: ${url}`);
    }
    if (!decoded[0]) {
        throw new Error(`the host is missing in ${url}`);
    }
    // a "/" inside a segment was encoded as %2F and must not become a separator
    if (decoded.slice(2).some(segment => /[/\\]/.test(segment))) {
        throw new Error(`invalid path in ${url}`);
    }
    const filePath = decoded.slice(2).join('/');
    splitRelativePath(filePath);
    return { host: decoded[0], namespace: assertNamespace(decoded[1]), path: filePath };
}

/** The absolute data directory of this host, as `utils.getAbsoluteDefaultDataDir()` of adapter-core gives it */
function getAbsoluteDataDir(): string {
    return path.resolve(getControllerDir(), getDefaultDataDir());
}

/**
 * The directories that may hold the files of an instance: `iobroker-data/<namespace>` as `getAbsoluteInstanceDataDir`
 * of adapter-core gives it, and the older `iobroker-data/<adapter>_<instance>` which some adapters (e.g. telegram) use
 *
 * @param namespace e.g. `telegram.0`
 */
export function getInstanceDataDirs(namespace: string): string[] {
    const dataDir = getAbsoluteDataDir();
    assertNamespace(namespace);
    return [path.join(dataDir, namespace), path.join(dataDir, namespace.replace('.', '_'))];
}

/**
 * Turn a file of this instance into the location of an `iobdisk://` URL
 *
 * @param host name of this host
 * @param namespace namespace of this instance, e.g. `telegram.0`
 * @param filePath absolute path inside one of the data directories of the instance (see {@link getInstanceDataDirs}),
 *        or a path relative to `iobroker-data/<namespace>`
 * @throws {Error} if the file is outside the data directories of the instance
 */
export function toDiskFileLocation(host: string, namespace: string, filePath: string): DiskFileLocation {
    if (typeof filePath !== 'string' || !filePath) {
        throw new Error('the path of the file is missing');
    }
    if (!path.isAbsolute(filePath)) {
        return { host, namespace, path: splitRelativePath(filePath).join('/') };
    }
    const absolute = path.resolve(filePath);
    for (const dir of getInstanceDataDirs(namespace)) {
        if (absolute !== dir && isInside(dir, absolute)) {
            return { host, namespace, path: splitRelativePath(path.relative(dir, absolute)).join('/') };
        }
    }
    throw new Error(`"${filePath}" is not inside the data directory of ${namespace}`);
}

/**
 * Whether `target` is `root` itself or inside of it
 *
 * @param root directory
 * @param target path to check
 */
function isInside(root: string, target: string): boolean {
    const relative = path.relative(root, target);
    return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

/**
 * Find the file an `iobdisk://` URL points to on this host
 *
 * The real path (with symbolic links resolved) has to be a regular file inside the data directory of the instance,
 * so a link cannot lead out of it.
 *
 * @param namespace namespace of the instance, e.g. `telegram.0`
 * @param relativePath path below the data directory of the instance
 * @returns the absolute path of the file
 * @throws {Error} if the file does not exist, is no regular file or is outside the data directory
 */
export async function resolveDiskFile(namespace: unknown, relativePath: unknown): Promise<string> {
    const segments = splitRelativePath(relativePath);
    for (const dir of getInstanceDataDirs(assertNamespace(namespace))) {
        let realDir: string;
        let realFile: string;
        try {
            realDir = await fs.realpath(dir);
            realFile = await fs.realpath(path.join(dir, ...segments));
        } catch {
            continue;
        }
        if (!isInside(realDir, realFile)) {
            throw new Error(`file "${segments.join('/')}" of ${namespace as string} is outside its data directory`);
        }
        const stat = await fs.stat(realFile);
        if (!stat.isFile()) {
            throw new Error(`"${segments.join('/')}" of ${namespace as string} is not a file`);
        }
        return realFile;
    }
    throw new Error(`file "${segments.join('/')}" of ${namespace as string} not found`);
}
