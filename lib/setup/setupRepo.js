function Repo(options) {
    var fs     = require('fs');
    var tools  = require(__dirname + '/../tools.js');
    var extend = require('node.extend');

    options = options || {};

    if (!options.objects)     throw "Invalid arguments: objects is missing";
    if (!options.processExit) throw "Invalid arguments: processExit is missing";

    var objects     = options.objects;
    var processExit = options.processExit;

    // Helper methods
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

    function updateRepo(repoUrl, callback) {
        var result = {};

        if (!repoUrl || typeof repoUrl != 'object') {
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
                        setTimeout(download, 0);
                    });
                    return;
                } else if (sources[name].url) {
                    console.log('Cannot get version of "' + name + '".');
                    result[name] = sources[name];
                } else {
                    console.log('Cannot get any information of "' + name + '". Ignored.');
                }
                setTimeout(download, 0);
            }
        }

        // Read repository file, local or by url
        for (var name in sources) {
            downloads.push(name);
        }

        download(sources);
    }

    this.showRepo = function (repoUrl, flags, callback) {
        if (typeof flags == 'function') {
            callback = flags;
            flags = {};
        }

        function showRepoResult(_name, sources) {
            var installed = tools.getInstalledInfo();
            var updatable = false;
            for (var name in sources) {
                updatable = false;
                var text = (sources[name].controller ? 'Controller ' : 'Adapter    ');
                text += '"' + name + '"' + ((name.length < 15) ? new Array(15 - name.length).join(' '): '');
                if (sources[name].version) {
                    text += ': ' + sources[name].version + ((sources[name].version.length < 10) ? new Array(10 - sources[name].version.length).join(' '): '');
                }

                if (installed[name] && installed[name].version) {
                    text += ', installed ' + installed[name].version;
                    if (sources[name].version != installed[name].version &&
                        !upToDate(sources[name].version, installed[name].version)) {
                        updatable = true;
                        text += ' [Updateable]';
                    }

                }
                if (flags.updatable && !updatable) continue;
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

                        // If known repository
                        if (obj.native.repositories[repoUrl]) {

                            if (typeof obj.native.repositories[repoUrl] == 'string') {
                                obj.native.repositories[repoUrl] = {
                                    link: obj.native.repositories[repoUrl],
                                    json: null
                                };
                            }

                            updateRepo(obj.native.repositories[repoUrl].link, function (sources) {
                                obj.native.repositories[repoUrl].json = sources;
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
}

module.exports = Repo;
