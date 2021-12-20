/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
'use strict';

// This is file, that makes all communication with controller. All options are optional except name.
// following options are available:
//   name:                  name of the adapter. Must be exactly the same as directory name.
//   dirname:               adapter directory name
//   instance:              instance number of adapter
//   objects:               true or false, if desired to have oObjects. This is a list with all states, channels and devices of this adapter and it will be updated automatically.
//   states:                true or false, if desired to have oStates. This is a list with all states values and it will be updated automatically.
//   systemConfig:          if required system configuration. Store it in systemConfig attribute
//   objectChange:          callback function (id, obj) that will be called if object changed
//   stateChange:           callback function (id, obj) that will be called if state changed
//   message:               callback to inform about new message the adapter
//   unload:                callback to stop the adapter
//   config:                configuration of the connection to controller
//   noNamespace:           return short names of objects and states in objectChange and in stateChange
//   strictObjectChecks:    flag which defaults to true - if true, adapter warns if states are set without an corresponding existing object

const net               = require('net');
const fs                = require('fs-extra');
const extend            = require('node.extend');
const util              = require('util');
const os                = require('os');
const EventEmitter      = require('events').EventEmitter;
const tools             = require('./tools');
const pidUsage          = require('pidusage');
const deepClone         = require('deep-clone');
const EXIT_CODES        = require('./exitCodes');
const {PluginHandler}   = require('@iobroker/plugin-base');
const controllerVersion = require('../package.json').version;

const password          = require('./password');

const { FORBIDDEN_CHARS } = tools;
const DEFAULT_SECRET    = 'Zgfr56gFe87jJOM';
const ALIAS_STARTS_WITH = 'alias.';

const SYSTEM_ADMIN_USER  = 'system.user.admin';
const SYSTEM_ADMIN_GROUP = 'system.group.administrator';
const QUALITY_SUBS_INITIAL = 0x20;

const supportedFeatures = [
    'ALIAS', // Alias Feature supported, Since js-controller 2.0
    'ALIAS_SEPARATE_READ_WRITE_ID', // Alias support separated ids for read and write, Since js-controller 3.0
    'ADAPTER_GETPORT_BIND', // getPort method of adapter supports second parameter to bind to a special network interface, Since js-controller 2.0
    'ADAPTER_DEL_OBJECT_RECURSIVE', // delObject supports options.recursive flag to delete objects structures recursive, Since js-controller 2.2
    'ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE', // setObject(*) methods set the default (def) value via setState after the object is created. Since js-controller 2.0
    'ADAPTER_AUTO_DECRYPT_NATIVE', // all native attributes, that are listed in an array `encryptedNative` in io-pack will be automatically decrypted and encrypted. Since js-controller 3.0
    'PLUGINS', // configurable plugins supported. Since js-controller 3.0
    'CONTROLLER_NPM_AUTO_REBUILD', // Automatic rebuild when node version mismatch is detected. Since js-controller 3.0
    'CONTROLLER_READWRITE_BASE_SETTINGS' // If base settings could be read and written. Since js-controller 3.0
];

//const ACCESS_EVERY_EXEC  = 0x1;
const ACCESS_EVERY_WRITE = 0x2;
const ACCESS_EVERY_READ  = 0x4;
//const ACCESS_EVERY_RW    = ACCESS_EVERY_WRITE | ACCESS_EVERY_READ;
//const ACCESS_EVERY_ALL   = ACCESS_EVERY_WRITE | ACCESS_EVERY_READ | ACCESS_EVERY_EXEC;

//const ACCESS_GROUP_EXEC  = 0x10;
const ACCESS_GROUP_WRITE = 0x20;
const ACCESS_GROUP_READ  = 0x40;
//const ACCESS_GROUP_RW    = ACCESS_GROUP_WRITE | ACCESS_GROUP_READ;
//const ACCESS_GROUP_ALL   = ACCESS_GROUP_WRITE | ACCESS_GROUP_READ | ACCESS_GROUP_EXEC;

//const ACCESS_USER_EXEC   = 0x100;
const ACCESS_USER_WRITE  = 0x200;
const ACCESS_USER_READ   = 0x400;
//const ACCESS_USER_RW     = ACCESS_USER_WRITE | ACCESS_USER_READ;
//const ACCESS_USER_ALL    = ACCESS_USER_WRITE | ACCESS_USER_READ | ACCESS_USER_EXEC;

// const ACCESS_EXEC        = 0x1;
// const ACCESS_WRITE       = 0x2;
// const ACCESS_READ        = 0x4;
// const ACCESS_LIST        = 'list';
// const ACCESS_DELETE      = 'delete';
// const ACCESS_CREATE      = 'create';

const ERROR_PERMISSION   = 'permissionError';

/**
 * Look up the error description for an error code
 *
 * @param {number} code error code
 * @return {string} error description
 */
function getErrorText(code) {
    code = code || 0;
    return (EXIT_CODES[code] || code).toString();
}

class Log {
    /**
     * @param {string} namespaceLog Logging namespace to prefix
     * @param {string} level The log level
     * @param {object} logger logger instance
     */
    constructor(namespaceLog, level, logger) {
        this.namespaceLog = namespaceLog;
        this.level = level;
        // We have to bind the this context here or it is possible that `this` is
        // undefined when passing around the logger methods. This happens e.g. when doing this:
        //   const log = new Log(...);
        //   const test = log.info;
        //   test();
        this.logger = logger;
        this.silly = this.silly.bind(this);
        this.debug = this.debug.bind(this);
        this.info  = this.info.bind(this);
        this.error = this.error.bind(this);
        this.warn  = this.warn.bind(this);
    }
    silly(msg) {
        this.logger.silly(this.namespaceLog + ' ' + msg);
    }
    debug(msg) {
        this.logger.debug(this.namespaceLog + ' ' + msg);
    }
    info(msg) {
        this.logger.info(this.namespaceLog + ' ' + msg);
    }
    error(msg) {
        this.logger.error(this.namespaceLog + ' ' + msg);
    }
    warn(msg) {
        this.logger.warn(this.namespaceLog + ' ' + msg);
    }
}

/**
 * Adapter class
 *
 * How the initialization happens:
 *  initObjects => initStates => prepareInitAdapter => createInstancesObjects => initAdapter => initLogging => ready
 *
 * @class
 * @param {string|object} options object like {name: "adapterName", systemConfig: true} or just "adapterName"
 * @return {object} object instance
 */
