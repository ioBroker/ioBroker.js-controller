/**
 * The checks that every host command reading the disk of the host shares
 *
 * Two kinds of host commands read the disk of a host for a requester on another host, as the databases are shared but
 * the disks are not:
 *
 * - `listAdapterDir`, `readAdapterFile` and `readAdapterFiles` ({@link ./adapterFiles.ts}) hand out the package
 *   directory of an installed adapter, e.g. its `widgets`, to `adapter.fetchAdapterDir()`
 * - `readDiskDir` ({@link ./diskDir.ts}) lists any directory the user of ioBroker may read, for the `diskSelector` of
 *   jsonConfig
 *
 * Both keep a request below a directory - the package of the adapter, or the `root` of the dialog - and use the same
 * checks for it here: nothing above that directory, also not through `..` or through a symbolic link that leads out of
 * it, and the same idea of hidden entries and of the most entries a directory listing holds.
 */
import { constants as fsConstants } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';

/** The most entries one listing of a directory holds */
export const DISK_DIR_MAX_ENTRIES = 5_000;

/**
 * Whether `child` is `parent` or inside of it
 *
 * Only the paths are compared; resolve symbolic links with `fs.realpath` before, if they matter.
 *
 * @param child absolute path
 * @param parent absolute path, `''` for the whole disk
 */
export function isInside(child: string, parent: string): boolean {
    if (!parent) {
        return true;
    }
    const relative = path.relative(parent, child);
    return (
        relative === '' || (relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative))
    );
}

/**
 * Whether a file or directory is hidden: its name starts with a dot, e.g. `.git` or `.env`
 *
 * @param name name of a single file or directory
 */
export function isHiddenName(name: string): boolean {
    return name.startsWith('.');
}

/**
 * Whether the user ioBroker runs as may read the path (and enter it, if it is a directory)
 *
 * @param fullPath the path to check
 * @param isDir whether it is a directory
 */
export async function isReadable(fullPath: string, isDir: boolean): Promise<boolean> {
    try {
        // on Windows X_OK is the same as F_OK
        await fs.access(fullPath, isDir ? fsConstants.R_OK | fsConstants.X_OK : fsConstants.R_OK);
        return true;
    } catch {
        return false;
    }
}
