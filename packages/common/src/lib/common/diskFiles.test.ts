import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'fs-extra';
import { realpath } from 'node:fs/promises';
import zlib from 'node:zlib';
import {
    buildDiskFileUrl,
    parseDiskFileUrl,
    isDiskFileUrl,
    toDiskFileLocation,
    resolveDiskFile,
    deleteDiskFile,
    getInstanceDataDirs,
    readDiskFileChunk,
    DISK_FILE_MAX_CHUNK_SIZE,
} from './diskFiles.js';

describe('iobdisk:// URLs', () => {
    it('builds and parses a URL', () => {
        const url = buildDiskFileUrl({ host: 'pi4', namespace: 'telegram.0', path: 'video/2026-11-04_10-00-00.mp4' });
        assert.equal(url, 'iobdisk://pi4/telegram.0/video/2026-11-04_10-00-00.mp4');
        assert.ok(isDiskFileUrl(url));
        assert.deepEqual(parseDiskFileUrl(url), {
            host: 'pi4',
            namespace: 'telegram.0',
            path: 'video/2026-11-04_10-00-00.mp4',
        });
    });

    it('keeps special characters of host and file names', () => {
        const location = { host: 'Host_1.local', namespace: 'vis-2.0', path: 'my videos/a#b?c%.mp4' };
        const url = buildDiskFileUrl(location);
        assert.equal(url, 'iobdisk://Host_1.local/vis-2.0/my%20videos/a%23b%3Fc%25.mp4');
        assert.deepEqual(parseDiskFileUrl(url), location);
    });

    it('normalizes backslashes and "." in the path', () => {
        assert.equal(
            buildDiskFileUrl({ host: 'pi4', namespace: 'telegram.0', path: '.\\video\\.\\1.mp4' }),
            'iobdisk://pi4/telegram.0/video/1.mp4',
        );
    });

    it('rejects paths that leave the data directory', () => {
        for (const bad of ['../iobroker.json', 'video/../../x', '/etc/passwd', 'C:\\Windows\\win.ini', '', 'a\0b']) {
            assert.throws(
                () => buildDiskFileUrl({ host: 'pi4', namespace: 'telegram.0', path: bad }),
                /path of the file/,
                JSON.stringify(bad),
            );
        }
        assert.throws(() => parseDiskFileUrl('iobdisk://pi4/telegram.0/../iobroker.json'));
        assert.throws(() => parseDiskFileUrl('iobdisk://pi4/telegram.0/video/%2E%2E/%2E%2E/x'));
        // an encoded "/" must not become a separator
        assert.throws(() => parseDiskFileUrl('iobdisk://pi4/telegram.0/..%2F..%2Fiobroker.json'));
    });

    it('rejects anything but an instance namespace', () => {
        for (const bad of ['files', 'objects.jsonl', 'telegram', '..', 'a.b.0', '.0']) {
            assert.throws(() => parseDiskFileUrl(`iobdisk://pi4/${bad}/x.mp4`), /invalid instance namespace/, bad);
        }
    });

    it('rejects other URLs and broken ones', () => {
        assert.equal(isDiskFileUrl('iobfile://telegram.0/x'), false);
        assert.equal(isDiskFileUrl(5), false);
        assert.throws(() => parseDiskFileUrl('/opt/iobroker/iobroker-data/telegram_0/x.mp4'));
        assert.throws(() => parseDiskFileUrl('iobdisk:///telegram.0/x.mp4'), /host is missing/);
        assert.throws(() => parseDiskFileUrl('iobdisk://pi4/telegram.0'), /path of the file is missing/);
        assert.throws(() => parseDiskFileUrl('iobdisk://pi4/telegram.0/%E0%A4%A.mp4'), /invalid iobdisk/);
    });
});

