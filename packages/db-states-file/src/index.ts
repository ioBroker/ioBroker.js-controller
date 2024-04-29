export { StatesInMemoryFileDB } from './lib/states/statesInMemFileDB.js';
export { Client } from '@iobroker/db-states-redis';
export { StatesInMemoryServerClass as Server } from './lib/states/statesInMemServerClass.js';

/**
 * Get the default port of the objects db
 */
export function getDefaultPort(): number {
    return 9000;
}
