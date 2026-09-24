import fs from 'fs-extra';
import { SYSTEM_ADAPTER_PREFIX } from '@iobroker/js-controller-common-db/constants';
import {
    getUsedResourcesMode,
    isValidUsedResourceType,
    normalizeUsedResourceData,
    resolveSerialPortName,
    withSerialPortDevice,
} from '@/lib/usedResources.js';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { ControllerLogger } from '@/lib/controller/types.js';
import type { InstanceManager } from '@/lib/controller/instances/instanceManager.js';
import type { UsedResourcesManager } from '@/lib/controller/instances/usedResourcesManager.js';
import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { HostCommand, HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/** Everything the host commands for the used resources of this host need */
export interface ResourceCommandsDeps {
    /** The connected objects database client */
    objects: ObjectsClient;
    /** Sends the answers back to the requester */
    messages: MessageBus;
    /** Takes care of all instances of this host */
    instances: InstanceManager;
    /** Keeps the registry of the resources used by the instances of this host */
    usedResources: UsedResourcesManager;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
    /** Name of this host */
    hostname: string;
}

/**
 * Determine which instance an incoming used-resources host message belongs to.
 *
 * The instance is derived from `msg.from` and not taken from the message body: the host message box is
 * reachable by everything that may `sendToHost`, so trusting `msg.message.instance` would let one instance
 * register resources in the name of another - or free another one's registrations of a whole type. A body
 * that claims a different instance is rejected instead of being silently corrected, so a caller that got it
 * wrong notices. (`from` is written by the sender as well, so this is a plausibility check and not an
 * authentication of the sender.)
 *
 * @param msg the received host message
 * @returns the namespace of the instance the message belongs to, e.g. "mqtt.0"
 */
function getMessageInstance(msg: ioBroker.SendableMessage): string {
    const from = typeof msg.from === 'string' ? msg.from : '';
    if (!from.startsWith(SYSTEM_ADAPTER_PREFIX) || from.length === SYSTEM_ADAPTER_PREFIX.length) {
        throw new Error(`used resources can only be addressed by an instance, but sender is "${from || 'unknown'}"`);
    }
    const instance = from.substring(SYSTEM_ADAPTER_PREFIX.length);

    const claimedInstance: unknown = msg.message?.instance;
    if (claimedInstance !== undefined && claimedInstance !== instance) {
        throw new Error(
            `instance "${instance}" must not act on the used resources of ${JSON.stringify(claimedInstance)}`,
        );
    }

    return instance;
}

/**
 * Refuse a change to the registry by an instance which does not declare its resources itself.
 *
 * An instance without the flag is controller-managed: its entries are derived from the instance object, and the
 * next change to that object replaces whatever it registered here. One that opted out has no entries at all, and
 * the next change drops what it registered. Accepting the call would look like it worked and the entry would
 * vanish later for an unrelated reason, so it is refused with something the adapter developer can act on.
 *
 * Only the mutating commands go through this. Asking whether somebody else holds a resource changes nothing, and
 * the instances which do not declare their own resources are exactly the ones that want to ask before they open a
 * port. The config comes from the instances of this host, so this costs no database read.
 *
 * @param deps What this group of commands needs
 * @param instance the namespace of the instance, e.g. "mqtt.0"
 */
async function assertInstanceDeclaresResources(deps: ResourceCommandsDeps, instance: string): Promise<void> {
    const id = `${SYSTEM_ADAPTER_PREFIX}${instance}` as ioBroker.ObjectIDs.Instance;
    // the instances of this host are cached, so this answers without a database read - but the flag lives in the
    // object, and the cache is missing exactly where it matters: an instance of another host sending here, and
    // one whose object was deleted while its process still runs. Both must not get through.
    let config = deps.instances.procs[id]?.config;

    if (!config) {
        try {
            config = (await deps.objects.getObject(id)) as ioBroker.InstanceObject;
        } catch (e) {
            // a change to the registry is refused when it cannot be justified
            throw new Error(`cannot read the object of instance "${instance}": ${e.message}`);
        }
    }

    if (!config?.common) {
        throw new Error(`instance "${instance}" does not exist`);
    }

    if (config.common.host !== deps.hostname) {
        // the registry belongs to one host, and the instance is supervised by the host it runs on
        throw new Error(`instance "${instance}" does not run on this host`);
    }

    const mode = getUsedResourcesMode(config);

    if (mode === 'controller') {
        throw new Error(
            `instance "${instance}" does not declare its used resources - add "common.declareUsedResources": true to its io-package.json`,
        );
    }
    if (mode === 'none') {
        throw new Error(
            `instance "${instance}" opted out of the used resources registry - "common.declareUsedResources" is false in its io-package.json, set it to true to declare used resources`,
        );
    }
}

/**
 * Let a caller that waits for an answer know when its change did not reach the state.
 *
 * The registry in memory has the change either way, and the next mutation of that type writes it again. But an
 * adapter that awaits `registerUsedResource` would otherwise get a resolved promise for something
 * `getHostUsedResources` cannot see, so the request/response path says what happened instead of only logging it.
 *
 * @param persisted what {@link UsedResourcesManager.persistTypes} reported
 */
function assertPersisted(persisted: boolean): void {
    if (!persisted) {
        throw new Error('the used resources could not be written, see the log of the host');
    }
}

/**
 * Validate an incoming `registerUsedResource` / `freeUsedResource` / `checkUsedResource` host message and bring
 * its payload into the stored form.
 *
 * The command decides two things: a registration has to describe the resource completely while a filter may leave
 * fields out, and only the two commands which change the registry require the instance to declare its resources
 * itself (see {@link assertInstanceDeclaresResources}).
 *
 * @param deps What this group of commands needs
 * @param msg the received host message
 * @param command which of the three commands the message carries
 * @returns the validated instance, resource type and normalized payload
 */
async function parseMessage(
    deps: ResourceCommandsDeps,
    msg: ioBroker.SendableMessage,
    command: 'register' | 'free' | 'check',
): Promise<{ instance: string; type: ioBroker.UsedResourceType; data: ioBroker.UsedResourceData | undefined }> {
    const isRegistration = command === 'register';
    const instance = getMessageInstance(msg);

    if (command !== 'check') {
        await assertInstanceDeclaresResources(deps, instance);
    }

    // the type becomes the last segment of "system.host.<name>.usedResources.<type>", so it must be validated
    const type: unknown = msg.message?.type;
    if (!isValidUsedResourceType(type)) {
        throw new Error(`invalid resource type ${JSON.stringify(type)}`);
    }

    const raw: unknown = msg.message?.data;
    if (raw === undefined) {
        if (isRegistration) {
            throw new Error(`missing payload for resource type "${type}"`);
        }
        return { instance, type, data: undefined };
    }
    if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
        throw new Error(`invalid payload for resource type "${type}"`);
    }

    const normalized = normalizeUsedResourceData(type, raw, !isRegistration);
    if ('error' in normalized) {
        throw new Error(`invalid payload for resource type "${type}": ${normalized.error}`);
    }

    let data = normalized.data;
    if (type === 'serialPort') {
        // this host is the machine the port belongs to, so only here it can be told which names lead to the
        // same device
        data = await withSerialPortDevice(data as Partial<ioBroker.SerialPortResourceData>, isRegistration, name =>
            resolveSerialPortName(name, process.platform, path => fs.realpath(path)),
        );
    }

    return { instance, type, data: data as ioBroker.UsedResourceData };
}

