/**
 *      States DB in redis - Client
 *
 *      Copyright 2013-2018 bluefox <dogafox@gmail.com>
 *      Copyright 2013-2014 hobbyquaker
 *
 *      MIT License
 *
 */
/** @module statesRedis */

/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
'use strict';

const Redis = require('ioredis');
const tools = {
    ERRORS: {
        ERROR_NOT_FOUND: 'Not exists'
    }
};

class StateRedis {

    constructor(settings) {
        const originalSettings = settings;
        this.settings = settings || {};
        this.namespaceRedis = (this.settings.redisNamespace || 'io') + '.';
        this.namespaceMsg = (this.settings.namespaceMsg || 'messagebox') + '.';
        this.namespaceLog = (this.settings.namespaceLog || 'log') + '.';
        this.namespaceSession = (this.settings.namespaceSession || 'session') + '.';
        const onChange = this.settings.change; // on change handler
        this.globalMessageId = Math.round(Math.random() * 100000000);
        this.globalLogId = Math.round(Math.random() * 100000000);
        this.namespace = this.settings.namespace || this.settings.hostname || '';

        this.stop = false;
        this.client = null;
        this.sub = null;
        const ioRegExp = new RegExp('^' + this.namespaceRedis);

        this.log = this.settings.logger;
        if (!this.log) {
            this.log = {
                silly: function (_msg) {/* console.log(msg); */
                },
                debug: function (_msg) {/* console.log(msg); */
                },
                info: function (_msg) {/* console.log(msg); */
                },
                warn: function (msg) {
                    console.log(msg);
                },
                error: function (msg) {
                    console.log(msg);
                }
            };
        } else if (!this.log.silly) {
            this.log.silly = this.log.debug;
        }

        this.settings.connection = this.settings.connection || {};

        // limit max number of log entries in the list
        this.settings.connection.maxQueue = this.settings.connection.maxQueue || 1000;

        this.settings.connection.options = this.settings.connection.options || {};
        const retry_max_delay = this.settings.connection.options.retry_max_delay || 2000;
        // convert redis 0.1 options to redis 3.0
        this.settings.connection.options.retryStrategy = (_options) => {
            if (!ready && initError && ignoreErrors) return new Error('No more tries');
            if (this.stop) return new Error('Client has stopped ... no retries anymore');
            // A function that receives an options object as parameter including the retry attempt,
            // the total_retry_time indicating how much time passed since the last time connected,
            // the error why the connection was lost and the number of times_connected in total.
            // If you return a number from this function, the retry will happen exactly after that
            // time in milliseconds. If you return a non-number, no further retry will happen and
            // all offline commands are flushed with errors. Return an error to return that
            // specific error to all offline commands.

            if (!ready) return 300;
            return retry_max_delay;
            /*if (options.error.code === 'ECONNREFUSED') {
                // End reconnecting on a specific error and flush all commands with a individual error
                return new Error('The server refused the connection');
            }
            if (options.total_retry_time > 1000 * 60 * 60) {
                // End reconnecting after a specific timeout and flush all commands with a individual error
                return new Error('Retry time exhausted');
            }
            if (options.times_connected > 10) {
                // End reconnecting with built in error
                return undefined;
            }
            // reconnect after
            return Math.max(options.attempt * 100, 3000);*/
        };
        delete this.settings.connection.options.retry_max_delay;
        this.settings.connection.options.enableReadyCheck = true;

        let ready = false;
        let initError = false;
        let ignoreErrors = false;
        let connected = false;
        let reconnectCounter = 0;

        if (this.settings.connection.port === 0) { // Port = 0 means unix socket
            // initiate a unix socket connection
            this.settings.connection.options.path = this.settings.connection.host;
            this.log.debug(this.namespace + ' Redis States: Use File Socket for connection: ' + this.settings.connection.options.path);
        } else if (Array.isArray(this.settings.connection.host)) { // Host is an array means we use a sentinel
            const defaultPort = Array.isArray(this.settings.connection.port) ? null : this.settings.connection.port;
            this.settings.connection.options.sentinels = this.settings.connection.host.map((redisNode, idx) => ({
                host: redisNode,
                port: defaultPort || this.settings.connection.port[idx]
            }));
            this.settings.connection.options.name = this.settings.connection.sentinelName ? this.settings.connection.sentinelName : 'mymaster';
            this.log.debug(this.namespace + ' Redis States: Use Sentinel for connection: ' + this.settings.connection.options.name + ', ' + JSON.stringify(this.settings.connection.options.sentinels));
        } else {
            this.settings.connection.options.host = this.settings.connection.host;
            this.settings.connection.options.port = this.settings.connection.port;
            this.log.debug(this.namespace + ' Redis States: Use Redis connection: ' + this.settings.connection.options.host + ':' + this.settings.connection.options.port);
        }
        this.client = new Redis(this.settings.connection.options);

        const fallbackToSocketIo = () => {
            this.stop = true;
            this.client.disconnect();
            ignoreErrors = true;

            this.log.silly(this.namespace + ' Initiate Fallback to socket.io States');
            const StatesSocketIo = require('./statesInMemClientSocketIo');
            const _newStates = new StatesSocketIo(originalSettings);
        };

        this.client.on('error', error => {
            if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' Redis ERROR States: (' + ignoreErrors + '/' + this.stop + ') ' + error.message + ' / ' + error.stack);
            if (this.stop) return;
            if (!ready) {
                initError = true;
                // Seems we have a socket.io server
                if (!ignoreErrors && error.message.startsWith('Protocol error, got "H" as reply type byte.')) {
                    fallbackToSocketIo();
                }
                return;
            }
            if (typeof this.settings.disconnected === 'function') {
                this.settings.disconnected(error);
            } else {
                this.log.error(this.namespace + ' ' + error.message);
                this.log.error(this.namespace + ' ' + error.stack);
            }
        });

