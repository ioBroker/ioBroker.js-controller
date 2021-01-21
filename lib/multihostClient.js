/**
 *      Multihost client
 *
 *      Slave multihost functionality
 *
 *      Copyright 2014-2020 bluefox <dogafox@gmail.com>,
 *      MIT License
 *
 */
'use strict';

const dgram  = require('dgram');
const tools  = require('./tools');
let crypto = null;
const port   = 50005;
const MULTICAST_ADDR = '239.255.255.250';

/** @class */
function MHClient(_hostname, _logger, _config, _info) {
    let id = 1;
    let server;
    let timer;

    function stopServer() {
        if (server) {
            try {
                server.close();
            } catch {
                // OK
            }
            server = null;
        }

        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    function sha(secret, salt, callback) {
        // calculate sha256
        crypto = crypto || require('crypto');
        const hash = crypto.createHash('sha256');

        hash.on('readable', function () {
            const data = hash.read();
            if (data) {
                callback(data.toString('hex'));
            }
        });

        hash.write(secret + salt);
        hash.end();
    }

    function startServer(isBroadcast, timeout, onReady, onMessage, onFinished) {
        if (server) {
            onFinished('Some operation still active');
            return;
        }
        server = dgram.createSocket('udp4');
        timeout = parseInt(timeout, 10) || 2000;

        timer = setTimeout(function () {
            stopServer();

            if (onFinished) {
                onFinished(null);
                onFinished = null;
            }

        }, timeout);

        server.on('error',  function (err) {
            stopServer();

            if (onFinished) {
                onFinished(err);
                onFinished = null;
            }
        });

        server.on('message', function (msg, rinfo) {
            try {
                const message = JSON.parse(msg.toString());
                if (onMessage) {
                    if (onMessage(server, message, rinfo)) {
                        stopServer();
                        onFinished = null;
                    }
                }
            } catch {
                console.error('Multihost discovery client: Invalid answer: ' + msg);
            }
        });

        server.on('listening', function (_msg, _rinfo) {
            // var address = server.address();
            if (isBroadcast) {
                server.setBroadcast(true);
            }
            onReady && onReady(server);
        });

        server.bind();
    }

    this.browse = function (timeout, isDebug, callback) {
        const result = [];
        const ownIps = tools.findIPs();

        startServer(true, timeout,
            function onReady(_srv) {
                const text = JSON.stringify({
                    cmd: 'browse',
                    id:  ++id
                });
                server.send(text, 0, text.length, port, MULTICAST_ADDR);
            },
            function onMessage (_srv, msg, rinfo) {
                // ignore own answers
                if (isDebug || rinfo.address !== '127.0.0.1' && ownIps.indexOf(rinfo.address) === -1) {
                    if (msg.result === 'not authenticated') {
                        result.push({ip: rinfo.address, hostname: rinfo.address,  info: 'authentication required', auth: msg.auth});
                    } else if (msg.result === 'ok') {
                        result.push(msg);
                    } else {
                        console.log('Multihost discovery client: Unknown answer: ' + JSON.stringify(msg));
                    }
                }
                if (isDebug) {
                    console.log(JSON.stringify(msg));
                }
            },
            function onFinished(err) {
                callback(err, result);
            }
        );
    };

    this.connect = function (ip, password, callback) {
        startServer(false, 2000,
            function onReady(_srv) {
                const text = JSON.stringify({
                    cmd: 'browse',
                    id:  ++id
                });
                server.send(text, 0, text.length, port, ip);
            },
            function onMessage (_srv, msg, rinfo) {
                if (msg.cmd === 'browse' && msg.id === id) {
                    if (msg.result === 'ok') {
                        if (callback) {
                            if (!msg.objects) {
                                callback('Invalid configuration received: ' + JSON.stringify(msg));
                                callback = null;
                            } else if (!msg.states) {
                                callback('Invalid configuration received: ' + JSON.stringify(msg));
                                callback = null;
                            } else {
                                if (typeof callback === 'function') {
                                    callback(null, msg.objects, msg.states, rinfo.address);
                                }
                            }
                        }
                    } else if (msg.result === 'not authenticated') {
                        if (!password) {
                            if (callback) {
                                callback('not authenticated' + msg);
                                callback = null;
                            }
                        } else {
                            sha(password, msg.salt, function (shaText) {
                                // send password
                                const text = JSON.stringify({
                                    cmd:      'browse',
                                    id:       ++id,
                                    password: shaText
                                });
                                server.send(text, 0, text.length, port, ip);
                            });
                            return false;
                        }
                    } else if (msg.result === 'invalid password') {
                        if (callback) {
                            callback('invalid password');
                            callback = null;
                        }
                    } else {
                        console.log(msg.result);
                    }
                    return true;
                } else {
                    console.warn('Multihost discovery client: Unexpected message: ' + JSON.stringify(msg));
                }
            },
            function onFinished(err) {
                if (callback) {
                    callback(err);
                    callback = null;
                }
            }
        );
    };

    return this;
}

module.exports = MHClient;
