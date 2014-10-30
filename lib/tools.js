var os =      require('os');
var fs =      require('fs');
var request = require('request');
var extend =  require('node.extend');


function rmdirRecursiveSync(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + '/' + file;
            if (fs.statSync(curPath).isDirectory()) {
                // recurse
                rmdirRecursiveSync(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        // delete (hopefully) empty folder
        try {
            fs.rmdirSync(path);
        } catch (e) {
            console.log('Cannot delete directory ' + path + ': ' + e.toString());
        }
    }
}

function findIPs() {


    var ifaces = os.networkInterfaces();
    var ipArr = [];
    for (var dev in ifaces) {
        /*jshint loopfunc:true */
        ifaces[dev].forEach(function (details) {
            if (!details.internal) ipArr.push(details.address);
        });
    }
    return ipArr;
}

function findPath(path, url, isImage) {
    if (!url) return '';
    if (url.substring(0, 'http://'.length)  == 'http://' ||
        url.substring(0, 'https://'.length) == 'https://') {
        return url;
    } else {
        if (path.substring(0, 'http://'.length)  == 'http://' ||
            path.substring(0, 'https://'.length) == 'https://') {
            return (path + url).replace(/\/\//g, '/').replace('http:/', 'http://').replace('https:/', 'https://');
        } else {
            if (url && url[0] == '/') {
                return __dirname + '/..' + url;
            } else {
                return __dirname + '/../' + path + url;
            }
        }
    }
}

// Download file to tmp or return file name directly
function getFile(urlOrPath, fileName, callback) {
    // If object was read
    if (urlOrPath.substring(0, 'http://'.length) == 'http://' ||
        urlOrPath.substring(0, 'https://'.length) == 'https://') {
        var tmpFile = __dirname + '/../tmp/' + (fileName || Math.floor(Math.random() * 0xFFFFFFE) + '.zip');
        request(urlOrPath).pipe(fs.createWriteStream(tmpFile)).on('close', function () {
            console.log('downloaded ' + tmpFile);
            if (callback) callback(tmpFile);
        });
    } else {
        if (fs.existsSync(urlOrPath)) {
            if (callback) callback(urlOrPath);
        } else
        if (fs.existsSync(__dirname + '/../' + urlOrPath)) {
            if (callback) callback(__dirname + '/../' + urlOrPath);
        } else if (fs.existsSync(__dirname + '/../tmp/' + urlOrPath)) {
            if (callback) callback(__dirname + '/../tmp/' + urlOrPath);
        } else if (fs.existsSync(__dirname + '/../adapter/' + urlOrPath)) {
            if (callback) callback(__dirname + '/../adapter/' + urlOrPath);
        } else {
            console.log('File not found: ' + urlOrPath);
            process.exit(1);
        }
    }
}

// Return content of the json file. Download it or read directly
function getJson(urlOrPath, callback) {
    var sources = {};
    // If object was read
    if (urlOrPath && typeof urlOrPath == 'object') {
        if (callback) callback(urlOrPath);
    } else
    if (!urlOrPath) {
        console.log('Empty url!');
        if (callback) callback(null);
    } else {
        if (urlOrPath.substring(0, 'http://'.length) == 'http://' ||
            urlOrPath.substring(0, 'https://'.length) == 'https://') {
            request(urlOrPath, function (error, response, body) {
                if (error || !body || response.statusCode != 200) {
                    console.log('Cannot download json from ' + urlOrPath + '. Error: ' + (error || body));
                    if (callback) callback(null);
                    return;
                }
                try {
                    sources = JSON.parse(body);
                } catch (e) {
                    console.log('Json file is invalid on ' + urlOrPath);
                    if (callback) callback(null);
                    return;
                }

                if (callback) callback(sources);
            });
        } else {
            if (fs.existsSync(urlOrPath)) {
                try {
                    sources = JSON.parse(fs.readFileSync(urlOrPath));
                } catch (e) {
                    console.log('Cannot parse json file from ' + urlOrPath + '. Error: ' + e);
                    if (callback) callback(null);
                    return;
                }
                if (callback) callback(sources);
            } else
            if (fs.existsSync(__dirname + '/../' + urlOrPath)) {
                try {
                    sources = JSON.parse(fs.readFileSync(__dirname + '/../' + urlOrPath));
                }catch (e) {
                    console.log('Cannot parse json file from ' + __dirname + '/../' + urlOrPath + '. Error: ' + e);
                    if (callback) callback(null);
                    return;
                }
                if (callback) callback(sources);
            } else if (fs.existsSync(__dirname + '/../tmp/' + urlOrPath)) {
                try {
                    sources = JSON.parse(fs.readFileSync(__dirname + '/../tmp/' + urlOrPath));
                } catch (e) {
                    console.log('Cannot parse json file from ' + __dirname + '/../tmp/' + urlOrPath + '. Error: ' + e);
                    if (callback) callback(null);
                    return;
                }
                if (callback) callback(sources);
            } else if (fs.existsSync(__dirname + '/../adapter/' + urlOrPath)) {
                try {
                    sources = JSON.parse(fs.readFileSync(__dirname + '/../adapter/' + urlOrPath));
                }catch (e) {
                    console.log('Cannot parse json file from ' + __dirname + '/../adapter/' + urlOrPath + '. Error: ' + e);
                    if (callback) callback(null);
                    return;
                }
                if (callback) callback(sources);
            } else {
                console.log('Json file not found: ' + urlOrPath);
                if (callback) callback(null);
                return;
            }
        }
    }
}

// Get list of all installed adapters and controller version on this host
function getInstalledInfo() {
    var result = {};
    var ioPackage = JSON.parse(fs.readFileSync(__dirname + '/../io-package.json'));
    result[ioPackage.common.name] = {
        controller: true,
        version:    ioPackage.common.version,
        icon:       ioPackage.common.extIcon || ioPackage.common.icon,
        title:      ioPackage.common.title,
        desc:       ioPackage.common.desc,
        platform:   ioPackage.common.platform,
        keywords:   ioPackage.common.keywords,
        readme:     ioPackage.common.readme
    };
    var dirs = fs.readdirSync(__dirname + '/../adapter');
    for (var i = 0; i < dirs.length; i++) {
        try {
            if (fs.existsSync(__dirname + '/../adapter/' + dirs[i] + '/io-package.json')) {
                ioPackage = JSON.parse(fs.readFileSync(__dirname + '/../adapter/' + dirs[i] + '/io-package.json'));
                result[ioPackage.common.name] = {
                    controller: false,
                    version:    ioPackage.common.version,
                    icon:       ioPackage.common.extIcon || (ioPackage.common.icon ? '/adapter/' + dirs[i] + '/' + ioPackage.common.icon : ''),
                    title:      ioPackage.common.title,
                    desc:       ioPackage.common.desc,
                    platform:   ioPackage.common.platform,
                    keywords:   ioPackage.common.keywords,
                    readme:     ioPackage.common.readme
                };
            }
        } catch (e) {
            console.log('Cannot read or parse ' + __dirname + '/../adapter/' + dirs[i] + '/io-package.json: ' + e.toString());
        }
    }
    return result;
}

// Get list of all adapters and controller in some repository file or in /conf/source-dist.json
function getRepositoryFile(urlOrPath, callback) {
    var sources = {};
    var path =    '';
    var toRead =  0;

    if (urlOrPath) {
        var parts = urlOrPath.split('/');
        path  = parts.splice(0, parts.length - 1).join('/') + '/';
    }

    // If object was read
    if (urlOrPath && typeof urlOrPath == 'object') {
        if (callback) callback(urlOrPath);
    } else
    if (!urlOrPath) {
        try {
            sources = JSON.parse(fs.readFileSync(__dirname + '/../conf/sources.json'));
        } catch (e) {
            sources = {};
        }
        try {
            var sourcesDist = JSON.parse(fs.readFileSync(__dirname + '/../conf/sources-dist.json'));
            sources = extend(true, sourcesDist, sources);
        } catch (e) {

        }

        for (var name in sources) {
            if (sources[name].url)  sources[name].url  = findPath(path, sources[name].url);
            if (sources[name].meta) sources[name].meta = findPath(path, sources[name].meta);
            if (sources[name].icon) sources[name].icon = findPath(path, sources[name].icon);

            if (!sources[name].version && sources[name].meta) {
                toRead++;
                getJson(sources[name].meta, function (ioPack) {
                    toRead--;
                    if (ioPack && ioPack.common) {
                        sources[ioPack.common.name] = extend(true, sources[ioPack.common.name], ioPack.common);
                    }
                    if (!toRead) {
                        if (callback) callback(sources);
                        callback = null;
                    }
                });
            }
        }

        if (!toRead) {
            if (callback) callback(sources);
        }

    } else {
        getJson(urlOrPath, function (sources) {
            for (var name in sources) {
                if (sources[name].url)  sources[name].url  = findPath(path, sources[name].url);
                if (sources[name].meta) sources[name].meta = findPath(path, sources[name].meta);
                if (sources[name].icon) sources[name].icon = findPath(path, sources[name].icon);

                if (!sources[name].version && sources[name].meta) {
                    toRead++;
                    getJson(sources[name].meta, function (ioPack) {
                        toRead--;
                        if (ioPack && ioPack.common) {
                            sources[ioPack.common.name] = extend(true, sources[ioPack.common.name], ioPack.common);
                        }
                        if (!toRead) {
                            if (callback) callback(sources);
                        }
                    });
                }
            }
        });
    }
}

function sendDiagInfo(obj, callback) {
    request.post({
        url:    'http://download.iobroker.org/diag.php',
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body:    "data=" + JSON.stringify(obj)
    }, function (err, response, body) {
        if (err || !body || response.statusCode != 200) {

        }
    });
}

module.exports.findIPs =               findIPs;
module.exports.rmdirRecursiveSync =    rmdirRecursiveSync;
module.exports.getRepositoryFile =     getRepositoryFile;
module.exports.getFile =               getFile;
module.exports.getJson =               getJson;
module.exports.getInstalledInfo =      getInstalledInfo;
module.exports.sendDiagInfo =          sendDiagInfo;
