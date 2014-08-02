/* jshint -W097 */// jshint strict:false
/*jslint node: true */

var net =           require('net');
var fs =            require('fs');
var password =      require(__dirname + '/password.js');
var config = JSON.parse(fs.readFileSync(__dirname + '/../conf/iobroker.json'));
var that;

function Adapter(options) {
    that = this;
    var logger = require(__dirname + '/logger.js');

    var StatesRedis = require(__dirname + '/redis.js');
    var ObjectsCouch = require(__dirname + '/couch.js');

    var os = require('os');
    var ifaces = os.networkInterfaces();
    var ipArr = [];
    for (var dev in ifaces) {
        /*jshint loopfunc:true */
        ifaces[dev].forEach(function (details) {
            if (!details.internal) ipArr.push(details.address);
        });
    }
    var firstIp = ipArr[0];
    var instance = process.argv[2] || 0;
    that.namespace = options.name + '.' + instance;
    var loglevel = process.argv[3] || 'info';

    var reportInterval;

    // helper function to find next free port
    that.getPort = function adapterGetPort(port, callback) {
        var server = net.createServer();
        server.listen(port, function (err) {
            server.once('close', function () {
                if (typeof callback === 'function') {
                    callback(port);
                }
            });
            server.close();
        });
        server.on('error', function (err) {
            that.getPort(port + 1, callback);
        });
    };

    that.checkPassword = function checkPassword(user, pw, callback) {

        if (!callback) throw "checkPassword: no callback";
        that.getForeignObject('system.user.' + user, function (err, obj) {
            if (err || !obj) {
                callback(false);
                return;
            }
            password(pw).check(obj.common.password, function (err, res) {
                callback(res);
            });
        });

    };

    that.addUser = function addUser (user, pw, callback) {
        this.setForeignObject('system.user.' + user, {
            type: 'user',
            common: {
                name:    user,
                enabled: true
            }
        }, function () {
            that.setPassword(user, pw);
        });
    }


    that.setPassword = function setPassword(user, pw, callback) {

        that.getForeignObject('system.user.' + user, function (err, obj) {
            if (err || !obj) {
                if (typeof callback === 'function') callback(false);
                return;
            }
            password(pw).hash(null, null, function (err, res) {
                if (err) {
                    if (typeof callback === 'function') callback(false);
                    return;
                }
                that.extendForeignObject('system.user.' + user, {
                    common: {
                        password: res
                    }
                }, function () {
                    if (typeof callback === 'function') callback(true);
                });
            });
        });

    };

    that.checkGroup = function checkGroup(user, group, callback) {
        that.getForeignObject('system.user.' + user, function (err, obj) {
            if (err || !obj) {
                callback(false);
                return;
            }
            that.getForeignObject('system.group.' + group, function (err, obj) {
                if (err || !obj) {
                    callback(false);
                    return;
                }
                if (obj.common.members.indexOf('system.user.' + user) !== -1) {
                    callback(true);
                } else {
                    callback(false);
                }

            });

        });
    };





    initCouch(function () {
        initRedis(function () {
            that.getForeignState('system.adapter.' + options.name + '.' + instance + '.alive', function (res) {
                if (res && res.val === true) {
                    logger.error(options.name + '.' + instance + ' already running');
                    process.exit(1);
                } else {
                    that.getForeignObject('system.adapter.' + options.name + '.' + instance, function (err, res) {
                        if (err || !res) {
                            logger.error(options.name + '.' + instance + ' invalid config');
                            process.exit(1);
                        } else {
                            initAdapter(res);
                        }
                    });
                }
            });
        });
    });

    function initCouch(callback) {
        that.objects = new ObjectsCouch({
            logger: logger,
            host: config.couch.host,
            port: config.couch.port,
            user: config.couch.user,
            pass: config.couch.pass,
            connected: function () {
                if (typeof callback === 'function') callback();
            },
            change: function (id, obj) {
                if (typeof options.objectChange === 'function') {
                    if (id.slice(that.namespace.length) === that.namespace) {
                        options.objectChange(id.slice(that.namespace.length + 1), obj);
                    } else {
                        options.objectChange(id, obj);
                    }
                }
            }
        });



        that.setObject = function setObject(id, obj, callback) {
            that.objects.setObject(that.namespace + '.' + id, obj, callback);
        };

        that.extendObject = function extendObject(id, obj, callback) {
            that.objects.extendObject(that.namespace + '.' + id, obj, callback);
        };

        that.setForeignObject = function setForeignObject(id, obj, callback) {
            that.objects.setObject(id, obj, callback);
        };

        that.extendForeignObject = function extendObject(id, obj, callback) {
            that.objects.extendObject(id, obj, callback);
        };

        that.getObject = function getObject(id, callback) {
            that.objects.getObject(that.namespace + '.' + id, callback);
        };

        that.getForeignObjects = function getForeignObjects(pattern, type, callback) {

        };

        that.getForeignObject = function getForeignObject(id, callback) {
            that.objects.getObject(id, callback);
        };

        that.delObject = function delObject(id, callback) {
            that.objects.delObject(that.namespace + '.' + id, callback);
        };

        that.delForeignObject = function delForeignObject(id, callback) {
            that.objects.delObject(id, callback);
        };

        that.subscribeObjects = function subscribeObjects(pattern) {
            that.objects.subscribe(that.namespace + '.' + pattern);
        };

        that.subscribeForeignObjects = function subscribeObjects(pattern) {
            that.objects.subscribe(pattern);
        };

        that.setObjectNotExists = function setObjectNotExists(id, object, callback) {
            that.objects.getObject(that.namespace + '.' + id, function (err, obj) {
                if (!obj) {
                    that.objects.setObject(that.namespace + '.' + id, object, callback);
                }
            });
        };

        that.setForeignObjectNotExists = function setForeignObjectNotExists(id, obj, callback) {
            that.objects.getObject(id, function (err, obj) {
                if (!obj) {
                    that.objects.setObject(id, obj, callback);
                }
            });
        };



    }

    // initRedis is called from initAdapter
    function initRedis(cb) {
            logger.debug(that.namespace + ' couchdb connected');

            that.states = new StatesRedis({
                redis: {
                    host: config.redis.host,
                    port: config.redis.port,
                    options: config.redis.options
                },
                logger: logger,
                change: function (id, state) {
                    if (typeof options.stateChange === 'function') {
                        if (id.slice(that.namespace.length) === that.namespace) {
                            options.stateChange(id.slice(that.namespace.length + 1), state);
                        } else {
                            options.stateChange(id, state);
                        }
                    }
                }
            });

        that.setState = function setState(id, state, callback) {
            if (typeof state !== 'object') state = {val: state};
            state.from = that.namespace;
            that.states.setState(that.namespace + '.' + id, state, callback);
        };

        that.setForeignState = function setForeignState(id, state, callback) {
            if (typeof state !== 'object') state = {val: state};
            state.from = that.namespace;
            that.states.setState(id, state, callback);
        };

        that.getState = function getState(id, callback) {
            that.states.getState(that.namespace + '.' + id, callback);
        };


        that.getForeignState = function getForeignState(id, callback) {
            that.states.getState(id, callback);
        };

        that.getStates = function getStates(pattern, callback) {
            that.getForeignStates(that.namespace + '.' + pattern, callback);
        };

        that.getForeignStates = function getForeignStates(pattern, callback) {
            var keys = [];
            var params = {};
            if (pattern && pattern !== '*') {
                params = {
                    startkey: pattern.replace('*', ''),
                    endkey:   pattern.replace('*', '\u9999')
                };
            }
            that.objects.getObjectView('system', 'state', params, function (err, res) {
                if (err) {
                    callback(err);
                    return;
                }
                for (var i = 0; i < res.rows.length; i++) {
                    keys.push(res.rows[i].id);
                }
                var list = {};
                that.states.getStates(keys, function (err, arr) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    for (var i = 0; i < res.rows.length; i++) {
                        if (typeof arr[i] === 'string') arr[i] = JSON.parse(arr[i]);
                        list[keys[i]] =  arr[i] || {};
                    }
                    callback(null, list);
                });

            });
        };

        that.subscribeForeignStates = function subscribeForeignStates(pattern) {
            that.states.subscribe(pattern);
        };

        that.subscribeStates = function subscribeStates(pattern) {
            that.states.subscribe(that.namespace + '.' + pattern);
        };

        that.pushFifo = function pushFifo(id, state, callback) {
            that.states.pushFifo(id, state, callback);
        };

        that.trimFifo = function trimFifo(id, start, end, callback) {
            that.states.trimFifo(id, start, end, callback);
        };

        that.getFifoRange = function getFifoRange(id, start, end, callback) {
            that.states.getFifoRange(id, start, end, callback);
        };

        that.getFifo = function getFifo(id, callback) {
            that.states.getFifo(id, callback);
        };

        that.lenFifo = function lenFifo(id, callback) {
            that.states.lenFifo(id, callback);
        };

        logger.debug(that.namespace + ' redis connected');
        if (typeof cb === 'function') cb();
    }

    function initAdapter(adapterConfig) {

        if (!adapterConfig._id) {
            logger.error('invalid config');
            process.exit(1);
            return;
        }

        var tmp = adapterConfig._id.match(/^system\.adapter\.([a-zA-Z0-9-_]+)\.([0-9]+)$/);
        if (!tmp) {
            logger.error('invalid config');
            process.exit(1);
            return;
        }

        for (var tp in logger.transports) {
            logger.transports[tp].level = adapterConfig.common.logLevel || 'info';
        }

        var name =      tmp[1];
        var instance =  tmp[2];

        that.name =     adapterConfig.common.name;
        that.instance = instance;
        that.namespace = name + '.' + instance;
        process.title = 'iobroker.' + that.namespace;

        that.config =   adapterConfig.native;
        that.host =     adapterConfig.common.host;

        if (adapterConfig.common.loglevel) {
            for (var trans in logger.transports) {
                logger.transports[trans].level = adapterConfig.common.loglevel;
            }
        }

        var Log = function () { };
        Log.prototype.info = function (msg) {
            logger.info(that.namespace + ' ' + msg);
        };
        Log.prototype.debug = function (msg) {
            logger.debug(that.namespace + ' ' + msg);
        };
        Log.prototype.error = function (msg) {
            logger.error(that.namespace + ' ' + msg);
        };
        Log.prototype.warn = function (msg) {
            logger.warn(that.namespace + ' ' + msg);
        };

        that.log = new Log();
        that.log.info('starting');

        reportInterval = setInterval(reportStatus, 15000);
        reportStatus();
        if (typeof options.ready === 'function') options.ready();

    }

    function reportStatus() {
        that.states.setState('system.adapter.' + that.namespace + '.alive', {val: true, ack: true, expire: 30});
        if (that.connected) that.states.setState('system.adapter.' + that.namespace + '.connected', {val: true, ack: true, expire: 30});
    }

    function stop() {
        clearInterval(reportInterval);

        if (typeof options.unload === 'function') {
            options.unload(function () {
                that.states.setState('system.adapter.' + that.namespace + '.alive', {val: false, ack: true}, function () {
                    that.log.info('terminating');
                    process.exit(0);
                });
            });
        } else {
            that.states.setState('system.adapter.' + that.namespace + '.alive', {val: false, ack: true}, function () {
                that.log.info('terminating');
                process.exit(0);
            });
        }
    }

    process.on('SIGINT', stop);
    process.on('SIGTERM', stop);

    return this;
}

module.exports = Adapter;
