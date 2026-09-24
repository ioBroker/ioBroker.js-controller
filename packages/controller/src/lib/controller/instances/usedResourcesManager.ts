import { SYSTEM_ADAPTER_PREFIX } from '@iobroker/js-controller-common-db/constants';
import {
    getUsedResourcesMode,
    isRegisteredResource,
    isValidUsedResourceType,
    UsedResourcesRegistry,
} from '@/lib/usedResources.js';
import type { InstanceManager, InstanceManagerOptions } from '@/lib/controller/instances/instanceManager.js';

/** Everything the used resources manager needs to do its work */
export type UsedResourcesManagerOptions = Pick<
    InstanceManagerOptions,
    'objects' | 'states' | 'logger' | 'hostLogPrefix' | 'hostObjectPrefix' | 'hostname' | 'isCompactGroupController'
> & {
    /** The instances of this host */
    instances: InstanceManager;
};

/**
 * Keeps the registry of the exclusive resources (serial ports, TCP/UDP ports, USB devices, ...) used by the
 * instances of this host, and mirrors it into `system.host.<name>.usedResources.<type>`.
 *
 * The registry of a host belongs to its main controller: a compact group controller writes to its own
 * `system.host.<name>compactGroup<n>` prefix, which nobody reads, and would compete with the real one. Every
 * entry point therefore does nothing at all in a compact group controller.
 */
export class UsedResourcesManager {
    readonly #options: UsedResourcesManagerOptions;
    /**
     * In-memory registry of the exclusive resources currently used by the instances running on this host
     */
    readonly registry = new UsedResourcesRegistry();
    /** Resource types whose state object has already been created in this controller run */
    readonly #createdObjects = new Set<ioBroker.UsedResourceType>();
    /** The write currently in flight per resource type, so that two writes of the same type cannot interleave */
    readonly #pendingWrites = new Map<ioBroker.UsedResourceType, Promise<boolean>>();

    /**
     * @param options Everything the used resources manager needs to do its work
     */
    constructor(options: UsedResourcesManagerOptions) {
        this.#options = options;
    }

    /**
     * Write the current content of a resource type into `system.host.<name>.usedResources.<type>`.
     *
     * The object is only created the first time this type is written in this controller run - `extendObject`
     * costs an objects-DB write plus a change event broadcast to every connected client, which is not worth
     * paying on every resource change.
     *
     * Never rejects, because the callers are partly fire-and-forget: a failed write is logged and reported
     * through the return value, so the request/response handlers can tell the adapter that its change did not
     * reach the state.
     *
     * @param type the resource type to write
     * @returns whether the state was written
     */
    async #write(type: ioBroker.UsedResourceType): Promise<boolean> {
        const { objects, states, logger, hostLogPrefix, hostObjectPrefix } = this.#options;
        const id = `${hostObjectPrefix}.usedResources.${type}`;

