import type { CLICommandOptions } from '@/lib/cli/cliCommand.js';

import fs from 'fs-extra';
import path from 'node:path';
import * as CLI from '@/lib/cli/messages.js';
import { CLICommand } from '@/lib/cli/cliCommand.js';
import { tools, EXIT_CODES } from '@iobroker/js-controller-common';
import { tools as dbTools } from '@iobroker/js-controller-common-db';
import deepClone from 'deep-clone';
import { getObjectFrom, getInstanceName, normalizeAdapterName, enumInstances } from '@/lib/cli/cliTools.js';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import os from 'node:os';
import { spawn } from 'node:child_process';
// @ts-expect-error has no types but probably no longer needed as start/stop commands are no longer handled from this code
import daemonize2 from 'daemonize2';

// The root of this project. Change this when moving code to another directory
const rootDir = tools.getControllerDir();
const killAllScriptPath = path.join(rootDir, 'killall.sh');

export class CLIProcess extends CLICommand {
    constructor(options: CLICommandOptions) {
        super(options);
    }

    // These CLI commands have no subcommands, but belong together thematically
    // (start/stop/restart/status)

    /**
     * Starts one or more adapters or the js-controller
     *
     * @param args parsed cli arguments
     */
    start(args: any[]): void {
        const adapterName = normalizeAdapterName(args[0]);
        if (!adapterName) {
            this.startJSController();
        } else if (adapterName === 'all') {
            this.setAllAdaptersEnabled(true);
        } else if (/\.\d+$/.test(adapterName)) {
            this.setAdapterInstanceEnabled(adapterName, true);
        } else {
            this.setAdapterEnabled(adapterName, true);
        }
    }

    /**
     * Restarts one or more instances or the js-controller
     *
     * @param args parsed cli arguments
     */
    restart(args: any[]): void {
        const adapterName = normalizeAdapterName(args[0]);
        if (!adapterName) {
            this.restartJSController();
        } else if (/\.\d+$/.test(adapterName)) {
            this.setAdapterInstanceEnabled(adapterName, true, /* restartIfRunning */ true);
        } else {
            this.setAdapterEnabled(adapterName, true, /* restartIfRunning */ true);
        }
    }

    /**
     * Stops one or more adapters or the js-controller
     *
     * @param args parsed cli arguments
     */
    stop(args: any[]): void {
        const adapterName = normalizeAdapterName(args[0]);
        if (adapterName === undefined) {
            this.stopJSController();
        } else if (adapterName === 'all') {
            this.setAllAdaptersEnabled(false);
        } else if (/\.\d+$/.test(adapterName)) {
            this.setAdapterInstanceEnabled(adapterName, false);
        } else {
            this.setAdapterEnabled(adapterName, false);
        }
    }

    /**
     * Starts or stops all adapters
     *
     * @param enabled if adapters should be started or stopped
     */
    setAllAdaptersEnabled(enabled: boolean): void {
        const { callback, dbConnect } = this.options;
        dbConnect(async params => {
            const { objects } = params;
            // Enumerate all adapter instances
            const instances = await tools.getInstancesOrderedByStartPrio(objects, console);
            // Create a promise for each. setInstanceEnabled only starts/stops when necessary
            const instancePromises = instances
                .filter(obj => obj.common.enabled !== enabled)
                .map(obj => setInstanceEnabled(objects, obj, enabled));
            // wait for all instances to be started/stopped
            await Promise.all(instancePromises);
            callback();
        });
    }

    /**
     * Starts or stops a single or all instances of adapter.
     * If there are multiple instances all will be started/stopped/restarted
     *
     * @param adapter The adapter to start
     * @param enabled If adapter should be started or stopped
     * @param [restartIfRunning] Whether running instances should be restarted
     */
    setAdapterEnabled(adapter: string, enabled: boolean, restartIfRunning?: boolean): void {
        const { callback, dbConnect } = this.options;
        dbConnect(async params => {
            const { objects } = params;

            try {
                // Enumerate all adapter instances
                const adapterInstances = await enumInstances(objects, adapter);
                if (adapterInstances.length === 0) {
                    CLI.error.noInstancesFound(adapter);
                    return void callback(EXIT_CODES.UNKNOWN_ERROR);
                }
                for (const instance of adapterInstances) {
                    await setInstanceEnabled(objects, instance, enabled, restartIfRunning);
                }
                return void callback();
            } catch (err) {
                CLI.error.unknown(err.message);
                return void callback(EXIT_CODES.UNKNOWN_ERROR);
            }
        });
    }

