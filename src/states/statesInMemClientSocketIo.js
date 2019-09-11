/**
 *      States DB in memory - Client
 *
 *      Copyright 2013-2018 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

/** @module StatesInMemClientSocketIo */

/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
'use strict';

const io = require('socket.io-client');

class StatesInMemClientSocketIo {

    constructor(settings) {
        this.client = null;
        this.subscribes = {};
        this.connectionTimeout = null;

        this.log = settings.logger;
        if (!this.log) {
            this.log = {
                silly: function (_msg) {/*console.log(msg);*/},
                debug: function (_msg) {/*console.log(msg);*/},
                info:  function (_msg) {/*console.log(msg);*/},
                warn:  function (msg) {
                    console.log(msg);
                },
                error: function (msg) {
                    console.log(msg);
                }
            };
        } else if (!this.log.silly) {
            this.log.silly = this.log.debug;
        }

        this.log.info('States using TCP/Redis protocol not available, falling back to socket.io protocol');

        if (!settings.connection.secure) {
            this.client = io.connect('http://'  + ((settings.connection.host && settings.connection.host !== '0.0.0.0') ? settings.connection.host : '127.0.0.1') + ':' + (settings.connection.port || 9000));
        } else {
            this.client = io.connect('https://' + ((settings.connection.host && settings.connection.host !== '0.0.0.0') ? settings.connection.host : '127.0.0.1') + ':' + (settings.connection.port || 9000));
        }

        if (typeof settings.change === 'function') {
            this.client.on('message', (pattern, channel, message) => {
                this.log.silly(settings.namespace + ' inMem message ', pattern, channel, message);
                try {
                    settings.change(channel, message);
                } catch (e) {
                    this.log.error(settings.namespace + ' message ' + channel + ' ' + message + ' ' + e.message);
                    this.log.error(settings.namespace + ' ' + e.stack);
                }
            });
        }
        this.client.on('disconnect', (error) => {
            if (this.connectionTimeout) {
                clearTimeout(this.connectionTimeout);
                this.connectionTimeout = null;
            }
            if (typeof settings.disconnected === 'function') {
                settings.disconnected(error);
            } else {
                this.log.silly(settings.namespace + ' ' + error);
            }
        });
        this.client.on('error', (error) => {
            if (this.connectionTimeout) {
                clearTimeout(this.connectionTimeout);
                this.connectionTimeout = null;
            }
            if (typeof settings.disconnected === 'function') {
                settings.disconnected(error);
            } else {
                this.log.error(settings.namespace + ' ' + error.message);
                this.log.error(settings.namespace + ' ' + error.stack);
            }
        });
        this.client.on('connect', () => {
            if (this.connectionTimeout) {
                clearTimeout(this.connectionTimeout);
                this.connectionTimeout = null;
            }
            this.log.info(settings.namespace + ' States connected to socket.io: ' + settings.connection.host);
            if (typeof settings.connected === 'function') settings.connected(this);
        });
        this.client.on('reconnect', (_error) => {
            // Re-init subscribes
            for (const t in this.subscribes) {
                if (!this.subscribes.hasOwnProperty(t)) continue;
                for (const sub of this.subscribes[t]) {
                    this.client.emit(t, sub);
                }
            }
            if (typeof settings.connected === 'function') settings.connected(this);
        });
        this.connectionTimeout = setTimeout(() => {
            if (typeof settings.connectTimeout === 'function') settings.connectTimeout('Connection timeout');
            this.connectionTimeout = null;
        }, 5000);
    }

    getStatus() {
        return {type: 'file', server: false};
    }

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
    setState(id, state, callback) {
        if (!this.client) return;
        this.client.emit('setState', id, state, callback);
    }

    // Used for restore function (do not call it
    setRawState(id, state, callback) {
        if (!this.client) return;
        this.client.emit('setRawState', id, state, callback);
    }

    /**
     * @method getState
     *
     * @param {String} id
     * @param callback
     */
    getState(id, callback) {
        if (!this.client) return;
        this.client.emit('getState', id, callback);
    }

    getStates(keys, callback) {
        if (!this.client) return;
        this.client.emit('getStates', keys, function (err, res) {
            if (callback) callback(err, res);
        });
    }

    delState(id, callback) {
        if (!this.client) return;
        this.client.emit('delState', id, callback);
    }

    getKeys(pattern, callback, _dontModify) {
        if (!this.client) return;
        this.client.emit('getKeys', pattern, callback);
    }

    /**
     * @method subscribe
     *
     * @param {string} pattern
     * @param {function} callback
     */
    subscribe(pattern, callback) {
        this.subscribes.subscribe = this.subscribes.subscribe || [];
        if (this.subscribes.subscribe.indexOf(pattern) === -1) this.subscribes.subscribe.push(pattern);
        if (!this.client) return;
        this.client.emit('subscribe', pattern, callback);
    }

    unsubscribe(pattern, callback) {
        if (this.subscribes.subscribe) {
            const pos = this.subscribes.subscribe.indexOf(pattern);
            if (pos !== -1) this.subscribes.subscribe.splice(pos, 1);
        }
        if (!this.client) return;
        this.client.emit('unsubscribe', pattern, callback);
    }