describe('iobdisk:// files on this host', () => {
    const envName = 'IOBROKER_DATA_DIR';
    let oldEnv: string | undefined;
    let dataDir: string;
    let videoDir: string;
    const content = Buffer.alloc(2_500_000);

    before(async () => {
        oldEnv = process.env[envName];
        dataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'iobdisk-'));
        process.env[envName] = dataDir;
        for (let i = 0; i < content.length; i++) {
            content[i] = (i * 7) % 251;
        }
        // telegram uses the older directory name "telegram_0"
        videoDir = path.join(dataDir, 'telegram_0', 'video');
        await fs.ensureDir(videoDir);
        await fs.writeFile(path.join(videoDir, '1.mp4'), content);
        await fs.writeFile(path.join(dataDir, 'iobroker.json'), '{"secret":true}');
        await fs.ensureDir(path.join(dataDir, 'test.0'));
        await fs.writeFile(path.join(dataDir, 'test.0', 'a.txt'), 'new layout');
    });

    after(async () => {
        if (oldEnv === undefined) {
            delete process.env[envName];
        } else {
            process.env[envName] = oldEnv;
        }
        await fs.remove(dataDir);
    });

    it('knows both data directories of an instance', () => {
        assert.deepEqual(getInstanceDataDirs('telegram.0'), [
            path.join(dataDir, 'telegram.0'),
            path.join(dataDir, 'telegram_0'),
        ]);
    });

    it('turns an absolute path of the instance into a URL location', () => {
        assert.deepEqual(toDiskFileLocation('pi4', 'telegram.0', path.join(videoDir, '1.mp4')), {
            host: 'pi4',
            namespace: 'telegram.0',
            path: 'video/1.mp4',
        });
        assert.deepEqual(toDiskFileLocation('pi4', 'telegram.0', 'video/1.mp4').path, 'video/1.mp4');
        assert.throws(
            () => toDiskFileLocation('pi4', 'telegram.0', path.join(dataDir, 'iobroker.json')),
            /not inside the data directory/,
        );
        assert.throws(
            () => toDiskFileLocation('pi4', 'telegram.0', path.join(dataDir, 'telegram_00', 'x')),
            /not inside the data directory/,
        );
        assert.throws(() => toDiskFileLocation('pi4', 'telegram.0', path.join(dataDir, 'telegram_0')));
    });

    it('finds files in both directory layouts', async () => {
        assert.equal(await resolveDiskFile('telegram.0', 'video/1.mp4'), await realpath(path.join(videoDir, '1.mp4')));
        assert.equal(await resolveDiskFile('test.0', 'a.txt'), await realpath(path.join(dataDir, 'test.0', 'a.txt')));
        await assert.rejects(resolveDiskFile('telegram.0', 'video/2.mp4'), /not found/);
        await assert.rejects(resolveDiskFile('telegram.0', 'video'), /is not a file/);
        await assert.rejects(resolveDiskFile('telegram.0', '../iobroker.json'), /must not contain/);
    });

    it('does not follow a symbolic link out of the data directory', async function () {
        const link = path.join(dataDir, 'telegram_0', 'config.json');
        try {
            await fs.symlink(path.join(dataDir, 'iobroker.json'), link);
        } catch {
            // creating symbolic links needs extra rights on Windows
            return this.skip();
        }
        await assert.rejects(resolveDiskFile('telegram.0', 'config.json'), /outside its data directory/);
    });

    it('deletes files in both directory layouts', async () => {
        const old = path.join(videoDir, 'old.mp4');
        const fresh = path.join(dataDir, 'test.0', 'b.txt');
        await fs.writeFile(old, 'x');
        await fs.writeFile(fresh, 'y');

        assert.equal(await deleteDiskFile('telegram.0', 'video/old.mp4'), true);
        assert.equal(await fs.pathExists(old), false);
        assert.equal(await deleteDiskFile('test.0', 'b.txt'), true);
        assert.equal(await fs.pathExists(fresh), false);

        // not there (any more): no error
        assert.equal(await deleteDiskFile('telegram.0', 'video/old.mp4'), false);
        assert.equal(await deleteDiskFile('telegram.0', 'nothing/here.mp4'), false);
        assert.equal(await deleteDiskFile('unknown.0', 'x'), false);
        // the other files are still there
        assert.equal(await fs.pathExists(path.join(videoDir, '1.mp4')), true);
        assert.equal(await fs.pathExists(path.join(dataDir, 'iobroker.json')), true);
    });

    it('deletes no directory and nothing outside the data directory', async () => {
        await assert.rejects(deleteDiskFile('telegram.0', 'video'), /is not a file/);
        assert.equal(await fs.pathExists(videoDir), true);
        await assert.rejects(deleteDiskFile('telegram.0', '../iobroker.json'), /must not contain/);
        await assert.rejects(deleteDiskFile('files', 'x'), /invalid instance namespace/);
        await assert.rejects(deleteDiskFile('telegram.0', '/etc/passwd'), /must be relative/);
        assert.equal(await fs.pathExists(path.join(dataDir, 'iobroker.json')), true);
    });

    it('deletes nothing a linked folder leads to', async () => {
        // a junction needs no extra rights on Windows, elsewhere the type is ignored
        await fs.symlink(dataDir, path.join(dataDir, 'telegram_0', 'outside'), 'junction');
        await assert.rejects(deleteDiskFile('telegram.0', 'outside/iobroker.json'), /outside its data directory/);
        assert.equal(await fs.pathExists(path.join(dataDir, 'iobroker.json')), true);
    });

    it('deletes no link as the file and not its target', async function () {
        const fileLink = path.join(dataDir, 'telegram_0', 'link.json');
        try {
            await fs.symlink(path.join(dataDir, 'iobroker.json'), fileLink);
        } catch {
            // creating symbolic links to files needs extra rights on Windows
            return this.skip();
        }
        await assert.rejects(deleteDiskFile('telegram.0', 'link.json'), /is not a file/);
        assert.equal(await fs.pathExists(path.join(dataDir, 'iobroker.json')), true);
        assert.equal((await fs.lstat(fileLink)).isSymbolicLink(), true);
    });

    it('hands out a file in pieces', async () => {
        const first = await readDiskFileChunk('telegram.0', 'video/1.mp4');
        assert.equal(first.size, content.length);
        assert.equal(first.offset, 0);
        assert.equal(typeof first.mtime, 'number');
        assert.deepEqual(Buffer.from(first.data, 'base64'), content.subarray(0, 1024 * 1024));

        const last = await readDiskFileChunk('telegram.0', 'video/1.mp4', 2_000_000, 1024 * 1024);
        assert.equal(last.offset, 2_000_000);
        assert.deepEqual(Buffer.from(last.data, 'base64'), content.subarray(2_000_000));

        const behindTheEnd = await readDiskFileChunk('telegram.0', 'video/1.mp4', 5_000_000);
        assert.equal(behindTheEnd.data, '');
        assert.equal(behindTheEnd.size, content.length);
    });

    it('refuses invalid requests', async () => {
        await assert.rejects(readDiskFileChunk('telegram.0', 'video/1.mp4', -1), /offset/);
        await assert.rejects(readDiskFileChunk('telegram.0', 'video/1.mp4', 1.5), /offset/);
        await assert.rejects(readDiskFileChunk('telegram.0', 'video/1.mp4', 0, DISK_FILE_MAX_CHUNK_SIZE + 1), /length/);
        await assert.rejects(readDiskFileChunk('telegram.0', 'video/1.mp4', 0, undefined, 'yes'), /compress/);
        await assert.rejects(readDiskFileChunk('files', 'x'), /invalid instance namespace/);
        await assert.rejects(readDiskFileChunk('telegram.0', '../iobroker.json'), /must not contain/);
    });

    it('compresses a piece on request, but not a video', async () => {
        const text = 'a line of a log file\n'.repeat(1000);
        await fs.writeFile(path.join(dataDir, 'test.0', 'log.txt'), text);

        const packed = await readDiskFileChunk('test.0', 'log.txt', 0, undefined, true);
        assert.equal(packed.compressed, true);
        assert.equal(zlib.gunzipSync(Buffer.from(packed.data, 'base64')).toString(), text);

        const video = await readDiskFileChunk('telegram.0', 'video/1.mp4', 0, undefined, true);
        assert.equal(video.compressed, undefined);
        assert.deepEqual(Buffer.from(video.data, 'base64'), content.subarray(0, 1024 * 1024));
    });
});