    /**
     * Starts or stops a specific adapter instance
     *
     * @param instance The instance to start, e.g. "adaptername.0"
     * @param enabled If the instance should be started or stopped
     * @param [restartIfRunning] Whether running instances should be restarted
     */
    setAdapterInstanceEnabled(instance: string, enabled: boolean, restartIfRunning?: boolean): void {
        const { callback, dbConnect } = this.options;
        dbConnect(async params => {
            const { objects } = params;

            const obj = (await objects.getObject(`system.adapter.${instance}`)) as
                | ioBroker.InstanceObject
                | ioBroker.AdapterObject;

            if (!obj || obj.type !== 'instance') {
                CLI.error.invalidInstance(instance);
                return void callback();
            }

            try {
                await setInstanceEnabled(objects, obj, enabled, restartIfRunning);
                return void callback();
            } catch (e) {
                CLI.error.unknown(e.message);
                return void callback(EXIT_CODES.UNKNOWN_ERROR);
            }
        });
    }

    /** Starts the JS controller */
    startJSController(): void {
        const daemon = setupDaemonize();
        daemon.start();
    }

    /** Stops the JS controller */
    stopJSController(): void {
        const { callback } = this.options;
        const daemon = setupDaemonize();
        // On non-Windows OSes start KILLALL script
        // to make sure nothing keeps running
        if (!os.platform().startsWith('win')) {
            daemon.on('stopped', () => {
                let data = '';
                if (fs.existsSync(killAllScriptPath)) {
                    fs.chmodSync(killAllScriptPath, '777');
                    const child = spawn(killAllScriptPath, [], { windowsHide: true });
                    child.stdout.on('data', _data => (data += _data.toString().replace(/\n/g, '')));
                    child.stderr.on('data', _data => (data += _data.toString().replace(/\n/g, '')));
                    child.on('exit', exitCode => {
                        console.log('Exit code for "killall.sh": ' + exitCode);
                        return void callback();
                    });
                } else {
                    console.log('No "killall.sh" script found. Just stop.');
                }
            });
        }
        daemon.stop();
    }

    /** Restarts the JS controller */
    restartJSController(): void {
        const daemon = setupDaemonize();
        daemon.on('stopped', () => daemon.start()).on('notrunning', () => daemon.start());
        daemon.stop();
    }

    /**
     * Checks if ioBroker is running or not
     *
     * @param args parsed cli arguments
     */
    status(args: any[]): void {
        const { callback, dbConnect } = this.options;
        const adapterName = normalizeAdapterName(args[0]);
        const showEntireConfig = adapterName === 'all';

        dbConnect(async params => {
            const { objects, states, config, isOffline } = params;

            if (!adapterName || showEntireConfig) {
                // we want host info or/and whole config
                const hostAlive = await states.getState(`system.host.${tools.getHostName()}.alive`);

                const alive = hostAlive ? (hostAlive.val as boolean) : false;
                CLI.success.controllerStatus(alive);
                console.log();

                const hasLocalStatesServer = await dbTools.isLocalStatesDbServer(
                    config.states.type,
                    config.states.host
                );
                const hasLocalObjectsServer = await dbTools.isLocalObjectsDbServer(
                    config.objects.type,
                    config.objects.host
                );

                if (!hasLocalStatesServer && !hasLocalObjectsServer) {
                    CLI.success.systemStatus(!isOffline);
                }

                console.log();
                if (showEntireConfig) {
                    await showAllInstancesStatus(states, objects);
                    console.log();
                    showConfig(config);
                } else {
                    console.log(`Objects type: ${config.objects.type}`);
                    console.log(`States  type: ${config.states.type}`);
                }
                return void callback(isOffline ? EXIT_CODES.CONTROLLER_NOT_RUNNING : undefined);
            } else {
                // we want to know the status of an adapter
                if (/\.\d+$/.test(adapterName)) {
                    // instance specified
                    await showInstanceStatus(states, adapterName);
                    return void callback();
                } else {
                    const adapterInstances = await enumInstances(objects, adapterName);
                    // If there are multiple instances of this adapter, ask the user to specify which one
                    if (adapterInstances.length > 1) {
                        CLI.error.specifyInstance(
                            adapterName,
                            adapterInstances.map(obj => obj._id.substring('system.adapter.'.length))
                        );
                        return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
                    } else if (adapterInstances.length === 0) {
                        CLI.error.noInstancesFound(adapterName);
                        return void callback(EXIT_CODES.UNKNOWN_ERROR);
                    }

                    const instanceId = adapterInstances[0]._id.split('.').pop();
                    await showInstanceStatus(states, `${adapterName}.${instanceId}`);
                    return void callback();
                }
            }
        });
    }
}

