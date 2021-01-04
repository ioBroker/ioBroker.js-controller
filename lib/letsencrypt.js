'use strict';

const utils = require('@iobroker/adapter-core'); // Get common adapter utils

function createServer(app, settings, adapter) {
    const log = adapter.log;
    const leSettings = settings.leConfig;

    if (leSettings && !leSettings.email && settings.leEnabled) {
        log.error('Please specify the email address and domains to use Let\'s Encrypt certificates!');
        adapter.terminate ? adapter.terminate(utils.EXIT_CODES.ADAPTER_REQUESTED_TERMINATION) : process.exit(utils.EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);
    } else {
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
            log.error('Lets encrypt Directory does not exist and can not be created as ' + leDir + ': ' + err);
            return null;
        }

        // prepare domains
        if (typeof leSettings.domains === 'string') {
            leSettings.domains = leSettings.domains.split(',');
            for (let d = leSettings.domains.length - 1; d >= 0; d--) {
                leSettings.domains[d] = leSettings.domains[d].trim();
                // delete empty
                !leSettings.domains[d] && leSettings.domains.splice(d, 1);
            }
        }
        // TODO? Tried adding sites in the gl create below but that didn't work.

        const pkg = require('../package.json');
        const gl = require('greenlock').create({
            packageRoot: __dirname,
            configDir: leDir,
            maintainerEmail: leSettings.email,
            cluster: false,
            packageAgent: pkg.name + '/' + pkg.version,
            notify: function (event, details) {
                // TODO: separate out errors, etc.
                log.debug(`Greenlock notify ${event}: ${details}`);
            },
            // Staging for testing environments
            staging: true
        });
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

            log.debug('Init greenlock-express...');
            require('greenlock-express')
                .init({
                    greenlock: gl
                }).ready(glx => {
                    log.debug('Greenlock ready');
                    // The below is from greenlock-express examples/https/server.js
                    //
                    // HTTPS 1.1 is the default
                    // (HTTP2 would be the default but... https://github.com/expressjs/express/issues/3388)
                    //
                    // Get the raw https server:
                    const httpsServer = glx.httpsServer(null, app);
                    httpsServer.listen(settings.port, '0.0.0.0', function () {
                        console.info('Listening on ', httpsServer.address());
                    });

                    // Note:
                    // You must ALSO listen on port 80 for ACME HTTP-01 Challenges
                    // (the ACME and http->https middleware are loaded by glx.httpServer)
                    const httpServer = glx.httpServer();
                    settings.lePort = parseInt(settings.lePort, 10) || 80;
                    httpServer.listen(settings.lePort, '0.0.0.0', function () {
                        console.info('Listening on ', httpServer.address());
                    });
                });
        });
    }
}

exports.createServer = createServer;
