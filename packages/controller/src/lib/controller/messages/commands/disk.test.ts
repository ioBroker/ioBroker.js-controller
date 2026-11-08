import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sinon from 'sinon';
import { tools } from '@iobroker/js-controller-common';
import { createDiskCommands, type DiskCommandsDeps } from '@/lib/controller/messages/commands/disk.js';
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

describe('host commands that read the disk', () => {
    let root: string;
    let sendTo: sinon.SinonStub;
    let warn: sinon.SinonStub;
    let commands: ReturnType<typeof createDiskCommands>;

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
        const deps: DiskCommandsDeps = {
            messages: { sendTo },
            logger: silentLogger({ warn }),
            hostLogPrefix: 'host.frigate',
        };
        commands = createDiskCommands(deps);
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

    it('reads several files of an installed adapter in one go', async () => {
        await commands.readAdapterFiles(
            request('readAdapterFiles', {
                adapter: ADAPTER,
                paths: [`widgets/${ADAPTER}/customWidgets.js`, 'package.json'],
                compress: true,
            }),
        );

        const answer = sendTo.firstCall.args[2];
        assert.deepEqual(
            answer.files.map((file: { path: string }) => file.path),
            [`widgets/${ADAPTER}/customWidgets.js`, 'package.json'],
        );
        assert.equal(Buffer.from(answer.files[0].data, 'base64').toString(), 'export {};');
    });

    it('answers with an error for invalid requests', async () => {
        await commands.listAdapterDir(request('listAdapterDir', 'widgets'));
        await commands.listAdapterDir(request('listAdapterDir', { adapter: 'not-installed-here', path: 'widgets' }));
        await commands.readAdapterFile(request('readAdapterFile', { adapter: ADAPTER, path: 'package.json/../..' }));
        await commands.readAdapterFile(request('readAdapterFile', { adapter: 'js-controller', path: 'conf/x.json' }));
        await commands.readAdapterFiles(request('readAdapterFiles', { adapter: ADAPTER, paths: 'package.json' }));

        assert.deepEqual(
            sendTo.getCalls().map(call => call.args[2].error),
            [
                'invalid message, expected an object',
                'adapter "not-installed-here" is not installed on this host',
                'invalid path "package.json/../.."',
                'the js-controller is no adapter whose files can be read',
                'invalid paths, expected 1 to 100 paths',
            ],
        );
    });

    it('ignores a request without callback', async () => {
        await commands.listAdapterDir(request('listAdapterDir', { adapter: ADAPTER, path: 'widgets' }, false));
        await commands.readDiskDir(request('readDiskDir', { root }, false));

        assert.equal(sendTo.callCount, 0);
        assert.equal(warn.callCount, 2);
    });

    it('lists a directory on the disk below a root', async () => {
        await commands.readDiskDir(request('readDiskDir', { root, path: 'widgets' }));

        const [to, command, answer, callback] = sendTo.firstCall.args;
        assert.equal(to, 'system.adapter.vis-2.0');
        assert.equal(command, 'readDiskDir');
        assert.deepEqual(callback, { id: 7 });
        assert.equal(answer.error, undefined);
        assert.equal(answer.path, path.join(root, 'widgets'));
        assert.deepEqual(
            answer.entries.map((entry: { name: string }) => entry.name),
            [ADAPTER],
        );
    });

    it('answers readDiskDir with the error in the answer', async () => {
        await commands.readDiskDir(request('readDiskDir', { root: 'relative/dir' }));
        await commands.readDiskDir(request('readDiskDir', 'not an object'));

        assert.match(sendTo.firstCall.args[2].error, /must be an absolute path/);
        assert.equal(sendTo.secondCall.args[2].error, 'invalid message, expected an object');
    });
});

describe('host commands for iobdisk:// files', () => {
    const envName = 'IOBROKER_DATA_DIR';
    let oldEnv: string | undefined;
    let dataDir: string;
    let sendTo: sinon.SinonStub;
    let commands: ReturnType<typeof createDiskCommands>;

    before(async () => {
        oldEnv = process.env[envName];
        dataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'diskCommands-'));
        process.env[envName] = dataDir;
        await fs.mkdir(path.join(dataDir, 'telegram_0', 'video'), { recursive: true });
        await fs.writeFile(path.join(dataDir, 'telegram_0', 'video', '1.mp4'), 'video');
    });

    after(async () => {
        if (oldEnv === undefined) {
            delete process.env[envName];
        } else {
            process.env[envName] = oldEnv;
        }
        await fs.rm(dataDir, { recursive: true, force: true });
    });

    beforeEach(() => {
        sendTo = sinon.stub();
        commands = createDiskCommands({ messages: { sendTo }, logger: silentLogger(), hostLogPrefix: 'host.pi4' });
    });

    it('reads a piece of a file of an instance', async () => {
        await commands.readDiskFile(request('readDiskFile', { namespace: 'telegram.0', path: 'video/1.mp4' }));

        const answer = sendTo.firstCall.args[2];
        assert.equal(answer.size, 5);
        assert.equal(answer.offset, 0);
        assert.equal(Buffer.from(answer.data, 'base64').toString(), 'video');
    });

    it('answers readDiskFile with an error for invalid requests', async () => {
        await commands.readDiskFile(request('readDiskFile', null));
        await commands.readDiskFile(request('readDiskFile', { namespace: 'files', path: 'x' }));
        await commands.readDiskFile(request('readDiskFile', { namespace: 'telegram.0', path: '../iobroker.json' }));

        assert.deepEqual(
            sendTo.getCalls().map(call => call.args[2].error),
            [
                'invalid message, expected an object',
                'invalid instance namespace "files"',
                'the path of the file must not contain "..": ../iobroker.json',
            ],
        );
    });

    it('deletes a file of an instance, also without callback', async () => {
        const file = path.join(dataDir, 'telegram_0', 'video', '2.mp4');
        await fs.writeFile(file, 'x');
        await commands.deleteDiskFile(
            request('deleteDiskFile', { namespace: 'telegram.0', path: 'video/2.mp4' }, false),
        );
        await assert.rejects(fs.stat(file), { code: 'ENOENT' });
        assert.equal(sendTo.callCount, 0);

        await commands.deleteDiskFile(request('deleteDiskFile', { namespace: 'telegram.0', path: 'video/2.mp4' }));
        await commands.deleteDiskFile(request('deleteDiskFile', { namespace: 'telegram.0', path: 'video' }));
        assert.deepEqual(sendTo.firstCall.args[2], { deleted: false });
        assert.match(sendTo.secondCall.args[2].error, /is not a file/);
    });
});
