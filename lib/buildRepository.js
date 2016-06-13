// This help script creates repository with full information
// additionally it can collect all the npm version images in some folder
// Usage:
//  --file fileName - Output of repository into specified file
//  --json - Print json repository in the console
//  --versions - show all current versions in the console
//  --list - list of all adapters with descriptions in the console
//          1. admin: Opens a webserver for the ioBroker admin UI
//          2. artnet: Control DMX512 Devices via an Art-Net node
//          ...
//  --shortlist - print list of all adapters in the console
//          admin
//          artnet
//          b-control-em
//          chromecast
//          ...
//  --shields folderName - save all npm versions images into specified folder
//  --logos folderName - save all logos of all adapters into specified folder under logo-adapter.png

var tools   = require(__dirname + '/tools.js');
var fs      = require('fs');
var request = require('request');

function getImages(list, destination, callback) {
    if (!list || !list.length) {
        callback && callback();
    } else {
        var name = list.pop();
        request.get({url: 'http://img.shields.io/npm/v/iobroker.' + name + '.svg?style=flat-square', encoding: 'binary'}, function (error, response, body) {
            if (!error && body) {
                fs.writeFile(destination + name + '.svg', body, 'binary', function (err) {
                    if (err) console.error('Cannot save file "' + destination + name + '.svg:' + err);

                    setTimeout(function () {
                        getImages(list, destination, callback);
                    }, 100);
                });
            } else {
                console.error('Cannot get URL "http://img.shields.io/npm/v/iobroker.' + name + '.svg?style=flat-square: ' + error);
                setTimeout(function () {
                    getImages(list, destination, callback);
                }, 100);
            }
        });
    }
}
function getLicenses(list, destination, callback) {
    if (!list || !list.length) {
        callback && callback();
    } else {
        var name = list.pop();
        request.get({url: 'https://img.shields.io/github/license/' + name + '.svg?style=flat-square', encoding: 'binary'}, function (error, response, body) {
            if (!error && body) {
                fs.writeFile(destination + 'license-' + name + '.svg', body, 'binary', function (err) {
                    if (err) {
                        console.error('Cannot save file "' + destination + 'license-' + name + '.svg:' + err);
                    }
                    setTimeout(function () {
                        getLicenses(list, destination, callback);
                    }, 100);
                });
            } else {
                console.error('Cannot get URL "https://img.shields.io/github/license/' + name + '.svg?style=flat-square: ' + error);
                setTimeout(function () {
                    getLicenses(list, destination, callback);
                }, 100);
            }
        });
    }
}

function getLogos(list, destination, callback) {
    if (!list || !list.length) {
        callback && callback();
    } else {
        var task = list.pop();
        request.get({url: task.url, encoding: 'binary'}, function (error, response, body) {
            if (!error && body) {
                fs.writeFile(destination + task.name, body, 'binary', function (err) {
                    if (err) {
                        console.error('Cannot save file "' + destination + task.name + ':' + err);
                    }
                    setTimeout(function () {
                        getLogos(list, destination, callback);
                    }, 100);
                });
            } else {
                console.error('Cannot get URL "' + task.url + ':' + error);
                setTimeout(function () {
                    getLogos(list, destination, callback);
                }, 100);
            }
        });
    }
}

function processRepository(data, argv, cb) {
    var output  = false;
    var waitEnd = 0;
    for (var a = 0; a < argv.length; a++) {
        if (argv[a] == '--file' && argv[a + 1]) {
            if (data && typeof data === 'object' && data.admin) {
                fs.writeFileSync(argv[a + 1], JSON.stringify(data, null, 2));
            } else {
                console.error('Cannot get repository');
            }
            output = true;
        }
        if (argv[a] == '--json') {
            console.log(JSON.stringify(data, null, 2));
            output = true;
        }
        if (argv[a] == '--versions') {
            for (var a in data) {
                console.log(count + '. ' + a + ': ' + data[a].version);
            }
            output = true;
        }
        if (argv[a] == '--list') {
            var count = 1;
            for (var a in data) {
                if (typeof data[a].desc == 'object') {
                    console.log(count + '. ' + a + ': ' + data[a].desc.en);
                } else
                    console.log(count + '. ' + a + ': ' + data[a].desc);

                count++;
            }
            output = true;
        }
        if (argv[a] == '--shortlist') {
            for (var a in data) {
                console.log(a);
            }
            output = true;
        }
        if (argv[a] == '--shields' && argv[a + 1]) {
            if (argv[a + 1][argv[a + 1].length - 1] != '/') {
                argv[a + 1] += '/';
            }
            var list = [];
            for (var i in data) {
                list.push({name: i, meta: data[i].meta});
            }
            waitEnd++;
            if (!fs.existsSync(argv[a + 1])) fs.mkdirSync(argv[a + 1]);

            getImages(list, argv[a + 1], function () {
                if (!--waitEnd && cb) cb();
            });
        }
        if (argv[a] == '--logos' && argv[a + 1]) {
            if (argv[a + 1][argv[a + 1].length - 1] != '/') {
                argv[a + 1] += '/';
            }
            var list = [];
            for (var i in data) {
                list.push({url: data[i].extIcon, name: 'logo-' + i.toLowerCase() + '.png'});
            }
            waitEnd++;
            if (!fs.existsSync(argv[a + 1])) fs.mkdirSync(argv[a + 1]);

            getLogos(list, argv[a + 1], function () {
                if (!--waitEnd && cb) cb();
            });
        }
        if (argv[a] == '--licenses' && argv[a + 1]) {
            if (argv[a + 1][argv[a + 1].length - 1] != '/') {
                argv[a + 1] += '/';
            }
            var list = [];
            for (var i in data) {
                // process: https://raw.githubusercontent.com/ioBroker/ioBroker.socketio/master/io-package.json
                var parts = data.meta.split('/');
                
                list.push(parts[3] + '/' + parts[4]);
            }
            waitEnd++;
            if (!fs.existsSync(argv[a + 1])) fs.mkdirSync(argv[a + 1]);

            getLicenses(list, argv[a + 1], function () {
                if (!--waitEnd && cb) cb();
            });
        }
    }
    if (!output) console.log(JSON.stringify(data, null, 2));
    if (!waitEnd && cb) cb();
}

if (module.exports && module.parent) {
    module.exports.getLogos          = getLogos;
    module.exports.getImages         = getImages;
    module.exports.processRepository = processRepository;
} else {
    tools.getRepositoryFile('https://raw.githubusercontent.com/' + tools.appName + '/' + tools.appName + '.js-controller/master/conf/sources-dist.json', function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        processRepository(data, process.argv, function () {
            process.exit();
        });
    });
}