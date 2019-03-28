const config = require('../config');
const http = !config.secure ? require('http') : require('https');
const express = require('express');
const logger  = new require('./logger')();
const port = normalizePort(process.env.PORT || config.port || 443);

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

    app.app.use(express.static(config.public));

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
