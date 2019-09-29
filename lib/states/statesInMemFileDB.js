/**
 *      States DB in memory - Server
 *
 *      Copyright 2013-2018 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

/** @module StatesInMemoryFileDB */

/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
'use strict';

const InMemoryFileDB    = require('../inMemFileDB');
const tools             = require('../tools.js');

// settings = {
//    change:    function (id, state) {},
//    connected: function (nameOfServer) {},
//    logger: {
//           silly: function (msg) {},
//           debug: function (msg) {},
//           info:  function (msg) {},
//           warn:  function (msg) {},
//           error: function (msg) {}
//    },
//    connection: {
//           dataDir: 'relative path'
//    },
//    auth: null, //unused
//    secure: true/false,
//    certificates: as required by createServer
//    port: 9000,
//    host: localhost
// };
//

/**
 * This class inherits InMemoryFileDB class and adds all relevant logic for states
 * including the available methods for use by js-controller directly
 **/
class StatesInMemoryFileDB extends InMemoryFileDB {

    constructor(settings) {
        settings = settings || {};
        settings.fileDB = {
            fileName: 'states.json',
            backupDirName: 'backup-objects'
        };
        super(settings);

        this.logs = {};
        this.session = {};
        this.messagebox = {};
        this.globalMessageId = Math.round(Math.random() * 100000000);
        this.globalLogId = Math.round(Math.random() * 100000000);

        this.stateExpires = {};
        this.sessionExpires = {};
        this.adapterSubs = [];

        //this.settings.connection.maxQueue = this.settings.connection.maxQueue || 1000;

        // Reset expires, that are still in DB
        this.expireAll();
    }

    expireAll() {
        Object.keys(this.stateExpires).forEach( id => {
            clearTimeout(this.stateExpires[id]);
            delete this.stateExpires[id];

            if (this.dataset[id]) {
                this.dataset[id].ts  = Date.now();
                this.dataset[id].lc = (this.dataset[id].val) ? this.dataset[id].ts : this.dataset[id].lc;
                this.dataset[id].val = null;
                delete this.dataset[id].expire;
                this.publishAll('state', id, this.dataset[id]);
            }
        });
        // Set as expire all states that could expire
        Object.keys(this.dataset).forEach( id => {
            if (!this.dataset.hasOwnProperty(id) || !this.dataset[id]) return;
            if (this.dataset[id].expire) {
                this.dataset[id].ts  = Date.now();
                this.dataset[id].lc = (this.dataset[id].val) ? this.dataset[id].ts : this.dataset[id].lc;
                this.dataset[id].val = null;
                delete this.dataset[id].expire;
            }
        });
    }

    expireState(id) {
        delete this.stateExpires[id];

        if (this.dataset[id]) {
            // Set value to null
            this.dataset[id].ts = Date.now();
            this.dataset[id].lc = (this.dataset[id].val) ? this.dataset[id].ts : this.dataset[id].lc;
            this.dataset[id].val = null;
            delete this.dataset[id].expire;
            this.publishAll('state', id, this.dataset[id]);
        }
    }

    expireSession(id) {
        delete this.sessionExpires[id];

        if (this.session[id]) {
            delete this.session[id];
        }
    }

    // Destructor of the class. Called by shutting down.
    destroy() {
        this.expireAll();

        super.destroy();

        if (this.stateTimer) {
            clearTimeout(this.stateTimer);
            this.stateTimer = null;
        }
    }

    getStates(keys, callback, _dontModify) {
        if (!keys) {
            if (callback) callback('no keys', null);
            return;
        }
        if (!keys.length) {
            if (callback) callback(null, []);
            return;
        }
        const result = [];
        for (let i = 0; i < keys.length; i++) {
            result.push(this.dataset[keys[i]] !== undefined ? this.dataset[keys[i]] : null);
        }
        typeof callback === 'function' && callback(null, result);
    }

    getState(id, callback) {
        if (typeof callback === 'function') {
            callback(null, this.dataset[id] !== undefined ? this.dataset[id] : null);
        }
    }

