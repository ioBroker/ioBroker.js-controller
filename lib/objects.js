'use strict';

var getConfigFileName = require(__dirname + '/tools').getConfigFileName;
var config = JSON.parse(require('fs').readFileSync(getConfigFileName(), 'utf8'));
if (!config.objects) config.objects = {type: 'file'};

if (config.objects.type === 'file') {
    module.exports = require(__dirname + '/objects/objectsInMemClient');
} else if (config.objects.type === 'redis') {
    module.exports = require(__dirname + '/objects/objectsInRedis');
} else {
    throw 'Unknown objects type: ' + config.objects.type;
}