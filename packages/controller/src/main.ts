/**
 *      application.controller
 *
 *      Controls Adapter-Processes
 *
 *      Copyright 2013-2023 bluefox <dogafox@gmail.com>,
 *                2013-2014 hobbyquaker <hq@ccu.io>
 *      MIT License
 *
 */

import schedule from 'node-schedule';
import os from 'os';
import fs from 'fs-extra';
import path from 'path';
import cp from 'child_process';
import semver from 'semver';
import restart from './lib/restart';
import { tools as dbTools } from '@iobroker/js-controller-common-db';
import pidUsage from 'pidusage';
import deepClone from 'deep-clone';
import { isDeepStrictEqual, inspect } from 'util';
import { tools, EXIT_CODES, logger as toolsLogger } from '@iobroker/js-controller-common';
import { PluginHandler } from '@iobroker/plugin-base';
import { NotificationHandler } from '@iobroker/js-controller-common-db';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import { Upload } from '@iobroker/js-controller-cli';
import decache from 'decache';
import type { PluginHandlerSettings } from '@iobroker/plugin-base/types';

type TaskObject = ioBroker.SettableObject & { state?: ioBroker.SettableState };
type DiagInfoType = 'extended' | 'normal' | 'no-city' | 'none';
type Dependencies = string[] | Record<string, string>[] | string | Record<string, string>;

interface GetLogFilesResult {
    list: { fileName: string; size: number }[];
}
interface UploadTask {
    adapter: string;
    msg: ioBroker.SendableMessage;
}

interface RebuildArgs {
    module: string;
    path: string;
    version: string;
}

interface InstallQueueEntry {
    id: ioBroker.ObjectIDs.Instance;
    rebuild?: boolean;
    disabled?: boolean;
    version?: string;
    installedFrom?: string;
    wakeUp?: boolean;
    rebuildArgs?: RebuildArgs;
    inProgress?: boolean;
}

interface Process {
    /** the process itself */
    process?: cp.ChildProcess;
    /** the config of the instance (mainly io-pack attributes) */
    config: Record<string, any>;
    restartTimer?: NodeJS.Timeout;
    restartExpected?: boolean;
    downloadRetry?: number;
    startedInCompactMode?: boolean;
    needsRebuild?: boolean;
    errors?: { ts: number; text: string }[];
    rebuildCounter?: number;
    rebuildArgs?: RebuildArgs;
    startedAsCompactGroup?: boolean;
    engine?: string;
    lastCleanErrors?: number;
    lastStart?: number;
    /** Name of variable, that is subscribed automatically */
    subscribe?: string;
    stopping?: boolean;
    crashCount?: number;
    crashResetTimer?: NodeJS.Timeout;
    schedule?: schedule.Job;
}

interface CompactProcess extends Process {
    /** instances in this compact group */
    instances: ioBroker.ObjectIDs.Instance[];
    /** the process itself */
    process?: cp.ChildProcess;
}

interface StopTimeoutObject {
    timeout: NodeJS.Timeout | null;
    callback?: (() => void) | null;
}

interface RepoRequester {
    /** requesting instance */
    from: string;
    callback: ioBroker.MessageCallbackInfo;
}

const ioPackage = fs.readJSONSync(path.join(tools.getControllerDir(), 'io-package.json'));
const version = ioPackage.common.version;
/** controller versions of multihost environments */
const controllerVersions: Record<string, string> = {};

let pluginHandler: InstanceType<typeof PluginHandler>;
let notificationHandler: NotificationHandler;
/** array of instances which have requested repo update */
let requestedRepoUpdates: RepoRequester[] = [];

const exec = cp.exec;
const spawn = cp.spawn;

let zipFiles: any;
let upload: InstanceType<typeof Upload>; // will be used only once by upload of adapter

/* Use require('loadavg-windows') to enjoy os.loadavg() on Windows OS.
   Currently, Node.js on Windows platform does not implement os.loadavg() functionality - it returns [0,0,0]
   Expect first results after 1 min from application start (before 1 min runtime it will return [0,0,0])
   Requiring it on other operating systems has NO influence.*/
if (os.platform() === 'win32') {
    require('loadavg-windows');
}

let title = `${tools.appName}.js-controller`;

let Objects: typeof ObjectsClient;
let States: typeof StatesClient;

let logger: ReturnType<typeof toolsLogger>;
let isDaemon = false;
let callbackId = 1;
const callbacks: Record<string, { time: number; cb: (message: ioBroker.MessagePayload) => void }> = {};
const hostname = tools.getHostName();
const controllerDir = tools.getControllerDir();
let hostObjectPrefix = `system.host.${hostname}`;
let hostLogPrefix = `host.${hostname}`;
const compactGroupObjectPrefix = '.compactgroup';
const logList: string[] = [];
let detectIpsCount = 0;
let objectsDisconnectTimeout: null | NodeJS.Timeout = null;
let statesDisconnectTimeout: null | NodeJS.Timeout = null;
let connected: null | boolean = null; // not false, because want to detect first connection
let lastDiskSizeCheck = 0;
let restartTimeout: null | NodeJS.Timeout = null;
let connectTimeout: null | NodeJS.Timeout = null;
let reportInterval: null | NodeJS.Timeout = null;
let primaryHostInterval: null | NodeJS.Timeout = null;
let isPrimary = false;
const PRIMARY_HOST_LOCK_TIME = 60_000;
const VENDOR_BOOTSTRAP_FILE = '/opt/iobroker/iob-vendor-secret.json';
const VENDOR_FILE = '/etc/iob-vendor.json';

const procs: Record<string, Process> = {};
// TODO type is probably InstanceCommon
const hostAdapter: Record<string, any> = {};
const subscribe: Record<string, ioBroker.ObjectIDs.Instance[]> = {};
const stopTimeouts: Record<string, StopTimeoutObject> = {};
let states: StatesClient | null = null;
let objects: ObjectsClient | null = null;
let storeTimer: NodeJS.Timeout | null = null;
let mhTimer: NodeJS.Timeout | null = null;
let isStopping: null | number = null;
let allInstancesStopped = true;
let stopTimeout = 10_000;
let uncaughtExceptionCount = 0;
let installQueue: InstallQueueEntry[] = [];
let started = false;
let inputCount = 0;
let outputCount = 0;
let eventLoopLags: number[] = [];
let mhService: any = null; // multihost service
const uptimeStart = Date.now();
let compactGroupController = false;
let compactGroup: null | number = null;
const compactProcs: Record<string, CompactProcess> = {};
const scheduledInstances: Record<string, any> = {};

let updateIPsTimer: NodeJS.Timeout | null = null;
let lastDiagSend: null | number = null;

const uploadTasks: UploadTask[] = [];

const config = getConfig();

function getErrorText(code: number): string {
    return EXIT_CODES[code];
}

/**
 * Get the config directly from fs - never cached
 *
 * @returns {null|object}
 */
function getConfig() {
    const configFile = tools.getConfigFileName();
    if (!fs.existsSync(configFile)) {
        if (process.argv.indexOf('start') !== -1) {
            isDaemon = true;
            logger = toolsLogger('info', [tools.appName], true);
        } else {
            logger = toolsLogger('info', [tools.appName]);
        }
        logger.error(`${hostLogPrefix} conf/${tools.appName}.json missing - call node ${tools.appName}.js setup`);
        process.exit(EXIT_CODES.MISSING_CONFIG_JSON);
        return null;
    } else {
        const _config = fs.readJSONSync(configFile);
        if (!_config.states) {
            _config.states = { type: 'jsonl' };
        }
        if (!_config.objects) {
            _config.objects = { type: 'jsonl' };
        }
        if (!_config.system) {
            _config.system = {};
        }
        return _config;
    }
}

function _startMultihost(_config: Record<string, any>, secret: string | false) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const MHService = require('./lib/multihostServer.js');
    const cpus = os.cpus();
    mhService = new MHService(
        hostname,
        logger,
        _config,
        {
            node: process.version,
            arch: os.arch(),
            model: cpus && cpus[0] && cpus[0].model ? cpus[0].model : 'unknown',
            cpus: cpus ? cpus.length : 1,
            mem: os.totalmem(),
            ostype: os.type()
        },
        tools.findIPs(),
        secret
    );
}

/**
 * Starts or stops the multihost discovery server, depending on the config and temp information
 *
 * @param __config - the iobroker config object
 */
async function startMultihost(__config?: Record<string, any>): Promise<boolean | void> {
    if (compactGroupController) {
        return;
    }

    if (mhTimer) {
        clearTimeout(mhTimer);
        mhTimer = null;
    }

    const _config = __config || getConfig();
    if (_config.multihostService && _config.multihostService.enabled) {
        if (mhService) {
            try {
                mhService.close(() => {
                    mhService = null;
                    setImmediate(() => startMultihost(_config));
                });
                return;
            } catch (e) {
                logger.warn(`${hostLogPrefix} Cannot stop multihost discovery server: ${e.message}`);
            }
        }

        if (!_config.objects.host || dbTools.isLocalObjectsDbServer(_config.objects.type, _config.objects.host, true)) {
            logger.warn(
                `${hostLogPrefix} Multihost Master on this system is not possible, because IP address for objects is ${_config.objects.host}. Please allow remote connections to the server by adjusting the IP.`
            );
            return false;
        } else if (
            !_config.states.host ||
            dbTools.isLocalObjectsDbServer(_config.states.type, _config.states.host, true)
        ) {
            logger.warn(
                `${hostLogPrefix} Multihost Master on this system is not possible, because IP address for states is ${_config.states.host}. Please allow remote connections to the server by adjusting the IP.`
            );
            return false;
        }

        if (_config.multihostService.secure) {
            if (typeof _config.multihostService.password === 'string' && _config.multihostService.password.length) {
                let obj, errText;
                try {
                    obj = await objects!.getObjectAsync('system.config');
                } catch (e) {
                    // will log error below
                    errText = e.message;
                }

                if (obj && obj.native && obj.native.secret) {
                    if (!_config.multihostService.password.startsWith(`$/aes-192-cbc:`)) {
                        // if old encryption was used, we need to decrypt in old fashion
                        tools.decryptPhrase(obj.native.secret, _config.multihostService.password, secret =>
                            _startMultihost(_config, secret!)
                        );
                    } else {
                        try {
                            // it can throw in edge cases #1474, we need further investigation
                            const secret = tools.decrypt(obj.native.secret, _config.multihostService.password);
                            _startMultihost(_config, secret);
                        } catch (e) {
                            logger.error(
                                `${hostLogPrefix} Cannot decrypt password for multihost discovery server: ${e.message}`
                            );
                        }
                    }
                } else {
                    logger.error(
                        `${hostLogPrefix} Cannot start multihost discovery server: no system.config found (err: ${errText})`
                    );
                }
            } else {
                logger.error(
                    `${hostLogPrefix} Cannot start multihost discovery server: secure mode was configured, but no secret was set. Please check the configuration!`
                );
            }
        } else {
            _startMultihost(_config, false);
        }

        if (!_config.multihostService.persist) {
            mhTimer = setTimeout(async () => {
                if (mhService) {
                    try {
                        mhService.close();
                        mhService = null;
                        logger.info(
                            `${hostLogPrefix} Multihost discovery server stopped after 15 minutes, because only temporarily activated`
                        );
                        _config.multihostService.persist = false;
                        _config.multihostService.enabled = false;
                        const configFile = tools.getConfigFileName();
                        await fs.writeFile(configFile, JSON.stringify(_config, null, 2));
                    } catch (e) {
                        logger.warn(`${hostLogPrefix} Cannot stop multihost discovery: ${e.message}`);
                    }
                }
                mhTimer = null;
            }, 15 * 60000);
        }

        return true;
    } else if (mhService) {
        try {
            mhService.close();
            mhService = null;
        } catch (e) {
            logger.warn(`${hostLogPrefix} Cannot stop multihost discovery: ${e.message}`);
        }
        return false;
    }
}

/**
 * Starts cyclic update of IP interfaces.
 * At start every 30 seconds and after 5 minutes, every hour.
 * Because DHCP could change the IPs.
 */
function startUpdateIPs() {
    if (!updateIPsTimer) {
        updateIPsTimer = setInterval(() => {
            if (Date.now() - uptimeStart > 5 * 60_000) {
                // 5 minutes at start check every 30 seconds because of DHCP
                clearInterval(updateIPsTimer!);

                updateIPsTimer = setInterval(() => setIPs(), 3_600_000); // update IPs every hour
            }
            setIPs();
        }, 30_000);
    }
}

// subscribe or unsubscribe loggers
function logRedirect(isActive: boolean, id: string, reason: string): void {
    console.log(`================================== > LOG REDIRECT ${id} => ${isActive} [${reason}]`);
    if (isActive) {
        if (!logList.includes(id)) {
            logList.push(id);
        }
    } else {
        const pos = logList.indexOf(id);
        if (pos !== -1) {
            logList.splice(pos, 1);
        }
    }
}

function handleDisconnect() {
    if (!connected || restartTimeout || isStopping) {
        return;
    }
    if (statesDisconnectTimeout) {
        clearTimeout(statesDisconnectTimeout);
        statesDisconnectTimeout = null;
    }
    if (objectsDisconnectTimeout) {
        clearTimeout(objectsDisconnectTimeout);
        objectsDisconnectTimeout = null;
    }

    connected = false;
    logger.warn(`${hostLogPrefix} Slave controller detected disconnection. Stop all instances.`);
    if (compactGroupController) {
        stop(true);
    } else {
        stop(true, () => {
            restartTimeout = setTimeout(() => {
                processMessage({ command: 'cmdExec', message: { data: '_restart' }, from: hostObjectPrefix });
                setTimeout(() => process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED), 1000);
            }, 10_000);
        });
    }
}

function createStates(onConnect: () => void) {
    states = new States({
        namespace: hostLogPrefix,
        connection: config.states,
        logger: logger,
        hostname: hostname,
        change: (id, stateOrMessage) => {
            inputCount++;
            if (!id) {
                return logger.error(`${hostLogPrefix} change event with no ID: ${JSON.stringify(stateOrMessage)}`);
            }
            // If some log transporter activated or deactivated
            if (id.endsWith('.logging')) {
                const state = stateOrMessage as ioBroker.State;
                logRedirect(state ? (state.val as boolean) : false, id.substring(0, id.length - '.logging'.length), id);
            } else if (!compactGroupController && id === `messagebox.${hostObjectPrefix}`) {
                // If this is messagebox, only the main controller is handling the host messages
                const obj = stateOrMessage as ioBroker.Message;
                if (obj) {
                    // If callback stored for this request
                    if (obj.callback && obj.callback.ack && obj.callback.id && callbacks[`_${obj.callback.id}`]) {
                        callbacks[`_${obj.callback.id}`].cb(obj.message);
                        delete callbacks[`_${obj.callback.id}`];

                        // delete too old callbacks IDs
                        const now = Date.now();
                        for (const _id of Object.keys(callbacks)) {
                            if (now - callbacks[_id].time > 3_600_000) {
                                delete callbacks[_id];
                            }
                        }
                    } else {
                        processMessage(obj);
                    }
                }
            } else if (!compactGroupController && id.match(/^system.adapter.[^.]+\.\d+\.alive$/)) {
                const state = stateOrMessage as ioBroker.State;
                // If this system.adapter.NAME.0.alive, only main controller is handling this
                if (state && !state.ack) {
                    const enabled = state.val;
                    objects!.getObject(id.substring(0, id.length - 6 /*'.alive'.length*/), (err, obj) => {
                        if (err) {
                            logger.error(`${hostLogPrefix} Cannot read object: ${err.message}`);
                        }
                        if (obj && obj.common) {
                            // IF adapter enabled => disable it
                            if ((obj.common.enabled && !enabled) || (!obj.common.enabled && enabled)) {
                                obj.common.enabled = !!enabled;
                                logger.info(
                                    `${hostLogPrefix} instance "${obj._id}" ${
                                        obj.common.enabled ? 'enabled' : 'disabled'
                                    } via .alive`
                                );
                                obj.from = hostObjectPrefix;
                                obj.ts = Date.now();
                                objects!.setObject(
                                    obj._id,
                                    obj,
                                    err => err && logger.error(`${hostLogPrefix} Cannot set object: ${err.message}`)
                                );
                            }
                        }
                    });
                }
            } else if (subscribe[id]) {
                const state = stateOrMessage as ioBroker.State;

                for (const sub of subscribe[id]) {
                    // wake up adapter
                    if (procs[sub]) {
                        console.log(`Wake up ${id} ${JSON.stringify(state)}`);
                        startInstance(sub, true);
                    } else {
                        logger.warn(`${hostLogPrefix} controller Adapter subscribed on ${id} does not exist!`);
                    }
                }
            } else if (id === `${hostObjectPrefix}.logLevel`) {
                const state = stateOrMessage as ioBroker.State;

                if (!config || !config.log || !state || state.ack) {
                    return;
                }
                let currentLevel = config.log.level;
                if (
                    state.val &&
                    state.val !== currentLevel &&
                    ['silly', 'debug', 'info', 'warn', 'error'].includes(state.val as string)
                ) {
                    config.log.level = state.val;
                    for (const transport in logger.transports) {
                        if (
                            logger.transports[transport].level === currentLevel &&
                            // @ts-expect-error its our custom property
                            !logger.transports[transport]._defaultConfigLoglevel
                        ) {
                            logger.transports[transport].level = state.val as string;
                        }
                    }
                    logger.info(`${hostLogPrefix} Loglevel changed from "${currentLevel}" to "${state.val}"`);
                    currentLevel = state.val;
                } else if (state.val && state.val !== currentLevel) {
                    logger.info(`${hostLogPrefix} Got invalid loglevel "${state.val}", ignoring`);
                }
                states!.setState(`${hostObjectPrefix}.logLevel`, {
                    val: currentLevel,
                    ack: true,
                    from: hostObjectPrefix
                });
            } else if (id.startsWith(`${hostObjectPrefix}.plugins.`) && id.endsWith('.enabled')) {
                const state = stateOrMessage as ioBroker.State;

                if (!config || !config.log || !state || state.ack) {
                    return;
                }
                const pluginStatesIndex = `${hostObjectPrefix}.plugins.`.length;
                let nameEndIndex: number | undefined = id.indexOf('.', pluginStatesIndex + 1);
                if (nameEndIndex === -1) {
                    nameEndIndex = undefined;
                }
                const pluginName = id.substring(pluginStatesIndex, nameEndIndex);
                if (!pluginHandler.pluginExists(pluginName)) {
                    return;
                }
                if (pluginHandler.isPluginActive(pluginName) !== state.val) {
                    if (state.val) {
                        if (!pluginHandler.isPluginInstanciated(pluginName)) {
                            pluginHandler.instanciatePlugin(
                                pluginName,
                                pluginHandler.getPluginConfig(pluginName)!,
                                controllerDir
                            );
                            pluginHandler.setDatabaseForPlugin(pluginName, objects, states);
                            pluginHandler.initPlugin(pluginName, ioPackage);
                        }
                    } else {
                        if (!pluginHandler.destroy(pluginName)) {
                            logger.info(
                                `${hostLogPrefix} Plugin ${pluginName} could not be disabled. Please restart ioBroker to disable it.`
                            );
                        }
                    }
                }
            }
        },
        connected: () => {
            if (statesDisconnectTimeout) {
                clearTimeout(statesDisconnectTimeout);
                statesDisconnectTimeout = null;
            }
            // logs and cleanups are only handled by the main controller process
            if (!compactGroupController) {
                deleteAllZipPackages();
            }
            initMessageQueue();
            startAliveInterval();

            initializeController();
            onConnect && onConnect();
        },
        disconnected: (/*error*/) => {
            if (restartTimeout) {
                return;
            }

            statesDisconnectTimeout && clearTimeout(statesDisconnectTimeout);

            statesDisconnectTimeout = setTimeout(() => {
                statesDisconnectTimeout = null;
                handleDisconnect();
            }, (config.states.connectTimeout || 2000) + (!compactGroupController ? 500 : 0));
        }
    });
    return true;
}

async function initializeController() {
    if (!states || !objects || connected) {
        return;
    }

    logger.info(`${hostLogPrefix} connected to Objects and States`);

    // initialize notificationHandler
    const notificationSettings = {
        states: states,
        objects: objects,
        log: logger,
        logPrefix: hostLogPrefix,
        host: hostname
    };

    notificationHandler = new NotificationHandler(notificationSettings);

    if (ioPackage.notifications) {
        try {
            await notificationHandler.addConfig(ioPackage.notifications);
            logger.info(`${hostLogPrefix} added notifications configuration of host`);
            // load setup of all adapters to class, to remember messages even of non-running hosts
            await notificationHandler.getSetupOfAllAdaptersFromHost();
        } catch (e) {
            logger.error(`${hostLogPrefix} Could not add notifications config of this host: ${e.message}`);
        }
    }

    if (connected === null) {
        connected = true;
        if (!isStopping) {
            pluginHandler.setDatabaseForPlugins(objects, states);
            pluginHandler.initPlugins(ioPackage, () => {
                states!.subscribe(`${hostObjectPrefix}.plugins.*`);

                // Do not start if we still stopping the instances
                checkHost(() => {
                    startMultihost(config);
                    setMeta();
                    started = true;
                    getInstances();
                });
            });
        }
    } else {
        connected = true;
        started = true;

        // Do not start if we still stopping the instances
        if (!isStopping) {
            getInstances();
        }
    }
}

