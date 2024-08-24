import { defaultRedisInterview } from '@iobroker/js-controller-common-db';

/**
 * Custom interview during setup
 *
 * @param config the prefilled database config
 * @returns the database options obtained by the answered questionnaire
 */
export function interview(config: ioBroker.ObjectsDatabaseOptions): Promise<ioBroker.ObjectsDatabaseOptions> {
    return defaultRedisInterview<ioBroker.ObjectsDatabaseOptions>({ config, type: 'objects' });
}
