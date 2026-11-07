import os from 'node:os';
import path from 'node:path';
import { adapterFiles, diskDir, diskFiles, tools } from '@iobroker/js-controller-common';
import type { ControllerLogger } from '@/lib/controller/types.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { HostCommand, HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/**
 * Everything the host commands that read the disk of this host need
 *
 * The databases are shared, the disks are not: these commands read the disk of this host for a requester on another
 * host. Each keeps a request below a directory - the package of an adapter, the data directory of an instance, or the
 * `root` of `readDiskDir` - with the same checks (`diskPaths` of common): nothing above it, also not through `..` or a
 * symbolic link. A file is handed out in the same pieces by all of them (`diskChunks` of common).
 */
export interface DiskCommandsDeps {
    /** Sends the answers back to the requester */
    messages: Pick<MessageBus, 'sendTo'>;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
}

/**
 * The payload of a request as an object
 *
 * @param message the received payload
 * @param optional whether a missing payload counts as an empty request
 * @throws {Error} if it is no object
 */
function asRequest(message: unknown, optional = false): Record<string, unknown> {
    if (optional && (message === undefined || message === null)) {
        return {};
    }
    if (!message || typeof message !== 'object' || Array.isArray(message)) {
        throw new Error('invalid message, expected an object');
    }
    return message as Record<string, unknown>;
}

/**
 * Answer a request with the result of `handle`, or with `{ error }` if it throws
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 * @param handle Builds the answer from the payload
 * @param withoutCallback Whether the command is carried out also if nobody waits for the answer, e.g. a deletion
 */
