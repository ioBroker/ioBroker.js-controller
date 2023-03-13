import * as tjs from 'ts-json-schema-generator';
import path from 'path';
import fs from 'fs-extra';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const getSpdxLicenseIds = require('get-spdx-license-ids');

/**
 * Update contents io iobroker.json schema
 */
function updateIobJSON(): void {
    const config: tjs.Config = {
        path: path.join(__dirname, '..', 'types-dev', 'config.d.ts'),
        tsconfig: path.join(__dirname, '..', 'tsconfig.json'),
        type: 'IoBJson',
        skipTypeCheck: true,
        additionalProperties: false
    };

    const schema = tjs.createGenerator(config).createSchema(config.type);

    fs.writeJSONSync(path.join(__dirname, 'iobroker.json'), schema, { spaces: 2 });
}

/**
 * Updates the license array in io-package json
 */
async function updateLicenseArray(): Promise<void> {
    // get all allowed licenses as array
    const licenses = await getSpdxLicenseIds();
    const ioPackSchema = fs.readJSONSync(path.join(__dirname, 'io-package.json'));
    ioPackSchema.properties.common.properties.license.enum = licenses;
    fs.writeJSONSync(path.join(__dirname, 'io-package.json'), ioPackSchema, { spaces: 2 });
}

updateIobJSON();
updateLicenseArray();