    /**
     * @method setState
     * @param id {String}           the id of the value.
     * @param state {any}
     *
     *
     *      an object containing the actual value and some metadata:<br>
     *      setState(id, {'val': val, 'ts': ts, 'ack': ack, 'from': from, 'lc': lc, 'user': system.user.NAME})
     *
     *      if no object is given state is treated as val:<br>
     *      setState(id, val)
     *
     *      <ul><li><b>val</b>  the actual value. Can be any JSON-stringifiable object. If undefined the
     *                          value is kept unchanged.</li>
     *
     *      <li><b>ack</b>  a boolean that can be used to mark a value as confirmed, used in bidirectional systems which
     *                      acknowledge that a value has been successfully set. Will be set to false if undefined.</li>
     *
     *      <li><b>ts</b>   a unix timestamp indicating the last write-operation on the state. Will be set by the
     *                      setState method if undefined.</li>
     *
     *      <li><b>lc</b>   a unix timestamp indicating the last change of the actual value. this should be undefined
     *                      when calling setState, it will be set by the setValue method itself.</li></ul>
     *
     * @param callback {Function}   will be called when redis confirmed reception of the command
     */
    setState(id, state, callback) {
        const obj = {};

        if (typeof state !== 'object' || state === null || state === undefined) {
            state = {
                val: state
            };
        }

        let oldObj = this.dataset[id];

        if (!oldObj) {
            oldObj = {val: null};
        }

        if (state.val !== undefined) {
            obj.val = state.val;
        } else {
            obj.val = oldObj.val;
        }

        if (state.ack !== undefined) {
            obj.ack = state.ack === null ? oldObj.ack || false : state.ack;
        } else {
            obj.ack = false;
        }

        if (state.ts !== undefined) {
            obj.ts = (state.ts < 946681200000) ? state.ts * 1000 : state.ts; // if less 2000.01.01 00:00:00
        } else {
            obj.ts = Date.now();
        }

        if (state.q !== undefined) {
            obj.q = state.q;
        } else {
            obj.q = 0;
        }

        // comment
        if (state.c) {
            obj.c = state.c.toString().substring(0, 512);
        }

        if (state.ms !== undefined) {
            obj.ms = state.ms;
        }

        obj.from = state.from;

        if (state.user !== undefined) {
            obj.user = state.user;
        }

        let hasChanged;

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

        // publish event in states
        this.log.silly(this.namespace + ' memory publish ' + id + ' ' + JSON.stringify(obj));
        // If val === undefined, the state was just created and not filled with value
        if (obj.val !== undefined) this.publishAll('state', id, obj);

        if (this.stateExpires[id]) {
            clearTimeout(this.stateExpires[id]);
            delete this.stateExpires[id]
        }

        // set object in redis
        if (state.expire) {
            this.stateExpires[id] = setTimeout(() => this.expireState(id), state.expire * 1000);

            obj.expire = true;
        }
        this.dataset[id] = obj;
        typeof callback === 'function' && callback(null, id);

        if (!this.stateTimer) this.stateTimer = setTimeout(() => this.saveState, 30000);
    }

    setRawState(id, state, callback) {
        this.dataset[id] = state;
        if (typeof callback === 'function')  {
            setImmediate(callback, null, id);
        }
    }

    delState(id, callback) {
        if (this.dataset[id]) {
            delete this.dataset[id];
            this.publishAll('state', id, null);
        }
        if (typeof callback === 'function') {
            setImmediate(callback, null, id);
        }
    }

    getKeys(pattern, callback, _dontModify) {
        // special case because of simulation of redis
        if (pattern.substring(0, 3) === 'io.') pattern = pattern.substring(3);

        const r = new RegExp(tools.pattern2RegEx(pattern));
        const result = [];
        for (const id in this.dataset) {
            r.test(id) && result.push(id);
        }
        typeof callback === 'function' && callback(null, result);
    }

    subscribe(pattern, cb) {
        this.subscribeForClient(this.callbackSubscriptionClient, pattern, cb);
    }

    subscribeForClient(client, pattern, cb) {
        this.handleSubscribe(client, 'state', pattern, cb);
    }

    unsubscribe(pattern, cb) {
        this.unsubscribeForClient(this.callbackSubscriptionClient, pattern, cb);
    }

