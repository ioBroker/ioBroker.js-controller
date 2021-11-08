'use strict';

const fs = require('fs');

/** @class */
function Repo(options) {
    const { EXIT_CODES } = require('@iobroker/js-controller-common');
    const { tools }  = require('@iobroker/js-controller-common');
    const axios      = require('axios');
    const ioPackage  = require('../../io-package.json');
    const version    = ioPackage.common.version;

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
    const states  = options.states;

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
            hash = await axios({url: urlOrPath.replace(/\.json$/, '-hash.json'), timeout: 10000});
            if (hash && hash.data && oldRepos.native.repositories[repoName].hash === hash.data.hash) {
                return oldRepos.native.repositories[repoName].json;
            }
        }

        let data;

        if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
            if (!hash) {
                hash = await axios({url: urlOrPath.replace(/\.json$/, '-hash.json'), timeout: 10000});
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
                } catch (e) {
                    console.error(`Error: Cannot read or parse file "${urlOrPath}": ${e}`);
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
                let text = (sources[name].controller ? 'Controller ' : 'Adapter    ');
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
                    if (sources[name].version !== installed[name].version &&
                        sources[name].version &&
                        !tools.upToDate(sources[name].version, installed[name].version)) {
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

            console.log('Used repository(ies): ' + repoUrl.join(', '));

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
                    console.error(`Error: unknown repository is active - "${repo}". Known: ${Object.keys(systemRepos.native.repositories).join(', ')}`);
                }
            }

            // update variables of every admin instance
            await new Promise(resolve => updateInfo(allSources, () => resolve()));

            showRepoResult(null, allSources);
        }
    };

    function writeUpdateInfo(instances, num, list, callback) {
        if (!instances || !instances.length) {
            return callback && callback();
        } else {
            const id = instances.pop();
            states.setState(id + '.info.updatesNumber', num, true);
            states.setState(id + '.info.updatesList', list, true);
            setImmediate(writeUpdateInfo, instances, num, list, callback);
        }
    }

    function updateInfo(sources, callback) {
        const installed = tools.getInstalledInfo();
        const list  = [];

        Object.keys(sources).forEach(name => {
            if (installed[name] && installed[name].version && sources[name].version) {
                if (sources[name].version !== installed[name].version &&
                    !tools.upToDate(sources[name].version, installed[name].version)) {
                    // remove first part of the name
                    const n = name.indexOf('.');
                    list.push(n === -1 ? name : name.substring(n + 1));
                }
            }
        });

        objects.getObjectView('system', 'instance', {startkey: 'system.adapter.admin', endkey: 'system.adapter.admin\u9999'}, null, (err, objs) => {
            const instances = [];

            err && console.error(err);

            if (objs && objs.rows && objs.rows.length) {
                for (let t = 0; t < objs.rows.length; t++) {
                    if (objs.rows[t] && objs.rows[t].value && objs.rows[t].value.common && objs.rows[t].value.type === 'instance') {
                        instances.push(objs.rows[t].id);
                    }
                }
            }

            writeUpdateInfo(instances, list.length, list.join(', '), callback);
        });
    }

    this.showRepoStatus = function (callback) {
        objects.getObject('system.repositories', (err, obj) => {
            if (err || !obj) {
                console.error('Cannot get list: ' + err);
                callback(EXIT_CODES.CANNOT_GET_REPO_LIST);
            } else {
                if (obj.native.repositories) {
                    Object.keys(obj.native.repositories).forEach(r =>
                        console.log(`${r.padEnd(14)}: ${obj.native.repositories[r].link}`));

                    objects.getObject('system.config', (err, obj) => {
                        if (obj && obj.common) {
                            let activeRepo = obj.common.activeRepo;
                            if (typeof activeRepo === 'string') {
                                activeRepo = [activeRepo];
                            }
                            console.log(`\nActive repo(s): ${activeRepo.join(', ')}`);
                        }
                        callback();
                    });
                } else {
                    console.error('Cannot get list: ' + err);
                    callback(EXIT_CODES.CANNOT_GET_REPO_LIST);
                }
            }
        });
    };

    this.add = function (repoName, repoUrl, callback) {
        objects.getObject('system.repositories', (err, obj) => {
            if (err) {
                callback && callback(err);
            } else
            if (!obj) {
                obj = defaultSystemRepo;
            }

            if (obj.native.repositories[repoName]) {
                callback && callback(`Repository "${repoName}" yet exists: ${obj.native.repositories[repoName].link}`);
            } else {
                obj.native.repositories[repoName] = {
                    link: repoUrl,
                    json: null
                };
                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                obj.ts = Date.now();
                objects.setObject('system.repositories', obj, callback);
            }
        });
    };

    this.del = function (repoName, callback) {
        objects.getObject('system.config', (err, obj) => {
            if (err) {
                callback && callback(err);
            } else {
                if ((obj.common.activeRepo && typeof obj.common.activeRepo === 'string' && obj.common.activeRepo === repoName) ||
                    (obj.common.activeRepo && typeof obj.common.activeRepo === 'object' && obj.common.activeRepo.includes(repoName))) {
                    callback && callback(`Cannot delete active repository: ${repoName}`);
                } else {
                    objects.getObject('system.repositories', (err, obj) => {
                        if (err) {
                            callback && callback(err);
                        } else if (!obj) {
                            callback && callback();
                        } else {
                            if (!obj.native.repositories[repoName]) {
                                callback && callback(`Repository "${repoName}" not found.`);
                            } else {
                                delete obj.native.repositories[repoName];
                                obj.from = `system.host.${tools.getHostName()}.cli`;
                                obj.ts = Date.now();
                                objects.setObject('system.repositories', obj, callback);
                            }
                        }
                    });
                }
            }
        });
    };

    this.setActive = function (repoName, callback) {
        objects.getObject('system.repositories', (err, obj) => {
            if (err) {
                return callback && callback(err);
            } else {
                obj = obj || defaultSystemRepo;
            }
            if (!obj.native.repositories[repoName]) {
                callback && callback(`Repository "${repoName}" not found.`);
            } else {
                objects.getObject('system.config', (err, obj) => {
                    if (err) {
                        callback && callback(err);
                    } else {
                        if (typeof obj.common.activeRepo === 'string') {
                            obj.common.activeRepo = [obj.common.activeRepo];
                        }
                        if (!obj.common.activeRepo.includes(repoName)) {
                            obj.common.activeRepo.push(repoName);
                            obj.from = 'system.host.' + tools.getHostName() + '.cli';
                            obj.ts = Date.now();
                            objects.setObject('system.config', obj, callback);
                        } else {
                            callback && callback();
                        }
                    }
                });
            }
        });
    };

    this.setInactive = function (repoName, callback) {
        objects.getObject('system.config', (err, obj) => {
            if (err) {
                callback && callback(err);
            } else {
                if (typeof obj.common.activeRepo === 'string') {
                    obj.common.activeRepo = [obj.common.activeRepo];
                }
                const pos = obj.common.activeRepo.indexOf(repoName);
                if (pos !== -1) {
                    obj.common.activeRepo.splice(pos, 1);
                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = Date.now();
                    objects.setObject('system.config', obj, callback);
                } else {
                    callback && callback();
                }
            }
        });
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
        } catch (e) {
            throw new Error(`Could not rename repository "${oldName}" to "${newName}": ${e}`);
        }

        if (repoObj && repoObj.native && repoObj.native.repositories) {
            if (repoObj.native.repositories[oldName] && repoObj.native.repositories[oldName].link === matchingLink &&
            !repoObj.native.repositories[newName]) {
                repoObj.native.repositories[newName] = repoObj.native.repositories[oldName];
                delete repoObj.native.repositories[oldName];

                try {
                    await objects.setObjectAsync('system.repositories', repoObj);
                    console.log(`Renamed repository "${oldName} to "${newName}"`);
                } catch (e) {
                    throw new Error(`Could not rename repository "${oldName}" to "${newName}": ${e}`);
                }

                // if we changed the name of the activeRepo, we should set newName as active repo
                if (sysConfigObj && sysConfigObj.common &&
                    ((typeof sysConfigObj.common.activeRepo === 'string' && sysConfigObj.common.activeRepo === oldName) ||
                     (typeof sysConfigObj.common.activeRepo === 'object' && sysConfigObj.common.activeRepo.includes(oldName)))
                ) {
                    if (typeof sysConfigObj.common.activeRepo === 'string') {
                        sysConfigObj.common.activeRepo = [sysConfigObj.common.activeRepo];
                    }
                    const pos = sysConfigObj.common.activeRepo.indexOf(oldName);
                    sysConfigObj.common.activeRepo.splice(pos, 1, newName);

                    try {
                        await objects.setObjectAsync('system.config', sysConfigObj);
                    } catch (e) {
                        throw new Error(`Could not set "${newName}" as active repository: ${e}`);
                    }
                }
            }
        }
    };
}

module.exports = Repo;
