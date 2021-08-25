/**
 *      Objects DB in memory - Server with Redis protocol
 *
 *      Copyright 2013-2021 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

/** @module objectsInRedis */

/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
'use strict';
const net    = require('net');
const fs     = require('fs-extra');
const path   = require('path');
const crypto = require('crypto');
const utils  = require('@iobroker/db-objects-redis').objectsUtils;
const tools  = require('@iobroker/db-base').tools;

const RedisHandler          = require('@iobroker/db-base').redisHandler;
const ObjectsInMemoryFileDB = require('./objectsInMemFileDB');

// settings = {
//    change:    function (id, state) {},
//    connected: function (nameOfServer) {},
//    logger: {
//           silly: function (msg) {},
//           debug: function (msg) {},
//           info:  function (msg) {},
//           warn:  function (msg) {},
//           error: function (msg) {}
//    },
//    connection: {
//           dataDir: 'relative path'
//    },
//    auth: null, //unused
//    secure: true/false,
//    certificates: as required by createServer
//    port: 9001,
//    host: localhost
// };
//

/**
 * This class inherits statesInMemoryFileDB class and adds socket.io communication layer
 * to access the methods via socket.io
 **/
class ObjectsInMemoryServer extends ObjectsInMemoryFileDB {
    /**
     * Constructor
     * @param settings State and InMem-DB settings
     */
    constructor(settings) {
        super(settings);

        this.serverConnections = {};
        this.namespaceObjects    = (this.settings.redisNamespace || (settings.connection && settings.connection.redisNamespace) || 'cfg') + '.';
        this.namespaceFile       = this.namespaceObjects + 'f.';
        this.namespaceObj        = this.namespaceObjects + 'o.';
        // this.namespaceObjectsLen   = this.namespaceObjects.length;
        this.namespaceFileLen    = this.namespaceFile.length;
        this.namespaceObjLen     = this.namespaceObj.length;

        this.knownScripts = {};

        this.normalizeFileRegex1 = new RegExp('^(.*)\\$%\\$(.*)\\$%\\$(meta|data)$');
        this.normalizeFileRegex2 = new RegExp('^(.*)\\$%\\$(.*)\\/?\\*$');

        this.open().then(() => {
            return this._initRedisServer(this.settings.connection);
        }).then(() => {
            this.log.debug(this.namespace + ' ' + (settings.secure ? 'Secure ' : '') + ' Redis inMem-objects listening on port ' + (settings.port || 9001));

            if (typeof this.settings.connected === 'function') {
                setImmediate(() => this.settings.connected());
            }
        }).catch(e => {
            this.log.error(this.namespace + ' Cannot start inMem-objects on port ' + (settings.port || 9001) + ': ' + e.message);
            process.exit(24); // todo: replace it with exitcode
        });
    }

    /**
     * Separate Namespace from ID and return both
     * @param idWithNamespace ID or Array of IDs containing a redis namespace and the real ID
     * @returns {{namespace: (string); id: string; name?: string; isMeta?: boolean}} Object with namespace and the
     *                                                      ID/Array of IDs without the namespace
     * @private
     */
    _normalizeId(idWithNamespace) {
        let ns = this.namespaceObjects;
        let id = null;
        let name = '';
        let isMeta;
        if (Array.isArray(idWithNamespace)) {
            const ids = [];
            idWithNamespace.forEach(el => {
                const {id, namespace} = this._normalizeId(el);
                ids.push(id);
                ns = namespace; // we ignore the pot. case from arrays with different namespaces
            });
            id = ids;
        } else if (typeof idWithNamespace === 'string') {
            id = idWithNamespace;
            if (idWithNamespace.startsWith(this.namespaceObjects)) {
                let idx = -1;
                if (idWithNamespace.startsWith(this.namespaceObj)) {
                    idx = this.namespaceObjLen;
                } else if (idWithNamespace.startsWith(this.namespaceFile)) {
                    idx = this.namespaceFileLen;
                }
                if (idx !== -1) {
                    ns = idWithNamespace.substr(0, idx);
                    id = idWithNamespace.substr(idx);
                }
                if (ns === this.namespaceFile) {
                    let fileIdDetails = id.match(this.normalizeFileRegex1);
                    if (fileIdDetails) {
                        id = fileIdDetails[1];
                        name = fileIdDetails[2] || '';
                        isMeta = (fileIdDetails[3] === 'meta');
                    } else {
                        fileIdDetails = id.match(this.normalizeFileRegex2);
                        if (fileIdDetails) {
                            id = fileIdDetails[1];
                            name = fileIdDetails[2] || '';
                            isMeta = undefined;
                        } else {
                            name = '';
                            isMeta = undefined;
                        }
                    }
                }
            }
        }
        return {id, namespace: ns, name, isMeta};
    }

