'use strict';

function createServer(app, settings, certificates, leSettings, log) {
    let server;

    const leLog = function (debug, arg1, arg2, arg3) {
        if (debug) {
            const args = Array.prototype.slice.call(arguments);
            args.shift(); // remove debug argument
            // skip "no match"
            if (args[0][0] === 'n' && args[0][1] === 'o') return;
            log.info(arg1 + (arg2 || '') + (arg3 || ''));
        }
    };

    if (settings.secure) {
        if (leSettings && !leSettings.email && settings.leEnabled) {
            log.error('Please specify the email address and domains to use Let\'s Encrypt certificates!');
        }

        if (leSettings && leSettings.email && leSettings.domains && settings.leEnabled) {
            const tools = require('./tools');
            const tls   = require('tls');
            const fs    = require('fs');
            const LE    = require('greenlock');
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

            if (!fs.existsSync(leDir)) fs.mkdirSync(leDir);

            // prepare domains
            if (typeof leSettings.domains === 'string') {
                leSettings.domains = leSettings.domains.split(',');
                for (let d = leSettings.domains.length - 1; d >= 0; d--) {
                    leSettings.domains[d] = leSettings.domains[d].trim();
                    if (!leSettings.domains[d]) leSettings.domainss.splice(d, 1);
                }
            }

            const lex = LE.create({
                version:         'v02',
                debug:           true,
                configDir:       leDir,
                agreeTos:        true,
                store:           require('./letsencryptStore.js').create({debug: true, log: leLog}),
                server:          'https://acme-v02.api.letsencrypt.org/directory', //'staging',
                email:           leSettings.email,
                approvedDomains: leSettings.domains,
                log:             leLog
            });

            if (settings.leUpdate) {
                settings.lePort = parseInt(settings.lePort, 10) || 80;
                // handles acme-challenge and redirects to https
                // used for validation of requests like  http://example.com/.well-known/acme-challenge/BLABALBAL
                require('http').createServer(lex.middleware(function redirectHttps(req, res) {
                    res.setHeader('Location', `https://${req.headers.host}:${settings.port}${req.url}`);
                    res.statusCode = 302;
                    res.end('<!-- Hello Developer Person! Please use HTTPS instead -->');
                })).listen(settings.lePort, () => {
                    log.info('LetsEncrypt challenge server is started on ' + settings.lePort);
                });
            }

            const options    = JSON.parse(JSON.stringify(certificates));
            const defaultTls = tls.createSecureContext(certificates);
            let hostTls;
            let running;

            options.SNICallback = function (hostname, cb) {
                if (leSettings.domains.indexOf(hostname) !== -1) {
                    if (settings.leUpdate) {
                        if (running === true) {
                            cb(null, hostTls || defaultTls);
                        } else
                        if (running) {
                            running.push(cb);
                        } else {
                            running = [cb];
                            return lex.httpsOptions.SNICallback(hostname, (err, tls) => {
                                if (tls) log.debug('Got valid certificates from letsencrypt');
                                if (err) log.error('Cannot get certificates: ' + err);
                                lex.debug = false;
                                hostTls = tls;
                                for (let r = 0; r < running.length; r++) {
                                    running[r](err, tls || defaultTls);
                                }
                                running = true;
                            });
                        }
                    } else {
                        if (!hostTls) {
                            // validate certificates
                            lex.check({domains: leSettings.domains}).then(certInfo => {
                                if (certInfo) {
                                    hostTls = tls.createSecureContext({
                                        key:  certInfo.privkey   || certInfo.key,      // privkey.pem
                                        cert: certInfo.fullchain || certInfo.cert,     // fullchain.pem (cert.pem + '\n' + chain.pem)
                                        ca:   certInfo.ca
                                    });
                                    cb(null, hostTls);
                                } else {
                                    log.error('No letsencrypt certificates found in "' + leDir + '"');
                                    cb(null, defaultTls);
                                    // do not register domain
                                    /*
                                    if (!running) {
                                        running = [cb];
                                        lex.letsencrypt.register({
                                            domains:    leSettings.domains,
                                            email:      leSettings.email,
                                            agreeTos:   true
                                        }, function (err, certInfo) {
                                            //log.debug("[LEX] '" + hostname + "' register completed", err && err.stack || null, certInfo);
                                            if ((!err || !err.stack) && !certInfo) {
                                                log.error((new Error('[LEX] SANITY FAIL: no error and yet no certs either')).stack);
                                            }
                                            if (certInfo) {
                                                hostTls = tls.createSecureContext({
                                                    key:  certInfo.privkey   || certInfo.key,      // privkey.pem
                                                    cert: certInfo.fullchain || certInfo.cert,     // fullchain.pem (cert.pem + '\n' + chain.pem)
                                                    ca:   certInfo.ca
                                                });
                                                for (var r = 0; r < running.length; r++) {
                                                    running[r](null, hostTls);
                                                }
                                            } else {
                                                 for (var r = 0; r < running.length; r++) {
                                                     running[r](null, defaultTls);
                                                 }
                                            }
                                            running = true;
                                        });
                                    } else {
                                        if (running === true) {
                                            cb(null, defaultTls);
                                        } else {
                                            running.push(cb);
                                        }
                                    }
                                    */
                                }
                            },
                            err => {
                                err && log.error(err);
                                cb(null, defaultTls);
                            });
                        } else {
                            cb(null, hostTls);
                        }
                    }
                } else {
                    cb(null, defaultTls);
                }
            };

            server = require('https').createServer(options, lex.middleware(app));
        } else {
            server = require('https').createServer(certificates, app);
        }
    } else {
        server = require('http').createServer(app);
    }

    return server;
}

exports.createServer = createServer;
