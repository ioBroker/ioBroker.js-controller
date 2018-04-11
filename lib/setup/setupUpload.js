'use strict';

function Upload(options) {
    const fs     = require('fs');
    const tools  = require(__dirname + '/../tools.js');

    options = options || {};

    if (!options.states)      throw 'Invalid arguments: states is missing';
    if (!options.objects)     throw 'Invalid arguments: objects is missing';

    let states      = options.states;
    let objects     = options.objects;
    let mime;

    // get all instances of one adapter
    function getInstances(adapter, callback) {
        objects.getObjectList({startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, (err, arr) => {
            let instances = [];
            if (!err && arr && arr.rows) {
                for (let i = 0; i < arr.rows.length; i++) {
                    if (arr.rows[i].value.type !== 'instance') continue;
                    instances.push(arr.rows[i].value._id);
                }
            }
            callback(instances);
        });
    }

    // get all instances of all adapters in the list
    function getAllInstances(adapters, callback) {
        let instances = [];
        let count = 0;
        for (let k = 0; k < adapters.length; k++) {
            if (!adapters[k]) continue;
            if (adapters[k].indexOf('.') === -1) count++;
        }
        for (let i = 0; i < adapters.length; i++) {
            if (!adapters[i]) continue;
            if (adapters[i].indexOf('.') === -1) {
                getInstances(adapters[i], inst => {
                    for (let j = 0; j < inst.length; j++) {
                        if (instances.indexOf(inst[j]) === -1) {
                            instances.push(inst[j]);
                        }
                    }
                    if (!--count && callback) {
                        callback(instances);
                        callback = null;
                    }
                });
            } else {
                if (instances.indexOf(adapters[i]) === -1) {
                    instances.push(adapters[i]);
                }
            }
        }
        if (!count && callback) {
            callback(instances);
            callback = null;
        }
    }

    // Check if some adapters must be restarted and restart them
    function checkRestartOther(adapter, callback) {
        let adapterDir = tools.getAdapterDir(adapter);
        try {
            let adapterConf = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json').toString());
            if (adapterConf.common.restartAdapters) {
                if (typeof adapterConf.common.restartAdapters !== 'object') adapterConf.common.restartAdapters = [adapterConf.common.restartAdapters];

                if (adapterConf.common.restartAdapters.length && adapterConf.common.restartAdapters[0]) {
                    getAllInstances(adapterConf.common.restartAdapters, instances => {
                        if (!instances || !instances.length) {
                            if (callback) {
                                callback();
                                callback = null;
                            }
                        } else {
                            let instancesCount = instances.length;
                            for (let r = 0; r < instances.length; r++) {
                                objects.getObject(instances[r], (err, obj) => {
                                    // if instance is enabled
                                    if (!err && obj && obj.common.enabled) {

                                        obj.common.enabled = false; // disable instance

                                        obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                        obj.ts = Date.now();

                                        objects.setObject(obj._id, obj, err => {
                                            if (!err) {

                                                obj.common.enabled = true; // enable instance

                                                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                                obj.ts = Date.now();

                                                objects.setObject(obj._id, obj, err => {
                                                    console.log('Adapter "' + obj._id + '" restarted.');
                                                    if (!--instancesCount && callback) {
                                                        callback();
                                                        callback = null;
                                                    }
                                                });
                                            } else {
                                                if (err) {
                                                    console.error('Cannot restart adapter "' + obj._id + '": ' + err);
                                                } else {
                                                    console.warn('Adapter "' + obj._id + '" is disabled and cannot be restarted.');
                                                }
                                                if (!--instancesCount && callback) {
                                                    callback();
                                                    callback = null;
                                                }
                                            }
                                        });
                                    } else if (!--instancesCount && callback) {
                                        callback();
                                        callback = null;
                                    }
                                });
                            }
                        }
                    });
                } else if (callback) {
                    callback();
                    callback = null;
                }
            } else if (callback) {
                callback();
                callback = null;
            }
        } catch (e) {
            console.error('Cannot parse ' + adapterDir + '/io-package.json:' + e);
            if (callback) {
                callback();
                callback = null;
            }
        }
    }

    this.uploadAdapterFull = (adapters, callback) => {
        if (!adapters || !adapters.length) {
            if (callback) callback();
            return;
        }
        const adapter = adapters.pop();
        this.uploadAdapter(adapter, true, true, () => {
            this.upgradeAdapterObjects(adapter, () => {
                this.uploadAdapter(adapter, false, true, () => {
                    setImmediate(() => this.uploadAdapterFull(adapters, callback));
                });
            });
        });
    };

    this.uploadFile = (source, target, callback) => {
        const request = require('request');
        target = target.replace(/\\/g, '/');
        source = source.replace(/\\/g, '/');
        if (target[0] === '/') target = target.substring(1);
        if (target[target.length - 1] === '/') {
            let name = source.split('/').pop();
            name = name.split('?')[0];
            if (name.indexOf('.') === -1) name = 'index.html';
            target += name;
        }
        let parts = target.split('/');
        const adapter = parts[0];
        parts.splice(0, 1);
        target = parts.join('/');

        if (source.match(/^http:\/\/|^https:\/\//)) {
            request(source, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    objects.writeFile(adapter, target, body, err => {
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
                objects.writeFile(adapter, target, fs.readFileSync(source), err => {
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
    this.uploadAdapter = (adapter, isAdmin, forceUpload, subTree, callback) => {
        const id = adapter + (isAdmin ? '.admin' : '');
        const adapterDir = tools.getAdapterDir(adapter);
        let   dir = adapterDir + (isAdmin ? '/admin' : '/www');
        let files = [];
        let rev;

        if (typeof subTree === 'function') {
            callback = subTree;
            subTree = null;
        }
        if (subTree) {
            dir += '/' + subTree;
        }

        if (!isAdmin) {
            let cfg;
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
            objects.getObject('system.adapter.' + adapter + '.upload', (err, obj) => {
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
                            from: 'system.host.' + tools.getHostName() + '.cli',
                            ts: Date.now(),
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
                setTimeout(_adapter => {
                    maxFiles = files.length || 1;
                    upload(_adapter);
                }, 25, adapter);
            }
        }

        let maxFiles = 0;
        let lastProgressUpdate = (new Date()).getTime();

        function upload(adapter) {
            let file;
            if (!files.length) {
                if (!isAdmin) {
                    states.setState('system.adapter.' + adapter + '.upload', {val: 0, ack: true}, () => {
                        if (typeof callback === 'function') callback(adapter);
                    });
                } else {
                    if (typeof callback === 'function') callback(adapter);
                }
            } else {
                file = files.pop();
                if (file === '.gitignore') {
                    upload(adapter);
                    return;
                }

                const mimeType = mime.lookup(file);
                let attName;
                attName = file.split('/' + tools.appName + '.');
                if (attName.length === 1) {
                    // try to find anyway if adapter is not lower case
                    const pos = file.toLowerCase().indexOf(tools.appName.toLowerCase());
                    if (pos !== -1) {
                        attName = ['', file.substring(tools.appName.length + 2)];
                    }
                }

                attName = attName.pop();
                attName = attName.split('/').slice(2).join('/');
                if (files.length > 100) {
                    if (!(files.length % 50)) {
                        console.log('upload [' + files.length + ']', id, file, attName, mimeType);
                    }

                } else if (files.length > 20) {
                    if (!(files.length % 10)) {
                        console.log('upload [' + files.length + ']', id, file, attName, mimeType);
                    }
                } else {
                    console.log('upload [' + files.length + ']', id, file, attName, mimeType);
                }

                // Update upload indicator
                if (!isAdmin) {
                    const now = (new Date()).getTime();
                    if (now - lastProgressUpdate > 1000) {
                        lastProgressUpdate = now;
                        states.setState('system.adapter.' + adapter + '.upload', {val: Math.round(1000 * (maxFiles - files.length) / maxFiles) / 10, ack: true});
                    }
                }

                fs.createReadStream(file).pipe(
                    objects.insert(id, attName, null, mimeType, {
                        rev: rev
                    }, (err, res) => {
                        if (err) {
                            console.log(err);
                            if (typeof callback === 'function') callback(adapter);
                        }
                        if (res) rev = res.rev;
                        setTimeout(upload, 50, adapter);
                    })
                );
            }
        }

        function walk(dir, done) {
            let results = [];
            fs.readdir(dir, (err, list) => {
                if (err) return done(err);
                let i = 0;
                (function next() {
                    let file = list[i++];
                    if (!file) return done(null, results);
                    file = dir + '/' + file;
                    fs.stat(file, (err, stat) => {
                        if (stat && stat.isDirectory()) {
                            walk(file, (err, res) => {
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

        objects.getObject(id, (err, res) => {
            if (err || !res) {
                objects.setObject(id, {
                    type: 'meta',
                    common: {
                        name: id.split('.').pop(),
                        type: isAdmin ? 'admin' : 'www'
                    },
                    from: 'system.host.' + tools.getHostName() + '.cli',
                    ts: Date.now(),
                    native: {}
                }, (err, res) => {
                    if (res) rev = res.rev;
                    if (!isAdmin) {
                        checkRestartOther(adapter, () => walk(dir, done));
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
                        checkRestartOther(adapter, () => walk(dir, done));
                    } else {
                        walk(dir, done);
                    }
                }
            }
        });
    };

    function extendNative(target, additional) {
        for (let attr in additional) {
            if (additional.hasOwnProperty(attr)) {
                if (target[attr] === undefined) {
                    target[attr] = additional[attr];
                } else if (typeof additional[attr] === 'object' && !(additional[attr] instanceof Array)) {
                    try {
                        target[attr] = target[attr] || {};
                    } catch (e) {
                        console.warn(`Cannot update attribute ${attr} of native`);
                    }
                    extendNative(target[attr], additional[attr]);
                }
            }
        }
        return target;
    }

    function extendCommon(target, additional) {
        for (let attr in additional) {
            if (additional.hasOwnProperty(attr)) {
                if (attr === 'title' || attr === 'schedule' || attr === 'mode' || attr === 'loglevel' || attr === 'enabled') {
                    if (target[attr] === undefined) {
                        target[attr] = additional[attr];
                    }
                } else if (typeof additional[attr] !== 'object' || (additional[attr] instanceof Array)) {
                    try {
                        target[attr] = additional[attr];
                    } catch (e) {
                         console.warn(`Cannot update attribute ${attr} of common`);
                    }
                } else {
                    target[attr] = target[attr] || {};
                    if (typeof target[attr] !== 'object') {
                        target[attr] = {}; // here we clean the simple value with object
                    }

                    extendCommon(target[attr], additional[attr]);
                }
            }
        }
        return target;
    }

    this.upgradeAdapterObjects = (name, iopack, callback) => {
        if (typeof iopack === 'function') {
            callback = iopack;
            iopack = null;
        }
        if (!iopack) {
            const adapterDir = tools.getAdapterDir(name);
            try {
                iopack = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json', 'utf8'));
            } catch (e) {
                console.error('Cannot find io-package.json in ' + adapterDir);
                iopack = null;
            }
        }

        if (!iopack) {
            callback(name);
        } else {
            objects.getObject('system.adapter.' + name, (err, obj) => {
                if (err || !obj) {
                    console.error('system.adapter.' + name + ' does not exist');
                    callback(name);
                } else {
                    obj.common = iopack.common || {};
                    obj.native = iopack.native || {};

                    obj.common.installedVersion = iopack.common.version;

                    const hostname = tools.getHostName();

                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = Date.now();

                    objects.setObject('system.adapter.' + name, obj, () => {
                        // Update all instances of this host
                        objects.getObjectView('system', 'instance', {startkey: 'system.adapter.' + name + '.', endkey: 'system.adapter.' + name + '.\u9999'}, null, function (err, res) {
                            let cntr = 0;

                            if (res) {
                                for (let i = 0; i < res.rows.length; i++) {
                                    if (res.rows[i].value.common.host === hostname) {
                                        cntr++;
                                        objects.getObject(res.rows[i].id, (err, _obj) => {
                                            let newObject = JSON.parse(JSON.stringify(_obj));

                                            // all common settings should be taken from new one
                                            newObject.common = extendCommon(newObject.common, iopack.common);
                                            newObject.native = extendNative(newObject.native, iopack.native);

                                            newObject.common.installedVersion = iopack.common.version;
                                            newObject.common.version          = iopack.common.version;

                                            // Compare objects to reduce restarts of instances
                                            if (JSON.stringify(newObject) !== JSON.stringify(_obj)) {
                                                console.log('Update "' + newObject._id + '"');

                                                newObject.from = 'system.host.' + tools.getHostName() + '.cli';
                                                newObject.ts = Date.now();

                                                objects.setObject(newObject._id, newObject, () => {
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
                                for (let _id in iopack.objects) {
                                    if (!iopack.objects.hasOwnProperty(_id)) continue;
                                    cntr++;

                                    iopack.objects[_id].from = 'system.host.' + tools.getHostName() + '.cli';
                                    iopack.objects[_id].ts = Date.now();

                                    objects.setObject(iopack.objects[_id]._id, iopack.objects[_id], err => {
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
