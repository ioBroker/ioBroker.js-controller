import * as tjs from 'typescript-json-schema';
import path from 'path';
import fs from 'fs-extra';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const getSpdxLicenseIds = require('get-spdx-license-ids');

/**
 * Update contents io iobroker.json schema
 */
function updateIobJSON() {
    const program = tjs.getProgramFromFiles([path.join(__dirname, '..', 'packages', 'common', 'src', 'index.ts')]);

    const schema = tjs.generateSchema(program, 'IoBrokerJson', { ignoreErrors: true });

    fs.writeJSONSync(path.join(__dirname, 'iobroker.json'), schema, { spaces: 2 });
}

/**
 * Updates the license array in io-package json
 */
async function updateLicenseArray() {
    // get all allowed licenses as array
    const licenses = await getSpdxLicenseIds();
    const ioPackSchema = fs.readJSONSync(path.join(__dirname, 'io-package.json'));
    ioPackSchema.properties.common.properties.license.enum = licenses;
    fs.writeJSONSync(path.join(__dirname, 'io-package.json'), ioPackSchema, { spaces: 2 });
}

updateIobJSON();
updateLicenseArray();
