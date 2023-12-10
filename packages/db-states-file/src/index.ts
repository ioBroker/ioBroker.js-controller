// eslint-disable-next-line @typescript-eslint/no-var-requires
export const StatesInMemoryFileDB = require('./lib/states/statesInMemFileDB');
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const Client = require('@iobroker/db-states-redis').Client;
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const Server = require('./lib/states/statesInMemServerClass.js');
/**
 * Get the default port of the objects db
 */
export function getDefaultPort(): number {
    return 9000;
}
