/**
 *
 *  ioBroker.js-controller Controller start/stop and install script
 *
 *  7'2014 hobbyquaker <hq@ccu.io>
 *         bluefox <bluefox@ccu.io>
 *
 *
 */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";


// TODO need info about progress of stopping
// Make command restart

var yargs = require('yargs')
    .usage('Commands:\n' +
        '$0 setup [--couch <host>] [--redis <host>]\n' +
        '$0 start\n' +
        '$0 stop\n' +
        '$0 add <adapter> [--enabled] [--host <host>]\n' +
        '$0 del <adapter>\n' +
        '$0 del <adapter>.<instance>\n' +
        '$0 update <repository url>\n' +
        '$0 upgrade <repository url>\n' +
        '$0 upgrade self <repository url>\n' +
        '$0 upgrade <adapter> <repository url>\n' +
        '$0 object get <id>\n' +
        '$0 state get <id>\n' +
        '$0 state getplain <id>\n' +
        '$0 state set <id> <value>\n' +
        '$0 state setplain <id> <value>\n' +
        '$0 clean\n' +
        '$0 backup\n' +
        '$0 restore <backup name or path>')
    .default('couch',   '127.0.0.1')
    .default('redis',   '127.0.0.1')
    .default('lang',    'en')
;

var ObjectsCouch;
var objects;
var fs;
var ncp;
var password;
var tools;
var extend;
var mime;
var os;
var states;

