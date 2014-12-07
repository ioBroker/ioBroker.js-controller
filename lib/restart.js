/**
 * @fileOverview restart the ioBroker
 * @author bluefox
 * @version 0.1
 */

/** @module restart */
var fs = require('fs');

if (require('os').platform().match(/^win/) && fs.existsSync(__dirname + "/../service_ioBroker.bat")) {
    console.log('Restarting service ioBroker...');


    var spawn = require('child_process').spawn;
    var out = fs.openSync(__dirname + '../log/restart.log', 'a');
    var err = fs.openSync(__dirname + '../log/restart.log', 'a');

    console.log('Starting ../service_ioBroker.bat');

    var child = spawn('start', ['../service_ioBroker.bat'], {
        detached: true,
        stdio: ['ignore', out, err]
    });
    child.unref();
    process.exit();
} else if (!fs.existsSync(__dirname + "/iobroker.pid")) {
    console.log('ioBroker was started manually or was not running. Please restart it manually.');
} else {
    console.log('Restarting ioBroker...');

    var daemon = require("daemonize2").setup({
        main: "../controller.js",
        name: "ioBroker controller",
        pidfile:  __dirname + "/iobroker.pid",
        stopTimeout: 1000
    });
    console.log('Stopping daemon iobroker...');
    daemon.stop(function (err, pid) {
        console.log('Starting daemon iobroker...');
        daemon.start(function (err, pid) {
            console.log('Daemon iobroker started');
            process.exit();
        });
    });
}
