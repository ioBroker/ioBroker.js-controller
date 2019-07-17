'use strict';

function Setup(options) {
    const fs    = require('fs');
    const path  = require('path');
    const tools = require(__dirname + '/../tools.js');

    options = options || {};

    const processExit       = options.processExit;
    const dbConnect         = options.dbConnect;
    const params            = options.params;
    let password;
    let objects;

    function mkpathSync(rootpath, dirpath) {
        // Remove filename
        dirpath = dirpath.split('/');
        dirpath.pop();
        if (!dirpath.length) return;

        for (let i = 0; i < dirpath.length; i++) {
            rootpath += dirpath[i] + '/';
            if (!fs.existsSync(rootpath)) {
                if (dirpath[i] !== '..') {
                    fs.mkdirSync(rootpath);
                } else {
                    throw 'Cannot create ' + rootpath + dirpath.join('/');
                }
            }
        }
    }

    function setupReady(callback) {
        if (!callback) {
            console.log('database setup done. you can add adapters and start ' + tools.appName + ' now');
            processExit(0);
        } else {
            callback();
        }
    }

    function dbSetup(iopkg, callback) {
        if (iopkg.objects && iopkg.objects.length > 0) {
            const obj = iopkg.objects.pop();
            objects.getObject(obj._id, (err, _obj) => {
                if (err || !_obj) {
                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = Date.now();
                    objects.setObject(obj._id, obj, () => {
                        console.log('object ' + obj._id + ' created');
                        setTimeout(dbSetup, 25, iopkg, callback);
                    });
                } else {
                    console.log('object ' + obj._id + ' yet exists');
                    setTimeout(dbSetup, 25, iopkg, callback);
                }
            });
        } else {
            tools.createUuid(objects, () => {
                // check if encrypt secret exists
                objects.getObject('system.config', (err, obj) => {
                    if (obj && (!obj.native || !obj.native.secret)) {
                        require('crypto').randomBytes(24, (ex, buf) => {
                            obj.native = obj.native || {};
                            obj.native.secret =  buf.toString('hex');
                            obj.from = 'system.host.' + tools.getHostName() + '.cli';
                            obj.ts = Date.now();
                            objects.setObject('system.config', obj, () => setupReady(callback));
                        });
                    } else {
                        setupReady(callback);
                    }
                });
            });
        }
    }

    function setupObjects(callback, checkCertificateOnly) {
        dbConnect(params, (_objects, _states) => {
            objects = _objects;
            const iopkg = JSON.parse(fs.readFileSync(__dirname + '/../../io-package.json', 'utf8'));
            if (checkCertificateOnly) {
                let certObj;
                if (iopkg && iopkg.objects) {
                    for (let i = 0; i < iopkg.objects.length; i++) {
                        if (iopkg.objects[i] && iopkg.objects[i]._id === 'system.certificates') {
                            certObj = iopkg.objects[i];
                            break;
                        }
                    }
                }
                if (certObj) {
                    objects.getObject('system.certificates', (err, obj) => {
                        if (obj && obj.native && obj.native.certificates) {
                            if (obj.native.certificates.defaultPrivate.replace(/(\r\n|\n|\r)/gm, '').indexOf("MIICXQIBAAKBgQDFNHQmcPu5y9ngID3YUCr2NUY/eBceEKdFcEwgZBjp1DM52d/9JYFSrQGHQMvLopG5uiQXVip0mR95rZxaF0mo5wdTAhM1pcxThGeCghZVm9PoLbrakvl9+gSHoYbNVxfv9fi0cPYc7CbeiluhWWS0hm1VpWPM8PX6rkdz5r9OIwIDAQABAoGBAJVSWoChHHpa+ObUgv+/9Efpnv+AF0EUqxPRLFN6d8LWgtNTPl+YfovzpCydy7KtrlpLr/hbrloLd+HSq4ksCQEfJ7Le/4fjc2lt3Ib/K9qSr3bnmIWAK00VU+fFmN1NTFJTV0O2+ctCOY9ZRwue5ehTp9eqPjsGwdeldii1WbSBAkEA6Z0YjMg+04z1M8FEUWSdPf6AHWB45hDJ+qPuIDNZxvVOcEsTyRsfkb1PKZm2NDx6mBN16po13VkaQPy35ApoOwJBANgaMdbig76A1tvyhtklJPTU0g0N7CzXy+PNu8B3YghY8dYF/gSvcBr0d8xGaZEczGQ35C0Tb9gTadHL64kxuzkCQHYaQYsKwRhaLqxXjJ5Ja2UoAMTZPMWyvynDLmOBEmYPJfSHQB1vZOpc9mRlnUOTP7caP4a3J3wby7YHDUBwMnkCQHGx1mbn5chkoKY3gxrboAXvslOL76XoIy1HIHCyXrFlmlav8GUmqCSGWkDvCrt+G0re3P2aLE3SaOooD1OvBoECQQDXMxPNYVGIErO7hxp9T9BXKcbnQV/mNhJYdl9VUoVBgcVGatR1dBZX31Yt+HY4/ym9YdQ8MGCg2Kfmm0haLakP") !== -1) {
                                obj.native.certificates.defaultPrivate = certObj.native.certificates.defaultPrivate;
                                obj.native.certificates.defaultPublic = certObj.native.certificates.defaultPublic;
                                objects.setObject(obj._id, obj, () => {
                                    console.log('object ' + obj._id + ' updated');
                                    callback && callback();
                                });
                                return;
                            }
                        }
                        callback && callback();
                    });
                }
                else {
                    callback && callback();
                }
            }
            else {
                dbSetup(iopkg, callback);
            }
        });
    }

    this.setup = function (callback, ignoreIfExist, useRedis) {
        password = require(__dirname + '/../password');

        let config;
        let isCreated = false;
        const platform = require('os').platform();
        const otherInstallDirs = [];

        // copy reinstall.js file into root 
        if (fs.existsSync(__dirname + '/../../../../node_modules/')) {
            try {
                if (fs.existsSync(__dirname + '/../../reinstall.js')) {
                    fs.writeFileSync(__dirname + '/../../../../reinstall.js', fs.readFileSync(__dirname + '/../../reinstall.js'));
                }
            } catch (e) {
                console.warn('Cannot write file. Not critical: ' + e);
            }
        }
        // Delete files for other OS
        if (platform.match(/^win/)) {
            otherInstallDirs.push(__dirname + '/../../' + tools.appName);
            otherInstallDirs.push(__dirname + '/../../killall.sh');
            otherInstallDirs.push(__dirname + '/../../reinstall.sh');
        } else {
            otherInstallDirs.push(__dirname + '/../../_service_' + tools.appName + '.bat');
            otherInstallDirs.push(__dirname + '/../../' + tools.appName + '.bat');
            // copy scripts to root directory
            if (fs.existsSync(__dirname + '/../../../../node_modules/')) {
                const startFile = `#!/usr/bin/env node
require('${path.normalize(__dirname + '/..')}/setup').execute();`;
                try {
                    if (fs.existsSync(__dirname + '/../../killall.sh')) {
                        fs.writeFileSync(__dirname + '/../../../../killall.sh', fs.readFileSync(__dirname + '/../../killall.sh'));
                    }
                    if (fs.existsSync(__dirname + '/../../reinstall.sh')) {
                        fs.writeFileSync(__dirname + '/../../../../reinstall.sh', fs.readFileSync(__dirname + '/../../reinstall.sh'));
                    }
                    if (!fs.existsSync(__dirname + '/../../../../' + tools.appName.substring(0, 3))) {
                        fs.writeFileSync(__dirname + '/../../../../' + tools.appName.substring(0, 3), startFile, {mode: 492 /* 0754 */});
                    }
                    if (!fs.existsSync(__dirname + '/../../../../' + tools.appName)) {
                        fs.writeFileSync(__dirname + '/../../../../' + tools.appName, startFile, {mode: 492 /* 0754 */});
                    }
                } catch (e) {
                    console.warn('Cannot write file. Not critical: ' + e);
                }
            }
        }

        for (let t = 0; t < otherInstallDirs.length; t++) {
            if (fs.existsSync(otherInstallDirs[t])) {
                const stat = fs.statSync(otherInstallDirs[t]);
                if (stat.isDirectory()) {
                    const files = fs.readdirSync(otherInstallDirs[t]);
                    for (let f = 0; f < files.length; f++) {
                        fs.unlinkSync(otherInstallDirs[t] + '/' + files[f]);
                    }
                    fs.rmdirSync(otherInstallDirs[t]);
                } else {
                    try {
                        fs.unlinkSync(otherInstallDirs[t]);
                    }
                    catch(e) {
                        console.warn('Cannot delete file. Not critical: ' + e);
                    }
                }
            }
        }

        // Create log and tmp directory
        if (!fs.existsSync(__dirname + '/../../tmp')) fs.mkdirSync(__dirname + '/../../tmp');

        if (!fs.existsSync(tools.getConfigFileName())) {
            isCreated = true;
            if (fs.existsSync(__dirname + '/../../conf/' + tools.appName + '-dist.json')) {
                config = require(__dirname + '/../../conf/' + tools.appName + '-dist.json');
            } else {
                config = require(__dirname + '/../../conf/' + tools.appName.toLowerCase() + '-dist.json');
            }
            console.log('creating conf/' + tools.appName + '.json');
            config.objects.host = params.objects || '127.0.0.1';
            config.states.host  = params.states  || '127.0.0.1';
            if (useRedis) {
                config.states.type = 'redis';
                config.states.port = 6379;
            }

            // this path is relative to iobroker.js-controller
            config.dataDir      = tools.getDefaultDataDir();
            if (fs.existsSync(__dirname + '/../../../node_modules/' + tools.appName + '.js-controller')) {
                mkpathSync(__dirname + '/../', config.dataDir);
            } else {
                mkpathSync(__dirname + '/../', '../' + config.dataDir);
            }

            // Create default data dir
            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(config, null, 2));

            try {
                // Create
                if (__dirname.toLowerCase().replace(/\\/g, '/').indexOf('node_modules/' + tools.appName + '.js-controller') !== -1) {
                    const parts = config.dataDir.split('/');
                    // Remove appName-data/
                    parts.pop();
                    parts.pop();
                    const path_ = parts.join('/');

                    if (!fs.existsSync(__dirname + '/../../' + path_ + '/log')) fs.mkdirSync(__dirname + '/../../' + path_ + '/log');
                } else {
                    if (!fs.existsSync(__dirname + '/../../log')) fs.mkdirSync(__dirname + '/../../log');
                }
            } catch (e) {
                console.log('Non-critical error: ' + e.message);
            }
        } else if (ignoreIfExist) {
            setupObjects(() => callback && callback(), true);
            return;
        }
        setupObjects(() => callback && callback(isCreated));
    }
}

module.exports = Setup;
