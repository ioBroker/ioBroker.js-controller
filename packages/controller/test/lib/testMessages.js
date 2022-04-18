/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

function register(it, expect, context) {
    const testName = context.name + ' ' + context.adapterShortName + ' adapter: ';
    const gid = 'system.adapter.' + context.adapterShortName + '.0';
    it(testName + 'check pushMessage', function (done) {
        context.states.subscribeMessage(gid, function (err) {
            expect(err).to.be.not.ok;

            context.onAdapterMessage = function (obj) {
                expect(typeof obj).to.equal('object');
                expect(obj.test).to.equal(1);
                context.states.unsubscribeMessage(gid, () => done());
                context.onAdapterMessage = null;
            };

            context.states.pushMessage(gid, { test: 1 }, function (err, id) {
                expect(err).to.be.null;
                expect(id).to.be.equal(gid);
            });
        });
    });
    it(testName + 'check pushMessage Buffer', function (done) {
        context.states.subscribeMessage(gid, function (err) {
            expect(err).to.be.not.ok;

            context.onAdapterMessage = function (obj) {
                expect(typeof obj).to.equal('object');
                expect(Buffer.isBuffer(obj.test)).to.be.true;
                expect(obj.test.toString('utf8')).to.equal('ABCDEFG');
                context.states.unsubscribeMessage(gid, () => done());
                context.onAdapterMessage = null;
            };

            context.states.pushMessage(gid, { test: Buffer.from('ABCDEFG') }, function (err, id) {
                expect(err).to.be.null;
                expect(id).to.be.equal(gid);
            });
        });
    });
    it(testName + 'check unsubscribeMessage', function (done) {
        context.states.unsubscribeMessage(gid, function (err) {
            expect(err).to.be.not.ok;
            done();
        });
    });

    it(testName + 'check pushLog', function (done) {
        context.states.subscribeLog(gid, function (err) {
            expect(err).to.be.not.ok;
            context.states.pushLog(gid, { test: 1 }, function (err, id) {
                expect(err).to.be.null;
                expect(id).to.be.equal(gid);
                done();
            });
        });
    });

    it(testName + 'check unsubscribeLog', function (done) {
        context.states.unsubscribeLog(gid, function (err) {
            expect(err).to.be.not.ok;
            done();
        });
    });

    // getSession
    // setSession
    // destroySession
}

module.exports.register = register;
