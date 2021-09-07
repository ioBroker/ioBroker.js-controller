const semver = require('semver');
const fs = require('fs-extra');

const packJSON = fs.readJSONSync(`${__dirname}/packages/controller/package.json`);
const ioPackJSON = fs.readJSONSync(`${__dirname}/packages/controller/io-package.json`);

// ioPack should only contain major.minor.patch -> no prereleases
const version = `${semver.major(packJSON.version)}.${semver.minor(packJSON.version)}.${semver.patch(packJSON.version)}`;

if (ioPackJSON.common.version !== version) {
    ioPackJSON.common.version = version;
    fs.writeJSONSync(`${__dirname}/packages/controller/io-package.json`, ioPackJSON, {'spaces': 2});
}
