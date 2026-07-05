import assert from 'node:assert/strict';
import sinon from 'sinon';
import { tools } from '@iobroker/js-controller-common';
import { MessagingManager } from './MessagingManager.js';
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
        host: 'localhost',
        ...over,
    };
}

describe('MessagingManager', () => {
    it('constructs with injected deps', () => {
        const mgr = new MessagingManager(makeContext());
        assert.ok(mgr instanceof MessagingManager);
    });
});

describe('MessagingManager.sendTo', () => {
    it('rejects when instanceName is empty', async () => {
        const mgr = new MessagingManager(makeContext());
        await assert.rejects(() => mgr.sendTo({ instanceName: '', command: 'cmd', message: {} }), /No instanceName/);
    });

    it('rejects with ERROR_DB_CLOSED when states is not connected', async () => {
        const mgr = new MessagingManager(makeContext({ states: null }));
        await assert.rejects(
            () => mgr.sendTo({ instanceName: 'inst.0', command: 'cmd', message: {} }),
            new RegExp(tools.ERRORS.ERROR_DB_CLOSED),
        );
    });

    it('broadcasts to all instances (no trailing .N) and resolves void', async () => {
        const pushMessage = sinon.stub().resolves();
        const getObjectView = sinon.stub().resolves({
            rows: [{ id: 'system.adapter.inst.0' }, { id: 'system.adapter.inst.1' }],
        });
        const fakeStates = { pushMessage } as any;
        const fakeObjects = { getObjectView } as any;
        const deps = makeContext({ states: fakeStates, objects: fakeObjects });
        const mgr = new MessagingManager(deps);

        const result = await mgr.sendTo({ instanceName: 'inst', command: 'cmd', message: {} });

        assert.equal(result, undefined);
        assert.equal(pushMessage.callCount, 2);
    });

    it('rejects with ERROR_DB_CLOSED on broadcast when objects is not connected', async () => {
        const fakeStates = { pushMessage: sinon.stub().resolves() } as any;
        const mgr = new MessagingManager(makeContext({ states: fakeStates, objects: null }));
        await assert.rejects(
            () => mgr.sendTo({ instanceName: 'inst', command: 'cmd', message: {} }),
            new RegExp(tools.ERRORS.ERROR_DB_CLOSED),
        );
    });

    it('resolves void without registering a reply when expectReply is not set', async () => {
        const pushMessage = sinon.stub().resolves();
        const fakeStates = { pushMessage } as any;
        const mgr = new MessagingManager(makeContext({ states: fakeStates }));

        const result = await mgr.sendTo({ instanceName: 'inst.0', command: 'cmd', message: {} });

        assert.equal(result, undefined);
        assert.equal(pushMessage.calledOnce, true);
        const [, sentObj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        assert.equal(sentObj.callback, undefined);
    });

    it('resolves with reply when resolveCallback is called (expectReply=true)', async () => {
        const pushMessage = sinon.stub().resolves();
        const subscribeMessage = sinon.stub().resolves();
        const fakeStates = { pushMessage, subscribeMessage } as any;
        const fakeCommon = {
            supportedMessages: { custom: false, object: false, state: false, deviceManager: false },
        } as any;
        const mgr = new MessagingManager(makeContext({ states: fakeStates, common: fakeCommon }));

        const replyPromise = mgr.sendTo({
            instanceName: 'inst.0',
            command: 'cmd',
            message: { a: 1 },
            expectReply: true,
        });

        assert.equal(pushMessage.calledOnce, true);
        const [, sentObj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        const callbackId = sentObj.callback!.id;

        const handled = mgr.resolveCallback({
            command: 'cmd',
            message: { ok: true },
            from: 'system.adapter.inst.0',
            callback: { ack: true, id: callbackId, time: Date.now() },
        } as any);

        assert.equal(handled, true);
        const reply = await replyPromise;
        assert.deepEqual(reply, { ok: true });
    });

    it('rejects with Error("Timeout exceeded") after timeout elapses', async () => {
        const clock = sinon.useFakeTimers();
        try {
            const pushMessage = sinon.stub().resolves();
            const subscribeMessage = sinon.stub().resolves();
            const fakeStates = { pushMessage, subscribeMessage } as any;
            const fakeCommon = {
                supportedMessages: { custom: false, object: false, state: false, deviceManager: false },
            } as any;
            const mgr = new MessagingManager(makeContext({ states: fakeStates, common: fakeCommon }));

            const replyPromise = mgr.sendTo({
                instanceName: 'inst.0',
                command: 'cmd',
                message: { a: 1 },
                expectReply: true,
                options: { timeout: 1000 },
            });

            clock.tick(1001);
            await assert.rejects(replyPromise, (err: Error) => {
                assert.equal(err.message, 'Timeout exceeded');
                return true;
            });
        } finally {
            clock.restore();
        }
    });

    it('passes legacy MessageCallbackInfo through as ack=true callback header', async () => {
        const pushMessage = sinon.stub().resolves();
        const fakeStates = { pushMessage } as any;
        const mgr = new MessagingManager(makeContext({ states: fakeStates }));
        const callbackInfo: ioBroker.MessageCallbackInfo = { message: {}, id: 99, ack: false, time: Date.now() };

        await mgr.sendTo({
            instanceName: 'inst.0',
            command: 'cmd',
            message: {},
            callback: callbackInfo,
        });

        assert.equal(pushMessage.calledOnce, true);
        const [, sentObj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        assert.equal(sentObj.callback?.ack, true);
        assert.equal(sentObj.callback?.id, 99);
        // original callbackInfo object must not be mutated
        assert.equal(callbackInfo.ack, false);
    });

    it('rejects and cleans up pending entry when pushMessage throws in expectReply path', async () => {
        const pushErr = new Error('push failed');
        const pushMessage = sinon.stub().rejects(pushErr);
        const subscribeMessage = sinon.stub().resolves();
        const fakeStates = { pushMessage, subscribeMessage } as any;
        const fakeCommon = {
            supportedMessages: { custom: false, object: false, state: false, deviceManager: false },
        } as any;
        const mgr = new MessagingManager(makeContext({ states: fakeStates, common: fakeCommon }));

        await assert.rejects(
            () => mgr.sendTo({ instanceName: 'inst.0', command: 'cmd', message: {}, expectReply: true }),
            pushErr,
        );

        // registry must be clean — resolveCallback returns false
        assert.equal(mgr.resolveCallback({ callback: { ack: true, id: 1 } } as any), false);
    });
});

describe('MessagingManager.sendToHost', () => {
    it('calls pushMessage with the host name and correct obj shape', async () => {
        const pushMessage = sinon.stub().resolves();
        const fakeStates = { pushMessage } as any;
        const deps = makeContext({ states: fakeStates });
        const mgr = new MessagingManager(deps);

        await mgr.sendToHost({ hostName: 'myhost', command: 'myCommand', message: { data: 42 } });

        assert.equal(pushMessage.calledOnce, true);
        const [targetId, sentObj] = pushMessage.firstCall.args as [string, ioBroker.Message];
        assert.equal(targetId, 'system.host.myhost');
        assert.equal(sentObj.from, 'system.adapter.test.0');
        assert.equal(sentObj.command, 'myCommand');
    });

    it('rejects with ERROR_DB_CLOSED when states is not connected', async () => {
        const mgr = new MessagingManager(makeContext({ states: null }));
        await assert.rejects(
            () => mgr.sendToHost({ hostName: 'myhost', command: 'cmd', message: {} }),
            new RegExp(tools.ERRORS.ERROR_DB_CLOSED),
        );
    });

    it('pushes a message without a callback header when no reply is expected', async () => {
        const pushMessage = sinon.stub().resolves();
        const fakeStates = { pushMessage } as any;
        const mgr = new MessagingManager(makeContext({ states: fakeStates }));

        const result = await mgr.sendToHost({ hostName: 'myhost', command: 'cmd', message: {} });

        assert.equal(result, undefined);
        assert.equal(pushMessage.calledOnce, true);
        const [, sentObj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        assert.equal(sentObj.callback, undefined);
    });

    it('resolves with reply when resolveCallback is called (expectReply=true)', async () => {
        const pushMessage = sinon.stub().resolves();
        const subscribeMessage = sinon.stub().resolves();
        const fakeStates = { pushMessage, subscribeMessage } as any;
        const fakeCommon = {
            supportedMessages: { custom: false, object: false, state: false, deviceManager: false },
        } as any;
        const mgr = new MessagingManager(makeContext({ states: fakeStates, common: fakeCommon }));

        const replyPromise = mgr.sendToHost({
            hostName: 'myhost',
            command: 'getRepository',
            message: null,
            expectReply: true,
        });

        assert.equal(pushMessage.calledOnce, true);
        const [target, sentObj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        assert.equal(target, 'system.host.myhost');
        const callbackId = sentObj.callback!.id;

        const handled = mgr.resolveCallback({
            command: 'getRepository',
            message: { repo: 'data' },
            from: 'system.host.myhost',
            callback: { ack: true, id: callbackId, time: Date.now() },
        } as any);

        assert.equal(handled, true);
        const reply = await replyPromise;
        assert.deepEqual(reply, { repo: 'data' });
    });

    it('broadcasts to all system.host.<name> entries (null hostName)', async () => {
        const pushMessage = sinon.stub().resolves();
        const fakeStates = { pushMessage } as any;
        const getObjectList = sinon.stub().resolves({
            rows: [
                { id: 'system.host.mypc' },
                { id: 'system.host.mypc.alive' }, // should be ignored (4 parts)
                { id: 'system.host.server2' },
            ],
        });
        const fakeObjects = { getObjectList } as any;
        const mgr = new MessagingManager(makeContext({ states: fakeStates, objects: fakeObjects }));

        await mgr.sendToHost({ hostName: null, command: 'cmd', message: {} });

        // only the 3-part ids get pushMessage calls
        assert.equal(pushMessage.callCount, 2);
        const targets = pushMessage.args.map((a: any[]) => a[0]);
        assert.ok(targets.includes('system.host.mypc'));
        assert.ok(targets.includes('system.host.server2'));
    });
});

describe('MessagingManager.sendToUI', () => {
    it('delegates a single-client send to uiMessagingController.sendToClient', async () => {
        const sendToClient = sinon.stub().resolves();
        const sendToAllClients = sinon.stub().resolves();
        const fakeStates = {} as any;
        const mgr = new MessagingManager(
            makeContext({
                states: fakeStates,
                uiMessagingController: { sendToClient, sendToAllClients } as any,
            }),
        );
        await mgr.sendToUI({ clientId: 'client-1', data: { foo: 'bar' } });
        assert.equal(sendToClient.calledOnce, true);
        assert.equal(sendToAllClients.called, false);
        const [opts] = sendToClient.firstCall.args as [{ states: unknown }];
        assert.equal(opts.states, fakeStates);
    });

    it('broadcasts to all clients when clientId is omitted', async () => {
        const sendToClient = sinon.stub().resolves();
        const sendToAllClients = sinon.stub().resolves();
        const fakeStates = {} as any;
        const mgr = new MessagingManager(
            makeContext({
                states: fakeStates,
                uiMessagingController: { sendToClient, sendToAllClients } as any,
            }),
        );
        await mgr.sendToUI({ data: { foo: 'bar' } });
        assert.equal(sendToAllClients.calledOnce, true);
        assert.equal(sendToClient.called, false);
        const [opts] = sendToAllClients.firstCall.args as [{ states: unknown }];
        assert.equal(opts.states, fakeStates);
    });

    it('throws when states database is not connected', () => {
        const mgr = new MessagingManager(makeContext({ states: null }));
        assert.throws(() => mgr.sendToUI({ data: 'test' }));
    });
});

describe('MessagingManager.registerNotification', () => {
    it('pushes an addNotification message to the host', async () => {
        const pushMessage = sinon.stub().resolves();
        const fakeStates = { pushMessage } as any;
        const mgr = new MessagingManager(makeContext({ states: fakeStates, host: 'myhost' }));
        await mgr.registerNotification('iobroker', 'memUsage', 'test message');
        assert.equal(pushMessage.calledOnce, true);
        const [target, obj] = pushMessage.firstCall.args as [string, { command: string; message: unknown }];
        assert.equal(target, 'system.host.myhost');
        assert.equal(obj.command, 'addNotification');
    });

    it('throws when states database is not connected', async () => {
        const mgr = new MessagingManager(makeContext({ states: null }));
        await assert.rejects(() => mgr.registerNotification('iobroker', 'memUsage', 'msg'));
    });
});

describe('MessagingManager callback registry', () => {
    it('resolveCallback resolves the pending promise with the reply', async () => {
        const pushMessage = sinon.stub().resolves();
        const subscribeMessage = sinon.stub().resolves();
        const fakeStates = { pushMessage, subscribeMessage } as any;
        const fakeCommon = {
            supportedMessages: { custom: false, object: false, state: false, deviceManager: false },
        } as any;
        const mgr = new MessagingManager(makeContext({ states: fakeStates, common: fakeCommon }));

        const replyPromise = mgr.sendTo({
            instanceName: 'inst.0',
            command: 'cmd',
            message: { a: 1 },
            expectReply: true,
            options: { timeout: 5000 },
        });

        const callbackId = 1;
        const handled = mgr.resolveCallback({
            command: 'cmd',
            message: { ok: true },
            from: 'system.host.x',
            callback: { ack: true, id: callbackId, time: Date.now() },
        } as any);
        assert.equal(handled, true);

        const reply = await replyPromise;
        assert.deepEqual(reply, { ok: true });

        // second resolve for the same id is a no-op
        assert.equal(mgr.resolveCallback({ callback: { ack: true, id: callbackId } } as any), false);
    });

    it('clearPendingCallbacks rejects all pending promises', async () => {
        const pushMessage = sinon.stub().resolves();
        const subscribeMessage = sinon.stub().resolves();
        const fakeStates = { pushMessage, subscribeMessage } as any;
        const fakeCommon = {
            supportedMessages: { custom: false, object: false, state: false, deviceManager: false },
        } as any;
        const mgr = new MessagingManager(makeContext({ states: fakeStates, common: fakeCommon }));

        const replyPromise = mgr.sendTo({
            instanceName: 'inst.0',
            command: 'cmd',
            message: {},
            expectReply: true,
        });

        mgr.clearPendingCallbacks();

        await assert.rejects(replyPromise, /Adapter stopped/);

        // registry is empty after clear
        assert.equal(mgr.resolveCallback({ callback: { ack: true, id: 999 } } as any), false);
    });
});
