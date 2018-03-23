'use strict';
var dgram          = require('dgram');
var port           = 50005;
var MULTICAST_ADDR = '239.255.255.250';

function MHServer(hostname, logger, config, info, ips, secret) {
    var server    = null;
    var count     = 0;
    var initTimer = null;
    var buffer    = {};
    var lastFrame = {};
    var crypto;

    var that      = this;
    var authList  = {};
    config = Object.assign({}, config); // make a copy

    if (config.objects) {
        config.objects = {
            type: config.objects.type,
            host: config.objects.host,
            port: config.objects.port,
            user: config.objects.user,
            pass: config.objects.pass
        };
    }
    if (config.states) {
        config.states = {
            type:     config.states.type,
            host:     config.states.host,
            port:     config.states.port,
            user:     config.states.user,
            pass:     config.states.pass,
            options:  config.states.options,
            maxQueue: config.states.maxQueue
        };
    }

    function send(msg, rinfo) {
        if (server) {
            setImmediate(function () {
                var text = JSON.stringify(msg);
                try {
                    server.send(text, 0, text.length, rinfo.port, rinfo.address);
                } catch (e) {
                    logger.warn('host.' + hostname + ' cannot send answer to  ' + rinfo.address + ':' + rinfo.port + ': ' + e);
                }
            });
        }
    }

    // delete all old connections
    function checkAuthList(ts) {
        ts = ts || new Date().getTime();
        for (var id in authList) {
            if (authList.hasOwnProperty(id)) {
                if (!authList[id]) {
                    delete authList[id];
                } else if (ts - authList[id].ts > 31000) {
                    delete authList[id];
                }
            }
        }
    }

    function isSlave(oHost, sHots, ownIps) {
        return !(oHost === 'localhost' || oHost === '127.0.0.1' || ownIps.indexOf(oHost) !== -1);
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

    // hello => auth => browse
    function process(msg, rinfo) {
        if (!msg) return;

        var ts = new Date().getTime();
        checkAuthList(ts);

        var id = rinfo.address + ':' + rinfo.port;

        switch (msg.cmd) {
            case 'browse':
                if (secret && msg.password && authList[id]) {
                    sha(secret, authList[id].salt, function (shaText) {
                        if (shaText !== msg.password) {
                            send({
                                auth:   config.multihostService.secure,
                                cmd:    msg.cmd,
                                id:     msg.id,
                                result: 'invalid password'
                            }, rinfo);
                        } else {
                            authList[id].auth = true;
                            send({
                                auth:     config.multihostService.secure,
                                cmd:      msg.cmd,
                                id:       msg.id,
                                objects:  config.objects,
                                states:   config.states,
                                info:     info,
                                hostname: hostname,
                                slave:    isSlave(config.objects.host, config.states.host, ips),
                                result:   'ok'
                            }, rinfo);
                        }
                    });
                    return;
                 }

                if (!config.multihostService.secure || (authList[id] && authList[id].auth)) {
                    send({
                        auth:     config.multihostService.secure,
                        cmd:      msg.cmd,
                        id:       msg.id,
                        objects:  config.objects,
                        states:   config.states,
                        info:     info,
                        hostname: hostname,
                        slave:    isSlave(config.objects.host, config.states.host, ips),
                        result:   'ok'
                    }, rinfo);
                } else {
                    authList[id] = {
                        time: ts,
                        salt: (Math.random() * 1000000 + ts).toString().substring(0, 16),
                        auth: false
                    };
                    // padding
                    if (authList[id].salt.length < 16) {
                        authList[id].salt += new Array(16 - authList[id].salt.length).join('_');
                    }
                    send({
                        auth:   config.multihostService.secure,
                        cmd:    msg.cmd,
                        id:     msg.id,
                        result: 'not authenticated',
                        salt:   authList[id].salt
                    }, rinfo);
                }
                break;

            default:
                send({
                    cmd:     msg.cmd,
                    id:      msg.id,
                    result:  'unknown command'
                }, rinfo);
                break;
        }
    }

    this.init = function () {
        if (initTimer) {
            clearTimeout(initTimer);
            initTimer = null;
        }

        if (count > 10) {
            logger.warn('host.' + hostname + ' Port ' + port + ' is occupied. Service stopped.');
            return;
        }

        server = dgram.createSocket('udp4');

        server.on('error', function (err) {
            logger.error('host.' + hostname + ' multihost service error: ' + err.stack);
            server.close();
            server = null;

            if (!initTimer) {
                initTimer = setTimeout(function () {
                    initTimer = null;
                    that.init();
                }, 5000);
            }
        });

        server.on('close', function (err) {
            server = null;

            if (!initTimer) {
                initTimer = setTimeout(function () {
                    initTimer = null;
                    that.init();
                }, 5000);
            }
        });

        server.on('message', function (msg, rinfo) {
            // following messages are allowed
            var text = msg.toString();
            var now  = new Date().getTime();
            var id = rinfo.address + ':' + rinfo.port;

            for (var ids in buffer) {
                if (!lastFrame[ids]) {
                    delete buffer[ids];
                } else if (now - lastFrame[ids] > 1000) {
                    delete buffer[ids];
                    delete lastFrame[ids];
                }
            }

            if (lastFrame[id] && now - lastFrame[id] > 1000) {
                buffer[id] = '';
            }

            lastFrame[id] = now;

            if (!buffer[id] && text[0] !== '{') {
                // ignore message
                logger.warn('host.' + hostname + ' Message ignored: ' + text);
            } else {
                buffer[id] = (buffer[id] || '') + msg.toString();
                if (buffer[id] && buffer[id][buffer[id].length - 1] === '}') {
                    try {
                        var data = JSON.parse(buffer[id]);
                        buffer[id] = '';
                        if (data) {
                            process(data, rinfo);
                        }
                    } catch (e) {
                        // may be not yet complete.
                    }
                }
            }
        });

        server.on('listening', function () {
            server.addMembership(MULTICAST_ADDR);
            var address = server.address();
            logger.warn('host.' + hostname + ' multihost service started on ' + address.address + ':' + address.port);
        });

        server.bind(50005);
    };

    this.close = function (callback) {
        if (initTimer) {
            clearTimeout(initTimer);
            initTimer = null;
        }
        if (server) {
            try {
                server.close(callback);
                server = null;
            } catch (e) {
                server = null;
                callback && callback()
            }
        } else if (callback) {
            callback();
        }
    };

    this.init();

    return this;
}

module.exports = MHServer;