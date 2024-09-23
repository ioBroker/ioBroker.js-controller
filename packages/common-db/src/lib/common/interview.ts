import rl from 'readline-sync';
import fs from 'fs-extra';

/** Regex to limit inputs to yes/no shortcuts */
const YES_NO_REGEX = /^[YyNn]?$/;

type SharedDatabaseOptions = ioBroker.ObjectsDatabaseOptions | ioBroker.StatesDatabaseOptions;

interface DefaultRedisInterviewOptions<TConfig extends SharedDatabaseOptions> {
    /** Database type */
    type: 'objects' | 'states';
    /** Prefilled config */
    config: TConfig;
}

/**
 * The default redis interview shared between objects and states
 *
 * @param options config and type information
 */
export async function defaultRedisInterview<TConfig extends SharedDatabaseOptions>(
    options: DefaultRedisInterviewOptions<TConfig>,
): Promise<TConfig> {
    const { type, config } = options;

    let answer = rl.question(`Do you use a TLS connection for your "${type}" redis-server? [y/N]:`, {
        limit: YES_NO_REGEX,
        defaultInput: 'N',
    });

    if (answer.toLowerCase() === 'n') {
        return config;
    }

    config.options.tls = {};

    answer = rl.question(`Do you use a self-signed certificate for your "${type}" redis-server? [y/N]:`, {
        limit: YES_NO_REGEX,
        defaultInput: 'N',
    });

    if (answer.toLowerCase() === 'y') {
        config.options.tls.rejectUnauthorized = false;
    }

    do {
        answer = rl.question(`Please specify the path to your "${type}" redis-server "certificate" file:`);

        try {
            const certContent = await fs.readFile(answer, { encoding: 'utf8' });
            config.options.tls.cert = certContent;
        } catch (e) {
            console.warn(`Could not read the "certificate" file: ${e.message}`);
        }
    } while (!config.options.tls.cert);

    do {
        answer = rl.question(`Please specify the path to your "${type}" redis-server "key" file:`);

        try {
            const keyContent = await fs.readFile(answer, { encoding: 'utf8' });
            config.options.tls.key = keyContent;
        } catch (e) {
            console.warn(`Could not read the "key" file: ${e.message}`);
        }
    } while (!config.options.tls.key);

    do {
        answer = rl.question(`Please specify the path to your "${type}" redis-server "CA" file:`);

        try {
            const caContent = await fs.readFile(answer, { encoding: 'utf8' });
            config.options.tls.ca = caContent;
        } catch (e) {
            console.warn(`Could not read the "CA" file: ${e.message}`);
        }
    } while (!config.options.tls.ca);

    return config;
}
