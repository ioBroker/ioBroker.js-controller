'use strict';

import {tools} from '@iobroker/js-controller-common';

/**
 * Allows to find out if a given states dbType offers a server or not
 * @param dbType database type
 * @returns true if a server class is available
 */
export function statesDbHasServer(dbType: string): boolean {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return !!require(`@iobroker/db-states-${dbType}`).Server;
    } catch {
        throw new Error(`Installation error or unknown states database type: ${dbType}`);
    }
}

/**
 * Allows to find out if a given objects dbType offers a server which runs on this host and listens (locally or globally/by IP)
 * @param dbType database type
 * @param host configured db host
 * @param checkIfLocalOnly if true the method checks if the server listens to local connections only; else also external connection options are checked
 * @returns true if a server listens on this host (locally or globally/by IP)
 */
export function isLocalObjectsDbServer(dbType: string, host: string, checkIfLocalOnly: boolean=false): boolean {
    const ownIps = tools.findIPs();
    if (!objectsDbHasServer(dbType)) {
        return false; // if no server it can not be a local server
    }
    let result = host === 'localhost' || host === '127.0.0.1'; // reachable locally only
    if (!checkIfLocalOnly) {
        result = result || host === '0.0.0.0' || ownIps.includes(host);
    }
    return result;
}

/**
 * Allows to find out if a given states dbType offers a server which runs on this host and listens (locally or globally/by IP)
 * @param dbType database type
 * @param host configured db host
 * @param checkIfLocalOnly if true the method checks if the server listens to local connections only; else also external connection options are checked
 * @returns true if a server listens on this host (locally or globally/by IP)
 */
export function isLocalStatesDbServer(dbType: string, host: string, checkIfLocalOnly=false): boolean {
    const ownIps = tools.findIPs();
    if (!statesDbHasServer(dbType)) {
        return false; // if no server it can not be a local server
    }
    let result = host === 'localhost' || host === '127.0.0.1'; // reachable locally only
    if (!checkIfLocalOnly) {
        result = result || host === '0.0.0.0' || ownIps.includes(host);
    }
    return result;
}

/**
 * Allows to find out if a given objects dbType offers a server or not
 * @param dbType database type
 * @returns true if a server class is available
 */
export function objectsDbHasServer(dbType: string): boolean {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return !!require(`@iobroker/db-objects-${dbType}`).Server;
    } catch {
        throw new Error(`Installation error or unknown objects database type: ${dbType}`);
    }
}
