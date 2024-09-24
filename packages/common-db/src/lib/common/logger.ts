import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import * as tools from '@/lib/common/tools.js';
import Transport from 'winston-transport';
import { LEVEL } from 'triple-beam';
import deepClone from 'deep-clone';
import type { Syslog } from 'winston-syslog';
import type { SeqTransport } from '@datalust/winston-seq';
import * as url from 'node:url';
import { createRequire } from 'node:module';

// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

// eslint-disable-next-line unicorn/prefer-module
const require = createRequire(import.meta.url || `file://${__filename}`);

const hostname = tools.getHostName();

let SysLog: typeof Syslog | undefined;
try {
    SysLog = require('winston-syslog').Syslog;
} catch {
    //console.log('No syslog support');
}

let Seq: typeof SeqTransport | undefined;
try {
    Seq = require('@datalust/winston-seq').SeqTransport;
} catch {
    //console.log('No seq support');
}

export type LogInfo = Record<string | symbol, any>;

// We must check if SysLog is defined before extending it
const IoSysLog =
    SysLog &&
    class extends SysLog {
        constructor(options: any) {
            super(options);
        }
        log(info: LogInfo, callback: () => void): void {
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

            // No clue why log could ever be undefined, but hey...
            super.log?.(ioInfo, callback);
        }
    };

// We want to enhance some data for Seq
const IoSeq =
    Seq &&
    class extends Seq {
        log(info: LogInfo, callback: () => void): void {
            const ioInfo = deepClone(info);
            ioInfo.props = ioInfo.props || {};

            // map our log levels to Seq levels
            const level = (ioInfo.level || '').toLowerCase();
            if (level.includes('error')) {
                ioInfo.level = 'Error';
            } else if (level.includes('warn')) {
                ioInfo.level = 'Warning';
            } else if (level.includes('info')) {
                ioInfo.level = 'Information';
            } else if (level.includes('debug')) {
                ioInfo.level = 'Debug';
            } else if (level.includes('silly')) {
                ioInfo.level = 'Verbose';
            } else {
                ioInfo.level = 'Information';
            }

            // we add own properties
            ioInfo.props.Hostname = tools.getHostName();
            if (ioInfo.message) {
                // handle as single line with s flag, to if message ends with CR, etc
                const msgParts = ioInfo.message.match(/^([^.]+\.[0-9]+) \(([^)]+)\) (.*)$/s);
                if (msgParts) {
                    ioInfo.props.Source = msgParts[1];
                    ioInfo.props.Pid = msgParts[2];
                } else {
                    ioInfo.props.Source = 'js-controller';
                }
            }
            super.log(ioInfo, callback);
        }
    };

// Class used to inform adapter about new log entry
class NotifierTransport extends Transport {
    private name: string;
    constructor(opts: any) {
        super(opts);
        this.name = 'NT'; // NotifierTransport
    }

    log(info: LogInfo, callback: () => void): void {
        const msg = {
            severity: info[LEVEL],
            ts: new Date(info.timestamp).getTime(),
            message: info.message,
        };
        setImmediate(() => this.emit('logged', msg));
        callback();
    }
}

export interface UserOptions {
    level: string;
    maxDays: number;
    noStdout: boolean;
    localTime?: string;
    colorize?: boolean;
    json?: boolean;
    prefix?: string;
    transport: Record<string, any>;
}

interface Options {
    format?: winston.Logform.Format;
    transports: Transport[];
}

