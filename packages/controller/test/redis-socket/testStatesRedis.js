/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const setup = require(path.join(__dirname, '..', 'lib', 'setup4controller'));
const dataDir = path.join(__dirname, '..', '..', 'tmp', 'data');
let objects = null;
let states = null;
let onStatesChanged = null;

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

describe('States-Redis-Socket: Test states', function () {
    before('States-Redis-Socket: Start js-controller', function (_done) {
        this.timeout(10000);
        cleanDbs();

        setup.startController(
            {
                objects: {
                    dataDir: dataDir,
                    onChange: (id, _obj) => {
                        console.log('object changed. ' + id);
                    }
                },
                states: {
                    type: 'redis',
                    host: '/var/run/redis.sock',
                    port: 0,
                    onChange: (id, state) => {
                        console.log('Redis-state-Socket changed. ' + id);
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

    it('States-Redis-Socket: should setState', function (done) {
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

    after('States-Redis-Socket: Stop js-controller', function (done) {
        this.timeout(5000);
        setup.stopController(function () {
            done();
        });
    });
});
