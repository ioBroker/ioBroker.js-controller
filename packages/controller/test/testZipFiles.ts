import assert from 'node:assert/strict';
import JSZip from 'jszip';
import { zipFiles } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';

/** The files of one object ID, by their path */
type FakeFiles = Record<string, string>;

/** What a fake objects client was asked to store */
interface FakeObjects {
    /** The client to hand to `zipFiles` */
    client: ObjectsClient;
    /** The objects that were written, by their ID */
    written: Record<string, any>;
}

/**
 * Create an objects client which only knows what `zipFiles` asks for
 *
 * @param files the files of the object ID, by their path without the leading slash
 * @param unreadable paths of files that cannot be read
 * @returns the client and what it was asked to store
 */
function createObjects(files: FakeFiles, unreadable: string[] = []): FakeObjects {
    const written: Record<string, any> = {};

    const client = {
        readDirAsync(_id: string, dir: string): Promise<ioBroker.ReadDirResult[]> {
            const prefix = dir ? `${dir}/` : '';
            const entries = new Map<string, boolean>();
            for (const file of Object.keys(files)) {
                if (!file.startsWith(prefix)) {
                    continue;
                }
                const [first, ...rest] = file.substring(prefix.length).split('/');
                entries.set(first, rest.length > 0 || entries.get(first) === true);
            }
            if (!entries.size) {
                return Promise.reject(new Error('Not exists'));
            }
            return Promise.resolve([...entries].map(([file, isDir]) => ({ file, isDir })));
        },
        readFile(_id: string, name: string): Promise<{ file: string; mimeType: string }> {
            if (unreadable.includes(name)) {
                return Promise.reject(new Error('Permission denied'));
            }
            return Promise.resolve({ file: files[name], mimeType: 'text/plain' });
        },
        setObject(id: string, obj: any): Promise<{ id: string }> {
            written[id] = obj;
            return Promise.resolve({ id });
        },
    };

    return { client: client as unknown as ObjectsClient, written };
}

/**
 * Unpack a base64 encoded zip archive
 *
 * @param base64 the archive
 * @returns the content of every file in it, by its name
 */
async function unzip(base64: string): Promise<Record<string, string>> {
    const zip = await new JSZip().loadAsync(Buffer.from(base64, 'base64'));
    const result: Record<string, string> = {};
    for (const name of Object.keys(zip.files)) {
        if (!zip.files[name].dir) {
            result[name] = await zip.files[name].async('string');
        }
    }
    return result;
}

/**
 * Pack objects into a zip archive the way `readObjectsAsZip` does: one JSON file per object
 *
 * @param objects the objects by the path of their file
 * @returns the archive
 */
function zipObjects(objects: Record<string, unknown>): Promise<Buffer> {
    const zip = new JSZip();
    for (const [name, obj] of Object.entries(objects)) {
        zip.file(name, typeof obj === 'string' ? obj : JSON.stringify(obj));
    }
    return zip.generateAsync({ type: 'nodebuffer' });
}

describe('zipFiles', () => {
    describe('readDirAsZip', () => {
        it('packs all files of the directory and its subdirectories', async () => {
            const { client } = createObjects({
                'widgets/a.txt': 'A',
                'widgets/sub/b.txt': 'B',
                'other/c.txt': 'C',
            });

            const base64 = await zipFiles.readDirAsZip(client, 'zipfilestest.0', '/widgets');

            assert.ok(base64);
            assert.deepEqual(await unzip(base64), { 'a.txt': 'A', 'sub/b.txt': 'B' });
        });

        it('answers with nothing for a directory without files', async () => {
            const { client } = createObjects({ 'other/c.txt': 'C' });

            assert.equal(await zipFiles.readDirAsZip(client, 'zipfilestest.0', 'widgets'), undefined);
        });

        it('leaves a file out that cannot be read, as long as another one could be packed', async () => {
            const { client } = createObjects({ 'widgets/a.txt': 'A', 'widgets/b.txt': 'B' }, ['widgets/b.txt']);

            const base64 = await zipFiles.readDirAsZip(client, 'zipfilestest.0', 'widgets');

            assert.ok(base64);
            assert.deepEqual(await unzip(base64), { 'a.txt': 'A' });
        });

        it('rejects if no file at all could be packed', async () => {
            const { client } = createObjects({ 'widgets/a.txt': 'A' }, ['widgets/a.txt']);

            await assert.rejects(
                zipFiles.readDirAsZip(client, 'zipfilestest.0', 'widgets'),
                /Cannot read file "widgets\/a.txt"/,
            );
        });

        it('still answers a callback, given in place of the options', async () => {
            const { client } = createObjects({ 'widgets/a.txt': 'A' });
            let answer: { err?: Error | null; base64?: string } | undefined;

            await zipFiles.readDirAsZip(client, 'zipfilestest.0', 'widgets', (err?: Error | null, base64?: string) => {
                answer = { err, base64 };
            });

            assert.ok(answer);
            assert.equal(answer.err, null);
            assert.deepEqual(await unzip(answer.base64!), { 'a.txt': 'A' });
        });

        it('hands an error to the callback instead of rejecting', async () => {
            const { client } = createObjects({ 'widgets/a.txt': 'A' }, ['widgets/a.txt']);
            const errors: (Error | null | undefined)[] = [];

            const result = await zipFiles.readDirAsZip(client, 'zipfilestest.0', 'widgets', {}, err =>
                errors.push(err),
            );

            assert.equal(result, undefined);
            assert.equal(errors.length, 1);
            assert.match(errors[0]!.message, /Cannot read file/);
        });
    });

    describe('writeObjectsAsZip', () => {
        it('stores every object of the archive below the root ID', async () => {
            const { client, written } = createObjects({});
            const data = await zipObjects({
                'views/main.json': { type: 'state', common: { name: 'main' } },
                'top.json': { type: 'folder', common: { name: 'top' } },
            });

            await zipFiles.writeObjectsAsZip(client, 'zipfilestest.0', '', data);

            assert.deepEqual(Object.keys(written).sort(), ['zipfilestest.0.top', 'zipfilestest.0.views.main']);
            assert.equal(written['zipfilestest.0.views.main'].common.name, 'main');
        });

        it('rejects with the objects that are not valid JSON, after storing the others', async () => {
            const { client, written } = createObjects({});
            const data = await zipObjects({ 'good.json': { type: 'folder', common: {} }, 'bad.json': '{ not json' });

            await assert.rejects(
                zipFiles.writeObjectsAsZip(client, 'zipfilestest.0', '', data),
                /Cannot parse "zipfilestest.0.bad"/,
            );
            assert.deepEqual(Object.keys(written), ['zipfilestest.0.good']);
        });

        it('hands an error to the callback instead of rejecting', async () => {
            const { client } = createObjects({});
            const errors: (Error | null | undefined)[] = [];

            await zipFiles.writeObjectsAsZip(client, 'zipfilestest.0', '', Buffer.from('this is no zip'), {}, err =>
                errors.push(err),
            );

            assert.equal(errors.length, 1);
            assert.ok(errors[0] instanceof Error);
        });

        it('calls the callback without an error on success', async () => {
            const { client } = createObjects({});
            const errors: (Error | null | undefined)[] = [];

            await zipFiles.writeObjectsAsZip(
                client,
                'zipfilestest.0',
                '',
                await zipObjects({ 'a.json': { type: 'folder', common: {} } }),
                {},
                err => errors.push(err),
            );

            assert.deepEqual(errors, [null]);
        });
    });
});
