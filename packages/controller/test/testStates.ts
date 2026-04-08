import assert from 'node:assert/strict';

import { startController, stopController } from './lib/setup4controller.js';
import fs from 'node:fs';
import path from 'node:path';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type { Client as StateRedisClient } from '@iobroker/db-states-redis';
let objects: ObjectsInRedisClient | null = null;
let states: StateRedisClient | null = null;
let onStatesChanged: ioBroker.StateChangeHandler | null = null;
import * as url from 'node:url';
// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));
const dataDir = path.join(thisDir, '..', 'tmp', 'data');

function cleanDbs(): void {
    if (fs.existsSync(`${dataDir}/objects.json`)) {
        fs.unlinkSync(`${dataDir}/objects.json`);
    }
    if (fs.existsSync(`${dataDir}/objects.json.bak`)) {
        fs.unlinkSync(`${dataDir}/objects.json.bak`);
    }
    if (fs.existsSync(`${dataDir}/states.json`)) {
        fs.unlinkSync(`${dataDir}/states.json`);
    }
    if (fs.existsSync(`${dataDir}/states.json.bak`)) {
        fs.unlinkSync(`${dataDir}/states.json.bak`);
    }
}

describe('States: Test states in File-Redis', function () {
    before('States: Start js-controller', async function () {
        this.timeout(3_000);
        cleanDbs();

        const { objects: _objects, states: _states } = await startController({
            objects: {
                dataDir: dataDir,
                onChange: (id: string, _obj: ioBroker.AnyObject) => console.log(`object changed. ${id}`),
            },
            states: {
                dataDir: dataDir,
                onChange: (id: string, state: ioBroker.State) => {
                    console.log(`state changed. ${id}`);
                    onStatesChanged && onStatesChanged(id, state);
                },
            },
        });

        objects = _objects;
        states = _states;
        states!.subscribe('*');
        assert.ok(objects);
        assert.ok(states);
    });

    it('States: should setState', function (done) {
        const testID = 'testObject.0.test1';
        onStatesChanged = function (id, state) {
            if (id === testID) {
                assert.ok(state);
                assert.strictEqual(state.val, 1);
                assert.strictEqual(state.ack, false);
                assert.ok(state.ts);
                assert.strictEqual(state.q, 0);

                states!.getState(testID, (err, state) => {
                    assert.ok(!err);
                    assert.ok(state);
                    assert.strictEqual(state.val, 1);
                    assert.strictEqual(state.ack, false);
                    assert.ok(state.ts);
                    assert.strictEqual(state.q, 0);
                    done();
                });
            }
        };

        states!.setState(testID, 1, err => assert.ok(!err));
    });

    it('States: should setState async', done => {
        const testID = 'testObject.0.test1';
        onStatesChanged = async (id, state) => {
            if (id === testID) {
                assert.ok(state);
                assert.strictEqual(state.val, 2);
                assert.strictEqual(state.ack, false);
                assert.ok(state.ts);
                assert.strictEqual(state.q, 0);

                // @ts-expect-error adding types alter on
                state = await states!.getStateAsync(testID);
                assert.ok(state);
                assert.strictEqual(state.val, 2);
                assert.strictEqual(state.ack, false);
                assert.ok(state.ts);
                assert.strictEqual(state.q, 0);
                done();
            }
        };

        states!.setStateAsync(testID, 2);
    });

    after('States: Stop js-controller', async function () {
        this.timeout(5_000);
        await stopController();
        await new Promise<void>(resolve => {
            setTimeout(() => resolve(), 2_000);
        });
    });
});
