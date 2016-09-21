/**
 *
 *  js-controller Controller start/stop and install script
 *
 *  7'2014-2015 bluefox <bluefox@ccu.io>
 *              hobbyquaker <hq@ccu.io>
 *
 *
 */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
'use strict';


// TODO need info about progress of stopping

var fs    = require('fs');
var tools = require(__dirname + '/tools');

require('events').EventEmitter.prototype._maxListeners = 100;
process.setMaxListeners(0);

var yargs = require('yargs')
    .usage('Commands:\n' +
        tools.appName + ' setup [--objects <host>] [--states <host>] [custom]\n' +
        tools.appName + ' start\n' +
        tools.appName + ' stop\n' +
        tools.appName + ' start <adapter>\n' +
        tools.appName + ' stop <adapter>\n' +
        tools.appName + ' start all\n' +
        tools.appName + ' restart\n' +
        tools.appName + ' restart <adapter>\n' +
        tools.appName + ' add <adapter> [--enabled] [--host <host>] [--port <port>]\n' +
        tools.appName + ' install <adapter>\n' +
        tools.appName + ' del <adapter>\n' +
        tools.appName + ' del <adapter>.<instance>\n' +
        tools.appName + ' update [repository url] [--updatable]\n' +
        tools.appName + ' upgrade [repository url]\n' +
        tools.appName + ' upgrade self [repository url]\n' +
        tools.appName + ' upgrade <adapter> [repository url]\n' +
        tools.appName + ' upload <pathToLocalFile> <pathInIoBroker>\n' +
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
        tools.appName + ' list <type> [filter]\n' +
        tools.appName + ' chmod <mode> <file>\n' +
        tools.appName + ' chown <user> <group> <file>\n' +
        tools.appName + ' touch <file>\n' +
        tools.appName + ' rm <file>\n' +
        tools.appName + ' adduser <user> [--ingroup group] [--password pass]\n' +
        tools.appName + ' deluser <user>\n' +
        tools.appName + ' passwd <user> [--password pass]\n' +
        tools.appName + ' set <adapter>.<instance> [--port port] [--ip address] [--ssl true|false]\n' +
        tools.appName + ' clean\n' +
        tools.appName + ' backup\n' +
        tools.appName + ' restore <backup name or path>\n' +
        tools.appName + ' <command> --timeout 5000\n' +
        tools.appName + ' isrun\n' +
        tools.appName + ' unsetup\n' +
        tools.appName + ' version [adapter]\n' +
        tools.appName + ' [adapter] -v\n')
    .default('objects',   '127.0.0.1')
    .default('states',   '127.0.0.1')
    .default('lang',    'en')
;

var Objects; // constructor
var objects; // instance
var States;  // constructor
var states;  // instance

