/**
 *      Object DB in memory - Client
 *
 *      Copyright 2013-2019 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
/* jshint -W061 */
'use strict';

const io     = require('socket.io-client');
const utils  = require('./objectsUtils');

class ObjectsInMemClient {
    constructor(settings) {
        this.client = null;
        this.subscribes = [];
        this.connectionTimeout = null;

        this.settings = settings || {};

        this.log = settings.logger;
        if (!this.log) {
            this.log = {
                silly: _msg => {/*console.log(_msg);*/
                },
                debug: _msg => {/*console.log(_msg);*/
                },
                info: _msg => {/*console.log(_msg);*/
                },
                warn: msg => console.log(msg),
                error: msg => console.log(msg)
            };
        } else if (!this.log.silly) {
            this.log.silly = this.log.debug;
        }

        this.log.info('Objects using TCP/Redis protocol not available, falling back to socket.io protocol');

        if (!this.settings.connection.secure) {
            this.client = io.connect('http://' + (this.settings.connection.host !== '0.0.0.0' ? this.settings.connection.host || '127.0.0.1' : '127.0.0.1') + ':' + (this.settings.connection.port || 9001));
        } else {
            this.client = io.connect('https://' + (this.settings.connection.host !== '0.0.0.0' ? this.settings.connection.host || '127.0.0.1' : '127.0.0.1') + ':' + (this.settings.connection.port || 9001));
        }

        if (typeof this.settings.change === 'function') {
            this.client.on('message', (pattern, channel, message) => {
                this.log.silly(this.settings.namespace + ' inMem message ', pattern, channel, message);
                try {
                    this.settings.change(channel, message);
                } catch (e) {
                    this.log.error(this.settings.namespace + ' message ' + channel + ' ' + message + ' ' + e.message);
                    this.log.error(this.settings.namespace + ' ' + e.stack);
                }
            });
        }
        this.client.on('disconnect', error => {
            if (this.connectionTimeout) {
                clearTimeout(this.connectionTimeout);
                this.connectionTimeout = null;
            }
            if (typeof this.settings.disconnected === 'function') {
                this.settings.disconnected(error);
            }
        });
        this.client.on('error', error => {
            if (this.connectionTimeout) {
                clearTimeout(this.connectionTimeout);
                this.connectionTimeout = null;
            }
            if (typeof this.settings.disconnected === 'function') {
                this.settings.disconnected(error);
            } else {
                this.log.error(this.settings.namespace + ' ' + error.message);
                this.log.error(this.settings.namespace + ' ' + error.stack);
            }
        });
        this.client.on('connect', () => {
            if (this.connectionTimeout) {
                clearTimeout(this.connectionTimeout);
                this.connectionTimeout = null;
            }
            this.log.info(settings.namespace + ' Objects connected to socket.io: ' + settings.connection.host);
            if (typeof this.settings.connected === 'function') this.settings.connected(this);
        });
        this.client.on('reconnect', (_error) => {
            // Re-initialise subscribes
            for (let i = 0; i < this.subscribes.length; i++) {
                this.client.emit('subscribe', this.subscribes[i]);
            }
            if (typeof this.settings.connected === 'function') this.settings.connected(this);
        });
        this.connectionTimeout = setTimeout(() => {
            if (typeof this.settings.connectTimeout === 'function') this.settings.connectTimeout('Connection timeout');
            this.connectionTimeout = null;
        }, 5000);
    }

    getStatus() {
        return {type: 'file', server: false};
    }

    subscribe(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (this.subscribes.indexOf(pattern) === -1) this.subscribes.push(pattern);
        if (!this.client) return;
        this.client.emit('subscribe', pattern, options, callback);
    }

    unsubscribe(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        const pos = this.subscribes.indexOf(pattern);
        if (pos !== -1) this.subscribes.splice(pos, 1);

        if (!this.client) return;
        this.client.emit('unsubscribe', pattern, options, callback);
    }

    destroy(callback) {
        if (!this.client) return;
        // Client may not close the DB
        if (callback) callback();
        //this.client.emit('destroy', callback);
    }

    enableFileCache(enabled, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('enableFileCache', enabled, options, callback);
    }

    insert(id, attName, ignore, options, obj, callback) {
        return utils.insert(this, id, attName, ignore, options, obj, callback);
    }

    writeFile(id, name, data, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('writeFile', id, name, data, options, callback);
    }