        this.client.on('end', () => {
            if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' States-Redis Event end (stop=' + this.stop + ')');
            if (ready && typeof this.settings.disconnected === 'function') this.settings.disconnected();
        });

        this.client.on('connect', () => {
            if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' States-Redis Event connect (stop=' + this.stop + ')');
            connected = true;
        });

        this.client.on('close', () => {
            if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' States-Redis Event close (stop=' + this.stop + ')');
            if (ready && typeof this.settings.disconnected === 'function') this.settings.disconnected();
        });

        this.client.on('reconnecting', () => {
            if (connected && !ready && !initError && !ignoreErrors) reconnectCounter++;
            if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' States-Redis Event reconnect (reconnectCounter=' + reconnectCounter + ', stop=' + this.stop + ')');
            if (reconnectCounter > 2) { // fallback logic for nodejs <10
                fallbackToSocketIo();
                return;
            }
            connected = false;
            initError = false;
        });
        this.client.on('ready', () => {
            if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' States-Redis Event ready (stop=' + this.stop + ')');
            if (this.stop) return;
            initError = false;
            ignoreErrors = false;

            if (!ready && !this.sub) {
                this.sub = new Redis(this.settings.connection.options);

                if (typeof onChange === 'function') {
                    this.sub.on('pmessage', (pattern, channel, message) => {
                        this.log.silly(this.namespace + ' redis pmessage ', pattern, channel, message);
                        try {
                            if (ioRegExp.test(channel)) {
                                onChange(channel.slice(this.namespaceRedis.length), message ? JSON.parse(message) : null);
                            } else {
                                onChange(channel, message ? JSON.parse(message) : null);
                            }
                        } catch (e) {
                            this.log.warn(this.namespace + ' pmessage ' + channel + ' ' + message + ' ' + e.message);
                            this.log.warn(this.namespace + ' ' + e.stack);
                        }
                    });
                }

                this.sub.on('error', error => {
                    if (this.stop) return;
                    if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' Sub-Client States No redis connection: ' + JSON.stringify(error));
                });

                this.sub.on('ready', _error => {
                    if (this.settings.connection.port === 0) {
                        this.log.debug(this.namespace + ' States connected to redis: ' + this.settings.connection.host);
                    } else {
                        this.log.debug(this.namespace + ' States connected to redis: ' + this.settings.connection.host + ':' + this.settings.connection.port);
                    }
                });

                typeof this.settings.connected === 'function' && this.settings.connected(this);
                ready = true;
            }
        });
    }

    getStatus() {
        return {type: 'redis', server: false};
    }

    /**
     * @method setState
     * @param id {String}           the id of the value. '<this.namespaceRedis>.' will be prepended
     * @param state {any}
     *
     *
     *      an object containing the actual value and some metadata:<br>
     *      setState(id, {'val': val, 'ts': ts, 'ack': ack, 'from': from, 'lc': lc, 'user': user})
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

        if (!this.client) {
            return callback && callback('Closed');
        }

        let expire;
        if (state.expire) {
            expire = state.expire;
            delete state.expire;
        }
        //var that = this;
        const obj = {};

        if (typeof state !== 'object') {
            state = {
                val: state
            };
        }

        this.client.get(this.namespaceRedis + id, (err, oldObj) => {
            if (!this.client) return;
            // TODO Error Handling
            if (err) {
                this.log.warn(this.namespace + ' get state ' + err);
                typeof callback === 'function' && callback(err, id);
                return;
            }

            if (!oldObj) {
                oldObj = {};
            } else {
                try {
                    oldObj = JSON.parse(oldObj);
                } catch (e) {
                    oldObj = {val: null};
                }
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
                obj.ts = (new Date()).getTime();
            }

            if (state.q !== undefined) {
                obj.q = state.q;
            } else {
                obj.q = 0;
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

            // publish event in redis
            if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis publish ' + this.namespaceRedis + id + ' ' + JSON.stringify(obj));
            this.client.publish(this.namespaceRedis + id, JSON.stringify(obj));

            // set object in redis
            if (expire) {
                this.client.setex(this.namespaceRedis + id, expire, JSON.stringify(obj), err =>
                    typeof callback === 'function' && callback(err, id));
            } else {
                this.client.set(this.namespaceRedis + id, JSON.stringify(obj), err =>
                    typeof callback === 'function' && callback(err, id));
            }
        });
    }

    // Used for restore function (do not call it)
    setRawState(id, state, callback) {
        this.client.set(this.namespaceRedis + id, JSON.stringify(state), err =>
            typeof callback === 'function' && callback(err, id));
    }

    /**
     * @method getState
     *
     * @param {String} id
     * @param callback
     */
    getState(id, callback) {
        this.client.get(this.namespaceRedis + id, (err, obj) => {
            if (err) {
                this.log.warn(this.namespace + ' redis get ' + id + ', error - ' + err);
            } else {
                if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis get ' + id + ' ok: ' + obj);
            }
            if (typeof callback === 'function') {
                callback(err, obj ? JSON.parse(obj) : null);
            }
        });
    }

    getStates(keys, callback, dontModify) {
        if (typeof callback !== 'function') {
            this.log.warn(this.settings.namespace + ' redis getStates no callback');
            return;
        }
        if (!keys) {
            return callback('no keys', null);
        }
        if (!keys.length) {
            return callback(null, []);
        }
        let _keys;
        if (!dontModify) {
            _keys = keys.map(k => this.namespaceRedis + k);
        } else {
            _keys = keys;
        }
        this.client.mget(_keys, (err, obj) => {
            if (err) {
                this.log.warn(this.namespace + ' redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length + ', err: ' + err);
            } else {
                this.settings.enhancedLogging && this.log.silly(this.namespace + ' redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length);
            }
            callback(err, obj);
        });
    }

    // Destructor of the class. Called by shutting down.
    destroy() {
        this.stop = true;
        if (this.client) {
            try {
                this.client.disconnect();
            } catch (e) {
                // ignore error
            }
            this.client = null;
        }
        if (this.sub) {
            try {
                this.sub.disconnect();
            } catch (e) {
                // ignore error
            }
            this.sub = null;
        }
    }

    delState(id, callback) {
        this.client.del(this.namespaceRedis + id, err => {
            if (err) {
                this.log.warn(this.namespace + ' redis del ' + id + ', error - ' + err);
            } else {
                this.client.publish(this.namespaceRedis + id, 'null');
                if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis del ' + id + ', ok');
            }
            if (typeof callback === 'function') callback(err, id);
        });
    }

    getKeys(pattern, callback, dontModify) {
        this.client.keys(this.namespaceRedis + pattern, (err, obj) => {
            if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis keys ' + obj.length + ' ' + pattern);
            if (typeof callback === 'function') {
                if (obj && !dontModify) {
                    const len = this.namespaceRedis.length;
                    for (let i = 0; i < obj.length; i++) {
                        obj[i] = obj[i].substring(len);
                    }
                }
                callback(err, obj);
            }
        });
    }

    /**
     * @method subscribe
     *
     * @param pattern
     * @param {function} callback callback function (optional)
     */
    subscribe(pattern, callback) {
        if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis psubscribe ' + this.namespaceRedis + pattern);
        this.sub.psubscribe(this.namespaceRedis + pattern, err => typeof callback === 'function' && callback(err));
    }

    unsubscribe(pattern, callback) {
        if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis punsubscribe ' + this.namespaceRedis + pattern);
        this.sub.punsubscribe(this.namespaceRedis + pattern, err => typeof callback === 'function' && callback(err));
    }

    pushMessage(id, state, callback) {
        state._id = this.globalMessageId++;
        if (this.globalMessageId >= 0xFFFFFFFF) this.globalMessageId = 0;
        this.client.publish(this.namespaceMsg + id, JSON.stringify(state));
        if (typeof callback === 'function') callback(null, id);
    }

    // todo: delete it
    lenMessage(id, callback) {
        if (typeof callback === 'function') callback(null, 0, id);
    }

    // todo: delete it
    getMessage(id, callback) {
        if (typeof callback === 'function') callback(null, null, id);
    }

    // todo: delete it
    delMessage(id, _messageId, callback) {
        if (typeof callback === 'function') callback(null, id);
    }

    // todo: delete it
    clearAllMessages(callback) {
        this.client.keys(this.namespaceLog + '*', (err, obj) => {
            if (obj) {
                for (const o of obj) {
                    if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis clear message for ' + o);
                    this.client.del(o);
                }
            }

            if (typeof callback === 'function') callback(err);
        });
    }

    subscribeMessage(id, callback) {
        if (id && id[0] === '.') id = id.substring(1);
        if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis subscribeMessage ' + this.namespaceMsg + id);
        this.sub.psubscribe(this.namespaceMsg + id, err => typeof callback === 'function' && callback(err));
    }

    unsubscribeMessage(id, callback) {
        if (id && id[0] === '.') id = id.substring(1);
        if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis unsubscribeMessage ' + this.namespaceMsg + id);
        this.sub.punsubscribe(this.namespaceMsg + id, err => typeof callback === 'function' && callback(err));
    }

    pushLog(id, log, callback) {
        log._id = this.globalLogId++;
        if (this.globalLogId >= 0xFFFFFFFF) this.globalLogId = 0;
        this.client.publish(this.namespaceLog + id, JSON.stringify(log));
        if (typeof callback === 'function') callback(null, id);
    }

    // todo: delete it
    lenLog(id, callback) {
        if (typeof callback === 'function') callback(tools.ERRORS.ERROR_NOT_FOUND, 0, id);
        // this.client.llen(this.namespaceLog + id, (err, obj) => {
        //    if (typeof callback === 'function') callback(err, obj, id);
        // });
    }

    // todo: delete it
    getLog(_id, callback) {
        if (typeof callback === 'function') {
            callback(tools.ERRORS.ERROR_NOT_FOUND, null, 0);
        }
    }

    // todo: delete it
    delLog(_id, _logId, callback) {
        if (typeof callback === 'function') {
            callback(tools.ERRORS.ERROR_NOT_FOUND);
        }
    }

    // todo: delete it
    clearAllLogs(callback) {
        this.client.keys(this.namespaceLog + '*', (err, obj) => {
            if (obj) {
                for (const o of obj) {
                    if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis clear log for ' + o);
                    this.client.del(o);
                }
            }

            if (typeof callback === 'function') {
                callback(err);
            }
        });
    }

    subscribeLog(id, callback) {
        if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis subscribeMessage ' + this.namespaceLog + id);
        this.sub.psubscribe(this.namespaceLog + id, (err) => {
            if (typeof callback === 'function') callback(err);
        });
    }

    unsubscribeLog(id, callback) {
        if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis unsubscribeMessage ' + this.namespaceLog + id);
        this.sub.punsubscribe(this.namespaceLog + id, (err) => {
            if (typeof callback === 'function') callback(err);
        });
    }

    getSession(id, callback) {
        this.client.get(this.namespaceSession + id, (_err, obj) => {
            if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis get ' + id + ' ' + obj);
            typeof callback === 'function' && callback(obj ? JSON.parse(obj) : null);
        });
    }

    setSession(id, expire, obj, callback) {
        this.client.setex(this.namespaceSession + id, expire, JSON.stringify(obj), err => {
            if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis setex', id, expire, obj);
            typeof callback === 'function' && callback(err);
        });
    }

    destroySession(id, callback) {
        id = this.namespaceSession + id;
        if (this.settings.enhancedLogging) this.log.silly(this.namespace + ' redis del ' + id);
        this.client.del(id, err => typeof callback === 'function' && callback(err));
    }

    setBinaryState(id, data, callback) {
        if (!Buffer.isBuffer(data)) {
            data = Buffer.from(data);
        }
        this.client.set(this.namespaceRedis + id, data, callback);
    }

    getBinaryState(id, callback) {
        this.client.getBuffer(this.namespaceRedis + id, (err, data) => {
            if (!err && data) {
                if (callback) callback(err, Buffer.from(data, 'binary'));
            } else {
                if (callback) callback(err);
            }
        });
    }

    delBinaryState(id, callback) {
        this.client.del(this.namespaceRedis + id, err => typeof callback === 'function' && callback(err, id));
    }
}

module.exports = StateRedis;
