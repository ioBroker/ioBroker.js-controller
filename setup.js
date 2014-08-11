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
        '$0 add <adapter> [--enabled] [--host <host>]\n' +
        '$0 del <adapter>' +
        '$0 del <adapter>.<instance>' +
        '$0 update' +
        '$0 update <adapter>')
    .default('couch',   '127.0.0.1')
    .default('redis',   '127.0.0.1')
    .default('lang',    'en')
    ;

var ObjectsCouch;
var objects;
var fs;
var password;
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
        password =      require(__dirname + '/lib/password.js');
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
            dbSetup();

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


    case "delete":
    case "del":
        var name     = yargs.argv._[1];
        var instance = yargs.argv._[2];
        if (!name) {
            yargs.showHelp();
            process.exit(1);
        }

        if (name && name.indexOf('.') != -1) {
            var parts = name.split('.');
            name = parts[0];
            instance = parts[1];
        }
        ObjectsCouch =  require(__dirname + '/lib/couch.js');
        if (instance !== null && instance !== undefined && instance !== "") {
            dbConnect(function () {
                deleteInstance(name, instance);
            });
        } else {
            dbConnect(function () {
                deleteAdapter(name);
            });
        }
        break;

    case "update":
        console.log("...TODO"); // TODO
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
            _id:    'system.adapter.' + adapterConf.common.name,
            type:   'adapter',
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

        // Copy files to web adapters
        if(fs.existsSync(__dirname + '/adapter/' + adapter + "/web/") && adapterConf.common.webservers) {
            if (typeof adapterConf.common.webservers == "string") adapterConf.common.webservers = [adapterConf.common.webservers];
            for (var i = 0; i < adapterConf.common.webservers.length; i++) {
                if(fs.existsSync(__dirname + '/adapter/' + adapterConf.common.webservers[i] + '/')) {
                    // Copy files from adapter/<name>/web to adapter/<webName>/??? TODO

                }
            }
        }
    }


    if (fs.existsSync(__dirname + '/adapter/' + adapter + '/package.json') && !fs.existsSync(__dirname + '/adapter/' + adapter + '/node_modules')) {
        // Install node modules
        var exec = require('child_process').exec;
        var cmd = 'npm install "' + __dirname + '/adapter/' + adapter + '" --prefix "' + __dirname + '/adapter/' + adapter + '"';
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
            var adapterConf;
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

                    if (!adapterConf) {
                        try {
                            adapterConf = JSON.parse(fs.readFileSync(__dirname + '/adapter/' + adapter + '/io-package.json').toString());
                        } catch (e) {
                            console.log('error: reading io-package.json ' + e);
                            process.exit(1);
                        }
                    }
                    // Create only for this instance the predefined in io-package.json objects
                    // It is not necessary to write "system.adapter.name.N." in the object '_id'
                    if (adapterConf.instanceObjects && adapterConf.instanceObjects.length > 0) {
                        var obj = adapterConf.instanceObjects.pop();
                        objects.setObject("system.adapter." + adapter + '.' + instance + '.' + obj._id, obj, function () {
                            console.log('object ' + 'system.adapter.' + adapter + '.' + instance + '.' + obj._id + ' created');
                        });
                    }
                });
            });
            if (!adapterConf) {
                try {
                    adapterConf = JSON.parse(fs.readFileSync(__dirname + '/adapter/' + adapter + '/io-package.json').toString());
                } catch (e) {
                    console.log('error: reading io-package.json ' + e);
                    process.exit(1);
                }
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

function deleteAdapter(adapter, callback) {
    objects.getObjectView("system", "instance", {startkey: adapter}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length === 0) {
                console.log('no instances of adapter ' + adapter + ' found');
            } else {
                var count = 0;

                for (var i = 0; i < doc.rows.length; i++) {
                    objects.delObject(doc.rows[i].value._id);
                    count++;
                }
                console.log('deleted ' + count + ' objects of ' + adapter);
            }
        }
    });
    objects.getObjectView("system", "adapter", {startkey: adapter}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length === 0) {
                console.log('no adapter ' + adapter + ' found');
            } else {
                var count = 0;

                for (var i = 0; i < doc.rows.length; i++) {
                    var adapterConf = doc.rows[i].value;
                    objects.delObject(adapterConf._id);
                    count++;

                    // Delete files from web adapters
                    if(fs.existsSync(__dirname + '/adapter/' + adapter + "/web/") && adapterConf.common.webservers) {
                        if (typeof adapterConf.common.webservers == "string") adapterConf.common.webservers = [adapterConf.common.webservers];
                        for (var i = 0; i < adapterConf.common.webservers.length; i++) {
                            if(fs.existsSync(__dirname + '/adapter/' + adapterConf.common.webservers[i] + '/')) {
                                // Delete files from adapter/<name>/web to adapter/<webName>/??? TODO

                            }
                        }
                    }

                    // Delete adapter folder if it was installed
                    //TODO 

                }
                console.log('deleted ' + count + ' objects of ' + adapter);
            }
        }
    });
    objects.getObjectView("system", "state", {}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length === 0) {
                console.log('no adapter ' + adapter + ' found');
            } else {
                var count = 0;
                var name = "system.adapter." + adapter;
                for (var i = 0; i < doc.rows.length; i++) {
                    if (doc.rows[i].value._id.substring(0, name.length) == name) {
                        objects.delObject(doc.rows[i].value._id);
                        count++;
                    }
                }
                console.log('deleted ' + count + ' objects of ' + adapter);
            }
        }
    });
}

