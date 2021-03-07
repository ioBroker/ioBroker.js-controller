/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
/* jslint esversion: 6 */
'use strict';

const winston          = require('winston');
const DailyRotateFile  = require('winston-daily-rotate-file');
const fs               = require('fs');
const path             = require('path');
const os               = require('os');
const tools            = require('./tools.js');
const hostname         = tools.getHostName();
const Transport        = require('winston-transport');
const {LEVEL}          = require('triple-beam');
const deepClone        = require('deep-clone');

let SysLog;
try {
    SysLog = require('winston-syslog').Syslog;
} catch {
    //console.log('No syslog support');
}

let Seq;
try {
    Seq = require('winston-seq-updated').default;
} catch {
    //console.log('No seq support');
}

// We must check if SysLog is defined before extending it
const IoSysLog = SysLog && class extends SysLog {
    constructor(options) {
        super(options);
    }

    log(info, callback) {
        // we need to map the ioBroker loglevels to the Syslog ones
        const ioInfo = info;
        if (ioInfo[LEVEL] === 'warn') {
            ioInfo[LEVEL] = 'warning';
        }
        if (ioInfo[LEVEL] === 'info') {
            ioInfo[LEVEL] = 'notice';
        }
        if (ioInfo[LEVEL] === 'debug') {
            ioInfo[LEVEL] = 'info';
        }
        if (ioInfo[LEVEL] === 'silly') {
            ioInfo[LEVEL] = 'debug';
        }
        super.log(ioInfo, callback);
    }
};

// We want to enhance some data for Seq
const IoSeq = Seq && class extends Seq {
    constructor(options) {
        options.levelMapper = options.levelMapper || function (level) {
            level = (level || '').toLowerCase();
            if (level.includes('error')) {
                return 'Error';
            }
            if (level.includes('warn')) {
                return 'Warning';
            }
            if (level.includes('info')) {
                return 'Information';
            }
            if (level.includes('debug')) {
                return 'Debug';
            }
            if (level.includes('silly')) {
                return 'Verbose';
            }
            return 'Information';
        };
        super(options);
    }

    log(info, callback) {
        const ioInfo = info;
        ioInfo.meta = ioInfo.meta || {};

        // we add own properties
        ioInfo.meta.Hostname = tools.getHostName();
        const msgParts = ioInfo.message.match(/^([^.]+\.[0-9]+) \(([^)]+)\) (.*)$/);
        if (msgParts) {
            ioInfo.meta.Source = msgParts[1];
            ioInfo.meta.Pid = msgParts[2];
        } else {
            ioInfo.meta.Source = 'js-controller';
        }
        super.log(ioInfo, callback);
    }
};

