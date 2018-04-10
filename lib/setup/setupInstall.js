//@ts-check

'use strict';

function Install(options) {
    const fs       = require('fs');
    const tools    = require('../tools.js');
    const extend   = require('node.extend');
    const hostname = tools.getHostName();
    const path     = require('path');
    const semver   = require('semver');
    const child_process = require('child_process');
    // todo solve it somehow
    const unsafePermAlways = [tools.appName.toLowerCase() + '.zwave'];
    let  JSZip;

    /** @type {Install} */
    let that = this;

    options = options || {};

    if (!options.states)        throw 'Invalid arguments: states is missing';
    if (!options.objects)       throw 'Invalid arguments: objects is missing';
    if (!options.processExit)   throw 'Invalid arguments: processExit is missing';
    if (!options.installNpm)    throw 'Invalid arguments: installNpm is missing';
    if (!options.getRepository) throw 'Invalid arguments: getRepository is missing';

    let objects           = options.objects;
    let states            = options.states;
    let processExit       = options.processExit;
    let installNpm        = options.installNpm;
    let getRepository     = options.getRepository;
    let params            = options.params || {};
    let mime;

    // TODO: promisify States and Objects at some point
    /** @type {(stateId: string) => Promise<void>} */
    const delStateAsync = tools.promisify(states.delState, states);
    /** @type {(objId: string) => Promise<void>} */
    const delObjectAsync = tools.promisify(objects.delObject, objects);
    /** @type {(id: string, name: string) => Promise<void>} */
    const unlinkAsync = tools.promisify(objects.unlink, objects);
    /** @type {(design: string, search: string, params: any, options?: any) => Promise<{rows: {id: string, value: any}[]}>} */
    const getObjectViewAsync = tools.promisify(objects.getObjectView, objects);
    /** @type {(params: any | null) => Promise<{rows: {id: string, value: any}[]}>} */
    const getObjectListAsync = tools.promisify(objects.getObjectList, objects);
    /** @type {(objId: string) => Promise<any>} */
    const getObjectAsync = tools.promisify(objects.getObject, objects);
    /** @type {(objId: string, newObj: any) => Promise<void>} */
    const setObjectAsync = tools.promisify(objects.setObject, objects);
    /** @type {(pattern: string) => Promise<string[]>} */
    const getKeysAsync = tools.promisify(states.getKeys, states);


    let installCount      = 0;

    const Upload = require(__dirname + '/setupUpload.js');
    let upload = new Upload(options);

    function enableAdapters(adapters, isEnable, callback) {
        let count = 0;
        if (adapters) {
            count = adapters.length;
            const ts = new Date().getTime();
            for (let i = 0; i < adapters.length; i++) {
                adapters[i].common.enabled = isEnable;
                console.log('host.' + hostname + ' Adapter "' + adapters[i]._id + '" is ' + (isEnable ? 'started' : 'stopped.'));
                adapters[i].from = 'system.host.' + tools.getHostName() + '.cli';
                adapters[i].ts = ts;
                objects.setObject(adapters[i]._id, adapters[i], function () {
                    if (!--count) callback();
                });
            }
        }
        if (!count) callback();
    }

    function _writeOneFile(zip, targetName, fileName, callback) {
        zip.files[fileName].async('nodebuffer').then(function (data) {
            fs.writeFileSync(path.join(targetName, fileName), data);
            callback();
        }, function (err) {
            callback(err);
        });
    }

    function extractFiles(fileName, targetName, callback) {
        JSZip = JSZip || require('jszip');
        const zip = new JSZip();
        zip.loadAsync(fs.readFileSync(fileName)).then(function () {
            let count = 0;
            for (let fName in zip.files) {
                if (!zip.files.hasOwnProperty(fName) || !fName || fName[fName.length - 1] === '/') continue;
                count++;
                _writeOneFile(zip, targetName, fName, function (err) {
                    if (!--count) callback(err);
                });
            }
            if (!count) callback();
        });
    }

    this.downloadPacket = function (repoUrl, packetName, options, stoppedList, callback) {
        let url;
        let name;
        if (!options || typeof options !== 'object') {
            options = {};
        }

        if (typeof stoppedList === 'function') {
            callback    = stoppedList;
            stoppedList = null;
        }

        if (!repoUrl || typeof repoUrl !== 'object') {
            getRepository(repoUrl, params, function (err, sources) {
                if (err) {
                    processExit(err);
                    return;
                }
                that.downloadPacket(sources, packetName, options, stoppedList, callback);
            });
            return;
        }
        let version;
        if (packetName.indexOf('@') !== -1) {
            const parts = packetName.split('@');
            packetName = parts[0];
            version = parts[1];
        } else {
            version = '';
        }

        let sources = repoUrl;
        options.unsafePerm = sources[packetName] && sources[packetName].unsafePerm;

        // Check if flag stopBeforeUpdate is true
        if (sources[packetName] && sources[packetName].stopBeforeUpdate && !stoppedList) {
            objects.getObjectList({startkey: 'system.adapter.' + packetName + '.', endkey: 'system.adapter.' + packetName + '.\u9999'}, function (err, arr) {
                stoppedList = [];
                if (!err && arr) {
                    for (let id = 0; id < arr.rows.length; id++) {
                        if (arr.rows[id].value.common.enabled) {
                            stoppedList.push(arr.rows[id].value);
                        }
                    }
                }
                enableAdapters(stoppedList, false, function () {
                    that.downloadPacket(sources, packetName + '@' + version, options, stoppedList, callback);
                });
            });
            return;
        }

        // try to extract the information from local sources-dist.json
        if (!sources[packetName]) {
            try {
                const sourcesDist = JSON.parse(fs.readFileSync(__dirname + '/../../conf/sources-dist.json', 'utf8'));
                sources[packetName] = sourcesDist[packetName];
            } catch (e) {

            }
        }

        if (sources[packetName]) {
            url = sources[packetName].url;

            if (url &&
                packetName === 'js-controller' &&
                fs.existsSync(__dirname + '/../../../../node_modules/' + tools.appName + '.js-controller')) {
                url = null;
            }

            if (!url && packetName !== 'example') {
                // Install node modules
                that.npmInstallWithCheck(tools.appName.toLowerCase() + '.' + packetName + (version ? '@' + version : ''), options, false, function () {
                    // command succeeded
                    enableAdapters(stoppedList, true, function () {
                        if (callback) callback(packetName);
                    });
                });
                return;
            }
            if (url && url.match(/\/tarball\/master$/)) {
                // Install node modules
                that.npmInstallWithCheck(url, options, false, function () {
                    // command succeeded
                    enableAdapters(stoppedList, true, function () {
                        if (callback) callback(packetName);
                    });
                });
                return;
            }
            // Adapter
            if (!url) {
                console.warn('host.' + hostname + ' Adapter "' + packetName + '" can be updated only together with ' + tools.appName + '.js-controller');
                if (typeof callback === 'function') callback(packetName);
                return;
            }
            name = packetName.replace(/[\/ $&*\\]/g, '_');
        } else {
            url = packetName;
            if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1 && url.indexOf('file://') === -1) {
                console.error('host.' + hostname + ' Unknown packetName ' + packetName);
                processExit(5);
            }
            name = Math.floor(Math.random() * 0xFFFFFFE);
        }

        const ncp = require('ncp').ncp;
        ncp.limit =  16;

        console.log('host.' + hostname + ' download ' + url);

        tools.getFile(url, name + '.zip', function (tmpFile) {
            tmpFile = path.normalize(tmpFile);
            console.log('host.' + hostname + ' unzip ' + tmpFile);

            // Extract files into tmp/
            extractFiles(tmpFile, path.join(__dirname + '/../../tmp/', name), function (error) {
                if (error) {
                    console.error(error);
                    processExit(12);
                }
                // Find out the first directory
                const dirs = fs.readdirSync(__dirname + '/../../tmp/' + name);
                if (dirs.length) {
                    const source = __dirname + '/../../tmp/' + name + ((dirs.length === 1) ? '/' + dirs[0] : '');
                    // Copy files into adapter or controller
                    if (fs.existsSync(source + '/io-package.json')) {
                        let packetIo;
                        try {
                            packetIo = JSON.parse(fs.readFileSync(source + '/io-package.json', 'utf8'));
                        } catch (e) {
                            console.error('host.' + hostname + ' io-package.json has invalid format! Installation terminated.');
                            if (typeof callback === 'function') callback(name, 'Invalid io-package.json!');
                            processExit(6);
                        }

                        let destination = __dirname + '/../..';
                        if (!packetIo.common.controller) {
                            if (fs.existsSync(destination + '/../../node_modules')) {
                                destination += '/../' + tools.appName + '.' + packetIo.common.name;
                            } else {
                                destination += '/node_modules/' + tools.appName + '.' + packetIo.common.name;
                            }
                        }

                        destination = path.normalize(destination);

                        console.log('host.' + hostname + ' copying ' + source + ' to ' + destination + '(Version: ' + packetIo.common.version + ')');

                        ncp(source, destination, function (err) {
                            if (err) {
                                console.error('host.' + hostname + ' ncp error: ' + err);
                                processExit(7);
                            }
                            if (tmpFile.substring(0, (path.normalize(__dirname + '/../../tmp/')).length) === path.normalize(__dirname + '/../../tmp/')) {
                                console.log('host.' + hostname + ' delete ' + tmpFile);
                                fs.unlinkSync(tmpFile);
                            }
                            console.log('host.' + hostname + ' delete ' + path.normalize(__dirname + '/../../tmp/' + name));
                            tools.rmdirRecursiveSync(__dirname + '/../../tmp/' + name);

                            // Call npm install
                            if (typeof callback === 'function') {
                                enableAdapters(stoppedList, true, function () {
                                    if (callback) callback(name, packetIo);
                                });
                            }

                        });
                    } else {
                        console.error('host.' + hostname + ' io-package.json not found in ' + source + '/io-package.json. Invalid packet! Installation terminated.');
                        if (typeof callback === 'function') callback(name, 'Invalid packet!');
                        processExit(8);
                    }
                } else {
                    console.error('host.' + hostname + ' Packet is empty! Installation terminated.');
                    if (typeof callback === 'function') callback(name, 'Packet is empty');
                    processExit(12);
                }
            });
        });
    };

    this.npmInstallWithCheck = function (npmUrl, options, debug, callback) {
        // Get npm version
        try {
            let npmVersion;
            try {
                npmVersion = child_process.execSync('npm -v', {encoding: 'utf8'});
                if (npmVersion) npmVersion = semver.valid(npmVersion.trim());
                console.log('NPM version: ' + npmVersion);
            } catch (e) {
                console.error('Error trying to check npm version: ' + e);
            }

            if (!npmVersion) {
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                console.error('Aborting install because the npm version could not be checked!');
                console.error('Please check that npm is installed correctly.');
                console.error('Use "npm install -g npm@4" or "npm install -g npm@>=5.7.1" to install a supported version.');
                console.error('You need to make sure to repeat this step after installing an update to NodeJS and/or npm');
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                processExit(25);
                return;
            }

            if (semver.gte(npmVersion, "5.0.0") && semver.lt(npmVersion, "5.7.1")) {
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                console.error('NPM 5 is only supported starting with version 5.7.1!');
                console.error('Please use "npm install -g npm@4" to downgrade npm to 4.x or ');
                console.error('use "npm install -g npm@>=5.7.1" to install a supported version of npm 5!');
                console.error('You need to make sure to repeat this step after installing an update to NodeJS and/or npm');
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                processExit(25);
                return;
            }

            this.npmInstall(npmUrl, options, debug, callback);
        } catch (e) {
            console.error('Could not check npm version: ' + e);
            console.error('Assuming that correct version is installed.');
        }
    };

    this.npmInstall = function (npmUrl, options, debug, callback) {
        if (typeof options !== 'object') {
            options = {};
        }

        // Install node modules
        /** @type {string|string[]} */
        let cwd = __dirname.replace(/\\/g, '/');
        if (fs.existsSync(__dirname + '/../../../../node_modules/' + tools.appName + '.js-controller')) {
            // js-controller installed as npm
            cwd = cwd.split('/');
            cwd.splice(cwd.length - 4, 4);
            cwd = cwd.join('/');
        } else {
            // remove lib
            cwd = cwd.split('/');
            cwd.pop();
            cwd.pop();
            cwd = cwd.join('/');
        }

        // zwave for example requires always unsafe-perm option
        for (let a = 0; a < unsafePermAlways.length; a++) {
            if (npmUrl.indexOf(unsafePermAlways[a]) !== -1) {
                options.unsafePerm = true;
                break;
            }
        }

        tools.disablePackageLock(function (err) {
            const cmd = 'npm install ' + npmUrl + (options.unsafePerm ? ' --unsafe-perm' : '') + ' --production --save --prefix "' + cwd + '"';

            console.log(cmd + ' (System call)');
            // Install node modules as system call

            // System call used for update of js-controller itself,
            // because during installation npm packet will be deleted too, but some files must be loaded even during the install process.
            const exec = require('child_process').exec;
            const child = exec(cmd);
            child.stderr.pipe(process.stdout);
            if (debug || params.debug) {
                child.stdout.pipe(process.stdout);
            }
            child.on('exit', function (code /* , signal */) {
                // code 1 is strange error that cannot be explained. Everything is installed but error :(
                if (code && code !== 1) {
                    console.error('host.' + hostname + ' Cannot install ' + npmUrl + ': ' + code);
                    processExit(25);
                }
                // create file that indicates, that npm was called there
                if (npmUrl.indexOf(':') === -1 && fs.existsSync(cwd + '/node_modules/' + npmUrl)) {
                    fs.writeFileSync(cwd + '/node_modules/' + npmUrl + '/iob_npm.done', ' ');
                }
                // command succeeded
                if (callback) callback(npmUrl, cwd + '/node_modules');
            });
        });
    };

    this.npmUninstall = function (packageName, options, debug, callback) {
        if (typeof options !== 'object') {
            options = {};
        }

        // TODO: fine nicer way to find the root directory

        // Install node modules
        /** @type {string|string[]} */
        let cwd = __dirname.replace(/\\/g, '/');
        if (fs.existsSync(__dirname + '/../../../../node_modules/' + tools.appName + '.js-controller')) {
            // js-controller installed as npm
            cwd = cwd.split('/');
            cwd.splice(cwd.length - 4, 4);
            cwd = cwd.join('/');
        } else {
            // remove lib
            cwd = cwd.split('/');
            cwd.pop();
            cwd.pop();
            cwd = cwd.join('/');
        }

        tools.disablePackageLock(function (err) {
            let cmd = `npm uninstall ${packageName} --silent --save --prefix "${cwd}"`;

            console.log(cmd + ' (System call)');
            // Install node modules as system call

            // System call used for update of js-controller itself,
            // because during installation npm packet will be deleted too, but some files must be loaded even during the install process.
            const exec = require('child_process').exec;
            const child = exec(cmd);
            child.stderr.pipe(process.stdout);
            if (debug || params.debug) {
                child.stdout.pipe(process.stdout);
            }
            child.on('exit', function (code /* , signal */) {
                // code 1 is strange error that cannot be explained. Everything is installed but error :(
                if (code && code !== 1) {
                    if (typeof callback === "function") callback(`host.${hostname}: Cannot uninstall ${packageName}: ${code}`);
                }
                // command succeeded
                if (callback) callback();
            });
        });
    };
    /** @type {(packageName: string, options: any, debug: boolean) => Promise<void>} */
    this.npmUninstallAsync = tools.promisify(this.npmUninstall, this);

    this.uploadStaticObjects = function (adapter, adapterConf, callback) {
        if (typeof adapterConf === 'function') {
            callback = adapterConf;
            adapterConf = null;
        }
        if (!adapterConf) {
            const adapterDir = tools.getAdapterDir(adapter);
            if (!fs.existsSync(adapterDir + '/io-package.json')) {
                console.error('host.' + hostname + ' Adapter directory "' + adapterDir + '" does not exists');
                callback(17, adapter);
                return;
            }
            try {
                adapterConf = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json').toString());
            } catch (e) {
                console.error('host.' + hostname + ' error: reading io-package.json ' + e, adapter);
                callback(17, adapter);
                return;
            }
        }

        let objs;
        if (adapterConf.objects && adapterConf.objects.length > 0) {
            objs = adapterConf.objects;
        } else {
            objs = [];
        }
        function checkDependencies(deps, _options, callback) {
            if (!deps || !deps.length) {
                if (callback) callback(adapter);
                return;
            }

            let cnt = 0;
            // Get all installed adapters
            objects.getObjectView('system', 'instance', {}, null, function (err, objs) {
                if (err) console.error(err);
                if (objs && objs.rows && objs.rows.length) {
                    for (let i = 0; i < deps.length; i++) {
                        let dName;
                        let version = null;
                        let isFound = false;

                        if (typeof deps[i] === 'object') {
                            for (let d in deps[i]) {
                                if (!deps[i].hasOwnProperty(d)) continue;
                                dName = d;
                                version = deps[i][d];
                                break;
                            }
                        } else {
                            dName = deps[i];
                        }

                        if (dName === 'js-controller') {
                            // Check only version
                            if (version !== null) {
                                const iopkg_ = JSON.parse(fs.readFileSync(__dirname + '/../../package.json', 'utf8'));
                                if (!semver.satisfies(iopkg_.version, version)) {
                                    console.error('host.' + hostname + ' Invalid version of "' + dName + '". Installed "' + iopkg_.version + '", required "' + version);
                                    processExit(30);
                                } else {
                                    isFound = true;
                                }
                            } else {
                                isFound = true;
                            }
                        }

                        if (!isFound) {
                            for (let t = 0; t < objs.rows.length; t++) {
                                if (objs.rows[t] && objs.rows[t].value && objs.rows[t].value.common && objs.rows[t].value.common.name === dName) {

                                    if (version !== null) {
                                        // var iopkg = JSON.parse(fs.readFileSync(__dirname + '/../../package.json'));
                                        if (!semver.satisfies(objs.rows[t].value.common.version, version)) {
                                            console.error('host.' + hostname + ' Invalid version of "' + dName + '". Installed "' + objs.rows[t].value.common.version + '", required "' + version);
                                            processExit(30);
                                        } else {
                                            isFound = true;
                                        }
                                    } else {
                                        isFound = true;
                                    }

                                    break;
                                }
                            }
                        }

                        if (!isFound) {
                            cnt++;
                            that.createInstance(dName, _options, function (name) {
                                upload.uploadAdapter(name, true, false, function () {
                                    upload.uploadAdapter(name, false, false, function () {
                                        cnt--;
                                        if (!cnt && callback) callback(adapter);
                                    });
                                });
                            });
                        }
                    }
                }
                if (!cnt && callback) callback(adapter);
            });
        }

        checkDependencies(adapterConf.common.dependencies, params, function () {
            adapterConf.common.installedVersion = adapterConf.common.version;

            objs.push({
                _id:      'system.adapter.' + adapterConf.common.name,
                type:     'adapter',
                common:   adapterConf.common,
                native:   adapterConf.native
            });

            function setObjects(_objs, _callback) {
                if (!_objs || _objs.length === 0) {
                    _callback(null, adapter);
                } else {
                    let obj = _objs.pop();

                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = new Date().getTime();

                    objects.extendObject(obj._id, obj, function (err /* , res */) {
                        if (err) {
                            console.error('host.' + hostname + ' error setObject ' + obj._id + ' ' + err);
                            _callback(17, adapter);
                        } else {
                            console.log('host.' + hostname + ' object ' + obj._id + ' created');
                            setImmediate(setObjects, _objs, _callback);
                        }
                    });
                }
            }

            setObjects(objs, callback);
        });
    };

    function installAdapter(adapter, callback) {
        const adapterDir = tools.getAdapterDir(adapter);

        console.log('host.' + hostname + ' install adapter ' + adapter);

        if (!fs.existsSync(adapterDir + '/io-package.json')) {
            if (installCount === 2) {
                console.error('host.' + hostname + ' Cannot install ' + adapter);
                processExit(13);
                return;
            }
            installCount++;

            that.downloadPacket(null, adapter, null, function () {
                installAdapter(adapter, callback);
            });
            return;
        }
        installCount = 0;
        let adapterConf;
        try {
            adapterConf = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json').toString());
        } catch (e) {
            console.error('host.' + hostname + ' error: reading io-package.json ' + e);
            processExit(14);
        }

        // Check if the operation system is ok
        if (adapterConf.common && adapterConf.common.os) {
            if (typeof adapterConf.common.os === 'string' && adapterConf.common.os !== require('os').platform()) {
                console.error('host.' + hostname + ' Adapter does not support current os. Required ' + adapterConf.common.os + '. Actual platform: ' + require('os').platform());
                processExit(15);
            } else {
                if (adapterConf.common.os.indexOf(require('os').platform()) === -1) {
                    console.error('host.' + hostname + ' Adapter does not support current os. Required one of ' + adapterConf.common.os.join(', ') + '. Actual platform: ' + require('os').platform());
                    processExit(16);
                }
            }
        }

        if (!fs.existsSync(adapterDir + '/node_modules')) {
            // Install node modules
            installNpm(adapter, function (err, _adapter) {
                if (err) {
                    processExit(err);
                } else {
                    upload.uploadAdapter(_adapter, true, true, function () {
                        upload.uploadAdapter(_adapter, false, true, function () {
                            callInstallOfAdapter(_adapter, adapterConf, function () {
                                that.uploadStaticObjects(adapter, function (err /* , _adapter */) {
                                    if (err) {
                                        processExit(err);
                                    } else {
                                        callback(adapter);
                                    }
                                });
                            });
                        });
                    });
                }
            });
        } else {
            upload.uploadAdapter(adapter, true, true, function () {
                upload.uploadAdapter(adapter, false, true, function () {
                    callInstallOfAdapter(adapter, adapterConf, function () {
                        that.uploadStaticObjects(adapter, function (err /* , _adapter */) {
                            if (err) {
                                processExit(err);
                            } else {
                                callback(adapter);
                            }
                        });
                    });
                });
            });
        }
    }

    function callInstallOfAdapter(adapter, config, callback) {
        const path_ = tools.getAdapterDir(adapter);

        if (config.common.install && fs.existsSync(path_ + '/io-package.json')) {
            // Install node modules
            const exec = require('child_process').exec;
            let cmd = 'node ';

            let fileName = config.common.main || 'main.js';
            if (!fs.existsSync(path_ + '/' + fileName)) {
                fileName = adapter + '.js';
            }
            cmd += '"' + path  + '/' + fileName + '" --install';
            console.log('host.' + hostname + ' command: ' + cmd);
            const child = exec(cmd);
            child.stderr.pipe(process.stdout);
            child.on('exit', function () {
                if (callback) callback(adapter);
            });
        } else {
            if (callback) callback(adapter);
        }
    }

    //options = enabled, host, port
    this.createInstance = function (adapter, options, callback) {
        const adapterDir = tools.getAdapterDir(adapter);
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }
        let ignoreIfExists = false;
        if (!options) options = {};
        if (!options.host) options.host = tools.getHostName();
        if (options.enabled === 'true')  options.enabled = true;
        if (options.enabled === 'false') options.enabled = false;
        if (options.ignoreIfExists !== undefined) {
            ignoreIfExists = !!options.ignoreIfExists;
            delete options.ignoreIfExists;
        }

        if (!mime) mime = require('mime');

        objects.getObject('system.adapter.' + adapter, function (err, doc) {

            // Adapter is not installed - install it now
            if (err || !doc || !doc.common.installedVersion) {
                installAdapter(adapter, function () {
                    that.createInstance(adapter, options, callback);
                });
                return;
            }

            // Check if some web pages should be uploaded
            upload.uploadAdapter(adapter, true, false, function () {
                upload.uploadAdapter(adapter, false, false, function () {
                    objects.getObjectView('system', 'instance', {startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, null, function (err, res) {
                        let a;
                        if (err || !res) {
                            console.error('host.' + hostname + ' error: view instanceStats ' + err);
                            processExit(18);
                            return;
                        }

                        // Count started instances
                        if (doc.common.singleton && res.rows.length) {
                            if (ignoreIfExists) {
                                callback && callback();
                                return;
                            }
                            console.error('host.' + hostname + ' error: this adapter does not allow multiple instances');
                            processExit(19);
                            return;
                        }

                        // check singletonHost one on host
                        if (doc.common.singletonHost) {
                            for (a = 0; a < res.rows.length; a++) {
                                if (res.rows[a].value.common.host === hostname) {
                                    if (ignoreIfExists) {
                                        callback && callback();
                                        return;
                                    }
                                    console.error('host.' + hostname + ' error: this adapter does not allow multiple instances on one host');
                                    processExit(21);
                                    return;
                                }
                            }
                        }

                        let adapterConf;
                        let instance = null;

                        if (options.instance !== undefined) {
                            instance = options.instance;
                            // find max instance
                            if (res.rows.find(obj => parseInt(obj.id.split('.').pop(), 10) === instance)) {
                                console.error('host.' + hostname + ' error: instance yet exists');
                                processExit(26);
                                return;
                            }
                        } else {
                            // find max instance
                            for (a = 0; a < res.rows.length; a++) {
                                const iInstance = parseInt(res.rows[a].id.split('.').pop(), 10);
                                if (instance === null || iInstance > instance) {
                                    instance = iInstance;
                                }
                            }
                            if (instance === null) {
                                instance = 0;
                            } else {
                                instance++;
                            }
                        }

                        const instanceObj = doc;
                        doc = JSON.parse(JSON.stringify(doc));

                        instanceObj._id    = 'system.adapter.' + adapter + '.' + instance;
                        instanceObj.type   = 'instance';
                        if (instanceObj._rev) delete instanceObj._rev;
                        instanceObj.common.enabled = (options.enabled === true || options.enabled === false) ? options.enabled :
                            ((instanceObj.common.enabled === true || instanceObj.common.enabled === false) ? instanceObj.common.enabled : false);
                        instanceObj.common.host    = options.host;

                        if (options.port) {
                            instanceObj.native = instanceObj.native || {};
                            instanceObj.native.port = options.port;
                        }

                        console.log('host.' + hostname + ' create instance ' + adapter);

                        const _id = 'system.adapter.' + adapter + '.' + instance;

                        let objs;
                        if (!instanceObj.common.onlyWWW && instanceObj.common.mode !== 'once') {
                            objs = [
                                {
                                    _id:    _id + '.alive',
                                    type:   'state',
                                    common: {
                                        name:   adapter + '.' + instance + '.alive',
                                        type:   'boolean',
                                        read:   true,
                                        write:  true,
                                        role:   'indicator.state'
                                    },
                                    native: {}
                                },
                                {
                                    _id:    _id + '.connected',
                                    type:   'state',
                                    common: {
                                        name: adapter + '.' + instance + '.connected',
                                        type: 'boolean',
                                        read:   true,
                                        write:  false,
                                        role: 'indicator.state'
                                    },
                                    native: {}
                                },
                                {
                                    _id:    _id + '.memHeapUsed',
                                    type:   'state',
                                    common: {
                                        name: adapter + '.' + instance + '.memHeapUsed',
                                        type: 'number',
                                        read:   true,
                                        write:  false,
                                        role: 'indicator.state',
                                        unit: 'MB'
                                    },
                                    native: {}
                                },
                                {
                                    _id:    _id + '.memHeapTotal',
                                    type:   'state',
                                    common: {
                                        name: adapter + '.' + instance + '.memHeapTotal',
                                        read:   true,
                                        write:  false,
                                        type: 'number',
                                        role: 'indicator.state',
                                        unit: 'MB'
                                    },
                                    native: {}
                                },
                                {
                                    _id:    _id + '.memRss',
                                    type:   'state',
                                    common: {
                                        name: adapter + '.' + instance + '.memRss',
                                        desc: 'Resident set size',
                                        read:   true,
                                        write:  false,
                                        type: 'number',
                                        role: 'indicator.state',
                                        unit: 'MB'
                                    },
                                    native: {}
                                },
                                {
                                    _id:    _id + '.uptime',
                                    type:   'state',
                                    common: {
                                        name: adapter + '.' + instance + '.uptime',
                                        type: 'number',
                                        read:   true,
                                        write:  false,
                                        role: 'indicator.state',
                                        unit: 'seconds'
                                    },
                                    native: {}
                                },
                                {
                                    _id:    _id + '.inputCount',
                                    type:   'state',
                                    common: {
                                        name: hostname + ' - inputs level',
                                        desc: 'State\'s inputs in 15 seconds',
                                        type: 'number',
                                        read: true,
                                        write: false,
                                        role: 'state',
                                        unit: 'events/15 seconds'
                                    },
                                    native: {}
                                },
                                {
                                    _id:    _id + '.outputCount',
                                    type:   'state',
                                    common: {
                                        name: hostname + ' outputs level',
                                        desc: 'State\'s outputs in 15 seconds',
                                        type: 'number',
                                        read: true,
                                        write: false,
                                        role: 'state',
                                        unit: 'events/15 seconds'
                                    },
                                    native: {}
                                }
                            ];
                        } else {
                            objs = [];
                        }

                        if (fs.existsSync(adapterDir + '/www')) {
                            objs.push({
                                    _id:   'system.adapter.' + adapter + '.upload',
                                    type:   'state',
                                    common: {
                                        name: adapter + '.upload',
                                        type: 'number',
                                        read:   true,
                                        write:  false,
                                        role: 'indicator.state',
                                        unit: '%',
                                        def:  0,
                                        desc: 'Upload process indicator'
                                    },
                                    native: {}
                                });
                        }

                        if (instanceObj.common.wakeup) {
                            objs.push({
                                _id:    _id + '.wakeup',
                                type:   'state',
                                common: {
                                    name: adapter + '.' + instance + '.wakeup',
                                    read:   true,
                                    write:  true,
                                    type: 'boolean',
                                    role: 'adapter.wakeup'
                                },
                                native: {}
                            });
                        }

                        if (!adapterConf) {
                            try {
                                adapterConf = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json').toString());
                            } catch (e) {
                                console.error('host.' + hostname + ' error: reading io-package.json ' + e);
                                processExit(20);
                            }
                        }
                        if (!adapterConf.instanceObjects) adapterConf.instanceObjects = [];
                        if (!adapterConf.objects) adapterConf.objects = [];

                        // Create only for this instance the predefined in io-package.json objects
                        // It is not necessary to write "system.adapter.name.N." in the object '_id'
                        for (let i = 0; i < adapterConf.instanceObjects.length; i++) {
                            adapterConf.instanceObjects[i]._id = adapter + '.' + instance + (adapterConf.instanceObjects[i]._id ? ('.' + adapterConf.instanceObjects[i]._id) : '');

                            if (adapterConf.instanceObjects[i].common) {
                                if (adapterConf.instanceObjects[i].common.name) {
                                    adapterConf.instanceObjects[i].common.name = adapterConf.instanceObjects[i].common.name.replace('%INSTANCE%', instance);
                                }
                                if (adapterConf.instanceObjects[i].common.desc) {
                                    adapterConf.instanceObjects[i].common.desc = adapterConf.instanceObjects[i].common.desc.replace('%INSTANCE%', instance);
                                }
                            }

                            objs.push(adapterConf.instanceObjects[i]);
                        }

                        /* these are already created on adapter install
                         if (adapterConf.objects && adapterConf.objects.length > 0) {
                         for (var j = 0, l = adapterConf.objects.length; j < l; j++) {
                         objs.push(adapterConf.objects[j]);
                         }
                         }
                         */

                        function setObjs() {
                            if (objs.length > 0) {
                                let obj = objs.pop();
                                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                obj.ts = new Date().getTime();
                                objects.setObject(obj._id, obj, function (err /*, res */) {
                                    if (err) {
                                        console.error('host.' + hostname + ' error: ' + err);
                                    } else {
                                        console.log('host.' + hostname + ' object ' + obj._id + ' created');
                                    }
                                    setTimeout(setObjs, 25);
                                });
                            } else {
                                instanceObj.from = 'system.host.' + tools.getHostName() + '.cli';
                                instanceObj.ts = new Date().getTime();

                                objects.setObject(instanceObj._id, instanceObj, function (err /* , res */) {
                                    if (err) {
                                        console.error('host.' + hostname + ' error: ' + err);
                                    } else {
                                        console.log('host.' + hostname + ' object ' + instanceObj._id + ' created');
                                    }

                                    if (callback) {
                                        callback(adapter);
                                    } else {
                                        processExit(0);
                                    }
                                });
                            }
                        }

                        setObjs();
                    });
                });
            });

        });
    };

    /**
     * Enumerate all instances of an adapter
     * @type {(knownObjIDs: string[], adapter: string, instance: string) => Promise<void>}
     */
    this.enumerateAdapterInstances = function enumerateInstances(knownObjIDs, adapter, instance) {
        const startkey = instance ?
            'system.adapter.' + adapter + '.' + instance :
            'system.adapter.' + adapter;
        const endkey = instance ?
            'system.adapter.' + adapter + '.' + instance :
            'system.adapter.' + adapter + '\u9999';

        return getObjectViewAsync('system', 'instance', {startkey, endkey}, null).then(doc => {
            if (doc.rows.length === 0) {
                console.log('host.' + hostname + ' no instances of adapter ' + adapter + ' found');
            } else {
                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => knownObjIDs.indexOf(id) === -1)
                ;
                knownObjIDs.push.apply(knownObjIDs, newObjs);
                if (newObjs.length > 0) {
                    console.log(`host.${hostname} Counted ${newObjs.length} instances of ${adapter}`);
                }
            }
        }).catch(err => {
            if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
        })
    };

    /**
     * Enumerate all meta objects of an adapter
     * @type {(knownObjIDs: string[], adapter: string) => Promise<void>}
     */
    this.enumerateAdapterMeta = function enumerateMeta(knownObjIDs, adapter) {
        return getObjectViewAsync('system', 'meta', {startkey: adapter + '.meta', endkey: adapter + '.meta\u9999'}).then(doc => {
            if (doc.rows.length !== 0) {
                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => knownObjIDs.indexOf(id) === -1)
                ;
                knownObjIDs.push.apply(knownObjIDs, newObjs);
                if (newObjs.length > 0) {
                    console.log(`host.${hostname} Counted ${newObjs.length} meta of ${adapter}`);
                }
            }
        }).catch(err => {
            if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
        })
    };

    /**
     * @type {(knownObjIDs: string[], adapter: string) => Promise<number>}
     * @returns 22 if the adapter could not be deleted, 0 otherwise
     */
    this.enumerateAdapters = tools.poorMansAsync(function*(knownObjIDs, adapter) {
        let resultCode = 0;
        try {
            const doc = yield getObjectViewAsync('system', 'adapter', {startkey: 'system.adapter.' + adapter, endkey: 'system.adapter.' + adapter + '\u9999'})
            if (doc.rows.length !== 0) {
                // change nondeletable adapters
                const nondeletable = doc.rows.filter(row => row.value.common.nondeletable);
                if (nondeletable.length > 0) {
                    console.log('host.' + hostname + ' Adapter ' + adapter + ' cannot be deleted completely, because non-deletable.');
                    resultCode = 22;
                    for (const row of nondeletable) {
                        const adapterConf = row.value;
                        try {
                            let oldObj = yield getObjectAsync(adapterConf._id);
                            if (oldObj) {
                                oldObj = extend(true, oldObj, {installedVersion: ''});
                            } else {
                                oldObj = {installedVersion: ''};
                            }
                            oldObj.from = 'system.host.' + tools.getHostName() + '.cli';
                            oldObj.ts = new Date().getTime();
                            yield setObjectAsync(adapterConf._id, oldObj);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }

                // remember deletable adapters
                const deletable = doc.rows.filter(row => !row.value.common.nondeletable);
                if (deletable.length > 0) {
                    // add non-duplicates to the list
                    const newObjs = deletable
                        .map(row => row.value._id)
                        .filter(id => knownObjIDs.indexOf(id) === -1)
                    ;
                    knownObjIDs.push.apply(knownObjIDs, newObjs);
                    if (newObjs.length > 0) {
                        console.log(`host.${hostname} Counted ${newObjs.length} adapters for ${adapter}`);
                    }
                }
            }
        } catch (e) {
            if (e.message !== 'Not exists') console.error('host.' + hostname + ' error: ' + e);
        }
        return resultCode;
    });

    /**
     * Enumerates the devices of an adapter (or instance)
     * @param {string[]} knownObjIDs The already known object ids
     * @param {string} adapter The adapter to enumerate the devices for
     * @param {string} [instance] The instance to enumerate the devices for (optional)
     */
    this.enumerateAdapterDevices = function enumerateAdapterDevices(knownObjIDs, adapter, instance) {
        const adapterRegex = new RegExp(`^${adapter}${instance ? `\\.${instance}` : ''}`);

        return getObjectViewAsync('system', 'device', {}, null).then(doc => {
            if (doc.rows.length !== 0) {
                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => adapterRegex.test(id))
                    .filter(id => knownObjIDs.indexOf(id) === -1)
                ;
                knownObjIDs.push.apply(knownObjIDs, newObjs);
                if (newObjs.length > 0) {
                    console.log(`host.${hostname} Counted ${newObjs.length} devices of ${adapter}${instance ? `.${instance}` : ''}`);
                }
            }
        }).catch(err => {
            if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
        })
    };

    /**
     * Enumerates the channels of an adapter (or instance)
     * @param {string[]} knownObjIDs The already known object ids
     * @param {string} adapter The adapter to enumerate the channels for
     * @param {string} [instance] The instance to enumerate the channels for (optional)
     */
    this.enumerateAdapterChannels = function enumerateAdapterChannels(knownObjIDs, adapter, instance) {
        const adapterRegex = new RegExp(`^${adapter}${instance ? `\\.${instance}` : ''}`);

        return getObjectViewAsync('system', 'channel', {}, null).then(doc => {
            if (doc.rows.length !== 0) {
                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => adapterRegex.test(id))
                    .filter(id => knownObjIDs.indexOf(id) === -1)
                ;
                knownObjIDs.push.apply(knownObjIDs, newObjs);
                if (newObjs.length > 0) {
                    console.log(`host.${hostname} Counted ${newObjs.length} channels of ${adapter}${instance ? `.${instance}` : ''}`);
                }
            }
        }).catch(err => {
            if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
        })
    };

    /**
     * Enumerates the states of an adapter (or instance)
     * @param {string[]} knownObjIDs The already known object ids
     * @param {string} adapter The adapter to enumerate the states for
     * @param {string} [instance] The instance to enumerate the states for (optional)
     */
    this.enumerateAdapterStateObjects = function enumerateAdapterStateObjects(knownObjIDs, adapter, instance) {
        const adapterRegex = new RegExp(`^${adapter}${instance ? `\\.${instance}` : ''}`);
        const sysAdapterRegex = new RegExp(`^system\\.adapter\\.${adapter}${instance ? `\\.${instance}` : ''}`);

        return getObjectViewAsync('system', 'state', {}, null).then(doc => {
            if (doc.rows.length !== 0) {
                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => adapterRegex.test(id) || sysAdapterRegex.test(id))
                    .filter(id => knownObjIDs.indexOf(id) === -1)
                ;
                knownObjIDs.push.apply(knownObjIDs, newObjs);
                if (newObjs.length > 0) {
                    console.log(`host.${hostname} Counted ${newObjs.length} states of ${adapter}${instance ? `.${instance}` : ''}`);
                }
            }
        }).catch(err => {
            if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
        })
    };

    // TODO: is enumerateAdapterDocs the correct name???
    /**
     * Enumerates the docs of an adapter (or instance)
     * @param {string[]} knownObjIDs The already known object ids
     * @param {string} adapter The adapter to enumerate the states for
     * @param {string} [instance] The instance to enumerate the states for (optional)
     */
    this.enumerateAdapterDocs = function enumerateAdapterDocs(knownObjIDs, adapter, instance) {
        const adapterRegex = new RegExp(`^${adapter}${instance ? `\\.${instance}` : ''}`);
        const sysAdapterRegex = new RegExp(`^system\\.adapter\\.${adapter}${instance ? `\\.${instance}` : ''}`);

        return getObjectListAsync({include_docs: true}).then(doc => {
            if (doc.rows.length !== 0) {
                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => adapterRegex.test(id) || sysAdapterRegex.test(id))
                    .filter(id => knownObjIDs.indexOf(id) === -1)
                ;
                knownObjIDs.push.apply(knownObjIDs, newObjs);
                if (newObjs.length > 0) {
                    console.log(`host.${hostname} Counted ${newObjs.length} objects of ${adapter}${instance ? `.${instance}` : ''}`);
                }
            }
        }).catch(err => {
            if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
        });
    };

    /**
     * Enumerate all state IDs of an adapter (or instance)
     * @type {(knownStateIDs: string[], adapter: string, instance?: string) => Promise<void>}
     */
    this.enumerateAdapterStates = tools.poorMansAsync(function* (knownStateIDs, adapter, instance) {
        for (const pattern of [
            `io.${adapter}.${instance ? instance + '.' : ''}*`,
            `messagebox.${adapter}.${instance ? instance + '.' : ''}*`,
            `log.${adapter}.${instance ? instance + '.' : ''}*`,
            `${adapter}.${instance ? instance + '.' : ''}*`,
            `system.adapter.${adapter}.${instance ? instance + '.' : ''}*`
        ]) {
            try {
                const ids = yield getKeysAsync(pattern);
                if (ids && ids.length) {
                    // add non-duplicates to the list
                    const newStates = ids
                        .filter(id => knownStateIDs.indexOf(id) === -1)
                        ;
                    knownStateIDs.push.apply(knownStateIDs, newStates);
                    if (newStates.length > 0) {
                        console.log(`host.${hostname} Counted ${newStates.length} states (${pattern}) from states`);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
    });

    /**
     * delete WWW pages and objects
     * @type {(adapter: string) => Promise<void>}
     */
    this.deleteWWW = tools.poorMansAsync(function* (adapter) {
        for (const file of [
            adapter, adapter + '.admin'
        ]) {
            try {
                yield unlinkAsync(file, '');
            } catch (e) {
                if (e.message !== 'Not exists') console.error(`Cannot delete ${file} files folder: ${e}`);
            }
        }

        for (const objId of [
            adapter, adapter + '.admin'
        ]) {
            try {
                const obj = yield delObjectAsync(objId);
                if (obj) console.log(`host.${hostname} object ${objId} deleted`);
            } catch (e) {
                if (e.message !== 'Not exists') console.error('host.' + hostname + ' error: ' + e);
            }
        }
    });

    /**
     * @type {(stateIDs: string[]) => Promise<void>}
     */
    this.deleteAdapterStates = tools.poorMansAsync(function*(stateIDs) {
        if (stateIDs.length > 1000) {
            console.log('host.' + hostname + ' Deleting ' + stateIDs.length + ' state(s). Be patient...');
        } else if (stateIDs.length) {
            console.log('host.' + hostname + ' Deleting ' + stateIDs.length + ' state(s).');
        }

        while (stateIDs.length > 0) {
            if (stateIDs.length % 200 === 0) {
                // write progress report
                console.log(`host.${hostname}: Only ${stateIDs.length} states left to be deleted.`);
            }
            // try to delete the current state
            try {
                yield delStateAsync(stateIDs.pop());
            } catch (e) { // yep that works!
                if (e.message !== 'Not exists') console.error(e);
            }
        }
    });

    /**
     * @type {(objIDs: string[]) => Promise<void>}
     */
    this.deleteAdapterObjects = tools.poorMansAsync(function*(objIDs) {
        if (objIDs.length > 1000) {
            console.log('host.' + hostname + ' Deleting ' + objIDs.length + ' object(s). Be patient...');
        } else if (objIDs.length) {
            console.log('host.' + hostname + ' Deleting ' + objIDs.length + ' object(s).');
        }

        while (objIDs.length > 0) {
            if (objIDs.length % 200 === 0) {
                // write progress report
                console.log(`host.${hostname}: Only ${objIDs.length} objects left to be deleted.`);
            }
            // try to delete the current state
            try {
                yield delObjectAsync(objIDs.pop());
            } catch (e) {
                if (e.message !== 'Not exists') console.error('host.' + hostname + ' error: ' + e);
            }
        }
    });

    this.deleteAdapter = function (adapter, callback) {
        const knownObjectIDs  = [];
        const knownStateIDs   = [];
        let resultCode      = 0;

        const uninstallNpm = tools.poorMansAsync(function*() {
            try {
                // find the adapter's io-package.json
                const adapterNpm = `${tools.appName}.${adapter}`;
                const ioPack = require(`${adapterNpm}/io-package.json`); // yep, it's that easy
                if (!ioPack.common || !ioPack.common.nondeletable) {
                    yield that.npmUninstallAsync(adapterNpm, null, false);
                }
            } catch (e) {
                console.error(`Error deleting adapter ${adapter} from disk: ${e}`);
                console.error(`You might have to delete it yourself!`);
            }
        });

        that.enumerateAdapterInstances(knownObjectIDs, adapter)
            .then(() => that.enumerateAdapterMeta(knownObjectIDs, adapter))
            .then(() => that.enumerateAdapters(knownObjectIDs, adapter).then(ret => resultCode = ret))
            .then(() => that.enumerateAdapterDevices(knownObjectIDs, adapter))
            .then(() => that.enumerateAdapterChannels(knownObjectIDs, adapter))
            .then(() => that.enumerateAdapterStateObjects(knownObjectIDs, adapter))
            .then(() => that.enumerateAdapterStates(knownStateIDs, adapter))
            .then(() => that.deleteWWW(adapter))
            .then(() => that.deleteAdapterObjects(knownObjectIDs))
            .then(() => that.deleteAdapterStates(knownStateIDs))
            .then(uninstallNpm)
            .catch(err => console.error(`There was an error uninstalling ${adapter}: ${err}`))
            .then(() => callback(adapter, resultCode))
        ;

    };

    this.deleteInstance = function (adapter, instance, callback) {
        const knownObjectIDs  = [];
        const knownStateIDs   = [];

        that.enumerateAdapterInstances(knownObjectIDs, adapter, instance)
            .then(() => that.enumerateAdapterDevices(knownObjectIDs, adapter, instance))
            .then(() => that.enumerateAdapterChannels(knownObjectIDs, adapter, instance))
            .then(() => that.enumerateAdapterStateObjects(knownObjectIDs, adapter, instance))
            .then(() => that.enumerateAdapterStates(knownStateIDs, adapter, instance))
            .then(() => that.enumerateAdapterDocs(knownObjectIDs, adapter, instance))
            .then(() => that.deleteAdapterObjects(knownObjectIDs))
            .then(() => that.deleteAdapterStates(knownStateIDs))
            .then(() => callback(adapter, instance))
        ;

        // TODO delete meta objects - i think a recursive deletion of all child object would be less effort.
    };
}

module.exports = Install;
