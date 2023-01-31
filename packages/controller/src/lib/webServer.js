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

    // Load self-signed certificate for fallback
    const selfSignedContext = await getSelfSignedContext(adapter);

    // Load certificate collections
    adapter.log.debug('Loading all certificate collections...');
    const collections = await adapter.getCertificateCollectionAsync();
    if (typeof collections !== 'object' || !Object.keys(collections).length) {
        adapter.log.warn('Could not find any certificate collections - check ACME installation or consider installing');

        if (selfSignedContext) {
            adapter.log.warn('Falling back to self-signed certificate');
        } else {
            // This really should never happen as selfSigned should always be available
            adapter.log.error('Could not find self-signed certificate - falling back to insecure http createServer');
            return require('http').createServer(app);
        }
    }

    let contexts = buildSecureContexts(collections, adapter);

    adapter.subscribeCertificateCollections((err, collections) => {
        if (!err) {
            adapter.log.silly('collections update ' + JSON.stringify(collections));
            contexts = buildSecureContexts(collections, adapter);
            if (!Object.keys(contexts).length) {
                adapter.log.warn('Could not find any certificate collections after update');
                if (!selfSignedContext) {
                    adapter.log.error(
                        'No certificate collections or self-signed certificate available - HTTPS requests will now fail'
                    );
                    // This is very bad and perhaps the adapter should also terminate itself?
                }
            }
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
                // Not found above.
                if (selfSignedContext) {
                    // Use self-signed context
                    // Don't spit out warnings here as this may be common occurrence
                    // and one already emitted at startup.
                    context = selfSignedContext;
                } else {
                    // TODO: don't spit out these messages more than once.
                    // Although shouldn't throttling repeat messages be a core adapter function?

                    // See note above about terminate - if that is implemented no need for this check.
                    if (!Object.keys(contexts).length) {
                        // No selfSignedContext and no contexts - this is very bad!
                        adapter.log.error(`Could not derive secure context for ${serverName}`);
                    } else {
                        adapter.log.warn(
                            `No matching context for ${serverName} - using first certificate collection which will likely cause browser security warnings`
                        );
                        context = contexts[Object.keys(contexts)[0]];
                    }
                }
            }
            callback(null, context);
        }
    };

    adapter.log.debug('Using https createServer');
    return require('https').createServer(options, app);
}

async function getSelfSignedContext(adapter) {
    try {
        const selfSigned = (await adapter.getCertificatesAsync('defaultPublic', 'defaultPrivate'))[0];
        adapter.log.debug('Loaded self signed certificate: ' + JSON.stringify(selfSigned));
        if (selfSigned) {
            // All good
            return tls.createSecureContext(selfSigned);
        }
    } catch (err) {
        adapter.log.error(err);
    }
    // If we got here then we either failed to load or use self-signed certificate.
    adapter.log.warn('Could not create self-signed context for fallback use');
    return null;
}

function buildSecureContexts(collections, adapter) {
    adapter.log.debug('buildSecureContexts...');
    const contexts = {};

    if (typeof collections === 'object') {
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
    }
    return contexts;
}

module.exports = {
    createServer
};
