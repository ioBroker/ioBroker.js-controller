import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';
import zlib from 'node:zlib';
import { DiskFileManager } from './DiskFileManager.js';
import type { AdapterContext } from '../context.js';
import type { InternalSendToHostOptions } from '../../_Types.js';

const CHUNK = 1024 * 1024;

/**
 * A file of the given size with a recognizable content
 *
 * @param size size of the file in bytes
 */
function makeContent(size: number): Buffer {
    const content = Buffer.alloc(size);
    for (let i = 0; i < size; i++) {
        content[i] = (i * 13) % 253;
    }
    return content;
}

interface FakeHost {
    /** Requests the host received */
    requests: InternalSendToHostOptions[];
    /** The highest number of `readDiskFile` requests that were open at the same time */
    maxParallel: number;
    /** Whether the file was deleted by `deleteDiskFile` */
    deleted: boolean;
}

/**
 * A DiskFileManager on host "here" whose `sendToHost` is answered by a fake js-controller of host "there"
 *
 * @param file content of the only file "there" has: `iobdisk://there/telegram.0/video/1.mp4`
 * @param behaviour what the fake host does differently from a correct one
 * @param behaviour.supported whether the host knows `readDiskFile`
 * @param behaviour.silent whether the host answers at all
 * @param behaviour.changeAt from this offset on the host reports another modification time
 * @param behaviour.failAt from this offset on the requests fail
 * @param behaviour.compress whether the host compresses the pieces, if asked for
 */
function makeManager(
    file: Buffer,
    behaviour: { supported?: boolean; silent?: boolean; changeAt?: number; failAt?: number; compress?: boolean } = {},
): { mgr: DiskFileManager; host: FakeHost } {
    const host: FakeHost = { requests: [], maxParallel: 0, deleted: false };
    let open = 0;
    const sendToHost = async (opts: InternalSendToHostOptions): Promise<any> => {
        host.requests.push(opts);
        assert.equal(opts.hostName, 'there');
        assert.equal(opts.expectReply, true);
        assert.ok(opts.options?.timeout, 'every request needs a timeout, an old host would never answer');
        if (behaviour.silent) {
            throw new Error('Timeout exceeded');
        }
        if (opts.command === 'checkFeatureSupported') {
            return { result: (behaviour.supported ?? true) && opts.message === 'CONTROLLER_DISK_FILES' };
        }
        if (opts.command === 'deleteDiskFile') {
            const { namespace, path: filePath } = opts.message;
            if (filePath === 'video') {
                return { error: `"${filePath}" of ${namespace} is not a file` };
            }
            if (filePath !== 'video/1.mp4' || host.deleted) {
                return { deleted: false };
            }
            host.deleted = true;
            return { deleted: true };
        }
        assert.equal(opts.command, 'readDiskFile');
        const { namespace, path: filePath, offset, length } = opts.message;
        if (namespace !== 'telegram.0' || filePath !== 'video/1.mp4') {
            return { error: `file "${filePath}" of ${namespace} not found` };
        }
        open++;
        host.maxParallel = Math.max(host.maxParallel, open);
        // answer out of order
        await new Promise(resolve => setTimeout(resolve, Math.random() * 10));
        open--;
        if (behaviour.failAt !== undefined && offset >= behaviour.failAt) {
            throw new Error(`Timeout exceeded at ${offset}`);
        }
        const piece = file.subarray(offset, offset + length);
        const compressed = behaviour.compress && opts.message.compress === true;
        return {
            size: file.length,
            mtime: behaviour.changeAt !== undefined && offset >= behaviour.changeAt ? 2 : 1,
            offset,
            data: (compressed ? zlib.gzipSync(piece) : piece).toString('base64'),
            ...(compressed ? { compressed: true } : {}),
        };
    };
    const ctx = {
        namespace: 'assistant.0',
        namespaceLog: 'assistant.0',
        logger: { silly() {}, debug() {}, info() {}, warn() {}, error() {} } as any,
        uiMessagingController: {} as any,
        countOutput: () => {},
        states: null,
        objects: null,
        common: undefined,
        config: {} as ioBroker.AdapterConfig,
        host: 'here',
    } as AdapterContext;
    return { mgr: new DiskFileManager(ctx, () => ({ sendToHost }) as any), host };
}

