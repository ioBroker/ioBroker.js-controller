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
        } catch(e) {
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

function findPath(path, url) {
    if (url.substring(0, 'http://'.length) == 'http://' ||
        url.substring(0, 'https://'.length) == 'https://') {
        return url;
    } else {
        if (path.substring(0, 'http://'.length) == 'http://' ||
            path.substring(0, 'https://'.length) == 'https://') {
            return path + url;
        } else {
            return __dirname + '/../' + path + url;
        }
    }
}

function getRepositoryFile(urlOrPath, callback) {
    var sources = {};
    var path = "";

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
            console.log('/conf/sources.json does not exits - ignore');
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
        }

        if (callback) callback(sources);
    } else {
        getJson(urlOrPath, function (sources) {
            for (var name in sources) {
                if (sources[name].url)  sources[name].url  = findPath(path, sources[name].url);
                if (sources[name].meta) sources[name].meta = findPath(path, sources[name].meta);
                if (sources[name].icon) sources[name].icon = findPath(path, sources[name].icon);
            }
            if (callback) callback(sources);
        });
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
                } catch(e) {
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
                }catch(e) {
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
                }catch(e) {
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

function getInstalledInfo() {
    var result = {};
    var ioPackage = require(__dirname + '/../io-package.json');
    result[ioPackage.common.name] = {controller: true, version: ioPackage.common.version};
    var dirs = fs.readdirSync(__dirname + '/../adapter');
    for (var i = 0; i < dirs.length; i++) {
        if (fs.existsSync(__dirname + '/../adapter/' + dirs[i] + '/io-package.json')) {
            ioPackage = require(__dirname + '/../adapter/' + dirs[i] + '/io-package.json');
            result[ioPackage.common.name] = {controller: false, version: ioPackage.common.version};
        }
    }
    return result;
}

module.exports.findIPs =               findIPs;
module.exports.rmdirRecursiveSync =    rmdirRecursiveSync;
module.exports.getRepositoryFile =     getRepositoryFile;
module.exports.getFile =               getFile;
module.exports.getJson =               getJson;
module.exports.getInstalledInfo =      getInstalledInfo;