import type { TestContext } from '../_Types.js';
import assert from 'node:assert/strict';

/**
 * Register the message box tests on the given mocha test function
 *
 * @param it The mocha test function to register the tests on
 * @param context The shared test context (adapter, states and objects clients)
 */
export function register(it: Mocha.TestFunction, context: TestContext): void {
    const testName = `${context.name} ${context.adapterShortName} adapter: `;
    const gid = `system.adapter.${context.adapterShortName}.0`;
    it(`${testName}check pushMessage`, function (done) {
        context.states.subscribeMessage(gid, function (err) {
            assert.ok(!err);

            context.onAdapterMessage = function (obj) {
                assert.strictEqual(typeof obj, 'object');
                assert.strictEqual(obj.message.test, 1);
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
            assert.ok(!err);

            context.onAdapterMessage = function (obj) {
                assert.strictEqual(typeof obj, 'object');
                assert.strictEqual(Buffer.isBuffer(obj.message.test), true);
                assert.strictEqual(obj.message.test.toString('utf8'), 'ABCDEFG');
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
            assert.ok(!err);
            done();
        });
    });

    it(`${testName}check pushLog`, function (done) {
        context.states.subscribeLog(gid, function (err) {
            assert.ok(!err);
            context.states.pushLog(
                gid,
                { message: '1', severity: 'info', from: `system.adapter.${context.adapterShortName}`, ts: Date.now() },
                function (err, id) {
                    assert.strictEqual(err, null);
                    assert.strictEqual(id, gid);
                    done();
                },
            );
        });
    });

    it(`${testName}check unsubscribeLog`, function (done) {
        context.states.unsubscribeLog(gid, function (err) {
            assert.ok(!err);
            done();
        });
    });

    const sid = 'testSession';
    const sessionData = { cookie: { originalMaxAge: 3_600_000 }, passport: { user: 'admin' } };

    it(`${testName}check setSession and getSession`, function (done) {
        context.states.setSession(sid, 3600, sessionData, function (err) {
            assert.ok(!err);

            // The session has to arrive as the SECOND argument. Handing it over as the first
            // one makes every caller read it as the error and see no session at all.
            context.states.getSession(sid, function (err, session) {
                assert.ok(!err);
                assert.strictEqual(typeof session, 'object');
                assert.strictEqual(session?.passport.user, 'admin');
                done();
            });
        });
    });

    it(`${testName}check getSession of the adapter`, function (done) {
        context.adapter.getSession(sid, function (session) {
            assert.strictEqual(typeof session, 'object');
            assert.strictEqual(session?.passport.user, 'admin');
            done();
        });
    });

    it(`${testName}check getSession of an unknown session`, function (done) {
        context.adapter.getSession('thisSessionDoesNotExist', function (session) {
            assert.strictEqual(session, null);
            done();
        });
    });

    it(`${testName}check destroySession`, function (done) {
        context.states.destroySession(sid, function (err) {
            assert.ok(!err);

            context.adapter.getSession(sid, function (session) {
                assert.strictEqual(session, null);
                done();
            });
        });
    });
}
