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
        const path = require.resolve(`@iobroker/db-states-${config.states.type}`);
        return require(path).Client;
    } catch {
        console.error(`Installation broken or unknown states type: ${config.states.type} configured.`);
        process.exit(101);
    }
}
