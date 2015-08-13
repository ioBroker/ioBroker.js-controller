/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";

var extend = require('node.extend');

function ObjectsCouch(settings) {

    var that = this;

    var host;
    var port;
    var db;
    var log =  settings.logger;
    var nano = require('nano')({
        url: 'http://' + (settings.connection.host || 'localhost') + ':' + (settings.connection.port || 5984),
        log: function (id, args) {
            log.debug(id + ' ' + JSON.stringify(args));
        }
    });
    var couch;
    var change;

    var __construct = (function () {

        host = settings.connection.host || 'localhost';
        port = settings.connection.port || 5984;
        db = 'iobroker' + (settings.namespace ? '_' + settings.namespace : '');

        change = settings.change || function (id, obj) {
            log.debug('couchdb change: ' + id + ' ' + JSON.stringify(change));
        };

        dbConnect(db, true, function () {
            if (typeof settings.connected === 'function') settings.connected('CouchDB');
            that.insert = couch.attachment.insert;
        });

        // TODO somehow detect disconnection to call settings.disconnected function
    })();

    this.writeFile = function (id, name, data, mime, params, callback) {
        couch.attachment.insert(id, name, data, mime, params, callback);

    };

    this.destroyDB = function (callback) {
        nano.db.destroy(db, callback);
    };

    this.readFile = function (id, name, params, callback) {
        couch.attachment.get(id, name, params, callback);
    };

    this.unlink = function (id, name, rev, callback) {
        couch.destroy(id, name, rev, callback);
    };

    this.subscribe = function (pattern) {
        var that = this;
        if (!couch) {
            setTimeout(function (_pattern) {
                that.subscribe(_pattern);
            }, 100, pattern);
            return;
        }

        var feed = couch.follow({since: "now"});
        feed.on('change', function (obj) {
            couch.get(obj.id, null, function (err, body) {
                // Todo Error handling
                if (pattern !== '*') {
                    var part = pattern.slice(0, -1);
                    if (obj.id.slice(0, part.length) === part) {
                        change(obj.id, body);
                    }
                } else {
                    change(obj.id, body);
                }
            });
        });
        log.debug('couchdb follow ' + pattern);
        feed.follow();
    };

    this.getObjectView = function (design, search, params, callback) {
        couch.view(design, search, params, function (err, doc) {
            if (err) {
                log.debug('couchdb getObjectView ' + design + ' ' + search + ' ' + err);
            }
            callback(err, doc);
        });
    };

    this.getObjectList = function (params, callback) {
        couch.list(params, function (err, doc) {
            if (err) {
                log.debug('couchdb getObjectList ' + err);
            }
            callback(err, doc);
        });
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

            couch.insert(obj, id, function (err, res) {
                // Todo Error handling
                if (typeof callback === 'function') callback(err, res, id);
            });
        });
    };

    this.setObject = function (id, obj, callback) {
        if (!obj) obj = {};
        if (!obj._id) obj._id = id;
        log.debug('couchdb setObject ' + id);
        couch.head(id, function (err, _, headers) {
            if (!err) {
                if (headers.etag) obj._rev = JSON.parse(headers.etag);
                couch.insert(obj, id, function (err, res) {
                    // Todo Error handling
                    if (typeof callback === 'function') callback(err, res, id);
                });
            } else if (err.status_code == 404) {
                couch.insert(obj, id, function (err, res) {
                    // Todo Error handling
                    if (typeof callback === 'function') callback(err, res, id);
                });
            }
            // Todo Error handling

        });
    };

    this.delObject = function (id, callback) {
        this.setObject(id, {_id: id, _deleted: true}, callback);
    };

    this.getObject = function (id, callback) {
        log.debug('couchdb getObject ' + id);
        couch.get(id, null, function (err, body) {
            // Todo Error handling
            callback(err, body);
        });
    };

    function dbConnect(database, create, callback) {
        nano.db.get(database, function (err, body) {
            if (!err) {
                couch = nano.use(database);
                log.debug('couchdb using db ' + database);
                if (callback) callback();
            } else {
                if (err.status_code) {
                    switch (err.status_code) {

                        case 404:
                            log.info('couchdb ' + database + ' doesn\'t exist');
                            if (create) dbCreate(database, function () {
                                dbConnect(database, create, callback);
                            });
                            break;


                        default:
                            log.error('couchdb' + err);

                    }
                } else if (err.code) {
                    switch (err.code) {
                        case 'ECONNREFUSED':
                            log.error('couchdb connection refused');
                            break;

                        default:
                            log.error('couchdb connection error: ' + err.code);

                    }
                }
            }
        });
    }


    function dbCreate(name, callback) {
        nano.db.create(name, function (err, body) {
            if (!err) {
                log.info('couchdb database ' + name + ' created!');
                if (callback) callback();
            } else {
                log.error('couchdb error while creating db ' + name);
            }
        });
    }

}


module.exports = ObjectsCouch;