'use strict';
// var fs = require('fs');

function Logger(options) {
    if (!(this instanceof Logger)) {
        return new Logger(options);
    }

    options = options || {};
    options.prefix = options.prefix ? options.prefix + '_' : '';

    // create log directory
    /*try {
        if (!fs.existsSync(__dirname + '/../log')) {
            fs.mkdirSync(__dirname + '/../log');
        }
    } catch (e) {
        console.error('Cannot create "' + __dirname + '/../log"');
    }
    var lastCheck = null;
    var fileName  = null;
    var toConsole = process.argv.indexOf('--logs') !== -1;*/

    function write(severity, text) {
        /*var date = new Date();
        if (!lastCheck || date.getTime() - lastCheck > 60000) {
            fileName = date.toISOString().substring(0, 10) + options.prefix;
        }
        fs.appendFileSync(__dirname + '/../log/' + fileName + '.log', '[' + new Date().toString() + '] ' + severity + ': ' + text + '\n');

        if (toConsole) {*/
            if (severity === 'error') {
                console.error('[error] ' + text);
            } else if (severity === 'warn') {
                console.error('[warn ] ' + text);
            } else {
                console.log('[' + severity + ']: ' + text);
            }
        //}
    }

    this.log = function () {
        write(' info', arguments[0]);
    };
    this.warn = function () {
        write(' warn', arguments[0]);
    };
    this.error = function () {
        write('error', arguments[0]);
    };
    this.debug = function () {
        write('debug', arguments[0]);
    };
    return this;
}

module.exports = Logger;