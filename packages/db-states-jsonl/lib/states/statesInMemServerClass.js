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

const StatesInRedisClient = require('@iobroker/db-states-redis').Client;
const StatesInMemServer = require('./statesInMemServerRedis');

class StatesInMemoryServerClass extends StatesInRedisClient {
    constructor(settings) {
        settings.autoConnect = false; // delay Client connection to when we need it
        super(settings);

        const serverSettings = {
            namespace: settings.namespace ? `${settings.namespace}-Server` : 'Server',
            connection: settings.connection,
            logger: settings.logger,
            hostname: settings.hostname,
            connected: () => {
                this.connectDb(); // now that server is connected also connect client
            }
        };
        this.statesServer = new StatesInMemServer(serverSettings);
    }

    async destroy() {
        await super.destroy(); // destroy client first
        await this.statesServer.destroy(); // server afterwards too
    }

    getStatus() {
        return this.statesServer.getStatus(); // return Status as Server
    }
}

module.exports = StatesInMemoryServerClass;
