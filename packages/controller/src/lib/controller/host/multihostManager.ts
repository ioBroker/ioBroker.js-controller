import os from 'node:os';
import { setTimeout as wait } from 'node:timers/promises';
import fs from 'fs-extra';
import { isLocalObjectsDbServer, isLocalStatesDbServer, tools } from '@iobroker/js-controller-common';
import { SYSTEM_CONFIG_ID } from '@iobroker/js-controller-common-db/constants';
import { MHServer } from '@/lib/multihostServer.js';
import { getConfig } from '@/lib/controller/config.js';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { ControllerLogger } from '@/lib/controller/types.js';
import type { HostPairing } from '@/lib/controller/host/hostPairing.js';

/** Stop the temporarily activated multihost discovery server after this time */
const TEMPORARY_MULTIHOST_LIFETIME = 15 * 60_000;

/** Everything the multihost manager needs to do its work */
export interface MultihostManagerOptions {
    /** The connected objects database client, used to read the encryption secret */
    objects: ObjectsClient;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
    /** Name of this host, announced by the discovery server */
    hostname: string;
    /** If this controller is a compact group controller, those never run a discovery server */
    isCompactGroupController: boolean;
    /** Decides whether this host may be attached to a master, and does it */
    pairing: HostPairing;
    /** Restarts the controller, after this host joined a master */
    restartSelf: () => Promise<void>;
}

/**
 * Starts and stops the multihost discovery server of this host
 */
export class MultihostManager {
    readonly #objects: ObjectsClient;
    readonly #logger: ControllerLogger;
    readonly #hostLogPrefix: string;
    readonly #hostname: string;
    readonly #isCompactGroupController: boolean;
    readonly #pairing: HostPairing;
    readonly #restartSelf: () => Promise<void>;

    /** The running multihost discovery server */
    #mhService: MHServer | null = null;
    /** Timer that stops a temporarily activated multihost discovery server */
    #mhTimer: NodeJS.Timeout | null = null;

    /**
     * @param options Everything the multihost manager needs to do its work
     */
    constructor(options: MultihostManagerOptions) {
        this.#objects = options.objects;
        this.#logger = options.logger;
        this.#hostLogPrefix = options.hostLogPrefix;
        this.#hostname = options.hostname;
        this.#isCompactGroupController = options.isCompactGroupController;
        this.#pairing = options.pairing;
        this.#restartSelf = options.restartSelf;
    }

    /**
     * Starts the multihost discovery server
     *
     * @param config Configuration from iobroker.json
     * @param secret MultiHost communication password
     * @param pairingOnly Only listen for pairing commands; `browse` is then answered with the hostname, the static
     *     info and the uuid, never with the database configuration
     */
    #startServer(config: ioBroker.IoBrokerJson, secret: string | false, pairingOnly = false): void {
        const cpus = os.cpus();

