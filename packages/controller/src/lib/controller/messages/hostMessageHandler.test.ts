import assert from 'node:assert/strict';
import sinon from 'sinon';
import { HostMessageHandler } from '@/lib/controller/messages/hostMessageHandler.js';
import { createTestContext } from '@/lib/controller/context.test-utils.js';

/**
 * Build a message as it arrives in the messagebox of this host
 *
 * @param command The host command to invoke
 */
function hostMessage(command: string): ioBroker.SendableMessage {
    return {
        command,
        message: null,
        from: 'system.adapter.admin.0',
        callback: { message: null, id: 1, ack: false, time: Date.now() },
    };
}

describe('HostMessageHandler.process', () => {
    it('dispatches a known command and hands it the context', async () => {
        const sendTo = sinon.stub();
        const ctx = createTestContext({
            messages: { sendTo } as any,
            ioPackage: { common: { name: 'js-controller', title: 'ioBroker' } },
            version: '7.1.2',
            hostname: 'testhost',
        });

        await new HostMessageHandler(ctx).process(hostMessage('getVersion'));

        assert.equal(sendTo.calledOnce, true);
        const [target, command, payload] = sendTo.firstCall.args as [string, string, Record<string, unknown>];
        assert.equal(target, 'system.adapter.admin.0');
        assert.equal(command, 'getVersion');
        // the handler enriched the io-package common with the host information
        assert.equal(payload.host, 'testhost');
        assert.equal(payload.runningVersion, '7.1.2');
        assert.equal(payload.name, 'js-controller');
    });

    it('ignores unknown commands', async () => {
        const sendTo = sinon.stub();
        const ctx = createTestContext({ messages: { sendTo } as any });

        await new HostMessageHandler(ctx).process(hostMessage('thisCommandDoesNotExist'));

        assert.equal(sendTo.called, false);
    });

    it('ignores every command while the controller is stopping', async () => {
        const sendTo = sinon.stub();
        const ctx = createTestContext({ messages: { sendTo } as any, isStopping: Date.now() });

        await new HostMessageHandler(ctx).process(hostMessage('getVersion'));

        assert.equal(sendTo.called, false);
    });

    it('lets a command handler reject, so the caller can log it', async () => {
        const ctx = createTestContext({
            messages: {
                sendTo: sinon.stub().throws(new Error('boom')),
            } as any,
            ioPackage: { common: {} },
        });

        await assert.rejects(() => new HostMessageHandler(ctx).process(hostMessage('getVersion')), /boom/);
    });
});
