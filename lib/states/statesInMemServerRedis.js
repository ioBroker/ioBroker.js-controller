/**
 *      States DB in memory - Server with Redis protocol
 *
 *      Copyright 2013-2018 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

/** @module statesInMemory */

/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
'use strict';
const net = require('net');

const RedisHandler         = require('../redisHandler.js');
const StatesInMemoryFileDB = require('./statesInMemFileDB');

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
//    port: 9000,
//    host: localhost
// };
//

/**
 * This class inherits statesInMemoryFileDB class and adds socket.io communication layer
 * to access the methods via socket.io
 **/
class StatesInMemoryServer extends StatesInMemoryFileDB {
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
        this.namespaceStates     = (this.settings.redisNamespace   || 'io') + '.';
        this.namespaceMsg        = (this.settings.namespaceMsg     || 'messagebox') + '.';
        this.namespaceLog        = (this.settings.namespaceLog     || 'log') + '.';
        this.namespaceSession    = (this.settings.namespaceSession || 'session') + '.';
        //this.namespaceStatesLen  = this.namespaceStates.length;
        this.namespaceMsgLen     = this.namespaceMsg.length;
        this.namespaceLogLen     = this.namespaceLog.length;
        //this.namespaceSessionlen = this.namespaceSession.length;
        this._initRedisServer(this.settings.connection, this.server);