describe('DiskFileManager on another host', () => {
    const URL = 'iobdisk://there/telegram.0/video/1.mp4';

    it('fetches a file in pieces, several at the same time, in the right order', async () => {
        const content = makeContent(10 * CHUNK + 12_345);
        const { mgr, host } = makeManager(content);

        const result = await mgr.readDiskFile(URL);

        assert.ok(result.equals(content));
        const reads = host.requests.filter(r => r.command === 'readDiskFile');
        assert.equal(reads.length, 11);
        assert.deepEqual(
            reads.map(r => r.message.offset).sort((a, b) => a - b),
            Array.from({ length: 11 }, (_, i) => i * CHUNK),
        );
        assert.ok(host.maxParallel > 1, 'pieces are requested in parallel');
        assert.ok(host.maxParallel <= 4, 'but not all at once');
    });

    it('asks for compressed pieces and unpacks them', async () => {
        const content = Buffer.from('a line of a log file\n'.repeat(150_000));
        const { mgr, host } = makeManager(content, { compress: true });

        const result = await mgr.readDiskFile(URL);

        assert.ok(result.equals(content));
        const reads = host.requests.filter(r => r.command === 'readDiskFile');
        assert.ok(reads.every(r => r.message.compress === true));
    });

    it('checks the host only once', async () => {
        const { mgr, host } = makeManager(makeContent(100));
        await mgr.readDiskFile(URL);
        await mgr.readDiskFile(URL);
        assert.equal(host.requests.filter(r => r.command === 'checkFeatureSupported').length, 1);
    });

    it('reads an empty file', async () => {
        const { mgr } = makeManager(Buffer.alloc(0));
        assert.equal((await mgr.readDiskFile(URL)).length, 0);
    });

    it('streams a file', async () => {
        const content = makeContent(3 * CHUNK + 1);
        const { mgr } = makeManager(content);
        const parts: Buffer[] = [];
        for await (const part of mgr.createDiskFileReadStream(URL)) {
            parts.push(part);
        }
        assert.ok(Buffer.concat(parts).equals(content));
    });

    it('stops when the file changes while it is read', async () => {
        const { mgr } = makeManager(makeContent(5 * CHUNK), { changeAt: 2 * CHUNK });
        await assert.rejects(mgr.readDiskFile(URL), /changed on host "there" while it was fetched/);
    });

    it('reports the error of the host', async () => {
        const { mgr } = makeManager(makeContent(10));
        await assert.rejects(
            mgr.readDiskFile('iobdisk://there/telegram.0/video/2.mp4'),
            /host "there" refused readDiskFile of "telegram.0\/video\/2.mp4": file "video\/2.mp4" of telegram.0 not found/,
        );
    });

    it('says when the js-controller of the host is too old', async () => {
        const { mgr, host } = makeManager(makeContent(10), { supported: false });
        await assert.rejects(mgr.readDiskFile(URL), /js-controller of host "there" is too old/);
        assert.equal(host.requests.filter(r => r.command === 'readDiskFile').length, 0);
    });

    it('says when the host does not answer', async () => {
        const { mgr } = makeManager(makeContent(10), { silent: true });
        await assert.rejects(mgr.readDiskFile(URL), /host "there" does not answer/);
    });

    it('emits errors on the stream', async () => {
        const { mgr } = makeManager(makeContent(10), { silent: true });
        const stream = mgr.createDiskFileReadStream(URL);
        await assert.rejects(
            (async () => {
                for await (const part of stream) {
                    assert.ok(Buffer.isBuffer(part));
                }
            })(),
            /host "there" does not answer/,
        );
    });

    it('leaves no unhandled rejection when reading stops early', async () => {
        const unhandled: unknown[] = [];
        const onUnhandled = (reason: unknown): void => {
            unhandled.push(reason);
        };
        process.on('unhandledRejection', onUnhandled);
        try {
            // the piece at 1 MB fails while the ones behind it are still running and fail as well
            const { mgr } = makeManager(makeContent(8 * CHUNK), { failAt: CHUNK });
            await assert.rejects(mgr.readDiskFile(URL), /Timeout exceeded at 1048576/);
            // let the requests which were still running finish
            await new Promise(resolve => setTimeout(resolve, 50));
            assert.deepEqual(unhandled, []);
        } finally {
            process.off('unhandledRejection', onUnhandled);
        }
    });

    it('deletes a file on the host', async () => {
        const { mgr, host } = makeManager(makeContent(10));
        assert.equal(await mgr.deleteDiskFile(URL), true);
        // gone now
        assert.equal(await mgr.deleteDiskFile(URL), false);
        const deletes = host.requests.filter(r => r.command === 'deleteDiskFile');
        assert.deepEqual(
            deletes.map(r => r.message),
            [
                { namespace: 'telegram.0', path: 'video/1.mp4' },
                { namespace: 'telegram.0', path: 'video/1.mp4' },
            ],
        );
        assert.equal(host.requests.filter(r => r.command === 'checkFeatureSupported').length, 1);
    });

    it('reports when the host cannot delete', async () => {
        const { mgr } = makeManager(makeContent(10));
        await assert.rejects(
            mgr.deleteDiskFile('iobdisk://there/telegram.0/video'),
            /host "there" refused deleteDiskFile of "telegram.0\/video": "video" of telegram.0 is not a file/,
        );
        const old = makeManager(makeContent(10), { supported: false });
        await assert.rejects(old.mgr.deleteDiskFile(URL), /js-controller of host "there" is too old/);
        assert.equal(old.host.requests.filter(r => r.command === 'deleteDiskFile').length, 0);
        await assert.rejects(mgr.deleteDiskFile('iobdisk://there/telegram.0/../x'), /must not contain/);
    });

    it('rejects invalid URLs', async () => {
        const { mgr } = makeManager(makeContent(10));
        await assert.rejects(mgr.readDiskFile('/opt/iobroker/iobroker-data/telegram_0/video/1.mp4'), /not an iobdisk/);
        await assert.rejects(mgr.readDiskFile('iobdisk://there/files/x'), /invalid instance namespace/);
        assert.throws(() => mgr.createDiskFileReadStream('iobdisk://there/telegram.0/../x'), /must not contain/);
    });
});

