/**
 *
 *  js-controller Controller start/stop and install script
 *
 *  7'2014-2018 bluefox <dogafox@gmail.com>
 *         2014 hobbyquaker <hq@ccu.io>
 *
 */

/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
'use strict';

// TODO need info about progress of stopping

var fs    = require('fs');
var tools = require(__dirname + '/tools');

require('events').EventEmitter.prototype._maxListeners = 100;
process.setMaxListeners(0);

var yargs;

function initYargs() {
    yargs = require('yargs')
            .usage('Commands:\n' +
                tools.appName + ' setup [--objects <host>] [--states <host>] [custom]\n' +
                tools.appName + ' start\n' +
                tools.appName + ' stop\n' +
                tools.appName + ' start <adapter>\n' +
                tools.appName + ' stop <adapter>\n' +
                tools.appName + ' start all\n' +
                tools.appName + ' restart\n' +
                tools.appName + ' restart <adapter>\n' +
                tools.appName + ' add <adapter> [desiredNumber] [--enabled] [--host <host>] [--port <port>]\n' +
                tools.appName + ' install <adapter>\n' +
                tools.appName + ' url <url> [<name>]\n' +
                tools.appName + ' del <adapter>\n' +
                tools.appName + ' del <adapter>.<instance>\n' +
                tools.appName + ' update [repository url] [--updatable/--u] [--installed/--i]\n' +
                tools.appName + ' upgrade [repository url]\n' +
                tools.appName + ' upgrade self [repository url]\n' +
                tools.appName + ' upgrade <adapter> [repository url]\n' +
                tools.appName + ' upload <pathToLocalFile> <pathIn' + tools.appName + '>\n' +
                tools.appName + ' upload all\n' +
                tools.appName + ' upload <adapter>\n' +
                tools.appName + ' object get <id>\n' +
                tools.appName + ' object del <id>\n' +
                tools.appName + ' object chmod <object-mode> [state-mode] <id>\n' +
                tools.appName + ' object chown <user> <group> <id>\n' +
                tools.appName + ' object list <id>\n' +
                tools.appName + ' state get <id>\n' +
                tools.appName + ' state getplain <id>\n' +
                tools.appName + ' state set <id> <value> [ack]\n' +
                tools.appName + ' state del <id>\n' +
                tools.appName + ' message <adapter>[.instanceid] <command> [<message>]\n' +
                tools.appName + ' list <type> [filter]\n' +
                tools.appName + ' chmod <mode> <file>\n' +
                tools.appName + ' chown <user> <group> <file>\n' +
                tools.appName + ' touch <file>\n' +
                tools.appName + ' rm <file>\n' +
                tools.appName + ' file read <' + tools.appName + '-path-to-read> [<filesystem-path-to-write>]\n' +
                tools.appName + ' file write <filesystem-path-to-read> <' + tools.appName + '-path-to-read> \n' +
                tools.appName + ' user add <user> [--ingroup group] [--password pass]\n' +
                tools.appName + ' user del <user>\n' +
                tools.appName + ' user passwd <user> [--password pass]\n' +
                tools.appName + ' user enable <user>\n' +
                tools.appName + ' user disable <user>\n' +
                tools.appName + ' user get <user>\n' +
                tools.appName + ' user check <user> [--password pass]\n' +
                tools.appName + ' group add <group>\n' +
                tools.appName + ' group del <group>\n' +
                tools.appName + ' group list <group>\n' +
                tools.appName + ' group enable <group>\n' +
                tools.appName + ' group disable <group>\n' +
                tools.appName + ' group get <group>\n' +
                tools.appName + ' group adduser <group> <user>\n' +
                tools.appName + ' group deluser <group> <user>\n' +
                tools.appName + ' set <adapter>.<instance> [--port port] [--ip address] [--ssl true|false]\n' +
                tools.appName + ' license <license.file or license.text>\n' +
                tools.appName + ' clean\n' +
                tools.appName + ' backup\n' +
                tools.appName + ' restore <backup name or path>\n' +
                tools.appName + ' <command> --timeout 5000\n' +
                tools.appName + ' status\n' +
                tools.appName + ' repo [name]\n' +
                tools.appName + ' repo add <name> <path or url>\n' +
                tools.appName + ' repo set <name>\n' +
                tools.appName + ' repo del <name>\n' +
                tools.appName + ' uuid\n' +
                tools.appName + ' unsetup\n' +
                tools.appName + ' multihost <enable|disable> [--secure true|false]\n' +
                tools.appName + ' multihost browse\n' +
                tools.appName + ' multihost connect\n' +
                tools.appName + ' version [adapter]\n' +
                tools.appName + ' [adapter] -v\n')
            //.default('objects',   '127.0.0.1')
            //.default('states',   '127.0.0.1')
            //.default('lang',    'en')
        ;
    return yargs;
}

function showHelp(_yargs) {
    if (_yargs) {
        _yargs.showHelp();
    } else if (yargs) {
        yargs.showHelp();
    }
}

var Objects; // constructor
var objects; // instance
var States;  // constructor
var states;  // instance

