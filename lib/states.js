'use strict';

const fs = require('fs-extra');
const { getConfigFileName } = require('./tools');

const config = fs.readJSONSync(getConfigFileName());
if (!config.states) {
    config.states = {type: 'file'};
}

if (config.states.type === 'file' || config.states.type === 'redis') {
    module.exports = require('./states/statesInRedis');
} else {
    throw new Error(`Unknown objects type: ${config.objects.type}`);
}