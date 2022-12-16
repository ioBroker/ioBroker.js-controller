import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const testAdapter = require('./lib/testAdapter');
const dataDir = path.join(__dirname, '..', 'tmp', 'data');

const statesConfig = {
    options: {
        auth_pass: null,
        retry_max_delay: 100,
        retry_max_count: 2
    },
    type: 'file',
    host: '127.0.0.1',
    port: 19000,
    user: '',
    pass: '',
    dataDir: dataDir
};

const objectsConfig = {
    options: {
        auth_pass: null,
        retry_max_delay: 100,
        retry_max_count: 2
    },
    dataDir: dataDir,
    type: 'file',
    host: '127.0.0.1',
    port: 19001,
    user: '',
    pass: '',
    noFileCache: true,
    connectTimeout: 2000
};

// states in files, objects in files
testAdapter({
    statesConfig,
    objectsConfig,
    name: 'Tests FILE'
});