switch (yargs.argv._[0]) {

    case 'start':
    case 'stop':
        (function () {
            // Start stop of adapter
            if (yargs.argv._[1]) {
                Objects =       require(__dirname + '/objects');
                var adapter = yargs.argv._[1];
                // If user accidentally wrote tools.appName.adapter => remove adapter
                var regExp = new RegExp('^' + tools.appName + '\\.', 'i');
                if (adapter && regExp.test(adapter)) {
                    adapter = adapter.substring(tools.appName.length + 1);
                }

                dbConnect(function () {
                    if (adapter === 'all') {
                        objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, function (err, objs) {
                            var count = 0;
                            for (var i = 0; i < objs.rows.length; i++) {
                                if (objs.rows[i].value.type !== 'instance') continue;
                                var obj = objs.rows[i].value;
                                if (yargs.argv._[0] === 'start') {
                                    if (!obj.common.enabled) {
                                        obj.common.enabled = true;
                                        count++;
                                        objects.setObject(obj._id, obj, function () {
                                            console.log('Adapter "' + adapter + ' started.');
                                            if (!--count) processExit();
                                        });
                                    }
                                } else {
                                    if (obj.common.enabled) {
                                        obj.common.enabled = false;
                                        count++;
                                        objects.setObject(obj._id, obj, function () {
                                            console.log('Adapter "' + adapter + ' stopped.');
                                            if (!--count) processExit();
                                        });
                                    }
                                }
                            }
                            if (!count) processExit();
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
                                            processExit(1);
                                        }
                                        obj = objs.rows[i].value;
                                    }
                                }
                                if (!obj) {
                                    console.log('Cannot find any instances of "' + adapter + '"');
                                    processExit(1);
                                } else {
                                    if (yargs.argv._[0] === 'start') {
                                        if (!obj.common.enabled) {
                                            obj.common.enabled = true;
                                            objects.setObject(obj._id, obj, function () {
                                                console.log('Adapter "' + obj._id.replace('system.adapter.', '') + ' started.');
                                                processExit();
                                            });
                                        } else {
                                            processExit();
                                        }
                                    } else {
                                        if (obj.common.enabled) {
                                            obj.common.enabled = false;
                                            objects.setObject(obj._id, obj, function () {
                                                console.log('Adapter "' + obj._id.replace('system.adapter.', '') + ' stopped.');
                                                processExit();
                                            });
                                        } else {
                                            processExit();
                                        }
                                    }
                                }
                            });
                        } else {
                            objects.getObject('system.adapter.' + adapter, function (err, obj) {
                                if (!err && obj) {
                                    if (yargs.argv._[0] === 'start') {
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
                    if (yargs.argv._[0] === 'stop' && !require('os').platform().match(/^win/)) {
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
                            processExit();
                        });
                    }
                });
                daemon[yargs.argv._[0]]();
            }
        })();
        break;

    case 'isrun':
        (function () {
            dbConnect(function (objects, states, isOffline) {
                if (isOffline) {
                    console.log('ioBroker is not running');
                    processExit(100);
                } else {
                    console.log('ioBroker is running');
                    processExit();
                }
            });
        })();
        break;

    case 'restart':
        (function () {
            if (yargs.argv._[1]) {
                Objects =       require(__dirname + '/objects');
                var adapter = yargs.argv._[1];
                // If user accidentally wrote tools.appName.adapter => remove adapter
                var regExp = new RegExp('^' + tools.appName + '\\.', 'i');
                if (adapter && regExp.test(adapter)) {
                    adapter = adapter.substring(tools.appName.length + 1);
                }

                dbConnect(function () {

                    if (adapter.indexOf('.') === -1) {
                        objects.getObjectList({startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, function (err, objs) {
                            var obj;
                            if (!err && objs) {
                                for (var i = 0; i < objs.rows.length; i++) {
                                    if (objs.rows[i].value.type !== 'instance') continue;
                                    if (obj) {
                                        console.log('Please enter instance of adapter, e.g. "' + obj._id.replace('system.adapter.', '') + '"');
                                        processExit(1);
                                    }
                                    obj = objs.rows[i].value;
                                }
                            }
                            if (!obj) {
                                console.log('Cannot find any instances of "' + adapter + '"');
                                processExit(1);
                            } else {
                                obj.common.enabled = true;
                                objects.setObject(obj._id, obj, function (err) {
                                    console.log('Adapter "' + obj._id.replace('system.adapter.', '') + ' restarted.');
                                    processExit();
                                });
                            }
                        });
                    } else {
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
            processExit();
        });
        break;

    case 'update':
        (function () {
            Objects =       require(__dirname + '/objects');
            var repoUrl =   yargs.argv._[1]; // Repo url or name
            dbConnect(function () {
                var Repo = require(__dirname + '/setup/setupRepo.js');
                var repo = new Repo({
                    objects:     objects,
                    processExit: processExit
                });

                repo.showRepo(repoUrl, yargs.argv, function () {
                    setTimeout(function () {
                        processExit();
                    }, 2000);
                });
            });
        })();
        break;

    case 'setup':
        (function () {
            if (yargs.argv._[1] === 'custom') {
                var readline = require('readline');

                var config;
                // read actual configuration
                try {
                    if (fs.existsSync(tools.getConfigFileName())) {
                        config = JSON.parse(fs.readFileSync(tools.getConfigFileName()));
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
                            processExit(23);
                        }
                    }
                    rl.question('Host of objects DB(' + otype + '), default[127.0.0.1]: ', function (ohost) {
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
                                if (!oport) {
                                    console.log('Invalid objects port: ' + oport);
                                    processExit(23);
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
                                        processExit(23);
                                    }
                                }

                                rl.question('Host of states DB (' + stype + '), default[' + ohost + ']: ', function (shost) {
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
                                            if (!sport) {
                                                console.log('Invalid states port: ' + sport);
                                                processExit(23);
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
                                                            processExit(23);
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
                                                        processExit(23);
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
                    processExit: processExit,
                    yargs:       yargs
                });

                setup.setup(function (isFirst) {
                    if (isFirst) {
                        var Install = require(__dirname + '/setup/setupInstall.js');
                        var install = new Install({
                            objects:       objects,
                            states:        states,
                            installNpm:    installNpm,
                            getRepository: getRepository,
                            processExit:   processExit,
                            yargs:         yargs
                        });

                        //install admin adapter
                        install.createInstance('admin', {enabled: true}, function () {
                            processExit();
                        });
                    } else {
                        processExit();
                    }
                }, yargs.argv._[1] === 'first');
            }
        })();
        break;

    case 'url':
        (function () {
            Objects =       require(__dirname + '/objects');

            var url  =      yargs.argv._[1];
            var name =      yargs.argv._[2];

            if (url[0] === '"' && url[url.length - 1] === '"') {
                url = url.substring(1, url.length - 1);
            }
            // try to fix URL
            if (url.match(/^https:\/\/github\.com\//)) {
                if (!url.match(/\.zip$/) && !url.match(/\.gz$/) && !url.match(/\/tarball\/[^\/]+$/)) {
                    url += '/tarball/master';
                }
            }
            console.log('install ' + url);

            dbConnect(function () {
                var Install = require(__dirname + '/setup/setupInstall.js');
                var install = new Install({
                    objects:       objects,
                    states:        states,
                    installNpm:    installNpm,
                    getRepository: getRepository,
                    processExit:   processExit,
                    yargs:         yargs
                });

                install.npmInstall(url, true, false, function (_url, installDir) {
                    var Upload = require(__dirname + '/setup/setupUpload.js');
                    var upload = new Upload({
                        states:      states,
                        objects:     objects,
                        processExit: processExit
                    });
                    if (name) {
                        upload.uploadAdapter(name, true, true, function () {
                            upload.uploadAdapter(name, false, true, function () {
                                processExit();
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
                                    processExit();
                                });
                            });
                        } else {
                            processExit();
                        }
                    }
                });
            });
        })();
        break;

    case 'add':
    case 'install':
        (function () {
            Objects =       require(__dirname + '/objects');

            var name =      yargs.argv._[1];
            var repoUrl =   yargs.argv._[2];
            // If user accidentally wrote tools.appName.adapter => remove adapter
            var regExp = new RegExp('^' + tools.appName + '\\.', 'i');
            if (name && regExp.test(name)) {
                name = name.substring(tools.appName.length + 1);
            }

            var adapterDir = tools.getAdapterDir(name);

            dbConnect(function () {
                var Install = require(__dirname + '/setup/setupInstall.js');
                var install = new Install({
                    objects:       objects,
                    states:        states,
                    installNpm:    installNpm,
                    getRepository: getRepository,
                    processExit:   processExit,
                    yargs:         yargs
                });

                if (!fs.existsSync(adapterDir)) {
                    install.downloadPacket(repoUrl, name, {useSystemNpm: false}, function () {
                        if (yargs.argv._[0] !== 'install') {
                            install.createInstance(name, yargs.argv, function () {
                                processExit();
                            });
                        } else {
                            var Upload = require(__dirname + '/setup/setupUpload.js');
                            var upload = new Upload({
                                states:      states,
                                objects:     objects,
                                processExit: processExit
                            });

                            upload.uploadAdapter(name, true, true, function () {
                                upload.uploadAdapter(name, false, true, function () {
                                    processExit();
                                });
                            });
                        }
                    });
                } else {
                    if (yargs.argv._[0] !== 'install') {
                        install.createInstance(name, yargs.argv, function () {
                            processExit();
                        });
                    } else {
                        console.log('adapter "' + name + '" yet installed. Use "upgrade" to install newer version.');
                    }
                }
            });
        })();
        break;

    case 'upload':
    case 'u':
        (function () {
            Objects     = require(__dirname + '/objects');
            var name    = yargs.argv._[1];
            var subTree = yargs.argv._[2];
            if (name) {
                dbConnect(function () {
                    var Upload = require(__dirname + '/setup/setupUpload.js');
                    var upload = new Upload({
                        states:      states,
                        objects:     objects,
                        processExit: processExit
                    });

                    if (name === 'all') {
                        objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, function (err, objs) {
                            var adapters = [];
                            for (var i = 0; i < objs.rows.length; i++) {
                                if (objs.rows[i].value.type !== 'adapter') continue;
                                adapters.push(objs.rows[i].value.common.name);
                            }

                            upload.uploadAdapterFull(adapters, function () {
                                processExit();
                            });
                        });
                    } else {
                        // if upload of file
                        if (name.indexOf('.') !== -1) {
                            if (!subTree) {
                                console.log('Please specify target name, like:\n iorboker upload /file/picture.png /vis.0/main/img/picture.png');
                                processExit(1);
                            }

                            upload.uploadFile(name, subTree, function (err, newName) {
                                if (!err) console.log('File "' + name + '" is succsefully saved under ' + newName);
                                processExit(err ? 40 : undefined);
                            });
                        } else {
                            if (subTree) {
                                upload.uploadAdapter(name, false, true, subTree, function () {
                                    processExit();
                                });
                            } else {
                                upload.uploadAdapter(name, true, true, function () {
                                    upload.upgradeAdapterObjects(name, function () {
                                        upload.uploadAdapter(name, false, true, function () {
                                            processExit();
                                        });
                                    });
                                });
                            }
                        }
                    }
                });
            } else {
                console.log('No adapter name found!');
                yargs.showHelp();
                processExit(1);
            }
        })();
        break;

    case 'delete':
    case 'del':
        (function () {
            var adpr     = yargs.argv._[1];
            var instance = yargs.argv._[2];

            // If user accidentally wrote tools.appName.adapter => remove adapter
            var regExp = new RegExp('^' + tools.appName + '\\.', 'i');
            if (adpr && regExp.test(adpr)) {
                adpr = adpr.substring(tools.appName.length + 1);
            }
            if (!adpr) {
                yargs.showHelp();
                processExit(2);
            }

            if (adpr && adpr.indexOf('.') !== -1) {
                var parts = adpr.split('.');
                adpr      = parts[0];
                instance  = parts[1];
            }

            if (instance !== null && instance !== undefined && instance !== "") {
                dbConnect(function () {
                    var Install = require(__dirname + '/setup/setupInstall.js');
                    var install = new Install({
                        objects:       objects,
                        states:        states,
                        installNpm:    installNpm,
                        getRepository: getRepository,
                        processExit:   processExit,
                        yargs:         yargs
                    });

                    install.deleteInstance(adpr, instance, function () {
                        processExit();
                    });
                });
            } else {
                dbConnect(function () {
                    var Install = require(__dirname + '/setup/setupInstall.js');
                    var install = new Install({
                        objects:       objects,
                        states:        states,
                        installNpm:    installNpm,
                        getRepository: getRepository,
                        processExit:   processExit,
                        yargs:         yargs
                    });

                    install.deleteAdapter(adpr, function (a, resultCode) {
                        processExit(resultCode);
                    });
                });
            }
        })();
        break;
    case 'unsetup':
        (function () {
            var rl = require('readline').createInterface({
                input:  process.stdin,
                output: process.stdout
            });
            rl.question('UUID will be deleted. Are you sure? [y/N]: ', function (answer) {
                rl.close();
                answer = answer.toLowerCase();
                if (answer === 'y' || answer === 'yes' || answer === 'ja' || answer === 'j') {
                    dbConnect(function () {
                        objects.delObject('system.meta.uuid', function (err) {
                            if (err) {
                                console.log('not found: ' + err);
                                processExit(3);
                            } else {
                                console.log('system.meta.uuid deleted');
                                processExit();
                            }
                        });
                    });
                } else {
                    console.log('Nothing deleted');
                    processExit();
                }
            });
        }());
        break;

    case 'o':
    case 'object':
        (function () {
            var cmd = yargs.argv._[1];
            var id  = yargs.argv._[2];
            var pattern;

            if (cmd === 'chmod') {
                var modeObject = yargs.argv._[2];
                var modeState  = yargs.argv._[3];
                pattern        = yargs.argv._[4];

                if (!modeObject) {
                    console.log('No mode found. Example: "object chmod 644 system.*"');
                    processExit(1);
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
                    processExit(1);
                    return;
                }
                dbConnect(function () {
                    objects.chmodObject(pattern, {user: 'system.user.admin', object: modeObject, state: modeState}, function (err, processed) {
                        if (err) {
                            console.error(err);
                        } else {
                            if (processed) {
                                var List = require(__dirname + '/setup/setupList.js');
                                var list = new List({
                                    states:      states,
                                    objects:     objects,
                                    processExit: processExit
                                });
                                list.showObjectHeader();
                                for (var i = 0; i < processed.length; i++) {
                                    list.showObject(processed[i]);
                                }
                            }
                        }
                        setTimeout(function () {
                            processExit();
                        }, 1000);
                    });
                });
            } else
            if (cmd === 'chown') {
                var user    = yargs.argv._[2];
                var group   = yargs.argv._[3];
                pattern     = yargs.argv._[4];

                if (!pattern) {
                    pattern = group;
                    group = undefined;
                }

                if (!user) {
                    console.log('No user found. Example: "object chown user system.*"');
                    processExit(1);
                } else if (user.substring(12) !== 'system.user.') {
                    user = 'system.user.' + user;
                }
                if (group && group.substring(13) !== 'system.group.') {
                    group = 'system.group.' + group;
                }

                if (!pattern) {
                    console.log('No file path found. Example: "object chown user system.*"');
                    processExit(1);
                    return;
                }
                dbConnect(function () {
                    objects.chownObject(pattern, {user: 'system.user.admin', owner: user, ownerGroup: group}, function (err, processed) {
                        if (err) {
                            console.error(err);
                        } else {
                            if (processed) {
                                var List = require(__dirname + '/setup/setupList.js');
                                var list = new List({
                                    states:      states,
                                    objects:     objects,
                                    processExit: processExit
                                });
                                list.showObjectHeader();
                                for (var i = 0; i < processed.length; i++) {
                                    list.showObject(processed[i]);
                                }
                            }
                        }
                        setTimeout(function () {
                            processExit();
                        }, 1000);
                    });
                });
            } else
            if (cmd === 'list' || cmd === 'l') {
                pattern = yargs.argv._[2];

                if (pattern) {
                    pattern = {startkey: pattern.replace('*', ''), endkey: pattern.replace('*', '\u9999')};
                }

                dbConnect(function () {
                    objects.getObjectList(pattern, {user: 'system.user.admin', sorted: true}, function (err, processed) {
                        if (err) {
                            console.error(err);
                            processExit(33);
                        }
                        if (processed) {
                            var List = require(__dirname + '/setup/setupList.js');
                            var list = new List({
                                states:      states,
                                objects:     objects,
                                processExit: processExit
                            });
                            list.showObjectHeader();
                            for (var id = 0; id < processed.rows.length; id++) {
                                list.showObject(processed.rows[id].value);
                            }
                        }
                        setTimeout(function () {
                            processExit();
                        }, 1000);
                    });
                });
            } else
            if (id) {
                Objects = require(__dirname + '/objects');

                if (cmd === 'get') {
                    dbConnect(function () {
                        objects.getObject(id, function (err, res) {
                            if (err || !res) {
                                console.log('not found');
                                processExit(3);
                            } else {
                                if (yargs.argv.pretty) {
                                    console.log(JSON.stringify(res, null, 2));
                                } else {
                                    console.log(JSON.stringify(res));
                                }
                                processExit();
                            }
                        });
                    });
                } else
                if (cmd === 'del' || cmd === 'delete') {
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
        })();
        break;

    case 's':
    case 'state':
        (function () {
            var cmd = yargs.argv._[1];
            var id  = yargs.argv._[2];
            if (id) {
                dbConnect(function () {
                    if (cmd === 'get') {
                        states.getState(id, function (err, obj) {
                            if (err || !obj) {
                                console.log('Error: ' + err);
                            } else {
                                if (yargs.argv.pretty) {
                                    console.log(JSON.stringify(obj, null, 2));
                                } else {
                                    console.log(JSON.stringify(obj));
                                }
                            }
                            processExit();
                        });
                    } else if (cmd === 'getplain') {
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
                    } else if (cmd === 'set') {
                        var val = yargs.argv._[3];
                        var ack = yargs.argv._[4];
                        if (val === undefined) {
                            console.log('Invalid format: No value found.');
                            yargs.showHelp();
                            processExit();
                        } else {
                            if (ack === undefined) {
                                console.log('Set "' + id + '" with value: ' + val);
                                states.setState(id, val, function () {
                                    processExit();
                                });
                            } else {
                                console.log('Set "' + id + '" with value: ' + val + ' and ack flag ' + ack);
                                states.setState(id, {val: val, ack: ack}, function () {
                                    processExit();
                                });
                            }
                        }
                    } else if (cmd === 'del' || cmd === 'delete') {
                        states.delState(id, function (err) {
                            if (err) {
                                console.log('not found: ' + err);
                                processExit(3);
                            } else {
                                console.log(id + ' deleted');
                                processExit();
                            }
                        });
                    } else {
                        console.log('Invalid format: unknown state command');
                        yargs.showHelp();
                    }
                });
            } else {
                console.log('Invalid format: no id found');
                yargs.showHelp();
            }
        })();
        break;

    case 'message':
        (function () {
            var adapter = yargs.argv._[1];
            var instances = [];
            if (adapter) {
                if (adapter.indexOf('.') !== -1) instances.push('system.adapter.' + adapter);

                dbConnect(function () {
                    objects.getObjectView('system', 'instance', {startkey: 'system.adapter.' + adapter, endkey: 'system.adapter.' + adapter + '.\u9999'}, null, function (err, res) {
                        if (res && res.rows.length) {
                            if (instances.length === 0) {
                                for (var t = 0; t < res.rows.length; t++) {
                                    instances.push(res.rows[t].id);
                                }
                            }
                            var cmd = yargs.argv._[2];
                            var msg = yargs.argv._[3];
                            if (!msg) {
                                msg = cmd;
                                cmd = 'send';
                            }
                            if (!msg && msg !== 0) {
                                console.log('Invalid format: No message found.');
                                yargs.showHelp();
                                processExit();
                            } else {
                                for (var i = 0; i < instances.length; i++) {
                                    console.log('Send command "' + cmd + '" to ' + instances[i] + ' with "' + msg + '"');
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
        })();
        break;

    case 'upgrade':
        (function () {
            Objects = require(__dirname + '/objects');


            var adapter = yargs.argv._[1];
            var repoUrl = yargs.argv._[2];
            var regExp = new RegExp('^' + tools.appName + '\\.', 'i');

            // If user accidentally wrote tools.appName.adapter => remove adapter
            if (adapter && regExp.test(adapter)) {
                adapter = adapter.substring(tools.appName.length + 1);
            }

            if (adapter && !repoUrl && adapter.indexOf('/') !== -1) {
                repoUrl = adapter;
                adapter = null;
            }

            dbConnect(function () {
                var Upgrade = require(__dirname + '/setup/setupUpgrade.js');
                var upgrade = new Upgrade({
                    objects:           objects,
                    states:            states,
                    installNpm:        installNpm,
                    getRepository:     getRepository,
                    processExit:       processExit,
                    restartController: restartController
                });

                if (adapter) {
                    if (adapter === 'self') {
                        upgrade.upgradeController(repoUrl, yargs.argv.force, function () {
                            processExit();
                        });
                    } else {
                        upgrade.upgradeAdapter(repoUrl, adapter, yargs.argv.force, function () {
                            processExit();
                        });
                    }
                } else {
                    tools.getRepositoryFile(repoUrl, function (err, links) {
                        var result = [];
                        for (var name in links) {
                            result.push(name);
                        }
                        if (err) console.log(err);
                        if (links) {
                            upgrade.upgradeAdapterHelper(links, result, 0, false, function () {
                                upgrade.upgradeController(links, yargs.argv.force, function () {
                                    processExit();
                                });
                            });
                        } else {
                            // No information
                            processExit(26);
                        }
                    });
                }
            });
        })();
        break;

    case 'clean':
        (function () {
            var yes = yargs.argv._[1];
            if (yes !== 'yes') {
                console.log('Command "clean" clears all Objects and States. To execute it write "' + tools.appName + ' clean yes"');
            } else {
                dbConnect(function (obj, stat, isNotRun) {
                    if (!isNotRun) {
                        console.error('Stop ' + tools.appName + ' first!');
                        processExit(1);
                        return;
                    }
                    cleanDatabase(true, function (count) {
                        console.log('Deleted ' + count + ' states');
                        restartController(function () {
                            console.log('Restarting ' + tools.appName + '...');
                            processExit();
                        });
                    });
                });
            }
        })();
        break;

    case 'restore':
        (function () {
             var Backup = require(__dirname + '/setup/setupBackup.js');

            dbConnect(function (obj, stat, isNotRun) {

                if (!isNotRun) {
                    console.error('Stop ' + tools.appName + ' first!');
                    processExit(1);
                    return;
                }

                var backup = new Backup({
                    states:            states,
                    objects:           objects,
                    cleanDatabase:     cleanDatabase,
                    restartController: restartController,
                    processExit:       processExit
                });

                backup.restoreBackup(yargs.argv._[1], function () {
                    console.log("System successfully restored!");
                    processExit(0);
                });
            });
        })();
        break;

    case 'backup':
        (function () {
            var name = yargs.argv._[1];
            var Backup = require(__dirname + '/setup/setupBackup.js');

            dbConnect(function () {
                var backup = new Backup({
                    states:            states,
                    objects:           objects,
                    cleanDatabase:     cleanDatabase,
                    restartController: restartController,
                    processExit:       processExit
                });

                backup.createBackup(name, function (filePath) {
                    console.log('Backup created: ' + filePath);
                    processExit(0);
                });
            });
        })();
        break;

    case 'l':
    case 'list':
        (function () {
            dbConnect(function () {
                var List = require(__dirname + '/setup/setupList.js');
                var list = new List({
                    states:      states,
                    objects:     objects,
                    processExit: processExit
                });
                list.list(yargs.argv._[1], yargs.argv._[2], yargs.argv);
            });
        })();
        break;
		
    case 'touch':
        (function () {
            var pattern = yargs.argv._[1];

            if (!pattern) {
                console.log('No file path found. Example: "touch /vis.0/main/*"');
                processExit(1);
                return;
            }
            dbConnect(function () {
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
                                            processExit: processExit
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
                                            processExit();
                                        }, 1000);
                                    }
                                });
                            }
                            if (!count) {
                                console.log('Nothing found');
                                processExit();
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
                                    processExit: processExit
                                });
                                for (var i = 0; i < processed.length; i++) {
                                    list.showFile(id, processed[i].path, processed[i]);
                                }
                            }
                        }
                        setTimeout(function () {
                            processExit();
                        }, 1000);
                    });

                }
            });
        })();
        break;

    case 'rm':
        (function () {
            var pattern = yargs.argv._[1];

            if (!pattern) {
                console.log('No file path found. Example: "touch /vis.0/main/*"');
                processExit(1);
                return;
            }
            dbConnect(function () {
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
                                            processExit: processExit
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
                                            processExit();
                                        }, 1000);
                                    }
                                });
                            }
                            if (!count) {
                                console.log('Nothing found');
                                processExit();
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
                                    processExit: processExit
                                });
                                list.showFileHeader();
                                for (var i = 0; i < processed.length; i++) {
                                    list.showFile(id, processed[i].path, processed[i]);
                                }
                            }
                        }
                        setTimeout(function () {
                            processExit();
                        }, 1000);
                    });

                }
            });
        })();
        break;

    case 'chmod':
        (function () {
            var mode    = yargs.argv._[1];
            var pattern = yargs.argv._[2];

            if (!mode) {
                console.log('No mode found. Example: "chmod 777 /vis.0/main/*"');
                processExit(1);
                return;
            } else {
                //yargs has converted it to number
                mode = parseInt(mode.toString(), 16);
            }

            if (!pattern) {
                console.log('No file path found. Example: "chmod 777 /vis.0/main/*"');
                processExit(1);
                return;
            }
            dbConnect(function () {
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
                                            processExit: processExit
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
                                            processExit();
                                        }, 1000);
                                    }
                                });
                            }
                            if (!count) {
                                console.log('Nothing found');
                                processExit();
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
                                    processExit: processExit
                                });
                                list.showFileHeader();
                                for (var i = 0; i < processed.length; i++) {
                                    list.showFile(id, processed[i].path, processed[i]);
                                }
                            }
                        }
                        setTimeout(function () {
                            processExit();
                        }, 1000);
                    });

                }
            });
        })();
        break;

    case 'chown':
        (function () {
            var user    = yargs.argv._[1];
            var group   = yargs.argv._[2];
            var pattern = yargs.argv._[3];

            if (!pattern) {
                pattern = group;
                group = undefined;
            }

            if (!user) {
                console.log('No user found. Example: "chown user /vis.0/main/*"');
                processExit(1);
            } else if (user.substring(12) !== 'system.user.') {
                user = 'system.user.' + user;
            }
            if (group && group.substring(13) !== 'system.group.') {
                group = 'system.group.' + group;
            }

            if (!pattern) {
                console.log('No file path found. Example: "chown user /vis.0/main/*"');
                processExit(1);
                return;
            }
            dbConnect(function () {
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
                                            processExit: processExit
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
                                            processExit();
                                        }, 1000);
                                    }
                                });
                            }
                            if (!count) {
                                console.log('Nothing found');
                                processExit();
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
                                    processExit: processExit
                                });
                                list.showFileHeader();
                                for (var i = 0; i < processed.length; i++) {
                                    list.showFile(id, processed[i].path, processed[i]);
                                }
                            }
                        }
                        setTimeout(function () {
                            processExit();
                        }, 1000);
                    });
                }
            });
        })();
        break;

    case 'adduser':
        (function () {
            var user = yargs.argv._[1];
            var group = yargs.argv.ingroup || 'system.group.administrator';
            var password = yargs.argv.password;

            if (!user) {
                console.log('Please define user name, like: "adduser newUser"');
                processExit(30);
            }

            dbConnect(function () {
                // Check group
                if (group.substring(0, 13) !== 'system.group.' ) group = 'system.group.' + group;

                objects.getObject(group, function (err, obj) {
                    if (!obj) {
                        console.log('Unknown group: ' + group);
                        processExit(31);
                    }
                    if (user.substring(0, 12) === 'system.user.' ) user = user.substring(12);
                    if (!password) {
                        var prompt = require('prompt');
                        prompt.message = '';
                        prompt.delimiter = '';
                        var schema = {
                            properties: {
                                password: {
                                    description: 'Enter your password:',
                                    pattern: /^"+$/,
                                    message: 'No " are allowed',
                                    hidden: true
                                },
                                repeatPassword: {
                                    description: 'Enter your password:',
                                    pattern: /^"+$/,
                                    message: 'No " are allowed',
                                    hidden: true
                                }
                            }
                        };
                        prompt.start();

                        prompt.get(schema, function (err, result) {
                            if (result) {
                                if (result.password !== result.repeatPassword) {
                                    console.log('Passwords are not identical!');
                                    processExit(31);
                                }
                                var Users = require(__dirname + '/setup/setupUsers.js');
                                var users = new Users({
                                    objects:     objects,
                                    processExit: processExit
                                });
                                //create user
                                users.addUser(user, result.password, function (err) {
                                    if (err) {
                                        console.log(err);
                                        processExit(30);
                                    } else {
                                        users.addUserToGroup(user, group, function (err) {
                                            if (err) {
                                                console.log(err);
                                                processExit(30);
                                            } else {
                                                console.log('User "' + user + '" created (Group: ' + group.replace('system.group.', '') + ')');
                                                processExit();
                                            }
                                        });
                                    }
                                });
                            } else {
                                console.log(err);
                                processExit(30);
                            }
                        });
                    } else {
                        var Users = require(__dirname + '/setup/setupUsers.js');
                        var users = new Users({
                            objects:     objects,
                            processExit: processExit
                        });
                        users.addUser(user, password, function (err) {
                            if (err) {
                                console.log(err);
                                processExit(30);
                            } else {
                                users.addUserToGroup(user, group, function (err) {
                                    if (err) {
                                        console.log(err);
                                        processExit(30);
                                    } else {
                                        console.log('User "' + user + '" created (Group: ' + group.replace('system.group.', '') + ')');
                                        processExit();
                                    }
                                });
                            }
                        });
                    }
                });
            });
        })();
        break;

    case 'passwd':
        (function () {
            var user     = yargs.argv._[1];
            var password = yargs.argv.password;

            if (!user) {
                console.log('Please define user name, like: "passwd username"');
                processExit(30);
            }
            if (user && user.match(/^system\.user\./)) user = user.substring('system.user.'.length);

            dbConnect(function () {

                var Users = require(__dirname + '/setup/setupUsers.js');
                var users = new Users({
                    objects:     objects,
                    processExit: processExit
                });

                users.isUser(user, function (err, result) {
                    if (err) console.error('Cannot read user: ' + err);
                    if (!result) {
                        console.error('User "' + user + '" does not exist.');
                        processExit(31);
                    } else {
                        // Check group
                        if (!password) {
                            var prompt = require('prompt');
                            prompt.message   = '';
                            prompt.delimiter = '';
                            var schema = {
                                properties: {
                                    password: {
                                        description: 'Enter your password:',
                                        pattern: /^[^'"]*$/,
                                        message: 'No " are allowed',
                                        hidden: true
                                    },
                                    repeatPassword: {
                                        description: 'Repeat your password:',
                                        pattern: /^[^'"]*$/,
                                        message: 'No " are allowed',
                                        hidden: true
                                    }
                                }
                            };
                            prompt.start();

                            prompt.get(schema, function (err, result) {
                                if (result) {
                                    if (result.password !== result.repeatPassword) {
                                        console.log('Passwords are not identical!');
                                        processExit(31);
                                    }
                                    // set user password
                                    users.setPassword(user, result.password, function (err) {
                                        if (err) {
                                            console.log(err);
                                            processExit(30);
                                        } else {
                                            console.log('Password for "' + user + '" was successfully set.');
                                            processExit();
                                        }
                                    });
                                }
                            });
                        } else {
                            users.setPassword(user, password, function (err) {
                                if (err) {
                                    console.log(err);
                                    processExit(30);
                                } else {
                                    console.log('Password for "' + user + '" was successfully set.');
                                    processExit();
                                }
                            });
                        }
                    }
                });
            });
        })();
        break;

    case 'ud':
    case 'udel':
    case 'userdel':
        (function () {
            var user     = yargs.argv._[1];

            if (!user) {
                console.log('Please define user name, like: "userdel user"');
                processExit(30);
            }
            if (user && user.substring(0, 12) === 'system.user.') user = user.substring(12);

            dbConnect(function () {
                var Users = require(__dirname + '/setup/setupUsers.js');
                var users = new Users({
                    objects:     objects,
                    processExit: processExit
                });
                // Check group
                users.delUser(user, function (err) {
                    if (err) {
                        console.log(err);
                        processExit(30);
                    } else {
                        console.log('User "' + user + '" deleted');
                        processExit();
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
                for (var s in sources) {
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

                fs.writeFileSync(__dirname + '/../../../package.json', JSON.stringify(json, null, 2));
                processExit();
            });
        })();
        break;

    case 'set':
        (function () {
            var instance = yargs.argv._[1];
            if (!instance) {
                console.warn('please specify instance.');
                processExit(1);
            }
            if (instance.indexOf('.') === -1) {
                console.warn('please specify instance, like "' + instance + '.0"');
                processExit(1);
            }
            dbConnect(function () {
                objects.getObject('system.adapter.' + instance, function (err, obj) {
                    if (!err && obj) {
                        var changed = false;
                        if (yargs.argv.port) {
                            if (!obj.native.port) {
                                console.warn('Adapter "' + instance + '" has no setting "port".');
                            } else {
                                changed = true;
                                obj.native.port = parseInt(yargs.argv.port, 10);
                                console.log('New port for "' + instance + ' is: ' + obj.native.port);
                            }
                        }
                        if (yargs.argv.ip) {
                            if (!obj.native.bind) {
                                console.warn('Adapter "' + instance + '" has no setting "bind".');
                            } else {
                                changed = true;
                                obj.native.bind = yargs.argv.ip;
                                console.log('New bind ip for "' + instance + ' is: ' + obj.native.bind);
                            }
                        }
                        if (yargs.argv.ssl !== undefined) {
                            if (!obj.native.secure === undefined) {
                                console.warn('Adapter "' + instance + '" has no setting "secure".');
                            } else {
                                changed = true;
                                obj.native.secure = yargs.argv.ssl === 'true' || yargs.argv.ssl === true || yargs.argv.ssl === 1 || yargs.argv.ssl === '1';
                                console.log('New secure setting for "' + instance + ' is: ' + obj.native.secure);
                            }
                        }
                        if (yargs.argv.auth !== undefined) {
                            if (obj.native.auth === undefined) {
                                console.warn('Adapter "' + instance + '" has no setting "auth".');
                            } else {
                                changed = true;
                                obj.native.auth = yargs.argv.auth === 'true' || yargs.argv.auth === true || yargs.argv.auth === 1 || yargs.argv.auth === '1';
                                console.log('New auth setting for "' + instance + ' is: ' + obj.native.auth);
                            }
                        }
                        if (yargs.argv.enabled !== undefined) {
                            if (!obj.common.enabled === undefined) {
                                console.warn('Adapter "' + instance + '" has no setting "enabled".');
                            } else {
                                changed = true;
                                obj.common.enabled = yargs.argv.enabled === 'true' || yargs.argv.enabled === true || yargs.argv.enabled === 1 || yargs.argv.enabled === '1';
                                console.log('New enabled setting for "' + instance + ' is: ' + obj.common.enabled);
                            }
                        }
                        if (changed) {
                            objects.setObject('system.adapter.' + instance, obj, function () {
                                console.log('Instance settings for "' + instance + '" are changed.');
                                processExit();
                            });
                        } else {
                            console.log('No parameters set.');
                            processExit();
                        }
                    } else {
                        console.error('Instance "' + instance + '" does not exist.');
                        processExit(24);
                    }
                });
            });
        })();
        break;

    case 'host':
        (function () {
            var change = yargs.argv._[1];

            var oldHostname;
            var newHostname;
            if (!change) {
                console.warn('Please write "' + tools.appName + ' host this" to use this host ("' + hostname + '") in ' + tools.appName + ' for all instances.');
                processExit(1);
            }

            var config  = tools.getConfigFileName();
            var data    = JSON.parse(fs.readFileSync(config));

            if (change === 'set') {
                oldHostname = tools.getHostName();
                newHostname = yargs.argv._[2];
                if (!newHostname) {
                    console.error('To change host name call: ' + tools.appName + ' host set newName');
                    processExit(34);
                }

                data.system = data.system || {};
                data.system.hostname = newHostname;
                fs.writeFileSync(config, JSON.stringify(data));
            } else {
                oldHostname = (change !== 'self' && change !== 'this') ? change : null;
                newHostname = require('os').hostname();
            }

            dbConnect(function (_objects, _states, isOffline) {
                if (!isOffline) {
                    console.error('Cannot execute changes on running system. Stop ' + tools.appName + ' first.');
                    processExit(30);
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
                            processExit(30);
                        }

                    }
                    if (change !== 'set' && oldHostname && data.system && data.system.hostname === oldHostname) {
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
                            if (hName === newHostname) {
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
                                console.log('Rename host "' + obj._id + '" to system.host.' + newHostname);
                                objects.delObject(obj._id, function (err) {
                                    if (err) console.error('Cannot delete object: ' + err);
                                    if (!--count) processExit();
                                });

                                obj._id = 'system.host.' + newHostname;
                                obj.common.name = obj._id;
                                obj.common.hostname = newHostname;
                                obj.common.address = [];
                                obj.common.cmd = '';
                                obj.common.native = {process: {}, os: {}, hardware: {}};
                                objects.setObject(obj._id, obj, function (err) {
                                    if (err) console.error('Cannot set object: ' + err);
                                    if (!--count) processExit();
                                });
                            } else {
                                // state
                                count++;
                                objects.delObject(obj._id, function (err) {
                                    if (err) console.error('Cannot delete object: ' + err);
                                    if (!--count) processExit();
                                });
                                console.log('Rename state "' + obj._id + '".');
                                obj._id = 'system.host.' + newHostname + (hNameM[2] || '');
                                count++;
                                objects.setObject(obj._id, obj, function (err) {
                                    if (err) console.error('Cannot set object: ' + err);
                                    if (!--count) processExit();
                                });
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
                                objects.setObject(objs.rows[i].value._id, objs.rows[i].value, function (err) {
                                    if (err) console.error('Cannot set object: ' + err);
                                    if (!--count) processExit();
                                });
                            }
                        }
                        if (!count) {
                            console.warn('No instances found for host "' + change + '".');
                            processExit();
                        }
                    });
                });
            });

        })();
        break;

    case 'visdebug':
        (function () {
            var widgetset = yargs.argv._[1];
            if (widgetset && widgetset.match('/^vis-/')) {
                widgetset = widgetset.substring(4);
            }

            var VisDebug = require(__dirname + '/setup/setupVisDebug.js');

            dbConnect(function (_objects) {
                var visDebug = new VisDebug({
                    objects:     _objects,
                    processExit: processExit
                });

                visDebug.enableDebug(widgetset);
            });
        })();
        break;

    case 'file':
    case 'f':
        (function () {
            var cmd = yargs.argv._[1];
            if (cmd !== 'read' && cmd !== 'r' && cmd !== 'w' && cmd !== 'write') {
                console.log('Invalid parameters: write "file read /vis.0/main/img/picture.png /opt/picture/image.png" to read the file');
                processExit(1);
            }
            if (!yargs.argv._[2]) {
                console.log('Invalid parameters: write "file read /vis.0/main/img/picture.png /opt/picture/image.png" to read the file');
                processExit(1);
            }

            dbConnect(function (_objects) {
                if (cmd === 'read' || cmd ==='r') {
                    var toRead = yargs.argv._[2];
                    var parts = toRead.replace(/\\/g, '/').split('/');

                    var path = (yargs.argv._[3] || process.cwd()).replace(/\\/g, '/').split('/');
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
                        processExit(0);
                    });
                } else {
                    var toRead = yargs.argv._[2];
                    var parts = toRead.replace(/\\/g, '/').split('/');

                    var path = yargs.argv._[3].replace(/\\/g, '/').split('/');

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
                        processExit(0);
                    });
                }
            });
        })();
        break;

    case 'v':
    case 'version':
        (function () {
            var adapter = yargs.argv._[1];
            if (adapter) {
                try {
                    iopckg = require('iobroker.' + adapter + '/package.json');
                } catch (err) {
                    iopckg = {version: '"' + adapter + '" not found'};
                }
            } else {
                iopckg = require(__dirname + '/../package.json');
            }
            console.log(iopckg.version);
        })();
        break;

    default:
        if (yargs.argv.v || yargs.argv.version) {
            var iopckg;
            if (yargs.argv._[0]) {
                try {
                    iopckg = require('iobroker.' + yargs.argv._[0] + '/package.json');
                } catch (err) {
                    iopckg = {version: '"' + yargs.argv._[0] + '" not found'};
                }
            } else {
                iopckg = require(__dirname + '/../package.json');
            }
            console.log(iopckg.version);
        } else {
            yargs.showHelp();
        }
        processExit();
        break;
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

    if (adapter) path = tools.getAdapterDir(adapter);

    if (fs.existsSync(path + '/package.json')) {
        var config = require(tools.getConfigFileName());

        if (1 || config.network.useSystemNpm) {
            var cmd = 'npm install --production --prefix "' + path + '"';
            console.log(cmd + ' (System call)');
            // Install node modules as system call

            // System call used for update of js-controller itself,
            // because during installation npm packet will be deleted too, but some files must be loaded even during the install process.
            var exec = require('child_process').exec;
            var child = exec(cmd);
            child.stderr.pipe(process.stdout);
            child.on('exit', function (code, signal) {
                if (code) {
                    console.log('Cannot install ' + tools.appName + '.' + adapter + ': ' + code);
                    processExit(25);
                }
                // command succeeded
                if (callback) callback(adapter);
            });
        } else {
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
        }
    } else {
        if (callback) callback(adapter);
    }
}

function getRepository(repoUrl, callback) {
    if (!repoUrl || typeof repoUrl !== 'object') {
        if (!objects) {
            dbConnect(function () {
                getRepository(repoUrl, callback);
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
                                    // Store uploaded repo
                                    objects.setObject('system.repositories', repos, function () {
                                        callback(sources);
                                    });
                                });
                            } else {
                                // We have already repo, give it back
                                callback(repos.native.repositories[active].json);
                            }
                        } else {
                            console.log('Requested repository "' + active + '" does not exit in config.');
                            processExit(25);
                        }
                    } else {
                        console.log('No repositories defined.');
                        processExit(25);
                    }
                });
            });
        }
    } else {
        callback(repoUrl);
    }
}

function dbConnect(onlyCheck, callback) {
    if (typeof onlyCheck === 'function') {
        callback  = onlyCheck;
        onlyCheck = false;
    }
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
    }, yargs.argv.timeout || config.objects.connectTimeout || 2000);

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

            if (isStatesConnected && typeof callback === 'function') callback(objects, states);
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

            if (isObjectConnected && typeof callback === 'function') callback(objects, states);
        }
    });
}


