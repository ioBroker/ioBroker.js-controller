/**
 * @fileOverview restart the controller
 * @author bluefox
 * @version 0.1
 */
'use strict';

/** @module restart */
const fs    = require('fs-extra');
const tools = require('./tools.js');

let logFile;
try {
    const dir = __dirname + '/../' + tools.getDefaultDataDir() + '../log';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    logFile = dir + '/restart.log';
    console.log(require('path').normalize(logFile));
    if (fs.existsSync(logFile)) {
        fs.unlinkSync(logFile);
    }
    fs.writeFileSync(logFile, 'started\n');
} catch (err) {
    console.error(err);
}

function log(text) {
    const t = new Date().toString() + text;
    console.log(t);
    fs.appendFileSync(logFile, t + '\n');
}

function checkRoot(callback) {
    let data = '';

    const child = require('child_process').spawn('whoami', [], {windowsHide: true});
    child.stdout.on('data', text => data += text.toString().replace(/\n/g, ''));
    child.stderr.on('data', text => data += text.toString().replace(/\n/g, ''));
    child.on('exit', _exitCode => callback(data.trim() === 'root'));
}

function killPidsScript(callback) {
    checkRoot(isRoot => {
        let data = '';

        try {
            fs.chmodSync(__dirname + '/../killall.sh', '777');

            if (isRoot) {
                fs.writeFileSync(__dirname + '/../killall.sh', "sudo pgrep -f '^io.*' | sudo xargs kill -9\nsudo pgrep -f '^node-red*' | sudo xargs kill -9");
            } else {
                fs.writeFileSync(__dirname + '/../killall.sh', "pgrep -f '^io.*' | xargs kill -9\npgrep -f '^node-red*' | xargs kill -9");
            }

            const child = require('child_process').spawn(__dirname + '/../killall.sh', [], {windowsHide: true});
            child.stdout.on('data', text => data += text.toString().replace(/\n/g, ''));
            child.stderr.on('data', text => data += text.toString().replace(/\n/g, ''));
            child.on('exit', exitCode => {
                if (exitCode) {
                    log('Exit code for "killall.sh": ' + exitCode);
                }
                callback(exitCode, data);
            });
        } catch (e) {
            log('Cannot create "' + __dirname + '/../killall.sh"');
            callback(-1);
        }
    });
}

function killPid(pid, callback) {
    let data = '';
    const child = require('child_process').spawn('kill', ['-KILL', pid], {windowsHide: true});
    child.stdout.on('data', text => data += text.toString().replace(/\n/g, ''));
    child.stderr.on('data', text => data += text.toString().replace(/\n/g, ''));
    child.on('exit', exitCode => {
        if (exitCode) {
            log('Exit code for "kill -KILL ' + pid + '": ' + exitCode);
        }
        callback(exitCode, data);
    });
}

function killPids(pids, callback) {
    if (pids && pids.length) {
        killPid(pids.pop(), () => killPids(pids, callback));
    } else {
        callback();
    }
}

if (require('os').platform().match(/^win/) && fs.existsSync(__dirname + '/../_service_' + tools.appName + '.bat')) {
    log('Restarting service ' + tools.appName + '...');

    const spawn = require('child_process').spawn;
    let fileName;

    if (fs.existsSync(__dirname + '/../../../log')) {
        fileName = __dirname + '/../../../log/restart.log';
    } else {
        fileName = __dirname + '/../log/restart.log';
    }

    const stat = fs.statSync(fileName);
    if (stat.size > 1024 * 1024) {
        try {
            fs.unlinkSync(fileName);
        } catch (e) {
            console.log('File is too big, but cannot delete restart.log: ' + e.toString());
        }
    }

    const out = fs.openSync(fileName, 'a');

    const err = out;

    log('Starting ' + __dirname + '/../_service_' + tools.appName + '.bat');

    const child = spawn('cmd.exe', ['/c', __dirname + '/../_service_' + tools.appName + '.bat'], {
        detached: true,
        stdio: ['ignore', out, err],
        windowsHide: true
    });
    child.unref();
    process.exit();
} else if (!fs.existsSync(__dirname + '/' + tools.appName + '.pid')) {
    log(tools.appName + ' was started manually or was not running. Please restart it manually.');
} else {
    log('Restarting ' + tools.appName + '...');

    const daemon = require('daemonize2').setup({
        main:       '../controller.js',
        name:       tools.appName + ' controller',
        pidfile:     __dirname + '/' + tools.appName + '.pid',
        stopTimeout: 5000
    });

    log('Stopping daemon ' + tools.appName + '...');
    daemon.stop((_err, _pid) => {
        // force to stop all adapters
        if (fs.existsSync(__dirname + '/../pids.txt')) {
            try {
                const pids = fs.readJSONSync(__dirname + '/../pids.txt');
                killPids(pids, () => {
                    killPidsScript(() => {
                        log('Starting daemon ' + tools.appName + '...');
                        daemon.start((_err, _pid) => {
                            log('Daemon ' + tools.appName + ' started');
                            process.exit();
                        });
                    });
                });
            } catch (e) {
                log('Error by pids.txt: ' + e);
                log('Starting daemon ' + tools.appName + '...');
                daemon.start((_err, _pid) => {
                    log('Daemon ' + tools.appName + ' started');
                    process.exit();
                });

            }
        } else {
            log('Starting daemon ' + tools.appName + '...');
            daemon.start((_err, _pid) => {
                log('Daemon ' + tools.appName + ' started');
                process.exit();
            });
        }
    });
}
