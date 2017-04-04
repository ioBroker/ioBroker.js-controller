/**
 * @fileOverview
 * @author hobbyquaker
 * @version 0.1
 */

/** @module statesRedis */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
'use strict';

var redis = require('redis');

function StateRedis(settings) {

    var redisNamespace   = (settings.redisNamespace   || 'io') + '.';
    var namespaceMsg     = (settings.namespaceMsg     || 'messagebox') + '.';
    var namespaceLog     = (settings.namespaceLog     || 'log') + '.';
//    var namespaceFifo    = (settings.namespaceFifo    || 'history') + '.';
    var namespaceSession = (settings.namespaceSession || 'session') + '.';
    var namespaceConfig  = (settings.namespaceConfig  || 'config') + '.';
    var change           = settings.change;
    var globalMessageId  = Math.round(Math.random() * 100000000);
    var globalLogId      = Math.round(Math.random() * 100000000);
    //var hostname         = 'host.' + (settings.hostname || '');
    settings.namespace   = settings.namespace || settings.hostname || '';

    var client;
    var clientBin;
    var sub;
    var ioRegExp = new RegExp('^' + redisNamespace);

    var log = settings.logger;
    if (!log) {
        log = {
            info:  function (msg) {/* console.log(msg); */},
            debug: function (msg) {/* console.log(msg); */},
            warn:  function (msg) {
                console.log(msg);
            },
            error: function (msg) {
                console.log(msg);
            }
        };
    }

    // limit max number of log entries in the list
    settings.connection.maxQueue = settings.connection.maxQueue || 1000;

    if (settings.connection.options) {
        if (settings.connection.options.retry_max_delay) {
            var retry_max_delay = settings.connection.options.retry_max_delay;
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

    var __construct = (function () {
        client =    redis.createClient(settings.connection.port, settings.connection.host, settings.connection.options);
        sub =       redis.createClient(settings.connection.port, settings.connection.host, settings.connection.options);

        if (typeof settings.change === 'function') {
            sub.on('pmessage', function (pattern, channel, message) {
                log.debug(settings.namespace + ' redis pmessage ', pattern, channel, message);
                try {
                    if (ioRegExp.test(channel)) {
                        change(channel.slice(redisNamespace.length), message ? JSON.parse(message) : null);
                    } else {
                        change(channel, message ? JSON.parse(message) : null);
                    }
                } catch (e) {
                    log.error(settings.namespace + ' pmessage ' + channel + ' ' + message + ' ' + e.message);
                    log.error(settings.namespace + ' ' + e.stack);
                }
            });
        }

        client.on('error', function (error) {
            if (typeof settings.disconnected === 'function') {
                settings.disconnected(error);
            } else {
                log.error(settings.namespace + ' ' + error.message);
                log.error(settings.namespace + ' ' + error.stack);
            }
        });

        sub.on('error', function (error) {
            log.error(settings.namespace + ' No redis connection!');
        });

        sub.on('connect', function (error) {
            log.info(settings.namespace + ' States connected to redis ' + settings.connection.host + ':' + settings.connection.port);
        });

        client.on('connect', function (error) {
            if (typeof settings.connected === 'function') settings.connected();
        });
    })();


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
     *
     *
     */
    this.setState = function (id, state, callback) {
        var expire;
        if (state.expire) {
            expire = state.expire;
            delete state.expire;
        }
        //var that = this;
        var obj = {};

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
            log.debug(settings.namespace + ' redis publish ' + redisNamespace + id + ' ' + JSON.stringify(obj));
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
                log.debug(settings.namespace + ' redis get ' + id + ' ok: ' + obj);
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
        var _keys;
        if (!dontModify) {
            _keys = [];
            for (var i = 0; i < keys.length; i++) {
                _keys[i] = redisNamespace + keys[i];
            }
        } else {
            _keys = keys;
        }
        client.mget(_keys, function (err, obj) {
            if (err) {
                log.warn(settings.namespace + ' redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length + ', err: ' + err);
            } else {
                log.debug(settings.namespace + ' redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length);
            }
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    // Destructor of the class. Called by shutting down.
    this.destroy = function () {
        // nothing to do
    };

    this.delState = function (id, callback) {
        client.del(redisNamespace + id, function (err) {
            if (err) {
                log.warn(settings.namespace + ' redis del ' + id + ', error - ' + err);
            } else {
                client.publish(redisNamespace + id, 'null');
                log.debug(settings.namespace + ' redis del ' + id + ', ok');
            }
            if (typeof callback === 'function') callback(err);
        });
    };

    this.getKeys = function (pattern, callback, dontModify) {
        client.keys(redisNamespace + pattern, function (err, obj) {
            log.debug(settings.namespace + ' redis keys ' + obj.length + ' ' + pattern);
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
    /**
     * @method subscribe
     *
     * @param pattern
     */
    this.subscribe = function (pattern, callback) {
        log.debug(settings.namespace + ' redis psubscribe ' + redisNamespace + pattern);
        sub.psubscribe(redisNamespace + pattern, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.unsubscribe = function (pattern, callback) {
        log.debug(settings.namespace + ' redis punsubscribe ' + redisNamespace + pattern);
        sub.punsubscribe(redisNamespace + pattern, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    /*this.pushFifoExists = function (id, state, callback) {
        client.lpushx(namespaceFifo + id, JSON.stringify(state), function (err, obj) {
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.pushFifo = function (id, state, callback) {
        client.lpush(namespaceFifo + id, JSON.stringify(state), function (err, obj) {
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.lenFifo = function (id, callback) {
        client.llen(namespaceFifo + id, function (err, obj) {
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.getFifo = function (id, callback) {
        this.getFifoRange(id, 0, -1, callback);
    };

    this.getFifoRange = function (id, start, end, callback) {
        client.lrange(namespaceFifo + id, start, end, function (err, obj) {
            for (var i = 0, l = obj.length; i < l; i++) {
                obj[i] = obj[i] ? JSON.parse(obj[i]) : null;
            }
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.trimFifo = function (id, minLength, maxLength, callback) {
        log.debug(settings.namespace + ' trimFifo history.' + id + ' minLength=' + minLength + ' maxLength=' + maxLength);
        this.lenFifo(id, function (err, res) {
            log.debug(settings.namespace + ' lenFifo ' + id + ' ' + res);
            if (!err && res) {
                var length = parseInt(res, 10);
                if (length <= maxLength) {
                    if (typeof callback === 'function') callback(null, []);
                } else {
                    log.debug(settings.namespace + ' lrange history.' + id + ' ' + (0 - (length - minLength)) + ' -1');
                    client.lrange(namespaceFifo + id, 0 - (length - minLength), -1, function (err, obj) {
                        if (err) {
                            if (typeof callback === 'function') callback(err, []);
                            return;
                        }
                        for (var i = 0, l = obj.length; i < l; i++) {
                            obj[i] = obj[i] ? JSON.parse(obj[i]) : null;
                        }
                        log.debug(settings.namespace + ' ltrim history.' + id + ' 0 ' + (minLength - 1));
                        client.ltrim(namespaceFifo + id, 0, (minLength - 1), function (err) {
                            if (typeof callback === 'function') callback(err, obj);
                        });
                    });
                }
            } else {
                if (typeof callback === 'function') callback(err, []);
            }
        });
    };*/

    this.pushMessage = function (id, state, callback) {
        state._id = globalMessageId++;
        if (globalMessageId >= 0xFFFFFFFF) globalMessageId = 0;
        //client.lpush(namespaceMsg + id, JSON.stringify(state), function (err, obj) {
            //client.ltrim(0, settings.connection.maxQueue - 1, function (err) {
                // publish event in redis
                //log.debug('redis publish ' + namespaceMsg + id + ' ' + JSON.stringify(state));
                client.publish(namespaceMsg + id, JSON.stringify(state));
                if (typeof callback === 'function') callback(err, obj);
            //});
        //});
    };

    this.lenMessage = function (id, callback) {
        if (typeof callback === 'function') callback(err, 0);
        //client.llen(namespaceMsg + id, function (err, obj) {
        //    if (typeof callback === 'function') callback(err, obj);
        //});
    };

    this.getMessage = function (id, callback) {
        //client.lpop(namespaceMsg + id, function (err, obj) {
        //    if (typeof callback === 'function') {
        //        try {
        //            obj = obj ? JSON.parse(obj) : null;
        //        } catch (e) {
        //            obj = null;
        //            log.error(settings.namespace + ' Cannot parse messagebox object');
        //        }
        //        if (obj) {
        //            callback(err, obj);
        //        } else {
        //            callback('Cannot parse object', null);
        //        }
        //    }
        //});
        if (typeof callback === 'function') callback(null, null);
    };

    this.delMessage = function (id, messageId, callback) {
        //client.lrange(namespaceMsg + id, 0, -1, function (err, obj) {
        //    if (obj) {
        //        var found = false;
        //        for (var i = 0; i < obj.length; i++)  {
        //            // parse of object is 6 times slower
        //            if (messageId === null || obj[i].indexOf('"_id":' + messageId) != -1) {
        //                client.lrem(namespaceMsg + id, 1, obj[i]);
        //                found = true;
        //                break;
        //            }
        //        }
        //        if (!found) {
        //            console.log('WARNING: cannot find message with id = ' + messageId);
        //            log.error('WARNING: cannot find message with id = ' + messageId);
        //        }
        //    }
        //});
        if (typeof callback === 'function') callback();
    };

    this.clearAllMessages = function (callback) {
        client.keys(namespaceLog + '*', function (err, obj) {
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    log.debug('redis clear message for ' + obj[i]);
                    client.del(obj[i]);
                }
            }

            if (typeof callback === 'function') callback(err);
        });
    };

    this.subscribeMessage = function (id, callback) {
        if (id && id[0] == '.') id = id.substring(1);
        log.debug('redis subscribeMessage ' + namespaceMsg + id);
        sub.psubscribe(namespaceMsg + id, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.unsubscribeMessage = function (id, callback) {
        if (id && id[0] == '.') id = id.substring(1);
        log.debug('redis unsubscribeMessage ' + namespaceMsg + id);
        sub.punsubscribe(namespaceMsg + id, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.pushLog = function (id, state, callback) {
        state._id = globalLogId++;
        if (globalLogId >= 0xFFFFFFFF) globalLogId = 0;
        client.lpush(namespaceLog + id, JSON.stringify(state), function (err, obj) {
            client.ltrim(0, settings.connection.maxQueue - 1, function (err) {
                // publish event in redis
                //log.debug('redis publish ' + redisNamespace + id + ' ' + JSON.stringify(state));
                client.publish(namespaceLog + id, JSON.stringify(state));
                if (typeof callback === 'function') callback(err, obj);
            });
        });
    };

    this.lenLog = function (id, callback) {
        client.llen(namespaceLog + id, function (err, obj) {
            if (typeof callback === 'function') callback(err, obj, id);
        });
    };

    this.getLog = function (id, callback) {
        client.lpop(namespaceLog + id, function (err, obj) {
            if (typeof callback === 'function') {
                try {
                    obj = obj ? JSON.parse(obj) : null;
                } catch (e) {
                    obj = null;
                    log.error(settings.namespace + ' Cannot parse log object');
                }
                if (obj) {
                    callback(err, obj);
                } else {
                    callback('Cannot parse object', null);
                }
            }
        });
    };

    this.delLog = function (id, logId) {
        client.lrange(namespaceLog + id, 0, -1, function (err, obj) {
            if (obj) {
                var found = false;
                for (var i = 0; i < obj.length; i++)  {
                    if (logId === null || obj[i].indexOf('"_id":' + logId) != -1) {
                        client.lrem(namespaceLog + id, 1, obj[i]);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    console.log('WARNING: cannot find log with id = ' + logId);
                    log.error(settings.namespace + ' WARNING: cannot find log with id = ' + logId);
                }
            }
        });
    };

    this.clearAllLogs = function (callback) {
        client.keys(namespaceLog + '*', function (err, obj) {
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    log.debug(settings.namespace + ' redis clear log for ' + obj[i]);
                    client.del(obj[i]);
                }
            }

            if (typeof callback === 'function') callback(err);
        });
    };

    this.subscribeLog = function (id, callback) {
        log.debug(settings.namespace + ' redis subscribeMessage ' + namespaceLog + id);
        sub.psubscribe(namespaceLog + id, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.unsubscribeLog = function (id, callback) {
        log.debug(settings.namespace + ' redis unsubscribeMessage ' + namespaceLog + id);
        sub.punsubscribe(namespaceLog + id, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.getSession = function (id, callback) {
        client.get(namespaceSession + id, function (err, obj) {
            log.debug(settings.namespace + ' redis get ' + id + ' ' + obj);
            if (typeof callback === 'function') callback(obj ? JSON.parse(obj) : null);
        });
    };

    this.setSession = function (id, expire, obj, callback) {
        client.setex(namespaceSession + id, expire, JSON.stringify(obj), function () {
            log.debug(settings.namespace + ' redis setex', id, expire, obj);
            if (typeof callback === 'function')  callback();
        });
    };

    this.destroySession = function (id, callback) {
        id = namespaceSession + id;
        log.debug(settings.namespace + ' redis del ' + id);
        client.del(id, function () {
            if (typeof callback === 'function')  callback();
        });
    };

    this.getConfig = function (id, callback) {
        id = namespaceConfig + id;
        client.get(id, function (err, obj) {
            log.debug(settings.namespace + ' redis get ' + id + ' ' + obj);
            if (typeof callback === 'function') callback(err, obj ? JSON.parse(obj) : null);
        });
    };

    this.getConfigKeys = function (pattern, callback, dontModify) {
        client.keys(namespaceConfig + pattern, function (err, obj) {
            log.debug(settings.namespace + ' redis config keys ' + obj.length + ' ' + pattern);
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
                log.debug(settings.namespace + ' redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length);
            }
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.setConfig = function (id, obj, callback) {
        id = namespaceConfig + id;
        client.set(id, JSON.stringify(obj), function (err) {
            log.debug(settings.namespace + ' redis set', id, obj);
            client.publish(id, JSON.stringify(obj));
            if (typeof callback === 'function') callback(err, {id: id});
        });
    };

    this.delConfig = function (id, callback) {
        id = namespaceConfig + id;
        log.debug(settings.namespace + ' redis del ' + id);
        client.del(id, function (err) {
            client.publish(id, null);
            if (typeof callback === 'function') callback(err);
        });
    };

    this.subscribeConfig = function (id, callback) {
        log.debug(settings.namespace + ' redis subscribeConfig ' + namespaceConfig + id);
        sub.psubscribe(namespaceConfig + id, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.unsubscribeConfig = function (id, callback) {
        log.debug(settings.namespace + ' redis unsubscribeConfig ' + namespaceConfig + id);
        sub.punsubscribe(namespaceConfig + id, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    function _createBinaryClient() {
        if (!clientBin) {
            settings.connection.options = settings.connection.options || {};
            var opt = JSON.parse(JSON.stringify(settings.connection.options));
            opt.return_buffers = true;
            clientBin = redis.createClient(settings.connection.port, settings.connection.host, opt);
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
}

module.exports = StateRedis;