    /**
     * Publish a subscribed value to one of the redis connections in redis format
     * @param client Instance of RedisHandler
     * @param type Type of subscribed key
     * @param id Subscribed ID
     * @param obj Object to publish
     * @returns {number} Publish counter 0 or 1 depending if send out or not
     */
    publishToClients(client, type, id, obj) {
        if (!client._subscribe || !client._subscribe[type]) {
            return 0;
        }
        const s = client._subscribe[type];

        const found = s.find(sub => sub.regex.test(id));
        if (found) {
            const objString = JSON.stringify(obj);
            this.log.silly(this.namespace + ' Redis Publish Object ' + id + '=' + objString);
            const sendPattern = (type === 'objects' ? '' : this.namespaceObjects) + found.pattern;
            const sendId = (type === 'objects' ? this.namespaceObj : this.namespaceObjects) + id;
            client.sendArray(null,['pmessage', sendPattern, sendId, objString]);
            return 1;
        }
        return 0;
    }

    /**
     * Generate ID for a File
     * @param id ID of the File
     * @param name Name of the file
     * @param isMeta generate a META ID or a Data ID?
     * @returns {string} File-ID
     */
    getFileId(id, name, isMeta) {
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

        return this.namespaceFile + id + '$%$' + name + (isMeta !== undefined ? (isMeta ? '$%$meta' : '$%$data') : '');
    }

