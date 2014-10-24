/**
 *      ioBroker.ctrl (ioBroker Controller)
 *
 *      Controls Adapter-Processes
 *
 *
 */

// Change version in io-package.json and start grunt task to modify the version
var version = '0.0.25';
var title = 'io.js-controller';
process.title = title;

var schedule =     require('node-schedule');
var os =           require('os');
var fs =           require('fs');
var cp =           require('child_process');
var ObjectsCouch = require(__dirname + '/lib/couch.js');
var StatesRedis =  require(__dirname + '/lib/redis.js');
var ioPackage =    require(__dirname + '/io-package.json');
var tools =        require(__dirname + '/lib/tools.js');

var logger;
var isDaemon;
var callbackId = 1;
var callbacks = {};
var hostname = os.hostname();

if (process.argv.indexOf('start') !== -1) {
    isDaemon = true;
    logger = require(__dirname + '/lib/logger.js')('info', ['iobroker.log'], true);
} else {
    logger = require(__dirname + '/lib/logger.js')('info', ['iobroker.log']);
}

var config;
if (!fs.existsSync(__dirname + '/conf/iobroker.json')) {
    logger.error('controller conf/iobroker.json missing - call node iobroker.js setup');
    process.exit(1);
} else {
    config = JSON.parse(fs.readFileSync(__dirname + '/conf/iobroker.json'));
}

var ifaces = os.networkInterfaces();
var ipArr = [];
for (var dev in ifaces) {
    /*jshint loopfunc:true */
    ifaces[dev].forEach(function (details) {
        if (!details.internal) ipArr.push(details.address);
    });
}

logger.info('ioBroker.nodejs version ' + version + ' ' + ioPackage.common.name + ' starting');
logger.info('Copyright (c) 2014 hobbyquaker, bluefox');
logger.info('controller hostname: ' + hostname);
logger.info('controller ip addresses: ' + ipArr.join(' '));

var procs     = {};
var subscribe = {};

var states = new StatesRedis({

    redis: {
        host:    config.redis.host,
        port:    config.redis.port,
        options: config.redis.options
    },
    logger: logger,
    change: function (id, state) {
        // If this is messagebox
        if (id == 'system.host.' + hostname + '.messagebox') {
            // Read it from fifo list
            states.getMessage('system.host.' + hostname + '.messagebox', function (err, obj) {
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
                        var now = (new Date()).getTime();
                        for (var id in callbacks) {
                            if (now - callbacks[id].time > 3600000) delete callbacks[id];
                        }
                    } else {
                        processMessage(obj);
                    }
                }
            });
        } else
        if (subscribe[id]) {
            for (var i = 0; i < subscribe[id].length; i++) {
                // wake up adapter
                if (procs[subscribe[id][i]]) {
                    console.log("Wake up " + id + ' ' + JSON.stringify(state));
                    startInstance(subscribe[id][i], true);
                } else {
                    logger.warn("Adapter subscribed on " + id + " does not exist!");
                }
            }
        } else
        // Monitor activity of the adapter and restart it if stopped
        if (!isStopping && id.substring(id.length - '.alive'.length) == '.alive') {
            var adapter = id.substring(0, id.length - '.alive'.length);
            if (procs[adapter] &&
                !procs[adapter].stopping &&
                !procs[adapter].process &&
                procs[adapter].config &&
                procs[adapter].config.common.enabled &&
                procs[adapter].config.common.mode == 'daemon') {
                startInstance(adapter, false);
            }
        }
    }
});
//states.subscribe('*');

