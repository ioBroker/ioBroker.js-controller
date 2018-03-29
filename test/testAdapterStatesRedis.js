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
        retry_max_delay: 15000
    },
    type:           'redis',
    host:           '127.0.0.1',
    port:           6379
};

const objectsConfig = {
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
    name: 'Tests REDIS'
});
