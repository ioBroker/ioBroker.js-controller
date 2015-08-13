/**
 * @fileOverview
 * @author hobbyquaker
 * @version 0.1
 */

/** @module statesRedis */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";

var socketio          = require('socket.io');
var fs                = require('fs');
var getDefaultDataDir = require(__dirname + '/../tools').getDefaultDataDir;

function StatesInMemory(settings) {
    settings = settings || {};

    var change =           settings.change;

    var states =           {};
    var objects =          {};
    var fifo =             {};
    var messagebox =       {};
    var logs =             {};
    var session =          {};
    var globalMessageId =  0;

    var expires =          [];
    var lastExpire =       null;
    var expiresInterval =  null;

    // path is always relative to iobroker.js-controller
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

    var objectsName = dataDir + 'objects.json';
    var fifosName   = dataDir + 'fifos.json';
    var objectsDir  = dataDir + 'files/';
    var statesName  = dataDir + 'states.json';
    var historyName = dataDir + 'history/';
    objectsName += 'objects.json';


    var stateTimer =        null;
    var configTimer =       null;
    var fifoTimer =         null;

    var that =              this;

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

        // load values from file
        if (fs.existsSync(statesName)) {
            try {
                states = JSON.parse(fs.readFileSync(statesName).toString());
            } catch (e) {
                log.error('Cannot parse ' + statesName + ': ' + e);
                if (fs.existsSync(statesName + '.bak')) {
                    try {
                        states = JSON.parse(fs.readFileSync(statesName + '.bak').toString());
                    } catch (e) {
                        log.error('Cannot parse ' + statesName + '.bak: ' + e);
                        states = {};
                    }
                } else {
                    states = {};
                }
            }
        } else if (fs.existsSync(statesName + '.bak')) {
            try {
                states = JSON.parse(fs.readFileSync(statesName + '.bak').toString());
            } catch (e) {
                log.error('Cannot parse ' + statesName + '.bak: ' + e);
                states = {};
            }
        } else {
            states = {};
        }

        if (fs.existsSync(fifosName)) {
            try {
                fifo = JSON.parse(fs.readFileSync(fifosName).toString());
            } catch (e) {
                log.error('Cannot parse ' + fifosName + ': ' + e);
                if (fs.existsSync(fifosName + '.bak')) {
                    try {
                        fifo = JSON.parse(fs.readFileSync(fifosName + '.bak').toString());
                    } catch (e) {
                        log.error('Cannot parse ' + fifosName + '.bak: ' + e);
                        fifo = {};
                    }
                } else {
                    fifo = {};
                }
            }
        } else if (fs.existsSync(fifosName + '.bak')) {
            try {
                fifo = JSON.parse(fs.readFileSync(fifosName + '.bak').toString());
            } catch (e) {
                log.error('Cannot parse ' + fifosName + '.bak: ' + e);
                fifo = {};
            }
        } else {
            fifo = {};
        }

        if (settings.processObjects && fs.existsSync(objectsName)) {
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

        // Reset expires, that are still in DB
        expireAll();

        // Check if diractory exists
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

    function expireAll() {
        for (var i = expires.length - 1; i >= 0; i--) {
            var e = expires[i];
            if (states[e]) {
                states[e].ts  = Math.round((new Date()).getTime() / 1000);
                states[e].lc = (states[e].val) ? states[e].ts : states[e].lc;
                states[e].val = null;
                delete states[e].expire;
                that.publishAll('state', e, states[e]);
            }
        }
        // Set as expire all states that could expire
        for (var t in states) {
            if (states[t].expire !== undefined) {
                states[t].ts  = Math.round((new Date()).getTime() / 1000);
                states[t].lc = (states[t].val) ? states[t].ts : states[t].lc;
                states[t].val = null;
                delete states[t].expire;
            }
        }
        expires = [];
    }

    function expiresCheck() {
        var now = (new Date()).getTime();
        if (lastExpire !== null) {
            var diff = now - lastExpire;
            var count = 0;
            for (var i = expires.length - 1; i >= 0; i--) {
                var e = expires[i];
                if (states[e] && states[e].expire !== undefined) {
                    states[e].expire -= diff;

                    // if expired
                    if (states[e].expire < 0) {
                        // Set value to null
                        states[e].ts  = Math.round((new Date()).getTime() / 1000);
                        states[e].lc  = (states[e].val) ? states[e].ts : states[e].lc;
                        states[e].val = null;
                        expires.splice(i, 1);
                        delete states[e].expire;
                        that.publishAll('state', e, states[e]);
                    } else {
                        count++;
                    }
                } else {
                    expires.splice(i, 1);
                }
            }

            for (var t in session) {
                session[t]._expire -= diff;
                if (session[t]._expire < 0) {
                    delete session[t];
                } else {
                    count++;
                }
            }

            if (!count && expiresInterval) {
                clearInterval(expiresInterval);
                expiresInterval = null;
            }
        }
        lastExpire = now;
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

    function subscribe(socket, type, pattern) {
        socket._subscribe = socket._subscribe || {};
        if (!socket._subscribe[type]) socket._subscribe[type] = [];
        var s = socket._subscribe[type];
        for (var i = 0; i < s.length; i++) {
            if (s[i].pattern == pattern) return;
        }

        s.push({pattern: pattern, regex: new RegExp(pattern2RegEx(pattern))});
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

    function saveState() {
        if (fs.existsSync(statesName)) {
            var old = fs.readFileSync(statesName);
            fs.writeFileSync(statesName + '.bak', old);
        }
        fs.writeFileSync(statesName, JSON.stringify(states));
        if (stateTimer) {
            clearTimeout(stateTimer);
            stateTimer = null;
        }
    }

    function saveConfig() {
        if (fs.existsSync(objectsName)) {
            var old = fs.readFileSync(objectsName);
            fs.writeFileSync(objectsName + '.bak', old);
        }
        fs.writeFileSync(objectsName, JSON.stringify(objects));
        if (configTimer) {
            clearTimeout(configTimer);
            configTimer = null;
        }
    }

    function saveFifos() {
        if (fs.existsSync(fifosName)) {
            var old = fs.readFileSync(fifosName);
            fs.writeFileSync(fifosName + '.bak', old);
        }
        fs.writeFileSync(fifosName, JSON.stringify(fifo));
        if (fifoTimer) {
            clearTimeout(fifoTimer);
            fifoTimer = null;
        }
    }

    function socketEvents(socket, user) {
        /*
         *      states
         */
        socket.on('getStates', function (keys, callback, dontModify) {
            that.getStates.apply(that, arguments);
        });
        socket.on('getState', function (id, callback) {
            that.getState.apply(that, arguments);
        });
        socket.on('setState', function (id, state, callback) {
            that.setState.apply(that, arguments);
        });
        socket.on('setRawState', function (id, state, callback) {
            that.setRawState.apply(that, arguments);
        });
        socket.on('delState', function (id, callback) {
            that.delState.apply(that, arguments);
        });
        socket.on('getKeys', function (pattern, callback, dontModify) {
            that.getKeys.apply(that, arguments);
        });
        socket.on('subscribe', function (pattern) {
            that.subscribe.apply(this, arguments);
        });
        socket.on('unsubscribe', function (pattern) {
            that.unsubscribe.apply(this, arguments);
        });
        socket.on('pushFifoExists', function (id, state, callback) {
            that.pushFifoExists.apply(that, arguments);
        });
        socket.on('pushFifo', function (id, state, callback) {
            that.pushFifo.apply(that, arguments);
        });
        socket.on('lenFifo', function (id, callback) {
            that.lenFifo.apply(that, arguments);
        });
        socket.on('getFifo', function (id, callback) {
            that.getFifo.apply(that, arguments);
        });
        socket.on('getFifoRange', function (id, start, end, callback) {
            that.getFifoRange.apply(that, arguments);
        });
        socket.on('trimFifo', function (id, minLength, maxLength, callback) {
            that.trimFifo.apply(that, arguments);
        });
        socket.on('pushMessage', function (id, state, callback) {
            that.pushMessage.apply(that, arguments);
        });
        socket.on('lenMessage', function (id, callback) {
            that.lenMessage.apply(that, arguments);
        });
        socket.on('getMessage', function (id, callback) {
            that.getMessage.apply(that, arguments);
        });
        socket.on('delMessage', function (id, logId) {
            that.delMessage.apply(that, arguments);
        });
        socket.on('subscribeMessage', function (id) {
            that.subscribeMessage.apply(this, arguments);
        });
        socket.on('unsubscribeMessage', function (id) {
            that.unsubscribeMessage.apply(this, arguments);
        });
        socket.on('pushLog', function (id, state, callback) {
            that.pushLog.apply(that, arguments);
        });
        socket.on('lenLog', function (id, callback) {
            that.lenLog.apply(that, arguments);
        });
        socket.on('getLog', function (id, callback) {
            that.getLog.apply(that, arguments);
        });
        socket.on('delLog', function (id, logId) {
            that.delLog.apply(that, arguments);
        });
        socket.on('subscribeLog', function (id) {
            that.subscribeLog.apply(this, arguments);
        });
        socket.on('unsubscribeLog', function (id) {
            that.unsubscribeLog.apply(this, arguments);
        });
        socket.on('getSession', function (id, callback) {
            that.getSession.apply(that, arguments);
        });
        socket.on('setSession', function (id, expire, obj, callback) {
            that.setSession.apply(that, arguments);
        });
        socket.on('destroySession', function (id, callback) {
            that.destroySession.apply(that, arguments);
        });
        socket.on('getConfig', function (id, callback) {
            that.getConfig.apply(that, arguments);
        });
        socket.on('getConfigKeys', function (pattern, callback, dontModify) {
            that.getConfigKeys.apply(that, arguments);
        });
        socket.on('getConfigs', function (keys, callback, dontModify) {
            that.getConfigs.apply(that, arguments);
        });
        socket.on('setConfig', function (id, obj, callback) {
            that.setConfig.apply(that, arguments);
        });
        socket.on('delConfig', function (id, callback) {
            that.delConfig.apply(that, arguments);
        });
        socket.on('subscribeConfig', function (pattern) {
            that.subscribeConfig.apply(this, arguments);
        });
        socket.on('unsubscribeConfig', function (pattern) {
            that.unsubscribeConfig.apply(this, arguments);
        });
        socket.on('setBinaryState', function (id, data, callback) {
            that.setBinaryState.apply(that, arguments);
        });
        socket.on('getBinaryState', function (id, callback) {
            that.getBinaryState.apply(that, arguments);
        });
        socket.on('delBinaryState', function (id, callback) {
            that.delBinaryState.apply(that, arguments);
        });
    }

    this.publishAll = function (type, id, obj) {
        var clients = server.io.sockets.connected;

        for (var i in clients) {
            publish(clients[i], type, id, obj);
        }

        if (change && this._subscribe && this._subscribe[type]) {
            for (var j = 0; j < this._subscribe[type].length; j++) {
                if (this._subscribe[type][j].regex.test(id)) {
                    setTimeout(function () {
                        change(id, obj);
                    }, 0);
                    break;
                }
            }
        }
    };

    // Destructor of the class. Called by shutting down.
    this.destroy = function () {
        expireAll();
        if (stateTimer) saveState();

        if (fifoTimer) saveFifos();

        if (settings.processObjects && configTimer) saveConfig();

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

    this.getStates = function (keys, callback, dontModify) {
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
            result.push(states[keys[i]]);
        }
        if (typeof callback === 'function') callback(null, result);
    };

    this.getState = function (id, callback) {
        if (typeof callback == 'function') {
            callback(null, states[id]);
        }
    };

    this.setState = function (id, state, callback) {
        var that = this;
        var obj = {};

        if (typeof state !== 'object' || state === null || state === undefined) {
            state = {
                val: state
            };
        }

        var oldObj = states[id];

        if (!oldObj) {
            oldObj = {};
        }

        if (state.val !== undefined) {
            obj.val = state.val;
        } else {
            obj.val = oldObj.val;
        }

        if (state.ack !== undefined) {
            obj.ack = state.ack;
        } else {
            obj.ack = false;
        }

        if (state.ts !== undefined) {
            obj.ts = state.ts;
        } else {
            obj.ts = Math.round((new Date()).getTime() / 1000);
        }

        obj.from = state.from;

        var hasChanged;

        if (state.lc !== undefined) {
            obj.lc = state.lc;
        } else {
            if (typeof obj.val === 'object') {
                hasChanged = JSON.stringify(oldObj.val) !== JSON.stringify(obj.val);
            } else {
                hasChanged = oldObj.val !== obj.val;
            }
            if (!oldObj.lc || hasChanged) {
                obj.lc = obj.ts;
            } else {
                obj.lc = oldObj.lc;
            }
        }

        // publish event in redis
        log.debug('redis publish ' + id + ' ' + JSON.stringify(obj));
        // If val === undefined, the state was just created and not filled with value
        if (obj.val !== undefined) that.publishAll('state', id, obj);

        // set object in redis
        if (state.expire) {
            state.expire *= 1000; // make ms from seconds

            if (expires.indexOf(id) == -1) expires.push(id);

            if (!expiresInterval) {
                lastExpire = (new Date()).getTime();
                expiresInterval = setInterval(expiresCheck, 5000);
            } else {
                if (lastExpire) state.expire -= ((new Date()).getTime() - lastExpire);
            }
            obj.expire = state.expire;
        }
        states[id] = obj;
        if (typeof callback === 'function') callback(null, id);

        if (!stateTimer) stateTimer = setTimeout(saveState, 30000);
     };

    this.setRawState = function (id, state, callback) {
        states[id] = state;
       if (typeof callback === 'function') setTimeout(function () {
            callback(null, id);
        }, 0);
    };

    this.delState = function (id, callback) {
        if (states[id]) {
            delete states[id];
            this.publishAll('state', id, null);
        }
        if (typeof callback === 'function') setTimeout(function () {
            callback(null, id);
        }, 0);
    };

    this.getKeys = function (pattern, callback, dontModify) {
        // special case because of simulation of redis
        if (pattern.substring(0, 3) == 'io.') pattern = pattern.substring(3);

        var r = new RegExp(pattern2RegEx(pattern));
        var result = [];
        for (var id in states) {
            if (r.test(id)) result.push(id);
        }
        if (typeof callback === 'function') callback(null, result);
    };

    this.subscribe = function (pattern) {
        subscribe(this, 'state', pattern);
    };

    this.unsubscribe = function (pattern) {
        unsubscribe(this, 'state', pattern);
    };

    this.pushFifoExists = function (id, state, callback) {
        if (fifo[id]) {
            fifo[id].unshift(state);
            if (typeof callback === 'function') callback(null, fifo[id]);
            if (!fifoTimer) fifoTimer = setTimeout(saveFifos, 120000);
        } else {
            if (typeof callback === 'function') callback('Not exists', null);
        }
    };

    this.pushFifo = function (id, state, callback) {
        if (!fifo[id]) fifo[id] = [];
        fifo[id].unshift(state);
        if (typeof callback === 'function') callback(null, fifo[id]);
        if (!fifoTimer) fifoTimer = setTimeout(saveFifos, 120000);
    };

    this.lenFifo = function (id, callback) {
        if (fifo[id]) {
            if (typeof callback === 'function') callback(null, fifo[id].length);
        } else {
            if (typeof callback === 'function') callback('Not exists', null);
        }
    };

    this.getFifo = function (id, callback) {
        if (fifo[id]) {
            if (typeof callback === 'function') callback(null, fifo[id]);
        } else {
            if (typeof callback === 'function') callback('Not exists', null);
        }
    };

    this.getFifoRange = function (id, start, end, callback) {
        if (fifo[id]) {
            var result = [];
            for (var i = start; i <= end; i++) {
                if (fifo[id][i]) result.push(fifo[id][i]);
            }

            if (typeof callback === 'function') callback(null, result);
        } else {
            if (typeof callback === 'function') callback('Not exists', null);
        }
    };

    this.trimFifo = function (id, minLength, maxLength, callback) {
        log.debug('trimFifo history.' + id + ' minLength=' + minLength + ' maxLength=' + maxLength);
        if (!fifo[id]) {
            if (typeof callback === 'function') callback('Not exists', null);
            return;
        }
        if (fifo[id].length <= maxLength) {
            if (typeof callback === 'function') callback(null, []);
        } else {
            var end = (minLength < fifo[id].length) ? fifo[id].length - minLength: 0;
            var result = fifo[id].splice(0, end - 1);
            if (typeof callback === 'function') callback(null, result);
            if (!fifoTimer) fifoTimer = setTimeout(saveFifos, 120000);
        }
    };

    this.pushMessage = function (id, state, callback) {
        messagebox[id] = messagebox[id] || [];
        state._id = globalMessageId++;
        if (globalMessageId == 0xFFFFFFFF) globalMessageId = 0;
        messagebox[id].unshift(state);
        that.publishAll('messagebox', 'messagebox.' + id, state);
        if (typeof callback === 'function') callback(null, id);
    };

    this.lenMessage = function (id, callback) {
        if (messagebox[id]) {
            if (typeof callback === 'function') callback(null, messagebox[id].length);
        } else {
            if (typeof callback === 'function') callback('Not exists', null);
        }
    };

    this.getMessage = function (id, callback) {
        if (messagebox[id]) {
            if (typeof callback === 'function') callback(null, messagebox[id].pop());
        } else {
            if (typeof callback === 'function') callback('Not exists', null);
        }
    };

    this.delMessage = function (id, messageId) {
        if (messagebox[id]) {
            var found = false;
            for (var i = messagebox[id].length - 1; i >= 0; i--) {
                if (messagebox[id][i]._id == messageId) {
                    messagebox[id].splice(i, 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                console.log('WARNING: cannot find message with id = ' + messageId);
                log.error('WARNING: cannot find message with id = ' + messageId);
            }
        }
    };

    this.subscribeMessage = function (id) {
        subscribe(this, 'messagebox', 'messagebox.' + id);
    };

    this.unsubscribeMessage = function (id) {
        unsubscribe(this, 'messagebox', 'messagebox.' + id);
    };

    this.pushLog = function (id, state, callback) {
        logs[id] = logs[id] || [];
        state._id = globalMessageId++;
        if (globalMessageId == 0xFFFFFFFF) globalMessageId = 0;
        logs[id].unshift(state);
        that.publishAll('log', 'log.' + id, state);
        if (typeof callback === 'function') callback(null, id);
    };

    this.lenLog = function (id, callback) {
        if (logs[id]) {
            if (typeof callback === 'function') callback(null, logs[id].length);
        } else {
            if (typeof callback === 'function') callback('Not exists', null);
        }
    };

    this.getLog = function (id, callback) {
        if (logs[id]) {
            if (typeof callback === 'function') callback(null, logs[id].pop());
        } else {
            if (typeof callback === 'function') callback('Not exists', null);
        }
    };

    this.delLog = function (id, logId) {
        if (logs[id]) {
            var found = false;
            for (var i = logs[id].length - 1; i >= 0; i--) {
                if (logs[id][i]._id == logId) {
                    logs[id].splice(i, 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                // Protection against too much lost IDs
                if (logs[id].length > 100) {
                    console.log('WARNING: cannot find logs with id = ' + logId);
                    log.error('WARNING: cannot find logs with id = ' + logId);
                    logs[id].splice(100, logs[id].length - 100);
                }
            }
        }
    };

    this.subscribeLog = function (id) {
        subscribe(this, 'log', 'log.' + id);
    };

    this.unsubscribeLog = function (id) {
        unsubscribe(this, 'log', 'log.' + id);
    };

    this.getSession = function (id, callback) {
        if (typeof callback === 'function') callback(session[id]);
    };

    this.setSession = function (id, expire, obj, callback) {
        session[id] = obj || {};
        session[id]._expire = expire * 1000;
        if (!expiresInterval) {
            lastExpire = (new Date()).getTime();
            expiresInterval = setInterval(expiresCheck, 5000);
        } else {
            if (lastExpire) session[id]._expire -= ((new Date()).getTime() - lastExpire);
        }

        if (typeof callback === 'function') callback();
    };

    this.destroySession = function (id, callback) {
        if (session[id]) {
            delete session[id];
        }
        if (typeof callback === 'function')  callback();
    };

    if (settings.processObjects) {
        this.getConfig = function (id, callback) {
            if (typeof callback === 'function') callback(null, objects[id]);
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
                result.push(objects[keys[i]]);
            }
            if (typeof callback === 'function') callback(null, result);
        };

        this.setConfig = function (id, obj, callback) {
            objects[id] = obj;
            that.publishAll('objects', id, obj);
            if (typeof callback === 'function') callback(null, {id: id});
            if (!configTimer) configTimer = setTimeout(saveConfig, 5000);
        };

        this.delConfig = function (id, callback) {
            if (objects[id]) {
                delete objects[id];
                that.publishAll('objects', id, null);
                if (typeof callback === 'function') callback(null);
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
    }

    this.setBinaryState = function (id, data, callback) {
        states[id] = data;
        if (typeof callback === 'function') callback(null, id);
        if (!stateTimer) stateTimer = setTimeout(saveState, 30000);
    };

    this.getBinaryState = function (id, callback) {
        if (states[id]) {
            if (callback) callback(null, states[id]);
        } else {
            if (callback) callback('not exists');
        }
    };

    this.delBinaryState = function (id, callback) {
        if (states[id]) {
            delete states[id];
        }
        if (typeof callback === 'function') callback(null, id);
    };
    
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
                }).listen(settings.port || 9000, (settings.host && settings.host != '127.0.0.1' && settings.host != 'localhost') ? settings.host : ((settings.host == 'localhost') ? '127.0.0.1' : undefined));
            } else {
                server.server = require('http').createServer(function (req, res) {
                    res.writeHead(501);
                    res.end('Not Implemented');
                }).listen(settings.port || 9000, (settings.host && settings.host != '127.0.0.1' && settings.host != 'localhost') ? settings.host : ((settings.host == 'localhost') ? '127.0.0.1' : undefined));
            }
        } catch (e) {
            log.error('Cannot start inMem-objects on port ' + (settings.port || 9000) + ': ' + e.message);
            console.log('Cannot start inMem-objects on port ' + (settings.port || 9000) + ': ' + e.message);
            process.exit(24);
        }

        server.io = socketio.listen(server.server);

        if (settings.auth) {

            server.io.use(function (socket, next) {
                if (!socket.request._query.user || !socket.request._query.pass) {
                    console.log("No password or username!");
                    next(new Error('Authentication error'));
                } else {
                    // TODO
                    console.log("Not implemented");
                    next(new Error('Authentication error/Not implemented'));
                    /*
                    adapter.checkPassword(socket.request._query.user, socket.request._query.pass, function (res) {
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

        log.info((settings.secure ? 'Secure ' : '') + 'inMem-states listening on port ' + (settings.port || 9000));
    }
}

module.exports = StatesInMemory;
