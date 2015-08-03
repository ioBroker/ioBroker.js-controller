/* jshint -W097 */// jshint strict:false
/*jslint node: true */
/*jshint -W061 */
"use strict";

var io =       require('socket.io-client');
var util     = require('util');
var stream   = require('stream');
var Writable = stream.Writable;
var memStore = {};

/* Writable memory stream */
function WMStrm(key, options) {
    // allow use without new operator
    if (!(this instanceof WMStrm)) {
        return new WMStrm(key, options);
    }

    Writable.call(this, options); // init super
    this.key = key; // save key
    memStore[key] = new Buffer(''); // empty
}
util.inherits(WMStrm, Writable);

WMStrm.prototype._write = function (chunk, enc, cb) {
    if (chunk) {
        // our memory store stores things in buffers
        var buffer = (Buffer.isBuffer(chunk)) ?
            chunk :  // already is Buffer use it
            new Buffer(chunk, enc);  // string, convert

        // concatinate to the buffer already there
        if (!memStore[this.key]) {
            memStore[this.key] = new Buffer('');
            console.log('memstore for ' + this.key + ' is null');
        }
        memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
    }
    if (!cb) throw 'No callback for WMStrm.prototype._write';
    cb();
};

function ObjectsInMemClient(settings) {
    var client;
    var that =       this;
    var subscribes = [];
    var connectionTimeout;

    var log =  settings.logger;
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
            client = io.connect('http://'  + (settings.connection.host != '0.0.0.0' ? settings.connection.host || '127.0.0.1' : '127.0.0.1') + ':' + (settings.connection.port || 9001));
        } else {
            client = io.connect('https://' + (settings.connection.host != '0.0.0.0' ? settings.connection.host || '127.0.0.1' : '127.0.0.1') + ':' + (settings.connection.port || 9001));
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
            if (typeof settings.connected === 'function') settings.connected('InMemoryDB ' + settings.connection.host + ':' + settings.connection.port);
        });
        client.on('reconnect', function (error) {
            // Re-initialise subscribes
            for (var i = 0; i < subscribes.length; i++) {
                client.emit('subscribe', subscribes[i]);
            }
            if (typeof settings.connected === 'function') settings.connected();
        });
        connectionTimeout = setTimeout(function () {
            if (typeof settings.connectTimeout === 'function') settings.connectTimeout('Connection timeout');
            connectionTimeout = null;
        }, 5000);
    })();

    settings = settings || {};

    this.subscribe = function (pattern, options) {
        if (subscribes.indexOf(pattern) == -1) subscribes.push(pattern);
        if (!client) return;
        client.emit('subscribe', pattern, options);
    };

    this.unsubscribe = function (pattern) {
        var pos = subscribes.indexOf(pattern);
        if (pos != -1) subscribes.splice(pos, 1);

        if (!client) return;
        client.emit('unsubscribe', pattern);
    };

    this.destroy = function (callback) {
        if (!client) return;
        // Client may not close the DB
        if (callback) callback();
        //client.emit('destroy', callback);
    };

    this.insert = function (id, attName, ignore, options, obj, callback) {
        //return pipe for write into redis
        var strm = new WMStrm(id + '/' + attName);
        strm.on('finish', function () {
			if (!memStore[id + '/' + attName]) log.error('File ' + id + ' / ' +  attName + ' is empty');
            that.writeFile(id, attName, memStore[id + '/' + attName], options, function () {
                if (memStore[id + '/' + attName] !== undefined) delete memStore[id + '/' + attName];
                if (callback) callback(null, null);
            });
        });
        return strm;
    };

    this.writeFile = function (id, name, data, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('writeFile', id, name, data, options, callback);
    };

    this.readFile = function (id, name, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('readFile', id, name, options, callback);
    };

    this.readDir = function (id, name, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('readDir', id, name, options, callback);
    };

    this.unlink = function (id, name, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('unlink', id, name, options, callback);
    };

    this.rename = function (id, oldName, newName, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('rename', id, oldName, newName, options, callback);
    };

    this.mkdir = function (id, dirname, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('mkdir', id, dirname, options, callback);
    };

    this.chmodFile = function (id, name, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('chmodFile', id, name, options, callback);
    };

    this.chownFile = function (id, name, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('chownFile', id, name, options, callback);
    };

    this.touch = function (id, name, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('touch', id, name, options, callback);
    };

    this.rm = function (id, name, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('rm', id, name, options, callback);
    };

    this.chmodObject = function (pattern, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('chmodObject', pattern, options, callback);
    };

    this.chownObject = function (pattern, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('chownObject', pattern, options, callback);
    };

    this.getObjectView = function (design, search, params, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('getObjectView', design, search, params, options, callback);
    };

    this.getObjectList = function (params, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('getObjectList', params, options, callback);
    };

    this.extendObject = function (id, obj, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('extendObject', id, obj, options, callback);
    };

    this.setObject = function (id, obj, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('setObject', id, obj, options, callback);
    };

    this.delObject = function (id, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('delObject', id, options, callback);
    };

    this.getObject = function (id, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('getObject', id, options, callback);
    };
    this.findObject = function (idOrName, type, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('findObject', idOrName, type, options, callback);
    };
    this.destroyDB = function (options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!client) return;
        client.emit('destroyDB', options, callback);
    };
}

module.exports = ObjectsInMemClient;