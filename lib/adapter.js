/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
'use strict';

// This is file, that makes all communication with controller. All options are optional except name.
// following options are available:
//   name:          name of the adapter. Must be exactly the same as directory name.
//   dirname:       adapter directory name
//   instance:      instance number of adapter
//   objects:       true or false, if desired to have oObjects. This is a list with all states, channels and devices of this adapter and it will be updated automatically.
//   states:        true or false, if desired to have oStates. This is a list with all states values and it will be updated automatically.
//   systemConfig:  if required system configuration. Store it in systemConfig attribute
//   objectChange:  callback function (id, obj) that will be called if object changed
//   stateChange:   callback function (id, obj) that will be called if state changed
//   message:       callback to inform about new message the adapter
//   unload:        callback to stop the adapter
//   config:        configuration of the connection to controller
//   noNamespace:   return short names of objects and states in objectChange and in stateChange

const net               = require('net');
const fs                = require('fs');
const extend            = require('node.extend');
const util              = require('util');
const EventEmitter      = require('events').EventEmitter;
const tools             = require('./tools');
const pidUsage          = require('pidusage');
const getConfigFileName = tools.getConfigFileName;
const EXIT_CODES        = require('./exitCodes');

const password          = require('./password');
let config              = null;
let defaultObjs;
const FORBIDDEN_CHARS   =   /[\]\[*,;'"`<>\\?]/g;

let schedule;



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

if (fs.existsSync(getConfigFileName())) {
    config = JSON.parse(fs.readFileSync(getConfigFileName(), 'utf8'));
    if (!config.states)  config.states  = {type: 'file'};
    if (!config.objects) config.objects = {type: 'file'};
} else {
    throw 'Cannot find ' + getConfigFileName();
}

/**
 * getErrorText
 *
 * Read text name of the error number
 *
 * @param {number} code error code
 * @return {string} error description
 */
function getErrorText(code) {
    const texts = Object.keys(EXIT_CODES);
    for (let i = 0; i < texts.length; i++) {
        if (EXIT_CODES[texts[i]] === code) {
            return texts[i];
        }
    }
    return (code || 0).toString();
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
    if (!(this instanceof Adapter)) return new Adapter(options);

    if (!options || (!config && !options.config)) throw 'Configuration not set!';

    if (options.config && !options.config.log) options.config.log = config.log;

    config = options.config || config;
    const regUser = /^system\.user\./;
    const regGroup = /^system\.group\./;
    let   that;
    let   firstConnection = true;
    let   systemSecret    = null;
    this.startedInCompactMode = options.compact;

    that = this;
    that.logList = [];

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
            } else if (parseInt(process.argv[a], 10).toString() === process.argv[a]) {
                config.instance = parseInt(process.argv[a], 10);
            }
        }
    }

    config.log.level = config.log.level || 'info';
    if (config.log.noStdout && process.argv && process.argv.indexOf('--console') !== -1) {
        config.log.noStdout = false;
    }

    config.log.noStdout = !config.consoleOutput;
    const logger = require('./logger.js')(config.log);

    // compatibility
    if (!logger.silly) {
        logger.silly = logger.debug;
    }

    // enable "var adapter = require(__dirname + '/../../lib/adapter.js')('adapterName');" call
    if (typeof options === 'string') options = {name: options};

    if (!options.name) throw 'No name of adapter!';


    /**
     * stops the execution of adapter, but not disables it.
     *
     * Sometimes, the adapter must be stopped if some libraries are missing.
     *
     * @alias terminate
     * @memberof Adapter
     * @param {string} reason optional termination description
     * @param {number} exitCode optional exit code
     */
    that.terminate = (reason, exitCode) => {
        // This function must be defined very first, because in the next lines will be yet used.
        if (that.terminated) return;
        that.terminated = true;
        const text = `Terminated: ${reason} (${!reason ? 'Without reason' : getErrorText(reason)})`;
        if (!reason || reason === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION || reason === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP || reason === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP_HEX) {
            logger.info(text);
        } else {
            logger.warn(text);
        }
        if (that.startedInCompactMode) {
            if (that.states) {
                that.states.destroy();
                that.states = null;
            }
            if (that.objects) {
                that.objects.destroy();
                that.objects = null;
            }
            that.emit('exit', exitCode, reason);
        } else {
            process.exit(exitCode || EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);
        }
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
                logger.error('Cannot find directory of adapter ' + options.name);
                that.terminate(EXIT_CODES.CANNOT_FIND_ADAPTER_DIR);
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
                logger.error('Cannot find directory of adapter ' + options.name);
                this.terminate(EXIT_CODES.CANNOT_FIND_ADAPTER_DIR);
            }
        }
    }

    if (fs.existsSync(this.adapterDir + '/package.json')) {
        this.pack = JSON.parse(fs.readFileSync(this.adapterDir + '/package.json', 'utf8'));
    } else {
        logger.info('Non npm module. No package.json');
    }

    if (!this.pack || !this.pack.io) {
        if (fs.existsSync(this.adapterDir + '/io-package.json')) {
            this.ioPack = JSON.parse(fs.readFileSync(this.adapterDir + '/io-package.json', 'utf8'));
        } else {
            logger.error('Cannot find: ' + this.adapterDir + '/io-package.json');
            this.terminate(EXIT_CODES.CANNOT_FIND_ADAPTER_DIR);
        }
    } else {
        this.ioPack = this.pack.io;
    }

    // If required system configuration. Store it in systemConfig attribute
    if (options.systemConfig) {
        this.systemConfig = config;
    }

    let States;
    if (config.states && config.states.type) {
        if (config.states.type === 'file') {
            States = require('./states/statesInMemClient');
        } else if (config.states.type === 'redis') {
            States = require('./states/statesInRedis');
        } else {
            throw 'Unknown objects type: ' + config.states.type;
        }
    } else {
        States  = require('./states');
    }

    let Objects;
    if (config.objects && config.objects.type) {
        if (config.objects.type === 'file') {
            Objects = require('./objects/objectsInMemClient');
        } else if (config.objects.type === 'redis') {
            try {
                Objects = require('./objects/objectsInRedis');
            } catch (e) {
                Objects = require('iobroker.objects-redis');
            }
        } else {
            throw 'Unknown objects type: ' + config.objects.type;
        }
    } else {
        Objects = require('./objects');
    }

    const os     = require('os');
    const ifaces = os.networkInterfaces();
    const ipArr  = [];
    for (const dev in ifaces) {
        if (!ifaces.hasOwnProperty(dev)) continue;
        /*jshint loopfunc:true */
        ifaces[dev].forEach(details => !details.internal && ipArr.push(details.address));
    }

    const instance = parseInt(options.compactInstance  !== undefined ? options.compactInstance : ((options.instance !== undefined) ? options.instance : (config.instance || 0)), 10);

    that.name            = options.name;
    that.namespace       = options.name + '.' + instance;
    that.users           = {}; // cache of user groups
    that.groups          = {}; // cache of user groups
    that.defaultHistory  = null;
    that.autoSubscribe   = null; // array of instances, that support auto subscribe
    that.inputCount      = 0;
    that.outputCount     = 0;
    that.FORBIDDEN_CHARS = FORBIDDEN_CHARS; // show to adapter unexaptable chars
    that.terminated      = false; // If adapter yet terminated

    let reportInterval;

    let callbackId = 1;
    that.getPortRunning = null;

    /**
     * Helper function to find next free port
     *
     * Looks for first free TCP port starting with given one:
     * <pre><code>
     *     adapter.getPort(8081, function (port) {
     *         adapter.log.debug('Followinf port is free: ' + port);
     *     });
     * </code></pre>
     *
     * @alias getPort
     * @memberof Adapter
     * @param {number} port port number to start the search for free port
     * @param {function} callback return result
     *        <pre><code>function (port) {}</code></pre>
     */
    that.getPort = function adapterGetPort(port, callback) {
        if (!port) throw 'adapterGetPort: no port';

        if (typeof port === 'string') port = parseInt(port, 10);
        that.getPortRunning = {port: port, callback: callback};
        const server = net.createServer();
        try {

            server.listen(port, (/* err */) => {
                server.once('close', () => (typeof callback === 'function') && callback(port));
                server.close();
            });
            server.on('error', (/* err */) => {
                setTimeout(() => that.getPort(port + 1, callback), 100);
            });
        } catch (e) {
            setImmediate(() => that.getPort(port + 1, callback));
        }
    };

    /**
     * Promise-version of Adapter.getPort
     */
    that.getPortAsync = tools.promisifyNoError(that.getPort, that);

    /**
     * validates user and password
     *
     *
     * @alias checkPassword
     * @memberof Adapter
     * @param {string} user user name as text
     * @param {string} pw password as text
     * @param {object} options optional user context
     * @param {function} callback return result
     *        <pre><code>
     *            function (result) {
     *              adapter.log.debug('User is valid');
     *            }
     *        </code></pre>
     */
    that.checkPassword = function checkPassword(user, pw, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!callback) throw 'checkPassword: no callback';

        if (user && !regUser.test(user)) {
            user = 'system.user.' + user;
        }
        user = user.toLowerCase();

        that.getForeignObject(user, options, (err, obj) => {
            if (err || !obj || !obj.common || (!obj.common.enabled && user !== 'system.user.admin')) {
                callback(false);
                return;
            }
            password(pw).check(obj.common.password, (err, res) => {
                callback(res);
            });
        });
    };
    /**
     * Promise-version of Adapter.checkPassword
     */
    that.checkPasswordAsync = tools.promisifyNoError(that.checkPassword, that);

    /**
     * sets the user's password
     *
     * @alias setPassword
     * @memberof Adapter
     * @param {string} user user name as text
     * @param {string} pw password as text
     * @param {object} options optional user context
     * @param {function} callback return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot set password: ' + err);
     *            }
     *        </code></pre>
     */
    that.setPassword = function setPassword(user, pw, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }
        if (user && !regUser.test(user)) {
            user = 'system.user.' + user;
        }

        that.getForeignObject(user, options, (err, obj) => {
            if (err || !obj) {
                if (typeof callback === 'function') callback('User does not exist');
                return;
            }
            password(pw).hash(null, null, (err, res) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                    return;
                }
                that.extendForeignObject(user, {
                    common: {
                        password: res
                    }
                }, options, () => (typeof callback === 'function') && callback(null));
            });
        });

    };
    /**
     * Promise-version of Adapter.setPassword
     */
    that.setPasswordAsync = tools.promisify(that.setPassword, that);

    /**
     * returns if user exists and is in the group
     *
     * This function used mostly internally and the adapter developer do not require it.
     *
     * @alias checkGroup
     * @memberof Adapter
     * @param {string} user user name as text
     * @param {string} group group name
     * @param {object} options optional user context
     * @param {function} callback return result
     *        <pre><code>
     *            function (result) {
     *              if (result) adapter.log.debug('User exists and in the group');
     *            }
     *        </code></pre>
     */
    that.checkGroup = function checkGroup(user, group, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }
        if (user && !regUser.test(user)) {
            user = 'system.user.' + user;
        }
        if (group && !regGroup.test(group)) {
            group = 'system.group.' + group;
        }
        this.getForeignObject(user, options, (err, obj) => {
            if (err || !obj) {
                callback(false);
                return;
            }
            this.getForeignObject(group, options, (err, obj) => {
                if (err || !obj) {
                    callback(false);
                    return;
                }
                if (obj.common.members.indexOf(user) !== -1) {
                    callback(true);
                } else {
                    callback(false);
                }
            });
        });
    };
    /**
     * Promise-version of Adapter.checkGroup
     */
    that.checkGroupAsync = tools.promisifyNoError(that.checkGroup, that);

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
     *
     *            authEnabled:        {type: '',          operation: ''},
     *            disconnect:         {type: '',          operation: ''},
     *            listPermissions:    {type: '',          operation: ''},
     *            getUserPermissions: {type: 'object',    operation: 'read'}
     *         };
     *        </code></pre>
     * @param {object} options optional user context
     * @param {function} callback return result
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
    that.calculatePermissions = function (user, commandsPermissions, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }

        if (!regUser.test(user)) {
            user = 'system.user.' + user;
        }
        // read all groups
        let acl = {user: user};
        if (user === 'system.user.admin') {
            acl.groups = ['system.group.administrator'];
            for (const c in commandsPermissions) {
                if (!commandsPermissions.hasOwnProperty(c) || !commandsPermissions[c].type) continue;
                acl[commandsPermissions[c].type] = acl[commandsPermissions[c].type] || {};
                acl[commandsPermissions[c].type][commandsPermissions[c].operation] = true;
            }

            if (callback) callback(acl);
            return;
        }
        acl.groups = [];
        that.getForeignObjects('*', 'group', options, (err, groups) => {
            // aggregate all groups permissions, where this user is
            if (groups) {
                for (const g in groups) {
                    if (!groups.hasOwnProperty(g)) continue;
                    if (groups[g] &&
                        groups[g].common &&
                        groups[g].common.members &&
                        groups[g].common.members.indexOf(user) !== -1) {
                        acl.groups.push(groups[g]._id);
                        if (groups[g]._id === 'system.group.administrator') {
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
                            for (const type in gAcl) {
                                if (!gAcl.hasOwnProperty(type)) continue;

                                // fix bug. Some version have user instead of users.
                                if (type === 'user') {
                                    acl.users = acl.users || {};
                                } else {
                                    acl[type] = acl[type] || {};
                                }
                                for (const op in gAcl[type]) {
                                    if (gAcl[type].hasOwnProperty(op)) {
                                        // fix error
                                        if (type === 'user') {
                                            acl.users[op] = acl.users[op] || gAcl.user[op];
                                        } else {
                                            acl[type][op] = acl[type][op] || gAcl[type][op];
                                        }
                                    }
                                }
                            }
                        } catch (e) {
                            logger.error('Cannot set acl: ' + e);
                            logger.error('Cannot set acl: ' + JSON.stringify(gAcl));
                            logger.error('Cannot set acl: ' + JSON.stringify(acl));
                        }
                    }
                }
            }

            if (callback) callback(acl);
        });
    };
    /**
     * Promise-version of Adapter.calculatePermissions
     */
    that.calculatePermissionsAsync = tools.promisifyNoError(that.calculatePermissions, that);

    function readFileCertificate(cert) {
        if (typeof cert === 'string') {
            try {
                if (cert.length < 1024 && fs.existsSync(cert)) {
                    cert = fs.readFileSync(cert).toString();
                    // start watcher of this file
                    fs.watch(cert, (eventType, filename) => {
                        logger.warn('New certificate "' + filename + '" detected. Restart adapter');
                        setTimeout(stop, 2000, false, true);
                    });
                }
            } catch (e) {
                // ignore
            }
        }
        return cert;
    }
    /**
     * returns SSL certificates by name
     *
     * This function returns SSL certificates (private key, public cert and chained certificate).
     * Names are defined in the system's configuration in admin, e.g. "defaultPrivate", "defaultPublic".
     * The result can be directly used for creation of https server.
     *
     * @alias getCertificates
     * @memberof Adapter
     * @param {string} publicName public certificate name
     * @param {string} privateName private certificate name
     * @param {string} chainedName optional chained certificate name
     * @param {function} callback return result
     *        <pre><code>
     *            function (err, certs) {
     *              adapter.log.debug('private key: ' + certs.key);
     *              adapter.log.debug('public cert: ' + certs.cert);
     *              adapter.log.debug('chained cert: ' + certs.ca);
     *            }
     *        </code></pre>
     */
    that.getCertificates = function (publicName, privateName, chainedName, callback) {
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
        publicName  = publicName  || that.config.certPublic;
        privateName = privateName || that.config.certPrivate;
        chainedName = chainedName || that.config.certChained;

        // Load certificates
        that.getForeignObject('system.certificates', (err, obj) => {
            if (err || !obj ||
                !obj.native.certificates ||
                !publicName ||
                !privateName ||
                !obj.native.certificates[publicName] ||
                !obj.native.certificates[privateName] ||
                (chainedName && !obj.native.certificates[chainedName])
            ) {
                logger.error('Cannot enable secure web server, because no certificates found: ' + publicName + ', ' + privateName + ', ' + chainedName);
                if (callback) callback(tools.ERRORS.ERROR_NOT_FOUND);
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
                if (callback) {
                    callback(null, {
                        key:  readFileCertificate(obj.native.certificates[privateName]),
                        cert: readFileCertificate(obj.native.certificates[publicName]),
                        ca:   ca
                    }, obj.native.letsEncrypt);
                }
            }
        });
    };
    /**
     * Promise-version of Adapter.getCertificates
     */
    that.getCertificatesAsync = tools.promisify(that.getCertificates, that);

    /**
     * Restarts an instance of the adapter.
     *
     * @memberof Adapter
     */
    that.restart = function restart() {
        logger.warn('Restart initiated');
        // Restarting an adapter can easily be done by writing the adapter object without changing it
        that.terminate(EXIT_CODES.START_IMMEDIATELY_AFTER_STOP);
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
    that.updateConfig = function updateConfig(newConfig) {
        // merge the old and new configuration
        const config = Object.assign({}, that.config, newConfig);
        // update the adapter config object
        const configObjId = `system.adapter.${that.namespace}`;
        that.getForeignObjectAsync(configObjId)
            .then(obj => {
                obj.native = config;
                return that.setForeignObjectAsync(configObjId, obj);
            })
            .catch(err => logger.error(`Updating the adapter config failed: ${err}`))
        ;
    };

    /**
     * Disables and stops the adapter instance.
     */
    that.disable = function disable() {
        // update the adapter config object
        const configObjId = `system.adapter.${that.namespace}`;
        that.getForeignObjectAsync(configObjId)
            .then(obj => {
                obj.common.enabled = false;
                return that.setForeignObjectAsync(configObjId, obj);
            })
            .catch(err => logger.error(`Disabling the adapter instance failed: ${err}`))
        ;
    };

    /**
     * Reads the encrypted parameter from config.
     *
     * It returns promise if no callback is provided.
     * @param {string} attribute - attribute name in native configuraiton part
     * @param {function} callback - optional callback
     * @returns {object} promise if no callback provided
     *
     */
    that.getEncryptedConfig = function (attribute, callback) {
        if (that.config.hasOwnProperty(attribute)) {
            if (typeof callback !== 'function') {
                return new Promise((reject, resolve) => {
                    that.getEncryptedConfig(attribute, (err, encrypted) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(encrypted);
                        }
                    });
                });
            } else {
                if (systemSecret !== null) {
                    callback(null, tools.decrypt(systemSecret, that.config[attribute]));
                } else {
                    that.getForeignObject('system.config', (err, data) => {
                        if (data && data.native) {
                            systemSecret = data.native.secret;
                        }
                        systemSecret = systemSecret || 'Zgfr56gFe87jJOM';
                        callback(null, tools.decrypt(systemSecret, that.config[attribute]));
                    });
                }
            }
        } else {
            if (typeof callback === 'function') {
                callback('Attribute not found');
            } else {
                return Promise.reject('Attribute not found');
            }
        }
    };

    // Can be later deleted if no more appears
    that.inited = false;

    initObjects(() => {
        if (that.inited) {
            that.log && logger.warn('Reconnection to DB.');
            return;
        }

        that.inited = true;

        // auto oObjects
        if (options.objects) {
            that.getAdapterObjects(objs => {
                that.oObjects = objs;
                that.subscribeObjects('*');
                initStates(prepareInitAdapter);
            });
        } else {
            initStates(prepareInitAdapter);
        }
    });

    function createInstancesObjects(callback, objs) {
        if (!objs) {
            objs = that.ioPack.instanceObjects;
        }

        if (!objs || !objs.length) {
            callback();
        } else {
            const obj = objs.shift();
            if (obj && obj._id) {
                that.getObject(obj._id, (err, _obj) => {
                    if (!_obj) {
                        if (obj.common) {
                            if (obj.common.name) {
                                obj.common.name = obj.common.name.replace('%INSTANCE%', instance);
                            }
                            if (obj.common.desc) {
                                obj.common.desc = obj.common.desc.replace('%INSTANCE%', instance);
                            }
                        }

                        that.setObject(obj._id, obj, err => {
                            err && that.log && logger.error('Cannot setObject: ' + err);
                            setImmediate(createInstancesObjects, callback, objs);
                        });
                    } else {
                        setImmediate(createInstancesObjects, callback, objs);
                    }
                });
            } else {
                logger.error(options.name + '.' + instance + ' invalid instance object: ' + JSON.stringify(obj));
                setImmediate(createInstancesObjects, callback, objs);
            }
        }
    }

    function prepareInitAdapter() {
        that.getForeignState('system.adapter.' + that.namespace + '.alive', (err, res) => {
            if (options.instance !== undefined) {
                initAdapter(options);
            } else
            if (!config.isInstall && res && res.val === true && !config.forceIfDisabled) {
                logger.error(options.name + '.' + instance + ' already running');
                that.terminate(EXIT_CODES.ADAPTER_ALREADY_RUNNING);
            } else {
                that.getForeignObject('system.adapter.' + that.namespace, (err, res) => {
                    if ((err || !res) && !config.isInstall) {
                        logger.error(options.name + '.' + instance + ' invalid config');
                        that.terminate(EXIT_CODES.INVALID_ADAPTER_CONFIG);
                    } else {
                        createInstancesObjects(() => initAdapter(res));
                    }
                });
            }
        });
    }

    function autoSubscribeOn(cb) {
        if (!that.autoSubscribe) {
            // collect all
            that.objects.getObjectView('system', 'instance', {startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, options, (err, res) => {
                if (res && res.rows) {
                    that.autoSubscribe = [];
                    for (let c = res.rows.length - 1; c >= 0; c--) {
                        if (res.rows[c].value.common.subscribable) {
                            const _id = res.rows[c].id.substring(15);
                            if (that.autoSubscribe.indexOf(_id) === -1) {
                                that.autoSubscribe.push(_id);
                            }
                        }
                    }
                }

                if (typeof cb === 'function') cb();
            });
            // because of autoSubscribe
            that.objects.subscribe('system.adapter.*');
        } else if (typeof cb === 'function') {
            cb();
        }
    }

    function initObjects(cb) {
        that.objects = new Objects({
            namespace: that.namespace,
            connection: config.objects,
            logger:     logger,
            connected: () => {
                that.connected = true;
                // Read dateformat if using of formatDate is announced
                if (options.useFormatDate) {
                    that.getForeignObject('system.config', (err, data) => {
                        if (data && data.common) {
                            that.dateFormat     = data.common.dateFormat;
                            that.isFloatComma   = data.common.isFloatComma;
                            that.language       = data.common.language;
                            that.longitude      = data.common.longitude;
                            that.latitude       = data.common.latitude;
                            that.defaultHistory = data.common.defaultHistory;
                        }
                        if (data && data.native) {
                            systemSecret = data.native.secret;
                        }
                        typeof cb === 'function' && cb();
                    });
                } else if (typeof cb === 'function') {
                    cb();
                }
            },
            disconnected: () =>
                that.connected = false,
            change: (id, obj) => {
                if (obj === 'null') obj = null;
                if (!id) {
                    logger.error(that.namespace + ' change ID is empty:  ' + JSON.stringify(obj));
                    return;
                }

                // If desired, that adapter must be terminated
                if (id === 'system.adapter.' + that.namespace && obj && obj.common && obj.common.enabled === false) {
                    logger.info('Adapter is disabled => stop');
                    if (!obj.common.enabled) {
                        stop();
                        setTimeout(() => that.terminate(EXIT_CODES.NO_ERROR), 4000);
                    }
                }

                // update language, dateFormat and comma
                if (id === 'system.config' && obj && obj.common && (options.useFormatDate || that.defaultHistory !== undefined)) {
                    that.dateFormat     = obj.common.dateFormat;
                    that.isFloatComma   = obj.common.isFloatComma;
                    that.language       = obj.common.language;
                    that.longitude      = obj.common.longitude;
                    that.latitude       = obj.common.latitude;
                    that.defaultHistory = obj.common.defaultHistory;
                }

                // update oObjects structure if desired
                if (that.oObjects) {
                    if (obj) {
                        that.oObjects[id] = obj;
                    } else {
                        delete that.oObjects[id];
                    }
                }

                // process autosubscribe adapters
                if (id.match(/^system\.adapter\./)) {
                    if (obj && obj.common.subscribable) {
                        const _id = id.substring(15); // 'system.adapter.'.length
                        if (obj.common.enabled) {
                            if (that.autoSubscribe.indexOf(_id) === -1) {
                                that.autoSubscribe.push(_id);
                            }
                        } else {
                            const pos = that.autoSubscribe.indexOf(_id);
                            if (pos !== -1) {
                                that.autoSubscribe.splice(pos, 1);
                            }
                        }
                    }
                }

                // remove protectedNative if not admin or own adapter
                let adapterName = that.namespace.split('.')[0];
                if(obj && obj._id && obj._id.match(/^system\.adapter\./) && adapterName !== 'admin' &&
                    adapterName !== obj._id.split('.')[2] && obj.protectedNative && obj.protectedNative.length) {
                    for (const attr of obj.protectedNative) {
                        delete obj.native[attr];
                    } // endFor
                } // endIf

                // It was an error in the calculation
                if ((options.noNamespace || config.noNamespace) && that._namespaceRegExp.test(id)) {
                    // emit 'objectChange' event instantly
                    setImmediate(() => {
                        if (typeof options.objectChange === 'function') options.objectChange(id.substring(that.namespace.length + 1), obj);
                        that.emit('objectChange', id.substring(that.namespace.length + 1), obj);
                    });
                } else {
                    setImmediate(() => {
                        if (typeof options.objectChange === 'function') options.objectChange(id, obj);
                        // emit 'objectChange' event instantly
                        that.emit('objectChange', id, obj);
                    });
                }
            },
            connectTimeout: (/* err */) => {
                if (config.isInstall) {
                    logger && logger.warn(that.namespace + ' no connection to objects DB');
                    that.terminate(EXIT_CODES.NO_ERROR);
                } else {
                    logger && logger.error(that.namespace + ' no connection to objects DB');
                }
            }
        });

        that._namespaceRegExp = new RegExp('^' + that.namespace);       // chache the regex object 'adapter.0'

        /**
         * @param {string | {device?: string, channel?: string, state?: string}} id
         * @param {boolean} [isPattern=false]
         */
        that._fixId = function _fixId(id, isPattern/* , type */) {
            let result  = '';
            // If id is an object
            if (typeof id === 'object') {
                // Add namespace + device + channel
                result = that.namespace + '.' + (id.device ? id.device + '.' : '') + (id.channel ? id.channel + '.' : '') + (id.state ? id.state : '');
            } else {
                result = id;

                if (!that._namespaceRegExp.test(id)) {
                    if (!isPattern) {
                        result = that.namespace + (id ? '.' + id : '');
                    } else {
                        result = that.namespace + '.' + (id ? id : '');
                    }
                }
            }
            return result;
        };

        /**
         * Helper method for `set[Foreign]Object[NotExists]` that also sets the default value if one is configured
         * @param {string} id of the object
         * @param obj The object to set
         * @param {unknown} [options]
         * @param callback
         */
        function setObjectWithDefaultValue(id, obj, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = undefined;
            }
            that.objects.setObject(id, obj, options, (err, result) => {
                if (!err && obj.common.def !== undefined) {
                    that.setState(id, obj.common.def, true, null, () =>
                        typeof callback === 'function' && callback(err, result));
                } else if (typeof callback === 'function') {
                    callback(err, result);
                }
            });
        }

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
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *              // obj is {id: id}
         *              if (err) adapter.log.error('Cannot write object: ' + err);
         *            }
         *        </code></pre>
         */
        that.setObject = function setObject(id, obj, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!defaultObjs) {
                defaultObjs = require('./defaultObjs.js')('de', '°C', 'EUR');
            }

            if (!id && obj.type !== 'meta') {
                logger.error(tools.appendStackTrace(that.namespace + ' setObject id missing!!'));
                if (typeof callback === 'function') callback('id missing!');
                return;
            }

            if (!obj) {
                logger.error(that.namespace + ' setObject ' + id + ' object missing!');
                if (typeof callback === 'function') callback('object missing!');
                return;
            }

            if (obj.hasOwnProperty('type')) {
                if (!obj.hasOwnProperty('native')) {
                    logger.warn(that.namespace + ' setObject ' + id + ' (type=' + obj.type + ') property native missing!');
                    obj.native = {};
                }
                // Check property 'common'
                if (!obj.hasOwnProperty('common')) {
                    logger.warn(that.namespace + ' setObject ' + id + ' (type=' + obj.type + ') property common missing!');
                    obj.common = {};
                } else if (obj.type === 'state') {
                    // Try to extend the model for type='state'
                    // Check property 'role' by 'state'
                    if (obj.common.hasOwnProperty('role') && defaultObjs[obj.common.role]) {
                        obj.common = extend(true, {}, defaultObjs[obj.common.role], obj.common);
                    } else if (!obj.common.hasOwnProperty('role')) {
                        logger.warn(that.namespace + ' setObject ' + id + ' (type=' + obj.type + ') property common.role missing!');
                    }
                    if (!obj.common.hasOwnProperty('type')) {
                        logger.warn(that.namespace + ' setObject ' + id + ' (type=' + obj.type + ') property common.type missing!');
                    }
                }

                if (!obj.common.hasOwnProperty('name')) {
                    obj.common.name = id;
                    logger.debug(that.namespace + ' setObject ' + id + ' (type=' + obj.type + ') property common.name missing, using id as name');
                }

                id = that._fixId(id, false, obj.type);

                if (obj.children || obj.parent) {
                    logger.warn(that.namespace + ' Do not use parent or children for ' + id);
                }
                if (!obj.from) obj.from = 'system.adapter.' + that.namespace;
                if (!obj.user) obj.user = (options ? options.user : '') || 'system.user.admin';
                if (!obj.ts) obj.ts = Date.now();

                setObjectWithDefaultValue(id, obj, options, callback);
            } else {
                logger.error(that.namespace + ' setObject ' + id + ' mandatory property type missing!');
                if (typeof callback === 'function') callback('mandatory property type missing!');
            }
        };
        /**
         * Promise-version of Adapter.setObject
         */
        that.setObjectAsync = tools.promisify(that.setObject, that);

        /**
         * Get all states, channels and devices of this adapter.
         *
         * @alias getAdapterObjects
         * @memberof Adapter
         * @param {function} callback return result
         *        <pre><code>
         *            function (objects) {
         *                for (var id in objects) {
         *                    adapter.log.debug(id);
         *                }
         *            }
         *        </code></pre>
         */
        that.getAdapterObjects = function (callback) {
            const objects = {};

            that.objects.getObjectView('system', 'state', {startkey: that.namespace + '.', endkey: that.namespace + '.\u9999', include_docs: true}, (err, _states) => {
                that.objects.getObjectView('system', 'channel', {startkey: that.namespace + '.', endkey: that.namespace + '.\u9999', include_docs: true}, (err, _channels) => {
                    that.objects.getObjectView('system', 'device', {startkey: that.namespace + '.', endkey: that.namespace + '.\u9999', include_docs: true}, (err, _devices) => {
                        if (_channels) {
                            for (let c = _channels.rows.length - 1; c >= 0; c--) {
                                objects[_channels.rows[c].id] = _channels.rows[c].value;
                            }
                        }
                        if (_devices) {
                            for (let d = _devices.rows.length - 1; d >= 0; d--) {
                                objects[_devices.rows[d].id] = _devices.rows[d].value;
                            }
                        }
                        if (_states) {
                            if (options.states) that.oStates = {};
                            for (let s = _states.rows.length - 1; s >= 0; s--) {
                                objects[_states.rows[s].id] = _states.rows[s].value;
                                if (that.oStates) {
                                    that.oStates[_states.rows[s].id] = null;
                                }
                            }
                        }
                        if (typeof callback === 'function') callback(objects);
                    });
                });
            });
        };
        /**
         * Promise-version of Adapter.getAdapterObjects
         */
        that.getAdapterObjectsAsync = tools.promisifyNoError(that.getAdapterObjects, that);

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
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *                if (err) adapter.log.error(err);
         *                // obj is {"id": id}
         *            }
         *        </code></pre>
         */
        that.extendObject = function extendObject(id, obj, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            id = that._fixId(id, false, obj.type);

            const mId = id.replace(FORBIDDEN_CHARS, '_');
            if (mId !== id) {
                logger.warn(`Used invalid characters: ${id} changed to ${mId}`);
                id = mId;
            }

            if (obj.children || obj.parent) {
                logger.warn(that.namespace + ' Do not use parent or children for ' + id);
            }
            // delete arrays if they should be changed
            if (obj && (
                (obj.common && obj.common.members) ||
                (obj.native && obj.native.repositories) ||
                (obj.native && obj.native.certificates) ||
                (obj.native && obj.native.devices))
            ) {
                // Read whole object
                that.objects.getObject(id, options, (err, oldObj) => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                        return;
                    }
                    if (!oldObj) {
                        logger.error(that.namespace + ' Object ' + id + ' not exist!');
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
                    obj = extend(true, oldObj, obj);

                    if (!obj.from) obj.from = 'system.adapter.' + that.namespace;
                    if (!obj.user) obj.user = (options ? options.user : '') || 'system.user.admin';
                    if (!obj.ts) obj.ts = Date.now();

                    that.objects.setObject(id, obj, options, callback);
                });
            } else {
                if (!obj.from) obj.from = 'system.adapter.' + that.namespace;
                if (!obj.user) obj.user = (options ? options.user : '') || 'system.user.admin';
                if (!obj.ts) obj.ts = Date.now();
                that.objects.extendObject(id, obj, options, callback);
            }
        };
        /**
         * Promise-version of Adapter.extendObject
         */
        that.extendObjectAsync = tools.promisify(that.extendObject, that);

        /**
         * Same as {@link Adapter.setObject}, but for any object.
         *
         * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"
         *
         * @alias setForeignObject
         * @memberof Adapter
         * @param {string} id object ID, that must be overwritten or created.
         * @param {object} obj new object
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *              // obj is {id: id}
         *              if (err) adapter.log.error('Cannot write object: ' + err);
         *            }
         *        </code></pre>
         */
        that.setForeignObject = function setForeignObject(id, obj, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!obj.from) obj.from = 'system.adapter.' + that.namespace;
            if (!obj.user) obj.user = (options ? options.user : '') || 'system.user.admin';
            if (!obj.ts) obj.ts = Date.now();
            const mId = id.replace(FORBIDDEN_CHARS, '_');
            if (mId !== id) {
                logger.warn(`Used invalid characters: ${id} changed to ${mId}`);
                id = mId;
            }

            setObjectWithDefaultValue(id, obj, options, callback);
        };
        /**
         * Promise-version of Adapter.setForeignObject
         */
        that.setForeignObjectAsync = tools.promisify(that.setForeignObject, that);

        /**
         * Same as {@link Adapter.extendObject}, but for any object.
         *
         * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"
         *
         * @alias extendForeignObject
         * @memberof Adapter
         * @param {string} id object ID, that must be extended
         * @param {object} obj part that must be extended
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *                // obj is {"id": id}
         *                if (err) adapter.log.error(err);
         *            }
         *        </code></pre>
         */
        that.extendForeignObject = function extendForeignObject(id, obj, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            const mId = id.replace(FORBIDDEN_CHARS, '_');
            if (mId !== id) {
                logger.warn(`Used invalid characters: ${id} changed to ${mId}`);
                id = mId;
            }
            // delete arrays if they should be changed
            if (obj && ((obj.native && (obj.native.repositories || obj.native.certificates || obj.native.devices)) ||
                (obj.common && obj.common.members))) {
                // Read whole object
                that.objects.getObject(id, options, (err, oldObj) => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                        return;
                    }
                    if (!oldObj) {
                        logger.error(that.namespace + ' Object ' + id + ' not exist!');
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
                    obj = extend(true, oldObj, obj);

                    if (!obj.from) obj.from = 'system.adapter.' + that.namespace;
                    if (!obj.user) obj.user = (options ? options.user : '') || 'system.user.admin';
                    if (!obj.ts) obj.ts = Date.now();

                    that.objects.setObject(id, obj, callback);
                });
            } else {
                if (!obj.from) obj.from = 'system.adapter.' + that.namespace;
                if (!obj.user) obj.user = (options ? options.user : '') || 'system.user.admin';
                if (!obj.ts) obj.ts = Date.now();

                that.objects.extendObject(id, obj, options, callback);
            }
        };
        /**
         * Promise-version of Adapter.extendForeignObject
         */
        that.extendForeignObjectAsync = tools.promisify(that.extendForeignObject, that);

        /**
         * Get object of this instance.
         *
         * It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.
         *
         * @alias getObject
         * @memberof Adapter
         * @param {string} id exactly object ID (without namespace)
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *              if (err) adapter.log.error('Cannot get object: ' + err);
         *            }
         *        </code></pre>
         */
        that.getObject = function getObject(id, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            that.objects.getObject(that._fixId(id), options, callback);
        };
        /**
         * Promise-version of Adapter.getObject
         */
        that.getObjectAsync = tools.promisify(that.getObject, that);

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
         * @param {object} options optional user context
         * @param {function} callback return result
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
        that.getEnum = function getEnum(_enum, options, callback) {
            if (typeof _enum === 'function') {
                callback = _enum;
                options = null;
                _enum = '';
            }
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!_enum.match('^enum.')) _enum = 'enum.' + _enum;
            const result = {};

            that.objects.getObjectView('system', 'enum', {startkey: _enum + '.', endkey: _enum + '.\u9999'}, options, (err, res) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                    return;
                }
                for (let t = 0; t < res.rows.length; t++) {
                    result[res.rows[t].id] = res.rows[t].value;
                }
                if (typeof callback === 'function') callback(err, result, _enum);
            });
        };
        /**
         * Promise-version of Adapter.getEnum
         */
        that.getEnumAsync = tools.promisify(that.getEnum, that, ['result', 'requestEnum']);

        /**
         * Read the members of given enums.
         *
         * Get enums of specified tree or all enums if nothing specified as object with values.
         *
         * @alias getEnums
         * @memberof Adapter
         * @param {string|array} _enumList enum name or names, e.g. ['rooms', 'function']
         * @param {object} options optional user context
         * @param {function} callback return result
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
        that.getEnums = function getEnums(_enumList, options, callback) {
            if (typeof _enumList === 'function') {
                callback = _enumList;
                _enumList  = null;
            }
            if (typeof options === 'function') {
                callback = options;
                options  = null;
            }
            const _enums = {};
            if (_enumList) {
                if (typeof _enumList === 'string') _enumList = [_enumList];
                let count = 0;
                for (let t = 0; t < _enumList.length; t++) {
                    count++;
                    that.getEnum(_enumList[t], options, (err, list, _enum) => {
                        if (list) _enums[_enum] = list;
                        if (!--count && callback) callback(err, _enums);
                    });
                }
            } else {
                // Read all enums
                that.objects.getObjectView('system', 'enum', {startkey: 'enum.', endkey: 'enum.\u9999'}, options, (err, res) => {
                    // be aware, that res.rows[x].id is the name of enum!
                    if (err) {
                        callback(err);
                        return;
                    }
                    const result = {};
                    if (res && res.rows) {
                        for (let i = 0; i < res.rows.length; i++) {
                            const parts = res.rows[i].id.split('.', 3);
                            if (!parts[2]) continue;
                            if (!result[parts[0] + '.' + parts[1]]) result[parts[0] + '.' + parts[1]] = {};
                            result[parts[0] + '.' + parts[1]][res.rows[i].id] = res.rows[i].value;
                        }
                    }

                    if (callback) callback(err, result);
                });
            }
        };
        /**
         * Promise-version of Adapter.getEnums
         */
        that.getEnumsAsync = tools.promisify(that.getEnums, that);

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
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *              if (err) adapter.log.error('Cannot get object: ' + err);
         *            }
         *        </code></pre>
         */
        that.getForeignObjects = function getForeignObjects(pattern, type, enums, options, callback) {
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
            if (typeof enums === 'object' && !(enums instanceof Array)) {
                options = enums;
                enums = null;
            }
            that.objects.getObjectView('system', type || 'state', params, options, (err, res) => {
                if (err) {
                    callback(err);
                    return;
                }

                // don't forget, that enums returns names in row[x].id and not IDs, you can find id in rows[x].value._id
                that.getEnums(enums, (err, _enums) => {
                    const list = {};
                    for (let i = 0; i < res.rows.length; i++) {
                        if (!res.rows[i].value) {
                            logger.debug(`getEnums(${JSON.stringify(enums)}) returned an enum without a value at index ${i}, obj - ${JSON.stringify(res.rows[i])}`);
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
                                if (!_enums.hasOwnProperty(es)) continue;
                                for (const e in _enums[es]) {
                                    if (!_enums[es].hasOwnProperty(e)) continue;
                                    if (!_enums[es][e] || !_enums[es][e].common || !_enums[es][e].common.members)
                                        continue;
                                    if (_enums[es][e].common.members.indexOf(id)      !== -1 ||
                                        _enums[es][e].common.members.indexOf(channel) !== -1 ||
                                        _enums[es][e].common.members.indexOf(device)  !== -1) {
                                        list[id].enums[e] = _enums[es][e].common.name;
                                    }
                                }
                            }
                        }
                    }
                    callback(null, list);
                });
            });
        };
        /**
         * Promise-version of Adapter.getForeignObjects
         */
        that.getForeignObjectsAsync = tools.promisify(that.getForeignObjects, that);

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
         * @param {function} callback return result
         *        <pre><code>
         *            adapter.findForeignObject('Some name', function (err, id, name) {
         *              if (err) adapter.log.error('Cannot get object: ' + err);
         *              adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');
         *            }
         *        </code></pre>
         */
        that.findForeignObject = function findForeignObject(id, type, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (typeof type === 'function') {
                callback = type;
                type = null;
            }
            that.objects.findObject(id, type, options, callback);
        };
        /**
         * Promise-version of Adapter.findForeignObject
         */
        that.findForeignObjectAsync = tools.promisify(that.findForeignObject, that, ['id', 'name']);

        /**
         * Get any object.
         *
         * ID must be specified with namespace.
         *
         * @alias getForeignObject
         * @memberof Adapter
         * @param {string} id exactly object ID (with namespace)
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *              if (err) adapter.log.error('Cannot get object: ' + err);
         *            }
         *        </code></pre>
         */
        that.getForeignObject = function getForeignObject(id, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            that.objects.getObject(id, options, (err, obj) => {
                let adapterName = that.namespace.split('.')[0];
                // remove protectedNative if not admin or own adapter
                if(obj && obj._id && obj._id.match(/^system\.adapter\./) && adapterName !== 'admin' &&
                    adapterName !== obj._id.split('.')[2] && obj.protectedNative && obj.protectedNative.length) {
                    for (const attr of obj.protectedNative) {
                        delete obj.native[attr];
                    } // endFor
                } // endIf
                if (callback && typeof callback === 'function') callback(err, obj);
            });
        };
        /**
         * Promise-version of Adapter.getForeignObject
         */
        that.getForeignObjectAsync = tools.promisify(that.getForeignObject, that);

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
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot delete object: ' + err);
         *            }
         *        </code></pre>
         */
        that.delObject = function delObject(id, options, callback) {
            // delObject does the same as delForeignObject, but fixes the ID first
            id = that._fixId(id);
            that.delForeignObject(id, options, callback);
        };
        /**
         * Promise-version of Adapter.delObject
         */
        that.delObjectAsync = tools.promisify(that.delObject, that);

        /**
         * Delete any object.
         *
         * The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".
         *
         * @alias delForeignObject
         * @memberof Adapter
         * @param {string} id exactly object ID (with namespace)
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot delete object: ' + err);
         *            }
         *        </code></pre>
         */
        that.delForeignObject = function delForeignObject(id, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            that.objects.getObject(id, options, (err, obj) => {
                if (err || !obj) {
                    return (typeof callback === 'function') && callback(err || tools.ERRORS.ERROR_NOT_FOUND);
                } else {
                    that.objects.delObject(obj._id, options, err => {
                        if (err || obj.type !== 'state') {
                            return (typeof callback === 'function') && callback(err);
                        } else {
                            that.delForeignState(id, options, callback);
                        }
                    });
                }
            });

        };
        /**
         * Promise-version of Adapter.delForeignObject
         */
        that.delForeignObjectAsync = tools.promisify(that.delForeignObject, that);

        /**
         * Subscribe for the changes of objects in this instance.
         *
         * @alias subscribeObjects
         * @memberof Adapter
         * @param {string} pattern pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces
         * @param {object} options optional user context
         * @param {function} callback optional returns result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot subscribe object: ' + err);
         *            }
         *        </code></pre>
         */
        that.subscribeObjects = function subscribeObjects(pattern, options, callback) {
            if (pattern === '*') {
                that.objects.subscribe(that.namespace + '.*', options, callback);
            } else {
                pattern = that._fixId(pattern, true);
                that.objects.subscribe(pattern, options, callback);
            }
        };
        /**
         * Promise-version of Adapter.subscribeObjects
         */
        that.subscribeObjectsAsync = tools.promisify(that.subscribeObjects, that);

        /**
         * Unsubscribe on the changes of objects in this instance.
         *
         * @alias unsubscribeObjects
         * @memberof Adapter
         * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
         * @param {object} options optional user context
         * @param {function} callback optional returns result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
         *            }
         *        </code></pre>
         */
        that.unsubscribeObjects = function unsubscribeObjects(pattern, options, callback) {
            if (pattern === '*') {
                that.objects.unsubscribe(that.namespace + '.*', options, callback);
            } else {
                pattern = that._fixId(pattern, true);
                that.objects.unsubscribe(pattern, options, callback);
            }
        };
        /**
         * Promise-version of Adapter.unsubscribeObjects
         */
        that.unsubscribeObjectsAsync = tools.promisify(that.unsubscribeObjects, that);

        /**
         * Subscribe for the changes of objects in any instance.
         *
         * @alias subscribeForeignObjects
         * @memberof Adapter
         * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns
         * @param {object} options optional user context
         * @param {function} callback optional returns result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot subscribe object: ' + err);
         *            }
         *        </code></pre>
         */
        that.subscribeForeignObjects = function subscribeObjects(pattern, options, callback) {
            that.objects.subscribe(pattern, options, callback);
        };
        /**
         * Promise-version of Adapter.subscribeForeignObjects
         */
        that.subscribeForeignObjectsAsync = tools.promisify(that.subscribeForeignObjects, that);

        /**
         * Unsubscribe for the patterns on all objects.
         *
         * @alias unsubscribeForeignObjects
         * @memberof Adapter
         * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
         * @param {object} options optional user context
         * @param {function} callback optional returns result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
         *            }
         *        </code></pre>
         */
        that.unsubscribeForeignObjects = function unsubscribeForeignObjects(pattern, options, callback) {
            if (!pattern) pattern = '*';
            that.objects.unsubscribe(pattern, options, callback);
        };
        /**
         * Promise-version of Adapter.unsubscribeForeignObjects
         */
        that.unsubscribeForeignObjectsAsync = tools.promisify(that.unsubscribeForeignObjects, that);

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
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *              // obj is {id: id}
         *              if (err) adapter.log.error('Cannot write object: ' + err);
         *            }
         *        </code></pre>
         */
        that.setObjectNotExists = function setObjectNotExists(id, obj, options, callback) {

            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            id = that._fixId(id);

            if (obj.children || obj.parent) {
                logger.warn(that.namespace + ' Do not use parent or children for ' + id);
            }

            that.objects.getObject(id, options, (err, _obj) => {
                if (!_obj) {
                    if (!obj.from) obj.from = 'system.adapter.' + that.namespace;
                    if (!obj.user) obj.user = (options ? options.user : '') || 'system.user.admin';
                    if (!obj.ts) obj.ts = Date.now();

                    setObjectWithDefaultValue(id, obj, callback);
                } else {
                    if (typeof callback === 'function') callback(null);
                }
            });
        };
        /**
         * Promise-version of Adapter.setObjectNotExists
         */
        that.setObjectNotExistsAsync = tools.promisify(that.setObjectNotExists, that);

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
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *              // obj is {id: id}
         *              if (err) adapter.log.error('Cannot write object: ' + err);
         *            }
         *        </code></pre>
         */
        that.setForeignObjectNotExists = function setForeignObjectNotExists(id, obj, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            that.objects.getObject(id, options, (err, _obj) => {
                if (!_obj) {
                    if (!obj.from) obj.from = 'system.adapter.' + that.namespace;
                    if (!obj.user) obj.user = (options ? options.user : '') || 'system.user.admin';
                    if (!obj.ts) obj.ts = Date.now();

                    setObjectWithDefaultValue(id, obj, callback);
                } else {
                    if (typeof callback === 'function') callback(null);
                }
            });
        };
        /**
         * Promise-version of Adapter.setForeignObjectNotExists
         */
        that.setForeignObjectNotExistsAsync = tools.promisify(that.setForeignObjectNotExists, that);

        that._DCS2ID = function (device, channel, stateOrPoint) {
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

        that.createDevice = function createDevice(deviceName, common, _native, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!deviceName) {
                logger.error('Try to create device with empty name!');
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

            that.setObjectNotExists(deviceName, {
                type:     'device',
                common:   common,
                native:   _native
            }, options, callback);
        };
        /**
         * Promise-version of Adapter.createDevice
         */
        that.createDeviceAsync = tools.promisify(that.createDevice, that);

        // name of channel must be in format "channel"
        that.createChannel = function createChannel(parentDevice, channelName, roleOrCommon, _native, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!channelName) throw 'Try to create channel without name!';

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

            if (parentDevice) parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            channelName  = channelName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            channelName  = that._DCS2ID(parentDevice, channelName);

            _native = _native || {};

            const obj = {
                type:     'channel',
                common:   common,
                native:   _native
            };

            that.setObjectNotExists(channelName, obj, options, callback);
        };
        /**
         * Promise-version of Adapter.createChannel
         */
        that.createChannelAsync = tools.promisify(that.createChannel, that);

        that.createState = function createState(parentDevice, parentChannel, stateName, roleOrCommon, _native, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!stateName) throw 'Empty name is not allowed!';

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
                logger.error(that.namespace + ' Try to create state ' + (parentDevice ? (parentDevice + '.') : '') + parentChannel + '.' + stateName + ' without role');
                return;
            }

            if (parentDevice)  parentDevice  = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            if (parentChannel) parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            stateName = stateName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            const id = that._fixId({device: parentDevice, channel: parentChannel, state: stateName});

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
                            logger.error(that.namespace + ' ' + err);
                            if (callback) callback(err);
                            return;
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
                            logger.error(that.namespace + ' ' + err);
                            if (callback) callback(err);
                            return;
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
                            err = 'Wrong type of ' + id + '.common.def';
                            logger.error(that.namespace + ' ' + err);
                            if (callback) callback(err);
                            return;
                        } else {
                            common.def = def;
                        }
                    }
                }
                if (common.min !== undefined && common.max !== undefined && min > max) {
                    common.max = min;
                    common.min = max;
                }
                if (common.def !== undefined && common.min !== undefined && def < min) common.def = min;
                if (common.def !== undefined && common.max !== undefined && def > max) common.def = max;
            }

            that.setObjectNotExists(id, {
                type:     'state',
                common:   common,
                native:   _native
            }, options, callback);

            if(common.def !== undefined) {
                if(common.defAck !== undefined) {
                    that.setState(id, common.def, common.defAck, options);
                } else {
                    that.setState(id, common.def, options);
                }
            } else {
                that.setState(id, null, true, options);
            }
        };
        /**
         * Promise-version of Adapter.createState
         */
        that.createStateAsync = tools.promisify(that.createState, that);

        /**
         * Delete device with all its channels and states.
         *
         * @alias deleteDevice
         * @memberof Adapter
         * @param {string} deviceName is the part of ID like: adapter.instance.<deviceName>
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, obj) {
         *              // obj is {id: id}
         *              if (err) adapter.log.error('Cannot write object: ' + err);
         *            }
         *        </code></pre>
         */
        that.deleteDevice = function deleteDevice(deviceName, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            deviceName = deviceName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            if (!that._namespaceRegExp.test(deviceName)) deviceName = that.namespace + '.' + deviceName;

            that.objects.getObjectView('system', 'device', {startkey: deviceName, endkey: deviceName}, options, (err, res) => {
                if (err || !res || !res.rows) {
                    if (typeof callback === 'function') callback(err);
                    callback = null;
                    return;
                }
                let cnt = 0;
                if (res.rows.length > 1) {
                    logger.warn('Found more than one device ' + deviceName);
                }

                for (let t = 0; t < res.rows.length; t++) {
                    cnt++;
                    that.delObject(res.rows[t].id, options, err => {
                        if (err) {
                            if (typeof callback === 'function') callback(err);
                            callback = null;
                            return;
                        }

                        if (!--cnt) {
                            let _cnt = 0;
                            _cnt++;
                            // read channels of device
                            that.objects.getObjectView('system', 'channel', {startkey: deviceName + '.', endkey: deviceName + '.\u9999'}, options, (err, res) => {
                                _cnt--;
                                if (err) {
                                    if (typeof callback === 'function') callback(err);
                                    callback = null;
                                    return;
                                }
                                for (let k = 0; k < res.rows.length; k++) {
                                    _cnt++;
                                    that.deleteChannel(deviceName, res.rows[k].id, options, err => {
                                        if (!--_cnt) {
                                            if (typeof callback === 'function') callback(err);
                                            callback = null;
                                        } else {
                                            if (err) {
                                                if (typeof callback === 'function') callback(err);
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
                            that.objects.getObjectView('system', 'state', {startkey: deviceName + '.', endkey: deviceName + '.\u9999'}, options, (err, res) => {
                                _cnt--;
                                if (err) {
                                    if (typeof callback === 'function') callback(err);
                                    callback = null;
                                    return;
                                }
                                for (let k = 0; k < res.rows.length; k++) {
                                    _cnt++;
                                    that.deleteState(deviceName, '', res.rows[k].id, options, err => {
                                        if (!--_cnt) {
                                            if (typeof callback === 'function') callback(err);
                                            callback = null;
                                        } else {
                                            if (err) {
                                                if (typeof callback === 'function') callback(err);
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
        that.deleteDeviceAsync = tools.promisify(that.deleteDevice, that);

        that.addChannelToEnum = function addChannelToEnum(enumName, addTo, parentDevice, channelName, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (parentDevice) {
                if (that._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }
                parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (that._namespaceRegExp.test(channelName)) {
                channelName = channelName.substring(that.namespace.length + 1);
            }
            if (parentDevice && channelName.substring(0, parentDevice.length) === parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            const objId = that.namespace + '.' + that._DCS2ID(parentDevice, channelName);

            if (addTo.match(/^enum\./)) {
                this.objects.getObject(addTo, options, (err, obj) => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                        return;
                    } else if (obj) {
                        const pos = obj.common.members.indexOf(objId);
                        if (pos === -1) {
                            obj.common.members.push(objId);
                            obj.from = 'system.adapter.' + that.namespace;
                            obj.user = (options ? options.user : '') || 'system.user.admin';
                            obj.ts = Date.now();

                            this.objects.setObject(obj._id, obj, options, callback);
                        }
                    }
                });
            } else {
                if (enumName.match(/^enum\./)) enumName = enumName.substring(5);

                this.objects.getObject('enum.' + enumName + '.' + addTo, options, (err, obj) => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                        return;
                    }

                    if (obj) {
                        const pos = obj.common.members.indexOf(objId);
                        if (pos === -1) {
                            obj.common.members.push(objId);

                            obj.from = 'system.adapter.' + that.namespace;
                            obj.user = (options ? options.user : '') || 'system.user.admin';
                            obj.ts = Date.now();

                            this.objects.setObject(obj._id, obj, options, callback);
                        } else {
                            if (callback) callback();
                        }
                    } else {
                        // Create enum
                        this.objects.setObject('enum.' + enumName + '.' + addTo, {
                            common: {
                                name: addTo,
                                members: [objId]
                            },
                            from: 'system.adapter.' + that.namespace,
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
        that.addChannelToEnumAsync = tools.promisify(that.addChannelToEnum, that);

        that.deleteChannelFromEnum = function deleteChannelFromEnum(enumName, parentDevice, channelName, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (parentDevice) {
                if (parentDevice.substring(0, that.namespace.length) === that.namespace) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }
                parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (channelName && channelName.substring(0, that.namespace.length) === that.namespace) {
                channelName = channelName.substring(that.namespace.length + 1);
            }
            if (parentDevice && channelName && channelName.substring(0, parentDevice.length) === parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName || '';
            channelName = channelName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            const objId = that.namespace + '.' + that._DCS2ID(parentDevice, channelName);

            if (enumName) {
                enumName = 'enum.' + enumName + '.';
            } else {
                enumName = 'enum.';
            }

            this.objects.getObjectView('system', 'enum', {startkey: enumName, endkey: enumName + '\u9999'}, options, (err, res) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                    return;
                }
                if (res) {
                    let count = 0;
                    for (let i = 0; i < res.rows.length; i++) {
                        count++;
                        this.objects.getObject(res.rows[i].id, options, (err, obj) => {
                            if (err) {
                                if (typeof callback === 'function') callback(err);
                                callback = null;
                                return;
                            } else if (obj && obj.common && obj.common.members) {
                                const pos = obj.common.members.indexOf(objId);
                                if (pos !== -1) {
                                    obj.common.members.splice(pos, 1);
                                    count++;
                                    obj.from = 'system.adapter.' + that.namespace;
                                    obj.user = (options ? options.user : '') || 'system.user.admin';
                                    obj.ts = Date.now();

                                    this.objects.setObject(obj._id, obj, options, err => {
                                        if (!--count && callback) {
                                            callback(err);
                                        } else {
                                            if (err) {
                                                if (typeof callback === 'function') callback(err);
                                                callback = null;
                                            }
                                        }
                                    });
                                }
                            }
                            if (!--count && callback) callback(err);
                        });
                    }
                } else if (callback) {
                    callback (err);
                }
            });
        };
        /**
         * Promise-version of Adapter.deleteChannelFromEnum
         */
        that.deleteChannelFromEnumAsync = tools.promisify(that.deleteChannelFromEnum, that);

        that.deleteChannel = function deleteChannel(parentDevice, channelName, options, callback) {
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
            if (!parentDevice) parentDevice = '';
            this.deleteChannelFromEnum('', parentDevice, channelName);
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

            logger.info(this.namespace + ' Delete channel ' + channelName);

            this.objects.getObjectView('system', 'channel', {startkey: channelName, endkey: channelName}, options, (err, res) => {
                if (err || !res || !res.rows) {
                    if (typeof callback === 'function') callback(err);
                    callback = null;
                    return;
                }
                let cnt = 0;
                res.rows.length > 1 && logger.warn('Found more than one channel ' + channelName);

                for (let t = 0; t < res.rows.length; t++) {
                    cnt++;
                    this.delObject(res.rows[t].id, options, err => {
                        if (err) {
                            if (typeof callback === 'function') callback(err);
                            callback = null;
                            return;
                        }
                        if (!--cnt) {
                            this.objects.getObjectView('system', 'state', {startkey: channelName + '.', endkey: channelName + '.\u9999'}, options, (err, res) => {
                                if (err || !res || !res.rows) {
                                    if (typeof callback === 'function') callback(err);
                                    callback = null;
                                    return;
                                }
                                let _cnt = 0;
                                for (let k = 0; k < res.rows.length; k++) {
                                    _cnt++;
                                    this.deleteState(_parentDevice, _channelName, res.rows[k].id, options, err => {
                                        if (!--_cnt && callback) {
                                            callback(err);
                                        } else {
                                            if (err) {
                                                if (typeof callback === 'function') callback(err);
                                                callback = null;
                                            }
                                        }
                                    });
                                }
                                if (!_cnt && callback) callback();
                            });
                        }
                    });
                }
                if (!cnt && callback) callback();
            });
        };
        /**
         * Promise-version of Adapter.deleteChannel
         */
        that.deleteChannelAsync = tools.promisify(that.deleteChannel, that);

        that.deleteState = function deleteState(parentDevice, parentChannel, stateName, options, callback) {
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

            that.deleteStateFromEnum('', parentDevice, parentChannel, stateName, options);

            if (parentDevice) {
                if (that._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }

                parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (parentChannel) {
                if (that._namespaceRegExp.test(parentChannel)) {
                    parentChannel = parentChannel.substring(that.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (that._namespaceRegExp.test(stateName)) {
                stateName = stateName.substring(that.namespace.length + 1);
            }
            if (parentDevice && stateName.substring(0, parentDevice.length) === parentDevice) {
                stateName = stateName.substring(parentDevice.length + 1);
            }
            if (parentChannel && stateName.substring(0, parentChannel.length) === parentChannel) {
                stateName = stateName.substring(parentChannel.length + 1);
            }
            stateName = stateName || '';
            stateName = stateName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            const _name = that._DCS2ID(parentDevice, parentChannel, stateName);
            that.delObject(_name, options, callback);
        };
        /**
         * Promise-version of Adapter.deleteState
         */
        that.deleteStateAsync = tools.promisify(that.deleteState, that);

        that.getDevices = function getDevices(options, callback) {
            if (typeof options === 'function' && typeof callback === 'object') {
                const tmp = callback;
                callback = options;
                options = tmp;
            }
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            that.objects.getObjectView('system', 'device', {startkey: that.namespace + '.', endkey: that.namespace + '.\u9999'}, options, (err, obj) => {
                if (callback) {
                    if (obj.rows.length) {
                        const res = [];
                        for (let i = 0; i < obj.rows.length; i++) {
                            res.push(obj.rows[i].value);
                        }
                        callback(null, res);
                    } else {
                        callback(err, []);
                    }
                }
            });
        };
        /**
         * Promise-version of Adapter.getDevices
         */
        that.getDevicesAsync = tools.promisify(that.getDevices, that);

        that.getChannelsOf = function getChannelsOf(parentDevice, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (typeof parentDevice === 'function') {
                callback = parentDevice;
                parentDevice = null;
            }
            if (!parentDevice) parentDevice = '';

            if (parentDevice && that._namespaceRegExp.test(parentDevice)) {
                parentDevice = parentDevice.substring(that.namespace.length + 1);
            }

            parentDevice  = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            parentDevice = that.namespace + (parentDevice ? ('.' + parentDevice) : '');
            that.objects.getObjectView('system', 'channel', {startkey: parentDevice + '.', endkey: parentDevice + '.\u9999'}, options, (err, obj) => {
                if (callback) {
                    if (obj.rows.length) {
                        const res = [];
                        for (let i = 0; i < obj.rows.length; i++) {
                            res.push(obj.rows[i].value);
                        }
                        callback(null, res);
                    } else {
                        callback(err, []);
                    }
                }
            });
        };
        /**
         * Promise-version of Adapter.getChannelsOf
         */
        that.getChannelsOfAsync = tools.promisify(that.getChannelsOf, that);

        that.getChannels = that.getChannelsOf;

        that.getStatesOf = function getStatesOf(parentDevice, parentChannel, options, callback) {
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

            if (!parentDevice) {
                parentDevice = '';
            } else {
                if (that._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }

                parentDevice  = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (!parentChannel) {
                parentChannel = '';
            } else if (that._namespaceRegExp.test(parentChannel)) {
                parentChannel = parentChannel.substring(that.namespace.length + 1);
            }

            if (parentDevice && parentChannel && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                parentChannel = parentChannel.substring(parentDevice.length + 1);
            }

            parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            const id = that.namespace + '.' + that._DCS2ID(parentDevice, parentChannel, true);

            that.objects.getObjectView('system', 'state', {startkey: id, endkey: id + '\u9999'}, options, (err, obj) => {
                if (callback) {
                    const res = [];
                    if (obj.rows.length) {
                        let read = 0;
                        for (let i = 0; i < obj.rows.length; i++) {
                            read++;
                            that.objects.getObject(obj.rows[i].id, function (err, subObj) {
                                if (subObj) res.push(subObj);

                                if (!--read) callback(null, res);
                            });
                        }
                    } else {
                        callback(null, res);
                    }
                }
            });
        };
        /**
         * Promise-version of Adapter.getStatesOf
         */
        that.getStatesOfAsync = tools.promisify(that.getStatesOf, that);

        that.addStateToEnum = function addStateToEnum(enumName, addTo, parentDevice, parentChannel, stateName, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (parentDevice) {
                if (that._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }

                parentDevice  = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (parentChannel) {
                if (that._namespaceRegExp.test(parentChannel)) {
                    parentChannel = parentChannel.substring(that.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (that._namespaceRegExp.test(stateName)) {
                stateName = stateName.substring(that.namespace.length + 1);
            }
            if (parentDevice && stateName.substring(0, parentDevice.length) === parentDevice) {
                stateName = stateName.substring(parentDevice.length + 1);
            }
            if (parentChannel && stateName.substring(0, parentChannel.length) === parentChannel) {
                stateName = stateName.substring(parentChannel.length + 1);
            }
            stateName = stateName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            const objId = that._fixId({device: parentDevice, channel: parentChannel, state: stateName});

            if (addTo.match(/^enum\./)) {
                that.objects.getObject(addTo, options, (err, obj) => {
                    if (!err && obj) {
                        const pos = obj.common.members.indexOf(objId);
                        if (pos === -1) {
                            obj.common.members.push(objId);
                            obj.from = 'system.adapter.' + that.namespace;
                            obj.user = (options ? options.user : '') || 'system.user.admin';
                            obj.ts = Date.now();
                            that.objects.setObject(obj._id, obj, options, callback);
                        } else if (callback) {
                            callback();
                        }
                    } else {
                        if (callback) callback(err || tools.ERRORS.ERROR_NOT_FOUND);
                    }
                });
            } else {
                if (enumName.match(/^enum\./)) enumName = enumName.substring(5);

                that.objects.getObject('enum.' + enumName + '.' + addTo, options, (err, obj) => {
                    if (!err && obj) {
                        const pos = obj.common.members.indexOf(objId);
                        if (pos === -1) {
                            obj.common.members.push(objId);
                            obj.from = 'system.adapter.' + that.namespace;
                            obj.user = (options ? options.user : '') || 'system.user.admin';
                            obj.ts = Date.now();
                            that.objects.setObject(obj._id, obj, callback);
                        } else if (callback) {
                            callback();
                        }
                    } else {
                        if (err) {
                            if (typeof callback === 'function') callback(err);
                            return;
                        }

                        // Create enum
                        that.objects.setObject('enum.' + enumName + '.' + addTo, {
                            common: {
                                name: addTo,
                                members: [objId]
                            },
                            from: 'system.adapter.' + that.namespace,
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
        that.addStateToEnumAsync = tools.promisify(that.addStateToEnum, that);

        that.deleteStateFromEnum = function deleteStateFromEnum(enumName, parentDevice, parentChannel, stateName, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (parentDevice) {
                if (that._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }

                parentDevice  = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (parentChannel) {
                if (that._namespaceRegExp.test(parentChannel)) {
                    parentChannel = parentChannel.substring(that.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
            }

            if (that._namespaceRegExp.test(stateName)) {
                stateName = stateName.substring(that.namespace.length + 1);
            }
            if (parentDevice && stateName.substring(0, parentDevice.length) === parentDevice) {
                stateName = stateName.substring(parentDevice.length + 1);
            }
            if (parentChannel && stateName.substring(0, parentChannel.length) === parentChannel) {
                stateName = stateName.substring(parentChannel.length + 1);
            }
            stateName = stateName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

            const objId = that._fixId({device: parentDevice, channel: parentChannel, state: stateName}, false, 'state');

            if (enumName) {
                enumName = 'enum.' + enumName + '.';
            } else {
                enumName = 'enum.';
            }

            that.objects.getObjectView('system', 'enum', {startkey: enumName, endkey: enumName + '\u9999'}, options,  (err, res) => {
                if (!err && res) {
                    let count = 0;
                    for (let i = 0; i < res.rows.length; i++) {
                        count++;
                        that.objects.getObject(res.rows[i].id, options, (err, obj) => {
                            if (err) {
                                if (callback) {
                                    callback(err);
                                    callback = null;
                                }
                                return;
                            } else if (obj && obj.common && obj.common.members) {
                                const pos = obj.common.members.indexOf(objId);
                                if (pos !== -1) {
                                    obj.common.members.splice(pos, 1);
                                    count++;
                                    obj.from = 'system.adapter.' + that.namespace;
                                    obj.user = (options ? options.user : '') || 'system.user.admin';
                                    obj.ts = Date.now();
                                    that.objects.setObject(obj._id, obj, err => {
                                        if (!--count && callback) {
                                            callback(err);
                                            callback = null;
                                        }
                                    });
                                }
                            }
                            if (!--count && callback) {
                                callback(err);
                                callback = null;
                            }
                        });
                    }
                    if (!count && callback) {
                        callback();
                        callback = null;
                    }
                } else if (callback) {
                    callback(err);
                    callback = null;
                }
            });
        };
        /**
         * Promise-version of Adapter.deleteStateFromEnum
         */
        that.deleteStateFromEnumAsync = tools.promisify(that.deleteStateFromEnum, that);

        that.chmodFile = function chmodFile(_adapter, path, options, callback) {
            if (_adapter === null) _adapter = that.name;

            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            that.objects.chmodFile(_adapter, path, options, callback);
        };
        /**
         * Promise-version of Adapter.chmodFile
         */
        that.chmodFileAsync = tools.promisify(that.chmodFile, that, ['entries', 'id']);

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
         * @param {function} callback return result
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
        that.readDir = function readDir(_adapter, path, options, callback) {
            if (_adapter === null) _adapter = that.name;

            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            that.objects.readDir(_adapter, path, options, callback);
        };
        /**
         * Promise-version of Adapter.readDir
         */
        that.readDirAsync = tools.promisify(that.readDir, that);

        that.unlink = function unlink(_adapter, name, options, callback) {
            if (_adapter === null) _adapter = that.name;

            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            that.objects.unlink(_adapter, name, options, callback);
        };
        /**
         * Promise-version of Adapter.unlink
         */
        that.unlinkAsync = tools.promisify(that.unlink, that);

        that.delFile = that.unlink;
        that.delFileAsync = that.unlinkAsync;

        that.rename = function rename(_adapter, oldName, newName, options, callback) {
            if (_adapter === null) _adapter = that.name;
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            that.objects.rename(_adapter, oldName, newName, options, callback);
        };
        /**
         * Promise-version of Adapter.rename
         */
        that.renameAsync = tools.promisify(that.rename, that);

        that.mkdir = function mkdir(_adapter, dirname, options, callback) {
            if (_adapter === null) _adapter = that.name;
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            that.objects.mkdir(_adapter, dirname, options, callback);
        };
        /**
         * Promise-version of Adapter.mkdir
         */
        that.mkdirAsync = tools.promisify(that.mkdir, that);

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
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, data) {
         *                // data is utf8 or binary Buffer depends on the file extension.
         *            }
         *        </code></pre>
         */
        that.readFile = function readFile(_adapter, filename, options, callback) {
            if (_adapter === null) _adapter = that.name;

            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            that.objects.readFile(_adapter, filename, options, callback);
        };
        /**
         * Promise-version of Adapter.readFile
         */
        that.readFileAsync = tools.promisify(that.readFile, that, ['file', 'mimeType']);

        /**
         * Write file to DB.
         *
         * This function writes the content of one file into DB for given adapter and file name.
         * <pre><code>
         *      adapter.writeFile('vis.0', '/main/vis-views.json', function (err, data) {
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
         * @param {object} data data as UTF8 string or buffer depends on the file extension.
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err) {
         *
         *            }
         *        </code></pre>
         */
        that.writeFile = function writeFile(_adapter, filename, data, options, callback) {
            if (_adapter === null) _adapter = that.name;

            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            that.objects.writeFile(_adapter, filename, data, options, callback);
        };
        /**
         * Promise-version of Adapter.writeFile
         */
        that.writeFileAsync = tools.promisify(that.writeFile, that);

        that.formatValue = function (value, decimals, _format) {
            if (typeof decimals !== 'number') {
                _format  = decimals;
                decimals = 2;
            }

            const format = (!_format || _format.length !== 2) ? ((that.isFloatComma === undefined) ? '.,' : ((that.isFloatComma) ? '.,' : ',.')) : _format;

            if (typeof value !== 'number') value = parseFloat(value);
            return isNaN(value) ? '' : value.toFixed(decimals).replace(format[0], format[1]).replace(/\B(?=(\d{3})+(?!\d))/g, format[0]);
        };

        that.formatDate = function formatDate(dateObj, isDuration, _format) {

            if ((typeof isDuration === 'string' && isDuration.toLowerCase() === 'duration') || isDuration === true) {
                isDuration  = true;
            }
            if (typeof isDuration !== 'boolean') {
                _format    = isDuration;
                isDuration = false;
            }

            if (!dateObj) return '';
            const type = typeof dateObj;
            if (type === 'string') dateObj = new Date(dateObj);

            if (type !== 'object') {
                const j = parseInt(dateObj, 10);
                if (j == dateObj) {
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
            const format = _format || that.dateFormat || 'DD.MM.YYYY';

            if (isDuration) dateObj.setMilliseconds(dateObj.getMilliseconds() + dateObj.getTimezoneOffset() * 60 * 1000);

            const validFormatChars = 'YJГMМDTДhSчmмsс';
            let s      = '';
            let result = '';

            function put(s) {
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
                        if (s.length === 2) v %= 100;
                        if (v <= 9) v = '0' + v;
                        break;
                    case 'MM':
                    case 'M':
                    case 'ММ':
                    case 'М':
                        v = dateObj.getMonth() + 1;
                        if ((v < 10) && (s.length === 2)) v = '0' + v;
                        break;
                    case 'DD':
                    case 'TT':
                    case 'D':
                    case 'T':
                    case 'ДД':
                    case 'Д':
                        v = dateObj.getDate();
                        if ((v < 10) && (s.length === 2)) v = '0' + v;
                        break;
                    case 'hh':
                    case 'SS':
                    case 'h':
                    case 'S':
                    case 'чч':
                    case 'ч':
                        v = dateObj.getHours();
                        if ((v < 10) && (s.length === 2)) v = '0' + v;
                        break;
                    case 'mm':
                    case 'm':
                    case 'мм':
                    case 'м':
                        v = dateObj.getMinutes();
                        if ((v < 10) && (s.length === 2)) v = '0' + v;
                        break;
                    case 'ss':
                    case 's':
                    case 'cc':
                    case 'c':
                        v = dateObj.getSeconds();
                        if ((v < 10) && (s.length === 2)) v = '0' + v;
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
            }

            for (let i = 0; i < format.length; i++) {
                if (validFormatChars.indexOf(format[i]) >= 0)
                    s += format[i];
                else {
                    put(s);
                    s = '';
                    result += format[i];
                }
            }
            put(s);
            return result;
        };
    }

    function getGroups(ids, callback, i) {
        i = i || 0;
        if (!ids || i >= ids.length) {
            callback();
        } else if (that.groups[ids] !== undefined) {
            setImmediate(getGroups, ids, callback, i + 1);
        } else {
            that.getForeignObject(ids[i], (err, obj) => {
                that.groups[ids] = obj || {};
                setImmediate(getGroups, ids, callback, i + 1);
            });
        }
    }

    // Cache will be cleared if user or group changes.. Important! only if subscribed.
    function getUserGroups(options, callback) {
        if (that.users[options.user]) {
            options.groups = that.users[options.user].groups;
            options.acl    = that.users[options.user].acl;
            return callback(options);
        }
        options.groups = [];
        that.getForeignObject(options.user, (err, userAcl) => {
            if (!userAcl) {
                // User does not exists
                logger.error(that.namespace + ' unknown user "' + options.user + '"');
                callback(options);
            } else {
                that.getForeignObjects('*', 'group', (err, groups) => {
                    // aggregate all groups permissions, where this user is
                    if (groups) {
                        for (const g in groups) {
                            if (groups.hasOwnProperty(g) &&
                                groups[g] &&
                                groups[g].common &&
                                groups[g].common.members &&
                                groups[g].common.members.indexOf(options.user) !== -1) {
                                options.groups.push(groups[g]._id);
                            }
                        }
                    }

                    // read all groups for this user
                    that.users[options.user] = {groups: options.groups, acl: (userAcl.common && userAcl.common.acl) || {}};
                    getGroups(options.groups, () => {
                        // combine all rights
                        const user = that.users[options.user];
                        for (let g = 0; g < options.groups.length; g++) {
                            const gName = options.groups[g];
                            if (!that.groups[gName] || !that.groups[gName].common || !that.groups[gName].common.acl) continue;
                            const group = that.groups[gName];

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
                        callback(options);
                    });
                });
            }
        });
    }

    function checkStates(ids, options, command, callback) {
        if (!options.groups) {
            return getUserGroups(options, () => checkStates(ids, options, command, callback));
        }

        if (ids instanceof Array) {
            const errors = [];
            let count = ids.length;
            if (count === 0) {
                callback(null, ids);
                return;
            }
            for (let i = 0; i < ids.length; i++) {
                checkStates(ids[i], options, command, (err, obj) => {
                    if (err && obj) {
                        errors.push(obj._id);
                    }

                    if (!--count) {
                        if (errors.length) {
                            for (let j = ids.length - 1; j >= 0; j--) {
                                if (errors.indexOf(ids[j]) !== -1) {
                                    ids.splice(j, 1);
                                }
                            }
                        }

                        callback(null, ids);
                    }
                });
            }
        } else {
            let originalChecked = undefined;
            if (options.checked !== undefined) originalChecked = options.checked;
            options.checked = true;
            that.objects.getObject(ids, options, (err, obj) => {
                if (originalChecked !== undefined) {
                    options.checked = originalChecked;
                } else {
                    options.checked = undefined;
                }
                if (err) {
                    callback(err, {_id: ids});
                    return;
                } else {
                    const limitToOwnerRights = options.limitToOwnerRights === true;
                    if (obj && obj.acl) {
                        if (obj.acl.state === undefined) obj.acl.state = obj.acl.object;
                        if (obj.acl.state !== undefined) {
                            // If user is owner
                            if (options.user === obj.acl.owner) {
                                if (command === 'setState' || command === 'delState') {
                                    if (command === 'delState' && !options.acl.state['delete']) {
                                        logger.warn(`Permission error for user "${options.user} on "${ids}": ${command}`);
                                        return callback('permissionError', {_id: ids});
                                    } else
                                    if (command === 'setState' && !options.acl.state.write) {
                                        logger.warn(`Permission error for user "${options.user} on "${ids}": ${command}`);
                                        return callback('permissionError', {_id: ids});
                                    } else
                                    if (!(obj.acl.state & ACCESS_USER_WRITE)) {
                                        logger.warn(`Permission error for user "${options.user} on "${ids}": ${command}`);
                                        return callback('permissionError', {_id: ids});
                                    }
                                } else if (command === 'getState') {
                                    if (!(obj.acl.state & ACCESS_USER_READ) || !options.acl.state.read) {
                                        logger.warn(`Permission error for user "${options.user} on "${ids}": ${command}`);
                                        return callback('permissionError', {_id: ids});
                                    }
                                } else {
                                    logger.warn('Called unknown command:' + command);
                                }
                            } else if (options.groups.indexOf(obj.acl.ownerGroup) !== -1 && !limitToOwnerRights) {
                                if (command === 'setState' || command === 'delState') {
                                    if (command === 'delState' && !options.acl.state['delete']) {
                                        logger.warn(`Permission error for user "${options.user} on "${ids}": ${command}`);
                                        return callback('permissionError', {_id: ids});
                                    } else
                                    if (command === 'setState' && !options.acl.state.write) {
                                        logger.warn(`Permission error for user "${options.user} on "${ids}": ${command}`);
                                        return callback('permissionError', {_id: ids});
                                    } else
                                    if (!(obj.acl.state & ACCESS_GROUP_WRITE)) {
                                        logger.warn(`Permission error for user "${options.user} on "${ids}": ${command}`);
                                        callback('permissionError', {_id: ids});
                                        return;
                                    }
                                } else if (command === 'getState') {
                                    if (!(obj.acl.state & ACCESS_GROUP_READ) || !options.acl.state.read) {
                                        logger.warn(`Permission error for user "${options.user} on "${ids}": ${command}`);
                                        callback('permissionError', {_id: ids});
                                        return;
                                    }
                                } else {
                                    logger.warn('Called unknown command:' + command);
                                }
                            } else if (!limitToOwnerRights) {
                                if (command === 'setState' || command === 'delState') {
                                    if (command === 'delState' && !options.acl.state['delete']) {
                                        logger.warn(`Permission error for user "${options.user} on "${ids}": ${command}`);
                                        return callback('permissionError', {_id: ids});
                                    } else
                                    if (command === 'setState' && !options.acl.state.write) {
                                        logger.warn(`Permission error for user "${options.user} on "${ids}": ${command}`);
                                        return callback('permissionError', {_id: ids});
                                    } else if (!(obj.acl.state & ACCESS_EVERY_WRITE)) {
                                        logger.warn('Permission error for user "' + options.user + '": ' + command);
                                        callback('permissionError', {_id: ids});
                                        return;
                                    }
                                } else if (command === 'getState') {
                                    if (!(obj.acl.state & ACCESS_EVERY_READ) || !options.acl.state.read) {
                                        logger.warn('Permission error for user "' + options.user + '": ' + command);
                                        callback('permissionError', {_id: ids});
                                        return;
                                    }
                                } else {
                                    logger.warn('Called unknown command:' + command);
                                    callback('permissionError', {_id: ids});
                                    return;
                                }
                            }
                            else {
                                logger.warn('Permissions limited to Owner rights');
                                callback('permissionError', {_id: ids});
                                return;
                            }
                        }
                        else if (limitToOwnerRights) {
                            logger.warn('Permissions limited to Owner rights');
                            callback('permissionError', {_id: ids});
                            return;
                        }
                    }
                    else if (limitToOwnerRights){
                        logger.warn('Permissions limited to Owner rights');
                        callback('permissionError', {_id: ids});
                        return;
                    }
                }
                callback();
            });
        }
    }

    // find out default history instance
    function getDefaultHistory(callback) {
        if (!that.defaultHistory) {
            // read default history instance from system.config
            return that.getForeignObject('system.config', (err, data) => {
                if (data && data.common) {
                    that.defaultHistory = data.common.defaultHistory;
                }
                if (data && data.native) {
                    systemSecret = data.native.secret;
                }

                // if no default history set
                if (!that.defaultHistory) {
                    // read all adapters
                    that.objects.getObjectView('system', 'instance', {startkey: '', endkey: '\u9999'}, (err, _obj) => {
                        if (_obj) {
                            for (let i = 0; i < _obj.rows.length; i++) {
                                if (_obj.rows[i].value.common && _obj.rows[i].value.common.type === 'storage') {
                                    that.defaultHistory = _obj.rows[i].id.substring('system.adapter.'.length);
                                    break;
                                }
                            }
                        }
                        if (!that.defaultHistory) that.defaultHistory = 'history.0';
                        if (callback) callback();
                    });
                } else {
                    if (callback) callback();
                }
            });
        } else {
            if (callback) callback();

        }
    }

    function pattern2RegEx(pattern) {
        pattern = (pattern || '').toString()
            .replace(/\$/g, '\\$')
            .replace(/\^/g, '\\^');

        if (pattern !== '*') {
            if (pattern[0] === '*' && pattern[pattern.length - 1] !== '*') pattern += '$';
            if (pattern[0] !== '*' && pattern[pattern.length - 1] === '*') pattern = '^' + pattern;
            if (pattern[0] !== '*' && pattern[pattern.length - 1] !== '*') pattern = '^' + pattern + '$';
        }

        pattern = pattern
            .replace(/\?/g, '\\?')
            .replace(/\./g, '\\.')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)')
            .replace(/\[/g, '\\[')
            .replace(/]/g, '\\]')
            .replace(/\*/g, '.*');

        return pattern;
    }

    function _setStateChangedHelper (id, state, callback) {
        that.getForeignState(id, (err, oldState) => {
            if (err) {
                if (typeof callback === 'function') callback(err);
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
                    that.outputCount++;
                    that.states.setState(id, state, (/* err */) => {
                        if (typeof callback === 'function') callback(null, id, false);
                    });
                } else {
                    if (typeof callback === 'function') callback(null, id, true);
                }
            }
        });
    }

    // initStates is called from initAdapter
    function initStates(cb) {
        logger.debug(that.namespace + ' objectDB connected');

        config.states.maxQueue = config.states.maxQueue || 1000;

        // Internal object, but some special adapters want to access it anyway.
        that.states = new States({
            namespace:  that.namespace,
            connection: config.states,
            connected: function () {
                logger.debug(that.namespace + ' statesDB connected');

                // Subscribe for process exit signal
                that.states.subscribe('system.adapter.' + that.namespace + '.sigKill');

                if (options.subscribable) {
                    that.states.subscribe('system.adapter.' + that.namespace + '.subscribes');
                    that.states.getState('system.adapter.' + that.namespace + '.subscribes', (err, state) => {
                        if (!state || !state.val) {
                            that.patterns = {};
                        } else {
                            try {
                                that.patterns = JSON.parse(state.val);
                                for (const p in that.patterns) {
                                    if (that.patterns.hasOwnProperty(p)) {
                                        that.patterns[p].regex = pattern2RegEx(p);
                                    }
                                }
                            } catch (e) {
                                that.patterns = {};
                            }
                        }
                        if (typeof cb === 'function') cb();
                    });
                } else if (typeof cb === 'function') {
                    cb();
                }
            },
            logger: logger,
            change: (id, state) => {
                that.inputCount++;
                if (state === 'null') state = null;

                if (!id || typeof id !== 'string') {
                    console.log('Something is wrong! ' + JSON.stringify(id));
                    return;
                }

                if (id === 'system.adapter.' + that.namespace + '.sigKill') {
                    logger.warn('Got terminate signal. Desired PID: ' + state.val + ' <> own PID ' + process.pid);
                    if (state && state.val !== process.pid && !config.forceIfDisabled) {
                        stop();
                        setTimeout(() => that.terminate(EXIT_CODES.NO_ERROR), 4000);
                    }
                    return;
                }

                // todo remove it as an error with log will be found
                if (id === 'system.adapter.' + that.namespace + '.checkLogging') {
                    checkLogging();
                    return;
                }

                // someone subscribes or unsubscribes from adapter
                if (options.subscribable && id === 'system.adapter.' + that.namespace + '.subscribes') {
                    let subs;
                    try {
                        subs = JSON.parse(state.val || '{}');
                    } catch (e) {
                        subs = {};
                    }
                    for (const p in subs) {
                        if (subs.hasOwnProperty(p)) {
                            subs[p].regex = pattern2RegEx(p);
                        }
                    }

                    that.patterns = subs;
                    if (typeof options.subscribesChange === 'function') {
                        options.subscribesChange(state);
                    } else {
                        that.emit('subscribesChange', state);
                    }
                    return;
                }

                // Clear cache if accidentally got the message about change (Will work for admin and javascript)
                if (id.match(/^system\.user\./) || id.match(/^system\.group\./)) {
                    that.users = {};
                    that.groups = {};
                }

                // If someone want to have log messages
                if (that.logList && id.match(/\.logging$/)) {
                    const instance = id.substring(0, id.length - '.logging'.length);
                    if (logger) logger.debug(that.namespace + ' ' + instance + ': logging ' + (state ? state.val : false));
                    that.logRedirect(state ? state.val : false, instance);
                } else
                if (id === 'log.system.adapter.' + that.namespace) {
                    that.processLog(state);
                } else
                // If this is messagebox
                if (id === 'messagebox.system.adapter.' + that.namespace && state) {
                    // Read it from fifo list
                    that.states.delMessage('system.adapter.' + that.namespace, state._id);
                    const obj = state;
                    if (obj) {
                        // If callback stored for this request
                        if (obj.callback     &&
                            obj.callback.ack &&
                            obj.callback.id  &&
                            that.callbacks   &&
                            that.callbacks['_' + obj.callback.id]) {
                            // Call callback function
                            if (that.callbacks['_' + obj.callback.id].cb) {
                                that.callbacks['_' + obj.callback.id].cb(obj.message);
                                delete that.callbacks['_' + obj.callback.id];
                            }
                            // delete too old callbacks IDs, like garbage collector
                            const now = Date.now();
                            for (const _id in that.callbacks) {
                                if (now - that.callbacks[_id].time > 3600000) delete that.callbacks[_id];
                            }

                        } else {
                            if (options.message) {
                                // Else inform about new message the adapter
                                options.message(obj);
                            }
                            that.emit('message', obj);
                        }
                    }
                } else {
                    if (that.oStates) {
                        if (!state) {
                            delete that.oStates[id];
                        } else {
                            that.oStates[id] = state;
                        }
                    }

                    // It was an error in the calculation
                    if ((options.noNamespace || config.noNamespace) && that._namespaceRegExp.test(id)) {
                        if (typeof options.stateChange === 'function') {
                            options.stateChange(id.substring(that.namespace.length + 1), state);
                        } else {
                            // emit 'stateChange' event instantly
                            setImmediate(function () {
                                that.emit('stateChange', id.slice(that.namespace.length + 1), state);
                            });
                        }

                    } else {
                        if (typeof options.stateChange === 'function') {
                            options.stateChange(id, state);
                        } else {
                            // emit 'stateChange' event instantly
                            setImmediate(function () {
                                that.emit('stateChange', id, state);
                            });
                        }
                    }
                }
            },
            connectTimeout: function (error) {
                if (config.isInstall) {
                    logger && logger.warn(that.namespace + ' no connection to states DB');
                    that.terminate(EXIT_CODES.NO_ERROR);
                } else {
                    logger && logger.error(that.namespace + ' no connection to states DB: ' + (error || ''));
                }
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
         * @param {function} callback optional return result
         *        <pre><code>
         *            function (result) {
         *              // result is target adapter specific and can vary from adapter to adapter
         *              if (!result) adapter.log.error('No response received');
         *            }
         *        </code></pre>
         */
        that.sendTo = function sendTo(instanceName, command, message, callback) {
            if ((typeof message === 'function') && (typeof callback === 'undefined')) {
                callback = message;
                message = undefined;
            }
            if (typeof message === 'undefined') {
                message = command;
                command = 'send';
            }
            const obj = {command: command, message: message, from: 'system.adapter.' + that.namespace};

            if (!instanceName.match(/^system\.adapter\./)) instanceName = 'system.adapter.' + instanceName;

            if (typeof message !== 'object') {
                logger.debug('sendTo "' + command + '" to ' + instanceName + ' from system.adapter.' + that.namespace + ': ' + message);
            } else {
                logger.debug('sendTo "' + command + '" to ' + instanceName + ' from system.adapter.' + that.namespace);
            }

            // If not specific instance
            if (!instanceName.match(/\.[0-9]+$/)) {
                // Send to all instances of adapter
                that.objects.getObjectView('system', 'instance', {startkey: instanceName + '.', endkey: instanceName + '.\u9999'}, (err, _obj) => {
                    if (_obj) {
                        for (let i = 0; i < _obj.rows.length; i++) {
                            that.states.pushMessage(_obj.rows[i].id, obj);
                        }
                    }
                });
            } else {
                if (callback) {
                    if (typeof callback === 'function') {
                        // force subscribe even no messagebox enabled
                        if (!that.common.messagebox && !that.mboxSubscribed) {
                            that.mboxSubscribed = true;
                            that.states.subscribeMessage('system.adapter.' + that.namespace);
                        }

                        obj.callback = {
                            message: message,
                            id:      callbackId++,
                            ack:     false,
                            time:    Date.now()
                        };
                        if (callbackId >= 0xFFFFFFFF) callbackId = 1;
                        if (!that.callbacks) that.callbacks = {};
                        that.callbacks['_' + obj.callback.id] = {cb: callback};

                        // delete too old callbacks IDs
                        const now = Date.now();
                        for (const _id in that.callbacks) {
                            if (now - that.callbacks[_id].time > 3600000) delete that.callbacks[_id];
                        }
                    } else {
                        obj.callback = callback;
                        obj.callback.ack = true;
                    }
                }

                that.states.pushMessage(instanceName, obj);
            }
        };
        /**
         * Promise-version of Adapter.sendTo
         */
        that.sendToAsync = tools.promisifyNoError(that.sendTo, that);

        /**
         * Send message to specific host or to all hosts.
         *
         * This function sends a message to specific host or all hosts.
         * If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.
         *
         * @alias sendToHost
         * @memberof Adapter
         * @param {string} hostName name of the host where the message must be send to. E.g. "myPC" or "system.host.myPC". If argument is empty, the message will be sent to all hosts.
         * @param {string} command command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage)
         * @param {object} message object that will be given as argument for request
         * @param {function} callback optional return result
         *        <pre><code>
         *            function (result) {
         *              // result is target adapter specific and can vary from command to command
         *              if (!result) adapter.log.error('No response received');
         *            }
         *        </code></pre>
         */
        that.sendToHost = function sendToHost(hostName, command, message, callback) {
            if (typeof message === 'undefined') {
                message = command;
                command = 'send';
            }
            const obj = {command: command, message: message, from: 'system.adapter.' + that.namespace};

            if (hostName && !hostName.match(/^system\.host\./)) hostName = 'system.host.' + hostName;

            if (!hostName) {
                // Send to all hosts
                that.objects.getObjectList({startkey: 'system.host.', endkey: 'system.host.' + '\u9999'}, null, (err, res) => {
                    if (!err && res.rows.length) {
                        for (let i = 0; i < res.rows.length; i++) {
                            const parts = res.rows[i].id.split('.');
                            // ignore system.host.name.alive and so on
                            if (parts.length === 3) {
                                that.states.pushMessage(res.rows[i].id, obj);
                            }
                        }
                    }
                });
            } else {
                if (callback) {
                    if (typeof callback === 'function') {
                        // force subscribe even no messagebox enabled
                        if (!that.common.messagebox && !that.mboxSubscribed) {
                            that.mboxSubscribed = true;
                            that.states.subscribeMessage('system.adapter.' + that.namespace);
                        }

                        obj.callback = {
                            message: message,
                            id:      callbackId++,
                            ack:     false,
                            time:    Date.now()
                        };
                        if (callbackId >= 0xFFFFFFFF) callbackId = 1;
                        if (!that.callbacks) that.callbacks = {};
                        that.callbacks['_' + obj.callback.id] = {cb: callback};
                    } else {
                        obj.callback     = callback;
                        obj.callback.ack = true;
                    }
                }

                that.states.pushMessage(hostName, obj);
            }
        };
        /**
         * Promise-version of Adapter.sendToHost
         */
        that.sendToHostAsync = tools.promisifyNoError(that.sendToHost, that);

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
         *      }
         *  </code></pre>
         * @param {boolean} ack optional is command(false) or status(true)
         * @param {object} options optional user context
         * @param {function} callback optional return error and id
         *        <pre><code>
         *            function (err, id) {
         *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
         *            }
         *        </code></pre>
         */
        that.setState = function setState(id, state, ack, options, callback) {
            if (typeof state === 'object' && typeof ack !== 'boolean') {
                callback = options;
                options  = ack;
                ack      = undefined;
            }
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            id = that._fixId(id, false, 'state');

            if (typeof ack === 'function') {
                callback = ack;
                ack = undefined;
            }

            if (typeof state !== 'object' || state === null || state === undefined) state = {val: state};

            if (ack !== undefined) {
                state.ack = ack;
            }

            state.from = 'system.adapter.' + that.namespace;
            state.user = (options ? options.user : '') || 'system.user.admin';

            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'setState', err => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                    } else {
                        that.outputCount++;
                        that.states.setState(id, state, callback);
                    }
                });
            } else {
                that.outputCount++;
                that.states.setState(id, state, callback);
            }
        };
        /**
         * Promise-version of Adapter.setState
         */
        that.setStateAsync = tools.promisify(that.setState, that);

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
         * @param {boolean} ack optional is command(false) or status(true)
         * @param {object} options optional user context
         * @param {function} callback optional return error, id and notChanged
         *        <pre><code>
         *            function (err, id, notChanged) {
         *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
         *              if (!notChanged) adapter.log.debug('Value was changed');
         *            }
         *        </code></pre>
         */
        that.setStateChanged = function setStateChanged(id, state, ack, options, callback) {
            if (typeof state === 'object' && typeof ack !== 'boolean') {
                callback = options;
                options  = ack;
                ack      = undefined;
            }
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            id = that._fixId(id, false, 'state');

            if (typeof ack === 'function') {
                callback = ack;
                ack = undefined;
            }

            if (typeof state !== 'object' || state === null || state === undefined) state = {val: state};

            if (ack !== undefined) {
                state.ack = ack;
            }

            state.from = 'system.adapter.' + that.namespace;
            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'setState', err => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
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
        that.setStateChangedAsync = tools.promisify(that.setStateChanged, that, ['id', 'notChanged']);

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
         *      }
         *  </code></pre>
         * @param {boolean} ack optional is command(false) or status(true)
         * @param {object} options optional user context
         * @param {function} callback optional return error and id
         *        <pre><code>
         *            function (err, id) {
         *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
         *            }
         *        </code></pre>
         */
        that.setForeignState = function setForeignState(id, state, ack, options, callback) {
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

            if (typeof state !== 'object' || state === null || state === undefined) state = {val: state};

            if (ack !== undefined) {
                state.ack = ack;
            }

            state.from = 'system.adapter.' + that.namespace;
            state.user = (options ? options.user : '') || 'system.user.admin';

            if (!id) {
                logger.warn(`Empty ID: ${JSON.stringify(state)}`);
                return (typeof callback === 'function') && callback(`Empty ID: ${JSON.stringify(state)}`);
            }

            const mId = id.replace(FORBIDDEN_CHARS, '_');
            if (mId !== id) {
                logger.warn(`Used invalid characters: ${id} changed to ${mId}`);
                id = mId;
            }

            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'setState', err => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                    } else {
                        that.outputCount++;
                        that.states.setState(id, state, callback);
                    }
                });
            } else {
                that.outputCount++;
                that.states.setState(id, state, callback);
            }
        };
        /**
         * Promise-version of Adapter.setForeignState
         */
        that.setForeignStateAsync = tools.promisify(that.setForeignState, that);

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
         *      }
         *  </code></pre>
         * @param {boolean} ack optional is command(false) or status(true)
         * @param {object} options optional user context
         * @param {function} callback optional return error and id
         *        <pre><code>
         *            function (err, id) {
         *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
         *            }
         *        </code></pre>
         */
        that.setForeignStateChanged = function setForeignStateChanged(id, state, ack, options, callback) {
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

            if (typeof state !== 'object' || state === null || state === undefined) state = {val: state};

            if (ack !== undefined) {
                state.ack = ack;
            }

            state.from = 'system.adapter.' + that.namespace;
            state.user = (options ? options.user : '') || 'system.user.admin';

            const mId = id.replace(FORBIDDEN_CHARS, '_');
            if (mId !== id) {
                logger.warn(`Used invalid characters: ${id} changed to ${mId}`);
                id = mId;
            }

            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'setState', err => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
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
        that.setForeignStateChangedAsync = tools.promisify(that.setForeignStateChanged, that);

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
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, state) {
         *              if (err) adapter.log.error('Cannot read value: ' + err);
         *            }
         *        </code></pre>
         *
         *        See possible attributes of the state in @setState explanation
         */
        that.getState = function getState(id, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            id = that._fixId(id, false, 'state');

            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'getState', err => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                    } else {
                        if (that.oStates && that.oStates[id]) {
                            if (typeof callback === 'function') callback(null, that.oStates[id]);
                        } else {
                            that.states.getState(id, callback);
                        }
                    }
                });
            } else {
                if (that.oStates && that.oStates[id]) {
                    if (typeof callback === 'function') callback(null, that.oStates[id]);
                } else {
                    that.states.getState(id, callback);
                }
            }
        };
        /**
         * Promise-version of Adapter.getState
         */
        that.getStateAsync = tools.promisify(that.getState, that);

        /**
         * Read value from states DB for any instance and system state.
         *
         * This function can read values from states DB for all instances and adapters. It expects the full path of object ID.
         *
         * @alias getForeignState
         * @memberof Adapter
         * @param {string} id object ID of the state.
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err, state) {
         *              if (err) adapter.log.error('Cannot read value: ' + err);
         *            }
         *        </code></pre>
         *
         *        See possible attributes of the state in @setState explanation
         */
        that.getForeignState = function getForeignState(id, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'getState', err => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                    } else {
                        if (that.oStates && that.oStates[id]) {
                            if (typeof callback === 'function') callback(null, that.oStates[id]);
                        } else {
                            that.states.getState(id, callback);
                        }
                    }
                });
            } else {
                if (that.oStates && that.oStates[id]) {
                    if (typeof callback === 'function') callback(null, that.oStates[id]);
                } else {
                    that.states.getState(id, callback);
                }
            }
        };
        /**
         * Promise-version of Adapter.getForeignState
         */
        that.getForeignStateAsync = tools.promisify(that.getForeignState, that);

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
         * @param {function} callback return result
         *        <pre><code>
         *            function (error, result, step, sessionId) {
         *              if (error) adapter.log.error('Cannot read value: ' + err);
         *            }
         *        </code></pre>
         *
         *        See possible attributes of the state in @setState explanation
         */
        that.getHistory = function getHistory(id, options, callback) {
            options = options || {};
            options.end = options.end || Date.now() + 5000000;
            if (!options.count && !options.start) {
                options.start = options.start || Date.now() - 604800000; // - 1 week
            }

            if (!options.instance) {
                if (!that.defaultHistory) {
                    // read default history instance from system.config
                    return getDefaultHistory(() => that.getHistory(id, options, callback));
                } else {
                    options.instance = that.defaultHistory;
                }
            }

            that.sendTo(options.instance || 'history.0', 'getHistory', {id: id, options: options}, res => {
                setImmediate(() => callback(res.error, res.result, res.step, res.sessionId));
            });
        };
        /**
         * Promise-version of Adapter.getHistory
         */
        that.getHistoryAsync = tools.promisify(that.getHistory, that, ['result', 'step', 'sessionId']);

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
        that.idToDCS = function idToDCS(id) {
            if (!id) return null;
            const parts = id.split('.');
            if (parts[0] + '.' + parts[1] !== that.namespace) {
                logger.warn('Try to decode id not from this adapter');
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
         * @param {object} options optional user context
         * @param {function} callback return result
         *        <pre><code>
         *            function (err) {
         *              if (err) adapter.log.error('Cannot delete object: ' + err);
         *            }
         *        </code></pre>
         */
        that.delState = function (id, options, callback) {
            // delState does the same as delForeignState, but fixes the ID first
            id = that._fixId(id);
            that.delForeignState(id, options, callback);
        };
        /**
         * Promise-version of Adapter.delState
         */
        that.delStateAsync = tools.promisify(that.delState, that);

        /**
         * Deletes a state of any adapter.
         * The object is NOT deleted. If you want to delete it too, use @delForeignObject instead.
         *
         * No error is returned if state does not exist.
         *
         * @alias delForeignState
         * @memberof Adapter
         * @param {string} id long string for ID like "adapterName.0.stateID".
         * @param {object} options optional argument to describe the user context
         * @param {function} callback return result function (err) {}
         */
        that.delForeignState = function (id, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'delState', function (err) {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                    } else {
                        that.states.delState(id, callback);
                    }
                });
            } else {
                that.states.delState(id, callback);
            }
        };
        /**
         * Promise-version of Adapter.delForeignState
         */
        that.delForeignStateAsync = tools.promisify(that.delForeignState, that);

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
         * @param {function} callback return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
         */
        that.getStates = function getStates(pattern, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            pattern = that._fixId(pattern, true, 'state');
            that.getForeignStates(pattern, options, callback);
        };
        /**
         * Promise-version of Adapter.getStates
         */
        that.getStatesAsync = tools.promisify(that.getStates, that);

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
         * @param {string} pattern string in form 'adapter.0.*' or like this. It can be array of IDs too.
         * @param {object} options optional argument to describe the user context
         * @param {function} callback return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
         */
        that.getForeignStates = function getForeignStates(pattern, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            const list = {};
            if (typeof pattern === 'function') {
                callback = pattern;
                pattern = '*';
            }

            if (typeof callback !== 'function') {
                logger.error(that.namespace + ' getForeignStates invalid callback for ' + pattern);
                return;
            }

            if (typeof pattern === 'object') {
                if (options && options.user && options.user !== 'system.user.admin') {
                    checkStates(pattern, options, 'getState', (err, keys) => {
                        if (err) {
                            if (typeof callback === 'function') callback(err);
                            return;
                        }
                        that.states.getStates(keys, (err, arr) => {
                            if (err) {
                                callback(err);
                                return;
                            }
                            for (let i = 0; i < keys.length; i++) {
                                if (typeof arr[i] === 'string') arr[i] = JSON.parse(arr[i]);
                                list[keys[i]] = arr[i] || {};
                            }
                            callback(null, list);
                        });
                    });
                } else {
                    that.states.getStates(pattern, (err, arr) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        for (let i = 0; i < pattern.length; i++) {
                            if (typeof arr[i] === 'string') arr[i] = JSON.parse(arr[i]);
                            list[pattern[i]] = arr[i] || {};
                        }
                        callback(null, list);
                    });
                }
                return;
            }
            const keys = [];
            let params = {};
            if (pattern && pattern !== '*') {
                params = {
                    startkey: pattern.replace(/\*/g, ''),
                    endkey:   pattern.replace(/\*/g, '\u9999')
                };
            }
            let originalChecked = undefined;
            if (options.checked !== undefined) originalChecked = options.checked;
            options.checked = true;
            that.objects.getObjectView('system', 'state', params, options, (err, res) => {
                if (originalChecked !== undefined) {
                    options.checked = originalChecked;
                } else {
                    options.checked = undefined;
                }
                if (err) {
                    if (typeof callback === 'function') callback(err);
                    return;
                }
                // filter out
                let regEx;
                // process patterns like "*.someValue". The patterns "someValue.*" will be processed by getObjectView
                if (pattern && pattern !== '*' && pattern[pattern.length - 1] !== '*') {
                    regEx = new RegExp(pattern2RegEx(pattern));
                }
                for (let i = 0; i < res.rows.length; i++) {
                    if (!regEx || regEx.test(res.rows[i].id)) {
                        keys.push(res.rows[i].id);
                    }
                }

                if (options && options.user && options.user !== 'system.user.admin') {
                    checkStates(keys, options, 'getState', (err, keys) => {
                        if (err) {
                            if (typeof callback === 'function') callback(err);
                            return;
                        }
                        that.states.getStates(keys, (err, arr) => {
                            if (err) {
                                callback(err);
                                return;
                            }
                            for (let i = 0; i < res.rows.length; i++) {
                                if (typeof arr[i] === 'string') arr[i] = JSON.parse(arr[i]);
                                list[keys[i]] = arr[i] || null;
                            }
                            if (typeof callback === 'function') callback(null, list);
                        });
                    });
                } else {
                    that.states.getStates(keys, (err, arr) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        for (let i = 0; i < res.rows.length; i++) {
                            if (typeof arr[i] === 'string') {
                                try {
                                    arr[i] = JSON.parse(arr[i]);
                                } catch (e) {
                                    logger.error(that.namespace + ' Cannot parse state"' + keys[i] + ': ' + arr[i]);
                                }
                            }
                            list[keys[i]] = arr[i] || null;
                        }
                        if (typeof callback === 'function') callback(null, list);
                    });
                }
            });
        };
        /**
         * Promise-version of Adapter.getForeignStates
         */
        that.getForeignStatesAsync = tools.promisify(that.getForeignStates, that);

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
         * @param {string} pattern string in form 'adapter.0.*' or like this. It can be array of IDs too.
         * @param {object} options optional argument to describe the user context
         * @param {function} callback return result function (err) {}
         */
        that.subscribeForeignStates = function subscribeForeignStates(pattern, options, callback) {
            pattern = pattern || '*';
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            // Todo check rights for options

            autoSubscribeOn(() => {
                // compare if this pattern for one of autosubscribe adapters
                for (let s = 0; s < that.autoSubscribe.length; s++) {
                    if (pattern === '*' || pattern.substring(0, that.autoSubscribe[s].length + 1) === that.autoSubscribe[s] + '.') {
                        // put this pattern into adapter list
                        that.states.getState('system.adapter.' + that.autoSubscribe[s] + '.subscribes', (err, state) => {
                            state = {};
                            state.val = state.val || '{}';
                            let subs;
                            try {
                                subs = JSON.parse(state.val);
                            } catch (e) {
                                logger.error('Cannot parse subscribes for "' + that.autoSubscribe[s] + '.subscribes"');
                            }
                            subs[pattern] = subs[pattern] || {};
                            subs[pattern][that.namespace] = subs[pattern][that.namespace] || 0;
                            subs[pattern][that.namespace]++;
                            that.outputCount++;
                            that.states.setState('system.adapter.' + that.autoSubscribe[s] + '.subscribes', subs);
                        });
                    }
                }

                that.states.subscribe(pattern, callback);
            });
        };
        /**
         * Promise-version of Adapter.subscribeForeignStates
         */
        that.subscribeForeignStatesAsync = tools.promisify(that.subscribeForeignStates, that);

        /**
         * Unsubscribe for changes for given pattern
         *
         * This function allows to unsubsrcibe from changes. The pattern must be equal to requested one.
         *
         * <pre><code>
         *     adapter.subscribeForeignStates('adapterName.X.*');
         *     adapter.unsubscribeForeignStates('adapterName.X.abc*'); // This will not work
         *     adapter.unsubscribeForeignStates('adapterName.X.*'); // Valid unsubscribe
         * </code></pre>
         *
         * @alias unsubscribeForeignStates
         * @memberof Adapter
         * @param {string} pattern string in form 'adapter.0.*'. Must be the same as subscribe.
         * @param {object} options optional argument to describe the user context
         * @param {function} callback return result function (err) {}
         */
        that.unsubscribeForeignStates = function unsubscribeForeignStates(pattern, options, callback) {
            if (!pattern) pattern = '*';

            // Todo check rights for options
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (that.autoSubscribe) {
                for (let s = 0; s < that.autoSubscribe.length; s++) {
                    if (pattern === '*' || pattern.substring(0, that.autoSubscribe[s].length + 1) === that.autoSubscribe[s] + '.') {
                        // remove this pattern from adapter list
                        that.states.getState('system.adapter.' + that.autoSubscribe[s] + '.subscribes', (err, state) => {
                            if (!state || !state.val) return;
                            let subs;
                            try {
                                subs = JSON.parse(state.val);
                            } catch (e) {
                                logger.error('Cannot parse subscribes for "' + that.autoSubscribe[s] + '.subscribes"');
                                return;
                            }
                            if (!subs[pattern]) return;
                            if (subs[pattern][that.namespace] === undefined) return;
                            subs[pattern][that.namespace]--;
                            if (subs[pattern][that.namespace] <= 0) delete subs[pattern][that.namespace];
                            let found = false;
                            // if any other subs are there
                            for (const id in subs[pattern]) {
                                if (subs[pattern].hasOwnProperty(id)) {
                                    found = true;
                                    break;
                                }
                            }
                            if (!found) delete subs[pattern];
                            that.outputCount++;
                            that.states.setState('system.adapter.' + that.autoSubscribe[s] + '.subscribes', subs);
                        });
                    }
                }
            }

            that.states.unsubscribe(pattern, callback);
        };
        /**
         * Promise-version of Adapter.unsubscribeForeignStates
         */
        that.unsubscribeForeignStatesAsync = tools.promisify(that.unsubscribeForeignStates, that);

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
         * @param {string} pattern string in form 'adapter.0.*' or like this. It can be array of IDs too.
         * @param {object} options optional argument to describe the user context
         * @param {function} callback return result function (err) {}
         */
        that.subscribeStates = function subscribeStates(pattern, options, callback) {
            // Todo check rights for options
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            // Exception. Threat the '*' case automatically
            if (!pattern || pattern === '*') {
                that.states.subscribe(that.namespace + '.*', callback);
            } else {
                pattern = that._fixId(pattern, true, 'state');
                that.states.subscribe(pattern, callback);
            }
        };
        /**
         * Promise-version of Adapter.subscribeStates
         */
        that.subscribeStatesAsync = tools.promisify(that.subscribeStates, that);

        /**
         * Unsubscribe for changes for given pattern for own states.
         *
         * This function allows to unsubsrcibe from changes. The pattern must be equal to requested one.
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
         * @param {object} options optional argument to describe the user context
         * @param {function} callback return result function (err) {}
         */
        that.unsubscribeStates = function unsubscribeStates(pattern, options, callback) {
            // Todo check rights for options
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            if (!pattern || pattern === '*') {
                that.states.unsubscribe(that.namespace + '.*', callback);
            } else {
                pattern = that._fixId(pattern, true, 'state');
                that.states.unsubscribe(pattern, callback);
            }
        };
        /**
         * Promise-version of Adapter.unsubscribeStates
         */
        that.unsubscribeStatesAsync = tools.promisify(that.unsubscribeStates, that);

        that.pushFifo = function pushFifo(id, state, callback) {
            that.states.pushFifo(id, state, callback);
        };

        that.trimFifo = function trimFifo(id, start, end, callback) {
            that.states.trimFifo(id, start, end, callback);
        };

        that.getFifoRange = function getFifoRange(id, start, end, callback) {
            that.states.getFifoRange(id, start, end, callback);
        };

        that.getFifo = function getFifo(id, callback) {
            that.states.getFifo(id, callback);
        };

        that.lenFifo = function lenFifo(id, callback) {
            that.states.lenFifo(id, callback);
        };

        that.subscribeFifo = function subscribeFifo(pattern) {
            that.states.subscribeFifo(pattern);
        };

        that.getSession = function getSession(id, callback) {
            that.states.getSession(id, callback);
        };

        that.setSession = function setSession(id, ttl, data, callback) {
            that.states.setSession(id, ttl, data, callback);
        };

        that.destroySession = function destroySession(id, callback) {
            that.states.destroySession(id, callback);
        };

        that.getMessage = function getMessage(callback) {
            that.states.getMessage('system.adapter.' + that.namespace, callback);
        };

        that.lenMessage = function lenMessage(callback) {
            that.states.lenMessage('system.adapter.' + that.namespace, callback);
        };

        /**
         * Write binary block into redis, e.g image
         *
         * @alias setBinaryState
         * @memberof Adapter
         *
         * @param {string} id of state
         * @param {Buffer} binary data
         * @param {object} options optional
         * @param {function} callback
         *
         */
        that.setBinaryState = function setBinaryState(id, binary, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'setState', err => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                    } else {
                        that.states.setBinaryState(id, binary, callback);
                    }
                });
            } else {
                that.states.setBinaryState(id, binary, callback);
            }
        };
        /**
         * Promise-version of Adapter.setBinaryState
         *
         * @alias setBinaryStateAsync
         * @memberof Adapter
         * @param {string} id of state
         * @param {Buffer} binary data
         * @param {object} options optional
         * @return promise
         *
         */
        that.setBinaryStateAsync = tools.promisify(that.setBinaryState, that);

        // Read binary block from redis, e.g. image
        that.getBinaryState = function getBinaryState(id, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'getState', err => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                    } else {
                        that.states.getBinaryState(id, callback);
                    }
                });
            } else {
                that.states.getBinaryState(id, callback);
            }
        };
        /**
         * Promise-version of Adapter.getBinaryState
         *
         * @alias getBinaryStateAsync
         * @memberof Adapter
         *
         */
        that.getBinaryStateAsync = tools.promisify(that.getBinaryState, that);

        /**
         * Deletes binary state
         *
         * @alias delBinaryState
         * @memberof Adapter
         *
         * @param {string} id
         * @param {object} options optional
         * @param {function} callback optional
         *
         */
        that.delBinaryState = function delBinaryState(id, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'delState', err => {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                    } else {
                        that.states.delBinaryState(id, callback);
                    }
                });
            } else {
                that.states.delBinaryState(id, callback);
            }
        };

        /**
         * Promise-version of Adapter.delBinaryState
         *
         * @alias delBinaryStateAsync
         * @memberof Adapter
         * @param {string} id
         * @param {object} options optional
         * @return promise
         *
         */
        that.delBinaryStateAsync = tools.promisify(that.delBinaryState, that);
    }

    // read all logs prepared for this adapter at start
    function readLogs(callback) {
        // read all stored messages
        that.states.getLog('system.adapter.' + that.namespace, (err, msg) => {
            if (msg) {
                that.emit('log', msg);
                setImmediate(() => readLogs(callback));
            } else if (typeof callback === 'function') {
                callback();
            }
        });
    }

    // debug function to find error with stop logging
    function checkLogging() {
        let logs  = [];
        // LogList
        logs.push('Actual Loglist - ' + JSON.stringify(that.logList));

        // Read current state of all log subscribers
        that.states.getKeys('*.logging', (err, keys) => {
            if (keys && keys.length) {
                that.states.getStates(keys, (err, obj) => {
                    if (obj) {
                        for (let i = 0; i < keys.length; i++) {
                            // We can JSON.parse, but index is 16x faster
                            if (obj[i]) {
                                const id = keys[i].substring(0, keys[i].length - '.logging'.length).replace(/^io\./, '');
                                if ((typeof obj[i] === 'string' && (obj[i].indexOf('"val":true') !== -1 || obj[i].indexOf('"val":"true"') !== -1)) ||
                                    (typeof obj[i] === 'object' && (obj[i].val === true || obj[i].val === 'true'))) {
                                    logs.push('Subscriber - ' + id + ' ENABLED');
                                } else {
                                    if (logs) {
                                        logs.push('Subscriber - ' + id + ' (disabled)');
                                    } else {
                                        logger.error('LOGINFO: Subscriber - ' + id + ' (disabled)');
                                    }
                                }
                            }
                        }
                    }
                    if (logs) {
                        for (let m = 0; m < logs.length; m++) {
                            logger.error('LOGINFO: ' + logs[m]);
                        }
                        logs = null;
                    }
                });
            }
        });
    }

    function initLogging(callback) {
        // temporary log buffer
        let messages = [];
        // Read current state of all log subscriber
        that.states.getKeys('*.logging', (err, keys) => {
            if (keys && keys.length) {
                that.states.getStates(keys, (err, obj) => {
                    if (obj) {
                        for (let i = 0; i < keys.length; i++) {
                            // We can JSON.parse, but index is 16x faster
                            if (!obj[i]) continue;
                            const id = keys[i].substring(0, keys[i].length - '.logging'.length);
                            if (typeof obj[i] === 'string' && (obj[i].indexOf('"val":true') !== -1 || obj[i].indexOf('"val":"true"') !== -1)) {
                                that.logRedirect(true, id);
                            } else if (typeof obj[i] === 'object' && (obj[i].val === true || obj[i].val === 'true')) {
                                that.logRedirect(true, id);
                            }
                        }
                        if (that.logList.length && messages && messages.length) {
                            for (let m = 0; m < messages.length; m++) {
                                for (let k = 0; k < that.logList.length; k++) {
                                    that.states.pushLog(that.logList[k], messages[m]);
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
            callback && callback();
        });

        that.logRedirect = (isActive, id) => {
            // ignore itself
            if (id === 'system.adapter.' + that.namespace) return;

            if (isActive) {
                if (that.logList.indexOf(id) === -1) that.logList.push(id);
            } else {
                const pos = that.logList.indexOf(id);
                if (pos !== -1) that.logList.splice(pos, 1);
            }
        };

        // If some message from logger
        // find our notifier transport
        const ts = logger.transports.find(t => t.name === 'NT');
        ts.on('logged', info => {
            info.from = that.namespace;
            // emit to itself
            if (options.logTransporter) {
                that.emit('log', info);
            }

            if (!that.logList.length) {
                // if log buffer still active
                if (messages && !options.logTransporter) {
                    messages.push(info);

                    // do not let messages to grow without limit
                    if (messages.length > config.states.maxQueue) {
                        messages.splice(0, messages.length - config.states.maxQueue);
                    }
                }
            } else {
                // Send to all adapter, that required logs
                for (let i = 0; i < that.logList.length; i++) {
                    that.states.pushLog(that.logList[i], info);
                }
            }
        });

        options.logTransporter = options.logTransporter || that.ioPack.common.logTransporter;

        if (options.logTransporter) {
            that.requireLog = function (isActive) {
                if (that.states) {
                    if (that.logRequired !== isActive) {
                        that.logRequired = isActive; // remember state
                        if (!isActive) {
                            if (that.logOffTimer) {
                                clearTimeout(that.logOffTimer);
                            }
                            // disable log receiving after 10 seconds
                            that.logOffTimer = setTimeout(() => {
                                that.logOffTimer = null;
                                logger.debug('Change log subscriber state: FALSE');
                                that.outputCount++;
                                that.states.setState('system.adapter.' + that.namespace + '.logging', {val: false, ack: true, from: 'system.adapter.' + that.namespace});
                            }, 10000);
                        } else {
                            if (that.logOffTimer) {
                                clearTimeout(that.logOffTimer);
                                that.logOffTimer = null;
                            } else {
                                logger.debug('Change log subscriber state: true');
                                that.outputCount++;
                                that.states.setState('system.adapter.' + that.namespace + '.logging', {val: true, ack: true, from: 'system.adapter.' + that.namespace});
                            }
                        }
                    }
                }
            };

            that.processLog = msg => {
                if (msg) that.emit('log', msg);
                that.states.delLog('system.adapter.' + that.namespace, msg._id);
            };

            readLogs();

            that.states.subscribeLog('system.adapter.' + that.namespace);
        } else {
            that.requireLog = function (_isActive) {
                logger.warn('requireLog is not supported by this adapter! Please set common.logTransporter to true');
            };
        }
    }

    function initAdapter(adapterConfig) {
        initLogging(() => {
            if (options.instance === undefined) {
                if (!adapterConfig || !adapterConfig.common || !adapterConfig.common.enabled) {
                    if (adapterConfig && adapterConfig.common && adapterConfig.common.enabled !== undefined) {
                        !config.isInstall && logger.error(that.namespace + ' adapter disabled');
                    } else {
                        !config.isInstall && logger.error(that.namespace + ' no config found for adapter');
                    }

                    if (!config.isInstall && (!process.argv || !config.forceIfDisabled)) {
                        const id = 'system.adapter.' + that.namespace;
                        that.outputCount += 2;
                        that.states.setState(id + '.alive', {val: true, ack: true, expire: 30, from: id});
                        let done = false;
                        that.states.setState(id + '.connected', {val: true, ack: true, expire: 30, from: id}, () => {
                            if (!done) {
                                done = true;
                                that.terminate(EXIT_CODES.NO_ADAPTER_CONFIG_FOUND);
                            }
                        });
                        setTimeout(() => {
                            if (!done) {
                                done = true;
                                that.terminate(EXIT_CODES.NO_ADAPTER_CONFIG_FOUND);
                            }
                        }, 1000);
                        return;
                    }
                }

                if (!config.isInstall && !adapterConfig._id) {
                    logger.error(that.namespace + ' invalid config: no _id found');
                    that.terminate(EXIT_CODES.INVALID_ADAPTER_ID);
                    return;
                }

                let name;
                let instance;

                if (!config.isInstall) {
                    const tmp = adapterConfig._id.match(/^system\.adapter\.([a-zA-Z0-9-_]+)\.([0-9]+)$/);
                    if (!tmp) {
                        logger.error(that.namespace + ' invalid config');
                        that.terminate(EXIT_CODES.INVALID_ADAPTER_ID);
                        return;
                    }
                    name = tmp[1];
                    instance =  parseInt(tmp[2]) || 0;
                } else {
                    name = options.name;
                    instance = 0;
                    adapterConfig = adapterConfig || {common: {mode: 'once', name: name}, native: {}, protectedNative: []};
                }

                for (const tp in logger.transports) {
                    if (logger.transports.hasOwnProperty(tp)) {
                        logger.transports[tp].level = adapterConfig.common.logLevel || 'info';
                    }
                }

                that.name = adapterConfig.common.name;
                that.instance = instance;
                that.namespace = name + '.' + instance;
                if (!that.startedInCompactMode) {
                    process.title = 'io.' + that.namespace;
                }

                that.config = adapterConfig.native;
                that.host = adapterConfig.common.host;
                that.common = adapterConfig.common;

                if (adapterConfig.common.mode === 'subscribe' ||
                    adapterConfig.common.mode === 'schedule' ||
                    adapterConfig.common.mode === 'once') {
                    that.stop = () => stop(true);
                } else if (that.startedInCompactMode) {
                    that.stop = () => stop(false);
                    that.kill = that.stop;
                }

                // Monitor logging state
                that.states.subscribe('*.logging');

                if (typeof options.message === 'function' && !adapterConfig.common.messagebox) {
                    logger.error(that.namespace + ' : message handler implemented, but messagebox not enabled. Define common.messagebox in io-package.json for adapter or delete message handler.');
                } else if (/*typeof options.message === 'function' && */adapterConfig.common.messagebox) {
                    that.mboxSubscribed = true;
                    that.states.subscribeMessage('system.adapter.' + that.namespace);
                }

                // set configured in DB log level
                if (adapterConfig.common.loglevel) {
                    for (const trans in logger.transports) {
                        if (logger.transports.hasOwnProperty(trans)) {
                            logger.transports[trans].level = adapterConfig.common.loglevel;
                        }
                    }
                }
            } else {
                that.name = adapterConfig.name || options.name;
                that.instance = adapterConfig.instance || 0;
                that.namespace = that.name + '.' + that.instance;

                that.config = adapterConfig.native || {};
                that.common = adapterConfig.common || {};
                that.host = that.common.host || tools.getHostName() || require('os').hostname();
            }

            const Log = function () {};

            Log.prototype.silly = function (msg) {
                logger.silly(that.namespace + ' ' + msg);
            };
            Log.prototype.debug = function (msg) {
                logger.debug(that.namespace + ' ' + msg);
            };
            Log.prototype.info = function (msg) {
                logger.info(that.namespace + ' ' + msg);
            };
            Log.prototype.error = function (msg) {
                logger.error(that.namespace + ' ' + msg);
            };
            Log.prototype.warn = function (msg) {
                logger.warn(that.namespace + ' ' + msg);
            };

            that.log = new Log();
            that.log.level = config.log.level;

            if (options.instance === undefined) {
                that.version = (that.pack && that.pack.version) ? that.pack.version : ((that.ioPack && that.ioPack.common) ? that.ioPack.common.version : 'unknown');

                logger.info('starting. Version ' + that.version + ' in ' + that.adapterDir + ', node: ' + process.version);
                config.system = config.system || {};
                config.system.statisticsInterval = parseInt(config.system.statisticsInterval, 10) || 15000;
                reportInterval = setInterval(reportStatus, config.system.statisticsInterval);
                reportStatus();
            }

            if (adapterConfig && adapterConfig.common && adapterConfig.common.restartSchedule) {
                try {
                    schedule = require('node-schedule');
                } catch (e) {
                    logger.error('Cannot load node-schedule. Scheduled restart is disabled');
                }
                if (schedule) {
                    logger.debug('Schedule restart: ' + adapterConfig.common.restartSchedule);
                    schedule.scheduleJob(adapterConfig.common.restartSchedule, () => {
                        logger.info('Scheduled restart.');
                        stop(false, true);
                    });
                }
            }

            // auto oStates
            if (options.states) {
                that.getStates('*', (err, _states) => {
                    that.oStates = _states;
                    that.subscribeStates('*');
                    if (firstConnection) {
                        firstConnection = false;
                        if (typeof options.ready === 'function') options.ready();
                        that.emit('ready');
                    } else {
                        if (typeof options.reconnect === 'function') options.reconnect();
                        that.emit('reconnect');
                    }
                });
            } else {
                if (typeof options.ready === 'function') options.ready();
                that.emit('ready');

                // todo remove it later, when the error is fixed
                that.subscribeStates('checkLogging');
            }
        });
    }

    function reportStatus() {
        const id = 'system.adapter.' + that.namespace;
        that.outputCount += 7;
        that.states.setState(id + '.alive', {val: true, ack: true, expire: Math.floor(config.system.statisticsInterval / 1000) + 10, from: id});
        if (that.connected) {
            that.states.setState(id + '.connected', {val: true, ack: true, expire: 30, from: id});
            that.outputCount++;
        }
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
            if (!err && that && that.states && that.states.setState && stats) {
                that.states.setState(id + '.cpu',     {ack: true, from: id, val: parseFloat(stats.cpu).toFixed(2)});
                that.states.setState(id + '.cputime', {ack: true, from: id, val: stats.ctime / 1000});
                that.outputCount+=2;
            }
        });
        //RSS is the resident set size, the portion of the process's memory held in RAM (as opposed to the swap space or the part held in the filesystem).
        const mem = process.memoryUsage();
        that.states.setState(id + '.memRss', {val: parseFloat((mem.rss / 1048576/* 1MB */).toFixed(2)), ack: true, from: id});
        that.states.setState(id + '.memHeapTotal', {val: parseFloat((mem.heapTotal / 1048576/* 1MB */).toFixed(2)), ack: true, from: id});
        that.states.setState(id + '.memHeapUsed', {val: parseFloat((mem.heapUsed / 1048576/* 1MB */).toFixed(2)), ack: true, from: id});
        // Under windows toFixed returns string ?
        that.states.setState(id + '.uptime', {val: parseInt(process.uptime().toFixed(), 10), ack: true, from: id});
        that.states.setState(id + '.inputCount', {val: that.inputCount, ack: true, from: id});
        that.states.setState(id + '.outputCount', {val: that.outputCount, ack: true, from: id});
        that.inputCount  = 0;
        that.outputCount = 0;
    }

    function stop(isPause, isScheduled) {
        clearInterval(reportInterval);
        const id = 'system.adapter.' + that.namespace;

        function finishUnload() {
            if (that.states) {
                that.outputCount++;
                that.states.setState(id + '.alive', {val: false, ack: true, from: id}, () => {
                    if (!isPause && that.log) logger.info('terminating');
                    that.terminate(isScheduled ? EXIT_CODES.START_IMMEDIATELY_AFTER_STOP: 0);
                });
            }
        }

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
                    logger.error(`Error in ${id}: The unload method must return a Promise if it does not accept a callback!`);
                }
            }
        } else {
            that.emit('unload', finishUnload);
        }

        // Even if the developer forgets to call the unload callback, we need to stop the process
        // Therefore wait a short while and then force the unload
        setTimeout(() => {
            if (that.states) {
                finishUnload();

                // Give 2 seconds to write the value
                setTimeout(() => {
                    if (!isPause && that.log) logger.info('terminating with timeout');
                    that.terminate(isScheduled ? EXIT_CODES.START_IMMEDIATELY_AFTER_STOP : 0);
                }, 1000);
            } else {
                if (!isPause && that.log) logger.info('terminating');
                that.terminate(isScheduled ? EXIT_CODES.START_IMMEDIATELY_AFTER_STOP : 0);
            }
        }, (that.common && that.common.stopTimeout) || 500);
    }

    process.once('SIGINT', stop);
    process.once('SIGTERM', stop);
    // And the exit event shuts down the child.
    process.once('exit', stop);

    process.on('uncaughtException', err => {

        // If the adapter has a callback to listen for unhandled errors
        // give it a chance to handle the error itself instead of restarting it
        if (typeof options.error === 'function') {
            try {
                // if error handler in the adapter returned exactly true,
                // we expect the error to be handled and do nothing more
                const wasHandled = options.error(err);
                if (wasHandled === true) return;
            } catch (e) {
                console.error(`Error in adapter error handler: ${e}`);
            }
        }

        console.error(err);

        // catch it on windows
        if (that.getPortRunning && err.message === 'listen EADDRINUSE') {
            logger.warn(that.namespace + ' Port ' + that.getPortRunning.port + ' is in use. Get next');

            setImmediate(() => that.getPort(that.getPortRunning.port + 1, that.getPortRunning.callback));
            return;
        }

        logger.error(that.namespace + ' uncaught exception: ' + (err.message || err));
        if (err.stack) logger.error(that.namespace + ' ' + err.stack);

        try {
            stop();
            setTimeout(() => that.terminate(EXIT_CODES.UNCAUGHT_EXCEPTION), 1000);
        } catch (err) {
            logger.error(that.namespace + ' exception by stop: ' + (err.message || err));
        }
    });

    return this;
}

// extend the EventEmitter class using our class
util.inherits(Adapter, EventEmitter);

module.exports = Adapter;
