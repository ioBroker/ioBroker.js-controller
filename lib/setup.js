/**
 *
 *  ioBroker.js-controller Controller start/stop and install script
 *
 *  7'2014-2015 bluefox <bluefox@ccu.io>
 *              hobbyquaker <hq@ccu.io>
 *
 *
 */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";


// TODO need info about progress of stopping

var yargs = require('yargs')
    .usage('Commands:\n' +
        '$0 setup [--objects <host>] [--states <host>] [custom]\n' +
        '$0 start\n' +
        '$0 stop\n' +
        '$0 start <adapter>\n' +
        '$0 stop <adapter>\n' +
        '$0 restart\n' +
        '$0 restart <adapter>\n' +
        '$0 add <adapter> [--enabled] [--host <host>] [--port <port>]\n' +
        '$0 install <adapter>\n' +
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
    .default('objects',   '127.0.0.1')
    .default('states',   '127.0.0.1')
    .default('lang',    'en')
;

var Objects; // constructor
var objects; // instance
var States;  // constructor
var states;  // instance

var fs =    require('fs');
var tools = require(__dirname + '/tools.js');
var ncp;
var password;
var extend;
var mime;

switch (yargs.argv._[0]) {

    case 'start':
    case 'stop':
        // Start stop of adapter
        if (yargs.argv._[1]) {
            Objects =       require(__dirname + '/objects');
            var adapter = yargs.argv._[1];
            // If user accidentally wrote iobroker.adapter => remove adapter
            if (adapter && adapter.match(/^ioBroker\./i)) {
                adapter = adapter.substring('iobroker.'.length);
            }

            if (adapter.indexOf('.') == -1) {
                console.log('Please enter instance of adapter, e.g. "web.0"');
                processExit(1);
            }

            dbConnect(function () {
                objects.getObject('system.adapter.' + adapter, function (err, obj) {
                    if (!err && obj) {
                        if (yargs.argv._[0] == 'start') {
                            obj.common.enabled = true;
                            objects.setObject('system.adapter.' + adapter, obj, function () {
                                console.log('Adapter "' + adapter + ' started.');
                                processExit();
                            });
                        } else {
                            obj.common.enabled = false;
                            objects.setObject('system.adapter.' + adapter, obj, function () {
                                console.log('Adapter "' + adapter + ' stopped.');
                                processExit();
                            });
                        }
                    } else {
                        console.log('Adapter "' + adapter + ' does not exist.');
                        processExit(24);
                    }
                });
            });
        } else {
            var daemon = require('daemonize2').setup({
                main: '../controller.js',
                name: 'ioBroker controller',
                pidfile: __dirname + '/iobroker.pid',
                cwd: '../',
                stopTimeout: 1000
            });
            daemon.on('error', function (error) {
                console.log('Error: ' + error.message);
            });
            daemon.on('stopped', function () {

            });
            daemon[yargs.argv._[0]]();
        }
        break;

    case 'restart':
        if (yargs.argv._[1]) {
            Objects =       require(__dirname + '/objects');
            var adapter = yargs.argv._[1];
            // If user accidentally wrote iobroker.adapter => remove adapter
            if (adapter && adapter.match(/^ioBroker\./i)) {
                adapter = adapter.substring('iobroker.'.length);
            }
            if (adapter.indexOf('.') == -1) {
                console.log('Please enter instance of adapter, e.g. "web.0"');
                processExit(1);
            }

            dbConnect(function () {
                objects.getObject('system.adapter.' + adapter, function (err, obj) {
                    if (!err && obj) {
                        obj.common.enabled = true;
                        objects.setObject('system.adapter.' + adapter, obj, function () {
                            console.log('Adapter "' + adapter + ' restarted.');
                            processExit();
                        });
                    } else {
                        console.log('Adapter "' + adapter + ' does not exist.');
                        processExit(24);
                    }
                });
            });
        } else {
            var daemon = require("daemonize2").setup({
                main: "../controller.js",
                name: "ioBroker controller",
                pidfile: __dirname + "/iobroker.pid",
                cwd: "../",
                stopTimeout: 1000
            });
            daemon.on('stopped', function () {
                daemon.start();
            }).on('notrunning', function () {
                daemon.start();
            }).on('error', function (error) {
                console.log('Error: ' + error.message);
            });
            daemon.stop();
        }
        break;

    case '_restart':
        restartController(function() {
            processExit();
        });
        break;

    case 'update':
        Objects =       require(__dirname + '/objects');
        extend =        require('node.extend');
        var repoUrl =   yargs.argv._[1]; // Repo url or name
        dbConnect(function () {
            showRepo(repoUrl, function () {
                setTimeout(function () {
                    processExit();
                }, 2000);
            });
        });
        break;

    case 'setup':
        if (yargs.argv._[1] == 'custom') {
            var readline = require('readline');

            var rl = readline.createInterface({
                input:  process.stdin,
                output: process.stdout
            });

            rl.question('Type of objects DB [file, couch, redis], default [file]: ', function(otype) {
               if (!otype) {
                    otype ='file';
                } else {
                    otype = otype.toLowerCase();
                    if (otype != 'file' && otype != 'couch' && otype != 'redis') {
                        console.log('Unknown objects type: ' + otype);
                        processExit(23);
                    }
                }
                rl.question('Host of objects DB(' + otype + '), default[127.0.0.1]: ', function (ohost) {
                    if (!ohost) {
                        ohost = '127.0.0.1';
                    } else {
                        ohost = ohost.toLowerCase();
                    }
                    var op;

                    if (otype == 'file') {
                        op = 9001;
                    } else if (otype == 'redis') {
                        op = 6379;
                    } else if (otype == 'couch') {
                        op = 5984;
                    }

                    rl.question('Port of objects DB(' + otype + '), default[' + op + ']: ', function (oport) {
                        var ot;
                        if (!oport) {
                            if (otype == 'file') {
                                oport = 9001;
                                ot = 'file';
                            } else if (otype == 'redis') {
                                ot = 'redis';
                                oport = 6379;
                            } else if (otype == 'couch') {
                                ot = 'redis';
                                oport = 5984;
                            }
                        } else {
                            oport = oport.toLowerCase();
                        }
                        rl.question('Type of states DB [file, redis], default [' + ot + ']: ', function (stype) {
                            if (!stype) {
                                stype = ot;
                            } else {
                                stype = stype.toLowerCase();
                                if (stype != 'file' && stype != 'redis') {
                                    console.log('Unknown states type: ' + stype);
                                    processExit(23);
                                }
                            }
                            rl.question('Host of states DB (' + stype + '), default[' + ohost + ']: ', function (shost) {
                                if (!shost) {
                                    shost = ohost;
                                } else {
                                    shost = shost.toLowerCase();
                                }
                                var sp;

                                if (stype == 'file') {
                                    sp = 9000;
                                } else if (stype == 'redis') {
                                    sp = 6379;
                                }

                                rl.question('Port of states DB (' + stype + '), default[' + sp + ']: ', function (sport) {
                                    if (!sport) {
                                        if (stype == 'file') {
                                            sport = 9000;
                                        } else if (stype == 'redis') {
                                            oport = 6379;
                                        }
                                    } else {
                                        oport = oport.toLowerCase();
                                    }
                                    if ((stype == 'file' && (shost == 'localhost' || shost == '127.0.0.1')) ||
                                        (otype == 'file' && (ohost == 'localhost' || ohost == '127.0.0.1'))) {
                                        rl.question('Data directory (file), default[../' + tools.getDefaultDataDir() + ']: ', function (dir) {
                                            if (!dir) dir = tools.getDefaultDataDir();
                                            rl.close();
                                            config = require(__dirname + '/../conf/iobroker-dist.json');
                                            console.log('creating conf/iobroker.json');
                                            config.objects.host    = ohost;
                                            config.objects.type    = otype;
                                            config.objects.port    = oport;
                                            if (config.objects.type == 'file') config.objects.dataDir = dir;
                                            config.states.host     = shost;
                                            config.states.type     = stype;
                                            config.states.port     = sport;
                                            if (config.states.type == 'file') config.states.dataDir = dir;
                                            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(config, null, 2));
                                        });
                                    } else {
                                        rl.close();
                                        config = require(__dirname + '/../conf/iobroker-dist.json');
                                        console.log('creating conf/iobroker.json');
                                        config.objects.host    = ohost;
                                        config.objects.type    = otype;
                                        config.objects.port    = oport;
                                        config.states.host     = shost;
                                        config.states.type     = stype;
                                        config.states.port     = sport;
                                        config.states.dataDir  = undefined;
                                        config.objects.dataDir = undefined;
                                        fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(config, null, 2));
                                    }
                                });
                            });
                        });
                    });
                });
            });
        } else {
            setup(function (isFirst) {
                if (isFirst) {
                    //install admin adapter
                    createInstance('admin', {enabled: true}, function () {
                        processExit();
                    });
                } else {
                    processExit();
                }
            }, yargs.argv._[1] == 'first');
        }
        break;

    case 'add':
    case 'install':
        Objects =       require(__dirname + '/objects');
        mime =          require('mime');
        extend =        require('node.extend');
        ncp =           require('ncp').ncp;

        ncp.limit =     16;

        var name =      yargs.argv._[1];
        var repoUrl =   yargs.argv._[2];
        // If user accidentally wrote iobroker.adapter => remove adapter
        if (name && name.match(/^ioBroker\./i)) {
            name = name.substring('iobroker.'.length);
        }

        var adapterDir = tools.getAdapterDir(name);

        if (!fs.existsSync(adapterDir)) {
            downloadPacket(repoUrl, name, false, function () {
                if (yargs.argv._[0] != 'install') {
                    dbConnect(function () {
                        createInstance(name, yargs.argv, function () {
                            processExit();
                        });
                    });
                }
            });
        } else {
            if (yargs.argv._[0] != 'install') {
                dbConnect(function () {
                    createInstance(name, yargs.argv, function () {
                        processExit();
                    });
                });
            } else {
                console.log('adapter "' + name + '" yet installed. Use "upgrade" to install newer version.');
            }
        }
        break;

    case 'upload':
        mime =         require('mime');
        Objects =      require(__dirname + '/objects');
        var name =     yargs.argv._[1];
        if (name) {
            dbConnect(function () {
                uploadAdapter(name, true, true, function () {
                    uploadAdapter(name, false, true, function () {
                        processExit();
                    });
                });
            });
        } else {
            console.log('No adapter name found!');
            yargs.showHelp();
            processExit(1);
        }
        break;

    case 'delete':
    case 'del':
        var adpr     = yargs.argv._[1];
        var instance = yargs.argv._[2];

        // If user accidentally wrote iobroker.adapter => remove adapter
        if (adpr && adpr.match(/^ioBroker\./i)) {
            adpr = adpr.substring('iobroker.'.length);
        }
        if (!adpr) {
            yargs.showHelp();
            processExit(2);
        }

        if (adpr && adpr.indexOf('.') != -1) {
            var parts = adpr.split('.');
            adpr      = parts[0];
            instance  = parts[1];
        }
        extend =     require('node.extend');

        if (instance !== null && instance !== undefined && instance !== "") {
            dbConnect(function () {
                deleteInstance(adpr, instance, function () {
                    processExit();
                });
            });
        } else {
            dbConnect(function () {
                deleteAdapter(adpr, function (a, resultCode) {
                    processExit(resultCode);
                });
            });
        }
        break;

    case 'object':
        var cmd = yargs.argv._[1];
        var id  = yargs.argv._[2];
        if (id) {
            var config   = require(tools.getConfigFileName());
            Objects =      require(__dirname + '/objects');

            if (cmd == 'get') {
                dbConnect(function () {
                    objects.getObject(id, function (err, res) {
                        if (err || !res) {
                            console.log('not found');
                            processExit(3);
                        } else {
                            console.log(JSON.stringify(res));
                            processExit();
                        }
                    });
                });
            } else
            if (cmd == "del") {
                dbConnect(function () {
                    objects.delObject(id, function (err) {
                        if (err) {
                            console.log('not found: ' + err);
                            processExit(3);
                        } else {
                            console.log(id + ' deleted');
                            processExit();
                        }
                    });
                });
            } else {
                console.log('Unknown command or empty: "' + cmd + '"');
                processExit(3);
            }
        }
        break;

    case 'state':
        var cmd = yargs.argv._[1];
        var id  = yargs.argv._[2];
        if (id) {
            dbConnect(function () {
                if (cmd == "get") {
                    states.getState(id, function (err, obj) {
                        if (err || !obj) {
                            console.log('Error: ' + err);
                        } else {
                            console.log(JSON.stringify(obj));
                        }
                        processExit();
                    });
                } else if (cmd == 'getplain') {
                    states.getState(id, function (err, obj) {
                        if (err || !obj) {
                            console.log('Error: ' + err);
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
                        processExit();
                    });
                } else if (cmd == 'set') {
                    var val = yargs.argv._[3];
                    if (!val) {
                        console.log('Invalid format: No value found.');
                        yargs.showHelp();
                        processExit();
                    } else {
                        try {
                            val = JSON.parse(val);
                        } catch (e) {
                            console.log('Invalid format: Cannot parse json object: ' + val);
                        }

                        states.setState(id, val, function () {
                            processExit();
                        });
                    }
                } else if (cmd == 'setplain') {
                    var val = yargs.argv._[3];
                    if (!val) {
                        console.log('Invalid format: No value found.');
                        yargs.showHelp();
                        processExit();
                    } else {
                        states.setState(id, val, function () {
                            processExit();
                        });
                    }
                } else if (cmd == "del") {
                    var val = yargs.argv._[3];
                    if (!val) {
                        console.log('Invalid format: No value found.');
                        yargs.showHelp();
                        processExit();
                    } else {
                        try {
                            val = JSON.parse(val);
                        } catch (e) {
                            console.log('Invalid format: Cannot parse json object: ' + val);
                        }

                        states.delState(id, function (err) {
                            if (err) {
                                console.log('not found: ' + err);
                                processExit(3);
                            } else {
                                console.log(id + ' deleted');
                                processExit();
                            }
                        });
                    }
                } else {
                    console.log('Invalid format: unknown state command');
                    yargs.showHelp();
                }
            });
        } else {
            console.log('Invalid format: no id found');
            yargs.showHelp();
        }
        break;

    case 'message':
        var adapter = yargs.argv._[1];
        var instances = [];
        if (adapter) {
            if (adapter.indexOf('.') != -1) instances.push('system.adapter.' + adapter);

            dbConnect(function () {
                objects.getObjectView('system', 'instance', {startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, function (err, res) {
                    if (res && res.rows.length) {
                        if (instances.length === 0) {
                            for (var t = 0; t < res.rows.length; t++) {
                                instances.push(res.rows[i].id);
                            }
                        }
                        var cmd = yargs.argv._[2];
                        var msg = yargs.argv._[3];
                        if (!msg) {
                            msg = cmd;
                            cmd = "send";
                        }
                        if (!msg) {
                            console.log('Invalid format: No message found.');
                            yargs.showHelp();
                            processExit();
                        } else {
                            for (var i = 0; i < instances.length; i++) {
                                states.pushMessage(instances[i], {command: cmd, message: msg, from: 'setup'}, processExit);
                            }
                        }
                    } else {
                        console.log('No one instance of adapter "' + adapter + '" found');
                        processExit(4);
                    }
                });
            });
        } else {
            console.log('Invalid format: no adapter found');
            yargs.showHelp();
        }
        break;

    case 'upgrade':
        Objects = require(__dirname + '/objects');
        extend =       require('node.extend');
        mime =         require('mime');

        var adapter = yargs.argv._[1];
        var repoUrl = yargs.argv._[2];

        // If user accidentally wrote iobroker.adapter => remove adapter
        if (adapter && adapter.match(/^ioBroker\./i)) {
            adapter = adapter.substring('iobroker.'.length);
        }

        var config  = require(tools.getConfigFileName());

        if (adapter && !repoUrl && adapter.indexOf('/') != -1) {
            repoUrl = adapter;
            adapter = null;
        }

        dbConnect(function () {
            if (adapter) {
                if (adapter == 'self') {
                    upgradeController(repoUrl, true, function () {
                        processExit();
                    });
                } else {
                    upgradeAdapter(repoUrl, adapter, true, function () {
                        processExit();
                    });
                }
            } else {
                tools.getRepositoryFile(repoUrl, function (links) {
                    var result = [];
                    for (var name in links) {
                        result.push(name);
                    }
                    upgradeAdapterHelper(links, result, 0, false, function () {
                        upgradeController(links, yargs.argv.force, function () {
                            processExit();
                        });
                    });
                });
            }
        });

        break;

    case 'clean':
        var yes = yargs.argv._[1];
        if (yes != 'yes') {
            console.log('Command "clean" clears all Objects and States. To execute it write "iobroker clean yes"');
        } else {
            cleanDatabase(true, function (count) {
                console.log('Deleted ' + count + ' states');
                restartController(function () {
                    console.log('Restarting ioBroker...');
                    processExit();
                });
            });
        }
        break;

    case 'restore':
        if (!yargs.argv._[1]) {
            console.log('Please specify the file name to restore.');
            processExit(11);
        } else {
            restoreBackup(yargs.argv._[1], function () {
                console.log("System successfully restored!");
                processExit(0);
            });
        }
        break;

    case 'backup':
       var name = yargs.argv._[1];

        dbConnect(function () {
            createBackup(name, function (filePath) {
                console.log('Backup created: ' + filePath);
                processExit(0);
            });
        });
        break;

    default:
        yargs.showHelp();

}

// Save objects before exit
function processExit(exitCode) {
    if (objects && objects.destroy) objects.destroy();
    if (states  && states.destroy)  states.destroy();
    process.exit(exitCode);
}

function cleanDatabase(isDeleteDb, callback) {
    dbConnect(function () {

        if (isDeleteDb) {
            objects.destroyDB(function () {

                // Clean up states
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

                // Clean up states
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
    var spawn = require('child_process').spawn;
    if (fs.existsSync(__dirname + '/../log/restart.log')) fs.unlinkSync(__dirname + '/../log/restart.log');
    var out = fs.openSync(__dirname + '/../log/restart.log', 'a');
    var err = fs.openSync(__dirname + '/../log/restart.log', 'a');

    console.log('Starting node restart.js');
    var child = spawn('node', [__dirname + '/restart.js'], {

        detached: true,
        stdio: ['ignore', out, err]
    });

    child.unref();

    if (callback) {
        callback();
    } else {
        processExit();
    }
}

function createBackup(name, callback) {
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
        if (fs.existsSync(tools.getConfigFileName())) result.config = JSON.parse(fs.readFileSync(tools.getConfigFileName()));
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
                        processExit(9);
                    }

                    fs.unlinkSync(__dirname + '/../tmp/backup/backup.json');
                    if (callback) callback('backups/' + name + '.tar.gz');
                });
            });
        });

    });
}

