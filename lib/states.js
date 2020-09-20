'use strict';

const fs = require('fs-extra');
const { getConfigFileName } = require('./tools');

const config = fs.readJSONSync(getConfigFileName());
if (!config.states) {
    config.states = {type: 'file'};
}

try {
    const path = require.resolve(`@iobroker/db-states-${config.states.type}`);
    module.exports = require(path).Client;
} catch (e) {
    if (config.states.type !== 'file' && config.states.type !== 'redis') {
        throw new Error(`Unknown states type: ${config.states.type}`);
    }

    console.error(`States of type ${config.states.type} not found: ${e}`);
    process.exit(101);
}
