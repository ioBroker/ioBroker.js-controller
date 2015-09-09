/* jshint -W097 */// jshint strict:false
/*jslint node: true */
/*jshint -W061 */
"use strict";

var extend   = require('node.extend');
var fs       = require('fs');
var socketio = require('socket.io');
var getDefaultDataDir = require(__dirname + '/../tools').getDefaultDataDir;

var util     = require('util');
var stream   = require('stream');
var Writable = stream.Writable;
var memStore = {};

/* Writable memory stream */
function WMStrm(key, options) {
    // allow use without new operator
    if (!(this instanceof WMStrm)) return new WMStrm(key, options);

    Writable.call(this, options); // init super
    this.key = key; // save key
    memStore[key] = new Buffer(''); // empty
}
util.inherits(WMStrm, Writable);

WMStrm.prototype._write = function (chunk, enc, cb) {
	if (chunk) {
 
		// our memory store stores things in buffers
		var buffer = (Buffer.isBuffer(chunk)) ?
			chunk :  // already is Buffer use it
			new Buffer(chunk, enc);  // string, convert

		// concatinate to the buffer already there
        if (!memStore[this.key]) {
            memStore[this.key] = new Buffer('');
            console.log('memstore for ' + this.key + ' is null');
        }
		memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
	}
    if (!cb) throw 'Callback is empty';
	cb();
};