    unsubscribeForClient(client, pattern, cb) {
        this.handleUnsubscribe(client, 'state', pattern, cb);
    }

    /**
     * Register some instance as subscribable.
     * If some instance says, that it is subscribable, the instance can read every time (and at start)
     * all subscriptions to their states and will receive messages about changes of subscriptions
     *
     * @param instance name of instance
     * @param cb callback which says if subscription added or yet exists
     */
    registerAdapterSubs(instance, cb) {
        let added = false;
        if (this.adapterSubs.indexOf(instance) === -1) {
            this.adapterSubs.push(instance);
            this.adapterSubs.sort();
            added = true;
        }
        if (cb) cb(null, added);
    }

    /**
     * Unregister instance as subscribable.
     *
     * @param instance name of instance
     * @param cb callback which says if subscription removed or no
     */
    unregisterAdapterSubs(instance, cb) {
        const pos = this.adapterSubs.indexOf(instance);
        if (pos !== -1) {
            this.adapterSubs.splice(pos, 1);
        }
        if (cb) cb(null, pos !== -1);
    }

    pushMessage(id, state, callback) {
        //messagebox[id] = messagebox[id] || [];
        state._id = this.globalMessageId++;

        if (this.globalMessageId >= 0xFFFFFFFF) {
            this.globalMessageId = 0;
        }

        //messagebox[id].unshift(state);
        this.publishAll('messagebox', 'messagebox.' + id, state);
        typeof callback === 'function' && callback(null, id);
    }

    lenMessage(id, callback) {
        /*if (this.messagebox[id]) {
            typeof callback === 'function' && callback(null, this.messagebox[id].length);
        } else {*/
        typeof callback === 'function' && callback(tools.ERRORS.ERROR_NOT_FOUND, null);
        //}
    }

    getMessage(id, callback) {
        /*if (this.messagebox[id]) {
            typeof callback === 'function' && callback(null, this.messagebox[id].pop());
        } else {*/
        typeof callback === 'function' && callback(tools.ERRORS.ERROR_NOT_FOUND, null);
        //}
    }

    delMessage(id, messageId, callback) {
        /*if (this.messagebox[id]) {
            let found = false;
            for (let i = this.messagebox[id].length - 1; i >= 0; i--) {
                if (this.messagebox[id][i]._id === messageId) {
                    this.messagebox[id].splice(i, 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                console.log('WARNING: cannot find message with id = ' + messageId);
                this.log.error(this.namespace + ' WARNING: cannot find message with id = ' + messageId);
                typeof callback === 'function' && callback(tools.ERRORS.ERROR_NOT_FOUND);
            } else {
                typeof callback === 'function' && callback();
            }
        } else {*/
        typeof callback === 'function' && callback();
        //}
    }

    clearAllMessages(callback) {
        this.messagebox = {};
        typeof callback === 'function' && callback();
    }

    subscribeMessage(id, cb) {
        this.subscribeMessageForClient(this.callbackSubscriptionClient, id, cb);
    }

    subscribeMessageForClient(client, id, cb) {
        this.handleSubscribe(client, 'messagebox', 'messagebox.' + id, cb);
    }

    unsubscribeMessage(id, cb) {
        this.unsubscribeMessageForClient(this.callbackSubscriptionClient, id, cb);
    }

    unsubscribeMessageForClient(client, id, cb) {
        this.handleUnsubscribe(client, 'messagebox', 'messagebox.' + id, cb);
    }

