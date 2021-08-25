'use strict';
const fs = require('fs');
const path = require('path');
const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const tools = require('../tools.js');
const deepClone = require('deep-clone');
const EXIT_CODES = require(path.join('..', 'exitCodes.js'));

const { getObjectFrom, getInstanceName, normalizeAdapterName, enumInstances} = require('./cliTools.js');

// The root of this project. Change this when moving code to another directory
const rootDir = path.join(__dirname, '../../');
const killAllScriptPath = path.join(rootDir, 'killall.sh');

module.exports = class CLIProcess extends CLICommand {

    /** @param {import('./cliCommand').CLICommandOptions} options */
    constructor(options) {
        super(options);
    }

    // These CLI commands have no subcommands, but belong together thematically
    // (start/stop/restart/status)

    /**
     * Starts one or more adapters or the js-controller
     * @param {any[]} args
     */
    start(args) {
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
     * Restarts one or more adapters or the js-controller
     * @param {any[]} args
     */
    restart(args) {
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
     * @param {any[]} args
     */
    stop(args) {
        const adapterName = normalizeAdapterName(args[0]);
        if (adapterName === undefined ) {
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
     * @param {boolean} enabled
     */
    setAllAdaptersEnabled(enabled) {
        const { callback, dbConnect } = this.options;
        dbConnect(async objects => {
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
     * Starts or stops a single adapter. If there are multiple instances this fails
     * @param {string} adapter The adapter to start
     * @param {boolean} enabled
     * @param {boolean} [restartIfRunning=false] Whether running instances should be restarted
     */
    setAdapterEnabled(adapter, enabled, restartIfRunning) {
        const {callback, dbConnect} = this.options;
        dbConnect(async objects => {
            // Due to the many return locations we cannot simply chain the promises here
            // Use the pre-Node8 async/await pattern
            try {
                // Enumerate all adapter instances
                const adapterInstances = await enumInstances(objects, adapter);
                // If there are multiple instances for this adapter, ask the user to specify which one
                if (adapterInstances.length > 1) {
                    CLI.error.specifyInstance(adapter, adapterInstances.map(obj => obj._id.substring('system.adapter.'.length)));
                    return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
                } else if (adapterInstances.length === 0) {
                    CLI.error.noInstancesFound(adapter);
                    return void callback(EXIT_CODES.UNKNOWN_ERROR);
                }
                const instance = adapterInstances[0];
                await setInstanceEnabled(objects, instance, enabled, restartIfRunning);
                return void callback();
            } catch (err) {
                CLI.error.unknown(err.message);
                return void callback(EXIT_CODES.UNKNOWN_ERROR);
            }
        });
    }

    /**
     * Starts or stops a specific adapter instance
     * @param {string} instance The instance to start, e.g. "adaptername.0"
     * @param {boolean} enabled
     * @param {boolean} [restartIfRunning=false] Whether running instances should be restarted
     */
    setAdapterInstanceEnabled(instance, enabled, restartIfRunning) {
        const { callback, dbConnect } = this.options;
        dbConnect(objects => {
            objects.getObject(`system.adapter.${instance}`, async (err, obj) => {
                if (err || !obj || obj.type !== 'instance') {
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
        });
    }

    /** Starts the JS controller */
    startJSController() {
        const daemon = setupDaemonize();
        daemon.start();
    }

    /** Stops the JS controller */
    stopJSController() {
        const { callback } = this.options;
        const daemon = setupDaemonize();
        // On non-Windows OSes start KILLALL script
        // to make sure nothing keeps running
        if (!require('os').platform().match(/^win/)) {
            daemon.on('stopped', () => {
                let data = '';
                if (fs.existsSync(killAllScriptPath)) {
                    fs.chmodSync(killAllScriptPath, '777');
                    const child = require('child_process').spawn(killAllScriptPath, [], { windowsHide: true });
                    child.stdout.on('data', _data => data += _data.toString().replace(/\n/g, ''));
                    child.stderr.on('data', _data => data += _data.toString().replace(/\n/g, ''));
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
    restartJSController() {
        const daemon = setupDaemonize();
        daemon
            .on('stopped', () => daemon.start())
            .on('notrunning', () => daemon.start());
        daemon.stop();
    }

    /**
     * Checks if ioBroker is running or not
     * @param {any[]} args
     */
    status(args) {
        const { callback, dbConnect } = this.options;
        const adapterName = normalizeAdapterName(args[0]);
        const showEntireConfig = adapterName === 'all';

        dbConnect(async (_objects, states, isOffline, _objectDbType, config) => {
            if (!adapterName || showEntireConfig) {
                // we want host info or/and whole config
                states.getState(`system.host.${tools.getHostName()}.alive`, async (err, hostAlive) => {
                    const alive = hostAlive ? hostAlive.val : false;
                    CLI.success.controllerStatus(alive);
                    console.log();
                    if (!tools.isLocalStatesDbServer(config.states.type, config.states.host) && !tools.isLocalObjectsDbServer(config.objects.type, config.objects.host)) {
                        CLI.success.systemStatus(!isOffline);
                    }

                    console.log();
                    if (showEntireConfig) {
                        await showAllInstancesStatus(states, _objects);
                        console.log();
                        showConfig(config);
                    } else {
                        console.log(`Objects type: ${config.objects.type}`);
                        console.log(`States  type: ${config.states.type}`);
                    }
                    return void callback(isOffline ? EXIT_CODES.CONTROLLER_NOT_RUNNING : undefined);
                });
            } else {
                // we want to know the status of an adapter
                if (/\.\d+$/.test(adapterName)) {
                    // instance specified
                    await showInstanceStatus(states, adapterName);
                    return void callback();
                } else {
                    const adapterInstances = await enumInstances(_objects, adapterName);
                    // If there are multiple instances of this adapter, ask the user to specify which one
                    if (adapterInstances.length > 1) {
                        CLI.error.specifyInstance(adapterName, adapterInstances.map(obj => obj._id.substring('system.adapter.'.length)));
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
};

/**
 * Outputs the status of all existing adapter instances
 * @param {object} states The States DB
 * @param {object} objects The Objects DB
 * @returns {Promise<void>}
 */
async function showAllInstancesStatus(states, objects) {
    const allInstances = await enumInstances(objects);
    for (const instance of allInstances) {
        const instanceId = instance._id.split('.').pop();
        await showInstanceStatus(states, `${instance.common.name}.${instanceId}`);
    }
    return Promise.resolve();
}

/**
 * Outputs the status of an adapter instance
 * @param {object} states the states object
 * @param {string} adapterInstance <adapteName>.<instanceId>
 * @returns {Promise<void>}
 */
function showInstanceStatus(states, adapterInstance) {
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

/** Prints the config file to the console */
function showConfig(config, root) {
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
            console.log(`${prefix}${(prefix ? '/' : '') + attr}: ` + config[attr]);
        }
    }
}

/**
 * Sets the enabled state of an instance to the given value
 * @param {any} objects The objects DB
 * @param {any} instanceObj The instance object to change
 * @param {boolean} enabled Whether the instance should be enabled or not
 * @param {boolean} [force=false] Whether the object should be updated always
 * @returns {Promise<void>}
 */
function setInstanceEnabled(objects, instanceObj, enabled, force) {
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

function setupDaemonize() {
    let memoryLimitMB = 0;
    try {
        const config = require(tools.getConfigFileName());
        if (config && config.system && config.system.memoryLimitMB) {
            memoryLimitMB = parseInt(config.system.memoryLimitMB, 10);
        }
    } catch {
        console.warn('Cannot read memoryLimitMB');
        console.warn(`May be config file does not exist.\nPlease call "${tools.appName} setup first" to initialize the settings.`);
    }
    const startObj = {
        main: path.join(rootDir, 'controller.js'),
        name: tools.appName + ' controller',
        pidfile: path.join(rootDir, tools.appName + '.pid'),
        cwd: rootDir,
        stopTimeout: 6000
    };
    if (memoryLimitMB) {
        startObj.args = '--max-old-space-size=' + memoryLimitMB;
    }

    const daemon = require('daemonize2').setup(startObj);
    daemon.on('error', error => CLI.error.unknown(error));
    return daemon;
}
