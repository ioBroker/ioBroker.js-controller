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
        void context.states.subscribeMessage(gid, function (err) {
            assert.ok(!err);

            context.onAdapterMessage = function (obj) {
                assert.strictEqual(typeof obj, 'object');
                assert.strictEqual(obj.message.test, 1);
                void context.states.unsubscribeMessage(gid, () => done());
                context.onAdapterMessage = null;
            };

            void context.states.pushMessage(gid, {
                message: { test: 1 },
                command: 'test',
                from: `system.adapter.${context.adapterShortName}`,
            });
        });
    });
    it(`${testName}check pushMessage Buffer`, function (done) {
        void context.states.subscribeMessage(gid, function (err) {
            assert.ok(!err);

            context.onAdapterMessage = function (obj) {
                assert.strictEqual(typeof obj, 'object');
                assert.strictEqual(Buffer.isBuffer(obj.message.test), true);
                assert.strictEqual(obj.message.test.toString('utf8'), 'ABCDEFG');
                void context.states.unsubscribeMessage(gid, () => done());
                context.onAdapterMessage = null;
            };

            void context.states.pushMessage(gid, {
                command: 'test',
                from: `system.adapter.${context.adapterShortName}`,
                message: { test: Buffer.from('ABCDEFG') },
            });
        });
    });
    it(`${testName}check unsubscribeMessage`, function (done) {
        void context.states.unsubscribeMessage(gid, function (err) {
            assert.ok(!err);
            done();
        });
    });

    it(`${testName}check pushLog`, function (done) {
        void context.states.subscribeLog(gid, function (err) {
            assert.ok(!err);
            void context.states.pushLog(
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
        void context.states.unsubscribeLog(gid, function (err) {
            assert.ok(!err);
            done();
        });
    });

    // getSession
    // setSession
    // destroySession
}
