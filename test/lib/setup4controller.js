/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

// check if tmp directory exists
const fs            = require('fs-extra');
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

// ensure the temp dir is empty, because content of data/files etc is created and checked for existence in some tests
fs.emptyDirSync(`${rootDir}tmp`);

function startController(options, callback) {
    if (!options) {
        options = {};
    }

    let isObjectConnected;
    let isStatesConnected;

    console.log('startController...');

    // adjust db for the cli tests
    const iobrokerJSON = fs.readJSONSync(path.join(rootDir, 'data', 'iobroker.json'));
    iobrokerJSON.objects.type = options.objects.type || 'file';
    iobrokerJSON.objects.port = (options.objects.port === undefined) ? 19001 : options.objects.port;
    iobrokerJSON.objects.host = options.objects.host || '127.0.0.1';
    iobrokerJSON.objects.redisNamespace = options.objects.redisNamespace || '';
    iobrokerJSON.states.type = options.states.type || 'file';
    iobrokerJSON.states.port = (options.states.port === undefined) ? 19000 : options.states.port;
    iobrokerJSON.states.host = options.states.host || '127.0.0.1';
    fs.writeJSONSync(path.join(rootDir, 'data', 'iobroker.json'), iobrokerJSON, {spaces: 2});

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
        connected: () => {
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

    let Objects;

    if (options.objects) {
        if (!options.objects.type || options.objects.type === 'file') {
            console.log('Used class for Objects: Objects Server');
            Objects = require('@iobroker/db-objects-file').Server;
        } else if (options.objects.type === 'redis') {
            console.log('Used class for Objects: Objects Redis Client');
            Objects = require('@iobroker/db-objects-redis').Client;
        } else {
            console.log('Used custom class for Objects (assume Server available): Objects ' + options.objects.type);
            Objects = require('@iobroker/db-objects-' + options.objects.type).Server;
        }
    } else {
        console.log('Used class for Objects: Objects Server');
        Objects = require('@iobroker/db-objects-file').Server;
    }

    objects = new Objects(settingsObjects);

    let States;
    // Just open in memory DB itself
    if (options.states) {
        if (!options.states.type || options.states.type === 'file') {
            console.log('Used class for States: States Server');
            States = require('@iobroker/db-states-file').Server;
        } else if (options.states.type === 'redis') {
            console.log('Used class for States: States Redis Client');
            States = require('@iobroker/db-states-redis').Client;
        } else {
            console.log('Used custom class for States (assume Server available): States ' + options.states.type);
            States = require('@iobroker/db-states-' + options.states.type).Server;
        }
    } else {
        console.log('Used class for States: States Server');
        States = require('@iobroker/db-states-file').Server;
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
        connected: () => {
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

    states = new States(settingsStates);
}

async function stopController(cb) {
    if (objects) {
        await objects.destroy();
        objects = null;
    }
    if (states) {
        await states.destroy();
        states = null;
    }

    if (cb) {
        cb(true);
        cb = null;
    }
}

if (require.main !== module) {
    module.exports.startController  = startController;
    module.exports.stopController   = stopController;
    module.exports.appName          = appName;
    module.exports.rootDir          = rootDir;
}