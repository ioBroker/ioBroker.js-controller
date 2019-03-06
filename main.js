/**
 *      application.controller
 *
 *      Controls Adapter-Processes
 *
 *      Copyright 2013-2019 bluefox <dogafox@gmail.com>,
 *                2013-2014 hobbyquaker <hq@ccu.io>
 *      MIT License
 *
 */
'use strict';

const schedule   = require('node-schedule');
const os         = require('os');
const fs         = require('fs');
const cp         = require('child_process');
const ioPackage  = require('./io-package.json');
const tools      = require('./lib/tools');
const version    = ioPackage.common.version;
const pidUsage   = require('pidusage');
const EXIT_CODES = require('./lib/exitCodes');
let   adapterDir = __dirname.replace(/\\/g, '/');
let   zipFiles;

/* Use require('loadavg-windows') to enjoy os.loadavg() on Windows OS.
   Currently Node.js on Windows platform do not implements os.loadavg() functionality - it returns [0,0,0]
   Expect first results after 1 min from application start (before 1 min runtime it will return [0,0,0])
   Requiring it on other operating systems have NO influence.*/
if (os.platform() === 'win32') {
    require('loadavg-windows');
}

// Change version in io-package.json and start grunt task to modify the version
const title = tools.appName + '.js-controller';
process.title = title;

let Objects;
let States;

let semver                  = require('semver');
let logger;
let isDaemon                = false;
let callbackId              = 1;
let callbacks               = {};
const hostname              = tools.getHostName();
const logList               = [];
let detectIpsCount          = 0;
let disconnectTimeout       = null;
let connected               = null; // not false, because want to detect first connection
let ipArr                   = [];
let lastCalculationOfIps    = null;
let lastDiskSizeCheck       = 0;

