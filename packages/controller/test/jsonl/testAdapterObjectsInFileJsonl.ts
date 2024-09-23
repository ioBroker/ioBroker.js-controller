import { expect } from 'chai';

import { startController, stopController } from '../lib/setup4controller.js';
import { register } from './../lib/testObjects.js';
import type { TestContext } from '../_Types.js';
import * as url from 'node:url';
// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

let objects = null;
let states = null;
const textName = 'Jsonl-File';

const context: TestContext = {
    // @ts-expect-error fix later
    objects: null,
    name: textName,
};

const objectsConfig = {
    options: {
        auth_pass: null,
        retry_max_delay: 100,
        retry_max_count: 2,
    },
    dataDir: `${thisDir}/../tmp/data`,
    type: 'jsonl',
    host: '127.0.0.1',
    port: 19001,
    user: '',
    pass: '',
    noFileCache: true,
    connectTimeout: 2000,
    onChange: (id: string, _obj: ioBroker.AnyObject) => {
        console.log(`object changed. ${id}`);
    },
};

describe(`${textName} Test Objects File-Redis`, function () {
    before(`${textName} Start js-controller`, async function () {
        this.timeout(23_000);

        const { objects: _objects, states: _states } = await startController({
            objects: objectsConfig,
            states: {
                dataDir: `${thisDir}/../tmp/data`,
                onChange: function (id: string, _state: ioBroker.State) {
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

    after(`${textName} Stop js-controller`, async function () {
        this.timeout(5_000);
        await stopController();
        await new Promise<void>(resolve => {
            setTimeout(() => resolve(), 2_000);
        });
    });
});
