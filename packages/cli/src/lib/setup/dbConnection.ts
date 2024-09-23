import type { DbConnectAsyncReturn, DbConnectCallback } from '../_Types.js';
import fs from 'fs-extra';
import {
    getObjectsConstructor,
    getStatesConstructor,
    objectsDbHasServer,
    statesDbHasServer,
} from '@iobroker/js-controller-common';
import { EXIT_CODES } from '@iobroker/js-controller-common';
import { tools } from '@iobroker/js-controller-common';
import { setTimeout as wait } from 'node:timers/promises';
import type { Client as StatesRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import path from 'node:path';
import type { PluginHandlerSettings } from '@iobroker/plugin-base/types';
import { PluginHandler } from '@iobroker/plugin-base';

let pluginHandler: InstanceType<typeof PluginHandler>;
let Objects: typeof ObjectsInRedisClient | null; // constructor
let objects: ObjectsInRedisClient | null; // instance
let States: typeof StatesRedisClient | null; // constructor
let states: StatesRedisClient | null; // instance

interface DbConnectParams {
    /** DB connect timeout, default is 10_000 */
    timeout?: number;
}

export function dbConnect(callback: DbConnectCallback): void;
export function dbConnect(params: Record<string, any>, callback: DbConnectCallback): void;
export function dbConnect(onlyCheck: boolean, params: Record<string, any>, callback: DbConnectCallback): void;
/**
 * Connects to the DB or tests the connection.
 *
 * @param onlyCheck
 * @param params
 * @param callback
 */
export async function dbConnect(
    onlyCheck: boolean | Record<string, any> | DbConnectCallback,
    params?: DbConnectParams | DbConnectCallback,
    callback?: DbConnectCallback,
): Promise<void> {
    if (typeof onlyCheck === 'object') {
        callback = params as DbConnectCallback;
        params = onlyCheck;
        onlyCheck = false;
    }
    if (typeof onlyCheck === 'function') {
        callback = onlyCheck;
        onlyCheck = false;
    }
    if (typeof params === 'function') {
        callback = params;
        params = {};
    }

    if (!callback) {
        throw new Error('No callback for dbConnect');
    }

    params = params || {};

    const config: ioBroker.IoBrokerJson = fs.readJSONSync(tools.getConfigFileName());

    if (objects && states) {
        return void callback({ objects, states, isOffline: false, objectsDBType: config.objects.type, config });
    }

    config.states = config.states || { type: 'jsonl' };
    config.objects = config.objects || { type: 'jsonl' };
    // Make sure the DB has enough time (5s). JsonL can take a bit longer if the process just crashed before
    // because the lockfile might not have been freed.
    config.states.connectTimeout = Math.max(config.states.connectTimeout || 0, 5_000);
    config.objects.connectTimeout = Math.max(config.objects.connectTimeout || 0, 5_000);

    Objects = await getObjectsConstructor(); // Objects DB Client object
    States = await getStatesConstructor(); // States DB Client object

    let isObjectConnected = false;
    let isStatesConnected = false;

    // Detect timeout or try to open file itself
    setTimeout(
        async () => {
            if (isObjectConnected && isStatesConnected) {
                return;
            }

            if (!isObjectConnected) {
                if (objects) {
                    // Destroy Client we tried to connect with
                    await objects.destroy();
                    objects = null;
                }

                const hasObjectsServer = await objectsDbHasServer(config.objects.type);

                if (hasObjectsServer) {
                    // Just open in memory DB itself
                    Objects = (await import(`@iobroker/db-objects-${config.objects.type}`)).Server;
                    objects = new Objects!({
                        connection: config.objects,
                        logger: {
                            silly: (_msg: string) => {
                                /** do not log on this level */
                            },
                            debug: (_msg: string) => {
                                /** do not log on this level */
                            },
                            info: (_msg: string) => {
                                /** do not log on this level */
                            },
                            warn: (msg: string) => console.log(msg),
                            error: (msg: string) => console.log(msg),
                        },
                        connected: async () => {
                            isObjectConnected = true;
                            if (isStatesConnected && typeof callback === 'function') {
                                try {
                                    await initializePlugins(config);
                                } catch {
                                    // ignore in silence
                                }
                                return void callback({
                                    objects: objects!,
                                    states: states!,
                                    isOffline: true,
                                    objectsDBType: config.objects.type,
                                    config,
                                });
                            }
                        },
                    });
                } else {
                    console.log(
                        `No connection to objects ${config.objects.host}:${config.objects.port}[${config.objects.type}]`,
                    );
                    if (onlyCheck) {
                        callback &&
                            callback({
                                objects: objects!,
                                states: states!,
                                isOffline: true,
                                objectsDBType: config.objects.type,
                                config,
                            });
                        callback = undefined;
                    } else {
                        return void exitApplicationSave(EXIT_CODES.NO_CONNECTION_TO_OBJ_DB);
                    }
                }
            }

            if (!isStatesConnected) {
                if (states) {
                    // Destroy Client we tried to connect with
                    await states.destroy();
                    states = null;
                }

                const hasStatesServer = await statesDbHasServer(config.states.type);

                if (hasStatesServer) {
                    // Just open in memory DB itself
                    States = (await import(`@iobroker/db-states-${config.states.type}`)).Server;

                    states = new States!({
                        connection: config.states,
                        logger: {
                            silly: (_msg: string) => {
                                /** do not log on this level */
                            },
                            debug: (_msg: string) => {
                                /** do not log on this level */
                            },
                            info: (_msg: string) => {
                                /** do not log on this level */
                            },
                            warn: (msg: string) => console.log(msg),
                            error: (msg: string) => console.log(msg),
                        },
                        connected: async () => {
                            isStatesConnected = true;
                            if (isObjectConnected && typeof callback === 'function') {
                                try {
                                    await initializePlugins(config);
                                } catch {
                                    // ignore in silence
                                }
                                return void callback({
                                    objects: objects!,
                                    states: states!,
                                    isOffline: true,
                                    objectsDBType: config.objects.type,
                                    config,
                                });
                            }
                        },
                        // react on change
                        // @ts-expect-error todo according to types and first look states.onchange does not exist
                        change: (id, msg) => states?.onChange(id, msg),
                    });
                    // @ts-expect-error todo according to types and first look states.onchange does not exist
                    states.onChange = null; // here the custom onChange handler could be installed
                } else {
                    if (states) {
                        // Destroy Client we tried to connect with
                        await (states as StatesRedisClient).destroy();
                        states = null;
                    }
                    if (objects) {
                        // Destroy Client we tried to connect with
                        await objects.destroy();
                        objects = null;
                    }
                    console.log(
                        `No connection to states ${config.states.host}:${config.states.port}[${config.states.type}]`,
                    );
                    if (onlyCheck) {
                        callback &&
                            callback({
                                objects: objects!,
                                states: states!,
                                isOffline: true,
                                objectsDBType: config.objects.type,
                                config,
                            });
                        callback = undefined;
                    } else {
                        return void exitApplicationSave(EXIT_CODES.NO_CONNECTION_TO_OBJ_DB);
                    }
                }
            }

            await wait((params.timeout || 10_000) + config.objects.connectTimeout);

            // Failsafe
            if (isObjectConnected && isStatesConnected) {
                return;
            }

            console.log('No connection to databases possible ...');
            if (onlyCheck) {
                callback &&
                    callback({
                        // TODO types: allow null if onlyCheck is true
                        objects: null as any,
                        states: null as any,
                        isOffline: true,
                        objectsDBType: config.objects.type,
                        config,
                    });
                callback = undefined;
            } else {
                return void exitApplicationSave(EXIT_CODES.NO_CONNECTION_TO_OBJ_DB);
            }
        },
        params.timeout || config.objects.connectTimeout * 2,
    );

    // try to connect as client
    objects = new Objects({
        connection: config.objects,
        logger: {
            silly: (_msg: string) => {
                /** do not log on this level */
            },
            debug: (_msg: string) => {
                /** do not log on this level */
            },
            info: (_msg: string) => {
                /** do not log on this level */
            },
            warn: (msg: string) => console.log(msg),
            error: (msg: string) => console.log(msg),
        },
        connected: async () => {
            if (isObjectConnected) {
                return;
            }
            isObjectConnected = true;

            if (isStatesConnected && typeof callback === 'function') {
                const isOffline = await checkSystemOffline(onlyCheck);
                try {
                    await initializePlugins(config);
                } catch {
                    // ignore in silence
                }
                callback({ objects: objects!, states: states!, isOffline, objectsDBType: config.objects.type, config });
            }
        },
    });

    states = new States({
        connection: config.states,
        logger: {
            silly: (_msg: string) => {
                /** do not log on this level */
            },
            debug: (_msg: string) => {
                /** do not log on this level */
            },
            info: (_msg: string) => {
                /** do not log on this level */
            },
            warn: (msg: string) => console.log(msg),
            error: (msg: string) => console.log(msg),
        },
        connected: async () => {
            if (isStatesConnected) {
                return;
            }
            isStatesConnected = true;

            if (isObjectConnected && typeof callback === 'function') {
                const isOffline = await checkSystemOffline(onlyCheck);
                try {
                    await initializePlugins(config);
                } catch {
                    // ignore in silence
                }
                callback({ objects: objects!, states: states!, isOffline, objectsDBType: config.objects.type, config });
            }
        },
        // @ts-expect-error todo according to types and first look states.onchange does not exist
        change: (id, state) => states?.onChange(id, state),
    });
}

/**
 * Connects to the DB or tests the connection.
 *
 * @param onlyCheck if only connection check should be performed
 * @param params options used by dbConnect
 */
export function dbConnectAsync(onlyCheck: boolean, params?: DbConnectParams): Promise<DbConnectAsyncReturn> {
    return new Promise(resolve => dbConnect(onlyCheck, params || {}, params => resolve(params)));
}

/**
 * Disconnect the database
 */
export async function resetDbConnect(): Promise<void> {
    if (objects) {
        await objects.destroy();
        objects = null;
    }
    if (states) {
        await states.destroy();
        states = null;
    }
    if (Objects) {
        Objects = null;
    }
    if (States) {
        States = null;
    }

    if (pluginHandler) {
        pluginHandler.destroyAll();
    }
}

/**
 * Exits the process and saves objects before exit - never resolves
 *
 * @param  exitCode code passed to process.exit
 */
export async function exitApplicationSave(exitCode?: number): Promise<never> {
    await resetDbConnect();
    await wait(1_000);
    process.exit(exitCode);
}

/**
 * Initialize plugins from io-pack and config json
 *
 * @param config - parsed content of iobroker.json
 */
function initializePlugins(config: Record<string, any>): Promise<void> {
    const ioPackage = fs.readJsonSync(path.join(tools.getControllerDir(), 'io-package.json'));
    const packageJson = fs.readJsonSync(path.join(tools.getControllerDir(), 'package.json'));
    const hostname = tools.getHostName();

    const pluginSettings: PluginHandlerSettings = {
        namespace: `system.host.${hostname}`,
        logNamespace: `host.${hostname}`,
        scope: 'controller',
        log: {
            // cli should be clean, only log warn/error
            silly: (_msg: string) => {
                /** do not log on this level */
            },
            debug: (_msg: string) => {
                /** do not log on this level */
            },
            info: (_msg: string) => {
                /** do not log on this level */
            },
            warn: (msg: string) => console.log(msg),
            error: (msg: string) => console.log(msg),
            level: 'warn',
        },
        iobrokerConfig: config,
        parentPackage: packageJson,
        controllerVersion: ioPackage.common.version,
    };

    pluginHandler = new PluginHandler(pluginSettings);
    pluginHandler.addPlugins(ioPackage.common.plugins, tools.getControllerDir()); // Plugins from io-package have priority over ...
    pluginHandler.addPlugins(config.plugins, tools.getControllerDir()); // ... plugins from iobroker.json
    pluginHandler.setDatabaseForPlugins(objects, states);

    return pluginHandler.initPlugins(ioPackage);
}

/**
 * Checks if system is offline
 *
 * @param onlyCheck - returns true then
 */
async function checkSystemOffline(onlyCheck: boolean): Promise<boolean> {
    if (!objects || !states) {
        // should never happen
        return true;
    }
    if (onlyCheck) {
        return true;
    }

    const offlineStatus = !(await tools.isHostRunning(objects, states));

    return offlineStatus;
}
