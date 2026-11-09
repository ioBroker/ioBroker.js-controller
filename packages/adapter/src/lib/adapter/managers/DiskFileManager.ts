import fs from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { Readable } from 'node:stream';
import { diskFiles } from '@iobroker/js-controller-common';
import type { AdapterContext } from '@/lib/adapter/context.js';
import { AdapterContextBase } from '@/lib/adapter/managers/AdapterContextBase.js';
import { HostDiskClient, type ChunkedFile } from '@/lib/adapter/managers/HostDiskClient.js';
import type { MessagingManager } from '@/lib/adapter/managers/MessagingManager.js';

/** Feature flag of a js-controller that answers `readDiskFile` and `deleteDiskFile` */
const DISK_FILES_FEATURE = 'CONTROLLER_DISK_FILES';
/** What the feature is for, in the error message about a too old js-controller */
const DISK_FILES_PURPOSE = 'hand out iobdisk:// files';
/** How many pieces are requested at the same time when reading from another host */
const PARALLEL_CHUNKS = 4;

/**
 * Creates, reads and deletes `iobdisk://` URLs: files below the data directory of an instance on the disk of one host.
 *
 * A file on this host is read from the disk; a file on another host is fetched piece by piece from the js-controller
 * of that host with `sendToHost(host, 'readDiskFile', ...)`, so that also big files (videos) can be passed between
 * instances on different hosts. Deleting goes the same way (`sendToHost(host, 'deleteDiskFile', ...)`). The pieces
 * are the same as of the files of adapters and are requested compressed - the host leaves videos and images as they
 * are, see {@link HostDiskClient}.
 */
export class DiskFileManager extends AdapterContextBase {
    readonly #client: HostDiskClient;

    /**
     * @param ctx Shared adapter context providing live runtime state
     * @param getMessaging Returns the adapter's messaging manager, which matches the host's answers to the requests
     */
    constructor(ctx: AdapterContext, getMessaging: () => MessagingManager) {
        super(ctx);
        this.#client = new HostDiskClient(getMessaging);
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
        await this.#client.assertFeature(location.host, DISK_FILES_FEATURE, DISK_FILES_PURPOSE);
        const name = `${location.namespace}/${location.path}`;
        const answer = await this.#client.request(
            location.host,
            'deleteDiskFile',
            { namespace: location.namespace, path: location.path },
            name,
        );
        if (typeof answer.deleted !== 'boolean') {
            throw new Error(`invalid answer of host "${location.host}" to deleteDiskFile of "${name}"`);
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
     * Request one piece of a file from the host
     *
     * @param location the parts of the URL
     * @param offset position of the piece in the file
     */
    #requestChunk(location: diskFiles.DiskFileLocation, offset: number): Promise<Record<string, any>> {
        return this.#client.request(
            location.host,
            'readDiskFile',
            {
                namespace: location.namespace,
                path: location.path,
                offset,
                length: diskFiles.DISK_FILE_CHUNK_SIZE,
                compress: true,
            },
            `${location.namespace}/${location.path}`,
        );
    }

    /**
     * Fetch a file from another host piece by piece, with several pieces requested at the same time
     *
     * @param location the parts of the URL
     * @yields {Buffer} the content of the file, piece by piece and in order
     */
    async *#readFromHost(location: diskFiles.DiskFileLocation): AsyncGenerator<Buffer> {
        await this.#client.assertFeature(location.host, DISK_FILES_FEATURE, DISK_FILES_PURPOSE);

        const name = `${location.namespace}/${location.path}`;
        const chunkSize = diskFiles.DISK_FILE_CHUNK_SIZE;
        const file: ChunkedFile = { size: -1, mtime: 0 };
        // the first piece tells the size, so that the following ones can be requested at the same time
        const first = await this.#client.decodeChunk(
            location.host,
            name,
            await this.#requestChunk(location, 0),
            file,
            0,
            chunkSize,
            true,
        );
        const pending: Promise<Record<string, any>>[] = [];
        let nextOffset = first.length;
        const requestMore = (): void => {
            while (pending.length < PARALLEL_CHUNKS && nextOffset < file.size) {
                const promise = this.#requestChunk(location, nextOffset);
                // a request may still be running when reading stops early - its rejection must not be unhandled
                promise.catch(() => {});
                pending.push(promise);
                nextOffset += chunkSize;
            }
        };

        requestMore();
        if (first.length) {
            yield first;
        }
        let position = first.length;
        while (position < file.size) {
            requestMore();
            const data = await this.#client.decodeChunk(
                location.host,
                name,
                await pending.shift()!,
                file,
                position,
                chunkSize,
                true,
            );
            position += data.length;
            yield data;
        }
    }
}
