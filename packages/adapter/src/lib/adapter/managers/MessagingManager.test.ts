import assert from 'node:assert/strict';
import sinon from 'sinon';
import { MessagingManager, type MessagingManagerDeps } from './MessagingManager.js';

function makeDeps(over: Partial<MessagingManagerDeps> = {}): MessagingManagerDeps {
    return {
        namespace: 'test.0',
        namespaceLog: 'test.0',
        logger: { silly() {}, debug() {}, info() {}, warn() {}, error() {} } as any,
        uiMessagingController: {} as any,
        getStates: () => null,
        getObjects: () => null,
        getCommon: () => undefined,
        ...over,
    };
}

describe('MessagingManager', () => {
    it('constructs with injected deps', () => {
        const mgr = new MessagingManager(makeDeps());
        assert.ok(mgr instanceof MessagingManager);
    });
});

describe('MessagingManager.assertSendTo', () => {
    it('shuffles (message, callback) when command omitted', () => {
        const mgr = new MessagingManager(makeDeps());
        const cb = () => {};
        const v = mgr.assertSendTo('inst.0', { a: 1 }, cb);
        assert.equal(v.ok, true);
        if (v.ok) {
            assert.equal(v.value.command, 'send');
            assert.deepEqual(v.value.message, { a: 1 });
            assert.equal(v.value.callback, cb);
        }
    });

    it('returns an error result for a non-string instanceName', () => {
        const mgr = new MessagingManager(makeDeps());
        const v = mgr.assertSendTo(42, 'cmd', { a: 1 });
        assert.equal(v.ok, false);
        if (!v.ok) {
            assert.match(v.error.message, /instanceName/);
        }
    });
});

describe('MessagingManager.sendTo', () => {
    it('stores a callback and times it out', async () => {
        const clock = sinon.useFakeTimers();
        try {
            // a specific instanceName triggers a single pushMessage to that instance
            const fakeStates = { pushMessage: sinon.stub().resolves(), subscribeMessage: sinon.stub() } as any;
            const fakeCommon = { supportedMessages: { custom: false, object: false, state: false, deviceManager: false } } as any;
            const deps = makeDeps({ getStates: () => fakeStates, getCommon: () => fakeCommon });
            const mgr = new MessagingManager(deps);
            const cb = sinon.spy();
            const v = mgr.assertSendTo('inst.0', 'cmd', { a: 1 }, cb, { timeout: 1000 });
            assert.equal(v.ok, true);
            if (v.ok) {
                await mgr.sendTo(v.value);
            }
            clock.tick(1001);
            assert.equal(cb.calledOnce, true);
            assert.ok(cb.firstCall.args[0] instanceof Error);
        } finally {
            clock.restore();
        }
    });
});

describe('MessagingManager.assertSendToHost', () => {
    it('defaults command to "send" and accepts null hostName (broadcast)', () => {
        const mgr = new MessagingManager(makeDeps());
        const v = mgr.assertSendToHost(null, { x: 1 }, undefined);
        assert.equal(v.ok, true);
        if (v.ok) {
            assert.equal(v.value.hostName, null);
            assert.equal(v.value.command, 'send');
        }
    });
});

describe('MessagingManager.sendToHost', () => {
    it('calls pushMessage with the host name and correct obj shape when a callback is provided', async () => {
        const pushMessage = sinon.stub().resolves();
        const subscribeMessage = sinon.stub();
        const fakeStates = { pushMessage, subscribeMessage } as any;
        const fakeCommon = {
            supportedMessages: { custom: false, object: false, state: false, deviceManager: false },
        } as any;
        const deps = makeDeps({ getStates: () => fakeStates, getCommon: () => fakeCommon });
        const mgr = new MessagingManager(deps);

        const cb = sinon.spy();
        const v = mgr.assertSendToHost('myhost', 'myCommand', { data: 42 }, cb);
        assert.equal(v.ok, true);
        if (v.ok) {
            await mgr.sendToHost(v.value);
        }

        assert.equal(pushMessage.calledOnce, true);
        const [targetId, sentObj] = pushMessage.firstCall.args as [string, ioBroker.Message];
        assert.equal(targetId, 'system.host.myhost');
        assert.equal(sentObj.from, 'system.adapter.test.0');
        assert.equal(sentObj.command, 'myCommand');
    });
});

describe('MessagingManager callback registry', () => {
    it('resolveCallback invokes and removes a stored callback on ack', async () => {
        const fakeStates = {
            pushMessage: sinon.stub().resolves(),
            subscribeMessage: sinon.stub(),
        } as any;
        const fakeCommon = {
            supportedMessages: { custom: false, object: false, state: false, deviceManager: false },
        } as any;
        const mgr = new MessagingManager(makeDeps({ getStates: () => fakeStates, getCommon: () => fakeCommon }));
        const cb = sinon.spy();
        const v = mgr.assertSendTo('inst.0', 'cmd', { a: 1 }, cb, { timeout: 5000 });
        assert.equal(v.ok, true);
        if (v.ok) {
            await mgr.sendTo(v.value);
        }
        const callbackId = 1;
        const handled = mgr.resolveCallback({
            command: 'cmd',
            message: { ok: true },
            from: 'system.host.x',
            callback: { ack: true, id: callbackId, time: Date.now() },
        } as any);
        assert.equal(handled, true);
        assert.equal(cb.calledOnceWithExactly({ ok: true }), true);
        // second resolve for the same id is a no-op
        assert.equal(mgr.resolveCallback({ callback: { ack: true, id: callbackId } } as any), false);
    });

    it('clearPendingCallbacks empties the registry', () => {
        const mgr = new MessagingManager(makeDeps());
        mgr.clearPendingCallbacks();
        assert.equal(mgr.resolveCallback({ callback: { ack: true, id: 999 } } as any), false);
    });
});
