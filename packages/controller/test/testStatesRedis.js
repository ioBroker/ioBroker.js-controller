/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

const expect = require('chai').expect;
const setup = require('./lib/setup4controller');
const fs = require('fs');
let objects = null;
let states = null;
let onStatesChanged = null;
const dataDir = __dirname + '/../tmp/data';

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

describe('States-Redis: Test states in Redis', function () {
    before('States-Redis: Start js-controller', function (_done) {
        this.timeout(10000);
        cleanDbs();

        setup.startController(
            {
                objects: {
                    dataDir: dataDir,
                    onChange: (id, _obj) => console.log('object changed. ' + id)
                },
                states: {
                    type: 'redis',
                    host: '127.0.0.1',
                    port: 6379,
                    onChange: (id, state) => {
                        console.log('Redis-state changed. ' + id);
                        if (onStatesChanged) {
                            onStatesChanged(id, state);
                        }
                    }
                }
            },
            (_objects, _states) => {
                objects = _objects;
                states = _states;
                states.subscribe('*');
                expect(objects).to.be.ok;
                expect(states).to.be.ok;
                setTimeout(_done, 5000);
            }
        );
    });

    it('States-Redis: should setState', done => {
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

        states.setState(testID, 1, err => {
            expect(err).to.be.not.ok;
        });
    }).timeout(10000);

    it('States-Redis: should setState async', done => {
        const testID = 'testObject.0.test1';
        onStatesChanged = async (id, state) => {
            if (id === testID) {
                expect(state).to.be.ok;
                expect(state.val).to.be.equal(2);
                expect(state.ack).to.be.false;
                expect(state.ts).to.be.ok;
                expect(state.q).to.be.equal(0);

                state = await states.getStateAsync(testID);
                expect(state).to.be.ok;
                expect(state.val).to.be.equal(2);
                expect(state.ack).to.be.false;
                expect(state.ts).to.be.ok;
                expect(state.q).to.be.equal(0);
                done();
            }
        };

        states.setStateAsync(testID, 2);
    }).timeout(10000);

    // todo: write more tests

    after('States-Redis: Stop js-controller', function (done) {
        this.timeout(5000);
        setup.stopController(function () {
            setTimeout(done, 2000);
        });
    });
});
