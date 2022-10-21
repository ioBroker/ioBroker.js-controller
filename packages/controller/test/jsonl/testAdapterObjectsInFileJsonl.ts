import { expect } from 'chai';

import { startController, stopController } from '../lib/setup4controller';
import type { ObjectsInRedisClient } from '@iobroker/db-objects-redis/build/lib/objects/objectsInRedisClient';

let objects = null;
let states = null;
const textName = 'Jsonl-File';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tests = require('../lib/testObjects');

interface Context {
    objects: ObjectsInRedisClient | null;
    name: string;
}

const context: Context = {
    objects: null,
    name: textName
};

const objectsConfig = {
    options: {
        auth_pass: null,
        retry_max_delay: 100,
        retry_max_count: 2
    },
    dataDir: __dirname + '/../tmp/data',
    type: 'jsonl',
    host: '127.0.0.1',
    port: 19001,
    user: '',
    pass: '',
    noFileCache: true,
    connectTimeout: 2000,
    onChange: (id: string, _obj: ioBroker.AnyObject) => {
        console.log('object changed. ' + id);
    }
};

describe(textName + ' Test Objects File-Redis', function () {
    before(textName + ' Start js-controller', async function () {
        this.timeout(3000);

        const { objects: _objects, states: _states } = await startController({
            objects: objectsConfig,
            states: {
                dataDir: `${__dirname}/../tmp/data`,
                onChange: function (id: string, _state: ioBroker.State) {
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

    after(textName + ' Stop js-controller', async function () {
        this.timeout(5_000);
        await stopController();
        await new Promise<void>(resolve => {
            setTimeout(() => resolve(), 2_000);
        });
    });
});
