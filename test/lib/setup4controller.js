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
    if (!options) {
        options = {};
    }

    let isObjectConnected;
    let isStatesConnected;

    console.log('startController...');

    const settingsObjects = {
        connection: {
            type:               options.objects.type || 'file',
            host:               options.objects.host || '127.0.0.1',
            port:               (options.objects.port === undefined) ? 19001 : options.objects.port,
            user:               options.objects.user || '',
            pass:               options.objects.pass || '',
            redisNamespace:     options.objects.redisNamespace || '',
            noFileCache:        (options.objects.noFileCache === undefined) ? options.objects.noFileCache : true,
            connectTimeout:     options.objects.connectTimeout || 2000,
            dataDir:            options.objects.dataDir || '',
            enhancedLogging: true
        },
        logger: options.objects.logger || options.logger || {
            silly: msg => console.log(msg),
            debug: msg => console.log(msg),
            info:  msg => console.log(msg),
            warn:  msg => console.warn(msg),
            error: msg => console.error(msg)
        },
        connected: objectsInst => {
            objects = objectsInst;
            // clear all states
            objects.destroyDB(() => {
                isObjectConnected = true;
                if (isStatesConnected && states) {
                    console.log('startController: started!');
                    callback && callback(objects, states);
                }
            });
        },
        change: options.objects.onChange || null
    };

    /** @type {ioBroker.ObjectsDBConstructor} */
    let Objects;

    if (options.objects) {
        if (!options.objects.type || options.objects.type === 'file') {
            console.log('Used class for Objects: objectsInMemServerRedis');
            Objects = require(path.join(rootDir, 'lib/objects/objectsInMemServerRedis'));
        } else if (options.objects.type === 'redis') {
            try {
                console.log('Used class for Objects: objectsInRedis');
                Objects = require(path.join(rootDir, 'lib/objects/objectsInRedis'));
            } catch (e) {
                console.log('Used class for Objects: iobroker.objects-redis');
                Objects = require('iobroker.objects-redis');
            }
        }
    } else {
        console.log('Used class for Objects: objectsInMemServerRedis');
        Objects = require(path.join(rootDir, 'lib/objects/objectsInMemServerRedis'));
    }

    // eslint-disable-next-line no-unused-vars
    const _objectsInst = new Objects(settingsObjects);

    /** @type {ioBroker.StatesDBConstructor} */
    let States;
    // Just open in memory DB itself
    if (options.states) {
        if (!options.states.type || options.states.type === 'file') {
            console.log('Used class for States: statesInMemServerRedis');
            States = require(path.join(rootDir, 'lib/states/statesInMemServerRedis'));
        } else {
            console.log('Used class for States: statesInRedis');
            States = require(path.join(rootDir, 'lib/states/statesInRedis'));
        }
    } else {
        console.log('Used class for States: statesInMemServerRedis');
        States = require(path.join(rootDir, 'lib/states/statesInMemServerRedis'));
    }

    const settingsStates = {
        connection: {
            options : {
                auth_pass: null,
                retry_max_delay: 15000
            },
            type:           options.states.type     || 'file',
            host:           options.states.host     || '127.0.0.1',
            port:           (options.states.port === undefined) ? 19000 : options.states.port,
            user:           options.states.user     || '',
            pass:           options.states.pass     || '',
            dataDir:        options.states.dataDir  || '',
            enhancedLogging: true
        },
        logger:         options.states.logger || options.logger || {
            silly: msg => console.log(msg),
            debug: msg => console.log(msg),
            info:  msg => console.log(msg),
            warn:  msg => console.warn(msg),
            error: msg => console.error(msg)
        },
        connected: statesInst => {
            states = statesInst;
            if (settingsStates.connection.type === 'redis') {
                states.destroyDB(() => {
                    console.log('States ok');
                    isStatesConnected = true;
                    if (isObjectConnected && objects) {
                        console.log('startController: started!');
                        callback && callback(objects, states);
                    }
                });
            } else {
                console.log('States ok');
                isStatesConnected = true;
                if (isObjectConnected && objects) {
                    console.log('startController: started!');
                    callback && callback(objects, states);
                }
            }
        },
        change: options.states.onChange || null
    };

    // eslint-disable-next-line no-unused-vars
    const _statesInst = new States(settingsStates);
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
