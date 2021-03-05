/**
 *      Multihost server
 *
 *      Master multihost functionality
 *
 *      Copyright 2014-2020 bluefox <dogafox@gmail.com>,
 *      MIT License
 *
 */

'use strict';
const dgram          = require('dgram');
const tools          = require('./tools');
const PORT           = 50005;
const MULTICAST_ADDR = '239.255.255.250';

/** @class */
function MHServer(hostname, logger, config, info, ips, secret) {
    const count     = 0;
    const buffer    = {};
    const lastFrame = {};
    const authList  = {};

    let server      = null;
    let initTimer   = null;
    let stopped     = false;
    let crypto;

    config = Object.assign({}, config); // make a copy

    if (config.objects) {
        config.objects = {
            type:     config.objects.type,
            host:     config.objects.host,
            port:     config.objects.port,
            user:     config.objects.user,
            pass:     config.objects.pass,
            options:  config.objects.options,
            maxQueue: config.objects.maxQueue
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
            setImmediate(() => {
                const text = JSON.stringify(msg);
                try {
                    server.send(text, 0, text.length, rinfo.port, rinfo.address);
                } catch (e) {
                    logger.warn(`host.${hostname} Multi-host discovery server: cannot send answer to ${rinfo.address}:${rinfo.port}: ${e}`);
                }
            });
        }
    }

    // delete all old connections
    function checkAuthList(ts) {
        ts = ts || new Date().getTime();
        for (const id of Object.keys(authList)) {
            if (!authList[id]) {
                delete authList[id];
            } else if (ts - authList[id].ts > 31000) {
                delete authList[id];
            }
        }
    }

    function sha(secret, salt, callback) {
        // calculate sha256
        crypto = crypto || require('crypto');
        const hash = crypto.createHash('sha256');

        hash.on('readable', () => {
            const data = hash.read();
            data && callback(data.toString('hex'));
        });

        hash.write(secret + salt);
        hash.end();
    }

    // hello => auth => browse
    function process(msg, rinfo) {
        if (!msg) {
            return;
        }

        const ts = new Date().getTime();
        checkAuthList(ts);

        const id = rinfo.address + ':' + rinfo.port;

        switch (msg.cmd) {
            case 'browse':
                if (secret && msg.password && authList[id]) {
                    return sha(secret, authList[id].salt, shaText => {
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
                                slave:    !tools.isLocalObjectsDbServer(config.objects.type, config.objects.host),
                                result:   'ok'
                            }, rinfo);
                        }
                    });
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
                        slave:    !tools.isLocalObjectsDbServer(config.objects.type, config.objects.host),
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
        stopped = false;
        if (initTimer) {
            clearTimeout(initTimer);
            initTimer = null;
        }

        if (count > 10) {
            return logger.warn('host.' + hostname + ' Multi-host discovery server: Port ' + PORT + ' is occupied. Service stopped.');
        }

        server = dgram.createSocket({type: 'udp4', reuseAddr: true});

        server.on('error', err => {
            logger.error('host.' + hostname + ' Multi-host discovery server: error: ' + err.stack);
            server.close();
            server = null;

            initTimer = initTimer || setTimeout(() => {
                initTimer = null;
                this.init();
            }, 5000);
        });

        server.on('close', _err => {
            server = null;

            if (!initTimer && !stopped) {
                initTimer = setTimeout(() => {
                    initTimer = null;
                    this.init();
                }, 5000);
            }
        });

        server.on('message', (msg, rinfo) => {
            // following messages are allowed
            const text = msg.toString();
            const now  = new Date().getTime();
            const id = rinfo.address + ':' + rinfo.port;

            for (const ids in buffer) {
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
                logger.debug(`host.${hostname} Multi-host discovery server: Message from ${rinfo.address} ignored: ${text}`);
            } else {
                buffer[id] = (buffer[id] || '') + msg.toString();
                if (buffer[id] && buffer[id][buffer[id].length - 1] === '}') {
                    try {
                        const data = JSON.parse(buffer[id]);
                        buffer[id] = '';
                        if (data) {
                            process(data, rinfo);
                        }
                    } catch {
                        // may be not yet complete.
                    }
                }
            }
        });

        server.on('listening', () => {
            try {
                server.addMembership(MULTICAST_ADDR);
            } catch {
                logger.warn(`host.${hostname} Multi-host discovery server: Multicast membership could not be added.`);
            }
            const address = server.address();
            logger.info(`host.${hostname} Multi-host discovery server: service started on ${address.address}:${address.port}`);
        });

        server.bind(PORT);
    };

    this.close = function (callback) {
        stopped = true;
        if (initTimer) {
            clearTimeout(initTimer);
            initTimer = null;
        }
        if (server) {
            try {
                server.close(callback);
                server = null;
            } catch {
                server = null;
                callback && callback();
            }
        } else if (callback) {
            callback();
        }
    };

    this.init();

    return this;
}

module.exports = MHServer;
