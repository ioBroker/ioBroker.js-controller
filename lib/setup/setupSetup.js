/**
 *      Setup
 *
 *      Copyright 2013-2019 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';

const COLOR_RED = '\x1b[31m';
const COLOR_YELLOW = '\x1b[33m';
const COLOR_RESET = '\x1b[0m';
const COLOR_GREEN = '\x1b[32m';

/** @class */
function Setup(options) {
    const EXIT_CODES = require('../exitCodes');
    const fs         = require('fs');
    const path       = require('path');
    const tools      = require('../tools.js');
    const Backup     = require('./setupBackup');

    options = options || {};

    const processExit       = options.processExit;
    const dbConnect         = options.dbConnect;
    const params            = options.params;
    const cleanDatabase     = options.cleanDatabase;
    const resetDbConnect    = options.resetDbConnect;
    const restartController = options.restartController;
    let objects;

    function mkpathSync(rootpath, dirpath) {
        // Remove filename
        dirpath = dirpath.split('/');
        dirpath.pop();

        if (!dirpath.length) {
            return;
        }

        for (let i = 0; i < dirpath.length; i++) {
            rootpath = path.join(rootpath, dirpath[i]);
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
            console.log('database setup done. You can add adapters and start ' + tools.appName + ' now');
            processExit(EXIT_CODES.NO_ERROR);
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
            if (newConfig.objects.type === 'redis') {
                console.log(COLOR_YELLOW);
                console.log('Important: Using Redis for the Objects database is only supported');
                console.log('with js-controller 2.0 or higher!');
                console.log('When your system consists of multiple hosts please make sure to have');
                console.log('installed js-controller 2.0 or higher on ALL hosts *before* continuing!');
                console.log('');
                console.log('');
                console.log('Important #2: If you already did the migration on an other host');
                console.log('please *do not* migrate again! This can destroy your system!');
                console.log('');
                console.log('');
                console.log('Important #3: The process will migrate all files that were officially');
                console.log('uploaded into the ioBroker system. If you have manually copied files into');
                console.log('iobroker-data/files/... into own directories then these files will NOT be');
                console.log('migrated! Make sure all files are in adapter directories inside the files');
                console.log('directory!');
                console.log(COLOR_RESET);
            }

            const answer = rl.question(`Do you want to migrate objects and states from "${oldConfig.objects.type}/${oldConfig.states.type}" to "${newConfig.objects.type}/${newConfig.states.type}" [y/N]: `, {
                limit: /^[YyNnJj]?$/,
                defaultInput: 'N'
            });
            if (answer === 'Y' || answer === 'y' || answer === 'J' || answer === 'j') {
                console.log(`Connecting to previous DB "${oldConfig.objects.type}"...`);
                dbConnect(params, (objects, states) => {
                    const type = objects.getStatus();
                    if (type.type === 'file' && !type.server) {
                        console.error(COLOR_RED);
                        console.error('Cannot migrate DB while js-controller is still running!');
                        console.error('Please stop iobroker and try again. No settings have been changed.' + COLOR_RESET);
                        callback(90);
                    }

                    const backup = new Backup({
                        states,
                        objects,
                        cleanDatabase,
                        restartController,
                        processExit: callback
                    });

                    console.log('Creating backup ...');
                    console.log(COLOR_GREEN + 'This can take some time ... please be patient!' + COLOR_RESET);
                    backup.createBackup('', true, filePath => {
                        console.log('Backup created: ' + filePath);
                        resetDbConnect();
                        console.log('updating conf/' + tools.appName + '.json');
                        fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(newConfig, null, 2));
                        console.log('');
                        console.log(`Connecting to new DB "${newConfig.objects.type}" ...`);
                        dbConnect(Object.assign(params, {timeout: 60000}), (objects, states) => {
                            const backup = new Backup({
                                states,
                                objects,
                                cleanDatabase,
                                restartController,
                                processExit: callback,
                                dbMigration: true
                            });
                            console.log('Restore backup ...');
                            console.log(COLOR_GREEN + 'This can take some time ... please be patient!' + COLOR_RESET);
                            backup.restoreBackup(filePath, err => {
                                console.log('Backup restored!');
                                if (!err) {
                                    console.log(COLOR_YELLOW);
                                    console.log('Important: If your system consists of multiple hosts please execute ');
                                    console.log('"iobroker upload all" on all other hosts/slaves before you continue!' + COLOR_RESET);
                                }
                                callback(err ? 78 : 0);
                            });
                        });
                    });
                });
                return;
            } else if (newConfig.objects.type === 'redis') {
                console.log('');
                console.log('No Database migration was done.');
                console.log(COLOR_YELLOW + 'If this was don on your master host please execute "iobroker setup first" to newly initialize all objects.' + COLOR_RESET);
                console.log('');
            }
        }
        console.log('updating conf/' + tools.appName + '.json');
        fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(newConfig, null, 2));
        callback();
    }

    this.setupCustom = function (callback) {
        const rl = require('readline-sync');

        let config;
        let originalConfig;
        // read actual configuration
        try {
            if (fs.existsSync(tools.getConfigFileName())) {
                config = JSON.parse(fs.readFileSync(tools.getConfigFileName(), 'utf8'));
                originalConfig = JSON.parse(JSON.stringify(config));
            } else {
                config = require('../../conf/' + tools.appName + '-dist.json');
            }
        } catch (e) {
            config = require('../../conf/' + tools.appName + '-dist.json');
        }

        const currentObjectsType = originalConfig.objects.type || 'file';
        const currentStatesType = originalConfig.states.type || 'file';
        console.log('Current configuration:');
        console.log('- Objects database:');
        console.log('  - Type: ' + originalConfig.objects.type);
        console.log('  - Host/Unix Socket: ' + originalConfig.objects.host);
        console.log('  - Port: ' + originalConfig.objects.port);
        console.log('- States database:');
        console.log('  - Type: ' + originalConfig.states.type);
        console.log('  - Host/Unix Socket: ' + originalConfig.states.host);
        console.log('  - Port: ' + originalConfig.states.port);
        if (originalConfig.objects.type === 'file' || originalConfig.states.type === 'file') {
            console.log('- Data Directory: ' + tools.getDefaultDataDir());
        }
        if (originalConfig && originalConfig.system && originalConfig.system.hostname) {
            console.log('- Host name: ' + originalConfig.system.hostname);
        }
        console.log('');

        let otype = rl.question('Type of objects DB [(f)ile, (r)edis], default [' + currentObjectsType + ']: ', {
            defaultInput: currentObjectsType
        });
        otype = otype.toLowerCase();

        if (otype === 'r') {
            otype = 'redis';
        } else if (otype === 'f') {
            otype = 'file';
        }

        if (otype !== 'file' && otype !== 'redis') {
            console.log(COLOR_RED + 'Unknown objects type: ' + otype + COLOR_RESET);
            callback(23);
        }

        if (otype === 'redis' && originalConfig.objects.type !== 'redis') {
            console.log(COLOR_YELLOW);
            console.log('When Objects and Files are stored in a Redis database please consider the following:');
            console.log('1. All data will be stored in RAM, make sure to have enough free RAM available!');
            console.log('2. Make sure to check Redis persistence options to make sure a Redis problem will not cause data loss!');
            console.log('3. The Redis persistence files can get big, make sure not to use an SD card to store them.');
            console.log(COLOR_RESET);
        }

        const defaultObjectsHost = (otype === originalConfig.objects.type) ? originalConfig.objects.host : '127.0.0.1';
        let ohost = rl.question('Host / Unix Socket of objects DB(' + otype + '), default[' + (Array.isArray(defaultObjectsHost) ? defaultObjectsHost.join(',') : defaultObjectsHost) + ']: ', {
            defaultInput: Array.isArray(defaultObjectsHost) ? defaultObjectsHost.join(',') : defaultObjectsHost
        });
        ohost = ohost.toLowerCase();
        let op;

        if (otype === 'file') {
            op = 9001;
        } else if (otype === 'redis') {
            op = 6379;
            if (ohost.includes(',')) {
                ohost = ohost.split(',');
                ohost.forEach((host, idx) => {
                    ohost[idx] = host.trim();
                });
                op = 26379;
            }
        }

        const defaultObjectsPort = (otype === originalConfig.objects.type && ohost === originalConfig.objects.host) ? originalConfig.objects.port : op;
        const userObjPort = rl.question('Port of objects DB(' + otype + '), default[' + (Array.isArray(defaultObjectsPort) ? defaultObjectsPort.join(',') : defaultObjectsPort) + ']: ', {
            defaultInput: Array.isArray(defaultObjectsPort) ? defaultObjectsPort.join(',') : defaultObjectsPort,
            limit: /^[0-9, ]+$/
        });
        let oport;
        if (userObjPort.includes(',')) {
            oport = userObjPort.split(',');
            oport.forEach((port, idx) => {
                oport[idx] = parseInt(port.trim(), 10);
                if (isNaN(oport[idx])) {
                    console.log(COLOR_RED + 'Invalid objects port: ' + oport[idx] + COLOR_RESET);
                    callback(23);
                }
            });
        } else {
            oport = parseInt(userObjPort, 10);
            if (isNaN(oport)) {
                console.log(COLOR_RED + 'Invalid objects port: ' + oport + COLOR_RESET);
                callback(23);
            }
        }

        const defaultStatesType = (otype === 'redis') ? 'redis' : currentStatesType;
        let stype = rl.question('Type of states DB [(f)file, (r)edis], default [' + defaultStatesType + ']: ', {
            defaultInput: defaultStatesType
        });
        stype = stype.toLowerCase();

        if (stype === 'r') {
            stype = 'redis';
        } else if (stype === 'f') {
            stype = 'file';
        }

        if (stype !== 'file' && stype !== 'redis') {
            console.log(COLOR_RED + 'Unknown states type: ' + stype + COLOR_RESET);
            callback(23);
        }

        if (stype === 'redis' && originalConfig.states.type !== 'redis' && otype !== 'redis') {
            console.log(COLOR_YELLOW);
            console.log('When States are stored in a Redis database please make sure to configure Redis');
            console.log('persistence to make sure a Redis problem will not cause data loss!');
            console.log(COLOR_RESET);
        }

        let defaultStatesHost = (stype === originalConfig.states.type) ? originalConfig.states.host : '127.0.0.1';
        if (stype === otype) defaultStatesHost = ohost;
        let shost = rl.question('Host / Unix Socket of states DB (' + stype + '), default[' + (Array.isArray(defaultStatesHost) ? defaultStatesHost.join(',') : defaultStatesHost) + ']: ', {
            defaultInput: Array.isArray(defaultStatesHost) ? defaultStatesHost.join(',') : defaultStatesHost
        });
        shost = shost.toLowerCase();

        let sp;

        if (stype === 'file') {
            sp = 9000;
        } else if (stype === 'redis') {
            sp = 6379;
            if (shost.includes(',')) {
                shost = shost.split(',').map(host => host.trim());
                sp = 26379;
            }
        }

        let defaultStatesPort = (stype === originalConfig.states.type && shost === originalConfig.states.host) ? originalConfig.states.port : sp;
        if (stype === otype && stype !== 'file' && shost === ohost) defaultStatesPort = oport;
        const userStatePort = rl.question('Port of states DB (' + stype + '), default[' + (Array.isArray(defaultStatesPort) ? defaultStatesPort.join(',') : defaultStatesPort) + ']: ', {
            defaultInput: Array.isArray(defaultStatesPort) ? defaultStatesPort.join(',') : defaultStatesPort,
            limit: /^[0-9, ]+$/
        });
        let sport;
        if (userStatePort.includes(',')) {
            sport = userStatePort.split(',');
            sport.forEach((port, idx) => {
                sport[idx] = parseInt(port.trim(), 10);
                if (isNaN(sport[idx])) {
                    console.log(COLOR_RED + 'Invalid states port: ' + sport[idx] + COLOR_RESET);
                    callback(23);
                }
            });
        } else {
            sport = parseInt(userStatePort, 10);
            if (isNaN(sport)) {
                console.log(COLOR_RED + 'Invalid states port: ' + sport + COLOR_RESET);
                callback(23);
            }
        }

        let dir;
        let hname;

        if ((stype === 'file' && (shost === 'localhost' || shost === '127.0.0.1')) ||
            (otype === 'file' && (ohost === 'localhost' || ohost === '127.0.0.1'))) {
            dir = rl.question('Data directory (file), default[' + tools.getDefaultDataDir() + ']: ', {
                defaultInput: tools.getDefaultDataDir()
            });

            hname = rl.question('Host name of this machine [' + (originalConfig && originalConfig.system ? originalConfig.system.hostname || require('os').hostname() : require('os').hostname()) + ']: ', {
                defaultInput: (originalConfig && originalConfig.system && originalConfig.system.hostname) || ''
            });
        } else {
            hname = rl.question('Host name of this machine [' + require('os').hostname() + ']: ', {
                defaultInput: ''
            });
        }

        if (hname.match(/\s/)) {
            console.log(COLOR_RED + 'Invalid host name: ' + hname + COLOR_RESET);
            callback(23);
        }

        config.system          = config.system || {};
        config.system.hostname = hname;
        config.objects.host    = ohost;
        config.objects.type    = otype;
        config.objects.port    = oport;
        config.states.host     = shost;
        config.states.type     = stype;
        config.states.port     = sport;
        config.states.dataDir   = undefined;
        config.objects.dataDir  = undefined;
        if (dir && config.objects.type === 'file') config.objects.dataDir = dir;
        if (dir && config.states.type === 'file') config.states.dataDir = dir;

        migrateObjects(config, originalConfig, rl, callback);
    };

    this.setup = function (callback, ignoreIfExist, useRedis) {
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
            otherInstallDirs.push(__dirname + '/../../' + tools.appName.substring(0, 3));
            otherInstallDirs.push(__dirname + '/../../killall.sh');
            otherInstallDirs.push(__dirname + '/../../reinstall.sh');
        } else {
            otherInstallDirs.push(__dirname + '/../../_service_' + tools.appName + '.bat');
            otherInstallDirs.push(__dirname + '/../../' + tools.appName + '.bat');
            otherInstallDirs.push(__dirname + '/../../' + tools.appName.substring(0, 3) + '.bat');
            // copy scripts to root directory
            if (fs.existsSync(__dirname + '/../../../../node_modules/')) {
                const startFile = `#!/usr/bin/env node
require('${path.normalize(__dirname + '/..')}/setup').execute();`;

                try {
                    if (fs.existsSync(__dirname + '/../../killall.sh')) {
                        fs.writeFileSync(__dirname + '/../../../../killall.sh', fs.readFileSync(__dirname + '/../../killall.sh'), {mode: 492 /* 0754 */});
                    }
                    if (fs.existsSync(__dirname + '/../../reinstall.sh')) {
                        fs.writeFileSync(__dirname + '/../../../../reinstall.sh', fs.readFileSync(__dirname + '/../../reinstall.sh'), {mode: 492 /* 0754 */});
                    }
                    if (!fs.existsSync(__dirname + '/../../../../' + tools.appName.substring(0, 3))) {
                        fs.writeFileSync(__dirname + '/../../../../' + tools.appName.substring(0, 3), startFile, {mode: 492 /* 0754 */});
                    }
                    if (!fs.existsSync(__dirname + '/../../../../' + tools.appName)) {
                        fs.writeFileSync(__dirname + '/../../../../' + tools.appName, startFile, {mode: 492 /* 0754 */});
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
                config = require(`../../conf/${tools.appName}-dist.json`);
            } else {
                config = require(`../../conf/${tools.appName.toLowerCase()}-dist.json`);
            }
            console.log('creating conf/' + tools.appName + '.json');
            config.objects.host = params.objects || '127.0.0.1';
            config.states.host  = params.states  || '127.0.0.1';
            if (useRedis) {
                config.states.type = 'redis';
                config.states.port = 6379;
            }

            // this path is relative to js-controller
            config.dataDir = tools.getDefaultDataDir();
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

            const configFile = tools.getConfigFileName();
            const dirName = path.dirname(configFile);
            if (!fs.existsSync(dirName)) {
                mkpathSync('', dirName.replace(/\\/g, '/'));
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
                    const path_ = parts.join('/');

                    if (!fs.existsSync(__dirname + '/../../' + path_ + '/log')) {
                        fs.mkdirSync(__dirname + '/../../' + path_ + '/log');
                    }
                } else {
                    if (!fs.existsSync(__dirname + '/../../log')) {
                        fs.mkdirSync(__dirname + '/../../log');
                    }
                }
            } catch (e) {
                console.log('Non-critical error: ' + e.message);
            }
        } else if (ignoreIfExist) {
            callback && callback();
            return;
        }
        setupObjects(() => callback && callback(isCreated));
    };
}

module.exports = Setup;
