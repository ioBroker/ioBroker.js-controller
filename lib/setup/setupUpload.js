/**
 *      Upload adapter files into DB
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';

/** @class */
function Upload(options) {
    const fs        = require('fs-extra');
    const tools     = require('../tools');
    const hostname  = tools.getHostName();
    const deepClone = require('deep-clone');
    const { isDeepStrictEqual } = require('util');

    options = options || {};

    if (!options.states)      {
        throw new Error('Invalid arguments: states is missing');
    }
    if (!options.objects)     {
        throw new Error('Invalid arguments: objects is missing');
    }

    const states      = options.states;
    const objects     = options.objects;

    let callbacks;
    let callbackId = 1;
    let mime;
    // attName = file.split('/' + tools.appName + '.');
    const regApp = new RegExp('/' + tools.appName.replace(/\./g, '\\.') + '\\.', 'i');

    function checkHostsIfAlive(hosts, callback, _result) {
        _result = _result || [];
        if (!hosts || !hosts.length) {
            callback(_result);
        } else {
            const host = hosts.shift();
            states.getState(host + '.alive', (err, state) => {
                if (state && state.val) {
                    _result.push(host);
                }
                setImmediate(checkHostsIfAlive, hosts, callback, _result);
            });
        }
    }

    function getHosts(onlyAlive, callback) {
        if (typeof onlyAlive === 'function') {
            callback = onlyAlive;
            onlyAlive = false;
        }

        objects.getObjectList({startkey: 'system.host.', endkey: 'system.host.\u9999'}, (err, arr) => {
            const hosts = [];
            if (!err && arr && arr.rows) {
                for (let i = 0; i < arr.rows.length; i++) {
                    if (arr.rows[i].value.type !== 'host') {
                        continue;
                    }
                    hosts.push(arr.rows[i].value._id);
                }
            }
            if (onlyAlive) {
                checkHostsIfAlive(hosts, callback);
            } else {
                callback(hosts);
            }
        });
    }

    // Check if some adapters must be restarted and restart them
    function checkRestartOther(adapter, callback) {
        const adapterDir = tools.getAdapterDir(adapter);
        try {
            const adapterConf = fs.readJSONSync(adapterDir + '/io-package.json');
            if (adapterConf.common.restartAdapters) {
                if (!Array.isArray(adapterConf.common.restartAdapters)) {
                    // its not an array, now it can only be a single adapter as string
                    if (typeof adapterConf.common.restartAdapters !== 'string') {
                        return;
                    }
                    adapterConf.common.restartAdapters = [adapterConf.common.restartAdapters];
                }

                if (adapterConf.common.restartAdapters.length && adapterConf.common.restartAdapters[0]) {
                    tools.getAllInstances(adapterConf.common.restartAdapters, objects, (err, instances) => {
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

                                                objects.setObject(obj._id, obj, _err => {
                                                    console.log('Adapter "' + obj._id + '" restarted.');
                                                    if (!--instancesCount && callback) {
                                                        callback();
                                                        callback = null;
                                                    }
                                                });
                                            } else {
                                                console.error('Cannot restart adapter "' + obj._id + '": ' + err);
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

    function sendToHostFromCli(host, command, message, callback) {
        const time = Date.now();
        const from = 'system.host.' + hostname + '_cli_' + time;

        const timeout = setTimeout(() => {
            callback && callback();
            callback = null;
            states.unsubscribeMessage(from);
            states.onChange = null;
        }, 60000);

        states.onChange = (id, msg) => {
            if (id.endsWith(from)) {
                if (msg.command === 'log' || msg.command === 'error' || msg.command === 'warn') {
                    console[msg.command](host + ' -> ' + msg.text);
                } else if (callback) {
                    callback(msg && msg.message);
                    callback = null;
                    clearTimeout(timeout);
                    states.unsubscribeMessage(from);
                    states.onChange = null;
                }
            }
        };

        states.subscribeMessage(from, () => {
            const obj = {command, message: message, from: 'system.host.' + hostname + '_cli_' + time};

            obj.callback = {
                message,
                id:      callbackId++,
                ack:     false,
                time
            };

            if (callbackId > 0xFFFFFFFF) {
                callbackId = 1;
            }
            callbacks = callbacks || {};
            callbacks['_' + obj.callback.id] = {cb: callback};

            // we cannot receive answers from hosts in CLI, so this command is "fire and forget"
            states.pushMessage(host, obj);
        });
    }

    this.uploadAdapterFull = (adapters, callback) => {
        if (!adapters || !adapters.length) {
            if (callback) {
                callback();
            }
            return;
        }

        getHosts(true, liveHosts => {
            const adapter = adapters.pop();

            // Find the host which has this adapter
            tools.getInstances(adapter, objects, true, (err, objects) => {
                // try to find instance on this host
                let instance = objects.find(obj => obj && obj.common && obj.common.host === hostname);

                // try to find enabled instance on live host
                instance = instance || objects.find(obj => obj && obj.common && obj.common.enabled && liveHosts.indexOf(obj.common.host) !== -1);

                // try to find any instance
                instance = instance || objects.find(obj => obj && obj.common && liveHosts.indexOf(obj.common.host) !== -1);

                if (instance && instance.common.host !== hostname) {
                    console.log('Send upload command to host "' + instance.common.host + '"... ');
                    // send upload message to the host
                    sendToHostFromCli(instance.common.host, 'upload', adapter, response => {
                        !response && console.error('No answer from ' + instance.common.host);
                        response && console.log('Upload result: ' + response.result);
                        setImmediate(() => this.uploadAdapterFull(adapters, callback));
                    });
                } else {
                    if (!instance) {
                        // no one alive instance found
                        const adapterDir = tools.getAdapterDir(adapter);
                        if (!fs.existsSync(adapterDir)) {
                            console.warn(`No alive host found which has the adapter ${adapter} installed! No upload possible. Skipped.`);
                            return setImmediate(() => this.uploadAdapterFull(adapters, callback));
                        }
                    }

                    // try to upload on this host. It will print an error if the adapter directory not found
                    this.uploadAdapter(adapter, true, true, () =>
                        this.upgradeAdapterObjects(adapter, () =>
                            this.uploadAdapter(adapter, false, true, () =>
                                setImmediate(() => this.uploadAdapterFull(adapters, callback)))));
                }
            });
        });
    };

    this.uploadFile = (source, target, callback) => {
        const request = require('request');
        target = target.replace(/\\/g, '/');
        source = source.replace(/\\/g, '/');
        if (target[0] === '/') {
            target = target.substring(1);
        }
        if (target[target.length - 1] === '/') {
            let name = source.split('/').pop();
            name = name.split('?')[0];
            if (name.indexOf('.') === -1) {
                name = 'index.html';
            }
            target += name;
        }
        const parts = target.split('/');
        const adapter = parts[0];
        parts.splice(0, 1);
        target = parts.join('/');

        if (source.match(/^http:\/\/|^https:\/\//)) {
            request(source, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    objects.writeFile(adapter, target, body, err => {
                        if (err) {
                            console.error(err);
                        }
                        if (typeof callback === 'function') {
                            callback(err, adapter + '/' + target);
                        }
                    });
                } else {
                    console.error('Cannot get URL: ' + error || response.statusCode);
                    if (typeof callback === 'function') {
                        callback(error || response.statusCode, adapter + '/' + target);
                    }
                }
            });
        } else {
            try {
                objects.writeFile(adapter, target, fs.readFileSync(source), err => {
                    if (err) {
                        console.error(err);
                    }
                    if (typeof callback === 'function') {
                        callback(err, adapter + '/' + target);
                    }
                });
            } catch (err) {
                console.error('Cannot read file "' + source + '": ' + err);
                if (typeof callback === 'function') {
                    callback(err, adapter + '/' + target);
                }
            }
        }
    };

    function eraseFiles(files, logger, callback) {
        if (!files || !files.length) {
            callback && callback();
        } else {
            const file = files.shift();
            objects.unlink(file.adapter, file.path, err => {
                err && logger.error('Cannot delete file "' + file.path + '": ' + err);
                setImmediate(eraseFiles, files, logger, callback);
            });
        }
    }

    function eraseFolder(isErase, adapter, path, logger, callback, _files, _dirs) {
        if (!isErase) {
            callback && callback();
        } else {
            _files = _files || [];
            _dirs = _dirs || [];

            objects.readDir(adapter, path, null, (err, files) => {
                let count = 0;
                if (!err) {
                    for (let f = 0; f < files.length; f++) {
                        if (files[f].file === '.' || files[f].file === '..') {
                            continue;
                        }
                        if (files[f].isDir) {
                            if (!_dirs.find(e => e.path === path + files[f].file)) {
                                _dirs.push({adapter: adapter, path: path + files[f].file});
                            }
                            count++;
                            setImmediate(eraseFolder, true, adapter, path + files[f].file + '/', logger, () =>
                                !--count && callback && callback(_files, _dirs),
                            _files, _dirs);
                        } else if (!_files.find(e => e.path === path + files[f].file)) {
                            _files.push({adapter: adapter, path: path + files[f].file});
                        }
                    }
                    if (!count && callback) {
                        callback(_files, _dirs);
                    }
                } else {
                    // logger.error('Cannot read directory: ' + err);
                    callback(_files, _dirs);
                }
            });
        }
    }

    let lastProgressUpdate = Date.now();

    function upload(adapter, isAdmin, files, id, rev, logger, callback, _maxFiles) {
        _maxFiles = _maxFiles || files.length;

        if (!files.length) {
            if (!isAdmin) {
                states.setState('system.adapter.' + adapter + '.upload', {val: 0, ack: true}, () =>
                    typeof callback === 'function' && callback(adapter));
            } else {
                typeof callback === 'function' && callback(adapter);
            }
        } else {
            const file = files.pop();

            // do not upload '.gitignore' files. Todo: add other exceptions
            if (file === '.gitignore') {
                return upload(adapter, isAdmin, files, id, rev, logger, callback, _maxFiles);
            }

            const mimeType = mime.getType ? mime.getType(file) : mime.lookup(file);
            let attName;
            attName = file.split(regApp);
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
                !(files.length % 50) && logger.log(`upload [${files.length}] ${id} ${file} ${attName} ${mimeType}`);
            } else if (files.length > 20) {
                !(files.length % 10) && logger.log(`upload [${files.length}] ${id} ${file} ${attName} ${mimeType}`);
            } else {
                logger.log(`upload [${files.length}] ${id} ${file} ${attName} ${mimeType}`);
            }

            // Update upload indicator
            if (!isAdmin) {
                const now = Date.now();
                if (now - lastProgressUpdate > 1000) {
                    lastProgressUpdate = now;
                    states.setState('system.adapter.' + adapter + '.upload', {val: Math.round(1000 * (_maxFiles - files.length) / _maxFiles) / 10, ack: true});
                }
            }

            fs.createReadStream(file).pipe(
                objects.insert(id, attName, null, mimeType, {rev: rev}, (err, res) => {
                    if (err) {
                        console.log(err);
                        typeof callback === 'function' && callback(adapter);
                    }
                    if (res) {
                        rev = res.rev;
                    }
                    setTimeout(() => upload(adapter, isAdmin, files, id, rev, logger, callback, _maxFiles), 50);
                })
            );
        }
    }

    // Read synchronous all files recursively from local directory
    function walk(dir, _results) {
        _results = _results || [];
        try {
            if (fs.existsSync(dir)) {
                const list = fs.readdirSync(dir);
                list.map(file => {
                    const stat = fs.statSync(dir + '/' + file);
                    if (stat.isDirectory()) {
                        walk(dir + '/' + file, _results);
                    } else {
                        if (!file.match(/\.npmignore$/) && !file.match(/\.gitignore$/)) {
                            _results.push(dir + '/' + file);
                        }
                    }
                });
            }
        } catch (err) {
            console.error(err);
        }

        return _results;
    }

    this.uploadAdapter = (adapter, isAdmin, forceUpload, subTree, logger, callback) => {
        const id = adapter + (isAdmin ? '.admin' : '');
        const adapterDir = tools.getAdapterDir(adapter);
        let dir = adapterDir ? adapterDir + (isAdmin ? '/admin' : '/www') : '';

        if (tools.isObject(subTree)) {
            callback = logger;
            logger = subTree;
            subTree = null;
        } else
        if (typeof subTree === 'function') {
            callback = subTree;
            subTree = null;
            logger = null;
        }
        if (typeof logger === 'function') {
            callback = logger;
            logger = null;
        }
        logger = logger || console;

        if (subTree && dir) {
            dir += `/${subTree}`;
        }
        if (!fs.existsSync(adapterDir)) {
            console.log(`INFO: Directory "${adapterDir || (`for ${adapter}${isAdmin ? '.admin' : ''}`)}" was not found! Nothing was uploaded or deleted.`);
            return typeof callback === 'function' && callback(adapter);
        }

        let cfg;
        if (fs.existsSync(adapterDir + '/io-package.json')) {
            cfg = require(adapterDir + '/io-package.json');
        }

        if (!fs.existsSync(dir)) {
            // www folder have not all adapters. So show warning only for admin folder
            (isAdmin || cfg.common.onlyWWW) && console.log(`INFO: Directory "${dir || ('for ' + adapter + (isAdmin ? '.admin' : ''))}" was not found! Nothing was uploaded or deleted.`);
            if (isAdmin) {
                return typeof callback === 'function' && callback(adapter);
            } else {
                return checkRestartOther(adapter, () => typeof callback === 'function' && callback(adapter));
            }
        }

        // check for common.wwwDontUpload (required for legacy adapters and admin)
        if (!isAdmin && cfg && cfg.common && cfg.common.wwwDontUpload) {
            return typeof callback === 'function' && callback(adapter);
        }

        // Create "upload progress" object if not exists
        if (!isAdmin) {
            objects.getObject('system.adapter.' + adapter + '.upload', (err, obj) => {
                if (err || !obj) {
                    objects.setObject('system.adapter.' + adapter + '.upload', {
                        _id:   'system.adapter.' + adapter + '.upload',
                        type:   'state',
                        common: {
                            name: adapter + '.upload',
                            type: 'number',
                            role: 'indicator.state',
                            unit: '%',
                            min: 0,
                            max: 100,
                            def:  0,
                            desc: 'Upload process indicator'
                        },
                        from: 'system.host.' + tools.getHostName() + '.cli',
                        ts: Date.now(),
                        native: {}
                    });
                }
            });
            // Set indicator to 0
            states.setState('system.adapter.' + adapter + '.upload', 0, true);
        }

        mime = mime || require('mime');

        eraseFolder(cfg && cfg.common && cfg.common.eraseOnUpload, isAdmin ? adapter + '.admin' : adapter, '/', logger, (filesToDelete, _dirs) => {
            if (filesToDelete) {
                // directories should be deleted automatically
                //files = files.concat(dirs);
            } else {
                filesToDelete = [];
            }

            objects.getObject(id, (err, res) => {
                // Read all names with subtrees from local directory
                const files = walk(dir);
                if (err || !res) {
                    // delete old files, before upload of new
                    eraseFiles(filesToDelete, logger, () => {
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
                            if (!isAdmin) {
                                checkRestartOther(adapter, () =>
                                    setTimeout(() => upload(adapter, isAdmin, files, id, res && res.rev, logger, callback), 25));
                            } else {
                                upload(adapter, isAdmin, files, id, res && res.rev, logger, callback);
                            }
                        });
                    });
                } else {
                    if (!forceUpload) {
                        typeof callback === 'function' && callback(adapter);
                    } else {
                        // delete old files, before upload of new
                        eraseFiles(filesToDelete, logger, () => {
                            if (!isAdmin) {
                                checkRestartOther(adapter, () =>
                                    setTimeout(() => upload(adapter, isAdmin, files, id, res && res.rev, logger, callback), 25));
                            } else {
                                upload(adapter, isAdmin, files, id, res && res.rev, logger, callback);
                            }
                        });
                    }
                }
            });
        });
    };

    function extendNative(target, additional) {
        if (!tools.isObject(additional)) {
            return target;
        }
        for (const attr of Object.keys(additional)) {
            if (target[attr] === undefined) {
                target[attr] = additional[attr];
            } else if (typeof additional[attr] === 'object' && !(additional[attr] instanceof Array)) {
                try {
                    target[attr] = target[attr] || {};
                } catch {
                    console.warn(`Cannot update attribute ${attr} of native`);
                }
                if (typeof target[attr] === 'object' && target[attr] !== null) {
                    extendNative(target[attr], additional[attr]);
                }
            }
        }
        return target;
    }

    function extendCommon(target, additional, instance) {
        if (!tools.isObject(additional)) {
            return target;
        }
        for (const attr of Object.keys(additional)) {
            if (attr === 'title' || attr === 'schedule' || attr === 'restartSchedule' || attr === 'mode' || attr === 'loglevel' || attr === 'enabled' || attr === 'custom') {
                if (target[attr] === undefined) {
                    target[attr] = additional[attr];
                }
            } else if (typeof additional[attr] !== 'object' || (additional[attr] instanceof Array)) {
                try {
                    target[attr] = additional[attr];

                    // dataFolder can have wildcards
                    if (attr === 'dataFolder' && target.dataFolder && target.dataFolder.indexOf('%INSTANCE%') !== -1) {
                        target.dataFolder = target.dataFolder.replace(/%INSTANCE%/g, instance);
                    }
                } catch {
                    console.warn(`Cannot update attribute ${attr} of common`);
                }
            } else {
                target[attr] = target[attr] || {};
                if (typeof target[attr] !== 'object') {
                    target[attr] = {}; // here we clean the simple value with object
                }

                extendCommon(target[attr], additional[attr], instance);
            }
        }
        return target;
    }

    this._upgradeAdapterObjectsHelper = (name, iopack, hostname, logger, callback) => {
        // Update all instances of this host
        objects.getObjectView('system', 'instance', {startkey: `system.adapter.${name}.`, endkey: `system.adapter.${name}.\u9999`}, null, (err, res) => {
            let counter = 0;

            if (res) {
                for (let i = 0; i < res.rows.length; i++) {
                    if (res.rows[i].value.common.host === hostname) {
                        counter++;
                        objects.getObject(res.rows[i].id, (err, _obj) => {
                            const newObject = deepClone(_obj);

                            // all common settings should be taken from new one
                            newObject.common = extendCommon(newObject.common, iopack.common, newObject._id.split('.').pop());
                            newObject.native = extendNative(newObject.native, iopack.native);
                            // protected/encryptedNative and notifications also need to be updated
                            newObject.protectedNative = iopack.protectedNative || [];
                            newObject.encryptedNative = iopack.encryptedNative || [];
                            newObject.notifications = iopack.notifications || [];
                            // update instanceObjects and objects
                            newObject.instanceObjects = iopack.instanceObjects || [];
                            newObject.objects = iopack.objects || [];

                            newObject.common.version          = iopack.common.version;
                            newObject.common.installedVersion = iopack.common.version;
                            newObject.common.installedFrom    = iopack.common.installedFrom;
                            if (!iopack.common.compact && newObject.common.compact) {
                                newObject.common.compact = iopack.common.compact;
                            }

                            // Compare objects to reduce restarts of instances
                            if (!isDeepStrictEqual(newObject, _obj)) {
                                logger.log(`Update "${newObject._id}"`);

                                newObject.from = 'system.host.' + tools.getHostName() + '.cli';
                                newObject.ts = Date.now();

                                objects.setObject(newObject._id, newObject, () => {
                                    if (newObject.common.def !== undefined && newObject.common.def !== null) {
                                        states.getState(newObject._id, (err, state) => {
                                            if (!state) {
                                                states.setState(newObject._id, {
                                                    val: newObject.common.def,
                                                    ack: true,
                                                    q: 0x40 // substitute value from device or adapter
                                                }, () => {
                                                    !--counter && callback && callback(name);
                                                });
                                            } else {
                                                !--counter && callback && callback(name);
                                            }
                                        });
                                    } else {
                                        !--counter && callback && callback(name);
                                    }
                                });
                            } else {
                                !--counter && callback && callback(name);
                            }
                        });
                    }
                }
            }

            // updates only "_design/system" and co "_design/*"
            if (iopack.objects && typeof iopack.objects === 'object') {
                for (const _id of Object.keys(iopack.objects)) {
                    if (name === 'js-controller' && !_id.startsWith('_design/')) {
                        continue;
                    }

                    counter++;

                    iopack.objects[_id].from = `system.host.${hostname}.cli`;
                    iopack.objects[_id].ts = Date.now();

                    objects.setObject(iopack.objects[_id]._id, iopack.objects[_id], err => {
                        err && logger.error(`Cannot update object: ${err}`);
                        !--counter && callback && callback(name);
                    });
                }
            }

            !counter && callback && callback(name);
        });
    };

    this.upgradeAdapterObjects = (name, iopack, logger, callback) => {
        if (typeof iopack === 'function') {
            callback = iopack;
            iopack = null;
        } else
        if (typeof iopack === 'object' && typeof iopack.warn === 'function' && typeof iopack.error === 'function') {
            callback = logger;
            logger = iopack;
            iopack = null;
        }
        if (typeof logger === 'function') {
            callback = logger;
            logger = null;
        }

        logger = logger || console;

        const adapterDir = tools.getAdapterDir(name);
        let iopackFile;
        try {
            iopackFile = fs.readJSONSync(adapterDir + '/io-package.json');
        } catch {
            if (adapterDir) {
                logger.error('Cannot find io-package.json in ' + adapterDir);
            } else {
                logger.error(`Cannot find io-package.json for "${name}"`);
            }
            iopackFile = null;
        }
        iopack = iopack || iopackFile;

        if (!iopack) {
            callback(name);
        } else {
            // Always update installed From from File on disk if exists and set
            if (iopackFile && iopackFile.common && iopackFile.common.installedFrom) {
                iopack.common = iopack.common || {};
                iopack.common.installedFrom = iopackFile.common.installedFrom;
            }
            objects.getObject('system.adapter.' + name, (err, obj) => {
                if (err || !obj) {
                    // Not existing? Why ever ... we recreate
                    obj = {};
                }
                obj.common = iopack.common || {};
                obj.native = iopack.native || {};
                // protected/encryptedNative and notifications also need to be updated
                obj.protectedNative = iopack.protectedNative || [];
                obj.encryptedNative = iopack.encryptedNative || [];
                obj.notifications = iopack.notifications || [];
                // update instanceObjects and objects
                obj.instanceObjects = iopack.instanceObjects || [];
                obj.objects = iopack.objects || [];

                obj.type   = 'adapter';

                obj.common.installedVersion = iopack.common.version;

                const hostname = tools.getHostName();

                obj.from = `system.host.${hostname}.cli`;
                obj.ts = Date.now();

                objects.setObject('system.adapter.' + name, obj, () =>
                    this._upgradeAdapterObjectsHelper(name, iopack, hostname, logger, callback));
            });
        }
    };
}

module.exports = Upload;
