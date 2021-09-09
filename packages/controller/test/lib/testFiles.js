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
    // readFile
    // writeFile

    // setBinaryState
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

        // now we write a binary state
        await context.adapter.setBinaryStateAsync(objId, Buffer.from('1234'));
    });

    // getBinaryState
}

module.exports.register = register;
