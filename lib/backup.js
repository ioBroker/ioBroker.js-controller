
function BackupRestore(options) {
    var fs      = require('fs');
    var tools   = require(__dirname + '/tools.js');
    var pathLib = require('path');

    // allow use without new operator
    if (!(this instanceof BackupRestore)) return new BackupRestore(options);

    var that = this;

    var options = options || {};

    if (!options.states)      throw "Invalid arguments: states is missing";
    if (!options.objects)     throw "Invalid arguments: objects is missing";
    if (!options.processExit) throw "Invalid arguments: processExit is missing";

    var objects           = options.objects;
    var states            = options.states;
    var processExit       = options.processExit;
    var uploadAdapter     = options.uploadAdapter;
    var cleanDatabase     = options.cleanDatabase;
    var restartController = options.restartController;
    var mime;

    // --------------------------------------- BACKUP ---------------------------------------------------
    function _copyFile(id, srcPath, destPath, callback) {
        objects.readFile(id, srcPath, "", function (err, data) {
            if (data) fs.writeFileSync(destPath, data);
            callback();
        });
    }

    function copyDir(id, srcPath, destPath, callback) {
        var count = 0;
        if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
        objects.readDir(id, srcPath, function (err, res) {
            if (res) {
                for (var t = 0; t < res.length; t++) {
                    if (res[t].isDir) {
                        count++;
                        copyDir(id, srcPath + '/' + res[t].file, destPath + '/' + res[t].file, function () {
                            count--;
                            if (!count) callback();
                        });
                    } else {
                        if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
                        count++;
                        _copyFile(id, srcPath + '/' + res[t].file, destPath + '/' + res[t].file, function () {
                            count--;
                            if (!count) callback();
                        });
                    }
                }
            }
            if (!count) callback();
        });
    }

    function getBackupDir() {
        var dataDir = tools.getDefaultDataDir();

        // All pathes are returned always relative to /node_modules/iobroker.js-controller
        if (dataDir) {
            if (dataDir[0] == '.' && dataDir[1] == '.') {
                dataDir = __dirname + '/../' + dataDir;
            } else if (dataDir[0] == '.' && dataDir[1] == '/') {
                dataDir = __dirname + '/../' + dataDir.substring(2);
            }
        }
        dataDir = dataDir.replace(/\\/g, '/');
        if (dataDir[dataDir.length - 1] != '/') dataDir += '/';

        var parts = dataDir.split('/');
        parts.pop();// remove data or iobroker-data
        parts.pop();

        return parts.join('/') + '/backups/';
    }

    this.createBackup = function (name, callback) {
        var count = 0;

        if (!name) {
            var d = new Date();
            name = d.getFullYear() + '_' +
                ('0' + (d.getMonth() + 1)).slice(-2) + '_' +
                ('0' + d.getDate()).slice(-2) + '-' +
                ('0' + d.getHours()).slice(-2) + '_' +
                ('0' + d.getMinutes()).slice(-2) + '_' +
                ('0' + d.getSeconds()).slice(-2) + '_backupIoBroker';
        }

        name = name.replace(/\\/g, '/');
        if (name.indexOf('/') == -1) {
            var path = getBackupDir();

            if (name.indexOf('.tar.gz') == -1) {
                name =  path + name + '.tar.gz';
            } else {
                name =  path + name;
            }
        }

        objects.getObjectList({include_docs: true}, function (err, res) {
            var result = {objects: null, states: {}, config: null};
            if (err) {
                console.log('Cannot get objects: ' + err);
            } else {
                result.objects = res.rows;
            }

            if (fs.existsSync(tools.getConfigFileName())) result.config = JSON.parse(fs.readFileSync(tools.getConfigFileName()));

            states.getKeys('io.*', function (err, keys) {
                /*for (var i = keys.length - 1; i >= 0; i--) {
                 if (keys[i].match(/^messagebox\./) || keys[i].match(/^log\./)) {
                 keys.splice(i, 1);
                 }
                 }*/

                states.getStates(keys, function (err, obj) {
                    var hostname = require('os').hostname();
                    var r = new RegExp('^system\\.host\\.' + hostname + '\\.(\\w+)$');

                    for (var i = 0; i < keys.length; i++) {
                        if (obj[i].from == 'system.host.' + hostname) {
                            obj[i].from = 'system.host.$$__hostname__$$';
                        }
                        if (r.test(keys[i])) {
                            keys[i] = keys[i].replace(hostname, '$$__hostname__$$');
                        }
                        result.states[keys[i]] = obj[i];
                    }

                    if (!fs.existsSync(__dirname + '/../backups'))          fs.mkdirSync(__dirname + '/../backups');
                    if (!fs.existsSync(__dirname + '/../tmp'))              fs.mkdirSync(__dirname + '/../tmp');
                    if (!fs.existsSync(__dirname + '/../tmp/backup'))       fs.mkdirSync(__dirname + '/../tmp/backup');
                    if (!fs.existsSync(__dirname + '/../tmp/backup/files')) fs.mkdirSync(__dirname + '/../tmp/backup/files');

                    // try to find user files
                    for (var j = 0; j < result.objects.length; j++) {
                        //if (result.objects[j].doc) delete result.objects[j].doc;
                        if (result.objects[j].value._id.match(/^system\.adapter\.([\w\d_-]+).(\d+)$/) &&
                            result.objects[j].value.common.host == hostname) {
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
                        } else if (result.objects[j].value._id == 'system.host.' + hostname) {
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
                        if (result.objects[j].value.type == 'meta' &&
                            result.objects[j].value.common &&
                            result.objects[j].value.common.type == 'meta.user') {
                            count++;
                            copyDir(result.objects[j].id, '', __dirname + '/../tmp/backup/files/' + result.objects[j].id, function () {
                                count--;
                                if (!count) {
                                    var TARgz = require('tar.gz');

                                    new TARgz().compress(__dirname + '/../tmp/backup', name, function (err) {
                                        if (err) {
                                            console.log('Cannot pack directory ' +  pathLib.normalize(__dirname + '/../tmp/backup') + ': ' + err);
                                            processExit(9);
                                        }

                                        tools.rmdirRecursiveSync(__dirname + '/../tmp/backup');
                                        if (callback) callback(pathLib.normalize(name));
                                    });
                                }
                            });
                        }
                    }
                    fs.writeFileSync(__dirname + '/../tmp/backup/backup.json', JSON.stringify(result, null, 2));

                    if (!count) {
                        var TARgz = require('tar.gz');

                        new TARgz().compress(__dirname + '/../tmp/backup', name, function (err) {
                            if (err) {
                                console.log('Cannot pack directory ' + pathLib.normalize(__dirname + '/../tmp/backup') + ': ' + err);
                                processExit(9);
                            }

                            tools.rmdirRecursiveSync(__dirname + '/../tmp/backup');
                            if (callback) callback(pathLib.normalize(name));
                        });
                    }

                });
            });

        });
    };

    //--------------------------------------- RESTORE ---------------------------------------------------
    function _setStateHelper(_index, statesList, stateObjects, callback) {
        states.setRawState(statesList[_index], stateObjects[statesList[_index]], function () {
            if ((_index % 200) === 0) console.log('Processed ' + _index + '/' + statesList.length + ' states');
            _index++;
            if (_index < statesList.length) {
                setTimeout(_setStateHelper, 0, _index, statesList, stateObjects, callback);
            } else {
                if (callback) callback();
            }
        });
    }

    function _setObjHelper(_index, _objects, callback) {
        // Disable all adapters.
        if (_objects[_index].id.match(/^system\.adapter\./) && !_objects[_index].id.match(/^system\.adapter\.admin/)) {
            if (_objects[_index].doc.common && _objects[_index].doc.common.enabled) {
                _objects[_index].doc.common.enabled = false;
            }
        }
        if (_objects[_index].doc && _objects[_index].doc._rev) delete _objects[_index].doc._rev;

        objects.setObject(_objects[_index].id, _objects[_index].doc, function (err, obj) {
            if (err) {
                console.log('Cannot restore ' + _objects[_index].id + ': ' + err);
            }

            if ((_index % 200) === 0) console.log('Processed ' + _index + '/' + _objects.length + ' objects');
            _index++;
            if (_index < _objects.length) {
                setTimeout(_setObjHelper, 0, _index, _objects, callback);
            } else {
                if (callback) callback();
            }
        });
    }

    function reloadAdapterObject(index, objectList, callback) {
        if (objectList && index < objectList.length) {
            objects.getObject(objectList[index]._id, function (err, obj) {
                if (err || !obj) {
                    objects.setObject(objectList[index]._id, objectList[index], function () {
                        console.log('object ' + objectList[index]._id + ' created');
                        index++;
                        setTimeout(reloadAdapterObject, 0, index, objectList, callback);
                    });
                } else {
                    index++;
                    setTimeout(reloadAdapterObject, 0, index, objectList, callback);
                }
            });
        } else {
            if (callback) callback();
        }
    }

    function reloadAdaptersObjects(callback, dirs, index) {
        if (!dirs) {
            dirs = fs.readdirSync(__dirname + '/../adapter');
            var _modules = fs.readdirSync(__dirname + '/../node_modules');
            if (_modules) {
                for (var i = 0; i < _modules.length; i++) {
                    if (_modules[i].match(/^iobroker\./i) && dirs.indexOf(_modules[i].substring('iobroker.'.length)) == -1) dirs.push(_modules[i]);
                }
            }
            // if installed as npm
            if (fs.existsSync(__dirname + '/../../../node_modules/iobroker.js-controller')) {
                _modules = fs.readdirSync(__dirname + '/../..');
                for (var j = 0; j < _modules.length; j++) {
                    if (_modules[j].match(/^iobroker\./i &&
                        _modules[j].substring('iobroker.'.length) != 'js-controller') &&
                        dirs.indexOf(_modules[j].substring('iobroker.'.length)) == -1) dirs.push(_modules[j]);
                }
            }
            if (dirs.length) {
                reloadAdaptersObjects(callback, dirs, 0);
            } else {
                if (callback) callback();
            }
        } else {
            if (index < dirs.length) {
                uploadAdapter(dirs[index], false, true, function () {
                    uploadAdapter(dirs[index], true, true, function () {
                        var pkg = null;
                        var adapterDir = tools.getAdapterDir(dirs[index]);
                        if (fs.existsSync(adapterDir + '/io-package.json')) {
                            pkg = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json'));
                        }

                        if (pkg && pkg.objects && pkg.objects.length) {
                            console.log('Setup "' + dirs[index] + '" adapter');
                            reloadAdapterObject(0, pkg.objects, function () {
                                index++;
                                setTimeout(reloadAdaptersObjects, 0, callback, dirs, index);
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
        if (typeof path == 'function') {
            callback = path;
            path = '';
        }

        var count = 0;
        if (!fs.existsSync(root)) {
            callback();
            return;
        }
        var files = fs.readdirSync(root + path);
        for (var i = 0; i < files.length; i++) {
            var stat = fs.statSync(root + path + '/' + files[i]);
            if (stat.isDirectory()) {
                count++;
                uploadUserFiles(root, path + '/' + files[i], function () {
                    if (!(--count)) callback();
                });
            } else {
                var parts = path.split('/');
                var adapter = parts.splice(0, 2);
                adapter = adapter[1];
                var _path = parts.join('/') + '/' + files[i];
                console.log('Upload user file "' + adapter + "/" + _path);
                count++;
                objects.writeFile(adapter, _path, fs.readFileSync(root + path + '/' + files[i]), null, function () {
                    if (!(--count)) callback();
                });
            }
        }
        if (!count) callback();
    }

    function restoreAfterStop(restartOnFinish, callback) {
        // Open file
        var data = fs.readFileSync(__dirname + '/../tmp/backup/backup.json').toString();
        var hostname = require('os').hostname();
        data = data.replace(/\$\$__hostname__\$\$/g, hostname);
        fs.writeFileSync(__dirname + '/../tmp/backup/backup_.json', data);
        var restore = JSON.parse(data);

        // stop all adapters
        console.log('Clear all objects and states...');
        cleanDatabase(false, function () {
            console.log('done.');
            // upload all data into DB
            // restore ioBorker.json
            if (restore.config) fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(restore.config, null, 2));

            var sList = [];
            for (var state in restore.states) {
                sList.push(state);
            }

            _setStateHelper(0, sList, restore.states, function () {
                console.log(sList.length + ' states restored.');
                _setObjHelper(0, restore.objects, function () {
                    console.log(restore.objects.length + ' objects restored.');
                    // Required for upload adapter
                    mime = require('mime');
                    // Load user files into DB
                    uploadUserFiles(__dirname + '/../tmp/backup/files', function () {
                        //  reload objects of adapters
                        reloadAdaptersObjects(function () {
                            // Reload host objects
                            var pckgio = JSON.parse(fs.readFileSync(__dirname + '/../io-package.json'));
                            reloadAdapterObject(0, pckgio ? pckgio.objects : null, function () {
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
    }

    this.listBackups = function () {
        var dir = getBackupDir();
        var result = [];
        if (fs.existsSync(dir)) {
            var files = fs.readdirSync(dir);
            for (var i = 0; i < files.length; i++) {
                if (files[i].match(/\.tar\.gz$/i)) {
                    result.push(files[i]);
                }
            }
            return result;
        } else {
            return result;
        }
    }

    this.restoreBackup = function (name, callback) {
        if (!name && name !== 0) {
            // List all available backups
            console.log('Please specify one of the backup names:');
            var backups = this.listBackups();
            backups.sort(function (a, b) {
                return b > a;
            });
            if (backups.length) {
                for (var t = 0; t < backups.length; t++){
                    console.log('   ' + backups[t] + ' or ' + backups[t].replace('_backupIoBroker.tar.gz', '') + ' or ' + t);
                }
            } else {
                console.log('No backups found');
            }
            processExit(10);
        }

        if (!options.uploadAdapter) throw "Invalid arguments: uploadAdapter is missing";
        if (!options.cleanDatabase) throw "Invalid arguments: cleanDatabase is missing";
        if (!options.restartController) throw "Invalid arguments: restartController is missing";

        if (parseInt(name, 10).toString() == name) {
            var backups = this.listBackups();
            backups.sort(function (a, b) {
                return b > a;
            });
            name = backups[parseInt(name, 10)];
            console.log('Using backup file ' + name);
        }

        name = name.replace(/\\/g, '/');
        if (name.indexOf('/') == -1) {
            name = getBackupDir() + name;
            if (!name.match(/\_backupIoBroker/i)) name += '_backupIoBroker';
            if (!name.match(/\.tar\.gz$/i)) name += '.tar.gz';
        }
        if (!fs.existsSync(name)) {
            console.log('Cannot find ' + name);
            processExit(11);
        }
        var TARgz = require('tar.gz');
        if (fs.existsSync(__dirname + '/../tmp/backup/backup.json')) fs.unlinkSync(__dirname + '/../tmp/backup/backup.json');

        new TARgz().extract(name, __dirname + '/../tmp', function (err) {
            if (err) {
                console.log('Cannot extract from file "' + name + '"');
                processExit(9);
            }
            if (!fs.existsSync(__dirname + '/../tmp/backup/backup.json')) {
                console.log('Cannot find extracted file from file /../tmp/backup/backup.json"');
                processExit(9);
            }
            // Stop controller
            var daemon = require('daemonize2').setup({
                main: '../controller.js',
                name: 'ioBroker controller',
                pidfile: __dirname + '/iobroker.pid',
                cwd: '../',
                stopTimeout: 1000
            });
            daemon.on('error', function (error) {
                restoreAfterStop(false, callback);
            });
            daemon.on('stopped', function () {
                restoreAfterStop(true, callback);
            });
            daemon.on('notrunning', function () {
                console.log('OK.');
                restoreAfterStop(false, callback);
            });
            daemon.stop();
        });
    }
}

module.exports = BackupRestore;
