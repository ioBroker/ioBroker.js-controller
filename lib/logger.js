var winston = require('winston');
//require('winston-syslog').Syslog;



var logger = (function () {


    return new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                'level': 'info', // Level of messages that this transport should log (default 'info').
                'silent': false,  // Boolean flag indicating whether to suppress output (default false).
                'colorize': true,   // Boolean flag indicating if we should colorize output (default false).
                'timestamp':            // Boolean flag indicating if we should prepend output with timestamps (default false).
                //   If function is specified, its return value will be used instead of timestamps.

                    function () {
                        var ts = new Date();

                        return ts.getFullYear() + '-' +
                            ("0" + (ts.getMonth() + 1).toString(10)).slice(-2) + '-' +
                            ("0" + (ts.getDate()).toString(10)).slice(-2) + ' ' +
                            ("0" + (ts.getHours()).toString(10)).slice(-2) + ':' +
                            ("0" + (ts.getMinutes()).toString(10)).slice(-2) + ':' +
                            ("0" + (ts.getSeconds()).toString(10)).slice(-2) + "." +
                            ("00" + (ts.getMilliseconds()).toString(10)).slice(-3) + " ";
                    }

            })/*,
            new (winston.transports.File)({
                 'filename':       'mylogfile.log',
                 'json':         false,  // If true, messages will be logged as JSON (default true).
                 'level':        'info', // Level of messages that this transport should log (default 'debug').
                 'silent':       false,  // Boolean flag indicating whether to suppress output (default false).
                 'timestamp':            // Boolean flag indicating if we should prepend output with timestamps (default false).
                 //   If function is specified, its return value will be used instead of timestamps.

                 function () {
                 var ts = new Date();

                 return ts.getFullYear() + '-' +
                 ("0" + (ts.getMonth() + 1).toString(10)).slice(-2) + '-' +
                 ("0" + (ts.getDate()).toString(10)).slice(-2) + ' ' +
                 ("0" + (ts.getHours()).toString(10)).slice(-2) + ':' +
                 ("0" + (ts.getMinutes()).toString(10)).slice(-2) + ':' +
                 ("0" + (ts.getSeconds()).toString(10)).slice(-2) + "." +
                 ("00" + (ts.getMilliseconds()).toString(10)).slice(-3) + " ";
                 }
             }) /*,
             new (winston.transports.Syslog)({

             https://github.com/indexzero/winston-syslog

             host: The host running syslogd, defaults to localhost.
             port: The port on the host that syslog is running on, defaults to syslogd's default port.
             protocol: The network protocol to log over (e.g. tcp4, udp4, etc).
             pid: PID of the process that log messages are coming from (Default process.pid).
             facility: Syslog facility to use (Default: local0).
             localhost: Host to indicate that log messages are coming from (Default: localhost).
             type: The type of the syslog protocol to use (Default: BSD).
             app_name: The name of the application (Default: process.title).
             })*/
        ]
    });
})();

module.exports = logger;
