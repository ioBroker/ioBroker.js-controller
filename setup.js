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
        '$0 upgrade' +
        '$0 state get <id>' +
        '$0 state getplain <id>' +
        '$0 state set <id> <value>' +
        '$0 state setplain <id> <value>' +
        '$0 upgrade <adapter>')
    .default('couch',   '127.0.0.1')
    .default('redis',   '127.0.0.1')
    .default('lang',    'en')
    ;

var ObjectsCouch;
var objects;
var fs;
var password;
var tools;
var request;
var extend;

switch (yargs.argv._[0]) {

    case "start":
    case "stop":
        var daemon = require("daemonize2").setup({
            main: "controller.js",
            name: "ioBroker controller",
            pidfile: "iobroker.pid",
            stopTimeout: 12000
        });
        daemon[yargs.argv._[0]]();
        break;
    case "update":
        fs =            require('fs');
        tools =         require(__dirname + '/lib/tools.js');
        ObjectsCouch =  require(__dirname + '/lib/couch.js');
        request =       require('request');
        extend =        require('node.extend');
        dbConnect(function () {
            updateRepo();
        });
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
        var adpr     = yargs.argv._[1];
        var instance = yargs.argv._[2];
        if (!adpr) {
            yargs.showHelp();
            process.exit(1);
        }

        if (adpr && adpr.indexOf('.') != -1) {
            var parts = adpr.split('.');
            adpr = parts[0];
            instance = parts[1];
        }
        ObjectsCouch =  require(__dirname + '/lib/couch.js');
        if (instance !== null && instance !== undefined && instance !== "") {
            dbConnect(function () {
                deleteInstance(adpr, instance);
            });
        } else {
            dbConnect(function () {
                deleteAdapter(adpr);
            });
        }
        break;
        
    case "state":
        var cmd = yargs.argv._[1];
        var id  = yargs.argv._[2];
        if (id) {
            var config = require('fs').readFileSync(__dirname + '/conf/iobroker.json');
            config = JSON.parse(config);

            var StatesRedis = require(__dirname + '/lib/redis.js');
            var states = new StatesRedis({
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
                        console.log(obj.val);
                        console.log(obj.ack);
                        console.log(obj.from);
                        console.log(obj.ts);
                        console.log(obj.lc);
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
        var id  = yargs.argv._[1];
        if (id) {
            var config = require('fs').readFileSync(__dirname + '/conf/iobroker.json');
            config = JSON.parse(config);

            var StatesRedis = require(__dirname + '/lib/redis.js');
            var states = new StatesRedis({
                redis: {
                    host:    config.redis.host,
                    port:    config.redis.port,
                    options: config.redis.options
                }
            });
            var msg = yargs.argv._[2];
            if (!msg) {
                console.log("Invalid format: No message found.");
                yargs.showHelp();
                process.exit();
            } else {
                states.pushMessage("system.adapter." + id + ".messagebox", {command: "send", message: msg, from: "setup"}, function () {
                    process.exit();
                });
            }
        } else {
            console.log("Invalid format: no id found");
            yargs.showHelp();
        }
        break;

    case "upgrade":
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
    var fs  = require('fs');
    var ncp = require('ncp').ncp;
    ncp.limit = 16;

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

    function copyFiles(source, dest) {
        console.log('copying ' + source + ' to ' + dest);
        ncp(source, dest, function (err) {
            if (err) {
                console.log('ncp error: ' + err);
                return;
            }
        });
    }

    function install() {
        var objs = [];
        if (adapterConf.objects && adapterConf.objects.length > 0) objs = adapterConf.objects;
        adapterConf.common.installedVersion = adapterConf.common.version;
        objs.push({
            _id:    'system.adapter.' + adapterConf.common.name,
            type:   'adapter',
            common: adapterConf.common,
            native: adapterConf.native,
            children: []
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
        if (fs.existsSync(__dirname + '/adapter/' + adapter + '/web/') && adapterConf.common.webservers) {
            if (typeof adapterConf.common.webservers == "string") adapterConf.common.webservers = [adapterConf.common.webservers];
            for (var i = 0; i < adapterConf.common.webservers.length; i++) {
                if (fs.existsSync(__dirname + '/adapter/' + adapterConf.common.webservers[i] + '/')) {
                    // Copy files from adapter/<name>/web to adapter/<webName>/
                    copyFiles(__dirname + '/adapter/' + adapter + '/web/', __dirname + '/adapter/' + adapterConf.common.webservers[i] + '/' + adapter + '/');
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

var waitFor = 0;
function isFinished(err, res, obj) {
    console.log('object ' + obj + ' created');
    waitFor--;
    if (!waitFor) {
        process.exit();
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
            var obj = doc;
            obj._id    = 'system.adapter.' + adapter + '.' + instance;
            obj.type   = 'instance';
            obj.parent = 'system.adapter.' + adapter;
            delete obj._rev;
            obj.common.enabled = enabled || false;
            obj.common.host    = host;

            waitFor++;
            objects.setObject('system.adapter.' + adapter + '.' + instance, obj, function () {
                if (!obj.children || obj.children.indexOf('system.adapter.' + adapter + '.' + instance) == -1) {
                    obj.children = obj.children || [];
                    obj.children.push('system.adapter.' + adapter + '.' + instance);
                    objects.extendObject(obj._id, {children: obj.children});
                }
                isFinished(null, null, 'system.adapter.' + adapter + '.' + instance);
            });

            waitFor++;
            objects.setObject('system.adapter.' + adapter + '.' + instance + '.alive', {
                type: 'state',
                name: adapter + '.' + instance + '.alive',
                parent: 'system.adapter.' + adapter + '.' + instance,
                common: {
                    type: 'bool',
                    role: 'indicator.state'
                },
                native: {}
            }, isFinished);

            waitFor++;
            objects.setObject('system.adapter.' + adapter + '.' + instance + '.connected', {
                type: 'state',
                name: adapter + '.' + instance + '.connected',
                parent: 'system.adapter.' + adapter + '.' + instance,
                common: {
                    type: 'bool',
                    role: 'indicator.state'
                },
                native: {}
            }, isFinished);

            if (obj.common.messagebox) {
                waitFor++;
                objects.setObject('system.adapter.' + adapter + '.' + instance + '.messagebox', {
                    type: 'state',
                    name: adapter + '.' + instance + '.messagebox',
                    parent: 'system.adapter.' + adapter + '.' + instance,
                    common: {
                        type: 'bool',
                        role: 'adapter.messagebox'
                    },
                    native: {}
                }, isFinished);
            }

            if (obj.common.wakeup) {
                waitFor++;
                objects.setObject('system.adapter.' + adapter + '.' + instance + '.wakeup', {
                    type: 'state',
                    name: adapter + '.' + instance + '.wakeup',
                    parent: 'system.adapter.' + adapter + '.' + instance,
                    common: {
                        type: 'bool',
                        role: 'adapter.wakeup'
                    },
                    native: {}
                }, isFinished);
            }

            if (obj.common.run) {
                waitFor++;
                objects.setObject('system.adapter.' + adapter + '.' + instance + '.run', {
                    type: 'state',
                    name: adapter + '.' + instance + '.run',
                    parent: 'system.adapter.' + adapter + '.' + instance,
                    common: {
                        type: 'bool',
                        role: 'adapter.run'
                    },
                    native: {}
                }, isFinished);
            }

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
                var _obj = adapterConf.instanceObjects.pop();
                waitFor++;
                objects.setObject("system.adapter." + adapter + '.' + instance + '.' + _obj._id, _obj, isFinished);
            }

            if (adapterConf.instanceObjects && adapterConf.instanceObjects.length > 0) {
                for (var i = 0, l = adapterConf.instanceObjects.length; i < l; i++) {
                    var _obj_ = adapterConf.instanceObjects[i];
                    _obj_._id = adapter + '.' + instance + '.' + _obj_._id;
                    console.log('object ' + _obj_._id + ' created');
                    waitFor++;
                    objects.setObject(_obj_._id, _obj_, isFinished);
                }
            }

        });

    });
}

function updateRepo() {

    var result = {};

    console.log('loading system.adapter.*');
    objects.getObjectView('system', 'adapter', {}, function (err, res) {
        for (var i = 0; i < res.total_rows; i++) {
            result[res.rows[i].key] = res.rows[i].value;
        }

        console.log('loading conf/sources.json');
        var sources = {};
        try {
            sources = JSON.parse(fs.readFileSync(__dirname + '/conf/sources.json'));
        } catch (e) {
            console.log(e);
            process.exit(1);
            return;
        }
        try {
            console.log('loading conf/sources-dist.json');
            var sourcesDist = JSON.parse(fs.readFileSync(__dirname + '/conf/sources-dist.json'));
            sources = extend(sourcesDist, sources);
        } catch (e) {

        }

        var downloads = [];

        for (var name in sources) {
            downloads.push({name: name, url: sources[name].meta});
        }



        function download() {
            if (downloads.length < 1) {
                for (var name in result) {
                    console.log(name + ' ' + result[name].common.title + ' installed=' + result[name].common.installedVersion + ' available=' + result[name].common.version);
                }
            } else {
                var elem = downloads.pop();
                console.log('http GET ' + elem.url);
                request(elem.url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log('http 200 ' + elem.url);
                        var _body = JSON.parse(body);
                        if (!result[elem.name]) {
                            _body.type = 'adapter';
                            delete _body.objects;
                            objects.setObject('system.adapter.' + _body.common.name, _body, function (err, res) {
                                console.log('object ' + res.id + ' created');
                                result[elem.name] = _body;
                                download();
                            });

                        } else {
                            result[elem.name] = extend(true, result[elem.name], _body);
                            download();
                        }

                    } else {
                        console.log('http ' + response.statusCode + ' ' + elem.url);
                        download();
                    }
                });
            }

        }

        download();

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
                var tools = require(__dirname + '/lib/tools.js');
                var fs    = require('fs');
                var count = 0;

                for (var i = 0; i < doc.rows.length; i++) {
                    var adapterConf = doc.rows[i].value;
                    objects.delObject(adapterConf._id);
                    count++;

                    // Delete files from web adapters
                    if (fs.existsSync(__dirname + '/adapter/' + adapter + "/web/") && adapterConf.common.webservers) {
                        if (typeof adapterConf.common.webservers == "string") adapterConf.common.webservers = [adapterConf.common.webservers];
                        for (var j = 0; j < adapterConf.common.webservers.length; j++) {
                            if (fs.existsSync(__dirname + '/adapter/' + adapterConf.common.webservers[j] + '/' + adapter + '/')) {
                                // Delete files from adapter/<name>/web to adapter/<webName>/
                                console.log('delete ' + __dirname + '/adapter/' + adapterConf.common.webservers[j] + '/' + adapter + '/');
                                tools.rmdirRecursiveSync(__dirname + '/adapter/' + adapterConf.common.webservers[j] + '/' + adapter + '/');
                            }
                        }
                    }

                    // Delete adapter folder
                    if (!adapterConf.common.noRepository) {
                        console.log('delete ' + __dirname + '/adapter/' + adapter);
                        tools.rmdirRecursiveSync(__dirname + '/adapter/' + adapter);
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

function correctChildren(err, obj) {
    if (!err && obj && obj.children) {
        var pos = obj.children.indexOf(name);
        if (pos != -1) {
            obj.children.splice(pos, 1);
            objects.extendObject(obj._id, {children: obj.children});
        }
    }
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
                        // Remove id from the adapter children
                        objects.getObject("system.adapter." + adapter, correctChildren);
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
                    dontDelete: true,
                    enabled:    true
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
