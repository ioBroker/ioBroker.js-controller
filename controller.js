/**
 *      ioBroker.ctrl (ioBroker Controller)
 *
 *      Controls Adapter-Processes
 *
 *
 */

// Change version in io-package.json and start grunt task to modify the version
var version = '0.0.14';
var title = 'io.controller';
process.title = title;


var schedule =      require('node-schedule');
var os =            require('os');
var fs =            require('fs');
var cp =            require('child_process');
var ObjectsCouch =  require(__dirname + '/lib/couch.js');
var StatesRedis =   require(__dirname + '/lib/redis.js');

var logger;
var isDaemon;
var hostname =      os.hostname();


if (process.argv.indexOf('start') !== -1) {
    isDaemon =      true;
    logger =        require(__dirname + '/lib/logger.js')('info', ['iobroker.log'], true);
} else {
    logger =        require(__dirname + '/lib/logger.js')('info', ['iobroker.log']);
}

var config;
if (!fs.existsSync(__dirname + '/conf/iobroker.json')) {
    logger.error('controller conf/iobroker.json missing - call node iobroker.js setup');
    process.exit(1);
} else {
    config = JSON.parse(fs.readFileSync(__dirname + '/conf/iobroker.json'));
}


// Find first non-loopback ip
var ifaces = os.networkInterfaces();
var ipArr = [];
for (var dev in ifaces) {
    /*jshint loopfunc:true */
    ifaces[dev].forEach(function (details) {
        if (!details.internal) ipArr.push(details.address);
    });
}
var firstIp = ipArr[0];

logger.info('ioBroker.nodejs version ' + version);
logger.info('copyright 2014 hobbyquaker, bluefox');
logger.info(title + ' starting');
logger.info('controller ip: ' + ipArr.join(' '));



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
        if (subscribe[id]) {
            for (var i = 0; i < subscribe[id].length; i++) {
                // wake up adapter
                if (procs[subscribe[id][i]]) {
                    console.log("Wake up " + id +' ' + JSON.stringify(state));
                    startInstance(subscribe[id][i], true);
                } else {
                    logger.warn("Adapter subscribed on " + id + " does not exist!");
                }
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
    },
    change: function (id, obj) {
        if (!id.match(/^system\.adapter\.[a-zA-Z0-9-_]+\.[0-9]+$/)) return;
        logger.info('controller object change ' + id);
        if (procs[id]) {
            // known adapter
            procs[id].config = obj;
            if (procs[id].process) {
                stopInstance(id, function () {
                    if (ipArr.indexOf(obj.common.host) !== -1) {
                        if (obj.common.enabled) startInstance(id);
                    } else {
                        delete procs[id];
                    }
                });
            } else {
                if (ipArr.indexOf(obj.common.host) !== -1) {
                    if (obj.common.enabled) startInstance(id);
                } else {
                    delete procs[id];
                }
            }

        } else {
            // unknown adapter
            if (ipArr.indexOf(obj.common.host) !== -1) {
                procs[id] = {config: obj};
                if (obj.common.enabled) startInstance(id);
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
    states.setState(id + '.alive', {val: true, ack: true, expire: 30});
    states.setState(id + '.load', {val: os.loadavg()[0].toFixed(2), ack: true});
    states.setState(id + '.mem', {val: (100 * os.freemem() / os.totalmem()).toFixed(0), ack: true});

}

function setMeta() {
    var id = 'system.host.' + hostname;
    var obj = {
        _id: id,
        type: 'host',
        common: {
            name:       id,
            process:    title,
            version:    version,
            platform:   'javascript/Node.js',
            cmd:        process.argv[0] + ' ' + process.execArgv.join(' ') + ' ' + process.argv.slice(1).join(' '),
            hostname:   hostname,
            address:    ipArr,
            children: [
                id + '.alive',
                id + '.load',
                id + '.mem'
            ]
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
    objects.setObject(id, obj);
    var idMem = id + ".mem";
    obj = {
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
    objects.setObject(idMem, obj);
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
    objects.setObject(idLoad, obj);
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
    objects.setObject(idAlive, obj);
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
                logger.debug('controller check instance "' + doc.rows[i].id  + '" for host "' + instance.common.host + '"');

                if (ipArr.indexOf(instance.common.host) !== -1) {
                    procs[instance._id] = {config: instance};
                    count++;
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

    switch (mode) {
        case 'daemon':
            if (!procs[id].process) {
                allInstancesStopped = false;
                var args = [instance._id.split('.').pop(), instance.common.loglevel || 'info'];
                logger.debug('controller startInstance ' + name + '.' + args[0] + ' loglevel=' + args[1]);
                procs[id].process = cp.fork(__dirname + '/adapter/' + name + '/' + name + '.js', args);
                procs[id].process.on('exit', function (code, signal) {
                    states.setState(id + '.alive',     {val: false, ack: true});
                    states.setState(id + '.connected', {val: false, ack: true});
                    if (signal) {
                        logger.warn('controller instance ' + id + ' terminated due to ' + signal);
                    } else if (code === null) {
                        logger.error('controller instance ' + id + ' terminated abnormally');
                    } else {
                        if (procs[id].stopping || isStopping || wakeUp) {
                            logger.info('controller instance ' + id + ' terminated with code ' + code);
                            delete procs[id].stopping;
                            delete procs[id].process;
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
                    delete procs[id].process;
                    if (!wakeUp) {
                        setTimeout(function (_id) {
                            startInstance(_id);
                        }, 30000, id);
                    }
                });
                if (!wakeUp) logger.info('controller instance ' + instance._id + ' started with pid ' + procs[id].process.pid);
            } else {
                if (!wakeUp) logger.warn('controller instance ' + instance._id + ' already running with pid ' + procs[id].process.pid);
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
                procs[id].process = cp.fork(__dirname + '/adapter/' + name + '/' + name + '.js', args);
                logger.info('controller instance ' + instance._id + ' started with pid ' + procs[id].process.pid);

                procs[id].process.on('exit', function (code, signal) {
                    states.setState(id + '.alive', {val: false, ack: true});
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
    var instance = procs[id].config;
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
            if (subscribe.indexOf(procs[id].subscribe) != -1) {
                subscribe.splice(subscribe.indexOf(procs[id].subscribe).subscribe, 1);
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
            //states.unsubscribeMessage(procs[id].subscribe);
            break;

        default:
    }
}

function restartInstance(id) {
    stopInstance(id, function () {
        startInstance(id);
    });
}

var isStopping = false;
var stopArr = [];
var allInstancesStopped = false;

function stop() {
    logger.info('stop isStopping=' + isStopping + ' isDaemon=' + isDaemon + ' allInstancesStopped=' + allInstancesStopped);
    if (isStopping) {

        states.setState('system.host.' + hostname + '.alive', {val: false, ack: true}, function () {
            logger.info('controller force terminating');
            process.exit(1);
            return;
        });

    }

    isStopping = true;

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
            states.setState('system.host.' + hostname + '.alive', {val: false, ack: true}, function () {
                logger.info('controller terminated');
                process.exit(0);
            });

        }
    }

    waitForInstances();

    // force after 10s
    setTimeout(function () {
        states.setState('system.host.' + hostname + '.alive', {val: false, ack: true}, function () {
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
