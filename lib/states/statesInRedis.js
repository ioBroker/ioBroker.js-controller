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

function StateRedis(settings) {

    const redisNamespace   = (settings.redisNamespace   || 'io') + '.';
    const namespaceMsg     = (settings.namespaceMsg     || 'messagebox') + '.';
    const namespaceLog     = (settings.namespaceLog     || 'log') + '.';
    const namespaceSession = (settings.namespaceSession || 'session') + '.';
    // const namespaceConfig  = (settings.namespaceConfig  || 'config') + '.';
    const onChange         = settings.change; // on change handler
    let globalMessageId    = Math.round(Math.random() * 100000000);
    let globalLogId        = Math.round(Math.random() * 100000000);
    settings.namespace     = settings.namespace || settings.hostname || '';

    let client;
    let clientBin;
    let sub;
    const ioRegExp = new RegExp('^' + redisNamespace);

    let log = settings.logger;
    if (!log) {
        log = {
            silly: function (msg) {/* console.log(msg); */},
            debug: function (msg) {/* console.log(msg); */},
            info:  function (msg) {/* console.log(msg); */},
            warn:  function (msg) {
                console.log(msg);
            },
            error: function (msg) {
                console.log(msg);
            }
        };
    } else if (!log.silly) {
        log.silly = log.debug;
    }

    // limit max number of log entries in the list
    settings.connection.maxQueue = settings.connection.maxQueue || 1000;

    if (settings.connection.options) {
        if (settings.connection.options.retry_max_delay) {
            const retry_max_delay = settings.connection.options.retry_max_delay;
            // convert redis 0.1 options to redis 3.0
            settings.connection.options.retry_strategy = function (options) {
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
            delete settings.connection.options.retry_max_delay;
        }
    }

    /**
     * @method setState
     * @param id {String}           the id of the value. '<redisNamespace>.' will be prepended
     * @param state {any}
     *
     *
     *      an object containing the actual value and some metadata:<br>
     *      setState(id, {'val': val, 'ts': ts, 'ack': ack, 'from': from, 'lc': lc})
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
    this.setState = function (id, state, callback) {
        let expire;
        if (state.expire) {
            expire = state.expire;
            delete state.expire;
        }
        //var that = this;
        let obj = {};

        if (typeof state !== 'object') {
            state = {
                val: state
            };
        }

        client.get(redisNamespace + id, function (err, oldObj) {
            // TODO Error Handling
            if (err) log.warn(settings.namespace + ' ' + err);

            if (!oldObj) {
                oldObj = {};
            } else {
                try {
                    oldObj = JSON.parse(oldObj);
                } catch (e) {
                    oldObj = {};
                }

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
            log.silly(settings.namespace + ' redis publish ' + redisNamespace + id + ' ' + JSON.stringify(obj));
            client.publish(redisNamespace + id, JSON.stringify(obj));


            // set object in redis
            if (expire) {
                //console.log('setex',redisNamespace + id, expire, JSON.stringify(obj));
                client.setex(redisNamespace + id, expire, JSON.stringify(obj), function () {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            } else {
                //console.log('set',redisNamespace + id, JSON.stringify(obj));
                client.set(redisNamespace + id, JSON.stringify(obj), function () {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            }
        });
    };

    // Used for restore function (do not call it)
    this.setRawState = function (id, state, callback) {
        //console.log('set',redisNamespace + id, JSON.stringify(obj));
        client.set(redisNamespace + id, state, function () {
            if (typeof callback === 'function') {
                callback();
            }
        });
    };

    /**
     * @method getState
     *
     * @param {String} id
     * @param callback
     */
    this.getState = function (id, callback) {
        client.get(redisNamespace + id, function (err, obj) {
            if (err) {
                log.warn(settings.namespace + ' redis get ' + id + ', error - ' + err);
            } else {
                log.silly(settings.namespace + ' redis get ' + id + ' ok: ' + obj);
            }
            if (typeof callback === 'function') {
                callback(err, obj ? JSON.parse(obj) : null);
            }
        });
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
        let _keys;
        if (!dontModify) {
            _keys = [];
            for (let i = 0; i < keys.length; i++) {
                _keys[i] = redisNamespace + keys[i];
            }
        } else {
            _keys = keys;
        }
        client.mget(_keys, function (err, obj) {
            if (err) {
                log.warn(settings.namespace + ' redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length + ', err: ' + err);
            } else {
                log.silly(settings.namespace + ' redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length);
            }
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    // Destructor of the class. Called by shutting down.
    this.destroy = function () {
        if (client) {
            client.end(true);
            client = null;
        }
        if (sub) {
            sub.end();
            sub = null;
        }
    };

    this.delState = function (id, callback) {
        client.del(redisNamespace + id, function (err) {
            if (err) {
                log.warn(settings.namespace + ' redis del ' + id + ', error - ' + err);
            } else {
                client.publish(redisNamespace + id, 'null');
                log.silly(settings.namespace + ' redis del ' + id + ', ok');
            }
            if (typeof callback === 'function') callback(err);
        });
    };

    this.getKeys = function (pattern, callback, dontModify) {
        client.keys(redisNamespace + pattern, function (err, obj) {
            log.silly(settings.namespace + ' redis keys ' + obj.length + ' ' + pattern);
            if (typeof callback === 'function') {
                if (obj && !dontModify) {
                    const len = redisNamespace.length;
                    for (let i = 0; i < obj.length; i++) {
                        obj[i] = obj[i].substring(len);
                    }
                }
                callback(err, obj);
            }
        });
    };
    /**
     * @method subscribe
     *
     * @param pattern
     * @param {function} callback callback function (optional)
     */
    this.subscribe = function (pattern, callback) {
        log.silly(settings.namespace + ' redis psubscribe ' + redisNamespace + pattern);
        sub.psubscribe(redisNamespace + pattern, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.unsubscribe = function (pattern, callback) {
        log.silly(settings.namespace + ' redis punsubscribe ' + redisNamespace + pattern);
        sub.punsubscribe(redisNamespace + pattern, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.pushMessage = function (id, state, callback) {
        state._id = globalMessageId++;
        if (globalMessageId >= 0xFFFFFFFF) globalMessageId = 0;
        client.publish(namespaceMsg + id, JSON.stringify(state));
        if (typeof callback === 'function') callback(null, id);
    };

    // todo: delete it
    this.lenMessage = function (id, callback) {
        if (typeof callback === 'function') callback(null, 0, id);
    };

    // todo: delete it
    this.getMessage = function (id, callback) {
        if (typeof callback === 'function') callback(null, null, id);
    };

    // todo: delete it
    this.delMessage = function (id, messageId, callback) {
        if (typeof callback === 'function') callback(null, id);
    };

    // todo: delete it
    this.clearAllMessages = function (callback) {
        client.keys(namespaceLog + '*', function (err, obj) {
            if (obj) {
                for (let i = 0; i < obj.length; i++) {
                    log.silly('redis clear message for ' + obj[i]);
                    client.del(obj[i]);
                }
            }

            if (typeof callback === 'function') callback(err);
        });
    };

    this.subscribeMessage = function (id, callback) {
        if (id && id[0] === '.') id = id.substring(1);
        log.silly('redis subscribeMessage ' + namespaceMsg + id);
        sub.psubscribe(namespaceMsg + id, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.unsubscribeMessage = function (id, callback) {
        if (id && id[0] === '.') id = id.substring(1);
        log.silly('redis unsubscribeMessage ' + namespaceMsg + id);
        sub.punsubscribe(namespaceMsg + id, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.pushLog = function (id, log, callback) {
        log._id = globalLogId++;
        if (globalLogId >= 0xFFFFFFFF) globalLogId = 0;
        client.publish(namespaceLog + id, JSON.stringify(log));
        if (typeof callback === 'function') callback(null, id);
    };

    // todo: delete it
    this.lenLog = function (id, callback) {
        if (typeof callback === 'function') callback('Not exists', 0, id);
        // client.llen(namespaceLog + id, function (err, obj) {
        //    if (typeof callback === 'function') callback(err, obj, id);
        // });
    };

    // todo: delete it
    this.getLog = function (id, callback) {
        if (typeof callback === 'function') {
            callback('Not exists', null, 0);
        }
    };

    // todo: delete it
    this.delLog = function (id, logId, callback) {
        if (typeof callback === 'function') {
            callback('Not exists');
        }
    };

    // todo: delete it
    this.clearAllLogs = function (callback) {
        client.keys(namespaceLog + '*', function (err, obj) {
            if (obj) {
                for (let i = 0; i < obj.length; i++) {
                    log.silly(settings.namespace + ' redis clear log for ' + obj[i]);
                    client.del(obj[i]);
                }
            }

            if (typeof callback === 'function') {
                callback(err);
            }
        });
    };

    this.subscribeLog = function (id, callback) {
        log.silly(settings.namespace + ' redis subscribeMessage ' + namespaceLog + id);
        sub.psubscribe(namespaceLog + id, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.unsubscribeLog = function (id, callback) {
        log.silly(settings.namespace + ' redis unsubscribeMessage ' + namespaceLog + id);
        sub.punsubscribe(namespaceLog + id, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.getSession = function (id, callback) {
        client.get(namespaceSession + id, function (err, obj) {
            log.silly(settings.namespace + ' redis get ' + id + ' ' + obj);
            if (typeof callback === 'function') callback(obj ? JSON.parse(obj) : null);
        });
    };

    this.setSession = function (id, expire, obj, callback) {
        client.setex(namespaceSession + id, expire, JSON.stringify(obj), function () {
            log.silly(settings.namespace + ' redis setex', id, expire, obj);
            if (typeof callback === 'function')  callback();
        });
    };

    this.destroySession = function (id, callback) {
        id = namespaceSession + id;
        log.silly(settings.namespace + ' redis del ' + id);
        client.del(id, function () {
            if (typeof callback === 'function')  callback();
        });
    };

    /* this.getConfig = function (id, callback) {
        id = namespaceConfig + id;
        client.get(id, function (err, obj) {
            log.silly(settings.namespace + ' redis get ' + id + ' ' + obj);
            if (typeof callback === 'function') callback(err, obj ? JSON.parse(obj) : null);
        });
    };

    this.getConfigKeys = function (pattern, callback, dontModify) {
        client.keys(namespaceConfig + pattern, function (err, obj) {
            log.silly(settings.namespace + ' redis config keys ' + obj.length + ' ' + pattern);
            if (typeof callback === 'function') {
                if (obj && !dontModify) {
                    var len = redisNamespace.length;
                    for (var i = 0; i < obj.length; i++) {
                        obj[i] = obj[i].substring(len);
                    }
                }
                callback(err, obj);
            }
        });
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
        var _keys;
        if (!dontModify) {
            _keys = [];
            for (var i = 0; i < keys.length; i++) {
                _keys[i] = namespaceConfig + keys[i];
            }
        } else {
            _keys = keys;
        }

        client.mget(_keys, function (err, obj) {
            if (err) {
                log.warn(settings.namespace + ' redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length + ', err: ' + err);
            } else {
                log.silly(settings.namespace + ' redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length);
            }
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.setConfig = function (id, obj, callback) {
        id = namespaceConfig + id;
        client.set(id, JSON.stringify(obj), function (err) {
            log.silly(settings.namespace + ' redis set', id, obj);
            client.publish(id, JSON.stringify(obj));
            if (typeof callback === 'function') callback(err, {id: id});
        });
    };

    this.delConfig = function (id, callback) {
        id = namespaceConfig + id;
        log.silly(settings.namespace + ' redis del ' + id);
        client.del(id, function (err) {
            client.publish(id, null);
            if (typeof callback === 'function') callback(err);
        });
    };

    this.subscribeConfig = function (id, callback) {
        log.silly(settings.namespace + ' redis subscribeConfig ' + namespaceConfig + id);
        sub.psubscribe(namespaceConfig + id, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.unsubscribeConfig = function (id, callback) {
        log.silly(settings.namespace + ' redis unsubscribeConfig ' + namespaceConfig + id);
        sub.punsubscribe(namespaceConfig + id, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };*/

    function _createBinaryClient() {
        if (!clientBin) {
            settings.connection.options = settings.connection.options || {};
            let opt = JSON.parse(JSON.stringify(settings.connection.options));
            opt.return_buffers = true;
            if (settings.connection.port === 0) {
                // initiate a unix socket connection using the parameter 'host'
                clientBin = redis.createClient(settings.connection.host, opt);
            } else {
                clientBin = redis.createClient(settings.connection.port, settings.connection.host, opt);
            }
        }
    }

    this.setBinaryState = function (id, data, callback) {
        if (!clientBin) _createBinaryClient ();
        clientBin.set(id, data, callback);
    };

    this.getBinaryState = function (id, callback) {
        if (!clientBin) _createBinaryClient ();
        clientBin.get(id, function (err, data) {
            if (!err && data) {
                if (callback) callback(err, new Buffer(data, 'binary'));
            } else {
                if (callback) callback(err);

            }
        });
    };

    this.delBinaryState = function (id, callback) {
        if (!clientBin) _createBinaryClient ();
        clientBin.del(id, function () {
            if (typeof callback === 'function')  callback();
        });
    };
    (function __construct() {
        if (settings.connection.port === 0) {
            // initiate a unix socket connection using the parameter 'host'
            client = redis.createClient(settings.connection.host, settings.connection.options);
            sub    = redis.createClient(settings.connection.host, settings.connection.options);
        } else {
            client = redis.createClient(settings.connection.port, settings.connection.host, settings.connection.options);
            sub    = redis.createClient(settings.connection.port, settings.connection.host, settings.connection.options);
        }

        if (typeof onChange === 'function') {
            sub.on('pmessage', function (pattern, channel, message) {
                log.debug(settings.namespace + ' redis pmessage ', pattern, channel, message);
                try {
                    if (ioRegExp.test(channel)) {
                        onChange(channel.slice(redisNamespace.length), message ? JSON.parse(message) : null);
                    } else {
                        onChange(channel, message ? JSON.parse(message) : null);
                    }
                } catch (e) {
                    log.error(settings.namespace + ' pmessage ' + channel + ' ' + message + ' ' + e.message);
                    log.error(settings.namespace + ' ' + e.stack);
                }
            });
        }

        client.on('error', error => {
            if (typeof settings.disconnected === 'function') {
                settings.disconnected(error);
            } else {
                log.error(settings.namespace + ' ' + error.message);
                log.error(settings.namespace + ' ' + error.stack);
            }
        });

        sub.on('error', error => {
            log.error(settings.namespace + ' No redis connection!');
        });

        sub.on('connect', error => {
            if (settings.connection.port === 0) {
                log.info(settings.namespace + ' States connected to redis: ' + settings.connection.host);
            } else {
                log.info(settings.namespace + ' States connected to redis: ' + settings.connection.host + ':' + settings.connection.port);
            }
        });

        client.on('connect', error => {
            if (typeof settings.connected === 'function') settings.connected();
        });
    })();

    return this;
}

module.exports = StateRedis;
