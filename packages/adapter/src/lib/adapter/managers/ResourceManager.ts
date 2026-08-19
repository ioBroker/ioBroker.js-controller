import type { AdapterContext } from '@/lib/adapter/context.js';
import { AdapterContextBase } from '@/lib/adapter/managers/AdapterContextBase.js';
import type { MessagingManager } from '@/lib/adapter/managers/MessagingManager.js';

/** Sub-id under a host holding the exclusive resources registered as used by its instances. */
const USED_RESOURCES_ID = 'usedResources';
/** How long a mutating command waits for the host to answer, in ms */
const HOST_REPLY_TIMEOUT = 5_000;

/**
 * Owns the adapter's exclusive-resource registry. Register/free requests are forwarded to the host
 * this instance runs on, which keeps `system.host.<hostname>.usedResources.<type>` up to date; reads
 * go straight to those states.
 */
export class ResourceManager extends AdapterContextBase {
    readonly #getMessaging: () => MessagingManager;

    /**
     * @param ctx Shared adapter context providing live runtime state
     * @param getMessaging Returns the adapter's messaging manager. Passed as a getter rather than an
     *        instance because it is created lazily - and it has to be *the* one, since it owns the map
     *        the host's reply is matched against.
     */
    constructor(ctx: AdapterContext, getMessaging: () => MessagingManager) {
        super(ctx);
        this.#getMessaging = getMessaging;
    }

    /**
     * Send a mutating command to the host this instance runs on and wait for its verdict.
     *
     * The host validates every one of these - resource type, payload shape, the sending instance and
     * whether it declares its resources at all - and answers with `{ error }` when it refuses. Without
     * waiting for that answer the adapter would get a resolved promise for a call that did nothing,
     * and the only trace would be a warning in a log the adapter developer does not read.
     *
     * @param command the host command, e.g. "registerUsedResource"
     * @param message the command payload
     * @returns the host's answer
     * @throws {Error} when the host is unknown, does not answer in time, or refuses the command
     */
    async #sendToHost(command: string, message: Record<string, unknown>): Promise<any> {
        if (!this.host) {
            throw new Error(`${command}: host of this instance is unknown`);
        }

        const answer = await this.#getMessaging().sendToHost({
            hostName: this.host,
            command,
            message,
            expectReply: true,
            // without one there is no timer at all, so an older controller which does not know the
            // command would leave this promise pending forever
            options: { timeout: HOST_REPLY_TIMEOUT },
        });

        if (answer?.error) {
            throw new Error(`${command} was refused by the host: ${answer.error}`);
        }

        return answer;
    }

    /**
     * Registers an exclusive resource as used by this instance by forwarding it to the host.
     *
     * Registering is additive - one call per occupied resource, in any order. The host drops what this
     * instance registered before when it starts, so there is nothing to reset by hand.
     *
     * @param type the kind of resource, e.g. "serialPort" or "tcpPort"
     * @param data payload describing the resource
     * @throws {Error} when the host refuses the registration or does not answer
     */
    async registerUsedResource<T extends ioBroker.UsedResourceType>(
        type: T,
        data: ioBroker.UsedResourceData<T>,
    ): Promise<void> {
        await this.#sendToHost('registerUsedResource', { type, data, instance: this.namespace });
    }

    /**
     * Asks the host whether another instance currently holds a resource, without registering anything.
     *
     * Meant to be called *before* the port or the device is opened: afterwards the operating system
     * has already decided the conflict, and all this can add is a better error message.
     *
     * The answer is a hint, not a permission. The registry only knows what adapters declare, so an
     * empty list does not promise the resource is free - something outside ioBroker may hold it.
     *
     * @param type the kind of resource, e.g. "serialPort" or "tcpPort"
     * @param data description of the resource that is about to be used
     * @returns the entries of other instances that currently hold it, newest first
     * @throws {Error} when the host refuses the request or does not answer
     */
    async checkUsedResource<T extends ioBroker.UsedResourceType>(
        type: T,
        data?: Partial<ioBroker.UsedResourceData<T>>,
    ): Promise<ioBroker.RegisteredResource[]> {
        const answer = await this.#sendToHost('checkUsedResource', { type, data, instance: this.namespace });
        return Array.isArray(answer?.conflicts) ? answer.conflicts : [];
    }

    /**
     * Frees all exclusive resources this instance registered, across all types, by forwarding it to the host.
     *
     * @throws {Error} when the host refuses the command or does not answer
     */
    async clearUsedResources(): Promise<void> {
        await this.#sendToHost('clearUsedResources', { instance: this.namespace });
    }

    /**
     * Frees previously registered exclusive resources of this instance by forwarding it to the host.
     *
     * @param type the kind of resource, e.g. "serialPort" or "tcpPort"
     * @param data fields identifying the resources to free; if omitted, all resources of `type` are freed
     * @throws {Error} when the host refuses the command or does not answer
     */
    async freeUsedResource<T extends ioBroker.UsedResourceType>(
        type: T,
        data?: Partial<ioBroker.UsedResourceData<T>>,
    ): Promise<void> {
        await this.#sendToHost('freeUsedResource', { type, data, instance: this.namespace });
    }

    /**
     * Reads the exclusive resources of the given type currently registered on this instance's host, across
     * all its instances.
     *
     * @param type resource type to read, e.g. "serialPort"
     * @throws {Error} when the host of this instance is unknown
     */
    async getHostUsedResources<T extends ioBroker.UsedResourceType>(type: T): Promise<ioBroker.RegisteredResource<T>[]>;
    /** Reads the exclusive resources of every type currently registered on this instance's host. */
    async getHostUsedResources(): Promise<ioBroker.RegisteredResource[]>;

    /**
     * @param type resource type to read; if omitted, the resources of every type are read
     */
    async getHostUsedResources(type?: ioBroker.UsedResourceType): Promise<ioBroker.RegisteredResource[]> {
        if (!this.host) {
            throw new Error('getHostUsedResources: host of this instance is unknown');
        }

        const states = this.states;
        const prefix = `system.host.${this.host}.${USED_RESOURCES_ID}`;

        if (type !== undefined) {
            const state = await states.getState(`${prefix}.${type}`);
            return ResourceManager.#parseResources<ioBroker.RegisteredResource>(state);
        }

        const keys = await states.getKeys(`${prefix}.*`);

        const resources: ioBroker.RegisteredResource[] = [];
        if (keys?.length) {
            const values = await states.getStates(keys);
            for (const state of values) {
                resources.push(...ResourceManager.#parseResources<ioBroker.RegisteredResource>(state));
            }
        }

        return resources;
    }

    /**
     * Parses a `usedResources` state value (a JSON-encoded array) into a typed list, ignoring
     * malformed or empty content.
     *
     * @param state the state holding the JSON-encoded resource array, if any
     */
    static #parseResources<R>(state: ioBroker.State | null | undefined): R[] {
        if (state && typeof state.val === 'string' && state.val) {
            try {
                const parsed: unknown = JSON.parse(state.val);
                if (Array.isArray(parsed)) {
                    return parsed as R[];
                }
            } catch {
                // ignore malformed content
            }
        }
        return [];
    }
}