// params can have: 
// pretty, force, password, ingroup, v, version, timeout, 
// enabled, disabled, port, ssl, ip, updatable, host, enabled, port,
// objects, states
function processCommand(command, args, params, callback) {
    if (typeof args   === 'function') {
        callback = args;
        args = null;
    }
    if (typeof params === 'function') {
        callback = params;
        params = null;
    }
    if (!params) params = {};
    if (!args) args = [];
    if (!callback) callback = processExit;
    
    switch (command) {

        case 'start':
        case 'stop':
            (function () {
                // Start stop of adapter
                if (args[0]) {
                    Objects =       require(__dirname + '/objects');
                    var adapter = args[0];
                    // If user accidentally wrote tools.appName.adapter => remove adapter
                    var regExp = new RegExp('^' + tools.appName + '\\.', 'i');
                    if (adapter && regExp.test(adapter)) {
                        adapter = adapter.substring(tools.appName.length + 1);
                    }

                    dbConnect(params, function () {
                        if (adapter === 'all') {
                            objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, function (err, objs) {
                                var count = 0;
                                for (var i = 0; i < objs.rows.length; i++) {
                                    if (objs.rows[i].value.type !== 'instance') continue;
                                    var obj = objs.rows[i].value;
                                    if (command === 'start') {
                                        if (!obj.common.enabled) {
                                            obj.common.enabled = true;
                                            count++;
                                            obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                            obj.ts = new Date().getTime();
                                            objects.setObject(obj._id, obj, function () {
                                                console.log('Adapter "' + adapter + '" started.');
                                                if (!--count) callback();
                                            });
                                        }
                                    } else {
                                        if (obj.common.enabled) {
                                            obj.common.enabled = false;
                                            count++;
                                            obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                            obj.ts = new Date().getTime();
                                            objects.setObject(obj._id, obj, function () {
                                                console.log('Adapter "' + adapter + '" stopped.');
                                                if (!--count) callback();
                                            });
                                        }
                                    }
                                }
                                if (!count) callback();
                            });
                        } else {
                            if (adapter.indexOf('.') === -1) {
                                objects.getObjectList({startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, function (err, objs) {
                                    var obj;
                                    if (!err && objs) {
                                        for (var i = 0; i < objs.rows.length; i++) {
                                            if (objs.rows[i].value.type !== 'instance') continue;
                                            if (obj) {
                                                console.log('Please enter instance of adapter, e.g. "' + obj._id.replace('system.adapter.', '') + '"');
                                                callback(1);
                                            }
                                            obj = objs.rows[i].value;
                                        }
                                    }
                                    if (!obj) {
                                        console.log('Cannot find any instances of "' + adapter + '"');
                                        callback(1);
                                    } else {
                                        if (command === 'start') {
                                            if (!obj.common.enabled) {
                                                obj.common.enabled = true;
                                                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                                obj.ts = new Date().getTime();
                                                objects.setObject(obj._id, obj, function () {
                                                    console.log('Adapter "' + obj._id.replace('system.adapter.', '') + '" started.');
                                                    callback();
                                                });
                                            } else {
                                                callback();
                                            }
                                        } else {
                                            if (obj.common.enabled) {
                                                obj.common.enabled = false;
                                                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                                obj.ts = new Date().getTime();
                                                objects.setObject(obj._id, obj, function () {
                                                    console.log('Adapter "' + obj._id.replace('system.adapter.', '') + '" stopped.');
                                                    callback();
                                                });
                                            } else {
                                                callback();
                                            }
                                        }
                                    }
                                });
                            } else {
                                objects.getObject('system.adapter.' + adapter, function (err, obj) {
                                    if (!err && obj) {
                                        if (command === 'start') {
                                            obj.common.enabled = true;
                                            obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                            obj.ts = new Date().getTime();
                                            objects.setObject('system.adapter.' + adapter, obj, function () {
                                                console.log('Adapter "' + adapter + '" started.');
                                                callback();
                                            });
                                        } else {
                                            obj.common.enabled = false;
                                            obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                            obj.ts = new Date().getTime();
                                            objects.setObject('system.adapter.' + adapter, obj, function () {
                                                console.log('Adapter "' + adapter + '" stopped.');
                                                callback();
                                            });
                                        }
                                    } else {
                                        console.log('Adapter "' + adapter + '" does not exist.');
                                        callback(24);
                                    }
                                });
                            }
                        }
                    });
                } else {
                    var memoryLimitMB = 0;
                    try {
                        var config = require(tools.getConfigFileName());
                        if (config && config.system && config.system.memoryLimitMB) {
                            memoryLimitMB = parseInt(config.system.memoryLimitMB, 10);
                        }
                    } catch (err) {
                        console.warn('Cannot read memoryLimitMB');
                        console.warn('May be config file does not exist.\nPlease call "' + tools.appName + ' setup first" to initialize the settings.')
                    }
                    var startObj = {
                        main:       '../controller.js',
                        name:       tools.appName + ' controller',
                        pidfile:    __dirname + '/' + tools.appName + '.pid',
                        cwd:        '../',
                        stopTimeout: 6000
                    };
                    if (memoryLimitMB) startObj.args = '--max-old-space-size=' + memoryLimitMB;

                    var daemon = require('daemonize2').setup(startObj);
                    daemon.on('error', function (error) {
                        console.log('Error: ' + error.message);
                    });
                    daemon.on('stopped', function () {
                        // start KILLALL script if something still runs
                        if (command === 'stop' && !require('os').platform().match(/^win/)) {
                            var data = '';
                            fs.chmodSync(__dirname + '/../killall.sh', '777');
                            var child = require('child_process').spawn(__dirname + '/../killall.sh', []);
                            child.stdout.on('data', function (data) {
                                data += data.toString().replace('\n', '');
                            });
                            child.stderr.on('data', function (data) {
                                data += data.toString().replace('\n', '');
                            });
                            child.on('exit', function (exitCode) {
                                console.log('Exit code for "killall.sh": ' + exitCode);
                                callback();
                            });
                        }
                    });
                    daemon[command]();
                }
            })();
            break;

        case 'status':
        case 'isrun':
            (function () {
                dbConnect(params, function (objects, states, isOffline) {
                    if (isOffline) {
                        console.log(tools.appName + ' is not running');
                        callback(100);
                    } else {
                        console.log(tools.appName + ' is running');
                        callback();
                    }
                });
            })();
            break;

        case 'r':
        case 'restart':
            (function () {
                if (args[0]) {
                    Objects =       require(__dirname + '/objects');
                    var adapter = args[0];
                    // If user accidentally wrote tools.appName.adapter => remove adapter
                    var regExp = new RegExp('^' + tools.appName + '\\.', 'i');
                    if (adapter && regExp.test(adapter)) {
                        adapter = adapter.substring(tools.appName.length + 1);
                    }

                    dbConnect(params, function () {

                        if (adapter.indexOf('.') === -1) {
                            objects.getObjectList({startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, function (err, objs) {
                                var obj;
                                if (!err && objs) {
                                    for (var i = 0; i < objs.rows.length; i++) {
                                        if (objs.rows[i].value.type !== 'instance') continue;
                                        if (obj) {
                                            console.log('Please enter instance of adapter, e.g. "' + obj._id.replace('system.adapter.', '') + '"');
                                            callback(1);
                                        }
                                        obj = objs.rows[i].value;
                                    }
                                }
                                if (!obj) {
                                    console.log('Cannot find any instances of "' + adapter + '"');
                                    callback(1);
                                } else {
                                    obj.common.enabled = true;
                                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                    obj.ts = new Date().getTime();
                                    objects.setObject(obj._id, obj, function (err) {
                                        console.log('Adapter "' + obj._id.replace('system.adapter.', '') + '" restarted.');
                                        callback();
                                    });
                                }
                            });
                        } else {
                            objects.getObject('system.adapter.' + adapter, function (err, obj) {
                                if (!err && obj) {
                                    obj.common.enabled = true;
                                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                    obj.ts = new Date().getTime();
                                    objects.setObject('system.adapter.' + adapter, obj, function () {
                                        console.log('Adapter "' + adapter + '" restarted.');
                                        callback();
                                    });
                                } else {
                                    console.log('Adapter "' + adapter + '" does not exist.');
                                    callback(24);
                                }
                            });
                        }
                    });
                } else {
                    var memoryLimitMB = 0;
                    try {
                        var config = require(tools.getConfigFileName());
                        if (config && config.system && config.system.memoryLimitMB) {
                            memoryLimitMB = parseInt(config.system.memoryLimitMB, 10);
                        }
                    } catch (err) {
                        console.warn('Cannot read memoryLimitMB');
                    }
                    var startObj = {
                        main: '../controller.js',
                        name: tools.appName + ' controller',
                        pidfile: __dirname + '/' + tools.appName + '.pid',
                        cwd: '../',
                        stopTimeout: 1000
                    };
                    if (memoryLimitMB) startObj.args = '--max-old-space-size=' + memoryLimitMB;

                    var daemon = require('daemonize2').setup(startObj);
                    daemon.on('stopped', function () {
                        daemon.start();
                    }).on('notrunning', function () {
                        daemon.start();
                    }).on('error', function (error) {
                        console.log('Error: ' + error.message);
                    });
                    daemon.stop();
                }
            })();
            break;

        case '_restart':
            restartController(function () {
                callback();
            });
            break;

        case 'update':
            (function () {
                Objects     = require(__dirname + '/objects');
                var repoUrl = args[0]; // Repo url or name
                dbConnect(params, function () {
                    var Repo = require(__dirname + '/setup/setupRepo.js');
                    var repo = new Repo({
                        objects:     objects
                    });

                    repo.showRepo(repoUrl, params, function () {
                        setTimeout(function () {
                            callback();
                        }, 2000);
                    });
                });
            })();
            break;

        case 'setup':
            (function () {
                if (args[0] === 'custom') {
                    var readline = require('readline');

                    var config;
                    // read actual configuration
                    try {
                        if (fs.existsSync(tools.getConfigFileName())) {
                            config = JSON.parse(fs.readFileSync(tools.getConfigFileName(), 'utf8'));
                        } else {
                            config = require(__dirname + '/../conf/' + tools.appName + '-dist.json');
                        }
                    } catch (e) {
                        config = require(__dirname + '/../conf/' + tools.appName + '-dist.json');
                    }

                    var rl = readline.createInterface({
                        input:  process.stdin,
                        output: process.stdout
                    });

                    rl.question('Type of objects DB [(f)ile, (c)ouch, (r)edis], default [file]: ', function (otype) {
                        if (!otype) {
                            otype = 'file';
                        } else {
                            otype = (otype || '').toLowerCase();

                            if (otype === 'r') otype = 'redis';
                            if (otype === 'f') otype = 'file';
                            if (otype === 'c') otype = 'couch';

                            if (otype !== 'file' && otype !== 'couch' && otype !== 'redis') {
                                console.log('Unknown objects type: ' + otype);
                                callback(23);
                            }
                        }
                        rl.question('Host / Unix Socket of objects DB(' + otype + '), default[127.0.0.1]: ', function (ohost) {
                            if (!ohost) {
                                ohost = '127.0.0.1';
                            } else {
                                ohost = (ohost || '').toLowerCase();
                            }
                            var op;

                            if (otype === 'file') {
                                op = 9001;
                            } else if (otype === 'redis') {
                                op = 6379;
                            } else if (otype === 'couch') {
                                op = 5984;
                            }

                            rl.question('Port of objects DB(' + otype + '), default[' + op + ']: ', function (oport) {
                                var ot;
                                if (!oport) {
                                    if (otype === 'file') {
                                        oport = 9001;
                                        ot = 'file';
                                    } else if (otype === 'redis') {
                                        ot = 'redis';
                                        oport = 6379;
                                    } else if (otype === 'couch') {
                                        ot = 'couch';
                                        oport = 5984;
                                    }
                                } else {
                                    oport = parseInt(oport, 10);
                                    if (isNaN(oport)) {
                                        console.log('Invalid objects port: ' + oport);
                                        callback(23);
                                    }
                                }
                                rl.question('Type of states DB [(f)file, (r)edis], default [' + ot + ']: ', function (stype) {
                                    if (!stype) {
                                        stype = ot;
                                    } else {
                                        stype = (stype || '').toLowerCase();

                                        if (stype === 'r') stype = 'redis';
                                        if (stype === 'f') stype = 'file';

                                        if (stype !== 'file' && stype !== 'redis') {
                                            console.log('Unknown states type: ' + stype);
                                            callback(23);
                                        }
                                    }

                                    rl.question('Host / Unix Socket of states DB (' + stype + '), default[' + ohost + ']: ', function (shost) {
                                        if (!shost) {
                                            shost = ohost;
                                        } else {
                                            shost = (shost || '').toLowerCase();
                                        }
                                        var sp;

                                        if (stype === 'file') {
                                            sp = 9000;
                                        } else if (stype === 'redis') {
                                            sp = 6379;
                                        }

                                        rl.question('Port of states DB (' + stype + '), default[' + sp + ']: ', function (sport) {
                                            if (!sport) {
                                                if (stype === 'file') {
                                                    sport = 9000;
                                                } else if (stype === 'redis') {
                                                    sport = 6379;
                                                }
                                            } else {
                                                sport = parseInt(sport, 10);
                                                if (isNaN(sport)) {
                                                    console.log('Invalid states port: ' + sport);
                                                    callback(23);
                                                }
                                            }
                                            if ((stype === 'file' && (shost === 'localhost' || shost === '127.0.0.1')) ||
                                                (otype === 'file' && (ohost === 'localhost' || ohost === '127.0.0.1'))) {
                                                rl.question('Data directory (file), default[../' + tools.getDefaultDataDir() + ']: ', function (dir) {
                                                    if (!dir) dir = tools.getDefaultDataDir();

                                                    rl.question('Host name of this machine [' + require('os').hostname() + ']: ', function (hname) {
                                                        if (!hname) {
                                                            hname = '';
                                                        } else {
                                                            hname = (hname || '');
                                                            if (hname.match(/\s/)) {
                                                                console.log('Invalid host name: ' + hname);
                                                                callback(23);
                                                            }
                                                        }
                                                        rl.close();
                                                        console.log('creating conf/' + tools.appName + '.json');
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
                                                        fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(config, null, 2));
                                                    });
                                                });
                                            } else {
                                                rl.question('Host name of this machine [' + require('os').hostname() + ']: ', function (hname) {
                                                    if (!hname) {
                                                        hname = '';
                                                    } else {
                                                        hname = (hname || '');
                                                        if (hname.match(/\s/)) {
                                                            console.log('Invalid host name: ' + hname);
                                                            callback(23);
                                                        }
                                                    }
                                                    rl.close();
                                                    console.log('creating conf/' + tools.appName + '.json');
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
                                                    fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(config, null, 2));
                                                });
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                } else {
                    var Setup = require(__dirname + '/setup/setupSetup.js');
                    var setup = new Setup({
                        dbConnect:   dbConnect,
                        processExit: callback,
                        params:      params
                    });
                    var i = 0;
                    var isFirst;
                    var isRedis;
                    while (args[i] !== undefined) {
                        if (args[i] === 'first' || args[i] === '--first') {
                            isFirst = true;
                        } else if (args[i] === 'redis' || args[i] === '--redis') {
                            isRedis = true;
                        }
						i++;
                    }

                    setup.setup(function (isFirst, isRedis) {
                        if (isFirst) {
                            var Install = require(__dirname + '/setup/setupInstall.js');
                            var install = new Install({
                                objects:       objects,
                                states:        states,
                                installNpm:    installNpm,
                                getRepository: getRepository,
                                processExit:   callback,
                                params:        params
                            });

                            //install admin adapter
                            install.createInstance('admin', {enabled: true, ignoreIfExists: true}, function () {
                                // check if discovery is installed too
                                try {
                                    var path = require.resolve(tools.appName + '.discovery');
                                    if (path) {
                                        install.createInstance('discovery', {enabled: true, ignoreIfExists: true}, function () {
                                            callback();
                                        });
                                    }
                                } catch (e) {
                                    // no discovery found
                                    callback();
                                }
                            });
                        } else {
                            callback();
                        }
                    }, isFirst, isRedis);
                }
            })();
            break;

        case 'url':
            (function () {
                Objects =       require(__dirname + '/objects');

                var url  =      args[0];
                var name =      args[1];

                if (url[0] === '"' && url[url.length - 1] === '"') {
                    url = url.substring(1, url.length - 1);
                }
                // try to fix URL
                if (url.match(/^https:\/\/github\.com\//)) {
                    url = url.replace(/\.git$/, '');
                    if (!url.match(/\.zip$/) && !url.match(/\.gz$/) && !url.match(/\/tarball\/[^\/]+$/)) {
                        url += '/tarball/master';
                    }
                }
                console.log('install ' + url);

                dbConnect(params, function () {
                    var Install = require(__dirname + '/setup/setupInstall.js');
                    var install = new Install({
                        objects:       objects,
                        states:        states,
                        installNpm:    installNpm,
                        getRepository: getRepository,
                        processExit:   callback,
                        params:        params
                    });

                    install.npmInstall(url, true, false, function (_url, installDir) {
                        var Upload = require(__dirname + '/setup/setupUpload.js');
                        var upload = new Upload({
                            states:      states,
                            objects:     objects,
                            processExit: callback
                        });

                        // Try to extract name from URL
                        if (!name) {
                            if (url.match(/\.tgz$|\.zip/)) {
                                var parts = url.split('/');
                                var last = parts.pop();
                                var mm = last.match(/\.([-_\w\d]+)\-[.\d]+/);
                                if (mm) {
                                    name = mm[1];
                                }
                            } else {
                                var reG = new RegExp(tools.appName + '\\.([-_\\w\\d]+)\\/');
                                var m = reG.exec(url);
                                if (m) {
                                    name = m[1];
                                } else {
                                    var reg = new RegExp(tools.appName.toLowerCase() + '\\.([-_\\w\\d]+)\\/');
                                    m = reg.exec(url);
                                    if (m) name = m[1];
                                }
                            }
                        }

                        if (name) {
                            upload.uploadAdapter(name, true, true, function () {
                                upload.uploadAdapter(name, false, true, function () {
                                    callback();
                                });
                            });
                        } else {
                            // Try to find io-package.json with newest date
                            var dirs = fs.readdirSync(installDir);
                            var date = null;
                            var dir  = null;
                            for (var i = 0; i < dirs.length; i++) {
                                if (fs.existsSync(installDir + '/' + dirs[i] + '/io-package.json')) {
                                    var stat = fs.statSync(installDir + '/' + dirs[i] + '/io-package.json');
                                    if (!date || stat.mtime.getTime() > date.getTime()) {
                                        dir  = dirs[i];
                                        date = stat.mtime;
                                    }
                                }
                            }
                            // if modify time is not older than one hour
                            if (dir && (new Date()).getTime() - date.getTime() < 3600000) {
                                name = dir.substring(tools.appName.length + 1);
                                upload.uploadAdapter(name, true, true, function () {
                                    upload.uploadAdapter(name, false, true, function () {
                                        callback();
                                    });
                                });
                            } else {
                                callback();
                            }
                        }
                    });
                });
            })();
            break;

        case 'a':
        case 'add':
        case 'install':
        case 'i':
            (function () {
                Objects =       require(__dirname + '/objects');

                let name =      args[0];
                let instance =  args[1];
                let repoUrl =   args[2];

                if (parseInt(instance, 10).toString() !== (instance || '').toString()) {
                    repoUrl = instance;
                    instance = null;
                }
                if (parseInt(repoUrl, 10).toString() === (repoUrl || '').toString()) {
                    const temp = instance;
                    instance = repoUrl;
                    repoUrl = temp;
                }
                if (parseInt(instance, 10).toString() === (instance || '').toString()) {
                    instance = parseInt(instance, 10);
                    params.instance = instance;
                }

                // If user accidentally wrote tools.appName.adapter => remove adapter
                const regExp = new RegExp('^' + tools.appName + '\\.', 'i');
                if (name && regExp.test(name)) {
                    name = name.substring(tools.appName.length + 1);
                }

                let adapterDir = tools.getAdapterDir(name);

                dbConnect(params, function () {
                    const Install = require(__dirname + '/setup/setupInstall.js');
                    let install = new Install({
                        objects:       objects,
                        states:        states,
                        installNpm:    installNpm,
                        getRepository: getRepository,
                        processExit:   callback,
                        params:        params
                    });

                    if (!fs.existsSync(adapterDir)) {
                        install.downloadPacket(repoUrl, name, null, function () {
                            if (command !== 'install' && command !== 'i') {
                                install.createInstance(name, params, function () {
                                    callback();
                                });
                            } else {
                                const Upload = require(__dirname + '/setup/setupUpload.js');
                                let upload = new Upload({
                                    states:      states,
                                    objects:     objects,
                                    processExit: callback
                                });

                                // create objects
                                install.uploadStaticObjects(name, function () {
                                    upload.uploadAdapter(name, true, true, function () {
                                        upload.uploadAdapter(name, false, true, function () {
                                            callback();
                                        });
                                    });
                                });
                            }
                        });
                    } else {
                        if (command !== 'install' && command !== 'i') {
                            install.createInstance(name, params, function () {
                                callback();
                            });
                        } else {
                            console.log('adapter "' + name + '" yet installed. Use "upgrade" to install newer version.');
                            callback(51);
                        }
                    }
                });
            })();
            break;

        case 'upload':
        case 'u':
            (function () {
                Objects     = require(__dirname + '/objects');
                var name    = args[0];
                var subTree = args[1];
                if (name) {
                    dbConnect(params, function () {
                        var Upload = require(__dirname + '/setup/setupUpload.js');
                        var upload = new Upload({
                            states:      states,
                            objects:     objects,
                            processExit: callback
                        });

                        if (name === 'all') {
                            objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, function (err, objs) {
                                var adapters = [];
                                for (var i = 0; i < objs.rows.length; i++) {
                                    if (objs.rows[i].value.type !== 'adapter') continue;
                                    adapters.push(objs.rows[i].value.common.name);
                                }

                                upload.uploadAdapterFull(adapters, function () {
                                    callback();
                                });
                            });
                        } else {
                            // if upload of file
                            if (name.indexOf('.') !== -1) {
                                if (!subTree) {
                                    console.log('Please specify target name, like:\n ' + tools.appName + ' upload /file/picture.png /vis.0/main/img/picture.png');
                                    callback(1);
                                }

                                upload.uploadFile(name, subTree, function (err, newName) {
                                    if (!err) console.log('File "' + name + '" is successfully saved under ' + newName);
                                    callback(err ? 40 : undefined);
                                });
                            } else {
                                if (subTree) {
                                    upload.uploadAdapter(name, false, true, subTree, function () {
                                        callback();
                                    });
                                } else {
                                    upload.uploadAdapter(name, true, true, function () {
                                        upload.upgradeAdapterObjects(name, function () {
                                            upload.uploadAdapter(name, false, true, function () {
                                                callback();
                                            });
                                        });
                                    });
                                }
                            }
                        }
                    });
                } else {
                    console.log('No adapter name found!');
                    showHelp();
                    callback(1);
                }
            })();
            break;

        case 'delete':
        case 'del':
            (function () {
                var adpr     = args[0];
                var instance = args[1];

                // If user accidentally wrote tools.appName.adapter => remove adapter
                var regExp = new RegExp('^' + tools.appName + '\\.', 'i');
                if (adpr && regExp.test(adpr)) {
                    adpr = adpr.substring(tools.appName.length + 1);
                }
                if (!adpr) {
                    showHelp();
                    callback(2);
                }

                if (adpr && adpr.indexOf('.') !== -1) {
                    var parts = adpr.split('.');
                    adpr      = parts[0];
                    instance  = parts[1];
                }

                if (instance || instance === 0) {
                    dbConnect(params, function () {
                        var Install = require(__dirname + '/setup/setupInstall.js');
                        var install = new Install({
                            objects:       objects,
                            states:        states,
                            installNpm:    installNpm,
                            getRepository: getRepository,
                            processExit:   callback,
                            params:        params
                        });

                        console.log('Delete adapter "' + adpr + '.' + instance + '"');
                        install.deleteInstance(adpr, instance, function () {
                            callback();
                        });
                    });
                } else {
                    dbConnect(params, function () {
                        var Install = require(__dirname + '/setup/setupInstall.js');
                        var install = new Install({
                            objects:       objects,
                            states:        states,
                            installNpm:    installNpm,
                            getRepository: getRepository,
                            processExit:   callback,
                            params:        params
                        });
                        console.log('Delete adapter "' + adpr + '"');
                        install.deleteAdapter(adpr, function (a, resultCode) {
                            callback(resultCode);
                        });
                    });
                }
            })();
            break;

        case 'unsetup':
            (function () {
                const rl = require('readline').createInterface({
                    input:  process.stdin,
                    output: process.stdout
                });
                rl.question('UUID will be deleted. Are you sure? [y/N]: ', function (answer) {
                    rl.close();
                    answer = answer.toLowerCase();
                    if (answer === 'y' || answer === 'yes' || answer === 'ja' || answer === 'j') {
                        dbConnect(params, function () {
                            objects.delObject('system.meta.uuid', function (err) {
                                if (err) {
                                    console.log('uuid cannot be deleted: ' + err);
                                } else {
                                    console.log('system.meta.uuid deleted');
                                }
                                objects.getObject('system.config', function (err, obj) {
                                    if (obj.common.licenseConfirmed || obj.common.language || (obj.native && obj.native.secret)) {
                                        obj.common.licenseConfirmed = false;
                                        obj.common.language = '';
                                        if (obj.native) delete obj.native.secret;

                                        obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                        obj.ts = new Date().getTime();
                                        
                                        objects.setObject('system.config', obj, function (err) {
                                            if (err) {
                                                console.log('not found: ' + err);
                                                callback(3);
                                            } else {
                                                console.log('system.config reset');
                                                callback();
                                            }
                                        });
                                    } else {
                                        console.log('system.config is OK');
                                        callback();
                                    }
                                });
                            });
                        });
                    } else {
                        console.log('Nothing deleted');
                        callback();
                    }
                });
            }());
            break;

        case 'o':
        case 'object':
            (function () {
                var cmd = args[0];
                var id  = args[1];
                var pattern;

                if (cmd === 'chmod') {
                    var modeObject = args[1];
                    var modeState  = args[2];
                    pattern        = args[3];

                    if (!modeObject) {
                        console.log('No mode found. Example: "object chmod 644 system.*"');
                        callback(1);
                        return;
                    } else {
                        //yargs has converted it to number
                        modeObject = parseInt(modeObject.toString(), 16);

                        if (modeState) {
                            modeState = modeState.toString();
                            if (modeState[0] < '0' || modeState > '7') {
                                pattern = modeState;
                                modeState = undefined
                            } else {
                                modeState = parseInt(modeState.toString(), 16);
                            }
                        }
                    }
                    if (!pattern) {
                        console.log('No pattern found. Example: "object chmod 644 system.*"');
                        callback(1);
                        return;
                    }
                    dbConnect(params, function () {
                        objects.chmodObject(pattern, {user: 'system.user.admin', object: modeObject, state: modeState}, function (err, processed) {
                            if (err) {
                                console.error(err);
                            } else {
                                if (processed) {
                                    var List = require(__dirname + '/setup/setupList.js');
                                    var list = new List({
                                        states:      states,
                                        objects:     objects,
                                        processExit: callback
                                    });
                                    list.showObjectHeader();
                                    for (var i = 0; i < processed.length; i++) {
                                        list.showObject(processed[i]);
                                    }
                                }
                            }
                            setTimeout(function () {
                                callback();
                            }, 1000);
                        });
                    });
                } else
                if (cmd === 'chown') {
                    var user    = args[1];
                    var group   = args[2];
                    pattern     = args[3];

                    if (!pattern) {
                        pattern = group;
                        group = undefined;
                    }

                    if (!user) {
                        console.log('No user found. Example: "object chown user system.*"');
                        callback(1);
                    } else if (user.substring(12) !== 'system.user.') {
                        user = 'system.user.' + user;
                    }
                    if (group && group.substring(13) !== 'system.group.') {
                        group = 'system.group.' + group;
                    }

                    if (!pattern) {
                        console.log('No file path found. Example: "object chown user system.*"');
                        callback(1);
                        return;
                    }
                    dbConnect(params, function () {
                        objects.chownObject(pattern, {user: 'system.user.admin', owner: user, ownerGroup: group}, function (err, processed) {
                            if (err) {
                                console.error(err);
                            } else {
                                if (processed) {
                                    var List = require(__dirname + '/setup/setupList.js');
                                    var list = new List({
                                        states:      states,
                                        objects:     objects,
                                        processExit: callback
                                    });
                                    list.showObjectHeader();
                                    for (var i = 0; i < processed.length; i++) {
                                        list.showObject(processed[i]);
                                    }
                                }
                            }
                            setTimeout(function () {
                                callback();
                            }, 1000);
                        });
                    });
                } else
                if (cmd === 'list' || cmd === 'l') {
                    pattern = args[1];

                    if (pattern) {
                        pattern = {startkey: pattern.replace('*', ''), endkey: pattern.replace('*', '\u9999')};
                    }

                    dbConnect(params, function () {
                        objects.getObjectList(pattern, {user: 'system.user.admin', sorted: true}, function (err, processed) {
                            if (err) {
                                console.error(err);
                                callback(33);
                            }
                            if (processed) {
                                var List = require(__dirname + '/setup/setupList.js');
                                var list = new List({
                                    states:      states,
                                    objects:     objects,
                                    processExit: callback
                                });
                                list.showObjectHeader();
                                for (var id = 0; id < processed.rows.length; id++) {
                                    list.showObject(processed.rows[id].value);
                                }
                            }
                            setTimeout(function () {
                                callback();
                            }, 1000);
                        });
                    });
                } else
                if (id) {
                    Objects = require(__dirname + '/objects');

                    if (cmd === 'get') {
                        dbConnect(params, function () {
                            objects.getObject(id, function (err, res) {
                                if (err || !res) {
                                    console.log('not found');
                                    callback(3);
                                } else {
                                    if (params.pretty) {
                                        console.log(JSON.stringify(res, null, 2));
                                    } else {
                                        console.log(JSON.stringify(res));
                                    }
                                    callback();
                                }
                            });
                        });
                    } else
                    if (cmd === 'del' || cmd === 'delete') {
                        dbConnect(params, function () {
                            objects.delObject(id, function (err) {
                                if (err) {
                                    console.log('not found: ' + err);
                                    callback(3);
                                } else {
                                    console.log(id + ' deleted');
                                    callback();
                                }
                            });
                        });
                    } else {
                        console.log('Unknown command or empty: "' + cmd + '"');
                        callback(3);
                    }
                }
            })();
            break;

        case 's':
        case 'state':
            (function () {
                var cmd = args[0];
                var id  = args[1];
                if (id) {
                    dbConnect(params, function () {
                        if (cmd === 'get') {
                            states.getState(id, function (err, obj) {
                                if (err || !obj) {
                                    console.log('Error: ' + err);
                                } else {
                                    if (params.pretty) {
                                        console.log(JSON.stringify(obj, null, 2));
                                    } else {
                                        console.log(JSON.stringify(obj));
                                    }
                                }
                                callback();
                            });
                        }
                        else if (cmd === 'getplain') {
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
                            callback();
                        });
                    }
                        else if (cmd === 'set') {
                        var val = args[2];
                        var ack = args[3];
                        if (val === undefined) {
                            console.log('Invalid format: No value found.');
                            showHelp();
                            callback();
                        } else {
                            if (ack === undefined) {
                                console.log('Set "' + id + '" with value: ' + val);
                                states.setState(id, val, function () {
                                    callback();
                                });
                            } else {
                                console.log('Set "' + id + '" with value: ' + val + ' and ack flag ' + ack);
                                states.setState(id, {val: val, ack: ack}, function () {
                                    callback();
                                });
                            }
                        }
                    }
                        else if (cmd === 'del' || cmd === 'delete') {
                            states.delState(id, function (err) {
                                if (err) {
                                    console.log('not found: ' + err);
                                    callback(3);
                                } else {
                                    console.log(id + ' deleted');
                                    callback();
                                }
                            });
                        }
                        else if (cmd === 'chmod' || cmd === 'chwon') {
                            console.log('Please use object command for that: "' + tools.appName + ' object ' + cmd + ' ' + (args[1] || '') + ' ' + (args[1] || '') + ' ' + (args[2] || '') + '"');
                            callback(1);
                        }
                        else {
                            console.log('Invalid format: unknown state command');
                            showHelp();
                            callback(1);
                        }
                    });
                } else {
                    console.log('Invalid format: no id found');
                    showHelp();
                    callback(1);
                }
            })();
            break;

        case 'msg':
        case 'message':
            (function () {
                var adapter = args[0];
                var instances = [];
                if (adapter) {
                    if (adapter.indexOf('.') !== -1) {
                        instances.push('system.adapter.' + adapter);
                    }

                    dbConnect(params, function () {
                        objects.getObjectView('system', 'instance', {startkey: 'system.adapter.' + adapter, endkey: 'system.adapter.' + adapter + '.\u9999'}, null, function (err, res) {
                            if (res && res.rows.length) {
                                if (instances.length === 0) {
                                    for (var t = 0; t < res.rows.length; t++) {
                                        instances.push(res.rows[t].id);
                                    }
                                }
                                var cmd = args[1];
                                var msg = args[2];
                                if (!msg) {
                                    msg = cmd;
                                    cmd = 'send';
                                }
                                if (msg && (typeof msg === 'string') && (msg[0] === '{') && (msg[msg.length - 1] === '}')) {
                                    msg = JSON.parse(msg);
                                }

                                if (!msg && msg !== 0) {
                                    console.log('Invalid format: No message found.');
                                    showHelp();
                                    callback();
                                } else {
                                    var exitCount = instances.length;
                                    for (var i = 0; i < instances.length; i++) {
                                        console.log('Send command "' + cmd + '" to ' + instances[i] + ' with "' + msg + '"');
                                        states.pushMessage(instances[i], {command: cmd, message: msg, from: 'setup'}, function() {
                                            exitCount--;
                                            if (exitCount === 0) callback();
                                        });
                                    }
                                }
                            } else {
                                console.log('No one instance of adapter "' + adapter + '" found');
                                callback(4);
                            }
                        });
                    });
                } else {
                    console.log('Invalid format: no adapter found');
                    showHelp();
                    callback(1);
                }
            })();
            break;

        case 'upgrade':
            (function () {
                Objects = require(__dirname + '/objects');


                var adapter = args[0];
                var repoUrl = args[1];
                var regExp = new RegExp('^' + tools.appName + '\\.', 'i');

                // If user accidentally wrote tools.appName.adapter => remove adapter
                if (adapter && regExp.test(adapter)) {
                    adapter = adapter.substring(tools.appName.length + 1);
                }

                if (adapter && !repoUrl && adapter.indexOf('/') !== -1) {
                    repoUrl = adapter;
                    adapter = null;
                }

                dbConnect(params, function () {
                    var Upgrade = require(__dirname + '/setup/setupUpgrade.js');
                    var upgrade = new Upgrade({
                        objects:           objects,
                        states:            states,
                        installNpm:        installNpm,
                        getRepository:     getRepository,
                        params:            params,
                        processExit:       callback,
                        restartController: restartController
                    });

                    if (adapter) {
                        if (adapter === 'self') {
                            upgrade.upgradeController(repoUrl, params.force, function () {
                                callback();
                            });
                        } else {
                            upgrade.upgradeAdapter(repoUrl, adapter, params.force, function () {
                                callback();
                            });
                        }
                    } else {
                        getRepository(repoUrl, function (err, links) {
                            var result = [];
                            for (var name in links) {
                                if (links.hasOwnProperty(name)) {
                                    result.push(name);
                                }
                            }
                            if (err) console.log(err);
                            if (links) {
                                result.sort();
                                upgrade.upgradeAdapterHelper(links, result, 0, false, function () {
                                    upgrade.upgradeController(links, params.force, function () {
                                        callback();
                                    });
                                });
                            } else {
                                // No information
                                callback(26);
                            }
                        });
                    }
                });
            })();
            break;

        case 'clean':
            (function () {
                var yes = args[0];
                if (yes !== 'yes') {
                    console.log('Command "clean" clears all Objects and States. To execute it write "' + tools.appName + ' clean yes"');
                } else {
                    dbConnect(params, function (obj, stat, isNotRun) {
                        if (!isNotRun) {
                            console.error('Stop ' + tools.appName + ' first!');
                            callback(1);
                            return;
                        }
                        cleanDatabase(true, function (count) {
                            console.log('Deleted ' + count + ' states');
                            restartController(function () {
                                console.log('Restarting ' + tools.appName + '...');
                                callback();
                            });
                        });
                    });
                }
            })();
            break;

        case 'restore':
            (function () {
                var Backup = require(__dirname + '/setup/setupBackup.js');

                dbConnect(params, function (obj, stat, isNotRun) {

                    if (!isNotRun) {
                        console.error('Stop ' + tools.appName + ' first!');
                        callback(1);
                        return;
                    }

                    var backup = new Backup({
                        states:            states,
                        objects:           objects,
                        cleanDatabase:     cleanDatabase,
                        restartController: restartController,
                        processExit:       callback
                    });

                    backup.restoreBackup(args[0], function () {
                        console.log("System successfully restored!");
                        callback(0);
                    });
                });
            })();
            break;

        case 'backup':
            (function () {
                var name = args[0];
                var Backup = require(__dirname + '/setup/setupBackup.js');

                dbConnect(params, function () {
                    var backup = new Backup({
                        states:            states,
                        objects:           objects,
                        cleanDatabase:     cleanDatabase,
                        restartController: restartController,
                        processExit:       callback
                    });

                    backup.createBackup(name, function (filePath) {
                        console.log('Backup created: ' + filePath);
                        callback(0);
                    });
                });
            })();
            break;

        case 'l':
        case 'list':
            (function () {
                dbConnect(params, function () {
                    var List = require(__dirname + '/setup/setupList.js');
                    var list = new List({
                        states:      states,
                        objects:     objects,
                        processExit: callback
                    });
                    list.list(args[0], args[1], params);
                });
            })();
            break;

        case 'touch':
            (function () {
                var pattern = args[0];

                if (!pattern) {
                    console.log('No file path found. Example: "touch /vis.0/main/*"');
                    callback(1);
                    return;
                }
                dbConnect(params, function () {
                    // extract id
                    pattern = pattern.replace(/\\/g, '/');
                    if (pattern[0] === '/') pattern = pattern.substring(1);

                    if (pattern === '*') {
                        objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, function (err, arr) {
                            if (!err && arr && arr.rows) {
                                var files = [];
                                var count = 0;
                                for (var i = 0; i < arr.rows.length; i++) {
                                    if (arr.rows[i].value.type !== 'adapter') continue;
                                    count++;
                                    objects.touch(arr.rows[i].value.common.name, '*', {user: 'system.user.admin'}, function (err, processed, _id) {
                                        if (!err && processed) {
                                            files.push({id: _id, processed: processed});
                                        }
                                        if (!--count) {
                                            var List = require(__dirname + '/setup/setupList.js');
                                            var list = new List({
                                                states:      states,
                                                objects:     objects,
                                                processExit: callback
                                            });
                                            files.sort(function (a, b) {
                                                return a.id.localeCompare(b.id);
                                            });

                                            for (var k = 0; k < files.length; k++) {
                                                for (var t = 0; t < files[k].processed.length; t++) {
                                                    list.showFile(files[k].id, files[k].processed[t].path, files[k].processed[t]);
                                                }
                                            }
                                            setTimeout(function () {
                                                callback();
                                            }, 1000);
                                        }
                                    });
                                }
                                if (!count) {
                                    console.log('Nothing found');
                                    callback();
                                }
                            }
                        });
                    } else {
                        var parts = pattern.split('/');
                        var id    = parts.shift();
                        var path  = parts.join('/');

                        objects.touch(id, path, {user: 'system.user.admin'}, function (err, processed) {
                            if (err) {
                                console.error(err);
                            } else {
                                if (processed) {
                                    var List = require(__dirname + '/setup/setupList.js');
                                    var list = new List({
                                        states:      states,
                                        objects:     objects,
                                        processExit: callback
                                    });
                                    for (var i = 0; i < processed.length; i++) {
                                        list.showFile(id, processed[i].path, processed[i]);
                                    }
                                }
                            }
                            setTimeout(function () {
                                callback();
                            }, 1000);
                        });

                    }
                });
            })();
            break;

        case 'rm':
            (function () {
                var pattern = args[0];

                if (!pattern) {
                    console.log('No file path found. Example: "touch /vis.0/main/*"');
                    callback(1);
                    return;
                }
                dbConnect(params, function () {
                    // extract id
                    pattern = pattern.replace(/\\/g, '/');
                    if (pattern[0] === '/') pattern = pattern.substring(1);

                    if (pattern === '*') {
                        objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, function (err, arr) {
                            if (!err && arr && arr.rows) {
                                var files = [];
                                var count = 0;
                                for (var i = 0; i < arr.rows.length; i++) {
                                    if (arr.rows[i].value.type !== 'adapter') continue;
                                    count++;
                                    objects.rm(arr.rows[i].value.common.name, '*', {user: 'system.user.admin'}, function (err, processed, _id) {
                                        if (!err && processed) {
                                            files.push({id: _id, processed: processed});
                                        }
                                        if (!--count) {
                                            var List = require(__dirname + '/setup/setupList.js');
                                            var list = new List({
                                                states:      states,
                                                objects:     objects,
                                                processExit: callback
                                            });
                                            files.sort(function (a, b) {
                                                return a.id.localeCompare(b.id);
                                            });

                                            list.showFileHeader();
                                            for (var k = 0; k < files.length; k++) {
                                                for (var t = 0; t < files[k].processed.length; t++) {
                                                    list.showFile(files[k].id, files[k].processed[t].path, files[k].processed[t]);
                                                }
                                            }
                                            setTimeout(function () {
                                                callback();
                                            }, 1000);
                                        }
                                    });
                                }
                                if (!count) {
                                    console.log('Nothing found');
                                    callback();
                                }
                            }
                        });
                    } else {
                        var parts = pattern.split('/');
                        var id    = parts.shift();
                        var path  = parts.join('/');

                        objects.rm(id, path, {user: 'system.user.admin'}, function (err, processed) {
                            if (err) {
                                console.error(err);
                            } else {
                                if (processed) {
                                    var List = require(__dirname + '/setup/setupList.js');
                                    var list = new List({
                                        states:      states,
                                        objects:     objects,
                                        processExit: callback
                                    });
                                    list.showFileHeader();
                                    for (var i = 0; i < processed.length; i++) {
                                        list.showFile(id, processed[i].path, processed[i]);
                                    }
                                }
                            }
                            setTimeout(function () {
                                callback();
                            }, 1000);
                        });

                    }
                });
            })();
            break;

        case 'chmod':
            (function () {
                var mode    = args[0];
                var pattern = args[1];

                if (!mode) {
                    console.log('No mode found. Example: "chmod 777 /vis.0/main/*"');
                    callback(1);
                    return;
                } else {
                    //yargs has converted it to number
                    mode = parseInt(mode.toString(), 16);
                }

                if (!pattern) {
                    console.log('No file path found. Example: "chmod 777 /vis.0/main/*"');
                    callback(1);
                    return;
                }
                dbConnect(params, function () {
                    // extract id
                    pattern = pattern.replace(/\\/g, '/');
                    if (pattern[0] === '/') pattern = pattern.substring(1);

                    if (pattern === '*') {
                        objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, function (err, arr) {
                            if (!err && arr && arr.rows) {
                                var files = [];
                                var count = 0;
                                for (var i = 0; i < arr.rows.length; i++) {
                                    if (arr.rows[i].value.type !== 'adapter') continue;
                                    count++;
                                    objects.chmodFile(arr.rows[i].value.common.name, '*', {user: 'system.user.admin', mode: mode}, function (err, processed, _id) {
                                        if (!err && processed) {
                                            files.push({id: _id, processed: processed});
                                        }
                                        if (!--count) {
                                            var List = require(__dirname + '/setup/setupList.js');
                                            var list = new List({
                                                states:      states,
                                                objects:     objects,
                                                processExit: callback
                                            });
                                            files.sort(function (a, b) {
                                                return a.id.localeCompare(b.id);
                                            });

                                            list.showFileHeader();
                                            for (var k = 0; k < files.length; k++) {
                                                for (var t = 0; t < files[k].processed.length; t++) {
                                                    list.showFile(files[k].id, files[k].processed[t].path, files[k].processed[t]);
                                                }
                                            }
                                            setTimeout(function () {
                                                callback();
                                            }, 1000);
                                        }
                                    });
                                }
                                if (!count) {
                                    console.log('Nothing found');
                                    callback();
                                }
                            }
                        });
                    } else {
                        var parts = pattern.split('/');
                        var id    = parts.shift();
                        var path  = parts.join('/');

                        objects.chmodFile(id, path, {user: 'system.user.admin', mode: mode}, function (err, processed) {
                            if (err) {
                                console.error(err);
                            } else {
                                if (processed) {
                                    var List = require(__dirname + '/setup/setupList.js');
                                    var list = new List({
                                        states:      states,
                                        objects:     objects,
                                        processExit: callback
                                    });
                                    list.showFileHeader();
                                    for (var i = 0; i < processed.length; i++) {
                                        list.showFile(id, processed[i].path, processed[i]);
                                    }
                                }
                            }
                            setTimeout(function () {
                                callback();
                            }, 1000);
                        });

                    }
                });
            })();
            break;

        case 'chown':
            (function () {
                var user    = args[0];
                var group   = args[1];
                var pattern = args[2];

                if (!pattern) {
                    pattern = group;
                    group = undefined;
                }

                if (!user) {
                    console.log('No user found. Example: "chown user /vis.0/main/*"');
                    callback(1);
                } else if (user.substring(12) !== 'system.user.') {
                    user = 'system.user.' + user;
                }
                if (group && group.substring(13) !== 'system.group.') {
                    group = 'system.group.' + group;
                }

                if (!pattern) {
                    console.log('No file path found. Example: "chown user /vis.0/main/*"');
                    callback(1);
                    return;
                }
                dbConnect(params, function () {
                    // extract id
                    pattern = pattern.replace(/\\/g, '/');
                    if (pattern[0] === '/') pattern = pattern.substring(1);

                    if (pattern === '*') {
                        objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, function (err, arr) {
                            if (!err && arr && arr.rows) {
                                var files = [];
                                var count = 0;
                                for (var i = 0; i < arr.rows.length; i++) {
                                    if (arr.rows[i].value.type !== 'adapter') continue;
                                    count++;
                                    objects.chownFile(arr.rows[i].value.common.name, '*', {user: 'system.user.admin', owner: user, ownerGroup: group}, function (err, processed, _id) {
                                        if (!err && processed) {
                                            files.push({id: _id, processed: processed});
                                        }
                                        if (!--count) {
                                            var List = require(__dirname + '/setup/setupList.js');
                                            var list = new List({
                                                states:      states,
                                                objects:     objects,
                                                processExit: callback
                                            });
                                            files.sort(function (a, b) {
                                                return a.id.localeCompare(b.id);
                                            });

                                            list.showFileHeader();
                                            for (var k = 0; k < files.length; k++) {
                                                for (var t = 0; t < files[k].processed.length; t++) {
                                                    list.showFile(files[k].id, files[k].processed[t].path, files[k].processed[t]);
                                                }
                                            }
                                            setTimeout(function () {
                                                callback();
                                            }, 1000);
                                        }
                                    });
                                }
                                if (!count) {
                                    console.log('Nothing found');
                                    callback();
                                }
                            }
                        });
                    } else {

                        var parts = pattern.split('/');
                        var id = parts.shift();
                        var path = parts.join('/');

                        objects.chownFile(id, path, {user: 'system.user.admin', owner: user, ownerGroup: group}, function (err, processed) {
                            if (err) {
                                console.error(err);
                            } else {
                                // call here list
                                if (processed) {
                                    var List = require(__dirname + '/setup/setupList.js');
                                    var list = new List({
                                        states: states,
                                        objects: objects,
                                        processExit: callback
                                    });
                                    list.showFileHeader();
                                    for (var i = 0; i < processed.length; i++) {
                                        list.showFile(id, processed[i].path, processed[i]);
                                    }
                                }
                            }
                            setTimeout(function () {
                                callback();
                            }, 1000);
                        });
                    }
                });
            })();
            break;

        case 'user':
            (function () {
                var command = args[0] || '';
                var user    = args[1] || '';

                if (user && user.match(/^system\.user\./)) user = user.substring('system.user.'.length);

                dbConnect(params, function () {
                    var Users = require(__dirname + '/setup/setupUsers.js');
                    var users = new Users({
                        objects:     objects,
                        processExit: callback
                    });
                    var password = params.password;
                    var group    = params.ingroup || 'system.group.administrator';

                    if (command === 'add') {
                        users.addUserPrompt(user, group, password, function (err) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('User "' + user + '" created (Group: ' + group.replace('system.group.', '') + ')');
                                callback();
                            }
                        });
                    }
                    else if (command === 'del'     || command === 'delete') {
                        users.delUser(user, function (err) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('User "' + user + '" deleted');
                                callback();
                            }
                        });
                    }
                    else if (command === 'check') {
                        users.checkUserPassword(user, password, function (err) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('Password for user "' + user + '" matched.');
                                callback();
                            }
                        });
                    }
                    else if (command === 'set'     || command === 'passwd') {
                        users.setUserPassword(user, password, function (err) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('Password for "' + user + '" was successfully set.');
                                callback();
                            }
                        });
                    }
                    else if (command === 'enable'  || command === 'e') {
                        users.enableUser(user, true, function (err) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('User "' + user + '" was successfully enabled.');
                                callback();
                            }
                        });
                    }
                    else if (command === 'disable' || command === 'd') {
                        users.enableUser(user, false, function (err) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('User "' + user + '" was successfully disabled.');
                                callback();
                            }
                        });
                    }
                    else if (command === 'get') {
                        users.getUser(user, function (err, isEnabled) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('User "' + user + '" is ' + (isEnabled ? 'enabled' : 'disabled'));
                                callback();
                            }
                        });
                    }
                    else {
                        console.warn('Unknown command "' + command + '". Available commands are: add, del, passwd, enable, disable, check, get');
                        callback(1);
                    }
                });
            })();
            break;

        case 'g':
        case 'group':
            (function () {
                var command = args[0] || '';
                var group   = args[1] || '';
                var user    = args[2] || '';

                if (group && group.match(/^system\.group\./)) group = group.substring('system.group.'.length);
                if (user  && user.match(/^system\.user\./))   user  = user.substring('system.user.'.length);
                if (!command) {
                    console.warn('Unknown command "' + command + '". Available commands are: add, del, passwd, enable, disable, list, get');
                    return callback(1);
                }
                if (!group) {
                    console.warn('Please define group name: group ' + command + ' groupName');
                    return callback(30);
                }
                dbConnect(params, function () {
                    var Users = require(__dirname + '/setup/setupUsers.js');
                    var users = new Users({
                        objects:     objects,
                        processExit: callback
                    });

                    if (command === 'useradd' || command === 'adduser') {
                        if (!user) {
                            console.warn('Please define user name: group useradd groupName userName');
                            callback(30);
                        }
                        users.addUserToGroup(user, group, function (err) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('User "' + user + '" created');
                                callback();
                            }
                        });
                    }
                    else if (command === 'userdel' || command === 'deluser') {
                        if (!user) {
                            console.warn('Please define user name: group userdel groupName userName');
                            callback(30);
                        }
                        users.removeUserFromGroup(user, group, function (err) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('User "' + user + '" created');
                                callback();
                            }
                        });
                    }
                    else if (command === 'add') {
                        users.addGroup(group, function (err) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('User "' + group + '" created');
                                callback();
                            }
                        });
                    }
                    else if (command === 'del' || command === 'delete') {
                        users.delGroup(group, function (err) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('User "' + group + '" deleted');
                                callback();
                            }
                        });
                    }
                    else if (command === 'list' || command === 'l') {
                        users.getGroup(group, function (err, isEnabled, list) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('Group "' + group + '" is ' + (isEnabled ? 'enabled' : 'disabled') + ' and has following members:');
                                if (list) {
                                    for (var i = 0; i < list.length; i++) {
                                        console.log(list[i].substring('system.user.'.length));
                                    }
                                }
                                callback();
                            }
                        });
                    }
                    else if (command === 'enable' || command === 'e') {
                        users.enableGroup(group, true, function (err) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('Group "' + group + '" was successfully enabled.');
                                callback();
                            }
                        });
                    }
                    else if (command === 'disable' || command === 'd') {
                        users.enableGroup(group, false, function (err) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('Group "' + group + '" was successfully disabled.');
                                callback();
                            }
                        });
                    }
                    else if (command === 'get') {
                        users.getGroup(group, function (err, isEnabled, list) {
                            if (err) {
                                console.error(err);
                                callback(30);
                            } else {
                                console.log('Group "' + group + '" is ' + (isEnabled ? 'enabled' : 'disabled'));
                                callback();
                            }
                        });
                    }
                    else {
                        console.warn('Unknown command "' + command + '". Available commands are: add, del, passwd, enable, disable, list, get');
                        callback(1);
                    }
                });
            })();
            break;

        case 'adduser':
            (function () {
                var user = args[0];
                var group = params.ingroup || 'system.group.administrator';
                var password = params.password;

                dbConnect(params, function () {
                    var Users = require(__dirname + '/setup/setupUsers.js');
                    var users = new Users({
                        objects: objects,
                        processExit: callback
                    });
                    users.addUserPrompt(user, group, password, function (err) {
                        if (err) {
                            console.error(err);
                            callback(30);
                        } else {
                            console.log('User "' + user + '" created (Group: ' + group.replace('system.group.', '') + ')');
                            callback();
                        }
                    });
                });
            })();
            break;

        case 'passwd':
            (function () {
                var user     = args[0];
                var password = params.password;
                dbConnect(params, function () {
                    var Users = require(__dirname + '/setup/setupUsers.js');
                    var users = new Users({
                        objects:     objects,
                        processExit: callback
                    });
                    users.setUserPassword(user, password, function (err) {
                        if (err) {
                            console.error(err);
                            callback(30);
                        } else {
                            console.log('Password for "' + user + '" was successfully set.');
                            callback();
                        }
                    });
                });
            })();
            break;

        case 'ud':
        case 'udel':
        case 'userdel':
        case 'deluser':
            (function () {
                var user = args[0];

                dbConnect(params, function () {
                    var Users = require(__dirname + '/setup/setupUsers.js');
                    var users = new Users({
                        objects: objects,
                        processExit: callback
                    });
                    users.delUser(user, function (err) {
                        if (err) {
                            console.error(err);
                            callback(30);
                        } else {
                            console.log('User "' + user + '" deleted');
                            callback();
                        }
                    });
                });
            })();
            break;

        // Create package.json in /opt/' + tools.appName + '
        case 'package':
            (function () {
                var json = {
                    name: tools.appName,
                    engines: {
                        node: '>=0.8'
                    },
                    optionalDependencies: {
                    },
                    dependencies: {},
                    author: 'bluefox <dogafox@gmail.com>'
                };
                json.dependencies[tools.appName + '.js-controller'] = '*';
                json.dependencies[tools.appName + '.admin']         = '*';

                tools.getRepositoryFile(null, function (err, sources) {
                    if (sources) {
                        for (var s in sources) {
                            if (sources.hasOwnProperty(s)) {
                                if (sources[s].url) {
                                    if (!json.dependencies[tools.appName + '.' + s]) {
                                        json.optionalDependencies[tools.appName + '.' + s] = sources[s].url;
                                    }
                                } else {
                                    if (!json.dependencies[tools.appName + '.' + s]) {
                                        json.optionalDependencies[tools.appName + '.' + s] = '*';
                                    }
                                }
                            }
                        }
                    }

                    fs.writeFileSync(__dirname + '/../../../package.json', JSON.stringify(json, null, 2));
                    callback();
                });
            })();
            break;

        case 'set':
            (function () {
                var instance = args[0];
                if (!instance) {
                    console.warn('please specify instance.');
                    callback(1);
                }
                if (instance.indexOf('.') === -1) {
                    console.warn('please specify instance, like "' + instance + '.0"');
                    callback(1);
                }
                dbConnect(params, function () {
                    objects.getObject('system.adapter.' + instance, function (err, obj) {
                        if (!err && obj) {
                            var changed = false;
                            for (var a = 0; a < process.argv.length; a++) {
                                if (process.argv[a].match(/^--/) && process.argv[a + 1] && !process.argv[a + 1].match(/^--/)) {
                                    var attr = process.argv[a].substring(2);
                                    var val = process.argv[a + 1];
                                    if (val === 'true')  val = true;
                                    if (val === 'false') val = false;
                                    if (parseFloat(val).toString() === val) val = parseFloat(val);
                                    if (attr.indexOf('.') !== -1) {
                                        var parts = attr.split('.');
                                        if (!obj.native[parts[0]] || obj.native[parts[0]][parts[1]] === undefined) {
                                            console.warn('Adapter "' + instance + '" has no setting "'  + attr + '".');
                                        } else {
                                            changed = true;
                                            obj.native[parts[0]][parts[1]] = val;
                                            console.log('New ' + attr + ' for "' + instance + '" is: ' + val);
                                        }
                                    } else {
                                        if (obj.native[attr] === undefined) {
                                            console.warn('Adapter "' + instance + '" has no setting "'  + attr + '".');
                                        } else {
                                            changed = true;
                                            obj.native[attr] = val;
                                            console.log('New ' + attr + ' for "' + instance + '" is: ' + val);
                                        }
                                    }
                                    a++;
                                }
                            }
                            if (changed) {
                                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                obj.ts = new Date().getTime();
                                objects.setObject('system.adapter.' + instance, obj, function () {
                                    console.log('Instance settings for "' + instance + '" are changed.');
                                    callback();
                                });
                            } else {
                                console.log('No parameters set.');
                                callback();
                            }
                        } else {
                            console.error('Instance "' + instance + '" does not exist.');
                            callback(24);
                        }
                    });
                });
            })();
            break;

        case 'host':
            (function () {
                var change = args[0];

                var oldHostname;
                var newHostname;
                if (!change) {
                    console.warn('Please write "' + tools.appName + ' host this" to use this host ("' + tools.getHostName() + '") in ' + tools.appName + ' for all instances.');
                    callback(1);
                }

                var config  = tools.getConfigFileName();
                var data    = JSON.parse(fs.readFileSync(config, 'utf8'));

                if (change === 'set') {
                    oldHostname = tools.getHostName();
                    newHostname = args[1];
                    if (!newHostname) {
                        console.error('To change host name call: ' + tools.appName + ' host set newName');
                        callback(34);
                    }

                    data.system = data.system || {};
                    data.system.hostname = newHostname;
                    fs.writeFileSync(config, JSON.stringify(data));
                } else if (change === 'remove') {
                    oldHostname = args[1];
                    newHostname = tools.getHostName();
                    if (!oldHostname) {
                        console.error('Host to remove is not defined. Usage: ' + tools.appName + ' host remove <NAME>');
                        callback(34);
                    }
                } else {
                    oldHostname = (change !== 'self' && change !== 'this') ? change : null;
                    newHostname = require('os').hostname();
                }

                dbConnect(params, function (_objects, _states, isOffline) {
                    if (!isOffline) {
                        console.error('Cannot execute changes on running system. Stop ' + tools.appName + ' first.');
                        callback(30);
                    }

                    var count = 0;
                    // find first host
                    objects.getObjectList({startkey: 'system.host.', endkey: 'system.host.\u9999'}, function (err, objs) {
                        if (!oldHostname) {
                            var hostCount = 0;
                            for (var j = 0; j < objs.rows.length; j++) {
                                if (objs.rows[j].value.type === 'host') {
                                    var hNameM = objs.rows[j].value._id.match(/^system\.host\.([^.]+)(\..*)?$/);
                                    if (hNameM) {
                                        oldHostname = hNameM[1];
                                        hostCount++;
                                    }
                                }
                            }
                            if (hostCount > 1) {
                                console.warn('More than one host found. You must specifiy which hist must be renamed.');
                                callback(30);
                            }

                        }
                        if (change !== 'set' && change !== 'remove' && oldHostname && data.system && data.system.hostname === oldHostname) {
                            data.system = data.system || {};
                            data.system.hostname = newHostname;
                            fs.writeFileSync(config, JSON.stringify(data));
                        }
                        hostCount = 0;
                        for (var i = 0; i < objs.rows.length; i++) {

                            if (objs.rows[i].value.type !== 'host' && objs.rows[i].value.type !== 'state') continue;

                            var hNameM = objs.rows[i].value._id.match(/^system\.host\.([^.]+)(\..*)?$/);
                            var hName = null;
                            if (hNameM) {
                                hName = hNameM[1];
                            } else {
                                continue;
                            }

                            var obj = objs.rows[i].value;

                            if (obj.type === 'host') {
                                if (hName === newHostname && change !== 'remove') {
                                    hostCount++;
                                    if (hostCount > 1) {
                                        console.error('Host with actual hostname "' + hName + '" found. Cannot rename it.');
                                        continue;
                                    }
                                }
                            }

                            if (hName === oldHostname) {
                                if (obj.type === 'host') {
                                    count++;
                                    objects.delObject(obj._id, function (err) {
                                        if (err) console.error('Cannot delete object: ' + err);
                                        if (!--count) callback();
                                    });
                                    if (change !== 'remove') {
                                        console.log('Rename host "' + obj._id + '" to system.host.' + newHostname);
                                        obj._id = 'system.host.' + newHostname;
                                        obj.common.name = obj._id;
                                        obj.common.hostname = newHostname;
                                        obj.common.address = [];
                                        obj.common.cmd = '';
                                        obj.common.native = {process: {}, os: {}, hardware: {}};
                                        count++;
                                        obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                        obj.ts = new Date().getTime();
                                        objects.setObject(obj._id, obj, function (err) {
                                            if (err) console.error('Cannot set object: ' + err);
                                            if (!--count) callback();
                                        });
                                    } else {
                                        console.log('Remove host "' + obj._id + '"');

                                    }
                                } else {
                                    // state
                                    count++;
                                    objects.delObject(obj._id, function (err) {
                                        if (err) console.error('Cannot delete object: ' + err);
                                        if (!--count) callback();
                                    });
                                    if (change !== 'remove') {
                                        console.log('Rename state "' + obj._id + '".');
                                        obj._id = 'system.host.' + newHostname + (hNameM[2] || '');
                                        count++;
                                        obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                        obj.ts = new Date().getTime();
                                        objects.setObject(obj._id, obj, function (err) {
                                            if (err) console.error('Cannot set object: ' + err);
                                            if (!--count) callback();
                                        });
                                    } else {
                                        console.log('Remove state "' + obj._id + '".');
                                    }
                                }
                            }
                        }

                        objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, function (err, objs) {
                            for (var i = 0; i < objs.rows.length; i++) {
                                if (objs.rows[i].value.type !== 'instance') continue;
                                if (objs.rows[i].value.common.host === oldHostname) {
                                    count++;
                                    console.log('Instance host changed for "' + objs.rows[i].value._id + '" from "' + objs.rows[i].value.common.host + '" to "' + newHostname + '".');
                                    objs.rows[i].value.common.host = newHostname;
                                    objs.rows[i].value.from = 'system.host.' + tools.getHostName() + '.cli';
                                    objs.rows[i].value.ts = new Date().getTime();
                                    objects.setObject(objs.rows[i].value._id, objs.rows[i].value, function (err) {
                                        if (err) console.error('Cannot set object: ' + err);
                                        if (!--count) callback();
                                    });
                                }
                            }
                            if (!count) {
                                console.warn('No instances found for host "' + change + '".');
                                callback();
                            }
                        });
                    });
                });

            })();
            break;

        case 'visdebug':
            (function () {
                var widgetset = args[0];
                if (widgetset && widgetset.match('/^vis-/')) {
                    widgetset = widgetset.substring(4);
                }

                var VisDebug = require(__dirname + '/setup/setupVisDebug.js');

                dbConnect(params, function (_objects) {
                    var visDebug = new VisDebug({
                        objects:     _objects,
                        processExit: callback
                    });

                    visDebug.enableDebug(widgetset);
                });
            })();
            break;

        case 'file':
        case 'f':
            (function () {
                var cmd = args[0];
                if (cmd !== 'read' && cmd !== 'r' && cmd !== 'w' && cmd !== 'write') {
                    console.log('Invalid parameters: write "file read /vis.0/main/img/picture.png /opt/picture/image.png" to read the file');
                    callback(1);
                }
                if (!args[1]) {
                    console.log('Invalid parameters: write "file read /vis.0/main/img/picture.png /opt/picture/image.png" to read the file');
                    callback(1);
                }

                dbConnect(params, function (_objects) {
                    if (cmd === 'read' || cmd ==='r') {
                        var toRead = args[1];
                        var parts = toRead.replace(/\\/g, '/').split('/');

                        var path = (args[2] || process.cwd()).replace(/\\/g, '/').split('/');
                        var file = path[path.length - 1];
                        if (!file.match(/\.[a-zA-Z0-9]+$/)) {
                            path.push(parts[parts.length - 1]);
                        }
                        var adapt = parts.shift();
                        if (!adapt) adapt = parts.shift();
                        _objects.readFile(adapt, parts.join('/'), function (err, data) {
                            if (err) console.error(err);
                            if (data) {
                                fs.writeFileSync(path.join('/'), data);
                                console.log('File "' + toRead + '" stored as "' + path.join('/') + '"');
                            }
                            callback(0);
                        });
                    } else {
                        var toRead = args[1];
                        var parts = toRead.replace(/\\/g, '/').split('/');

                        var path = args[2].replace(/\\/g, '/').split('/');

                        var file = path[parts.length - 1];
                        if (!file) {
                            path.splice(path.length - 1, 1);
                            file = path[path.length - 1];
                        }
                        if (!file.match(/\.[a-zA-Z0-9]+$/)) {
                            path.push(parts[parts.length - 1]);
                        }
                        var adapt = path.shift();
                        if (!adapt) adapt = path.shift();
                        var data = fs.readFileSync(toRead);
                        _objects.writeFile(adapt, path.join('/'), data, function (err) {
                            console.log('File "' + toRead + '" stored as "' + path.join('/') + '"');
                            callback(0);
                        });
                    }
                });
            })();
            break;

        case 'id':
        case 'uuid':
            (function () {
                dbConnect(params, function (objects) {
                    objects.getObject('system.meta.uuid', function (err, obj) {
                        if (err) {
                            console.error('Error: ' + err);
                            callback(101);
                        }
                        if (obj && obj.native) {
                            console.log(obj.native.uuid);
                            callback();
                        } else {
                            console.error('Error: no UUID found');
                            callback(101);
                        }
                    });
                });
            })();
            break;

        case 'v':
        case 'version':
            (function () {
                var adapter = args[0];
                if (adapter) {
                    try {
                        iopckg = require(tools.appName + '.' + adapter + '/package.json');
                    } catch (err) {
                        iopckg = {version: '"' + adapter + '" not found'};
                    }
                } else {
                    iopckg = require(__dirname + '/../package.json');
                }
                console.log(iopckg.version);

                callback();
            })();
            break;

        case 'checklog':
            (function () {
                dbConnect(params, function (objects, states, isOffline) {
                    if (isOffline) {
                        console.log(tools.appName + ' is not running');
                        callback(100);
                    } else {
                        console.log(tools.appName + ' is running');
                        objects.getObjectList({startkey: 'system.host.', endkey: 'system.host.' + '\u9999'}, null, function (err, res) {
                            if (!err && res.rows.length) {
                                for (var i = 0; i < res.rows.length; i++) {
                                    var parts = res.rows[i].id.split('.');
                                    // ignore system.host.name.alive and so on
                                    if (parts.length === 3) {
                                        states.pushMessage(res.rows[i].id, {command: 'checkLogging', message: null, from: 'console'});
                                    }
                                }
                            }
                            setTimeout(function () {
                                callback();
                            }, 200);
                        });
                    }
                });
            })();
            break;

        case 'repo':
            (function () {
                Objects =       require(__dirname + '/objects');
                var repoUrlOrCommand = args[0]; // Repo url or name or "add" / "del" / "set" / "show" / "addset"
                var repoName         = args[1]; // Repo url or name
                var repoUrl          = args[2]; // Repo url or name
                if (repoUrlOrCommand !== 'add' && repoUrlOrCommand !== 'del' && repoUrlOrCommand !== 'set' && repoUrlOrCommand !== 'show' && repoUrlOrCommand !== 'addset') {
                    repoUrl = repoUrlOrCommand;
                    repoUrlOrCommand = 'show';
                }

                dbConnect(params, function () {
                    var Repo = require(__dirname + '/setup/setupRepo.js');
                    var repo = new Repo({
                        objects:     objects
                    });

                    if (repoUrlOrCommand === 'show') {
                        repo.showRepoStatus(callback);
                    } else if (repoUrlOrCommand === 'add' || repoUrlOrCommand === 'del' || repoUrlOrCommand === 'set' || repoUrlOrCommand === 'addset') {
                        if (!repoName || !repoName.match(/[-_\w\d]+/)) {
                            console.error('Invalid repository name: "' + repoName + '"');
                            callback();
                        } else {
                            if (repoUrlOrCommand === 'add' || repoUrlOrCommand === 'addset') {
                                if (!repoUrl) {
                                    console.warn('Please define repository URL or path: ' + tools.appName + ' add <repoName> <repoUrlOrPath>');
                                    callback(45);
                                } else {
                                    repo.add(repoName, repoUrl, function (err) {
                                        if (err) {
                                            console.error(err);
                                            callback(45);
                                        } else {
                                            if (repoUrlOrCommand === 'addset') {
                                                repo.setActive(repoName, function (err) {
                                                    if (err) {
                                                        console.error(err);
                                                        callback(45);
                                                    } else {
                                                        console.log('Repository "' + repoName + '" set as active: "' + repoUrl + '"');
                                                        repo.showRepoStatus(callback);
                                                    }
                                                });
                                            } else {
                                                console.log('Repository "' + repoName + '" added as "' + repoUrl + '"');
                                                repo.showRepoStatus(callback);
                                            }
                                        }
                                    });

                                }
                            } else if (repoUrlOrCommand === 'set') {
                                repo.setActive(repoName, function (err) {
                                    if (err) {
                                        console.error(err);
                                        callback(45);
                                    } else {
                                        console.log('Repository "' + repoName + '" set as active.');
                                        repo.showRepoStatus(callback);
                                    }
                                });
                            } else if (repoUrlOrCommand === 'del') {
                                repo.del(repoName, function (err) {
                                    if (err) {
                                        console.error(err);
                                        callback(45);
                                    } else {
                                        console.log('Repository "' + repoName + '" deleted.');
                                        repo.showRepoStatus(callback);
                                    }
                                });
                            } else {
                                console.warn('Unknown repo command: ' + repoUrlOrCommand);
                                callback(105);
                            }
                        }
                    }
                });
            })();
            break;

        case 'multihost':
        case 'mh':
            (() => {
                var cmd = args[0];
                if (cmd !== 'c' && cmd !== 'connect' && cmd !== 's' && cmd !== 'status' && cmd !== 'b' && cmd !== 'browse' && cmd !== 'e' && cmd !== 'enable' && cmd !== 'd' && cmd !== 'disable') {
                    console.log('Invalid parameters. Following is possible: enable, browse, connect, status');
                    callback(1);
                } else {
                    dbConnect(params, function () {
                        var Multihost = require(__dirname + '/setup/setupMultihost.js');
                        var mh = new Multihost({
                            params:      params,
                            processExit: callback,
                            objects:     objects
                        });

                        if (cmd === 's' || cmd === 'status') {
                            mh.status(function () {
                                callback(30);
                            });
                        } else
                        if (cmd === 'b' || cmd === 'browse') {
                            mh.browse(function (err, list) {
                                if (err) {
                                    console.error(err);
                                    callback(30);
                                } else {
                                    mh.showHosts(list);
                                    callback();
                                }
                            });
                        } else if (cmd === 'e' || cmd === 'enable') {
                            mh.enable(true, function (err) {
                                if (err) {
                                    console.error(err);
                                    callback(1);
                                } else {
                                    states.pushMessage('system.host.' + tools.getHostName(), {command: 'updateMultihost', message: null, from: 'setup'}, function() {
                                        callback();
                                    });
                                }
                            });
                        } else if (cmd === 'd' || cmd === 'disable') {
                            mh.enable(false, function (err) {
                                if (err) {
                                    console.error(err);
                                    callback(1);
                                } else {
                                    states.pushMessage('system.host.' + tools.getHostName(), {command: 'updateMultihost', message: null, from: 'setup'}, function() {
                                        callback();
                                    });
                                }
                            });
                        } else if (cmd === 'c' || cmd === 'connect') {
                            mh.connect(args[1], args[2], function (err) {
                                if (err) {
                                    console.error(err)
                                }
                                callback(err ? 1 : 0);
                            });
                        }
                    });
                }
            })();
            break;

        case 'vendor':
            (() => {
                const password = args[0];
                const file     = args[1];
                if (!password) {
                    console.warn(`Please specify the password to update the vendor information!\n${tools.appName.toLowerCase()} vendor <PASS_PHRASE> <vendor.json>`);
                    callback(1);
                } if (!file) {
                    console.warn(`Please specify the path to the vendor file to update the vendor information!\n${tools.appName.toLowerCase()} vendor <PASS_PHRASE> <vendor.json>`);
                    callback(1);
                } else {
                    dbConnect(params, function () {
                        const Vendor = require('./setup/setupVendor');
                        const vendor = new Vendor({
                            objects:     objects
                        });
                        vendor.checkVendor(file, password).then(() => {
                            console.log(`Synchronised vendor information.`);
                            callback();
                        }).catch(err => {
                            console.error(`Cannot update vendor information: ${JSON.stringify(err)}`);
                            callback(1);
                        });
                    });
                }
            })();
            break;

        case 'license':
            (() => {
                const file = args[0];
                if (!file) {
                    console.warn(`Please specify the path to the license file or place license text directly!\n${tools.appName.toLowerCase()} license <license.file or license.text>`);
                    callback(1);
                } else {
                    dbConnect(params, function () {
                        const License = require('./setup/setupLicense');
                        const license = new License({
                            objects:     objects
                        });
                        license.setLicense(file).then(type => {
                            console.log(`License ${type} updated.`);
                            callback();
                        }).catch(err => {
                            console.error(`Cannot update license: ${JSON.stringify(err)}`);
                            callback(1);
                        });
                    });
                }
            })();
            break;

        default:
            if (params.v || params.version) {
                var iopckg;
                if (command) {
                    try {
                        iopckg = require(tools.appName + '.' + command + '/package.json');
                    } catch (err) {
                        iopckg = {version: '"' + command + '" not found'};
                    }
                } else {
                    iopckg = require(__dirname + '/../package.json');
                }
                console.log(iopckg.version);
            } else {
                showHelp();
                callback(1);
            }
            callback();
            break;
    }
}

