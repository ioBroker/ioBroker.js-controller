'use strict';

import * as fs from 'fs-extra';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {tools} from '@iobroker/js-controller-common';

export function getObjectsConstructor() {
    const config = fs.readJSONSync(tools.getConfigFileName());
    if (!config.objects) {
        config.objects = {type: 'file'};
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require(`@iobroker/db-objects-${config.objects.type}`).Client;
    } catch {
        console.error(`Installation broken or unknown objects type: ${config.objects.type} configured.`);
        process.exit(101);
    }
}
