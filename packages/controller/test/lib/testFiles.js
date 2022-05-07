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
                    resolve();
                }
            };
        });

        // now we write a binary state
        return Promise.all([receivedPromise, context.adapter.setBinaryStateAsync(objId, Buffer.from('1234'))]);
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

        /** @type Buffer */
        const { data, mimeType } = await context.adapter.readFileAsync(objId, fileName);

        expect(mimeType).to.be.equal('application/bin');
        expect(data.toString('utf8')).to.be.equal(dataBinary.toString('utf8'));
    });
}

module.exports.register = register;
