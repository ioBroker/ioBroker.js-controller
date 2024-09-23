import { tools } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';

/**
 *
 * @param val The value to format for output
 * @param pretty Whether it should be pretty-printed
 */
export function formatValue(val: any, pretty = false): string {
    // Only use JSON.stringify if we need it (for objects and arrays)
    const needsStringify = tools.isObject(val) || tools.isArray(val);
    const output = !needsStringify ? val : pretty ? JSON.stringify(val, null, 2) : JSON.stringify(val);
    return output;
}

/** Returns the "from" property for objects changed by the CLI */
export function getObjectFrom(): `system.host.${string}.cli` {
    return `system.host.${tools.getHostName()}.cli`;
}

/**
 * Removes <tools.appName> from the start of the adapter name if it is there
 * E.g. iobroker.admin -> admin
 *
 * @param name The adapter name to normalize
 */
export function normalizeAdapterName(name: string): string {
    if (typeof name === 'string') {
        name = name.replace(new RegExp(`^${tools.appName}\\.`, 'i'), '');
    }
    return name;
}

/**
 * Ensures that the given string is a valid adapter identifier (<adaptername>) WITHOUT instance number
 *
 * @param name The name which is supposed to be an adapter identifier
 */
export function validateAdapterIdentifier(name: string): boolean {
    return /^[a-z0-9\-_]+$/.test(name);
}

/**
 * Ensures that the given string contains a valid identifier for
 * an adapter (without instance number) or instance (with instance number)
 *
 * @param name the adapter name or instance
 */
export function validateAdapterOrInstanceIdentifier(name: string): boolean {
    return /^[a-z0-9\-_]+(\.\d+)?$/.test(name);
}

/**
 * Ensures that the given string contains a valid identifier for
 * an adapter (without instance number) or instance (with instance number)
 *
 * @param name the adapter name or instance
 */
export function splitAdapterOrInstanceIdentifierWithVersion(
    name: string,
): { name: string; instance: string | null; version: string | null; nameWithVersion: string } | null {
    const res = name.match(/^([a-z0-9\-_]+)\.?(\d+)?@?([a-z0-9\-_.]*)?$/);
    if (!res) {
        return null;
    }
    return {
        name: res[1],
        instance: res[2] || null,
        version: res[3] || null,
        nameWithVersion: `${res[1]}${res[3] ? `@${res[3]}` : ''}`,
    };
}

/**
 * Extracts the instance name from an object ID
 *
 * @param instanceObjID The ID of the instance object
 */
export function getInstanceName(instanceObjID: string): string {
    return instanceObjID.replace(/^system\.adapter\./i, '');
}

/**
 * Enumerates the instances of an adapter or all of them
 *
 * @param objects The objects DB to use
 * @param adapter (optional) The adapter whose instances should be enumerated
 * @returns An array of instance objects
 */
export async function enumInstances(objects: ObjectsClient, adapter?: string): Promise<ioBroker.InstanceObject[]> {
    // if no adapter given all instances should be returned
    const startkey = `system.adapter.${adapter ? `${adapter}.` : ''}`;
    const data = await enumObjects(objects, 'instance', startkey);
    // because of startkey logic not only receive objects with the dot at the end, so filter them!
    return data.filter((it): it is ioBroker.InstanceObject => !!(it && it._id.startsWith(startkey)));
}

/**
 * Enumerates all known hosts
 *
 * @param objects The objects DB to use
 * @returns An array of host objects
 */
export function enumHosts(objects: ObjectsClient): Promise<ioBroker.InferGetObjectViewItemType<'system', 'host'>[]> {
    return enumObjects(objects, 'host', 'system.host.');
}

/**
 * Enumerates all objects of a given type
 *
 * @param objects The objects DB to use
 * @param type The type of the objects to enumerate
 * @param startkey The prefix of the objects
 */
export function enumObjects<T extends string>(
    objects: ObjectsClient,
    type: T,
    startkey: string,
): Promise<ioBroker.InferGetObjectViewItemType<'system', T>[]> {
    return new Promise((resolve, reject) => {
        const endkey = `${startkey}\u9999`;
        objects.getObjectView('system', type, { startkey, endkey }, null, (err, res) => {
            if (err) {
                return reject(err);
            }

            let ret: ioBroker.InferGetObjectViewItemType<'system', T>[] = [];
            if (res?.rows) {
                ret = res.rows.map(row => row.value);
            }
            resolve(ret);
        });
    });
}
