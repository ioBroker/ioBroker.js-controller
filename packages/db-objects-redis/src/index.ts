export function getDefaultPort(host: string): number {
    return host.includes(',') ? 26379 : 6379;
}
export const Server = null;
export { default as Client } from './lib/objects/objectsInRedisClient';
export * as objectsUtils from './lib/objects/objectsUtils';
