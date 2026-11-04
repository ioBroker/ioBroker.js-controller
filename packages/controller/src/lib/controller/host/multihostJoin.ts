import fs from 'fs-extra';
import { tools, type MHConnectResult } from '@iobroker/js-controller-common';
import type { ControllerLogger } from '@/lib/controller/types.js';

/** The outcome of a join, as it is answered to the Admin */
export interface JoinResult {
    /** The configuration of the master was stored, the controller has to restart */
    result: boolean;
    /** Why the join failed */
    error?: string;
}

/** Everything a join needs */
export interface JoinMasterOptions {
    /** Address of the master */
    ip: string;
    /** Multihost password, empty when the master runs unsecured */
    password: string;
    /** The `iobroker.json` of this host */
    configFile: string;
    /** Fetches the database configuration from the master - `MHClient.connectAsync` outside of tests */
    fetchDatabases: (ip: string, password: string) => Promise<MHConnectResult>;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
}

/**
 * Whether a database address only reaches the machine it is used on
 *
 * Independent of the database type on purpose: `isLocalObjectsDbServer` answers `false` for every
 * Redis configuration, because there is no built-in Redis server, and for every list of addresses,
 * as a Sentinel configuration has one. A master that hands out `127.0.0.1` would point this host at
 * itself either way.
 *
 * @param host the host of a database configuration, a list for Redis Sentinel
 */
export function pointsToLoopback(host: string | string[] | undefined): boolean {
    const hosts = Array.isArray(host) ? host : [host];

    return hosts.some(entry => typeof entry === 'string' && (entry === 'localhost' || tools.isLocalAddress(entry)));
}

/**
 * Replace a "listen all" address (`0.0.0.0`, `::`) by the address the master answered from
 *
 * A master whose database listens on all interfaces announces exactly that, which means nothing on
 * another machine.
 *
 * @param host the host of a database configuration, a list for Redis Sentinel
 * @param address the address of the master
 */
function replaceListenAll(host: string | string[], address: string): string | string[] {
    if (Array.isArray(host)) {
        return host.map(entry => (tools.isListenAllAddress(entry) ? address : entry));
    }

    return tools.isListenAllAddress(host) ? address : host;
}

/**
 * Attach this host to a master: fetch its database configuration and store it in `iobroker.json`
 *
 * The caller restarts the controller afterwards. On the way:
 * - a master that points back to a local database is refused, this host could not reach it;
 * - the first `iobroker.json` is kept as `iobroker.json.bak`, and only the first: a second join
 *   would overwrite the way back with a configuration that points to a master as well. Nothing reads
 *   it automatically - it is there to be copied back by hand;
 * - `multihostService.pairing` is switched off, because the host is not a fresh one any more;
 * - the file is written next to the old one and renamed over it, so a power loss in the middle
 *   leaves the old or the new configuration, never a truncated one that stops the host from starting.
 *
 * @param options everything the join needs
 */
export async function joinMaster(options: JoinMasterOptions): Promise<JoinResult> {
    const { ip, password, configFile, fetchDatabases, logger, hostLogPrefix } = options;

    let databases: MHConnectResult;
    try {
        databases = await fetchDatabases(ip, password);
    } catch (e) {
        return { result: false, error: e.message };
    }

    let config: ioBroker.IoBrokerJson;
    try {
        config = await fs.readJson(configFile);
    } catch (e) {
        return { result: false, error: `Cannot read ${configFile}: ${e.message}` };
    }

    if (pointsToLoopback(databases.objects.host) || pointsToLoopback(databases.states.host)) {
        return {
            result: false,
            error: `The remote host points back to a local database (${tools.getLocalAddress()}). This host cannot join it.`,
        };
    }

    const address = databases.address || ip;
    config.objects = { ...databases.objects, host: replaceListenAll(databases.objects.host, address) };
    config.states = { ...databases.states, host: replaceListenAll(databases.states.host, address) };

    if (config.multihostService?.pairing) {
        config.multihostService.pairing = false;
    }

    const backupFile = `${configFile}.bak`;
    try {
        if (await fs.pathExists(backupFile)) {
            logger.info(`${hostLogPrefix} Keeping the existing ${backupFile} untouched`);
        } else {
            await fs.copy(configFile, backupFile);
        }
    } catch (e) {
        logger.warn(`${hostLogPrefix} Cannot back up ${configFile}: ${e.message}`);
    }

    const tempFile = `${configFile}.tmp`;
    try {
        await fs.writeFile(tempFile, JSON.stringify(config, null, 2));
        await fs.rename(tempFile, configFile);
    } catch (e) {
        await fs.remove(tempFile).catch(() => {
            // nothing more to do, the error below is what counts
        });
        return { result: false, error: `Cannot store new configuration: ${e.message}` };
    }

    logger.info(`${hostLogPrefix} Multihost connect to "${ip}" succeeded`);
    return { result: true };
}
