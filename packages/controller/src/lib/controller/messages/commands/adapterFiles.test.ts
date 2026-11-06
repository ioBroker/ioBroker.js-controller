import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import sinon from 'sinon';
import { tools } from '@iobroker/js-controller-common';
import {
    createAdapterFileCommands,
    type AdapterFileCommandsDeps,
} from '@/lib/controller/messages/commands/adapterFiles.js';
import { silentLogger } from '@/lib/controller/testing.test-utils.js';

/** Name of the adapter that is "installed" on this host during the tests */
const ADAPTER = `afctest${process.pid}`;

/**
 * A received host message
 *
 * @param command the host command
 * @param message its payload
 * @param withCallback whether the requester waits for an answer
 */
function request(command: string, message: unknown, withCallback = true): ioBroker.SendableMessage {
    return {
        command,
        message,
        from: 'system.adapter.vis-2.0',
        ...(withCallback ? { callback: { id: 7 } } : {}),
    } as unknown as ioBroker.SendableMessage;
}

describe('host commands for the files of adapters', () => {
    let root: string;
    let sendTo: sinon.SinonStub;
    let warn: sinon.SinonStub;
    let commands: ReturnType<typeof createAdapterFileCommands>;

    before(async () => {
        root = path.join(tools.getControllerDir(), 'node_modules', `iobroker.${ADAPTER}`);
        await fs.mkdir(path.join(root, 'widgets', ADAPTER), { recursive: true });
        await fs.writeFile(path.join(root, 'package.json'), JSON.stringify({ name: `iobroker.${ADAPTER}` }));
        await fs.writeFile(path.join(root, 'widgets', ADAPTER, 'customWidgets.js'), 'export {};');
    });

    after(async () => {
        await fs.rm(root, { recursive: true, force: true });
    });

    beforeEach(() => {
        sendTo = sinon.stub();
        warn = sinon.stub();
        const deps: AdapterFileCommandsDeps = {
            messages: { sendTo },
            logger: silentLogger({ warn }),
            hostLogPrefix: 'host.frigate',
        };
        commands = createAdapterFileCommands(deps);
    });

    it('lists a directory of an installed adapter', async () => {
        await commands.listAdapterDir(request('listAdapterDir', { adapter: ADAPTER, path: 'widgets' }));

        assert.equal(sendTo.callCount, 1);
        const [to, command, answer, callback] = sendTo.firstCall.args;
        assert.equal(to, 'system.adapter.vis-2.0');
        assert.equal(command, 'listAdapterDir');
        assert.deepEqual(callback, { id: 7 });
        assert.deepEqual(
            answer.files.map((file: { path: string }) => file.path),
            [`${ADAPTER}/customWidgets.js`],
        );
    });

    it('reads a file of an installed adapter', async () => {
        await commands.readAdapterFile(
            request('readAdapterFile', { adapter: ADAPTER, path: `widgets/${ADAPTER}/customWidgets.js` }),
        );

        const answer = sendTo.firstCall.args[2];
        assert.equal(answer.size, 10);
        assert.equal(answer.offset, 0);
        assert.equal(Buffer.from(answer.data, 'base64').toString(), 'export {};');
    });

    it('answers with an error for invalid requests', async () => {
        await commands.listAdapterDir(request('listAdapterDir', 'widgets'));
        await commands.listAdapterDir(request('listAdapterDir', { adapter: 'not-installed-here', path: 'widgets' }));
        await commands.readAdapterFile(request('readAdapterFile', { adapter: ADAPTER, path: 'package.json/../..' }));
        await commands.readAdapterFile(request('readAdapterFile', { adapter: 'js-controller', path: 'conf/x.json' }));

        assert.deepEqual(
            sendTo.getCalls().map(call => call.args[2].error),
            [
                'invalid message, expected an object',
                'adapter "not-installed-here" is not installed on this host',
                'invalid path "package.json/../.."',
                'the js-controller is no adapter whose files can be read',
            ],
        );
    });

    it('ignores a request without callback', async () => {
        await commands.listAdapterDir(request('listAdapterDir', { adapter: ADAPTER, path: 'widgets' }, false));

        assert.equal(sendTo.callCount, 0);
        assert.equal(warn.callCount, 1);
    });
});
