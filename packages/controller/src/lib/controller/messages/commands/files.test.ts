import assert from 'node:assert/strict';
import sinon from 'sinon';
import { createFileCommands, type FileCommandsDeps } from '@/lib/controller/messages/commands/files.js';
import { silentLogger } from '@/lib/controller/testing.test-utils.js';

/**
 * A received host message
 *
 * @param command the host command
 * @param message its payload
 */
function request(command: string, message: unknown): ioBroker.SendableMessage {
    return { command, message, from: 'system.adapter.admin.0', callback: { id: 7 } } as ioBroker.SendableMessage;
}

/**
 * The host commands on a stand-in for the objects database
 *
 * @param objects the methods of the objects database the command uses
 */
function setup(objects: Record<string, unknown>): {
    commands: ReturnType<typeof createFileCommands>;
    sendTo: sinon.SinonStub;
} {
    const sendTo = sinon.stub().resolves();
    const deps = {
        objects,
        messages: { sendTo },
        logger: silentLogger(),
        hostLogPrefix: 'host.testhost',
    } as unknown as FileCommandsDeps;
    return { commands: createFileCommands(deps), sendTo };
}

/**
 * What a command answered, as it arrives at the requester: JSON
 *
 * @param sendTo the stub the answer went to
 */
function answer(sendTo: sinon.SinonStub): Record<string, unknown> {
    assert.equal(sendTo.callCount, 1, 'exactly one answer');
    return JSON.parse(JSON.stringify(sendTo.firstCall.args[2]));
}

describe('host commands for zip based transfers', () => {
    describe('readDirAsZip', () => {
        /**
         * A directory with the given files, where `broken.txt` cannot be read
         *
         * @param files the names of the files
         */
        const directory = (...files: string[]): Record<string, unknown> => ({
            readDirAsync: () => Promise.resolve(files.map(file => ({ file, isDir: false }))),
            readFile: (_id: string, name: string) =>
                name.endsWith('broken.txt')
                    ? Promise.reject(new Error('Permission denied'))
                    : Promise.resolve({ file: 'content', mimeType: 'text/plain' }),
        });

        it('answers with the archive, and nothing else if it is complete', async () => {
            const { commands, sendTo } = setup(directory('a.txt'));

            await commands.readDirAsZip(request('readDirAsZip', { id: 'test.0', name: '/main' }));

            const { data, ...rest } = answer(sendTo);
            assert.equal(typeof data, 'string');
            assert.deepEqual(rest, { error: null });
        });

        it('names the files that are missing in the archive', async () => {
            const { commands, sendTo } = setup(directory('a.txt', 'broken.txt'));

            await commands.readDirAsZip(request('readDirAsZip', { id: 'test.0', name: '/main' }));

            const { data, ...rest } = answer(sendTo);
            assert.equal(typeof data, 'string');
            assert.deepEqual(rest, { error: null, skipped: ['main/broken.txt'] });
        });

        it('answers without data for a directory without files', async () => {
            const { commands, sendTo } = setup(directory());

            await commands.readDirAsZip(request('readDirAsZip', { id: 'test.0', name: '/main' }));

            assert.deepEqual(answer(sendTo), { error: null });
        });

        it('answers with the error as text if no file could be packed', async () => {
            const { commands, sendTo } = setup(directory('broken.txt'));

            await commands.readDirAsZip(request('readDirAsZip', { id: 'test.0', name: '/main' }));

            assert.match(answer(sendTo).error as string, /Cannot read file "main\/broken.txt": Permission denied/);
        });

        it('answers on an unexpected error too', async () => {
            const { commands, sendTo } = setup(directory('a.txt'));

            await commands.readDirAsZip(request('readDirAsZip', undefined));

            assert.equal(typeof answer(sendTo).error, 'string');
        });
    });

    describe('writeObjectsAsZip', () => {
        it('answers with the error as text if the archive is invalid', async () => {
            const { commands, sendTo } = setup({});

            await commands.writeObjectsAsZip(
                request('writeObjectsAsZip', {
                    id: 'test.0',
                    adapter: '',
                    data: Buffer.from('no zip').toString('base64'),
                }),
            );

            assert.equal(typeof answer(sendTo).error, 'string');
        });

        it('answers on an unexpected error too', async () => {
            const { commands, sendTo } = setup({});

            await commands.writeObjectsAsZip(request('writeObjectsAsZip', undefined));

            assert.equal(typeof answer(sendTo).error, 'string');
        });
    });
});
