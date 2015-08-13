/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";


var winston = require('winston');
var fs      = require('fs');
var path    = require('path');
var os      = require('os');
//require('winston-syslog').Syslog;

var logger = function (level, files, noStdout, prefix) {
    var userOptions = {};
    var options = {
        transports: []
    };
    var defaultMaxSize;// = 10 * 1024 * 1024;
    var dailyRotateFile = null;

    if (typeof files == 'string') files = [files];

    files = files || [];

    var isNpm = (__dirname.replace(/\\/g, '/').toLowerCase().indexOf('node_modules/iobroker.js-controller') != -1);

    if (typeof level == 'object') {
        userOptions = JSON.parse(JSON.stringify(level));

        level    = userOptions.level;
        prefix   = userOptions.prefix;
        noStdout = userOptions.noStdout;

        if (userOptions.prefix !== undefined) delete userOptions.prefix;

        if (userOptions.transport) {
            for (var f in userOptions.transport) {
                if (userOptions.transport[f].type == 'file' && userOptions.transport[f].enabled !== false) {

                    userOptions.transport[f].filename    = userOptions.transport[f].filename || 'log/iobroker';

                    if (!userOptions.transport[f].fileext && userOptions.transport[f].filename.indexOf('.log') == -1) {
                        userOptions.transport[f].fileext = '.log';
                    }

                    userOptions.transport[f].filename    = path.normalize(__dirname + (isNpm ? '/../../../' : '/../') + userOptions.transport[f].filename);
                    userOptions.transport[f].label       = prefix || '';
                    userOptions.transport[f].level       = userOptions.transport[f].level || level;
                    userOptions.transport[f].json        = (userOptions.transport[f].json     !== undefined) ? userOptions.transport[f].json     : false;
                    userOptions.transport[f].silent      = (userOptions.transport[f].silent   !== undefined) ? userOptions.transport[f].silent   : false;
                    userOptions.transport[f].colorize    = (userOptions.transport[f].colorize !== undefined) ? userOptions.transport[f].colorize : ((userOptions.colorize === undefined) ? true : userOptions.colorize);
//                    userOptions.transport[f].maxsize  = (userOptions.transport[f].maxsize  !== undefined) ? userOptions.transport[f].maxsize : defaultMaxSize;
                    userOptions.transport[f].timestamp   = timestamp;
                    userOptions.transport[f].datePattern = '.yyyy-MM-dd' + (userOptions.transport[f].fileext || '') ;

                    var _dailyRotateFile = new (winston.transports.DailyRotateFile)(userOptions.transport[f]);

                    if (!dailyRotateFile) dailyRotateFile = _dailyRotateFile;
                    options.transports.push(_dailyRotateFile);
                }
            }
        }
    } else {
        for (var i = 0; i < files.length; i++) {
            var _dailyRotateFile = new (winston.transports.DailyRotateFile)({
                'filename':     path.normalize(isNpm ? __dirname + '/../../../log/' + files[i] : __dirname + '/../log/' + files[i]),
                'datePattern':  '.yyyy-MM-dd.log',
                'json':         false,  // If true, messages will be logged as JSON (default true).
                'level':        level,
                'silent':       false,
                'colorize':     (userOptions.colorize === undefined) ? true : userOptions.colorize,
                'timestamp':    timestamp,
                'label':        prefix || '',
                'maxsize':      defaultMaxSize
            });
            if (!dailyRotateFile) dailyRotateFile = _dailyRotateFile;

            options.transports.push(_dailyRotateFile);
        }
    }

    if (!noStdout) {
        options.transports.push(new (winston.transports.Console)({
            'level':     level,
            'silent':    false,
            'colorize':  (userOptions.colorize === undefined) ? true : userOptions.colorize,
            'timestamp': timestamp,
            'label':     prefix ||''
        }));
    }

    var log = new (winston.Logger)(options);

    log.getFileName = function () {
        return dailyRotateFile.dirname + '/' + dailyRotateFile._getFile();
    };
    log.activateDateChecker = function (isEnabled, daysCount) {
        if (!isEnabled && this._fileChecker) {
            clearInterval(this._fileChecker);
        } else if (isEnabled && !this._fileChecker) {
            if (!daysCount) daysCount = 3;

            // Check every hour
            this._fileChecker = setInterval(function () {
                if (dailyRotateFile && fs.existsSync(dailyRotateFile.dirname)) {
                    var files = fs.readdirSync(dailyRotateFile.dirname);
                    var for3days = new Date();
                    for3days.setDate(for3days.getDate() - daysCount);

                    for (var i = 0; i < files.length; i++) {
                        var match = files[i].match(/.+\.(\d+-\d+-\d+)/);
                        if (match) {
                            var date = new Date(match[1]);
                            if (date < for3days) {
                                // delete file
                                try {
                                    dailyRotateFile.log('info', 'host.' + os.hostname() + ' Delete log file ' + files[i]);
                                    fs.unlinkSync(dailyRotateFile.dirname + '/' + files[i]);
                                } catch (e) {
                                    dailyRotateFile.log('error', 'host.' + os.hostname() + ' Cannot delete file "' + path.normalize(dailyRotateFile.dirname + '/' + files[i]) + '": ' + e);
                                }
                            }
                        }
                    }
                }
            }, 3600000); // every hour
        }
    }

    return log;
};


function timestamp() {
    var ts = new Date();
    var result = ts.getFullYear() + '-';

    var value = ts.getMonth() + 1;
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







