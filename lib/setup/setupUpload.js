function Upload(options) {
    var fs = require('fs');
    var tools = require(__dirname + '/../tools.js');

    var that = this;

    options = options || {};

    if (!options.states)      throw "Invalid arguments: states is missing";
    if (!options.objects)     throw "Invalid arguments: objects is missing";
    if (!options.processExit) throw "Invalid arguments: processExit is missing";

    var states      = options.states;
    var objects     = options.objects;
    var processExit = options.processExit;
    var mime;

    function checkRestartOther(adapter, callback) {
        // Check if some adapters must be restarted
        // If some other adapters must be restarted
        var adapterDir = tools.getAdapterDir(adapter);
        var isRestarting = false;
        try {
            var adapterConf = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json').toString());
            if (adapterConf.common.restartAdapters) {
                if (typeof adapterConf.common.restartAdapters !== 'object') adapterConf.common.restartAdapters = [adapterConf.common.restartAdapters];
                for (var r = 0; r < adapterConf.common.restartAdapters.length; r++) {
                    if (adapterConf.common.restartAdapters[r].indexOf('.') == -1) {
                        // TODO: find all adapters
                        adapterConf.common.restartAdapters[r] = adapterConf.common.restartAdapters[r] + '.0';
                    }
                    isRestarting = true;

                    objects.getObject('system.adapter.' + adapterConf.common.restartAdapters[r], function (err, obj) {
                        if (!err && obj && obj.common.enabled) {

                            obj.common.enabled = false;

                            objects.setObject(obj._id, obj, function (err) {
                                if (!err) {

                                    obj.common.enabled = true;

                                    objects.setObject(obj._id, obj, function (err) {
                                        console.log('Adapter "' + obj._id + '" restarted.');
                                        callback();
                                    });
                                } else {
                                    if (err) {
                                        console.error('Cannot restart adapter "' + obj._id + '": ' + err);
                                    } else {
                                        console.warn('Adapter "' + obj._id + '" is disabled and cannot be restarted.');
                                    }
                                    callback();
                                }
                            });
                        } else {
                            callback();
                        }
                    });
                }
            }
        } catch (e) {
            console.error('Cannot parse ' + adapterDir + '/io-package.json:' + e);
            callback();
        }
        if (!isRestarting) callback();
    }

    this.uploadAdapterFull = function (adapters, callback) {
        if (!adapters || !adapters.length) {
            if (callback) callback();
            return;
        }
        var adapter = adapters.pop();
        that.uploadAdapter(adapter, true, true, function () {
            that.uploadAdapter(adapter, false, true, function () {
                setTimeout(function () {
                    that.uploadAdapterFull(adapters, callback);
                }, 0);
            });
        });
    };

    // Upload www folder of adapter into ObjectsDB
    this.uploadAdapter = function (adapter, isAdmin, forceUpload, subTree, callback) {
        var rev;
        var id = adapter + (isAdmin ? '.admin' : '');
        var adapterDir = tools.getAdapterDir(adapter);
        var dir = adapterDir + (isAdmin ? '/admin' : '/www');
        var files = [];
        if (typeof subTree == 'function') {
            callback = subTree;
            subTree = null;
        }
        if (subTree) {
            dir += '/' + subTree;
        }

        if (!isAdmin) {
            var cfg;
            // check for common.wwwDontUpload (required for legacy adapter)
            if (fs.existsSync(adapterDir + '/io-package.json')) {
                cfg = require(adapterDir + '/io-package.json');
            }
            if (cfg && cfg.common && cfg.common.wwwDontUpload) {
                if (typeof callback === 'function') callback(adapter);
                return;
            }
        }
        // do not upload www dir of admin adapter
        if (adapter === 'admin' && !isAdmin) {
            // To DO remove after a while
            console.log("This should never happens!");
            if (typeof callback === 'function') callback(adapter);
            return;
        }

        // Create "upload progress" object if not exists
        if (!isAdmin) {
            objects.getObject('system.adapter.' + adapter + '.upload', function (err, obj) {
                if (err || !obj) {
                    objects.setObject('system.adapter.' + adapter + '.upload',
                        {
                            _id:   'system.adapter.' + adapter + '.upload',
                            type:   'state',
                            common: {
                                name: adapter + '.upload',
                                type: 'number',
                                role: 'indicator.state',
                                unit: '%',
                                def:  0,
                                desc: 'Upload process indicator'
                            },
                            native: {}
                        }
                    );
                }
            });
            // Set indicator to 0
            states.setState('system.adapter.' + adapter + '.upload', 0, true);
        }

        if (!mime) mime = require('mime');

        function done(err, res) {
            if (err) {
                callback();
            } else {
                console.log('got ' + dir);
                files = res;
                setTimeout(function (_adapter, _isAdmin, _callback) {
                    maxFiles = files.length || 1;
                    upload(_adapter, _isAdmin, _callback);
                }, 25, adapter, isAdmin, callback);
            }
        }

        var maxFiles = 0;
        var lastProgressUpdate = (new Date()).getTime();

        function upload(adapter) {
            var file;
            if (!files.length) {
                if (!isAdmin) states.setState('system.adapter.' + adapter + '.upload', 0, true);
                if (typeof callback === 'function') callback(adapter);
            } else {
                file = files.pop();
                if (file == '.gitignore') {
                    upload();
                    return;
                }

                var mimeType = mime.lookup(file);
                var attName;
                if (file.indexOf('/adapter/' + adapter) == -1) {
                    attName = file.split('/iobroker.');
                } else {
                    attName = file.split('/adapter/');
                }
                attName = attName.pop();
                attName = attName.split('/').slice(2).join('/');
                console.log('upload [' + files.length + ']', id, file, attName, mimeType);

                // Update upload indicator
                if (!isAdmin) {
                    var now = (new Date()).getTime();
                    if (now - lastProgressUpdate > 1000) {
                        lastProgressUpdate = now;
                        states.setState('system.adapter.' + adapter + '.upload', parseInt(1000 * (maxFiles - files.length) / maxFiles) / 10, true);
                    }
                }

                fs.createReadStream(file).pipe(
                    objects.insert(id, attName, null, mimeType, {
                        rev: rev
                    }, function (err, res) {
                        if (err) {
                            console.log(err);
                            if (typeof callback === 'function') callback(adapter);
                        }
                        if (res) rev = res.rev;
                        setTimeout(function () {
                            upload(adapter);
                        }, 50);
                    })
                );
            }
        }

        function walk(dir, done) {
            var results = [];
            fs.readdir(dir, function (err, list) {
                if (err) return done(err);
                var i = 0;
                (function next() {
                    var file = list[i++];
                    if (!file) return done(null, results);
                    file = dir + '/' + file;
                    fs.stat(file, function (err, stat) {
                        if (stat && stat.isDirectory()) {
                            walk(file, function (err, res) {
                                results = results.concat(res);
                                next();
                            });
                        } else {
                            if (!file.match(/\.npmignore$/) && !file.match(/\.gitignore$/)) results.push(file);
                            next();
                        }
                    });
                })();
            });
        }

        objects.getObject(id, function (err, res) {
            if (err || !res) {
                objects.setObject(id, {
                    type: 'meta',
                    common: {
                        name: id.split('.').pop(),
                        type: isAdmin ? 'admin' : 'www'
                    },
                    native: {}
                }, function (err, res) {
                    if (res) rev = res.rev;
                    if (!isAdmin) {
                        checkRestartOther(adapter, function () {
                            walk(dir, done);
                        });
                    } else {
                        walk(dir, done);
                    }
                });
            } else {
                if (!forceUpload) {
                    if (typeof callback === 'function') callback(adapter);
                } else {
                    rev = res._rev;
                    if (!isAdmin) {
                        checkRestartOther(adapter, function () {
                            walk(dir, done);
                        });
                    } else {
                        walk(dir, done);
                    }
                }
            }
        });
    };
}

module.exports = Upload;
