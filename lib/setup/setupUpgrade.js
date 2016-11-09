function Upgrade(options) {
    var fs     = require('fs');
    var tools  = require(__dirname + '/../tools.js');

    var that = this;

    options = options || {};

    if (!options.objects)           throw 'Invalid arguments: objects is missing';
    if (!options.processExit)       throw 'Invalid arguments: processExit is missing';
    if (!options.installNpm)        throw 'Invalid arguments: installNpm is missing';
    if (!options.restartController) throw 'Invalid arguments: restartController is missing';
    if (!options.getRepository)     throw 'Invalid arguments: getRepository is missing';

    var objects           = options.objects;
    var processExit       = options.processExit;
    var installNpm        = options.installNpm;
    var restartController = options.restartController;
    var getRepository     = options.getRepository;
    var semver;

    var Upload = require(__dirname + '/setupUpload.js');
    var upload = new Upload(options);

    var Install = require(__dirname + '/setupInstall.js');
    var install = new Install(options);

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
                return a[2] <= b[2];
            }
        } else {
            return true;
        }
    }

    this.upgradeAdapterHelper = function (repoUrl, list, i, forceDowngrade, callback) {
        that.upgradeAdapter(repoUrl, list[i], forceDowngrade, function () {
            i++;
            while (repoUrl[list[i]] && repoUrl[list[i]].controller) {
                i++;
            }

            if (list[i]) {
                that.upgradeAdapterHelper(repoUrl, list, i, forceDowngrade, callback);
            } else if (callback) {
                callback();
            }
        });
    };

    function checkDependencies(dependencies) {
        if (!dependencies) return '';
        // like [{"js-controller": ">=0.10.1"}]
        var adapters;
        if (dependencies instanceof Array) {
            adapters = {};
            for (var a = 0; a < dependencies.length; a++) {
                if (typeof dependencies[a] === 'string') continue;
                for (var b in dependencies[a]) adapters[b] = dependencies[a][b];
            }
        } else {
            adapters = dependencies;
        }

        for (var adapter in adapters) {
            var adapterDir = tools.getAdapterDir(adapter);
            var iopack;
            if (!semver) semver = require('semver');
            if (adapter === 'js-controller') {
                try {
                    iopack = JSON.parse(fs.readFileSync(__dirname + '/../../io-package.json'));
                } catch (e) {
                    return 'Cannot find io-package.json in "' + __dirname + '/../../": ' + e;
                }
                if (!iopack || !iopack.common || !iopack.common.version) return 'No version of "js-controller"';
                if (!semver.satisfies(iopack.common.version, adapters[adapter])) return 'Invalid version of js-controler. Required ' + adapters[adapter];
            } else {
                try {
                    iopack = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json'));
                } catch (e) {
                    return 'Cannot find io-package.json in "' + adapterDir + '": ' + e;
                }
                
                if (!iopack || !iopack.common || !iopack.common.version) return 'No version of "' + adapter + '"';
                if (!semver.satisfies(iopack.common.version, adapters[adapter])) return 'Invalid version of "' + adapter + '"';
            }
        }
        return '';
    }

    this.upgradeAdapter = function (repoUrl, adapter, forceDowngrade, callback) {
        if (!repoUrl || typeof repoUrl !== 'object') {
            getRepository(repoUrl, function (sources) {
                that.upgradeAdapter(sources, adapter, forceDowngrade, callback);
            });
            return;
        }

        function finishUpgrade(name, iopack, callback) {
            if (!iopack) {
                var adapterDir = tools.getAdapterDir(name);
                try {
                    iopack = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json'));
                } catch (e) {
                    console.error('Cannot find io-package.json in ' + adapterDir);
                    processExit(10);
                }
            }

            var count = 0;
            installNpm(name, function (_name) {
                // Upload www and admin files of adapter into CouchDB
                count++;
                upload.uploadAdapter(name, false, true, function () {
                    // extend all adapter instance default configs with current config
                    // (introduce potentially new attributes while keeping current settings)
                    upload.upgradeAdapterObjects(name, iopack, function () {
                        count--;
                        if (!count) {
                            console.log('Adapter "' + name + '" updated');
                            if (callback) callback(name);
                        }
                    });
                });
                count++;
                upload.uploadAdapter(name, true, true, function () {
                    count--;
                    if (!count) {
                        console.log('Adapter "' + name + '" updated');
                        if (callback) callback(name);
                    }
                });
            });
        }

        var sources = repoUrl;
        var version;
        if (adapter.indexOf('@') !== -1) {
            var parts = adapter.split('@');
            adapter = parts[0];
            version = parts[1];
        } else {
            version = '';
        }
        if (version) forceDowngrade = true;

        var adapterDir = tools.getAdapterDir(adapter);

        // Read actual description of installed adapter with version
        if (!version && !fs.existsSync(adapterDir + '/io-package.json')) {
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
            if (!forceDowngrade) {
                var error = checkDependencies(repoUrl[adapter].dependencies);
                if (error) {
                    console.error(error);
                    if (callback) callback();
                    return;
                }
            }
            
            if (!forceDowngrade && (repoUrl[adapter].version === ioInstalled.common.version ||
                upToDate(repoUrl[adapter].version, ioInstalled.common.version))) {
                console.log('Adapter "' + adapter + '"' + ((adapter.length < 15) ? new Array(15 - adapter.length).join(' '): '') + ' is up to date.');
                if (callback) callback();
            } else {
                // Get the adapter from web site
                install.downloadPacket(sources, adapter + '@' + version, false, function (name, ioPack) {
                    finishUpgrade(name, ioPack, callback);
                });
            }
        } else if (repoUrl[adapter].meta) {
            // Read repository from url or file
            tools.getJson(repoUrl[adapter].meta, function (iopack) {
                if (!iopack) {
                    console.error('Cannot parse file' + repoUrl[adapter].meta);
                    if (callback) callback();
                    return;
                }

                if (!forceDowngrade) {
                    var error = checkDependencies(iopack.common ? iopack.common.dependencies : null);
                    if (error) {
                        console.error(error);
                        if (callback) callback();
                        return;
                    }
                }

                if (!version && (iopack.common.version === ioInstalled.common.version ||
                    (!forceDowngrade && upToDate(iopack.common.version, ioInstalled.common.version)))) {
                    console.log('Adapter "' + adapter + '"' + ((adapter.length < 15) ? new Array(15 - adapter.length).join(' '): '') + ' is up to date.');
                    if (callback) callback();
                } else {
                    // Get the adapter from web site
                    install.downloadPacket(sources, adapter + '@' + version, false, function (name, ioPack) {
                        finishUpgrade(name, ioPack, callback);
                    });
                }
            });
        } else {
            if (forceDowngrade) {
                console.warn('Unable to get version for "' + adapter + '". Update anyway.');
                // Get the adapter from web site
                install.downloadPacket(sources,  + '@' + version, false, function (name, ioPack) {
                    finishUpgrade(name, ioPack, callback);
                });
            } else {
                console.error('Unable to get version for "' + adapter + '".');
                if (callback) callback();
            }
        }
    };

    this.upgradeController = function (repoUrl, forceDowngrade, callback) {
        if (!repoUrl || typeof repoUrl !== 'object') {
            getRepository(repoUrl, function (sources) {
                if (!sources) {
                    console.warn('Cannot get repository under "' + repoUrl + '"');
                    if (callback) callback();
                } else {
                    that.upgradeController(sources, forceDowngrade, callback);
                }
            });
            return;
        }

        var hostname = tools.getHostName();
        var installed = JSON.parse(fs.readFileSync(__dirname + '/../../io-package.json'));
        if (!installed || !installed.common || !installed.common.version) {
            console.error('Host "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is not installed.');
            if (callback) callback();
            return;
        }
        if (!repoUrl[installed.common.name]) {
            // no info for controller
            console.error('Cannot find this controller "' + installed.common.name + '" in repository.');

            if (callback) callback();
            return;
        }

        if (repoUrl[installed.common.name].version) {
            if (!forceDowngrade && (repoUrl[installed.common.name].version === installed.common.version ||
                upToDate(repoUrl[installed.common.name].version, installed.common.version))) {
                console.log('Host    "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is up to date.');
                if (callback) callback();
            } else {
                // Get the controller from web site
                install.downloadPacket(repoUrl, installed.common.name, true, function (name) {
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
                    console.warn('Cannot read version. Write "' + tools.appName + ' upgrade self --force" to upgrade controller anyway.');
                    if (callback) callback();
                    return;
                }

                if ((ioPack && ioPack.common && ioPack.common.version === installed.common.version) ||
                    (!forceDowngrade && ioPack && ioPack.common && upToDate(ioPack.common.version, installed.common.version))) {
                    console.log('Host    "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is up to date.');
                    if (callback) callback();
                } else {
                    // Get the controller from web site
                    install.downloadPacket(repoUrl, (ioPack && ioPack.common && ioPack.common.name) ? ioPack.common.name : installed.common.name, true, function (name) {
                        installNpm(function (_name) {
                            setChmod(function () {
                                restartController(callback);
                            });
                        });
                    });
                }

            });
        }
    };

    function setChmod(callback) {
        var platform = require('os').platform();
        console.log('Host "' + tools.getHostName() + '" (' + platform + ') updated');
        // Call command chmod +x __dirname if under linux or darwin
        if (platform === 'linux' || platform === 'darwin') {
            var exec = require('child_process').exec;
            var dir;
            if (__dirname.toLowerCase().replace(/\\/g, '/').indexOf('node_modules/' + tools.appName + '.js-controller') !== -1) {
                dir = require('path').normalize(__dirname + '/../../../..').replace(/\\/g, '/');
            } else {
                dir = require('path').normalize(__dirname + '/../..').replace(/\\/g, '/');
            }

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


}

module.exports = Upgrade;
