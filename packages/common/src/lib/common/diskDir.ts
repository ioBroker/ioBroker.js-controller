/**
 * The host command `readDiskDir`: the entries of a directory on the disk of this host
 *
 * The `diskSelector` control of a jsonConfig dialog asks this, so that a user can pick a file or a folder on the host
 * where the instance runs - not on the machine of the browser, and not on the host of admin.
 *
 * The controller runs as the user of ioBroker (normally `iobroker`), so `fs.access` answers exactly what this user may
 * read: entries it cannot read (directories: also not enter) are left out.
 *
 * The listing can be fixed to a root directory. Nothing above it is listed, also not through `..` or through a symbolic
 * link that leads out of it. This keeps the dialog where the adapter wants it; who may list the disk at all is decided
 * by the socket server, which treats the command as protected like `cmdExec`. The checks that keep a path below the
 * root are shared with the host commands for the files of adapters, see `diskPaths.ts`.
 */
import type { Dirent } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { DISK_DIR_MAX_ENTRIES, isHiddenName, isInside, isReadable } from './diskPaths.js';

/** The message of the host command `readDiskDir` */
export interface ReadDiskDirRequest {
    /**
     * Directory above which nothing is listed: an absolute path, which may start with a placeholder
     * (`%DATA_DIR%`, `%INSTANCE_DATA_DIR%`, `%IOBROKER_DIR%`, `%HOME%`). Empty: the whole disk
     */
    root?: string;
    /**
     * Directory to list: absolute or relative to `root`. A file lists its directory and is named in `selected`, a
     * path that does not exist (anymore) its nearest existing parent. Empty: `root`
     */
    path?: string;
    /** List only directories, e.g. to select a folder */
    dirsOnly?: boolean;
    /** Patterns of the files to list, e.g. `*.pem` or `*.pem;*.crt` (case-insensitive). Directories are always listed */
    filter?: string;
    /** List the entries starting with a dot too */
    showHidden?: boolean;
    /** Namespace of the instance for `%INSTANCE_DATA_DIR%`, e.g. `myAdapter.0` */
    instance?: string;
}

/** One entry of a listed directory */
export interface DiskDirEntry {
    /** Name of the entry, e.g. `key.pem` (on Windows in the list of drives: `C:`) */
    name: string;
    /** Absolute path of the entry */
    path: string;
    /** Whether it is a directory (or a drive) */
    isDir: boolean;
    /** Size in bytes, only for files */
    size?: number;
    /** Time of the last modification in ms */
    modified?: number;
}

/** The answer of the host command `readDiskDir` */
export interface ReadDiskDirAnswer {
    /** Why nothing could be listed */
    error?: string;
    /** The resolved root, `''` for the whole disk */
    root: string;
    /** The listed directory, `''` for the list of drives on Windows */
    path: string;
    /** The directory above `path`, `null` if `path` is the root */
    parent: string | null;
    /** The directories from the root to `path`, both included, to show where the list is */
    crumbs: { name: string; path: string }[];
    /** Directories first, then files, sorted by name */
    entries: DiskDirEntry[];
    /** Name of the file the requested `path` pointed to */
    selected?: string;
    /** More entries than {@link DISK_DIR_MAX_ENTRIES} matched, only the first ones are listed */
    truncated?: boolean;
    /** Path separator of this host */
    sep: string;
}

/** Where the placeholders of `root` point to on this host */
export interface DiskDirPlaceholders {
    /** Absolute `iobroker-data` directory, for `%DATA_DIR%` and `%INSTANCE_DATA_DIR%` */
    dataDir: string;
    /** Absolute directory of the installation (e.g. `/opt/iobroker`), for `%IOBROKER_DIR%` */
    rootDir: string;
    /** Home directory of the user ioBroker runs as, for `%HOME%` */
    homeDir: string;
}

/** How many entries are checked at once */
const PARALLEL_CHECKS = 64;

const isWindows = process.platform === 'win32';

/**
 * Replace a placeholder at the beginning of the root with the directory it stands for
 *
 * @param root the root as the adapter wrote it
 * @param instance namespace of the instance, for `%INSTANCE_DATA_DIR%`
 * @param placeholders where the placeholders point to on this host
 */
