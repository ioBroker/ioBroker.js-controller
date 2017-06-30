/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

var testAdapter = require(__dirname + '/../lib/testAdapter');
var dataDir = __dirname + '/../../tmp/data-redis';

var statesConfig = {
    options : {
        auth_pass: null,
        retry_max_delay: 15000
    },
    type:           'redis',
    host:           '/var/run/redis.sock',
    port:           0
};

var objectsConfig = {
    dataDir:        dataDir,
    type:           'file',
    host:           '127.0.0.1',
    port:           19002,
    user:           '',
    pass:           '',
    noFileCache:    true,
    connectTimeout: 2000
};

// states in REDIS, objects in files
testAdapter({
    statesConfig:  statesConfig,
    objectsConfig: objectsConfig,
    name: 'Tests REDIS-Socket'
});
