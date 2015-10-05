/**
 * @fileOverview restart the ioBroker
 * @author bluefox
 * @version 0.1
 */

/** @module restart */
var fs = require('fs');

function log(text) {
    console.log((new Date()).toString() + text);
}

function killPidsScript(callback) {
    var data = '';

    fs.chmodSync(__dirname + '/../killall.sh', '777');

    var child = require('child_process').spawn(__dirname + '/../killall.sh', []);
    child.stdout.on('data', function (data) {
        data += data.toString().replace('\n', '');
    });
    child.stderr.on('data', function (data) {
        data += data.toString().replace('\n', '');
    });
    child.on('exit', function (exitCode) {
        log('Exit code for "killall.sh": ' + exitCode);
        callback(exitCode, data);
    });
}

function killPid(pid, callback) {
    var data = '';
    var child = require('child_process').spawn('kill', ['-KILL', pid]);
    child.stdout.on('data', function (data) {
        data += data.toString().replace('\n', '');
    });
    child.stderr.on('data', function (data) {
        data += data.toString().replace('\n', '');
    });
    child.on('exit', function (exitCode) {
        log('Exit code for "kill -KILL ' + pid + '": ' + exitCode);
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

if (require('os').platform().match(/^win/) && fs.existsSync(__dirname + '/../_service_ioBroker.bat')) {
    log('Restarting service ioBroker...');

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

    log('Starting ' + __dirname + '/../_service_ioBroker.bat');

    var child = spawn('cmd.exe', ['/c', __dirname + '/../_service_ioBroker.bat'], {
        detached: true,
        stdio: ['ignore', out, err]
    });
    child.unref();
    process.exit();
} else if (!fs.existsSync(__dirname + '/iobroker.pid')) {
    log('ioBroker was started manually or was not running. Please restart it manually.');
} else {
    log('Restarting ioBroker...');

    var daemon = require('daemonize2').setup({
        main: '../controller.js',
        name: "ioBroker controller",
        pidfile:  __dirname + '/iobroker.pid',
        stopTimeout: 1000
    });

    log('Stopping daemon iobroker...');
    daemon.stop(function (err, pid) {
        // force to stop all adapters
        if (fs.existsSync(__dirname + '/../pids.txt')) {
            try {
                var pids = JSON.parse(fs.readFileSync(__dirname + '/../pids.txt').toString());
                killPids(pids, function () {
                    killPidsScript(function () {
                        log('Starting daemon iobroker...');
                        daemon.start(function (err, pid) {
                            log('Daemon iobroker started');
                            process.exit();
                        });
                    });
                });
            } catch (e) {
                log('Error by pids.txt', e);
                log('Starting daemon iobroker...');
                daemon.start(function (err, pid) {
                    log('Daemon iobroker started');
                    process.exit();
                });

            }
        } else {
            log('Starting daemon iobroker...');
            daemon.start(function (err, pid) {
                log('Daemon iobroker started');
                process.exit();
            });
        }
    });
}