function resolvePlaceholders(root: string, instance: string | undefined, placeholders: DiskDirPlaceholders): string {
    const match = root.match(/^%([A-Z_]+)%(.*)$/);
    if (!match) {
        return root;
    }
    const [, name, rest] = match;
    let dir: string;
    if (name === 'DATA_DIR') {
        dir = placeholders.dataDir;
    } else if (name === 'INSTANCE_DATA_DIR') {
        if (!instance || !/^[a-z0-9_-]+\.\d+$/i.test(instance)) {
            throw new Error(`%INSTANCE_DATA_DIR% needs the instance, e.g. "myAdapter.0", got "${instance || ''}"`);
        }
        dir = path.join(placeholders.dataDir, instance);
    } else if (name === 'IOBROKER_DIR') {
        dir = placeholders.rootDir;
    } else if (name === 'HOME') {
        dir = placeholders.homeDir;
    } else {
        throw new Error(`Unknown placeholder %${name}%`);
    }
    return path.join(dir, rest ?? '');
}

/**
 * Build a matcher of the file patterns, e.g. `*.pem;*.crt`
 *
 * @param filter the patterns, separated by `;`, `,` or `|`
 */
function createFilter(filter: string | undefined): ((name: string) => boolean) | null {
    const patterns = (filter || '')
        .split(/[;,|]/)
        .map(pattern => pattern.trim())
        .filter(pattern => pattern && pattern !== '*' && pattern !== '*.*');
    if (!patterns.length) {
        return null;
    }
    const regExps = patterns.map(
        pattern =>
            new RegExp(
                `^${pattern
                    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
                    .replace(/\*/g, '.*')
                    .replace(/\?/g, '.')}$`,
                'i',
            ),
    );
    return name => regExps.some(regExp => regExp.test(name));
}

/**
 * Check one entry of a directory: undefined if it is not listed
 *
 * @param dir the listed directory
 * @param dirent the entry
 * @param realRoot the real path of the root, `''` for the whole disk
 * @param request what was asked
 * @param matches the matcher of the file patterns
 */
async function checkEntry(
    dir: string,
    dirent: Dirent,
    realRoot: string,
    request: ReadDiskDirRequest,
    matches: ((name: string) => boolean) | null,
): Promise<DiskDirEntry | undefined> {
    const fullPath = path.join(dir, dirent.name);
    let stat;
    try {
        if (dirent.isSymbolicLink()) {
            // a link must not lead out of the root
            const real = await fs.realpath(fullPath);
            if (!isInside(real, realRoot)) {
                return;
            }
        }
        // follows the link
        stat = await fs.stat(fullPath);
    } catch {
        // broken link, or removed meanwhile
        return;
    }

    const isDir = stat.isDirectory();
    // sockets, devices and pipes are no files to select
    if (!isDir && (!stat.isFile() || request.dirsOnly || (matches && !matches(dirent.name)))) {
        return;
    }
    if (!(await isReadable(fullPath, isDir))) {
        return;
    }
    return {
        name: dirent.name,
        path: fullPath,
        isDir,
        size: isDir ? undefined : stat.size,
        modified: Math.round(stat.mtimeMs),
    };
}

/**
 * The drives of this Windows host, as the directories of the whole disk
 */
async function readDrives(): Promise<DiskDirEntry[]> {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const drives = await Promise.all(
        letters.map(async (letter): Promise<DiskDirEntry | undefined> => {
            const drive = `${letter}:\\`;
            return (await isReadable(drive, true)) ? { name: `${letter}:`, path: drive, isDir: true } : undefined;
        }),
    );
    return drives.filter(drive => !!drive);
}

/**
 * The directories from the root to `dir`, both included
 *
 * @param root the root, `''` for the whole disk
 * @param dir the listed directory, inside of root
 */
function getCrumbs(root: string, dir: string): { name: string; path: string }[] {
    const crumbs: { name: string; path: string }[] = [];
    let current: string;
    if (root) {
        crumbs.push({ name: root, path: root });
        current = root;
    } else if (isWindows) {
        // the list of drives
        crumbs.push({ name: '', path: '' });
        if (!dir) {
            return crumbs;
        }
        current = path.parse(dir).root;
        crumbs.push({ name: current.replace(/\\$/, ''), path: current });
    } else {
        current = path.parse(dir).root;
        crumbs.push({ name: current, path: current });
    }

    for (const name of path.relative(current, dir).split(path.sep).filter(Boolean)) {
        current = path.join(current, name);
        crumbs.push({ name, path: current });
    }
    return crumbs;
}

/**
 * The directory above `dir`, `null` if `dir` is the root
 *
 * @param root the root, `''` for the whole disk
 * @param dir the listed directory
 */