var objects = new ObjectsCouch({
    host: config.couch.host,
    port: config.couch.port,
    user: config.couch.user,
    pass: config.couch.pass,
    logger: logger,
    connected: function () {
        logger.info('controller couchdb connected');
        setMeta();
        getInstances();
        startAliveInterval();
        initMessageQueue();
    },
    change: function (id, obj) {
        if (!id.match(/^system\.adapter\.[a-zA-Z0-9-_]+\.[0-9]+$/)) return;
        logger.info('controller object change ' + id);
        if (procs[id]) {
            // known adapter
            if (!obj) {
                procs[id].config.common.enabled = false;
                procs[id].config.common.host    = null;
                procs[id].config.deleted = true;
                logger.info('controller object deleted ' + id);

            } else {
                procs[id].config = obj;
            }
            if (procs[id].process) {
                stopInstance(id, function () {
                    if (ipArr.indexOf(procs[id].config.common.host) !== -1 || procs[id].config.common.host === hostname) {
                        if (procs[id].config.common.enabled) {
                            setTimeout(function (_id) {
                                startInstance(_id);
                            }, 2500, id);
                        }
                    } else {
                        delete procs[id];
                    }
                });
            } else {
                if (procs[id].config && (ipArr.indexOf(procs[id].config.common.host) !== -1 || procs[id].config.common.host === hostname)) {
                    if (procs[id].config.common.enabled) startInstance(id);
                } else {
                    delete procs[id];
                }
            }

        } else if (obj && obj.common) {
            // new adapter
            if (ipArr.indexOf(obj.common.host) !== -1 || obj.common.host === hostname) {
                procs[id] = {config: obj};
                if (procs[id].config.common.enabled) startInstance(id);
            }
        }
    }

});

objects.subscribe('system.adapter.*');

function startAliveInterval() {
    reportStatus();
    setInterval(function () {
        reportStatus();
    }, 15000);
}

function reportStatus() {
    var id = 'system.host.' + hostname;
    states.setState(id + '.alive', {val: true, ack: true, expire: 30, from: id});
    states.setState(id + '.load',  {val: parseFloat(os.loadavg()[0].toFixed(2)), ack: true, from: id});
    states.setState(id + '.mem',   {val: parseFloat((100 * os.freemem() / os.totalmem()).toFixed(0)), ack: true, from: id});
}

function setMeta() {
    var id = 'system.host.' + hostname;

    objects.getObject(id, function (err, oldObj) {
        var newObj = {
            _id: id,
            type: 'host',
            common: {
                name:             id,
//            process:          process.title, // actually not required, because there is type now
                title:            ioPackage.common.title,
                installedVersion: version,
                platform:         ioPackage.common.platform,
                cmd:              process.argv[0] + ' ' + process.execArgv.join(' ') + ' ' + process.argv.slice(1).join(' '),
                hostname:         hostname,
                address:          ipArr,
                children:         [
                        id + '.alive',
                        id + '.load',
                        id + '.mem'
                ],
                type:             ioPackage.common.name
            },
            native: {
                process: {
                    title:      process.title,
                    pid:        process.pid,
                    versions:   process.versions,
                    env:        process.env
                },
                os: {
                    hostname:   hostname,
                    type:       os.type(),
                    platform:   os.platform(),
                    arch:       os.arch(),
                    release:    os.release(),
                    uptime:     os.uptime(),
                    endianness: os.endianness(),
                    tmpdir:     os.tmpdir()
                },
                hardware: {
                    cpus:       os.cpus(),
                    totalmem:   os.totalmem(),
                    networkInterfaces: os.networkInterfaces()
                }
            }
        };
        if (oldObj) {
            if (oldObj.common && oldObj.common.children) oldObj.common.children = [];
            if (oldObj.native && oldObj.native.hardware && oldObj.native.hardware.networkInterfaces) oldObj.native.hardware.networkInterfaces = [];
            newObj = require('node.extend')(true, oldObj, newObj);
        }

        objects.setObject(id, newObj);
    });

    var idMem = id + ".mem";
    var obj = {
        _id: idMem,
        type: 'state',
        parent: id,
        common: {
            type: 'number',
            name: 'Memory usage',
            unit: '%',
            min: 0,
            max: 100
        },
        native: {}
    };
    objects.extendObject(idMem, obj);
    var idLoad = id + ".load";
    obj = {
        _id: idLoad,
        type: 'state',
        parent: id,
        common: {
            unit: '',
            type: 'number',
            name: 'Load Average 1min'
        },
        native: {}
    };
    objects.extendObject(idLoad, obj);
    var idAlive = id + ".alive";
    obj = {
        _id: idAlive,
        type: 'state',
        parent: id,
        common: {
            name: 'Host alive',
            type: 'boolean'
        },
        native: {}
    };
    objects.extendObject(idAlive, obj);
}

// Subscribe on message queue
function initMessageQueue() {
    states.subscribeMessage('system.host.' + hostname + '.messagebox');
}

