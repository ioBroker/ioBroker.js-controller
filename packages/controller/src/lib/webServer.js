'use strict';

/**
 * This method initializes a web server with certificates if needed and returns a promise
 * @param app
 * @param settings
 * @param adapter
 * @returns {Promise<unknown>}
 */
async function createServer(app, settings, adapter) {
    if (!settings.certificateCollectionId) {
        adapter.log.debug('No certificate collection configured - using http createServer');
        return require('http').createServer(app);
    }

    // Load certificate collection
    const collection = await adapter.getCertificateCollectionAsync(settings.certificateCollectionId);
    if (!collection) {
        adapter.log.error(
            `Could not find configured certificate collection ID (${settings.certificateCollectionId}) - falling back to insecure http createServer`
        );
        return require('http').createServer(app);
    }

    const options = {
        key: collection.key,
        cert: collection.cert
    };

    // TODO: handle renewal via timer (SNICallback?)
    adapter.log.debug('Using https createServer');
    return require('https').createServer(options, app);
}

module.exports = {
    createServer
};
