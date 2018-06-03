/* jshint -W097 */
/* jshint strict: false */
/*jslint node: true */
'use strict';

const winston         = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const fs              = require('fs');
const path            = require('path');
const os              = require('os');
const tools           = require(__dirname + '/tools.js');
const hostname        = tools.getHostName();
let SysLog;

try {
    SysLog = require('winston-syslog').Syslog;
} catch (ex) {
    //console.log('No syslog support');
}

const logger = function (level, files, noStdout, prefix) {
    let userOptions = {};
    let options = {
        transports: []
    };

    //var defaultMaxSize;// = 10 * 1024 * 1024;

    if (typeof files === 'string') {
        files = [files];
    }

    files = files || [];

    const isNpm = (__dirname.replace(/\\/g, '/').toLowerCase().indexOf('node_modules/' + tools.appName.toLowerCase() + '.js-controller') !== -1);

    if (typeof level === 'object') {
        userOptions = JSON.parse(JSON.stringify(level));// don't use  Object.assign({}, level); because of deep clone

        level    = userOptions.level;
        prefix   = userOptions.prefix;
        noStdout = userOptions.noStdout;

        if (userOptions.prefix !== undefined) delete userOptions.prefix;

        if (userOptions.transport) {
            let fName = 0;
            for (const f in userOptions.transport) {
                if (!userOptions.transport.hasOwnProperty(f)) continue;
                if (userOptions.transport[f].type === 'file' && userOptions.transport[f].enabled !== false) {

                    userOptions.transport[f].filename = userOptions.transport[f].filename || 'log/' + tools.appName;

                    if (!userOptions.transport[f].fileext && userOptions.transport[f].filename.indexOf('.log') === -1) {
                        userOptions.transport[f].fileext = '.log';
                    }

                    if (!fName) userOptions.transport[f].systemLog = true;

                    userOptions.transport[f].handleExceptions = false;
                    userOptions.transport[f].name        = !fName ? tools.appName : 'dailyRotateFile' + fName;
                    fName++;
                    userOptions.transport[f].filename    = userOptions.transport[f].filename.replace(/\\/g, '/');
                    if (userOptions.transport[f].filename.match(/^\w:\/|^\//)) {
                        userOptions.transport[f].filename = path.normalize(userOptions.transport[f].filename);
                    } else {
                        userOptions.transport[f].filename = path.normalize(__dirname + (isNpm ? '/../../../' : '/../') + userOptions.transport[f].filename);
                    }

                    userOptions.transport[f].label       = prefix || '';
                    userOptions.transport[f].level       = userOptions.transport[f].level || level;
                    userOptions.transport[f].json        = (userOptions.transport[f].json      !== undefined) ? userOptions.transport[f].json      : false;
                    userOptions.transport[f].silent      = (userOptions.transport[f].silent    !== undefined) ? userOptions.transport[f].silent    : false;
                    userOptions.transport[f].colorize    = (userOptions.transport[f].colorize  !== undefined) ? userOptions.transport[f].colorize  : ((userOptions.colorize  === undefined) ? true : userOptions.colorize);
                    userOptions.transport[f].localTime   = (userOptions.transport[f].localTime !== undefined) ? userOptions.transport[f].localTime : ((userOptions.localTime === undefined) ? true : userOptions.localTime);
//                    userOptions.transport[f].maxsize   = (userOptions.transport[f].maxsize   !== undefined) ? userOptions.transport[f].maxsize   : defaultMaxSize;
                    userOptions.transport[f].timestamp   = timestamp;
                    userOptions.transport[f].datePattern = '.yyyy-MM-dd' + (userOptions.transport[f].fileext || '');
                    /*userOptions.transport[f].logException = function (message, info, next, err) {
                        console.error(message);
                    };*/

                    const _log = new DailyRotateFile(userOptions.transport[f]);
                    options.transports.push(_log);
                } else if (userOptions.transport[f].type === 'syslog' && userOptions.transport[f].enabled !== false) {
                    if (!SysLog) {
                        console.error('Syslog configured, but not installed!');
                        continue;
                    }
                    // host: The host running syslogd, defaults to localhost.
                    // port: The port on the host that syslog is running on, defaults to syslogd's default port.
                    // protocol: The network protocol to log over (e.g. tcp4, udp4, unix, unix-connect, etc).
                    // path: The path to the syslog dgram socket (i.e. /dev/log or /var/run/syslog for OS X).
                    // pid: PID of the process that log messages are coming from (Default process.pid).
                    // facility: Syslog facility to use (Default: local0).
                    // localhost: Host to indicate that log messages are coming from (Default: localhost).
                    // sysLogType: The type of the syslog protocol to use (Default: BSD).
                    // app_name: The name of the application (Default: process.title).
                    // eol: The end of line character to be added to the end of the message (Default: Message without modifications).
                    // replace the used by syslog attribute "type" with own "sysLogType"

                    // If no name defined, use hostname as name
                    userOptions.transport[f].localhost = userOptions.transport[f].localhost || hostname;

                    if (userOptions.transport[f].sysLogType) {
                        userOptions.transport[f].type = userOptions.transport[f].sysLogType;
                        delete userOptions.transport[f].sysLogType;
                    } else {
                        delete userOptions.transport[f].type;
                    }
                    try {
                        options.transports.push(new SysLog(userOptions.transport[f]));
                    } catch (err) {
                        console.log('Cannot activate syslog: ' + err);
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < files.length; i++) {
            const opt = {
                name:         !i ? tools.appName : 'dailyRotateFile' + i,
                filename:     path.normalize(isNpm ? __dirname + '/../../../log/' + files[i] : __dirname + '/../log/' + files[i]),
                datePattern:  '.yyyy-MM-dd.log',
                json:         false,  // If true, messages will be logged as JSON (default true).
                level:        level,
                silent:       false,
                localTime:    true,
                colorize:     (userOptions.colorize === undefined) ? true : userOptions.colorize,
                timestamp:    timestamp,
                label:        prefix || '',
                handleExceptions: false
                //maxsize:      defaultMaxSize
            };

            options.transports.push(new DailyRotateFile(opt));
        }
    }

    if (!noStdout) {
        options.transports.push(new winston.transports.Console({
            level:     level,
            silent:    false,
            colorize:  (userOptions.colorize === undefined) ? true : userOptions.colorize,
            timestamp: timestamp,
            label:     prefix || ''
        }));
    }

    const log = new winston.Logger(options);

    log.getFileName = function () {
        if (this.transports && this.transports[tools.appName]) {
            if (this.transports[tools.appName].filename) {
                return this.transports[tools.appName].dirname + '/' + this.transports[tools.appName].filename;
            } else if (this.transports[tools.appName]._getFilename) {
                return this.transports[tools.appName].dirname + '/' + this.transports[tools.appName]._getFilename();
            } else {
                return '';
            }
        } else {
            return '';
        }
    };

    log.activateDateChecker = function (isEnabled, daysCount) {
        if (!isEnabled && this._fileChecker) {
            clearInterval(this._fileChecker);
        } else if (isEnabled && !this._fileChecker) {
            if (!daysCount) daysCount = 3;

            // Check every hour
            this._fileChecker = setInterval(() => {
                if (this.transports[tools.appName] && fs.existsSync(this.transports[tools.appName].dirname)) {
                    const files = fs.readdirSync(this.transports[tools.appName].dirname);
                    const for3days = new Date();
                    for3days.setDate(for3days.getDate() - daysCount);

                    for (let i = 0; i < files.length; i++) {
                        const match = files[i].match(/.+\.(\d+-\d+-\d+)/);
                        if (match) {
                            const date = new Date(match[1]);
                            if (date < for3days) {
                                // delete file
                                try {
                                    this.transports[tools.appName].log('info', 'host.' + hostname + ' Delete log file ' + files[i]);
                                    fs.unlinkSync(this.transports[tools.appName].dirname + '/' + files[i]);
                                } catch (e) {
									// there is a bug under windows, that file stays opened and cannot be deleted
									this.log(os.platform().match(/^win/) ? 'info' : 'error', 'host.' + hostname + ' Cannot delete file "' + path.normalize(this.transports[tools.appName].dirname + '/' + files[i]) + '": ' + e);
                                }
                            }
                        }
                    }
                }
            }, 3600000); // every hour
        }
    };

    winston.unhandleExceptions();

    return log;
};

function timestamp() {
    const ts = new Date();
    let result = ts.getFullYear() + '-';

    /** @type {number | string} */
    let value = ts.getMonth() + 1;
    if (value < 10) value = '0' + value;
    result += value + '-';

    value = ts.getDate();
    if (value < 10) value = '0' + value;
    result += value + ' ';

    value = ts.getHours();
    if (value < 10) value = '0' + value;
    result += value + ':';

    value = ts.getMinutes();
    if (value < 10) value = '0' + value;
    result += value + ':';

    value = ts.getSeconds();
    if (value < 10) value = '0' + value;
    result += value + '.';


    value = ts.getMilliseconds();
    if (value < 10) {
        value = '00' + value;
    } else
    if (value < 100) {
        value = '0' + value;
    }

    result += value + ' ';

    return result;
}

module.exports = logger;







