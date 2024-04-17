import * as tjs from 'ts-json-schema-generator';
import path from 'node:path';
import fs from 'fs-extra';

// eslint-disable-next-line unicorn/prefer-module
const thisDir = __dirname;

// @ts-expect-error no ts module
import getSpdxLicenseIds from 'get-spdx-license-ids';

/**
 * Update contents io iobroker.json schema
 */
function updateIobJSON(): void {
    const config: tjs.Config = {
        path: path.join(thisDir, '..', 'types-dev', 'config.d.ts'),
        tsconfig: path.join(thisDir, '..', 'tsconfig.json'),
        type: 'IoBJson',
        skipTypeCheck: true,
        additionalProperties: false
    };

    const schema = tjs.createGenerator(config).createSchema(config.type);

    fs.writeJSONSync(path.join(thisDir, 'iobroker.json'), schema, { spaces: 2 });
}

/**
 * Updates the license array in io-package json
 */
async function updateLicenseArray(): Promise<void> {
    // get all allowed licenses as array
    const licenses = await getSpdxLicenseIds();
    const ioPackSchema = fs.readJSONSync(path.join(thisDir, 'io-package.json'));
    ioPackSchema.definitions.license.enum = licenses;
    fs.writeJSONSync(path.join(thisDir, 'io-package.json'), ioPackSchema, { spaces: 2 });
}

updateIobJSON();
updateLicenseArray();
