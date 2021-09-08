/**
 * Object DB in REDIS - Client
 *
 * Copyright (c) 2018-2021 ioBroker GmbH - All rights reserved.
 *
 * You may not to use, modify or distribute this package in any form without explicit agreement from ioBroker GmbH.
 *
 * Unauthorized using, modifying or copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential
 * Written by bluefox <dogafox@gmail.com>, 2014-2019
 *
 */
/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
/* jshint -W061 */
'use strict';

const extend                = require('node.extend');
const Redis                 = require('ioredis');
const tools                 = require('@iobroker/db-base').tools;
const fs                    = require('fs');
const path                  = require('path');
const crypto                = require('crypto');
const { isDeepStrictEqual } = require('util');
const deepClone             = require('deep-clone');
const utils                 = require('./objectsUtils.js');

function initScriptFiles() {
    const scripts = {};
    try {
        fs.readdirSync(__dirname + '/lib/objects/lua')
            .forEach(name => scripts[name.replace(/.lua$/, '')] = fs.readFileSync(path.join(__dirname, 'lua', name)).toString('utf8'));
    } catch {
        // TODO
    }
    return scripts;
}
const scriptFiles = initScriptFiles();

class ObjectsInRedisClient {

    constructor(settings) {
        this.settings = settings || {};
        this.redisNamespace = (this.settings.redisNamespace || (this.settings.connection && this.settings.connection.redisNamespace) || 'cfg') + '.';
        this.fileNamespace = this.redisNamespace + 'f.';
        this.fileNamespaceL = this.fileNamespace.length;
        this.objNamespace = this.redisNamespace + 'o.';
        this.objNamespaceL = this.objNamespace.length;

        this.stop = false;
        this.client = null;
        this.sub = null;
        this.subSystem = null;
        this.preserveSettings = ['custom', 'smartName', 'material', 'habpanel', 'mobile'];
        this.defaultNewAcl = this.settings.defaultNewAcl || null;
        this.namespace = this.settings.namespace || this.settings.hostname || '';
        this.scripts = {};

        // cached meta objects for file operations
        this.existingMetaObjects = {};

        this.log = tools.getLogger(this.settings.logger);

        if (this.settings.autoConnect !== false) {
            this.connectDb();
        }
    }

    connectDb() {
        this.settings.connection = this.settings.connection || {};

        const ioRegExp = new RegExp('^' + this.objNamespace.replace(/\./g, '\\.') + '[_A-Za-z0-9ÄÖÜäöüа-яА-Я]+'); // cfg.o.[_A-Za-z0-9]+

        const onChange = this.settings.change; // on change handler
        const onChangeUser = this.settings.changeUser; // on change handler for User events

        // limit max number of log entries in the list
        this.settings.connection.maxQueue = this.settings.connection.maxQueue || 1000;

        this.settings.connection.options = this.settings.connection.options || {};
        const retry_max_delay = this.settings.connection.options.retry_max_delay || 5000;
        const retry_max_count = this.settings.connection.options.retry_max_count || 19;

        let ready = false;
        let initError = false;
        let ignoreErrors = false;
        let connected = false;
        let reconnectCounter = 0;
        let errorLogged = false;

        this.settings.connection.options.retryStrategy = reconnectCount => {
            if (!ready && initError && ignoreErrors) {
                return new Error('No more tries');
            }
            if (this.stop) {
                return new Error('Client has stopped ... no retries anymore');
            }
            if (ready && reconnectCount >= retry_max_count) {
                return new Error('Stop trying to reconnect');
            }
            // A function that receives an options object as parameter including the retry attempt,
            // the total_retry_time indicating how much time passed since the last time connected,
            // the error why the connection was lost and the number of times_connected in total.
            // If you return a number from this function, the retry will happen exactly after that
            // time in milliseconds. If you return a non-number, no further retry will happen and
            // all offline commands are flushed with errors. Return an error to return that
            // specific error to all offline commands.

            if (!ready) {
                return 300;
            } else {
                return retry_max_delay;
            }
            /*if (options.error.code === 'ECONNREFUSED') {
                // End reconnecting on a specific error and flush all commands with a individual error
                return new Error('The server refused the connection');
            }
            if (options.total_retry_time > 1000 * 60 * 60) {
                // End reconnecting after a specific timeout and flush all commands with a individual error
                return new Error('Retry time exhausted');
            }
            if (options.times_connected > 10) {
                // End reconnecting with built in error
                return undefined;
            }
            // reconnect after
            return Math.max(options.attempt * 100, 3000);*/
        };

        delete this.settings.connection.options.retry_max_delay;
        this.settings.connection.options.enableReadyCheck = true;

        if (this.settings.connection.port === 0) { // Port = 0 means unix socket
            // initiate a unix socket connection
            this.settings.connection.options.path = this.settings.connection.host;
            this.log.debug(this.namespace + ' Redis Objects: Use File Socket for connection: ' + this.settings.connection.options.path);
        } else if (Array.isArray(this.settings.connection.host)) { // Host is an array means we use a sentinel
            const defaultPort = Array.isArray(this.settings.connection.port) ? null : this.settings.connection.port;

            this.settings.connection.options.sentinels = this.settings.connection.host.map((redisNode, idx) => ({
                host: redisNode,
                port: defaultPort || this.settings.connection.port[idx]
            }));

            this.settings.connection.options.name = this.settings.connection.sentinelName ? this.settings.connection.sentinelName : 'mymaster';
            this.log.debug(this.namespace + ' Redis Objects: Use Sentinel for connection: ' + this.settings.connection.options.name + ', ' + JSON.stringify(this.settings.connection.options.sentinels));
        } else {
            this.settings.connection.options.host = this.settings.connection.host;
            this.settings.connection.options.port = this.settings.connection.port;
            this.log.debug(this.namespace + ' Redis Objects: Use Redis connection: ' + this.settings.connection.options.host + ':' + this.settings.connection.options.port);
        }
        this.settings.connection.options.db = this.settings.connection.options.db || 0;
        this.settings.connection.options.family = this.settings.connection.options.family || 0;
        this.settings.connection.options.password = this.settings.connection.options.auth_pass || this.settings.connection.pass || null;

        this.settings.connection.options.autoResubscribe = false; // We do our own resubscribe because other sometimes not work
        // REDIS does not allow whitespaces, we have some because of pid
        this.settings.connection.options.connectionName = this.namespace.replace(/\s/g, '');

        this.client = new Redis(this.settings.connection.options);

        this.client.on('error', error => {
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' Redis ERROR Objects: (' + ignoreErrors + '/' + this.stop + ') ' + error.message + ' / ' + error.stack);
            if (this.stop) {
                return;
            }
            if (!ready) {
                initError = true;
                // Seems we have a socket.io server
                if (!ignoreErrors && error.message.startsWith('Protocol error, got "H" as reply type byte.')) {
                    this.log.error(this.namespace + ' Could not connect to objects database at ' + this.settings.connection.options.host + ':' + this.settings.connection.options.port + ' (invalid protocol). Please make sure the configured IP and port points to a host running JS-Controller >= 2.0. and that the port is not occupied by other software!');
                }
                return;
            }
            this.log.error(this.namespace + ' Objects database error: ' + error.message);
            errorLogged = true;
        });

