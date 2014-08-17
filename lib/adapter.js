/* jshint -W097 */// jshint strict:false
/*jslint node: true */

var net =           require('net');
var fs =            require('fs');
var extend =        require('node.extend');

var password =      require(__dirname + '/password.js');
var config = JSON.parse(fs.readFileSync(__dirname + '/../conf/iobroker.json'));
var that;
var defaultObjs;

function Adapter(options) {
    that = this;
    var loglevel = process.argv[3] || 'info';
    var logger = require(__dirname + '/logger.js')(loglevel, ['iobroker.log']);

    var StatesRedis  = require(__dirname + '/redis.js');
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

        if (!callback) throw 'checkPassword: no callback';
        that.getForeignObject('system.user.' + user, function (err, obj) {
            if (err || !obj || !obj.common || !obj.common.enabled) {
                callback(false);
                return;
            }
            password(pw).check(obj.common.password, function (err, res) {
                callback(res);
            });
        });

    };

    that.setPassword = function setPassword(user, pw, callback) {

        that.getForeignObject('system.user.' + user, function (err, obj) {
            if (err || !obj) {
                if (typeof callback === 'function') callback('User does not exist');
                return;
            }
            password(pw).hash(null, null, function (err, res) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                    return;
                }
                that.extendForeignObject('system.user.' + user, {
                    common: {
                        password: res
                    }
                }, function () {
                    if (typeof callback === 'function') callback(null);
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

    // Can be later deleted if no more appears
    that.inited = false;

    initCouch(function () {
        if (that.inited) {
            console.log("!!!!SOME PROBLEM!!!!");
            that.log.error("Initiate called one more time!!!");
            return;
        }
        that.inited = true;

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

    function initCouch(cb) {
        that.objects = new ObjectsCouch({
            logger: logger,
            host: config.couch.host,
            port: config.couch.port,
            user: config.couch.user,
            pass: config.couch.pass,
            connected: function () {
                if (typeof cb === 'function') cb();
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
            if (!defaultObjs) {
                defaultObjs = require(__dirname + '/defaultObjs.js')('de', '°C', 'EUR');
            }

            if (!id) {
                logger.error(that.namespace + ' setObject id missing!!');
                return;
            }

            if (!obj) {
                logger.error(that.namespace + ' setObject ' + id + ' object missing!');
                return;
            }


            if (obj.hasOwnProperty('type')) {
                if (!obj.hasOwnProperty('native')) {
                    logger.warn(that.namespace + ' setObject ' + id + ' (type=' + obj.type + ') property native missing!');
                    obj.native = {};
                }
                // Check property 'common'
                if (!obj.hasOwnProperty('common')) {
                    logger.warn(that.namespace + ' setObject ' + id + ' (type=' + obj.type + ') property common missing!');
                    obj.common = {};
                } else if (obj.type === 'state') {
                    // Try to extend the model for type='state'
                    // Check property 'role' by 'state'
                    if (obj.common.hasOwnProperty('role') && defaultObjs[obj.common.role]) {
                        obj.common.role = extend(true, defaultObjs[obj.common.role], obj.common.role);
                    } else if (!obj.common.hasOwnProperty('role')) {
                        logger.warn(that.namespace + ' setObject ' + id + ' (type=' + obj.type + ') property common.role missing!');
                    }
                } else if (obj.type === 'channel' || obj.type === 'device') {
                    // Check property 'vhildren' by 'channel' and 'device'
                    if (!obj.hasOwnProperty('children')) {
                        logger.warn(that.namespace + ' setObject ' + id + ' (type=' + obj.type + ') property children missing!');
                    }
                }
                
                if (!obj.common.hasOwnProperty('name')) {
                    obj.common.name = id;
                    logger.warn(that.namespace + ' setObject ' + id + ' (type=' + obj.type + ') property common.name missing, using id as name');
                }

                if (id.substring(0, that.namespace.length) != that.namespace) id = that.namespace + '.' + id;
                if (obj.children) {
                    for (var i = 0; i < obj.children.length; i++) {
                        if(obj.children[i].substring(0, that.namespace.length) != that.namespace) obj.children[i] = that.namespace + '.' + obj.children[i];
                    }
                }
                if (obj.parent) {
                    if(obj.parent.substring(0, that.namespace.length) != that.namespace) obj.parent = that.namespace + '.' + obj.parent;
                }

                that.objects.setObject(id, obj, callback);

            } else {
                logger.error(that.namespace + ' setObject ' + id + ' mandatory property type missing!');
            }
            

        };

        that.extendObject = function extendObject(id, obj, callback) {
            if (id.substring(0, that.namespace.length) != that.namespace) id = that.namespace + '.' + id;
            if (obj.children) {
                for (var i = 0; i < obj.children.length; i++) {
                    if(obj.children[i].substring(0, that.namespace.length) != that.namespace) obj.children[i] = that.namespace + '.' + obj.children[i];
                }
            }
            if (obj.parent) {
                if(obj.parent.substring(0, that.namespace.length) != that.namespace) obj.parent = that.namespace + '.' + obj.parent;
            }
            that.objects.extendObject(id, obj, callback);
        };

        that.setForeignObject = function setForeignObject(id, obj, callback) {
            that.objects.setObject(id, obj, callback);
        };

        that.extendForeignObject = function extendObject(id, obj, callback) {
            that.objects.extendObject(id, obj, callback);
        };

        that.getObject = function getObject(id, callback) {
            if (id.substring(0, that.namespace.length) != that.namespace) id = that.namespace + '.' + id;
            that.objects.getObject(id, function (err, obj) {
                if (callback) {
                    if (obj.parent) {
                        if (obj.parent.substring(0, that.namespace.length) == that.namespace) obj.parent = obj.parent.substring(that.namespace.length + 1);
                    }
                    if (obj.children) {
                        for (var i = 0; i < obj.children.length; i++) {
                            if (obj.children[i].substring(0, that.namespace.length) == that.namespace) obj.children[i] = obj.children[i].substring(that.namespace.length + 1);
                        }
                    }

                    callback(err, obj);
                }
            });
        };

        that.getForeignObjects = function getForeignObjects(pattern, type, callback) {

        };

        that.getForeignObject = function getForeignObject(id, callback) {
            that.objects.getObject(id, callback);
        };

        that.delObject = function delObject(id, callback) {
            if (id.substring(0, that.namespace.length) != that.namespace) id = that.namespace + '.' + id;
            that.objects.delObject(id, callback);
        };

        that.delForeignObject = function delForeignObject(id, callback) {
            that.objects.delObject(id, callback);
        };

        that.subscribeObjects = function subscribeObjects(pattern) {
            if (pattern.substring(0, that.namespace.length) != that.namespace) pattern = that.namespace + '.' + pattern;
            that.objects.subscribe(pattern);
        };

        that.subscribeForeignObjects = function subscribeObjects(pattern) {
            that.objects.subscribe(pattern);
        };

        that.setObjectNotExists = function setObjectNotExists(id, object, callback) {
            if (id.substring(0, that.namespace.length) != that.namespace) id = that.namespace + '.' + id;

            that.objects.getObject(id, function (err, obj) {
                if (!obj) {
                    that.objects.setObject(id, object, callback);
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

        that.createDevice = function createDevice(deviceName, channels, common, native, callback) {
            if (!deviceName) {
                that.log.error("Try to create device with empty name!");
                return;
            }
            if (typeof native == "function") {
                callback = native;
                native = {};
            }
            if (typeof common == "function") {
                callback = common;
                common = {};
            }
            common = common || {};
            common.name = deviceName;

            deviceName = deviceName.replace(/[.\s]+/g, '_');
            native = native || {};
            var _channels = [];
            if (channels) {
                for (var t = 0; t < channels.length; t++) {
                    _channles[t] = channels[t].replace(/[.\s]+/g, '_');
                    if (_channels[t].substring(0, this.namespace.length) != this.namespace) {
                        _channels[t] = this.namespace + '.' + _channels[t];
                    }
                }
            }

            this.setObjectNotExists(deviceName, {
                "type":     "device",
                "children": _channels,
                "parent":   this.namespace,
                "common":   common,
                "native":   native
            }, function (err, obj) {
                // Add device to adapter children
                that.objects.getObject(this.namespace, function (err, obj) {
                    if (obj) {
                        if (!obj.children) obj.children = [];
                        obj.children.push(this.namespace + '.' + deviceName);
                        that.objects.setObject(obj._id, obj, callback);
                        //that.objects.extendObject(obj._id, {children: obj.children}, callback);
                    } else {
                        if (callback) callback(err, obj);
                    }
                });
            });
        };

        // name of channel must be in format "channel"
        that.createChannel = function createChannel(parentDevice, channelName, states, roleOrCommon, native, callback) {
            if (!channelName) {
                this.log.error("Try to create channel without name!");
                return;
            }

            if (typeof native == "function") {
                callback = native;
                native = {};
            }

            if (typeof roleOrCommon == "function") {
                callback = roleOrCommon;
                roleOrCommon = undefined;
            }

            var common = {};
            if (typeof roleOrCommon == "string") {
                common = {
                    role: roleOrCommon
                };
            } else if (typeof roleOrCommon == "object") {
                common = roleOrCommon;
            }
            common.name = channelName;

            parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            channelName  = channelName.replace(/[.\s]+/g, '_');
            channelName  = parentDevice + '.' + channelName;

            // Add channel to children of device
            that.getObject(parentDevice, function (err, obj) {
                if (obj) {
                    if (obj.children) {
                        var pos = obj.children.indexOf(that.namespace + '.' + channelName);
                        if (pos == -1) {
                            obj.children.push(that.namespace + '.' + channelName);
                            that.extendObject(parentDevice, {children: obj.children});
                        }
                    }
                }
            });

            native = native || {};

            var _states = [];
            if (states) {
                for (var t = 0; t < states.length; t++) {
                    _states[t] = states[t].replace(/[.\s]+/g, '_');
                    if (_states[t].substring(0, channelName.length) != channelName) {
                        _states[t] = channelName + '.' + _states[t];
                    }
                    if (_states[t].substring(0, this.namespace.length) != this.namespace) {
                        _states[t] = this.namespace + '.' + _states[t];
                    }
                }
            }

            this.setObjectNotExists(channelName , {
                "type":     "channel",
                "parent":   that.namespace + '.' + parentDevice,
                "children": _states,
                "common":   common,
                "native":   native
            }, callback);
        };

        that.createState = function createState(parentDevice, parentChannel, stateName, roleOrCommon, native, callback) {
            if (typeof native == "function") {
                callback = native;
                native = {};
            }

            if (typeof roleOrCommon == "function") {
                callback = roleOrCommon;
                roleOrCommon = undefined;
            }

            var common = {};
            if (typeof roleOrCommon == "string") {
                common = {
                    role: roleOrCommon
                };
            } else if (typeof roleOrCommon == "object") {
                common = roleOrCommon;
            }

            common.name = stateName;
            native = native || {};

            common.read  = (common.read  === undefined) ? true  : common.read;
            common.write = (common.write === undefined) ? false : common.write;

            if (!common.role) {
                log.error("Try to create state " + parentDevice + '.' + stateName + " without role");
                return;
            }

            parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            parentChannel = parentDevice  + '.' + parentChannel.replace(/[.\s]+/g, '_');
            stateName     = parentChannel + '.' + stateName.replace(/[.\s]+/g, '_');

            this.setObjectNotExists(stateName, {
                "type":     "state",
                "parent":   that.namespace + '.' + parentChannel,
                "common":   common,
                "native":   native
            }, callback);
            this.setState(stateName, common.def);
        };

        that.deleteDevice = function deleteDevice(deviceName, callback) {
            deviceName = deviceName.replace(/[.\s]+/g, '_');

            that.getObject(deviceName, function (err, obj) {
                if (obj) {
                    if (obj.children) {
                        for (var i = 0; i < obj.children; i++) {
                            that.deleteChannel(deviceName, obj.children[i]);
                        }
                    }
                    that.delObject(obj._id, callback);
                } else {
                    if (typeof callback == "function") callback(err);
                }

                // Delete device from adapter children
                that.objects.getObject(this.namespace, function (err, obj) {
                    if (obj) {
                        if (obj.children){
                            var pos = obj.children.indexOf(this.namespace + '.' + deviceName);
                            if (pos != -1) {
                                obj.children.splice(pos, 1);
                                that.objects.extendObject(obj._id, {children: obj.children}, callback);
                            } else {
                                if (callback) callback(err, obj);
                            }
                        } else {
                            if (callback) callback(err, obj);
                        }
                    } else {
                        if (callback) callback(err, obj);
                    }
                });

            });
        };

        that.deleteChannel = function deleteChannel(parentDevice, channelName, callback) {

            if (parentDevice.substring(0, that.namespace.length) == that.namespace) {
                parentDevice = parentDevice.substring(that.namespace.length + 1);
            }
            parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            channelName  = channelName.replace(/[.\s]+/g, '_');

            if (channelName.substring(0, that.namespace.length) == that.namespace) {
                channelName = channelName.substring(that.namespace.length + 1);
            }
            if (channelName.substring(0, parentDevice.length) == parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName  = channelName.replace(/[.\s]+/g, '_');

            that.getObject(parentDevice + '.' + channelName, function (err, obj) {
                if (obj) {
                    if (obj.children) {
                        for (var i = 0; i < obj.children.length; i++) {
                            that.deleteState(parentDevice, channelName, obj.children[i]);
                        }
                    }
                    that.delObject(obj._id, callback);
                } else {
                    if (typeof callback == "function") callback(err);
                }

                // Delete channel from children of device
                that.getObject(parentDevice, function (err, obj) {
                    if (obj) {
                        if (obj.children) {
                            var pos = obj.children.indexOf(that.namespace + '.' + parentDevice + '.' + channelName);
                            if (pos != -1) {
                                obj.children.splice(pos, 1);
                                that.extendObject(parentDevice, {children: obj.children});
                            }
                        }
                    }
                });
            });
        };

        that.deleteState = function deleteState(parentDevice, parentChannel, stateName, callback) {
            if (parentDevice.substring(0, that.namespace.length) == that.namespace) {
                parentDevice = parentDevice.substring(that.namespace.length + 1);
            }

            parentDevice  = parentDevice.replace(/[.\s]+/g, '_');

            if (parentChannel.substring(0, that.namespace.length) == that.namespace) {
                parentChannel = parentChannel.substring(that.namespace.length + 1);
            }
            if (parentChannel.substring(0, parentDevice.length) == parentDevice) {
                parentChannel = parentChannel.substring(parentDevice.length + 1);
            }

            parentChannel = parentChannel.replace(/[.\s]+/g, '_');

            if (stateName.substring(0, that.namespace.length) == that.namespace) {
                stateName = stateName.substring(that.namespace.length + 1);
            }
            if (stateName.substring(0, parentDevice.length) == parentDevice) {
                stateName = stateName.substring(parentDevice.length + 1);
            }
            if (stateName.substring(0, parentChannel.length) == parentChannel) {
                stateName = stateName.substring(parentChannel.length + 1);
            }
            stateName     = stateName.replace(/[.\s]+/g, '_');

            that.delState(parentDevice  + '.' + parentChannel + '.' + stateName);
            that.delObject(parentDevice + '.' + parentChannel + '.' + stateName, callback);
        };

        that.getDevices = function getDevices(callback) {
            that.getObject("root", function (err, obj) {
                if (callback) callback(err, obj ? [obj]: null);
            });
        };

        that.getChannels = function getChannels(parentDevice, callback) {
            if (parentDevice.substring(0, that.namespace.length) == that.namespace) {
                parentDevice = parentDevice.substring(that.namespace.length + 1);
            }

            parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            that.getObject(parentDevice, function (err, obj) {
                if (obj) {
                    callback(err, obj.children);
                }
                else {
                    callback(err);
                }
            });
        };

        that.getStates = function getStates(parentDevice, parentChannel, callback) {
            if (parentDevice.substring(0, that.namespace.length) == that.namespace) {
                parentDevice = parentDevice.substring(that.namespace.length + 1);
            }

            parentDevice  = parentDevice.replace(/[.\s]+/g, '_');

            if (parentChannel.substring(0, that.namespace.length) == that.namespace) {
                parentChannel = parentChannel.substring(that.namespace.length + 1);
            }
            if (parentChannel.substring(0, parentDevice.length) == parentDevice) {
                parentChannel = parentChannel.substring(parentDevice.length + 1);
            }

            parentChannel = parentChannel.replace(/[.\s]+/g, '_');

            that.getObject(parentDevice + '.' + parentChannel, function (err, obj) {
                if (obj) {
                    callback(err, obj.children);
                }
                else {
                    callback(err);
                }
            });
        };

        // virtual filesystem
        that.rmdir = function rmdir(path, callback) {

        };

        that.mkdir = function rmdir(path, mode, callback) {
            if (typeof mode === 'function') callback = mode;
        };

        that.readdir = function readdir(path, callback) {

        };

        that.stat = function stat(path, callback) {

        };

        that.readFile = function readFile(filename, options, callback) {
            if (typeof options === 'function') callback = options;
        };

        that.writeFile = function writeFile(filename, data, options, callback) {
            if (typeof options === 'function') callback = options;
        };


    }

    // initRedis is called from initAdapter
    function initRedis(cb) {
        logger.debug(that.namespace + ' couchdb connected');

        that.states = new StatesRedis({
            redis: {
                host:    config.redis.host,
                port:    config.redis.port,
                options: config.redis.options
            },
            logger: logger,
            change: function (id, state) {
                // If this is messagebox
                if (id == 'system.adapter.' + that.namespace + '.messagebox') {
                    // Read it from fifo list
                    that.states.getMessage('system.adapter.' + that.namespace + '.messagebox', function (err, obj) {
                        if (obj) {
                            // If callback stored for this request
                            if (obj.callback &&
                                obj.callback.ack &&
                                obj.callback.id &&
                                that.callbacks &&
                                that.callbacks[obj.callback.id]) {
                                // Call callback function
                                that.callbacks[obj.callback.id].callback(obj.message);
                            } else {
                                // Else inform about new message the adapter
                                options.message(obj);
                            }
                        }
                    });
                } else
                if (typeof options.stateChange === 'function') {
                    if (id.slice(that.namespace.length) === that.namespace) {
                        options.stateChange(id.slice(that.namespace.length + 1), state);
                    } else {
                        options.stateChange(id, state);
                    }
                }
            }
        });

        // Send message to other adapter instance or all instances of adapter
        that.sendTo = function sendTo(adapter, command, message, callback) {
            if (typeof message == 'undefined') {
                message = command;
                command = 'send';
            }
            var obj = {command: command, message: message, from: that.namespace};

            if (adapter.indexOf('.') == -1) {
                // Send to all instances of adapter
                that.getForeignObject('system.adapter.' + adapter, function (err, obj) {
                    if (!err && obj.common.children && obj.common.children.length) {

                        for (var i = 0; i < obj.common.children.length; i++) {
                            that.pushMessage(obj.common.children + '.messagebox', obj);
                        }
                    }
                });
            } else {
                if (typeof callback == "function") {
                    obj.callback = {
                        message: message,
                        id:      Math.floor(Math.random() * 0xFFFFFFE) + 1,
                        ack:     false
                    };
                    if (!that.callbacks) that.callbacks = {};
                    that.callbacks['_' + obj.callback.id] = {cb: callback};
                } else {
                    obj.callback = callback;
                    obj.callback.ack = true;
                }

                that.pushMessage('system.adapter.' + adapter + '.messagebox', obj);
            }
        };

        that.setState = function setState(id, state, callback) {
            if (typeof state !== 'object') state = {val: state};
            if (id.substring(0, that.namespace.length) != that.namespace) id = that.namespace + '.' + id;
            state.from = that.namespace;
            that.states.setState(id, state, callback);
        };

        that.setForeignState = function setForeignState(id, state, callback) {
            if (typeof state !== 'object') state = {val: state};
            state.from = that.namespace;
            that.states.setState(id, state, callback);
        };

        that.getState = function getState(id, callback) {
            if (id.substring(0, that.namespace.length) != that.namespace) id = that.namespace + '.' + id;
            that.states.getState(id, callback);
        };


        that.getForeignState = function getForeignState(id, callback) {
            that.states.getState(id, callback);
        };

        that.delForeignState = function delForeignState(id, callback) {
            that.states.delState(id, callback);
        };

        that.delState = function delState(id, callback) {
            if (id.substring(0, that.namespace.length) != that.namespace) id = that.namespace + '.' + id;
            that.states.delState(id, callback);
        };

        that.getStates = function getStates(pattern, callback) {
            if (pattern.substring(0, that.namespace.length) != that.namespace) pattern = that.namespace + '.' + pattern;
            that.getForeignStates(pattern, callback);
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
            if (pattern.substring(0, that.namespace.length) != that.namespace) pattern = that.namespace + '.' + pattern;
            that.states.subscribe(pattern);
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

        that.subscribeFifo = function subscribeFifo(pattern) {
            that.states.subscribeFifo(pattern);
        };

        that.getSession = function getSession(id, callback) {
            that.states.getSession(id, callback);
        };
        that.setSession = function setSession(id, ttl, data, callback) {
            that.states.setSession(id, ttl, data, callback);
        };
        that.destroySession = function destroySession(id, callback) {
            that.states.destroySession(id, callback);
        };

        that.getMessage = function getMessage(callback) {
            that.states.getMessage('system.adapter.' + that.namespace + '.messagebox', callback);
        };

        that.lenMessage = function lenMessage(callback) {
            that.states.lenMessage('system.adapter.' + that.namespace + '.messagebox', callback);
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

        var name =       tmp[1];
        var instance =   tmp[2];

        that.name =      adapterConfig.common.name;
        that.instance =  instance;
        that.namespace = name + '.' + instance;
        process.title =  'io.' + that.namespace;

        that.config =    adapterConfig.native;
        that.host =      adapterConfig.common.host;

        if (adapterConfig.common.mode == 'subscribe') {
            that.stop = function () {
                stop(true);
            }
        }

        if (typeof options.message === 'function' && adapterConfig.common.messagebox) {
            that.states.subscribeMessage('system.adapter.' + that.namespace + '.messagebox');
        } else
        if (typeof options.message === 'function' && !adapterConfig.common.messagebox) {
            logger.error(that.namespace + ' : message handler implemented, but messagebox not enabled. Define common.messagebox in io-package.json for adapter or delete message handler.');
        }

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

    function stop(isPause) {
        clearInterval(reportInterval);

        if (!isPause && typeof options.unload === 'function') {
            options.unload(function () {
                that.states.setState('system.adapter.' + that.namespace + '.alive', {val: false, ack: true}, function () {
                    that.log.info('terminating');
                    process.exit(0);
                });
            });
        } else {
            that.states.setState('system.adapter.' + that.namespace + '.alive', {val: false, ack: true}, function () {
                if (!isPause) that.log.info('terminating');
                process.exit(0);
            });
        }
    }

    process.on('SIGINT', stop);
    process.on('SIGTERM', stop);

    return this;
}

module.exports = Adapter;
