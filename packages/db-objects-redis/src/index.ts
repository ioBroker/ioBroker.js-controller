/**
 * Get the default port for the database
 *
 * @param host string of host(s)
 */
export function getDefaultPort(host: string): number {
    return host.includes(',') ? 26379 : 6379;
}
export const Server = null;
export { ObjectsInRedisClient as Client } from '@/lib/objects/objectsInRedisClient.js';
export { interview } from '@/lib/objects/interview.js';
export * as objectsUtils from '@/lib/objects/objectsUtils.js';
