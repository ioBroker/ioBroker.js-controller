/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

const expect  = require('chai').expect;
const setup   = require(__dirname + '/../lib/setup4controller');
const fs      = require('fs');
const { exec } = require('child_process');
const dataDir = __dirname + '/../../tmp/data';
let objects     = null;
let states      = null;
let onStatesChanged = null;

function cleanDbs() {
    if (fs.existsSync(dataDir + '/objects.json')) {
        fs.unlinkSync(dataDir + '/objects.json');
    }
    if (fs.existsSync(dataDir + '/objects.json.bak')) {
        fs.unlinkSync(dataDir + '/objects.json.bak');
    }
    if (fs.existsSync(dataDir + '/states.json')) {
        fs.unlinkSync(dataDir + '/states.json');
    }
    if (fs.existsSync(dataDir + '/states.json.bak')) {
        fs.unlinkSync(dataDir + '/states.json.bak');
    }
}

describe('States-Redis-Sentinel: Test states', function () {
    before('States-Redis-Sentinel: Start js-controller', function (_done) {
        this.timeout(10000);
        cleanDbs();

        setup.startController({
            objects: {
                dataDir: dataDir,
                onChange: (id, _obj) => {
                    console.log('object changed. ' + id);
                }
            },
            states: {
                type: 'redis',
                host: ['127.0.0.1', '127.0.0.1', '127.0.0.1'],
                port: [26380, 26381, 26382],
                onChange: (id, state) => {
                    console.log('Redis-state-Sentinel changed. ' + id);
                    if (onStatesChanged) onStatesChanged(id, state);
                }
            }
        },
        (_objects, _states) => {
            objects = _objects;
            states  = _states;
            states.subscribe('*');
            expect(objects).to.be.ok;
            expect(states).to.be.ok;
            setTimeout(_done, 5000);
        }
        );
    });

    it('States-Redis-Sentinel: should setState', function (done) {
        this.timeout(10000);

        const testID = 'testObject.0.test1';
        onStatesChanged = (id, state) => {
            if (id === testID) {
                expect(state).to.be.ok;
                expect(state.val).to.be.equal(1);
                expect(state.ack).to.be.false;
                expect(state.ts).to.be.ok;
                expect(state.q).to.be.equal(0);

                states.getState(testID, (err, state) => {
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

        states.setState(testID, 1, function (err) {
            expect(err).to.be.not.ok;
        });
    });

    it('States-Redis-Sentinel: should setState with failover', function (done) {
        this.timeout(60000);

        let counter = 1;
        const testID = 'testObject.0.test1';
        onStatesChanged = (id, state) => {
            if (id === testID) {
                expect(state).to.be.ok;
                expect(state.val).to.be.equal(counter - 1);
                expect(state.ack).to.be.false;
                expect(state.ts).to.be.ok;
                expect(state.q).to.be.equal(0);
                console.log('Receive state: ' + state.val);

                states.getState(testID, (err, state) => {
                    expect(err).to.be.not.ok;
                    expect(state).to.be.ok;
                    expect(state.val).to.be.equal(counter - 1);
                    expect(state.ack).to.be.false;
                    expect(state.ts).to.be.ok;
                    expect(state.q).to.be.equal(0);
                    console.log('Get state: ' + state.val);

                    if (counter === 30) {
                        clearInterval(stateInterval);
                        done();
                    }
                });

                if (counter === 10) {
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
            console.log('Set state: ' + counter);
            states.setState(testID, counter++, function (err) {
                expect(err).to.be.not.ok;
            });
        }, 1000);
    });

    after('States-Redis-Sentinel: Stop js-controller', function (done) {
        this.timeout(5000);
        setup.stopController(function () {
            done();
        });
    });
});
