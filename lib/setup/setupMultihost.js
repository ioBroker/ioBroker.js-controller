function Multihost(options) {
    var fs         = require('fs');
    var tools      = require(__dirname + '/../tools.js');
    var configName = tools.getConfigFileName();
    var that       = this;

    options        = options || {};

    if (!options.processExit) throw 'Invalid arguments: processExit is missing';

    var processExit = options.processExit;
    var params      = options.params || {};
    var objects     = options.objects;

    function getConfig() {
        var config;
        // read actual configuration
        try {
            if (fs.existsSync(configName)) {
                config = JSON.parse(fs.readFileSync(configName, 'utf8'));
            } else {
                config = require(__dirname + '/../../conf/' + tools.appName + '-dist.json');
            }
        } catch (e) {
            config = require(__dirname + '/../../conf/' + tools.appName + '-dist.json');
        }
        return config;
    }

    function leftPad(text, len) {
        text = text || '';
        if (text.length >= len) return len;
        return new Array(len - text.length).join(' ') + text;
    }

    this.showHosts = function (list) {
        if (!list || !list.length) {
            console.info('Nothing found');
        } else {
            for (var i = 0; i < list.length; i++) {
                console.log((i + 1) + ' | ' + leftPad(list[i].hostname, 20) + ' | ' + (list[i].slave ? 'slave' : ' host') + ' | ' + leftPad(list[i].ip, 20) + ' | ' + JSON.stringify(list[i].info));
            }
        }
    };

    this.browse = function (callback) {
        var MHClient = require(__dirname + '/../multihostClient');
        var mhClient = new MHClient();
        mhClient.browse(2000, params.debug, function (err, list) {
            if (err) {
                callback('Cannot browse: ' + err);
            } else {
                callback(null, list);
            }
        });
    };

    function showMHState(config, changed, callback) {
        if (config.multihostService.enabled) {
            if (config.objects.type === 'file' && (config.objects.host === '127.0.0.1' || config.objects.host === 'localhost')) {
                console.log('Server accept connections for objects on all IP addresses.');
                config.objects.host = '0.0.0.0';
                changed = true;
            } else if (config.objects.type === 'redis') {
                console.log('Please check the binding of redis service. By default it is only local: http://download.redis.io/redis-stable/redis.conf\nChange "bind 127.0.0.1" to "bind 0.0.0.0" or to others.')
            }
            if (config.states.type  === 'file' && (config.states.host  === '127.0.0.1' || config.states.host  === 'localhost')) {
                console.log('Server accept connections for states on all IP addresses.');
                config.states.host = '0.0.0.0';
                changed = true;
            } else if (config.states.type  === 'redis') {
                console.log('Please check the binding of redis service. By default it is only local: http://download.redis.io/redis-stable/redis.conf\nChange "bind 127.0.0.1" to "bind 0.0.0.0" or to others.')
            }
        }
        if (!changed) {
            console.log('Nothing changed.');
        } else {
            fs.writeFileSync(configName, JSON.stringify(config, null, 2));
            console.log('Please restart ioBroker: "iobroker restart"');
        }
        console.log('\n');
        console.log('Miltihost:      ' + (config.multihostService.enabled ? 'enabled' : 'disabled'));
        console.log('Authentication: ' + (config.multihostService.secure  ? 'enabled' : 'disabled'));
        console.log('Objects:        ' + config.objects.type + ' on ' + config.objects.host);
        console.log('States:         ' + config.states.type  + ' on ' + config.states.host);
        callback();
    }

    this.enable = function (isEnable, callback) {
        var changed = false;
        var config = getConfig();
        config.multihostService = config.multihostService || {enabled: false, secure: true};

        if (isEnable && !config.multihostService.enabled) {
            changed = true;
            config.multihostService.enabled = true;
            config.multihostService.password = '';
            console.log('Miltihost activated.')
        } else if (!isEnable && config.multihostService.enabled) {
            changed = true;
            config.multihostService.enabled = false;
            config.multihostService.password = '';
            console.log('Miltihost deactivated.')
        }
        if (params.secure === undefined) {
            params.secure = true;
        }

        if (isEnable && (config.multihostService.secure !== params.secure || (config.multihostService.secure && !config.multihostService.password))) {
            changed = true;
            config.multihostService.secure = params.secure;
            console.log('Authentication ' + (params.secure ? 'activated' : 'deactivated') + '.');
            if (config.multihostService.secure) {
                var prompt = require('prompt');
                prompt.message   = '';
                prompt.delimiter = '';
                var schema = {
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
                                })
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

    function readPassword(callback) {
        var readline = require('readline');

        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        function hidden(query, callback) {
            var stdin = process.openStdin();
            process.stdin.on('data', function (char) {
                char = char + '';
                switch (char) {
                    case '\n':
                    case '\r':
                    case '\u0004':
                        stdin.pause();
                        break;

                    default:
                        process.stdout.write('\033[2K\033[200D' + query + new Array(rl.line.length + 1).join('*'));
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

    this.connect = function (callback) {
        var MHClient = require(__dirname + '/../multihostClient');
        var mhClient = new MHClient();

        mhClient.browse(2000, params.debug, function (err, list) {
            if (err) {
                callback('Cannot browse: ' + err);
            } else {
                that.showHosts(list);
                if (list && list.length) {
                    var readline = require('readline');

                    var rl = readline.createInterface({
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
                                        mhClient.connect(list[answer].ip, password, function (err, oObjects, oStates, ipHost) {
                                            if (err) {
                                                callback('Cannot connect to "' + list[answer].ip + '": ' + err);
                                            } else if (oObjects && oStates) {
                                                var config = getConfig();
                                                config.objects = oObjects;
                                                config.states  = oStates;
                                                if (config.objects.host === '127.0.0.1' || config.objects.host === 'localhost' || config.states.host === '127.0.0.1' || config.states.host === 'localhost') {
                                                    callback('IP Address of the host is 127.0.0.1. It accepts no connections. Please change.');
                                                } else {
                                                    if (config.states.host === '0.0.0.0') {
                                                        config.states.host = ipHost;
                                                    }
                                                    if (config.objects.host === '0.0.0.0') {
                                                        config.objects.host = ipHost;
                                                    }

                                                    //fs.writeFileSync(configName, JSON.stringify(config, null, 2));
                                                    console.log('Config ok. Please restart ioBroker: "iobroker restart"');
                                                    callback();
                                                }
                                            } else {
                                                callback('No configuration received!');
                                            }
                                        });
                                    } else {
                                        callback('No password entered!');
                                    }
                                });
                            } else {
                                mhClient.connect(list[answer].ip, null, function (err, oObjects, oStates) {
                                    if (err) {
                                        callback('Cannot connect to "' + list[answer].ip + '": ' + err);
                                    } else if (oObjects && oStates) {
                                        var config = getConfig();
                                        config.objects = oObjects;
                                        config.states  = oStates;
                                        fs.writeFileSync(configName, JSON.stringify(config, null, 2));
                                        console.log('Config ok. Please restart ioBroker: "iobroker restart"');
                                        callback();
                                    } else {
                                        callback('No configuration received!');
                                    }
                                });
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