export function logger(
    level: string | UserOptions,
    files?: string[] | string,
    noStdout?: boolean,
    prefix?: string,
): winston.Logger {
    const options: Options = {
        transports: [],
    };

    //var defaultMaxSize;// = 10 * 1024 * 1024;

    if (typeof files === 'string') {
        files = [files];
    }

    const formatter = (info: LogInfo): string => `${timestamp(info.timestamp)} - ${info.level}: ${info.message}`;

    files = files || [];

    // indicator which is used to determine the log dir for developing, where it should be inside the repository
    const isNpm = !thisDir
        .replace(/\\/g, '/')
        .toLowerCase()
        .includes(`${tools.appName.toLowerCase()}.js-controller/packages/`);

    if (tools.isObject(level)) {
        const userOptions: UserOptions = deepClone(level);

        level = userOptions.level;
        prefix = userOptions.prefix || '';
        noStdout = userOptions.noStdout;
        const winstonFormats = [];
        /** @ts-expect-error formatter arg wrongly documented */
        winstonFormats.push(winston.format.timestamp({ format: timestamp }));
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
            const isWindows = os.platform().startsWith('win');
            for (const transport of Object.values(userOptions.transport)) {
                transport._defaultConfigLoglevel = transport.level; // remember Loglevel if set
                transport.level = transport.level || level;

                if (transport.type === 'file' && transport.enabled !== false) {
                    transport.filename = transport.filename || `log/${tools.appName}`;

                    if (!transport.fileext && transport.filename.indexOf('.log') === -1) {
                        transport.fileext = '.log';
                    }

                    if (!fName) {
                        transport.systemLog = true;
                    }

                    transport.handleExceptions = false;
                    transport.name = fName ? `dailyRotateFile${fName}` : tools.appName;
                    fName++;
                    transport.filename = transport.filename.replace(/\\/g, '/');
                    if (transport.filename.match(/^\w:\/|^\//)) {
                        transport.filename = path.normalize(transport.filename);
                    } else {
                        transport.filename = path.normalize(
                            `${tools.getControllerDir()}${isNpm ? '/../../' : '/'}${transport.filename}`,
                        );
                    }
                    transport.auditFile = `${transport.filename}-audit.json`;

                    transport.createSymlink =
                        transport.createSymlink !== undefined ? transport.createSymlink : !isWindows;
                    transport.symlinkName =
                        transport.symlinkName !== undefined
                            ? transport.symlinkName
                            : path.basename(`${transport.filename}.current.log`);

                    transport.filename += `.%DATE%${transport.fileext || ''}`;
                    //transport.label       = prefix || ''; //TODO format.label()
                    //                    transport.json        = (transport.json      !== undefined) ? transport.json      : false; // TODO format.json(), new Default!!
                    transport.silent = transport.silent !== undefined ? transport.silent : false;
                    //                    transport.colorize    = (transport.colorize  !== undefined) ? transport.colorize  : ((userOptions.colorize  === undefined) ? true : userOptions.colorize); //TODO format.colorize()
                    transport.localTime =
                        transport.localTime !== undefined
                            ? transport.localTime
                            : userOptions.localTime === undefined
                              ? true
                              : userOptions.localTime;
                    transport.datePattern = 'YYYY-MM-DD';
                    transport.format = winston.format.combine(winston.format.printf(formatter));
                    /*transport.logException = function (message, info, next, err) {
                        console.error(message);
                    };*/
                    transport.zippedArchive = isWindows
                        ? false
                        : transport.zippedArchive !== undefined
                          ? transport.zippedArchive
                          : true;

                    if (transport.maxFiles === null && userOptions.maxDays) {
                        transport.maxFiles = `${userOptions.maxDays}d`;
                    }

                    try {
                        const _log = new DailyRotateFile(transport);

                        _log.on('error', err => {
                            console.error(`Error on log file rotation: ${err.message}`);
                        });

                        options.transports.push(_log);
                    } catch (e) {
                        if (e.code === 'EACCES') {
                            // modify error code to make it unique for handling
                            e.code = 'EACCES_LOG';
                        }
                        throw e;
                    }
                } else if (transport.type === 'syslog' && transport.enabled !== false) {
                    if (!IoSysLog) {
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
                    } catch (e) {
                        console.error(`Cannot activate Syslog: ${e.message}`);
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
                    } catch (e) {
                        console.error(`Cannot activate HTTP: ${e.message}`);
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
                            transport.stream.on('error', (err: Error) => {
                                console.error(`Error in Stream: ${err.message}`);
                            });
                        }

                        options.transports.push(new winston.transports.Stream(transport));
                    } catch (e) {
                        console.error(`Cannot activate Stream: ${e.message}`);
                    }
                } else if (transport.type === 'seq' && transport.enabled !== false) {
                    if (!IoSeq) {
                        console.error('Seq configured, but not installed! Ignore');
                        continue;
                    }
                    // serverUrl?:       string;
                    // apiKey?:          string;
                    // maxBatchingTime?: number;
                    // eventSizeLimit?:  number;
                    // batchSizeLimit?:  number;

                    // Add only if serverUrl is configured at least
                    if (transport.serverUrl) {
                        try {
                            transport.onError = (e: Error) => {
                                console.log(`SEQ error: ${e.message}`);
                            };
                            const seqLogger = new IoSeq(transport);
                            options.transports.push(seqLogger);
                        } catch (e) {
                            console.error(`Cannot activate SEQ: ${e.message}`);
                        }
                    } else {
                        console.error('Cannot activate SEQ: No serverUrl specified');
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < files.length; i++) {
            const opt = {
                name: i ? `dailyRotateFile${i}` : tools.appName,
                filename: path.normalize(
                    isNpm ? `${thisDir}/../../../log/${files[i]}` : `${thisDir}/../log/${files[i]}`,
                ),
                extension: '.log',
                datePattern: 'YYYY-MM-DD',
                //json:         false,  // If true, messages will be logged as JSON (default true). TODO format.json()
                level,
                silent: false,
                localTime: true,
                //colorize:     (userOptions.colorize === undefined) ? true : userOptions.colorize, // TODO format.colorize()
                //timestamp:    timestamp, // TODO: format.timestamp()
                //label:        prefix || '', // TODO format.label()
                handleExceptions: false,
                //maxSize:      defaultMaxSize
            };

            options.transports.push(new DailyRotateFile(opt));
        }
    }

    if (!noStdout) {
        options.transports.push(
            new winston.transports.Console({
                level,
                silent: false,
                format: winston.format.combine(winston.format.printf(formatter)),
                //colorize:  (userOptions.colorize === undefined) ? true : userOptions.colorize, // TODO format.colorize()
                //timestamp: timestamp, // TODO: format.timestamp()
                //label:     prefix || '' // TODO format.label()
            }),
        );
    }

    // Must be registered, for adapter.js notification about new logs
    options.transports.push(
        new NotifierTransport({
            level,
            silent: false,
        }),
    );

    const log = winston.createLogger(options);

    /** @ts-expect-error why do we override/add method to foreign instance? TODO */
    log.getFileName = function () {
        /** @ts-expect-error we use undocumented stuff here TODO */
        let transport = this.transports.find(t => (t.transport && t.transport.dirname) || t.dirname);
        if (transport) {
            /** @ts-expect-error we use undocumented stuff here TODO */
            transport = transport.transport ? transport.transport : transport;
            /** @ts-expect-error we use undocumented stuff here TODO */
            return `${transport.dirname}/${transport.filename.replace('%DATE%', getDate())}`;
        }
        return '';
    };

    log.on('error', error => {
        console.log(`Logger error: ${error.message}`);
    });

    // This cannot be deleted, because file rotate works with the size of files and not with the time
    // TODO research and open new issue in winston-daily-rotate-file repo
    /**
     * @param isEnabled
     * @param daysCount
     */
    // @ts-expect-error why do we override/add method to foreign instance? TODO
    log.activateDateChecker = function (isEnabled, daysCount) {
        /** @ts-expect-error we use undocumented stuff here TODO */
        if (!isEnabled && this._fileChecker) {
            /** @ts-expect-error we use undocumented stuff here TODO */
            clearInterval(this._fileChecker);
            /** @ts-expect-error we use undocumented stuff here TODO */
        } else if (isEnabled && !this._fileChecker) {
            if (!daysCount) {
                daysCount = 3;
            }

            // Check every hour
            /** @ts-expect-error we use undocumented stuff here TODO */
            this._fileChecker = setInterval(() => {
                this.transports.forEach(transport => {
                    if (
                        /** @ts-expect-error we use undocumented stuff here TODO */
                        transport.name !== 'dailyRotateFile' ||
                        /** @ts-expect-error we use undocumented stuff here TODO */
                        !transport.options ||
                        /** @ts-expect-error we use undocumented stuff here TODO */
                        transport.options.name !== tools.appName
                    ) {
                        return;
                    }

                    /** @ts-expect-error we use undocumented stuff here TODO */
                    if (transport && fs.existsSync(transport.dirname)) {
                        let files;
                        try {
                            /** @ts-expect-error we use undocumented stuff here TODO */
                            files = fs.readdirSync(transport.dirname);
                        } catch (e) {
                            console.error(`host.${hostname} Cannot read log directory: ${e.message}`);
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
                                            message: `host.${hostname} Delete log file ${files[i]}`,
                                        });
                                        console.log(`host.${hostname} Delete log file ${files[i]}`);
                                        /** @ts-expect-error we use undocumented stuff here TODO */
                                        fs.unlinkSync(`${transport.dirname}/${files[i]}`);
                                    } catch (e) {
                                        // there is a bug under windows, that file stays opened and cannot be deleted
                                        this.log({
                                            level: os.platform().startsWith('win') ? 'info' : 'error',
                                            message: `host.${hostname} Cannot delete file "${path.normalize(
                                                /** @ts-expect-error we use undocumented stuff here TODO */
                                                `${transport.dirname}/${files[i]}`,
                                            )}": ${e}`,
                                        });
                                        console.log(
                                            `host.${hostname} Cannot delete file "${path.normalize(
                                                /** @ts-expect-error we use undocumented stuff here TODO */
                                                `${transport.dirname}/${files[i]}`,
                                            )}": ${e.message}`,
                                        );
                                    }
                                }
                            }
                        }
                    }
                });
            }, 3_600_000); // every hour
        }
    };

    return log;
}

function getDate(): string {
    const ts = new Date();
    return `${ts.getFullYear()}-${(ts.getMonth() + 1).toString().padStart(2, '0')}-${ts
        .getDate()
        .toString()
        .padStart(2, '0')}`;
}

function timestamp(date: string): string {
    const ts = date ? new Date(date) : new Date();
    return `${ts.getFullYear()}-${(ts.getMonth() + 1).toString().padStart(2, '0')}-${ts
        .getDate()
        .toString()
        .padStart(2, '0')} ${ts.getHours().toString().padStart(2, '0')}:${ts
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${ts.getSeconds().toString().padStart(2, '0')}.${ts
        .getMilliseconds()
        .toString()
        .padStart(3, '0')} `;
}
