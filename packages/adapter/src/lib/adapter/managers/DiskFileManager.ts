import fs from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { Readable } from 'node:stream';
import { diskFiles } from '@iobroker/js-controller-common';
import type { AdapterContext } from '@/lib/adapter/context.js';
import { AdapterContextBase } from '@/lib/adapter/managers/AdapterContextBase.js';
import type { MessagingManager } from '@/lib/adapter/managers/MessagingManager.js';

/** Feature flag of a js-controller that answers `readDiskFile` and `deleteDiskFile` */
const DISK_FILES_FEATURE = 'CONTROLLER_DISK_FILES';
/** How long the feature check waits for the other host, in ms */
const FEATURE_CHECK_TIMEOUT = 5_000;
/** How long one piece of a file may take, in ms */
const CHUNK_TIMEOUT = 30_000;
/** How many pieces are requested at the same time when reading from another host */
const PARALLEL_CHUNKS = 4;

/** One piece of a file as the host answers `readDiskFile` */
interface DiskFileChunkAnswer {
    size: number;
    mtime: number;
    offset: number;
    data: string;
}

/**
 * Creates, reads and deletes `iobdisk://` URLs: files below the data directory of an instance on the disk of one host.
 *
 * A file on this host is read from the disk; a file on another host is fetched piece by piece from the js-controller
 * of that host with `sendToHost(host, 'readDiskFile', ...)`, so that also big files (videos) can be passed between
 * instances on different hosts. Deleting goes the same way (`sendToHost(host, 'deleteDiskFile', ...)`).
 */
export class DiskFileManager extends AdapterContextBase {
    readonly #getMessaging: () => MessagingManager;
    /** Hosts that answered the feature check positively */
    readonly #supportingHosts = new Set<string>();

    /**
     * @param ctx Shared adapter context providing live runtime state
     * @param getMessaging Returns the adapter's messaging manager, which matches the host's answers to the requests
     */
    constructor(ctx: AdapterContext, getMessaging: () => MessagingManager) {
        super(ctx);
        this.#getMessaging = getMessaging;
    }

    /**
     * Build the `iobdisk://` URL of a file of this instance
     *
     * @param filePath absolute path below `iobroker-data/<namespace>` (or `iobroker-data/<adapter>_<instance>`), or a
     *        path relative to `iobroker-data/<namespace>`
     */
    getDiskFileUrl(filePath: string): string {
        if (!this.host) {
            throw new Error('getDiskFileUrl: the host of this instance is unknown');
        }
        return diskFiles.buildDiskFileUrl(diskFiles.toDiskFileLocation(this.host, this.namespace, filePath));
    }

    /**
     * Read the whole file an `iobdisk://` URL points to
     *
     * @param url e.g. `iobdisk://pi4/telegram.0/video/1.mp4`
     */
    async readDiskFile(url: string): Promise<Buffer> {
        const location = diskFiles.parseDiskFileUrl(url);
        if (location.host === this.host) {
            return fs.readFile(await diskFiles.resolveDiskFile(location.namespace, location.path));
        }
        const parts: Buffer[] = [];
        for await (const part of this.#readFromHost(location)) {
            parts.push(part);
        }
        return Buffer.concat(parts);
    }

    /**
     * Read the file an `iobdisk://` URL points to as a stream, without holding it in memory as a whole
     *
     * Errors (unknown host, missing file, file changed while reading) are emitted on the stream.
     *
     * @param url e.g. `iobdisk://pi4/telegram.0/video/1.mp4`
     */
    createDiskFileReadStream(url: string): Readable {
        const location = diskFiles.parseDiskFileUrl(url);
        if (location.host === this.host) {
            return Readable.from(this.#readLocal(location), { objectMode: false });
        }
        return Readable.from(this.#readFromHost(location), { objectMode: false });
    }

    /**
     * Delete the file an `iobdisk://` URL points to, on this or another host
     *
     * Only a regular file inside the data directory of the instance is deleted, never a directory.
     *
     * @param url e.g. `iobdisk://pi4/telegram.0/video/1.mp4`
     * @returns `true` if the file was deleted, `false` if it did not exist
     */
    async deleteDiskFile(url: string): Promise<boolean> {
        const location = diskFiles.parseDiskFileUrl(url);
        if (location.host === this.host) {
            return diskFiles.deleteDiskFile(location.namespace, location.path);
        }
        await this.#assertHostSupportsDiskFiles(location.host);
        const answer = await this.#getMessaging().sendToHost({
            hostName: location.host,
            command: 'deleteDiskFile',
            message: { namespace: location.namespace, path: location.path },
            expectReply: true,
            options: { timeout: CHUNK_TIMEOUT },
        });
        if (answer?.error) {
            throw new Error(
                `host "${location.host}" cannot delete ${location.namespace}/${location.path}: ${answer.error}`,
            );
        }
        if (typeof answer?.deleted !== 'boolean') {
            throw new Error(`invalid answer of host "${location.host}" for ${location.namespace}/${location.path}`);
        }
        return answer.deleted;
    }

