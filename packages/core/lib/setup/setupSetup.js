/**
 *      Setup
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';

const COLOR_RED    = '\x1b[31m';
const COLOR_YELLOW = '\x1b[33m';
const COLOR_RESET  = '\x1b[0m';
const COLOR_GREEN  = '\x1b[32m';

/** @class */
function Setup(options) {
    const EXIT_CODES  = require('../exitCodes');
    const fs          = require('fs-extra');
    const path        = require('path');
    const tools       = require('../tools.js');
    const Backup      = require('./setupBackup');
    const deepClone   = require('deep-clone');
    const pluginInfos = require('./pluginInfos');

    options = options || {};

    const processExit       = options.processExit;
    const dbConnect         = options.dbConnect;
    const params            = options.params;
    const cleanDatabase     = options.cleanDatabase;
    const resetDbConnect    = options.resetDbConnect;
    const restartController = options.restartController;
    let objects;
    let states;

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
                    throw new Error(`Cannot create ${rootpath}${dirpath.join('/')}`);
                }
            }
        }
    }

    async function informAboutPlugins(systemConfig, callback) {
        let ioPackage;
        let ioConfig;

        const configFile = tools.getConfigFileName();
        try {
            ioPackage = JSON.parse(fs.readFileSync(path.join(__dirname, '../../io-package.json'), 'utf8'));
        } catch {
            console.error('Cannot read js-controller io-package.json. Ignore plugins defined there.');
        }
        try {
            ioConfig = JSON.parse(fs.readFileSync(configFile, 'utf8'));
        } catch {
            console.error('Can not read js-controller config file. Ignore plugins defined there.');
        }

        const plugins = {};
        if (ioPackage && ioPackage.common && ioPackage.common.plugins) {
            for (const [plugin, pluginData] of Object.entries(ioPackage.common.plugins)) {
                if (pluginData.enabled !== false) {
                    plugins[plugin] = pluginData;
                }
            }
        }
        if (ioConfig && ioConfig.plugins) {
            for (const [plugin, pluginData] of Object.entries(ioConfig.plugins)) {
                if (!plugins[plugin] && pluginData.enabled !== false) {
                    plugins[plugin] = pluginData;
                }
            }
        }

        let systemLang = 'en';
        let systemDiag = 'extended';
        if (systemConfig && systemConfig.common) {
            systemDiag = systemConfig.common.diag || 'extended';
            systemLang = systemConfig.common.language || 'en';
        }

        for (const plugin of Object.keys(plugins)) {
            const pluginInfo = pluginInfos.PLUGIN_INFOS[plugin];
            if (!pluginInfo) {
                // We do not have relevant information to display
                continue;
            }
            if (systemDiag === 'none' && pluginInfos.isReportingPlugin(plugin)) {
                // Reporting plugins respect "diag" and do not send information if diag is disabled
                continue;
            }

            let enabledState;
            try {
                enabledState = await states.getStateAsync(`system.host.${tools.getHostName()}.plugins.${plugin}.enabled`);
            } catch {
                // ignore
            }
            if (enabledState && enabledState.val !== undefined) {
                // already configured, so do not output again
                continue;
            }

            const infoHeadLine = pluginInfo.headline[systemLang] || pluginInfo.headline.en;
            const infoText = pluginInfo.text[systemLang] || pluginInfo.text.en;

            console.error(COLOR_RED);
            console.error(infoHeadLine);
            console.error(COLOR_YELLOW);
            console.error(infoText);
            console.error();
            console.error(COLOR_RESET);
        }
        callback();
    }

    async function setupReady(systemConfig, callback) {
        if (!callback) {
            console.log('database setup done. You can add adapters and start ' + tools.appName + ' now');
            processExit(EXIT_CODES.NO_ERROR);
        } else {
            if (!objects.syncFileDirectory || !objects.dirExists) {
                return void informAboutPlugins(systemConfig, callback);
            }
            // check meta.user
            try {
                const objExists = await objects.objectExists('meta.user');
                if (objExists) {
                    // check if dir is missing
                    const dirExists = objects.dirExists('meta.user');
                    if (!dirExists) {
                        // create meta.user, so users see them as upload target
                        await objects.mkdirAsync('meta.user');
                        console.log('Successfully created "meta.user" directory');
                    }
                }
            } catch (e) {
                console.warn(`Could not create directory "meta.user": ${e.message}`);
            }

            try {
                const {numberSuccess, notifications} = objects.syncFileDirectory();
                numberSuccess && console.log(numberSuccess + ' file(s) successfully synchronized with ioBroker storage.\nPlease DO NOT copy files manually into ioBroker storage directories!');
                if (notifications.length) {
                    console.log();
                    console.log('The following notifications happened during sync: ');
                    notifications.forEach(el => console.log('- ' + el));
                    console.log();
                }
                return void informAboutPlugins(systemConfig, callback);
            } catch (err) {
                console.error('Error on file directory sync: ' + err.message);
                return void informAboutPlugins(systemConfig, callback);
            }
        }
    }

    function dbSetup(iopkg, ignoreExisting, callback) {
        if (typeof ignoreExisting === 'function') {
            callback = ignoreExisting;
            ignoreExisting = false;
        }

        if (iopkg.objects && iopkg.objects.length > 0) {
            const obj = iopkg.objects.pop();
            objects.getObject(obj._id, (err, _obj) => {
                if (err || !_obj || obj._id.startsWith('_design/')) {
                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = Date.now();
                    objects.setObject(obj._id, obj, () => {
                        console.log(`object ${obj._id} ${(err || !_obj) ? 'created' : 'updated'}`);
                        setTimeout(dbSetup, 25, iopkg, ignoreExisting, callback);
                    });
                } else {
                    !ignoreExisting && console.log('object ' + obj._id + ' yet exists');
                    setTimeout(dbSetup, 25, iopkg, ignoreExisting, callback);
                }
            });
        } else {
            tools.createUuid(objects, () => {
                // check if encrypt secret exists
                objects.getObject('system.config', (err, obj) => {
                    let configFixed = false;
                    if (obj && obj.type !== 'config') {
                        obj.type = 'config';
                        obj.from = 'system.host.' + tools.getHostName() + '.cli';
                        obj.ts = Date.now();
                        configFixed = true;
                    }
                    if (obj && (!obj.native || !obj.native.secret)) {
                        require('crypto').randomBytes(24, (ex, buf) => {
                            obj.native = obj.native || {};
                            obj.native.secret =  buf.toString('hex');
                            obj.from = 'system.host.' + tools.getHostName() + '.cli';
                            obj.ts = Date.now();
                            objects.setObject('system.config', obj, () => setupReady(obj, callback));
                        });
                    } else {
                        if (configFixed) {
                            objects.setObject('system.config', obj, () => setupReady(obj, callback));
                        } else {
                            setupReady(obj, callback);
                        }
                    }
                });
            });
        }
    }

    function setupObjects(callback, checkCertificateOnly) {
        dbConnect(params, (_objects, _states) => {
            objects = _objects;
            states = _states;
            const iopkg = fs.readJSONSync(`${__dirname}/../../io-package.json`);
            if (checkCertificateOnly) {
                let certObj;
                if (iopkg && iopkg.objects) {
                    for (let i = 0; i < iopkg.objects.length; i++) {
                        if (iopkg.objects[i] && iopkg.objects[i]._id === 'system.certificates') {
                            certObj = iopkg.objects[i];
                            break;
                        }
                    }
                }
                if (certObj) {
                    objects.getObject('system.certificates', (err, obj) => {
                        if (obj && obj.native && obj.native.certificates && obj.native.certificates.defaultPublic !== undefined) {
                            let cert = tools.getCertificateInfo(obj.native.certificates.defaultPublic);
                            if (cert) {
                                const dateCertStart = Date.parse(cert.validityNotBefore);
                                const dateCertEnd = Date.parse(cert.validityNotAfter);
                                // check, if certificate is invalid (too old, longer then 825 days or keylength too short)
                                if (dateCertEnd <= Date.now() || cert.keyLength < 2048 || (dateCertEnd - dateCertStart) > 365 * 24 * 60 * 60 * 1000) {
                                    // generate new certificates
                                    if (cert.certificateFilename) {
                                        console.log(`Existing file certificate (${cert.certificateFilename}) is invalid (too old, validity longer then 345 days or keylength too short). Please check it!`);
                                    } else {
                                        console.log('Existing earlier generated certificate is invalid (too old, validity longer then 345 days or keylength too short). Generating new Certificate!');
                                        cert = null;
                                    }
                                }
                            }
                            if (!cert) {
                                const newCert = tools.generateDefaultCertificates();

                                obj.native.certificates.defaultPrivate = newCert.defaultPrivate;
                                obj.native.certificates.defaultPublic = newCert.defaultPublic;

                                objects.setObject(obj._id, obj, err => {
                                    !err && console.log(`object ${obj._id} updated`);
                                    dbSetup(iopkg, true, callback);
                                });
                                return;
                            }
                        }
                        dbSetup(iopkg, true, callback);
                    });
                } else {
                    dbSetup(iopkg,true, callback);
                }
            } else {
                dbSetup(iopkg, callback);
            }
        });
    }

    /*function migrateStates(newConfig, oldConfig, rl, callback) {
        if (oldConfig && oldConfig.states.type !== newConfig.states.type) {

            callback();
        } else {
            callback();
        }
    }*/

    /**
     * Asks the user if he wants to migrate objects if it makes sense and performs migration according to input
     *
     * @param {object} newConfig - updated config
     * @param {object} oldConfig - previous config
     * @param {import("readline").ReadLine} rl - readline object
     * @param {function(number=):void} callback - callback function
     */
    function migrateObjects(newConfig, oldConfig, rl, callback) {
        // allow migration if one of the db types changed or host changed of redis
        const oldStatesHasServer = tools.statesDbHasServer(oldConfig.states.type);
        const oldObjectsHasServer = tools.statesDbHasServer(oldConfig.objects.type);
        const newStatesHasServer = tools.statesDbHasServer(newConfig.states.type);
        const newObjectsHasServer = tools.statesDbHasServer(newConfig.objects.type);

        const oldStatesLocalServer = tools.isLocalStatesDbServer(oldConfig.states.type, oldConfig.states.host);
        const oldObjectsLocalServer = tools.isLocalObjectsDbServer(oldConfig.objects.type, oldConfig.objects.host);
        const newStatesLocalServer = tools.isLocalStatesDbServer(newConfig.states.type, newConfig.states.host);
        const newObjectsLocalServer = tools.isLocalObjectsDbServer(newConfig.objects.type, newConfig.objects.host);
        if (oldConfig &&
            (
                (oldConfig.states.type !== newConfig.states.type || oldConfig.objects.type !== newConfig.objects.type) ||
                (!oldStatesHasServer && oldConfig.states.host !== newConfig.states.host) ||
                (!oldObjectsHasServer && oldConfig.objects.host !== newConfig.objects.host)
            )
        ) {
            let fromMaster =  oldStatesLocalServer || oldObjectsLocalServer;

            let toMaster = newStatesLocalServer || newObjectsLocalServer;

            if (!oldStatesHasServer && !oldObjectsHasServer) {
                fromMaster = null; // Master can not be detected, check new
            }
            if (!newStatesHasServer && !newObjectsHasServer) {
                toMaster = null; // new
            }

            let allowMigration;
            if (fromMaster) {
                if (!toMaster) {
                    const answer = rl.question(`Please choose if this is a Master/single host (enter "m") or a Slave host (enter "S") you are about to edit. For Slave hosts the data migration will be skipped. [S/m]: `, {
                        limit: /^[SsMm]?$/,
                        defaultInput: 'S'
                    });
                    allowMigration = !(answer === 'S' || answer === 's');
                } else {
                    const answer = rl.question(`This host appears to be a Master or a Single host system. Is this correct? [Y/n]: `, {
                        limit: /^[YyNnJj]?$/,
                        defaultInput: 'Y'
                    });
                    allowMigration = answer === 'Y' || answer === 'y' || answer === 'J' || answer === 'j';
                }
            } else {
                if (toMaster) {
                    const answer = rl.question(`It appears that you want to convert this slave host into a Master or Single host system. Is this correct? [Y/n]: `, {
                        limit: /^[YyNnJj]?$/,
                        defaultInput: 'Y'
                    });
                    allowMigration = answer === 'Y' || answer === 'y' || answer === 'J' || answer === 'j';
                } else {
                    const answer = rl.question(`This host appears to be an ioBroker SLAVE system. Migration will be skipped. Is this correct? [Y/n]: `, {
                        limit: /^[YyNnJj]?$/,
                        defaultInput: 'Y'
                    });
                    allowMigration = !(answer === 'Y' || answer === 'y' || answer === 'J' || answer === 'j');
                }
            }

            if (oldObjectsHasServer && !newObjectsHasServer) {
                console.log(COLOR_YELLOW);
                console.log(`Important: Using ${newConfig.objects.type} for the Objects database is only supported`);
                console.log('with js-controller 2.0 or higher!');
                console.log('When your system consists of multiple hosts please make sure to have');
                console.log('js-controller 2.0 or higher installed on ALL hosts *before* continuing!');
                if (allowMigration) {
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
                }
                console.log(COLOR_RESET);
            }

            let answer = 'N';
            if (allowMigration) {
                console.log();
                answer = rl.question(`Do you want to migrate objects and states from "${oldConfig.objects.type}/${oldConfig.states.type}" to "${newConfig.objects.type}/${newConfig.states.type}" [y/N]: `, {
                    limit: /^[YyNnJj]?$/,
                    defaultInput: 'N'
                });

                if (newConfig.objects.type !== oldConfig.objects.type && (answer === 'Y' || answer === 'y' || answer === 'J' || answer === 'j')) {
                    console.log(COLOR_YELLOW);
                    answer = rl.question(`Migrating the objects database will overwrite all objects! Are you sure that this is not a slave host and you want to migrate the data? [y/N]: `, {
                        limit: /^[YyNnJj]?$/,
                        defaultInput: 'N'
                    });
                    console.log(COLOR_RESET);
                }
            }

            if (answer === 'Y' || answer === 'y' || answer === 'J' || answer === 'j') {
                console.log(`Connecting to previous DB "${oldConfig.objects.type}"...`);

                dbConnect(params, (objects, states, isOffline) => {
                    if (!isOffline) {
                        console.error(COLOR_RED);
                        console.error('Cannot migrate DB while js-controller is still running!');
                        console.error('Please stop ioBroker and try again. No settings have been changed.' + COLOR_RESET);
                        return void callback(90);
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

                    backup.createBackup('', true, async filePath => {
                        const origBackupPath = filePath;
                        filePath = filePath.replace('.tar.gz', '-migration.tar.gz');
                        try {
                            fs.renameSync(origBackupPath, filePath);
                        } catch {
                            filePath = origBackupPath;
                            console.log('[Not Critical Error] Could not rename Backup file');
                        }

                        console.log('Backup created: ' + filePath);
                        await resetDbConnect();

                        console.log('updating conf/' + tools.appName + '.json');
                        fs.writeFileSync(tools.getConfigFileName() + '.bak', JSON.stringify(oldConfig, null, 2));
                        fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(newConfig, null, 2));

                        console.log('');
                        console.log(`Connecting to new DB "${newConfig.objects.type}" (can take up to 20s) ...`);

                        dbConnect(true, Object.assign(params, {timeout: 20000}), (objects, states) => {
                            if (!states || !objects) {
                                console.error(COLOR_RED);
                                console.log('New Database could not be connected. Please check your settings. No settings have been changed.' + COLOR_RESET);

                                console.log('restoring conf/' + tools.appName + '.json');
                                fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(oldConfig, null, 2));
                                fs.unlinkSync(tools.getConfigFileName() + '.bak');

                                return void callback(78);
                            }
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
                                if (err) {
                                    console.log('Error happened during restore: ' + err);
                                    console.log();
                                    console.log('restoring conf/' + tools.appName + '.json');
                                    fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(oldConfig, null, 2));
                                    fs.unlinkSync(tools.getConfigFileName() + '.bak');
                                } else {
                                    console.log('Backup restored - Migration successful');

                                    console.log(COLOR_YELLOW);
                                    console.log('Important: If your system consists of multiple hosts please execute ');
                                    console.log('"iobroker upload all" on the master AFTER all other hosts/slaves have ');
                                    console.log('also been updated to this states/objects database configuration AND are');
                                    console.log('running!' + COLOR_RESET);

                                    fs.unlinkSync(tools.getConfigFileName() + '.bak');
                                }

                                callback(err ? 78 : 0);
                            });
                        });
                    });
                });
                return;
            } else if (!newObjectsHasServer) {
                console.log('');
                console.log('No Database migration was done.');
                console.log(COLOR_YELLOW + 'If this was done on your master host please execute "iobroker setup first" to newly initialize all objects.' + COLOR_RESET);
                console.log('');
            }
        }
        console.log('updating conf/' + tools.appName + '.json');
        fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(newConfig, null, 2));
        callback();
    }

    this.setupCustom = callback => {
        const rl = require('readline-sync');

        let config;
        let originalConfig;
        // read actual configuration
        try {
            if (fs.existsSync(tools.getConfigFileName())) {
                config = fs.readJSONSync(tools.getConfigFileName());
                originalConfig = deepClone(config);
            } else {
                config = require('../../conf/' + tools.appName + '-dist.json');
            }
        } catch {
            config = require('../../conf/' + tools.appName + '-dist.json');
        }

        const currentObjectsType = originalConfig.objects.type || 'file';
        const currentStatesType = originalConfig.states.type || 'file';
        console.log('Current configuration:');
        console.log('- Objects database:');
        console.log('  - Type: ' + originalConfig.objects.type);
        console.log('  - Host/Unix Socket: ' + originalConfig.objects.host);
        console.log('  - Port: ' + originalConfig.objects.port);
        if (Array.isArray(originalConfig.objects.host)) {
            console.log('  - Sentinel-Master-Name: ' + (originalConfig.objects.sentinelName ? originalConfig.objects.sentinelName : 'mymaster'));
        }
        console.log('- States database:');
        console.log('  - Type: ' + originalConfig.states.type);
        console.log('  - Host/Unix Socket: ' + originalConfig.states.host);
        console.log('  - Port: ' + originalConfig.states.port);
        if (Array.isArray(originalConfig.states.host)) {
            console.log('  - Sentinel-Master-Name: ' + (originalConfig.states.sentinelName ? originalConfig.states.sentinelName : 'mymaster'));
        }
        if (tools.objectsDbHasServer(originalConfig.objects.type) || tools.statesDbHasServer(originalConfig.states.type)) {
            console.log('- Data Directory: ' + tools.getDefaultDataDir());
        }
        if (originalConfig && originalConfig.system && originalConfig.system.hostname) {
            console.log('- Host name: ' + originalConfig.system.hostname);
        }
        console.log('');

        let otype = rl.question('Type of objects DB [(f)ile, (r)edis, ...], default [' + currentObjectsType + ']: ', {
            defaultInput: currentObjectsType
        });
        otype = otype.toLowerCase();

        if (otype === 'r') {
            otype = 'redis';
        } else if (otype === 'f') {
            otype = 'file';
        }

        let getDefaultObjectsPort;
        try {
            const path = require.resolve(`@iobroker/db-objects-${otype}`);
            getDefaultObjectsPort = require(path).getDefaultPort;
        } catch {
            console.log(COLOR_RED + 'Unknown objects type: ' + otype + COLOR_RESET);
            if (otype !== 'file' && otype !== 'redis') {
                console.log(COLOR_YELLOW);
                console.log(`Please check that the objects db type you entered is really correct!`);
                console.log(`If yes please use "npm i @iobroker/db-objects-${otype}" to install it manually.`);
                console.log(`You also need to make sure you stay up to date with this package in the future!`);
                console.log(COLOR_RESET);
            }
            return void callback(23);
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

        const op = getDefaultObjectsPort(ohost);
        const oSentinel = otype === 'redis' && ohost.includes(',');

        if (oSentinel) {
            ohost = ohost.split(',');
            ohost.forEach((host, idx) => ohost[idx] = host.trim());
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
                    return void callback(23);
                }
            });
        } else {
            oport = parseInt(userObjPort, 10);
            if (isNaN(oport)) {
                console.log(COLOR_RED + 'Invalid objects port: ' + oport + COLOR_RESET);
                return void callback(23);
            }
        }

        let oSentinelName = null;
        if (oSentinel) {
            const defaultSentinelName = originalConfig.objects.sentinelName ? originalConfig.objects.sentinelName : 'mymaster';
            oSentinelName = rl.question('Objects Redis Sentinel Master Name [' + defaultSentinelName + ']: ', {
                defaultInput: defaultSentinelName
            });
        }

        let defaultStatesType = currentStatesType;
        try {
            require.resolve(`@iobroker/db-states-${otype}`);
            defaultStatesType = otype; // if states db is also available with same type we use as default
        } catch {
            // ignore, unchanged
        }

        let stype = rl.question('Type of states DB [(f)file, (r)edis, ...], default [' + defaultStatesType + ']: ', {
            defaultInput: defaultStatesType
        });
        stype = stype.toLowerCase();

        if (stype === 'r') {
            stype = 'redis';
        } else if (stype === 'f') {
            stype = 'file';
        }

        let getDefaultStatesPort;
        try {
            const path = require.resolve(`@iobroker/db-states-${stype}`);
            getDefaultStatesPort = require(path).getDefaultPort;
        } catch {
            console.log(COLOR_RED + 'Unknown objects type: ' + stype + COLOR_RESET);
            if (stype !== 'file' && stype !== 'redis') {
                console.log(COLOR_YELLOW);
                console.log(`Please check that the states db type you entered is really correct!`);
                console.log(`If yes please use "npm i @iobroker/db-states-${stype}" to install it manually.`);
                console.log(`You also need to make sure you stay up to date with this package in the future!`);
                console.log(COLOR_RESET);
            }
            return void callback(23);
        }

        if (stype === 'redis' && originalConfig.states.type !== 'redis' && otype !== 'redis') {
            console.log(COLOR_YELLOW);
            console.log('When States are stored in a Redis database please make sure to configure Redis');
            console.log('persistence to make sure a Redis problem will not cause data loss!');
            console.log(COLOR_RESET);
        }

        let defaultStatesHost = (stype === originalConfig.states.type) ? originalConfig.states.host : ohost || '127.0.0.1';
        if (stype === otype) {
            defaultStatesHost = ohost;
        }
        let shost = rl.question('Host / Unix Socket of states DB (' + stype + '), default[' + (Array.isArray(defaultStatesHost) ? defaultStatesHost.join(',') : defaultStatesHost) + ']: ', {
            defaultInput: Array.isArray(defaultStatesHost) ? defaultStatesHost.join(',') : defaultStatesHost
        });
        shost = shost.toLowerCase();

        const sp = getDefaultStatesPort(shost);
        const sSentinel = stype === 'redis' && shost.includes(',');

        if (sSentinel) {
            shost = shost.split(',');
            shost.forEach((host, idx) => shost[idx] = host.trim());
        }

        let defaultStatesPort = (stype === originalConfig.states.type && shost === originalConfig.states.host) ? originalConfig.states.port : sp;
        if (stype === otype && !tools.statesDbHasServer(stype) && shost === ohost) {
            defaultStatesPort = oport;
        }
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
                    return void callback(23);
                }
            });
        } else {
            sport = parseInt(userStatePort, 10);
            if (isNaN(sport)) {
                console.log(COLOR_RED + 'Invalid states port: ' + sport + COLOR_RESET);
                return void callback(23);
            }
        }

        let sSentinelName = null;
        if (sSentinel) {
            const defaultSentinelName = originalConfig.states.sentinelName ? originalConfig.states.sentinelName : (oSentinelName && oport === sport) ? oSentinelName: 'mymaster';
            sSentinelName = rl.question('States Redis Sentinel Master Name [' + defaultSentinelName + ']: ', {
                defaultInput: defaultSentinelName
            });
        }

        let dir;
        let hname;

        if (tools.isLocalStatesDbServer(stype, shost) || tools.isLocalObjectsDbServer(otype, ohost)) {
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
            return void callback(23);
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
        if (dir) {
            config.objects.dataDir = dir;
        }
        if (dir) {
            config.states.dataDir = dir;
        }
        if (config.objects.type === 'redis' && oSentinel && oSentinelName && oSentinelName !== 'mymaster') {
            config.objects.sentinelName = oSentinelName;
        }
        if (config.states.type === 'redis' && sSentinel && sSentinelName && sSentinelName !== 'mymaster') {
            config.states.sentinelName = sSentinelName;
        }

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
                console.warn('Cannot write file. Not critical: ' + e.message);
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
                    } catch (e) {
                        console.warn('Cannot delete file. Not critical: ' + e.message);
                    }
                }
            }
        }

        // Create log and tmp directory
        if (!fs.existsSync(__dirname + '/../../tmp')) {
            fs.mkdirSync(__dirname + '/../../tmp');
        }

        const configFileName = tools.getConfigFileName();
        // only change config if non existing - else setup custom has to be used
        if (!fs.existsSync(configFileName)) {
            isCreated = true;
            if (fs.existsSync(__dirname + '/../../conf/' + tools.appName + '-dist.json')) {
                config = require(`../../conf/${tools.appName}-dist.json`);
            } else {
                config = require(`../../conf/${tools.appName.toLowerCase()}-dist.json`);
            }
            console.log(`creating conf/${tools.appName}.json`);
            config.objects.host = params.objects || '127.0.0.1';
            config.states.host = params.states || '127.0.0.1';
            if (useRedis) {
                config.states.type = 'redis';
                config.states.port = params.port || 6379;
                config.objects.type = 'redis';
                config.objects.port = params.port || 6379;
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

            const dirName = path.dirname(configFileName);

            if (!fs.existsSync(dirName)) {
                mkpathSync('', dirName.replace(/\\/g, '/'));
            }

            // Create default data dir
            fs.writeFileSync(configFileName, JSON.stringify(config, null, 2));

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
                console.log(`Non-critical error: ${e.message}`);
            }
        } else if (ignoreIfExist) {
            // it is a setup first run and config exists yet
            try {
                config = fs.readJSONSync(configFileName);
                if (!Object.prototype.hasOwnProperty.call(config, 'dataDir')) {
                    // Workaround: there was a bug with admin v5 which could remove the dataDir attribute -> fix this
                    // TODO: remove it as soon as all adapters are fixed which use systemConfig.dataDir
                    config.dataDir = tools.getDefaultDataDir();
                    fs.writeJSONSync(configFileName, config, {spaces: 2});
                }
            } catch (e) {
                console.warn(`Cannot check config file: ${e.message}`);
            }

            setupObjects(() => callback && callback(), true);
            return;
        }

        setupObjects(() => callback && callback(isCreated));
    };
}

module.exports = Setup;