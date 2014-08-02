/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";


var winston = require('winston');
//require('winston-syslog').Syslog;

var logger = function (level, files, noStdout) {
    files = files || [];

    var options = {
        transports: []
    };

    if (!noStdout) {
        options.transports.push(new (winston.transports.Console)({
            'level':        level,
            'silent':       false,
            'colorize':     true,
            'timestamp':    timestamp
        }));
    }

    for (var i = 0; i < files.length; i++) {
        options.transports.push(new (winston.transports.File)({
            'filename':     __dirname + '/../log/' + files[i],
            'json':         false,  // If true, messages will be logged as JSON (default true).
            'level':        level,
            'silent':       false,
            'colorize':     true,
            'timestamp':    timestamp
        }));
    }


    return new (winston.Logger)(options);

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







