/* jshint -W097 */// jshint strict:false
/*jslint node: true */

var net =           require('net');
var fs =            require('fs');
var extend =        require('node.extend');
var util =          require('util');
var EventEmitter =  require('events').EventEmitter;

var password =      require(__dirname + '/password.js');
var config =        null;
var that;
var defaultObjs;

if (fs.existsSync(__dirname + '/../conf/iobroker.json')) {
    config = JSON.parse(fs.readFileSync(__dirname + '/../conf/iobroker.json'));
}

function Adapter(options) {
    if (!(this instanceof Adapter)) return new Adapter(options);

    if (!options || (!config && !options.config)) throw "Configuration not set!";

    config = config || options.config;

    that = this;
    // enable "var adapter = require(__dirname + '/../../lib/adapter.js')('adapterName');" call
    if (typeof options == 'string') options = {name: options};

    if (!options) throw 'Empty options!';
    if (!options.name) throw 'No name of adapter!';

    if (fs.existsSync(__dirname + '/../adapter/' + options.name + '/io-package.json')) {
        this.ioPack = JSON.parse(fs.readFileSync(__dirname + '/../adapter/' + options.name + '/io-package.json'));
    }

    // If required system configuration. Store it in systemConfig attribute
    if (options.systemConfig) that.systemConfig = config;

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
    var instance = (options.instance !== undefined) ? options.instance : process.argv[2] || 0;
    that.name = options.name;
    that.namespace = options.name + '.' + instance;

    var reportInterval;

    var callbackId = 1;

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
            that.getForeignState('system.adapter.' + that.namespace + '.alive', function (res) {
                if (options.instance !== undefined) {
                    initAdapter(options);
                } else
                if (res && res.val === true) {
                    logger.error(options.name + '.' + instance + ' already running');
                    process.exit(7);
                } else {
                    that.getForeignObject('system.adapter.' + options.name + '.' + instance, function (err, res) {
                        if (err || !res) {
                            logger.error(options.name + '.' + instance + ' invalid config');
                            process.exit(2);
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
                that.connected = true;
            },
            disconnected: function () {
                that.connected = false;
            },
            change: function (id, obj) {
                if (id.slice(that.namespace.length) === that.namespace) {
                    if (typeof options.objectChange === 'function') options.objectChange(id.slice(that.namespace.length + 1), obj);

                    // emit 'objectChange' event instantly
                    setTimeout(function () {
                        that.emit('objectChange', id.slice(that.namespace.length + 1), obj);
                    }, 0);
                } else {
                    if (typeof options.objectChange === 'function') options.objectChange(id, obj);

                    // emit 'objectChange' event instantly
                    setTimeout(function () {
                        that.emit('objectChange', id, obj);
                    }, 0);
                }
            }
        });

        that._ioRegExp = new RegExp('^io.');                           // chache the regex object 'io.'
        that._namespaceRegExp = new RegExp('^' + that.namespace);       // chache the regex object 'adapter.0'
        that._io_namespaceRegExp = new RegExp('^io.' + that.namespace); // chache the regex object 'io.adapter.0'

        that._fixId = function _fixId(id, _type) {
            var result  = '';
            // If id is an object
            if (typeof id == "object") {
                // Add namespace + device + channel
                result = ((_type == 'state') ? 'io.' : '') + that.namespace + '.' + (id.device ? id.device + '.' : '') + (id.channel ? id.channel + '.' : '');
                if (that._ioRegExp.test(id.state)) {
                    result += id.state.substring(3);
                } else {
                    result += id.state;
                }
            } else {
                result = id;
                if (_type == 'state' && that._ioRegExp.test(id)) {
                    if (!that._io_namespaceRegExp.test(id)) {
                        result = 'io.' + that.namespace + '.' + id.substring(3);
                    }
                } else {
                    if (!that._namespaceRegExp.test(id)) result = that.namespace + '.' + id;
                }
            }
            return result;
        };


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
                        obj.common = extend(true, defaultObjs[obj.common.role], obj.common);
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
                    logger.debug(that.namespace + ' setObject ' + id + ' (type=' + obj.type + ') property common.name missing, using id as name');
                }

                id = that._fixId(id, obj.type);

                if (obj.children) {
                    for (var i = 0; i < obj.children.length; i++) {
                        if (obj.type == 'channel') {
                            obj.children[i] = that._fixId(obj.children[i], 'state');
                        } else {
                            obj.children[i] = that._fixId(obj.children[i]);
                        }
                    }
                }
                if (obj.parent) obj.parent = that._fixId(obj.parent);

                that.objects.setObject(id, obj, callback);

            } else {
                logger.error(that.namespace + ' setObject ' + id + ' mandatory property type missing!');
            }
        };

        that.extendObject = function extendObject(id, obj, callback) {
            if (!obj.type) {
                logger.warn('Please give always the object.type by extendObject. ' + id + ': type not found.');
            }
            id = that._fixId(id, obj.type);

            if (obj.children) {
                for (var i = 0; i < obj.children.length; i++) {
                    if (obj.type == 'channel') {
                        obj.children[i] = that._fixId(obj.children[i], 'state'); // assume, that channels have only states as children
                    } else {
                        obj.children[i] = that._fixId(obj.children[i]);
                    }
                }
            }
            if (obj.parent) {
                obj.parent = that._fixId(obj.parent);
            }
            // delete arrays if they should be changed
            if (obj && (obj.children ||
                (obj.common && obj.common.members) ||
                (obj.native && obj.native.repositories) ||
                (obj.native && obj.native.certificates) ||
                (obj.native && obj.native.devices))
                ) {
                // Read whole object
                that.objects.getObject(id, function (err, oldObj) {
                    if (!oldObj) {
                        logger.error('Object ' + id + ' not exist!');
                        oldObj = {};
                    }
                    if (obj.children && oldObj.children) {
                        oldObj.children = [];
                    }
                    if (obj.native && obj.native.repositories && oldObj.native && oldObj.native.repositories) {
                        oldObj.native.repositories = [];
                    }
                    if (obj.common && obj.common.members && oldObj.common && oldObj.common.members) {
                        oldObj.common.members = [];
                    }
                    if (obj.native && obj.native.certificates && oldObj.native && oldObj.native.certificates) {
                        oldObj.native.certificates = [];
                    }
                    if (obj.native && obj.native.devices && oldObj.native && oldObj.native.devices) {
                        oldObj.native.devices = [];
                    }
                    obj = extend(true, oldObj, obj);

                    that.objects.setObject(id, obj, callback);
                });
            } else {
                that.objects.extendObject(id, obj, callback);
            }
        };

        that.setForeignObject = function setForeignObject(id, obj, callback) {
            that.objects.setObject(id, obj, callback);
        };

        that.extendForeignObject = function extendForeignObject(id, obj, callback) {
            // delete arrays if they should be changed
            if (obj && (obj.children || (obj.native && (obj.native.repositories || obj.native.certificates || obj.native.devices)) ||
                (obj.common && obj.common.members))) {
                // Read whole object
                that.objects.getObject(id, function (err, oldObj) {
                    if (!oldObj) {
                        logger.error('Object ' + id + ' not exist!');
                        oldObj = {};
                    }
                    if (obj.children && oldObj.children) {
                        oldObj.children = [];
                    }
                    if (obj.native && obj.native.repositories && oldObj.native && oldObj.native.repositories) {
                        oldObj.native.repositories = [];
                    }
                    if (obj.common && obj.common.members && oldObj.common && oldObj.common.members) {
                        oldObj.common.members = [];
                    }
                    if (obj.native && obj.native.certificates && oldObj.native && oldObj.native.certificates) {
                        oldObj.native.certificates = [];
                    }
                    if (obj.native && obj.native.devices && oldObj.native && oldObj.native.devices) {
                        oldObj.native.devices = [];
                    }
                    obj = extend(true, oldObj, obj);

                    that.objects.setObject(id, obj, callback);
                });
            } else {
                that.objects.extendObject(id, obj, callback);
            }
        };

        that.getObject = function getObject(id, _type, callback) {
            if (typeof _type == 'function') {
                callback = _type;
                _type = undefined;
            }

            id = that._fixId(id, _type);

            that.objects.getObject(id, function (err, obj) {
                if (callback) {
                    if (obj && obj.parent) {
                        obj.parent = that._fixId(obj.parent); // parent is always channel or state
                    }
                    if (obj && obj.children) {
                        var __type = (obj.type == 'channel') ? 'state' : '';
                        for (var i = 0; i < obj.children.length; i++) {
                            obj.children[i] = that._fixId(obj.children[i], __type);
                        }
                    }

                    callback(err, obj);
                }
            });
        };

        // Get the enum tree
        that.getEnum = function getEnum(_enum, callback) {
            if (!_enum.match('^enum.')) _enum = 'enum.' + _enum;
            var result = {};
            that.objects.getObject(_enum, function (err, obj) {
                if (err || !obj || !obj.children || !obj.children.length) {
                    if (callback) callback({}, _enum);
                    return;
                }

                // Read all
                var count = 0;
                for (var t = 0; t < obj.children.length; t++) {
                    count++;
                    that.objects.getObject(obj.children[t], function (err, _obj) {
                        if (!err && _obj) result[_obj._id] = _obj;
                        count--;
                        if (!count && callback) callback (result, _enum);
                    });
                }
            });
        };

        that.getEnums = function getEnums(_enumList, callback) {
            var _enums = {};
            if (_enumList) {
                if (typeof _enumList == 'string') _enumList = [_enumList];
                var count = 0;
                for (var t = 0; t < _enumList.length; t++) {
                    count++;
                    that.getEnum(_enumList[t], function (list, _enum) {
                        _enums[_enum] = list;
                        count--;
                        if (!count && callback) callback(_enums);
                    });
                }
            } else if (callback) {
                callback(null);
            }
        };

        that.getForeignObjects = function getForeignObjects(pattern, type, enums, callback) {
            var params = {};
            if (pattern && pattern !== '*') {
                params = {
                    startkey: pattern.replace('*', ''),
                    endkey:   pattern.replace('*', '\u9999')
                };
            }
            if (typeof enums == 'function') {
                callback = enums;
                enums = null;
            }
            if (typeof type == 'function') {
                callback = type;
                type = null;
            }
            that.objects.getObjectView('system', 'state', params, function (err, res) {
                if (err) {
                    callback(err);
                    return;
                }

                that.getEnums(enums, function (_enums) {
                    var list = {};
                    for (var i = 0; i < res.rows.length; i++) {
                        list[res.rows[i].id] = res.rows[i].value;

                        if (_enums) {
                            list[res.rows[i].id].enums = {};
                            for (var es in _enums) {
                                for (var e in _enums[es]) {
                                    if (_enums[es][e].common.members.indexOf(res.rows[i].id) != -1 ||
                                        _enums[es][e].common.members.indexOf(res.rows[i].value.parent) != -1) {
                                        list[res.rows[i].id].enums[e] = _enums[es][e].common.name;
                                    }
                                }
                            }
                        }
                    }
                    callback(null, list);
                });
            });

        };

        that.getForeignObject = function getForeignObject(id, callback) {
            that.objects.getObject(id, callback);
        };

        that.delObject = function delObject(id, _type, callback) {
            if (typeof _type == 'function') {
                callback = _type;
                _type = undefined;
            }
            id = that._fixId(id, _type);
            that.objects.delObject(id, callback);
        };

        that.delForeignObject = function delForeignObject(id, callback) {
            that.objects.delObject(id, callback);
        };

        that.subscribeObjects = function subscribeObjects(pattern, _type) {
            if (pattern == '*') {
                that.objects.subscribe(that.namespace + '.*');
                that.objects.subscribe('io.' + that.namespace + '.*');
            } else {
                pattern = that._fixId(pattern, _type);
                that.objects.subscribe(pattern);
            }
        };

        that.subscribeForeignObjects = function subscribeObjects(pattern) {
            that.objects.subscribe(pattern);
        };

        that.setObjectNotExists = function setObjectNotExists(id, object, callback) {
            id = that._fixId(id, object.type);

            if (object.parent) object.parent = that._fixId(object.parent); // it is not state
            if (object.children) {
                var _type = (object.type == 'channel') ? 'state': '';
                for (var i = 0; i < object.children.length; i++) {
                    object.children[i] = that._fixId(object.children[i], _type);
                }
            }

            that.objects.getObject(id, function (err, obj) {
                if (!obj) {
                    that.objects.setObject(id, object, callback);
                }
            });
        };

        that.setForeignObjectNotExists = function setForeignObjectNotExists(id, obj, callback) {
            if (object.type == 'state' && id.substring(0, 3) != 'io.') throw 'State must start with "io."';

            that.objects.getObject(id, function (err, obj) {
                if (!obj) {
                    that.objects.setObject(id, obj, callback);
                }
            });
        };

        that._DCS2ID = function (device, channel, state) {
            var id = '';
            if (device)  id += device;
            if (channel) id += ((id) ? '.' : '') + channel;
            if (state)  {
                id += ((id) ? '.' : '') + state;
                id = 'io.' + id;
            }
            return id;
        };

        that.createDevice = function createDevice(deviceName, channels, common, _native, callback) {
            if (!deviceName) {
                that.log.error("Try to create device with empty name!");
                return;
            }
            if (typeof _native == "function") {
                callback = _native;
                _native = {};
            }
            if (typeof common == "function") {
                callback = common;
                common = {};
            }
            common = common || {};
            common.name = common.name || deviceName;

            deviceName = deviceName.replace(/[.\s]+/g, '_');
            _native = _native || {};
            var _channels = []; // Do not modify original object

            if (channels) {
                for (var t = 0; t < channels.length; t++) {
                    _channels[t] = channels[t].replace(/[.\s]+/g, '_');
                }
            }

            that.setObjectNotExists(deviceName, {
                "type":     "device",
                "children": _channels,
                //"parent":   this.namespace,
                "common":   common,
                "native":   _native
            });
        };

        // name of channel must be in format "channel"
        that.createChannel = function createChannel(parentDevice, channelName, states, roleOrCommon, _native, callback) {
            if (!channelName) throw "Try to create channel without name!";

            if (typeof _native == "function") {
                callback = _native;
                _native = {};
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
            common.name = common.name || channelName;

            if (parentDevice) parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            channelName  = channelName.replace(/[.\s]+/g, '_');
            channelName  = this._DCS2ID(parentDevice, channelName);

            // Add channel to children of device
            if (parentDevice) {
                that.getObject(parentDevice, function (err, obj) {
                    if (obj) {
                        if (obj.children) {
                            var pos = obj.children.indexOf(channelName);
                            if (pos == -1) {
                                obj.children.push(channelName);
                                that.extendObject(parentDevice, {children: obj.children, type: 'device'});
                            }
                        }
                    }
                });
            }

            _native = _native || {};

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

            var obj = {
                "type":     "channel",
                "children": _states,
                "common":   common,
                "native":   _native
            };
            if (parentDevice) obj.parent = that._fixId(parentDevice);

            that.setObject(channelName, obj, callback);
        };

        that.createState = function createState(parentDevice, parentChannel, stateName, roleOrCommon, _native, callback) {
            if (!stateName) throw 'Empty name is not allowed!';

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

            common.name = common.name || stateName;
            _native = _native || {};

            common.read  = (common.read  === undefined) ? true  : common.read;
            common.write = (common.write === undefined) ? false : common.write;

            if (!common.role) {
                logger.error("Try to create state " + (parentDevice ? (parentDevice + '.') : '') + parentChannel + '.' + stateName + " without role");
                return;
            }

            if (parentDevice)  parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            if (parentChannel) parentChannel = parentChannel.replace(/[.\s]+/g, '_');
            stateName = stateName.replace(/[.\s]+/g, '_');
            var id = that._fixId({device: parentDevice, channel: parentChannel, state: stateName}, 'state');

            // Add state to children of channel
            if (parentChannel) {
                parentChannel = ((parentDevice) ? (parentDevice + '.') : '') + parentChannel;
                parentChannel = that._fixId(parentChannel);
                that.getObject(parentChannel, 'channel', function (err, obj) {
                    if (obj) {
                        if (obj.children) {
                            var pos = obj.children.indexOf(id);
                            if (pos == -1) {
                                obj.children.push(id);
                                that.extendObject(parentChannel, {children: obj.children, type: 'channel'});
                            }
                        }
                    }
                });
            }

            that.setObjectNotExists(id, {
                "type":     'state',
                "parent":   parentChannel,
                "common":   common,
                "native":   _native
            }, callback);

            if (common.def !== undefined) {
                that.setState(id, common.def);
            }
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
                        if (obj.children) {
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

        that.addChannelToEnum = function removeChannelFromEnum(enumName, addTo, parentDevice, channelName, callback) {
            if (parentDevice) {
                if (parentDevice.substring(0, that.namespace.length) == that.namespace) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }
                parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (channelName.substring(0, that.namespace.length) == that.namespace) {
                channelName = channelName.substring(that.namespace.length + 1);
            }
            if (channelName.substring(0, parentDevice.length) == parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName.replace(/[.\s]+/g, '_');

            var objId = that.namespace + '.' + that._DCS2ID(parentDevice, channelName);

            if (addTo.match(/^enum\./)) {
                that.objects.getObject(addTo, function (err, obj) {
                    if (!err && obj) {
                        var pos = obj.common.members.indexOf(objId);
                        if (pos == -1) {
                            obj.common.members.push(objId);
                            that.setObject(obj._id, obj, function (err) {
                                if (callback) callback(err);
                            });
                        }
                    }
                });
            } else {
                that.objects.getObject('enum.' + enumName, function (err, obj) {
                    if (!err && obj) {
                        var count = 0;
                        for (var i = 0; i < obj.children.length; i++) {
                            count++;
                            that.objects.getObject(obj.children[i], function (err, obj) {
                                if (!err && obj && obj.common.name == addTo) {
                                    var pos = obj.common.members.indexOf(objId);

                                    if (pos == -1) {
                                        obj.common.members.push(objId);
                                        count++;
                                        that.objects.setObject(obj.children[i], obj, function (err) {
                                            count--;
                                            if (!count && callback) callback(err);
                                        });
                                    }
                                }
                                count--;
                                if (!count && callback) callback(err);
                            });
                        }
                    } else if (callback) {
                        callback (err);
                    }
                });
            }
        };

        that.deleteChannelFromEnum = function removeChannelFromEnum(enumName, parentDevice, channelName, callback) {
            if (parentDevice) {
                if (parentDevice.substring(0, that.namespace.length) == that.namespace) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }
                parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (channelName.substring(0, that.namespace.length) == that.namespace) {
                channelName = channelName.substring(that.namespace.length + 1);
            }
            if (channelName.substring(0, parentDevice.length) == parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName.replace(/[.\s]+/g, '_');

            var objId = that.namespace + '.' + that._DCS2ID(parentDevice, channelName);

            that.objects.getObject('enum.' + enumName, function (err, obj) {
                if (!err && obj) {
                    var count = 0;
                    for (var i = 0; i < obj.children.length; i++) {
                        count++;
                        that.objects.getObject(obj.children[i], function (err, obj) {
                            if (!err && obj) {
                                var pos = obj.common.members.indexOf(objId);
                                if (pos != -1) {
                                    obj.common.members.splice(pos, 1);
                                    count++;
                                    that.objects.setObject(obj.children[i], obj, function (err) {
                                        count--;
                                        if (!count && callback) callback(err);
                                    });
                                }
                            }
                            count--;
                            if (!count && callback) callback(err);
                        });
                    }
                } else if (callback) {
                    callback (err);
                }
            });
        };

        that.deleteChannel = function deleteChannel(parentDevice, channelName, callback) {
            logger.info("Delete channel " + channelName);
            if (parentDevice) {
                if (parentDevice.substring(0, that.namespace.length) == that.namespace) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }
                parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (channelName.substring(0, that.namespace.length) == that.namespace) {
                channelName = channelName.substring(that.namespace.length + 1);
            }
            if (channelName.substring(0, parentDevice.length) == parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName.replace(/[.\s]+/g, '_');

            that.getObject(that._DCS2ID(parentDevice, channelName), function (err, obj) {
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
            });

            // Delete channel from children of device
            if (parentDevice) {
                that.getObject(parentDevice, function (err, obj) {
                    if (obj) {
                        if (obj.children) {
                            var pos = obj.children.indexOf(parentDevice + '.' + channelName);
                            if (pos != -1) {
                                obj.children.splice(pos, 1);
                                that.extendObject(parentDevice, {children: obj.children, type: obj.type});
                            }
                        }
                    }
                });
            }
        };

        that.deleteState = function deleteState(parentDevice, parentChannel, stateName, callback) {
            if (parentDevice) {
                if (parentDevice.substring(0, that.namespace.length) == that.namespace) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }

                parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (parentChannel) {
                if (parentChannel.substring(0, that.namespace.length) == that.namespace) {
                    parentChannel = parentChannel.substring(that.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) == parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(/[.\s]+/g, '_');
            }

            if (stateName.substring(0, that.namespace.length) == that.namespace) {
                stateName = stateName.substring(that.namespace.length + 1);
            }
            if (parentDevice && stateName.substring(0, parentDevice.length) == parentDevice) {
                stateName = stateName.substring(parentDevice.length + 1);
            }
            if (parentChannel && stateName.substring(0, parentChannel.length) == parentChannel) {
                stateName = stateName.substring(parentChannel.length + 1);
            }
            stateName     = stateName.replace(/[.\s]+/g, '_');

            var _name = that._DCS2ID(parentDevice, parentChannel, stateName);
            that.delState(_name);
            that.delObject(_name, callback);
        };

        that.getDevices = function getDevices(callback) {
            that.objects.getObjectView("system", "device", {startkey: '', endkey: '\u9999'}, function (err, obj) {
                if (callback) {
                    if (obj.rows.length) {
                        var res = [];
                        for (var i = 0; i < obj.rows.length; i++) {
                            if (obj.rows[i].id.substring(0, that.namespace.length) == that.namespace) {
                                var device = obj.rows[i].value;
                                // Correct the names of children
                                if (device.children && device.children.length) {
                                    for (var j = 0; j < device.children.length; j++) {
                                        if (device.children[j].substring(0, that.namespace.length) == that.namespace) {
                                            device.children[j] = device.children[j].substring(that.namespace.length + 1);
                                        }
                                    }
                                }

                                res.push(device);
                            }
                        }
                        callback(null, res);
                    } else {
                        callback(err, []);
                    }
                }
            });
        };

        that.getChannelsOf = function getChannelsOf(parentDevice, callback) {
            if (parentDevice.substring(0, that.namespace.length) == that.namespace) {
                parentDevice = parentDevice.substring(that.namespace.length + 1);
            }

            parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            that.getObject(parentDevice, function (err, obj) {
                if (obj && callback) {
                    if (obj.children && obj.children.length) {
                        var read = 0;
                        var res = [];
                        for (var i = 0; i < obj.children.length; i++) {
                            that.getObject(obj.children[i], function (err, subObj) {
                                read++;
                                if (subObj) {
                                    // Correct names of children
                                    if (subObj.children) {
                                        var channelName = subObj.common.name.replace(/[.\s]+/g, '_');
                                        for (var j = 0; j < subObj.children.length; j++) {
                                            if (subObj.children[j].substring(0, that.namespace.length) == that.namespace) {
                                                subObj.children[j] = subObj.children[j].substring(that.namespace.length + 1);
                                            }
                                            if (subObj.children[j].substring(0, parentDevice.length) == parentDevice) {
                                                subObj.children[j] = subObj.children[j].substring(parentDevice.length + 1);
                                            }
                                            if (subObj.children[j].substring(0, channelName.length) == channelName) {
                                                subObj.children[j] = subObj.children[j].substring(channelName.length + 1);
                                            }
                                        }
                                    }
                                    // Correct name of parent
                                    if (subObj.parent) {
                                        if (subObj.parent.substring(0, that.namespace.length) == that.namespace) {
                                            subObj.parent = subObj.parent.substring(that.namespace.length + 1);
                                        }
                                    }

                                    res.push(subObj);
                                }
                                if (read == obj.children.length) {
                                    callback(null, res);
                                }
                            });
                        }
                    } else {
                        callback(err, []);
                    }
                } else {
                    callback(err);
                }
            });
        };

        that.getStatesOf = function getStatesOf(parentDevice, parentChannel, callback) {
            if (!parentDevice) {
                parentDevice = '';
            } else {
                if (parentDevice.substring(0, that.namespace.length) == that.namespace) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }

                parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (parentChannel.substring(0, that.namespace.length) == that.namespace) {
                parentChannel = parentChannel.substring(that.namespace.length + 1);
            }
            if (parentDevice && parentChannel.substring(0, parentDevice.length) == parentDevice) {
                parentChannel = parentChannel.substring(parentDevice.length + 1);
            }

            parentChannel = parentChannel.replace(/[.\s]+/g, '_');

            that.getObject((parentDevice ? (parentDevice + '.') : '') + parentChannel, function (err, obj) {
                if (obj) {
                    var read = 0;
                    var res = [];
                    for (var i = 0; i < obj.children.length; i++) {
                        that.objects.getObject(obj.children[i], function (err, subObj) {
                            read++;
                            if (subObj) {
                                // Correct names of children
                                if (subObj.children) {
                                    for (var j = 0; j < subObj.children.length; j++) {
                                        if (subObj.children[j].substring(0, that.namespace.length + 3) == 'io.' + that.namespace) {
                                            subObj.children[j] = subObj.children[j].substring(that.namespace.length + 4);
                                        }
                                        if (parentDevice && subObj.children[j].substring(0, parentDevice.length) == parentDevice) {
                                            subObj.children[j] = subObj.children[j].substring(parentDevice.length + 1);
                                        }
                                        if (subObj.children[j].substring(0, parentChannel.length) == parentChannel) {
                                            subObj.children[j] = subObj.children[j].substring(parentChannel.length + 1);
                                        }
                                    }
                                }
                                // Correct name of parent
                                if (subObj.parent) {
                                    if (subObj.parent.substring(0, that.namespace.length) == that.namespace) {
                                        subObj.parent = subObj.parent.substring(that.namespace.length + 1);
                                    }
                                    if (parentDevice && subObj.parent.substring(0, parentDevice.length) == parentDevice) {
                                        subObj.parent = subObj.parent.substring(parentDevice.length + 1);
                                    }
                                }

                                res.push(subObj);
                            }
                            if (read == obj.children.length) {
                                callback(null, res);
                            }
                        });
                    }
                } else {
                    callback(err);
                }
            });
        };

        that.addStateToEnum = function addStateToEnum(enumName, addTo, parentDevice, parentChannel, stateName, callback) {
            if (parentDevice)  parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            if (parentChannel) parentChannel = parentChannel.replace(/[.\s]+/g, '_');
            stateName = stateName.replace(/[.\s]+/g, '_');

            var objId = that._fixId({device: parentDevice, channel: parentChannel, state: stateName}, 'state');

            if (addTo.match(/^enum\./)) {
                that.objects.getObject(addTo, function (err, obj) {
                    if (!err && obj) {
                        var pos = obj.common.members.indexOf(objId);
                        if (pos == -1) {
                            obj.common.members.push(objId);
                            that.setObject(obj._id, obj, function (err) {
                                if (callback) callback(err);
                            });
                        }
                    }
                });
            } else {
                that.objects.getObject('enum.' + enumName, function (err, obj) {
                    if (!err && obj) {
                        var count = 0;
                        for (var i = 0; i < obj.children.length; i++) {
                            count++;
                            that.objects.getObject(obj.children[i], function (err, obj) {
                                if (!err && obj && obj.common.name == addTo) {
                                    var pos = obj.common.members.indexOf(objId);

                                    if (pos == -1) {
                                        obj.common.members.push(objId);
                                        count++;
                                        that.objects.setObject(obj.children[i], obj, function (err) {
                                            count--;
                                            if (!count && callback) callback(err);
                                        });
                                    }
                                }
                                count--;
                                if (!count && callback) callback(err);
                            });
                        }
                    } else if (callback) {
                        callback (err);
                    }
                });
            }
        };

        that.deleteStateFromEnum = function deleteStateFromEnum(enumName, parentDevice, parentChannel, stateName, callback) {
            if (parentDevice)  parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            if (parentChannel) parentChannel = parentChannel.replace(/[.\s]+/g, '_');
            stateName = stateName.replace(/[.\s]+/g, '_');

            var objId = that._fixId({device: parentDevice, channel: parentChannel, state: stateName}, 'state');

            that.objects.getObject('enum.' + enumName, function (err, obj) {
                if (!err && obj) {
                    var count = 0;
                    for (var i = 0; i < obj.children.length; i++) {
                        count++;
                        that.objects.getObject(obj.children[i], function (err, obj) {
                            if (!err && obj) {
                                var pos = obj.common.members.indexOf(objId);
                                if (pos != -1) {
                                    obj.common.members.splice(pos, 1);
                                    count++;
                                    that.objects.setObject(obj.children[i], obj, function (err) {
                                        count--;
                                        if (!count && callback) callback(err);
                                    });
                                }
                            }
                            count--;
                            if (!count && callback) callback(err);
                        });
                    }
                } else if (callback) {
                    callback (err);
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
                // If someone want to have log messages
                if (that.logList && id.match(/.logging$/)) {
                    that.logRedirect(state.val, id.substring(0, id.length - 'logging'.length) + 'log');
                } else
                if (id == 'system.adapter.' + that.namespace + '.log') {
                    that.processLog();
                } else
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
                                that.callbacks['_' + obj.callback.id]) {
                                // Call callback function
                                if (that.callbacks['_' + obj.callback.id].cb) {
                                    that.callbacks['_' + obj.callback.id].cb(obj.message);
                                    delete that.callbacks['_' + obj.callback.id];
                                }
                                // delete too old callbacks IDs, like garbage collector
                                var now = (new Date()).getTime();
                                for (var id in that.callbacks) {
                                    if (now - that.callbacks[id].time > 3600000) delete that.callbacks[id];
                                }

                            } else {
                                if (options.message) {
                                    // Else inform about new message the adapter
                                    options.message(obj);
                                }
                                that.emit('message', obj);
                            }
                        }
                    });
                } else {
                    if (id.slice(that.namespace.length) === that.namespace) {
                        if (typeof options.stateChange === 'function') options.stateChange(id.slice(that.namespace.length + 1), state);
                        // emit 'stateChange' event instantly
                        setTimeout(function () {
                            that.emit('stateChange', id.slice(that.namespace.length + 1), state);
                        }, 0);

                    } else {
                        if (typeof options.stateChange === 'function') options.stateChange(id, state);
                        // emit 'stateChange' event instantly
                        setTimeout(function () {
                            that.emit('stateChange', id, state);
                        }, 0);

                    }
                }
            }
        });

        // Send message to other adapter instance or all instances of adapter
        that.sendTo = function sendTo(objName, command, message, callback) {
            if (typeof message == 'undefined') {
                message = command;
                command = 'send';
            }
            var obj = {command: command, message: message, from: 'system.adapter.' + that.namespace};

            if (objName.substring(0, 'system.adapter.'.length) != 'system.adapter.') objName = 'system.adapter.' + objName;

            that.log.info('sendTo "' + command + '" to ' + objName + ' from system.adapter.' + that.namespace + ': ' + JSON.stringify(message));

            if (objName.indexOf('.') == -1) {
                // Send to all instances of adapter
                that.getForeignObject('system.adapter.' + objName, function (err, obj) {
                    if (!err && obj.common.children && obj.common.children.length) {

                        for (var i = 0; i < obj.common.children.length; i++) {
                            that.states.pushMessage(obj.common.children + '.messagebox', obj);
                        }
                    }
                });
            } else {
                if (callback) {
                    if (typeof callback == "function") {
                        obj.callback = {
                            message: message,
                            id:      callbackId++,
                            ack:     false,
                            time:    (new Date()).getTime()
                        };
                        if (callbackId >= 0xFFFFFFFF) callbackId = 1;
                        if (!that.callbacks) that.callbacks = {};
                        that.callbacks['_' + obj.callback.id] = {cb: callback};

                        // delete too old callbacks IDs
                        var now = (new Date()).getTime();
                        for (var id in that.callbacks) {
                            if (now - that.callbacks[id].time > 3600000) delete that.callbacks[id];
                        }
                    } else {
                        obj.callback = callback;
                        obj.callback.ack = true;
                    }
                }

                that.states.pushMessage(objName + '.messagebox', obj);
            }
        };

        // Send message to specific host or to all hosts
        that.sendToHost = function sendToHost(objName, command, message, callback) {
            if (typeof message == 'undefined') {
                message = command;
                command = 'send';
            }
            var obj = {command: command, message: message, from: 'system.adapter.' + that.namespace};

            if (objName && objName.substring(0, 'system.host.'.length) != 'system.host.') objName = 'system.host.' + objName;

            if (!objName) {
                // Send to all hosts
                that.objects.getObjectList({startkey: 'system.host.', endkey: 'system.host.' + '\u9999'}, function (err, res) {
                    if (!err && res.rows.length) {
                        for (var i = 0; i < res.rows.length; i++) {
                            var parts = res.rows[i].id.split('.');
                            // ignore system.host.name.alive and so on
                            if (parts.length == 3) {
                                that.states.pushMessage(res.rows[i].id + '.messagebox', obj);
                            }
                        }
                    }
                });
            } else {
                if (callback) {
                    if (typeof callback == "function") {
                        obj.callback = {
                            message: message,
                            id:      callbackId++,
                            ack:     false,
                            time:    (new Date()).getTime()
                        };
                        if (callbackId >= 0xFFFFFFFF) callbackId = 1;
                        if (!that.callbacks) that.callbacks = {};
                        that.callbacks['_' + obj.callback.id] = {cb: callback};
                    } else {
                        obj.callback     = callback;
                        obj.callback.ack = true;
                    }
                }

                that.states.pushMessage(objName + '.messagebox', obj);
            }
        };

        that.setState = function setState(id, state, callback) {
            id = that._fixId(id, 'state');

            if (typeof state !== 'object') state = {val: state};
            state.from = 'system.adapter.' + that.namespace;
            that.states.setState(id, state, callback);
        };

        that.setForeignState = function setForeignState(id, state, callback) {
            if (typeof state !== 'object') state = {val: state};
            state.from = 'system.adapter.' + that.namespace;
            that.states.setState(id, state, callback);
        };

        that.getState = function getState(id, callback) {
            id = that._fixId(id, 'state');
            that.states.getState(id, callback);
        };

        that.getStateHistory = function getStateHistory(id, start, end, callback) {
            id = that._fixId(id, 'state');
            that.getForeignStateHistory(id, start, end, callback);
        };

        that.getForeignStateHistory = function getStateHistory(id, start, end, callback) {

            if (typeof start === 'function') {
                callback = start;
                start = undefined;
                end = undefined;
            } else if (typeof end === 'function') {
                callback = end;
                end = undefined;
            }

            start = start   || Math.round((new Date()).getTime() / 1000) - 31536000; // - 1 year
            end =   end     || Math.round((new Date()).getTime() / 1000) + 5000;

            var history = [];
            var docs = [];

            // get data from redis
            that.log.debug('get Redis history ' + id + ' ' + start + ' ' + end);
            that.getFifo(id, function (err, res) {
                if (!err) {
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].ts < start) {
                            continue;
                        } else if (res[i].ts > end) {
                            break;
                        }
                        history.push(res[i]);
                    }
                    that.log.debug('got ' + res.length + ' datapoints for ' + id);
                } else {
                    that.log.error(err);
                }

                // queue couchdb history documents fetching
                function queue(ts) {
                    if (ts < start) {
                        callback(null, history);
                        return;
                    }
                    var cid = 'history.' + id + '.' + ts2day(ts);
                    if (docs.indexOf(cid) !== -1) {
                        getCouchLog(cid, function () {
                            queue(ts - 86400); // - 1 day
                        });
                    } else {
                        queue(ts - 86400); // - 1 day
                    }
                }

                // get list of available history documents
                that.objects.getObjectList({startkey: 'history.' + id, endkey: 'history.' + id + '\u9999'}, function (err, res) {
                    if (!err && res.rows.length) {
                        for (var i = 0; i < res.rows.length; i++) {
                            docs.push(res.rows[i].id);
                        }
                        queue(end);
                    } else {
                        callback(null, history);
                    }
                });

                // fetch a history document from couchdb
                function getCouchLog(cid, callback) {
                    that.log.info('getCouchLog ' + cid);
                    that.getForeignObject(cid, function (err, res) {
                        if (!err && res.common.data) {
                            for (var i = 0; i < res.common.data.length; i++) {
                                if (res.common.data[i].ts < start) {
                                    continue;
                                } else if (res.common.data[i].ts > end) {
                                    break;
                                }
                                history.push(res.common.data[i]);
                            }
                        } else {
                            that.log.warn(cid + ' not found');
                        }
                        callback();
                    });
                }

            });
        };

        // Convert ID adapter.instance.device.channel.state
        // Convert ID to {device: D, channel: C, state: S}
        that.idToDCS = function idToDCS(id) {
            if (!id) return null;
            if (id.substring(0, 3) == 'io.') id = id.substring(3);
            var parts = id.split('.');
            if (parts[0] + '.' + parts[1] != that.namespace) {
                that.log.warn("Try to decode id not from this adapter");
                return null;
            }
            return {device: parts[2], channel: parts[3], state: parts[4]};
        };

        that.getForeignState = function getForeignState(id, callback) {
            that.states.getState(id, callback);
        };

        that.delForeignState = function delForeignState(id, callback) {
            that.states.delState(id, callback);
        };

        that.delState = function delState(id, callback) {
            id = that._fixId(id);
            that.states.delState(id, callback);
        };

        that.getStates = function getStates(pattern, callback) {
            pattern = that._fixId(pattern, 'state');
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

        that.unsubscribeForeignStates = function unsubscribeForeignStates(pattern) {
            that.states.unsubscribe(pattern);
        };

        that.subscribeStates = function subscribeStates(pattern) {
            // Exception. Threat the '*' case automatically
            if (pattern == '*') {
                that.states.subscribe('io.' + that.namespace + '.*');
                that.states.subscribe(that.namespace + '.*');
            } else {
                pattern = that._fixId(pattern, 'state');
                that.states.subscribe(pattern);
            }
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

        // Write binary block into redis, e.g image
        that.setBinaryState = function setBinaryState(id, binary, callback) {
            that.states.setBinaryState(id, binary, callback);
        };

        // Read binary block fromredis, e.g. image
        that.getBinaryState = function getBinaryState(id, callback) {
            that.states.getBinaryState(id, callback);
        };

        logger.debug(that.namespace + ' redis connected');
        if (typeof cb === 'function') cb();
    }

    function initLogging() {
        if (!options.logTransporter && !that.ioPack.common.logTransporter) {
            // Read current state of all log subscriber
            that.states.getKeys('*.logging', function (err, keys) {
                if (keys) {
                    that.states.getStates(keys, function (err, obj) {
                        if (obj) {
                            for (var i = 0; i < keys.length; i++) {
                                // We can JSON.parse, but index is 16x faster
                                if (obj[i] && (obj[i].indexOf('"val":true') != -1 || obj[i].indexOf('"val":"true"') != -1)) {
                                    that.logRedirect(true, keys[i].substring(0, keys[i].length - 'logging'.length) + 'log');
                                }
                            }
                        }
                    });
                }
            });


            // If some message from logger
            logger.on('logging', function (transport, level, msg, meta) {
                if (transport.name != 'file') return;
                // Send to all adapter, that required logs
                for (var i = 0; i < that.logList.length; i++) {
                    that.states.pushMessage(that.logList[i], {message: msg, severity: level, from: that.namespace, ts: (new Date()).getTime()});
                }
            });

            that.logList = [];
            that.logRedirect = function (isActive, id) {
                if (isActive) {
                    if (this.logList.indexOf(id) == -1) this.logList.push(id);
                } else {
                    var pos = this.logList.indexOf(id);
                    if (pos != -1) this.logList.splice(pos, 1);
                }
            };
        } else {
            logger.on('logging', function (transport, level, msg, meta) {
                that.emit('log', {message: msg, severity: level, from: that.namespace, ts: (new Date()).getTime()});
            });

            that.requireLog = function (isActive) {
                if (that.states) that.states.setState('system.adapter.' + that.namespace + '.logging', isActive);
            };

            that.processLog = function () {
                that.states.getMessage('system.adapter.' + that.namespace + '.log', function (err, obj) {
                    if (!err && obj) {
                        that.emit('log', obj);
                        setTimeout(that.processLog, 0);
                    }
                });
            };
        }
    }

    function initAdapter(adapterConfig) {
        initLogging();

        if (options.instance === undefined) {
            if (!adapterConfig || !adapterConfig.common || !adapterConfig.common.enabled) {
                if (adapterConfig && adapterConfig.common && adapterConfig.common.enabled !== undefined) {
                    logger.error('adapter disabled');
                } else {
                    logger.error('invalid config');
                }
                process.exit(3);
                return;
            }

            if (!adapterConfig._id) {
                logger.error('invalid config: no _id found');
                process.exit(4);
                return;
            }


            var tmp = adapterConfig._id.match(/^system\.adapter\.([a-zA-Z0-9-_]+)\.([0-9]+)$/);
            if (!tmp) {
                logger.error('invalid config');
                process.exit(5);
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
            that.common =    adapterConfig.common;

            if (adapterConfig.common.mode == 'subscribe' || adapterConfig.common.mode == 'schedule') {
                that.stop = function () {
                    stop(true);
                };
            }

            // Monitor logging state
            that.states.subscribe('*.logging');

            if (typeof options.message === 'function' && !adapterConfig.common.messagebox) {
                logger.error(that.namespace + ' : message handler implemented, but messagebox not enabled. Define common.messagebox in io-package.json for adapter or delete message handler.');
            } else
            if (/*typeof options.message === 'function' && */adapterConfig.common.messagebox) {
                that.states.subscribeMessage('system.adapter.' + that.namespace + '.messagebox');
            }

            if (adapterConfig.common.loglevel) {
                for (var trans in logger.transports) {
                    logger.transports[trans].level = adapterConfig.common.loglevel;
                }
            }
        } else {
            that.name =      adapterConfig.name || options.name;
            that.instance =  adapterConfig.instance || 0;
            that.namespace = that.name + '.' + that.instance;

            that.config =    adapterConfig.native || {};
            that.common =    adapterConfig.common || {};
            that.host =      that.common.host || require('os').hostname();
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
        if (options.instance === undefined) {
            that.log.info('starting. Version ' + ((that.ioPack && that.ioPack.common) ? that.ioPack.common.version : 'unknown'));
            reportInterval = setInterval(reportStatus, 15000);
            reportStatus();
        }
        if (typeof options.ready === 'function') options.ready();
        that.emit('ready');
    }

    function reportStatus() {
        that.states.setState('system.adapter.' + that.namespace + '.alive', {val: true, ack: true, expire: 30, from: 'system.adapter.' + that.namespace});
        if (that.connected) that.states.setState('system.adapter.' + that.namespace + '.connected', {val: true, ack: true, expire: 30});
    }

    function stop(isPause) {
        clearInterval(reportInterval);

        if (typeof options.unload === 'function') {
            options.unload(function () {
                that.states.setState('system.adapter.' + that.namespace + '.alive', {val: false, ack: true, from: 'system.adapter.' + that.namespace}, function () {
                    if (!isPause) that.log.info('terminating');
                    process.exit(0);
                });
            });
        } else {
            // Make delay to let event 'unload' to be processed
            setTimeout(function () {
                that.states.setState('system.adapter.' + that.namespace + '.alive', {val: false, ack: true, from: 'system.adapter.' + that.namespace}, function () {
                    if (!isPause) that.log.info('terminating');
                    process.exit(0);
                });
            }, 500);
        }

        that.emit('unload', function () {
            that.states.setState('system.adapter.' + that.namespace + '.alive', {val: false, ack: true, from: 'system.adapter.' + that.namespace}, function () {
                if (!isPause) that.log.info('terminating');
                process.exit(0);
            });
        });
    }

    process.on('SIGINT', stop);
    process.on('SIGTERM', stop);

    process.on('uncaughtException', function (err) {
        logger.error('uncaught exception: ' + err.message);
        logger.error(err.stack);
        setTimeout(function () {
            process.exit(6);
        }, 300);
    });

    return this;
}

// extend the EventEmitter class using our Radio class
util.inherits(Adapter, EventEmitter);

function ts2day(ts) {
    var dateObj = new Date(ts * 1000);
    return dateObj.getFullYear() +
        ("0" + (dateObj.getMonth() + 1).toString(10)).slice(-2) +
        ("0" + (dateObj.getDate()).toString(10)).slice(-2);
}

module.exports = Adapter;