import { readJSONSync } from 'fs-extra/esm';
import { tools } from '@iobroker/js-controller-common';

export async function getStatesConstructor(): Promise<any> {
    const config = readJSONSync(tools.getConfigFileName());
    if (!config.states) {
        config.states = { type: 'jsonl' };
    }

    try {
        const Client = (await import(`@iobroker/db-states-${config.states.type}`)).Client;
        return Client;
    } catch (e) {
        console.error(e.stack);
        console.error(`Installation broken or unknown states type: ${config.states.type} configured.`);
        process.exit(101);
    }
}