function Adapter(options) {
    if (!(this instanceof Adapter)) {
        return new Adapter(options);
    }

    /** @type {Record<string, any>} */
    let config              = null;
    let defaultObjs;
    const configFileName = tools.getConfigFileName();

    if (fs.existsSync(configFileName)) {
        config = fs.readJSONSync(configFileName);
        config.states = config.states || {type: 'file'};
        config.objects = config.objects || {type: 'file'};
    } else {
        throw new Error(`Cannot find ${configFileName}`);
    }

    if (!options || (!config && !options.config)) {
        throw new Error('Configuration not set!');
    }

    let schedule;
    let restartScheduleJob;
    let initializeTimeout;
    let adapterStates;
    let adapterObjects;
    let timers = {};
    let timerId = 1;
    let intervals = {};
    let stopInProgress = false;

    if (options.config && !options.config.log) {
        options.config.log = config.log;
    }

    config = options.config || config;
    this.startedInCompactMode = options.compact;
    const regUser = /^system\.user\./;
    const regGroup = /^system\.group\./;
    let   firstConnection = true;
    let   systemSecret    = null;

    let reportInterval;

    this.logList = [];
    this.aliases = {};
    this.aliasPatterns = [];

    // TODO: Remove this backward compatibility shim in the future
    this.objects = {};

    this.eventLoopLags = [];
    this.overwriteLogLevel = false;
    this.adapterReady = false;

    // Provide tools for use in adapter
    this.tools = tools;

    // possible arguments
    // 0,1,.. - instance
    // info, debug, warn, error - log level
    // --force
    // --logs
    // --silent
    // --install
    // --debug = --force + --logs
    if (process.argv) {
        for (let a = 1; a < process.argv.length; a++) {
            if (process.argv[a] === 'info' || process.argv[a] === 'debug' || process.argv[a] === 'error' || process.argv[a] === 'warn' || process.argv[a] === 'silly') {
                config.log.level = process.argv[a];
                this.overwriteLogLevel = true;
            } else if (process.argv[a] === '--silent') {
                config.isInstall = true;
                process.argv[a] = '--install';
            } else if (process.argv[a] === '--install') {
                config.isInstall = true;
            } else if (process.argv[a] === '--logs') {
                config.consoleOutput = true;
            } else if (process.argv[a] === '--force') {
                config.forceIfDisabled = true;
            } else if (process.argv[a] === '--debug') {
                config.forceIfDisabled = true;
                config.consoleOutput   = true;
                if (config.log.level !== 'silly') {
                    config.log.level = 'debug';
                    this.overwriteLogLevel = true;
                }
            } else if (process.argv[a] === '--console') {
                config.consoleOutput   = true;
            } else if (parseInt(process.argv[a], 10).toString() === process.argv[a]) {
                config.instance = parseInt(process.argv[a], 10);
            }
        }
    }

    config.log.level = config.log.level || 'info';

    config.log.noStdout = !config.consoleOutput;

    const logger = require('./logger.js')(config.log);

    // compatibility
    if (!logger.silly) {
        logger.silly = logger.debug;
    }

    // enable "var adapter = require(__dirname + '/../../lib/adapter.js')('adapterName');" call
    if (typeof options === 'string') {
        options = {name: options};
    }

    if (!options.name) {
        throw new Error('No name of adapter!');
    }

    this.performStrictObjectChecks = options.strictObjectChecks !== false;

    this._getObjectsByArray = (keys, objects, options, cb, _index, _result, _errors) => {
        if (objects) {
            return tools.maybeCallbackWithError(cb, null, objects);
        }
        _index  = _index  || 0;
        _result = _result || [];
        _errors = _errors || [];

        while(!keys[_index] && _index < keys.length) {
            _index++;
        }

        if (_index >= keys.length) {
            return tools.maybeCallbackWithError(cb, _errors.find(e => e) ? _errors : null, _result);
        }

        // if empty => skip immediately
        this.getForeignObject(keys[_index], options, (err, obj) => {
            _result[_index] = obj;
            setImmediate(() => this._getObjectsByArray(keys, objects, options, cb, _index + 1, _result, _errors));
        });
    };

    /**
     * stops the execution of adapter, but not disables it.
     *
     * Sometimes, the adapter must be stopped if some libraries are missing.
     *
     * @alias terminate
     * @memberof Adapter
     * @param {string | number} [reason] optional termination description
     * @param {number} [exitCode] optional exit code
     */
    this.terminate = (reason, exitCode) => {
        // This function must be defined very first, because in the next lines will be yet used.
        if (this.terminated) {
            return;
        }
        this.terminated = true;

        this.pluginHandler && this.pluginHandler.destroyAll();

        if (reportInterval) {
            clearInterval(reportInterval);
            reportInterval = null;
        }
        if (restartScheduleJob) {
            restartScheduleJob.cancel();
            restartScheduleJob = null;
        }
        if (typeof reason === 'number') {
            // Only the exit code was passed
            exitCode = reason;
            reason = null;
        }
        if (typeof exitCode !== 'number') {
            exitCode = process.argv.indexOf('--install') === -1 ? EXIT_CODES.ADAPTER_REQUESTED_TERMINATION : EXIT_CODES.NO_ERROR;
        }

        const isNotCritical =
            exitCode === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION
            || exitCode === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP
            || exitCode === EXIT_CODES.NO_ERROR
        ;

        const text = `${this.namespaceLog} Terminated (${getErrorText(exitCode)}): ${reason ? reason : 'Without reason'}`;
        if (isNotCritical) {
            logger.info(text);
        } else {
            logger.warn(text);
        }
        setTimeout(async () => { // give last states some time to get handled
            if (adapterStates) {
                try {
                    await adapterStates.destroy();
                } catch {
                    // ignore
                }
            }
            if (adapterObjects) {
                try {
                    await adapterObjects.destroy();
                } catch {
                    //ignore
                }
            }
            if (this.startedInCompactMode) {
                this.emit('exit', exitCode, reason);
                adapterStates = null;
                adapterObjects = null;
            } else {
                process.exit(exitCode === undefined ? EXIT_CODES.ADAPTER_REQUESTED_TERMINATION : exitCode);
            }
        }, 500);
    };

    // If installed as npm module
    if (options.dirname) {
        this.adapterDir = options.dirname.replace(/\\/g, '/');
    } else {
        this.adapterDir = __dirname.replace(/\\/g, '/').split('/');
        // it can be .../node_modules/appName.js-controller/node_modules/appName.adapter
        //           .../appName.js-controller/node_modules/appName.adapter
        //           .../appName.js-controller/adapter/adapter
        // remove "lib"
        this.adapterDir.pop();
        const jsc = this.adapterDir.pop();
        if ((jsc === tools.appName + '.js-controller' || jsc === tools.appName.toLowerCase() + '.js-controller') && this.adapterDir.pop() === 'node_modules') {
            // js-controller is installed as npm
            const appName = tools.appName.toLowerCase();
            this.adapterDir = this.adapterDir.join('/');
            if (fs.existsSync(this.adapterDir + '/node_modules/' + appName + '.' + options.name)) {
                this.adapterDir += '/node_modules/' + appName + '.' + options.name;
            } else if (fs.existsSync(this.adapterDir + '/node_modules/' + appName + '.js-controller/node_modules/' + appName + '.' + options.name)) {
                this.adapterDir += '/node_modules/' + appName + '.js-controller/node_modules/' + appName + '.' + options.name;
            } else if (fs.existsSync(this.adapterDir + '/node_modules/' + appName + '.js-controller/adapter/' + options.name)) {
                this.adapterDir += '/node_modules/' + appName + '.js-controller/adapter/' + options.name;
            } else if (fs.existsSync(this.adapterDir + '/node_modules/' + tools.appName + '.js-controller/node_modules/' + appName + '.' + options.name)) {
                this.adapterDir += '/node_modules/' + tools.appName + '.js-controller/node_modules/' + appName + '.' + options.name;
            } else {
                logger.error(this.namespaceLog + ' Cannot find directory of adapter ' + options.name);
                this.terminate(EXIT_CODES.CANNOT_FIND_ADAPTER_DIR);
            }
        } else {
            this.adapterDir = __dirname.replace(/\\/g, '/');
            // remove "/lib"
            this.adapterDir = this.adapterDir.substring(0, this.adapterDir.length - 4);
            if (fs.existsSync(this.adapterDir + '/node_modules/' + tools.appName + '.' + options.name)) {
                this.adapterDir += '/node_modules/' + tools.appName + '.' + options.name;
            } else if (fs.existsSync(this.adapterDir + '/../node_modules/' + tools.appName + '.' + options.name)) {
                const parts = this.adapterDir.split('/');
                parts.pop();
                this.adapterDir = parts.join('/') + '/node_modules/' + tools.appName + '.' + options.name;
            } else {
                logger.error(this.namespaceLog + ' Cannot find directory of adapter ' + options.name);
                this.terminate(EXIT_CODES.CANNOT_FIND_ADAPTER_DIR);
            }
        }
    }

    if (fs.existsSync(this.adapterDir + '/package.json')) {
        this.pack = fs.readJSONSync(this.adapterDir + '/package.json');
    } else {
        logger.info(this.namespaceLog + ' Non npm module. No package.json');
    }

    if (!this.pack || !this.pack.io) {
        if (fs.existsSync(this.adapterDir + '/io-package.json')) {
            this.ioPack = fs.readJSONSync(this.adapterDir + '/io-package.json');
        } else {
            logger.error(this.namespaceLog + ' Cannot find: ' + this.adapterDir + '/io-package.json');
            this.terminate(EXIT_CODES.CANNOT_FIND_ADAPTER_DIR);
        }
    } else {
        this.ioPack = this.pack.io;
    }

    // If required system configuration. Store it in systemConfig attribute
    if (options.systemConfig) {
        this.systemConfig = config;
        // Workaround for an admin 5 issue which could lead to deleting the dataDir folder
        // TODO: remove it as soon as all adapters are fixed which use systemConfig.dataDir
        if (!Object.prototype.hasOwnProperty.call(this.systemConfig, 'dataDir')) {
            this.systemConfig.dataDir = tools.getDefaultDataDir();
        }
    }

    let States;
    if (config.states && config.states.type) {
        try {
            States = require(`@iobroker/db-states-${config.states.type}`).Client;
        } catch (err) {
            throw new Error(`Unknown states type: ${config.states.type}: ${err.message}`);
        }
    } else {
        States  = require('./states');
    }

    let Objects;
    if (config.objects && config.objects.type) {
        try {
            Objects = require(`@iobroker/db-objects-${config.objects.type}`).Client;
        } catch (err) {
            throw new Error(`Unknown objects type: ${config.objects.type}: ${err.message}`);
        }
    } else {
        Objects = require('./objects');
    }

    const ifaces = os.networkInterfaces();
    const ipArr  = [];
    for (const dev in ifaces) {
        if (!Object.prototype.hasOwnProperty.call(ifaces, dev)) {
            continue;
        }
        /*jshint loopfunc:true */
        ifaces[dev].forEach(details => !details.internal && ipArr.push(details.address));
    }

    const instance = parseInt(options.compactInstance  !== undefined ? options.compactInstance : ((options.instance !== undefined) ? options.instance : (config.instance || 0)), 10);

    this.name            = options.name;
    this.namespace       = options.name + '.' + instance;
    this.namespaceLog    = this.namespace + (this.startedInCompactMode ? ' (COMPACT)' : ' (' + process.pid + ')');
    this._namespaceRegExp = new RegExp('^' + (this.namespace + '.').replace(/\./g, '\\.')); // cache the regex object 'adapter.0.'

    /** The cache of users */
    this.users           = {};
    /** The cache of usernames */
    this.usernames       = {};
    /** The cache of user groups */
    this.groups          = {};
    this.defaultHistory  = null;
    /** An array of instances, that support auto subscribe */
    this.autoSubscribe   = null;
    this.inputCount      = 0;
    this.outputCount     = 0;
    /** A RegExp to test for forbidden chars in object IDs */
    this.FORBIDDEN_CHARS = FORBIDDEN_CHARS;
    /** Whether the adapter has already terminated */
    this.terminated      = false;

    let callbackId = 1;
    this.getPortRunning = null;

    /**
     * Checks if a passed ID is valid. Throws an error if id is invalid
     *
     * @param {string|object} id id to check or object with properties device, channel and state
     * @param {boolean} isForeignId true&false if the ID is a foreign/full ID or only an "adapter local" id
     * @param {object} options optional
     * @throws Error when id is invalid
     */
    const validateId = (id, isForeignId, options) => {
        // there is special maintenance mode to clear the DB from invalid IDs
        if (options && options.maintenance && options.user === SYSTEM_ADMIN_USER) {
            return;
        }

        if (!id && id !== 0) {
            throw new Error('The id is empty! Please provide a valid id.');
        }

        const type = typeof id;

        if (!isForeignId && type === 'number') {
            logger.warn(`${this.namespaceLog} The id "${id}" has an invalid type!: Expected "string" or "object", received "number".`);
            logger.warn(`${this.namespaceLog} This will be refused in future versions. Please report this to the developer.`);
        } else if (type !== 'string' && !tools.isObject(id)) {
            throw new Error(`The id "${id}" has an invalid type! Expected "string" or "object", received "${type}".`);
        }

        if (tools.isObject(id)) {
            // id can be an object, at least one of the following properties has to exist
            const reqProperties = ['device', 'channel', 'state'];
            let found = false;
            for (const reqProperty of reqProperties) {
                if (reqProperty !== undefined) {
                    if (typeof reqProperty !== 'string') {
                        throw new Error(`The id's property "${reqProperty}" of "${JSON.stringify(id)}" has an invalid type! Expected "string", received "${typeof reqProperty}".`);
                    }

                    if (reqProperty.includes('.')) {
                        throw new Error(`The id's property "${reqProperty}" of "${JSON.stringify(id)}" contains the invalid character "."!`);
                    }
                    found = true;
                }
            }
            if (found === false) {
                throw new Error(`The id "${JSON.stringify(id)}" is an invalid object! Expected at least one of the properties "device", "channel" or "state" to exist.`);
            }
        } else {
            if (type !== 'string') {
                throw new Error(`The id "${JSON.stringify(id)}" has an invalid type! Expected "string", received "${type}".`);
            }
            if (id.endsWith('.')) {
                throw new Error(`The id "${id}" is invalid. Ids are not allowed to end in "."`);
            }
        }
    };

    /**
     * Helper function to find next free port
     *
     * Looks for first free TCP port starting with given one:
     * <pre><code>
     *     adapter.getPort(8081, function (port) {
     *         adapter.log.debug('Following port is free: ' + port);
     *     });
     * </code></pre>
     *
     * @alias getPort
     * @memberof Adapter
     * @param {number} port port number to start the search for free port
     * @param {string} [host] optional hostname for the port search
     * @param {(port: number) => void} callback return result
     *        <pre><code>function (port) {}</code></pre>
     */
    this.getPort = (port, host, callback) => {
        if (!port) {
            throw new Error('adapterGetPort: no port');
        }

        if (typeof host === 'function') {
            callback = host;
            host = null;
        }
        if (!host) {
            host = undefined;
        }

        if (typeof port === 'string') {
            port = parseInt(port, 10);
        }
        this.getPortRunning = {port, host, callback};
        const server = net.createServer();
        try {
            server.listen({port, host},(/* err */) => {
                server.once('close', () => {
                    return tools.maybeCallback(callback, port);
                });
                server.close();
            });
            server.on('error', (/* err */) => {
                setTimeout(() => this.getPort(port + 1, host, callback), 100);
            });
        } catch {
            setImmediate(() => this.getPort(port + 1, host, callback));
        }
    };

    /**
     * Promise-version of Adapter.getPort
     */
    this.getPortAsync = tools.promisifyNoError(this.getPort, this);

    /**
     * Method to check for available Features for adapter development
     *
     * Use it like ...
     * <pre><code>
     *     if (adapter.supportsFeature && adapter.supportsFeature('ALIAS')) {
     *         ...
     *     }
     * </code></pre>

     * @alias supportsFeature
     * @memberof Adapter
     * @param {string} featureName the name of the feature to check
     * @returns {boolean} true/false wether the featufre is in the list of supported features
     */
    this.supportsFeature = featureName => {
        return supportedFeatures.includes(featureName);
    };

    /**
     * validates user and password
     *
     *
     * @alias checkPassword
     * @memberof Adapter
     * @param {string} user user name as text
     * @param {string} pw password as text
     * @param {object} [options] optional user context
     * @param {(success: boolean, user: string) => void} callback return result
     *        <pre><code>
     *            function (result) {
     *              if (result) adapter.log.debug('User is valid');
     *            }
     *        </code></pre>
     */
    this.checkPassword = async (user, pw, options, callback) => {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!callback) {
            throw new Error('checkPassword: no callback');
        }

        if (user && !regUser.test(user)) {
            // its not yet a `system.user.xy` id, thus we assume it's a username
            if (!this.usernames[user]) {
                // we did not find the id of the username in our cache -> update cache
                try {
                    await updateUsernameCache();
                } catch (e) {
                    this.log.error(e.message);
                }
                if (!this.usernames[user]) {
                    // user still not there, its no valid user -> fallback to legacy check
                    user = `system.user.${user.toString().replace(this.FORBIDDEN_CHARS, '_').replace(/\s/g, '_').replace(/\./g, '_').toLowerCase()}`;
                } else {
                    user = this.usernames[user].id;
                }
            } else {
                user = this.usernames[user].id;
            }
        }

        this.getForeignObject(user, options, (err, obj) => {
            if (err || !obj || !obj.common || (!obj.common.enabled && user !== SYSTEM_ADMIN_USER)) {
                return tools.maybeCallback(callback, false, user);
            } else {
                password(pw).check(obj.common.password, (err, res) => {
                    return tools.maybeCallback(callback, res, user);
                });
            }
        });
    };
    /**
     * Promise-version of Adapter.checkPassword
     */
    this.checkPasswordAsync = tools.promisifyNoError(this.checkPassword, this);

    /**
     * Return ID of given username
     *
     * @param {string} username - name of the user
     * @return {Promise<undefined|string>}
     */
    this.getUserID = async username => {
        if (!this.usernames[username]) {
            try {
                // did not find username, we should have a look in the cache
                await updateUsernameCache();

                if (!this.usernames[username]) {
                    return;
                }
            } catch (e) {
                this.log.error(e.message);
                return;
            }
        }

        return this.usernames[username].id;
    };

    /**
     * sets the user's password
     *
     * @alias setPassword
     * @memberof Adapter
     * @param {string} user user name as text
     * @param {string} pw password as text
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot set password: ' + err);
     *            }
     *        </code></pre>
     */
    this.setPassword = async (user, pw, options, callback) => {
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }

        if (user && !regUser.test(user)) {
            // its not yet a `system.user.xy` id, thus we assume it's a username
            if (!this.usernames[user]) {
                // we did not find the id of the username in our cache -> update cache
                try {
                    await updateUsernameCache();
                } catch (e) {
                    this.log.error(e);
                }
                if (!this.usernames[user]) {
                    // user still not there, fallback to legacy check
                    user = `system.user.${user.toString().replace(this.FORBIDDEN_CHARS, '_').replace(/\s/g, '_').replace(/\./g, '_').toLowerCase()}`;
                } else {
                    user = this.usernames[user].id;
                }
            } else {
                user = this.usernames[user].id;
            }
        }

        this.getForeignObject(user, options, (err, obj) => {
            if (err || !obj) {
                return tools.maybeCallbackWithError(callback, 'User does not exist');
            }

            // BF: (2020.05.22) are the empty passwords allowed??
            if (!pw) {
                this.extendForeignObject(user, {
                    common: {
                        password: ''
                    }
                }, options, () => {
                    return tools.maybeCallback(callback);
                });
            } else {
                password(pw).hash(null, null, (err, res) => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                    this.extendForeignObject(user, {
                        common: {
                            password: res
                        }
                    }, options, () => {
                        return tools.maybeCallbackWithError(callback, null);
                    });
                });

            }
        });
    };

    /**
     * Promise-version of Adapter.setPassword
     */
    this.setPasswordAsync = tools.promisify(this.setPassword, this);

    /**
     * returns if user exists and is in the group
     *
     * This function used mostly internally and the adapter developer do not require it.
     *
     * @alias checkGroup
     * @memberof Adapter
     * @param {string} user user name as text
     * @param {string} group group name
     * @param {object} [options] optional user context
     * @param {(result: boolean) => void} callback return result
     *        <pre><code>
     *            function (result) {
     *              if (result) adapter.log.debug('User exists and in the group');
     *            }
     *        </code></pre>
     */
    this.checkGroup = async (user, group, options, callback) => {
        user = (user || '');

        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }

        if (user && !regUser.test(user)) {
            // its not yet a `system.user.xy` id, thus we assume it's a username
            if (!this.usernames[user]) {
                // we did not find the id of the username in our cache -> update cache
                try {
                    await updateUsernameCache();
                } catch (e) {
                    this.log.error(e);
                }

                if (!this.usernames[user]) {
                    // user still not there, its no valid user -> fallback
                    user = `system.user.${user.toString().replace(this.FORBIDDEN_CHARS, '_').replace(/\s/g, '_').replace(/\./g, '_').toLowerCase()}`;
                } else {
                    user = this.usernames[user].id;
                }
            } else {
                user = this.usernames[user].id;
            }
        }

        if (group && !regGroup.test(group)) {
            group = 'system.group.' + group;
        }
        this.getForeignObject(user, options, (err, obj) => {
            if (err || !obj) {
                return tools.maybeCallback(callback, false);
            }
            this.getForeignObject(group, options, (err, obj) => {
                if (err || !obj) {
                    return tools.maybeCallback(callback, false);
                }
                if (obj.common.members.indexOf(user) !== -1) {
                    return tools.maybeCallback(callback, true);
                } else {
                    return tools.maybeCallback(callback, false);
                }
            });
        });
    };

    /**
     * Promise-version of Adapter.checkGroup
     */
    this.checkGroupAsync = tools.promisifyNoError(this.checkGroup, this);

    /** @typedef {{[permission: string]: {type: 'object' | 'state' | '' | 'other' | 'file', operation: string}}} CommandsPermissions */

    /**
     * get the user permissions
     *
     * This function used mostly internally and the adapter developer do not require it.
     * The function reads permissions of user's groups (it can be more than one) and merge permissions together
     *
     * @alias calculatePermissions
     * @memberof Adapter
     * @param {string} user user name as text
     * @param {CommandsPermissions} commandsPermissions object that describes the access rights like
     *     <pre><code>
     *         // static information
     *         var commandsPermissions = {
     *            getObject:          {type: 'object',    operation: 'read'},
     *            getObjects:         {type: 'object',    operation: 'list'},
     *            getObjectView:      {type: 'object',    operation: 'list'},
     *            setObject:          {type: 'object',    operation: 'write'},
     *            subscribeObjects:   {type: 'object',    operation: 'read'},
     *            unsubscribeObjects: {type: 'object',    operation: 'read'},
     *
     *            getStates:          {type: 'state',     operation: 'list'},
     *            getState:           {type: 'state',     operation: 'read'},
     *            setState:           {type: 'state',     operation: 'write'},
     *            getStateHistory:    {type: 'state',     operation: 'read'},
     *            subscribe:          {type: 'state',     operation: 'read'},
     *            unsubscribe:        {type: 'state',     operation: 'read'},
     *            getVersion:         {type: '',          operation: ''},
     *
     *            httpGet:            {type: 'other',     operation: 'http'},
     *            sendTo:             {type: 'other',     operation: 'sendto'},
     *            sendToHost:         {type: 'other',     operation: 'sendto'},
     *
     *            readFile:           {type: 'file',      operation: 'read'},
     *            readFile64:         {type: 'file',      operation: 'read'},
     *            writeFile:          {type: 'file',      operation: 'write'},
     *            writeFile64:        {type: 'file',      operation: 'write'},
     *            unlink:             {type: 'file',      operation: 'delete'},
     *            rename:             {type: 'file',      operation: 'write'},
     *            mkdir:              {type: 'file',      operation: 'write'},
     *            readDir:            {type: 'file',      operation: 'list'},
     *            chmodFile:          {type: 'file',      operation: 'write'},
     *            chownFile:          {type: 'file',      operation: 'write'},
     *
     *            authEnabled:        {type: '',          operation: ''},
     *            disconnect:         {type: '',          operation: ''},
     *            listPermissions:    {type: '',          operation: ''},
     *            getUserPermissions: {type: 'object',    operation: 'read'}
     *         };
     *        </code></pre>
     * @param {object} [options] optional user context
     * @param {(result: ioBroker.PermissionSet) => void} [callback] return result
     *        <pre><code>
     *            function (acl) {
     *              // Access control object for admin looks like:
     *              // {
     *              //    file: {
     *              //         read:       true,
     *              //         write:      true,
     *              //         'delete':   true,
     *              //         create:     true,
     *              //         list:       true
     *              //     },
     *              //     object: {
     *              //         read:       true,
     *              //         write:      true,
     *              //         'delete':   true,
     *              //         list:       true
     *              //     },
     *              //     state: {
     *              //         read:       true,
     *              //         write:      true,
     *              //         'delete':   true,
     *              //         create:     true,
     *              //         list:       true
     *              //     },
     *              //     user: 'admin',
     *              //     users:  {
     *              //         read:       true,
     *              //         write:      true,
     *              //         create:     true,
     *              //         'delete':   true,
     *              //         list:       true
     *              //     },
     *              //     other: {
     *              //         execute:    true,
     *              //         http:       true,
     *              //         sendto:     true
     *              //     },
     *              //     groups: ['administrator'] // can be more than one
     *              // }
     *            }
     *        </code></pre>
     */
    this.calculatePermissions = async (user, commandsPermissions, options, callback) => {
        user = (user || '');

        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }

        if (user && !regUser.test(user)) {
            // its not yet a `system.user.xy` id, thus we assume it's a username
            if (!this.usernames[user]) {
                // we did not find the id of the username in our cache -> update cache
                try {
                    await updateUsernameCache();
                } catch (e) {
                    this.log.error(e.message);
                }
                // user still not there, fallback
                if (!this.usernames[user]) {
                    user = `system.user.${user.toString().replace(this.FORBIDDEN_CHARS, '_').replace(/\s/g, '_').replace(/\./g, '_').toLowerCase()}`;
                } else {
                    user = this.usernames[user].id;
                }
            } else {
                user = this.usernames[user].id;
            }
        }

        // read all groups
        let acl = {user: user};
        if (user === SYSTEM_ADMIN_USER) {
            acl.groups = [SYSTEM_ADMIN_GROUP];
            for (const c of Object.keys(commandsPermissions)) {
                if (!commandsPermissions[c].type) {
                    continue;
                }
                acl[commandsPermissions[c].type] = acl[commandsPermissions[c].type] || {};
                acl[commandsPermissions[c].type][commandsPermissions[c].operation] = true;
            }

            return tools.maybeCallback(callback, acl);
        }
        acl.groups = [];
        this.getForeignObjects('*', 'group', null, options, (err, groups) => {
            // aggregate all groups permissions, where this user is
            if (groups) {
                for (const g of Object.keys(groups)) {
                    if (groups[g] &&
                        groups[g].common &&
                        groups[g].common.members &&
                        groups[g].common.members.indexOf(user) !== -1) {
                        acl.groups.push(groups[g]._id);
                        if (groups[g]._id === SYSTEM_ADMIN_GROUP) {
                            acl = {
                                file: {
                                    read:       true,
                                    write:      true,
                                    'delete':   true,
                                    create:     true,
                                    list:       true
                                },
                                object: {
                                    read:       true,
                                    write:      true,
                                    'delete':   true,
                                    list:       true
                                },
                                state: {
                                    read:       true,
                                    write:      true,
                                    'delete':   true,
                                    create:     true,
                                    list:       true
                                },
                                user: user,
                                users:  {
                                    read:       true,
                                    write:      true,
                                    create:     true,
                                    'delete':   true,
                                    list:       true
                                },
                                other: {
                                    execute:    true,
                                    http:       true,
                                    sendto:     true
                                },
                                groups: acl.groups
                            };
                            break;
                        }

                        const gAcl = groups[g].common.acl;
                        try {
                            for (const type of Object.keys(gAcl)) {
                                // fix bug. Some version have user instead of users.
                                if (type === 'user') {
                                    acl.users = acl.users || {};
                                } else {
                                    acl[type] = acl[type] || {};
                                }
                                for (const op of Object.keys(gAcl[type])) {
                                    // fix error
                                    if (type === 'user') {
                                        acl.users[op] = acl.users[op] || gAcl.user[op];
                                    } else {
                                        acl[type][op] = acl[type][op] || gAcl[type][op];
                                    }
                                }
                            }
                        } catch (e) {
                            logger.error(this.namespaceLog + ' Cannot set acl: ' + e);
                            logger.error(this.namespaceLog + ' Cannot set acl: ' + JSON.stringify(gAcl));
                            logger.error(this.namespaceLog + ' Cannot set acl: ' + JSON.stringify(acl));
                        }
                    }
                }
            }

            return tools.maybeCallback(callback, acl);
        });
    };
    /**
     * Promise-version of Adapter.calculatePermissions
     */
    this.calculatePermissionsAsync = tools.promisifyNoError(this.calculatePermissions, this);

    const readFileCertificate = cert => {
        if (typeof cert === 'string') {
            try {
                // if length < 1024 its no valid cert, so we assume a path to a valid certificate
                if (cert.length < 1024 && fs.existsSync(cert)) {
                    const certFile = cert;
                    cert = fs.readFileSync(certFile, 'utf8');
                    // start watcher of this file
                    fs.watch(certFile, (eventType, filename) => {
                        logger.warn(`${this.namespaceLog} New certificate "${filename}" detected. Restart adapter`);
                        setTimeout(stop, 2000, false, true);
                    });
                }
            } catch (e) {
                logger.error(`${this.namespaceLog} Could not read certificate from file ${cert}: ${e.message}`);
            }
        }
        return cert;
    };

    /**
     * returns SSL certificates by name
     *
     * This function returns SSL certificates (private key, public cert and chained certificate).
     * Names are defined in the system's configuration in admin, e.g. "defaultPrivate", "defaultPublic".
     * The result can be directly used for creation of https server.
     *
     * @alias getCertificates
     * @memberof Adapter
     * @param {string} [publicName] public certificate name
     * @param {string} [privateName] private certificate name
     * @param {string} [chainedName] optional chained certificate name
     * @param {(err: string | null, certs?: ioBroker.Certificates, useLetsEncryptCert?: boolean) => void} callback return result
     *        <pre><code>
     *            function (err, certs, letsEncrypt) {
     *              adapter.log.debug('private key: ' + certs.key);
     *              adapter.log.debug('public cert: ' + certs.cert);
     *              adapter.log.debug('chained cert: ' + certs.ca);
     *            }
     *        </code></pre>
     */
    this.getCertificates = (publicName, privateName, chainedName, callback) => {
        if (typeof publicName === 'function') {
            callback = publicName;
            publicName = null;
        }
        if (typeof privateName === 'function') {
            callback = privateName;
            privateName = null;
        }
        if (typeof chainedName === 'function') {
            callback = chainedName;
            chainedName = null;
        }
        publicName  = publicName  || this.config.certPublic;
        privateName = privateName || this.config.certPrivate;
        chainedName = chainedName || this.config.certChained;

        // Load certificates
        this.getForeignObject('system.certificates', null, (err, obj) => {
            if (err || !obj ||
                !obj.native.certificates ||
                !publicName ||
                !privateName ||
                !obj.native.certificates[publicName] ||
                !obj.native.certificates[privateName] ||
                (chainedName && !obj.native.certificates[chainedName])
            ) {
                logger.error(this.namespaceLog + ' Cannot configure secure web server, because no certificates found: ' + publicName + ', ' + privateName + ', ' + chainedName);
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_NOT_FOUND);
            } else {
                let ca;
                if (chainedName) {
                    const chained = readFileCertificate(obj.native.certificates[chainedName]).split('-----END CERTIFICATE-----\r\n');
                    ca = [];
                    for (let c = 0; c < chained.length; c++) {
                        if (chained[c].replace(/(\r\n|\r|\n)/g, '').trim()) {
                            ca.push(chained[c] + '-----END CERTIFICATE-----\r\n');
                        }
                    }
                }

                return tools.maybeCallbackWithError(callback, null, {
                    key:  readFileCertificate(obj.native.certificates[privateName]),
                    cert: readFileCertificate(obj.native.certificates[publicName]),
                    ca
                }, obj.native.letsEncrypt);
            }
        });
    };
    /**
     * Promise-version of Adapter.getCertificates
     */
    this.getCertificatesAsync = tools.promisify(this.getCertificates, this);

    /**
     * Restarts an instance of the adapter.
     *
     * @memberof Adapter
     */
    this.restart = () => {
        logger.warn(this.namespaceLog + ' Restart initiated');
        this.stop();
    };

    /**
     * Updates the adapter config with new values. Only a subset of the configuration has to be provided,
     * since merging with the existing config is done automatically, e.g. like this:
     *
     * `adapter.updateConfig({prop1: "newValue1"})`
     *
     * After updating the configuration, the adapter is automatically restarted.
     *
     * @param {Record<string, any>} newConfig The new config values to be stored
     */
    this.updateConfig = newConfig => {
        // merge the old and new configuration
        const _config = Object.assign({}, this.config, newConfig);
        // update the adapter config object
        const configObjId = `system.adapter.${this.namespace}`;
        this.getForeignObjectAsync(configObjId)
            .then(obj => {
                if (!obj) {
                    return Promise.reject(new Error(tools.ERRORS.ERROR_DB_CLOSED));
                }
                obj.native = _config;
                return this.setForeignObjectAsync(configObjId, obj);
            })
            .catch(err => logger.error(`${this.namespaceLog} Updating the adapter config failed: ${err.message}`))
        ;
    };

    /**
     * Disables and stops the adapter instance.
     */
    this.disable = () => {
        // update the adapter config object
        const configObjId = `system.adapter.${this.namespace}`;
        this.getForeignObjectAsync(configObjId)
            .then(obj => {
                if (!obj) {
                    return Promise.reject(new Error(tools.ERRORS.ERROR_DB_CLOSED));
                }
                obj.common.enabled = false;
                return this.setForeignObjectAsync(configObjId, obj);
            })
            .catch(err => logger.error(`${this.namespaceLog} Disabling the adapter instance failed: ${err.message}`))
        ;
    };

    /**
     * Reads the encrypted parameter from config.
     *
     * It returns promise if no callback is provided.
     * @param {string} attribute - attribute name in native configuration part
     * @param {(error: Error | null | undefined, result?: string) => void} [callback] - optional callback
     * @returns {Promise<any>} promise if no callback provided
     *
     */
    this.getEncryptedConfig = async (attribute, callback) => {
        if (Object.prototype.hasOwnProperty.call(this.config, attribute)) {
            if (systemSecret !== null) {
                return tools.maybeCallbackWithError(callback, null, tools.decrypt(systemSecret, this.config[attribute]));
            } else {
                try {
                    const data = await this.getForeignObjectAsync('system.config');
                    if (data && data.native) {
                        systemSecret = data.native.secret;
                    }
                } catch {
                    // do nothing - we initialize default secret below
                }
                systemSecret = systemSecret || DEFAULT_SECRET;
                return tools.maybeCallbackWithError(callback, null, tools.decrypt(systemSecret, this.config[attribute]));
            }
        } else {
            return tools.maybeCallbackWithError(callback, `Attribute "${attribute}" not found`);
        }
    };

    /**
     * Same as setTimeout
     * but it check the running timers on unload
     *
     * It returns promise if no callback is provided.
     * @param {function} cb - timer callback
     * @param {number} timeout - timeout in milliseconds
     * @param {any[]} args - as many arguments as needed, which will be passed to setTimeout
     * @returns {number|void} timer id
     */
    this.setTimeout = (cb, timeout, ...args) => {
        if (typeof cb !== 'function') {
            this.log.warn(`setTimeout expected callback to be of type "function", but got "${typeof cb}"`);
            return;
        }

        timerId = (timerId + 1) % 0xFFFFFFFF;

        const _cb = (function (id, _cb) {
            return function (...args) {
                delete timers[id];
                _cb(...args);
            };
        })(timerId, cb);

        timers[timerId] = setTimeout.call(null, _cb, timeout, ...args);
        return timerId;
    };

    /**
     * Same as clearTimeout
     * but it check the running timers on unload
     *
     * It returns promise if no callback is provided.
     * @param {number} id - timer id
     */
    this.clearTimeout = id => {
        if (!timers[id]) {
            logger.warn(`${this.namespaceLog} Clear yet terminated timer ${id}`);
        } else {
            clearTimeout(timers[id]);
            delete timers[id];
        }
    };

    /**
     * Same as setInterval
     * but it check the running intervals on unload
     *
     * It returns promise if no callback is provided.
     * @param {function} cb - interval callback
     * @param {number} timeout - interval in milliseconds
     * @param {any[]} args - as many arguments as needed, which will be passed to setTimeout
     * @returns {number|void} interval id
     */
    this.setInterval = (cb, timeout, ...args) => {
        if (typeof cb !== 'function') {
            this.log.error(`setInterval expected callback to be of type "function", but got "${typeof cb}"`);
            return;
        }
        timerId = (timerId + 1) % 0xFFFFFFFF;
        intervals[timerId] = setInterval.call(null, cb, timeout, ...args);

        return timerId;
    };

    /**
     * Same as clearInterval
     * but it check the running intervals on unload
     *
     * It returns promise if no callback is provided.
     * @param {number} id - interval id
     */
    this.clearInterval = id => {
        if (!intervals[id]) {
            logger.warn(`${this.namespaceLog} Clear yet terminated interval ${id}`);
        } else {
            clearInterval(intervals[id]);
            delete intervals[id];
        }
    };

    // Can be later deleted if no more appears
    this.inited = false;

    const extendObjects = async (tasks, callback) => {
        if (!tasks || !tasks.length) {
            return tools.maybeCallback(callback);
        }
        const task = tasks.shift();
        const state = task.state;
        if (state !== undefined) {
            delete task.state;
        }

        try {
            tools.validateGeneralObjectProperties(task, true);
        } catch (e) {
            // todo: in the future we will not create this object
            logger.warn(`${this.namespaceLog} Object ${task._id} is invalid: ${e.message}`);
            logger.warn(`${this.namespaceLog} This object will not be created in future versions. Please report this to the developer.`);
        }

        if (!adapterObjects) {
            logger.info(`${this.namespaceLog} extendObjects not processed because Objects database not connected.`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        const options = {preserve: {common: ['name']}};

        try {
            await this.extendForeignObject(task._id, task, options);
        } catch {
            // ignore
        }

        if (state !== undefined) {
            if (!adapterStates) {
                logger.info(`${this.namespaceLog} extendObjects not processed because States database not connected.`);
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }
            this.outputCount++;
            adapterStates.setState(task._id, {
                val: state,
                from: `system.adapter.${this.namespace}`,
                ack: true
            }, () => setImmediate(extendObjects, tasks, callback));
        } else {
            setImmediate(extendObjects, tasks, callback);
        }
    };

    const createInstancesObjects = (instanceObj, callback) => {
        let objs;

        if (instanceObj && instanceObj.common && !instanceObj.common.onlyWWW && instanceObj.common.mode !== 'once') {
            objs = tools.getInstanceIndicatorObjects(this.namespace, instanceObj.common.wakeup);
        } else {
            objs = [];
        }

        if (instanceObj && instanceObj.instanceObjects) {
            instanceObj.instanceObjects.forEach(async obj => {
                if (!obj._id.startsWith(this.namespace)) {
                    // instanceObjects are normally defined without namespace prefix
                    obj._id = (obj._id === '') ? this.namespace : this.namespace + '.' + obj._id;
                }

                if (obj && (obj._id || obj.type === 'meta')) {
                    if (obj.common) {
                        if (obj.common.name) {
                            // if name has many languages
                            if (typeof obj.common.name === 'object') {
                                Object.keys(obj.common.name).forEach(lang => obj.common.name[lang] = obj.common.name[lang].replace('%INSTANCE%', instance));
                            } else {
                                obj.common.name = obj.common.name.replace('%INSTANCE%', instance);
                            }
                        }
                        if (obj.common.desc) {
                            // if description has many languages
                            if (typeof obj.common.desc === 'object') {
                                Object.keys(obj.common.desc).forEach(lang => obj.common.desc[lang] = obj.common.desc[lang].replace('%INSTANCE%', instance));
                            } else {
                                obj.common.desc = obj.common.desc.replace('%INSTANCE%', instance);
                            }
                        }

                        if (obj.type === 'state' && obj.common.def !== undefined) {
                            // default value given - if obj non existing we have to set it
                            try {
                                const checkObj = await this.getForeignObjectAsync(obj._id);
                                if (!checkObj) {
                                    obj.state = obj.common.def;
                                }
                            } catch (e) {
                                logger.warn(`${this.namespaceLog} Did not add default (${obj.common.def}) value on creation of ${obj._id}: ${e.message}`);
                            }
                        }
                    }

                    objs.push(obj);
                } else {
                    logger.error(this.namespaceLog + ' ' + options.name + '.' + instance + ' invalid instance object: ' + JSON.stringify(obj));
                }
            });
        }

        extendObjects(objs, callback);
    };

    const prepareInitAdapter = () => {
        if (options.instance !== undefined) {
            initAdapter(options);
        } else {
            this.getForeignState(`system.adapter.${this.namespace}.alive`, null, (err, resAlive) => {
                this.getForeignState(`system.adapter.${this.namespace}.sigKill`, null, (err, killRes) => {
                    if (killRes && killRes.val !== undefined) {
                        killRes.val = parseInt(killRes.val, 10);
                    }
                    if (!config.isInstall && this.startedInCompactMode && killRes && !killRes.ack && killRes.val === -1) {
                        logger.error(this.namespaceLog + ' ' + options.name + '.' + instance + ' needs to be stopped because not correctly started in compact mode');
                        this.terminate(EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);
                    } else
                    if (!config.forceIfDisabled && !config.isInstall && !this.startedInCompactMode && killRes && killRes.from && killRes.from.startsWith('system.host.') && killRes.ack && !isNaN(killRes.val) && killRes.val !== process.pid) {
                        logger.error(this.namespaceLog + ' ' + options.name + '.' + instance + ' invalid process id scenario ' + killRes.val + ' vs. own ID ' + process.pid + '. Stopping');
                        this.terminate(EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);
                    } else
                    if (!config.isInstall && resAlive && resAlive.val === true && resAlive.ack && !config.forceIfDisabled) {
                        logger.error(this.namespaceLog + ' ' + options.name + '.' + instance + ' already running');
                        this.terminate(EXIT_CODES.ADAPTER_ALREADY_RUNNING);
                    } else {
                        this.getForeignObject('system.adapter.' + this.namespace, null, (err, res) => {
                            if ((err || !res) && !config.isInstall) {
                                logger.error(this.namespaceLog + ' ' + options.name + '.' + instance + ' invalid config');
                                this.terminate(EXIT_CODES.INVALID_ADAPTER_CONFIG);
                            } else {
                                createInstancesObjects(res, () => initAdapter(res));
                            }
                        });
                    }
                });
            });
        }
    };

    const autoSubscribeOn = async () => {
        if (!this.autoSubscribe && adapterObjects) {
            try {
                // collect all
                const res = await adapterObjects.getObjectViewAsync('system', 'instance', {
                    startkey: 'system.adapter.',
                    endkey: 'system.adapter.\u9999'
                });

                if (res && res.rows) {
                    this.autoSubscribe = [];
                    for (let c = res.rows.length - 1; c >= 0; c--) {
                        if (res.rows[c].value.common.subscribable) {
                            const _id = res.rows[c].id.substring(15); // cut system.adapter.
                            if (this.autoSubscribe.indexOf(_id) === -1) {
                                this.autoSubscribe.push(_id);
                            }
                        }
                    }
                }

                // because of autoSubscribe
                await adapterObjects.subscribeAsync('system.adapter.*');
            } catch {
                // ignore
            }
        }
    };

    const initObjects = cb => {
        initializeTimeout = setTimeout(() => {
            initializeTimeout = null;
            if (config.isInstall) {
                logger && logger.warn(this.namespaceLog + ' no connection to objects DB. Terminating');
                this.terminate(EXIT_CODES.NO_ERROR);
            } else {
                logger && logger.warn(this.namespaceLog + ' slow connection to objects DB. Still waiting ...');
            }
        }, (config.objects.connectTimeout || 2000) * 3); // Because we do not connect only anymore, give it a bit more time

        adapterObjects = new Objects({
            namespace: this.namespaceLog,
            connection: config.objects,
            logger: logger,
            connected: () => {
                this.connected = true;
                if (initializeTimeout) {
                    clearTimeout(initializeTimeout);
                    initializeTimeout = null;
                }

                // subscribe to user changes
                adapterObjects.subscribe('system.user.*');

                // Read dateformat if using of formatDate is announced
                if (options.useFormatDate) {
                    this.getForeignObject('system.config', (err, data) => {
                        if (data && data.common) {
                            this.dateFormat = data.common.dateFormat;
                            this.isFloatComma = data.common.isFloatComma;
                            this.language = data.common.language;
                            this.longitude = data.common.longitude;
                            this.latitude = data.common.latitude;
                            this.defaultHistory = data.common.defaultHistory;
                        }
                        if (data && data.native) {
                            systemSecret = data.native.secret;
                        }
                        return tools.maybeCallback(cb);
                    });
                } else {
                    return tools.maybeCallback(cb);
                }
            },
            disconnected: () => {
                this.connected = false;
                !this.terminated && setTimeout(() => {
                    if (this.connected) {
                        return;
                    } // If reconnected in the meantime, do not terminate
                    logger && logger.warn(this.namespaceLog + ' Cannot connect/reconnect to objects DB. Terminating');
                    this.terminate(EXIT_CODES.NO_ERROR);
                }, 4000);
            },
            change: async (id, obj) => { // System level object changes (and alias objects)
                if (obj === 'null' || obj === '') {
                    obj = null;
                }

                if (!id) {
                    logger.error(this.namespaceLog + ' change ID is empty:  ' + JSON.stringify(obj));
                    return;
                }

                // If desired, that adapter must be terminated
                if (id === `system.adapter.${this.namespace}` && obj && obj.common && obj.common.enabled === false) {
                    logger.info(this.namespaceLog + ' Adapter is disabled => stop');
                    stop();
                    setTimeout(() => this.terminate(EXIT_CODES.NO_ERROR), 4000);
                    return;
                }

                // update language, dateFormat and comma
                if (id === 'system.config' && obj && obj.common && (options.useFormatDate || this.defaultHistory !== undefined)) {
                    this.dateFormat = obj.common.dateFormat;
                    this.isFloatComma = obj.common.isFloatComma;
                    this.language = obj.common.language;
                    this.longitude = obj.common.longitude;
                    this.latitude = obj.common.latitude;
                    this.defaultHistory = obj.common.defaultHistory;
                }

                // if alias
                if (id.startsWith(ALIAS_STARTS_WITH)) {

                    // aliases['sourceId'] = {
                    //     source: {common attributes},
                    //     targets: [
                    //         {
                    //             alias: {},
                    //             id: 'aliasId',
                    //             pattern: 'some pattern',
                    //             type: stateType,
                    //             max: number,
                    //             min: number,
                    //         }
                    //     ]
                    // };

                    // if this.aliases is empty, or no target found its a new alias
                    let isNewAlias = true;

                    Object.keys(this.aliases).forEach(sourceId => {
                        const alias = this.aliases[sourceId];

                        const targetAlias = alias.targets.find(entry => entry.id === id);

                        // Find entry for this alias
                        if (targetAlias) {
                            isNewAlias = false;

                            // new sourceId or same
                            if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                                // check if id.read or id
                                const newSourceId = typeof obj.common.alias.id.read === 'string' ? obj.common.alias.id.read : obj.common.alias.id;

                                // if linked ID changed
                                if (newSourceId !== sourceId) {
                                    this._removeAliasSubscribe(sourceId, targetAlias, async () => {
                                        try {
                                            await this._addAliasSubscribe(obj, targetAlias.pattern);
                                        } catch (e) {
                                            logger.error(`${this.namespaceLog} Could not add alias subscription: ${e.message}`);
                                        }
                                    });
                                } else {
                                    // update attributes
                                    targetAlias.min = obj.common.min;
                                    targetAlias.max = obj.common.max;
                                    targetAlias.type = obj.common.type;
                                    targetAlias.alias = deepClone(obj.common.alias);
                                }
                            } else {
                                // link was deleted
                                // remove from targets array
                                this._removeAliasSubscribe(sourceId, targetAlias);
                            }
                        }
                    });

                    // it's a new alias, we add it to our subscription
                    if (isNewAlias) {
                        for (const aliasPattern of this.aliasPatterns) {
                            // check if its in our subs range, if so add it
                            const testPattern = (aliasPattern.slice(-1) === '*') ? new RegExp(tools.pattern2RegEx(aliasPattern)) : aliasPattern;

                            if (typeof testPattern === 'string' && aliasPattern === id || testPattern instanceof RegExp && testPattern.test(id)) {
                                try {
                                    await this._addAliasSubscribe(obj, id);
                                } catch (e) {
                                    this.log.warn(`Could not add alias subscription: ${e.message}`);
                                }
                                break;
                            }
                        }
                    }
                }

                // process autosubscribe adapters
                if (id.startsWith('system.adapter.')) {
                    if (obj && obj.common && obj.common.subscribable) {
                        const _id = id.substring(15); // 'system.adapter.'.length
                        if (obj.common.enabled) {
                            if (this.autoSubscribe.indexOf(_id) === -1) {
                                this.autoSubscribe.push(_id);
                            }
                        } else {
                            const pos = this.autoSubscribe.indexOf(_id);
                            if (pos !== -1) {
                                this.autoSubscribe.splice(pos, 1);
                            }
                        }
                    }
                }

                // Clear cache if got the message about change (Will work for admin and javascript - TODO: maybe always subscribe?)
                if (id.match(/^system\.user\./) || id.match(/^system\.group\./)) {
                    this.users = {};
                    this.groups = {};
                    this.usernames = {};
                }
            },
            changeUser: (id, obj) => { // User level object changes
                if (obj === 'null' || obj === '') {
                    obj = null;
                }

                if (!id) {
                    logger.error(`${this.namespaceLog} change ID is empty:  ${JSON.stringify(obj)}`);
                    return;
                }

                // remove protectedNative if not admin or own adapter
                const adapterName = this.namespace.split('.')[0];
                if (obj && obj.protectedNative && obj.protectedNative.length && obj._id &&
                    obj._id.startsWith('system.adapter.') && adapterName !== 'admin' &&
                    adapterName !== obj._id.split('.')[2]
                ) {
                    for (const attr of obj.protectedNative) {
                        delete obj.native[attr];
                    }
                }

                if (this.adapterReady) {
                    // update oObjects structure if desired
                    if (this.oObjects) {
                        if (obj) {
                            this.oObjects[id] = obj;
                        } else {
                            delete this.oObjects[id];
                        }
                    }

                    if (!stopInProgress) {
                        typeof options.objectChange === 'function' && setImmediate(options.objectChange, id, obj);
                        // emit 'objectChange' event instantly
                        setImmediate(() => this.emit('objectChange', id, obj));
                    }
                }
            }
        });

        /**
         * Performs the strict object check, which includes checking object existence, read-only logic, type and min/max
         * additionally it rounds state values whose objects have a common.step attribute defined
         *
         * @param {string} id - id of the state
         * @param {object} state - ioBroker setState object
         * @return {Promise<void>}
         */
        this._performStrictObjectCheck = async (id, state) => {
            // TODO: in js-c 3.5 (or 2 releases after 3.3) we should let it throw and add tests, maybe we
            // can already let the non existing object case throw with 3.4 because this is already producing a warning
            try {
                if (state.val === undefined) {
                    // only ack etc. is also possible to acknowledge the current value,
                    // if only undefined provided, it should have thrown before
                    return;
                }

                const obj = await adapterObjects.getObjectAsync(id);
                // at first check object existence
                if (!obj) {
                    logger.warn(`${this.namespaceLog} State "${id}" has no existing object, this might lead to an error in future versions`);
                    return;
                }

                // for a state object we require common.type to exist
                if (obj.common && obj.common.type) {
                    // check if we are allowed to write (read-only can only be written with ack: true)
                    if (!state.ack && obj.common.write === false) {
                        logger.warn(`${this.namespaceLog} Read-only state "${id}" has been written without ack-flag with value "${state.val}"`);
                    }

                    if (state.val !== null) {
                        // now check if type is correct, null is always allowed
                        // types can be 'number', 'string', 'boolean', 'array', 'object', 'mixed', 'file', 'json'
                        // array, object, file, json need to be string
                        if (!(obj.common.type === 'mixed' && typeof state.val !== 'object' ||
                            obj.common.type !== 'object' && obj.common.type === typeof state.val ||
                            obj.common.type === 'array' && typeof state.val === 'string' ||
                            obj.common.type === 'json' && typeof state.val === 'string' ||
                            obj.common.type === 'file' && typeof state.val === 'string' ||
                            obj.common.type === 'object' && typeof state.val === 'string')
                        ) {
                            if (['object', 'json', 'file', 'array'].includes(obj.common.type)) {
                                logger.info(`${this.namespaceLog} State value to set for "${id}" has to be stringified but received type "${typeof state.val}"`);
                            } else {
                                logger.info(`${this.namespaceLog} State value to set for "${id}" has to be ${obj.common.type === 'mixed' ? `one of type "string", "number", "boolean"` : `type "${obj.common.type}"`} but received type "${typeof state.val}" `);
                            }
                        }

                        // now round step and check min/max if it's a number
                        if (typeof state.val === 'number') {
                            if (typeof obj.common.step === 'number' && obj.common.step > 0) {
                                // round to next step
                                const inv = 1 / obj.common.step;
                                state.val = Math.round(state.val * inv) / inv;
                            }

                            if (obj.common.max !== undefined && state.val > obj.common.max) {
                                logger.warn(`${this.namespaceLog} State value to set for "${id}" has value "${state.val}" greater than max "${obj.common.max}"`);
                            }

                            if (obj.common.min !== undefined && state.val < obj.common.min) {
                                logger.warn(`${this.namespaceLog} State value to set for "${id}" has value "${state.val}" less than min "${obj.common.min}"`);
                            }
                        }
                    }
                } else {
                    logger.warn(`${this.namespaceLog} Object of state "${id}" is missing the required property "common.type"`);
                }
            } catch (e) {
                logger.warn(`${this.namespaceLog} Could not perform strict object check of state ${id}: ${e.message}`);
            }
        };

        /**
         * @param {string | {device?: string, channel?: string, state?: string}} id
         * @param {boolean} [isPattern=false]
         */
        this._fixId = (id, isPattern/* , type */) => {
            if (!id) {
                id = '';
            }

            let result  = '';
            // If id is an object
            if (tools.isObject(id)) {
                // Add namespace + device + channel
                result = this.namespace + '.' + (id.device ? id.device + '.' : '') + (id.channel ? id.channel + '.' : '') + (id.state ? id.state : '');
            } else if (typeof id === 'string') {
                result = id;

                // if not instance name itself and also not starts with namespace and "."
                if (id !== this.namespace && !this._namespaceRegExp.test(id)) {
                    if (!isPattern) {
                        result = this.namespace + (id ? '.' + id : '');
                    } else {
                        result = this.namespace + '.' + (id ? id : '');
                    }
                }
            }
            return result;
        };

        /**
         * Helper method for `set[Foreign]Object[NotExists]` that also sets the default value if one is configured
         * @param {string} id of the object
         * @param obj The object to set
         * @param {object} [options]
         * @param {function} [callback]
         */
        const setObjectWithDefaultValue = async (id, obj, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = undefined;
            }
            if (!adapterObjects) {
                this.log.info('setObject not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                tools.validateGeneralObjectProperties(obj, false);
            } catch (e) {
                // todo: in the future we will not create this object
                this.log.warn(`Object ${id} is invalid: ${e.message}`);
                this.log.warn('This object will not be created in future versions. Please report this to the developer.');
            }

            try {
                validateId(id, true, options);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            try {
                const result = await adapterObjects.setObjectAsync(id, obj, options);
                if (obj.type === 'state' && obj.common && obj.common.def !== undefined && obj.common.def !== null) {
                    const state = await this.getForeignStateAsync(id);
                    // only set the def state, if state is non-existent
                    if (!state || state.val === undefined) {
                        await this.setForeignStateAsync(id, {val: obj.common.def, q: QUALITY_SUBS_INITIAL, ack: true});
                    }
                }
                return tools.maybeCallbackWithError(callback, null, result);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        };

        /**
         * Creates or overwrites object in objectDB.
         *
         * This function can create or overwrite objects in objectDB for this adapter.
         * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
         * <b>common</b>, <b>native</b> and <b>type</b> attributes are mandatory and it will be checked.
         * Additionally type "state" requires <b>role</b>, <b>type</b> and <b>name</b>, e.g.:
         * <pre><code>{
         *     common: {
         *          name: 'object name',
         *          type: 'number', // string, boolean, object, mixed, array
         *          role: 'value'   // see https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole
         *     },
         *     native: {},
         *     type: 'state' // channel, device
         * }</code></pre>
         *
         * @alias setObject
         * @memberof Adapter
         * @param {string} id object ID, that must be overwritten or created.
         * @param {object} obj new object
         * @param {object} [options] optional user context
         * @param {ioBroker.SetObjectCallback} [callback] return result
         * @returns {ioBroker.SetObjectPromise}
         *        <pre><code>
         *            function (err, obj) {
         *              // obj is {id: id}
         *              if (err) adapter.log.error('Cannot write object: ' + err);
         *            }
         *        </code></pre>
         */
        this.setObject = (id, obj, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!defaultObjs) {
                defaultObjs = require('./defaultObjs.js')('de', '°C', 'EUR');
            }

            if (!obj) {
                logger.error(`${this.namespaceLog} setObject: try to set null object for ${id}`);
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_EMPTY_OBJECT);
            }

            if (!tools.isObject(obj)) {
                logger.error(`${this.namespaceLog} setForeignObject: type of object parameter expected to be an object, but "${typeof obj}" provided`);
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_NO_OBJECT);
            }

            if (obj.type !== 'meta') {
                try {
                    validateId(id, false, null);
                } catch (err) {
                    logger.error(tools.appendStackTrace(`${this.namespaceLog} ${err.message}`));
                    return;
                }
            }

            if (Object.prototype.hasOwnProperty.call(obj, 'type')) {
                if (!Object.prototype.hasOwnProperty.call(obj,'native')) {
                    logger.warn(this.namespaceLog + ' setObject ' + id + ' (type=' + obj.type + ') property native missing!');
                    obj.native = {};
                }
                // Check property 'common'
                if (!Object.prototype.hasOwnProperty.call(obj, 'common')) {
                    logger.warn(this.namespaceLog + ' setObject ' + id + ' (type=' + obj.type + ') property common missing!');
                    obj.common = {};
                } else if (obj.type === 'state') {
                    // Try to extend the model for type='state'
                    // Check property 'role' by 'state'
                    if (Object.prototype.hasOwnProperty.call(obj.common, 'role') && defaultObjs[obj.common.role]) {
                        obj.common = extend(true, {}, defaultObjs[obj.common.role], obj.common);
                    } else if (!Object.prototype.hasOwnProperty.call(obj.common, 'role')) {
                        logger.warn(`${this.namespaceLog} setObject ${id} (type=${obj.type}) property common.role missing!`);
                    }
                    if (!Object.prototype.hasOwnProperty.call(obj.common, 'type')) {
                        logger.warn(`${this.namespaceLog} setObject ${id} (type=${obj.type}) property common.type missing!`);
                    }
                    if (Object.prototype.hasOwnProperty.call(obj.common, 'custom') && obj.common.custom !== null && !tools.isObject(obj.common.custom)) {
                        logger.error(`${this.namespaceLog} setObject ${id} (type=${obj.type}) property common.custom is of type ${typeof obj.common.custom}, expected object.`);
                        return tools.maybeCallbackWithError(callback, 'common.custom needs to be an object');
                    }
                } else {
                    if (Object.prototype.hasOwnProperty.call(obj.common, 'custom') && obj.common.custom !== null) {
                        logger.warn(`${this.namespaceLog} setObject ${id} (type=${obj.type}) property common.custom must not exist.`);
                        delete obj.common.custom;
                    }
                }

                if (!Object.prototype.hasOwnProperty.call(obj.common, 'name')) {
                    obj.common.name = id;
                    logger.debug(this.namespaceLog + ' setObject ' + id + ' (type=' + obj.type + ') property common.name missing, using id as name');
                }

                id = this._fixId(id, false/*, obj.type*/);

                if (obj.children || obj.parent) {
                    logger.warn(this.namespaceLog + ' Do not use parent or children for ' + id);
                }

                obj.from = obj.from || ('system.adapter.' + this.namespace);
                obj.user = obj.user || (options ? options.user : '') || SYSTEM_ADMIN_USER;
                obj.ts   = obj.ts   || Date.now();

                setObjectWithDefaultValue(id, obj, options, callback);
            } else {
                logger.error(this.namespaceLog + ' setObject ' + id + ' mandatory property type missing!');
                return tools.maybeCallbackWithError(callback, 'mandatory property type missing!');
            }
        };
        /**
         * Promise-version of Adapter.setObject
         */
        this.setObjectAsync = tools.promisify(this.setObject, this);

        /**
         * Get all states, channels and devices of this adapter.
         *
         * @alias getAdapterObjects
         * @memberof Adapter
         * @param {(objects: Record<string, ioBroker.Object>) => void} callback return result
         *        <pre><code>
         *            function (objects) {
         *                for (var id in objects) {
         *                    adapter.log.debug(id);
         *                }
         *            }
         *        </code></pre>
         */
        this.getAdapterObjects = async callback => {
            const ret = {};
            // Adds result rows to the return object
            /** @param {any[] | undefined} rows */
            const addRows = rows => {
                if (rows) {
                    for (const {id, value} of rows) {
                        ret[id] = value;
                    }
                }
            };

            if (!adapterObjects) {
                return tools.maybeCallback(callback, ret);
            }

            const options = {startkey: this.namespace + '.', endkey: this.namespace + '.\u9999', include_docs: true};

            try {
                const folders = await adapterObjects.getObjectViewAsync('system', 'folder', options);
                addRows(folders.rows);
            } catch {
                /* ignore, we'll return what we get till now */
            }
            try {
                const devices = await adapterObjects.getObjectViewAsync('system', 'device', options);
                addRows(devices.rows);
            } catch {
                /* ignore, we'll return what we get till now */
            }
            try {
                const channels = await adapterObjects.getObjectViewAsync('system', 'channel', options);
                addRows(channels.rows);
            } catch {
                /* ignore, we'll return what we get till now */
            }
            try {
                const states = await adapterObjects.getObjectViewAsync('system', 'state', options);
                addRows(states.rows);
            } catch {
                /* ignore, we'll return what we get till now */
            }

            return tools.maybeCallback(callback, ret);
        };
        /**
         * Promise-version of Adapter.getAdapterObjects
         */
        this.getAdapterObjectsAsync = tools.promisifyNoError(this.getAdapterObjects, this);

        /**
         * Extend some object and create it if it does not exist
         *
         * You can change or extend some object. E.g existing object is:
         * <pre><code>
         *     {
         *          common: {
         *              name: 'Adapter name',
         *              desc: 'Description'
         *          },
         *          type: 'state',
         *          native: {
         *              unused: 'text'
         *          }
         *     }
         * </code></pre>
         *
         * If following object will be passed as argument
         *
         * <pre><code>
         *     {
         *          common: {
         *              desc: 'New description',
         *              min: 0,
         *              max: 100
         *          },
         *          native: {
         *              unused: null
         *          }
         *     }
         * </code></pre>
         *
         * We will get as output:
         * <pre><code>
         *     {
         *          common: {
         *              desc: 'New description',
         *              min: 0,
         *              max: 100
         *          },
         *          type: 'state',
         *          native: {
         *          }
         *     }
         * </code></pre>
         *
         *
         * @alias extendObject
         * @memberof Adapter
         * @param {string} id object ID, that must be extended
         * @param {object} obj part that must be extended
         * @param {object} [options] optional user context
         * @param {ioBroker.ExtendObjectCallback} [callback] return result
         *        <pre><code>
         *            function (err, obj) {
         *                if (err) adapter.log.error(err);
         *                // obj is {"id": id}
         *            }
         *        </code></pre>
         */
        this.extendObject = async (id, obj, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (!obj) {
                logger.error(`${this.namespaceLog} extendObject: try to extend null object for ${id}`);
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_EMPTY_OBJECT);
            }

            if (!tools.isObject(obj)) {
                logger.error(`${this.namespaceLog} extendObject: type of object parameter expected to be an object, but ${typeof obj} provided`);
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_NO_OBJECT);
            }

            if (!adapterObjects) {
                logger.info(`${this.namespaceLog} extendObject not processed because Objects database not connected`);
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                tools.validateGeneralObjectProperties(obj, true);
            } catch (e) {
                // todo: in the future we will not create this object
                logger.warn(`${this.namespaceLog} Object ${id} is invalid: ${e.message}`);
                logger.warn(`${this.namespaceLog} This object will not be created in future versions. Please report this to the developer.`);
            }

            try {
                validateId(id, false, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            id = this._fixId(id, false/*, obj.type*/);

            const mId = id.replace(FORBIDDEN_CHARS, '_');
            if (mId !== id) {
                logger.warn(`${this.namespaceLog} Used invalid characters: ${id} changed to ${mId}`);
                id = mId;
            }

            if (obj.children || obj.parent) {
                logger.warn(`${this.namespaceLog} Do not use parent or children for ${id}`);
            }

            // Read whole object
            let oldObj;
            try {
                oldObj = await adapterObjects.getObjectAsync(id, options);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }

            if (!adapterObjects) {
                logger.info(`${this.namespaceLog} extendObject not processed because Objects database not connected`);
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            // remove the preserve attributes
            if (oldObj && options && tools.isObject(options.preserve)) {
                tools.removePreservedProperties(options.preserve, oldObj, obj);
            }

            // delete arrays if they should be changed
            if (obj && (
                (obj.common && obj.common.members) ||
                (obj.native && obj.native.repositories) ||
                (obj.native && obj.native.certificates) ||
                (obj.native && obj.native.devices))
            ) {
                if (!oldObj) {
                    logger.error(`${this.namespaceLog} Object ${id} not exist!`);
                    oldObj = {};
                }
                if (obj.native && obj.native.repositories && oldObj.native && oldObj.native.repositories) {
                    oldObj.native.repositories = [];
                }
                if (obj.common && obj.common.members && oldObj.common && oldObj.common.members) {
                    oldObj.common.members = [];
                }
                if (obj.native && obj.native.certificates && oldObj.native && oldObj.native.certificates) {
                    oldObj.native.certificates = [];
                }
                if (obj.native && obj.native.devices && oldObj.native && oldObj.native.devices) {
                    oldObj.native.devices = [];
                }

                obj.from = obj.from || (`system.adapter.${this.namespace}`);
                obj.user = obj.user || (options ? options.user : '') || SYSTEM_ADMIN_USER;
                obj.ts   = obj.ts   || Date.now();

                obj = extend(true, oldObj, obj);

                return adapterObjects.setObject(id, obj, options, callback);
            } else {
                obj.from = obj.from || (`system.adapter.${this.namespace}`);
                obj.user = obj.user || (options ? options.user : '') || SYSTEM_ADMIN_USER;
                obj.ts   = obj.ts   || Date.now();

                if ((obj.type && obj.type === 'state') || (!obj.type && oldObj && oldObj.type === 'state')) {
                    if (obj.common && Object.prototype.hasOwnProperty.call(obj.common, 'custom') && obj.common.custom !== null && !tools.isObject(obj.common.custom)) {
                        logger.error(this.namespaceLog + ' extendObject ' + id + ' (type=' + obj.type + ') property common.custom is of type ' + typeof obj.common.custom + ', expected object.');
                        return tools.maybeCallbackWithError(callback, 'common.custom needs to be an object');
                    }
                } else {
                    if (obj.common && Object.prototype.hasOwnProperty.call(obj.common, 'custom') && obj.common.custom !== null) {
                        logger.warn(this.namespaceLog + ' setObject ' + id + ' (type=' + obj.type + ') property common.custom must not exist.');
                        delete obj.common.custom;
                    }
                }

                if (!oldObj) {
                    // if old object is not existing we behave like setObject
                    return this.setForeignObject(id, obj, options, callback);
                }

                try {
                    const cbObj = await adapterObjects.extendObjectAsync(id, obj, options);
                    let defState;
                    if (obj.type === 'state' || oldObj.type === 'state') {
                        if (obj.common && obj.common.def !== undefined) {
                            defState = obj.common.def;
                        } else if (oldObj.common && oldObj.common.def !== undefined) {
                            defState = oldObj.common.def;
                        }
                    }

                    if (defState !== undefined) {
                        let currentStateObj;
                        try {
                            currentStateObj = await this.getForeignStateAsync(id);
                        } catch {
                            // do nothing
                        }
                        if (!currentStateObj) {
                            try {
                                await this.setForeignStateAsync(id, {val: defState, q: QUALITY_SUBS_INITIAL, ack: true});
                            } catch (e) {
                                logger.info(`${this.namespaceLog} Default value for state "${id}" could not be set: ${e.message}`);
                            }
                        }
                    }
                    return tools.maybeCallbackWithError(callback, null, cbObj);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }
            }
        };
        /**
         * Promise-version of Adapter.extendObject
         */
        this.extendObjectAsync = tools.promisify(this.extendObject, this);

        /**
         * Same as {@link Adapter.setObject}, but for any object.
         *
         * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"
         *
         * @alias setForeignObject
         * @memberof Adapter
         * @param {string} id object ID, that must be overwritten or created.
         * @param {object} obj new object
         * @param {object} [options] optional user context
         * @param {ioBroker.SetObjectCallback} [callback] return result
         *        <pre><code>
         *            function (err, obj) {
         *              // obj is {id: id}
         *              if (err) adapter.log.error('Cannot write object: ' + err);
         *            }
         *        </code></pre>
         */
        this.setForeignObject = (id, obj, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (!obj) {
                logger.error(`${this.namespaceLog} setForeignObject: try to set null object for ${id}`);
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_EMPTY_OBJECT);
            }

            if (!tools.isObject(obj)) {
                logger.error(`${this.namespaceLog} setForeignObject: type of object parameter expected to be an object, but ${typeof obj} provided`);
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_NO_OBJECT);
            }

            obj.from = obj.from || 'system.adapter.' + this.namespace;
            obj.user = obj.user || (options ? options.user : '') || SYSTEM_ADMIN_USER;
            obj.ts   = obj.ts   || Date.now();

            if (id) {
                const mId = id.replace(FORBIDDEN_CHARS, '_');
                if (mId !== id) {
                    logger.warn(`${this.namespaceLog} Used invalid characters: ${id} changed to ${mId}`);
                    id = mId;
                }
            }

            // check that alias is valid if given
            if (obj.common && obj.common.alias && obj.common.alias.id) {
                // if alias is object validate read and write
                if (typeof obj.common.alias.id === 'object') {
                    try {
                        validateId(obj.common.alias.id.write, true, null);
                        validateId(obj.common.alias.id.read, true, null);
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, `Alias id is invalid: ${e.message}`);
                    }

                    if (obj.common.alias.id.write.startsWith(ALIAS_STARTS_WITH) || obj.common.alias.id.read.startsWith(ALIAS_STARTS_WITH)) {
                        return tools.maybeCallbackWithError(callback, 'Aliases cannot be used as target for aliases');
                    }
                } else {
                    try {
                        validateId(obj.common.alias.id, true, null);
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, `Alias id is invalid: ${e.message}`);
                    }

                    if (obj.common.alias.id.startsWith(ALIAS_STARTS_WITH)) {
                        return tools.maybeCallbackWithError(callback, 'Aliases cannot be used as target for aliases');
                    }
                }
            }

            setObjectWithDefaultValue(id, obj, options, callback);
        };
        /**
         * Promise-version of Adapter.setForeignObject
         */
        this.setForeignObjectAsync = tools.promisify(this.setForeignObject, this);

        /**
         * Same as {@link Adapter.extendObject}, but for any object.
         *
         * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"
         *
         * @alias extendForeignObject
         * @memberof Adapter
         * @param {string} id object ID, that must be extended
         * @param {object} obj part that must be extended
         * @param {object} [options] optional user context, or use attribute preserve e.g. {preserve: {common: ['name']}} to preserve common.name
         * @param {ioBroker.SetObjectCallback} [callback] return result
         *        <pre><code>
         *            function (err, obj) {
         *                // obj is {"id": id}
         *                if (err) adapter.log.error(err);
         *            }
         *        </code></pre>
         */
        this.extendForeignObject = async (id, obj, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                logger.info(`${this.namespaceLog} extendForeignObject not processed because Objects database not connected`);
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, true, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            const mId = id.replace(FORBIDDEN_CHARS, '_');
            if (mId !== id) {
                logger.warn(`${this.namespaceLog} Used invalid characters: ${id} changed to ${mId}`);
                id = mId;
            }

            if (!obj) {
                logger.error(`${this.namespaceLog} extendForeignObject: try to set null object for ${id}`);
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_EMPTY_OBJECT);
            }

            // Read whole object
            let oldObj;
            try {
                oldObj = await adapterObjects.getObjectAsync(id, options);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }

            // remove the preserve attributes
            if (oldObj && options && tools.isObject(options.preserve)) {
                tools.removePreservedProperties(options.preserve, oldObj, obj);
            }

            // delete arrays if they should be changed
            if (obj && (
                (obj.common && obj.common.members) ||
                (obj.native && obj.native.repositories) ||
                (obj.native && obj.native.certificates) ||
                (obj.native && obj.native.devices))
            ) {
                if (!oldObj) {
                    logger.error(`${this.namespaceLog} Object ${id} not exist!`);
                    oldObj = {};
                }
                if (obj.native && obj.native.repositories && oldObj.native && oldObj.native.repositories) {
                    oldObj.native.repositories = [];
                }
                if (obj.common && obj.common.members && oldObj.common && oldObj.common.members) {
                    oldObj.common.members = [];
                }
                if (obj.native && obj.native.certificates && oldObj.native && oldObj.native.certificates) {
                    oldObj.native.certificates = [];
                }
                if (obj.native && obj.native.devices && oldObj.native && oldObj.native.devices) {
                    oldObj.native.devices = [];
                }

                obj.from = obj.from || (`system.adapter.${this.namespace}`);
                obj.user = obj.user || (options ? options.user : '') || SYSTEM_ADMIN_USER;
                obj.ts   = obj.ts   || Date.now();

                obj = extend(true, oldObj, obj);

                return adapterObjects.setObject(id, obj, options, callback);
            } else {
                obj.from = obj.from || (`system.adapter.${this.namespace}`);
                obj.user = obj.user || (options ? options.user : '') || SYSTEM_ADMIN_USER;
                obj.ts   = obj.ts   || Date.now();

                if ((obj.type && obj.type === 'state') || (!obj.type && oldObj && oldObj.type === 'state')) {
                    if (obj.common && Object.prototype.hasOwnProperty.call(obj.common, 'custom') && obj.common.custom !== null && !tools.isObject(obj.common.custom)) {
                        logger.error(this.namespaceLog + ' extendObject ' + id + ' (type=' + obj.type + ') property common.custom is of type ' + typeof obj.common.custom + ', expected object.');
                        return tools.maybeCallbackWithError(callback, 'common.custom needs to be an object');
                    }
                } else {
                    if (obj.common && Object.prototype.hasOwnProperty.call(obj.common, 'custom') && obj.common.custom !== null) {
                        logger.warn(this.namespaceLog + ' setObject ' + id + ' (type=' + obj.type + ') property common.custom must not exist.');
                        delete obj.common.custom;
                    }
                }

                if (!oldObj) {
                    // if old object is not existing we behave like setObject
                    return this.setForeignObject(id, obj, options, callback);
                }

                try {
                    const cbObj = await adapterObjects.extendObjectAsync(id, obj, options);
                    if (cbObj.value.type === 'state') {
                        let defState;
                        if (obj.common && obj.common.def !== undefined) {
                            defState = obj.common.def;
                        } else if (oldObj.common && oldObj.common.def !== undefined) {
                            defState = oldObj.common.def;
                        }
                        if (defState !== undefined) {
                            let currentStateObj;
                            try {
                                currentStateObj = await this.getForeignStateAsync(id);
                            } catch {
                                // do nothing
                            }
                            if (!currentStateObj) {
                                try {
                                    await this.setForeignStateAsync(id, {val: defState, q: QUALITY_SUBS_INITIAL, ack: true});
                                } catch (e) {
                                    logger.info(`${this.namespaceLog} Default value for state "${id}" could not be set: ${e.message}`);
                                }
                            }
                        }
                    }

                    return tools.maybeCallbackWithError(callback, null, cbObj);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }
            }
        };
        /**
         * Promise-version of Adapter.extendForeignObject
         */
        this.extendForeignObjectAsync = tools.promisify(this.extendForeignObject, this);

        /**
         * Get object of this instance.
         *
         * It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.
         *
         * @alias getObject
         * @memberof Adapter
         * @param {string} id exactly object ID (without namespace)
         * @param {object} [options] optional user context
         * @param {ioBroker.GetObjectCallback} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *              if (err) adapter.log.error('Cannot get object: ' + err);
         *            }
         *        </code></pre>
         */
        this.getObject = (id, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('getObject not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, false, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            adapterObjects.getObject(this._fixId(id), options, callback);
        };
        /**
         * Promise-version of Adapter.getObject
         */
        this.getObjectAsync = tools.promisify(this.getObject, this);

        /**
         * Read object view from DB.
         *
         * It is required, that ID consists namespace in startkey and endkey. E.g. {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}
         * to get all objects of the instance.
         *
         * @alias getObjectView
         * @memberof Adapter
         * @param {string} design name of the design
         * @param {string} search name of the view
         * @param {object} params object containing startkey: first id to include in result; endkey: last id to include in result
         * @param {object} options
         * @param {ioBroker.GetObjectViewCallback} callback return result
         *      <pre><code>
         *          function (err, doc) {
         *              if (doc && doc.rows) {
         *                   for (var i = 0; i < doc.rows.length; i++) {
         *                       var id  = doc.rows[i].id;
         *                        var obj = doc.rows[i].value;
         *                        console.log('Found ' + id + ': ' + JSON.stringify(obj));
         *                   }
         *                           if (!doc.rows.length) console.log('No objects found.');
         *               } else {
         *                   console.log('No objects found: ' + err);
         *               }
         *           }
         *           </code></pre>
         */
        this.getObjectView = (design, search, params, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = undefined;
            }
            if (!adapterObjects) {
                this.log.info('getObjectView not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            return adapterObjects.getObjectView(design, search, params, options, callback);
        };
        /**
         * Promise-version of Adapter.getObjectView
         */
        this.getObjectViewAsync = tools.promisify(this.getObjectView, this);

        // TODO: remove this backward compatibility shim in the future
        this.objects.getObjectView = (design, search, params, options, callback) => {
            this.log.warn('adapter.objects.getObjectView is deprecated, and will be removed in the future. Please use adapter.getObjectView/Async. Report this to Developer!');
            return this.getObjectView(design, search, params, options, callback);
        };

        /**
         * Read object list from DB.
         *
         * It is required, that ID consists namespace in startkey and endkey. E.g. {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}
         * to get all objects of the instance.
         *
         * @alias getObjectList
         * @memberof Adapter
         *
         * @param {object} params
         * @param {object} options
         * @param {ioBroker.GetObjectListCallback} callback
         *      <pre><code>
         *          function (err, res) {
         *              if (res && res.rows) {
         *                   for (var i = 0; i < res.rows.length; i++) {
         *                       var id  = res.rows[i].id;
         *                       var obj = res.rows[i].value;
         *                       console.log('Found ' + id + ': ' + JSON.stringify(obj));
         *                   }
         *                   if (!res.rows.length) console.log('No objects found.');
         *              } else {
         *                  console.log('No objects found: ' + err);
         *              }
         *          }
         *       </code></pre>
         */
        this.getObjectList = (params, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (!adapterObjects) {
                this.log.info('getObjectList not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterObjects.getObjectList(params, options, callback);
        };
        /**
         * Promise-version of Adapter.getObjectList
         */
        this.getObjectListAsync = tools.promisify(this.getObjectList, this);

        // TODO: remove this backward compatibility shim in the future
        this.objects.getObjectList = (params, options, callback) => {
            this.log.warn('adapter.objects.getObjectList is deprecated, and will be removed in the future. Please use adapter.getObjectList/Async. Report this to Developer!');
            adapterObjects.getObjectList(params, options, callback);
        };

        /**
         * Get the enum tree.
         *
         * Get enums of specified tree or all enums if nothing specified as object with values.
         * If getEnum called with no enum specified, all enums will be returned:
         * <pre><code>
         *      adapter.getEnums(function (err, enums, requestEnum) {
         *        // All enums
         *        if (err) adapter.log.error('Cannot get object: ' + err);
         *        for (var e in enums) {
         *           adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
         *        }
         *      });
         * </code></pre>
         *
         * @alias getEnum
         * @memberof Adapter
         * @param {string} _enum enum name, e.g. 'rooms', 'function' or '' (all enums)
         * @param {object} [options] optional user context
         * @param {ioBroker.GetEnumCallback} callback return result
         *        <pre><code>
         *            function (err, enums, requestEnum) {
         *              // requestEnum is _enum
         *              if (err) adapter.log.error('Cannot get object: ' + err);
         *              for (var e in enums) {
         *                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
         *              }
         *            }
         *        </code></pre>
         */
        this.getEnum = (_enum, options, callback) => {
            if (typeof _enum === 'function') {
                callback = _enum;
                options = null;
                _enum = '';
            }
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('getEnum not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (!_enum.match('^enum.')) {
                _enum = 'enum.' + _enum;
            }
            const result = {};

            adapterObjects.getObjectView('system', 'enum', {startkey: _enum + '.', endkey: _enum + '.\u9999'}, options, (err, res) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }
                if (res && res.rows) {
                    for (let t = 0; t < res.rows.length; t++) {
                        result[res.rows[t].id] = res.rows[t].value;
                    }
                }
                return tools.maybeCallbackWithError(callback, err, result, _enum);
            });
        };
        /**
         * Promise-version of Adapter.getEnum
         */
        this.getEnumAsync = tools.promisify(this.getEnum, this, ['result', 'requestEnum']);

        /**
         * Read the members of given enums.
         *
         * Get enums of specified tree or all enums if nothing specified as object with values.
         *
         * @alias getEnums
         * @memberof Adapter
         * @param {string|array} _enumList enum name or names, e.g. ['rooms', 'function']
         * @param {object} [options] optional user context
         * @param {ioBroker.GetEnumsCallback} callback return result
         *        <pre><code>
         *            function (err, enums) {
         *              // requestEnum is _enum
         *              if (err) adapter.log.error('Cannot get object: ' + err);
         *              // Result is like
         *              // {
         *              //    "enum.rooms": {
         *              //       "enum.rooms.livingroom": {
         *              //           common: {
         *              //              members: ['ID1', 'ID2']
         *              //           }
         *              //       },
         *              //       "enum.rooms.sleepingroom": {
         *              //           common: {
         *              //              members: ['ID3', 'ID4']
         *              //           }
         *              //       }
         *              //    },
         *              //    "enum.functions": {
         *              //       "enum.rooms.light": {
         *              //           common: {
         *              //              members: ['ID1', 'ID6']
         *              //           }
         *              //       },
         *              //       "enum.rooms.weather": {
         *              //           common: {
         *              //              members: ['ID4', 'ID7']
         *              //           }
         *              //       }
         *              //    }
         *              // }
         *            }
         *        </code></pre>
         */
        this.getEnums = (_enumList, options, callback) => {
            if (typeof _enumList === 'function') {
                callback = _enumList;
                _enumList  = null;
            }
            if (typeof options === 'function') {
                callback = options;
                options  = null;
            }
            if (!adapterObjects) {
                this.log.info('getEnums not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            const _enums = {};
            if (_enumList) {
                if (typeof _enumList === 'string') {
                    _enumList = [_enumList];
                }
                const promises = [];

                for (const currEnum of _enumList) {
                    promises.push(new Promise((resolve, reject) => {
                        this.getEnum(currEnum, options, (err, list, _enum) => {
                            if (err) {
                                return reject(err);
                            } else if (list) {
                                _enums[_enum] = list;
                            }
                            resolve();
                        });
                    }));
                }

                Promise.all(promises)
                    .then(() => {
                        return tools.maybeCallbackWithError(callback, null, _enums);
                    })
                    .catch(e => {
                        return tools.maybeCallbackWithError(callback, e);
                    });
            } else {
                // Read all enums
                adapterObjects.getObjectView('system', 'enum', {startkey: 'enum.', endkey: 'enum.\u9999'}, options, (err, res) => {
                    // be aware, that res.rows[x].id is the name of enum!
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                    const result = {};
                    if (res && res.rows) {
                        for (let i = 0; i < res.rows.length; i++) {
                            const parts = res.rows[i].id.split('.', 3);
                            if (!parts[2]) {
                                continue;
                            }
                            if (!result[parts[0] + '.' + parts[1]]) {
                                result[parts[0] + '.' + parts[1]] = {};
                            }
                            result[parts[0] + '.' + parts[1]][res.rows[i].id] = res.rows[i].value;
                        }
                    }

                    return tools.maybeCallbackWithError(callback, err, result);
                });
            }
        };
        /**
         * Promise-version of Adapter.getEnums
         */
        this.getEnumsAsync = tools.promisify(this.getEnums, this);

        /**
         * Get objects by pattern, by specific type and resolve their enums.
         *
         * Get all objects in the system of specified type. E.g.:
         *
         *        <pre><code>
         *            adapter.getForeignObjects('hm-rega.0.*', 'state', ['rooms', 'functions'], function (err, objs) {
         *              if (err) adapter.log.error('Cannot get object: ' + err);
         *              // objs look like:
         *              // {
         *              //    "hm-rega.0.ABC0000.1.STATE": {
         *              //        common: {...},
         *              //        native: {},
         *              //        type: 'state',
         *              //        enums: {
         *              //           'enums.rooms.livingroom': 'Living room',
         *              //           'enums.functions.light': 'Light'
         *              //       }
         *              //    },
         *              //    "hm-rega.0.ABC0000.2.STATE": {
         *              //        common: {...},
         *              //        native: {},
         *              //        type: 'state',
         *              //        enums: {
         *              //           'enums.rooms.sleepingroom': 'Sleeping room',
         *              //           'enums.functions.window': 'Windows'
         *              //       }
         *              //    }
         *            }
         *        </code></pre>
         *
         * @alias getForeignObjects
         * @memberof Adapter
         * @param {string} pattern object ID/wildchars
         * @param {string} type type of object: 'state', 'channel' or 'device'. Default - 'state'
         * @param {string|string[]} enums object ID, that must be overwritten or created.
         * @param {object} [options] optional user context
         * @param {ioBroker.GetObjectsCallback} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *              if (err) adapter.log.error('Cannot get object: ' + err);
         *            }
         *        </code></pre>
         */
        this.getForeignObjects = (pattern, type, enums, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            let params = {};
            if (pattern && pattern !== '*') {
                params = {
                    startkey: pattern.replace(/\*/g, ''),
                    endkey:   pattern.replace(/\*/g, '\u9999')
                };
            }
            if (typeof enums === 'function') {
                callback = enums;
                enums = null;
            }
            if (typeof type  === 'function') {
                callback = type;
                type = null;
            }
            if (typeof type  === 'object') {
                options = type;
                type = null;
            }
            if (typeof enums === 'object' && !Array.isArray(enums)) {
                options = enums;
                enums = null;
            }
            if (!adapterObjects) {
                this.log.info('getForeignObjects not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterObjects.getObjectView('system', type || 'state', params, options, (err, res) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }

                // don't forget, that enums returns names in row[x].id and not IDs, you can find id in rows[x].value._id
                this.getEnums(enums, null, (err, _enums) => {
                    const list = {};
                    if (res && res.rows) {
                        for (let i = 0; i < res.rows.length; i++) {
                            if (!res.rows[i].value) {
                                logger.debug(`${this.namespaceLog} getEnums(${JSON.stringify(enums)}) returned an enum without a value at index ${i}, obj - ${JSON.stringify(res.rows[i])}`);
                                continue;
                            }
                            const id = res.rows[i].value._id;
                            list[id] = res.rows[i].value;
                            if (_enums && id) {
                                // get device or channel of this state and check it too
                                const parts = id.split('.');
                                parts.splice(parts.length - 1, 1);
                                const channel = parts.join('.');
                                parts.splice(parts.length - 1, 1);
                                const device = parts.join('.');

                                list[id].enums = {};
                                for (const es in _enums) {
                                    if (!Object.prototype.hasOwnProperty.call(_enums, es)) {
                                        continue;
                                    }
                                    for (const e in _enums[es]) {
                                        if (!Object.prototype.hasOwnProperty.call(_enums[es], e)) {
                                            continue;
                                        }
                                        if (!_enums[es][e] || !_enums[es][e].common || !_enums[es][e].common.members) {
                                            continue;
                                        }
                                        if (_enums[es][e].common.members.indexOf(id) !== -1 ||
                                            _enums[es][e].common.members.indexOf(channel) !== -1 ||
                                            _enums[es][e].common.members.indexOf(device) !== -1) {
                                            list[id].enums[e] = _enums[es][e].common.name;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return tools.maybeCallbackWithError(callback, null, list);
                });
            });
        };
        /**
         * Promise-version of Adapter.getForeignObjects
         */
        this.getForeignObjectsAsync = tools.promisify(this.getForeignObjects, this);

        /**
         * Find any object by name or ID.
         *
         * Find object by the exact name or ID.
         *
         * @alias findForeignObject
         * @memberof Adapter
         * @param {string} id exactly object ID (without namespace)
         * @param {string} type optional common.type of state: 'number', 'string', 'boolean', 'file', ...
         * @param {object} options optional user context
         * @param {ioBroker.FindObjectCallback} callback return result
         *        <pre><code>
         *            adapter.findForeignObject('Some name', function (err, id, name) {
         *              if (err) adapter.log.error('Cannot get object: ' + err);
         *              adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');
         *            }
         *        </code></pre>
         */
        this.findForeignObject = (id, type, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (typeof type === 'function') {
                callback = type;
                type = null;
            }
            if (!adapterObjects) {
                this.log.info('findForeignObject not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, true, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            adapterObjects.findObject(id, type, options, callback);
        };
        /**
         * Promise-version of Adapter.findForeignObject
         */
        this.findForeignObjectAsync = tools.promisify(this.findForeignObject, this, ['id', 'name']);

        /**
         * Get any object.
         *
         * ID must be specified with namespace.
         *
         * @alias getForeignObject
         * @memberof Adapter
         * @param {string} id exactly object ID (with namespace)
         * @param {object} [options] optional user context
         * @param {ioBroker.GetObjectCallback} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *              if (err) adapter.log.error('Cannot get object: ' + err);
         *            }
         *        </code></pre>
         */
        this.getForeignObject = (id, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('getForeignObject not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, true, options);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            adapterObjects.getObject(id, options, (err, obj) => {
                const adapterName = this.namespace.split('.')[0];
                // remove protectedNative if not admin or own adapter
                if (obj && obj.protectedNative && obj.protectedNative.length && obj._id &&
                    obj._id.startsWith('system.adapter.') && adapterName !== 'admin' &&
                    adapterName !== obj._id.split('.')[2]
                ) {
                    for (const attr of obj.protectedNative) {
                        delete obj.native[attr];
                    } // endFor
                } // endIf

                return tools.maybeCallbackWithError(callback, err, obj);
            });
        };
        /**
         * Promise-version of Adapter.getForeignObject
         */
        this.getForeignObjectAsync = tools.promisify(this.getForeignObject, this);

        /**
         * Delete an object of this instance.
         *
         * It is not required to provice the adapter namespace, because it will automatically be added.
         * E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.
         *
         * The corresponding state will be deleted too if the object has type "state".
         *
         * @alias delObject
         * @memberof Adapter
         * @param {string} id exactly object ID (without namespace)
         * @param {object} [options] optional user context. E.g. recursive option could be true
         * @param {ioBroker.ErrorCallback} [callback] return result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot delete object: ' + err);
         *            }
         *        </code></pre>
         */
        this.delObject = (id, options, callback) => {
            try {
                validateId(id, false, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            // delObject does the same as delForeignObject, but fixes the ID first
            id = this._fixId(id);
            this.delForeignObject(id, options, callback);
        };
        /**
         * Promise-version of Adapter.delObject
         */
        this.delObjectAsync = tools.promisify(this.delObject, this);

        const _deleteObjects = (tasks, options, cb) => {
            if (!tasks || !tasks.length) {
                return tools.maybeCallback(cb);
            } else {
                const task = tasks.shift();
                adapterObjects.delObject(task.id, options, err => {
                    if (err) {
                        return tools.maybeCallbackWithError(cb, err);
                    } else if (!task.state) {
                        // if not a state, we dont have to delete state
                        tools.removeIdFromAllEnums(adapterObjects, task.id).then(() => setImmediate(_deleteObjects, tasks, options, cb))
                            .catch(e => {
                                this.log.warn(`Could not remove ${task.id} from enums: ${e.message}`);
                                setImmediate(_deleteObjects, tasks, options, cb);
                            });
                    } else {
                        this.delForeignState(task.id, options, err => {
                            err && this.log.warn(`Could not remove state of ${task.id}`);
                            tools.removeIdFromAllEnums(adapterObjects, task.id).then(() => setImmediate(_deleteObjects, tasks, options, cb))
                                .catch(e => {
                                    this.log.warn(`Could not remove ${task.id} from enums: ${e.message}`);
                                    setImmediate(_deleteObjects, tasks, options, cb);
                                });
                        });
                    }
                });
            }
        };
        /**
         * Delete any object.
         *
         * The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".
         *
         * @alias delForeignObject
         * @memberof Adapter
         * @param {string} id exactly object ID (with namespace)
         * @param {object} [options] optional user context or {recursive:true} to delete all underlying objects
         * @param {ioBroker.ErrorCallback} [callback] return result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot delete object: ' + err);
         *            }
         *        </code></pre>
         */
        this.delForeignObject = (id, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('delForeignObject not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, true, options);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            // If recursive deletion of all underlying objects, including id
            if (options && options.recursive) {
                // read object itself
                adapterObjects.getObject(id, options, (err, obj) => {
                    const tasks = obj && (!obj.common || !obj.common.dontDelete) ? [{id, state: obj.type === 'state'}] : [];
                    const selector = {startkey: id + '.', endkey: id + '.\u9999'};
                    // read all underlying states
                    adapterObjects.getObjectList(selector, options, (err, res) => {
                        res && res.rows && res.rows.forEach(item =>
                            !tasks.find(task => task.id === item.id) &&
                            (!item.value || !item.value.common || !item.value.common.dontDelete) && // exclude objects with dontDelete flag
                            tasks.push({id: item.id, state: item.value && item.value.type === 'state'}));
                        _deleteObjects(tasks, options, callback);
                    });
                });
            } else {
                adapterObjects.getObject(id, options, (err, obj) => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else if (!obj) {
                        // obj non existing we can return right now
                        return tools.maybeCallback(callback);
                    } else {
                        // do not allow deletion of objects with dontDelete flag
                        if (!obj.common || !obj.common.dontDelete) {
                            adapterObjects.delObject(obj._id, options, err => {
                                if (err) {
                                    return tools.maybeCallbackWithError(callback, err);
                                } else if (obj.type !== 'state') {
                                    tools.removeIdFromAllEnums(adapterObjects, id)
                                        .then(() => {
                                            return tools.maybeCallback(callback);
                                        })
                                        .catch(e => {
                                            return tools.maybeCallbackWithError(callback, e);
                                        });
                                } else {
                                    if (obj.binary) {
                                        this.delBinaryState(id, options, () =>
                                            tools.removeIdFromAllEnums(adapterObjects, id)
                                                .then(() => {
                                                    return tools.maybeCallback(callback);
                                                })
                                                .catch(e => {
                                                    return tools.maybeCallbackWithError(callback, e);
                                                }));
                                    } else {
                                        this.delForeignState(id, options, () =>
                                            tools.removeIdFromAllEnums(adapterObjects, id)
                                                .then(() => {
                                                    return tools.maybeCallback(callback);
                                                })
                                                .catch(e => {
                                                    return tools.maybeCallbackWithError(callback, e);
                                                }));
                                    }
                                }
                            });
                        } else {
                            return tools.maybeCallbackWithError(callback, 'not deletable');
                        }
                    }
                });
            }
        };
        /**
         * Promise-version of Adapter.delForeignObject
         */
        this.delForeignObjectAsync = tools.promisify(this.delForeignObject, this);

        /**
         * Subscribe for the changes of objects in this instance.
         *
         * @alias subscribeObjects
         * @memberof Adapter
         * @param {string} pattern pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces
         * @param {object} [options] optional user context
         * @param {ioBroker.ErrorCallback} [callback] optional returns result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot subscribe object: ' + err);
         *            }
         *        </code></pre>
         */
        this.subscribeObjects = (pattern, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = undefined;
            }
            if (!adapterObjects) {
                this.log.info('subscribeObjects not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (pattern === '*') {
                adapterObjects.subscribeUser(this.namespace + '.*', options, callback);
            } else {
                pattern = this._fixId(pattern, true);
                adapterObjects.subscribeUser(pattern, options, callback);
            }
        };
        /**
         * Promise-version of Adapter.subscribeObjects
         */
        this.subscribeObjectsAsync = tools.promisify(this.subscribeObjects, this);

        /**
         * Unsubscribe on the changes of objects in this instance.
         *
         * @alias unsubscribeObjects
         * @memberof Adapter
         * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
         * @param {object} [options] optional user context
         * @param {ioBroker.ErrorCallback} [callback] optional returns result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
         *            }
         *        </code></pre>
         */
        this.unsubscribeObjects = (pattern, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = undefined;
            }
            if (!adapterObjects) {
                this.log.info('unsubscribeObjects not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (pattern === '*') {
                adapterObjects.unsubscribeUser(this.namespace + '.*', options, callback);
            } else {
                pattern = this._fixId(pattern, true);
                adapterObjects.unsubscribeUser(pattern, options, callback);
            }
        };
        /**
         * Promise-version of Adapter.unsubscribeObjects
         */
        this.unsubscribeObjectsAsync = tools.promisify(this.unsubscribeObjects, this);

        /**
         * Subscribe for the changes of objects in any instance.
         *
         * @alias subscribeForeignObjects
         * @memberof Adapter
         * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns
         * @param {object} [options] optional user context
         * @param {ioBroker.ErrorCallback} [callback] optional returns result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot subscribe object: ' + err);
         *            }
         *        </code></pre>
         */
        this.subscribeForeignObjects = (pattern, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = undefined;
            }
            if (!adapterObjects) {
                this.log.info('subscribeForeignObjects not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterObjects.subscribeUser(pattern, options, callback);
        };
        /**
         * Promise-version of Adapter.subscribeForeignObjects
         */
        this.subscribeForeignObjectsAsync = tools.promisify(this.subscribeForeignObjects, this);

        /**
         * Unsubscribe for the patterns on all objects.
         *
         * @alias unsubscribeForeignObjects
         * @memberof Adapter
         * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
         * @param {object} [options] optional user context
         * @param {ioBroker.ErrorCallback} [callback] optional returns result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
         *            }
         *        </code></pre>
         */
        this.unsubscribeForeignObjects = (pattern, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = undefined;
            }
            if (!pattern) {
                pattern = '*';
            }
            if (!adapterObjects) {
                this.log.info('unsubscribeForeignObjects not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterObjects.unsubscribeUser(pattern, options, callback);
        };
        /**
         * Promise-version of Adapter.unsubscribeForeignObjects
         */
        this.unsubscribeForeignObjectsAsync = tools.promisify(this.unsubscribeForeignObjects, this);

        /**
         * Same as {@link Adapter.setObject}, but with check if the object exists.
         *
         * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE".
         * New object will be created only if no object exists with such ID.
         *
         * @alias setObjectNotExists
         * @memberof Adapter
         * @param {string} id object ID, that must be overwritten or created.
         * @param {object} obj new object
         * @param {object} [options] optional user context
         * @param {ioBroker.SetObjectCallback} [callback] return result
         *        <pre><code>
         *            function (err, obj) {
         *              // obj is {id: id}
         *              if (err) adapter.log.error('Cannot write object: ' + err);
         *            }
         *        </code></pre>
         * @returns {Promise<{id: string}>}
         */
        this.setObjectNotExists = async (id, obj, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('setObjectNotExists not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, false, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            id = this._fixId(id);

            if (obj.children || obj.parent) {
                logger.warn(`${this.namespaceLog} Do not use parent or children for ${id}`);
            }

            // check if object already exists
            let objExists;
            try {
                objExists = await adapterObjects.objectExists(id, options);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, `Could not check object existence of ${id}: ${e.message}`);
            }

            if (objExists === false) {
                if (!obj.from) {
                    obj.from = 'system.adapter.' + this.namespace;
                }
                if (!obj.user) {
                    obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                }
                if (!obj.ts) {
                    obj.ts = Date.now();
                }

                return setObjectWithDefaultValue(id, obj, null, callback);
            } else {
                return tools.maybeCallbackWithError(callback, null);
            }
        };
        /**
         * Promise-version of Adapter.setObjectNotExists
         */
        this.setObjectNotExistsAsync = tools.promisify(this.setObjectNotExists, this);

        /**
         * Same as {@link Adapter.setForeignObject}, but with check if the object exists.
         *
         * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE".
         * New object will be created only if no object exists with such ID.
         *
         * @alias setForeignObjectNotExists
         * @memberof Adapter
         * @param {string} id object ID, that must be overwritten or created.
         * @param {object} obj new object
         * @param {object} [options] optional user context
         * @param {ioBroker.SetObjectCallback} [callback] return result
         *        <pre><code>
         *            function (err, obj) {
         *              // obj is {id: id}
         *              if (err) adapter.log.error('Cannot write object: ' + err);
         *            }
         *        </code></pre>
         * @returns {Promise<{id: string}>}
         */
        this.setForeignObjectNotExists = async (id, obj, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('setForeignObjectNotExists not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, true, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            // check if object exists
            let objExists;
            try {
                objExists = await adapterObjects.objectExists(id, options);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, `Could not check object existence of ${id}: ${e.message}`);
            }

            if (objExists === false) {
                if (!obj.from) {
                    obj.from = 'system.adapter.' + this.namespace;
                }
                if (!obj.user) {
                    obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                }
                if (!obj.ts) {
                    obj.ts = Date.now();
                }

                return setObjectWithDefaultValue(id, obj, null, callback);
            } else {
                return tools.maybeCallbackWithError(callback, null);
            }
        };
        /**
         * Promise-version of Adapter.setForeignObjectNotExists
         */
        this.setForeignObjectNotExistsAsync = tools.promisify(this.setForeignObjectNotExists, this);

        this._DCS2ID = (device, channel, stateOrPoint) => {
            let id = '';
            if (device)  {
                id += device;
            }
            if (channel) {
                id += (id ? '.' : '') + channel;
            }

            if (stateOrPoint !== true && stateOrPoint !== false) {
                if (stateOrPoint)   {
                    id += (id ? '.' : '') + stateOrPoint;
                }
            } else if (stateOrPoint === true && id) {
                id += '.';
            }
            return id;
        };

        this.createDevice = (deviceName, common, _native, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!deviceName) {
                logger.error(this.namespaceLog + ' Try to create device with empty name!');
                return;
            }
            if (typeof _native === 'function') {
                callback = _native;
                _native = {};
            }
            if (typeof common === 'function') {
                callback = common;
                common = {};
            }
            common = common || {};
            common.name = common.name || deviceName;

            deviceName = deviceName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            _native = _native || {};

            this.setObjectNotExists(deviceName, {
                type:     'device',
                common:   common,
                native:   _native
            }, options, callback);
        };
        /**
         * Promise-version of Adapter.createDevice
         */
        this.createDeviceAsync = tools.promisify(this.createDevice, this);

        // name of channel must be in format "channel"
        this.createChannel = (parentDevice, channelName, roleOrCommon, _native, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!channelName) {
                throw new Error('Cannot create a channel without a name!');
            }

            if (typeof _native === 'function') {
                callback = _native;
                _native = {};
            }

            if (typeof roleOrCommon === 'function') {
                callback = roleOrCommon;
                roleOrCommon = undefined;
            }

            let common = {};
            if (typeof roleOrCommon === 'string') {
                common = {
                    name: '',
                    role: roleOrCommon
                };
            } else if (typeof roleOrCommon === 'object') {
                common = roleOrCommon;
            }
            common.name = common.name || channelName;

            if (parentDevice) {
                parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }
            channelName  = channelName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            channelName  = this._DCS2ID(parentDevice, channelName);

            _native = _native || {};

            const obj = {
                type:     'channel',
                common:   common,
                native:   _native
            };

            this.setObjectNotExists(channelName, obj, options, callback);
        };
        /**
         * Promise-version of Adapter.createChannel
         */
        this.createChannelAsync = tools.promisify(this.createChannel, this);

        this.createState = (parentDevice, parentChannel, stateName, roleOrCommon, _native, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!stateName) {
                throw new Error('Cannot create a state without a name!');
            }

            if (typeof _native === 'function') {
                callback = _native;
                _native = {};
            }

            if (typeof roleOrCommon === 'function') {
                callback = roleOrCommon;
                roleOrCommon = undefined;
            }

            /** @type {ioBroker.StateCommon} */
            let common = {};
            if (typeof roleOrCommon === 'string') {
                common = {
                    read:  true,
                    write: false,
                    name:  '',
                    role:  roleOrCommon
                };
            } else if (typeof roleOrCommon === 'object') {
                common = roleOrCommon;
            }

            common.name = common.name || stateName;
            _native = _native || {};

            common.read  = (common.read  === undefined) ? true  : common.read;
            common.write = (common.write === undefined) ? false : common.write;

            if (!common.role) {
                logger.error(this.namespaceLog + ' Try to create state ' + (parentDevice ? (parentDevice + '.') : '') + parentChannel + '.' + stateName + ' without role');
                return;
            }

            if (parentDevice)  {
                parentDevice  = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }
            if (parentChannel) {
                parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }
            stateName = stateName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            const id = this._fixId({device: parentDevice, channel: parentChannel, state: stateName});

            // Check min, max and def values for number
            if (common.type !== undefined && common.type === 'number') {
                let min = 0;
                let max = 0;
                let def = 0;
                let err;
                if (common.min !== undefined) {
                    min = common.min;
                    if (typeof min !== 'number') {
                        min = parseFloat(min);
                        if (isNaN(min)) {
                            err = 'Wrong type of ' + id + '.common.min';
                            logger.error(this.namespaceLog + ' ' + err);
                            return tools.maybeCallbackWithError(callback, err);
                        } else {
                            common.min = min;
                        }
                    }
                }
                if (common.max !== undefined) {
                    max = common.max;
                    if (typeof max !== 'number') {
                        max = parseFloat(max);
                        if (isNaN(max)) {
                            err = 'Wrong type of ' + id + '.common.max';
                            logger.error(this.namespaceLog + ' ' + err);
                            return tools.maybeCallbackWithError(callback, err);
                        } else {
                            common.max = max;
                        }
                    }
                }
                if (common.def !== undefined) {
                    def = common.def;
                    if (typeof def !== 'number') {
                        def = parseFloat(def);
                        if (isNaN(def)) {
                            err = new Error('Wrong type of ' + id + '.common.def');
                            logger.error(`${this.namespaceLog} ${err.message}`);
                            return tools.maybeCallbackWithError(callback, err);
                        } else {
                            common.def = def;
                        }
                    }
                }
                if (common.min !== undefined && common.max !== undefined && min > max) {
                    common.max = min;
                    common.min = max;
                }
                if (common.def !== undefined && common.min !== undefined && def < min) {
                    common.def = min;
                }
                if (common.def !== undefined && common.max !== undefined && def > max) {
                    common.def = max;
                }
            }

            this.setObjectNotExists(id, {
                type:     'state',
                common:   common,
                native:   _native
            }, options, err => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else if (common.def !== undefined) {
                    this.getState(id, null, (err, state) => {
                        if (!state) {
                            if (common.defAck !== undefined) {
                                this.setState(id, common.def, common.defAck, options, callback);
                            } else {
                                this.setState(id, common.def, options, callback);
                            }
                        } else {
                            return tools.maybeCallback(callback);
                        }

                    });
                } else {
                    this.getState(id, null, (err, state) => {
                        if (!state) {
                            this.setState(id, null, true, options, callback);
                        } else {
                            return tools.maybeCallback(callback);
                        }
                    });
                }
            });
        };
        /**
         * Promise-version of Adapter.createState
         */
        this.createStateAsync = tools.promisify(this.createState, this);

        /**
         * Delete device with all its channels and states.
         *
         * @alias deleteDevice
         * @memberof Adapter
         * @param {string} deviceName is the part of ID like: adapter.instance.<deviceName>
         * @param {object} [options] optional user context
         * @param {ioBroker.ErrorCallback} [callback] return result
         *        <pre><code>
         *            function (err, obj) {
         *              // obj is {id: id}
         *              if (err) adapter.log.error('Cannot write object: ' + err);
         *            }
         *        </code></pre>
         */
        this.deleteDevice = (deviceName, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('deleteDevice not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            deviceName = deviceName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            if (!this._namespaceRegExp.test(deviceName)) {
                deviceName = this.namespace + '.' + deviceName;
            }

            adapterObjects.getObjectView('system', 'device', {startkey: deviceName, endkey: deviceName}, options, (err, res) => {
                if (err || !res || !res.rows) {
                    return tools.maybeCallbackWithError(callback, err);
                }
                let cnt = 0;
                if (res.rows.length > 1) {
                    logger.warn(this.namespaceLog + ' Found more than one device ' + deviceName);
                }

                for (let t = 0; t < res.rows.length; t++) {
                    cnt++;
                    this.delObject(res.rows[t].id, options, err => {
                        if (err) {
                            return tools.maybeCallbackWithError(callback, err);
                        }

                        if (!--cnt) {
                            let _cnt = 0;
                            _cnt++;
                            // read channels of device
                            adapterObjects.getObjectView('system', 'channel', {startkey: deviceName + '.', endkey: deviceName + '.\u9999'}, options, (err, res) => {
                                _cnt--;
                                if (err || !res || !res.rows) {
                                    return tools.maybeCallbackWithError(callback, err);
                                }
                                for (let k = 0; k < res.rows.length; k++) {
                                    _cnt++;
                                    this.deleteChannel(deviceName, res.rows[k].id, options, err => {
                                        if (!--_cnt) {
                                            typeof callback === 'function' && callback(err);
                                            callback = null;
                                        } else {
                                            if (err) {
                                                typeof callback === 'function' && callback(err);
                                                callback = null;
                                            }
                                        }
                                    });
                                }
                                if (!_cnt && typeof callback === 'function') {
                                    callback();
                                    callback = null;
                                }
                            });
                            // read states of the device...
                            _cnt++;
                            adapterObjects.getObjectView('system', 'state', {startkey: deviceName + '.', endkey: deviceName + '.\u9999'}, options, (err, res) => {
                                _cnt--;
                                if (err || !res || !res.rows) {
                                    return tools.maybeCallbackWithError(callback, err);
                                }
                                for (let k = 0; k < res.rows.length; k++) {
                                    _cnt++;
                                    this.deleteState(deviceName, '', res.rows[k].id, options, err => {
                                        if (!--_cnt) {
                                            typeof callback === 'function' && callback(err);
                                            callback = null;
                                        } else {
                                            if (err) {
                                                typeof callback === 'function' && callback(err);
                                                callback = null;
                                            }
                                        }
                                    });
                                }
                                if (!_cnt && typeof callback === 'function') {
                                    callback();
                                    callback = null;
                                }
                            });
                        }
                    });
                }
                if (!cnt && typeof callback === 'function') {
                    callback();
                    callback = null;
                }
            });
        };
        /**
         * Promise-version of Adapter.deleteDevice
         */
        this.deleteDeviceAsync = tools.promisify(this.deleteDevice, this);

        this.addChannelToEnum = (enumName, addTo, parentDevice, channelName, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('addChannelToEnum not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (parentDevice) {
                if (this._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(this.namespace.length + 1);
                }
                parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (this._namespaceRegExp.test(channelName)) {
                channelName = channelName.substring(this.namespace.length + 1);
            }
            if (parentDevice && channelName.substring(0, parentDevice.length) === parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            const objId = this.namespace + '.' + this._DCS2ID(parentDevice, channelName);

            if (addTo.match(/^enum\./)) {
                adapterObjects.getObject(addTo, options, (err, obj) => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else if (obj) {
                        const pos = obj.common.members.indexOf(objId);
                        if (pos === -1) {
                            obj.common.members.push(objId);
                            obj.from = 'system.adapter.' + this.namespace;
                            obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                            obj.ts = Date.now();

                            adapterObjects.setObject(obj._id, obj, options, callback);
                        } else {
                            return tools.maybeCallback(callback);
                        }
                    }
                });
            } else {
                if (enumName.match(/^enum\./)) {
                    enumName = enumName.substring(5);
                }

                adapterObjects.getObject('enum.' + enumName + '.' + addTo, options, (err, obj) => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    }

                    if (obj) {
                        const pos = obj.common.members.indexOf(objId);
                        if (pos === -1) {
                            obj.common.members.push(objId);

                            obj.from = 'system.adapter.' + this.namespace;
                            obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                            obj.ts = Date.now();

                            adapterObjects.setObject(obj._id, obj, options, callback);
                        } else {
                            return tools.maybeCallback(callback);
                        }
                    } else {
                        // Create enum
                        adapterObjects.setObject('enum.' + enumName + '.' + addTo, {
                            common: {
                                name: addTo,
                                members: [objId]
                            },
                            from: 'system.adapter.' + this.namespace,
                            ts: Date.now(),
                            type: 'enum'
                        }, options, callback);
                    }
                });
            }
        };
        /**
         * Promise-version of Adapter.addChannelToEnum
         */
        this.addChannelToEnumAsync = tools.promisify(this.addChannelToEnum, this);

        this.deleteChannelFromEnum = (enumName, parentDevice, channelName, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('deleteChannelFromEnum not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (parentDevice) {
                if (parentDevice.substring(0, this.namespace.length) === this.namespace) {
                    parentDevice = parentDevice.substring(this.namespace.length + 1);
                }
                parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (channelName && channelName.substring(0, this.namespace.length) === this.namespace) {
                channelName = channelName.substring(this.namespace.length + 1);
            }
            if (parentDevice && channelName && channelName.substring(0, parentDevice.length) === parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName || '';
            channelName = channelName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            const objId = this.namespace + '.' + this._DCS2ID(parentDevice, channelName);

            if (enumName) {
                enumName = 'enum.' + enumName + '.';
            } else {
                enumName = 'enum.';
            }

            adapterObjects.getObjectView('system', 'enum', {startkey: enumName, endkey: enumName + '\u9999'}, options, async (err, res) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }

                if (res && res.rows) {
                    for (let i = 0; i < res.rows.length; i++) {
                        try {
                            const obj = await adapterObjects.getObject(res.rows[i].id, options);

                            if (obj && obj.common && obj.common.members) {
                                const pos = obj.common.members.indexOf(objId);
                                if (pos !== -1) {
                                    obj.common.members.splice(pos, 1);
                                    obj.from = 'system.adapter.' + this.namespace;
                                    obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                                    obj.ts = Date.now();

                                    await adapterObjects.setObjectAsync(obj._id, obj, options);
                                }
                            }
                        } catch (e) {
                            return tools.maybeCallbackWithError(callback, e);
                        }
                    }
                }
                return tools.maybeCallback(callback);
            });
        };
        /**
         * Promise-version of Adapter.deleteChannelFromEnum
         */
        this.deleteChannelFromEnumAsync = tools.promisify(this.deleteChannelFromEnum, this);

        this.deleteChannel = (parentDevice, channelName, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (typeof channelName === 'function') {
                callback = channelName;
                channelName = parentDevice;
                parentDevice = '';
            }
            if (parentDevice && !channelName) {
                channelName = parentDevice;
                parentDevice = '';
            } else if (parentDevice && typeof channelName === 'function') {
                callback     = channelName;
                channelName  = parentDevice;
                parentDevice = '';
            }
            if (!adapterObjects) {
                this.log.info('deleteChannel not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (!parentDevice) {
                parentDevice = '';
            }
            const _parentDevice = parentDevice;
            const _channelName  = channelName;

            if (parentDevice) {
                if (this._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(this.namespace.length + 1);
                }
                parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (channelName && this._namespaceRegExp.test(channelName)) {
                channelName = channelName.substring(this.namespace.length + 1);
            }
            if (parentDevice && channelName && channelName.substring(0, parentDevice.length) === parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName || '';
            channelName = channelName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            channelName  = this.namespace + '.' + this._DCS2ID(parentDevice, channelName);

            logger.info(this.namespaceLog + ' Delete channel ' + channelName);

            adapterObjects.getObjectView('system', 'channel', {startkey: channelName, endkey: channelName}, options, (err, res) => {
                if (err || !res || !res.rows) {
                    return tools.maybeCallbackWithError(callback, err);
                }
                let cnt = 0;
                res.rows.length > 1 && logger.warn(this.namespaceLog + ' Found more than one channel ' + channelName);

                for (let t = 0; t < res.rows.length; t++) {
                    cnt++;
                    this.delObject(res.rows[t].id, options, err => {
                        if (err) {
                            return tools.maybeCallbackWithError(callback, err);
                        }
                        if (!--cnt) {
                            adapterObjects.getObjectView('system', 'state', {startkey: channelName + '.', endkey: channelName + '.\u9999'}, options, (err, res) => {
                                if (err || !res || !res.rows) {
                                    return tools.maybeCallbackWithError(callback, err);
                                }
                                let _cnt = 0;
                                for (let k = 0; k < res.rows.length; k++) {
                                    _cnt++;
                                    this.deleteState(_parentDevice, _channelName, res.rows[k].id, options, err => {
                                        if (!--_cnt && callback) {
                                            callback(err);
                                        } else {
                                            if (err) {
                                                typeof callback === 'function' && callback(err);
                                                callback = null;
                                            }
                                        }
                                    });
                                }
                                if (!_cnt && callback) {
                                    callback();
                                }
                            });
                        }
                    });
                }
                if (!cnt && callback) {
                    callback();
                }
            });
        };
        /**
         * Promise-version of Adapter.deleteChannel
         */
        this.deleteChannelAsync = tools.promisify(this.deleteChannel, this);

        this.deleteState = (parentDevice, parentChannel, stateName, options, callback) => {
            if (typeof parentChannel === 'function' && stateName === undefined) {
                stateName     = parentDevice;
                callback      = parentChannel;
                parentChannel = '';
                parentDevice  = '';
            } else
            if (parentChannel === undefined && stateName === undefined) {
                stateName     = parentDevice;
                parentDevice  = '';
                parentChannel = '';
            } else {
                if (typeof options === 'function') {
                    callback = options;
                    options  = null;
                }
                if (typeof stateName === 'function') {
                    callback      = stateName;
                    stateName     = parentChannel;
                    parentChannel = parentDevice;
                    parentDevice  = '';
                }
                if (typeof parentChannel === 'function') {
                    callback      = parentChannel;
                    stateName     = parentDevice;
                    parentChannel = '';
                    parentDevice  = '';
                }
                if (typeof parentChannel === 'function') {
                    callback      = parentChannel;
                    stateName     = parentDevice;
                    parentChannel = '';
                    parentDevice  = '';
                }
            }

            if (parentDevice) {
                if (this._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(this.namespace.length + 1);
                }

                parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (parentChannel) {
                if (this._namespaceRegExp.test(parentChannel)) {
                    parentChannel = parentChannel.substring(this.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (this._namespaceRegExp.test(stateName)) {
                stateName = stateName.substring(this.namespace.length + 1);
            }
            if (parentDevice && stateName.substring(0, parentDevice.length) === parentDevice) {
                stateName = stateName.substring(parentDevice.length + 1);
            }
            if (parentChannel && stateName.substring(0, parentChannel.length) === parentChannel) {
                stateName = stateName.substring(parentChannel.length + 1);
            }
            stateName = stateName || '';
            stateName = stateName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            const _name = this._DCS2ID(parentDevice, parentChannel, stateName);
            this.delObject(_name, options, callback);
        };
        /**
         * Promise-version of Adapter.deleteState
         */
        this.deleteStateAsync = tools.promisify(this.deleteState, this);

        this.getDevices = (options, callback) => {
            if (typeof options === 'function' && typeof callback === 'object') {
                const tmp = callback;
                callback = options;
                options = tmp;
            }
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (!adapterObjects) {
                this.log.info('getDevices not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterObjects.getObjectView('system', 'device', {startkey: this.namespace + '.', endkey: this.namespace + '.\u9999'}, options, (err, obj) => {
                if (err || !obj || !obj.rows || !obj.rows.length) {
                    return tools.maybeCallbackWithError(callback, err, err ? undefined : []);
                }
                const res = [];
                for (let i = 0; i < obj.rows.length; i++) {
                    res.push(obj.rows[i].value);
                }
                return tools.maybeCallbackWithError(callback, null, res);
            });
        };
        /**
         * Promise-version of Adapter.getDevices
         */
        this.getDevicesAsync = tools.promisify(this.getDevices, this);

        this.getChannelsOf = (parentDevice, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (typeof parentDevice === 'function') {
                callback = parentDevice;
                parentDevice = null;
            }

            if (!adapterObjects) {
                this.log.info('getChannelsOf not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (!parentDevice) {
                parentDevice = '';
            }

            if (parentDevice && this._namespaceRegExp.test(parentDevice)) {
                parentDevice = parentDevice.substring(this.namespace.length + 1);
            }

            parentDevice  = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            parentDevice = this.namespace + (parentDevice ? ('.' + parentDevice) : '');
            adapterObjects.getObjectView('system', 'channel', {startkey: parentDevice + '.', endkey: parentDevice + '.\u9999'}, options, (err, obj) => {
                if (err || !obj || !obj.rows || !obj.rows.length) {
                    return tools.maybeCallbackWithError(callback, err, err ? undefined : []);
                }
                const res = [];
                for (let i = 0; i < obj.rows.length; i++) {
                    res.push(obj.rows[i].value);
                }
                return tools.maybeCallbackWithError(callback, null, res);
            });
        };
        /**
         * Promise-version of Adapter.getChannelsOf
         */
        this.getChannelsOfAsync = tools.promisify(this.getChannelsOf, this);

        this.getChannels = this.getChannelsOf;
        this.getChannelsAsync = this.getChannelsOfAsync;

        this.getStatesOf = (parentDevice, parentChannel, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (typeof parentDevice === 'function') {
                callback = parentDevice;
                parentDevice = null;
                parentChannel = null;
            }
            if (typeof parentChannel === 'function') {
                callback = parentChannel;
                parentChannel = null;
            }
            if (!callback) {
                return;
            }

            if (!adapterObjects) {
                this.log.info('getStatesOf not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (!parentDevice) {
                parentDevice = '';
            } else {
                if (this._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(this.namespace.length + 1);
                }

                parentDevice  = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (!parentChannel) {
                parentChannel = '';
            } else if (this._namespaceRegExp.test(parentChannel)) {
                parentChannel = parentChannel.substring(this.namespace.length + 1);
            }

            if (parentDevice && parentChannel && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                parentChannel = parentChannel.substring(parentDevice.length + 1);
            }

            parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            const id = this.namespace + '.' + this._DCS2ID(parentDevice, parentChannel, true);

            adapterObjects.getObjectView('system', 'state', {startkey: id, endkey: id + '\u9999'}, options, (err, obj) => {
                if (err || !obj || !obj.rows || !obj.rows.length) {
                    return tools.maybeCallbackWithError(callback, err, err ? undefined : []);
                }
                const res = [];
                let read = 0;
                for (let i = 0; i < obj.rows.length; i++) {
                    read++;
                    adapterObjects.getObject(obj.rows[i].id, (err, subObj) => {
                        if (subObj) {
                            res.push(subObj);
                        }

                        if (!--read) {
                            return tools.maybeCallbackWithError(callback, null, res);
                        }
                    });
                }
            });
        };
        /**
         * Promise-version of Adapter.getStatesOf
         */
        this.getStatesOfAsync = tools.promisify(this.getStatesOf, this);

        this.addStateToEnum = (enumName, addTo, parentDevice, parentChannel, stateName, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('addStateToEnum not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (parentDevice) {
                if (this._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(this.namespace.length + 1);
                }

                parentDevice  = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (parentChannel) {
                if (this._namespaceRegExp.test(parentChannel)) {
                    parentChannel = parentChannel.substring(this.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (this._namespaceRegExp.test(stateName)) {
                stateName = stateName.substring(this.namespace.length + 1);
            }
            if (parentDevice && stateName.substring(0, parentDevice.length) === parentDevice) {
                stateName = stateName.substring(parentDevice.length + 1);
            }
            if (parentChannel && stateName.substring(0, parentChannel.length) === parentChannel) {
                stateName = stateName.substring(parentChannel.length + 1);
            }
            stateName = stateName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            const objId = this._fixId({device: parentDevice, channel: parentChannel, state: stateName});

            if (addTo.match(/^enum\./)) {
                adapterObjects.getObject(addTo, options, (err, obj) => {
                    if (err || !obj) {
                        return tools.maybeCallbackWithError(callback, err || tools.ERRORS.ERROR_NOT_FOUND);
                    }
                    const pos = obj.common.members.indexOf(objId);
                    if (pos === -1) {
                        obj.common.members.push(objId);
                        obj.from = 'system.adapter.' + this.namespace;
                        obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                        obj.ts = Date.now();
                        adapterObjects.setObject(obj._id, obj, options, callback);
                    } else {
                        return tools.maybeCallback(callback);
                    }
                });
            } else {
                if (enumName.match(/^enum\./)) {
                    enumName = enumName.substring(5);
                }

                adapterObjects.getObject('enum.' + enumName + '.' + addTo, options, (err, obj) => {
                    if (!err && obj) {
                        const pos = obj.common.members.indexOf(objId);
                        if (pos === -1) {
                            obj.common.members.push(objId);
                            obj.from = 'system.adapter.' + this.namespace;
                            obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                            obj.ts = Date.now();
                            adapterObjects.setObject(obj._id, obj, callback);
                        } else {
                            return tools.maybeCallback(callback);
                        }
                    } else {
                        if (err) {
                            return tools.maybeCallbackWithError(callback, err);
                        }

                        // Create enum
                        adapterObjects.setObject('enum.' + enumName + '.' + addTo, {
                            common: {
                                name: addTo,
                                members: [objId]
                            },
                            from: 'system.adapter.' + this.namespace,
                            ts: Date.now(),
                            type: 'enum'
                        }, options, callback);
                    }
                });
            }
        };
        /**
         * Promise-version of Adapter.addStateToEnum
         */
        this.addStateToEnumAsync = tools.promisify(this.addStateToEnum, this);

        this.deleteStateFromEnum = (enumName, parentDevice, parentChannel, stateName, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (!adapterObjects) {
                this.log.info('deleteStateFromEnum not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (parentDevice) {
                if (this._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(this.namespace.length + 1);
                }

                parentDevice  = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (parentChannel) {
                if (this._namespaceRegExp.test(parentChannel)) {
                    parentChannel = parentChannel.substring(this.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (this._namespaceRegExp.test(stateName)) {
                stateName = stateName.substring(this.namespace.length + 1);
            }
            if (parentDevice && stateName.substring(0, parentDevice.length) === parentDevice) {
                stateName = stateName.substring(parentDevice.length + 1);
            }
            if (parentChannel && stateName.substring(0, parentChannel.length) === parentChannel) {
                stateName = stateName.substring(parentChannel.length + 1);
            }
            stateName = stateName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            const objId = this._fixId({device: parentDevice, channel: parentChannel, state: stateName}, false/*, 'state'*/);

            if (enumName) {
                enumName = 'enum.' + enumName + '.';
            } else {
                enumName = 'enum.';
            }

            adapterObjects.getObjectView('system', 'enum', {startkey: enumName, endkey: enumName + '\u9999'}, options,  async (err, res) => {
                if (err || !res || !res.rows) {
                    return tools.maybeCallbackWithError(callback, err);
                }

                for (const row of res.rows) {
                    try {
                        const obj = await adapterObjects.getObjectAsync(row.id);
                        if (obj && obj.common && obj.common.members) {
                            const pos = obj.common.members.indexOf(objId);
                            if (pos !== -1) {
                                obj.common.members.splice(pos, 1);
                                obj.from = 'system.adapter.' + this.namespace;
                                obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                                obj.ts = Date.now();
                                await adapterObjects.setObjectAsync(obj._id, obj);
                            }
                        }
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, e);
                    }

                }
                return tools.maybeCallback(callback);
            });
        };
        /**
         * Promise-version of Adapter.deleteStateFromEnum
         */
        this.deleteStateFromEnumAsync = tools.promisify(this.deleteStateFromEnum, this);

        /**
         * Change file access rights
         *
         * This function updates the file access rights
         * <pre><code>
         *      adapter.chmodFile('vis.0', '/main/vis-views.json', {mode: 0x644}, function (err, processed) {
         *        if (err) adapter.log.error('Cannot read file: ' + err);
         *        console.log('New files: ' + JSON.stringify(processed));
         *      });
         * </code></pre>
         *
         * @alias chownFile
         * @memberof Adapter
         * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
         * @param {string} path path to file without adapter name. E.g. If you want to update "/vis.0/main/*", here must be "/main/*" and _adapter must be equal to "vis.0".
         * @param {object} options data with mode
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, processedFiles) {
         *                list of processed files with new groups
         *            }
         *        </code></pre>
         */
        this.chmodFile = (_adapter, path, options, callback) => {
            if (_adapter === null) {
                _adapter = this.name;
            }

            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('chmodFile not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterObjects.chmodFile(_adapter, path, options, callback);
        };

        /**
         * Promise-version of Adapter.chmodFile
         */
        this.chmodFileAsync = tools.promisify(this.chmodFile, this);

        /**
         * Change file owner
         *
         * This function updates the file owner and ownerGroup
         * <pre><code>
         *      adapter.chownFile('vis.0', '/main/vis-views.json', {owner: 'newOwner', ownerGroup: 'newgroup'}, function (err, processed) {
         *        if (err) adapter.log.error('Cannot read file: ' + err);
         *        console.log('New files: ' + JSON.stringify(processed));
         *      });
         * </code></pre>
         *
         * @alias chownFile
         * @memberof Adapter
         * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
         * @param {string} path path to file without adapter name. E.g. If you want to update "/vis.0/main/*", here must be "/main/*" and _adapter must be equal to "vis.0".
         * @param {object} options data with owner and ownerGroup
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, processedFiles) {
         *                list of processed files with new groups
         *            }
         *        </code></pre>
         */
        this.chownFile = (_adapter, path, options, callback) => {
            if (_adapter === null) {
                _adapter = this.name;
            }

            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('chownFile not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterObjects.chownFile(_adapter, path, options, callback);
        };

        /**
         * Promise-version of Adapter.chownFile
         */
        this.chownFileAsync = tools.promisify(this.chownFile, this);

        /**
         * Read directory from DB.
         *
         * This function reads the content of directory from DB for given adapter and path.
         * If getEnum called with no enum specified, all enums will be returned:
         * <pre><code>
         *      adapter.readDir('vis.0', '/main/', function (err, filesOrDirs) {
         *        // All enums
         *        if (err) adapter.log.error('Cannot read directory: ' + err);
         *        if (filesOrDirs) {
         *           for (var f = 0; f < filesOrDirs.length; f++) {
         *              adapter.log.debug('Directory main has following files and dirs: ' + filesOrDirs[f].file + '[dir - ' + filesOrDirs[f].isDir + ']');
         *           }
         *       }
         *      });
         * </code></pre>
         *
         * @alias readDir
         * @memberof Adapter
         * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
         * @param {string} path path to direcory without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0".
         * @param {object} options optional user context
         * @param {ioBroker.ReadDirCallback} callback return result
         *        <pre><code>
         *            function (err, filesOrDirs) {
         *                // filesOrDirs is array with elements like
         *                // {
         *                //      file:       'views.json,
         *                //      stats:      node.js stats object like https://nodejs.org/api/fs.html#fs_class_fs_stats ,
         *                //      isDir:      true/false,
         *                //      acl:        access control list object,
         *                //      modifiedAt: time when modified,
         *                //      createdAt:  time when created
         *                // }
         *            }
         *        </code></pre>
         */
        this.readDir = (_adapter, path, options, callback) => {
            if (_adapter === null) {
                _adapter = this.name;
            }

            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('readDir not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterObjects.readDir(_adapter, path, options, callback);
        };
        /**
         * Promise-version of Adapter.readDir
         */
        this.readDirAsync = tools.promisify(this.readDir, this);

        this.unlink = (_adapter, name, options, callback) => {
            if (_adapter === null) {
                _adapter = this.name;
            }

            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('unlink not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterObjects.unlink(_adapter, name, options, callback);
        };
        /**
         * Promise-version of Adapter.unlink
         */
        this.unlinkAsync = tools.promisify(this.unlink, this);

        this.delFile = this.unlink;
        this.delFileAsync = this.unlinkAsync;

        this.rename = (_adapter, oldName, newName, options, callback) => {
            if (_adapter === null) {
                _adapter = this.name;
            }
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('rename not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterObjects.rename(_adapter, oldName, newName, options, callback);
        };
        /**
         * Promise-version of Adapter.rename
         */
        this.renameAsync = tools.promisify(this.rename, this);

        this.mkdir = (_adapter, dirname, options, callback) => {
            if (_adapter === null) {
                _adapter = this.name;
            }
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('mkdir not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterObjects.mkdir(_adapter, dirname, options, callback);
        };
        /**
         * Promise-version of Adapter.mkdir
         */
        this.mkdirAsync = tools.promisify(this.mkdir, this);

        /**
         * Read file from DB.
         *
         * This function reads the content of one file from DB for given adapter and file name.
         * <pre><code>
         *      adapter.readFile('vis.0', '/main/vis-views.json', function (err, data) {
         *        // All enums
         *        if (err) adapter.log.error('Cannot read file: ' + err);
         *        console.log('Content of file is: ' + data);
         *      });
         * </code></pre>
         *
         * @alias readFile
         * @memberof Adapter
         * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
         * @param {string} filename path to file without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0".
         * @param {object} options optional user context
         * @param {ioBroker.ReadFileCallback} callback return result
         *        <pre><code>
         *            function (err, data) {
         *                // data is utf8 or binary Buffer depends on the file extension.
         *            }
         *        </code></pre>
         */
        this.readFile = (_adapter, filename, options, callback) => {
            if (_adapter === null) {
                _adapter = this.name;
            }

            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('readFile not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterObjects.readFile(_adapter, filename, options, callback);
        };
        /**
         * Promise-version of Adapter.readFile
         */
        this.readFileAsync = tools.promisify(this.readFile, this, ['file', 'mimeType']);

        /**
         * Write file to DB.
         *
         * This function writes the content of one file into DB for given adapter and file name.
         * <pre><code>
         *      adapter.writeFile('vis.0', '/main/vis-views.json', data, function (err) {
         *        err && adapter.log.error('Cannot write file: ' + err);
         *      });
         * </code></pre>
         *
         * @alias readFile
         * @memberof Adapter
         * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
         * @param {string} filename path to file without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0".
         * @param {object} data data as UTF8 string or buffer depends on the file extension.
         * @param {object} [options] optional user context
         * @param {ioBroker.ErrorCallback} [callback] return result
         *        <pre><code>
         *            function (err) {
         *
         *            }
         *        </code></pre>
         */
        this.writeFile = (_adapter, filename, data, options, callback) => {
            if (_adapter === null) {
                _adapter = this.name;
            }

            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!adapterObjects) {
                this.log.info('writeFile not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            return adapterObjects.writeFile(_adapter, filename, data, options, callback);
        };
        /**
         * Promise-version of Adapter.writeFile
         */
        this.writeFileAsync = tools.promisify(this.writeFile, this);

        /**
         * Checks if file exists in DB.
         *
         * @alias fileExists
         * @memberof Adapter
         * @param {string} _adapter adapter name
         * @param {string} filename path to file without adapter name. E.g. If you want to check "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0".
         * @param {object} [options] optional user context
         * @param {function} [callback] cb function if none provided, a promise is returned
         * @returns {Promise<boolean>}
         */
        this.fileExists = async (_adapter, filename, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (typeof callback !== 'function') {
                return new Promise((resolve, reject) => {
                    this.fileExists(_adapter, filename, options, (err, existent) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(existent);
                        }
                    });
                });
            }

            if (!adapterObjects) {
                this.log.info('fileExists not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                const exists = await adapterObjects.fileExists(_adapter, filename, options);
                callback(null, exists);
            } catch(e) {
                callback(e);
            }
        };
        /**
         * Promise-version of Adapter.fileExists
         */
        this.fileExistsAsync = tools.promisify(this.fileExists, this);

        this.formatValue = (value, decimals, _format) => {
            if (typeof decimals !== 'number') {
                _format  = decimals;
                decimals = 2;
            }

            const format = (!_format || _format.length !== 2) ? ((this.isFloatComma === undefined) ? '.,' : ((this.isFloatComma) ? '.,' : ',.')) : _format;

            if (typeof value !== 'number') {
                value = parseFloat(value);
            }
            return isNaN(value) ? '' : value.toFixed(decimals).replace(format[0], format[1]).replace(/\B(?=(\d{3})+(?!\d))/g, format[0]);
        };

        this.formatDate = (dateObj, isDuration, _format) => {
            if ((typeof isDuration === 'string' && isDuration.toLowerCase() === 'duration') || isDuration === true) {
                isDuration  = true;
            }
            if (typeof isDuration !== 'boolean') {
                _format    = isDuration;
                isDuration = false;
            }

            if (!dateObj) {
                return '';
            }
            const type = typeof dateObj;
            if (type === 'string') {
                dateObj = new Date(dateObj);
            }

            if (type !== 'object') {
                const j = parseInt(dateObj, 10);
                if (j === dateObj) {
                    // may this is interval
                    if (j < 946681200) {
                        isDuration = true;
                        dateObj = new Date(dateObj);
                    } else {
                        // if less 2000.01.01 00:00:00
                        dateObj = (j < 946681200000) ? new Date(j * 1000) : new Date(j);
                    }
                } else {
                    dateObj = new Date(dateObj);
                }
            }
            const format = _format || this.dateFormat || 'DD.MM.YYYY';

            if (isDuration) {
                dateObj.setMilliseconds(dateObj.getMilliseconds() + dateObj.getTimezoneOffset() * 60 * 1000);
            }

            const validFormatChars = 'YJГMМDTДhSчmмsс';
            let s      = '';
            let result = '';

            const put = s => {
                /** @type {number | string} */
                let v = '';
                switch (s) {
                    case 'YYYY':
                    case 'JJJJ':
                    case 'ГГГГ':
                    case 'YY':
                    case 'JJ':
                    case 'ГГ':
                        v = /** @type {Date} */(dateObj).getFullYear();
                        if (s.length === 2) {
                            v %= 100;
                        }
                        if (v <= 9) {
                            v = '0' + v;
                        }
                        break;
                    case 'MM':
                    case 'M':
                    case 'ММ':
                    case 'М':
                        v = dateObj.getMonth() + 1;
                        if (v < 10 && s.length === 2) {
                            v = '0' + v;
                        }
                        break;
                    case 'DD':
                    case 'TT':
                    case 'D':
                    case 'T':
                    case 'ДД':
                    case 'Д':
                        v = dateObj.getDate();
                        if (v < 10 && s.length === 2) {
                            v = '0' + v;
                        }
                        break;
                    case 'hh':
                    case 'SS':
                    case 'h':
                    case 'S':
                    case 'чч':
                    case 'ч':
                        v = dateObj.getHours();
                        if (v < 10 && s.length === 2) {
                            v = '0' + v;
                        }
                        break;
                    case 'mm':
                    case 'm':
                    case 'мм':
                    case 'м':
                        v = dateObj.getMinutes();
                        if (v < 10 && s.length === 2) {
                            v = '0' + v;
                        }
                        break;
                    case 'ss':
                    case 's':
                    case 'cc':
                    case 'c':
                        v = dateObj.getSeconds();
                        if (v < 10 && s.length === 2) {
                            v = '0' + v;
                        }
                        v = v.toString();
                        break;
                    case 'sss':
                    case 'ссс':
                        v = dateObj.getMilliseconds();
                        if (v < 10) {
                            v = '00' + v;
                        } else if (v < 100) {
                            v = '0' + v;
                        }
                        v = v.toString();
                }
                return result += v;
            };

            for (let i = 0; i < format.length; i++) {
                if (validFormatChars.indexOf(format[i]) >= 0) {
                    s += format[i];
                } else {
                    put(s);
                    s = '';
                    result += format[i];
                }
            }
            put(s);
            return result;
        };
    };

    const getGroups = (ids, callback, i) => {
        i = i || 0;
        if (!ids || i >= ids.length) {
            return tools.maybeCallback(callback);
        } else if (this.groups[ids] !== undefined) {
            setImmediate(getGroups, ids, callback, i + 1);
        } else {
            this.getForeignObject(ids[i], null, (err, obj) => {
                this.groups[ids] = obj || {};
                setImmediate(getGroups, ids, callback, i + 1);
            });
        }
    };

    // Cache will be cleared if user or group changes.. Important! only if subscribed.
    const getUserGroups = (options, callback) => {
        if (this.users[options.user]) {
            options.groups = this.users[options.user].groups;
            options.acl    = this.users[options.user].acl;
            return tools.maybeCallback(callback, options);
        }
        options.groups = [];
        this.getForeignObject(options.user, null, (err, userAcl) => {
            if (!userAcl) {
                // User does not exists
                logger.error(this.namespaceLog + ' unknown user "' + options.user + '"');
                return tools.maybeCallback(callback, options);
            } else {
                this.getForeignObjects('*', 'group', null, null, (err, groups) => {
                    // aggregate all groups permissions, where this user is
                    if (groups) {
                        for (const g in groups) {
                            if (Object.prototype.hasOwnProperty.call(groups, g) &&
                                groups[g] &&
                                groups[g].common &&
                                groups[g].common.members &&
                                groups[g].common.members.indexOf(options.user) !== -1) {
                                options.groups.push(groups[g]._id);
                            }
                        }
                    }

                    // read all groups for this user
                    this.users[options.user] = {groups: options.groups, acl: (userAcl.common && userAcl.common.acl) || {}};
                    getGroups(options.groups, () => {
                        // combine all rights
                        const user = this.users[options.user];
                        for (let g = 0; g < options.groups.length; g++) {
                            const gName = options.groups[g];
                            if (!this.groups[gName] || !this.groups[gName].common || !this.groups[gName].common.acl) {
                                continue;
                            }
                            const group = this.groups[gName];

                            if (group.common.acl && group.common.acl.file) {
                                if (!user.acl || !user.acl.file) {
                                    user.acl      = user.acl || {};
                                    user.acl.file = user.acl.file || {};

                                    user.acl.file.create    = group.common.acl.file.create;
                                    user.acl.file.read      = group.common.acl.file.read;
                                    user.acl.file.write     = group.common.acl.file.write;
                                    user.acl.file['delete'] = group.common.acl.file['delete'];
                                    user.acl.file.list      = group.common.acl.file.list;
                                } else {
                                    user.acl.file.create    = user.acl.file.create    || group.common.acl.file.create;
                                    user.acl.file.read      = user.acl.file.read      || group.common.acl.file.read;
                                    user.acl.file.write     = user.acl.file.write     || group.common.acl.file.write;
                                    user.acl.file['delete'] = user.acl.file['delete'] || group.common.acl.file['delete'];
                                    user.acl.file.list      = user.acl.file.list      || group.common.acl.file.list;
                                }
                            }

                            if (group.common.acl && group.common.acl.object) {
                                if (!user.acl || !user.acl.object) {
                                    user.acl        = user.acl || {};
                                    user.acl.object = user.acl.object || {};

                                    user.acl.object.create    = group.common.acl.object.create;
                                    user.acl.object.read      = group.common.acl.object.read;
                                    user.acl.object.write     = group.common.acl.object.write;
                                    user.acl.object['delete'] = group.common.acl.object['delete'];
                                    user.acl.object.list      = group.common.acl.object.list;
                                } else {
                                    user.acl.object.create    = user.acl.object.create    || group.common.acl.object.create;
                                    user.acl.object.read      = user.acl.object.read      || group.common.acl.object.read;
                                    user.acl.object.write     = user.acl.object.write     || group.common.acl.object.write;
                                    user.acl.object['delete'] = user.acl.object['delete'] || group.common.acl.object['delete'];
                                    user.acl.object.list      = user.acl.object.list      || group.common.acl.object.list;
                                }
                            }

                            if (group.common.acl && group.common.acl.users) {
                                if (!user.acl || !user.acl.users) {
                                    user.acl       = user.acl || {};
                                    user.acl.users = user.acl.users || {};

                                    user.acl.users.create    = group.common.acl.users.create;
                                    user.acl.users.read      = group.common.acl.users.read;
                                    user.acl.users.write     = group.common.acl.users.write;
                                    user.acl.users['delete'] = group.common.acl.users['delete'];
                                    user.acl.users.list      = group.common.acl.users.list;

                                } else {
                                    user.acl.users.create    = user.acl.users.create    || group.common.acl.users.create;
                                    user.acl.users.read      = user.acl.users.read      || group.common.acl.users.read;
                                    user.acl.users.write     = user.acl.users.write     || group.common.acl.users.write;
                                    user.acl.users['delete'] = user.acl.users['delete'] || group.common.acl.users['delete'];
                                    user.acl.users.list      = user.acl.users.list      || group.common.acl.users.list;
                                }
                            }
                            if (group.common.acl && group.common.acl.state) {
                                if (!user.acl || !user.acl.state) {
                                    user.acl       = user.acl || {};
                                    user.acl.state = user.acl.state || {};

                                    user.acl.state.create    = group.common.acl.state.create;
                                    user.acl.state.read      = group.common.acl.state.read;
                                    user.acl.state.write     = group.common.acl.state.write;
                                    user.acl.state['delete'] = group.common.acl.state['delete'];
                                    user.acl.state.list      = group.common.acl.state.list;

                                } else {
                                    user.acl.state.create    = user.acl.state.create    || group.common.acl.state.create;
                                    user.acl.state.read      = user.acl.state.read      || group.common.acl.state.read;
                                    user.acl.state.write     = user.acl.state.write     || group.common.acl.state.write;
                                    user.acl.state['delete'] = user.acl.state['delete'] || group.common.acl.state['delete'];
                                    user.acl.state.list      = user.acl.state.list      || group.common.acl.state.list;
                                }
                            }
                        }
                        options.acl    = user.acl;
                        return tools.maybeCallback(callback, options);
                    });
                });
            }
        });
    };

    /**
     * This method update the cached values in this.usernames
     *
     * @returns {Promise<void>}
     */
    const updateUsernameCache = async () => {
        // make sure cache is cleared
        try {
            // get all users
            const obj = await this.getObjectListAsync({startkey: 'system.user.', endkey: 'system.user.\u9999'});
            this.usernames = {};
            for (const row of obj.rows) {
                if (row.value.common && typeof row.value.common.name === 'string') {
                    this.usernames[row.value.common.name] = {id: row.id.replace(FORBIDDEN_CHARS, '_')};
                } else {
                    logger.warn(`${this.namespaceLog} Invalid username for id "${row.id}"`);
                }
            }
        } catch (e) {
            throw new Error(`Could not update user cache: ${e.message}`);
        }
    };

    const checkState = (obj, options, command) => {
        const limitToOwnerRights = options.limitToOwnerRights === true;
        if (obj && obj.acl) {
            obj.acl.state = obj.acl.state || obj.acl.object;

            if (obj.acl.state) {
                // If user is owner
                if (options.user === obj.acl.owner) {
                    if (command === 'setState' || command === 'delState') {
                        if (command === 'delState' && !options.acl.state['delete']) {
                            logger.warn(`${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`);
                            return false;
                        } else
                        if (command === 'setState' && !options.acl.state.write) {
                            logger.warn(`${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`);
                            return false;
                        } else
                        if (!(obj.acl.state & ACCESS_USER_WRITE)) {
                            logger.warn(`${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`);
                            return false;
                        }
                    } else if (command === 'getState') {
                        if (!(obj.acl.state & ACCESS_USER_READ) || !options.acl.state.read) {
                            logger.warn(`${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`);
                            return false;
                        }
                    } else {
                        logger.warn(this.namespaceLog + ' Called unknown command:' + command);
                    }
                } else if (options.groups.indexOf(obj.acl.ownerGroup) !== -1 && !limitToOwnerRights) {
                    if (command === 'setState' || command === 'delState') {
                        if (command === 'delState' && !options.acl.state['delete']) {
                            logger.warn(`${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`);
                            return false;
                        } else
                        if (command === 'setState' && !options.acl.state.write) {
                            logger.warn(`${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`);
                            return false;
                        } else
                        if (!(obj.acl.state & ACCESS_GROUP_WRITE)) {
                            logger.warn(`${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`);
                            return false;
                        }
                    } else if (command === 'getState') {
                        if (!(obj.acl.state & ACCESS_GROUP_READ) || !options.acl.state.read) {
                            logger.warn(`${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`);
                            return false;
                        }
                    } else {
                        logger.warn(this.namespaceLog + ' Called unknown command:' + command);
                    }
                } else if (!limitToOwnerRights) {
                    if (command === 'setState' || command === 'delState') {
                        if (command === 'delState' && !options.acl.state['delete']) {
                            logger.warn(`${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`);
                            return false;
                        } else
                        if (command === 'setState' && !options.acl.state.write) {
                            logger.warn(`${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`);
                            return false;
                        } else if (!(obj.acl.state & ACCESS_EVERY_WRITE)) {
                            logger.warn(`${this.namespaceLog} Permission error for user "${options.user}" on "${obj._id}": ${command}`);
                            return false;
                        }
                    } else if (command === 'getState') {
                        if (!(obj.acl.state & ACCESS_EVERY_READ) || !options.acl.state.read) {
                            logger.warn(`${this.namespaceLog} Permission error for user "${options.user}"on "${obj._id}" : ${command}`);
                            return false;
                        }
                    } else {
                        logger.warn(this.namespaceLog + ' Called unknown command:' + command);
                        return false;
                    }
                } else {
                    logger.warn(this.namespaceLog + ' Permissions limited to Owner rights');
                    return false;
                }
            } else if (limitToOwnerRights) {
                logger.warn(this.namespaceLog + ' Permissions limited to Owner rights');
                return false;
            }
        } else if (limitToOwnerRights) {
            logger.warn(this.namespaceLog + ' Permissions limited to Owner rights');
            return false;
        }

        return true;
    };

    const checkStates = (ids, options, command, callback, _helper) => {
        if (!options.groups) {
            return getUserGroups(options, () => checkStates(ids, options, command, callback));
        }

        if (Array.isArray(ids)) {
            if (!ids.length) {
                return tools.maybeCallbackWithError(callback, null, ids);
            }

            if (options._objects) {
                const ids = [];
                const objs = [];
                options._objects.forEach((obj, i) => {
                    if (obj && checkState(options._objects[i], options, command)) {
                        ids.push(obj._id);
                        objs.push(obj);
                    }
                });
                options._objects = undefined;
                return tools.maybeCallbackWithError(callback, null, ids, objs);
            } else {
                _helper = _helper || {
                    i: 0,
                    objs: options._objects || [],
                    errors: []
                };

                // this must be a serial call
                checkStates(ids[_helper.i], options, command, (err, obj) => {
                    if (err && obj) {
                        _helper.errors.push(obj._id);
                    }

                    if (obj) {
                        _helper.objs[_helper.i] = obj;
                    }

                    // if finished
                    if (_helper.i + 1 >= ids.length) {
                        if (_helper.errors.length) {
                            for (let j = ids.length - 1; j >= 0; j--) {
                                if (_helper.errors.indexOf(ids[j]) !== -1) {
                                    ids.splice(j, 1);
                                    _helper.objs.splice(j, 1);
                                }
                            }
                        }

                        return tools.maybeCallbackWithError(callback, null, ids, _helper.objs);
                    } else {
                        _helper.i++;
                        setImmediate(() => checkStates(ids, options, command, callback, _helper));
                    }
                });

            }
        } else {
            let originalChecked = undefined;

            if (options.checked !== undefined) {
                originalChecked = options.checked;
            }

            options.checked = true;

            if (!adapterObjects) {
                this.log.info('checkStates not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }
            adapterObjects.getObject(ids, options, (err, obj) => {
                if (originalChecked !== undefined) {
                    options.checked = originalChecked;
                } else {
                    options.checked = undefined;
                }
                if (err) {
                    return tools.maybeCallbackWithError(callback, err, {_id: ids});
                } else {
                    if (!checkState(obj, options, command)) {
                        return tools.maybeCallbackWithError(callback, ERROR_PERMISSION, {_id: ids});
                    }
                }
                return tools.maybeCallbackWithError(callback, null, obj);
            });
        }
    };

    // find out default history instance
    const getDefaultHistory = callback => {
        if (!this.defaultHistory) {
            // read default history instance from system.config
            return this.getForeignObject('system.config', null, (err, data) => {
                if (data && data.common) {
                    this.defaultHistory = data.common.defaultHistory;
                }
                if (data && data.native) {
                    systemSecret = data.native.secret;
                }

                // if no default history set
                if (!this.defaultHistory) {
                    // read all adapters
                    adapterObjects.getObjectView('system', 'instance', {startkey: '', endkey: '\u9999'}, (err, _obj) => {
                        if (_obj && _obj.rows) {
                            for (let i = 0; i < _obj.rows.length; i++) {
                                if (_obj.rows[i].value.common && _obj.rows[i].value.common.type === 'storage') {
                                    this.defaultHistory = _obj.rows[i].id.substring('system.adapter.'.length);
                                    break;
                                }
                            }
                        }
                        if (!this.defaultHistory) {
                            this.defaultHistory = 'history.0';
                        }
                        return tools.maybeCallback(callback);
                    });
                } else {
                    return tools.maybeCallback(callback);
                }
            });
        } else {
            return tools.maybeCallback(callback);
        }
    };

    const _setStateChangedHelper = (id, state, callback) => {
        if (!adapterObjects) {
            this.log.info('setStateChanged not processed because Objects database not connected');
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (id.startsWith(ALIAS_STARTS_WITH)) {
            adapterObjects.getObject(id, (err, obj) => {
                if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                    // id can be string or can have attribute write
                    const aliasId = typeof obj.common.alias.id.write === 'string' ? obj.common.alias.id.write : obj.common.alias.id;
                    _setStateChangedHelper(aliasId, state, callback);
                } else {
                    logger.warn(`${this.namespaceLog} ${err ? err.message : `Alias ${id} has no target 1`}`);
                    return tools.maybeCallbackWithError(callback, err ? err.message : `Alias ${id} has no target`);
                }
            });
        } else {
            this.getForeignState(id, null, async (err, oldState) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    let differ = false;
                    if (!oldState) {
                        differ = true;
                    } else
                    if (state.val !== oldState.val) {
                        differ = true;
                    } else
                    if (state.ack !== undefined && state.ack !== oldState.ack) {
                        differ = true;
                    } else
                    if (state.q !== undefined && state.q !== oldState.q) {
                        differ = true;
                    } else
                    if (state.ts !== undefined && state.ts !== oldState.ts) {
                        differ = true;
                    } else
                    // if comment changed
                    if (state.c !== undefined && state.c !== oldState.c) {
                        differ = true;
                    } else
                    if (state.expire !== undefined && state.expire !== oldState.expire) {
                        differ = true;
                    } else
                    if (state.from !== undefined && state.from !== oldState.from) {
                        differ = true;
                    } else
                    if (state.user !== undefined && state.user !== oldState.user) {
                        differ = true;
                    }

                    if (differ) {
                        if (this.performStrictObjectChecks) {
                            // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                            await this._performStrictObjectCheck(id, state);
                        }
                        this.outputCount++;
                        adapterStates.setState(id, state, (/* err */) => {
                            return tools.maybeCallbackWithError(callback, null, id, false);
                        });
                    } else {
                        return tools.maybeCallbackWithError(callback, null, id, true);
                    }
                }
            });
        }
    };

    // initStates is called from initAdapter
    const initStates = cb => {
        logger.debug(this.namespaceLog + ' objectDB connected');

        config.states.maxQueue = config.states.maxQueue || 1000;

        initializeTimeout = setTimeout(() => {
            initializeTimeout = null;
            if (config.isInstall) {
                logger && logger.warn(this.namespaceLog + ' no connection to states DB. Terminating.');
                this.terminate(EXIT_CODES.NO_ERROR);
            } else {
                logger && logger.warn(this.namespaceLog + ' slow connection to states DB. Still waiting ...');
            }
        }, config.states.connectTimeout || 2000);

        // Internal object, but some special adapters want to access it anyway.
        adapterStates = new States({
            namespace:  this.namespaceLog,
            connection: config.states,
            connected: async _statesInstance => {
                logger.debug(this.namespaceLog + ' statesDB connected');
                this.statesConnectedTime = Date.now();

                if (initializeTimeout) {
                    clearTimeout(initializeTimeout);
                    initializeTimeout = null;
                }

                if (!config.isInstall) {
                    // Subscribe for process exit signal
                    adapterStates.subscribe(`system.adapter.${this.namespace}.sigKill`);

                    // Subscribe for loglevel
                    adapterStates.subscribe(`system.adapter.${this.namespace}.logLevel`);
                }
                if (options.subscribable) {
                    // subscribe on if other instance wants to have states of this adapter
                    adapterStates.subscribe(`system.adapter.${this.namespace}.subscribes`);

                    // read actual autosubscribe requests
                    let state;
                    try {
                        state = await adapterStates.getStateAsync(`system.adapter.${this.namespace}.subscribes`);
                    } catch {
                        // ignore
                    }
                    if (!state || !state.val) {
                        this.patterns = {};
                    } else {
                        try {
                            this.patterns = JSON.parse(state.val);
                            Object.keys(this.patterns).forEach(p =>
                                this.patterns[p].regex = tools.pattern2RegEx(p));
                        } catch {
                            this.patterns = {};
                        }
                    }
                    return tools.maybeCallback(cb);
                } else {
                    return tools.maybeCallback(cb);
                }
            },
            logger: logger,
            change: (id, state) => {
                this.inputCount++;
                if (state === 'null' || state === '') {
                    state = null;
                }

                if (!id || typeof id !== 'string') {
                    console.log('Something is wrong! ' + JSON.stringify(id));
                    return;
                }

                if (id === 'system.adapter.' + this.namespace + '.sigKill' && state && state.ts > this.statesConnectedTime && state.from && state.from.startsWith('system.host.')) {
                    const sigKillVal = parseInt(state.val);
                    if (!isNaN(sigKillVal)) {
                        if (this.startedInCompactMode || sigKillVal === -1) {
                            logger.info(this.namespaceLog + ' Got terminate signal ' + (sigKillVal === -1 ? 'TERMINATE_YOURSELF' : (' TERMINATE ' + sigKillVal)));
                        } else {
                            logger.warn(this.namespaceLog + ' Got terminate signal. Checking desired PID: ' + sigKillVal + ' vs own PID ' + process.pid);
                        }
                        // by deletion of state, stop this instance
                        if ((sigKillVal !== process.pid) && !config.forceIfDisabled) {
                            stop(false, false, EXIT_CODES.ADAPTER_REQUESTED_TERMINATION, false);
                            setTimeout(() => this.terminate(EXIT_CODES.ADAPTER_REQUESTED_TERMINATION), 4000);
                        }
                    }
                }

                if (id === `system.adapter.${this.namespace}.logLevel`) {
                    if (config && config.log && state && !state.ack) {
                        let currentLevel = config.log.level;
                        if (state.val && state.val !== currentLevel && ['silly', 'debug', 'info', 'warn', 'error'].includes(state.val)) {
                            this.overwriteLogLevel = true;
                            config.log.level = state.val;
                            for (const transport in logger.transports) {
                                if (!Object.prototype.hasOwnProperty.call(logger.transports, transport)) {
                                    continue;
                                }
                                logger.transports[transport].level = state.val;
                            }
                            logger.info(`${this.namespaceLog} Loglevel changed from "${currentLevel}" to "${state.val}"`);
                            currentLevel = state.val;
                        } else if (state.val && state.val !== currentLevel) {
                            logger.info(`${this.namespaceLog} Got invalid loglevel "${state.val}", ignoring`);
                        }
                        this.outputCount++;
                        adapterStates && adapterStates.setState(`system.adapter.${this.namespace}.logLevel`, {
                            val: currentLevel,
                            ack: true,
                            from: `system.adapter.${this.namespace}`
                        });
                    }
                }

                // todo remove it as an error with log will be found
                if (id === `system.adapter.${this.namespace}.checkLogging`) {
                    checkLogging();
                }

                // someone subscribes or unsubscribes from adapter
                if (options.subscribable && id === `system.adapter.${this.namespace}.subscribes`) {
                    let subs;
                    try {
                        subs = JSON.parse(state.val || '{}');
                        Object.keys(subs).forEach(p =>
                            subs[p].regex = tools.pattern2RegEx(p));
                    } catch {
                        subs = {};
                    }

                    this.patterns = subs;
                    if (!stopInProgress) {
                        if (typeof options.subscribesChange === 'function') {
                            options.subscribesChange(subs);
                        } else {
                            this.emit('subscribesChange', subs);
                        }
                    }
                }

                // If someone want to have log messages
                if (this.logList && id.match(/\.logging$/)) {
                    const instance = id.substring(0, id.length - '.logging'.length);
                    logger && logger.debug(this.namespaceLog + ' ' + instance + ': logging ' + (state ? state.val : false));
                    this.logRedirect(state ? state.val : false, instance);
                } else
                if (id === `log.system.adapter.${this.namespace}`) {
                    options.logTransporter && this.processLog && this.processLog(state);
                } else
                // If this is messagebox
                if (id === `messagebox.system.adapter.${this.namespace}` && state) {
                    const obj = state;
                    if (obj) {
                        // If callback stored for this request
                        if (obj.callback     &&
                            obj.callback.ack &&
                            obj.callback.id  &&
                            this.callbacks   &&
                            this.callbacks['_' + obj.callback.id]) {
                            // Call callback function
                            if (this.callbacks['_' + obj.callback.id].cb) {
                                this.callbacks['_' + obj.callback.id].cb(obj.message);
                                delete this.callbacks['_' + obj.callback.id];
                            }
                            // delete too old callbacks IDs, like garbage collector
                            const now = Date.now();
                            for (const _id in this.callbacks) {
                                if (now - this.callbacks[_id].time > 3600000) {
                                    delete this.callbacks[_id];
                                }
                            }

                        } else if (!stopInProgress) {
                            if (options.message) {
                                // Else inform about new message the adapter
                                options.message(obj);
                            }
                            this.emit('message', obj);
                        }
                    }
                } else
                if (id.startsWith('system.adapter.' + this.namespace + '.plugins.') && id.endsWith('.enabled')) {
                    if (!state || state.ack) {
                        return;
                    }
                    const pluginStatesIndex = ('system.adapter.' + this.namespace + '.plugins.').length;
                    let nameEndIndex = id.indexOf('.', pluginStatesIndex + 1);
                    if (nameEndIndex === -1) {
                        nameEndIndex = undefined;
                    }
                    const pluginName = id.substring(pluginStatesIndex, nameEndIndex);
                    if (!this.pluginHandler.pluginExists(pluginName)) {
                        return;
                    }
                    if (this.pluginHandler.isPluginActive(pluginName) !== state.val) {
                        if (state.val) {
                            if (!this.pluginHandler.isPluginInstanciated(pluginName)) {
                                this.pluginHandler.instanciatePlugin(pluginName, this.pluginHandler.getPluginConfig(pluginName), __dirname);
                                this.pluginHandler.setDatabaseForPlugin(pluginName, adapterObjects, adapterStates);
                                this.pluginHandler.initPlugin(pluginName, this.adapterConfig);
                            }
                        } else {
                            if (!this.pluginHandler.destroy(pluginName)) {
                                logger.info(this.namespaceLog + ' Plugin ' + pluginName + ' could not be disabled. Please restart adapter to disable it.');
                            }
                        }
                    }
                } else
                // If adapter is ready and for this ID exist some alias links
                if (this.adapterReady && this.aliases[id]) {
                    this.aliases[id].targets.forEach(target => {
                        const aState = state ? tools.formatAliasValue(this.aliases[id].source, target, JSON.parse(JSON.stringify(state)), logger, this.namespaceLog) : null;
                        const targetId = target.id.read === 'string' ? target.id.read : target.id;

                        if (!stopInProgress && (aState || !state)) {
                            if (typeof options.stateChange === 'function') {
                                options.stateChange(targetId, aState);
                            } else {
                                // emit 'stateChange' event instantly
                                setImmediate(() =>
                                    this.emit('stateChange', targetId, aState));
                            }
                        }
                    });
                }
            },
            changeUser: (id, state) => {
                this.inputCount++;
                if (state === 'null' || state === '') {
                    state = null;
                }

                if (!id || typeof id !== 'string') {
                    console.log('Something is wrong! ' + JSON.stringify(id));
                    return;
                }

                if (this.adapterReady) {
                    if (this.oStates) {
                        if (!state) {
                            delete this.oStates[id];
                        } else {
                            this.oStates[id] = state;
                        }
                    }

                    if (!stopInProgress) {
                        if (typeof options.stateChange === 'function') {
                            setImmediate(() =>
                                options.stateChange(id, state));
                        } else {
                            // emit 'stateChange' event instantly
                            setImmediate(() =>
                                this.emit('stateChange', id, state));
                        }
                    }
                }
            },
            disconnected: () => {
                this.connected = false;
                !this.terminated && setTimeout(() => {
                    if (this.connected) {
                        return;
                    } // If reconnected in the meantime, do not terminate
                    logger && logger.warn(this.namespaceLog + ' Cannot connect/reconnect to states DB. Terminating');
                    this.terminate(EXIT_CODES.NO_ERROR);
                }, 5000);
            }
        });

        /**
         * Send message to other adapter instance or all instances of adapter.
         *
         * This function sends a message to specific instance or all instances of some specific adapter.
         * If no instance given (e.g. "pushover"), the callback argument will be ignored. Because normally many responses will come.
         *
         * @alias sendTo
         * @memberof Adapter
         * @param {string} instanceName name of the instance where the message must be send to. E.g. "pushover.0" or "system.adapter.pushover.0".
         * @param {string} command command name, like "send", "browse", "list". Command is depend on target adapter implementation.
         * @param {object} message object that will be given as argument for request
         * @param {function(any):any} [callback] optional return result
         *        <pre><code>
         *            function (result) {
         *              // result is target adapter specific and can vary from adapter to adapter
         *              if (!result) adapter.log.error('No response received');
         *            }
         *        </code></pre>
         */
        this.sendTo = async (instanceName, command, message, callback) => {
            if ((typeof message === 'function') && (typeof callback === 'undefined')) {
                callback = message;
                message = undefined;
            }
            if (typeof message === 'undefined') {
                message = command;
                command = 'send';
            }
            const obj = {command: command, message: message, from: 'system.adapter.' + this.namespace};

            if (typeof instanceName !== 'string' || !instanceName) {
                typeof callback === 'function' && setImmediate(() => callback('No instanceName provided or not a string'));
                return;
            }

            if (!instanceName.match(/^system\.adapter\./)) {
                instanceName = 'system.adapter.' + instanceName;
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('sendTo not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (typeof message !== 'object') {
                logger.debug(this.namespaceLog + ' sendTo "' + command + '" to ' + instanceName + ' from system.adapter.' + this.namespace + ': ' + message);
            } else {
                logger.debug(this.namespaceLog + ' sendTo "' + command + '" to ' + instanceName + ' from system.adapter.' + this.namespace);
            }

            // If not specific instance
            if (!instanceName.match(/\.[0-9]+$/)) {
                if (!adapterObjects) {
                    this.log.info('sendTo not processed because Objects database not connected');
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                // Send to all instances of adapter
                adapterObjects.getObjectView('system', 'instance', {
                    startkey: instanceName + '.',
                    endkey: instanceName + '.\u9999'
                }, async (err, _obj) => {
                    if (_obj && _obj.rows) {
                        for (let i = 0; i < _obj.rows.length; i++) {
                            try {
                                await adapterStates.pushMessage(_obj.rows[i].id, obj);
                            } catch (e) {
                                return tools.maybeCallbackWithError(callback, e);
                            }
                        }
                    }
                });
            } else {
                if (callback) {
                    if (typeof callback === 'function') {
                        // force subscribe even no messagebox enabled
                        if (!this.common.messagebox && !this.mboxSubscribed) {
                            this.mboxSubscribed = true;
                            adapterStates.subscribeMessage('system.adapter.' + this.namespace);
                        }

                        obj.callback = {
                            message: message,
                            id: callbackId++,
                            ack: false,
                            time: Date.now()
                        };
                        if (callbackId >= 0xFFFFFFFF) {
                            callbackId = 1;
                        }
                        if (!this.callbacks) {
                            this.callbacks = {};
                        }
                        this.callbacks['_' + obj.callback.id] = {cb: callback};

                        // delete too old callbacks IDs
                        const now = Date.now();
                        for (const _id in this.callbacks) {
                            if (now - this.callbacks[_id].time > 3600000) {
                                delete this.callbacks[_id];
                            }
                        }
                    } else {
                        obj.callback = callback;
                        obj.callback.ack = true;
                    }
                }

                try {
                    await adapterStates.pushMessage(instanceName, obj);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }
            }
        };
        /**
         * Promise-version of Adapter.sendTo
         */
        this.sendToAsync = tools.promisifyNoError(this.sendTo, this);

        /**
         * Send message to specific host or to all hosts.
         *
         * This function sends a message to specific host or all hosts.
         * If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.
         *
         * @alias sendToHost
         * @memberof Adapter
         * @param {any} hostName name of the host where the message must be send to. E.g. "myPC" or "system.host.myPC". If argument is empty, the message will be sent to all hosts.
         * @param {string} command command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage)
         * @param {object} message object that will be given as argument for request
         * @param {function(any):any} [callback] optional return result
         *        <pre><code>
         *            function (result) {
         *              // result is target adapter specific and can vary from command to command
         *              if (!result) adapter.log.error('No response received');
         *            }
         *        </code></pre>
         */
        this.sendToHost = async (hostName, command, message, callback) => {
            if (typeof message === 'undefined') {
                message = command;
                command = 'send';
            }
            const obj = {command, message, from: 'system.adapter.' + this.namespace};

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('sendToHost not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (hostName && typeof hostName !== 'string') {
                hostName = hostName.toString();
            }

            if (hostName && !hostName.startsWith('system.host.')) {
                hostName = 'system.host.' + hostName;
            }

            if (!hostName) {
                if (!adapterObjects) {
                    this.log.info('sendToHost not processed because Objects database not connected');
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                // Send to all hosts
                adapterObjects.getObjectList({startkey: 'system.host.', endkey: `system.host.\u9999`}, null, async (err, res) => {
                    if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                        return;
                    }
                    if (!err && res.rows.length) {
                        for (let i = 0; i < res.rows.length; i++) {
                            const parts = res.rows[i].id.split('.');
                            // ignore system.host.name.alive and so on
                            if (parts.length === 3) {
                                try {
                                    await adapterStates.pushMessage(res.rows[i].id, obj);
                                } catch (e) {
                                    return tools.maybeCallbackWithError(callback, e);
                                }
                            }
                        }
                    }
                });
            } else {
                if (callback) {
                    if (typeof callback === 'function') {
                        // force subscribe even no messagebox enabled
                        if (!this.common.messagebox && !this.mboxSubscribed) {
                            this.mboxSubscribed = true;
                            adapterStates.subscribeMessage(`system.adapter.${this.namespace}`);
                        }

                        obj.callback = {
                            message,
                            id:      callbackId++,
                            ack:     false,
                            time:    Date.now()
                        };
                        if (callbackId >= 0xFFFFFFFF) {
                            callbackId = 1;
                        }
                        this.callbacks = this.callbacks || {};
                        this.callbacks['_' + obj.callback.id] = {cb: callback};
                    } else {
                        obj.callback     = callback;
                        obj.callback.ack = true;
                    }
                }

                try {
                    await adapterStates.pushMessage(hostName, obj);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }
            }
        };
        /**
         * Promise-version of Adapter.sendToHost
         */
        this.sendToHostAsync = tools.promisifyNoError(this.sendToHost, this);

        /**
         * Send notification with given scope and category to host of this adapter
         *
         * @param {string} scope - scope to be addressed
         * @param {string|null} category - to be addressed, if null message will be checked by regex of given scope
         * @param {string} message - message to be stored/checked
         * @return Promise<void>
         */
        this.registerNotification = async (scope, category, message) => {
            const obj = {
                command: 'addNotification', message: {scope, category, message, instance: this.namespace},
                from: `system.adapter.${this.namespace}`
            };

            await adapterStates.pushMessage(this.host, obj);
        };

        /**
         * Validates the object-type argument that is passed to setState
         * @param {Record<string, any>} obj
         */
        function validateSetStateObjectArgument(obj) {
            // Check that we have at least one existing non-undefined property at all, else invalid
            if (!Object.keys(obj).some(key => obj[key] !== undefined)) {
                throw new Error(`The state contains no properties! At least one property is expected!`);
            }

            /*
                The following object parameters and types are allowed:
                val:    any,     (optional)
                ack:    boolean, (optional)
                ts:     number,  (optional)
                q:      number,  (optional)
                from:   string,  (optional)
                c:      string,  (optional)
                expire: number   (optional)
                lc:     number   (optional)
                user:   string   (optional)

                Everything else is forbidden
            */
            const optionalProperties = {
                val:    'any',
                ack:    'boolean',
                ts:     'number',
                q:      'number',
                from:   'string',
                c:      'string',
                expire: 'number',
                lc:     'number',
                user:   'string'
            };
            // Are there any forbidden properties?
            const forbiddenProperties = Object.keys(obj).filter(k => !optionalProperties[k]);
            if (forbiddenProperties.length) {
                throw new Error(`The state contains the forbidden properties ${forbiddenProperties.join(', ')}!`);
            }
            // Do all properties have the correct type?
            for (const [key, type] of Object.entries(optionalProperties)) {
                // any permits all types
                if (type === 'any') {
                    continue;
                }
                // don't flag optional properties when they don't exist or are undefined
                if (!(key in obj) || obj[key] === undefined) {
                    continue;
                }
                if (type !== typeof obj[key]) {
                    throw new Error(`The state property "${key}" has the wrong type "${typeof obj[key]}" (should be "${type}")!`);
                }
            }
        }

        /**
         * Writes value into states DB.
         *
         * This function can write values into states DB for this adapter.
         * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
         * ack, options and callback are optional
         *
         * @alias setState
         * @memberof Adapter
         * @param {string} id object ID of the state.
         * @param {object|string|number|boolean} state simple value or object with attribues.
         *  If state is object and ack exists too as function argument, function argument has priority.
         *  <pre><code>
         *      {
         *          val:    value,
         *          ack:    true|false,       // default - false; is command(false) or status(true)
         *          ts:     timestampMS,      // default - now
         *          q:      qualityAsNumber,  // default - 0 (ok)
         *          from:   origin,           // default - this adapter
         *          c:      comment,          // default - empty
         *          expire: expireInSeconds   // default - 0
         *          lc:     timestampMS       // default - automatic calculation
         *      }
         *  </code></pre>
         * @param {boolean} [ack] optional is command(false) or status(true)
         * @param {object} [options] optional user context
         * @param {ioBroker.SetStateCallback} [callback] optional return error and id
         *        <pre><code>
         *            function (err, id) {
         *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
         *            }
         *        </code></pre>
         */
        this.setState = async (id, state, ack, options, callback) => {
            if (typeof state === 'object' && typeof ack !== 'boolean') {
                callback = options;
                options  = ack;
                ack      = undefined;
            }
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            if (typeof ack === 'function') {
                callback = ack;
                ack = undefined;
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to set
                this.log.info('setState not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }
            if (!adapterObjects) {
                this.log.info('setState not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, false, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            id = this._fixId(id, false);

            if (tools.isObject(state)) {
                // Verify that the passed state object is valid
                try {
                    validateSetStateObjectArgument(state);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }
            } else {
                // wrap non-object values in a state object
                state = state !== undefined ? {val: state} : {};
            }

            if (state.val === undefined && !Object.keys(state).length) {
                // undefined is not allowed as state.val -> return
                this.log.info(`undefined is not a valid state value for id "${id}"`);
                // TODO: reactivate line below + test in in next controller version (02.05.2021)
                // return tools.maybeCallbackWithError(callback, 'undefined is not a valid state value');
            }

            if (ack !== undefined) {
                state.ack = ack;
            }

            // if state.from provided, we use it else, we set default property
            state.from = typeof state.from === 'string' && state.from !== '' ? state.from : `system.adapter.${this.namespace}`;
            state.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;

            if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
                checkStates(id, options, 'setState', async (err, obj) => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else {
                        if (!adapterObjects) { // if objects is no longer existing, we do not need to unsubscribe
                            this.log.info('setForeignState not processed because Objects database not connected');
                            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                        }

                        if (this.performStrictObjectChecks) {
                            // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                            await this._performStrictObjectCheck(id, state);
                        }

                        if (id.startsWith(ALIAS_STARTS_WITH)) {
                            // write alias
                            if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                                // id can be string or can have attribute write
                                const aliasId = typeof obj.common.alias.id.write === 'string' ? obj.common.alias.id.write : obj.common.alias.id;

                                // validate here because we use objects/states db directly
                                try {
                                    validateId(aliasId, true, null);
                                } catch (e) {
                                    logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                                    return tools.maybeCallbackWithError(callback, `Error validating alias id of ${id}: ${e.message}`);
                                }

                                // check the rights
                                checkStates(aliasId, options, 'setState', (err, targetObj) => {
                                    if (err) {
                                        return tools.maybeCallbackWithError(callback, err);
                                    } else {
                                        if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                                            this.log.info('setForeignState not processed because States database not connected');
                                            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                                        }

                                        // write target state
                                        this.outputCount++;
                                        adapterStates.setState(aliasId, tools.formatAliasValue(obj && obj.common, targetObj && targetObj.common, state, logger, this.namespaceLog), callback);
                                    }
                                });
                            } else {
                                logger.warn(`${this.namespaceLog} ${`Alias ${id} has no target 2`}`);
                                return tools.maybeCallbackWithError(callback, `Alias ${id} has no target`);
                            }
                        } else {
                            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                                this.log.info('setForeignState not processed because States database not connected');
                                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                            }

                            this.outputCount++;
                            adapterStates.setState(id, state, callback);
                        }
                    }
                });
            } else {
                if (id.startsWith(ALIAS_STARTS_WITH)) {
                    // write alias
                    // read alias id
                    adapterObjects.getObject(id, options, (err, obj) => {
                        if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                            const aliasId = typeof obj.common.alias.id.write === 'string' ? obj.common.alias.id.write : obj.common.alias.id;

                            // validate here because we use objects/states db directly
                            try {
                                validateId(aliasId, true, null);
                            } catch (e) {
                                logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                                return tools.maybeCallbackWithError(callback, `Error validating alias id of ${id}: ${e.message}`);
                            }

                            // read object for formatting
                            adapterObjects.getObject(aliasId, options, (err, targetObj) => {
                                // write target state
                                this.outputCount++;
                                adapterStates.setState(aliasId, tools.formatAliasValue(obj && obj.common, targetObj && targetObj.common, state, logger, this.namespaceLog), callback);
                            });
                        } else {
                            logger.warn(`${this.namespaceLog} ${err ? err.message : `Alias ${id} has no target 3`}`);
                            return tools.maybeCallbackWithError(callback, err ? err.message : `Alias ${id} has no target`);
                        }
                    });
                } else {
                    if (this.performStrictObjectChecks) {
                        // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                        await this._performStrictObjectCheck(id, state);
                    }

                    if (!adapterStates) { // if states is no longer existing, we do not need to set
                        this.log.info('setState not processed because States database not connected');
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    this.outputCount++;
                    adapterStates.setState(id, state, callback);
                }
            }
        };
        /**
         * Promise-version of Adapter.setState
         */
        this.setStateAsync = tools.promisify(this.setState, this);

        /**
         * Writes value into states DB only if the value really changed.
         *
         * This function can write values into states DB for this adapter.
         * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
         * ack, options and callback are optional
         *
         * @alias setStateChanged
         * @memberof Adapter
         * @param {string} id object ID of the state.
         * @param {object|string|number|boolean} state simple value or object with attribues.
         * @param {boolean} [ack] optional is command(false) or status(true)
         * @param {object} [options] optional user context
         * @param {ioBroker.SetStateChangedCallback} [callback] optional return error, id and notChanged
         *        <pre><code>
         *            function (err, id, notChanged) {
         *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
         *              if (!notChanged) adapter.log.debug('Value was changed');
         *            }
         *        </code></pre>
         */
        this.setStateChanged = (id, state, ack, options, callback) => {
            if (typeof state === 'object' && typeof ack !== 'boolean') {
                callback = options;
                options  = ack;
                ack      = undefined;
            }
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            if (typeof ack === 'function') {
                callback = ack;
                ack = undefined;
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('setStateCHanged not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, false, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            id = this._fixId(id, false/*, 'state'*/);

            if (tools.isObject(state)) {
                // Verify that the passed state object is valid
                try {
                    validateSetStateObjectArgument(state);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }
            } else {
                // wrap non-object values in a state object
                state = state !== undefined ? {val: state} : {};
            }

            if (state.val === undefined && !Object.keys(state).length) {
                // undefined is not allowed as state.val -> return
                this.log.info(`undefined is not a valid state value for id "${id}"`);
                // TODO: reactivate line below + test in in next controller version (02.05.2021)
                // return tools.maybeCallbackWithError(callback, 'undefined is not a valid state value');
            }

            if (ack !== undefined) {
                state.ack = ack;
            }

            // if state.from provided, we use it else, we set default property
            state.from = typeof state.from === 'string' && state.from !== '' ? state.from : `system.adapter.${this.namespace}`;
            if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
                checkStates(id, options, 'setState', err => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else {
                        _setStateChangedHelper(id, state, callback);
                    }
                });
            } else {
                _setStateChangedHelper(id, state, callback);
            }
        };
        /**
         * Promise-version of Adapter.setStateChanged
         */
        this.setStateChangedAsync = tools.promisify(this.setStateChanged, this, ['id', 'notChanged']);

        /**
         * Writes value into states DB for any instance.
         *
         * This function can write values into states DB for all instances and system states too.
         * ack, options and callback are optional
         *
         * @alias setForeignState
         * @memberof Adapter
         * @param {string} id object ID of the state.
         * @param {object|string|number|boolean} state simple value or object with attribues.
         *  If state is object, so the ack will be ignored and must be included into object.
         *  <pre><code>
         *      {
         *          val:    value,
         *          ack:    true|false,       // default - false; is command(false) or status(true)
         *          ts:     timestampMS,      // default - now
         *          q:      qualityAsNumber,  // default - 0 (ok)
         *          from:   origin,           // default - this adapter
         *          c:      comment,          // default - empty
         *          expire: expireInSeconds   // default - 0
         *          lc:     timestampMS       // default - automatic calculation
         *      }
         *  </code></pre>
         * @param {boolean} [ack] optional is command(false) or status(true)
         * @param {object} [options] optional user context
         * @param {ioBroker.SetStateCallback} [callback] optional return error and id
         *        <pre><code>
         *            function (err, id) {
         *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
         *            }
         *        </code></pre>
         */
        this.setForeignState = async (id, state, ack, options, callback) => {
            if (typeof state === 'object' && typeof ack !== 'boolean') {
                callback = options;
                options = ack;
                ack = undefined;
            }

            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            if (typeof ack === 'function') {
                callback = ack;
                ack = undefined;
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('setForeignState not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, true, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            if (tools.isObject(state)) {
                // Verify that the passed state object is valid
                try {
                    validateSetStateObjectArgument(state);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }
            } else {
                // wrap non-object values in a state object
                state = state !== undefined ? {val: state} : {};
            }

            if (state.val === undefined && !Object.keys(state).length) {
                // undefined is not allowed as state.val -> return
                this.log.info(`undefined is not a valid state value for id "${id}"`);
                // TODO: reactivate line below + test in in next controller version (02.05.2021)
                // return tools.maybeCallbackWithError(callback, 'undefined is not a valid state value');
            }

            if (ack !== undefined) {
                state.ack = ack;
            }

            // if state.from provided, we use it else, we set default property
            state.from = typeof state.from === 'string' && state.from !== '' ? state.from : `system.adapter.${this.namespace}`;
            state.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;

            if (!id || typeof id !== 'string') {
                const warn = id ? `ID can be only string and not "${typeof id}"` : `Empty ID: ${JSON.stringify(state)}`;
                logger.warn(`${this.namespaceLog} ${warn}`);
                return tools.maybeCallbackWithError(callback, warn);
            }

            const mId = id.replace(FORBIDDEN_CHARS, '_');
            if (mId !== id) {
                logger.warn(`${this.namespaceLog} Used invalid characters: ${id} changed to ${mId}`);
                id = mId;
            }

            if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
                checkStates(id, options, 'setState', async (err, obj) => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else {
                        if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                            this.log.info('setForeignState not processed because States database not connected');
                            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                        }

                        if (this.performStrictObjectChecks) {
                            // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                            await this._performStrictObjectCheck(id, state);
                        }

                        if (id.startsWith(ALIAS_STARTS_WITH)) {
                            // write alias
                            if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                                // id can be string or can have attribute write
                                const aliasId = typeof obj.common.alias.id.write === 'string' ? obj.common.alias.id.write : obj.common.alias.id;

                                // validate here because we use objects/states db directly
                                try {
                                    validateId(aliasId, true, null);
                                } catch (e) {
                                    logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                                    return tools.maybeCallbackWithError(callback, `Error validating alias id of ${id}: ${e.message}`);
                                }

                                // check the rights
                                checkStates(aliasId, options, 'setState', (err, targetObj) => {
                                    if (err) {
                                        return tools.maybeCallbackWithError(callback, err);
                                    } else {
                                        if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                                            this.log.info('setForeignState not processed because States database not connected');
                                            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                                        }

                                        this.outputCount++;
                                        adapterStates.setState(aliasId, tools.formatAliasValue(obj && obj.common, targetObj && targetObj.common, state, logger, this.namespaceLog), callback);
                                    }
                                });
                            } else {
                                logger.warn(`${this.namespaceLog} Alias ${id} has no target 4`);
                                return tools.maybeCallbackWithError(callback, `Alias ${id} has no target`);
                            }
                        } else {
                            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                                this.log.info('setForeignState not processed because States database not connected');
                                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                            }

                            this.outputCount++;
                            adapterStates.setState(id, state, callback);
                        }
                    }
                });
            } else {
                // write alias
                if (id.startsWith(ALIAS_STARTS_WITH)) {
                    if (!adapterObjects) {
                        this.log.info('setForeignState not processed because Objects database not connected');
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    // read alias id
                    adapterObjects.getObject(id, options, (err, obj) => {
                        if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                            // alias id can be a string or can have id.write
                            const aliasId = typeof obj.common.alias.id.write === 'string' ? obj.common.alias.id.write : obj.common.alias.id;

                            // validate here because we use objects/states db directly
                            try {
                                validateId(aliasId, true, null);
                            } catch (e) {
                                logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                                return tools.maybeCallbackWithError(callback, `Error validating alias id of ${id}: ${e.message}`);
                            }

                            if (!adapterObjects) { // if objects is no longer existing, we do not need to unsubscribe
                                this.log.info('setForeignState not processed because Objects database not connected');
                                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                            }

                            // read object for formatting
                            adapterObjects.getObject(aliasId, options, (err, targetObj) => {
                                if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                                    this.log.info('setForeignState not processed because States database not connected');
                                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                                }

                                this.outputCount++;
                                adapterStates.setState(aliasId, tools.formatAliasValue(obj && obj.common, targetObj && targetObj.common, state, logger, this.namespaceLog), callback);
                            });
                        } else {
                            logger.warn(`${this.namespaceLog} ${err ? err.message : `Alias ${id} has no target 5`}`);
                            return tools.maybeCallbackWithError(callback, err ? err.message : `Alias ${id} has no target`);
                        }
                    });
                } else {
                    if (this.performStrictObjectChecks) {
                        if (!adapterObjects) { // if objects is no longer existing, we do not need to unsubscribe
                            this.log.info('setForeignState not processed because Objects database not connected');
                            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                        }

                        // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                        await this._performStrictObjectCheck(id, state);
                    }
                    if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                        this.log.info('setForeignState not processed because States database not connected');
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    this.outputCount++;
                    adapterStates.setState(id, state, callback);
                }
            }
        };
        /**
         * Promise-version of Adapter.setForeignState
         */
        this.setForeignStateAsync = tools.promisify(this.setForeignState, this);

        /**
         * Writes value into states DB for any instance, but only if state changed.
         *
         * This function can write values into states DB for all instances and system states too.
         * ack, options and callback are optional
         *
         * @alias setForeignStateChanged
         * @memberof Adapter
         * @param {string} id object ID of the state.
         * @param {object|string|number|boolean} state simple value or object with attribues.
         *  If state is object and ack exists too as function argument, function argument has priority.
         *  <pre><code>
         *      {
         *          val:    value,
         *          ack:    true|false,       // default - false; is command(false) or status(true)
         *          ts:     timestampMS,      // default - now
         *          q:      qualityAsNumber,  // default - 0 (ok)
         *          from:   origin,           // default - this adapter
         *          c:      comment,          // default - empty
         *          expire: expireInSeconds   // default - 0
         *          lc:     timestampMS       // default - automatic calculation
         *      }
         *  </code></pre>
         * @param {boolean} [ack] optional is command(false) or status(true)
         * @param {object} [options] optional user context
         * @param {ioBroker.SetStateChangedCallback} [callback] optional return error and id
         *        <pre><code>
         *            function (err, id) {
         *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
         *            }
         *        </code></pre>
         */
        this.setForeignStateChanged = (id, state, ack, options, callback) => {
            if (typeof state === 'object' && typeof ack !== 'boolean') {
                callback = options;
                options  = ack;
                ack = undefined;
            }

            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            if (typeof ack === 'function') {
                callback = ack;
                ack = undefined;
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('setForeignStateChanged not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, true, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            if (tools.isObject(state)) {
                // Verify that the passed state object is valid
                try {
                    validateSetStateObjectArgument(state);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }
            } else {
                // wrap non-object values in a state object
                state = state !== undefined ? {val: state} : {};
            }

            if (state.val === undefined && !Object.keys(state).length) {
                // undefined is not allowed as state.val -> return
                this.log.info(`undefined is not a valid state value for id "${id}"`);
                // TODO: reactivate line below + test in in next controller version (02.05.2021)
                // return tools.maybeCallbackWithError(callback, 'undefined is not a valid state value');
            }

            if (ack !== undefined) {
                state.ack = ack;
            }

            // if state.from provided, we use it else, we set default property
            state.from = typeof state.from === 'string' && state.from !== '' ? state.from : `system.adapter.${this.namespace}`;
            state.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;

            const mId = id.replace(FORBIDDEN_CHARS, '_');
            if (mId !== id) {
                logger.warn(`${this.namespaceLog} Used invalid characters: ${id} changed to ${mId}`);
                id = mId;
            }

            if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
                checkStates(id, options, 'setState', err => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else {
                        _setStateChangedHelper(id, state, callback);
                    }
                });
            } else {
                _setStateChangedHelper(id, state, callback);
            }
        };
        /**
         * Promise-version of Adapter.setForeignStateChanged
         */
        this.setForeignStateChangedAsync = tools.promisify(this.setForeignStateChanged, this);

        /**
         * Read value from states DB.
         *
         * This function can read values from states DB for this adapter.
         * Only Ids that belong to this adapter can be read. So the function automatically adds "adapter.X." to ID.
         *
         * @alias getState
         * @memberof Adapter
         * @param {string} id object ID of the state.
         * @param {object} options optional user context
         * @param {ioBroker.GetStateCallback} callback return result
         *        <pre><code>
         *            function (err, state) {
         *              if (err) adapter.log.error('Cannot read value: ' + err);
         *            }
         *        </code></pre>
         *
         *        See possible attributes of the state in @setState explanation
         */
        this.getState = (id, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('getState not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (!adapterObjects) {
                this.log.info('getState not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, false, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            id = this._fixId(id, false);

            if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
                checkStates(id, options, 'getState', err => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else {
                        if (id.startsWith(ALIAS_STARTS_WITH)) {
                            adapterObjects.getObject(id, options, (err, obj) => {
                                if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                                    // alias id can be string or can have attribute id.read
                                    const aliasId = typeof obj.common.alias.id.read === 'string' ? obj.common.alias.id.read : obj.common.alias.id;

                                    // validate here because we use objects/states db directly
                                    try {
                                        validateId(aliasId, true, null);
                                    } catch (e) {
                                        logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                                        return tools.maybeCallbackWithError(callback, `Error validating alias id of ${id}: ${e.message}`);
                                    }

                                    if (this.oStates && this.oStates[aliasId]) {
                                        adapterObjects.getObject(aliasId, (err, sourceObj) => {
                                            const state = deepClone(this.oStates[aliasId]);
                                            return tools.maybeCallbackWithError(callback, err, tools.formatAliasValue(sourceObj && sourceObj.common, obj.common, state, logger, this.namespaceLog));
                                        });
                                    } else {
                                        adapterObjects.getObject(aliasId, (err, sourceObj) => {
                                            adapterStates.getState(aliasId, (err, state) => {
                                                return tools.maybeCallbackWithError(callback, err, tools.formatAliasValue(sourceObj && sourceObj.common, obj.common, state, logger, this.namespaceLog));
                                            });
                                        });
                                    }
                                } else {
                                    logger.warn(`${this.namespaceLog} ${err ? err.message : `Alias ${id} has no target 6`}`);
                                    return tools.maybeCallbackWithError(callback, err ? err.message : `Alias ${id} has no target`);
                                }
                            });
                        } else {
                            if (this.oStates && this.oStates[id]) {
                                return tools.maybeCallbackWithError(callback, null, this.oStates[id]);
                            } else {
                                adapterStates.getState(id, callback);
                            }
                        }
                    }
                });
            } else {
                if (id.startsWith(ALIAS_STARTS_WITH)) {
                    adapterObjects.getObject(id, options, (err, obj) => {
                        if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                            // alias id can be string or can have attribute id.read
                            const aliasId = typeof obj.common.alias.id.read === 'string' ? obj.common.alias.id.read : obj.common.alias.id;

                            // validate here because we use objects/states db directly
                            try {
                                validateId(aliasId, true, null);
                            } catch (e) {
                                logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                                return tools.maybeCallbackWithError(callback, `Error validating alias id of ${id}: ${e.message}`);
                            }

                            adapterObjects.getObject(aliasId, options, (err, sourceObj) => {
                                if (this.oStates && this.oStates[aliasId]) {
                                    const state = deepClone(this.oStates[aliasId]);
                                    return tools.maybeCallbackWithError(callback, err, tools.formatAliasValue(sourceObj && sourceObj.common, obj.common, state, logger, this.namespaceLog));
                                } else {
                                    adapterStates.getState(aliasId, (err, state) => {
                                        return tools.maybeCallbackWithError(callback, err, tools.formatAliasValue(sourceObj && sourceObj.common, obj.common, state, logger, this.namespaceLog));
                                    });
                                }
                            });
                        } else {
                            logger.warn(`${this.namespaceLog} ${err ? err.message : `Alias ${id} has no target 7`}`);
                            return tools.maybeCallbackWithError(callback, err ? err.message : `Alias ${id} has no target`);
                        }
                    });
                } else {
                    if (this.oStates && this.oStates[id]) {
                        return tools.maybeCallbackWithError(callback, null, this.oStates[id]);
                    } else {
                        adapterStates.getState(id, callback);
                    }
                }
            }
        };
        /**
         * Promise-version of Adapter.getState
         */
        this.getStateAsync = tools.promisify(this.getState, this);

        /**
         * Read value from states DB for any instance and system state.
         *
         * This function can read values from states DB for all instances and adapters. It expects the full path of object ID.
         *
         * @alias getForeignState
         * @memberof Adapter
         * @param {string} id object ID of the state.
         * @param {object} options optional user context
         * @param {ioBroker.GetStateCallback} callback return result
         *        <pre><code>
         *            function (err, state) {
         *              if (err) adapter.log.error('Cannot read value: ' + err);
         *            }
         *        </code></pre>
         *
         *        See possible attributes of the state in @setState explanation
         */
        this.getForeignState = (id, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('getForeignState not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (!adapterObjects) {
                this.log.info('getForeignState not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, true, options);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
                checkStates(id, options, 'getState', (err, obj) => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else {
                        if (id.startsWith(ALIAS_STARTS_WITH)) {
                            if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                                // id can be string or can have attribute id.read
                                const aliasId = typeof obj.common.alias.id.read === 'string' ? obj.common.alias.id.read : obj.common.alias.id;

                                // validate here because we use objects/states db directly
                                try {
                                    validateId(aliasId, true, null);
                                } catch (e) {
                                    logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                                    return tools.maybeCallbackWithError(callback, `Error validating alias id of ${id}: ${e.message}`);
                                }

                                if (aliasId) {
                                    if (this.oStates && this.oStates[aliasId]) {
                                        checkStates(aliasId, options, 'getState', (err, sourceObj) => {
                                            if (err) {
                                                return tools.maybeCallbackWithError(callback, err);
                                            } else {
                                                const state = deepClone(this.oStates[aliasId]);
                                                return tools.maybeCallbackWithError(callback, err, tools.formatAliasValue(sourceObj && sourceObj.common, obj.common, state, logger, this.namespaceLog));
                                            }
                                        });
                                    } else {
                                        checkStates(aliasId, options, 'getState', (err, sourceObj) => {
                                            if (err) {
                                                return tools.maybeCallbackWithError(callback, err);
                                            } else {
                                                this.inputCount++;
                                                adapterStates.getState(aliasId, (err, state) =>
                                                    tools.maybeCallbackWithError(callback, err, tools.formatAliasValue(sourceObj && sourceObj.common, obj.common, state, logger, this.namespaceLog)));
                                            }
                                        });
                                    }
                                }
                            } else {
                                logger.warn(`${this.namespaceLog} Alias ${id} has no target 8`);
                                return tools.maybeCallbackWithError(callback, `Alias ${id} has no target`);
                            }
                        } else {
                            if (this.oStates && this.oStates[id]) {
                                return tools.maybeCallbackWithError(callback, null, this.oStates[id]);
                            } else {
                                adapterStates.getState(id, callback);
                            }
                        }
                    }
                });
            } else {
                if (id.startsWith(ALIAS_STARTS_WITH)) {
                    adapterObjects.getObject(id, (err, obj) => {
                        if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                            // id can be string or can have attribute id.read
                            const aliasId = typeof obj.common.alias.id.read === 'string' ? obj.common.alias.id.read : obj.common.alias.id;

                            // validate here because we use objects/states db directly
                            try {
                                validateId(aliasId, true, null);
                            } catch (e) {
                                logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                                return tools.maybeCallbackWithError(callback, `Error validating alias id of ${id}: ${e.message}`);
                            }

                            adapterObjects.getObject(aliasId, (err, sourceObj) => {
                                if (err) {
                                    return tools.maybeCallbackWithError(callback, err);
                                }
                                if (this.oStates && this.oStates[aliasId]) {
                                    const state = deepClone(this.oStates[aliasId]);
                                    return tools.maybeCallbackWithError(callback, err, tools.formatAliasValue(sourceObj && sourceObj.common, obj.common, state, logger, this.namespaceLog));
                                } else {
                                    this.inputCount++;
                                    adapterStates.getState(aliasId, (err, state) => {
                                        return tools.maybeCallbackWithError(callback, err, tools.formatAliasValue(sourceObj && sourceObj.common, obj.common, state, logger, this.namespaceLog));
                                    });
                                }
                            });
                        } else {
                            logger.warn(`${this.namespaceLog} ${err ? err.message : `Alias ${id} has no target 9`}`);
                            return tools.maybeCallbackWithError(callback, err ? err.message : `Alias ${id} has no target`);
                        }
                    });
                } else {
                    if (this.oStates && this.oStates[id]) {
                        return tools.maybeCallbackWithError(callback, null, this.oStates[id]);
                    } else {
                        this.inputCount++;
                        adapterStates.getState(id, callback);
                    }
                }
            }
        };
        /**
         * Promise-version of Adapter.getForeignState
         */
        this.getForeignStateAsync = tools.promisify(this.getForeignState, this);

        /**
         * Read historian data for states of any instance or system state.
         *
         * This function can read values from history adapters like: history, sql, influxdb. It expects the full path of object ID.
         * Normally only foreign history has interest, so there is no getHistory and getForeignHistory
         *
         * Possible options:
         *
         *  - instance - (optional) name of instance, where to read the historian data, e.g. 'history.0', 'sql.1'. By default will be taken from system settings.
         *  - start - (optional) time in ms - Date.now()', by default is (now - 1 week)
         *  - end - (optional) time in ms - Date.now()', by default is (now + 5000 seconds)
         *  - step - (optional) used in aggregate (m4, max, min, average, total) step in ms of intervals
         *  - count - number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set.
         *  - from - if from field should be included in answer
         *  - ack - if ack field should be included in answer
         *  - q - if q field should be included in answer
         *  - addId - if id field should be included in answer
         *  - limit - do not return more entries than limit
         *  - ignoreNull - if null values should be include (false), replaced by last not null value (true) or replaced with 0 (0)
         *  - sessionId - (optional) identifier of request, will be returned back in the answer
         *  - aggregate - aggregate method:
         *      - minmax - used special algorithm. Splice the whole time range in small intervals and find for every interval max, min, start and end values.
         *      - max - Splice the whole time range in small intervals and find for every interval max value and use it for this interval (nulls will be ignored).
         *      - min - Same as max, but take minimal value.
         *      - average - Same as max, but take average value.
         *      - total - Same as max, but calculate total value.
         *      - count - Same as max, but calculate number of values (nulls will be calculated).
         *      - none - No aggregation at all. Only raw values in given period.
         *
         * @alias getHistory
         * @memberof Adapter
         * @param {string} id object ID of the state.
         * @param {object} options see function description
         * @param {ioBroker.GetHistoryCallback} callback return result
         *        <pre><code>
         *            function (error, result, step, sessionId) {
         *              if (error) adapter.log.error('Cannot read value: ' + err);
         *            }
         *        </code></pre>
         *
         *        See possible attributes of the state in @setState explanation
         */
        this.getHistory = (id, options, callback) => {
            try {
                validateId(id, true, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            options = options || {};
            options.end = options.end || Date.now() + 5000000;
            if (!options.count && !options.start) {
                options.start = options.start || Date.now() - 604800000; // - 1 week
            }

            if (!options.instance) {
                if (!this.defaultHistory) {
                    // read default history instance from system.config
                    return getDefaultHistory(() => this.getHistory(id, options, callback));
                } else {
                    options.instance = this.defaultHistory;
                }
            }

            this.sendTo(options.instance || 'history.0', 'getHistory', {id: id, options: options}, res =>
                tools.maybeCallbackWithError(callback, res.error, res.result, res.step, res.sessionId));
        };
        /**
         * Promise-version of Adapter.getHistory
         */
        this.getHistoryAsync = tools.promisify(this.getHistory, this, ['result', 'step', 'sessionId']);

        /**
         * Convert ID into object with device's, channel's and state's name.
         *
         * Convert "adapter.instance.D.C.S" in object {device: D, channel: C, state: S}
         * Convert ID to {device: D, channel: C, state: S}
         *
         * @alias idToDCS
         * @memberof Adapter
         * @param {string} id short or long string of ID like "stateID" or "adapterName.0.stateID".
         * @return {object} parsed ID as an object
         */
        this.idToDCS = id => {
            if (!id) {
                return null;
            }
            const parts = id.split('.');
            if (parts[0] + '.' + parts[1] !== this.namespace) {
                logger.warn(`${this.namespaceLog} Try to decode id not from this adapter`);
                return null;
            }
            return {device: parts[2], channel: parts[3], state: parts[4]};
        };

        /**
         * Deletes a state of this instance.
         * The object will NOT be deleted. If you want to delete it too, use @delObject instead.
         *
         * It is not required to provice the adapter namespace, because it will automatically be added.
         * E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.
         *
         * No error is returned if state does not exist.
         *
         * @alias delState
         * @memberof Adapter
         * @param {string} id exactly object ID (without namespace)
         * @param {object} [options] optional user context
         * @param {ioBroker.ErrorCallback} [callback] return result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot delete object: ' + err);
         *            }
         *        </code></pre>
         */
        this.delState = (id, options, callback) => {
            try {
                validateId(id, false, null);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            // delState does the same as delForeignState, but fixes the ID first
            id = this._fixId(id);
            this.delForeignState(id, options, callback);
        };
        /**
         * Promise-version of Adapter.delState
         */
        this.delStateAsync = tools.promisify(this.delState, this);

        /**
         * Deletes a state of any adapter.
         * The object is NOT deleted. If you want to delete it too, use @delForeignObject instead.
         *
         * No error is returned if state does not exist.
         *
         * @alias delForeignState
         * @memberof Adapter
         * @param {string} id long string for ID like "adapterName.0.stateID".
         * @param {object} [options] optional argument to describe the user context
         * @param {ioBroker.ErrorCallback} [callback] return result function (err) {}
         */
        this.delForeignState = (id, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('delForeignState not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, true, options);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
                checkStates(id, options, 'delState', err => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else {
                        adapterStates.delState(id, callback);
                    }
                });
            } else {
                adapterStates.delState(id, callback);
            }
        };
        /**
         * Promise-version of Adapter.delForeignState
         */
        this.delForeignStateAsync = tools.promisify(this.delForeignState, this);

        /**
         * Read all states of this adapter, that pass the pattern
         *
         * Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
         * <pre><code>
         *     adapter.getStates('*', function (err, states) {
         *         for (var id in states) {
         *              adapter.log.debug('"' + id + '" = "' + states[id].val);
         *         }
         *     });
         * </code></pre>
         *
         * @alias getStates
         * @memberof Adapter
         * @param {string} pattern string in form 'adapter.0.*' or like this. It can be array of IDs too.
         * @param {object} options optional argument to describe the user context
         * @param {ioBroker.GetStatesCallback} callback return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
         */
        this.getStates = (pattern, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            pattern = this._fixId(pattern, true);
            this.getForeignStates(pattern, options, callback);
        };
        /**
         * Promise-version of Adapter.getStates
         */
        this.getStatesAsync = tools.promisify(this.getStates, this);

        this._processStatesSecondary = function (keys, targetObjs, srcObjs, callback) {
            adapterStates.getStates(keys, (err, arr) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }

                const result = {};

                for (let i = 0; i < keys.length; i++) {
                    const obj = targetObjs && targetObjs[i];
                    if (typeof arr[i] === 'string') {
                        try {
                            arr[i] = JSON.parse(arr[i]);
                        } catch {
                            // if it is not binary state
                            arr[i] < 2000 && logger.error(this.namespaceLog + ' Cannot parse state "' + keys[i] + ': ' + arr[i]);
                        }
                    }

                    if (obj && obj.common && obj.common.alias) {
                        if (obj.common.alias.val !== undefined) {
                            result[obj._id] = {val: obj.common.alias.val, ts: Date.now(), q: 0};
                        } else if (srcObjs[i]) {
                            result[obj._id] = tools.formatAliasValue(srcObjs[i].common, obj.common, arr[i] || null, logger, this.namespaceLog) || null;
                        } else {
                            result[obj._id || keys[i]] = arr[i] || null;
                        }
                    } else {
                        result[(obj && obj._id) || keys[i]] = arr[i] || null;
                    }
                }
                return tools.maybeCallbackWithError(callback, null, result);
            });
        };

        this._processStates = function (keys, targetObjs, callback) {
            let aliasFound;
            const aIds = keys.map(id => {
                if (typeof id === 'string' && id.startsWith(ALIAS_STARTS_WITH)) {
                    aliasFound = true;
                    return id;
                } else {
                    return null;
                }
            });

            // if any ID from aliases found
            if (aliasFound) {
                // make a copy of original array
                keys = [...keys];

                // read aliases objects
                this._getObjectsByArray(aIds, targetObjs, options, (errors, targetObjs) => {
                    const srcIds  = [];
                    // replace aliases ID with targets
                    targetObjs.forEach((obj, i) => {
                        if (obj && obj.common && obj.common.alias) {
                            // alias id can be string or can have attribute read (this is used by getStates -> so read is important)
                            const aliasId = obj.common.alias.id && typeof obj.common.alias.id.read === 'string' ? obj.common.alias.id.read : obj.common.alias.id;

                            keys[i]   = aliasId || null;
                            srcIds[i] = keys[i];
                        }
                    });

                    // srcObjs and targetObjs could be merged
                    this._getObjectsByArray(srcIds, null, options, (errors, srcObjs) =>
                        this._processStatesSecondary(keys, targetObjs, srcObjs, callback));
                });
            } else {
                this._processStatesSecondary(keys, null, null, callback);
            }
        };

        /**
         * Read all states of all adapters (and system states), that pass the pattern
         *
         * Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
         * <pre><code>
         *     adapter.getStates('*', function (err, states) {
         *         for (var id in states) {
         *              adapter.log.debug('"' + id + '" = "' + states[id].val);
         *         }
         *     });
         * </code></pre>
         *
         * @alias getForeignStates
         * @memberof Adapter
         * @param {string | string[]} pattern string in form 'adapter.0.*' or like this. It can be array of IDs too.
         * @param {object} options optional argument to describe the user context
         * @param {ioBroker.GetStatesCallback} callback return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
         */
        this.getForeignStates = (pattern, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (typeof pattern === 'function') {
                callback = pattern;
                pattern = '*';
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('getForeignStates not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (!adapterObjects) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('getForeignStates not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (pattern instanceof RegExp) {
                logger.error(`${this.namespaceLog} Regexp is not supported for "getForeignStates"`);
                return tools.maybeCallbackWithError(callback, 'Regexp is not supported for "getForeignStates"');
            }

            if (!Array.isArray(pattern) && typeof pattern !== 'string') {
                logger.error(`${this.namespaceLog} The Pattern for "getForeignStates" needs to be an Array or an String. ${typeof pattern} provided.`);
                return tools.maybeCallbackWithError(callback, `The Pattern for "getForeignStates" needs to be an Array or an String. ${typeof pattern} provided.`);
            }

            // if pattern is array
            if (Array.isArray(pattern)) {
                if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
                    checkStates(pattern, options, 'getState', (err, keys, objs) => {
                        if (err) {
                            return tools.maybeCallbackWithError(callback, err);
                        } else {
                            this._processStates(keys, objs, callback);
                        }
                    });
                } else {
                    this._processStates(pattern, options && options._objects, callback);
                }
            } else {
                // read first the keys for pattern
                let params = {};
                if (pattern && pattern !== '*') {
                    params = {
                        startkey: pattern.replace(/\*/g, ''),
                        endkey:   pattern.replace(/\*/g, '\u9999')
                    };
                }
                let originalChecked = undefined;
                if (options.checked !== undefined) {
                    originalChecked = options.checked;
                }
                options.checked = true;

                // in special maintenance mode, just returns all states. Aliases are not supported in this mode
                if (options.user === SYSTEM_ADMIN_USER && options.maintenance) {
                    adapterStates.getKeys(pattern, (err, keys) => {
                        if (err) {
                            return tools.maybeCallbackWithError(callback, err);
                        } else {
                            this._processStatesSecondary(keys, null, null, callback);
                        }
                    });
                }

                adapterObjects.getObjectView('system', 'state', params, options, (err, res) => {
                    if (originalChecked !== undefined) {
                        options.checked = originalChecked;
                    } else {
                        options.checked = undefined;
                    }
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                    if (!res || !res.rows) {
                        return tools.maybeCallbackWithError(callback, null, {});
                    }
                    const keys = [];
                    const objs = [];

                    // filter out
                    let regEx;
                    // process patterns like "*.someValue". The patterns "someValue.*" will be processed by getObjectView
                    if (pattern !== '*' && pattern[pattern.length - 1] !== '*') {
                        regEx = new RegExp(tools.pattern2RegEx(pattern));
                    }
                    for (let i = 0; i < res.rows.length; i++) {
                        const id = res.rows[i].id;
                        if (id && (!regEx || regEx.test(id))) {
                            keys.push(id);
                            objs.push(res.rows[i].value);
                        }
                    }
                    options._objects = objs;
                    this.getForeignStates(keys, options, callback);
                });
            }
        };
        /**
         * Promise-version of Adapter.getForeignStates
         */
        this.getForeignStatesAsync = tools.promisify(this.getForeignStates, this);

        this._addAliasSubscribe = (aliasObj, pattern, callback) => {
            if (aliasObj && aliasObj.common && aliasObj.common.alias && aliasObj.common.alias.id) {
                if (aliasObj.type !== 'state') {
                    logger.warn(`${this.namespaceLog} Expected alias ${aliasObj._id} to be of type "state", got "${aliasObj.type}"`);
                    return tools.maybeCallbackWithError(callback, new Error(`Expected alias ${aliasObj._id} to be of type "state", got "${aliasObj.type}"`));
                }

                // id can be string or can have attribute read
                const sourceId = typeof aliasObj.common.alias.id.read === 'string' ? aliasObj.common.alias.id.read : aliasObj.common.alias.id;

                // validate here because we use objects/states db directly
                try {
                    validateId(sourceId, true, null);
                } catch (e) {
                    logger.warn(`${this.namespaceLog} Error validating alias id of ${aliasObj._id}: ${e.message}`);
                    return tools.maybeCallbackWithError(callback, new Error(`Error validating alias id of ${aliasObj._id}: ${e.message}`));
                }

                this.aliases[sourceId] = this.aliases[sourceId] || {source: null, targets: []};

                const targetEntry = {
                    alias: JSON.parse(JSON.stringify(aliasObj.common.alias)),
                    id:    aliasObj._id,
                    pattern,
                    type:  aliasObj.common.type,
                    max:   aliasObj.common.max,
                    min:   aliasObj.common.min,
                    unit: aliasObj.common.unit
                };

                this.aliases[sourceId].targets.push(targetEntry);

                if (!this.aliases[sourceId].source) {
                    adapterStates.subscribe(sourceId, () =>
                        adapterObjects.getObject(sourceId, options, (err, sourceObj) => {
                            if (sourceObj && sourceObj.common) {
                                if (!this.aliases[sourceObj._id]) {
                                    logger.error(`${this.namespaceLog} Alias subscription error. Please check your alias definitions: sourceId=${sourceId}, sourceObj=${JSON.stringify(sourceObj)}`);
                                } else {
                                    this.aliases[sourceObj._id].source      = {};
                                    this.aliases[sourceObj._id].source.min  = sourceObj.common.min;
                                    this.aliases[sourceObj._id].source.max  = sourceObj.common.max;
                                    this.aliases[sourceObj._id].source.type = sourceObj.common.type;
                                    this.aliases[sourceObj._id].source.unit = sourceObj.common.unit;
                                }
                            }
                            return tools.maybeCallbackWithError(callback, err);
                        }));
                } else {
                    return tools.maybeCallback(callback);
                }
            } else if (aliasObj && aliasObj.type === 'state') {
                // if state and no id given -> if no state just ignore it
                logger.warn(`${this.namespaceLog} Alias ${aliasObj._id} has no target 12`);
                return tools.maybeCallbackWithError(callback, new Error(`Alias ${aliasObj._id} has no target 12`));
            } else {
                return tools.maybeCallback(callback);
            }
        };

        this._removeAliasSubscribe = (sourceId, aliasObj, pattern, callback) => {
            if (typeof pattern === 'function') {
                callback = pattern;
                pattern = null;
            }

            if (!this.aliases[sourceId]) {
                return tools.maybeCallback(callback);
            }

            // remove from targets array
            const pos = typeof aliasObj === 'number' ? aliasObj : this.aliases[sourceId].targets.indexOf(aliasObj);

            if (pos !== -1) {
                this.aliases[sourceId].targets.splice(pos, 1);

                // unsubscribe if no more aliases exists
                if (!this.aliases[sourceId].targets.length) {
                    delete this.aliases[sourceId];
                    return adapterStates.unsubscribe(sourceId, callback);
                }
            }
            return tools.maybeCallback(callback);
        };

        /**
         * Subscribe for changes on all states of all adapters (and system states), that pass the pattern
         *
         * Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
         * <pre><code>
         *     adapter.subscribeForeignStates('adapterName.X.*');
         * </code></pre>
         *
         * @alias subscribeForeignStates
         * @memberof Adapter
         * @param {string | string[] | RegExp} pattern string in form 'adapter.0.*' or like this. It can be array of IDs too.
         * @param {object} [options] optional argument to describe the user context
         * @param {ioBroker.ErrorCallback} [callback] return result function (err) {}
         */
        this.subscribeForeignStates = async (pattern, options, callback) => {
            pattern = pattern || '*';
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('subscribeForeignStates not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            // Todo check rights for options
            await autoSubscribeOn();

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('subscribeForeignStates not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }
            if (!adapterObjects) {
                this.log.info('subscribeForeignStates not processed because Objects database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            // compare if this pattern for one of auto-subscribe adapters
            for (const autoSubEntry of this.autoSubscribe) {
                if (typeof pattern === 'string' && (pattern === '*' || pattern.startsWith(`${autoSubEntry}.`))) {
                    // put this pattern into adapter list
                    adapterStates.getState(`system.adapter.${autoSubEntry}.subscribes`, (err, state) => {
                        state = {};
                        state.val = state.val || '{}';
                        let subs;
                        try {
                            subs = JSON.parse(state.val);
                        } catch {
                            logger.error(`${this.namespaceLog} Cannot parse subscribes for "${autoSubEntry}.subscribes"`);
                        }

                        subs[pattern] = subs[pattern] || {};
                        subs[pattern][this.namespace] = subs[pattern][this.namespace] || 0;
                        subs[pattern][this.namespace]++;
                        this.outputCount++;
                        adapterStates.setState(`system.adapter.${autoSubEntry}.subscribes`, JSON.stringify(subs));
                    });
                }
            }

            // RegExp is allowed for alias only
            if (pattern instanceof RegExp && pattern.toString().indexOf('alias') !== -1) {
                logger.error(`${this.namespaceLog} Regexp is not supported for "subscribeForeignStates"`);
                return tools.maybeCallbackWithError(callback, 'Regexp is not supported for "subscribeForeignStates"');
            }

            if (Array.isArray(pattern)) {
                // get all aliases
                const aliasesIds = pattern
                    .map(id => typeof id === 'string' && id.startsWith(ALIAS_STARTS_WITH) ? id : null)
                    .filter(id => id);

                // get all non aliases
                const nonAliasesIds = pattern
                    .map(id => typeof id === 'string' && !id.startsWith(ALIAS_STARTS_WITH) ? id : null)
                    .filter(id => id);

                const promises = [];

                for (let aliasPattern of pattern) {
                    aliasPattern = aliasPattern instanceof RegExp ? JSON.stringify(aliasPattern) : aliasPattern;
                    if (typeof aliasPattern === 'string' && (aliasPattern.startsWith(ALIAS_STARTS_WITH) || aliasPattern.includes('*'))
                            && !this.aliasPatterns.includes(aliasPattern)) {
                        // its a new alias conform pattern to store
                        this.aliasPatterns.push(aliasPattern);
                    }
                }

                if (aliasesIds.length) {
                    if (!this._aliasObjectsSubscribed) {
                        this._aliasObjectsSubscribed = true;
                        adapterObjects.subscribe(`${ALIAS_STARTS_WITH}*`);
                    }

                    const aliasObjs = await new Promise(resolve =>
                        this._getObjectsByArray(aliasesIds, null, options, (errors, aliasObjs) =>
                            resolve(aliasObjs)));

                    aliasObjs.forEach(aliasObj =>
                        promises.push(new Promise(resolve =>
                            this._addAliasSubscribe(aliasObj, aliasObj._id, resolve))));
                }

                if (nonAliasesIds.length) {
                    nonAliasesIds.forEach(id =>
                        promises.push(new Promise(resolve =>
                            adapterStates.subscribeUser(id, resolve))));
                }

                try {
                    await Promise.all(promises);
                } catch (e) {
                    logger.error(`${this.namespaceLog} Error on initial states subscription: ${e.message}`);
                }
                return tools.maybeCallback(callback);
            } else if ((typeof pattern === 'string' && pattern.includes('*')) || pattern instanceof RegExp) {
                if (typeof pattern === 'string' && (pattern === '*' || pattern.startsWith(ALIAS_STARTS_WITH)) || pattern instanceof RegExp) {
                    if (!this._aliasObjectsSubscribed) {
                        this._aliasObjectsSubscribed = true;
                        adapterObjects.subscribe(`${ALIAS_STARTS_WITH}*`);
                    }

                    // read all aliases
                    try {
                        const objs = await this.getForeignObjectsAsync(pattern, null, null, options);
                        const promises = [];
                        const aliasPattern = pattern instanceof RegExp ? JSON.stringify(pattern) : pattern;
                        if (!this.aliasPatterns.includes(aliasPattern)) {
                            // its a new pattern to store
                            this.aliasPatterns.push(aliasPattern);
                        }

                        Object.keys(objs).forEach(id => {
                            // If alias
                            if (id.startsWith(ALIAS_STARTS_WITH)) {
                                const aliasObj = objs[id];
                                promises.push(new Promise(resolve =>
                                    this._addAliasSubscribe(aliasObj, aliasPattern, resolve)));
                            }
                        });

                        try {
                            await Promise.all(promises);
                        } catch (e) {
                            logger.error(`${this.namespaceLog} Error on initial states subscription: ${e.message}`);
                        }

                        if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                            this.log.info('subscribeForeignStates not processed because States database not connected');
                            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                        }

                        if (promises.length && pattern !== '*') {
                            return tools.maybeCallback(callback);
                        } else {
                            // no alias objects found or pattern *
                            adapterStates.subscribeUser(pattern, callback);
                        }
                    } catch (e) {
                        logger.warn(`${this.namespaceLog} Cannot subscribe to ${pattern}: ${e.message}`);
                        return tools.maybeCallbackWithError(callback, e);
                    }
                } else {
                    adapterStates.subscribeUser(pattern, callback);
                }
            } else if (typeof pattern === 'string' && pattern.startsWith(ALIAS_STARTS_WITH)) {
                if (!this._aliasObjectsSubscribed) {
                    this._aliasObjectsSubscribed = true;
                    adapterObjects.subscribe(`${ALIAS_STARTS_WITH}*`);
                }

                // aliases['sourceId'] = {
                //     source: {common attributes},
                //     targets: [
                //         {
                //             alias: {},
                //             id: 'aliasId',
                //             pattern: 'some pattern',
                //             type: stateType,
                //             max: number,
                //             min: number,
                //         }
                //     ]
                // };

                // just read one alias Object
                try {
                    const aliasObj = await adapterObjects.getObjectAsync(pattern, options);
                    if (aliasObj) {
                        // cb will be called, but await for catching promisified part
                        await this._addAliasSubscribe(aliasObj, pattern, callback);
                    } else {
                        return tools.maybeCallback(callback);
                    }
                } catch (e) {
                    logger.warn(`${this.namespaceLog} cannot subscribe on alias "${pattern}": ${e.message}`);
                }
            } else {
                adapterStates.subscribeUser(pattern, callback);
            }
        };
        /**
         * Promise-version of Adapter.subscribeForeignStates
         */
        this.subscribeForeignStatesAsync = tools.promisify(this.subscribeForeignStates, this);

        /**
         * Unsubscribe for changes for given pattern
         *
         * This function allows to unsubscribe from changes. The pattern must be equal to requested one.
         *
         * <pre><code>
         *     adapter.subscribeForeignStates('adapterName.X.*');
         *     adapter.unsubscribeForeignStates('adapterName.X.abc*'); // This will not work
         *     adapter.unsubscribeForeignStates('adapterName.X.*'); // Valid unsubscribe
         * </code></pre>
         *
         * @alias unsubscribeForeignStates
         * @memberof Adapter
         * @param {string | string[] | RegExp} pattern string in form 'adapter.0.*'. Must be the same as subscribe.
         * @param {object} [options] optional argument to describe the user context
         * @param {ioBroker.ErrorCallback} [callback] return result function (err) {}
         */
        this.unsubscribeForeignStates = (pattern, options, callback) => {
            pattern = pattern || '*';

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('unsubscrubeForeignStates not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            // Todo check rights for options
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (this.autoSubscribe && typeof pattern === 'string') {
                for (let s = 0; s < this.autoSubscribe.length; s++) {
                    if (pattern === '*' || pattern.substring(0, this.autoSubscribe[s].length + 1) === `${this.autoSubscribe[s]}.`) {
                        // remove this pattern from adapter list
                        adapterStates.getState(`system.adapter.${this.autoSubscribe[s]}.subscribes`, (err, state) => {
                            if (!state || !state.val) {
                                return;
                            }
                            let subs;
                            try {
                                subs = JSON.parse(state.val);
                            } catch {
                                logger.error(`${this.namespaceLog} Cannot parse subscribes for "${this.autoSubscribe[s]}.subscribes"`);
                                return;
                            }
                            if (!subs[pattern]) {
                                return;
                            }
                            if (subs[pattern][this.namespace] === undefined) {
                                return;
                            }
                            subs[pattern][this.namespace]--;
                            if (subs[pattern][this.namespace] <= 0) {
                                delete subs[pattern][this.namespace];
                            }

                            // if no other subs are there
                            if (!Object.keys(subs[pattern]).length) {
                                delete subs[pattern];
                            }
                            this.outputCount++;
                            adapterStates.setState(`system.adapter.${this.autoSubscribe[s]}.subscribes`, subs);
                        });
                    }
                }
            }

            const promises = [];
            let aliasPattern;

            if (Array.isArray(pattern)) {
                // process every entry as single unsubscribe
                pattern.forEach(_pattern =>
                    promises.push(new Promise(resolve => this.unsubscribeForeignStates(_pattern, resolve))));
            } else if (pattern instanceof RegExp) {
                aliasPattern = JSON.stringify(pattern); // check all aliases

                promises.push(new Promise(resolve => adapterStates.unsubscribeUser(pattern, resolve)));
            } else if (typeof pattern === 'string' && (pattern.includes('*') || pattern.startsWith(ALIAS_STARTS_WITH))) {
                if (pattern === '*' || pattern.startsWith(ALIAS_STARTS_WITH)) {
                    aliasPattern = pattern; // check all aliases
                    if (pattern === '*') {
                        promises.push(new Promise(resolve => adapterStates.unsubscribeUser(pattern, resolve)));
                    }
                } else {
                    promises.push(new Promise(resolve => adapterStates.unsubscribeUser(pattern, resolve)));
                }
            } else {
                promises.push(new Promise(resolve => adapterStates.unsubscribeUser(pattern, resolve)));
            }

            // if pattern known, remove it from alias patterns to not subscribe to further matching aliases
            this.aliasPatterns = this.aliasPatterns.filter(pattern => pattern !== aliasPattern);

            if (aliasPattern) {
                Object.keys(this.aliases).forEach(sourceId => {
                    for (let i = this.aliases[sourceId].targets.length - 1; i >= 0; i--) {
                        if (this.aliases[sourceId].targets[i].pattern === aliasPattern) {
                            promises.push(new Promise(resolve => this._removeAliasSubscribe(sourceId, i, resolve)));
                        }
                    }
                });
            }

            Promise.all(promises).then(() => {
                // if no alias subscribed any longer, remove subscription
                if (!Object.keys(this.aliases).length && this._aliasObjectsSubscribed) {
                    this._aliasObjectsSubscribed = false;
                    adapterObjects.unsubscribe(`${ALIAS_STARTS_WITH}*`);
                }
                return tools.maybeCallback(callback);
            });
        };
        /**
         * Promise-version of Adapter.unsubscribeForeignStates
         */
        this.unsubscribeForeignStatesAsync = tools.promisify(this.unsubscribeForeignStates, this);

        /**
         * Subscribe for changes on all states of this instance, that pass the pattern
         *
         * Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
         * <pre><code>
         *     adapter.subscribeStates('*'); // subscribe for all states of this adapter
         * </code></pre>
         *
         * @alias subscribeStates
         * @memberof Adapter
         * @param {string} pattern string in form 'adapter.0.*' or like this. Only string allowed
         * @param {object} [options] optional argument to describe the user context
         * @param {ioBroker.ErrorCallback} [callback]
         */
        this.subscribeStates = (pattern, options, callback) => {
            // Todo check rights for options
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('subscribeStates not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            // Exception. Threat the '*' case automatically
            if (!pattern || pattern === '*') {
                adapterStates.subscribeUser(this.namespace + '.*', callback);
            } else {
                pattern = this._fixId(pattern, true);
                adapterStates.subscribeUser(pattern, callback);
            }
        };
        /**
         * Promise-version of Adapter.subscribeStates
         */
        this.subscribeStatesAsync = tools.promisify(this.subscribeStates, this);

        /**
         * Unsubscribe for changes for given pattern for own states.
         *
         * This function allows to unsubscribe from changes. The pattern must be equal to requested one.
         *
         * <pre><code>
         *     adapter.subscribeForeignStates('*');
         *     adapter.unsubscribeForeignStates('abc*'); // This will not work
         *     adapter.unsubscribeForeignStates('*');    // Valid unsubscribe
         * </code></pre>
         *
         * @alias unsubscribeStates
         * @memberof Adapter
         * @param {string} pattern string in form 'adapter.0.*'. Must be the same as subscribe.
         * @param {object} [options] optional argument to describe the user context
         * @param {ioBroker.ErrorCallback} [callback]
         */
        this.unsubscribeStates = (pattern, options, callback) => {
            // Todo check rights for options
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('unsubscribeStates not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (!pattern || pattern === '*') {
                adapterStates.unsubscribeUser(this.namespace + '.*', callback);
            } else {
                pattern = this._fixId(pattern, true);
                adapterStates.unsubscribeUser(pattern, callback);
            }
        };
        /**
         * Promise-version of Adapter.unsubscribeStates
         */
        this.unsubscribeStatesAsync = tools.promisify(this.unsubscribeStates, this);

        /**
         * Decrypt the password/value with given key
         * @param {string} secretVal to use for decrypt (or value if only one parameter is given)
         * @param {string} [value] value to decrypt (if secret is provided)
         * @returns {string}
         */
        this.decrypt = (secretVal, value) => {
            if (value === undefined) {
                value = secretVal;
                secretVal = systemSecret;
            }
            return tools.decrypt(secretVal, value);
        };

        /**
         * Encrypt the password/value with given key
         * @param {string} secretVal to use for encrypt (or value if only one parameter is given)
         * @param {string} [value] value to encrypt (if secret is provided)
         * @returns {string}
         */
        this.encrypt = (secretVal, value) => {
            if (value === undefined) {
                value = secretVal;
                secretVal = systemSecret;
            }
            return tools.encrypt(secretVal, value);
        };

        this.pushFifo = (id, state, callback) => {
            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('pushFifo not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterStates.pushFifo(id, state, callback);
        };

        this.trimFifo = (id, start, end, callback) => {
            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('trimFifo not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterStates.trimFifo(id, start, end, callback);
        };

        this.getFifoRange = (id, start, end, callback) => {
            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('getFifoRange not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterStates.getFifoRange(id, start, end, callback);
        };

        this.getFifo = (id, callback) => {
            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('getFifo not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterStates.getFifo(id, callback);
        };

        this.lenFifo = (id, callback) => {
            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('lenFifo not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterStates.lenFifo(id, callback);
        };

        this.subscribeFifo = (pattern, callback) => {
            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('subscribeFifo not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterStates.subscribeFifo(pattern);
        };

        this.getSession = (id, callback) => {
            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('getSession not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterStates.getSession(id, callback);
        };

        this.setSession = (id, ttl, data, callback) => {
            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('setSession not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterStates.setSession(id, ttl, data, callback);
        };

        this.destroySession = (id, callback) => {
            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('destroySession not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            adapterStates.destroySession(id, callback);
        };

        /**
         * Write binary block into redis, e.g image
         *
         * @alias setBinaryState
         * @memberof Adapter
         *
         * @param {string} id of state
         * @param {Buffer} binary data
         * @param {object} [options] optional
         * @param {ioBroker.ErrorCallback} [callback]
         *
         */
        this.setBinaryState = (id, binary, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            try {
                validateId(id, true, options);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('setBinaryState not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            // we need at least user or group for checkStates - if no given assume admin
            if (!options || !options.user) {
                options = options || {};
                options.user = SYSTEM_ADMIN_USER;
            }
            // always read according object to set the binary flag
            checkStates(id, options, 'setState', (err, obj) => {
                if (!err && !obj) {
                    return tools.maybeCallbackWithError(callback, 'Object does not exist');
                } else
                if (!err && !obj.binary) {
                    obj.binary = true;

                    if (!adapterObjects) {
                        this.log.info('setBinaryState not processed because Objects database not connected');
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    adapterObjects.setObject(id, obj, err => {
                        if (err) {
                            return tools.maybeCallbackWithError(callback, err);
                        } else {
                            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                                this.log.info('setBinaryState not processed because States database not connected');
                                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                            }

                            this.outputCount++;
                            adapterStates.setBinaryState(id, binary, callback);
                        }
                    });
                } else if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                        this.log.info('setBinaryState not processed because States database not connected');
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    this.outputCount++;
                    adapterStates.setBinaryState(id, binary, callback);
                }
            });
        };
        /**
         * Promise-version of Adapter.setBinaryState
         *
         * @alias setBinaryStateAsync
         * @memberof Adapter
         * @param {string} id of state
         * @param {Buffer} binary data
         * @param {object} [options] optional
         * @return promise
         *
         */
        this.setBinaryStateAsync = tools.promisify(this.setBinaryState, this);

        // Read binary block from redis, e.g. image
        /**
         * Read a binary block from redis, e.g. an image
         *
         * @param {string} id The state ID
         * @param {object} options optional
         * @param {ioBroker.GetBinaryStateCallback} callback
         */
        this.getBinaryState = (id, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('getBinaryState not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, true, options);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            // we need at least user or group for checkStates - if no given assume admin
            if (!options || !options.user) {
                options = options || {};
                options.user = SYSTEM_ADMIN_USER;
            }
            // always read according object to set the binary flag
            checkStates(id, options, 'getState', (err, obj) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    adapterStates.getBinaryState(id, (err, data) => {
                        if (!err && data && obj && !obj.binary) {
                            obj.binary = true;
                            adapterObjects.setObject(id, obj, err => {
                                if (err) {
                                    return tools.maybeCallbackWithError(callback, err);
                                } else {
                                    return tools.maybeCallbackWithError(callback, null, data);
                                }
                            });
                        } else {
                            // if no buffer, and state marked as not binary
                            if (!err && !data && obj && !obj.binary) {
                                return tools.maybeCallbackWithError(callback, 'State is not binary');
                            } else {
                                return tools.maybeCallbackWithError(callback, err, data);
                            }
                        }
                    });
                }
            });
        };

        /**
         * Promise-version of Adapter.getBinaryState
         *
         * @alias getBinaryStateAsync
         * @memberof Adapter
         *
         */
        this.getBinaryStateAsync = tools.promisify(this.getBinaryState, this);

        /**
         * Deletes binary state
         *
         * @alias delBinaryState
         * @memberof Adapter
         *
         * @param {string} id
         * @param {object} [options]
         * @param {ioBroker.ErrorCallback} [callback]
         *
         */
        this.delBinaryState = (id, options, callback) => {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
                this.log.info('delBinaryState not processed because States database not connected');
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                validateId(id, true, options);
            } catch (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
                checkStates(id, options, 'delState', err => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else {
                        adapterStates.delBinaryState(id, callback);
                    }
                });
            } else {
                adapterStates.delBinaryState(id, callback);
            }
        };

        /**
         * Promise-version of Adapter.delBinaryState
         *
         * @alias delBinaryStateAsync
         * @memberof Adapter
         * @param {string} id
         * @param {object} [options]
         * @return promise
         *
         */
        this.delBinaryStateAsync = tools.promisify(this.delBinaryState, this);

        /**
         * Return plugin instance
         *
         * @param name {string} name of the plugin to return
         * @returns {object} plugin instance or null if not existent or not isActive
         */
        this.getPluginInstance = name => {
            if (!this.pluginHandler) {
                return null;
            }
            return this.pluginHandler.getPluginInstance(name);
        };

        /**
         * Return plugin configuration
         *
         * @param name {string} name of the plugin to return
         * @returns {object} plugin configuration or null if not existent or not isActive
         */
        this.getPluginConfig = name => {
            if (!this.pluginHandler) {
                return null;
            }
            return this.pluginHandler.getPluginConfig(name);
        };
    };

    // read all logs prepared for this adapter at start
    const readLogs = callback => {
        if (!adapterStates) { // if states is no longer existing, we do not need to unsubscribe
            this.log.info('readLogs not processed because States database not connected');
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        // read all stored messages
        adapterStates.getLog('system.adapter.' + this.namespace, (err, msg) => {
            if (msg) {
                this.emit('log', msg);
                setImmediate(() => readLogs(callback));
            } else {
                return tools.maybeCallback(callback);
            }
        });
    };

    // debug function to find error with stop logging
    const checkLogging = () => {
        let logs  = [];
        // LogList
        logs.push('Actual Loglist - ' + JSON.stringify(this.logList));

        if (!adapterStates) {
            // if adapterState was destroyed, we can not continue
            return;
        }

        // Read current state of all log subscribers
        adapterStates.getKeys('*.logging', (err, keys) => {
            if (keys && keys.length) {
                if (!adapterStates) {
                    // if adapterState was destroyed, we can not continue
                    return;
                }

                adapterStates.getStates(keys, (err, obj) => {
                    if (obj) {
                        for (let i = 0; i < keys.length; i++) {
                            // We can JSON.parse, but index is 16x faster
                            if (obj[i]) {
                                const id = keys[i].substring(0, keys[i].length - '.logging'.length);
                                if ((typeof obj[i] === 'string' && (obj[i].indexOf('"val":true') !== -1 || obj[i].indexOf('"val":"true"') !== -1)) ||
                                    (typeof obj[i] === 'object' && (obj[i].val === true || obj[i].val === 'true'))) {
                                    logs.push('Subscriber - ' + id + ' ENABLED');
                                } else {
                                    if (logs) {
                                        logs.push('Subscriber - ' + id + ' (disabled)');
                                    } else {
                                        logger.error(this.namespaceLog + ' LOGINFO: Subscriber - ' + id + ' (disabled)');
                                    }
                                }
                            }
                        }
                    }
                    if (logs) {
                        for (let m = 0; m < logs.length; m++) {
                            logger.error(this.namespaceLog + ' LOGINFO: ' + logs[m]);
                        }
                        logs = null;
                    }
                });
            }
        });
    };

    const initLogging = callback => {
        // temporary log buffer
        let messages = [];
        // Read current state of all log subscriber

        if (!adapterStates) {
            // if adapterState was destroyed, we can not continue
            return;
        }

        adapterStates.getKeys('*.logging', (err, keys) => {
            if (keys && keys.length) {
                if (!adapterStates) {
                    // if adapterState was destroyed, we can not continue
                    return;
                }

                adapterStates.getStates(keys, (err, obj) => {
                    if (obj) {
                        for (let i = 0; i < keys.length; i++) {
                            // We can JSON.parse, but index is 16x faster
                            if (!obj[i]) {
                                continue;
                            }
                            const id = keys[i].substring(0, keys[i].length - '.logging'.length);
                            if (typeof obj[i] === 'string' && (obj[i].indexOf('"val":true') !== -1 || obj[i].indexOf('"val":"true"') !== -1)) {
                                this.logRedirect(true, id);
                            } else if (typeof obj[i] === 'object' && (obj[i].val === true || obj[i].val === 'true')) {
                                this.logRedirect(true, id);
                            }
                        }
                        if (this.logList.length && messages && messages.length && adapterStates && adapterStates.pushLog) {
                            for (let m = 0; m < messages.length; m++) {
                                for (let k = 0; k < this.logList.length; k++) {
                                    adapterStates.pushLog(this.logList[k], messages[m]);
                                }
                            }
                        }
                    }
                    // clear log buffer
                    messages = null;
                });
            } else {
                // disable log buffer
                messages = null;
            }
            return tools.maybeCallback(callback);
        });

        this.logRedirect = (isActive, id) => {
            // ignore itself
            if (id === 'system.adapter.' + this.namespace) {
                return;
            }

            if (isActive) {
                if (this.logList.indexOf(id) === -1) {
                    this.logList.push(id);
                }
            } else {
                const pos = this.logList.indexOf(id);
                if (pos !== -1) {
                    this.logList.splice(pos, 1);
                }
            }
        };

        // If some message from logger
        // find our notifier transport
        const ts = logger.transports.find(t => t.name === 'NT');
        ts.on('logged', info => {
            info.from = this.namespace;
            // emit to itself
            if (options.logTransporter && this.logRequired && !stopInProgress) {
                this.emit('log', info);
            }

            if (!this.logList.length) {
                // if log buffer still active
                if (messages && !options.logTransporter) {
                    messages.push(info);

                    // do not let messages to grow without limit
                    if (messages.length > config.states.maxQueue) {
                        messages.splice(0, messages.length - config.states.maxQueue);
                    }
                }
            } else if (adapterStates && adapterStates.pushLog) {
                // Send to all adapter, that required logs
                for (let i = 0; i < this.logList.length; i++) {
                    adapterStates.pushLog(this.logList[i], info);
                }
            }
        });

        options.logTransporter = options.logTransporter || this.ioPack.common.logTransporter;

        if (options.logTransporter) {
            this.requireLog = isActive => {
                if (adapterStates) {
                    if (this.logRequired !== isActive) {
                        this.logRequired = isActive; // remember state
                        if (!isActive) {
                            if (this.logOffTimer) {
                                clearTimeout(this.logOffTimer);
                            }
                            // disable log receiving after 10 seconds
                            this.logOffTimer = setTimeout(() => {
                                this.logOffTimer = null;
                                logger.debug(this.namespaceLog + ' Change log subscriber state: FALSE');
                                this.outputCount++;
                                adapterStates.setState('system.adapter.' + this.namespace + '.logging', {val: false, ack: true, from: 'system.adapter.' + this.namespace});
                            }, 10000);
                        } else {
                            if (this.logOffTimer) {
                                clearTimeout(this.logOffTimer);
                                this.logOffTimer = null;
                            } else {
                                logger.debug(this.namespaceLog + ' Change log subscriber state: true');
                                this.outputCount++;
                                adapterStates.setState('system.adapter.' + this.namespace + '.logging', {val: true, ack: true, from: 'system.adapter.' + this.namespace});
                            }
                        }
                    }
                }
            };

            this.processLog = msg => {
                msg && !stopInProgress && this.emit('log', msg);
            };

            readLogs();

            adapterStates.subscribeLog('system.adapter.' + this.namespace);
        } else {
            this.requireLog = _isActive => {
                logger.warn(this.namespaceLog + ' requireLog is not supported by this adapter! Please set common.logTransporter to true');
            };
        }
    };

    const initAdapter = adapterConfig => {
        initLogging(() => {
            this.pluginHandler.setDatabaseForPlugins(adapterObjects, adapterStates);
            this.pluginHandler.initPlugins(adapterConfig, () => {
                if (!adapterStates) {
                    // if adapterState was destroyed,we should not continue
                    return;
                }

                adapterStates.subscribe('system.adapter.' + this.namespace + '.plugins.*');
                if (options.instance === undefined) {
                    if (!adapterConfig || !adapterConfig.common || !adapterConfig.common.enabled) {
                        if (adapterConfig && adapterConfig.common && adapterConfig.common.enabled !== undefined) {
                            !config.isInstall && logger.error(this.namespaceLog + ' adapter disabled');
                        } else {
                            !config.isInstall && logger.error(this.namespaceLog + ' no config found for adapter');
                        }

                        if (!config.isInstall && (!process.argv || !config.forceIfDisabled)) {
                            const id = 'system.adapter.' + this.namespace;
                            this.outputCount += 2;
                            adapterStates.setState(id + '.alive', {val: true, ack: true, expire: 30, from: id});
                            let done = false;
                            adapterStates.setState(id + '.connected', {val: true, ack: true, expire: 30, from: id}, () => {
                                if (!done) {
                                    done = true;
                                    this.terminate(EXIT_CODES.NO_ADAPTER_CONFIG_FOUND);
                                }
                            });
                            setTimeout(() => {
                                if (!done) {
                                    done = true;
                                    this.terminate(EXIT_CODES.NO_ADAPTER_CONFIG_FOUND);
                                }
                            }, 1000);
                            return;
                        }
                    }

                    if (!config.isInstall && !adapterConfig._id) {
                        logger.error(this.namespaceLog + ' invalid config: no _id found');
                        this.terminate(EXIT_CODES.INVALID_ADAPTER_ID);
                        return;
                    }

                    let name;
                    let instance;

                    if (!config.isInstall) {
                        const tmp = adapterConfig._id.match(/^system\.adapter\.([a-zA-Z0-9-_]+)\.([0-9]+)$/);
                        if (!tmp) {
                            logger.error(this.namespaceLog + ' invalid config');
                            this.terminate(EXIT_CODES.INVALID_ADAPTER_ID);
                            return;
                        }
                        name = tmp[1];
                        instance =  parseInt(tmp[2]) || 0;
                    } else {
                        name = options.name;
                        instance = 0;
                        adapterConfig = adapterConfig || {common: {mode: 'once', name: name, protectedNative: []}, native: {}};
                    }

                    if (adapterConfig.common.loglevel && !this.overwriteLogLevel) {
                        // set configured in DB log level
                        for (const trans of Object.keys(logger.transports)) {
                            logger.transports[trans].level = adapterConfig.common.loglevel;
                        }
                        config.log.level = adapterConfig.common.loglevel;
                    }

                    this.name = adapterConfig.common.name;
                    this.instance = instance;
                    this.namespace = name + '.' + instance;
                    this.namespaceLog = this.namespace + (this.startedInCompactMode ? ' (COMPACT)' : ' (' + process.pid + ')');
                    if (!this.startedInCompactMode) {
                        process.title = 'io.' + this.namespace;
                    }

                    this.config = adapterConfig.native;
                    this.host   = adapterConfig.common.host;
                    this.common = adapterConfig.common;

                    if (adapterConfig.common.mode === 'subscribe' ||
                        adapterConfig.common.mode === 'schedule' ||
                        adapterConfig.common.mode === 'once') {
                        this.stop = () => stop(true);
                    } else if (this.startedInCompactMode) {
                        this.stop = () => stop(false);
                        this.kill = this.stop;
                    } else {
                        this.stop = () => stop(false);
                    }

                    // Monitor logging state
                    adapterStates.subscribe('*.logging');

                    if (typeof options.message === 'function' && !adapterConfig.common.messagebox) {
                        logger.error(this.namespaceLog + ' : message handler implemented, but messagebox not enabled. Define common.messagebox in io-package.json for adapter or delete message handler.');
                    } else if (/*typeof options.message === 'function' && */adapterConfig.common.messagebox) {
                        this.mboxSubscribed = true;
                        adapterStates.subscribeMessage('system.adapter.' + this.namespace);
                    }
                } else {
                    this.name = adapterConfig.name || options.name;
                    this.instance = adapterConfig.instance || 0;
                    this.namespace = this.name + '.' + this.instance;
                    this.namespaceLog = this.namespace + (this.startedInCompactMode ? ' (COMPACT)' : ' (' + process.pid + ')');

                    this.config = adapterConfig.native || {};
                    this.common = adapterConfig.common || {};
                    this.host = this.common.host || tools.getHostName() || os.hostname();
                }
                this.adapterConfig = adapterConfig;

                // Decrypt all attributes of encryptedNative
                const promises = [];
                if (Array.isArray(adapterConfig.encryptedNative)) {
                    for (const attr of adapterConfig.encryptedNative) {
                        // we can only decrypt strings
                        if (typeof this.config[attr] === 'string') {
                            promises.push(this.getEncryptedConfig(attr)
                                .then(decryptedValue =>
                                    this.config[attr] = decryptedValue)
                                .catch(e => logger.error(this.namespaceLog + ' Can not decrypt attribute ' + attr + ': ' + e))
                            );
                        }
                    }
                } else {
                    // remove encrypted native from supported features, otherwise this can cause issues, if no adapter upload done with js-c v3+ yet
                    const idx = supportedFeatures.indexOf('ADAPTER_AUTO_DECRYPT_NATIVE');
                    if (idx !== -1) {
                        supportedFeatures.splice(idx, 1);
                    }
                }

                let promiseReadSecret;

                // read the systemSecret
                if (systemSecret !== null) {
                    promiseReadSecret = Promise.resolve();
                } else {
                    promiseReadSecret = new Promise(resolve => {
                        this.getForeignObject('system.config', null, (err, data) => {
                            if (data && data.native) {
                                systemSecret = data.native.secret;
                            }
                            systemSecret = systemSecret || DEFAULT_SECRET;
                            resolve();
                        });
                    });
                }

                // Wait till secret read and all attributes decrypted
                promiseReadSecret
                    .then(() => Promise.all(promises))
                    .then(() => {
                        this.log = new Log(this.namespaceLog, config.log.level, logger);

                        if (!adapterStates) {
                            // if adapterState was destroyed,we should not continue
                            return;
                        }

                        this.outputCount++;
                        // set current loglevel
                        adapterStates.setState('system.adapter.' + this.namespace + '.logLevel', {
                            val: config.log.level,
                            ack: true,
                            from: 'system.adapter.' + this.namespace
                        });

                        if (options.instance === undefined) {
                            this.version = (this.pack && this.pack.version) ? this.pack.version : ((this.ioPack && this.ioPack.common) ? this.ioPack.common.version : 'unknown');

                            logger.info(`${this.namespaceLog} starting. Version ${this.version} in ${this.adapterDir}, node: ${process.version}, js-controller: ${controllerVersion}`);
                            config.system = config.system || {};
                            config.system.statisticsInterval = parseInt(config.system.statisticsInterval, 10) || 15000;
                            if (!config.isInstall) {
                                reportInterval = setInterval(reportStatus, config.system.statisticsInterval);
                                reportStatus();
                                const id = 'system.adapter.' + this.namespace;
                                adapterStates.setState(id + '.compactMode', {
                                    ack: true,
                                    from: id,
                                    val: !!this.startedInCompactMode
                                });

                                this.outputCount++;

                                if (this.startedInCompactMode) {
                                    adapterStates.setState(id + '.cpu', {ack: true, from: id, val: 0});
                                    adapterStates.setState(id + '.cputime', {ack: true, from: id, val: 0});
                                    adapterStates.setState(id + '.memRss', {val: 0, ack: true, from: id});
                                    adapterStates.setState(id + '.memHeapTotal', {val: 0, ack: true, from: id});
                                    adapterStates.setState(id + '.memHeapUsed', {val: 0, ack: true, from: id});
                                    adapterStates.setState(id + '.eventLoopLag', {val: 0, ack: true, from: id});
                                    this.outputCount += 6;
                                } else {
                                    tools.measureEventLoopLag(1000, lag => this.eventLoopLags.push(lag));
                                }
                            }
                        }

                        if (adapterConfig && adapterConfig.common && adapterConfig.common.restartSchedule) {
                            try {
                                schedule = require('node-schedule');
                            } catch {
                                logger.error(this.namespaceLog + ' Cannot load node-schedule. Scheduled restart is disabled');
                            }
                            if (schedule) {
                                logger.debug(this.namespaceLog + ' Schedule restart: ' + adapterConfig.common.restartSchedule);
                                restartScheduleJob = schedule.scheduleJob(adapterConfig.common.restartSchedule, () => {
                                    logger.info(this.namespaceLog + ' Scheduled restart.');
                                    stop(false, true);
                                });
                            }
                        }

                        // auto oStates
                        if (options.states) {
                            this.getStates('*', null, (err, _states) => {
                                this.oStates = _states;
                                this.subscribeStates('*');
                                if (firstConnection) {
                                    firstConnection = false;
                                    typeof options.ready === 'function' && options.ready();
                                    this.emit('ready');
                                } else {
                                    typeof options.reconnect === 'function' && options.reconnect();
                                    this.emit('reconnect');
                                }
                                this.adapterReady = true;
                            });
                        } else {
                            typeof options.ready === 'function' && options.ready();
                            this.emit('ready');
                            this.adapterReady = true;

                            // todo remove it later, when the error is fixed
                            adapterStates.subscribe(this.namespace + '.checkLogging');
                        }
                    });
            });
        });
    };

    const reportStatus = () => {
        if (!adapterStates) {
            return;
        }
        const id = 'system.adapter.' + this.namespace;
        adapterStates.setState(id + '.alive', {val: true, ack: true, expire: Math.floor(config.system.statisticsInterval / 1000) + 10, from: id});
        this.outputCount++;
        if (this.connected) {
            adapterStates.setState(id + '.connected', {val: true, ack: true, expire: 30, from: id});
            this.outputCount++;
        }
        if (!this.startedInCompactMode) {
            // pidUsage([pid,pid,...], function (err, stats) {
            // => {
            //   cpu: 10.0,            // percentage (from 0 to 100*vcore)
            //   memory: 357306368,    // bytes
            //   ppid: 312,            // PPID
            //   pid: 727,             // PID
            //   ctime: 867000,        // ms user + system time
            //   elapsed: 6650000,     // ms since the start of the process
            //   timestamp: 864000000  // ms since epoch
            // }
            pidUsage(process.pid, (err, stats) => {
                // sometimes adapter is stopped, but this is still running
                if (!err && this && adapterStates && adapterStates.setState && stats) {
                    adapterStates.setState(id + '.cpu', {ack: true, from: id, val: Math.round(100 * parseFloat(stats.cpu)) / 100});
                    adapterStates.setState(id + '.cputime', {ack: true, from: id, val: stats.ctime / 1000});
                    this.outputCount += 2;
                }
            });
            try {
                //RSS is the resident set size, the portion of the process's memory held in RAM (as opposed to the swap space or the part held in the filesystem).
                const mem = process.memoryUsage();
                adapterStates.setState(id + '.memRss', {
                    val: parseFloat((mem.rss / 1048576/* 1MB */).toFixed(2)),
                    ack: true,
                    from: id
                });
                adapterStates.setState(id + '.memHeapTotal', {
                    val: parseFloat((mem.heapTotal / 1048576/* 1MB */).toFixed(2)),
                    ack: true,
                    from: id
                });
                adapterStates.setState(id + '.memHeapUsed', {
                    val: parseFloat((mem.heapUsed / 1048576/* 1MB */).toFixed(2)),
                    ack: true,
                    from: id
                });
            } catch (err) {
                logger.warn(`${this.namespaceLog} Could not query used process memory: ${err.message}`);
            }
            this.outputCount += 3;
            if (this.eventLoopLags.length) {
                const eventLoopLag = Math.ceil(this.eventLoopLags.reduce((a, b) => (a + b)) / this.eventLoopLags.length);
                adapterStates.setState(id + '.eventLoopLag', {val: eventLoopLag, ack: true, from: id}); // average of measured values
                this.eventLoopLags = [];
                this.outputCount++;
            }
        }
        this.outputCount += 3;
        adapterStates.setState(id + '.uptime', {val: parseInt(process.uptime().toFixed(), 10), ack: true, from: id});
        adapterStates.setState(id + '.inputCount', {val: this.inputCount, ack: true, from: id});
        adapterStates.setState(id + '.outputCount', {val: this.outputCount, ack: true, from: id});
        this.inputCount  = 0;
        this.outputCount = 0;
    };

    const stop = (isPause, isScheduled, exitCode, updateAliveState) => {
        exitCode = exitCode || (isScheduled ? EXIT_CODES.START_IMMEDIATELY_AFTER_STOP : 0);
        if (updateAliveState === undefined) {
            updateAliveState = true;
        }

        if (!stopInProgress || config.isInstall) { // when interval is deleted we already had a stop call before
            stopInProgress = true;
            reportInterval && clearInterval(reportInterval);
            reportInterval = null;
            const id = 'system.adapter.' + this.namespace;

            const finishUnload = () => {
                let tIDs = Object.keys(timers);
                if (tIDs.length) {
                    logger.warn(`${this.namespaceLog} Found uncleared timeouts (report to developer): ${tIDs.join(', ')}`);
                    tIDs.forEach(id => clearTimeout(timers[id]));
                    timers = {};
                }

                tIDs = Object.keys(intervals);
                if (tIDs.length) {
                    logger.warn(`${this.namespaceLog} Found uncleared intervals (report to developer): ${tIDs.join(', ')}`);
                    tIDs.forEach(id => clearInterval(intervals[id]));
                    intervals = {};
                }

                if (this.terminated) {
                    return;
                }

                if (adapterStates && updateAliveState) {
                    this.outputCount++;
                    adapterStates.setState(id + '.alive', {val: false, ack: true, from: id}, () => {
                        if (!isPause && logger) {
                            logger.info(this.namespaceLog + ' terminating');
                        }
                        this.terminate(exitCode);
                    });
                } else {
                    if (!isPause && this.log) {
                        logger.info(this.namespaceLog + ' terminating');
                    }
                    this.terminate(exitCode);
                }
            };

            if (typeof options.unload === 'function') {
                if (options.unload.length >= 1) {
                    // The method takes (at least) a callback
                    options.unload(finishUnload);
                } else {
                    // The method takes no arguments, so it must return a Promise
                    const unloadPromise = options.unload();
                    if (unloadPromise instanceof Promise) {
                        // Call finishUnload in the case of success and failure
                        unloadPromise.then(finishUnload, finishUnload);
                    } else {
                        // No callback accepted and no Promise returned - force unload
                        logger.error(`${this.namespaceLog} Error in ${id}: The unload method must return a Promise if it does not accept a callback!`);
                    }
                }
            } else {
                this.emit('unload', finishUnload);
            }

            // Even if the developer forgets to call the unload callback, we need to stop the process
            // Therefore wait a short while and then force the unload
            setTimeout(() => {
                if (adapterStates) {
                    finishUnload();

                    // Give 1 seconds to write the value
                    setTimeout(() => {
                        if (!isPause && this.log) {
                            logger.info(this.namespaceLog + ' terminating with timeout');
                        }
                        this.terminate(exitCode);
                    }, 1000);
                } else {
                    if (!isPause && this.log) {
                        logger.info(this.namespaceLog + ' terminating');
                    }
                    this.terminate(exitCode);
                }
            }, (this.common && this.common.stopTimeout) || 500);
        }
    };

    const exceptionHandler = async (err, isUnhandledRejection) => {
        // If the adapter has a callback to listen for unhandled errors
        // give it a chance to handle the error itself instead of restarting it
        if (typeof options.error === 'function') {
            try {
                // if error handler in the adapter returned exactly true,
                // we expect the error to be handled and do nothing more
                const wasHandled = options.error(err);
                if (wasHandled === true) {
                    return;
                }
            } catch (e) {
                console.error(`Error in adapter error handler: ${e.message}`);
            }
        }

        // catch it on windows
        if (this.getPortRunning && err && err.message === 'listen EADDRINUSE') {
            logger.warn(this.namespaceLog + ' Port ' + this.getPortRunning.port + (this.getPortRunning.host ? ' for host ' + this.getPortRunning.host : '') + ' is in use. Get next');

            setImmediate(() => this.getPort(this.getPortRunning.port + 1, this.getPortRunning.host, this.getPortRunning.callback));
            return;
        }

        if (isUnhandledRejection) {
            logger.error(`${this.namespaceLog} Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().`);
        }
        logger.error(`${this.namespaceLog} ${isUnhandledRejection ? 'unhandled promise rejection' : 'uncaught exception'}: ${err ? err.message : err}`);
        if (err && err.stack) {
            logger.error(`${this.namespaceLog} ${err.stack}`);
        }

        if (err) {
            const message = err.code ? `Exception-Code: ${err.code}: ${err.message}` : err.message;
            logger.error(`${this.namespaceLog} ${message}`);
            try {
                await this.registerNotification('system', null, message);
            } catch {
                // ignore
            }
        }

        try {
            stop(false, false, EXIT_CODES.UNCAUGHT_EXCEPTION, false);
            setTimeout(() => this.terminate(EXIT_CODES.UNCAUGHT_EXCEPTION), 1000);
        } catch (err) {
            logger.error(`${this.namespaceLog} exception by stop: ${err ? err.message : err}`);
        }
    };

    process.once('SIGINT', stop);
    process.once('SIGTERM', stop);
    // And the exit event shuts down the child.
    process.once('exit', stop);

    process.on('uncaughtException', err => exceptionHandler(err));
    process.on('unhandledRejection', err => exceptionHandler(err, true));

    const pluginSettings = {
        scope: 'adapter',
        namespace: `system.adapter.${this.namespace}`,
        logNamespace: this.namespaceLog,
        log: logger,
        iobrokerConfig: config,
        parentPackage: this.pack,
        controllerVersion
    };
    this.pluginHandler = new PluginHandler(pluginSettings);
    this.pluginHandler.addPlugins(this.ioPack.common.plugins, [this.adapterDir, __dirname]); // first resolve from adapter directory, else from js-controller

    initObjects(() => {
        if (this.inited) {
            this.log && logger.warn(this.namespaceLog + ' Reconnection to DB.');
            return;
        }

        this.inited = true;

        // auto oObjects
        if (options.objects) {
            this.getAdapterObjects(objs => {
                this.oObjects = objs;
                this.subscribeObjects('*');
                initStates(prepareInitAdapter);
            });
        } else {
            initStates(prepareInitAdapter);
        }
    });

    return this;
}

// extend the EventEmitter class using our class
util.inherits(Adapter, EventEmitter);

module.exports = Adapter;
