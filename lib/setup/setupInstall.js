function Install(options) {
    var fs       = require('fs');
    var tools    = require(__dirname + '/../tools.js');
    var extend   = require('node.extend');
    var hostname = tools.getHostName();
    var path     = require('path');
    var semver = require('semver');
    // todo solve it somehow
    var unsafePermAlways = [tools.appName.toLowerCase() + '.zwave'];
    var JSZip;

    var that = this;

    options = options || {};

    if (!options.states)        throw 'Invalid arguments: states is missing';
    if (!options.objects)       throw 'Invalid arguments: objects is missing';
    if (!options.processExit)   throw 'Invalid arguments: processExit is missing';
    if (!options.installNpm)    throw 'Invalid arguments: installNpm is missing';
    if (!options.getRepository) throw 'Invalid arguments: getRepository is missing';

    var objects           = options.objects;
    var states            = options.states;
    var processExit       = options.processExit;
    var installNpm        = options.installNpm;
    var getRepository     = options.getRepository;
    var params            = options.params || {};
    var semver;
    var mime;

    var installCount      = 0;

    var Upload = require(__dirname + '/setupUpload.js');
    var upload = new Upload(options);

    function enableAdapters(adapters, isEnable, callback) {
        var count = 0;
        if (adapters) {
            count = adapters.length;
            var ts = new Date().getTime();
            for (var i = 0; i < adapters.length; i++) {
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
        var zip = new JSZip();
        zip.loadAsync(fs.readFileSync(fileName)).then(function () {
            var count = 0;
            for (var fName in zip.files) {
                if (!fName || fName[fName.length - 1] === '/') continue;
                count++;
                _writeOneFile(zip, targetName, fName, function (err) {
                    if (!--count) callback(err);
                });
            }
            if (!count) callback();
        });
    }

    this.downloadPacket = function (repoUrl, packetName, options, stoppedList, callback) {
        var url;
        var name;
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
        var version;
        if (packetName.indexOf('@') !== -1) {
            var parts = packetName.split('@');
            packetName = parts[0];
            version = parts[1];
        } else {
            version = '';
        }

        var sources = repoUrl;
        options.unsafePerm = sources[packetName] && sources[packetName].unsafePerm;

        // Check if flag stopBeforeUpdate is true
        if (sources[packetName] && sources[packetName].stopBeforeUpdate && !stoppedList) {
            objects.getObjectList({startkey: 'system.adapter.' + packetName + '.', endkey: 'system.adapter.' + packetName + '.\u9999'}, function (err, arr) {
                stoppedList = [];
                if (!err && arr) {
                    for (var id = 0; id < arr.rows.length; id++) {
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
                var sourcesDist = JSON.parse(fs.readFileSync(__dirname + '/../../conf/sources-dist.json'));
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

        var ncp = require('ncp').ncp;
        ncp.limit =  16;

        console.log('host.' + hostname + ' download ' + url);

        tools.getFile(url, name + '.zip', function (tmpFile) {
            tmpFile = path.normalize(tmpFile);
            console.log('host.' + hostname + ' unzip ' + tmpFile);

            // Extract files into tmp/
            extractFiles(tmpFile, path.join(__dirname + '/../../tmp/', name), function (/* err */) {
                // Find out the first directory
                var dirs = fs.readdirSync(__dirname + '/../../tmp/' + name);
                if (dirs.length) {
                    var source = __dirname + '/../../tmp/' + name + ((dirs.length === 1) ? '/' + dirs[0] : '');
                    // Copy files into adapter or controller
                    if (fs.existsSync(source + '/io-package.json')) {
                        var packetIo;
                        try {
                            packetIo = JSON.parse(fs.readFileSync(source + '/io-package.json'));
                        } catch (e) {
                            console.error('host.' + hostname + ' io-package.json has invalid format! Installation terminated.');
                            if (typeof callback === 'function') callback(name, 'Invalid io-package.json!');
                            processExit(6);
                        }

                        var destination = __dirname + '/../..';
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
            }, function (error) {
                console.error(error);
                processExit(12);
            });
        });
    };

    this.npmInstallWithCheck = function (npmUrl, options, debug, callback) {
        var that = this;
        // Get npm version
        try {
            var nodeVersion = semver.valid(process.version);
            var npmVersion;
            try {
                npmVersion = child_process.execSync('npm -v', { encoding: "utf8" });
                if (npmVersion) npmVersion = semver.valid(npmVersion.trim());
                console.log('NPM version: ' + npmVersion);
            } catch (e) {
                console.error('Error trying to check npm version: ' + errResp);
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
                console.error('use "npm install -g npm@>=5.7.1" to install a supported version of npm 5!')
                console.error('You need to make sure to repeat this step after installing an update to NodeJS and/or npm');
                console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                processExit(25);
                return;
            }

            that.npmInstall(npmUrl, options, debug, callback);
        }
        catch (e) {
            console.error('Could not check npm version. Assuming that correct version is installed.');
        }
    };

    this.npmInstall = function (npmUrl, options, debug, callback) {
        if (typeof options !== 'object') {
            options = {};
        }

        // Install node modules
        var cwd = __dirname.replace(/\\/g, '/');
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
        for (var a = 0; a < unsafePermAlways.length; a++) {
            if (npmUrl.indexOf(unsafePermAlways[a]) !== -1) {
                options.unsafePerm = true;
                break;
            }
        }

        var cmd = 'npm install ' + npmUrl + (options.unsafePerm ? ' --unsafe-perm' : '') + ' --production --save --prefix "' + cwd + '"';

        console.log(cmd + ' (System call)');
        // Install node modules as system call

        // System call used for update of js-controller itself,
        // because during installation npm packet will be deleted too, but some files must be loaded even during the install process.
        var exec = require('child_process').exec;
        var child = exec(cmd);
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
    };

    this.uploadStaticObjects = function (adapter, adapterConf, callback) {
        if (typeof adapterConf === 'function') {
            callback = adapterConf;
            adapterConf = null;
        }
        if (!adapterConf) {
            var adapterDir = tools.getAdapterDir(adapter);
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

        var objs;
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

            var cnt = 0;
            // Get all installed adapters
            objects.getObjectView('system', 'instance', {}, null, function (err, objs) {
                if (err) console.error(err);
                if (objs && objs.rows && objs.rows.length) {
                    for (var i = 0; i < deps.length; i++) {
                        var dName;
                        var version = null;
                        var isFound = false;

                        if (typeof deps[i] === 'object') {
                            for (var d in deps[i]) {
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
                                if (!semver) semver = require('semver');
                                var iopkg_ = JSON.parse(fs.readFileSync(__dirname + '/../../package.json'));
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
                            for (var t = 0; t < objs.rows.length; t++) {
                                if (objs.rows[t] && objs.rows[t].value && objs.rows[t].value.common && objs.rows[t].value.common.name === dName) {

                                    if (version !== null) {
                                        if (!semver) semver = require('semver');
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
                    var obj = _objs.pop();

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
        var adapterDir = tools.getAdapterDir(adapter);

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
        var adapterConf;
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
        var path_ = tools.getAdapterDir(adapter);

        if (config.common.install && fs.existsSync(path_ + '/io-package.json')) {
            // Install node modules
            var exec = require('child_process').exec;
            var cmd = 'node ';

            var fileName = config.common.main || 'main.js';
            if (!fs.existsSync(path_ + '/' + fileName)) {
                fileName = adapter + '.js';
            }
            cmd += '"' + path  + '/' + fileName + '" --install';
            console.log('host.' + hostname + ' command: ' + cmd);
            var child = exec(cmd);
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
        var adapterDir = tools.getAdapterDir(adapter);
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }
        var ignoreIfExists = false;
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
                        var a;
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

                        var adapterConf;
                        var instance = null;
                        // find max instance
                        for (a = 0; a < res.rows.length; a++) {
                            if (instance === null || parseInt(res.rows[a].id.split('.').pop(), 10) > instance) {
                                instance = parseInt(res.rows[a].id.split('.').pop(), 10);
                            }
                        }
                        if (instance === null) {
                            instance = 0;
                        } else {
                            instance++;
                        }

                        var instanceObj = doc;
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

                        var _id = 'system.adapter.' + adapter + '.' + instance;

                        var objs;
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
                        for (var i = 0; i < adapterConf.instanceObjects.length; i++) {
                            adapterConf.instanceObjects[i]._id = adapter + '.' + instance + (adapterConf.instanceObjects[i]._id ? ('.' + adapterConf.instanceObjects[i]._id) : '');

                            if (adapterConf.instanceObjects[i].common && adapterConf.instanceObjects[i].common.name) {
                                adapterConf.instanceObjects[i].common.name = adapterConf.instanceObjects[i].common.name.replace('%INSTANCE%', instance);
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
                                var obj = objs.pop();
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

    this.deleteAdapter = function (adapter, callback) {
        var delObj          = [];
        var delState        = [];
        var taskCnt         = 0;
        var resultCode      = 0;
        var adapterRegex    = new RegExp('^' + adapter);
        var sysAdapterRegex = new RegExp('^system\\.adapter\\.' + adapter);

        function delStates() {
            if (delState.length && (delState.length % 200) === 0) {
                console.log('host.' + hostname + ' Only ' + delState.length + ' states left to be deleted.');
            }
            if (!delState.length) {
                if (callback) callback(adapter, resultCode);
            } else {
                states.delState(delState.pop(), function (err) {
                    if (err) console.error(err);
                    setImmediate(delStates);
                });
            }
        }

        function startDeleteStates() {
            if (delState.length > 1000) {
                console.log('host.' + hostname + ' Deleting ' + delState.length + ' state(s). Be patient...');
            } else if (delObj.length) {
                console.log('host.' + hostname + ' Deleting ' + delState.length + ' state(s).');
            }
            delStates();
        }

        function delObjects() {
            if (delObj.length && (delObj.length % 200) === 0) {
                console.log('host.' + hostname + ' Only ' + delObj.length + ' objects left to be deleted.');
            }
            if (!delObj.length) {
                setTimeout(startDeleteStates, 50);
            } else {
                objects.delObject(delObj.pop(), function (err) {
                    if (err) console.error(err);
                    setImmediate(delObjects);
                });
            }
        }

        function delStatesAndObjects() {
            if (delObj.length > 1000) {
                console.log('host.' + hostname + ' Deleting ' + delObj.length + ' object(s). Be patient...');
            } else if (delObj.length) {
                console.log('host.' + hostname + ' Deleting ' + delObj.length + ' object(s).');
            }

            delObjects();
        }

        // Delete instances
        taskCnt++;
        objects.getObjectView('system', 'instance', {startkey: 'system.adapter.' + adapter, endkey: 'system.adapter.' + adapter + '\u9999'}, null, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length === 0) {
                    console.log('host.' + hostname + ' no instances of adapter ' + adapter + ' found');
                } else {
                    var count = 0;

                    for (var i = 0; i < doc.rows.length; i++) {
                        if (delObj.indexOf(doc.rows[i].value._id) === -1) delObj.push(doc.rows[i].value._id);
                        count++;
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' instances of ' + adapter);
                }
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        objects.getObjectView('system', 'meta', {startkey: adapter + '.meta', endkey: adapter + '.meta\u9999'}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (delObj.indexOf(doc.rows[i].value._id) === -1) delObj.push(doc.rows[i].value._id);
                    }
                    console.log('host.' + hostname + ' Counted ' + doc.rows.length + ' meta of ' + adapter);
                }
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        objects.getObjectView('system', 'adapter', {startkey: 'system.adapter.' + adapter, endkey: 'system.adapter.' + adapter + '\u9999'}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    var count = 0;

                    for (var i = 0; i < doc.rows.length; i++) {
                        var adapterConf = doc.rows[i].value;

                        if (adapterConf.common.nondeletable) {
                            console.log('host.' + hostname + ' Adapter ' + adapter + ' cannot be deleted completely, because non-deletable.');
                            resultCode = 22;
                            taskCnt++;
                            objects.getObject(adapterConf._id, function (err, oldObj) {
                                if (err) console.error(err);
                                if (oldObj) {
                                    oldObj = extend(true, oldObj, {installedVersion: ''});
                                } else {
                                    oldObj = {installedVersion: ''};
                                }
                                oldObj.from = 'system.host.' + tools.getHostName() + '.cli';
                                oldObj.ts = new Date().getTime();
                                objects.setObject(adapterConf._id, oldObj, function () {
                                    taskCnt--;
                                    if (!taskCnt) delStatesAndObjects();
                                });
                            });

                            continue;
                        }

                        if (delObj.indexOf(adapterConf._id) === -1) delObj.push(adapterConf._id);

                        objects.delObject(adapterConf._id);
                        count++;

                        // Delete adapter folder
                        if (!adapterConf.common.noRepository) {
                            if (fs.existsSync(__dirname + '/../../node_modules/' + tools.appName + '.' + adapter)) {
                                console.log('host.' + hostname + ' delete ' + __dirname + '/../../node_modules/' + tools.appName + '.' + adapter);
                                tools.rmdirRecursiveSync(__dirname + '/../../node_modules/' + tools.appName + '.' + adapter);
                            }
                            if (fs.existsSync(__dirname + '/../../../../node_modules/' + tools.appName + '.js-controller') &&
                                fs.existsSync(__dirname + '/../../../../node_modules/' + tools.appName + '.' + adapter)) {
                                console.log('host.' + hostname + ' delete ' + __dirname + '/../../../' + tools.appName + '.' + adapter);
                                tools.rmdirRecursiveSync(__dirname + '/../../../' + tools.appName + '.' + adapter);
                            }
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' adapters for ' + adapter);
                }
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        // Delete devices
        taskCnt++;
        objects.getObjectView('system', 'device', {}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    var count = 0;
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (adapterRegex.test(doc.rows[i].value._id)) {
                            if (delObj.indexOf(doc.rows[i].value._id) === -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' devices of ' + adapter);
                }
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        // Delete channels
        taskCnt++;
        objects.getObjectView('system', 'channel', {}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    var count = 0;
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (adapterRegex.test(doc.rows[i].value._id)) {
                            if (delObj.indexOf(doc.rows[i].value._id) === -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' channels of ' + adapter);
                }
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        // Delete states
        taskCnt++;
        objects.getObjectView('system', 'state', {}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    var count = 0;

                    for (var i = 0; i < doc.rows.length; i++) {
                        if (adapterRegex.test(doc.rows[i].value._id) || sysAdapterRegex.test(doc.rows[i].value._id)) {
                            if (delObj.indexOf(doc.rows[i].value._id) === -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' states of ' + adapter);
                }
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        // Delete WWW pages
        taskCnt++;
        objects.delObject(adapter, function (err, obj, id) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (obj) console.log('host.' + hostname + ' object ' + adapter + ' deleted');
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        // Delete WWW/admin pages
        taskCnt++;
        objects.delObject(adapter + '.admin', function (err, obj, id) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (obj) console.log('host.' + hostname + ' object ' + adapter + '.admin deleted');
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('io.' + adapter + '.*', function (err, obj) {
            if (err) console.error(err);
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (delState.indexOf(obj[i]) === -1) delState.push(obj[i]);
                }
                if (obj.length) console.log('host.' + hostname + ' Counted ' + obj.length + ' states (io.' + adapter + '.*) from states');
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('messagebox.' + adapter + '.*', function (err, obj) {
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (delState.indexOf(obj[i]) === -1) delState.push(obj[i]);
                }
                if (obj.length) console.log('host.' + hostname + ' Counted ' + obj.length + ' states (' + adapter + '.*) from states');
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('log.' + adapter + '.*', function (err, obj) {
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (delState.indexOf(obj[i]) === -1) delState.push(obj[i]);
                }
                if (obj.length) console.log('host.' + hostname + ' Counted ' + obj.length + ' states (' + adapter + '.*) from states');
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys(adapter + '.*', function (err, obj) {
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (delState.indexOf(obj[i]) === -1) delState.push(obj[i]);
                }
                if (obj.length) console.log('host.' + hostname + ' Counted ' + obj.length + ' states (' + adapter + '.*) from states');
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('system.adapter.' + adapter + '.*', function (err, obj) {
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (delState.indexOf(obj[i]) === -1) delState.push(obj[i]);
                }
                if (obj.length) console.log('host.' + hostname + ' Counted ' + obj.length + ' states (system.adapter.' + adapter + '.*) from states');
            }

            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        objects.unlink(adapter, '', function (err) {
            if (err && err !== 'Not exists') console.error('Cannot delete adapter files folder: ' + err);
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        objects.unlink(adapter + '.admin', '', function (err) {
            if (err && err !== 'Not exists') console.error('Cannot delete adapter.admin files folder: ' + err);
            if (!--taskCnt) delStatesAndObjects();
        });

        if (!taskCnt) delStatesAndObjects();

        // todo: npm remove ' + tools.appName + '.' + adapter because of npm5

        try {
            var dir   = require.resolve(tools.appName + '.' + adapter + '/package.json');
            var pack1 = require(path.join(path.dirname(dir), 'io-package.json'));
            if (!pack1.common || !pack1.common.nondeletable) {
                console.log('host.' + hostname + ' delete ' + path.normalize(path.dirname(dir)));
                tools.rmdirRecursiveSync(path.normalize(path.dirname(dir)));
            }
        } catch (e) {
            // ignore
        }

        // Delete physically adapter from disk
        if (fs.existsSync(__dirname + '/../../node_modules/' + tools.appName + '.' + adapter + '/io-package.json')) {
            var _pack = require(__dirname + '/../../node_modules/' + tools.appName + '.' + adapter + '/io-package.json');
            if (!_pack.common || !_pack.common.nondeletable) {
                console.log('host.' + hostname + ' delete ' + path.normalize(__dirname + '/../../node_modules/' + tools.appName + '.' + adapter));
                tools.rmdirRecursiveSync(__dirname + '/../../node_modules/' + tools.appName + '.' + adapter);
            }
        }
        if (fs.existsSync(__dirname + '/../../../../node_modules/' + tools.appName + '.js-controller') &&
            fs.existsSync(__dirname + '/../../../../node_modules/' + tools.appName + '.' + adapter + '/io-package.json')) {
            var __pack = require(__dirname + '/../../../' + tools.appName + '.' + adapter + '/io-package.json');
            if (!__pack.common || !__pack.common.nondeletable) {
                console.log('host.' + hostname + ' delete ' + path.normalize(__dirname + '/../../../' + tools.appName + '.' + adapter));
                tools.rmdirRecursiveSync(__dirname + '/../../../' + tools.appName + '.' + adapter);
            }
        }
    };

    this.deleteInstance = function (adapter, instance, callback) {
        var delObj =   [];
        var delState = [];
        var taskCnt =  0;
        var adapterRegex    = new RegExp('^' + adapter + '\\.' + instance);
        var sysAdapterRegex = new RegExp('^system\\.adapter\\.' + adapter + '\\.' + instance);

        function delStates() {
            if (delState.length && (delState.length % 200) === 0) {
                console.log('host.' + hostname + ' Only ' + delState.length + ' states left to be deleted.');
            }
            if (!delState.length) {
                if (callback) callback(adapter, instance);
            } else {
                states.delState(delState.pop(), function (/* err */) {
                    setImmediate(delStates);
                });
            }
        }
        function startDeleteStates() {
            if (delState.length > 1000) {
                console.log('host.' + hostname + ' Deleting ' + delState.length + ' state(s). Be patient...');
            } else if (delObj.length) {
                console.log('host.' + hostname + ' Deleting ' + delState.length + ' state(s).');
            }
            delStates();
        }

        function delObjects() {
            if (delObj.length && (delObj.length % 200) === 0) {
                console.log('host.' + hostname + ' Only ' + delObj.length + ' objects left to be deleted.');
            }
            if (!delObj.length) {
                setTimeout(startDeleteStates, 50);
            } else {
                objects.delObject(delObj.pop(), function (/* err */) {
                    setImmediate(delObjects);
                });
            }
        }
        function delStatesAndObjects() {
            if (delObj.length > 1000) {
                console.log('host.' + hostname + ' Deleting ' + delObj.length + ' object(s). Be patient...');
            } else if (delObj.length) {
                console.log('host.' + hostname + ' Deleting ' + delObj.length + ' object(s).');
            }

            delObjects();
        }

        // Delete instance
        taskCnt++;
        objects.getObjectView('system', "instance", {startkey: 'system.adapter.' + adapter + '.' + instance, endkey: 'system.adapter.' + adapter + '.' + instance}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length === 0) {
                    console.log('no instances of adapter ' + adapter + '.' + instance + ' found');
                } else {
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (delObj.indexOf(doc.rows[i].value._id) === -1) delObj.push(doc.rows[i].value._id);
                    }
                    console.log('host.' + hostname + ' Counted ' + doc.rows.length + ' instances of ' + adapter + '.' + instance);
                }
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        objects.getObjectList({include_docs: true}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    var count = 0;
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (doc.rows[i] && doc.rows[i].value && doc.rows[i].value._id &&
                            (adapterRegex.test(doc.rows[i].value._id) || sysAdapterRegex.test(doc.rows[i].value._id))) {
                            if (delObj.indexOf(doc.rows[i].value._id) === -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' objects of ' + adapter + '.' + instance);
                }
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        // TODO delete meta objects - i think a recursive deletion of all child object would be less effort.

        // Delete devices
        taskCnt++;
        objects.getObjectView('system', "device", {}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    var count = 0;
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (doc.rows[i] && doc.rows[i].value && doc.rows[i].value._id &&
                            (adapterRegex.test(doc.rows[i].value._id) || sysAdapterRegex.test(doc.rows[i].value._id))) {
                            if (delObj.indexOf(doc.rows[i].value._id) === -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' devices of ' + adapter + '.' + instance);
                }
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        // Delete channels
        taskCnt++;
        objects.getObjectView('system', "channel", {}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    var count = 0;
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (doc.rows[i] && doc.rows[i].value && doc.rows[i].value._id &&
                            (adapterRegex.test(doc.rows[i].value._id) || sysAdapterRegex.test(doc.rows[i].value._id))) {
                            if (delObj.indexOf(doc.rows[i].value._id) === -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' channels of ' + adapter + '.' + instance);
                }
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        // Delete states
        taskCnt++;
        objects.getObjectView('system', "state", {}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length === 0) {
                    console.log('host.' + hostname + ' no states ' + adapter + ' found');
                } else {
                    var count = 0;
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (doc.rows[i] && doc.rows[i].value && doc.rows[i].value._id &&
                            (adapterRegex.test(doc.rows[i].value._id) || sysAdapterRegex.test(doc.rows[i].value._id))) {
                            if (delObj.indexOf(doc.rows[i].value._id) === -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' objects of states of ' + adapter + '.' + instance);
                }
            }
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('system.adapter.' + adapter + '.' + instance + '*', function (err, obj) {
            for (var i = 0; i < obj.length; i++) {
                if (delState.indexOf(obj[i]) === -1) delState.push(obj[i]);
            }
            if (obj.length) console.log ('host.' + hostname + ' Counted ' + obj.length + ' states "system.adapter.' + adapter + '.' + instance + '*" from states');
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('io.' + adapter + '.' + instance + '*', function (err, obj) {
            for (var i = 0; i < obj.length; i++) {
                if (delState.indexOf(obj[i]) === -1) delState.push(obj[i]);
            }
            if (obj.length) console.log ('host.' + hostname + ' Counted ' + obj.length + ' states "io.' + adapter + '.' + instance + '*" from states');
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('log.' + adapter + '.' + instance + '*', function (err, obj) {
            for (var i = 0; i < obj.length; i++) {
                if (delState.indexOf(obj[i]) === -1) delState.push(obj[i]);
            }
            if (obj.length) console.log ('host.' + hostname + ' Counted ' + obj.length + ' states "log.' + adapter + '.' + instance + '*" from states');
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('messagebox.' + adapter + '.' + instance + '*', function (err, obj) {
            for (var i = 0; i < obj.length; i++) {
                if (delState.indexOf(obj[i]) === -1) delState.push(obj[i]);
            }
            if (obj.length) console.log ('host.' + hostname + ' Counted ' + obj.length + ' states "messagebox.' + adapter + '.' + instance + '*" from states');
            if (!--taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys(adapter + '.' + instance + '*', function (err, obj) {
            for (var i = 0; i < obj.length; i++) {
                if (delState.indexOf(obj[i]) === -1) delState.push(obj[i]);
            }
            if (obj.length) console.log ('host.' + hostname + ' Counted ' + obj.length + ' states "' + adapter + '.' + instance + '*" from states');

            if (!--taskCnt) delStatesAndObjects();
        });

        if (!taskCnt) delStatesAndObjects();
    };
}

module.exports = Install;
