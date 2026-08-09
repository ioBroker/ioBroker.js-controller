import os from 'node:os';
import semver from 'semver';
import { tools } from '@iobroker/js-controller-common';
import {
    HIGHEST_UNICODE_SYMBOL,
    SYSTEM_ADAPTER_PREFIX,
    SYSTEM_CONFIG_ID,
    SYSTEM_HOST_PREFIX,
} from '@iobroker/js-controller-common-db/constants';
import { VIS_ADAPTERS } from '@/lib/controller/constants.js';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import type { HostMetaManager } from '@/lib/controller/host/hostMetaManager.js';
import type { ControllerLogger, DiagInfoType } from '@/lib/controller/types.js';
import { TaskObject } from '@/lib/objects.js';

/** Everything the diagnostics collector needs to do its work */
export interface DiagInfoCollectorOptions {
    /** The connected objects database client */
    objects: ObjectsClient;
    /** The connected states database client */
    states: StatesClient;
    /** The configuration of this host (iobroker.json) */
    config: ioBroker.IoBrokerJson;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
    /** Used to store the collected vis data point counts */
    hostMeta: HostMetaManager;
}

/**
 * Collects the information which is sent to the ioBroker statistics server
 */
export class DiagInfoCollector {
    readonly #objects: ObjectsClient;
    readonly #states: StatesClient;
    readonly #config: ioBroker.IoBrokerJson;
    readonly #logger: ControllerLogger;
    readonly #hostLogPrefix: string;
    readonly #hostMeta: HostMetaManager;

    /** Timestamp of the last sent diagnostics */
    #lastDiagSend: null | number = null;

    /**
     * @param options Everything the diagnostics collector needs to do its work
     */
    constructor(options: DiagInfoCollectorOptions) {
        this.#objects = options.objects;
        this.#states = options.states;
        this.#config = options.config;
        this.#logger = options.logger;
        this.#hostLogPrefix = options.hostLogPrefix;
        this.#hostMeta = options.hostMeta;
    }

    /**
     * Check if the diagnostics may be sent now and if so remember that they are being sent
     *
     * This prevents multiple admin instances from sending the diagnostics at the same time.
     *
     * @param minInterval Minimum time in ms which has to pass between two sends
     * @returns true if the caller is allowed to send the diagnostics now
     */
    tryStartDiagSend(minInterval: number): boolean {
        if (this.#lastDiagSend !== null && Date.now() - this.#lastDiagSend <= minInterval) {
            return false;
        }

        this.#lastDiagSend = Date.now();
        return true;
    }

    /**
     * Returns number of instances and how many of them are compact instances if compact mode is enabled
     */
    async #getNumberOfInstances(): Promise<
        { noCompactInstances: null; noInstances: null } | { noCompactInstances: number; noInstances: number }
    > {
        const config = this.#config;

        try {
            let noCompactInstances = 0;
            const instancesView = await this.#objects.getObjectViewAsync('system', 'instance', {
                startkey: SYSTEM_ADAPTER_PREFIX,
                endkey: `${SYSTEM_ADAPTER_PREFIX}${HIGHEST_UNICODE_SYMBOL}`,
            });

            const noInstances = instancesView.rows.length;

            if (config.system.compact) {
                for (const row of instancesView.rows) {
                    const state = await this.#states.getStateAsync(`${row.id}.compactMode`);
                    if (state?.val) {
                        noCompactInstances++;
                    }
                }
            }

