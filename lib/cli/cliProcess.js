'use strict';
const fs = require('fs');
const path = require('path');
const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const tools = require('../tools.js');
const { getObjectFrom, getInstanceName, normalizeAdapterName, enumInstances } = require('./cliTools.js');

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
        if (adapterName == undefined) {
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
        if (adapterName == undefined) {
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
        if (adapterName == undefined) {
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
        dbConnect((objects) => {
            // Enumerate all adapter instances
            enumInstances(objects)
                // Create a promise for each. setInstanceEnabled only starts/stops when necessary
                .then(adapterInstances => {
                    return adapterInstances
                        .filter(obj => obj.common.enabled !== enabled)
                        .map(obj => setInstanceEnabled(objects, obj, enabled))
                    ;
                })
                // wait for all instances to be started/stopped
                .then(instancePromises => Promise.all(instancePromises))
                .then(() => callback)
            ;
        });
    }

    /**
     * Starts or stops a single adapter. If there are multiple instances this fails
     * @param {string} adapter The adapter to start
     * @param {boolean} enabled
     * @param {boolean} [restartIfRunning=false] Whether running instances should be restarted
     */
    setAdapterEnabled(adapter, enabled, restartIfRunning) {
        const { callback, dbConnect } = this.options;
        dbConnect((objects) => {
            // Due to the many return locations we cannot simply chain the promises here
            // Use the pre-Node8 async/await pattern
            tools.poorMansAsync(function* () {
                // Enumerate all adapter instances
                const adapterInstances = yield enumInstances(objects, adapter);
                // If there are multiple instances for this adapter, ask the user to specify which one
                if (adapterInstances.length > 1) {
                    CLI.error.specifyInstance(adapter);
                    return void callback(1);
                } else if (adapterInstances.length === 0) {
                    CLI.error.noInstancesFound(adapter);
                    return void callback(1);
                }
                const instance = adapterInstances[0];
                yield setInstanceEnabled(objects, instance, enabled, restartIfRunning);
                return void callback();
            })().catch(err => {
                CLI.error.unknown(err);
                return void callback(1);
            });
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
        dbConnect((objects) => {
            objects.getObject(`system.adapter.${instance}`, (err, obj) => {
                if (err || !obj || obj.type !== 'instance') {
                    CLI.error.invalidInstance(instance);
                    return void callback(24);
                }

                setInstanceEnabled(objects, obj, enabled, restartIfRunning)
                    .then(() => callback());
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
                    const child = require('child_process').spawn(killAllScriptPath, []);
                    child.stdout.on('data', _data => data += _data.toString().replace('\n', ''));
                    child.stderr.on('data', _data => data += _data.toString().replace('\n', ''));
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
            .on('notrunning', () => daemon.start())
        ;
        daemon.stop();
    }

    /**
     * Checks if ioBroker is running or not
     * @param {any[]} args
     */
    status(args) {
        const { callback, dbConnect } = this.options;
        const showEntireConfig = !!args[0];

        dbConnect((_objects, _states, isOffline) => {
            const config = require(tools.getConfigFileName());
            CLI.success.controllerStatus(!isOffline);

            console.log();
            if (showEntireConfig) {
                showConfig(config);
            } else {
                console.log(`Objects type: ${config.objects.type}`);
                console.log(`States  type: ${config.states.type}`);
            }
            return void callback(isOffline ? 100 : undefined);
        });
    }
};

/** Prints the config file to the console */
function showConfig(config, root) {
    root = root || [];
    const prefix = root.join('/').toUpperCase();
    for (const attr in config) {
        if (!config.hasOwnProperty(attr)) continue;
        if (attr.match(/comment$/i)) continue;
        if (typeof config[attr] === 'object') {
            const nextRoot = JSON.parse(JSON.stringify(root));
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
    } catch (err) {
        console.warn('Cannot read memoryLimitMB');
        console.warn('May be config file does not exist.\nPlease call "' + tools.appName + ' setup first" to initialize the settings.');
    }
    const startObj = {
        main: path.join(rootDir, 'controller.js'),
        name: tools.appName + ' controller',
        pidfile: path.join(rootDir, tools.appName + '.pid'),
        cwd: rootDir,
        stopTimeout: 6000
    };
    if (memoryLimitMB) startObj.args = '--max-old-space-size=' + memoryLimitMB;

    const daemon = require('daemonize2').setup(startObj);
    daemon.on('error', error => CLI.error.unknown(error));
    return daemon;
}