// Save objects before exit
function processExit(exitCode) {
    if (objects && objects.destroy) objects.destroy();
    if (states  && states.destroy)  states.destroy();
    process.exit(exitCode);
}

function cleanDatabase(isDeleteDb, callback) {
    var taskCnt = 0;

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
                taskCnt = 0;
                for (i = 0; i < obj.length; i++) {
                    taskCnt++;
                    states.delState(delState[i], function () {
                        if (!(--taskCnt) && callback) callback(obj.length);
                    });
                }
            });
        });
    } else {
        // Clean only objects, not the views
        objects.getObjectList({startkey: '\u0000', endkey: '\u9999'}, function (err, res) {
            if (!err && res.rows.length) {
                console.log('clean ' + res.rows.length + ' objects...');
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
                taskCnt = 0;
                console.log('clean ' + obj.length + ' states...');
                for (i = 0; i < obj.length; i++) {
                    taskCnt++;
                    states.delState(delState[i], function () {
                        if (!(--taskCnt) && callback) callback(obj.length);
                    });
                }
                if (!taskCnt && callback) callback(obj.length);
            });

        });
    }
}

function restartController(callback) {
    var spawn = require('child_process').spawn;

    console.log('Starting node restart.js');

    var child = spawn('node', [__dirname + '/restart.js'], {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore']
    });

    child.unref();

    if (callback) {
        callback();
    } else {
        processExit();
    }
}

