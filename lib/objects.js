var getConfigFileName = require(__dirname + '/tools').getConfigFileName;
var config = JSON.parse(require('fs').readFileSync(getConfigFileName()));
if (!config.objects) config.objects = {type: 'file'};

if ((process.env.OBJECTS_TYPE || config.objects.type) === 'file') {
    module.exports = require(__dirname + '/objects/objectsInMemClient');
} else if ((process.env.OBJECTS_TYPE || config.objects.type) === 'redis') {
    module.exports = require(__dirname + '/objects/objectsInRedis');
} else if ((process.env.OBJECTS_TYPE || config.objects.type) === 'couch') {
    module.exports = require(__dirname + '/objects/objectsInCouch');
} else {
    throw 'Unknown objects type: ' + config.objects.type;
}