/**
 *      Upload adapter files into DB
 *
 *      Copyright 2013-2021 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';

/** @class */
function Upload(options) {
    const fs = require('fs-extra');
    const { tools } = require('@iobroker/js-controller-common');
    const hostname = tools.getHostName();
    const deepClone = require('deep-clone');
    const { isDeepStrictEqual } = require('util');
    const axios = require('axios');

    options = options || {};

    if (!options.states) {
        throw new Error('Invalid arguments: states is missing');
    }
    if (!options.objects) {
        throw new Error('Invalid arguments: objects is missing');
    }

    const states = options.states;
    const objects = options.objects;

    let callbacks;
    let callbackId = 1;
    let mime;
    // attName = file.split('/' + tools.appName + '.');
    const regApp = new RegExp('/' + tools.appName.replace(/\./g, '\\.') + '\\.', 'i');

    async function checkHostsIfAlive(hosts) {
        const result = [];
        if (hosts) {
            for (let h = 0; h < hosts.length; h++) {
                const host = hosts[h];
                const state = await states.getStateAsync(host + '.alive');
                if (state && state.val) {
                    result.push(host);
                }
            }
        }
        return result;
    }

    async function getHosts(onlyAlive) {
        const hosts = [];
        try {
            const arr = await objects.getObjectListAsync({ startkey: 'system.host.', endkey: 'system.host.\u9999' });
            if (arr && arr.rows) {
                for (let i = 0; i < arr.rows.length; i++) {
                    if (arr.rows[i].value.type !== 'host') {
                        continue;
                    }
                    hosts.push(arr.rows[i].value._id);
                }
            }
        } catch (err) {
            // ignore
            console.warn(`Cannot read hosts: ${err.message}`);
        }

        if (onlyAlive) {
            return checkHostsIfAlive(hosts);
        } else {
            return hosts;
        }
    }

    // Check if some adapters must be restarted and restart them
    async function checkRestartOther(adapter) {
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
                    const instances = await tools.getAllInstances(adapterConf.common.restartAdapters, objects);
                    if (instances && !instances.length) {
                        for (let r = 0; r < instances.length; r++) {
                            try {
                                const obj = await objects.getObjectAsync(instances[r]);
                                // if instance is enabled
                                if (obj && obj.common && obj.common.enabled) {
                                    obj.common.enabled = false; // disable instance

                                    obj.from = `system.host.${tools.getHostName()}.cli`;
                                    obj.ts = Date.now();

                                    await objects.setObjectAsync(obj._id);

                                    obj.common.enabled = true; // enable instance
                                    obj.ts = Date.now();

                                    await objects.setObjectAsync(obj._id, obj);
                                    console.log(`Adapter "${obj._id}" restarted.`);
                                }
                            } catch (err) {
                                console.error(`Cannot restart adapter "${instances[r]}": ${err.message}`);
                            }
                        }
                    }
                }
            }
        } catch (err) {
            console.error(`Cannot parse ${adapterDir}/io-package.json: ${err.message}`);
        }
    }

    const sendToHostFromCliAsync = tools.promisifyNoError(sendToHostFromCli);

    function sendToHostFromCli(host, command, message, callback) {
        const time = Date.now();
        const from = `system.host.${hostname}_cli_${time}`;

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
            const obj = { command, message: message, from: 'system.host.' + hostname + '_cli_' + time };

            obj.callback = {
                message,
                id: callbackId++,
                ack: false,
                time
            };

            if (callbackId > 0xffffffff) {
                callbackId = 1;
            }
            callbacks = callbacks || {};
            callbacks['_' + obj.callback.id] = { cb: callback };

            // we cannot receive answers from hosts in CLI, so this command is "fire and forget"
            states.pushMessage(host, obj);
        });
    }

    this.uploadAdapterFullAsync = async adapters => {
        if (adapters && adapters.length) {
            const liveHosts = await getHosts(true);
            for (const adapter of adapters) {
                // Find the host which has this adapter
                const instances = await tools.getInstancesAsync(adapter, objects, true);
                // try to find instance on this host
                let instance = instances.find(obj => obj && obj.common && obj.common.host === hostname);

                // try to find enabled instance on live host
                instance =
                    instance ||
                    instances.find(
                        obj => obj && obj.common && obj.common.enabled && liveHosts.includes(obj.common.host)
                    );

                // try to find any instance
                instance = instance || instances.find(obj => obj && obj.common && liveHosts.includes(obj.common.host));

                if (instance && instance.common.host !== hostname) {
                    console.log(`Send upload command to host "${instance.common.host}"... `);
                    // send upload message to the host
                    const response = await sendToHostFromCliAsync(instance.common.host, 'upload', adapter);
                    if (response) {
                        console.log('Upload result: ' + response.result);
                    } else {
                        console.error('No answer from ' + instance.common.host);
                    }
                } else {
                    if (!instance) {
                        // no one alive instance found
                        const adapterDir = tools.getAdapterDir(adapter);
                        if (!fs.existsSync(adapterDir)) {
                            console.warn(
                                `No alive host found which has the adapter ${adapter} installed! No upload possible. Skipped.`
                            );
                            continue;
                        }
                    }

                    // try to upload on this host. It will print an error if the adapter directory not found
                    await this.uploadAdapter(adapter, true, true);
                    await this.upgradeAdapterObjects(adapter);
                    await this.uploadAdapter(adapter, false, true);
                }
            }
        }
    };

    /**
     * Uploads a file
     *
     * @param {string} source
     * @param {string} target
     * @return {Promise<string>}
     */
    this.uploadFile = async (source, target) => {
        target = target.replace(/\\/g, '/');
        source = source.replace(/\\/g, '/');
        if (target[0] === '/') {
            target = target.substring(1);
        }
        if (target[target.length - 1] === '/') {
            let name = source.split('/').pop();
            name = name.split('?')[0];
            if (!name.includes('.')) {
                name = 'index.html';
            }
            target += name;
        }
        const parts = target.split('/');
        const adapter = parts[0];
        parts.splice(0, 1);
        target = parts.join('/');

        if (source.match(/^http:\/\/|^https:\/\//)) {
            try {
                const result = await axios(source, {
                    responseType: 'arraybuffer',
                    validateStatus: status => status === 200
                });
                if (result && result.data) {
                    await objects.writeFileAsync(adapter, target, result.data);
                } else {
                    console.error(`Empty response from URL "${source}"`);
                    throw new Error(`Empty response from URL "${source}"`);
                }
            } catch (err) {
                let result;
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    result = err.response.data || err.response.status;
                } else if (err.request) {
                    // The request was made but no response was received
                    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    result = err.request;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    result = err.message;
                }
                console.error(`Cannot get URL "${source}": ${result}`);
                throw new Error(result);
            }
        } else {
            try {
                await objects.writeFileAsync(adapter, target, fs.readFileSync(source));
            } catch (err) {
                console.error(`Cannot read file "${source}": ${err.message}`);
                throw err;
            }
        }

        return `${adapter}/${target}`;
    };

    async function eraseFiles(files, logger) {
        if (!files || !files.length) {
            for (let f = 0; f < files.length; f++) {
                const file = files[f];
                try {
                    await objects.unlinkSync(file.adapter, file.path);
                } catch (err) {
                    logger.error(`Cannot delete file "${file.path}": ${err}`);
                }
            }
        }
    }

    async function eraseFolder(isErase, adapter, path, logger) {
        let _files = [];
        let _dirs = [];
        if (isErase) {
            let files;
            try {
                files = await objects.readDirAsync(adapter, path);
            } catch {
                // ignore err
                files = [];
            }

            if (files && files.length) {
                for (let f = 0; f < files.length; f++) {
                    if (files[f].file === '.' || files[f].file === '..') {
                        continue;
                    }
                    const newPath = path + files[f].file;
                    if (files[f].isDir) {
                        if (!_dirs.find(e => e.path === newPath)) {
                            _dirs.push({ adapter, path: newPath });
                        }
                        try {
                            const result = await eraseFolder(isErase, adapter, newPath + '/', logger);
                            _files = _files.concat(result.files);
                            _dirs = _dirs.concat(result.dirs);
                        } catch (err) {
                            console.warn(`Cannot delete folder "${adapter}/${newPath}/": ${err.mesasge}`);
                        }
                    } else if (!_files.find(e => e.path === newPath)) {
                        _files.push({ adapter, path: newPath });
                    }
                }
            }
        }

        return { filesToDelete: _files, dirs: _dirs };
    }

    let lastProgressUpdate = Date.now();

    async function upload(adapter, isAdmin, files, id, rev, logger) {
        const uploadID = `system.adapter.${adapter}.upload`;

        await states.setStateAsync(uploadID, { val: 0, ack: true });

        for (let f = 0; f < files.length; f++) {
            const file = files[f];
            // do not upload '.gitignore' files. Todo: add other exceptions
            if (file === '.gitignore') {
                continue;
            }

            const mimeType = mime.getType ? mime.getType(file) : mime.lookup(file);
            let attName;
            attName = file.split(regApp);
            // try to find anyway if adapter is not lower case
            if (attName.length === 1 && file.toLowerCase().includes(tools.appName.toLowerCase())) {
                attName = ['', file.substring(tools.appName.length + 2)];
            }

            attName = attName.pop();
            attName = attName.split('/').slice(2).join('/');
            if (files.length - f > 100) {
                (!f || !((files.length - f - 1) % 50)) &&
                    logger.log(`upload [${files.length - f - 1}] ${id} ${file} ${attName} ${mimeType}`);
            } else if (files.length - f - 1 > 20) {
                (!f || !((files.length - f - 1) % 10)) &&
                    logger.log(`upload [${files.length - f - 1}] ${id} ${file} ${attName} ${mimeType}`);
            } else {
                logger.log(`upload [${files.length - f - 1}] ${id} ${file} ${attName} ${mimeType}`);
            }

            // Update upload indicator
            if (!isAdmin) {
                const now = Date.now();
                if (now - lastProgressUpdate > 1000) {
                    lastProgressUpdate = now;
                    await states.setStateAsync(uploadID, {
                        val: Math.round((1000 * (files.length - f)) / files.length) / 10,
                        ack: true
                    });
                }
            }

            await new Promise(resolve =>
                fs.createReadStream(file).pipe(
                    objects.insert(id, attName, null, mimeType, { rev: rev }, (err, res) => {
                        err && console.log(err);
                        if (res) {
                            rev = res.rev;
                        }
                        resolve();
                    })
                )
            );
        }

        // Set upload progress to 0;
        if (!isAdmin && files.length) {
            await states.setStateAsync(uploadID, { val: 0, ack: true });
        }

        return adapter;
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
                        if (!file.endsWith('.npmignore') && !file.endsWith('.gitignore')) {
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

    /**
     * Upload given adapter
     *
     * @param {string} adapter
     * @param {boolean} isAdmin
     * @param {boolean} forceUpload
     * @param {string?} subTree
     * @param {object?} logger
     * @return {Promise<string>}
     */
    this.uploadAdapter = async (adapter, isAdmin, forceUpload, subTree, logger) => {
        const id = adapter + (isAdmin ? '.admin' : '');
        const adapterDir = tools.getAdapterDir(adapter);
        let dir = adapterDir ? adapterDir + (isAdmin ? '/admin' : '/www') : '';

        logger = logger || console;

        if (subTree && dir) {
            dir += `/${subTree}`;
        }
        if (!fs.existsSync(adapterDir)) {
            console.log(
                `INFO: Directory "${
                    adapterDir || `for ${adapter}${isAdmin ? '.admin' : ''}`
                }" was not found! Nothing was uploaded or deleted.`
            );
            return adapter;
        }

        let cfg;
        try {
            cfg = await fs.readJSON(`${adapterDir}/io-package.json`);
        } catch (err) {
            // file not parsable or does not exist
            console.error(`Could not read io-package.json: ${err.message}`);
        }

        if (!fs.existsSync(dir)) {
            // www folder have not all adapters. So show warning only for admin folder
            (isAdmin || (cfg && cfg.common && cfg.common.onlyWWW)) &&
                console.log(
                    `INFO: Directory "${
                        dir || `for ${adapter}${isAdmin ? '.admin' : ''}`
                    }" was not found! Nothing was uploaded or deleted.`
                );

            if (isAdmin) {
                return adapter;
            } else {
                await checkRestartOther(adapter);
                return adapter;
            }
        }

        // check for common.wwwDontUpload (required for legacy adapters and admin)
        if (!isAdmin && cfg && cfg.common && cfg.common.wwwDontUpload) {
            return adapter;
        }

        // Create "upload progress" object if not exists
        if (!isAdmin) {
            let obj;
            const uploadID = 'system.adapter.' + adapter + '.upload';
            try {
                obj = await objects.getObjectAsync(uploadID);
            } catch {
                // ignore
            }
            if (!obj) {
                await objects.setObjectAsync(uploadID, {
                    _id: uploadID,
                    type: 'state',
                    common: {
                        name: adapter + '.upload',
                        type: 'number',
                        role: 'indicator.state',
                        unit: '%',
                        min: 0,
                        max: 100,
                        def: 0,
                        desc: 'Upload process indicator'
                    },
                    from: `system.host.${tools.getHostName()}.cli`,
                    ts: Date.now(),
                    native: {}
                });
            }
            // Set indicator to 0
            await states.setStateAsync(uploadID, 0, true);
        }

        mime = mime || require('mime');

        let { filesToDelete } = await eraseFolder(
            cfg && cfg.common && cfg.common.eraseOnUpload,
            isAdmin ? adapter + '.admin' : adapter,
            '/',
            logger
        );
        if (filesToDelete) {
            // directories should be deleted automatically
            //files = files.concat(dirs);
        } else {
            filesToDelete = [];
        }
        let result;
        try {
            result = await objects.getObjectAsync(id);
        } catch {
            // ignore
        }
        // Read all names with subtrees from local directory
        const files = walk(dir);
        if (!result) {
            // delete old files, before upload of new
            await eraseFiles(filesToDelete, logger);
            await objects.setObjectAsync(id, {
                type: 'meta',
                common: {
                    name: id.split('.').pop(),
                    type: isAdmin ? 'admin' : 'www'
                },
                from: 'system.host.' + tools.getHostName() + '.cli',
                ts: Date.now(),
                native: {}
            });
            forceUpload = true;
        }

        if (forceUpload) {
            if (!isAdmin) {
                await checkRestartOther(adapter);
                await new Promise(resolve => setTimeout(() => resolve(), 25));
                await upload(adapter, isAdmin, files, id, result && result.rev, logger);
            } else {
                await upload(adapter, isAdmin, files, id, result && result.rev, logger);
            }
        }
        return adapter;
    };

    function extendNative(target, additional) {
        if (tools.isObject(additional)) {
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
        }
        return target;
    }

    function extendCommon(target, additional, instance) {
        if (tools.isObject(additional)) {
            const preserveAttributes = [
                'title',
                'schedule',
                'restartSchedule',
                'mode',
                'loglevel',
                'enabled',
                'custom'
            ];

            for (const attr of Object.keys(additional)) {
                // preserve these attributes, except, they werde undefined before and preserve titleLang if current titleLang is of type string (changed by user)
                if (preserveAttributes.includes(attr) || (attr === 'titleLang' && typeof target[attr] === 'string')) {
                    if (target[attr] === undefined) {
                        target[attr] = additional[attr];
                    }
                } else if (typeof additional[attr] !== 'object' || additional[attr] instanceof Array) {
                    try {
                        target[attr] = additional[attr];

                        // dataFolder can have wildcards
                        if (attr === 'dataFolder' && target.dataFolder && target.dataFolder.includes('%INSTANCE%')) {
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
        }
        return target;
    }

    this._upgradeAdapterObjectsHelper = async (name, ioPack, hostname, logger) => {
        // Update all instances of this host
        const res = await objects.getObjectViewAsync('system', 'instance', {
            startkey: `system.adapter.${name}.`,
            endkey: `system.adapter.${name}.\u9999`
        });

        if (res) {
            for (let i = 0; i < res.rows.length; i++) {
                if (res.rows[i].value.common.host === hostname) {
                    const _obj = await objects.getObjectAsync(res.rows[i].id);
                    const newObject = deepClone(_obj);

                    // all common settings should be taken from new one
                    newObject.common = extendCommon(newObject.common, ioPack.common, newObject._id.split('.').pop());
                    newObject.native = extendNative(newObject.native, ioPack.native);

                    // protected/encryptedNative and notifications also need to be updated
                    newObject.protectedNative = ioPack.protectedNative || [];
                    newObject.encryptedNative = ioPack.encryptedNative || [];
                    newObject.notifications = ioPack.notifications || [];
                    // update instanceObjects and objects
                    newObject.instanceObjects = ioPack.instanceObjects || [];
                    newObject.objects = ioPack.objects || [];

                    newObject.common.version = ioPack.common.version;
                    newObject.common.installedVersion = ioPack.common.version;
                    newObject.common.installedFrom = ioPack.common.installedFrom;

                    if (!ioPack.common.compact && newObject.common.compact) {
                        newObject.common.compact = ioPack.common.compact;
                    }

                    // Compare objects to reduce restarts of instances
                    if (!isDeepStrictEqual(newObject, _obj)) {
                        logger.log(`Update "${newObject._id}"`);

                        newObject.from = `system.host.${tools.getHostName()}.cli`;
                        newObject.ts = Date.now();

                        await objects.setObjectAsync(newObject._id, newObject);

                        if (newObject.common.def !== undefined && newObject.common.def !== null) {
                            // set default state value
                            const state = await states.getStateAsync(newObject._id);
                            if (!state) {
                                await states.setStateAsync(newObject._id, {
                                    val: newObject.common.def,
                                    ack: true,
                                    q: 0x40 // substitute value from device or adapter
                                });
                            }
                        }
                    }
                }
            }
        }

        // updates only "_design/system" and co "_design/*"
        if (ioPack.objects && typeof ioPack.objects === 'object') {
            for (const _id of Object.keys(ioPack.objects)) {
                if (name === 'js-controller' && !_id.startsWith('_design/')) {
                    continue;
                }

                ioPack.objects[_id].from = `system.host.${hostname}.cli`;
                ioPack.objects[_id].ts = Date.now();

                try {
                    await objects.setObjectAsync(ioPack.objects[_id]._id, ioPack.objects[_id]);
                } catch (err) {
                    logger.error(`Cannot update object: ${err}`);
                }
            }
        }

        return name;
    };

    /**
     * Create object from io-package json
     *
     * @param {string} name
     * @param {object?} ioPack
     * @param {object?} logger
     * @return {Promise<string>}
     */
    this.upgradeAdapterObjects = async (name, ioPack, logger) => {
        logger = logger || console;

        const adapterDir = tools.getAdapterDir(name);
        let ioPackFile;
        try {
            ioPackFile = fs.readJSONSync(adapterDir + '/io-package.json');
        } catch {
            if (adapterDir) {
                logger.error(`Cannot find io-package.json in ${adapterDir}`);
            } else {
                logger.error(`Cannot find io-package.json for "${name}"`);
            }
            ioPackFile = null;
        }
        ioPack = ioPack || ioPackFile;

        if (ioPack) {
            // Always update installed From from File on disk if exists and set
            if (ioPackFile && ioPackFile.common && ioPackFile.common.installedFrom) {
                ioPack.common = ioPack.common || {};
                ioPack.common.installedFrom = ioPackFile.common.installedFrom;
            }
            // Not existing? Why ever ... we recreate
            let obj;
            try {
                obj = await objects.getObject('system.adapter.' + name);
            } catch {
                // ignore err
            }
            obj = obj || {};
            obj.common = ioPack.common || {};
            obj.native = ioPack.native || {};
            // protected/encryptedNative and notifications also need to be updated
            obj.protectedNative = ioPack.protectedNative || [];
            obj.encryptedNative = ioPack.encryptedNative || [];
            obj.notifications = ioPack.notifications || [];
            // update instanceObjects and objects
            obj.instanceObjects = ioPack.instanceObjects || [];
            obj.objects = ioPack.objects || [];

            obj.type = 'adapter';

            obj.common.installedVersion = ioPack.common.version;

            if (obj.common.news) {
                delete obj.common.news; // remove this information as it could be big, but it will be taken from repo
            }

            const hostname = tools.getHostName();

            obj.from = `system.host.${hostname}.cli`;
            obj.ts = Date.now();

            try {
                await objects.setObjectAsync('system.adapter.' + name, obj);
            } catch (err) {
                logger.error(`Cannot set system.adapter.${name}: ${err.message}`);
            }

            await this._upgradeAdapterObjectsHelper(name, ioPack, hostname, logger);
        }

        return name;
    };
}

module.exports = Upload;
