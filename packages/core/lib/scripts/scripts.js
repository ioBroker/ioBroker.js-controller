const https = require('https');
const fs    = require('fs');
const tools = require('../tools.js');

function httpsGet(link, callback) {
    https.get(link, function (res) {
        const statusCode = res.statusCode;

        if (statusCode !== 200) {
            // consume response data to free up memory
            res.resume();
            callback(statusCode, null, link);
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', function (chunk) {
            rawData += chunk;
        });
        res.on('end', function () {
            callback(null, rawData ? rawData.toString() : null, link);
        });
    }).on('error', function (e) {
        callback(e.message, null, link);
    });
}

const stableURL = 'https://raw.githubusercontent.com/' + tools.appName + '/' + tools.appName + '.repositories/master/sources-dist-stable.json';

function updateVersion(name, callback, _sources) {
    if (!_sources) {
        httpsGet(stableURL, function (err, body) {
            updateVersion(name, callback, JSON.parse(body));
        });
    }
    const cmd = 'npm show ' + tools.appName + '.' + name + ' version';
    const exec = require('child_process').exec;
    let result = '';
    const child = exec(cmd, {windowsHide: true}, (error, stdout, _stderr) => result = stdout);

    child.stderr.pipe(process.stdout);
    child.on('exit', function (code /* , signal */) {
        if (code) {
            console.error('host.' + tools.getHostName() + ' Cannot get version of  ' +  tools.appName + '.' + name + ': ' + code);
            callback(code, _sources, name, null);
        } else {
            _sources[name].version = result;
            callback(null, _sources, name, result);
        }
    });
}

function updateVersions(callback) {
    httpsGet(stableURL, function (err, body) {
        const sources = JSON.parse(body);
        let count = 0;
        for (const name of Object.keys(sources)) {
            if (!sources[name].version) {
                count++;
                updateVersion(name, function () {
                    if (!--count) {
                        callback(sources);
                    }
                }, sources);
            }
        }
        if (!count) {
            callback(sources);
        }
    });
}

// get the sources-dist.json
if (process.argv.indexOf('--prepublish') !== -1) {
    httpsGet(stableURL, function (err, body) {
        if (err || !body) {
            console.error('Cannot read sources file "' + stableURL + '": '  + err);
            process.exit(2);
        } else {
            fs.writeFileSync(__dirname + '/../../conf/sources-dist.json', body);
            process.exit();
        }
    });
}

// update versions for all adapter, which do not have the version
if (process.argv.indexOf('--init') !== -1) {
    updateVersions(function (sources) {
        const file = process.argv.indexOf('--file');
        if (file !== -1 && process.argv[file + 1]) {
            fs.writeFileSync(file, JSON.stringify(sources, null, 2));
        } else {
            console.log(JSON.stringify(sources, null, 2));
        }
    });
}

// update version for one adapter
if (process.argv.indexOf('--update') !== -1) {
    const pos = process.argv.indexOf('--update');
    if (process.argv[pos + 1]) {
        updateVersion(process.argv[pos + 1], function (sources) {
            const file = process.argv.indexOf('--file');
            if (file !== -1 && process.argv[file + 1]) {
                fs.writeFileSync(file, JSON.stringify(sources, null, 2));
            } else {
                console.log(JSON.stringify(sources, null, 2));
            }
        });
    } else {
        console.warn('Pleas specify name of adapter to update: script.js --update admin');
        process.exit(1);
    }
}