// Send message to other adapter instance
function sendTo(objName, command, message, callback) {
    if (typeof message == 'undefined') {
        message = command;
        command = 'send';
    }
    var obj = {command: command, message: message, from: 'system.host.' + hostname};
    if (objName.substring(0, 'system.adapter.'.length) != 'system.adapter.' &&
        objName.substring(0, 'system.host.'.length)    != 'system.host.') objName = 'system.adapter.' + objName;

    if (callback) {
        if (typeof callback == "function") {
            obj.callback = {
                message: message,
                id:      callbackId++,
                ack:     false,
                time:    (new Date()).getTime()
            };
            if (callbackId > 0xFFFFFFFF) callbackId = 1;
            if (!callbacks) callbacks = {};
            callbacks['_' + obj.callback.id] = {cb: callback};
        } else {
            obj.callback     = callback;
            obj.callback.ack = true;
        }
    }

    states.pushMessage(objName + '.messagebox', obj);
}

// Process message to controller, like execute some script
function processMessage(msg) {
    switch (msg.command) {
        case 'cmdExec':
            var spawn = require('child_process').spawn;
            var args = [__dirname + '/iobroker.js'];
            var cmd = msg.message.data.split(' ');
            for (var i = 0; i < cmd.length; i++) {
                args.push(cmd[i]);
            }
            logger.info('iobroker ' + args.slice(1).join(' '));

            var child = spawn('node', args);
            child.stdout.on('data', function (data) {
                data = data.toString().replace('\n', '');
                logger.info('iobroker ' + data);
                if (msg.from) sendTo(msg.from, 'cmdStdout', {id: msg.message.id, data: data});
            });
            child.stderr.on('data', function (data) {
                data = data.toString().replace('\n', '');
                logger.error('iobroker ' + data);
                if (msg.from) sendTo(msg.from, 'cmdStderr', {id: msg.message.id, data: data});
            });

            child.on('exit', function (exitCode) {
                logger.info('iobroker exit ' + exitCode);
                if (msg.from) sendTo(msg.from, 'cmdExit', {id: msg.message.id, data: exitCode});
            });
            break;

        case 'getRepository':
            if (!msg.callback) {
                logger.error('call getRepository without callback');
                return;
            }
            objects.getObject('system.config', function (err, systemConfig) {
                // Check if repositories exists
                if (!err && systemConfig && systemConfig.common && systemConfig.common.repositories) {
                    var updateRepo = false;
                    if (typeof msg.message == 'object') {
                        updateRepo = msg.message.update;
                        msg.message = msg.message.repo;
                    }

                    var active = msg.message || systemConfig.common.activeRepo;

                    if (systemConfig.common.repositories[active]) {

                        if (typeof systemConfig.common.repositories[active] == 'string') {
                            systemConfig.common.repositories[active] = {
                                link: systemConfig.common.repositories[active],
                                json: null
                            };
                        }

                        // If repo is not yet loaded
                        if (!systemConfig.common.repositories[active].json || updateRepo) {
                            logger.info('Update repository "' + active + '" under "' + systemConfig.common.repositories[active].link + '"');
                            // Load it
                            tools.getRepositoryFile(systemConfig.common.repositories[active].link, function (sources) {
                                systemConfig.common.repositories[active].json = sources;
                                sendTo(msg.from, msg.command, systemConfig.common.repositories[active].json, msg.callback);
                                // Store uploaded repo
                                objects.setObject('system.config', systemConfig);
                            });
                        } else {
                            // We have already repo, give it back
                            sendTo(msg.from, msg.command, systemConfig.common.repositories[active].json, msg.callback);
                        }
                    } else {
                        logger.warn('Requested repository "' + active + '" does not exit in config.');
                        sendTo(msg.from, msg.command, null, msg.callback);
                    }
                }
            });
            break;

        case 'getInstalled':
            if (msg.callback) {
                // Get list of all hosts
                objects.getObjectView('system', 'host', {}, function (err, doc) {
                    var result = tools.getInstalledInfo();
                    result.hosts = {};
                    var infoCount = 0;
                    if (doc && doc.rows.length) {
                        // Read installed versions of all hosts
                        for (var i = 0; i < doc.rows.length; i++) {
                            infoCount++;
                            sendTo(doc.rows[i].id, 'getVersion', null, function (ioPack) {
                                infoCount--;
                                if (ioPack) {
                                    result.hosts[ioPack.host] = ioPack;
                                }
                                if (!infoCount) sendTo(msg.from, msg.command, result, msg.callback);
                            });
                        }
                    }
                    if (!infoCount) sendTo(msg.from, msg.command, result, msg.callback);
                });
            }
            break;

        case 'getVersion':
            if (msg.callback) {
                var ioPack = null;
                try {
                    ioPack = JSON.parse(fs.readFileSync(__dirname + '/io-package.json'));
                } catch (e) {
                    logger.error('iobroker cannot read and parse "' + __dirname + '/io-package.json"');
                }
                if (ioPack) {
                    ioPack.common.host = hostname;
                    sendTo(msg.from, msg.command, ioPack.common, msg.callback);
                } else {
                    sendTo(msg.from, msg.command, null, msg.callback);
                }
            }
            break;
    }

}

