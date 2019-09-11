'use strict';

/** @class */
function Repo(options) {
    const EXIT_CODES = require('../exitCodes');
    const tools      = require('../tools.js');
    const extend     = require('node.extend');
    const ioPackage  = require('../../io-package.json');
    const version    = ioPackage.common.version;

    const defaultSystemRepo = {
        common: {
            name: 'System repositories',
            dontDelete: true
        },
        native: {
            repositories: {
                default: {
                    link: 'http://download.iobroker.net/sources-dist.json',
                    json: null
                },
                latest: {
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
        throw 'Invalid arguments: objects is missing';
    }
    if (!options.states) {
        throw 'Invalid arguments: states is missing';
    }

    const objects = options.objects;
    const states  = options.states;

    function download(downloads, sources, result, sourcesHash, callback) {
        if (downloads.length < 1) {
            console.log('update done');
            callback && callback(result, sourcesHash);
        } else {
            const name = downloads.pop();

            if (sources[name].version) {
                result[name] = sources[name];
            } else if (sources[name].meta) {
                return tools.getJson(sources[name].meta, ioPack => {
                    if (ioPack && ioPack.common) {
                        result[name] = extend(true, sources[name], ioPack.common);
                    }
                    setImmediate(download, downloads, sources, result, sourcesHash, callback);
                });
            } else if (sources[name].url) {
                console.log('Cannot get version of "' + name + '".');
                result[name] = sources[name];
            } else {
                console.log('Cannot get any information of "' + name + '". Ignored.');
            }
            setImmediate(download, downloads, sources, result, sourcesHash, callback);
        }
    }

    function updateRepo(repoUrl, sourcesHash, force, callback) {
        const result = {};

        if (typeof sourcesHash === 'function') {
            callback = sourcesHash;
            sourcesHash = '';
        }

        if (typeof force === 'function') {
            callback = force;
            force = false;
        }

        if (!repoUrl || typeof repoUrl !== 'object') {
            // Get the repositories
            return objects.getObject('system.config', (err, sysConfig) => {
                objects.getObject('system.repositories', (err, obj) => {
                    const additionalInfo = {
                        name: tools.appName,
                        node: process.version,
                        controller: version,
                        randomID: 'CLI'
                    };

                    if (!force) {
                        if (err || !obj) {
                            console.log('Error: Object "system.config" not found');
                        } else {
                            if (!obj.native || !obj.native.repositories) {
                                console.log('Error: no repositories found in the "system.config');
                            } else {
                                // If known repository
                                if (obj.native.repositories[sysConfig.common.activeRepo]) {
                                    if (typeof obj.native.repositories[sysConfig.common.activeRepo] === 'object') {
                                        additionalInfo.hash = obj.native.repositories[sysConfig.common.activeRepo].hash;
                                        additionalInfo.sources = obj.native.repositories[sysConfig.common.activeRepo].json;
                                    }
                                }
                            }
                        }
                    }

                    tools.getRepositoryFile(repoUrl, additionalInfo, (err, sources, sourcesHash) => updateRepo(sources, sourcesHash, force, callback));
                });
            });
        }
        const sources = repoUrl;
        const downloads = [];

        // Read repository file, local or by url
        for (const name in sources) {
            if (!sources.hasOwnProperty(name)) continue;
            downloads.push(name);
        }

        download(downloads, sources, result, sourcesHash, callback);
    }

    this.showRepo = function (repoUrl, flags, callback) {
        if (typeof flags === 'function') {
            callback = flags;
            flags = {};
        }

        function showRepoResult(_name, sources) {
            const installed = tools.getInstalledInfo();
            let updatable;
            const keys = [];
            for (const key in sources) {
                if (!sources.hasOwnProperty(key)) continue;
                keys.push(key);
            }
            keys.sort();

            for (let i = 0; i < keys.length; i++) {
                const name = keys[i];
                if (!sources.hasOwnProperty(name)) continue;
                updatable = false;
                let text = (sources[name].controller ? 'Controller ' : 'Adapter    ');
                text += '"' + name + '"' + ((name.length < 15) ? new Array(15 - name.length).join(' ') : '');

                let tLen = 10;
                if (name.length >= 15) tLen -= (name.length > tLen ? 1 : 0);
                if (tLen < 0) tLen = 0;

                if (sources[name].version) {
                    text += ': ' + sources[name].version + ((sources[name].version.length < tLen) ? new Array(tLen - sources[name].version.length).join(' ') : '');
                } else {
                    text += new Array(tLen).join(' ');
                }
                if ((flags.installed || flags.i) && !installed[name]) {
                    continue;
                }

                if (installed[name] && installed[name].version) {
                    text += ', installed ' + installed[name].version;
                    if (sources[name].version !== installed[name].version &&
                        sources[name].version &&
                        !tools.upToDate(sources[name].version, installed[name].version)) {
                        updatable = true;
                        text += ' [Updateable]';
                    }
                }
                if ((flags.updatable || flags.u) && !updatable) {
                    continue;
                }
                console.log(text);
            }
        }

        // Get the repositories
        objects.getObject('system.config', (err, sysConfig) => {
            objects.getObject('system.repositories', (err, obj) => {
                if (err || !obj) {
                    console.log('Error: Object "system.config" not found');
                } else {
                    if (!obj.native || !obj.native.repositories) {
                        console.log('Error: no repositories found in the "system.config');
                    } else {
                        repoUrl = repoUrl || sysConfig.common.activeRepo;

                        console.log('Used repository: ' + repoUrl);

                        // If known repository
                        if (obj.native.repositories[repoUrl]) {
                            if (typeof obj.native.repositories[repoUrl] === 'string') {
                                obj.native.repositories[repoUrl] = {
                                    link: obj.native.repositories[repoUrl],
                                    json: null,
                                    hash: ''
                                };
                            }

                            updateRepo(obj.native.repositories[repoUrl].link, null, flags.force || flags.f, (sources, sourcesHash) => {
                                obj.native.repositories[repoUrl].json = sources;
                                obj.native.repositories[repoUrl].hash = sourcesHash;
                                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                obj.ts = new Date().getTime();
                                objects.setObject(obj._id, obj, () => {
                                    // update variables of every admin instance
                                    updateInfo(sources, () => {
                                        showRepoResult(repoUrl, sources);
                                        callback && callback();
                                    });
                                });
                            });
                        } else {
                            updateRepo(repoUrl, sources => {
                                showRepoResult(null, sources);
                                typeof callback === 'function' && callback();
                            });
                        }
                    }
                }
            });
        });
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

        for (const name in sources) {
            if (!sources.hasOwnProperty(name)) continue;
            if (installed[name] && installed[name].version && sources[name].version) {
                if (sources[name].version !== installed[name].version &&
                    !tools.upToDate(sources[name].version, installed[name].version)) {
                    // remove first part of the name
                    const n = name.indexOf('.');
                    list.push(n === -1 ? name : name.substring(n + 1));
                }
            }
        }

        objects.getObjectView('system', 'instance', {startkey: 'system.adapter.admin', endkey: 'system.adapter.admin\u9999'}, null, (err, objs) => {
            const instances = [];
            if (err) console.error(err);
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
                    for (const r in obj.native.repositories) {
                        if (obj.native.repositories.hasOwnProperty(r)){
                            console.log(r + (r.length < 12 ? new Array(12 - r.length).join(' ') : '') + ': ' + obj.native.repositories[r].link);
                        }
                    }
                    objects.getObject('system.config', (err, obj) => {
                        if (obj) {
                            console.log('\nActive repo: ' + obj.common.activeRepo);
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
                callback && callback('Repository "' + repoName + '" yet exists: ' + obj.native.repositories[repoName].link);
            } else {
                obj.native.repositories[repoName] = {
                    link: repoUrl,
                    json: null
                };
                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                obj.ts = new Date().getTime();
                objects.setObject('system.repositories', obj, callback);
            }
        });
    };

    this.del = function (repoName, callback) {
        objects.getObject('system.config', (err, obj) => {
            if (err) {
                callback && callback(err);
            } else {
                if (obj.common.activeRepo === repoName) {
                    callback && callback('Cannot delete active repository: ' + repoName);
                } else {
                    objects.getObject('system.repositories', (err, obj) => {
                        if (err) {
                            callback && callback(err);
                        } else if (!obj) {
                            callback && callback();
                        } else {
                            if (!obj.native.repositories[repoName]) {
                                callback && callback('Repository "' + repoName + '" not found.');
                            } else {
                                delete obj.native.repositories[repoName];
                                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                obj.ts = new Date().getTime();
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
                callback && callback(err);
            } else
            if (!obj) {
                obj = defaultSystemRepo;
            }
            if (!obj.native.repositories[repoName]) {
                callback && callback('Repository "' + repoName + '" not found.');
            } else {
                objects.getObject('system.config', (err, obj) => {
                    if (err) {
                        callback && callback(err);
                    } else {
                        obj.common.activeRepo = repoName;
                        obj.from = 'system.host.' + tools.getHostName() + '.cli';
                        obj.ts = new Date().getTime();
                        objects.setObject('system.config', obj, callback);
                    }
                });
            }
        });
    };
}

module.exports = Repo;
