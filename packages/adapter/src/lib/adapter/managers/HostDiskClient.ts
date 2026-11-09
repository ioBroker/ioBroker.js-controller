import type { MessagingManager } from '@/lib/adapter/managers/MessagingManager.js';
import { adapterFiles } from '@iobroker/js-controller-common';

/** How long the feature check waits for the other host, in ms */
const FEATURE_CHECK_TIMEOUT = 5_000;
/** How long one request - a listing or one piece of a file - may take, in ms */
const REQUEST_TIMEOUT = 30_000;

/** What is known about a file while its pieces arrive */
export interface ChunkedFile {
    /** Size of the whole file, `-1` until the first piece arrived */
    size: number;
    /** Time of the last modification, as the first piece said */
    mtime: number;
}

/**
 * The requester side of the host commands that read the disk of another host - shared by `fetchAdapterDir`
 * ({@link AdapterFileManager}) and the `iobdisk://` URLs ({@link DiskFileManager}), as both ask the js-controller of the
 * other host in the same way:
 *
 * - first `checkFeatureSupported` with a short timeout, once per host, as an older js-controller never answers an
 *   unknown command
 * - then the requests, each with a timeout, an answer `{ error }` turned into a rejection
 * - a file comes in pieces of the same form (`size`, `mtime`, `offset`, `data`, `compressed`); a piece is checked and
 *   unpacked here, and a different `size` or `mtime` than of the first piece means the file changed meanwhile
 */
export class HostDiskClient {
    readonly #getMessaging: () => MessagingManager;
    /** Hosts that answered the feature check positively, per feature */
    readonly #supported = new Map<string, Set<string>>();

    /**
     * @param getMessaging Returns the adapter's messaging manager, which matches the host's answers to the requests
     */
    constructor(getMessaging: () => MessagingManager) {
        this.#getMessaging = getMessaging;
    }

    /**
     * Make sure the js-controller of the host knows the feature
     *
     * @param host name of the host
     * @param feature the feature flag, e.g. `CONTROLLER_DISK_FILES`
     * @param purpose what the feature is for, for the error message, e.g. `hand out iobdisk:// files`
     * @throws {Error} if the host does not answer or its js-controller is too old
     */
    async assertFeature(host: string, feature: string, purpose: string): Promise<void> {
        const hosts = this.#supported.get(feature) ?? new Set<string>();
        if (hosts.has(host)) {
            return;
        }
        let answer: { result?: boolean } | undefined;
        try {
            answer = await this.#getMessaging().sendToHost({
                hostName: host,
                command: 'checkFeatureSupported',
                message: feature,
                expectReply: true,
                options: { timeout: FEATURE_CHECK_TIMEOUT },
            });
        } catch {
            throw new Error(`host "${host}" does not answer - it is not running or its js-controller is too old`);
        }
        if (!answer?.result) {
            throw new Error(`the js-controller of host "${host}" is too old to ${purpose}`);
        }
        hosts.add(host);
        this.#supported.set(feature, hosts);
    }

    /**
     * Send a request to a host and wait for the answer
     *
     * @param host name of the host
     * @param command the host command
     * @param message the payload
     * @param name what is asked for, for the error message, e.g. the path of the file
     * @throws {Error} if the host does not answer in time or answers with an error
     */
    async request(
        host: string,
        command: string,
        message: Record<string, unknown>,
        name: string,
    ): Promise<Record<string, any>> {
        const answer = await this.#getMessaging().sendToHost({
            hostName: host,
            command,
            message,
            expectReply: true,
            options: { timeout: REQUEST_TIMEOUT },
        });
        if (answer?.error) {
            throw new Error(`host "${host}" refused ${command} of "${name}": ${answer.error}`);
        }
        if (!answer || typeof answer !== 'object') {
            throw new Error(`invalid answer of host "${host}" to ${command} of "${name}"`);
        }
        return answer;
    }

    /**
     * Check a received piece of a file and unpack it
     *
     * @param host name of the host
     * @param name the file, for the error messages
     * @param chunk the received piece
     * @param file what is known about the file; the first piece fills it
     * @param offset where the piece has to start
     * @param length how many bytes the piece has to hold (`exact`), or may hold at most
     * @param exact whether the piece must hold exactly `length` bytes - not so the beginning of a file that came with
     *        other files in one answer, which the host may cut off
     * @throws {Error} if the piece does not fit or the file changed since the first piece
     */
    async decodeChunk(
        host: string,
        name: string,
        chunk: Record<string, any>,
        file: ChunkedFile,
        offset: number,
        length: number,
        exact: boolean,
    ): Promise<Buffer> {
        if (
            !Number.isSafeInteger(chunk.size) ||
            chunk.size < 0 ||
            typeof chunk.mtime !== 'number' ||
            chunk.offset !== offset
        ) {
            throw new Error(`invalid answer of host "${host}" for "${name}"`);
        }
        if (file.size === -1) {
            file.size = chunk.size;
            file.mtime = chunk.mtime;
        } else if (chunk.size !== file.size || chunk.mtime !== file.mtime) {
            throw new Error(`"${name}" changed on host "${host}" while it was fetched`);
        }
        const expected = Math.min(length, file.size - offset);
        let data: Buffer;
        try {
            data = await adapterFiles.decodeChunkData(chunk, Math.max(0, expected));
        } catch (e) {
            throw new Error(`invalid piece of "${name}" from host "${host}": ${e.message}`);
        }
        if (exact ? data.length !== expected : !data.length && expected > 0) {
            throw new Error(`incomplete piece of "${name}" from host "${host}"`);
        }
        return data;
    }
}
