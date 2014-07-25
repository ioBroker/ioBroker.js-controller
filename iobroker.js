var daemon = require("daemonize2").setup({
    main: "control.js",
    name: "iobroker.ctrl",
    pidfile: "iobroker.pid"
});

var ObjectsCouch;
var objects;
var fs;
var os;
var firstIp;

switch (process.argv[2]) {

    case "start":
        daemon.start();
        break;

    case "stop":
        daemon.stop();
        break;

    case "add":
        var name = process.argv[3];

        ObjectsCouch = require('./modules/couch.js');
        os = require('os');
        fs = require('fs');

        var ifaces = os.networkInterfaces();
        var ipArr = [];
        for (var dev in ifaces) {
            ifaces[dev].forEach(function (details) {
                if (!details.internal) ipArr.push(details.address);
            });
        }
        firstIp = ipArr[0];

        if (!fs.existsSync(__dirname + '/adapter/' + name)) {
            console.log('adapter ' + name + ' not installed');
            downloadAdapter(name, function () {
                dbConnect(function () {
                    createInstance(name);
                });
            });
        } else {
            dbConnect(function () {
                createInstance(name);
            });
        }
        break;

    default:
        console.log("Usage: ");
        console.log("  node iobroker.js start");
        console.log("  node iobroker.js stop");
        console.log("  node iobroker.js add <adapter-name>");
        // Todo console.log("  node iobroker.js add <adapter-url>");
        // Todo iobroker.js update (update controller)
        // Todo iobroker.js update <adapter-name> (update adapter)
        // Todo iobroker.js remove <adapter-name> (delete adapter)

}

function dbConnect(callback) {
    objects = new ObjectsCouch({
        logger: {
            debug: function (msg) { },
            info:  function (msg) { },
            warn:  function (msg) { console.log(msg); },
            error: function (msg) { console.log(msg); }
        },
        connected: function () {
            console.log('couchdb connected');
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
    var repoName = urlParts.pop();
    console.log('repoName ' + repoName);

    var request =   require('request');
    var AdmZip =    require('adm-zip');
    var ncp =       require('ncp').ncp;
    ncp.limit = 16;

    console.log('download ' + url);

    var tmpDir = __dirname + '/tmp/';
    var tmpFile = __dirname + '/tmp/' + name + '.zip';
    request(url).pipe(fs.createWriteStream(tmpFile)).on('close', function () {
        console.log('unzip ' + tmpFile);

        var zip = new AdmZip(tmpFile);
        zip.extractAllTo(__dirname + '/tmp', true);

        var source =        __dirname + '/tmp/' + repoName + '-master',
            destination =   __dirname + '/adapter/' + name;

        console.log('copying ' + source + ' to ' + destination);

        ncp(source, destination, function (err) {
            if (err) {
                console.log('ncp error: ' + err);
                return;
            }

            console.log('delete tmp file ' + tmpFile);
            fs.unlinkSync(tmpFile);
            console.log('delete tmp folder ' + __dirname + '/tmp/' + repoName + '-master');
            deleteFolderRecursive(__dirname + '/tmp/' + repoName + '-master');

            if (typeof callback === 'function') callback(name);

        });
    });

}



function installAdapter(adapter, callback) {
    var fs = require('fs');

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

        adapterConf.common.enabled = false;

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
                objects.setObject(obj._id, obj, function (err, res) {
                    if (err) {
                        console.log('error setObject ' + obj._id + ' ' + err);
                        process.exit(1);
                    } else {
                        console.log('object ' + obj._id + ' created');
                        setObject(callback);
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


function createInstance(adapter, callback) {

    objects.getObject('system.adapter.' + adapter, function (err, doc) {
        if (err || !doc) {
            installAdapter(adapter, function () {
                createInstance(adapter, callback);
            });
            return;
        }
        objects.getObjectView('system', 'instanceStats', { startkey: 'system.adapter.' + adapter + '.', endkey: 'system.adapter.' + adapter + '.\u9999' }, function (err, res) {
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
                obj.common.enabled = false;
                obj.common.host = firstIp;
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

            try {
                var adapterConf = JSON.parse(fs.readFileSync(__dirname + '/adapter/' + adapter + '/io-package.json').toString());
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

var deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + '/' + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

