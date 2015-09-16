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
var ioPackage =    require(__dirname + '/io-package.json');
var tools =        require(__dirname + '/lib/tools');
var version =      ioPackage.common.version;
var adapterDir =   __dirname.replace(/\\/g, '/');

var Objects;
var States;

var semver;
var logger;
var isDaemon;
var callbackId = 1;
var callbacks =  {};
var hostname =   os.hostname();
var logList =    [];

var config;
if (!fs.existsSync(tools.getConfigFileName())) {
    if (process.argv.indexOf('start') !== -1) {
        isDaemon = true;
        logger = require(__dirname + '/lib/logger')('info', ['iobroker'], true);
    } else {
        logger = require(__dirname + '/lib/logger')('info', ['iobroker']);
    }
    logger.error('host.' + hostname + ' conf/iobroker.json missing - call node iobroker.js setup');
    process.exit(1);
} else {
    config = JSON.parse(fs.readFileSync(tools.getConfigFileName()));
    if (!config.states)  config.states  = {type: 'file'};
    if (!config.objects) config.objects = {type: 'file'};
}

// If "file" and on the local machine
if (config.objects.type == 'file' && (!config.objects.host || config.objects.host == 'localhost' || config.objects.host == '127.0.0.1')) {
    Objects = require(__dirname + '/lib/objects/objectsInMemServer');
    States  = require(__dirname + '/lib/states/statesInMemServer');
} else {
    Objects = require(__dirname + '/lib/objects');
    States  = require(__dirname + '/lib/states');
}

if (process.argv.indexOf('start') !== -1) {
    isDaemon = true;
    config.log.noStdout = true;
    logger = require(__dirname + '/lib/logger.js')(config.log);
} else {
    logger = require(__dirname + '/lib/logger.js')(config.log);
}

// Delete all log files older than x das
logger.activateDateChecker(true, config.log.maxDays);

// If installed as npm module
adapterDir = adapterDir.split('/');
if (adapterDir.pop() == 'node_modules') {
    adapterDir = adapterDir.join('/');
} else {
    adapterDir = __dirname.replace(/\\/g, '/') + '/node_modules';
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


logger.info('host.' + hostname + ' ioBroker.js-controller version ' + version + ' ' + ioPackage.common.name + ' starting');
logger.info('host.' + hostname + ' Copyright (c) 2014-2015 bluefox, hobbyquaker');
logger.info('host.' + hostname + ' hostname: ' + hostname);
logger.info('host.' + hostname + ' ip addresses: ' + ipArr.join(' '));

var procs     = {};
var subscribe = {};

var states = new States({
    connection: config.states,
    logger: logger,
    change: function (id, state) {
        if (!id) {
            logger.error('host.' + hostname + ' change event with no ID: ' + JSON.stringify(state));
            return;
        }
        // If some log transporter activated or deactivated
        if (id.match(/.logging$/)) {
            logRedirect(state ? state.val : false, id.substring(0, id.length - '.logging'.length));
        } else
        // If this is messagebox
        if (id == 'messagebox.system.host.' + hostname) {
            // Read it from fifo list
            states.delMessage('system.host.' + hostname, state._id);
            var obj = state;
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
                    for (var _id in callbacks) {
                        if (now - callbacks[_id].time > 3600000) delete callbacks[_id];
                    }
                } else {
                    processMessage(obj);
                }
            }
        } else
        if (subscribe[id]) {
            for (var i = 0; i < subscribe[id].length; i++) {
                // wake up adapter
                if (procs[subscribe[id][i]]) {
                    console.log("Wake up " + id + ' ' + JSON.stringify(state));
                    startInstance(subscribe[id][i], true);
                } else {
                    logger.warn("controller Adapter subscribed on " + id + " does not exist!");
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
                    if (obj[i]) {
                        if (typeof obj[i] == 'string' && (obj[i].indexOf('"val":true') != -1 || obj[i].indexOf('"val":"true"') != -1)) {
                            logRedirect(true, keys[i].substring(0, keys[i].length - '.logging'.length).replace(/^io\./, ''));
                        } else if (typeof obj[i] == 'object' && (obj[i].val === true || obj[i].val === "true")) {
                            logRedirect(true, keys[i].substring(0, keys[i].length - '.logging'.length).replace(/^io\./, ''));
                        }
                    }
                }
            }
        });
    }
});

