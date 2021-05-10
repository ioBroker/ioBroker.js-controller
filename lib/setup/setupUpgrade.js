/**
 *      Upgrade command
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';
const debug = require('debug')('iobroker:cli');

/** @class */
function Upgrade(options) {
    const fs = require('fs-extra');
    const tools = require('../tools.js');

    options = options || {};

    if (!options.processExit) {
        throw new Error('Invalid arguments: processExit is missing');
    }
    if (!options.installNpm) {
        throw new Error('Invalid arguments: installNpm is missing');
    }
    if (!options.restartController) {
        throw new Error('Invalid arguments: restartController is missing');
    }
    if (!options.getRepository) {
        throw new Error('Invalid arguments: getRepository is missing');
    }

    const processExit = options.processExit;
    const installNpm = options.installNpm;
    const getRepository = options.getRepository;
    const params = options.params;
    const objects = options.objects;
    /** @type {import("semver")} */
    const semver = require('semver');
    let rl;
    let tty;

    const hostname = tools.getHostName();
    const EXIT_CODES = require('../exitCodes');

    const Upload = require('./setupUpload.js');
    const upload = new Upload(options);

    const Install = require('./setupInstall.js');
    const install = new Install(options);

    /**
     * Sorts the adapters by their dependencies and then upgrades multiple adapters from the given repository url
     *
     * @param {object} repo the repository content
     * @param {string[]} list list of adapters to upgrade
     * @param {boolean} forceDowngrade flag to force downgrade
     * @param {boolean} autoConfirm automatically confirm the tty questions (bypass)
     * @param {function} callback callback to be executed after function is finished
     */
    this.upgradeAdapterHelper = (repo, list, forceDowngrade, autoConfirm, callback) => {
        if (typeof autoConfirm === 'function') {
            callback = autoConfirm;
            autoConfirm = false;
        }

        const relevantAdapters = [];
        // check which adapters are upgradeable and sort them according to their dependencies
        for (const adapter of list) {
            if (repo[adapter].controller) {
                // skip controller
                continue;
            }
            const adapterDir = tools.getAdapterDir(adapter);
            if (fs.existsSync(`${adapterDir}/io-package.json`)) {
                const ioInstalled = require(`${adapterDir}/io-package.json`);
                if (!tools.upToDate(repo[adapter].version, ioInstalled.common.version)) {
                    // not up to date, we need to put it into account for our dependency check
                    relevantAdapters.push(adapter);
                }
            }
        }

        if (relevantAdapters.length) {
            const sortedAdapters = [];

            while (relevantAdapters.length) {
                let oneAdapterAdded = false;
                // create ordered list for upgrades
                for (let i = relevantAdapters.length - 1; i >= 0; i--) {
                    const relAdapter = relevantAdapters[i];
                    // if new version has no dependencies we can upgrade
                    if (!repo[relAdapter].dependencies && !repo[relAdapter].globalDependencies) {
                        // no deps, simply add it
                        sortedAdapters.push(relAdapter);
                        relevantAdapters.splice(relevantAdapters.indexOf(relAdapter), 1);
                        oneAdapterAdded = true;
                    } else {
                        const deps = repo[relAdapter].dependencies || [];
                        const globalDeps = repo[relAdapter].globalDependencies || [];

                        // we have to check if the deps are there
                        let conflict = false;
                        for (const dep of [...deps, ...globalDeps]) {
                            debug(`adapter "${relAdapter}" has dependency "${JSON.stringify(dep)}"`);
                            if (tools.isObject(dep)) {
                                // object -> dependency is important, because it affects version range
                                for (const depName of Object.keys(dep)) {
                                    if (relevantAdapters.includes(depName)) {
                                        // the dependency is also in the upgrade list and not previously added, we should add the dependency first
                                        debug(`conflict for dependency "${depName}" at adapter "${relAdapter}"`);
                                        conflict = true;
                                        break;
                                    }
                                }
                            }
                            // else it is a string, so doesn't matter because dep is also there before upgrade
                        }
                        // we reached here and no conflict so every dep is satisfied
                        if (!conflict) {
                            sortedAdapters.push(relAdapter);
                            relevantAdapters.splice(relevantAdapters.indexOf(relAdapter), 1);
                            oneAdapterAdded = true;
                        }
                    }
                }

                if (!oneAdapterAdded) {
                    // no adapter during this loop -> circular dependency
                    console.warn(`Circular dependency detected between adapters "${relevantAdapters.join(', ')}"`);
                    sortedAdapters.concat(relevantAdapters);
                    break; // however, break and try to update
                }
            }

            debug(`upgrade order is "${sortedAdapters.join(', ')}"`);
            this._upgradeAdapterHelper(repo, sortedAdapters, 0, forceDowngrade, autoConfirm, callback);
        } else {
            console.log('All adapters are up to date');
            if (typeof callback === 'function') {
                callback();
            }
        }
    };

    /**
     * Upgrade multiple adapters from the given repository url
     *
     * @param {object} repo the repository content
     * @param {string[]} list list of adapters to upgrade
     * @param {number} i current index used by list
     * @param {boolean} forceDowngrade flag to force downgrade
     * @param {boolean} autoConfirm automatically confirm the tty questions (bypass)
     * @param {function} callback callback to be executed after function is finished
     */
    this._upgradeAdapterHelper = (repo, list, i, forceDowngrade, autoConfirm, callback) => {
        this.upgradeAdapter(repo, list[i], forceDowngrade, autoConfirm, true, () => {
            i++;
            while (repo[list[i]] && repo[list[i]].controller) {
                i++;
            }

            if (list[i]) {
                setImmediate(() => this._upgradeAdapterHelper(repo, list, i, forceDowngrade, autoConfirm, callback));
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
            for (const dName in allDeps) {
                if (dName === 'js-controller') {
                    const version = allDeps[dName];
                    // Check only if version not *, else we dont have to read io-pack unnecessarily
                    if (version !== '*') {
                        const iopkg_ = fs.readJSONSync(`${__dirname}/../../package.json`);
                        try {
                            if (!semver.satisfies(iopkg_.version, version, {includePrerelease: true})) {
                                return Promise.reject(new Error(`Invalid version of "${dName}". Installed "${iopkg_.version}", required "${version}`));
                            }
                        } catch (err) {
                            console.log(`Can not check js-controller dependency requirement: ${err.message}`);
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
                        if (locInstances.length === 0) {
                            return Promise.reject(new Error(`Required dependency "${dName}" not found on this host.`));
                        }
                    }

                    let isFound = false;
                    // we check, that all instances match - respect different local and global dep versions
                    for (const instance of locInstances) {
                        try {
                            if (!semver.satisfies(instance.value.common.version, deps[dName], {includePrerelease: true})) {
                                return Promise.reject(new Error(`Invalid version of "${dName}". Installed "${instance.value.common.version}", required "${deps[dName]}`));
                            }
                        } catch (err) {
                            console.log(`Can not check dependency requirement: ${err.message}`);
                            return Promise.reject(new Error(`Invalid version of "${dName}". Installed "${instance.value.common.version}", required "${deps[dName]}`));
                        }
                        isFound = true;
                    }

                    for (const instance of gInstances) {
                        try {
                            if (!semver.satisfies(instance.value.common.version, globalDeps[dName], {includePrerelease: true})) {
                                return Promise.reject(new Error(`Invalid version of "${dName}". Installed "${instance.value.common.version}", required "${globalDeps[dName]}`));
                            }
                        } catch (err) {
                            console.log(`Can not check dependency requirement: ${err.message}`);
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

    /**
     * Try to upgrade adapter from given source with some checks
     *
     * @param {string} repoUrl url of the selected repository
     * @param {string} adapter name of the adapter
     * @param {boolean} forceDowngrade flag to force downgrade
     * @param {boolean} autoConfirm automatically confirm the tty questions (bypass)
     * @param {boolean} upgradeAll if true, this is an upgrade all call, we don't do major upgrades if no tty
     * @param {function} callback callback to be executed after function is finished
     */
    this.upgradeAdapter = async function (repoUrl, adapter, forceDowngrade, autoConfirm, upgradeAll, callback) {
        if (!repoUrl || typeof repoUrl !== 'object') {
            getRepository(repoUrl, params, (err, sources) => {
                if (err) {
                    processExit(err);
                } else {
                    this.upgradeAdapter(sources, adapter, forceDowngrade, autoConfirm, upgradeAll, callback);
                }
            });
            return;
        }

        const finishUpgrade = (name, iopack, callback) => {
            if (!iopack) {
                const adapterDir = tools.getAdapterDir(name);
                try {
                    iopack = fs.readJSONSync(`${adapterDir}/io-package.json`);
                } catch {
                    console.error(`Cannot find io-package.json in ${adapterDir}`);
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
                                console.log(`Adapter "${name}" updated`);
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
        };

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

        /**
         * We show changelog (news) and ask user if he really wants to upgrade but only if fd is associated with a tty, returns true if upgrade desired
         * @param {string} installedVersion - installed version of adapter
         * @param {string} targetVersion - target version of adapter
         * @param {string} adapterName - name of the adapter
         * @return {boolean}
         */
        const showUpgradeDialog = (installedVersion, targetVersion, adapterName) => {
            // major upgrade or downgrade
            const isMajor = semver.major(installedVersion) !== semver.major(targetVersion);

            tty = tty || require('tty');
            if (autoConfirm || !tty.isatty(process.stdout.fd) && (!isMajor || !upgradeAll)) {
                // force flag or script on non major or single adapter upgrade -> always upgrade
                return true;
            }

            if (!tty.isatty(process.stdout.fd) && isMajor && upgradeAll) {
                // no tty and not forced and multiple adapters, do not upgrade
                console.log(`Skip major upgrade of ${adapterName} from ${installedVersion} to ${targetVersion}`);
                return false;
            }

            const isUpgrade = semver.gt(targetVersion, installedVersion);
            const isDowngrade = semver.lt(targetVersion, installedVersion);

            // if information in repo files -> show news
            if (repoUrl[adapter] && repoUrl[adapter].news) {
                const news = repoUrl[adapter].news;

                let first = true;
                // check if upgrade or downgrade
                if (isUpgrade) {
                    for (const version in news) {
                        try {
                            if (semver.lte(version, targetVersion) && semver.gt(version, installedVersion)) {
                                if (first === true) {
                                    const noMissingNews = news[targetVersion] && news[installedVersion];
                                    console.log(`\nThis upgrade of "${adapter}" will ${noMissingNews ? '' : 'at least '}introduce the following changes:`);
                                    console.log('==========================================================================');
                                    first = false;
                                } else if (first === false) {
                                    console.log();
                                }
                                console.log(`-> ${version}:`);
                                console.log(news[version].en);
                            }
                        } catch {
                            // ignore
                        }
                    }
                } else if (isDowngrade) {
                    for (const version in news) {
                        try {
                            if (semver.gt(version, targetVersion) && semver.lte(version, installedVersion)) {
                                if (first === true) {
                                    const noMissingNews = news[targetVersion] && news[installedVersion];
                                    console.log(`\nThis downgrade of "${adapter}" will ${noMissingNews ? '' : 'at least '}remove the following changes:`);
                                    console.log('==========================================================================');
                                    first = false;
                                } else if (first === false) {
                                    console.log();
                                }
                                console.log(`-> ${version}`);
                                console.log(news[version].en);
                            }
                        } catch {
                            // ignore
                        }
                    }
                }
                if (first === false) {
                    console.log('==========================================================================\n');
                }
            }

            rl = rl || require('readline-sync');
            let answer;

            // ask user if he really wants to upgrade/downgrade/reinstall - repeat until (y)es or (n)o given
            do {
                if (isUpgrade || isDowngrade) {
                    if (isMajor) {
                        console.log(`BE CAREFUL: THIS IS A MAJOR ${isUpgrade ? 'UPGRADE' : 'DOWNGRADE'}, WHICH WILL MOST LIKELY INTRODUCE BREAKING CHANGES!`);
                    }
                    answer = rl.question(`Would you like to ${isUpgrade ? 'upgrade' : 'downgrade'} ${adapter} from @${ioInstalled.common.version} to @${version || repoUrl[adapter].version} now? [(y)es, (n)o]: `, {
                        defaultInput: 'n'
                    });
                } else {
                    answer = rl.question(`Would you like to reinstall version ${version || repoUrl[adapter].version} of ${adapter} now? [(y)es, (n)o]: `, {
                        defaultInput: 'n'
                    });
                }

                answer = answer.toLowerCase();

                if (answer === 'n' || answer === 'no') {
                    return false;
                }
            } while (answer !== 'y' && answer !== 'yes');
            return true;
        };

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
                const targetVersion = version || repoUrl[adapter].version;
                try {
                    if (!showUpgradeDialog(ioInstalled.common.version, targetVersion, adapter)) {
                        console.log(`No upgrade of "${adapter}" desired.`);
                        return typeof callback === 'function' && callback();
                    }
                } catch (err) {
                    console.log(`Can not check version information to display upgrade infos: ${err.message}`);
                }

                console.log(`Update ${adapter} from @${ioInstalled.common.version} to @${targetVersion}`);
                // Get the adapter from web site
                install.downloadPacket(sources, `${adapter}@${targetVersion}`, null, (enableAdapterCallback, name, ioPack) =>
                    finishUpgrade(name, ioPack, () => enableAdapterCallback(callback)));
            }
        } else if (repoUrl[adapter].meta) {
            // Read repository from url or file
            tools.getJson(repoUrl[adapter].meta, async ioPack => {
                if (!ioPack) {
                    console.error(`Cannot parse file${repoUrl[adapter].meta}`);
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
                    console.log(`Adapter "${adapter}"${(adapter.length < 15) ? new Array(15 - adapter.length).join(' ') : ''} is up to date.`);
                    if (callback) {
                        callback();
                    }
                } else {
                    // Get the adapter from web site
                    const targetVersion = version || ioPack.common.version;
                    try {
                        if (!showUpgradeDialog(ioInstalled.common.version, targetVersion, adapter)) {
                            console.log(`No upgrade of "${adapter}" desired.`);
                            return typeof callback === 'function' && callback();
                        }
                    } catch (err) {
                        console.log(`Can not check version information to display upgrade infos: ${err.message}`);
                    }
                    console.log(`Update ${adapter} from @${ioInstalled.common.version} to @${targetVersion}`);
                    install.downloadPacket(sources, `${adapter}@${targetVersion}`, null, (enableAdapterCallback, name, ioPack) => {
                        finishUpgrade(name, ioPack, () => enableAdapterCallback(callback));
                    });
                }
            });
        } else {
            if (forceDowngrade) {
                try {
                    if (!showUpgradeDialog(ioInstalled.common.version, version, adapter)) {
                        console.log(`No upgrade of "${adapter}" desired.`);
                        return typeof callback === 'function' && callback();
                    }
                } catch (err) {
                    console.log(`Can not check version information to display upgrade infos: ${err.message}`);
                }
                console.warn(`Unable to get version for "${adapter}". Update anyway.`);
                console.log(`Update ${adapter} from @${ioInstalled.common.version} to @${version}`);
                // Get the adapter from web site
                install.downloadPacket(sources, `${adapter}@${version}`, null, (enableAdapterCallback, name, ioPack) => {
                    finishUpgrade(name, ioPack, () => enableAdapterCallback(callback));
                });
            } else {
                console.error(`Unable to get version for "${adapter}".`);
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
                    console.warn(`Cannot get repository under "${repoUrl}"`);
                    if (callback) {
                        callback(err);
                    }
                } else {
                    this.upgradeController(sources, forceDowngrade, controllerRunning, callback);
                }
            });
            return;
        }

        const installed = fs.readJSONSync(`${__dirname}/../../io-package.json`);
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
                console.log(`Host    "${hostname}"${(hostname.length < 15) ? new Array(15 - hostname.length).join(' ') : ''} is up to date.`);
                if (callback) {
                    callback();
                }
            } else if (controllerRunning) {
                console.warn(`Controller is running. Please stop ioBroker first.`);
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                console.log(`Update ${installed.common.name} from @${installed.common.version} to @${repoUrl[installed.common.name].version}`);
                // Get the controller from web site
                install.downloadPacket(repoUrl, `${installed.common.name}@${repoUrl[installed.common.name].version}`, null, (enableAdapterCallback, _name) => {
                    installNpm((err, _name) => {
                        if (err) {
                            processExit(err);
                        } else {
                            enableAdapterCallback(callback);
                        }
                    });
                });
            }
        } else {
            tools.getJson(repoUrl[installed.common.name].meta, ioPack => {
                if ((!ioPack || !ioPack.common) && !forceDowngrade) {
                    console.warn(`Cannot read version. Write "${tools.appName} upgrade self --force" to upgrade controller anyway.`);
                    if (callback) {
                        callback();
                    }
                    return;
                }
                let version = (ioPack && ioPack.common) ? ioPack.common.version : '';
                if (version) {
                    version = `@${version}`;
                }

                if ((ioPack && ioPack.common && ioPack.common.version === installed.common.version) ||
                    (!forceDowngrade && ioPack && ioPack.common && tools.upToDate(ioPack.common.version, installed.common.version))) {
                    console.log(`Host    "${hostname}"${(hostname.length < 15) ? new Array(15 - hostname.length).join(' ') : ''} is up to date.`);
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
                    console.log(`Update ${name} from @${installed.common.version} to ${version}`);
                    // Get the controller from web site
                    install.downloadPacket(repoUrl, name + version, null, (enableAdapterCallback, _name) => {
                        installNpm((err, _name) => {
                            if (err) {
                                processExit(err);
                            } else {
                                enableAdapterCallback(callback);
                            }
                        });
                    });
                }
            });
        }
    };
}

module.exports = Upgrade;