switch (yargs.argv._[0]) {

    case "start":
    case "stop":
        var daemon = require("daemonize2").setup({
            main: "../controller.js",
            name: "ioBroker controller",
            pidfile: "iobroker.pid",
            cwd: "../",
            stopTimeout: 12000
        });
        daemon[yargs.argv._[0]]();
        break;

    case "update":
        fs =            require('fs');
        tools =         require(__dirname + '/tools.js');
        ObjectsCouch =  require(__dirname + '/couch.js');
        extend =        require('node.extend');
        var repoUrl =   yargs.argv._[1]; // Repo url or name
        dbConnect(function () {
            showRepo(repoUrl);
        });
        break;

    case "setup":
        fs =            require('fs');
        setup(function () {
            process.exit();
        });
        break;

    case "add":
    case "install":
        fs =            require('fs');
        os =            require('os');

        tools =         require(__dirname + '/tools.js');
        ObjectsCouch =  require(__dirname + '/couch.js');

        mime =          require('mime');
        extend =        require('node.extend');
        ncp =           require('ncp').ncp;

        ncp.limit =     16;

        var name =      yargs.argv._[1];
        var repoUrl =   yargs.argv._[2];
        var hostname =  os.hostname();

        if (!fs.existsSync(__dirname + '/../node_modules/iobroker.' + name) && !fs.existsSync(__dirname + '/../adapter/' + name)) {
            downloadPacket(repoUrl, name, function () {
                if (yargs.argv._[0] != 'install') {
                    dbConnect(function () {
                        createInstance(name, yargs.argv.enabled, yargs.argv.host || hostname);
                    });
                }
            });
        } else {
            if (yargs.argv._[0] != 'install') {
                dbConnect(function () {
                    createInstance(name, yargs.argv.enabled, yargs.argv.host || hostname);
                });
            } else {
                console.log('adapter "' + name + '" yet installed. Use "upgrade" to install newer version.');
            }
        }
        break;

    case "upload":
        fs =           require('fs');
        mime =         require('mime');
        tools =        require(__dirname + '/tools.js');
        ObjectsCouch = require(__dirname + '/couch.js');
        var name =     yargs.argv._[1];
        if (name) {
            dbConnect(function () {
                uploadAdapter(name, true, true, function () {
                    uploadAdapter(name, false, true, function () {

                    });
                });
            });
        } else {
            console.log("No adapter name found!");
            yargs.showHelp();
            process.exit(1);
        }
        break;

    case "delete":
    case "del":
        var adpr     = yargs.argv._[1];
        var instance = yargs.argv._[2];
        if (!adpr) {
            yargs.showHelp();
            process.exit(2);
        }

        if (adpr && adpr.indexOf('.') != -1) {
            var parts = adpr.split('.');
            adpr      = parts[0];
            instance  = parts[1];
        }
        var config =      require(__dirname + '/../conf/iobroker.json');
        ObjectsCouch =    require(__dirname + '/couch.js');
        var StatesRedis = require(__dirname + '/redis.js');
        states = new StatesRedis({
            redis: {
                host:    config.redis.host,
                port:    config.redis.port,
                options: config.redis.options
            }
        });


        if (instance !== null && instance !== undefined && instance !== "") {
            dbConnect(function () {
                deleteInstance(adpr, instance, function () {
                    process.exit();
                });
            });
        } else {
            dbConnect(function () {
                deleteAdapter(adpr, instance, function () {
                    process.exit();
                });
            });
        }
        break;

    case "object":
        var cmd = yargs.argv._[1];
        var id  = yargs.argv._[2];
        if (id) {
            var config   = require(__dirname + '/../conf/iobroker.json');
            ObjectsCouch = require(__dirname + '/couch.js');

            if (cmd == "get") {
                dbConnect(function () {
                    objects.getObject(id, function (err, res) {
                        if (err) {
                            console.log("not found");
                            process.exit(3);
                        } else {
                            console.log(JSON.stringify(res));
                            process.exit();
                        }
                    });
                });
            }
        }
        break;

    case "state":
        var cmd = yargs.argv._[1];
        var id  = yargs.argv._[2];
        if (id) {
            var config =      require(__dirname + '/../conf/iobroker.json');
            var StatesRedis = require(__dirname + '/redis.js');
            states = new StatesRedis({
                redis: {
                    host:    config.redis.host,
                    port:    config.redis.port,
                    options: config.redis.options
                }
            });
            if (cmd == "get") {
                states.getState(id, function (err, obj) {
                    if (err) {
                        console.log("Error: " + err);
                    } else {
                        console.log(JSON.stringify(obj));
                    }
                    process.exit();
                });
            } else if (cmd == "getplain") {
                states.getState(id, function (err, obj) {
                    if (err) {
                        console.log("Error: " + err);
                    } else {
                        if (obj) {
                            console.log(obj.val);
                            console.log(obj.ack);
                            console.log(obj.from);
                            console.log(obj.ts);
                            console.log(obj.lc);
                        } else {
                            console.log(null);
                        }
                    }
                    process.exit();
                });
            } else if (cmd == "set") {
                var val = yargs.argv._[3];
                if (!val) {
                    console.log("Invalid format: No value found.");
                    yargs.showHelp();
                    process.exit();
                } else {
                    try {
                        val = JSON.parse(val);
                    } catch (e) {
                        console.log("Invalid format: Cannot parse json object: " + val);
                    }

                    states.setState(id, val, function () {
                        process.exit();
                    });
                }
            } else if (cmd == "setplain") {
                var val = yargs.argv._[3];
                if (!val) {
                    console.log("Invalid format: No value found.");
                    yargs.showHelp();
                    process.exit();
                } else {
                    states.setState(id, val, function () {
                        process.exit();
                    });
                }
            } else {
                console.log("Invalid format: unknown state command");
                yargs.showHelp();
            }
        } else {
            console.log("Invalid format: no id found");
            yargs.showHelp();
        }
        break;

    case "message":
        var adapter = yargs.argv._[1];
        var instances = [];
        if (adapter) {
            if (adapter.indexOf('.') != -1) {
                instances.push('system.adapter.' + adapter);
            }

            var config =   require(__dirname + '/../conf/iobroker.json');
            ObjectsCouch = require(__dirname + '/couch.js');

            dbConnect(function () {
                objects.getObjectView('system', 'instance', {startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, function (err, res) {
                    if (res && res.rows.length) {
                        if (instances.length === 0) {
                            for (var t = 0; t < res.rows.length; t++) {
                                instances.push(res.rows[i].id);
                            }
                        }
                        var config =      require(__dirname + '/../conf/iobroker.json');
                        var StatesRedis = require(__dirname + '/redis.js');
                        states = new StatesRedis({
                            redis: {
                                host:    config.redis.host,
                                port:    config.redis.port,
                                options: config.redis.options
                            }
                        });
                        var cmd = yargs.argv._[2];
                        var msg = yargs.argv._[3];
                        if (!msg) {
                            msg = cmd;
                            cmd = "send";
                        }
                        if (!msg) {
                            console.log("Invalid format: No message found.");
                            yargs.showHelp();
                            process.exit();
                        } else {
                            for (var i = 0; i < instances.length; i++) {
                                states.pushMessage(instances[i], {command: cmd, message: msg, from: 'setup'}, process.exit);
                            }
                        }
                    } else {
                        console.log('No one instance of adapter "' + adapter + '" found');
                        process.exit(4);
                    }
                });
            });
        } else {
            console.log("Invalid format: no adapter found");
            yargs.showHelp();
        }
        break;

    case "upgrade":
        fs =           require('fs');
        tools =        require(__dirname + '/tools.js');
        ObjectsCouch = require(__dirname + '/couch.js');
        extend =       require('node.extend');
        mime =         require('mime');

        var adapter = yargs.argv._[1];
        var repoUrl = yargs.argv._[2];
        var config  = require(__dirname + '/../conf/iobroker.json');

        if (adapter && !repoUrl && adapter.indexOf('/') != -1) {
            repoUrl = adapter;
            adapter = null;
        }

        dbConnect(function () {
            if (adapter) {
                if (adapter == 'self') {
                    upgradeController(repoUrl, true);
                } else {
                    upgradeAdapter(repoUrl, adapter, true);
                }
            } else {
                tools.getRepositoryFile(repoUrl, function (links) {
                    var result = [];
                    for (var name in links) {
                        result.push(name);
                    }
                    upgradeAdapterHelper(links, result, 0, false, function () {
                        upgradeController(links, false);
                    });
                });
            }
        });

        break;

    case 'clean':
        var yes = yargs.argv._[1];
        if (yes != 'yes') {
            console.log('Command "clean" clears all CouchDB and redis. To execute it write "iobroker clean yes"');
        } else {
            cleanDatabase(true, function (count) {
                console.log('Deleted ' + count + ' states');
                restartController(function () {
                    console.log('Restarting ioBroker...');
                    process.exit();
                });
            });
        }
        break;

    case "restore":
        if (!yargs.argv._[1]) {
            console.log('Please specify the file name to restore.');
            process.exit(11);
        } else {
            restoreBackup(yargs.argv._[1], function () {
                console.log("System successfully restored!");
                process.exit(0);
            });
        }
        break;

    case "backup":
        ObjectsCouch =  require(__dirname + '/couch.js');
        var StatesRedis = require(__dirname + '/redis.js');
        states = new StatesRedis({
            redis: {
                host:    '127.0.0.1',
                port:    6379,
                options: {
                    "auth_pass": null,
                    "retry_max_delay": 15000
                }
            }
        });
        var name = yargs.argv._[1];

        dbConnect(function () {
            createBackup(name, function (filePath) {
                console.log('Backup created: ' + filePath);
                process.exit(0);
            });
        });
        break;

    default:
        yargs.showHelp();

}

function cleanDatabase(isDeleteDb, callback) {
    ObjectsCouch    = require(__dirname + '/couch.js');
    var StatesRedis = require(__dirname + '/redis.js');
    states = new StatesRedis({
        redis: {
            host:    '127.0.0.1',
            port:    6379,
            options: {
                "auth_pass": null,
                "retry_max_delay": 15000
            }
        }
    });

    dbConnect(function () {

        if (isDeleteDb) {
            objects.destroy(function () {

                // Clean up redis
                states.getKeys('*', function (err, obj) {
                    var delState = [];
                    var i;
                    if (obj) {
                        for (i = 0; i < obj.length; i++) {
                            delState.push(obj[i]);
                        }
                    }
                    var taskCnt = 0;
                    for (i = 0; i < obj.length; i++) {
                        taskCnt++;
                        states.delState(delState[i], function () {
                            taskCnt--;
                            if (!taskCnt) {
                                if (callback) callback(obj.length);
                            }
                        });
                    }
                });
            });
        } else {
            // Clean only objects, not the views
            objects.getObjectList({startkey: '\u0000', endkey: '\u9999'}, function (err, res) {
                if (!err && res.rows.length) {
                    for (var i = 0; i < res.rows.length; i++) {
                        //console.log('Delete ' + res.rows[i].id);
                        objects.delObject(res.rows[i].id);
                    }
                }

                // Clean up redis
                states.getKeys('*', function (err, obj) {
                    var delState = [];
                    var i;
                    if (obj) {
                        for (i = 0; i < obj.length; i++) {
                            delState.push(obj[i]);
                        }
                    }
                    var taskCnt = 0;
                    for (i = 0; i < obj.length; i++) {
                        taskCnt++;
                        states.delState(delState[i], function () {
                            taskCnt--;
                            if (!taskCnt) {
                                if (callback) callback(obj.length);
                            }
                        });
                    }
                });

            });
        }
    });

}

function restartController(callback) {
    var fs =    require('fs');
    var spawn = require('child_process').spawn;
    if (fs.existsSync(__dirname + '/../log/restart.log')) fs.unlinkSync(__dirname + '/../log/restart.log');
    var out = fs.openSync(__dirname + '/../log/restart.log', 'a');
    var err = fs.openSync(__dirname + '/../log/restart.log', 'a');

    console.log('Starting node ./restart.js');
    var child = spawn('node', ['./restart.js'], {
        detached: true,
        stdio: ['ignore', out, err]
    });

    child.unref();

    if (callback) {
        callback();
    } else {
        process.exit();
    }
}

function createBackup(name, callback) {
    fs = require('fs');
    if (!name) {
        var d = new Date();
        name = d.getFullYear() + '_' +
            ('0' + d.getMonth()).slice(-2) + '_' +
            ('0' + d.getDate()).slice(-2) + '-' +
            ('0' + d.getHours()).slice(-2) + '_' +
            ('0' + d.getMinutes()).slice(-2) + '_' +
            ('0' + d.getSeconds()).slice(-2) + '_backupIoBroker';
    }
    objects.getObjectList({include_docs: true}, function (err, res) {
        var result = {objects: null, states: {}, config: null};
        if (err) {
            console.log('Cannot get objects: ' + err);
        } else {
            result.objects = res.rows;
        }
        if (fs.existsSync(__dirname + '/../conf/iobroker.json')) result.config = JSON.parse(fs.readFileSync(__dirname + '/../conf/iobroker.json'));
        states.getKeys('io.*', function (err, keys) {
            /*for (var i = keys.length - 1; i >= 0; i--) {
                if (keys[i].match(/^messagebox\./) || keys[i].match(/^log\./)) {
                    keys.splice(i, 1);
                }
            }*/

            states.getStates(keys, function (err, obj) {
                for (var i = 0; i < keys.length; i++) {
                    result.states[keys[i]] = obj[i];
                }
                if (!fs.existsSync(__dirname + '/../backups')) fs.mkdirSync(__dirname + '/../backups');
                if (!fs.existsSync(__dirname + '/../tmp')) fs.mkdirSync(__dirname + '/../tmp');
                if (!fs.existsSync(__dirname + '/../tmp/backup')) fs.mkdirSync(__dirname + '/../tmp/backup');
                fs.writeFileSync(__dirname + '/../tmp/backup/backup.json', JSON.stringify(result, null, 2));
                var TARgz = require('tar.gz');

                new TARgz().compress(__dirname + '/../tmp/backup', __dirname + '/../backups/' + name + '.tar.gz', function (err) {
                    if (err) {
                        console.log('Cannot pack file /../tmp/' + name + '.json: ' + err);
                        process.exit(9);
                    }

                    fs.unlinkSync(__dirname + '/../tmp/backup/backup.json');
                    if (callback) callback('backups/' + name + '.tar.gz');
                });
            });
        });

    });
}

function setup(callback) {
    password = require(__dirname + '/password.js');
    ObjectsCouch = require(__dirname + '/couch.js');

    var config;
    if (!fs.existsSync(__dirname + '/../conf/iobroker.json')) {
        config = require(__dirname + '/../conf/iobroker-dist.json');
        console.log('creating conf/iobroker.json');
        config.couch.host = yargs.argv.couch || '127.0.0.1';
        config.redis.host = yargs.argv.redis || '127.0.0.1';
        fs.writeFileSync(__dirname + '/../conf/iobroker.json', JSON.stringify(config));
    }

    var iopkg = JSON.parse(fs.readFileSync(__dirname + '/../io-package.json'));

    dbConnect(function () {
        dbSetup(iopkg, callback);
    });
}

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
    if (_objects[_index].doc._rev) delete _objects[_index].doc._rev;

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
        for (var i = 0; i < _modules.length; i++) {
            if (_modules[i].test(/^iobroker\./) && dirs.indexOf(_modules[i].substring('iobroker.'.length)) == -1) dirs.push(_modules[i]);
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
                    if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + dirs[index] + '/io-package.json')) {
                        pkg = JSON.parse(fs.readFileSync(__dirname + '/../node_modules/iobroker.' + dirs[index] + '/io-package.json'));
                    } else if (fs.existsSync(__dirname + '/../adapter/' + dirs[index] + '/io-package.json')) {
                        pkg = JSON.parse(fs.readFileSync(__dirname + '/../adapter/' + dirs[index] + '/io-package.json'));
                    }

                    if (pkg && pkg.objects) {
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

function restoreBackup(name, callback) {
    fs = require('fs');
    if (!name) {
        console.log('Invalid backup name: empty!');
        process.exit(10);
    }
    name = name.replace(/\\/g, '/');
    if (name.indexOf('/') == -1) {
        name = __dirname + '/../backups/' + name;
        if (!name.match(/\_backupIoBroker/i)) name += '_backupIoBroker';
        if (!name.match(/\.tar\.gz$/i)) name += '.tar.gz';
    }
    if (!fs.existsSync(name)) {
        console.log('Cannot find ' + name);
        process.exit(11);
    }
    var TARgz = require('tar.gz');
    if (fs.existsSync(__dirname + '/../tmp/backup/backup.json')) fs.unlinkSync(__dirname + '/../tmp/backup/backup.json');

    new TARgz().extract(name, __dirname + '/../tmp', function (err) {
        if (err) {
            console.log('Cannot extract from file "' + name + '"');
            process.exit(9);
        }
        if (!fs.existsSync(__dirname + '/../tmp/backup/backup.json')) {
            console.log('Cannot find extracted file from file /../tmp/backup/backup.json"');
            process.exit(9);
        }
        // Open file
        var restore = JSON.parse(fs.readFileSync(__dirname + '/../tmp/backup/backup.json'));

        // stop all adapters
        cleanDatabase(false, function () {
            dbConnect(function () {
                // upload all data into DB
                var StatesRedis = require(__dirname + '/redis.js');
                states = new StatesRedis({
                    redis: {
                        host:    '127.0.0.1',
                        port:    6379,
                        options: {
                            "auth_pass": null,
                            "retry_max_delay": 15000
                        }
                    }
                });
                // restore ioBorker.json
                if (restore.config) fs.writeFileSync(__dirname + '/../conf/iobroker.json', JSON.stringify(restore.config, null, 2));

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
                        //  reload objects of adapters
                        reloadAdaptersObjects(function () {
                            // Reload host objects
                            var pckgio = JSON.parse(fs.readFileSync(__dirname + '/../io-package.json'));
                            reloadAdapterObject(0, pckgio ? pckgio.objects : null, function () {
                                restartController(callback);
                            });
                        });
                    });
                });
            });
        });
    });
}

