import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common';

export async function getObjectsConstructor(): Promise<any> {
    const config = fs.readJSONSync(tools.getConfigFileName());
    if (!config.objects) {
        config.objects = { type: 'jsonl' };
    }

    try {
        const Client = (await import(`@iobroker/db-objects-${config.objects.type}`)).Client;
        return Client;
    } catch (e) {
        console.error(e.stack);
        console.error(`Installation broken or unknown objects type: ${config.objects.type} configured`);
        process.exit(101);
    }
}
