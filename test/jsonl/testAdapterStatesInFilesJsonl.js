/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

const testAdapter = require('../lib/testAdapter');
const dataDir = __dirname + '/../tmp/data';

const statesConfig = {
    options : {
        auth_pass: null,
        retry_max_delay: 100,
        retry_max_count: 2
    },
    type:           'jsonl',
    host:           '127.0.0.1',
    port:           19000,
    user:           '',
    pass:           '',
    dataDir:        dataDir
};

const objectsConfig = {
    options : {
        auth_pass: null,
        retry_max_delay: 100,
        retry_max_count: 2
    },
    dataDir:        dataDir,
    type:           'jsonl',
    host:           '127.0.0.1',
    port:           19001,
    user:           '',
    pass:           '',
    noFileCache:    true,
    connectTimeout: 2000
};
// states in files, objects in files
testAdapter({
    statesConfig:  statesConfig,
    objectsConfig: objectsConfig,
    name: 'Tests Jsonl-File Redis'
});
