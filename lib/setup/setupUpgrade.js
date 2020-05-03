/**
 *      Upgrade command
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';

/** @class */
function Upgrade(options) {
    const fs     = require('fs');
    const tools  = require('../tools.js');

    options = options || {};

    if (!options.processExit)       {
        throw new Error('Invalid arguments: processExit is missing');
    }
    if (!options.installNpm)        {
        throw new Error('Invalid arguments: installNpm is missing');
    }
    if (!options.restartController) {
        throw new Error('Invalid arguments: restartController is missing');
    }
    if (!options.getRepository)     {
        throw new Error('Invalid arguments: getRepository is missing');
    }

    const processExit       = options.processExit;
    const installNpm        = options.installNpm;
    const restartController = options.restartController;
    const getRepository     = options.getRepository;
    const params            = options.params;
    const objects           = options.objects;
    let semver;

    const hostname   = tools.getHostName();
    const EXIT_CODES = require('../exitCodes');

    const Upload = require('./setupUpload.js');
    const upload = new Upload(options);

    const Install = require('./setupInstall.js');
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

    /**
     * Checks that local and global deps are fulfilled else rejects promise
     * @param {string[]|object[]|object} deps local dependencies - required on this host
     * @param {string[]|object[]|object} globalDeps global dependencies - required on one of the hosts
     * @return {Promise<void>}
     */
    async function checkDependencies(deps, globalDeps) {
        if (!deps && !globalDeps) {
            return Promise.resolve();
        }

        deps = tools.parseDependencies(deps);
        globalDeps = tools.parseDependencies(globalDeps);
        // combine both dependencies
        const allDeps = {...deps, ...globalDeps};

        // Get all installed adapters
        let objs;
        try {
            objs = await objects.getObjectViewAsync('system', 'instance', {}, null);
        } catch (e) {
            return Promise.reject(e);
        }

        if (objs && objs.rows && objs.rows.length) {
            semver = semver || require('semver');
            for (const dName in allDeps) {
                if (dName === 'js-controller') {
                    const version = allDeps[dName];
                    // Check only if version not *, else we dont have to read io-pack unnecessarily
                    if (version !== '*') {
                        const iopkg_ = JSON.parse(fs.readFileSync(`${__dirname}/../../package.json`, 'utf8'));
                        if (!semver.satisfies(iopkg_.version, version)) {
                            return Promise.reject(new Error(`Invalid version of "${dName}". Installed "${iopkg_.version}", required "${version}`));
                        }
                    }
                } else {
                    let gInstances = [];
                    let locInstances = [];
                    // if global dep get all instances of adapter
                    if (globalDeps[dName] !== undefined) {
                        gInstances = objs.rows.filter(obj => obj && obj.value && obj.value.common && obj.value.common.name === dName);
                    }
                    if (deps[dName] !== undefined) {
                        // local dep get all instances on same host
                        locInstances = objs.rows.filter(obj => obj && obj.value && obj.value.common && obj.value.common.name === dName && obj.value.common.host === hostname);
                        if (locInstances.length  === 0) {
                            return Promise.reject(new Error(`Required dependency "${dName}" not found on this host.`));
                        }
                    }

                    let isFound = false;
                    // we check, that all instances match - respect different local and global dep versions
                    for (const instance of locInstances) {
                        if (!semver.satisfies(instance.value.common.version, deps[dName])) {
                            return Promise.reject(new Error(`Invalid version of "${dName}". Installed "${instance.value.common.version}", required "${deps[dName]}`));
                        }
                        isFound = true;
                    }

                    for (const instance of gInstances) {
                        if (!semver.satisfies(instance.value.common.version, globalDeps[dName])) {
                            return Promise.reject(new Error(`Invalid version of "${dName}". Installed "${instance.value.common.version}", required "${globalDeps[dName]}`));
                        }
                        isFound = true;
                    }

                    if (isFound === false) {
                        return Promise.reject(new Error(`Required dependency "${dName}" not found.`));
                    }
                }
            }
        }
    }

    this.upgradeAdapter = async function (repoUrl, adapter, forceDowngrade, callback) {
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
                    processExit(EXIT_CODES.MISSING_ADAPTER_FILES);
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
                                if (callback) {
                                    callback(name);
                                }
                            }
                        });
                    });
                    count++;
                    upload.uploadAdapter(name, true, true, () => {
                        count--;
                        if (!count) {
                            console.log(`Adapter "${name}" updated`);
                            if (callback) {
                                callback(name);
                            }
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
        if (version) {
            forceDowngrade = true;
        }

        const adapterDir = tools.getAdapterDir(adapter);

        // Read actual description of installed adapter with version
        if (!version && !fs.existsSync(`${adapterDir}/io-package.json`)) {
            console.log(`Adapter "${adapter}"${(adapter.length < 15) ? new Array(15 - adapter.length).join(' ') : ''} is not installed.`);
            if (callback) {
                callback();
            }
            return;
        }
        // Get the url of io-package.json or direct the version
        if (!repoUrl[adapter]) {
            console.log(`Adapter "${adapter}" is not in the repository and cannot be updated.`);
            if (callback) {
                callback();
            }
            return;
        }
        if (repoUrl[adapter].controller) {
            console.log(`Cannot update ${adapter} using this command. Please use "iobroker upgrade self" instead!`);
            if (callback) {
                callback();
            }
            return;
        }

        let ioInstalled;
        if (fs.existsSync(`${adapterDir}/io-package.json`)) {
            ioInstalled = require(`${adapterDir}/io-package.json`);
        }
        if (!ioInstalled) {
            ioInstalled = {common: {version: '0.0.0'}};
        }

        // If version is included in repository
        if (repoUrl[adapter].version) {
            if (!forceDowngrade) {
                try {
                    await checkDependencies(repoUrl[adapter].dependencies, repoUrl[adapter].globalDependencies);
                } catch (e) {
                    console.error(e.message);
                    return typeof callback === 'function' && callback();
                }
            }

            if (!forceDowngrade && (repoUrl[adapter].version === ioInstalled.common.version ||
                tools.upToDate(repoUrl[adapter].version, ioInstalled.common.version))) {
                console.log(`Adapter "${adapter}"${(adapter.length < 15) ? new Array(15 - adapter.length).join(' ') : ''} is up to date.`);
                if (callback) {
                    callback();
                }
            } else {
                console.log(`Update ${adapter} from @${ioInstalled.common.version} to @${version || repoUrl[adapter].version}`);
                // Get the adapter from web site
                install.downloadPacket(sources, adapter + '@' + (version || repoUrl[adapter].version), null, (enableAdapterCallback, name, ioPack) => {
                    finishUpgrade(name, ioPack, () => enableAdapterCallback(callback));
                });
            }
        } else if (repoUrl[adapter].meta) {
            // Read repository from url or file
            tools.getJson(repoUrl[adapter].meta, async ioPack => {
                if (!ioPack) {
                    console.error('Cannot parse file' + repoUrl[adapter].meta);
                    if (callback) {
                        callback();
                    }
                    return;
                }

                if (!forceDowngrade) {
                    try {
                        await checkDependencies(ioPack.common && ioPack.common.dependencies, ioPack.common && ioPack.common.globalDependencies);
                    } catch (e) {
                        console.error(e.message);
                        return typeof callback === 'function' && callback();
                    }
                }

                if (!version && (ioPack.common.version === ioInstalled.common.version ||
                    (!forceDowngrade && tools.upToDate(ioPack.common.version, ioInstalled.common.version)))) {
                    console.log('Adapter "' + adapter + '"' + ((adapter.length < 15) ? new Array(15 - adapter.length).join(' ') : '') + ' is up to date.');
                    if (callback) {
                        callback();
                    }
                } else {
                    // Get the adapter from web site
                    console.log('Update ' + adapter + ' from @' + ioInstalled.common.version + ' to @' + (version || ioPack.common.version));
                    install.downloadPacket(sources, adapter + '@' + (version || ioPack.common.version), null, (enableAdapterCallback, name, ioPack) => {
                        finishUpgrade(name, ioPack, () => enableAdapterCallback(callback));
                    });
                }
            });
        } else {
            if (forceDowngrade) {
                console.warn('Unable to get version for "' + adapter + '". Update anyway.');
                console.log('Update ' + adapter + ' from @' + ioInstalled.common.version + ' to @' + version);
                // Get the adapter from web site
                install.downloadPacket(sources, adapter + '@' + version, null, (enableAdapterCallback, name, ioPack) => {
                    finishUpgrade(name, ioPack, () => enableAdapterCallback(callback));
                });
            } else {
                console.error('Unable to get version for "' + adapter + '".');
                if (callback) {
                    callback();
                }
            }
        }
    };

    this.upgradeController = function (repoUrl, forceDowngrade, controllerRunning, callback) {
        if (typeof controllerRunning === 'function') {
            callback = controllerRunning;
            controllerRunning = false;
        }
        if (!repoUrl || typeof repoUrl !== 'object') {
            getRepository(repoUrl, params, (err, sources) => {
                if (!sources) {
                    console.warn('Cannot get repository under "' + repoUrl + '"');
                    if (callback) {
                        callback(err);
                    }
                } else {
                    this.upgradeController(sources, forceDowngrade, controllerRunning, callback);
                }
            });
            return;
        }

        const installed = JSON.parse(fs.readFileSync(`${__dirname}/../../io-package.json`, 'utf8'));
        if (!installed || !installed.common || !installed.common.version) {
            console.error(`Host "${hostname}"${(hostname.length < 15) ? new Array(15 - hostname.length).join(' ') : ''} is not installed.`);
            if (callback) {
                callback();
            }
            return;
        }
        if (!repoUrl[installed.common.name]) {
            // no info for controller
            console.error(`Cannot find this controller "${installed.common.name}" in repository.`);

            if (callback) {
                callback();
            }
            return;
        }

        if (repoUrl[installed.common.name].version) {
            if (!forceDowngrade && (repoUrl[installed.common.name].version === installed.common.version ||
                tools.upToDate(repoUrl[installed.common.name].version, installed.common.version))) {
                console.log('Host    "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is up to date.');
                if (callback) {
                    callback();
                }
            } else if (controllerRunning) {
                console.warn(`Controller is running. Please stop ioBroker first.`);
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                console.log('Update ' +  installed.common.name + ' from @' + installed.common.version + ' to @' +  repoUrl[installed.common.name].version);
                // Get the controller from web site
                install.downloadPacket(repoUrl, installed.common.name + '@' + repoUrl[installed.common.name].version, null, (enableAdapterCallback, _name) => {
                    installNpm((err, _name) => {
                        if (err) {
                            processExit(err);
                        } else {
                            enableAdapterCallback(() => restartController(callback));
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
                let version = (ioPack && ioPack.common) ? ioPack.common.version : '';
                if (version) {
                    version = '@' + version;
                }

                if ((ioPack && ioPack.common && ioPack.common.version === installed.common.version) ||
                    (!forceDowngrade && ioPack && ioPack.common && tools.upToDate(ioPack.common.version, installed.common.version))) {
                    console.log('Host    "' + hostname + '"' + ((hostname.length < 15) ? new Array(15 - hostname.length).join(' '): '') + ' is up to date.');
                    if (callback) {
                        callback();
                    }
                } else if (controllerRunning) {
                    console.warn(`Controller is running. Please stop ioBroker first.`);
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    const name = (ioPack && ioPack.common && ioPack.common.name) ? ioPack.common.name : installed.common.name;
                    console.log('Update ' + name + ' from @' + installed.common.version + ' to ' + version);
                    // Get the controller from web site
                    install.downloadPacket(repoUrl, name + version, null, (enableAdapterCallback, _name) => {
                        installNpm((err, _name) => {
                            if (err) {
                                processExit(err);
                            } else {
                                enableAdapterCallback(() => restartController(callback));
                            }
                        });
                    });
                }

            });
        }
    };
}

module.exports = Upgrade;
