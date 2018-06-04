'use strict';

function Upgrade(options) {
    const fs     = require('fs');
    const tools  = require(__dirname + '/../tools.js');

    options = options || {};

    if (!options.processExit)       throw 'Invalid arguments: processExit is missing';
    if (!options.installNpm)        throw 'Invalid arguments: installNpm is missing';
    if (!options.restartController) throw 'Invalid arguments: restartController is missing';
    if (!options.getRepository)     throw 'Invalid arguments: getRepository is missing';

    const processExit       = options.processExit;
    const installNpm        = options.installNpm;
    const restartController = options.restartController;
    const getRepository     = options.getRepository;
    const params            = options.params;
    let semver;
    let configData = null;

    const configFile = tools.getConfigFileName();
    const hostname   = tools.getHostName();

    const Upload = require(__dirname + '/setupUpload.js');
    const upload = new Upload(options);

    const Install = require(__dirname + '/setupInstall.js');
    const install = new Install(options);

    this.upgradeAdapterHelper = function (repoUrl, list, i, forceDowngrade, callback) {
        this.upgradeAdapter(repoUrl, list[i], forceDowngrade, () => {
            i++;
            while (repoUrl[list[i]] && repoUrl[list[i]].controller) {
                i++;
            }

            if (list[i]) {
                setImmediate(() => this.upgradeAdapterHelper(repoUrl, list, i, forceDowngrade, callback));
            } else if (callback) {
                callback();
            }
        });
    };

    function checkDependencies(dependencies) {
        if (!dependencies) return '';
        // like [{"js-controller": ">=0.10.1"}]
        let adapters;
        if (dependencies instanceof Array) {
            adapters = {};
            for (let a = 0; a < dependencies.length; a++) {
                if (typeof dependencies[a] === 'string') continue;
                for (const b in dependencies[a]) {
                    if (dependencies[a].hasOwnProperty(b)) {
                        adapters[b] = dependencies[a][b];
                    }
                }
            }
        } else {
            adapters = dependencies;
        }

        for (const adapter in adapters) {
            if (!adapters.hasOwnProperty(adapter)) continue;
            const adapterDir = tools.getAdapterDir(adapter);
            let iopack;
            if (!semver) semver = require('semver');
            if (adapter === 'js-controller') {
                try {
                    iopack = JSON.parse(fs.readFileSync(__dirname + '/../../io-package.json', 'utf8'));
                } catch (e) {
                    return 'Cannot find io-package.json in "' + __dirname + '/../../": ' + e;
                }
                if (!iopack || !iopack.common || !iopack.common.version) return 'No version of "js-controller"';
                if (!semver.satisfies(iopack.common.version, adapters[adapter])) return 'Invalid version of js-controler. Required ' + adapters[adapter];
            } else {
                try {
                    iopack = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json', 'utf8'));
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
            getRepository(repoUrl, params, (err, sources) => {
                if (err) {
                    processExit(err);
                } else {
                    this.upgradeAdapter(sources, adapter, forceDowngrade, callback);
                }
            });
            return;
        }

        function finishUpgrade(name, iopack, callback) {
            if (!iopack) {
                const adapterDir = tools.getAdapterDir(name);
                try {
                    iopack = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json', 'utf8'));
                } catch (e) {
                    console.error('Cannot find io-package.json in ' + adapterDir);
                    processExit(10);
                }
            }

            let count = 0;
            installNpm(name, (err, _name) => {
                if (err) {
                    processExit(err);
                } else {
                    // Upload www and admin files of adapter into CouchDB
                    count++;
                    upload.uploadAdapter(name, false, true, () => {
                        // extend all adapter instance default configs with current config
                        // (introduce potentially new attributes while keeping current settings)
                        upload.upgradeAdapterObjects(name, iopack, () => {
                            count--;
                            if (!count) {
                                console.log('Adapter "' + name + '" updated');
                                if (callback) callback(name);
                            }
                        });
                    });
                    count++;
                    upload.uploadAdapter(name, true, true, () => {
                        count--;
                        if (!count) {
                            console.log(`Adapter "${name}" updated`);
                            if (callback) callback(name);
                        }
                    });
                }
            });
        }

        const sources = repoUrl;
        let version;
        if (adapter.indexOf('@') !== -1) {
            const parts = adapter.split('@');
            adapter = parts[0];
            version = parts[1];
        } else {
            version = '';
        }
        if (version) forceDowngrade = true;

        const adapterDir = tools.getAdapterDir(adapter);

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

        let ioInstalled;
        if (fs.existsSync(adapterDir + '/io-package.json')) {
            ioInstalled = require(adapterDir + '/io-package.json');
        }
        if (!ioInstalled) {
            ioInstalled = {common: {version: '0.0.0'}};
        }

        // If version is included in repository
        if (repoUrl[adapter].version) {
            if (!forceDowngrade) {
                const error = checkDependencies(repoUrl[adapter].dependencies);
                if (error) {
                    console.error(error);
                    if (callback) callback();
                    return;
                }
            }

            if (!forceDowngrade && (repoUrl[adapter].version === ioInstalled.common.version ||
                tools.upToDate(repoUrl[adapter].version, ioInstalled.common.version))) {
                console.log('Adapter "' + adapter + '"' + ((adapter.length < 15) ? new Array(15 - adapter.length).join(' '): '') + ' is up to date.');
                if (callback) callback();
            } else {
                console.log('Update ' +  adapter + ' from @' + ioInstalled.common.version + ' to @' + (version || repoUrl[adapter].version));
                // Get the adapter from web site
                install.downloadPacket(sources, adapter + '@' + (version || repoUrl[adapter].version), null, (name, ioPack) => {
                    finishUpgrade(name, ioPack, callback);
                });
            }
        } else if (repoUrl[adapter].meta) {
            // Read repository from url or file
            tools.getJson(repoUrl[adapter].meta, ioPack => {
                if (!ioPack) {
                    console.error('Cannot parse file' + repoUrl[adapter].meta);
                    if (callback) callback();
                    return;
                }

                if (!forceDowngrade) {
                    const error = checkDependencies(ioPack.common ? ioPack.common.dependencies : null);
                    if (error) {
                        console.error(error);
                        if (callback) callback();
                        return;
                    }
                }

                if (!version && (ioPack.common.version === ioInstalled.common.version ||
                    (!forceDowngrade && tools.upToDate(ioPack.common.version, ioInstalled.common.version)))) {
                    console.log('Adapter "' + adapter + '"' + ((adapter.length < 15) ? new Array(15 - adapter.length).join(' '): '') + ' is up to date.');
                    if (callback) callback();
                } else {
                    // Get the adapter from web site
                    console.log('Update ' +  adapter + ' from @' + ioInstalled.common.version + ' to @' + (version || ioPack.common.version));
                    install.downloadPacket(sources, adapter + '@' + (version || ioPack.common.version), null, (name, ioPack) => {
                        finishUpgrade(name, ioPack, callback);
                    });
                }
            });
        } else {
            if (forceDowngrade) {
                console.warn('Unable to get version for "' + adapter + '". Update anyway.');
                console.log('Update ' +  adapter + ' from @' + ioInstalled.common.version + ' to @' + version);
                // Get the adapter from web site
                install.downloadPacket(sources, adapter + '@' + version, null, (name, ioPack) => {
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
            getRepository(repoUrl, params, (err, sources) => {
                if (!sources) {
                    console.warn('Cannot get repository under "' + repoUrl + '"');
                    if (callback) callback(err);
                } else {
                    this.upgradeController(sources, forceDowngrade, callback);
                }
            });
            return;
        }

        const installed = JSON.parse(fs.readFileSync(__dirname + '/../../io-package.json', 'utf8'));
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
                tools.upToDate(repoUrl[installed.common.name].version, installed.common.version))) {
                console.log('Host    "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is up to date.');
                if (callback) {
                    callback();
                }
            } else {
                console.log('Update ' +  installed.common.name + ' from @' + installed.common.version + ' to @' +  repoUrl[installed.common.name].version);
                // Get the controller from web site
                install.downloadPacket(repoUrl, installed.common.name + '@' + repoUrl[installed.common.name].version, null, name => {
                    installNpm((err, _name) => {
                        if (err) {
                            processExit(err);
                        } else {
                            setChmod(() => restartController(callback));
                        }
                    });
                });
            }
        } else {
            tools.getJson(repoUrl[installed.common.name].meta, ioPack => {
                if ((!ioPack || !ioPack.common) && !forceDowngrade) {
                    console.warn('Cannot read version. Write "' + tools.appName + ' upgrade self --force" to upgrade controller anyway.');
                    if (callback) {
                        callback();
                    }
                    return;
                }
                let version = ioPack && ioPack.common ? ioPack && ioPack.common.version : '';
                if (version) {
                    version = '@' + version;
                }

                if ((ioPack && ioPack.common && ioPack.common.version === installed.common.version) ||
                    (!forceDowngrade && ioPack && ioPack.common && tools.upToDate(ioPack.common.version, installed.common.version))) {
                    console.log('Host    "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is up to date.');
                    if (callback) callback();
                } else {
                    const name = (ioPack && ioPack.common && ioPack.common.name) ? ioPack.common.name : installed.common.name;
                    console.log('Update ' + name + ' from @' + installed.common.version + ' to ' + version);
                    // Get the controller from web site
                    install.downloadPacket(repoUrl, name + version, null, name => {
                        installNpm((err, _name) => {
                            if (err) {
                                processExit(err);
                            } else {
                                setChmod(() => restartController(callback));
                            }
                        });
                    });
                }

            });
        }
    };

    // BF (2018.06.04): remove this call later
    function setChmod(callback) {
        try {
            if (configData === null && fs.existsSync(configFile)) {
                configData = JSON.parse(fs.readFileSync(configFile));
            }
        } catch (e) {
            console.error(`Cannot read "${configFile}: ${e}`);
            configData = false;
        }

        if (configData && configData.system && configData.system.noChmod) {
            return callback && callback();
        }

        const platform = require('os').platform();
        console.log('Host "' + tools.getHostName() + '" (' + platform + ') updated');
        // Call command chmod +x __dirname if under linux or darwin
        if (platform === 'linux' || platform === 'darwin') {
            const exec = require('child_process').exec;
            let dir;
            if (__dirname.toLowerCase().replace(/\\/g, '/').indexOf('node_modules/' + tools.appName + '.js-controller') !== -1) {
                dir = require('path').normalize(__dirname + '/../../../..').replace(/\\/g, '/');
            } else {
                dir = require('path').normalize(__dirname + '/../..').replace(/\\/g, '/');
            }

            const cmd = 'chmod -R 777 ' + dir;
            console.log('Execute: ' + cmd);
            const child = exec(cmd);
            child.stderr.pipe(process.stdout);
            child.on('exit', () => {
                console.log('Chmod finished. Restart controller');
                if (callback) callback();
            });
        } else {
            if (callback) callback();
        }
    }
}

module.exports = Upgrade;
