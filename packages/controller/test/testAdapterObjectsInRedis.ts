import { expect } from 'chai';
import { startController, stopController } from './lib/setup4controller';
let objects = null;
let states = null;
const textName = 'Redis ';

import fs from 'fs';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tests = require('./lib/testObjects');

interface Context {
    objects: ObjectsInRedisClient | null;
    name: string;
}
const context: Context = {
    objects: null,
    name: textName
};
if (!fs.existsSync(__dirname + '/../tmp')) {
    fs.mkdirSync(__dirname + '/../tmp');
}

const objectsConfig = {
    dataDir: __dirname + '/../tmp/data',
    type: 'redis',
    host: '127.0.0.1',
    port: 6379,
    user: '',
    pass: '',
    redisNamespace: 'testOnlyObjects',
    noFileCache: true,
    connectTimeout: 2000,
    onChange: (id: string, _obj: ioBroker.AnyObject) => {
        console.log(`object changed. ${id}`);
    }
};

describe(textName + 'Test Objects Redis', function () {
    before(textName + 'Start js-controller', async function () {
        this.timeout(23_000);

        const { objects: _objects, states: _states } = await startController({
            objects: objectsConfig,
            states: {
                dataDir: __dirname + '/../tmp/data',
                onChange: (id: string, _state: ioBroker.State) => {
                    console.log('state changed. ' + id);
                }
            }
        });

        objects = _objects;
        states = _states;
        context.objects = _objects;
        expect(objects).to.be.ok;
        expect(states).to.be.ok;
    });

    tests.register(it, expect, context);

    after(textName + 'Stop js-controller', async function () {
        this.timeout(5_000);
        await stopController();
        await new Promise<void>(resolve => {
            setTimeout(() => resolve(), 2_000);
        });
    });
});
