function Multihost(options) {
    var fs         = require('fs');
    var tools      = require(__dirname + '/../tools.js');
    var configName = tools.getConfigFileName();
    var that       = this;
    var secret     = 'a68r7sdf87s65&534regedge'; // must be equal with mutlihostClient.js

    options        = options || {};

    if (!options.processExit) throw 'Invalid arguments: processExit is missing';

    var processExit = options.processExit;
    var params      = options.params || {};

    function getConfig() {
        // read actual configuration
        try {
            if (fs.existsSync(configName)) {
                config = JSON.parse(fs.readFileSync(configName));
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
            console.log('Authentication ' + (params.secure ? 'activated' : 'deactivated') + '.')
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
                            config.multihostService.password = require('crypto').createHmac('sha256', secret).update(password.password).digest('hex');
                            showMHState(config, changed, callback);
                        }
                    } else {
                        callback('No secret phrase entered!');
                    }
                });
                return;
            }
        }
        showMHState(config, changed, callback);
    };

    this.connect = function (callback) {
        var MHClient = require(__dirname + '/../multihostClient');
        var mhClient = new MHClient();

        mhClient.browse(2000, params.debug, function (err, list) {
            if (err) {
                console.error('Cannot browse: ' + err);
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
                                        }
                                    }
                                };
                                prompt.start();

                                prompt.get(schema, function (err, password) {
                                    if (password && password.password) {
                                        if (0 && password.password !== password.passwordRepeat) {
                                            callback('Secret phrases are not equal!');
                                        } else {
                                            mhClient.connect(list[answer].ip, password.password, function (err, oObjects, oStates) {
                                                if (err) {
                                                    callback('Cannot connect to "' + list[answer].ip + '": ' + err);
                                                } else if (oObjects && oStates) {
                                                    var config = getConfig();
                                                    config.objects = oObjects;
                                                    config.states = oStates;
                                                    //fs.writeFileSync(configName, JSON.stringify(config, null, 2));
                                                    console.log('Config ok. Please restart ioBroker: "iobroker restart"');
                                                    callback();
                                                } else {
                                                    callback('No configuration received!');
                                                }
                                            });
                                        }
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
                }
            }
        });
    };
}

module.exports = Multihost;