function getInstances() {

    objects.getObjectView('system', 'instance', {}, function (err, doc) {
        if (err && err.status_code === 404) {
            logger.error('controller _design/system missing - call node iobroker.js setup');
            process.exit(1);
            return;
        } else if (doc.rows.length === 0) {
            logger.info('controller no instances found');
        } else {
            logger.info('controller ' + doc.rows.length + ' instance' + (doc.rows.length === 1 ? '' : 's') + ' found');
            var count = 0;
            for (var i = 0; i < doc.rows.length; i++) {
                var instance = doc.rows[i].value;

                if (instance.common.mode === 'web' || instance.common.mode === 'none') continue;

                logger.debug('controller check instance "' + doc.rows[i].id  + '" for host "' + instance.common.host + '"');

                if (ipArr.indexOf(instance.common.host) !== -1 || instance.common.host === hostname) {
                    procs[instance._id] = {config: instance};
                    if (instance.common.enabled) count++;
                }
            }
            if (count > 0) {
                logger.info('controller starting ' + count + ' instance' + (count > 1 ? 's' : ''));
            } else {
                logger.warn('controller does not start any instances on this host');
            }

        }

        initInstances();
    });
}

function initInstances() {
    var c = 0;
    for (var id in procs) {
        if (procs[id].config.common.enabled) {

            setTimeout(function (_id) {
                startInstance(_id);
            }, 2000 * c++, id);

            c += 1;
        }
    }
}

