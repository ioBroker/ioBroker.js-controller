/**
 *      States DB in memory - Server with Redis protocol
 *
 *      Copyright 2013-2021 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

/** @module statesInMemory */

/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
'use strict';

const ObjectsInRedisClient = require('@iobroker/db-objects-redis').Client;
const ObjectsInMemServer = require('./objectsInMemServerRedis');

class ObjectsInMemoryServerClass extends ObjectsInRedisClient {

    constructor(settings) {
        settings.autoConnect = false; // delay Client connection to when we need it

        // hack around testing problem where subscribe was called before connect
        // Should be removed for a later release
        const origConnected = settings.connected;
        settings.connected = () => {
            this.clientConnected = true;
            if (Array.isArray(this.storedSubscribes) && this.storedSubscribes.length) {
                this.log.warn(`${this.namespace} Replay ${this.storedSubscribes.length} subscription calls for Objects Server that were done before the client was connected initially`);
                this.storedSubscribes.forEach((s => this.subscribe(s.pattern, s.options, s.callback)));
                this.storedSubscribes = [];
            }
            origConnected();
        };
        super(settings);
        this.clientConnected = false;
        this.storedSubscribes = [];

        const serverSettings = {
            namespace:  settings.namespace ? `${settings.namespace}-Server` : 'Server',
            connection: settings.connection,
            logger: settings.logger,
            hostname: settings.hostname,
            connected: () => {
                this.connectDb(); // now that server is connected also connect client
            }
        };
        this.objectsServer = new ObjectsInMemServer(serverSettings);
    }

    async destroy() {
        await super.destroy(); // destroy client first
        await this.objectsServer.destroy(); // server afterwards too
    }

    getStatus() {
        return this.objectsServer.getStatus(); // return Status as Server
    }

    syncFileDirectory(limitId) {
        return this.objectsServer.syncFileDirectory(limitId);
    }

    dirExists(id, name) {
        return this.objectsServer.dirExists(id, name);
    }

    subscribe(pattern, options, callback) {
        if (!this.clientConnected) {
            this.storedSubscribes.push({pattern, options, callback}); // we ignore the promise return because not used for this testing issue we work around here
        } else {
            return super.subscribe(pattern, options, callback);
        }
    }
}
module.exports = ObjectsInMemoryServerClass;
