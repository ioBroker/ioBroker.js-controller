var extend = require('node.extend');

function ObjectsCouch(settings) {

    var objects = {};

    var host;
    var port;
    var db;
    var log = settings.logger;
    var nano =      require('nano')({
        url: 'http://' + (settings.host || 'localhost') + ':' + (settings.port || 5984),
        log: function (id, args) {
            log.debug(id + ' ' + JSON.stringify(args))
        }
    });
    var couch;
    var change;
    var feed;



    var __construct = function () {
        var objects = {};

        host = settings.host || 'localhost';
        port = settings.port || 5984;
        db = 'iobroker' + (settings.namespace ? '_' + settings.namespace : '');

        change =         settings.change || function (id, obj) {
            log.debug('couchdb change: ' + id + ' ' + JSON.stringify(change));
        };

        var that = this;

        dbConnect(db, true, function () {
            var feed = couch.follow({since: "now"});
            feed.on('change', function (obj) {
                couch.get(obj.id, null, function(err, body) {
                    // Todo Error handling
                    change(obj.id, body);
                });

            });
            feed.follow();
            if (typeof settings.connected === 'function') settings.connected();
        });
    }();

    this.subscribe = function (pattern) {
        log.debug('couchdb follow ' + pattern);
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
            obj = extend(true, data, obj);
            couch.insert(obj, id, function (err, res) {
                // Todo Error handling
                if (typeof callback === 'function') callback(err, res);
            });
        });
    };

    this.setObject = function (id, obj, callback) {
        if (!obj._id) obj._id = id;
        log.debug('couchdb setObject ' + id);
        couch.head(id, function(err, _, headers) {
            if (!err) {
                if (headers.etag) obj._rev = JSON.parse(headers.etag);
                couch.insert(obj, id, function (err, res) {
                    // Todo Error handling
                    if (typeof callback === 'function') callback(err, res);
                });
            } else if (err.status_code == 404) {
                couch.insert(obj, id, function (err, res) {
                    // Todo Error handling
                    if (typeof callback === 'function') callback(err, res);
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
        couch.get(id, null, function(err, body) {
            // Todo Error handling
            callback(err, body);
        });
    };




    function dbConnect(database, create, callback) {
        nano.db.get(database, function(err, body) {
            if (!err) {
                couch = nano.use(database);
                log.debug('couchdb using db ' + database);
                if (callback) callback();
            } else {
                if (err.status_code) {
                    switch (err.status_code) {
                        case 404:
                            log.info('couchdb ' + database + ' doesn\'t exist');
                            if (create) dbCreate(database, function() {
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
                log.error('couchdb error while creating db '+name);
            }
        });
    }

}


module.exports = ObjectsCouch;