function startInstance(id, wakeUp) {
    if (isStopping) return;

    var instance = procs[id].config;
    var name = id.split('.')[2];
    var mode = instance.common.mode;

    if (wakeUp) mode = 'daemon';

    if (instance.common.wakeup) {
        // TODO
    }

    if (instance.common.run) {
        // TODO
    }

    var fileName = instance.common.main || "main.js";
    if (!fs.existsSync(__dirname + '/adapter/' + name + '/' + fileName)) {
        fileName = name + '.js';
        if (!fs.existsSync(__dirname + '/adapter/' + name + '/' + fileName)) {
            procs[id].downloadRetry = procs[id].downloadRetry || 0;
            if (procs[id].downloadRetry < 3) {
                procs[id].downloadRetry++;
                logger.warn('controller startInstance cannot find start file for adapter "' + name + '". Try to install it...' + procs[id].downloadRetry + ' attempt');
                logger.info('iobroker install ' + name);

                var child = require('child_process').spawn('node', [__dirname + '/iobroker.js', 'install', name]);
                child.stdout.on('data', function (data) {
                    data = data.toString().replace('\n', '');
                    logger.info('iobroker ' + data);
                });
                child.stderr.on('data', function (data) {
                    data = data.toString().replace('\n', '');
                    logger.error('iobroker ' + data);
                });
                child.on('exit', function (exitCode) {
                    logger.info('iobroker exit ' + exitCode);
                    startInstance(id, wakeUp);
                });
            } else {
                logger.error('Cannot download adapter "' + name + '". To restart it disable/enable it or restart host.');
            }

            return;
        }
    }
    procs[id].downloadRetry = 0;

    switch (mode) {
        case 'daemon':
            if (!procs[id].process) {
                allInstancesStopped = false;
                var args = [instance._id.split('.').pop(), instance.common.loglevel || 'info'];
                logger.debug('controller startInstance ' + name + '.' + args[0] + ' loglevel=' + args[1]);
                procs[id].process = cp.fork(__dirname + '/adapter/' + name + '/' + fileName, args);
                procs[id].process.on('exit', function (code, signal) {
                    states.setState(id + '.alive',     {val: false, ack: true, from: 'system.host.' + hostname});
                    states.setState(id + '.connected', {val: false, ack: true, from: 'system.host.' + hostname});
                    if (signal) {
                        logger.warn('controller instance ' + id + ' terminated due to ' + signal);
                    } else if (code === null) {
                        logger.error('controller instance ' + id + ' terminated abnormally');
                    } else {
                        if ((procs[id] && procs[id].stopping) || isStopping || wakeUp) {
                            logger.info('controller instance ' + id + ' terminated with code ' + code);
                            delete procs[id].stopping;
                            if (procs[id].process) delete procs[id].process;
                            if (isStopping) {
                                for (var i in procs) {
                                    if (procs[i].process) {
                                        return;
                                    }
                                }
                                allInstancesStopped = true;
                            }
                            return;
                        } else {
                            logger.error('controller instance ' + id + ' terminated with code ' + code);
                        }
                    }
                    if (procs[id] && procs[id].process) delete procs[id].process;
                    if (!wakeUp && procs[id] && procs[id].config && procs[id].config.common && procs[id].config.common.enabled) {
                        setTimeout(function (_id) {
                            startInstance(_id);
                        }, 30000, id);
                    }
                });
                if (!wakeUp && procs[id]) logger.info('controller instance ' + instance._id + ' started with pid ' + procs[id].process.pid);
            } else {
                if (!wakeUp && procs[id]) logger.warn('controller instance ' + instance._id + ' already running with pid ' + procs[id].process.pid);
            }
            break;
        case 'schedule':
            if (!instance.common.schedule) {
                logger.error(instance._id + ' schedule attribute missing');
                break;
            }
            if (procs[id].schedule) {
                procs[id].schedule.cancel();
                logger.info('controller instance canceled schedule ' + instance._id);
            }
            procs[id].schedule = schedule.scheduleJob(instance.common.schedule, function () {

                var args = [instance._id.split('.').pop(), instance.common.loglevel || 'info'];
                procs[id].process = cp.fork(__dirname + '/adapter/' + name + '/' + fileName, args);
                logger.info('controller instance ' + instance._id + ' started with pid ' + procs[instance._id].process.pid);

                procs[id].process.on('exit', function (code, signal) {
                    states.setState(id + '.alive', {val: false, ack: true, from: 'system.host.' + hostname});
                    if (signal) {
                        logger.warn('controller instance ' + id + ' terminated due to ' + signal);
                    } else if (code === null) {
                        logger.error('controller instance ' + id + ' terminated abnormally');
                    } else {
                        if (code === 0 || code === '0') {
                            logger.info('controller instance ' + id + ' terminated with code ' + code);
                            return;
                        } else {
                            logger.error('controller instance ' + id + ' terminated with code ' + code);
                        }
                    }
                    delete procs[id].process;
                });

            });
            logger.info('controller instance scheduled ' + instance._id + ' ' + instance.common.schedule);

            break;
        case 'subscribe':
            procs[id].subscribe = instance.common.subscribe || instance._id + ".wakeup";
            var parts = instance._id.split('.');
            var instanceId = parts[parts.length - 1];
            procs[id].subscribe = procs[id].subscribe.replace("<INSTANCE>", instanceId);

            if (subscribe[procs[id].subscribe] && subscribe[procs[id].subscribe].indexOf(id) == -1) {
                subscribe[procs[id].subscribe].push(procs[id].subscribe);
            } else {
                subscribe[procs[id].subscribe] = [id];
            }

            // Subscribe on changes
            if (procs[id].subscribe == instance._id + ".messagebox") {
                states.subscribeMessage(procs[id].subscribe);
            } else {
                states.subscribe(procs[id].subscribe);
            }

            break;

        default:
            logger.error(instance._id + ' invalid mode');

    }
}