function mkpathSync(rootpath, dirpath) {
    // Remove filename
    dirpath = dirpath.split('/');
    dirpath.pop();
    if (!dirpath.length) return;

    for (var i = 0; i < dirpath.length; i++) {
        rootpath += dirpath[i] + '/';
        if (!fs.existsSync(rootpath)) {
            if (dirpath[i] != '..') {
                fs.mkdirSync(rootpath);
            } else {
                throw 'Cannot create ' + rootpath + dirpath.join('/');
            }
        }
    }
};

function copyFile(source, target, cb) {
    var cbCalled = false;

    var rd = fs.createReadStream(source);
    rd.on("error", function(err) {
        done(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on("error", function(err) {
        done(err);
    });
    wr.on("close", function(ex) {
        done();
    });
    rd.pipe(wr);

    function done(err) {
        if (!cbCalled) {
            if (cb) cb(err);
            cbCalled = true;
        }
    }
}

function setupObjects(callback) {
    Objects  = require(__dirname + '/objects');
    var iopkg = JSON.parse(fs.readFileSync(__dirname + '/../io-package.json'));
    dbConnect(function () {
        dbSetup(iopkg, callback);
    });
}

function setup(callback, ignoreIfExist) {
    password = require(__dirname + '/password');

    var config;
	var isCreated = false;
    var platform = require('os').platform();
    var otherInstallDirs = [];

    // Delete files for other OS
    if (platform.match(/^win/)) {
        otherInstallDirs.push(__dirname + '/../iobroker');
    } else {
        otherInstallDirs.push(__dirname + '/../_service_ioBroker.bat');
        otherInstallDirs.push(__dirname + '/../iobroker.bat');
    }

    for (var t = 0; t < otherInstallDirs.length; t++) {
        if (fs.existsSync(otherInstallDirs[t])) {
            var stat = fs.statSync(otherInstallDirs[t]);
            if (stat.isDirectory()) {
                var files = fs.readdirSync(otherInstallDirs[t]);
                var cnt = 0;
                for (var f = 0; f < files.length; f++) {
                    fs.unlinkSync(otherInstallDirs[t] + '/' + files[f]);
                }
                fs.rmdirSync(otherInstallDirs[t]);
            } else {
                fs.unlinkSync(otherInstallDirs[t]);
            }
        }
    }

    // Create log and tmp directory
    if (!fs.existsSync(__dirname + '/../tmp')) fs.mkdirSync(__dirname + '/../tmp');

    if (!fs.existsSync(tools.getConfigFileName())) {
		isCreated = true;
        config = require(__dirname + '/../conf/iobroker-dist.json');
        console.log('creating conf/iobroker.json');
        config.objects.host = yargs.argv.objects || '127.0.0.1';
        config.states.host  = yargs.argv.states  || '127.0.0.1';
        config.dataDir      = tools.getDefaultDataDir();
        mkpathSync(__dirname + '/', '../' + config.dataDir);
        // Create default data dir
        fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(config, null, 2));

        try {
            // Create
            if (__dirname.toLowerCase().replace(/\\/g, '/').indexOf('node_modules/iobroker.js-controller') != -1) {
                var parts = config.dataDir.split('/');
                // Remove iobroker-data/
                parts.pop();
                parts.pop();
                var path = parts.join('/');

                if (!fs.existsSync(__dirname + '/../' + path + '/log')) fs.mkdirSync(__dirname + '/../' + path + '/log');
            } else {
                if (!fs.existsSync(__dirname + '/../log')) fs.mkdirSync(__dirname + '/../log');
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
            if (_modules[i].test(/^iobroker\./i) && dirs.indexOf(_modules[i].substring('iobroker.'.length)) == -1) dirs.push(_modules[i]);
        }
        // if installed as npm
        if (fs.existsSync(__dirname + '/../../../node_modules/iobroker.js-controller')) {
            _modules = fs.readdirSync(__dirname + '/../..');
            for (var i = 0; i < _modules.length; i++) {
                if (_modules[i].test(/^iobroker\./i &&
                    _modules[i].substring('iobroker.'.length) != 'js-controller') &&
                    dirs.indexOf(_modules[i].substring('iobroker.'.length)) == -1) dirs.push(_modules[i]);
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
                        pkg = JSON.parse(fs.readFileSync(_adapterDir + '/io-package.json'));
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
    if (!name) {
        console.log('Invalid backup name: empty!');
        processExit(10);
    }
    name = name.replace(/\\/g, '/');
    if (name.indexOf('/') == -1) {
        name = __dirname + '/../backups/' + name;
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
        // Open file
        var restore = JSON.parse(fs.readFileSync(__dirname + '/../tmp/backup/backup.json'));

        // stop all adapters
        cleanDatabase(false, function () {
            dbConnect(function () {
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
        if (!iopack) {
            var adapterDir = tools.getAdapterDir(name);
            try {
                iopack = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json'));
            } catch(e) {
                console.log('Cannot find io-package.json in ' + adapterDir);
                processExit(10);
            }
        }

        var count = 0;
        installNpm(name, function (_name) {
            // Upload www and admin files of adapter into CouchDB
            count++;
            uploadAdapter(name, false, true, function () {
                // extend all adapter instance default configs with current config
                // (introduce potentially new attributes while keeping current settings)
                upgradeAdapterObjects(name, iopack, function () {
                    count--;
                    if (!count) {
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
    var adapterDir = tools.getAdapterDir(adapter);

    // Read actual description of installed adapter with version
    if (!fs.existsSync(adapterDir + '/io-package.json')) {
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
    if (fs.existsSync(adapterDir + '/io-package.json')) {
        ioInstalled = require(adapterDir + '/io-package.json');
    }

    // If version is included in repository
    if (repoUrl[adapter].version) {
        if (!forceDowngrade && (repoUrl[adapter].version == ioInstalled.common.version ||
            upToDate(repoUrl[adapter].version, ioInstalled.common.version))) {
            console.log('Adapter "' + adapter + '"' + ((adapter.length < 15) ? new Array(15 - adapter.length).join(' '): '') + ' is up to date.');
            if (callback) callback();
        } else {
            // Get the adapter from web site
            downloadPacket(sources, adapter, false, function (name, ioPack) {
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
                downloadPacket(sources, adapter, false, function (name, ioPack) {
                    finishUpgrade(name, ioPack, callback);
                });
            }
        });
    } else {
        if (forceDowngrade) {
            console.log('Unable to get version for "' + adapter + '". Update anyway.');
            // Get the adapter from web site
            downloadPacket(sources, adapter, false, function (name, ioPack) {
                finishUpgrade(name, ioPack, callback);
            });
        } else {
            console.log('Unable to get version for "' + adapter + '".');
        }
    }
}

function setChmod(callback) {
    var platform = require('os').platform();
    console.log('Host "' + require('os').hostname() + '" (' + platform + ') updated');
    // Call command chmod +x __dirname if under linux or darwin
    if (platform == 'linux' || platform == 'darwin') {
        var exec = require('child_process').exec;
        var dir = __dirname.replace(/\\/g, '/');
        // remove last /lib"
        var parts = dir.split('/');
        parts.pop();
        dir = parts.join('/');
        var cmd = 'chmod 777 -R ' + dir;
        console.log('Execute: ' + cmd);
        var child = exec(cmd);
        child.stderr.pipe(process.stdout);
        child.on('exit', function () {
            console.log('Chmod finished. Restart controller');
            if (callback) callback();
        });
    } else {
        if (callback) callback();
    }
}

function upgradeController(repoUrl, forceDowngrade, callback) {
    if (!repoUrl || typeof repoUrl != 'object') {
        tools.getRepositoryFile(repoUrl, function (sources) {
            if (!sources) {
                console.log('Cannot get repository under "' + repoUrl + '"');
                if (callback) callback();
            } else {
                upgradeController(sources, forceDowngrade, callback);
            }
        });
        return;
    }

    var hostname = require('os').hostname();
    var installed = JSON.parse(fs.readFileSync(__dirname + '/../io-package.json'));
    if (!installed || !installed.common || !installed.common.version) {
        console.log('Host "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is not installed.');
        if (callback) callback();
        return;
    }
    if (!repoUrl[installed.common.name]) {
        // no info for controller
        console.log('Cannot find this controller "' + installed.common.name + '" in repository.');

        if (callback) callback();
        return;
    }

    if (repoUrl[installed.common.name].version) {
        if (!forceDowngrade && (repoUrl[installed.common.name].version == installed.common.version ||
            upToDate(repoUrl[installed.common.name].version, installed.common.version))) {
            console.log('Host    "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is up to date.');
            if (callback) callback();
        } else {
            // Get the controller from web site
            downloadPacket(repoUrl, installed.common.name, true, function (name) {
                installNpm(function (_name) {
                    setChmod(function () {
                        restartController(callback);
                    });
                });
            });
        }
    } else {
        tools.getJson(repoUrl[installed.common.name].meta, function (ioPack) {
            if ((!ioPack || !ioPack.common) && !forceDowngrade) {
                console.log('Cannot read version. Write "iobroker upgrade self --force" to upgrade controller anyway.');
                if (callback) callback();
                return;
            }

            if ((ioPack && ioPack.common && ioPack.common.version == installed.common.version) ||
                (!forceDowngrade && ioPack && ioPack.common && upToDate(ioPack.common.version, installed.common.version))) {
                console.log('Host    "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is up to date.');
                if (callback) callback();
            } else {
                // Get the controller from web site
                downloadPacket(repoUrl, (ioPack && ioPack.common && ioPack.common.name) ? ioPack.common.name : installed.common.name, true, function (name) {
                    installNpm(function (_name) {
                        setChmod(function () {
                            restartController(callback);
                        });
                    });
                });
            }

        });
    }
}

function dbConnect(callback) {
    var config = require(tools.getConfigFileName());
    if (!config.states)  config.states  = {type: 'file'};
    if (!config.objects) config.objects = {type: 'file'};

    Objects =    require(__dirname + '/objects');
    States =     require(__dirname + '/states');

    // Give to controller 2 seconds for connection
    var isObjectConnected = false;
    var isStatesConnected = false;

    // Detect timeout or try to open file itself
    var timeout = setTimeout(function () {
        if (isObjectConnected && isStatesConnected) return;

        if (!isObjectConnected) {
            if (config.objects.type == 'file') {
                // Just open in memory DB itself
                Objects = require(__dirname + '/objectsInMemServer');
                objects = new Objects({
                    connection: config.objects,
                    logger: {
                        debug: function (msg) {
                        },
                        info: function (msg) {
                        },
                        warn: function (msg) {
                            console.log(msg);
                        },
                        error: function (msg) {
                            console.log(msg);
                        }
                    },
                    connected: function () {
                        isObjectConnected = true;
                        if (isStatesConnected && typeof callback === 'function') callback();
                    }
                });
            } else {
                console.log('No connection to ' + config.objects.host + ':' + config.objects.port + '[' + config.objects.type + ']');
                processExit(22);
            }
        }

        if (!isStatesConnected) {
            if (config.states.type == 'file') {
                // Just open in memory DB itself
                States = require(__dirname + '/statesInMemServer');
                states = new States({
                    connection: config.states,
                    logger: {
                        debug: function (msg) {
                        },
                        info: function (msg) {
                        },
                        warn: function (msg) {
                            console.log(msg);
                        },
                        error: function (msg) {
                            console.log(msg);
                        }
                    },
                    connected: function () {
                        isStatesConnected = true;
                        if (isObjectConnected && typeof callback === 'function') callback();
                    }
                });
            } else {
                console.log('No connection to states ' + config.states.host + ':' + config.states.port + '[' + config.states.type + ']');
                processExit(22);
            }
        }
    }, 2000);

    // try to connect as client
    objects = new Objects({
        connection: config.objects,
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
            if (isObjectConnected) return;
            isObjectConnected = true;

            if (isStatesConnected && typeof callback === 'function') callback();
        }
    });

    states = new States({
        connection: config.states,
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
            if (isStatesConnected) return;
            isStatesConnected = true;

            if (isObjectConnected && typeof callback === 'function') callback();
        }
    });
}

// Upload www folder of adapter into ObjectsDB
function uploadAdapter(adapter, isAdmin, forceUpload, callback) {
    var rev;
    var id = adapter + (isAdmin ? '.admin' : '');
    var adapterDir = tools.getAdapterDir(adapter);
    var dir = adapterDir + (isAdmin ? '/admin' : '/www');
    var files = [];

    if (!isAdmin) {
        var cfg;
        // check for common.wwwDontUpload (needed for legacy adapter)
        if (fs.existsSync(adapterDir + '/io-package.json')) {
            cfg = require(adapterDir + '/io-package.json');
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
            if (file == '.gitignore') {
                upload();
                return;
            }
            file = files.pop();
            var mimeType = mime.lookup(file);
            var attName;
            if (file.indexOf('/adapter/' + adapter) == -1) {
                attName = file.split('/iobroker.');
            } else {
                attName = file.split('/adapter/');
            }
            attName = attName.pop();
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
                    if (res) rev = res.rev;
                    setTimeout(function () {
                        upload(adapter);
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
                        if (!file.match(/\.npmignore$/) && !file.match(/\.gitignore$/)) results.push(file);
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
                if (res) rev = res.rev;
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

function downloadPacket(repoUrl, packetName, useSystemNpm, callback) {
    var url;
    var name;

    if (!repoUrl || typeof repoUrl != 'object') {
        tools.getRepositoryFile(repoUrl, function (sources) {
            downloadPacket(sources, packetName, useSystemNpm, callback);
        });
        return;
    }
    var sources = repoUrl;

    if (sources[packetName]) {
        url = sources[packetName].url;

        if (url && packetName == 'js-controller') {
            if (fs.existsSync(__dirname + '/../../../node_modules/iobroker.js-controller')) url = null;
        }

        if (!url && packetName != 'example') {
            // Install node modules
            var cwd = __dirname.replace(/\\/g, '/');
            if (fs.existsSync(__dirname + '/../../../node_modules/iobroker.js-controller')) {
                // js-controller installed as npm
                cwd = cwd.split('/');
                cwd.splice(cwd.length - 3, 3);
                cwd = cwd.join('/');
            }
            var cmd = 'npm install iobroker.' + packetName + ' --production --prefix "' + cwd + '"';
            console.log(cmd);

            if (!useSystemNpm) {
                tools.initNpm(cwd, function (er, npm) {
                    npm.commands.install(['iobroker.' + packetName], function (er, data) {
                        if (er) {
                            console.log('Cannot install iobroker.' + packetName + ': ' + er);
                            processExit(25);
                        }
                        // command succeeded, and data might have some info
                        if (callback) callback(packetName);
                    });
                });
            } else {
                // Install node modules as system call

                // System call used for update of js-controller itself,
                // because during installation npm packet will be deleted too, but some files must be loaded even during the install process.
                var exec = require('child_process').exec;
                var child = exec(cmd);
                child.stderr.pipe(process.stdout);
                child.on('exit', function (code, signal) {
                    if (code) {
                        console.log('Cannot install iobroker.' + packetName + ': ' + code);
                        processExit(25);
                    }
                    // command succeeded
                    if (callback) callback(packetName);
                });
            }
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
        if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1) {
            console.log('Unknown packetName ' + packetName);
            processExit(5);
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
                    processExit(6);
                }

                var destination = __dirname + "/..";
                if (!packetIo.common.controller) destination += '/adapter/' + packetIo.common.name;

                console.log('copying ' + source + ' to ' + destination + '(Version: ' + packetIo.common.version + ')');

                ncp(source, destination, function (err) {
                    if (err) {
                        console.log('ncp error: ' + err);
                        processExit(7);
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
                processExit(8);
            }
        } else {
            console.log('Packet is empty! Installation terminated.');
            if (typeof callback === 'function') callback(name, 'Packet is empty');
            processExit(12);
        }
    });
}

function installNpm(adapter, callback) {
    var path = __dirname;
    if (typeof adapter == 'function') {
        callback = adapter;
        adapter = undefined;
    }

    if (adapter) path = tools.getAdapterDir(adapter);

    if (fs.existsSync(path + '/package.json')) {
        tools.initNpm(path, function (er, npm) {
            // Install node modules of adapter
            console.log('npm install --production --prefix "' + path + '"');
            npm.commands.install([], function (er) {
                if (er) {
                    console.log('Cannot install packages for "' + adapter + '": ' + JSON.stringify(er));
                    processExit(25);
                } else {
                    if (callback) callback(adapter);
                }
            });
        });
    } else {
        if (callback) callback(adapter);
    }
}

function callInstallOfAdapter(adapter, config, callback) {
    var path = tools.getAdapterDir(adapter);

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
    var adapterDir = tools.getAdapterDir(adapter);

    console.log('install adapter ' + adapter);

    if (!fs.existsSync(adapterDir + '/io-package.json')) {
        if (installCount == 2) {
            console.log('Cannot install ' + adapter);
            processExit(13);
            return;
        }

        downloadPacket(null, adapter, false, function () {
            installAdapter(adapter, callback);
        });
        return;
    }
    installCount = 0;
    var adapterConf;
    try {
        adapterConf = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json'));
    } catch (e) {
        console.log('error: reading io-package.json ' + e);
        processExit(14);
    }

    // Check if the operation system is ok
    if (adapterConf.common && adapterConf.common.os) {
        if (typeof adapterConf.common.os == 'string' && adapterConf.common.os != require('os').platform()) {
            console.log('Adapter does not support current os. Required ' + adapterConf.common.os + '. Actual platform: ' + require('os').platform());
            processExit(15);
        } else {
            if (adapterConf.common.os.indexOf(require('os').platform()) == -1) {
                console.log('Adapter does not support current os. Required one of ' + adapterConf.common.os.join(', ') + '. Actual platform: ' + require('os').platform());
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
                        createInstance(deps[i], _options, function (name) {
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
                            console.log('error setObject ' + obj._id + ' ' + err);
                            processExit(17);
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

    if (!fs.existsSync(adapterDir + '/node_modules')) {
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

//options = enabled, host, port
function createInstance(adapter, options, callback) {
    var adapterDir = tools.getAdapterDir(adapter);
    if (typeof options == 'function') {
        callback = options;
        options = null;
    }
    if (!options) options = {};
    if (!options.host) options.host = require('os').hostname();
    if (options.enabled === 'true')  options.enabled = true;
    if (options.enabled === 'false') options.enabled = false;
	
    objects.getObject('system.adapter.' + adapter, function (err, doc) {

        // Adapter is not installed - install it now
        if (err || !doc || !doc.common.installedVersion) {
            installAdapter(adapter, function () {
                createInstance(adapter, options, callback);
            });
            return;
        }

        // Check if some web pages should be uploaded
        uploadAdapter(name, true, false, function () {
            uploadAdapter(name, false, false, function () {
                objects.getObjectView('system', 'instanceStats', {startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, function (err, res) {
                    if (err || !res) {
                        console.log('error: view instanceStats ' + err);
                        processExit(18);
                        return;
                    }
                    var adapterConf;
                    var instance = (res.rows && res.rows[0] && res.rows[0].value ? res.rows[0].value.max + 1 : 0);

                    // Todo count started instances
                    if (doc.common.singleton && instance > 0) {
                        console.log('error: this adapter does not allow multiple instances');
                        processExit(19);
                        return;
                    }

                    // TODO: singletonHost one on host
                    if (doc.common.singletonHost && instance > 0) {
                        console.log('error: this adapter does not allow multiple instances on one host');
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
					
                    console.log('create instance ' + adapter);

                    var _id = 'system.adapter.' + adapter + '.' + instance;

                    var objs;
                    if (!instanceObj.common.onlyWWW) {
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
                            console.log('error: reading io-package.json ' + e);
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

function showRepo(repoUrl, callback) {
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
                                if (callback) callback();
                            });
                        });
                    } else {
                        updateRepo(repoUrl, function (sources) {
                            showRepoResult(null, sources);
                            if (callback) callback();
                        });
                    }
                }
            }
        });
    });
}

function deleteAdapter(adapter, callback) {
    var delObj =     [];
    var delState =   [];
    var taskCnt =    0;
    var resultCode = 0;

    function delStates() {
        if (delState.length && (delState.length % 200) === 0) {
            console.log('Only ' + delState.length + ' states left to be deleted.');
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
            console.log('Deleting ' + delState.length + ' state(s). Be patient...');
        } else if (delObj.length) {
            console.log('Deleting ' + delState.length + ' state(s).');
        }
        delStates();
    }

    function delObjects() {
        if (delObj.length && (delObj.length % 200) === 0) {
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
    objects.getObjectView("system", "instance", {startkey: 'system.adapter.' + adapter, endkey: 'system.adapter.' + adapter + '\u9999'}, function (err, doc) {
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
            if (doc.rows.length !== 0) {
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
    objects.getObjectView("system", "adapter", {startkey: 'system.adapter.' + adapter, endkey: 'system.adapter.' + adapter + '\u9999'}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length !== 0) {
                var count = 0;

                for (var i = 0; i < doc.rows.length; i++) {
                    var adapterConf = doc.rows[i].value;

                    if (adapterConf.common.nondeletable) {
                        console.log('Adapter ' + adapter + ' cannot be deleted completely, because non-deletable.');
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
                        if (fs.existsSync(__dirname + '/../adapter/' + adapter)) {
                            console.log('delete ' + __dirname + '/../adapter/' + adapter);
                            tools.rmdirRecursiveSync(__dirname + '/../adapter/' + adapter);
                        }
                        if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter)) {
                            console.log('delete ' + __dirname + '/../node_modules/iobroker.' + adapter);
                            tools.rmdirRecursiveSync(__dirname + '/../node_modules/iobroker.' + adapter);
                        }
                        if (fs.existsSync(__dirname + '/../../../node_modules/iobroker.js-controller') &&
                            fs.existsSync(__dirname + '/../../../node_modules/iobroker.' + adapter)) {
                            console.log('delete ' + __dirname + '/../../iobroker.' + adapter);
                            tools.rmdirRecursiveSync(__dirname + '/../../iobroker.' + adapter);
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
                    if (doc.rows[i].value._id.substring(0, adapter.length) == adapter ||
                        doc.rows[i].value._id.substring(0, ('system.adapter.' + adapter).length) == 'system.adapter.' + adapter) {
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
            if (obj.length) console.log ('Counted ' + obj.length + ' states (io.' + adapter + '.*) from states');
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
            if (obj.length) console.log ('Counted ' + obj.length + ' states (' + adapter + '.*) from states');
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
            if (obj.length) console.log ('Counted ' + obj.length + ' states (' + adapter + '.*) from states');
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
            if (obj.length) console.log ('Counted ' + obj.length + ' states (' + adapter + '.*) from states');
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
            if (obj.length) console.log ('Counted ' + obj.length + ' states (' + adapter + '.*) from states');
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
            if (obj.length) console.log ('Counted ' + obj.length + ' states (system.adapter.' + adapter + '.*) from states');
        }

        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    if (!taskCnt) delStatesAndObjects();

    // Delete physically adapter from disk
    if (fs.existsSync(__dirname + '/../adapter/' + adapter + '/io-package.json')) {
        var pack = require(__dirname + '/../adapter/' + adapter + '/io-package.json');
        if (!pack.common || !pack.common.nondeletable) {
            console.log('delete ' + __dirname + '/../adapter/' + adapter);
            tools.rmdirRecursiveSync(__dirname + '/../adapter/' + adapter);
        }
    }
    if (fs.existsSync(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json')) {
        var _pack = require(__dirname + '/../node_modules/iobroker.' + adapter + '/io-package.json');
        if (!_pack.common || !_pack.common.nondeletable) {
            console.log('delete ' + __dirname + '/../node_modules/iobroker.' + adapter);
            tools.rmdirRecursiveSync(__dirname + '/../node_modules/iobroker.' + adapter);
        }
    }
    if (fs.existsSync(__dirname + '/../../../node_modules/iobroker.js-controller') &&
        fs.existsSync(__dirname + '/../../../node_modules/iobroker.' + adapter + '/io-package.json')) {
        var _pack = require(__dirname + '/../../iobroker.' + adapter + '/io-package.json');
        if (!_pack.common || !_pack.common.nondeletable) {
            console.log('delete ' + __dirname + '/../../iobroker.' + adapter);
            tools.rmdirRecursiveSync(__dirname + '/../../iobroker.' + adapter);
        }
    }
}

function deleteInstance(adapter, instance, callback) {
    var delObj =   [];
    var delState = [];
    var taskCnt =  0;

    function delStates() {
        if (delState.length && (delState.length % 200) === 0) {
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
        if (delObj.length && (delObj.length % 200) === 0) {
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
            if (doc.rows.length !== 0) {
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
        if (obj.length) console.log ('Counted ' + obj.length + ' states "system.adapter.' + adapter + '.' + instance + '*" from states');
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    taskCnt++;
    states.getKeys('io.' + adapter + '.' + instance + '*', function (err, obj) {
        for (var i = 0; i < obj.length; i++) {
            if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
        }
        if (obj.length) console.log ('Counted ' + obj.length + ' states "io.' + adapter + '.' + instance + '*" from states');
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    taskCnt++;
    states.getKeys('log.' + adapter + '.' + instance + '*', function (err, obj) {
        for (var i = 0; i < obj.length; i++) {
            if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
        }
        if (obj.length) console.log ('Counted ' + obj.length + ' states "log.' + adapter + '.' + instance + '*" from states');
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    taskCnt++;
    states.getKeys('messagebox.' + adapter + '.' + instance + '*', function (err, obj) {
        for (var i = 0; i < obj.length; i++) {
            if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
        }
        if (obj.length) console.log ('Counted ' + obj.length + ' states "messagebox.' + adapter + '.' + instance + '*" from states');
        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    taskCnt++;
    states.getKeys(adapter + '.' + instance + '*', function (err, obj) {
        for (var i = 0; i < obj.length; i++) {
            if (delState.indexOf(obj[i]) == -1) delState.push(obj[i]);
        }
        if (obj.length) console.log ('Counted ' + obj.length + ' states "' + adapter + '.' + instance + '*" from states');

        taskCnt--;
        if (!taskCnt) delStatesAndObjects();
    });

    if (!taskCnt) delStatesAndObjects();
}

function setupReady(callback) {
    if (!callback) {
        console.log('database setup done. you can add adapters and start iobroker now');
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
        objects.getObject('system.meta.uuid', function (err, obj) {
            if (err || !obj) {
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
            } else {
                console.log('object system.meta.uuid exists');
                setupReady(callback);
            }
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
