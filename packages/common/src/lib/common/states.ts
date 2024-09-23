import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common';
import type { Client as StatesClient, interview } from '@iobroker/db-states-redis';

export async function getStatesConstructor(): Promise<typeof StatesClient> {
    const config = fs.readJSONSync(tools.getConfigFileName());
    if (!config.states) {
        config.states = { type: 'jsonl' };
    }

    try {
        const Client = (await import(`@iobroker/db-states-${config.states.type}`)).Client;
        return Client;
    } catch (e) {
        console.error(e.stack);
        console.error(`Installation broken or unknown states type: ${config.states.type} configured.`);
        process.exit(101);
    }
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
    checkIfLocalOnly = false,
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

interface PerformStatesInterviewOptions {
    /** The partial states db options */
    config: ioBroker.StatesDatabaseOptions;
    /** Db type, like redis */
    dbType: string;
}

/**
 * Perform the states interview if one has been provided
 *
 * @param options db type and partial config
 * @returns the database options obtained by the answered questionnaire
 */
export async function performStatesInterview(
    options: PerformStatesInterviewOptions,
): Promise<ioBroker.StatesDatabaseOptions> {
    const { dbType, config } = options;

    const states = await import(`@iobroker/db-states-${dbType}`);
    if (!states.interview) {
        return config;
    }

    return states.interview(config satisfies Parameters<typeof interview>[0]);
}
