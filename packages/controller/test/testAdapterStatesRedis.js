/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';
const testAdapter = require('./lib/testAdapter');
// const dataDir = __dirname + '/../tmp/data-redis';

const statesConfig = {
    options: {
        auth_pass: null,
        retry_max_delay: 100,
        retry_max_count: 2
    },
    type: 'redis',
    host: '127.0.0.1',
    port: 6379
};

const objectsConfig = {
    dataDir: __dirname + '/../tmp/data',
    options: {
        auth_pass: null,
        retry_max_delay: 100
    },
    redisNamespace: 'test',
    type: 'redis',
    host: '127.0.0.1',
    port: 6379
};

// states in REDIS, objects in files
testAdapter({
    statesConfig,
    objectsConfig,
    name: 'Tests REDIS'
});
