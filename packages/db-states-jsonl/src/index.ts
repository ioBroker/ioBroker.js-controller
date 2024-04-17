import { Client as StatesClient } from '@iobroker/db-states-redis';
import StatesServer from './lib/states/statesInMemServerClass.js';

export const Client = StatesClient;
export const Server = StatesServer;

/**
 * Get the default port of the objects db
 */
export function getDefaultPort(): number {
    return 9000;
}
