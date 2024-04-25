import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import { SYSTEM_CONFIG_ID, SYSTEM_REPOSITORIES_ID } from '@iobroker/js-controller-common/constants';
import { tools } from '@iobroker/js-controller-common';
import semver from 'semver';

interface AdapterVersionBlockedOptions {
    /** The version of the adapter instance */
    version: string;
    /** Name of the adapter */
    adapterName: string;
    /** The objects client */
    objects: ObjectsClient;
}

/**
 * Allows to find out if a given states dbType offers a server or not
 *
 * @param dbType database type
 * @returns true if a server class is available
 */
export async function statesDbHasServer(dbType: string): Promise<boolean> {
    try {
        const states = await import(`@iobroker/db-states-${dbType}`);
        return !!states.Server;
    } catch {
        throw new Error(`Installation error or unknown states database type: ${dbType}`);
    }
}

/**
 * Check if version of a specific adapter is blocked
 *
 * @param options adapter version and name information
 */
export async function isAdapterVersionBlocked(options: AdapterVersionBlockedOptions): Promise<boolean> {
    const { version, adapterName, objects } = options;

    const systemRepoObj = await objects.getObject(SYSTEM_REPOSITORIES_ID);
    const systemConfigObj = await objects.getObject(SYSTEM_CONFIG_ID);

    if (!systemConfigObj || !systemRepoObj) {
        return false;
    }

    const repo = systemRepoObj.native.repositories[systemConfigObj.common.activeRepo[0]];

    const adapterEntry = repo.json?.[adapterName];

    if (!adapterEntry || !('blockedVersions' in adapterEntry)) {
        return false;
    }

    for (const blockedVersion of adapterEntry.blockedVersions) {
        if (semver.satisfies(version, blockedVersion, { includePrerelease: true })) {
            return true;
        }
    }

    return false;
}

export async function isLocalObjectsDbServer(
    dbType: string,
    host: string | string[],
    checkIfLocalOnly: boolean = false
): Promise<boolean> {
    const hasServer = await objectsDbHasServer(dbType);
    if (!hasServer) {
        return false; // if no server it can not be a local server
    }

    if (Array.isArray(host)) {
        return false;
    }

    let result = host === 'localhost' || tools.isLocalAddress(host); // reachable locally only
    if (!checkIfLocalOnly) {
        const ownIps = tools.findIPs();
        result = result || tools.isListenAllAddress(host) || ownIps.includes(host);
    }

    return result;
}

/**
 * Allows to find out if a given states dbType offers a server which runs on this host and listens (locally or globally/by IP)
 *
 * @param dbType database type
 * @param host configured db host - multihost (array) will always return false
 * @param checkIfLocalOnly if true the method checks if the server listens to local connections only; else also external connection options are checked
 * @returns true if a server listens on this host (locally or globally/by IP)
 */
export async function isLocalStatesDbServer(
    dbType: string,
    host: string | string[],
    checkIfLocalOnly = false
): Promise<boolean> {
    const hasServer = await statesDbHasServer(dbType);
    if (!hasServer) {
        return false; // if no server it can not be a local server
    }

    if (Array.isArray(host)) {
        return false;
    }

    let result = host === 'localhost' || tools.isLocalAddress(host); // reachable locally only
    if (!checkIfLocalOnly && !Array.isArray(host)) {
        const ownIps = tools.findIPs();
        result = result || tools.isListenAllAddress(host) || ownIps.includes(host);
    }

    return result;
}

/**
 * Allows to find out if a given objects dbType offers a server or not
 *
 * @param dbType database type
 * @returns true if a server class is available
 */
export async function objectsDbHasServer(dbType: string): Promise<boolean> {
    try {
        const objects = await import(`@iobroker/db-objects-${dbType}`);
        return !!objects.Server;
    } catch (e) {
        console.error(e);
        throw new Error(`Installation error or unknown objects database type: ${dbType}`);
    }
}
