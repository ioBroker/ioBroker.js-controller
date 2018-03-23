'use strict';
function Repo(options) {
    const tools  = require(__dirname + '/../tools.js');
    const extend = require('node.extend');
    let defaultSystemRepo = {
        "common": {
            "name": "System repositories",
            "dontDelete": true
        },
        "native": {
            "repositories": {
                "default": {
                    "link": "http://download.iobroker.net/sources-dist.json",
                    "json": null
                },
                "latest": {
                    "link": "http://download.iobroker.net/sources-dist-latest.json",
                    "json": null
                }
            }
        },
        "_id": "system.repositories",
        "type": "config"
    };

    options = options || {};

    if (!options.objects)     throw 'Invalid arguments: objects is missing';

    var objects = options.objects;

    function updateRepo(repoUrl, callback) {
        var result = {};

        if (!repoUrl || typeof repoUrl !== 'object') {
            tools.getRepositoryFile(repoUrl, function (err, sources) {
                updateRepo(sources, callback);
            });
            return;
        }
        var sources = repoUrl;
        var downloads = [];

        function download() {
            if (downloads.length < 1) {
                console.log('update done');
                if (callback) callback(result);
            } else {
                var name = downloads.pop();

                if (sources[name].version) {
                    result[name] = sources[name];
                } else if (sources[name].meta) {
                    tools.getJson(sources[name].meta, function (ioPack) {
                        if (ioPack && ioPack.common) {
                            result[name] = extend(true, sources[name], ioPack.common);
                        }
                        setImmediate(download);
                    });
                    return;
                } else if (sources[name].url) {
                    console.log('Cannot get version of "' + name + '".');
                    result[name] = sources[name];
                } else {
                    console.log('Cannot get any information of "' + name + '". Ignored.');
                }
                setImmediate(download);
            }
        }

        // Read repository file, local or by url
        for (var name in sources) {
            if (!sources.hasOwnProperty(name)) continue;
            downloads.push(name);
        }

        download(/*sources*/);
    }

    this.showRepo = function (repoUrl, flags, callback) {
        if (typeof flags === 'function') {
            callback = flags;
            flags = {};
        }

        function showRepoResult(_name, sources) {
            var installed = tools.getInstalledInfo();
            var updatable;
            var keys = [];
            for (var key in sources) {
                if (!sources.hasOwnProperty(key)) continue;
                keys.push(key);
            }
            keys.sort();

            for (var i = 0; i < keys.length; i++) {
                var name = keys[i];
                if (!sources.hasOwnProperty(name)) continue;
                updatable = false;
                var text = (sources[name].controller ? 'Controller ' : 'Adapter    ');
                text += '"' + name + '"' + ((name.length < 15) ? new Array(15 - name.length).join(' ') : '');

                var tLen = 10;
                if (name.length >= 15) tLen -= (name.length > tLen ? 1 : 0);
                if (tLen < 0) tLen = 0;

                if (sources[name].version) {
                    text += ': ' + sources[name].version + ((sources[name].version.length < tLen) ? new Array(tLen - sources[name].version.length).join(' ') : '');
                } else {
                    text += new Array(tLen).join(' ')
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
        objects.getObject('system.config', function (err, sysConfig) {
            objects.getObject('system.repositories', function (err, obj) {
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
                                    json: null
                                };
                            }

                            updateRepo(obj.native.repositories[repoUrl].link, function (sources) {
                                obj.native.repositories[repoUrl].json = sources;
                                obj.from = 'system.host.' + tools.getHostName() + '.cli';
                                obj.ts = new Date().getTime();
                                objects.setObject(obj._id, obj, function () {
                                    showRepoResult(repoUrl, sources);
                                    if (callback) callback();
                                });
                            });
                        } else {
                            updateRepo(repoUrl, function (sources) {
                                showRepoResult(null, sources);
                                if (callback) callback();
                            });
                        }
                    }
                }
            });
        });
    };

    this.showRepoStatus = function (callback) {
        objects.getObject('system.repositories', function (err, obj) {
            if (err || !obj) {
                console.error('Cannot get list: ' + err);
                callback(102);
            } else {
                if (obj.native.repositories) {
                    for (var r in obj.native.repositories) {
                        if (obj.native.repositories.hasOwnProperty(r)){
                            console.log(r + (r.length < 12 ? new Array(12 - r.length).join(' ') : '') + ': ' + obj.native.repositories[r].link);
                        }
                    }
                    objects.getObject('system.config', function (err, obj) {
                        if (obj) {
                            console.log('\nActive repo: ' + obj.common.activeRepo);
                        }
                        callback();
                    });
                } else {
                    console.error('Cannot get list: ' + err);
                    callback(102);
                }
            }
        });
    };

    this.add = function (repoName, repoUrl, callback) {
        objects.getObject('system.repositories', function (err, obj) {
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
        objects.getObject('system.config', function (err, obj) {
            if (err) {
                callback && callback(err);
            } else {
                if (obj.common.activeRepo === repoName) {
                    callback && callback('Cannot delete active repository: ' + repoName);
                } else {
                    objects.getObject('system.repositories', function (err, obj) {
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
        objects.getObject('system.repositories', function (err, obj) {
            if (err) {
                callback && callback(err);
            } else
            if (!obj) {
                obj = defaultSystemRepo;
            }
            if (!obj.native.repositories[repoName]) {
                callback && callback('Repository "' + repoName + '" not found.');
            } else {
                objects.getObject('system.config', function (err, obj) {
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
        })
    };
}

module.exports = Repo;
