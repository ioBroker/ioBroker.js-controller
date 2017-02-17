/* jshint -W097 */// jshint strict:false
/*jslint node: true */
/*jshint expr: true*/
'use strict';

var testAdapter = require(__dirname + '/lib/testAdapter');
var dataDir = __dirname + '/../tmp/data';

var statesConfig = {
    options : {
        auth_pass: null,
        retry_max_delay: 15000
    },
    type:           'file',
    host:           '127.0.0.1',
    port:           19000,
    user:           '',
    pass:           '',
    dataDir:        dataDir
};

var objectsConfig = {
    dataDir:        dataDir,
    type:           'file',
    host:           '127.0.0.1',
    port:           19001,
    user:           '',
    pass:           '',
    noFileCache:    true,
    connectTimeout: 2000
};

process.env.STATES_TYPE = 'file';

// states in files, objects in files
testAdapter({
    statesConfig:  statesConfig,
    objectsConfig: objectsConfig,
    name: 'Tests FILE'
});
