import fs from 'node:fs';
import path from 'node:path';
import { expect } from 'chai';
import { startController, stopController } from '../lib/setup4controller.js';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type { Client as StateRedisClient } from '@iobroker/db-states-redis';
import * as url from 'node:url';
// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

const dataDir = path.join(thisDir, '..', '..', 'tmp', 'data');
let objects: ObjectsInRedisClient | null = null;
let states: StateRedisClient | null = null;
let onStatesChanged: ioBroker.StateChangeHandler | null = null;

function cleanDbs(): void {
    if (fs.existsSync(path.join(dataDir, 'objects.json'))) {
        fs.unlinkSync(path.join(dataDir, 'objects.json'));
    }
    if (fs.existsSync(path.join(dataDir, 'objects.json.bak'))) {
        fs.unlinkSync(path.join(dataDir, 'objects.json.bak'));
    }
    if (fs.existsSync(path.join(dataDir, 'states.json'))) {
        fs.unlinkSync(path.join(dataDir, 'states.json'));
    }
    if (fs.existsSync(path.join(dataDir, 'states.json.bak'))) {
        fs.unlinkSync(path.join(dataDir, 'states.json.bak'));
    }
}

describe('States-Redis-Socket: Test states', () => {
    before('States-Redis-Socket: Start js-controller', async function () {
        this.timeout(10_000);
        cleanDbs();

        const { objects: _objects, states: _states } = await startController({
            objects: {
                dataDir: dataDir,
                onChange: (id: string, _obj: ioBroker.AnyObject) => {
                    console.log(`object changed. ${id}`);
                },
            },
            states: {
                type: 'redis',
                host: '/var/run/redis.sock',
                port: 0,
                onChange: (id: string, state: ioBroker.State) => {
                    console.log(`Redis-state-Socket changed. ${id}`);
                    if (onStatesChanged) {
                        onStatesChanged(id, state);
                    }
                },
            },
        });

        objects = _objects;
        states = _states!;
        states.subscribe('*');
        expect(objects).to.be.ok;
        expect(states).to.be.ok;
        await new Promise<void>(resolve => {
            setTimeout(() => resolve(), 5_000);
        });
    });

    it('States-Redis-Socket: should setState', function (done) {
        this.timeout(10_000);

        const testID = 'testObject.0.test1';
        onStatesChanged = (id, _state) => {
            if (id === testID) {
                const state = _state!;
                expect(state).to.be.ok;
                expect(state.val).to.be.equal(1);
                expect(state.ack).to.be.false;
                expect(state.ts).to.be.ok;
                expect(state.q).to.be.equal(0);

                states!.getState(testID, (err, _state) => {
                    const state = _state!;
                    expect(err).to.be.not.ok;
                    expect(state).to.be.ok;
                    expect(state.val).to.be.equal(1);
                    expect(state.ack).to.be.false;
                    expect(state.ts).to.be.ok;
                    expect(state.q).to.be.equal(0);
                    done();
                });
            }
        };

        states!.setState(testID, 1, function (err) {
            expect(err).to.be.not.ok;
        });
    });

    after('States-Redis-Socket: Stop js-controller', async function () {
        this.timeout(5_000);
        await stopController();
    });
});
