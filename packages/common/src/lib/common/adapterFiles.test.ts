import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import {
    ADAPTER_FILE_MAX_CHUNK_SIZE,
    ADAPTER_FILES_MAX_BATCH,
    checkAdapterName,
    decodeChunkData,
    getInstalledAdapterDir,
    listDir,
    readFileChunk,
    readFiles,
    splitRelativePath,
} from './adapterFiles.js';

/**
 * Create a symbolic link, or report that this system does not allow it (Windows without developer mode)
 *
 * @param target what the link points to
 * @param link where the link is created
 * @param type kind of the target
 * @returns whether the link was created
 */
async function trySymlink(target: string, link: string, type: 'file' | 'junction'): Promise<boolean> {
    try {
        await fs.symlink(target, link, type);
        return true;
    } catch (e) {
        if (e.code === 'EPERM') {
            return false;
        }
        throw e;
    }
}

describe('adapterFiles', () => {
    let tmp: string;
    let root: string;

    beforeEach(async () => {
        tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'adapterFiles-'));
        root = path.join(tmp, 'iobroker.test');
        await fs.mkdir(path.join(root, 'widgets', 'test', 'img'), { recursive: true });
        await fs.writeFile(path.join(root, 'widgets', 'test.html'), '<div></div>');
        await fs.writeFile(path.join(root, 'widgets', 'test', 'customWidgets.js'), 'export default {};');
        await fs.writeFile(path.join(root, 'widgets', 'test', 'img', 'icon.png'), Buffer.from([1, 2, 3, 4, 5]));
        await fs.mkdir(path.join(root, 'widgets', 'node_modules', 'x'), { recursive: true });
        await fs.writeFile(path.join(root, 'widgets', 'node_modules', 'x', 'index.js'), '');
        await fs.mkdir(path.join(root, 'widgets', '.git'));
        await fs.writeFile(path.join(root, 'widgets', '.git', 'config'), '');
        await fs.writeFile(path.join(root, 'widgets', '.env'), 'SECRET=1');
        await fs.writeFile(path.join(tmp, 'outside.txt'), 'outside');
    });

    afterEach(async () => {
        await fs.rm(tmp, { recursive: true, force: true });
    });

    describe('checkAdapterName', () => {
        it('accepts adapter names', () => {
            assert.equal(checkAdapterName('wattcycle'), 'wattcycle');
            assert.equal(checkAdapterName('vis-2-widgets-material'), 'vis-2-widgets-material');
        });

        it('refuses everything else', () => {
            for (const name of ['', 'iobroker.vis', 'vis.0', '../x', 'a/b', '-x', 1, null, undefined]) {
                assert.throws(() => checkAdapterName(name), /invalid adapter name/, String(name));
            }
            assert.throws(() => checkAdapterName('js-controller'), /no adapter/);
        });
    });

    describe('splitRelativePath', () => {
        it('splits a relative path', () => {
            assert.deepEqual(splitRelativePath('widgets'), ['widgets']);
            assert.deepEqual(splitRelativePath('widgets/test/customWidgets.js'), [
                'widgets',
                'test',
                'customWidgets.js',
            ]);
        });

        it('refuses paths that are empty, absolute or leave the directory', () => {
            for (const p of [
                '',
                '/etc',
                'widgets/',
                'widgets//x',
                '..',
                'widgets/../..',
                'widgets\\..\\x',
                'C:/x',
                'a\0b',
                5,
                null,
                'x'.repeat(1025),
            ]) {
                assert.throws(() => splitRelativePath(p), /invalid path/, String(p));
            }
        });

        it('refuses hidden files and node_modules', () => {
            assert.throws(() => splitRelativePath('widgets/.env'), /hidden file or "node_modules"/);
            assert.throws(() => splitRelativePath('.'), /hidden file or "node_modules"/);
            assert.throws(() => splitRelativePath('node_modules/x'), /hidden file or "node_modules"/);
            assert.throws(() => splitRelativePath('widgets/Node_Modules/x'), /hidden file or "node_modules"/);
        });
    });

    describe('getInstalledAdapterDir', () => {
        it('refuses an adapter that is not installed', () => {
            assert.throws(
                () => getInstalledAdapterDir('surely-not-installed-adapter'),
                /is not installed on this host/,
            );
        });
    });

    describe('listDir', () => {
        it('lists all files with subdirectories, sorted, without hidden files and node_modules', async () => {
            const files = await listDir(root, 'widgets');
            assert.deepEqual(
                files.map(f => f.path),
                ['test.html', 'test/customWidgets.js', 'test/img/icon.png'],
            );
            const icon = files.find(f => f.path === 'test/img/icon.png')!;
            assert.equal(icon.size, 5);
            assert.equal(typeof icon.mtime, 'number');
        });

        it('lists a subdirectory', async () => {
            const files = await listDir(root, 'widgets/test');
            assert.deepEqual(
                files.map(f => f.path),
                ['customWidgets.js', 'img/icon.png'],
            );
        });

        it('refuses a missing directory and a file', async () => {
            await assert.rejects(() => listDir(root, 'missing'), /does not exist/);
            await assert.rejects(() => listDir(root, 'widgets/test.html'), /is no directory/);
        });

        it('does not follow symbolic links inside the directory', async function () {
            if (!(await trySymlink(tmp, path.join(root, 'widgets', 'up'), 'junction'))) {
                this.skip();
            }
            const files = await listDir(root, 'widgets');
            assert.ok(!files.some(f => f.path.startsWith('up')));
        });

        it('refuses a directory that is a link out of the package', async function () {
            if (!(await trySymlink(tmp, path.join(root, 'out'), 'junction'))) {
                this.skip();
            }
            await assert.rejects(() => listDir(root, 'out'), /leads out of the directory/);
        });
    });

    describe('readFileChunk', () => {
        it('reads a whole small file', async () => {
            const chunk = await readFileChunk(root, 'widgets/test/img/icon.png');
            assert.equal(chunk.size, 5);
            assert.equal(chunk.offset, 0);
            assert.deepEqual(Buffer.from(chunk.data, 'base64'), Buffer.from([1, 2, 3, 4, 5]));
        });

        it('reads a piece and an empty piece at the end', async () => {
            const piece = await readFileChunk(root, 'widgets/test/img/icon.png', 3, 10);
            assert.deepEqual(Buffer.from(piece.data, 'base64'), Buffer.from([4, 5]));
            const end = await readFileChunk(root, 'widgets/test/img/icon.png', 5);
            assert.equal(end.data, '');
            assert.equal(end.size, 5);
        });

        it('refuses invalid offsets and lengths', async () => {
            const file = 'widgets/test/img/icon.png';
            await assert.rejects(() => readFileChunk(root, file, -1), /invalid offset/);
            await assert.rejects(() => readFileChunk(root, file, 1.5), /invalid offset/);
            await assert.rejects(() => readFileChunk(root, file, 0, 0), /invalid length/);
            await assert.rejects(() => readFileChunk(root, file, 0, ADAPTER_FILE_MAX_CHUNK_SIZE + 1), /invalid length/);
        });

        it('refuses directories, hidden files and paths out of the package', async () => {
            await assert.rejects(() => readFileChunk(root, 'widgets/test'), /is no file/);
            await assert.rejects(() => readFileChunk(root, 'widgets/.env'), /hidden file/);
            await assert.rejects(() => readFileChunk(root, '../outside.txt'), /invalid path/);
        });

        it('refuses a file link that leads out of the package', async function () {
            if (!(await trySymlink(path.join(tmp, 'outside.txt'), path.join(root, 'widgets', 'link.txt'), 'file'))) {
                this.skip();
            }
            await assert.rejects(() => readFileChunk(root, 'widgets/link.txt'), /leads out of the directory/);
        });

        it('compresses a piece only if asked for and if it gets smaller', async () => {
            const text = 'export default { name: "test" };\n'.repeat(1000);
            await fs.writeFile(path.join(root, 'widgets', 'big.js'), text);
            await fs.writeFile(path.join(root, 'widgets', 'big.png'), text);

            const plain = await readFileChunk(root, 'widgets/big.js');
            assert.equal(plain.compressed, undefined);
            assert.equal(Buffer.from(plain.data, 'base64').toString(), text);

            const packed = await readFileChunk(root, 'widgets/big.js', 0, undefined, true);
            assert.equal(packed.compressed, true);
            assert.equal(packed.size, text.length);
            assert.ok(packed.data.length < text.length / 10);
            assert.equal((await decodeChunkData(packed, text.length)).toString(), text);

            // already compressed formats and tiny pieces stay as they are
            assert.equal((await readFileChunk(root, 'widgets/big.png', 0, undefined, true)).compressed, undefined);
            assert.equal((await readFileChunk(root, 'widgets/big.js', 0, 100, true)).compressed, undefined);
            // random bytes get bigger with gzip
            await fs.writeFile(path.join(root, 'widgets', 'random.bin'), crypto.randomBytes(4096));
            assert.equal((await readFileChunk(root, 'widgets/random.bin', 0, undefined, true)).compressed, undefined);

            await assert.rejects(() => readFileChunk(root, 'widgets/big.js', 0, undefined, 'yes'), /invalid compress/);
        });
    });

    describe('readFiles', () => {
        it('reads several files from their beginning, in the requested order', async () => {
            const files = await readFiles(root, ['widgets/test/img/icon.png', 'widgets/test.html']);
            assert.deepEqual(
                files.map(f => [f.path, f.size, f.offset, Buffer.from(f.data, 'base64').toString('hex')]),
                [
                    ['widgets/test/img/icon.png', 5, 0, '0102030405'],
                    ['widgets/test.html', 11, 0, Buffer.from('<div></div>').toString('hex')],
                ],
            );
        });

        it('stops after length bytes in total', async () => {
            const files = await readFiles(
                root,
                ['widgets/test/img/icon.png', 'widgets/test.html', 'widgets/test/customWidgets.js'],
                8,
            );
            assert.deepEqual(
                files.map(f => [f.path, f.size, Buffer.from(f.data, 'base64').length]),
                [
                    ['widgets/test/img/icon.png', 5, 5],
                    ['widgets/test.html', 11, 3],
                ],
            );
        });

        it('refuses invalid lists and checks all paths before reading', async () => {
            await assert.rejects(() => readFiles(root, []), /invalid paths/);
            await assert.rejects(() => readFiles(root, 'widgets/test.html'), /invalid paths/);
            await assert.rejects(
                () => readFiles(root, new Array(ADAPTER_FILES_MAX_BATCH + 1).fill('widgets/test.html')),
                /invalid paths/,
            );
            await assert.rejects(() => readFiles(root, ['widgets/test.html', '../outside.txt']), /invalid path/);
            await assert.rejects(() => readFiles(root, ['widgets/test.html', 'widgets/missing']), /does not exist/);
        });
    });

    describe('decodeChunkData', () => {
        it('decodes plain and compressed pieces', async () => {
            const data = Buffer.from('hello hello hello');
            assert.deepEqual(await decodeChunkData({ data: data.toString('base64') }, data.length), data);
            const packed = zlib.gzipSync(data).toString('base64');
            assert.deepEqual(await decodeChunkData({ data: packed, compressed: true }, data.length), data);
        });

        it('refuses pieces that are longer than expected or broken', async () => {
            const bomb = zlib.gzipSync(Buffer.alloc(1_000_000)).toString('base64');
            await assert.rejects(
                () => decodeChunkData({ data: bomb, compressed: true }, 1000),
                /cannot be decompressed/,
            );
            await assert.rejects(() => decodeChunkData({ data: 'aGVsbG8=' }, 2), /longer than expected/);
            await assert.rejects(
                () => decodeChunkData({ data: 'aGVsbG8=', compressed: true }, 10),
                /cannot be decompressed/,
            );
            await assert.rejects(() => decodeChunkData({ data: 5 }, 10), /invalid data/);
        });
    });
});
