'use strict';

const fs = require('fs-extra');
const { getConfigFileName } = require('./tools');

const config = fs.readJSONSync(getConfigFileName());
if (!config.objects) {
    config.objects = {type: 'file'};
}

if (config.objects.type === 'file' || config.objects.type === 'redis') {
    try {
        const path = require.resolve('./objects/objectsInRedis');
        module.exports = require(path);
    } catch (e) {
        try {
            module.exports = require('iobroker.objects-redis');
        } catch (e) {
            console.error('No objects found!');
            process.exit(101);
        }
    }
} else {
    throw new Error(`Unknown objects type: ${config.objects.type}`);
}