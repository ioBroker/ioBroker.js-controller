import { defaultRedisInterview } from '@iobroker/js-controller-common';

/**
 * Custom interview during setup
 */
export function interview(): Promise<Partial<ioBroker.ObjectsDatabaseOptions>> {
    return defaultRedisInterview('states');
}
