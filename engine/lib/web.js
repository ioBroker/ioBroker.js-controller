'use strict';

const config = require('../config');
const http = !config.secure ? require('http') : require('https');
const express = require('express');
const bodyParser = require('body-parser');
const logger  = new require('./logger')();
const path = require('path');
const fs = require('fs');
const port = normalizePort(process.env.PORT || config.port || 443);
const ExpressBrute = require('express-brute');
const x509 = require('x509');

const bruteforce = new ExpressBrute(new ExpressBrute.MemoryStore(), {freeRetries: 5});

const app = {
    app: express(),
    server: null,
};

function init() {
    let httpsOptions;
    if (!config.secure) {
        httpsOptions = {};
    } else {
        httpsOptions = {
            key:  fs.readFileSync(config.certs.key   || (__dirname + '/certs/cert.key')),
            cert: fs.readFileSync(config.certs.cert  || (__dirname + '/certs/cert.crt')),
            ca:   fs.readFileSync(config.certs.chain || (__dirname + '/certs/chain.crt'))
        };
    }

    if (config.sites) {
        config.sites.forEach(site => {
            console.log(`Install path ${site.route} => ${site.path}`);
            app.app.use(site.route, (req, res, next) => {
                if (req.url.endsWith('.html')) {
                    req.url = req.url.replace(/\.html$/, '.htm');
                } else {
                    if (req.url.endsWith('/')) {
                        req.url += 'index.htm';
                    }
                }

                // console.log(`${site.route}[${req.method}]: ${req.url} => ${site.path}${req.url.split('?')[0]}`);

                if (req.url.startsWith('/.git')) {
                    res.status(404).send('not found');
                } else {
                    express.static(site.path)(req, res, next);
                }
            });
        });
    }

    app.app.use(express.static(path.join(__dirname, '..', config.public)));

    app.app.use(bodyParser.json({limit: 50000000, type: 'application/json'}));

    // redirect install scripts
    app.app.get('/fix.sh', (req, res) => res.redirect(301, 'https://iobroker.net/fix.sh'));
    app.app.get('/install.sh', (req, res) => res.redirect(301, 'https://iobroker.net/install.sh'));

    app.app.post('/', bruteforce.prevent, (req, res) => {
        if (!req.query.file) {
            return res.status(501).json({error: 'no file name found'})
        }
        if (req.query.secret !== config.secret) {
            console.error('invalid secret ' + req.query.secret);
            return res.status(401).json({error: 'invalid secret'})
        }
        req.brute.reset(() => {
            if (!fs.existsSync(path.join(config.public, 'data'))) {
                fs.mkdirSync(path.join(config.public, 'data'));
            }

            console.log('upload ' + path.join(config.public, 'data', req.query.file.replace(/[^.\w]/g, '_')));
            if (req.body.html) {
                fs.writeFileSync(path.join(config.public, 'data', req.query.file.replace(/[^.\w]/g, '_')), req.body.html);
            } else {
                fs.writeFileSync(path.join(config.public, 'data', req.query.file.replace(/[^.\w]/g, '_')), typeof req.body === 'object' ? JSON.stringify(req.body) : req.body);
            }
            res.json({result: 'ok'});
        });
    });

    if (!config.secure) {
        app.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET');
            res.header('Access-Control-Allow-Headers', 'Content-Type');

            next();
        });
    }

    // Create HTTP(s) server.
    if (!config.secure) {
        app.server = http.createServer(app.app);
    } else {
        app.server = http.createServer(httpsOptions, app.app);
    }

    // Listen on provided port, on all network interfaces.
    app.server.listen(port, config.bind);

    app.server.on('error',     onError);
    app.server.on('listening', onListening);

    return app;
}

// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event.
function onListening() {
    const addr = app.server.address();
    const bind = (typeof addr === 'string')
        ? 'pipe ' + addr
        : 'port ' + addr.port;

    logger.log('WEB Side started on ' + bind);
}

// Normalize a port into a number, string, or false.
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

module.exports = init;
