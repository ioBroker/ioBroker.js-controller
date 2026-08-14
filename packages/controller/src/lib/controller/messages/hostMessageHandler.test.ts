import assert from 'node:assert/strict';
import sinon from 'sinon';
import { HostMessageHandler } from '@/lib/controller/messages/hostMessageHandler.js';
import { silentLogger, testState } from '@/lib/controller/testing.test-utils.js';
import type { HostCommandGroupDeps } from '@/lib/controller/messages/commands/index.js';

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
        // only the `info` group is needed, the others are never reached by this message
        const commandDeps = {
            info: {
                messages: { sendTo },
                ioPackage: { common: { name: 'js-controller', title: 'ioBroker' } },
                version: '7.1.2',
                hostname: 'testhost',
                logger: silentLogger(),
                hostLogPrefix: 'host.testhost',
            },
        } as unknown as HostCommandGroupDeps;

        await new HostMessageHandler({
            logger: silentLogger(),
            hostLogPrefix: 'host.testhost',
            state: testState(),
            commandDeps,
        }).process(hostMessage('getVersion'));

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

        await new HostMessageHandler({
            logger: silentLogger(),
            hostLogPrefix: 'host.testhost',
            state: testState(),
            commandDeps: { info: { messages: { sendTo } } } as unknown as HostCommandGroupDeps,
        }).process(hostMessage('thisCommandDoesNotExist'));

        assert.equal(sendTo.called, false);
    });

    it('ignores every command while the controller is stopping', async () => {
        const sendTo = sinon.stub();

        await new HostMessageHandler({
            logger: silentLogger(),
            hostLogPrefix: 'host.testhost',
            state: testState({ stopping: true }),
            commandDeps: { info: { messages: { sendTo } } } as unknown as HostCommandGroupDeps,
        }).process(hostMessage('getVersion'));

        assert.equal(sendTo.called, false);
    });

    it('lets a command handler reject, so the caller can log it', async () => {
        const commandDeps = {
            info: {
                messages: { sendTo: sinon.stub().throws(new Error('boom')) },
                ioPackage: { common: {} },
                logger: silentLogger(),
                hostLogPrefix: 'host.testhost',
            },
        } as unknown as HostCommandGroupDeps;

        const handler = new HostMessageHandler({
            logger: silentLogger(),
            hostLogPrefix: 'host.testhost',
            state: testState(),
            commandDeps,
        });

        await assert.rejects(() => handler.process(hostMessage('getVersion')), /boom/);
    });
});
