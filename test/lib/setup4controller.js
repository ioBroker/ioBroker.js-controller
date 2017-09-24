/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

// check if tmp directory exists
var fs            = require('fs');
var path          = require('path');
var rootDir       = path.normalize(__dirname + '/../../');
//var pkg           = require(rootDir + 'package.json');
//var debug         = typeof v8debug === 'object';

function getAppName() {
    var parts = __dirname.replace(/\\/g, '/').split('/');
    return parts[parts.length - 3].split('.')[0];
}

var appName = getAppName().toLowerCase();

var objects;
var states;

if (!fs.existsSync(rootDir + 'tmp')) {
    fs.mkdirSync(rootDir + 'tmp');
}

function startController(options, callback) {
    if (!options) options = {};

    var isObjectConnected;
    var isStatesConnected;

    console.log('startController...');

    var settingsObjects = {
        connection: {
            type:               options.objects.type || 'file',
            host:               options.objects.host || '127.0.0.1',
            port:               options.objects.port || 19001,
            user:               options.objects.user || '',
            pass:               options.objects.pass || '',
            noFileCache:        (options.objects.noFileCache === undefined) ? options.objects.noFileCache : true,
            connectTimeout:     options.objects.connectTimeout || 2000,
            dataDir:            options.objects.dataDir || ''
        },
        logger: options.objects.logger || options.logger || {
            silly: function (msg) {
                console.log(msg);
            },
            debug: function (msg) {
                console.log(msg);
            },
            info: function (msg) {
                console.log(msg);
            },
            warn: function (msg) {
                console.warn(msg);
            },
            error: function (msg) {
                console.error(msg);
            }
        },
        connected: function () {
            isObjectConnected = true;
            if (isStatesConnected) {
                console.log('startController: started!');
                callback && callback(objects, states);
            }
        },
        change: options.objects.onChange || null
    };

    var Objects;

    if (options.objects && options.objects.type) {
        if (options.objects.type === 'file') {
            Objects = require(rootDir + 'lib/objects/objectsInMemServer');
        } else if (options.objects.type === 'redis') {
            Objects = require(rootDir + 'lib/objects/objectsInRedis');
        } else if (options.objects.type === 'couch') {
            Objects = require(rootDir + 'lib/objects/objectsInCouch');
        }
    } else {
        Objects = require(rootDir + 'lib/objects/objectsInMemServer');
    }


    objects = new Objects(settingsObjects);

    var States;
    // Just open in memory DB itself
    if (options.states && options.states.type) {
        if (options.states.type === 'redis') {
            States = require(rootDir + 'lib/states/statesInRedis');
        } else {
            States = require(rootDir + 'lib/states/statesInMemServer');
        }
    } else {
        States = require(rootDir + 'lib/states/statesInMemServer');
    }

    var settingsStates = {
        connection: {
            options : {
                auth_pass : null,
                retry_max_delay : 15000
            },
            type:           options.states.type     || 'file',
            host:           options.states.host     || '127.0.0.1',
            port:           (options.states.port===undefined) ? 19000 : options.states.port,
            user:           options.states.user     || '',
            pass:           options.states.pass     || '',
            dataDir:        options.states.dataDir  || ''
        },
        logger:         options.states.logger || options.logger || {
            silly: function (msg) {
                console.log(msg);
            },
            debug: function (msg) {
                console.log(msg);
            },
            info: function (msg) {
                console.log(msg);
            },
            warn: function (msg) {
                console.warn(msg);
            },
            error: function (msg) {
                console.error(msg);
            }
        },
        connected: function () {
            isStatesConnected = true;
            if (isObjectConnected) {
                console.log('startController: started!');
                callback && callback(objects, states);
            }
        },
        change: options.states.onChange || null
    };

    states = new States(settingsStates);
}

function stopController(cb) {
    if (objects) {
        objects.destroy();
        objects = null;
    }
    if (states) {
        states.destroy();
        states = null;
    }

    if (cb) {
        cb(true);
        cb = null;
    }
}

if (typeof module !== 'undefined' && module.parent) {
    module.exports.startController  = startController;
    module.exports.stopController   = stopController;
    module.exports.appName          = appName;
    module.exports.rootDir          = rootDir;
}
