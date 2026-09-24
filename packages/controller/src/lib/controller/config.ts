import fs from 'fs-extra';
import { EXIT_CODES, logger as toolsLogger, tools } from '@iobroker/js-controller-common';

/**
 * Get the config directly from fs - never cached
 *
 * If no config file exists, the process is terminated, because the controller cannot run without it.
 */
export function getConfig(): ioBroker.IoBrokerJson | never {
    const configFile = tools.getConfigFileName();

    if (!fs.existsSync(configFile)) {
        const hostLogPrefix = `host.${tools.getHostName()}`;
        // if started as daemon, we have to log into the file
        const isDaemon = process.argv.includes('start');
        const logger = isDaemon ? toolsLogger('info', [tools.appName], true) : toolsLogger('info', [tools.appName]);

        logger.error(
            `${hostLogPrefix} conf/${tools.appName.toLowerCase()}.json missing - call node ${tools.appName.toLowerCase()}.js setup`,
        );
        process.exit(EXIT_CODES.MISSING_CONFIG_JSON);
    }

    // TODO: adjust return type as soon as #2120 merged and we have the type
    const config = fs.readJSONSync(configFile);

    if (!config.states) {
        config.states = { type: 'jsonl' };
    }
    if (!config.objects) {
        config.objects = { type: 'jsonl' };
    }
    if (!config.system) {
        config.system = {};
    }

    return config;
}