function installNpm(adapter, callback) {
    var path = __dirname;
    if (typeof adapter === 'function') {
        callback = adapter;
        adapter = undefined;
    }

    if (adapter) {
        path = tools.getAdapterDir(adapter);
    }

    // iob_npm.done file was created if "npm i" yet called there
    if (fs.existsSync(path + '/package.json') && !fs.existsSync(path + '/iob_npm.done')) {
        tools.disablePackageLock(function (err) {
            var cmd = 'npm install --production';
            console.log(cmd + ' (System call) in "' + path + '"');
            // Install node modules as system call
    
            // System call used for update of js-controller itself,
            // because during installation npm packet will be deleted too, but some files must be loaded even during the install process.
            var exec = require('child_process').exec;
            var child = exec(cmd, {
                cwd: path
            });
            child.stderr.pipe(process.stdout);
            child.on('exit', function (code, signal) {
                if (code) {
                    console.log('Cannot install ' + tools.appName + '.' + adapter + ': ' + code);
                    (callback || processExit)(25);
                }
                // command succeeded
                if (callback) callback(null, adapter);
            });
        });
    } else {
        if (callback) callback(null, adapter);
    }
}

function getRepository(repoUrl, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = {};
    }
    params = params || {};

    if (!repoUrl || typeof repoUrl !== 'object') {
        if (!objects) {
            dbConnect(params, function () {
                getRepository(repoUrl, params, callback);
            });
        } else {
            // try to read repository
            objects.getObject('system.config', function (err, systemConfig) {
                objects.getObject('system.repositories', function (err, repos) {
                    // Check if repositories exists
                    if (!err && repos && repos.native && repos.native.repositories) {
                        var active = systemConfig.common.activeRepo;

                        if (repos.native.repositories[active]) {
                            if (typeof repos.native.repositories[active] === 'string') {
                                repos.native.repositories[active] = {
                                    link: repos.native.repositories[active],
                                    json: null
                                };
                            }

                            // If repo is not yet loaded
                            if (!repos.native.repositories[active].json) {
                                console.log('Update repository "' + active + '" under "' + repos.native.repositories[active].link + '"');
                                // Load it
                                tools.getRepositoryFile(repos.native.repositories[active].link, function (err, sources) {
                                    repos.native.repositories[active].json = sources;
                                    repos.from = 'system.host.' + tools.getHostName() + '.cli';
                                    repos.ts = new Date().getTime();
                                    // Store uploaded repo
                                    objects.setObject('system.repositories', repos, function () {
                                        callback(null, sources);
                                    });
                                });
                            } else {
                                // We have already repo, give it back
                                callback(null, repos.native.repositories[active].json);
                            }
                        } else {
                            console.log('Requested repository "' + active + '" does not exit in config.');
                            callback(25);
                        }
                    } else {
                        console.log('No repositories defined.');
                        callback(25);
                    }
                });
            });
        }
    } else {
        callback(null, repoUrl);
    }
}

