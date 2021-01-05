'use strict';

function createServer(app, settings, certificates, leSettings, log) {
    return new Promise((resolve, reject) => {
        if (!settings.secure) {
            log.debug('Using http createServer');
            resolve(require('http').createServer(app));
        } else if (!settings.leEnabled) {
            log.debug('Using https createServer');
            resolve(require('https').createServer(certificates, app));
        } else {
            // prepare domains
            // TODO: I presume this is here for backward compatibility so remove in some very future update.
            if (typeof leSettings.domains === 'string') {
                leSettings.domains = leSettings.domains.split(',');
                for (let d = leSettings.domains.length - 1; d >= 0; d--) {
                    leSettings.domains[d] = leSettings.domains[d].trim();
                    // delete empty
                    !leSettings.domains[d] && leSettings.domains.splice(d, 1);
                }
            }

            if (!leSettings || !leSettings.email || !Array.isArray(leSettings.domains) || leSettings.domains.length == 0) {
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

            // for lex outputs
            console.debug = console.debug || console.log;

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
                notify: function (event, details) {
                    // TODO: separate out errors, etc.
                    log.debug(`Greenlock notify ${event}: ${details}`);
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
                            httpServer.listen(settings.lePort, bind, function () {
                                console.info('Listening on ', httpServer.address());
                            });
                            log.info('Challenge server is started on ' + settings.lePort);
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

exports.createServer = createServer;
