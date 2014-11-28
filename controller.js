/**
 *      ioBroker.ctrl (ioBroker Controller)
 *
 *      Controls Adapter-Processes
 *
 *
 */

// Change version in io-package.json and start grunt task to modify the version
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
var version =      ioPackage.common.version;

var logger;
var isDaemon;
var callbackId =   1;
var callbacks =    {};
var hostname =     os.hostname();
var logList =      [];

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

// If some message from logger
logger.on('logging', function (transport, level, msg, meta) {
    // Send to all adapter, that required logs
    for (var i = 0; i < logList.length; i++) {
        states.pushLog(logList[i], {message: msg, severity: level, from: hostname, ts: (new Date()).getTime()});
    }
});

// subscribe or unsubscribe loggers
function logRedirect(isActive, id) {
    if (isActive) {
        if (logList.indexOf(id) == -1) logList.push(id);
    } else {
        var pos = logList.indexOf(id);
        if (pos != -1) logList.splice(pos, 1);
    }
}


logger.info('ioBroker.js-controller version ' + version + ' ' + ioPackage.common.name + ' starting');
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
        // If some log transporter activated or deactivated
        if (id.match(/.logging$/)) {
            logRedirect(state.val, id.substring(0, id.length - '.logging'.length));
        } else
        // If this is messagebox
        if (id == 'messagebox.system.host.' + hostname) {
            // Read it from fifo list
            states.getMessage('system.host.' + hostname, function (err, obj) {
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

states.subscribe('*.logging');

// Read current state of all log subscriber
states.getKeys('*.logging', function (err, keys) {
    if (keys && keys.length) {
        states.getStates(keys, function (err, obj) {
            if (obj) {
                for (var i = 0; i < keys.length; i++) {
                    // We can JSON.parse, but index is 16x faster
                    if (obj[i] && (obj[i].indexOf('"val":true') != -1 || obj[i].indexOf('"val":"true"') != -1)) {
                        logRedirect(true, keys[i].substring(0, keys[i].length - '.logging'.length).replace(/^io\./, ''));
                    }
                }
            }
        });
    }
});

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
                if (procs[id].config.common.enabled && !obj.common.enabled) logger.info('controller "' + id + '" disabled');
                if (!procs[id].config.common.enabled && obj.common.enabled) logger.info('controller "' + id + '" enabled');
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

// collect extended diag information
function collectDiagInfoExtended(callback) {
    return collectDiagInfo(callback);
}

// collect short diag information
function collectDiagInfo(callback) {
    objects.getObject('system.meta.uuid' , function (err, obj) {
        // create uuid
        if (err || !obj) {
            obj = {native: {uuid: 'not found'}};
        }
        objects.getObjectView('system', 'host', {}, function (_err, doc) {
            var diag = {
                uuid: obj.native.uuid,
                hosts:[],
                adapters: {}
            };
            if (!_err && doc) {
                if (doc && doc.rows.length) {
                    // Read installed versions of all hosts
                    for (var i = 0; i < doc.rows.length; i++) {
                        diag.hosts.push({
                            version:  doc.rows[i].value.common.version,
                            platform: doc.rows[i].value.common.platform,
                            type:     doc.rows[i].value.native.os.platform
                        });
                    }
                }
            }
            objects.getObjectView('system', 'adapter', {}, function (__err, doc) {
                if (!_err && doc) {
                    if (doc && doc.rows.length) {
                        // Read installed versions of all hosts
                        for (var i = 0; i < doc.rows.length; i++) {
                            diag.adapters[doc.rows[i].value.common.name] = {
                                version:  doc.rows[i].value.common.version,
                                platform: doc.rows[i].value.common.platform
                            };
                        }
                    }
                }
                if (callback) callback(diag);
            });
        });
    });
}

function setMeta() {
    var id = 'system.host.' + hostname;

    objects.getObject(id, function (err, oldObj) {
        var newObj = {
            _id:  id,
            type: 'host',
            common: {
                name:             id,
//              process:          process.title, // actually not required, because there is type now
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
    var idLoad = id + '.load';
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
    states.subscribeMessage('system.host.' + hostname);
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

    states.pushMessage(objName, obj);
}

// Process message to controller, like execute some script
function processMessage(msg) {
    var ioPack;
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
                if (msg.from) {
                    sendTo(msg.from, 'cmdExit', {id: msg.message.id, data: exitCode});
                    // Sometimes finished command is lost, recent it
                    setTimeout(function () {
                        sendTo(msg.from, 'cmdExit', {id: msg.message.id, data: exitCode});
                    }, 1000);
                }
            });
            break;

        case 'getRepository':
            if (msg.callback && msg.from) {
                objects.getObject('system.config', function (err, systemConfig) {
                    // Collect statistics
                    if (systemConfig && systemConfig.common && systemConfig.common.diag) {
                        if (systemConfig.common.diag == 'normal') {
                            collectDiagInfo(function (obj) {
                                tools.sendDiagInfo(obj);
                            });
                        } else if (systemConfig.common.diag == 'extended') {
                            collectDiagInfoExtended(function (obj) {
                                tools.sendDiagInfo(obj);
                            });
                        }
                    }

                    objects.getObject('system.repositories', function (err, repos) {
                        // Check if repositories exists
                        if (!err && repos && repos.native && repos.native.repositories) {
                            var updateRepo = false;
                            if (typeof msg.message == 'object') {
                                updateRepo = msg.message.update;
                                msg.message = msg.message.repo;
                            }

                            var active = msg.message || systemConfig.common.activeRepo;

                            if (repos.native.repositories[active]) {

                                if (typeof repos.native.repositories[active] == 'string') {
                                    repos.native.repositories[active] = {
                                        link: repos.native.repositories[active],
                                        json: null
                                    };
                                }

                                // If repo is not yet loaded
                                if (!repos.native.repositories[active].json || updateRepo) {


                                    logger.info('Update repository "' + active + '" under "' + repos.native.repositories[active].link + '"');
                                    // Load it
                                    tools.getRepositoryFile(repos.native.repositories[active].link, function (sources) {
                                        repos.native.repositories[active].json = sources;
                                        sendTo(msg.from, msg.command, repos.native.repositories[active].json, msg.callback);
                                        // Store uploaded repo
                                        objects.setObject('system.repositories', repos);
                                    });
                                } else {
                                    // We have already repo, give it back
                                    sendTo(msg.from, msg.command, repos.native.repositories[active].json, msg.callback);
                                }
                            } else {
                                logger.warn('Requested repository "' + active + '" does not exit in config.');
                                sendTo(msg.from, msg.command, null, msg.callback);
                            }
                        }
                    });
                });
            } else {
                logger.error('Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getInstalled':
            if (msg.callback && msg.from) {
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
            } else {
                logger.error('Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getVersion':
            if (msg.callback && msg.from) {
                ioPack = null;
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
            } else {
                logger.error('Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getDiagData':
            if (msg.callback && msg.from) {
                if (msg.message == 'normal') {
                    collectDiagInfo(function (obj) {
                        sendTo(msg.from, msg.command, obj, msg.callback);
                    });
                } else if (msg.message == 'extended') {
                    collectDiagInfoExtended(function (obj) {
                        sendTo(msg.from, msg.command, obj, msg.callback);
                    });
                } else {
                    sendTo(msg.from, msg.command, null, msg.callback);
                }
            } else {
                logger.error('Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getDevList':
            if (msg.callback && msg.from) {
                ioPack = null;

                if (require('os').platform() == 'linux') {
                    var _spawn = require('child_process').spawn;
                    var _args = ['/dev'];
                    logger.info('ls /dev');
                    var _child = _spawn('ls', _args);
                    var result = '';
                    _child.stdout.on('data', function (data) {
                        result += data.toString();
                    });
                    _child.stderr.on('data', function (data) {
                        logger.error('ls ' + data);
                    });

                    _child.on('exit', function (exitCode) {
                        result = result.replace(/(\r\n|\n|\r|\t)/gm, ' ');
                        var parts = result.split(' ');
                        var resList = [];
                        for (var t = 0; t < parts.length; t++) {
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
                logger.error('Invalid request ' + msg.command + '. "callback" or "from" is null');
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
    var fileNameFull = __dirname + '/node_modules/iobroker.' + name + '/' + fileName;
    if (!fs.existsSync(fileNameFull)) {
        fileName = name + '.js';
        fileNameFull = __dirname + '/node_modules/iobroker.' + name + '/' + fileName;
        if (!fs.existsSync(fileNameFull)) {
            fileName = instance.common.main || "main.js";
            fileNameFull = __dirname + '/adapter/' + name + '/' + fileName;
            if (!fs.existsSync(fileNameFull)) {
                fileName = name + '.js';
                fileNameFull = __dirname + '/adapter/' + name + '/' + fileName;
                if (!fs.existsSync(fileNameFull)) {
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
        }
    }
    procs[id].downloadRetry = 0;

    switch (mode) {
        case 'daemon':
            if (!procs[id].process) {
                allInstancesStopped = false;
                var args = [instance._id.split('.').pop(), instance.common.loglevel || 'info'];
                logger.debug('controller startInstance ' + name + '.' + args[0] + ' loglevel=' + args[1]);
                procs[id].process = cp.fork(fileNameFull, args);
                procs[id].process.on('exit', function (code, signal) {
                    states.setState(id + '.alive',     {val: false, ack: true, from: 'system.host.' + hostname});
                    states.setState(id + '.connected', {val: false, ack: true, from: 'system.host.' + hostname});

                    if (procs[id] && procs[id].config && procs[id].config.common.logTransporter) states.setState(id + '.logging', {val: false, ack: true, from: 'system.host.' + hostname});

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
                        logger.info('Restart adapter ' + id + ' because enabled');
                        setTimeout(function (_id) {
                            startInstance(_id);
                        }, 30000, id);
                    } else {
                        logger.info('Do not restart adapter ' + id + ' because disabled or deleted');
                    }
                });
                if (!wakeUp && procs[id] && procs[id].config.common && procs[id].config.common.enabled) logger.info('controller instance ' + instance._id + ' started with pid ' + procs[id].process.pid);
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
                if (!procs[id]) {
                    logger.error('scheduleJob: Task deleted (' + id + ')');
                    return;
                }
                var args = [instance._id.split('.').pop(), instance.common.loglevel || 'info'];
                procs[id].process = cp.fork(fileNameFull, args);
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
            if (procs[id].subscribe.match(/$messagebox/)) {
                states.subscribeMessage(procs[id].subscribe.substring('messagebox'.length));
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
                    if (procs[id].subscribe.match(/$messagebox/)) {
                        states.unsubscribeMessage(procs[id].subscribe.substring('messagebox'.length));
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
                    if (procs[id].subscribe.match(/$messagebox/)) {
                        states.unsubscribeMessage(procs[id].subscribe.substring('messagebox'.length));
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
