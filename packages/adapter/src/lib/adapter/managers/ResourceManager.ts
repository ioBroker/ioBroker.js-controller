import type { AdapterContext } from '@/lib/adapter/context.js';
import { AdapterContextBase } from '@/lib/adapter/managers/AdapterContextBase.js';

/** Sub-id under a host holding the exclusive resources registered as used by its instances. */
const USED_RESOURCES_ID = 'usedResources';

/**
 * Owns the adapter's exclusive-resource registry. Register/free requests are forwarded to the host
 * this instance runs on, which keeps `system.host.<hostname>.usedResources.<type>` up to date; reads
 * go straight to those states.
 */
export class ResourceManager extends AdapterContextBase {
    /**
     * @param ctx Shared adapter context providing live runtime state
     */
    constructor(ctx: AdapterContext) {
        super(ctx);
    }

    /**
     * Registers an exclusive resource as used by this instance by forwarding it to the host.
     *
     * @param type the kind of resource, e.g. "serialPort" or "tcpPort"
     * @param data payload describing the resource
     * @param doNotDeleteAlreadyUsed if true, keep the resources this instance already registered instead of replacing them
     */
    async registerUsedResource<T extends ioBroker.UsedResourceType>(
        type: T,
        data: ioBroker.UsedResourceData<T>,
        doNotDeleteAlreadyUsed?: boolean,
    ): Promise<void> {
        const obj = {
            command: 'registerUsedResource',
            message: {
                type,
                data,
                instance: this.namespace,
                doNotDeleteAlreadyUsed: !!doNotDeleteAlreadyUsed,
            },
            from: `system.adapter.${this.namespace}`,
        };

        await this.states.pushMessage(`system.host.${this.host}`, obj);
    }

    /**
     * Frees a previously registered exclusive resource of this instance by forwarding it to the host.
     *
     * @param type the kind of resource, e.g. "serialPort" or "tcpPort"
     * @param data payload of the resource to free; if omitted, all resources of `type` are freed
     */
    async freeUsedResource<T extends ioBroker.UsedResourceType>(
        type: T,
        data?: ioBroker.UsedResourceData<T>,
    ): Promise<void> {
        const obj = {
            command: 'freeUsedResource',
            message: {
                type,
                data,
                instance: this.namespace,
            },
            from: `system.adapter.${this.namespace}`,
        };

        await this.states.pushMessage(`system.host.${this.host}`, obj);
    }

    /**
     * Reads the exclusive resources of the given `type` currently registered on this instance's host.
     *
     * @param type resource type to read, e.g. "serialPort"
     * @throws {Error} when the host of this instance is unknown
     */
    async getUsedResources<T extends ioBroker.UsedResourceType>(type: T): Promise<ioBroker.RegisteredResource<T>[]> {
        if (!this.host) {
            throw new Error('getUsedResources: host of this instance is unknown');
        }

        const state = await this.states.getState(`system.host.${this.host}.${USED_RESOURCES_ID}.${type}`);
        return ResourceManager.#parseResources<ioBroker.RegisteredResource<T>>(state);
    }

    /**
     * Reads all exclusive resources of every type currently registered on this instance's host.
     *
     * @throws {Error} when the host of this instance is unknown
     */
    async getAllUsedResources(): Promise<ioBroker.RegisteredResource[]> {
        if (!this.host) {
            throw new Error('getUsedResources: host of this instance is unknown');
        }

        const states = this.states;
        const keys = await states.getKeys(`system.host.${this.host}.${USED_RESOURCES_ID}.*`);

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