    readFile(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.readFile(id, name, options, (err, arr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(arr);
                    }
                });
            });
        } else {
            if (!this.client) return;
            this.client.emit('readFile', id, name, options, callback);
        }
    }

    readDir(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.readDir(id, name, options, (err, arr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(arr);
                    }
                });
            });
        } else {
            if (!this.client) return;
            this.client.emit('readDir', id, name, options, callback);
        }
    }

    readDirAsZip(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.readDirAsZip(id, name, options, (err, arr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(arr);
                    }
                });
            });
        } else {
            if (!this.client) return;
            this.client.emit('readDirAsZip', id, name, options, callback);
        }
    }

    writeDirAsZip(id, name, options, data, callback) {
        if (typeof data === 'function') {
            callback    = data;
            data        = options;
            options     = null;
        }
        if (!this.client) return;
        this.client.emit('writeDirAsZip', id, name, options, data, callback);
    }

    unlink(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('unlink', id, name, options, callback);
    }

    delFile(id, name, options, callback) {
        return this.unlink(id, name, options, callback);
    }

    rename(id, oldName, newName, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('rename', id, oldName, newName, options, callback);
    }

    mkdir(id, dirname, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('mkdir', id, dirname, options, callback);
    }

    chmodFile(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('chmodFile', id, name, options, callback);
    }

    chownFile(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('chownFile', id, name, options, callback);
    }

    touch(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('touch', id, name, options, callback);
    }

    rm(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('rm', id, name, options, callback);
    }

    chmodObject(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('chmodObject', pattern, options, callback);
    }

    chownObject(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('chownObject', pattern, options, callback);
    }

    getObjectView(design, search, params, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getObjectView(design, search, params, options, (err, arr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(arr);
                    }
                });
            });
        } else {
            if (!this.client) return;
            this.client.emit('getObjectView', design, search, params, options, callback);
        }
    }

    getObjectList(params, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getObjectList(params, options, (err, arr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(arr);
                    }
                });
            });
        } else {
            if (!this.client) return;
            this.client.emit('getObjectList', params, options, callback);
        }
    }

    getObjectListAsync(params, options) {
        if (!this.client) return Promise.reject('No client');
        return new Promise((resolve, reject) => {
            this.getObjectList(params, options, (err, arr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(arr);
                }
            });
        });
    }

    extendObject(id, obj, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('extendObject', id, obj, options, callback);
    }

    extendObjectAsync(id, obj, options) {
        if (!this.client) return Promise.reject('No client');
        return new Promise((resolve, reject) => {
            this.extendObject(id, obj, options, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    getKeys(pattern, options, callback, dontModify) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getKeys(pattern, options, (err, keys) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(keys);
                    }
                }, dontModify);
            });
        } else {
            if (!this.client) return;
            this.client.emit('getKeys', pattern, options, callback, dontModify);
        }
    }
    getConfigKeys(pattern, options, callback, dontModify) {
        return this.getKeys(pattern, options, callback, dontModify);
    }

    getObjects(keys, options, callback, dontModify) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getObjects(keys, options, (err, objs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(objs);
                    }
                }, dontModify);
            });
        } else {
            if (!this.client) return;
            this.client.emit('getObjects', keys, options, callback, dontModify);
        }
    }

    getObjectsByPattern(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getObjectsByPattern(pattern, options, (err, objs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(objs);
                    }
                });
            });
        } else {
            if (!this.client) return;
            this.client.emit('getObjectsByPattern', pattern, options, callback);
        }
    }

    getObjectsByPatternAsync(pattern, options) {
        if (!this.client) return Promise.reject('No client');
        return new Promise((resolve, reject) => {
            this.getObjectsByPattern(pattern, options, (err, objs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(objs);
                }
            });
        });
    }

    setObject(id, obj, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('setObject', id, obj, options, callback);
    }

    setObjectAsync(id, obj, options) {
        if (!this.client) return Promise.reject('No client');
        return new Promise((resolve, reject) => {
            this.setObject(id, obj, options, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    delObject(id, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('delObject', id, options, callback);
    }

    delObjectAsync(id, options) {
        if (!this.client) return Promise.reject('No client');
        return new Promise((resolve, reject) => {
            this.delObject(id, options, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    getObject(id, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getObject(id, options, (err, obj) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(obj);
                    }
                });
            });
        } else {
            this.client.emit('getObject', id, options, callback);
        }
    }

    getObjectAsync(id, options) {
        if (!this.client) return Promise.reject('No client');
        return new Promise((resolve, reject) => {
            this.getObject(id, options, (err, obj) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(obj);
                }
            });
        });
    }

    findObject(idOrName, type, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.findObject(idOrName, type, options, (err, obj) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(obj);
                    }
                });
            });
        } else {
            if (!this.client) return;
            this.client.emit('findObject', idOrName, type, options, callback);
        }
    }

    findObjectAsync(idOrName, type, options) {
        if (!this.client) return Promise.reject('No client');
        return new Promise((resolve, reject) => {
            this.findObject(idOrName, type, options, (err, obj) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(obj);
                }
            });
        });
    }

    destroyDB(options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.client) return;
        this.client.emit('destroyDB', options, callback);
    }
}

module.exports = ObjectsInMemClient;