import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { exec } from 'child_process';
import type { ObjectsInRedisClient } from '@iobroker/db-objects-redis/build/lib/objects/objectsInRedisClient';
import type { StateRedisClient } from '@iobroker/db-states-redis/build/lib/states/statesInRedisClient';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const setup = require(path.join(__dirname, '..', 'lib', 'setup4controller'));
const dataDir = path.join(__dirname, '..', '..', 'tmp', 'data');
let objects: ObjectsInRedisClient | null = null;
let states: StateRedisClient | null = null;
let onStatesChanged: ioBroker.StateChangeHandler | null = null;

function cleanDbs() {
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

describe('States-Redis-Sentinel: Test states', function () {
    before('States-Redis-Sentinel: Start js-controller', async function () {
        this.timeout(10000);
        cleanDbs();

        const { objects: _objects, states: _states } = await setup.startController({
            objects: {
                dataDir: dataDir,
                onChange: (id: string, _obj: ioBroker.AnyObject) => {
                    console.log('object changed. ' + id);
                }
            },
            states: {
                type: 'redis',
                host: ['127.0.0.1', '127.0.0.1', '127.0.0.1'],
                port: [26380, 26381, 26382],
                onChange: (id: string, state: ioBroker.State) => {
                    console.log('Redis-state-Sentinel changed. ' + id);
                    if (onStatesChanged) {
                        onStatesChanged(id, state);
                    }
                }
            }
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

    it('States-Redis-Sentinel: should setState', function (done) {
        this.timeout(10000);

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

        states!.setState(testID, 1, function (err) {
            expect(err).to.be.not.ok;
        });
    });

    it('States-Redis-Sentinel: should setState with failover', function (done) {
        this.timeout(60000);

        let sendCounter = 1;
        let receiveCounter = 0;
        const testID = 'testObject.0.test1';
        onStatesChanged = (id, state) => {
            if (id === testID) {
                console.log('Receive state value: ' + state!.val);
                expect(state).to.be.ok;
                if (state!.val !== sendCounter - 1) {
                    // timing special case for failover ... sometimes we loose some resubmits
                    // we need to accept that for now
                    expect(state!.val).to.be.equal(receiveCounter + 1);
                }
                receiveCounter++;
                expect(state!.ack).to.be.false;
                expect(state!.ts).to.be.ok;
                expect(state!.q).to.be.equal(0);

                states!.getState(testID, (err, state) => {
                    expect(err).to.be.not.ok;
                    expect(state).to.be.ok;
                    expect(state!.val).to.be.equal(sendCounter - 1);
                    expect(state!.ack).to.be.false;
                    expect(state!.ts).to.be.ok;
                    expect(state!.q).to.be.equal(0);
                    console.log('Get state: ' + state!.val);

                    if (receiveCounter === 30) {
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        clearInterval(stateInterval);
                        done();
                    }
                });

                if (receiveCounter === 10) {
                    console.log('Kill master Redis ... failover should happen');
                    exec('redis-cli -p 6380 SHUTDOWN', (err, stdout, _stderr) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(stdout);
                    });
                }
            }
        };

        const stateInterval = setInterval(() => {
            console.log('Set state: ' + sendCounter);
            states!.setState(testID, sendCounter++, function (err) {
                expect(err).to.be.not.ok;
            });
        }, 1000);
    });

    after('States-Redis-Sentinel: Stop js-controller', async function () {
        this.timeout(5000);
        await setup.stopController();
    });
});
