import { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import ObjectsServer from './lib/objects/objectsInMemServerClass.js';

export const Client = ObjectsClient;
export const Server = ObjectsServer;

/**
 * Get the default port of the objects db
 */
export function getDefaultPort(): number {
    return 9001;
}
