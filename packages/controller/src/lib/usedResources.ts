/**
 * In-memory registry of exclusive resources (serial ports, TCP/UDP ports, USB devices, ...) occupied by the
 * adapter instances running on a host.
 *
 * This module contains only the pure, side-effect-free bookkeeping logic so that it can be unit tested without
 * a running controller. Persistence into `system.host.<name>.usedResources.<type>` and the message handling
 * live in `main.ts`, which owns a single {@link UsedResourcesRegistry} instance and persists the resource types
 * that the mutating methods report as changed.
 */

/**
 * Build a stable comparison key for a registered resource so that duplicates can be detected and the correct
 * entry can be freed. The key is composed of the instance, the type and the sorted payload; the bookkeeping
 * fields (`ts`, `isBlocked`) are intentionally ignored so that re-registering or (un)blocking hits the same entry.
 *
 * @param resource the registered resource (or a partial one carrying at least type, instance and payload)
 */
export function getUsedResourceKey(resource: ioBroker.RegisteredResource): string {
    const { type, instance, ts: _ts, isBlocked: _isBlocked, ...data } = resource;
    const sorted = Object.keys(data)
        .sort()
        .map(key => `${key}=${String((data as Record<string, unknown>)[key])}`)
        .join(',');
    return `${instance}|${type}|${sorted}`;
}

/** Options for the {@link UsedResourcesRegistry} */
export interface UsedResourcesRegistryOptions {
    /** Clock used for the `ts` of newly registered resources. Injectable for deterministic tests. Defaults to `Date.now`. */
    now?: () => number;
}

/**
 * Pure in-memory registry of the used resources of a single host.
 *
 * All mutating methods return the list of resource types they changed, so the caller can persist exactly those
 * (and only those) types. Nothing here touches the databases.
 */
export class UsedResourcesRegistry {
    private readonly resources = new Map<ioBroker.UsedResourceType, ioBroker.RegisteredResource[]>();
    private readonly now: () => number;

    /**
     * @param options optional configuration, e.g. an injectable clock for deterministic tests
     */
    constructor(options: UsedResourcesRegistryOptions = {}) {
        this.now = options.now ?? Date.now;
    }

    /**
     * Replace the whole list of a resource type. Used when loading the persisted state back into memory.
     *
     * @param type the resource type
     * @param list the resources of that type
     */
    setType(type: ioBroker.UsedResourceType, list: ioBroker.RegisteredResource[]): void {
        this.resources.set(type, list);
    }

    /** All resource types that currently hold at least one entry. */
    getTypes(): ioBroker.UsedResourceType[] {
        return [...this.resources.keys()];
    }

    /**
     * Get the registered resources, optionally filtered by type.
     *
     * @param type optional resource type to filter for; if omitted, resources of all types are returned
     */
    get(type?: ioBroker.UsedResourceType): ioBroker.RegisteredResource[] {
        const clone = (r: ioBroker.RegisteredResource): ioBroker.RegisteredResource => ({ ...r });
        if (type) {
            return (this.resources.get(type) || []).map(clone);
        }
        const all: ioBroker.RegisteredResource[] = [];
        for (const list of this.resources.values()) {
            all.push(...list.map(clone));
        }
        return all;
    }

    /**
     * Register a resource as used by an instance.
     *
     * By default all resources previously registered by this instance are dropped first (the settings may have
     * changed before the (re)start, making old registrations invalid). Pass `doNotDeleteAlreadyUsed = true` to
     * keep them, which is how an instance registers more than one resource.
     *
     * @param type the resource type, e.g. "serialPort"
     * @param data the type-specific payload describing the resource
     * @param instance the instance that occupies the resource, e.g. "mqtt.0"
     * @param doNotDeleteAlreadyUsed keep the instance's already registered resources instead of replacing them
     * @returns the resource types that changed and should be persisted
     */
    register(
        type: ioBroker.UsedResourceType,
        data: ioBroker.UsedResourceData,
        instance: string,
        doNotDeleteAlreadyUsed?: boolean,
    ): ioBroker.UsedResourceType[] {
        const changed = new Set<ioBroker.UsedResourceType>();

        if (!doNotDeleteAlreadyUsed) {
            for (const t of this.removeInstance(instance)) {
                changed.add(t);
            }
        }

        // an instance can only register a resource while it is running, so it is actively blocking it
        const resource = {
            type,
            instance,
            ts: this.now(),
            isBlocked: true,
            ...data,
        } as ioBroker.RegisteredResource;
        const list = this.resources.get(type) || [];
        const key = getUsedResourceKey(resource);
        const existingIndex = list.findIndex(entry => getUsedResourceKey(entry) === key);

        if (existingIndex === -1) {
            list.push(resource);
        } else {
            // refresh the timestamp and blocking flag of an already known resource
            list[existingIndex] = resource;
        }

        this.resources.set(type, list);
        changed.add(type);
        return [...changed];
    }

