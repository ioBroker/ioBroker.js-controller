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
} catch {
    console.error(`Installation broken or unknown states type: ${config.states.type} configured.`);
    process.exit(101);
}
