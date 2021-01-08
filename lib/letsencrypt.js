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
function createServerAsync(app, settings, certificates, leSettings, log, adapter) {
    return new Promise((resolve, reject) => {
        if (!settings.secure) {
            log.debug('Using http createServer');
            resolve(require('http').createServer(app));
        } else if (!settings.leEnabled) {
            log.debug('Using https createServer');
            resolve(require('https').createServer(certificates, app));
        } else {
            // prepare domains
            if (typeof leSettings.domains === 'string') {
                leSettings.domains = leSettings.domains.split(',').map(d => d.trim()).filter(d => d);
            }

            if (!leSettings || !leSettings.email || !Array.isArray(leSettings.domains) || !leSettings.domains.length) {
                reject(new Error('Please specify the email address and domains to use Let\'s Encrypt certificates!'));
            }

            const tools = require('./tools');
            const fs = require('fs');
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
                reject(new Error(`Lets encrypt Directory does not exist and can not be created as ${leDir}: ${err}`));
            }

            // TODO? Tried adding sites in the gl create but that didn't work so is below with gl.add.

            const pkg = require('../package.json');
            const glOpts = {
                packageRoot: __dirname,
                configDir: leDir,
                maintainerEmail: leSettings.email,
                cluster: false,
                packageAgent: pkg.name + '/' + pkg.version,
                notify: (event, details) => {
                    let severityFn;
                    switch (event) {
                        case 'warning':
                            severityFn = function (text, arg1, arg2) {
                                if (typeof text === 'object') {
                                    log.warn('[LE] ' + JSON.stringify(text) + (arg1 !== undefined ? ' ' + arg1 : '') + (arg2 !== undefined ? ' ' + arg2 : ''));
                                } else {
                                    log.warn(text + (arg1 !== undefined ? ' ' + arg1 : '') + (arg2 !== undefined ? ' ' + arg2 : ''));
                                }
                            };
                            break;
                        case 'error':
                            severityFn = function (text, arg1, arg2) {
                                if (typeof text === 'object') {
                                    log.error('[LE] ' + JSON.stringify(text) + (arg1 !== undefined ? ' ' + arg1 : '') + (arg2 !== undefined ? ' ' + arg2 : ''));
                                } else {
                                    log.error(text + (arg1 !== undefined ? ' ' + arg1 : '') + (arg2 !== undefined ? ' ' + arg2 : ''));
                                }
                            };
                            break;
                        default:
                            severityFn = function (text, arg1, arg2) {
                                if (typeof text === 'object') {
                                    log.debug('[LE] ' + JSON.stringify(text) + (arg1 !== undefined ? ' ' + arg1 : '') + (arg2 !== undefined ? ' ' + arg2 : ''));
                                    if (text.status === 'valid' && text.altname) {
                                        log.info(`Received new certificate for ${text.altname} via ${text.type}`);
                                    } else if (text.renewAt) {
                                        log.info(`Certificate for ${text.subject} is valid till ${new Date(text.renewAt).toISOString()}`);
                                        adapter && adapter.sendToHost(adapter.host, 'certsUpdated', {validTill: text.renewAt, domain: text.subject, instance: adapter.namespace});
                                    }
                                } else {
                                    log.debug(text + (arg1 !== undefined ? ' ' + arg1 : '') + (arg2 !== undefined ? ' ' + arg2 : ''));
                                }
                            };
                    }
                    severityFn(details);
                }
            };

            if (settings.leStaging) {
                log.debug('Greenlock staging enabled');
                glOpts.staging = true;
            }

            const gl = require('greenlock').create(glOpts);
            gl.manager.defaults({
                agreeToTerms: true,
                subscriberEmail: leSettings.email
            }).then(() => {
                // Add sites.
                // TODO: something seems fishy with the timing of this because on the first run
                // a warning about no sites being configured is found, even though things go on to
                // work perfectly.
                for (const domain of leSettings.domains) {
                    log.debug(`Adding to Greenlock: ${domain}`);
                    gl.add({ subject: domain, altnames: [domain] });
                }

                require('greenlock-express')
                    .init({
                        greenlock: gl
                    }).ready(glx => {
                        // The below is from greenlock-express examples/https/server.js

                        // Start the challenge server if configured
                        if (settings.leUpdate) {
                            const httpServer = glx.httpServer();
                            settings.lePort = parseInt(settings.lePort, 10) || 80;
                            const bind = (!settings.bind || settings.bind === '0.0.0.0') ? undefined : settings.bind || undefined;
                            httpServer.listen(settings.lePort, bind, () =>
                                log.info('Challenge server is started on ' + httpServer.address()));
                        }

                        // Don't call listen here because caller will do that
                        resolve(glx.httpsServer(null, app));
                    });
            }).catch(err => {
                reject(new Error(`Failed to set Greenlock manager defaults: ${err}`));
            });
        }
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