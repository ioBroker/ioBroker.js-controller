'use strict';

function Setup(options) {
    var fs = require('fs');
    var tools = require(__dirname + '/../tools.js');

    options = options || {};

    var processExit       = options.processExit;
    var dbConnect         = options.dbConnect;
    var params            = options.params;
    var password;
    var objects;

    function mkpathSync(rootpath, dirpath) {
        // Remove filename
        dirpath = dirpath.split('/');
        dirpath.pop();
        if (!dirpath.length) return;

        for (var i = 0; i < dirpath.length; i++) {
            rootpath += dirpath[i] + '/';
            if (!fs.existsSync(rootpath)) {
                if (dirpath[i] !== '..') {
                    fs.mkdirSync(rootpath);
                } else {
                    throw 'Cannot create ' + rootpath + dirpath.join('/');
                }
            }
        }
    }

    function setupReady(callback) {
        if (!callback) {
            console.log('database setup done. you can add adapters and start ' + tools.appName + ' now');
            processExit(0);
        } else {
            callback();
        }
    }

    function dbSetup(iopkg, callback) {
        if (iopkg.objects && iopkg.objects.length > 0) {
            var obj = iopkg.objects.pop();
            objects.getObject(obj._id, function (err, _obj) {
                if (err || !_obj) {
                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = new Date().getTime();
                    objects.setObject(obj._id, obj, function () {
                        console.log('object ' + obj._id + ' created');
                        setTimeout(dbSetup, 25, iopkg, callback);
                    });
                } else {
                    console.log('object ' + obj._id + ' yet exists');
                    setTimeout(dbSetup, 25, iopkg, callback);
                }
            });
        } else {
            tools.createUuid(objects, function () {
                // check if encrypt secret exists
                objects.getObject('system.config', function (err, obj) {
                    if (obj && (!obj.native || !obj.native.secret)) {
                        require('crypto').randomBytes(24, function (ex, buf) {
                            obj.native = obj.native || {};
                            obj.native.secret =  buf.toString('hex');
                            obj.from = 'system.host.' + tools.getHostName() + '.cli';
                            obj.ts = new Date().getTime();
                            objects.setObject('system.config', obj, function () {
                                setupReady(callback);
                            });
                        });
                    } else {
                        setupReady(callback);
                    }
                });
            });
        }
    }

    function setupObjects(callback) {
        dbConnect(params, function (_objects, _states) {
            objects = _objects;
            var iopkg = JSON.parse(fs.readFileSync(__dirname + '/../../io-package.json', 'utf8'));
            dbSetup(iopkg, callback);
        });
    }

    this.setup = function (callback, ignoreIfExist, useRedis) {
        password = require(__dirname + '/../password');

        var config;
        var isCreated = false;
        var platform = require('os').platform();
        var otherInstallDirs = [];

        // Delete files for other OS
        if (platform.match(/^win/)) {
            otherInstallDirs.push(__dirname + '/../../' + tools.appName);
            otherInstallDirs.push(__dirname + '/../../killall.sh');
            otherInstallDirs.push(__dirname + '/../../reinstall.sh');
        } else {
            otherInstallDirs.push(__dirname + '/../../_service_' + tools.appName + '.bat');
            otherInstallDirs.push(__dirname + '/../../' + tools.appName + '.bat');
            // copy scripts to root directory
            if (fs.existsSync(__dirname + '/../../../../node_modules/')) {
                try {
                    if (fs.existsSync(__dirname + '/../../killall.sh')) {
                        fs.writeFileSync(__dirname + '/../../../../killall.sh', fs.readFileSync(__dirname + '/../../killall.sh'));
                    }
                    if (fs.existsSync(__dirname + '/../../reinstall.sh')) {
                        fs.writeFileSync(__dirname + '/../../../../reinstall.sh', fs.readFileSync(__dirname + '/../../reinstall.sh'));
                    }
                    if (fs.existsSync(__dirname + '/../..' + tools.appName)) {
                        fs.writeFileSync(__dirname + '/../../../..' + tools.appName, fs.readFileSync(__dirname + '/../..' + tools.appName));
                    }
                } catch (e) {
                    console.warn('Cannot write file. Not critical: ' + e);
                }
            }
        }

        for (var t = 0; t < otherInstallDirs.length; t++) {
            if (fs.existsSync(otherInstallDirs[t])) {
                var stat = fs.statSync(otherInstallDirs[t]);
                if (stat.isDirectory()) {
                    var files = fs.readdirSync(otherInstallDirs[t]);
                    for (var f = 0; f < files.length; f++) {
                        fs.unlinkSync(otherInstallDirs[t] + '/' + files[f]);
                    }
                    fs.rmdirSync(otherInstallDirs[t]);
                } else {
                    try {
                        fs.unlinkSync(otherInstallDirs[t]);
                    }
                    catch(e) {
                        console.warn('Cannot delete file. Not critical: ' + e);
                    }
                }
            }
        }

        // Create log and tmp directory
        if (!fs.existsSync(__dirname + '/../../tmp')) fs.mkdirSync(__dirname + '/../../tmp');

        if (!fs.existsSync(tools.getConfigFileName())) {
            isCreated = true;
            if (fs.existsSync(__dirname + '/../../conf/' + tools.appName + '-dist.json')) {
                config = require(__dirname + '/../../conf/' + tools.appName + '-dist.json');
            } else {
                config = require(__dirname + '/../../conf/' + tools.appName.toLowerCase() + '-dist.json');
            }
            console.log('creating conf/' + tools.appName + '.json');
            config.objects.host = params.objects || '127.0.0.1';
            config.states.host  = params.states  || '127.0.0.1';
            if (useRedis) {
                config.states.type = 'redis';
                config.states.port = 6379;
            }

            // this path is relative to iobroker.js-controller
            config.dataDir      = tools.getDefaultDataDir();
            if (fs.existsSync(__dirname + '/../../../node_modules/' + tools.appName + '.js-controller')) {
                mkpathSync(__dirname + '/../', config.dataDir);
            } else {
                mkpathSync(__dirname + '/../', '../' + config.dataDir);
            }

            // Create default data dir
            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(config, null, 2));

            try {
                // Create
                if (__dirname.toLowerCase().replace(/\\/g, '/').indexOf('node_modules/' + tools.appName + '.js-controller') !== -1) {
                    var parts = config.dataDir.split('/');
                    // Remove appName-data/
                    parts.pop();
                    parts.pop();
                    var path = parts.join('/');

                    if (!fs.existsSync(__dirname + '/../../' + path + '/log')) fs.mkdirSync(__dirname + '/../../' + path + '/log');
                } else {
                    if (!fs.existsSync(__dirname + '/../../log')) fs.mkdirSync(__dirname + '/../../log');
                }
            } catch (e) {
                console.log('Non-critical error: ' + e.message);
            }
        } else if (ignoreIfExist) {
            if (callback) callback();
            return;
        }
        setupObjects(function () {
            if (callback) callback(isCreated);
        });
    }


}

module.exports = Setup;
