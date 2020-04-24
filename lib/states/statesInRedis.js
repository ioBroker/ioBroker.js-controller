/**
 *      States DB in redis - Client
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>
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
const tools = require('../tools.js');
const { isDeepStrictEqual } = require('util');

/**
 *
 */
function bufferJsonDecoder(key, value) {
    if (value && typeof value === 'object' && typeof value.type === 'string' && value.type === 'Buffer' && value.data && Array.isArray(value.data)) {
        return Buffer.from(value.data);
    }
    return value;
}

class StateRedis {

    constructor(settings) {
        this.settings = settings || {};
        this.namespaceRedis = (this.settings.redisNamespace || 'io') + '.';
        this.namespaceRedisL = this.namespaceRedis.length;
        this.namespaceMsg = (this.settings.namespaceMsg || 'messagebox') + '.';
        this.namespaceLog = (this.settings.namespaceLog || 'log') + '.';
        this.namespaceSession = (this.settings.namespaceSession || 'session') + '.';

        const onChange = this.settings.change; // on change handler
        const onChangeUser = this.settings.changeUser; // on change handler for User events

        this.globalMessageId = Math.round(Math.random() * 100000000);
        this.globalLogId = Math.round(Math.random() * 100000000);
        this.namespace = this.settings.namespace || this.settings.hostname || '';

        this.stop = false;
        this.client = null;
        this.sub = null;
        this.subSystem = null;
        const ioRegExp = new RegExp('^' + this.namespaceRedis.replace(/\./g, '\\.') + '[_A-Za-z0-9ÄÖÜäöüа-яА-Я]+'); // io.[_A-Za-z0-9]+

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
        const retry_max_count = this.settings.connection.options.retry_max_count || 19;
        this.settings.connection.options.retryStrategy = reconnectCount => {
            if (!ready && initError) {
                return new Error('No more tries');
            }
            if (this.stop) {
                return new Error('Client has stopped ... no retries anymore');
            }
            if (ready && reconnectCount >= retry_max_count) {
                return new Error('Stop trying to reconnect');
            }
            // A function that receives an options object as parameter including the retry attempt,
            // the total_retry_time indicating how much time passed since the last time connected,
            // the error why the connection was lost and the number of times_connected in total.
            // If you return a number from this function, the retry will happen exactly after that
            // time in milliseconds. If you return a non-number, no further retry will happen and
            // all offline commands are flushed with errors. Return an error to return that
            // specific error to all offline commands.

            if (!ready) {
                return 300;
            }
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
        if (this.settings.connection.options.db === undefined) {
            this.settings.connection.options.db = 0;
        }
        if (this.settings.connection.options.family === undefined) {
            this.settings.connection.options.family = 0;
        }
        this.settings.connection.options.password = this.settings.connection.pass || null;
        this.settings.connection.options.autoResubscribe = false; // We do our own resubscribe because other sometimes not work

        this.client = new Redis(this.settings.connection.options);

        this.client.on('error', error => {
            this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} Redis ERROR States: (${this.stop}) ${error.message} / ${error.stack}`);
            if (this.stop) {
                return;
            }
            if (!ready) {
                initError = true;
                // Seems we have a socket.io server
                if (error.message.startsWith('Protocol error, got "H" as reply type byte.')) {
                    this.log.error('Could not connect database at ' + this.settings.connection.options.host + ':' + this.settings.connection.options.port + ' (invalid protocol). Please make sure the configured IP and port points to a host running JS-Controller >= 2.0.');
                }
                return;
            }
            this.log.error(this.namespace + ' ' + error.message);
        });

        this.client.on('end', () => {
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' States-Redis Event end (stop=' + this.stop + ')');
            if (ready && typeof this.settings.disconnected === 'function') {
                this.settings.disconnected();
            }
        });

        this.client.on('connect', () => {
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' States-Redis Event connect (stop=' + this.stop + ')');
            connected = true;
        });

        this.client.on('close', () => {
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' States-Redis Event close (stop=' + this.stop + ')');
            //if (ready && typeof this.settings.disconnected === 'function') this.settings.disconnected();
        });

        this.client.on('reconnecting', () => {
            if (connected && !ready && !initError) {
                reconnectCounter++;
            }
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' States-Redis Event reconnect (reconnectCounter=' + reconnectCounter + ', stop=' + this.stop + ')');
            if (reconnectCounter > 2) { // fallback logic for nodejs <10
                this.log.error('Socket.io Server detected. Please update to js-controller 2.0 or higher!');
                return;
            }
            connected = false;
            initError = false;
        });

        this.client.on('ready', () => {
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' States-Redis Event ready (stop=' + this.stop + ')');
            if (this.stop) {
                return;
            }
            initError = false;

            let initCounter = 0;
            if (!this.subSystem && typeof onChange === 'function') {
                initCounter++;
                this.client.config('set', ['notify-keyspace-events', 'Exe'], err => { // enable Expiry/Evicted events in server
                    if (err) {
                        this.log.warn('Unable to enable Expiry Keyspace events from Redis Server: ' + err);
                    }

                    this.log.debug(this.namespace + ' States create System PubSub Client');
                    this.subSystem = new Redis(this.settings.connection.options);
                    this.subSystem.ioBrokerSubscriptions = {};

                    if (typeof onChange === 'function') {
                        this.subSystem.on('pmessage', (pattern, channel, message) => {
                            setImmediate(() => {
                                this.log.silly(this.namespace + ' States system redis pmessage ' + pattern + '/' + channel + ':' + message);

                                try {
                                    message = message ? JSON.parse(message, message.includes('"Buffer"') ? bufferJsonDecoder: undefined) : null;
                                } catch (e) {
                                    this.log.warn(this.namespace + ' Cannot parse system pmessage "' + message + '"');
                                    message = null;
                                }

                                try {
                                    if (ioRegExp.test(channel)) {
                                        onChange(channel.substring(this.namespaceRedisL), message);
                                    } else {
                                        onChange(channel, message);
                                    }
                                } catch (e) {
                                    this.log.warn(this.namespace + ' States system pmessage ' + channel + ' ' + JSON.stringify(message) + ' ' + e.message);
                                    this.log.warn(this.namespace + ' ' + e.stack);
                                }
                            });
                        });
                    }
                    if (typeof onChange === 'function' || typeof onChangeUser === 'function') {
                        // subscribe on key expired or evicted (auto removed because of memory full) message
                        this.subSystem.on('message', (channel, message) =>
                            setImmediate(() => {
                                this.log.silly(this.namespace + ' redis message expired/evicted ' + channel + ':' + message);
                                try {
                                    if (channel === '__keyevent@' + this.settings.connection.options.db + '__:evicted') {
                                        this.log.warn(this.namespace + ' Redis has evicted state ' + message + '. Please check your maxMemory settings for your redis instance!');
                                    } else if (channel !== '__keyevent@' + this.settings.connection.options.db + '__:expired') {
                                        this.log.warn(this.namespace + ' Unknown user message ' + channel + ' ' + message);
                                        return;
                                    }
                                    if (typeof onChange === 'function') {
                                        // Find deleted states and notify user
                                        const found = Object.values(this.subSystem.ioBrokerSubscriptions).find(regex => regex !== true && regex.test(message));
                                        found && onChange(message.substring(this.namespaceRedisL), null);
                                    }
                                    if (typeof onChangeUser === 'function' && this.sub) {
                                        // Find deleted states and notify user
                                        const found = Object.values(this.sub.ioBrokerSubscriptions).find(regex => regex !== true && regex.test(message));
                                        found && onChangeUser(message.substring(this.namespaceRedisL), null);
                                    }
                                } catch (e) {
                                    this.log.warn(this.namespace + ' user message ' + channel + ' ' + message + ' ' + e.message);
                                    this.log.warn(this.namespace + ' ' + e.stack);
                                }
                            }));
                    }
                    this.subSystem.on('end', () => {
                        this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' States-Redis System Event end sub (stop=' + this.stop + ')');
                        ready && typeof this.settings.disconnected === 'function' && this.settings.disconnected();
                    });

                    this.subSystem.on('error', error => {
                        if (this.stop) {
                            return;
                        }
                        this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' Sub-Client States System No redis connection: ' + JSON.stringify(error));
                    });

                    if (this.settings.connection.enhancedLogging) {
                        this.subSystem.on('connect', () =>
                            this.log.silly(this.namespace + ' PubSub client States-Redis System Event connect (stop=' + this.stop + ')'));

                        this.subSystem.on('close', () =>
                            this.log.silly(this.namespace + ' PubSub client States-Redis System Event close (stop=' + this.stop + ')'));

                        this.subSystem.on('reconnecting', reconnectCounter =>
                            this.log.silly(this.namespace + ' PubSub client States-Redis System Event reconnect (reconnectCounter=' + reconnectCounter + ', stop=' + this.stop + ')'));
                    }

                    this.subSystem.on('ready', _error => {
                        this.subSystem && this.subSystem.subscribe('__keyevent@' + this.settings.connection.options.db + '__:expired', err => {
                            err && this.log.warn('Unable to subscribe to expiry Keyspace events from Redis Server: ' + err);

                            this.subSystem && this.subSystem.subscribe('__keyevent@' + this.settings.connection.options.db + '__:evicted', err => {
                                err && this.log.warn('Unable to subscribe to evicted Keyspace events from Redis Server: ' + err);

                                if (--initCounter < 1) {
                                    if (this.settings.connection.port === 0) {
                                        this.log.debug(this.namespace + ' States ' + (ready ? 'system re' : '') + 'connected to redis: ' + this.settings.connection.host);
                                    } else {
                                        this.log.debug(this.namespace + ' States ' + (ready ? 'system re' : '') + 'connected to redis: ' + this.settings.connection.host + ':' + this.settings.connection.port);
                                    }
                                    !ready && typeof this.settings.connected === 'function' && this.settings.connected(this);
                                    ready = true;
                                }
                                this.subSystem && Object.keys(this.subSystem.ioBrokerSubscriptions).forEach(sub => this.subSystem.psubscribe(sub));
                            });
                        });
                    });
                });
            }

            if (!this.sub && typeof onChangeUser === 'function') {
                initCounter++;

                this.log.debug(this.namespace + ' States create User PubSub Client');
                this.sub = new Redis(this.settings.connection.options);
                this.sub.ioBrokerSubscriptions = {};

                this.sub.on('pmessage', (pattern, channel, message) => {
                    setImmediate(() => {
                        this.log.silly(this.namespace + ' States user redis pmessage ' + pattern + '/' + channel + ':' + message);

                        try {
                            message = message ? JSON.parse(message, message.includes('"Buffer"') ? bufferJsonDecoder: undefined) : null;
                        } catch (e) {
                            this.log.warn(this.namespace + ' Cannot parse user pmessage "' + message + '"');
                            message = null;
                        }

                        try {
                            if (ioRegExp.test(channel)) {
                                onChangeUser(channel.substring(this.namespaceRedisL), message);
                            } else {
                                onChangeUser(channel, message);
                            }
                        } catch (e) {
                            this.log.warn(this.namespace + ' States user pmessage ' + channel + ' ' + JSON.stringify(message) + ' ' + e.message);
                            this.log.warn(this.namespace + ' ' + e.stack);
                        }
                    });
                });

                this.sub.on('end', () => {
                    this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' States-Redis User Event end sub (stop=' + this.stop + ')');
                    if (ready && typeof this.settings.disconnected === 'function') {
                        this.settings.disconnected();
                    }
                });

                this.sub.on('error', error => {
                    if (this.stop) {
                        return;
                    }
                    if (this.settings.connection.enhancedLogging) {
                        this.log.silly(this.namespace + ' Sub-Client States User No redis connection: ' + JSON.stringify(error));
                    }
                });

                if (this.settings.connection.enhancedLogging) {
                    this.sub.on('connect', () => {
                        this.log.silly(this.namespace + ' PubSub client States-Redis User Event connect (stop=' + this.stop + ')');
                    });

                    this.sub.on('close', () => {
                        this.log.silly(this.namespace + ' PubSub client States-Redis User Event close (stop=' + this.stop + ')');
                    });

                    this.sub.on('reconnecting', reconnectCounter => {
                        this.log.silly(this.namespace + ' PubSub client States-Redis User Event reconnect (reconnectCounter=' + reconnectCounter + ', stop=' + this.stop + ')');
                    });
                }

                this.sub.on('ready', _error => {
                    if (--initCounter < 1) {
                        if (this.settings.connection.port === 0) {
                            this.log.debug(this.namespace + ' States ' + (ready ? 'user re' : '') + 'connected to redis: ' + this.settings.connection.host);
                        } else {
                            this.log.debug(this.namespace + ' States ' + (ready ? 'user re' : '') + 'connected to redis: ' + this.settings.connection.host + ':' + this.settings.connection.port);
                        }
                        !ready && typeof this.settings.connected === 'function' && this.settings.connected(this);
                        ready = true;
                    }
                    this.sub && Object.keys(this.sub.ioBrokerSubscriptions).forEach(sub => this.sub.psubscribe(sub));
                });
            }

            if (initCounter < 1) {
                if (this.settings.connection.port === 0) {
                    this.log.debug(this.namespace + ' States ' + (ready ? 'client re' : '') + 'connected to redis: ' + this.settings.connection.host);
                } else {
                    this.log.debug(this.namespace + ' States ' + (ready ? 'client re' : '') + 'connected to redis: ' + this.settings.connection.host + ':' + this.settings.connection.port);
                }
                !ready && typeof this.settings.connected === 'function' && this.settings.connected(this);
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
     * @param callback {function(String, String):void}   will be called when redis confirmed reception of the command
     */
    setState(id, state, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.client) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        const obj = {};

        if (typeof state !== 'object') {
            state = {
                val: state
            };
        }

        let expire;
        if (state.expire) {
            expire = state.expire;
            delete state.expire;
        }

        this.client.get(this.namespaceRedis + id, (err, oldObj) => {
            if (!this.client) {
                return;
            }
            // TODO Error Handling
            if (err) {
                this.log.warn(this.namespace + ' get state ' + err);
                typeof callback === 'function' && callback(err, id);
                return;
            }

            if (!oldObj) {
                oldObj = {val: null};
            } else {
                try {
                    oldObj = JSON.parse(oldObj);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot parse "${oldObj}"`);
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
                // isDeepStrictEqual works on objects and primitive values
                hasChanged = !isDeepStrictEqual(oldObj.val, obj.val);
                if (!oldObj.lc || hasChanged) {
                    obj.lc = obj.ts;
                } else {
                    obj.lc = oldObj.lc;
                }
            }

            const objString = JSON.stringify(obj);

            // set object in redis
            if (expire) {
                this.client.setex(this.namespaceRedis + id, expire, objString, err => {
                    if (!err) {
                        // publish event in redis
                        this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis publish ' + this.namespaceRedis + id + ' ' + objString);
                        this.client.publish(this.namespaceRedis + id, objString).catch(_err => {});
                    }
                    typeof callback === 'function' && callback(err, id);
                    callback = null;
                });
            } else {
                this.client.set(this.namespaceRedis + id, objString, err => {
                    if (!err) {
                        // publish event in redis
                        this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis publish ' + this.namespaceRedis + id + ' ' + objString);
                        this.client.publish(this.namespaceRedis + id, objString).catch(_err => {});
                    }
                    typeof callback === 'function' && callback(err, id);
                    callback = null;
                });
            }
        });
    }

    /**
     * Promise-version of setState
     */
    setStateAsync(id, state) {
        return new Promise((resolve, reject) => {
            this.setState(id, state, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    // Used for restore function (do not call it)
    setRawState(id, state, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.client) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

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
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.client) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.client.get(this.namespaceRedis + id, (err, obj) => {
            if (err) {
                this.log.warn(`${this.namespace} redis get ${id}, error - ${err}`);
            } else {
                this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis get ${id} ok: ${obj}`);
            }
            if (typeof callback === 'function') {
                if (!obj) {
                    return void callback(err, null);
                }
                try {
                    obj = JSON.parse(obj);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot parse "${obj}"`);
                    obj = null;
                }
                callback(err, obj);
            }
        });
    }

    /**
     * Promise-version of getState
     */
    getStateAsync(id) {
        return new Promise((resolve, reject) => {
            this.getState(id, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    getStates(keys, callback, dontModify) {
        if (typeof callback !== 'function') {
            this.log.warn(this.settings.namespace + ' redis getStates no callback');
            return;
        }
        if (!keys || !Array.isArray(keys)) {
            return setImmediate(callback, 'no keys', null);
        }
        if (!keys.length) {
            return setImmediate(callback, null, []);
        }
        if (!this.client) {
            return setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
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
                this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length);
            }
            const result = [];

            obj = obj || [];
            obj.forEach(state => {
                try {
                    result.push(state ? JSON.parse(state) : null);
                } catch (e) {
                    result.push(state);
                }
            });

            callback(err, result);
        });
    }

    // Destructor of the class. Called by shutting down.
    destroy() {
        this.stop = true;
        if (this.client) {
            try {
                this.client.quit(() => {
                    this.client = null;
                });
            } catch (e) {
                // ignore error
            }

        }
        if (this.subSystem) {
            try {
                this.subSystem.quit(() =>
                    this.subSystem = null);
            } catch (e) {
                // ignore error
            }
        }
        if (this.sub) {
            try {
                this.sub.quit(() =>
                    this.sub = null);
            } catch (e) {
                // ignore error
            }
        }
    }

    delState(id, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        this.client.del(this.namespaceRedis + id, err => {
            if (err) {
                this.log.warn(this.namespace + ' redis del ' + id + ', error - ' + err);
            } else {
                this.client.publish(this.namespaceRedis + id, 'null').catch(_err => {});
                this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis del ' + id + ', ok');
            }
            typeof callback === 'function' && callback(err, id);
        });
    }

    getKeys(pattern, callback, dontModify) {
        if (!pattern || typeof pattern !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid pattern ${JSON.stringify(pattern)}`);
            return;
        }

        this.client.keys(this.namespaceRedis + pattern, (err, obj) => {
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis keys ' + obj.length + ' ' + pattern);
            if (typeof callback === 'function') {
                if (obj && !dontModify) {
                    const len = this.namespaceRedisL;
                    obj = obj.map(el => el.substring(len));
                }
                callback(err, obj);
            }
        });
    }

    /**
     * @method subscribe
     *
     * @param pattern
     * @param {function(String):void} callback callback function (optional)
     */
    subscribe(pattern, subClient, callback) {
        if (!pattern || typeof pattern !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid pattern ${JSON.stringify(pattern)}`);
            return;
        }

        if (typeof subClient === 'function') {
            callback = subClient;
            subClient = null;
        }
        subClient = subClient || this.subSystem;

        if (!subClient) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis psubscribe ' + this.namespaceRedis + pattern);
        subClient.psubscribe(this.namespaceRedis + pattern, err => {
            if (!err) {
                subClient.ioBrokerSubscriptions[this.namespaceRedis + pattern] = new RegExp(tools.pattern2RegEx(this.namespaceRedis + pattern));
            }
            typeof callback === 'function' && callback(err);
        });
    }

    /**
     * @method subscribeUser
     *
     * @param pattern
     * @param {function(String):void} callback callback function (optional)
     */
    subscribeUser(pattern, callback) {
        return this.subscribe(pattern, this.sub, callback);
    }

    unsubscribe(pattern, subClient, callback) {
        if (!pattern || typeof pattern !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid pattern ${JSON.stringify(pattern)}`);
            return;
        }
        if (typeof subClient === 'function') {
            callback = subClient;
            subClient = null;
        }
        subClient = subClient || this.subSystem;

        if (!subClient) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis punsubscribe ' + this.namespaceRedis + pattern);
        subClient.punsubscribe(this.namespaceRedis + pattern, err => {
            if (!err && subClient.ioBrokerSubscriptions[this.namespaceRedis + pattern] !== undefined) {
                delete subClient.ioBrokerSubscriptions[this.namespaceRedis + pattern];
            }
            typeof callback === 'function' && callback(err);
        });
    }

    /**
     * @method unsubscribeUser
     *
     * @param pattern
     * @param {function} callback callback function (optional)
     */
    unsubscribeUser(pattern, callback) {
        return this.unsubscribe(pattern, this.sub, callback);
    }

    pushMessage(id, state, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.client) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        state._id = this.globalMessageId++;
        if (this.globalMessageId >= 0xFFFFFFFF) {
            this.globalMessageId = 0;
        }
        this.client.publish(this.namespaceMsg + id, JSON.stringify(state)).catch(_err => {});
        typeof callback === 'function' && callback(null, id);
    }

    subscribeMessage(id, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.subSystem) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (id.startsWith('.')) {
            id = id.substring(1);
        }
        this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis subscribeMessage ' + this.namespaceMsg + id);
        this.subSystem.psubscribe(this.namespaceMsg + id, err => {
            if (!err) {
                this.subSystem.ioBrokerSubscriptions[this.namespaceMsg + id] = true;
            }
            typeof callback === 'function' && callback(err);
        });
    }

    unsubscribeMessage(id, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.subSystem) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (id.startsWith('.')) {
            id = id.substring(1);
        }
        this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis unsubscribeMessage ' + this.namespaceMsg + id);
        this.subSystem.punsubscribe(this.namespaceMsg + id, err => {
            if (!err && this.subSystem.ioBrokerSubscriptions[this.namespaceMsg + id] !== undefined) {
                delete this.subSystem.ioBrokerSubscriptions[this.namespaceMsg + id];
            }
            typeof callback === 'function' && callback(err);
        });
    }

    pushLog(id, log, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && callback('invalid id ' + JSON.stringify(id));
            return;
        }

        log._id = this.globalLogId++;
        if (this.globalLogId >= 0xFFFFFFFF) {
            this.globalLogId = 0;
        }
        this.client && this.client.publish(this.namespaceLog + id, JSON.stringify(log)).catch(_err => {});
        typeof callback === 'function' && callback(null, id);
    }

    // todo: delete it
    lenLog(id, callback) {
        typeof callback === 'function' && callback(tools.ERRORS.ERROR_NOT_FOUND, 0, id);
        // this.client.llen(this.namespaceLog + id, (err, obj) => {
        //    typeof callback === 'function' && callback(err, obj, id);
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
        if (typeof callback === 'function') {
            callback(tools.ERRORS.ERROR_NOT_FOUND);
        }
    }

    subscribeLog(id, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.subSystem) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis subscribeMessage ' + this.namespaceLog + id);
        this.subSystem.psubscribe(this.namespaceLog + id, err => {
            if (!err) {
                this.subSystem.ioBrokerSubscriptions[this.namespaceLog + id] = true;
            }
            typeof callback === 'function' && callback(err);
        });
    }

    unsubscribeLog(id, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.subSystem) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis unsubscribeMessage ' + this.namespaceLog + id);
        this.subSystem.punsubscribe(this.namespaceLog + id, err => {
            if (!err && this.subSystem.ioBrokerSubscriptions[this.namespaceLog + id] !== undefined) {
                delete this.subSystem.ioBrokerSubscriptions[this.namespaceLog + id];
            }
            typeof callback === 'function' && callback(err);
        });
    }

    getSession(id, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.client) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.client.get(this.namespaceSession + id, (_err, obj) => {
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis get ' + id + ' ' + obj);
            try {
                obj = obj ? JSON.parse(obj) : null;
            } catch (e) {
                this.log.warn(this.namespace + ' Cannot parse "' + obj + '"');
                obj = null;
            }
            typeof callback === 'function' && callback(obj);
        });
    }

    setSession(id, expire, obj, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.client) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.client.setex(this.namespaceSession + id, expire, JSON.stringify(obj), err => {
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis setex', id, expire, obj);
            typeof callback === 'function' && callback(err);
        });
    }

    destroySession(id, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.client) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        id = this.namespaceSession + id;
        this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis del ' + id);
        this.client.del(id, err => typeof callback === 'function' && callback(err));
    }

    setBinaryState(id, data, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.client) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!Buffer.isBuffer(data)) {
            data = Buffer.from(data);
        }
        this.client.set(this.namespaceRedis + id, data, callback);
    }

    getBinaryState(id, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, `invalid id ${JSON.stringify(id)}`);
            return;
        }

        if (!this.client) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.client.getBuffer(this.namespaceRedis + id, (err, data) => {
            if (!err && data) {
                if (callback) {
                    callback(err, data);
                }
            } else {
                if (callback) {
                    callback(err);
                }
            }
        });
    }

    delBinaryState(id, callback) {
        if (!id || typeof id !== 'string') {
            typeof callback === 'function' && setImmediate(callback, 'invalid id ' + JSON.stringify(id));
            return;
        }

        if (!this.client) {
            return typeof callback === 'function' && setImmediate(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.client.del(this.namespaceRedis + id, err => typeof callback === 'function' && callback(err, id));
    }
}

module.exports = StateRedis;
