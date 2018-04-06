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

var net =               require('net');
var fs =                require('fs');
var extend =            require('node.extend');
var util =              require('util');
var EventEmitter =      require('events').EventEmitter;
var tools =             require(__dirname + '/tools');
var getConfigFileName = tools.getConfigFileName;
var schedule;

var password =          require(__dirname + '/password');
var config =            null;
var that;
var defaultObjs;

if (fs.existsSync(getConfigFileName())) {
    config = JSON.parse(fs.readFileSync(getConfigFileName(), 'utf8'));
    if (!config.states)  config.states  = {type: 'file'};
    if (!config.objects) config.objects = {type: 'file'};
} else {
    throw 'Cannot find ' + getConfigFileName();
}

/**
 * Adapter class
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
    var regUser = /^system\.user\./;
    var regGroup = /^system\.group\./;

    that = this;
    that.logList = [];

    // possible arguments
    // 0,1,.. - instance
    // info, debug, warn, error - log level
    // --force
    // --logs
    // --silent
    // --install
    if (process.argv) {
        for (var a = 1; a < process.argv.length; a++) {
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
            } else if (parseInt(process.argv[a], 10).toString() === process.argv[a]) {
                config.instance = parseInt(process.argv[a], 10);
            }
        }
    }

    config.log.level = config.log.level || 'info';
    if (config.log.noStdout && process.argv && process.argv.indexOf('--console') !== -1) {
        config.log.noStdout = false;
    }

    var logger = require(__dirname + '/logger.js')(config.log);

    // compatibility
    if (!logger.silly) {
        logger.silly = logger.debug;
    }

    // enable "var adapter = require(__dirname + '/../../lib/adapter.js')('adapterName');" call
    if (typeof options === 'string') options = {name: options};

    if (!options) throw 'Empty options!';
    if (!options.name) throw 'No name of adapter!';

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
        var jsc = this.adapterDir.pop();
        if ((jsc === tools.appName + '.js-controller' || jsc === tools.appName.toLowerCase() + '.js-controller') && this.adapterDir.pop() === 'node_modules') {
            // js-controller is installed as npm
            var appName = tools.appName.toLowerCase();
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
                process.exit(10);
            }
        } else {
            this.adapterDir = __dirname.replace(/\\/g, '/');
            // remove "/lib"
            this.adapterDir = this.adapterDir.substring(0, this.adapterDir.length - 4);
            if (fs.existsSync(this.adapterDir + '/node_modules/' + tools.appName + '.' + options.name)) {
                this.adapterDir += '/node_modules/' + tools.appName + '.' + options.name;
            } else if (fs.existsSync(this.adapterDir + '/../node_modules/' + tools.appName + '.' + options.name)) {
                var parts = this.adapterDir.split('/');
                parts.pop();
                this.adapterDir = parts.join('/') + '/node_modules/' + tools.appName + '.' + options.name;
            } else {
                logger.error('Cannot find directory of adapter ' + options.name);
                process.exit(10);
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
            process.exit(10);
        }
    } else {
        this.ioPack = this.pack.io;
    }

    // If required system configuration. Store it in systemConfig attribute
    if (options.systemConfig) that.systemConfig = config;

    var States;
    if (config.states && config.states.type) {
        if (config.states.type === 'file') {
            States = require(__dirname + '/states/statesInMemClient');
        } else if (config.states.type === 'redis') {
            States = require(__dirname + '/states/statesInRedis');
        } else {
            throw 'Unknown objects type: ' + config.states.type;
        }
    } else {
        States  = require(__dirname + '/states');
    }

    var Objects;
    if (config.objects && config.objects.type) {
        if (config.objects.type === 'file') {
            Objects = require(__dirname + '/objects/objectsInMemClient');
        } else if (config.objects.type === 'redis') {
            Objects = require(__dirname + '/objects/objectsInRedis');
        } else if (config.objects.type === 'couch') {
            Objects= require(__dirname + '/objects/objectsInCouch');
        } else {
            throw 'Unknown objects type: ' + config.objects.type;
        }
    } else {
        Objects = require(__dirname + '/objects');
    }

    var os     = require('os');
    var ifaces = os.networkInterfaces();
    var ipArr  = [];
    for (var dev in ifaces) {
        if (!ifaces.hasOwnProperty(dev)) continue;
        /*jshint loopfunc:true */
        ifaces[dev].forEach(function (details) {
            if (!details.internal) ipArr.push(details.address);
        });
    }

    var instance = (options.instance !== undefined) ? options.instance : (config.instance || 0);

    that.name           = options.name;
    that.namespace      = options.name + '.' + instance;
    that.users          = []; // cache of user groups
    that.defaultHistory = null;
    that.autoSubscribe  = null; // array of instances, that support auto subscribe
    that.inputCount     = 0;
    that.outputCount    = 0;

    var reportInterval;

    var callbackId = 1;
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

        port = parseInt(port, 10);
        that.getPortRunning = {port: port, callback: callback};
        var server = net.createServer();
        try {

            server.listen(port, function (/* err */) {
                server.once('close', function () {
                    if (typeof callback === 'function') {
                        //that.getPortRunning = null;
                        callback(port);
                    }
                });
                server.close();
            });
            server.on('error', function (/* err */) {
                setTimeout(function () {
                    that.getPort(port + 1, callback);
                }, 100);
            });
        } catch (e) {
            setImmediate(function () {
                that.getPort(port + 1, callback);
            });
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

        that.getForeignObject(user, options, function (err, obj) {
            if (err || !obj || !obj.common || (!obj.common.enabled && user !== 'system.user.admin')) {
                callback(false);
                return;
            }
            password(pw).check(obj.common.password, function (err, res) {
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

        that.getForeignObject(user, options, function (err, obj) {
            if (err || !obj) {
                if (typeof callback === 'function') callback('User does not exist');
                return;
            }
            password(pw).hash(null, null, function (err, res) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                    return;
                }
                that.extendForeignObject(user, {
                    common: {
                        password: res
                    }
                }, options, function () {
                    if (typeof callback === 'function') callback(null);
                });
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
        that.getForeignObject(user, options, function (err, obj) {
            if (err || !obj) {
                callback(false);
                return;
            }
            that.getForeignObject(group, options, function (err, obj) {
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
     * @param {object} commandsPermissions object that describes the access rights like
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
        var acl = {user: user};
        if (user === 'system.user.admin') {
            acl.groups = ['system.group.administrator'];
            for (var c in commandsPermissions) {
                if (!commandsPermissions.hasOwnProperty(c) || !commandsPermissions[c].type) continue;
                acl[commandsPermissions[c].type] = acl[commandsPermissions[c].type] || {};
                acl[commandsPermissions[c].type][commandsPermissions[c].operation] = true;
            }

            if (callback) callback(acl);
            return;
        }
        acl.groups = [];
        that.getForeignObjects('*', 'group', options, function (err, groups) {
            // aggregate all groups permissions, where this user is
            if (groups) {
                for (var g in groups) {
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

                        var gAcl = groups[g].common.acl;
                        try {
                            for (var type in gAcl) {
                                if (!gAcl.hasOwnProperty(type)) continue;

                                // fix bug. Some version have user instead of users.
                                if (type === 'user') {
                                    acl.users = acl.users || {};
                                } else {
                                    acl[type] = acl[type] || {};
                                }
                                for (var op in gAcl[type]) {
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
                            that.log.error('Cannot set acl: ' + e);
                            that.log.error('Cannot set acl: ' + JSON.stringify(gAcl));
                            that.log.error('Cannot set acl: ' + JSON.stringify(acl));
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
                    fs.watch(cert, function (eventType, filename) {
                        that.log.warn('New certificate "' + filename + '" detected. Restart adapter');
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
        that.getForeignObject('system.certificates', function (err, obj) {
            if (err || !obj ||
                !obj.native.certificates ||
                !publicName ||
                !privateName ||
                !obj.native.certificates[publicName] ||
                !obj.native.certificates[privateName] ||
                (chainedName && !obj.native.certificates[chainedName])
            ) {
                that.log.error('Cannot enable secure web server, because no certificates found: ' + publicName + ', ' + privateName + ', ' + chainedName);
                if (callback) callback('Not found');
            } else {
                var ca;
                if (chainedName) {
                    var chained = readFileCertificate(obj.native.certificates[chainedName]).split('-----END CERTIFICATE-----\r\n');
                    ca = [];
                    for (var c = 0; c < chained.length; c++) {
                        if (chained[c].replace(/[\r\n|\r|\n]+/, '').trim()) {
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

    // Can be later deleted if no more appears
    that.inited = false;

    initObjects(function () {
        if (that.inited) {
            if (that.log) that.log.warn('Reconnection to DB.');
            return;
        }

        that.inited = true;

        // auto oObjects
        if (options.objects) {
            that.getAdapterObjects(function (objs) {
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
            var obj = objs.shift();
            that.getObject(obj._id, function (err, _obj) {
                if (!_obj) {
                    if (obj.common) {
                        if (obj.common.name) {
                            obj.common.name = obj.common.name.replace('%INSTANCE%', instance);
                        }
                        if (obj.common.desc) {
                            obj.common.desc = obj.common.desc.replace('%INSTANCE%', instance);
                        }
                    }

                    that.setObject(obj._id, obj, function (err) {
                        if (err && that.log) that.log.error('Cannot setObject: ' + err);
                        setImmediate(createInstancesObjects, callback, objs);
                    });
                } else {
                    setImmediate(createInstancesObjects, callback, objs);
                }
            });
        }
    }

    function prepareInitAdapter() {
        that.getForeignState('system.adapter.' + that.namespace + '.alive', function (err, res) {
            if (options.instance !== undefined) {
                initAdapter(options);
            } else
            if (!config.isInstall && res && res.val === true) {
                logger.error(options.name + '.' + instance + ' already running');
                process.exit(7);
            } else {
                that.getForeignObject('system.adapter.' + that.namespace, function (err, res) {
                    if ((err || !res) && !config.isInstall) {
                        logger.error(options.name + '.' + instance + ' invalid config');
                        process.exit(2);
                    } else {
                        createInstancesObjects(function () {
                            initAdapter(res);
                        });
                    }
                });
            }
        });
    }

    function autoSubscribeOn(cb) {
        if (!that.autoSubscribe) {
            // collect all
            that.objects.getObjectView('system', 'instance', {startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, options, function (err, res) {
                if (res && res.rows) {
                    that.autoSubscribe = [];
                    for (var c = res.rows.length - 1; c >= 0; c--) {

                        if (res.rows[c].value.common.subscribable) {
                            var _id = res.rows[c].id.substring(15);
                            if (that.autoSubscribe.indexOf(_id) === -1) that.autoSubscribe.push(_id);
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
            connected: function () {
                that.connected = true;
                // Read dateformat if using of formatDate is announced
                if (options.useFormatDate) {
                    that.getForeignObject('system.config', function (err, data) {
                        if (data && data.common) {
                        	that.dateFormat   = data.common.dateFormat;
                        	that.isFloatComma = data.common.isFloatComma;
                        }
                        if (typeof cb === 'function') cb();
                    });
                } else if (typeof cb === 'function') {
                    cb();
                }
            },
            disconnected: function () {
                that.connected = false;
            },
            change: function (id, obj) {
                if (obj === 'null') obj = null;
                if (!id) {
                    logger.error(that.namespace + ' change ID is empty:  ' + JSON.stringify(obj));
                    return;
                }

                // If desired, that adapter must be terminated
                if (id === 'system.adapter.' + that.namespace && obj && obj.common && obj.common.enabled === false) {
                    that.log.info('Adapter is disabled => stop');
                    if (!obj.common.enabled) {
                        stop();
                        setTimeout(function () {
                            process.exit();
                        }, 4000);
                    }
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
                        var _id = id.substring(15); // 'system.adapter.'.length
                        if (obj.common.enabled) {
                            if (that.autoSubscribe.indexOf(_id) === -1) that.autoSubscribe.push(_id);
                        } else {
                            var pos = that.autoSubscribe.indexOf(_id);
                            if (pos !== -1) that.autoSubscribe.splice(pos, 1);
                        }
                    }
                }

                // It was an error in the calculation
                if ((options.noNamespace || config.noNamespace) && that._namespaceRegExp.test(id)) {
                    // emit 'objectChange' event instantly
                    setImmediate(function () {
                        if (typeof options.objectChange === 'function') options.objectChange(id.substring(that.namespace.length + 1), obj);
                        that.emit('objectChange', id.substring(that.namespace.length + 1), obj);
                    });
                } else {
                    setImmediate(function () {
                        if (typeof options.objectChange === 'function') options.objectChange(id, obj);
                        // emit 'objectChange' event instantly
                        that.emit('objectChange', id, obj);
                    });
                }
            },
            connectTimeout: function (/* err */) {
                if (config.isInstall) {
                    if (logger) logger.warn(that.namespace + ' no connection to objects DB');
                    process.exit(0);
                } else {
                    if (logger) logger.error(that.namespace + ' no connection to objects DB');
                }
            }
        });

        that._namespaceRegExp = new RegExp('^' + that.namespace);       // chache the regex object 'adapter.0'

        that._fixId = function _fixId(id, isPattern/* , type */) {
            var result  = '';
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
                defaultObjs = require(__dirname + '/defaultObjs.js')('de', '°C', 'EUR');
            }

            if (!id) {
                logger.error(that.namespace + ' setObject id missing!!');
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
                        obj.common = extend(true, defaultObjs[obj.common.role], obj.common);
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
                if (!obj.ts) obj.ts = new Date().getTime();
                that.objects.setObject(id, obj, options, callback);
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
            var objects = {};

            that.objects.getObjectView('system', 'state', {startkey: that.namespace + '.', endkey: that.namespace + '.\u9999', include_docs: true}, function (err, _states) {
                that.objects.getObjectView('system', 'channel', {startkey: that.namespace + '.', endkey: that.namespace + '.\u9999', include_docs: true}, function (err, _channels) {
                    that.objects.getObjectView('system', 'device', {startkey: that.namespace + '.', endkey: that.namespace + '.\u9999', include_docs: true}, function (err, _devices) {
                        if (_channels) {
                            for (var c = _channels.rows.length - 1; c >= 0; c--) {
                                objects[_channels.rows[c].id] = _channels.rows[c].value;
                            }
                        }
                        if (_devices) {
                            for (var d = _devices.rows.length - 1; d >= 0; d--) {
                                objects[_devices.rows[d].id] = _devices.rows[d].value;
                            }
                        }
                        if (_states) {
                            if (options.states) that.oStates = {};
                            for (var s = _states.rows.length - 1; s >= 0; s--) {
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
                that.objects.getObject(id, options, function (err, oldObj) {
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
                    if (!obj.ts) obj.ts = new Date().getTime();

                    that.objects.setObject(id, obj, options, callback);
                });
            } else {
                if (!obj.from) obj.from = 'system.adapter.' + that.namespace;
                if (!obj.ts) obj.ts = new Date().getTime();
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
            if (!obj.ts) obj.ts = new Date().getTime();

            that.objects.setObject(id, obj, options, callback);
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
            // delete arrays if they should be changed
            if (obj && ((obj.native && (obj.native.repositories || obj.native.certificates || obj.native.devices)) ||
                (obj.common && obj.common.members))) {
                // Read whole object
                that.objects.getObject(id, options, function (err, oldObj) {
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
                    if (!obj.ts) obj.ts = new Date().getTime();

                    that.objects.setObject(id, obj, callback);
                });
            } else {
                if (!obj.from) obj.from = 'system.adapter.' + that.namespace;
                if (!obj.ts) obj.ts = new Date().getTime();

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
            var result = {};

            that.objects.getObjectView('system', 'enum', {startkey: _enum + '.', endkey: _enum + '.\u9999'}, options, function (err, res) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                    return;
                }
                for (var t = 0; t < res.rows.length; t++) {
                    result[res.rows[t].id] = res.rows[t].value;
                }
                if (typeof callback === 'function') callback(err, result, _enum);
            });
        };
        /**
         * Promise-version of Adapter.getEnum
         */
        that.getEnumAsync = tools.promisify(that.getEnum, that, ["result", "requestEnum"]);

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
            var _enums = {};
            if (_enumList) {
                if (typeof _enumList === 'string') _enumList = [_enumList];
                var count = 0;
                for (var t = 0; t < _enumList.length; t++) {
                    count++;
                    that.getEnum(_enumList[t], options, function (err, list, _enum) {
                        if (list) _enums[_enum] = list;
                        if (!--count && callback) callback(err, _enums);
                    });
                }
            } else {
                // Read all enums
                that.objects.getObjectView('system', 'enum', {startkey: 'enum.', endkey: 'enum.\u9999'}, options, function (err, res) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    var result = {};
                    if (res && res.rows) {
                        for (var i = 0; i < res.rows.length; i++) {
                            var parts = res.rows[i].id.split('.', 3);
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
            var params = {};
            if (pattern && pattern !== '*') {
                params = {
                    startkey: pattern.replace('*', ''),
                    endkey:   pattern.replace('*', '\u9999')
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
            that.objects.getObjectView('system', type || 'state', params, options, function (err, res) {
                if (err) {
                    callback(err);
                    return;
                }

                that.getEnums(enums, function (err, _enums) {
                    var list = {};
                    for (var i = 0; i < res.rows.length; i++) {
                        var id = res.rows[i].id;
                        if (typeof id !== 'string') {
                            that.log.debug('Invalid id returned from getEnums: ' + JSON.stringify(id));
                            continue;
                        }
                        list[id] = res.rows[i].value;
                        if (_enums && id) {
                            // get device or channel of this state and check it too
                            var parts = id.split('.');
                            parts.splice(parts.length - 1, 1);
                            var channel = parts.join('.');
                            parts.splice(parts.length - 1, 1);
                            var device = parts.join('.');

                            list[id].enums = {};
                            for (var es in _enums) {
                                if (!_enums.hasOwnProperty(es)) continue;
                                for (var e in _enums[es]) {
                                    if (!_enums[es].hasOwnProperty(e)) continue;
                                    if (!_enums[es][e] || !_enums[es][e].common || !_enums[es][e].common.members)
                                        continue;
                                    if (_enums[es][e].common.members.indexOf(id) !== -1 ||
                                        _enums[es][e].common.members.indexOf(channel)        !== -1 ||
                                        _enums[es][e].common.members.indexOf(device)         !== -1) {
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
            that.objects.findObject(id, type, options, callback);
        };
        /**
         * Promise-version of Adapter.findForeignObject
         */
        that.findForeignObjectAsync = tools.promisify(that.findForeignObject, that, ["id", "name"]);

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
            that.objects.getObject(id, options, callback);
        };
        /**
         * Promise-version of Adapter.getForeignObject
         */
        that.getForeignObjectAsync = tools.promisify(that.getForeignObject, that);

        /**
         * Delete object of this instance.
         *
         * It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.
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
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            that.objects.delObject(that._fixId(id), options, callback);
        };
        /**
         * Promise-version of Adapter.delObject
         */
        that.delObjectAsync = tools.promisify(that.delObject, that);

        /**
         * Delete any object.
         *
         * ID must be specified with namespace.
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
            that.objects.delObject(id, options, callback);
        };
        /**
         * Promise-version of Adapter.delForeignObject
         */
        that.delForeignObjectAsync = tools.promisify(that.delForeignObject, that);

        /**
         * Subscribe for the changes of objects in this instance.
         **
         * @alias subscribeObjects
         * @memberof Adapter
         * @param {string} pattern pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces
         * @param {object} options optional user context
         */
        that.subscribeObjects = function subscribeObjects(pattern, options) {
            if (pattern === '*') {
                that.objects.subscribe(that.namespace + '.*');
            } else {
                pattern = that._fixId(pattern, true);
                that.objects.subscribe(pattern, options);
            }
        };

        /**
         * Unsubscribe on the changes of objects in this instance.
         *
         * @alias unsubscribeObjects
         * @memberof Adapter
         * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
         * @param {object} options optional user context
         */
        that.unsubscribeObjects = function unsubscribeObjects(pattern, options) {
            if (pattern === '*') {
                that.objects.unsubscribe(that.namespace + '.*', options);
            } else {
                pattern = that._fixId(pattern, true);
                that.objects.unsubscribe(pattern);
            }
        };

        /**
         * Subscribe for the changes of objects in any instance.
         *
         * @alias subscribeForeignObjects
         * @memberof Adapter
         * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
         * @param {object} options optional user context
         */
        that.subscribeForeignObjects = function subscribeObjects(pattern, options) {
            that.objects.subscribe(pattern, options);
        };

        /**
         * Unsubscribe for the patterns on all objects.
         *
         * @alias unsubscribeForeignObjects
         * @memberof Adapter
         * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
         * @param {object} options optional user context
         */
        that.unsubscribeForeignObjects = function unsubscribeForeignObjects(pattern, options) {
            if (!pattern) pattern = '*';
            that.objects.unsubscribe(pattern, options);
        };

        that.setObjectNotExists = function setObjectNotExists(id, object, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            id = that._fixId(id);

            if (object.children || object.parent) {
                logger.warn(that.namespace + ' Do not use parent or children for ' + id);
            }

            that.objects.getObject(id, options, function (err, obj) {
                if (!obj) {
                    if (!object.from) object.from = 'system.adapter.' + that.namespace;
                    if (!object.ts) object.ts = new Date().getTime();

                    that.objects.setObject(id, object, callback);
                } else {
                    if (typeof callback === 'function') callback(null);
                }
            });
        };
        /**
         * Promise-version of Adapter.setObjectNotExists
         */
        that.setObjectNotExistsAsync = tools.promisify(that.setObjectNotExists, that);

        that.setForeignObjectNotExists = function setForeignObjectNotExists(id, obj, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            that.objects.getObject(id, options, function (err, _obj) {
                if (!_obj) {
                    if (!obj.from) obj.from = 'system.adapter.' + that.namespace;
                    if (!obj.ts) obj.ts = new Date().getTime();

                    that.objects.setObject(id, obj, callback);
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
            var id = '';
            if (device)  id += device;
            if (channel) id += ((id) ? '.' : '') + channel;

            if (stateOrPoint !== true && stateOrPoint !== false) {
                if (stateOrPoint)   id += ((id) ? '.' : '') + stateOrPoint;
            } else if (stateOrPoint === true) {
                if (id) id += '.';
            }
            return id;
        };

        that.createDevice = function createDevice(deviceName, common, _native, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (!deviceName) {
                that.log.error('Try to create device with empty name!');
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

            deviceName = deviceName.replace(/[.\s]+/g, '_');
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

            var common = {};
            if (typeof roleOrCommon === 'string') {
                common = {
                    role: roleOrCommon
                };
            } else if (typeof roleOrCommon === 'object') {
                common = roleOrCommon;
            }
            common.name = common.name || channelName;

            if (parentDevice) parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            channelName  = channelName.replace(/[.\s]+/g, '_');
            channelName  = that._DCS2ID(parentDevice, channelName);

            _native = _native || {};

            var obj = {
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

            var common = {};
            if (typeof roleOrCommon === 'string') {
                common = {
                    role: roleOrCommon
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

            if (parentDevice)  parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            if (parentChannel) parentChannel = parentChannel.replace(/[.\s]+/g, '_');
            stateName = stateName.replace(/[.\s]+/g, '_');
            var id = that._fixId({device: parentDevice, channel: parentChannel, state: stateName});

            // Check min, max and def values for number
            if (common.type !== undefined && common.type === 'number') {
                var min = 0;
                var max = 0;
                var def = 0;
                var err;
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

            if (common.def !== undefined) {
                that.setState(id, common.def, options);
            } else {
                that.setState(id, null, true, options);
            }
        };
        /**
         * Promise-version of Adapter.createState
         */
        that.createStateAsync = tools.promisify(that.createState, that);

        that.deleteDevice = function deleteDevice(deviceName, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            deviceName = deviceName.replace(/[.\s]+/g, '_');
            if (!that._namespaceRegExp.test(deviceName)) deviceName = that.namespace + '.' + deviceName;

            that.objects.getObjectView('system', 'device', {startkey: deviceName, endkey: deviceName}, options, function (err, res) {
                if (err || !res || !res.rows) {
                    if (typeof callback === 'function') callback(err);
                    callback = null;
                    return;
                }
                var cnt = 0;
                if (res.rows.length > 1) that.log.warn('Found more than one device ' + deviceName);

                for (var t = 0; t < res.rows.length; t++) {
                    cnt++;
                    that.delObject(res.rows[t].id, options, function (err) {
                        if (err) {
                            if (typeof callback === 'function') callback(err);
                            callback = null;
                            return;
                        }

                        if (!--cnt) {
                            that.objects.getObjectView('system', 'channel', {startkey: deviceName + '.', endkey: deviceName + '.\u9999'}, options, function (err, res) {
                                if (err) {
                                    if (typeof callback === 'function') callback(err);
                                    return;
                                }
                                var _cnt = 0;
                                for (var k = 0; k < res.rows.length; k++) {
                                    _cnt++;
                                    that.deleteChannel(deviceName, res.rows[k].id, options, function (err) {
                                        if (!(--_cnt) && callback) {
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
                parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (that._namespaceRegExp.test(channelName)) {
                channelName = channelName.substring(that.namespace.length + 1);
            }
            if (parentDevice && channelName.substring(0, parentDevice.length) === parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName.replace(/[.\s]+/g, '_');

            var objId = that.namespace + '.' + that._DCS2ID(parentDevice, channelName);

            if (addTo.match(/^enum\./)) {
                that.objects.getObject(addTo, options, function (err, obj) {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                        return;
                    }
                    if (!err && obj) {
                        var pos = obj.common.members.indexOf(objId);
                        if (pos === -1) {
                            obj.common.members.push(objId);
                            obj.from = 'system.adapter.' + that.namespace;
                            obj.ts = new Date().getTime();

                            that.objects.setObject(obj._id, obj, options, function (err) {
                                if (callback) callback(err);
                            });
                        }
                    }
                });
            } else {
                if (enumName.match(/^enum\./)) enumName = enumName.substring(5);

                that.objects.getObject('enum.' + enumName + '.' + addTo, options, function (err, obj) {
                    if (err) {
                        if (typeof callback === 'function') callback(err);
                        return;
                    }

                    if (obj) {
                        var pos = obj.common.members.indexOf(objId);
                        if (pos === -1) {
                            obj.common.members.push(objId);

                            obj.from = 'system.adapter.' + that.namespace;
                            obj.ts = new Date().getTime();

                            that.objects.setObject(obj._id, obj, options, callback);
                        } else {
                            if (callback) callback();
                        }
                    } else {
                        // Create enum
                        that.objects.setObject('enum.' + enumName + '.' + addTo, {
                            common: {
                                name: addTo,
                                members: [objId]
                            },
                            from: 'system.adapter.' + that.namespace,
                            ts: new Date().getTime(),
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
                parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (channelName && channelName.substring(0, that.namespace.length) === that.namespace) {
                channelName = channelName.substring(that.namespace.length + 1);
            }
            if (parentDevice && channelName && channelName.substring(0, parentDevice.length) === parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName || '';
            channelName = channelName.replace(/[.\s]+/g, '_');

            var objId = that.namespace + '.' + that._DCS2ID(parentDevice, channelName);

            if (enumName) {
                enumName = 'enum.' + enumName + '.';
            } else {
                enumName = 'enum.';
            }

            that.objects.getObjectView('system', 'enum', {startkey: enumName, endkey: enumName + '\u9999'}, options, function (err, res) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                    return;
                }
                if (res) {
                    var count = 0;
                    for (var i = 0; i < res.rows.length; i++) {
                        count++;
                        that.objects.getObject(res.rows[i].id, options, function (err, obj) {
                            if (err) {
                                if (typeof callback === 'function') callback(err);
                                callback = null;
                                return;
                            }
                            if (!err && obj && obj.common && obj.common.members) {
                                var pos = obj.common.members.indexOf(objId);
                                if (pos !== -1) {
                                    obj.common.members.splice(pos, 1);
                                    count++;
                                    obj.from = 'system.adapter.' + that.namespace;
                                    obj.ts = new Date().getTime();

                                    that.objects.setObject(obj._id, obj, options, function (err) {
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
            that.deleteChannelFromEnum('', parentDevice, channelName);
            var _parentDevice = parentDevice;
            var _channelName  = channelName;

            if (parentDevice) {
                if (that._namespaceRegExp.test(parentDevice)) {
                    parentDevice = parentDevice.substring(that.namespace.length + 1);
                }
                parentDevice = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (channelName && that._namespaceRegExp.test(channelName)) {
                channelName = channelName.substring(that.namespace.length + 1);
            }
            if (parentDevice && channelName && channelName.substring(0, parentDevice.length) === parentDevice) {
                channelName = channelName.substring(parentDevice.length + 1);
            }
            channelName = channelName || '';
            channelName = channelName.replace(/[.\s]+/g, '_');

            channelName  = that.namespace + '.' + that._DCS2ID(parentDevice, channelName);

            logger.info(that.namespace + ' Delete channel ' + channelName);

            that.objects.getObjectView('system', 'channel', {startkey: channelName, endkey: channelName}, options, function (err, res) {
                if (err || !res || !res.rows) {
                    if (typeof callback === 'function') callback(err);
                    callback = null;
                    return;
                }
                var cnt = 0;
                if (res.rows.length > 1) that.log.warn('Found more than one channel ' + channelName);

                for (var t = 0; t < res.rows.length; t++) {
                    cnt++;
                    that.delObject(res.rows[t].id, options, function (err) {
                        if (err) {
                            if (typeof callback === 'function') callback(err);
                            callback = null;
                            return;
                        }
                        if (!--cnt) {
                            that.objects.getObjectView('system', 'state', {startkey: channelName + '.', endkey: channelName + '.\u9999'}, options, function (err, res) {
                                if (err || !res || !res.rows) {
                                    if (typeof callback === 'function') callback(err);
                                    callback = null;
                                    return;
                                }
                                var _cnt = 0;
                                for (var k = 0; k < res.rows.length; k++) {
                                    _cnt++;
                                    that.deleteState(_parentDevice, _channelName, res.rows[k].id, options, function (err) {
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

                parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (parentChannel) {
                if (that._namespaceRegExp.test(parentChannel)) {
                    parentChannel = parentChannel.substring(that.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(/[.\s]+/g, '_');
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
            stateName = stateName.replace(/[.\s]+/g, '_');

            var _name = that._DCS2ID(parentDevice, parentChannel, stateName);
            that.delState(_name, options, function () {
                that.delObject(_name, options, callback);
            });
        };
        /**
         * Promise-version of Adapter.deleteState
         */
        that.deleteStateAsync = tools.promisify(that.deleteState, that);

        that.getDevices = function getDevices(options, callback) {
            if (typeof options === 'function' && typeof callback === 'object') {
                var tmp = callback;
                callback = options;
                options = tmp;
            }
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            that.objects.getObjectView('system', 'device', {startkey: that.namespace + '.', endkey: that.namespace + '.\u9999'}, options, function (err, obj) {
                if (callback) {
                    if (obj.rows.length) {
                        var res = [];
                        for (var i = 0; i < obj.rows.length; i++) {
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

            parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            parentDevice = that.namespace + (parentDevice ? ('.' + parentDevice) : '');
            that.objects.getObjectView('system', 'channel', {startkey: parentDevice + '.', endkey: parentDevice + '.\u9999'}, options, function (err, obj) {
                if (callback) {
                    if (obj.rows.length) {
                        var res = [];
                        for (var i = 0; i < obj.rows.length; i++) {
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

                parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (!parentChannel) {
                parentChannel = '';
            } else if (that._namespaceRegExp.test(parentChannel)) {
                parentChannel = parentChannel.substring(that.namespace.length + 1);
            }

            if (parentDevice && parentChannel && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                parentChannel = parentChannel.substring(parentDevice.length + 1);
            }

            parentChannel = parentChannel.replace(/[.\s]+/g, '_');

            var id = that.namespace + '.' + that._DCS2ID(parentDevice, parentChannel, true);

            that.objects.getObjectView('system', 'state', {startkey: id, endkey: id + '\u9999'}, options, function (err, obj) {
                if (callback) {
                    var res = [];
                    if (obj.rows.length) {
                        var read = 0;
                        for (var i = 0; i < obj.rows.length; i++) {
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

                parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (parentChannel) {
                if (that._namespaceRegExp.test(parentChannel)) {
                    parentChannel = parentChannel.substring(that.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(/[.\s]+/g, '_');
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
            stateName = stateName.replace(/[.\s]+/g, '_');

            var objId = that._fixId({device: parentDevice, channel: parentChannel, state: stateName});

            if (addTo.match(/^enum\./)) {
                that.objects.getObject(addTo, options, function (err, obj) {
                    if (!err && obj) {
                        var pos = obj.common.members.indexOf(objId);
                        if (pos === -1) {
                            obj.common.members.push(objId);
                            obj.from = 'system.adapter.' + that.namespace;
                            obj.ts = new Date().getTime();
                            that.objects.setObject(obj._id, obj, options, callback);
                        } else if (callback) {
                            callback();
                        }
                    } else {
                        if (callback) callback(err || 'object not found');
                    }
                });
            } else {
                if (enumName.match(/^enum\./)) enumName = enumName.substring(5);

                that.objects.getObject('enum.' + enumName + '.' + addTo, options, function (err, obj) {
                    if (!err && obj) {
                        var pos = obj.common.members.indexOf(objId);
                        if (pos === -1) {
                            obj.common.members.push(objId);
                            obj.from = 'system.adapter.' + that.namespace;
                            obj.ts = new Date().getTime();
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
                            ts: new Date().getTime(),
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

                parentDevice  = parentDevice.replace(/[.\s]+/g, '_');
            }

            if (parentChannel) {
                if (that._namespaceRegExp.test(parentChannel)) {
                    parentChannel = parentChannel.substring(that.namespace.length + 1);
                }
                if (parentDevice && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                    parentChannel = parentChannel.substring(parentDevice.length + 1);
                }

                parentChannel = parentChannel.replace(/[.\s]+/g, '_');
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
            stateName = stateName.replace(/[.\s]+/g, '_');

            var objId = that._fixId({device: parentDevice, channel: parentChannel, state: stateName}, false, 'state');

            if (enumName) {
                enumName = 'enum.' + enumName + '.';
            } else {
                enumName = 'enum.';
            }

            that.objects.getObjectView('system', 'enum', {startkey: enumName, endkey: enumName + '\u9999'}, options,  function (err, res) {
                if (!err && res) {
                    var count = 0;
                    for (var i = 0; i < res.rows.length; i++) {
                        count++;
                        that.objects.getObject(res.rows[i].id, options, function (err, obj) {
                            if (err) {
                                if (callback) {
                                    callback(err);
                                    callback = null;
                                }
                                return;
                            }

                            if (!err && obj && obj.common && obj.common.members) {
                                var pos = obj.common.members.indexOf(objId);
                                if (pos !== -1) {
                                    obj.common.members.splice(pos, 1);
                                    count++;
                                    obj.from = 'system.adapter.' + that.namespace;
                                    obj.ts = new Date().getTime();
                                    that.objects.setObject(obj._id, obj, function (err) {
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
        that.chmodFileAsync = tools.promisify(that.chmodFile, that, ["entries", "id"]);

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
        that.readFileAsync = tools.promisify(that.readFile, that, ["file", "mimeType"]);

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

            var format = (!_format || _format.length !== 2) ? ((that.isFloatComma === undefined) ? '.,' : ((that.isFloatComma) ? '.,' : ',.')) : _format;

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
            var type = typeof dateObj;
            if (type === 'string') dateObj = new Date(dateObj);

            if (type !== 'object') {
                var j = parseInt(dateObj, 10);
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
            var format = _format || that.dateFormat || 'DD.MM.YYYY';

            if (isDuration) dateObj.setMilliseconds(dateObj.getMilliseconds() + dateObj.getTimezoneOffset() * 60 * 1000);

            var validFormatChars = 'YJГMМDTДhSчmмsс';
            var s      = '';
            var result = '';

            function put(s) {
                /** @type {number | string} */
                var v = '';
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

            for (var i = 0; i < format.length; i++) {
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

    // TODO: clear somehow the cache by changing of user permissions
    function getUserGroups(options, callback) {
        if (that.users[options.user]) {
            options.groups = that.users[options.user];
            return callback(options);
        }
        options.groups = [];
        that.getForeignObjects('*', 'group', function (err, groups) {
            // aggregate all groups permissions, where this user is
            if (groups) {
                for (var g in groups) {
                    if (groups[g] &&
                        groups[g].common &&
                        groups[g].common.members &&
                        groups[g].common.members.indexOf(options.user) !== -1) {
                        options.groups.push(groups[g]._id);
                    }
                }
            }

            that.users[options.user] = options.groups;
            callback(options);
        });

    }

    function checkStates(ids, options, command, callback) {
        if (!options.groups) {
            return getUserGroups(options, function () {
                checkStates(ids, options, command, callback);
            });
        }

        if (ids instanceof Array) {
            var errors = [];
            var count = ids.length;
            if (count === 0) {
	        callback(null, ids);
                return;
            }
            for (var i = 0; i < ids.length; i++) {
                checkStates(ids[i], options, command, function (err, obj) {
                    if (err && obj) {
                        errors.push(obj._id);
                    }

                    if (!--count) {
                        if (errors.length) {
                            for (var j = ids.length - 1; j >= 0; j--) {
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
            var originalChecked = undefined;
            if (options.checked !== undefined) originalChecked = options.checked;
            options.checked = true;
            that.objects.getObject(ids, options, function (err, obj) {
                if (originalChecked !== undefined) {
					options.checked = originalChecked;
				} else {
					options.checked = undefined;
				}
                if (err) {
                    callback(err, {_id: ids});
                    return;
                } else {
                    var limitToOwnerRights = options.limitToOwnerRights === true;
                    if (obj && obj.acl) {
                        if (obj.acl.state === undefined) obj.acl.state = obj.acl.object;
                        if (obj.acl.state !== undefined) {
                            // If user is owner
                            if (options.user === obj.acl.owner) {
                                if (command === 'setState' || command === 'delState') {
                                    if (!(obj.acl.state & (2 << 8))/*write*/) {
                                        that.log.warn('Permission error for user "' + options.user + '": ' + command);
                                        callback('permissionError', {_id: ids});
                                        return;
                                    }
                                } else if (command === 'getState') {
                                    if (!(obj.acl.state & (4 << 8))/*read*/) {
                                        that.log.warn('Permission error for user "' + options.user + '": ' + command);
                                        callback('permissionError', {_id: ids});
                                        return;
                                    }
                                } else {
                                    that.log.warn('Called unknown command:' + command);
                                }
                            } else if (options.groups.indexOf(obj.acl.ownerGroup) !== -1 && !limitToOwnerRights) {
                                if (command === 'setState' || command === 'delState') {
                                    if (!(obj.acl.state & (2 << 4))/*write*/) {
                                        that.log.warn('Permission error for user "' + options.user + '": ' + command);
                                        callback('permissionError', {_id: ids});
                                        return;
                                    }
                                } else if (command === 'getState') {
                                    if (!(obj.acl.state & (4 << 4))/*read*/) {
                                        that.log.warn('Permission error for user "' + options.user + '": ' + command);
                                        callback('permissionError', {_id: ids});
                                        return;
                                    }
                                } else {
                                    that.log.warn('Called unknown command:' + command);
                                }
                            } else if (!limitToOwnerRights) {
                                if (command === 'setState' || command === 'delState') {
                                    if (!(obj.acl.state & 2)/*write*/) {
                                        that.log.warn('Permission error for user "' + options.user + '": ' + command);
                                        callback('permissionError', {_id: ids});
                                        return;
                                    }
                                } else if (command === 'getState') {
                                    if (!(obj.acl.state & 4)/*read*/) {
                                        that.log.warn('Permission error for user "' + options.user + '": ' + command);
                                        callback('permissionError', {_id: ids});
                                        return;
                                    }
                                } else {
                                    that.log.warn('Called unknown command:' + command);
                                    callback('permissionError', {_id: ids});
                                    return;
                                }
                            }
                            else {
                                that.log.warn('Permissions limited to Owner rights');
                                callback('permissionError', {_id: ids});
                                return;
                            }
                        }
                        else if (limitToOwnerRights) {
                            that.log.warn('Permissions limited to Owner rights');
                            callback('permissionError', {_id: ids});
                            return;
                        }
                    }
                    else if (limitToOwnerRights){
                        that.log.warn('Permissions limited to Owner rights');
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
            return that.getForeignObject('system.config', function (err, data) {
                if (data && data.common) that.defaultHistory = data.common.defaultHistory;

                // if no default history set
                if (!that.defaultHistory) {
                    // read all adapters
                    that.objects.getObjectView('system', 'instance', {startkey: '', endkey: '\u9999'}, function (err, _obj) {
                        if (_obj) {
                            for (var i = 0; i < _obj.rows.length; i++) {
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
        if (pattern !== '*') {
            if (pattern[0] === '*' && pattern[pattern.length - 1] !== '*') pattern += '$';
            if (pattern[0] !== '*' && pattern[pattern.length - 1] === '*') pattern = '^' + pattern;
        }
        pattern = (pattern || '').toString().replace(/\./g, '\\.');
        pattern = pattern.replace(/\*/g, '.*');
        return pattern;
    }

    function _setStateChangedHelper (id, state, callback) {
        that.getForeignState(id, function (err, oldState) {
            if (err) {
                if (typeof callback === 'function') callback(err);
            } else {
                var differ = false;
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
                }
                if (differ) {
                    that.outputCount++;
                    that.states.setState(id, state, function (/* err */) {
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

                if (options.subscribable) {
                    that.states.subscribe('system.adapter.' + that.namespace + '.subscribes');
                    that.states.getState('system.adapter.' + that.namespace + '.subscribes', function (err, state) {
                        if (!state || !state.val) {
                            that.patterns = {};
                        } else {
                            try {
                                that.patterns = JSON.parse(state.val);
                                for (var p in that.patterns) {
                                    that.patterns[p].regex = pattern2RegEx(p);
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
            change: function (id, state) {
                that.inputCount++;
                if (state === 'null') state = null;

                if (!id || typeof id !== 'string') {
                    console.log('Something is wrong! ' + JSON.stringify(id));
                    return;
                }

                // todo remove it as an error with log will be found
                if (id === 'system.adapter.' + that.namespace + '.checkLogging') {
                    checkLogging();
                    return;
                }

                // someone subscribes or unsubscribes from adapter
                if (options.subscribable && id === 'system.adapter.' + that.namespace + '.subscribes') {
                    var subs;
                    try {
                        subs = JSON.parse(state.val || '{}');
                    } catch (e) {
                        subs = {};
                    }
                    for (var p in subs) {
                        subs[p].regex = pattern2RegEx(p);
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
                    that.users = [];
                }

                // If someone want to have log messages
                if (that.logList && id.match(/\.logging$/)) {
                    var instance = id.substring(0, id.length - '.logging'.length);
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
                    var obj = state;
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
                            var now = (new Date()).getTime();
                            for (var _id in that.callbacks) {
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
                    if (logger) logger.warn(that.namespace + ' no connection to states DB');
                    process.exit(0);
                } else {
                    if (logger) logger.error(that.namespace + ' no connection to states DB: ' + (error || ''));
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
            var obj = {command: command, message: message, from: 'system.adapter.' + that.namespace};

            if (!instanceName.match(/^system\.adapter\./)) instanceName = 'system.adapter.' + instanceName;

            if (typeof message !== 'object') {
                that.log.debug('sendTo "' + command + '" to ' + instanceName + ' from system.adapter.' + that.namespace + ': ' + message);
            } else {
                that.log.debug('sendTo "' + command + '" to ' + instanceName + ' from system.adapter.' + that.namespace);
            }

            // If not specific instance
            if (!instanceName.match(/\.[0-9]+$/)) {
                // Send to all instances of adapter
                that.objects.getObjectView('system', 'instance', {startkey: instanceName + '.', endkey: instanceName + '.\u9999'}, function (err, _obj) {
                    if (_obj) {
                        for (var i = 0; i < _obj.rows.length; i++) {
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
                            time:    (new Date()).getTime()
                        };
                        if (callbackId >= 0xFFFFFFFF) callbackId = 1;
                        if (!that.callbacks) that.callbacks = {};
                        that.callbacks['_' + obj.callback.id] = {cb: callback};

                        // delete too old callbacks IDs
                        var now = (new Date()).getTime();
                        for (var _id in that.callbacks) {
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
            var obj = {command: command, message: message, from: 'system.adapter.' + that.namespace};

            if (hostName && !hostName.match(/^system\.host\./)) hostName = 'system.host.' + hostName;

            if (!hostName) {
                // Send to all hosts
                that.objects.getObjectList({startkey: 'system.host.', endkey: 'system.host.' + '\u9999'}, null, function (err, res) {
                    if (!err && res.rows.length) {
                        for (var i = 0; i < res.rows.length; i++) {
                            var parts = res.rows[i].id.split('.');
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
                            time:    (new Date()).getTime()
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
            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'setState', function (err) {
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
         * @param {function} callback optional return error and id
         *        <pre><code>
         *            function (err, id, notChanged) {
         *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
         *              if (!notChanged) adapter.log.debug('Value was chnaged');
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
                checkStates(id, options, 'setState', function (err) {
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
        that.setStateChangedAsync = tools.promisify(that.setStateChanged, that, ["id", "notChanged"]);

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

            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'setState', function (err) {
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

            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'setState', function (err) {
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
                checkStates(id, options, 'getState', function (err) {
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
                checkStates(id, options, 'getState', function (err) {
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
         *  - start - (optional) time in ms - new Date().getTime()', by default is (now - 1 week)
         *  - end - (optional) time in ms - new Date().getTime()', by default is (now + 5000 seconds)
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
            options.end = options.end || (new Date()).getTime() + 5000000;
            if (!options.count && !options.start) {
                options.start = options.start || (new Date()).getTime() - 604800000; // - 1 week
            }

            if (!options.instance) {
                if (!that.defaultHistory) {
                    // read default history instance from system.config
                    return getDefaultHistory(function () {
                        that.getHistory(id, options, callback);
                    });
                } else {
                    options.instance = that.defaultHistory;
                }
            }

            that.sendTo(options.instance || 'history.0', 'getHistory', {id: id, options: options}, function (res) {
                setImmediate(function () {
                    callback(res.error, res.result, res.step, res.sessionId);
                });
            });
        };
        /**
         * Promise-version of Adapter.getHistory
         */
        that.getHistoryAsync = tools.promisify(that.getHistory, that, ["result", "step", "sessionId"]);

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
            var parts = id.split('.');
            if (parts[0] + '.' + parts[1] !== that.namespace) {
                that.log.warn('Try to decode id not from this adapter');
                return null;
            }
            return {device: parts[2], channel: parts[3], state: parts[4]};
        };

        /**
         * Delete one state of this adapter.
         *
         * Deletes the state. If State does not exist, no error will be returned.
         * Do not forget do delete the object for the state too (with delObject)
         * <pre><code>
         *     adapter.delState('stateID', function (err) {
         *         console.log('adapterName.0.stateID is deleted');
         *     });
         * </code></pre>
         *
         * @alias delState
         * @memberof Adapter
         * @param {string} id short or long string of ID like "stateID" or "adapterName.0.stateID".
         * @param {object} options optional argument to describe the user context
         * @param {function} callback return result function (err) {}
         */
        that.delState = function delState(id, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }

            id = that._fixId(id, false, 'state');

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
         * Promise-version of Adapter.delState
         */
        that.delStateAsync = tools.promisify(that.delState, that);

        /**
         * Delete one state of any adapter.
         *
         * Deletes the state. If State does not exist, no error will be returned.
         * Do not forget do delete the object for the state too (with delObject)
         * <pre><code>
         *     adapter.delState('adapterName.0.stateID', function (err) {
         *         console.log('adapterName.0.stateID is deleted');
         *     });
         * </code></pre>
         *
         * @alias delForeignState
         * @memberof Adapter
         * @param {string} id long string for ID like "adapterName.0.stateID".
         * @param {object} options optional argument to describe the user context
         * @param {function} callback return result function (err) {}
         */
        that.delForeignState = function delForeignState(id, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
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
            var list = {};
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
                    checkStates(pattern, options, 'getState', function (err, keys) {
                        if (err) {
                            if (typeof callback === 'function') callback(err);
                            return;
                        }
                        that.states.getStates(keys, function (err, arr) {
                            if (err) {
                                callback(err);
                                return;
                            }
                            for (var i = 0; i < keys.length; i++) {
                                if (typeof arr[i] === 'string') arr[i] = JSON.parse(arr[i]);
                                list[keys[i]] = arr[i] || {};
                            }
                            callback(null, list);
                        });
                    });
                } else {
                    that.states.getStates(pattern, function (err, arr) {
                        if (err) {
                            callback(err);
                            return;
                        }
                        for (var i = 0; i < pattern.length; i++) {
                            if (typeof arr[i] === 'string') arr[i] = JSON.parse(arr[i]);
                            list[pattern[i]] = arr[i] || {};
                        }
                        callback(null, list);
                    });
                }
                return;
            }
            var keys = [];
            var params = {};
            if (pattern && pattern !== '*') {
                params = {
                    startkey: pattern.replace('*', ''),
                    endkey:   pattern.replace('*', '\u9999')
                };
            }
            var originalChecked = undefined;
            if (options.checked !== undefined) originalChecked = options.checked;
            options.checked = true;
            that.objects.getObjectView('system', 'state', params, options, function (err, res) {
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
                var regEx;
                // process patterns like "*.someValue". The patterns "someValue.*" will be processed by getObjectView
                if (pattern && pattern !== '*' && pattern[pattern.length - 1] !== '*') {
                    regEx = new RegExp(pattern2RegEx(pattern));
                }
                for (var i = 0; i < res.rows.length; i++) {
                    if (!regEx || regEx.test(res.rows[i].id)) {
                        keys.push(res.rows[i].id);
                    }
                }

                if (options && options.user && options.user !== 'system.user.admin') {
                    checkStates(keys, options, 'getState', function (err, keys) {
                        if (err) {
                            if (typeof callback === 'function') callback(err);
                            return;
                        }
                        that.states.getStates(keys, function (err, arr) {
                            if (err) {
                                callback(err);
                                return;
                            }
                            for (var i = 0; i < res.rows.length; i++) {
                                if (typeof arr[i] === 'string') arr[i] = JSON.parse(arr[i]);
                                list[keys[i]] = arr[i] || null;
                            }
                            if (typeof callback === 'function') callback(null, list);
                        });
                    });
                } else {
                    that.states.getStates(keys, function (err, arr) {
                        if (err) {
                            callback(err);
                            return;
                        }
                        for (var i = 0; i < res.rows.length; i++) {
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
            if (!pattern) pattern = '*';
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }

            // Todo check rights for options

            autoSubscribeOn(function () {
                // compare if this pattern for one of autosubscribe adapters
                for (var s = 0; s < that.autoSubscribe.length; s++) {
                    if (pattern === '*' || pattern.substring(0, that.autoSubscribe[s].length + 1) === that.autoSubscribe[s] + '.') {
                        // put this pattern into adapter list
                        that.states.getState('system.adapter.' + that.autoSubscribe[s] + '.subscribes', function (err, state) {
                            state = {};
                            state.val = state.val || '{}';
                            var subs;
                            try {
                                subs = JSON.parse(state.val);
                            } catch (e) {
                                that.log.error('Cannot parse subscribes for "' + that.autoSubscribe[s] + '.subscribes"');
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
                for (var s = 0; s < that.autoSubscribe.length; s++) {
                    if (pattern === '*' || pattern.substring(0, that.autoSubscribe[s].length + 1) === that.autoSubscribe[s] + '.') {
                        // remove this pattern from adapter list
                        that.states.getState('system.adapter.' + that.autoSubscribe[s] + '.subscribes', function (err, state) {
                            if (!state || !state.val) return;
                            var subs;
                            try {
                                subs = JSON.parse(state.val);
                            } catch (e) {
                                that.log.error('Cannot parse subscribes for "' + that.autoSubscribe[s] + '.subscribes"');
                                return;
                            }
                            if (!subs[pattern]) return;
                            if (subs[pattern][that.namespace] === undefined) return;
                            subs[pattern][that.namespace]--;
                            if (subs[pattern][that.namespace] <= 0) delete subs[pattern][that.namespace];
                            var found = false;
                            // if any other subs are there
                            for (var id in subs[pattern]) {
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

        // Write binary block into redis, e.g image
        that.setBinaryState = function setBinaryState(id, binary, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'setState', function (err) {
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
         */
        that.setBinaryStateAsync = tools.promisify(that.setBinaryState, that);

        // Read binary block from redis, e.g. image
        that.getBinaryState = function getBinaryState(id, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (options && options.user && options.user !== 'system.user.admin') {
                checkStates(id, options, 'getState', function (err) {
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
         */
        that.getBinaryStateAsync = tools.promisify(that.getBinaryState, that);

    }

    // read all logs prepared for this adapter at start
    function readLogs(callback) {
        // read all stored messages
        that.states.getLog('system.adapter.' + that.namespace, function (err, msg) {
            if (msg) {
                if (msg) that.emit('log', msg);
                setImmediate(function () {
                    readLogs(callback);
                });
            } else if (callback) {
                callback();
            }
        });
    }

    function printLog(logs, id, callback) {
        that.states.lenLog(id, function (err, len) {
            logs.push('Subscriber - ' + id + ' (queued ' + len + ') ' + (err || ''));
            if (callback) callback();
        });
    }

    // debug function to find error with stop logging
    function checkLogging() {
        var logs  = [];
        var count = 0;
        // LogList
        logs.push('Actual Loglist - ' + JSON.stringify(that.logList));

        // Read current state of all log subscribers
        that.states.getKeys('*.logging', function (err, keys) {
            if (keys && keys.length) {
                that.states.getStates(keys, function (err, obj) {
                    if (obj) {
                        for (var i = 0; i < keys.length; i++) {
                            // We can JSON.parse, but index is 16x faster
                            if (obj[i]) {
                                var id = keys[i].substring(0, keys[i].length - '.logging'.length).replace(/^io\./, '');
                                if ((typeof obj[i] === 'string' && (obj[i].indexOf('"val":true') !== -1 || obj[i].indexOf('"val":"true"') !== -1)) ||
                                    (typeof obj[i] === 'object' && (obj[i].val === true || obj[i].val === 'true'))) {
                                    count++;
                                    printLog(logs, id, function () {
                                        if (!--count) {
                                            for (var m = 0; m < logs.length; m++) {
                                                that.log.error('LOGINFO: ' + logs[m]);
                                            }
                                            logs = null;
                                        }
                                    });
                                } else {
                                    if (logs) {
                                        logs.push('Subscriber - ' + id + ' (disabled)');
                                    } else {
                                        that.log.error('LOGINFO: Subscriber - ' + id + ' (disabled)');
                                    }
                                }
                            }
                        }
                    }
                    if (!count && logs) {
                        for (var m = 0; m < logs.length; m++) {
                            that.log.error('LOGINFO: ' + logs[m]);
                        }
                        logs = null;
                    }
                });
            }
        });
    }

    function initLogging() {
        // temporary log buffer
        var messages = [];
        // Read current state of all log subscriber
        that.states.getKeys('*.logging', function (err, keys) {
            if (keys && keys.length) {
                that.states.getStates(keys, function (err, obj) {
                    if (obj) {
                        for (var i = 0; i < keys.length; i++) {
                            // We can JSON.parse, but index is 16x faster
                            if (!obj[i]) continue;
                            var id = keys[i].substring(0, keys[i].length - '.logging'.length);
                            if (typeof obj[i] === 'string' && (obj[i].indexOf('"val":true') !== -1 || obj[i].indexOf('"val":"true"') !== -1)) {
                                that.logRedirect(true, id);
                            } else if (typeof obj[i] === 'object' && (obj[i].val === true || obj[i].val === 'true')) {
                                that.logRedirect(true, id);
                            }
                        }
                        if (that.logList.length && messages && messages.length) {
                            for (var m = 0; m < messages.length; m++) {
                                for (var k = 0; k < that.logList.length; k++) {
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
        });

        that.logRedirect = function (isActive, id) {
            // ignore itself
            if (id === 'system.adapter.' + that.namespace) return;

            if (isActive) {
                if (that.logList.indexOf(id) === -1) that.logList.push(id);
            } else {
                var pos = that.logList.indexOf(id);
                if (pos !== -1) that.logList.splice(pos, 1);
            }
        };

        // If some message from logger
        logger.on('logging', function (transport, level, msg /* , meta */) {
            if (transport.name !== tools.appName) return;

            var message = {message: msg, severity: level, from: that.namespace, ts: (new Date()).getTime()};
            if (options.logTransporter) {
                that.emit('log', message);
            }

            if (!that.logList.length) {
                // if log buffer still active
                if (messages && !options.logTransporter) {
                    messages.push(message);

                    // do not let messages to grow without limit
                    if (messages.length > config.states.maxQueue) {
                        messages.splice(0, messages.length - config.states.maxQueue);
                    }
                }
            } else {
                // Send to all adapter, that required logs
                for (var i = 0; i < that.logList.length; i++) {
                    that.states.pushLog(that.logList[i], message);
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
                            that.logOffTimer = setTimeout(function () {
                                that.logOffTimer = null;
                                that.log.debug('Change log subscriber state: FALSE');
                                that.outputCount++;
                                that.states.setState('system.adapter.' + that.namespace + '.logging', {val: false, ack: true, from: 'system.adapter.' + that.namespace});
                            }, 10000);
                        } else {
                            if (that.logOffTimer) {
                                clearTimeout(that.logOffTimer);
                                that.logOffTimer = null;
                            } else {
                                that.log.debug('Change log subscriber state: true');
                                that.outputCount++;
                                that.states.setState('system.adapter.' + that.namespace + '.logging', {val: true, ack: true, from: 'system.adapter.' + that.namespace});
                            }
                        }
                    }
                }
            };

            that.processLog = function (msg) {
                if (msg) that.emit('log', msg);
                that.states.delLog('system.adapter.' + that.namespace, msg._id);
            };

            readLogs();

            that.states.subscribeLog('system.adapter.' + that.namespace);
        }
    }

    function initAdapter(adapterConfig) {
        initLogging();

        if (options.instance === undefined) {
            if (!adapterConfig || !adapterConfig.common || !adapterConfig.common.enabled) {
                if (adapterConfig && adapterConfig.common && adapterConfig.common.enabled !== undefined) {
                    if (!config.isInstall) logger.error(that.namespace + ' adapter disabled');
                } else {
                    if (!config.isInstall) logger.error(that.namespace + ' no config found for adapter');
                }

                if (!config.isInstall && (!process.argv || !config.forceIfDisabled)) {
                    var id = 'system.adapter.' + that.namespace;
                    that.outputCount += 2;
                    that.states.setState(id + '.alive', {val: true, ack: true, expire: 30, from: id});
                    that.states.setState(id + '.connected', {val: true, ack: true, expire: 30, from: id}, function () {
                        process.exit(3);
                    });
                    setTimeout(function () {
                        process.exit(3);
                    }, 1000);
                    return;
                }
            }

            if (!config.isInstall && !adapterConfig._id) {
                logger.error(that.namespace + ' invalid config: no _id found');
                process.exit(4);
                return;
            }

            var name;
            var instance;

            if (!config.isInstall) {
                var tmp = adapterConfig._id.match(/^system\.adapter\.([a-zA-Z0-9-_]+)\.([0-9]+)$/);
                if (!tmp) {
                    logger.error(that.namespace + ' invalid config');
                    process.exit(5);
                    return;
                }
                name = tmp[1];
                instance =  parseInt(tmp[2]) || 0;
            } else {
                name = options.name;
                instance = 0;
                adapterConfig = adapterConfig || {common: {mode: 'once', name: name}, native: {}};
            }

            for (var tp in logger.transports) {
                if (logger.transports.hasOwnProperty(tp)) {
                    logger.transports[tp].level = adapterConfig.common.logLevel || 'info';
                }
            }

            that.name = adapterConfig.common.name;
            that.instance = instance;
            that.namespace = name + '.' + instance;
            process.title = 'io.' + that.namespace;

            that.config = adapterConfig.native;
            that.host = adapterConfig.common.host;
            that.common = adapterConfig.common;

            if (adapterConfig.common.mode === 'subscribe' ||
                adapterConfig.common.mode === 'schedule' ||
                adapterConfig.common.mode === 'once') {
                that.stop = function () {
                    stop(true);
                };
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
                for (var trans in logger.transports) {
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

        var Log = function () {};

        if (config.consoleOutput) {
            Log.prototype.silly = function (msg) {
                console.log(msg);
                logger.silly(that.namespace + ' ' + msg);
            };
            Log.prototype.debug = function (msg) {
                console.log(msg);
                logger.debug(that.namespace + ' ' + msg);
            };
            Log.prototype.info = function (msg) {
                console.log(msg);
                logger.info(that.namespace + ' ' + msg);
            };
            Log.prototype.error = function (msg) {
                console.error(msg);
                logger.error(that.namespace + ' ' + msg);
            };
            Log.prototype.warn = function (msg) {
                console.warn(msg);
                logger.warn(that.namespace + ' ' + msg);
            };
        } else {
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
        }

        that.log = new Log();
        that.log.level = config.log.level;

        if (options.instance === undefined) {
            that.version = (that.pack && that.pack.version) ? that.pack.version : ((that.ioPack && that.ioPack.common) ? that.ioPack.common.version : 'unknown');

            that.log.info('starting. Version ' + that.version + ' in ' + that.adapterDir + ', node: ' + process.version);
            config.system = config.system || {};
            config.system.statisticsInterval = parseInt(config.system.statisticsInterval, 10) || 15000;
            reportInterval = setInterval(reportStatus, config.system.statisticsInterval);
            reportStatus();
        }

        if (adapterConfig && adapterConfig.common && adapterConfig.common.restartSchedule) {
            try {
                schedule = require('node-schedule');
            } catch (e) {
                that.log.error('Cannot load node-schedule. Scheduled restart is disabled');
            }
            if (schedule) {
                that.log.debug('Schedule restart: ' + adapterConfig.common.restartSchedule);
                schedule.scheduleJob(adapterConfig.common.restartSchedule, function () {
                    that.log.info('Scheduled restart.');
                    stop(false, true);
                });
            }
        }

        // auto oStates
        if (options.states) {
            that.getStates('*', function (err, _states) {
                that.oStates = _states;
                that.subscribeStates('*');
                if (typeof options.ready === 'function') options.ready();
                that.emit('ready');
            });
        } else {
            if (typeof options.ready === 'function') options.ready();
            that.emit('ready');

            // todo remove it later, when the error is fixed
            that.subscribeStates('checkLogging');
        }
    }

    function reportStatus() {
        var id = 'system.adapter.' + that.namespace;
        that.outputCount += 7;
        that.states.setState(id + '.alive', {val: true, ack: true, expire: Math.floor(config.system.statisticsInterval / 1000) + 10, from: id});
        if (that.connected) {
            that.states.setState(id + '.connected', {val: true, ack: true, expire: 30, from: id});
            that.outputCount++;
        }
        //RSS is the resident set size, the portion of the process's memory held in RAM (as opposed to the swap space or the part held in the filesystem).
        var mem = process.memoryUsage();
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
        var id = 'system.adapter.' + that.namespace;

        if (typeof options.unload === 'function') {
            options.unload(function () {
                if (that.states) {
                    that.outputCount++;
                    that.states.setState(id + '.alive', {val: false, ack: true, from: id}, function () {
                        if (!isPause && that.log) that.log.info('terminating');
                        process.exit(isScheduled ? -100: 0);
                    });
                }
            });
        } else {
            that.emit('unload', function () {
                if (that.states) {
                    that.outputCount++;
                    that.states.setState(id + '.alive', {val: false, ack: true, from: id}, function () {
                        if (!isPause && that.log) that.log.info('terminating');
                        process.exit(isScheduled ? -100: 0);
                    });
                }
            });

            // Make delay to let event 'unload' to be processed
            setTimeout(function () {
                if (that.states) {
                    that.outputCount++;
                    that.states.setState(id + '.alive', {val: false, ack: true, from: id}, function () {
                        if (!isPause && that.log) that.log.info('terminating');
                        process.exit(isScheduled ? -100: 0);
                    });

                    // Give 2 seconds to write the value
                    setTimeout(function () {
                        if (!isPause && that.log) that.log.info('terminating with timeout');
                        process.exit(isScheduled ? -100: 0);
                    }, 1000);
                } else {
                    if (!isPause && that.log) that.log.info('terminating');
                    process.exit(isScheduled ? -100: 0);
                }
            }, that.common ? that.common.stopTimeout || 500 : 500);
        }
    }

    process.once('SIGINT', stop);
    process.once('SIGTERM', stop);
    // And the exit event shuts down the child.
    process.once('exit', stop);

    process.on('uncaughtException', function (err) {
        console.error(err);

        // catch it on windows
        if (that.getPortRunning && err.message === 'listen EADDRINUSE') {
            logger.warn(that.namespace + ' Port ' + that.getPortRunning.port + ' is in use. Get next');

            setImmediate(function () {
                that.getPort(that.getPortRunning.port + 1, that.getPortRunning.callback);
            });
            return;
        }

        logger.error(that.namespace + ' uncaught exception: ' + (err.message || err));
        if (err.stack) logger.error(that.namespace + ' ' + err.stack);

		try {
			stop();
			setTimeout(function () {
				process.exit(6);
			}, 1000);
		} catch (err) {
			logger.error(that.namespace + ' exception by stop: ' + (err.message || err));
		}
    });

    return this;
}

// extend the EventEmitter class using our class
util.inherits(Adapter, EventEmitter);

module.exports = Adapter;
