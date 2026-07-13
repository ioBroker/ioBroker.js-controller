import assert from 'node:assert/strict';
import sinon from 'sinon';
import { tools } from '@iobroker/js-controller-common';
import { AsyncAdapter } from '../asyncAdapter.js';
import type { AdapterContext } from '../context.js';

function makeContext(over: Partial<AdapterContext> = {}): AdapterContext {
    return {
        namespace: 'test.0',
        namespaceLog: 'test.0',
        logger: { silly() {}, debug() {}, info() {}, warn() {}, error() {} } as any,
        uiMessagingController: {} as any,
        states: null,
        objects: null,
        common: undefined,
        config: {} as ioBroker.AdapterConfig,
        host: 'localhost',
        ...over,
    };
}

describe('AsyncAdapter', () => {
    it('constructs with injected deps', () => {
        const adapter = new AsyncAdapter(makeContext());
        assert.ok(adapter instanceof AsyncAdapter);
    });
});

describe('AsyncAdapter.sendTo', () => {
    it('pushes a fire-and-forget message and resolves void when expectReply is false', async () => {
        const pushMessage = sinon.stub().resolves();
        const adapter = new AsyncAdapter(makeContext({ states: { pushMessage } as any }));

        const result = await adapter.sendTo('inst.0', 'cmd', { a: 1 }, { expectReply: false });

        assert.equal(result, undefined);
        assert.equal(pushMessage.calledOnce, true);
        const [, sentObj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        assert.equal(sentObj.callback, undefined);
    });

    it('rejects with ERROR_DB_CLOSED when states is not connected', async () => {
        const adapter = new AsyncAdapter(makeContext({ states: null }));
        await assert.rejects(() => adapter.sendTo('inst.0', 'cmd', {}), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('resolves with the reply once resolveReply is called (default expectReply)', async () => {
        const pushMessage = sinon.stub().resolves();
        const subscribeMessage = sinon.stub().resolves();
        const fakeCommon = {
            supportedMessages: { custom: false, object: false, state: false, deviceManager: false },
        } as any;
        const adapter = new AsyncAdapter(
            makeContext({ states: { pushMessage, subscribeMessage } as any, common: fakeCommon }),
        );

        const replyPromise = adapter.sendTo('inst.0', 'cmd', { a: 1 });

        assert.equal(pushMessage.calledOnce, true);
        const [, sentObj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        const callbackId = sentObj.callback!.id;

        const handled = adapter.resolveReply({
            command: 'cmd',
            message: { ok: true },
            from: 'system.adapter.inst.0',
            callback: { ack: true, id: callbackId, time: Date.now() },
        } as any);

        assert.equal(handled, true);
        assert.deepEqual(await replyPromise, { ok: true });
    });

    it('passes a legacy callback-info header through without waiting for a reply', async () => {
        const pushMessage = sinon.stub().resolves();
        const adapter = new AsyncAdapter(makeContext({ states: { pushMessage } as any }));
        const callbackInfo: ioBroker.MessageCallbackInfo = { message: {}, id: 99, ack: false, time: Date.now() };

        const result = await adapter.sendTo('inst.0', 'cmd', {}, { callback: callbackInfo });

        assert.equal(result, undefined);
        const [, sentObj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        assert.equal(sentObj.callback!.ack, true);
        assert.equal(sentObj.callback!.id, 99);
    });
});

describe('AsyncAdapter.sendToHost', () => {
    it('never waits for a reply on broadcast (hostName === null)', async () => {
        const pushMessage = sinon.stub().resolves();
        const getObjectList = sinon.stub().resolves({ rows: [{ id: 'system.host.a' }] });
        const adapter = new AsyncAdapter(
            makeContext({ states: { pushMessage } as any, objects: { getObjectList } as any }),
        );

        const result = await adapter.sendToHost(null, 'cmd', {});

        assert.equal(result, undefined);
        assert.equal(pushMessage.calledOnce, true);
    });
});

describe('AsyncAdapter validation', () => {
    it('sendTo rejects when instanceName is not a string', async () => {
        const adapter = new AsyncAdapter(makeContext({ states: { pushMessage: sinon.stub().resolves() } as any }));
        await assert.rejects(() => adapter.sendTo(42, 'cmd', {}), /instanceName/);
    });

    it('sendTo rejects when command is not a string', async () => {
        const adapter = new AsyncAdapter(makeContext({ states: { pushMessage: sinon.stub().resolves() } as any }));
        await assert.rejects(() => adapter.sendTo('inst.0', 42, {}), /command/);
    });

    it('sendTo rejects when options is not an object', async () => {
        const adapter = new AsyncAdapter(makeContext({ states: { pushMessage: sinon.stub().resolves() } as any }));
        await assert.rejects(() => adapter.sendTo('inst.0', 'cmd', {}, 'bad' as any), /options/);
    });

    it('sendToHost rejects when hostName is a non-null non-string', async () => {
        const adapter = new AsyncAdapter(makeContext({ states: { pushMessage: sinon.stub().resolves() } as any }));
        await assert.rejects(() => adapter.sendToHost(42, 'cmd', {}), /hostName/);
    });

    it('sendToHost rejects when command is not a string', async () => {
        const adapter = new AsyncAdapter(makeContext({ states: { pushMessage: sinon.stub().resolves() } as any }));
        await assert.rejects(() => adapter.sendToHost('host', 42, {}), /command/);
    });

    it('sendToUI throws when clientId is not a string', () => {
        const adapter = new AsyncAdapter(
            makeContext({ states: {} as any, uiMessagingController: { sendToClient: sinon.stub() } as any }),
        );
        assert.throws(() => adapter.sendToUI({ clientId: 42, data: {} }), /clientId/);
    });

    it('registerNotification rejects when scope is not a string', async () => {
        const adapter = new AsyncAdapter(makeContext({ states: { pushMessage: sinon.stub().resolves() } as any }));
        await assert.rejects(() => adapter.registerNotification(42, null, 'msg'), /scope/);
    });

    it('registerNotification rejects when message is not a string', async () => {
        const adapter = new AsyncAdapter(makeContext({ states: { pushMessage: sinon.stub().resolves() } as any }));
        await assert.rejects(() => adapter.registerNotification('system', null, 42), /message/);
    });
});

describe('AsyncAdapter lazy instantiation', () => {
    it('resolveReply on an unused adapter returns false without constructing the manager', () => {
        const adapter = new AsyncAdapter(makeContext());
        const handled = adapter.resolveReply({
            command: 'cmd',
            message: {},
            from: 'system.adapter.inst.0',
            callback: { ack: true, id: 1, time: Date.now() },
        } as any);
        assert.equal(handled, false);
    });

    it('clearPending on an unused adapter is a no-op', () => {
        const adapter = new AsyncAdapter(makeContext());
        assert.doesNotThrow(() => adapter.clearPending());
    });
});

describe('AsyncAdapter.clearPending', () => {
    it('rejects pending replies with "Adapter stopped"', async () => {
        const pushMessage = sinon.stub().resolves();
        const subscribeMessage = sinon.stub().resolves();
        const fakeCommon = {
            supportedMessages: { custom: false, object: false, state: false, deviceManager: false },
        } as any;
        const adapter = new AsyncAdapter(
            makeContext({ states: { pushMessage, subscribeMessage } as any, common: fakeCommon }),
        );

        const replyPromise = adapter.sendTo('inst.0', 'cmd', {});
        adapter.clearPending();

        await assert.rejects(replyPromise, /Adapter stopped/);
    });
});
