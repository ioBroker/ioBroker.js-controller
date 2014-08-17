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
        '$0 upgrade <adapter>' +
        '$0 state get <id>' +
        '$0 state getplain <id>' +
        '$0 state set <id> <value>' +
        '$0 state setplain <id> <value>')
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
var request;
var extend;
var mime;

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
    case "install":
        fs =            require('fs');
        tools =         require(__dirname + '/lib/tools.js');
        ObjectsCouch =  require(__dirname + '/lib/couch.js');
        mime =          require('mime');
        fs  =           require('fs');
        ncp =           require('ncp').ncp;
        ncp.limit =     16;

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

    case "upload":
        fs =            require('fs');
        mime =          require('mime');
        tools =         require(__dirname + '/lib/tools.js');
        ObjectsCouch =  require(__dirname + '/lib/couch.js');
        var name =      yargs.argv._[1];
        dbConnect(function () {
            uploadAdapter(name, true, function () {
                uploadAdapter(name, false, function () {

                });
            });
        });
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

function uploadAdapter(adapter, isAdmin, callback) {
    var id = adapter + (isAdmin ? '.admin' : '');
    var rev;
    var dir = __dirname + '/adapter/' + adapter + (isAdmin ? '/admin' : '/www');
    var files = [];

    // do not upload www dir of admin adapter
    if (adapter === 'admin' && !isAdmin) return;

    function done(err, res) {
        if (err) {
            callback();
        } else {
            console.log('got ' + dir);
            files = res;
            upload(adapter, isAdmin, callback);
        }
    }

    objects.getObject(id, function (err, res) {
        if (err || !res) {
            objects.setObject(id, {
                type: 'meta',
                name: id.split('.').pop(),
                parent: 'system.adapter.' + adapter,
                common: {
                    type: isAdmin ? 'admin' : 'www'
                },
                native: {}
            }, function (err, res) {
                rev = res.rev;
                walk(dir, done);

            });
        } else {
            rev = res._rev;
            walk(dir, done);
        }
    });

    function upload(adapter) {
        var file;
        if (!files.length) {
            if (typeof callback === 'function') callback();
        } else {
            file = files.pop();
            var mimeType = mime.lookup(file);
            var attName = file.split('/adapter/');
            attName = attName[1];
            attName = attName.split('/').slice(2).join('/');
            console.log('upload', id, file, attName, mimeType);

            fs.createReadStream(file).pipe(
                objects.insert(id, attName, null, mimeType, {
                    rev: rev
                }, function (err, res) {
                    if (err) {
                        console.log(err);
                        if (typeof callback === 'function') callback();
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

/* @bluefox see below
    function copyFiles(source, dest) {
        console.log('copying ' + source + ' to ' + dest);
        ncp(source, dest, function (err) {
            if (err) {
                console.log('ncp error: ' + err);
                return;
            }
        });
    }
*/

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
        /* TODO @Bluefox - please go another way: the web adapter has to serve the files from couch or directly from the adapter/.../www/ dir

        if (fs.existsSync(__dirname + '/adapter/' + adapter + '/web/') && adapterConf.common.webservers) {
            if (typeof adapterConf.common.webservers == "string") adapterConf.common.webservers = [adapterConf.common.webservers];
            for (var i = 0; i < adapterConf.common.webservers.length; i++) {
                if (fs.existsSync(__dirname + '/adapter/' + adapterConf.common.webservers[i] + '/')) {
                    // Copy files from adapter/<name>/web to adapter/<webName>/
                    copyFiles(__dirname + '/adapter/' + adapter + '/web/', __dirname + '/adapter/' + adapterConf.common.webservers[i] + '/' + adapter + '/');
                }
            }
        }*/

    }

    if (fs.existsSync(__dirname + '/adapter/' + adapter + '/package.json') && !fs.existsSync(__dirname + '/adapter/' + adapter + '/node_modules')) {
        // Install node modules
        var exec = require('child_process').exec;
        var cmd = 'npm install "' + __dirname + '/adapter/' + adapter + '" --prefix "' + __dirname + '/adapter/' + adapter + '"';
        console.log(cmd);
        var child = exec(cmd);
        child.stderr.pipe(process.stderr);
        child.on('exit', function () {
            uploadAdapter(name, true, function () {
                uploadAdapter(name, false, function () {
                    install();
                });
            });
        });
    } else {
        uploadAdapter(name, true, function () {
            uploadAdapter(name, false, function () {
                install();
            });
        });
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
            var instanceObj = doc;
            instanceObj._id    = 'system.adapter.' + adapter + '.' + instance;
            instanceObj.type   = 'instance';
            instanceObj.parent = 'system.adapter.' + adapter;
            instanceObj.children = [];
            delete instanceObj._rev;
            instanceObj.common.enabled = enabled || false;
            instanceObj.common.host    = host;

            var objs = [
                {
                    _id: 'system.adapter.' + adapter + '.' + instance + '.alive',
                    type: 'state',
                    name: adapter + '.' + instance + '.alive',
                    parent: 'system.adapter.' + adapter + '.' + instance,
                    common: {
                        type: 'bool',
                        role: 'indicator.state'
                    },
                    native: {}
                },
                {
                    _id: 'system.adapter.' + adapter + '.' + instance + '.connected',
                    type: 'state',
                    name: adapter + '.' + instance + '.connected',
                    parent: 'system.adapter.' + adapter + '.' + instance,
                    common: {
                        type: 'bool',
                        role: 'indicator.state'
                    },
                    native: {}
                }
            ];

            if (instanceObj.common.messagebox) {
               objs.push({
                    _id: 'system.adapter.' + adapter + '.' + instance + '.messagebox',
                    type: 'state',
                    name: adapter + '.' + instance + '.messagebox',
                    parent: 'system.adapter.' + adapter + '.' + instance,
                    common: {
                        type: 'bool',
                        role: 'adapter.messagebox'
                    },
                    native: {}
                });
            }
            if (instanceObj.common.wakeup) {
                objs.push({
                    id: 'system.adapter.' + adapter + '.' + instance + '.wakeup',
                    type: 'state',
                    name: adapter + '.' + instance + '.wakeup',
                    parent: 'system.adapter.' + adapter + '.' + instance,
                    common: {
                        type: 'bool',
                        role: 'adapter.wakeup'
                    },
                    native: {}
                });
            }
            if (instanceObj.common.run) {
                objs.push({
                    _id: 'system.adapter.' + adapter + '.' + instance + '.run',
                    type: 'state',
                    name: adapter + '.' + instance + '.run',
                    parent: 'system.adapter.' + adapter + '.' + instance,
                    common: {
                        type: 'bool',
                        role: 'adapter.run'
                    },
                    native: {}
                });
            }

            if (!adapterConf) {
                try {
                    adapterConf = JSON.parse(fs.readFileSync(__dirname + '/adapter/' + adapter + '/io-package.json').toString());
                } catch (e) {
                    console.log('error: reading io-package.json ' + e);
                    process.exit(1);
                }
            }

            if (!adapterConf.instanceObjects) adapterConf.instanceObjects = [];
            if (!adapterConf.objects) adapterConf.objects = [];

            // Create only for this instance the predefined in io-package.json objects
            // It is not necessary to write "system.adapter.name.N." in the object '_id'
            for (var i = 0; i < adapterConf.instanceObjects.length; i++) {
                adapterConf.instanceObjects[i]._id = adapter + '.' + instance + '.' + adapterConf.instanceObjects[i]._id;
                adapterConf.instanceObjects[i].parent = adapter + '.' + instance + '.' + adapterConf.instanceObjects[i].parent;
                objs.push(adapterConf.instanceObjects[i]);
            }

            if (adapterConf.objects && adapterConf.objects.length > 0) {
                for (var i = 0, l = adapterConf.objects.length; i < l; i++) {
                    objs.push(adapterConf.objects[i]);
                }
            }


            function setObjs() {
                if (objs.length > 0) {
                    var obj = objs.pop();
                    if (obj.parent === instanceObj._id) instanceObj.children.push(obj._id);
                    objects.setObject(obj._id, obj, function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('object ' + obj._id + ' created');
                        }
                        setObjs();
                    });
                } else {
                    objects.setObject(instanceObj._id, instanceObj, function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('object ' + instanceObj._id + ' created');
                        }

                        // done
                        process.exit(0);

                    });
                }
            }

            setObjs();
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
                                console.log('object ' + res.id + ' created dl');
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