        this.#mhService = new MHServer(
            this.#hostname,
            this.#logger,
            config,
            {
                node: process.version,
                arch: os.arch(),
                model: cpus && cpus[0] && cpus[0].model ? cpus[0].model : 'unknown',
                cpus: cpus ? cpus.length : 1,
                mem: os.totalmem(),
                ostype: os.type(),
            },
            secret,
            {
                pairingOnly,
                isUnclaimed: () => this.#pairing.isUnclaimed(),
                getUuid: () => this.#pairing.uuid,
                onJoin: async (masterIp: string, password: string) => {
                    const result = await this.#pairing.join(masterIp, password);
                    if (result.result) {
                        // the answer of the command has left already, give the log a moment
                        await wait(1_000);
                        await this.#restartSelf();
                    }
                    return result;
                },
            },
        );
    }

    /**
     * Listen for the pairing commands of a master, if this host offers itself for pairing
     *
     * Multihost is switched off here, but without a states database connection the `join` command
     * over UDP 50005 is the only way for a master to attach this host. Only with
     * `multihostService.pairing: true`, which the ready-made images set: burn it, boot it, and an
     * existing system can offer to attach it - without a shell, a screen or anything to confirm on the
     * new host. A join switches the flag off again.
     *
     * @param config Configuration from iobroker.json
     */
    async #startPairingListener(config: ioBroker.IoBrokerJson): Promise<void> {
        if (!this.#pairing.isPairingEnabled(config)) {
            return;
        }

        // a remote database means this host already belongs to a system
        if (!(await isLocalObjectsDbServer(config.objects.type, config.objects.host))) {
            return;
        }

        this.#startServer(config, false, true);
        this.#logger.info(
            `${this.#hostLogPrefix} Multihost pairing listener started: a master can attach this host (multihostService.pairing)`,
        );
    }

    /**
     * Starts or stops the multihost discovery server, depending on the config and temp information
     *
     * @param __config - the iobroker config object
     */
    async startMultihost(__config?: ioBroker.IoBrokerJson): Promise<boolean | void> {
        const logger = this.#logger;
        const hostLogPrefix = this.#hostLogPrefix;
        const isCompactGroupController = this.#isCompactGroupController;

        if (isCompactGroupController) {
            return;
        }

        if (this.#mhTimer) {
            clearTimeout(this.#mhTimer);
            this.#mhTimer = null;
        }

        const _config = __config || getConfig();

        // `updateMultihost` re-reads iobroker.json, so the pairing flag may have changed as well
        try {
            await this.#pairing.setPairingEnabled(this.#pairing.isPairingEnabled(_config));
        } catch (e) {
            logger.warn(`${hostLogPrefix} Cannot update the host announcement: ${e.message}`);
        }

        if (!_config.multihostService?.enabled) {
            let result: boolean | undefined;
            if (this.#mhService) {
                try {
                    this.#mhService.close();
                    this.#mhService = null;
                } catch (e) {
                    logger.warn(`${hostLogPrefix} Cannot stop multihost discovery: ${e.message}`);
                }
                result = false;
            }
            // not "the multihost service is on", which is what the answer to `updateMultihost` reports
            await this.#startPairingListener(_config);
            return result;
        }

        if (this.#mhService) {
            try {
                this.#mhService.close(() => {
                    this.#mhService = null;
                    setImmediate(() => this.startMultihost(_config));
                });
                return;
            } catch (e) {
                logger.warn(`${hostLogPrefix} Cannot stop multihost discovery server: ${e.message}`);
            }
        }

        const hasLocalObjectsServer = await isLocalObjectsDbServer(_config.objects.type, _config.objects.host, true);
        const hasLocalStatesServer = await isLocalStatesDbServer(_config.states.type, _config.states.host, true);

        if (!_config.objects.host || hasLocalObjectsServer) {
            logger.warn(
                `${hostLogPrefix} Multihost Master on this system is not possible, because IP address for objects is ${Array.isArray(_config.objects.host) ? _config.objects.host.join(', ') : _config.objects.host}. Please allow remote connections to the server by adjusting the IP.`,
            );
            return false;
        } else if (!_config.states.host || hasLocalStatesServer) {
            logger.warn(
                `${hostLogPrefix} Multihost Master on this system is not possible, because IP address for states is ${Array.isArray(_config.states.host) ? _config.states.host.join(', ') : _config.states.host}. Please allow remote connections to the server by adjusting the IP.`,
            );
            return false;
        }

        if (_config.multihostService.secure) {
            if (typeof _config.multihostService.password === 'string' && _config.multihostService.password.length) {
                let obj: ioBroker.SystemConfigObject | null | undefined;
                let errText;
                try {
                    obj = await this.#objects.getObject(SYSTEM_CONFIG_ID);
                } catch (e) {
                    // will log error below
                    errText = e.message;
                }

                if (obj?.native?.secret) {
                    if (!_config.multihostService.password.startsWith(`$/aes-192-cbc:`)) {
                        // if old encryption was used, we need to decrypt in old fashion
                        const secret = await tools.decryptPhrase(obj.native.secret, _config.multihostService.password);
                        this.#startServer(_config, secret || false);
                    } else {
                        try {
                            // it can throw in edge cases #1474, we need further investigation
                            const secret = tools.decrypt(obj.native.secret, _config.multihostService.password);
                            this.#startServer(_config, secret);
                        } catch (e) {
                            logger.error(
                                `${hostLogPrefix} Cannot decrypt password for multihost discovery server: ${e.message}`,
                            );
                        }
                    }
                } else {
                    logger.error(
                        `${hostLogPrefix} Cannot start multihost discovery server: no system.config found (err: ${errText})`,
                    );
                }
            } else {
                logger.error(
                    `${hostLogPrefix} Cannot start multihost discovery server: secure mode was configured, but no secret was set. Please check the configuration!`,
                );
            }
        } else {
            this.#startServer(_config, false);
        }

        if (!_config.multihostService.persist) {
            this.#mhTimer = setTimeout(async () => {
                if (this.#mhService) {
                    try {
                        this.#mhService.close();
                        this.#mhService = null;
                        logger.info(
                            `${hostLogPrefix} Multihost discovery server stopped after 15 minutes, because only temporarily activated`,
                        );
                        _config.multihostService.persist = false;
                        _config.multihostService.enabled = false;
                        const configFile = tools.getConfigFileName();
                        await fs.writeFile(configFile, JSON.stringify(_config, null, 2));
                    } catch (e) {
                        logger.warn(`${hostLogPrefix} Cannot stop multihost discovery: ${e.message}`);
                    }
                }
                this.#mhTimer = null;
            }, TEMPORARY_MULTIHOST_LIFETIME);
        }

        return true;
    }

    /**
     * Stop the multihost discovery server if it is running
     */
    close(): void {
        if (this.#mhService) {
            this.#mhService.close();
            this.#mhService = null;
        }
    }
}
