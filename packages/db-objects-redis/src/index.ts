export function getDefaultPort(host: string): number {
    return host.includes(',') ? 26379 : 6379;
}
export const Server = null;
export { ObjectsInRedisClient as Client, ChangeFileFunction } from './lib/objects/objectsInRedisClient';
export * as objectsUtils from './lib/objects/objectsUtils';
