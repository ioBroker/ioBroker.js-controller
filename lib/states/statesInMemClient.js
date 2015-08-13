/**
 * @fileOverview
 * @author hobbyquaker
 * @version 0.1
 */

/** @module statesRedis */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";

var io = require('socket.io-client');

function StatesInMemClient(settings) {
    var client;
    var subscribes = {};
    var connectionTimeout;

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
        if (!settings.connection.secure) {
            client = io.connect('http://'  + ((settings.connection.host && settings.connection.host != '0.0.0.0') ? settings.connection.host : '127.0.0.1') + ':' + (settings.connection.port || 9000));
        } else {
            client = io.connect('https://' + ((settings.connection.host && settings.connection.host != '0.0.0.0') ? settings.connection.host : '127.0.0.1') + ':' + (settings.connection.port || 9000));
        }

        if (typeof settings.change === 'function') {
            client.on('message', function (pattern, channel, message) {
                log.debug('inMem message ', pattern, channel, message);
                try {
                    settings.change(channel, message);
                } catch (e) {
                    log.error('message ' + channel + ' ' + message + ' ' + e.message);
                    log.error(e.stack);
                }
            });
        }
        client.on('disconnect', function (error) {
            if (connectionTimeout) {
                clearTimeout(connectionTimeout);
                connectionTimeout = null;
            }
            if (typeof settings.disconnected === 'function') {
                settings.disconnected(error);
            } else {
                log.debug(error);
            }
        });
        client.on('error', function (error) {
            if (connectionTimeout) {
                clearTimeout(connectionTimeout);
                connectionTimeout = null;
            }
            if (typeof settings.disconnected === 'function') {
                settings.disconnected(error);
            } else {
                log.error(error.message);
                log.error(error.stack);
            }
        });
        client.on('connect', function (error) {
            if (connectionTimeout) {
                clearTimeout(connectionTimeout);
                connectionTimeout = null;
            }
            if (typeof settings.connected === 'function') settings.connected();
        });
        client.on('reconnect', function (error) {
            // Re-init subscribes
            for (var t in subscribes) {
                for (var i = 0; i < subscribes[t].length; i++) {
                    client.emit(t, subscribes[t][i]);
                }
            }
            if (typeof settings.connected === 'function') settings.connected();
        });
        connectionTimeout = setTimeout(function () {
            if (typeof settings.connectTimeout === 'function') settings.connectTimeout('Connection timeout');
            connectionTimeout = null;
        }, 5000);
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
        if (!client) return;
        client.emit('setState', id, state, callback);
    };

    // Used for restore function (do not call it
    this.setRawState = function (id, state, callback) {
        if (!client) return;
        client.emit('setRawState', id, state, callback);
    };


    /**
     * @method getState
     *
     * @param {String} id
     * @param callback
     */
    this.getState = function (id, callback) {
        if (!client) return;
        client.emit('getState', id, callback);
    };

    this.getStates = function (keys, callback) {
        if (!client) return;
        client.emit('getStates', keys, function (err, res) {
            if (callback) callback(err, res);
        });
    };

    this.delState = function (id, callback) {
        if (!client) return;
        client.emit('delState', id, callback);
    };

    this.getKeys = function (pattern, callback, dontModify) {
        if (!client) return;
        client.emit('getKeys', pattern, callback);
    };
    /**
     * @method subscribe
     *
     * @param pattern
     */
    this.subscribe = function (pattern) {
        subscribes.subscribe = subscribes.subscribe || [];
        if (subscribes.subscribe.indexOf(pattern) == -1) subscribes.subscribe.push(pattern);
        if (!client) return;
        client.emit('subscribe', pattern);
    };

    this.unsubscribe = function (pattern) {
        if (subscribes.subscribe) {
            var pos = subscribes.subscribe.indexOf(pattern);
            if (pos != -1) subscribes.subscribe.splice(pos, 1);
        }
        if (!client) return;
        client.emit('unsubscribe', pattern);
    };

    this.pushFifoExists = function (id, state, callback) {
        if (!client) return;
        client.emit('pushFifoExists', id, state, callback);
    };

    this.pushFifo = function (id, state, callback) {
        if (!client) return;
        client.emit('pushFifo', id, state, callback);
    };

    this.lenFifo = function (id, callback) {
        if (!client) return;
        client.emit('lenFifo', id, callback);
    };

    this.getFifo = function (id, callback) {
        if (!client) return;
        client.emit('getFifo', id, callback);
    };

    this.getFifoRange = function (id, start, end, callback) {
        if (!client) return;
        client.emit('getFifoRange', id, start, end, callback);
    };

    this.trimFifo = function (id, minLength, maxLength, callback) {
        if (!client) return;
        client.emit('trimFifo', id, minLength, maxLength, callback);
    };

    this.pushMessage = function (id, state, callback) {
        if (!client) return;
        client.emit('pushMessage', id, state, callback);
    };

    this.lenMessage = function (id, callback) {
        if (!client) return;
        client.emit('lenMessage', id, callback);
    };

    this.getMessage = function (id, callback) {
        if (!client) return;
        client.emit('getMessage', id, callback);
    };

    this.delMessage = function (id, messageId) {
        if (!client) return;
        client.emit('delMessage', id, messageId);
    };

    this.subscribeMessage = function (pattern) {
        subscribes.subscribeMessage = subscribes.subscribeMessage || [];
        if (subscribes.subscribeMessage.indexOf(pattern) == -1) subscribes.subscribeMessage.push(pattern);
        if (!client) return;
        client.emit('subscribeMessage', pattern);
    };

    this.unsubscribeMessage = function (pattern) {
        if (subscribes.subscribeMessage) {
            var pos = subscribes.subscribeMessage.indexOf(pattern);
            if (pos != -1) subscribes.subscribeMessage.splice(pos, 1);
        }
        if (!client) return;
        client.emit('unsubscribeMessage', pattern);
    };

    this.pushLog = function (id, state, callback) {
        if (!client) return;
        client.emit('pushLog', id, state, callback);
    };

    this.lenLog = function (id, callback) {
        if (!client) return;
        client.emit('lenLog', id, callback);
    };

    this.getLog = function (id, callback) {
        if (!client) return;
        client.emit('getLog', id, callback);
    };

    this.delLog = function (id, logId) {
        if (!client) return;
        client.emit('delLog', id, logId);
    };

    this.subscribeLog = function (pattern) {
        subscribes.subscribeLog = subscribes.subscribeLog || [];
        if (subscribes.subscribeLog.indexOf(pattern) == -1) subscribes.subscribeLog.push(pattern);

        if (!client) return;
        client.emit('subscribeLog', pattern);
    };

    this.unsubscribeLog = function (pattern) {
        if (subscribes.subscribeLog) {
            var pos = subscribes.subscribeLog.indexOf(pattern);
            if (pos != -1) subscribes.subscribeLog.splice(pos, 1);
        }
        if (!client) return;
        client.emit('unsubscribeLog', pattern);
    };

    this.getSession = function (id, callback) {
        if (!client) return;
        client.emit('getSession', id, callback);
    };

    this.setSession = function (id, expire, obj, callback) {
        if (!client) return;
        client.emit('setSession', id, expire, obj, callback);
    };

    this.destroySession = function (id, callback) {
        if (!client) return;
        client.emit('destroySession', id, callback);
    };

    this.getConfig = function (id, callback) {
        if (!client) return;
        client.emit('getConfig', id, callback);
    };

    this.getConfigKeys = function (pattern, callback, dontModify) {
        if (!client) return;
        client.emit('getConfigKeys', pattern, callback);
    };

    this.getConfigs = function (keys, callback, dontModify) {
        if (!client) return;
        client.emit('getConfigs', keys, callback);
    };
    this.setConfig = function (id, obj, callback) {
        if (!client) return;
        client.emit('setConfig', id, obj, callback);
    };

    this.delConfig = function (id, callback) {
        if (!client) return;
        client.emit('delConfig', id, callback);
    };

    this.subscribeConfig = function (pattern) {
        subscribes.subscribeConfig = subscribes.subscribeConfig || [];
        if (subscribes.subscribeConfig.indexOf(pattern) == -1) subscribes.subscribeConfig.push(pattern);
        if (!client) return;
        client.emit('subscribeConfig', pattern);
    };

    this.unsubscribeConfig = function (pattern) {
        if (subscribes.subscribeConfig) {
            var pos = subscribes.subscribeConfig.indexOf(pattern);
            if (pos != -1) subscribes.subscribeConfig.splice(pos, 1);
        }
        if (!client) return;
        client.emit('unsubscribeConfig', pattern);
    };

    this.setBinaryState = function (id, data, callback) {
        if (!client) return;
        client.emit('setBinaryState', id, data, callback);
    };

    this.getBinaryState = function (id, callback) {
        if (!client) return;
        client.emit('getBinaryState', id, callback);
    };

    this.delBinaryState = function (id, callback) {
        if (!client) return;
        client.emit('delBinaryState', id, callback);
    };
}

module.exports = StatesInMemClient;