const procs                 = {};
const subscribe             = {};
let states                  = null;
let objects                 = null;
let storeTimer              = null;
let isStopping              = null;
let allInstancesStopped     = true;
const stopTimeout           = 10000;
let uncaughtExceptionCount  = 0;
const installQueue          = [];
let started                 = false;
let inputCount              = 0;
let outputCount             = 0;
let mhService               = null; // multihost service
const uptimeStart           = Date.now();
const adapterModules        = {};

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
        logger.error('host.' + hostname + ' conf/' + tools.appName + '.json missing - call node ' + tools.appName + '.js setup');
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
                logger.warn('host.' + hostname + ' Cannot stop multihost: ' + e);
            }
        }

        if ((!_config.objects.host || _config.objects.host === '127.0.0.1' || _config.objects.host === 'localhost') && _config.objects.type === 'file') {
            logger.warn('host.' + hostname + ' Host on this system is not possible, because IP address is for objects is ' + _config.objects.host);
        } else
        if ((_config.states.host   || _config.states.host  === '127.0.0.1' || _config.states.host  === 'localhost') && _config.states.type  === 'file') {
            logger.warn('host.' + hostname + ' Host on this system is not possible, because IP address is for states is ' + _config.states.host);
        }

        if (_config.multihostService.secure) {
            objects.getObject('system.config', (err, obj) => {
                if (obj && obj.native && obj.native.secret) {
                    tools.decryptPhrase(obj.native.secret, _config.multihostService.password, secret =>
                        _startMultihost(_config, secret));
                } else {
                    logger.error('host.' + hostname + ' Cannot start multihost: no system.config found');
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
            logger.warn('host.' + hostname + ' Cannot stop multihost: ' + e);
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
        for (const dev in ifaces) {
            if (!ifaces.hasOwnProperty(dev)) continue;

            /* jshint loopfunc:true */
            ifaces[dev].forEach(details =>
                // noinspection JSUnresolvedVariable
                !details.internal && ipArr.push(details.address));
        }
    }

    return ipArr;
}

// subscribe or unsubscribe loggers
function logRedirect(isActive, id, reason) {
    console.warn(`================================== > LOG REDIRECT ${id} => ${isActive} [${reason}]`);
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

function createStates() {
    return new States({
        namespace: 'host.' + hostname,
        connection: config.states,
        logger: logger,
        hostname: hostname,
        change: (id, state) => {
            inputCount++;
            if (!id) {
                logger.error('host.' + hostname + ' change event with no ID: ' + JSON.stringify(state));
                return;
            }
            // If some log transporter activated or deactivated
            if (id.match(/.logging$/)) {
                logRedirect(state ? state.val : false, id.substring(0, id.length - '.logging'.length), id);
            } else
            // If this is messagebox
            if (id === 'messagebox.system.host.' + hostname) {
                // Read it from fifo list
                states.delMessage('system.host.' + hostname, state._id);
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
            // If this NAME.0.info.connection
            if (id.match(/^[^.]+\.\d+\.info\.connection$/)) {
                // Disabled in 1.5.x
                // if (state && !state.val) {
                //     tools.setQualityForInstance(objects, states, id.substring(0, id.length - /* '.info.connection'.length*/ 16), 0x42)
                //         .then(() => {
                //             logger.debug('host.' + hostname + ' set all states quality to 0x42 (device not connected');
                //         }).catch(e => {
                //             logger.error('host.' + hostname + ' cannot set all states quality: ' + e);
                //         });
                // }
            }
            else    // If this system.adapter.NAME.0.alive
            if (id.match(/^system.adapter.[^.]+\.\d+\.alive$/)) {
                if (state && !state.ack) {
                    const enabled = state.val;
                    setImmediate(() => {
                        objects.getObject(id.substring(0, id.length - 6/*'.alive'.length*/), (err, obj) => {
                            if (err) logger.error('host.' + hostname + ' Cannot read object: '  + err);
                            if (obj && obj.common) {
                                // IF adapter enabled => disable it
                                if ((obj.common.enabled && !enabled) || (!obj.common.enabled && enabled)) {
                                    obj.common.enabled = !!enabled;
                                    logger.warn('host.' + hostname + ' instance "' + obj._id + '" ' + (obj.common.enabled ? 'enabled' : 'disabled'));
                                    setImmediate(() => {
                                        obj.from = 'system.host.' + hostname;
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
                    //             logger.debug('host.' + hostname + ' set all states quality to 0x12 (instance not connected');
                    //         }).catch(e => {
                    //         logger.error('host.' + hostname + ' cannot set all states quality: ' + e);
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
                        logger.warn('host.' + hostname + ' controller Adapter subscribed on ' + id + ' does not exist!');
                    }
                }
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
        connected: () => {
            if (states.clearAllLogs)     states.clearAllLogs();
            if (states.clearAllMessages) states.clearAllMessages();
            deleteAllZipPackages();
        }
    });
}

// create "objects" object
function createObjects() {
    return new Objects({
        namespace:  'host.' + hostname,
        connection: config.objects,
        controller: true,
        logger:     logger,
        hostname:   hostname,
        connected:  type => {
            // stop disconnect timeout
            if (disconnectTimeout) {
                clearTimeout(disconnectTimeout);
                disconnectTimeout = null;
            }

            if (!connected) {
                logger.info('host.' + hostname + ' ' + type + ' connected');

                if (connected === null) {
                    connected = true;
                    if (!isStopping) {
                        // Do not start if we still stopping the instances
                        checkHost(type, () => {
                            startMultihost(config);
                            setMeta();
                            started = true;
                            getInstances();
                            startAliveInterval();
                            initMessageQueue();
                        });
                    }
                } else {
                    connected = true;
                    started   = true;

                    // Do not start if we still stopping the instances
                    if (!isStopping) {
                        getInstances();
                        startAliveInterval();
                        initMessageQueue();
                    }
                }
            }
        },
        disconnected: (/*error*/) => {
            if (disconnectTimeout) clearTimeout(disconnectTimeout);
            disconnectTimeout = setTimeout(() => {
                connected = false;
                disconnectTimeout = null;
                logger.warn('host.' + hostname + ' Slave controller detected disconnection. Stop all instances.');
                stopInstances(true, () => {
                    // if during stopping the DB has connection again
                    if (connected && !isStopping) {
                        getInstances();
                        startAliveInterval();
                        initMessageQueue();
                    }
                });
            }, config.objects.connectTimeout || 2000);

        },
        change:     (id, obj) => {
            if (!started || !id.match(/^system\.adapter\.[a-zA-Z0-9-_]+\.[0-9]+$/)) return;
            logger.info('host.' + hostname + ' object change ' + id);
            try {
                if (procs[id]) {
                    // known adapter
                    if (!obj) {
                        procs[id].config.common.enabled = false;
                        procs[id].config.common.host    = null;
                        procs[id].config.deleted        = true;
                        logger.info('host.' + hostname + ' object deleted ' + id);
                    } else {
                        if (procs[id].config.common.enabled  && !obj.common.enabled) logger.info('host.' + hostname + ' "' + id + '" disabled');
                        if (!procs[id].config.common.enabled &&  obj.common.enabled) logger.info('host.' + hostname + ' "' + id + '" enabled');
                        procs[id].config = obj;
                    }
                    if (procs[id].process || procs[id].config.common.mode === 'schedule' || procs[id].config.common.mode === 'subscribe') {
                        stopInstance(id, () => {
                            const _ipArr = getIPs();

                            if (_ipArr.indexOf(procs[id].config.common.host) !== -1 || procs[id].config.common.host === hostname) {
                                if (procs[id].config.common.enabled && (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance)) {
                                    if (procs[id].restartTimer) clearTimeout(procs[id].restartTimer);
                                    procs[id].restartTimer = setTimeout(_id => startInstance(_id), 2500, id);
                                }
                            } else {
                                delete procs[id];
                            }
                        });
                    } else {
                        const __ipArr = getIPs();
                        if (procs[id].config && (__ipArr.indexOf(procs[id].config.common.host) !== -1 || procs[id].config.common.host === hostname)) {
                            if (procs[id].config.common.enabled && (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance)) {
                                startInstance(id);
                            }
                        } else {
                            delete procs[id];
                        }
                    }

                } else if (obj && obj.common) {
                    const _ipArr = getIPs();
                    // new adapter
                    if (_ipArr.indexOf(obj.common.host) !== -1 || obj.common.host === hostname) {
                        procs[id] = {config: obj};
                        if (procs[id].config.common.enabled && (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance)) {
                            startInstance(id);
                        }
                    }
                }
            } catch (err) {
                logger.error('host.' + hostname + ' cannot process: ' + id);
            }
        }
    });
}

function startAliveInterval() {
    config.system = config.system || {};
    config.system.statisticsInterval = parseInt(config.system.statisticsInterval, 10) || 15000;
    config.system.checkDiskInterval  = (config.system.checkDiskInterval !== 0) ? parseInt(config.system.checkDiskInterval, 10) || 300000 : 0;
    reportStatus();
    setInterval(reportStatus, config.system.statisticsInterval);
}

function reportStatus() {
    const id = 'system.host.' + hostname;
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
            states.setState(id + '.cpu',     {ack: true, from: id, val: parseFloat(stats.cpu).toFixed(2)});
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
            logger.error('host.' + hostname + ' Cannot read /proc/meminfo: ' + err);
        }
    }

    if (config.system.checkDiskInterval && Date.now() - lastDiskSizeCheck >= config.system.checkDiskInterval) {
        lastDiskSizeCheck = Date.now();
        tools.getDiskInfo(os.platform(), (err, info) => {
            if (err) {
                logger.error('host.' + hostname + ' Cannot read disk size: ' + err);
            }
            try {
                if (info) {
                    states.setState(id + '.diskSize', {val: Math.round((info['Disk size'] || 0) / (1024 * 1024)), ack: true, from: id});
                    states.setState(id + '.diskFree', {val: Math.round((info['Disk free'] || 0) / (1024 * 1024)), ack: true, from: id});
                    outputCount+=2;
                }
            } catch (e) {
                logger.error('host.' + hostname + ' Cannot read disk information: ' + e);
            }
        });
    }

    // some statistics
    states.setState(id + '.inputCount',   {val: inputCount, ack: true, from: id});
    states.setState(id + '.outputCount',  {val: outputCount, ack: true, from: id});

    inputCount  = 0;
    outputCount = 0;
}

function changeHost(objs, oldHostname, newHostname, callback) {
    if (!objs || !objs.length) {
        if (typeof callback === 'function') callback();
    } else {
        const row = objs.shift();
        if (row && row.value && row.value.common && row.value.common.host === oldHostname) {
            const obj = row.value;
            obj.common.host = newHostname;
            logger.info('host.' + hostname + ' Reassign instance ' + obj._id.substring('system.adapter.'.length) + ' from ' + oldHostname + ' to ' + newHostname);
            obj.from = 'system.host.' + tools.getHostName();
            obj.ts = Date.now();
            objects.setObject(obj._id, obj, (/* err */) => {
                setImmediate(() => changeHost(objs, oldHostname, newHostname, callback));
            });
        } else {
            setImmediate(() => changeHost(objs, oldHostname, newHostname, callback));
        }
    }
}

function cleanAutoSubscribe(instance, autoInstance, callback) {
    states.getState(autoInstance + '.subscribes', (err, state) => {
        if (!state || !state.val) {
            if (typeof callback === 'function') {
                setImmediate(() => callback());
            }
            return;
        }
        let subs;
        try {
            subs = JSON.parse(state.val);
        } catch (e) {
            logger.error('host.' + hostname + ' Cannot parse subscribes: ' + state.val);
            if (typeof callback === 'function') {
                setImmediate(() => callback());
            }
            return;
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
                    cleanAutoSubscribe(instance, res.rows[c].id, () => {
                        if (!--count && callback) callback();
                    });
                }
            }
        }
        if (!count && callback) callback();
    });
}

function delObjects(objs, callback) {
    if (!objs || !objs.length) {
        if (typeof callback === 'function') callback();
    } else {
        const row = objs.shift();
        if (row && row.id) {
            logger.info('host.' + hostname + ' Delete state "' + row.id + '"');
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
function checkHost(type, callback) {
    if (type === 'InMemoryDB') {
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
                        if (typeof callback === 'function') callback();
                    } else if (doc.rows.length === 0) {
                        logger.info('host.' + hostname + ' no instances found');
                        // no instances found
                        if (typeof callback === 'function') callback();
                    } else {
                        // reassign all instances
                        changeHost(doc.rows, oldHostname, hostname, () => {
                            logger.info('host.' + hostname + ' Delete host ' + oldId);

                            // delete host object
                            objects.delObject(oldId, () => {

                                // delete all hosts states
                                objects.getObjectView('system', 'state', {startkey: 'system.host.' + oldHostname + '.', endkey: 'system.host.' + oldHostname + '.\u9999', include_docs: true}, (_err, doc) => {
                                    delObjects(doc.rows, () => callback && callback());
                                });
                            });
                        });
                    }
                });
            } else if (typeof callback === 'function') {
                callback();
            }
        });
    } else if (typeof callback === 'function') {
        callback();
    }
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
                                logger.error('host.' + hostname + ' Invalid versions: ' + ((a && a.value && a.value.common) ? a.value.common.installedVersion : '0.0.0') + '[' + ((a && a.value && a.value.common) ? a.value.common.name : 'unknown') + '] or ' + ((b && b.value && b.value.common) ? b.value.common.installedVersion : '0.0.0') + '[' + ((b && b.value && b.value.common) ? b.value.common.name : 'unknown') + ']');
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
                                logger.error('host.' + hostname + ' cannot call visUtils: ' + e);
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
            if (JSON.stringify(oldObj.native.hardware.networkInterfaces) !== JSON.stringify(networkInterfaces) ||
                JSON.stringify(oldObj.common.address)           !== JSON.stringify(ipList)) {
                oldObj.common.address = ipList;
                oldObj.native.hardware.networkInterfaces = networkInterfaces;
                oldObj.from = 'system.host.' + tools.getHostName();
                oldObj.ts = Date.now();
                objects.setObject(oldObj._id, oldObj, err => err && logger.error('host.' + hostname + ' Cannot write host object:' + err));
            }
        });
    } else {
        logger.info('host.' + hostname + ' No IPv4 address found after 5 minutes.');
    }
}

// write 10 objects each after other
function extendObjects(tasks, callback) {
    if (!tasks || !tasks.length) {
        if (typeof callback === 'function') callback();
        return;
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
    const id = 'system.host.' + hostname;

    objects.getObject(id, (err, oldObj) => {
        const newObj = {
            _id:  id,
            type: 'host',
            common: {
                name:             hostname,
                title:            oldObj && oldObj.common && oldObj.common.title ? oldObj.common.title : ioPackage.common.title,
                installedVersion: version,
                platform:         ioPackage.common.platform,
                cmd:              process.argv[0] + ' ' + (process.execArgv.join(' ') + ' ').replace(/--inspect-brk=\d+ /, '') + process.argv.slice(1).join(' '),
                hostname:         hostname,
                address:          getIPs(),
                type:             ioPackage.common.name
            },
            native: {
                process: {
                    title:      process.title,
                    versions:   process.versions,
                    env:        process.env
                },
                os: {
                    hostname:   hostname,
                    type:       os.type(),
                    platform:   os.platform(),
                    arch:       os.arch(),
                    release:    os.release(),
                    endianness: os.endianness(),
                    tmpdir:     os.tmpdir()
                },
                hardware: {
                    cpus:       os.cpus(),
                    totalmem:   os.totalmem(),
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

        if (oldObj) {
            delete oldObj.cmd;
            delete oldObj.from;
            delete oldObj.ts;
            delete oldObj.acl;
        }

        if (!oldObj || JSON.stringify(newObj) !== JSON.stringify(oldObj)) {
            newObj.from = 'system.host.' + tools.getHostName();
            newObj.ts = Date.now();
            objects.setObject(id, newObj, err => {
                if (err) {
                    logger.error('host.' + hostname + ' Cannot write host object:' + err);
                } else {
                    setIPs(newObj.common.address);
                }
            });
        } else {
            setIPs(newObj.common.address);
        }
    });

    const tasks = [];

    let obj = {
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
        _id:       id + '.zip',
        type:      'channel',
        common: {
            name:  'ZIP files',
            desc:  'Files for download'
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

    // delete obsolete states
    objects.getObjectView('system', 'state', {startkey: 'system.host.' + hostname + '.', endkey: 'system.host.' + hostname + '.\u9999', include_docs: true}, (_err, doc) => {
        // identify existing states for deletion, because they are not in the new tasks-list
        const todelete = doc.rows.filter(out1 => !tasks.some(out2 => out1.id === out2._id));

        if (todelete && todelete.length > 0) {
            delObjects(todelete, () =>
                logger && logger.info('host.' + hostname + ' Some obsolete host states deleted.'));
        }
    });

    extendObjects(tasks, () =>
        // create UUID if not exist
        tools.createUuid(objects, uuid =>
            uuid && logger && logger.info('host.' + hostname + ' Created UUID: ' + uuid)));
}

// Subscribe on message queue
function initMessageQueue() {
    states.subscribeMessage('system.host.' + hostname);
}

// Send message to other adapter instance
function sendTo(objName, command, message, callback) {
    if (typeof message === 'undefined') {
        message = command;
        command = 'send';
    }
    const obj = {command: command, message: message, from: 'system.host.' + hostname};
    if (objName.substring(0, 'system.adapter.'.length) !== 'system.adapter.' &&
        objName.substring(0, 'system.host.'.length)    !== 'system.host.') objName = 'system.adapter.' + objName;

    if (callback) {
        if (typeof callback === 'function') {
            obj.callback = {
                message: message,
                id:      callbackId++,
                ack:     false,
                time:    Date.now()
            };
            if (callbackId > 0xFFFFFFFF) callbackId = 1;
            if (!callbacks) callbacks = {};
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
            logger.warn('host.' + hostname + ' "' + hostId + '" is offline');
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
        states.detBinaryState(list.shift(), _err =>
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
    states.getKeys('system.host.' + hostname + '.zip.*',
        (err, list) => _deleteAllZipPackages(list, cb));
}

// Process message to controller, like execute some script
function processMessage(msg) {
    let ioPack;
    // important: Do not forget to update the list of protected commands in iobroker.admin/lib/socket.js for "socket.on('sendToHost'"
    // and iobroker.socketio/lib/socket.js

    switch (msg.command) {
        case 'cmdExec': {
            const spawn = require('child_process').spawn;
            const args = [__dirname + '/' + tools.appName + '.js'];
            const cmd = msg.message.data.split(' ');
            for (let i = 0; i < cmd.length; i++) {
                args.push(cmd[i]);
            }
            logger.info('host.' + hostname + ' ' + tools.appName + ' ' + args.slice(1).join(' '));

            const child = spawn('node', args);
            if (child.stdout) {
                child.stdout.on('data', data => {
                    data = data.toString().replace(/\n/g, '');
                    logger.info('host.' + hostname + ' ' + tools.appName + ' ' + data);
                    if (msg.from) sendTo(msg.from, 'cmdStdout', {id: msg.message.id, data: data});
                });
            }

            if (child.stderr) {
                child.stderr.on('data', data => {
                    data = data.toString().replace(/\n/g, '');
                    logger.error('host.' + hostname + ' ' + tools.appName + ' ' + data);
                    if (msg.from) sendTo(msg.from, 'cmdStderr', {id: msg.message.id, data: data});
                });
            }

            child.on('exit', exitCode => {
                logger.info('host.' + hostname + ' ' + tools.appName + ' exit ' + exitCode);
                if (msg.from) {
                    sendTo(msg.from, 'cmdExit', {id: msg.message.id, data: exitCode});
                    // Sometimes finished command is lost, recent it
                    setTimeout(() => sendTo(msg.from, 'cmdExit', {id: msg.message.id, data: exitCode}), 1000);
                }
            });
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
                                    logger.info('host.' + hostname + ' Update repository "' + active + '" under "' + repos.native.repositories[active].link + '"');
                                    // Load it
                                    tools.getRepositoryFile(repos.native.repositories[active].link, {
                                        hash: repos.native.repositories[active].hash, 
                                        sources: repos.native.repositories[active].json,
                                        controller: version, 
                                        node: process.version, 
                                        name: tools.appName
                                    }, (err, sources, sourcesHash) => {
                                        if (err) logger.warn('host.' + hostname + ' warning: ' + err);
                                        if (!sources || !Object.keys(sources).length) {
                                            logger.warn('host.' + hostname + ' warning: empty repo received!');
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
                                logger.warn('host.' + hostname + ' Requested repository "' + active + '" does not exist in config.');
                                sendTo(msg.from, msg.command, null, msg.callback);
                            }
                        }
                    });
                });
            } else {
                logger.error('host.' + hostname + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
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
                            if (doc.rows[i].id === 'system.host.' + hostname) {
                                let _ioPack;
                                try {
                                    _ioPack = JSON.parse(fs.readFileSync(__dirname + '/io-package.json'));
                                } catch (e) {
                                    logger.error('host.' + hostname + ' cannot read and parse "' + __dirname + '/io-package.json"');
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
                                            logger.warn('host.' + hostname + ' too delayed answer for ' + (ioPack ? ioPack.host : id));
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
                            logger.warn('host.' + hostname + ' some hosts are offline');
                            timeout = null;
                            sendTo(msg.from, msg.command, result, msg.callback);
                        }, 5000);
                    }
                });
            } else {
                logger.error('host.' + hostname + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
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
                        logger.error('host.' + hostname + ' cannot read and parse "' + dir + '/io-package.json"');
                    }
                }
                sendTo(msg.from, msg.command, _result, msg.callback);
            } else {
                logger.error('host.' + hostname + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getVersion':
            if (msg.callback && msg.from) {
                ioPack = null;
                try {
                    ioPack = JSON.parse(fs.readFileSync(__dirname + '/io-package.json'));
                } catch (e) {
                    logger.error('host.' + hostname + ' cannot read and parse "' + __dirname + '/io-package.json"');
                }
                if (ioPack) {
                    ioPack.common.host = hostname;
                    ioPack.common.runningVersion = version;
                    sendTo(msg.from, msg.command, ioPack.common, msg.callback);
                } else {
                    sendTo(msg.from, msg.command, null, msg.callback);
                }
            } else {
                logger.error('host.' + hostname + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
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
                logger.error('host.' + hostname + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getLocationOnDisk':
            if (msg.callback && msg.from) {
                sendTo(msg.from, msg.command, {path: __dirname, platform: os.platform()}, msg.callback);
            } else {
                logger.error('host.' + hostname + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getDevList':
            if (msg.callback && msg.from) {
                ioPack = null;

                if (os.platform() === 'linux') {
                    const _spawn = require('child_process').spawn;
                    const _args = ['/dev'];
                    logger.info('host.' + hostname + ' ls /dev');
                    const _child = _spawn('ls', _args);
                    let result = '';
                    if (_child.stdout) {
                        _child.stdout.on('data', data => result += data.toString());
                    }
                    if (_child.stderr) {
                        _child.stderr.on('data', data =>
                            logger.error('host.' + hostname + ' ls ' + data));
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
                logger.error('host.' + hostname + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
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
                        .on('error', () => {  // done
                            sendTo(msg.from, msg.command, [stats.size], msg.callback);
                        });
                } else {
                    sendTo(msg.from, msg.command, [0], msg.callback);
                }
            } else {
                logger.error('host.' + hostname + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
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
                        logger.error('host.' + hostname + ' cannot get getHostInfo: ' + err);
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
                logger.error('host.' + hostname + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'delLogs': {
            const logFile = logger.getFileName(); //__dirname + '/log/' + tools.appName + '.log';
            if (fs.existsSync(__dirname +       '/log/' + tools.appName + '.log')) fs.writeFileSync(__dirname +       '/log/' + tools.appName + '.log', '');
            if (fs.existsSync(__dirname + '/../../log/' + tools.appName + '.log')) fs.writeFileSync(__dirname + '/../../log/' + tools.appName + '.log', '');
            if (fs.existsSync(logFile)) fs.writeFileSync(logFile);

            if (msg.callback && msg.from) sendTo(msg.from, msg.command, null, msg.callback);
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
            zipFiles.writeDirAsZip(objects, msg.message.id, msg.message.name, new Buffer(msg.message.data, 'base64'), msg.message.options, err =>
                msg.callback && msg.from && sendTo(msg.from, msg.command, {error: err}, msg.callback));

            break;

        case 'readObjectsAsZip':
            if (msg.callback && msg.from) {
                zipFiles = zipFiles || require('./lib/zipFiles');
                zipFiles.readObjectsAsZip(objects, msg.message.id, msg.message.adapter, msg.message.options, (err, base64) => {
                    // If client supports file via link
                    if (msg.message.link) {
                        if (!err) {
                            const buff = new Buffer(base64, 'base64');
                            states.setBinaryState('system.host.' + hostname + '.zip.' + msg.message.link, buff, err => {
                                if (err) {
                                    sendTo(msg.from, msg.command, {error: err}, msg.callback);
                                } else {
                                    sendTo(msg.from, msg.command, 'system.host.' + hostname + '.zip.' + msg.message.link, msg.callback);
                                }
                            });
                        } else {
                            sendTo(msg.from, msg.command, {error: err}, msg.callback);
                        }
                    } else {
                        if (base64) {
                            sendTo(msg.from, msg.command, {error: err, data: base64}, msg.callback);
                        } else {
                            sendTo(msg.from, msg.command, {error: err}, msg.callback);
                        }
                    }
                });
            }
            break;

        case 'writeObjectsAsZip':
            zipFiles = zipFiles || require('./lib/zipFiles');
            zipFiles.writeObjectsAsZip(objects, msg.message.id, msg.message.adapter, new Buffer(msg.message.data, 'base64'), msg.message.options, err =>
                msg.callback && msg.from && sendTo(msg.from, msg.command, {error: err}, msg.callback));
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
                                    logger.error('host.' + hostname + ' LOGINFO: ' + logs[m]);
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
                        states.setState(_id + '.checkLogging', {val: true, ack: false, from: 'system.host.' + hostname});
                    }
                }
            })();
            break;

        case 'updateMultihost':
            (function () {
                const result = startMultihost();
                if (msg.callback) {
                    sendTo(msg.from, msg.command, {result: result}, msg.callback);
                }
            })();
            break;

        case 'getInterfaces':
            (function () {
                if (msg.callback) {
                    sendTo(msg.from, msg.command, {result: os.networkInterfaces()}, msg.callback);
                }
            })();
            break;
    }
}

function getInstances() {
    objects.getObjectView('system', 'instance', {}, (err, doc) => {
        if (err && err.status_code === 404) {
            logger.error('host.' + hostname + ' _design/system missing - call node ' + tools.appName + '.js setup');
            //if (objects.destroy) objects.destroy();
            //if (states  && states.destroy)  states.destroy();
            //process.exit(1);
            return;
        } else if (doc.rows.length === 0) {
            logger.info('host.' + hostname + ' no instances found');
        } else {
            const _ipArr = getIPs();
            logger.info('host.' + hostname + ' ' + doc.rows.length + ' instance' + (doc.rows.length === 1 ? '' : 's') + ' found');
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
                            installQueue.push({id: instance._id, disabled: true, version: instance.common.version});
                            // start install queue if not started
                            if (installQueue.length === 1) installAdapters();
                        }
                    }
                    continue;
                }

                logger.debug('host.' + hostname + ' check instance "' + doc.rows[i].id  + '" for host "' + instance.common.host + '"');
                console.log('host.' + hostname + ' check instance "' + doc.rows[i].id  + '" for host "' + instance.common.host + '"');

                if (_ipArr.indexOf(instance.common.host) !== -1 || instance.common.host === hostname) {
                    procs[instance._id] = procs[instance._id] || {};
                    procs[instance._id].config = JSON.parse(JSON.stringify(instance));
                    if (instance.common.enabled && (!instance.common.webExtension || !instance.native.webInstance)) count++;
                }
            }

            if (count > 0) {
                logger.info('host.' + hostname + ' starting ' + count + ' instance' + (count > 1 ? 's' : ''));
            } else {
                logger.warn('host.' + hostname + ' does not start any instances on this host');
            }
        }

        initInstances();
    });
}

function initInstances() {
    let seconds = 0;
    const interval = (config.system && config.system.instanceStartInterval) || 2000;
    let id;

    // Start first admin
    for (id in procs) {
        if (!procs.hasOwnProperty(id)) continue;

        if (procs[id].config.common.enabled && (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance)) {
            if (id.indexOf('system.adapter.admin') !== -1) {
                // do not process if still running. It will be started when old one will be finished
                if (procs[id].process) {
                    logger.info('host.' + hostname + ' instance "' + id + '" was not started, because running.');
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
        if (!procs.hasOwnProperty(id)) continue;

        if (procs[id].config.common.enabled && (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance)) {
            if (id.indexOf('system.adapter.admin') === -1) {
                // do not process if still running. It will be started when old one will be finished
                if (procs[id].process) {
                    logger.info('host.' + hostname + ' instance "' + id + '" was not started, because running.');
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
        } else {
            const name = id.split('.')[2];
            const adapterDir = tools.getAdapterDir(name);
            if (!fs.existsSync(adapterDir)) {
                procs[id].downloadRetry = procs[id].downloadRetry || 0;
                installQueue.push({id: id, disabled: true});
                // start install queue if not started
                installQueue.length === 1 && installAdapters();
            }
        }
    }
}

function checkVersion(id, name, version) {
    let isFound = false;

    if (name === 'js-controller') {
        // Check only version
        if (version !== null) {
            if (!semver.satisfies(ioPackage.common.version, version)) {
                logger.error('host.' + hostname + ' startInstance ' + id + 'Invalid version of "' + name + '". Installed "' + ioPackage.common.version + '", required "' + version);
                return false;
            } else {
                isFound = true;
            }
        } else {
            isFound = true;
        }
    }
    if (!isFound) {
        for (const p in procs) {
            if (!procs.hasOwnProperty(p)) continue;
            if (procs[p] && procs[p].config && procs[p].config.common && procs[p].config.common.name === name) {
                if (version && !semver.satisfies(procs[p].config.common.version, version)) {
                    logger.error('host.' + hostname + ' startInstance ' + id + ': required adapter "' + name + '" has wrong version. Installed "' + procs[p].config.common.version + '", required "' + version + '"!');
                    return false;
                }
                isFound = true;
            }
        }
    }

    if (!isFound) {
        logger.error('host.' + hostname + ' startInstance ' + id + ': required adapter "' + name + '" not found!');
        return false;
    } else {
        return true;
    }
}

function checkVersions(id, deps) {
    try {
        if (deps instanceof Array) {
            for (let d = 0; d < deps.length; deps++) {
                let version = null;
                let name    = null;
                if (typeof deps[d] === 'object') {
                    for (const n in deps[d]) {
                        if (!deps[d].hasOwnProperty(n)) continue;
                        name    = n;
                        version = deps[d][n];
                        break;
                    }
                } else {
                    name = deps[d];
                }
                if (!checkVersion(id, name, version)) {
                    return false;
                }
            }
        } else if (typeof deps === 'object') {
            if (deps.length !== undefined || deps[0]) {
                for (const i in deps) {
                    if (!deps.hasOwnProperty(i)) continue;
                    for (const __name in deps[i]) {
                        if (!deps[i].hasOwnProperty(__name)) continue;
                        if (!checkVersion(id, __name, deps[__name][i])) {
                            return false;
                        }
                    }                }
            } else {
                for (const _name in deps) {
                    if (!deps.hasOwnProperty(_name)) continue;
                    if (!checkVersion(id, _name, deps[_name])) {
                        return false;
                    }
                }
            }
        }
    }
    catch (e) {
        logger.error('host.' + hostname + ' startInstance ' + id + ' [checkVersions]: ' + e);
        logger.error('host.' + hostname + ' startInstance ' + id + ' [checkVersions]: ' + JSON.stringify(deps));
        return false;
    }
    return true;
}

// Store process IDS to make possible kill them all by restart
function storePids() {
    if (!storeTimer) {
        storeTimer = setTimeout(() => {
            storeTimer = null;
            const pids = [];
            for (const id in procs) {
                if (!procs.hasOwnProperty(id)) continue;

                if (procs[id].process && procs[id].process.pid) {
                    pids.push(procs[id].process.pid);
                }
                pids.push(process.pid);
            }
            fs.writeFileSync(__dirname + '/pids.txt', JSON.stringify(pids));
        }, 1000);
    }
}

function installAdapters() {
    if (!installQueue.length) return;

    const task = installQueue[0];
    let name = task.id.split('.')[2];
    if (task.version) {
        name += '@' + task.version;
    }

    if (procs[task.id].downloadRetry < 3) {
        procs[task.id].downloadRetry++;
        logger.warn('host.' + hostname + ' startInstance cannot find adapter "' + name + '". Try to install it... ' + procs[task.id].downloadRetry + ' attempt');
        logger.info('host.' + hostname + ' ' + tools.appName + ' install ' + name);

        try {
            const child = require('child_process').spawn('node', [__dirname + '/' + tools.appName + '.js', 'install', name]);
            if (child.stdout) {
                child.stdout.on('data', data => {
                    data = data.toString().replace(/\n/g, '');
                    logger.info('host.' + hostname + ' ' + tools.appName + ' ' + data);
                });
            }
            if (child.stderr) {
                child.stderr.on('data', data => {
                    data = data.toString().replace(/\n/g, '');
                    logger.error('host.' + hostname + ' ' + tools.appName + ' ' + data);
                });
            }

            child.on('exit', exitCode => {
                logger.info('host.' + hostname + ' ' + tools.appName + ' exit ' + exitCode);
                if (!task.disabled) {
                    startInstance(task.id, task.wakeUp);
                }

                setTimeout(() => {
                    installQueue.shift();
                    installAdapters();
                }, 1000);
            });
            child.on('error', err => {
                logger.error('host.' + hostname + ' Cannot execute "' + __dirname + '/' + tools.appName + '.js install ' + name + ': ' + err);
                setTimeout(() => {
                    installQueue.shift();
                    installAdapters();
                }, 1000);
            });
        } catch (err) {
            logger.error('host.' + hostname + ' Cannot execute "' + __dirname + '/' + tools.appName + '.js install ' + name + ': ' + err);
            setTimeout(() => {
                installQueue.shift();
                installAdapters();
            }, 1000);
        }
    } else {
        logger.error('host.' + hostname + ' Cannot download adapter "' + name + '". To restart it disable/enable it or restart host.');
        setTimeout(() => {
            installQueue.shift();
            installAdapters();
        }, 500);
    }
}

function cleanErrors(id, now, doOutput) {
    if (!procs[id] || !procs[id].errors || !procs[id].errors.length) return;

    now = now || Date.now();

    if (!doOutput && procs[id].lastCleanErrors && now - procs[id].lastCleanErrors < 1000) return;

    procs[id].lastCleanErrors = now;

    // output of errors into log
    if (doOutput) {
        for (let i = 0; i < procs[id].errors.length; i++) {
            if (procs[id].errors[i] && now - procs[id].errors[i].ts < 30000 && procs[id].errors[i].text) {
                const lines = procs[id].errors[i].text.replace('\x1B[31merror\x1B[39m:', '').replace('\x1B[34mdebug\x1B[39m:', 'debug:').split('\n');
                for (let k = 0; k < lines.length; k++) {
                    if (lines[k]) {
                        logger.error('host.' + hostname + ' Caught by controller[' + i + ']: ' + lines[k]);
                    }
                }
            }
        }
        procs[id].errors = [];
    } else {
        // delete to old errors
        for (let e = procs[id].errors.length - 1; e >= 0; e--) {
            if (now - procs[id].errors[e].ts > 30000) {
                procs[id].errors.splice(0, e);
                break;
            }
        }
    }
}

function startInstance(id, wakeUp) {
    if (isStopping || !connected) return;

    if (!procs[id]) {
        logger.error('host.' + hostname + ' startInstance ' + id + ': object not found!');
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
        if (checkVersions(id, instance.common.dependencies)) {
            delete instance.common.dependencies;
        } else {
            return;
        }
    }

    let fileName = instance.common.main || 'main.js';
    const adapterDir_ = tools.getAdapterDir(name);
    if (!fs.existsSync(adapterDir_)) {
        procs[id].downloadRetry = procs[id].downloadRetry || 0;
        installQueue.push({id: id, wakeUp: wakeUp});
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

    let fileNameFull = adapterDir_ + '/' + fileName;

    // workaround for old vis.
    if (instance.common.onlyWWW && name === 'vis') instance.common.onlyWWW = false;

    if (instance.common.mode !== 'extension' && (instance.common.onlyWWW || !fs.existsSync(fileNameFull))) {
        fileName = name + '.js';
        fileNameFull = adapterDir_ + '/' + fileName;
        if (instance.common.onlyWWW || !fs.existsSync(fileNameFull)) {
            // If not just www files
            if (instance.common.onlyWWW || fs.existsSync(adapterDir_ + '/www')) {
                logger.debug('host.' + hostname + ' startInstance ' + name + '.' + args[0] + ' only WWW files. Nothing to start');
            } else {
                logger.error('host.' + hostname + ' startInstance ' + name + '.' + args[0] + ': cannot find start file!');
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
        logger.error(`host.${hostname} startInstance ${name}.${args[0]}: Cannot read and parse "${adapterDir}/package.json"`);
    }

    // check node.js version if defined in package.json
    if (procs[id].engine) {
        if (!semver.satisfies(process.version.replace(/^v/, ''), procs[id].engine)) {
            logger.warn(`host.${hostname} startInstance ${name}.${args[0]}: required node.js version ${procs[id].engine}, actual version ${process.version}`);
            // disable instance
            objects.getObject(id, (err, obj) => {
                if (obj && obj.common && obj.common.enabled) {
                    objects.setObject(obj._id, obj, err =>
                        logger.warn(`host.${hostname} startInstance ${name}.${args[0]}: instance disabled because of node.js version mismatch`));
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

    switch (mode) {
        case 'once':
        case 'daemon':
            if (procs[id] && !procs[id].process) {
                allInstancesStopped = false;
                logger.debug('host.' + hostname + ' startInstance ' + name + '.' + args[0] + ' loglevel=' + args[1]);
                if (config.system.compact && instance.common.compact) {
                    if (!adapterModules[name] && fileNameFull) {
                        try {
                            adapterModules[name] = require(fileNameFull);
                        } catch (e) {
                            logger.error(`host.${hostname} error with ${fileNameFull}: ${JSON.stringify(e)}`);
                        }
                    }
                    if (!adapterModules[name]) {
                        procs[id].process = cp.fork(fileNameFull, args, {stdio: ['ignore', 'ignore', 'pipe', 'ipc']});
                    } else {
                        const _instance = (instance && instance._id && instance.common) ? instance._id.split('.').pop() || 0 : 0;
                        const logLevel = (instance && instance._id && instance.common) ? instance.common.loglevel || 'info' : 'info';
                        try {
                            procs[id].process = adapterModules[name]({logLevel, compactInstance: _instance, compact: true});
                            procs[id].startedInCompactMode = true;
                        } catch (e) {
                            logger.error(`host.${hostname} Cannot start ${name}.${_instance}: ${JSON.stringify(e)}`);
                        }
                    }
                } else {
                    procs[id].process = cp.fork(fileNameFull, args, {stdio: ['ignore', 'ignore', 'pipe', 'ipc']});
                }

                if (!procs[id].startedInCompactMode && procs[id].process) {
                    states.setState(id + '.sigKill', {val: procs[id].process.pid, ack: true, from: 'system.host.' + hostname});
                }

                // catch error output
                if (!procs[id].startedInCompactMode && procs[id].process && procs[id].process.stderr) {
                    procs[id].process.stderr.on('data', data => {
                        if (!data || !procs[id] || typeof procs[id] !== 'object') return;
                        const text = data.toString();
                        // show for debug
                        console.error(text);
                        procs[id].errors = procs[id].errors || [];
                        const now = Date.now();
                        procs[id].errors.push({ts: now, text: text});
                        // limit output to 300 messages
                        if (procs[id].errors > 300) {
                            procs[id].errors.splice(procs[id].errors.length - 300);
                        }
                        cleanErrors(id, now);
                    });
                }

                storePids(); // Store all pids to make possible kill them all

                procs[id].process && procs[id].process.on('exit', (code, signal) => {
                    outputCount += 2;
                    states.setState(id + '.alive',     {val: false, ack: true, from: 'system.host.' + hostname});
                    states.setState(id + '.connected', {val: false, ack: true, from: 'system.host.' + hostname});

                    cleanAutoSubscribes(id);

                    if (procs[id] && procs[id].config && procs[id].config.common.logTransporter) {
                        outputCount++;
                        console.warn(`================================== > LOG REDIRECT ${id} => false [Process stopped]`);
                        states.setState(id + '.logging', {val: false, ack: true, from: 'system.host.' + hostname});
                    }

                    // show stored errors
                    cleanErrors(id, null, code !== EXIT_CODES.START_IMMEDIATELY_AFTER_STOP_HEX && code !== EXIT_CODES.START_IMMEDIATELY_AFTER_STOP && code !== EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);

                    if (mode !== 'once') {
                        if (signal) {
                            logger.warn('host.' + hostname + ' instance ' + id + ' terminated due to ' + signal);
                        } else if (code === null) {
                            logger.error('host.' + hostname + ' instance ' + id + ' terminated abnormally');
                        }

                        if ((procs[id] && procs[id].stopping) || isStopping || wakeUp) {
                            logger.info('host.' + hostname + ' instance ' + id + ' terminated with code ' + code + ' (' + (getErrorText(code) || '') + ')');
                            if (procs[id].stopping !== undefined) {
                                delete procs[id].stopping;
                            }

                            if (procs[id].process) {
                                delete procs[id].process;
                            }

                            if (isStopping) {
                                for (const i in procs) {
                                    if (!procs.hasOwnProperty(i)) continue;
                                    if (procs[i].process) {
                                        //console.log(procs[i].config.common.name + ' still running');
                                        return;
                                    }
                                }
                                logger.info('host.' + hostname + ' All instances are stopped.');
                                allInstancesStopped = true;
                            }
                            storePids(); // Store all pids to make possible kill them all
                            return;
                        } else {
                            //noinspection JSUnresolvedVariable
                            if (code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION) {
                                logger.error(`host.${hostname} instance ${id} terminated by request of the instance itself and will not be restarted, before user restarts it.`);
                            } else
                            if (code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP_HEX /* -100 */ && procs[id].config.common.restartSchedule) {
                                logger.info('host.' + hostname + ' instance ' + id + ' scheduled normal terminated and will be started anew.');
                            } else {
                                logger.error('host.' + hostname + ' instance ' + id + ' terminated with code ' + code + ' (' + (getErrorText(code) || '') + ')');
                            }
                        }
                    }

                    if (procs[id] && procs[id].process) {
                        delete procs[id].process;
                    }
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
                        logger.info('host.' + hostname + ' Restart adapter ' + id + ' because enabled');

                        //noinspection JSUnresolvedVariable
                        if (procs[id].restartTimer) {
                            clearTimeout(procs[id].restartTimer);
                        }
                        procs[id].restartTimer = setTimeout(_id => startInstance(_id),
                            code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP_HEX ? 1000 : (procs[id].config.common.restartSchedule ? 1000 : 30000), id);
                        // 4294967196 (-100) is special code that adapter wants itself to be restarted immediately
                    } else {
                        if (code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION) {
                            logger.info(`host.${hostname} Do not restart adapter ${id} because desired by instance`);
                        } else
                        if (mode !== 'once') {
                            logger.info(`host.${hostname} Do not restart adapter ${id} because disabled or deleted`);
                        } else {
                            logger.info(`host.${hostname} instance ${id} terminated while should be started once`);
                        }
                    }
                    storePids(); // Store all pids to make possible kill them all
                });
                if (!wakeUp && procs[id] && procs[id].process && procs[id].config.common && procs[id].config.common.enabled && (!procs[id].config.common.webExtension || !procs[id].config.native.webInstance) && mode !== 'once') {
                    if (procs[id].startedInCompactMode) {
                        logger.info(`host.${hostname} instance ${instance._id} started in COMPACT mode`);
                    } else {
                        logger.info(`host.${hostname} instance ${instance._id} started with pid ${procs[id].process.pid}`);
                    }
                }
            } else {
                !wakeUp && procs[id] && logger.warn('host.' + hostname + ' instance ' + instance._id + ' already running with pid ' + procs[id].process.pid);
            }
            break;

        case 'schedule':
            if (!instance.common.schedule) {
                logger.error('host.' + hostname + ' ' + instance._id + ' schedule attribute missing');
                break;
            }
            if (procs[id].schedule) {
                procs[id].schedule.cancel();
                logger.info('host.' + hostname + ' instance canceled schedule ' + instance._id);
            }

            procs[id].schedule = schedule.scheduleJob(instance.common.schedule, () => {
                if (!procs[id]) {
                    logger.error('host.' + hostname + ' scheduleJob: Task deleted (' + id + ')');
                    return;
                }
                // After sleep of PC all scheduled runs come together. There is no need to run it X times in one second. Just the last.
                if (procs[id].lastStart && Date.now() - procs[id].lastStart < 2000) {
                    logger.warn('host.' + hostname + ' instance ' + instance._id + ' does not started, because just executed');
                    return;
                }

                // Remember the last run
                procs[id].lastStart = Date.now();
                if (!procs[id].process) {
                    const args = [instance._id.split('.').pop(), instance.common.loglevel || 'info'];
                    procs[id].process = cp.fork(fileNameFull, args);
                    storePids(); // Store all pids to make possible kill them all
                    logger.info('host.' + hostname + ' instance ' + instance._id + ' started with pid ' + procs[instance._id].process.pid);

                    procs[id].process.on('exit', (code, signal) => {
                        outputCount++;
                        states.setState(id + '.alive', {val: false, ack: true, from: 'system.host.' + hostname});
                        if (signal) {
                            logger.warn('host.' + hostname + ' instance ' + id + ' terminated due to ' + signal);
                        } else if (code === null) {
                            logger.error('host.' + hostname + ' instance ' + id + ' terminated abnormally');
                        } else {
                            code = parseInt(code, 10);
                            const text = `host.${hostname} instance ${id} terminated with code ${code} (${getErrorText(code) || ''})`;
                            if (!code || code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION) {
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
                    !wakeUp && logger.warn('host.' + hostname + ' instance ' + instance._id + ' already running with pid ' + procs[id].process.pid);
                }
            });
            logger.info('host.' + hostname + ' instance scheduled ' + instance._id + ' ' + instance.common.schedule);
            // Start one time adapter by start or if configuration changed
            //noinspection JSUnresolvedVariable
            if (instance.common.allowInit) {
                procs[id].process = cp.fork(fileNameFull, args);
                storePids(); // Store all pids to make possible kill them all
                logger.info('host.' + hostname + ' instance ' + instance._id + ' started with pid ' + procs[instance._id].process.pid);

                procs[id].process.on('exit', (code, signal) => {
                    cleanAutoSubscribes(id);

                    outputCount++;
                    states.setState(id + '.alive', {val: false, ack: true, from: 'system.host.' + hostname});
                    if (signal) {
                        logger.warn('host.' + hostname + ' instance ' + id + ' terminated due to ' + signal);
                    } else if (code === null) {
                        logger.error('host.' + hostname + ' instance ' + id + ' terminated abnormally');
                    } else {
                        code = parseInt(code, 10);
                        const text = `host.${hostname} instance ${id} terminated with code ${code} (${getErrorText(code) || ''})`;
                        if (!code || code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION) {
                            logger.info(text);
                        } else {
                            logger.error(text);
                        }
                    }
                    delete procs[id].process;
                    storePids(); // Store all pids to make possible kill them all
                });
            }

            break;

        case 'extension':
        case 'subscribe':
            break;

        default:
            logger.error('host.' + hostname + ' ' + instance._id + ' invalid mode');

    }
}

function stopInstance(id, callback) {
    logger.info('host.' + hostname + ' stopInstance ' + id);
    if (!procs[id]) {
        logger.warn('host.' + hostname + ' unknown instance ' + id);
        if (typeof callback === 'function') callback();
        return;
    }

    const instance = procs[id].config;
    if (!instance || !instance.common || !instance.common.mode) {
        if (procs[id].process) {
            procs[id].stopping = true;
            try {
                procs[id].process.kill();  // call stop directly in adapter.js or call kill of process
            } catch (e) {
                logger.error(`host.${hostname} Cannot stop ${id}: ${JSON.stringify(e)}`);
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
        if (typeof callback === 'function') callback();
        return;
    }

    switch (instance.common.mode) {
        case 'daemon':
            if (!procs[id].process) {
                logger.warn('host.' + hostname + ' stopInstance ' + instance._id + ' not running');
                if (typeof callback === 'function') callback();
            } else {
                //noinspection JSUnresolvedVariable
                if (instance.common.messagebox && instance.common.supportStopInstance) {
                    let timeout;
                    // Send to adapter signal "stopInstance" because on some systems SIGTERM does not work
                    sendTo(instance._id, 'stopInstance', null, result => {
                        if (timeout) {
                            clearTimeout(timeout);
                            timeout = null;
                        }
                        logger.info('host.' + hostname + ' stopInstance self ' + instance._id + ' killing pid ' + procs[id].process.pid + (result ? ': ' + result : ''));
                        if (procs[id].process) {
                            procs[id].stopping = true;
                            try {
                                procs[id].process.kill(); // call stop directly in adapter.js or call kill of process
                            } catch (e) {
                                logger.error(`host.${hostname} Cannot stop ${id}: ${JSON.stringify(e)}`);
                            }

                            delete procs[id].process;
                        }

                        if (typeof callback === 'function') {
                            callback();
                            callback = null;
                        }
                    });

                    const timeoutDuration = (instance.common.supportStopInstance === true) ? 1000 : (instance.common.supportStopInstance || 1000);
                    // If no response from adapter, kill it in 1 second
                    timeout = setTimeout(() => {
                        timeout = null;
                        if (procs[id].process) {
                            logger.info('host.' + hostname + ' stopInstance timeout "' + timeoutDuration + ' ' + instance._id + ' killing pid  ' + procs[id].process.pid);
                            procs[id].stopping = true;
                            try {
                                procs[id].process.kill(); // call stop directly in adapter.js or call kill of process
                            } catch (e) {
                                logger.error(`host.${hostname} Cannot stop ${id}: ${JSON.stringify(e)}`);
                            }
                            delete procs[id].process;
                        }
                        if (typeof callback === 'function') {
                            callback();
                            callback = null;
                        }
                    }, timeoutDuration);
                } else {
                    logger.info('host.' + hostname + ' stopInstance ' + instance._id + ' killing pid ' + procs[id].process.pid);
                    procs[id].stopping = true;
                    try {
                        procs[id].process.kill(); // call stop directly in adapter.js or call kill of process
                    } catch (e) {
                        logger.error(`host.${hostname} Cannot stop ${id}: ${JSON.stringify(e)}`);
                    }
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
                logger.warn('host.' + hostname + ' stopInstance ' + instance._id + ' not scheduled');
            } else {
                procs[id].schedule.cancel();
                delete procs[id].schedule;
                logger.info('host.' + hostname + ' stopInstance canceled schedule ' + instance._id);
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
                if (typeof callback === 'function') callback();
            } else {
                logger.info('host.' + hostname + ' stopInstance ' + instance._id + ' killing pid ' + procs[id].process.pid);
                procs[id].stopping = true;
                try {
                    procs[id].process.kill(); // call stop directly in adapter.js
                } catch (e) {
                    logger.error(`host.${hostname} Cannot stop ${id}: ${JSON.stringify(e)}`);
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
 if (disconnectTimeout) clearTimeout(disconnectTimeout);
 disconnectTimeout = setTimeout(function () {
 console.log('TEST !!!!! STOP!!!! ===============================================');
 connected = false;
 disconnectTimeout = null;
 logger.warn('host.' + hostname + ' Slave controller detected disconnection. Stop all instances.');
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
 if (disconnectTimeout) {
 clearTimeout(disconnectTimeout);
 disconnectTimeout = null;
 }

 if (!connected) {
 if (connected === null) setMeta();

 connected = true;
 logger.info('host.' + hostname + ' ' + ' connected');

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
            isStopping = null;
            if (typeof callback === 'function') callback();
            callback = null;
        }
    }

    try {
        const elapsed = (isStopping ? (Date.now() - isStopping) : 0);
        logger.debug('host.' + hostname + ' stop isStopping=' + elapsed + ' isDaemon=' + isDaemon + ' allInstancesStopped=' + allInstancesStopped);
        if (elapsed >= stopTimeout) {
            isStopping = null;
            if (timeout) clearTimeout(timeout);
            if (typeof callback === 'function') callback(true);
            callback = null;
        } else {
            // Sometimes process receives SIGTERM twice
            isStopping = isStopping || Date.now();
        }

        if (forceStop || isDaemon) {
            // send instances SIGTERM, only needed if running in background (isDaemon)
            // or slave lost connection to master
            for (const id in procs) {
                if (!procs.hasOwnProperty(id)) continue;
                stopInstance(id);
            }
        }

        waitForInstances();
    } catch (e) {
        logger.error('host.' + hostname + ' ' + e.message);
        isStopping = null;
        if (timeout) clearTimeout(timeout);
        if (typeof callback === 'function') callback();
        callback   = null;
    }

    // force after Xs
    timeout = setTimeout(() => {
        timeout    = null;
        isStopping = null;
        typeof callback === 'function' && callback(true);
        callback   = null;
    }, stopTimeout);
}

function stop() {
    if (mhService) {
        mhService.close();
        mhService = null;
    }

    stopInstances(false, wasForced => {
        if (objects && objects.destroy) objects.destroy();

        outputCount++;
        states.setState('system.host.' + hostname + '.alive', {val: false, ack: true, from: 'system.host.' + hostname}, () => {
            logger.info('host.' + hostname + ' ' + (wasForced ? 'force terminating' : 'terminated'));
            if (wasForced) {
                for (const i in procs) {
                    if (!procs.hasOwnProperty(i)) continue;
                    if (procs[i].process) {
                        if (procs[i].config && procs[i].config.common && procs[i].config.common.name) {
                            logger.info('host.' + hostname + ' Adapter ' + procs[i].config.common.name + ' still running');
                        }
                    }
                }
            }
            states && states.destroy && states.destroy();
            setTimeout(() => process.exit(EXIT_CODES.JS_CONTROLLER_STOPPED), 1000);
        });
    });
}

// bootstrap
function init() {
    // Get "objects" object
    // If "file" and on the local machine
    if (config.objects.type === 'file' && (!config.objects.host || config.objects.host === 'localhost' || config.objects.host === '127.0.0.1' || config.objects.host === '0.0.0.0')) {
        Objects = require('./lib/objects/objectsInMemServer');
    } else {
        Objects = require('./lib/objects');
    }

    // Get "states" object
    if (config.states.type === 'file' && (!config.states.host || config.states.host === 'localhost' || config.states.host === '127.0.0.1' || config.states.host === '0.0.0.0')) {
        States  = require('./lib/states/statesInMemServer');
    } else {
        States  = require('./lib/states');
    }

    // Detect if outputs to console are forced. By default they are disabled and redirected to log file
    if (config.log.noStdout && process.argv && (process.argv.indexOf('--console') !== -1 || process.argv.indexOf('--logs') !== -1)) {
        config.log.noStdout = false;
    }

    // Detect if controller runs as a linux-daemon
    if (process.argv.indexOf('start') !== -1) {
        isDaemon = true;
        config.log.noStdout = true;
    }

    logger = require('./lib/logger.js')(config.log);

    // Delete all log files older than x das
    logger.activateDateChecker(true, config.log.maxDays);

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
        info.from = 'host.' + hostname;
        for (let i = 0; i < logList.length; i++) {
            states.pushLog(logList[i], info);
        }
    });

    logger.info('host.' + hostname + ' ' + tools.appName + '.js-controller version ' + version + ' ' + ioPackage.common.name + ' starting');
    logger.info('host.' + hostname + ' Copyright (c) 2014-2019 bluefox, 2014 hobbyquaker');
    logger.info('host.' + hostname + ' hostname: ' + hostname + ', node: ' + process.version);
    logger.info('host.' + hostname + ' ip addresses: ' + getIPs().join(' '));

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

    // create states object
    states = createStates();

    // Subscribe for all logging objects
    states.subscribe('*.logging');

    // Subscribe for all logging objects
    states.subscribe('system.adapter.*.alive');

    // Subscribe for connection state of all instances
    // Disabled in 1.5.x
    // states.subscribe('*.info.connection');

    objects = createObjects();

    objects.subscribe('system.adapter.*');

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
                        logger.warn('host.' + hostname + ' logger ' + id + ' was deleted');
                        states.delState(id);
                    });
                }
            });
        }
    });

    process.on('SIGINT', () => {
        logger.info('host.' + hostname + ' received SIGINT');
        stop();
    });

    process.on('SIGTERM', () => {
        logger.info('host.' + hostname + ' received SIGTERM');
        stop();
    });

    process.on('uncaughtException', err => {
        if (err.arguments && err.arguments[0] === 'fragmentedOperation') {
            logger.error('host.' + hostname + ' fragmentedOperation: restart objects');
            // restart objects
            objects.destroy();
            objects = null;
            // Give time to close the objects
            setTimeout(() => objects = createObjects(), 3000);
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
                logger.error('host.' + hostname + ' Another instance is running or some application uses port!');
                logger.error('host.' + hostname + ' uncaught exception: ' + err.message);
            } else {
                logger.error('host.' + hostname + ' uncaught exception: ' + err.message);
                logger.error('host.' + hostname + ' ' + err.stack);
            }
        } else {
            logger.error('host.' + hostname + ' uncaught exception: ' + err);
        }
        stop();
        // Restart itself
        processMessage({command: 'cmdExec', message: {data: '_restart'}});
    });
}

init();