function upgradeAdapterHelper(repoUrl, list, i, forceDowngrade, callback) {
    upgradeAdapter(repoUrl, list[i], forceDowngrade, function () {
        i++;
        while (repoUrl[list[i]] && repoUrl[list[i]].controller) {
            i++;
        }

        if (list[i]) {
            upgradeAdapterHelper(repoUrl, list, i, forceDowngrade, callback);
        } else if (callback) {
            callback();
        }
    });
}

function upgradeAdapter(repoUrl, adapter, forceDowngrade, callback) {

    if (!repoUrl || typeof repoUrl != 'object') {
        tools.getRepositoryFile(repoUrl, function (sources) {
            upgradeAdapter(sources, adapter, forceDowngrade, callback);
        });
        return;
    }

    function upgradeAdapterObjects(name, iopack, callback) {
        if (!iopack) {
            callback(name);
        } else {
            objects.getObject('system.adapter.' + name, function (err, obj) {
                if (err || !obj) {
                    console.log('system.adapter.' + name + ' does not exist');
                    callback(name);
                } else {
                    obj.common = extend(true, obj.common, iopack.common);
                    obj.native = extend(true, iopack.native, obj.native);
                    obj.common.installedVersion = iopack.common.version;
                    obj.common.version = iopack.common.version;
                    var hostname =  require('os').hostname();

                    objects.setObject('system.adapter.' + name, obj, function () {
                        // Update all instances of this host
                        objects.getObjectView('system', 'instance', {startkey: 'system.adapter.' + name + '.', endkey: 'system.adapter.' + name + '.\u9999'}, function (err, res) {
                            var cntr = 0;
                            if (res) {
                                for (var i = 0; i < res.rows.length; i++) {
                                    if (res.rows[i].value.common.host == hostname) {
                                        cntr++;
                                        objects.getObject(res.rows[i].id, function (err, _obj) {
                                            _obj.common = extend(true, _obj.common, iopack.common);
                                            _obj.native = extend(true, iopack.native, _obj.native);
                                            _obj.common.installedVersion = iopack.common.version;
                                            _obj.common.version = iopack.common.version;

                                            objects.setObject(_obj._id, _obj, function () {
                                                cntr--;
                                                if (!cntr && callback) callback(name);
                                            });
                                        });
                                    }
                                }
                            }
                            if (!cntr && callback) callback(name);
                        });
                    });
                }
            });
        }
    }


    function finishUpgrade(name, iopack, callback) {
        var count = 0;
        installNpm(name, function (_name) {
            // Upload www and admin files of adapter into CouchDB
            count++;
            uploadAdapter(name, false, true, function () {
                // extend all adapter instance default configs with current config
                // (introduce potentially new attributes while keeping current settings)
                upgradeAdapterObjects(name, iopack, function () {
                    count--;
                    if (count) {
                        console.log('Adapter "' + name + '" updated');
                        if (callback) callback(name);
                    }
                });
            });
            count++;
            uploadAdapter(name, true, true, function () {
                count--;
                if (!count) {
                    console.log('Adapter "' + name + '" updated');
                    if (callback) callback(name);
                }
            });
        });
    }

    var sources = repoUrl;

    // Read actual description of installed adapter with version
    if (!fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json') &&
        !fs.existsSync(__dirname + '/../adapter/' + adapter + '/io-package.json')) {
        console.log('Adapter "' + adapter + '"' + ((adapter.length < 15) ? new Array(15 - adapter.length).join(' '): '') + ' is not installed.');
        if (callback) callback();
        return;
    }
    // Get the url of io-package.json or direct the version
    if (!repoUrl[adapter]) {
        console.log('Adapter "' + adapter + '" is not in the repository and cannot be updated.');
        if (callback) callback();
        return;
    }

    var ioInstalled;
    if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json')) {
        ioInstalled = require(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json');
    } else {
        ioInstalled = require(__dirname + '/../adapter/' + adapter + '/io-package.json');
    }

    // If version is included in repository
    if (repoUrl[adapter].version) {
        if (repoUrl[adapter].version == ioInstalled.common.version ||
            (!forceDowngrade && upToDate(repoUrl[adapter].version, ioInstalled.common.version))) {
            console.log('Adapter "' + adapter + '"' + ((adapter.length < 15) ? new Array(15 - adapter.length).join(' '): '') + ' is up to date.');
            if (callback) callback();
        } else {
            // Get the adapter from web site
            downloadPacket(sources, adapter, function (name, ioPack) {
                finishUpgrade(name, ioPack, callback);
            });
        }
    } else if (repoUrl[adapter].meta) {
        // Read repository from url or file
        tools.getJson(repoUrl[adapter].meta, function (iopack) {
            if (!iopack) {
                console.log('Cannot parse file' + repoUrl[adapter].meta);
                if (callback) callback();
                return;
            }
            if (iopack.common.version == ioInstalled.common.version ||
                (!forceDowngrade && upToDate(iopack.common.version, ioInstalled.common.version))) {
                console.log('Adapter "' + adapter + '"' + ((adapter.length < 15) ? new Array(15 - adapter.length).join(' '): '') + ' is up to date.');
                if (callback) callback();
            } else {
                // Get the adapter from web site
                downloadPacket(sources, adapter, function (name, ioPack) {
                    finishUpgrade(name, ioPack, callback);
                });
            }
        });
    } else {
        if (forceDowngrade) {
            console.log('Unable to get version for "' + adapter + '". Update anyway.');
            // Get the adapter from web site
            downloadPacket(sources, adapter, function (name, ioPack) {
                finishUpgrade(name, ioPack, callback);
            });
        } else {
            console.log('Unable to get version for "' + adapter + '".');
        }
    }
}

