'use strict';

const getConfigFileName = require(__dirname + '/tools').getConfigFileName;
const config = JSON.parse(require('fs').readFileSync(getConfigFileName(), 'utf8'));
if (!config.objects) config.objects = {type: 'file'};

if (config.objects.type === 'file') {
    module.exports = require('./objects/objectsInMemClient');
} else if (config.objects.type === 'redis') {
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
    throw 'Unknown objects type: ' + config.objects.type;
}