import type { TestContext } from '../_Types';

export function register(it: Mocha.TestFunction, expect: Chai.ExpectStatic, context: TestContext): void {
    const testName = `${context.name} ${context.adapterShortName} files: `;
    const namespace = 'testObject.0';
    const testId = `${namespace}.testFilesObj`;

    // setBinaryState
    it(testName + 'setForeignBinaryState', async () => {
        const objId = `${context.adapter.namespace}.testSetForeignBinaryState`;
        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'state',
            common: {
                role: 'state',
                name: objId,
                read: true,
                write: true,
                type: 'file'
            },
            native: {}
        });

        // now we write a binary state
        await context.adapter.setForeignBinaryStateAsync(objId, Buffer.from('1234'));
    });

    it(testName + 'setBinaryState', async () => {
        const objId = `${context.adapter.namespace}.testSetBinaryState`;

        const receivedPromise = new Promise<void>(resolve => {
            context.onAdapterStateChanged = (id, state) => {
                if (id === objId) {
                    if (typeof state !== 'object') {
                        throw new Error(`Expected object, but got ${typeof state}`);
                    }
                    // @ts-expect-error binary states will be removed soon
                    if (!state?.binary) {
                        throw new Error(`Binary flag does not set`);
                    }
                    if (state.val !== null) {
                        throw new Error(`Value is not null`);
                    }
                    expect(state.ack).to.be.true;
                    resolve();
                }
            };
        });

        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'state',
            common: {
                role: 'state',
                name: objId,
                read: true,
                write: true,
                type: 'file'
            },
            native: {}
        });

        await context.adapter.subscribeForeignStatesAsync(objId);

        context.adapter.setBinaryStateAsync(objId, Buffer.from('1234'));
        await receivedPromise;

        await context.adapter.unsubscribeForeignStatesAsync(objId);
    });

    it(testName + 'delBinaryState', async () => {
        const objId = `${context.adapter.namespace}.testSetBinaryState`;

        const receivedPromise = new Promise<void>(resolve => {
            context.onAdapterStateChanged = (id, state) => {
                if (id === objId) {
                    expect(state).to.be.equal(null);
                    resolve();
                }
            };
        });

        await context.adapter.subscribeForeignStatesAsync(objId);

        context.adapter.delBinaryStateAsync(objId);
        await receivedPromise;

        await context.adapter.unsubscribeForeignStatesAsync(objId);
    });

    it(testName + 'getForeignBinaryState', async () => {
        const objId = `${context.adapter.namespace}.testGetForeignBinaryState`;
        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'state',
            common: {
                role: 'state',
                name: objId,
                read: true,
                write: true,
                type: 'file'
            },
            native: {}
        });

        // now we write a binary state
        await context.adapter.setForeignBinaryStateAsync(objId, Buffer.from('1234'));
        const state = await context.adapter.getForeignBinaryStateAsync(objId);
        expect(state!.toString('utf-8')).to.be.equal('1234');
    });

    it(testName + 'getBinaryState', async () => {
        const objId = `${context.adapter.namespace}.testGetBinaryState`;
        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'state',
            common: {
                role: 'state',
                name: objId,
                read: true,
                write: true,
                type: 'file'
            },
            native: {}
        });

        // now we write a binary state
        await context.adapter.setBinaryStateAsync(objId, Buffer.from('1234'));
        /** @type Buffer */
        const state = await context.adapter.getBinaryStateAsync(objId);
        expect(state!.toString('utf-8')).to.be.equal('1234');
    });

    it(testName + 'writeFile with binary content and subscription', async () => {
        const objId = `vis.0`;
        const fileName = 'testFile.bin';
        const dataBinary = Buffer.from('1234');
        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'meta',
            common: {
                name: 'Files and more',
                type: 'meta.user'
            },
            native: {}
        });

        await context.adapter.subscribeForeignFiles(objId, '*');

        const receivedPromise = new Promise<void>(resolve => {
            context.onAdapterFileChanged = (id, _fileName, size) => {
                if (id === objId && fileName === _fileName) {
                    expect(size).to.be.equal(dataBinary.byteLength);
                    resolve();
                }
            };
        });

        // now we write a file state
        await Promise.all([receivedPromise, context.adapter.writeFileAsync(objId, fileName, dataBinary)]);

        await context.adapter.unsubscribeForeignFiles(objId, '*');

        const { file, mimeType } = await context.adapter.readFileAsync(objId, fileName);

        expect(mimeType).to.be.equal('application/octet-stream');
        expect(file.toString('utf8')).to.be.equal(dataBinary.toString('utf8'));
    });

    it(testName + 'writeFile with textual content', async () => {
        const objId = `vis.0`;
        /** unknown extension but string content should lead to plain text */
        const fileName = 'testFile.fn';
        const dataText = "these are not the droids you're looking for";
        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'meta',
            common: {
                name: 'Files and more',
                type: 'meta.user'
            },
            native: {}
        });

        // now we write a file state
        await context.adapter.writeFileAsync(objId, fileName, dataText);

        const { file, mimeType } = await context.adapter.readFileAsync(objId, fileName);

        expect(mimeType).to.be.equal('text/plain');
        expect(file).to.be.equal(dataText);
    });

    it(testName + 'writeFile without extension should infer text from string content', async () => {
        const objId = `vis.0`;
        /** no extension but string content should lead to plain text */
        const fileName = 'testFile';
        const dataText = "Toto, I've a feeling we're not in Kansas anymore.";
        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'meta',
            common: {
                name: 'Files and more',
                type: 'meta.user'
            },
            native: {}
        });

        // now we write a file state
        await context.adapter.writeFileAsync(objId, fileName, dataText);

        const { file, mimeType } = await context.adapter.readFileAsync(objId, fileName);

        expect(mimeType).to.be.equal('text/plain');
        expect(file).to.be.equal(dataText);
    });

    it(testName + 'writeFile with known extension should be inferred', async () => {
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
                type: 'meta.user'
            },
            native: {}
        });

        // now we write a file state
        await context.adapter.writeFileAsync(objId, fileName, content);

        const { file, mimeType } = await context.adapter.readFileAsync(objId, fileName);

        expect(mimeType).to.be.equal('application/json');
        expect(file).to.be.equal(content);
    });

    it(testName + 'deleteFile', async () => {
        const objId = `vis.0`;
        const fileName = 'testFile.bin';

        await context.adapter.subscribeForeignFiles(objId, '*');

        const receivedPromise = new Promise<void>(resolve => {
            context.onAdapterFileChanged = (id, _fileName, size) => {
                if (id === objId && fileName === _fileName) {
                    expect(size).to.be.equal(null);
                    resolve();
                }
            };
        });

        // now we write a file state
        await Promise.all([receivedPromise, context.adapter.unlinkAsync(objId, fileName)]);

        try {
            await context.adapter.readFileAsync(objId, fileName);
        } catch (error) {
            expect(error.toString()).to.be.equal('Error: Not exists');
        }
    });

    it(testName + 'should create and read file with callback', done => {
        const objects = context.objects;
        objects.setObject(testId, { type: 'meta', native: {} } as ioBroker.SettableMetaObject, err => {
            expect(err).to.be.not.ok;
            objects.writeFile(testId, 'myFile/abc.txt', 'dataInFile', err => {
                err && console.error(`Got ${JSON.stringify(objects.getStatus())}: ${err.stack}`);
                expect(err).to.be.not.ok;

                objects.readFile(testId, 'myFile/abc.txt', null, (err, data, mimeType) => {
                    expect(err).to.be.not.ok;
                    expect(data).to.be.equal('dataInFile');
                    expect(mimeType).to.be.equal('text/plain');
                    objects.rm(testId, 'myFile/*', null, (err, files) => {
                        expect(err).to.be.not.ok;
                        const file = files!.find(f => f.file === 'abc.txt');
                        expect(file!.file).to.be.equal('abc.txt');
                        expect(file!.path).to.be.equal('myFile');
                        objects.readFile(testId, 'myFile/abc.txt', null, (err, _data, _mimeType) => {
                            expect(err!.message).to.be.equal('Not exists');
                            done();
                        });
                    });
                });
            });
        });
    });

    it(testName + 'should create and read file async', async () => {
        const fileDir = 'myFile';
        const fileName = 'abc2.txt';
        const fullFileName = `${fileDir}/${fileName}`;

        const objects = context.objects;
        await objects.setObject(testId, { type: 'meta', native: {} } as ioBroker.SettableMetaObject);

        await objects.writeFile(testId, fullFileName, 'dataInFile');

        const { file, mimeType } = await objects.readFile(testId, fullFileName, null);
        expect(file).to.be.equal('dataInFile');
        expect(mimeType).to.be.equal('text/plain');
        const files = await objects.rmAsync(testId, `${fileDir}/*`, {});
        const deletedFile = files!.find(f => f.file === fileName);
        expect(deletedFile!.file).to.be.equal(fileName);
        expect(deletedFile!.path).to.be.equal(fileDir);
        try {
            await objects.readFile(testId, fullFileName, null);
            expect(1).to.be.equal(2, 'Should have thrown, because file has been deleted');
        } catch (e) {
            expect(e.message).to.be.equal('Not exists');
        }
    });

    it(testName + 'should read directory', done => {
        const objects = context.objects;
        objects.writeFile(testId, 'myFileA/abc1.txt', 'dataInFile', err => {
            expect(err).to.be.not.ok;
            objects.writeFile(testId, 'myFileA/abc2.txt', Buffer.from('ABC'), err => {
                expect(err).to.be.not.ok;
                objects.readDir(testId, 'myFileA/', null, (err, data) => {
                    expect(err).to.be.not.ok;
                    expect(data!.length).to.be.equal(2);
                    expect(data![0].file).to.be.equal('abc1.txt');
                    expect(data![1].file).to.be.equal('abc2.txt');
                    expect(data![1].stats.size).to.be.equal(3);
                    done();
                });
            });
        });
    });

    it(testName + 'should read file and prevent path traversing', done => {
        const objects = context.objects;
        objects.readFile(testId, '../../myFileA/abc1.txt', null, (err, data, _mimeType) => {
            expect(err).to.be.not.ok;
            expect(data).to.be.equal('dataInFile');
            objects.readFile(testId, '/myFileA/abc1.txt', null, (err, data, _mimeType) => {
                expect(err).to.be.not.ok;
                expect(data).to.be.equal('dataInFile');
                objects.readFile(testId, '/../../myFileA/abc1.txt', null, (err, data, _mimeType) => {
                    expect(err).to.be.not.ok;
                    expect(data).to.be.equal('dataInFile');
                    objects.readFile(testId, 'myFileA/../blubb/../myFileA/abc1.txt', null, (err, data, _mimeType) => {
                        expect(err).to.be.not.ok;
                        expect(data).to.be.equal('dataInFile');
                        objects.readFile(
                            testId,
                            '/myFileA/../blubb/../myFileA/abc1.txt',
                            null,
                            (err, data, _mimeType) => {
                                expect(err).to.be.not.ok;
                                expect(data).to.be.equal('dataInFile');
                                objects.readFile(
                                    testId,
                                    '../blubb/../myFileA/abc1.txt',
                                    null,
                                    (err, data, _mimeType) => {
                                        expect(err).to.be.not.ok;
                                        expect(data).to.be.equal('dataInFile');
                                        objects.readFile(
                                            testId,
                                            '/../blubb/../myFileA/abc1.txt',
                                            null,
                                            (err, data, _mimeType) => {
                                                expect(err).to.be.not.ok;
                                                expect(data).to.be.equal('dataInFile');
                                                done();
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    });
                });
            });
        });
    });

    it(testName + 'should unlink file', done => {
        const objects = context.objects;
        objects.unlink(testId, 'myFileA/abc1.txt', null, err => {
            expect(err).to.be.not.ok;
            objects.unlink(testId, 'myFileA/abc1.txt', null, err => {
                expect(err!.message).to.be.equal('Not exists');
                done();
            });
        });
    });

    it(testName + 'should rename file', done => {
        const objects = context.objects;
        objects.writeFile(testId, 'myFile1/abcRename.txt', Buffer.from('abcd'), err => {
            expect(err).to.be.not.ok;
            objects.rename(testId, 'myFile1/abcRename.txt', 'myFileA/abc3.txt', null, err => {
                expect(err).to.be.not.ok;
                objects.readFile(testId, 'myFileA/abc3.txt', null, (err, data, _meta) => {
                    expect(err).to.be.not.ok;
                    expect(data!.toString('utf8')).to.be.equal('abcd');
                    objects.readFile(testId, 'myFile1/abcRename.txt', null, err => {
                        expect(err!.message).to.be.equal('Not exists');
                        done();
                    });
                });
            });
        });
    });

    it(testName + 'should touch file', done => {
        const objects = context.objects;
        objects.readDir(testId, 'myFileA', null, (err, files) => {
            expect(err).to.be.not.ok;
            const file = files!.find(f => f.file === 'abc3.txt');

            setTimeout(() => {
                objects.touch(testId, 'myFileA/abc3.txt', null, err => {
                    expect(err).to.be.not.ok;
                    objects.readDir(testId, 'myFileA', null, (_err, files) => {
                        const file1 = files!.find(f => f.file === 'abc3.txt');
                        expect(file1!.modifiedAt).to.be.not.equal(file!.modifiedAt);
                        done();
                    });
                });
            }, 200);
        });
    });

    it(testName + 'should create directory', done => {
        const objects = context.objects;
        objects.mkdir(testId, 'myFile' + Math.round(Math.random() * 100_000), null, err => {
            expect(err).to.be.not.ok;
            done();
        });
    });

    it(testName + 'should enable file cache', done => {
        const objects = context.objects;
        objects.enableFileCache(true, err => {
            expect(err).to.be.not.ok;
            done();
        });
    });
}

module.exports.register = register;
