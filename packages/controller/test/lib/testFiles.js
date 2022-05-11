/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

function register(it, expect, context) {
    const testName = `${context.name} ${context.adapterShortName} files: `;
    // chmodFile
    // readDir
    // unlink
    // rename
    // mkdir

    // setBinaryState
    it(testName + 'setForeignBinaryState', async () => {
        const objId = `${context.adapter.namespace}.testSetForeignBinaryState`;
        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'state',
            common: {
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

        const receivedPromise = new Promise(resolve => {
            context.onAdapterStateChanged = (id, state) => {
                if (id === objId) {
                    if (typeof state !== 'object') {
                        throw new Error(`Expected object, but got ${typeof state}`);
                    }
                    if (!state.binary) {
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

        const receivedPromise = new Promise(resolve => {
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
                name: objId,
                read: true,
                write: true,
                type: 'file'
            },
            native: {}
        });

        // now we write a binary state
        await context.adapter.setForeignBinaryStateAsync(objId, Buffer.from('1234'));
        /** @type Buffer */
        const state = await context.adapter.getForeignBinaryStateAsync(objId);
        expect(state.toString('utf-8')).to.be.equal('1234');
    });

    it(testName + 'getBinaryState', async () => {
        const objId = `${context.adapter.namespace}.testGetBinaryState`;
        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'state',
            common: {
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
        expect(state.toString('utf-8')).to.be.equal('1234');
    });

    it(testName + 'writeFile', async () => {
        const objId = `vis.0`;
        const fileName = 'testFile.bin';
        const dataBinary = Buffer.from('1234');
        // create an object of type file first
        await context.adapter.setForeignObjectAsync(objId, {
            type: 'meta',
            common: {
                type: 'meta.user'
            },
            native: {}
        });

        await context.adapter.subscribeForeignFiles(objId, '*');

        const receivedPromise = new Promise(resolve => {
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

        /** @type Buffer */
        const { file, mimeType } = await context.adapter.readFileAsync(objId, fileName);

        expect(mimeType).to.be.equal('text/javascript');
        expect(file.toString('utf8')).to.be.equal(dataBinary.toString('utf8'));
    });

    it(testName + 'deleteFile', async () => {
        const objId = `vis.0`;
        const fileName = 'testFile.bin';

        await context.adapter.subscribeForeignFiles(objId, '*');

        const receivedPromise = new Promise(resolve => {
            context.onAdapterFileChanged = (id, _fileName, size) => {
                if (id === objId && fileName === _fileName) {
                    expect(size).to.be.equal(null);
                    resolve();
                }
            };
        });

        // now we write a file state
        await Promise.all([receivedPromise, context.adapter.unlinkAsync(objId, fileName)]);

        /** @type Buffer */
        try {
            await context.adapter.readFileAsync(objId, fileName);
        } catch (error) {
            expect(error.toString()).to.be.equal('Error: Not exists');
        }
    });
}

module.exports.register = register;
