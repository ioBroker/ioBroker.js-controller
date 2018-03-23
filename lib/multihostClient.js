'use strict';

var dgram  = require('dgram');
var crypto = null;
var port   = 50005;
var MULTICAST_ADDR = '239.255.255.250';

function MHClient(hostname, logger, config, info) {
    var id = 1;
    var server;
    var timer;

    function getIPs() {
        var ifaces = require('os').networkInterfaces();
        var ipArr = [];
        for (var dev in ifaces) {
            if (!ifaces.hasOwnProperty(dev)) continue;

            /*jshint loopfunc:true */
            ifaces[dev].forEach(function (details) {
                //noinspection JSUnresolvedVariable
                if (!details.internal) ipArr.push(details.address);
            });
        }

        return ipArr;
    }

    function stopServer() {
        if (server) {
            try {
                server.close();
            } catch (e) {

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
        var hash = crypto.createHash('sha256');

        hash.on('readable', function () {
            var data = hash.read();
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
            msg = msg.toString();
            try {
                msg = JSON.parse(msg);
                if (onMessage) {
                    if (onMessage(server, msg, rinfo)) {
                        stopServer();
                        onFinished = null;
                    }
                }
            } catch (e) {
                console.error('Invalid answer: ' + msg);
            }
        });

        server.on('listening', function (msg, rinfo) {
            // var address = server.address();
            if (isBroadcast) server.setBroadcast(true);
            onReady && onReady(server);
        });

        server.bind();
    }

    this.browse = function (timeout, isDebug, callback) {
        var result = [];
        var ownIps = getIPs();

        startServer(true, timeout,
            function onReady(srv) {
                var text = JSON.stringify({
                    cmd: 'browse',
                    id:  ++id
                });
                server.send(text, 0, text.length, port, MULTICAST_ADDR);
            },
            function onMessage (srv, msg, rinfo) {
                // ignore own answers
                if (isDebug || rinfo.address !== '127.0.0.1' && ownIps.indexOf(rinfo.address) === -1) {
                    if (msg.result === 'not authenticated') {
                        result.push({ip: rinfo.address, hostname: rinfo.address,  info: 'authentication required', auth: msg.auth});
                    } else if (msg.result === 'ok') {
                        result.push(msg);
                    } else {
                        console.log('Unknown answer: ' + JSON.stringify(msg));
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
            function onReady(srv) {
                var text = JSON.stringify({
                    cmd: 'browse',
                    id:  ++id
                });
                server.send(text, 0, text.length, port, ip);
            },
            function onMessage (srv, msg, rinfo) {
                if (msg.cmd === 'browse' && msg.id === id) {
                    if (msg.result === 'ok') {
                        if (callback) {
                            if (!msg.objects) {
                                if (callback) {
                                    callback('Invalid configuration received: ' + JSON.stringify(msg));
                                    callback = null;
                                }
                            } else if (!msg.states) {
                                if (callback) {
                                    callback('Invalid configuration received: ' + JSON.stringify(msg));
                                    callback = null;
                                }
                            } else {
                                callback && callback(null, msg.objects, msg.states, rinfo.address);
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
                                var text = JSON.stringify({
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
                    console.warn('Unexpected message: ' + JSON.stringify(msg));
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