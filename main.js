/**
 *      application.controller
 *
 *      Controls Adapter-Processes
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>,
 *                2013-2014 hobbyquaker <hq@ccu.io>
 *      MIT License
 *
 */
'use strict';

const schedule   = require('node-schedule');
const os         = require('os');
const fs         = require('fs');
const path       = require('path');
const cp         = require('child_process');
const ioPackage  = require('./io-package.json');
const tools      = require('./lib/tools');
const version    = ioPackage.common.version;
const pidUsage   = require('pidusage');
const EXIT_CODES = require('./lib/exitCodes');

const exec       = cp.exec;
const spawn      = cp.spawn;

let   adapterDir = __dirname.replace(/\\/g, '/');
let   zipFiles;
let   upload; // will be used only once by upload of adapter

/* Use require('loadavg-windows') to enjoy os.loadavg() on Windows OS.
   Currently Node.js on Windows platform do not implements os.loadavg() functionality - it returns [0,0,0]
   Expect first results after 1 min from application start (before 1 min runtime it will return [0,0,0])
   Requiring it on other operating systems have NO influence.*/
if (os.platform() === 'win32') {
    require('loadavg-windows');
}

let title = tools.appName + '.js-controller';

let Objects;
let States;
let decache;

const semver                = require('semver');
let logger;
let isDaemon                = false;
let callbackId              = 1;
let callbacks               = {};
const hostname              = tools.getHostName();
let hostObjectPrefix        = 'system.host.' + hostname;
let hostLogPrefix           = 'host.' + hostname;
const compactGroupObjectPrefix = '.compactgroup';
const logList               = [];
let detectIpsCount          = 0;
let objectsDisconnectTimeout= null;
let statesDisconnectTimeout = null;
let connected               = null; // not false, because want to detect first connection
let ipArr                   = [];
let lastCalculationOfIps    = null;
let lastDiskSizeCheck       = 0;
let restartTimeout          = null;
let connectTimeout          = null;
let reportInterval          = null;

const procs                 = {};
const hostAdapter           = {};
const subscribe             = {};
const stopTimeouts          = {};
let states                  = null;
let objects                 = null;
let storeTimer              = null;
let isStopping              = null;
let allInstancesStopped     = true;
let stopTimeout             = 10000;
let uncaughtExceptionCount  = 0;
const installQueue          = [];
let started                 = false;
let inputCount              = 0;
let outputCount             = 0;
let eventLoopLags           = [];
let mhService               = null; // multihost service
const uptimeStart           = Date.now();
let compactGroupController  = false;
let compactGroup            = null;
const compactProcs          = {};
const scheduledInstances    = {};
const VENDOR_BOOTSTRAP_FILE = '/opt/iobroker/iob-vendor-secret.json';
const VENDOR_FILE           = '/etc/iob-vendor.json';
let updateIPsTimer          = null;

const uploadTasks           = [];

const config = getConfig();

function getErrorText(code) {
    const texts = Object.keys(EXIT_CODES);
    for (let i = 0; i < texts.length; i++) {
        if (EXIT_CODES[texts[i]] === code) {
            return texts[i];
        }
    }
    return code;
}

function getConfig() {
    const configFile = tools.getConfigFileName();
    if (!fs.existsSync(configFile)) {
        if (process.argv.indexOf('start') !== -1) {
            isDaemon = true;
            logger = require('./lib/logger')('info', [tools.appName], true);
        } else {
            logger = require('./lib/logger')('info', [tools.appName]);
        }
        logger.error(hostLogPrefix + ' conf/' + tools.appName + '.json missing - call node ' + tools.appName + '.js setup');
        process.exit(EXIT_CODES.MISSING_CONFIG_JSON);
        return null;
    } else {
        const _config = JSON.parse(fs.readFileSync(configFile));
        if (!_config.states)  _config.states  = {type: 'file'};
        if (!_config.objects) _config.objects = {type: 'file'};
        if (!_config.system)  _config.system  = {};
        return _config;
    }
}

function _startMultihost(_config, secret) {
    const MHService = require('./lib/multihostServer.js');
    const cpus    = os.cpus();
    mhService = new MHService(hostname, logger, _config, {
        node:   process.version,
        arch:   os.arch(),
        model:  cpus && cpus[0] && cpus[0].model ? cpus[0].model : 'unknown',
        cpus:   cpus ? cpus.length : 1,
        mem:    os.totalmem(),
        ostype: os.type()
    }, getIPs(), secret);
}

function startMultihost(__config) {
    if (compactGroupController) return;

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
                logger.warn(hostLogPrefix + ' Cannot stop multihost: ' + e);
            }
        }

        if ((!_config.objects.host || _config.objects.host === '127.0.0.1' || _config.objects.host === 'localhost') && _config.objects.type === 'file') {
            logger.warn(hostLogPrefix + ' Multihost Master on this system is not possible, because IP address for objects is ' + _config.objects.host);
        } else
        if ((!_config.states.host || _config.states.host === '127.0.0.1' || _config.states.host  === 'localhost') && _config.states.type === 'file') {
            logger.warn(hostLogPrefix + ' Multihost Master on this system is not possible, because IP address for states is ' + _config.states.host);
        }

        if (_config.multihostService.secure) {
            objects.getObject('system.config', (err, obj) => {
                if (obj && obj.native && obj.native.secret) {
                    tools.decryptPhrase(obj.native.secret, _config.multihostService.password, secret =>
                        _startMultihost(_config, secret));
                } else {
                    logger.error(hostLogPrefix + ' Cannot start multihost discovery server: no system.config found (err:' + err + ')');
                }
            });
        } else {
            _startMultihost(_config, false);
        }

        return true;
    } else if (mhService) {
        try {
            mhService.close();
            mhService = null;
        } catch (e) {
            logger.warn(hostLogPrefix + ' Cannot stop multihost discovery: ' + e);
        }
        return false;
    }
}

// get the list of IP addresses of this host
function getIPs() {
    if (!lastCalculationOfIps || Date.now() - lastCalculationOfIps > 10000) {
        const ifaces = os.networkInterfaces();
        lastCalculationOfIps = Date.now();
        ipArr = [];
        Object.keys(ifaces).forEach(dev =>
            ifaces[dev].forEach(details =>
                // noinspection JSUnresolvedVariable
                !details.internal && ipArr.push(details.address)));
    }

    return ipArr;
}

/**
 * Starts cyclic update of IP interfaces.
 * At start every 30 seconds and after 5 minutes, every hour.
 * Because DHCP could change the IPs.
 */
function startUpdateIPs() {
    if (!updateIPsTimer) {
        updateIPsTimer = setInterval(() => {
            if (Date.now() - uptimeStart > 5 * 60000) {// 5 minutes at start check every 30 seconds because of DHCP
                clearInterval(updateIPsTimer);

                updateIPsTimer = setInterval(() => setIPs(), 3600000); // update IPs every hour
            }
            setIPs();
        }, 30000);
    }
}

// subscribe or unsubscribe loggers
function logRedirect(isActive, id, reason) {
    console.log(`================================== > LOG REDIRECT ${id} => ${isActive} [${reason}]`);
    if (isActive) {
        if (logList.indexOf(id) === -1) {
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
    if (!connected || restartTimeout || isStopping) return;
    if (statesDisconnectTimeout) {
        clearTimeout(statesDisconnectTimeout);
        statesDisconnectTimeout = null;
    }
    if (objectsDisconnectTimeout) {
        clearTimeout(objectsDisconnectTimeout);
        objectsDisconnectTimeout = null;
    }

    connected = false;
    logger.warn(hostLogPrefix + ' Slave controller detected disconnection. Stop all instances.');
    stop(true, () => {
        if (compactGroupController) {
            setTimeout(() => process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED), 1000);
        } else {
            restartTimeout = setTimeout(() => {
                processMessage({command: 'cmdExec', message: {data: '_restart'}});
                setTimeout(() => process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED), 1000);
            }, 10000);
        }
    });
}