async function answer(
    deps: DiskCommandsDeps,
    msg: ioBroker.SendableMessage,
    handle: (message: unknown) => Promise<object>,
    withoutCallback = false,
): Promise<void> {
    const { messages, logger, hostLogPrefix } = deps;
    if ((!msg.callback || !msg.from) && !withoutCallback) {
        logger.warn(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
        return;
    }
    let result: object;
    try {
        result = await handle(msg.message);
    } catch (e) {
        result = { error: e.message };
    }
    const error = (result as { error?: unknown }).error;
    if (typeof error === 'string' && error) {
        logger.debug(`${hostLogPrefix} ${msg.command} failed: ${error}`);
    }
    if (msg.callback && msg.from) {
        messages.sendTo(msg.from, msg.command, result, msg.callback);
    }
}

/**
 * List a directory on the disk of this host, with only the entries the user of ioBroker may read
 *
 * The message is `{ root?, path?, filter?, dirsOnly?, showHidden?, instance? }`, the answer
 * `{ root, path, parent, crumbs, entries, selected?, truncated?, sep, error? }`. Used by the `diskSelector` of
 * jsonConfig; the socket server treats it as protected like `cmdExec`.
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const readDiskDir: HostCommand<DiskCommandsDeps> = (deps, msg) =>
    answer(deps, msg, message =>
        diskDir.readDiskDir(asRequest(message, true), {
            dataDir: path.resolve(tools.getControllerDir(), tools.getDefaultDataDir()),
            rootDir: path.resolve(tools.getRootDir()),
            homeDir: os.homedir(),
        }),
    );

/**
 * List the files of a directory of an adapter installed on this host, e.g. its `widgets` folder
 *
 * The message is `{ adapter, path }`, the answer `{ files: [{ path, size, mtime }] }` with the paths relative to the
 * requested directory, or `{ error }`.
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const listAdapterDir: HostCommand<DiskCommandsDeps> = (deps, msg) =>
    answer(deps, msg, async message => {
        const request = asRequest(message);
        return { files: await adapterFiles.listAdapterDir(request.adapter, request.path) };
    });

/**
 * Read one piece of a file of an adapter installed on this host
 *
 * The message is `{ adapter, path, offset?, length?, compress? }`, the answer `{ size, mtime, offset, data, compressed? }`
 * with `data` base64 encoded, or `{ error }`. Files are handed out in pieces (1 MB by default, at most 4 MB), so that
 * no file goes through the states DB as one huge message. With `compress: true` the piece is compressed with gzip if
 * it gets smaller by it, which the answer says with `compressed: true`.
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const readAdapterFile: HostCommand<DiskCommandsDeps> = (deps, msg) =>
    answer(deps, msg, message => {
        const request = asRequest(message);
        return adapterFiles.readAdapterFileChunk(
            request.adapter,
            request.path,
            request.offset,
            request.length,
            request.compress,
        );
    });

/**
 * Read several small files of an adapter installed on this host in one go
 *
 * The message is `{ adapter, paths, length?, compress? }` with at most 100 paths, the answer
 * `{ files: [{ path, size, mtime, offset, data, compressed? }] }` in the order of `paths`, or `{ error }`. The files
 * are read until `length` bytes (1 MB by default, at most 4 MB) are read in total: the last file may be cut off and
 * the following ones are left out then - the requester fetches the rest with `readAdapterFile`.
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const readAdapterFiles: HostCommand<DiskCommandsDeps> = (deps, msg) =>
    answer(deps, msg, async message => {
        const request = asRequest(message);
        return {
            files: await adapterFiles.readAdapterFiles(
                request.adapter,
                request.paths,
                request.length,
                request.compress,
            ),
        };
    });

/**
 * Read one piece of a file below the data directory of an instance on this host - how an instance on another host
 * reads an `iobdisk://` URL, e.g. a video that telegram stored here
 *
 * The message is `{ namespace, path, offset?, length?, compress? }`, the parts of the URL plus the range to read; the
 * answer is the same as of `readAdapterFile`: `{ size, mtime, offset, data, compressed? }`, or `{ error }`.
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const readDiskFile: HostCommand<DiskCommandsDeps> = (deps, msg) =>
    answer(deps, msg, message => {
        const request = asRequest(message);
        return diskFiles.readDiskFileChunk(
            request.namespace,
            request.path,
            request.offset,
            request.length,
            request.compress,
        );
    });

/**
 * Delete a file below the data directory of an instance on this host - how an instance on another host deletes an
 * `iobdisk://` URL, e.g. a video of telegram after it was processed
 *
 * The message is `{ namespace, path }`, the answer `{ deleted: true }`, `{ deleted: false }` if the file did not exist,
 * or `{ error }`. Only a regular file is deleted, never a directory or a symbolic link. The file is deleted also if
 * nobody waits for the answer.
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const deleteDiskFile: HostCommand<DiskCommandsDeps> = (deps, msg) =>
    answer(
        deps,
        msg,
        async message => {
            const request = asRequest(message);
            const deleted = await diskFiles.deleteDiskFile(request.namespace, request.path);
            if (deleted) {
                deps.logger.debug(
                    `${deps.hostLogPrefix} Deleted disk file ${String(request.namespace)}/${String(request.path)} for ${msg.from}`,
                );
            }
            return { deleted };
        },
        true,
    );

/**
 * Create the host commands that read the disk of this host: `readDiskDir` for any directory the user of ioBroker may
 * read, `listAdapterDir`, `readAdapterFile` and `readAdapterFiles` for the package of an installed adapter, and
 * `readDiskFile` and `deleteDiskFile` for a file in the data directory of an instance (`iobdisk://` URLs)
 *
 * @param deps Everything these commands need
 */
export function createDiskCommands(deps: DiskCommandsDeps): Record<string, HostCommandHandler> {
    return {
        readDiskDir: msg => readDiskDir(deps, msg),
        listAdapterDir: msg => listAdapterDir(deps, msg),
        readAdapterFile: msg => readAdapterFile(deps, msg),
        readAdapterFiles: msg => readAdapterFiles(deps, msg),
        readDiskFile: msg => readDiskFile(deps, msg),
        deleteDiskFile: msg => deleteDiskFile(deps, msg),
    };
}