        if (this.settings.connected) {
            setImmediate(() => this.settings.connected(this));
        }
    }

    /**
     * Separate Namespace from ID and return both
     * @param idWithNamespace ID or Array of IDs containing a redis namespace and the real ID
     * @returns {{namespace: (string), id: (Array|string)}} Object with namespace and the
     *                                                      ID/Array of IDs without the namespace
     * @private
     */
    _normalizeId(idWithNamespace) {
        let ns = this.namespaceStates;
        let id;
        if (Array.isArray(idWithNamespace)) {
            const ids = [];
            idWithNamespace.forEach((el) => {
                const {id, namespace} = this._normalizeId(el);
                ids.push(id);
                ns = namespace; // we ignore the pot. case from arrays with different namespaces
            });
            id = ids;
        }
        else {
            id = idWithNamespace;
            const pointIdx = idWithNamespace.indexOf('.');
            if (pointIdx !== -1) {
                ns = idWithNamespace.substr(0, pointIdx + 1);
                if (ns === this.namespaceStates) {
                    id = idWithNamespace.substr(pointIdx + 1);
                }
            }
        }
        return {id: id, namespace: ns};
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
        if (!client._subscribe || !client._subscribe[type]) return 0;
        const s = client._subscribe[type];

        const found = s.find(sub => sub.regex.test(id));

        if (found) {
            const objString = JSON.stringify(obj);
            this.log.silly(this.namespace + ' Redis Publish State ' + id + '=' + objString);
            const sendPattern = (type === 'state' ? '' : this.namespaceStates) + found.pattern;
            const sendId = (type === 'state' ? '' : this.namespaceStates) + id;
            client.sendArray(null, ['pmessage', sendPattern, sendId, objString]);
            return 1;
        }
        return 0;
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
            infoString += 'redis_version:3.0.0\r\n';
            infoString += '# Clients\r\n';
            infoString += '# Memory\r\n';
            infoString += '# Persistence\r\n';
            infoString += '# Stats\r\n';
            infoString += '# Replication\r\n';
            infoString += '# CPU\r\n';
            infoString += '# Cluster\r\n';
            infoString += '# Keyspace\r\n';
            infoString += 'db0:keys=' + Object.keys(this.dataset).length + ',expires=' + (Object.keys(this.stateExpires).length + Object.keys(this.sessionExpires).length) + ',avg_ttl=98633637897';
            handler.sendBulk(responseId, infoString);
        });

        // Handle Redis "QUIT" request
        handler.on('quit', (_data, responseId) => {
            this.log.silly(this.namespace + ' Redis QUIT received, close connection');
            handler.sendString(responseId, 'OK');
            handler.close();
        });

        // Handle Redis "PUBLISH" request
        handler.on('publish', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);
            if (namespace === this.namespaceStates) { // a "set" always comes afterwards, so do not publish
                handler.sendInteger(responseId, 0);
                return; // do not publish for now
            }
            const publishCount = this.publishAll(namespace.substr(0, namespace.length - 1), id, JSON.parse(data[1]));
            handler.sendInteger(responseId, publishCount);
        });

        // Handle Redis "MGET" request for state namespace
        handler.on('mget', (data, responseId) => {
            if (!data || !data[0]) {
                handler.sendArray(responseId, []);
                return;
            }
            const {id, namespace} = this._normalizeId(data);

            if (namespace === this.namespaceStates) {
                this.getStates(id, (err, result) => {
                    if (err || !result) {
                        handler.sendError(responseId, new Error('ERROR ' + err)); // TODO
                        return;
                    }
                    for (let i = 0; i < result.length; i++) {
                        result[i] = result[i] ? JSON.stringify(result[i]) : null;
                    }
                    handler.sendArray(responseId, result);
                });
            }
            else {
                handler.sendError(responseId, new Error('MGET-UNSUPPORTED for namespace ' + namespace));
            }
        });

        // Handle Redis "GET" request for state and session namespace
        handler.on('get', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);
            if (namespace === this.namespaceStates) {
                this.getState(id, (err, result) => {
                    if (err || !result) {
                        handler.sendNull(responseId);
                    } else {
                        if (Buffer.isBuffer(result)) {
                            handler.sendBufBulk(responseId, result);
                        }
                        else {
                            handler.sendBulk(responseId, JSON.stringify(result));
                        }
                    }
                });
            }
            else if (namespace === this.namespaceSession) {
                this.getSession(id, (result) => {
                    if (!result) {
                        handler.sendNull(responseId);
                    } else {
                        handler.sendBulk(responseId, JSON.stringify(result));
                    }
                });
            }
            else {
                handler.sendError(responseId, new Error('GET-UNSUPPORTED for namespace ' + namespace));
            }
        });

        // Handle Redis "SET" request for state namespace
        handler.on('set', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);
            if (namespace === this.namespaceStates) {
                try {
                    let state;
                    try {
                        state = JSON.parse(data[1].toString('utf-8'));
                    }
                    catch (e) { // No JSON, so handle as binary data and set as Buffer
                        this.setBinaryState(id, data[1], (err, id) => {
                            if (err || !id) {
                                handler.sendError(responseId, new Error('ERROR id=' + id + ' - ' + err)); // TODO
                            } else {
                                handler.sendString(responseId, 'OK');
                            }
                        });
                        return;
                    }
                    this._setStateDirect(id, state, (err, id) => {
                        if (err || !id) {
                            handler.sendError(responseId, new Error('ERROR id=' + id + ' - ' + err)); // TODO
                        } else {
                            handler.sendString(responseId, 'OK');
                        }
                    });
                } catch (err) {
                    handler.sendError(responseId, new Error('ERROR ' + err)); // TODO
                }
            }
            else {
                handler.sendError(responseId, new Error('SET-UNSUPPORTED for namespace ' + namespace));
            }
        });

        // Handle Redis "SETEX" request for state and session namespace
        handler.on('setex', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);
            if (namespace === this.namespaceStates) {
                try {
                    let state;
                    try {
                        state = JSON.parse(data[2].toString('utf-8'));
                    }
                    catch (e) { // No JSON, so handle as binary data and set as Buffer
                        state = data[2];
                    }
                    let expire = parseInt(data[1].toString('utf-8'), 10);
                    if (isNaN(expire)) {
                        handler.sendError(responseId, new Error('ERROR parsing expire value ' + data[1].toString('utf-8'))); // TODO
                        return
                    }
                    this._setStateDirect(id, state, expire, (err, id) => {
                        if (err || !id) {
                            handler.sendError(responseId, new Error('ERROR id=' + id + ' - ' + err)); // TODO
                        } else {
                            handler.sendString(responseId, 'OK');
                        }
                    });
                } catch (err) {
                    handler.sendError(responseId, new Error('ERROR ' + err)); // TODO
                }
            }
            else if (namespace === this.namespaceSession) {
                try {
                    let state = JSON.parse(data[2].toString('utf-8'));
                    let expire = parseInt(data[1].toString('utf-8'), 10);
                    if (isNaN(expire)) {
                        handler.sendError(responseId, new Error('ERROR parsing expire value ' + data[1].toString('utf-8'))); // TODO
                        return
                    }
                    this.setSession(id, expire, state, () => {
                        handler.sendString(responseId, 'OK');
                    });
                } catch (err) {
                    handler.sendError(responseId, new Error('ERROR ' + err)); // TODO
                }
            }
            else {
                handler.sendError(responseId, new Error('SETEX-UNSUPPORTED for namespace ' + namespace));
            }
        });

        // Handle Redis "DEL" request for state and session namespace
        handler.on('del', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);
            if (namespace === this.namespaceStates) {
                this.delState(id, (err) => {
                    if (err) {
                        handler.sendError(responseId, new Error('ERROR ' + err)); // TODO
                    }
                    else {
                        handler.sendInteger(responseId, 1);
                    }
                });
            }
            else if (namespace === this.namespaceSession) {
                this.destroySession(id, () => {
                    handler.sendInteger(responseId, 1);
                });
            }
            else {
                handler.sendError(responseId, new Error('DEL-UNSUPPORTED for namespace ' + namespace));
            }
        });

        // Handle Redis "KEYS" request for state namespace
        handler.on('keys', (data, responseId) => {
            if (!data || !data.length) {
                handler.sendArray(responseId, []);
                return;
            }
            const {id, namespace} = this._normalizeId(data[0]);
            if (namespace === this.namespaceStates) {
                this.getKeys(id, (err, result) => {
                    if (err || !result) {
                        handler.sendError(responseId, new Error('ERROR ' + err)); // TODO
                        return;
                    }
                    for (let i = 0; i < result.length; i++) {
                        result[i] = this.namespaceStates + result[i];
                    }
                    handler.sendArray(responseId, result);
                });
            }
            else {
                handler.sendError(responseId, new Error('KEYS-UNSUPPORTED for namespace ' + namespace));
            }
        });

        // Handle Redis "PSUBSCRIBE" request for state, log and session namespace
        handler.on('psubscribe', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);
            if (namespace === this.namespaceMsg) {
                this.subscribeMessageForClient(handler, id.substr(this.namespaceMsgLen), () =>
                    handler.sendArray(responseId, ['psubscribe', data[0], 1]));
            }
            else if (namespace === this.namespaceLog) {
                this.subscribeLogForClient(handler, id.substr(this.namespaceLogLen), () =>
                    handler.sendArray(responseId, ['psubscribe', data[0], 1]));
            }
            else if (namespace === this.namespaceStates) {
                this.subscribeForClient(handler, id, () =>
                    handler.sendArray(responseId, ['psubscribe', data[0], 1]));
            }
            else {
                handler.sendError(responseId, new Error('PSUBSCRIBE-UNSUPPORTED for namespace ' + namespace));
            }
        });

        // Handle Redis "UNSUBSCRIBE" request for state, log and session namespace
        handler.on('punsubscribe', (data, responseId) => {
            const {id, namespace} = this._normalizeId(data[0]);
            if (namespace === this.namespaceMsg) {
                this.unsubscribeMessageForClient(handler, id.substr(this.namespaceMsgLen), () =>
                    handler.sendArray(responseId, ['punsubscribe', data[0], 1]));
            }
            else if (namespace === this.namespaceLog) {
                this.unsubscribeLogForClient(handler, id.substr(this.namespaceLogLen), () =>
                    handler.sendArray(responseId, ['punsubscribe', data[0], 1]));
            }
            else if (namespace === this.namespaceStates) {
                this.unsubscribeForClient(handler, id, () =>
                    handler.sendArray(responseId, ['punsubscribe', data[0], 1]));
            }
            else {
                handler.sendError(responseId, new Error('PUNSUBSCRIBE-UNSUPPORTED for namespace ' + namespace));
            }
        });


        // Handle Redis "SUBSCRIBE" ... currently mainly ignored
        handler.on('subscribe', (data, responseId) => {
            if (data[0].startsWith('__keyevent@')) {
                // we ignore these type of events because we publish expires anyway directly
                handler.sendArray(responseId, ['subscribe', data[0], 1]);
            }
            else {
                handler.sendError(responseId, new Error('SUBSCRIBE-UNSUPPORTED for ' + data[0]));
            }
        });

        // Handle Redis "CONFIG" ... currently mainly ignored
        handler.on('config', (data, responseId) => {
            if (data[0] === 'set' && data[1] === 'notify-keyspace-events') {
                // we ignore these type of commands for now, should only be to subscribe to keyspace events
                handler.sendString(responseId, 'OK');
            }
            else {
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
            for (const s in this.serverConnections) {
                if (this.serverConnections.hasOwnProperty(s)) {
                    this.serverConnections[s].close();

                    delete this.serverConnections[s];
                }
            }

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
        this.settings.enhancedLogging && this.log.silly(this.namespace + ' Handling new Redis States connection');

        const options = {
            log: this.log,
            logScope: this.namespace + ' States',
            handleAsBuffers: true,
            enhancedLogging: this.settings.enhancedLogging
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
            this.server.server.on('error', (err) => this.log.info(this.namespace + ' ' + (settings.secure ? 'Secure ' : '') + ' Error inMem-states listening on port ' + (settings.port || 9000)) + ': ' + err);
            server.server.listen(settings.port || 9000, (settings.host && settings.host !== 'localhost') ? settings.host : ((settings.host === 'localhost') ? '127.0.0.1' : undefined));
        } catch (e) {
            this.log.error(this.namespace + ' Cannot start inMem-states on port ' + (settings.port || 9000) + ': ' + e.message);
            process.exit(24); // todo: replace it with exitcode
        }

        this.server.server.on('connection', (socket) => this._initSocket(socket));

        this.log.debug(this.namespace + ' ' + (settings.secure ? 'Secure ' : '') + ' Redis inMem-states listening on port ' + (settings.port || 9000));
    }
}

module.exports = StatesInMemoryServer;
