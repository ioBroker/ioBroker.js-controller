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
        log('Starting daemon iobroker...');
        daemon.start(function (err, pid) {
            log('Daemon iobroker started');
            process.exit();
        });
    });
}
