'use strict';

function BackupRestore(options) {
    // allow use without new operator
    if (!(this instanceof BackupRestore)) return new BackupRestore(options);

    const fs       = require('fs');
    const tools    = require(__dirname + '/../tools.js');
    const pathLib  = require('path');
    const tmpDir   = pathLib.normalize(__dirname + '/../../tmp');
    const bkpDir   = pathLib.normalize(__dirname + '/../../backups');
    const hostname = tools.getHostName();

    options = options || {};

    if (!options.states)            throw 'Invalid arguments: states is missing';
    if (!options.objects)           throw 'Invalid arguments: objects is missing';
    if (!options.processExit)       throw 'Invalid arguments: processExit is missing';
    if (!options.cleanDatabase)     throw 'Invalid arguments: cleanDatabase is missing';
    if (!options.restartController) throw 'Invalid arguments: restartController is missing';

    const objects           = options.objects;
    const states            = options.states;
    const processExit       = options.processExit;
    const cleanDatabase     = options.cleanDatabase;
    const restartController = options.restartController;
    let mime;

    const Upload = require(__dirname + '/setupUpload.js');
    const upload = new Upload(options);

    const configParts = tools.getConfigFileName().split('/');
    configParts.pop(); // remove *.json
    const configDir = configParts.join('/'); // => name-data

    // --------------------------------------- BACKUP ---------------------------------------------------
    function _copyFile(id, srcPath, destPath, callback) {
        objects.readFile(id, srcPath, '', (err, data) => {
            if (data) fs.writeFileSync(destPath, data);
            setImmediate(callback);
        });
    }

    function copyDir(id, srcPath, destPath, callback) {
        let count = 0;
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath);
        }
        objects.readDir(id, srcPath, (err, res) => {
            if (res) {
                for (let t = 0; t < res.length; t++) {
                    if (res[t].isDir) {
                        count++;
                        copyDir(id, srcPath + '/' + res[t].file, destPath + '/' + res[t].file, () => {
                            if (!--count) {
                                setImmediate(callback);
                            }
                        });
                    } else {
                        if (!fs.existsSync(destPath)) {
                            fs.mkdirSync(destPath);
                        }
                        count++;
                        _copyFile(id, srcPath + '/' + res[t].file, destPath + '/' + res[t].file, () => {
                            if (!--count) {
                                setImmediate(callback);
                            }
                        });
                    }
                }
            }
            if (!count) {
                setImmediate(callback);
            }
        });
    }

    function getBackupDir() {
        let dataDir = tools.getDefaultDataDir();

        // All pathes are returned always relative to /node_modules/appName.js-controller
        if (dataDir) {
            if (dataDir[0] === '.' && dataDir[1] === '.') {
                dataDir = __dirname + '/../../' + dataDir;
            } else if (dataDir[0] === '.' && dataDir[1] === '/') {
                dataDir = __dirname + '/../../' + dataDir.substring(2);
            }
        }
        dataDir = dataDir.replace(/\\/g, '/');
        if (dataDir[dataDir.length - 1] !== '/') dataDir += '/';

        const parts = dataDir.split('/');
        parts.pop();// remove data or appName-data
        parts.pop();

        return parts.join('/') + '/backups/';
    }

    function copyFileSync(source, target) {
        let targetFile = target;

        // if target is a directory a new file with the same name will be created
        if (fs.existsSync(target)) {
            if (fs.lstatSync(target).isDirectory()) {
                targetFile = pathLib.join(target, pathLib.basename(source));
            }
        }

        fs.writeFileSync(targetFile, fs.readFileSync(source));
    }

    function copyFolderRecursiveSync(source, target) {
        let files = [];

        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }

        // check if folder needs to be created or integrated
        const targetFolder = pathLib.join(target, pathLib.basename(source));
        if (!fs.existsSync(targetFolder)) fs.mkdirSync(targetFolder);

        // copy
        if (fs.lstatSync(source).isDirectory() ) {
            files = fs.readdirSync(source);
            files.forEach(function (file) {
                const curSource = pathLib.join(source, file);
                if (fs.lstatSync(curSource).isDirectory()) {
                    copyFolderRecursiveSync(curSource, targetFolder);
                } else {
                    copyFileSync(curSource, targetFolder);
                }
            });
        }
    }

    function packBackup(name, callback) {
        // todo: store letsencrypt files too =>  change it as letsencrypt will be better integrated
        const letsEncrypt = configDir + '/letsencrypt';
        if (fs.existsSync(letsEncrypt)) {
            copyFolderRecursiveSync(letsEncrypt, tmpDir + '/backup');
        }
        const tar = require('tar');

        const f = fs.createWriteStream(name);
        f.on('finish', () => {
            tools.rmdirRecursiveSync(tmpDir + '/backup');
            if (callback) callback(pathLib.normalize(name));
        });
        f.on('error', err => {
            console.error('host.' + hostname + ' Cannot pack directory ' +  pathLib.normalize(tmpDir + '/backup') + ': ' + err);
            processExit(9);
        });

        try {
            tar.create({gzip: true, cwd: tmpDir + '/'}, ['backup']).pipe(f);
        } catch (err) {
            console.error('host.' + hostname + ' Cannot pack directory ' +  pathLib.normalize(tmpDir + '/backup') + ': ' + err);
            processExit(9);
        }
    }

    this.createBackup = function (name, callback) {
        let count = 0;

        if (!name) {
            const d = new Date();
            name = d.getFullYear() + '_' +
                ('0' + (d.getMonth() + 1)).slice(-2) + '_' +
                ('0' + d.getDate()).slice(-2) + '-' +
                ('0' + d.getHours()).slice(-2) + '_' +
                ('0' + d.getMinutes()).slice(-2) + '_' +
                ('0' + d.getSeconds()).slice(-2) + '_backup' + tools.appName;
        }

        name = name.replace(/\\/g, '/');
        if (name.indexOf('/') === -1) {
            const path = getBackupDir();

            // create directory if not exists
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }

            if (name.indexOf('.tar.gz') === -1) {
                name =  path + name + '.tar.gz';
            } else {
                name =  path + name;
            }
        }

        objects.getObjectList({include_docs: true}, (err, res) => {
            const result = {objects: null, states: {}, config: null};
            if (err) {
                console.error('host.' + hostname + ' Cannot get objects: ' + err);
            } else {
                result.objects = res.rows;
            }

            if (fs.existsSync(tools.getConfigFileName())) {
                result.config = JSON.parse(fs.readFileSync(tools.getConfigFileName(), 'utf8'));
            }

            states.getKeys('io.*', (err, keys) => {
                /*for (const i = keys.length - 1; i >= 0; i--) {
                 if (keys[i].match(/^messagebox\./) || keys[i].match(/^log\./)) {
                 keys.splice(i, 1);
                 }
                 }*/

                states.getStates(keys, (err, obj) => {
                    const hostname = tools.getHostName();
                    const r = new RegExp('^system\\.host\\.' + hostname + '\\.(\\w+)$');

                    for (let i = 0; i < keys.length; i++) {
                        if (obj[i].from === 'system.host.' + hostname) {
                            obj[i].from = 'system.host.$$__hostname__$$';
                        }
                        if (r.test(keys[i])) {
                            keys[i] = keys[i].replace(hostname, '$$__hostname__$$');
                        }
                        result.states[keys[i]] = obj[i];
                    }

                    if (!fs.existsSync(bkpDir))          fs.mkdirSync(bkpDir);
                    if (!fs.existsSync(tmpDir))              fs.mkdirSync(tmpDir);
                    if (!fs.existsSync(tmpDir + '/backup'))       fs.mkdirSync(tmpDir + '/backup');
                    if (!fs.existsSync(tmpDir + '/backup/files')) fs.mkdirSync(tmpDir + '/backup/files');

                    // try to find user files
                    for (let j = 0; j < result.objects.length; j++) {
                        if (!result.objects[j].value || !result.objects[j].value._id || !result.objects[j].value.common) continue;
                        //if (result.objects[j].doc) delete result.objects[j].doc;
                        if (result.objects[j].value._id.match(/^system\.adapter\.([\w\d_-]+).(\d+)$/) &&
                            result.objects[j].value.common.host === hostname) {
                            result.objects[j].value.common.host = '$$__hostname__$$';
                            if (result.objects[j].doc) {
                                result.objects[j].doc.common.host = '$$__hostname__$$';
                            }
                        } else
                        if (r.test(result.objects[j].value._id)) {
                            result.objects[j].value._id = result.objects[j].value._id.replace(hostname, '$$__hostname__$$');
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
                        if (result.objects[j].value.type === 'meta' &&
                            result.objects[j].value.common &&
                            result.objects[j].value.common.type === 'meta.user') {
                            count++;
                            copyDir(result.objects[j].id, '', tmpDir + '/backup/files/' + result.objects[j].id, () => (!--count) && packBackup(name, callback));
                        }

                        // Read all files
                        if (result.objects[j].value.type === 'instance' &&
                            result.objects[j].value.common &&
                            result.objects[j].value.common.dataFolder) {
                            let path = result.objects[j].value.common.dataFolder;
                            if (path[0] !== '/' && !path.match(/^\w:/)) {
                                path = pathLib.join(configDir, path);
                            }

                            if (fs.existsSync(path)) {
                                copyFolderRecursiveSync(path, tmpDir + '/backup');
                            }
                        }
                    }

                    fs.writeFileSync(tmpDir + '/backup/backup.json', JSON.stringify(result, null, 2));

                    if (!count) {
                        packBackup(name, callback);
                    }
                });
            });

        });
    };

    //--------------------------------------- RESTORE ---------------------------------------------------
    function _setStateHelper(_index, statesList, stateObjects, callback) {
        states.setRawState(statesList[_index], stateObjects[statesList[_index]], () => {
            if ((_index % 200) === 0) {
                console.log('host.' + hostname + ' Processed ' + _index + '/' + statesList.length + ' states');
            }
            _index++;
            if (_index < statesList.length) {
                setImmediate(_setStateHelper, _index, statesList, stateObjects, callback);
            } else {
                if (callback) callback();
            }
        });
    }

    function _setObjHelper(_index, _objects, callback) {
        // Disable all adapters.
        if (_objects[_index].id.match(/^system\.adapter\./)
            && !_objects[_index].id.match(/^system\.adapter\.admin\./)
            && !_objects[_index].id.match(/^system\.adapter\.backitup\./)) {
            if (_objects[_index].doc.common && _objects[_index].doc.common.enabled) {
                _objects[_index].doc.common.enabled = false;
            }
        }
        if (_objects[_index].doc && _objects[_index].doc._rev) delete _objects[_index].doc._rev;

        objects.setObject(_objects[_index].id, _objects[_index].doc, (err /* , obj */) => {
            if (err) {
                console.warn('host.' + hostname + ' Cannot restore ' + _objects[_index].id + ': ' + err);
            }

            if ((_index % 200) === 0) console.log('host.' + hostname + ' Processed ' + _index + '/' + _objects.length + ' objects');
            _index++;
            if (_index < _objects.length) {
                setImmediate(_setObjHelper, _index, _objects, callback);
            } else {
                if (callback) callback();
            }
        });
    }

    function reloadAdapterObject(index, objectList, callback) {
        if (objectList && index < objectList.length) {
            objects.getObject(objectList[index]._id, (err, obj) => {
                if (err || !obj) {
                    objects.setObject(objectList[index]._id, objectList[index], () => {
                        console.log('host.' + hostname + ' object ' + objectList[index]._id + ' created');
                        index++;
                        setImmediate(reloadAdapterObject, index, objectList, callback);
                    });
                } else {
                    index++;
                    setImmediate(reloadAdapterObject, index, objectList, callback);
                }
            });
        } else {
            if (callback) callback();
        }
    }

    function reloadAdaptersObjects(callback, dirs, index) {
        if (!dirs) {
            dirs = [];
            let _modules;
            if (fs.existsSync(__dirname + '/../../node_modules')) {
                _modules = fs.readdirSync(__dirname + '/../../node_modules');
                if (_modules) {
                    const regEx = new RegExp('^' + tools.appName + '\\.', 'i');
                    for (let i = 0; i < _modules.length; i++) {
                        if (regEx.test(_modules[i]) &&
                            dirs.indexOf(_modules[i].substring(tools.appName.length + 1)) === -1) {
                            dirs.push(_modules[i]);
                        }
                    }
                }
            }
            // if installed as npm
            if (fs.existsSync(__dirname + '/../../../../node_modules/' + tools.appName + '.js-controller')) {
                _modules = fs.readdirSync(__dirname + '/../../..');
                const regEx_ = new RegExp('^' + tools.appName + '\\.', 'i');
                for (let j = 0; j < _modules.length; j++) {
                    // if starting from application name + '.'
                    if (regEx_.test(_modules[j]) &&
                            // If not js-controller
                        (_modules[j].substring(tools.appName.length + 1) !== 'js-controller') &&
                        dirs.indexOf(_modules[j].substring(tools.appName.length + 1)) === -1) dirs.push(_modules[j]);
                }
            }
            if (dirs.length) {
                reloadAdaptersObjects(callback, dirs, 0);
            } else {
                if (callback) callback();
            }
        } else {
            if (index < dirs.length) {
                upload.uploadAdapter(dirs[index], false, true, () => {
                    upload.uploadAdapter(dirs[index], true, true, () => {
                        let pkg = null;
                        if (!dirs[index]) {
                            console.error('Wrong');
                        }
                        const adapterDir = tools.getAdapterDir(dirs[index]);
                        if (fs.existsSync(adapterDir + '/io-package.json')) {
                            pkg = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json', 'utf8'));
                        }

                        if (pkg && pkg.objects && pkg.objects.length) {
                            console.log('host.' + hostname + ' Setup "' + dirs[index] + '" adapter');
                            reloadAdapterObject(0, pkg.objects, () => {
                                index++;
                                setImmediate(reloadAdaptersObjects, callback, dirs, index);
                            });
                        } else {
                            index++;
                            reloadAdaptersObjects(callback, dirs, index);
                        }
                    });
                });
            } else {
                if (callback) callback();
            }
        }
    }

    function uploadUserFiles(root, path, callback) {
        if (typeof path === 'function') {
            callback = path;
            path = '';
        }

        let called = false;
        if (!fs.existsSync(root)) {
            callback();
            return;
        }
        const files = fs.readdirSync(root + path);
        let count  = files.length;
        for (let i = 0; i < files.length; i++) {
            const stat = fs.statSync(root + path + '/' + files[i]);
            if (stat.isDirectory()) {
                called = true;
                uploadUserFiles(root, path + '/' + files[i], err => {
                    if (err) console.error('Error: ' + err);
                    if (!--count) setImmediate(callback);
                });
            } else {
                const parts = path.split('/');
                let adapter = parts.splice(0, 2);
                adapter = adapter[1];
                const _path = parts.join('/') + '/' + files[i];
                console.log('host.' + hostname + ' Upload user file "' + adapter + "/" + _path);
                called = true;
                objects.writeFile(adapter, _path, fs.readFileSync(root + path + '/' + files[i]), null, err => {
                    if (err) console.error('Error: ' + err);
                    if (!--count) setImmediate(callback);
                });
            }
        }
        if (!called) callback();
    }

    function copyBackupedFiles(backupDir, callback) {
        const dirs = fs.readdirSync(backupDir);
        dirs.forEach(dir => {
            if (dir === 'files') return;
            const path = pathLib.join(backupDir, dir);
            const stat = fs.statSync(path);
            if (stat.isDirectory()) {
                copyFolderRecursiveSync(path, configDir);
            }
        });
        callback && callback();
    }

    function restoreAfterStop(restartOnFinish, callback) {
        // Open file
        let data = fs.readFileSync(tmpDir + '/backup/backup.json').toString();
        const hostname = tools.getHostName();
        data = data.replace(/\$\$__hostname__\$\$/g, hostname);
        fs.writeFileSync(tmpDir + '/backup/backup_.json', data);
        let restore;
        try {
            restore = JSON.parse(data);
        } catch (e) {
            console.error('Cannot parse "' + tmpDir + '/backup/backup_.json": ' + e);
            if (callback) callback(31);
        }

        // stop all adapters
        console.log('host.' + hostname + ' Clear all objects and states...');
        cleanDatabase(false, () => {
            console.log('host.' + hostname + ' done.');
            // upload all data into DB
            // restore ioBorker.json
            if (restore.config) fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(restore.config, null, 2));

            const sList = [];
            for (const state in restore.states) {
                if (restore.states.hasOwnProperty(state)) {
                    sList.push(state);
                }
            }

            _setStateHelper(0, sList, restore.states, () => {
                console.log(sList.length + ' states restored.');
                _setObjHelper(0, restore.objects, () => {
                    console.log(restore.objects.length + ' objects restored.');
                    // Required for upload adapter
                    mime = require('mime');
                    // Load user files into DB
                    uploadUserFiles(tmpDir + '/backup/files', () => {
                        //  reload objects of adapters
                        reloadAdaptersObjects(() => {
                            // Reload host objects
                            const packageIO = JSON.parse(fs.readFileSync(__dirname + '/../../io-package.json', 'utf8'));
                            reloadAdapterObject(0, packageIO ? packageIO.objects : null, () => {
                                // copy all files into iob-data
                                copyBackupedFiles(pathLib.join(tmpDir, 'backup'), () => {
                                    if (restartOnFinish) {
                                        restartController(callback);
                                    } else {
                                        if (callback) callback();
                                    }
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    this.listBackups = function () {
        const dir = getBackupDir();
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
    };

    this.restoreBackup = function (name, callback) {
        let backups;
        if (!name && name !== 0) {
            // List all available backups
            console.log('Please specify one of the backup names:');
            backups = this.listBackups();
            backups.sort((a, b) => b > a);
            if (backups.length) {
                for (let t = 0; t < backups.length; t++){
                    console.log(backups[t] + ' or ' + backups[t].replace('_backup' + tools.appName + '.tar.gz', '') + ' or ' + t);
                }
            } else {
                console.warn('No backups found');
            }
            processExit(10);
        }

        if (!options.cleanDatabase) throw 'Invalid arguments: cleanDatabase is missing';
        if (!options.restartController) throw 'Invalid arguments: restartController is missing';

        // If number
        if (parseInt(name.trim(), 10).toString() === name.trim().toString()) {
            backups = this.listBackups();
            backups.sort((a, b) => b > a);
            name = backups[parseInt(name.trim(), 10)];
            console.log('host.' + hostname + ' Using backup file ' + name);
        }

        name = (name || '').toString().replace(/\\/g, '/');
        if (name.indexOf('/') === -1) {
            name = getBackupDir() + name;
            const regEx = new RegExp('_backup' + tools.appName, 'i');
            if (!regEx.test(name)) name += '_backup' + tools.appName;
            if (!name.match(/\.tar\.gz$/i)) name += '.tar.gz';
        }
        if (!fs.existsSync(name)) {
            console.error('host.' + hostname + ' Cannot find ' + name);
            processExit(11);
        }
        const tar = require('tar');
        if (fs.existsSync(tmpDir + '/backup/backup.json')) {
            fs.unlinkSync(tmpDir + '/backup/backup.json');
        }

        tar.extract({
            file: name,
            cwd: tmpDir
        }, err => {
            if (err) {
                console.error('host.' + hostname + ' Cannot extract from file "' + name + '"');
                processExit(9);
            }
            if (!fs.existsSync(tmpDir + '/backup/backup.json')) {
                console.error('host.' + hostname + ' Cannot find extracted file from file "' + tmpDir + '/backup/backup.json"');
                processExit(9);
            }
            // Stop controller
            const daemon = require('daemonize2').setup({
                main:        '../../controller.js',
                name:        tools.appName + ' controller',
                pidfile:     __dirname + '/../' + tools.appName + '.pid',
                cwd:         '../../',
                stopTimeout: 1000
            });
            daemon.on('error', (/* error */) => restoreAfterStop(false, callback));
            daemon.on('stopped', () => restoreAfterStop(true, callback));
            daemon.on('notrunning', () => {
                console.log('host.' + hostname + ' OK.');
                restoreAfterStop(false, callback);
            });
            daemon.stop();
        });
    }
}

module.exports = BackupRestore;
