/**
 *      Objects DB in memory - Server with Redis protocol
 *
 *      Copyright 2013-2018 bluefox <dogafox@gmail.com>
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
const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');
const mkdirp = require('mkdirp');
const utils  = require('./objectsUtils.js');

const RedisHandler          = require('../redisHandler.js');
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

        this.server = {
            app: null,
            server: null,
            io: null,
            settings: this.settings
        };
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

        this._initRedisServer(this.settings.connection, this.server);

        if (this.settings.connected) {
            setImmediate(() => this.settings.connected(this));
        }
    }

    addPreserveSettings(settings) {
        // when Redis is used this is done by objectsInRedis already
    }
    /**
     * Separate Namespace from ID and return both
     * @param idWithNamespace ID or Array of IDs containing a redis namespace and the real ID
     * @returns {{namespace: (string); id: (string|string[]); name?: string; isMeta?: boolean}} Object with namespace and the
     *                                                      ID/Array of IDs without the namespace
     * @private
     */
    _normalizeId(idWithNamespace) {
        let ns = this.namespaceObjects;
        let id;
        let name;
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
                            name = fileIdDetails[2]|| '';
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
            this.log.silly(this.namespace + ' Redis QUIT received, close connection');
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
                const buf = new Buffer(data[1]);
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
                        this.log.silly(this.namespace + ' Register View LUA Script: ' + scriptChecksum + ' = ' + JSON.stringify(this.knownScripts[scriptChecksum]));
                    }
                    handler.sendBulk(responseId, scriptChecksum);
                } else if (scriptFunc && scriptFunc[1]) {
                    this.knownScripts[scriptChecksum] = {func: scriptFunc[1]};
                    if (this.settings.connection.enhancedLogging) {
                        this.log.silly(this.namespace + ' Register Func LUA Script: ' + scriptChecksum + ' = ' + JSON.stringify(this.knownScripts[scriptChecksum]));
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
                handler.sendError(responseId, new Error('Unknown Script ' + data[0]));
                return;
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
                        this.log.silly(this.namespace + ' Script transformed into getObjectView: design=' + scriptDesign + ', search=' + scriptSearch);
                    }
                    this.getObjectView(scriptDesign, scriptSearch, {
                        startkey: data[3],
                        endkey: data[4],
                        include_docs: true
                    }, (err, objs) => {
                        if (err) {
                            handler.sendError(responseId, new Error('getObjectView Error for ' + scriptDesign + '/' + scriptSearch + ': ' + err));
                            return;
                        }
                        const res = [];

                        objs.rows.forEach(obj =>
                            res.push(JSON.stringify(this.dataset[obj.value._id || obj.id])));

                        handler.sendArray(responseId, res);
                    });
                    return;
                }
            } else if (this.knownScripts[data[0]].func && data.length > 4) {
                const scriptFunc = {map: this.knownScripts[data[0]].func.replace('%1', data[5])};
                if (this.settings.connection.enhancedLogging) {
                    this.log.silly(this.namespace + ' Script transformed into _applyView: func=' + scriptFunc.map);
                }
                this._applyView(scriptFunc, {
                    startkey: data[3],
                    endkey: data[4],
                    include_docs: true
                }, (err, objs) => {
                    if (err) {
                        handler.sendError(responseId, new Error('getObjectView Error ' + err));
                        return;
                    }
                    const res = [];

                    objs.rows.forEach(obj =>
                        res.push(JSON.stringify(this.dataset[obj.value._id || obj.id])));

                    handler.sendArray(responseId, res);
                });
                return;
            }
            handler.sendError(responseId, new Error('Unknown LUA script eval call ' + JSON.stringify(data)));
        });

        // Handle Redis "PUBLISH" request
        handler.on('publish', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) { // a "set" always comes afterwards, so do not publish
                handler.sendInteger(responseId, 0);
                return; // do not publish for now
            }
            const publishCount = this.publishAll(namespace.substr(0, namespace.length - 1), id, JSON.parse(data[1]));
            handler.sendInteger(responseId, publishCount);
        });

        // Handle Redis "MGET" requests
        handler.on('mget', (data, responseId) => {
            if (!data || !data.length) {
                handler.sendArray(responseId, []);
                return;
            }
            const {namespace, isMeta} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) {
                const keys = [];
                data.forEach(dataId => {
                    const {id, namespace} = this._normalizeId(dataId);
                    if (namespace !== this.namespaceObj) {
                        keys.push(null);
                        this.log.warn(this.namespace + ' Got MGET request for non Object-ID in Objects-ID chunk for ' + namespace + ' / ' + dataId);
                        return;
                    }
                    keys.push(id);
                });
                this.getObjects(keys, (err, result) => {
                    if (err || !result) {
                        handler.sendError(responseId, new Error('ERROR getObjects: ' + err)); // TODO
                        return;
                    }
                    for (let i = 0; i < result.length; i++) {
                        result[i] = result[i] ? JSON.stringify(result[i]) : null;
                    }
                    handler.sendArray(responseId, result);
                });
            } else if (namespace === this.namespaceFile) {
                // Handle request for Meta data for files
                if (isMeta) {
                    const response = [];
                    data.forEach(dataId => {
                        const {id, namespace, name} = this._normalizeId(dataId);
                        if (namespace !== this.namespaceFile) {
                            response.push(null);
                            this.log.warn(this.namespace + ' Got MGET request for non File ID in File-ID chunk for ' + dataId);
                            return;
                        }
                        this.loadFileSettings(id);
                        if (!this.fileOptions[id] || !this.fileOptions[id][name]) {
                            response.push(null);
                            return;
                        }
                        const obj = this.clone(this.fileOptions[id][name]);
                        try {
                            obj.stats = fs.statSync(path.join(this.objectsDir, id, name));
                        } catch (err) {
                            if (!name.endsWith('/_data.json')) {
                                this.log.warn(this.namespace + ' Got MGET request for non existing file ' + dataId + ', err: ' + err);
                            }
                            response.push(null);
                            return;
                        }
                        response.push(JSON.stringify(obj));
                    });
                    handler.sendArray(responseId, response);
                }
                // Handle request for File data
                else {
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
                this.getObject(id, (err, result) => {
                    if (err || !result) {
                        handler.sendNull(responseId);
                    } else {
                        handler.sendBulk(responseId, JSON.stringify(result));
                    }
                });
            } else if (namespace === this.namespaceFile) {
                // Handle request for Meta data for files
                if (isMeta) {
                    let stats;
                    try {
                        stats = fs.statSync(path.join(this.objectsDir, id, name));
                    } catch (err) {
                        handler.sendNull(responseId);
                        return;
                    }
                    if (stats.isDirectory()) {
                        handler.sendBulk(responseId, JSON.stringify({
                            file: name,
                            stats: {},
                            isDir: true
                        }));
                        return;
                    }
                    this.loadFileSettings(id);
                    if (!this.fileOptions[id] || !this.fileOptions[id][name]) {
                        handler.sendNull(responseId);
                        return;
                    }

                    let obj = this.clone(this.fileOptions[id][name]);
                    if (typeof obj !== 'object') {
                        obj = {
                            mimeType:    obj,
                            acl: {
                                owner:       (this.defaultNewAcl && this.defaultNewAcl.owner)            || utils.CONSTS.SYSTEM_ADMIN_USER,
                                ownerGroup:  (this.defaultNewAcl && this.defaultNewAcl.ownerGroup)       || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                                permissions: (this.defaultNewAcl && this.defaultNewAcl.file.permissions) || (utils.CONSTS.ACCESS_USER_ALL | utils.CONSTS.ACCESS_GROUP_ALL | utils.CONSTS.ACCESS_EVERY_ALL) // 777
                            }
                        };
                    }
                    obj.stats = stats;
                    handler.sendBulk(responseId, JSON.stringify(obj));
                }
                // Handle request for File data
                else {
                    this.readFile(id, name, (err, data, _mimeType) => {
                        if (err || data === undefined || data === null) {
                            handler.sendNull(responseId);
                        } else {
                            if (!Buffer.isBuffer(data) && typeof data === 'object') {
                                // if its an invalid object, stringify it and log warning
                                data = JSON.stringify(data);
                                this.log.warn(`${this.namespace} Data of "${id}/${name}" has invalid structure at file data request: ${data}`);
                            }
                            handler.sendBufBulk(responseId, Buffer.from(data));
                        }
                    });
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
                    this._setObjectDirect(id, obj, (err, id) => {
                        if (err || !id) {
                            handler.sendError(responseId, new Error('ERROR setObject id=' + id + ': ' + err));
                        } else {
                            handler.sendString(responseId, 'OK');
                        }
                    });
                } catch (err) {
                    handler.sendError(responseId, new Error('ERROR setObject id=' + id + ': ' + err));
                }
            } else if (namespace === this.namespaceFile) {
                // Handle request to set meta data, we ignore it because
                // will be set when data are written
                if (isMeta) {
                    this.loadFileSettings(id);

                    try {
                        if (!fs.existsSync(path.join(this.objectsDir, id, path.dirname(name)))) {
                            mkdirp.sync(path.join(this.objectsDir, id, path.dirname(name)));
                        }

                        // only set if the meta object is already/still existing
                        if (this.fileOptions[id]) {
                            this.fileOptions[id][name] = JSON.parse(data[1].toString('utf-8'));
                            fs.writeFileSync(path.join(this.objectsDir, id, '_data.json'), JSON.stringify(this.fileOptions[id]));
                        }
                    } catch (err) {
                        handler.sendError(responseId, new Error('ERROR writeFile-Meta id=' + id + ': ' + err));
                        return;
                    }
                    handler.sendString(responseId, 'OK');
                }
                // Handle request to write the file
                else {
                    this.writeFile(id, name, data[1], err => {
                        if (err) {
                            handler.sendError(responseId, new Error('ERROR writeFile id=' + id + ': ' + err));
                        } else {
                            handler.sendString(responseId, 'OK');
                        }
                    });
                }
            } else {
                handler.sendError(responseId, new Error('SET-UNSUPPORTED for namespace ' + namespace + ': Data=' + JSON.stringify(data)));
            }
        });

        // Handle Redis "RENAME" requests
        handler.on('rename', (data, responseId) => {
            const oldDetails = this._normalizeId(data[0]);
            const newDetails = this._normalizeId(data[1]);

            if (oldDetails.namespace === this.namespaceFile) {
                if (oldDetails.id !== newDetails.id) {
                    return handler.sendError(responseId, new Error('ERROR renameObject: id needs to stay the same'));
                }

                // Handle request for Meta data for files
                if (oldDetails.isMeta) {
                    handler.sendString(responseId, 'OK');
                }
                // Handle request for File data
                else {
                    this.rename(oldDetails.id, oldDetails.name, newDetails.name, err => {
                        if (err) {
                            handler.sendNull(responseId);
                        } else {
                            handler.sendString(responseId, 'OK');
                        }
                    });
                }
            } else {
                handler.sendError(responseId, new Error('RENAME-UNSUPPORTED for namespace ' + oldDetails.namespace + ': Data=' + JSON.stringify(data)));
            }
        });

        // Handle Redis "DEL" request for state and session namespace
        handler.on('del', (data, responseId) => {
            const {id, namespace, name, isMeta} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) {
                this.delObject(id, err => {
                    if (err) {
                        handler.sendError(responseId, new Error('ERROR delObject ' + id + ': ' + err));
                    } else {
                        handler.sendInteger(responseId, 1);
                    }
                });
            } else if (namespace === this.namespaceFile) {
                // Handle request to delete meta data, we ignore it because
                // will be removed when data are deleted
                if (isMeta) {
                    handler.sendString(responseId, 'OK');
                }
                // Handle request to remove the file
                else {
                    this.unlink(id, name, err => {
                        if (err) {
                            handler.sendError(responseId, new Error('ERROR unlink id=' + id + ': ' + err));
                        } else {
                            handler.sendString(responseId, 'OK');
                        }
                    });
                }
            } else {
                handler.sendError(responseId, new Error('DEL-UNSUPPORTED for namespace ' + namespace + ': Data=' + JSON.stringify(data)));
            }
        });

        // Handle Redis "KEYS" request for state namespace
        handler.on('keys', (data, responseId) => {
            if (!data || !data.length) {
                return handler.sendArray(responseId, []);
            }

            const {id, namespace, name, isMeta} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) {
                this.getKeys(id, (err, result) => {
                    if (err || !result) {
                        return handler.sendError(responseId, new Error('ERROR getKeys: ' + err));
                    }
                    for (let i = 0; i < result.length; i++) {
                        result[i] = this.namespaceObj + result[i];
                    }
                    handler.sendArray(responseId, result);
                });
            } else if (namespace === this.namespaceFile) {
                // Handle request to get meta data keys
                if (isMeta === undefined) {
                    this.readDir(id, name, (err, res) => {
                        if (err && err.endsWith(utils.ERRORS.ERROR_NOT_FOUND)) {
                            res = [];
                            err = null;
                        } else
                        if (err) {
                            handler.sendError(responseId, new Error('ERROR readDir id=' + id + ': ' + err));
                            return;
                        } else if (!res || !res.length) {
                            res = [{
                                file: '_data.json',
                                stats: {},
                                isDir: false,
                                virtualFile: true,
                                notExists: true
                            }];
                        }
                        const response = [];
                        const baseName = name + ((!name.length || name.endsWith('/')) ? '' : '/');
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
                        handler.sendArray(responseId, response);
                    });
                }
            } else {
                handler.sendError(responseId, new Error('KEYS-UNSUPPORTED for namespace ' + namespace + ': Data=' + JSON.stringify(data)));
            }
        });

        // Handle Redis "PSUBSCRIBE" request for state, log and session namespace
        handler.on('psubscribe', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) {
                this.subscribeConfigForClient(handler, id, () =>
                    handler.sendArray(responseId, ['psubscribe', data[0], 1]));
            } else {
                handler.sendError(responseId, new Error('PSUBSCRIBE-UNSUPPORTED for namespace ' + namespace + ': Data=' + JSON.stringify(data)));
            }
        });

        // Handle Redis "UNSUBSCRIBE" request for state, log and session namespace
        handler.on('punsubscribe', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);

            if (namespace === this.namespaceObj) {
                this.unsubscribeConfigForClient(handler, id, () =>
                    handler.sendArray(responseId, ['punsubscribe', data[0], 1]));
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

        handler.on('error', err => this.log.warn(this.namespace + ' Redis states: ' + err));
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
    destroy() {
        super.destroy();

        if (this.server.server) {
            Object.keys(this.serverConnections).forEach(s => {
                this.serverConnections[s].close();
                delete this.serverConnections[s];
            });

            try {
                this.server.server.close();
            } catch (e) {
                console.log(e.message);
            }
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
     * @param server Network server to use
     * @private
     */
    _initRedisServer(settings, server) {
        try {
            if (settings.secure) {
                throw Error('Secure Redis unsupported');
            } else {
                this.server.server = net.createServer();
            }
            this.server.server.on('error', err => this.log.info(this.namespace + ' ' + (settings.secure ? 'Secure ' : '') + ' Error inMem-objects listening on port ' + (settings.port || 9001)) + ': ' + err);
            server.server.listen(settings.port || 9001, (settings.host && settings.host !== 'localhost') ? settings.host : ((settings.host === 'localhost') ? '127.0.0.1' : undefined));
        } catch (e) {
            this.log.error(this.namespace + ' Cannot start inMem-objects on port ' + (settings.port || 9001) + ': ' + e.message);
            process.exit(24);
        }

        this.server.server.on('connection', socket => this._initSocket(socket));

        this.log.debug(this.namespace + ' ' + (settings.secure ? 'Secure ' : '') + ' Redis inMem-objects listening on port ' + (settings.port || 9001));
    }
}

module.exports = ObjectsInMemoryServer;
