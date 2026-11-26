import assert from 'node:assert/strict';
import sinon from 'sinon';
import { createInfoCommands, type InfoCommandsDeps } from '@/lib/controller/messages/commands/info.js';
import { silentLogger } from '@/lib/controller/testing.test-utils.js';
import type { AdapterUsage } from '@/lib/controller/instances/webExtensionProvider.js';

/**
 * A received host message
 *
 * @param message its payload
 */
function request(message: unknown): ioBroker.SendableMessage {
    return {
        command: 'getAdapterUsage',
        message,
        from: 'system.adapter.admin.0',
        callback: { id: 7 },
    } as unknown as ioBroker.SendableMessage;
}

describe('host command getAdapterUsage', () => {
    const usage: AdapterUsage = {
        adapter: 'frigate',
        installedVersion: '2.1.0',
        instances: [],
        webExtensions: ['system.adapter.frigate.0'],
        needed: true,
    };
    let sendTo: sinon.SinonStub;
    let getUsage: sinon.SinonStub;
    let commands: ReturnType<typeof createInfoCommands>;

    beforeEach(() => {
        sendTo = sinon.stub();
        getUsage = sinon.stub().resolves(usage);
        const deps = {
            messages: { sendTo },
            instances: { webExtensions: { getUsage } },
            logger: silentLogger(),
            hostLogPrefix: 'host.testhost',
        } as unknown as InfoCommandsDeps;
        commands = createInfoCommands(deps);
    });

    it('answers what the adapter is needed for on this host', async () => {
        await commands.getAdapterUsage(request('frigate'));

        assert.deepEqual(getUsage.firstCall.args, ['frigate']);
        assert.deepEqual(sendTo.firstCall.args, ['system.adapter.admin.0', 'getAdapterUsage', usage, { id: 7 }]);
    });

    it('takes the adapter as an object too', async () => {
        await commands.getAdapterUsage(request({ adapter: 'frigate' }));

        assert.deepEqual(getUsage.firstCall.args, ['frigate']);
    });

    it('refuses something that is no adapter name', async () => {
        await commands.getAdapterUsage(request('../frigate'));

        assert.equal(getUsage.called, false);
        assert.deepEqual(sendTo.firstCall.args[2], { error: 'Expected the name of an adapter' });
    });
});
