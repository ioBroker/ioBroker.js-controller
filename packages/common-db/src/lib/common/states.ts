'use strict';

import * as fs from 'fs-extra';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {tools} from '@iobroker/js-controller-common';

export function getStatesConstructor () {
    const config = fs.readJSONSync(tools.getConfigFileName());
    if (!config.states) {
        config.states = {type: 'file'};
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require(`@iobroker/db-states-${config.states.type}`).Client;
    } catch {
        console.error(`Installation broken or unknown states type: ${config.states.type} configured.`);
        process.exit(101);
    }
}
