import type { TestContext } from '../_Types.js';
import assert from 'node:assert/strict';

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
    /**
     * The user a message is sent on behalf of.
     *
     * `sendTo` resolves it out of its send options into the message itself, where the receiving
     * instance reads it as `obj.user`. A message that names nobody must not carry the field at all:
     * a receiver has to be able to tell "nobody was named" from "the user is known", and an empty
     * string is neither.
     */
    it(`${testName}sendTo names the user of the send options`, function (done) {
        context.states.subscribeMessage(gid, function (err) {
            assert.ok(!err);

            context.onAdapterMessage = function (obj) {
                assert.strictEqual(obj.command, 'userContext');
                assert.strictEqual(obj.user, 'system.user.someone');
                // and the sender is still named, the user does not replace it
                assert.strictEqual(obj.from, gid);
                context.states.unsubscribeMessage(gid, () => done());
                context.onAdapterMessage = null;
            };

            context.adapter.sendTo(`${context.adapterShortName}.0`, 'userContext', { test: 1 }, undefined, {
                user: 'system.user.someone',
            });
        });
    });

    it(`${testName}sendTo leaves the user out where the send options name none`, function (done) {
        context.states.subscribeMessage(gid, function (err) {
            assert.ok(!err);

            context.onAdapterMessage = function (obj) {
                assert.strictEqual(obj.command, 'withoutUser');
                assert.ok(!('user' in obj), `the message carries a user: ${JSON.stringify(obj.user)}`);
                context.states.unsubscribeMessage(gid, () => done());
                context.onAdapterMessage = null;
            };

            // no options at all, and options that name everything but a user
            context.adapter.sendTo(`${context.adapterShortName}.0`, 'withoutUser', { test: 1 }, undefined, {
                timeout: 5_000,
            });
        });
    });

    it(`${testName}sendToHost names the user of the send options`, function (done) {
        const hostMessageId = `system.host.${context.adapter.host}`;

        context.states.subscribeMessage(hostMessageId, function (err) {
            assert.ok(!err);

            // what the host does with the message does not matter here, only what is in it - so it
            // is read where it is published, through the states client of the test itself
            context.onControllerStateChanged = (id: string, obj: any): void => {
                if (id !== hostMessageId || obj?.command !== 'userContextHost') {
                    return;
                }
                assert.strictEqual(obj.user, 'system.user.someone');
                context.onControllerStateChanged = null;
                context.states.unsubscribeMessage(hostMessageId, () => done());
            };

            context.adapter.sendToHost(hostMessageId, 'userContextHost', { test: 1 }, undefined, {
                user: 'system.user.someone',
            });
        });
    });

    it(`${testName}sendToHost with a timeout gives up instead of waiting for ever`, async function () {
        this.timeout(5_000);
        // a host that does not know a command never answers, and this one does not even exist
        await assert.rejects(
            context.adapter.sendToHostAsync('system.host.thisHostDoesNotExist', 'getVersion', null, {
                timeout: 500,
            }),
            /Timeout exceeded/,
        );
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