function getParent(root: string, dir: string): string | null {
    if (!dir || (root && path.relative(root, dir) === '')) {
        return null;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
        // the root of a drive: on Windows the list of drives is above it
        return isWindows && !root ? '' : null;
    }
    return parent;
}

/**
 * Find the directory to list: the requested one, or the directory of a requested file, or the nearest existing parent
 *
 * @param target the requested absolute path
 * @param root the root, `''` for the whole disk
 * @param realRoot the real path of the root, `''` for the whole disk
 */
async function findDirectory(
    target: string,
    root: string,
    realRoot: string,
): Promise<{ dir: string; selected?: string } | undefined> {
    let dir = target;
    let selected: string | undefined;
    // also through a link: a path that leads out of the root lists the root
    while (isInside(dir, root)) {
        try {
            const real = await fs.realpath(dir);
            if (!isInside(real, realRoot)) {
                return;
            }
            const stat = await fs.stat(real);
            if (stat.isDirectory()) {
                if (await isReadable(dir, true)) {
                    return { dir, selected };
                }
            } else if (dir === target) {
                selected = path.basename(dir);
            }
        } catch {
            // does not exist (anymore): try the parent
        }
        const parent = path.dirname(dir);
        if (parent === dir) {
            return;
        }
        dir = parent;
    }
}

/**
 * List a directory on the disk of this host. It never throws: what went wrong is in `error` of the answer.
 *
 * @param request what to list
 * @param placeholders where the placeholders of the root point to on this host
 */
export async function readDiskDir(
    request: ReadDiskDirRequest,
    placeholders: DiskDirPlaceholders,
): Promise<ReadDiskDirAnswer> {
    const answer: ReadDiskDirAnswer = { root: '', path: '', parent: null, crumbs: [], entries: [], sep: path.sep };
    try {
        let root = typeof request.root === 'string' ? request.root.trim() : '';
        if (root) {
            root = resolvePlaceholders(root, request.instance, placeholders);
            if (!path.isAbsolute(root)) {
                throw new Error(`The root must be an absolute path: "${root}"`);
            }
            root = path.resolve(root);
        } else if (!isWindows) {
            root = '/';
        }
        answer.root = root;

        let realRoot = '';
        if (root) {
            try {
                realRoot = await fs.realpath(root);
            } catch {
                throw new Error(`The root does not exist: "${root}"`);
            }
            if (!(await fs.stat(realRoot)).isDirectory() || !(await isReadable(realRoot, true))) {
                throw new Error(`The root cannot be read: "${root}"`);
            }
        }

        const requested = typeof request.path === 'string' ? request.path.trim() : '';
        let target = root;
        if (requested) {
            target = root ? path.resolve(root, requested) : path.resolve(requested);
        }

        if (!target) {
            // Windows, the whole disk
            answer.entries = await readDrives();
            answer.crumbs = getCrumbs(root, '');
            return answer;
        }

        // a path outside the root lists the root
        const found = (await findDirectory(target, root, realRoot)) ||
            (root ? await findDirectory(root, root, realRoot) : undefined) || { dir: '' };
        const dir = found.dir;
        answer.path = dir;
        answer.selected = found.selected;
        answer.parent = getParent(root, dir);
        answer.crumbs = getCrumbs(root, dir);

        if (!dir) {
            if (isWindows) {
                answer.entries = await readDrives();
                return answer;
            }
            throw new Error(`Cannot read "${target}"`);
        }

        const dirents = await fs.readdir(dir, { withFileTypes: true });
        const matches = createFilter(request.filter);
        const entries: DiskDirEntry[] = [];
        for (let i = 0; i < dirents.length && entries.length <= DISK_DIR_MAX_ENTRIES; i += PARALLEL_CHECKS) {
            const checked = await Promise.all(
                dirents
                    .slice(i, i + PARALLEL_CHECKS)
                    .filter(dirent => request.showHidden || !isHiddenName(dirent.name))
                    .map(dirent => checkEntry(dir, dirent, realRoot, request, matches)),
            );
            for (const entry of checked) {
                if (entry) {
                    entries.push(entry);
                }
            }
        }
        if (entries.length > DISK_DIR_MAX_ENTRIES) {
            answer.truncated = true;
            entries.length = DISK_DIR_MAX_ENTRIES;
        }

        entries.sort((a, b) =>
            a.isDir === b.isDir
                ? a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
                : a.isDir
                  ? -1
                  : 1,
        );
        answer.entries = entries;
    } catch (e) {
        answer.error = e instanceof Error ? e.message : String(e);
    }
    return answer;
}
