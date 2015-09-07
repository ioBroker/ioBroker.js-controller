function Install(options) {
    var fs       = require('fs');
    var tools    = require(__dirname + '/../tools.js');
    var extend   = require('node.extend');
    var hostname = require('os').hostname();
    var path     = require('path');

    var that = this;

    options = options || {};

    if (!options.states)        throw "Invalid arguments: states is missing";
    if (!options.objects)       throw "Invalid arguments: objects is missing";
    if (!options.processExit)   throw "Invalid arguments: processExit is missing";
    if (!options.installNpm)    throw "Invalid arguments: installNpm is missing";
    if (!options.getRepository) throw "Invalid arguments: getRepository is missing";

    var objects           = options.objects;
    var states            = options.states;
    var processExit       = options.processExit;
    var installNpm        = options.installNpm;
    var getRepository     = options.getRepository;
    var yargs             = options.yargs;
    var semver;
    var mime;

    var installCount      = 0;

    var Upload = require(__dirname + '/setupUpload.js');
    var upload = new Upload(options);

    function enableAdapters(adapters, isEnable, callback) {
        var count = 0;
        if (adapters) {
            count = adapters.length;
            for (var i = 0; i < adapters.length; i++) {
                adapters[i].common.enabled = isEnable;
                console.log('host.' + hostname + ' Adapter "' + adapters[i]._id + '" is ' + (isEnable ? 'started' : 'stopped.'));
                objects.setObject(adapters[i]._id, adapters[i], function () {
                    count--;
                    if (!count) callback();
                });
            }
        }
        if (!count) callback();
    }

    this.downloadPacket = function (repoUrl, packetName, useSystemNpm, stoppedList, callback) {
        var url;
        var name;

        if (typeof stoppedList == 'function') {
            callback    = stoppedList;
            stoppedList = null;
        }

        if (!repoUrl || typeof repoUrl != 'object') {
            getRepository(repoUrl, function (sources) {
                that.downloadPacket(sources, packetName, useSystemNpm, stoppedList, callback);
            });
            return;
        }

        var sources = repoUrl;
        if (!useSystemNpm) {
            var config = require(tools.getConfigFileName());
            // force system npm
            if (1 || config.network.useSystemNpm) useSystemNpm = true;
        }

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
                    that.downloadPacket(sources, packetName, useSystemNpm, stoppedList, callback);
                });
            });
            return;
        }

        if (sources[packetName]) {
            url = sources[packetName].url;

            if (url &&
                packetName == 'js-controller' &&
                fs.existsSync(__dirname + '/../../../../node_modules/iobroker.js-controller')) {
                url = null;
            }

            if (!url && packetName != 'example') {
                // Install node modules
                that.npmInstall('iobroker.' + packetName, useSystemNpm, false, function () {
                    // command succeeded
                    enableAdapters(stoppedList, true, function () {
                        if (callback) callback(packetName);
                    });
                });
                return;
            }

            // Adapter
            if (!url) {
                console.warn('host.' + hostname + ' Adapter "' + packetName + '" can be updated only together with ioBroker.js-controller');
                if (typeof callback === 'function') callback(packetName);
                return;
            }
            name = packetName.replace(/[\/ $&*\\]/g, '_');
        } else {
            url = packetName;
            if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1 && url.indexOf('file://') == -1) {
                console.error('host.' + hostname + ' Unknown packetName ' + packetName);
                processExit(5);
            }
            name = Math.floor(Math.random() * 0xFFFFFFE);
        }

        var AdmZip = require('adm-zip');
        var ncp =    require('ncp').ncp;
        ncp.limit =  16;

        console.log('host.' + hostname + ' download ' + url);

        tools.getFile(url, name + '.zip', function (tmpFile) {
            console.log('host.' + hostname + ' unzip ' + tmpFile);

            // Extract files into tmp/
            var zip = new AdmZip(tmpFile);
            zip.extractAllTo(__dirname + '/../../tmp/' + name, true);
            // Find out the first directory
            var dirs = fs.readdirSync(__dirname + '/../../tmp/' + name);
            if (dirs.length) {
                var source = __dirname + '/../../tmp/' + name + ((dirs.length == 1) ? '/' + dirs[0] : '');
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

                    var destination = __dirname + "/../..";
                    if (!packetIo.common.controller) destination += '/adapter/' + packetIo.common.name;

                    console.log('host.' + hostname + ' copying ' + source + ' to ' + destination + '(Version: ' + packetIo.common.version + ')');

                    ncp(source, destination, function (err) {
                        if (err) {
                            console.error('host.' + hostname + ' ncp error: ' + err);
                            processExit(7);
                        }
                        if (tmpFile.substring((__dirname + '/../../tmp/').length) == __dirname + '/../../tmp/') {
                            console.log('host.' + hostname + ' delete ' + tmpFile);
                            fs.unlinkSync(tmpFile);
                        }
                        console.log('host.' + hostname + ' delete ' + __dirname + '/../../tmp/' + name);
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
    };

    this.npmInstall = function (npmUrl, useSystemNpm, debug, callback) {
        // Install node modules
        var cwd = __dirname.replace(/\\/g, '/');
        if (fs.existsSync(__dirname + '/../../../../node_modules/iobroker.js-controller')) {
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
        var cmd = 'npm install ' + npmUrl + ' --production --prefix "' + cwd + '"';

        if (!useSystemNpm) {
            console.log(cmd);
            tools.initNpm(cwd, function (er, npm) {
                npm.commands.install([npmUrl], function (er, data) {
                    if (er) {
                        console.error('host.' + hostname + ' Cannot install ' + npmUrl + ': ' + er);
                        processExit(25);
                    }
                    // command succeeded, and data might have some info
                    if (callback) callback(npmUrl, cwd + '/node_modules');
                });
            });
        } else {
            console.log(cmd + ' (System call)');
            // Install node modules as system call

            // System call used for update of js-controller itself,
            // because during installation npm packet will be deleted too, but some files must be loaded even during the install process.
            var exec = require('child_process').exec;
            var child = exec(cmd);
            child.stderr.pipe(process.stdout);
            if (debug || (yargs && yargs.argv && yargs.argv.debug)) {
                child.stdout.pipe(process.stdout);
            }
            child.on('exit', function (code, signal) {
                if (code) {
                    console.error('host.' + hostname + ' Cannot install ' + npmUrl + ': ' + code);
                    processExit(25);
                }
                // command succeeded
                if (callback) callback(npmUrl, cwd + '/node_modules');
            });
        }
    };

    function installAdapter(adapter, callback) {
        var adapterDir = tools.getAdapterDir(adapter);

        console.log('host.' + hostname + ' install adapter ' + adapter);

        if (!fs.existsSync(adapterDir + '/io-package.json')) {
            if (installCount == 2) {
                console.error('host.' + hostname + ' Cannot install ' + adapter);
                processExit(13);
                return;
            }
            installCount++;

            that.downloadPacket(null, adapter, false, function () {
                installAdapter(adapter, callback);
            });
            return;
        }
        installCount = 0;
        var adapterConf;
        try {
            adapterConf = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json'));
        } catch (e) {
            console.error('host.' + hostname + ' error: reading io-package.json ' + e);
            processExit(14);
        }

        // Check if the operation system is ok
        if (adapterConf.common && adapterConf.common.os) {
            if (typeof adapterConf.common.os == 'string' && adapterConf.common.os != require('os').platform()) {
                console.error('host.' + hostname + ' Adapter does not support current os. Required ' + adapterConf.common.os + '. Actual platform: ' + require('os').platform());
                processExit(15);
            } else {
                if (adapterConf.common.os.indexOf(require('os').platform()) == -1) {
                    console.error('host.' + hostname + ' Adapter does not support current os. Required one of ' + adapterConf.common.os.join(', ') + '. Actual platform: ' + require('os').platform());
                    processExit(16);
                }
            }
        }

        function checkDependencies(deps, _options, callback) {
            if (!deps || !deps.length) {
                if (callback) callback(adapter);
                return;
            }

            var cnt = 0;
            // Get all installed adapters
            objects.getObjectView("system", "instance", {}, null, function (err, objs) {
                if (objs && objs.rows && objs.rows.length) {
                    for (var i = 0; i < deps.length; i++) {
                        var dName;
                        var version = null;
                        var isFound = false;

                        if (typeof deps[i] == 'object') {
                            for (var d in deps[i]) {
                                dName = d;
                                version = deps[i][d];
                                break;
                            }
                        } else {
                            dName = deps[i];
                        }

                        if (dName == 'js-controller') {
                            // Check only version
                            if (version !== null) {
                                if (!semver) semver = require('semver');
                                var iopkg = JSON.parse(fs.readFileSync(__dirname + '/../../package.json'));
                                if (!semver.satisfies(iopkg.version, version)) {
                                    console.error('host.' + hostname + ' Invalid version of "' + dName + '". Installed "' + iopkg.version + '", required "' + version);
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
                                if (objs.rows[t] && objs.rows[t].value && objs.rows[t].value.common && objs.rows[t].value.common.name == dName) {

                                    if (version !== null) {
                                        if (!semver) semver = require('semver');
                                        var iopkg = JSON.parse(fs.readFileSync(__dirname + '/../../package.json'));
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

        function install() {
            var objs = [];
            if (adapterConf.objects && adapterConf.objects.length > 0) objs = adapterConf.objects;

            checkDependencies(adapterConf.common.dependencies, yargs.argv, function () {
                adapterConf.common.installedVersion = adapterConf.common.version;

                objs.push({
                    _id:      'system.adapter.' + adapterConf.common.name,
                    type:     'adapter',
                    common:   adapterConf.common,
                    native:   adapterConf.native
                });

                function setObject(_callback) {
                    if (objs.length === 0) {
                        _callback(adapter);
                    } else {
                        var obj = objs.pop();
                        objects.extendObject(obj._id, obj, function (err, res) {
                            if (err) {
                                console.error('host.' + hostname + ' error setObject ' + obj._id + ' ' + err);
                                processExit(17);
                            } else {
                                console.log('host.' + hostname + ' object ' + obj._id + ' created');
                                setTimeout(function (_cb) {
                                    setObject(_cb);
                                }, 50, _callback);
                            }
                        });
                    }
                }

                setObject(callback);
            });
        }

        if (!fs.existsSync(adapterDir + '/node_modules')) {
            // Install node modules
            installNpm(adapter, function (_adapter) {
                upload.uploadAdapter(_adapter, true, true, function () {
                    upload.uploadAdapter(_adapter, false, true, function () {
                        callInstallOfAdapter(_adapter, adapterConf, function () {
                            install();
                        });
                    });
                });
            });
        } else {
            upload.uploadAdapter(adapter, true, true, function () {
                upload.uploadAdapter(adapter, false, true, function () {
                    callInstallOfAdapter(adapter, adapterConf, function () {
                        install();
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

            var fileName = config.common.main || "main.js";
            if (!fs.existsSync(path_ + '/' + fileName)) {
                fileName = adapter + '.js';
            }

            cmd += '"adapter/' + adapter + '/' + fileName + '" --install';
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
        if (typeof options == 'function') {
            callback = options;
            options = null;
        }
        if (!options) options = {};
        if (!options.host) options.host = require('os').hostname();
        if (options.enabled === 'true')  options.enabled = true;
        if (options.enabled === 'false') options.enabled = false;

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
                    objects.getObjectView('system', 'instanceStats', {startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, null, function (err, res) {
                        if (err || !res) {
                            console.error('host.' + hostname + ' error: view instanceStats ' + err);
                            processExit(18);
                            return;
                        }
                        var adapterConf;
                        var instance = (res.rows && res.rows[0] && res.rows[0].value ? res.rows[0].value.max + 1 : 0);

                        // Count started instances
                        if (doc.common.singleton && instance > 0) {
                            console.error('host.' + hostname + ' error: this adapter does not allow multiple instances');
                            processExit(19);
                            return;
                        }

                        // TODO: singletonHost one on host
                        if (doc.common.singletonHost && instance > 0) {
                            console.error('host.' + hostname + ' error: this adapter does not allow multiple instances on one host');
                            processExit(21);
                            return;
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
                        if (!instanceObj.common.onlyWWW && instanceObj.common.mode != 'once') {
                            objs = [
                                {
                                    _id:    _id + '.alive',
                                    type:   'state',
                                    common: {
                                        name: adapter + '.' + instance + '.alive',
                                        type: 'boolean',
                                        role: 'indicator.state'
                                    },
                                    native: {}
                                },
                                {
                                    _id:    _id + '.connected',
                                    type:   'state',
                                    common: {
                                        name: adapter + '.' + instance + '.connected',
                                        type: 'boolean',
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
                                        role: 'indicator.state',
                                        unit: 'seconds'
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
                                    type: 'boolean',
                                    role: 'adapter.wakeup'
                                },
                                native: {}
                            });
                        }
                        if (instanceObj.common.run) {
                            objs.push({
                                _id:    _id + '.run',
                                type:   'state',
                                common: {
                                    name: adapter + '.' + instance + '.run',
                                    type: 'boolean',
                                    role: 'adapter.run'
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
                                objects.setObject(obj._id, obj, function (err, res) {
                                    if (err) {
                                        console.error('host.' + hostname + ' error: ' + err);
                                    } else {
                                        console.log('host.' + hostname + ' object ' + obj._id + ' created');
                                    }
                                    setTimeout(setObjs, 25);
                                });
                            } else {
                                objects.setObject(instanceObj._id, instanceObj, function (err, res) {
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
                    setTimeout(delStates, 0);
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
                    setTimeout(delObjects, 0);
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
        objects.getObjectView("system", "instance", {startkey: 'system.adapter.' + adapter, endkey: 'system.adapter.' + adapter + '\u9999'}, null, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length === 0) {
                    console.log('host.' + hostname + ' no instances of adapter ' + adapter + ' found');
                } else {
                    var count = 0;

                    for (var i = 0; i < doc.rows.length; i++) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                        count++;
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' instances of ' + adapter);
                }
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        objects.getObjectView("system", "meta", {startkey: adapter + '.meta', endkey: adapter + '.meta\u9999'}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                    }
                    console.log('host.' + hostname + ' Counted ' + doc.rows.length + ' meta of ' + adapter);
                }
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        objects.getObjectView("system", "adapter", {startkey: 'system.adapter.' + adapter, endkey: 'system.adapter.' + adapter + '\u9999'}, function (err, doc) {
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
                                if (oldObj) {
                                    oldObj = extend(true, oldObj, {installedVersion: ''});
                                } else {
                                    oldObj = {installedVersion: ''};
                                }
                                objects.setObject(adapterConf._id, oldObj, function () {
                                    taskCnt--;
                                    if (!taskCnt) delStatesAndObjects();
                                });
                            });

                            continue;
                        }

                        if (delObj.indexOf(adapterConf._id) == -1) delObj.push(adapterConf._id);

                        objects.delObject(adapterConf._id);
                        count++;

                        // Delete adapter folder
                        if (!adapterConf.common.noRepository) {
                            if (fs.existsSync(__dirname + '/../../adapter/' + adapter)) {
                                console.log('host.' + hostname + ' delete ' + __dirname + '/../../adapter/' + adapter);
                                tools.rmdirRecursiveSync(__dirname + '/../../adapter/' + adapter);
                            }
                            if (fs.existsSync(__dirname + '/../../node_modules/iobroker.' + adapter)) {
                                console.log('host.' + hostname + ' delete ' + __dirname + '/../../node_modules/iobroker.' + adapter);
                                tools.rmdirRecursiveSync(__dirname + '/../../node_modules/iobroker.' + adapter);
                            }
                            if (fs.existsSync(__dirname + '/../../../../node_modules/iobroker.js-controller') &&
                                fs.existsSync(__dirname + '/../../../../node_modules/iobroker.' + adapter)) {
                                console.log('host.' + hostname + ' delete ' + __dirname + '/../../../iobroker.' + adapter);
                                tools.rmdirRecursiveSync(__dirname + '/../../../iobroker.' + adapter);
                            }
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' adapters for ' + adapter);
                }
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        // Delete devices
        taskCnt++;
        objects.getObjectView("system", "device", {}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    var count = 0;
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (adapterRegex.test(doc.rows[i].value._id)) {
                            if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' devices of ' + adapter);
                }
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        // Delete channels
        taskCnt++;
        objects.getObjectView("system", "channel", {}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    var count = 0;
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (adapterRegex.test(doc.rows[i].value._id)) {
                            if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' channels of ' + adapter);
                }
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        // Delete states
        taskCnt++;
        objects.getObjectView("system", "state", {}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    var count = 0;

                    for (var i = 0; i < doc.rows.length; i++) {
                        if (adapterRegex.test(doc.rows[i].value._id) || sysAdapterRegex.test(doc.rows[i].value._id)) {
                            if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' states of ' + adapter);
                }
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });
        // Delete WWW pages
        taskCnt++;
        objects.delObject(adapter, function (err, obj, id) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (obj) console.log('host.' + hostname + ' object ' + adapter + ' deleted');
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        // Delete WWW/admin pages
        taskCnt++;
        objects.delObject(adapter + '.admin', function (err, obj, id) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (obj) console.log('host.' + hostname + ' object ' + adapter + '.admin deleted');
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('io.' + adapter + '.*', function (err, obj) {
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
                }
                if (obj.length) console.log('host.' + hostname + ' Counted ' + obj.length + ' states (io.' + adapter + '.*) from states');
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('history.' + adapter + '.*', function (err, obj) {
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
                }
                if (obj.length) console.log('host.' + hostname + ' Counted ' + obj.length + ' states (' + adapter + '.*) from states');
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('messagebox.' + adapter + '.*', function (err, obj) {
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
                }
                if (obj.length) console.log('host.' + hostname + ' Counted ' + obj.length + ' states (' + adapter + '.*) from states');
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('log.' + adapter + '.*', function (err, obj) {
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
                }
                if (obj.length) console.log('host.' + hostname + ' Counted ' + obj.length + ' states (' + adapter + '.*) from states');
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys(adapter + '.*', function (err, obj) {
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
                }
                if (obj.length) console.log('host.' + hostname + ' Counted ' + obj.length + ' states (' + adapter + '.*) from states');
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('system.adapter.' + adapter + '.*', function (err, obj) {
            if (obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
                }
                if (obj.length) console.log('host.' + hostname + ' Counted ' + obj.length + ' states (system.adapter.' + adapter + '.*) from states');
            }

            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        if (!taskCnt) delStatesAndObjects();

        // Delete physically adapter from disk
        if (fs.existsSync(__dirname + '/../../adapter/' + adapter + '/io-package.json')) {
            var pack = require(__dirname + '/../../adapter/' + adapter + '/io-package.json');
            if (!pack.common || !pack.common.nondeletable) {
                console.log('host.' + hostname + ' delete ' + __dirname + '/../../adapter/' + adapter);
                tools.rmdirRecursiveSync(__dirname + '/../../adapter/' + adapter);
            }
        }
        if (fs.existsSync(__dirname + '/../../node_modules/iobroker.' + adapter + '/io-package.json')) {
            var _pack = require(__dirname + '/../../node_modules/iobroker.' + adapter + '/io-package.json');
            if (!_pack.common || !_pack.common.nondeletable) {
                console.log('host.' + hostname + ' delete ' + __dirname + '/../../node_modules/iobroker.' + adapter);
                tools.rmdirRecursiveSync(__dirname + '/../../node_modules/iobroker.' + adapter);
            }
        }
        if (fs.existsSync(__dirname + '/../../../../node_modules/iobroker.js-controller') &&
            fs.existsSync(__dirname + '/../../../../node_modules/iobroker.' + adapter + '/io-package.json')) {
            var __pack = require(__dirname + '/../../../iobroker.' + adapter + '/io-package.json');
            if (!__pack.common || !__pack.common.nondeletable) {
                console.log('host.' + hostname + ' delete ' + path.normalize(__dirname + '/../../../iobroker.' + adapter));
                tools.rmdirRecursiveSync(__dirname + '/../../../iobroker.' + adapter);
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
                states.delState(delState.pop(), function (err) {
                    setTimeout(delStates, 0);
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
                    setTimeout(delObjects, 0);
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
        objects.getObjectView("system", "instance", {startkey: 'system.adapter.' + adapter + '.' + instance, endkey: 'system.adapter.' + adapter + '.' + instance}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length === 0) {
                    console.log('no instances of adapter ' + adapter + '.' + instance + ' found');
                } else {
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                    }
                    console.log('host.' + hostname + ' Counted ' + doc.rows.length + ' instances of ' + adapter + '.' + instance);
                }
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
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
                            if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' objects of ' + adapter + '.' + instance);
                }
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        // TODO delete meta objects - i think a recursive deletion of all child object would be less effort.

        // Delete devices
        taskCnt++;
        objects.getObjectView("system", "device", {}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    var count = 0;
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (doc.rows[i] && doc.rows[i].value && doc.rows[i].value._id &&
                            (adapterRegex.test(doc.rows[i].value._id) || sysAdapterRegex.test(doc.rows[i].value._id))) {
                            if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' devices of ' + adapter + '.' + instance);
                }
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        // Delete channels
        taskCnt++;
        objects.getObjectView("system", "channel", {}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length !== 0) {
                    var count = 0;
                    var name = adapter + '.' + instance;
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (doc.rows[i] && doc.rows[i].value && doc.rows[i].value._id &&
                            (adapterRegex.test(doc.rows[i].value._id) || sysAdapterRegex.test(doc.rows[i].value._id))) {
                            if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' channels of ' + adapter + '.' + instance);
                }
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        // Delete states
        taskCnt++;
        objects.getObjectView("system", "state", {}, function (err, doc) {
            if (err) {
                if (err !== 'Not exists') console.error('host.' + hostname + ' error: ' + err);
            } else {
                if (doc.rows.length === 0) {
                    console.log('host.' + hostname + ' no states ' + adapter + ' found');
                } else {
                    var count = 0;
                    var name = adapter + '.' + instance;
                    for (var i = 0; i < doc.rows.length; i++) {
                        if (doc.rows[i] && doc.rows[i].value && doc.rows[i].value._id &&
                            (adapterRegex.test(doc.rows[i].value._id) || sysAdapterRegex.test(doc.rows[i].value._id))) {
                            if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                            count++;
                        }
                    }
                    if (count) console.log('host.' + hostname + ' Counted ' + count + ' objects of states of ' + adapter + '.' + instance);
                }
            }
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('system.adapter.' + adapter + '.' + instance + '*', function (err, obj) {
            for (var i = 0; i < obj.length; i++) {
                if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
            }
            if (obj.length) console.log ('host.' + hostname + ' Counted ' + obj.length + ' states "system.adapter.' + adapter + '.' + instance + '*" from states');
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('io.' + adapter + '.' + instance + '*', function (err, obj) {
            for (var i = 0; i < obj.length; i++) {
                if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
            }
            if (obj.length) console.log ('host.' + hostname + ' Counted ' + obj.length + ' states "io.' + adapter + '.' + instance + '*" from states');
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('log.' + adapter + '.' + instance + '*', function (err, obj) {
            for (var i = 0; i < obj.length; i++) {
                if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
            }
            if (obj.length) console.log ('host.' + hostname + ' Counted ' + obj.length + ' states "log.' + adapter + '.' + instance + '*" from states');
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys('messagebox.' + adapter + '.' + instance + '*', function (err, obj) {
            for (var i = 0; i < obj.length; i++) {
                if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
            }
            if (obj.length) console.log ('host.' + hostname + ' Counted ' + obj.length + ' states "messagebox.' + adapter + '.' + instance + '*" from states');
            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        taskCnt++;
        states.getKeys(adapter + '.' + instance + '*', function (err, obj) {
            for (var i = 0; i < obj.length; i++) {
                if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
            }
            if (obj.length) console.log ('host.' + hostname + ' Counted ' + obj.length + ' states "' + adapter + '.' + instance + '*" from states');

            taskCnt--;
            if (!taskCnt) delStatesAndObjects();
        });

        if (!taskCnt) delStatesAndObjects();
    };
}

module.exports = Install;
