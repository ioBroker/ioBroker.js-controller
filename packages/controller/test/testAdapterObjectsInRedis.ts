import { expect } from 'chai';
import { startController, stopController } from './lib/setup4controller.js';
let objects = null;
let states = null;
const textName = 'Redis ';

import fs from 'node:fs';
import { register } from './lib/testObjects.js';

import * as url from 'node:url';
import type { TestContext } from './_Types.js';
// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

const context: TestContext = {
    // @ts-expect-error will be filled in time
    objects: null,
    name: textName,
};
if (!fs.existsSync(`${thisDir}/../tmp`)) {
    fs.mkdirSync(`${thisDir}/../tmp`);
}

const objectsConfig = {
    dataDir: `${thisDir}/../tmp/data`,
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
    },
};

describe(`${textName}Test Objects Redis`, function () {
    before(`${textName}Start js-controller`, async function () {
        this.timeout(23_000);

        const { objects: _objects, states: _states } = await startController({
            objects: objectsConfig,
            states: {
                dataDir: `${thisDir}/../tmp/data`,
                onChange: (id: string, _state: ioBroker.State) => {
                    console.log(`state changed. ${id}`);
                },
            },
        });

        objects = _objects;
        states = _states;
        // @ts-expect-error fix later
        context.objects = _objects;
        expect(objects).to.be.ok;
        expect(states).to.be.ok;
    });

    register(it, expect, context);

    after(`${textName}Stop js-controller`, async function () {
        this.timeout(5_000);
        await stopController();
        await new Promise<void>(resolve => {
            setTimeout(() => resolve(), 2_000);
        });
    });
});