    // this.pushFifoExists(id, state, callback) {
    //     if (!this.client) return;
    //     this.client.emit('pushFifoExists', id, state, callback);
    // };
    //
    // this.pushFifo(id, state, callback) {
    //     if (!this.client) return;
    //     this.client.emit('pushFifo', id, state, callback);
    // };
    //
    // this.lenFifo(id, callback) {
    //     if (!this.client) return;
    //     this.client.emit('lenFifo', id, callback);
    // };
    //
    // this.getFifo(id, callback) {
    //     if (!this.client) return;
    //     this.client.emit('getFifo', id, callback);
    // };
    //
    // this.getFifoRange(id, start, end, callback) {
    //     if (!this.client) return;
    //     this.client.emit('getFifoRange', id, start, end, callback);
    // };
    //
    // this.trimFifo(id, minLength, maxLength, callback) {
    //     if (!this.client) return;
    //     this.client.emit('trimFifo', id, minLength, maxLength, callback);
    // };

    pushMessage(id, state, callback) {
        if (!this.client) return;
        this.client.emit('pushMessage', id, state, callback);
    }

    lenMessage(id, callback) {
        if (!this.client) return;
        this.client.emit('lenMessage', id, callback);
    }

    getMessage(id, callback) {
        if (!this.client) return;
        this.client.emit('getMessage', id, callback);
    }

    delMessage(id, messageId, callback) {
        if (!this.client) return;
        this.client.emit('delMessage', id, messageId, callback);
    }

    subscribeMessage(pattern, callback) {
        this.subscribes.subscribeMessage = this.subscribes.subscribeMessage || [];
        if (this.subscribes.subscribeMessage.indexOf(pattern) === -1) this.subscribes.subscribeMessage.push(pattern);
        if (!this.client) return;
        this.client.emit('subscribeMessage', pattern, callback);
    }

    unsubscribeMessage(pattern, callback) {
        if (this.subscribes.subscribeMessage) {
            const pos = this.subscribes.subscribeMessage.indexOf(pattern);
            if (pos !== -1) this.subscribes.subscribeMessage.splice(pos, 1);
        }
        if (!this.client) return;
        this.client.emit('unsubscribeMessage', pattern, callback);
    }

    pushLog(id, state, callback) {
        if (!this.client) return;
        this.client.emit('pushLog', id, state, callback);
    }

    lenLog(id, callback) {
        if (!this.client) return;
        this.client.emit('lenLog', id, callback);
    }

    getLog(id, callback) {
        if (!this.client) return;
        this.client.emit('getLog', id, callback);
    }

    delLog(id, logId, callback) {
        if (!this.client) return;
        this.client.emit('delLog', id, logId, callback);
    }

    subscribeLog(pattern, callback) {
        this.subscribes.subscribeLog = this.subscribes.subscribeLog || [];
        if (this.subscribes.subscribeLog.indexOf(pattern) === -1) this.subscribes.subscribeLog.push(pattern);

        if (!this.client) return;
        this.client.emit('subscribeLog', pattern, callback);
    }

    unsubscribeLog(pattern, callback) {
        if (this.subscribes.subscribeLog) {
            const pos = this.subscribes.subscribeLog.indexOf(pattern);
            if (pos !== -1) this.subscribes.subscribeLog.splice(pos, 1);
        }
        if (!this.client) return;
        this.client.emit('unsubscribeLog', pattern, callback);
    }

    getSession(id, callback) {
        if (!this.client) return;
        this.client.emit('getSession', id, callback);
    }

    setSession(id, expire, obj, callback) {
        if (!this.client) return;
        this.client.emit('setSession', id, expire, obj, callback);
    }

    destroySession(id, callback) {
        if (!this.client) return;
        this.client.emit('destroySession', id, callback);
    }

    getConfig(id, callback) {
        if (!this.client) return;
        this.client.emit('getConfig', id, callback);
    }

    getConfigKeys(pattern, callback, _dontModify) {
        if (!this.client) return;
        this.client.emit('getConfigKeys', pattern, callback);
    }

    getConfigs(keys, callback, _dontModify) {
        if (!this.client) return;
        this.client.emit('getConfigs', keys, callback);
    }

    setConfig(id, obj, callback) {
        if (!this.client) return;
        this.client.emit('setConfig', id, obj, callback);
    }

    delConfig(id, callback) {
        if (!this.client) return;
        this.client.emit('delConfig', id, callback);
    }

    subscribeConfig(pattern, callback) {
        this.subscribes.subscribeConfig = this.subscribes.subscribeConfig || [];
        if (this.subscribes.subscribeConfig.indexOf(pattern) === -1) this.subscribes.subscribeConfig.push(pattern);
        if (!this.client) return;
        this.client.emit('subscribeConfig', pattern, callback);
    }

    unsubscribeConfig(pattern, callback) {
        if (this.subscribes.subscribeConfig) {
            const pos = this.subscribes.subscribeConfig.indexOf(pattern);
            if (pos !== -1) this.subscribes.subscribeConfig.splice(pos, 1);
        }
        if (!this.client) return;
        this.client.emit('unsubscribeConfig', pattern, callback);
    }

    setBinaryState(id, data, callback) {
        if (!this.client) return;
        this.client.emit('setBinaryState', id, data, callback);
    }

    getBinaryState(id, callback) {
        if (!this.client) return;
        this.client.emit('getBinaryState', id, callback);
    }

    delBinaryState(id, callback) {
        if (!this.client) return;
        this.client.emit('delBinaryState', id, callback);
    }

    destroy() {
        if (this.client) {
            this.client.close();
            this.client = null;
        }
    }
}

module.exports = StatesInMemClientSocketIo;
