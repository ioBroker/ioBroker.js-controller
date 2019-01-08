'use strict';

function Setup(options) {
    const fs     = require('fs');
    const path   = require('path');
    const tools  = require(__dirname + '/../tools.js');
    const Backup = require('./setupBackup');

    options = options || {};

    const processExit       = options.processExit;
    const dbConnect         = options.dbConnect;
    const params            = options.params;
    const cleanDatabase     = options.cleanDatabase;
    const resetDbConnect    = options.resetDbConnect;
    const restartController = options.restartController;
    let password; // TODO: This is unused
    let objects;

    function mkpathSync(rootpath, dirpath) {
        // Remove filename
        dirpath = dirpath.split('/');
        dirpath.pop();
        if (!dirpath.length) return;

        for (let i = 0; i < dirpath.length; i++) {
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
            const obj = iopkg.objects.pop();
            objects.getObject(obj._id, (err, _obj) => {
                if (err || !_obj) {
                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = Date.now();
                    objects.setObject(obj._id, obj, () => {
                        console.log('object ' + obj._id + ' created');
                        setTimeout(dbSetup, 25, iopkg, callback);
                    });
                } else {
                    console.log('object ' + obj._id + ' yet exists');
                    setTimeout(dbSetup, 25, iopkg, callback);
                }
            });
        } else {
            tools.createUuid(objects, () => {
                // check if encrypt secret exists
                objects.getObject('system.config', (err, obj) => {
                    if (obj && (!obj.native || !obj.native.secret)) {
                        require('crypto').randomBytes(24, (ex, buf) => {
                            obj.native = obj.native || {};
                            obj.native.secret =  buf.toString('hex');
                            obj.from = 'system.host.' + tools.getHostName() + '.cli';
                            obj.ts = Date.now();
                            objects.setObject('system.config', obj, () => setupReady(callback));
                        });
                    } else {
                        setupReady(callback);
                    }
                });
            });
        }
    }

    function setupObjects(callback) {
        dbConnect(params, (_objects, _states) => {
            objects = _objects;
            const iopkg = JSON.parse(fs.readFileSync(__dirname + '/../../io-package.json', 'utf8'));
            dbSetup(iopkg, callback);
        });
    }

    /*function migrateStates(newConfig, oldConfig, rl, callback) {
        if (oldConfig && oldConfig.states.type !== newConfig.states.type) {

            callback();
        } else {
            callback();
        }
    }*/

    function migrateObjects(newConfig, oldConfig, rl, callback) {
        if (oldConfig && (oldConfig.states.type !== newConfig.states.type || oldConfig.objects.type !== newConfig.objects.type)) {
            rl.question(`Do you want to migrate objects and states from "${oldConfig.objects.type}/${oldConfig.states.type}" to "${newConfig.objects.type}/${newConfig.states.type}" [y/N]: `, answer => {
                rl.close();
                if (answer[0] === 'Y' || answer === 'y' || answer[0] === 'J' || answer === 'j') {
                    console.log(`Connecting to previous DB "${oldConfig.objects.type}"...`);
                    dbConnect(params, (objects, states) => {
                        const type = objects.getStatus();
                        if (type.type === 'file' && !type.server) {
                            console.error('\nCannot migrate DB while js-controller is still running');
                            callback(90);
                        }

                        const backup = new Backup({
                            states,
                            objects,
                            cleanDatabase,
                            restartController,
                            processExit: callback
                        });

                        console.log('Creating backup...');
                        backup.createBackup('', true, filePath => {
                            console.log('Backup created: ' + filePath);
                            resetDbConnect();
                            console.log('creating conf/' + tools.appName + '.json');
                            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(newConfig, null, 2));
                            console.log(`Connecting to new DB "${newConfig.objects.type}"...`);
                            dbConnect(Object.assign(params, {timeout: 60000}), (objects, states) => {
                                const backup = new Backup({
                                    states,
                                    objects,
                                    cleanDatabase,
                                    restartController,
                                    processExit: callback
                                });
                                console.log('Restore backup...');
                                backup.restoreBackup(filePath, err => {
                                    console.log('Backup restored!');
                                    callback(err ? 78 : 0);
                                });
                            });
                        });
                    });
                } else {
                    rl.close();
                    console.log('creating conf/' + tools.appName + '.json');
                    fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(newConfig, null, 2));
                    callback();
                }
            });
        } else {
            rl.close();
            console.log('creating conf/' + tools.appName + '.json');
            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(newConfig, null, 2));
            callback();
        }
    }

    this.setupCustom = function (callback) {
        const readline = require('readline');

        let config;
        let originalConfig;
        // read actual configuration
        try {
            if (fs.existsSync(tools.getConfigFileName())) {
                config = JSON.parse(fs.readFileSync(tools.getConfigFileName(), 'utf8'));
                originalConfig = JSON.parse(JSON.stringify(config));
            } else {
                config = require(__dirname + '/../../conf/' + tools.appName + '-dist.json');
            }
        } catch (e) {
            config = require(__dirname + '/../../conf/' + tools.appName + '-dist.json');
        }

        const rl = readline.createInterface({
            input:  process.stdin,
            output: process.stdout
        });

        rl.question('Type of objects DB [(f)ile, (r)edis], default [file]: ', otype => {
            if (!otype) {
                otype = 'file';
            } else {
                otype = otype.toLowerCase();

                if (otype === 'r') otype = 'redis';
                if (otype === 'f') otype = 'file';

                if (otype !== 'file' && otype !== 'redis') {
                    console.log('Unknown objects type: ' + otype);
                    callback(23);
                }
            }
            rl.question('Host / Unix Socket of objects DB(' + otype + '), default[127.0.0.1]: ', ohost => {
                if (!ohost) {
                    ohost = '127.0.0.1';
                } else {
                    ohost = ohost.toLowerCase();
                }
                let op;

                if (otype === 'file') {
                    op = 9001;
                } else if (otype === 'redis') {
                    op = 6379;
                }

                rl.question('Port of objects DB(' + otype + '), default[' + op + ']: ', userPort => {
                    let ot;
                    let oport;
                    if (!userPort) {
                        if (otype === 'file') {
                            oport = 9001;
                            ot = 'file';
                        } else if (otype === 'redis') {
                            ot = 'redis';
                            oport = 6379;
                        }
                    } else {
                        oport = parseInt(userPort, 10);
                        if (isNaN(oport)) {
                            console.log('Invalid objects port: ' + oport);
                            callback(23);
                        }
                    }
                    rl.question('Type of states DB [(f)file, (r)edis], default [' + ot + ']: ', stype => {
                        if (!stype) {
                            stype = ot;
                        } else {
                            stype = stype.toLowerCase();

                            if (stype === 'r') stype = 'redis';
                            if (stype === 'f') stype = 'file';

                            if (stype !== 'file' && stype !== 'redis') {
                                console.log('Unknown states type: ' + stype);
                                callback(23);
                            }
                        }

                        rl.question('Host / Unix Socket of states DB (' + stype + '), default[' + ohost + ']: ', shost => {
                            if (!shost) {
                                shost = ohost;
                            } else {
                                shost = shost.toLowerCase();
                            }
                            let sp;

                            if (stype === 'file') {
                                sp = 9000;
                            } else if (stype === 'redis') {
                                sp = 6379;
                            }

                            rl.question('Port of states DB (' + stype + '), default[' + sp + ']: ', userPort => {
                                let sport;
                                if (!userPort) {
                                    if (stype === 'file') {
                                        sport = 9000;
                                    } else if (stype === 'redis') {
                                        sport = 6379;
                                    }
                                } else {
                                    sport = parseInt(userPort, 10);
                                    if (isNaN(sport)) {
                                        console.log('Invalid states port: ' + sport);
                                        callback(23);
                                    }
                                }
                                if ((stype === 'file' && (shost === 'localhost' || shost === '127.0.0.1')) ||
                                    (otype === 'file' && (ohost === 'localhost' || ohost === '127.0.0.1'))) {
                                    rl.question('Data directory (file), default[../' + tools.getDefaultDataDir() + ']: ', dir => {
                                        if (!dir) dir = tools.getDefaultDataDir();

                                        rl.question('Host name of this machine [' + require('os').hostname() + ']: ', hname => {
                                            if (!hname) {
                                                hname = '';
                                            } else if (hname.match(/\s/)) {
                                                console.log('Invalid host name: ' + hname);
                                                callback(23);
                                            }
                                            config.system          = config.system || {};
                                            config.system.hostname = hname;
                                            config.objects.host    = ohost;
                                            config.objects.type    = otype;
                                            config.objects.port    = oport;
                                            if (config.objects.type === 'file') config.objects.dataDir = dir;
                                            config.states.host     = shost;
                                            config.states.type     = stype;
                                            config.states.port     = sport;
                                            if (config.states.type === 'file') config.states.dataDir = dir;

                                            migrateObjects(config, originalConfig, rl, callback);
                                        });
                                    });
                                } else {
                                    rl.question('Host name of this machine [' + require('os').hostname() + ']: ', hname => {
                                        if (!hname) {
                                            hname = '';
                                        } else if (hname.match(/\s/)) {
                                            console.log('Invalid host name: ' + hname);
                                            callback(23);
                                        }
                                        config.system           = config.system || {};
                                        config.system.hostname  = hname;
                                        config.objects.host     = ohost;
                                        config.objects.type     = otype;
                                        config.objects.port     = oport;
                                        config.states.host      = shost;
                                        config.states.type      = stype;
                                        config.states.port      = sport;
                                        config.states.dataDir   = undefined;
                                        config.objects.dataDir  = undefined;
                                        migrateObjects(config, originalConfig, rl, callback);
                                    });
                                }
                            });
                        });
                    });
                });
            });
        });
    };

    this.setup = function (callback, ignoreIfExist, useRedis) {
        password = require(__dirname + '/../password');

        let config;
        let isCreated = false;
        const platform = require('os').platform();
        const otherInstallDirs = [];

        // copy reinstall.js file into root
        if (fs.existsSync(__dirname + '/../../../../node_modules/')) {
            try {
                if (fs.existsSync(__dirname + '/../../reinstall.js')) {
                    fs.writeFileSync(__dirname + '/../../../../reinstall.js', fs.readFileSync(__dirname + '/../../reinstall.js'));
                }
            } catch (e) {
                console.warn('Cannot write file. Not critical: ' + e);
            }
        }
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
                    if (fs.existsSync(__dirname + '/../../' + tools.appName)) {
                        fs.writeFileSync(__dirname + '/../../../../' + tools.appName, fs.readFileSync(__dirname + '/../../' + tools.appName));
                    }
                    if (fs.existsSync(__dirname + '/../../' + tools.appName.substring(0, 3))) {
                        fs.writeFileSync(__dirname + '/../../../../' + tools.appName.substring(0, 3), fs.readFileSync(__dirname + '/../../' + tools.appName.substring(0, 3)));
                    }
                } catch (e) {
                    console.warn('Cannot write file. Not critical: ' + e);
                }
            }
        }

        for (let t = 0; t < otherInstallDirs.length; t++) {
            if (fs.existsSync(otherInstallDirs[t])) {
                const stat = fs.statSync(otherInstallDirs[t]);
                if (stat.isDirectory()) {
                    const files = fs.readdirSync(otherInstallDirs[t]);
                    for (let f = 0; f < files.length; f++) {
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

            // this path is relative to js-controller
            config.dataDir      = tools.getDefaultDataDir();
            const _path = path.normalize(__dirname + '/../../../node_modules/' + tools.appName + '.js-controller').replace(/\\/g, '/');
            if (fs.existsSync(_path)) {
                if (_path.indexOf('/node_modules/') !== -1) {
                    mkpathSync(__dirname + '/../../', config.dataDir);
                } else {
                    mkpathSync(__dirname + '../../', config.dataDir);
                }
            } else {
                mkpathSync(__dirname + '/../', '../' + config.dataDir);
            }

            // Create default data dir
            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(config, null, 2));

            try {
                // Create
                if (__dirname.toLowerCase().replace(/\\/g, '/').indexOf('node_modules/' + tools.appName + '.js-controller') !== -1) {
                    const parts = config.dataDir.split('/');
                    // Remove appName-data/
                    parts.pop();
                    parts.pop();
                    const path = parts.join('/');

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
        setupObjects(() => callback && callback(isCreated));
    };
}

module.exports = Setup;
