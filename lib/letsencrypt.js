'use strict';

async function createServer(app, settings, certificates, leSettings, log) {
    if (!settings.secure) {
        log.debug('Using http createServer');
        return require('http').createServer(app);
    } else if (!settings.leEnabled) {
        log.debug('Using https createServer');
        return require('https').createServer(certificates, app);
    }

    // If not satisfied with regular HTTP/HTTPS server above, drop through here and
    // use Greenlock to automatically request/renew certificates.

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

    if (!leSettings || !leSettings.email || !Array.isArray(leSettings.domains) || leSettings.domains.length === 0) {
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
        notify: function (event, details) {
            let severityFn;
            switch (event) {
                case 'warning':
                    severityFn = log.warn;
                    break;
                case 'error':
                    severityFn = log.error;
                    break;
                default:
                    severityFn = log.debug;
            }
            severityFn(details);
        }
    };
    if (settings.leStaging) {
        log.debug('Greenlock staging enabled');
        glOpts.staging = true;
    }
    try {
        const gl = require('greenlock').create(glOpts);
        await gl.manager.defaults({
            agreeToTerms: true,
            subscriberEmail: leSettings.email
        });
        // Add sites.
        // TODO: something seems fishy with the timing of this because on the first run
        // a warning about no sites being configured is found, even though things go on to
        // work perfectly.
        for (const domain of leSettings.domains) {
            log.debug(`Adding to Greenlock: ${domain}`);
            gl.add({ subject: domain, altnames: [domain] });
        }

        // There is no async version of greenlock-express init so wrap it.
        return await(new Promise(resolve => {
            require('greenlock-express').init({
                greenlock: gl
            }).ready(glx => {
                // The below is from greenlock-express examples/https/server.js

                // Start the challenge server if configured
                if (settings.leUpdate) {
                    const httpServer = glx.httpServer();
                    settings.lePort = parseInt(settings.lePort, 10) || 80;
                    const bind = (!settings.bind || settings.bind === '0.0.0.0') ? undefined : settings.bind || undefined;
                    httpServer.listen(settings.lePort, bind, function () {
                        log.info('Listening on ', httpServer.address());
                    });
                    log.info('Challenge server is started on ' + settings.lePort);
                }

                // Don't call listen here because caller will do that
                resolve(glx.httpsServer(null, app));
            });
        }));
    } catch (err) {
        throw new Error(`Failed to set Greenlock manager defaults: ${err}`);
    }
}

module.exports = {
    createServer: createServer
};