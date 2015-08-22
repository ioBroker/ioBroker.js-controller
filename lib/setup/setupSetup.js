function Setup(options) {
    var fs = require('fs');
    var tools = require(__dirname + '/../tools.js');

    options = options || {};

    var processExit       = options.processExit;
    var dbConnect         = options.dbConnect;
    var yargs             = options.yargs;
    var password;
    var objects;

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
    }

    function setupReady(callback) {
        if (!callback) {
            console.log('database setup done. you can add adapters and start iobroker now');
            processExit(0);
        } else {
            callback();
        }
    }

    function getMac(callback) {
        var macRegex  = /(?:[a-z0-9]{2}[:\-]){5}[a-z0-9]{2}/ig;
        var zeroRegex = /(?:[0]{2}[:\-]){5}[0]{2}/;
        var command   = (process.platform.indexOf('win') === 0) ? "getmac" : "ifconfig || ip link";

        require('child_process').exec(command, function(err, stdout, stderr) {
            if (err) {
                callback(err);
            } else {
                var macAddress;
                var match;
                var result = null;

                while (match = macRegex.exec(stdout)) {
                    macAddress = match[0];
                    if (!zeroRegex.test(macAddress) && !result) result = macAddress;
                }

                if (result === null) {
                    callback(new Error('could not determine the mac address from:\n' + stdout));
                } else {
                    callback(null, result.replace(/-/g, ':').toLowerCase());
                }
            }
        });
    }

    // Build unique uuid based on MAC address if possible
    function uuid(givenMac, callback) {
        if (typeof givenMac == 'function') {
            callback = givenMac;
            givenMac = '';
        }

        var mac = (givenMac !== null) ? (givenMac || '') : null;
        var u;

        if (mac === '') {
            var ifaces = require('os').networkInterfaces();

            // Find first not empty MAC
            for (var n in ifaces) {
                for (var c = 0; c < ifaces[n].length; c++) {
                    if (ifaces[n][c].mac && ifaces[n][c].mac != '00:00:00:00:00:00') {
                        mac = ifaces[n][c].mac;
                        break;
                    }
                }
                if (mac) break;
            }
        }

        if (mac === '') {
            getMac(function(err, mac) {
                uuid(mac || null, callback);
            });
            return;
        }

        if (mac) {
            var md5sum = require('crypto').createHash('md5');
            md5sum.update(mac);
            mac = md5sum.digest('hex');
            u = mac.substring(0, 8) + '-' + mac.substring(8, 12) + '-' + mac.substring(12, 16) + '-' + mac.substring(16, 20) + '-' + mac.substring(20);
        } else {
            // Returns a RFC4122 compliant v4 UUID https://gist.github.com/LeverOne/1308368 (DO WTF YOU WANT TO PUBLIC LICENSE)
            var a;
            var b;
            b = a = '';
            while (a++ < 36) {
                b += ((a * 51) & 52) ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '-';
            }
            u = b;
        }

        callback(u);
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
                                uuid(function(res) {
                                    objects.setObject('system.meta.uuid', {
                                        type: 'meta',
                                        common: {
                                            name: 'uuid',
                                            type: 'uuid'
                                        },
                                        native: {
                                            uuid: res
                                        }
                                    }, function () {
                                        console.log('object system.meta.uuid created');
                                        if (!(--tasks)) setupReady(callback);
                                    });
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

    function setupObjects(callback) {
        dbConnect(function (_objects, _states) {
            objects = _objects;
            var iopkg = JSON.parse(fs.readFileSync(__dirname + '/../../io-package.json'));
            dbSetup(iopkg, callback);
        });
    }

    this.setup = function (callback, ignoreIfExist) {
        password = require(__dirname + '/../password');

        var config;
        var isCreated = false;
        var platform = require('os').platform();
        var otherInstallDirs = [];

        // Delete files for other OS
        if (platform.match(/^win/)) {
            otherInstallDirs.push(__dirname + '/../../iobroker');
        } else {
            otherInstallDirs.push(__dirname + '/../../_service_ioBroker.bat');
            otherInstallDirs.push(__dirname + '/../../iobroker.bat');
        }

        for (var t = 0; t < otherInstallDirs.length; t++) {
            if (fs.existsSync(otherInstallDirs[t])) {
                var stat = fs.statSync(otherInstallDirs[t]);
                if (stat.isDirectory()) {
                    var files = fs.readdirSync(otherInstallDirs[t]);
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
        if (!fs.existsSync(__dirname + '/../../tmp')) fs.mkdirSync(__dirname + '/../../tmp');

        if (!fs.existsSync(tools.getConfigFileName())) {
            isCreated = true;
            config = require(__dirname + '/../../conf/iobroker-dist.json');
            console.log('creating conf/iobroker.json');
            config.objects.host = yargs.argv.objects || '127.0.0.1';
            config.states.host  = yargs.argv.states  || '127.0.0.1';
            config.dataDir      = tools.getDefaultDataDir();
            mkpathSync(__dirname + '/../', '../' + config.dataDir);
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

                    if (!fs.existsSync(__dirname + '/../../' + path + '/log')) fs.mkdirSync(__dirname + '/../../' + path + '/log');
                } else {
                    if (!fs.existsSync(__dirname + '/../../log')) fs.mkdirSync(__dirname + '/../../log');
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


}

module.exports = Setup;
