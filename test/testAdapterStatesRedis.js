/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

const testAdapter = require(__dirname + '/lib/testAdapter');
const dataDir = __dirname + '/../tmp/data-redis';

const statesConfig = {
    options : {
        auth_pass: null,
        retry_max_delay: 100
    },
    type:           'redis',
    host:           '127.0.0.1',
    port:           6379
};
let  isExecute = require('fs').existsSync(__dirname  + '/../lib/objects/objectsInRedis.js');
if (!isExecute) {
    try {
        const path = require.resolve('iobroker.objects-redis');
        isExecute = !!path;
    } catch (e) { /* OK */ }
}
let objectsConfig;
if (isExecute) {
    objectsConfig = {
        dataDir:        __dirname + '/../tmp/data',
        options : {
            auth_pass: null,
            retry_max_delay: 100
        },
        redisNamespace: 'test',
        type:           'redis',
        host:           '127.0.0.1',
        port:           6379
    };
} else {
    objectsConfig = {
        dataDir:        dataDir,
        type:           'file',
        host:           '127.0.0.1',
        port:           19002,
        user:           '',
        pass:           '',
        noFileCache:    true,
        connectTimeout: 2000
    };
}

// states in REDIS, objects in files
testAdapter({
    statesConfig:  statesConfig,
    objectsConfig: objectsConfig,
    name: 'Tests REDIS'
});
