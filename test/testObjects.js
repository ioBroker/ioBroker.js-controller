var expect = require('chai').expect;
var setup  = require(__dirname + '/lib/setup4controller');
var fs     = require('fs');
var objects     = null;
var states      = null;

describe('Objects: Test UDP server', function() {
    before('Objects: Start js-controller', function (_done) {
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
                    }
                }
            },
            function (_objects, _states) {
                objects = _objects;
                states  = _states;
                expect(objects).to.be.ok;
                expect(states).to.be.ok;
                _done();
            }
        );
    });

    it('Objects: should create object', function (done) {
        objects.setObject('testObject.0.test1', {
            common: {
                name: 'test1'
            },
            native: {

            }
        }, function (err) {
            expect(err).to.be.not.ok;
            objects.getObject('testObject.0.test1', function (err, obj) {
                expect(err).to.be.not.ok;
                expect(obj).to.be.ok;
                expect(obj.common.name).to.be.equal('test1');
                expect(obj._id).to.be.equal('testObject.0.test1');
                console.log(JSON.stringify(obj));
                done();
            });
        });
    });

    after('Objects: Stop js-controller', function (done) {
        this.timeout(5000);
        setup.stopController(function () {
            done();
        });
    });
});