function ObjectsInMemServer(settings) {
    settings = settings || {};

    var that =        this;
    var objects =     {};
    var fileOptions = {};
    var files =       {};
    var configTimer = null;
    var change;
    var users =       {};
    var groups =      {};
    var writeTimer =  null;
    var writeIds =    [];

    var dataDir = (settings.connection.dataDir || getDefaultDataDir());
    if (dataDir) {
        if (dataDir[0] == '.' && dataDir[1] == '.') {
            dataDir = __dirname + '/../../' + dataDir;
        } else if (dataDir[0] == '.' && dataDir[1] == '/') {
            dataDir = __dirname + '/../../' + dataDir.substring(2);
        }
    }
    dataDir = dataDir.replace(/\\/g, '/');
    if (dataDir[dataDir.length - 1] != '/') dataDir += '/';

    // Create data directory
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

    var objectsName = dataDir + 'objects.json';
    var objectsDir  = dataDir + 'files/';
    var historyName = dataDir + 'history/';

    var regHistory = new RegExp('^history.');

    var log = settings.logger;
    if (!log) {
        log = {
            info:  function (msg) {/*console.log(msg);*/},
            debug: function (msg) {/*console.log(msg);*/},
            warn:  function (msg) {
                console.log(msg);
            },
            error: function (msg) {
                console.log(msg);
            }
        };
    }

    var server = {
        app:       null,
        server:    null,
        io:        null,
        settings:  settings
    };

    var __construct = (function () {
        if (fs.existsSync(objectsName)) {
            try {
                objects = JSON.parse(fs.readFileSync(objectsName).toString());
            } catch (e) {
                log.error('Cannot parse ' + objectsName + ': ' + e);
                if (fs.existsSync(objectsName + '.bak')) {
                    try {
                        objects = JSON.parse(fs.readFileSync(objectsName + '.bak').toString());
                    } catch (e) {
                        log.error('Cannot parse ' + objectsName + '.bak: ' + e);
                        objects = {};
                    }
                } else {
                    objects = {};
                }
            }
        } else if (fs.existsSync(objectsName + '.bak')) {
            try {
                objects = JSON.parse(fs.readFileSync(objectsName + '.bak').toString());
            } catch (e) {
                log.error('Cannot parse ' + objectsName + '.bak: ' + e);
                objects = {};
            }
        } else {
            objects = {};
        }

        // Create history directory
        if (!fs.existsSync(historyName)) fs.mkdirSync(historyName);

        change = settings.change || function (id, obj) {
            log.debug('objects change: ' + id + ' ' + JSON.stringify(change));
        };

        // Check if directory exists
        objectsName = objectsName.replace(/\\/g, '/');
        var parts = objectsName.split('/');
        parts.pop();
        parts = parts.join('/');
        if (!fs.existsSync(parts)) fs.mkdirSync(parts);

        _initWebServer(settings.connection, server);

        if (settings.connected) {
            setTimeout(function () {
                settings.connected('InMemoryDB');
            }, 0);
        }
    })();

    function clone(obj) {
        if (obj === null || obj === undefined || typeof(obj) != 'object')
            return obj;

        var temp = obj.constructor(); // changed

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                temp[key] = clone(obj[key]);
            }
        }
        return temp;
    }

    function pattern2RegEx(pattern) {
        if (pattern != '*') {
            if (pattern[0] == '*' && pattern[pattern.length - 1] != '*') pattern += '$';
            if (pattern[0] != '*' && pattern[pattern.length - 1] == '*') pattern = '^' + pattern;
        }
        pattern = pattern.replace(/\./g, '\\.');
        pattern = pattern.replace(/\*/g, '.*');
        return pattern;
    }

    function saveConfig() {
        if (fs.existsSync(objectsName)) {
            var old = fs.readFileSync(objectsName);
            fs.writeFileSync(objectsName + '.bak', old);
        }
        try {
            fs.writeFileSync(objectsName, JSON.stringify(objects));
        } catch (e) {
            log.error('Cannot save file ' + objectsName + ': ' + e);
        }
        if (configTimer) {
            clearTimeout(configTimer);
            configTimer = null;
        }
    }

    function saveFileSettings(id, force) {
        if (typeof id == 'boolean') {
            force = id;
            id = undefined;
        }

        if (id !== undefined && writeIds.indexOf(id) == -1) writeIds.push(id);

        if (writeTimer) clearTimeout(writeTimer);

        // if store immediately
        if (force) {
            writeTimer = null;
            // Store dirs description
            for (var id = 0; id < writeIds.length; id++) {
                try {
                    fs.writeFileSync(objectsDir + writeIds[id] + '/_data.json', JSON.stringify(fileOptions[writeIds[id]]));
                } catch (e) {
                    log.error('Cannot write files: ' + objectsDir + writeIds[id] + '/_data.json: ' + e.message);
                }
            }
            writeIds = [];
        } else {
            writeTimer = setTimeout(function () {
                // Store dirs description
                for (var id = 0; id < writeIds.length; id++) {
                    try {
                        fs.writeFileSync(objectsDir + writeIds[id] + '/_data.json', JSON.stringify(fileOptions[writeIds[id]]));
                    } catch (e) {
                        log.error('Cannot write files: ' + objectsDir + writeIds[id] + '/_data.json: ' + e.message);
                    }
                }
                writeIds = [];
            }, 1000);
        }
    }
    
    function subscribe(socket, type, pattern, options) {
        socket._subscribe = socket._subscribe || {};
        var s = socket._subscribe[type] = socket._subscribe[type] || [];
        for (var i = 0; i < s.length; i++) {
            if (s[i].pattern == pattern) return;
        }

        s.push({pattern: pattern, regex: new RegExp(pattern2RegEx(pattern)), options: options});
    }

    function unsubscribe(socket, type, pattern) {
        if (!socket._subscribe || !socket._subscribe[type]) return;
        var s = socket._subscribe[type];
        for (var i = 0; i < s.length; i++) {
            if (s[i].pattern == pattern) {
                s.splice(i, 1);
                return;
            }
        }
    }

    function publish(socket, type, id, obj) {
        if (!socket._subscribe || !socket._subscribe[type]) return;
        var s = socket._subscribe[type];
        for (var i = 0; i < s.length; i++) {
            if (s[i].regex.test(id)) {
                socket.emit('message', s[i].pattern, id, obj);
                return;
            }
        }
    }

    function publishAll(type, id, obj) {
        if (id === undefined) {
            console.log('Problem');
        }

        var clients = server.io.sockets.connected;

        for (var i in clients) {
            publish(clients[i], type, id, obj);
        }

        if (change && that._subscribe && that._subscribe[type]) {
            for (var j = 0; j < that._subscribe[type].length; j++) {
                if (that._subscribe[type][j].regex.test(id)) {
                    setTimeout(function () {
                        change(id, obj);
                    }, 0);
                    break;
                }
            }
        }
    }

    function storeHistory(id, obj) {
        var parts = id.split('.');
        var date = parts.pop();
        var file = historyName + date + '/' + parts.join('.') + '.json';

        if (!fs.existsSync(historyName + date)) fs.mkdirSync(historyName + date);

        fs.writeFileSync(file, JSON.stringify(obj.common.data, null, 2));

        delete obj.common.data;
    }

    function today() {
        var dateObj = new Date();

        var text = dateObj.getFullYear().toString();
        var v = dateObj.getMonth() + 1;
        if (v < 10) text += '0';
        text += v.toString();

        v = dateObj.getDate();
        if (v < 10) text += '0';
        text += v.toString();

        return text;
    }

    function loadHistory(id, obj) {
        var parts = id.split('.');
        var date = parts.pop();
        var file = historyName + date + '/' + parts.join('.') + '.json';

        if (fs.existsSync(file)) {
            if (!obj || !obj.common) {
                obj = {
                    type: 'history',
                    common: {
                        source: id,
                        day:    date,
                        data:   []
                    },
                    native: {}
                };
            }

            try {
                obj.common.data = JSON.parse(fs.readFileSync(file));
            } catch (e) {
                log.error('Cannot parse file ' + file + ': ' + e.message);
                obj.common.data = [];
            }
        }
    }

    // Destructor of the class. Called by shutting down.
    this.destroy = function () {
        if (configTimer) saveConfig();

        saveFileSettings(true);

        if (server.io) {
            if (server.io.sockets && server.io.sockets.connected) {
                for (var s in server.io.sockets.connected) {
                    delete server.io.sockets.connected[s];
                }
            }
            try {
                server.io.close();
            } catch (e) {
                console.log(e.message);
            }
        }
    };

    function checkObject(id, options, flag) {
        // read rights of object
        if (!objects[id] || !objects[id].common || !objects[id].acl || flag == 'list') {
            return true;
        }

        if (options.user != 'system.user.admin' &&
            options.groups && options.groups.indexOf('system.group.administrator') == -1) {
            if (objects[id].acl.owner != options.user) {
                // Check if the user is in the group
                if (options.groups.indexOf(objects[id].acl.ownerGroup) != -1) {
                    // Check group rights
                    if (!(objects[id].acl.object & (flag << 4))) {
                        return false
                    }
                } else {
                    // everybody
                    if (!(objects[id].acl.object & flag)) {
                        return false
                    }
                }
            } else {
                // Check group rights
                if (!(objects[id].acl.object & (flag << 8))) {
                    return false
                }
            }
        }
        return true;
    }

    function checkObjectRights(id, options, flag, callback) {
        options = options || {};
        if (!options.user) {
            // Before files converted, lets think: if no options it is admin
            options = {
                user:    'system.user.admin',
                params:  options,
                group:   'system.group.administrator',
                acl: {
                    object: {
                        read: true,
                        write: true,
                        'delete': true,
                        create: true,
                        list: true
                    },
                    file: {
                        read: true,
                        write: true,
                        'delete': true,
                        create: true,
                        list: true
                    },
                    state: {
                        read: true,
                        write: true,
                        'delete': true,
                        create: true,
                        list: true
                    }
                }
            };
        }

        if (options.checked) {
            return callback(null, options);
        }

        if (!options.acl) {
            that.getUserGroup(options.user, function (user, groups, acl) {
                options.acl    = acl || {};
                options.groups = groups;
                options.group  = groups ? groups[0] : null;
                checkObjectRights(id, options, flag, callback);
            });
            return;
        }
        // If user may write
        if (flag == 2 && !options.acl.object.write) {// write
            return callback('permissionError', options);
        }
        // If user may read
        if (flag == 4 && !options.acl.object.read) {// read
            return callback('permissionError', options);
        }

        // If user may delete
        if (flag == 'delete' && !options.acl.object.delete) {// delete
            return callback('permissionError', options);
        }

        // If user may list
        if (flag == 'list' && !options.acl.object.list) {// list
            return callback('permissionError', options);
        }

        if (flag == 'delete') flag = 2; // write

        options.checked = true;

        if (id && !checkObject(id, options, flag)) {
            return callback('permissionError', options);
        }

        return callback(null, options);
    }

    this.getObject = function (id, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(id, options, 0x4/*read*/, function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    return this.getObject(id, options, callback);
                }
            }.bind(this));
            return;
        }

        if (typeof callback === 'function') {
            var obj = clone(objects[id]);
            // Read history from file
            if (regHistory.test(id)) {
                if (!obj) obj = {};
                if (!obj.common || !obj.common.data) loadHistory(id, obj);

                if (obj.common && (!objects[id] || !objects[id].common)) objects[id] = obj;

                // store the history for today in cache
                if (obj.common && obj.common.day) {
                    if (today() == obj.common.day) {
                        objects[id].common.data = obj.common.data;
                    } else if (objects[id].common.data) {
                        delete objects[id].common.data;
                    }
                }
            }

            if (typeof callback === 'function') {
                setTimeout(function () {
                    callback(null, obj);
                }, 0);
            }
        }
    };

    this.getConfigKeys = function (pattern, options, callback, dontModify) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkObjectRights(null, options, 'list', function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    return this.getConfigKeys(pattern, options, callback, dontModify);
                }
            }.bind(this));
            return;
        }

        var r = new RegExp(pattern2RegEx(pattern));
        var result = [];
        for (var id in objects) {
            if (r.test(id) && checkObject(id, options, 'list')) {
                result.push(id);
            }
        }
        result.sort();
        if (typeof callback === 'function') {
            setTimeout(function () {
                callback(null, result);
            }, 0);
        }
    };

    this.getObjects = function (keys, options, callback, dontModify) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkObjectRights(null, options, 0x4/*read*/, function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    return this.getObjects(keys, options, callback, dontModify);
                }
            }.bind(this));
            return;
        }

        if (!keys) {
            if (callback) callback('no keys', null);
            return;
        }
        if (!keys.length) {
            if (callback) callback(null, []);
            return;
        }
        var result = [];
        for (var i = 0; i < keys.length; i++) {
            if (checkObject(keys[i], options, 4/*read*/)) {
                result.push(clone(objects[keys[i]]));
            } else {
                result.push({error: 'permissionError'});
            }
        }
        if (typeof callback === 'function') {
            setTimeout(function () {
                callback(null, result);
            }, 0);
        }
    };

    this.setObject = function (id, obj, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkObjectRights(id, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    return this.setObject(id, obj, options, callback);
                }
            }.bind(this));
            return;
        }

        if (!obj) {
            adapter.log.error('setObject: Argument object is null');
            return callback('obj is null');
        }

        obj._id = id;
        // Write history to file
        if (regHistory.test(id)) storeHistory(id, obj);

        objects[id] = obj;
        publishAll('objects', id, obj);
        if (typeof callback === 'function') {
            setTimeout(function () {
                callback(null, {id: id});
            }, 0);
        }
        if (!configTimer) configTimer = setTimeout(saveConfig, 5000);
    };

    this.delObject = function (id, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(id, options, 'delete', function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    return this.delObject(id, options, callback);
                }
            }.bind(this));
            return;
        }

        if (objects[id]) {
            delete objects[id];
            publishAll('objects', id, null);
            if (typeof callback === 'function') {
                setTimeout(function () {
                    callback(null);
                }, 0);
            }
            if (!configTimer) configTimer = setTimeout(saveConfig, 5000);
        } else {
            if (typeof callback === 'function') {
                setTimeout(function () {
                    callback('Not exists');
                }, 0);
            }
        }
    };

    this.subscribeConfig = function (pattern, options) {
        if (!options || !options.checked) {
            var socket = this;
            checkObjectRights(null, options, 'list', function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    return that.subscribeConfig.call(socket, pattern, options);
                }
            }.bind(this));
            return;
        }

        subscribe(this, 'objects', pattern, options);
    };

    this.unsubscribeConfig = function (pattern) {
        unsubscribe(this, 'objects', pattern);
    };

    this.chownObject = function (pattern, options, callback) {
        options = options || {};
        if (typeof options !== 'object') {
            options = {owner: options};
        }

        if (!options.ownerGroup && options.group) options.ownerGroup = options.group;
        if (!options.owner && options.user)  options.owner = options.user;

        if (!options.owner) {
            log.error('user is not defined');
            if (callback) callback('invalid parameter');
            return;
        }

        if (!options.ownerGroup) {
            // get user group
            this.getUserGroup(options.owner, function (user, groups, permissions) {
                if (!groups || !groups[0]) {
                    options.ownerGroup = 'system.group.administrator';
                } else {
                    options.ownerGroup = groups[0];
                }
                that.chownObject(pattern, options, callback);
            });
            return;
        }

        if (!options.checked) {
            checkObjectRights(null, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    if (!options.acl.object || !options.acl.object.write) {
                        if (callback) callback('permissionError');
                        return;
                    } else {
                        return that.chownObject(pattern, options, callback);
                    }
                }
            });
            return;
        }

        this.getConfigKeys(pattern, options, function (err, keys) {
            if (err) {
                if (callback) callback(err);
                return;
            }
            var list = [];
            for (var k = 0; k < keys.length; k++) {
                if (!checkObject(keys[k], options, 2/*write*/)) continue;
                if (!objects[keys[k]].acl) {
                    objects[keys[k]].acl = {
                        owner:      'system.user.admin',
                        ownerGroup: 'system.group.administrator',
                        object:     0x644 // '0644'
                    };
                    if (objects[keys[k]].type == 'state') {
                        objects[keys[k]].acl.state = 0x644;
                    }
                }
                objects[keys[k]].acl.owner      = options.owner;
                objects[keys[k]].acl.ownerGroup = options.ownerGroup;
                list.push(JSON.parse(JSON.stringify(objects[keys[k]])));
            }
            if (typeof callback =='function') callback(null, list);
            if (!configTimer) configTimer = setTimeout(saveConfig, 5000);
        });
    };

    this.chmodObject = function (pattern, options, callback) {
        options = options || {};

        if (typeof options !== 'object') {
            options = {object: options};
        }

        if (options.mode && !options.object) options.object = options.mode;

        if (options.object === undefined) {
            log.error('mode is not defined');
            if (callback) callback('invalid parameter');
            return;
        } else if (typeof options.mode === 'string') {
            options.mode = parseInt(options.mode, 16);
        }

        if (!options.checked) {
            checkObjectRights(null, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    if (!options.acl.file.write) {
                        if (callback) callback('permissionError');
                        return;
                    } else {
                        return that.chmodObject(pattern, options, callback);
                    }
                }
            });
            return;
        }
        this.getConfigKeys(pattern, options, function (err, keys) {
            if (err) {
                if (callback) callback(err);
                return;
            }
            var list = [];
            for (var k = 0; k < keys.length; k++) {
                if (!checkObject(keys[k], options, 2/*write*/)) continue;
                if (!objects[keys[k]].acl) {
                    objects[keys[k]].acl = {
                        owner:      'system.user.admin',
                        ownerGroup: 'system.group.administrator',
                        object:     0x644 // '0644'
                    };
                    if (objects[keys[k]].type == 'state') {
                        objects[keys[k]].acl.state = 0x644;
                    }
                }
                if (options.object !== undefined) objects[keys[k]].acl.object = options.object;
                if (options.state  !== undefined) objects[keys[k]].acl.state  = options.state;
                list.push(JSON.parse(JSON.stringify(objects[keys[k]])));
            }
            if (typeof callback =='function') callback(null, list);
            if (!configTimer) configTimer = setTimeout(saveConfig, 5000);
        });
    };

    this.destroyDB = function (callback) {
        if (fs.existsSync(objectsName)) fs.unlinkSync(objectsName);
        if (callback) callback();
    };

    function mkpathSync(rootpath, dirpath) {
        // Remove filename
        dirpath = dirpath.split('/');
        dirpath.pop();
        if (!dirpath.length) return;

        for (var i = 0; i < dirpath.length; i++) {
            rootpath += dirpath[i] + '/';
            if (!fs.existsSync(rootpath)) {
                fs.mkdirSync(rootpath);
            }
        }
    }

    /*function prepareRights(options) {
        var fOptions = {};
        options = options || {};
        if (!options.user) {
            options = {
                user: 'system.user.admin',
                params: options
            };
        }

        // acl.owner = user that creates or owns the file
        // acl.group = group, that assigned to file
        // acl.permissions = '0777' - default 1 (execute, 2 write, 4 read
        if (!options.user) {
            fOptions.acl = {
                owner:      'system.user.admin',
                ownerGroup: 'system.group.administrator',
                permissions: 0x644 // '0777'
            };
        } else {
            fOptions.acl = {
                owner: options.user
            };
            fOptions.acl.ownerGroup  = options.group;
            fOptions.acl.permissions = 0x644;
        }
        fOptions.acl.ownerGroup  = fOptions.acl.ownerGroup || 'system.group.administrator';

        return fOptions;
    }*/

    function checkFile(id, name, options, flag) {
        if (typeof fileOptions[id][name].acl != 'object') {
            fileOptions[id][name] = {
                mimeType: fileOptions[id][name],
                acl: {
                    owner:       'system.user.admin',
                    permissions: 0x644,
                    ownerGroup:  'system.group.administrator'
                }
            };
        }

        // Set default owner group
        fileOptions[id][name].acl.ownerGroup = fileOptions[id][name].acl.ownerGroup || 'system.group.administrator';

        if (options.user != 'system.user.admin' &&
            options.groups.indexOf('system.group.administrator') == -1 &&
            fileOptions[id][name].acl) {
            if (fileOptions[id][name].acl.owner != options.user) {
                // Check if the user is in the group
                if (options.groups.indexOf(fileOptions[id][name].acl.ownerGroup) != -1) {
                    // Check group rights
                    if (!(fileOptions[id][name].acl.permissions & (flag << 4))) {
                        return false;
                    }
                } else {
                    // everybody
                    if (!(fileOptions[id][name].acl.permissions & flag)) {
                        return false;
                    }
                }
            } else {
                // Check user rights
                if (!(fileOptions[id][name].acl.permissions & (flag << 8))) {
                    return false;
                }
            }
        }
        return true;
    }

    function checkFileRights(id, name, options, flag, callback) {
        options = options || {};
        if (!options.user) {
            // Before files converted, lets think: if no options it is admin
            options = {
                user:    'system.user.admin',
                params:  options,
                group:   'system.group.administrator'
            };
        }

        if (options.checked) {
            return callback(null, options);
        }

        if (!options.acl) {
            that.getUserGroup(options.user, function (user, groups, acl) {
                options.acl    = acl || {};
                options.groups = groups;
                options.group  = groups ? groups[0] : null;
                checkFileRights(id, name, options, flag, callback);
            });
            return;
        }
        // If user may write
        if (flag == 2 && !options.acl.file.write) {// write
            return callback('permissionError', options);
        }
        // If user may read
        if (flag == 4 && !options.acl.file.read) {// read
            return callback('permissionError', options);
        }

        // read rights of file
        if (!fileOptions[id]) {
            if (fs.existsSync(objectsDir + id + '/_data.json')) {
                try {
                    fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json'));
                } catch (e) {
                    log.error('Cannot parse ' + objectsDir + id + '/_data.json: ' + e);
                }
            } else {
                fileOptions[id] = {};
            }
        }

        options.checked = true;
        if (!name || !fileOptions[id][name]) {
            return callback(null, options);
        }
        if (checkFile(id, name, options,flag)) {
            return callback(null, options);
        } else {
            return callback('permissionError', options);
        }

        /*if (typeof fileOptions[id][name].acl != 'object') {
            fileOptions[id][name] = {
                mimeType: fileOptions[id][name],
                acl: {
                    owner:       'system.user.admin',
                    permissions: 0x644,
                    ownerGroup:  'system.group.administrator'
                }
            };
        }
        // Set default onwer group
        fileOptions[id][name].acl.ownerGroup = fileOptions[id][name].acl.ownerGroup || 'system.group.administrator';

        if (options.user != 'system.user.admin' &&
            options.groups.indexOf('system.group.administrator') == -1 &&
            fileOptions[id][name].acl) {
            if (fileOptions[id][name].acl.owner != options.user) {
                // Check if the user is in the group
                if (options.groups.indexOf(fileOptions[id][name].acl.ownerGroup) != -1) {
                    // Check group rights
                    if (!(fileOptions[id][name].acl.permissions & (flag << 4))) {
                        return callback('permissionError', options);
                    }
                } else {
                    // everybody
                    if (!(fileOptions[id][name].acl.permissions & flag)) {
                        return callback('permissionError', options);
                    }
                }
            } else {
                // Check user rights
                if (!(fileOptions[id][name].acl.permissions & (flag << 8))) {
                    return callback('permissionError', options);
                }
            }
        }
        return callback(null, options);*/
    }

    this.getMimeType = function (ext) {
        var _mimeType = 'text/javascript';
        var isBinary  = false;

        if (ext == '.css') {
            _mimeType = 'text/css';
        } else if (ext == '.bmp') {
            _mimeType = 'image/bmp';
            isBinary = true;
        } else if (ext == '.png') {
            isBinary = true;
            _mimeType = 'image/png';
        } else if (ext == '.jpg') {
            isBinary = true;
            _mimeType = 'image/jpeg';
        } else if (ext == '.jpeg') {
            isBinary = true;
            _mimeType = 'image/jpeg';
        } else if (ext == '.gif') {
            isBinary = true;
            _mimeType = 'image/gif';
        } else if (ext == '.tif') {
            isBinary = true;
            _mimeType = 'image/tiff';
        } else if (ext == '.js') {
            _mimeType = 'application/javascript';
        } else if (ext == '.html') {
            _mimeType = 'text/html';
        } else if (ext == '.htm') {
            _mimeType = 'text/html';
        } else if (ext == '.json') {
            _mimeType = 'application/json';
        } else if (ext == '.xml') {
            _mimeType = 'text/xml';
        } else if (ext == '.svg') {
            _mimeType = 'image/svg+xml';
        } else if (ext == '.eot') {
            isBinary = true;
            _mimeType = 'application/vnd.ms-fontobject';
        } else if (ext == '.ttf') {
            isBinary = true;
            _mimeType = 'application/font-sfnt';
        } else if (ext == '.woff') {
            isBinary = true;
            _mimeType = 'application/font-woff';
        } else if (ext == '.wav') {
            isBinary = true;
            _mimeType = 'audio/wav';
        } else if (ext == '.mp3') {
            isBinary = true;
            _mimeType = 'audio/mpeg3';
        } else if (ext == '.avi') {
            isBinary = true;
            _mimeType = 'video/avi';
        } else if (ext == '.mp4') {
            isBinary = true;
            _mimeType = 'video/mp4';
        } else if (ext == '.mkv') {
            isBinary = true;
            _mimeType = 'video/mkv';
        } else if (ext == '.ogg') {
            isBinary = true;
            _mimeType = 'audio/ogg';
        } else {
            _mimeType = 'text/javascript';
        }

        return {mimeType: _mimeType, isBinary: isBinary};
    };

    this.writeFile = function (id, name, data, options, callback) {
        if (typeof options == 'string') {
            options = {mimeType: options};
        }

        if (name[0] == '/') name = name.substring(1);

        try {
            if (!fileOptions[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')) {
                    try {
                        fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json'));
                    } catch (e) {
                        log.error('Cannot parse ' + objectsDir + id + '/_data.json: ' + e);
                    }
                } else {
                    fileOptions[id] = {};
                }
            }

            files[id] = files[id] || {};

            // If file yet exists => check the permissions
            if (!options || !options.checked) {
                return checkFileRights(id, name, options, 0x2/*write*/, function (err, options) {
                    if (err) {
                        return callback(err);
                    } else {
                        return that.writeFile(id, name, data, options, callback);
                    }
                });
            }

            try {
                if (!fs.existsSync(objectsDir))      fs.mkdirSync(objectsDir);
                if (!fs.existsSync(objectsDir + id)) fs.mkdirSync(objectsDir + id);
            } catch (e) {
                log.error('Cannot create directories: ' + objectsDir + id + ': ' + e.message);
                log.error('Check the permissions! Or call "sudo chmod 777 * -R" in iobroker dir');
                if (typeof callback == 'function') callback(e.message);
                return;
            }

            var isBinary = false;
            var ext = name.match(/\.[^.]+$/);
            var mime = that.getMimeType(ext);
            var _mimeType = mime.mimeType;
            isBinary = mime.isBinary;

            if (!fileOptions[id][name]) {
                fileOptions[id][name] = {createdAt: (new Date()).getTime()};
            }
            if (!fileOptions[id][name].acl) {
                fileOptions[id][name].acl = {
                    owner:       options.user  || 'system.user.admin',
                    ownerGroup:  options.group || 'system.group.administrator',
                    permissions: options.mode  || 0x644
                };
            }

            fileOptions[id][name].mimeType       = options.mimeType || _mimeType;
            fileOptions[id][name].binary         = isBinary;
            fileOptions[id][name].acl.ownerGroup = fileOptions[id][name].acl.ownerGroup || 'system.group.administrator';
            fileOptions[id][name].modifiedAt     = (new Date()).getTime();

            if (isBinary) {
                // Reload by read
                delete files[id][name];
            } else {
                files[id][name] = data;
            }

            try {
                // Create directories if complex structure
                mkpathSync(objectsDir + id + '/', name);
                // Store file
                fs.writeFileSync(objectsDir + id + '/' + name, data, {'flags': 'w', 'encoding': isBinary ? 'binary' : 'utf8'});
                // Store dir description
                saveFileSettings(id);
            } catch (e) {
                log.error('Cannot write files: ' + objectsDir + id + '/' + name + ': ' + e.message);
                if (typeof callback == 'function') callback(e.message);
                return;
            }
            if (typeof callback == 'function') callback();
        } catch (e) {
            if (typeof callback == 'function') callback(e.message);
        }
    };

    this.insert = function (id, attName, ignore, options, obj, callback) {
        if (typeof options == 'string') {
            options = {mimeType: options};
        }

        //return pipe for write into redis
        var strm = new WMStrm(id + '/' + attName);
        strm.on('finish', function () {
			if (!memStore[id + '/' + attName]) log.error('File ' + id + ' / ' +  attName + ' is empty');
            that.writeFile(id, attName, memStore[id + '/' + attName] || '', options, function () {
                if (memStore[id + '/' + attName] !== undefined) delete memStore[id + '/' + attName];
                if (callback) {
                    setTimeout(callback, 0, null, null);
                }
            });
        });
        return strm;
    };

    var defaultAcl = {
        groups: [],
        acl: {
            file: {
                list:     false,
                read:     false,
                write:    false,
                create:   false,
                'delete': false
            },
            object: {
                list:     false,
                read:     false,
                write:    false,
                'delete': false
            }
        }
    };

    this.getUserGroup = function (user, callback) {
        if (!user || typeof user != 'string' || !user.match(/^system\.user\./)) {
            console.log('invalid user name: ' + user);
            user = JSON.stringify(user);
            return callback.call(that, user, [], JSON.parse(JSON.stringify(defaultAcl.acl)));
        }
        if (users[user]) {
            return callback.call(that, user, users[user].groups, users[user].acl);
        }

        // Read all groups
        this.getObjectList({startkey: 'system.group.', endkey: 'system.group.\u9999'}, {checked: true}, function (err, arr) {
            groups = [];
            // Read all groups
            for (var g = 0; g < arr.rows.length; g++) {
                groups[g] = arr.rows[g].value;
                if (groups[g]._id == 'system.group.administrator') {
                    groups[g].common.acl = {
                        file: {
                            list:     true,
                            read:     true,
                            write:    true,
                            create:   true,
                            'delete': true
                        },
                        object: {
                            list:     true,
                            read:     true,
                            write:    true,
                            create:   true,
                            'delete': true
                        }
                    };
                }
            }

            that.getObjectList({startkey: 'system.user.', endkey: 'system.user.\u9999'}, {checked: true}, function (err, arr) {
                users = {};

                for (var i = 0; i < arr.rows.length; i++) {
                    users[arr.rows[i].value._id] = JSON.parse(JSON.stringify(defaultAcl));
                    if (arr.rows[i].value._id == 'system.user.admin') {
                        users['system.user.admin'].acl.file = {
                            list:     true,
                            read:     true,
                            write:    true,
                            create:   true,
                            'delete': true
                        };
                        users['system.user.admin'].acl.object = {
                            list:     true,
                            read:     true,
                            write:    true,
                            'delete': true
                        };
                    }
                }

                for (var g = 0; g < groups.length; g++) {
                    if (!groups[g].common.members) continue;
                    for (var m = 0; m < groups[g].common.members.length; m++) {
                        var u = groups[g].common.members[m];
                        users[u].groups.push(groups[g]._id);

                        if (groups[g].common.acl && groups[g].common.acl.file) {
                            users[u].acl.file.create    = users[u].acl.file.create    || groups[g].common.acl.file.create;
                            users[u].acl.file.read      = users[u].acl.file.read      || groups[g].common.acl.file.read;
                            users[u].acl.file.write     = users[u].acl.file.write     || groups[g].common.acl.file.write;
                            users[u].acl.file['delete'] = users[u].acl.file['delete'] || groups[g].common.acl.file['delete'];
                            users[u].acl.file.list      = users[u].acl.file.list      || groups[g].common.acl.file.list;
                        }

                        if (groups[g].common.acl && groups[g].common.acl.object) {
                            users[u].acl.object.read      = users[u].acl.object.read      || groups[g].common.acl.object.read;
                            users[u].acl.object.write     = users[u].acl.object.write     || groups[g].common.acl.object.write;
                            users[u].acl.object['delete'] = users[u].acl.object['delete'] || groups[g].common.acl.object['delete'];
                            users[u].acl.object.list      = users[u].acl.object.list      || groups[g].common.acl.object.list;
                        }
                    }
                }

                callback.call(that, user, users[user] ? users[user].groups : [], users[user] ? users[user].acl : JSON.parse(JSON.stringify(defaultAcl.acl)));
            });
        });
    }

    this.readFile = function (id, name, options, callback) {
        if (name[0] == '/') name = name.substring(1);

        if (!options || !options.checked) {
            checkFileRights(id, name, options, 0x4/*read*/, function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    return that.readFile(id, name, options, callback);
                }
            });
            return;
        }

        if (name.match(/vis-user\.css/)) {
            console.log(name);
        }

        try {
            if (!fileOptions[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')) {
                    try {
                        fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json', 'binary'));
                    } catch (e) {
                        log.error('Cannot parse ' + objectsDir + id + '/_data.json: ' + e);
                    }
                } else {
                    fileOptions[id] = {};
                }
            }

            if (!files[id]) files[id] = {};

            if (!files[id][name] || settings.connection.noFileCache) {
                if (fs.existsSync(objectsDir + id + '/' + name)) {
                    // Create description object if not exists
                    if (!fileOptions[id][name]) {
                        fileOptions[id][name] = {
                            acl: {
                                owner:       'system.user.admin',
                                ownerGroup:  'system.group.administrator',
                                permissions: 0x777 // '0777'
                            }
                        };
                    }
                    if (typeof fileOptions[id][name] != 'object') {
                        fileOptions[id][name] = {
                            mimeType:    fileOptions[id][name],
                            acl: {
                                owner:       'system.user.admin',
                                ownerGroup:  'system.group.administrator',
                                permissions: 0x777 // '0777'
                            }
                        };
                    }


                    files[id][name] = fs.readFileSync(objectsDir + id + '/' + name);
                    if (fileOptions[id][name].binary === undefined) {
                        var pos = name.lastIndexOf('.');
                        var ext = '';
                        if (pos != -1) ext = name.substring(pos);
                        var mimeType = that.getMimeType(ext);
                        fileOptions[id][name].binary   = mimeType.isBinary;
                        fileOptions[id][name].mimeType = mimeType.mimeType;
                    }

                    if (!fileOptions[id][name].binary) {
                        if (files[id][name]) files[id][name] = files[id][name].toString();
                    }
                } else {
                    if (fileOptions[id][name] !== undefined) delete fileOptions[id][name];
                    if (files[id][name]       !== undefined) delete files[id][name];
                }
            }

            if (fileOptions[id][name] && !fileOptions[id][name].acl) {
                // all files belongs to admin by default, but everyone can edit it
                fileOptions[id][name].acl = {
                    owner:      'system.user.admin',
                    ownerGroup: 'system.group.administrator',
                    permissions: 0x777 // '0777'
                }
            }

            if (typeof callback == 'function') {
                if (fileOptions[id][name] !== null && fileOptions[id][name] !== undefined) {
                    var mimeType = that.getMimeType(ext);
                    if (!fileOptions[id][name].mimeType) {
                        var pos = name.lastIndexOf('.');
                        var ext = '';
                        if (pos != -1) ext = name.substring(pos);
                        var mimeType = that.getMimeType(ext);
                        fileOptions[id][name].mimeType = mimeType.mimeType;
                    }

                    callback(null, files[id][name], fileOptions[id][name].mimeType);
                } else {
                    callback('Not exists');
                }
            }
        } catch (e) {
            if (typeof callback == 'function') {
                callback(e.message);
            }
        }
    };

    this.readDir = function (id, name, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkFileRights(id, name, options, 0x4/*read*/, function (err, options) {
                if (err) {
                    if (callback) callback(err)
                    return;
                } else {
                    if (!options.acl.file.list) {
                        if (callback) callback('permissionError');
                        return;
                    } else {
                        return that.readDir(id, name, options, callback);
                    }
                }
            });
            return;
        }
        if (!fileOptions[id]) {
            if (fs.existsSync(objectsDir + id + '/_data.json')) {
                try {
                    fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json', 'binary'));
                } catch (e) {
                    log.error('Cannot parse ' + objectsDir + id + '/_data.json: ' + e);
                }
            } else {
                fileOptions[id] = {};
            }
        }
        // Find all files and directories starts with name
        var files = [];
        if (name[0] == '/') name = name.substring(1);

        if (name && name[name.length - 1] != '/') name += '/';
        var len = (name) ? name.length : 0;
        for (var f in fileOptions[id]) {
            if (!name || f.substring(0, len) == name) {
                var rest = f.substring(len);
                rest = rest.split('/', 2);
                if (rest[0] && files.indexOf(rest[0]) == -1) {
                    files.push(rest[0]);
                }
            }
        }

        if (fs.existsSync(objectsDir + id + '/' + name)) {
            var dirFiles = fs.readdirSync(objectsDir + id + '/' + name);
            for (var i = 0; i < dirFiles.length; i++) {
                if (dirFiles[i] == '..' || dirFiles[i] == '.') continue;
                if (dirFiles[i] != '_data.json' && files.indexOf(dirFiles[i]) == -1) {
                    files.push(dirFiles[i]);
                }
            }
        }

        files.sort();
        var res = [];
        for (var j = 0; j < files.length; j++) {
            if (files[j] == '..' || files[j] == '.') continue;
            if (fs.existsSync(objectsDir + id + '/' + name + files[j])) {
                var stats = fs.statSync(objectsDir + id + '/' + name + files[j]);
                var acl = (fileOptions[id][name + files[j]] && fileOptions[id][name + files[j]].acl) ?
                    JSON.parse(JSON.stringify(fileOptions[id][name + files[j]].acl)) : // copy settings
                   {
                       read:        true,
                       write :      true,
                       permissions: 0x644,
                       owner:       'system.user.admin',
                       groupOwner:  'system.group.administrator'
                   };

                try {
                    // if filter for user
                    if (options.filter && acl) {
                        // If user may not write
                        if (!options.acl.file.write) {// write
                            acl.permissions &= ~0x222;
                        }
                        // If user may not read
                        if (!options.acl.file.read) {// read
                            acl.permissions &= ~0x444;
                        }

                        if (options.user != 'system.user.admin' && options.groups.indexOf('system.group.administrator') == -1) {
                            if (acl.owner != options.user) {
                                // Check if the user is in the group
                                if (options.groups.indexOf(acl.ownerGroup) != -1) {
                                    // Check group rights
                                    if (!(acl.permissions & (0x6 << 4))) {
                                        continue;
                                    }
                                    acl.read  = (acl.permissions & 0x40) ? true : false;
                                    acl.write = (acl.permissions & 0x20) ? true : false;
                                } else {
                                    // everybody
                                    if (!(acl.permissions & 0x6)) {
                                        continue;
                                    }
                                    acl.read  = (acl.permissions & 0x4) ? true : false;
                                    acl.write = (acl.permissions & 0x2) ? true : false;
                                }
                            } else {
                                // Check user rights
                                if (!(acl.permissions & (0x6 << 8))) {
                                    continue;
                                }
                                acl.read  = (acl.permissions & 0x400) ? true : false;
                                acl.write = (acl.permissions & 0x200) ? true : false;
                            }
                        } else {
                            acl.read  = true;
                            acl.write = true;
                        }
                    }
                } catch (e) {
                    log.error('Cannot read permssions of  ' + objectsDir + id + '/' + name + files[j] + ': ' + e);
                }


                res.push({
                    file:       files[j],
                    stats:      stats,
                    isDir:      stats.isDirectory(),
                    acl:        acl,
                    modifiedAt: fileOptions[id][name + files[j]] ? fileOptions[id][name + files[j]].modifiedAt : undefined,
                    createdAt:  fileOptions[id][name + files[j]] ? fileOptions[id][name + files[j]].createdAt : undefined
                });
            }
        }

        if (typeof callback == 'function') {
            setTimeout(function () {
                callback(null, res);
            }, 0);
        }
    };

    this.unlink = function (id, name, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options  = null;
        }

        if (name[0] == '/') name = name.substring(1);

        if (!options || !options.checked) {
            checkFileRights(id, name, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (callback) callback(err)
                    return;
                } else {
                    if (!options.acl.file['delete']) {
                        if (callback) callback('permissionError');
                        return;
                    } else {
                        return that.unlink(id, name, options, callback);
                    }
                }
            });
            return;

        }
        try {
            var changed = false;
            if (!fileOptions[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')) {
                    fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json'));
                } else {
                    fileOptions[id] = {};
                }
            }
            if (fileOptions[id][name]) {
                changed = true;
                delete fileOptions[id][name];
            }
            if (files[id] && files[id][name]) {
                delete files[id][name];
            }
            if (fs.existsSync(objectsDir + id + '/' + name)) {
                var stat = fs.statSync(objectsDir + id + '/' + name);

                if (stat.isDirectory()) {
                    // TODO recursive deletion
                    fs.rmdirSync(objectsDir + id + '/' + name);
                } else {
                    fs.unlinkSync(objectsDir + id + '/' + name);
                }
                if (typeof callback == 'function') callback();
            } else {
                if (typeof callback == 'function') callback('Not exists');
            }
            // Store dir description
            if (changed) saveFileSettings(id);
        } catch (e) {
            if (typeof callback == 'function') callback(e.message);
        }
    };

    this.rename = function (id, oldName, newName, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (oldName[0] == '/') oldName = oldName.substring(1);
        if (newName[0] == '/') newName = newName.substring(1);

        if (!options || !options.checked) {
            checkFileRights(id, oldName, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (callback) callback(err)
                    return;
                } else {
                    if (!options.acl.file.write) {
                        if (callback) callback('permissionError');
                        return;
                    } else {
                        return that.rename(id, oldName, newName, options, callback);
                    }
                }
            });
            return;
        }
        try {
            if (!fileOptions[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')) {
                    fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json'));
                } else {
                    fileOptions[id] = {};
                }
            }
            if (fileOptions[id][oldName]) {
                var type = fileOptions[id][oldName];
                delete fileOptions[id][oldName];
                fileOptions[id][newName] = type;
                fs.writeFileSync(objectsDir + id + '/_data.json', JSON.stringify(fileOptions[id]));
            }
            if (files[id] && files[id][oldName]) {
                var data = files[id][oldName];
                delete files[id][oldName];
                files[id][newName] = data;
            }
            if (fs.existsSync(objectsDir + id + '/' + oldName)) {
                fs.renameSync(objectsDir + id + '/' + oldName, objectsDir + id + '/' + newName);
                if (typeof callback == 'function') callback();
            } else {
                if (typeof callback == 'function') callback('Not exists');
            }
        } catch (e) {
            if (typeof callback == 'function') callback(e.message);
        }
    };

    this.touch = function (id, name, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkFileRights(id, null, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (callback) callback(err)
                    return;
                } else {
                    return that.touch(id, name, options, callback);
                }
            });
            return;
        }
        try {
            if (!fileOptions[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')) {
                    fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json'));
                } else {
                    fileOptions[id] = {};
                }
            }

            var regEx = new RegExp(pattern2RegEx(name));
            var processed = [];
            var now = (new Date()).getTime();
            var changed = false;
            for (var f in fileOptions[id]) {
                if (regEx.test(f) && checkFile(id, f, options, 2/*write*/)) {
                    changed = true;
                    // Check if file exists
                    if (fs.existsSync(objectsDir + id + '/' + f)) {
                        if (!fileOptions[id][f]) {
                            fileOptions[id][f] = {};
                            fileOptions[id][f].createdAt = now;
                        }
                        
                        if (typeof fileOptions[id][f] != 'object') {
                            fileOptions[id][f] = {
                                mimeType: fileOptions[id][f]
                            };
                        }

                        if (!fileOptions[id][f].mimeType) {
                            var pos = f.lastIndexOf('.');
                            var ext = '';
                            if (pos != -1) ext = f.substring(pos);
                            var mimeType = that.getMimeType(ext);
                            fileOptions[id][f].binary   = mimeType.isBinary;
                            fileOptions[id][f].mimeType = mimeType.mimeType;
                        }

                        if (!fileOptions[id][f].acl) {
                            fileOptions[id][f].acl = {
                                owner:      'system.user.admin',
                                ownerGroup: 'system.group.administrator',
                                permissions: 0x644 // '0644'
                            }
                        }
                        fileOptions[id][f].modifiedAt = now;

                        var stats = fs.statSync(objectsDir + id + '/' + f);
                        var acl = fileOptions[id][f];
                        var parts = f.split('/');
                        var fileName = parts.pop();
                        processed.push({
                            path:       parts.join('/'), 
                            file:       fileName, 
                            stats:      stats, 
                            isDir:      stats.isDirectory(), 
                            acl:        fileOptions[id][f].acl || {}, 
                            modifiedAt: fileOptions[id][f].modifiedAt,
                            createdAt:  fileOptions[id][f].createdAt
                        });
                    } else {
                        delete fileOptions[id][f];
                    }
                }
            }

            // Store dir description
            if (changed) fs.writeFileSync(objectsDir + id + '/_data.json', JSON.stringify(fileOptions[id]));

            if (typeof callback == 'function') callback(null, processed);
        } catch (e) {
            if (typeof callback == 'function') callback(e.message);
        }
    };

    this.rm = function (id, name, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkFileRights(id, null, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (callback) callback(err)
                    return;
                } else {
                    if (!options.acl.file['delete']) {
                        if (callback) callback('permissionError');
                        return;
                    } else {
                        return that.rm(id, name, options, callback);
                    }
                }
            });
            return;
        }
        try {
            if (!fileOptions[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')) {
                    fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json'));
                } else {
                    fileOptions[id] = {};
                }
            }

            var regEx = new RegExp(pattern2RegEx(name));
            var processed = [];
            var changed = false;
            var dirs = [];
            for (var f in fileOptions[id]) {
                if (regEx.test(f) && checkFile(id, f, options, 2/*write*/)) {
                    var stat;
                    if (fileOptions[id][f]) {
                        changed = true;
                        delete fileOptions[id][f];
                    }
                    if (files && files[id] && files[id][f]) {
                        delete files[id][f];
                    }
                    if (fs.existsSync(objectsDir + id + '/' + f)) {
                        stat = fs.statSync(objectsDir + id + '/' + f);

                        if (stat.isDirectory()) {
                            if (dirs.indexOf(f) == -1) dirs.push(f);
                        } else {
                            fs.unlinkSync(objectsDir + id + '/' + f);
                        }
                    }
                    var parts = f.split('/');
                    var fileName = parts.pop();
                    var path = parts.join('/');
                    if (dirs.indexOf(path) == -1) dirs.push(path);
                    processed.push({
                        path:       path,
                        file:       fileName,
                        isDir:      stat && stat.isDirectory()
                    });
                }
            }

            // try to delete directories
            for (var d = 0; d < dirs.length; d++) {
                try {
                    var files = fs.readdirSync(objectsDir + id + '/' + dirs[d]);

                    if (files.length) {
                        console.log('Directory ' + id + '/' + dirs[d] + ' is not empty');
                    } else {
                        fs.rmdirSync(objectsDir + id + '/' + dirs[d]);
                    }
                } catch (e) {
                    console.error('Cannot delete ' + id + '/' + dirs[d] + ': ' + e);
                }
            }

            // Store dir description
            if (changed) fs.writeFileSync(objectsDir + id + '/_data.json', JSON.stringify(fileOptions[id]));

            if (typeof callback == 'function') callback(null, processed);
        } catch (e) {
            if (typeof callback == 'function') callback(e.message);
        }
    };

    this.mkdir = function (id, dirname, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (dirname[0] == '/') dirname = dirname.substring(1);

        if (!options || !options.checked) {
            checkFileRights(id, dirname, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (callback) callback(err)
                    return;
                } else {
                    if (!options.acl.file.write) {
                        if (callback) callback('permissionError');
                        return;
                    } else {
                        return that.mkdir(id, dirname, options, callback);
                    }
                }
            });
            return;
        }
        try {
            if (!fileOptions[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')) {
                    fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json'));
                } else {
                    fileOptions[id] = {};
                }
            }
            if (!fs.existsSync(objectsDir + id + '/' + dirname)) {
                fs.mkdirSync(objectsDir + id + '/' + dirname);
                if (typeof callback == 'function') callback();
            } else {
                if (typeof callback == 'function') callback('Yet exists');
            }
        } catch (e) {
            if (typeof callback == 'function') callback(e.message);
        }
    };

    this.chownFile = function (id, name, options, callback) {
        options = options || {};
        if (typeof options !== 'object') {
            options = {owner: options};
        }

        if (name[0] == '/') name = name.substring(1);

        if (!options.ownerGroup && options.group) options.ownerGroup = options.group;
        if (!options.owner && options.user)  options.owner = options.user;

        if (!options.owner) {
            log.error('user is not defined');
            if (callback) callback('invalid parameter');
            return;
        }

        if (!options.ownerGroup) {
            // get user group
            this.getUserGroup(options.owner, function (user, groups, permissions) {
                if (!groups || !groups[0]) {
                    options.ownerGroup = 'system.group.administrator';
                } else {
                    options.ownerGroup = groups[0];
                }
                that.chownFile(id, name, options, callback);
            });
            return;
        }

        if (!options.checked) {
            checkFileRights(id, null, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    if (!options.acl.file.write) {
                        if (callback) callback('permissionError');
                        return;
                    } else {
                        return that.chownFile(id, name, options, callback);
                    }
                }
            });
            return;
        }

        try {
            if (!fileOptions[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')) {
                    try {
                        fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json', 'binary'));
                    } catch (e) {
                        log.error('Cannot parse ' + objectsDir + id + '/_data.json: ' + e);
                    }
                } else {
                    fileOptions[id] = {};
                }
            }

            var regEx = new RegExp(pattern2RegEx(name));
            var processed = [];
            var changed = false;
            for (var f in fileOptions[id]) {
                if (regEx.test(f) && checkFile(id, f, options, 2/*write*/)) {
                    changed = true;
                    if (typeof fileOptions[id][f] != 'object') {
                        fileOptions[id][f] = {
                            mimeType: fileOptions[id][f]
                        };
                    }

                    if (!fileOptions[id][f].acl) {
                        fileOptions[id][f].acl = {
                            owner:       'system.user.admin',
                            ownerGroup:  'system.group.administrator',
                            permissions: 0x644 // '0644'
                        }
                    }

                    fileOptions[id][f].acl.owner      = options.owner;
                    fileOptions[id][f].acl.ownerGroup = options.ownerGroup;

                    if (fs.existsSync(objectsDir + id + '/' + f)) {
                        var stats = fs.statSync(objectsDir + id + '/' + f);
                        var acl = fileOptions[id][f];
                        var parts = f.split('/');
                        var fileName = parts.pop();
                        processed.push({
                            path:       parts.join('/'), 
                            file:       fileName, 
                            stats:      stats, 
                            isDir:      stats.isDirectory(), 
                            acl:        acl.acl || {},
                            modifiedAt: fileOptions[id][f].modifiedAt,
                            createdAt:  fileOptions[id][f].createdAt
                        });
                    }
                }
            }

            // Store dir description
            if (changed) fs.writeFileSync(objectsDir + id + '/_data.json', JSON.stringify(fileOptions[id]));
            if (typeof callback == 'function') {
                setTimeout(function () {
                    callback(null, processed, id);
                }, 0);
            }
        } catch (e) {
            if (typeof callback == 'function') {
                setTimeout(function () {
                    callback(e.message);
                }, 0);
            }
        }
    };

    this.chmodFile = function (id, name, options, callback) {
        options = options || {};

        if (name[0] == '/') name = name.substring(1);

        if (typeof options !== 'object') {
            options = {mode: options};
        }

        if (options.mode === undefined) {
            log.error('mode is not defined');
            if (callback) callback('invalid parameter');
            return;
        } else if (typeof options.mode === 'string') {
            options.mode = parseInt(options.mode, 16);
        }

        if (!options.checked) {
            checkFileRights(id, null, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    if (!options.acl.file.write) {
                        if (callback) callback('permissionError');
                        return;
                    } else {
                        return that.chmodFile(id, name, options, callback);
                    }
                }
            });
            return;
        }

        try {
            if (!fileOptions[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')) {
                    try {
                        fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json', 'binary'));
                    } catch (e) {
                        log.error('Cannot parse ' + objectsDir + id + '/_data.json: ' + e);
                    }
                } else {
                    fileOptions[id] = {};
                }
            }

            var regEx = new RegExp(pattern2RegEx(name));
            var processed = [];
            var changed = false;
            for (var f in fileOptions[id]) {
                if (regEx.test(f) && checkFile(id, f, options, 2/*write*/)) {
                    changed = true;
                    if (typeof fileOptions[id][f] != 'object') {
                        fileOptions[id][f] = {
                            mimeType: fileOptions[id][f]
                        };
                    }

                    if (!fileOptions[id][f].acl) {
                        fileOptions[id][f].acl = {
                            owner:       'system.user.admin',
                            ownerGroup:  'system.group.administrator',
                            permissions: 0x644 // '0644'
                        }
                    }

                    fileOptions[id][f].acl.permissions = options.mode;
                    if (fs.existsSync(objectsDir + id + '/' + f)) {
                        var stats = fs.statSync(objectsDir + id + '/' + f);
                        var acl = fileOptions[id][f];
                        var parts = f.split('/');
                        var fileName = parts.pop();
                        processed.push({
                            path:       parts.join('/'), 
                            file:       fileName, 
                            stats:      stats, 
                            isDir:      stats.isDirectory(), 
                            acl:        acl.acl || {},
                            modifiedAt: acl.modifiedAt,
                            createdAt:  acl.createdAt
                        });
                    }
                }
            }

            // Store dir description
            if (changed) fs.writeFileSync(objectsDir + id + '/_data.json', JSON.stringify(fileOptions[id]));
            if (typeof callback == 'function') {
                setTimeout(function () {
                    callback(null, processed, id);
                }, 0);
            }
        } catch (e) {
            if (typeof callback == 'function') {
                setTimeout(function () {
                    callback(e.message);
                }, 0);
            }
        }
    };

    this.subscribe   = this.subscribeConfig;
    this.unsubscribe = this.unsubscribeConfig;

    this._applyView = function (func, params, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(null, options, 'list', function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    return this._applyView(func, params, options, callback);
                }
            }.bind(this));
            return;
        }

        var result = {
            rows: []
        };

        function _emit_(id, obj) {
            result.rows.push({id: id, value: obj});
        }

        var f = eval('(' + func.map.replace(/emit/g, '_emit_') + ')');

        for (var id in objects) {
            if (params) {
                if (params.startkey && id < params.startkey) continue;
                if (params.endkey   && id > params.endkey)   continue;
            }
            if (objects[id]) {
                try {
                    f(objects[id]);
                } catch (e) {
                    console.log("Cannot execute map: " + e.message);

                }
            }
        }
        // Calculate max
        if (func.reduce == '_stats') {
            var max = null;
            for (var i = 0; i < result.rows.length; i++) {
                if (max === null || result.rows[i].value > max) {
                    max = result.rows[i].value;
                }
            }
            if (max !== null) {
                result.rows = [{id: '_stats', value: {max: max}}];
            } else {
                result.rows = [];
            }
        }

        if (callback) callback(null, result);
    };

    this.getObjectView = function (design, search, params, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(null, options, 'list', function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    return this.getObjectView(design, search, params, options, callback);
                }
            }.bind(this));
            return;
        }

        if (objects['_design/' + design] && objects['_design/' + design].views) {
            if (objects['_design/' + design].views[search]) {
                that._applyView(objects['_design/' + design].views[search], params, options, callback);
            } else {
                console.log('Cannot find view "' + design + '"');
                if (typeof callback == 'function') callback({status_code: 404, status_text: 'Cannot find view "' + design + '"'});
            }
        } else {
            console.log('Cannot find view "' + design + '"');
            if (typeof callback == 'function') callback({status_code: 404, status_text: 'Cannot find view "' + design + '"'});
        }
    };

    this.getObjectList = function (params, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(null, options, 'list', function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    return this.getObjectList(params, options, callback);
                }
            }.bind(this));
            return;
        }
        // return rows with id and doc
        var result = {
            rows: []
        };

        for (var id in objects) {
            if (!checkObject(id, options, 'read')) continue;
            if (params) {
                if (params.startkey && id < params.startkey) continue;
                if (params.endkey   && id > params.endkey)   continue;
                if (!params.include_docs && id[0] == '_')    continue;
            }
            var obj = {id: id, value: clone(objects[id])};
            obj.doc = obj.value;

            if (options.sorted) {
                // insert sorted
                if (!result.rows.length) {
                    result.rows.push(obj);
                } else if (obj.id <= result.rows[0].id) {
                    result.rows.unshift(obj);
                } else if (obj.id >= result.rows[result.rows.length - 1].id) {
                    result.rows.push(obj);
                } else {
                    for (var t = 1; t < result.rows.length; t++) {
                        if (obj.id > result.rows[t - 1].id && obj.id <= result.rows[t].id) {
                            result.rows.splice(t, 0, obj);
                            break;
                        }
                    }
                }
            } else {
                result.rows.push(obj);
            }
        }
        if (callback) callback(null, result);
    };

    this.extendObject = function (id, obj, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(id, options, 2/*write*/, function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    return this.extendObject(id, obj, options, callback);
                }
            }.bind(this));
            return;
        }

        objects[id] = objects[id] || {};
        objects[id] = extend(true, objects[id], obj);
        objects[id]._id = id;
        publishAll('objects', id, objects[id]);

        if (typeof callback === 'function') {
            setTimeout(function () {
                callback(null, {id: id, value: objects[id]}, id);
            }, 0);
        }

        if (!configTimer) configTimer = setTimeout(saveConfig, 5000);
    };

    this.setConfig = this.setObject;

    this.delConfig = this.delObject;

    this.getConfig = this.getObject;

    this.getConfigs = this.getObjects;

    this.findObject = function (idOrName, type, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(null, options, 'list', function (err, options) {
                if (err) {
                    return callback(err);
                } else {
                    return this.findObject(idOrName, type, options, callback);
                }
            }.bind(this));
            return;
        }

        // Assume it is ID
        if (objects[idOrName] && (!type || (objects[idOrName].common && objects[idOrName].common.type == type))) {
            callback(null, idOrName, idOrName);
        } else {
            // Assume it is name
            for (var id in objects) {
                if (!checkObject(id, options, 4/*read*/)) continue;
                if (objects[id].common &&
                    objects[id].common.name == idOrName &&
                    (!type || (objects[id].common && objects[id].common.type == type))) {
                    callback(null, id, idOrName);
                    return;
                }
            }
            callback(null, null, idOrName);
        }
    };

    function socketEvents(socket, user) {

        socket.on('writeFile', function (id, name, data, options, callback) {
            that.writeFile.apply(that, arguments);
        });

        socket.on('destroy', function (callback) {
            // client may not close DB
            if (typeof callback == 'function') callback();
            //that.destroy.apply(that, arguments);
        });

        socket.on('readFile', function (id, name, params, options, callback) {
            that.readFile.apply(that, arguments);
        });

        socket.on('readDir', function (id, path, options, callback) {
            that.readDir.apply(that, arguments);
        });

        socket.on('unlink', function (id, name, options, callback) {
            that.unlink.apply(that, arguments);
        });

        socket.on('rename', function (id, oldName, newName, options, callback) {
            that.rename.apply(that, arguments);
        });

        socket.on('mkdir', function (id, dirname, callback) {
            that.mkdir.apply(that, arguments);
        });

        socket.on('chownFile', function (id, path, options, callback) {
            that.chownFile.apply(that, arguments);
        });

        socket.on('chmodFile', function (id, path, options, callback) {
            that.chmodFile.apply(that, arguments);
        });

        socket.on('rm', function (id, path, options, callback) {
            that.rm.apply(that, arguments);
        });

        socket.on('touch', function (id, path, options, callback) {
            that.touch.apply(that, arguments);
        });

        socket.on('subscribe', function (pattern, options) {
            // it must be "this" and not "that"
            that.subscribe.apply(this, arguments);
        });

        socket.on('unsubscribe', function (pattern, options) {
            // it must be "this" and not "that"
            that.unsubscribe.apply(this, arguments);
        });

        socket.on('getObjectView', function (design, search, params, options, callback) {
            that.getObjectView.apply(that, arguments);
        });

        socket.on('getObjectList', function (params, options, callback) {
            that.getObjectList.apply(that, arguments);
        });

        socket.on('extendObject', function (id, obj, options, callback) {
            that.extendObject.apply(that, arguments);
        });

        socket.on('setObject', function (id, obj, options, callback) {
            that.setObject.apply(that, arguments);
        });

        socket.on('delObject', function (id, options, callback) {
            that.delObject.apply(that, arguments);
        });

        socket.on('findObject', function (idOrName, type, options, callback) {
            that.findObject.apply(that, arguments);
        });

        socket.on('destroyDB', function (options, callback) {
            that.destroyDB.apply(that, arguments);
        });

        socket.on('getObject', function (id, options, callback) {
            that.getObject.apply(that, arguments);
        });

        socket.on('chownObject', function (pattern, options, callback) {
            that.chownObject.apply(that, arguments);
        });

        socket.on('chmodObject', function (pattern, options, callback) {
            that.chmodObject.apply(that, arguments);
        });

        socket.on('error', function (err) {
            log.error(err);
        });
    }

    function initSocket(socket) {
        if (settings.auth) {
            var user = null;
            socketEvents(socket, user);
        } else {
            socketEvents(socket);
        }
    }

    function _initWebServer(settings, server) {

        try {
            if (settings.secure) {
                if (!settings.certificates) return;
                server.server = require('https').createServer(settings.certificates, function (req, res) {
                    res.writeHead(501);
                    res.end('Not Implemented');
                }).listen(settings.port || 9001, (settings.host && settings.host != '127.0.0.1' && settings.host != 'localhost') ? settings.host : ((settings.host == 'localhost') ? '127.0.0.1' : undefined));
            } else {
                    server.server = require('http').createServer(function (req, res) {
                        res.writeHead(501);
                        res.end('Not Implemented');
                    }).listen(settings.port || 9001, (settings.host && settings.host != '127.0.0.1' && settings.host != 'localhost') ? settings.host : ((settings.host == 'localhost') ? '127.0.0.1' : undefined));
            }
        } catch (e) {
            log.error('Cannot start inMem-objects on port ' + (settings.port || 9001) + ': ' + e.message);
            console.log('Cannot start inMem-objects on port ' + (settings.port || 9001) + ': ' + e.message);
            process.exit(24);
        }

        server.io = socketio.listen(server.server);

        if (settings.auth) {
            server.io.use(function (socket, next) {
                if (!socket.request._query.user || !socket.request._query.pass) {
                    console.log("No password or username!");
                    next(new Error('Authentication error'));
                } else {
                    next(new Error('Authentication error'));
                    // TODO
                    /*adapter.checkPassword(socket.request._query.user, socket.request._query.pass, function (res) {
                        if (res) {
                            console.log("Logged in: " + socket.request._query.user + ', ' + socket.request._query.pass);
                            return next();
                        } else {
                            console.log("Invalid password or user name: " + socket.request._query.user + ', ' + socket.request._query.pass);
                            next(new Error('Invalid password or user name'));
                        }
                    });*/
                }
            });
        }
        server.io.set('origins', '*:*');
        server.io.on('connection', initSocket);

        log.info((settings.secure ? 'Secure ' : '') + 'inMem-objects listening on port ' + (settings.port || 9001));
    }
}

module.exports = ObjectsInMemServer;