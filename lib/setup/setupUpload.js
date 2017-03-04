function Upload(options) {
    var fs     = require('fs');
    var tools  = require(__dirname + '/../tools.js');

    var that = this;

    options = options || {};

    if (!options.states)      throw 'Invalid arguments: states is missing';
    if (!options.objects)     throw 'Invalid arguments: objects is missing';
    if (!options.processExit) throw 'Invalid arguments: processExit is missing';

    var states      = options.states;
    var objects     = options.objects;
    var processExit = options.processExit;
    var mime;

    // get all instances of one adapter
    function getInstances(adapter, callback) {
        objects.getObjectList({startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, function (err, arr) {
            var instances = [];
            if (!err && arr && arr.rows) {
                var files = [];
                var count = 0;
                for (var i = 0; i < arr.rows.length; i++) {
                    if (arr.rows[i].value.type != 'instance') continue;
                    instances.push(arr.rows[i].value._id);
                }
            }
            callback(instances);
        });
    }

    // get all instances of all adapters in the list
    function getAllInstances(adapters, callback) {
        var instances = [];
        var count = adapters.length;
        for (var i = 0; i < adapters.length; i++) {
            if (!adapters[i]) continue;
            if (adapters[i].indexOf('.') == -1) {
                getInstances(adapters[i], function (inst) {
                    for (var j = 0; j < inst.length; j++) {
                        if (instances.indexOf(inst[j]) == -1) instances.push(inst[j]);
                    }
                    if (!--count) callback(instances);
                });
            } else {
                if (instances.indexOf(adapters[i]) == -1) instances.push(adapters[i]);
            }
        }
        if (!count) callback(instances);
    }

    // Check if some adapters must be restarted and restart them
    function checkRestartOther(adapter, callback) {
        var adapterDir = tools.getAdapterDir(adapter);
        console.log('checkRestartOther start: ' + adapterDir);
        var isRestarting = false;
        try {
            var adapterConf = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json').toString());
            if (adapterConf.common.restartAdapters) {
                if (typeof adapterConf.common.restartAdapters !== 'object') adapterConf.common.restartAdapters = [adapterConf.common.restartAdapters];

                if (adapterConf.common.restartAdapters.length && adapterConf.common.restartAdapters[0]) {
                    isRestarting = true;
                    getAllInstances(adapterConf.common.restartAdapters, function (instances) {
                        isRestarting = false;
                        instancesCount=instances.length;
                        for (var r = 0; r < instances.length; r++) {
                            isRestarting = true;

                            objects.getObject(instances[r], function (err, obj) {
                                // if instance is enabled
                                if (!err && obj && obj.common.enabled) {

                                    obj.common.enabled = false; // disable instance

                                    objects.setObject(obj._id, obj, function (err) {
                                        if (!err) {

                                            obj.common.enabled = true; // enable instance

                                            objects.setObject(obj._id, obj, function (err) {
                                                console.log('Adapter "' + obj._id + '" restarted.');
                                                console.log('checkRestartOther callback ' + instancesCount);
                                                if (!--instancesCount) callback();
                                            });
                                        } else {
                                            if (err) {
                                                console.error('Cannot restart adapter "' + obj._id + '": ' + err);
                                            } else {
                                                console.warn('Adapter "' + obj._id + '" is disabled and cannot be restarted.');
                                            }
                                            console.log('checkRestartOther callback ' + instancesCount);
                                            if (!--instancesCount) callback();
                                        }
                                    });
                                } else {
                                    console.log('checkRestartOther callback ' + instancesCount);
                                    if (!--instancesCount) callback();
                                }
                            });
                        }
                    });
                }
                else {
                    console.log('checkRestartOther callback else 1');
                    callback();
                }
             }
             else {
                 console.log('checkRestartOther callback else 2');
                 callback();
             }
        } catch (e) {
            console.error('Cannot parse ' + adapterDir + '/io-package.json:' + e);
            if (isRestarting) {
                console.log('Cannot parse ' + adapterDir + '/io-package.json:' + e);
                console.log('checkRestartOther callback error 1');
                callback();
            }
        }
    }

    this.uploadAdapterFull = function (adapters, callback) {
        if (!adapters || !adapters.length) {
            if (callback) callback();
            return;
        }
        var adapter = adapters.pop();
        that.uploadAdapter(adapter, true, true, function () {
            that.upgradeAdapterObjects(adapter, function () {
                that.uploadAdapter(adapter, false, true, function () {
                    setTimeout(function () {
                        that.uploadAdapterFull(adapters, callback);
                    }, 0);
                });
            });
        });
    };

    this.uploadFile = function (source, target, callback) {
        var request = require('request');
        target = target.replace(/\\/g, '/');
        source = source.replace(/\\/g, '/');
        if (target[0] === '/') target = target.substring(1);
        if (target[target.length - 1] == '/') {
            var name = source.split('/').pop();
            name = name.split('?')[0];
            if (name.indexOf('.') === -1) name = 'index.html';
            target += name;
        }
        var parts = target.split('/');
        var adapter = parts[0];
        parts.splice(0, 1);
        target = parts.join('/');

        if (source.match(/^http:\/\/|^https:\/\//)) {
            request(source, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    objects.writeFile(adapter, target, body, function (err) {
                        if (err) console.error(err);
                        if (typeof callback === 'function') callback(err, adapter + '/' + target);
                    });
                } else {
                    console.error('Cannot get URL: ' + error || response.statusCode);
                    if (typeof callback === 'function') callback(error || response.statusCode, adapter + '/' + target);
                }
            });
        } else {
            try {
                objects.writeFile(adapter, target, fs.readFileSync(source), function (err) {
                    if (err) console.error(err);
                    if (typeof callback === 'function') callback(err, adapter + '/' + target);
                });
            } catch (err) {
                console.error('Cannot read file "' + source + '": ' + err);
                if (typeof callback === 'function') callback(err, adapter + '/' + target);
            }
        }
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
            console.log('This should never happens!');
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
                console.log('error in upload: ' + err);
                callback();
            } else {
                console.log('got ' + dir);
                files = res;
                setTimeout(function (_adapter) {
                    maxFiles = files.length || 1;
                    upload(_adapter);
                }, 25, adapter);
            }
        }

        var maxFiles = 0;
        var lastProgressUpdate = (new Date()).getTime();

        function upload(adapter) {
            var file;
            if (!files.length) {
                console.log('call callback after finished upload');
                if (!isAdmin) {
                    states.setState('system.adapter.' + adapter + '.upload', {val: 0, ack: true}, function () {
                        if (typeof callback === 'function') callback(adapter);
                    });
                } else {
                    if (typeof callback === 'function') callback(adapter);
                }
            } else {
                file = files.pop();
                if (file == '.gitignore') {
                    upload(adapter);
                    return;
                }

                var mimeType = mime.lookup(file);
                var attName;
                attName = file.split('/' + tools.appName + '.');
                if (attName.length === 1) {
                    // try to find anyway if adapter is not lower case
                    var pos = file.toLowerCase().indexOf(tools.appName.toLowerCase());
                    if (pos !== -1) attName = ['', file.substring(tools.appName.length + 2)];
                }

                attName = attName.pop();
                attName = attName.split('/').slice(2).join('/');
                console.log('upload [' + files.length + ']', id, file, attName, mimeType);

                // Update upload indicator
                if (!isAdmin) {
                    var now = (new Date()).getTime();
                    if (now - lastProgressUpdate > 1000) {
                        lastProgressUpdate = now;
                        states.setState('system.adapter.' + adapter + '.upload', {val: parseInt(1000 * (maxFiles - files.length) / maxFiles) / 10, ack: true});
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
                    rev = res.rev;
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

    function extendNative(target, additional) {
        for (var attr in additional) {
            if (target[attr] === undefined) {
                target[attr] = additional[attr];
            } else if (typeof additional[attr] === 'object' && !(additional[attr] instanceof Array)) {
                target[attr] = target[attr] || {};
                extendNative(target[attr], additional[attr]);
            }
        }
        return target;
    }

    function extendCommon(target, additional) {
        for (var attr in additional) {
            if (attr === 'title' || attr === 'schedule' || attr === 'mode' || attr === 'loglevel' || attr === 'enabled') {
                if (target[attr] === undefined) target[attr] = additional[attr];
            } else
            if (typeof additional[attr] !== 'object' || (additional[attr] instanceof Array)) {
                target[attr] = additional[attr];
            } else {
                target[attr] = target[attr] || {};
                extendCommon(target[attr], additional[attr]);
            }
        }
        return target;
    }

    this.upgradeAdapterObjects = function (name, iopack, callback) {
        if (typeof iopack == 'function') {
            callback = iopack;
            iopack = null;
        }
        if (!iopack) {
            var adapterDir = tools.getAdapterDir(name);
            try {
                iopack = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json'));
            } catch (e) {
                console.error('Cannot find io-package.json in ' + adapterDir);
                iopack = null;
            }
        }

        if (!iopack) {
            callback(name);
        } else {
            objects.getObject('system.adapter.' + name, function (err, obj) {
                if (err || !obj) {
                    console.error('system.adapter.' + name + ' does not exist');
                    callback(name);
                } else {
                    obj.common = iopack.common || {};
                    obj.native = iopack.native || {};

                    obj.common.installedVersion = iopack.common.version;

                    var hostname = tools.getHostName();

                    objects.setObject('system.adapter.' + name, obj, function () {
                        // Update all instances of this host
                        objects.getObjectView('system', 'instance', {startkey: 'system.adapter.' + name + '.', endkey: 'system.adapter.' + name + '.\u9999'}, null, function (err, res) {
                            var cntr = 0;

                            if (res) {
                                for (var i = 0; i < res.rows.length; i++) {
                                    if (res.rows[i].value.common.host === hostname) {
                                        cntr++;
                                        objects.getObject(res.rows[i].id, function (err, _obj) {
                                            var newObject = JSON.parse(JSON.stringify(_obj));

                                            // all common settings should be taken from new one
                                            newObject.common = extendCommon(newObject.common, iopack.common);
                                            newObject.native = extendNative(newObject.native, iopack.native);

                                            newObject.common.installedVersion = iopack.common.version;
                                            newObject.common.version          = iopack.common.version;

                                            // Compare objects to reduce restarts of instances
                                            if (JSON.stringify(newObject) !== JSON.stringify(_obj)) {
                                                console.log('Update "' + newObject._id + '"');
                                                objects.setObject(newObject._id, newObject, function () {
                                                    if (!--cntr && callback) callback(name);
                                                });
                                            } else {
                                                if (!--cntr && callback) callback(name);
                                            }
                                        });
                                    }
                                }
                            }

                            // updates "_design/system" and co
                            if (iopack.objects && typeof iopack.objects === 'object') {
                                for (var _id in iopack.objects) {
                                    if (!iopack.objects.hasOwnProperty(_id)) continue;
                                    cntr++;
                                    objects.setObject(iopack.objects[_id]._id, iopack.objects[_id], function (err) {
                                        if (err) console.error('Cannot update object: ' + err);
                                        if (!--cntr && callback) callback(name);
                                    });
                                }
                            }

                            if (!cntr && callback) callback(name);
                        });
                    });
                }
            });
        }
    };
}

module.exports = Upload;
