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
} catch (e) {
    if (config.objects.type !== 'file' && config.objects.type !== 'redis') {
        throw new Error(`Unknown objects type: ${config.objects.type}`);
    }

    console.error(`Object of type ${config.objects.type} not found: ${e.stack}`);
    process.exit(101);
}

