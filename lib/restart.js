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

if (require('os').platform().match(/^win/) && fs.existsSync(__dirname + '/../service_ioBroker.bat')) {
    log('Restarting service ioBroker...');

    var spawn = require('child_process').spawn;
    var out;
    var err;
    if (fs.existsSync(__dirname + '/../../../log')) {
        out = fs.openSync(__dirname + '/../../../log/restart.log', 'a');
    } else {
        out = fs.openSync(__dirname + '/../log/restart.log', 'a');
    }
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
