/**
 * @fileOverview
 * @author hobbyquaker
 * @version 0.1
 */

/** @module statesRedis */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";

var redis = require("redis");

function StateRedis(settings) {

    var namespace =         (settings.namespace        || 'io') + '.';
    var namespaceMsg =      (settings.namespaceMsg     || 'messagebox') + '.';
    var namespaceLog =      (settings.namespaceLog     || 'log') + '.';
    var namespaceFifo =     (settings.namespaceFifo    || 'history') + '.';
    var namespaceSession =  (settings.namespaceSession || 'session') + '.';
    var namespaceConfig =   (settings.namespaceConfig  || 'config') + '.';
    var change =             settings.change;
    var globalMessageId =    0;

    var client;
    var clientBin;
    var sub;
    var ioRegExp = new RegExp('^' + namespace);
    
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

    var __construct = (function () {
        client =    redis.createClient(settings.connection.port, settings.connection.host, settings.connection.options);
        sub =       redis.createClient(settings.connection.port, settings.connection.host, settings.connection.options);

        if (typeof settings.change === 'function') {
            sub.on('pmessage', function (pattern, channel, message) {
                log.debug('redis pmessage ', pattern, channel, message);
                try {
                    if (ioRegExp.test(channel)) {
                        change(channel.slice(namespace.length), JSON.parse(message));
                    } else {
                        change(channel, JSON.parse(message));
                    }
                } catch (e) {
                    log.error('pmessage ' + channel + ' ' + message + ' ' + e.message);
                    log.error(e.stack);
                }
            });
        }
        client.on("error", function (error) {
            if (typeof settings.disconnected === 'function') {
                settings.disconnected(error);
            } else {
                log.error(error.message);
                log.error(error.stack);
            }
        });
        sub.on("error", function (error) {
            //console.log("No redis connection!");
        });
        sub.on("connect", function (error) {
            //console.log("Redis connection!");
        });
        client.on("connect", function (error) {
            if (typeof settings.connected === 'function') settings.connected();
        });
    })();


    /**
     * @method setState
     * @param id {String}           the id of the value. '<namespace>.' will be prepended
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
        var that = this;
        var obj = {};

        if (typeof state !== 'object') {
            state = {
                val: state
            };
        }

        client.get(namespace + id, function (err, oldObj) {
            // TODO Error Handling

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
            log.debug('redis publish ' + namespace + id + ' ' + JSON.stringify(obj));
            client.publish(namespace + id, JSON.stringify(obj));


            // set object in redis
            if (expire) {
                //console.log('setex',namespace + id, expire, JSON.stringify(obj));
                client.setex(namespace + id, expire, JSON.stringify(obj), function () {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            } else {
                //console.log('set',namespace + id, JSON.stringify(obj));
                client.set(namespace + id, JSON.stringify(obj), function () {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            }
        });

    };

    // Used for restore function (do not call it)
    this.setRawState = function (id, state, callback) {
        //console.log('set',namespace + id, JSON.stringify(obj));
        client.set(namespace + id, state, function () {
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
        client.get(namespace + id, function (err, obj) {
            if (err) {
                log.warn('redis get ' + id + ', error - ' + err);
            } else {
                log.debug('redis get ' + id + ' ok: ' + obj);
            }
            if (typeof callback === 'function') callback(err, JSON.parse(obj));
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
                _keys[i] = namespace + keys[i];
            }
        } else {
            _keys = keys;
        }
        client.mget(_keys, function (err, obj) {
            if (err) {
                log.warn('redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length + ', err: ' + err);
            } else {
                log.debug('redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length);
            }
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.delState = function (id, callback) {
        client.del(namespace + id, function (err) {
            if (err) {
                log.warn('redis del ' + id + ', error - ' + err);
            } else {
                log.debug('redis del ' + id + ', ok');
            }
            if (typeof callback === 'function') callback(err);
        });
    };

    this.getKeys = function (pattern, callback, dontModify) {
        client.keys(namespace + pattern, function (err, obj) {
            log.debug('redis keys ' + obj.length + ' ' + pattern);
            if (typeof callback === 'function') {
                if (obj && !dontModify) {
                    var len = namespace.length;
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
    this.subscribe = function (pattern) {
        log.debug('redis psubscribe ' + namespace + pattern);
        sub.psubscribe(namespace + pattern);
    };

    this.unsubscribe = function (pattern) {
        log.debug('redis punsubscribe ' + namespace + pattern);
        sub.punsubscribe(namespace + pattern);
    };

    this.pushFifoExists = function (id, state, callback) {
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
                obj[i] = JSON.parse(obj[i]);
            }
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.trimFifo = function (id, minLength, maxLength, callback) {
        log.debug('trimFifo history.' + id + ' minLength=' + minLength + ' maxLength=' + maxLength);
        this.lenFifo(id, function (err, res) {
            log.debug('lenFifo ' + id + ' ' + res);
            if (!err && res) {
                var length = parseInt(res, 10);
                if (length <= maxLength) {
                    if (typeof callback === 'function') callback(null, []);
                } else {
                    log.debug('lrange history.' + id + ' ' + (0 - (length - minLength)) + ' -1');
                    client.lrange(namespaceFifo + id, 0 - (length - minLength), -1, function (err, obj) {
                        if (err) {
                            if (typeof callback === 'function') callback(err, []);
                            return;
                        }
                        for (var i = 0, l = obj.length; i < l; i++) {
                            obj[i] = JSON.parse(obj[i]);
                        }
                        log.debug('ltrim history.' + id + ' 0 ' + (minLength - 1));
                        client.ltrim(namespaceFifo + id, 0, (minLength - 1), function (err) {
                            if (typeof callback === 'function') callback(err, obj);
                        });
                    });
                }
            } else {
                if (typeof callback === 'function') callback(err, []);
            }
        });
    };

    this.pushMessage = function (id, state, callback) {
        state._id = globalMessageId++;
        client.lpush(namespaceMsg + id, JSON.stringify(state), function (err, obj) {
            // publish event in redis
            //log.debug('redis publish ' + namespaceMsg + id + ' ' + JSON.stringify(state));
            client.publish(namespaceMsg + id, JSON.stringify(state));
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.lenMessage = function (id, callback) {
        client.llen(namespaceMsg + id, function (err, obj) {
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.getMessage = function (id, callback) {
        client.lpop(namespaceMsg + id, function (err, obj) {
            if (typeof callback === 'function') {
                try {
                    obj = JSON.parse(obj);
                } catch (e) {
                    obj = null;
                    log.error("Cannot parse messagebox object");
                }
                if (obj) {
                    callback(err, obj);
                } else {
                    callback("Cannot parse object", null);
                }
            }
        });
    };

    this.delMessage = function (id, messageId) {
        client.lrange(namespaceMsg + id, 0, -1, function (err, obj) {
            if (obj) {
                var found = false;
                for (var i = 0; i < obj.length; i++)  {
                    if (obj[i].indexOf('_id: ' + messageId) != -1) {
                        client.lrem(namespaceMsg + id, 1, obj[i]);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    console.log('WARNING: cannot find message with id = ' + messageId);
                    log.error('WARNING: cannot find message with id = ' + messageId);
                }
            }
        });
    };
    this.subscribeMessage = function (id) {
        if (id && id[0] == '.') id = id.substring(1);
        log.debug('redis subscribeMessage ' + namespaceMsg + id);
        sub.psubscribe(namespaceMsg + id);
    };

    this.unsubscribeMessage = function (id) {
        if (id && id[0] == '.') id = id.substring(1);
        log.debug('redis unsubscribeMessage ' + namespaceMsg + id);
        sub.punsubscribe(namespaceMsg + id);
    };

    this.pushLog = function (id, state, callback) {
        client.lpush(namespaceLog + id, JSON.stringify(state), function (err, obj) {
            // publish event in redis
            //log.debug('redis publish ' + namespace + id + ' ' + JSON.stringify(state));
            client.publish(namespaceLog + id, JSON.stringify(state));
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.lenLog = function (id, callback) {
        client.llen(namespaceLog + id, function (err, obj) {
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.getLog = function (id, callback) {
        client.lpop(namespaceLog + id, function (err, obj) {
            if (typeof callback === 'function') {
                try {
                    obj = JSON.parse(obj);
                } catch (e) {
                    obj = null;
                    log.error("Cannot parse log object");
                }
                if (obj) {
                    callback(err, obj);
                } else {
                    callback("Cannot parse object", null);
                }
            }
        });
    };

    this.subscribeLog = function (id) {
        log.debug('redis subscribeMessage ' + namespaceLog + id);
        sub.psubscribe(namespaceLog + id);
    };

    this.unsubscribeLog = function (id) {
        log.debug('redis unsubscribeMessage ' + namespaceLog + id);
        sub.punsubscribe(namespaceLog + id);
    };

    this.getSession = function (id, callback) {
        client.get(namespaceSession + id, function (err, obj) {
            log.debug('redis get ' + id + ' ' + obj);
            if (typeof callback === 'function') callback(JSON.parse(obj));
        });
    };

    this.setSession = function (id, expire, obj, callback) {
        client.setex(namespaceSession + id, expire, JSON.stringify(obj), function () {
            log.debug('redis setex', id, expire, obj);
            if (typeof callback === 'function')  callback();
        });
    };

    this.destroySession = function (id, callback) {
        id = namespaceSession + id;
        log.debug('redis del ' + id);
        client.del(id, function () {
            if (typeof callback === 'function')  callback();
        });
    };

    this.getConfig = function (id, callback) {
        id = namespaceConfig + id;
        client.get(id, function (err, obj) {
            log.debug('redis get ' + id + ' ' + obj);
            if (typeof callback === 'function') callback(err, JSON.parse(obj));
        });
    };

    this.getConfigKeys = function (pattern, callback, dontModify) {
        client.keys(namespaceConfig + pattern, function (err, obj) {
            log.debug('redis config keys ' + obj.length + ' ' + pattern);
            if (typeof callback === 'function') {
                if (obj && !dontModify) {
                    var len = namespace.length;
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
                log.warn('redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length + ', err: ' + err);
            } else {
                log.debug('redis mget ' + ((!obj) ? 0 :  obj.length) + ' ' + _keys.length);
            }
            if (typeof callback === 'function') callback(err, obj);
        });
    };

    this.setConfig = function (id, obj, callback) {
        id = namespaceConfig + id;
        client.set(id, JSON.stringify(obj), function (err) {
            log.debug('redis set', id, obj);
            client.publish(id, JSON.stringify(obj));
            if (typeof callback === 'function') callback(err, {id: id});
        });
    };

    this.delConfig = function (id, callback) {
        id = namespaceConfig + id;
        log.debug('redis del ' + id);
        client.del(id, function (err) {
            client.publish(id, null);
            if (typeof callback === 'function') callback(err);
        });
    };

    this.subscribeConfig = function (id) {
        log.debug('redis subscribeConfig ' + namespaceConfig + id);
        sub.psubscribe(namespaceConfig + id);
    };

    this.unsubscribeConfig = function (id) {
        log.debug('redis unsubscribeConfig ' + namespaceConfig + id);
        sub.punsubscribe(namespaceConfig + id);
    };

    function _createBinaryClient() {
        if (!clientBin) {
            settings.redis.options = settings.redis.options || {};
            var opt = JSON.parse(JSON.stringify(settings.redis.options));
            opt.return_buffers = true;
            clientBin = redis.createClient(settings.redis.port, settings.redis.host, opt);
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
