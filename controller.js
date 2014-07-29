/**
 *      ioBroker.ctrl (ioBroker Controller)
 *
 *      Controls Adapter-Processes
 *
 *
 */

var version = '0.0.11';
var title = 'iobroker.ctrl';
process.title = title;


var schedule =      require('node-schedule');
var os =            require('os');
var fs =            require('fs');
var cp =            require('child_process');
var ObjectsCouch =  require(__dirname + '/lib/couch.js');
var StatesRedis =   require(__dirname + '/lib/redis.js');
var logger =        require(__dirname + '/lib/logger.js');


var config;
if (!fs.existsSync(__dirname + '/conf/iobroker.json')) {
    logger.error('ctrl conf/iobroker.json missing - call node iobroker.js setup');
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

logger.info('ioBroker.ctrl version ' + version + ' starting');
logger.info('ctrl ip: ' + ipArr.join(' '));



var procs = {};




var states = new StatesRedis({

    redis: {
        host: config.redis.host,
        port: config.redis.port,
        options: config.redis.options
    },
    logger: logger,
    change: function (id, state) {
        //console.log('state ' + id + ' = ' + state);
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
        logger.info('ctrl couchdb connected');
        setMeta();
        getInstances();
        startAliveInterval();
    },
    change: function (id, obj) {
        if (!id.match(/^system\.adapter\.[a-zA-Z0-9-_]+\.[0-9]+$/)) return;
        logger.info('ctrl object change ' + id);
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
    var id = 'system.host.' + firstIp;
    states.setState(id + '.alive', {val: true, ack: true, expire: 30});
    states.setState(id + '.load', {val: os.loadavg()[0].toFixed(2), ack: true});
    states.setState(id + '.memfree', {val: (100 * os.freemem() / os.totalmem()).toFixed(0), ack: true});

}
function setMeta() {
    var hostname = os.hostname();
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
            address:    ipArr
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
            logger.error('ctrl _design/system missing - call node iobroker.js setup');
            process.exit(1);
            return;
        } else if (doc.rows.length === 0) {
            logger.info('ctrl no instances found');
        } else {
            logger.info('ctrl ' + doc.rows.length + ' instance' + (doc.rows.length === 1 ? '' : 's') + ' found');
            for (var i = 0; i < doc.rows.length; i++) {

                var instance = doc.rows[i].value;

                if (ipArr.indexOf(instance.common.host) !== -1) {
                    procs[instance._id] = {config: instance};
                }
            }
            if (procs.length > 0) {
                logger.info('ctrl starting ' + procs.length + ' instances');
            }

        }

        initInstances();
    });
}

function initInstances() {
    var c = 0;
    for (var id in procs) {
        if (procs[id].config.common.enabled) {

            setTimeout(function () {
                startInstance(_id);
            }, 2000 * c++, id);

            c += 1;
        }
    }
}



function startInstance(id) {
    var instance = procs[id].config;
    var name = id.split('.')[2];

    switch (instance.common.mode) {
        case 'daemon': {
            if (!procs[id].process) {
                allInstancesStopped = false;
                var args = [instance._id.split('.').pop(), instance.common.loglevel || 'info'];
                procs[id].process = cp.fork(__dirname + '/adapter/' + name + '/' + name + '.js', args);
                procs[id].process.on('exit', function (code, signal) {
                    states.setState(id + '.alive', {val: false, ack: true});
                    states.setState(id + '.connected', {val: false, ack: true});
                    if (signal) {
                        logger.warn('ctrl instance ' + id + ' terminated due to ' + signal);
                    } else if (code === null) {
                        logger.error('ctrl instance ' + id + ' terminated abnormally');
                    } else {
                        if (procs[id].stopping || isStopping) {
                            logger.info('ctrl instance ' + id + ' terminated with code ' + code);
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
                            logger.error('ctrl instance ' + id + ' terminated with code ' + code);
                        }
                    }
                    delete procs[id].process;
                    startInstance(id);
                });
                logger.info('ctrl instance ' + instance._id + ' started with pid ' + procs[id].process.pid);
            } else {
                logger.warn('ctrl instance ' + instance._id + ' already running with pid ' + procs[id].process.pid);
            }
            break;
        }
        case 'schedule': {
            if (!instance.common.schedule) {
                logger.error(instance._id + ' schedule attribute missing');
                break;
            }
            if (procs[id].schedule) {
                procs[id].schedule.cancel();
                logger.info('ctrl instance canceled schedule ' + instance._id);
            }
            procs[id].schedule = schedule.scheduleJob(instance.common.schedule, function () {

                var args = [instance._id.split('.').pop(), instance.common.loglevel || 'info'];
                procs[id].process = cp.fork(__dirname + '/adapter/' + name + '/' + name + '.js', args);
                logger.info('ctrl instance ' + instance._id + ' started with pid ' + procs[id].process.pid);

                procs[id].process.on('exit', function (code, signal) {
                    states.setState(id + '.alive', {val: false, ack: true});
                    if (signal) {
                        logger.warn('ctrl instance ' + id + ' terminated due to ' + signal);
                    } else if (code === null) {
                        logger.error('ctrl instance ' + id + ' terminated abnormally');
                    } else {
                        if (code === 0 || code === '0') {
                            logger.info('ctrl instance ' + id + ' terminated with code ' + code);
                            return;
                        } else {
                            logger.error('ctrl instance ' + id + ' terminated with code ' + code);
                        }
                    }
                    delete procs[id].process;
                });

            });
            logger.info('ctrl instance scheduled ' + instance._id + ' ' + instance.common.schedule);

            break;
        }
        case 'subscribe': {
            // TODO
            break;
        }
        default: {
            logger.error(instance._id + ' invalid mode');
        }
    }


}

function stopInstance(id, callback) {
    var instance = procs[id].config;
    switch (instance.common.mode) {
        case 'daemon': {
            if (!procs[id].process) {
                logger.warn('ctrl instance ' + instance._id + ' not running');
                if (typeof callback === 'function') callback();
            } else {
                logger.info('ctrl instance ' + instance._id + ' stopping with pid ' + procs[id].process.pid);
                procs[id].stopping = true;
                procs[id].process.kill();
                delete(procs[id].process);
                if (typeof callback === 'function') callback();
            }
            break;
        }
        case 'schedule': {
            if (!procs[id].schedule) {
                logger.warn('ctrl instance ' + instance._id + ' not scheduled');
            } else {
                procs[id].schedule.cancel();
                delete procs[id].schedule;
                logger.info('ctrl instance canceled schedule ' + instance._id);
            }
            if (typeof callback === 'function') callback();
            break;
        }
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
    if (isStopping) {

        states.setState('system.host.' + firstIp + '.alive', {val: false, ack: true}, function () {
            logger.info('ctrl force terminating');
            process.exit(1);
            return;
        });

    }

    isStopping = true;

    function waitForInstances() {
        if (!allInstancesStopped) {
            setTimeout(waitForInstances, 100);
        } else {
            states.setState('system.host.' + firstIp + '.alive', {val: false, ack: true}, function () {
                logger.info('ctrl terminated');
                process.exit(0);
            });

        }
    }

    waitForInstances();

    // force after 5s
    setTimeout(function () {
        states.setState('system.host.' + firstIp + '.alive', {val: false, ack: true}, function () {
            logger.info('ctrl force terminated after 5s');
            process.exit(1);
        });
    }, 5000);
}

process.on('SIGINT', stop);
process.on('SIGTERM', stop);