/**
 * Register a resource an instance occupies
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const registerUsedResource: HostCommand<ResourceCommandsDeps> = async (deps, msg) => {
    const { logger, hostLogPrefix, messages, usedResources } = deps;

    try {
        const { instance, type, data } = await parseMessage(deps, msg, 'register');

        // asked before the registration, so this instance's own entry is not in the way
        const conflicts = usedResources.registry.findConflicts(type, data!, instance);

        assertPersisted(await usedResources.persistTypes(usedResources.registry.register(type, data!, instance)));

        if (conflicts.length) {
            // The registration still stands - the registry records what an adapter says it uses, it does not
            // hand out permission. But two instances claiming the same resource is worth a line, because the
            // adapter that loses it usually reports something unhelpful like EADDRINUSE.
            logger.warn(
                `${hostLogPrefix} "${instance}" registered a ${type} which ${conflicts
                    .map(entry => `"${entry.instance}"`)
                    .join(', ')} already holds: ${JSON.stringify(data)}`,
            );
        }

        if (msg.callback && msg.from) {
            messages.sendTo(msg.from, msg.command, { result: 'ok', conflicts }, msg.callback);
        }
    } catch (e) {
        logger.warn(`${hostLogPrefix} Cannot register used resource: ${e.message}`);
        if (msg.callback && msg.from) {
            messages.sendTo(msg.from, msg.command, { error: e.message }, msg.callback);
        }
    }
};

/**
 * Ask whether anybody else currently holds a resource, without registering anything - the call an adapter
 * makes *before* it opens the port or the device
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const checkUsedResource: HostCommand<ResourceCommandsDeps> = async (deps, msg) => {
    const { logger, hostLogPrefix, messages, usedResources } = deps;

    try {
        const { instance, type, data } = await parseMessage(deps, msg, 'check');
        const conflicts = usedResources.registry.findConflicts(type, data || {}, instance);
        if (msg.callback && msg.from) {
            messages.sendTo(msg.from, msg.command, { result: 'ok', conflicts }, msg.callback);
        }
    } catch (e) {
        logger.warn(`${hostLogPrefix} Cannot check used resource: ${e.message}`);
        if (msg.callback && msg.from) {
            messages.sendTo(msg.from, msg.command, { error: e.message }, msg.callback);
        }
    }
};

/**
 * Free a resource an instance no longer occupies
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const freeUsedResource: HostCommand<ResourceCommandsDeps> = async (deps, msg) => {
    const { logger, hostLogPrefix, messages, usedResources } = deps;

    try {
        const { instance, type, data } = await parseMessage(deps, msg, 'free');
        const changed = usedResources.registry.free(type, data, instance);
        assertPersisted(await usedResources.persistTypes(changed));

        if (!changed.length) {
            // the payload is only a filter, so this is a real mismatch and not a forgotten optional field -
            // say so, because the adapter API does not wait for this answer
            logger.warn(
                `${hostLogPrefix} "${instance}" freed no used resource of type "${type}"${data ? ` matching ${JSON.stringify(data)}` : ''}: nothing like that is registered`,
            );
        }

        if (msg.callback && msg.from) {
            messages.sendTo(msg.from, msg.command, { result: 'ok', freed: !!changed.length }, msg.callback);
        }
    } catch (e) {
        logger.warn(`${hostLogPrefix} Cannot free used resource: ${e.message}`);
        if (msg.callback && msg.from) {
            messages.sendTo(msg.from, msg.command, { error: e.message }, msg.callback);
        }
    }
};

/**
 * Drop every resource an instance registered
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const clearUsedResources: HostCommand<ResourceCommandsDeps> = async (deps, msg) => {
    const { logger, hostLogPrefix, messages, usedResources } = deps;

    try {
        const instance = getMessageInstance(msg);
        await assertInstanceDeclaresResources(deps, instance);
        assertPersisted(await usedResources.persistTypes(usedResources.registry.removeInstance(instance)));
        if (msg.callback && msg.from) {
            messages.sendTo(msg.from, msg.command, { result: 'ok' }, msg.callback);
        }
    } catch (e) {
        logger.warn(`${hostLogPrefix} Cannot clear used resources: ${e.message}`);
        if (msg.callback && msg.from) {
            messages.sendTo(msg.from, msg.command, { error: e.message }, msg.callback);
        }
    }
};

/**
 * Create the host commands for the used resources of this host
 *
 * @param deps Everything these commands need
 */
export function createResourceCommands(deps: ResourceCommandsDeps): Record<string, HostCommandHandler> {
    return {
        registerUsedResource: msg => registerUsedResource(deps, msg),
        checkUsedResource: msg => checkUsedResource(deps, msg),
        freeUsedResource: msg => freeUsedResource(deps, msg),
        clearUsedResources: msg => clearUsedResources(deps, msg),
    };
}
