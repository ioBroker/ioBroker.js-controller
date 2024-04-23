export { Client } from '@iobroker/db-objects-redis';
export { ObjectsInMemoryServerClass as Server } from './lib/objects/objectsInMemServerClass.js';

/**
 * Get the default port of the objects db
 */
export function getDefaultPort(): number {
    return 9001;
}
