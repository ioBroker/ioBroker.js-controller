'use strict';

/** @class */
function Repo(options) {
    const { EXIT_CODES } = require('@iobroker/js-controller-common');
    const { tools } = require('@iobroker/js-controller-common');
    const axios = require('axios');
    const ioPackage = require('../../io-package.json');
    const version = ioPackage.common.version;
    const fs = require('fs');

    const defaultSystemRepo = {
        common: {
            name: 'System repositories',
            dontDelete: true
        },
        native: {
            repositories: {
                stable: {
                    link: 'http://download.iobroker.net/sources-dist.json',
                    json: null
                },
                beta: {
                    link: 'http://download.iobroker.net/sources-dist-latest.json',
                    json: null
                }
            }
        },
        _id: 'system.repositories',
        type: 'config'
    };

    options = options || {};

    if (!options.objects) {
        throw new Error('Invalid arguments: objects is missing');
    }
    if (!options.states) {
        throw new Error('Invalid arguments: states is missing');
    }

    const objects = options.objects;
    const states = options.states;

    async function updateRepo(repoName, force, _systemConfig, _systemRepos) {
        if (!repoName) {
            const sysConfig = _systemConfig || (await objects.getObjectAsync('system.config'));
            repoName = sysConfig.common.activeRepo;
        }

        const oldRepos = _systemRepos || (await objects.getObjectAsync('system.repositories'));
        if (!oldRepos.native.repositories || !oldRepos.native.repositories[repoName]) {
            console.log(`Error: repository "${repoName}" not found in the "system.repositories`);
            return null;
        }

        const urlOrPath = oldRepos.native.repositories[repoName].link;
        let hash;

        if (
            !force &&
            oldRepos.native.repositories[repoName].hash &&
            oldRepos.native.repositories[repoName].json &&
            (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://'))
        ) {
            hash = await axios({ url: urlOrPath.replace(/\.json$/, '-hash.json'), timeout: 10000 });
            if (hash && hash.data && oldRepos.native.repositories[repoName].hash === hash.data.hash) {
                return oldRepos.native.repositories[repoName].json;
            }
        }

        let data;

        if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
            if (!hash) {
                hash = await axios({ url: urlOrPath.replace(/\.json$/, '-hash.json'), timeout: 10000 });
            }

            const agent = `${tools.appName}, RND: CLI, Node:${process.version}, V:${version}`;
            data = await axios({
                url: urlOrPath,
                timeout: 10000,
                headers: { 'User-Agent': agent }
            });
            if (data.data) {
                data = data.data;
            } else {
                data = null;
            }
        } else {
            if (fs.existsSync(urlOrPath)) {
                try {
                    data = JSON.parse(fs.readFileSync(urlOrPath).toString('utf8'));
                } catch (err) {
                    console.error(`Error: Cannot read or parse file "${urlOrPath}": ${err.message}`);
                }
            } else {
                console.error(`Error: Cannot find file "${urlOrPath}"`);
            }
        }

        let changed;
        if (data) {
            oldRepos.native.repositories[repoName].json = data;
            changed = true;
        }
        if (hash && hash.data) {
            oldRepos.native.repositories[repoName].hash = hash.data.hash;
            changed = true;
        }
        if (changed) {
            oldRepos.from = `system.host.${tools.getHostName()}.cli`;
            oldRepos.ts = Date.now();
            await objects.setObjectAsync('system.repositories', oldRepos);
        }

        return oldRepos.native.repositories[repoName].json;
    }

    this.showRepo = async function (repoUrl, flags) {
        function showRepoResult(_name, sources) {
            const installed = tools.getInstalledInfo();
            const adapters = Object.keys(sources).sort();

            adapters.forEach(name => {
                let updatable = false;
                let text = sources[name].controller ? 'Controller ' : 'Adapter    ';
                text += `"${name}"`;
                text = text.padEnd(11 + 15);

                if (sources[name].version) {
                    text += ': ' + sources[name].version;
                }
                text = text.padEnd(11 + 15 + 11);

                if (!(flags.all || flags.a) && !installed[name]) {
                    return;
                }

                if (installed[name] && installed[name].version) {
                    text += ', installed ' + installed[name].version;
                    if (
                        sources[name].version !== installed[name].version &&
                        sources[name].version &&
                        !tools.upToDate(sources[name].version, installed[name].version)
                    ) {
                        updatable = true;
                        text = text.padEnd(11 + 15 + 11 + 18);
                        text += ' [Updatable]';
                    }
                }
                if ((flags.updatable || flags.u) && !updatable) {
                    return;
                }
                console.log(text);
            });
        }

        // Get the repositories
        const systemConfig = await objects.getObjectAsync('system.config');
        const systemRepos = await objects.getObjectAsync('system.repositories');
        if (!systemConfig) {
            console.error('Error: Object "system.config" not found');
        } else if (!systemRepos) {
            console.error('Error: Object "system.repositories" not found');
        } else if (!systemRepos.native || !systemRepos.native.repositories) {
            console.error('Error: no repositories found in the "system.config');
        } else {
            repoUrl = repoUrl || systemConfig.common.activeRepo;

            if (typeof repoUrl !== 'object') {
                repoUrl = [repoUrl];
            }

            console.log(`Used ${repoUrl.length > 1 ? 'repositories' : 'repository'}: ${repoUrl.join(', ')}`);

            const allSources = {};

            for (let r = 0; r < repoUrl.length; r++) {
                const repo = repoUrl[r];
                // If known repository
                if (systemRepos.native.repositories[repo]) {
                    if (typeof systemRepos.native.repositories[repo] === 'string') {
                        systemRepos.native.repositories[repo] = {
                            link: systemRepos.native.repositories[repo],
                            json: null,
                            hash: ''
                        };
                    }

                    const sources = await updateRepo(repo, flags.force || flags.f, systemConfig, systemRepos);
                    sources && Object.assign(allSources, sources);
                } else {
                    console.error(
                        `Error: unknown repository is active - "${repo}". Known: ${Object.keys(
                            systemRepos.native.repositories
                        ).join(', ')}`
                    );
                }
            }

            try {
                // update variables of every admin instance
                await updateInfo(allSources);
            } catch {
                // not important if fails
            }

            showRepoResult(null, allSources);
        }
    };

    async function updateInfo(sources) {
        const installed = tools.getInstalledInfo();
        const list = [];

        Object.keys(sources).forEach(name => {
            if (installed[name] && installed[name].version && sources[name].version) {
                if (
                    sources[name].version !== installed[name].version &&
                    !tools.upToDate(sources[name].version, installed[name].version)
                ) {
                    // remove first part of the name
                    const n = name.indexOf('.');
                    list.push(n === -1 ? name : name.substring(n + 1));
                }
            }
        });

        const objs = await objects.getObjectViewAsync('system', 'instance', {
            startkey: 'system.adapter.admin',
            endkey: 'system.adapter.admin\u9999'
        });

        if (objs && objs.rows && objs.rows.length) {
            const listStr = list.join(', ');
            for (let t = 0; t < objs.rows.length; t++) {
                if (
                    objs.rows[t] &&
                    objs.rows[t].value &&
                    objs.rows[t].value.common &&
                    objs.rows[t].value.type === 'instance'
                ) {
                    await states.setStateAsync(objs.rows[t].id + '.info.updatesNumber', list.length, true);
                    await states.setStateAsync(objs.rows[t].id + '.info.updatesList', listStr, true);
                }
            }
        }
    }

    this.showRepoStatus = async function () {
        try {
            const obj = await objects.getObjectAsync('system.repositories');
            if (!obj) {
                console.error('List is empty');
                return EXIT_CODES.CANNOT_GET_REPO_LIST;
            } else if (obj.native.repositories) {
                Object.keys(obj.native.repositories).forEach(r =>
                    console.log(`${r.padEnd(14)}: ${obj.native.repositories[r].link}`)
                );

                const objCfg = await objects.getObjectAsync('system.config');
                if (objCfg && objCfg.common) {
                    let activeRepo = objCfg.common.activeRepo;
                    if (typeof activeRepo === 'string') {
                        activeRepo = [activeRepo];
                    }
                    console.log(`\nActive repo(s): ${activeRepo.join(', ')}`);
                }
            } else {
                console.error('List is empty');
                return EXIT_CODES.CANNOT_GET_REPO_LIST;
            }
        } catch (err) {
            console.error('Cannot get list: ' + err);
            return EXIT_CODES.CANNOT_GET_REPO_LIST;
        }
    };

    this.add = async function (repoName, repoUrl) {
        let obj = await objects.getObjectAsync('system.repositories');
        obj = obj || defaultSystemRepo;

        if (obj.native.repositories[repoName]) {
            throw new Error(`Repository "${repoName}" yet exists: ${obj.native.repositories[repoName].link}`);
        } else {
            obj.native.repositories[repoName] = {
                link: repoUrl,
                json: null
            };
            obj.from = 'system.host.' + tools.getHostName() + '.cli';
            obj.ts = Date.now();
            await objects.setObjectAsync('system.repositories', obj);
        }
    };

    this.del = async function (repoName) {
        const obj = await objects.getObjectAsync('system.config');
        if (
            (obj.common.activeRepo &&
                typeof obj.common.activeRepo === 'string' &&
                obj.common.activeRepo === repoName) ||
            (obj.common.activeRepo &&
                typeof obj.common.activeRepo === 'object' &&
                obj.common.activeRepo.includes(repoName))
        ) {
            throw new Error(`Cannot delete active repository: ${repoName}`);
        } else {
            const repoObj = await objects.getObjectAsync('system.repositories');
            if (repoObj) {
                if (!repoObj.native.repositories[repoName]) {
                    throw new Error(`Repository "${repoName}" not found.`);
                } else {
                    delete repoObj.native.repositories[repoName];
                    repoObj.from = `system.host.${tools.getHostName()}.cli`;
                    repoObj.ts = Date.now();
                    await objects.setObjectAsync('system.repositories', repoObj);
                }
            }
        }
    };

    this.setActive = async function (repoName) {
        let obj = await objects.getObjectAsync('system.repositories');
        obj = obj || defaultSystemRepo;

        if (!obj.native.repositories[repoName]) {
            throw new Error(`Repository "${repoName}" not found.`);
        } else {
            const confObj = await objects.getObjectAsync('system.config');
            if (typeof confObj.common.activeRepo === 'string') {
                confObj.common.activeRepo = [confObj.common.activeRepo];
            }
            if (!confObj.common.activeRepo.includes(repoName)) {
                confObj.common.activeRepo.push(repoName);
                confObj.from = `system.host.${tools.getHostName()}.cli`;
                confObj.ts = Date.now();
                await objects.setObjectAsync('system.config', confObj);
            }
        }
    };

    this.setInactive = async function (repoName) {
        const confObj = await objects.getObjectAsync('system.config');
        if (typeof confObj.common.activeRepo === 'string') {
            confObj.common.activeRepo = [confObj.common.activeRepo];
        }
        const pos = confObj.common.activeRepo.indexOf(repoName);
        if (pos !== -1) {
            confObj.common.activeRepo.splice(pos, 1);
            confObj.from = `system.host.${tools.getHostName()}.cli`;
            confObj.ts = Date.now();
            await objects.setObjectAsync('system.config', confObj);
        }
    };

    /**
     * Renames existing repository if old name and link matches, renaming will not be performed if an repo with the new name already exists
     *
     * @param {string} oldName - name of the current repository
     * @param {string} newName - target name
     * @param {string} matchingLink - hyperlink of the repository
     * @returns {Promise<void>}
     */
    this.rename = async function (oldName, newName, matchingLink) {
        let repoObj;
        let sysConfigObj;
        try {
            sysConfigObj = await objects.getObjectAsync('system.config');
            repoObj = await objects.getObjectAsync('system.repositories');
        } catch (err) {
            throw new Error(`Could not rename repository "${oldName}" to "${newName}": ${err.message}`);
        }

        if (repoObj && repoObj.native && repoObj.native.repositories) {
            if (
                repoObj.native.repositories[oldName] &&
                repoObj.native.repositories[oldName].link === matchingLink &&
                !repoObj.native.repositories[newName]
            ) {
                repoObj.native.repositories[newName] = repoObj.native.repositories[oldName];
                delete repoObj.native.repositories[oldName];

                try {
                    await objects.setObjectAsync('system.repositories', repoObj);
                    console.log(`Renamed repository "${oldName} to "${newName}"`);
                } catch (err) {
                    throw new Error(`Could not rename repository "${oldName}" to "${newName}": ${err.message}`);
                }

                // if we changed the name of the activeRepo, we should set newName as active repo
                if (
                    sysConfigObj &&
                    sysConfigObj.common &&
                    ((typeof sysConfigObj.common.activeRepo === 'string' &&
                        sysConfigObj.common.activeRepo === oldName) ||
                        (typeof sysConfigObj.common.activeRepo === 'object' &&
                            sysConfigObj.common.activeRepo.includes(oldName)))
                ) {
                    if (typeof sysConfigObj.common.activeRepo === 'string') {
                        sysConfigObj.common.activeRepo = [sysConfigObj.common.activeRepo];
                    }
                    const pos = sysConfigObj.common.activeRepo.indexOf(oldName);
                    sysConfigObj.common.activeRepo.splice(pos, 1, newName);

                    try {
                        await objects.setObjectAsync('system.config', sysConfigObj);
                    } catch (err) {
                        throw new Error(`Could not set "${newName}" as active repository: ${err.message}`);
                    }
                }
            }
        }
    };
}

module.exports = Repo;
