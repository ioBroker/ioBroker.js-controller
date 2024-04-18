import InMemoryFileDB from './lib/objects/objectsInMemFileDB.js';
import { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import DBServer from './lib/objects/objectsInMemServerClass.js';

export const Server = DBServer;
export const Client = ObjectsClient;
export const ObjectsInMemoryFileDB = InMemoryFileDB;

/**
 * Get the default port of the objects db
 */
export function getDefaultPort(): number {
    return 9001;
}
