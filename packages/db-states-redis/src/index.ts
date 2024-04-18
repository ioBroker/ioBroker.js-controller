export { StateRedisClient as Client } from '@/lib/states/statesInRedisClient.js';
export function getDefaultPort(host: string): number {
    return host.includes(',') ? 26379 : 6379;
}
export const Server = null;
