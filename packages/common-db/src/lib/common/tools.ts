import { tools } from '@iobroker/js-controller-common';
import { createRequire } from 'node:module';
// eslint-disable-next-line unicorn/prefer-module
const require = createRequire(import.meta.url || 'file://' + __dirname);

/**
 * Allows to find out if a given states dbType offers a server or not
 *
 * @param dbType database type
 * @returns true if a server class is available
 */
export function statesDbHasServer(dbType: string): boolean {
    try {
        return !!require(`@iobroker/db-states-${dbType}`).Server;
    } catch {
        throw new Error(`Installation error or unknown states database type: ${dbType}`);
    }
}

/**
 * Allows to find out if a given objects dbType offers a server which runs on this host and listens (locally or globally/by IP)
 *
 * @param dbType database type
 * @param host configured db host - multihost (array) will always return false
 * @param checkIfLocalOnly if true the method checks if the server listens to local connections only; else also external connection options are checked
 * @returns true if a server listens on this host (locally or globally/by IP)
 */
export function isLocalObjectsDbServer(
    dbType: string,
    host: string | string[],
    checkIfLocalOnly: boolean = false
): boolean {
    if (!objectsDbHasServer(dbType)) {
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
export function isLocalStatesDbServer(dbType: string, host: string | string[], checkIfLocalOnly = false): boolean {
    if (!statesDbHasServer(dbType)) {
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
export function objectsDbHasServer(dbType: string): boolean {
    try {
        return !!require(`@iobroker/db-objects-${dbType}`).Server;
    } catch (e) {
        console.error(e);
        throw new Error(`Installation error or unknown objects database type: ${dbType}`);
    }
}
