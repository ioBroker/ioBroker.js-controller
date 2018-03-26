/**
 * @fileOverview restart the controller
 * @author bluefox
 * @version 0.1
 */
'use strict';

/** @module restart */
var fs    = require('fs');
var tools = require(__dirname + '/tools.js');

var logFile;
try {
    var dir = __dirname + '/../' + tools.getDefaultDataDir() + '../log';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    logFile = dir + '/restart.log';
    console.log(require('path').normalize(logFile));
    if (fs.existsSync(logFile)) fs.unlinkSync(logFile);
    fs.writeFileSync(logFile, 'started\n');
} catch (err) {
    console.error(err);
}

function log(text) {
    var t = (new Date()).toString() + text;
    console.log(t);
    fs.appendFileSync(logFile, t + '\n');
}

function checkRoot(callback) {
    var data = '';

    var child = require('child_process').spawn('whoami', []);
    child.stdout.on('data', function (text) {
        data += text.toString().replace('\n', '');
    });
    child.stderr.on('data', function (text) {
        data += text.toString().replace('\n', '');
    });
    child.on('exit', function (exitCode) {
        callback(data.trim() == 'root');
    });
}

function killPidsScript(callback) {
    checkRoot(function (isRoot) {
        var data = '';

        try {
            fs.chmodSync(__dirname + '/../killall.sh', '777');

            if (isRoot) {
                fs.writeFileSync(__dirname + '/../killall.sh', "sudo pgrep -f '^io.*' | sudo xargs kill -9\nsudo pgrep -f '^node-red*' | sudo xargs kill -9");
            } else {
                fs.writeFileSync(__dirname + '/../killall.sh', "pgrep -f '^io.*' | xargs kill -9\pgrep -f '^node-red*' | xargs kill -9");
            }

            var child = require('child_process').spawn(__dirname + '/../killall.sh', []);
            child.stdout.on('data', function (text) {
                data += text.toString().replace('\n', '');
            });
            child.stderr.on('data', function (text) {
                data += text.toString().replace('\n', '');
            });
            child.on('exit', function (exitCode) {
                if (exitCode) log('Exit code for "killall.sh": ' + exitCode);
                callback(exitCode, data);
            });
        } catch (e) {
            log('Cannot create "' + __dirname + '/../killall.sh"');
            callback(-1);
        }
    });
}

function killPid(pid, callback) {
    var data = '';
    var child = require('child_process').spawn('kill', ['-KILL', pid]);
    child.stdout.on('data', function (text) {
        data += text.toString().replace('\n', '');
    });
    child.stderr.on('data', function (text) {
        data += text.toString().replace('\n', '');
    });
    child.on('exit', function (exitCode) {
        if (exitCode) log('Exit code for "kill -KILL ' + pid + '": ' + exitCode);
        callback(exitCode, data);
    });
}

function killPids(pids, callback) {
     if (pids && pids.length) {
         killPid(pids.pop(), function () {
             killPids(pids, callback);
         });
     } else {
         callback();
     }
}

if (require('os').platform().match(/^win/) && fs.existsSync(__dirname + '/../_service_' + tools.appName + '.bat')) {
    log('Restarting service ' + tools.appName + '...');

    var spawn = require('child_process').spawn;
    var out;
    var err;
    var stat;
    var fileName;

    if (fs.existsSync(__dirname + '/../../../log')) {
        fileName = __dirname + '/../../../log/restart.log';
    } else {
        fileName = __dirname + '/../log/restart.log';
    }

    stat = fs.statSync(fileName);
    if (stat.size > 1024 * 1024) {
        try {
            fs.unlinkSync(fileName);
        } catch (e) {
            console.log('File is too big, but cannot delete restart.log: ' + e.toString());
        }
    }

    out = fs.openSync(fileName, 'a');

    err = out;

    log('Starting ' + __dirname + '/../_service_' + tools.appName + '.bat');

    var child = spawn('cmd.exe', ['/c', __dirname + '/../_service_' + tools.appName + '.bat'], {
        detached: true,
        stdio: ['ignore', out, err]
    });
    child.unref();
    process.exit();
} else if (!fs.existsSync(__dirname + '/' + tools.appName + '.pid')) {
    log(tools.appName + ' was started manually or was not running. Please restart it manually.');
} else {
    log('Restarting ' + tools.appName + '...');

    var daemon = require('daemonize2').setup({
        main:       '../controller.js',
        name:       tools.appName + ' controller',
        pidfile:     __dirname + '/' + tools.appName + '.pid',
        stopTimeout: 5000
    });

    log('Stopping daemon ' + tools.appName + '...');
    daemon.stop(function (err, pid) {
        // force to stop all adapters
        if (fs.existsSync(__dirname + '/../pids.txt')) {
            try {
                var pids = JSON.parse(fs.readFileSync(__dirname + '/../pids.txt').toString());
                killPids(pids, function () {
                    killPidsScript(function () {
                        log('Starting daemon ' + tools.appName + '...');
                        daemon.start(function (err, pid) {
                            log('Daemon ' + tools.appName + ' started');
                            process.exit();
                        });
                    });
                });
            } catch (e) {
                log('Error by pids.txt: ' + e);
                log('Starting daemon ' + tools.appName + '...');
                daemon.start(function (err, pid) {
                    log('Daemon ' + tools.appName + ' started');
                    process.exit();
                });

            }
        } else {
            log('Starting daemon ' + tools.appName + '...');
            daemon.start(function (err, pid) {
                log('Daemon ' + tools.appName + ' started');
                process.exit();
            });
        }
    });
}
