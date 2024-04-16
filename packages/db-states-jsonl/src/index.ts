export const Client = (await import('@iobroker/db-states-redis')).Client;
export const Server = await import('./lib/states/statesInMemServerClass.js');

/**
 * Get the default port of the objects db
 */
export function getDefaultPort(): number {
    return 9000;
}