describe('DiskFileManager on this host', () => {
    const envName = 'IOBROKER_DATA_DIR';
    let oldEnv: string | undefined;
    let dataDir: string;

    before(async () => {
        oldEnv = process.env[envName];
        dataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'iobdisk-adapter-'));
        process.env[envName] = dataDir;
        await fs.mkdir(path.join(dataDir, 'assistant.0', 'audio'), { recursive: true });
        await fs.writeFile(path.join(dataDir, 'assistant.0', 'audio', 'a.ogg'), 'local content');
    });

    after(async () => {
        if (oldEnv === undefined) {
            delete process.env[envName];
        } else {
            process.env[envName] = oldEnv;
        }
        await fs.rm(dataDir, { recursive: true, force: true });
    });

    it('builds the URL of an own file', () => {
        const { mgr } = makeManager(Buffer.alloc(0));
        assert.equal(
            mgr.getDiskFileUrl(path.join(dataDir, 'assistant.0', 'audio', 'a.ogg')),
            'iobdisk://here/assistant.0/audio/a.ogg',
        );
        assert.equal(mgr.getDiskFileUrl('audio/a.ogg'), 'iobdisk://here/assistant.0/audio/a.ogg');
        assert.throws(() => mgr.getDiskFileUrl(path.join(dataDir, 'telegram_0', 'x')), /not inside the data directory/);
    });

    it('reads a file of this host from the disk, without asking any host', async () => {
        const { mgr, host } = makeManager(Buffer.alloc(0));
        const url = 'iobdisk://here/assistant.0/audio/a.ogg';

        assert.equal((await mgr.readDiskFile(url)).toString(), 'local content');
        const parts: Buffer[] = [];
        for await (const part of mgr.createDiskFileReadStream(url)) {
            parts.push(part);
        }
        assert.equal(Buffer.concat(parts).toString(), 'local content');
        assert.equal(host.requests.length, 0);
        await assert.rejects(mgr.readDiskFile('iobdisk://here/assistant.0/audio/b.ogg'), /not found/);
    });

    it('deletes a file of this host from the disk, without asking any host', async () => {
        const { mgr, host } = makeManager(Buffer.alloc(0));
        await fs.writeFile(path.join(dataDir, 'assistant.0', 'audio', 'c.ogg'), 'to delete');
        const url = 'iobdisk://here/assistant.0/audio/c.ogg';

        assert.equal(await mgr.deleteDiskFile(url), true);
        await assert.rejects(fs.stat(path.join(dataDir, 'assistant.0', 'audio', 'c.ogg')), { code: 'ENOENT' });
        assert.equal(await mgr.deleteDiskFile(url), false);
        await assert.rejects(mgr.deleteDiskFile('iobdisk://here/assistant.0/audio'), /is not a file/);
        assert.equal(host.requests.length, 0);
    });
});
