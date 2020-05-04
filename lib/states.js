'use strict';

const getConfigFileName = require('./tools').getConfigFileName;
const config = JSON.parse(require('fs').readFileSync(getConfigFileName(), 'utf8'));
if (!config.states) {
    config.states = {type: 'file'};
}

if (config.states.type === 'file' || config.states.type === 'redis') {
    module.exports = require('./states/statesInRedis');
} else {
    throw new Error(`Unknown objects type: ${config.objects.type}`);
}