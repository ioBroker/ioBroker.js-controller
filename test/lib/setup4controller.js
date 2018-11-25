/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

// check if tmp directory exists
const fs            = require('fs');
const path          = require('path');
const rootDir       = path.normalize(__dirname + '/../../');
//const pkg           = require(rootDir + 'package.json');
//const debug         = typeof v8debug === 'object';

function getAppName() {
    const parts = __dirname.replace(/\\/g, '/').split('/');
    return parts[parts.length - 3].split('.')[0];
}

const appName = getAppName().toLowerCase();

let objects;
let states;

if (!fs.existsSync(rootDir + 'tmp')) {
    fs.mkdirSync(rootDir + 'tmp');
}

function startController(options, callback) {
    if (!options) options = {};

    let isObjectConnected;
    let isStatesConnected;

    console.log('startController...');

    const settingsObjects = {
        connection: {
            type:               options.objects.type || 'file',
            host:               options.objects.host || '127.0.0.1',
            port:               (options.states.port === undefined) ? 19001 : options.states.port,
            user:               options.objects.user || '',
            pass:               options.objects.pass || '',
            redisNamespace:     options.objects.redisNamespace || '',
            noFileCache:        (options.objects.noFileCache === undefined) ? options.objects.noFileCache : true,
            connectTimeout:     options.objects.connectTimeout || 2000,
            dataDir:            options.objects.dataDir || ''
        },
        logger: options.objects.logger || options.logger || {
            silly: msg => console.log(msg),
            debug: msg => console.log(msg),
            info:  msg => console.log(msg),
            warn:  msg => console.warn(msg),
            error: msg => console.error(msg)
        },
        connected: () => {
            // clear all states
            if (settingsObjects.connection.type === 'redis') {
                objects.destroyDB(() => {
                    isObjectConnected = true;
                    if (isStatesConnected) {
                        console.log('startController: started!');
                        callback && callback(objects, states);
                    }
                });
            } else {
                isObjectConnected = true;
                if (isStatesConnected) {
                    console.log('startController: started!');
                    callback && callback(objects, states);
                }
            }
        },
        change: options.objects.onChange || null
    };

    let Objects;

    if (options.objects && options.objects.type) {
        if (options.objects.type === 'file') {
            Objects = require(rootDir + 'lib/objects/objectsInMemServer');
        } else if (options.objects.type === 'redis') {
            try {
                Objects = require(rootDir + 'lib/objects/objectsInRedis');
            } catch (e) {
                Objects = require('iobroker.objects-redis');
            }
        }
    } else {
        Objects = require(rootDir + 'lib/objects/objectsInMemServer');
    }

    objects = new Objects(settingsObjects);

    let States;
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

    const settingsStates = {
        connection: {
            options : {
                auth_pass : null,
                retry_max_delay : 15000
            },
            type:           options.states.type     || 'file',
            host:           options.states.host     || '127.0.0.1',
            port:           (options.states.port === undefined) ? 19000 : options.states.port,
            user:           options.states.user     || '',
            pass:           options.states.pass     || '',
            dataDir:        options.states.dataDir  || ''
        },
        logger:         options.states.logger || options.logger || {
            silly: msg => console.log(msg),
            debug: msg => console.log(msg),
            info:  msg => console.log(msg),
            warn:  msg => console.warn(msg),
            error: msg => console.error(msg)
        },
        connected: () => {
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
