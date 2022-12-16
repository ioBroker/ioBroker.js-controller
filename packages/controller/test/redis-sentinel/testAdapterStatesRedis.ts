// eslint-disable-next-line @typescript-eslint/no-var-requires
const testAdapter = require(__dirname + '/../lib/testAdapter');
const dataDir = __dirname + '/../../tmp/data-redis';
import fs from 'fs';

let isExecute = fs.existsSync(__dirname + '/../lib/objects/objectsInRedis.js');
if (!isExecute) {
    try {
        const path = require.resolve('iobroker.objects-redis');
        isExecute = !!path;
    } catch {
        /* OK */
    }
}

const statesConfig = {
    options: {
        auth_pass: null,
        retry_max_delay: 15000
    },
    type: 'redis',
    redisNamespace: 'testObjectsIo',
    host: ['127.0.0.1', '127.0.0.1', '127.0.0.1'],
    port: [26380, 26381, 26382]
};
let objectsConfig;

if (!fs.existsSync(__dirname + '/../tmp')) {
    fs.mkdirSync(__dirname + '/../tmp');
}

if (isExecute) {
    objectsConfig = {
        dataDir: __dirname + '/../tmp/data',
        options: {
            auth_pass: null,
            retry_max_delay: 15000
        },
        redisNamespace: 'testObjectsCfg',
        type: 'redis',
        host: ['127.0.0.1', '127.0.0.1', '127.0.0.1'],
        port: [26380, 26381, 26382]
    };
} else {
    objectsConfig = {
        dataDir: dataDir,
        type: 'file',
        host: '127.0.0.1',
        port: 19002,
        user: '',
        pass: '',
        noFileCache: true,
        connectTimeout: 2000
    };
}

// states in REDIS, objects in files
testAdapter({
    statesConfig: statesConfig,
    objectsConfig: objectsConfig,
    name: 'Tests Redis-Sentinel'
});
