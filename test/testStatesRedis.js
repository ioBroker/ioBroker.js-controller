/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
var setup  = require(__dirname + '/lib/setup4controller');
var fs     = require('fs');
var objects     = null;
var states      = null;
var onStatesChanged = null;
var dataDir = __dirname + '/../tmp/data';

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

describe('States-Redis: Test states', function() {
    before('States-Redis: Start js-controller', function (_done) {
        this.timeout(10000);
        cleanDbs();

        setup.startController({
                objects: {
                    dataDir: dataDir,
                    onChange:function (id, obj) {
                        console.log('object changed. ' + id);
                    }
                },
                states: {
                    type: 'redis',
                    host: '127.0.0.1',
                    port: 6379,
                    onChange: function (id, state) {
                        console.log('Redis-state changed. ' + id);
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
                setTimeout(_done, 5000);
            }
        );
    });

    it('States-Redis: should setState', function (done) {
        this.timeout(10000);

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

    after('States-Redis: Stop js-controller', function (done) {
        this.timeout(5000);
        setup.stopController(function () {
            done();
        });
    });
});