function upgradeController(repoUrl, forceDowngrade, callback) {
    if (!repoUrl || typeof repoUrl != 'object') {
        tools.getRepositoryFile(repoUrl, function (sources) {
            upgradeController(sources, forceDowngrade, callback);
        });
        return;
    }

    var hostname = require("os").hostname();
    var installed = JSON.parse(fs.readFileSync(__dirname + '/../io-package.json'));
    if (!installed.common.version) {
        console.log('Hots    "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is not installed.');
        if (callback) callback();
        return;
    }
    if (!repoUrl[installed.common.name]) {
        // no info for controller
        if (callback) callback();
        return;
    }
    if (repoUrl[installed.common.name].version) {
        if (repoUrl[installed.common.name].version == installed.common.version ||
            (!forceDowngrade && upToDate(repoUrl[installed.common.name].version, installed.common.version))) {
            console.log('Host    "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is up to date.');
            if (callback) callback();
        } else {
            // Get the adapter from web site
            downloadPacket(repoUrl, installed.common.name, function (name) {
                installNpm('', function (_name) {
                    console.log('Host "' + hostname + '" updated');
                    if (callback) callback();
                });
            });
        }
    } else {
        tools.getJson(repoUrl[installed.common.name].meta, function (ioPack) {
            if (ioPack.common.version == installed.common.version ||
                (!forceDowngrade && upToDate(ioPack.common.version, installed.common.version))) {
                console.log('Host    "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is up to date.');
                if (callback) callback();
            } else {
                // Get the adapter from web site
                downloadPacket(repoUrl, ioPack.common.name, function (name) {
                    installNpm('', function (_name) {
                        console.log('Host "' + hostname + '" updated');
                        // Call command chmod +x __dirname if under linux or darwin
                        var platform = require('os').platform();
                        if (platform == 'linux' || platform == 'darwin') {

                            var exec = require('child_process').exec;
                            var cmd = 'chmod +x ' + __dirname;
                            console.log('Execute: ' + cmd);
                            var child = exec(cmd);
                            child.stderr.pipe(process.stdout); // TODO this produces unwanted newlines :-(
                            child.on('exit', function () {
                                restartController(callback);
                            });

                        } else {
                            restartController(callback);
                        }
                    });
                });
            }

        });
    }

}

function dbConnect(callback) {
    objects = new ObjectsCouch({
        logger: {
            debug: function (msg) { },
            info:  function (msg) { },
            warn:  function (msg) {
                console.log(msg);
            },
            error: function (msg) {
                console.log(msg);
            }
        },
        connected: function () {
            if (typeof callback === 'function') callback();
            // restore all objects
        }
    });
}

// Upload www folder of adapter into couchDB
function uploadAdapter(adapter, isAdmin, forceUpload, callback) {
    var rev;
    var id = adapter + (isAdmin ? '.admin' : '');
    var dir = __dirname + '/../node_modules/iobroker.' + adapter + (isAdmin ? '/admin' : '/www');

    if (!fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json')) {
        dir = __dirname + '/../adapter/' + adapter + (isAdmin ? '/admin' : '/www');
    }
    var files = [];

    if (!isAdmin) {
        var cfg;
        // check for common.wwwDontUpload (needed for legacy adapter)
        if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json')) {
            cfg = require(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json');
        } else {
            cfg = require(__dirname + '/../adapter/' + adapter + '/io-package.json');
        }
        if (cfg && cfg.common && cfg.common.wwwDontUpload) {
            if (typeof callback === 'function') callback(adapter);
            return;
        }
    }
    // do not upload www dir of admin adapter
    if (adapter === 'admin' && !isAdmin) {
        // To DO remove after a while
        console.log("This should never happens!");
        if (typeof callback === 'function') callback(adapter);
        return;
    }

    function done(err, res) {
        if (err) {
            callback();
        } else {
            console.log('got ' + dir);
            files = res;
            setTimeout(function (_adapter, _isAdmin, _callback) {
                upload(_adapter, _isAdmin, _callback);
            }, 25, adapter, isAdmin, callback);
        }
    }

    function upload(adapter) {
        var file;
        if (!files.length) {
            if (typeof callback === 'function') callback(adapter);
        } else {
            file = files.pop();
            var mimeType = mime.lookup(file);
            var attName
            if (file.indexOf('node_modules') != -1) {
                attName = file.split('/iobroker.');
            } else {
                attName = file.split('/adapter/');
            }
            attName = attName[1];
            attName = attName.split('/').slice(2).join('/');
            console.log('upload', id, file, attName, mimeType);

            fs.createReadStream(file).pipe(
                objects.insert(id, attName, null, mimeType, {
                    rev: rev
                }, function (err, res) {
                    if (err) {
                        console.log(err);
                        if (typeof callback === 'function') callback(adapter);
                    }
                    rev = res.rev;
                    setTimeout(function () {
                        upload();
                    }, 50);
                })
            );
        }

    }

    function walk(dir, done) {
        var results = [];
        fs.readdir(dir, function (err, list) {
            if (err) return done(err);
            var i = 0;
            (function next() {
                var file = list[i++];
                if (!file) return done(null, results);
                file = dir + '/' + file;
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        walk(file, function (err, res) {
                            results = results.concat(res);
                            next();
                        });
                    } else {
                        results.push(file);
                        next();
                    }
                });
            })();
        });
    }


    objects.getObject(id, function (err, res) {
        if (err || !res) {
            objects.setObject(id, {
                type: 'meta',
                common: {
                    name: id.split('.').pop(),
                    type: isAdmin ? 'admin' : 'www'
                },
                native: {}
            }, function (err, res) {
                rev = res.rev;
                walk(dir, done);

            });
        } else {
            if (!forceUpload) {
                if (typeof callback === 'function') callback(adapter);
            } else {
                rev = res._rev;
                walk(dir, done);
            }
        }
    });
}