    /**
     * Register all event listeners for Handler and implement the relevant logic
     * @param handler RedisHandler instance
     * @private
     */
    _socketEvents(handler) {
        let connectionName = null;
        let namespaceLog = this.namespace;

        // Handle Redis "INFO" request
        handler.on('info', (_data, responseId) => {
            let infoString = '# Server\r\n';
            infoString += 'redis_version:3.0.0-iobroker\r\n';
            infoString += '# Clients\r\n';
            infoString += '# Memory\r\n';
            infoString += '# Persistence\r\n';
            infoString += '# Stats\r\n';
            infoString += '# Replication\r\n';
            infoString += '# CPU\r\n';
            infoString += '# Cluster\r\n';
            infoString += '# Keyspace\r\n';
            infoString += 'db0:keys=' + Object.keys(this.dataset).length + ',expires=0,avg_ttl=98633637897';
            handler.sendBulk(responseId, infoString);
        });

        // Handle Redis "QUIT" request
        handler.on('quit', (_data, responseId) => {
            this.log.silly(namespaceLog + ' Redis QUIT received, close connection');
            handler.sendString(responseId, 'OK');
            handler.close();
        });

        // Handle Redis "SCRIPT" request
        handler.on('script', (data, responseId) => {
            data[0] = data[0].toLowerCase();
            if (data[0] === 'exists') {
                data.shift();
                const scripts = [];
                data.forEach(checksum => scripts.push(this.knownScripts[checksum] ? 1 : 0));
                handler.sendArray(responseId, scripts);
            } else if (data[0] === 'load') {
                const shasum = crypto.createHash('sha1');
                const buf = Buffer.from(data[1]);
                shasum.update(buf);
                const scriptChecksum = shasum.digest('hex');

                const scriptDesign = data[1].match(/^-- design: ([a-z0-9A-Z-.]+)\s/m);
                const scriptFunc = data[1].match(/^-- func: (.+)$/m);
                if (scriptDesign && scriptDesign[1]) {
                    const design = scriptDesign[1];
                    let search = null;
                    const scriptSearch = data[1].match(/^-- search: ([a-z0-9A-Z-.]*)\s/m);
                    if (scriptSearch && scriptSearch[1]) {
                        search = scriptSearch[1];
                    }

                    this.knownScripts[scriptChecksum] = {design: design, search: search};
                    if (this.settings.connection.enhancedLogging) {
                        this.log.silly(`${namespaceLog} Register View LUA Script: ${scriptChecksum} = ${JSON.stringify(this.knownScripts[scriptChecksum])}`);
                    }
                    handler.sendBulk(responseId, scriptChecksum);
                } else if (scriptFunc && scriptFunc[1]) {
                    this.knownScripts[scriptChecksum] = {func: scriptFunc[1]};
                    if (this.settings.connection.enhancedLogging) {
                        this.log.silly(`${namespaceLog} Register Func LUA Script: ${scriptChecksum} = ${JSON.stringify(this.knownScripts[scriptChecksum])}`);
                    }
                    handler.sendBulk(responseId, scriptChecksum);
                } else {
                    handler.sendError(responseId, new Error('Unknown LUA script ' + data[0]));
                }
            } else {
                handler.sendError(responseId, new Error('Unsupported Script command ' + data[0]));
            }
        });

        // Handle Redis "EVALSHA" request
        handler.on('evalsha', (data, responseId) => {
            if (!this.knownScripts[data[0]]) {
                return void handler.sendError(responseId, new Error('Unknown Script ' + data[0]));
            }
            if (this.knownScripts[data[0]].design) {
                const scriptDesign = this.knownScripts[data[0]].design;
                if (data[2] === this.namespaceObj && data.length > 4) {
                    let scriptSearch = this.knownScripts[data[0]].search;
                    if (scriptDesign === 'system' && !scriptSearch && data[5]) {
                        scriptSearch = data[5];
                    }
                    if (!scriptSearch) {
                        scriptSearch = 'state';
                    }
                    if (this.settings.connection.enhancedLogging) {
                        this.log.silly(`${namespaceLog} Script transformed into getObjectView: design=${scriptDesign}, search=${scriptSearch}`);
                    }
                    let objs;
                    try {
                        objs = this._getObjectView(scriptDesign, scriptSearch, {
                            startkey: data[3],
                            endkey: data[4],
                            include_docs: true
                        });
                    } catch (err) {
                        return void handler.sendError(responseId, new Error('_getObjectView Error for ' + scriptDesign + '/' + scriptSearch + ': ' + err.message));
                    }
                    const res = objs.rows.map(obj => JSON.stringify(this.dataset[obj.value._id || obj.id]));
                    handler.sendArray(responseId, res);
                }
            } else if (this.knownScripts[data[0]].func && data.length > 4) {
                const scriptFunc = {map: this.knownScripts[data[0]].func.replace('%1', data[5])};
                if (this.settings.connection.enhancedLogging) {
                    this.log.silly(`${namespaceLog} Script transformed into _applyView: func=${scriptFunc.map}`);
                }
                const objs = this._applyView(scriptFunc, {
                    startkey: data[3],
                    endkey: data[4],
                    include_docs: true
                });
                const res = objs.rows.map(obj => JSON.stringify(this.dataset[obj.value._id || obj.id]));

                return void handler.sendArray(responseId, res);
            } else {
                handler.sendError(responseId, new Error('Unknown LUA script eval call ' + JSON.stringify(data)));
            }
        });

        // Handle Redis "PUBLISH" request
        handler.on('publish', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) { // a "set" always comes afterwards, so do not publish
                return void handler.sendInteger(responseId, 0); // do not publish for now
            }
            const publishCount = this.publishAll(namespace.substr(0, namespace.length - 1), id, JSON.parse(data[1]));
            handler.sendInteger(responseId, publishCount);
        });

        // Handle Redis "MGET" requests
        handler.on('mget', (data, responseId) => {
            if (!data || !data.length) {
                return void handler.sendArray(responseId, []);
            }
            const {namespace, isMeta} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) {
                const keys = [];
                data.forEach(dataId => {
                    const {id, namespace} = this._normalizeId(dataId);
                    if (namespace !== this.namespaceObj) {
                        keys.push(null);
                        this.log.warn(`${namespaceLog} Got MGET request for non Object-ID in Objects-ID chunk for ${namespace} / ${dataId}`);
                        return;
                    }
                    keys.push(id);
                });
                let result;
                try {
                    result = this._getObjects(keys);
                } catch (err) {
                    return void handler.sendError(responseId, new Error('ERROR _getObjects: ' + err.message));
                }
                result = result.map(el => el ? JSON.stringify(el) : null);
                handler.sendArray(responseId, result);
            } else if (namespace === this.namespaceFile) {
                // Handle request for Meta data for files
                if (isMeta) {
                    const response = [];
                    data.forEach(dataId => {
                        const {id, namespace, name} = this._normalizeId(dataId);
                        if (namespace !== this.namespaceFile) {
                            response.push(null);
                            this.log.warn(`${namespaceLog} Got MGET request for non File ID in File-ID chunk for ${dataId}`);
                            return;
                        }
                        this._loadFileSettings(id);
                        if (!this.fileOptions[id] || !this.fileOptions[id][name]) {
                            response.push(null);
                            return;
                        }
                        const obj = this._clone(this.fileOptions[id][name]);
                        try {
                            // @ts-ignore
                            obj.stats = fs.statSync(path.join(this.objectsDir, id, name));
                        } catch (err) {
                            if (!name.endsWith('/_data.json')) {
                                this.log.warn(`${namespaceLog} Got MGET request for non existing file ${dataId}, err: ${err.message}`);
                            }
                            response.push(null);
                            return;
                        }
                        response.push(JSON.stringify(obj));
                    });
                    handler.sendArray(responseId, response);
                } else {
                    // Handle request for File data
                    handler.sendError(responseId, new Error('MGET-UNSUPPORTED for file data'));
                }
            } else {
                handler.sendError(responseId, new Error('MGET-UNSUPPORTED for namespace ' + namespace + ': Data=' + JSON.stringify(data)));
            }
        });

        // Handle Redis "GET" requests
        handler.on('get', (data, responseId) => {
            const {id, namespace, name, isMeta} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) {
                const result = this._getObject(id);
                if (!result) {
                    handler.sendNull(responseId);
                } else {
                    handler.sendBulk(responseId, JSON.stringify(result));
                }
            } else if (namespace === this.namespaceFile) {
                // Handle request for Meta data for files
                if (isMeta) {
                    let stats;
                    try {
                        stats = fs.statSync(path.join(this.objectsDir, id, name));
                    } catch {
                        return void handler.sendNull(responseId);
                    }
                    if (stats.isDirectory()) {
                        return void handler.sendBulk(responseId, JSON.stringify({
                            file: name,
                            stats: {},
                            isDir: true
                        }));
                    }
                    this._loadFileSettings(id);
                    if (!this.fileOptions[id] || !this.fileOptions[id][name]) {
                        return void handler.sendNull(responseId);
                    }

                    let obj = this._clone(this.fileOptions[id][name]);
                    if (typeof obj !== 'object') {
                        obj = {
                            mimeType: obj,
                            acl: {
                                owner: (this.defaultNewAcl && this.defaultNewAcl.owner) || utils.CONSTS.SYSTEM_ADMIN_USER,
                                ownerGroup: (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                                permissions: (this.defaultNewAcl && this.defaultNewAcl.file.permissions) || (utils.CONSTS.ACCESS_USER_ALL | utils.CONSTS.ACCESS_GROUP_ALL | utils.CONSTS.ACCESS_EVERY_ALL) // 777
                            }
                        };
                    }
                    obj.stats = stats;
                    handler.sendBulk(responseId, JSON.stringify(obj));
                } else {
                    // Handle request for File data
                    let data;
                    try {
                        data = this._readFile(id, name);
                    } catch {
                        return void handler.sendNull(responseId);
                    }
                    if (data.fileContent === undefined || data.fileContent === null) {
                        return void handler.sendNull(responseId);
                    }
                    let fileData = data.fileContent;
                    if (!Buffer.isBuffer(fileData) && tools.isObject(fileData)) {
                        // if its an invalid object, stringify it and log warning
                        fileData = JSON.stringify(fileData);
                        this.log.warn(`${namespaceLog} Data of "${id}/${name}" has invalid structure at file data request: ${fileData}`);
                    }
                    handler.sendBufBulk(responseId, Buffer.from(fileData));
                }
            } else {
                handler.sendError(responseId, new Error('GET-UNSUPPORTED for namespace ' + namespace + ': Data=' + JSON.stringify(data)));
            }
        });

        // Handle Redis "SET" requests
        handler.on('set', (data, responseId) => {
            const {id, namespace, name, isMeta} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) {
                try {
                    const obj = JSON.parse(data[1].toString('utf-8'));
                    this._setObjectDirect(id, obj);
                } catch (err) {
                    return void handler.sendError(responseId, new Error(`ERROR setObject id=${id}: ${err.message}`));
                }
                handler.sendString(responseId, 'OK');
            } else if (namespace === this.namespaceFile) {
                // Handle request to set meta data, we ignore it because
                // will be set when data are written
                if (isMeta) {
                    this._loadFileSettings(id);

                    try {
                        fs.ensureDirSync(path.join(this.objectsDir, id, path.dirname(name)));

                        // only set if the meta object is already/still existing
                        if (this.fileOptions[id]) {
                            this.fileOptions[id][name] = JSON.parse(data[1].toString('utf-8'));
                            fs.writeFileSync(path.join(this.objectsDir, id, '_data.json'), JSON.stringify(this.fileOptions[id]));
                        }
                    } catch (err) {
                        return void handler.sendError(responseId, new Error(`ERROR writeFile-Meta id=${id}: ${err.message}`));
                    }
                    handler.sendString(responseId, 'OK');
                } else {
                    // Handle request to write the file
                    try {
                        this._writeFile(id, name, data[1]);
                    } catch (err) {
                        return void handler.sendError(responseId, new Error(`ERROR writeFile id=${id}: ${err.message}`));
                    }
                    handler.sendString(responseId, 'OK');
                }
            } else {
                handler.sendError(responseId, new Error(`SET-UNSUPPORTED for namespace ${namespace}: Data=${JSON.stringify(data)}`));
            }
        });

        // Handle Redis "RENAME" requests
        handler.on('rename', (data, responseId) => {
            const oldDetails = this._normalizeId(data[0]);
            const newDetails = this._normalizeId(data[1]);

            if (oldDetails.namespace === this.namespaceFile) {
                if (oldDetails.id !== newDetails.id) {
                    return void handler.sendError(responseId, new Error('ERROR renameObject: id needs to stay the same'));
                }

                // Handle request for Meta data for files
                if (oldDetails.isMeta) {
                    handler.sendString(responseId, 'OK');
                } else {
                    // Handle request for File data
                    try {
                        this._rename(oldDetails.id, oldDetails.name, newDetails.name);
                    } catch {
                        return void handler.sendNull(responseId);
                    }
                    handler.sendString(responseId, 'OK');
                }
            } else {
                handler.sendError(responseId, new Error(`RENAME-UNSUPPORTED for namespace ${oldDetails.namespace}: Data=${JSON.stringify(data)}`));
            }
        });

        // Handle Redis "DEL" request for state and session namespace
        handler.on('del', (data, responseId) => {
            const {id, namespace, name, isMeta} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) {
                try {
                    this._delObject(id);
                } catch (err) {
                    return void handler.sendError(responseId, err);
                }
                handler.sendInteger(responseId, 1);
            } else if (namespace === this.namespaceFile) {
                // Handle request to delete meta data, we ignore it because
                // will be removed when data are deleted
                if (isMeta) {
                    handler.sendString(responseId, 'OK');
                } else {
                    // Handle request to remove the file
                    try {
                        this._unlink(id, name);
                    } catch (err) {
                        return void handler.sendError(responseId, err);
                    }
                    handler.sendString(responseId, 'OK');
                }
            } else {
                handler.sendError(responseId, new Error(`DEL-UNSUPPORTED for namespace ${namespace}: Data=${JSON.stringify(data)}`));
            }
        });

        handler.on('exists', (data, responseId) => {
            if (!data || !data.length) {
                return void handler.sendInteger(responseId, 0);
            }

            // Note: we only simulate single key existence check
            const {id, namespace, name} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) {
                let exists;
                try {
                    exists = this._objectExists(id);
                } catch (e) {
                    return void handler.sendError(responseId, e);
                }
                handler.sendInteger(responseId, exists ? 1 : 0);
            } else if (namespace === this.namespaceFile) {
                let exists;
                try {
                    exists = this._fileExists(id, name);
                } catch (e) {
                    return void handler.sendError(responseId, e);
                }
                handler.sendInteger(responseId, exists ? 1 : 0);
            } else {
                handler.sendError(responseId, new Error(`EXISTS-UNSUPPORTED for namespace ${namespace}`));
            }
        });

        // handle Redis "SCAN" request for objects namespace
        handler.on('scan', (data, responseId) => {
            if (!data || data.length < 3) {
                return void handler.sendArray(responseId, ['0', []]);
            }

            return this._handleScanOrKeys(handler, data[2], responseId, true);
        });

        // Handle Redis "KEYS" request for state namespace
        handler.on('keys', (data, responseId) => {
            if (!data || !data.length) {
                return void handler.sendArray(responseId, []);
            }

            return this._handleScanOrKeys(handler, data[0], responseId);
        });

        // Handle Redis "PSUBSCRIBE" request for state, log and session namespace
        handler.on('psubscribe', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) {
                this._subscribeConfigForClient(handler, id);
                handler.sendArray(responseId, ['psubscribe', data[0], 1]);
            } else {
                handler.sendError(responseId, new Error('PSUBSCRIBE-UNSUPPORTED for namespace ' + namespace + ': Data=' + JSON.stringify(data)));
            }
        });

        // Handle Redis "UNSUBSCRIBE" request for state, log and session namespace
        handler.on('punsubscribe', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) {
                this._unsubscribeConfigForClient(handler, id);
                handler.sendArray(responseId, ['punsubscribe', data[0], 1]);
            } else {
                handler.sendError(responseId, new Error('PUNSUBSCRIBE-UNSUPPORTED for namespace ' + namespace + ': Data=' + JSON.stringify(data)));
            }
        });

        // Handle Redis "CONFIG" ... currently mainly ignored
        handler.on('config', (data, responseId) => {
            if (data[0] === 'set' && data[1] === 'lua-time-limit') {
                // we ignore these type of commands for now, irrelevant
                handler.sendString(responseId, 'OK');
            } else {
                handler.sendError(responseId, new Error('CONFIG-UNSUPPORTED for ' + JSON.stringify(data)));
            }
        });

        // handle client SETNAME/GETNAME
        handler.on('client', (data, responseId) => {
            if (data[0] === 'setname' && typeof data[1] === 'string') {
                if (data[1] === '') {
                    // on empty string redis sets null again and sends 'OK'
                    connectionName = null;
                } else {
                    connectionName = data[1];
                    namespaceLog = connectionName;
                }
                handler.sendString(responseId, 'OK');
            } else if (data[0] === 'getname') {
                if (typeof connectionName === 'string' && connectionName !== '') {
                    handler.sendString(responseId, connectionName);
                } else {
                    // redis sends null if no name defined
                    handler.sendNull(responseId);
                }
            } else {
                handler.sendError(responseId, new Error(`CLIENT-UNSUPPORTED for ${JSON.stringify(data)}`));
            }
        });

        handler.on('error', err => this.log.warn(`${namespaceLog} Redis states: ${err}`));
    }

    /**
     * Return connected RedisHandlers/Connections
     * @returns {{}|*}
     */
    getClients() {
        return this.serverConnections;
    }

    /**
     * Destructor of the class. Called by shutting down.
     */
    async destroy() {
        await super.destroy();

        if (this.server) {
            Object.keys(this.serverConnections).forEach(s => {
                this.serverConnections[s].close();
                delete this.serverConnections[s];
            });

            return /** @type {Promise<void>} */ (new Promise(resolve => {
                if (!this.server) {
                    return void resolve();
                }
                try {
                    this.server.close(() => resolve());
                } catch (e) {
                    console.log(e.message);
                    resolve();
                }
            }));
        }
    }

    /**
     * Get keys matching pattern and send it to given responseId, for "SCAN" and "KEYS" - Objects and files supported
     *
     * @param handler RedisHandler instance
     * @param {string} pattern - pattern without namespace prefix
     * @param {number} responseId - Id where response will be sent to
     * @param {boolean} isScan - if used by "SCAN" this flag should be true
     * @private
     */
    _handleScanOrKeys(handler, pattern, responseId, isScan = false) {
        const {id, namespace, name, isMeta} = this._normalizeId(pattern);

        let response = [];
        if (namespace === this.namespaceObj || namespace === this.namespaceObjects) {
            response =  this._getKeys(id).map(val => this.namespaceObj + val);
            // if scan, we send the cursor as first argument
            if (namespace !== this.namespaceObjects) { // When it was not the full DB namespace send out response
                return void handler.sendArray(responseId, isScan ? ['0', response] : response);
            }
        }
        if (namespace === this.namespaceFile || namespace === this.namespaceObjects) {
            // Handle request to get meta data keys
            if (isMeta === undefined) {
                let res;
                try {
                    res = this._readDir(id, name);
                    if (!res || !res.length) {
                        res = [{
                            file: '_data.json',
                            stats: {},
                            isDir: false,
                            virtualFile: true,
                            notExists: true
                        }];
                    }
                } catch (err) {
                    if (!err.message.endsWith(utils.ERRORS.ERROR_NOT_FOUND)) {
                        return void handler.sendError(responseId, new Error(`ERROR readDir id=${id}: ${err.message}`));
                    }
                    res = [];
                }
                let baseName = name || '';
                if (baseName.length && !baseName.endsWith('/')) {
                    baseName += '/';
                }
                res.forEach(arr => {
                    let entryId = id;
                    if (arr.isDir) {
                        if (entryId === '' || entryId === '*') {
                            entryId = arr.file;
                            arr.file = '_data.json'; // We return a "virtual file" to mark the directory as existing
                        } else {
                            arr.file += '/_data.json'; // We return a "virtual file" to mark the directory as existing
                        }
                    }
                    // We need to simulate the Meta data here, so return both
                    response.push(this.getFileId(entryId, baseName + arr.file, true));
                    response.push(this.getFileId(entryId, baseName + arr.file, false));
                });
                handler.sendArray(responseId, isScan ? ['0', response] : response); // send out file or full db response
            } else { // such a request should never happen
                handler.sendArray(responseId, isScan ? ['0', []] : []); // send out file or full db response
            }
        } else {
            handler.sendError(responseId, new Error(`${isScan ? 'SCAN' : 'KEYS'}-UNSUPPORTED for namespace ${namespace}: Pattern=${pattern}`));
        }
    }

    /**
     * Initialize RedisHandler for a new network connection
     * @param socket Network socket
     * @private
     */
    _initSocket(socket) {
        if (this.settings.connection.enhancedLogging) {
            this.log.silly(this.namespace + ' Handling new Redis Objects connection');
        }
        const options = {
            log: this.log,
            logScope: (this.settings.namespace || '') + ' Objects',
            handleAsBuffers: true,
            enhancedLogging: this.settings.connection.enhancedLogging
        };
        const handler = new RedisHandler(socket, options);
        this._socketEvents(handler);

        this.serverConnections[socket.remoteAddress + ':' + socket.remotePort] = handler;
        socket.on('close', () => {
            if (this.serverConnections[socket.remoteAddress + ':' + socket.remotePort]) {
                delete this.serverConnections[socket.remoteAddress + ':' + socket.remotePort];
            }
        });
    }

    /**
     * Initialize Redis Server
     * @param settings Settings object
     * @private
     * @return {Promise<void>}
     */
    _initRedisServer(settings) {
        return new Promise((resolve, reject) => {
            if (settings.secure) {
                reject(new Error('Secure Redis unsupported for File-DB'));
            }
            try {
                this.server = net.createServer();
                this.server.on('error', err =>
                    this.log.info(`${this.namespace} ${settings.secure ? 'Secure ' : ''} Error inMem-objects listening on port ${settings.port || 9001}: ${err}`));
                this.server.on('connection', socket => this._initSocket(socket));

                this.server.listen(
                    settings.port || 9001,
                    settings.host === 'localhost' ? '127.0.0.1' : settings.host ? settings.host : undefined,
                    () => resolve()
                );
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = ObjectsInMemoryServer;
