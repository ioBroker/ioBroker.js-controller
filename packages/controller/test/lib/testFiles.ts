import type { TestContext } from '../_Types.js';
import assert from 'node:assert/strict';

export function register(it: Mocha.TestFunction, context: TestContext): void {
    const testName = `${context.name} ${context.adapterShortName} files: `;
    const testId = `testFilesObject.0`;

    it(`${testName}writeFile with binary content and subscription`, async () => {
        const objId = `vis.0`;
        const fileName = 'testFile.bin';
        const dataBinary = Buffer.from('1234');
        // create an object of type file first
        await context.adapter.setForeignObject(objId, {
            type: 'meta',
            common: {
                name: 'Files and more',
                type: 'meta.user',
            },
            native: {},
        });

        await context.adapter.subscribeForeignFiles(objId, '*');

        const receivedPromise = new Promise<void>(resolve => {
            context.onAdapterFileChanged = (id, _fileName, size) => {
                if (id === objId && fileName === _fileName) {
                    assert.strictEqual(size, dataBinary.byteLength);
                    resolve();
                }
            };
        });

        // now we write a file state
        await Promise.all([receivedPromise, context.adapter.writeFileAsync(objId, fileName, dataBinary)]);

        await context.adapter.unsubscribeForeignFiles(objId, '*');

        const { file, mimeType } = await context.adapter.readFileAsync(objId, fileName);

        assert.strictEqual(mimeType, 'application/octet-stream');
        assert.strictEqual(file.toString('utf8'), dataBinary.toString('utf8'));
    });

    it(`${testName}writeFile with textual content`, async () => {
        const objId = `vis.0`;
        /** unknown extension but string content should lead to plain text */
        const fileName = 'testFile.fn';
        const dataText = "these are not the droids you're looking for";
        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'meta',
            common: {
                name: 'Files and more',
                type: 'meta.user',
            },
            native: {},
        });

        // now we write a file state
        await context.adapter.writeFileAsync(objId, fileName, dataText);

        const { file, mimeType } = await context.adapter.readFileAsync(objId, fileName);

        assert.strictEqual(mimeType, 'text/plain');
        assert.strictEqual(file, dataText);
    });

    it(`${testName}writeFile without extension should infer text from string content`, async () => {
        const objId = `vis.0`;
        /** no extension but string content should lead to plain text */
        const fileName = 'testFile';
        const dataText = "Toto, I've a feeling we're not in Kansas anymore.";
        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'meta',
            common: {
                name: 'Files and more',
                type: 'meta.user',
            },
            native: {},
        });

        // now we write a file state
        await context.adapter.writeFileAsync(objId, fileName, dataText);

        const { file, mimeType } = await context.adapter.readFileAsync(objId, fileName);

        assert.strictEqual(mimeType, 'text/plain');
        assert.strictEqual(file, dataText);
    });

    it(`${testName}writeFile with known extension should be inferred`, async () => {
        const objId = `vis.0`;
        /** no extension but string content should lead to plain text */
        const fileName = 'testFile.json';
        const dataJson = { quote: "Toto, I've a feeling we're not in Kansas anymore." };
        const content = JSON.stringify(dataJson);
        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'meta',
            common: {
                name: 'Files and more',
                type: 'meta.user',
            },
            native: {},
        });

        // now we write a file state
        await context.adapter.writeFileAsync(objId, fileName, content);

        const { file, mimeType } = await context.adapter.readFileAsync(objId, fileName);

        assert.strictEqual(mimeType, 'application/json');
        assert.strictEqual(file, content);
    });

    it(`${testName}deleteFile`, async () => {
        const objId = `vis.0`;
        const fileName = 'testFile.bin';

        await context.adapter.subscribeForeignFiles(objId, '*');

        const receivedPromise = new Promise<void>(resolve => {
            context.onAdapterFileChanged = (id, _fileName, size) => {
                if (id === objId && fileName === _fileName) {
                    assert.strictEqual(size, null);
                    resolve();
                }
            };
        });

        // now we write a file state
        await Promise.all([receivedPromise, context.adapter.unlinkAsync(objId, fileName)]);

        try {
            await context.adapter.readFileAsync(objId, fileName);
        } catch (error) {
            assert.strictEqual(error.toString(), 'Error: Not exists');
        }
    });

    it(`${testName}should create and read file with callback`, done => {
        const objects = context.objects;
        objects.setObject(
            testId,
            {
                type: 'meta',
                common: {
                    name: 'Meta',
                    type: 'meta.user',
                },
                native: {},
            },
            err => {
                assert.ok(!err);
                objects.writeFile(testId, 'myFile/abc.txt', 'dataInFile', err => {
                    err && console.error(`Got ${JSON.stringify(objects.getStatus())}: ${err.stack}`);
                    assert.ok(!err);

                    objects.readFile(testId, 'myFile/abc.txt', null, (err, data, mimeType) => {
                        assert.ok(!err);
                        assert.strictEqual(data, 'dataInFile');
                        assert.strictEqual(mimeType, 'text/plain');
                        objects.rm(testId, 'myFile/*', null, (err, files) => {
                            assert.ok(!err);
                            const file = files!.find(f => f.file === 'abc.txt');
                            assert.strictEqual(file!.file, 'abc.txt');
                            assert.strictEqual(file!.path, 'myFile');
                            objects.readFile(testId, 'myFile/abc.txt', null, (err, _data, _mimeType) => {
                                assert.strictEqual(err!.message, 'Not exists');
                                done();
                            });
                        });
                    });
                });
            },
        );
    });

    it(`${testName}should create and read file async`, async () => {
        const fileDir = 'myFile';
        const fileName = 'abc2.txt';
        const fullFileName = `${fileDir}/${fileName}`;

        const objects = context.objects;
        await objects.setObject(testId, {
            type: 'meta',
            common: { name: 'test', type: 'meta.user' },
            native: {},
        });

        await objects.writeFile(testId, fullFileName, 'dataInFile');

        const { file, mimeType } = await objects.readFile(testId, fullFileName, null);
        assert.strictEqual(file, 'dataInFile');
        assert.strictEqual(mimeType, 'text/plain');
        const files = await objects.rmAsync(testId, `${fileDir}/*`, {});
        const deletedFile = files!.find(f => f.file === fileName);
        assert.strictEqual(deletedFile!.file, fileName);
        assert.strictEqual(deletedFile!.path, fileDir);
        try {
            await objects.readFile(testId, fullFileName, null);
            assert.fail('Should have thrown, because file has been deleted');
        } catch (e) {
            assert.strictEqual(e.message, 'Not exists');
        }
    });

    it(`${testName}should read directory`, done => {
        const objects = context.objects;
        objects.writeFile(testId, 'myFileA/abc1.txt', 'dataInFile', err => {
            assert.ok(!err);
            objects.writeFile(testId, 'myFileA/abc2.txt', Buffer.from('ABC'), err => {
                assert.ok(!err);
                objects.readDir(testId, 'myFileA/', null, (err, data) => {
                    assert.ok(!err);
                    assert.strictEqual(data!.length, 2);
                    assert.strictEqual(data![0].file, 'abc1.txt');
                    assert.strictEqual(data![1].file, 'abc2.txt');
                    assert.strictEqual(data![1].stats.size, 3);
                    done();
                });
            });
        });
    });

    it(`${testName}should read empty directory`, async () => {
        const objects = context.objects;
        const id = `${testId}.meta.files`;

        await objects.setObject(id, {
            type: 'meta',
            common: { name: 'test', type: 'meta.user' },
            native: {},
        });

        const res = await objects.readDirAsync(id, '');
        assert.strictEqual(res.length, 0);
    });

    it(`${testName}should read empty directory with path`, async () => {
        const objects = context.objects;
        const id = `${testId}.meta.files`;

        const res = await objects.readDirAsync(id, 'random/path');
        assert.strictEqual(res.length, 0);
    });

    it(`${testName}should not read directory without meta object`, async () => {
        const objects = context.objects;
        const id = `${testId}.meta.nonExisting`;

        await assert.rejects(objects.readDirAsync(id, ''), {
            message: `${id} is not an object of type "meta"`,
        });
    });

    it(`${testName}should respond with empty array if calling readDir on a single file`, async () => {
        const objects = context.objects;
        const fileName = 'dir/notADir.txt';

        await objects.writeFileAsync(testId, fileName, 'dataInFile');
        const res = await objects.readDirAsync(testId, fileName);
        assert.strictEqual(res.length, 0);
    });

    it(`${testName}should read file and prevent path traversing`, done => {
        const objects = context.objects;
        objects.readFile(testId, '../../myFileA/abc1.txt', null, (err, data, _mimeType) => {
            assert.ok(!err);
            assert.strictEqual(data, 'dataInFile');
            objects.readFile(testId, '/myFileA/abc1.txt', null, (err, data, _mimeType) => {
                assert.ok(!err);
                assert.strictEqual(data, 'dataInFile');
                objects.readFile(testId, '/../../myFileA/abc1.txt', null, (err, data, _mimeType) => {
                    assert.ok(!err);
                    assert.strictEqual(data, 'dataInFile');
                    objects.readFile(testId, 'myFileA/../blubb/../myFileA/abc1.txt', null, (err, data, _mimeType) => {
                        assert.ok(!err);
                        assert.strictEqual(data, 'dataInFile');
                        objects.readFile(
                            testId,
                            '/myFileA/../blubb/../myFileA/abc1.txt',
                            null,
                            (err, data, _mimeType) => {
                                assert.ok(!err);
                                assert.strictEqual(data, 'dataInFile');
                                objects.readFile(
                                    testId,
                                    '../blubb/../myFileA/abc1.txt',
                                    null,
                                    (err, data, _mimeType) => {
                                        assert.ok(!err);
                                        assert.strictEqual(data, 'dataInFile');
                                        objects.readFile(
                                            testId,
                                            '/../blubb/../myFileA/abc1.txt',
                                            null,
                                            (err, data, _mimeType) => {
                                                assert.ok(!err);
                                                assert.strictEqual(data, 'dataInFile');
                                                done();
                                            },
                                        );
                                    },
                                );
                            },
                        );
                    });
                });
            });
        });
    });

    it(`${testName}should unlink file`, done => {
        const objects = context.objects;
        objects.unlink(testId, 'myFileA/abc1.txt', null, err => {
            assert.ok(!err);
            objects.unlink(testId, 'myFileA/abc1.txt', null, err => {
                assert.strictEqual(err!.message, 'Not exists');
                done();
            });
        });
    });

    it(`${testName}should rename file`, done => {
        const objects = context.objects;
        objects.writeFile(testId, 'myFile1/abcRename.txt', Buffer.from('abcd'), err => {
            assert.ok(!err);
            objects.rename(testId, 'myFile1/abcRename.txt', 'myFileA/abc3.txt', null, err => {
                assert.ok(!err);
                objects.readFile(testId, 'myFileA/abc3.txt', null, (err, data, _meta) => {
                    assert.ok(!err);
                    assert.strictEqual(data!.toString('utf8'), 'abcd');
                    objects.readFile(testId, 'myFile1/abcRename.txt', null, err => {
                        assert.strictEqual(err!.message, 'Not exists');
                        done();
                    });
                });
            });
        });
    });

    it(`${testName}should touch file`, done => {
        const objects = context.objects;
        objects.readDir(testId, 'myFileA', null, (err, files) => {
            assert.ok(!err);
            const file = files!.find(f => f.file === 'abc3.txt');

            setTimeout(() => {
                objects.touch(testId, 'myFileA/abc3.txt', null, err => {
                    assert.ok(!err);
                    objects.readDir(testId, 'myFileA', null, (_err, files) => {
                        const file1 = files!.find(f => f.file === 'abc3.txt');
                        assert.notStrictEqual(file1!.modifiedAt, file!.modifiedAt);
                        done();
                    });
                });
            }, 200);
        });
    });

    it(`${testName}should create directory`, done => {
        const objects = context.objects;
        objects.mkdir(testId, `myFile${Math.round(Math.random() * 100_000)}`, null, err => {
            assert.ok(!err);
            done();
        });
    });

    it(`${testName}should enable file cache`, done => {
        const objects = context.objects;
        objects.enableFileCache(true, err => {
            assert.ok(!err);
            done();
        });
    });
}
