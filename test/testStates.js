var expect = require('chai').expect;
var setup  = require(__dirname + '/lib/setup');
var fs     = require('fs');
var objects     = null;
var states      = null;
var onStatesChanged = null;

describe('States: Test states', function() {
    before('States: Start js-controller', function (_done) {
        this.timeout(2000);

        setup.startController({
                objects: {
                    dataDir: __dirname + '/../tmp/data',
                    onChange:function (id, obj) {
                        console.log('object changed. ' + id);
                    }
                },
                states: {
                    dataDir: __dirname + '/../tmp/data',
                    onChange: function (id, state) {
                        console.log('state changed. ' + id);
                        if (onStatesChanged) onStatesChanged(id, state);
                    }
                }
            },
            function (_objects, _states) {
                objects = _objects;
                states  = _states;
                states.subscribe('*');
                expect(objects).to.be.ok;
                expect(states).to.be.ok;
                _done();
            }
        );
    });

    it('States: should setState', function (done) {
        var testID = 'testObject.0.test1';
        onStatesChanged = function (id, state) {
            if (id === testID) {
                expect(state).to.be.ok;
                expect(state.val).to.be.equal(1);
                expect(state.ack).to.be.false;
                expect(state.ts).to.be.ok;
                expect(state.q).to.be.equal(0);

                states.getState(testID, function (err, state) {
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

    after('States: Stop js-controller', function (done) {
        this.timeout(5000);
        setup.stopController(function () {
            done();
        });
    });
});