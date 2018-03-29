/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

function register(it, expect, context) {
    const textName = context.name + ' objects: ';

    const testId = 'testObject.0.test1';

    it(textName + 'should create object', function (done) {
        let objects = context.objects;
        objects.setObject(testId, {
            common: {
                name: 'test1'
            },
            native: {

            }
        }, function (err) {
            expect(err).to.be.not.ok;
            objects.getObject(testId, function (err, obj) {
                expect(err).to.be.not.ok;
                expect(obj).to.be.ok;
                expect(obj.common.name).to.be.equal('test1');
                expect(obj._id).to.be.equal(testId);
                console.log(JSON.stringify(obj));
                done();
            });
        });
    });

    it(textName + 'should create object async', function (done) {
        let objects = context.objects;
        objects.setObjectAsync(testId + 'async', {
            common: {
                name: 'test1a'
            },
            native: {

            }
        }).then(() => {
            done();
        }).catch(err => {
            expect(err).to.be.not.ok;
        });
    });

    it(textName + 'should read object async', function (done) {
        let objects = context.objects;
        objects.getObjectAsync(testId + 'async').then(obj => {
            expect(obj).to.be.ok;
            expect(obj.common.name).to.be.equal('test1a');
            expect(obj._id).to.be.equal(testId + 'async');
            console.log(JSON.stringify(obj));
            done();
        }).catch(err => {
            expect(err).to.be.not.ok;
        });
    });
}

module.exports.register = register;