/**
 * Updates the licenses array in the io-package.json schema
 *
 *  2021 foxriver76 <moritz.heusinger@gmail.com>
 */

const getSpdxLicenseIds = require('get-spdx-license-ids');

(async () => {
    // get all allowed licenses as array
    const licenses = await getSpdxLicenseIds();
    const ioPackSchema = require(__dirname + '/io-package.json');
    ioPackSchema.properties.common.properties.license.enum = licenses;
    require('fs-extra').writeJSONSync('io-package.json', ioPackSchema, {spaces: 2});
})();