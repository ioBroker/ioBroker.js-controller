import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';

export async function getObjectsConstructor(): Promise<typeof ObjectsClient> {
    const config = fs.readJSONSync(tools.getConfigFileName());
    if (!config.objects) {
        config.objects = { type: 'jsonl' };
    }

    try {
        const Client = (await import(`@iobroker/db-objects-${config.objects.type}`)).Client;
        return Client;
    } catch (e) {
        console.error(e.stack);
        console.error(`Installation broken or unknown objects type: ${config.objects.type} configured`);
        process.exit(101);
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
 * Allows to find out if a given objects dbType offers a server or not
 *
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
