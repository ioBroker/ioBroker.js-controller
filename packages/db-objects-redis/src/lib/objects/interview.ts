import rl from 'readline-sync';

/** Regex to limit inputs to yes/no shortcuts */
const YES_NO_REGEX = /^[YyNn]?$/;

/**
 * Custom interview during setup
 */
export function interview(): Partial<ioBroker.ObjectsDatabaseOptions> {
    const config: Partial<ioBroker.ObjectsDatabaseOptions> = {};

    let answer = rl.question('Dou you use a TLS connection for your redis-server? [y/N]:', {
        limit: YES_NO_REGEX,
        defaultInput: 'N'
    });

    if (answer.toLowerCase() === 'n') {
        return config;
    }

    config.tls = {};

    // TODO: ask self signed
    answer = rl.question('Dou you use a self-signed certificate? [y/N]:', {
        limit: YES_NO_REGEX,
        defaultInput: 'N'
    });

    if (answer.toLowerCase() === 'y') {
        config = {};
    }

    // TODO: ask cert file
    // TODO: ask key file
    // TODO: ask ca file

    return config;
}
