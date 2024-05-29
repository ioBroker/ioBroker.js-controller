import { defaultRedisInterview } from '@iobroker/js-controller-common-db';

/**
 * Custom interview during setup
 *
 * @param config the prefilled database config
 */
export function interview(config: ioBroker.StatesDatabaseOptions): Promise<ioBroker.StatesDatabaseOptions> {
    return defaultRedisInterview<ioBroker.StatesDatabaseOptions>({ config, type: 'states' });
}
