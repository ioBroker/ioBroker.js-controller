/**
 * In-memory registry of exclusive resources (serial ports, TCP/UDP ports, USB devices, ...) occupied by the
 * adapter instances running on a host.
 *
 * This module contains only the pure, side-effect-free bookkeeping logic so that it can be unit tested without
 * a running controller. Persistence into `system.host.<name>.usedResources.<type>` and the message handling
 * live in `main.ts`, which owns a single {@link UsedResourcesRegistry} instance and persists the resource types
 * that the mutating methods report as changed.
 */

/** A resource type ends up as the last segment of `system.host.<name>.usedResources.<type>`, so it has to be a plain identifier */
const RESOURCE_TYPE_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

/**
 * Check that a value can be used as a resource type.
 *
 * `UsedResourceDataMap` is intentionally open for module augmentation, so unknown type names are accepted as
 * long as they are usable as a state id segment. What this rejects is a missing, non-string or otherwise
 * malformed type, which would create a `system.host.<name>.usedResources.undefined` state that
 * {@link UsedResourcesRegistry} would happily read back as a real resource type on the next controller start.
 *
 * @param type the value to check
 */
export function isValidUsedResourceType(type: unknown): type is ioBroker.UsedResourceType {
    return typeof type === 'string' && RESOURCE_TYPE_PATTERN.test(type);
}

/**
 * Check that a value has the shape of a registered resource. Used when reading entries back from the
 * persisted state, so that malformed or outdated content cannot enter the registry.
 *
 * @param entry the value to check
 */
export function isRegisteredResource(entry: unknown): entry is ioBroker.RegisteredResource {
    if (typeof entry !== 'object' || entry === null) {
        return false;
    }
    const candidate = entry as Partial<ioBroker.RegisteredResource>;
    return (
        isValidUsedResourceType(candidate.type) &&
        typeof candidate.instance === 'string' &&
        !!candidate.instance &&
        typeof candidate.ts === 'number' &&
        typeof candidate.isBlocked === 'boolean' &&
        typeof candidate.data === 'object' &&
        candidate.data !== null &&
        !Array.isArray(candidate.data)
    );
}

/**
 * Build a stable comparison key for a registered resource so that duplicates can be detected and the correct
 * entry can be freed. The key is composed of the instance, the type and the sorted payload; the bookkeeping
 * fields (`ts`, `isBlocked`) are intentionally ignored so that re-registering or (un)blocking hits the same entry.
 *
 * Payload values are serialized with `JSON.stringify`, so `80` and `"80"` stay distinguishable, and keys with
 * an `undefined` value are dropped, so passing an optional field explicitly as `undefined` produces the same
 * key as omitting it (which is also what survives the JSON round-trip through the persisted state).
 *
 * @param resource the resource to build the key for
 * @param resource.type the resource type, e.g. "serialPort"
 * @param resource.instance the instance that occupies the resource, e.g. "mqtt.0"
 * @param resource.data the type-specific payload describing the resource
 */
export function getUsedResourceKey(resource: {
    type: ioBroker.UsedResourceType;
    instance: string;
    data: ioBroker.UsedResourceData | undefined;
}): string {
    const { type, instance } = resource;
    const data = (resource.data || {}) as Record<string, unknown>;
    const sorted = Object.keys(data)
        .filter(key => data[key] !== undefined)
        .sort()
        .map(key => `${key}=${JSON.stringify(data[key])}`)
        .join(',');
    return `${instance}|${type}|${sorted}`;
}

/**
 * Check whether a registered payload matches a filter: every field the filter names must be equal, fields it
 * does not name are ignored. An omitted or empty filter matches everything.
 *
 * Values are compared serialized, so `80` and `"80"` stay different and structured values are compared by
 * content - the same rules {@link getUsedResourceKey} applies. A field explicitly set to `undefined` counts
 * as not named, because that is also what survives the JSON round-trip through the persisted state.
 *
 * @param data the payload of a registered resource
 * @param filter the fields that have to match
 */
