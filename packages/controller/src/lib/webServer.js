'use strict';

const tls = require('tls');

/**
 * This method initializes a web server with certificates if needed and returns a promise
 * @param app
 * @param settings
 * @param adapter
 * @returns {Promise<unknown>}
 */
async function createServer(app, settings, adapter) {
    if (!settings.secure) {
        adapter.log.debug('Secure connection not enabled - using http createServer');
        return require('http').createServer(app);
    }

    // Load certificate collections
    adapter.log.debug('Loading all certificate collections...');
    const collections = await adapter.getCertificateCollectionAsync();
    if (!collections || !Object.keys(collections).length) {
        adapter.log.error('Could not find any certificate collections - falling back to insecure http createServer');
        return require('http').createServer(app);
    }

    let contexts = buildSecureContexts(collections, adapter);

    adapter.subscribeCertificateCollections((err, collections) => {
        if (!err) {
            adapter.log.silly('collections update ' + JSON.stringify(collections));
            contexts = buildSecureContexts(collections, adapter);
        }
    });

    const options = {
        SNICallback: (serverName, callback) => {
            // Find which context to use for this server
            let context = null;
            if (serverName in contexts) {
                // Easy - name is explicitly mentioned
                adapter.log.debug(`Using explicit context for ${serverName}`);
                context = contexts[serverName];
            } else {
                // Check for wildcard
                const serverParts = serverName.split('.');
                if (serverParts.length > 1) {
                    serverParts.shift();
                    serverParts.unshift('*');
                    const wildcard = serverParts.join('.');
                    if (wildcard in contexts) {
                        // OK - wildcard found
                        adapter.log.debug(`Using wildcard context for ${serverName}`);
                        context = contexts[wildcard];
                    }
                }
            }
            if (!context) {
                // Not found above, just use first certificate we have
                // TODO: don't spit out this warning more than once.
                // Although shouldn't throttling repeat messages be a core adapter function?
                adapter.log.warn(
                    `No matching context for ${serverName} - using first certificate collection which will likely cause browser security warnings`
                );
                context = contexts[Object.keys(contexts)[0]];
            }
            callback(null, context);
        }
    };

    adapter.log.debug('Using https createServer');
    return require('https').createServer(options, app);
}

function buildSecureContexts(collections, adapter) {
    adapter.log.debug('buildSecureContexts...');
    const contexts = {};

    for (const [collectionId, collection] of Object.entries(collections)) {
        const context = tls.createSecureContext({
            key: collection.key,
            cert: collection.cert
        });

        for (const domain of collection.domains) {
            adapter.log.debug(`${domain} -> ${collectionId}`);
            contexts[domain] = context;
        }
    }
    return contexts;
}

module.exports = {
    createServer
};
