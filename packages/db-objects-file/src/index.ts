// eslint-disable-next-line @typescript-eslint/no-var-requires
export const ObjectsInMemoryFileDB = require('./lib/objects/objectsInMemFileDB');
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const Client = require('@iobroker/db-objects-redis').Client;
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const Server = require('./lib/objects/objectsInMemServerClass.js');

/**
 * Get the default port of the objects db
 */
export function getDefaultPort(): number {
    return 9001;
}