// create "objects" object
function createObjects(onConnect: () => void) {
    objects = new Objects({
        namespace: hostLogPrefix,
        connection: config.objects,
        controller: true,
        logger: logger,
        hostname: hostname,
        connected: async () => {
            // stop disconnect timeout
            if (objectsDisconnectTimeout) {
                clearTimeout(objectsDisconnectTimeout);
                objectsDisconnectTimeout = null;
            }

            // subscribe to primary host expiration
            try {
                await objects!.subscribePrimaryHost();
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot subscribe to primary host expiration: ${e.message}`);
            }

            if (!primaryHostInterval && !compactGroupController) {
                primaryHostInterval = setInterval(checkPrimaryHost, PRIMARY_HOST_LOCK_TIME / 2);
            }

            // first execution now
            checkPrimaryHost();

            initializeController();
            onConnect && onConnect();
        },
        disconnected: (/*error*/) => {
            if (restartTimeout) {
                return;
            }
            // on reconnection this will be determiend anew
            isPrimary = false;
            objectsDisconnectTimeout && clearTimeout(objectsDisconnectTimeout);
            objectsDisconnectTimeout = setTimeout(() => {
                objectsDisconnectTimeout = null;
                handleDisconnect();
            }, (config.objects.connectTimeout || 2000) + (!compactGroupController ? 500 : 0));
            // give main controller a bit longer, so that adapter and compact processes can exit before
        },
        change: async (id, obj) => {
            if (!started || !id.match(/^system\.adapter\.[a-zA-Z0-9-_]+\.[0-9]+$/)) {
                return;
            }
            try {
                logger.debug(`${hostLogPrefix} object change ${id} (from: ${obj ? obj.from : null})`);
                // known adapter
                const proc = procs[id];

                if (proc) {
                    // if adapter deleted
                    if (!obj) {
                        // deleted: also remove from instance list of compactGroup
                        if (
                            !compactGroupController &&
                            proc.config.common.compactGroup &&
                            compactProcs[proc.config.common.compactGroup]?.instances?.includes(id as any)
                        ) {
                            compactProcs[proc.config.common.compactGroup].instances.splice(
                                compactProcs[proc.config.common.compactGroup].instances.indexOf(id as any),
                                1
                            );
                        }

                        // instance removed -> remove all notifications
                        await notificationHandler.clearNotifications(null, null, id as any);
                        proc.config.common.enabled = false;
                        proc.config.common.host = null;
                        proc.config.deleted = true;
                        delete hostAdapter[id];
                        logger.info(`${hostLogPrefix} object deleted ${id}`);
                    } else {
                        if (proc.config.common.enabled && !obj.common.enabled) {
                            logger.info(`${hostLogPrefix} "${id}" disabled`);
                        }
                        if (!proc.config.common.enabled && obj.common.enabled) {
                            logger.info(`${hostLogPrefix} "${id}" enabled`);
                            proc.downloadRetry = 0;
                        }

                        // Check if compactgroup or compact mode changed
                        if (
                            !compactGroupController &&
                            proc.config.common.compactGroup &&
                            (proc.config.common.compactGroup !== obj.common.compactGroup ||
                                proc.config.common.runAsCompactMode !== obj.common.runAsCompactMode) &&
                            compactProcs[proc.config.common.compactGroup]?.instances?.includes(id as any)
                        ) {
                            compactProcs[proc.config.common.compactGroup].instances.splice(
                                compactProcs[proc.config.common.compactGroup].instances.indexOf(id as any),
                                1
                            );
                        }
                        proc.config = obj;
                        hostAdapter[id] = hostAdapter[id] || {};
                        hostAdapter[id].config = obj;
                    }
                    if (
                        proc.process ||
                        proc.config.common.mode === 'schedule' ||
                        proc.config.common.mode === 'subscribe'
                    ) {
                        proc.restartExpected = true;
                        stopInstance(id, false, async () => {
                            if (!procs[id]) {
                                return;
                            }
                            const _ipArr = tools.findIPs();

                            if (checkAndAddInstance(proc.config as any, _ipArr)) {
                                if (
                                    proc.config.common.enabled &&
                                    (proc.config.common.mode !== 'extension' || !proc.config.native.webInstance)
                                ) {
                                    if (proc.restartTimer) {
                                        clearTimeout(proc.restartTimer);
                                    }
                                    const restartTimeout = (proc.config.common.stopTimeout || 500) + 2_500;
                                    // @ts-expect-error tell ts it is an instance id
                                    proc.restartTimer = setTimeout(_id => startInstance(_id), restartTimeout, id);
                                }
                            } else {
                                // moved: also remove from instance list of compactGroup
                                if (
                                    !compactGroupController &&
                                    proc.config.common.compactGroup &&
                                    compactProcs[proc.config.common.compactGroup]?.instances?.includes(id as any)
                                ) {
                                    compactProcs[proc.config.common.compactGroup].instances.splice(
                                        compactProcs[proc.config.common.compactGroup].instances.indexOf(id as any),
                                        1
                                    );
                                }
                                if (proc.restartTimer) {
                                    clearTimeout(proc.restartTimer);
                                    delete proc.restartTimer;
                                }

                                // instance moved -> remove all notifications, new host has to take care
                                await notificationHandler.clearNotifications(null, null, id);

                                delete procs[id];
                                delete hostAdapter[id];
                            }
                        });
                    } else if (installQueue.find(obj => obj.id === id)) {
                        // ignore object changes when still in install queue
                        logger.debug(
                            `${hostLogPrefix} ignore object change because the adapter is still in installation/rebuild queue`
                        );
                    } else {
                        const _ipArr = tools.findIPs();
                        if (proc.config && checkAndAddInstance(proc.config as any, _ipArr)) {
                            if (
                                proc.config.common.enabled &&
                                (proc.config.common.mode !== 'extension' || !proc.config.native.webInstance)
                            ) {
                                // @ts-expect-error ts not able to infer instance id here
                                startInstance(id);
                            }
                        } else {
                            // moved: also remove from instance list of compactGroup
                            if (
                                !compactGroupController &&
                                proc.config.common.compactGroup &&
                                compactProcs[proc.config.common.compactGroup]?.instances?.includes(id as any)
                            ) {
                                compactProcs[proc.config.common.compactGroup].instances.splice(
                                    compactProcs[proc.config.common.compactGroup].instances.indexOf(id as any),
                                    1
                                );
                            }
                            if (proc.restartTimer) {
                                clearTimeout(proc.restartTimer);
                                delete proc.restartTimer;
                            }

                            delete procs[id];
                            delete hostAdapter[id];
                        }
                    }
                } else if (obj && obj.type === 'host' && obj.common?.installedVersion) {
                    // host object changed
                    // TODO: remove this shim if 4.0 is old enough
                    if (controllerVersions[id]) {
                        if (
                            semver.lt(controllerVersions[id], '4.0.0') &&
                            semver.gte(obj.common.installedVersion, '4.0.0')
                        ) {
                            // old version lower 4 new version greater 4, restart needed
                            logger.info(`${hostLogPrefix} Multihost controller upgrade detected, restarting ...`);
                            restart();
                        } else if (
                            semver.gte(controllerVersions[id], '4.0.0') &&
                            semver.lt(obj.common.installedVersion, '4.0.0')
                        ) {
                            // controller was above 4 and now below 4
                            logger.info(`${hostLogPrefix} Multihost controller downgrade detected, restarting ...`);
                            restart();
                        }
                    } else {
                        //  we don't know this host yet, so it is new to the mh system
                        let restartRequired = true;

                        // if we are a already a multihost make the version check else restart in all cases
                        if (Object.keys(controllerVersions).length > 1) {
                            if (semver.lt(obj.common.installedVersion, '4.0.0')) {
                                for (const controllerVersion of Object.values(controllerVersions)) {
                                    if (semver.lt(controllerVersion, '4.0.0')) {
                                        // there was another host < 4 so no restart required
                                        restartRequired = false;
                                        break;
                                    }
                                }
                            } else {
                                // version is greater equal 4
                                for (const controllerVersion of Object.values(controllerVersions)) {
                                    if (semver.gte(controllerVersion, '4.0.0')) {
                                        // there was already another host greater equal 4 -> no restart needed
                                        restartRequired = false;
                                        break;
                                    }
                                }
                            }
                        } else {
                            // change from single to multihost - deactivate sets asap but also restart
                            await objects!.deactivateSets();
                        }

                        if (restartRequired) {
                            logger.info(`${hostLogPrefix} New multihost participant detected, restarting ...`);
                            restart();
                        }
                    }

                    controllerVersions[id] = obj.common.installedVersion;
                } else if (!obj && /^system\.host\.[^.]+$/.test(id)) {
                    const delVersion = controllerVersions[id];
                    delete controllerVersions[id];
                    // host object deleted
                    if (delVersion && semver.lt(delVersion, '4.0.0')) {
                        // check if the only below 4 host has been deleted, then we need restart
                        for (const version of Object.values(controllerVersions)) {
                            if (semver.lt(version, '4.0.0')) {
                                // another version below 4, so still need old protocol
                                return;
                            }
                        }
                        logger.info(`${hostLogPrefix} Multihost controller deletion detected, restarting ...`);
                        restart();
                    }
                } else if (obj && obj.common) {
                    const _ipArr = tools.findIPs();
                    // new adapter

                    const proc = procs[id];
                    if (
                        checkAndAddInstance(obj as ioBroker.InstanceObject, _ipArr) &&
                        proc.config.common.enabled &&
                        (proc.config.common.mode !== 'extension' || !proc.config.native.webInstance)
                    ) {
                        // We should give is a slight delay to allow an pot. former existing process on other host to exit
                        const restartTimeout = (proc.config.common.stopTimeout || 500) + 2_500;
                        // @ts-expect-error tell ts it is an instance id
                        proc.restartTimer = setTimeout(_id => startInstance(_id), restartTimeout, id);
                    }
                }
            } catch (err) {
                if (
                    !compactGroupController ||
                    (obj && obj.common && obj.common.runAsCompactMode && obj.common.compactGroup === compactGroup)
                ) {
                    logger.error(`${hostLogPrefix} cannot process: ${id}: ${err} / ${err.stack}`);
                }
            }
        },
        primaryHostLost: () => {
            if (!isStopping) {
                isPrimary = false;
                logger.info('The primary host is no longer active. Checking responsibilities.');
                checkPrimaryHost();
            }
        }
    });
    return true;
}

function startAliveInterval() {
    config.system = config.system || {};
    config.system.statisticsInterval = parseInt(config.system.statisticsInterval, 10) || 15000;
    config.system.checkDiskInterval =
        config.system.checkDiskInterval !== 0 ? parseInt(config.system.checkDiskInterval, 10) || 300000 : 0;
    if (!compactGroupController) {
        // Provide info to see for each host if compact is enabled or not and be able to use in Admin or such
        states!.setState(`${hostObjectPrefix}.compactModeEnabled`, {
            ack: true,
            from: hostObjectPrefix,
            val: config.system.compact || false
        });
    }
    reportInterval = setInterval(reportStatus, config.system.statisticsInterval);

    reportStatus();
    tools.measureEventLoopLag(1000, lag => eventLoopLags.push(lag!));
}

/**
 * Ensures that we take over primary host if no other is doing the job
 *
 * @return {Promise<void>}
 */
async function checkPrimaryHost() {
    // we cannot interact with db now because currently reconnecting
    if (objectsDisconnectTimeout || compactGroupController) {
        return;
    }

    // let our host value live PRIMARY_HOST_LOCK_TIME seconds, while it should be renewed lock time / 2
    try {
        if (!isPrimary) {
            isPrimary = !!(await objects!.setPrimaryHost(PRIMARY_HOST_LOCK_TIME));
        } else {
            const lockExtended = !!(await objects!.extendPrimaryHostLock(PRIMARY_HOST_LOCK_TIME));
            if (!lockExtended) {
                // if we are host, lock extension should always work, fallback to acquire lock
                isPrimary = !!(await objects!.setPrimaryHost(PRIMARY_HOST_LOCK_TIME));
            }
        }
    } catch (e) {
        logger.error(`${hostLogPrefix} Could not execute primary host determination: ${e.message}`);
    }
}

function reportStatus() {
    if (!states) {
        return;
    }
    const id = hostObjectPrefix;
    outputCount += 10;
    states.setState(`${id}.alive`, {
        val: true,
        ack: true,
        expire: Math.floor(config.system.statisticsInterval / 1000) + 10,
        from: id
    });

    // provide infos about current process

    // pidUsage([pid,pid,...], function (err, stats) {
    // => {
    //   cpu: 10.0,            // percentage (from 0 to 100*vcore)
    //   memory: 357306368,    // bytes
    //   ppid: 312,            // PPID
    //   pid: 727,             // PID
    //   ctime: 867000,        // ms user + system time
    //   elapsed: 6650000,     // ms since the start of the process
    //   timestamp: 864000000  // ms since epoch
    // }
    try {
        pidUsage(process.pid, (err, stats) => {
            // controller.s might be stopped, but this is still running
            if (!err && states && states.setState && stats) {
                states.setState(`${id}.cpu`, {
                    ack: true,
                    from: id,
                    val: Math.round(100 * stats.cpu) / 100
                });
                states.setState(`${id}.cputime`, { ack: true, from: id, val: stats.ctime / 1000 });
                outputCount += 2;
            }
        });
    } catch (e) {
        logger.error(`${hostLogPrefix} Cannot read pidUsage data : ${e.message}`);
    }

    try {
        const mem = process.memoryUsage();
        states.setState(`${id}.memRss`, {
            val: Math.round(mem.rss / 10485.76 /* 1MB / 100 */) / 100,
            ack: true,
            from: id
        });
        states.setState(`${id}.memHeapTotal`, {
            val: Math.round(mem.heapTotal / 10485.76 /* 1MB / 100 */) / 100,
            ack: true,
            from: id
        });
        states.setState(`${id}.memHeapUsed`, {
            val: Math.round(mem.heapUsed / 10485.76 /* 1MB / 100 */) / 100,
            ack: true,
            from: id
        });
    } catch (e) {
        logger.error(`${hostLogPrefix} Cannot read memoryUsage data: ${e.message}`);
    }

    // provide machine infos

    states.setState(`${id}.load`, { val: Math.round(os.loadavg()[0] * 100) / 100, ack: true, from: id }); //require('loadavg-windows')
    states.setState(`${id}.uptime`, { val: Math.round(process.uptime()), ack: true, from: id });
    states.setState(`${id}.mem`, { val: Math.round((1000 * os.freemem()) / os.totalmem()) / 10, ack: true, from: id });
    states.setState(`${id}.freemem`, { val: Math.round(os.freemem() / 1048576 /* 1MB */), ack: true, from: id });

    if (fs.existsSync('/proc/meminfo')) {
        try {
            const text = fs.readFileSync('/proc/meminfo', 'utf8');
            const m = text && text.match(/MemAvailable:\s*(\d+)/);
            if (m && m[1]) {
                states.setState(`${id}.memAvailable`, {
                    val: Math.round(parseInt(m[1], 10) * 0.001024),
                    ack: true,
                    from: id
                });
                outputCount++;
            }
        } catch (e) {
            logger.error(`${hostLogPrefix} Cannot read /proc/meminfo: ${e.message}`);
        }
    }

    if (config.system.checkDiskInterval && Date.now() - lastDiskSizeCheck >= config.system.checkDiskInterval) {
        lastDiskSizeCheck = Date.now();
        tools.getDiskInfo(os.platform(), (err, info) => {
            if (err) {
                logger.error(`${hostLogPrefix} Cannot read disk size: ${err.message}`);
            }
            try {
                if (info) {
                    states!.setState(`${id}.diskSize`, {
                        val: Math.round((info['Disk size'] || 0) / (1024 * 1024)),
                        ack: true,
                        from: id
                    });
                    states!.setState(`${id}.diskFree`, {
                        val: Math.round((info['Disk free'] || 0) / (1024 * 1024)),
                        ack: true,
                        from: id
                    });
                    outputCount += 2;
                }
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot read disk information: ${e.message}`);
            }
        });
    }

    // some statistics
    states.setState(`${id}.inputCount`, { val: inputCount, ack: true, from: id });
    states.setState(`${id}.outputCount`, { val: outputCount, ack: true, from: id });

    if (eventLoopLags.length) {
        const eventLoopLag = Math.ceil(eventLoopLags.reduce((a, b) => a + b) / eventLoopLags.length);
        states.setState(`${id}.eventLoopLag`, { val: eventLoopLag, ack: true, from: id }); // average of measured values
        eventLoopLags = [];
    }

    states.setState(`${id}.compactgroupProcesses`, { val: Object.keys(compactProcs).length, ack: true, from: id });
    let realProcesses = 0;
    let compactProcesses = 0;
    Object.keys(procs).forEach(proc => {
        if (procs[proc].process) {
            if (procs[proc].startedInCompactMode) {
                compactProcesses++;
            } else {
                realProcesses++;
            }
        }
    });
    states.setState(`${id}.instancesAsProcess`, { val: realProcesses, ack: true, from: id });
    states.setState(`${id}.instancesAsCompact`, { val: compactProcesses, ack: true, from: id });

    inputCount = 0;
    outputCount = 0;
    if (!isStopping && compactGroupController && started && compactProcesses === 0 && realProcesses === 0) {
        logger.info(`${hostLogPrefix} Compact group controller ${compactGroup} does not own any processes, stop`);
        stop(false);
    }
}

async function changeHost(
    objs: ioBroker.GetObjectViewItem<ioBroker.InstanceObject>[],
    oldHostname: string,
    newHostname: string
): Promise<void> {
    for (const row of objs) {
        if (row?.value?.common.host === oldHostname) {
            const obj = row.value;
            obj.common.host = newHostname;
            logger.info(
                `${hostLogPrefix} Reassign instance ${obj._id.substring(
                    'system.adapter.'.length
                )} from ${oldHostname} to ${newHostname}`
            );
            obj.from = `system.host.${tools.getHostName()}`;
            obj.ts = Date.now();

            try {
                await objects!.setObject(obj._id, obj);
            } catch (e) {
                logger.error(`Error changing host of ${obj._id}: ${e.message}`);
            }
        }
    }
}

/**
 * Clean a single auto subscribe
 *
 * @param instance instance id without `system.adapter.` prefix
 * @param autoInstance instance id
 * @param callback
 */
function cleanAutoSubscribe(instance: string, autoInstance: ioBroker.ObjectIDs.Instance, callback: () => void): void {
    inputCount++;
    states!.getState(`${autoInstance}.subscribes`, (err, state) => {
        if (!state || !state.val) {
            return typeof callback === 'function' && setImmediate(() => callback());
        }
        let subs;
        try {
            subs = JSON.parse(state.val as string);
        } catch {
            logger.error(`${hostLogPrefix} Cannot parse subscribes: ${state.val}`);
            return typeof callback === 'function' && setImmediate(() => callback());
        }
        let modified = false;
        // look for all subscribes from this instance
        for (const pattern of Object.keys(subs)) {
            for (const id of Object.keys(subs[pattern])) {
                if (id === instance) {
                    modified = true;
                    delete subs[pattern][id];
                }
            }

            // check if array is now empty
            if (!Object.keys(subs[pattern]).length) {
                modified = true;
                delete subs[pattern];
            }
        }

        if (modified) {
            outputCount++;
            states!.setState(`${autoInstance}.subscribes`, subs, () => typeof callback === 'function' && callback());
        } else if (typeof callback === 'function') {
            setImmediate(() => callback());
        }
    });
}

function cleanAutoSubscribes(instanceID: ioBroker.ObjectIDs.Instance, callback: () => void): void {
    const instance = instanceID.substring(15); // get name.0

    // read all instances
    objects!.getObjectView(
        'system',
        'instance',
        { startkey: 'system.adapter.', endkey: 'system.adapter.\u9999' },
        (err, res) => {
            let count = 0;
            if (res && res.rows) {
                for (const row of res.rows) {
                    // remove this instance from autoSubscribe
                    if (row.value?.common.subscribable) {
                        count++;
                        // @ts-expect-error https://github.com/ioBroker/ioBroker.js-controller/issues/2089
                        cleanAutoSubscribe(instance, row.id, () => !--count && callback && callback());
                    }
                }
            }
            !count && callback && callback();
        }
    );
}

async function delObjects(objs: ioBroker.GetObjectViewItem<ioBroker.AnyObject>[]) {
    for (const row of objs) {
        if (row && row.id) {
            logger.info(`${hostLogPrefix} Delete state "${row.id}"`);
            try {
                if (row.value && row.value.type === 'state') {
                    await states!.delState(row.id);
                    await objects!.delObject(row.id);
                } else {
                    await objects!.delObject(row.id);
                }
            } catch {
                // ignore
            }
        }
    }
}

/**
 * try to check host in objects
 * <p>
 * This function tries to find all hosts in the objects and if
 * only one host found and it is not actual host, change the
 * host name to new one.
 * <p>
 *
 */
function checkHost(callback: () => void): void {
    const objectData = objects!.getStatus();
    // only file master host controller needs to check/fix the host assignments from the instances
    // for redis it is currently not possible to detect a single host system with a changed hostname for sure!
    if (compactGroupController || !objectData.server) {
        return callback && callback();
    }
    objects!.getObjectView(
        'system',
        'host',
        {
            startkey: 'system.host.',
            endkey: 'system.host.\u9999'
        },
        (_err, doc) => {
            if (!_err && doc?.rows.length === 1 && doc?.rows[0].value!.common.name !== hostname) {
                const oldHostname = doc.rows[0].value!.common.name;
                const oldId = doc.rows[0].value!._id;

                // find out all instances and rewrite it to actual hostname
                objects!.getObjectView(
                    'system',
                    'instance',
                    {
                        startkey: 'system.adapter.',
                        endkey: 'system.adapter.\u9999'
                    },
                    async (err, doc) => {
                        if (err && err.message.startsWith('Cannot find ')) {
                            typeof callback === 'function' && callback();
                        } else if (!doc?.rows || doc.rows.length === 0) {
                            logger.info(`${hostLogPrefix} no instances found`);
                            // no instances found
                            typeof callback === 'function' && callback();
                        } else {
                            // reassign all instances
                            await changeHost(doc.rows, oldHostname, hostname);
                            logger.info(`${hostLogPrefix} Delete host ${oldId}`);

                            // delete host object
                            objects!.delObject(oldId, () =>
                                // delete all hosts states
                                objects!.getObjectView(
                                    'system',
                                    'state',
                                    {
                                        startkey: `system.host.${oldHostname}.`,
                                        endkey: `system.host.${oldHostname}.\u9999`,
                                        include_docs: true
                                    },
                                    async (_err, doc) => {
                                        if (doc?.rows) {
                                            await delObjects(doc.rows);
                                        }
                                        callback && callback();
                                    }
                                )
                            );
                        }
                    }
                );
            } else if (typeof callback === 'function') {
                callback();
            }
        }
    );
}

/**
 * Collects the dialog information, e.g. used by Admin "System Settings"
 *
 * @param type - type of required information
 */
