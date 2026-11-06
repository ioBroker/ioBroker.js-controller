import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sinon from 'sinon';
import { adapterFiles, tools } from '@iobroker/js-controller-common';
import { AdapterFileManager } from './AdapterFileManager.js';
import type { AdapterContext } from '../context.js';

/** Name of the adapter that is "installed" on this host during the tests */
const LOCAL_ADAPTER = `fadtest${process.pid}`;

/**
 * A context of an instance on host `vitanova`
 *
 * @param over Context fields to override
 */
function makeContext(over: Partial<AdapterContext> = {}): AdapterContext {
    return {
        namespace: 'vis-2.0',
        namespaceLog: 'vis-2.0',
        logger: { silly() {}, debug() {}, info() {}, warn() {}, error() {} } as any,
        uiMessagingController: {} as any,
        countOutput: () => {},
        states: null,
        objects: null,
        common: undefined,
        config: {} as ioBroker.AdapterConfig,
        host: 'vitanova',
        ...over,
    };
}

/**
 * A host that hands out the files below `root` like the js-controller does
 *
 * @param root the package directory of the adapter on that host
 * @param override answers to use instead, by command
 */
function fakeHost(
    root: string,
    override: Record<string, (message: any) => unknown> = {},
): sinon.SinonStub<[opts: any], Promise<any>> {
    return sinon.stub<[opts: any], Promise<any>>().callsFake(async ({ command, message }) => {
        if (override[command]) {
            return override[command](message);
        }
        try {
            switch (command) {
                case 'checkFeatureSupported':
                    return { result: message === 'CONTROLLER_ADAPTER_FILES' };
                case 'listAdapterDir':
                    return { files: await adapterFiles.listDir(root, message.path) };
                case 'readAdapterFile':
                    return await adapterFiles.readFileChunk(root, message.path, message.offset, message.length);
            }
        } catch (e) {
            return { error: e.message };
        }
        throw new Error(`unexpected command ${command}`);
    });
}