function dbConnect(onlyCheck, params, callback) {
    if (typeof onlyCheck === 'object') {
        callback  = params;
        params    = onlyCheck;
        onlyCheck = false;
    }
    if (typeof onlyCheck === 'function') {
        callback  = onlyCheck;
        onlyCheck = false;
    }
    if (typeof params === 'function') {
        callback  = params;
        params    = null;
    }
    params = params || {};
    if (objects && states) {
        callback(objects, states);
        return;
    }

    var config = require(tools.getConfigFileName());
    if (!config.states)  config.states  = {type: 'file'};
    if (!config.objects) config.objects = {type: 'file'};

    Objects =    require(__dirname + '/objects');
    States =     require(__dirname + '/states');

    // Give to controller 2 seconds for connection
    var isObjectConnected = false;
    var isStatesConnected = false;

    // Detect timeout or try to open file itself
    setTimeout(function () {
        if (isObjectConnected && isStatesConnected) return;

        if (onlyCheck) {
            if (typeof callback === 'function') callback(null, null, true);
            return;
        }


        if (!isObjectConnected) {
            if (config.objects.type === 'file') {
                // Just open in memory DB itself
                Objects = require(__dirname + '/objects/objectsInMemServer');
                objects = new Objects({
                    connection: config.objects,
                    logger: {
                        silly: function (msg) {
                        },
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
                        if (isStatesConnected && typeof callback === 'function') callback(objects, states, true);
                    }
                });
            } else {
                console.log('No connection to ' + config.objects.host + ':' + config.objects.port + '[' + config.objects.type + ']');
                processExit(22);
            }
        }

        if (!isStatesConnected) {
            if (config.states.type === 'file') {
                // Just open in memory DB itself
                States = require(__dirname + '/states/statesInMemServer');
                states = new States({
                    connection: config.states,
                    logger: {
                        silly: function (msg) {
                        },
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
                        if (isObjectConnected && typeof callback === 'function') callback(objects, states, true);
                    }
                });
            } else {
                console.log('No connection to states ' + config.states.host + ':' + config.states.port + '[' + config.states.type + ']');
                processExit(22);
            }
        }
    }, params.timeout || config.objects.connectTimeout || 2000);

    // try to connect as client
    objects = new Objects({
        connection: config.objects,
        logger: {
            silly: function (msg) { },
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

            if (isStatesConnected && typeof callback === 'function') callback(objects, states);
        }
    });

    states = new States({
        connection: config.states,
        logger: {
            silly: function (msg) { },
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

            if (isObjectConnected && typeof callback === 'function') callback(objects, states);
        }
    });
}

module.exports.processCommand = function (_objects, _states, command, args, params, callback) {
    objects = _objects;
    states  = _states;
    processCommand(command, args, params, callback);
};

module.exports.execute = function () {
    // direct call
    var _yargs = initYargs();
    var command = _yargs.argv._[0];
    
    var args = [];
    for (var a = 1; a < _yargs.argv._.length; a++) {
        args.push(_yargs.argv._[a]);
    }

    processCommand(command, args, _yargs.argv, processExit);
};