async function collectDiagInfo(type: DiagInfoType): Promise<void | Record<string, any> | null> {
    if (type !== 'extended' && type !== 'normal' && type !== 'no-city') {
        return null;
    } else {
        let systemConfig;
        let err;

        try {
            systemConfig = await objects!.getObjectAsync('system.config');
        } catch (e) {
            err = e;
        }

        if (err || !systemConfig || !systemConfig.common) {
            logger.warn(`System config object is corrupt, please run "iobroker setup first". Error: ${err.message}`);
            systemConfig = systemConfig || { common: {} };
            systemConfig.common = systemConfig.common || {};
        }

        let obj;
        try {
            obj = await objects!.getObjectAsync('system.meta.uuid');
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
            doc = await objects!.getObjectViewAsync('system', 'host', {
                startkey: 'system.host.',
                endkey: 'system.host.\u9999'
            });
        } catch (e) {
            err = e;
        }

        const { noCompactInstances, noInstances } = await _getNumberOfInstances();

        // we need to show city and country at the beginning, so include it now and delete it later if not allowed.
        const diag: Record<string, any> = {
            uuid: obj.native.uuid,
            // @ts-expect-error fallback has no lang todo
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
            noCompactInstances
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

        if (!err && doc && doc.rows.length) {
            doc.rows.sort((a, b) => {
                try {
                    return semver.lt(
                        a?.value?.common?.installedVersion ?? '0.0.0',
                        b?.value?.common?.installedVersion ?? '0.0.0'
                    )
                        ? 1
                        : 0;
                } catch {
                    logger.error(
                        `${hostLogPrefix} Invalid versions: ${
                            a && a.value && a.value.common ? a.value.common.installedVersion : '0.0.0'
                        }[${a && a.value && a.value.common ? a.value.common.name : 'unknown'}] or ${
                            b && b.value && b.value.common ? b.value.common.installedVersion : '0.0.0'
                        }[${b && b.value && b.value.common ? b.value.common.name : 'unknown'}]`
                    );
                    return 0;
                }
            });

            // Read installed versions of all hosts
            for (const row of doc.rows) {
                diag.hosts.push({
                    version: row.value.common.installedVersion,
                    platform: row.value.common.platform,
                    type: row.value.native.os.platform
                });
            }
        }

        doc = null;
        err = null;

        try {
            doc = await objects!.getObjectViewAsync('system', 'adapter', {
                startkey: 'system.adapter.',
                endkey: 'system.adapter.\u9999'
            });
        } catch (e) {
            err = e;
        }

        let visFound = false;
        if (!err && doc && doc.rows.length) {
            // Read installed versions of all adapters
            for (const row of doc.rows) {
                diag.adapters[row.value.common.name] = {
                    version: row.value.common.version,
                    platform: row.value.common.platform
                };
                if (row.value.common.name === 'vis') {
                    visFound = true;
                }
            }
        }
        // read number of vis datapoints
        if (visFound) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const visUtils = require('./lib/vis/states');
            try {
                return new Promise(resolve => {
                    visUtils(objects, null, 0, null, async (err: any, points: any) => {
                        let total = null;
                        const tasks = [];
                        if (points && points.length) {
                            for (const point of points) {
                                if (point.id === 'vis.0.datapoints.total') {
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
                                        write: false
                                    },
                                    state: {
                                        val: point.val,
                                        ack: true
                                    }
                                });
                            }
                        }
                        if (total !== null) {
                            diag.vis = total;
                        }

                        await extendObjects(tasks);
                        resolve(diag);
                    });
                });
            } catch (e) {
                logger.error(`${hostLogPrefix} cannot call visUtils: ${e.message}`);
                return diag;
            }
        } else {
            return diag;
        }
    }
}

// check if some IPv4 address found. If not try in 30 seconds one more time (max 10 times)
function setIPs(ipList?: string[]) {
    if (isStopping) {
        return;
    }
    const _ipList = ipList || tools.findIPs();

    // check if IPs detected (because of DHCP delay)
    let found = false;
    for (let a = 0; a < _ipList.length; a++) {
        if (_ipList[a] === '127.0.0.1' || _ipList[a] === '::1/128' || !_ipList[a].match(/^\d+\.\d+\.\d+\.\d+$/)) {
            continue;
        }
        found = true;
        break;
    }
    // IPv4 address still not found, try again in 30 seconds
    if (!found && detectIpsCount < 10) {
        detectIpsCount++;
        setTimeout(() => setIPs(), 30_000);
    } else if (found) {
        // IPv4 found => write to object
        objects!.getObject(`system.host.${hostname}`, (err, oldObj) => {
            const networkInterfaces = os.networkInterfaces();

            if (
                !err &&
                oldObj &&
                oldObj.common &&
                oldObj.native &&
                oldObj.native.hardware &&
                (!isDeepStrictEqual(oldObj.native.hardware.networkInterfaces, networkInterfaces) ||
                    !isDeepStrictEqual(oldObj.common.address, _ipList))
            ) {
                oldObj.common.address = _ipList;
                oldObj.native.hardware.networkInterfaces = networkInterfaces;
                oldObj.from = hostObjectPrefix;
                oldObj.ts = Date.now();
                objects!.setObject(
                    oldObj._id,
                    oldObj,
                    err => err && logger.error(`${hostLogPrefix} Cannot write host object: ${err.message}`)
                );
            }

            // update IP list periodically
            startUpdateIPs();
        });
    } else {
        logger.info(`${hostLogPrefix} No IPv4 address found after 5 minutes.`);
    }
}

/**
 * Extends objects, optionally you can provide a state at each task (does not throw)
 * @param tasks
 */
async function extendObjects(tasks: Record<string, any>[]): Promise<void> {
    for (const task of tasks) {
        const state = task.state;
        if (state !== undefined) {
            delete task.state;
        }

        try {
            await objects!.extendObjectAsync(task._id, task);
            // if extend throws we don't want to set corresponding state
            if (state) {
                await states!.setStateAsync(task._id, state);
            }
        } catch {
            // ignore
        }
    }
}

