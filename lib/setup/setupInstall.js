/**
 *      Install adapter
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';

/** @class */
function Install(options) {

    const EXIT_CODES       = require('../exitCodes');
    const fs               = require('fs-extra');
    const tools            = require('../tools.js');
    const hostname         = tools.getHostName();
    const path             = require('path');
    const semver           = require('semver');
    const child_process    = require('child_process');
    const request          = require('request');
    const PacketManager    = require('./setupPacketManager');
    const osPlatform       = require('os').platform();
    const deepClone        = require('deep-clone');
    const { URL }          = require('url');

    // todo solve it somehow
    const unsafePermAlways = [tools.appName.toLowerCase() + '.zwave', tools.appName.toLowerCase() + '.amazon-dash', tools.appName.toLowerCase() + '.xbox'];
    const isRootOnUnix     = typeof process.getuid === 'function' && process.getuid() === 0;
    let  JSZip;

    /** @type {Install} */
    const that = this;

    options = options || {};

    if (!options.states)        {
        throw new Error('Invalid arguments: states is missing');
    }
    if (!options.objects)       {
        throw new Error('Invalid arguments: objects is missing');
    }
    if (!options.processExit)   {
        throw new Error('Invalid arguments: processExit is missing');
    }
    if (!options.installNpm)    {
        throw new Error('Invalid arguments: installNpm is missing');
    }
    if (!options.getRepository) {
        throw new Error('Invalid arguments: getRepository is missing');
    }

    const objects            = options.objects;
    const states             = options.states;
    const processExit        = options.processExit;
    const installNpm         = options.installNpm;
    const getRepository      = options.getRepository;
    const params             = options.params || {};
    let mime;

    let packetManager;

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

    const tarballRegex = /\/tarball\/[^/]+$/;

    let installCount   = 0;

    const Upload = require('./setupUpload');
    const upload = new Upload(options);

    function enableAdapters(adapters, isEnable, callback) {
        let count = 0;
        if (adapters && adapters.length) {
            count = adapters.length;
            const ts = Date.now();
            for (let i = 0; i < adapters.length; i++) {
                const updatedObj = {
                    common: {
                        enabled: isEnable
                    },
                    from: 'system.host.' + tools.getHostName() + '.cli',
                    ts: ts
                };
                console.log('host.' + hostname + ' Adapter "' + adapters[i]._id + '" is ' + (isEnable ? 'started' : 'stopped.'));
                objects.extendObject(adapters[i]._id, updatedObj, () => {
                    if (!--count) {
                        callback();
                    }
                });
            }
        }
        if (!count) {
            callback();
        }
    }

    function _writeOneFile(zip, targetName, fileName, callback) {
        zip.files[fileName].async('nodebuffer').then(data => {
            fs.writeFileSync(path.join(targetName, fileName), data);
            callback();
        }, err => callback(err));
    }

    function extractFiles(fileName, targetName, callback) {
        JSZip = JSZip || require('jszip');
        const zip = new JSZip();
        zip.loadAsync(fs.readFileSync(fileName)).then(() => {
            let count = 0;
            for (const fName of Object.keys(zip.files)) {
                if (!fName || fName[fName.length - 1] === '/') {
                    continue;
                }
                count++;
                _writeOneFile(zip, targetName, fName, err => {
                    if (!--count) {
                        callback(err);
                    }
                });
            }
            if (!count) {
                callback();
            }
        });
    }

    this.downloadPacket = function (repoUrl, packetName, options, stoppedList, callback) {
        let url;
        let name;
        if (!options || typeof options !== 'object') {
            options = {};
        }

        if (typeof stoppedList === 'function') {
            callback = stoppedList;
            stoppedList = null;
        }

        if (!repoUrl || typeof repoUrl !== 'object') {
            return getRepository(repoUrl, params, (err, sources) => {
                if (err) {
                    processExit(err);
                } else {
                    this.downloadPacket(sources, packetName, options, stoppedList, callback);
                }
            });
        }

        let debug = false;
        for (let i = 0; i < process.argv.length; i++) {
            if (process.argv[i] === '--debug') {
                debug = true;
                break;
            }
        }

        let version;
        // check if the adapter has format adapter@1.0.0
        if (packetName.includes('@')) {
            const parts = packetName.split('@');
            packetName = parts[0];
            version = parts[1];
        } else {
            // always take version from repository
            if (repoUrl[packetName] && repoUrl[packetName].version) {
                version = repoUrl[packetName].version;
            } else {
                version = '';
            }
        }
        options.packetName = packetName;

        const sources = repoUrl;
        options.unsafePerm = sources[packetName] && sources[packetName].unsafePerm;

        // Check if flag stopBeforeUpdate is true
        if (sources[packetName] && sources[packetName].stopBeforeUpdate && !stoppedList) {
            return objects.getObjectList({startkey: `system.adapter.${packetName}.`, endkey: `system.adapter.${packetName}.香`}, (err, arr) => {
                stoppedList = [];
                if (!err && arr) {
                    for (let id = 0; id < arr.rows.length; id++) {
                        // stop only started instances on this host
                        if (arr.rows[id].value.common.enabled && hostname === arr.rows[id].value.common.host) {
                            stoppedList.push(arr.rows[id].value);
                        }
                    }
                }
                enableAdapters(stoppedList, false, () => that.downloadPacket(sources, packetName + '@' + version, options, stoppedList, callback));
            });
        }

        // try to extract the information from local sources-dist.json
        if (!sources[packetName]) {
            try {
                const sourcesDist = fs.readJSONSync(__dirname + '/../../conf/sources-dist.json');
                sources[packetName] = sourcesDist[packetName];
            } catch {
                // OK
            }
        }

        if (sources[packetName]) {
            url = sources[packetName].url;

            if (url &&
                packetName === 'js-controller' &&
                fs.existsSync(`${__dirname}/../../../../node_modules/${tools.appName}.js-controller`)) {
                url = null;
            }

            if (!url && packetName !== 'example') {
                // Install node modules
                that.npmInstallWithCheck(`${tools.appName.toLowerCase()}.${packetName}${version ? '@' + version : ''}`, options, debug, () => {
                    // command succeeded
                    typeof callback === 'function' && callback(_callback => enableAdapters(stoppedList, true, _callback), packetName);
                });
                return;
            }
            if (url && url.match(tarballRegex)) {
                // Install node modules
                return that.npmInstallWithCheck(url, options, debug, () => {
                    // command succeeded
                    typeof callback === 'function' && callback(_callback => enableAdapters(stoppedList, true, _callback), packetName);
                });
            }
            // Adapter
            if (!url) {
                console.warn(`host.${hostname} Adapter "${packetName}" can be updated only together with ${tools.appName}.js-controller`);
                return typeof callback === 'function' && callback(_callback =>
                    typeof _callback === 'function' && _callback(), packetName);
            }
            name = packetName.replace(/[/ $&*\\]/g, '_');
        } else {
            url = packetName;
            if (!url.includes('http://') && !url.includes('https://') && !url.includes('file://')) {
                console.error('host.' + hostname + ' Unknown packetName ' + packetName);
                processExit(EXIT_CODES.UNKNOWN_PACKET_NAME);
            }
            name = Math.floor(Math.random() * 0xFFFFFFE).toString();
        }

        const { ncp }  = require('ncp');
        ncp.limit =  16;

        console.log(`host.${hostname} download ${url}`);

        tools.getFile(url, name + '.zip', tmpFile => {
            tmpFile = path.normalize(tmpFile);
            console.log(`host.${hostname} unzip ${tmpFile}`);

            // Extract files into tmp/
            extractFiles(tmpFile, path.join(__dirname + '/../../tmp/', name), error => {
                if (error) {
                    console.error(error);
                    processExit(EXIT_CODES.CANNOT_EXTRACT_FROM_ZIP);
                }
                // Find out the first directory
                const dirs = fs.readdirSync(__dirname + '/../../tmp/' + name);
                if (dirs.length) {
                    const source = __dirname + '/../../tmp/' + name + ((dirs.length === 1) ? '/' + dirs[0] : '');
                    // Copy files into adapter or controller
                    if (fs.existsSync(source + '/io-package.json')) {
                        let packetIo;
                        try {
                            packetIo = fs.readJSONSync(source + '/io-package.json');
                        } catch {
                            console.error('host.' + hostname + ' io-package.json has invalid format! Installation terminated.');
                            typeof callback === 'function' && callback(_callback => _callback && _callback(), name, 'Invalid io-package.json!');
                            processExit(EXIT_CODES.INVALID_IO_PACKAGE_JSON);
                        }
                        packetIo.common = packetIo.common || {};
                        packetIo.common.installedFrom = url;
                        fs.writeFileSync(source + '/io-package.json', JSON.stringify(packetIo, null, 2), 'utf8');

                        let destination = __dirname + '/../..';
                        if (!packetIo.common.controller) {
                            if (fs.existsSync(destination + '/../../node_modules')) {
                                destination += '/../' + tools.appName + '.' + packetIo.common.name;
                            } else {
                                destination += '/node_modules/' + tools.appName + '.' + packetIo.common.name;
                            }
                        }

                        destination = path.normalize(destination);

                        console.log(`host.${hostname} copying ${source} to ${destination}(Version: ${packetIo.common.version})`);

                        ncp(source, destination, err => {
                            if (err) {
                                console.error(`host.${hostname} ncp error: ${err}`);
                                processExit(EXIT_CODES.CANNOT_COPY_DIR);
                            }
                            if (tmpFile.substring(0, (path.normalize(__dirname + '/../../tmp/')).length) === path.normalize(__dirname + '/../../tmp/')) {
                                console.log(`host.${hostname} delete ${tmpFile}`);
                                fs.unlinkSync(tmpFile);
                            }
                            console.log(`host.${hostname} delete ${path.normalize(__dirname + '/../../tmp/' + name)}`);
                            tools.rmdirRecursiveSync(__dirname + '/../../tmp/' + name);

                            // Call npm install
                            if (typeof callback === 'function') {
                                typeof callback === 'function' && callback(_callback => enableAdapters(stoppedList, true, _callback), name, packetIo);
                            }

                        });
                    } else {
                        console.error(`host.${hostname} io-package.json not found in ${source}/io-package.json. Invalid packet! Installation terminated.`);
                        typeof callback === 'function' && callback(_callback => _callback && _callback(), name, 'Invalid packet!');
                        processExit(EXIT_CODES.INVALID_IO_PACKAGE_JSON);
                    }
                } else {
                    console.error(`host.${hostname} Packet is empty! Installation terminated.`);
                    typeof callback === 'function' && callback(_callback => _callback && _callback(), name, 'Packet is empty');
                    processExit(EXIT_CODES.MISSING_ADAPTER_FILES);
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
                if (npmVersion) {
                    npmVersion = semver.valid(npmVersion.trim());
                }
                console.log('NPM version: ' + npmVersion);
            } catch (e) {
                console.error('Error trying to check npm version: ' + e);
            }

            if (!npmVersion) {
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                console.error('Aborting install because the npm version could not be checked!');
                console.error('Please check that npm is installed correctly.');
                console.error('Use "npm install -g npm@4" or "npm install -g npm@latest" to install a supported version.');
                console.error('You need to make sure to repeat this step after installing an update to NodeJS and/or npm');
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                processExit(EXIT_CODES.INVALID_NPM_VERSION);
                return;
            }

            if (semver.gte(npmVersion, '5.0.0') && semver.lt(npmVersion, '5.7.1')) {
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                console.error('NPM 5 is only supported starting with version 5.7.1!');
                console.error('Please use "npm install -g npm@4" to downgrade npm to 4.x or ');
                console.error('use "npm install -g npm@latest" to install a supported version of npm!');
                console.error('You need to make sure to repeat this step after installing an update to NodeJS and/or npm');
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                processExit(EXIT_CODES.INVALID_NPM_VERSION);
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
        if (unsafePermAlways.some(adapter => npmUrl.indexOf(adapter) > -1)) {
            options.unsafePerm = true;
        } else if (isRootOnUnix) {
            // If ioBroker or the CLI is executed as root on unix platforms,
            // not providing the --unsafe-perm options means that every pre/postinstall
            // script fails when it uses npm commands.
            options.unsafePerm = true;
        }

        // We don't need --production and --save here.
        // --production doesn't do anything when installing a specific package (which we do here)
        // --save is the default since npm 3
        // Don't use --prefix on Windows, because that has ugly bugs
        const cmd = [
            'npm install',
            npmUrl,
            debug ? '' : '--loglevel error',
            options.unsafePerm ? '--unsafe-perm' : '',
            osPlatform !== 'win32' ? `--prefix "${cwd}"` : ''
        ].filter(arg => !!arg).join(' ');

        console.log(`${cmd} (System call)`);
        // Install node modules as system call

        // System call used for update of js-controller itself,
        // because during installation npm packet will be deleted too, but some files must be loaded even during the install process.
        const exec = require('child_process').exec;
        const child = exec(cmd, {
            windowsHide: true,
            cwd
        });
        tools.pipeLinewise(child.stderr, process.stdout);
        if (debug || params.debug) {
            tools.pipeLinewise(child.stdout, process.stdout);
        }

        // Determine where the packet would be installed if npm succeeds
        /** @type {string} */
        let packetDirName;
        if (options.packetName) {
            packetDirName = tools.appName.toLowerCase() + '.' + options.packetName;
        } else {
            packetDirName = npmUrl.toLowerCase();
            // If the user installed a git commit-ish, the url contains stuff that doesn't belong in a folder name
            // e.g. iobroker/iobroker.javascript#branch-name
            if (packetDirName.indexOf('#') > -1) {
                packetDirName = packetDirName.substr(0, packetDirName.indexOf('#'));
            }
            if (packetDirName.indexOf('/') > -1 && !packetDirName.startsWith('@')) {
                // only scoped packages (e.g. @types/node ) may have a slash in their path
                packetDirName = packetDirName.substr(packetDirName.lastIndexOf('/') + 1);
            }
        }
        const installDir = path.join(cwd, 'node_modules', packetDirName);

        child.on('exit', code => {
            // code 1 is strange error that cannot be explained. Everything is installed but error :(
            if (code && code !== 1) {
                console.error('host.' + hostname + ' Cannot install ' + npmUrl + ': ' + code);
                processExit(EXIT_CODES.CANNOT_INSTALL_NPM_PACKET);
                return;
            }
            // inject the installedFrom information in io-package
            if (fs.existsSync(installDir)) {
                const ioPackPath = path.join(installDir, 'io-package.json');
                let iopack;
                try {
                    iopack = fs.readJSONSync(ioPackPath);
                } catch {
                    iopack = null;
                }
                if (iopack) {
                    iopack.common = iopack.common || {};
                    iopack.common.installedFrom = npmUrl;
                    try {
                        fs.writeFileSync(ioPackPath, JSON.stringify(iopack, null, 2), 'utf8');
                    } catch {
                        // OK
                    }
                }
            } else {
                console.error('host.' + hostname + ' Cannot install ' + npmUrl + ': ' + code);
                processExit(EXIT_CODES.CANNOT_INSTALL_NPM_PACKET);
                return;
            }
            // create file that indicates, that npm was called there
            fs.writeFileSync(path.join(installDir, 'iob_npm.done'), ' ');
            // command succeeded
            typeof callback === 'function' && callback(npmUrl, cwd + '/node_modules');
        });
    };

    this.npmUninstall = function (packageName, options, debug, callback) {
        // TODO: find a nicer way to find the root directory

        // Install node modules
        /** @type {string|string[]} */
        let cwd = __dirname.replace(/\\/g, '/');
        if (fs.existsSync(`${__dirname}/../../../../node_modules/${tools.appName}.js-controller`)) {
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

        // Don't use --prefix on Windows, because that has ugly bugs
        // Instead set the working directory (cwd) of the process
        const cmd = [
            'npm uninstall',
            packageName,
            debug ? '' : '--loglevel error',
            osPlatform !== 'win32' ? `--prefix "${cwd}"` : ''
        ].filter(arg => !!arg).join(' ');

        console.log(`${cmd} (System call)`);
        // Install node modules as system call

        // System call used for update of js-controller itself,
        // because during installation npm packet will be deleted too, but some files must be loaded even during the install process.
        const exec = require('child_process').exec;
        const child = exec(cmd, {
            windowsHide: true,
            cwd
        });
        tools.pipeLinewise(child.stderr, process.stdout);
        if (debug || params.debug) {
            tools.pipeLinewise(child.stdout, process.stdout);
        }
        child.on('exit', code => {
            // code 1 is strange error that cannot be explained. Everything is installed but error :(
            if (code) {
                if (typeof callback === 'function') {
                    callback(`host.${hostname}: Cannot uninstall ${packageName}: ${code}`);
                }
            }
            // command succeeded
            if (callback) {
                callback();
            }
        });
    };

    /** @type {(packageName: string, options: any, debug: boolean) => Promise<void>} */
    this.npmUninstallAsync = tools.promisify(this.npmUninstall, this);

    // this command is executed always on THIS host
    function checkDependencies(adapter, deps, globalDeps, _options, callback) {
        if (!deps && !globalDeps) {
            return callback && callback(adapter);
        }

        deps = tools.parseDependencies(deps);
        globalDeps = tools.parseDependencies(globalDeps);

        // combine both dependencies
        const allDeps = {...deps, ...globalDeps};

        let cnt = 0;
        // Get all installed adapters
        objects.getObjectView('system', 'instance', {}, null, (err, objs) => {
            err && console.error(err);

            if (objs && objs.rows && objs.rows.length) {
                for (const dName in allDeps) {
                    let isFound = false;

                    if (dName === 'js-controller') {
                        const version = allDeps[dName];
                        // Check only if version not *, else we dont have to read io-pack unnecessarily
                        if (version !== '*') {
                            const iopkg_ = fs.readJSONSync(`${__dirname}/../../package.json`);
                            if (!semver.satisfies(iopkg_.version, version, {includePrerelease: true})) {
                                console.error(`host.${hostname} Invalid version of "${dName}". Installed "${iopkg_.version}", required "${version}`);
                                return processExit(EXIT_CODES.INVALID_DEPENDENCY_VERSION);
                            } else {
                                isFound = true;
                            }
                        } else {
                            isFound = true;
                        }
                    }

                    if (!isFound) {
                        let gInstances = [];
                        let locInstances = [];
                        // if global dep get all instances of adapter
                        if (globalDeps[dName] !== undefined) {
                            gInstances = objs.rows.filter(obj => obj && obj.value && obj.value.common && obj.value.common.name === dName);
                        }
                        if (deps[dName] !== undefined) {
                            // local dep get all instances on same host
                            locInstances = objs.rows.filter(obj => obj && obj.value && obj.value.common && obj.value.common.name === dName && obj.value.common.host === hostname);
                            if (locInstances.length  === 0) {
                                console.error(`host.${hostname} Required dependency "${dName}" not found on this host.`);
                            }
                        }

                        // we check, that all existing instances match - respect different versions for local and global deps
                        for (const instance of locInstances) {
                            if (!semver.satisfies(instance.value.common.version, deps[dName], {includePrerelease: true})) {
                                console.error(`host.${hostname} Invalid version of "${dName}". Installed "${instance.value.common.version}", required "${deps[dName]}`);
                                return processExit(EXIT_CODES.INVALID_DEPENDENCY_VERSION);
                            } else {
                                isFound = true;
                            }
                        }

                        for (const instance of gInstances) {
                            if (!semver.satisfies(instance.value.common.version, globalDeps[dName], {includePrerelease: true})) {
                                console.error(`host.${hostname} Invalid version of "${dName}". Installed "${instance.value.common.version}", required "${globalDeps[dName]}`);
                                return processExit(EXIT_CODES.INVALID_DEPENDENCY_VERSION);
                            } else {
                                isFound = true;
                            }
                        }
                    }

                    // if required dependency not found => install it
                    if (!isFound) {
                        cnt++;
                        that.createInstance(dName, _options, name =>
                            upload.uploadAdapter(name, true, false, () =>
                                upload.uploadAdapter(name, false, false, () =>
                                    !--cnt && callback && callback(dName))));
                    }
                }
            }

            !cnt && callback && callback(adapter);
        });
    }

    function setObjects(adapter, _objs, _callback) {
        if (!_objs || _objs.length === 0) {
            _callback(null, adapter);
        } else {
            const obj = _objs.pop();

            obj.from = 'system.host.' + tools.getHostName() + '.cli';
            obj.ts = Date.now();

            objects.extendObject(obj._id, obj, err => {
                if (err) {
                    console.error('host.' + hostname + ' error setObject ' + obj._id + ' ' + err);
                    _callback(EXIT_CODES.CANNOT_SET_OBJECT, adapter);
                } else {
                    console.log('host.' + hostname + ' object ' + obj._id + ' created/updated');
                    setImmediate(setObjects, adapter, _objs, _callback);
                }
            });
        }
    }

    this.uploadStaticObjects = function (adapter, adapterConf, callback) {
        if (typeof adapterConf === 'function') {
            callback = adapterConf;
            adapterConf = null;
        }
        if (!adapterConf) {
            const adapterDir = tools.getAdapterDir(adapter);
            if (!fs.existsSync(adapterDir + '/io-package.json')) {
                console.error('host.' + hostname + ' Adapter directory "' + adapterDir + '" does not exists');
                callback(EXIT_CODES.CANNOT_FIND_ADAPTER_DIR, adapter);
                return;
            }
            try {
                adapterConf = fs.readJSONSync(adapterDir + '/io-package.json');
            } catch (e) {
                console.error('host.' + hostname + ' error: reading io-package.json ' + e, adapter);
                callback(EXIT_CODES.CANNOT_FIND_ADAPTER_DIR, adapter);
                return;
            }
        }

        let objs;
        if (adapterConf.objects && adapterConf.objects.length > 0) {
            objs = adapterConf.objects;
        } else {
            objs = [];
        }

        // check if some dependencies are missing and install them if some found
        checkDependencies(adapter, adapterConf.common.dependencies, adapterConf.common.globalDependencies, params, () => {
            adapterConf.common.installedVersion = adapterConf.common.version;

            objs.push({
                _id:      `system.adapter.${adapterConf.common.name}`,
                type:     'adapter',
                common:   adapterConf.common,
                native:   adapterConf.native
            });

            setObjects(adapter, objs, callback);
        });
    };

    this.installAdapter = async (adapter, repoUrl, callback) => {
        if (typeof repoUrl === 'function') {
            callback = repoUrl;
            repoUrl = null;
        }
        const fullName = adapter;
        if (adapter.indexOf('@') !== -1) {
            adapter = adapter.split('@')[0];
        }
        const adapterDir = tools.getAdapterDir(adapter);

        console.log(`host.${hostname} install adapter ${fullName}`);

        if (!fs.existsSync(adapterDir + '/io-package.json')) {
            if (installCount === 2) {
                console.error(`host.${hostname} Cannot install ${adapter}`);
                processExit(EXIT_CODES.CANNOT_INSTALL_NPM_PACKET);
                return;
            }
            installCount++;

            that.downloadPacket(repoUrl, fullName, null, enableAdapterCallback => that.installAdapter(adapter, () => enableAdapterCallback(callback)));
            return;
        }
        installCount = 0;
        let adapterConf;
        try {
            adapterConf = fs.readJSONSync(adapterDir + '/io-package.json');
        } catch (e) {
            console.error(`host.${hostname} error: reading io-package.json ${e}`);
            processExit(EXIT_CODES.INVALID_IO_PACKAGE_JSON);
        }

        // Check if the operation system is ok
        if (adapterConf.common && adapterConf.common.os) {
            if (typeof adapterConf.common.os === 'string' && adapterConf.common.os !== osPlatform) {
                console.error(`host.${hostname} Adapter does not support current os. Required ${adapterConf.common.os}. Actual platform: ${osPlatform}`);
                processExit(EXIT_CODES.INVALID_OS);
            } else {
                if (!adapterConf.common.os.includes(osPlatform)) {
                    console.error(`host.${hostname} Adapter does not support current os. Required one of ${adapterConf.common.os.join(', ')}. Actual platform: ${osPlatform}`);
                    processExit(EXIT_CODES.INVALID_OS);
                }
            }
        }

        let engineVersion;
        try {
            // read directly from disk and not via require to allow "on the fly" updates of adapters.
            const p = JSON.parse(fs.readFileSync(adapterDir + '/package.json', 'utf8'));
            engineVersion = p && p.engines && p.engines.node;
        } catch {
            console.error(`host.${hostname}: Cannot read and parse "${adapterDir}/package.json"`);
        }

        // check node.js version if defined in package.json
        if (engineVersion) {
            if (!semver.satisfies(process.version.replace(/^v/, ''), engineVersion)) {
                console.error(`host.${hostname} Adapter does not support current nodejs version. Required ${engineVersion}. Actual version: ${process.version}`);
                processExit(EXIT_CODES.INVALID_NODE_VERSION);
            }
        }

        if (adapterConf.common.osDependencies && adapterConf.common.osDependencies[process.platform]) {
            // install linux/osx libraries
            try {
                packetManager = packetManager || new PacketManager();
                await packetManager.install(adapterConf.common.osDependencies[process.platform]);
            } catch (e) {
                console.error(`host.${hostname} Could not install required OS packages: ${e.message}`);
            }
        }

        if (!fs.existsSync(adapterDir + '/node_modules')) {
            // Install node modules
            installNpm(adapter, (err, _adapter) => {
                if (err) {
                    processExit(err);
                } else {
                    upload.uploadAdapter(_adapter, true, true, null, null, () =>
                        upload.uploadAdapter(_adapter, false, true, null, null,() =>
                            callInstallOfAdapter(_adapter, adapterConf, () =>
                                that.uploadStaticObjects(adapter, _err =>
                                    upload.upgradeAdapterObjects(adapter, () =>
                                        callback(adapter))))));
                }
            });
        } else {
            upload.uploadAdapter(adapter, true, true, () =>
                upload.uploadAdapter(adapter, false, true, () =>
                    callInstallOfAdapter(adapter, adapterConf, () =>
                        that.uploadStaticObjects(adapter, _err =>
                            upload.upgradeAdapterObjects(adapter, () =>
                                callback(adapter))))));
        }
    };

    async function callInstallOfAdapter(adapter, config, callback) {
        if (config.common.install) {
            // Install node modules
            const { exec } = require('child_process');
            let cmd = 'node ';

            let fileFullName;
            try {
                fileFullName = await tools.resolveAdapterMainFile(adapter);
            } catch {
                return void callback(adapter);
            }

            cmd += `"${fileFullName}" --install`;
            console.log(`host.${hostname} command: ${cmd}`);
            const child = exec(cmd, {windowsHide: true});
            tools.pipeLinewise(child.stderr, process.stdout);
            child.on('exit', () => callback && callback(adapter));
        } else if (typeof callback === 'function') {
            callback(adapter);
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
        options = options || {};
        options.host = options.host || tools.getHostName();

        if (options.enabled === 'true')  {
            options.enabled = true;
        }
        if (options.enabled === 'false') {
            options.enabled = false;
        }

        if (options.ignoreIfExists !== undefined) {
            ignoreIfExists = !!options.ignoreIfExists;
            delete options.ignoreIfExists;
        }

        mime = mime || require('mime');

        objects.getObject('system.adapter.' + adapter, (err, doc) => {
            // Adapter is not installed - install it now
            if (err || !doc || !doc.common.installedVersion) {
                return that.installAdapter(adapter, () =>
                    that.createInstance(adapter, options, callback));
            }

            // Check if some web pages should be uploaded
            upload.uploadAdapter(adapter, true, false, () => {
                upload.uploadAdapter(adapter, false, false, () => {
                    objects.getObjectView('system', 'instance', {startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, null, (err, res) => {
                        objects.getObject('system.config', (err, systemConfig) => {
                            const defaultLogLevel = systemConfig && systemConfig.common && systemConfig.common.defaultLogLevel;
                            let a;
                            if (err || !res) {
                                console.error('host.' + hostname + ' error: view instanceStats ' + err);
                                processExit(EXIT_CODES.CANNOT_READ_INSTANCES);
                                return;
                            }

                            // Count started instances
                            if (doc.common.singleton && res.rows.length) {
                                if (ignoreIfExists) {
                                    callback && callback();
                                    return;
                                }
                                console.error(`host.${hostname} error: this adapter does not allow multiple instances`);
                                processExit(EXIT_CODES.NO_MULTIPLE_INSTANCES_ALLOWED);
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
                                        console.error(`host.${hostname} error: this adapter does not allow multiple instances on one host`);
                                        processExit(EXIT_CODES.NO_MULTIPLE_INSTANCES_ALLOWED_ON_HOST);
                                        return;
                                    }
                                }
                            }

                            let instance = null;

                            if (options.instance !== undefined) {
                                instance = options.instance;
                                // find max instance
                                if (res.rows.find(obj => parseInt(obj.id.split('.').pop(), 10) === instance)) {
                                    console.error(`host.${hostname} error: instance yet exists`);
                                    processExit(EXIT_CODES.INSTANCE_ALREADY_EXISTS);
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
                            doc = deepClone(doc);

                            instanceObj._id = `system.adapter.${adapter}.${instance}`;
                            instanceObj.type = 'instance';
                            if (instanceObj._rev) {
                                delete instanceObj._rev;
                            }
                            instanceObj.common.enabled = (options.enabled === true || options.enabled === false) ? options.enabled :
                                ((instanceObj.common.enabled === true || instanceObj.common.enabled === false) ? instanceObj.common.enabled : false);
                            instanceObj.common.host = options.host;

                            if (options.port) {
                                instanceObj.native = instanceObj.native || {};
                                instanceObj.native.port = options.port;
                            }

                            if (instanceObj.common.dataFolder && instanceObj.common.dataFolder.indexOf('%INSTANCE%') !== -1) {
                                instanceObj.common.dataFolder = instanceObj.common.dataFolder.replace(/%INSTANCE%/g, instance);
                            }

                            if (defaultLogLevel) {
                                instanceObj.common.logLevel = defaultLogLevel;
                            } else
                            if (!instanceObj.common.logLevel) {
                                instanceObj.common.logLevel = 'info';
                            }

                            console.log(`host.${hostname} create instance ${adapter}`);

                            let objs;
                            if (!instanceObj.common.onlyWWW && instanceObj.common.mode !== 'once') {
                                objs = tools.getInstanceIndicatorObjects(`${adapter}.${instance}`, instanceObj.common.wakeup);
                            } else {
                                objs = [];
                            }

                            if (fs.existsSync(path.join(adapterDir, 'www'))) {
                                objs.push({
                                    _id: `system.adapter.${adapter}.upload`,
                                    type: 'state',
                                    common: {
                                        name: adapter + '.upload',
                                        type: 'number',
                                        read: true,
                                        write: false,
                                        role: 'indicator.state',
                                        unit: '%',
                                        def: 0,
                                        desc: 'Upload process indicator'
                                    },
                                    native: {}
                                });
                            }

                            let adapterConf;

                            try {
                                adapterConf = fs.readJSONSync(`${adapterDir}/io-package.json`);
                            } catch (e) {
                                console.error(`host.${hostname} error: reading io-package.json ${e}`);
                                return void processExit(EXIT_CODES.INVALID_IO_PACKAGE_JSON);
                            }

                            adapterConf.instanceObjects = adapterConf.instanceObjects || [];
                            adapterConf.objects = adapterConf.objects || [];

                            const defStates = [];

                            // Create only for this instance the predefined in io-package.json objects
                            // It is not necessary to write "system.adapter.name.N." in the object '_id'
                            for (let i = 0; i < adapterConf.instanceObjects.length; i++) {
                                adapterConf.instanceObjects[i]._id = `${adapter}.${instance}${adapterConf.instanceObjects[i]._id ? ('.' + adapterConf.instanceObjects[i]._id) : ''}`;

                                if (adapterConf.instanceObjects[i].common) {
                                    if (adapterConf.instanceObjects[i].common.name) {
                                        // if name has many languages
                                        if (typeof adapterConf.instanceObjects[i].common.name === 'object') {
                                            Object.keys(adapterConf.instanceObjects[i].common.name).forEach(lang => adapterConf.instanceObjects[i].common.name[lang] = adapterConf.instanceObjects[i].common.name[lang].replace('%INSTANCE%', instance));
                                        } else {
                                            adapterConf.instanceObjects[i].common.name = adapterConf.instanceObjects[i].common.name.replace('%INSTANCE%', instance);
                                        }
                                    }
                                    if (adapterConf.instanceObjects[i].common.desc) {
                                        // if name has many languages
                                        if (typeof adapterConf.instanceObjects[i].common.desc === 'object') {
                                            Object.keys(adapterConf.instanceObjects[i].common.desc).forEach(lang => adapterConf.instanceObjects[i].common.desc[lang] = adapterConf.instanceObjects[i].common.desc[lang].replace('%INSTANCE%', instance));
                                        } else {
                                            adapterConf.instanceObjects[i].common.desc = adapterConf.instanceObjects[i].common.desc.replace('%INSTANCE%', instance);
                                        }
                                    }
                                }

                                objs.push(adapterConf.instanceObjects[i]);
                                if (adapterConf.instanceObjects[i].common && adapterConf.instanceObjects[i].common.def !== undefined) {
                                    defStates.push({
                                        id: adapterConf.instanceObjects[i]._id,
                                        val: adapterConf.instanceObjects[i].common.def
                                    });
                                }
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
                                    const obj = objs.pop();

                                    try {
                                        tools.validateGeneralObjectProperties(obj);
                                    } catch (e) {
                                        // todo: in the future we will not create this object
                                        console.warn(`host.${hostname} Object ${obj._id} is invalid: ${e.message}`);
                                        console.warn(`host.${hostname} This object will not be created in future versions. Please report this to the developer.`);
                                    }

                                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                    obj.ts = Date.now();
                                    objects.setObject(obj._id, obj, err => {
                                        if (err) {
                                            console.error(`host.${hostname} error: ${err}`);
                                        } else {
                                            console.log(`host.${hostname} object ${obj._id} created`);
                                        }
                                        setTimeout(setObjs, 25);
                                    });
                                } else {
                                    setStates();
                                }
                            }

                            // sets the default states if any given
                            function setStates() {
                                if (defStates.length > 0) {
                                    const defState = defStates.pop();
                                    defState.ack = true;
                                    defState.from = `system.host.${tools.getHostName()}.cli`;
                                    states.setState(defState.id, defState, err => {
                                        if (err) {
                                            console.error(`host.${hostname} error: ${err}`);
                                        } else {
                                            console.log(`host.${hostname} Set default value of ${defState.id}: ${defState.val}`);
                                        }
                                        setTimeout(setStates, 25);
                                    });
                                } else {
                                    instanceObj.from = 'system.host.' + tools.getHostName() + '.cli';
                                    instanceObj.ts = Date.now();

                                    objects.setObject(instanceObj._id, instanceObj, err => {
                                        if (err) {
                                            console.error(`host.${hostname} error: ${err}`);
                                        } else {
                                            console.log(`host.${hostname} object ${instanceObj._id} created`);
                                        }

                                        if (callback) {
                                            callback(adapter);
                                        } else {
                                            processExit(EXIT_CODES.NO_ERROR);
                                        }
                                    });
                                }
                            }

                            setObjs();
                        });
                    });
                });
            });
        });
    };

    /**
     * Enumerate all instances of an adapter
     * @type {(knownObjIDs: string[], notDeleted: any[], adapter: string, instance?: string) => Promise<void>}
     */
    this.enumerateAdapterInstances = function enumerateInstances(knownObjIDs, notDeleted, adapter, instance) {
        if (!notDeleted) {
            notDeleted = [];
        }

        // We need to filter the instances using RegExp, because the naive approach with startkey/endkey
        //   startkey: system.adapter.mqtt
        //   endkey: system.adapter.mqtt.\u9999
        // matches system.adapter.mqtt AND system.adapter.mqtt-client
        const instanceRegex = instance !== undefined
            ? new RegExp(`^system\\.adapter\\.${adapter}\\.${instance}$`)
            : new RegExp(`^system\\.adapter\\.${adapter}\\.\\d+$`);

        return getObjectViewAsync('system', 'instance', {
            startkey: `system.adapter.${adapter}${instance !== undefined ? `.${instance}` : ''}`,
            endkey:   `system.adapter.${adapter}${instance !== undefined ? `.${instance}` : ''}\u9999`
        }, null).then(doc => {
            // add non-duplicates to the list (only for this host)
            const newObjIDs = doc.rows
                // only the ones with an ID that matches the pattern
                .filter(row => row && row.value && row.value._id)
                .filter(row => instanceRegex.test(row.value._id))
                // only the ones on this host
                .filter(row => {
                    if (!row.value.common || !row.value.common.host || row.value.common.host === hostname) {
                        return true;
                    } else {
                        if (notDeleted.indexOf(row.value._id) === -1) {
                            notDeleted.push(row.value._id);
                        }
                        return false;
                    }
                })
                .map(row => row.value._id)
                .filter(id => knownObjIDs.indexOf(id) === -1)
            ;
            knownObjIDs.push.apply(knownObjIDs, newObjIDs);

            if (newObjIDs.length > 0) {
                console.log(`host.${hostname} Counted ${newObjIDs.length} instances of ${adapter}${instance !== undefined ? `.${instance}` : ''}`);
            }
        }).catch(e =>
            e !== tools.ERRORS.ERROR_NOT_FOUND && e.message !== tools.ERRORS.ERROR_NOT_FOUND && console.error('host.' + hostname + ' error: ' + e.message));
    };

    /**
     * Enumerate all meta objects of an adapter
     * @type {(knownObjIDs: string[], adapter: string, metaFilesToDelete: string[]) => Promise<void>}
     */
    this.enumerateAdapterMeta = async function enumerateMeta(knownObjIDs, adapter, metaFilesToDelete) {
        try {
            const doc = await getObjectViewAsync('system', 'meta', {
                startkey: `${adapter}.`,
                endkey: `${adapter}.\u9999`
            });

            if (doc.rows.length !== 0) {
                const adapterRegex = new RegExp(`^${adapter}\\.`);

                // add non-duplicates to the list
                const newObjs = doc.rows
                    .filter(row => row && row.value && row.value._id)
                    .map(row => row.value._id)
                    .filter(id => adapterRegex.test(id))
                    .filter(id => knownObjIDs.indexOf(id) === -1)
                ;
                knownObjIDs.push.apply(knownObjIDs, newObjs);
                // meta ids can also be present as files
                metaFilesToDelete.push.apply(metaFilesToDelete, newObjs);

                if (newObjs.length) {
                    console.log(`host.${hostname} Counted ${newObjs.length} meta of ${adapter}`);
                }
            }
        } catch (e) {
            e !== tools.ERRORS.ERROR_NOT_FOUND && e.message !== tools.ERRORS.ERROR_NOT_FOUND && console.error(`host.${hostname} error: ${e.message}`);
        }
    };

    /**
     * @type {(knownObjIDs: string[], adapter: string) => Promise<number>}
     * @returns 22 if the adapter could not be deleted, 0 otherwise
     */
    this.enumerateAdapters = async (knownObjIDs, adapter) => {
        // This does not really enumerate the adapters, but finds the adapter object
        // if it exists and adds it to the list
        try {
            const obj = await getObjectAsync(`system.adapter.${adapter}`);
            if (obj) {
                if (obj.common && obj.common.nondeletable) {
                    // If the adapter is non-deletable, mark it as not installed
                    console.log('host.' + hostname + ' Adapter ' + adapter + ' cannot be deleted completely, because it is marked non-deletable.');
                    obj.installedVersion = '';
                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = Date.now();
                    await setObjectAsync(obj._id, obj);

                    return EXIT_CODES.CANNOT_DELETE_NON_DELETABLE;
                } else {
                    // The adapter is deletable, remember it for deletion
                    knownObjIDs.push(obj._id);
                    console.log(`host.${hostname} Counted 1 adapter for ${adapter}`);

                    return EXIT_CODES.NO_ERROR;
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * Enumerates the devices of an adapter (or instance)
     * @param {string[]} knownObjIDs The already known object ids
     * @param {string} adapter The adapter to enumerate the devices for
     * @param {string} [instance] The instance to enumerate the devices for (optional)
     */
    this.enumerateAdapterDevices = function enumerateAdapterDevices(knownObjIDs, adapter, instance) {
        const adapterRegex = new RegExp(`^${adapter}${instance ? `\\.${instance}` : ''}\\.`);

        return getObjectViewAsync('system', 'device', {
            startkey: `${adapter}${instance !== undefined ? `.${instance}` : ''}`,
            endkey: `${adapter}${instance !== undefined ? `.${instance}` : ''}\u9999`
        }, null).then(doc => {
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
                    console.log(`host.${hostname} Counted ${newObjs.length} devices of ${adapter}${instance !== undefined ? `.${instance}` : ''}`);
                }
            }
        }).catch(e =>
            e !== tools.ERRORS.ERROR_NOT_FOUND && e.message !== tools.ERRORS.ERROR_NOT_FOUND && console.error('host.' + hostname + ' error: ' + e.message));
    };

    /**
     * Enumerates the channels of an adapter (or instance)
     * @param {string[]} knownObjIDs The already known object ids
     * @param {string} adapter The adapter to enumerate the channels for
     * @param {string} [instance] The instance to enumerate the channels for (optional)
     */
    this.enumerateAdapterChannels = function enumerateAdapterChannels(knownObjIDs, adapter, instance) {
        const adapterRegex = new RegExp(`^${adapter}${instance ? `\\.${instance}` : ''}\\.`);

        return getObjectViewAsync('system', 'channel', {
            startkey: `${adapter}${instance !== undefined ? `.${instance}` : ''}`,
            endkey: `${adapter}${instance !== undefined ? `.${instance}` : ''}\u9999`
        }, null).then(doc => {
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
        }).catch(e =>
            e !== tools.ERRORS.ERROR_NOT_FOUND && e.message !== tools.ERRORS.ERROR_NOT_FOUND && console.error('host.' + hostname + ' error: ' + e.message));
    };

    /**
     * Enumerates the states of an adapter (or instance)
     * @param {string[]} knownObjIDs The already known object ids
     * @param {string} adapter The adapter to enumerate the states for
     * @param {string} [instance] The instance to enumerate the states for (optional)
     */
    this.enumerateAdapterStateObjects = function enumerateAdapterStateObjects(knownObjIDs, adapter, instance) {
        const adapterRegex = new RegExp(`^${adapter}${instance ? `\\.${instance}` : ''}\\.`);
        const sysAdapterRegex = new RegExp(`^system\\.adapter\\.${adapter}${instance ? `\\.${instance}` : ''}\\.`);

        return getObjectViewAsync('system', 'state', {
            startkey: `${adapter}${instance !== undefined ? `.${instance}` : ''}`,
            endkey: `${adapter}${instance !== undefined ? `.${instance}` : ''}\u9999`
        }, null).then(doc => {
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
                    console.log(`host.${hostname} Counted ${newObjs.length} states of ${adapter}${instance ? `.${instance}` : ''}`);
                }
            }

            return getObjectViewAsync('system', 'state', {
                startkey: `system.adapter.${adapter}${instance !== undefined ? `.${instance}` : ''}`,
                endkey: `system.adapter.${adapter}${instance !== undefined ? `.${instance}` : ''}\u9999`
            }, null).then(doc => {
                if (doc.rows.length !== 0) {
                    // add non-duplicates to the list
                    const newObjs = doc.rows
                        .filter(row => row && row.value && row.value._id)
                        .map(row => row.value._id)
                        .filter(id => sysAdapterRegex.test(id))
                        .filter(id => knownObjIDs.indexOf(id) === -1);
                    knownObjIDs.push.apply(knownObjIDs, newObjs);
                    if (newObjs.length > 0) {
                        console.log(`host.${hostname} Counted ${newObjs.length} states of system.adapter.${adapter}${instance ? `.${instance}` : ''}`);
                    }
                }
            }).catch(e =>
                e !== tools.ERRORS.ERROR_NOT_FOUND && e.message !== tools.ERRORS.ERROR_NOT_FOUND && console.error('host.' + hostname + ' error: ' + e.message));

        }).catch(e =>
            e !== tools.ERRORS.ERROR_NOT_FOUND && e.message !== tools.ERRORS.ERROR_NOT_FOUND && console.error('host.' + hostname + ' error: ' + e.message));
    };

    // TODO: is enumerateAdapterDocs the correct name???
    /**
     * Enumerates the docs of an adapter (or instance)
     * @param {string[]} knownObjIDs The already known object ids
     * @param {string} adapter The adapter to enumerate the states for
     * @param {string} [instance] The instance to enumerate the states for (optional)
     */
    this.enumerateAdapterDocs = function enumerateAdapterDocs(knownObjIDs, adapter, instance) {
        const adapterRegex = new RegExp(`^${adapter}${instance ? `\\.${instance}` : ''}\\.`);
        const sysAdapterRegex = new RegExp(`^system\\.adapter\\.${adapter}${instance ? `\\.${instance}` : ''}\\.`);

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
        }).catch(e =>
            e !== tools.ERRORS.ERROR_NOT_FOUND && e.message !== tools.ERRORS.ERROR_NOT_FOUND && console.error('host.' + hostname + ' error: ' + e.message));
    };

    /**
     * Enumerate all state IDs of an adapter (or instance)
     * @type {(knownStateIDs: string[], adapter: string, instance?: string) => Promise<void>}
     */
    this.enumerateAdapterStates = async (knownStateIDs, adapter, instance) => {
        for (const pattern of [
            `io.${adapter}.${instance ? instance + '.' : ''}*`,
            `messagebox.${adapter}.${instance ? instance + '.' : ''}*`,
            `log.${adapter}.${instance ? instance + '.' : ''}*`,
            `${adapter}.${instance ? instance + '.' : ''}*`,
            `system.adapter.${adapter}.${instance ? instance + '.' : ''}*`
        ]) {
            try {
                const ids = await getKeysAsync(pattern);
                if (ids && ids.length) {
                    // add non-duplicates to the list
                    const newStates = ids
                        .filter(id => knownStateIDs.indexOf(id) === -1);
                    knownStateIDs.push.apply(knownStateIDs, newStates);
                    if (newStates.length > 0) {
                        console.log(`host.${hostname} Counted ${newStates.length} states (${pattern}) from states`);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    /**
     * delete WWW pages, objects and meta files
     * @type {(adapter: string, metaFilesToDelete: string[]) => Promise<void>}
     */
    this.deleteAdapterFiles = async (adapter, metaFilesToDelete) => {
        // special files, which are not meta (vis widgets), combined with meta object ids
        const filesToDelete = [
            {id: `vis`, name: `widgets/${adapter}`},
            {id: `vis`, name: `widgets/${adapter}.html`},
            {id: adapter},
            {id: `${adapter}.admin`},
            ...metaFilesToDelete.map(id => ({id}))
        ];

        for (const file of filesToDelete) {
            const id = typeof file === 'object' ? file.id : file;
            try {
                await unlinkAsync(id, file.name || '');
                console.log(`host.${hostname} file ${id + (file.name ? `/${file.name}` : '')} deleted`);
            } catch (e) {
                e !== tools.ERRORS.ERROR_NOT_FOUND && e.message !== tools.ERRORS.ERROR_NOT_FOUND && console.error(`Cannot delete ${id} files folder: ${e}`);
            }
        }

        for (const objId of [adapter, `${adapter}.admin`]) {
            try {
                await delObjectAsync(objId);
                console.log(`host.${hostname} object ${objId} deleted`);
            } catch (e) {
                e !== tools.ERRORS.ERROR_NOT_FOUND && e.message !== tools.ERRORS.ERROR_NOT_FOUND && console.error(`host.${hostname} error: ${e}`);
            }
        }
    };

    /**
     * @type {(stateIDs: string[]) => Promise<void>}
     */
    this.deleteAdapterStates = async stateIDs => {
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
                await delStateAsync(stateIDs.pop());
            } catch (e) { // yep that works!
                e !== tools.ERRORS.ERROR_NOT_FOUND && e.message !== tools.ERRORS.ERROR_NOT_FOUND && console.error(e);
            }
        }
    };

    /**
     * @type {(objIDs: string[]) => Promise<void>}
     */
    this.deleteAdapterObjects = async objIDs => {
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
            // try to delete the current object
            try {
                const id = objIDs.pop();
                await delObjectAsync(id);
                await tools.removeIdFromAllEnums(objects, id);
            } catch (e) {
                e !== tools.ERRORS.ERROR_NOT_FOUND && e.message !== tools.ERRORS.ERROR_NOT_FOUND && console.error('host.' + hostname + ' error: ' + e);
            }
        }
    };

    this.deleteAdapter = function (adapter, callback) {
        const knownObjectIDs      = [];
        const metaFilesToDelete = [];
        const notDeletedObjectIDs = [];
        const knownStateIDs       = [];
        let resultCode            = EXIT_CODES.NO_ERROR;

        const uninstallNpm = async () => {
            try {
                // find the adapter's io-package.json
                const adapterNpm = `${tools.appName}.${adapter}`;
                const ioPack = require(`${adapterNpm}/io-package.json`); // yep, it's that easy

                if (!ioPack.common || !ioPack.common.nondeletable) {
                    await that.npmUninstallAsync(adapterNpm, null, false);
                    // after uninstalling we have to restart the defined adapters
                    if (ioPack.common.restartAdapters) {
                        if (!Array.isArray(ioPack.common.restartAdapters)) {
                            // its not an array, now it can only be a single adapter as string
                            if (typeof ioPack.common.restartAdapters !== 'string') {
                                return;
                            }
                            ioPack.common.restartAdapters = [ioPack.common.restartAdapters];
                        }
                        if (ioPack.common.restartAdapters.length && ioPack.common.restartAdapters[0]) {
                            const instances = await tools.getAllInstancesAsync(ioPack.common.restartAdapters, objects);
                            if (instances && instances.length) {
                                for (const instance of instances) {
                                    const obj = await getObjectAsync(instance);
                                    // if instance is enabled
                                    if (obj && obj.common && obj.common.enabled) {
                                        try {
                                            obj.common.enabled = false; // disable instance
                                            obj.from = `system.host.${tools.getHostName()}.cli`;
                                            obj.ts = Date.now();

                                            await setObjectAsync(obj._id, obj);

                                            obj.common.enabled = true; // enable instance

                                            obj.from = `system.host.${tools.getHostName()}.cli`;
                                            obj.ts = Date.now();

                                            await setObjectAsync(obj._id, obj);
                                            console.log(`Adapter "${obj._id}" restarted.`);
                                        } catch (err) {
                                            console.error(`Cannot restart adapter "${obj._id}": ${err}`);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                console.error(`Error deleting adapter ${adapter} from disk: ${e}`);
                console.error(`You might have to delete it yourself!`);
            }
        };

        // detect if all instances on this host, if not so the www and admin must not be deleted
        return that.enumerateAdapterInstances(knownObjectIDs, notDeletedObjectIDs, adapter).then(() => {
            if (notDeletedObjectIDs.length) {
                // just delete all instances on this host and then delete npm
                const tasks = knownObjectIDs.map(id => that.deleteInstance(adapter, id.split('.').pop()));
                return Promise.all(tasks)
                    .then(uninstallNpm)
                    .catch(err => console.error(`There was an error uninstalling ${adapter} on ${hostname}: ${err.message}`))
                    .then(() => callback(adapter, resultCode));
            } else {
                return that.enumerateAdapterMeta(knownObjectIDs, adapter, metaFilesToDelete)
                    .then(() => that.enumerateAdapters(knownObjectIDs, adapter).then(ret => resultCode = ret))
                    .then(() => that.enumerateAdapterDevices(knownObjectIDs, adapter))
                    .then(() => that.enumerateAdapterChannels(knownObjectIDs, adapter))
                    .then(() => that.enumerateAdapterStateObjects(knownObjectIDs, adapter))
                    .then(() => that.enumerateAdapterStates(knownStateIDs, adapter))
                    .then(() => that.enumerateAdapterDocs(knownObjectIDs, adapter))
                    .then(() => that.deleteAdapterFiles(adapter, metaFilesToDelete))
                    .then(() => that.deleteAdapterObjects(knownObjectIDs))
                    .then(() => that.deleteAdapterStates(knownStateIDs))
                    .then(uninstallNpm)
                    .catch(err => console.error(`There was an error uninstalling ${adapter}: ${err.message}`))
                    .then(() => callback && callback(adapter, resultCode));
            }
        });
    };

    this.deleteInstance = function (adapter, instance, callback) {
        const knownObjectIDs  = [];
        const knownStateIDs   = [];

        return that.enumerateAdapterInstances(knownObjectIDs, null, adapter, instance)
            .then(() => that.enumerateAdapterDevices(knownObjectIDs, adapter, instance))
            .then(() => that.enumerateAdapterChannels(knownObjectIDs, adapter, instance))
            .then(() => that.enumerateAdapterStateObjects(knownObjectIDs, adapter, instance))
            .then(() => that.enumerateAdapterStates(knownStateIDs, adapter, instance))
            .then(() => that.enumerateAdapterDocs(knownObjectIDs, adapter, instance))
            .then(() => that.deleteAdapterObjects(knownObjectIDs))
            .then(() => that.deleteAdapterStates(knownStateIDs))
            .then(() => callback && callback(adapter, instance))
        ;

        // TODO delete meta objects - i think a recursive deletion of all child object would be less effort.
    };

    this.installAdapterFromUrl = /**
     * @param {string} url
     * @param {string} name
     * @param {() => any} callback
     */
    function(url, name, callback) {
        // If the user provided an URL, try to parse it into known ways to represent a Github URL
        let parsedUrl;
        try {
            parsedUrl = new URL(url);
        } catch { /* ignore, not a valid URL */ }

        let debug = false;
        for (let i = 0; i < process.argv.length; i++) {
            if (process.argv[i] === '--debug') {
                debug = true;
                break;
            }
        }

        if (parsedUrl && parsedUrl.hostname === 'github.com') {
            if (!tools.isGithubPathname(parsedUrl.pathname)) {
                console.log(`Cannot install from GitHub. Invalid URL ${url}`);
                return void tools.maybeCallback(callback);
            }

            // This is a URL we can parse
            const { repo, user, commit } = tools.parseGithubPathname(parsedUrl.pathname);

            if (!commit) {
                // No commit given, try to get it from the API
                request.get(
                    {
                        url: `http://api.github.com/repos/${user}/${repo}/commits`,
                        json: true,
                        headers: { 'User-Agent': 'ioBroker Adapter install' }
                    },
                    (err, res, data) => {
                        if (err) {
                            console.log(`Info: Can not get current GitHub commit, only remember that we installed from GitHub: ${err}`);
                            // Install using the npm Github URL syntax `npm i user/repo_name`:
                            return void that.installAdapterFromUrl(`${user}/${repo}`, name, callback);
                        } else if (res.statusCode !== 200) {
                            console.log(`Info: Can not get current GitHub commit, only remember that we installed from GitHub. Status: ${res.statusCode}${data && data.message? ` (${data.message})`: ''}`);
                            // Install using the npm Github URL syntax `npm i user/repo_name`:
                            return void that.installAdapterFromUrl(`${user}/${repo}`, name, callback);
                        } else if (data && Array.isArray(data) && data.length >= 1 && data[0].sha) {
                            // Install using the npm Github URL syntax `npm i user/repo_name#commit-ish`:
                            return void that.installAdapterFromUrl(`${user}/${repo}#${data[0].sha}`, name, callback);
                        } else {
                            console.log('Info: Can not get current GitHub commit, only remember that we installed from GitHub. No SHA available');
                            // Install using the npm Github URL syntax `npm i user/repo_name`:
                            return void that.installAdapterFromUrl(`${user}/${repo}`, name, callback);
                        }
                    }
                );
                return;
            } else {
                // We've extracted all we need from the URL
                return void that.installAdapterFromUrl(`${user}/${repo}#${commit}`, name, callback);
            }
        }
        console.log(`install ${url}`);

        // Try to extract name from URL
        if (!name) {
            const reNpmPacket = new RegExp('^' + tools.appName + '\\.([-_\\w\\d]+)(@.*)?$', 'i');
            const match = reNpmPacket.exec(url); // we have iobroker.adaptername@1.2.3
            if (match) {
                name = match[1];
            } else if (url.match(/\.(tgz|gz|zip|tar\.gz)$/)) {
                const parts = url.split('/');
                const last = parts.pop();
                const mm = last.match(/\.([-_\w\d]+)-[.\d]+/);
                if (mm) {
                    name = mm[1];
                }
            } else {
                const githubUrlParts = tools.parseShortGithubUrl(url);
                // Try to extract the adapter name from the github url if possible
                // Otherwise fall back to the complete URL
                if (githubUrlParts) {
                    name = githubUrlParts.repo;
                } else {
                    name = url;
                }
                // Remove the leading `iobroker.` from the name
                const reG = new RegExp(tools.appName + '\\.([-_\\w\\d]+)$', 'i');
                const match = reG.exec(name);
                if (match) {
                    name = match[1];
                }
            }
        }

        const options = {
            packetName: name
        };
        that.npmInstallWithCheck(url, options, debug, (_url, installDir) => {
            if (name) {
                upload.uploadAdapter(name, true, true, () =>
                    upload.uploadAdapter(name, false, true, () =>
                        upload.upgradeAdapterObjects(name, callback)));
            } else {
                // Try to find io-package.json with newest date
                const dirs = fs.readdirSync(installDir);
                let date = null;
                let dir  = null;
                for (let i = 0; i < dirs.length; i++) {
                    if (fs.existsSync(installDir + '/' + dirs[i] + '/io-package.json')) {
                        const stat = fs.statSync(installDir + '/' + dirs[i] + '/io-package.json');
                        if (!date || stat.mtime.getTime() > date.getTime()) {
                            dir  = dirs[i];
                            date = stat.mtime;
                        }
                    }
                }
                // if modify time is not older than one hour
                if (dir && (new Date()).getTime() - date.getTime() < 3600000) {
                    name = dir.substring(tools.appName.length + 1);
                    upload.uploadAdapter(name, true, true, () =>
                        upload.uploadAdapter(name, false, true, () =>
                            upload.upgradeAdapterObjects(name, callback)));
                } else {
                    return void callback();
                }
            }
        });
    };
}

module.exports = Install;
