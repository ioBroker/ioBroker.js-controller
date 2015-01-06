/* jshint -W097 */// jshint strict:false
/*jslint node: true */
/*jshint -W061 */
"use strict";

var extend   = require('node.extend');
var fs       = require('fs');
var socketio = require('socket.io');

var util     = require('util');
var stream   = require('stream');
var Writable = stream.Writable;
var memStore = {};

/* Writable memory stream */
function WMStrm(key, options) {
    // allow use without new operator
    if (!(this instanceof WMStrm)) {
        return new WMStrm(key, options);
    }

    Writable.call(this, options); // init super
    this.key = key; // save key
    memStore[key] = new Buffer(''); // empty
}
util.inherits(WMStrm, Writable);

WMStrm.prototype._write = function (chunk, enc, cb) {
    // our memory store stores things in buffers
    var buffer = (Buffer.isBuffer(chunk)) ?
        chunk :  // already is Buffer use it
        new Buffer(chunk, enc);  // string, convert

    // concat to the buffer already there
    memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
    cb();
};

function ObjectsInMemServer(settings) {
    settings = settings || {};

    var that =        this;
    var objects =     {};
    var types =       {};
    var files =       {};
    var configTimer = null;
    var change;

    var dataDir = settings.dataDir || (__dirname + '/../data');
    dataDir = dataDir.replace(/\\/g, '/');
    if (dataDir[dataDir.length - 1] != '/') dataDir += '/'

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

        // Check if diractory exists
        objectsName = objectsName.replace(/\\/g, '/');
        var parts = objectsName.split('/');
        parts.pop();
        parts = parts.join('/');
        if (!fs.existsSync(parts)) fs.mkdirSync(parts);

        _initWebServer(settings, server)

        if (settings.connected) {
            setTimeout(function () {
                settings.connected('InMemoryDB');
            }, 0);
        }
    })();

    function clone(obj) {
        if(obj == null || typeof(obj) != 'object')
            return obj;

        var temp = obj.constructor(); // changed

        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
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
    
    function subscribe(socket, type, pattern) {
        socket._subscribe = socket._subscribe || {};
        var s = socket._subscribe[type] = socket._subscribe[type] || [];
        for (var i = 0; i < s.length; i++) {
            if (s[i].pattern == pattern) return;
        }

        s.push({pattern: pattern, regex: new RegExp(pattern2RegEx(pattern))});
    }

    function unsubscribe(socket, type, pattern) {
        if (!socket._subscribe || !socket._subscribe[type]) return;
        for (var i = 0; i < socket._subscribe[type].length; i++) {
            if (socket._subscribe[type][i].pattern == pattern) {
                delete socket._subscribe[type][i];
                return;
            }
        }
    }

    function publish(socket, type, id, obj) {
        if (!socket._subscribe || !socket._subscribe[type]) return;
        var s = socket._subscribe[type];
        for (var i = 0; i < s.length; i++) {
            if (s[i].regex.test(id)) {
                socket.emit("message", s[i].pattern, id, obj);
                return;
            }
        }
    }

    function publishAll(type, id, obj) {
        if (id === undefined) {
            console.log('Problemn');
        }

        var clients = server.io.sockets.connected;

        for (var i in clients) {
            publish(clients[i], type, id, obj);
        }

        if (change && that._subscribe && that._subscribe[type]) {
            for (var i = 0; i < that._subscribe[type].length; i++) {
                if (that._subscribe[type][i].regex.test(id)) {
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
    }

    this.getConfig = function (id, callback) {
        if (typeof callback === 'function') {
            var obj = clone(objects[id]);
            // Read history from file
            if (regHistory.test(id)){
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

            if (typeof callback === 'function') callback(null, obj);
        }
    };

    this.getConfigKeys = function (pattern, callback, dontModify) {
        var r = new RegExp(pattern2RegEx(pattern));
        var result = [];
        for (var id in objects) {
            if (r.test(id)) result.push(id);
        }
        if (typeof callback === 'function') callback(null, result);
    };

    this.getConfigs = function (keys, callback, dontModify) {
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
            result.push(clone(objects[keys[i]]));
        }
        if (typeof callback === 'function') callback(null, result);
    };

    this.setConfig = function (id, obj, callback) {
        obj._id = id;
        // Write history to file
        if (regHistory.test(id)) storeHistory(id, obj);

        objects[id] = obj;
        publishAll('objects', id, obj);
        if (typeof callback === 'function') callback(null, {id: id});
        if (!configTimer) configTimer = setTimeout(saveConfig, 5000);
    };

    this.delConfig = function (id, callback) {
        if (objects[id]) {
            delete objects[id];
            publishAll('objects', id, null);
            if (typeof callback === 'function') callback(null);
            if (!configTimer) configTimer = setTimeout(saveConfig, 5000);
        } else {
            if (typeof callback === 'function') callback('Not exists');
        }
    };

    this.subscribeConfig = function (pattern) {
        subscribe(this, 'objects', pattern);
    };

    this.unsubscribeConfig = function (pattern) {
        unsubscribe(this, 'objects', pattern);
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
    };

    this.writeFile = function (id, name, data, mimeType, callback) {
        try {
            try {
                if (!fs.existsSync(objectsDir))      fs.mkdirSync(objectsDir);
                if (!fs.existsSync(objectsDir + id)) fs.mkdirSync(objectsDir + id);
            } catch (e) {
                log.error('Cannot create directories: ' + objectsDir + id + ': ' + e.message);
                log.error('Check the permissions! or call "sudo chmod 777 * -R" in iobroker dir');
                if (typeof callback == 'function') callback(e.message);
                return;
            }

            if (!types[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')) {
                    try {
                        types[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json'));
                    } catch (e) {
                        log.error('Cannot parse ' + objectsDir + id + '/_data.json: ' + e);
                    }
                } else {
                    types[id] = {};
                }
            }
            if (!files[id]) {
                files[id] = {};
            }

            var isBinary = false;
            var ext = name.match(/\.[^.]+$/);
            var _mimeType;
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
            } else {
                _mimeType = 'text/javascript'
            }

            types[id][name] = mimeType || _mimeType;
            files[id][name] = data;
            try {
                // Create directories if complex structure
                mkpathSync(objectsDir + id + '/', name);
                // Store file
                fs.writeFileSync(objectsDir + id + '/' + name, data, {'flags': 'w', 'encoding': isBinary ? 'binary' : 'utf8'});
                // Store dir description
                fs.writeFileSync(objectsDir + id + '/_data.json', JSON.stringify(types[id]));
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

    this.insert = function (id, attName, ignore, mimeType, obj, callback) {
        //return pipe for write into redis
        var strm = new WMStrm(id + '/' + attName);
        strm.on('finish', function () {
            that.writeFile(id, attName, memStore[id + '/' + attName], mimeType, function () {
                delete memStore[id + '/' + attName];
                if (callback) callback(null, null);
            });
        });
        return strm;
    };

    this.readFile = function (id, name, params, callback) {
        try {
            if (!types[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')){
                    try{
                        types[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json', 'binary'));
                    } catch(e) {
                        log.error('Cannot parse ' + objectsDir + id + '/_data.json: ' + e);
                    }
                } else {
                    types[id] = {};
                }
            }

            if (!files[id]) files[id] = {};

            if (!files[id][name]) {
                if (fs.existsSync(objectsDir + id + '/' + name)) {
                    files[id][name] = fs.readFileSync(objectsDir + id + '/' + name);
                    var ext = name.match(/\.[^.]+$/);
                    // dont convert images and sounds
                    if (!ext[0] ||
                        (ext[0] != '.gif'  &&
                            ext[0] != '.jpg'  &&
                            ext[0] != '.png'  &&
                            ext[0] != '.wav'  &&
                            ext[0] != '.mp3'  &&
                            ext[0] != '.jpeg' &&
                            ext[0] != '.tif'  &&
                            ext[0] != '.bmp'  &&
                            ext[0] != '.eot'  &&
                            ext[0] != '.ttf'  &&
                            ext[0] != '.woff'  )) {
                        if (files[id][name]) files[id][name] = files[id][name].toString();
                    }
                } else {
                    files[id][name] = null;
                }
            }

            if (typeof callback == 'function') {
                if (files[id][name] !== null || files[id][name]!== undefined) {
                    callback(null, files[id][name], types[id][name]);
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

    this.readDir = function (id, name, callback) {
        try {
            if (!types[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')) {
                    try {
                        types[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json', 'binary'));
                    } catch (e) {
                        log.error('Cannot parse ' + objectsDir + id + '/_data.json: ' + e);
                    }
                } else {
                    types[id] = {};
                }
            }
            // Find all files and directories starts with name
            var files = [];
            if (name && name[name.length - 1] != '/') name += '/';
            var len = (name) ? name.length : 0;
            for (var f in types[id]) {
                if (!name || f.substring(0, len) == name) {
                    var rest = f.substring(len);
                    rest = rest.split('/', 2);
                    if (files.indexOf(rest[0]) == -1) {
                        files.push(rest[0]);
                    }
                }
            }

            if (fs.existsSync(objectsDir + id + '/' + name)){
                var dirfiles = fs.readdirSync(objectsDir + id + '/' + name);
                for (var i = 0; i < dirfiles.length; i++) {
                    if (files.indexOf(dirfiles[i]) == -1) {
                        files.push(dirfiles[i]);
                    }
                }
            }

            files.sort();
            var res = [];
            for (var i = 0; i < files.length; i++) {
                var stats = fs.statSync(objectsDir + id + '/' + name + files[i]);
                res.push({file: files[i], stats: stats, isDir: stats.isDirectory()})
            }

            if (typeof callback == 'function') {
                callback(null, res);
            }
        } catch (e) {
            if (typeof callback == 'function') {
                callback(e.message);
            }
        }
    };

    this.unlink = function (id, name, callback) {
        try {
            if (!types[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')){
                    types[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json'));
                } else {
                    types[id] = {};
                }
            }
            if (types[id][name]) {
                delete types[id][name];
                fs.writeFileSync(objectsDir + id + '/_data.json', JSON.stringify(types[id]));
            }
            if (files[id] && files[id][name]) {
                delete files[id][name];
            }
            if (fs.existsSync(objectsDir + id + '/' + name)){
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
        } catch (e) {
            if (typeof callback == 'function') callback(e.message);
        }
    };

    this.rename = function (id, oldName, newName, callback) {
        try {
            if (!types[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')){
                    types[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json'));
                } else {
                    types[id] = {};
                }
            }
            if (types[id][oldName]) {
                var type = types[id][oldName];
                delete types[id][oldName];
                types[id][newName] = type;
                fs.writeFileSync(objectsDir + id + '/_data.json', JSON.stringify(types[id]));
            }
            if (files[id] && files[id][oldName]) {
                var data = files[id][oldName];
                delete files[id][oldName];
                files[id][newName] = data;
            }
            if (fs.existsSync(objectsDir + id + '/' + oldName)){
                fs.renameSync(objectsDir + id + '/' + oldName, objectsDir + id + '/' + newName);
                if (typeof callback == 'function') callback();
            } else {
                if (typeof callback == 'function') callback('Not exists');
            }
        } catch (e) {
            if (typeof callback == 'function') callback(e.message);
        }
    };

    this.mkdir = function (id, dirname, callback) {
        try {
            if (!types[id]) {
                if (fs.existsSync(objectsDir + id + '/_data.json')){
                    types[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json'));
                } else {
                    types[id] = {};
                }
            }
            if (!fs.existsSync(objectsDir + id + '/' + dirname)){
                fs.mkdirSync(objectsDir + id + '/' + dirname);
                if (typeof callback == 'function') callback();
            } else {
                if (typeof callback == 'function') callback('Yet exists');
            }
        } catch (e) {
            if (typeof callback == 'function') callback(e.message);
        }
    };

    this.subscribe = this.subscribeConfig;

    this._applyView = function (func, params, callback) {
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
                if (params.endkey && id > params.endkey) continue;
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

    this.getObjectView = function (design, search, params, callback) {
        if (objects['_design/' + design] && objects['_design/' + design].views) {
            if (objects['_design/' + design].views[search]) {
                that._applyView(objects['_design/' + design].views[search], params, callback);
            } else {
                console.log('Cannot find view "' + design + '"');
                if (typeof callback == 'function') callback({status_code: 404, status_text: 'Cannot find view "' + design + '"'});
            }
        } else {
            console.log('Cannot find view "' + design + '"');
            if (typeof callback == 'function') callback({status_code: 404, status_text: 'Cannot find view "' + design + '"'});
        }
    };

    this.getObjectList = function (params, callback) {
        // return rows with id and doc
        var result = {
            rows: []
        };

        for (var id in objects) {
            if (params) {
                if (params.startkey && id < params.startkey) continue;
                if (params.endkey && id > params.endkey)     continue;
                if (!params.include_docs && id[0] == '_')    continue;
            }
            var obj = {id: id, value: clone(objects[id])};
            obj.doc = obj.value;
            result.rows.push(obj);
        }
        if (callback) callback(null, result);
    };

    this.extendObject = function (id, obj, callback) {
        objects[id] = objects[id] || {};
        objects[id] = extend(true, objects[id], obj);
        objects[id]._id = id;
        publishAll('objects', id, objects[id]);

        if (typeof callback === 'function') callback(null, {id: id, value: objects[id]}, id);
        if (!configTimer) configTimer = setTimeout(saveConfig, 5000);
    };

    this.setObject = this.setConfig;

    this.delObject = this.delConfig;

    this.getObject = this.getConfig;


    function socketEvents(socket, user) {

        socket.on('writeFile', function (id, name, data, mime, params, callback) {
            that.writeFile.apply(that, arguments);
        });

        socket.on('destroy', function (callback) {
            that.destroy.apply(that, arguments);
        });

        socket.on('readFile', function (id, name, params, callback) {
            that.readFile.apply(that, arguments);
        });

        socket.on('readDir', function (id, path, callback) {
            that.readDir.apply(that, arguments);
        });

        socket.on('unlink', function (id, name, callback) {
            that.unlink.apply(that, arguments);
        });

        socket.on('rename', function (id, oldName, newName, callback) {
            that.rename.apply(that, arguments);
        });

        socket.on('mkdir', function (id, dirname, callback) {
            that.mkdir.apply(that, arguments);
        });

        socket.on('subscribe', function (pattern) {
            that.subscribe.apply(this, arguments);
        });

        socket.on('unsubscribe', function (pattern) {
            that.unsubscribe.apply(this, arguments);
        });

        socket.on('getObjectView', function (design, search, params, callback) {
            that.getObjectView.apply(that, arguments);
        });

        socket.on('getObjectList', function (params, callback) {
            that.getObjectList.apply(that, arguments);
        });

        socket.on('extendObject', function (id, obj, callback) {
            that.extendObject.apply(that, arguments);
        });

        socket.on('setObject', function (id, obj, callback) {
            that.setObject.apply(that, arguments);
        });

        socket.on('delObject', function (id, callback) {
            that.delObject.apply(that, arguments);
        });

        socket.on('getObject', function (id, callback) {
            that.getObject.apply(that, arguments);
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

        if (settings.secure) {
            if (!settings.certificates) return;
            server.server = require('https').createServer(settings.certificates, function (req, res) {
                res.writeHead(501);
                res.end('Not Implemented');
            }).listen(settings.memPort || 9001, (settings.bind && settings.bind != "0.0.0.0") ? settings.bind : undefined);
        } else {
            server.server = require('http').createServer(function (req, res) {
                res.writeHead(501);
                res.end('Not Implemented');
            }).listen(settings.memPort || 9001, (settings.bind && settings.bind != "0.0.0.0") ? settings.bind : undefined);
        }

        server.io = socketio.listen(server.server);

//    server.io = socketio.listen(settings.port, (settings.bind && settings.bind != "0.0.0.0") ? settings.bind : undefined);

        if (settings.auth) {
            server.io.use(function (socket, next) {
                if (!socket.request._query.user || !socket.request._query.pass) {
                    console.log("No password or username!");
                    next(new Error('Authentication error'));
                } else {
                    adapter.checkPassword(socket.request._query.user, socket.request._query.pass, function (res) {
                        if (res) {
                            console.log("Logged in: " + socket.request._query.user + ', ' + socket.request._query.pass);
                            return next();
                        } else {
                            console.log("Invalid password or user name: " + socket.request._query.user + ', ' + socket.request._query.pass);
                            next(new Error('Invalid password or user name'));
                        }
                    });
                }
            });
        }
        server.io.set('origins', '*:*');
        server.io.on('connection', initSocket);

        log.info((settings.secure ? 'Secure ' : '') + 'inMem-objects listening on port ' + (settings.memPort || 9001));
    }


}

module.exports = ObjectsInMemServer;