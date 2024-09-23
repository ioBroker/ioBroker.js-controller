import { expect } from 'chai';
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
        expect(objects).to.be.ok;
        expect(states).to.be.ok;
        await new Promise<void>(resolve => {
            setTimeout(() => resolve(), 5_000);
        });
    });

    it('States-Redis: should setState', done => {
        const testID = 'testObject.0.test1';
        onStatesChanged = (id, state) => {
            if (id === testID) {
                expect(state).to.be.ok;
                expect(state!.val).to.be.equal(1);
                expect(state!.ack).to.be.false;
                expect(state!.ts).to.be.ok;
                expect(state!.q).to.be.equal(0);

                states!.getState(testID, (err, state) => {
                    expect(err).to.be.not.ok;
                    expect(state).to.be.ok;
                    expect(state!.val).to.be.equal(1);
                    expect(state!.ack).to.be.false;
                    expect(state!.ts).to.be.ok;
                    expect(state!.q).to.be.equal(0);
                    done();
                });
            }
        };

        states!.setState(testID, 1, err => {
            expect(err).to.be.not.ok;
        });
    }).timeout(10000);

    it('States-Redis: should setState async', done => {
        const testID = 'testObject.0.test1';
        onStatesChanged = async (id, state) => {
            if (id === testID) {
                expect(state).to.be.ok;
                expect(state!.val).to.be.equal(2);
                expect(state!.ack).to.be.false;
                expect(state!.ts).to.be.ok;
                expect(state!.q).to.be.equal(0);

                // @ts-expect-error adding types later on
                state = await states!.getStateAsync(testID);
                expect(state).to.be.ok;
                expect(state!.val).to.be.equal(2);
                expect(state!.ack).to.be.false;
                expect(state!.ts).to.be.ok;
                expect(state!.q).to.be.equal(0);
                done();
            }
        };

        states!.setState(testID, 2);
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