    /**
     * @method pushLog
     * @param {String} id           the id of the logger.
     * @param {object} log          log object, looks like
     *      pushLog(id, {message: msg, severity: info|debug|warn|error, from: that.namespace, ts: Date.now()})
     *
     *      <ul><li><b>message</b>  the actual value. Can be any JSON-stringifiable object. If undefined the
     *                          value is kept unchanged.</li>
     *
     *      <li><b>severity</b>  a boolean that can be used to mark a value as confirmed, used in bidirectional systems which
     *                      acknowledge that a value has been successfully set. Will be set to false if undefined.</li>
     *
     *      <li><b>from</b>   a unix timestamp indicating the last write-operation on the state. Will be set by the
     *                      setState method if undefined.</li>
     *
     *      <li><b>ts</b>   a unix timestamp indicating the last change of the actual value. this should be undefined
     *                      when calling setState, it will be set by the setValue method itself.</li></ul>
     *
     * @param callback {Function}   will be called when confirmed reception of the command
     */
    pushLog(id, log, callback) {
        // do not store messages.
        //logs[id] = logs[id] || [];
        log._id = this.globalLogId++;
        if (this.globalLogId >= 0xFFFFFFFF) this.globalLogId = 0;
        //logs[id].unshift(state);
        //if (logs[id].length > settings.connection.maxQueue) {
        //    logs[id].splice(settings.connection.maxQueue - logs[id].length);
        //}
        this.publishAll('log', 'log.' + id, log);
        typeof callback === 'function' && callback(null, id);
    }

    lenLog(id, callback) {
        if (this.logs[id]) {
            typeof callback === 'function' && callback(null, this.logs[id].length, id);
        } else {
            typeof callback === 'function' && callback(tools.ERRORS.ERROR_NOT_FOUND, null, id);
        }
    }

    getLog(id, callback) {
        if (this.logs[id]) {
            typeof callback === 'function' && callback(null, this.logs[id].pop(), this.logs[id].length);
        } else {
            typeof callback === 'function' && callback(tools.ERRORS.ERROR_NOT_FOUND, null, 0);
        }
    }

    delLog(id, logId, callback) {
        if (this.logs[id]) {
            let found = false;
            for (let i = this.logs[id].length - 1; i >= 0; i--) {
                if (this.logs[id][i]._id === logId) {
                    this.logs[id].splice(i, 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                // Protection against too much lost IDs
                if (this.logs[id].length > 100) {
                    console.log('WARNING: cannot find logs with id = ' + logId);
                    this.log.error(this.namespace + ' WARNING: cannot find logs with id = ' + logId);
                    this.logs[id].splice(100, this.logs[id].length - 100);
                }
                typeof callback === 'function' && callback(tools.ERRORS.ERROR_NOT_FOUND);
            } else {
                typeof callback === 'function' && callback();
            }
        } else if (typeof callback === 'function') {
            callback(tools.ERRORS.ERROR_NOT_FOUND);
        }
    }

    clearAllLogs(callback) {
        this.logs = {};
        typeof callback === 'function' && callback();
    }

    subscribeLog(id, cb) {
        this.subscribeLogForClient(this.callbackSubscriptionClient, id, cb);
    }

    subscribeLogForClient(client, id, cb) {
        this.handleSubscribe(client, 'log', 'log.' + id, cb);
    }

    unsubscribeLog(id, cb) {
        this.unsubscribeLogForClient(this.callbackSubscriptionClient, id, cb);
    }

    unsubscribeLogForClient(client, id, cb) {
        this.handleUnsubscribe(client, 'log', 'log.' + id, cb);
    }

    getSession(id, callback) {
        typeof callback === 'function' && callback(this.session[id]);
    }

    setSession(id, expire, obj, callback) {
        this.session[id] = obj || {};

        if (this.sessionExpires[id]) {
            clearTimeout(this.sessionExpires[id]);
            delete this.sessionExpires[id]
        }

        this.sessionExpires[id] = setTimeout(() => this.expireSession(id), expire * 1000);

        this.session[id]._expire = true;

        typeof callback === 'function' && callback();
    }

    destroySession(id, callback) {
        if (this.session[id]) {
            delete this.session[id];
        }
        typeof callback === 'function' && callback();
    }

    setBinaryState(id, data, callback) {
        this.dataset[id] = data;
        typeof callback === 'function' && callback(null, id);
        if (!this.stateTimer) {
            this.stateTimer = setTimeout(() => this.saveState, 30000);
        }
    }

    getBinaryState(id, callback) {
        if (this.dataset[id]) {
            if (callback) callback(null, this.dataset[id]);
        } else {
            if (callback) callback('not exists');
        }
    }

    delBinaryState(id, callback) {
        if (this.dataset[id]) {
            delete this.dataset[id];
        }
        typeof callback === 'function' && callback(null, id);
    }
}

module.exports = StatesInMemoryFileDB;
