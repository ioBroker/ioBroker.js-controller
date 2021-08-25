'use strict';

const fs = require('fs-extra');
const { getConfigFileName } = require('./tools');

const config = fs.readJSONSync(getConfigFileName());
if (!config.objects) {
    config.objects = {type: 'file'};
}

try {
    const path = require.resolve(`@iobroker/db-objects-${config.objects.type}`);
    module.exports = require(path).Client;
} catch {
    console.error(`Installation broken or unknown states type: ${config.objects.type} configured.`);
    process.exit(101);
}
