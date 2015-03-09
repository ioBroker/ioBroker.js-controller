/* jshint -W097 */// jshint strict:false
/*jslint node: true */

var net =               require('net');
var fs =                require('fs');
var extend =            require('node.extend');
var util =              require('util');
var EventEmitter =      require('events').EventEmitter;
var getConfigFileName = require(__dirname + '/tools').getConfigFileName;

var password =          require(__dirname + '/password');
var config =            null;
var that;
var defaultObjs;

if (fs.existsSync(getConfigFileName())) {
    config = JSON.parse(fs.readFileSync(getConfigFileName()));
    if (!config.states)  config.states  = {type: 'file'};
    if (!config.objects) config.objects = {type: 'file'};
} else {
    throw 'Cannot fine ' + getConfigFileName();
}

function Adapter(options) {
    if (!(this instanceof Adapter)) return new Adapter(options);

    if (!options || (!config && !options.config)) throw "Configuration not set!";

    config = config || options.config;

    that = this;

    var loglevel = process.argv[3] || 'info';
    var logger = require(__dirname + '/logger.js')(loglevel, 'iobroker.log');

    // enable "var adapter = require(__dirname + '/../../lib/adapter.js')('adapterName');" call
    if (typeof options == 'string') options = {name: options};

    if (!options) throw 'Empty options!';
    if (!options.name) throw 'No name of adapter!';

    // If installed as npm module
    if (options.dirname) {
        this.adapterDir = options.dirname.replace(/\\/g, '/');
    } else {
        this.adapterDir = __dirname.replace(/\\/g, '/').split('/');
        // it can be .../node_modules/iobroker.js-controller/node_modules/iobroker.adapter
        //           .../iobroker.js-controller/node_modules/iobroker.adapter
        //           .../iobroker.js-controller/adapter/adapter
        // remove "lib"
        this.adapterDir.pop();
        var jsc = this.adapterDir.pop();
        if ((jsc == 'iobroker.js-controller' || jsc == 'ioBroker.js-controller')  && this.adapterDir.pop() == 'node_modules') {
            // js-controller is installed as npm
            this.adapterDir = this.adapterDir.join('/');
            if (fs.existsSync(this.adapterDir + '/node_modules/iobroker.' + options.name)) {
                this.adapterDir += '/node_modules/iobroker.' + options.name;
            } else if (fs.existsSync(this.adapterDir + '/node_modules/iobroker.js-controller/node_modules/iobroker.' + options.name)) {
                this.adapterDir += '/node_modules/iobroker.js-controller/node_modules/iobroker.' + options.name;
            } else if (fs.existsSync(this.adapterDir + '/node_modules/iobroker.js-controller/adapter/' + options.name)) {
                this.adapterDir += '/node_modules/iobroker.js-controller/adapter/' + options.name;
            } else if (fs.existsSync(this.adapterDir + '/node_modules/ioBroker.js-controller/node_modules/iobroker.' + options.name)) {
                this.adapterDir += '/node_modules/ioBroker.js-controller/node_modules/iobroker.' + options.name;
            } else if (fs.existsSync(this.adapterDir + '/node_modules/ioBroker.js-controller/adapter/' + options.name)) {
                this.adapterDir += '/node_modules/ioBroker.js-controller/adapter/' + options.name;
            } else {
                logger.error('Cannot find directory of adapter ' + options.name);
                process.exit(10);
            }
        } else {
            this.adapterDir = __dirname.replace(/\\/g, '/');
            // remove "/lib"
            this.adapterDir = this.adapterDir.substring(0, this.adapterDir.length - 4);
            if (fs.existsSync(this.adapterDir + '/node_modules/iobroker.' + options.name)) {
                this.adapterDir += '/node_modules/iobroker.' + options.name;
            } else if (fs.existsSync(this.adapterDir + '/adapter/' + options.name)) {
                this.adapterDir += '/adapter/' + options.name;
            } else {
                logger.error('Cannot find directory of adapter ' + options.name);
                process.exit(10);
            }
        }
    }

    if (fs.existsSync(this.adapterDir + '/io-package.json')) {
        this.ioPack = JSON.parse(fs.readFileSync(this.adapterDir + '/io-package.json'));
    } else {
        logger.error('Cannot find: ' + this.adapterDir + '/io-package.json');
        process.exit(10);
    }
    
    if (fs.existsSync(this.adapterDir + '/package.json')) {
        this.pack = JSON.parse(fs.readFileSync(this.adapterDir + '/package.json'));
    } else {
        logger.info('Non npm module. No package.json');
    }

    // If required system configuration. Store it in systemConfig attribute
    if (options.systemConfig) that.systemConfig = config;


    var States  = require(__dirname + '/states');
    var Objects = require(__dirname + '/objects');

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
    if (instance == '--force') instance = 0;

    that.name = options.name;
    that.namespace = options.name + '.' + instance;

    var reportInterval;

    var callbackId = 1;
    that.getPortRunning = null;

    // helper function to find next free port
    that.getPort = function adapterGetPort(port, callback) {
        that.getPortRunning = {port: port, callback: callback};
        var server = net.createServer();
        try {

            server.listen(port, function (err) {
                server.once('close', function () {
                    if (typeof callback === 'function') {
                        //that.getPortRunning = null;
                        callback(port);
                    }
                });
                server.close();
            });
            server.on('error', function (err) {
                setTimeout(function () {
                    that.getPort(port + 1, callback);
                }, 100);
            });
        } catch (e) {
            setTimeout(function () {
                that.getPort(port + 1, callback);
            }, 0);
        }
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

    initObjects(function () {
        if (that.inited) {
            if (that.log) that.log.warn("Reconnection to DB.");
            return;
        }
        that.inited = true;

        initStates(function () {
            that.getForeignState('system.adapter.' + that.namespace + '.alive', function (err, res) {
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

    function initObjects(cb) {
        that.objects = new Objects({
            connection: config.objects,
            logger: logger,
            connected: function () {
                if (typeof cb === 'function') cb();
                that.connected = true;
                // Read dateformat if using of formatDate is announced
                if (options.useFormatDate) {
                    that.getForeignObject('system.config', function (err, data) {
                        if (data && data.common) that.dateFormat = data.common.dateFormat;
                    });
                }

            },
            disconnected: function () {
                that.connected = false;
            },
            change: function (id, obj) {
                if (!id) {
                    logger.error(that.namespace + ' change ID is empty:  ' + JSON.stringify(obj));
                    return;
                }

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

        that._namespaceRegExp = new RegExp('^' + that.namespace);       // chache the regex object 'adapter.0'

        that._fixId = function _fixId(id) {
            var result  = '';
            // If id is an object
            if (typeof id == "object") {
                // Add namespace + device + channel
                result = that.namespace + '.' + (id.device ? id.device + '.' : '') + (id.channel ? id.channel + '.' : '') + id.state;
            } else {
                result = id;
                if (!that._namespaceRegExp.test(id)) result = that.namespace + '.' + id;
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
                }

                if (!obj.common.hasOwnProperty('name')) {
                    obj.common.name = id;
                    logger.debug(that.namespace + ' setObject ' + id + ' (type=' + obj.type + ') property common.name missing, using id as name');
                }

                id = that._fixId(id, obj.type);

                if (obj.children || obj.parent) {
                    logger.warn('Do not use parent or children for ' + id);
                }
                that.objects.setObject(id, obj, callback);

            } else {
                logger.error(that.namespace + ' setObject ' + id + ' mandatory property type missing!');
            }
        };

        that.extendObject = function extendObject(id, obj, callback) {
            id = that._fixId(id, obj.type);

            if (obj.children || obj.parent) {
                logger.warn('Do not use parent or children for ' + id);
            }
            // delete arrays if they should be changed
            if (obj && (
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
            if (obj && ((obj.native && (obj.native.repositories || obj.native.certificates || obj.native.devices)) ||
                (obj.common && obj.common.members))) {
                // Read whole object
                that.objects.getObject(id, function (err, oldObj) {
                    if (!oldObj) {
                        logger.error('Object ' + id + ' not exist!');
                        oldObj = {};
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

        that.getObject = function getObject(id, callback) {
            that.objects.getObject(that._fixId(id), callback);
        };

        // Get the enum tree
        that.getEnum = function getEnum(_enum, callback) {
            if (!_enum.match('^enum.')) _enum = 'enum.' + _enum;
            var result = {};

            that.objects.getObjectView('system', 'enum', {startkey: _enum + '.', endkey: _enum + '.\u9999'}, function (err, res) {
                // Read all
                var count = 0;

                for (var t = 0; t < res.rows.length; t++) {
                    count++;
                    that.objects.getObject(res.rows[t].id, function (err, _obj) {
                        if (!err && _obj) result[_obj._id] = _obj;
                        count--;
                        if (!count && callback) callback (result, _enum);
                    });
                }
                if (!count && callback) callback(result);
            });
        };

        // read for given enums the members of them
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
            } else {
                // Read all enums
                that.objects.getObjectView('system', 'enum', {startkey: 'enum.', endkey: 'enum.\u9999'}, function (err, res) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    var result = {};
                    for (var i = 0; i < res.rows.length; i++) {
                        var parts = res.rows[i].id.split('.', 3);
                        if (!parts[2]) continue;
                        if (!result[parts[0] + '.' + parts[1]]) result[parts[0] + '.' + parts[1]] = {};
                        result[parts[0] + '.' + parts[1]][res.rows[i].id] = res.rows[i].value;
                    }

                    if (callback) callback(result);
                });
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
            that.objects.getObjectView('system', type || 'state', params, function (err, res) {
                if (err) {
                    callback(err);
                    return;
                }

                that.getEnums(enums, function (_enums) {
                    var list = {};
                    for (var i = 0; i < res.rows.length; i++) {
                        list[res.rows[i].id] = res.rows[i].value;

                        if (_enums) {
                            // get device or channel of this state and check it too
                            var parts = res.rows[i].id.split('.');
                            parts.splice(parts.length - 1, 1);
                            var channel = parts.join('.');
                            parts.splice(parts.length - 1, 1);
                            var device = parts.join('.');

                            list[res.rows[i].id].enums = {};
                            for (var es in _enums) {
                                for (var e in _enums[es]) {
                                    if (!_enums[es][e] || !_enums[es][e].common || !_enums[es][e].common.members) continue;
									if (_enums[es][e].common.members.indexOf(res.rows[i].id) != -1 ||
                                        _enums[es][e].common.members.indexOf(channel)        != -1 ||
                                        _enums[es][e].common.members.indexOf(device)         != -1) {
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

        that.findForeignObject = function findForeignState(id, type, callback) {
            that.objects.findObject(id, type, callback);
        };

        that.getForeignObject = function getForeignObject(id, callback) {
            that.objects.getObject(id, callback);
        };

        that.delObject = function delObject(id, callback) {
            id = that._fixId(id);
            that.objects.delObject(id, callback);
        };

        that.delForeignObject = function delForeignObject(id, callback) {
            that.objects.delObject(id, callback);
        };

        that.subscribeObjects = function subscribeObjects(pattern) {
            if (pattern == '*') {
                that.objects.subscribe(that.namespace + '.*');
            } else {
                pattern = that._fixId(pattern);
                that.objects.subscribe(pattern);
            }
        };

        that.subscribeForeignObjects = function subscribeObjects(pattern) {
            that.objects.subscribe(pattern);
        };

        that.setObjectNotExists = function setObjectNotExists(id, object, callback) {
            id = that._fixId(id);

            if (object.children || object.parent) {
                logger.warn('Do not use parent or children for ' + id);
            }

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

        that._DCS2ID = function (device, channel, state) {
            var id = '';
            if (device)  id += device;
            if (channel) id += ((id) ? '.' : '') + channel;
            if (state)   id += ((id) ? '.' : '') + state;
            return id;
        };

        that.createDevice = function createDevice(deviceName, common, _native, callback) {
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

            that.setObjectNotExists(deviceName, {
                "type":     "device",
                "common":   common,
                "native":   _native
            }, callback);
        };

        // name of channel must be in format "channel"
        that.createChannel = function createChannel(parentDevice, channelName, roleOrCommon, _native, callback) {
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
            channelName  = that._DCS2ID(parentDevice, channelName);

            _native = _native || {};

            var obj = {
                "type":     "channel",
                "common":   common,
                "native":   _native
            };

            that.setObject(channelName, obj, callback);
        };

        that.createState = function createState(parentDevice, parentChannel, stateName, roleOrCommon, _native, callback) {
            if (!stateName) throw 'Empty name is not allowed!';

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
            var id = that._fixId({device: parentDevice, channel: parentChannel, state: stateName});

            that.setObjectNotExists(id, {
                "type":     'state',
                "common":   common,
                "native":   _native
            }, callback);

            if (common.def !== undefined) {
                that.setState(id, common.def);
            }
        };

        that.deleteDevice = function deleteDevice(deviceName, callback) {
            deviceName = deviceName.replace(/[.\s]+/g, '_');
            if (!that._namespaceRegExp.test(deviceName)) deviceName = that.namespace + '.' + deviceName;

            that.objects.getObjectView('system', 'device', {startkey: deviceName, endkey: deviceName}, function (err, res) {
                var cnt = 0;
                if (res.rows.length > 1) adapter.log.warn('Found more than one device ' + deviceName);

                for (var t = 0; t < res.rows.length; t++) {
                    cnt++;
                    that.delObject(res.rows[t].id, function () {
                        cnt--;
                        if (!cnt) {
                            that.objects.getObjectView('system', 'channel', {startkey: deviceName + '.', endkey: deviceName + '.\u9999'}, function (err, res) {
                                for (var k = 0; k < res.rows.length; k++) {
                                    cnt++;
                                    that.deleteChannel(deviceName, res.rows[k].id, function () {
                                        cnt--;
                                        if (!cnt && callback) callback();
                                    });
                                }
                                if (!cnt && callback) callback();
                            });
                        }
                    });
                }
                if (!cnt && callback) callback();
            });
        };

        that.addChannelToEnum = function addChannelToEnum(enumName, addTo, parentDevice, channelName, callback) {
            if (parentDevice) {
                if (that._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }
                parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (that._namespaceRegExp.test(channelName)) {
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
                            that.objects.setObject(obj._id, obj, function (err) {
                                if (callback) callback(err);
                            });
                        }
                    }
                });
            } else {
                if (enumName.match(/^enum\./)) enumName = enumName.substring(5);

                that.objects.getObject('enum.' + enumName + '.' + addTo, function (err, obj) {
                    if (!err && obj) {
                        var pos = obj.common.members.indexOf(objId);
                        if (pos == -1) {
                            obj.common.members.push(objId);
                            that.objects.setObject(obj._id, obj, callback);
                        } else {
                            if (callback) callback();
                        }
                    } else {
                        // Create enum
                        that.objects.setObject('enum.' + enumName + '.' + addTo, {
                            common: {
                                name: addTo,
                                members: [objId]
                            },
                            type: 'enum'
                        }, callback);
                    }
                });
            }
        };

        that.deleteChannelFromEnum = function deleteChannelFromEnum(enumName, parentDevice, channelName, callback) {
            if (parentDevice) {
                if (parentDevice.substring(0, that.namespace.length) == that.namespace) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }
                parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (channelName && channelName.substring(0, that.namespace.length) == that.namespace) {
                channelName = channelName.substring(that.namespace.length + 1);
            }
            if (channelName && channelName.substring(0, parentDevice.length) == parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName || '';
            channelName = channelName.replace(/[.\s]+/g, '_');

            var objId = that.namespace + '.' + that._DCS2ID(parentDevice, channelName);

            if (enumName) {
                enumName = 'enum.' + enumName + '.';
            } else {
                enumName = 'enum.';
            }

            that.objects.getObjectView('system', 'enum', {startkey: enumName, endkey: enumName + '\u9999'}, function (err, res) {
                if (!err && res) {
                    var count = 0;
                    for (var i = 0; i < res.rows.length; i++) {
                        count++;
                        that.objects.getObject(res.rows[i].id, function (err, obj) {
                            if (!err && obj && obj.common && obj.common.members) {
                                var pos = obj.common.members.indexOf(objId);
                                if (pos != -1) {
                                    obj.common.members.splice(pos, 1);
                                    count++;
                                    that.objects.setObject(obj._id, obj, function (err) {
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

            that.deleteChannelFromEnum('', parentDevice, channelName);
            var _parentDevice = parentDevice;
            var _channelName  = channelName;

            if (parentDevice) {
                if (that._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }
                parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (channelName && that._namespaceRegExp.test(channelName)) {
                channelName = channelName.substring(that.namespace.length + 1);
            }
            if (channelName && channelName.substring(0, parentDevice.length) == parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName || '';
            channelName = channelName.replace(/[.\s]+/g, '_');

            channelName  = that.namespace + '.' + that._DCS2ID(parentDevice, channelName);


            that.objects.getObjectView('system', 'channel', {startkey: channelName, endkey: channelName}, function (err, res) {
                var cnt = 0;
                if (res.rows.length > 1) adapter.log.warn('Found more than one channel ' + channelName);

                for (var t = 0; t < res.rows.length; t++) {
                    cnt++;
                    that.delObject(res.rows[t].id, function () {
                        cnt--;
                        if (!cnt) {
                            that.objects.getObjectView('system', 'state', {startkey: channelName + '.', endkey: channelName + '.\u9999'}, function (err, res) {
                                for (var k = 0; k < res.rows.length; k++) {
                                    that.deleteState(_parentDevice, _channelName, res.rows[k].id, function () {
                                        cnt--;
                                        if (!cnt && callback) callback();
                                    });
                                }
                                if (!cnt && callback) callback();
                            });
                        }
                    });
                }
                if (!cnt && callback) callback();
            });
        };

        that.deleteState = function deleteState(parentDevice, parentChannel, stateName, callback) {
            that.deleteStateFromEnum('', parentDevice, parentChannel, stateName);
            if (parentDevice) {
                if (that._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }

                parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (parentChannel) {
                if (that._namespaceRegExp.test(parentChannel)) {
                    parentChannel = parentChannel.substring(that.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) == parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(/[.\s]+/g, '_');
            }

            if (that._namespaceRegExp.test(stateName)) {
                stateName = stateName.substring(that.namespace.length + 1);
            }
            if (parentDevice && stateName.substring(0, parentDevice.length) == parentDevice) {
                stateName = stateName.substring(parentDevice.length + 1);
            }
            if (parentChannel && stateName.substring(0, parentChannel.length) == parentChannel) {
                stateName = stateName.substring(parentChannel.length + 1);
            }
            stateName = stateName || '';
            stateName = stateName.replace(/[.\s]+/g, '_');

            var _name = that._DCS2ID(parentDevice, parentChannel, stateName);
            that.delState(_name, function () {
                that.delObject(_name, callback);
            });
        };

        that.getDevices = function getDevices(callback) {
            that.objects.getObjectView("system", "device", {startkey: that.namespace + '.', endkey: that.namespace + '.\u9999'}, function (err, obj) {
                if (callback) {
                    if (obj.rows.length) {
                        var res = [];
                        for (var i = 0; i < obj.rows.length; i++) {
                            res.push(obj.rows[i].value);
                        }
                        callback(null, res);
                    } else {
                        callback(err, []);
                    }
                }
            });
        };

        that.getChannelsOf = function getChannelsOf(parentDevice, callback) {
            if (that._namespaceRegExp.test(parentDevice)) {
                parentDevice = parentDevice.substring(that.namespace.length + 1);
            }

            parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            parentDevice = that.namespace + (parentDevice ? ('.' + parentDevice) : '');
            that.objects.getObjectView('system', 'channel', {startkey: parentDevice + '.', endkey: parentDevice + '.\u9999'}, function (err, obj) {
                if (callback) {
                    if (obj.rows.length) {
                        var res = [];
                        for (var i = 0; i < obj.rows.length; i++) {
                            res.push(obj.rows[i].value);
                        }
                        callback(null, res);
                    } else {
                        callback(err, []);
                    }
                }
            });
        };

        that.getStatesOf = function getStatesOf(parentDevice, parentChannel, callback) {
            if (!parentDevice) {
                parentDevice = '';
            } else {
                if (that._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }

                parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (that._namespaceRegExp.test(parentChannel)) {
                parentChannel = parentChannel.substring(that.namespace.length + 1);
            }
            if (parentDevice && parentChannel.substring(0, parentDevice.length) == parentDevice) {
                parentChannel = parentChannel.substring(parentDevice.length + 1);
            }

            parentChannel = parentChannel.replace(/[.\s]+/g, '_');

            var id = that.namespace + '.' + that._DCS2ID(parentDevice, parentChannel) + '.';

            that.objects.getObjectView('system', 'state', {startkey: id, endkey: id + '\u9999'}, function (err, obj) {
                if (callback) {
                    var res = [];
                    if (obj.rows.length) {
                        var read = 0;
                        for (var i = 0; i < obj.rows.length; i++) {
                            read++;
                            that.objects.getObject(obj.rows[i].id, function (err, subObj) {
                                read--;

                                if (subObj) res.push(subObj);

                                if (!read) callback(null, res);
                            });
                        }
                    } else {
                        callback(null, res);
                    }
                }
            });
        };

        that.addStateToEnum = function addStateToEnum(enumName, addTo, parentDevice, parentChannel, stateName, callback) {
            if (parentDevice) {
                if (that._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }

                parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (parentChannel) {
                if (that._namespaceRegExp.test(parentChannel)) {
                    parentChannel = parentChannel.substring(that.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) == parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(/[.\s]+/g, '_');
            }

            if (that._namespaceRegExp.test(stateName)) {
                stateName = stateName.substring(that.namespace.length + 1);
            }
            if (parentDevice && stateName.substring(0, parentDevice.length) == parentDevice) {
                stateName = stateName.substring(parentDevice.length + 1);
            }
            if (parentChannel && stateName.substring(0, parentChannel.length) == parentChannel) {
                stateName = stateName.substring(parentChannel.length + 1);
            }
            stateName = stateName.replace(/[.\s]+/g, '_');

            var objId = that._fixId({device: parentDevice, channel: parentChannel, state: stateName});

            if (addTo.match(/^enum\./)) {
                that.objects.getObject(addTo, function (err, obj) {
                    if (!err && obj) {
                        var pos = obj.common.members.indexOf(objId);
                        if (pos == -1) {
                            obj.common.members.push(objId);
                            that.objects.setObject(obj._id, obj, function (err) {
                                if (callback) callback(err);
                            });
                        }
                    }
                });
            } else {
                if (enumName.match(/^enum\./)) enumName = enumName.substring(5);

                that.objects.getObject('enum.' + enumName + '.' + addTo, function (err, obj) {
                    if (!err && obj) {
                        var pos = obj.common.members.indexOf(objId);
                        if (pos == -1) {
                            obj.common.members.push(objId);
                            that.objects.setObject(obj._id, obj, callback);
                        } else {
                            if (callback) callback();
                        }
                    } else {
                        // Create enum
                        that.objects.setObject('enum.' + enumName + '.' + addTo, {
                            common: {
                                name: addTo,
                                members: [objId]
                            },
                            type: 'enum'
                        }, callback);
                    }
                });
            }
        };

        that.deleteStateFromEnum = function deleteStateFromEnum(enumName, parentDevice, parentChannel, stateName, callback) {
            if (parentDevice) {
                if (that._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }

                parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (parentChannel) {
                if (that._namespaceRegExp.test(parentChannel)) {
                    parentChannel = parentChannel.substring(that.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) == parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(/[.\s]+/g, '_');
            }

            if (that._namespaceRegExp.test(stateName)) {
                stateName = stateName.substring(that.namespace.length + 1);
            }
            if (parentDevice && stateName.substring(0, parentDevice.length) == parentDevice) {
                stateName = stateName.substring(parentDevice.length + 1);
            }
            if (parentChannel && stateName.substring(0, parentChannel.length) == parentChannel) {
                stateName = stateName.substring(parentChannel.length + 1);
            }
            stateName = stateName.replace(/[.\s]+/g, '_');

            var objId = that._fixId({device: parentDevice, channel: parentChannel, state: stateName}, 'state');

            if (enumName) {
                enumName = 'enum.' + enumName + '.';
            } else {
                enumName = 'enum.';
            }

            that.objects.getObjectView('system', 'enum', {startkey: enumName, endkey: enumName + '\u9999'}, function (err, res) {
                if (!err && res) {
                    var count = 0;
                    for (var i = 0; i < res.rows.length; i++) {
                        count++;
                        that.objects.getObject(res.rows[i].id, function (err, obj) {
                            if (!err && obj && obj.common && obj.common.members) {
                                var pos = obj.common.members.indexOf(objId);
                                if (pos != -1) {
                                    obj.common.members.splice(pos, 1);
                                    count++;
                                    that.objects.setObject(obj._id, obj, function (err) {
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
        that.rmDir = function rmDir(path, callback) {

        };

        that.mkDir = function mkDir(path, mode, callback) {
            if (typeof mode === 'function') {
                callback = mode;
                mode = null;
            }
        };

        that.readDir = function readDir(adapter, path, callback) {
            if (adapter === null) adapter = that.name;
            that.objects.readDir(adapter, path, callback);
        };

        that.unlink = function unlink(adapter, name, callback) {
            if (adapter === null) adapter = that.name;
            that.objects.unlink(adapter, name, callback);
        };

        that.rename = function rename(adapter, oldName, newName, callback) {
            if (adapter === null) adapter = that.name;
            that.objects.rename(adapter, oldName, newName, callback);
        };

        that.mkdir = function mkdir(adapter, dirname, callback) {
            if (adapter === null) adapter = that.name;
            that.objects.mkdir(adapter, dirname, callback);
        };

        that.readFile = function readFile(adapter, filename, options, callback) {
            if (adapter === null) adapter = that.name;
            if (typeof options == 'function') {
                callback = options;
                options = null;
            }

            that.objects.readFile(adapter, filename, options, callback);
        };

        that.writeFile = function writeFile(adapter, filename, data, mimeType, callback) {
            if (adapter === null) adapter = that.name;

            if (typeof mimeType == 'function') {
                callback = mimeType;
                mimeType = null;
            }

            that.objects.writeFile(adapter, filename, data, mimeType, callback);
        };

        that.formatDate = function formatDate(dateObj, isSeconds, _format) {
            if (typeof isSeconds != 'boolean') {
                _format = isSeconds;
                isSeconds = false;
            }

            var format = _format || that.dateFormat || 'DD.MM.YYYY';

            if (!dateObj) return '';
            var text = typeof dateObj;
            if (text == 'string') {
                var pos = dateObj.indexOf('.');
                if (pos != -1) dateObj = dateObj.substring(0, pos);
                return dateObj;
            }
            if (text != 'object') dateObj = isSeconds ? new Date(dateObj * 1000) : new Date(dateObj);

            var v;

            // Year
            if (format.indexOf('YYYY') != -1 || format.indexOf('JJJJ') != -1 || format.indexOf('ГГГГ') != -1) {
                v = dateObj.getFullYear();
                format = format.replace('YYYY', v);
                format = format.replace('JJJJ', v);
                format = format.replace('ГГГГ', v);
            } else if (format.indexOf('YY') != -1 || format.indexOf('JJ') != -1 || format.indexOf('ГГ') != -1) {
                v = dateObj.getFullYear() % 100;
                format = format.replace('YY', v);
                format = format.replace('JJ', v);
                format = format.replace('ГГ', v);
            }
            // Month
            if (format.indexOf('MM') != -1 || format.indexOf('ММ') != -1) {
                v =  dateObj.getMonth() + 1;
                if (v < 10) v = '0' + v;
                format = format.replace('MM', v);
                format = format.replace('ММ', v);
            } else if (format.indexOf('M') != -1 || format.indexOf('М') != -1) {
                v =  dateObj.getMonth() + 1;
                format = format.replace('M', v);
                format = format.replace('М', v);
            }

            // Day
            if (format.indexOf('DD') != -1 || format.indexOf('TT') != -1 || format.indexOf('ДД') != -1) {
                v =  dateObj.getDate();
                if (v < 10) v = '0' + v;
                format = format.replace('DD', v);
                format = format.replace('TT', v);
                format = format.replace('ДД', v);
            } else if (format.indexOf('D') != -1 || format.indexOf('TT') != -1 || format.indexOf('Д') != -1) {
                v =  dateObj.getDate();
                format = format.replace('D', v);
                format = format.replace('T', v);
                format = format.replace('Д', v);
            }

            // hours
            if (format.indexOf('hh') != -1 || format.indexOf('SS') != -1 || format.indexOf('чч') != -1) {
                v =  dateObj.getHours();
                if (v < 10) v = '0' + v;
                format = format.replace('hh', v);
                format = format.replace('SS', v);
                format = format.replace('чч', v);
            } else if (format.indexOf('h') != -1 || format.indexOf('S') != -1 || format.indexOf('ч') != -1) {
                v =  dateObj.getHours();
                format = format.replace('h', v);
                format = format.replace('S', v);
                format = format.replace('ч', v);
            }

            // minutes
            if (format.indexOf('mm') != -1 || format.indexOf('мм') != -1) {
                v =  dateObj.getMinutes();
                if (v < 10) v = '0' + v;
                format = format.replace('mm', v);
                format = format.replace('мм', v);
            } else if (format.indexOf('m') != -1 ||  format.indexOf('м') != -1) {
                v =  dateObj.getMinutes();
                format = format.replace('m', v);
                format = format.replace('v', v);
            }

            // seconds
            if (format.indexOf('ss') != -1 || format.indexOf('сс') != -1) {
                v =  dateObj.getSeconds();
                if (v < 10) v = '0' + v;
                format = format.replace('ss', v);
                format = format.replace('cc', v);
            } else if (format.indexOf('s') != -1 || format.indexOf('с') != -1) {
                v =  dateObj.getHours();
                format = format.replace('s', v);
                format = format.replace('с', v);
            }
            return format;
        };
    }

    // initStates is called from initAdapter
    function initStates(cb) {
        logger.debug(that.namespace + ' objectDB connected');

        that.states = new States({
            connection: config.states,
            logger: logger,
            change: function (id, state) {
                if (!id || typeof id != 'string') {
                    console.log('Something is wrong! ' + JSON.stringify(id));
                    return;
                }

                // If someone want to have log messages
                if (that.logList && id.match(/\.logging$/)) {
                    that.logRedirect(state ? state.val : false, id.substring(0, id.length - '.logging'.length));
                } else
                if (id == 'log.system.adapter.' + that.namespace) {
                    that.processLog(state);
                } else
                // If this is messagebox
                if (id == 'messagebox.system.adapter.' + that.namespace && state) {
                    // Read it from fifo list
                    that.states.delMessage('system.adapter.' + that.namespace, state._id);
                    var obj = state;
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
                            for (var _id in that.callbacks) {
                                if (now - that.callbacks[_id].time > 3600000) delete that.callbacks[_id];
                            }

                        } else {
                            if (options.message) {
                                // Else inform about new message the adapter
                                options.message(obj);
                            }
                            that.emit('message', obj);
                        }
                    }
                } else {
                    if (id.slice(that.namespace.length) === that.namespace) {
                        if (typeof options.stateChange === 'function') options.stateChange(id.slice(that.namespace.length + 1), state);
                        // emit 'stateChange' event instantly
                        setTimeout(function () {
                            that.emit('stateChange', id.slice(that.namespace.length + 1), state);
                        }, 0);

                    } else {
                        if (typeof options.stateChange === 'function') options.stateChange(id, state);
                        if (id.substring(0, 4) == 'log.') {
                            console.log("LOG");
                        }
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

            if (!objName.match(/^system\.adapter\./)) objName = 'system.adapter.' + objName;

            that.log.info('sendTo "' + command + '" to ' + objName + ' from system.adapter.' + that.namespace + ': ' + JSON.stringify(message));

            // If not specific instance
            if (!objName.match(/\.[0-9]+$/)) {
                // Send to all instances of adapter
                that.objects.getObjectView('system', 'instance', {startkey: objName + '.', endkey: objName + '.\u9999'}, function (err, _obj) {
                    if (_obj) {
                        for (var i = 0; i < _obj.rows.length; i++) {
                            that.states.pushMessage(_obj.rows[i].id, obj);
                        }
                    }
                });
            } else {
                if (callback) {
                    if (typeof callback == 'function') {
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
                        for (var _id in that.callbacks) {
                            if (now - that.callbacks[_id].time > 3600000) delete that.callbacks[_id];
                        }
                    } else {
                        obj.callback = callback;
                        obj.callback.ack = true;
                    }
                }

                that.states.pushMessage(objName, obj);
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
                                that.states.pushMessage(res.rows[i].id, obj);
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

                that.states.pushMessage(objName, obj);
            }
        };

        that.setState = function setState(id, state, callback) {
            id = that._fixId(id, 'state');

            if (typeof state !== 'object' || state === null || state === undefined) state = {val: state};
            if (callback !== undefined && typeof callback != 'function') {
                state.ack = callback;
                callback = null;
            }

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

            start = start || Math.round((new Date()).getTime() / 1000) - 31536000; // - 1 year
            end   = end   || Math.round((new Date()).getTime() / 1000) + 5000;

            var history = [];
            var docs =    [];

            // get data from states
            that.log.debug('get states history ' + id + ' ' + start + ' ' + end);
            that.getFifo(id, function (err, res) {
                if (!err && res) {
                    var iProblemCount = 0;
                    for (var i = 0; i < res.length; i++) {
                        if (!res[i]) {
                            iProblemCount++;
                            continue;
                        }
                        if (res[i].ts < start) {
                            continue;
                        } else if (res[i].ts > end) {
                            break;
                        }
                        history.push(res[i]);
                    }
                    if (iProblemCount) that.log.warn('got null states ' + iProblemCount + ' times for ' + id);

                    that.log.debug('got ' + res.length + ' datapoints for ' + id);
                } else {
                    if (err != 'Not exists') {
                        that.log.error(err);
                    } else {
                        that.log.debug('datapoints for ' + id + ' do not yet exist');
                    }
                }

                // queue objects history documents fetching
                function queue(ts) {
                    if (ts < start) {
                        callback(null, history);
                        return;
                    }
                    var cid = 'history.' + id + '.' + ts2day(ts);
                    if (docs.indexOf(cid) !== -1) {
                        getObjectsLog(cid, function () {
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

                // fetch a history document from objectDB
                function getObjectsLog(cid, callback) {
                    that.log.info('getObjectLog ' + cid);
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
            var list = {};
            if (typeof pattern == 'function') {
                callback = pattern;
                pattern = '*';
            }

            if (typeof pattern == 'object') {
                that.states.getStates(pattern, function (err, arr) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    for (var i = 0; i < pattern.length; i++) {
                        if (typeof arr[i] === 'string') arr[i] = JSON.parse(arr[i]);
                        list[pattern[i]] = arr[i] || {};
                    }
                    callback(null, list);
                });
                return;
            }
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
                that.states.getStates(keys, function (err, arr) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    for (var i = 0; i < res.rows.length; i++) {
                        if (typeof arr[i] === 'string') arr[i] = JSON.parse(arr[i]);
                        list[keys[i]] = arr[i] || {};
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
            that.states.getMessage('system.adapter.' + that.namespace, callback);
        };

        that.lenMessage = function lenMessage(callback) {
            that.states.lenMessage('system.adapter.' + that.namespace, callback);
        };

        // Write binary block into redis, e.g image
        that.setBinaryState = function setBinaryState(id, binary, callback) {
            that.states.setBinaryState(id, binary, callback);
        };

        // Read binary block fromredis, e.g. image
        that.getBinaryState = function getBinaryState(id, callback) {
            that.states.getBinaryState(id, callback);
        };

        logger.debug(that.namespace + ' statesDB connected');
        if (typeof cb === 'function') cb();
    }

    function initLogging() {
        if (!options.logTransporter && !that.ioPack.common.logTransporter) {
            // temporary log buffer
            var messages = [];
            // Read current state of all log subscriber
            that.states.getKeys('*.logging', function (err, keys) {
                if (keys && keys.length) {
                    that.states.getStates(keys, function (err, obj) {
                        if (obj) {
                            for (var i = 0; i < keys.length; i++) {
                                // We can JSON.parse, but index is 16x faster
                                if (!obj[i]) continue;
                                if(typeof obj[i] == 'string' && (obj[i].indexOf('"val":true') != -1 || obj[i].indexOf('"val":"true"') != -1)) {
                                    that.logRedirect(true, keys[i].substring(0, keys[i].length - '.logging'.length));
                                } else if (typeof obj[i] == 'object' && (obj[i].val === true || obj[i].val === "true")) {
                                    that.logRedirect(true, keys[i].substring(0, keys[i].length - '.logging'.length));
                                }
                            }
                            if (that.logList.length && messages && messages.length) {
                                for (var m = 0; m < messages.length; m++) {
                                    for (var i = 0; i < that.logList.length; i++) {
                                        that.states.pushLog(that.logList[i], messages[m]);
                                    }
                                }
                            }
                        }
                        // clear log buffer
                        messages = null;
                    });
                } else {
                    // disable log buffer
                    messages = null;
                }
            });

            // If some message from logger
            logger.on('logging', function (transport, level, msg, meta) {
                if (transport.name != 'file') return;
                if (!that.logList.length) {
                    // if log buffer still active
                    if (messages) messages.push({message: msg, severity: level, from: that.namespace, ts: (new Date()).getTime()});
                } else {
                    // Send to all adapter, that required logs
                    for (var i = 0; i < that.logList.length; i++) {
                        that.states.pushLog(that.logList[i], {message: msg, severity: level, from: that.namespace, ts: (new Date()).getTime()});
                    }
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
                if (that.states) that.states.setState('system.adapter.' + that.namespace + '.logging', {val: isActive, ack: true, from: 'system.adapter.' + that.namespace});
            };

            that.processLog = function (msg) {
                if (msg) that.emit('log', msg);
                that.states.delLog('system.adapter.' + that.namespace, msg._id);
            };

            that.states.subscribeLog('system.adapter.' + that.namespace);
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
                if (!process.argv || process.argv.indexOf('--force') == -1) {
                    var id = 'system.adapter.' + that.namespace;
                    that.states.setState(id + '.alive', {val: true, ack: true, expire: 30, from: id});
                    that.states.setState(id + '.connected', {val: true, ack: true, expire: 30, from: id}, function () {
                        process.exit(3);
                    });
                    setTimeout(function () {
                        process.exit(3);
                    }, 1000);
                    return;
                }
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

            if (adapterConfig.common.mode == 'subscribe' ||
                adapterConfig.common.mode == 'schedule' ||
                adapterConfig.common.mode == 'once') {
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
                that.states.subscribeMessage('system.adapter.' + that.namespace);
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
        Log.prototype.info  = function (msg) {
            logger.info(that.namespace + ' ' + msg);
        };
        Log.prototype.debug = function (msg) {
            logger.debug(that.namespace + ' ' + msg);
        };
        Log.prototype.error = function (msg) {
            logger.error(that.namespace + ' ' + msg);
        };
        Log.prototype.warn  = function (msg) {
            logger.warn(that.namespace + ' ' + msg);
        };

        that.log = new Log();
        if (options.instance === undefined) {
            that.version = (that.pack && that.pack.version) ? that.pack.version : ((that.ioPack && that.ioPack.common) ? that.ioPack.common.version : 'unknown');

            that.log.info('starting. Version ' + that.version + ' in ' + that.adapterDir);
            reportInterval = setInterval(reportStatus, 15000);
            reportStatus();
        }

        if (typeof options.ready === 'function') options.ready();
        that.emit('ready');
    }

    function reportStatus() {
        var id = 'system.adapter.' + that.namespace;
        that.states.setState(id + '.alive', {val: true, ack: true, expire: 30, from: id});
        if (that.connected) that.states.setState(id + '.connected', {val: true, ack: true, expire: 30, from: id});
        //RSS is the resident set size, the portion of the process's memory held in RAM (as opposed to the swap space or the part held in the filesystem).
        var mem = process.memoryUsage();
        that.states.setState(id + '.memRss', {val: parseFloat((mem.rss / 1048576/* 1MB */).toFixed(2)), ack: true, from: id});
        that.states.setState(id + '.memHeapTotal', {val: parseFloat((mem.heapTotal / 1048576/* 1MB */).toFixed(2)), ack: true, from: id});
        that.states.setState(id + '.memHeapUsed', {val: parseFloat((mem.heapUsed / 1048576/* 1MB */).toFixed(2)), ack: true, from: id});
        // Under windows toFixed returns string ?
        that.states.setState(id + '.uptime', {val: parseInt(process.uptime().toFixed(), 10), ack: true, from: id});
    }

    function stop(isPause) {
        clearInterval(reportInterval);
        var id = 'system.adapter.' + that.namespace;

        if (typeof options.unload === 'function') {
            options.unload(function () {
                if (that.states) {
                    that.states.setState(id + '.alive', {val: false, ack: true, from: id}, function () {
                        if (!isPause) that.log.info('terminating');
                        process.exit(0);
                    });
                }
            });
        } else {
            that.emit('unload', function () {
                if (that.states) {
                    that.states.setState(id + '.alive', {val: false, ack: true, from: id}, function () {
                        if (!isPause) that.log.info('terminating');
                        process.exit(0);
                    });
                }
            });

            // Make delay to let event 'unload' to be processed
            setTimeout(function () {
                if (that.states) {
                    that.states.setState(id + '.alive', {val: false, ack: true, from: id}, function () {
                        if (!isPause) that.log.info('terminating');
                        process.exit(0);
                    });
                }
            }, 500);
        }
    }

    process.once('SIGINT', stop);
    process.once('SIGTERM', stop);
    // And the exit event shuts down the child.
    process.once('exit', stop);

    process.on('uncaughtException', function (err) {
        // catch it on windows
        if (that.getPortRunning && err.message == 'listen EADDRINUSE') {
            logger.warn('Port ' + that.getPortRunning.port + ' is in use. Get next');

            setTimeout(function () {
                that.getPort(that.getPortRunning.port + 1, that.getPortRunning.callback);
            }, 0);
            return;
        }

        logger.error('uncaught exception: ' + (err.message || err));
        if (err.stack) logger.error(err.stack);
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
