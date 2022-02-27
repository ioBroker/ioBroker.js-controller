'use strict';

import * as fs from 'fs-extra';
// @ts-expect-error no typings yet
import { tools } from '@iobroker/js-controller-common';

export function getObjectsConstructor(): any {
    const config = fs.readJSONSync(tools.getConfigFileName());
    if (!config.objects) {
        config.objects = { type: 'jsonl' };
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require(`@iobroker/db-objects-${config.objects.type}`).Client;
    } catch {
        console.error(`Installation broken or unknown objects type: ${config.objects.type} configured.`);
        process.exit(101);
    }
}