function setMeta() {
    const id = hostObjectPrefix;

    objects!.getObject(id, (err, oldObj) => {
        let newObj: ioBroker.HostObject | ioBroker.FolderObject;
        if (compactGroupController) {
            newObj = {
                _id: id,
                type: 'folder',
                common: {
                    name: hostname + compactGroupObjectPrefix + compactGroup,
                    cmd:
                        process.argv[0] +
                        ' ' +
                        (process.execArgv.join(' ') + ' ').replace(/--inspect-brk=\d+ /, '') +
                        process.argv.slice(1).join(' '),
                    hostname: hostname,
                    address: tools.findIPs()
                },
                native: {}
            };
        } else {
            // @ts-expect-error todo fix later
            newObj = {
                _id: id,
                type: 'host',
                common: {
                    name: hostname,
                    title:
                        oldObj && oldObj.common && oldObj.common.title ? oldObj.common.title : ioPackage.common.title,
                    installedVersion: version,
                    platform: ioPackage.common.platform,
                    cmd:
                        process.argv[0] +
                        ' ' +
                        (process.execArgv.join(' ') + ' ').replace(/--inspect-brk=\d+ /, '') +
                        process.argv.slice(1).join(' '),
                    hostname: hostname,
                    address: tools.findIPs(),
                    type: ioPackage.common.name
                },
                native: {
                    process: {
                        title: process.title,
                        versions: process.versions,
                        env: process.env
                    },
                    os: {
                        hostname: hostname,
                        type: os.type(),
                        platform: os.platform(),
                        arch: os.arch(),
                        release: os.release(),
                        endianness: os.endianness(),
                        tmpdir: os.tmpdir()
                    },
                    hardware: {
                        cpus: os.cpus(),
                        totalmem: os.totalmem(),
                        networkInterfaces: {}
                    }
                }
            };

            if (oldObj?.common?.icon) {
                newObj.common.icon = oldObj.common.icon;
            }
            if (oldObj?.common?.color) {
                newObj.common.color = oldObj.common.color;
            }
            // remove dynamic information
            if (newObj.native?.hardware?.cpus) {
                for (const cpu of newObj.native.hardware.cpus) {
                    if (cpu.times) {
                        delete cpu.times;
                    }
                }
            }
            if (oldObj?.native.hardware?.networkInterfaces) {
                newObj.native.hardware.networkInterfaces = oldObj.native.hardware.networkInterfaces;
            }
        }

        if (oldObj) {
            // @ts-expect-error todo: can be removed?
            delete oldObj.cmd;
            delete oldObj.from;
            delete oldObj.ts;
            delete oldObj.acl;
        }

        if (!oldObj || !isDeepStrictEqual(newObj, oldObj)) {
            newObj.from = hostObjectPrefix;
            newObj.ts = Date.now();
            objects!.setObject(id, newObj, err => {
                if (err) {
                    logger.error(`${hostLogPrefix} Cannot write host object: ${err.message}`);
                } else {
                    setIPs(newObj.common.address);
                }
            });
        } else {
            setIPs(newObj.common.address);
        }
    });

    const tasks: TaskObject[] = [];
    let obj: TaskObject;

    if (!compactGroupController) {
        obj = {
            _id: `${id}.compactModeEnabled`,
            type: 'state',
            common: {
                name: 'Controller - compact mode enabled',
                type: 'boolean',
                read: true,
                write: false,
                role: 'indicator'
            },
            native: {}
        };
        tasks.push(obj);

        obj = {
            _id: `${id}.compactgroupProcesses`,
            type: 'state',
            common: {
                name: 'Controller - number of compact group controllers',
                type: 'number',
                read: true,
                write: false,
                min: 0,
                role: 'value',
                unit: 'processes'
            },
            native: {}
        };
        tasks.push(obj);

        obj = {
            _id: `${id}.nodeVersion`,
            type: 'state',
            common: {
                name: 'Controller - Node.js version',
                type: 'string',
                read: true,
                write: false,
                desc: 'Node.js version of the host process.',
                role: 'state'
            },
            native: {}
        };
        tasks.push(obj);
    }

    obj = {
        _id: id + '.instancesAsProcess',
        type: 'state',
        common: {
            name: 'Controller - number of instance processes',
            type: 'number',
            read: true,
            write: false,
            min: 0,
            role: 'value',
            unit: 'processes'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.instancesAsCompact',
        type: 'state',
        common: {
            name: 'Controller - number of instances started in this host process',
            type: 'number',
            read: true,
            write: false,
            min: 0,
            role: 'value',
            unit: 'instances'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.cpu',
        type: 'state',
        common: {
            name: 'Controller - cpu usage in % of one core',
            type: 'number',
            read: true,
            write: false,
            min: 0,
            role: 'value',
            unit: '% of one core'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.cputime',
        type: 'state',
        common: {
            name: 'Controller - accumulated cputime in seconds',
            type: 'number',
            read: true,
            write: false,
            min: 0,
            role: 'value',
            unit: 'seconds'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.mem',
        type: 'state',
        common: {
            type: 'number',
            role: 'value',
            name: `${hostname} - memory usage in %`,
            unit: '%',
            read: true,
            write: false,
            min: 0,
            max: 100
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: `${id}.memHeapUsed`,
        type: 'state',
        common: {
            type: 'number',
            role: 'value',
            name: 'Controller - heap memory used in MB',
            read: true,
            write: false,
            min: 0,
            unit: 'MB'
        },
        native: {}
    };
    tasks.push(obj);

    if (fs.existsSync('/proc/meminfo')) {
        obj = {
            _id: id + '.memAvailable',
            type: 'state',
            common: {
                type: 'number',
                role: 'value',
                name: hostname + ' - available memory from /proc/meminfo in MB',
                read: true,
                write: false,
                min: 0,
                unit: 'MB'
            },
            native: {}
        };
        tasks.push(obj);
    }

    obj = {
        _id: id + '.memHeapTotal',
        type: 'state',
        common: {
            type: 'number',
            role: 'value',
            name: 'Controller - heap memory reserved in MB',
            read: true,
            write: false,
            min: 0,
            unit: 'MB'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.memRss',
        type: 'state',
        common: {
            type: 'number',
            role: 'value',
            name: 'Controller - resident set size memory in MB',
            desc: "RSS is the resident set size, the portion of the process's memory held in RAM",
            read: true,
            write: false,
            min: 0,
            unit: 'MB'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.uptime',
        type: 'state',
        common: {
            type: 'number',
            role: 'value',
            name: 'Controller - uptime in seconds',
            read: true,
            write: false,
            min: 0,
            unit: 'seconds'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.load',
        type: 'state',
        common: {
            unit: '',
            type: 'number',
            role: 'value',
            read: true,
            write: false,
            name: hostname + ' - load average 1min'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.alive',
        type: 'state',
        common: {
            name: hostname + ' - alive status',
            read: true,
            write: false,
            type: 'boolean',
            role: 'indicator'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.freemem',
        type: 'state',
        common: {
            name: hostname + ' - available RAM in MB',
            unit: 'MB',
            read: true,
            write: false,
            type: 'number',
            role: 'value'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.inputCount',
        type: 'state',
        common: {
            name: 'Controller - input level in events/15 seconds',
            desc: "State's inputs in 15 seconds",
            type: 'number',
            read: true,
            write: false,
            role: 'value',
            unit: 'events/15 seconds'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.outputCount',
        type: 'state',
        common: {
            name: 'Controller - output level in events/15 seconds',
            desc: "State's outputs in 15 seconds",
            type: 'number',
            read: true,
            write: false,
            role: 'value',
            unit: 'events/15 seconds'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.eventLoopLag',
        type: 'state',
        common: {
            name: 'Controller - The Node.js event loop lag in ms, averaged over 15 seconds',
            desc: 'Average Node.js event loop lag in ms',
            type: 'number',
            read: true,
            write: false,
            role: 'value',
            unit: 'ms'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.zip',
        type: 'folder',
        common: {
            name: 'ZIP files',
            desc: 'Files for download'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: id + '.logLevel',
        type: 'state',
        common: {
            name: 'Controller - Loglevel',
            type: 'string',
            read: true,
            write: true,
            desc: 'Loglevel of the host process. Will be set on start with defined value but can be overridden during runtime',
            role: 'state'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id: `${id}.pid`,
        type: 'state',
        common: {
            name: 'Controller - Process ID',
            type: 'number',
            read: true,
            write: false,
            role: 'value'
        },
        native: {},
        state: {
            val: process.pid,
            ack: true
        }
    };
    tasks.push(obj);

    config.system.checkDiskInterval =
        config.system.checkDiskInterval !== 0 ? parseInt(config.system.checkDiskInterval, 10) || 300000 : 0;

    if (config.system.checkDiskInterval) {
        obj = {
            _id: id + '.diskSize',
            type: 'state',
            common: {
                name: hostname + ' - disk total size',
                desc: 'Disk size of logical volume where the server is installed in MiB',
                type: 'number',
                read: true,
                write: false,
                role: 'value',
                unit: 'MiB'
            },
            native: {}
        };
        tasks.push(obj);

        obj = {
            _id: id + '.diskFree',
            type: 'state',
            common: {
                name: hostname + ' - disk free size',
                desc: 'Free disk size of the logical volume where the server is installed in MiB',
                type: 'number',
                read: true,
                write: false,
                role: 'value',
                unit: 'MiB'
            },
            native: {}
        };
        tasks.push(obj);

        obj = {
            _id: id + '.diskWarning',
            type: 'state',
            common: {
                name: hostname + ' - disk warning level',
                desc: 'Show warning in admin if the free disk space is below this value',
                type: 'number',
                read: true,
                write: true,
                def: 5,
                role: 'level',
                unit: '%'
            },
            native: {}
        };
        tasks.push(obj);
    }

    // delete obsolete states and create new ones
    objects!.getObjectView(
        'system',
        'state',
        { startkey: `${hostObjectPrefix}.`, endkey: `${hostObjectPrefix}.\u9999`, include_docs: true },
        async (err, doc) => {
            if (err) {
                logger &&
                    logger.error(
                        `${hostLogPrefix} Could not collect ${hostObjectPrefix} states to check for obsolete states: ${err.message}`
                    );
            } else if (doc?.rows) {
                // identify existing states for deletion, because they are not in the new tasks-list
                let thishostStates = doc.rows;
                if (!compactGroupController) {
                    thishostStates = doc.rows.filter(
                        out1 => !out1.id.includes(hostObjectPrefix + compactGroupObjectPrefix)
                    );
                }
                const pluginStatesIndex = `${hostObjectPrefix}.plugins.`.length;
                const notificationStatesIndex = `${hostObjectPrefix}.notifications.`.length;
                const toDelete = thishostStates.filter(out1 => {
                    const found = tasks.find(out2 => out1.id === out2._id);
                    if (found === undefined) {
                        if (out1.id.startsWith(`${hostObjectPrefix}.plugins.`)) {
                            let nameEndIndex: number | undefined = out1.id.indexOf('.', pluginStatesIndex + 1);
                            if (nameEndIndex === -1) {
                                nameEndIndex = undefined;
                            }
                            return !pluginHandler.pluginExists(out1.id.substring(pluginStatesIndex, nameEndIndex));
                        } else if (out1.id.startsWith(`${hostObjectPrefix}.notifications.`)) {
                            // notifications states are allowed to exist if their scope still exists
                            return !notificationHandler.scopeExists(out1.id.substring(notificationStatesIndex));
                        }
                    }

                    return found === undefined;
                });

                if (toDelete && toDelete.length > 0) {
                    await delObjects(toDelete);
                    logger && logger.info(`${hostLogPrefix} Some obsolete host states deleted.`);
                }
            }
            await extendObjects(tasks);
            // create UUID if not exist
            if (!compactGroupController) {
                const uuid = await tools.createUuid(objects);
                uuid && logger && logger.info(`${hostLogPrefix} Created UUID: ${uuid}`);

                if (fs.existsSync(VENDOR_BOOTSTRAP_FILE)) {
                    logger &&
                        logger.info(`${hostLogPrefix} Detected vendor file: ${fs.existsSync(VENDOR_BOOTSTRAP_FILE)}`);
                    try {
                        const startScript = fs.readJSONSync(VENDOR_BOOTSTRAP_FILE);

                        if (startScript.password) {
                            const { Vendor } = await import('@iobroker/js-controller-cli');
                            const vendor = new Vendor({ objects: objects! });

                            logger && logger.info(`${hostLogPrefix} Apply vendor file: ${VENDOR_FILE}`);
                            try {
                                await vendor.checkVendor(VENDOR_FILE, startScript.password, logger);
                                logger && logger.info(`${hostLogPrefix} Vendor information synchronised.`);
                                try {
                                    if (fs.existsSync(VENDOR_BOOTSTRAP_FILE)) {
                                        fs.unlinkSync(VENDOR_BOOTSTRAP_FILE);
                                    }
                                } catch (e) {
                                    logger &&
                                        logger.error(
                                            `${hostLogPrefix} Cannot delete file ${VENDOR_BOOTSTRAP_FILE}: ${e.message}`
                                        );
                                }
                            } catch (e) {
                                logger &&
                                    logger.error(`${hostLogPrefix} Cannot update vendor information: ${e.message}`);
                                try {
                                    fs.existsSync(VENDOR_BOOTSTRAP_FILE) && fs.unlinkSync(VENDOR_BOOTSTRAP_FILE);
                                } catch (e) {
                                    logger &&
                                        logger.error(
                                            `${hostLogPrefix} Cannot delete file ${VENDOR_BOOTSTRAP_FILE}: ${e.message}`
                                        );
                                }
                            }
                        }
                    } catch (e) {
                        logger && logger.error(`${hostLogPrefix} Cannot parse ${VENDOR_BOOTSTRAP_FILE}: ${e.message}`);
                        try {
                            fs.existsSync(VENDOR_BOOTSTRAP_FILE) && fs.unlinkSync(VENDOR_BOOTSTRAP_FILE);
                        } catch (e) {
                            logger &&
                                logger.error(
                                    `${hostLogPrefix} Cannot delete file ${VENDOR_BOOTSTRAP_FILE}: ${e.message}`
                                );
                        }
                    }
                }
            }
        }
    );
}

// Subscribe on message queue
function initMessageQueue(): void {
    states!.subscribeMessage(hostObjectPrefix);
}

/**
 * Send message to other adapter instance
 *
 * @param objName - adapter name (hm-rpc) or id like system.host.rpi/system.adapter,hm-rpc
 * @param command
 * @param message
 * @param callback
 */
async function sendTo(
    objName: string,
    command: string,
    message: ioBroker.MessagePayload,
    callback?: ioBroker.ErrorCallback | ioBroker.MessageCallbackInfo
): Promise<void> {
    if (message === undefined) {
        message = command;
        command = 'send';
    }

    const obj: ioBroker.SendableMessage = { command, message, from: hostObjectPrefix };

    if (!objName.startsWith('system.adapter.') && !objName.startsWith('system.host.')) {
        objName = `system.adapter.${objName}`;
    }

    if (callback) {
        if (typeof callback === 'function') {
            obj.callback = {
                message: message,
                id: callbackId++,
                ack: false,
                time: Date.now()
            };
            if (callbackId > 0xffffffff) {
                callbackId = 1;
            }

            callbacks[`_${obj.callback.id}`] = { cb: callback, time: Date.now() };
        } else {
            obj.callback = callback;
            obj.callback.ack = true;
        }
    }
    try {
        await states!.pushMessage(objName, obj);
    } catch (e) {
        // do not stringify the object, we had the issue with the invalid string length on serialization
        logger.error(
            `${hostLogPrefix} [sendTo] Could not push message "${inspect(obj)}" to "${objName}": ${e.message}`
        );
        if (obj.callback && obj.callback.id) {
            if (typeof callback === 'function') {
                callback(e);
            }
            delete callbacks[`_${obj.callback.id}`];
        }
    }
}

async function getVersionFromHost(hostId: ioBroker.ObjectIDs.Host): Promise<Record<string, any> | null | undefined> {
    const state = await states!.getState(`${hostId}.alive`);
    if (state && state.val) {
        return new Promise(resolve => {
            let timeout: NodeJS.Timeout | null = setTimeout(() => {
                timeout = null;
                logger.warn(`${hostLogPrefix} too delayed answer for ${hostId}`);
                resolve(null);
            }, 5_000);

            sendTo(hostId, 'getVersion', null, ioPack => {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                    resolve(ioPack);
                }
            });
        });
    } else {
        logger.warn(`${hostLogPrefix} "${hostId}" is offline`);
        return null;
    }
}
/**
 Helper function that serialize deletion of states
 @param list array with states
 */
async function _deleteAllZipPackages(list: string[]): Promise<void> {
    for (const id of list) {
        try {
            await states!.delBinaryState(id);
        } catch {
            //ignore
        }
    }
}
/**
 * This function deletes all ZIP packages that were not downloaded.
 * ZIP Package is temporary file, that should be deleted straight after it downloaded and if it still exists, so clear it
 */
async function deleteAllZipPackages(): Promise<void> {
    const list = await states!.getKeys(hostObjectPrefix + '.zip.*');
    await _deleteAllZipPackages(list!);
}

async function startAdapterUpload() {
    if (!uploadTasks.length) {
        return;
    }

    if (!upload) {
        upload = new Upload({
            states: states!,
            objects: objects!
        });
    }

    const msg = uploadTasks[0].msg;

    const logger = msg.from
        ? {
              log: (text: string) =>
                  // @ts-expect-error formally text is not allowed in Message, why not warpped in message payload property?
                  states!.pushMessage(msg.from, { command: 'log', text, from: `system.host.${hostname}` }),
              warn: (text: string) =>
                  // @ts-expect-error formally text is not allowed in Message, why not warpped in message payload property?
                  states!.pushMessage(msg.from, { command: 'warn', text, from: `system.host.${hostname}` }),
              error: (text: string) =>
                  // @ts-expect-error formally text is not allowed in Message, why not warpped in message payload property?
                  states!.pushMessage(msg.from, { command: 'error', text, from: `system.host.${hostname}` })
          }
        : undefined;

    // @ts-expect-error yes the logger is missing some levels
    await upload.uploadAdapter(uploadTasks[0].adapter, true, true, '', logger);
    await upload.upgradeAdapterObjects(uploadTasks[0].adapter, logger);
    // @ts-expect-error yes the logger is missing some levels
    await upload.uploadAdapter(uploadTasks[0].adapter, false, true, '', logger);
    // send response to requester
    msg.callback && msg.from && sendTo(msg.from, msg.command, { result: 'done' }, msg.callback);

    uploadTasks.shift();

    setImmediate(startAdapterUpload);
}

/**
 * Process message to controller, like execute some script
 *
 * @param msg
 */
async function processMessage(msg: ioBroker.SendableMessage): Promise<null | void> {
    // important: Do not forget to update the list of protected commands in iobroker.admin/lib/socket.js for "socket.on('sendToHost'"
    // and iobroker.socketio/lib/socket.js

    if (isStopping) {
        logger.debug(`${hostLogPrefix} Ignoring incoming Host message because controller is stopping ${msg.command}`);
        return;
    }

    logger.debug(`${hostLogPrefix} Incoming Host message ${msg.command}`);
    switch (msg.command) {
        case 'shell':
            if (config.system && config.system.allowShellCommands) {
                logger.info(`${hostLogPrefix} ${tools.appName} execute shell command: ${msg.message}`);
                exec(msg.message, { windowsHide: true }, (err, stdout, stderr) => {
                    if (err) {
                        return logger.error(`${hostLogPrefix} error: ${err.message}`);
                    }

                    logger.info(`${hostLogPrefix} stdout: ${stdout}`);
                    logger.error(`${hostLogPrefix} stderr: ${stderr}`);
                });
            } else {
                logger.warn(
                    `${hostLogPrefix} ${tools.appName} cannot execute shell command "${msg.message}" because not enabled in ${tools.appName}.json file`
                );
            }

            break;

        case 'cmdExec': {
            const args = [`${__dirname}/${tools.appName}.js`];
            if (!msg.message.data || typeof msg.message.data !== 'string') {
                logger.warn(
                    `${hostLogPrefix} ${
                        tools.appName
                    } Invalid cmdExec object. Expected key "data" with the command as string. Got as "data": ${JSON.stringify(
                        msg.message.data
                    )}`
                );
            } else {
                const cmd = msg.message.data.split(' ');
                for (let i = 0; i < cmd.length; i++) {
                    args.push(cmd[i]);
                }
                logger.info(`${hostLogPrefix} ${tools.appName} ${args.slice(1).join(' ')}`);

                try {
                    const child = spawn('node', args, { windowsHide: true });
                    if (child.stdout) {
                        child.stdout.on('data', data => {
                            data = data.toString().replace(/\n/g, '');
                            logger.info(`${hostLogPrefix} ${tools.appName} ${data}`);
                            msg.from && sendTo(msg.from, 'cmdStdout', { id: msg.message.id, data: data });
                        });
                    }

                    if (child.stderr) {
                        child.stderr.on('data', data => {
                            data = data.toString().replace(/\n/g, '');
                            logger.error(`${hostLogPrefix} ${tools.appName} ${data}`);
                            msg.from && sendTo(msg.from, 'cmdStderr', { id: msg.message.id, data: data });
                        });
                    }

                    child.on('exit', exitCode => {
                        logger.info(`${hostLogPrefix} ${tools.appName} exit ${exitCode}`);
                        if (msg.from) {
                            sendTo(msg.from, 'cmdExit', { id: msg.message.id, data: exitCode });
                            // Sometimes finished command is lost, recent it
                            setTimeout(() => sendTo(msg.from, 'cmdExit', { id: msg.message.id, data: exitCode }), 1000);
                        }
                    });
                } catch (e) {
                    logger.error(`${hostLogPrefix} ${tools.appName} ${e.message}`);
                    msg.from && sendTo(msg.from, 'cmdStderr', { id: msg.message.id, data: e.message });
                }
            }

            break;
        }

        case 'getRepository':
            if (msg.callback && msg.from) {
                requestedRepoUpdates.push({ from: msg.from, callback: msg.callback });
                if (requestedRepoUpdates.length > 1) {
                    // someone has requested repo previous to us
                    logger.debug(
                        `${hostLogPrefix} Repository update already running, registered instance "${msg.from}"`
                    );
                    return;
                }

                let systemConfig;
                try {
                    systemConfig = await objects!.getObject('system.config');
                } catch {
                    // ignore
                }

                // Collect statistics (only if license has been confirmed - user agreed)
                if (
                    systemConfig?.common &&
                    systemConfig.common.diag &&
                    systemConfig.common.licenseConfirmed &&
                    (!lastDiagSend || Date.now() - lastDiagSend > 30_000) // prevent sending of diagnostics by multiple admin instances
                ) {
                    lastDiagSend = Date.now();
                    try {
                        const obj = await collectDiagInfo(systemConfig.common.diag);
                        // if user selected 'none' we will have null here and do not want to send it
                        obj && tools.sendDiagInfo(obj); // Ignore the response here and do not wait for result to decrease the repo fetching as it used in admin GUI
                    } catch (e) {
                        logger.error(`${hostLogPrefix} cannot collect diagnostics: ${e.message}`);
                    }
                }

                const globalRepo = {};

                const systemRepos = await objects!.getObjectAsync('system.repositories');

                // Check if repositories exists
                if (systemRepos?.native?.repositories) {
                    let updateRepo = false;
                    if (tools.isObject(msg.message)) {
                        updateRepo = msg.message.update;
                        msg.message = msg.message.repo;
                    }

                    // @ts-expect-error todo it can be undefined handle the case
                    let active = msg.message || systemConfig.common.activeRepo;

                    if (!Array.isArray(active)) {
                        active = [active];
                    }

                    let changed = false;

                    for (const repo of active) {
                        if (systemRepos.native.repositories[repo]) {
                            if (typeof systemRepos.native.repositories[repo] === 'string') {
                                systemRepos.native.repositories[repo] = {
                                    link: systemRepos.native.repositories[repo],
                                    json: null
                                };
                                changed = true;
                            }

                            const currentRepo = systemRepos.native.repositories[repo];

                            // If repo is not yet loaded
                            if (!currentRepo.json || updateRepo) {
                                logger.info(
                                    `${hostLogPrefix} Updating repository "${repo}" under "${currentRepo.link}"`
                                );
                                try {
                                    let result;
                                    // prevent the request of repos by multiple admin adapters at start
                                    if (
                                        currentRepo.json &&
                                        currentRepo.time &&
                                        currentRepo.hash &&
                                        Date.now() - new Date(currentRepo.time).getTime() < 30_000
                                    ) {
                                        result = currentRepo;
                                    } else {
                                        result = await tools.getRepositoryFileAsync(
                                            currentRepo.link,
                                            currentRepo.hash,
                                            updateRepo,
                                            currentRepo.json
                                        );
                                    }

                                    // If repo was really changed
                                    if (result && result.json && result.changed) {
                                        currentRepo.json = result.json;
                                        currentRepo.hash = result.hash || '';
                                        currentRepo.time = new Date().toISOString();
                                        changed = true;
                                    }
                                    // Make sure, that time is stored too to prevent the frequent access to repo server
                                    if (!currentRepo.time) {
                                        currentRepo.time = new Date().toISOString();
                                        changed = true;
                                    }
                                } catch (e) {
                                    logger.error(
                                        `${hostLogPrefix} Error by updating repository "${repo}" under "${systemRepos.native.repositories[repo].link}": ${e.message}`
                                    );
                                }
                            }

                            if (currentRepo.json) {
                                Object.assign(globalRepo, currentRepo.json);
                            }
                        } else {
                            logger.warn(`${hostLogPrefix} Requested repository "${repo}" does not exist in config.`);
                        }
                    }
                    if (changed) {
                        try {
                            await objects!.setObjectAsync('system.repositories', systemRepos);
                        } catch (e) {
                            logger.warn(`${hostLogPrefix} Repository object could not be updated: ${e.message}`);
                        }
                    }
                }

                for (const requester of requestedRepoUpdates) {
                    sendTo(requester.from, msg.command, globalRepo, requester.callback);
                }

                requestedRepoUpdates = [];
            } else {
                logger.error(
                    `${hostLogPrefix} Invalid request ${
                        msg.command
                    }. "callback"(${!!msg.callback}) or "from"(${!!msg.from}) is null`
                );
            }
            break;

        case 'getInstalled':
            if (msg.callback && msg.from) {
                // Get list of all hosts
                objects!.getObjectView(
                    'system',
                    'host',
                    {
                        startkey: 'system.host.',
                        endkey: 'system.host.\u9999'
                    },
                    async (err, doc) => {
                        const result: Record<string, any> = tools.getInstalledInfo(version);
                        result.hosts = {};
                        if (doc && doc.rows.length) {
                            // Read installed versions of all hosts
                            for (const row of doc.rows) {
                                // If desired local version, do not ask it, just answer
                                if (row.id === hostObjectPrefix) {
                                    const ioPackCommon = deepClone(ioPackage.common);

                                    ioPackCommon.host = hostname;
                                    ioPackCommon.runningVersion = version;
                                    result.hosts[hostname] = ioPackCommon;
                                } else {
                                    // @ts-expect-error https://github.com/ioBroker/ioBroker.js-controller/issues/2089
                                    const ioPack = await getVersionFromHost(row.id);
                                    if (ioPack) {
                                        result.hosts[ioPack.host] = ioPack;
                                        result.hosts[ioPack.host].controller = true;
                                    }
                                }
                            }
                        }

                        sendTo(msg.from, msg.command, result, msg.callback);
                    }
                );
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'getInstalledAdapter':
            if (msg.callback && msg.from && msg.message) {
                // read adapter file
                const dir = tools.getAdapterDir(msg.message);
                let _result = null;
                if (fs.existsSync(dir + '/io-package.json')) {
                    try {
                        _result = fs.readJSONSync(dir + '/io-package.json');
                    } catch {
                        logger.error(`${hostLogPrefix} cannot read and parse "${dir}/io-package.json"`);
                    }
                }
                sendTo(msg.from, msg.command, _result, msg.callback);
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'getVersion':
            if (msg.callback && msg.from) {
                const ioPackCommon = deepClone(ioPackage.common);
                ioPackCommon.host = hostname;
                ioPackCommon.runningVersion = version;
                sendTo(msg.from, msg.command, ioPackCommon, msg.callback);
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'getDiagData':
            if (msg.callback && msg.from) {
                if (msg.message) {
                    try {
                        const obj = await collectDiagInfo(msg.message);
                        sendTo(msg.from, msg.command, obj, msg.callback);
                    } catch {
                        sendTo(msg.from, msg.command, null, msg.callback);
                    }
                } else {
                    sendTo(msg.from, msg.command, null, msg.callback);
                }
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'getLocationOnDisk':
            if (msg.callback && msg.from) {
                sendTo(msg.from, msg.command, { path: controllerDir, platform: os.platform() }, msg.callback);
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'getDevList':
            if (msg.callback && msg.from) {
                if (os.platform() === 'linux') {
                    const _args = ['/dev'];
                    logger.info(hostLogPrefix + ' ls /dev');
                    const _child = spawn('ls', _args, { windowsHide: true });
                    let result = '';
                    if (_child.stdout) {
                        _child.stdout.on('data', data => (result += data.toString()));
                    }
                    if (_child.stderr) {
                        _child.stderr.on('data', data => logger.error(`${hostLogPrefix} ls ${data}`));
                    }

                    _child.on('exit', (/*exitCode*/) => {
                        result = result.replace(/(\r\n|\n|\r|\t)/gm, ' ');
                        const parts = result.split(' ');
                        const resList = [];
                        for (let t = 0; t < parts.length; t++) {
                            parts[t] = parts[t].trim();
                            if (parts[t]) {
                                resList.push(parts[t]);
                            }
                        }

                        sendTo(msg.from, msg.command, resList, msg.callback);
                    });
                    break;
                } else {
                    sendTo(msg.from, msg.command, null, msg.callback);
                }
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'getLogs':
            if (msg.callback && msg.from) {
                const lines = msg.message || 200;
                let text = '';
                // @ts-expect-error types not know this one
                let logFile_ = logger.getFileName(); //__dirname + '/log/' + tools.appName + '.log';

                if (!fs.existsSync(logFile_)) {
                    logFile_ = `${controllerDir}/../../log/${tools.appName}.log`;
                }

                if (fs.existsSync(logFile_)) {
                    const stats = fs.statSync(logFile_);
                    const start = stats.size > 150 * lines ? stats.size - 150 * lines : 0;

                    fs.createReadStream(logFile_, {
                        start,
                        end: stats.size
                    })
                        .on('data', chunk => (text += chunk.toString()))
                        .on('end', () => {
                            // done
                            const lines = text.split('\n');
                            if (start) {
                                lines.shift(); // remove first line of the file as it could be not full if starts not from 0
                            }
                            lines.push(stats.size.toString()); // place as last line the current size of log
                            sendTo(msg.from, msg.command, lines, msg.callback);
                        })
                        .on('error', () =>
                            // done
                            sendTo(msg.from, msg.command, [stats.size], msg.callback)
                        );
                } else {
                    sendTo(msg.from, msg.command, [0], msg.callback);
                }
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'getLogFile':
            if (msg.callback && msg.from && msg.message) {
                const config = getConfig();
                if (config && config.log && config.log.transport && config.log.transport[msg.message.transport]) {
                    let filename = config.log.transport[msg.message.transport].filename || 'log/';
                    const parts = filename.replace(/\\/g, '/').split('/');
                    parts.pop();
                    filename = parts.join('/');

                    if (filename[0] !== '/' && !filename.match(/^\W:/)) {
                        const parts = ['..', '..', '..', '..'];
                        do {
                            parts.pop();
                            const _filename = path.normalize(`${controllerDir}/${parts.join('/')}/`) + filename;
                            if (fs.existsSync(_filename)) {
                                filename = _filename;
                                break;
                            }
                        } while (parts.length);
                    }

                    if (fs.existsSync(filename)) {
                        try {
                            const file = path.join(filename, msg.message.filename);
                            const stat = fs.lstatSync(file);

                            const data = fs.readFileSync(file);
                            sendTo(
                                msg.from,
                                msg.command,
                                { data, gz: msg.message.filename.toLowerCase().endsWith('.gz'), size: stat.size },
                                msg.callback
                            );
                        } catch (e) {
                            sendTo(msg.from, msg.command, { error: 'Cannot read file: ' + e }, msg.callback);
                        }
                    } else {
                        sendTo(msg.from, msg.command, { error: 'Cannot find file' }, msg.callback);
                    }
                } else {
                    sendTo(msg.from, msg.command, { error: 'invalid config' }, msg.callback);
                }
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'getLogFiles':
            if (msg.callback && msg.from) {
                const config = getConfig();
                const result: GetLogFilesResult = { list: [] };
                // detect file log
                if (config && config.log && config.log.transport) {
                    for (const transport in config.log.transport) {
                        if (config.log.transport[transport] && config.log.transport[transport].type === 'file') {
                            let filename = config.log.transport[transport].filename || 'log/';
                            const parts = filename.replace(/\\/g, '/').split('/');
                            parts.pop();
                            filename = parts.join('/');

                            if (filename[0] !== '/' && !filename.match(/^\W:/)) {
                                const parts = ['..', '..', '..', '..'];
                                do {
                                    parts.pop();
                                    const _filename = path.normalize(`${controllerDir}/${parts.join('/')}/`) + filename;
                                    if (fs.existsSync(_filename)) {
                                        filename = _filename;
                                        break;
                                    }
                                } while (parts.length);
                            }

                            try {
                                if (fs.existsSync(filename)) {
                                    const files = fs.readdirSync(filename);

                                    for (const file of files) {
                                        try {
                                            if (!file.endsWith('-audit.json')) {
                                                const stat = fs.lstatSync(path.join(filename, file));
                                                if (!stat.isDirectory()) {
                                                    result.list.push({
                                                        fileName: `log/${hostname}/${transport}/${file}`,
                                                        size: stat.size
                                                    });
                                                }
                                            }
                                        } catch (e) {
                                            logger.error(
                                                `${hostLogPrefix} cannot check file: ${path.join(filename, file)} - ${
                                                    e.message
                                                }`
                                            );
                                        }
                                    }
                                }
                            } catch (e) {
                                logger.error(`${hostLogPrefix} cannot check files: ${filename} - ${e.message}`);
                            }
                        }
                    }
                }

                sendTo(msg.from, msg.command, result, msg.callback);
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'getHostInfo':
            if (msg.callback && msg.from) {
                // installed adapters
                // available adapters
                // node.js --version
                // npm --version
                // uptime
                let data;
                try {
                    data = (await tools.getHostInfo(objects)) || {};
                } catch (e) {
                    logger.error(`${hostLogPrefix} cannot get getHostInfo: ${e.message}`);
                    return null;
                }

                data.Uptime = Math.round((Date.now() - uptimeStart) / 1_000);
                // add information about running instances
                let count = 0;
                for (const proc of Object.values(procs)) {
                    if (proc.process) {
                        count++;
                    }
                }

                let location = path.normalize(`${controllerDir}/../`);
                if (path.basename(location) === 'node_modules') {
                    location = path.normalize(`${controllerDir}/../../`);
                }

                data['Active instances'] = count;
                data.location = location;

                sendTo(msg.from, msg.command, data, msg.callback);
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'getHostInfoShort':
            if (msg.callback && msg.from) {
                // same as getHostInfo, but faster because delivers less information
                // node.js --version
                // uptime
                let location = path.normalize(`${controllerDir}/../`);
                if (path.basename(location) === 'node_modules') {
                    location = path.normalize(`${controllerDir}/../../`);
                }

                const cpus = os.cpus();
                const dateObj = new Date();

                const data: Record<string, any> = {
                    Platform: os.platform(),
                    os: process.platform,
                    Architecture: os.arch(),
                    CPUs: cpus.length,
                    Speed: tools.isObject(cpus[0]) ? cpus[0].speed : undefined,
                    Model: tools.isObject(cpus[0]) ? cpus[0].model : undefined,
                    RAM: os.totalmem(),
                    'System uptime': Math.round(os.uptime()),
                    'Node.js': process.version,
                    location,
                    time: dateObj.getTime(), // give infos to compare the local times
                    timeOffset: dateObj.getTimezoneOffset()
                };

                if (data.Platform === 'win32') {
                    data.Platform = 'Windows';
                } else if (data.Platform === 'darwin') {
                    data.Platform = 'OSX';
                }

                sendTo(msg.from, msg.command, data, msg.callback);
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;
        case 'delLogs': {
            // @ts-expect-error types not know this one
            const logFile = logger.getFileName(); //controllerDir + '/log/' + tools.appName + '.log';
            fs.existsSync(`${controllerDir}/log/${tools.appName}.log`) &&
                fs.writeFileSync(`${controllerDir}/log/${tools.appName}.log`, '');
            fs.existsSync(`${controllerDir}/../../log/${tools.appName}.log`) &&
                fs.writeFileSync(`${controllerDir}/../../log/${tools.appName}.log`, '');
            fs.existsSync(logFile) && fs.writeFileSync(logFile, '');

            msg.callback && msg.from && sendTo(msg.from, msg.command, null, msg.callback);
            break;
        }

        case 'readDirAsZip':
            if (msg.callback && msg.from) {
                zipFiles = zipFiles || require('./lib/zipFiles');
                zipFiles.readDirAsZip(
                    objects,
                    msg.message.id,
                    msg.message.name,
                    msg.message.options,
                    (err: any, base64: string) => {
                        if (base64) {
                            sendTo(msg.from, msg.command, { error: err, data: base64 }, msg.callback);
                        } else {
                            sendTo(msg.from, msg.command, { error: err }, msg.callback);
                        }
                    }
                );
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'writeDirAsZip':
            zipFiles = zipFiles || require('./lib/zipFiles');
            try {
                await zipFiles.writeDirAsZip(
                    objects,
                    msg.message.id,
                    msg.message.name,
                    Buffer.from(msg.message.data, 'base64'),
                    msg.message.options
                );

                msg.callback && msg.from && sendTo(msg.from, msg.command, {}, msg.callback);
            } catch (error) {
                logger.error(`${hostLogPrefix} Cannot write zip file as folder: ${error}`);
                msg.callback && msg.from && sendTo(msg.from, msg.command, { error }, msg.callback);
            }
            break;

        case 'readObjectsAsZip':
            if (msg.callback && msg.from) {
                zipFiles = zipFiles || require('./lib/zipFiles');
                zipFiles.readObjectsAsZip(
                    objects,
                    msg.message.id,
                    msg.message.adapter,
                    msg.message.options,
                    (error: any, base64: string) => {
                        // If client supports file via link
                        if (msg.message.link) {
                            if (!error) {
                                const buff = Buffer.from(base64, 'base64');
                                states!.setBinaryState(`${hostObjectPrefix}.zip.${msg.message.link}`, buff, err => {
                                    if (err) {
                                        sendTo(msg.from, msg.command, { error: err }, msg.callback);
                                    } else {
                                        sendTo(
                                            msg.from,
                                            msg.command,
                                            `${hostObjectPrefix}.zip.${msg.message.link}`,
                                            msg.callback
                                        );
                                    }
                                });
                            } else {
                                sendTo(msg.from, msg.command, { error }, msg.callback);
                            }
                        } else {
                            if (base64) {
                                sendTo(msg.from, msg.command, { error, data: base64 }, msg.callback);
                            } else {
                                sendTo(msg.from, msg.command, { error }, msg.callback);
                            }
                        }
                    }
                );
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'writeObjectsAsZip':
            zipFiles = zipFiles || require('./lib/zipFiles');
            zipFiles.writeObjectsAsZip(
                objects,
                msg.message.id,
                msg.message.adapter,
                Buffer.from(msg.message.data || '', 'base64'),
                msg.message.options,
                (error: any) => msg.callback && msg.from && sendTo(msg.from, msg.command, { error }, msg.callback)
            );
            break;

        case 'checkLogging':
            (function () {
                // TODO: temporary enough to remove now?
                // this is temporary function to check the logging functionality
                // Print all information into log
                let logs: string[] = [];

                // LogList
                logs.push(`Actual Loglist - ${JSON.stringify(logList)}`);

                // Read current state of all log subscribers
                states!.getKeys('*.logging', (err, keys) => {
                    if (keys && keys.length) {
                        states!.getStates(keys, (err, objs) => {
                            if (objs) {
                                for (let i = 0; i < keys.length; i++) {
                                    const obj = objs[i];
                                    if (obj) {
                                        const id = keys[i]
                                            .substring(0, keys[i].length - '.logging'.length)
                                            .replace(/^io\./, '');

                                        if (obj.val === true) {
                                            logs.push(`Subscriber - ${id} ENABLED`);
                                        } else {
                                            logs && logs.push(`Subscriber - ${id} (disabled)`);
                                        }
                                    }
                                }
                            }
                            setTimeout(() => {
                                for (let m = 0; m < logs.length; m++) {
                                    logger.error(`${hostLogPrefix} LOGINFO: ${logs[m]}`);
                                }
                                logs = [];
                            }, 3_000);
                        });
                    }
                });

                // Get list of all active adapters and send them message with command checkLogging
                for (const _id of Object.keys(procs)) {
                    if (procs[_id].process) {
                        outputCount++;
                        states!.setState(_id + '.checkLogging', { val: true, ack: false, from: hostObjectPrefix });
                    }
                }
            })();
            break;

        case 'updateMultihost': {
            const result = startMultihost();
            if (msg.callback) {
                sendTo(msg.from, msg.command, { result: result }, msg.callback);
            }
            break;
        }

        case 'getInterfaces':
            if (msg.callback && msg.from) {
                sendTo(msg.from, msg.command, { result: os.networkInterfaces() }, msg.callback);
            } else {
                logger.error(`${hostLogPrefix} Invalid request ${msg.command}. "callback" or "from" is null`);
            }
            break;

        case 'upload': {
            if (msg.message) {
                uploadTasks.push({ adapter: msg.message, msg });
                // start upload if no tasks running
                uploadTasks.length === 1 && startAdapterUpload();
            } else {
                logger.error(`${hostLogPrefix} No adapter name is specified for upload command from  ${msg.from}`);
            }
            break;
        }

        case 'rebuildAdapter':
            if (!msg.message.id) {
                if (msg.callback && msg.from) {
                    sendTo(msg.from, msg.command, { error: 'Adapter to rebuild not provided.' }, msg.callback);
                }
            } else if (!installQueue.some(entry => entry.id === msg.message.id)) {
                logger.info(
                    `${hostLogPrefix} ${msg.message.id} will be rebuilt${
                        msg.message.rebuildArgs ? ` (Args: ${JSON.stringify(msg.message.rebuildArgs)})` : ''
                    }`
                );
                const installObj: InstallQueueEntry = { id: msg.message.id, rebuild: true };
                if (msg.message.rebuildArgs) {
                    installObj.rebuildArgs = msg.message.rebuildArgs;
                }

                installQueue.push(installObj);
                // start install queue if not started
                installQueue.length === 1 && installAdapters();

                if (msg.callback && msg.from) {
                    sendTo(msg.from, msg.command, { result: 'ok' }, msg.callback);
                }
            } else {
                logger.info(
                    `${hostLogPrefix} ${msg.message.id} still in installQueue, rebuild will be done with install`
                );
                if (msg.callback && msg.from) {
                    sendTo(msg.from, msg.command, { result: 'pending' }, msg.callback);
                }
            }
            break;

        case 'readBaseSettings':
            if (msg.callback && msg.from) {
                const configFile = tools.getConfigFileName();
                if (fs.existsSync(configFile)) {
                    try {
                        let config = fs.readFileSync(configFile).toString('utf8');
                        const stat = fs.lstatSync(configFile);
                        config = JSON.parse(config);
                        sendTo(msg.from, msg.command, { config, isActive: uptimeStart > stat.mtimeMs }, msg.callback);
                    } catch {
                        const error = 'Cannot parse file ' + configFile;
                        logger.error(hostLogPrefix + ' ' + error);
                        sendTo(msg.from, msg.command, { error }, msg.callback);
                    }
                } else {
                    const error = 'Cannot find file ' + configFile;
                    logger.error(hostLogPrefix + ' ' + error);
                    sendTo(msg.from, msg.command, { error }, msg.callback);
                }
            } else {
                logger.error(
                    `${hostLogPrefix} No adapter name is specified for readBaseSettings command from  ${msg.from}`
                );
            }
            break;

        case 'writeBaseSettings': {
            let error;
            if (msg.message) {
                const configFile = tools.getConfigFileName();
                if (fs.existsSync(configFile)) {
                    let config;
                    if (typeof msg.message === 'string') {
                        try {
                            config = JSON.parse(msg.message);
                        } catch {
                            error = 'Cannot parse data ' + msg.message;
                        }
                    } else {
                        config = msg.message;
                    }

                    if (!error) {
                        // todo validate structure, because very important
                        if (!config.system) {
                            error = 'Cannot find "system" in data';
                        } else if (!config.objects) {
                            error = 'Cannot find "objects" in data';
                        } else if (!config.states) {
                            error = 'Cannot find "states" in data';
                        } else if (!config.log) {
                            error = 'Cannot find "log" in data';
                        }
                    }

                    if (!error) {
                        try {
                            fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
                        } catch {
                            error = 'Cannot write file ' + configFile;
                        }
                    }
                }
            } else {
                error = 'No data found for writeBaseSettings ' + msg.from;
            }

            if (error) {
                logger.error(`${hostLogPrefix} ${error}`);
                if (msg.callback && msg.from) {
                    sendTo(msg.from, msg.command, { error }, msg.callback);
                }
            } else {
                msg.callback && msg.from && sendTo(msg.from, msg.command, { result: 'ok' }, msg.callback);
            }

            break;
        }

        case 'addNotification':
            await notificationHandler.addMessage(
                msg.message.scope,
                msg.message.category,
                msg.message.message,
                msg.message.instance
            );
            if (msg.callback && msg.from) {
                sendTo(msg.from, msg.command, { result: 'ok' }, msg.callback);
            }
            break;

        case 'clearNotifications':
            await notificationHandler.clearNotifications(msg.message.scope, msg.message.category, msg.message.instance);
            if (msg.callback && msg.from) {
                sendTo(msg.from, msg.command, { result: 'ok' }, msg.callback);
            }
            break;

        case 'getNotifications':
            if (msg.callback && msg.from) {
                const notificationsObj = notificationHandler.getFilteredInformation(
                    msg.message.scope,
                    msg.message.category,
                    msg.message.instance
                );
                sendTo(msg.from, msg.command, { result: notificationsObj }, msg.callback);
            }
            break;

        case 'certsUpdated': {
            // restart all instances that depends on lets encrypt, except the issuer
            const instances: string[] = [];
            Object.entries(procs).forEach(([id, proc]) => {
                if (
                    proc.config?.common?.enabled && // if enabled
                    proc.config.common.mode === 'daemon' && // if constantly running
                    proc.config.native?.leEnabled && // if using letsencrypt
                    !proc.config.native.leUpdate && // if not updating certs itself
                    (!msg.message || msg.message.instance !== id)
                ) {
                    // and it not the issuer
                    // restart this instance, because letsencrypt updated
                    instances.push(id);
                }
            });

            // @ts-expect-error ts not knows that these are instance ids
            restartInstances(instances);

            break;
        }

        // read licenses from iobroker.net
        case 'updateLicenses': {
            try {
                const licenses = await tools.updateLicenses(
                    objects,
                    msg.message && msg.message.login,
                    msg.message && msg.message.password
                );
                logger.info(
                    `${hostLogPrefix} Received ${licenses.length} licenses: "${licenses
                        .map(l => l.product)
                        .join(', ')}"`
                );
                msg.callback && msg.from && sendTo(msg.from, msg.command, { result: licenses }, msg.callback);
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot read licenses: ${e.message}`);

                msg.callback &&
                    msg.from &&
                    sendTo(msg.from, msg.command, { result: [], error: e.message }, msg.callback);
            }
            break;
        }

        case 'restartController': {
            msg.callback && sendTo(msg.from, msg.command, '', msg.callback);
            setTimeout(() => restart(() => !isStopping && stop(false)), 200); // let the answer be sent
            break;
        }
    }
}

// restart given instances sequentially
function restartInstances(instances: ioBroker.ObjectIDs.Instance[], cb?: () => void): void {
    if (!instances || !instances.length) {
        cb && cb();
    } else {
        const id = instances.shift()!;
        logger.info(
            `${hostLogPrefix} instance "${id}" restarted because the "let's encrypt" certificates were updated`
        );
        stopInstance(id, false, () => {
            startInstance(id);
            setTimeout(() => restartInstances(instances, cb), 3_000);
        });
    }
}

async function getInstances() {
    const instances = await tools.getInstancesOrderedByStartPrio(objects, logger, hostLogPrefix);

    if (instances.length === 0) {
        logger.info(`${hostLogPrefix} no instances found`);
    } else {
        const _ipArr = tools.findIPs();
        if (!compactGroupController) {
            logger.info(`${hostLogPrefix} ${instances.length} instance${instances.length === 1 ? '' : 's'} found`);
        }
        let count = 0;

        // first mark all instances as disabled to detect disabled once
        for (const proc of Object.values(procs)) {
            if (proc.config?.common?.enabled) {
                proc.config.common.enabled = false;
            }
        }

        for (const instance of instances) {
            // register all common fields, that may not be deleted, like "mobile" or "history"
            if (instance.common.preserveSettings) {
                objects!.addPreserveSettings(instance.common.preserveSettings);
            }

            // @ts-expect-error is mode web valid, it is not in schema
            if (instance.common.mode === 'web' || instance.common.mode === 'none') {
                if (instance.common.host === hostname) {
                    const name = instance._id.split('.')[2];
                    const adapterDir = tools.getAdapterDir(name);
                    if (!fs.existsSync(adapterDir!)) {
                        procs[instance._id] = { downloadRetry: 0, config: { common: { enabled: false } } };
                        installQueue.push({
                            id: instance._id,
                            disabled: true,
                            version: instance.common.installedVersion || instance.common.version,
                            installedFrom: instance.common.installedFrom
                        });
                        // start install queue if not started
                        installQueue.length === 1 && installAdapters();
                    }
                }
                continue;
            }

            logger.debug(`${hostLogPrefix} check instance "${instance._id}" for host "${instance.common.host}"`);
            console.log(`${hostLogPrefix} check instance "${instance._id}" for host "${instance.common.host}"`);

            if (
                checkAndAddInstance(instance, _ipArr) &&
                instance.common.enabled &&
                (instance.common.mode !== 'extension' || !instance.native.webInstance)
            ) {
                count++;
            }
        }

        if (count > 0) {
            logger.info(`${hostLogPrefix} starting ${count} instance${count > 1 ? 's' : ''}`);
        } else {
            logger.warn(`${hostLogPrefix} does not start any instances on this host`);
        }
    }

    initInstances();
}

/**
 * Checks if an instance is relevant for this host to be considered or not
 * @param instance Object of the instance
 * @param _ipArr IP-Array from this host
 * @returns true if instance needs to be handled by this host else false
 */
function instanceRelevantForThisController(instance: ioBroker.InstanceObject, _ipArr: string[]): boolean {
    // Normalize Compact group configuration
    if (config.system.compact && instance.common.compact) {
        if (instance.common.runAsCompactMode === undefined) {
            instance.common.runAsCompactMode = false;
        } // TODO repo logic!! -> someone can further specify this comment?
        if (instance.common.compactGroup === undefined) {
            instance.common.compactGroup = 1;
        } // run in controller by default
    }

    if (compactGroupController) {
        if (!config.system.compact || !instance.common.compact || !instance.common.runAsCompactMode) {
            return false;
        }
        if (instance.common.runAsCompactMode && instance.common.compactGroup !== compactGroup) {
            return false;
        }
    }
    return true;
}

/**
 * Check if an instance is handled by this host process and initialize internal data structures
 * @param instance instance object
 * @param ipArr IP-Array from this host
 * @returns true if instance needs to be handled by this host (true) or not
 */
function checkAndAddInstance(instance: ioBroker.InstanceObject, ipArr: string[]): boolean {
    if (!ipArr.includes(instance.common.host) && instance.common.host && instance.common.host !== hostname) {
        return false;
    }
    // @ts-expect-error todo who does this? legacy or still needed?
    if (instance.deleted) {
        return false;
    }

    // update host name to current host if host name is empty
    if (!instance.common.host) {
        instance.common.host = hostname;
        objects!.setObject(instance._id, instance, err =>
            err
                ? logger.error(`${hostLogPrefix} Cannot update hostname for ${instance._id}: ${err.message}`)
                : logger.info(`${hostLogPrefix} Set hostname ${hostname} for ${instance._id}`)
        );
    }

    hostAdapter[instance._id] = hostAdapter[instance._id] || {};
    if (!hostAdapter[instance._id].config) {
        hostAdapter[instance._id].config = deepClone(instance);
    }

    if (!instanceRelevantForThisController(instance, ipArr)) {
        return false;
    }

    if (config.system.compact && instance.common.compact) {
        if (instance.common.runAsCompactMode) {
            // @ts-expect-error we need types if this can exist
            compactProcs[instance.common.compactGroup] = compactProcs[instance.common.compactGroup] || {
                instances: []
            };
        }
    }

    if (compactGroupController) {
        logger.debug(`${hostLogPrefix} instance ${instance._id} is managed by this controller`);
    }
    procs[instance._id] = procs[instance._id] || {};
    if (!procs[instance._id].config) {
        procs[instance._id].config = deepClone(instance);
    }
    return true;
}

function initInstances() {
    let seconds = 0;
    const interval = (config.system && config.system.instanceStartInterval) || 2_000;

    // Start first admin
    for (const [id, proc] of Object.entries(procs)) {
        if (
            proc.config.common.enabled &&
            (proc.config.common.mode !== 'extension' || !proc.config.native.webInstance)
        ) {
            if (id.startsWith('system.adapter.admin')) {
                // do not process if still running. It will be started when old one will be finished
                if (proc.process) {
                    logger.info(`${hostLogPrefix} instance "${id}" was not started, because running.`);
                    continue;
                }
                if (!installQueue.find(obj => obj.id === id)) {
                    if (proc.restartTimer) {
                        clearTimeout(proc.restartTimer);
                    }
                    // @ts-expect-error tell ts it is an instance id
                    proc.restartTimer = setTimeout(_id => startInstance(_id), interval * seconds, id);

                    seconds += 2; // 4 seconds pause between starts
                }
            }
        } else if (procs[id].process) {
            // stop instance if disabled
            stopInstance(id, false);
        }
    }

    for (const [id, proc] of Object.entries(procs)) {
        if (
            proc.config.common.enabled &&
            (proc.config.common.mode !== 'extension' || !proc.config.native.webInstance)
        ) {
            if (!id.startsWith('system.adapter.admin')) {
                // do not process if still running. It will be started when old one will be finished
                if (proc.process) {
                    logger.info(`${hostLogPrefix} instance "${id}" was not started, because already running.`);
                    continue;
                }

                if (!installQueue.find(obj => obj.id === id)) {
                    if (proc.restartTimer) {
                        clearTimeout(proc.restartTimer);
                    }
                    // @ts-expect-error tell ts it is an instance id
                    proc.restartTimer = setTimeout(_id => startInstance(_id), interval * seconds, id);

                    if (!proc.config.common.onlyWWW) {
                        seconds += 2; // 4 seconds pause between starts if not only www files
                    }
                }
            }
        } else {
            const name = id.split('.')[2];
            const adapterDir = tools.getAdapterDir(name);
            if (!fs.existsSync(adapterDir!)) {
                proc.downloadRetry = proc.downloadRetry || 0;
                installQueue.push({
                    // @ts-expect-error ts not knows that these are instance ids
                    id: id,
                    disabled: true,
                    version: proc.config.common.installedVersion || proc.config.common.version,
                    installedFrom: proc.config.common.installedFrom
                });
                // start install queue if not started
                installQueue.length === 1 && installAdapters();
            }
        }
    }
}

/**
 * Chceks if at least one of the instances of given name satisfies the version
 *
 * @param name - name of the dependency
 * @param version - version requirement, e.g. ">=3.3.0"
 * @param instances - object of instances and their corresponding instance objects
 * @throws
 */
function checkVersion(name: string, version: string, instances: Record<string, ioBroker.InstanceObject>) {
    let isFound = false;

    if (name === 'js-controller') {
        // Check only version
        if (version) {
            if (!semver.satisfies(ioPackage.common.version, version, { includePrerelease: true })) {
                throw new Error(
                    `Invalid version of "${name}". Installed "${ioPackage.common.version}", required "${version}"`
                );
            } else {
                isFound = true;
            }
        } else {
            isFound = true;
        }
    }

    if (!isFound) {
        // get all instances of this adapter
        const filteredInst = Object.keys(instances).filter(
            p => instances[p] && instances[p].common && instances[p].common.name === name
        );
        for (const inst of filteredInst) {
            if (version && !semver.satisfies(instances[inst].common.version, version, { includePrerelease: true })) {
                throw new Error(
                    `required adapter "${name}" has wrong version. Installed "${instances[inst].common.version}", required "${version}"!`
                );
            }
            isFound = true;
        }
    }

    if (!isFound) {
        throw new Error(`required adapter "${name}" not found!`);
    }
}

/**
 * Chceks if alle dependencies of an adapter are satisfied
 *
 * @param id - instance id of the requiring instance (only used for logging)
 * @param deps - same host dependencies as defined in io-pack
 * @param globalDeps - global dependencies, as defined in io-pack
 */
async function checkVersions(id: string, deps: Dependencies, globalDeps: Dependencies) {
    const res = await objects!.getObjectViewAsync('system', 'instance', {
        startkey: 'system.adapter.',
        endkey: 'system.adapter.\u9999'
    });
    const instances: Record<string, ioBroker.InstanceObject> = {};
    const globInstances: Record<string, ioBroker.InstanceObject> = {};
    if (res && res.rows) {
        res.rows.forEach(item => {
            if (!item.value._id) {
                return;
            }
            globInstances[item.value._id] = item.value;
        });
        Object.keys(globInstances).forEach(id => {
            if (globInstances[id]?.common && globInstances[id].common.host === hostname) {
                instances[id] = globInstances[id];
            }
        });
    }

    // this ensures we have a real object with correct structure
    deps = tools.parseDependencies(deps);
    globalDeps = tools.parseDependencies(globalDeps);

    // check local dependencies: required adapter must be installed on the same host
    try {
        for (const dep of Object.keys(deps)) {
            checkVersion(dep, deps[dep], instances);
        }
    } catch (e) {
        logger.debug(`${hostLogPrefix} ${id} [sameHostDependency]: ${JSON.stringify(deps)}`);
        throw new Error(`Adapter dependency not fulfilled on "${hostname}": ${e.message}`);
    }

    // check global dependencies: required adapter must be NOT installed on the same host
    try {
        for (const gDep of Object.keys(globalDeps)) {
            checkVersion(gDep, globalDeps[gDep], globInstances);
        }
    } catch (e) {
        logger.debug(`${hostLogPrefix} ${id} [globalDependency]: ${JSON.stringify(globalDeps)}`);
        throw new Error(`Adapter dependency not fulfilled on any host: ${e.message}`);
    }
}

// Store process IDS to make possible kill them all by restart
function storePids(): void {
    if (!storeTimer) {
        storeTimer = setTimeout(() => {
            storeTimer = null;
            const pids = [];
            for (const id of Object.keys(procs)) {
                const proc = procs[id];

                if (proc.process?.pid && !proc.startedAsCompactGroup) {
                    pids.push(proc.process.pid);
                }
            }
            for (const id of Object.keys(compactProcs)) {
                const compactProc = compactProcs[id];

                if (compactProc.process?.pid) {
                    pids.push(compactProc.process.pid);
                }
            }
            pids.push(process.pid);
            try {
                fs.writeFileSync(`${controllerDir}/pids.txt`, JSON.stringify(pids));
            } catch (err) {
                logger.error(
                    `${hostLogPrefix} could not store process id list in ${controllerDir}/pids.txt! Please check permissions and user ownership of this file. Was ioBroker started as a different user? Please also check left over processes when stopping ioBroker!\n${err}`
                );
                logger.error(`${hostLogPrefix} Please consider running the installation fixer when on Linux.`);
            }
        }, 1000);
    }
}

function installAdapters() {
    if (!installQueue.length) {
        return;
    }

    const task = installQueue[0];
    if (task.inProgress) {
        return;
    }
    let name = task.id.split('.')[2];
    if (task.version && !task.rebuild) {
        name += `@${task.version}`;
    }

    const commandScope = task.rebuild ? 'rebuild' : 'install';
    if (compactGroupController && !task.rebuild) {
        logger.info(
            `${hostLogPrefix} adapter ${name} is not installed, installation will be handled by main controller ... waiting `
        );
        setImmediate(() => {
            installQueue.shift();
            installAdapters();
        });
        return;
    }

    const proc = procs[task.id];
    proc.downloadRetry = proc.downloadRetry ?? 0;

    if (proc?.downloadRetry < 4) {
        proc.downloadRetry++;

        if (task.rebuild) {
            logger.warn(
                `${hostLogPrefix} adapter "${name}" seems to be installed for a different version of Node.js. Trying to rebuild it... ${
                    procs[task.id].rebuildCounter
                } attempt`
            );
        } else {
            logger.warn(
                `${hostLogPrefix} startInstance cannot find adapter "${name}". Try to install it... ${proc.downloadRetry} attempt`
            );
        }

        const installArgs = [];
        const installOptions = { windowsHide: true };
        if (!task.rebuild && task.installedFrom && proc.downloadRetry < 3) {
            // two tries with installed location, afterwards we try normal npm version install
            if (tools.isShortGithubUrl(task.installedFrom) || task.installedFrom.includes('://')) {
                // Installing from URL supports raw http(s) and file URLs as well as the short GitHub URL format
                installArgs.push('url');
                installArgs.push(task.installedFrom);
                installArgs.push(task.id.split('.')[2]); // adapter name
            } else {
                installArgs.push('install');
                let installedFrom = task.installedFrom;
                if (installedFrom.startsWith(`${tools.appName}.`)) {
                    installedFrom = installedFrom.substring(tools.appName.length + 1);
                }
                installArgs.push(installedFrom);
            }
        } else {
            installArgs.push(commandScope);
            if (!task.rebuild) {
                installArgs.push(name);
            } else if (task.rebuildArgs) {
                installArgs.push(`${task.rebuildArgs.module}@${task.rebuildArgs.version}`);
                if (task.rebuildArgs.path) {
                    installArgs.push('--path');
                    installArgs.push(task.rebuildArgs.path);
                }
            }
        }
        logger.info(
            `${hostLogPrefix} ${tools.appName} ${installArgs.join(' ')}${
                task.rebuild
                    ? ''
                    : ` using ${proc.downloadRetry < 3 && task.installedFrom ? 'installedFrom' : 'installedVersion'}`
            }`
        );
        installArgs.unshift(`${__dirname}/${tools.appName}.js`);

        try {
            task.inProgress = true;
            const child = spawn('node', installArgs, installOptions);
            if (child.stdout) {
                child.stdout.on('data', data => {
                    data = data.toString().replace(/\n/g, '');
                    logger.info(`${hostLogPrefix} ${tools.appName} npm-${commandScope}: ${data}`);
                });
            }
            if (child.stderr) {
                child.stderr.on('data', data => {
                    data = data.toString().replace(/\n/g, '');
                    logger.error(`${hostLogPrefix} ${tools.appName} npm-${commandScope}: ${data}`);
                });
            }

            child.on('exit', exitCode => {
                logger.info(`${hostLogPrefix} ${tools.appName} npm-${commandScope}: exit ${exitCode}`);
                if (exitCode === EXIT_CODES.CANNOT_INSTALL_NPM_PACKET) {
                    task.inProgress = false;
                    // Move task to the end of the queue to try again (up to 3 times)
                    installQueue.shift();
                    installQueue.push(task);
                } else {
                    const finishTask = (task: InstallQueueEntry) => {
                        if (procs[task.id]) {
                            procs[task.id].needsRebuild = false;
                            if (!task.disabled) {
                                if (!procs[task.id].config.common.enabled) {
                                    logger.info(
                                        `${hostLogPrefix} startInstance ${task.id}: instance is disabled but should be started, re-enabling it`
                                    );
                                    states!.setState(`${task.id}.alive`, {
                                        val: true,
                                        ack: false,
                                        from: hostObjectPrefix
                                    });
                                } else if (task.rebuild) {
                                    // on rebuild we send a restart signal via object change to also reach compact group processes
                                    objects!.extendObject(task.id, {});
                                } else {
                                    startInstance(task.id, task.wakeUp);
                                }
                            } else {
                                logger.debug(
                                    `${hostLogPrefix} ${tools.appName} ${commandScope} successful but the instance is disabled`
                                );
                            }
                        }
                    };
                    if (task.rebuild) {
                        // This was a rebuild - find all tasks that required a rebuild and "finish" them (including the current one)
                        // Since we rebuild globally now, they should all be done too.
                        const rebuildTasks = installQueue.filter(t => t.rebuild);
                        // Remove all rebuild tasks from the queue
                        installQueue = installQueue.filter(t => !t.rebuild);
                        rebuildTasks.forEach(t => finishTask(t));
                    } else {
                        installQueue.shift();
                        finishTask(task);
                    }
                }

                setTimeout(() => installAdapters(), 1000);
            });
            child.on('error', err => {
                logger.error(
                    `${hostLogPrefix} Cannot execute "${__dirname}/${tools.appName}.js ${commandScope} ${name}: ${err.message}`
                );
                setTimeout(() => {
                    installQueue.shift();
                    installAdapters();
                }, 1000);
            });
        } catch (err) {
            logger.error(
                `${hostLogPrefix} Cannot execute "${__dirname}/${tools.appName}.js ${commandScope} ${name}: ${err}`
            );
            setTimeout(() => {
                installQueue.shift();
                installAdapters();
            }, 1000);
        }
    } else {
        if (task.rebuild) {
            logger.error(
                `${hostLogPrefix} Cannot rebuild adapter "${name}". To retry it disable/enable the adapter or restart host. Also check the error messages in the log or execute "npm install --production" in adapter directory manually!`
            );
        } else {
            logger.error(
                `${hostLogPrefix} Cannot download and install adapter "${name}". To retry it disable/enable the adapter or restart host. Also check the error messages in the log!`
            );
        }
        setTimeout(() => {
            installQueue.shift();
            installAdapters();
        }, 500);
    }
}

function cleanErrors(procObj: Process, now: number | null, doOutput?: boolean): void {
    if (!procObj || !procObj.errors || !procObj.errors.length || procObj.startedAsCompactGroup) {
        return;
    }

    now = now || Date.now();

    if (!doOutput && procObj.lastCleanErrors && now - procObj.lastCleanErrors < 1_000) {
        return;
    }

    procObj.lastCleanErrors = now;

    // output of errors into log
    if (doOutput) {
        for (let i = 0; i < procObj.errors.length; i++) {
            if (procObj.errors[i] && now - procObj.errors[i].ts < 30000 && procObj.errors[i].text) {
                const lines = procObj.errors[i].text
                    .replace('\x1B[31merror\x1B[39m:', '')
                    .replace('\x1B[34mdebug\x1B[39m:', 'debug:')
                    .split('\n');
                for (let k = 0; k < lines.length; k++) {
                    if (lines[k]) {
                        logger.error(`${hostLogPrefix} Caught by controller[${i}]: ${lines[k]}`);
                    }
                }
            }
        }
        procObj.errors = [];
    } else {
        // delete to old errors
        for (let e = procObj.errors.length - 1; e >= 0; e--) {
            if (now - procObj.errors[e].ts > 30000) {
                procObj.errors.splice(0, e);
                break;
            }
        }
    }
}

function startScheduledInstance(callback?: () => void): void {
    const idsToStart = Object.keys(scheduledInstances);
    if (!idsToStart.length) {
        callback && callback();
        return;
    }
    let skipped = false;
    const id = idsToStart[0];
    const { adapterDir, fileNameFull, wakeUp } = scheduledInstances[idsToStart[0]];

    const processNextScheduledInstance = () => {
        let delay = (config.system && config.system.instanceStartInterval) || 2000;
        delay = skipped ? 0 : delay + 2_000;
        setTimeout(() => {
            delete scheduledInstances[id];
            startScheduledInstance(callback);
        }, delay); // 4 seconds pause
    };

    const proc = procs[id];

    if (proc) {
        const instance = proc.config;

        // After sleep of PC all scheduled runs come together. There is no need to run it X times in one second. Just the last.
        if (!proc.lastStart || Date.now() - proc.lastStart >= 2_000) {
            // Remember the last run
            proc.lastStart = Date.now();
            if (!proc.process) {
                // reset sigKill to 0 if it was set to an other value from "once run"
                states!.setState(`${instance._id}.sigKill`, { val: 0, ack: false, from: hostObjectPrefix }, () => {
                    const args = [instance._id.split('.').pop(), instance.common.loglevel || 'info'];
                    try {
                        proc.process = cp.fork(fileNameFull, args, {
                            execArgv: tools.getDefaultNodeArgs(fileNameFull),
                            // @ts-expect-error missing from types but we already tested it is needed
                            windowsHide: true,
                            cwd: adapterDir
                        });
                    } catch (err) {
                        logger.error(`${hostLogPrefix} instance ${id} could not be started: ${err.message}`);
                        delete proc.process;
                    }
                    if (proc.process) {
                        storePids(); // Store all pids to make possible kill them all
                        logger.info(`${hostLogPrefix} instance ${instance._id} started with pid ${proc.process.pid}`);

                        proc.process.on('exit', (code, signal) => {
                            outputCount++;
                            states!.setState(`${id}.alive`, { val: false, ack: true, from: hostObjectPrefix });
                            if (signal) {
                                logger.warn(`${hostLogPrefix} instance ${id} terminated due to ${signal}`);
                            } else if (code === null) {
                                logger.error(`${hostLogPrefix} instance ${id} terminated abnormally`);
                            } else {
                                const text = `${hostLogPrefix} instance ${id} terminated with code ${code} (${
                                    getErrorText(code) || ''
                                })`;
                                if (
                                    !code ||
                                    code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION ||
                                    code === EXIT_CODES.NO_ERROR
                                ) {
                                    logger.info(text);
                                } else {
                                    logger.error(text);
                                }
                            }
                            if (proc?.process) {
                                delete proc.process;
                            }
                            storePids(); // Store all pids to make possible kill them all
                        });
                    }

                    processNextScheduledInstance();
                });
                return;
            } else {
                !wakeUp &&
                    logger.warn(
                        `${hostLogPrefix} instance ${instance._id} already running with pid ${proc.process.pid}`
                    );
                skipped = true;
            }
        } else {
            logger.warn(`${hostLogPrefix} instance ${instance._id} does not started, because just executed`);
            skipped = true;
        }
    } else {
        logger.error(`${hostLogPrefix} scheduleJob: Task deleted (${id})`);
        skipped = true;
    }

    processNextScheduledInstance();
}

/**
 * Start given instance
 * @param id - id of instance, like 'system.adapter.hm-rpc.0'
 * @param wakeUp
 */
async function startInstance(id: ioBroker.ObjectIDs.Instance, wakeUp = false): Promise<void> {
    if (isStopping || !connected) {
        return;
    }

    const proc = procs[id];

    if (!proc) {
        logger.error(`${hostLogPrefix} startInstance ${id}: object not found!`);
        return;
    }

    const instance = proc.config;
    const name = id.split('.')[2];
    let mode = instance.common.mode;

    if (proc.restartTimer) {
        clearTimeout(proc.restartTimer);
        delete proc.restartTimer;
    }

    proc.restartExpected = false;

    if (wakeUp) {
        mode = 'daemon';
    }

    //noinspection JSUnresolvedVariable
    if (instance.common.wakeup) {
        // TODO
    }

    // Check if all required adapters installed and have valid version
    if (instance.common.dependencies || instance.common.globalDependencies) {
        try {
            await checkVersions(id, instance.common.dependencies, instance.common.globalDependencies);
        } catch (e) {
            logger.error(`${hostLogPrefix} startInstance ${id} ${e.message}`);
            // Do not start this instance
            return;
        }
    }

    const adapterDir = tools.getAdapterDir(name);
    if (!fs.existsSync(adapterDir!)) {
        proc.downloadRetry = proc.downloadRetry || 0;
        logger.debug(`${hostLogPrefix} startInstance Queue ${id} for installation`);
        installQueue.push({
            id,
            version: instance.common.installedVersion || instance.common.version,
            installedFrom: instance.common.installedFrom,
            wakeUp
        });
        // start install queue if not started
        if (installQueue.length === 1) {
            installAdapters();
        }
        return;
    }

    const args =
        instance && instance._id && instance.common
            ? [instance._id.split('.').pop(), instance.common.loglevel || 'info']
            : [0, 'info'];

    // define memory limit for adapter
    //noinspection JSUnresolvedVariable
    if (instance.common.memoryLimitMB && parseInt(instance.common.memoryLimitMB, 10)) {
        //noinspection JSUnresolvedVariable
        args.push(`--max-old-space-size=${parseInt(instance.common.memoryLimitMB, 10)}`);
    }

    // workaround for old vis
    if (instance.common.onlyWWW && name === 'vis') {
        instance.common.onlyWWW = false;
    }

    // www-only adapters have no start file
    if (instance.common.onlyWWW) {
        logger.debug(`${hostLogPrefix} startInstance ${name}.${args[0]} only WWW files. Nothing to start`);
        return;
    }

    let adapterMainFile: string;
    // Web extensions have a separate field for the main file. We don't need to search it in that case
    if (instance.common.mode !== 'extension') {
        try {
            adapterMainFile = await tools.resolveAdapterMainFile(name);
        } catch {
            logger.error(`${hostLogPrefix} startInstance ${name}.${args[0]}: cannot find start file!`);
            return;
        }
    }

    proc.downloadRetry = 0;

    // read node.js engine requirements
    try {
        // read directly from disk and not via require to allow "on the fly" updates of adapters.
        const packJSON = fs.readJSONSync(`${adapterDir}/package.json`);
        proc.engine = packJSON?.engines?.node;
    } catch {
        logger.error(
            `${hostLogPrefix} startInstance ${name}.${args[0]}: Cannot read and parse "${adapterDir}/package.json"`
        );
    }

    // check node.js version if defined in package.json
    if (proc.engine) {
        if (!semver.satisfies(process.version.replace(/^v/, ''), proc.engine)) {
            logger.warn(
                `${hostLogPrefix} startInstance ${name}.${args[0]}: required Node.js version ${proc.engine}, actual version ${process.version}`
            );
            // disable instance
            objects!.getObject(id, (err, obj) => {
                if (obj && obj.common && obj.common.enabled) {
                    obj.common.enabled = false;
                    objects!.setObject(obj._id, obj, _err =>
                        logger.warn(
                            `${hostLogPrefix} startInstance ${name}.${args[0]}: instance disabled because of Node.js version mismatch`
                        )
                    );
                }
            });
            return;
        }
    }

    // check how much memory is left and log a warning error/if its critical
    let availableMemMB;

    if (fs.existsSync('/proc/meminfo')) {
        // on linux we read mem available
        try {
            const text = fs.readFileSync('/proc/meminfo', 'utf8');
            const m = text && text.match(/MemAvailable:\s*(\d+)/);
            if (m && m[1]) {
                availableMemMB = Math.round(parseInt(m[1], 10) * 0.001024); // convert to MB
            }
        } catch (err) {
            logger.warn(`${hostLogPrefix} Cannot read /proc/meminfo: ${err}`);
        }
    } else {
        // else just use freemem
        availableMemMB = Math.round(os.freemem() / 1048576); // convert to MB
    }

    // default: if less than 100 MB log warning, less than 50 MB log error, but check config first
    if (
        availableMemMB !== undefined &&
        availableMemMB < (typeof config.system.memLimitWarn === 'number' ? config.system.memLimitWarn : 100)
    ) {
        if (availableMemMB < (typeof config.system.memLimitError === 'number' ? config.system.memLimitError : 50)) {
            logger.error(
                `${hostLogPrefix} Your system has only ${availableMemMB} MB RAM left available and an additional adapter process is started. Please check your system, settings and active instances to prevent swapping and Out-Of-Memory situations!`
            );
            logger.error(`${hostLogPrefix} In future versions, the adapter might not be started!`);
        } else {
            logger.warn(
                `${hostLogPrefix} Your system has only ${availableMemMB} MB RAM left available and an additional adapter process is started. Please check your system, settings and active instances to prevent swapping and Out-Of-Memory situations!`
            );
        }

        // add it to notifications for popup
        try {
            await notificationHandler.addMessage(
                'system',
                'memIssues',
                `Your system has only ${availableMemMB} MB RAM left available and an additional adapter process is started. Please check your system, settings and active instances to prevent swapping and Out-Of-Memory situations!`,
                `system.host.${hostname}`
            );
        } catch (e) {
            logger.warn(`${hostLogPrefix} Could not add OOM notification: ${e.message}`);
        }
    }

    //noinspection JSUnresolvedVariable
    if (instance.common.subscribe || instance.common.wakeup) {
        proc.subscribe = instance.common.subscribe || `${instance._id}.wakeup`;
        const parts = instance._id.split('.');
        const instanceId = parts[parts.length - 1];
        proc.subscribe = proc.subscribe!.replace('<INSTANCE>', instanceId);

        if (subscribe[proc.subscribe]) {
            if (!subscribe[proc.subscribe].includes(id)) {
                subscribe[proc.subscribe].push(id);
            }
        } else {
            subscribe[proc.subscribe] = [id];

            // Subscribe on changes
            if (proc.subscribe.startsWith('messagebox.')) {
                states!.subscribeMessage(proc.subscribe.substring('messagebox.'.length));
            } else {
                states!.subscribe(proc.subscribe);
            }
        }
    }

    proc.startedInCompactMode = false;
    proc.startedAsCompactGroup = false;

    if (proc.config?.notifications) {
        try {
            await notificationHandler.addConfig(proc.config.notifications);
            logger.debug(`${hostLogPrefix} added notifications configuration of ${id}`);
        } catch (e) {
            logger.error(`${hostLogPrefix} Could not add notifications config of ${id}: ${e.message}`);
        }
    }

    switch (mode) {
        case 'once':
        case 'daemon':
            if (proc && !proc.process) {
                allInstancesStopped = false;
                if (proc.stopping) {
                    delete proc.stopping;
                }

                logger.debug(
                    `${hostLogPrefix} startInstance ${name}.${args[0]} loglevel=${args[1]}, compact=${
                        instance.common.compact && instance.common.runAsCompactMode
                            ? `true (${instance.common.compactGroup})`
                            : 'false'
                    }`
                );
                // Exit Handler for normal Adapters started as own processes
                const exitHandler = (code: number, signal: string) => {
                    outputCount += 2;
                    states!.setState(`${id}.alive`, { val: false, ack: true, from: hostObjectPrefix });
                    states!.setState(`${id}.connected`, { val: false, ack: true, from: hostObjectPrefix });

                    // if we have waiting kill timeouts from stopInstance clear them
                    // and call callback because process ended now
                    const stopTimeout = stopTimeouts[id];
                    if (stopTimeout?.timeout) {
                        clearTimeout(stopTimeout.timeout);
                        stopTimeout.timeout = null;
                        if (stopTimeout.callback && typeof stopTimeout.callback === 'function') {
                            stopTimeout.callback();
                            stopTimeout.callback = null;
                        }
                    }

                    cleanAutoSubscribes(id, async () => {
                        const proc = procs[id];
                        if (proc?.config?.common.logTransporter) {
                            outputCount++;
                            console.log(
                                `================================== > LOG REDIRECT ${id} => false [Process stopped]`
                            );
                            states!.setState(`${id}.logging`, { val: false, ack: true, from: hostObjectPrefix });
                        }

                        // show stored errors
                        cleanErrors(
                            proc,
                            null,
                            code !== EXIT_CODES.START_IMMEDIATELY_AFTER_STOP &&
                                code !== EXIT_CODES.ADAPTER_REQUESTED_TERMINATION
                        );

                        if (mode !== 'once') {
                            if (signal) {
                                logger.warn(`${hostLogPrefix} instance ${id} terminated due to ${signal}`);
                            } else if (code === null) {
                                logger.error(`${hostLogPrefix} instance ${id} terminated abnormally`);
                            }

                            if (proc?.stopping || isStopping || wakeUp) {
                                logger.info(
                                    `${hostLogPrefix} instance ${id} terminated with code ${code} (${
                                        getErrorText(code) || ''
                                    })`
                                );

                                if (proc) {
                                    if (proc.stopping !== undefined) {
                                        delete proc.stopping;
                                    }

                                    if (proc.process) {
                                        delete proc.process;
                                    }
                                }

                                if (isStopping) {
                                    logger.silly(`${hostLogPrefix} Check Stopping ${id}`);
                                    for (const proc of Object.values(procs)) {
                                        if (proc.process) {
                                            logger.silly(`${hostLogPrefix} ${proc.config.common.name} still running`);
                                            return;
                                        }
                                    }
                                    for (const [i, compactProc] of Object.entries(compactProcs)) {
                                        if (compactProc.process) {
                                            logger.silly(`${hostLogPrefix} Compact group ${i} still running`);
                                            return;
                                        }
                                    }
                                    logger.info(`${hostLogPrefix} All instances are stopped.`);
                                    allInstancesStopped = true;
                                }
                                storePids(); // Store all pids to make possible kill them all
                                return;
                            } else {
                                //noinspection JSUnresolvedVariable
                                if (code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION && proc?.restartExpected) {
                                    logger.info(`${hostLogPrefix} instance ${id} terminated for restart.`);
                                } else if (code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION) {
                                    logger.info(
                                        `${hostLogPrefix} instance ${id} terminated by request of the instance itself and will not be restarted, before user restarts it.`
                                    );
                                } else if (
                                    code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP &&
                                    proc?.config?.common.restartSchedule
                                ) {
                                    logger.info(
                                        `${hostLogPrefix} instance ${id} scheduled normal terminated and will be restarted on schedule.`
                                    );
                                } else if (code === EXIT_CODES.ADAPTER_REQUESTED_REBUILD && proc) {
                                    logger.info(
                                        `${hostLogPrefix} instance ${id} requested a rebuild of its dependencies and will be restarted after that is done.`
                                    );
                                    proc.needsRebuild = true;
                                } else {
                                    const text = `${hostLogPrefix} instance ${id} terminated with code ${code} (${
                                        getErrorText(code) || ''
                                    })`;
                                    if (
                                        !code ||
                                        code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION ||
                                        code === EXIT_CODES.NO_ERROR ||
                                        code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP
                                    ) {
                                        logger.info(text);
                                    } else {
                                        logger.error(text);
                                    }
                                }
                            }
                        }

                        if (proc?.process) {
                            delete proc.process;
                        }

                        if (proc?.needsRebuild) {
                            proc.rebuildCounter = proc.rebuildCounter ?? 0;
                            proc.rebuildCounter++;
                            if (proc.rebuildCounter < 4) {
                                logger.info(
                                    `${hostLogPrefix} Adapter ${id} needs rebuild ${
                                        proc.rebuildArgs ? `of ${proc.rebuildArgs.module} ` : ''
                                    }and will be restarted afterwards.`
                                );
                                const msg: Record<string, any> = {
                                    command: 'rebuildAdapter',
                                    message: { id: instance._id }
                                };

                                // if rebuild args are given, send them
                                if (proc.rebuildArgs) {
                                    msg.message.rebuildArgs = proc.rebuildArgs;
                                    delete proc.rebuildArgs;
                                }

                                if (!compactGroupController) {
                                    // execute directly
                                    processMessage(msg as any);
                                } else {
                                    // send to main controller to make sure only one npm process runs at a time
                                    sendTo(`system.host.${hostname}`, 'rebuildAdapter', msg);
                                }
                            } else {
                                logger.info(
                                    `${hostLogPrefix} Rebuild for adapter ${id} not successful in 3 tries. Adapter will not be restarted again. Please execute "npm install --production" in adapter directory manually.`
                                );
                            }
                        } else {
                            if (proc) {
                                proc.rebuildCounter = 0;
                            }
                            if (
                                code !== EXIT_CODES.ADAPTER_REQUESTED_TERMINATION &&
                                !wakeUp &&
                                connected &&
                                !isStopping &&
                                proc?.config?.common.enabled &&
                                (mode !== 'extension' || !proc.config.native.webInstance) &&
                                mode !== 'once'
                            ) {
                                if (code === EXIT_CODES.UNCAUGHT_EXCEPTION) {
                                    // if its an uncaught exception, detect restart loop
                                    proc.crashCount = proc.crashCount ?? 0;
                                    proc.crashCount++;
                                    logger.debug(`${hostLogPrefix} Crash count of ${id}: ${proc.crashCount}`);

                                    if (proc.crashResetTimer) {
                                        logger.debug(
                                            `${hostLogPrefix} Reset crash timer of ${id}, to be initialized anew`
                                        );
                                        clearTimeout(proc.crashResetTimer);
                                    }

                                    // after 10 minutes without crash, we reset counter
                                    logger.debug(`${hostLogPrefix} Initialize crash timer of ${id}`);
                                    proc.crashResetTimer = setTimeout(() => {
                                        logger.debug(
                                            `${hostLogPrefix} Cleared crash counter of ${id}, because 10 minutes no crash`
                                        );
                                        // check that process id still exists - could be moved to another host
                                        if (proc) {
                                            proc.crashCount = 0;
                                        }
                                    }, 1_000 * 600);
                                } else {
                                    // reset crash count and timer because non-crash exit
                                    logger.debug(`${hostLogPrefix} Reset crash count of ${id}, because non-crash exit`);
                                    proc.crashCount = 0;
                                    if (proc.crashResetTimer) {
                                        logger.debug(
                                            `${hostLogPrefix} Cleared crash timer of ${id}, because non-crash exit`
                                        );
                                        clearTimeout(proc.crashResetTimer);
                                        delete proc.crashResetTimer;
                                    }
                                }

                                logger.info(`${hostLogPrefix} Restart adapter ${id} because enabled`);

                                const restartTimerExisting = !!proc.restartTimer;
                                //noinspection JSUnresolvedVariable
                                if (proc.restartTimer) {
                                    clearTimeout(proc.restartTimer);
                                }

                                if (!proc.crashCount || proc.crashCount < 3) {
                                    proc.restartTimer = setTimeout(
                                        _id => startInstance(_id),
                                        code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP
                                            ? 1_000
                                            : proc.config.common.restartSchedule || restartTimerExisting
                                            ? 1_000
                                            : 30_000,
                                        id
                                    );
                                    // 156 is special code that adapter wants itself to be restarted immediately
                                } else {
                                    // 3 crashes - do not restart anymore
                                    logger.warn(
                                        `${hostLogPrefix} Do not restart adapter ${id} because restart loop detected`
                                    );
                                    await notificationHandler.addMessage(
                                        'system',
                                        'restartLoop',
                                        'Restart loop detected',
                                        id
                                    );
                                    proc.crashCount = 0;
                                    if (proc.crashResetTimer) {
                                        logger.debug(
                                            `${hostLogPrefix} Cleared crash timer of ${id}, because adapter stopped`
                                        );
                                        clearTimeout(proc.crashResetTimer);
                                        delete proc.crashResetTimer;
                                    }
                                }
                            } else {
                                if (code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION && proc && proc.restartExpected) {
                                    logger.info(`${hostLogPrefix} Adapter ${id} will be restarted automatically`);
                                } else if (code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION) {
                                    logger.info(
                                        `${hostLogPrefix} Do not restart adapter ${id} because desired by instance`
                                    );
                                } else if (mode !== 'once') {
                                    logger.info(
                                        `${hostLogPrefix} Do not restart adapter ${id} because disabled or deleted`
                                    );
                                } else {
                                    logger.info(
                                        `${hostLogPrefix} instance ${id} terminated while should be started once`
                                    );
                                }
                            }
                        }

                        storePids(); // Store all pids to make possible kill them all
                    });
                };

                // Some parts of the Adapter start logic are async, so "the finalization" is put into this method
                const handleAdapterProcessStart = () => {
                    const proc = procs[id];

                    if (!proc) {
                        return;
                    }

                    if (!proc.process) {
                        // We were not able or should not start as compact mode
                        try {
                            proc.process = cp.fork(adapterMainFile, args, {
                                execArgv: tools.getDefaultNodeArgs(adapterMainFile),
                                stdio: ['ignore', 'ignore', 'pipe', 'ipc'],
                                // @ts-expect-error missing from types but we already tested it is needed
                                windowsHide: true,
                                cwd: adapterDir!
                            });
                        } catch (err) {
                            logger.error(`${hostLogPrefix} instance ${instance._id} could not be started: ${err}`);
                        }
                    }

                    if (!proc.startedInCompactMode && !proc.startedAsCompactGroup && proc.process) {
                        states!.setState(`${id}.sigKill`, {
                            val: proc.process.pid,
                            ack: true,
                            from: hostObjectPrefix
                        });
                    }

                    // catch error output
                    if (!proc.startedInCompactMode && !proc.startedAsCompactGroup && proc.process?.stderr) {
                        proc.process.stderr.on('data', data => {
                            const proc = procs[id];

                            if (!data || !proc || typeof proc !== 'object') {
                                return;
                            }
                            const text = data.toString();

                            // show for debug
                            console.error(text);
                            if (
                                text.includes('NODE_MODULE_VERSION') ||
                                text.includes('npm rebuild') ||
                                text.includes("Error: The module '") ||
                                text.includes('Could not locate the bindings file.') ||
                                text.includes('Cannot find module')
                            ) {
                                // only try this at second rebuild
                                if (proc.rebuildCounter === 1) {
                                    proc.rebuildArgs = _determineRebuildArgsFromLog(text);
                                }
                                proc.needsRebuild = true;
                            }
                            proc.errors = proc.errors || [];
                            const now = Date.now();
                            proc.errors.push({ ts: now, text: text });
                            // limit output to 300 messages
                            if (proc.errors.length > 300) {
                                proc.errors.splice(proc.errors.length - 300);
                            }
                            cleanErrors(proc, now);
                        });
                    }

                    storePids(); // Store all pids to make possible kill them all

                    if (!proc.startedInCompactMode && !proc.startedAsCompactGroup && proc.process) {
                        proc.process.on('exit', exitHandler);
                    }

                    if (
                        !wakeUp &&
                        proc?.process &&
                        proc.config.common?.enabled &&
                        (proc.config.common.mode !== 'extension' || !proc.config.native.webInstance) &&
                        mode !== 'once'
                    ) {
                        if (proc.startedInCompactMode) {
                            logger.info(`${hostLogPrefix} instance ${instance._id} started in COMPACT mode`);
                        } else if (proc.startedAsCompactGroup) {
                            logger.info(
                                `${hostLogPrefix} instance ${instance._id} is handled by compact group controller pid ${proc.process.pid}`
                            );
                        } else {
                            logger.info(
                                `${hostLogPrefix} instance ${instance._id} started with pid ${proc.process.pid}`
                            );
                        }
                    }
                };

                // If system has compact mode enabled and adapter supports it and instance has it enabled
                if (config.system.compact && instance.common.compact && instance.common.runAsCompactMode) {
                    // compactgroup = 0 is executed by main js.controller, all others as own processes
                    if (
                        (!compactGroupController && instance.common.compactGroup === 0) ||
                        (compactGroupController && instance.common.compactGroup !== 0)
                    ) {
                        // set to 0 to stop any pot. already running instances, especially broken compactModes
                        states!.setState(`${id}.sigKill`, { val: 0, ack: false, from: hostObjectPrefix }, async () => {
                            const proc = procs[id];
                            const _instance =
                                instance && instance._id && instance.common ? instance._id.split('.').pop() || 0 : 0;
                            const logLevel =
                                instance && instance._id && instance.common
                                    ? instance.common.loglevel || 'info'
                                    : 'info';
                            if (adapterMainFile) {
                                try {
                                    decache(adapterMainFile);

                                    // Prior to requiring the main file make sure that the esbuild require hook was loaded
                                    // if this is a TypeScript adapter
                                    if (adapterMainFile.endsWith('.ts')) {
                                        require('@alcalzone/esbuild-register');
                                    }

                                    proc.process = {
                                        // @ts-expect-error todo add types for ts adapter procs
                                        logic: (await import(adapterMainFile))({
                                            logLevel,
                                            compactInstance: _instance,
                                            compact: true
                                        })
                                    };

                                    // @ts-expect-error todo add types for ts adapter procs
                                    proc.process.logic.on('exit', exitHandler);

                                    proc.startedInCompactMode = true;
                                } catch (e) {
                                    logger.error(
                                        `${hostLogPrefix} Cannot start ${name}.${_instance} in compact mode. Fallback to normal start! : ${e.message}`
                                    );
                                    logger.error(e.stackTrace);
                                    if (proc.process) {
                                        delete proc.process;
                                    }
                                    states!.setState(`${id}.sigKill`, { val: -1, ack: false, from: hostObjectPrefix }); // if started let it end itself
                                }
                            } else {
                                logger.warn(
                                    `${hostLogPrefix} Cannot start ${name}.${_instance} in compact mode: Filename invalid`
                                );
                            }

                            if (proc.process && !proc.process.kill) {
                                // @ts-expect-error todo type it somehow
                                proc.process.kill = () => {
                                    states!.setState(`${id}.sigKill`, {
                                        val: -1,
                                        ack: false,
                                        from: hostObjectPrefix
                                    });
                                };
                            }

                            handleAdapterProcessStart();
                        });
                    } else {
                        // a group controller for this group is not yet started, execute one
                        compactProcs[instance.common.compactGroup] = compactProcs[instance.common.compactGroup] || {
                            instances: []
                        };

                        const compactProc = compactProcs[instance.common.compactGroup];
                        if (!compactProc.process) {
                            const compactControllerArgs = [instance.common.compactGroup];

                            //noinspection JSUnresolvedVariable
                            if (instance.common.memoryLimitMB && parseInt(instance.common.memoryLimitMB, 10)) {
                                //noinspection JSUnresolvedVariable
                                compactControllerArgs.push(
                                    '--max-old-space-size=' + parseInt(instance.common.memoryLimitMB, 10)
                                );
                            }

                            logger.info(
                                `${hostLogPrefix} start controller for compactgroup ${instance.common.compactGroup}`
                            );

                            try {
                                compactProc.process = cp.fork(
                                    path.join(__dirname, 'compactgroupController.js'),
                                    compactControllerArgs,
                                    {
                                        stdio: ['ignore', 'ignore', 'pipe', 'ipc'],
                                        // @ts-expect-error missing from types but we already tested it is needed
                                        windowsHide: true
                                    }
                                );
                            } catch (err) {
                                delete compactProc.process;
                                logger.info(
                                    `${hostLogPrefix} controller for compactgroup ${instance.common.compactGroup} could not be started: ${err}`
                                );
                            }

                            if (compactProc.process) {
                                if (compactProc.process.stderr) {
                                    compactProc.process.stderr.on('data', data => {
                                        const compactProc = compactProcs[instance.common.compactGroup];
                                        if (!data || !compactProc || typeof compactProc !== 'object') {
                                            return;
                                        }
                                        const text = data.toString();
                                        // show for debug
                                        console.error(text);
                                        compactProc.errors = compactProc.errors || [];
                                        const now = Date.now();
                                        compactProc.errors.push({ ts: now, text: text });
                                        // limit output to 300 messages
                                        if (compactProc.errors.length > 300) {
                                            compactProc.errors.splice(compactProc.errors.length - 300);
                                        }
                                        cleanErrors(compactProc, now);
                                    });
                                }

                                const currentCompactGroup = instance.common.compactGroup;
                                // Exit handler for compact groups
                                const groupExitHandler = (code: number, signal: string) => {
                                    if (signal) {
                                        logger.warn(
                                            `${hostLogPrefix} compactgroup controller ${currentCompactGroup} terminated due to ${signal}`
                                        );
                                    } else if (code !== null) {
                                        logger.info(
                                            `${hostLogPrefix} compactgroup controller ${currentCompactGroup} terminated with code ${code} (${
                                                getErrorText(code) || ''
                                            })`
                                        );
                                    } else {
                                        logger.info(
                                            `${hostLogPrefix} compactgroup controller ${currentCompactGroup} terminated`
                                        );
                                    }

                                    if (
                                        compactProcs[currentCompactGroup] &&
                                        compactProcs[currentCompactGroup].process
                                    ) {
                                        delete compactProcs[currentCompactGroup].process;
                                    }

                                    function markCompactInstancesAsStopped(
                                        instances: ioBroker.ObjectIDs.Instance[],
                                        callback: () => void
                                    ): void {
                                        if (!instances.length) {
                                            callback && callback();
                                            return;
                                        }

                                        const id = instances.shift()!;
                                        outputCount += 2;
                                        states!.setState(`${id}.alive`, {
                                            val: false,
                                            ack: true,
                                            from: hostObjectPrefix
                                        });
                                        states!.setState(`${id}.connected`, {
                                            val: false,
                                            ack: true,
                                            from: hostObjectPrefix
                                        });

                                        cleanAutoSubscribes(id, () => {
                                            const proc = procs[id];

                                            if (proc?.stopping || isStopping) {
                                                if (proc?.stopping !== undefined) {
                                                    delete proc.stopping;
                                                }
                                            }

                                            if (proc?.process) {
                                                delete proc.process;
                                            }

                                            markCompactInstancesAsStopped(instances, callback);
                                        });
                                    }

                                    // mark all instances that should be handled by this controller also as not running.
                                    const killedInstances: ioBroker.ObjectIDs.Instance[] = [];
                                    compactProcs[currentCompactGroup].instances.forEach(el => killedInstances.push(el));
                                    markCompactInstancesAsStopped(killedInstances, () => {
                                        // show stored errors
                                        cleanErrors(compactProcs[currentCompactGroup], null, true);

                                        if (isStopping) {
                                            logger.silly(
                                                `${hostLogPrefix} Check after group exit ${currentCompactGroup}`
                                            );
                                            for (const proc of Object.values(procs)) {
                                                if (proc.process) {
                                                    logger.silly(
                                                        `${hostLogPrefix} ${proc.config.common.name} still running`
                                                    );
                                                    return;
                                                }
                                            }
                                            for (const [i, compactProc] of Object.entries(compactProcs)) {
                                                if (compactProc.process) {
                                                    logger.silly(
                                                        `${hostLogPrefix} Compact group ${i} still running (compact)`
                                                    );
                                                    return;
                                                }
                                            }
                                            logger.info(`${hostLogPrefix} All instances are stopped.`);
                                            allInstancesStopped = true;

                                            storePids(); // Store all pids to make possible kill them all
                                            return;
                                        }

                                        // Restart group controller because still instances assigned to him, done via startInstance
                                        if (connected && compactProcs[currentCompactGroup].instances.length) {
                                            logger.info(
                                                `${hostLogPrefix} Restart compact group controller ${currentCompactGroup}`
                                            );
                                            logger.debug(
                                                `${hostLogPrefix} Instances: ${JSON.stringify(
                                                    compactProcs[currentCompactGroup].instances
                                                )}`
                                            );

                                            compactProcs[currentCompactGroup].instances.forEach(id => {
                                                //noinspection JSUnresolvedVariable
                                                if (proc.restartTimer) {
                                                    clearTimeout(procs[id].restartTimer);
                                                }
                                                proc.restartTimer = setTimeout(
                                                    _id => startInstance(_id),
                                                    code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP
                                                        ? 1_000
                                                        : procs[id].config.common.restartSchedule
                                                        ? 1_000
                                                        : 30_000,
                                                    id
                                                );
                                                // 156 is special code that adapter wants itself to be restarted immediately
                                            });
                                        } else {
                                            logger.info(
                                                `${hostLogPrefix} Do not restart compact group controller ${currentCompactGroup} because no instances assigned to him`
                                            );
                                        }
                                        storePids(); // Store all pids to make possible kill them all
                                    });
                                };

                                compactProcs[instance.common.compactGroup].process!.on('exit', groupExitHandler);
                            }
                        }
                        if (compactProcs[instance.common.compactGroup].process) {
                            if (!compactProcs[instance.common.compactGroup].instances.includes(id)) {
                                compactProcs[instance.common.compactGroup].instances.push(id);
                            }

                            proc.process = compactProcs[instance.common.compactGroup].process;
                            proc.startedAsCompactGroup = true;
                        }
                        handleAdapterProcessStart();
                    }
                } else {
                    // set to 0 to stop any pot. already running instances, especially broken compactModes
                    states!.setState(
                        `${id}.sigKill`,
                        {
                            val: 0,
                            ack: false,
                            from: hostObjectPrefix
                        },
                        () => handleAdapterProcessStart()
                    );
                }
            } else {
                !wakeUp &&
                    proc &&
                    logger.warn(
                        `${hostLogPrefix} instance ${instance._id} ${
                            proc.stopping ? 'still' : 'already'
                        } running with pid ${proc.process!.pid}`
                    );
                if (proc.stopping) {
                    delete proc.stopping;
                }
            }
            break;

        case 'schedule':
            if (compactGroupController) {
                logger.debug(`${hostLogPrefix} ${instance._id} schedule is not started by compact group controller`);
                break;
            }
            if (!instance.common.schedule) {
                logger.error(`${hostLogPrefix} ${instance._id} schedule attribute missing`);
                break;
            }

            // cancel current schedule
            if (proc.schedule) {
                proc.schedule.cancel();
                logger.info(`${hostLogPrefix} instance canceled schedule ${instance._id}`);
            }

            proc.schedule = schedule.scheduleJob(instance.common.schedule, () => {
                // queue up, but only if not already queued
                scheduledInstances[id] = {
                    fileNameFull: adapterMainFile,
                    adapterDir,
                    wakeUp
                };
                Object.keys(scheduledInstances).length === 1 && startScheduledInstance();
            });
            logger.info(`${hostLogPrefix} instance scheduled ${instance._id} ${instance.common.schedule}`);
            // Start one time adapter by start or if configuration changed
            //noinspection JSUnresolvedVariable
            if (instance.common.allowInit) {
                try {
                    // @ts-expect-error if mode !== extension we have ensured it exists
                    proc.process = cp.fork(adapterMainFile, args, {
                        // @ts-expect-error if mode !== extension we have ensured it exists
                        execArgv: tools.getDefaultNodeArgs(adapterMainFile),
                        // @ts-expect-error missing from types but we already tested it is needed
                        windowsHide: true,
                        cwd: adapterDir!
                    });
                } catch (err) {
                    logger.info(`${hostLogPrefix} instance ${instance._id} could not be started: ${err}`);
                }
                if (proc.process) {
                    storePids(); // Store all pids to make possible kill them all
                    logger.info(`${hostLogPrefix} instance ${instance._id} started with pid ${proc.process.pid}`);

                    proc.process.on('exit', (code, signal) => {
                        cleanAutoSubscribes(id, () => {
                            const proc = procs[id];

                            outputCount++;
                            states!.setState(`${id}.alive`, { val: false, ack: true, from: hostObjectPrefix });
                            if (signal) {
                                logger.warn(`${hostLogPrefix} instance ${id} terminated due to ${signal}`);
                            } else if (code === null) {
                                logger.error(`${hostLogPrefix} instance ${id} terminated abnormally`);
                            } else {
                                const text = `${hostLogPrefix} instance ${id} terminated with code ${code} (${
                                    getErrorText(code) || ''
                                })`;
                                if (
                                    !code ||
                                    code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION ||
                                    code === EXIT_CODES.NO_ERROR
                                ) {
                                    logger.info(text);
                                } else {
                                    logger.error(text);
                                }
                            }
                            if (proc) {
                                delete proc.process;
                            }
                            storePids(); // Store all pids to make possible kill them all
                        });
                    });
                }
            }

            break;

        case 'extension':
        case 'subscribe':
            break;

        default:
            logger.error(`${hostLogPrefix} ${instance._id} invalid mode`);
    }
}

function stopInstance(id: string, force: boolean, callback?: (() => void) | null): void {
    const proc = procs[id];

    if (!proc) {
        logger.warn(`${hostLogPrefix} stopInstance unknown instance ${id}`);
        return void (typeof callback === 'function' && callback());
    }

    logger.info(
        `${hostLogPrefix} stopInstance ${id} (force=${force}, process=${procs[id].process ? 'true' : 'false'})`
    );

    const instance = proc.config;
    if (!instance || !instance.common || !instance.common.mode) {
        if (proc.process) {
            proc.stopping = true;
            if (!proc.startedAsCompactGroup) {
                try {
                    proc.process.kill(); // call stop directly in adapter.js or call kill of process
                } catch (e) {
                    logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                }
            }
            delete proc.process;
        }

        if (proc.schedule) {
            proc.schedule.cancel();
            delete proc.schedule;
        }

        if (proc.subscribe) {
            // Remove this id from subscribed on this message
            if (subscribe[proc.subscribe] && subscribe[proc.subscribe].includes(id as any)) {
                subscribe[proc.subscribe].splice(subscribe[proc.subscribe].indexOf(id as any), 1);

                // If no one subscribed
                if (!subscribe[proc.subscribe].length) {
                    // Delete item
                    delete subscribe[proc.subscribe];

                    // Unsubscribe
                    if (proc.subscribe.startsWith('messagebox.')) {
                        states!.unsubscribeMessage(proc.subscribe.substring('messagebox.'.length));
                    } else {
                        states!.unsubscribe(proc.subscribe);
                    }
                }
            }
        }
        return void (typeof callback === 'function' && callback());
    }

    const stopTimeout = stopTimeouts[id] || {};
    stopTimeouts[id] = stopTimeout;
    if (stopTimeout.timeout) {
        clearTimeout(stopTimeout.timeout);
        stopTimeout.timeout = null;
    }

    switch (instance.common.mode) {
        case 'daemon':
            if (!proc.process) {
                if (proc.config?.common.enabled && !proc.startedAsCompactGroup) {
                    !isStopping && logger.warn(`${hostLogPrefix} stopInstance ${instance._id} not running`);
                }
                typeof callback === 'function' && callback();
            } else {
                if (force && !proc.startedAsCompactGroup) {
                    logger.info(`${hostLogPrefix} stopInstance forced ${instance._id} killing pid ${proc.process.pid}`);
                    proc.stopping = true;
                    try {
                        proc.process.kill(); // call stop directly in adapter.js or call kill of process
                    } catch (e) {
                        logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                    }
                    delete proc.process;

                    if (typeof callback === 'function') {
                        callback();
                        callback = null;
                    }
                } else if (instance.common.messagebox && instance.common.supportStopInstance) {
                    // Send to adapter signal "stopInstance" because on some systems SIGTERM does not work
                    sendTo(instance._id, 'stopInstance', null, result => {
                        const stopTimeout = stopTimeouts[id];
                        if (stopTimeout?.timeout) {
                            clearTimeout(stopTimeout.timeout);
                            stopTimeout.timeout = null;
                        }
                        logger.info(
                            `${hostLogPrefix} stopInstance self ${instance._id} killing pid ${
                                proc.process ? proc.process.pid : 'undefined'
                            }${result ? ': ' + result : ''}`
                        );
                        if (proc.process && !proc.startedAsCompactGroup) {
                            proc.stopping = true;
                            try {
                                proc.process.kill(); // call stop directly in adapter.js or call kill of process
                            } catch (e) {
                                logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                            }
                            delete proc.process;
                        }

                        if (typeof stopTimeout?.callback === 'function') {
                            stopTimeout.callback();
                            stopTimeout.callback = null;
                        }
                    });

                    const timeoutDuration =
                        instance.common.supportStopInstance === true
                            ? 1_000
                            : instance.common.supportStopInstance || 1_000;
                    // If no response from adapter, kill it in 1 second
                    stopTimeout.callback = callback;
                    stopTimeout.timeout = setTimeout(() => {
                        const stopTimeout = stopTimeouts[id];
                        const proc = procs[id];

                        if (stopTimeout) {
                            stopTimeout.timeout = null;
                        }
                        if (proc && proc.process && !proc.startedAsCompactGroup) {
                            logger.info(
                                `${hostLogPrefix} stopInstance timeout ${timeoutDuration} ${instance._id} killing pid  ${proc.process.pid}`
                            );
                            proc.stopping = true;
                            try {
                                proc.process.kill(); // call stop directly in adapter.js or call kill of process
                            } catch (e) {
                                logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                            }
                            delete proc.process;
                        } else if (!compactGroupController && proc && proc.process) {
                            // was compact mode in an other group
                            delete proc.process; // we consider that the other group controler managed to stop it
                        }
                        if (stopTimeout && typeof stopTimeout.callback === 'function') {
                            stopTimeout.callback();
                            stopTimeout.callback = null;
                        }
                    }, timeoutDuration);
                } else if (!proc.startedAsCompactGroup) {
                    states!.setState(`${id}.sigKill`, { val: -1, ack: false, from: hostObjectPrefix }, err => {
                        // send kill signal
                        logger.info(`${hostLogPrefix} stopInstance ${instance._id} send kill signal`);
                        const proc = procs[id];
                        const stopTimeout = stopTimeouts[id];

                        if (!err) {
                            if (proc) {
                                proc.stopping = true;
                            }
                            if (typeof callback === 'function') {
                                callback();
                                callback = null;
                            }
                        }
                        const timeoutDuration = instance.common.stopTimeout || 1000;
                        // If no response from adapter, kill it in 1 second
                        stopTimeout.callback = callback;
                        stopTimeout.timeout = setTimeout(() => {
                            const proc = procs[id];
                            const stopTimeout = stopTimeouts[id];

                            if (stopTimeout) {
                                stopTimeout.timeout = null;
                            }

                            if (proc?.process && !proc.startedAsCompactGroup) {
                                logger.info(
                                    `${hostLogPrefix} stopInstance ${instance._id} killing pid ${proc.process.pid}`
                                );
                                proc.stopping = true;
                                try {
                                    proc.process.kill(); // call stop directly in adapter.js or call kill of process
                                } catch (e) {
                                    logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                                }
                                delete proc.process;
                            }
                            if (stopTimeout && typeof stopTimeout.callback === 'function') {
                                stopTimeout.callback();
                                stopTimeout.callback = null;
                            }
                        }, timeoutDuration);
                    }); // if started let it end itself as first try
                } else {
                    if (proc) {
                        delete proc.process;
                    }
                    if (typeof callback === 'function') {
                        callback();
                        callback = null;
                    }
                }
            }
            break;

        case 'schedule':
            if (!proc.schedule) {
                !isStopping && logger.debug(`${hostLogPrefix} stopInstance ${instance._id} not scheduled`);
            } else {
                proc.schedule.cancel();
                delete proc.schedule;
                if (scheduledInstances[id]) {
                    delete scheduledInstances[id];
                }
                logger.info(`${hostLogPrefix} stopInstance canceled schedule ${instance._id}`);
            }
            if (typeof callback === 'function') {
                callback();
                callback = null;
            }
            break;

        case 'subscribe':
            if (proc.subscribe) {
                // Remove this id from subscribed on this message
                if (subscribe[proc.subscribe] && subscribe[proc.subscribe].includes(id as any)) {
                    subscribe[proc.subscribe].splice(subscribe[proc.subscribe].indexOf(id as any), 1);

                    // If no one subscribed
                    if (!subscribe[proc.subscribe].length) {
                        // Delete item
                        delete subscribe[proc.subscribe];

                        // Unsubscribe
                        if (proc.subscribe.startsWith('messagebox.')) {
                            states!.unsubscribeMessage(proc.subscribe.substring('messagebox.'.length));
                        } else {
                            states!.unsubscribe(proc.subscribe);
                        }
                    }
                }
            }

            if (!proc.process) {
                typeof callback === 'function' && callback();
            } else {
                logger.info(`${hostLogPrefix} stopInstance ${instance._id} killing pid ${proc.process.pid}`);
                proc.stopping = true;
                try {
                    proc.process.kill(); // call stop directly in adapter.js
                } catch (e) {
                    logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                }
                delete proc.process;
                if (typeof callback === 'function') {
                    callback();
                    callback = null;
                }
            }
            break;

        default:
    }
}

function stopInstances(forceStop: boolean, callback?: ((wasForced?: boolean) => void) | null) {
    let maxTimeout: NodeJS.Timeout | null | undefined;
    let waitTimeout: NodeJS.Timeout | null | undefined;

    function waitForInstances() {
        waitTimeout = null;
        if (!allInstancesStopped) {
            waitTimeout = setTimeout(waitForInstances, 200);
        } else {
            if (maxTimeout) {
                clearTimeout(maxTimeout);
            }
            typeof callback === 'function' && callback();
            callback = null;
        }
    }

    try {
        isStopping = isStopping || Date.now(); // Sometimes process receives SIGTERM twice
        const elapsed = Date.now() - isStopping;
        logger.debug(
            `${hostLogPrefix} stop isStopping=${elapsed} isDaemon=${isDaemon} allInstancesStopped=${allInstancesStopped}`
        );
        if (elapsed >= stopTimeout) {
            if (maxTimeout) {
                clearTimeout(maxTimeout);
            }
            typeof callback === 'function' && callback(true);
            callback = null;
        }

        for (const id of Object.keys(procs)) {
            stopInstance(id, forceStop); // sends kill signal via sigKill state or a kill after timeouts or if forced
        }
        if (forceStop || isDaemon) {
            // send instances SIGTERM, only needed if running in background (isDaemon)
            // or slave lost connection to master
            for (const id of Object.keys(compactProcs)) {
                const proc = compactProcs[id];

                if (proc.process) {
                    proc.process.kill();
                }
            }
            if (forceStop) {
                allInstancesStopped = true;
            }
        }

        waitForInstances();
    } catch (e) {
        logger.error(`${hostLogPrefix} ${e.message}`);
        if (maxTimeout) {
            clearTimeout(maxTimeout);
        }
        if (waitTimeout) {
            clearTimeout(waitTimeout);
        }
        typeof callback === 'function' && callback();
        callback = null;
    }

    // force after Xs
    maxTimeout = setTimeout(() => {
        maxTimeout = null;
        if (waitTimeout) {
            clearTimeout(waitTimeout);
        }
        typeof callback === 'function' && callback(true);
        callback = null;
    }, stopTimeout);
}

/**
 * Stops the js-controller and all running adapter instances, if no cb provided pids.txt will be deleted and process exit will be called
 *
 * @param force kills instances under all circumstances
 * @param callback callback function
 */
function stop(force?: boolean, callback?: () => void) {
    if (force === undefined) {
        force = false;
    }
    if (mhService) {
        mhService.close();
        mhService = null;
    }

    if (primaryHostInterval) {
        clearInterval(primaryHostInterval);
        primaryHostInterval = null;
    }

    if (updateIPsTimer) {
        clearInterval(updateIPsTimer);
        updateIPsTimer = null;
    }

    if (reportInterval) {
        clearInterval(reportInterval);
        reportInterval = null;
    }

    if (isStopping) {
        return;
    }

    stopInstances(force, async wasForced => {
        pluginHandler.destroyAll();
        notificationHandler && notificationHandler.storeNotifications();

        try {
            // if we are the host we should now let someone else take over
            if (isPrimary) {
                await objects!.releasePrimaryHost();
                isPrimary = false;
            }
        } catch {
            // ignore
        }

        if (objects && objects.destroy) {
            await objects.destroy();
        }

        if (!states || force) {
            logger.info(
                `${hostLogPrefix} ${
                    wasForced ? 'force terminating' : 'terminated'
                }. Could not reset alive status for instances`
            );
            if (typeof callback === 'function') {
                return void callback();
            } else {
                setTimeout(() => process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED), 1000);
            }
            return;
        }
        outputCount++;
        try {
            await states.setStateAsync(`${hostObjectPrefix}.alive`, { val: false, ack: true, from: hostObjectPrefix });
            await states.setStateAsync(`${hostObjectPrefix}.pid`, { val: null, ack: true, from: hostObjectPrefix });
        } catch {
            // ignore
        }
        logger.info(`${hostLogPrefix} ${wasForced ? 'force terminating' : 'terminated'}`);
        if (wasForced) {
            for (const i of Object.keys(procs)) {
                if (procs[i].process) {
                    if (procs[i].config && procs[i].config.common && procs[i].config.common.name) {
                        logger.info(`${hostLogPrefix} Adapter ${procs[i].config.common.name} still running`);
                    }
                }
            }
            for (const i of Object.keys(compactProcs)) {
                if (compactProcs[i].process) {
                    logger.info(`${hostLogPrefix} Compact group controller ${i} still running`);
                }
            }
        }
        states && states.destroy && (await states.destroy());

        if (typeof callback === 'function') {
            return void callback();
        } else {
            setTimeout(() => {
                try {
                    // avoid pids been written after deletion
                    if (storeTimer) {
                        clearTimeout(storeTimer);
                    }
                    // delete pids.txt
                    fs.unlinkSync(path.join(controllerDir, 'pids.txt'));
                } catch (e) {
                    if (e.code !== 'ENOENT') {
                        logger.error(`${hostLogPrefix} Could not delete ${path.join(controllerDir, 'pids.txt')}: ${e}`);
                    }
                }
                process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED);
            }, 1000);
        }
    });
}

// bootstrap
function init(compactGroupId?: number): void {
    if (compactGroupId) {
        compactGroupController = true;
        compactGroup = compactGroupId;

        hostObjectPrefix += compactGroupObjectPrefix + compactGroup;
        hostLogPrefix += compactGroupObjectPrefix + compactGroup;
        title += compactGroupObjectPrefix + compactGroup;

        isDaemon = true;
    } else {
        stopTimeout += 5_000;
    }

    // If bootstrap file detected, it must be deleted, but give time for bootstrap process to use this file
    if (fs.existsSync(VENDOR_BOOTSTRAP_FILE)) {
        setTimeout(() => {
            try {
                if (fs.existsSync(VENDOR_BOOTSTRAP_FILE)) {
                    fs.unlinkSync(VENDOR_BOOTSTRAP_FILE);
                    logger && logger.info(`${hostLogPrefix} Deleted ${VENDOR_BOOTSTRAP_FILE}`);
                }
            } catch (e) {
                logger && logger.error(`${hostLogPrefix} Cannot delete ${VENDOR_BOOTSTRAP_FILE}: ${e.message}`);
            }
        }, 30_000);
    }

    process.title = title;

    // Get "objects" object
    // If "file" and on the local machine
    if (dbTools.isLocalObjectsDbServer(config.objects.type, config.objects.host) && !compactGroupController) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        Objects = require(`@iobroker/db-objects-${config.objects.type}`).Server;
    } else {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        Objects = require('@iobroker/js-controller-common-db').getObjectsConstructor();
    }

    // Get "states" object
    if (dbTools.isLocalStatesDbServer(config.states.type, config.states.host) && !compactGroupController) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        States = require(`@iobroker/db-states-${config.states.type}`).Server;
    } else {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        States = require('@iobroker/js-controller-common-db').getStatesConstructor();
    }

    // Detect if outputs to console are forced. By default they are disabled and redirected to log file
    if (
        config.log.noStdout &&
        process.argv &&
        (process.argv.indexOf('--console') !== -1 || process.argv.indexOf('--logs') !== -1)
    ) {
        config.log.noStdout = false;
    }

    // Detect if controller runs as a linux-daemon
    if (process.argv.indexOf('start') !== -1 && !compactGroupController) {
        isDaemon = true;
        config.log.noStdout = true;
    }

    try {
        logger = toolsLogger(config.log);
    } catch (e) {
        if (e.code === 'EACCES_LOG') {
            // We could not access logging directory - e.g. because of restored backup
            console.error(`Could not access logging directory "${e.path}", fallback to default`);

            // read a fresh config to avoid overwriting e.g. noStdout
            const _config = getConfig();
            // persist the config to be fixed permanently
            const configFile = tools.getConfigFileName();
            const fixedLogPath = 'log/iobroker';
            _config.log.transport.file1.filename = fixedLogPath;
            fs.writeFileSync(configFile, JSON.stringify(_config, null, 2));

            // fix this run
            config.log.transport.file1.filename = fixedLogPath;
            // @ts-expect-error TODO: correct way to apply config?
            logger = toolsLogger.logger(config.log);

            logger.warn(
                `${hostLogPrefix} Your logging path "${e.path}" was invalid, it has been changed to "${fixedLogPath}"`
            );
        } else {
            // without logger multiple things will have undefined behavior and probably more is wrong -> do not start
            console.error(`Error initializing logger: ${e.stack}`);
            process.exit(EXIT_CODES.UNKNOWN_ERROR);
        }
    }

    if (!compactGroupController) {
        // Delete all log files older than x days
        // @ts-expect-error we have augmented winston instance with this method
        logger.activateDateChecker(true, config.log.maxDays);
    }

    // find our notifier transport
    // @ts-expect-error types do not seem to be perfect here
    const ts = logger.transports.find(t => t.name === 'NT');
    ts!.on('logged', info => {
        info.from = hostLogPrefix;
        for (let i = 0; i < logList.length; i++) {
            states!.pushLog(logList[i], info);
        }
    });

    if (!compactGroupController) {
        logger.info(
            `${hostLogPrefix} ${tools.appName}.js-controller version ${version} ${ioPackage.common.name} starting`
        );
        logger.info(`${hostLogPrefix} Copyright (c) 2014-2022 bluefox, 2014 hobbyquaker`);
        logger.info(`${hostLogPrefix} hostname: ${hostname}, node: ${process.version}`);
        logger.info(`${hostLogPrefix} ip addresses: ${tools.findIPs().join(' ')}`);

        // create package.json for npm >= 3.x if not exists
        if (
            controllerDir
                .replace(/\\/g, '/')
                .toLowerCase()
                .includes('/node_modules/' + title.toLowerCase())
        ) {
            try {
                if (!fs.existsSync(`${controllerDir}/../../package.json`)) {
                    fs.writeFileSync(
                        `${controllerDir}/../../package.json`,
                        JSON.stringify(
                            {
                                name: 'iobroker.core',
                                version: '1.0.0',
                                private: true
                            },
                            null,
                            2
                        )
                    );
                } else {
                    // npm3 requires version attribute
                    const p = fs.readJSONSync(`${controllerDir}/../../package.json`);
                    if (!p.version) {
                        fs.writeFileSync(
                            `${controllerDir}/../../package.json`,
                            JSON.stringify(
                                {
                                    name: 'iobroker.core',
                                    version: '1.0.0',
                                    private: true
                                },
                                null,
                                2
                            )
                        );
                    }
                }
            } catch (e) {
                console.error(`Cannot create "${controllerDir}/../../package.json": ${e}`);
            }
        }
    } else {
        logger.info(
            `${hostLogPrefix} ${tools.appName}.js-controller version ${version} ${ioPackage.common.name} starting`
        );
    }

    let packageJson;
    try {
        packageJson = fs.readJSONSync(`${controllerDir}/package.json`);
    } catch {
        logger.error(`${hostLogPrefix} Can not read js-controller package.json`);
    }

    if (packageJson && packageJson.engines && packageJson.engines.node) {
        let invalidVersion;
        try {
            invalidVersion = !semver.satisfies(process.version, packageJson.engines.node);
        } catch {
            // semver could also not support the node version or something else ... failsafe
            invalidVersion = true;
        }

        if (invalidVersion) {
            logger.error(
                `${hostLogPrefix} ioBroker requires Node.js in version ${packageJson.engines.node}, you have ${process.version}`
            );
            logger.error(
                `${hostLogPrefix} Please upgrade your Node.js version. See https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten`
            );

            console.error(
                `ioBroker requires Node.js in version ${packageJson.engines.node}, you have ${process.version}`
            );
            console.error(
                'Please upgrade your Node.js version. See https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten'
            );

            process.exit(EXIT_CODES.INVALID_NODE_VERSION);
        }
    }

    const pluginSettings: PluginHandlerSettings = {
        scope: 'controller',
        namespace: hostObjectPrefix,
        logNamespace: hostLogPrefix,
        log: logger as any,
        iobrokerConfig: config,
        parentPackage: packageJson,
        controllerVersion: version
    };

    pluginHandler = new PluginHandler(pluginSettings);
    pluginHandler.addPlugins(ioPackage.common.plugins, controllerDir); // Plugins from io-package have priority over ...

    try {
        pluginHandler.addPlugins(config.plugins, controllerDir); // ... plugins from iobroker.json
    } catch (e) {
        logger.error(`${hostLogPrefix} Cannot load plugins ${JSON.stringify(config.plugins)}: ${e}`);
        console.error(`Cannot load plugins ${JSON.stringify(config.plugins)}: ${e}`);
    }

    createObjects(async () => {
        objects!.subscribe('system.adapter.*');
        // TODO: remove this backward shim if controller 4.0 is old enough
        // subscribe to host objects to detect upgrade from one of the hosts for sets migration
        objects!.subscribe('system.host.*');

        // get the current host versions
        try {
            const hostView = await objects!.getObjectViewAsync('system', 'host');
            if (hostView?.rows) {
                for (const row of hostView.rows) {
                    if (row.value && row.value.common && row.value.common.installedVersion) {
                        controllerVersions[row.id] = row.value.common.installedVersion;
                    }
                }
            }
        } catch {
            // ignore
        }

        // create states object
        createStates(async () => {
            // Subscribe for connection state of all instances
            // Disabled in 1.5.x
            // states.subscribe('*.info.connection');

            if (connectTimeout) {
                clearTimeout(connectTimeout);
                connectTimeout = null;
            }
            // Subscribe for all logging objects
            states!.subscribe('*.logging');

            // Subscribe for all logging objects
            states!.subscribe('system.adapter.*.alive');

            // set current Loglevel and subscribe for changes
            states!.setState(`${hostObjectPrefix}.logLevel`, {
                val: config.log.level,
                ack: true,
                from: hostObjectPrefix
            });
            states!.subscribe(`${hostObjectPrefix}.logLevel`);

            if (!compactGroupController) {
                try {
                    const nodeVersion = process.version.replace(/^v/, '');
                    const prevNodeVersionState = await states!.getStateAsync(`${hostObjectPrefix}.nodeVersion`);

                    if (!prevNodeVersionState || prevNodeVersionState.val !== nodeVersion) {
                        // detected a change in the nodejs version (or state non existing - upgrade from below v4)
                        logger.info(
                            `${hostLogPrefix} Node.js version has changed from ${
                                prevNodeVersionState ? prevNodeVersionState.val : 'unknown'
                            } to ${nodeVersion}`
                        );
                        if (os.platform() === 'linux') {
                            // ensure capabilities are set
                            const capabilities = ['cap_net_admin', 'cap_net_bind_service', 'cap_net_raw'];
                            await tools.setExecutableCapabilities(process.execPath, capabilities, true, true, true);
                            logger.info(
                                `${hostLogPrefix} Successfully updated capabilities "${capabilities.join(', ')}" for ${
                                    process.execPath
                                }`
                            );
                        }
                    }

                    // set current node version
                    await states!.setStateAsync(`${hostObjectPrefix}.nodeVersion`, {
                        val: nodeVersion,
                        ack: true,
                        from: hostObjectPrefix
                    });
                } catch (e) {
                    logger.warn(
                        `${hostLogPrefix} Error while trying to update capabilities after detecting new Node.js version: ${e.message}`
                    );
                }
            }

            // Read current state of all log subscribers
            states!.getKeys('*.logging', (err, keys) => {
                if (keys && keys.length) {
                    const oKeys = keys.map(id => id.replace(/\.logging$/, ''));
                    objects!.getObjects(oKeys, (err, objs) => {
                        if (!objs) {
                            return;
                        }

                        const toDelete = keys!.filter((id, i) => !objs[i]);
                        keys = keys!.filter((id, i) => objs[i]);

                        states!.getStates(keys, (err, objs) => {
                            if (objs) {
                                for (let i = 0; i < keys!.length; i++) {
                                    const obj = objs[i];
                                    if (obj) {
                                        if (obj.val === true) {
                                            logRedirect(
                                                true,
                                                keys![i]
                                                    .substring(0, keys![i].length - '.logging'.length)
                                                    .replace(/^io\./, ''),
                                                'starting'
                                            );
                                        }
                                    }
                                }
                            }
                        });
                        if (toDelete.length) {
                            toDelete.forEach(id => {
                                logger.warn(`${hostLogPrefix} logger ${id} was deleted`);
                                states!.delState(id);
                            });
                        }
                    });
                }
            });
        });
    });

    connectTimeout = setTimeout(() => {
        connectTimeout = null;
        logger.error(`${hostLogPrefix} No connection to databases possible, restart`);
        !compactGroupController &&
            processMessage({ command: 'cmdExec', message: { data: '_restart' }, from: hostObjectPrefix });
        setTimeout(() => process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED), compactGroupController ? 0 : 1_000);
    }, 30_000);

    const exceptionHandler = (err: Error) => {
        if (compactGroupController) {
            console.error(err.message);
            if (err.stack) {
                console.error(err.stack);
            }
            stop(false);
            return;
        }
        console.error(err.message);
        if (err.stack) {
            console.error(err.stack);
        }

        // If by terminating one more exception => stop immediately to break the circle
        if (uncaughtExceptionCount) {
            console.error(err.message);
            if (err.stack) {
                console.error(err.stack);
            }
            process.exit(EXIT_CODES.UNCAUGHT_EXCEPTION);
            return;
        }
        uncaughtExceptionCount++;
        if (typeof err === 'object') {
            // @ts-expect-error should be correct
            if (err.errno === 'EADDRINUSE') {
                logger.error(`${hostLogPrefix} Another instance is running or some application uses port!`);
                logger.error(`${hostLogPrefix} uncaught exception: ${err.message}`);
            } else {
                logger.error(`${hostLogPrefix} uncaught exception: ${err.message}`);
                logger.error(`${hostLogPrefix} ${err.stack}`);
            }
        } else {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            logger.error(`${hostLogPrefix} uncaught exception: ${err}`);
            // @ts-expect-error todo: can this else clause even happen
            logger.error(`${hostLogPrefix} ${err.stack}`);
        }
        stop(false);
        // Restart itself
        processMessage({ command: 'cmdExec', message: { data: '_restart' }, from: hostObjectPrefix });
    };

    process.on('SIGINT', () => {
        logger.info(`${hostLogPrefix} received SIGINT`);
        stop(false);
    });

    process.on('SIGTERM', () => {
        logger.info(`${hostLogPrefix} received SIGTERM`);
        stop(false);
    });

    process.on('uncaughtException', exceptionHandler);
    process.on('unhandledRejection', exceptionHandler);
}

/**
 * Parses out the rebuild path, name and version from an error log
 *
 * @param text - log text
 */
function _determineRebuildArgsFromLog(text: string): RebuildArgs | undefined {
    let matches;
    // Try to get path for this case after a →
    if (text.includes('Could not locate the bindings file.')) {
        matches = text.match(/→ (.+)$/gm);
        if (matches) {
            matches.shift(); // we need to remove the first element from match
        }
    }

    // else, extract rebuild path the standard way - it is always
    // between the only two single quotes
    if (!matches) {
        matches = text.match(/'.+'/g);
    }

    if (matches) {
        // We only check the first path like entry
        // remove the quotes
        let rebuildPath = matches[0].replace(/'/g, '');
        if (path.isAbsolute(rebuildPath)) {
            // we have found a module which needs rebuild - we need to find the deepest pack.json
            rebuildPath = path.dirname(rebuildPath);
            const rootDir = path.parse(process.cwd()).root;

            while (rebuildPath !== rootDir) {
                const packPath = path.join(rebuildPath, 'package.json');
                if (fs.pathExistsSync(packPath)) {
                    try {
                        const packJson = fs.readJsonSync(packPath);
                        // step outside the module dir itself
                        rebuildPath = path.join(rebuildPath, '..');

                        return { path: rebuildPath, module: packJson.name, version: packJson.version };
                    } catch (e) {
                        logger.error(`${hostLogPrefix} Could not determine rebuild arguments: ${e.message}`);
                        return;
                    }
                } else {
                    rebuildPath = path.join(rebuildPath, '..');
                }
            }
        }
    }
}

/**
 * Returns number of instances and how many of them are compact instances if compact mode is enabled
 */
async function _getNumberOfInstances(): Promise<
    { noCompactInstances: null; noInstances: null } | { noCompactInstances: number; noInstances: number }
> {
    try {
        let noCompactInstances = 0;
        const instancesView = await objects!.getObjectViewAsync('system', 'instance', {
            startkey: 'system.adapter.',
            endkey: 'system.adapter.\u9999'
        });

        const noInstances = instancesView!.rows.length;

        if (config.system.compact) {
            for (const row of instancesView!.rows) {
                const state = await states!.getStateAsync(`${row.id}.compactMode`);
                if (state && state.val) {
                    noCompactInstances++;
                }
            }
        }

        return { noInstances, noCompactInstances };
    } catch {
        return { noInstances: null, noCompactInstances: null };
    }
}

if (module === require.main) {
    // for direct calls
    init();
} else {
    // normally used for legacy compatibility and compact group support
    module.exports.init = init;
}