function downloadPacket(repoUrl, packetName, callback) {
    var url;
    var name;

    if (typeof upgrade == 'function') {
        callback = upgrade;
        upgrade = false;
    }

    if (!repoUrl || typeof repoUrl != 'object') {
        tools.getRepositoryFile(repoUrl, function (sources) {
            downloadPacket(sources, packetName, callback);
        });
        return;
    }
    var sources = repoUrl;

    if (sources[packetName]) {
        url = sources[packetName].url;

        if (!url && packetName != 'example') {
            // Install node modules
            var exec = require('child_process').exec;
            var cmd = 'npm ';
            if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + packetName)) {
                cmd += 'install '; //'update ';
            } else {
                cmd += 'install ';
            }
            cmd += 'iobroker.' + packetName + ' --production';
            console.log(cmd);
            var child = exec(cmd);
            child.stderr.pipe(process.stdout); // TODO this produces unwanted newlines :-(
            // liner.js from http://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/ could solve this
            child.on('exit', function () {
                if (callback) callback(adapter);
            });

            return;
        }

        // Adapter
        if (!url) {
            console.log('Adapter "' + packetName + '" can be updated only together with ioBroker.js-controller');
            if (typeof callback === 'function') callback(packetName);
            return;
        }
        name = packetName.replace(/[\/ $&*\\]/g, '_');
    } else {
        url = packetName;
        if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
            console.log("Unknown packetName " + packetName);
            process.exit(5);
        }
        name = Math.floor(Math.random() * 0xFFFFFFE);
    }

    var AdmZip =  require('adm-zip');
    var ncp =     require('ncp').ncp;
    ncp.limit =   16;

    console.log('download ' + url);

    tools.getFile(url, name + '.zip', function (tmpFile) {
        console.log('unzip ' + tmpFile);

        // Extract files into tmp/
        var zip = new AdmZip(tmpFile);
        zip.extractAllTo(__dirname + '/../tmp/' + name, true);
        // Find out the first directory
        var dirs = fs.readdirSync(__dirname + '/../tmp/' + name);
        if (dirs.length) {
            var source = __dirname + '/../tmp/' + name + ((dirs.length == 1) ? '/' + dirs[0] : '');
            // Copy files into adapter or controller
            if (fs.existsSync(source + '/io-package.json')) {
                var packetIo;
                try {
                    packetIo = JSON.parse(fs.readFileSync(source + '/io-package.json'));
                } catch (e) {
                    console.log('io-package.json has invalid format! Installation terminated.');
                    if (typeof callback === 'function') callback(name, 'Invalid io-package.json!');
                    process.exit(6);
                }

                var destination = __dirname + "/..";
                if (!packetIo.common.controller) destination += '/adapter/' + packetIo.common.name;

                console.log('copying ' + source + ' to ' + destination + '(Version: ' + packetIo.common.version + ')');

                ncp(source, destination, function (err) {
                    if (err) {
                        console.log('ncp error: ' + err);
                        process.exit(7);
                    }
                    if (tmpFile.substring(__dirname + '/../tmp/') == __dirname + '/../tmp/') {
                        console.log('delete ' + tmpFile);
                        fs.unlinkSync(tmpFile);
                    }
                    console.log('delete ' + __dirname + '/../tmp/' + name);
                    tools.rmdirRecursiveSync(__dirname + '/../tmp/' + name);

                    // Call npm install


                    if (typeof callback === 'function') callback(name, packetIo);

                });
            } else {
                console.log('io-package.json not found in ' + source + '/io-package.json. Invalid packet! Installation terminated.');
                if (typeof callback === 'function') callback(name, 'Invalid packet!');
                process.exit(8);
            }
        } else {
            console.log('Packet is empty! Installation terminated.');
            if (typeof callback === 'function') callback(name, 'Packet is empty');
            process.exit(12);
        }
    });
}

function installNpm(adapter, callback) {
    var path = __dirname;
    if (adapter) {
        if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json')) {
            path += '/../node_modules/iobroker.' + adapter;
        } else {
            path += '/../adapter/' + adapter;
        }
    }

    if (fs.existsSync(path + '/package.json')) {
        // Install node modules
        var exec = require('child_process').exec;
        var cmd = 'npm install "' + path + '" --production --prefix "' + path + '"';
        console.log(cmd);
        var child = exec(cmd);
        child.stderr.pipe(process.stdout); // TODO this produces unwanted newlines :-(
        // liner.js from http://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/ could solve this
        child.on('exit', function () {
            if (callback) callback(adapter);
        });
    } else {
        if (callback) callback(adapter);
    }
}

function callInstallOfAdapter(adapter, config, callback) {
    var path = __dirname + '/../node_modules/iobroker.' + adapter;

    if (!fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json')) {
        path = __dirname + '/../adapter/' + adapter;
    }

    if (config.common.install && fs.existsSync(path + '/io-package.json')) {
        // Install node modules
        var exec = require('child_process').exec;
        var cmd = 'node ';

        var fileName = config.common.main || "main.js";
        if (!fs.existsSync(path + '/' + fileName)) {
            fileName = adapter + '.js';
        }

        cmd += '"adapter/' + adapter + '/' + fileName + '" --install';
        console.log(cmd);
        var child = exec(cmd);
        child.stderr.pipe(process.stdout); // TODO this produces unwanted newlines :-(
        // liner.js from http://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/ could solve this
        child.on('exit', function () {
            if (callback) callback(adapter);
        });
    } else {
        if (callback) callback(adapter);
    }
}

