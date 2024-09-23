/**
 *      States DB in memory - Server with Redis protocol
 *
 *      Copyright 2013-2024 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

import { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import { StatesInMemoryServer } from './statesInMemServerRedis.js';

export class StatesInMemoryServerClass extends StatesInRedisClient {
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
            },
        };
        this.statesServer = new StatesInMemoryServer(serverSettings);
    }

    async destroy() {
        await super.destroy(); // destroy client first
        await this.statesServer.destroy(); // server afterwards too
    }

    getStatus() {
        return this.statesServer.getStatus(); // return Status as Server
    }
}
