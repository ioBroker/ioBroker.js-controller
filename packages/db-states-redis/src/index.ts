export { StateRedisClient as Client } from '@/lib/states/statesInRedisClient.js';
export { interview } from '@/lib/states/interview.js';
/**
 * Get the default port for the database
 *
 * @param host string of host(s)
 */
export function getDefaultPort(host: string): number {
    return host.includes(',') ? 26379 : 6379;
}
export const Server = null;
