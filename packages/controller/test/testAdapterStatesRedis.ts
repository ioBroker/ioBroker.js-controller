import testAdapter from './lib/testAdapter.js';
import * as url from 'node:url';
// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

const statesConfig = {
    options: {
        auth_pass: null,
        retry_max_delay: 100,
        retry_max_count: 2,
    },
    type: 'redis',
    host: '127.0.0.1',
    port: 6379,
};

const objectsConfig = {
    dataDir: `${thisDir}/../tmp/data`,
    options: {
        auth_pass: null,
        retry_max_delay: 100,
    },
    redisNamespace: 'test',
    type: 'redis',
    host: '127.0.0.1',
    port: 6379,
};

// states in REDIS, objects in files
testAdapter({
    statesConfig,
    objectsConfig,
    name: 'Tests REDIS',
});
