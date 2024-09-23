import testAdapter from './../lib/testAdapter.js';
import fs from 'node:fs';

import * as url from 'node:url';
// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

const dataDir = `${thisDir}/../../tmp/data-redis`;

const statesConfig = {
    options: {
        auth_pass: null,
        retry_max_delay: 15000,
    },
    type: 'redis',
    redisNamespace: 'testObjectsIo',
    host: ['127.0.0.1', '127.0.0.1', '127.0.0.1'],
    port: [26380, 26381, 26382],
};

if (!fs.existsSync(`${thisDir}/../tmp`)) {
    fs.mkdirSync(`${thisDir}/../tmp`);
}

const objectsConfig = {
    dataDir: dataDir,
    type: 'file',
    host: '127.0.0.1',
    port: 19002,
    user: '',
    pass: '',
    noFileCache: true,
    connectTimeout: 2000,
};

// states in REDIS, objects in files
testAdapter({
    statesConfig: statesConfig,
    objectsConfig: objectsConfig,
    name: 'Tests Redis-Sentinel',
});
