/**
 *      Backup
 *
 *      Copyright 2013-2021 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';
const fs = require('fs-extra');
const { tools } = require('@iobroker/js-controller-common');
const pathLib = require('path');
const hostname = tools.getHostName();
const Upload = require('./setupUpload');
const { EXIT_CODES } = require('@iobroker/js-controller-common');

// We cannot use relative paths for the backup locations, as they used by both
// require, which resolves relative paths from __dirname
// and the fs methods, which resolve relative paths from process.cwd()
const tmpDir = pathLib.normalize(pathLib.join(__dirname, '../../tmp'));
const bkpDir = pathLib.normalize(pathLib.join(__dirname, '../../backups'));

class BackupRestore {
    constructor(options) {
        options = options || {};

        if (!options.states) {
            throw new Error('Invalid arguments: states is missing');
        }
        if (!options.objects) {
            throw new Error('Invalid arguments: objects is missing');
        }
        if (!options.processExit) {
            throw new Error('Invalid arguments: processExit is missing');
        }
        if (!options.cleanDatabaseAsync) {
            throw new Error('Invalid arguments: cleanDatabaseAsync is missing');
        }
        if (!options.restartControllerAsync) {
            throw new Error('Invalid arguments: restartControllerAsync is missing');
        }

        this.objects = options.objects;
        this.states = options.states;
        this.processExit = options.processExit;
        this.cleanDatabaseAsync = options.cleanDatabaseAsync;
        this.restartControllerAsync = options.restartControllerAsync;
        this.dbMigration = options.dbMigration || false;
        this.mime = null;

        this.upload = new Upload(options);

        this.configParts = tools.getConfigFileName().split('/');
        this.configParts.pop(); // remove *.json
        this.configDir = this.configParts.join('/'); // => name-data
    } // endConstructor

    // --------------------------------------- BACKUP ---------------------------------------------------
    async _copyFile(id, srcPath, destPath) {
        try {
            const data = await this.objects.readFileAsync(id, srcPath, '');
            if (data) {
                if (data.data !== undefined) {
                    fs.writeFileSync(destPath, data.data);
                } else {
                    fs.writeFileSync(destPath, data);
                }
            }
        } catch (err) {
            console.log(`Can not copy File ${id}${srcPath} to ${destPath}: ${err.message}`);
        }
    }

    async copyDir(id, srcPath, destPath) {
        !fs.existsSync(destPath) && fs.mkdirSync(destPath);

        try {
            const res = await this.objects.readDirAsync(id, srcPath);
            if (res) {
                for (let t = 0; t < res.length; t++) {
                    if (res[t].isDir) {
                        await this.copyDir(id, `${srcPath}/${res[t].file}`, `${destPath}/${res[t].file}`);
                    } else {
                        !fs.existsSync(destPath) && fs.mkdirSync(destPath);

                        await this._copyFile(id, `${srcPath}/${res[t].file}`, `${destPath}/${res[t].file}`);
                    }
                }
            }
        } catch (err) {
            if (!err.message.includes('Not exists')) {
                console.warn(`Directory ${id}/${srcPath} cannot be copied: ` + err);
            }
        }
    }

    async _removeFolderRecursive(path) {
        if (fs.existsSync(path)) {
            for (const file of fs.readdirSync(path)) {
                const curPath = `${path}/${file}`;

                if (fs.statSync(curPath).isDirectory()) {
                    // recurse
                    await this._removeFolderRecursive(curPath);
                } else {
                    // delete file
                    fs.unlinkSync(curPath);
                }
            }

            fs.rmdirSync(path);
        }
    } // endRemoveFolderRecursive

    getBackupDir() {
        let dataDir = tools.getDefaultDataDir();

        // All paths are returned always relative to /node_modules/appName.js-controller
        if (dataDir) {
            if (dataDir[0] === '.' && dataDir[1] === '.') {
                dataDir = __dirname + '/../../' + dataDir;
            } else if (dataDir[0] === '.' && dataDir[1] === '/') {
                dataDir = __dirname + '/../../' + dataDir.substring(2);
            }
        }
        dataDir = dataDir.replace(/\\/g, '/');
        if (dataDir[dataDir.length - 1] !== '/') {
            dataDir += '/';
        }

        const parts = dataDir.split('/');
        parts.pop(); // remove data or appName-data
        parts.pop();

        return pathLib.normalize(parts.join('/') + '/backups/');
    }

    copyFileSync(source, target) {
        let targetFile = target;

        // if target is a directory a new file with the same name will be created
        if (fs.existsSync(target)) {
            if (fs.statSync(target).isDirectory()) {
                targetFile = pathLib.join(target, pathLib.basename(source));
            }
        }

        fs.writeFileSync(targetFile, fs.readFileSync(source));
    }

    copyFolderRecursiveSync(source, target) {
        let files = [];

        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }

        // check if folder needs to be created or integrated
        const targetFolder = pathLib.join(target, pathLib.basename(source));
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder);
        }

        // copy
        if (fs.statSync(source).isDirectory()) {
            files = fs.readdirSync(source);
            files.forEach(file => {
                const curSource = pathLib.join(source, file);
                if (fs.statSync(curSource).isDirectory()) {
                    this.copyFolderRecursiveSync(curSource, targetFolder);
                } else {
                    this.copyFileSync(curSource, targetFolder);
                }
            });
        }
    }

    // returns Promise and could be used as async
    _packBackup(name) {
        // 2021_10_25 BF (TODO): store letsencrypt files too
        const letsEncrypt = this.configDir + '/letsencrypt';
        if (fs.existsSync(letsEncrypt)) {
            this.copyFolderRecursiveSync(letsEncrypt, tmpDir + '/backup');
        }
        const tar = require('tar');

        return new Promise(resolve => {
            const f = fs.createWriteStream(name);
            f.on('finish', () => {
                tools.rmdirRecursiveSync(`${tmpDir}/backup`);
                resolve(pathLib.normalize(name));
            });

            f.on('error', err => {
                console.error(`host.${hostname} Cannot pack directory ${tmpDir}/backup: ${err}`);
                this.processExit(EXIT_CODES.CANNOT_GZIP_DIRECTORY);
            });

            try {
                tar.create({ gzip: true, cwd: `${tmpDir}/` }, ['backup']).pipe(f);
            } catch (err) {
                console.error(`host.${hostname} Cannot pack directory ${tmpDir}/backup: ${err.message}`);
                return this.processExit(EXIT_CODES.CANNOT_GZIP_DIRECTORY);
            }
        });
    }

    /**
     * Creates backup and stores with given name
     * @param {string} name - name of the backup
     * @param {boolean} noConfig - do not store configs
     * @param {() => void} callback -  callback function
     */
    createBackup(name, noConfig, callback) {
        tools.showDeprecatedMessage('setupBackup.createBackup');
        if (typeof noConfig === 'function') {
            callback = noConfig;
            noConfig = false;
        }
        return this.createBackupAsync(name, noConfig).then(path => typeof callback === 'function' && callback(path));
    }

    /**
     * Creates backup and stores with given name
     * @param {string} name - name of the backup
     * @param {boolean} noConfig - do not store configs
     */
    async createBackupAsync(name, noConfig) {
        if (!name) {
            const d = new Date();
            name =
                d.getFullYear() +
                '_' +
                ('0' + (d.getMonth() + 1)).slice(-2) +
                '_' +
                ('0' + d.getDate()).slice(-2) +
                '-' +
                ('0' + d.getHours()).slice(-2) +
                '_' +
                ('0' + d.getMinutes()).slice(-2) +
                '_' +
                ('0' + d.getSeconds()).slice(-2) +
                '_backup' +
                tools.appName;
        }

        name = name.toString().replace(/\\/g, '/');
        if (!name.includes('/')) {
            const path = this.getBackupDir();

            // create directory if not exists
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }

            if (!name.includes('.tar.gz')) {
                name = `${path + name}.tar.gz`;
            } else {
                name = path + name;
            }
        }

        const result = { objects: null, states: {} };

        const hostname = tools.getHostName();

        try {
            const res = await this.objects.getObjectListAsync({ include_docs: true });
            result.objects = res.rows;
        } catch (e) {
            console.error(`host.${hostname} Cannot get objects: ${e.message}`);
        }

        if (!noConfig) {
            result.config = null;
        }

        if (!noConfig && fs.existsSync(tools.getConfigFileName())) {
            result.config = fs.readJSONSync(tools.getConfigFileName());
        }

        const r = new RegExp(`^system\\.host\\.${hostname}\\.(\\w+)$`);

        try {
            const keys = await this.states.getKeys('*');
            /*for (const i = keys.length - 1; i >= 0; i--) {
                    if (keys[i].startsWith('messagebox.') || keys[i].startsWith('log.')) {
                keys.splice(i, 1);
            }
        }*/

            // NOTE for all "replace" with $$$$ ... result will be just $$
            const obj = await this.states.getStates(keys);

            // read iobroker.json
            let isCustomHostname;

            try {
                const config = await fs.readJSON(tools.getConfigFileName());
                // if a hostname is configured
                isCustomHostname = !!config.system.hostname;
            } catch (e) {
                console.error(`host.${hostname} Cannot read config file: ${e.message}`);
            }

            for (let i = 0; i < keys.length; i++) {
                if (!obj[i]) {
                    continue;
                }

                if (!isCustomHostname) {
                    // if its a default hostname, we will have a new default after restore and need to replace
                    if (obj[i].from === `system.host.${hostname}` || r.test(obj[i].from)) {
                        obj[i].from.replace(`system.host.${hostname}`, 'system.host.$$$$__hostname__$$$$');
                    }
                    if (r.test(keys[i])) {
                        keys[i] = keys[i].replace(hostname, '$$$$__hostname__$$$$');
                    }
                }
                result.states[keys[i]] = obj[i];
            }

            console.log(`host.${hostname} ${keys.length} states saved`);
        } catch (e) {
            console.error(`host.${hostname} Cannot get states: ${e.message}`);
        }

        if (!fs.existsSync(bkpDir)) {
            fs.mkdirSync(bkpDir);
        }
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }

        await this._removeFolderRecursive(`${tmpDir}/backup/`);

        if (!fs.existsSync(`${tmpDir}/backup`)) {
            fs.mkdirSync(`${tmpDir}/backup`);
        }
        if (!fs.existsSync(`${tmpDir}/backup/files`)) {
            fs.mkdirSync(`${tmpDir}/backup/files`);
        }

        // try to find user files
        for (let j = 0; j < result.objects.length; j++) {
            if (
                !result.objects[j] ||
                !result.objects[j].value ||
                !result.objects[j].value._id ||
                !result.objects[j].value.common
            ) {
                continue;
            }
            //if (result.objects[j].doc) delete result.objects[j].doc;
            if (
                result.objects[j].value._id.match(/^system\.adapter\.([\w\d_-]+).(\d+)$/) &&
                result.objects[j].value.common.host === hostname
            ) {
                result.objects[j].value.common.host = '$$__hostname__$$';
                if (result.objects[j].doc) {
                    result.objects[j].doc.common.host = '$$__hostname__$$';
                }
            } else if (r.test(result.objects[j].value._id)) {
                result.objects[j].value._id = result.objects[j].value._id.replace(hostname, '$$$$__hostname__$$$$');
                result.objects[j].id = result.objects[j].value._id;
                if (result.objects[j].doc) {
                    result.objects[j].doc._id = result.objects[j].value._id;
                }
            } else if (result.objects[j].value._id === 'system.host.' + hostname) {
                result.objects[j].value._id = 'system.host.$$__hostname__$$';
                result.objects[j].value.common.name = result.objects[j].value._id;
                result.objects[j].value.common.hostname = '$$__hostname__$$';
                if (result.objects[j].value.native && result.objects[j].value.native.os) {
                    result.objects[j].value.native.os.hostname = '$$__hostname__$$';
                }
                result.objects[j].id = result.objects[j].value._id;
                if (result.objects[j].doc) {
                    result.objects[j].doc._id = result.objects[j].value._id;
                    result.objects[j].doc.common.name = result.objects[j].value._id;
                    result.objects[j].doc.common.hostname = '$$__hostname__$$';
                    if (result.objects[j].doc.native && result.objects[j].value.native.os) {
                        result.objects[j].doc.native.os.hostname = '$$__hostname__$$';
                    }
                }
            }

            // Read all files
            if (
                result.objects[j].value.type === 'meta' &&
                result.objects[j].value.common &&
                result.objects[j].value.common.type === 'meta.user'
            ) {
                // do not process "xxx.0. " and "xxx.0."
                if (
                    result.objects[j].id.trim() === result.objects[j].id &&
                    result.objects[j].id[result.objects[j].id.length - 1] !== '.'
                ) {
                    await this.copyDir(result.objects[j].id, '', `${tmpDir}/backup/files/${result.objects[j].id}`);
                }
            }

            // Read all files
            if (
                result.objects[j].value.type === 'instance' &&
                result.objects[j].value.common &&
                result.objects[j].value.common.dataFolder
            ) {
                let path = result.objects[j].value.common.dataFolder;

                if (path[0] !== '/' && !path.match(/^\w:/)) {
                    path = pathLib.join(this.configDir, path);
                }

                if (fs.existsSync(path)) {
                    this.copyFolderRecursiveSync(path, `${tmpDir}/backup`);
                }
            }
        }

        // special case: copy vis vis-common-user.css file
        try {
            const data = await this.objects.readFileAsync('vis', 'css/vis-common-user.css');
            if (data) {
                const dir = `${tmpDir}/backup/files/`;
                !fs.existsSync(`${dir}vis`) && fs.mkdirSync(`${dir}vis`);
                !fs.existsSync(`${dir}vis/css`) && fs.mkdirSync(`${dir}vis/css`);

                fs.writeFileSync(`${dir}vis/css/vis-common-user.css`, data.data !== undefined ? data.data : data);
            }
        } catch {
            // do not process 'css/vis-common-user.css'
        }

        console.log(`host.${hostname} ${result.objects.length} objects saved`);

        fs.writeFileSync(`${tmpDir}/backup/backup.json`, JSON.stringify(result, null, 2));

        try {
            this._validateBackupAfterCreation();
            return await this._packBackup(name);
        } catch (err) {
            console.error(`host.${hostname} Backup not created: ${err.message}`);
            await this._removeFolderRecursive(`${tmpDir}/backup/`);
            return void this.processExit(EXIT_CODES.CANNOT_EXTRACT_FROM_ZIP);
        }
    }

    //--------------------------------------- RESTORE ---------------------------------------------------
    /**
     * Helper to restore raw states
     *
     * @param {string[]} statesList - list of state ids
     * @param {object[]} stateObjects - list of state objects
     * @return {Promise<void>}
     * @private
     */
    async _setStateHelper(statesList, stateObjects) {
        for (let i = 0; i < statesList.length; i++) {
            try {
                await this.states.setRawState(statesList[i], stateObjects[statesList[i]]);
            } catch (err) {
                console.log(`host.${hostname} Could not set value for state ${statesList[i]}: ${err.message}`);
            }
            if (i % 200 === 0) {
                console.log(`host.${hostname} Processed ${i}/${statesList.length} states`);
            }
        }
    }

    /**
     * Sets all objects to the db and disables all adapters
     *
     * @param {object[]} _objects - array of all objects to be set
     * @return {Promise<void>}
     * @private
     */
    async _setObjHelper(_objects) {
        for (let i = 0; i < _objects.length; i++) {
            // Disable all adapters.
            if (
                !this.dbMigration &&
                _objects[i].id &&
                _objects[i].id.startsWith('system.adapter.') &&
                !_objects[i].id.startsWith('system.adapter.admin.') &&
                !_objects[i].id.startsWith('system.adapter.backitup.')
            ) {
                if (_objects[i].doc.common && _objects[i].doc.common.enabled) {
                    _objects[i].doc.common.enabled = false;
                }
            }
            if (_objects[i].doc && _objects[i].doc._rev) {
                delete _objects[i].doc._rev;
            }

            try {
                await this.objects.setObjectAsync(_objects[i].id, _objects[i].doc);
            } catch (err) {
                console.warn(`host.${hostname} Cannot restore ${_objects[i].id}: ${err.message}`);
            }

            if (i % 200 === 0) {
                console.log(`host.${hostname} Processed ${i}/${_objects.length} objects`);
            }
        }
    }

    /**
     * Creates all provided object if non existing
     *
     * @param {object[]} objectList - list of objects to be created
     * @return {Promise<void>}
     */
    async _reloadAdapterObject(objectList) {
        if (!Array.isArray(objectList)) {
            return;
        }

        for (const object of objectList) {
            let obj;
            try {
                obj = await this.objects.getObjectAsync(object._id);
            } catch {
                // ignore
            }

            if (!obj) {
                // object not existing -> create it
                try {
                    await this.objects.setObjectAsync(object._id, object);
                    console.log(`host.${hostname} object ${object._id} created`);
                } catch {
                    // ignore
                }
            }
        }
    }

    async _reloadAdaptersObjects() {
        const dirs = [];
        let _modules;
        let p = pathLib.normalize(__dirname + '/../../node_modules');

        if (fs.existsSync(p)) {
            if (!p.includes('js-controller')) {
                _modules = fs.readdirSync(p).filter(dir => fs.existsSync(`${p}/${dir}/io-package.json`));
                if (_modules) {
                    const regEx = new RegExp(`^${tools.appName}\\.`, 'i');
                    for (let i = 0; i < _modules.length; i++) {
                        if (
                            regEx.test(_modules[i]) &&
                            !dirs.includes(_modules[i].substring(tools.appName.length + 1))
                        ) {
                            dirs.push(_modules[i]);
                        }
                    }
                }
            } else {
                p = pathLib.normalize(__dirname + '/../../../node_modules');
                if (fs.existsSync(p)) {
                    _modules = fs.readdirSync(p).filter(dir => fs.existsSync(`${p}/${dir}/io-package.json`));
                    if (_modules) {
                        const regEx = new RegExp('^' + tools.appName + '\\.', 'i');
                        for (let i = 0; i < _modules.length; i++) {
                            if (
                                regEx.test(_modules[i]) &&
                                !dirs.includes(_modules[i].substring(tools.appName.length + 1))
                            ) {
                                dirs.push(_modules[i]);
                            }
                        }
                    }
                }
            }
        }
        // if installed as npm
        if (fs.existsSync(`${__dirname}/../../../../node_modules/${tools.appName}.js-controller`)) {
            const p = pathLib.normalize(__dirname + '/../../..');
            _modules = fs.readdirSync(p).filter(dir => fs.existsSync(`${p}/${dir}/io-package.json`));
            const regEx_ = new RegExp(`^${tools.appName}\\.`, 'i');
            for (let j = 0; j < _modules.length; j++) {
                // if starting from application name + '.'
                if (
                    regEx_.test(_modules[j]) &&
                    // If not js-controller
                    _modules[j].substring(tools.appName.length + 1) !== 'js-controller' &&
                    !dirs.includes(_modules[j].substring(tools.appName.length + 1))
                ) {
                    dirs.push(_modules[j]);
                }
            }
        }

        for (let index = 0; index < dirs.length; index++) {
            const adapterName = dirs[index].replace(/^iobroker\./i, '');
            await this.upload.uploadAdapterAsync(adapterName, false, true);
            await this.upload.uploadAdapterAsnyc(adapterName, true, true);
            let pkg = null;
            if (!dirs[index]) {
                console.error('Wrong');
            }
            const adapterDir = tools.getAdapterDir(adapterName);
            if (fs.existsSync(`${adapterDir}/io-package.json`)) {
                pkg = fs.readJSONSync(`${adapterDir}/io-package.json`);
            }

            if (pkg && pkg.objects && pkg.objects.length) {
                console.log(`host.${hostname} Setup "${dirs[index]}" adapter`);
                await this._reloadAdapterObject(pkg.objects);
            }
        }
    }

    async _uploadUserFiles(root, path) {
        path = path || '';
        if (!fs.existsSync(root)) {
            return;
        }
        const files = fs.readdirSync(root + path);
        for (let i = 0; i < files.length; i++) {
            const stat = fs.statSync(`${root + path}/${files[i]}`);
            if (stat.isDirectory()) {
                try {
                    await this._uploadUserFiles(root, `${path}/${files[i]}`);
                } catch (err) {
                    console.error(`Error: ${err}`);
                }
            } else {
                const parts = path.split('/');
                let adapter = parts.splice(0, 2);
                adapter = adapter[1];
                const _path = parts.join('/') + '/' + files[i];
                console.log(`host.${hostname} Upload user file "${adapter}/${_path}`);
                try {
                    await this.objects.writeFileAsync(adapter, _path, fs.readFileSync(root + path + '/' + files[i]));
                } catch (err) {
                    console.error(`Error: ${err}`);
                }
            }
        }
    }

    _copyBackupedFiles(backupDir) {
        const dirs = fs.readdirSync(backupDir);

        dirs.forEach(dir => {
            if (dir === 'files') {
                return;
            }
            const path = pathLib.join(backupDir, dir);
            const stat = fs.statSync(path);
            if (stat.isDirectory()) {
                this.copyFolderRecursiveSync(path, this.configDir);
            }
        });
    }

    async _restoreAfterStop(restartOnFinish) {
        // Open file
        let data = fs.readFileSync(`${tmpDir}/backup/backup.json`, 'utf8');
        const hostname = tools.getHostName();
        // replace all hostnames of instances etc with the new host
        data = data.replace(/\$\$__hostname__\$\$/g, hostname);
        fs.writeFileSync(`${tmpDir}/backup/backup_.json`, data);
        let restore;
        try {
            restore = JSON.parse(data);
        } catch (err) {
            console.error(`Cannot parse "${tmpDir}/backup/backup_.json": ${err.message}`);
            return EXIT_CODES.CANNOT_RESTORE_BACKUP;
        }

        // stop all adapters
        console.log(`host.${hostname} Clear all objects and states...`);
        await this.cleanDatabaseAsync(false);
        console.log(`host.${hostname} done.`);
        // upload all data into DB
        // restore ioBroker.json
        if (restore.config) {
            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(restore.config, null, 2));
        }

        const sList = Object.keys(restore.states);

        await this._setObjHelper(restore.objects);
        console.log(`${restore.objects.length} objects restored.`);
        await this._setStateHelper(sList, restore.states);
        console.log(`${sList.length} states restored.`);
        // Required for upload adapter
        this.mime = this.mime || require('mime');
        // Load user files into DB
        await this._uploadUserFiles(tmpDir + '/backup/files');
        //  reload objects of adapters
        await this._reloadAdaptersObjects();
        // Reload host objects
        const packageIO = fs.readJSONSync(`${__dirname}/../../io-package.json`);
        await this._reloadAdapterObject(packageIO ? packageIO.objects : null);
        // copy all files into iob-data
        await this._copyBackupedFiles(pathLib.join(tmpDir, 'backup'));
        if (restartOnFinish) {
            await this.restartControllerAsync();
        }
    }

    /**
     * Returns all backups as array
     *
     * @return {string[]}
     */
    listBackups() {
        const dir = this.getBackupDir();
        const result = [];
        if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir);
            for (let i = 0; i < files.length; i++) {
                if (files[i].match(/\.tar\.gz$/i)) {
                    result.push(files[i]);
                }
            }
            return result;
        } else {
            return result;
        }
    }

    /**
     * Validates the backup.json and all json files inside the backup after (in temporary directory), here we only abort if backup.json is corrupted
     */
    _validateBackupAfterCreation() {
        const backupJSON = require(`${tmpDir}/backup/backup.json`);
        if (!backupJSON.objects || !backupJSON.objects.length) {
            throw new Error('Backup does not contain valid objects');
        }

        // we check all other json files, we assume them as optional, because user created files may be no valid json
        try {
            this._checkDirectory(`${tmpDir}/backup/files`);
        } catch (err) {
            console.warn(`host.${hostname} One or more optional files are corrupted: ${err.message}`);
            console.warn(`host.${hostname} Please ensure that self-created JSON files are valid`);
        }
    } // endValidateBackupAfterCreation

    /**
     * Validates the given backup.json and all json files in the backup, calls processExit afterwards
     * @param {string} name - index or name of the backup
     */
    validateBackup(name) {
        let backups;
        // @ts-ignore
        if (!name && name !== 0) {
            backups = this.listBackups();
            backups.sort((a, b) => (b > a ? 1 : b === a ? 0 : -1));
            if (backups.length) {
                // List all available backups
                console.log('Please specify one of the backup names:');

                for (const t in backups) {
                    console.log(`${backups[t]} or ${backups[t].replace(`_backup${tools.appName}.tar.gz`, '')} or ${t}`);
                }
            } else {
                console.warn(`No backups found. Create a backup, using "${tools.appName} backup" first`);
            }
            return void this.processExit(10);
        }
        // If number
        if (parseInt(name, 10).toString() === name.toString()) {
            backups = this.listBackups();
            backups.sort((a, b) => (b > a ? 1 : b === a ? 0 : -1));
            name = backups[parseInt(name, 10)];
            if (!name) {
                console.log('No matching backup found');
                if (backups.length) {
                    console.log('Please specify one of the backup names:');
                    for (const t of Object.keys(backups)) {
                        console.log(
                            `${backups[t]} or ${backups[t].replace(`_backup${tools.appName}.tar.gz`, '')} or ${t}`
                        );
                    }
                } else {
                    console.log(`No existing backups. Create a backup, using "${tools.appName} backup" first`);
                }
                return void this.processExit(10);
            } else {
                console.log(`host.${hostname} Using backup file ${name}`);
            }
        }

        name = (name || '').toString().replace(/\\/g, '/');
        if (!name.includes('/')) {
            name = this.getBackupDir() + name;
            const regEx = new RegExp(`_backup${tools.appName}`, 'i');
            if (!regEx.test(name)) {
                name += `_backup${tools.appName}`;
            }
            if (!name.match(/\.tar\.gz$/i)) {
                name += '.tar.gz';
            }
        }
        if (!fs.existsSync(name)) {
            console.error(`host.${hostname} Cannot find ${name}`);
            return void this.processExit(11);
        }
        const tar = require('tar');
        if (fs.existsSync(`${tmpDir}/backup/backup.json`)) {
            fs.unlinkSync(`${tmpDir}/backup/backup.json`);
        }

        return new Promise(resolve => {
            tar.extract(
                {
                    file: name,
                    cwd: tmpDir
                },
                async err => {
                    if (err) {
                        console.error(`host.${hostname} Cannot extract from file "${name}"`);
                        return void this.processExit(9);
                    }
                    if (!fs.existsSync(`${tmpDir}/backup/backup.json`)) {
                        console.error(
                            `host.${hostname} Validation failed. Cannot find extracted file from file "${tmpDir}/backup/backup.json"`
                        );
                        return void this.processExit(9);
                    }

                    console.log(`host.${hostname} Starting validation ...`);
                    let backupJSON;
                    try {
                        backupJSON = require(`${tmpDir}/backup/backup.json`);
                    } catch (err) {
                        console.error(
                            `host.${hostname} Backup corrupted. Backup ${name} does not contain a valid backup.json file: ${err.message}`
                        );
                        await this._removeFolderRecursive(`${tmpDir}/backup/`);
                        return void this.processExit(26);
                    }

                    if (!backupJSON || !backupJSON.objects || !backupJSON.objects.length) {
                        console.error(`host.${hostname} Backup corrupted. Backup does not contain valid objects`);
                        await this._removeFolderRecursive(`${tmpDir}/backup/`);
                        return void this.processExit(26);
                    } // endIf

                    console.log(`host.${hostname} backup.json OK`);

                    try {
                        this._checkDirectory(`${tmpDir}/backup/files`, true);
                        await this._removeFolderRecursive(`${tmpDir}/backup/`);
                        resolve();
                    } catch (err) {
                        console.error(`host.${hostname} Backup corrupted: ${err.message}`);
                        return void this.processExit(26);
                    }
                }
            );
        });
    } // endValidateBackup

    /**
     * Checks a directory for json files and validates them, steps down recursive in subdirectories
     * @param {string} path - path to the directory
     * @param {boolean} verbose - if logging should be verbose
     * @private
     */
    _checkDirectory(path, verbose = false) {
        if (fs.existsSync(path)) {
            const files = fs.readdirSync(path);
            if (!files.length) {
                return;
            }
            for (const file of files) {
                const filePath = `${path}/${file}`;
                if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
                    // if directory then check it
                    this._checkDirectory(filePath, verbose);
                } else if (file.endsWith('.json')) {
                    try {
                        require(filePath);
                        if (verbose) {
                            console.log(`host.${hostname} ${file} OK`);
                        }
                    } catch {
                        throw new Error(`host.${hostname} ${filePath} is not a valid json file`);
                    }
                }
            }
        } // endIf
    } // endCheckDirectory

    restoreBackup(name, callback) {
        let backups;
        if (!name && name !== 0) {
            // List all available backups
            console.log('Please specify one of the backup names:');
            backups = this.listBackups();
            backups.sort((a, b) => (b > a ? 1 : b === a ? 0 : -1));
            if (backups.length) {
                backups.forEach((backup, i) =>
                    console.log(`${backup} or ${backup.replace('_backup' + tools.appName + '.tar.gz', '')} or ${i}`)
                );
            } else {
                console.warn('No backups found');
            }
            return this.processExit(10);
        }

        if (!this.cleanDatabaseAsync) {
            throw new Error('Invalid arguments: cleanDatabaseAsync is missing');
        }
        if (!this.restartControllerAsync) {
            throw new Error('Invalid arguments: restartControllerAsync is missing');
        }

        // If number
        if (parseInt(name, 10).toString() === name.toString()) {
            backups = this.listBackups();
            backups.sort((a, b) => (b > a ? 1 : b === a ? 0 : -1));
            name = backups[parseInt(name, 10)];
            if (!name) {
                console.log('No matching backup found');
                if (backups.length) {
                    console.log('Please specify one of the backup names:');
                    backups.forEach((backup, i) =>
                        console.log(`${backup} or ${backup.replace('_backup' + tools.appName + '.tar.gz', '')} or ${i}`)
                    );
                } // endIf
            } else {
                console.log(`host.${hostname} Using backup file ${name}`);
            }
        }

        name = (name || '').toString().replace(/\\/g, '/');
        if (!name.includes('/')) {
            name = this.getBackupDir() + name;
            const regEx = new RegExp('_backup' + tools.appName, 'i');
            if (!regEx.test(name)) {
                name += '_backup' + tools.appName;
            }
            if (!name.match(/\.tar\.gz$/i)) {
                name += '.tar.gz';
            }
        }
        if (!fs.existsSync(name)) {
            console.error(`host.${hostname} Cannot find ${name}`);
            return this.processExit(11);
        }
        const tar = require('tar');

        // delete /backup/backup.json
        fs.existsSync(tmpDir + '/backup/backup.json') && fs.unlinkSync(tmpDir + '/backup/backup.json');

        tar.extract(
            {
                file: name,
                cwd: tmpDir
            },
            err => {
                if (err) {
                    console.error(`host.${hostname} Cannot extract from file "${name}"`);
                    return this.processExit(9);
                }
                if (!fs.existsSync(`${tmpDir}/backup/backup.json`)) {
                    console.error(
                        `host.${hostname} Cannot find extracted file from file "${tmpDir}/backup/backup.json"`
                    );
                    return this.processExit(9);
                }
                // Stop controller
                const daemon = require('daemonize2').setup({
                    main: '../../controller.js',
                    name: tools.appName + ' controller',
                    pidfile: `${__dirname}/../${tools.appName}.pid`,
                    cwd: '../../',
                    stopTimeout: 1000
                });
                daemon.on('error', async () => {
                    await this._restoreAfterStop(false);
                    callback && callback();
                });
                daemon.on('stopped', async () => {
                    await this._restoreAfterStop(true);
                    callback && callback();
                });
                daemon.on('notrunning', async () => {
                    console.log(`host.${hostname} OK.`);
                    await this._restoreAfterStop(false);
                    callback && callback();
                });

                daemon.stop();
            }
        );
    }
}

module.exports = BackupRestore;
