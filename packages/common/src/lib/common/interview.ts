import rl from 'readline-sync';
import fs from 'fs-extra';

/** Regex to limit inputs to yes/no shortcuts */
const YES_NO_REGEX = /^[YyNn]?$/;

type SharedDatabaseOptions = Partial<ioBroker.ObjectsDatabaseOptions> & Partial<ioBroker.StatesDatabaseOptions>;

/**
 * The default redis interview shared between objects and states
 *
 * @param type database type
 */
export async function defaultRedisInterview(type: 'objects' | 'states'): Promise<SharedDatabaseOptions> {
    const config: Partial<SharedDatabaseOptions> = {};

    let answer = rl.question(`Dou you use a TLS connection for your "${type}" redis-server? [y/N]:`, {
        limit: YES_NO_REGEX,
        defaultInput: 'N'
    });

    if (answer.toLowerCase() === 'n') {
        return config;
    }

    config.tls = {};

    answer = rl.question(`Dou you use a self-signed certificate for your "${type}" redis-server? [y/N]:`, {
        limit: YES_NO_REGEX,
        defaultInput: 'N'
    });

    if (answer.toLowerCase() === 'y') {
        config.tls.rejectUnauthorized = false;
    }

    answer = rl.question(`Please specify the path to your "${type}" redis-server "certificate" file:`);

    try {
        const certContent = await fs.readFile(answer, { encoding: 'utf8' });
        config.tls.cert = certContent;
    } catch (e) {
        console.warn(`Could not read the "certificate" file, cert will be left empty: ${e.message}`);
    }

    answer = rl.question(`Please specify the path to your "${type}" redis-server "key" file:`);

    try {
        const keyContent = await fs.readFile(answer, { encoding: 'utf8' });
        config.tls.key = keyContent;
    } catch (e) {
        console.warn(`Could not read the "key" file, cert will be left empty: ${e.message}`);
    }

    answer = rl.question(`Please specify the path to your "${type}" redis-server "CA" file:`);

    try {
        const caContent = await fs.readFile(answer, { encoding: 'utf8' });
        config.tls.ca = caContent;
    } catch (e) {
        console.warn(`Could not read the "CA" file, cert will be left empty: ${e.message}`);
    }

    return config;
}
