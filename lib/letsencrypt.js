'use strict';

/**
 * This method initializes a web server with certificates if needed and returns a promise
 * @param app
 * @param settings
 * @param certificates
 * @param leSettings
 * @param log
 * @param adapter
 * @returns {Promise<unknown>}
 */
async function createServerAsync(app, settings, certificates, leSettings, log, adapter) {
    if (!settings.secure) {
        log.debug('Using http createServer');
        return require('http').createServer(app);
    } else if (!settings.leEnabled) {
        log.debug('Using https createServer');
        return require('https').createServer(certificates, app);
    }
    // prepare domains
    if (typeof leSettings.domains === 'string') {
        leSettings.domains = leSettings.domains.split(',').map(d => d.trim()).filter(d => d);
    }

    if (!leSettings || !leSettings.email || !Array.isArray(leSettings.domains) || !leSettings.domains.length) {
        throw new Error('Please specify the email address and domains to use Let\'s Encrypt certificates!');
    }

    const tools = require('./tools');
    const fs = require('fs-extra');
    let leDir;

    let configPath = tools.getConfigFileName().replace(/\\/g, '/');
    const parts = configPath.split('/');
    parts.pop();
    configPath = parts.join('/');

    if (leSettings.path && (leSettings.path[0] === '/' || leSettings.path.match(/^[A-Za-z]:/))) {
        leDir = leSettings.path;
    } else {
        leDir = configPath + '/' + (leSettings.path || 'letsencrypt');
    }

    try {
        if (!fs.existsSync(leDir)) {
            fs.mkdirSync(leDir);
        }
    } catch (err) {
        throw new Error(`Lets encrypt Directory does not exist and can not be created as ${leDir}: ${err}`);
    }

    // TODO? Tried adding sites in the gl create but that didn't work so is below with gl.add.

    const pkg = require('../package.json');
    const glOpts = {
        packageRoot: __dirname,
        configDir: leDir,
        maintainerEmail: leSettings.email,
        cluster: false,
        packageAgent: pkg.name + '/' + pkg.version,
        notify: (ev, params) => {
            switch (ev) {
                case 'warning':
                    log.warn('[LE] ' + (typeof(params) === 'string' ? params : JSON.stringify(params)));
                    break;
                case 'error':
                    log.error('[LE] ' + (typeof(params) === 'string' ? params : JSON.stringify(params)));
                    break;
                default:
                    // For all other event types, always debug
                    log.debug(`[LE] ${ev}: ` + (typeof(params) === 'string' ? params : JSON.stringify(params)));

                    // Special cases for certificate issue/renewal notices
                    // TODO: possibly check for ev === 'cert_renewal' / 'cert_issue'
                    if (params.status === 'valid' && params.altname) {
                        log.info(`Received new certificate for ${params.altname} via ${params.type}`);
                    } else if (params.renewAt) {
                        log.info(`Certificate for ${params.subject} is valid till ${new Date(params.renewAt).toISOString()}`);
                        adapter && adapter.sendToHost(adapter.host, 'certsUpdated', {validTill: params.renewAt, domain: params.subject, instance: adapter.namespace});
                    }
                    break;
            }
        }
    };

    if (settings.leStaging) {
        log.debug('Greenlock staging enabled');
        glOpts.staging = true;
    }

    const gl = require('greenlock').create(glOpts);

    // Add sites.
    for (const domain of leSettings.domains) {
        log.debug(`Adding to Greenlock: ${domain}`);
        gl.add({ subject: domain, altnames: [domain] });
    }

    await gl.manager.defaults({
        agreeToTerms: true,
        subscriberEmail: leSettings.email
    });

    return new Promise((resolve, reject) => {
        require('greenlock-express').init({
            greenlock: gl
        }).ready(glx => {
            // The below is from greenlock-express examples/https/server.js

            if (settings.leUpdate) {
                // Start the challenge server. Wait for it before resolving (pass back https).
                settings.lePort = parseInt(settings.lePort, 10) || 80;
                const bind = (!settings.bind || settings.bind === '0.0.0.0') ? undefined : settings.bind || undefined;
                // Check port not in use, because catching EADDRINUSE from httpServer.listen not possible.
                adapter.getPort(settings.lePort, bind, port => {
                    if (port !== settings.lePort) {
                        reject(new Error(`Challenge server port ${settings.lePort} already in use`));
                    } else {
                        const httpServer = glx.httpServer();
                        httpServer.listen(settings.lePort, bind, () => {
                            log.info(`Challenge server listening on port ${settings.lePort}`);
                            resolve(glx.httpsServer(null, app));
                        });
                    }
                });
            } else {
                // Just resolve with https.
                // Don't call listen here (or above) because caller will do that
                resolve(glx.httpsServer(null, app));
            }
        });
    });
}

/**
 * This method initializes a web server with certificates if needed. No Let's encrypt support anymore
 * @param app
 * @param settings
 * @param certificates
 * @param leSettings
 * @param log
 * @deprecated
 * @returns {Server}
 */
function createServer(app, settings, certificates, leSettings, log) {
    let server;

    if (settings.secure) {
        if (leSettings && settings.leEnabled) {
            log.info('Please update this adapter to the latest version to allow again to update your certificates.  Using the current certificates');
        }

        try {
            server = require('https').createServer(certificates, app);
        } catch (err) {
            log.error('HTTPS server could not be started: ' + err);
        }
    } else {
        server = require('http').createServer(app);
    }

    return server;
}

module.exports = {
    createServerAsync,
    createServer
};