/**
 * Outputs the status of all existing adapter instances
 *
 * @param states The States DB
 * @param objects The Objects DB
 */
async function showAllInstancesStatus(states: StatesClient, objects: ObjectsClient): Promise<void> {
    const allInstances = await enumInstances(objects);
    for (const instance of allInstances) {
        const instanceId = instance._id.split('.').pop();
        await showInstanceStatus(states, `${instance.common.name}.${instanceId}`);
    }
    return Promise.resolve();
}

/**
 * Outputs the status of an adapter instance
 *
 * @param states the states object
 * @param adapterInstance <adapteName>.<instanceId>
 * @returns
 */
function showInstanceStatus(states: StatesClient, adapterInstance: string): Promise<void> {
    return new Promise(resolve => {
        states.getState(`system.adapter.${adapterInstance}.alive`, (err, state) => {
            if (state && state.val === true) {
                console.log(`Instance "${adapterInstance}" is running`);
            } else {
                console.log(`Instance "${adapterInstance}" is not running`);
            }
            resolve();
        });
    });
}

/**
 * Prints the config file to the console
 *
 * @param config
 * @param root
 */
function showConfig(config: Record<string, any>, root?: string[]): void {
    if (!tools.isObject(config)) {
        return;
    }
    root = root || [];
    const prefix = root.join('/').toUpperCase();
    for (const attr of Object.keys(config)) {
        if (attr.match(/comment$/i)) {
            continue;
        }
        if (typeof config[attr] === 'object') {
            const nextRoot = deepClone(root);
            nextRoot.push(attr);
            showConfig(config[attr], nextRoot);
        } else {
            console.log(`${prefix}${(prefix ? '/' : '') + attr}: ${config[attr]}`);
        }
    }
}

/**
 * Sets the enabled state of an instance to the given value
 *
 * @param objects The objects DB
 * @param instanceObj The instance object to change
 * @param enabled Whether the instance should be enabled or not
 * @param [force] Whether the object should be updated always
 */
function setInstanceEnabled(
    objects: ObjectsClient,
    instanceObj: ioBroker.InstanceObject,
    enabled: boolean,
    force?: boolean
): Promise<void> {
    return new Promise(resolve => {
        if (!!force || instanceObj.common.enabled !== enabled) {
            instanceObj.common.enabled = enabled;
            instanceObj.from = getObjectFrom();
            instanceObj.ts = Date.now();
            objects.setObject(instanceObj._id, instanceObj, () => {
                const instanceName = getInstanceName(instanceObj._id);
                if (enabled) {
                    CLI.success.adapterStarted(instanceName);
                } else {
                    CLI.success.adapterStopped(instanceName);
                }
                resolve();
            });
        } else {
            resolve();
        }
    });
}

function setupDaemonize(): typeof daemonize2 {
    let memoryLimitMB = 0;
    try {
        const config: ioBroker.IoBrokerJson = fs.readJSONSync(tools.getConfigFileName(), { encoding: 'utf-8' });
        if (config?.system?.memoryLimitMB) {
            memoryLimitMB = Math.round(config.system.memoryLimitMB);
        }
    } catch {
        console.warn('Cannot read memoryLimitMB');
        console.warn(
            `May be config file does not exist.\nPlease call "${tools.appName} setup first" to initialize the settings.`
        );
    }
    const startObj: Record<string, unknown> = {
        main: path.join(rootDir, 'controller.js'),
        name: `${tools.appName} controller`,
        pidfile: path.join(rootDir, `${tools.appName}.pid`),
        cwd: rootDir,
        stopTimeout: 6_000
    };
    if (memoryLimitMB) {
        startObj.args = `--max-old-space-size=${memoryLimitMB}`;
    }

    const daemon = daemonize2.setup(startObj);
    daemon.on('error', (error: string) => CLI.error.unknown(error));
    return daemon;
}