var installCount = 0;
function installAdapter(adapter, callback) {

    console.log('install adapter ' + adapter);

    if (!fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json') &&
        !fs.existsSync(__dirname + '/../adapter/' + adapter + '/io-package.json')) {
        if (installCount == 2) {
            console.log('Cannot install ' + adapter);
            process.exit(13);
            return;
        }

        downloadPacket(null, adapter, function () {
            installAdapter(adapter, callback);
        });
        return;
    }
    installCount = 0;
    var adapterConf;
    try {
        if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json')) {
            adapterConf = JSON.parse(fs.readFileSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json'));
        } else {
            adapterConf = JSON.parse(fs.readFileSync(__dirname + '/../adapter/' + adapter + '/io-package.json'));
        }
    } catch (e) {
        console.log('error: reading io-package.json ' + e);
        process.exit(14);
    }

    // Check if the operation system is ok
    if (adapterConf.common && adapterConf.common.os) {
        if (typeof adapterConf.common.os == 'string' && adapterConf.common.os != require('os').platform()) {
            console.log('Adapter does not support current os. Required ' + adapterConf.common.os + '. Actual platform: ' + require('os').platform());
            process.exit(15);
        } else {
            if (adapterConf.common.os.indexOf(require('os').platform()) == -1) {
                console.log('Adapter does not support current os. Required one of ' + adapterConf.common.os.join(', ') + '. Actual platform: ' + require('os').platform());
                process.exit(16);
            }
        }
    }

    function checkDependencies(deps, _enabled, _host, callback) {
        if (!deps || !deps.length) {
            if (callback) callback(adapter);
            return;
        }

        var cnt = 0;
        // Get all installed adapters
        objects.getObjectView("system", "instance", {}, function (err, objs) {
            if (objs.rows.length) {
                for (var i = 0; i < deps.length; i++) {
                    var isFound = false;
                    for (var t = 0; t < objs.rows.length; t++) {
                        if (objs.rows[t] && objs.rows[t].value && objs.rows[t].value.common && objs.rows[t].value.common.name == deps[i]) {
                            isFound = true;
                            break;
                        }
                    }
                    if (!isFound) {
                        cnt++;
                        createInstance(deps[i], _enabled, _host, function (name) {
                            uploadAdapter(name, true, false, function () {
                                uploadAdapter(name, false, false, function () {
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

        checkDependencies(adapterConf.common.dependencies, yargs.argv.enabled, yargs.argv.host || hostname, function () {
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
                            console.log('error setObject ' + obj._id + ' ' + err);
                            process.exit(17);
                        } else {
                            console.log('object ' + obj._id + ' created');
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

    if (!fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + '/node_modules') &&
        !fs.existsSync(__dirname + '/../adapter/' + adapter + '/node_modules')) {
        // Install node modules
        installNpm(adapter, function (_adapter) {
            uploadAdapter(_adapter, true, true, function () {
                uploadAdapter(_adapter, false, true, function () {
                    callInstallOfAdapter(_adapter, adapterConf, function () {
                        install();
                    });
                });
            });
        });
    } else {
        uploadAdapter(name, true, true, function () {
            uploadAdapter(name, false, true, function () {
                callInstallOfAdapter(name, adapterConf, function () {
                    install();
                });
            });
        });
    }
}

function createInstance(adapter, enabled, host, callback) {

    objects.getObject('system.adapter.' + adapter, function (err, doc) {

        // Adapter is not installed - install it now
        if (err || !doc || !doc.common.installedVersion) {
            installAdapter(adapter, function () {
                createInstance(adapter, enabled, host, callback);
            });
            return;
        }

        // Check if some web pages should be uploaded
        uploadAdapter(name, true, false, function () {
            uploadAdapter(name, false, false, function () {
                objects.getObjectView('system', 'instanceStats', {startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, function (err, res) {
                    if (err || !res) {
                        console.log('error: view instanceStats ' + err);
                        process.exit(18);
                        return;
                    }
                    if (enabled === "true")  enabled = true;
                    if (enabled === "false") enabled = false;
                    var adapterConf;
                    var instance = (res.rows && res.rows[0] && res.rows[0].value ? res.rows[0].value.max + 1 : 0);

                    // Todo count started instances
                    if (doc.common.singleton && instance > 0) {
                        console.log('error: this adapter does not allow multiple instances');
                        process.exit(19);
                        return;
                    }

                    // TODO: singletonHost one on host
                    if (doc.common.singletonHost && instance > 0) {
                        console.log('error: this adapter does not allow multiple instances on one host');
                        process.exit(21);
                        return;
                    }

                    var instanceObj = doc;
                    doc = JSON.parse(JSON.stringify(doc));

                    instanceObj._id    = 'system.adapter.' + adapter + '.' + instance;
                    instanceObj.type   = 'instance';
                    delete instanceObj._rev;
                    instanceObj.common.enabled = (enabled === true || enabled === false) ? enabled :
                        ((instanceObj.common.enabled === true || instanceObj.common.enabled === false) ? instanceObj.common.enabled : false);
                    instanceObj.common.host    = host;

                    console.log('create instance ' + adapter);

                    var objs = [
                        {
                            _id:    'system.adapter.' + adapter + '.' + instance + '.alive',
                            type:   'state',
                            common: {
                                name: adapter + '.' + instance + '.alive',
                                type: 'bool',
                                role: 'indicator.state'
                            },
                            native: {}
                        },
                        {
                            _id:    'system.adapter.' + adapter + '.' + instance + '.connected',
                            type:   'state',
                            common: {
                                name: adapter + '.' + instance + '.connected',
                                type: 'bool',
                                role: 'indicator.state'
                            },
                            native: {}
                        }
                    ];

                    if (instanceObj.common.wakeup) {
                        objs.push({
                            _id:    'system.adapter.' + adapter + '.' + instance + '.wakeup',
                            type:   'state',
                            common: {
                                name: adapter + '.' + instance + '.wakeup',
                                type: 'bool',
                                role: 'adapter.wakeup'
                            },
                            native: {}
                        });
                    }
                    if (instanceObj.common.run) {
                        objs.push({
                            _id:    'system.adapter.' + adapter + '.' + instance + '.run',
                            type:   'state',
                            common: {
                                name: adapter + '.' + instance + '.run',
                                type: 'bool',
                                role: 'adapter.run'
                            },
                            native: {}
                        });
                    }

                    if (!adapterConf) {
                        try {
                            if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json')) {
                                adapterConf = JSON.parse(fs.readFileSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json').toString());
                            } else {
                                adapterConf = JSON.parse(fs.readFileSync(__dirname + '/../adapter/' + adapter + '/io-package.json').toString());
                            }
                        } catch (e) {
                            console.log('error: reading io-package.json ' + e);
                            process.exit(20);
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
                                    console.log(err);
                                } else {
                                    console.log('object ' + obj._id + ' created');
                                }
                                setTimeout(setObjs, 25);
                            });
                        } else {
                            objects.setObject(instanceObj._id, instanceObj, function (err, res) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('object ' + instanceObj._id + ' created');
                                }

                                if (callback) {
                                    callback(adapter);
                                } else {
                                    process.exit(0);
                                }
                            });
                        }
                    }

                    setObjs();
                });
            });
        });

    });
}

// Helper methods
function upToDate(a, b) {
    a = a.split('.');
    b = b.split('.');
    a[0] = parseInt(a[0], 10);
    b[0] = parseInt(b[0], 10);
    if (a[0] > b[0]) {
        return false;
    } else if (a[0] === b[0]) {
        a[1] = parseInt(a[1], 10);
        b[1] = parseInt(b[1], 10);
        if (a[1] > b[1]) {
            return false;
        } else if (a[1] === b[1]) {
            a[2] = parseInt(a[2], 10);
            b[2] = parseInt(b[2], 10);
            if (a[2] > b[2]) {
                return false;
            } else {
                return true;
            }
        }
    } else {
        return true;
    }
}

function updateRepo(repoUrl, callback) {
    var result = {};

    if (!repoUrl || typeof repoUrl != 'object') {
        tools.getRepositoryFile(repoUrl, function (sources) {
            updateRepo(sources, callback);
        });
        return;
    }
    var sources = repoUrl;
    var downloads = [];

    function download() {
        if (downloads.length < 1) {
            console.log('update done');
            if (callback) callback(result);
        } else {
            var name = downloads.pop();

            if (sources[name].version) {
                result[name] = sources[name];
            } else if (sources[name].meta) {
                tools.getJson(sources[name].meta, function (ioPack) {
                    if (ioPack && ioPack.common) {
                        result[name] = extend(true, sources[name], ioPack.common);
                    }
                    setTimeout(download, 0);
                });
                return;
            } else if (sources[name].url) {
                console.log('Cannot get version of "' + name + '".');
                result[name] = sources[name];
            } else {
                console.log('Cannot get any information of "' + name + '". Ignored.');
            }
            setTimeout(download, 0);
        }
    }

    // Read repository file, local or by url
    for (var name in sources) {
        downloads.push(name);
    }

    download(sources);
}

function showRepo(repoUrl) {
    function showRepoResult(_name, sources) {
        var installed = tools.getInstalledInfo();

        for (var name in sources) {
            var text = (sources[name].controller ? 'Controller ' : 'Adapter    ');
            text += '"' + name + '"' + ((name.length < 15) ? new Array(15 - name.length).join(' '): '');
            if (sources[name].version) {
                text += ': ' + sources[name].version + ((sources[name].version.length < 10) ? new Array(10 - sources[name].version.length).join(' '): '');
            }

            if (installed[name] && installed[name].version) {
                text += ', installed ' + installed[name].version;
                if (sources[name].version != installed[name].version &&
                    !upToDate(sources[name].version, installed[name].version)) {
                    text += ' [Updateable]';
                }

            }

            console.log(text);
        }
    }

    // Get the repositories
    objects.getObject('system.config', function (err, sysConfig) {
        objects.getObject('system.repositories', function (err, obj) {
            if (err || !obj) {
                console.log('Error: Object "system.config" not found');
            } else {
                if (!obj.native || !obj.native.repositories) {
                    console.log('Error: no repositories found in the "system.config');
                } else {
                    repoUrl = repoUrl || sysConfig.common.activeRepo;

                    // If known repository
                    if (obj.native.repositories[repoUrl]) {

                        if (typeof obj.native.repositories[repoUrl] == 'string') {
                            obj.native.repositories[repoUrl] = {
                                link: obj.native.repositories[repoUrl],
                                json: null
                            };
                        }

                        updateRepo(obj.native.repositories[repoUrl].link, function (sources) {
                            obj.native.repositories[repoUrl].json = sources;
                            objects.setObject(obj._id, obj, function () {
                                showRepoResult(repoUrl, sources);
                            });
                        });
                    } else {
                        updateRepo(repoUrl, function (sources) {
                            showRepoResult(null, sources);
                        });
                    }
                }
            }
        });
    });
}

function deleteAdapter(adapter, callback) {
    var delObj =   [];
    var delState = [];
    var taskCnt =  0;

    function delStates() {
        if (delState.length && !(delState.length % 200)) {
            console.log('Only ' + delState.length + ' states left to be deleted.');
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
            console.log('Deleting ' + delState.length + ' state(s). Be patient...');
        } else if (delObj.length) {
            console.log('Deleting ' + delState.length + ' state(s).');
        }
        delStates();
    }

    function delObjects() {
        if (delObj.length && !(delObj.length % 200)) {
            console.log('Only ' + delObj.length + ' objects left to be deleted.');
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
            console.log('Deleting ' + delObj.length + ' object(s). Be patient...');
        } else if (delObj.length) {
            console.log('Deleting ' + delObj.length + ' object(s).');
        }

        delObjects();
    }

    // Delete instances
    taskCnt++;
    objects.getObjectView("system", "instance", {startkey: 'system.adapter.' + adapter, endkey: 'system.adapter.' + adapter + '.\u9999'}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length === 0) {
                console.log('no instances of adapter ' + adapter + ' found');
            } else {
                var count = 0;

                for (var i = 0; i < doc.rows.length; i++) {
                    if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                    count++;
                }
                if (count) console.log('Counted ' + count + ' instances of ' + adapter);
            }
        }
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    taskCnt++;
    objects.getObjectView("system", "meta", {startkey: adapter + '.meta', endkey: adapter + '.meta\u9999'}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length === 0) {
                console.log('no adapter ' + adapter + ' found');
            } else {
                for (var i = 0; i < doc.rows.length; i++) {
                    if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                }
                console.log('Counted ' + doc.rows.length + ' meta of ' + adapter);
            }
        }
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    taskCnt++;
    objects.getObjectView("system", "adapter", {startkey: 'system.adapter.' + adapter, endkey: 'system.adapter.' + adapter}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length === 0) {
                console.log('no adapter ' + adapter + ' found');
            } else {
                tools = tools || require(__dirname + '/tools.js');
                fs    = fs    || require('fs');
                var count = 0;

                for (var i = 0; i < doc.rows.length; i++) {
                    var adapterConf = doc.rows[i].value;

                    // Delete files from web adapters
                    if (fs.existsSync(__dirname + '/../adapter/' + adapter + "/web/") && adapterConf.common.webservers) {
                        if (typeof adapterConf.common.webservers == "string") adapterConf.common.webservers = [adapterConf.common.webservers];
                        for (var j = 0; j < adapterConf.common.webservers.length; j++) {
                            if (fs.existsSync(__dirname + '/../adapter/' + adapterConf.common.webservers[j] + '/' + adapter + '/')) {
                                // Delete files from adapter/<name>/web to adapter/<webName>/
                                console.log('delete ' + __dirname + '/../adapter/' + adapterConf.common.webservers[j] + '/' + adapter + '/');
                                tools.rmdirRecursiveSync(__dirname + '/../adapter/' + adapterConf.common.webservers[j] + '/' + adapter + '/');
                            }
                            if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapterConf.common.webservers[j] + '/' + adapter + '/')) {
                                // Delete files from adapter/<name>/web to adapter/<webName>/
                                console.log('delete ' + __dirname + '/../node_modules/iobroker.' + adapterConf.common.webservers[j] + '/' + adapter + '/');
                                tools.rmdirRecursiveSync(__dirname + '/../node_modules/iobroker.' + adapterConf.common.webservers[j] + '/' + adapter + '/');
                            }
                        }
                    }
                    if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + "/web/") && adapterConf.common.webservers) {
                        if (typeof adapterConf.common.webservers == "string") adapterConf.common.webservers = [adapterConf.common.webservers];
                        for (var j = 0; j < adapterConf.common.webservers.length; j++) {
                            if (fs.existsSync(__dirname + '/../adapter/' + adapterConf.common.webservers[j] + '/' + adapter + '/')) {
                                // Delete files from adapter/<name>/web to adapter/<webName>/
                                console.log('delete ' + __dirname + '/../adapter/' + adapterConf.common.webservers[j] + '/' + adapter + '/');
                                tools.rmdirRecursiveSync(__dirname + '/../adapter/' + adapterConf.common.webservers[j] + '/' + adapter + '/');
                            }
                            if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapterConf.common.webservers[j] + '/' + adapter + '/')) {
                                // Delete files from adapter/<name>/web to adapter/<webName>/
                                console.log('delete ' + __dirname + '/../node_modules/iobroker.' + adapterConf.common.webservers[j] + '/' + adapter + '/');
                                tools.rmdirRecursiveSync(__dirname + '/../node_modules/iobroker.' + adapterConf.common.webservers[j] + '/' + adapter + '/');
                            }
                        }
                    }


                    if (adapterConf.common.nondeletable) {
                        console.log('Adapter ' + adapter + ' cannot be deleted completely, because non-deletable.');
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
                        if (fs.existsSync(__dirname + '/../adapter/' + adapter)) {
                            console.log('delete ' + __dirname + '/../adapter/' + adapter);
                            tools.rmdirRecursiveSync(__dirname + '/../adapter/' + adapter);
                        }
                        if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter)) {
                            console.log('delete ' + __dirname + '/../node_modules/iobroker.' + adapter);
                            tools.rmdirRecursiveSync(__dirname + '/../node_modules/iobroker.' + adapter);
                        }
                    }
                }
                if (count) console.log('Counted ' + count + ' adapters for ' + adapter);
            }
        }
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    // Delete devices
    taskCnt++;
    objects.getObjectView("system", "device", {}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length !== 0) {
                var count = 0;
                for (var i = 0; i < doc.rows.length; i++) {
                    if (doc.rows[i].value._id.substring(0, adapter.length) == adapter) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                        count++;
                    }
                }
                if (count) console.log('Counted ' + count + ' devices of ' + adapter);
            }
        }
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    // Delete channels
    taskCnt++;
    objects.getObjectView("system", "channel", {}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length !== 0) {
                var count = 0;
                for (var i = 0; i < doc.rows.length; i++) {
                    if (doc.rows[i].value._id.substring(0, adapter.length) == adapter) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                        count++;
                    }
                }
                if (count) console.log('Counted ' + count + ' channels of ' + adapter);
            }
        }
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    // Delete states
    taskCnt++;
    objects.getObjectView("system", "state", {}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length !== 0) {
                var count = 0;
                for (var i = 0; i < doc.rows.length; i++) {
                    if (doc.rows[i].value._id.substring(0, adapter.length) == adapter) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                        count++;
                    }
                }
                if (count) console.log('Counted ' + count + ' states of ' + adapter);
            }
        }
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });
    // Delete WWW pages
    taskCnt++;
    objects.delObject(adapter, function (err, obj, id) {
        if (err) {
            console.log(err);
        } else {
            if (obj) console.log('object ' + adapter + ' deleted');
        }
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    // Delete WWW/admin pages
    taskCnt++;
    objects.delObject(adapter + '.admin', function (err, obj, id) {
        if (err) {
            console.log(err);
        } else {
            if (obj) console.log('object ' + adapter + '.admin deleted');
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
            if (obj.length) console.log ('Counted ' + obj.length + ' states (io.' + adapter + '.*) from redis');
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
            if (obj.length) console.log ('Counted ' + obj.length + ' states (' + adapter + '.*) from redis');
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
            if (obj.length) console.log ('Counted ' + obj.length + ' states (' + adapter + '.*) from redis');
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
            if (obj.length) console.log ('Counted ' + obj.length + ' states (' + adapter + '.*) from redis');
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
            if (obj.length) console.log ('Counted ' + obj.length + ' states (' + adapter + '.*) from redis');
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
            if (obj.length) console.log ('Counted ' + obj.length + ' states (system.adapter.' + adapter + '.*) from redis');
        }

        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    fs = fs || require('fs');

    // Delete physically adapter from disk
    if (fs.existsSync(__dirname + '/../adapter/' + adapter + '/io-package.json')) {
        var pack = require(__dirname + '/../adapter/' + adapter + '/io-package.json');
        if (!pack.common || !pack.common.nondeletable) {
            console.log('delete ' + __dirname + '/../adapter/' + adapter);
            tools = tools || require(__dirname + '/tools.js');
            tools.rmdirRecursiveSync(__dirname + '/../adapter/' + adapter);
        }
    }
    if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json')) {
        var pack = require(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json');
        if (!pack.common || !pack.common.nondeletable) {
            console.log('delete ' + __dirname + '/../node_modules/iobroker.' + adapter);
            tools = tools || require(__dirname + '/tools.js');
            tools.rmdirRecursiveSync(__dirname + '/../node_modules/iobroker.' + adapter);
        }
    }}

function deleteInstance(adapter, instance, callback) {
    var delObj =   [];
    var delState = [];
    var taskCnt =  0;

    function delStates() {
        if (delState.length && !(delState.length % 200)) {
            console.log('Only ' + delState.length + ' states left to be deleted.');
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
            console.log('Deleting ' + delState.length + ' state(s). Be patient...');
        } else if (delObj.length) {
            console.log('Deleting ' + delState.length + ' state(s).');
        }
        delStates();
    }

    function delObjects() {
        if (delObj.length && !(delObj.length % 200)) {
            console.log('Only ' + delObj.length + ' objects left to be deleted.');
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
            console.log('Deleting ' + delObj.length + ' object(s). Be patient...');
        } else if (delObj.length) {
            console.log('Deleting ' + delObj.length + ' object(s).');
        }

        delObjects();
    }

    // Delete instance
    taskCnt++;
    objects.getObjectView("system", "instance", {startkey: 'system.adapter.' + adapter + '.' + instance, endkey: 'system.adapter.' + adapter + '.' + instance}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length === 0) {
                console.log('no instances of adapter ' + adapter + '.' + instance + ' found');
            } else {
                for (var i = 0; i < doc.rows.length; i++) {
                    if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                }
                console.log('Counted ' + doc.rows.length + ' instances of ' + adapter + '.' + instance);
            }
        }
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    taskCnt++;
    objects.getObjectList({include_docs: true}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length === 0) {
                console.log('no adapter ' + adapter + ' found');
            } else {
                var count = 0;
                var name = adapter + '.' + instance;
                for (var i = 0; i < doc.rows.length; i++) {
                    if (doc.rows[i] && doc.rows[i].value && doc.rows[i].value._id !== undefined &&
                        (doc.rows[i].value._id.substring(0, name.length) == name ||
                            doc.rows[i].value._id.substring(0, ('system.adapter.' + name).length) == 'system.adapter.' + name ||
                            doc.rows[i].value._id.substring(0, name.length) == name)) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                        count++;
                    }
                }
                if (count) console.log('Counted ' + count + ' objects of ' + adapter + '.' + instance);
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
            console.log(err);
        } else {
            if (doc.rows.length !== 0) {
                var count = 0;
                var name = adapter + '.' + instance;
                for (var i = 0; i < doc.rows.length; i++) {
                    if (doc.rows[i].value._id.substring(0, name.length) == name) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                        count++;
                    } else
                    if (doc.rows[i].value._id.substring(0, ("system.adapter." + name).length) == "system.adapter." + name) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                        count++;
                    }
                }
                if (count) console.log('Counted ' + count + ' devices of ' + adapter + '.' + instance);
            }
        }
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    // Delete channels
    taskCnt++;
    objects.getObjectView("system", "channel", {}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length !== 0) {
                var count = 0;
                var name = adapter + '.' + instance;
                for (var i = 0; i < doc.rows.length; i++) {
                    if (doc.rows[i].value._id.substring(0, name.length) == name) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                        count++;
                    } else
                    if (doc.rows[i].value._id.substring(0, ("system.adapter." + name).length) == "system.adapter." + name) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                        count++;
                    }
                }
                if (count) console.log('Counted ' + count + ' channels of ' + adapter + '.' + instance);
            }
        }
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    // Delete states
    taskCnt++;
    objects.getObjectView("system", "state", {}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length === 0) {
                console.log('no states ' + adapter + ' found');
            } else {
                var count = 0;
                var name = adapter + '.' + instance;
                for (var i = 0; i < doc.rows.length; i++) {
                    if (doc.rows[i].value._id.substring(0, ("system.adapter." + name).length) == "system.adapter." + name) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                        count++;
                    } else
                    if (doc.rows[i].value._id.substring(0, name.length) == name) {
                        if (delObj.indexOf(doc.rows[i].value._id) == -1) delObj.push(doc.rows[i].value._id);
                        count++;
                    }
                }
                if (count) console.log('Counted ' + count + ' objects of states of ' + adapter + '.' + instance);
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
        if (obj.length) console.log ('Counted ' + obj.length + ' states "system.adapter.' + adapter + '.' + instance + '*" from redis');
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    taskCnt++;
    states.getKeys('io.' + adapter + '.' + instance + '*', function (err, obj) {
        for (var i = 0; i < obj.length; i++) {
            if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
        }
        if (obj.length) console.log ('Counted ' + obj.length + ' states "io.' + adapter + '.' + instance + '*" from redis');
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    taskCnt++;
    states.getKeys('log.' + adapter + '.' + instance + '*', function (err, obj) {
        for (var i = 0; i < obj.length; i++) {
            if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
        }
        if (obj.length) console.log ('Counted ' + obj.length + ' states "log.' + adapter + '.' + instance + '*" from redis');
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    taskCnt++;
    states.getKeys('messagebox.' + adapter + '.' + instance + '*', function (err, obj) {
        for (var i = 0; i < obj.length; i++) {
            if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
        }
        if (obj.length) console.log ('Counted ' + obj.length + ' states "messagebox.' + adapter + '.' + instance + '*" from redis');
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    taskCnt++;
    states.getKeys(adapter + '.' + instance + '*', function (err, obj) {
        for (var i = 0; i < obj.length; i++) {
            if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
        }
        if (obj.length) console.log ('Counted ' + obj.length + ' states "' + adapter + '.' + instance + '*" from redis');

        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });
}

function setupReady(callback) {
    if (!callback) {
        console.log('database setup done. you can add adapters and start iobroker now');
        process.exit(0);
    } else {
        callback();
    }
}

function dbSetup(iopkg, callback) {
    if (iopkg.objects && iopkg.objects.length > 0) {
        var obj = iopkg.objects.pop();
        objects.setObject(obj._id, obj, function () {
            console.log('object ' + obj._id + ' created');
            setTimeout(dbSetup, 25, iopkg, callback);
        });
    } else {
        // Default Password for user 'admin' is 'iobroker'
        password('iobroker').hash(null, null, function (err, res) {
            // Create user here and not in io-package.js because of hash password
            var tasks = 0;

            tasks++;
            objects.setObject('system.user.admin', {
                type: 'user',
                common: {
                    name:      'admin',
                    password:   res,
                    dontDelete: true,
                    enabled:    true
                },
                native: {}
            }, function () {
                console.log('object system.user.admin created');
                if (!(--tasks)) setupReady(callback);
            });

            tasks++;
            objects.getObject('system.meta.uuid', function (err, res) {
                if (!err && res && res.native && res.native.uuid) {
                    if (!(--tasks)) setupReady(callback);
                } else {
                    objects.setObject('system.meta.uuid', {
                        type: 'meta',
                        common: {
                            name: 'uuid',
                            type: 'uuid'
                        },
                        native: {
                            uuid: uuid()
                        }
                    }, function () {
                        console.log('object system.meta.uuid created');
                        if (!(--tasks)) setupReady(callback);
                    });
                }
            });
        });
    }
}

// Returns a RFC4122 compliant v4 UUID https://gist.github.com/LeverOne/1308368 (DO WTF YOU WANT TO PUBLIC LICENSE)
function uuid(a, b) {
    b = a = '';
    while (a++ < 36) {
        b += ((a * 51) & 52) ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-';
    }
    return b;
}