function createStates(onConnect) {
    const _inst = new States({
        namespace: hostLogPrefix,
        connection: config.states,
        logger: logger,
        hostname: hostname,
        change: (id, state) => {
            inputCount++;
            if (!id) {
                return logger.error(hostLogPrefix + ' change event with no ID: ' + JSON.stringify(state));
            }
            // If some log transporter activated or deactivated
            if (id.match(/.logging$/)) {
                logRedirect(state ? state.val : false, id.substring(0, id.length - '.logging'.length), id);
            } else
            // If this is messagebox, only the main controller is handling the host messages
            if (!compactGroupController && id === 'messagebox.' + hostObjectPrefix) {
                const obj = state;
                if (obj) {
                    // If callback stored for this request
                    if (obj.callback &&
                        obj.callback.ack &&
                        obj.callback.id &&
                        callbacks &&
                        callbacks['_' + obj.callback.id]) {
                        // Call callback function
                        if (callbacks['_' + obj.callback.id].cb) {
                            callbacks['_' + obj.callback.id].cb(obj.message);
                            delete callbacks['_' + obj.callback.id];
                        }

                        // delete too old callbacks IDs
                        const now = Date.now();
                        for (const _id in callbacks) {
                            if (!callbacks.hasOwnProperty(_id)) continue;
                            if (now - callbacks[_id].time > 3600000) delete callbacks[_id];
                        }
                    } else {
                        processMessage(obj);
                    }
                }
            } else
            // If this NAME.0.info.connection, only main controller is handling this
            if (!compactGroupController && id.match(/^[^.]+\.\d+\.info\.connection$/)) {
                // Disabled in 1.5.x
                // if (state && !state.val) {
                //     tools.setQualityForInstance(objects, states, id.substring(0, id.length - /* '.info.connection'.length*/ 16), 0x42)
                //         .then(() => {
                //             logger.debug(hostLogPrefix + ' set all states quality to 0x42 (device not connected');
                //         }).catch(e => {
                //             logger.error(hostLogPrefix + ' cannot set all states quality: ' + e);
                //         });
                // }
            } else
            // If this system.adapter.NAME.0.alive, only main controller is handling this
            if (!compactGroupController && id.match(/^system.adapter.[^.]+\.\d+\.alive$/)) {
                if (state && !state.ack) {
                    const enabled = state.val;
                    setImmediate(() => {
                        objects.getObject(id.substring(0, id.length - 6/*'.alive'.length*/), (err, obj) => {
                            if (err) logger.error(hostLogPrefix + ' Cannot read object: '  + err);
                            if (obj && obj.common) {
                                // IF adapter enabled => disable it
                                if ((obj.common.enabled && !enabled) || (!obj.common.enabled && enabled)) {
                                    obj.common.enabled = !!enabled;
                                    logger.info(hostLogPrefix + ' instance "' + obj._id + '" ' + (obj.common.enabled ? 'enabled' : 'disabled') + ' via .alive');
                                    setImmediate(() => {
                                        obj.from = hostObjectPrefix;
                                        obj.ts = Date.now();
                                        objects.setObject(obj._id, obj);
                                    });
                                }
                            }
                        });
                    });
                } else if (state && state.ack && !state.val) {
                    // Disabled in 1.5.x
                    // id = id.substring(0, id.length - /*.alive*/ 6);
                    // if (procs[id] && procs[id].config.common.host === hostname && procs[id].config.common.mode === 'daemon') {
                    //     tools.setQualityForInstance(objects, states, id.substring(15 /*'system.adapter.'.length*/), 0x12)
                    //         .then(() => {
                    //             logger.debug(hostLogPrefix + ' set all states quality to 0x12 (instance not connected');
                    //         }).catch(e => {
                    //         logger.error(hostLogPrefix + ' cannot set all states quality: ' + e);
                    //     });
                    // }
                }
            } else
            if (subscribe[id]) {
                for (let i = 0; i < subscribe[id].length; i++) {
                    // wake up adapter
                    if (procs[subscribe[id][i]]) {
                        console.log('Wake up ' + id + ' ' + JSON.stringify(state));
                        startInstance(subscribe[id][i], true);
                    } else {
                        logger.warn(hostLogPrefix + ' controller Adapter subscribed on ' + id + ' does not exist!');
                    }
                }
            } else
            if (id === hostObjectPrefix + '.logLevel') {
                if (! config || !config.log || !state || state.ack) return;
                let currentLevel = config.log.level;
                if (state.val && state.val !== currentLevel && ['silly','debug', 'info', 'warn', 'error'].includes(state.val)) {
                    config.log.level = state.val;
                    for (const transport in logger.transports) {
                        if (!logger.transports.hasOwnProperty(transport)) continue;
                        if (logger.transports[transport].level === currentLevel) {
                            logger.transports[transport].level = state.val;
                        }
                    }
                    logger.info(hostLogPrefix + ' Loglevel changed from "' + currentLevel + '" to "' + state.val + '"');
                    currentLevel = state.val;
                } else if (state.val && state.val !== currentLevel) {
                    logger.info(hostLogPrefix + ' Got invalid loglevel "' + state.val + '", ignoring');
                }
                states.setState(hostObjectPrefix + '.logLevel', {val: currentLevel, ack: true, from: hostObjectPrefix});
            }
            /* it is not used because of code before
            else
            // Monitor activity of the adapter and restart it if stopped
            if (!isStopping && id.substring(id.length - '.alive'.length) === '.alive') {
                let adapter = id.substring(0, id.length - '.alive'.length);
                if (procs[adapter] &&
                    !procs[adapter].stopping &&
                    !procs[adapter].process &&
                    procs[adapter].config &&
                    procs[adapter].config.common.enabled &&
                    procs[adapter].config.common.mode === 'daemon') {
                    startInstance(adapter, false);
                }
            }
             */
        },
        connected: (handler) => {
            states = handler;

            if (statesDisconnectTimeout) {
                clearTimeout(statesDisconnectTimeout);
                statesDisconnectTimeout = null;
            }
            // logs and cleanups are only handled by the main controller process
            if (!compactGroupController) {
                states.clearAllLogs && states.clearAllLogs();
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

function initializeController() {
    if (!states || !objects || connected) {
        return;
    }

    logger.info(hostLogPrefix + ' connected to Objects and States');

    if (connected === null) {
        connected = true;
        if (!isStopping) {
            // Do not start if we still stopping the instances
            checkHost(() => {
                startMultihost(config);
                setMeta();
                started = true;
                getInstances();
            });
        }
    } else {
        connected = true;
        started   = true;

        // Do not start if we still stopping the instances
        if (!isStopping) {
            getInstances();
        }
    }
}

// create "objects" object
function createObjects(onConnect) {
    const _inst = new Objects({
        namespace:  hostLogPrefix,
        connection: config.objects,
        controller: true,
        logger:     logger,
        hostname:   hostname,
        connected:  handler => {
            objects = handler;
            // stop disconnect timeout
            if (objectsDisconnectTimeout) {
                clearTimeout(objectsDisconnectTimeout);
                objectsDisconnectTimeout = null;
            }

            initializeController();
            onConnect && onConnect();
        },
        disconnected: (/*error*/) => {
            if (restartTimeout) {
                return;
            }
            objectsDisconnectTimeout && clearTimeout(objectsDisconnectTimeout);
            objectsDisconnectTimeout = setTimeout(() => {
                objectsDisconnectTimeout = null;
                handleDisconnect();
            }, (config.objects.connectTimeout || 2000) + (!compactGroupController ? 500 : 0));
            // give main controller a bit longer, so that adapter and compact processes can exit before
        },
        change: (id, obj) => {
            if (!started || !id.match(/^system\.adapter\.[a-zA-Z0-9-_]+\.[0-9]+$/)) return;
            try {
                logger.debug(hostLogPrefix + ' object change ' + id + ' (from: ' + (obj ? obj.from : null) + ')');
                // known adapter
                if (procs[id]) {
                    // if adapter deleted
                    if (!obj) {
                        // deleted: also remove from instance list of compactGroup
                        if (!compactGroupController && procs[id].config.common.compactGroup && compactProcs[procs[id].config.common.compactGroup] && compactProcs[procs[id].config.common.compactGroup].instances && compactProcs[procs[id].config.common.compactGroup].instances.includes(id)) {
                            compactProcs[procs[id].config.common.compactGroup].instances.splice(compactProcs[procs[id].config.common.compactGroup].instances.indexOf(id), 1);
                        }
                        procs[id].config.common.enabled = false;
                        procs[id].config.common.host    = null;
                        procs[id].config.deleted        = true;
                        delete hostAdapter[id];
                        logger.info(hostLogPrefix + ' object deleted ' + id);
                    } else {
                        if (procs[id].config.common.enabled  && !obj.common.enabled) {
                            logger.info(hostLogPrefix + ' "' + id + '" disabled');
                        }
                        if (!procs[id].config.common.enabled &&  obj.common.enabled) {
                            logger.info(hostLogPrefix + ' "' + id + '" enabled');
                            procs[id].downloadRetry = 0;
                        }

                        // Check if compactgroup or compact mode changed
                        if (!compactGroupController &&
                            procs[id].config.common.compactGroup &&
                            (procs[id].config.common.compactGroup !== obj.common.compactGroup || procs[id].config.common.runAsCompactMode !== obj.common.runAsCompactMode) &&
                            compactProcs[procs[id].config.common.compactGroup] &&
                            compactProcs[procs[id].config.common.compactGroup].instances &&
                            compactProcs[procs[id].config.common.compactGroup].instances.includes(id)
                        ) {
                            compactProcs[procs[id].config.common.compactGroup].instances.splice(compactProcs[procs[id].config.common.compactGroup].instances.indexOf(id), 1);
                        }
                        procs[id].config = obj;
                        hostAdapter[id] = hostAdapter[id] || {};
                        hostAdapter[id].config = obj;
                    }
                    if (procs[id].process || procs[id].config.common.mode === 'schedule' || procs[id].config.common.mode === 'subscribe') {
                        stopInstance(id, () => {
                            const _ipArr = getIPs();

                            if (checkAndAddInstance(procs[id].config, _ipArr)) {
                                if (procs[id].config.common.enabled && (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance)) {
                                    if (procs[id].restartTimer) {
                                        clearTimeout(procs[id].restartTimer);
                                        delete procs[id].restartTimer;
                                    }
                                    procs[id].restartTimer = setTimeout(_id => startInstance(_id), 2500, id);
                                }
                            } else {
                                // moved: also remove from instance list of compactGroup
                                if (!compactGroupController && procs[id].config.common.compactGroup && compactProcs[procs[id].config.common.compactGroup] && compactProcs[procs[id].config.common.compactGroup].instances && compactProcs[procs[id].config.common.compactGroup].instances.includes(id)) {
                                    compactProcs[procs[id].config.common.compactGroup].instances.splice(compactProcs[procs[id].config.common.compactGroup].instances.indexOf(id), 1);
                                }
                                if (procs[id].restartTimer) {
                                    clearTimeout(procs[id].restartTimer);
                                    delete procs[id].restartTimer;
                                }
                                delete procs[id];
                                delete hostAdapter[id];
                            }
                        });
                    } else if (installQueue.find(obj => obj.id === id)) { // ignore object changes when still in install queue
                        logger.debug(hostLogPrefix + ' ignore object change because the adapter is still in installation/rebuild queue');
                    } else {
                        const _ipArr = getIPs();
                        if (procs[id].config && checkAndAddInstance(procs[id].config, _ipArr)) {
                            if (procs[id].config.common.enabled && (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance)) {
                                startInstance(id);
                            }
                        } else {
                            // moved: also remove from instance list of compactGroup
                            if (!compactGroupController && procs[id].config.common.compactGroup && compactProcs[procs[id].config.common.compactGroup] && compactProcs[procs[id].config.common.compactGroup].instances && compactProcs[procs[id].config.common.compactGroup].instances.includes(id)) {
                                compactProcs[procs[id].config.common.compactGroup].instances.splice(compactProcs[procs[id].config.common.compactGroup].instances.indexOf(id), 1);
                            }
                            if (procs[id].restartTimer) {
                                clearTimeout(procs[id].restartTimer);
                                delete procs[id].restartTimer;
                            }
                            delete procs[id];
                            delete hostAdapter[id];
                        }
                    }
                } else if (obj && obj.common) {
                    const _ipArr = getIPs();
                    // new adapter
                    if (checkAndAddInstance(obj, _ipArr) &&
                        procs[id].config.common.enabled &&
                        (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance)
                    ) {
                        // We should give is a slight delay to allow an pot. former existing process on other host to exit
                        procs[id].restartTimer = setTimeout(_id => startInstance(_id), 2500, id);
                    }
                }
            } catch (err) {
                if (!compactGroupController || (compactGroupController && obj && obj.common && obj.common.runAsCompactMode && obj.common.compactGroup === compactGroup)) {
                    logger.error(hostLogPrefix + ' cannot process: ' + id + ': ' + err + ' / ' + err.stack);
                }
            }
        }
    });
    return true;
}

function startAliveInterval() {
    config.system = config.system || {};
    config.system.statisticsInterval = parseInt(config.system.statisticsInterval, 10) || 15000;
    config.system.checkDiskInterval  = (config.system.checkDiskInterval !== 0) ? parseInt(config.system.checkDiskInterval, 10) || 300000 : 0;
    if (!compactGroupController) {
        // Provide info to see for each host if compact is enabled or not and be able to use in Admin or such
        states.setState(hostObjectPrefix + '.compactModeEnabled', {
            ack:  true,
            from: hostObjectPrefix,
            val:  config.system.compact || false
        });
    }
    reportInterval = setInterval(reportStatus, config.system.statisticsInterval);
    reportStatus();
    tools.measureEventLoopLag(1000, lag => eventLoopLags.push(lag));
}

function reportStatus() {
    if (!states) return;
    const id = hostObjectPrefix;
    outputCount += 10;
    states.setState(id + '.alive', {val: true, ack: true, expire: Math.floor(config.system.statisticsInterval / 1000) + 10, from: id});

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
    pidUsage(process.pid, (err, stats) => {
        // controller.s might be stopped, but this is still running
        if (!err && states && states.setState && stats) {
            states.setState(id + '.cpu',     {ack: true, from: id, val: Math.round(100 * parseFloat(stats.cpu)) / 100});
            states.setState(id + '.cputime', {ack: true, from: id, val: stats.ctime / 1000});
            outputCount+=2;
        }
    });

    const mem = process.memoryUsage();
    states.setState(id + '.memRss',       {val: Math.round(mem.rss / 10485.76/* 1MB / 100 */) / 100, ack: true, from: id});
    states.setState(id + '.memHeapTotal', {val: Math.round(mem.heapTotal / 10485.76/* 1MB / 100 */) / 100, ack: true, from: id});
    states.setState(id + '.memHeapUsed',  {val: Math.round(mem.heapUsed / 10485.76/* 1MB / 100 */) / 100, ack: true, from: id});

    // provide machine infos

    states.setState(id + '.load',         {val: Math.round(os.loadavg()[0] * 100) / 100, ack: true, from: id});  //require('loadavg-windows')
    states.setState(id + '.uptime',       {val: Math.round(process.uptime()), ack: true, from: id});
    states.setState(id + '.mem',          {val: Math.round(1000 * os.freemem() / os.totalmem()) / 10, ack: true, from: id});
    states.setState(id + '.freemem',      {val: Math.round(os.freemem() / 1048576/* 1MB */), ack: true, from: id});

    if (fs.existsSync('/proc/meminfo')) {
        try {
            const text = fs.readFileSync('/proc/meminfo', 'utf8');
            const m = text && text.match(/MemAvailable:\s*(\d+)/);
            if (m && m[1]) {
                states.setState(id + '.memAvailable', {val: Math.round(parseInt(m[1], 10) * 0.001024), ack: true, from: id});
                outputCount++;
            }
        } catch (err) {
            logger.error(hostLogPrefix + ' Cannot read /proc/meminfo: ' + err);
        }
    }

    if (config.system.checkDiskInterval && Date.now() - lastDiskSizeCheck >= config.system.checkDiskInterval) {
        lastDiskSizeCheck = Date.now();
        tools.getDiskInfo(os.platform(), (err, info) => {
            if (err) {
                logger.error(hostLogPrefix + ' Cannot read disk size: ' + err);
            }
            try {
                if (info) {
                    states.setState(id + '.diskSize', {val: Math.round((info['Disk size'] || 0) / (1024 * 1024)), ack: true, from: id});
                    states.setState(id + '.diskFree', {val: Math.round((info['Disk free'] || 0) / (1024 * 1024)), ack: true, from: id});
                    outputCount+=2;
                }
            } catch (e) {
                logger.error(hostLogPrefix + ' Cannot read disk information: ' + e);
            }
        });
    }

    // some statistics
    states.setState(id + '.inputCount',   {val: inputCount,  ack: true, from: id});
    states.setState(id + '.outputCount',  {val: outputCount, ack: true, from: id});

    if (eventLoopLags.length) {
        const eventLoopLag = Math.ceil(eventLoopLags.reduce((a, b) => (a + b)) / eventLoopLags.length);
        states.setState(id + '.eventLoopLag', {val: eventLoopLag, ack: true, from: id}); // average of measured values
        eventLoopLags = [];
    }

    states.setState(id + '.compactgroupProcesses',   {val: Object.keys(compactProcs).length, ack: true, from: id});
    let realProcesses = 0;
    let compactProcesses = 0;
    Object.keys(procs).forEach(proc => {
        if (procs[proc].process) {
            if (procs[proc].startedInCompactMode) {
                compactProcesses++;
            }
            else {
                realProcesses++;
            }
        }
    });
    states.setState(id + '.instancesAsProcess',   {val: realProcesses,    ack: true, from: id});
    states.setState(id + '.instancesAsCompact',   {val: compactProcesses, ack: true, from: id});

    inputCount  = 0;
    outputCount = 0;
    if (!isStopping && compactGroupController && started && compactProcesses === 0 && realProcesses === 0) {
        logger.info('Compact group controller ' + compactGroup + ' does not own any processes, stop');
        stop();
    }
}

function changeHost(objs, oldHostname, newHostname, callback) {
    if (!objs || !objs.length) {
        typeof callback === 'function' && callback();
    } else {
        const row = objs.shift();
        if (row && row.value && row.value.common && row.value.common.host === oldHostname) {
            const obj = row.value;
            obj.common.host = newHostname;
            logger.info(hostLogPrefix + ' Reassign instance ' + obj._id.substring('system.adapter.'.length) + ' from ' + oldHostname + ' to ' + newHostname);
            obj.from = 'system.host.' + tools.getHostName();
            obj.ts = Date.now();

            objects.setObject(obj._id, obj, (/* err */) =>
                setImmediate(() => changeHost(objs, oldHostname, newHostname, callback)));
        } else {
            setImmediate(() => changeHost(objs, oldHostname, newHostname, callback));
        }
    }
}

function cleanAutoSubscribe(instance, autoInstance, callback) {
    inputCount++;
    states.getState(autoInstance + '.subscribes', (err, state) => {
        if (!state || !state.val) {
            return typeof callback === 'function' && setImmediate(() => callback());
        }
        let subs;
        try {
            subs = JSON.parse(state.val);
        } catch (e) {
            logger.error(hostLogPrefix + ' Cannot parse subscribes: ' + state.val);
            return typeof callback === 'function' && setImmediate(() => callback());
        }
        let modified = false;
        // look for all subscribes from this instance
        for (const pattern in subs) {
            if (!subs.hasOwnProperty(pattern)) continue;
            for (const id in subs[pattern]) {
                if (subs[pattern].hasOwnProperty(id) && id === instance) {
                    modified = true;
                    delete subs[pattern][id];
                }
            }
            let found = false;
            for (const f in subs[pattern]) {
                if (subs[pattern].hasOwnProperty(f)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                modified = true;
                delete subs[pattern];
            }
        }

        if (modified) {
            outputCount++;
            states.setState(autoInstance + '.subscribes', subs, () => (typeof callback === 'function')  && callback());
        } else if (typeof callback === 'function') {
            setImmediate(() => callback());
        }
    });
}

function cleanAutoSubscribes(instance, callback) {
    // instance = 'system.adapter.name.0'
    instance = instance.substring(15); // get name.0

    // read all instances
    objects.getObjectView('system', 'instance', {startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, (err, res) => {
        let count = 0;
        if (res && res.rows) {
            for (let c = res.rows.length - 1; c >= 0; c--) {
                // remove this instance from autoSubscribe
                if (res.rows[c].value.common.subscribable) {
                    count++;
                    cleanAutoSubscribe(instance, res.rows[c].id, () =>
                        !--count && callback && callback());
                }
            }
        }
        !count && callback && callback();
    });
}

function delObjects(objs, callback) {
    if (!objs || !objs.length) {
        typeof callback === 'function' && callback();
    } else {
        const row = objs.shift();
        if (row && row.id) {
            logger.info(hostLogPrefix + ' Delete state "' + row.id + '"');
            if (row.value.type === 'state') {
                states.delState(row.id, (/* err */) =>
                    objects.delObject(row.id, (/* err */) =>
                        setImmediate(() => delObjects(objs, callback))));
            } else {
                objects.delObject(row.id, (/* err */) =>
                    setImmediate(() => delObjects(objs, callback)));
            }
        } else {
            setImmediate(() => delObjects(objs, callback));
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
 * @return none
 */
function checkHost(callback) {
    const objectData = objects.getStatus();
    // only main host controller needs to check/fix the host assignments from the instances
    if (compactGroupController || !objectData.server) {
        callback && callback();
        return;
    }
    objects.getObjectView('system', 'host', {}, (_err, doc) => {
        if (!_err && doc && doc.rows &&
            doc.rows.length === 1 &&
            doc.rows[0].value.common.name !== hostname)
        {
            const oldHostname = doc.rows[0].value.common.name;
            const oldId  = doc.rows[0].value._id;

            // find out all instances and rewrite it to actual hostname
            objects.getObjectView('system', 'instance', {}, (err, doc) => {
                if (err && err.status_code === 404) {
                    typeof callback === 'function' && callback();
                } else if (doc.rows.length === 0) {
                    logger.info(hostLogPrefix + ' no instances found');
                    // no instances found
                    typeof callback === 'function' && callback();
                } else {
                    // reassign all instances
                    changeHost(doc.rows, oldHostname, hostname, () => {
                        logger.info(hostLogPrefix + ' Delete host ' + oldId);

                        // delete host object
                        objects.delObject(oldId, () =>
                            // delete all hosts states
                            objects.getObjectView('system', 'state', {startkey: 'system.host.' + oldHostname + '.', endkey: 'system.host.' + oldHostname + '.\u9999', include_docs: true}, (_err, doc) =>
                                delObjects(doc.rows, () => callback && callback())));
                    });
                }
            });
        } else if (typeof callback === 'function') {
            callback();
        }
    });
}

// collect short diag information
function collectDiagInfo(type, callback) {
    if (type !== 'extended' && type !== 'normal' && type !== 'no-city') {
        callback && callback(null);
    } else {
        objects.getObject('system.config', (err, systemConfig) => {
            objects.getObject('system.meta.uuid', (err, obj) => {
                // create uuid
                if (err || !obj) {
                    obj = {native: {uuid: 'not found'}};
                }
                objects.getObjectView('system', 'host', {}, (_err, doc) => {
                    // we need to show city and country at the beginning, so include it now and delete it later if not allowed.
                    const diag = {
                        uuid:           obj.native.uuid,
                        language:       systemConfig.common.language,
                        country:        '',
                        city:           '',
                        hosts:          [],
                        node:           process.version,
                        arch:           os.arch(),
                        adapters:       {},
                        statesType:     config.states.type, // redis or file
                        objectsType:    config.objects.type // redis or file
                    };
                    if (type === 'extended' || type === 'no-city') {
                        const cpus     = os.cpus();

                        diag.country = systemConfig.common.country;
                        diag.model   = cpus && cpus[0] && cpus[0].model ? cpus[0].model : 'unknown';
                        diag.cpus    = cpus ? cpus.length : 1;
                        diag.mem     = os.totalmem();
                        diag.ostype  = os.type();
                        delete diag.city;
                    }
                    if (type === 'extended') {
                        diag.city = systemConfig.common.city;
                    } else if (type === 'normal') {
                        delete diag.city;
                        delete diag.country;
                    }

                    if (!_err && doc && doc.rows.length) {
                        doc.rows.sort((a, b) => {
                            try {
                                return semver.lt((a && a.value && a.value.common) ? a.value.common.installedVersion : '0.0.0', (b && b.value && b.value.common) ? b.value.common.installedVersion : '0.0.0');
                            } catch (e) {
                                logger.error(hostLogPrefix + ' Invalid versions: ' + ((a && a.value && a.value.common) ? a.value.common.installedVersion : '0.0.0') + '[' + ((a && a.value && a.value.common) ? a.value.common.name : 'unknown') + '] or ' + ((b && b.value && b.value.common) ? b.value.common.installedVersion : '0.0.0') + '[' + ((b && b.value && b.value.common) ? b.value.common.name : 'unknown') + ']');
                                return 0;
                            }
                        });

                        // Read installed versions of all hosts
                        for (let i = 0; i < doc.rows.length; i++) {
                            diag.hosts.push({
                                version:  doc.rows[i].value.common.installedVersion,
                                platform: doc.rows[i].value.common.platform,
                                type:     doc.rows[i].value.native.os.platform
                            });
                        }
                    }
                    objects.getObjectView('system', 'adapter', {}, (__err, doc) => {
                        let visFound = false;
                        if (!_err && doc && doc.rows.length) {
                            // Read installed versions of all adapters
                            for (let i = 0; i < doc.rows.length; i++) {
                                diag.adapters[doc.rows[i].value.common.name] = {
                                    version:  doc.rows[i].value.common.version,
                                    platform: doc.rows[i].value.common.platform
                                };
                                if (doc.rows[i].value.common.name === 'vis') {
                                    visFound = true;
                                }
                            }
                        }
                        // read number of vis datapoints
                        if (visFound) {
                            const visUtils = require('./lib/vis/states');
                            try {
                                visUtils(objects, null, 0, null, (err, points) => {
                                    let total = null;
                                    const tasks = [];
                                    if (points && points.length) {
                                        for (let i = 0; i < points.length; i++) {
                                            if (points[i].id === 'vis.0.datapoints.total') {
                                                total = points[i].val;
                                            }
                                            tasks.push({
                                                _id: points[i].id,
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
                                                    val: points[i].val,
                                                    ack: true
                                                }
                                            });
                                        }
                                    }
                                    if (total !== null) {
                                        diag.vis = total;
                                    }
                                    extendObjects(tasks, () => callback && callback(diag));
                                });
                            } catch (e) {
                                logger.error(hostLogPrefix + ' cannot call visUtils: ' + e);
                                if (typeof callback === 'function') callback(diag);
                            }
                        } else if (typeof callback === 'function') {
                            callback(diag);
                        }
                    });
                });
            });
        });
    }
}

// check if some IPv4 address found. If not try in 30 seconds one more time (max 10 times)
function setIPs(ipList) {
    if (isStopping) return;
    const _ipList = ipList || getIPs();

    // check if IPs detected (because of DHCP delay)
    let found = false;
    for (let a = 0; a < _ipList.length; a++) {
        if (_ipList[a] === '127.0.0.1' || _ipList[a] === '::1/128' || !_ipList[a].match(/^\d+\.\d+\.\d+\.\d+$/)) continue;
        found = true;
        break;
    }
    // IPv4 address still not found, try again in 30 seconds
    if (!found && detectIpsCount < 10) {
        detectIpsCount++;
        setTimeout(() => setIPs(), 30000);
    } else if (found) {
        // IPv4 found => write to object
        objects.getObject('system.host.' + hostname, (err, oldObj) => {
            const networkInterfaces = os.networkInterfaces();

            if (
                !err &&
                oldObj &&
                oldObj.common &&
                (
                    JSON.stringify(oldObj.native.hardware.networkInterfaces) !== JSON.stringify(networkInterfaces) ||
                    JSON.stringify(oldObj.common.address) !== JSON.stringify(_ipList)
                )
            ) {
                oldObj.common.address = _ipList;
                oldObj.native.hardware.networkInterfaces = networkInterfaces;
                oldObj.from = hostObjectPrefix;
                oldObj.ts = Date.now();
                objects.setObject(oldObj._id, oldObj, err => err && logger.error(hostLogPrefix + ' Cannot write host object:' + err));
            }

            // update IP list periodically
            startUpdateIPs();
        });
    } else {
        logger.info(hostLogPrefix + ' No IPv4 address found after 5 minutes.');
    }
}

function extendObjects(tasks, callback) {
    if (!tasks || !tasks.length) {
        return typeof callback === 'function' && callback();
    }
    const task = tasks.shift();
    const state = task.state;
    if (state !== undefined) {
        delete task.state;
    }
    objects.extendObject(task._id, task, () => {
        if (state) {
            states.setState(task._id, state, () => setImmediate(extendObjects, tasks, callback));
        } else {
            setImmediate(extendObjects, tasks, callback);
        }
    });
}

function setMeta() {
    const id = hostObjectPrefix;

    objects.getObject(id, (err, oldObj) => {
        let newObj;
        if (compactGroupController) {
            newObj = {
                _id: id,
                type: 'device',
                common: {
                    name: hostname + compactGroupObjectPrefix + compactGroup,
                    cmd: process.argv[0] + ' ' + (process.execArgv.join(' ') + ' ').replace(/--inspect-brk=\d+ /, '') + process.argv.slice(1).join(' '),
                    hostname: hostname,
                    address: getIPs()
                },
                native: {
                }
            };
        }
        else {
            newObj = {
                _id: id,
                type: 'host',
                common: {
                    name: hostname,
                    title: oldObj && oldObj.common && oldObj.common.title ? oldObj.common.title : ioPackage.common.title,
                    installedVersion: version,
                    platform: ioPackage.common.platform,
                    cmd: process.argv[0] + ' ' + (process.execArgv.join(' ') + ' ').replace(/--inspect-brk=\d+ /, '') + process.argv.slice(1).join(' '),
                    hostname: hostname,
                    address: getIPs(),
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

            if (oldObj && oldObj.common && oldObj.common.icon) {
                newObj.common.icon = oldObj.common.icon;
            }
            if (oldObj && oldObj.common && oldObj.common.color) {
                newObj.common.color = oldObj.common.color;
            }
            // remove dynamic information
            if (newObj.native && newObj.native.hardware && newObj.native.hardware.cpus) {
                for (let c = 0; c < newObj.native.hardware.cpus.length; c++) {
                    if (newObj.native.hardware.cpus[c].times) delete newObj.native.hardware.cpus[c].times;
                }
            }
            if (oldObj && oldObj.native.hardware && oldObj.native.hardware.networkInterfaces) {
                newObj.native.hardware.networkInterfaces = oldObj.native.hardware.networkInterfaces;
            }
        }

        if (oldObj) {
            delete oldObj.cmd;
            delete oldObj.from;
            delete oldObj.ts;
            delete oldObj.acl;
        }

        if (!oldObj || JSON.stringify(newObj) !== JSON.stringify(oldObj)) {
            newObj.from = hostObjectPrefix;
            newObj.ts = Date.now();
            objects.setObject(id, newObj, err => {
                if (err) {
                    logger.error(hostLogPrefix + ' Cannot write host object:' + err);
                } else {
                    setIPs(newObj.common.address);
                }
            });
        } else {
            setIPs(newObj.common.address);
        }
    });

    const tasks = [];
    let obj;

    if (!compactGroupController) {
        obj = {
            _id: id + '.compactModeEnabled',
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
            _id:       id + '.compactgroupProcesses',
            type:      'state',
            common: {
                name:  'Controller - number of compact group controllers',
                type:  'number',
                read:  true,
                write: false,
                min:   0,
                role:  'value',
                unit:  'processes'
            },
            native: {}
        };
        tasks.push(obj);
    }

    obj = {
        _id:       id + '.instancesAsProcess',
        type:      'state',
        common: {
            name:  'Controller - number of instance processes',
            type:  'number',
            read:  true,
            write: false,
            min:   0,
            role:  'value',
            unit:  'processes'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.instancesAsCompact',
        type:      'state',
        common: {
            name:  'Controller - number of instances started in this host process',
            type:  'number',
            read:  true,
            write: false,
            min:   0,
            role:  'value',
            unit:  'instances'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.cpu',
        type:      'state',
        common: {
            name:  'Controller - cpu usage in % of one core',
            type:  'number',
            read:  true,
            write: false,
            min:   0,
            role:  'value',
            unit:  '% of one core'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.cputime',
        type:      'state',
        common: {
            name:  'Controller - accumulated cputime in seconds',
            type:  'number',
            read:  true,
            write: false,
            min:   0,
            role:  'value',
            unit:  'seconds'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.mem',
        type:      'state',
        common: {
            type:  'number',
            role:  'value',
            name:  hostname + ' - memory usage in %',
            unit:  '%',
            read:  true,
            write: false,
            min:   0,
            max:   100
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.memHeapUsed',
        type:      'state',
        common: {
            type:  'number',
            role:  'value',
            name:  'Controller - heap memory used in MB',
            read:  true,
            write: false,
            min:   0,
            unit:  'MB'
        },
        native: {}
    };
    tasks.push(obj);

    if (fs.existsSync('/proc/meminfo')) {
        obj = {
            _id:       id + '.memAvailable',
            type:      'state',
            common: {
                type:  'number',
                role:  'value',
                name:  hostname + ' - available memory from /proc/meminfo in MB',
                read:  true,
                write: false,
                min:   0,
                unit:  'MB'
            },
            native: {}
        };
        tasks.push(obj);
    }

    obj = {
        _id:       id + '.memHeapTotal',
        type:      'state',
        common: {
            type:  'number',
            role:  'value',
            name:  'Controller - heap memory reserved in MB',
            read:  true,
            write: false,
            min:   0,
            unit:  'MB'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.memRss',
        type:      'state',
        common: {
            type:  'number',
            role:  'value',
            name:  'Controller - resident set size memory in MB',
            desc:  'RSS is the resident set size, the portion of the process\'s memory held in RAM',
            read:  true,
            write: false,
            min:   0,
            unit:  'MB'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.uptime',
        type:      'state',
        common: {
            type:  'number',
            role:  'value',
            name:  'Controller - uptime in seconds',
            read:  true,
            write: false,
            min:   0,
            unit:  'seconds'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.load',
        type:      'state',
        common: {
            unit:  '',
            type:  'number',
            role:  'value',
            read:  true,
            write: false,
            name:  hostname + ' - load average 1min'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.alive',
        type:      'state',
        common: {
            name:  hostname + ' - alive status',
            read:  true,
            write: false,
            type:  'boolean',
            role:  'indicator'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.freemem',
        type:      'state',
        common: {
            name:  hostname + ' - available RAM in MB',
            unit:  'MB',
            read:  true,
            write: false,
            type: 'number',
            role: 'value'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.inputCount',
        type:      'state',
        common: {
            name:  'Controller - input level in events/15 seconds',
            desc:  'State\'s inputs in 15 seconds',
            type:  'number',
            read:  true,
            write: false,
            role:  'value',
            unit:  'events/15 seconds'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.outputCount',
        type:      'state',
        common: {
            name:  'Controller - output level in events/15 seconds',
            desc:  'State\'s outputs in 15 seconds',
            type:  'number',
            read:  true,
            write: false,
            role:  'value',
            unit:  'events/15 seconds'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.eventLoopLag',
        type:      'state',
        common: {
            name:  'Controller - The Node.js event loop lag in ms, averaged over 15 seconds',
            desc:  'Average Node.js event loop lag in ms',
            type:  'number',
            read:  true,
            write: false,
            role:  'value',
            unit:  'ms'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:       id + '.zip',
        type:      'channel',
        common: {
            name:  'ZIP files',
            desc:  'Files for download'
        },
        native: {}
    };
    tasks.push(obj);

    obj = {
        _id:    id + '.logLevel',
        type:   'state',
        common: {
            name:   'Controller - Loglevel',
            type:   'string',
            read:   true,
            write:  true,
            desc:   'Loglevel of the host process. Will be set on start with defined value but can be overridden during runtime',
            role:   'state'
        },
        native: {}
    };
    tasks.push(obj);

    config.system.checkDiskInterval  = (config.system.checkDiskInterval !== 0) ? parseInt(config.system.checkDiskInterval, 10) || 300000 : 0;

    if (config.system.checkDiskInterval) {
        obj = {
            _id:       id + '.diskSize',
            type:      'state',
            common: {
                name:  hostname + ' - disk total size',
                desc:  'Disk size of logical volume where the server is installed in MiB',
                type:  'number',
                read:  true,
                write: false,
                role:  'value',
                unit:  'MiB'
            },
            native: {}
        };
        tasks.push(obj);

        obj = {
            _id:       id + '.diskFree',
            type:      'state',
            common: {
                name:  hostname + ' - disk free size',
                desc:  'Free disk size of the logical volume where the server is installed in MiB',
                type:  'number',
                read:  true,
                write: false,
                role:  'value',
                unit:  'MiB'
            },
            native: {}
        };
        tasks.push(obj);

        obj = {
            _id:        id + '.diskWarning',
            type:       'state',
            common: {
                name:   hostname + ' - disk warning level',
                desc:   'Show warning in admin if the free disk space is below this value',
                type:   'number',
                read:   true,
                write:  true,
                def:    5,
                role:   'level',
                unit:   '%'
            },
            native: {}
        };
        tasks.push(obj);
    }

    // delete obsolete states and create new ones
    objects.getObjectView('system', 'state', {startkey: hostObjectPrefix + '.', endkey: hostObjectPrefix + '.\u9999', include_docs: true}, (_err, doc) => {
        // identify existing states for deletion, because they are not in the new tasks-list
        let thishostStates = doc.rows;
        if (!compactGroupController) {
            thishostStates = doc.rows.filter(out1 => !out1.id.includes(hostObjectPrefix + compactGroupObjectPrefix));
        }
        const toDelete = thishostStates.filter(out1 => {
            const found = tasks.find(out2 => out1.id === out2._id);
            return found === undefined;
        });

        if (toDelete && toDelete.length > 0) {
            delObjects(toDelete, () =>
                logger && logger.info(hostLogPrefix + ' Some obsolete host states deleted.'));
        }

        extendObjects(tasks, () => {
            // create UUID if not exist
            if (!compactGroupController) {
                tools.createUuid(objects, uuid => {
                    uuid && logger && logger.info(hostLogPrefix + ' Created UUID: ' + uuid);

                    if (fs.existsSync(VENDOR_BOOTSTRAP_FILE)) {
                        logger && logger.info(hostLogPrefix + ' Detected vendor file: ' + fs.existsSync(VENDOR_BOOTSTRAP_FILE));
                        try {
                            let startScript = fs.readFileSync(VENDOR_BOOTSTRAP_FILE).toString('utf-8');
                            startScript = JSON.parse(startScript);

                            if (startScript.password) {
                                const Vendor = require('./lib/setup/setupVendor');
                                const vendor = new Vendor({objects});

                                logger && logger.info(hostLogPrefix + ' Apply vendor file: ' + VENDOR_FILE);
                                vendor.checkVendor(VENDOR_FILE, startScript.password, logger)
                                    .then(() => {
                                        logger && logger.info(`Vendor information synchronised.`);
                                        try {
                                            fs.existsSync(VENDOR_BOOTSTRAP_FILE) && fs.unlinkSync(VENDOR_BOOTSTRAP_FILE);
                                        } catch (e) {
                                            logger && logger.error(`Cannot delete file ${VENDOR_BOOTSTRAP_FILE}: ${e.toString()}`);
                                        }
                                    }).catch(err => {
                                        logger && logger.error(`Cannot update vendor information: ${JSON.stringify(err.toString())}`);
                                        try {
                                            fs.existsSync(VENDOR_BOOTSTRAP_FILE) && fs.unlinkSync(VENDOR_BOOTSTRAP_FILE);
                                        } catch (e) {
                                            logger && logger.error(`Cannot delete file ${VENDOR_BOOTSTRAP_FILE}: ${e.toString()}`);
                                        }
                                    });
                            }
                        } catch (e) {
                            logger && logger.error(`Cannot parse ${VENDOR_BOOTSTRAP_FILE}: ${e.toString()}`);
                            try {
                                fs.existsSync(VENDOR_BOOTSTRAP_FILE) && fs.unlinkSync(VENDOR_BOOTSTRAP_FILE);
                            } catch (e) {
                                logger && logger.error(`Cannot delete file ${VENDOR_BOOTSTRAP_FILE}: ${e.toString()}`);
                            }
                        }
                    }
                });
            }
        });
    });

}

// Subscribe on message queue
function initMessageQueue() {
    states.subscribeMessage(hostObjectPrefix);
}

// Send message to other adapter instance
function sendTo(objName, command, message, callback) {
    if (typeof message === 'undefined') {
        message = command;
        command = 'send';
    }

    const obj = {command, message, from: hostObjectPrefix};

    if (!objName.startsWith('system.adapter.') && !objName.startsWith('system.host.')) {
        objName = 'system.adapter.' + objName;
    }

    if (callback) {
        if (typeof callback === 'function') {
            obj.callback = {
                message: message,
                id:      callbackId++,
                ack:     false,
                time:    Date.now()
            };
            if (callbackId > 0xFFFFFFFF) {
                callbackId = 1;
            }
            callbacks = callbacks || {};
            callbacks['_' + obj.callback.id] = {cb: callback};
        } else {
            obj.callback     = callback;
            obj.callback.ack = true;
        }
    }

    states.pushMessage(objName, obj);
}

function getVersionFromHost(hostId, callback) {
    states.getState(hostId + '.alive', (err, state) => {
        if (state && state.val)  {
            sendTo(hostId, 'getVersion', null, ioPack =>
                typeof callback === 'function' && setImmediate(callback, ioPack));
        } else {
            logger.warn(hostLogPrefix + ' "' + hostId + '" is offline');
            typeof callback === 'function' && setImmediate(callback, null, hostId);
        }
    });
}
/**
 Helper function that serialize deletion of states
 @param {object} list array with states
 @param {function} cb optional callback
 */
function _deleteAllZipPackages(list, cb) {
    if (!list || !list.length) {
        cb && cb();
    } else {
        states.delBinaryState(list.shift(), _err =>
            setImmediate(() =>
                _deleteAllZipPackages(list, cb)));
    }
}
/**
 This function deletes all ZIP packages that were not downloaded.
 ZIP Package is temporary file, that should be deleted straight after it downloaded and if it still exists, so clear it

 @param {function} cb optional callback
 */
function deleteAllZipPackages(cb) {
    states.getKeys(hostObjectPrefix + '.zip.*',
        (err, list) => _deleteAllZipPackages(list, cb));
}

function startAdapterUpload() {
    if (!uploadTasks.length) return;

    if (!upload) {
        const Upload = require('./lib/setup/setupUpload');
        upload = new Upload({
            states:      states,
            objects:     objects
        });
    }

    const msg = uploadTasks[0].msg;

    const logger = msg.from ? {
        log:   text => states.pushMessage(msg.from, {command: 'log',   text, from: 'system.host.' + hostname}),
        warn:  text => states.pushMessage(msg.from, {command: 'warn',  text, from: 'system.host.' + hostname}),
        error: text => states.pushMessage(msg.from, {command: 'error', text, from: 'system.host.' + hostname}),
    } : null;

    upload.uploadAdapter(uploadTasks[0].adapter, true, true, logger,() =>
        upload.upgradeAdapterObjects(uploadTasks[0].adapter, logger, () =>
            upload.uploadAdapter(uploadTasks[0].adapter, false, true, logger, () => {
                // send response to requester
                msg.callback && msg.from && sendTo(msg.from, msg.command, {result: 'done'}, msg.callback);

                uploadTasks.shift();

                setImmediate(startAdapterUpload);
            })));
}

// Process message to controller, like execute some script
function processMessage(msg) {
    let ioPack;
    // important: Do not forget to update the list of protected commands in iobroker.admin/lib/socket.js for "socket.on('sendToHost'"
    // and iobroker.socketio/lib/socket.js

    logger.debug('Incoming Host message ' + msg.command);
    switch (msg.command) {
        case 'shell':
            if (config.system && config.system.allowShellCommands) {
                logger.info(hostLogPrefix + ' ' + tools.appName + ' ' + ' execute shell command: ' + msg.message);
                exec(msg.message, {windowsHide: true}, (err, stdout, stderr) => {
                    if (err) {
                        return logger.error(`error: ${err}`);
                    }

                    logger.info(`stdout: ${stdout}`);
                    logger.error(`stderr: ${stderr}`);
                });
            } else {
                logger.warn(hostLogPrefix + ' ' + tools.appName + ' ' + ' cannot execute shell command "' + msg.message + '" because not enabled in ' + tools.appName +'.json file');
            }

            break;

        case 'cmdExec': {
            const args = [__dirname + '/' + tools.appName + '.js'];
            if (!msg.message.data) {
                logger.warn(hostLogPrefix + ' ' + tools.appName + ' Invalid cmdExec object. Expected {"data": "command"}');
            } else {
                const cmd = msg.message.data.split(' ');
                for (let i = 0; i < cmd.length; i++) {
                    args.push(cmd[i]);
                }
                logger.info(hostLogPrefix + ' ' + tools.appName + ' ' + args.slice(1).join(' '));

                const child = spawn('node', args, {windowsHide: true});
                if (child.stdout) {
                    child.stdout.on('data', data => {
                        data = data.toString().replace(/\n/g, '');
                        logger.info(hostLogPrefix + ' ' + tools.appName + ' ' + data);
                        msg.from && sendTo(msg.from, 'cmdStdout', {id: msg.message.id, data: data});
                    });
                }

                if (child.stderr) {
                    child.stderr.on('data', data => {
                        data = data.toString().replace(/\n/g, '');
                        logger.error(hostLogPrefix + ' ' + tools.appName + ' ' + data);
                        msg.from && sendTo(msg.from, 'cmdStderr', {id: msg.message.id, data: data});
                    });
                }

                child.on('exit', exitCode => {
                    logger.info(hostLogPrefix + ' ' + tools.appName + ' exit ' + exitCode);
                    if (msg.from) {
                        sendTo(msg.from, 'cmdExit', {id: msg.message.id, data: exitCode});
                        // Sometimes finished command is lost, recent it
                        setTimeout(() => sendTo(msg.from, 'cmdExit', {id: msg.message.id, data: exitCode}), 1000);
                    }
                });
            }

            break;
        }

        case 'getRepository':
            if (msg.callback && msg.from) {
                objects.getObject('system.config', (err, systemConfig) => {
                    // Collect statistics
                    if (systemConfig && systemConfig.common && systemConfig.common.diag) {
                        collectDiagInfo(systemConfig.common.diag, obj => obj && tools.sendDiagInfo(obj));
                    }

                    objects.getObject('system.repositories', (err, repos) => {
                        // Check if repositories exists
                        if (!err && repos && repos.native && repos.native.repositories) {
                            let updateRepo = false;
                            if (typeof msg.message === 'object') {
                                updateRepo  = msg.message.update;
                                msg.message = msg.message.repo;
                            }

                            const active = msg.message || systemConfig.common.activeRepo;

                            if (repos.native.repositories[active]) {

                                if (typeof repos.native.repositories[active] === 'string') {
                                    repos.native.repositories[active] = {
                                        link: repos.native.repositories[active],
                                        json: null
                                    };
                                }

                                // If repo is not yet loaded
                                if (!repos.native.repositories[active].json || updateRepo) {
                                    logger.info(hostLogPrefix + ' Update repository "' + active + '" under "' + repos.native.repositories[active].link + '"');
                                    // Load it
                                    tools.getRepositoryFile(repos.native.repositories[active].link, {
                                        hash: repos.native.repositories[active].hash,
                                        sources: repos.native.repositories[active].json,
                                        controller: version,
                                        node: process.version,
                                        name: tools.appName
                                    }, (err, sources, sourcesHash) => {
                                        if (err) logger.warn(hostLogPrefix + ' warning: ' + err);
                                        if (!sources || !Object.keys(sources).length) {
                                            logger.warn(hostLogPrefix + ' warning: empty repo received!');
                                            if (repos.native.repositories[active].json) {
                                                // We have already repo, give it back
                                                sendTo(msg.from, msg.command, repos.native.repositories[active].json, msg.callback);
                                            } else {
                                                sendTo(msg.from, msg.command, null, msg.callback);
                                            }
                                        } else {
                                            repos.native.repositories[active].json = sources;
                                            repos.native.repositories[active].hash = sourcesHash || '';
                                            sendTo(msg.from, msg.command, repos.native.repositories[active].json, msg.callback);
                                            repos.from = 'system.host.' + tools.getHostName();
                                            repos.ts = Date.now();
                                            // Store uploaded repo
                                            objects.setObject('system.repositories', repos);
                                        }
                                    });
                                } else {
                                    // We have already repo, give it back
                                    sendTo(msg.from, msg.command, repos.native.repositories[active].json, msg.callback);
                                }
                            } else {
                                logger.warn(hostLogPrefix + ' Requested repository "' + active + '" does not exist in config.');
                                sendTo(msg.from, msg.command, null, msg.callback);
                            }
                        }
                    });
                });
            } else {
                logger.error(hostLogPrefix + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getInstalled':
            if (msg.callback && msg.from) {
                // Get list of all hosts
                objects.getObjectView('system', 'host', {}, (err, doc) => {
                    const result = tools.getInstalledInfo(version);
                    result.hosts = {};
                    let infoCount = 0;
                    let timeout = null;

                    if (doc && doc.rows.length) {
                        // Read installed versions of all hosts
                        for (let i = 0; i < doc.rows.length; i++) {
                            // If desired local version, do not ask it, just answer
                            if (doc.rows[i].id === hostObjectPrefix) {
                                let _ioPack;
                                try {
                                    _ioPack = JSON.parse(fs.readFileSync(__dirname + '/io-package.json'));
                                } catch (e) {
                                    logger.error(hostLogPrefix + ' cannot read and parse "' + __dirname + '/io-package.json"');
                                }
                                if (_ioPack) {
                                    _ioPack.common.host = hostname;
                                    _ioPack.common.runningVersion = version;
                                    result.hosts[hostname] = _ioPack.common;
                                } else {
                                    result.hosts[hostname] = {};
                                }
                            } else {
                                infoCount++;
                                getVersionFromHost(doc.rows[i].id, (ioPack, id) => {
                                    if (ioPack) {
                                        result.hosts[ioPack.host] = ioPack;
                                        result.hosts[ioPack.host].controller = true;
                                    }

                                    if (!--infoCount) {
                                        if (timeout) {
                                            clearTimeout(timeout);
                                            timeout = null;
                                            sendTo(msg.from, msg.command, result, msg.callback);
                                        } else {
                                            logger.warn(hostLogPrefix + ' too delayed answer for ' + (ioPack ? ioPack.host : id));
                                        }
                                    }
                                });
                            }
                        }
                    }
                    if (!infoCount) {
                        sendTo(msg.from, msg.command, result, msg.callback);
                    } else {
                        // Start timeout and send answer in 5 seconds if some hosts are offline
                        timeout = setTimeout(() => {
                            logger.warn(hostLogPrefix + ' some hosts are offline');
                            timeout = null;
                            sendTo(msg.from, msg.command, result, msg.callback);
                        }, 5000);
                    }
                });
            } else {
                logger.error(hostLogPrefix + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getInstalledAdapter':
            if (msg.callback && msg.from && msg.message) {
                // read adapter file
                const dir = tools.getAdapterDir(msg.message);
                let _result = null;
                if (fs.existsSync(dir + '/io-package.json')) {
                    try {
                        _result = JSON.parse(fs.readFileSync(dir + '/io-package.json'));
                    } catch (e) {
                        logger.error(hostLogPrefix + ' cannot read and parse "' + dir + '/io-package.json"');
                    }
                }
                sendTo(msg.from, msg.command, _result, msg.callback);
            } else {
                logger.error(hostLogPrefix + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getVersion':
            if (msg.callback && msg.from) {
                ioPack = null;
                try {
                    ioPack = JSON.parse(fs.readFileSync(__dirname + '/io-package.json'));
                } catch (e) {
                    logger.error(hostLogPrefix + ' cannot read and parse "' + __dirname + '/io-package.json"');
                }
                if (ioPack) {
                    ioPack.common.host = hostname;
                    ioPack.common.runningVersion = version;
                    sendTo(msg.from, msg.command, ioPack.common, msg.callback);
                } else {
                    sendTo(msg.from, msg.command, null, msg.callback);
                }
            } else {
                logger.error(hostLogPrefix + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getDiagData':
            if (msg.callback && msg.from) {
                if (msg.message) {
                    collectDiagInfo(msg.message, obj => sendTo(msg.from, msg.command, obj, msg.callback));
                } else {
                    sendTo(msg.from, msg.command, null, msg.callback);
                }
            } else {
                logger.error(hostLogPrefix + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getLocationOnDisk':
            if (msg.callback && msg.from) {
                sendTo(msg.from, msg.command, {path: __dirname, platform: os.platform()}, msg.callback);
            } else {
                logger.error(hostLogPrefix + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getDevList':
            if (msg.callback && msg.from) {
                ioPack = null;

                if (os.platform() === 'linux') {
                    const _args = ['/dev'];
                    logger.info(hostLogPrefix + ' ls /dev');
                    const _child = spawn('ls', _args, {windowsHide: true});
                    let result = '';
                    if (_child.stdout) {
                        _child.stdout.on('data', data => result += data.toString());
                    }
                    if (_child.stderr) {
                        _child.stderr.on('data', data =>
                            logger.error(hostLogPrefix + ' ls ' + data));
                    }

                    _child.on('exit', (/*exitCode*/) => {
                        result = result.replace(/(\r\n|\n|\r|\t)/gm, ' ');
                        const parts = result.split(' ');
                        const resList = [];
                        for (let t = 0; t < parts.length; t++) {
                            parts[t] = parts[t].trim();
                            if (parts[t]) resList.push(parts[t]);
                        }

                        sendTo(msg.from, msg.command, resList, msg.callback);
                    });
                    break;

                } else {
                    sendTo(msg.from, msg.command, null, msg.callback);
                }
            } else {
                logger.error(hostLogPrefix + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getLogs':
            if (msg.callback && msg.from) {
                ioPack = null;

                const lines = msg.message || 200;
                let text  = '';
                let logFile_ = logger.getFileName(); //__dirname + '/log/' + tools.appName + '.log';
                if (!fs.existsSync(logFile_)) {
                    logFile_ = __dirname + '/../../log/' + tools.appName + '.log';
                }

                if (fs.existsSync(logFile_)) {
                    const stats = fs.statSync(logFile_);

                    fs.createReadStream(logFile_, {
                        start: (stats.size > 150 * lines) ? stats.size - 150 * lines : 0,
                        end:   stats.size
                    })
                        .on('data', chunk => text += chunk.toString())
                        .on('end', () => {  // done
                            const lines = text.split('\n');
                            lines.shift();
                            lines.push(stats.size);
                            sendTo(msg.from, msg.command, lines, msg.callback);
                        })
                        .on('error', () => // done
                            sendTo(msg.from, msg.command, [stats.size], msg.callback));
                } else {
                    sendTo(msg.from, msg.command, [0], msg.callback);
                }
            } else {
                logger.error(hostLogPrefix + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getHostInfo':
            if (msg.callback && msg.from) {
                // installed adapters
                // available adapters
                // node.js --version
                // npm --version
                // uptime
                tools.getHostInfo(objects, (err, data) => {
                    if (err) {
                        logger.error(hostLogPrefix + ' cannot get getHostInfo: ' + err);
                    }
                    data = data || {};
                    data.Uptime = Math.round((Date.now() - uptimeStart) / 1000);
                    // add information about running instances
                    let count = 0;
                    for (const id in procs) {
                        if (procs.hasOwnProperty(id) && procs[id].process) {
                            count++;
                        }
                    }
                    data['Active instances'] = count;

                    sendTo(msg.from, msg.command, data, msg.callback);
                });
            } else {
                logger.error(hostLogPrefix + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getHostInfoShort':
            if (msg.callback && msg.from) {
                // same as getHostInfo, but faster because delivers less information
                // node.js --version
                // uptime
                const cpus = os.cpus();
                const data = {
                    Platform:        os.platform(),
                    os:              process.platform,
                    Architecture:    os.arch(),
                    CPUs:            cpus.length,
                    Speed:           cpus[0].speed,
                    Model:           cpus[0].model,
                    RAM:             os.totalmem(),
                    'System uptime': Math.round(os.uptime()),
                    'Node.js':       process.version
                };

                if (data.Platform === 'win32') {
                    data.Platform = 'Windows';
                } else
                if (data.Platform === 'darwin') {
                    data.Platform = 'OSX';
                }

                sendTo(msg.from, msg.command, data, msg.callback);
            } else {
                logger.error(hostLogPrefix + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'delLogs': {
            const logFile = logger.getFileName(); //__dirname + '/log/' + tools.appName + '.log';
            fs.existsSync(__dirname +       '/log/' + tools.appName + '.log') && fs.writeFileSync(__dirname +       '/log/' + tools.appName + '.log', '');
            fs.existsSync(__dirname + '/../../log/' + tools.appName + '.log') && fs.writeFileSync(__dirname + '/../../log/' + tools.appName + '.log', '');
            fs.existsSync(logFile) && fs.writeFileSync(logFile);

            msg.callback && msg.from && sendTo(msg.from, msg.command, null, msg.callback);
            break;
        }

        case 'readDirAsZip':
            if (msg.callback && msg.from) {
                zipFiles = zipFiles || require('./lib/zipFiles');
                zipFiles.readDirAsZip(objects, msg.message.id, msg.message.name, msg.message.options, (err, base64) => {
                    if (base64) {
                        sendTo(msg.from, msg.command, {error: err, data: base64}, msg.callback);
                    } else {
                        sendTo(msg.from, msg.command, {error: err}, msg.callback);
                    }
                });
            }
            break;

        case 'writeDirAsZip':
            zipFiles = zipFiles || require('./lib/zipFiles');
            zipFiles.writeDirAsZip(objects, msg.message.id, msg.message.name, Buffer.from(msg.message.data, 'base64'), msg.message.options, error =>
                msg.callback && msg.from && sendTo(msg.from, msg.command, {error}, msg.callback));

            break;

        case 'readObjectsAsZip':
            if (msg.callback && msg.from) {
                zipFiles = zipFiles || require('./lib/zipFiles');
                zipFiles.readObjectsAsZip(objects, msg.message.id, msg.message.adapter, msg.message.options, (error, base64) => {
                    // If client supports file via link
                    if (msg.message.link) {
                        if (!error) {
                            const buff = Buffer.from(base64, 'base64');
                            states.setBinaryState(hostObjectPrefix + '.zip.' + msg.message.link, buff, err => {
                                if (err) {
                                    sendTo(msg.from, msg.command, {error: err}, msg.callback);
                                } else {
                                    sendTo(msg.from, msg.command, hostObjectPrefix + '.zip.' + msg.message.link, msg.callback);
                                }
                            });
                        } else {
                            sendTo(msg.from, msg.command, {error}, msg.callback);
                        }
                    } else {
                        if (base64) {
                            sendTo(msg.from, msg.command, {error, data: base64}, msg.callback);
                        } else {
                            sendTo(msg.from, msg.command, {error}, msg.callback);
                        }
                    }
                });
            }
            break;

        case 'writeObjectsAsZip':
            zipFiles = zipFiles || require('./lib/zipFiles');
            zipFiles.writeObjectsAsZip(objects, msg.message.id, msg.message.adapter, Buffer.from(msg.message.data, 'base64'), msg.message.options, error =>
                msg.callback && msg.from && sendTo(msg.from, msg.command, {error}, msg.callback));
            break;

        case 'checkLogging':
            (function () {
                // this is temporary function to check the logging functionality
                // Print all information into log
                let logs  = [];

                // LogList
                logs.push('Actual Loglist - ' + JSON.stringify(logList));

                // Read current state of all log subscribers
                states.getKeys('*.logging', (err, keys) => {
                    if (keys && keys.length) {
                        states.getStates(keys, (err, obj) => {
                            if (obj) {
                                for (let i = 0; i < keys.length; i++) {
                                    // We can JSON.parse, but index is 16x faster
                                    if (obj[i]) {
                                        const id = keys[i].substring(0, keys[i].length - '.logging'.length).replace(/^io\./, '');

                                        if ((typeof obj[i] === 'string' && (obj[i].indexOf('"val":true') !== -1 || obj[i].indexOf('"val":"true"') !== -1)) ||
                                            (typeof obj[i] === 'object' && (obj[i].val === true || obj[i].val === 'true'))) {
                                            logs.push('Subscriber - ' + id + ' ENABLED');
                                        } else {
                                            logs && logs.push('Subscriber - ' + id + ' (disabled)');
                                        }
                                    }
                                }
                            }
                            setTimeout(() => {
                                for (let m = 0; m < logs.length; m++) {
                                    logger.error(hostLogPrefix + ' LOGINFO: ' + logs[m]);
                                }
                                logs = [];
                            }, 3000);
                        });
                    }
                });

                // Get list of all active adapters and send them message with command checkLogging
                for (const _id in procs) {
                    if (procs.hasOwnProperty(_id) && procs[_id].process) {
                        outputCount++;
                        states.setState(_id + '.checkLogging', {val: true, ack: false, from: hostObjectPrefix});
                    }
                }
            })();
            break;

        case 'updateMultihost':
            const result = startMultihost();
            if (msg.callback) {
                sendTo(msg.from, msg.command, {result: result}, msg.callback);
            }
            break;

        case 'getInterfaces':
            if (msg.callback) {
                sendTo(msg.from, msg.command, {result: os.networkInterfaces()}, msg.callback);
            }
            break;

        case 'upload': {
            if (msg.message) {
                uploadTasks.push({adapter: msg.message, msg});
                // start upload if no tasks running
                uploadTasks.length === 1 && startAdapterUpload();
            } else {
                logger.error(hostLogPrefix + ' No adapter name is specified for upload command from  ' + msg.from);
            }
            break;
        }

        case 'rebuildAdapter':
            if (!installQueue.some(entry => entry.id === msg.message.id)) {
                logger.info(hostLogPrefix + ' ' + msg.message.id + ' will be rebuilt');
                installQueue.push({id: msg.message.id, rebuild: true, rebuildViaInstall: msg.message.rebuildViaInstall});
                // start install queue if not started
                installQueue.length === 1 && installAdapters();
            } else {
                logger.info(hostLogPrefix + ' ' + msg.message.id + ' still in installQueue, rebuild will be done with install');
            }
            break;

    }
}

function getInstances() {
    objects.getObjectView('system', 'instance', {}, (err, doc) => {
        if (err && err.status_code === 404) {
            logger.error(hostLogPrefix + ' _design/system missing - call node ' + tools.appName + '.js setup');
            //if (objects.destroy) objects.destroy();
            //if (states  && states.destroy)  states.destroy();
            //process.exit(1);
            return;
        } else if (doc.rows.length === 0) {
            logger.info(hostLogPrefix + ' no instances found');
        } else {
            const _ipArr = getIPs();
            if (!compactGroupController) {
                logger.info(hostLogPrefix + ' ' + doc.rows.length + ' instance' + (doc.rows.length === 1 ? '' : 's') + ' found');
            }
            let count = 0;

            // first mark all instances as disabled to detect disabled once
            for (const id in procs) {
                if (procs.hasOwnProperty(id) && procs[id].config && procs[id].config.common && procs[id].config.common.enabled) {
                    procs[id].config.common.enabled = false;
                }
            }

            for (let i = 0; i < doc.rows.length; i++) {
                const instance = doc.rows[i].value;

                // register all common fields, that may not be deleted, like "mobile" or "history"
                //noinspection JSUnresolvedVariable
                if (objects.addPreserveSettings && instance.common.preserveSettings) {
                    //noinspection JSUnresolvedVariable
                    objects.addPreserveSettings(instance.common.preserveSettings);
                }

                if (instance.common.mode === 'web' || instance.common.mode === 'none') {
                    if (instance.common.host === hostname) {
                        const name = instance._id.split('.')[2];
                        const adapterDir_ = tools.getAdapterDir(name);
                        if (!fs.existsSync(adapterDir_)) {
                            procs[instance._id] = {downloadRetry: 0, config: {common: {enabled: false}}};
                            installQueue.push({id: instance._id, disabled: true, version: instance.common.installedVersion || instance.common.version, installedFrom: instance.common.installedFrom});
                            // start install queue if not started
                            installQueue.length === 1 && installAdapters();
                        }
                    }
                    continue;
                }

                logger.debug(hostLogPrefix + ' check instance "' + doc.rows[i].id  + '" for host "' + instance.common.host + '"');
                console.log(hostLogPrefix + ' check instance "' + doc.rows[i].id  + '" for host "' + instance.common.host + '"');

                if (checkAndAddInstance(instance, _ipArr) && instance.common.enabled && (!instance.common.webExtension || !instance.native.webInstance)) {
                    count++;
                }
            }

            if (count > 0) {
                logger.info(hostLogPrefix + ' starting ' + count + ' instance' + (count > 1 ? 's' : ''));
            } else {
                logger.warn(hostLogPrefix + ' does not start any instances on this host');
            }
        }

        initInstances();
    });
}

/**
 * Checks if an instance is relevant for this host to be considered or not
 * @param instance name of the instance
 * @param _ipArr IP-Array from this host
 * @returns {boolean} instance needs to be handled by this host (true) or not
 */
function instanceRelevantForThisController(instance, _ipArr) {
    // Normalize Compact group configuration
    if (config.system.compact && instance.common.compact) {
        if (instance.common.runAsCompactMode === undefined) instance.common.runAsCompactMode = null; // TODO repo logic!!
        if (instance.common.compactGroup === undefined) instance.common.compactGroup = 1; // run in controller by default
    }

    if (compactGroupController) {
        if (!config.system.compact || !instance.common.compact || !instance.common.runAsCompactMode) return false;
        if (instance.common.runAsCompactMode && instance.common.compactGroup !== compactGroup) return false;
    }
    return true;
}

/**
 * Check if an instance is handled by this host process and initialize internal data structures
 * @param instance name of the instance
 * @param ipArr IP-Array from this host
 * @returns {boolean} instance needs to be handled by this host (true) or not
 */
function checkAndAddInstance(instance, ipArr) {
    if (!ipArr.includes(instance.common.host) && instance.common.host && instance.common.host !== hostname) {
        return false;
    }
    if (instance.deleted) {
        return false;
    }

    // update host name to current host if host name is empty
    if (!instance.common.host) {
        instance.common.host = hostname;
        objects.setObject(instance._id, instance, err =>
            err ?
                logger.error(`Cannot update hostname for ${instance._id}: ${err.toString()}`) :
                logger.info(`Set hostname ${hostname} for ${instance._id}`));

    }

    hostAdapter[instance._id] = hostAdapter[instance._id] || {};
    if (!hostAdapter[instance._id].config) {
        hostAdapter[instance._id].config = JSON.parse(JSON.stringify(instance));
    }

    if (!instanceRelevantForThisController(instance, ipArr)) {
        return false;
    }
    if (config.system.compact && instance.common.compact) {
        if (instance.common.runAsCompactMode) {
            compactProcs[instance.common.compactGroup] = compactProcs[instance.common.compactGroup] || {instances: []};
        }
    }

    if (compactGroupController) {
        logger.debug(hostLogPrefix + ' instance ' + instance._id + ' is managed by this controller');
    }
    procs[instance._id] = procs[instance._id] || {};
    if (!procs[instance._id].config) {
        procs[instance._id].config = JSON.parse(JSON.stringify(instance));
    }
    return true;
}

function initInstances() {
    let seconds = 0;
    const interval = (config.system && config.system.instanceStartInterval) || 2000;
    let id;

    // Start first admin
    for (id in procs) {
        if (!procs.hasOwnProperty(id)) {
            continue;
        }

        if (procs[id].config.common.enabled && (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance)) {
            if (id.startsWith('system.adapter.admin')) {
                // do not process if still running. It will be started when old one will be finished
                if (procs[id].process) {
                    logger.info(hostLogPrefix + ' instance "' + id + '" was not started, because running.');
                    continue;
                }
                if (installQueue.indexOf(id) === -1) {
                    if (procs[id].restartTimer) {
                        clearTimeout(procs[id].restartTimer);
                    }
                    procs[id].restartTimer = setTimeout(_id => startInstance(_id), interval * seconds, id);

                    seconds += 2; // 4 seconds pause between starts
                }
            }
        } else if (procs[id].process) {
            // stop instance if disabled
            stopInstance(id);
        }
    }

    for (id in procs) {
        if (!procs.hasOwnProperty(id)) {
            continue;
        }

        if (procs[id].config.common.enabled && (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance)) {
            if (!id.startsWith('system.adapter.admin')) {
                // do not process if still running. It will be started when old one will be finished
                if (procs[id].process) {
                    logger.info(hostLogPrefix + ' instance "' + id + '" was not started, because already running.');
                    continue;
                }

                if (installQueue.indexOf(id) === -1) {
                    if (procs[id].restartTimer) {
                        clearTimeout(procs[id].restartTimer);
                    }
                    procs[id].restartTimer = setTimeout(_id => startInstance(_id), interval * seconds, id);

                    if (!procs[id].config.common.onlyWWW) {
                        seconds += 2; // 4 seconds pause between starts if not only www files
                    }
                }
            }
        } else {
            const name = id.split('.')[2];
            const adapterDir = tools.getAdapterDir(name);
            if (!fs.existsSync(adapterDir)) {
                procs[id].downloadRetry = procs[id].downloadRetry || 0;
                installQueue.push({id: id, disabled: true, version: procs[id].config.common.installedVersion || procs[id].config.common.version, installedFrom: procs[id].config.common.installedFrom});
                // start install queue if not started
                installQueue.length === 1 && installAdapters();
            }
        }
    }
}

function checkVersion(id, name, version, instances) {
    let isFound = false;

    if (name === 'js-controller') {
        // Check only version
        if (version !== null) {
            if (!semver.satisfies(ioPackage.common.version, version)) {
                logger.error(hostLogPrefix + ' startInstance ' + id + 'Invalid version of "' + name + '". Installed "' + ioPackage.common.version + '", required "' + version);
                return false;
            } else {
                isFound = true;
            }
        } else {
            isFound = true;
        }
    }
    if (!isFound) {
        const p = Object.keys(instances).find(p => instances[p] && instances[p].common && instances[p].common.name === name);
        if (p) {
            if (version && !semver.satisfies(instances[p].common.version, version)) {
                logger.error(hostLogPrefix + ' startInstance ' + id + ': required adapter "' + name + '" has wrong version. Installed "' + instances[p].common.version + '", required "' + version + '"!');
                return false;
            }
            isFound = true;
        }
    }

    if (!isFound) {
        logger.error(hostLogPrefix + ' startInstance ' + id + ': required adapter "' + name + '" not found!');
        return false;
    } else {
        return true;
    }
}

function checkVersions(id, deps) {
    return new Promise((resolve, reject) => {
        objects.getObjectView('system', 'instance', {startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, (err, res) => {
            const instances = {};
            if (res && res.rows) {
                res.rows.forEach(item => instances[item.value._id] = item.value);
            }
            try {
                if (deps instanceof Array) {
                    for (let d = 0; d < deps.length; deps++) {
                        let version = null;
                        let name = null;
                        if (typeof deps[d] === 'object') {
                            for (const n in deps[d]) {
                                if (!deps[d].hasOwnProperty(n)) continue;
                                name = n;
                                version = deps[d][n];
                                break;
                            }
                        } else {
                            name = deps[d];
                        }
                        if (!checkVersion(id, name, version, instances)) {
                            return reject();
                        }
                    }
                } else if (typeof deps === 'object') {
                    if (deps.length !== undefined || deps[0]) {
                        for (const i in deps) {
                            if (!deps.hasOwnProperty(i)) continue;
                            if (Object.keys(deps[i]).find(name => !checkVersion(id, name, deps[name][i], instances))) {
                                return reject();
                            }
                        }
                    } else {
                        if (Object.keys(deps).find(name => !checkVersion(id, name, deps[name], instances))) {
                            return reject();
                        }
                    }
                }
            } catch (e) {
                logger.error(hostLogPrefix + ' startInstance ' + id + ' [checkVersions]: ' + e);
                logger.error(hostLogPrefix + ' startInstance ' + id + ' [checkVersions]: ' + JSON.stringify(deps));
                return reject();
            }
            resolve();
        });
    });
}

// Store process IDS to make possible kill them all by restart
function storePids() {
    if (!storeTimer) {
        storeTimer = setTimeout(() => {
            storeTimer = null;
            const pids = [];
            for (const id in procs) {
                if (!procs.hasOwnProperty(id)) continue;

                if (procs[id].process && procs[id].process.pid && !procs[id].startedAsCompactGroup) {
                    pids.push(procs[id].process.pid);
                }
            }
            for (const id in compactProcs) {
                if (!compactProcs.hasOwnProperty(id)) continue;

                if (compactProcs[id].process && compactProcs[id].process.pid) {
                    pids.push(compactProcs[id].process.pid);
                }
            }
            pids.push(process.pid);
            try {
                fs.writeFileSync(__dirname + '/pids.txt', JSON.stringify(pids));
            }
            catch (err) {
                logger.error(hostLogPrefix + ' could not store process id list in ' + __dirname + '/pids.txt! Please check permissions and user ownership of this file. Was ioBroker started as a different user? Please also check left over processes when stopping ioBroker!\n' + err);
                logger.error(hostLogPrefix + ' Please consider running the installation fixer when on Linux.');
            }
        }, 1000);
    }
}

function installAdapters() {
    if (!installQueue.length) return;

    const task = installQueue[0];
    if (task.inProgress) return;
    let name = task.id.split('.')[2];
    if (task.version && !task.rebuild) {
        name += '@' + task.version;
    }

    const commandScope = task.rebuild ? 'rebuild' : 'install';
    if (compactGroupController && !task.rebuild) {
        logger.info(hostLogPrefix + ' adapter ' + name + ' is not installed, installation will be handled by main controller ... waiting ');
        setImmediate(() => {
            installQueue.shift();
            installAdapters();
        });
        return;
    }

    if (procs[task.id].downloadRetry < 4) {
        procs[task.id].downloadRetry++;

        if (task.rebuild) {
            logger.warn(hostLogPrefix + ' adapter "' + name + '" seems to be installed for a different version of Node.js. Trying to rebuild it... ' + procs[task.id].downloadRetry + ' attempt');
        } else {
            logger.warn(hostLogPrefix + ' startInstance cannot find adapter "' + name + '". Try to install it... ' + procs[task.id].downloadRetry + ' attempt');
        }

        const installArgs = [];
        if (!task.rebuild && task.installedFrom && procs[task.id].downloadRetry < 3) {
            // two tries with installed location, afterwards we try normal npm version install
            if (task.installedFrom.includes('://')) {
                installArgs.push('url');
                installArgs.push(task.installedFrom);
                installArgs.push(task.id.split('.')[2]);
            }
            else {
                installArgs.push('install');
                let installedFrom = task.installedFrom;
                if (installedFrom.startsWith(tools.appName + '.')) {
                    installedFrom = installedFrom.substr(tools.appName.length + 1);
                }
                installArgs.push(installedFrom);
            }
        }
        else {
            installArgs.push(commandScope);
            installArgs.push(name);
            if (task.rebuildViaInstall) {
                installArgs.push('--install');
            }
        }
        logger.info(hostLogPrefix + ' ' + tools.appName + ' ' + installArgs.join(' ') + (task.rebuild ? '' : ' using ' + ((procs[task.id].downloadRetry < 3 && task.installedFrom) ? 'installedFrom' : 'installedVersion')));
        installArgs.unshift(__dirname + '/' + tools.appName + '.js');

        try {
            task.inProgress = true;
            const child = spawn('node', installArgs, {windowsHide: true});
            if (child.stdout) {
                child.stdout.on('data', data => {
                    data = data.toString().replace(/\n/g, '');
                    logger.info(hostLogPrefix + ' ' + tools.appName + ' npm-' + commandScope + ': ' + data);
                });
            }
            if (child.stderr) {
                child.stderr.on('data', data => {
                    data = data.toString().replace(/\n/g, '');
                    logger.error(hostLogPrefix + ' ' + tools.appName + ' npm-' + commandScope + ': ' + data);
                });
            }

            child.on('exit', exitCode => {
                logger.info(hostLogPrefix + ' ' + tools.appName + ' npm-' + commandScope + ': exit ' + exitCode);
                installQueue.shift();
                if (exitCode === EXIT_CODES.CANNOT_INSTALL_NPM_PACKET) {
                    task.inProgress = false;
                    installQueue.push(task); // We add at the end again to try three times
                } else {
                    procs[task.id].needsRebuild = false;
                    if (!task.disabled) {
                        if (!procs[task.id].config.common.enabled) {
                            logger.info(hostLogPrefix + ' startInstance ' + task.id + ': instance is disabled but should be started, re-enabling it');
                            states.setState(task.id + '.alive', {val: true, ack: false, from: hostObjectPrefix});
                        }
                        else if (task.rebuild) {
                            // on rebuild we send a restart signal via object change to also reach compact group processes
                            objects.extendObject(task.id, {})
                        }
                        else {
                            startInstance(task.id, task.wakeUp);
                        }
                    } else {
                        logger.debug(hostLogPrefix + ' ' + tools.appName + ' ' + commandScope + ' successful but the instance is disabled');
                    }
                }

                setTimeout(() => {
                    installAdapters();
                }, 1000);
            });
            child.on('error', err => {
                logger.error(hostLogPrefix + ' Cannot execute "' + __dirname + '/' + tools.appName + '.js ' + commandScope + ' ' + name + ': ' + err);
                setTimeout(() => {
                    installQueue.shift();
                    installAdapters();
                }, 1000);
            });
        } catch (err) {
            logger.error(hostLogPrefix + ' Cannot execute "' + __dirname + '/' + tools.appName + '.js ' + commandScope + ' ' + name + ': ' + err);
            setTimeout(() => {
                installQueue.shift();
                installAdapters();
            }, 1000);
        }
    } else {
        if (task.rebuild) {
            logger.error(hostLogPrefix + ' Cannot rebuild adapter "' + name + '". To retry it disable/enable the adapter or restart host. Also check the error messages in the log or execute "npm install --production" in adapter directory manually!');
        } else {
            logger.error(hostLogPrefix + ' Cannot download and install adapter "' + name + '". To retry it disable/enable the adapter or restart host. Also check the error messages in the log!');
        }
        setTimeout(() => {
            installQueue.shift();
            installAdapters();
        }, 500);
    }
}

function cleanErrors(procObj, now, doOutput) {
    if (!procObj || !procObj.errors || !procObj.errors.length || procObj.startedAsCompactGroup) return;

    now = now || Date.now();

    if (!doOutput && procObj.lastCleanErrors && now - procObj.lastCleanErrors < 1000) return;

    procObj.lastCleanErrors = now;

    // output of errors into log
    if (doOutput) {
        for (let i = 0; i < procObj.errors.length; i++) {
            if (procObj.errors[i] && now - procObj.errors[i].ts < 30000 && procObj.errors[i].text) {
                const lines = procObj.errors[i].text.replace('\x1B[31merror\x1B[39m:', '').replace('\x1B[34mdebug\x1B[39m:', 'debug:').split('\n');
                for (let k = 0; k < lines.length; k++) {
                    if (lines[k]) {
                        logger.error(hostLogPrefix + ' Caught by controller[' + i + ']: ' + lines[k]);
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

function startScheduledInstance(callback) {
    const idsToStart = Object.keys(scheduledInstances);
    if (!idsToStart.length) {
        callback && callback();
        return;
    }
    let skipped = false;
    const id = idsToStart[0];
    const fileNameFull = scheduledInstances[idsToStart[0]].fileNameFull;
    const wakeUp = scheduledInstances[idsToStart[0]].wakeUp;

    if (procs[id]) {
        const instance = procs[id].config;

        // After sleep of PC all scheduled runs come together. There is no need to run it X times in one second. Just the last.
        if (!procs[id].lastStart || Date.now() - procs[id].lastStart >= 2000) {
            // Remember the last run
            procs[id].lastStart = Date.now();
            if (!procs[id].process) {
                states.setState(instance._id + '.sigKill', {val: 0, ack: false, from: hostObjectPrefix}); // reset sigKill to 0 if it was set to an other value from "once run"
                const args = [instance._id.split('.').pop(), instance.common.loglevel || 'info'];
                procs[id].process = cp.fork(fileNameFull, args, {windowsHide: true});
                storePids(); // Store all pids to make possible kill them all
                logger.info(hostLogPrefix + ' instance ' + instance._id + ' started with pid ' + procs[instance._id].process.pid);

                procs[id].process.on('exit', (code, signal) => {
                    outputCount++;
                    states.setState(id + '.alive', {val: false, ack: true, from: hostObjectPrefix});
                    if (signal) {
                        logger.warn(hostLogPrefix + ' instance ' + id + ' terminated due to ' + signal);
                    } else if (code === null) {
                        logger.error(hostLogPrefix + ' instance ' + id + ' terminated abnormally');
                    } else {
                        code = parseInt(code, 10);
                        const text = `${hostLogPrefix} instance ${id} terminated with code ${code} (${getErrorText(code) || ''})`;
                        if (!code || code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION || code === EXIT_CODES.NO_ERROR) {
                            logger.info(text);
                        } else {
                            logger.error(text);
                        }
                    }
                    if (procs[id] && procs[id].process) {
                        delete procs[id].process;
                    }
                    storePids(); // Store all pids to make possible kill them all
                });
            } else {
                !wakeUp && logger.warn(hostLogPrefix + ' instance ' + instance._id + ' already running with pid ' + procs[id].process.pid);
                skipped = true;
            }
        } else {
            logger.warn(hostLogPrefix + ' instance ' + instance._id + ' does not started, because just executed');
            skipped = true;
        }
    } else {
        logger.error(hostLogPrefix + ' scheduleJob: Task deleted (' + id + ')');
        skipped = true;
    }

    let delay = (config.system && config.system.instanceStartInterval) || 2000;
    delay = skipped ? 0 : delay + 2000;
    setTimeout(() => {
        delete scheduledInstances[id];
        startScheduledInstance(callback);
    }, delay); // 4 seconds pause
}

function startInstance(id, wakeUp) {
    if (isStopping || !connected) return;

    if (!procs[id]) {
        logger.error(hostLogPrefix + ' startInstance ' + id + ': object not found!');
        return;
    }

    const instance = procs[id].config;
    const name = id.split('.')[2];
    let mode = instance.common.mode;

    if (procs[id].restartTimer) {
        clearTimeout(procs[id].restartTimer);
        delete procs[id].restartTimer;
    }

    if (wakeUp) {
        mode = 'daemon';
    }

    //noinspection JSUnresolvedVariable
    if (instance.common.wakeup) {
        // TODO
    }

    // Check if all required adapters installed and have valid version
    if (instance.common.dependencies) {
        return checkVersions(id, instance.common.dependencies)
            .then(ok => {
                delete instance.common.dependencies;
                startInstance(id, wakeUp);
            })
            .catch(() => {
                // do nothing
                // Do not start this instance
            });
    }

    let fileName = instance.common.main || 'main.js';
    const adapterDir_ = tools.getAdapterDir(name);
    if (!fs.existsSync(adapterDir_)) {
        procs[id].downloadRetry = procs[id].downloadRetry || 0;
        logger.debug(hostLogPrefix + ' startInstance Queue ' + id + ' for installation');
        installQueue.push({id: id, version: instance.common.installedVersion || instance.common.version, installedFrom: instance.common.installedFrom, wakeUp: wakeUp});
        // start install queue if not started
        if (installQueue.length === 1) installAdapters();
        return;
    }

    const args = (instance && instance._id && instance.common) ? [instance._id.split('.').pop(), instance.common.loglevel || 'info'] : [0, 'info'];

    // define memory limit for adapter
    //noinspection JSUnresolvedVariable
    if (instance.common.memoryLimitMB && parseInt(instance.common.memoryLimitMB, 10)) {
        //noinspection JSUnresolvedVariable
        args.push('--max-old-space-size=' + parseInt(instance.common.memoryLimitMB, 10));
    }

    let fileNameFull = path.join(adapterDir_ , fileName);

    // workaround for old vis.
    if (instance.common.onlyWWW && name === 'vis') {
        instance.common.onlyWWW = false;
    }

    if (instance.common.mode !== 'extension' && (instance.common.onlyWWW || !fs.existsSync(fileNameFull))) {
        fileName = name + '.js';
        fileNameFull = path.join(adapterDir_,fileName);
        if (instance.common.onlyWWW || !fs.existsSync(fileNameFull)) {
            // If not just www files
            if (instance.common.onlyWWW || fs.existsSync(path.join(adapterDir_, 'www'))) {
                logger.debug(hostLogPrefix + ' startInstance ' + name + '.' + args[0] + ' only WWW files. Nothing to start');
            } else {
                logger.error(hostLogPrefix + ' startInstance ' + name + '.' + args[0] + ': cannot find start file!');
            }
            return;
        }
    }
    procs[id].downloadRetry = 0;

    // read node.js engine requirements
    try {
        // read directly from disk and not via require to allow "on the fly" updates of adapters.
        let p = fs.readFileSync(adapterDir_ + '/package.json');
        p = JSON.parse(p.toString());
        procs[id].engine = p && p.engines && p.engines.node;
    } catch (e) {
        logger.error(`${hostLogPrefix} startInstance ${name}.${args[0]}: Cannot read and parse "${adapterDir}/package.json"`);
    }

    // check node.js version if defined in package.json
    if (procs[id].engine) {
        if (!semver.satisfies(process.version.replace(/^v/, ''), procs[id].engine)) {
            logger.warn(`${hostLogPrefix} startInstance ${name}.${args[0]}: required node.js version ${procs[id].engine}, actual version ${process.version}`);
            // disable instance
            objects.getObject(id, (err, obj) => {
                if (obj && obj.common && obj.common.enabled) {
                    obj.common.enabled = false;
                    objects.setObject(obj._id, obj, _err =>
                        logger.warn(`${hostLogPrefix} startInstance ${name}.${args[0]}: instance disabled because of node.js version mismatch`));
                }
            });
            return;
        }
    }

    //noinspection JSUnresolvedVariable
    if (instance.common.subscribe || instance.common.wakeup) {
        procs[id].subscribe = instance.common.subscribe || (instance._id + '.wakeup');
        const parts = instance._id.split('.');
        const instanceId = parts[parts.length - 1];
        procs[id].subscribe = procs[id].subscribe.replace('<INSTANCE>', instanceId);

        if (subscribe[procs[id].subscribe]) {
            if (subscribe[procs[id].subscribe].indexOf(id) === -1) {
                subscribe[procs[id].subscribe].push(id);
            }
        } else {
            subscribe[procs[id].subscribe] = [id];

            // Subscribe on changes
            if (procs[id].subscribe.match(/^messagebox\./)) {
                states.subscribeMessage(procs[id].subscribe.substring('messagebox.'.length));
            } else {
                states.subscribe(procs[id].subscribe);
            }
        }
    }

    procs[id].startedInCompactMode = false;
    procs[id].startedAsCompactGroup = false;

    switch (mode) {
        case 'once':
        case 'daemon':
            if (procs[id] && !procs[id].process) {
                allInstancesStopped = false;
                if (procs[id].stopping) {
                    delete procs[id].stopping;
                }

                logger.debug(hostLogPrefix + ' startInstance ' + name + '.' + args[0] + ' loglevel=' + args[1] + ', compact=' + (instance.common.compact && instance.common.runAsCompactMode ? 'true (' +  instance.common.compactGroup + ')' : 'false'));
                // Exit Handler for normal Adapters started as own processes
                const exitHandler = (code, signal) => {
                    outputCount += 2;
                    states.setState(id + '.alive',     {val: false, ack: true, from: hostObjectPrefix});
                    states.setState(id + '.connected', {val: false, ack: true, from: hostObjectPrefix});

                    // if we have waiting kill timeouts from stopInstance clear them
                    // and call callback because process ended now
                    if (stopTimeouts[id] && stopTimeouts[id].timeout) {
                        clearTimeout(stopTimeouts[id].timeout);
                        stopTimeouts[id].timeout = null;
                        if (stopTimeouts[id].callback && typeof stopTimeouts[id].callback === 'function') {
                            stopTimeouts[id].callback();
                            stopTimeouts[id].callback = null;
                        }
                    }

                    cleanAutoSubscribes(id, () => {
                        if (procs[id] && procs[id].config && procs[id].config.common.logTransporter) {
                            outputCount++;
                            console.log(`================================== > LOG REDIRECT ${id} => false [Process stopped]`);
                            states.setState(id + '.logging', {val: false, ack: true, from: hostObjectPrefix});
                        }

                        // show stored errors
                        cleanErrors(procs[id], null, code !== EXIT_CODES.START_IMMEDIATELY_AFTER_STOP_HEX && code !== EXIT_CODES.START_IMMEDIATELY_AFTER_STOP && code !== EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);

                        if (mode !== 'once') {
                            if (signal) {
                                logger.warn(hostLogPrefix + ' instance ' + id + ' terminated due to ' + signal);
                            } else if (code === null) {
                                logger.error(hostLogPrefix + ' instance ' + id + ' terminated abnormally');
                            }

                            if ((procs[id] && procs[id].stopping) || isStopping || wakeUp) {
                                logger.info(hostLogPrefix + ' instance ' + id + ' terminated with code ' + code + ' (' + (getErrorText(code) || '') + ')');
                                if (procs[id].stopping !== undefined) {
                                    delete procs[id].stopping;
                                }

                                if (procs[id].process) {
                                    delete procs[id].process;
                                }

                                if (isStopping) {
                                    logger.silly(hostLogPrefix + ' Check Stopping ' + id);
                                    for (const i in procs) {
                                        if (!procs.hasOwnProperty(i)) continue;
                                        if (procs[i].process) {
                                            logger.silly(hostLogPrefix + ' ' + procs[i].config.common.name + ' still running');
                                            return;
                                        }
                                    }
                                    for (const i in compactProcs) {
                                        if (!compactProcs.hasOwnProperty(i)) continue;
                                        if (compactProcs[i].process) {
                                            logger.silly(hostLogPrefix + ' Compact group ' + i + ' still running');
                                            return;
                                        }
                                    }
                                    logger.info(hostLogPrefix + ' All instances are stopped.');
                                    allInstancesStopped = true;
                                }
                                storePids(); // Store all pids to make possible kill them all
                                return;
                            } else {
                                //noinspection JSUnresolvedVariable
                                if (code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION) {
                                    logger.error(`${hostLogPrefix} instance ${id} terminated by request of the instance itself and will not be restarted, before user restarts it.`);
                                } else
                                if (code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP_HEX /* -100 */ && procs[id] && procs[id].config && procs[id].config.common.restartSchedule) {
                                    logger.info(hostLogPrefix + ' instance ' + id + ' scheduled normal terminated and will be started anew.');
                                } else {
                                    code = parseInt(code, 10);
                                    const text = `${hostLogPrefix} instance ${id} terminated with code ${code} (${getErrorText(code) || ''})`;
                                    if (!code || code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION || code === EXIT_CODES.NO_ERROR || code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP || code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP_HEX) {
                                        logger.info(text);
                                    } else {
                                        logger.error(text);
                                    }
                                }
                            }
                        }

                        if (procs[id] && procs[id].process) {
                            delete procs[id].process;
                        }

                        if (procs[id].needsRebuild) {
                            procs[id].rebuildCounter = procs[id].rebuildCounter || 0;
                            procs[id].rebuildCounter++;
                            if (procs[id].rebuildCounter < 4) {
                                logger.info(hostLogPrefix + ' Adapter ' + id + ' needs rebuild and will be restarted afterwards.');
                                const msg = {
                                    command: 'rebuildAdapter',
                                    message: {
                                        id: instance._id,
                                        rebuildViaInstall: procs[id].rebuildCounter > 1
                                    }
                                };
                                if (!compactGroupController) { // execute directly
                                    processMessage(msg);
                                } else { // send to main controller to make sure only one npm process runs at a time
                                    sendTo('system.host.' + hostname, 'rebuildAdapter', msg);
                                }
                            } else {
                                logger.info(hostLogPrefix + ' Rebuild for adapter ' + id + ' not successful in 3 tries. Adapter will not be restarted again. Please execute "npm install --production" in adapter directory manually.');
                            }
                        } else {
                            procs[id].rebuildCounter = 0;
                            if (code !== EXIT_CODES.ADAPTER_REQUESTED_TERMINATION &&
                                !wakeUp &&
                                connected &&
                                !isStopping &&
                                procs[id] &&
                                procs[id].config &&
                                procs[id].config.common &&
                                procs[id].config.common.enabled &&
                                (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance) &&
                                mode !== 'once'
                            ) {
                                logger.info(hostLogPrefix + ' Restart adapter ' + id + ' because enabled');

                                const restartTimerExisting = !!procs[id].restartTimer;
                                //noinspection JSUnresolvedVariable
                                if (procs[id].restartTimer) {
                                    clearTimeout(procs[id].restartTimer);
                                }
                                procs[id].restartTimer = setTimeout(_id => startInstance(_id),
                                    code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP_HEX ? 1000 : ((procs[id].config.common.restartSchedule || restartTimerExisting) ? 1000 : 30000), id);
                                // 4294967196 (-100) is special code that adapter wants itself to be restarted immediately
                            } else {
                                if (code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION) {
                                    logger.info(`${hostLogPrefix} Do not restart adapter ${id} because desired by instance`);
                                } else
                                if (mode !== 'once') {
                                    logger.info(`${hostLogPrefix} Do not restart adapter ${id} because disabled or deleted`);
                                } else {
                                    logger.info(`${hostLogPrefix} instance ${id} terminated while should be started once`);
                                }
                            }
                        }

                        storePids(); // Store all pids to make possible kill them all
                    });
                };

                // If system has compact mode enabled and adapter supports it and instance has it enabled
                if (config.system.compact && instance.common.compact && instance.common.runAsCompactMode) {
                    // compactgroup = 0 is executed by main js.controller, all others as own processes
                    if (
                        (!compactGroupController && instance.common.compactGroup === 0) ||
                        (compactGroupController && instance.common.compactGroup !== 0)
                    ) {
                        states.setState(id + '.sigKill', {val: 0, ack: false, from: hostObjectPrefix}); // set to 0 to stop any pot. already running instances, especially broken compactModes

                        const _instance = (instance && instance._id && instance.common) ? instance._id.split('.').pop() || 0 : 0;
                        const logLevel = (instance && instance._id && instance.common) ? instance.common.loglevel || 'info' : 'info';
                        if (fileNameFull) {
                            try {
                                decache = decache || require('decache');
                                decache(path.join(__dirname,'lib','adapter.js'));
                                decache(fileNameFull);

                                procs[id].process = {
                                    logic: require(fileNameFull)({
                                        logLevel,
                                        compactInstance: _instance,
                                        compact: true
                                    })
                                };
                                procs[id].process.logic.on('exit', exitHandler);

                                procs[id].startedInCompactMode = true;
                            } catch (e) {
                                logger.error(`${hostLogPrefix} Cannot start ${name}.${_instance} in compact mode. Fallback to normal start! : ${e.message}`);
                                logger.error(e.stackTrace);
                                procs[id].process && delete procs[id].process;
                                states.setState(id + '.sigKill', {val: -1, ack: false, from: hostObjectPrefix}); // if started let it end itself
                            }
                        }
                        else {
                            logger.warn(`${hostLogPrefix} Cannot start ${name}.${_instance} in compact mode: Filename invalid`);
                        }

                        if (procs[id].process && !procs[id].process.kill) {
                            procs[id].process.kill = () => states.setState(id + '.sigKill', {val: -1, ack: false, from: hostObjectPrefix});
                        }
                    }
                    else {
                        // a group controller for this group is not yet started, execute one
                        if (!compactProcs[instance.common.compactGroup].process) {
                            const compactControllerArgs = [instance.common.compactGroup];

                            //noinspection JSUnresolvedVariable
                            if (instance.common.memoryLimitMB && parseInt(instance.common.memoryLimitMB, 10)) {
                                //noinspection JSUnresolvedVariable
                                compactControllerArgs.push('--max-old-space-size=' + parseInt(instance.common.memoryLimitMB, 10));
                            }

                            logger.info(`${hostLogPrefix} start controller for compactgroup ${instance.common.compactGroup}`);

                            compactProcs[instance.common.compactGroup].process = cp.fork(path.join(__dirname, 'compactgroupController.js'), compactControllerArgs, {
                                stdio: ['ignore', 'ignore', 'pipe', 'ipc'],
                                windowsHide: true
                            });

                            if (compactProcs[instance.common.compactGroup].process.stderr) {
                                compactProcs[instance.common.compactGroup].process.stderr.on('data', data => {
                                    if (!data || !compactProcs[instance.common.compactGroup] || typeof compactProcs[instance.common.compactGroup] !== 'object') return;
                                    const text = data.toString();
                                    // show for debug
                                    console.error(text);
                                    compactProcs[instance.common.compactGroup].errors = compactProcs[instance.common.compactGroup].errors || [];
                                    const now = Date.now();
                                    compactProcs[instance.common.compactGroup].errors.push({ts: now, text: text});
                                    // limit output to 300 messages
                                    if (compactProcs[instance.common.compactGroup].errors > 300) {
                                        compactProcs[instance.common.compactGroup].errors.splice(compactProcs[instance.common.compactGroup].errors.length - 300);
                                    }
                                    cleanErrors(compactProcs[instance.common.compactGroup], now);
                                });
                            }

                            const currentCompactGroup = instance.common.compactGroup;
                            // Exit handler for compact groups
                            const groupExitHandler = (code, signal) => {
                                if (signal) {
                                    logger.warn(hostLogPrefix + ' compactgroup controller ' + currentCompactGroup + ' terminated due to ' + signal);
                                } else if (code === null) {
                                    logger.info(hostLogPrefix + ' compactgroup controller ' + currentCompactGroup + ' terminated with code ' + code + ' (' + (getErrorText(code) || '') + ')');
                                } else {
                                    logger.info(hostLogPrefix + ' compactgroup controller ' + currentCompactGroup + ' terminated');
                                }

                                if (compactProcs[currentCompactGroup] && compactProcs[currentCompactGroup].process) {
                                    delete compactProcs[currentCompactGroup].process;
                                }

                                function markCompactInstancesAsStopped(instances, callback) {
                                    if (!instances.length) {
                                        callback && callback();
                                        return;
                                    }

                                    const id = instances.shift();
                                    outputCount += 2;
                                    states.setState(id + '.alive',     {val: false, ack: true, from: hostObjectPrefix});
                                    states.setState(id + '.connected', {val: false, ack: true, from: hostObjectPrefix});

                                    cleanAutoSubscribes(id, () => {
                                        if ((procs[id] && procs[id].stopping) || isStopping) {
                                            if (procs[id].stopping !== undefined) {
                                                delete procs[id].stopping;
                                            }
                                        }
                                        if (procs[id] && procs[id].process) {
                                            delete procs[id].process;
                                        }

                                        markCompactInstancesAsStopped(instances, callback);
                                    });
                                }

                                // mark all instances that should be handled by this controller also as not running.
                                const killedInstances = [];
                                compactProcs[currentCompactGroup].instances.forEach(el => killedInstances.push(el));
                                markCompactInstancesAsStopped(killedInstances, () => {
                                    // show stored errors
                                    cleanErrors(compactProcs[currentCompactGroup], null, true);

                                    if (isStopping) {
                                        logger.silly(hostLogPrefix + ' Check after group exit ' + currentCompactGroup);
                                        for (const i in procs) {
                                            if (!procs.hasOwnProperty(i)) continue;
                                            if (procs[i].process) {
                                                logger.silly(hostLogPrefix + ' ' + procs[i].config.common.name + ' still running');
                                                return;
                                            }
                                        }
                                        for (const i in compactProcs) {
                                            if (!compactProcs.hasOwnProperty(i)) continue;
                                            if (compactProcs[i].process) {
                                                logger.silly(hostLogPrefix + ' Compact group ' + i + ' still running (compact)');
                                                return;
                                            }
                                        }
                                        logger.info(hostLogPrefix + ' All instances are stopped.');
                                        allInstancesStopped = true;

                                        storePids(); // Store all pids to make possible kill them all
                                        return;
                                    }

                                    // Restart group controller because still instances assigned to him, done via startInstance
                                    if (connected && !isStopping && compactProcs[currentCompactGroup].instances.length) {
                                        logger.info(hostLogPrefix + ' Restart compact group controller ' + currentCompactGroup);
                                        logger.debug('Instances: ' + JSON.stringify(compactProcs[currentCompactGroup].instances));

                                        compactProcs[currentCompactGroup].instances.forEach(id => {
                                            //noinspection JSUnresolvedVariable
                                            if (procs[id].restartTimer) {
                                                clearTimeout(procs[id].restartTimer);
                                            }
                                            procs[id].restartTimer = setTimeout(_id => startInstance(_id),
                                                code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP_HEX ? 1000 : (procs[id].config.common.restartSchedule ? 1000 : 30000), id);
                                            // 4294967196 (-100) is special code that adapter wants itself to be restarted immediately
                                        });
                                    } else {
                                        logger.info(`${hostLogPrefix} Do not restart compact group controller ${currentCompactGroup} because no instances assigned to him`);
                                    }
                                    storePids(); // Store all pids to make possible kill them all
                                });
                            };

                            compactProcs[instance.common.compactGroup].process.on('exit', groupExitHandler);
                        }
                        if (!compactProcs[instance.common.compactGroup].instances.includes(id)) {
                            compactProcs[instance.common.compactGroup].instances.push(id);
                        }
                        procs[id].process = compactProcs[instance.common.compactGroup].process;
                        procs[id].startedAsCompactGroup = true;
                    }
                } else {
                    states.setState(id + '.sigKill', {val: 0, ack: false, from: hostObjectPrefix}); // set to 0 to stop any pot. already running instances, especially broken compactModes
                }
                if (!procs[id].process) { // We were not able or should not start as compact mode
                    procs[id].process = cp.fork(fileNameFull, args, {stdio: ['ignore', 'ignore', 'pipe', 'ipc'], windowsHide: true});
                }

                if (!procs[id].startedInCompactMode && !procs[id].startedAsCompactGroup && procs[id].process) {
                    states.setState(id + '.sigKill', {val: procs[id].process.pid, ack: true, from: hostObjectPrefix, expire: 180}); // give 180 seconds to terminate
                }

                // catch error output
                if (!procs[id].startedInCompactMode && !procs[id].startedAsCompactGroup && procs[id].process && procs[id].process.stderr) {
                    procs[id].process.stderr.on('data', data => {
                        if (!data || !procs[id] || typeof procs[id] !== 'object') return;
                        const text = data.toString();
                        // show for debug
                        console.error(text);
                        if (text.includes('NODE_MODULE_VERSION') || text.includes('npm rebuild')) {
                            procs[id].needsRebuild = true;
                        }
                        procs[id].errors = procs[id].errors || [];
                        const now = Date.now();
                        procs[id].errors.push({ts: now, text: text});
                        // limit output to 300 messages
                        if (procs[id].errors > 300) {
                            procs[id].errors.splice(procs[id].errors.length - 300);
                        }
                        cleanErrors(procs[id], now);
                    });
                }

                storePids(); // Store all pids to make possible kill them all

                !procs[id].startedInCompactMode && !procs[id].startedAsCompactGroup && procs[id].process && procs[id].process.on('exit', exitHandler);

                if (!wakeUp && procs[id] && procs[id].process && procs[id].config.common && procs[id].config.common.enabled && (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance) && mode !== 'once') {
                    if (procs[id].startedInCompactMode) {
                        logger.info(`${hostLogPrefix} instance ${instance._id} started in COMPACT mode`);
                    }
                    else if (procs[id].startedAsCompactGroup) {
                        logger.info(`${hostLogPrefix} instance ${instance._id} is handled by compact group controller pid ${procs[id].process.pid}`);
                    }
                    else {
                        logger.info(`${hostLogPrefix} instance ${instance._id} started with pid ${procs[id].process.pid}`);
                    }
                }
            } else {
                !wakeUp && procs[id] && logger.warn(hostLogPrefix + ' instance ' + instance._id + ' ' + (procs[id].stopping ? 'still' : 'already') + ' running with pid ' + procs[id].process.pid);
                if (procs[id].stopping) {
                    delete procs[id].stopping;
                }
            }
            break;

        case 'schedule':
            if (compactGroupController) {
                logger.debug(hostLogPrefix + ' ' + instance._id + ' schedule is not started by compact group controller');
                break;
            }
            if (!instance.common.schedule) {
                logger.error(hostLogPrefix + ' ' + instance._id + ' schedule attribute missing');
                break;
            }

            // cancel current schedule
            if (procs[id].schedule) {
                procs[id].schedule.cancel();
                logger.info(hostLogPrefix + ' instance canceled schedule ' + instance._id);
            }

            procs[id].schedule = schedule.scheduleJob(instance.common.schedule, () => {
                // queue up, but only if not already queued
                scheduledInstances[id] = {
                    fileNameFull,
                    wakeUp
                };
                Object.keys(scheduledInstances).length === 1 && startScheduledInstance();
            });
            logger.info(hostLogPrefix + ' instance scheduled ' + instance._id + ' ' + instance.common.schedule);
            // Start one time adapter by start or if configuration changed
            //noinspection JSUnresolvedVariable
            if (instance.common.allowInit) {
                procs[id].process = cp.fork(fileNameFull, args, {windowsHide: true});
                storePids(); // Store all pids to make possible kill them all
                logger.info(hostLogPrefix + ' instance ' + instance._id + ' started with pid ' + procs[instance._id].process.pid);

                procs[id].process.on('exit', (code, signal) => {
                    cleanAutoSubscribes(id, () => {
                        outputCount++;
                        states.setState(id + '.alive', {val: false, ack: true, from: hostObjectPrefix});
                        if (signal) {
                            logger.warn(hostLogPrefix + ' instance ' + id + ' terminated due to ' + signal);
                        } else if (code === null) {
                            logger.error(hostLogPrefix + ' instance ' + id + ' terminated abnormally');
                        } else {
                            code = parseInt(code, 10);
                            const text = `${hostLogPrefix} instance ${id} terminated with code ${code} (${getErrorText(code) || ''})`;
                            if (!code || code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION || code === EXIT_CODES.NO_ERROR) {
                                logger.info(text);
                            } else {
                                logger.error(text);
                            }
                        }
                        delete procs[id].process;
                        storePids(); // Store all pids to make possible kill them all
                    });
                });
            }

            break;

        case 'extension':
        case 'subscribe':
            break;

        default:
            logger.error(hostLogPrefix + ' ' + instance._id + ' invalid mode');

    }
}

function stopInstance(id, force, callback) {
    if (typeof force === 'function') {
        callback = force;
        force    = false;
    }
    logger.info(hostLogPrefix + ' stopInstance ' + id + ' (force=' + force + ', process=' + (procs[id].process ? 'true' : 'false') + ')');
    if (!procs[id]) {
        logger.warn(hostLogPrefix + ' unknown instance ' + id);
        return typeof callback === 'function' && callback();
    }

    const instance = procs[id].config;
    if (!instance || !instance.common || !instance.common.mode) {
        if (procs[id].process) {
            procs[id].stopping = true;
            if (!procs[id].startedAsCompactGroup) {
                try {
                    procs[id].process.kill();  // call stop directly in adapter.js or call kill of process
                } catch (e) {
                    logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                }
            }
            delete procs[id].process;
        }

        if (procs[id].schedule) {
            procs[id].schedule.cancel();
            delete procs[id].schedule;
        }

        if (procs[id].subscribe) {
            // Remove this id from subsribed on this message
            if (subscribe[procs[id].subscribe] && subscribe[procs[id].subscribe].indexOf(id) !== -1) {
                subscribe[procs[id].subscribe].splice(subscribe[procs[id].subscribe].indexOf(id), 1);

                // If no one subscribed
                if (!subscribe[procs[id].subscribe].length) {
                    // Delete item
                    delete subscribe[procs[id].subscribe];

                    // Unsubscribe
                    if (procs[id].subscribe.match(/^messagebox\./)) {
                        states.unsubscribeMessage(procs[id].subscribe.substring('messagebox.'.length));
                    } else {
                        states.unsubscribe(procs[id].subscribe);
                    }
                }
            }
        }
        return typeof callback === 'function' && callback();
    }

    stopTimeouts[id] = stopTimeouts[id] || {};
    if (stopTimeouts[id] && stopTimeouts[id].timeout) {
        clearTimeout(stopTimeouts[id].timeout);
        stopTimeouts[id].timeout = null;
    }

    switch (instance.common.mode) {
        case 'daemon':
            if (!procs[id].process) {
                if (procs[id].config && procs[id].config.common && procs[id].config.common.enabled && !procs[id].startedAsCompactGroup) {
                    !isStopping && logger.warn(hostLogPrefix + ' stopInstance ' + instance._id + ' not running');
                }
                typeof callback === 'function' && callback();
            } else {
                if (force && !procs[id].startedAsCompactGroup) {
                    logger.info(hostLogPrefix + ' stopInstance forced ' + instance._id + ' killing pid ' + procs[id].process.pid);
                    if (procs[id].process) {
                        procs[id].stopping = true;
                        try {
                            procs[id].process.kill(); // call stop directly in adapter.js or call kill of process
                        } catch (e) {
                            logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                        }
                        delete procs[id].process;
                    }

                    if (typeof callback === 'function') {
                        callback();
                        callback = null;
                    }

                } else
                //noinspection JSUnresolvedVariable
                if (instance.common.messagebox && instance.common.supportStopInstance) {
                    // Send to adapter signal "stopInstance" because on some systems SIGTERM does not work
                    sendTo(instance._id, 'stopInstance', null, result => {
                        if (stopTimeouts[id] && stopTimeouts[id].timeout) {
                            clearTimeout(stopTimeouts[id].timeout);
                            stopTimeouts[id].timeout = null;
                        }
                        logger.info(hostLogPrefix + ' stopInstance self ' + instance._id + ' killing pid ' + procs[id].process.pid + (result ? ': ' + result : ''));
                        if (procs[id] && procs[id].process && !procs[id].startedAsCompactGroup) {
                            procs[id].stopping = true;
                            try {
                                procs[id].process.kill(); // call stop directly in adapter.js or call kill of process
                            } catch (e) {
                                logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                            }
                            delete procs[id].process;
                        }

                        if (stopTimeouts[id] && typeof stopTimeouts[id].callback === 'function') {
                            stopTimeouts[id].callback();
                            stopTimeouts[id].callback = null;
                        }
                    });

                    const timeoutDuration = (instance.common.supportStopInstance === true) ? 1000 : (instance.common.supportStopInstance || 1000);
                    // If no response from adapter, kill it in 1 second
                    stopTimeouts[id].callback = callback;
                    stopTimeouts[id].timeout = setTimeout(() => {
                        if (stopTimeouts[id]) {
                            stopTimeouts[id].timeout = null;
                        }
                        if (procs[id] && procs[id].process && !procs[id].startedAsCompactGroup) {
                            logger.info(hostLogPrefix + ' stopInstance timeout ' + timeoutDuration + ' ' + instance._id + ' killing pid  ' + procs[id].process.pid);
                            procs[id].stopping = true;
                            try {
                                procs[id].process.kill(); // call stop directly in adapter.js or call kill of process
                            } catch (e) {
                                logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                            }
                            delete procs[id].process;
                        } else if (!compactGroupController && procs[id] && procs[id].process) { // was compact mode in an other group
                            delete procs[id].process; // we consider that the other group controler managed to stop it
                        }
                        if (stopTimeouts[id] && typeof stopTimeouts[id].callback === 'function') {
                            stopTimeouts[id].callback();
                            stopTimeouts[id].callback = null;
                        }
                    }, timeoutDuration);
                } else if (!procs[id].startedAsCompactGroup) {
                    states.setState(id + '.sigKill', {val: -1, ack: false, from: hostObjectPrefix}, (err) => { // send kill signal
                        logger.info(hostLogPrefix + ' stopInstance ' + instance._id + ' send kill signal');
                        if (!err) {
                            procs[id].stopping = true;
                            if (typeof callback === 'function') {
                                callback();
                                callback = null;
                            }
                        }
                        const timeoutDuration = instance.common.stopTimeout || 1000;
                        // If no response from adapter, kill it in 1 second
                        stopTimeouts[id].callback = callback;
                        stopTimeouts[id].timeout = setTimeout(() => {
                            if (procs[id]) {
                                procs[id].timeout = null;
                            }
                            if (procs[id] && procs[id].process && !procs[id].startedAsCompactGroup) {
                                logger.info(hostLogPrefix + ' stopInstance ' + instance._id + ' killing pid ' + procs[id].process.pid);
                                procs[id].stopping = true;
                                try {
                                    procs[id].process.kill(); // call stop directly in adapter.js or call kill of process
                                } catch (e) {
                                    logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                                }
                                delete procs[id].process;
                            }
                            if (stopTimeouts[id] && typeof stopTimeouts[id].callback === 'function') {
                                stopTimeouts[id].callback();
                                stopTimeouts[id].callback = null;
                            }
                        }, timeoutDuration);
                    }); // if started let it end itself as first try
                }
                else {
                    delete procs[id].process;
                    if (typeof callback === 'function') {
                        callback();
                        callback = null;
                    }
                }
            }
            break;

        case 'schedule':
            if (!procs[id].schedule) {
                !isStopping && logger.debug(hostLogPrefix + ' stopInstance ' + instance._id + ' not scheduled');
            } else {
                procs[id].schedule.cancel();
                delete procs[id].schedule;
                if (scheduledInstances[id]) {
                    delete scheduledInstances[id];
                }
                logger.info(hostLogPrefix + ' stopInstance canceled schedule ' + instance._id);
            }
            if (typeof callback === 'function') {
                callback();
                callback = null;
            }
            break;

        case 'subscribe':
            // Remove this id from subscribed on this message
            if (subscribe[procs[id].subscribe] && subscribe[procs[id].subscribe].indexOf(id) !== -1) {
                subscribe[procs[id].subscribe].splice(subscribe[procs[id].subscribe].indexOf(id), 1);

                // If no one subscribed
                if (!subscribe[procs[id].subscribe].length) {
                    // Delete item
                    delete subscribe[procs[id].subscribe];

                    // Unsubscribe
                    if (procs[id].subscribe.match(/^messagebox\./)) {
                        states.unsubscribeMessage(procs[id].subscribe.substring('messagebox.'.length));
                    } else {
                        states.unsubscribe(procs[id].subscribe);
                    }
                }
            }

            if (!procs[id].process) {
                typeof callback === 'function' && callback();
            } else {
                logger.info(hostLogPrefix + ' stopInstance ' + instance._id + ' killing pid ' + procs[id].process.pid);
                procs[id].stopping = true;
                try {
                    procs[id].process.kill(); // call stop directly in adapter.js
                } catch (e) {
                    logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                }
                delete procs[id].process;
                if (typeof callback === 'function') {
                    callback();
                    callback = null;
                }
            }
            break;

        default:
    }
}
/*
 //test disconnect
 setTimeout(function () {
 if (objectsDisconnectTimeout) clearTimeout(objectsDisconnectTimeout);
 objectsDisconnectTimeout = setTimeout(function () {
 console.log('TEST !!!!! STOP!!!! ===============================================');
 connected = false;
 objectsDisconnectTimeout = null;
 logger.warn(hostLogPrefix + ' Slave controller detected disconnection. Stop all instances.');
 stopInstances(true, function () {
 // if during stopping the DB has connection again
 if (connected && !isStopping) {
 getInstances();
 startAliveInterval();
 initMessageQueue();
 }
 });
 }, config.objects.connectTimeout || 2000);

 }, 60000);

 setTimeout(function () {
 console.log('TEST !!!!! START AGAIN!!!! ===============================================');
 // stop disconnect timeout
 if (objectsDisconnectTimeout) {
 clearTimeout(objectsDisconnectTimeout);
 objectsDisconnectTimeout = null;
 }

 if (!connected) {
 if (connected === null) setMeta();

 connected = true;
 logger.info(hostLogPrefix + ' ' + ' connected');

 // Do not start if we still stopping the instances
 if (!isStopping) {
 getInstances();
 startAliveInterval();
 initMessageQueue();
 }
 }
 }, 63000);
 */

function stopInstances(forceStop, callback) {
    let timeout;
    function waitForInstances() {
        if (!allInstancesStopped) {
            setTimeout(waitForInstances, 200);
        } else {
            if (timeout) clearTimeout(timeout);
            typeof callback === 'function' && callback();
            callback = null;
        }
    }

    try {
        isStopping = isStopping || Date.now(); // Sometimes process receives SIGTERM twice
        const elapsed = Date.now() - isStopping;
        logger.debug(hostLogPrefix + ' stop isStopping=' + elapsed + ' isDaemon=' + isDaemon + ' allInstancesStopped=' + allInstancesStopped);
        if (elapsed >= stopTimeout) {
            if (timeout) clearTimeout(timeout);
            typeof callback === 'function' && callback(true);
            callback = null;
        }

        for (const id in procs) {
            if (!procs.hasOwnProperty(id)) continue;
            stopInstance(id, forceStop); // sends kill signal via sigKill state or a kill after timeouts or if forced
        }
        if (forceStop || isDaemon) {
            // send instances SIGTERM, only needed if running in background (isDaemon)
            // or slave lost connection to master
            for (const id in compactProcs) {
                if (!compactProcs.hasOwnProperty(id)) continue;
                if (compactProcs[id].process) compactProcs[id].process.kill(); // TODO better?
            }
            if (forceStop) {
                allInstancesStopped = true;
            }
        }

        waitForInstances();
    } catch (e) {
        logger.error(hostLogPrefix + ' ' + e.message);
        if (timeout) clearTimeout(timeout);
        typeof callback === 'function' && callback();
        callback = null;
    }

    // force after Xs
    timeout = setTimeout(() => {
        timeout    = null;
        typeof callback === 'function' && callback(true);
        callback   = null;
    }, stopTimeout);
}

function stop(force, callback) {
    if (force === undefined) {
        force = false;
    }
    if (mhService) {
        mhService.close();
        mhService = null;
    }

    if (updateIPsTimer) {
        clearInterval(updateIPsTimer);
        updateIPsTimer = null;
    }

    if (reportInterval) {
        clearInterval(reportInterval);
        reportInterval = null;
    }

    stopInstances(force, wasForced => {
        if (objects && objects.destroy) objects.destroy();

        if (!states || force) {
            logger.info(hostLogPrefix + ' ' + (wasForced ? 'force terminating' : 'terminated') + '. Could not reset alive status for instances');
            if (typeof callback === 'function') {
                return void callback();
            }
            else {
                setTimeout(() => process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED), 1000);
            }
            return;
        }
        outputCount++;
        states.setState(hostObjectPrefix + '.alive', {val: false, ack: true, from: hostObjectPrefix}, () => {
            logger.info(hostLogPrefix + ' ' + (wasForced ? 'force terminating' : 'terminated'));
            if (wasForced) {
                for (const i in procs) {
                    if (!procs.hasOwnProperty(i)) continue;
                    if (procs[i].process) {
                        if (procs[i].config && procs[i].config.common && procs[i].config.common.name) {
                            logger.info(hostLogPrefix + ' Adapter ' + procs[i].config.common.name + ' still running');
                        }
                    }
                }
                for (const i in compactProcs) {
                    if (!compactProcs.hasOwnProperty(i)) continue;
                    if (compactProcs[i].process) {
                        logger.info(hostLogPrefix + ' Compact group controller ' + i + ' still running');
                    }
                }
            }
            states && states.destroy && states.destroy();
            if (typeof callback === 'function') {
                return void callback();
            }
            else {
                setTimeout(() => process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED), 1000);
            }
        });
    });
}

// bootstrap
function init(compactGroupId) {
    if (compactGroupId) {
        compactGroupController = true;
        compactGroup = compactGroupId;

        hostObjectPrefix += compactGroupObjectPrefix + compactGroup;
        hostLogPrefix += compactGroupObjectPrefix + compactGroup;
        title += compactGroupObjectPrefix + compactGroup;

        isDaemon = true;
    } else {
        stopTimeout += 5000;
    }

    // If bootstrap file detected, it must be deleted, but give time for bootstrap process to use this file
    if (fs.existsSync(VENDOR_BOOTSTRAP_FILE)) {
        setTimeout(() => {
            try {
                if (fs.existsSync(VENDOR_BOOTSTRAP_FILE)) {
                    fs.unlinkSync(VENDOR_BOOTSTRAP_FILE);
                    logger && logger.info(`Deleted ${VENDOR_BOOTSTRAP_FILE}`);
                }
            } catch (e) {
                logger && logger.error(`Cannot delete ${VENDOR_BOOTSTRAP_FILE}: ${e.toString()}`);
            }
        }, 30000);
    }

    process.title = title;

    // Get "objects" object
    // If "file" and on the local machine
    if (config.objects.type === 'file' && (!config.objects.host || config.objects.host === 'localhost' || config.objects.host === '127.0.0.1' || config.objects.host === '0.0.0.0') && !compactGroupController) {
        Objects = require('./lib/objects/objectsInMemServerRedis');
    } else {
        Objects = require('./lib/objects');
    }

    // Get "states" object
    if (config.states.type === 'file' && (!config.states.host || config.states.host === 'localhost' || config.states.host === '127.0.0.1' || config.states.host === '0.0.0.0') && !compactGroupController) {
        States  = require('./lib/states/statesInMemServerRedis');
    } else {
        States  = require('./lib/states');
    }

    // Detect if outputs to console are forced. By default they are disabled and redirected to log file
    if (config.log.noStdout && process.argv && (process.argv.indexOf('--console') !== -1 || process.argv.indexOf('--logs') !== -1)) {
        config.log.noStdout = false;
    }

    // Detect if controller runs as a linux-daemon
    if (process.argv.indexOf('start') !== -1 && !compactGroupController) {
        isDaemon = true;
        config.log.noStdout = true;
    }

    logger = require('./lib/logger.js')(config.log);

    if (!compactGroupController) {
        // Delete all log files older than x days
        logger.activateDateChecker(true, config.log.maxDays);
    }

    // If installed as npm module
    adapterDir = adapterDir.split('/');
    if (adapterDir.pop() === 'node_modules') {
        adapterDir = adapterDir.join('/');
    } else {
        adapterDir = __dirname.replace(/\\/g, '/') + '/node_modules';
    }

    // find our notifier transport
    const ts = logger.transports.find(t => t.name === 'NT');
    ts.on('logged', info => {
        info.from = hostLogPrefix;
        for (let i = 0; i < logList.length; i++) {
            states.pushLog(logList[i], info);
        }
    });

    if (!compactGroupController) {
        logger.info(hostLogPrefix + ' ' + tools.appName + '.js-controller version ' + version + ' ' + ioPackage.common.name + ' starting');
        logger.info(hostLogPrefix + ' Copyright (c) 2014-2020 bluefox, 2014 hobbyquaker');
        logger.info(hostLogPrefix + ' hostname: ' + hostname + ', node: ' + process.version);
        logger.info(hostLogPrefix + ' ip addresses: ' + getIPs().join(' '));

        // create package.json for npm >= 3.x if not exists
        if (__dirname.replace(/\\/g, '/').toLowerCase().indexOf('/node_modules/' + title.toLowerCase()) !== -1) {
            try {
                if (!fs.existsSync(__dirname + '/../../package.json')) {
                    fs.writeFileSync(__dirname + '/../../package.json', JSON.stringify({
                        name: 'iobroker.core',
                        version: '1.0.0',
                        private: true
                    }, null, 2));
                } else {
                    // npm3 requires version attribute
                    const p = JSON.parse(fs.readFileSync(__dirname + '/../../package.json').toString());
                    if (!p.version) {
                        fs.writeFileSync(__dirname + '/../../package.json', JSON.stringify({
                            name: 'iobroker.core',
                            version: '1.0.0',
                            private: true
                        }, null, 2));
                    }
                }
            } catch (e) {
                console.error('Cannot create "' + __dirname + '/../../package.json": ' + e);
            }
        }

    }
    else {
        logger.info(hostLogPrefix + ' ' + tools.appName + '.js-controller version ' + version + ' ' + ioPackage.common.name + ' starting');
    }

    createObjects(() => {
        objects.subscribe('system.adapter.*');

        // create states object
        createStates(() => {
            // Subscribe for connection state of all instances
            // Disabled in 1.5.x
            // states.subscribe('*.info.connection');

            if (connectTimeout) {
                clearTimeout(connectTimeout);
                connectTimeout = null;
            }
            // Subscribe for all logging objects
            states.subscribe('*.logging');

            // Subscribe for all logging objects
            states.subscribe('system.adapter.*.alive');

            // set current Loglevel and subscribe for changes
            states.setState(hostObjectPrefix + '.logLevel', {val: config.log.level, ack: true, from: hostObjectPrefix});
            states.subscribe(hostObjectPrefix + '.logLevel');

            // Read current state of all log subscribers
            states.getKeys('*.logging', (err, keys) => {
                if (keys && keys.length) {
                    const oKeys = keys.map(id => id.replace(/\.logging$/, ''));
                    objects.getObjects(oKeys, (err, objs) => {
                        const toDelete = keys.filter((id, i) => !objs[i]);
                        keys = keys.filter((id, i) => objs[i]);

                        states.getStates(keys, (err, obj) => {
                            if (obj) {
                                for (let i = 0; i < keys.length; i++) {
                                    // We can JSON.parse, but index is 16x faster
                                    if (obj[i]) {
                                        if (typeof obj[i] === 'string' && (obj[i].indexOf('"val":true') !== -1 || obj[i].indexOf('"val":"true"') !== -1)) {
                                            logRedirect(true, keys[i].substring(0, keys[i].length - '.logging'.length).replace(/^io\./, ''), 'starting');
                                        } else if (typeof obj[i] === 'object' && (obj[i].val === true || obj[i].val === 'true')) {
                                            logRedirect(true, keys[i].substring(0, keys[i].length - '.logging'.length).replace(/^io\./, ''), 'starting');
                                        }
                                    }
                                }
                            }
                        });
                        if (toDelete.length) {
                            toDelete.forEach(id => {
                                logger.warn(hostLogPrefix + ' logger ' + id + ' was deleted');
                                states.delState(id);
                            });
                        }
                    });
                }
            });
        });
    });

    connectTimeout = setTimeout(() => {
        connectTimeout = null;
        logger.error(hostLogPrefix + ' No connection to databases possible, restart');
        !compactGroupController && processMessage({command: 'cmdExec', message: {data: '_restart'}});
        setTimeout(() => process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED), compactGroupController ? 0 : 1000);
    }, 30000);

    process.on('SIGINT', () => {
        logger.info(hostLogPrefix + ' received SIGINT');
        stop();
    });

    process.on('SIGTERM', () => {
        logger.info(hostLogPrefix + ' received SIGTERM');
        stop();
    });

    process.on('uncaughtException', err => {
        if (compactGroupController) {
            console.error(err.message || err);
            if (err.stack) console.error(err.stack);
            stop();
            return;
        }
        if (err.arguments && err.arguments[0] === 'fragmentedOperation') {
            // TODO Remove as soon as socketio is no longer used
            logger.error(hostLogPrefix + ' fragmentedOperation: restart objects');
            // restart objects
            objects.destroy();
            objects = null;
            // Give time to close the objects
            setTimeout(() => createObjects(), 3000);
            return;
        }

        // If by terminating one more exception => stop immediately to break the circle
        if (uncaughtExceptionCount) {
            console.error(err.message || err);
            if (err.stack) console.error(err.stack);
            process.exit(EXIT_CODES.UNCAUGHT_EXCEPTION);
            return;
        }
        uncaughtExceptionCount++;
        if (typeof err === 'object') {
            if (err.errno === 'EADDRINUSE') {
                logger.error(hostLogPrefix + ' Another instance is running or some application uses port!');
                logger.error(hostLogPrefix + ' uncaught exception: ' + err.message);
            } else {
                logger.error(hostLogPrefix + ' uncaught exception: ' + err.message);
                logger.error(hostLogPrefix + ' ' + err.stack);
            }
        } else {
            logger.error(hostLogPrefix + ' uncaught exception: ' + err);
            logger.error(hostLogPrefix + ' ' + err.stack);
        }
        stop();
        // Restart itself
        processMessage({command: 'cmdExec', message: {data: '_restart'}});
    });
}

if (typeof module !== 'undefined' && module.parent) {
    // normally used for legacy compatibility and compact group support
    module.exports.init = init;
} else {
    // for direct calls
    init();
}
