import fs from 'node:fs/promises';
import path from 'node:path';
import { adapterFiles } from '@iobroker/js-controller-common';
import type { FetchAdapterDirOptions, FetchAdapterDirResult } from '@/lib/_Types.js';
import type { AdapterContext } from '@/lib/adapter/context.js';
import { AdapterContextBase } from '@/lib/adapter/managers/AdapterContextBase.js';
import { HostDiskClient, type ChunkedFile } from '@/lib/adapter/managers/HostDiskClient.js';
import type { MessagingManager } from '@/lib/adapter/managers/MessagingManager.js';

/** Feature flag of a js-controller that answers `listAdapterDir`, `readAdapterFile` and `readAdapterFiles` */
const ADAPTER_FILES_FEATURE = 'CONTROLLER_ADAPTER_FILES';
/** How many requests go to another host at the same time */
const PARALLEL_REQUESTS = 4;
/** Files up to this size are fetched together with others in one `readAdapterFiles` */
const SMALL_FILE_SIZE = 64 * 1024;

/** A file of the listing, with the place it is written to */
interface PlannedFile {
    /** Path relative to the fetched directory, separated by `/` */
    path: string;
    /** Absolute path of the copy */
    dest: string;
    /** Size according to the listing, `Infinity` if the listing gave none */
    size: number;
}

/**
 * Fetches a directory of an installed adapter - e.g. its `widgets` folder - into a local directory.
 *
 * An adapter only exists on the hosts it is installed on. If it is installed on this host, the directory is copied
 * from its package; otherwise the js-controller of a host it is installed on hands the files out with
 * `sendToHost(host, 'listAdapterDir', ...)`, `sendToHost(host, 'readAdapterFiles', ...)` for the small files, several
 * in one answer, and `sendToHost(host, 'readAdapterFile', ...)` for the big ones, piece by piece - all compressed
 * with gzip where it helps. The requests go the same way as for the `iobdisk://` URLs, see {@link HostDiskClient}.
 */
export class AdapterFileManager extends AdapterContextBase {
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
     * Copy a directory of an installed adapter into a local directory, from this or another host
     *
     * @param options which directory of which adapter, where to, and optionally from which host
     * @returns the host the files came from and the written files
     */
    async fetchAdapterDir(options: FetchAdapterDirOptions): Promise<FetchAdapterDirResult> {
        const adapter = adapterFiles.checkAdapterName(options.adapter);
        const dirPath = adapterFiles.splitRelativePath(options.path).join('/');
        const host = options.host ?? (await this.#findHost(adapter));

        if (host === this.host) {
            return { host, files: await this.#copyLocal(adapter, dirPath, options.target) };
        }
        return { host, files: await this.#fetchFromHost(host, adapter, dirPath, options.target) };
    }

    /**
     * The host to fetch from: this one if the adapter is installed here, else the first running host with an
     * instance of the adapter
     *
     * @param adapter name of the adapter
     */
    async #findHost(adapter: string): Promise<string> {
        if (this.host) {
            try {
                adapterFiles.getInstalledAdapterDir(adapter);
                return this.host;
            } catch {
                // not installed on this host
            }
        }

        const res = await this.objects.getObjectView('system', 'instance', {
            startkey: `system.adapter.${adapter}.`,
            endkey: `system.adapter.${adapter}.香`,
        });
        const hosts = new Set<string>();
        for (const row of res?.rows ?? []) {
            const host = row.value?.common?.host;
            if (typeof host === 'string' && host && host !== this.host) {
                hosts.add(host);
            }
        }
        for (const host of [...hosts].sort()) {
            const alive = await this.states.getState(`system.host.${host}.alive`);
            if (alive?.val) {
                return host;
            }
        }
        throw new Error(`adapter "${adapter}" is not installed on this host and no running host has an instance of it`);
    }

    /**
     * Where a file of the listing is written to - checked, as the listing of another host is not trusted blindly
     *
     * @param target the local directory
     * @param relPath path of the file relative to the fetched directory
     */
    static #destination(target: string, relPath: unknown): string {
        return path.join(target, ...adapterFiles.splitRelativePath(relPath));
    }

    /**
     * Copy the directory of an adapter installed on this host
     *
     * @param adapter name of the adapter
     * @param dirPath the directory inside its package
     * @param target the local directory
     * @returns the copied files relative to `target`
     */
    async #copyLocal(adapter: string, dirPath: string, target: string): Promise<string[]> {
        const root = adapterFiles.getInstalledAdapterDir(adapter);
        const entries = await adapterFiles.listDir(root, dirPath);
        for (const entry of entries) {
            const dest = AdapterFileManager.#destination(target, entry.path);
            await fs.mkdir(path.dirname(dest), { recursive: true });
            await fs.copyFile(path.join(root, ...dirPath.split('/'), ...entry.path.split('/')), dest);
        }
        return entries.map(entry => entry.path);
    }

    /**
     * Fetch the directory of an adapter from another host
     *
     * @param host name of the host
     * @param adapter name of the adapter
     * @param dirPath the directory inside its package
     * @param target the local directory
     * @returns the written files relative to `target`
     */
    async #fetchFromHost(host: string, adapter: string, dirPath: string, target: string): Promise<string[]> {
        await this.#client.assertFeature(host, ADAPTER_FILES_FEATURE, 'hand out the files of adapters');

