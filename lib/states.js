'use strict';

var getConfigFileName = require(__dirname + '/tools').getConfigFileName;
var config = JSON.parse(require('fs').readFileSync(getConfigFileName(), 'utf8'));
if (!config.states) config.states = {type: 'file'};

if (config.states.type === 'file') {
    module.exports = require(__dirname + '/states/statesInMemClient');
} else if (config.states.type === 'redis') {
    module.exports = require(__dirname + '/states/statesInRedis');
} else {
    throw 'Unknown objects type: ' + config.objects.type;
}