// Class used to inform adapter about new log entry
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
        userOptions = deepClone(level);

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

        if (userOptions.prefix !== undefined) {
            delete userOptions.prefix;
        }

        if (userOptions.transport) {
            let fName = 0;
            const isWindows = os.platform().match(/^win/);
            Object.keys(userOptions.transport).forEach(f => {
                const transport = userOptions.transport[f];
                if (transport.type === 'file' && transport.enabled !== false) {

                    transport.filename = transport.filename || ('log/' + tools.appName);

                    if (!transport.fileext && transport.filename.indexOf('.log') === -1) {
                        transport.fileext = '.log';
                    }

                    if (!fName) {
                        transport.systemLog = true;
                    }

                    transport.handleExceptions = false;
                    transport.name        = !fName ? tools.appName : 'dailyRotateFile' + fName;
                    fName++;
                    transport.filename    = transport.filename.replace(/\\/g, '/');
                    if (transport.filename.match(/^\w:\/|^\//)) {
                        transport.filename = path.normalize(transport.filename);
                    } else {
                        let _path = path.normalize(`${__dirname}${isNpm ? '/../../../' : '/../'}${transport.filename}`);
                        if (_path.indexOf('js-controller') !== -1) {
                            _path = path.normalize(`${__dirname}/../../${transport.filename}`);
                        }

                        transport.filename = _path;
                    }
                    transport.auditFile     = transport.filename + '-audit.json';

                    transport.createSymlink = (transport.createSymlink !== undefined) ? transport.createSymlink : !isWindows;
                    transport.symlinkName   = (transport.symlinkName !== undefined) ? transport.symlinkName : (path.basename(transport.filename + '.current.log'));

                    transport.filename     += '.%DATE%' + (transport.fileext || '');
                    //transport.label       = prefix || ''; //TODO format.label()
                    transport.level         = transport.level || level;
                    //                    transport.json        = (transport.json      !== undefined) ? transport.json      : false; // TODO format.json(), new Default!!
                    transport.silent        = (transport.silent    !== undefined) ? transport.silent    : false;
                    //                    transport.colorize    = (transport.colorize  !== undefined) ? transport.colorize  : ((userOptions.colorize  === undefined) ? true : userOptions.colorize); //TODO format.colorize()
                    transport.localTime     = (transport.localTime !== undefined) ? transport.localTime : ((userOptions.localTime === undefined) ? true : userOptions.localTime);
                    transport.datePattern   = 'YYYY-MM-DD';
                    transport.format        = winston.format.combine(winston.format.printf(formatter));
                    /*transport.logException = function (message, info, next, err) {
                        console.error(message);
                    };*/
                    transport.zippedArchive = isWindows ? false: (transport.zippedArchive !== undefined ? transport.zippedArchive : true);

                    if (transport.maxFiles === null && userOptions.maxDays) {
                        transport.maxFiles = userOptions.maxDays + 'd';
                    }

                    try {
                        const _log = new DailyRotateFile(transport);
                        options.transports.push(_log);
                    } catch (e) {
                        if (e.code === 'EACCES') {
                            // modify error code to make it unique for handling
                            e.code = 'EACCES_LOG';
                        }
                        throw e;
                    }
                } else if (transport.type === 'syslog' && transport.enabled !== false) {
                    if (!SysLog) {
                        console.error('Syslog configured, but not installed! Ignore');
                        return;
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
                    transport.localhost = transport.localhost || hostname;
                    transport.format = winston.format.combine(winston.format.printf(formatter));
                    if (transport.sysLogType) {
                        transport.type = transport.sysLogType;
                        delete transport.sysLogType;
                    } else {
                        delete transport.type;
                    }
                    try {
                        options.transports.push(new IoSysLog(transport));
                    } catch (err) {
                        console.log(`Cannot activate Syslog: ${err}`);
                    }
                } else if (transport.type === 'http' && transport.enabled !== false) {
                    // host: (Default: localhost) Remote host of the HTTP logging endpoint
                    // port: (Default: 80 or 443) Remote port of the HTTP logging endpoint
                    // path: (Default: /) Remote URI of the HTTP logging endpoint
                    // auth: (Default: None) An object representing the username and password for HTTP Basic Auth
                    // ssl: (Default: false) Value indicating if we should use HTTPS

                    // If no name defined, use hostname as name
                    transport.host = transport.host || 'localhost';

                    try {
                        options.transports.push(new winston.transports.Http(transport));
                    } catch (err) {
                        console.log('Cannot activate HTTP: ' + err);
                    }
                } else if (transport.type === 'stream' && transport.enabled !== false) {
                    // stream: any Node.js stream. If an objectMode stream is provided then the entire info object will be written. Otherwise info[MESSAGE] will be written.
                    // level: Level of messages that this transport should log (default: level set on parent logger).
                    // silent: Boolean flag indicating whether to suppress output (default false).
                    // eol: Line-ending character to use. (default: os.EOL).

                    // If no name defined, use hostname as name
                    transport.host = transport.host || 'localhost';

                    try {
                        if (typeof transport.stream === 'string') {
                            transport.stream = fs.createWriteStream(transport.stream);
                            transport.stream.on('error', err => {
                                console.log('Error in Stream: ' + err);
                            });
                        }

                        options.transports.push(new winston.transports.Stream(transport));
                    } catch (err) {
                        console.log(`Cannot activate Stream: ${err}`);
                    }
                } else if (transport.type === 'seq' && transport.enabled !== false) {
                    // serverUrl?:       string;
                    // apiKey?:          string;
                    // maxBatchingTime?: number;
                    // eventSizeLimit?:  number;
                    // batchSizeLimit?:  number;

                    // Add only if serverUrl is configured at least
                    if (transport.serverUrl) {
                        try {
                            const seqLogger = new IoSeq(transport);
                            seqLogger.on('error', error => {
                                console.log(`SEQ error: ${error}`);
                            });
                            options.transports.push(seqLogger);
                        } catch (err) {
                            console.log(`Cannot activate SEQ: ${err}`);
                        }
                    } else {
                        console.log('Cannot activate SEQ: No serverUrl specified');
                    }
                }
            });
        }
    } else {
        for (let i = 0; i < files.length; i++) {
            const opt = {
                name:         i ? 'dailyRotateFile' + i : tools.appName,
                filename:     path.normalize(isNpm ? `${__dirname}/../../../log/${files[i]}` : `${__dirname}/../log/${files[i]}`),
                extension:      '.log',
                datePattern:  'YYYY-MM-DD',
                //json:         false,  // If true, messages will be logged as JSON (default true). TODO format.json()
                level,
                silent:       false,
                localTime:    true,
                //colorize:     (userOptions.colorize === undefined) ? true : userOptions.colorize, // TODO format.colorize()
                //timestamp:    timestamp, // TODO: format.timestamp()
                //label:        prefix || '', // TODO format.label()
                handleExceptions: false
                //maxSize:      defaultMaxSize
            };

            options.transports.push(new DailyRotateFile(opt));
        }
    }

    if (!noStdout) {
        options.transports.push(new winston.transports.Console({
            level,
            silent: false,
            format: winston.format.combine(winston.format.printf(formatter))
            //colorize:  (userOptions.colorize === undefined) ? true : userOptions.colorize, // TODO format.colorize()
            //timestamp: timestamp, // TODO: format.timestamp()
            //label:     prefix || '' // TODO format.label()
        }));
    }

    // Must be registered, for adapter.js notification about new logs
    options.transports.push(new NotifierTransport({
        level,
        silent: false
    }));

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

    log.on('error', error => {
        console.log('Logger error: ' + error);
    });

    // This cannot be deleted, because file rotate works with the size of files and not with the time
    // TODO research and open new issue in winston-daily-rotate-file repo
    log.activateDateChecker = function (isEnabled, daysCount) {
        if (!isEnabled && this._fileChecker) {
            clearInterval(this._fileChecker);
        } else if (isEnabled && !this._fileChecker) {
            if (!daysCount) {
                daysCount = 3;
            }

            // Check every hour
            this._fileChecker = setInterval(() => {
                this.transports.forEach(transport => {
                    if (transport.name !=='dailyRotateFile' || !transport.options || transport.options.name !== tools.appName) {
                        return;
                    }

                    if (transport && fs.existsSync(transport.dirname)) {
                        let files;
                        try {
                            files = fs.readdirSync(transport.dirname);
                        } catch (err) {
                            console.log(`host.${hostname} Cannot read log directory: ${err}`);
                            return;
                        }
                        const forXdays = new Date();
                        forXdays.setDate(forXdays.getDate() - daysCount - 1); // normally winston now takes care, for old or on errors make sure fallback works a day later

                        for (let i = 0; i < files.length; i++) {
                            const match = files[i].match(/.+\.(\d+-\d+-\d+)/);
                            if (match) {
                                const date = new Date(match[1]);
                                if (date < forXdays) {
                                    // delete file
                                    try {
                                        this.log({
                                            level: 'info',
                                            message: `host.${hostname} Delete log file ${files[i]}`
                                        });
                                        console.log(`host.${hostname} Delete log file ${files[i]}`);
                                        fs.unlinkSync(transport.dirname + '/' + files[i]);
                                    } catch (e) {
                                        // there is a bug under windows, that file stays opened and cannot be deleted
                                        this.log({
                                            level: os.platform().match(/^win/) ? 'info' : 'error',
                                            message: `host.${hostname} Cannot delete file "${path.normalize(transport.dirname + '/' + files[i])}": ${e}`
                                        });
                                        console.log(`host.${hostname} Cannot delete file "${path.normalize(transport.dirname + '/' + files[i])}": ${e}`);
                                    }
                                }
                            }
                        }
                    }
                });
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
    if (value < 10) {
        value = '0' + value;
    }
    result += value + '-';

    value = ts.getDate();
    if (value < 10) {
        value = '0' + value;
    }
    result += value;
    return result;
}

function timestamp(date) {
    const ts = date ? new Date(date) : new Date();
    let result = ts.getFullYear() + '-';

    /** @type {number | string} */
    let value = ts.getMonth() + 1;
    if (value < 10) {
        value = '0' + value;
    }
    result += value + '-';

    value = ts.getDate();
    if (value < 10) {
        value = '0' + value;
    }
    result += value + ' ';

    value = ts.getHours();
    if (value < 10) {
        value = '0' + value;
    }
    result += value + ':';

    value = ts.getMinutes();
    if (value < 10) {
        value = '0' + value;
    }
    result += value + ':';

    value = ts.getSeconds();
    if (value < 10) {
        value = '0' + value;
    }
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
