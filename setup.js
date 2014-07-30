/**
 *
 *  ioBroker.nodejs Controller start/stop and install script
 *
 *  7'2014 hobbyquaker <hq@ccu.io>
 *
 *
 */

/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";

var yargs = require('yargs')
    .usage('Commands:\n' +
        '$0 setup [--couch <host>] [--redis <host>]\n' +
        '$0 start\n' +
        '$0 stop\n' +
        '$0 add <adapter> [--enabled] [--host <host>]' +
        '$0 del <adapter> [--delmeta]')
    .default('couch',   '127.0.0.1')
    .default('redis',   '127.0.0.1')
    .default('lang',    'en')
    ;

//console.log(JSON.stringify(yargs.argv, null, '  '));

var ObjectsCouch;
var objects;
var fs;
var os;
var tools;

switch (yargs.argv._[0]) {

    case "start":
    case "stop":
        var daemon = require("daemonize2").setup({
            main: "controller.js",
            name: "iobroker.ctrl",
            pidfile: "iobroker.pid"
        });
        daemon[yargs.argv._[0]]();
        break;

    case "setup":
        fs =            require('fs');
        ObjectsCouch =  require(__dirname + '/lib/couch.js');

        var config;
        if (!fs.existsSync(__dirname + '/conf/iobroker.json')) {
            config = fs.readFileSync(__dirname + '/conf/iobroker-dist.json');
            console.log('creating conf/iobroker.json');
            config = JSON.parse(config);
            config.couch.host = yargs.argv.couch || '127.0.0.1';
            config.redis.host = yargs.argv.redis || '127.0.0.1';
            fs.writeFileSync(__dirname + '/conf/iobroker.json', JSON.stringify(config));
        }

        var iopkg = JSON.parse(fs.readFileSync(__dirname + '/io-package.json'));

        dbConnect(function () {
            // todo - loop over array - object could have more than 1 elem
            objects.setObject("_design/system", iopkg.objects[0], function () {
                console.log('object _design/system created');
                console.log('database setup done. you can add adapters and start iobroker now');
                process.exit(0);
            });
        });

        break;


    case "add":
        fs =            require('fs');
        tools =         require(__dirname + '/lib/tools.js');
        ObjectsCouch =  require(__dirname + '/lib/couch.js');

        var name =      yargs.argv._[1];
        var ipArr =     tools.findIPs();
        var firstIp =   ipArr[0];

        if (!fs.existsSync(__dirname + '/adapter/' + name)) {
            downloadAdapter(name, function () {
                dbConnect(function () {
                    createInstance(name, yargs.argv.enabled, yargs.argv.host || firstIp);
                });
            });
        } else {
            dbConnect(function () {
                createInstance(name, yargs.argv.enabled, yargs.argv.host || firstIp);
            });
        }
        break;


    case "del":

        break;


    default:
        yargs.showHelp();

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
        }
    });
}

function downloadAdapter(adapter, callback) {
    var name;
    var url;
    var sources;

    if (!fs.existsSync(__dirname + '/conf/sources.json')) {
        sources = fs.readFileSync(__dirname + '/conf/sources-dist.json');
        console.log('creating conf/sources.json');
        fs.writeFileSync(__dirname + '/conf/sources.json', sources);
        sources = JSON.parse(sources);
    } else {
        sources = JSON.parse(fs.readFileSync(__dirname + '/conf/sources.json'));
    }

    if (sources[adapter]) {
        name = adapter;
        url = sources[adapter].url;
    } else {
        url = adapter;
        // Todo set name if cmd called with adapter-url
    }

    var urlParts = url.split('/');
    var repoName = urlParts[4];

    var request =   require('request');
    var AdmZip =    require('adm-zip');
    var ncp =       require('ncp').ncp;
    ncp.limit = 16;

    console.log('download ' + url);

    var tmpFile = __dirname + '/tmp/' + name + '.zip';
    request(url).pipe(fs.createWriteStream(tmpFile)).on('close', function () {
        console.log('unzip ' + tmpFile);

        var zip = new AdmZip(tmpFile);
        zip.extractAllTo(__dirname + '/tmp', true);

        var source =        __dirname + '/tmp/' + repoName + '-master';
        var destination =   __dirname + '/adapter/' + name;

        console.log('copying ' + source + ' to ' + destination);

        ncp(source, destination, function (err) {
            if (err) {
                console.log('ncp error: ' + err);
                return;
            }

            console.log('delete ' + tmpFile);
            fs.unlinkSync(tmpFile);
            console.log('delete ' + __dirname + '/tmp/' + repoName + '-master');
            tools.rmdirRecursiveSync(__dirname + '/tmp/' + repoName + '-master');

            if (typeof callback === 'function') callback(name);

        });
    });

}



