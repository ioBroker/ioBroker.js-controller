/**
 *      Object DB in memory - Server
 *
 *      Copyright 2013-2019 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
/* jshint -W061 */
'use strict';

const socketio = require('socket.io');
const ObjectsInMemoryFileDB = require('./objectsInMemFileDB');

/**
 * This class inherits objectsInMemoryFileDB class and adds socket.io communication layer
 * to access the methods via socket.io
 **/
class ObjectsInMemoryServer extends ObjectsInMemoryFileDB {

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
            setImmediate(() => this.settings.connected(this));
        }
    }

    publishToClients(client, type, id, obj) {
        if (!client._subscribe || !client._subscribe[type]) return 0;
        const s = client._subscribe[type];

        const found = s.find(sub => sub.regex.test(id));
        if (found) {
            client.emit('message', found.pattern, id, obj);
            return 1;
        }
        return 0;
    }

    socketEvents(socket /*, user*/) {
        socket.on('writeFile', (id, name, data, options, callback) => {
            this.writeFile(id, name, data, options, callback);
        });

        socket.on('destroy', callback => {
            // client may not close DB
            typeof callback === 'function' && callback();
            //this.destroy(callback);
        });

        socket.on('enableFileCache', (enabled, options, callback) => {
            this.enableFileCache(enabled, options, callback);
        });

        socket.on('readFile', (id, name, params, options, callback) => {
            this.readFile(id, name, params, options, callback);
        });

        socket.on('readDir', (id, path, options, callback) => {
            this.readDir(id, path, options, callback);
        });

        socket.on('unlink', (id, name, options, callback) => {
            this.unlink(id, name, options, callback);
        });

        socket.on('rename', (id, oldName, newName, options, callback) => {
            this.rename(id, oldName, newName, options, callback);
        });

        socket.on('mkdir', (id, dirname, callback) => {
            this.mkdir(id, dirname, callback);
        });

        socket.on('chownFile', (id, path, options, callback) => {
            this.chownFile(id, path, options, callback);
        });

        socket.on('chmodFile', (id, path, options, callback) => {
            this.chmodFile(id, path, options, callback);
        });

        socket.on('rm', (id, path, options, callback) => {
            this.rm(id, path, options, callback);
        });

        socket.on('touch', (id, path, options, callback) => {
            this.touch(id, path, options, callback);
        });

        socket.on('subscribe', (pattern, options, callback) => {
            this.subscribeConfigForClient(socket, pattern, options, callback);
        });

        socket.on('unsubscribe', (pattern, options, callback) => {
            this.unsubscribeConfigForClient(socket, pattern, options, callback);
        });

        socket.on('getObjectView', (design, search, params, options, callback) => {
            this.getObjectView(design, search, params, options, callback);
        });

        socket.on('getObjectList', (params, options, callback) => {
            this.getObjectList(params, options, callback);
        });

        socket.on('extendObject', (id, obj, options, callback) => {
            this.extendObject(id, obj, options, callback);
        });

        socket.on('setObject', (id, obj, options, callback) => {
            this.setObject(id, obj, options, callback);
        });

        socket.on('delObject', (id, options, callback) => {
            this.delObject(id, options, callback);
        });

        socket.on('findObject', (idOrName, type, options, callback) => {
            this.findObject(idOrName, type, options, callback);
        });

        socket.on('destroyDB', (options, callback) => {
            this.destroyDB(options, callback);
        });

        socket.on('getObject', (id, options, callback) => {
            this.getObject(id, options, callback);
        });

        socket.on('chownObject', (pattern, options, callback) => {
            this.chownObject(pattern, options, callback);
        });

        socket.on('chmodObject', (pattern, options, callback) => {
            this.chmodObject(pattern, options, callback);
        });

        socket.on('error', err => this.log.error(this.namespace + ' socket.io objects: ' + err));
    }

    getClients() {
        return this.server.io.sockets.connected;
    }

    initSocket(socket) {
        if (this.settings.auth) {
            //const user = null;
            this.socketEvents(socket/*, user*/);
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
            server.server.listen(settings.port || 9001, (settings.host && settings.host !== 'localhost') ? settings.host : ((settings.host === 'localhost') ? '127.0.0.1' : undefined));
        } catch (e) {
            this.log.error(this.namespace + ' Cannot start inMem-objects on port ' + (settings.port || 9001) + ': ' + e.message);
            console.log('Cannot start inMem-objects on port ' + (settings.port || 9001) + ': ' + e.message);
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

        this.log.info(this.namespace + ' ' + (settings.secure ? 'Secure ' : '') + ' socket.io inMem-objects listening on port ' + (settings.port || 9001));
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

}

module.exports = ObjectsInMemoryServer;