        this.client.on('end', () => {
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' Objects-Redis Event end (stop=' + this.stop + ')');
            ready && typeof this.settings.disconnected === 'function' && this.settings.disconnected();
        });

        this.client.on('connect', () => {
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' Objects-Redis Event connect (stop=' + this.stop + ')');
            connected = true;
            if (errorLogged) {
                this.log.info(this.namespace + ' Objects database successfully reconnected');
                errorLogged = false;
            }
        });

        this.client.on('close', () => {
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' Objects-Redis Event close (stop=' + this.stop + ')');
            //if (ready && typeof this.settings.disconnected === 'function') this.settings.disconnected();
        });

        this.client.on('reconnecting', () => {
            if (connected && !ready && !initError && !ignoreErrors) {
                reconnectCounter++;
            }

            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' Objects-Redis Event reconnect (reconnectCounter=' + reconnectCounter + ', stop=' + this.stop + ')');

            if (reconnectCounter > 2) { // fallback logic for nodejs <10
                this.log.error(this.namespace + ' The DB port  ' + this.settings.connection.options.port +' is occupied by something that is not a Redis protocol server. Please check other software running on this port or, if you use iobroker, make sure to update to js-controller 2.0 or higher!');
                return;
            }
            connected = false;
            initError = false;
        });

        this.client.on('ready', async () => {
            if (this.stop) {
                return;
            }
            initError = false;
            ignoreErrors = false;

            this.log.debug(this.namespace + ' Objects client ready ... initialize now');
            try {
                await this.client.config('set', ['lua-time-limit', 10000]); // increase LUA timeout TODO needs better fix
            } catch (e) {
                this.log.warn(`${this.namespace} Unable to increase LUA script timeout: ${e.message}`);
            }

            let initCounter = 0;
            if (!this.subSystem && typeof onChange === 'function') {
                initCounter++;
                this.log.debug(this.namespace + ' Objects create System PubSub Client');
                this.subSystem = new Redis(this.settings.connection.options);
                this.subSystem.ioBrokerSubscriptions = {};

                if (typeof onChange === 'function') {
                    this.subSystem.on('pmessage', (pattern, channel, message) =>
                        setImmediate(() => {
                            this.log.silly(`${this.namespace} Objects system redis pmessage ${pattern}/${channel}:${message}`);
                            try {
                                if (ioRegExp.test(channel)) {
                                    const id = channel.substring(this.objNamespaceL);
                                    try {
                                        const obj = message ? JSON.parse(message) : null;

                                        if (id === 'system.config' &&
                                            obj &&
                                            obj.common &&
                                            obj.common.defaultNewAcl &&
                                            !isDeepStrictEqual(obj.common.defaultNewAcl, this.defaultNewAcl)) {
                                            this.defaultNewAcl = JSON.parse(JSON.stringify(obj.common.defaultNewAcl));
                                            this.settings.controller && this.setDefaultAcl(this.defaultNewAcl);
                                        }

                                        onChange(id, obj);
                                    } catch (e) {
                                        this.log.warn(`${this.namespace} Objects Cannot process system pmessage ${id} - ${message}: ${e.message}`);
                                        this.log.warn(`${this.namespace} ${e.stack}`);
                                    }
                                } else {
                                    this.log.warn(`${this.namespace} Objects Received unexpected system pmessage: ${channel}`);
                                }
                            } catch (e) {
                                this.log.warn(this.namespace + ' Objects system pmessage ' + channel + ' ' + JSON.stringify(message) + ' ' + e.message);
                                this.log.warn(this.namespace + ' ' + e.stack);
                            }
                        }));
                }

                this.subSystem.on('end', () => {
                    this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' Objects-Redis System Event end sub (stop=' + this.stop + ')');
                    ready && typeof this.settings.disconnected === 'function' && this.settings.disconnected();
                });

                this.subSystem.on('error', error => {
                    if (this.stop) {
                        return;
                    }
                    this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' PubSub System client Objects No redis connection: ' + JSON.stringify(error));
                });

                if (this.settings.connection.enhancedLogging) {
                    this.subSystem.on('connect', () =>
                        this.log.silly(this.namespace + ' PubSub System client Objects-Redis Event connect (stop=' + this.stop + ')'));

                    this.subSystem.on('close', () =>
                        this.log.silly(this.namespace + ' PubSub System client Objects-Redis Event close (stop=' + this.stop + ')'));

                    this.subSystem.on('reconnecting', reconnectCounter =>
                        this.log.silly(this.namespace + ' PubSub System client Objects-Redis Event reconnect (reconnectCounter=' + reconnectCounter + ', stop=' + this.stop + ')'));
                }

                this.subSystem.on('ready', async () => {
                    if (--initCounter < 1) {
                        if (this.settings.connection.port === 0) {
                            this.log.debug(this.namespace + ' Objects ' + (ready ? 'system re' : '') + 'connected to redis: ' + this.settings.connection.host);
                        } else {
                            this.log.debug(this.namespace + ' Objects ' + (ready ? 'system re' : '') + 'connected to redis: ' + this.settings.connection.host + ':' + this.settings.connection.port);
                        }
                        !ready && typeof this.settings.connected === 'function' && this.settings.connected();
                        ready = true;
                    }
                    // subscribe on system.config anytime because also adapters need stuff like defaultNewAcl (especially admin)
                    try {
                        this.subSystem && await this.subSystem.psubscribe(`${this.objNamespace}system.config`);
                    } catch {
                        // ignore
                    }

                    if (this.subSystem) {
                        for (const sub of Object.keys(this.subSystem.ioBrokerSubscriptions)) {
                            try {
                                await this.subSystem.psubscribe(sub);
                            } catch {
                                // ignore
                            }
                        }
                    }
                });
            }

            if (!this.sub && typeof onChangeUser === 'function') {
                initCounter++;
                this.log.debug(this.namespace + ' Objects create User PubSub Client');
                this.sub = new Redis(this.settings.connection.options);
                this.sub.ioBrokerSubscriptions = {};

                this.sub.on('pmessage', (pattern, channel, message) => {
                    setImmediate(() => {
                        this.log.silly(this.namespace + ' Objects user redis pmessage ' + pattern + '/' + channel + ':' + message);
                        try {
                            if (ioRegExp.test(channel)) {
                                const id = channel.substring(this.objNamespaceL);
                                try {
                                    const obj = message ? JSON.parse(message) : null;

                                    onChangeUser(id, obj);
                                } catch (e) {
                                    this.log.warn(`${this.namespace} Objects user cannot process pmessage ${id} - ${message}: ${e.message}`);
                                    this.log.warn(`${this.namespace} ${e.stack}`);
                                }
                            } else {
                                this.log.warn(`${this.namespace} Objects user received unexpected pmessage: ${channel}`);
                            }
                        } catch (e) {
                            this.log.warn(this.namespace + ' Objects user pmessage ' + channel + ' ' + JSON.stringify(message) + ' ' + e.message);
                            this.log.warn(this.namespace + ' ' + e.stack);
                        }
                    });
                });

                this.sub.on('end', () => {
                    this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' Objects-Redis Event end user sub (stop=' + this.stop + ')');
                    ready && typeof this.settings.disconnected === 'function' && this.settings.disconnected();
                });

                this.sub.on('error', error => {
                    if (this.stop) {
                        return;
                    }
                    this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' PubSub user client Objects No redis connection: ' + JSON.stringify(error));
                });

                if (this.settings.connection.enhancedLogging) {
                    this.sub.on('connect', () =>
                        this.log.silly(this.namespace + ' PubSub user client Objects-Redis Event connect (stop=' + this.stop + ')'));

                    this.sub.on('close', () =>
                        this.log.silly(this.namespace + ' PubSub user client Objects-Redis Event close (stop=' + this.stop + ')'));

                    this.sub.on('reconnecting', reconnectCounter =>
                        this.log.silly(this.namespace + ' PubSub user client Objects-Redis Event reconnect (reconnectCounter=' + reconnectCounter + ', stop=' + this.stop + ')'));
                }

                this.sub.on('ready', async () => {
                    if (--initCounter < 1) {
                        if (this.settings.connection.port === 0) {
                            this.log.debug(this.namespace + ' Objects ' + (ready ? 'user re' : '') + 'connected to redis: ' + this.settings.connection.host);
                        } else {
                            this.log.debug(this.namespace + ' Objects ' + (ready ? 'user re' : '') + 'connected to redis: ' + this.settings.connection.host + ':' + this.settings.connection.port);
                        }
                        !ready && typeof this.settings.connected === 'function' && this.settings.connected();
                        ready = true;
                    }

                    for (const sub of Object.keys(this.sub.ioBrokerSubscriptions)) {
                        try {
                            await this.sub.psubscribe(sub);
                        } catch {
                            // ignore
                        }
                    }
                });
            }

            this.log.debug(this.namespace + ' Objects client initialize lua scripts');
            initCounter++;
            try {
                await this.loadLuaScripts();
            } catch (err) {
                this.log.error(`${this.namespace} Cannot initialize database scripts: ${err.message}`);
                return;
            }
            if (!this.client) {
                return;
            }
            // init default new acl
            let obj;
            try {
                obj = await this.client.get(this.objNamespace + 'system.config');
            } catch {
                // ignore
            }
            if (obj) {
                try {
                    obj = JSON.parse(obj);
                } catch {
                    this.log.error(`${this.namespace} Cannot parse JSON system.config: ${obj}`);
                    obj = null;
                }
                if (obj && obj.common && obj.common.defaultNewAcl) {
                    this.defaultNewAcl = obj.common.defaultNewAcl;
                }
            } else {
                this.log.error(`${this.namespace} Cannot read system.config: ${obj} (OK when migrating or restoring)`);
            }

            if (--initCounter < 1) {
                if (this.settings.connection.port === 0) {
                    this.log.debug(this.namespace + ' Objects ' + (ready ? 'client re' : '') + 'connected to redis: ' + this.settings.connection.host);
                } else {
                    this.log.debug(this.namespace + ' Objects ' + (ready ? 'client re' : '') + 'connected to redis: ' + this.settings.connection.host + ':' + this.settings.connection.port);
                }
                !ready && typeof this.settings.connected === 'function' && this.settings.connected();
                ready = true;
            }
        });
    }

    getStatus() {
        return {type: 'redis', server: false};
    }

    /**
     * Checks if given Id is a meta object, else throws error
     *
     * @param {string} id to check
     * @throws Error if id is invalid
     */
    async validateMetaObject(id) {
        if (this.existingMetaObjects[id] === undefined) {
            // if not cached -> getObject
            const obj = await this.getObjectAsync(id);
            if (obj && obj.type === 'meta') {
                this.existingMetaObjects[id] = true;
            } else {
                this.existingMetaObjects[id] = false;
                return Promise.reject(new Error(`${id} is not an object of type "meta"`));
            }
        } else if (this.existingMetaObjects[id] === false) {
            return Promise.reject(new Error(`${id} is not an object of type "meta"`));
        }
    }

    normalizeFilename(name) {
        return name ? name.replace(/[/\\]+/g, '/') : name;
    }

    // -------------- FILE FUNCTIONS -------------------------------------------
    async _setBinaryState(id, data, callback) {
        if (!this.client) {
            return typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_DB_CLOSED));
        }
        if (!Buffer.isBuffer(data)) {
            data = Buffer.from(data);
        }
        try {
            await this.client.set(id, data);
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * get buffer of given id from redis
     *
     * @param {string} id - id of the data with namespace prefix
     * @param {function(Error|null, Buffer?):void} [callback] - cb function, if not given a Promise is returned
     * @return {Promise<Buffer|void>}
     * @private
     */
    async _getBinaryState(id, callback) {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            const data = await this.client.getBuffer(id);
            return tools.maybeCallbackWithError(callback, null, data);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * deletes binary state of given id from redis db
     *
     * @param {string} id - id to delete, with namespace prefix
     * @param {function(Error|null):void} [callback] - callback function, if not given promise is returned
     * @return {Promise<void>}
     * @private
     */
    async _delBinaryState(id, callback) {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        } else {
            try {
                await this.client.del(id);
                return tools.maybeCallback(callback);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
    }

    getFileId(id, name, isMeta) {
        name = this.normalizeFilename(name);
        // e.g. ekey.admin and admin/ekey.png
        if (id.match(/\.admin$/)) {
            if (name.match(/^admin\//)) {
                name = name.replace(/^admin\//, '');
            } else
            // e.g. ekey.admin and iobroker.ekey/admin/ekey.png
            if (name.match(/^iobroker.[-\d\w]\/admin\//i)) {
                name = name.replace(/^iobroker.[-\d\w]\/admin\//i, '');
            }
        }
        let normalized;
        try {
            normalized = utils.sanitizePath(id, name);
        } catch {
            this.log.debug(this.namespace + ' Invalid file path ' + id + '/' + name);
            return '';
        }
        if (id !== '*') {
            id = normalized.id;
        }
        name = normalized.name;

        return this.fileNamespace + id + '$%$' + name + (isMeta !== undefined ? (isMeta ? '$%$meta' : '$%$data') : '');
    }

    async checkFile(id, name, options, flag, callback) {
        // read file settings from redis
        const fileId = this.getFileId(id, name, true);
        if (!fileId) {
            const fileOptions = {'notExists': true};
            if (utils.checkFile(fileOptions, options, flag, this.defaultNewAcl)) {
                return typeof callback === 'function' && setImmediate(() => callback(false, options, fileOptions)); // NO error
            } else {
                return typeof callback === 'function' && setImmediate(() => callback(true, options)); // error
            }
        }
        if (!this.client) {
            return typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_DB_CLOSED, options));
        }
        let fileOptions;
        try {
            fileOptions = await this.client.get(fileId);
        } catch {
            // ignore
        }
        fileOptions = fileOptions || '{"notExists": true}';
        try {
            fileOptions = JSON.parse(fileOptions);
        } catch {
            this.log.error(`${this.namespace} Cannot parse JSON ${id}: ${fileOptions}`);
            fileOptions = {notExists: true};
        }
        if (utils.checkFile(fileOptions, options, flag, this.defaultNewAcl)) {
            return typeof callback === 'function' && callback(false, options, fileOptions); // NO error
        } else {
            return typeof callback === 'function' && callback(true, options); // error
        }
    }

    checkFileRights(id, name, options, flag, callback) {
        return utils.checkFileRights(this, id, name, options, flag, callback);
    }

    _setDefaultAcl(ids, defaultAcl) {
        if (ids && ids.length) {
            const id = ids.shift();
            this.getObject(id, (err, obj) => {
                if (obj && !obj.acl) {
                    obj.acl = defaultAcl;
                    this.setObject(id, obj, null, () =>
                        setImmediate(() =>
                            this._setDefaultAcl(ids, defaultAcl)));
                } else {
                    setImmediate(() =>
                        this._setDefaultAcl(ids, defaultAcl));
                }
            });
        }
    }

    setDefaultAcl(defaultNewAcl) {
        this.defaultNewAcl = defaultNewAcl || {
            owner: utils.CONSTS.SYSTEM_ADMIN_USER,
            ownerGroup: utils.CONSTS.SYSTEM_ADMIN_GROUP,
            object: 0x664,
            state: 0x664,
            file: 0x664
        };
        // Get ALL Objects
        this.getKeys('*', (err, ids) => this._setDefaultAcl(ids, this.defaultNewAcl));
    }

    getUserGroup(user, callback) {
        return utils.getUserGroup(this, user, (error, user, userGroups, userAcl) => {
            if (error) {
                this.log.error(`${this.namespace} ${error}`);
            }
            return tools.maybeCallbackWithError(callback, user, userGroups, userAcl);
        });
    }

    insert(id, attName, ignore, options, obj, callback) {
        return utils.insert(this, id, attName, ignore, options, obj, callback);
    }

    async _writeFile(id, name, data, options, callback, meta) {
        const ext         = name.match(/\.[^.]+$/);
        const mime        = utils.getMimeType(ext);
        const _mimeType   = mime.mimeType;
        const isBinary    = mime.isBinary;

        const metaID = this.getFileId(id, name, true);
        if (!this.client) {
            return typeof callback === 'function' && callback(utils.ERRORS.ERROR_DB_CLOSED);
        }
        // virtual files only get Meta objects
        if (options.virtualFile) {
            meta = {
                notExists: true,
                virtualFile: true
            }; // Store file with flags as it would not exist
            try {
                await this.client.set(metaID, JSON.stringify(meta));
                return tools.maybeCallback(callback);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        } else {
            if (!meta) {
                meta = {createdAt: Date.now()};
            }
            if (!meta.acl) {
                meta.acl = {
                    owner: options.user || (this.defaultNewAcl && this.defaultNewAcl.owner) || utils.CONSTS.SYSTEM_ADMIN_USER,
                    ownerGroup: options.group || (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                    permissions: options.mode || (this.defaultNewAcl && this.defaultNewAcl.file) || 0x644
                };
            }
            meta.stats = {
                size: data ? data.length : 0
            };
            if (Object.prototype.hasOwnProperty.call(meta, 'notExists')) {
                delete meta.notExists;
            }

            meta.mimeType = options.mimeType || _mimeType;
            meta.binary = isBinary;
            meta.acl.ownerGroup = meta.acl.ownerGroup || (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP;
            meta.modifiedAt = Date.now();

            this._setBinaryState(this.getFileId(id, name, false), data, async err => {
                try {
                    await this.client.set(metaID, JSON.stringify(meta));
                    return tools.maybeCallbackWithError(callback, err);
                } catch (e) {
                    return tools.maybeCallbackWithRedisError(callback, err || e);
                }
            });
        }
    }

    async writeFile(id, name, data, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof options === 'string') {
            options = {mimeType: options};
        }

        if (options && options.acl) {
            options.acl = null;
        }

        if (!callback) {
            return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
                this.writeFile(id, name, data, options, err =>
                    err ? reject(err) : resolve())));
        }

        try {
            await this.validateMetaObject(id);
        } catch (e) {
            this.log.error(`${this.namespace} Cannot write file ${name}: ${e.message}`);
            return tools.maybeCallbackWithError(callback, e);
        }

        if (typeof name !== 'string' || !name.length || name === '/') {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
        }

        if (name.startsWith('/')) {
            name = name.substring(1);
        }

        if (data === undefined) {
            data = null;
        }

        // If file yet exists => check the permissions
        return this.checkFileRights(id, name, options, utils.CONSTS.ACCESS_WRITE, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                return this._writeFile(id, name, data, options, callback, meta);
            }
        });
    }

    writeFileAsync(id, name, data, options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.writeFile(id, name, data, options, err =>
                err ? reject(err) : resolve())));
    }

    async _readFile(id, name, options, callback, meta) {
        if (meta.notExists) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }

        let buffer;
        try {
            buffer = await this._getBinaryState(this.getFileId(id, name, false));
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }
        const mimeType = meta && meta.mimeType;
        if (meta && !meta.binary && buffer) {
            buffer = buffer.toString();
        }
        return tools.maybeCallbackWithError(callback, null, buffer, mimeType);
    }

    readFile(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }

        if (!callback) {
            return new Promise((resolve, reject) =>
                this.readFile(id, name, options, (err, res, mimeType) =>
                    err ? reject(err) : resolve({data: res, mimeType: mimeType})));
        }

        if (typeof name !== 'string' || !name.length || name === '/') {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
        }

        if (name.startsWith('/')) {
            name = name.substring(1);
        }

        options = options || {};
        this.checkFileRights(id, name, options, utils.CONSTS.ACCESS_READ, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                return this._readFile(id, name, options, callback, meta);
            }
        });
    }

    readFileAsync(id, name, options) {
        return new Promise((resolve, reject) =>
            this.readFile(id, name, options, (err, res, mimeType) =>
                err ? reject(err) : resolve({data: res, mimeType: mimeType})));
    }

    /**
     * Check if given object exists
     *
     * @param {string} id id of the object
     * @param {object} [options] optional user context
     * @return {Promise<boolean>}
     */
    async objectExists(id, options) {
        if (!this.client) {
            return Promise.reject(new Error(utils.ERRORS.ERROR_DB_CLOSED));
        }
        if (!id || typeof id !== 'string') {
            return Promise.reject(new Error(`invalid id ${JSON.stringify(id)}`));
        }

        try {
            await /** @type {Promise<void>} */ (new Promise((resolve, reject) => {
                utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_LIST, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }));
            const exists = await this.client.exists(this.objNamespace + id);
            return !!exists;
        } catch (e) {
            this.log.error(`${this.namespace} Cannot check object existence of "${id}": ${e.message}`);
            return Promise.reject(new Error(`Cannot check object existence of "${id}": ${e.message}`));
        }
    }

    /**
     * Check if given file exists
     *
     * @param {string} id id of the namespace
     * @param {string} [name] name of the file
     * @param {object} [options] optional user context
     * @returns {Promise<boolean>}
     */
    async fileExists(id, name, options) {
        if (typeof name !== 'string') {
            name = '';
        }

        if (name.startsWith('/')) {
            name = name.substring(1);
        }

        try {
            await /** @type {Promise<void>} */ (new Promise((resolve, reject) => {
                this.checkFileRights(id, name, options, utils.CONSTS.ACCESS_READ, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }));
            id = this.getFileId(id, name, false);
            const exists = await this.client.exists(id);
            return !!exists;
        } catch (e) {
            this.log.error(`${this.namespace} Cannot check file existence of "${id}": ${e.message}`);
            return Promise.reject(new Error(`Cannot check file existence of "${id}": ${e.message}`));
        }
    }

    async _unlink(id, name, options, callback, meta) {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }
        if (meta && meta.notExists) {
            this._rm(id, name, options, callback);
            //typeof callback === 'function' && callback(utils.ERRORS.ERROR_NOT_FOUND);
        } else {
            const metaID = this.getFileId(id, name, true);
            const dataID = this.getFileId(id, name, false);
            try {
                await this._delBinaryState(dataID);
                await this.client.del(metaID);
                return tools.maybeCallback(callback);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
    }

    unlink(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof name !== 'string') {
            name = '';
        }

        if (name.startsWith('/')) {
            name = name.substring(1);
        }

        this.checkFileRights(id, name, options, utils.CONSTS.ACCESS_DELETE, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file['delete']) {
                    return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_PERMISSION);
                } else {
                    return this._unlink(id, name, options, callback, meta);
                }
            }
        });
    }

    unlinkAsync(id, name, options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.unlink(id, name, options, err =>
                err ? reject(err) : resolve())));
    }

    delFile(id, name, options, callback) {
        return this.unlink(id, name, options, callback);
    }

    delFileAsync(id, name, options) {
        return this.unlinkAsync(id, name, options);
    }

    async _readDir(id, name, options, callback) {
        name = this.normalizeFilename(name);
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }
        if (id === '') { // special case for "root"
            const dirID = this.getFileId('*', '*');

            let keys;
            try {
                keys = await this._getKeysViaScan(dirID);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }

            if (!this.client) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
            }

            const result = [];
            if (!keys || !keys.length) {
                return tools.maybeCallbackWithError(callback, null, result);
            }
            let lastDir;
            keys.sort().forEach(dir => {
                dir = dir.substring(this.fileNamespaceL, dir.indexOf('$%$'));
                if (dir !== lastDir) {
                    result.push({
                        file: dir,
                        stats: {},
                        isDir: true
                    });
                }
                lastDir = dir;
            });
            return tools.maybeCallbackWithError(callback, null, result);
        }

        const dirID = this.getFileId(id, name + (name.length ? '/' : '') + '*');

        let keys;
        try {
            keys = await this._getKeysViaScan(dirID);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }

        const start = dirID.indexOf('$%$') + 3;
        const end = '$%$meta'.length;

        const baseName = name + (name.length ? '/' : '');
        const dirs = [];
        const deepLevel = baseName.split('/').length;
        if (!keys || !keys.length) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND, []);
        }
        keys = keys
            .sort()
            .filter(key => {
                if (key.match(/\$%\$meta$/)) {
                    const parts = key.substr(start, key.length - end).split('/');
                    if (parts.length === deepLevel) {
                        return !key.includes('/_data.json$%$') && key !== '_data.json'; // sort out "virtual" files that are used to mark directories
                    } else {
                        const dir = parts[deepLevel - 1];
                        if (dirs.indexOf(dir) === -1) {
                            dirs.push(dir);
                        }
                    }
                }
            });
        if (!keys.length) {
            const result = [];
            while (dirs.length) {
                result.push({
                    file: dirs.shift(),
                    stats: {},
                    isDir: true
                });
            }
            return tools.maybeCallbackWithError(callback, null, result);
        }

        // Check permissions
        let objs;
        try {
            objs = await this.client.mget(keys);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        const result = [];
        const dontCheck =
                    options.user === utils.CONSTS.SYSTEM_ADMIN_USER ||
                    options.group !== utils.CONSTS.SYSTEM_ADMIN_GROUP ||
                    (options.groups && options.groups.indexOf(utils.CONSTS.SYSTEM_ADMIN_GROUP) !== -1);

        objs = objs || [];
        for (let i = 0; i < keys.length; i++) {
            const file = keys[i].substring(start + baseName.length, keys[i].length - end);
            while (dirs.length && dirs[0] < file) {
                result.push({
                    file: dirs.shift(),
                    stats: {},
                    isDir: true
                });
            }

            try {
                objs[i] = JSON.parse(objs[i]);
            } catch {
                this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${objs[i]}`);
                continue;
            }
            if (dontCheck || utils.checkObject(objs[i], options, utils.CONSTS.ACCESS_READ)) {
                if (!objs[i] || objs[i].virtualFile) {
                    continue;
                } // virtual file, ignore
                objs[i].acl = objs[i].acl || {};
                if (options.user !== utils.CONSTS.SYSTEM_ADMIN_USER && options.groups.indexOf(utils.CONSTS.SYSTEM_ADMIN_GROUP) === -1) {
                    objs[i].acl.read  = !!(objs[i].acl.permissions & utils.CONSTS.ACCESS_EVERY_READ);
                    objs[i].acl.write = !!(objs[i].acl.permissions & utils.CONSTS.ACCESS_EVERY_WRITE);
                } else {
                    objs[i].acl.read  = true;
                    objs[i].acl.write = true;
                }
                result.push({
                    file: file,
                    stats: objs[i].stats,
                    isDir: false,
                    acl: objs[i].acl,
                    modifiedAt: objs[i].modifiedAt,
                    createdAt:  objs[i].createdAt
                });
            }
        }
        while (dirs.length) {
            result.push({
                file: dirs.shift(),
                stats: {},
                isDir: true
            });
        }
        return tools.maybeCallbackWithError(callback, null, result);
    }

    readDir(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof name !== 'string') {
            name = '';
        }

        // remove first and last
        if (name.startsWith('/')) {
            name = name.substring(1);
        }
        if (name.endsWith('/')) {
            name = name.substring(0, name.length - 1);
        }

        this.checkFileRights(id, name, options, utils.CONSTS.ACCESS_READ, (err, options) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file.list) {
                    return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_PERMISSION);
                } else {
                    this._readDir(id, name, options, callback);
                }
            }
        });
    }

    readDirAsync(id, name, options) {
        return new Promise((resolve, reject) =>
            this.readDir(id, name, options, (err, res) =>
                err ? reject(err) : resolve(res)));
    }

    async _renameHelper(keys, oldBase, newBase, callback) {
        if (!keys || !keys.length) {
            return tools.maybeCallback(callback);
        } else {
            if (!this.client) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
            }
            for (const id of keys) {
                try {
                    try {
                        await this.client.rename(id.replace(/\$%\$meta$/, '$%$data'), id.replace(oldBase, newBase).replace(/\$%\$meta$/, '$%$data'));
                    } catch (e) {
                        // _data.json is not having a data key, so ignore error
                        if (!(id.endsWith('/_data.json$%$meta') && e.message.includes('no such key'))) {
                            throw e;
                        }
                    }
                    await this.client.rename(id, id.replace(oldBase, newBase));
                } catch (e) {
                    return tools.maybeCallbackWithRedisError(callback, e);
                }
            }
            return tools.maybeCallback(callback);
        }
    }

    async _rename(id, oldName, newName, options, callback, meta) {
        const oldMetaID = this.getFileId(id, oldName, true);
        const oldDataID = this.getFileId(id, oldName, false);
        const newMetaID = this.getFileId(id, newName, true);
        const newDataID = this.getFileId(id, newName, false);
        if (!meta || !this.client) {
            return typeof callback === 'function' && callback(utils.ERRORS.ERROR_DB_CLOSED);
        } else if (meta.notExists) {
            oldName = this.normalizeFilename(oldName);
            newName = this.normalizeFilename(newName);

            // it could be dir
            if (!oldName.endsWith('/*')) {
                oldName += '/*';
            } else if (oldName.endsWith('/')) {
                oldName += '*';
            }

            if (!newName.endsWith('/*')) {
                newName += '/*';
            } else if (newName.endsWith('/')) {
                newName += '*';
            }

            const oldBase = oldName.substring(0, oldName.length - 1);
            const newBase = newName.substring(0, newName.length - 1);
            const dirID = this.getFileId(id, oldName);
            let keys;
            try {
                keys = await this._getKeysViaScan(dirID);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }

            if (!this.client) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
            }
            if (!keys) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
            }

            keys = keys
                .sort()
                .filter(key => key.match(/\$%\$meta$/));

            if (!keys.length) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
            }
            // Check permissions
            let objs;
            try {
                objs = await this.client.mget(keys);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
            let result;
            const dontCheck =
                        options.user === utils.CONSTS.SYSTEM_ADMIN_USER ||
                        options.group !== utils.CONSTS.SYSTEM_ADMIN_GROUP ||
                        (options.groups && options.groups.indexOf(utils.CONSTS.SYSTEM_ADMIN_GROUP) !== -1);

            objs = objs || [];
            if (!dontCheck) {
                result = [];
                for (let i = 0; i < keys.length; i++) {
                    try {
                        objs[i] = JSON.parse(objs[i]);
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${objs[i]}`);
                        continue;
                    }
                    if (utils.checkObject(objs[i], options, utils.CONSTS.ACCESS_READ)) {
                        result.push(keys[i]);
                    }
                }
            } else {
                result = keys;
            }
            return this._renameHelper(result, oldBase, newBase, callback);
        } else {
            try {
                await this.client.rename(oldDataID, newDataID);
                await this.client.rename(oldMetaID, newMetaID);
                return tools.maybeCallback(callback);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
    }

    rename(id, oldName, newName, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }
        if (typeof oldName !== 'string' || !oldName.length || oldName === '/' || oldName === '//' ||
            typeof newName !== 'string' || !newName.length || newName === '/' || newName === '//') {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
        }
        if (oldName.startsWith('/')) {
            oldName = oldName.substring(1);
        }
        if (newName.startsWith('/')) {
            newName = newName.substring(1);
        }
        if (oldName.endsWith('/')) {
            oldName = oldName.substring(0, oldName.length - 1);
        }
        if (newName.endsWith('/')) {
            newName = newName.substring(0, newName.length - 1);
        }

        this.checkFileRights(id, oldName, options, utils.CONSTS.ACCESS_WRITE, (err, options, meta) => {
            if (err) {
                typeof callback === 'function' && callback(err);
            } else {
                if (!options.acl.file.write) {
                    typeof callback === 'function' && callback(utils.ERRORS.ERROR_PERMISSION);
                } else {
                    this._rename(id, oldName, newName, options, callback, meta);
                }
            }
        });
    }

    renameAsync(id, oldName, newName, options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.rename(id, oldName, newName, options, err =>
                err ? reject(err) : resolve())));
    }

    async _touch(id, name, options, callback, meta) {
        const metaID = this.getFileId(id, name, true);
        if (!this.client) {
            return typeof callback === 'function' && callback(utils.ERRORS.ERROR_DB_CLOSED);
        }
        if (!meta || meta.notExists) {
            return typeof callback === 'function' && callback(utils.ERRORS.ERROR_NOT_FOUND);
        }
        meta.modifiedAt = Date.now();
        try {
            await this.client.set(metaID, JSON.stringify(meta));
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    touch(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof name !== 'string' || !name.length || name === '/') {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
        }

        if (name.startsWith('/')) {
            name = name.substring(1);
        }

        this.checkFileRights(id, name, options, utils.CONSTS.ACCESS_WRITE, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                return this._touch(id, name, options, callback, meta);
            }
        });
    }

    touchAsync(id, name, options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.touch(id, name, options, err =>
                err ? reject(err) : resolve())));
    }

    async _rmHelper(keys, callback) {
        if (!keys || !keys.length) {
            return tools.maybeCallback(callback);
        } else {
            if (!this.client) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
            }

            for (const id of keys) {
                try {
                    await this._delBinaryState(id.replace(/\$%\$meta$/, '$%$data'));
                    await this.client.del(id);
                } catch (e) {
                    return tools.maybeCallbackWithRedisError(callback, e);
                }
            }
            return tools.maybeCallback(callback);
        }
    }

    async _rm(id, name, options, callback, meta) {
        if (meta && !meta.isDir) {
            // it is file
            const metaID = this.getFileId(id, name, true);
            const dataID = this.getFileId(id, name, false);
            this.delObject(dataID, _err => this.delObject(metaID, callback));
        } else {
            if (!this.client) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
            }
            name = this.normalizeFilename(name);
            // it could be dir
            if (! name.endsWith('/*')) {
                name += '/*';
            } else if (name.endsWith('/')) {
                name += '*';
            }
            const dirID = this.getFileId(id, name);
            let keys;
            try {
                keys = await this._getKeysViaScan(dirID);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
            if (!this.client) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
            }
            if (!keys) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
            }

            keys = keys
                .sort()
                .filter(key => key.match(/\$%\$meta$/));

            if (!keys.length) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
            }
            // Check permissions
            let objs;
            try {
                objs = await this.client.mget(keys);
            } catch {
                // ignore
            }
            let result;
            const dontCheck =
                        options.user === utils.CONSTS.SYSTEM_ADMIN_USER ||
                        options.group !== utils.CONSTS.SYSTEM_ADMIN_GROUP ||
                        (options.groups && options.groups.indexOf(utils.CONSTS.SYSTEM_ADMIN_GROUP) !== -1);

            objs = objs || [];
            if (!dontCheck) {
                result = [];
                for (let i = 0; i < keys.length; i++) {
                    try {
                        objs[i] = JSON.parse(objs[i]);
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${objs[i]}`);
                        continue;
                    }
                    if (utils.checkObject(objs[i], options, utils.CONSTS.ACCESS_READ)) {
                        result.push(keys[i]);
                    }
                }
            } else {
                result = keys;
            }
            const files = result.map(key => {
                const name = key.substring(this.fileNamespaceL + id.length + 3, key.length - 7);
                const pos = name.lastIndexOf('/');
                if (pos !== -1) {
                    return {file: name.substring(pos + 1), path: name.substring(0, pos)};
                } else {
                    return {file: id, path: ''};
                }
            });
            this._rmHelper(result, () => {
                return tools.maybeCallbackWithError(callback, null, files);
            });
        }
    }

    rm(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof name !== 'string') {
            name = '';
        }

        this.checkFileRights(id, null, options, utils.CONSTS.ACCESS_DELETE, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file['delete']) {
                    return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_PERMISSION);
                } else {
                    return this._rm(id, name, options, callback, meta && meta.notExists ? null : meta);
                }
            }
        });
    }

    rmAsync(id, name, options) {
        return new Promise((resolve, reject) =>
            this.rm(id, name, options, (err, files) =>
                err ? reject(err) : resolve(files)));
    }

    // simulate. redis has no dirs
    mkdir(id, dirName, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof dirName !== 'string') {
            dirName = '';
        }

        dirName = this.normalizeFilename(dirName);
        if (dirName.startsWith('/')) {
            dirName = dirName.substring(1);
        }
        this.checkFileRights(id, dirName, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file.write) {
                    return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_PERMISSION);
                } else {
                    // we create a dummy file (for file this file exists to store meta data)
                    options = options || {};
                    options.virtualFile = true; // this is a virtual File
                    const realName = dirName + (dirName.endsWith('/') ? '' : '/');
                    this.writeFile(id, realName + '_data.json', '', options, callback);
                }
            }
        });
    }

    mkdirAsync(id, dirName, options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.mkdir(id, dirName, options, err =>
                err ? reject(err) : resolve())));
    }

    async _chownFileHelper(keys, metas, options, callback) {
        if (!keys || !keys.length) {
            return tools.maybeCallback(callback);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }

        for (const id of keys) {
            const meta = metas.shift();
            meta.acl.owner = options.owner;
            meta.acl.ownerGroup = options.ownerGroup;
            try {
                await this.client.set(id, JSON.stringify(meta));
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
        return tools.maybeCallback(callback);
    }

    async _chownFile(id, name, options, callback, meta) {
        if (!meta) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
        }

        name = this.normalizeFilename(name);
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }
        if (!meta.isDir && !meta.notExists) {
            // it is file
            const metaID = this.getFileId(id, name, true);
            meta.acl.owner = options.owner;
            meta.acl.ownerGroup = options.ownerGroup;
            try {
                await this.client.set(metaID, JSON.stringify(meta));
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
            const nameArr = name.split('/');
            const file = nameArr.pop();
            const res = [{
                path:       nameArr.join('/'),
                file:       file,
                stats:      meta.stats,
                isDir:      false,
                acl:        meta.acl || {},
                modifiedAt: meta.modifiedAt,
                createdAt:  meta.createdAt
            }];
            return tools.maybeCallbackWithError(callback, null, res);
        }

        // it could be dir
        if (! name.endsWith('/*')) {
            name += '/*';
        } else if (name.endsWith('/')) {
            name += '*';
        }
        const dirID = this.getFileId(id, name);

        let keys;
        try {
            keys = await this._getKeysViaScan(dirID);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }
        if (!keys) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
        }

        keys = keys
            .sort()
            .filter(key => key.match(/\$%\$meta$/));

        // Check permissions
        let metas;
        try {
            metas = await this.client.mget(keys);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
        const dontCheck = options.user === utils.CONSTS.SYSTEM_ADMIN_USER ||
                    options.group !== utils.CONSTS.SYSTEM_ADMIN_GROUP ||
                    (options.groups && options.groups.indexOf(utils.CONSTS.SYSTEM_ADMIN_GROUP) !== -1);
        const keysFiltered = [];
        const objsFiltered = [];
        const processed = [];
        const start = dirID.indexOf('$%$') + 3;
        const end = '$%$meta'.length;

        metas = metas || [];
        for (let i = 0; i < keys.length; i++) {
            try {
                metas[i] = JSON.parse(metas[i]);
            } catch {
                this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${metas[i]}`);
                continue;
            }
            if (dontCheck || utils.checkObject(metas[i], options, utils.CONSTS.ACCESS_WRITE)) {
                if (!metas[i] || metas[i].virtualFile) {
                    continue;
                } // virtual file, ignore
                keysFiltered.push(keys[i]);
                objsFiltered.push(metas[i]);

                const name = keys[i].substring(start, keys[i].length - end);
                const nameArr = name.split('/');
                const file = nameArr.pop();
                processed.push({
                    path:       nameArr.join('/'),
                    file:       file,
                    stats:      metas[i].stats || {},
                    isDir:      false,
                    acl:        metas[i].acl || {},
                    modifiedAt: metas[i].modifiedAt,
                    createdAt:  metas[i].createdAt
                });
            }
        }
        this._chownFileHelper(keysFiltered, objsFiltered, options, err => {
            return tools.maybeCallbackWithError(callback, err, processed);
        });
    }

    chownFile(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};
        if (typeof options !== 'object') {
            options = {owner: options};
        }

        if (typeof name !== 'string' || !name.length || name === '/') {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
        }

        if (name.startsWith('/')) {
            name = name.substring(1);
        }

        if (!options.ownerGroup && options.group) {
            options.ownerGroup = options.group;
        }
        if (!options.owner      && options.user)  {
            options.owner      = options.user;
        }

        if (!options.owner) {
            this.log.error(this.namespace + ' user is not defined');
            return tools.maybeCallbackWithError(callback, 'invalid parameter');
        }

        if (!options.ownerGroup) {
            // get user group
            this.getUserGroup(options.owner, (user, groups /* , permissions */) => {
                if (!groups || !groups[0]) {
                    return tools.maybeCallbackWithError(callback, `user "${options.owner}" belongs to no group`);
                } else {
                    options.ownerGroup = groups[0];
                }
                this.chownFile(id, name, options, callback);
            });
            return;
        }

        this.checkFileRights(id, name, options, utils.CONSTS.ACCESS_WRITE, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file.write) {
                    return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_PERMISSION);
                } else {
                    return this._chownFile(id, name, options, callback, meta);
                }
            }
        });
    }

    chownFileAsync(id, name, options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.chownFile(id, name, options, (err, processed) =>
                err ? reject(err) : resolve(processed))));
    }

    /**
     *
     * @param {array} keys Key names to handle
     * @param {array} metas Objects for the keys to handle
     * @param {object} options options
     * @param {function} callback callback function
     * @returns {Promise<*>}
     * @private
     */
    async _chmodFileHelper(keys, metas, options, callback) {
        if (!keys || !keys.length) {
            return tools.maybeCallback(callback);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }

        for (const i in keys) {
            const id = keys[i];
            const meta = metas[i];
            meta.acl.permissions = options.mode;
            try {
                await this.client.set(id, JSON.stringify(meta));
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
        return tools.maybeCallback(callback);
    }

    async _chmodFile(id, name, options, callback, meta) {
        if (!meta) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
        }
        name = this.normalizeFilename(name);
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }
        if (!meta.isDir && !meta.notExists) {
            // it is file
            const metaID = this.getFileId(id, name, true);
            meta.acl.permissions = options.mode;
            try {
                await this.client.set(metaID, JSON.stringify(meta));
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }

            const nameArr = name.split('/');
            const file = nameArr.pop();
            const res = [{
                path:       nameArr.join('/'),
                file:       file,
                stats:      meta.stats,
                isDir:      false,
                acl:        meta.acl || {},
                modifiedAt: meta.modifiedAt,
                createdAt:  meta.createdAt
            }];
            return tools.maybeCallbackWithError(callback, null, res);
        }

        // it could be dir
        if (!name.endsWith('/*')) {
            name += '/*';
        } else if (name.endsWith('/')) {
            name += '*';
        }
        const dirID = this.getFileId(id, name);

        let keys;
        try {
            keys = await this._getKeysViaScan(dirID);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }
        if (!keys) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
        }

        keys = keys
            .sort()
            .filter(key => key.match(/\$%\$meta$/));

        // Check permissions
        let objs;
        try {
            objs = await this.client.mget(keys);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        const dontCheck =
                    options.user === utils.CONSTS.SYSTEM_ADMIN_USER ||
                    options.group !== utils.CONSTS.SYSTEM_ADMIN_GROUP ||
                    (options.groups && options.groups.indexOf(utils.CONSTS.SYSTEM_ADMIN_GROUP) !== -1);

        const keysFiltered = [];
        const objsFiltered = [];
        const processed = [];
        const start = dirID.indexOf('$%$') + 3;
        const end = '$%$meta'.length;

        objs = objs || [];
        for (let i = 0; i < keys.length; i++) {
            try {
                objs[i] = JSON.parse(objs[i]);
            } catch {
                this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${objs[i]}`);
                continue;
            }
            if (dontCheck || utils.checkObject(objs[i], options, utils.CONSTS.ACCESS_WRITE)) {
                if (!objs[i] || objs[i].virtualFile) {
                    continue;
                } // virtual file, ignore
                keysFiltered.push(keys[i]);
                objsFiltered.push(objs[i]);

                const name = keys[i].substring(start, keys[i].length - end);
                const nameArr = name.split('/');
                const file = nameArr.pop();
                processed.push({
                    path:       nameArr.join('/'),
                    file:       file,
                    stats:      objs[i].stats,
                    isDir:      false,
                    acl:        objs[i].acl || {},
                    modifiedAt: objs[i].modifiedAt,
                    createdAt:  objs[i].createdAt
                });
            }
        }
        this._chmodFileHelper(keysFiltered, objsFiltered, options, err =>
            tools.maybeCallbackWithError(callback, err, processed));
    }

    chmodFile(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};

        if (typeof name !== 'string' || !name.length || name === '/') {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_NOT_FOUND);
        }

        if (name[0].startsWith('/')) {
            name = name.substring(1);
        }

        if (typeof options !== 'object') {
            options = {mode: options};
        }

        if (options.mode === undefined) {
            this.log.error(this.namespace + ' mode is not defined');
            return tools.maybeCallbackWithError(callback, 'invalid parameter');
        } else if (typeof options.mode === 'string') {
            options.mode = parseInt(options.mode, 16);
        }

        this.checkFileRights(id, name, options, utils.CONSTS.ACCESS_WRITE, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file.write) {
                    return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_PERMISSION);
                } else {
                    return this._chmodFile(id, name, options, callback, meta);
                }
            }
        });
    }

    chmodFileAsync(id, name, options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.chmodFile(id, name, options, (err, processed) =>
                err ? reject(err) : resolve(processed))));
    }

    enableFileCache(enabled, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (options && options.acl) {
            options.acl = null;
        }

        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_WRITE, (err, _options) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                // cache cannot be enabled
                return tools.maybeCallbackWithError(callback, null, false);
            }
        });
    }

    enableFileCacheAsync(enabled, options) {
        return new Promise((resolve, reject) =>
            this.enableFileCache(enabled, options, (err, res) =>
                err ? reject(err) : resolve(res)));
    }

    // -------------- OBJECT FUNCTIONS -------------------------------------------
    _subscribe(pattern, options, subClient, callback) {
        if (!subClient) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }
        if (Array.isArray(pattern)) {
            let count = pattern.length;
            pattern.forEach(pattern => {
                this.log.silly(`${this.namespace} redis psubscribe ${this.objNamespace}${pattern}`);
                subClient.psubscribe(this.objNamespace + pattern, err => {
                    if (!err) {
                        subClient.ioBrokerSubscriptions[this.objNamespace + pattern] = true;
                    }
                    if (!--count) {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                });

            });
        } else {
            this.log.silly(this.namespace + ' redis psubscribe ' + this.objNamespace + pattern);
            subClient.psubscribe(this.objNamespace + pattern, err => {
                if (!err) {
                    subClient.ioBrokerSubscriptions[this.objNamespace + pattern] = true;
                }
                return tools.maybeCallbackWithError(callback, err);
            });
        }
    }

    subscribeConfig(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._subscribe(pattern, options, this.subSystem, callback);
            }
        });
    }

    subscribe(pattern, options, callback) {
        return this.subscribeConfig(pattern, options, callback);
    }

    subscribeAsync(pattern, options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.subscribe(pattern, options, err =>
                err ? reject(err) : resolve())));
    }

    subscribeUser(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._subscribe(pattern, options, this.sub, callback);
            }
        });
    }

    subscribeUserAsync(pattern, options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.subscribeUser(pattern, options, err =>
                err ? reject(err) : resolve())));
    }

    _unsubscribe(pattern, options, subClient, callback) {
        if (!subClient) {
            return typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_DB_CLOSED));
        }
        if (Array.isArray(pattern)) {
            let count = pattern.length;
            pattern.forEach(pattern => {
                this.log.silly(this.namespace + ' redis punsubscribe ' + this.objNamespace + pattern);
                subClient.punsubscribe(this.objNamespace + pattern, err => {
                    if (!err && subClient.ioBrokerSubscriptions[this.objNamespace + pattern] !== undefined) {
                        delete subClient.ioBrokerSubscriptions[this.objNamespace + pattern];
                    }
                    !--count && typeof callback === 'function' && callback(err);
                });
            });
        } else {
            this.log.silly(this.namespace + ' redis punsubscribe ' + this.objNamespace + pattern);
            subClient.punsubscribe(this.objNamespace + pattern, err => {
                if (!err && subClient.ioBrokerSubscriptions[this.objNamespace + pattern] !== undefined) {
                    delete subClient.ioBrokerSubscriptions[this.objNamespace + pattern];
                }
                typeof callback === 'function' && callback(err);
            });
        }
    }

    unsubscribeConfig(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._unsubscribe(pattern, options, this.subSystem, callback);
            }
        });
    }

    unsubscribe(pattern, options, callback) {
        return this.unsubscribeConfig(pattern, options, callback);
    }

    unsubscribeAsync(pattern, options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.unsubscribe(pattern, options, err =>
                err ? reject(err) : resolve())));
    }

    unsubscribeUser(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._unsubscribe(pattern, options, this.sub, callback);
            }
        });
    }

    unsubscribeUserAsync(pattern, options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.unsubscribeUser(pattern, options, err =>
                err ? reject(err) : resolve())));
    }

    async _objectHelper(keys, objs, callback) {
        if (!keys || !keys.length) {
            typeof callback === 'function' && callback();
        } else {
            if (!this.client) {
                return typeof callback === 'function' && callback(utils.ERRORS.ERROR_DB_CLOSED);
            }
            for (const id of keys) {
                const obj = objs.shift();
                const message = JSON.stringify(obj);
                try {
                    await this.client.set(id, message);
                    await this.client.publish(id, message);
                } catch (e) {
                    return tools.maybeCallbackWithRedisError(callback, e);
                }
            }
            return tools.maybeCallback(callback);
        }
    }

    _chownObject(pattern, options, callback) {
        this.getConfigKeys(pattern, options, async (err, keys) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            }
            if (!this.client) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
            }

            let objects;
            try {
                objects = await this.client.mget(keys);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
            const filteredKeys = [];
            const filteredObjs = [];
            objects = objects || [];
            for (let k = 0; k < keys.length; k++) {
                try {
                    objects[k] = JSON.parse(objects[k]);
                } catch {
                    this.log.error(`${this.namespace} Cannot parse JSON ${keys[k]}: ${objects[k]}`);
                    continue;
                }
                if (!utils.checkObject(objects[k], options, utils.CONSTS.ACCESS_WRITE)) {
                    continue;
                }
                if (!objects[k].acl) {
                    objects[k].acl = {
                        owner:      (this.defaultNewAcl && this.defaultNewAcl.owner)      || utils.CONSTS.SYSTEM_ADMIN_USER,
                        ownerGroup: (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                        object:     (this.defaultNewAcl && this.defaultNewAcl.object)     || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ) // '0644'
                    };
                    if (objects[k].type === 'state') {
                        objects[k].acl.state = (this.defaultNewAcl && this.defaultNewAcl.state) || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ); // '0644'
                    }
                }
                objects[k].acl.owner      = options.owner;
                objects[k].acl.ownerGroup = options.ownerGroup;
                filteredKeys.push(keys[k]);
                filteredObjs.push(objects[k]);
            }
            this._objectHelper(filteredKeys, filteredObjs, () => {
                return tools.maybeCallbackWithError(callback, null, filteredObjs);
            });
        }, true);
    }

    chownObject(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};
        options.acl = null;

        if (typeof options !== 'object') {
            options = {owner: options};
        }

        if (!options.ownerGroup && options.group) {
            options.ownerGroup = options.group;
        }
        if (!options.owner && options.user)  {
            options.owner = options.user;
        }

        if (!options.owner) {
            this.log.error(`${this.namespace} user is not defined`);
            return tools.maybeCallbackWithError(callback, 'invalid parameter');
        }

        if (!options.ownerGroup) {
            // get user group
            this.getUserGroup(options.owner, (user, groups /* , permissions*/) => {
                if (!groups || !groups[0]) {
                    return tools.maybeCallbackWithError(callback, `user "${options.owner}" belongs to no group`);
                } else {
                    options.ownerGroup = groups[0];
                }
                this.chownObject(pattern, options, callback);
            });
            return;
        }

        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.object || !options.acl.object.write) {
                    return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_PERMISSION);
                } else {
                    return this._chownObject(pattern, options, callback);
                }
            }
        });
    }

    chownObjectAsync(pattern, options) {
        return new Promise((resolve, reject) =>
            this.chownObject(pattern, options, (err, list) =>
                err ? reject(err) : resolve(list)));
    }

    _chmodObject(pattern, options, callback) {
        this.getConfigKeys(pattern, options, async (err, keys) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            }
            if (!this.client) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
            }

            let objects;
            try {
                objects = await this.client.mget(keys);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }

            const filteredKeys = [];
            const filteredObjs = [];
            objects = objects || [];
            for (let k = 0; k < keys.length; k++) {
                try {
                    objects[k] = JSON.parse(objects[k]);
                } catch {
                    this.log.error(`${this.namespace} Cannot parse JSON ${keys[k]}: ${objects[k]}`);
                    continue;
                }
                if (!utils.checkObject(objects[k], options, utils.CONSTS.ACCESS_WRITE)) {
                    continue;
                }
                if (!objects[k].acl) {
                    objects[k].acl = {
                        owner:      (this.defaultNewAcl && this.defaultNewAcl.owner)      || utils.CONSTS.SYSTEM_ADMIN_USER,
                        ownerGroup: (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                        object:     (this.defaultNewAcl && this.defaultNewAcl.object)     || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ) // '0644'
                    };
                    if (objects[k].type === 'state') {
                        objects[k].acl.state = (this.defaultNewAcl && this.defaultNewAcl.state) || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ); // '0644'
                    }
                }
                if (options.object !== undefined) {
                    objects[k].acl.object = options.object;
                }
                if (options.state !== undefined) {
                    objects[k].acl.state = options.state;
                }
                filteredKeys.push(keys[k]);
                filteredObjs.push(objects[k]);
            }
            this._objectHelper(filteredKeys, filteredObjs, () => {
                return tools.maybeCallbackWithError(callback, null, filteredObjs);
            });
        }, true);
    }

    chmodObject(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};
        options.acl = null;

        if (typeof options !== 'object') {
            options = {object: options};
        }

        if (options.mode && !options.object) {
            options.object = options.mode;
        }

        if (options.object === undefined) {
            this.log.error(this.namespace + ' mode is not defined');
            return typeof callback === 'function' && setImmediate(() => callback('invalid parameter'));
        } else if (typeof options.mode === 'string') {
            options.mode = parseInt(options.mode, 16);
        }

        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                if (!options.acl.file.write) {
                    typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_PERMISSION));
                } else {
                    return this._chmodObject(pattern, options, callback);
                }
            }
        });
    }

    chmodObjectAsync(pattern, options) {
        return new Promise((resolve, reject) =>
            this.chmodObject(pattern, options, (err, list) =>
                err ? reject(err) : resolve(list)));
    }

    async _getObject(id, options, callback) {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        let obj, err;
        try {
            obj = await this.client.get(this.objNamespace + id);
        } catch (e) {
            this.log.debug(`${this.namespace} redis get ${id}, error - ${e.message}`);
            err = e;
        }

        try {
            obj = obj ? JSON.parse(obj) : null;
        } catch (e) {
            this.log.warn(`${this.namespace} Cannot parse ${id} - ${obj}: ${e.message}`);
            obj = null;
            if (!err) {
                err = e;
            }
        }
        if (obj) {
            // Check permissions
            if (utils.checkObject(obj, options, utils.CONSTS.ACCESS_READ)) {
                return tools.maybeCallbackWithError(callback, null, obj);
            } else {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_PERMISSION);
            }
        } else {
            return tools.maybeCallbackWithError(callback, err, obj);
        }
    }

    getObject(id, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.getObject(id, options, (err, obj) =>
                    err ? reject(err) : resolve(obj)));
        }

        if (typeof callback === 'function') {
            if (options && options.acl) {
                options.acl = null;
            }
            utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_READ, (err, options) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    return this._getObject(id, options, callback);
                }
            });
        }
    }

    getObjectAsync(id, options) {
        return new Promise((resolve, reject) =>
            this.getObject(id, options, (err, obj) =>
                err ? reject(err) : resolve(obj)));
    }

    async _getKeys(pattern, options, callback, dontModify) {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }
        if (!pattern || typeof pattern !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid pattern ${JSON.stringify(pattern)}`);
        }

        const r = new RegExp(tools.pattern2RegEx(pattern));
        let keys;

        try {
            keys = await this._getKeysViaScan(this.objNamespace + pattern);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }

        const result = [];
        if (keys) {
            keys.sort();
            const result = [];
            const dontCheck =
                    options.user === utils.CONSTS.SYSTEM_ADMIN_USER ||
                    options.group !== utils.CONSTS.SYSTEM_ADMIN_GROUP ||
                    (options.groups && options.groups.indexOf(utils.CONSTS.SYSTEM_ADMIN_GROUP) !== -1);

            if (dontCheck) {
                for (let i = 0; i < keys.length; i++) {
                    const id = keys[i].substring(this.objNamespaceL);
                    if (r.test(id)) {
                        if (!dontModify) {
                            result.push(id);
                        } else {
                            result.push(keys[i]);
                        }
                    }
                }
                return tools.maybeCallbackWithError(callback, null, result);
            } else {
                // Check permissions
                let metas;
                try {
                    metas = await this.client.mget(keys);
                } catch (e) {
                    return tools.maybeCallbackWithRedisError(callback, e);
                }
                metas = metas || [];
                for (let i = 0; i < keys.length; i++) {
                    try {
                        metas[i] = JSON.parse(metas[i]);
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${metas[i]}`);
                        continue;
                    }

                    if (r.test(keys[i]) && utils.checkObject(metas[i], options, utils.CONSTS.ACCESS_READ)) {
                        if (!dontModify) {
                            result.push(keys[i].substring(this.objNamespaceL));
                        } else {
                            result.push(keys[i]);
                        }
                    }
                }
                return tools.maybeCallbackWithError(callback, null, result);
            }
        } else {
            return tools.maybeCallbackWithError(callback, null, result);
        }
    }

    getKeys(pattern, options, callback, dontModify) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.getKeys(pattern, options, (err, obj) =>
                    err ? reject(err) : resolve(obj), dontModify));
        }
        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
                if (err) {
                    typeof callback === 'function' && setImmediate(() => callback(err));
                } else {
                    return this._getKeys(pattern, options, callback, dontModify);
                }
            });
        }
    }

    getKeysAsync(id, options) {
        return new Promise((resolve, reject) =>
            this.getKeys(id, options, (err, keys) =>
                err ? reject(err) : resolve(keys)));
    }

    getConfigKeys(pattern, options, callback, dontModify) {
        return this.getKeys(pattern, options, callback, dontModify);
    }

    async _getObjects(keys, options, callback, dontModify) {
        if (!keys) {
            return tools.maybeCallbackWithError(callback, 'no keys', null);
        }
        if (!keys.length) {
            return tools.maybeCallbackWithError(callback, null, []);
        }

        let _keys;
        if (!dontModify) {
            _keys = [];
            for (let i = 0; i < keys.length; i++) {
                _keys[i] = this.objNamespace + keys[i];
            }
        } else {
            _keys = keys;
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }

        let objs;
        try {
            objs = await this.client.mget(_keys);
            this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis mget ' + (!objs ? 0 : objs.length) + ' ' + _keys.length);
        } catch (e) {
            this.log.warn(`${this.namespace} redis mget ${!objs ? 0 : objs.length} ${_keys.length}, err: ${e.message}`);
        }
        let result = [];

        if (objs) {
            const dontCheck =
                    options.user === utils.CONSTS.SYSTEM_ADMIN_USER ||
                    options.group !== utils.CONSTS.SYSTEM_ADMIN_GROUP ||
                    (options.groups && options.groups.indexOf(utils.CONSTS.SYSTEM_ADMIN_GROUP) !== -1);

            if (!dontCheck) {
                for (let i = 0; i < objs.length; i++) {
                    try {
                        objs[i] = JSON.parse(objs[i]);
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON ${_keys[i]}: ${objs[i]}`);
                        result.push({error: utils.ERRORS.ERROR_PERMISSION});
                        continue;
                    }
                    if (utils.checkObject(objs[i], options, utils.CONSTS.ACCESS_READ)) {
                        result.push(objs[i]);
                    } else {
                        result.push({error: utils.ERRORS.ERROR_PERMISSION});
                    }
                }
            } else {
                result = objs.map((obj, i) => {
                    try {
                        return JSON.parse(obj);
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON ${_keys[i]}: ${obj}`);
                        return null;
                    }
                });
            }
        }
        return tools.maybeCallbackWithError(callback, null, result);
    }

    getObjects(keys, options, callback, dontModify) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.getObjects(keys, options, (err, objs) =>
                    err ? reject(err) : resolve(objs), dontModify));
        }

        if (options && options.acl) {
            options.acl = null;
        }
        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_READ, (err, options) => {
                if (err) {
                    typeof callback === 'function' && setImmediate(() => callback(err));
                } else {
                    return this._getObjects(keys, options, callback, dontModify);
                }
            });
        }
    }

    getObjectsAsync(id, options) {
        return new Promise((resolve, reject) =>
            this.getObjects(id, options, (err, objs) =>
                err ? reject(err) : resolve(objs)));
    }

    async _getObjectsByPattern(pattern, options, callback) {
        if (!pattern || typeof pattern !== 'string') {
            typeof callback === 'function' && setImmediate(() => callback('invalid pattern ' + JSON.stringify(pattern)));
            return;
        }

        if (!this.client) {
            return typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_DB_CLOSED));
        }

        let keys;
        try {
            keys = await this._getKeysViaScan(this.objNamespace + pattern);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }

        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis keys ${keys.length} ${pattern}`);
        this._getObjects(keys, options, callback, true);
    }

    getObjectsByPattern(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.getObjectsByPattern(pattern, options, (err, obj) =>
                    err ? reject(err) : resolve(obj)));
        }
        if (options && options.acl) {
            options.acl = null;
        }
        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_READ, (err, options) => {
                if (err) {
                    typeof callback === 'function' && setImmediate(() => callback(err));
                } else {
                    return this._getObjectsByPattern(pattern, options, callback);
                }
            });
        }
    }

    getObjectsByPatternAsync(pattern, options) {
        return new Promise((resolve, reject) =>
            this.getObjectsByPattern(pattern, options, (err, objs) =>
                err ? reject(err) : resolve(objs)));
    }

    async _setObject(id, obj, options, callback) {
        if (!id || typeof id !== 'string' || utils.regCheckId.test(id)) {
            return typeof callback === 'function' && setImmediate(() => callback(`Invalid ID: ${id}`));
        }

        if (!obj) {
            this.log.warn(this.namespace + ' setObject: Argument object is null');
            return typeof callback === 'function' && setImmediate(() => callback('obj is null'));
        }
        if (!tools.isObject(obj)) {
            this.log.warn(this.namespace + ' setObject: Argument object is no object: ' + obj);
            return typeof callback === 'function' && setImmediate(() => callback('obj is no object'));
        }
        if (!this.client) {
            return typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_DB_CLOSED));
        }
        // make a copy of object, because we will modify it
        obj = deepClone(obj);

        obj._id = id;

        let oldObj;
        try {
            oldObj = await this.client.get(this.objNamespace + id);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        try {
            oldObj = oldObj ? JSON.parse(oldObj) : null;
        } catch (e) {
            this.log.error(`${this.namespace} Cannot parse ${id} - ${oldObj}: ${e.message}`);
            return tools.maybeCallbackWithError(callback, `Cannot parse ${id} - ${oldObj}: ${e.message}`);
        }

        if (!tools.checkNonEditable(oldObj, obj)) {
            return tools.maybeCallbackWithError(callback, 'Invalid password for update of vendor information');
        }

        // do not delete common settings, like "history" or "mobile". It can be erased only with "null"
        if (oldObj && oldObj.common) {
            this.preserveSettings.forEach(commonSetting => {
                // special case if "custom"
                if (commonSetting === 'custom') {
                    // we had broken objects where common.custom was a "non-object" ... check and fix them here, no warning because users will most likely have no idea how to deal with it
                    if (oldObj.common.custom !== undefined && oldObj.common.custom !== null && !tools.isObject(oldObj.common.custom)) {
                        delete oldObj.common.custom;
                    }
                    // also remove invalid data from new objects ... should not happen because adapter.js checks too
                    if (obj.common && obj.common.custom !== undefined && obj.common.custom !== null && !tools.isObject(obj.common.custom)) {
                        delete obj.common.custom;
                    }

                    if (!oldObj.common.custom) {
                        // do nothing
                    } else if ((!obj.common || !obj.common.custom) && oldObj.common.custom) {
                        obj.common = obj.common || {};
                        obj.common.custom = oldObj.common.custom;
                    } else if (obj.common && obj.common.custom && oldObj.common.custom) {
                        // merge together
                        Object.keys(oldObj.common.custom).forEach(attr => {
                            if (obj.common.custom[attr] === null) {
                                delete obj.common.custom[attr];
                            } else if (obj.common.custom[attr] === undefined) {
                                obj.common.custom[attr] = oldObj.common.custom[attr];
                            }
                        });
                    }
                    // remove custom if no one attribute inside
                    if (obj.common && obj.common.custom) {
                        Object.keys(obj.common.custom).forEach(attr => {
                            if (obj.common.custom[attr] === null) {
                                delete obj.common.custom[attr];
                            }
                        });
                        if (!Object.keys(obj.common.custom).length) {
                            delete obj.common.custom;
                        }
                    }
                } else {
                    // remove settings if desired
                    if (obj.common && obj.common[commonSetting] === null) {
                        delete obj.common[commonSetting];
                    } else
                    // if old setting present and new setting is absent
                    if (oldObj.common[commonSetting] !== undefined && (!obj.common || obj.common[commonSetting] === undefined)) {
                        obj.common = obj.common || {};
                        obj.common[commonSetting] = oldObj.common[commonSetting];
                    }
                }
            });
        }

        if (obj.common && obj.common.alias && obj.common.alias.id) {
            if (typeof obj.common.alias.id === 'object') {
                if (typeof obj.common.alias.id.write !== 'string' || typeof obj.common.alias.id.read !== 'string') {
                    return typeof callback === 'function' && callback('Invalid alias ID');
                }

                if (obj.common.alias.id.write.startsWith('alias.') || obj.common.alias.id.read.startsWith('alias.')) {
                    return typeof callback === 'function' && callback('Cannot make alias on alias');
                }
            } else {
                if (typeof obj.common.alias.id !== 'string') {
                    return typeof callback === 'function' && callback('Invalid alias ID');
                }

                if (obj.common.alias.id.startsWith('alias.')) {
                    return typeof callback === 'function' && callback('Cannot make alias on alias');
                }
            }
        }

        if (oldObj && oldObj.acl && !obj.acl) {
            obj.acl = oldObj.acl;
        }

        // add user default rights if no acl provided
        if (this.defaultNewAcl && !obj.acl) {
            obj.acl = deepClone(this.defaultNewAcl);
            delete obj.acl.file;
            if (obj.type !== 'state') {
                delete obj.acl.state;
            }
            // take the current user as owner if given, but if admin we keep default
            if (options.user && options.user !== utils.CONSTS.SYSTEM_ADMIN_USER) {
                obj.acl.owner = options.user;
            }
            // take the current group as owner if given, but if admin we keep default
            if (options.group && options.group !== utils.CONSTS.SYSTEM_ADMIN_GROUP) {
                obj.acl.ownerGroup = options.group;
            }
        }

        if (this.defaultNewAcl && obj.acl && !obj.acl.ownerGroup && options.group) {
            obj.acl.ownerGroup = options.group;
        }

        try {
            const message = JSON.stringify(obj);

            await this.client.set(this.objNamespace + id, message);
            //this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis publish ' + this.objNamespace + id + ' ' + message);
            // object updated -> if type changed to meta -> cache
            if (oldObj && oldObj.type === 'meta' && this.existingMetaObjects[id] === false) {
                this.existingMetaObjects[id] = true;
            }

            await this.client.publish(this.objNamespace + id, message);

            return tools.maybeCallbackWithError(callback, null, {id});
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e, {id});
        }
    }

    /**
     * set anew or update object
     *
     * This function writes the object into DB
     *
     * @alias setObject
     * @memberof objectsInMemServer
     * @param {string} id ID of the object
     * @param {object} obj
     * @param {object} options options for access control are optional
     * @param {function} callback return function
     */
    setObject(id, obj, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.setObject(id, obj, options, (err, res) =>
                    err ? reject(err) : resolve(res)));
        }
        if (options && options.acl) {
            options.acl = null;
        }

        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_WRITE, err => {
            // do not use options from checkObjectRights because this will mess up configured default acl
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._setObject(id, obj, options || {}, callback);
            }
        });
    }

    setObjectAsync(id, obj, options) {
        return new Promise((resolve, reject) =>
            this.setObject(id, obj, options, (err, res) =>
                err ? reject(err) : resolve(res)));
    }

    async _delObject(id, options, callback) {
        if (!id || typeof id !== 'string' || utils.regCheckId.test(id)) {
            return tools.maybeCallbackWithError(callback, `Invalid ID: ${id}`);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }

        // read object
        let oldObj;
        try {
            oldObj = await this.client.get(this.objNamespace + id);
        } catch (e) {
            this.log.warn(`${this.namespace} redis get ${id}, error - ${e.message}`);
        }

        if (!oldObj) { // Not existent, so goal reached :-)
            return tools.maybeCallback(callback);
        }

        try {
            oldObj = oldObj ? JSON.parse(oldObj) : null;
        } catch (e) {
            this.log.warn(`${this.namespace} Cannot parse ${id} - ${oldObj}: ${e.message}`);
            oldObj = null;
        }

        if (!utils.checkObject(oldObj, options, utils.CONSTS.ACCESS_WRITE)) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_PERMISSION);
        } else {
            try {
                await this.client.del(this.objNamespace + id);
                // object has been deleted -> remove from cached meta if there
                if (this.existingMetaObjects[id]) {
                    this.existingMetaObjects[id] = false;
                }
                //this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis publish ' + this.objNamespace + id + ' null');
                await this.client.publish(this.objNamespace + id, 'null');
                return tools.maybeCallback(callback);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
    }

    delObject(id, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.delObject(id, options, (err, obj) =>
                    err ? reject(err) : resolve(obj)));
        }

        if (options && options.acl) {
            options.acl = null;
        }
        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_DELETE, (err, options) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                return this._delObject(id, options, callback);
            }
        });
    }

    delObjectAsync(id, options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.delObject(id, options, err =>
                err ? reject(err) : resolve())));
    }

    // this function is very ineffective. Because reads all objects and then process them
    async _applyViewFunc(func, params, options, callback) {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }
        const result = {
            rows: []
        };

        /**
         * filters objs which are already present (and parse Errors) in array by property 'id'
         *
         * @param {object[]} arr - Array of objects which should be filtered
         * @param {boolean} duplicateFiltering - if duplicates need to be filtered
         * @return {object[]}
         */
        const filterEntries = (arr, duplicateFiltering) => {
            if (duplicateFiltering) {
                const included = {};
                return arr.filter(obj => {
                    if (included[obj.id] || obj.id === 'parseError') {
                        return false;
                    } else {
                        included[obj.id] = true;
                        return true;
                    }
                });
            } else {
                return arr.filter(obj => {
                    // only filter parse Errors
                    return obj.id !== 'parseError';
                });
            }
        };

        params = params || {};
        params.startkey = params.startkey || '';
        params.endkey   = params.endkey   || '\u9999';
        const wildcardPos = params.endkey.indexOf('\u9999');
        let wildCardLastPos = true;
        if (wildcardPos !== -1 && wildcardPos !== params.endkey.length - 1) {
            wildCardLastPos = false; // TODO do in LUA
        }
        let m;

        // if start and and end keys are equal modify end key
        if (params.startkey === params.endkey) {
            params.endkey = params.endkey + '\u0000';
        }

        // filter by type
        if (wildCardLastPos && func && func.map && this.scripts.filter && (m = func.map.match(/if\s\(doc\.type\s?===?\s?'(\w+)'\)\semit\(([^,]+),\s?doc\s?\)/))) {
            let cursor = '0';
            let filterRequired = true;
            do {
                if (!this.client) {
                    return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
                }

                let objs;
                try {
                    objs = await this.client.evalsha([this.scripts.filter, 5, this.objNamespace, params.startkey, params.endkey, m[1], cursor]);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot get view: ${e.message}`);
                }
                objs = objs || [];
                // if real redis we will have e.g. [[objs..], '0'], else [{}, .., {}]
                if (Array.isArray(objs[0])) {
                    cursor = objs[1] || '0';
                    objs = objs[0];
                } else {
                    cursor = '0';
                    filterRequired = false;
                }

                const currRows = objs.map(obj => {
                    try {
                        obj = JSON.parse(obj);
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON: ${obj}`);
                        return {id: 'parseError', value: null};
                    }
                    if (m[2] && m[2].trim() === 'doc._id') {
                        return {id: obj._id, value: obj};
                    } else if (m[2] && m[2].trim() === 'doc.common.name' && obj.common) {
                        if (typeof obj.common.name === 'object') {
                            if (obj.common.name.en) {
                                return {id: obj.common.name.en, value: obj};
                            } else {
                                return {id: JSON.stringify(obj.common.name), value: obj};
                            }
                        } else {
                            return {id: obj.common.name, value: obj};
                        }
                    } else {
                        this.log.error(`${this.namespace} Cannot filter "${m[2]}": ${JSON.stringify(obj)}`);
                        return {id: 'parseError', value: null};
                    }
                });
                if (currRows.length) {
                    result.rows = [...result.rows, ...currRows];
                } // endIf
            } while (cursor !== '0');

            // Now we have all objects -> calculate max if desired
            if (func.reduce === '_stats') {
                let max = null;
                for (let i = 0; i < result.rows.length; i++) {
                    if (max === null || result.rows[i].value > max) {
                        max = result.rows[i].value;
                    }
                }
                if (max !== null) {
                    result.rows = [{id: '_stats', value: {max: max}}];
                } else {
                    result.rows = [];
                }
            }

            // apply filter if needed
            result.rows = filterEntries(result.rows, filterRequired);
            return tools.maybeCallbackWithError(callback, null, result);
        } else
        // filter by script
        if (wildCardLastPos && func && func.map && this.scripts.script && func.map.indexOf('doc.common.engineType') !== -1) {
            let cursor = '0';
            let filterRequired = true;
            do {
                if (!this.client) {
                    return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
                }
                let objs;
                try {
                    objs = await this.client.evalsha([this.scripts.script, 4, this.objNamespace, params.startkey, params.endkey, cursor]);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot get view: ${e.message}`);
                }
                // if real redis we will have e.g. [[objs..], '0'], else [{}, .., {}]
                if (Array.isArray(objs[0])) {
                    cursor = objs[1] || '0';
                    objs = objs[0];
                } else {
                    cursor = '0';
                    filterRequired = false;
                }

                const currRows = objs.map(obj => {
                    try {
                        obj = JSON.parse(obj);
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON: ${obj}`);
                        return {id: 'parseError', value: null};
                    }
                    return {id: obj._id, value: obj};
                });
                if (currRows.length) {
                    result.rows = [...result.rows, ...currRows];
                } // endIf
            } while (cursor !== '0');

            // apply filter if needed
            result.rows = filterEntries(result.rows, filterRequired);
            return tools.maybeCallbackWithError(callback, null, result);
        } else
        // filter by hm-rega programs
        if (wildCardLastPos && func && func.map && this.scripts.programs && func.map.indexOf('doc.native.TypeName === \'PROGRAM\'') !== -1) {
            let cursor = '0';
            let filterRequired = true;
            do {
                if (!this.client) {
                    return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
                }

                let objs;
                try {
                    objs = await this.client.evalsha([this.scripts.programs, 4, this.objNamespace, params.startkey, params.endkey, cursor]);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot get view: ${e.message}`);
                }
                // if real redis we will have e.g. [[objs..], '0'], else [{}, .., {}]
                if (Array.isArray(objs[0])) {
                    cursor = objs[1] || '0';
                    objs = objs[0];
                } else {
                    cursor = '0';
                    filterRequired = false;
                }

                const currRows = objs.map(obj => {
                    try {
                        obj = JSON.parse(obj);
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON: ${obj}`);
                        return {id: 'parseError', value: null};
                    }
                    return {id: obj._id, value: obj};
                });
                if (currRows.length) {
                    result.rows = [...result.rows, ...currRows];
                } // endIf
            } while(cursor !== '0');

            // apply filter if needed
            result.rows = filterEntries(result.rows, filterRequired);
            return tools.maybeCallbackWithError(callback, null, result);
        } else
        // filter by hm-rega variables
        if (wildCardLastPos && func && func.map && this.scripts.variables && func.map.indexOf('doc.native.TypeName === \'ALARMDP\'') !== -1) {
            let cursor = '0';
            let filterRequired = true;
            do {
                if (!this.client) {
                    return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
                }

                let objs;
                try {
                    objs = await this.client.evalsha([this.scripts.variables, 4, this.objNamespace, params.startkey, params.endkey, cursor]);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot get view ${e.message}`);
                }
                // if real redis we will have e.g. [[objs..], '0'], else [{}, .., {}]
                if (Array.isArray(objs[0])) {
                    cursor = objs[1] || '0';
                    objs = objs[0];
                } else {
                    cursor = '0';
                    filterRequired = false;
                }

                const currRows = objs.map(obj => {
                    try {
                        obj = JSON.parse(obj);
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON: ${obj}`);
                        return {id: 'parseError', value: null};
                    }
                    return {id: obj._id, value: obj};
                });
                if (currRows.length) {
                    result.rows = [...result.rows, ...currRows];
                } // endIf
            } while (cursor !== '0');

            // apply filter if needed
            result.rows = filterEntries(result.rows, filterRequired);
            typeof callback === 'function' && callback(null, result);
        } else
        // filter by custom, redis also returns if common.custom is not present
        if (wildCardLastPos && func && func.map && this.scripts.custom && func.map.indexOf('doc.common.custom') !== -1) {
            let cursor = '0';
            let filterRequired = true;
            do {
                if (!this.client) {
                    return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
                }
                let objs;
                try {
                    objs = await this.client.evalsha([this.scripts.custom, 4, this.objNamespace, params.startkey, params.endkey, cursor]);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot get view: ${e.message}`);
                }
                // if real redis we will have e.g. [[objs..], '0'], else [{}, .., {}]
                if (Array.isArray(objs[0])) {
                    cursor = objs[1] || '0';
                    objs = objs[0];
                } else {
                    cursor = '0';
                    filterRequired = false;
                }

                objs.forEach(obj => {
                    try {
                        obj = JSON.parse(obj);
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON: ${obj}`);
                        obj = null;
                    }
                    if (obj && obj.common && obj.common.custom) {
                        result.rows.push({id: obj._id, value: obj.common.custom});
                    }
                });
            } while (cursor !== '0');

            // apply filter if needed
            result.rows = filterEntries(result.rows, filterRequired);
            return tools.maybeCallbackWithError(callback, null, result);
        } else {
            if (!wildCardLastPos) {
                this.log.debug(`${this.namespace} Search can't be optimized because wildcard not at the end, fallback to keys!: ${func.map}`);
            } else {
                this.log.debug(`${this.namespace} No suitable Lua script, fallback to keys!: ${func.map}`);
            }

            let searchKeys = this.objNamespace + '*';
            if (wildcardPos !== -1) { // Wildcard included
                searchKeys = this.objNamespace + params.endkey.replace(/\u9999/g, '*');
            }

            let keys;
            try {
                keys = await this._getKeysViaScan(searchKeys);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }

            if (!this.client) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
            }

            const endAfterWildcard = params.endkey.substr(wildcardPos + 1);
            params.startkey = this.objNamespace + params.startkey;
            params.endkey   = this.objNamespace + params.endkey;

            keys = keys.sort().filter(key => {
                if (key && !utils.regCheckId.test(key)) {
                    if (params && wildcardPos > 0) {
                        if (params.startkey && key < params.startkey) {
                            return false;
                        }
                        if (params.endkey   && key > params.endkey)   {
                            return false;
                        }
                    } else
                    if (params && wildcardPos === 0) {
                        if (!key.endsWith(endAfterWildcard)) {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return false;
                }
            });

            let objs;
            try {
                objs = await this.client.mget(keys);
            } catch {
                //ignore
            }
            // eslint-disable-next-line no-unused-vars
            const _emit_ = (id, obj) => {
                result.rows.push({id: id, value: obj});
            };

            const f = eval('(' + func.map.replace(/^function\(([a-z0-9A-Z_]+)\)/g, 'function($1, emit)') + ')');

            objs = objs || [];
            for (let i = 0; i < keys.length; i++) {
                try {
                    objs[i] = JSON.parse(objs[i]);
                } catch {
                    this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${objs[i]}`);
                    continue;
                }
                if (!utils.checkObject(objs[i], options, utils.CONSTS.ACCESS_READ)) {
                    continue;
                }

                if (objs[i]) {
                    try {
                        f(objs[i], _emit_);
                    } catch (e) {
                        this.log.error(`${this.namespace} Cannot execute map: ${e.message}`);
                    }
                }
            }
            // Calculate max
            if (func.reduce === '_stats') {
                let max = null;
                for (let i = 0; i < result.rows.length; i++) {
                    if (max === null || result.rows[i].value > max) {
                        max = result.rows[i].value;
                    }
                }
                if (max !== null) {
                    result.rows = [{id: '_stats', value: {max: max}}];
                } else {
                    result.rows = [];
                }
            }
            return tools.maybeCallbackWithError(callback, null, result);
        }
    }

    _applyView(func, params, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this._applyView(func, params, options, (err, obj) =>
                    err ? reject(err) : resolve(obj)));
        }

        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
                if (err) {
                    typeof callback === 'function' && callback(err);
                } else {
                    return this._applyViewFunc(func, params, options, callback);
                }
            });
        }
    }

    async _getObjectView(design, search, params, options, callback) {
        if (!this.client) {
            return typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_DB_CLOSED));
        }

        let obj;
        try {
            obj = await this.client.get(this.objNamespace + '_design/' + design);
        } catch (e) {
            this.log.error(`${this.namespace} Cannot find view "${design}" for search "${search}" : ${e.message}`);
            return tools.maybeCallbackWithRedisError(callback, new Error(`Cannot find view "${design}"`));
        }

        if (obj) {
            try {
                obj = JSON.parse(obj);
            } catch {
                this.log.error(`${this.namespace} Cannot parse JSON: ${obj}`);
                return tools.maybeCallbackWithError(callback, new Error(`Cannot parse JSON: "_design/${design}" / "${obj}"`));
            }

            if (obj.views && obj.views[search]) {
                return this._applyViewFunc(obj.views[search], params, options, callback);
            } else {
                this.log.error(`${this.namespace} Cannot find search "${search}" in "${design}"`);
                return tools.maybeCallbackWithError(callback, new Error(`Cannot find search "${search}" in "${design}"`));
            }
        } else {
            this.log.error(`${this.namespace} Cannot find view "${design}" for search "${search}"`);
            return tools.maybeCallbackWithError(callback, new Error(`Cannot find view "${design}"`));
        }
    }

    getObjectView(design, search, params, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.getObjectView(design, search, params, options, (err, obj) =>
                    err ? reject(err) : resolve(obj)));
        }

        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
                if (err) {
                    typeof callback === 'function' && setImmediate(() => callback(err));
                } else {
                    return this._getObjectView(design, search, params, options, callback);
                }
            });
        }
    }

    getObjectViewAsync(design, search, params, options) {
        return new Promise((resolve, reject) =>
            this.getObjectView(design, search, params, options, (err, arr) =>
                err ? reject(err) : resolve(arr)));
    }

    async _getObjectList(params, options, callback) {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }
        //params = {startkey, endkey, include_docs}
        params = params || {};
        params.startkey = params.startkey || '';
        params.endkey = params.endkey || '\u9999';
        const pattern = (params.endkey.substring(0, params.startkey.length) === params.startkey) ? this.objNamespace + params.startkey + '*' : this.objNamespace + '*';

        // todo: use lua script for this
        let keys;
        try {
            keys = await this._getKeysViaScan(pattern);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        }

        const _keys = [];
        for (let i = 0; i < keys.length; i++) {
            const id = keys[i].substring(this.objNamespaceL);
            if (params.startkey && id < params.startkey) {
                continue;
            }
            if (params.endkey && id > params.endkey) {
                continue;
            }
            if (!id || utils.regCheckId.test(id) || id.match(/\|file\$%\$/)) {
                continue;
            }
            if (!params.include_docs && id[0] === '_') {
                continue;
            }
            _keys.push(keys[i]);
        }
        _keys.sort();
        let objs;
        try {
            objs = await this.client.mget(_keys);
        } catch {
            // ignore
        }
        // return rows with id and doc
        const result = {
            rows: []
        };
        if (objs) {
            for (let r = 0; r < objs.length; r++) {
                try {
                    objs[r] = JSON.parse(objs[r]);
                } catch {
                    this.log.error(`${this.namespace} Cannot parse JSON ${_keys[r]}: ${objs[r]}`);
                    continue;
                }

                if (!objs[r] || !utils.checkObject(objs[r], options, utils.CONSTS.ACCESS_READ)) {
                    continue;
                }
                result.rows.push({id: objs[r]._id, value: objs[r], doc: objs[r]});
            }
        }
        return tools.maybeCallbackWithError(callback, null, result);
    }

    getObjectList(params, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.getObjectList(params, options, (err, obj) =>
                    err ? reject(err) : resolve(obj)));
        }

        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
                if (err) {
                    typeof callback === 'function' && setImmediate(() => callback(err));
                } else {
                    return this._getObjectList(params, options, callback);
                }
            });
        }
    }

    getObjectListAsync(params, options) {
        return new Promise((resolve, reject) =>
            this.getObjectList(params, options, (err, arr) =>
                err ? reject(err) : resolve(arr)));
    }

    // could be optimised, to read object only once. Now it will read 3 times
    async _extendObject(id, obj, options, callback, _iteration) {
        if (!id || typeof id !== 'string' || utils.regCheckId.test(id)) {
            return typeof callback === 'function' && setImmediate(() => callback(`Invalid ID: ${id}`));
        }
        if (!this.client) {
            return typeof callback === 'function' && setImmediate (() => callback(utils.ERRORS.ERROR_DB_CLOSED));
        }

        let oldObj;
        try {
            oldObj = await this.client.get(this.objNamespace + id);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        try {
            oldObj = oldObj ? JSON.parse(oldObj) : null;
        } catch {
            this.log.error(`${this.namespace} Cannot parse JSON ${id}: ${oldObj}`);
            oldObj = null;
            return typeof callback === 'function' && callback(`Cannot parse JSON ${id}: ${oldObj}`);
        }
        if (!utils.checkObject(oldObj, options, utils.CONSTS.ACCESS_WRITE)) {
            return typeof callback === 'function' && callback(utils.ERRORS.ERROR_PERMISSION);
        }

        let _oldObj;
        if (oldObj && oldObj.nonEdit) {
            // copy object
            _oldObj = deepClone(oldObj);
        }

        oldObj = oldObj || {};
        obj = deepClone(obj); // copy here to prevent "sandboxed" objects from JavaScript adapter
        if (oldObj.common && oldObj.common.custom !== undefined && oldObj.common.custom !== null && !tools.isObject(oldObj.common.custom)) {
            delete oldObj.common.custom;
        }

        oldObj = extend(true, oldObj, obj);
        oldObj._id = id;

        // add user default rights
        if (this.defaultNewAcl && !oldObj.acl) {
            oldObj.acl = deepClone(this.defaultNewAcl);
            delete oldObj.acl.file;
            if (oldObj.type !== 'state') {
                delete oldObj.acl.state;
            }

            if (options.owner) {
                oldObj.acl.owner = options.owner;

                if (!options.ownerGroup) {
                    oldObj.acl.ownerGroup = null;
                    return this.getUserGroup(options.owner, (user, groups /*, permissions */) => {
                        if (!groups || !groups[0]) {
                            options.ownerGroup = (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP;
                        } else {
                            options.ownerGroup = groups[0];
                        }
                        this._extendObject(id, obj, options, callback);
                    });
                }
            }
        }

        if (this.defaultNewAcl && options.ownerGroup && oldObj.acl && !oldObj.acl.ownerGroup) {
            oldObj.acl.ownerGroup = options.ownerGroup;
        }

        if (obj.common && obj.common.alias && obj.common.alias.id) {
            if (typeof obj.common.alias.id === 'object') {
                if (typeof obj.common.alias.id.write !== 'string' || typeof obj.common.alias.id.read !== 'string') {
                    return typeof callback === 'function' && callback('Invalid alias ID');
                }

                if (obj.common.alias.id.write.startsWith('alias.') || obj.common.alias.id.read.startsWith('alias.')) {
                    return typeof callback === 'function' && callback('Cannot make alias on alias');
                }
            } else {
                if (typeof obj.common.alias.id !== 'string') {
                    return typeof callback === 'function' && callback('Invalid alias ID');
                }

                if (obj.common.alias.id.startsWith('alias.')) {
                    return typeof callback === 'function' && callback('Cannot make alias on alias');
                }
            }
        }

        if (_oldObj && !tools.checkNonEditable(_oldObj, oldObj)) {
            return typeof callback === 'function' && callback('Invalid password for update of vendor information');
        }
        const message = JSON.stringify(oldObj);

        try {
            await this.client.set(this.objNamespace + id, message);

            // extended -> if its now type meta and currently marked as not -> cache
            if (this.existingMetaObjects[id] === false && oldObj && oldObj.type === 'meta') {
                this.existingMetaObjects[id] = true;
            }
            //this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis publish ' + this.objNamespace + id + ' ' + message);
            await this.client.publish(this.objNamespace + id, message);
            return tools.maybeCallbackWithError(callback, null, {id: id, value: oldObj}, id);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    extendObject(id, obj, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.extendObject(id, obj, options, (err, res) =>
                    err ? reject(err) : resolve(res)));
        }

        if (options && options.acl) {
            options.acl = null;
        }

        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._extendObject(id, obj, options, callback);
            }
        });
    }

    extendObjectAsync(id, obj, options) {
        return new Promise((resolve, reject) =>
            this.extendObject(id, obj, options, (err, res) =>
                err ? reject(err) : resolve(res)));
    }

    setConfig(id, obj, options, callback) {
        return this.setObject(id, obj, options, callback);
    }

    delConfig(id, options, callback) {
        return this.delObject(id, options, callback);
    }

    getConfig(id, options, callback) {
        return this.getObject(id, options, callback);
    }

    getConfigs(keys, options, callback, dontModify) {
        return this.getObjects(keys, options, callback, dontModify);
    }

    _findObject(idOrName, type, options, callback) {
        this._getObject(idOrName, options, (err, obj) => {
            // Assume it is ID
            if (obj && utils.checkObject(obj, options, utils.CONSTS.ACCESS_READ) && (!type || (obj.common && obj.common.type === type))) {
                return tools.maybeCallbackWithError(callback, null, idOrName, obj.common.name);
            } else {
                this._getKeys('*', options, async (err, keys) => {
                    let objs;
                    try {
                        objs = await this.client.mget(keys);
                    } catch (e) {
                        return tools.maybeCallbackWithRedisError(callback, e);
                    }
                    objs = objs || [];
                    // Assume it is name
                    for (let i = 0; i < keys.length; i++) {
                        try {
                            objs[i] = JSON.parse(objs[i]);
                        } catch {
                            this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${objs[i]}`);
                            continue;
                        }
                        if (objs[i] && objs[i].common &&
                                objs[i].common.name === idOrName &&
                                (!type || objs[i].common.type === type)) {
                            return tools.maybeCallbackWithError(callback, null, objs[i]._id, idOrName);
                        }
                    }
                    return tools.maybeCallbackWithError(callback, null, null, idOrName);
                }, true);
            }
        });
    }

    findObject(idOrName, type, options, callback) {
        if (typeof type === 'function') {
            callback = type;
            options = null;
            type = null;
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.findObject(idOrName, type, options, (err, id, _idOrName) =>
                    err ? reject(err) : resolve(id)));
        }

        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_LIST, (err, options) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    return this._findObject(idOrName, type, options, callback);
                }
            });
        }
    }

    findObjectAsync(idOrName, type, options) {
        return new Promise((resolve, reject) =>
            this.findObject(idOrName, type, options, (err, id, _idOrName) =>
                err ? reject(err) : resolve(id)));
    }

    // can be called only from js-controller
    addPreserveSettings(settings) {
        if (!Array.isArray(settings)) {
            settings = [settings];
        }

        for (let s = 0; s < settings.length; s++) {
            if (this.preserveSettings.indexOf(settings[s]) === -1) {
                this.preserveSettings.push(settings[s]);
            }
        }
    }

    async _destroyDBHelper(keys, callback) {
        if (!keys || !keys.length) {
            return tools.maybeCallback(callback);
        } else {
            if (!this.client) {
                return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
            }

            for (const id of keys) {
                try {
                    await this.client.del(id);
                } catch {
                    // ignore
                }
            }

            return tools.maybeCallback(callback);
        }
    }

    async _destroyDB(options, callback) {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, utils.ERRORS.ERROR_DB_CLOSED);
        } else {
            try {
                const keys = await this._getKeysViaScan(`${this.redisNamespace}*`);
                return this._destroyDBHelper(keys, callback);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
    }

    destroyDB(options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};

        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                if (!options.acl.file.write || options.user !== utils.CONSTS.SYSTEM_ADMIN_USER) {
                    typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_PERMISSION));
                } else {
                    return this._destroyDB(options, callback);
                }
            }
        });
    }

    destroyDBAsync(options) {
        return /** @type {Promise<void>} */ (new Promise((resolve, reject) =>
            this.destroyDB(options, err =>
                err ? reject(err) : resolve())));
    }

    // Destructor of the class. Called by shutting down.
    async destroy() {
        this.stop = true;
        if (this.client) {
            try {
                await this.client.quit();
                this.client = null;
            } catch {
                // ignore error
            }

        }
        if (this.sub) {
            try {
                await this.sub.quit();
                this.sub = null;
            } catch {
                // ignore error
            }
        }
        if (this.subSystem) {
            try {
                await this.subSystem.quit();
                this.subSystem = null;
            } catch {
                // ignore error
            }
        }
    }

    async loadLuaScripts() {
        let _scripts = [];
        if (scriptFiles && scriptFiles.filter) {
            for (const name of Object.keys(scriptFiles)) {
                const shasum = crypto.createHash('sha1');
                const buf = Buffer.from(scriptFiles[name]);
                shasum.update(buf);
                _scripts.push({
                    name,
                    text: buf,
                    hash: shasum.digest('hex')
                });
            }
        } else {
            _scripts = fs.readdirSync(__dirname + '/lua/').map(name => {
                const shasum = crypto.createHash('sha1');
                const script = fs.readFileSync(__dirname + '/lua/' + name);
                shasum.update(script);
                const hash = shasum.digest('hex');
                return {name: name.replace(/\.lua$/, ''), text: script, hash};
            });
        }
        const hashes = _scripts.map(e => e.hash);
        hashes.unshift('EXISTS');

        if (!this.client) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        let arr;
        try {
            arr = await this.client.script(hashes);
        } catch {
            // ignore
        }

        arr && _scripts.forEach((e, i) => _scripts[i].loaded = !!arr[i]);

        if (!this.client) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        for (let i = 0; i < _scripts.length; i++) {
            if (!_scripts[i].loaded) {
                const script = _scripts[i];
                let hash;
                try {
                    hash = await this.client.script(['LOAD', script.text]);
                    script.loaded = true;
                } catch (e) {
                    script.loaded = false;
                    this.log.error(this.namespace + ' Cannot load "' + script.name + '": ' + e.message);
                    throw new Error(`Cannot load "${script.name}" into objects database: ${e.message}`);
                }
                script.hash = hash;
            }
        }
        this.scripts = {};
        _scripts.forEach(e => this.scripts[e.name] = e.hash);
    }

    /**
     * Get all keys matching a pattern using redis SCAN command, duplicates are filtered out
     *
     * @param {string} pattern - pattern to match, e. g. io.hm-rpc.0*
     * @param {number} count - count argument used by redis SCAN, default is 500
     * @return {Promise<string[]>}
     * @private
     */
    _getKeysViaScan(pattern, count = 250) {
        return new Promise(resolve => {
            const stream = this.client.scanStream({match: pattern, count: count});
            let uniqueKeys = [];

            stream.on('data', resultKeys => {
                // append result keys to uniqueKeys without duplicates
                uniqueKeys = [...uniqueKeys, ...resultKeys];
            });

            stream.on('end', () => {
                // return without duplicates
                resolve(Array.from(new Set(uniqueKeys)));
            });
        });
    }
}

module.exports = ObjectsInRedisClient;