            return { noInstances, noCompactInstances };
        } catch {
            return { noInstances: null, noCompactInstances: null };
        }
    }

    /**
     * Collects the dialog information, e.g., used by Admin "System Settings"
     *
     * @param type - type of required information
     */
    async collectDiagInfo(type: DiagInfoType): Promise<void | Record<string, any> | null> {
        if (type !== 'extended' && type !== 'normal' && type !== 'no-city') {
            return null;
        }

        const config = this.#config;
        const logger = this.#logger;
        const hostLogPrefix = this.#hostLogPrefix;
        const hostMeta = this.#hostMeta;

        let systemConfig;
        let err;

        try {
            systemConfig = await this.#objects.getObject(SYSTEM_CONFIG_ID);
        } catch (e) {
            err = e;
        }

        if (err || !systemConfig?.common) {
            logger.warn(
                `System config object is corrupt, please run "${tools.appNameLowerCase} setup first". Error: ${err.message}`,
            );
            systemConfig = systemConfig || { common: {} };
            systemConfig.common = systemConfig.common || {};
        }

        let obj;
        try {
            obj = await this.#objects.getObjectAsync('system.meta.uuid');
        } catch {
            // ignore obj is undefined
        }

        // create uuid
        if (!obj) {
            obj = { native: { uuid: 'not found' } };
        }

        let doc;
        err = null;

        try {
            doc = await this.#objects.getObjectViewAsync('system', 'host', {
                startkey: SYSTEM_HOST_PREFIX,
                endkey: `${SYSTEM_HOST_PREFIX}${HIGHEST_UNICODE_SYMBOL}`,
            });
        } catch (e) {
            err = e;
        }

        const { noCompactInstances, noInstances } = await this.#getNumberOfInstances();

        // we need to show city and country at the beginning, so include it now and delete it later if not allowed.
        const diag: Record<string, any> = {
            uuid: obj.native.uuid,
            language: systemConfig.common.language,
            country: '',
            city: '',
            hosts: [],
            node: process.version,
            arch: os.arch(),
            docker: tools.isDocker(),
            adapters: {},
            statesType: config.states.type, // redis or file
            objectsType: config.objects.type, // redis or file
            noInstances,
            compactMode: config.system.compact,
            noCompactInstances,
        };

        if (type === 'extended' || type === 'no-city') {
            const cpus = os.cpus();
            diag.country = 'country' in systemConfig.common ? systemConfig.common.country : 'unknown';
            diag.model = cpus && cpus[0] && cpus[0].model ? cpus[0].model : 'unknown';
            diag.cpus = cpus ? cpus.length : 1;
            diag.mem = os.totalmem();
            diag.ostype = os.type();
            delete diag.city;
        }
        if (type === 'extended') {
            diag.city = 'city' in systemConfig.common ? systemConfig.common.city : 'unknown';
        } else if (type === 'normal') {
            delete diag.city;
            delete diag.country;
        }

        if (!err && doc?.rows.length) {
            doc.rows.sort((a, b) => {
                try {
                    return semver.lt(
                        a.value.common.installedVersion ?? '0.0.0',
                        b.value.common.installedVersion ?? '0.0.0',
                    )
                        ? 1
                        : 0;
                } catch {
                    logger.error(
                        `${hostLogPrefix} Invalid versions: ${a.value.common.installedVersion ?? '0.0.0'}[${
                            a.value.common.name ?? 'unknown'
                        }] or ${b.value.common.installedVersion ?? '0.0.0'}[${b.value.common.name ?? 'unknown'}]`,
                    );
                    return 0;
                }
            });

            // Read installed versions of all hosts
            for (const row of doc.rows) {
                diag.hosts.push({
                    version: row.value.common.installedVersion,
                    platform: row.value.common.platform,
                    type: row.value.native.os.platform,
                });
            }
        }

        doc = null;
        err = null;

        try {
            doc = await this.#objects.getObjectViewAsync('system', 'adapter', {
                startkey: SYSTEM_ADAPTER_PREFIX,
                endkey: `${SYSTEM_ADAPTER_PREFIX}${HIGHEST_UNICODE_SYMBOL}`,
            });
        } catch (e) {
            err = e;
        }

        const foundVisAdapters = new Set<(typeof VIS_ADAPTERS)[number]>();

        if (!err && doc?.rows.length) {
            // Read installed versions of all adapters
            for (const row of doc.rows) {
                diag.adapters[row.value.common.name] = {
                    version: row.value.common.version,
                    platform: row.value.common.platform,
                    installedFrom: row.value.common.installedFrom,
                };

                if (VIS_ADAPTERS.includes(row.value.common.name as (typeof VIS_ADAPTERS)[number])) {
                    foundVisAdapters.add(row.value.common.name as (typeof VIS_ADAPTERS)[number]);
                }
            }
        }

        // read the number of vis data points
        for (const visAdapter of foundVisAdapters) {
            const { calcProjects } = await import('@/lib/vis/states.js');

            try {
                const points = await calcProjects({ objects: this.#objects, instance: 0, visAdapter });
                let total = null;
                const tasks = [];

                if (points?.length) {
                    for (const point of points) {
                        if (point.id === `${visAdapter}.0.datapoints.total`) {
                            total = point.val;
                        }

                        tasks.push({
                            _id: point.id,
                            type: 'state',
                            native: {},
                            common: {
                                name: 'Datapoints count',
                                role: 'state',
                                type: 'number',
                                read: true,
                                write: false,
                            },
                            state: {
                                val: point.val,
                                ack: true,
                            },
                        });
                    }
                }

                if (total !== null) {
                    diag[visAdapter] = total;
                }

                await hostMeta.extendObjects(tasks as TaskObject[]);
            } catch (e) {
                logger.error(`${hostLogPrefix} cannot call visUtils: ${e.message}`);
            }
        }

        return diag;
    }
}
