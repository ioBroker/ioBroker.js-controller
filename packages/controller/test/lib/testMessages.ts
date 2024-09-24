import type { TestContext } from '../_Types.js';

export function register(it: Mocha.TestFunction, expect: Chai.ExpectStatic, context: TestContext): void {
    const testName = `${context.name} ${context.adapterShortName} adapter: `;
    const gid = `system.adapter.${context.adapterShortName}.0`;
    it(`${testName}check pushMessage`, function (done) {
        context.states.subscribeMessage(gid, function (err) {
            expect(err).to.be.not.ok;

            context.onAdapterMessage = function (obj) {
                expect(typeof obj).to.equal('object');
                expect(obj.message.test).to.equal(1);
                context.states.unsubscribeMessage(gid, () => done());
                context.onAdapterMessage = null;
            };

            context.states.pushMessage(gid, {
                message: { test: 1 },
                command: 'test',
                from: `system.adapter.${context.adapterShortName}`,
            });
        });
    });
    it(`${testName}check pushMessage Buffer`, function (done) {
        context.states.subscribeMessage(gid, function (err) {
            expect(err).to.be.not.ok;

            context.onAdapterMessage = function (obj) {
                expect(typeof obj).to.equal('object');
                expect(Buffer.isBuffer(obj.message.test)).to.be.true;
                expect(obj.message.test.toString('utf8')).to.equal('ABCDEFG');
                context.states.unsubscribeMessage(gid, () => done());
                context.onAdapterMessage = null;
            };

            context.states.pushMessage(gid, {
                command: 'test',
                from: `system.adapter.${context.adapterShortName}`,
                message: { test: Buffer.from('ABCDEFG') },
            });
        });
    });
    it(`${testName}check unsubscribeMessage`, function (done) {
        context.states.unsubscribeMessage(gid, function (err) {
            expect(err).to.be.not.ok;
            done();
        });
    });

    it(`${testName}check pushLog`, function (done) {
        context.states.subscribeLog(gid, function (err) {
            expect(err).to.be.not.ok;
            context.states.pushLog(
                gid,
                { message: '1', severity: 'info', from: `system.adapter.${context.adapterShortName}`, ts: Date.now() },
                function (err, id) {
                    expect(err).to.be.null;
                    expect(id).to.be.equal(gid);
                    done();
                },
            );
        });
    });

    it(`${testName}check unsubscribeLog`, function (done) {
        context.states.unsubscribeLog(gid, function (err) {
            expect(err).to.be.not.ok;
            done();
        });
    });

    // getSession
    // setSession
    // destroySession
}
