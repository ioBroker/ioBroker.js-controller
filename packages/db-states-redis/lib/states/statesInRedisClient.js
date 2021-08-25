/**
 *      States DB in redis - Client
 *
 *      Copyright 2013-2021 bluefox <dogafox@gmail.com>
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
const tools = require('@iobroker/db-base').tools;
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

class StateRedisClient {

    constructor(settings) {
        this.settings = settings || {};
        this.namespaceRedis = (this.settings.redisNamespace || 'io') + '.';
        this.namespaceRedisL = this.namespaceRedis.length;
        this.namespaceMsg = (this.settings.namespaceMsg || 'messagebox') + '.';
        this.namespaceLog = (this.settings.namespaceLog || 'log') + '.';
        this.namespaceSession = (this.settings.namespaceSession || 'session') + '.';

        this.globalMessageId = Math.round(Math.random() * 100000000);
        this.globalLogId = Math.round(Math.random() * 100000000);
        this.namespace = this.settings.namespace || this.settings.hostname || '';

        this.stop = false;
        this.client = null;
        this.sub = null;
        this.subSystem = null;

        this.log = tools.getLogger(this.settings.logger);

        if (this.settings.autoConnect !== false) {
            this.connectDb();
        }
    }

    connectDb() {
        this.settings.connection = this.settings.connection || {};

        const onChange = this.settings.change; // on change handler
        const onChangeUser = this.settings.changeUser; // on change handler for User events

        const ioRegExp = new RegExp('^' + this.namespaceRedis.replace(/\./g, '\\.') + '[_A-Za-z0-9ÄÖÜäöüа-яА-Я]+'); // io.[_A-Za-z0-9]+

        let ready = false;
        let initError = false;
        let connected = false;
        let reconnectCounter = 0;
        let errorLogged = false;

        // limit max number of log entries in the list
        this.settings.connection.maxQueue = this.settings.connection.maxQueue || 1000;

        this.settings.connection.options = this.settings.connection.options || {};
        const retry_max_delay = this.settings.connection.options.retry_max_delay || 5000;
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

        if (this.settings.connection.port === 0) { // Port = 0 means unix socket
            // initiate a unix socket connection
            this.settings.connection.options.path = this.settings.connection.host;
            this.log.debug(`${this.namespace} Redis States: Use File Socket for connection: ${this.settings.connection.options.path}`);
        } else if (Array.isArray(this.settings.connection.host)) { // Host is an array means we use a sentinel
            const defaultPort = Array.isArray(this.settings.connection.port) ? null : this.settings.connection.port;
            this.settings.connection.options.sentinels = this.settings.connection.host.map((redisNode, idx) => ({
                host: redisNode,
                port: defaultPort || this.settings.connection.port[idx]
            }));
            this.settings.connection.options.name = this.settings.connection.sentinelName ? this.settings.connection.sentinelName : 'mymaster';
            this.log.debug(`${this.namespace} Redis States: Use Sentinel for connection: ${this.settings.connection.options.name}, ${JSON.stringify(this.settings.connection.options.sentinels)}`);
        } else {
            this.settings.connection.options.host = this.settings.connection.host;
            this.settings.connection.options.port = this.settings.connection.port;
            this.log.debug(`${this.namespace} Redis States: Use Redis connection: ${this.settings.connection.options.host}:${this.settings.connection.options.port}`);
        }
        if (this.settings.connection.options.db === undefined) {
            this.settings.connection.options.db = 0;
        }
        if (this.settings.connection.options.family === undefined) {
            this.settings.connection.options.family = 0;
        }
        this.settings.connection.options.password = this.settings.connection.options.auth_pass || this.settings.connection.pass || null;
        this.settings.connection.options.autoResubscribe = false; // We do our own resubscribe because other sometimes not work
        // REDIS does not allow whitespaces, we have some because of pid
        this.settings.connection.options.connectionName = this.namespace.replace(/\s/g, '');

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
                    this.log.error(`${this.namespace} Could not connect to states database at ${this.settings.connection.options.host}:${this.settings.connection.options.port} (invalid protocol). Please make sure the configured IP and port points to a host running JS-Controller >= 2.0. and that the port is not occupied by other software!`);
                }
                return;
            }
            this.log.error(`${this.namespace} States database error: ${error.message}`);
            errorLogged = true;
        });

        this.client.on('end', () => {
            this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} States-Redis Event end (stop=${this.stop})`);
            if (ready && typeof this.settings.disconnected === 'function') {
                this.settings.disconnected();
            }
        });

        this.client.on('connect', () => {
            this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} States-Redis Event connect (stop=${this.stop})`);
            connected = true;
            if (errorLogged) {
                this.log.info(`${this.namespace} Objects database successfully reconnected`);
                errorLogged = false;
            }
        });

        this.client.on('close', () => {
            this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} States-Redis Event close (stop=${this.stop})`);
            //if (ready && typeof this.settings.disconnected === 'function') this.settings.disconnected();
        });

        this.client.on('reconnecting', () => {
            if (connected && !ready && !initError) {
                reconnectCounter++;
            }
            this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} States-Redis Event reconnect (reconnectCounter=${reconnectCounter}, stop=${this.stop})`);
            if (reconnectCounter > 2) { // fallback logic for nodejs <10
                this.log.error(`${this.namespace} The DB port  ${this.settings.connection.options.port} is occupied by something that is not a Redis protocol server. Please check other software running on this port or, if you use iobroker, make sure to update to js-controller 2.0 or higher!`);
                return;
            }
            connected = false;
            initError = false;
        });

        this.client.on('ready', async () => {
            this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} States-Redis Event ready (stop=${this.stop})`);
            if (this.stop) {
                return;
            }
            initError = false;

            let initCounter = 0;
            if (!this.subSystem && typeof onChange === 'function') {
                initCounter++;
                try {
                    await this.client.config('set', ['notify-keyspace-events', 'Exe']);// enable Expiry/Evicted events in server
                } catch (e) {
                    this.log.warn(`${this.namespace} Unable to enable Expiry Keyspace events from Redis Server: ${e.message}`);
                }

                this.log.debug(this.namespace + ' States create System PubSub Client');
                this.subSystem = new Redis(this.settings.connection.options);
                this.subSystem.ioBrokerSubscriptions = {};

                if (typeof onChange === 'function') {
                    this.subSystem.on('pmessage', (pattern, channel, message) => {
                        setImmediate(() => {
                            this.log.silly(`${this.namespace} States system redis pmessage ${pattern}/${channel}:${message}`);

                            try {
                                message = message ? JSON.parse(message, message.includes('"Buffer"') ? bufferJsonDecoder: undefined) : null;
                            } catch {
                                this.log.warn(`${this.namespace} Cannot parse system pmessage "${message}"`);
                                message = null;
                            }

                            try {
                                if (ioRegExp.test(channel)) {
                                    onChange(channel.substring(this.namespaceRedisL), message);
                                } else {
                                    onChange(channel, message);
                                }
                            } catch (e) {
                                this.log.warn(`${this.namespace} States system pmessage ${channel} ${JSON.stringify(message)} ${e.message}`);
                                this.log.warn(`${this.namespace} ${e.stack}`);
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
                                if (channel === `__keyevent@${this.settings.connection.options.db}__:evicted`) {
                                    this.log.warn(this.namespace + ' Redis has evicted state ' + message + '. Please check your maxMemory settings for your redis instance!');
                                } else if (channel !== `__keyevent@${this.settings.connection.options.db}__:expired`) {
                                    this.log.warn(`${this.namespace} Unknown user message ${channel} ${message}`);
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
                                this.log.warn(`${this.namespace} user message ${channel} ${message} ${e.message}`);
                                this.log.warn(`${this.namespace} ${e.stack}`);
                            }
                        }));
                }
                this.subSystem.on('end', () => {
                    this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} States-Redis System Event end sub (stop=${this.stop})`);
                    ready && typeof this.settings.disconnected === 'function' && this.settings.disconnected();
                });

                this.subSystem.on('error', error => {
                    if (this.stop) {
                        return;
                    }
                    this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} Sub-Client States System No redis connection: ${JSON.stringify(error)}`);
                });

                if (this.settings.connection.enhancedLogging) {
                    this.subSystem.on('connect', () =>
                        this.log.silly(`${this.namespace} PubSub client States-Redis System Event connect (stop=${this.stop})`));

                    this.subSystem.on('close', () =>
                        this.log.silly(`${this.namespace} PubSub client States-Redis System Event close (stop=${this.stop})`));

                    this.subSystem.on('reconnecting', reconnectCounter =>
                        this.log.silly(`${this.namespace} PubSub client States-Redis System Event reconnect (reconnectCounter=${reconnectCounter}, stop=${this.stop})`));
                }

                this.subSystem.on('ready', async _error => {
                    try {
                        this.subSystem && await this.subSystem.subscribe(`__keyevent@${this.settings.connection.options.db}__:expired`);
                    } catch (e) {
                        this.log.warn(`${this.namespace} Unable to subscribe to expiry Keyspace events from Redis Server: ${e.message}`);
                    }

                    try {
                        this.subSystem && await this.subSystem.subscribe(`__keyevent@${this.settings.connection.options.db}__:evicted`);
                    } catch (e) {
                        this.log.warn(`${this.namespace} Unable to subscribe to evicted Keyspace events from Redis Server: ${e.message}`);
                    }

                    if (--initCounter < 1) {
                        if (this.settings.connection.port === 0) {
                            this.log.debug(`${this.namespace} States ${ready ? 'system re' : ''}connected to redis: ${this.settings.connection.host}`);
                        } else {
                            this.log.debug(`${this.namespace} States ${ready ? 'system re' : ''}connected to redis: ${this.settings.connection.host}:${this.settings.connection.port}`);
                        }
                        !ready && typeof this.settings.connected === 'function' && this.settings.connected();
                        ready = true;
                    }

                    if (this.subSystem) {
                        for (const sub of Object.keys(this.subSystem.ioBrokerSubscriptions)) {
                            try {
                                await this.subSystem.psubscribe(sub);
                            } catch {
                                //ignore
                            }
                        }
                    }
                });
            }

            if (!this.sub && typeof onChangeUser === 'function') {
                initCounter++;

                this.log.debug(this.namespace + ' States create User PubSub Client');
                this.sub = new Redis(this.settings.connection.options);
                this.sub.ioBrokerSubscriptions = {};

                this.sub.on('pmessage', (pattern, channel, message) => {
                    setImmediate(() => {
                        this.log.silly(`${this.namespace} States user redis pmessage ${pattern}/${channel}:${message}`);

                        try {
                            message = message ? JSON.parse(message, message.includes('"Buffer"') ? bufferJsonDecoder: undefined) : null;
                        } catch {
                            this.log.warn(`${this.namespace} Cannot parse user pmessage "${message}"`);
                            message = null;
                        }

                        try {
                            if (ioRegExp.test(channel)) {
                                onChangeUser(channel.substring(this.namespaceRedisL), message);
                            } else {
                                onChangeUser(channel, message);
                            }
                        } catch (e) {
                            this.log.warn(`${this.namespace} States user pmessage ${channel} ${JSON.stringify(message)} ${e.message}`);
                            this.log.warn(`${this.namespace} ${e.stack}`);
                        }
                    });
                });

                this.sub.on('end', () => {
                    this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} States-Redis User Event end sub (stop=${this.stop})`);
                    if (ready && typeof this.settings.disconnected === 'function') {
                        this.settings.disconnected();
                    }
                });

                this.sub.on('error', error => {
                    if (this.stop) {
                        return;
                    }
                    if (this.settings.connection.enhancedLogging) {
                        this.log.silly(`${this.namespace} Sub-Client States User No redis connection: ${JSON.stringify(error)}`);
                    }
                });

                if (this.settings.connection.enhancedLogging) {
                    this.sub.on('connect', () => {
                        this.log.silly(`${this.namespace} PubSub client States-Redis User Event connect (stop=${this.stop})`);
                    });

                    this.sub.on('close', () => {
                        this.log.silly(`${this.namespace} PubSub client States-Redis User Event close (stop=${this.stop})`);
                    });

                    this.sub.on('reconnecting', reconnectCounter => {
                        this.log.silly(`${this.namespace} PubSub client States-Redis User Event reconnect (reconnectCounter=${reconnectCounter}, stop=${this.stop})`);
                    });
                }

                this.sub.on('ready', async _error => {
                    if (--initCounter < 1) {
                        if (this.settings.connection.port === 0) {
                            this.log.debug(`${this.namespace} States ${ready ? 'user re' : ''}connected to redis: ${this.settings.connection.host}`);
                        } else {
                            this.log.debug(`${this.namespace} States ${ready ? 'user re' : ''}connected to redis: ${this.settings.connection.host}:${this.settings.connection.port}`);
                        }
                        !ready && typeof this.settings.connected === 'function' && this.settings.connected();
                        ready = true;
                    }

                    for (const sub of Object.keys(this.sub.ioBrokerSubscriptions)) {
                        try {
                            await this.sub.psubscribe(sub);
                        } catch {
                            // ignore
                        }
                    }
                });
            }

            if (initCounter < 1) {
                if (this.settings.connection.port === 0) {
                    this.log.debug(`${this.namespace} States ${ready ? 'client re' : ''}connected to redis: ${this.settings.connection.host}`);
                } else {
                    this.log.debug(`${this.namespace} States ${ready ? 'client re' : ''}connected to redis: ${this.settings.connection.host}:${this.settings.connection.port}`);
                }
                !ready && typeof this.settings.connected === 'function' && this.settings.connected();
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
     * @param callback {function(Error|undefined, String):void}   will be called when redis confirmed reception of the command
     */
    async setState(id, state, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        const obj = {};

        if (!tools.isObject(state)) {
            state = {
                val: state
            };
        }

        let expire;
        if (state.expire) {
            expire = state.expire;
            delete state.expire;
        }

        let oldObj;
        try {
            oldObj = await this.client.get(this.namespaceRedis + id);
        } catch (e) {
            this.log.warn(`${this.namespace} get state error: ${e.message}`);
            return tools.maybeCallbackWithRedisError(callback, e, id);
        }
        if (!this.client) {
            return;
        }

        if (!oldObj) {
            oldObj = {val: null};
        } else {
            try {
                oldObj = JSON.parse(oldObj);
            } catch {
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

        // set comment
        if (typeof state.c === 'string' && state.c) {
            obj.c = state.c.substring(0, 512);
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
            try {
                await this.client.setex(this.namespaceRedis + id, expire, objString);
                // publish event in redis
                this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis publish ${this.namespaceRedis}${id} ${objString}`);
                await this.client.publish(this.namespaceRedis + id, objString);
                return tools.maybeCallbackWithError(callback, null, id);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e, id);
            }
        } else {
            try {
                await this.client.set(this.namespaceRedis + id, objString);
                // publish event in redis
                this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis publish ${this.namespaceRedis}${id} ${objString}`);
                await this.client.publish(this.namespaceRedis + id, objString);
                return tools.maybeCallbackWithError(callback, null, id);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e, id);
            }
        }
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
    async setRawState(id, state, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            await this.client.set(this.namespaceRedis + id, JSON.stringify(state));
            return tools.maybeCallbackWithError(callback, null, id);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e, id);
        }
    }

    /**
     * @method getState
     *
     * @param {String} id
     * @param callback
     */
    async getState(id, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        let obj;
        try {
            obj = await this.client.get(this.namespaceRedis + id);
            this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis get ${id} ok: ${obj}`);
        } catch (e) {
            this.log.warn(`${this.namespace} redis get ${id}, error - ${e.message}`);
        }

        if (!obj) {
            return tools.maybeCallbackWithError(callback, null, null);
        }
        try {
            obj = JSON.parse(obj);
        } catch {
            this.log.warn(`${this.namespace} Cannot parse "${obj}"`);
            obj = null;
        }
        return tools.maybeCallbackWithError(callback, null, obj);
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

    async getStates(keys, callback, dontModify) {
        if (typeof callback !== 'function') {
            this.log.warn(`${this.namespace} redis getStates no callback`);
            return;
        }
        if (!keys || !Array.isArray(keys)) {
            return tools.maybeCallbackWithError(callback, 'no keys', null);
        }
        if (!keys.length) {
            return tools.maybeCallbackWithError(callback, null, []);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }
        let _keys;
        if (!dontModify) {
            _keys = keys.map(k => this.namespaceRedis + k);
        } else {
            _keys = keys;
        }

        let obj;
        try {
            obj = await this.client.mget(_keys);
            this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis mget ${(!obj) ? 0 : obj.length} ${_keys.length}`);
        } catch (e) {
            this.log.warn(`${this.namespace} redis mget ${(!obj) ? 0 : obj.length} ${_keys.length}, err: ${e.message}`);
        }
        const result = [];

        obj = obj || [];
        obj.forEach(state => {
            try {
                result.push(state ? JSON.parse(state) : null);
            } catch {
                result.push(state);
            }
        });

        return tools.maybeCallbackWithError(callback, null, result);
    }

    /**
     * @method _destroyDBHelper
     *
     * @param {string[]} keys - array of keys which will be deleted from db
     * @param {function(Error|undefined):void} [callback] cb function to be executed after keys have been deleted
     * @private
     */
    async _destroyDBHelper(keys, callback) {
        if (!keys || !keys.length) {
            return tools.maybeCallback(callback);
        } else {
            if (!this.client) {
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            for (const id of keys) {
                try {
                    await this.client.del(id);
                } catch {
                    // ignore
                }
            }

            return tools.maybeCallback(callback);
        }
    }

    /**
     * @method destroyDB
     *
     * @param {function(Error|undefined):void} [callback] cb function to be executed after DB has been destroyed
     */
    async destroyDB(callback) {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        } else {
            let keys;
            try {
                keys = await this.client.keys(`${this.namespaceRedis}*`);
            } catch {
                //ignore
            }
            return this._destroyDBHelper(keys, callback);
        }
    }

    // Destructor of the class. Called by shutting down.
    async destroy() {
        this.stop = true;
        if (this.client) {
            try {
                await this.client.quit();
                this.client = null;
            } catch {
                // ignore error
            }

        }
        if (this.subSystem) {
            try {
                await this.subSystem.quit();
                this.subSystem = null;
            } catch {
                // ignore error
            }
        }
        if (this.sub) {
            try {
                await this.sub.quit();
                this.sub = null;
            } catch {
                // ignore error
            }
        }
    }

    async delState(id, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        try {
            await this.client.del(this.namespaceRedis + id);
            await this.client.publish(this.namespaceRedis + id, 'null');
            this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis del ${id}, ok`);
            return tools.maybeCallbackWithError(callback, null, id);
        } catch (e) {
            this.log.warn(`${this.namespace} redis del ${id}, error - ${e.message}`);
            return tools.maybeCallbackWithRedisError(callback, e, id);
        }
    }

    async getKeys(pattern, callback, dontModify) {
        if (!pattern || typeof pattern !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid pattern ${JSON.stringify(pattern)}`);
        }

        let obj;
        try {
            obj = await this.client.keys(this.namespaceRedis + pattern);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis keys ${obj.length} ${pattern}`);
        if (obj && !dontModify) {
            const len = this.namespaceRedisL;
            obj = obj.map(el => el.substring(len));
        }
        return tools.maybeCallbackWithError(callback, null, obj);
    }

    /**
     * @method subscribe
     *
     * @param pattern
     * @param subClient
     * @param {function(Error|undefined):void} callback callback function (optional)
     */
    async subscribe(pattern, subClient, callback) {
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

        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis psubscribe ${this.namespaceRedis}${pattern}`);
        try {
            await subClient.psubscribe(this.namespaceRedis + pattern);
            subClient.ioBrokerSubscriptions[this.namespaceRedis + pattern] = new RegExp(tools.pattern2RegEx(this.namespaceRedis + pattern));
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * @method subscribeUser
     *
     * @param pattern
     * @param {function(Error|undefined):void} callback callback function (optional)
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

        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis punsubscribe ${this.namespaceRedis}${pattern}`);
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

    async pushMessage(id, state, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        state._id = this.globalMessageId++;
        if (this.globalMessageId >= 0xFFFFFFFF) {
            this.globalMessageId = 0;
        }
        try {
            await this.client.publish(this.namespaceMsg + id, JSON.stringify(state));
            return tools.maybeCallbackWithError(callback, null, id);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    async subscribeMessage(id, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.subSystem) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (id.startsWith('.')) {
            id = id.substring(1);
        }
        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis subscribeMessage ${this.namespaceMsg}${id}`);
        try {
            await this.subSystem.psubscribe(this.namespaceMsg + id);
            this.subSystem.ioBrokerSubscriptions[this.namespaceMsg + id] = true;
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    async unsubscribeMessage(id, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.subSystem) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (id.startsWith('.')) {
            id = id.substring(1);
        }
        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis unsubscribeMessage ${this.namespaceMsg}${id}`);
        try {
            await this.subSystem.punsubscribe(this.namespaceMsg + id);
            if (this.subSystem.ioBrokerSubscriptions[this.namespaceMsg + id] !== undefined) {
                delete this.subSystem.ioBrokerSubscriptions[this.namespaceMsg + id];
            }
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    async pushLog(id, log, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        log._id = this.globalLogId++;
        if (this.globalLogId >= 0xFFFFFFFF) {
            this.globalLogId = 0;
        }

        if (this.client) {
            try {
                await this.client.publish(this.namespaceLog + id, JSON.stringify(log));
                return tools.maybeCallbackWithError(callback, null, id);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
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

    async subscribeLog(id, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.subSystem) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis subscribeMessage ${this.namespaceLog}${id}`);
        try {
            await this.subSystem.psubscribe(this.namespaceLog + id);
            this.subSystem.ioBrokerSubscriptions[this.namespaceLog + id] = true;
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    async unsubscribeLog(id, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.subSystem) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis unsubscribeMessage ${this.namespaceLog}${id}`);
        try {
            await this.subSystem.punsubscribe(this.namespaceLog + id);
            if (this.subSystem.ioBrokerSubscriptions[this.namespaceLog + id] !== undefined) {
                delete this.subSystem.ioBrokerSubscriptions[this.namespaceLog + id];
            }
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    async getSession(id, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        let obj;
        try {
            obj = await this.client.get(this.namespaceSession + id);
        } catch {
            // ignore
        }

        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis get ${id} ${obj}`);
        try {
            obj = obj ? JSON.parse(obj) : null;
        } catch {
            this.log.warn(`${this.namespace} Cannot parse "${obj}"`);
            obj = null;
        }
        return tools.maybeCallback(callback, obj);
    }

    async setSession(id, expire, obj, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            await this.client.setex(this.namespaceSession + id, expire, JSON.stringify(obj));
            this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis setex`, id, expire, obj);
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    async destroySession(id, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        id = this.namespaceSession + id;
        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis del ${id}`);
        try {
            await this.client.del(id);
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    async setBinaryState(id, data, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!Buffer.isBuffer(data)) {
            data = Buffer.from(data);
        }

        try {
            await this.client.set(this.namespaceRedis + id, data);
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    async getBinaryState(id, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        let data;
        try {
            data = await this.client.getBuffer(this.namespaceRedis + id);
            return tools.maybeCallbackWithError(callback, null, data);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    async delBinaryState(id, callback) {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            await this.client.del(this.namespaceRedis + id);
            return tools.maybeCallbackWithError(callback, null, id);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e, id);
        }
    }
}

module.exports = StateRedisClient;