function stopInstance(id, callback) {
    logger.info('stopInstance ' + id);
    if (!procs[id]) {
        logger.warn('unknown instance ' + id);
        if (typeof callback === 'function') callback();
        return;
    }

    var instance = procs[id].config;
    if (!instance || !instance.common || !instance.common.mode) {
        if (procs[id].process) {
            procs[id].stopping = true;
            procs[id].process.kill();
            delete(procs[id].process);
        }
        if (procs[id].schedule) {
            procs[id].schedule.cancel();
            delete(procs[id].schedule);
        }
        if (procs[id].subscribe) {
            // Remove this id from subsribed on this message
            if (subscribe[procs[id].subscribe] && subscribe[procs[id].subscribe].indexOf(id) != -1) {
                subscribe[procs[id].subscribe].splice(subscribe[procs[id].subscribe].indexOf(id), 1);

                // If no one subscribed
                if (!subscribe[procs[id].subscribe].length) {
                    // Delete item
                    delete subscribe[procs[id].subscribe];

                    // Unsubscribe
                    if (procs[id].subscribe == instance._id + ".messagebox") {
                        states.unsubscribeMessage(procs[id].subscribe);
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
                logger.warn('controller stopInstance ' + instance._id + ' not running');
                if (typeof callback === 'function') callback();
            } else {
                logger.info('controller stopInstance ' + instance._id + ' killing pid ' + procs[id].process.pid);
                procs[id].stopping = true;
                procs[id].process.kill();
                delete(procs[id].process);
                if (typeof callback === 'function') callback();
            }
            break;

        case 'schedule':
            if (!procs[id].schedule) {
                logger.warn('controller stopInstance ' + instance._id + ' not scheduled');
            } else {
                procs[id].schedule.cancel();
                delete procs[id].schedule;
                logger.info('controller stopInstance canceled schedule ' + instance._id);
            }
            if (typeof callback === 'function') callback();
            break;

        case 'subscribe':
            // Remove this id from subsribed on this message
            if (subscribe[procs[id].subscribe] && subscribe[procs[id].subscribe].indexOf(id) != -1) {
                subscribe[procs[id].subscribe].splice(subscribe[procs[id].subscribe].indexOf(id), 1);

                // If no one subscribed
                if (!subscribe[procs[id].subscribe].length) {
                    // Delete item
                    delete subscribe[procs[id].subscribe];

                    // Unsubscribe
                    if (procs[id].subscribe == instance._id + ".messagebox") {
                        states.unsubscribeMessage(procs[id].subscribe);
                    } else {
                        states.unsubscribe(procs[id].subscribe);
                    }
                }
            }

            if (!procs[id].process) {
                if (typeof callback === 'function') callback();
            } else {
                logger.info('controller stopInstance ' + instance._id + ' killing pid ' + procs[id].process.pid);
                procs[id].stopping = true;
                procs[id].process.kill();
                delete(procs[id].process);
                if (typeof callback === 'function') callback();
            }
            break;

        default:
    }
}

var isStopping = false;
var allInstancesStopped = true;

function stop() {
    logger.debug('stop isStopping=' + isStopping + ' isDaemon=' + isDaemon + ' allInstancesStopped=' + allInstancesStopped);
    if (isStopping) {
        states.setState('system.host.' + hostname + '.alive', {val: false, ack: true, from: 'system.host.' + hostname}, function () {
            logger.info('controller force terminating');
            process.exit(1);
            return;
        });
    } else {
        isStopping = true;
    }

    if (isDaemon) {
        // send instances SIGTERM, only needed if running in backround (isDaemon)
        for (var id in procs) {
            stopInstance(id);
        }
    }

    function waitForInstances() {
        if (!allInstancesStopped) {
            setTimeout(waitForInstances, 100);
        } else {
            states.setState('system.host.' + hostname + '.alive', {val: false, ack: true, from: 'system.host.' + hostname}, function () {
                logger.info('controller terminated');
                process.exit(0);
            });

        }
    }

    waitForInstances();

    // force after 10s
    setTimeout(function () {
        states.setState('system.host.' + hostname + '.alive', {val: false, ack: true, from: 'system.host.' + hostname}, function () {
            logger.info('controller force terminated after 10s');
            process.exit(1);
        });
    }, 10000);
}

process.on('SIGINT', function () {
    logger.info('controller received SIGINT');
    stop();
});
process.on('SIGTERM', function () {
    logger.info('controller received SIGTERM');
    stop();
});
