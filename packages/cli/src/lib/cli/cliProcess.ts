import fs from 'fs-extra';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import deepClone from 'deep-clone';
import { setTimeout as wait } from 'node:timers/promises';

import {
    isLocalStatesDbServer,
    isLocalObjectsDbServer,
    getInstancesOrderedByStartPrio,
} from '@iobroker/js-controller-common';
import { tools, EXIT_CODES } from '@iobroker/js-controller-common';
import * as CLI from '@/lib/cli/messages.js';
import { CLICommand } from '@/lib/cli/cliCommand.js';
import { getObjectFrom, getInstanceName, normalizeAdapterName, enumInstances } from '@/lib/cli/cliTools.js';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import type { CLICommandOptions } from '@/lib/cli/cliCommand.js';

/** Time to wait after killing pid until process is assumed as stopped */
const TRY_KILL_WAIT_MS = 5_000;

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
    async start(args: any[]): Promise<void> {
        const adapterName = normalizeAdapterName(args[0]);
        if (!adapterName) {
            await this.startJSController();
            this.options.callback();
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
    async restart(args: any[]): Promise<void> {
        const adapterName = normalizeAdapterName(args[0]);
        if (!adapterName) {
            await this.restartJSController();
            this.options.callback();
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
    async stop(args: any[]): Promise<void> {
        const adapterName = normalizeAdapterName(args[0]);
        if (adapterName === undefined) {
            await CLIProcess.stopJSController();
            this.options.callback();
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
            const instances = await getInstancesOrderedByStartPrio(objects, console);
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
     * If there are multiple instances, all will be started/stopped/restarted
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
            } catch (e) {
                CLI.error.unknown(e.message);
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

    /**
     * Starts the JS controller
     */
    async startJSController(): Promise<void> {
        let memoryLimitMB = 0;
        try {
            const config: ioBroker.IoBrokerJson = fs.readJSONSync(tools.getConfigFileName(), { encoding: 'utf-8' });
            if (config?.system?.memoryLimitMB) {
                memoryLimitMB = Math.round(config.system.memoryLimitMB);
            }
        } catch {
            console.warn('Cannot read memoryLimitMB');
            console.warn(
                `May be config file does not exist.\nPlease call "${tools.appName} setup first" to initialize the settings.`,
            );
        }

        let pid: number | undefined;
        try {
            pid = await tools.getControllerPid();
        } catch (e) {
            console.error(`Could not read pid file: ${e.message}`);
        }

        if (pid) {
            console.log(`Controller is already running with pid ${pid}`);
            return;
        }

        const args = [path.join(rootDir, 'controller.js')];
        if (memoryLimitMB) {
            args.push(`--max-old-space-size=${memoryLimitMB}`);
        }

        const child = spawn(process.execPath, args, {
            env: process.env,
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
            windowsHide: true,
            cwd: rootDir,
        });

        child.unref();
    }

    /**
     * Stops the JS controller
     */
    static async stopJSController(): Promise<void> {
        let pid: number | undefined;
        try {
            pid = await tools.getControllerPid();
        } catch (e) {
            console.error(`Could not read pid file: ${e.message}`);
        }

        if (!pid) {
            return;
        }

        await tryKill(pid);

        // On non-Windows OSes start a KILLALL script
        // to make sure nothing keeps running
        if (os.platform() !== 'win32') {
            let data = '';
            if (fs.existsSync(killAllScriptPath)) {
                fs.chmodSync(killAllScriptPath, '777');
                const child = spawn(killAllScriptPath, [], { windowsHide: true });
                child.stdout.on('data', _data => (data += _data.toString().replace(/\n/g, '')));
                child.stderr.on('data', _data => (data += _data.toString().replace(/\n/g, '')));
                return new Promise(resolve => {
                    child.on('exit', exitCode => {
                        console.log(`Exit code for "killall.sh": ${exitCode}`);
                        resolve();
                    });
                });
            }
            console.log('No "killall.sh" script found. Just stop.');
        }

        try {
            // delete pids.txt file
            fs.unlinkSync(tools.getPidsFileName());
        } catch {
            // ignore
        }
    }

    /** Restarts the JS controller */
    async restartJSController(): Promise<void> {
        await CLIProcess.stopJSController();
        await this.startJSController();
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

                const hasLocalStatesServer = await isLocalStatesDbServer(config.states.type, config.states.host);
                const hasLocalObjectsServer = await isLocalObjectsDbServer(config.objects.type, config.objects.host);

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
            }
            // we want to know the status of an adapter
            if (/\.\d+$/.test(adapterName)) {
                // instance specified
                await showInstanceStatus(states, adapterName);
                return void callback();
            }
            const adapterInstances = await enumInstances(objects, adapterName);
            // If there are multiple instances of this adapter, ask the user to specify which one
            if (adapterInstances.length > 1) {
                CLI.error.specifyInstance(
                    adapterName,
                    adapterInstances.map(obj => obj._id.substring('system.adapter.'.length)),
                );
                return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
            } else if (adapterInstances.length === 0) {
                CLI.error.noInstancesFound(adapterName);
                return void callback(EXIT_CODES.UNKNOWN_ERROR);
            }

            const instanceId = adapterInstances[0]._id.split('.').pop();
            await showInstanceStatus(states, `${adapterName}.${instanceId}`);
            return void callback();
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
 * @param adapterInstance <adapterName>.<instanceId>
 */
async function showInstanceStatus(states: StatesClient, adapterInstance: string): Promise<void> {
    const state = await states.getState(`system.adapter.${adapterInstance}.alive`);
    if (state?.val === true) {
        console.log(`Instance "${adapterInstance}" is running`);
    } else {
        console.log(`Instance "${adapterInstance}" is not running`);
    }
}

/**
 * Prints the config file to the console
 *
 * @param config the ioBroker json file content
 * @param root
 */
function showConfig(config: ioBroker.IoBrokerJson, root?: string[]): void {
    if (!tools.isObject(config)) {
        return;
    }
    root = root || [];
    const prefix = root.join('/').toUpperCase();
    for (const attr of Object.keys(config)) {
        if (attr.match(/comment$/i)) {
            continue;
        }
        if (typeof (config as Record<string, any>)[attr] === 'object') {
            const nextRoot = deepClone(root);
            nextRoot.push(attr);
            showConfig((config as Record<string, any>)[attr], nextRoot);
        } else {
            console.log(`${prefix}${(prefix ? '/' : '') + attr}: ${(config as Record<string, any>)[attr]}`);
        }
    }
}

/**
 * Sets the enabled state of an instance to the given value
 *
 * @param objects The objects DB
 * @param instanceObj The instance object to change
 * @param enabled Whether the instance should be enabled or not
 * @param force Whether the object should be updated always
 */
async function setInstanceEnabled(
    objects: ObjectsClient,
    instanceObj: ioBroker.InstanceObject,
    enabled: boolean,
    force?: boolean,
): Promise<void> {
    if (!force && instanceObj.common.enabled === enabled) {
        return;
    }

    instanceObj.common.enabled = enabled;
    instanceObj.from = getObjectFrom();
    instanceObj.ts = Date.now();
    await objects.setObject(instanceObj._id, instanceObj);
    const instanceName = getInstanceName(instanceObj._id);
    if (enabled) {
        CLI.success.adapterStarted(instanceName);
    } else {
        CLI.success.adapterStopped(instanceName);
    }
}

/**
 * Kills a process by its PID
 *
 * @param pid The PID of the process to kill
 */
async function tryKill(pid: number): Promise<void> {
    try {
        process.kill(pid, 'SIGTERM');
    } catch (e) {
        console.warn(`Could not send "SIGTERM" to process ${pid}: ${e.message}`);
    }

    await wait(TRY_KILL_WAIT_MS);
}
