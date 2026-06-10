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

describe('States-Redis: Test states in Redis', function () {
    before('States-Redis: Start js-controller', async function () {
        this.timeout(10000);
        cleanDbs();

        const { objects: _objects, states: _states } = await startController({
            objects: {
                dataDir: dataDir,
                onChange: (id: string, _obj: ioBroker.AnyObject) => console.log(`object changed. ${id}`),
            },
            states: {
                type: 'redis',
                host: '127.0.0.1',
                port: 6379,
                onChange: (id: string, state: ioBroker.State) => {
                    console.log(`Redis-state changed. ${id}`);
                    if (onStatesChanged) {
                        onStatesChanged(id, state);
                    }
                },
            },
        });

        objects = _objects;
        states = _states;
        states!.subscribe('*');
        assert.ok(objects);
        assert.ok(states);
        await new Promise<void>(resolve => {
            setTimeout(() => resolve(), 5_000);
        });
    });

    it('States-Redis: should setState', done => {
        const testID = 'testObject.0.test1';
        onStatesChanged = (id, state) => {
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

        states!.setState(testID, 1, err => {
            assert.ok(!err);
        });
    }).timeout(10000);

    it('States-Redis: should setState async', done => {
        const testID = 'testObject.0.test1';
        onStatesChanged = async (id, state) => {
            if (id === testID) {
                assert.ok(state);
                assert.strictEqual(state.val, 2);
                assert.strictEqual(state.ack, false);
                assert.ok(state.ts);
                assert.strictEqual(state.lc, state.ts);
                assert.strictEqual(state.q, 0);

                // @ts-expect-error adding types later on
                state = await states!.getStateAsync(testID);
                assert.ok(state);
                assert.strictEqual(state.val, 2);
                assert.strictEqual(state.ack, false);
                assert.ok(state.ts);
                assert.strictEqual(state.lc, state.ts);
                assert.strictEqual(state.q, 0);
                done();
            }
        };

        states!.setState(testID, 2);
    }).timeout(10_000);

    it('States-Redis: should setState with object state parameters', done => {
        const testID = 'testObject.0.test1';
        onStatesChanged = async (id, state) => {
            if (id === testID) {
                assert.ok(state);
                assert.strictEqual(state.val, 3);
                assert.strictEqual(state.ack, true);
                assert.strictEqual(state.ts, 123456000);
                assert.strictEqual(state.lc, state.ts);
                assert.strictEqual(state.q, 1);

                // @ts-expect-error adding types later on
                state = await states!.getStateAsync(testID);
                assert.ok(state);
                assert.strictEqual(state.val, 3);
                assert.strictEqual(state.ack, true);
                assert.strictEqual(state.ts, 123456000);
                assert.strictEqual(state.lc, state.ts);
                assert.strictEqual(state.q, 1);
                done();
            }
        };

        states!.setState(testID, { val: 3, ack: true, ts: 123456, q: 1 });
    }).timeout(10_000);

    it('States-Redis: should setState with object state parameters ignoring null ts', done => {
        const testID = 'testObject.0.test1';
        onStatesChanged = async (id, state) => {
            if (id === testID) {
                assert.ok(state);
                assert.strictEqual(state.val, 4);
                assert.strictEqual(state.ack, true);
                assert.ok(state.ts);
                assert.notStrictEqual(state.ts, 123456000);
                assert.strictEqual(state.lc, state.ts);
                assert.strictEqual(state.q, 1);

                // @ts-expect-error adding types later on
                state = await states!.getStateAsync(testID);
                assert.ok(state);
                assert.strictEqual(state.val, 4);
                assert.strictEqual(state.ack, true);
                assert.ok(state.ts);
                assert.notStrictEqual(state.ts, 123456000);
                assert.strictEqual(state.lc, state.ts);
                assert.strictEqual(state.q, 1);
                done();
            }
        };

        // @ts-expect-error ignore types here for ts to test the case
        states!.setState(testID, { val: 4, ack: true, ts: null, q: 1 });
    }).timeout(10_000);

    it('States-Redis: should setState with expire (setex + publish in one MULTI)', done => {
        // setState writes the value and publishes the change in a single MULTI.
        // The expire branch uses SETEX, so this verifies that branch end-to-end:
        // the value is stored with a TTL AND the publish still delivers the event.
        const testID = 'testObject.0.testExpire';
        onStatesChanged = (id, state) => {
            if (id === testID && state && state.val === 5) {
                onStatesChanged = null; // do not react to the later expiry event
                // PUBLISH inside the MULTI delivered the change event
                assert.strictEqual(state.ack, true);

                // SETEX inside the MULTI stored the value...
                states!.getState(testID, (err, storedState) => {
                    assert.ok(!err);
                    assert.ok(storedState);
                    assert.strictEqual(storedState!.val, 5);

                    // ...with a TTL, so it must be gone after the expire window
                    setTimeout(() => {
                        states!.getState(testID, (err, expiredState) => {
                            assert.ok(!err);
                            assert.strictEqual(expiredState, null);
                            done();
                        });
                    }, 1_500);
                });
            }
        };

        states!.setState(testID, { val: 5, ack: true, expire: 1 }, err => {
            assert.ok(!err);
        });
    }).timeout(10_000);

    it('States-Redis: should keep lc on unchanged value and bump it on change', done => {
        // The MULTI write is preceded by a GET to compute "lc" (last change).
        // This guards that read-modify-write logic: lc stays stable when the value
        // is identical and is bumped only when the value actually changes.
        onStatesChanged = null;
        const testID = 'testObject.0.testLc';
        states!.setState(testID, { val: 10, ack: true }, () => {
            states!.getState(testID, (err, first) => {
                assert.ok(!err);
                assert.ok(first);
                const firstLc = first!.lc;
                setTimeout(() => {
                    // identical value -> lc must stay, ts must advance
                    states!.setState(testID, { val: 10, ack: true }, () => {
                        states!.getState(testID, (err, second) => {
                            assert.ok(!err);
                            assert.ok(second);
                            assert.strictEqual(second!.lc, firstLc, 'lc must not change for identical value');
                            assert.ok(second!.ts >= first!.ts, 'ts must advance');
                            setTimeout(() => {
                                // changed value -> lc must be bumped
                                states!.setState(testID, { val: 20, ack: true }, () => {
                                    states!.getState(testID, (err, third) => {
                                        assert.ok(!err);
                                        assert.ok(third);
                                        assert.notStrictEqual(third!.lc, firstLc, 'lc must change when value changes');
                                        done();
                                    });
                                });
                            }, 5);
                        });
                    });
                }, 5);
            });
        });
    }).timeout(10_000);

    // todo: write more tests

    after('States-Redis: Stop js-controller', async function () {
        this.timeout(5_000);
        await stopController();
        await new Promise<void>(resolve => {
            setTimeout(() => resolve(), 2_000);
        });
    });
});