    /**
     * Read a file of this host piece by piece
     *
     * @param location the parts of the URL
     * @yields {Buffer} the content of the file, piece by piece
     */
    async *#readLocal(location: diskFiles.DiskFileLocation): AsyncGenerator<Buffer> {
        const file = await diskFiles.resolveDiskFile(location.namespace, location.path);
        for await (const part of createReadStream(file)) {
            yield part as Buffer;
        }
    }

    /**
     * Make sure the js-controller of the host can hand out files
     *
     * @param host name of the host
     */
    async #assertHostSupportsDiskFiles(host: string): Promise<void> {
        if (this.#supportingHosts.has(host)) {
            return;
        }
        let answer: { result?: boolean } | undefined;
        try {
            answer = await this.#getMessaging().sendToHost({
                hostName: host,
                command: 'checkFeatureSupported',
                message: DISK_FILES_FEATURE,
                expectReply: true,
                options: { timeout: FEATURE_CHECK_TIMEOUT },
            });
        } catch {
            throw new Error(`host "${host}" does not answer - it is not running or its js-controller is too old`);
        }
        if (!answer?.result) {
            throw new Error(`the js-controller of host "${host}" is too old to hand out iobdisk:// files`);
        }
        this.#supportingHosts.add(host);
    }

    /**
     * Request one piece of a file from the host
     *
     * @param location the parts of the URL
     * @param offset position of the piece in the file
     */
    async #requestChunk(location: diskFiles.DiskFileLocation, offset: number): Promise<DiskFileChunkAnswer> {
        const answer = await this.#getMessaging().sendToHost({
            hostName: location.host,
            command: 'readDiskFile',
            message: {
                namespace: location.namespace,
                path: location.path,
                offset,
                length: diskFiles.DISK_FILE_CHUNK_SIZE,
            },
            expectReply: true,
            options: { timeout: CHUNK_TIMEOUT },
        });
        if (answer?.error) {
            throw new Error(
                `host "${location.host}" cannot hand out ${location.namespace}/${location.path}: ${answer.error}`,
            );
        }
        if (
            typeof answer?.size !== 'number' ||
            typeof answer.mtime !== 'number' ||
            answer.offset !== offset ||
            typeof answer.data !== 'string'
        ) {
            throw new Error(`invalid answer of host "${location.host}" for ${location.namespace}/${location.path}`);
        }
        return answer as DiskFileChunkAnswer;
    }

    /**
     * Fetch a file from another host piece by piece, with several pieces requested at the same time
     *
     * @param location the parts of the URL
     * @yields {Buffer} the content of the file, piece by piece and in order
     */
    async *#readFromHost(location: diskFiles.DiskFileLocation): AsyncGenerator<Buffer> {
        await this.#assertHostSupportsDiskFiles(location.host);

        const chunkSize = diskFiles.DISK_FILE_CHUNK_SIZE;
        const first = await this.#requestChunk(location, 0);
        const { size, mtime } = first;
        let position = 0;
        let nextOffset = 0;
        const pending: Promise<DiskFileChunkAnswer>[] = [Promise.resolve(first)];
        nextOffset += chunkSize;

        const request = (offset: number): Promise<DiskFileChunkAnswer> => {
            const promise = this.#requestChunk(location, offset);
            // a request may still be running when reading stops early - its rejection must not be unhandled
            promise.catch(() => {});
            return promise;
        };

        while (position < size) {
            while (pending.length < PARALLEL_CHUNKS && nextOffset < size) {
                pending.push(request(nextOffset));
                nextOffset += chunkSize;
            }
            const chunk = await pending.shift()!;
            if (chunk.size !== size || chunk.mtime !== mtime) {
                throw new Error(
                    `${location.namespace}/${location.path} changed on host "${location.host}" while reading`,
                );
            }
            const data = Buffer.from(chunk.data, 'base64');
            if (chunk.offset !== position || data.length !== Math.min(chunkSize, size - position)) {
                throw new Error(
                    `incomplete piece of ${location.namespace}/${location.path} from host "${location.host}"`,
                );
            }
            position += data.length;
            yield data;
        }
    }
}
