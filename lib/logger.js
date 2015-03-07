/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";


var winston = require('winston');
//require('winston-syslog').Syslog;

var logger = function (level, files, noStdout, prefix) {
    var userOptions = {};
    var options = {
        transports: []
    };
    var defaultMaxSize = undefined;//10 * 1024 * 1024;

    if (typeof files == 'string') files = [files];

    files = files || [];

    var isNpm = (__dirname.replace(/\\/g, '/').toLowerCase().indexOf('node_modules/iobroker.js-controller') != -1);

    if (typeof level == 'object') {
        userOptions = level;

        level    = userOptions.level;
        prefix   = userOptions.prefix;
        noStdout = userOptions.noStdout;

        if (userOptions.prefix !== undefined) delete userOptions.prefix;

        if (userOptions.transport) {
            for (var f in userOptions.transport) {
                if (userOptions.transport[f].type == 'file' && userOptions.transport[f].enabled !== false) {
                    userOptions.transport[f].filename = userOptions.transport[f].filename || 'log/iobroker.log';
                    userOptions.transport[f].filename = __dirname + (isNpm ? '/../../../' : '/../') + userOptions.transport[f].filename;
                    userOptions.transport[f].label    = prefix || '';
                    userOptions.transport[f].level    = userOptions.transport[f].level || level;
                    userOptions.transport[f].json     = (userOptions.transport[f].json     !== undefined) ? userOptions.transport[f].json     : false;
                    userOptions.transport[f].silent   = (userOptions.transport[f].silent   !== undefined) ? userOptions.transport[f].silent   : false;
                    userOptions.transport[f].colorize = (userOptions.transport[f].colorize !== undefined) ? userOptions.transport[f].colorize : ((userOptions.colorize === undefined) ? true : userOptions.colorize);
//                    userOptions.transport[f].maxsize  = (userOptions.transport[f].maxsize  !== undefined) ? userOptions.transport[f].maxsize : defaultMaxSize;
                    userOptions.transport[f].timestamp = timestamp;
                    options.transports.push(new (winston.transports.File)(userOptions.transport[f]));
                }
            }
        }
    } else {
        for (var i = 0; i < files.length; i++) {
            options.transports.push(new (winston.transports.File)({
                'filename':     isNpm ? __dirname + '/../../../log/' + files[i] : __dirname + '/../log/' + files[i],
                'json':         false,  // If true, messages will be logged as JSON (default true).
                'level':        level,
                'silent':       false,
                'colorize':     (userOptions.colorize === undefined) ? true : userOptions.colorize,
                'timestamp':    timestamp,
                'label':        prefix || '',
                'maxsize':      defaultMaxSize
            }));
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

    log.info(level || 'info');

    return log;
};


function timestamp() {
    var ts = new Date();

    return ts.getFullYear() + '-' +
        ("0" + (ts.getMonth() + 1).toString(10)).slice(-2) + '-' +
        ("0" + (ts.getDate()).toString(10)).slice(-2) + ' ' +
        ("0" + (ts.getHours()).toString(10)).slice(-2) + ':' +
        ("0" + (ts.getMinutes()).toString(10)).slice(-2) + ':' +
        ("0" + (ts.getSeconds()).toString(10)).slice(-2) + "." +
        ("00" + (ts.getMilliseconds()).toString(10)).slice(-3) + " ";
}


module.exports = logger;







