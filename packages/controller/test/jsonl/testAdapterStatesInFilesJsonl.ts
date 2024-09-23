import path from 'node:path';
import testAdapter from './../lib/testAdapter.js';
import * as url from 'node:url';
// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

const dataDir = path.join(thisDir, '..', 'tmp', 'data');

const statesConfig = {
    options: {
        auth_pass: null,
        retry_max_delay: 100,
        retry_max_count: 2,
    },
    type: 'jsonl',
    host: '127.0.0.1',
    port: 19000,
    user: '',
    pass: '',
    dataDir: dataDir,
};

const objectsConfig = {
    options: {
        auth_pass: null,
        retry_max_delay: 100,
        retry_max_count: 2,
    },
    dataDir: dataDir,
    type: 'jsonl',
    host: '127.0.0.1',
    port: 19001,
    user: '',
    pass: '',
    noFileCache: true,
    connectTimeout: 2000,
};
// states in files, objects in files
testAdapter({
    statesConfig: statesConfig,
    objectsConfig: objectsConfig,
    name: 'Tests Jsonl-File Redis',
});
