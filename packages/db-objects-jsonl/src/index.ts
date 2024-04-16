export const Client = (await import('@iobroker/db-objects-redis')).Client;
export const Server = await import('./lib/objects/objectsInMemServerClass.js');

/**
 * Get the default port of the objects db
 */
export function getDefaultPort(): number {
    return 9001;
}