function deleteInstance(adapter, instance, callback) {
    objects.getObjectView("system", "instance", {startkey: adapter}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length === 0) {
                console.log('no instances of adapter ' + adapter + ' found');
            } else {
                var count = 0;
                var name = "system.adapter." + adapter + '.' + instance;
                for (var i = 0; i < doc.rows.length; i++) {
                    if (name == doc.rows[i].value._id.substring(0, doc.rows[i].value._id.length)) {
                        objects.delObject(doc.rows[i].value._id);
                        count++;
                    }
                }
                console.log('deleted ' + count + ' objects of ' + adapter);
            }
        }
    });

    objects.getObjectView("system", "state", {}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc.rows.length === 0) {
                console.log('no adapter ' + adapter + ' found');
            } else {
                var count = 0;
                var name = "system.adapter." + adapter + '.' + instance;
                for (var i = 0; i < doc.rows.length; i++) {
                    if (doc.rows[i].value._id.substring(0, name.length) == name) {
                        objects.delObject(doc.rows[i].value._id);
                        count++;
                    }
                }
                console.log('deleted ' + count + ' objects of ' + adapter);
            }
        }
    });
}

function dbSetup() {
    if (iopkg.objects && iopkg.objects.length > 0) {
        var obj = iopkg.objects.pop();
        objects.setObject(obj._id, obj, function () {
            console.log('object ' + obj._id + ' created');
            dbSetup();
        });
    } else {
        // Default Password for user 'admin' is 'iobroker'
        password('iobroker').hash(null, null, function (err, res) {
            // Create user here and not in io-package.js because of hash password
            objects.setObject('system.user.admin', {
                type: 'user',
                common: {
                    name:      'admin',
                    password:   res,
                    dontDelete: true
                },
                native: {}
            }, function () {
                console.log('object system.user.admin created');
                objects.getObject('system.meta.uuid', function (err, res) {
                    if (!err && res && res.native && res.native.uuid) {
                        console.log('database setup done. you can add adapters and start iobroker now');
                        process.exit(0);
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
                            console.log('database setup done. you can add adapters and start iobroker now');
                            process.exit(0);
                        });
                    }
                });

            });
        });
    }
}

// Returns a RFC4122 compliant v4 UUID https://gist.github.com/LeverOne/1308368 (DO WTF YOU WANT TO PUBLIC LICENSE)
function uuid(a, b) {
    b = a = '';
    while (a++ < 36) {
        b += a * 51 & 52 ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-';
    }
    return b;
}
