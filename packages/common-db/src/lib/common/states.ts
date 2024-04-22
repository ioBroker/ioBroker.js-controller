import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common';
import type { Client as StatesClient } from '@iobroker/db-states-redis';

export async function getStatesConstructor(): Promise<typeof StatesClient> {
    const config = fs.readJSONSync(tools.getConfigFileName());
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