export function matchesUsedResourceData(
    data: ioBroker.UsedResourceData,
    filter: Partial<ioBroker.UsedResourceData> | undefined,
): boolean {
    if (!filter) {
        return true;
    }

    const entries = data as unknown as Record<string, unknown>;
    for (const [key, value] of Object.entries(filter as Record<string, unknown>)) {
        if (value === undefined) {
            continue;
        }
        if (JSON.stringify(entries[key]) !== JSON.stringify(value)) {
            return false;
        }
    }

    return true;
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
        this.setEntries(type, list);
    }

    /**
     * Store the entries of a resource type, dropping the type entirely when nothing is left. An empty bucket
     * would otherwise be reported by {@link UsedResourcesRegistry.getTypes} and be persisted and reloaded
     * forever, for every type any instance of this host ever used.
     *
     * @param type the resource type
     * @param list the remaining resources of that type
     */
    private setEntries(type: ioBroker.UsedResourceType, list: ioBroker.RegisteredResource[]): void {
        if (list.length) {
            this.resources.set(type, list);
        } else {
            this.resources.delete(type);
        }
    }

    /** All resource types that currently hold at least one entry. */
    getTypes(): ioBroker.UsedResourceType[] {
        return [...this.resources.keys()];
    }

    /**
     * Get the registered resources, optionally filtered by type.
     *
     * The entries are deep copies, so a caller cannot reach into the registry through the nested `data` of a
     * returned entry.
     *
     * @param type optional resource type to filter for; if omitted, resources of all types are returned
     */
    get(type?: ioBroker.UsedResourceType): ioBroker.RegisteredResource[] {
        const clone = (r: ioBroker.RegisteredResource): ioBroker.RegisteredResource => structuredClone(r);
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
     * Registering is always **additive**: an instance registers one entry per resource it occupies, in any
     * order and from any number of async init paths. Dropping what an instance registered earlier is a
     * separate, explicit operation ({@link UsedResourcesRegistry.removeInstance}), which the controller
     * performs once when the instance starts.
     *
     * @param type the resource type, e.g. "serialPort"
     * @param data the type-specific payload describing the resource
     * @param instance the instance that occupies the resource, e.g. "mqtt.0"
     * @returns the resource types that changed and should be persisted
     */
    register<T extends ioBroker.UsedResourceType>(
        type: T,
        data: ioBroker.UsedResourceData<T>,
        instance: string,
    ): ioBroker.UsedResourceType[] {
        // an instance can only register a resource while it is running, so it is actively blocking it.
        // `satisfies` checks the shape against the entry for exactly this `type`; the cast afterwards only
        // widens it to the stored union, which TypeScript cannot derive from the generic on its own.
        const resource = {
            type,
            data,
            instance,
            ts: this.now(),
            isBlocked: true,
        } satisfies ioBroker.RegisteredResource<T> as ioBroker.RegisteredResource;

        const list = this.resources.get(type) || [];
        const key = getUsedResourceKey(resource);
        const existingIndex = list.findIndex(entry => getUsedResourceKey(entry) === key);

        if (existingIndex === -1) {
            list.push(resource);
        } else {
            // refresh the timestamp and blocking flag of an already known resource
            list[existingIndex] = resource;
        }

        this.setEntries(type, list);
        return [type];
    }

    /**
     * Free the resources of an instance that match a description.
     *
     * `data` is a **filter, not an exact payload**: every field it names must match, fields it does not name
     * are ignored. So `free('tcpPort', { port: 8080 }, 'web.0')` also frees an entry that was registered as
     * `{ port: 8080, bind: '0.0.0.0' }` - the caller does not have to repeat optional fields it may not even
     * know about (the controller adds `bind` to the resources it derives itself). An omitted or empty `data`
     * matches everything, which frees all resources of that type for the instance.
     *
     * Only the entries of `instance` are ever considered, so a filter can never reach a foreign registration.
     *
     * @param type the resource type, e.g. "serialPort"
     * @param data the fields identifying the resources to free; if omitted, all resources of `type` for the instance are freed
     * @param instance the instance that occupied the resource, e.g. "mqtt.0"
     * @returns the resource types that changed and should be persisted - empty if nothing matched
     */
    free<T extends ioBroker.UsedResourceType>(
        type: T,
        data: Partial<ioBroker.UsedResourceData<T>> | undefined,
        instance: string,
    ): ioBroker.UsedResourceType[] {
        const list = this.resources.get(type);
        if (!list) {
            return [];
        }

        const filtered = list.filter(
            entry => entry.instance !== instance || !matchesUsedResourceData(entry.data, data),
        );

        if (filtered.length === list.length) {
            return [];
        }

        this.setEntries(type, filtered);
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
     * Remove all resources registered by the given instance across all types.
     *
     * Used when an instance is deleted or moved to another host, and once when an instance starts: the user
     * may have changed the settings in between, so what the instance registered before is dropped and the
     * instance (or the controller) declares from scratch what it really occupies now.
     *
     * @param instance the instance whose resources should be removed, e.g. "mqtt.0"
     * @returns the resource types that changed and should be persisted
     */
    removeInstance(instance: string): ioBroker.UsedResourceType[] {
        const changed: ioBroker.UsedResourceType[] = [];
        for (const [type, list] of this.resources) {
            if (list.some(entry => entry.instance === instance)) {
                this.setEntries(
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
                this.setEntries(type, cleaned);
                changed.push(type);
            }
        }
        return changed;
    }
}
