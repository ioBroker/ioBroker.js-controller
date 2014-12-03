/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";

var extend      = require('node.extend');
var StatesRedis = require(__dirname + '/redis.js');

var stream   = require('stream');
var util     = require('util');
var Writable = stream.Writable;
var memStore = { };

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
    // our memory store stores things in buffers
    var buffer = (Buffer.isBuffer(chunk)) ?
        chunk :  // already is Buffer use it
        new Buffer(chunk, enc);  // string, convert

    // concat to the buffer already there
    memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
    cb();
};

function ObjectsInMem(settings) {

    var that = this;
    var log =  settings.logger;
    var states;
    var objects = null;

    this.destroy = function (callback) {
        states.getKeys('config.', function (err, obj) {
            for (var t = 0; t < obj.length; t++) {
                states.delConfig(obj.substring(7));
            }
            if (callback) callback();
        });
    };

    this.insert = function (id, attName, ignore, mimeType, obj, callback) {
        //this.writeFile(id, attName, null, mimeType, null);
        //return pipe for write into redis
        states.getConfig(id, function (err, _obj) {
            if (_obj) {
                _obj._attachments = _obj.attachments || {};
                if (!_obj._attachments[attName]) {
                    _obj._attachments[attName] = mimeType;
                }
                states.setConfig(id, _obj);
            }
        });

        var strm = new WMStrm(id + '/' + attName);
        strm.on('finish', function () {
            that.writeFile(id, attName, memStore[id + '/' + attName], mimeType, null, function () {
                delete memStore[id + '/' + attName];
                if (callback) callback(null, null);
            });
        });
        return strm;
    };

    this.writeFile = function (id, name, data, mime, params, callback) {
        states.setBinaryState('_files/' + id + '/' + name, data, callback);
    };

    this.readFile = function (id, name, params, callback) {
        states.getConfig(id, function (err, _obj) {
            states.getBinaryState('_files/' + id + '/' + name, function (err, buffer) {
                if (callback) callback(err, buffer, (_obj && _obj._attachments) ? _obj._attachments[name] || 'text/html': 'text/html');
            });
        });
    };

    this.unlink = function (id, name, rev, callback) {
        states.getConfig(id, function (err, _obj) {
            if (_obj && _obj._attachments) {
                if (_obj._attachments[attName]) {
                    delete _obj._attachments[attName];
                }
                states.setConfig(id, _obj);
            }
            states.delBinaryState('_files/' + id + '/' + name, callback);
        });
    };

    this.subscribe = function (pattern) {
        var that = this;
        if (!states) {
            setTimeout(function (_pattern) {
                that.subscribe(_pattern);
            }, 100, pattern);
            return;
        }

        states.subscribeConfig(pattern);
    };

    this._applyView = function (func, params, callback) {
        var result = {
            rows: []
        };

        function _emit_(id, obj) {
            result.rows.push({id: id, value: obj});
        }

        var f = eval('(' + func.map.replace(/emit/g, '_emit_') + ')');

        for (var id in objects) {
            if (params) {
                if (params.startkey && id < params.startkey) continue;
                if (params.endkey && id > params.endkey) continue;
            }
            f(objects[id]);
        }
        // Calculate max
        if (func.reduce == '_stats') {
            var max = null;
            for (var i = 0; i < result.rows.length; i++) {
                if (max == null || result.rows[i].value > max) {
                    max = result.rows[i].value;
                }
            }
            if (max != null) {
                result.rows = [{id: '_stats', value: {max: max}}];
            } else {
                result.rows = [];
            }
        }

        objects = null;
        if (callback) callback(null, result);
    }

    this.getObjectView = function (design, search, params, callback) {
        if (!objects) {
            this._getObjects(function () {
                that.getObjectView(design, search, params, callback);
            });
            return;
        }

        if (objects['_design/' + design] && objects['_design/' + design].views) {
            if (objects['_design/' + design].views[search]) {
                that._applyView(objects['_design/' + design].views[search], params, callback);
            } else {
                console.log("Cannot find view " + design);
            }
        }
        else {
            states.getConfig('_design/' + design, function (err, obj) {
                if (obj.views && obj.views[search]) {
                    var result = {
                        rows: []
                    }
                    that._applyView(result, obj.views[search], callback);
                } else {
                    console.log("Cannot find view " + design);
                }
            });
        }
    };

    this._getObjects = function (callback) {
        states.getKeys('config.*', function (err, list) {
            states.getStates(list, function (err, res) {
                objects = {};
                for (var i = 0; i < list.length; i++) {
                    try {
                        objects[list[i].substring(7)] = JSON.parse(res[i]);
                    } catch(e) {
                        console.log("Cannot parse " + list[i]);
                    }
                }
                callback(list);
            });
        });
    };

    this.getObjectList = function (params, callback) {
        if (!objects) {
            this._getObjects(function () {
                that.getObjectList(params, callback);
            });
            return;
        }
        //params = {startkey, endkey, include_docs}
        // return rows with id and doc
        var result = {
            rows: []
        };

        for (var id in objects) {
            if (params) {
                if (params.startkey && id < params.startkey) continue;
                if (params.endkey && id > params.endkey)     continue;
                if (!params.include_docs && id[0] == '_')    continue;
            }
            result.rows.push({id: id, value: objects[id], doc: objects[id]});
        }
        if (callback) callback(null, result);
    };

    this.extendObject = function (id, obj, callback) {
        this.getObject(id, function (err, data) {
            if (data) {
                // TODO here is the problem (DELETE it later)
                if (obj && obj.common && obj.common.members && data.common) {
                    console.log('!!!!!!!!!!!!extendObject still has "members"');
                }
                if (obj && obj.native && obj.native.repositories && data.native && data.native.repositories) {
                    console.log('!!!!!!!!!!!!extendObject still has "repositories"');
                }
                if (obj && obj.children && data.children) {
                    console.log('!!!!!!!!!!!!extendObject still has "children"');
                }

                obj = extend(true, data, obj);
            }

            that.setObject(id, obj, function (err, res) {
                // Todo Error handling
                if (typeof callback === 'function') callback(err, res, id);
            });
        });
    };

    this.setObject = function (id, obj, callback) {
        if (!obj) obj = {};
        if (!obj._id) obj._id = id;
        log.debug('couchdb setObject ' + id);
        if (objects) objects[id] = obj;
        states.setConfig(id, obj, callback);
    };

    this.delObject = function (id, callback) {
        states.delConfig(id, callback);
    };

    this.getObject = function (id, callback) {
        if (!callback) return;
        log.debug('couchdb getObject ' + id);
        if (objects && objects[id]) {
            callback(null, objects[id]);
        } else {
            states.getConfig(id, function (err, body) {
                if (objects) objects[id] = body;
                // Todo Error handling
                callback(err, body);
            });
        }
    };

    /*function dbConnect(database, create, callback) {
        if (callback) setTimeout(callback, 10);
    }*/

    var __construct = (function () {
        if (!settings.redis) settings.redis = {};

        states = new StatesRedis({
            redis: {
                host:    settings.redis.host || 'localhost',
                port:    settings.redis.port || 6379,
                options: settings.redis.options
            },
            change:  function (id, obj) {
                if (settings.change) {
                    id = id.substring(7);
                    settings.change(id, obj);
                }
            },
            connected: function () {
                if (settings.connected) settings.connected();
            },
            disconnected: function () {
                if (settings.disconnected) settings.disconnected();
            }
        });

        /*dbConnect(null, true, function () {
            //if (typeof settings.connected === 'function') settings.connected();
        });*/
    })();
}


module.exports = ObjectsInMem;