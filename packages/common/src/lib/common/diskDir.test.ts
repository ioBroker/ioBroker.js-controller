import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { readDiskDir, type DiskDirPlaceholders } from './diskDir.js';

/**
 * The tests list a real directory tree in the temp directory:
 *
 *     base/
 *         outside/secret.txt
 *         root/
 *             .hidden
 *             b.PEM
 *             a.pem
 *             notes.txt
 *             sub/inner.txt
 *             toOutside -> ../outside   (a link out of the root)
 *             toSub -> sub              (a link inside the root)
 */
describe('readDiskDir', () => {
    let base: string;
    let root: string;
    let placeholders: DiskDirPlaceholders;

    before(async () => {
        // the real path, as the temp directory can be a link itself (macOS)
        base = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), 'diskDir-')));
        root = path.join(base, 'root');
        await fs.mkdir(path.join(root, 'sub'), { recursive: true });
        await fs.mkdir(path.join(base, 'outside'));
        await fs.writeFile(path.join(base, 'outside', 'secret.txt'), 'secret');
        await fs.writeFile(path.join(root, '.hidden'), '');
        await fs.writeFile(path.join(root, 'b.PEM'), 'bb');
        await fs.writeFile(path.join(root, 'a.pem'), 'a');
        await fs.writeFile(path.join(root, 'notes.txt'), 'notes');
        await fs.writeFile(path.join(root, 'sub', 'inner.txt'), 'inner');
        // a junction needs no privileges on Windows, the type is ignored elsewhere
        await fs.symlink(path.join(base, 'outside'), path.join(root, 'toOutside'), 'junction');
        await fs.symlink(path.join(root, 'sub'), path.join(root, 'toSub'), 'junction');

        placeholders = { dataDir: base, rootDir: base, homeDir: base };
    });

    after(async () => {
        await fs.chmod(path.join(root, 'sub'), 0o755).catch(() => {});
        await fs.rm(base, { recursive: true, force: true });
    });

    it('lists the directories first, then the files, sorted by name', async () => {
        const answer = await readDiskDir({ root }, placeholders);
        assert.equal(answer.error, undefined);
        assert.equal(answer.root, root);
        assert.equal(answer.path, root);
        assert.equal(answer.parent, null);
        assert.deepEqual(
            answer.entries.map(entry => entry.name),
            ['sub', 'toSub', 'a.pem', 'b.PEM', 'notes.txt'],
        );
        const file = answer.entries.find(entry => entry.name === 'b.PEM')!;
        assert.equal(file.isDir, false);
        assert.equal(file.size, 2);
        assert.equal(file.path, path.join(root, 'b.PEM'));
        assert.equal(typeof file.modified, 'number');
        assert.equal(answer.entries[0].size, undefined);
    });

    it('leaves out a link that leads out of the root', async () => {
        const answer = await readDiskDir({ root }, placeholders);
        assert.equal(
            answer.entries.find(entry => entry.name === 'toOutside'),
            undefined,
        );
        // without a root, the link is listed
        const all = await readDiskDir({ path: root }, placeholders);
        assert.ok(all.entries.find(entry => entry.name === 'toOutside'));
    });

    it('lists the hidden entries only if asked', async () => {
        const answer = await readDiskDir({ root, showHidden: true }, placeholders);
        assert.ok(answer.entries.find(entry => entry.name === '.hidden'));
    });

    it('filters the files, but not the directories', async () => {
        const answer = await readDiskDir({ root, filter: '*.pem; *.nothing' }, placeholders);
        assert.deepEqual(
            answer.entries.map(entry => entry.name),
            ['sub', 'toSub', 'a.pem', 'b.PEM'],
        );
    });

    it('lists only the directories if asked', async () => {
        const answer = await readDiskDir({ root, dirsOnly: true }, placeholders);
        assert.deepEqual(
            answer.entries.map(entry => entry.name),
            ['sub', 'toSub'],
        );
    });

    it('lists a subdirectory, relative or absolute, with the way back to the root', async () => {
        for (const requested of ['sub', path.join(root, 'sub')]) {
            const answer = await readDiskDir({ root, path: requested }, placeholders);
            assert.equal(answer.path, path.join(root, 'sub'));
            assert.equal(answer.parent, root);
            assert.deepEqual(answer.crumbs, [
                { name: root, path: root },
                { name: 'sub', path: path.join(root, 'sub') },
            ]);
            assert.deepEqual(
                answer.entries.map(entry => entry.name),
                ['inner.txt'],
            );
        }
    });

    it('lists the root instead of a path outside of it', async () => {
        for (const requested of ['..', path.join(base, 'outside'), path.join('toOutside'), os.tmpdir()]) {
            const answer = await readDiskDir({ root, path: requested }, placeholders);
            assert.equal(answer.error, undefined);
            assert.equal(answer.path, root, `requested ${requested}`);
        }
    });

    it('lists the directory of a file and names the file', async () => {
        const answer = await readDiskDir({ root, path: path.join(root, 'sub', 'inner.txt') }, placeholders);
        assert.equal(answer.path, path.join(root, 'sub'));
        assert.equal(answer.selected, 'inner.txt');
    });

    it('lists the nearest existing parent of a path that does not exist', async () => {
        const answer = await readDiskDir({ root, path: path.join(root, 'sub', 'gone', 'deeper') }, placeholders);
        assert.equal(answer.path, path.join(root, 'sub'));
        assert.equal(answer.selected, undefined);
    });

    it('resolves the placeholders of the root', async () => {
        const answer = await readDiskDir({ root: '%DATA_DIR%/root' }, placeholders);
        assert.equal(answer.path, root);

        await fs.mkdir(path.join(base, 'myAdapter.0'), { recursive: true });
        const instance = await readDiskDir({ root: '%INSTANCE_DATA_DIR%', instance: 'myAdapter.0' }, placeholders);
        assert.equal(instance.error, undefined);
        assert.equal(instance.path, path.join(base, 'myAdapter.0'));

        const missing = await readDiskDir({ root: '%INSTANCE_DATA_DIR%', instance: '../x' }, placeholders);
        assert.match(missing.error || '', /needs the instance/);

        const unknown = await readDiskDir({ root: '%UNKNOWN%/x' }, placeholders);
        assert.match(unknown.error || '', /Unknown placeholder/);
    });

    it('refuses a root that is relative or does not exist', async () => {
        assert.match((await readDiskDir({ root: 'relative/dir' }, placeholders)).error || '', /absolute/);
        assert.match((await readDiskDir({ root: path.join(base, 'nothing') }, placeholders)).error || '', /not exist/);
    });

    it('leaves out a directory the user may not enter', async function () {
        if (process.platform === 'win32' || process.getuid?.() === 0) {
            // no POSIX permissions, or root may read everything
            this.skip();
        }
        await fs.chmod(path.join(root, 'sub'), 0o000);
        try {
            const answer = await readDiskDir({ root }, placeholders);
            assert.equal(
                answer.entries.find(entry => entry.name === 'sub'),
                undefined,
            );
        } finally {
            await fs.chmod(path.join(root, 'sub'), 0o755);
        }
    });
});