        const listing = await this.#client.request(host, 'listAdapterDir', { adapter, path: dirPath }, dirPath);
        if (!Array.isArray(listing.files)) {
            throw new Error(`invalid answer of host "${host}" to listAdapterDir`);
        }
        const planned: PlannedFile[] = listing.files.map((entry: unknown) => {
            const { path: relPath, size } = (entry ?? {}) as { path?: unknown; size?: unknown };
            return {
                path: relPath as string,
                dest: AdapterFileManager.#destination(target, relPath),
                size: Number.isSafeInteger(size) && (size as number) >= 0 ? (size as number) : Infinity,
            };
        });

        const tasks = AdapterFileManager.#groupFiles(planned);
        let next = 0;
        let failed = false;
        const worker = async (): Promise<void> => {
            while (!failed && next < tasks.length) {
                const task = tasks[next++];
                try {
                    if (task.length === 1) {
                        await this.#fetchFile(host, adapter, `${dirPath}/${task[0].path}`, task[0].dest);
                    } else {
                        await this.#fetchFiles(host, adapter, dirPath, task);
                    }
                } catch (e) {
                    failed = true;
                    throw e;
                }
            }
        };
        await Promise.all(Array.from({ length: Math.min(PARALLEL_REQUESTS, tasks.length) }, worker));

        return planned.map(file => file.path);
    }

    /**
     * Group the small files, so that several of them come with one request, and leave the big ones alone
     *
     * @param planned the files of the listing
     * @returns the groups; a group with one file is fetched with `readAdapterFile`
     */
    static #groupFiles(planned: PlannedFile[]): PlannedFile[][] {
        const tasks: PlannedFile[][] = [];
        let group: PlannedFile[] = [];
        let groupSize = 0;
        for (const file of planned) {
            if (file.size > SMALL_FILE_SIZE) {
                tasks.push([file]);
                continue;
            }
            if (
                group.length &&
                (group.length >= adapterFiles.ADAPTER_FILES_MAX_BATCH ||
                    groupSize + file.size > adapterFiles.ADAPTER_FILE_CHUNK_SIZE)
            ) {
                tasks.push(group);
                group = [];
                groupSize = 0;
            }
            group.push(file);
            groupSize += file.size;
        }
        if (group.length) {
            tasks.push(group);
        }
        return tasks;
    }

    /**
     * Fetch several small files from another host with one request and write them
     *
     * The host stops when it has read 1 MB in total, so a file that was cut off or left out is fetched on with
     * `readAdapterFile` - e.g. because it grew since the listing.
     *
     * @param host name of the host
     * @param adapter name of the adapter
     * @param dirPath the directory inside the package of the adapter
     * @param files the files of the listing
     */
    async #fetchFiles(host: string, adapter: string, dirPath: string, files: PlannedFile[]): Promise<void> {
        const paths = files.map(file => `${dirPath}/${file.path}`);
        const answer = await this.#client.request(
            host,
            'readAdapterFiles',
            { adapter, paths, length: adapterFiles.ADAPTER_FILE_CHUNK_SIZE, compress: true },
            dirPath,
        );
        if (!Array.isArray(answer.files) || answer.files.length > files.length) {
            throw new Error(`invalid answer of host "${host}" to readAdapterFiles`);
        }
        for (let i = 0; i < files.length; i++) {
            const first: Record<string, any> | undefined = answer.files[i];
            if (first && first.path !== paths[i]) {
                throw new Error(`invalid answer of host "${host}" to readAdapterFiles`);
            }
            await this.#fetchFile(host, adapter, paths[i], files[i].dest, first);
        }
    }

    /**
     * Fetch one file from another host piece by piece and write it
     *
     * @param host name of the host
     * @param adapter name of the adapter
     * @param filePath the file inside the package of the adapter
     * @param dest where the file is written to
     * @param first the beginning of the file if it came already with `readAdapterFiles`
     */
    async #fetchFile(
        host: string,
        adapter: string,
        filePath: string,
        dest: string,
        first?: Record<string, any>,
    ): Promise<void> {
        const chunkSize = adapterFiles.ADAPTER_FILE_CHUNK_SIZE;
        await fs.mkdir(path.dirname(dest), { recursive: true });
        const handle = await fs.open(dest, 'w');
        try {
            let offset = 0;
            // unknown until the first piece arrives
            const file: ChunkedFile = { size: -1, mtime: 0 };
            let chunk = first;
            do {
                // the beginning from readAdapterFiles may be shorter than a piece, as the host stops after 1 MB
                const fromBatch = !!chunk;
                chunk ??= await this.#client.request(
                    host,
                    'readAdapterFile',
                    { adapter, path: filePath, offset, length: chunkSize, compress: true },
                    filePath,
                );
                const data = await this.#client.decodeChunk(
                    host,
                    filePath,
                    chunk,
                    file,
                    offset,
                    fromBatch ? adapterFiles.ADAPTER_FILE_MAX_CHUNK_SIZE : chunkSize,
                    !fromBatch,
                );
                await handle.write(data, 0, data.length, offset);
                offset += data.length;
                chunk = undefined;
            } while (offset < file.size);
        } finally {
            await handle.close();
        }
    }
}