function installAdapter(adapter, callback) {
    var fs = require('fs');

    console.log('install adapter ' + adapter);

    if (!fs.existsSync(__dirname + '/adapter/' + adapter + '/io-package.json')) {
        console.log('error: adapter ' + adapter + ' not found');
        process.exit(1);
    }

    try {
        var adapterConf = JSON.parse(fs.readFileSync(__dirname + '/adapter/' + adapter + '/io-package.json').toString());
    } catch (e) {
        console.log('error: reading io-package.json ' + e);
        process.exit(1);
    }


    function install() {
        var objs = [];
        if (adapterConf.objects && adapterConf.objects.length > 0) objs = adapterConf.objects;

        objs.push({
            _id: 'system.adapter.' + adapterConf.common.name,
            type: 'adapter',
            common: adapterConf.common,
            native: adapterConf.native
        });

        function setObject(callback) {
            if (objs.length === 0) {
                callback();
            } else {
                var obj = objs.pop();
                objects.extendObject(obj._id, obj, function (err, res) {
                    if (err) {
                        console.log('error setObject ' + obj._id + ' ' + err);
                        process.exit(1);
                    } else {
                        console.log('object ' + obj._id + ' created');
                        setTimeout(function (_cb) {
                            setObject(_cb);
                        }, 50, callback);
                    }
                });
            }
        }

        setObject(callback);

    }


    if (fs.existsSync(__dirname + '/adapter/' + adapter + '/package.json') && !fs.existsSync(__dirname + '/adapter/' + adapter + '/node_modules')) {
        // Install node modules
        var exec = require('child_process').exec;
        var cmd = 'npm install ' + __dirname + '/adapter/' + adapter + ' --prefix ' + __dirname + '/adapter/' + adapter;
        console.log(cmd);
        var child = exec(cmd);
        child.stderr.pipe(process.stderr);
        child.on('exit', function () {
            install();
        });
    } else {
        install();
    }

}


function createInstance(adapter, enabled, host, callback) {

    objects.getObject('system.adapter.' + adapter, function (err, doc) {
        if (err || !doc) {
            installAdapter(adapter, function () {
                createInstance(adapter, enabled, host, callback);
            });
            return;
        }
        objects.getObjectView('system', 'instanceStats', {startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999'}, function (err, res) {
            if (err || !res) {
                console.log('error: view instanceStats ' + err);
                process.exit(1);
                return;
            }
            var instance = (res.rows && res.rows[0] && res.rows[0].value ? res.rows[0].value.max + 1 : 0);
            objects.getObject('system.adapter.' + adapter, function (err, res) {
                var obj = res;
                obj._id = 'system.adapter.' + adapter + '.' + instance;
                obj.type = 'instance';
                obj.parent = 'system.adapter.' + adapter;
                delete obj._rev;
                obj.common.enabled = enabled || false;
                obj.common.host = host;
                objects.setObject('system.adapter.' + adapter + '.' + instance, obj, function () {
                    console.log('object ' + 'system.adapter.' + adapter + '.' + instance + ' created');
                    objects.setObject('system.adapter.' + adapter + '.' + instance + '.alive', {
                        type: 'state',
                        name: adapter + '.' + instance + '.alive',
                        parent: 'system.adapter.' + adapter + '.' + instance,
                        common: {
                            type: 'bool',
                            role: 'indicator.state'
                        },
                        native: {}
                    }, function () {
                        console.log('object ' + 'system.adapter.' + adapter + '.' + instance + '.alive created');
                        objects.setObject('system.adapter.' + adapter + '.' + instance + '.connected', {
                            type: 'state',
                            name: adapter + '.' + instance + '.connected',
                            parent: 'system.adapter.' + adapter + '.' + instance,
                            common: {
                                type: 'bool',
                                role: 'indicator.state'
                            },
                            native: {}
                        }, function () {
                            console.log('object ' + 'system.adapter.' + adapter + '.' + instance + '.connected created');
                            process.exit(0);
                        });
                    });
                });
            });
            var adapterConf;
            try {
                adapterConf = JSON.parse(fs.readFileSync(__dirname + '/adapter/' + adapter + '/io-package.json').toString());
            } catch (e) {
                console.log('error: reading io-package.json ' + e);
                process.exit(1);
            }

            if (adapterConf.instanceObjects && adapterConf.instanceObjects.length > 0) {
                for (var i = 0, l = adapterConf.instanceObjects.length; i < l; i++) {
                    var obj = adapterConf.instanceObjects[i];
                    obj._id = adapter + '.' + instance + '.' + obj._id;
                    console.log('object ' + obj._id + ' created');
                    objects.setObject(obj._id, obj);
                }
            }

        });

    });

}
