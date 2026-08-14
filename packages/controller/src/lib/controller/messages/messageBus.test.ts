import assert from 'node:assert/strict';
import sinon from 'sinon';
import { MessageBus } from '@/lib/controller/messages/messageBus.js';
import { silentLogger, testIdentity } from '@/lib/controller/testing.test-utils.js';

/**
 * Let the fire-and-forget part of `sendTo` run
 *
 * The overload which takes a callback is typed as `void`, so it cannot be awaited by the caller.
 */
async function flush(): Promise<void> {
    return new Promise(resolve => setImmediate(resolve));
}

describe('MessageBus.initMessageQueue', () => {
    it('subscribes to the messagebox of this host', () => {
        const subscribeMessage = sinon.stub().resolves();
        const bus = new MessageBus({ states: { subscribeMessage } as any, ...testIdentity() });

        bus.initMessageQueue();

        assert.equal(subscribeMessage.calledOnce, true);
        assert.equal(subscribeMessage.firstCall.args[0], 'system.host.testhost');
    });
});

describe('MessageBus.sendTo', () => {
    it('prefixes a bare adapter name with "system.adapter."', async () => {
        const pushMessage = sinon.stub().resolves();
        const bus = new MessageBus({ states: { pushMessage } as any, ...testIdentity() });

        await bus.sendTo('hm-rpc.0', 'someCommand', { a: 1 });

        assert.equal(pushMessage.calledOnce, true);
        const [target, obj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        assert.equal(target, 'system.adapter.hm-rpc.0');
        assert.equal(obj.command, 'someCommand');
        assert.equal(obj.from, 'system.host.testhost');
    });

    it('leaves an already qualified host id untouched', async () => {
        const pushMessage = sinon.stub().resolves();
        const bus = new MessageBus({ states: { pushMessage } as any, ...testIdentity() });

        await bus.sendTo('system.host.other', 'getVersion', null);

        assert.equal(pushMessage.firstCall.args[0], 'system.host.other');
    });

    it('attaches a generated callback header for a function callback', async () => {
        const pushMessage = sinon.stub().resolves();
        const bus = new MessageBus({ states: { pushMessage } as any, ...testIdentity() });

        bus.sendTo('hm-rpc.0', 'someCommand', { a: 1 }, () => {});
        await flush();

        const [, obj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        assert.equal(obj.callback?.ack, false);
        assert.equal(typeof obj.callback?.id, 'number');
    });

    it('passes a legacy MessageCallbackInfo through as an acknowledged header', async () => {
        const pushMessage = sinon.stub().resolves();
        const bus = new MessageBus({ states: { pushMessage } as any, ...testIdentity() });
        const callback: ioBroker.MessageCallbackInfo = { message: {}, id: 42, ack: false, time: Date.now() };

        bus.sendTo('hm-rpc.0', 'someCommand', {}, callback);
        await flush();

        const [, obj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        assert.equal(obj.callback?.id, 42);
        assert.equal(obj.callback?.ack, true);
    });

    it('reports a push error to the callback and drops the pending entry', async () => {
        const pushMessage = sinon.stub().rejects(new Error('push failed'));
        const error = sinon.stub();
        const logger = silentLogger({ error });
        const bus = new MessageBus({ states: { pushMessage } as any, ...testIdentity({ logger }) });
        const callback = sinon.stub();

        bus.sendTo('hm-rpc.0', 'someCommand', {}, callback);
        await flush();

        assert.equal(callback.calledOnce, true);
        assert.match(callback.firstCall.args[0].message, /push failed/);
        assert.equal(error.calledOnce, true);
        // the callback must not be resolvable a second time via a late answer
        assert.equal(bus.handleResponse({ callback: { ack: true, id: 1 } } as any), false);
    });
});

describe('MessageBus.handleResponse', () => {
    it('resolves the pending callback of a sent message', async () => {
        const pushMessage = sinon.stub().resolves();
        const bus = new MessageBus({ states: { pushMessage } as any, ...testIdentity() });
        const callback = sinon.stub();

        bus.sendTo('hm-rpc.0', 'someCommand', {}, callback);
        await flush();
        const [, obj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];

        const handled = bus.handleResponse({
            command: 'someCommand',
            message: { ok: true },
            from: 'system.adapter.hm-rpc.0',
            callback: { ...obj.callback!, ack: true },
        } as any);

        assert.equal(handled, true);
        assert.deepEqual(callback.firstCall.args[0], { ok: true });
    });

    it('ignores a message which is not an answer to one of our requests', () => {
        const bus = new MessageBus({ states: {} as any, ...testIdentity() });

        assert.equal(bus.handleResponse({ command: 'x', message: {} } as any), false);
        assert.equal(bus.handleResponse({ callback: { ack: true, id: 999 } } as any), false);
        // an unacknowledged callback header is a request, not an answer
        assert.equal(bus.handleResponse({ callback: { ack: false, id: 1 } } as any), false);
    });

    it('consumes the callback, so a repeated answer is ignored', async () => {
        const pushMessage = sinon.stub().resolves();
        const bus = new MessageBus({ states: { pushMessage } as any, ...testIdentity() });
        const callback = sinon.stub();

        bus.sendTo('hm-rpc.0', 'someCommand', {}, callback);
        await flush();
        const [, obj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        const answer = { message: {}, callback: { ...obj.callback!, ack: true } } as any;

        assert.equal(bus.handleResponse(answer), true);
        assert.equal(bus.handleResponse(answer), false);
        assert.equal(callback.callCount, 1);
    });
});

describe('MessageBus.sendToAndWait', () => {
    it('resolves with the payload of the answer', async () => {
        const pushMessage = sinon.stub().resolves();
        const bus = new MessageBus({ states: { pushMessage } as any, ...testIdentity() });

        const pending = bus.sendToAndWait('hm-rpc.0', 'someCommand', {});
        // let sendTo push the message before we answer it
        await flush();

        const [, obj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        bus.handleResponse({ message: { answer: 42 }, callback: { ...obj.callback!, ack: true } } as any);

        assert.deepEqual(await pending, { answer: 42 });
    });
});

describe('MessageBus.getVersionFromHost', () => {
    it('returns null when the other host is not alive', async () => {
        const getState = sinon.stub().resolves({ val: false });
        const warn = sinon.stub();
        const logger = silentLogger({ warn });
        const bus = new MessageBus({ states: { getState } as any, ...testIdentity({ logger }) });

        assert.equal(await bus.getVersionFromHost('system.host.other'), null);
        assert.equal(getState.firstCall.args[0], 'system.host.other.alive');
        assert.equal(warn.calledOnce, true);
    });

    it('returns the io-package information the other host answered with', async () => {
        const getState = sinon.stub().resolves({ val: true });
        const pushMessage = sinon.stub().resolves();
        const bus = new MessageBus({ states: { getState, pushMessage } as any, ...testIdentity() });

        const pending = bus.getVersionFromHost('system.host.other');
        await flush();

        const [, obj] = pushMessage.firstCall.args as [string, ioBroker.SendableMessage];
        bus.handleResponse({ message: { name: 'js-controller' }, callback: { ...obj.callback!, ack: true } } as any);

        assert.deepEqual(await pending, { name: 'js-controller' } as any);
    });
});

describe('MessageBus.sendResponseTo', () => {
    it('answers only when the received message carries a callback and a sender', async () => {
        const pushMessage = sinon.stub().resolves();
        const bus = new MessageBus({ states: { pushMessage } as any, ...testIdentity() });

        // a message without `from` cannot be answered, even though it is not representable in the type
        bus.sendResponseTo({
            receivedMsg: { command: 'cmd', message: {} } as ioBroker.SendableMessage,
            payload: { result: 'ok' },
        });
        await flush();
        assert.equal(pushMessage.called, false);

        bus.sendResponseTo({
            receivedMsg: {
                command: 'cmd',
                message: {},
                from: 'system.adapter.admin.0',
                callback: { message: {}, id: 1, ack: false, time: Date.now() },
            },
            payload: { result: 'ok' },
        });
        await flush();

        assert.equal(pushMessage.calledOnce, true);
        assert.equal(pushMessage.firstCall.args[0], 'system.adapter.admin.0');
    });
});
