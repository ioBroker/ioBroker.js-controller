/**
 *      States DB in memory - Server
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

const socketio              = require('socket.io');
const StatesInMemoryFileDB  = require('./statesInMemFileDB');

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

/** @class */
class StatesInMemoryServer extends StatesInMemoryFileDB {

    constructor(settings) {
        super(settings);

        this.server = {
            app: null,
            server: null,
            io: null,
            settings: this.settings
        };

        this._initWebServer(this.settings.connection, this.server);

        if (this.settings.connected) {
            setImmediate(() => this.settings.connected('socket.io InMemoryDB states'));
        }
    }

    publishToClients(client, type, id, obj) {
        if (!client._subscribe || !client._subscribe[type]) return;
        const s = client._subscribe[type];
        for (let i = 0; i < s.length; i++) {
            if (s[i].regex.test(id)) {
                client.emit('message', s[i].pattern, id, obj);
                return;
            }
        }
    }

    socketEvents(socket, _user) {
        /*
         *      states
         */
        socket.on('getStates', (keys, callback, dontModify) => {
            this.getStates(keys, callback, dontModify);
        });
        socket.on('getState', (id, callback) => {
            this.getState(id, callback);
        });
        socket.on('setState', (id, state, callback) => {
            this.setState(id, state, callback);
        });
        socket.on('setRawState', (id, state, callback) => {
            this.setRawState(id, state, callback);
        });
        socket.on('delState', (id, callback) => {
            this.delState(id, callback);
        });
        socket.on('getKeys', (pattern, callback, dontModify) => {
            this.getKeys(pattern, callback, dontModify);
        });
        socket.on('subscribe', (pattern, callback) => {
            this.subscribeForClient(socket, pattern, callback);
        });
        socket.on('unsubscribe', (pattern, callback) => {
            this.unsubscribeForClient(socket, pattern, callback);
        });
        socket.on('pushMessage', (id, state, callback) => {
            this.pushMessage(id, state, callback);
        });
        socket.on('lenMessage', (id, callback) => {
            this.lenMessage(id, callback);
        });
        socket.on('getMessage', (id, callback) => {
            this.getMessage(id, callback);
        });
        socket.on('delMessage', (id, messageId, callback) => {
            this.delMessage(id, messageId, callback);
        });
        socket.on('subscribeMessage', (id, callback) => {
            this.subscribeMessageForClient(socket, id, callback);
        });
        socket.on('unsubscribeMessage', (id, callback) => {
            this.unsubscribeMessageForClient(socket, id, callback);
        });
        socket.on('pushLog', (id, state, callback) => {
            this.pushLog(id, state, callback);
        });
        socket.on('lenLog', (id, callback) => {
            this.lenLog(id, callback);
        });
        socket.on('getLog', (id, callback) => {
            this.getLog(id, callback);
        });
        socket.on('delLog', (id, logId, callback) => {
            this.delLog(id, logId, callback);
        });
        socket.on('subscribeLog', (id, callback) => {
            this.subscribeLogForClient(socket, id, callback);
        });
        socket.on('unsubscribeLog', (id, callback) => {
            this.unsubscribeLogForClient(socket, id, callback);
        });
        socket.on('getSession', (id, callback) => {
            this.getSession(id, callback);
        });
        socket.on('setSession', (id, expire, obj, callback) => {
            this.setSession(id, expire, obj, callback);
        });
        socket.on('destroySession', (id, callback) => {
            this.destroySession(id, callback);
        });
        /*
        socket.on('getConfig', function (id, callback) {
            this.getConfig.apply(this, arguments);
        });
        socket.on('getConfigKeys', function (pattern, callback, dontModify) {
            this.getConfigKeys.apply(this, arguments);
        });
        socket.on('getConfigs', function (keys, callback, dontModify) {
            this.getConfigs.apply(this, arguments);
        });
        socket.on('setConfig', function (id, obj, callback) {
            this.setConfig.apply(this, arguments);
        });
        socket.on('delConfig', function (id, callback) {
            this.delConfig.apply(this, arguments);
        });
        socket.on('subscribeConfig', function (pattern, callback) {
            arguments.unshift(socket);
            this.subscribeConfig.apply(this, arguments);
        });
        socket.on('unsubscribeConfig', function (pattern, callback) {
            arguments.unshift(socket);
            this.unsubscribeConfig.apply(this, arguments);
        });
        */
        socket.on('setBinaryState', (id, data, callback) => {
            this.setBinaryState(id, data, callback);
        });
        socket.on('getBinaryState', (id, callback) => {
            this.getBinaryState(id, callback);
        });
        socket.on('delBinaryState', (id, callback) => {
            this.delBinaryState(id, callback);
        });
        socket.on('error', err => this.log.error(this.namespace + ' socket.io states: ' + err));
    }

    getClients() {
        return this.server.io.sockets.connected;
    }

    // Destructor of the class. Called by shutting down.
    destroy() {
        super.destroy();

        if (this.server.io) {
            if (this.server.io.sockets && this.server.io.sockets.connected) {
                for (const s in this.server.io.sockets.connected) {
                    if (this.server.io.sockets.connected.hasOwnProperty(s)) {
                        delete this.server.io.sockets.connected[s];
                    }
                }
            }
            try {
                this.server.io.close();
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    initSocket(socket) {
        if (this.settings.auth) {
            const user = null;
            this.socketEvents(socket, user);
        } else {
            this.socketEvents(socket);
        }
    }

    _initWebServer(settings, server) {
        try {
            if (settings.secure) {
                if (!settings.certificates) return;
                server.server = require('https').createServer(settings.certificates, function (_req, res) {
                    res.writeHead(501);
                    res.end('Not Implemented');
                });
            } else {
                server.server = require('http').createServer(function (_req, res) {
                    res.writeHead(501);
                    res.end('Not Implemented');
                });
            }
            server.server.listen(settings.port || 9000, (settings.host && settings.host !== 'localhost') ? settings.host : ((settings.host === 'localhost') ? '127.0.0.1' : undefined));
        } catch (e) {
            this.log.error(this.namespace + ' Cannot start inMem-states on port ' + (settings.port || 9000) + ': ' + e.message);
            console.log('Cannot start inMem-states on port ' + (settings.port || 9000) + ': ' + e.message);
            process.exit(24);
        }

        this.server.io = socketio.listen(this.server.server);

        if (settings.auth) {
            this.server.io.use((socket, next) => {
                if (!socket.request._query.user || !socket.request._query.pass) {
                    console.log('No password or username!');
                    next(new Error('Authentication error'));
                } else {
                    // TODO
                    console.log('Not implemented');
                    next(new Error('Authentication error/Not implemented'));
                    /*
                    adapter.checkPassword(socket.request._query.user, socket.request._query.pass, function (res) {
                        if (res) {
                            console.log("Logged in: " + socket.request._query.user + ', ' + socket.request._query.pass);
                            return next();
                        } else {
                            console.log("Invalid password or user name: " + socket.request._query.user + ', ' + socket.request._query.pass);
                            next(new Error('Invalid password or user name'));
                        }
                    });*/
                }
            });
        }
        this.server.io.set('origins', '*:*');
        this.server.io.on('connection', (socket) => this.initSocket(socket));

        this.log.info(this.namespace + ' ' + (settings.secure ? 'Secure ' : '') + ' socket.io inMem-states listening on port ' + (settings.port || 9000));
    }
}

module.exports = StatesInMemoryServer;
