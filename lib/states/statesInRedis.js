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

const redis = require('redis');
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
        this.settings.namespace = this.settings.namespace || this.settings.hostname || '';

        this.client = null;
        this.clientBin = null;
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

        if (this.settings.connection.options) {
            if (this.settings.connection.options.retry_max_delay) {
                const retry_max_delay = this.settings.connection.options.retry_max_delay;
                // convert redis 0.1 options to redis 3.0
                this.settings.connection.options.retry_strategy = (_options) => {
                    // A function that receives an options object as parameter including the retry attempt,
                    // the total_retry_time indicating how much time passed since the last time connected,
                    // the error why the connection was lost and the number of times_connected in total.
                    // If you return a number from this function, the retry will happen exactly after that
                    // time in milliseconds. If you return a non-number, no further retry will happen and
                    // all offline commands are flushed with errors. Return an error to return that
                    // specific error to all offline commands.

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
            }
        }

        let ready = false;
        let initError = false;
        let ignoreErrors = false;

        if (this.settings.connection.port === 0) {
            // initiate a unix socket connection using the parameter 'host'
            this.client = redis.createClient(this.settings.connection.host, this.settings.connection.options);
        } else {
            this.client = redis.createClient(this.settings.connection.port, this.settings.connection.host, this.settings.connection.options);
        }

        this.client.on('error', error => {
            if (!ready) {
                // First stage for fallback: Ready check failed at the beginning
                if (!initError && !ignoreErrors && error.message.startsWith('Ready check failed')) {
                    initError = true;
                }
                // Second stage, seems we have a socket.io server
                else if (initError && !ignoreErrors && error.message.startsWith('Protocol error, got "H" as reply type byte.')) {
                    this.client.end(true);
                    ignoreErrors = true;
                    if (typeof originalSettings.connected === 'function') {
                        const StatesSocketIo = require('./statesInMemClientSocketIo');
                        new StatesSocketIo(originalSettings);
                    }
                }
                return;
            }
            if (typeof this.settings.disconnected === 'function') {
                this.settings.disconnected(error);
            } else {
                this.log.error(this.settings.namespace + ' ' + error.message);
                this.log.error(this.settings.namespace + ' ' + error.stack);
            }
        });

        this.client.on('ready', _error => {
            initError = false;
            ignoreErrors = false;

            if (!ready) {
                if (this.settings.connection.port === 0) {
                    // initiate a unix socket connection using the parameter 'host'
                    this.sub = redis.createClient(this.settings.connection.host, this.settings.connection.options);
                } else {
                    this.sub = redis.createClient(this.settings.connection.port, this.settings.connection.host, this.settings.connection.options);
                }

                if (typeof onChange === 'function') {
                    this.sub.on('pmessage', (pattern, channel, message) => {
                        this.log.debug(this.settings.namespace + ' redis pmessage ', pattern, channel, message);
                        try {
                            if (ioRegExp.test(channel)) {
                                onChange(channel.slice(this.namespaceRedis.length), message ? JSON.parse(message) : null);
                            } else {
                                onChange(channel, message ? JSON.parse(message) : null);
                            }
                        } catch (e) {
                            this.log.error(this.settings.namespace + ' pmessage ' + channel + ' ' + message + ' ' + e.message);
                            this.log.error(this.settings.namespace + ' ' + e.stack);
                        }
                    });
                }

                this.sub.on('error', error => {
                    this.log.error(this.settings.namespace + ' No redis connection: ' + error);
                });

                this.sub.on('ready', _error => {
                    if (this.settings.connection.port === 0) {
                        this.log.info(this.settings.namespace + ' States connected to redis: ' + this.settings.connection.host);
                    } else {
                        this.log.info(this.settings.namespace + ' States connected to redis: ' + this.settings.connection.host + ':' + this.settings.connection.port);
                    }
                });

                if (typeof this.settings.connected === 'function') this.settings.connected(this);
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
            if (err) this.log.warn(this.settings.namespace + ' ' + err);

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
            this.log.silly(this.settings.namespace + ' redis publish ' + this.namespaceRedis + id + ' ' + JSON.stringify(obj));
            this.client.publish(this.namespaceRedis + id, JSON.stringify(obj));

            // set object in redis
            if (expire) {
                //console.log('setex',this.namespaceRedis + id, expire, JSON.stringify(obj));
                this.client.setex(this.namespaceRedis + id, expire, JSON.stringify(obj), () =>
                    typeof callback === 'function' && callback());
            } else {
                //console.log('set',this.namespaceRedis + id, JSON.stringify(obj));
                this.client.set(this.namespaceRedis + id, JSON.stringify(obj), () =>
                    typeof callback === 'function' && callback());
            }
        });
    }

    // Used for restore function (do not call it)
    setRawState(id, state, callback) {
        this.client.set(this.namespaceRedis + id, JSON.stringify(state), () =>
            typeof callback === 'function' && callback());
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
                this.log.warn(this.settings.namespace + ' redis get ' + id + ', error - ' + err);
            } else {
                this.log.silly(this.settings.namespace + ' redis get ' + id + ' ok: ' + obj);
            }
            if (typeof callback === 'function') {
                callback(err, obj ? JSON.parse(obj) : null);
            }
        });
    }

    getStates(keys, callback, dontModify) {
        if (!keys) {
            if (callback) callback('no keys', null);
            return;
        }
        if (!keys.length) {
            if (callback) callback(null, []);
            return;
        }
        let _keys;
        if (!dontModify) {
            _keys = [];
            for (let i = 0; i < keys.length; i++) {
                _keys[i] = this.namespaceRedis + keys[i];
            }
        } else {
            _keys = keys;
        }
        this.client.mget(_keys, (err, obj) => {
            if (err) {
                this.log.warn(this.settings.namespace + ' redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length + ', err: ' + err);
            } else {
                this.log.silly(this.settings.namespace + ' redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length);
            }
            if (typeof callback === 'function') callback(err, obj);
        });
    }

    // Destructor of the class. Called by shutting down.
    destroy() {
        if (this.client) {
            try {
                this.client.quit();
            } catch (e) {
                // ignore error
            }

            this.client = null;
        }
        if (this.sub) {
            this.sub.quit();
            this.sub = null;
        }
    }

    delState(id, callback) {
        this.client.del(this.namespaceRedis + id, err => {
            if (err) {
                this.log.warn(this.settings.namespace + ' redis del ' + id + ', error - ' + err);
            } else {
                this.client.publish(this.namespaceRedis + id, 'null');
                this.log.silly(this.settings.namespace + ' redis del ' + id + ', ok');
            }
            if (typeof callback === 'function') callback(err);
        });
    }

    getKeys(pattern, callback, dontModify) {
        this.client.keys(this.namespaceRedis + pattern, (err, obj) => {
            this.log.silly(this.settings.namespace + ' redis keys ' + obj.length + ' ' + pattern);
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
        this.log.silly(this.settings.namespace + ' redis psubscribe ' + this.namespaceRedis + pattern);
        this.sub.psubscribe(this.namespaceRedis + pattern, err => typeof callback === 'function' && callback(err));
    }

    unsubscribe(pattern, callback) {
        this.log.silly(this.settings.namespace + ' redis punsubscribe ' + this.namespaceRedis + pattern);
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
                for (let i = 0; i < obj.length; i++) {
                    this.log.silly('redis clear message for ' + obj[i]);
                    this.client.del(obj[i]);
                }
            }

            if (typeof callback === 'function') callback(err);
        });
    }

    subscribeMessage(id, callback) {
        if (id && id[0] === '.') id = id.substring(1);
        this.log.silly('redis subscribeMessage ' + this.namespaceMsg + id);
        this.sub.psubscribe(this.namespaceMsg + id, err => typeof callback === 'function' && callback(err));
    }

    unsubscribeMessage(id, callback) {
        if (id && id[0] === '.') id = id.substring(1);
        this.log.silly('redis unsubscribeMessage ' + this.namespaceMsg + id);
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
                for (let i = 0; i < obj.length; i++) {
                    this.log.silly(this.settings.namespace + ' redis clear log for ' + obj[i]);
                    this.client.del(obj[i]);
                }
            }

            if (typeof callback === 'function') {
                callback(err);
            }
        });
    }

    subscribeLog(id, callback) {
        this.log.silly(this.settings.namespace + ' redis subscribeMessage ' + this.namespaceLog + id);
        this.sub.psubscribe(this.namespaceLog + id, (err) => {
            if (typeof callback === 'function') callback(err);
        });
    }

    unsubscribeLog(id, callback) {
        this.log.silly(this.settings.namespace + ' redis unsubscribeMessage ' + this.namespaceLog + id);
        this.sub.punsubscribe(this.namespaceLog + id, (err) => {
            if (typeof callback === 'function') callback(err);
        });
    }

    getSession(id, callback) {
        this.client.get(this.namespaceSession + id, (_err, obj) => {
            this.log.silly(this.settings.namespace + ' redis get ' + id + ' ' + obj);
            if (typeof callback === 'function') callback(obj ? JSON.parse(obj) : null);
        });
    }

    setSession(id, expire, obj, callback) {
        this.client.setex(this.namespaceSession + id, expire, JSON.stringify(obj), err => {
            this.log.silly(this.settings.namespace + ' redis setex', id, expire, obj);
            typeof callback === 'function' && callback(err);
        });
    }

    destroySession(id, callback) {
        id = this.namespaceSession + id;
        this.log.silly(this.settings.namespace + ' redis del ' + id);
        this.client.del(id, () => typeof callback === 'function' && callback());
    }

    _createBinaryClient() {
        if (!this.clientBin) {
            this.settings.connection.options = this.settings.connection.options || {};
            const opt = JSON.parse(JSON.stringify(this.settings.connection.options));
            opt.return_buffers = true;
            if (this.settings.connection.port === 0) {
                // initiate a unix socket connection using the parameter 'host'
                this.clientBin = redis.createClient(this.settings.connection.host, opt);
            } else {
                this.clientBin = redis.createClient(this.settings.connection.port, this.settings.connection.host, opt);
            }
        }
    }

    setBinaryState(id, data, callback) {
        if (!this.clientBin) this._createBinaryClient ();
        this.clientBin.set(id, data, callback);
    }

    getBinaryState(id, callback) {
        if (!this.clientBin) this._createBinaryClient ();
        this.clientBin.get(id, (err, data) => {
            if (!err && data) {
                if (callback) callback(err, Buffer.from(data, 'binary'));
            } else {
                if (callback) callback(err);
            }
        });
    }

    delBinaryState(id, callback) {
        if (!this.clientBin) this._createBinaryClient ();
        this.clientBin.del(id, () => typeof callback === 'function' && callback());
    }
}

module.exports = StateRedis;