    /**
     * Free a previously registered resource of an instance. If `data` is omitted, all resources of the given
     * type belonging to that instance are freed.
     *
     * @param type the resource type, e.g. "serialPort"
     * @param data the payload of the resource to free; if omitted, all resources of `type` for the instance are freed
     * @param instance the instance that occupied the resource, e.g. "mqtt.0"
     * @returns the resource types that changed and should be persisted
     */
    free(
        type: ioBroker.UsedResourceType,
        data: ioBroker.UsedResourceData | undefined,
        instance: string,
    ): ioBroker.UsedResourceType[] {
        const list = this.resources.get(type);
        if (!list) {
            return [];
        }

        let filtered: ioBroker.RegisteredResource[];
        if (data === undefined) {
            // free all resources of this type for the instance
            filtered = list.filter(entry => entry.instance !== instance);
        } else {
            const key = getUsedResourceKey({
                type,
                instance,
                ts: 0,
                isBlocked: false,
                ...data,
            } as ioBroker.RegisteredResource);
            filtered = list.filter(entry => getUsedResourceKey(entry) !== key);
        }

        if (filtered.length === list.length) {
            return [];
        }

        this.resources.set(type, filtered);
        return [type];
    }

    /**
     * Update the `isBlocked` flag of all resources of an instance across all types. Called on instance start
     * (blocked) and stop (not blocked): a stopped instance keeps its registrations, but they are no longer held.
     *
     * @param instance the instance whose resources should be updated, e.g. "mqtt.0"
     * @param isBlocked whether the instance is currently running and actively using the resources
     * @returns the resource types that changed and should be persisted
     */
    setInstanceBlocked(instance: string, isBlocked: boolean): ioBroker.UsedResourceType[] {
        const changed: ioBroker.UsedResourceType[] = [];
        for (const [type, list] of this.resources) {
            let typeChanged = false;
            for (const entry of list) {
                if (entry.instance === instance && entry.isBlocked !== isBlocked) {
                    entry.isBlocked = isBlocked;
                    typeChanged = true;
                }
            }
            if (typeChanged) {
                changed.push(type);
            }
        }
        return changed;
    }

    /**
     * Remove all resources registered by the given instance across all types. Used when an instance is deleted.
     *
     * @param instance the instance whose resources should be removed, e.g. "mqtt.0"
     * @returns the resource types that changed and should be persisted
     */
    removeInstance(instance: string): ioBroker.UsedResourceType[] {
        const changed: ioBroker.UsedResourceType[] = [];
        for (const [type, list] of this.resources) {
            if (list.some(entry => entry.instance === instance)) {
                this.resources.set(
                    type,
                    list.filter(entry => entry.instance !== instance),
                );
                changed.push(type);
            }
        }
        return changed;
    }

    /**
     * Assessment run on controller start: reset every `isBlocked` flag to `false` (no instance is running yet)
     * and drop resources whose instance no longer exists (e.g. deleted via CLI while the controller was down).
     *
     * @param existingInstances the namespaces of the instances that currently exist, e.g. `new Set(['mqtt.0'])`
     * @returns the resource types that changed and should be persisted
     */
    assess(existingInstances: Set<string>): ioBroker.UsedResourceType[] {
        const changed: ioBroker.UsedResourceType[] = [];
        for (const [type, list] of this.resources) {
            const cleaned = list
                .filter(entry => existingInstances.has(entry.instance))
                .map(entry => (entry.isBlocked ? { ...entry, isBlocked: false } : entry));

            const wasChanged = cleaned.length !== list.length || list.some(entry => entry.isBlocked);
            if (wasChanged) {
                this.resources.set(type, cleaned);
                changed.push(type);
            }
        }
        return changed;
    }
}