        try {
            if (!this.#createdObjects.has(type)) {
                await objects.extendObject(id, {
                    type: 'state',
                    common: {
                        name: `Used resources: ${type}`,
                        type: 'array',
                        role: 'json',
                        read: true,
                        write: false,
                    },
                    native: {},
                });
                this.#createdObjects.add(type);
            }

            // read the registry only now: everything before this point may have yielded to another write
            const resources = this.registry.get(type);
            await states.setState(id, { val: JSON.stringify(resources), ack: true, from: hostObjectPrefix });
            return true;
        } catch (e) {
            logger.warn(`${hostLogPrefix} Cannot persist used resources of type "${type}": ${e.message}`);
            return false;
        }
    }

    /**
     * Persist the used resources of a given type into `system.host.<name>.usedResources.<type>`.
     *
     * Writes of the same type are chained: several callers are deliberately fire-and-forget (instance start and
     * exit handlers), so without the chain two of them could read the registry, interleave over their awaits and
     * let the older content win - which would then also be what the next controller start reads back.
     *
     * @param type the resource type to persist
     * @returns whether the state was written
     */
    #persist(type: ioBroker.UsedResourceType): Promise<boolean> {
        if (this.#options.isCompactGroupController) {
            // guarding here covers every caller, including the lifecycle handlers shared with the main controller
            return Promise.resolve(true);
        }

        const pending = this.#pendingWrites.get(type) || Promise.resolve();
        // `.catch` before chaining on purpose: a rejected link would otherwise never run the write of the
        // next one, and the cleanup below would never fire either - so that resource type would silently
        // stop being persisted for the rest of this controller's life. #write() handles its own errors
        // today, but that invariant lives in another method.
        const next = pending.catch(() => {}).then(() => this.#write(type));
        this.#pendingWrites.set(type, next);

        // forget the chain again once nothing else is queued behind it
        void next
            .catch(() => {})
            .then(() => {
                if (this.#pendingWrites.get(type) === next) {
                    this.#pendingWrites.delete(type);
                }
            });

        return next;
    }

    /**
     * Persist all given resource types (as reported changed by a registry mutation).
     *
     * @param types the resource types to persist
     * @returns whether every one of them was written
     */
    async persistTypes(types: ioBroker.UsedResourceType[]): Promise<boolean> {
        let persisted = true;
        for (const type of types) {
            persisted = (await this.#persist(type)) && persisted;
        }
        return persisted;
    }

    /**
     * Load the used resources persisted under `system.host.<name>.usedResources.*` back into the registry.
     * Called once on controller start so that registrations survive a controller restart.
     *
     * On load an assessment is done (see {@link UsedResourcesRegistry.assess}):
     * - all `isBlocked` flags are reset to `false`, because at controller start no instance is running yet
     *   (running instances re-register and thereby re-block their resources on their next start);
     * - resources of instances that no longer exist (e.g. deleted via CLI while the controller was down) are
     *   removed, and so are those of instances which opted out (`common.declareUsedResources: false`).
     */
    async load(): Promise<void> {
        const { objects, states, logger, hostLogPrefix, hostObjectPrefix, hostname, isCompactGroupController } =
            this.#options;

        if (isCompactGroupController) {
            // the registry of a host is owned by its main controller
            return;
        }

        try {
            // collect the instances (namespaces, e.g. "mqtt.0") of this host that may keep entries, and the ones
            // whose resources the controller derives from their configuration
            const trackedInstances = new Set<string>();
            const controllerManaged: ioBroker.InstanceObject[] = [];
            const instanceView = await objects.getObjectViewAsync('system', 'instance', {
                startkey: SYSTEM_ADAPTER_PREFIX,
                endkey: `${SYSTEM_ADAPTER_PREFIX}香`,
            });

            for (const row of instanceView.rows) {
                const instance = row.value;
                if (!instance?._id) {
                    continue;
                }
                // Only instances of this host count: the registry is per host, so an instance that was
                // moved elsewhere while this controller was down must not keep its entries alive here -
                // nothing would ever remove them, because no object change follows a move that already
                // happened.
                if (instance.common?.host !== hostname) {
                    continue;
                }

                const mode = getUsedResourcesMode(instance);
                // an instance that opted out must not keep anything, e.g. what was derived before an adapter
                // update set the flag - so it is treated like one that does not exist anymore
                if (mode === 'none') {
                    continue;
                }

                trackedInstances.add(instance._id.substring(SYSTEM_ADAPTER_PREFIX.length));
                if (mode === 'controller') {
                    controllerManaged.push(instance);
                }
            }

            // types whose content changed while loading and must be written back
            const changedTypes = new Set<ioBroker.UsedResourceType>();

            const keys = (await states.getKeys(`${hostObjectPrefix}.usedResources.*`)) || [];
            const values = keys.length ? (await states.getStates(keys)) || [] : [];
            for (let i = 0; i < keys.length; i++) {
                const state = values[i];
                if (!state || typeof state.val !== 'string' || !state.val) {
                    continue;
                }
                const type = keys[i].split('.').pop();
                if (!isValidUsedResourceType(type)) {
                    logger.warn(`${hostLogPrefix} Ignoring used resources of invalid type in "${keys[i]}"`);
                    continue;
                }
                try {
                    const parsed: unknown = JSON.parse(state.val);
                    if (Array.isArray(parsed)) {
                        // drop entries that do not have the expected shape, so nothing malformed enters the
                        // registry. An entry whose own type does not match the state it is stored in would land
                        // in this bucket while claiming to be something else, which makes conflicts and
                        // duplicates inconsistent.
                        const valid = parsed.filter(entry => isRegisteredResource(entry) && entry.type === type);
                        if (valid.length !== parsed.length) {
                            logger.warn(
                                `${hostLogPrefix} Ignoring ${parsed.length - valid.length} malformed used resource(s) of type "${type}"`,
                            );
                            changedTypes.add(type);
                        }
                        this.registry.setType(type, valid);
                    }
                } catch {
                    // ignore malformed content
                }
            }

            // reset blocking flags and drop resources of no longer existing or opted-out instances
            for (const type of this.registry.assess(trackedInstances)) {
                changedTypes.add(type);
            }

            // (re)derive the resources of the instances the controller manages itself, so that their configured
            // ports are listed no matter whether they were ever started
            for (const instance of controllerManaged) {
                for (const type of this.#seedInstance(instance)) {
                    changedTypes.add(type);
                }
            }

            await this.persistTypes([...changedTypes]);
        } catch (e) {
            logger.warn(`${hostLogPrefix} Cannot load used resources: ${e.message}`);
        }
    }

    /**
     * Determine the TCP port an instance occupies according to its configuration.
     *
     * @param instance the instance object
     * @returns the resource payload for `native.port` (plus `native.bind` if set), or null if no port is configured
     */
    #getConfiguredTcpPort(instance: ioBroker.InstanceObject): ioBroker.TcpPortResourceData | null {
        const port = instance.native?.port;
        const portNumber =
            typeof port === 'number'
                ? port
                : typeof port === 'string' && port.trim() !== ''
                  ? Number(port)
                  : Number.NaN;
        // port 0 means "pick a free one at runtime", so it does not occupy anything
        if (!Number.isInteger(portNumber) || portNumber <= 0 || portNumber > 65_535) {
            return null;
        }

        const data: ioBroker.TcpPortResourceData = { port: portNumber };
        // if the instance also binds to a specific interface, record it together with the port
        const bind = instance.native?.bind;
        if (typeof bind === 'string' && bind.trim() !== '') {
            data.bind = bind;
        }

        return data;
    }

    /**
     * Derive the used resources of an instance the controller manages itself (`common.declareUsedResources` not
     * set) from its configuration and replace what was derived for it before.
     *
     * Deriving from the object instead of registering on process start is what makes the registry answer the
     * question it exists for: a port configured for an instance that was never started, or that is currently
     * stopped, is listed as well - and a changed `native.port` is picked up right away instead of at the next
     * restart.
     *
     * @param instance the instance object
     * @returns the resource types that changed and should be persisted
     */
    #seedInstance(instance: ioBroker.InstanceObject): ioBroker.UsedResourceType[] {
        const namespace = instance._id.substring(SYSTEM_ADAPTER_PREFIX.length);
        const changed = new Set<ioBroker.UsedResourceType>(this.registry.removeInstance(namespace));

        const data = this.#getConfiguredTcpPort(instance);
        if (data) {
            for (const type of this.registry.register('tcpPort', data, namespace)) {
                changed.add(type);
            }
            // register() marks a resource as actively held, which is only true while the instance runs
            const isRunning = !!this.#options.instances.procs[instance._id]?.process;
            for (const type of this.registry.setInstanceBlocked(namespace, isRunning)) {
                changed.add(type);
            }
        }

        return [...changed];
    }

    /**
     * Bring the used-resources registry in line with an instance that is about to run.
     *
     * Called from the paths that actually launch a process, not from the start of an instance as a whole: a
     * redundant call for an instance that is already running must not touch the registry, because nothing
     * would re-register afterwards and the live entries would simply be gone.
     *
     * @param id the instance id, e.g. "system.adapter.mqtt.0"
     * @param instance the instance object
     */
    async markStarting(id: string, instance: ioBroker.InstanceObject): Promise<void> {
        if (this.#options.isCompactGroupController) {
            return;
        }

        const namespace = id.substring(SYSTEM_ADAPTER_PREFIX.length);

        await this.persistTypes(
            getUsedResourcesMode(instance) === 'controller'
                ? // the resources derived from the configuration are held again as soon as the instance runs
                  this.registry.setInstanceBlocked(namespace, true)
                : // the adapter declares its resources itself: drop what it declared before this (re)start,
                  // because the settings may have changed in between. What it registers now is additive.
                  // An instance that opted out has no entries, so this only catches a leftover.
                  this.registry.removeInstance(namespace),
        );
    }

    /**
     * Undo what {@link UsedResourcesManager.markStarting} prepared when the launch did not produce a process.
     *
     * Nothing corrects this later: the handler that unblocks the entries again is installed together with the
     * process, so a failed start would leave the derived resources of the instance listed as actively held. An
     * instance whose adapter declares its own resources has no entries at this point, which is exactly right -
     * it is not running and has not declared anything yet.
     *
     * @param id the instance id, e.g. "system.adapter.mqtt.0"
     */
    async markNotStarted(id: string): Promise<void> {
        if (this.#options.isCompactGroupController) {
            return;
        }

        await this.persistTypes(this.registry.setInstanceBlocked(this.#namespaceOf(id), false));
    }

    /**
     * Mark the resources of an instance as no longer actively held, because its process is gone.
     *
     * The registrations are kept: the user still sees which resources the instance would occupy when it is
     * started again.
     *
     * @param id the instance id, e.g. "system.adapter.mqtt.0", or its namespace
     */
    async markStopped(id: string): Promise<void> {
        if (this.#options.isCompactGroupController) {
            return;
        }

        await this.persistTypes(this.registry.setInstanceBlocked(this.#namespaceOf(id), false));
    }

    /**
     * Bring the used-resources registry in line with the current state of an instance object. This is the single
     * place where the configuration of an instance enters the registry:
     *
     * - an instance that was deleted or moved to another host loses all its entries;
     * - an instance the controller manages itself gets its entries derived from its configuration;
     * - an adapter-managed instance (`common.declareUsedResources: true`) is left alone - it declares its
     *   resources itself while it runs, and the start of the instance drops the previous declarations;
     * - an instance that opted out (`common.declareUsedResources: false`) loses all its entries, e.g. the ones
     *   derived before an adapter update set the flag.
     *
     * @param id the instance id, e.g. "system.adapter.mqtt.0"
     * @param obj the current instance object, or null if the instance was deleted
     */
    async syncInstance(id: ioBroker.ObjectIDs.Instance, obj: ioBroker.InstanceObject | null): Promise<void> {
        if (this.#options.isCompactGroupController) {
            // the registry of a host is owned by its main controller
            return;
        }

        const namespace = id.substring(SYSTEM_ADAPTER_PREFIX.length);
        let changed: ioBroker.UsedResourceType[];

        if (!obj?.common || obj.common.host !== this.#options.hostname) {
            // deleted or moved to another host: this host does not track its resources anymore
            changed = this.registry.removeInstance(namespace);
        } else {
            const mode = getUsedResourcesMode(obj);

            if (mode === 'adapter') {
                if (this.#options.instances.procs[id]?.process) {
                    // it is running, so its entries are the ones it declared itself - and nothing would register
                    // them again before the next start
                    return;
                }

                // It is not running, so whatever is left can only be what the controller derived before the flag
                // was set, e.g. by an adapter update. Nothing else would ever remove it: the entries are dropped
                // when the instance starts, which may be never.
                changed = this.registry.removeInstance(namespace);
            } else {
                changed = mode === 'controller' ? this.#seedInstance(obj) : this.registry.removeInstance(namespace);
            }
        }

        await this.persistTypes(changed);
    }

    /**
     * The namespace of an instance, whichever of the two forms the caller has
     *
     * @param id the instance id, e.g. "system.adapter.mqtt.0", or its namespace, e.g. "mqtt.0"
     */
    #namespaceOf(id: string): string {
        return id.startsWith(SYSTEM_ADAPTER_PREFIX) ? id.substring(SYSTEM_ADAPTER_PREFIX.length) : id;
    }
}
