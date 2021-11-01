'use strict';

module.exports = () => {
    const fs = require('fs-extra');
    const {getConfigFileName} = require('@iobroker/js-controller-common').tools;

    const config = fs.readJSONSync(getConfigFileName());
    if (!config.objects) {
        config.objects = {type: 'file'};
    }

    try {
        const path = require.resolve(`@iobroker/db-objects-${config.objects.type}`);
        return require(path).Client;
    } catch {
        console.error(`Installation broken or unknown objects type: ${config.objects.type} configured.`);
        process.exit(101);
    }
};
