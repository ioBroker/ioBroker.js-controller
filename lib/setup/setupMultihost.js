/**
 *      Multihost
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';

/** @class */
function Multihost(options) {
    const fs         = require('fs-extra');
    const tools      = require('../tools.js');
    const configName = tools.getConfigFileName();
    const that       = this;

    options          = options || {};

    const params     = options.params || {};
    const objects    = options.objects;

    function getConfig() {
        let config;
        // read actual configuration
        try {
            if (fs.existsSync(configName)) {
                config = fs.readJSONSync(configName);
            } else {
                config = require('../../conf/' + tools.appName + '-dist.json');
            }
        } catch (e) {
            config = require('../../conf/' + tools.appName + '-dist.json');
        }
        return config;
    }

    function leftPad(text, len) {
        text = text || '';
        if (text.length >= len) {
            return len;
        }
        return new Array(len - text.length).join(' ') + text;
    }

    this.showHosts = function (list) {
        if (!list || !list.length) {
            console.info('No Multihost server found. Make sure iobroker is running on the host where you enabled multihost discovery (and it is not this host)!');
        } else {
            for (let i = 0; i < list.length; i++) {
                console.log((i + 1) + ' | ' + leftPad(list[i].hostname, 20) + ' | ' + (list[i].slave ? 'slave' : ' host') + ' | ' + leftPad(list[i].ip, 20) + ' | ' + JSON.stringify(list[i].info));
            }
        }
    };

    this.browse = function (callback) {
        const MHClient = require('../multihostClient');
        const mhClient = new MHClient();
        mhClient.browse(2000, params.debug, function (err, list) {
            if (err) {
                callback('Multihost discovery client: Cannot browse: ' + err);
            } else {
                callback(null, list);
            }
        });
    };

    function showMHState(config, changed, callback) {
        if (config.multihostService.enabled) {
            let warningShown = false;
            if (config.objects.type === 'file' && (config.objects.host === '127.0.0.1' || config.objects.host === 'localhost')) {
                console.log('Changing objects server to accept connections on all IP addresses.');
                config.objects.host = '0.0.0.0';
                changed = true;
            } else if (config.objects.type === 'redis') {
                warningShown = true;
                console.log('Please check the binding of redis service. By default it is only local: http://download.redis.io/redis-stable/redis.conf\nChange "bind 127.0.0.1" to "bind 0.0.0.0" or to others.');
            }
            if (config.states.type  === 'file' && (config.states.host  === '127.0.0.1' || config.states.host  === 'localhost')) {
                console.log('Changing states server to accept connections on all IP addresses.');
                config.states.host = '0.0.0.0';
                changed = true;
            } else if (config.states.type  === 'redis') {
                !warningShown && console.log('Please check the binding of redis service. By default it is only local: http://download.redis.io/redis-stable/redis.conf\nChange "bind 127.0.0.1" to "bind 0.0.0.0" or to others.');
            }
        }
        if (!changed) {
            console.log('No configuration change needed.');
        } else {
            fs.writeFileSync(configName, JSON.stringify(config, null, 2));
            console.log('Please restart ioBroker for the changes to take effect: "iobroker restart"');
        }
        console.log('\n');
        console.log('Multihost discovery server: ' + (config.multihostService.enabled ? 'enabled' : 'disabled'));
        console.log('Discovery authentication:   ' + (config.multihostService.secure  ? 'enabled' : 'disabled'));
        console.log('Objects:                    ' + config.objects.type + ' on ' + config.objects.host);
        console.log('States:                     ' + config.states.type  + ' on ' + config.states.host);
        callback();
    }

    this.enable = function (isEnable, callback) {
        let changed = false;
        const config = getConfig();
        config.multihostService = config.multihostService || {enabled: false, secure: true};

        if (isEnable && !config.multihostService.enabled) {
            changed = true;
            config.multihostService.enabled = true;
            config.multihostService.password = '';
            console.log('Multihost discovery server activated on this host. If iobroker is currently not running please start befeore trying to discover this host.');
            console.log('Important: Multihost discovery works with UDP packets. Make sure they are routed correctly in your network. If you use Docker you also need to configure this correctly.');
        } else if (!isEnable && config.multihostService.enabled) {
            changed = true;
            config.multihostService.enabled = false;
            config.multihostService.password = '';
            console.log('Multihost discovery server deactivated on this host.');
        }
        if (params.secure === undefined) {
            params.secure = true;
        }

        if (isEnable && (config.multihostService.secure !== params.secure || (config.multihostService.secure && !config.multihostService.password))) {
            changed = true;
            config.multihostService.secure = params.secure;
            console.log('Discovery authentication ' + (params.secure ? 'activated' : 'deactivated') + '.');
            if (config.multihostService.secure) {
                const prompt = require('prompt');
                prompt.message   = '';
                prompt.delimiter = '';
                const schema = {
                    properties: {
                        password: {
                            description: 'Enter secret phrase for connection:',
                            pattern:     /^[^'"]+$/,
                            message:     'No " are allowed',
                            hidden:      true
                        },
                        passwordRepeat: {
                            description: 'Repeat secret phrase for connection:',
                            pattern:     /^[^'"]+$/,
                            message:     'No " are allowed',
                            hidden:      true
                        }
                    }
                };
                prompt.start();

                prompt.get(schema, function (err, password) {
                    if (password && password.password) {
                        if (password.password !== password.passwordRepeat) {
                            callback('Secret phrases are not equal!');
                        } else {
                            objects.getObject('system.config', function (err, obj) {
                                tools.encryptPhrase(obj.native.secret, password.password, function (encoded) {
                                    config.multihostService.password = encoded;
                                    showMHState(config, changed, callback);
                                });
                            });
                        }
                    } else {
                        callback('No secret phrase entered!');
                    }
                });
            } else {
                showMHState(config, changed, callback);
            }
        } else {
            showMHState(config, changed, callback);
        }
    };

    this.status = function (callback) {
        const config = getConfig();
        config.multihostService = config.multihostService || {enabled: false, secure: true};
        showMHState(config, false, callback);
    };

    function readPassword(callback) {
        const readline = require('readline');

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        function hidden(query, callback) {
            const stdin = process.openStdin();
            process.stdin.on('data', function (char) {
                char = char + '';
                switch (char) {
                    case '\n':
                    case '\r':
                    case '\u0004':
                        stdin.pause();
                        break;

                    default:
                        process.stdout.write('\x1B[2K\x1B[200D' + query + new Array(rl.line.length + 1).join('*'));
                        break;
                }
            });

            rl.question(query, function (value) {
                rl.history = rl.history.slice(1);
                callback(value);
            });
        }

        hidden('Enter secret phrase for connection: ', function(password) {
            callback(password);
        });
    }

    function connect(mhClient, ip, pass, callback) {
        mhClient.connect(ip, pass, function (err, oObjects, oStates, ipHost) {
            if (err) {
                callback('Cannot connect to "' + ip + '": ' + err);
            } else if (oObjects && oStates) {
                const config = getConfig();
                config.objects = oObjects;
                config.states  = oStates;
                if ((config.objects.type === 'file' && (config.objects.host === '127.0.0.1' || config.objects.host === 'localhost')) || (config.states.type === 'file' && (config.states.host === '127.0.0.1' || config.states.host === 'localhost'))) {
                    callback('IP Address of the remote host is 127.0.0.1. Connections from this host will not be accepted. Please change the configuration of this host.');
                } else {
                    if (config.states.host === '0.0.0.0') {
                        config.states.host = ipHost;
                    }
                    if (config.objects.host === '0.0.0.0') {
                        config.objects.host = ipHost;
                    }

                    fs.writeFileSync(configName, JSON.stringify(config, null, 2));
                    console.log('Config ok. Please restart ioBroker: "iobroker restart"');
                    callback();
                }
            } else {
                callback('No configuration received!');
            }
        });
    }

    this.connect = function (number, pass, callback) {
        if (typeof pass === 'function') {
            callback = pass;
            pass = null;
        }
        if (typeof number === 'function') {
            callback = number;
            number   = null;
        }
        const MHClient = require('../multihostClient');
        const mhClient = new MHClient();

        mhClient.browse(2000, params.debug, function (err, list) {
            if (err) {
                callback('Cannot browse: ' + err);
            } else {
                that.showHosts(list);

                if (number !== null && number !== undefined && parseInt(number, 10) > 0) {
                    number = parseInt(number, 10);
                    if (list && number < list.length + 1) {
                        if (!pass) {
                            callback('No password defined: please use "multihost connect <NUMBER> <PASSWORD>"');
                        } else {
                            connect(mhClient, list[number - 1].ip, pass, callback);
                        }
                    } else {
                        callback('Invalid index: ' + number);
                    }
                } else
                if (list && list.length) {
                    const readline = require('readline');

                    const rl = readline.createInterface({
                        input:  process.stdin,
                        output: process.stdout
                    });
                    rl.question('Please select host [1]: ', function (answer) {
                        if (answer === '' || answer === null || answer === undefined) {
                            answer = 1;
                        }
                        answer = parseInt(answer, 10) - 1;
                        if (!list[answer]) {
                            rl.close();
                            callback('Invalid index: ' + answer);
                        } else {
                            if (list[answer].auth) {
                                readPassword(function (password) {
                                    if (password) {
                                        connect(mhClient, list[answer].ip, password, callback);
                                    } else {
                                        callback('No password entered!');
                                    }
                                });
                            } else {
                                connect(mhClient, list[answer].ip, null, callback);
                            }
                        }
                    });
                } else {
                    callback(null, list);
                }
            }
        });
    };
}

module.exports = Multihost;