describe('AdapterFileManager.fetchAdapterDir', () => {
    let tmp: string;
    let remoteRoot: string;
    let target: string;
    let bigFile: Buffer;

    beforeEach(async () => {
        tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'adapterFileManager-'));
        remoteRoot = path.join(tmp, 'remote', 'iobroker.wattcycle');
        target = path.join(tmp, 'target');
        bigFile = crypto.randomBytes(Math.round(adapterFiles.ADAPTER_FILE_CHUNK_SIZE * 2.5));
        await fs.mkdir(path.join(remoteRoot, 'widgets', 'wattcycle', 'assets'), { recursive: true });
        await fs.writeFile(path.join(remoteRoot, 'widgets', 'wattcycle', 'customWidgets.js'), 'export {};');
        await fs.writeFile(path.join(remoteRoot, 'widgets', 'wattcycle', 'assets', 'big.js'), bigFile);
        await fs.writeFile(path.join(remoteRoot, 'widgets', 'wattcycle', 'empty.txt'), '');
        await fs.writeFile(path.join(remoteRoot, 'widgets', '.secret'), 'no');
    });

    afterEach(async () => {
        await fs.rm(tmp, { recursive: true, force: true });
    });

    it('fetches a directory with big and empty files from another host', async () => {
        const sendToHost = fakeHost(remoteRoot);
        const mgr = new AdapterFileManager(makeContext(), () => ({ sendToHost }) as any);

        const result = await mgr.fetchAdapterDir({ adapter: 'wattcycle', path: 'widgets', target, host: 'frigate' });

        assert.equal(result.host, 'frigate');
        assert.deepEqual(result.files, [
            'wattcycle/assets/big.js',
            'wattcycle/customWidgets.js',
            'wattcycle/empty.txt',
        ]);
        assert.deepEqual(await fs.readFile(path.join(target, 'wattcycle', 'assets', 'big.js')), bigFile);
        assert.equal(await fs.readFile(path.join(target, 'wattcycle', 'customWidgets.js'), 'utf8'), 'export {};');
        assert.equal((await fs.stat(path.join(target, 'wattcycle', 'empty.txt'))).size, 0);
        await assert.rejects(() => fs.stat(path.join(target, '.secret')));

        // the big file came in three pieces, all requests went to frigate
        const reads = sendToHost.getCalls().filter(call => call.args[0].command === 'readAdapterFile');
        assert.equal(reads.filter(call => call.args[0].message.path === 'widgets/wattcycle/assets/big.js').length, 3);
        assert.ok(sendToHost.getCalls().every(call => call.args[0].hostName === 'frigate'));
    });

    it('checks the feature of a host only once', async () => {
        const sendToHost = fakeHost(remoteRoot);
        const mgr = new AdapterFileManager(makeContext(), () => ({ sendToHost }) as any);

        await mgr.fetchAdapterDir({ adapter: 'wattcycle', path: 'widgets/wattcycle/assets', target, host: 'frigate' });
        await mgr.fetchAdapterDir({ adapter: 'wattcycle', path: 'widgets/wattcycle/assets', target, host: 'frigate' });

        const checks = sendToHost.getCalls().filter(call => call.args[0].command === 'checkFeatureSupported');
        assert.equal(checks.length, 1);
    });

    it('refuses a host whose js-controller is too old or does not answer', async () => {
        const old = new AdapterFileManager(
            makeContext(),
            () =>
                ({
                    sendToHost: fakeHost(remoteRoot, { checkFeatureSupported: () => ({ result: false }) }),
                }) as any,
        );
        await assert.rejects(
            () => old.fetchAdapterDir({ adapter: 'wattcycle', path: 'widgets', target, host: 'frigate' }),
            /too old to hand out the files of adapters/,
        );

        const silent = new AdapterFileManager(
            makeContext(),
            () =>
                ({
                    sendToHost: fakeHost(remoteRoot, {
                        checkFeatureSupported: () => {
                            throw new Error('Timeout exceeded');
                        },
                    }),
                }) as any,
        );
        await assert.rejects(
            () => silent.fetchAdapterDir({ adapter: 'wattcycle', path: 'widgets', target, host: 'frigate' }),
            /does not answer/,
        );
    });

    it('passes on the error of the host', async () => {
        const mgr = new AdapterFileManager(makeContext(), () => ({ sendToHost: fakeHost(remoteRoot) }) as any);
        await assert.rejects(
            () => mgr.fetchAdapterDir({ adapter: 'wattcycle', path: 'missing', target, host: 'frigate' }),
            /host "frigate" refused listAdapterDir of "missing": "missing" does not exist/,
        );
    });

    it('does not write outside of the target for a bad listing', async () => {
        const sendToHost = fakeHost(remoteRoot, {
            listAdapterDir: () => ({ files: [{ path: '../evil.js', size: 1, mtime: 1 }] }),
        });
        const mgr = new AdapterFileManager(makeContext(), () => ({ sendToHost }) as any);

        await assert.rejects(
            () => mgr.fetchAdapterDir({ adapter: 'wattcycle', path: 'widgets', target, host: 'frigate' }),
            /invalid path/,
        );
        await assert.rejects(() => fs.stat(path.join(tmp, 'evil.js')));
        assert.ok(!sendToHost.getCalls().some(call => call.args[0].command === 'readAdapterFile'));
    });

    it('notices a file that changes while it is fetched', async () => {
        let reads = 0;
        const sendToHost = fakeHost(remoteRoot, {
            readAdapterFile: async message => {
                const chunk = await adapterFiles.readFileChunk(
                    remoteRoot,
                    message.path,
                    message.offset,
                    message.length,
                );
                return reads++ ? { ...chunk, mtime: chunk.mtime + 1 } : chunk;
            },
        });
        const mgr = new AdapterFileManager(makeContext(), () => ({ sendToHost }) as any);

        await assert.rejects(
            () =>
                mgr.fetchAdapterDir({
                    adapter: 'wattcycle',
                    path: 'widgets/wattcycle/assets',
                    target,
                    host: 'frigate',
                }),
            /changed on host "frigate" while it was fetched/,
        );
    });

    it('refuses invalid options before asking anybody', async () => {
        const sendToHost = fakeHost(remoteRoot);
        const mgr = new AdapterFileManager(makeContext(), () => ({ sendToHost }) as any);

        await assert.rejects(
            () => mgr.fetchAdapterDir({ adapter: 'iobroker.wattcycle', path: 'widgets', target, host: 'frigate' }),
            /invalid adapter name/,
        );
        await assert.rejects(
            () => mgr.fetchAdapterDir({ adapter: 'wattcycle', path: '../widgets', target, host: 'frigate' }),
            /invalid path/,
        );
        assert.equal(sendToHost.callCount, 0);
    });

    describe('without a host', () => {
        it('takes the first running host with an instance of the adapter', async () => {
            const getObjectView = sinon.stub().resolves({
                rows: [
                    { id: 'system.adapter.wattcycle.0', value: { common: { host: 'zeus' } } },
                    { id: 'system.adapter.wattcycle.1', value: { common: { host: 'frigate' } } },
                    { id: 'system.adapter.wattcycle.2', value: { common: { host: 'apollo' } } },
                ],
            });
            const getState = sinon
                .stub()
                .callsFake((id: string) =>
                    Promise.resolve(id === 'system.host.apollo.alive' ? { val: false } : { val: true }),
                );
            const sendToHost = fakeHost(remoteRoot);
            const mgr = new AdapterFileManager(
                makeContext({ objects: { getObjectView } as any, states: { getState } as any }),
                () => ({ sendToHost }) as any,
            );

            const result = await mgr.fetchAdapterDir({ adapter: 'wattcycle', path: 'widgets', target });

            assert.equal(result.host, 'frigate');
            assert.deepEqual(getObjectView.firstCall.args, [
                'system',
                'instance',
                { startkey: 'system.adapter.wattcycle.', endkey: 'system.adapter.wattcycle.香' },
            ]);
        });

        it('fails if no host with an instance runs', async () => {
            const mgr = new AdapterFileManager(
                makeContext({
                    objects: {
                        getObjectView: sinon.stub().resolves({
                            rows: [{ id: 'system.adapter.wattcycle.0', value: { common: { host: 'frigate' } } }],
                        }),
                    } as any,
                    states: { getState: sinon.stub().resolves(null) } as any,
                }),
                () => ({ sendToHost: fakeHost(remoteRoot) }) as any,
            );

            await assert.rejects(
                () => mgr.fetchAdapterDir({ adapter: 'wattcycle', path: 'widgets', target }),
                /not installed on this host and no running host has an instance of it/,
            );
        });
    });

    describe('adapter installed on this host', () => {
        let localRoot: string;

        beforeEach(async () => {
            localRoot = path.join(tools.getControllerDir(), 'node_modules', `iobroker.${LOCAL_ADAPTER}`);
            await fs.mkdir(path.join(localRoot, 'widgets', 'local'), { recursive: true });
            await fs.writeFile(
                path.join(localRoot, 'package.json'),
                JSON.stringify({ name: `iobroker.${LOCAL_ADAPTER}` }),
            );
            await fs.writeFile(path.join(localRoot, 'widgets', 'local', 'customWidgets.js'), 'local');
        });

        afterEach(async () => {
            await fs.rm(localRoot, { recursive: true, force: true });
        });

        it('copies from the package without asking a host', async () => {
            const sendToHost = fakeHost(remoteRoot);
            const mgr = new AdapterFileManager(makeContext(), () => ({ sendToHost }) as any);

            const result = await mgr.fetchAdapterDir({ adapter: LOCAL_ADAPTER, path: 'widgets', target });

            assert.deepEqual(result, { host: 'vitanova', files: ['local/customWidgets.js'] });
            assert.equal(await fs.readFile(path.join(target, 'local', 'customWidgets.js'), 'utf8'), 'local');
            assert.equal(sendToHost.callCount, 0);
        });
    });
});
