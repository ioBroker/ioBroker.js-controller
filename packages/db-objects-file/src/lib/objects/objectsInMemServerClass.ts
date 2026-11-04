/**
 *      States DB in memory - Server with Redis protocol
 *
 *      Copyright 2013-2026 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

import { Client as ObjectsInRedisClient, type ObjectsSettings } from '@iobroker/db-objects-redis';
import { ObjectsInMemoryServer } from './objectsInMemServerRedis.js';
import { type DbStatus } from '@iobroker/db-base';

/**
 * Objects database client that also starts an in-memory server speaking the Redis protocol
 */
export class ObjectsInMemoryServerClass extends ObjectsInRedisClient {
    private readonly objectsServer: ObjectsInMemoryServer;

    /**
     * @param settings Settings for the objects client and the in-memory server
     */
    constructor(settings: ObjectsSettings) {
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

    /**
     * Destroy the client first and the in-memory server afterwards
     */
    async destroy(): Promise<void> {
        await super.destroy(); // destroy client first
        await this.objectsServer.destroy(); // server afterwards too
    }

    /**
     * Get the status as reported by the in-memory server
     */
    getStatus(): DbStatus {
        return this.objectsServer.getStatus(); // return Status as Server
    }

    /**
     * Synchronize the file directory of the in-memory server
     *
     * @param limitId Optional object ID to limit the synchronization to
     */
    syncFileDirectory(limitId?: string): { numberSuccess: number; notifications: string[] } {
        return this.objectsServer.syncFileDirectory(limitId);
    }

    /**
     * Check whether a directory exists in the in-memory server's file storage
     *
     * @param id The object ID owning the files
     * @param name The directory path to check
     */
    dirExists(id: string, name: string): boolean {
        return this.objectsServer.dirExists(id, name);
    }
}
