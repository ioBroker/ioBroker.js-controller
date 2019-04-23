/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
/* jslint esversion: 6 */
'use strict';

const winston         = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const fs              = require('fs');
const path            = require('path');
const os              = require('os');
const tools           = require('./tools.js');
const hostname        = tools.getHostName();
const Transport       = require('winston-transport');
const {LEVEL}         = require('triple-beam');

let SysLog;
try {
    SysLog = require('winston-syslog').Syslog;

} catch (ex) {
    //console.log('No syslog support');
}

class IoSysLog extends SysLog {
    constructor(options) {
        super(options);
    }

    log(info, callback) {
        // we need to map the ioBroker loglevels to the Syslog ones
        const ioInfo = info;
        if (ioInfo[LEVEL] === 'warn') ioInfo[LEVEL] = 'warning';
        if (ioInfo[LEVEL] === 'info') ioInfo[LEVEL] = 'notice';
        if (ioInfo[LEVEL] === 'debug') ioInfo[LEVEL] = 'info';
        if (ioInfo[LEVEL] === 'silly') ioInfo[LEVEL] = 'debug';
        super.log(ioInfo, callback);
    }
}

class NotifierTransport extends Transport {
    constructor(opts) {
        super(opts);
        this.name = 'NT'; // NotifierTransport
    }

    log(info, callback) {
        const msg = {
            severity: info[LEVEL],
            ts: new Date(info.timestamp).getTime(),
            message: info.message
        };
        setImmediate(() => this.emit('logged', msg));
        callback();
    }
}

const logger = function (level, files, noStdout, prefix) {
    let userOptions = {};
    const options = {
        transports: []
    };

    //var defaultMaxSize;// = 10 * 1024 * 1024;

    if (typeof files === 'string') {
        files = [files];
    }

    const formatter = info =>
        `${timestamp(info.timestamp)} - ${info.level}: ${info.message}`;

    files = files || [];

    const isNpm = (__dirname.replace(/\\/g, '/').toLowerCase().indexOf('node_modules/' + tools.appName.toLowerCase() + '.js-controller') !== -1);

    if (typeof level === 'object') {
        userOptions = JSON.parse(JSON.stringify(level));// don't use  Object.assign({}, level); because of deep clone

        level    = userOptions.level;
        prefix   = userOptions.prefix;
        noStdout = userOptions.noStdout;

        const winstonFormats = [];
        winstonFormats.push(winston.format.timestamp({format: timestamp}));
        if (userOptions.json === undefined || userOptions.json) {
            winstonFormats.push(winston.format.json());
        }
        if (prefix) {
            winstonFormats.push(winston.format.label({ label: prefix }));
        }
        if (userOptions.colorize === undefined || userOptions.colorize) {
            winstonFormats.push(winston.format.colorize());
        }
        options.format = winston.format.combine.apply(null, winstonFormats);

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
                        let _path = path.normalize(__dirname + (isNpm ? '/../../../' : '/../') + userOptions.transport[f].filename);
                        if (_path.indexOf('js-controller') !== -1) {
                            _path = path.normalize(__dirname + '/../../' + userOptions.transport[f].filename);
                        }

                        userOptions.transport[f].filename = _path;
                    }
                    userOptions.transport[f].filename += '.%DATE%' + (userOptions.transport[f].fileext || '');
                    //userOptions.transport[f].label       = prefix || ''; //TODO format.label()
                    userOptions.transport[f].level       = userOptions.transport[f].level || level;
                    //                    userOptions.transport[f].json        = (userOptions.transport[f].json      !== undefined) ? userOptions.transport[f].json      : false; // TODO format.json(), new Default!!
                    userOptions.transport[f].silent      = (userOptions.transport[f].silent    !== undefined) ? userOptions.transport[f].silent    : false;
                    //                    userOptions.transport[f].colorize    = (userOptions.transport[f].colorize  !== undefined) ? userOptions.transport[f].colorize  : ((userOptions.colorize  === undefined) ? true : userOptions.colorize); //TODO format.colorize()
                    userOptions.transport[f].localTime   = (userOptions.transport[f].localTime !== undefined) ? userOptions.transport[f].localTime : ((userOptions.localTime === undefined) ? true : userOptions.localTime);
                    userOptions.transport[f].datePattern = 'YYYY-MM-DD';
                    userOptions.transport[f].format = winston.format.combine(winston.format.printf(formatter));
                    /*userOptions.transport[f].logException = function (message, info, next, err) {
                        console.error(message);
                    };*/

                    const _log = new DailyRotateFile(userOptions.transport[f]);
                    options.transports.push(_log);
                } else if (userOptions.transport[f].type === 'syslog' && userOptions.transport[f].enabled !== false) {
                    if (!SysLog) {
                        console.error('Syslog configured, but not installed! Ignore');
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
                    userOptions.transport[f].format = winston.format.combine(winston.format.printf(formatter));
                    if (userOptions.transport[f].sysLogType) {
                        userOptions.transport[f].type = userOptions.transport[f].sysLogType;
                        delete userOptions.transport[f].sysLogType;
                    } else {
                        delete userOptions.transport[f].type;
                    }
                    try {
                        options.transports.push(new IoSysLog(userOptions.transport[f]));
                    } catch (err) {
                        console.log('Cannot activate Syslog: ' + err);
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
                //json:         false,  // If true, messages will be logged as JSON (default true). TODO format.json()
                level:        level,
                silent:       false,
                localTime:    true,
                //colorize:     (userOptions.colorize === undefined) ? true : userOptions.colorize, // TODO format.colorize()
                //timestamp:    timestamp, // TODO: format.timestamp()
                //label:        prefix || '', // TODO format.label()
                handleExceptions: false
                //maxsize:      defaultMaxSize
            };

            options.transports.push(new DailyRotateFile(opt));
        }
    }

    if (!noStdout) {
        options.transports.push(new winston.transports.Console({
            level:  level,
            silent: false,
            format: winston.format.combine(winston.format.printf(formatter))
            //colorize:  (userOptions.colorize === undefined) ? true : userOptions.colorize, // TODO format.colorize()
            //timestamp: timestamp, // TODO: format.timestamp()
            //label:     prefix || '' // TODO format.label()
        }));
    }
    options.transports.push(new NotifierTransport());

    const log = winston.createLogger(options);

    log.getFileName = function () {
        let transport = this.transports.find(t => (t.transport && t.transport.dirname) || t.dirname);
        if (transport) {
            transport = transport.transport ? transport.transport : transport;
            return transport.dirname + '/' + transport.filename.replace('%DATE%', getDate());
        } else {
            return '';
        }
    };

    // This cannot be deleted, because file rotate works with the size of files and not with the time
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

    //winston.unhandleExceptions();
    //log.unexceptions.handle();

    return log;
};

function getDate() {
    const ts = new Date();
    let result = ts.getFullYear() + '-';
    /** @type {number | string} */
    let value = ts.getMonth() + 1;
    if (value < 10) value = '0' + value;
    result += value + '-';

    value = ts.getDate();
    if (value < 10) value = '0' + value;
    result += value;
    return result;
}

function timestamp(date) {
    const ts = date ? new Date(date) : new Date();
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
