/**
 *      States DB in memory - Server with Redis protocol
 *
 *      Copyright 2013-2024 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

import { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import { ObjectsInMemoryServer } from './objectsInMemServerRedis.js';

export class ObjectsInMemoryServerClass extends ObjectsInRedisClient {
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
        this.objectsServer = new ObjectsInMemoryServer(serverSettings);
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
}
