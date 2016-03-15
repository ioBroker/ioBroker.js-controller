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
                    if (err) {
                        console.error('Cannot save file "' + destination + name + '.svg:' + err);
                    }
                    setTimeout(function () {
                        getImages(list, destination, callback);
                    }, 100);
                });
            } else {
                console.error('Cannot get URL "' + 'http://img.shields.io/npm/v/iobroker.' + name + '.svg?style=flat-square:' + err);
                setTimeout(function () {
                    getImages(list, destination, callback);
                }, 100);
            }
        });
    }
}

tools.getRepositoryFile('https://raw.githubusercontent.com/' + tools.appName + '/' + tools.appName + '.js-controller/master/conf/sources-dist.json', function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    var output  = false;
    var waitEnd = 0;
    for (var a = 0; a < process.argv.length; a++) {
        if (process.argv[a] == '--file' && process.argv[a + 1]) {
            fs.writeFileSync(process.argv[a + 1], JSON.stringify(data, null, 2));
            output = true;
        }
        if (process.argv[a] == '--json') {
            console.log(JSON.stringify(data, null, 2));
            output = true;
        }
        if (process.argv[a] == '--versions') {
            for (var a in data) {
                console.log(count + '. ' + a + ': ' + data[a].version);
            }
            output = true;
        }
        if (process.argv[a] == '--list') {
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
        if (process.argv[a] == '--shortlist') {
            for (var a in data) {
                console.log(a);
            }
            output = true;
        }
        if (process.argv[a] == '--shields' && process.argv[a + 1]) {
            if (process.argv[a + 1][process.argv[a + 1].length - 1] != '/') {
                process.argv[a + 1] += '/';
            }
            var list = [];
            for (var i in data) {
                list.push(i);
            }
            waitEnd++;
            if (!fs.existsSync(process.argv[a + 1])) fs.mkdirSync(process.argv[a + 1]);

            getImages(list, process.argv[a + 1], function () {
                if (!--waitEnd) process.exit();
            });
        }
    }
    if (!output) console.log(JSON.stringify(data, null, 2));
    if (!waitEnd) process.exit();
});