var objects = null;
function createObjects() {
    return new Objects({
        connection: config.objects,
        logger: logger,
        connected: function (type) {
            logger.info('host.' + hostname + ' ' + type + ' connected');
            setMeta();
            getInstances();
            startAliveInterval();
            initMessageQueue();
        },
        change: function (id, obj) {
            if (!id.match(/^system\.adapter\.[a-zA-Z0-9-_]+\.[0-9]+$/)) return;
            logger.info('host.' + hostname + ' object change ' + id);
            if (procs[id]) {
                // known adapter
                if (!obj) {
                    procs[id].config.common.enabled = false;
                    procs[id].config.common.host    = null;
                    procs[id].config.deleted        = true;
                    logger.info('host.' + hostname + ' object deleted ' + id);
                } else {
                    if (procs[id].config.common.enabled && !obj.common.enabled) logger.info('host.' + hostname + ' "' + id + '" disabled');
                    if (!procs[id].config.common.enabled && obj.common.enabled) logger.info('host.' + hostname + ' "' + id + '" enabled');
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
}

objects = createObjects ();

objects.subscribe('system.adapter.*');

function startAliveInterval() {
    reportStatus();
    setInterval(function () {
        reportStatus();
    }, 15000);
}

function reportStatus() {
    var id = 'system.host.' + hostname;
    states.setState(id + '.alive',   {val: true, ack: true, expire: 30, from: id});
    states.setState(id + '.load',    {val: parseFloat(os.loadavg()[0].toFixed(2)), ack: true, from: id});
    states.setState(id + '.mem',     {val: parseFloat((100 * os.freemem() / os.totalmem()).toFixed(0)), ack: true, from: id});
    var mem = process.memoryUsage();
    states.setState(id + '.memRss', {val: parseFloat((mem.rss / 1048576/* 1MB */).toFixed(2)), ack: true, from: id});
    states.setState(id + '.memHeapTotal', {val: parseFloat((mem.heapTotal / 1048576/* 1MB */).toFixed(2)), ack: true, from: id});
    states.setState(id + '.memHeapUsed', {val: parseFloat((mem.heapUsed / 1048576/* 1MB */).toFixed(2)), ack: true, from: id});
    // Under windows toFixed returns string ?
    states.setState(id + '.uptime', {val: parseInt(process.uptime().toFixed(), 10), ack: true, from: id});
}

// collect extended diag information
function collectDiagInfoExtended(callback) {
    return collectDiagInfo(callback);
}

// collect short diag information
function collectDiagInfo(callback) {
    objects.getObject('system.config', function (err, systemConfig) {
        objects.getObject('system.meta.uuid', function (err, obj) {
            // create uuid
            if (err || !obj) {
                obj = {native: {uuid: 'not found'}};
            }
            objects.getObjectView('system', 'host', {}, function (_err, doc) {
                var diag = {
                    uuid: obj.native.uuid,
                    language: systemConfig.common.language,
                    hosts: [],
                    adapters: {}
                };

                if (!_err && doc) {
                    if (doc && doc.rows.length) {
                        // Read installed versions of all hosts
                        for (var i = 0; i < doc.rows.length; i++) {

                            diag.hosts.push({
                                version:  doc.rows[i].value.common.installedVersion,
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
                                    version: doc.rows[i].value.common.version,
                                    platform: doc.rows[i].value.common.platform
                                };
                            }
                        }
                    }
                    if (callback) callback(diag);
                });
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
            if (oldObj.native && oldObj.native.hardware && oldObj.native.hardware.networkInterfaces) oldObj.native.hardware.networkInterfaces = [];
            newObj = require('node.extend')(true, oldObj, newObj);
        }

        objects.setObject(id, newObj);
    });

    var _id = id + ".mem";
    var obj = {
        _id: _id,
        type: 'state',
        common: {
            type: 'number',
            name: 'Memory usage',
            unit: '%',
            min:  0,
            max:  100
        },
        native: {}
    };
    objects.extendObject(_id, obj);

    _id = id + ".memHeapUsed";
    obj = {
        _id: _id,
        type: 'state',
        common: {
            type: 'number',
            name: 'Memory from heap used in MB',
            unit: 'MB'
        },
        native: {}
    };
    objects.extendObject(_id, obj);

    _id = id + ".memHeapTotal";
    obj = {
        _id: _id,
        type: 'state',
        common: {
            type: 'number',
            name: 'Memory heap reserved in MB',
            unit: 'MB'
        },
        native: {}
    };
    objects.extendObject(_id, obj);

    _id = id + ".memRss";
    obj = {
        _id: _id,
        type: 'state',
        common: {
            type: 'number',
            name: 'Resident set size in MB',
            desc: 'RSS is the resident set size, the portion of the process\'s memory held in RAM',
            unit: 'MB'
        },
        native: {}
    };
    objects.extendObject(_id, obj);

    _id = id + ".uptime";
    obj = {
        _id: _id,
        type: 'state',
        common: {
            type: 'number',
            name: 'Uptime in seconds',
            unit: 'seconds'
        },
        native: {}
    };
    objects.extendObject(_id, obj);

    _id = id + '.load';
    obj = {
        _id: _id,
        type: 'state',
        common: {
            unit: '',
            type: 'number',
            name: 'Load Average 1min'
        },
        native: {}
    };
    objects.extendObject(_id, obj);

    _id = id + ".alive";
    obj = {
        _id: _id,
        type: 'state',
        common: {
            name: 'Host alive',
            type: 'boolean'
        },
        native: {}
    };
    objects.extendObject(_id, obj);
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
                                    logger.info('host.' + hostname + ' Update repository "' + active + '" under "' + repos.native.repositories[active].link + '"');
                                    // Load it
                                    tools.getRepositoryFile(repos.native.repositories[active].link, function (err, sources) {
                                        if (err) logger.warn('host.' + hostname + ' warning: ' + err);
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
                                logger.warn('host.' + hostname + ' Requested repository "' + active + '" does not exit in config.');
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
                objects.getObjectView('system', 'host', {}, function (err, doc) {
                    var result = tools.getInstalledInfo(version);
                    result.hosts = {};
                    var infoCount = 0;
                    var timeout = null;

                    if (doc && doc.rows.length) {
                        // Read installed versions of all hosts
                        for (var i = 0; i < doc.rows.length; i++) {
                            // If desired local version, do not ask it, just answer
                            if (doc.rows[i].id == 'system.host.' + hostname) {
                                var _ioPack;
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
                                sendTo(doc.rows[i].id, 'getVersion', null, function (ioPack) {
                                    infoCount--;
                                    if (ioPack) {
                                        result.hosts[ioPack.host] = ioPack;
                                    }
                                    if (!infoCount) {
                                        if (timeout) {
                                            clearTimeout(timeout);
                                            sendTo(msg.from, msg.command, result, msg.callback);
                                        } else {
                                            logger.warn('host.' + hostname + ' too delayed answer for ' + ioPack.host);
                                        }
                                    }
                                });
                            }
                        }
                    }
                    if (!infoCount) {
                        sendTo(msg.from, msg.command, result, msg.callback);
                    } else {
                        // Start timeout and send answer in 5 seconds if some hosts is offline
                        timeout = setTimeout(function () {
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
                logger.error('host.' + hostname + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getDevList':
            if (msg.callback && msg.from) {
                ioPack = null;

                if (require('os').platform() == 'linux') {
                    var _spawn = require('child_process').spawn;
                    var _args = ['/dev'];
                    logger.info('host.' + hostname + ' ls /dev');
                    var _child = _spawn('ls', _args);
                    var result = '';
                    _child.stdout.on('data', function (data) {
                        result += data.toString();
                    });
                    _child.stderr.on('data', function (data) {
                        logger.error('host.' + hostname + ' ls ' + data);
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
                logger.error('host.' + hostname + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'getLogs':
            if (msg.callback && msg.from) {
                ioPack = null;

                var lines = msg.message || 200;
                var text = '';
                var logFile = logger.getFileName(); //__dirname + '/log/iobroker.log';
                if (!fs.existsSync(logFile)) logFile = __dirname + '/../../log/iobroker.log';

                if (fs.existsSync(logFile)) {
                    var stats = fs.statSync(logFile);

                    fs.createReadStream(logFile, {
                        start: (stats.size > 150 * lines) ? stats.size - 150 * lines : 0,
                        end: stats.size
                    }).on('data', function (chunk) {
                        text += chunk.toString();
                    })
                    .on('end', function () {  // done
                        var lines = text.split('\n');
                        lines.shift();
                        lines.push(stats.size);
                        sendTo(msg.from, msg.command, lines, msg.callback);
                    }).on('error', function () {  // done
                        sendTo(msg.from, msg.command, [stats.size], msg.callback);
                    });
                } else {
                    sendTo(msg.from, msg.command, [0], msg.callback);
                }
            } else {
                logger.error('host.' + hostname + ' Invalid request ' + msg.command + '. "callback" or "from" is null');
            }
            break;

        case 'delLogs':
            var logFile = logger.getFileName(); //__dirname + '/log/iobroker.log';
            if (fs.existsSync(__dirname +       '/log/iobroker.log')) fs.writeFile(__dirname +       '/log/iobroker.log', '');
            if (fs.existsSync(__dirname + '/../../log/iobroker.log')) fs.writeFile(__dirname + '/../../log/iobroker.log', '');
            if (fs.existsSync(logFile)) fs.writeFile(logFile);

            if (msg.callback && msg.from) sendTo(msg.from, msg.command, null, msg.callback);
            break;
    }

}

function getInstances() {
    objects.getObjectView('system', 'instance', {}, function (err, doc) {
        if (err && err.status_code === 404) {
            logger.error('host.' + hostname + ' _design/system missing - call node iobroker.js setup');
            //if (objects.destroy) objects.destroy();
            //if (states  && states.destroy)  states.destroy();
            //process.exit(1);
            return;
        } else if (doc.rows.length === 0) {
            logger.info('host.' + hostname + ' no instances found');
        } else {
            logger.info('host.' + hostname + ' ' + doc.rows.length + ' instance' + (doc.rows.length === 1 ? '' : 's') + ' found');
            var count = 0;
            for (var i = 0; i < doc.rows.length; i++) {
                var instance = doc.rows[i].value;

                if (instance.common.mode === 'web' || instance.common.mode === 'none') continue;

                logger.debug('host.' + hostname + ' check instance "' + doc.rows[i].id  + '" for host "' + instance.common.host + '"');

                if (ipArr.indexOf(instance.common.host) !== -1 || instance.common.host === hostname) {
                    procs[instance._id] = {config: instance};
                    if (instance.common.enabled) count++;
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
    var c = 0;

    // Start first admin
    for (var id in procs) {
        if (procs[id].config.common.enabled) {
            if (id.indexOf('system.adapter.admin') != -1) {
                setTimeout(function (_id) {
                    startInstance(_id);
                }, 2000 * c++, id);

                c += 1;
            }
        }
    }

    for (id in procs) {
        if (procs[id].config.common.enabled) {
            if (id.indexOf('system.adapter.admin') == -1) {
                setTimeout(function (_id) {
                    startInstance(_id);
                }, 2000 * c++, id);

                c += 1;
            }
        }
    }
}

function checkVersions(id, deps) {
    try {
        for (var d = 0; d < deps.length; deps++) {
            var name = null;
            var version = null;
            var isFound = false;

            if (typeof deps[d] == 'object') {
                if (!semver) semver = require('semver');

                for (var n in deps[d]) {
                    name = n;
                    version = deps[d][n];
                    break;
                }
            } else {
                name = deps[d];
            }

            if (name == 'js-controller') {
                // Check only version
                if (version !== null) {
                    if (!semver) semver = require('semver');
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
                for (var p in procs) {
                    if (procs[p] && procs[p].config && procs[p].config.common && procs[p].config.common.name == name) {
                        if (version && !semver.satisfies(procs[p].config.common.version, version)) {
                            logger.error('host.' + hostname + ' startInstance ' + id + ': required adapter "' + name + '" has wrong version. Installed "' + procs[p].common.version + '", required "' + version + '"!');
                            return false;
                        }
                        isFound = true;
                    }
                }
            }

            if (!isFound) {
                logger.error('host.' + hostname + ' startInstance ' + id + ': required adapter "' + name + '" not found!');
                return false;
            }
        }
    }
    catch (e) {
        logger.error('host.' + hostname + ' startInstance ' + id + ': ' + e);
        return false;
    }
    return true;
}

// Store process IDS to make possible kill them all by restart
var storeTimer = null;
function storePids() {
    if (!storeTimer) {
        storeTimer = setTimeout(function () {
            storeTimer = null;
            var pids = [];
            for (var id in procs) {
                if (procs[id].process) {
                    pids.push(procs[id].process.pid);
                }
                pids.push(process.pid);
            }
            fs.writeFileSync(__dirname + '/pids.txt', JSON.stringify(pids));
        }, 500);
    }
}

function startInstance(id, wakeUp) {
    if (isStopping) return;

    var errorCodes = [
        'OK', // 0
        '', // 1
        'Adapter has invalid config or no config found', // 2
        'Adapter disabled or invalid config', // 3
        'invalid config: no _id found', // 4
        'invalid config', // 5
        'uncaught exception', // 6
        'Adapter already running', // 7
        'node.js: Cannot find module', // 8
        '', // 9
        'Cannot find start file of adapter' // 10
    ];

    if (!procs[id]) {
        logger.error('host.' + hostname + ' startInstance ' + id + ': object not found!');
        return;
    }

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

    // Check if all required adapters installed and have valid version
    if (instance.common.dependencies) {
        if (checkVersions(id, instance.common.dependencies)) {
            delete instance.common.dependencies;
        } else {
            return;
        }
    }

    var fileName = instance.common.main || "main.js";
    var adapterDir = tools.getAdapterDir(name);
    if (!fs.existsSync(adapterDir)) {
        procs[id].downloadRetry = procs[id].downloadRetry || 0;
        if (procs[id].downloadRetry < 3) {
            procs[id].downloadRetry++;
            logger.warn('host.' + hostname + ' startInstance cannot find start file for adapter "' + name + '". Try to install it... ' + procs[id].downloadRetry + ' attempt');
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
            logger.error('host.' + hostname + ' Cannot download adapter "' + name + '". To restart it disable/enable it or restart host.');
        }
        return;
    }

    var args = (instance && instance._id && instance.common) ? [instance._id.split('.').pop(), instance.common.loglevel || 'info'] : [0, 'info'];

    var fileNameFull = adapterDir + '/' + fileName;

    // workaround for old vis.
    if (instance.common.onlyWWW && name == 'vis') instance.common.onlyWWW = false;

    if (instance.common.onlyWWW || !fs.existsSync(fileNameFull)) {
        fileName = name + '.js';
        fileNameFull = adapterDir + '/' + fileName;
        if (instance.common.onlyWWW || !fs.existsSync(fileNameFull)) {
            // If not just www files
            if (instance.common.onlyWWW || fs.existsSync(adapterDir + '/www')) {
                logger.debug('host.' + hostname + ' startInstance ' + name + '.' + args[0] + ' only WWW files. Nothing to start');
            } else {
                logger.error('host.' + hostname + ' startInstance ' + name + '.' + args[0] + ': cannot find start file!');
            }
            return;
        }
    }
    procs[id].downloadRetry = 0;


    if (instance.common.subscribe || instance.common.wakeup) {
        procs[id].subscribe = instance.common.subscribe || instance._id + ".wakeup";
        var parts = instance._id.split('.');
        var instanceId = parts[parts.length - 1];
        procs[id].subscribe = procs[id].subscribe.replace("<INSTANCE>", instanceId);

        if (subscribe[procs[id].subscribe]) {
            if (subscribe[procs[id].subscribe].indexOf(id) == -1) {
                subscribe[procs[id].subscribe].push(id);
            }
        } else {
            subscribe[procs[id].subscribe] = [id];

            // Subscribe on changes
            if (procs[id].subscribe.match(/$messagebox/)) {
                states.subscribeMessage(procs[id].subscribe.substring('messagebox'.length));
            } else {
                states.subscribe(procs[id].subscribe);
            }
        }
    }

    switch (mode) {
        case 'once':
        case 'daemon':
            if (procs[id] && !procs[id].process) {
                allInstancesStopped = false;
                logger.debug('host.' + hostname + ' startInstance ' + name + '.' + args[0] + ' loglevel=' + args[1]);
                procs[id].process = cp.fork(fileNameFull, args);
                storePids(); // Store all pids to make possible kill them all
                procs[id].process.on('exit', function (code, signal) {
                    states.setState(id + '.alive',     {val: false, ack: true, from: 'system.host.' + hostname});
                    states.setState(id + '.connected', {val: false, ack: true, from: 'system.host.' + hostname});

                    if (procs[id] && procs[id].config && procs[id].config.common.logTransporter) states.setState(id + '.logging', {val: false, ack: true, from: 'system.host.' + hostname});

                    if (mode != 'once') {
                        if (signal) {
                            logger.warn('host.' + hostname + ' instance ' + id + ' terminated due to ' + signal);
                        } else if (code === null) {
                            logger.error('host.' + hostname + ' instance ' + id + ' terminated abnormally');
                        } else {
                            if ((procs[id] && procs[id].stopping) || isStopping || wakeUp) {
                                logger.info('host.' + hostname + ' instance ' + id + ' terminated with code ' + code + ' (' + (errorCodes[code] || '') + ')');
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
                                storePids(); // Store all pids to make possible kill them all
                                return;
                            } else {
                                logger.error('host.' + hostname + ' instance ' + id + ' terminated with code ' + code + ' (' + (errorCodes[code] || '') + ')');
                            }
                        }
                    }

                    if (procs[id] && procs[id].process) delete procs[id].process;
                    if (!wakeUp && procs[id] && procs[id].config && procs[id].config.common && procs[id].config.common.enabled && mode != 'once') {
                        logger.info('host.' + hostname + ' Restart adapter ' + id + ' because enabled');
                        setTimeout(function (_id) {
                            startInstance(_id);
                        }, 30000, id);
                    } else {
                        if (mode != 'once') {
                            logger.info('host.' + hostname + ' Do not restart adapter ' + id + ' because disabled or deleted');
                        } else {
                            logger.info('host.' + hostname + ' instance ' + id + ' terminated while should be started once');
                        }
                    }
                    storePids(); // Store all pids to make possible kill them all
                });
                if (!wakeUp && procs[id] && procs[id].config.common && procs[id].config.common.enabled && mode != 'once') logger.info('host.' + hostname + ' instance ' + instance._id + ' started with pid ' + procs[id].process.pid);
            } else {
                if (!wakeUp && procs[id]) logger.warn('host.' + hostname + ' instance ' + instance._id + ' already running with pid ' + procs[id].process.pid);
            }
            break;

        case 'schedule':
            if (!instance.common.schedule) {
                logger.error(instance._id + ' schedule attribute missing');
                break;
            }
            if (procs[id].schedule) {
                procs[id].schedule.cancel();
                logger.info('host.' + hostname + ' instance canceled schedule ' + instance._id);
            }

            procs[id].schedule = schedule.scheduleJob(instance.common.schedule, function () {
                if (!procs[id]) {
                    logger.error('host.' + hostname + ' scheduleJob: Task deleted (' + id + ')');
                    return;
                }
                // After sleep of PC all scheduled runs come together. There is no need to run it X times in one second. Just the last.
                if (procs[id].lastStart && (new Date()).getTime() - procs[id].lastStart < 2000) {
                    logger.warn('host.' + hostname + ' instance ' + instance._id + ' does not started, because just executed');
                    return;
                }
                // Remember the last run
                procs[id].lastStart = (new Date()).getTime();
                if (!procs[id].process) {
                    var args = [instance._id.split('.').pop(), instance.common.loglevel || 'info'];
                    procs[id].process = cp.fork(fileNameFull, args);
                    storePids(); // Store all pids to make possible kill them all
                    logger.info('host.' + hostname + ' instance ' + instance._id + ' started with pid ' + procs[instance._id].process.pid);

                    procs[id].process.on('exit', function (code, signal) {
                        states.setState(id + '.alive', {val: false, ack: true, from: 'system.host.' + hostname});
                        if (signal) {
                            logger.warn('host.' + hostname + ' instance ' + id + ' terminated due to ' + signal);
                        } else if (code === null) {
                            logger.error('host.' + hostname + ' instance ' + id + ' terminated abnormally');
                        } else {
                            if (code === 0 || code === '0') {
                                logger.info('host.' + hostname + ' instance ' + id + ' terminated with code ' + code + ' (' + (errorCodes[code] || '') + ')');
                            } else {
                                logger.error('host.' + hostname + ' instance ' + id + ' terminated with code ' + code + ' (' + (errorCodes[code] || '') + ')');
                            }
                        }
                        if (procs[id] && procs[id].process) delete procs[id].process;
                        storePids(); // Store all pids to make possible kill them all
                    });
                } else {
                    if (!wakeUp) logger.warn('host.' + hostname + ' instance ' + instance._id + ' already running with pid ' + procs[id].process.pid);
                }
            });
            logger.info('host.' + hostname + ' instance scheduled ' + instance._id + ' ' + instance.common.schedule);
            // Start one time adapter by start or if configuration changed
            if (instance.common.allowInit) {
                procs[id].process = cp.fork(fileNameFull, args);
                storePids(); // Store all pids to make possible kill them all
                logger.info('host.' + hostname + ' instance ' + instance._id + ' started with pid ' + procs[instance._id].process.pid);

                procs[id].process.on('exit', function (code, signal) {
                    states.setState(id + '.alive', {val: false, ack: true, from: 'system.host.' + hostname});
                    if (signal) {
                        logger.warn('host.' + hostname + ' instance ' + id + ' terminated due to ' + signal);
                    } else if (code === null) {
                        logger.error('host.' + hostname + ' instance ' + id + ' terminated abnormally');
                    } else {
                        if (code === 0 || code === '0') {
                            logger.info('host.' + hostname + ' instance ' + id + ' terminated with code ' + code + ' (' + (errorCodes[code] || '') + ')');
                        } else {
                            logger.error('host.' + hostname + ' instance ' + id + ' terminated with code ' + code + ' (' + (errorCodes[code] || '') + ')');
                        }
                    }
                    delete procs[id].process;
                    storePids(); // Store all pids to make possible kill them all
                });
            }

            break;

        case 'subscribe':
            break;

        default:
            logger.error(instance._id + ' invalid mode');

    }
}

function stopInstance(id, callback) {
    logger.info('host.' + hostname + ' stopInstance ' + id);
    if (!procs[id]) {
        logger.warn('host.' + hostname + ' unknown instance ' + id);
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
                logger.warn('host.' + hostname + ' stopInstance ' + instance._id + ' not running');
                if (typeof callback === 'function') callback();
            } else {
                if (instance.common.messagebox && instance.common.supportStopInstance) {
                    var timeout;
                    // Send to adapter signal "stopInstance" because on some systems SIGTERM does not work
                    sendTo(instance._id, 'stopInstance', null, function () {
                        if (timeout) {
                            clearTimeout(timeout);
                            timeout = null;
                        }
                        logger.info('host.' + hostname + ' stopInstance ' + instance._id + ' killing pid ' + procs[id].process.pid);
                        procs[id].stopping = true;
                        procs[id].process.kill();
                        delete(procs[id].process);
                        if (typeof callback === 'function') callback();
                    });
                    // If no response from adapter, kill it in 1 second
                    timeout = setTimeout(function () {
                        if (procs[id].process) {
                            logger.info('host.' + hostname + ' stopInstance ' + instance._id + ' killing pid  ' + procs[id].process.pid);
                            procs[id].stopping = true;
                            procs[id].process.kill();
                            delete(procs[id].process);
                            if (typeof callback === 'function') callback();
                        }
                    }, 1000);
                } else {
                    logger.info('host.' + hostname + ' stopInstance ' + instance._id + ' killing pid ' + procs[id].process.pid);
                    procs[id].stopping = true;
                    procs[id].process.kill();
                    delete(procs[id].process);
                    if (typeof callback === 'function') callback();
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
            if (typeof callback === 'function') callback();
            break;

        case 'subscribe':
            // Remove this id from subscribed on this message
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
                logger.info('host.' + hostname + ' stopInstance ' + instance._id + ' killing pid ' + procs[id].process.pid);
                procs[id].stopping = true;
                procs[id].process.kill();
                delete(procs[id].process);
                if (typeof callback === 'function') callback();
            }
            break;

        default:
    }
}

var isStopping = null;
var allInstancesStopped = true;
var stopTimeout = 10000;

function stop() {
    function waitForInstances() {
        if (!allInstancesStopped) {
            setTimeout(waitForInstances, 200);
        } else {
            if (objects && objects.destroy) objects.destroy();
            states.setState('system.host.' + hostname + '.alive', {val: false, ack: true, from: 'system.host.' + hostname}, function () {
                if (states  && states.destroy)  states.destroy();
                logger.info('host.' + hostname + ' terminated');
                setTimeout(function () {
                    process.exit(0);
                }, 1000);
            });

        }
    }

    try {
        var elapsed = (isStopping ? ((new Date()).getTime() - isStopping.getTime()) : 0);
        logger.debug('host.' + hostname + ' stop isStopping=' + elapsed + ' isDaemon=' + isDaemon + ' allInstancesStopped=' + allInstancesStopped);
        if (elapsed >= stopTimeout) {

            if (objects && objects.destroy) objects.destroy();

            states.setState('system.host.' + hostname + '.alive', {val: false, ack: true, from: 'system.host.' + hostname}, function () {
                logger.info('host.' + hostname + ' force terminating');
                if (states  && states.destroy)  states.destroy();
                setTimeout(function () {
                    process.exit(1);
                }, 1000);
                return;
            });
        } else {
            // Sometimes process receives SIGTERM twice
            isStopping = isStopping || new Date();
        }

        if (isDaemon) {
            // send instances SIGTERM, only needed if running in background (isDaemon)
            for (var id in procs) {
                stopInstance(id);
            }
        }

        waitForInstances();
    } catch (e) {
        logger.error(e.message);
    }

    // force after Xs
    setTimeout(function () {
        if (objects && objects.destroy) objects.destroy();
        states.setState('system.host.' + hostname + '.alive', {val: false, ack: true, from: 'system.host.' + hostname}, function () {
            logger.info('host.' + hostname + ' force terminated after 10s');
            for (var i in procs) {
                if (procs[i].process) {
                    if (procs[i].config && procs[i].config.common && procs[i].config.common.name) {
                        logger.info('Adapter ' + procs[i].config.common.name + ' still running');
                    }
                }
            }

            if (states && states.destroy) states.destroy();

            setTimeout(function () {
                process.exit(1);
            }, 1000);
        });
    }, stopTimeout);
}

process.on('SIGINT', function () {
    logger.info('host.' + hostname + ' received SIGINT');
    stop();
});
process.on('SIGTERM', function () {
    logger.info('host.' + hostname + ' received SIGTERM');
    stop();
});

var uncaughtExceptionCount = 0;
process.on('uncaughtException', function (err) {
    if (err.arguments && err.arguments[0] == "fragmentedOperation") {
        logger.error('fragmentedOperation: restart objects');
        // restart objects
        objects.destroy();
        objects = null;
        // Give time to close the objects
        setTimeout(function () {
            objects = createObjects();
        }, 3000);
        return;
    }


    // If by terminating one more exception => stop immediately to break the circle
    if (uncaughtExceptionCount) {
        console.log(err.message || err);
        if (err.stack) console.log(err.stack);
        process.exit(2);
        return;
    }
    uncaughtExceptionCount++;
    if (typeof err == 'object') {
        if (err.errno == 'EADDRINUSE') {
            logger.error('Another instance is running or some application uses port!');
            logger.error('uncaught exception: ' + err.message);
        } else {
            logger.error('uncaught exception: ' + err.message);
            logger.error(err.stack);
        }
    } else {
        logger.error('uncaught exception: ' + err);
    }
    stop();
    // Restart itself
    processMessage({command: 'cmdExec', message: {data: '_restart'}});
});
