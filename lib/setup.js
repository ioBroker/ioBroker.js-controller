/* eslint-disable no-inner-declarations */
/**
 *
 *  ioBroker Command Line Interface (CLI)
 *
 *  7'2014-2020 bluefox <dogafox@gmail.com>
 *         2014 hobbyquaker <hq@ccu.io>
 *
 */

/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
'use strict';

// TODO need info about progress of stopping

const fs                    = require('fs-extra');
const pathLib               = require('path');
const tools                 = require('./tools.js');
const cli                   = require('./cli/index.js');
const EXIT_CODES            = require('./exitCodes');
const {enumHosts}           = require('./cli/cliTools');
const deepClone             = require('deep-clone');
const { isDeepStrictEqual } = require('util');

// @ts-ignore
require('events').EventEmitter.prototype._maxListeners = 100;
process.setMaxListeners(0);

/** @type {import('yargs')} */
let yargs;

function initYargs() {
    yargs = require('yargs')
        .scriptName(tools.appName)
        .locale('en')// otherwise it could be mixed, because our implementations are in english
        .version(false) // disable yargs own version handling, because we have our own depending on passed instances
        .completion('_createCompletion', false) // can be created via iob _createCompletion >> ~/.bashrc or ~/.bash_profile for OSX
        .command('setup', 'Setup ioBroker', {
            redis: {
                describe: 'Setup as redis',
                type: 'boolean'
            },
            objects: {
                describe: 'Objects <host>',
                default: '127.0.0.1',
                type: 'number'
            },
            states: {
                describe: 'States <host>',
                default: '127.0.0.1',
                type: 'number'
            },
            'port <port>': {
                describe: 'Port of redis',
                default: 6379,
                type: 'number'
            },
            custom: {
                describe: 'Custom setup',
                type: 'boolean'
            },
            first: {
                describe: 'Initial setup',
                type: 'boolean'
            }
        })
        .command('start', 'Starts the js-controller', yargs => {
            yargs
                .command('all', 'Starts js-controller and all adapters')
                .command('<adapter>[.<instance>]', 'Starts a specified adapter instance');
        })
        .command('stop', 'stops the js-controller', yargs => {
            yargs
                .command('<adapter>[.<instance>]', 'Stops a specified adapter instance');
        })
        .command('restart', 'Restarts js-controller', yargs => {
            yargs
                .command('<adapter>[.<instance>]', 'Restarts a specified adapter instance', {});
        })
        .command('debug <adapter>[.<instance>]', 'Starts a Node.js debugging session for the adapter instance', {
            ip: {
                describe: 'IP-address <ip>',
                type: 'string'
            },
            port: {
                describe: 'Port <port>',
                type: 'number'
            },
            wait: {
                describe: 'Wait',
                type: 'boolean'
            }
        })
        .command('info', 'Shows the host info', {})
        .command('logs [<adapter>]', 'Monitor log', {
            'lines=1000': { // TODO: it's the only place we use = we should avoid this
                describe: 'Number of lines',
                type: 'string'
            },
            watch: {
                describe: 'Watch',
                type: 'boolean'
            }
        })
        .command('add <adapter> [desiredNumber]', 'Add instance of adapter', {
            enabled: {
                describe: 'Enable adapter',
                type: 'boolean'
            },
            host: {
                describe: 'Host <host>',
                type: 'string'
            },
            port: {
                describe: 'Port <port>',
                type: 'number'
            }
        })
        .command('install <adapter>', 'Installs a specified adapter', {})
        .command('rebuild <adapter>|self', 'Rebuilds a specified adapter', {
            install: {
                describe: 'Install',
                type: 'boolean'
            }
        })
        .command('url <url> [<name>]', 'Install adapter from specified url, e.g. GitHub', {})
        .command('del <adapter>', 'Remove adapter from system', {})
        .command('del <adapter>.<instance>', 'Remove adapter instance', {})
        .command('update [<repositoryUrl>]', 'Update repository and list adapters', {
            updateable: {
                describe: 'Only show updateable adapters',
                alias: 'u',
                type: 'boolean'
            },
            installed: {
                describe: 'Only show installed adapters',
                alias: 'i',
                type: 'boolean'
            },
            force: {
                describe: 'Bypass hash check',
                alias: 'f',
                type: 'boolean'
            }
        })
        .command('upgrade', 'Upgrade management', yargs => {
            yargs
                .command('[<repositoryUrl>]', 'Upgrade all adapters, optionally you can specify the repository url', {
                    yes: {
                        describe: 'Bypass questionnaire',
                        alias: 'y',
                        type: 'boolean'
                    }
                })
                .command('all [<repositoryUrl>]', 'Upgrade all adapters, optionally you can specify the repository url', {
                    yes: {
                        describe: 'Bypass questionnaire',
                        alias: 'y',
                        type: 'boolean'
                    }
                })
                .command('self [<repositoryUrl>]', 'Upgrade js-controller, optionally you can specify the repository url', {
                    force: {
                        describe: 'Allow downgrades',
                        alias: 'f',
                        type: 'boolean'
                    }
                })
                .command('<adapter> [<repositoryUrl>]', 'Upgrade specified adapter, optionally you can specify the repository url', {
                    y: {
                        describe: 'Bypass questionnaire',
                        alias: 'y',
                        type: 'boolean'
                    }
                });
        })
        .command('upload', 'Upload management', yargs => {
            yargs
                .command(`<pathToLocalFile> <pathIn${tools.appName}>`, 'Upload given files to provided path to make them available for instances', {})
                .command('all', 'Upload all adapter files to make them available for instances', {})
                .command('<adapter>', 'Upload specified adapter files to make them available for instances', {});
        })
        .command('object', 'Object management', yargs => {
            yargs
                .command('get <id>', 'Get object specified by id', {})
                .command('set <id> <json-value>', 'Set object with the given id by providing a new json object', {})
                .command('set <id> propertyname=<value or json-value>', 'Update part of the object by providing a new value or partial object', {})
                .command('extend <id> <json-value>', 'Extend object with the given id by providing a new json object', {})
                .command('del <id|pattern>', 'Delete object with given id or all objects matching the pattern', {
                    y: {
                        describe: 'Bypass questionnaire',
                        alias: 'y',
                        type: 'boolean'
                    }
                })
                .command('chmod <object-mode> [state-mode] <id>', 'Change object rights', {})
                .command('chown <user> <group> <id>', 'Change object ownership', {})
                .command('list <pattern>', 'List object matching given pattern', {});
        })
        .command('state', 'State management', yargs => {
            yargs
                .command('get <id>', 'Get state, specified by id', {})
                .command('getplain <id>', 'Get plain state, specified by id', {
                    pretty: {
                        describe: 'Prettify output',
                        type: 'boolean'
                    }
                })
                .command('getvalue <id>', 'Get state value, specified by id', {})
                .command('set <id> <value> [<ack>]', 'Set state, specified by id', {})
                .command('del <id>', 'Delete state, specified by id', {});
        })
        .command('message <adapter>[.instance] <command> [<message>]', 'Send message to adapter instance/s', {})
        .command('list <type> [<filter>]', 'List all entries, like objects', {})
        .command('chmod <mode> <file>', 'Change file rights', {})
        .command('chown <user> <group> <file>', 'Change file ownership', {})
        .command('touch <file>', 'Touch file', {})
        .command('rm <file>', 'Remove file', {})
        .command('file', 'File management', yargs => {
            yargs
                .command(`read <${tools.appName}-path-to-read> [<filesystem-path-to-write>]`, `Read file from ${tools.appName} path and optionally write to destination`, {})
                .command(`write <filesystem-path-to-read> <${tools.appName}-path-to-write>`, `Read file from path and write it to ${tools.appName} path`,{})
                .command(`rm <${tools.appName}-path-to-delete>`, 'Remove file', {})
                .command('sync', 'Sync files', {});
        })
        .command('user', 'User commands', yargs => {
            yargs
                .command('add <user>', 'Add new user',yargs => {
                    yargs.option('ingroup', {
                        describe: 'User group',
                        type: 'string'
                    })
                        .option('password', {
                            describe: 'User password',
                            type: 'string'
                        });
                })
                .command('del <user>', 'Delete user', {})
                .command('passwd <user>', 'Change user password', yargs => {
                    yargs
                        .option('password', {
                            describe: 'User password',
                            type: 'string'
                        });
                })
                .command('enable <user>', 'Enable user', {})
                .command('disable <user>', 'Disable user', {})
                .command('get <user>', 'Get user', {})
                .command('check <user>', 'Check user password', yargs => {
                    yargs
                        .option('password', {
                            describe: 'User password',
                            type: 'string'
                        });
                });
        })
        .command('group', 'group management', yargs => {
            yargs
                .command('add <group>', 'Add group', {})
                .command('del <group>', 'Remove group', {})
                .command('list <group>', 'List group', {})
                .command('enable <group>', 'Enable group', {})
                .command('disable <group>', 'Disable group', {})
                .command('get <group>', 'Get group', {})
                .command('adduser <group> <user>', 'Add user to group', {})
                .command('deluser <group> <user>', 'Remove user from group', {});
        })
        .command('host <hostname>', 'Set host to given hostname', yargs => {
            yargs
                .command('this', 'Initialize current host', {})
                .command('set <hostname>', 'Set host with specified hostname', {})
                .command('remove <hostname>', 'Remove host with specified hostname', {});
        })
        .command('set <adapter>.<instance>', 'Change settings of adapter config', {
            customOption: {
                describe: 'Set the name of the parameter you want to change as option followed by its value, e. g. --port 80'
            }
        })
        .command('license <license.file or license.text>', 'Update license by given file', {})
        .command('cert', 'Certificate management', yargs => {
            yargs
                .command('create', 'Create certificate', {})
                .command('view [<certificate name>]', 'Show certificate', {});
        })
        .command('clean <yes>', 'Clears all objects and states', {})
        .command('backup', 'Create backup', {})
        .command('restore <backup name or path>', 'Restore a specified backup', {})
        .command('validate <backup name or path>', 'Validate a specified backup', {})
        .command('status [all|<adapter>.<instance>]', 'Status of ioBroker or adapter instance', {})
        .command('repo [<name>]', 'Show repo information', yargs => {
            yargs
                .command('set <name>', 'Set active repository')
                .command('del <name>', 'Remove repository');
        })
        .command('uuid', 'Show uuid of the installation', {})
        .command('unsetup', 'Reset license, installation secret and language', {})
        .command('fix', 'Execute the installation fixer script, this updates your ioBroker installation', {})
        .command('multihost', 'Multihost management', yargs => {
            yargs
                .command('enable', 'Enable multihost discovery', {
                    secure: {
                        describe: 'Use secure connection',
                        type: 'boolean'
                    },
                    persist: {
                        describe: 'Enable persistent discovery',
                        type: 'boolean'
                    }
                })
                .command('disable', 'Disable multihost discovery')
                .command('browse', 'Browse for multihost server')
                .command('connect', 'Connect to multihost server');
        })
        .command('compact', 'compact group management', yargs => {
            yargs
                .command('enable', 'Enable compact mode in general')
                .command('on', 'Enable compact mode in general')
                .command('disable', 'Disable compact mode in general')
                .command('off', 'Disable compact mode in general')
                .command('<adapter>.<instance> status', 'Show if compact mode is enabled for a specific instance')
                .command('<adapter>.<instance> group <group-id>', 'Define compact group of a specific adapter')
                .command('<adapter>.<instance> <disable|off> [group-id]', 'Enable or disable compact mode for specified adapter instance and set compact group optionally')
                .command('<adapter>.<instance> <enable|on> [group-id]', 'Enable or disable compact mode for specified adapter instance and set compact group optionally');
        })
        .command('plugin', 'Plugin management', yargs => {
            yargs
                .command('enable <pluginname>', 'Enables a plugin for the specified host or instance. If no host is specified, the current one is used', {
                    host: {
                        describe: 'Hostname',
                        type: 'string'
                    },
                    instance: {
                        describe: 'Instance, e.g. hm-rpc.0',
                        type: 'string'
                    }
                })
                .command('disable <pluginname>', 'Disables a plugin for the specified host or instance. If no host is specified, the current one is used', {
                    host: {
                        describe: 'Hostname',
                        type: 'string'
                    },
                    instance: {
                        describe: 'Instance, e.g. hm-rpc.0',
                        type: 'string'
                    }
                })
                .command('status <pluginname>', 'Checks if a plugin is enabled for the specified host or instance. If no host is specified, the current one is used', {
                    host: {
                        describe: 'Hostname',
                        type: 'string'
                    },
                    instance: {
                        describe: 'Instance, e.g. hm-rpc.0',
                        type: 'string'
                    }
                });
        })
        .command('version [<adapter>]', 'Show version of js-controller or specified adapter')
        .option('version', {
            describe: 'Show version',
            type: 'boolean',
            alias: 'v'
        })
        .wrap(null)
    ;

    return yargs;
}

/**
 * Show yargs help, if processCommand is used as import, yargs won't be initialized
 * @param {object} _yargs - yargs instance
 */
function showHelp(_yargs) {
    if (_yargs) {
        _yargs.showHelp();
    } else if (yargs) {
        yargs.showHelp();
    }
}

let Objects; // constructor
let objects; // instance
let States;  // constructor
let states;  // instance

/**
 * Process the given CLI command
 *
 * @param {string|number} command - command to execute
 * @param {any[]} args - arguments passed to yargs
 * @param {object} params - object with parsed params by yargs, e. g. --force is params.force
 * @param {(exitCode?: number) => void} callback
 */
function processCommand(command, args, params, callback) {
    if (typeof args   === 'function') {
        callback = args;
        args = null;
    }
    if (typeof params === 'function') {
        callback = params;
        params = null;
    }
    if (!params) {
        params = {};
    }
    if (!args) {
        args = [];
    }
    if (!callback) {
        callback = processExit;
    }

    /** @type {import('./cli/cliCommand').CLICommandContext} */
    const commandContext = {dbConnect, callback, showHelp};
    /** @type {import('./cli/cliCommand').CLICommandOptions} */
    const commandOptions = Object.assign({}, params, commandContext);

    switch (command) {

        case 'start':
        case 'stop': {
            const procCommand = new cli.command.process(commandOptions);
            procCommand[command](args);
            break;
        }

        case 'debug': {
            const debugCommand = new cli.command.debug(commandOptions);
            debugCommand.execute(args);
            break;
        }

        case 'status':
        case 'isrun': {
            const procCommand = new cli.command.process(commandOptions);
            procCommand.status(args);
            break;
        }

        case 'r':
        case 'restart': {
            const procCommand = new cli.command.process(commandOptions);
            procCommand.restart(args);
            break;
        }

        case '_restart':
            restartController(callback);
            break;

        case 'update': {
            Objects     = require('./objects');
            const repoUrl = args[0]; // Repo url or name
            dbConnect(params, (_objects, _states) => {
                const Repo = require('./setup/setupRepo.js');
                const repo = new Repo({
                    objects:     _objects,
                    states:      _states
                });

                repo.showRepo(repoUrl, params, () => {
                    setTimeout(callback, 2000);
                });
            });
            break;
        }

        case 'setup': {
            const Setup = require('./setup/setupSetup.js');
            const setup = new Setup({
                dbConnect,
                processExit:        callback,
                cleanDatabase,
                restartController,
                resetDbConnect,
                params
            });
            if (args[0] === 'custom' || params.custom) {
                setup.setupCustom(callback);
            } else {
                let isFirst;
                let isRedis;

                // we support "first" and "redis" without "--" flag
                for (const arg of args) {
                    if (arg === 'first') {
                        isFirst = true;
                    } else if (arg === 'redis') {
                        isRedis = true;
                    }
                }

                // and as --flag
                isRedis = params.redis || isRedis;
                isFirst = params.first || isFirst;

                setup.setup(async (isFirst, _isRedis) => {
                    if (isFirst) {

                        // Creates all instances that are needed on a fresh installation
                        const createInitialInstances = async () => {
                            const Install = require('./setup/setupInstall.js');
                            const install = new Install({
                                objects:       objects,
                                states:        states,
                                installNpm:    installNpm,
                                getRepository: getRepository,
                                processExit:   callback,
                                params:        params
                            });
                            // In order to loop the instance creation, we need a promisified version of the method
                            const createInstanceAsync = tools.promisifyNoError(install.createInstance, install);

                            // Define the necessary instances
                            const initialInstances = ['admin', 'discovery', 'info'];
                            // And try to install each of them
                            for (const instance of initialInstances) {
                                try {
                                    const path = require.resolve(tools.appName + '.' + instance);
                                    if (path) {
                                        await createInstanceAsync(instance, {enabled: true, ignoreIfExists: true});
                                    }
                                } catch {
                                    // not found, just continue
                                }
                            }
                        };

                        createInitialInstances()
                            .then(() => new Promise(resolve => {
                                // Creates a fresh certificate
                                const Cert = require('./cli/cliCert');
                                // Create a new instance of the cert command,
                                // but use the resolve method as a callback
                                const cert = new Cert(Object.assign({}, commandOptions, {callback: resolve}));
                                cert.create();
                            }))
                            .then(() => callback && callback());
                    } else {
                        // else we update existing stuff (this is executed on installation)
                        // Rename repositories
                        const Repo = require('./setup/setupRepo.js');
                        const repo = new Repo({
                            objects:     objects,
                            states:      states
                        });

                        try {
                            await repo.rename('default', 'stable', 'http://download.iobroker.net/sources-dist.json');
                            await repo.rename('latest', 'beta', 'http://download.iobroker.net/sources-dist-latest.json');
                        } catch (e) {
                            console.warn(e.message);
                        }

                        try {
                            const configFile = tools.getConfigFileName();

                            const configOrig = fs.readJSONSync(configFile);
                            const config = deepClone(configOrig);

                            config.objects.options = config.objects.options || {
                                'auth_pass' : null,
                                'retry_max_delay' : 5000
                            };
                            if (config.objects.options.retry_max_delay === 15000 || !config.objects.options.retry_max_delay) {
                                config.objects.options.retry_max_delay = 5000;
                            }
                            config.states.options = config.states.options || {
                                'auth_pass' : null,
                                'retry_max_delay' : 5000
                            };
                            if (config.states.options.retry_max_delay === 15000 || !config.states.options.retry_max_delay) {
                                config.states.options.retry_max_delay = 5000;
                            }

                            if (!isDeepStrictEqual(config, configOrig)) {
                                fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
                                console.log('ioBroker configuration updated');
                            }
                        } catch(err) {
                            console.log('Could not update ioBroker configuration: ' + err.message);
                        }

                        return void callback();
                    }
                }, isFirst, isRedis);
            }
            break;
        }

        case 'url': {
            Objects =       require('./objects');

            let url  =      args[0];
            const name =      args[1];

            if (!url) {
                console.log('Please provide a URL to install from and optionally a name of the adapter to install');
                callback(EXIT_CODES.INVALID_ARGUMENTS);
            }

            if (url[0] === '"' && url[url.length - 1] === '"') {
                url = url.substring(1, url.length - 1);
            }
            url = url.trim();

            dbConnect(params, () => {
                const Install = require('./setup/setupInstall.js');
                const install = new Install({
                    objects:       objects,
                    states:        states,
                    installNpm:    installNpm,
                    getRepository: getRepository,
                    processExit:   callback,
                    params:        params
                });

                install.installAdapterFromUrl(url, name, callback);
            });
            break;
        }

        case 'info': {
            Objects =       require('./objects');
            dbConnect(params, objects => {
                tools.getHostInfo(objects, (err, data) => {
                    if (err) {
                        console.error('Cannot read host info: '+ err);
                        if (!data) {
                            return callback(EXIT_CODES.CANNOT_GET_HOST_INFO);
                        }
                    }
                    const formatters = require('./formatters');
                    const formatInfo = {
                        'Uptime':        formatters.formatSeconds,
                        'System uptime': formatters.formatSeconds,
                        'RAM':           formatters.formatRam,
                        'Speed':         formatters.formatSpeed,
                        'Disk size':     formatters.formatBytes,
                        'Disk free':     formatters.formatBytes
                    };

                    for (const attr of Object.keys(data)) {
                        console.log(`${attr}${attr.length < 16 ? new Array(16 - attr.length).join(' ') : ''}: ${formatInfo[attr] ? formatInfo[attr](data[attr]) : data[attr] || ''}`);
                    }
                    return void callback();
                });
            });
            break;
        }

        case 'a':
        case 'add':
        case 'install':
        case 'i': {
            Objects =       require('./objects');

            let name =      args[0];
            let instance =  args[1];
            let repoUrl =   args[2];

            if (instance === 0) {
                instance = '0';
            }
            if (repoUrl === 0) {
                repoUrl = '0';
            }

            if (parseInt(instance, 10).toString() !== (instance || '').toString()) {
                repoUrl = instance;
                instance = null;
            }
            if (parseInt(repoUrl, 10).toString() === (repoUrl || '').toString()) {
                const temp = instance;
                instance = repoUrl;
                repoUrl = temp;
            }
            if (parseInt(instance, 10).toString() === (instance || '').toString()) {
                instance = parseInt(instance, 10);
                params.instance = instance;
            }

            // If user accidentally wrote tools.appName.adapter => remove adapter
            name = cli.tools.normalizeAdapterName(name);

            const parsedName = cli.tools.splitAdapterOrInstanceIdentifierWithVersion(name);
            if (!parsedName) {
                console.log('Invalid adapter name for install');
                showHelp();
                return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
            }

            // split the adapter into its parts if necessary
            if (parsedName.instance !== null) {
                params.instance = parsedName.instance;
            }
            name = parsedName.name;
            const installName = parsedName.nameWithVersion;

            const adapterDir = tools.getAdapterDir(name);

            dbConnect(params, () => {
                const Install = require('./setup/setupInstall.js');
                const install = new Install({
                    objects:       objects,
                    states:        states,
                    installNpm:    installNpm,
                    getRepository: getRepository,
                    processExit:   callback,
                    params:        params
                });

                if (!fs.existsSync(adapterDir)) {
                    install.downloadPacket(repoUrl, installName, null, enableAdapterCallback => {
                        install.installAdapter(installName, repoUrl, () => {
                            enableAdapterCallback(() => {
                                if (command !== 'install' && command !== 'i') {
                                    install.createInstance(name, params, callback);
                                } else {
                                    return void callback();
                                }
                            });
                        });
                    });
                } else {
                    if (command !== 'install' && command !== 'i') {
                        install.createInstance(name, params, callback);
                    } else {
                        console.log(`adapter "${name}" already installed. Use "upgrade" to upgrade to a newer version.`);
                        return void callback(EXIT_CODES.ADAPTER_ALREADY_INSTALLED);
                    }
                }
            });
            break;
        }

        case 'rebuild': {
            let name = args[0];

            // If user accidentally wrote tools.appName.adapter => remove adapter
            name = cli.tools.normalizeAdapterName(name);

            if (name.indexOf('@') !== -1) {
                name = name.split('@')[0];
            }

            if (!name) {
                console.log('Please provide the name of the adapter to rebuild');
                return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
            }

            const rebuildCommand = params.install ? 'install' : 'rebuild';
            installNpm(name, rebuildCommand, (err, _adapter) => {
                if (err) {
                    processExit(err);
                } else {
                    console.log();
                    console.log('Rebuild ' + name + ' done');
                    return void callback();
                }
            });
            break;
        }

        case 'upload':
        case 'u': {
            Objects     = require('./objects');
            const name    = args[0];
            const subTree = args[1];
            if (name) {
                dbConnect(params, () => {
                    const Upload = require('./setup/setupUpload.js');
                    const upload = new Upload({
                        states:      states,
                        objects:     objects
                    });

                    if (name === 'all') {
                        objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, (_err, objs) => {
                            const adapters = [];
                            for (let i = 0; i < objs.rows.length; i++) {
                                if (objs.rows[i].value.type !== 'adapter') {
                                    continue;
                                }
                                adapters.push(objs.rows[i].value.common.name);
                            }

                            upload.uploadAdapterFull(adapters, callback);
                        });
                    } else {
                        // if upload of file
                        if (name.indexOf('.') !== -1) {
                            if (!subTree) {
                                console.log('Please specify target name, like:\n ' + tools.appName + ' upload /file/picture.png /vis.0/main/img/picture.png');
                                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                            }

                            upload.uploadFile(name, subTree, (err, newName) => {
                                !err && console.log('File "' + name + '" is successfully saved under ' + newName);
                                return void callback(err ? EXIT_CODES.CANNOT_UPLOAD_DATA : undefined);
                            });
                        } else {
                            if (subTree) {
                                upload.uploadAdapter(name, false, true, subTree, callback);
                            } else {
                                upload.uploadAdapterFull([name], callback);
                            }
                        }
                    }
                });
            } else {
                console.log('No adapter name found!');
                showHelp();
                return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
            }
            break;
        }

        case 'delete':
        case 'del': {
            let adapter  = args[0];
            let instance = args[1];

            // The adapter argument is required
            if (!adapter) {
                showHelp();
                return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
            }
            // If the user accidentally wrote <tools.appName>.adapter,
            // remove <tools.appName> from the adapter name
            adapter = cli.tools.normalizeAdapterName(adapter);

            // Avoid deleting stuff we don't want to delete
            // e.g. `system.adapter.*`
            if (!instance) {
                // Ensure that adapter contains a valid adapter (without instance nr)
                // or instance (with instance nr) identifier
                if (!cli.tools.validateAdapterOrInstanceIdentifier(adapter)) {
                    showHelp();
                    return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
                }
                // split the adapter into adapter + instance if necessary
                if (adapter.indexOf('.') > -1) {
                    ([adapter, instance] = adapter.split('.', 2));
                }
            } else {
                // ensure that adapter contains a valid adapter identifier
                // and the instance is a number
                if (
                    !cli.tools.validateAdapterIdentifier(adapter)
                    || !/^\d+$/.test(instance)
                ) {
                    showHelp();
                    return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
                }
            }

            if (instance || instance === 0) {
                dbConnect(params, () => {
                    const Install = require('./setup/setupInstall.js');
                    const install = new Install({
                        objects:       objects,
                        states:        states,
                        installNpm:    installNpm,
                        getRepository: getRepository,
                        processExit:   callback,
                        params:        params
                    });

                    console.log('Delete adapter "' + adapter + '.' + instance + '"');
                    install.deleteInstance(adapter, instance, callback);
                });
            } else {
                dbConnect(params, () => {
                    const Install = require('./setup/setupInstall.js');
                    const install = new Install({
                        objects:       objects,
                        states:        states,
                        installNpm:    installNpm,
                        getRepository: getRepository,
                        processExit:   callback,
                        params:        params
                    });
                    console.log('Delete adapter "' + adapter + '"');
                    install.deleteAdapter(adapter, (_a, resultCode) => void callback(resultCode));
                });
            }
            break;
        }
        case 'unsetup': {
            const rl = require('readline').createInterface({
                input:  process.stdin,
                output: process.stdout
            });

            if (params.yes || params.y || params.Y) {
                unsetup(params, callback);
            } else {
                rl.question('UUID will be deleted. Are you sure? [y/N]: ', answer => {
                    rl.close();
                    answer = answer.toLowerCase();
                    if (answer === 'y' || answer === 'yes' || answer === 'ja' || answer === 'j') {
                        unsetup(params, callback);
                    } else {
                        console.log('Nothing deleted');
                        return void callback();
                    }
                });
            }
            break;
        }

        case 'o':
        case 'object': {
            const objectsCommand = new cli.command.object(commandOptions);
            objectsCommand.execute(args);
            break;
        }

        case 's':
        case 'state': {
            const statesCommand = new cli.command.state(commandOptions);
            statesCommand.execute(args);
            break;
        }

        case 'msg':
        case 'message': {
            const messageCommand = new cli.command.message(commandOptions);
            messageCommand.execute(args);
            break;
        }

        case 'logs': {
            const logsCommand = new cli.command.logs(commandOptions);
            logsCommand.execute(args, params);
            break;
        }

        case 'upgrade': {
            Objects = require('./objects');

            let adapter = cli.tools.normalizeAdapterName(args[0]);
            let repoUrl = args[1];

            if (adapter && !repoUrl && adapter.indexOf('/') !== -1) {
                repoUrl = adapter;
                adapter = null;
            }

            if (adapter === 'all') {
                adapter = null;
            }

            dbConnect(params, () => {
                const Upgrade = require('./setup/setupUpgrade.js');
                const upgrade = new Upgrade({
                    objects:           objects,
                    states:            states,
                    installNpm:        installNpm,
                    getRepository:     getRepository,
                    params:            params,
                    processExit:       callback,
                    restartController: restartController
                });

                if (adapter) {
                    if (adapter === 'self') {
                        states.getState(`system.host.${tools.getHostName()}.alive`, (err, hostAlive) => {
                            upgrade.upgradeController(repoUrl, params.force || params.f, hostAlive && hostAlive.val, callback);
                        });
                    } else {
                        upgrade.upgradeAdapter(repoUrl, adapter, params.force || params.f, params.y || params.yes, false, callback);
                    }
                } else {
                    // upgrade all
                    getRepository(repoUrl, (err, links) => {
                        const result = [];
                        for (const name of Object.keys(links)) {
                            result.push(name);
                        }
                        if (err) {
                            console.log(err);
                        }
                        if (links) {
                            result.sort();
                            upgrade.upgradeAdapterHelper(links, result, 0, false, params.y || params.yes, callback);
                        } else {
                            // No information
                            return void callback(EXIT_CODES.INVALID_REPO);
                        }
                    });
                }
            });
            break;
        }

        case 'clean': {
            const yes = args[0];
            if (yes !== 'yes') {
                console.log(`Command "clean" clears all Objects and States. To execute it write "${tools.appName} clean yes"`);
            } else {
                dbConnect(params, (_obj, _stat, isNotRun) => {
                    if (!isNotRun) {
                        console.error(`Stop ${tools.appName} first!`);
                        return void callback(EXIT_CODES.CONTROLLER_RUNNING);
                    }
                    cleanDatabase(true, count => {
                        console.log('Deleted ' + count + ' states');
                        restartController(() => {
                            console.log('Restarting ' + tools.appName + '...');
                            return void callback();
                        });
                    });
                });
            }
            break;
        }

        case 'restore': {
            const Backup = require('./setup/setupBackup.js');

            dbConnect(params, (_obj, _stat, isNotRun) => {

                if (!isNotRun) {
                    console.error('Stop ' + tools.appName + ' first!');
                    return void callback(EXIT_CODES.CONTROLLER_RUNNING);
                }

                const backup = new Backup({
                    states:            states,
                    objects:           objects,
                    cleanDatabase:     cleanDatabase,
                    restartController: restartController,
                    processExit:       callback
                });

                backup.restoreBackup(args[0], () => {
                    console.log('System successfully restored!');
                    return void callback(EXIT_CODES.NO_ERROR);
                });
            });
            break;
        }

        case 'backup': {
            const name = args[0];
            const Backup = require('./setup/setupBackup.js');

            dbConnect(params, () => {
                const backup = new Backup({
                    states:            states,
                    objects:           objects,
                    cleanDatabase:     cleanDatabase,
                    restartController: restartController,
                    processExit:       callback
                });

                backup.createBackup(name, filePath => {
                    console.log('Backup created: ' + filePath);
                    return void callback(EXIT_CODES.NO_ERROR);
                });
            });
            break;
        }

        case 'validate': {
            const name = args[0];
            const Backup = require('./setup/setupBackup.js');
            dbConnect(params, () => {
                const backup = new Backup({
                    states:            states,
                    objects:           objects,
                    cleanDatabase:     cleanDatabase,
                    restartController: restartController,
                    processExit:       callback
                });

                backup.validateBackup(name).then(() => {
                    console.log('Backup OK');
                    processExit(0);
                }).catch(e => {
                    console.log(`Backup check failed: ${e.message}`);
                    processExit(1);
                });
            });
            break;
        }
        case 'l':
        case 'list': {
            dbConnect(params, (_objects, _states, _isOffline, _objectsType, config) => {
                const List = require('./setup/setupList.js');
                const list = new List({
                    states:      states,
                    objects:     objects,
                    processExit: callback,
                    config:      config
                });
                list.list(args[0], args[1], params);
            });
            break;
        }

        case 'touch': {
            let pattern = args[0];

            if (!pattern) {
                console.log('No file path found. Example: "touch /vis.0/main/*"');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            dbConnect(params, () => {
                // extract id
                pattern = pattern.replace(/\\/g, '/');
                if (pattern[0] === '/') {
                    pattern = pattern.substring(1);
                }

                if (pattern === '*') {
                    objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, (err, arr) => {
                        if (!err && arr && arr.rows) {
                            const files = [];
                            let count = 0;
                            for (let i = 0; i < arr.rows.length; i++) {
                                if (arr.rows[i].value.type !== 'adapter') {
                                    continue;
                                }
                                count++;
                                objects.touch(arr.rows[i].value.common.name, '*', {user: 'system.user.admin'}, (err, processed, _id) => {
                                    if (!err && processed) {
                                        files.push({id: _id, processed: processed});
                                    }
                                    if (!--count) {
                                        const List = require('./setup/setupList.js');
                                        const list = new List({
                                            states:      states,
                                            objects:     objects,
                                            processExit: callback
                                        });
                                        files.sort((a, b) => a.id.localeCompare(b.id));

                                        for (let k = 0; k < files.length; k++) {
                                            for (let t = 0; t < files[k].processed.length; t++) {
                                                list.showFile(files[k].id, files[k].processed[t].path, files[k].processed[t]);
                                            }
                                        }
                                        setTimeout(callback, 1000);
                                    }
                                });
                            }
                            if (!count) {
                                console.log('Nothing found');
                                return void callback();
                            }
                        }
                    });
                } else {
                    const parts = pattern.split('/');
                    const id    = parts.shift();
                    const path  = parts.join('/');

                    objects.touch(id, path, {user: 'system.user.admin'}, (err, processed) => {
                        if (err) {
                            console.error(err);
                        } else {
                            if (processed) {
                                const List = require('./setup/setupList.js');
                                const list = new List({
                                    states:      states,
                                    objects:     objects,
                                    processExit: callback
                                });
                                for (let i = 0; i < processed.length; i++) {
                                    list.showFile(id, processed[i].path, processed[i]);
                                }
                            }
                        }
                        setTimeout(callback, 1000);
                    });

                }
            });
            break;
        }

        case 'rm': {
            let pattern = args[0];

            if (!pattern) {
                console.log('No file path found. Example: "touch /vis.0/main/*"');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            dbConnect(params, () => {
                // extract id
                pattern = pattern.replace(/\\/g, '/');
                if (pattern[0] === '/') {
                    pattern = pattern.substring(1);
                }

                if (pattern === '*') {
                    objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, (err, arr) => {
                        if (!err && arr && arr.rows) {
                            const files = [];
                            let count = 0;
                            for (let i = 0; i < arr.rows.length; i++) {
                                if (arr.rows[i].value.type !== 'adapter') {
                                    continue;
                                }
                                count++;
                                objects.rm(arr.rows[i].value.common.name, '*', {user: 'system.user.admin'}, (err, processed, _id) => {
                                    if (!err && processed) {
                                        files.push({id: _id, processed: processed});
                                    }
                                    if (!--count) {
                                        const List = require('./setup/setupList.js');
                                        const list = new List({
                                            states:      states,
                                            objects:     objects,
                                            processExit: callback
                                        });
                                        files.sort((a, b) => a.id.localeCompare(b.id));

                                        list.showFileHeader();
                                        for (let k = 0; k < files.length; k++) {
                                            for (let t = 0; t < files[k].processed.length; t++) {
                                                list.showFile(files[k].id, files[k].processed[t].path, files[k].processed[t]);
                                            }
                                        }
                                        setTimeout(callback, 1000);
                                    }
                                });
                            }
                            if (!count) {
                                console.log('Nothing found');
                                return void callback();
                            }
                        }
                    });
                } else {
                    const parts = pattern.split('/');
                    const id    = parts.shift();
                    const path  = parts.join('/');

                    objects.rm(id, path, {user: 'system.user.admin'}, (err, processed) => {
                        if (err) {
                            console.error(err);
                        } else {
                            if (processed) {
                                const List = require('./setup/setupList.js');
                                const list = new List({
                                    states:      states,
                                    objects:     objects,
                                    processExit: callback
                                });
                                list.showFileHeader();
                                for (let i = 0; i < processed.length; i++) {
                                    list.showFile(id, processed[i].path, processed[i]);
                                }
                            }
                        }
                        setTimeout(callback, 1000);
                    });

                }
            });
            break;
        }

        case 'chmod': {
            let mode    = args[0];
            let pattern = args[1];

            if (!mode) {
                cli.error.requiredArgumentMissing('mode', 'chmod 777 /vis.0/main/*');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            } else {
                //yargs has converted it to number
                mode = parseInt(mode.toString(), 16);
            }

            if (!pattern) {
                cli.error.requiredArgumentMissing('file path', 'chmod 777 /vis.0/main/*');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            dbConnect(params, () => {
                // extract id
                pattern = pattern.replace(/\\/g, '/');
                if (pattern[0] === '/') {
                    pattern = pattern.substring(1);
                }

                if (pattern === '*') {
                    objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, (err, arr) => {
                        if (!err && arr && arr.rows) {
                            const files = [];
                            let count = 0;
                            for (let i = 0; i < arr.rows.length; i++) {
                                if (arr.rows[i].value.type !== 'adapter') {
                                    continue;
                                }
                                count++;
                                objects.chmodFile(arr.rows[i].value.common.name, '*', {user: 'system.user.admin', mode: mode}, (err, processed, _id) => {
                                    if (!err && processed) {
                                        files.push({id: _id, processed: processed});
                                    }
                                    if (!--count) {
                                        const List = require('./setup/setupList.js');
                                        const list = new List({
                                            states:      states,
                                            objects:     objects,
                                            processExit: callback
                                        });
                                        files.sort((a, b) => a.id.localeCompare(b.id));

                                        list.showFileHeader();
                                        for (let k = 0; k < files.length; k++) {
                                            for (let t = 0; t < files[k].processed.length; t++) {
                                                list.showFile(files[k].id, files[k].processed[t].path, files[k].processed[t]);
                                            }
                                        }
                                        setTimeout(callback, 1000);
                                    }
                                });
                            }
                            if (!count) {
                                console.log('Nothing found');
                                return void callback();
                            }
                        }
                    });
                } else {
                    const parts = pattern.split('/');
                    const id    = parts.shift();
                    const path  = parts.join('/');

                    objects.chmodFile(id, path, {user: 'system.user.admin', mode: mode}, (err, processed) => {
                        if (err) {
                            console.error(err);
                        } else {
                            if (processed) {
                                const List = require('./setup/setupList.js');
                                const list = new List({
                                    states:      states,
                                    objects:     objects,
                                    processExit: callback
                                });
                                list.showFileHeader();
                                for (let i = 0; i < processed.length; i++) {
                                    list.showFile(id, processed[i].path, processed[i]);
                                }
                            }
                        }
                        setTimeout(callback, 1000);
                    });

                }
            });
            break;
        }

        case 'chown': {
            let user    = args[0];
            let group   = args[1];
            let pattern = args[2];

            if (!pattern) {
                pattern = group;
                group = undefined;
            }

            if (!user) {
                cli.error.requiredArgumentMissing('user', 'chown user /vis.0/main/*');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            } else if (user.substring(12) !== 'system.user.') {
                user = 'system.user.' + user;
            }
            if (group && group.substring(13) !== 'system.group.') {
                group = 'system.group.' + group;
            }

            if (!pattern) {
                cli.error.requiredArgumentMissing('file path', 'chown user /vis.0/main/*');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            dbConnect(params, () => {
                // extract id
                pattern = pattern.replace(/\\/g, '/');
                if (pattern[0] === '/') {
                    pattern = pattern.substring(1);
                }

                if (pattern === '*') {
                    objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, (err, arr) => {
                        if (!err && arr && arr.rows) {
                            const files = [];
                            let count = 0;
                            for (let i = 0; i < arr.rows.length; i++) {
                                if (arr.rows[i].value.type !== 'adapter') {
                                    continue;
                                }
                                count++;
                                objects.chownFile(arr.rows[i].value.common.name, '*', {user: 'system.user.admin', owner: user, ownerGroup: group}, (err, processed, _id) => {
                                    if (!err && processed) {
                                        files.push({id: _id, processed: processed});
                                    }
                                    if (!--count) {
                                        const List = require('./setup/setupList.js');
                                        const list = new List({
                                            states:      states,
                                            objects:     objects,
                                            processExit: callback
                                        });
                                        files.sort((a, b) => a.id.localeCompare(b.id));

                                        list.showFileHeader();
                                        for (let k = 0; k < files.length; k++) {
                                            for (let t = 0; t < files[k].processed.length; t++) {
                                                list.showFile(files[k].id, files[k].processed[t].path, files[k].processed[t]);
                                            }
                                        }
                                        setTimeout(callback, 1000);
                                    }
                                });
                            }
                            if (!count) {
                                console.log('Nothing found');
                                return void callback();
                            }
                        }
                    });
                } else {

                    const parts = pattern.split('/');
                    const id = parts.shift();
                    const path = parts.join('/');

                    objects.chownFile(id, path, {user: 'system.user.admin', owner: user, ownerGroup: group}, (err, processed) => {
                        if (err) {
                            console.error(err);
                        } else {
                            // call here list
                            if (processed) {
                                const List = require('./setup/setupList.js');
                                const list = new List({
                                    states: states,
                                    objects: objects,
                                    processExit: callback
                                });
                                list.showFileHeader();
                                for (let i = 0; i < processed.length; i++) {
                                    list.showFile(id, processed[i].path, processed[i]);
                                }
                            }
                        }
                        setTimeout(callback, 1000);
                    });
                }
            });
            break;
        }

        case 'user': {
            const command = args[0] || '';
            let user    = args[1] || '';

            if (user && user.match(/^system\.user\./)) {
                user = user.substring('system.user.'.length);
            }

            dbConnect(params, () => {
                const Users = require('./setup/setupUsers.js');
                const users = new Users({
                    objects:     objects,
                    processExit: callback
                });
                const password = params.password;
                const group    = params.ingroup || 'system.group.administrator';

                if (command === 'add') {
                    users.addUserPrompt(user, group, password, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('User "' + user + '" created (Group: ' + group.replace('system.group.', '') + ')');
                            return void callback();
                        }
                    });
                } else if (command === 'del'     || command === 'delete') {
                    users.delUser(user, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('User "' + user + '" deleted');
                            return void callback();
                        }
                    });
                } else if (command === 'check') {
                    users.checkUserPassword(user, password, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('Password for user "' + user + '" matches.');
                            return void callback();
                        }
                    });
                } else if (command === 'set'     || command === 'passwd') {
                    users.setUserPassword(user, password, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('Password for "' + user + '" was successfully set.');
                            return void callback();
                        }
                    });
                } else if (command === 'enable'  || command === 'e') {
                    users.enableUser(user, true, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('User "' + user + '" was successfully enabled.');
                            return void callback();
                        }
                    });
                } else if (command === 'disable' || command === 'd') {
                    users.enableUser(user, false, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('User "' + user + '" was successfully disabled.');
                            return void callback();
                        }
                    });
                } else if (command === 'get') {
                    users.getUser(user, (err, isEnabled) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('User "' + user + '" is ' + (isEnabled ? 'enabled' : 'disabled'));
                            return void callback();
                        }
                    });
                } else {
                    console.warn(`Unknown command "${command}". Available commands are: add, del, passwd, enable, disable, check, get`);
                    return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                }
            });
            break;
        }

        case 'g':
        case 'group': {
            const command = args[0] || '';
            let group   = args[1] || '';
            let user    = args[2] || '';

            if (group && group.match(/^system\.group\./)) {
                group = group.substring('system.group.'.length);
            }
            if (user  && user.match(/^system\.user\./))   {
                user  = user.substring('system.user.'.length);
            }
            if (!command) {
                console.warn('Unknown command "' + command + '". Available commands are: add, del, passwd, enable, disable, list, get');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            if (!group) {
                console.warn('Please define group name: group ' + command + ' groupName');
                return callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
            }
            dbConnect(params, () => {
                const Users = require('./setup/setupUsers.js');
                const users = new Users({
                    objects:     objects,
                    processExit: callback
                });

                if (command === 'useradd' || command === 'adduser') {
                    if (!user) {
                        console.warn('Please define user name: group useradd groupName userName');
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    }
                    users.addUserToGroup(user, group, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('User "' + user + '" created');
                            return void callback();
                        }
                    });
                } else if (command === 'userdel' || command === 'deluser') {
                    if (!user) {
                        console.warn('Please define user name: group userdel groupName userName');
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    }
                    users.removeUserFromGroup(user, group, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('User "' + user + '" created');
                            return void callback();
                        }
                    });
                } else if (command === 'add') {
                    users.addGroup(group, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('User "' + group + '" created');
                            return void callback();
                        }
                    });
                } else if (command === 'del' || command === 'delete') {
                    users.delGroup(group, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('User "' + group + '" deleted');
                            return void callback();
                        }
                    });
                } else if (command === 'list' || command === 'l') {
                    users.getGroup(group, (err, isEnabled, list) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('Group "' + group + '" is ' + (isEnabled ? 'enabled' : 'disabled') + ' and has following members:');
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    console.log(list[i].substring('system.user.'.length));
                                }
                            }
                            return void callback();
                        }
                    });
                } else if (command === 'enable' || command === 'e') {
                    users.enableGroup(group, true, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('Group "' + group + '" was successfully enabled.');
                            return void callback();
                        }
                    });
                } else if (command === 'disable' || command === 'd') {
                    users.enableGroup(group, false, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('Group "' + group + '" was successfully disabled.');
                            return void callback();
                        }
                    });
                } else if (command === 'get') {
                    users.getGroup(group, (err, isEnabled, _list) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log('Group "' + group + '" is ' + (isEnabled ? 'enabled' : 'disabled'));
                            return void callback();
                        }
                    });
                } else {
                    console.warn('Unknown command "' + command + '". Available commands are: add, del, passwd, enable, disable, list, get');
                    return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                }
            });
            break;
        }

        case 'adduser': {
            const user = args[0];
            const group = params.ingroup || 'system.group.administrator';
            const password = params.password;

            dbConnect(params, () => {
                const Users = require('./setup/setupUsers.js');
                const users = new Users({
                    objects: objects,
                    processExit: callback
                });
                users.addUserPrompt(user, group, password, err => {
                    if (err) {
                        console.error(err);
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    } else {
                        console.log('User "' + user + '" created (Group: ' + group.replace('system.group.', '') + ')');
                        return void callback();
                    }
                });
            });
            break;
        }

        case 'passwd': {
            const user     = args[0];
            const password = params.password;
            dbConnect(params, () => {
                const Users = require('./setup/setupUsers.js');
                const users = new Users({
                    objects:     objects,
                    processExit: callback
                });
                users.setUserPassword(user, password, err => {
                    if (err) {
                        console.error(err);
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    } else {
                        console.log('Password for "' + user + '" was successfully set.');
                        return void callback();
                    }
                });
            });
            break;
        }

        case 'ud':
        case 'udel':
        case 'userdel':
        case 'deluser': {
            const user = args[0];

            dbConnect(params, () => {
                const Users = require('./setup/setupUsers.js');
                const users = new Users({
                    objects: objects,
                    processExit: callback
                });
                users.delUser(user, err => {
                    if (err) {
                        console.error(err);
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    } else {
                        console.log('User "' + user + '" deleted');
                        return void callback();
                    }
                });
            });
            break;
        }

        // Create package.json in /opt/' + tools.appName + '
        case 'package': {
            const json = {
                name: tools.appName,
                engines: {
                    node: '>=6'
                },
                optionalDependencies: {
                },
                dependencies: {},
                author: 'bluefox <dogafox@gmail.com>'
            };
            json.dependencies[tools.appName + '.js-controller'] = '*';
            json.dependencies[tools.appName + '.admin']         = '*';

            tools.getRepositoryFile(null, null, (_err, sources, _sourcesHash) => {
                if (sources) {
                    for (const s in sources) {
                        if (Object.prototype.hasOwnProperty.call(sources, s)) {
                            if (sources[s].url) {
                                if (!json.dependencies[tools.appName + '.' + s]) {
                                    json.optionalDependencies[tools.appName + '.' + s] = sources[s].url;
                                }
                            } else {
                                if (!json.dependencies[tools.appName + '.' + s]) {
                                    json.optionalDependencies[tools.appName + '.' + s] = '*';
                                }
                            }
                        }
                    }
                }

                fs.writeFileSync(__dirname + '/../../../package.json', JSON.stringify(json, null, 2));
                return void callback();
            });
            break;
        }

        case 'set': {
            const instance = args[0];
            if (!instance) {
                console.warn('please specify instance.');
                return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
            }
            if (instance.indexOf('.') === -1) {
                console.warn('please specify instance, like "' + instance + '.0"');
                return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
            }
            dbConnect(params, () => {
                objects.getObject('system.adapter.' + instance, (err, obj) => {
                    if (!err && obj) {
                        let changed = false;
                        for (let a = 0; a < process.argv.length; a++) {
                            if (process.argv[a].match(/^--/) && process.argv[a + 1] && !process.argv[a + 1].match(/^--/)) {
                                const attr = process.argv[a].substring(2);
                                /** @type {number | string | boolean} */
                                let val = process.argv[a + 1];
                                if (val === '__EMPTY__')  {
                                    val = '';
                                } else if (val === 'true')  {
                                    val = true;
                                } else if (val === 'false') {
                                    val = false;
                                } else if (parseFloat(val).toString() === val) {
                                    val = parseFloat(val);
                                }
                                if (attr.indexOf('.') !== -1) {
                                    const parts = attr.split('.');
                                    if (!obj.native[parts[0]] || obj.native[parts[0]][parts[1]] === undefined) {
                                        console.warn('Adapter "' + instance + '" has no setting "'  + attr + '".');
                                    } else {
                                        changed = true;
                                        obj.native[parts[0]][parts[1]] = val;
                                        console.log('New ' + attr + ' for "' + instance + '" is: ' + val);
                                    }
                                } else {
                                    if (obj.native[attr] === undefined) {
                                        console.warn('Adapter "' + instance + '" has no setting "'  + attr + '".');
                                    } else {
                                        changed = true;
                                        obj.native[attr] = val;
                                        console.log('New ' + attr + ' for "' + instance + '" is: ' + val);
                                    }
                                }
                                a++;
                            }
                        }
                        if (changed) {
                            obj.from = 'system.host.' + tools.getHostName() + '.cli';
                            obj.ts = new Date().getTime();
                            objects.setObject('system.adapter.' + instance, obj, () => {
                                console.log('Instance settings for "' + instance + '" are changed.');
                                return void callback();
                            });
                        } else {
                            console.log('No parameters set.');
                            return void callback();
                        }
                    } else {
                        cli.error.invalidInstance(instance);
                        return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
                    }
                });
            });
            break;
        }

        case 'host': {
            const hostCommand = new cli.command.host(commandOptions);
            hostCommand.execute(args);
            break;
        }

        case 'visdebug': {
            let widgetset = args[0];
            if (widgetset && widgetset.match('/^vis-/')) {
                widgetset = widgetset.substring(4);
            }

            const VisDebug = require('./setup/setupVisDebug.js');

            dbConnect(params, _objects => {
                const visDebug = new VisDebug({
                    objects:     _objects,
                    processExit: callback
                });

                visDebug.enableDebug(widgetset);
            });
            break;
        }

        case 'file':
        case 'f': {
            const cmd = args[0];
            if (cmd !== 'read' && cmd !== 'r' && cmd !== 'w' && cmd !== 'write' && cmd !== 'sync' && cmd !== 'rm' && cmd !== 'unlink' && cmd !== 'del') {
                console.log('Invalid parameters: write "file read /vis.0/main/img/picture.png /opt/picture/image.png" to read the file');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            if (cmd !== 'sync' && !args[1]) {
                console.log('Invalid parameters: write "file read /vis.0/main/img/picture.png /opt/picture/image.png" to read the file from DB and store it on disk');
                console.log('or                        "file write /opt/SOURCE/image.png /vis.0/main/DESTINATION/picture.png" to write the file into DB from disk');
                console.log('or                        "file rm /vis.0/main/img/picture.png" to delete the file in DB');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }

            dbConnect(params, async (objects, _states, isOffline, objectType) => {
                if (cmd === 'read' || cmd ==='r') {
                    const toRead = args[1];
                    const parts = toRead.replace(/\\/g, '/').split('/');

                    const path = (args[2] || process.cwd()).replace(/\\/g, '/').split('/');
                    const file = path[path.length - 1];
                    if (!file.match(/\.[a-zA-Z0-9]+$/)) { // If destination location seems to be a directory, add filename
                        if (file !== '') {
                            path.push(parts[parts.length - 1]);
                        } else { // trailing slash
                            path[path.length - 1] = parts[parts.length - 1];
                        }
                    }
                    let adapt = parts.shift();
                    if (!adapt) { // leading slash
                        adapt = parts.shift();
                    }
                    if (!adapt) {
                        console.log(`Invalid parameters: adapter cannot be found!`);
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }
                    if (!parts.length) {
                        console.log('Invalid parameters: file cannot be found: file not provided');
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }

                    objects.readFile(adapt, parts.join('/'), (err, data) => {
                        err && console.error(err);
                        if (data) {
                            const destFilename = path.join('/');
                            fs.writeFileSync(destFilename, data);
                            console.log('File "' + toRead + '" stored as "' + destFilename + '"');
                        }
                        return void callback(EXIT_CODES.NO_ERROR);
                    });
                } else if (cmd === 'write' || cmd ==='w') {
                    const toRead = args[1] || '';
                    const parts = toRead.replace(/\\/g, '/').split('/');

                    const path = (args[2] || '').replace(/\\/g, '/').split('/');

                    let adapt = path.shift();
                    if (!adapt) {
                        adapt = path.shift();
                    }
                    if (!path.length) {
                        path.push('');
                    }

                    const fileSrc = parts[parts.length - 1];
                    let fileDest = path[path.length - 1];
                    if (!fileDest || !fileDest.match(/\.[a-zA-Z0-9]+$/)) { // last portion of destination has no extension, consider being a directory
                        fileDest = '';
                    }
                    if (!fileSrc || !fs.existsSync(toRead)) {
                        console.log(`Please provide a valid file name as source file: "file write /opt/SOURCE/script.js /vis/DESTINATION/script.js"`);
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }
                    const srcStat = fs.statSync(toRead);
                    if (!srcStat.isFile()) {
                        console.log(`Please provide a valid file name as source file: "file write /opt/SOURCE/script.js /vis/DESTINATION/script.js"`);
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }
                    if (!fileDest) { // destination filename is not given, use same name as source file
                        fileDest = fileSrc;
                    }
                    if (fileDest !== path[path.length - 1]) { // if last part of path is different then filename, add filename
                        if (path[path.length - 1] !== '') {
                            path.push(fileDest);
                        } else { // trailing slash
                            path[path.length - 1] = fileDest;
                        }
                    }
                    const destFilename = path.length ? path.join('/') : '/';
                    const data = fs.readFileSync(toRead);

                    if (!adapt) {
                        console.log('Invalid parameters: destination adapter cannot be found!');
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }

                    objects.writeFile(adapt, destFilename, data, _err => {
                        console.log('File "' + toRead + '" stored as "' + destFilename + '"');
                        return void callback(EXIT_CODES.NO_ERROR);
                    });
                } else if (cmd === 'del' || cmd ==='rm' || cmd ==='unlink') {
                    const toDelete = args[1];
                    const parts = toDelete.replace(/\\/g, '/').split('/');

                    let adapt = parts.shift();
                    if (!adapt) { // leading slash
                        adapt = parts.shift();
                    }

                    if (!adapt) {
                        console.log('Invalid parameters: adapter cannot be found!');
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }
                    if (!parts.length) {
                        console.log('Invalid parameters: file cannot be found: file not provided');
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }

                    objects.unlink(adapt, parts.join('/'), err => {
                        err && console.error(err);
                        !err && console.log('File "' + toDelete + '" was deleted');
                        return void callback(EXIT_CODES.NO_ERROR);
                    });
                } else if (cmd === 'sync') { // Sync
                    if (objectType !== 'file') {
                        console.log('File Sync is only available when database type "file" is used.');
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }
                    if (!objects.syncFileDirectory || !objects.dirExists) { // functionality only exists in server class
                        console.log('Please stop ioBroker before syncing files and only use this command on the ioBroker master host!');
                        return void callback(EXIT_CODES.CONTROLLER_RUNNING);
                    }

                    // check meta.user
                    try {
                        const objExists = await objects.objectExists('meta.user');
                        if (objExists) {
                            // check if dir is missing
                            const dirExists = objects.dirExists('meta.user');
                            if (!dirExists) {
                                // create meta.user, so users see them as upload target
                                await objects.mkdirAsync('meta.user');
                                console.log('Successfully created "meta.user" directory');
                            }
                        }
                    } catch (e) {
                        console.warn(`Could not create directory "meta.user": ${e.message}`);
                    }

                    try {
                        const {numberSuccess, notifications} = objects.syncFileDirectory(args[1]);
                        console.log(`${numberSuccess} file(s) successfully synchronized with ioBroker storage`);
                        if (notifications.length) {
                            console.log();
                            console.log('The following notifications happened during sync: ');
                            notifications.forEach(el => console.log('- ' + el));
                        }
                        return void callback(EXIT_CODES.NO_ERROR);
                    } catch (err) {
                        console.error(`Error on sync: ${err.message}. Partial content might have been synced.`);
                        return void callback(EXIT_CODES.CANNOT_SYNC_FILES);
                    }
                } else {
                    console.log('Invalid parameters: write "file read /vis.0/main/img/picture.png /opt/picture/image.png" to read the file from DB and store it on disk');
                    console.log('or                        "file write /opt/SOURCE/image.png /vis.0/main/DESTINATION/picture.png" to write the file into DB from disk');
                    console.log('or                        "file rm /vis.0/main/img/picture.png" to delete the file in DB');
                    return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                }
            });
            break;
        }

        case 'id':
        case 'uuid': {
            dbConnect(params, objects => {
                objects.getObject('system.meta.uuid', (err, obj) => {
                    if (err) {
                        console.error('Error: ' + err);
                        return void callback(EXIT_CODES.CANNOT_GET_UUID);
                    }
                    if (obj && obj.native) {
                        console.log(obj.native.uuid);
                        return void callback();
                    } else {
                        console.error('Error: no UUID found');
                        return void callback(EXIT_CODES.CANNOT_GET_UUID);
                    }
                });
            });
            break;
        }

        case 'v':
        case 'version': {
            const adapter = args[0];
            let iopckg;
            if (adapter) {
                try {
                    iopckg = require(tools.appName + '.' + adapter + '/package.json');
                } catch {
                    iopckg = {version: '"' + adapter + '" not found'};
                }
            } else {
                iopckg = require('../package.json');
            }
            console.log(iopckg.version);

            return void callback();
        }

        case 'checklog': {
            dbConnect(params, (objects, states, isOffline, objectType) => {
                if (isOffline && tools.objectsDbHasServer(objectType)) {
                    console.log(tools.appName + ' is not running');
                    return void callback(EXIT_CODES.CONTROLLER_NOT_RUNNING);
                } else {
                    console.log(tools.appName + ' is running');
                    objects.getObjectList({startkey: 'system.host.', endkey: 'system.host.' + '\u9999'}, null, (err, res) => {
                        if (!err && res.rows.length) {
                            for (let i = 0; i < res.rows.length; i++) {
                                const parts = res.rows[i].id.split('.');
                                // ignore system.host.name.alive and so on
                                if (parts.length === 3) {
                                    states.pushMessage(res.rows[i].id, {command: 'checkLogging', message: null, from: 'console'});
                                }
                            }
                        }
                        setTimeout(callback, 200);
                    });
                }
            });
            break;
        }

        case 'repo': {
            Objects =       require('./objects');
            let repoUrlOrCommand = args[0]; // Repo url or name or "add" / "del" / "set" / "show" / "addset"
            const repoName       = args[1]; // Repo url or name
            let repoUrl          = args[2]; // Repo url or name
            if (repoUrlOrCommand !== 'add' && repoUrlOrCommand !== 'del' && repoUrlOrCommand !== 'set' && repoUrlOrCommand !== 'show' && repoUrlOrCommand !== 'addset') {
                repoUrl = repoUrlOrCommand;
                repoUrlOrCommand = 'show';
            }

            dbConnect(params, (_objects, _states) => {
                const Repo = require('./setup/setupRepo.js');
                const repo = new Repo({
                    objects:     _objects,
                    states:      _states
                });

                if (repoUrlOrCommand === 'show') {
                    repo.showRepoStatus(callback);
                } else if (repoUrlOrCommand === 'add' || repoUrlOrCommand === 'del' || repoUrlOrCommand === 'set' || repoUrlOrCommand === 'addset') {
                    if (!repoName || !repoName.match(/[-_\w\d]+/)) {
                        console.error('Invalid repository name: "' + repoName + '"');
                        return void callback();
                    } else {
                        if (repoUrlOrCommand === 'add' || repoUrlOrCommand === 'addset') {
                            if (!repoUrl) {
                                console.warn('Please define repository URL or path: ' + tools.appName + ' add <repoName> <repoUrlOrPath>');
                                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                            } else {
                                repo.add(repoName, repoUrl, err => {
                                    if (err) {
                                        console.error(err);
                                        return void callback(EXIT_CODES.INVALID_REPO);
                                    } else {
                                        if (repoUrlOrCommand === 'addset') {
                                            repo.setActive(repoName, err => {
                                                if (err) {
                                                    console.error(err);
                                                    return void callback(EXIT_CODES.INVALID_REPO);
                                                } else {
                                                    console.log('Repository "' + repoName + '" set as active: "' + repoUrl + '"');
                                                    repo.showRepoStatus(callback);
                                                }
                                            });
                                        } else {
                                            console.log('Repository "' + repoName + '" added as "' + repoUrl + '"');
                                            repo.showRepoStatus(callback);
                                        }
                                    }
                                });

                            }
                        } else if (repoUrlOrCommand === 'set') {
                            repo.setActive(repoName, err => {
                                if (err) {
                                    console.error(err);
                                    return void callback(EXIT_CODES.INVALID_REPO);
                                } else {
                                    console.log('Repository "' + repoName + '" set as active.');
                                    repo.showRepoStatus(callback);
                                }
                            });
                        } else if (repoUrlOrCommand === 'del') {
                            repo.del(repoName, err => {
                                if (err) {
                                    console.error(err);
                                    return void callback(EXIT_CODES.INVALID_REPO);
                                } else {
                                    console.log('Repository "' + repoName + '" deleted.');
                                    repo.showRepoStatus(callback);
                                }
                            });
                        } else {
                            console.warn('Unknown repo command: ' + repoUrlOrCommand);
                            return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                        }
                    }
                }
            });
            break;
        }

        case 'multihost':
        case 'mh': {
            const cmd = args[0];
            if (cmd !== 'c' && cmd !== 'connect' && cmd !== 's' && cmd !== 'status' && cmd !== 'b' && cmd !== 'browse' && cmd !== 'e' && cmd !== 'enable' && cmd !== 'd' && cmd !== 'disable') {
                console.log('Invalid parameters. Following is possible: enable, browse, connect, status');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            } else {
                dbConnect(params, () => {
                    const Multihost = require('./setup/setupMultihost.js');
                    const mh = new Multihost({
                        params:      params,
                        processExit: callback,
                        objects:     objects
                    });

                    if (cmd === 's' || cmd === 'status') {
                        mh.status(() => void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP));
                    } else
                    if (cmd === 'b' || cmd === 'browse') {
                        mh.browse((err, list) => {
                            if (err) {
                                console.error(err);
                                return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                            } else {
                                mh.showHosts(list);
                                return void callback();
                            }
                        });
                    } else if (cmd === 'e' || cmd === 'enable') {
                        mh.enable(true, err => {
                            if (err) {
                                console.error(err);
                                return void callback(EXIT_CODES.CANNOT_ENABLE_MULTIHOST);
                            } else {
                                states.pushMessage(`system.host.${tools.getHostName()}`, {
                                    command: 'updateMultihost',
                                    message: null,
                                    from: 'setup'
                                }, callback);
                            }
                        });
                    } else if (cmd === 'd' || cmd === 'disable') {
                        mh.enable(false, err => {
                            if (err) {
                                console.error(err);
                                return void callback(EXIT_CODES.CANNOT_ENABLE_MULTIHOST);
                            } else {
                                states.pushMessage(`system.host.${tools.getHostName()}`, {command: 'updateMultihost', message: null, from: 'setup'}, callback);
                            }
                        });
                    } else if (cmd === 'c' || cmd === 'connect') {
                        mh.connect(args[1], args[2], err => {
                            if (err) {
                                console.error(err);
                            }
                            return void callback(err ? 1 : 0);
                        });
                    }
                });
            }
            break;
        }

        case 'vendor': {
            const password = args[0];
            const file     = args[1];
            if (!password) {
                console.warn(`Please specify the password to update the vendor information!\n${tools.appName.toLowerCase()} vendor <PASS_PHRASE> <vendor.json>`);
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            } if (!file) {
                console.warn(`Please specify the path to the vendor file to update the vendor information!\n${tools.appName.toLowerCase()} vendor <PASS_PHRASE> <vendor.json>`);
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            } else {
                dbConnect(params, () => {
                    const Vendor = require('./setup/setupVendor');
                    const vendor = new Vendor({
                        objects:     objects
                    });
                    vendor.checkVendor(file, password).then(() => {
                        console.log(`Synchronised vendor information.`);
                        return void callback();
                    }).catch(err => {
                        console.error(`Cannot update vendor information: ${JSON.stringify(err)}`);
                        return void callback(EXIT_CODES.CANNOT_UPDATE_VENDOR);
                    });
                });
            }
            break;
        }

        case 'cert': {
            const certCommand = new cli.command.cert(commandOptions);
            certCommand.execute(args);
            break;
        }

        case 'compact': {
            const compactCommand = new cli.command.compact(commandOptions);
            compactCommand.execute(args);
            break;
        }

        case 'plugin': {
            const pluginCommand = new cli.command.plugin(commandOptions);
            pluginCommand.execute(args);
            break;
        }

        case 'license': {
            const file = args[0];
            if (!file) {
                console.warn(`Please specify the path to the license file or place license text directly!\n${tools.appName.toLowerCase()} license <license.file or license.text>`);
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            } else {
                dbConnect(params, () => {
                    const License = require('./setup/setupLicense');
                    const license = new License({
                        objects:     objects
                    });
                    license.setLicense(file).then(type => {
                        console.log(`License ${type} updated.`);
                        return void callback();
                    }).catch(err => {
                        console.error(`Cannot update license: ${JSON.stringify(err)}`);
                        return void callback(EXIT_CODES.CANNOT_UPDATE_LICENSE);
                    });
                });
            }
            break;
        }

        default: {
            if (params.v || params.version) {
                let iopckg;
                if (command) {
                    try {
                        iopckg = require(tools.appName + '.' + command + '/package.json');
                    } catch {
                        iopckg = {version: '"' + command + '" not found'};
                    }
                } else {
                    iopckg = require('../package.json');
                }
                console.log(iopckg.version);
            } else {
                showHelp();
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            return void callback();
        }
    }
}

// Save objects before exit
async function processExit(exitCode) {
    if (objects && objects.destroy) {
        await objects.destroy();
    }
    if (states  && states.destroy)  {
        await states.destroy();
    }
    setTimeout(() => {
        process.exit(exitCode);
    }, 1000);
}

function delObjects(ids, callback) {
    if (!ids || !ids.length) {
        return void callback();
    } else {
        const id = ids.shift();
        objects.delObject(id, err => {
            if (err &&
                id !== 'system.group.user' &&
                id !== 'system.group.administrator' &&
                id !== 'system.user.admin'
            ) {
                console.warn(`[Not critical] Cannot delete object ${id}: ${JSON.stringify(err)}`);
            }
            setImmediate(delObjects, ids, callback);
        });
    }
}

function cleanDatabase(isDeleteDb, callback) {
    let taskCnt = 0;

    if (isDeleteDb) {
        objects.destroyDB(() => {

            // Clean up states
            states.getKeys('*', (_err, obj) => {
                const delState = [];
                let i;
                if (obj) {
                    for (i = 0; i < obj.length; i++) {
                        delState.push(obj[i]);
                    }
                }
                taskCnt = 0;
                for (i = 0; i < obj.length; i++) {
                    taskCnt++;
                    states.delState(delState[i], () => !(--taskCnt) && callback && callback(obj.length));
                }
            });
        });
    } else {
        // Clean only objects, not the views
        objects.getObjectList({startkey: '\u0000', endkey: '\u9999'}, (err, res) => {
            let ids = [];
            if (!err && res.rows.length) {
                console.log('clean ' + res.rows.length + ' objects...');
                ids = res.rows.map(e => e.id);
            }
            delObjects(ids, () => {
                // Clean up states
                states.getKeys('*', (_err, obj) => {
                    const delState = [];
                    let i;
                    if (obj) {
                        for (i = 0; i < obj.length; i++) {
                            delState.push(obj[i]);
                        }
                    }
                    taskCnt = 0;
                    console.log('clean ' + obj.length + ' states...');
                    for (i = 0; i < obj.length; i++) {
                        taskCnt++;
                        states.delState(delState[i], () => !(--taskCnt) && callback && callback(obj.length));
                    }
                    if (!taskCnt && callback) {
                        return void callback(obj.length);
                    }
                });
            });
        });
    }
}
function unsetup(params, callback) {
    dbConnect(params, () => {
        objects.delObject('system.meta.uuid', err => {
            if (err) {
                console.log('uuid cannot be deleted: ' + err);
            } else {
                console.log('system.meta.uuid deleted');
            }
            objects.getObject('system.config', (_err, obj) => {
                if (obj.common.licenseConfirmed || obj.common.language || (obj.native && obj.native.secret)) {
                    obj.common.licenseConfirmed = false;
                    obj.common.language = '';
                    obj.native && delete obj.native.secret;

                    obj.from = 'system.host.' + tools.getHostName() + '.cli';
                    obj.ts = new Date().getTime();

                    objects.setObject('system.config', obj, err => {
                        if (err) {
                            console.log('not found: ' + err);
                            return void callback(EXIT_CODES.CANNOT_SET_OBJECT);
                        } else {
                            console.log('system.config reset');
                            return void callback();
                        }
                    });
                } else {
                    console.log('system.config is OK');
                    return void callback();
                }
            });
        });
    });
}
function restartController(callback) {
    const spawn = require('child_process').spawn;

    console.log('Starting node restart.js');

    const child = spawn('node', [__dirname + '/restart.js'], {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore'],
        windowsHide: true
    });

    child.unref();

    if (callback) {
        callback();
    } else {
        processExit();
    }
}

function installNpm(adapter, rebuildCommand, callback) {
    if (typeof rebuildCommand === 'function') {
        callback = rebuildCommand;
        rebuildCommand = false;
    }

    let path = __dirname;
    if (typeof adapter === 'function') {
        callback = adapter;
        adapter = undefined;
    }

    if (adapter) {
        if (rebuildCommand && adapter === 'self') {
            path = pathLib.join(__dirname, '..');
        } else {
            path = tools.getAdapterDir(adapter);
        }
    }

    if (!path) {
        console.log('Cannot install ' + tools.appName + '.' + adapter + ': adapter path not found');
        (callback || processExit)(EXIT_CODES.CANNOT_INSTALL_NPM_PACKET);
        return;
    }
    const npmCommand = typeof rebuildCommand === 'string' ? rebuildCommand : 'install';

    // iob_npm.done file was created if "npm i" yet called there
    if (fs.existsSync(pathLib.join(path, 'package.json')) && (rebuildCommand || !fs.existsSync(pathLib.join(path, 'iob_npm.done')))) {
        let cmd = 'npm ' + npmCommand +' --loglevel error';
        if (npmCommand === 'install') {
            cmd += ' --production';
        }
        console.log(cmd + ' (System call) in "' + path + '"');
        // Install node modules as system call

        // System call used for update of js-controller itself,
        // because during installation npm packet will be deleted too, but some files must be loaded even during the install process.
        const exec = require('child_process').exec;
        const child = exec(cmd, {
            cwd: path,
            windowsHide: true
        });
        tools.pipeLinewise(child.stderr, process.stdout);
        // tools.pipeLinewise(child.stdout, process.stdout);
        child.on('exit', (code, _signal) => {
            // code 1 is strange error that cannot be explained. Everything is installed but error :(
            if (code && code !== 1) {
                console.log('Cannot install ' + tools.appName + '.' + adapter + ': ' + code);
                (callback || processExit)(EXIT_CODES.CANNOT_INSTALL_NPM_PACKET);
                return;
            }
            // command succeeded
            if (!rebuildCommand || rebuildCommand === 'install') {
                fs.writeFileSync(path + '/iob_npm.done', ' ');
            }
            typeof callback === 'function' && callback(null, adapter);
        });
    } else if (typeof callback === 'function') {
        callback(null, adapter);
    }
}

function getRepository(repoUrl, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = {};
    }
    params = params || {};

    if (!repoUrl || typeof repoUrl !== 'object') {
        if (!objects) {
            dbConnect(params, () => getRepository(repoUrl, params, callback));
        } else {
            // try to read repository
            objects.getObject('system.config', (_err, systemConfig) => {
                objects.getObject('system.repositories', (err, repos) => {
                    // Check if repositories exists
                    if (!err && repos && repos.native && repos.native.repositories) {
                        const active = systemConfig.common.activeRepo;

                        if (repos.native.repositories[active]) {
                            if (typeof repos.native.repositories[active] === 'string') {
                                repos.native.repositories[active] = {
                                    link: repos.native.repositories[active],
                                    json: null
                                };
                            }

                            // If repo is not yet loaded
                            if (!repos.native.repositories[active].json) {
                                console.log('Update repository "' + active + '" under "' + repos.native.repositories[active].link + '"');
                                // Load it
                                tools.getRepositoryFile(repos.native.repositories[active].link, {
                                    hash: repos.native.repositories[active].hash,
                                    sources: repos.native.repositories[active].json,
                                    controller: require('../io-package.json').common.version,
                                    node: process.version,
                                    name: tools.appName
                                }, (_err, sources, sourcesHash) => {
                                    repos.native.repositories[active].json = sources;
                                    repos.native.repositories[active].hash = sourcesHash;
                                    repos.from = 'system.host.' + tools.getHostName() + '.cli';
                                    repos.ts = new Date().getTime();
                                    // Store uploaded repo
                                    objects.setObject('system.repositories', repos, () => void callback(null, sources));
                                });
                            } else {
                                // We have already repo, give it back
                                return void callback(null, repos.native.repositories[active].json);
                            }
                        } else {
                            console.log('Requested repository "' + active + '" does not exit in config.');
                            return void callback(EXIT_CODES.INVALID_REPO);
                        }
                    } else {
                        console.log('No repositories defined.');
                        return void callback(EXIT_CODES.INVALID_REPO);
                    }
                });
            });
        }
    } else {
        return void callback(null, repoUrl);
    }
}

async function resetDbConnect(_callback) {
    if (objects) {
        await objects.destroy();
        objects = null;
    }
    if (states) {
        await states.destroy();
        states = null;
    }
    if (Objects) {
        delete require.cache[require.resolve(__dirname + '/objects')];
        Objects = null;
    }
    if (States) {
        delete require.cache[require.resolve(__dirname + '/states')];
        States = null;
    }
}

// function showConfig(config, root) {
//     root = root || [];
//     const prefix = root.join('/').toUpperCase();
//     for (const attr in config) {
//         if (!config.hasOwnProperty(attr)) continue;
//         if (attr.match(/comment$/i)) continue;
//         if (typeof config[attr] === 'object') {
//             const nextRoot = deepClone(root);
//             nextRoot.push(attr);
//             showConfig(config[attr], nextRoot);
//         } else {
//             console.log(`${prefix}${(prefix ? '/' : '') + attr}: ` + config[attr]);
//         }
//     }
// }

function checkSystemOffline(onlyCheck, callback) {
    if (!objects || !states) { // should never happen
        callback && callback(true);
        return;
    }
    if (onlyCheck) {
        callback && callback(true);
        return;
    }
    setTimeout(() => { // Slight delay to allow "setup first" from Pre 2.0 to 2.0
        enumHosts(objects).then(hosts => {
            const hostToCheck = hosts.map(host => 'system.host.' + host.common.hostname + '.alive');

            states.getStates(hostToCheck, (err, res) => {
                res.forEach(aliveState => {
                    if (aliveState && aliveState.val) {
                        callback && callback(false);
                        callback = null;
                    }
                });
                callback && callback(true);
            });
        }).catch(() => {
            callback && callback(true);
        });
    }, 500);
}

/**
 * Connects to the DB or tests the connection. The callback has the following signature:
 * `(objects: any, states: any, isOffline?: boolean, objectsDBType?: string) => void`
 */
function dbConnect(onlyCheck, params, callback) {
    if (typeof onlyCheck === 'object') {
        callback  = params;
        params    = onlyCheck;
        onlyCheck = false;
    }
    if (typeof onlyCheck === 'function') {
        callback  = onlyCheck;
        onlyCheck = false;
    }
    if (typeof params === 'function') {
        callback  = params;
        params    = null;
    }
    params = params || {};

    const config = fs.readJSONSync(tools.getConfigFileName());

    if (objects && states) {
        return void callback(objects, states, false, config.objects.type, config);
    }

    config.states  = config.states  || {type: 'file'};
    config.objects = config.objects || {type: 'file'};

    Objects = require('./objects'); // Objects DB Client object
    States  = require('./states'); // States DB Client object

    // Give to controller 2 seconds for connection
    let isObjectConnected = false;
    let isStatesConnected = false;

    // Detect timeout or try to open file itself
    setTimeout(() => {
        if (isObjectConnected && isStatesConnected) {
            return;
        }

        if (!isObjectConnected) {
            if (objects) { // Destroy Client we tried to connect with
                objects.destroy();
                objects = null;
            }
            if (tools.objectsDbHasServer(config.objects.type)) {
                // Just open in memory DB itself
                Objects = require(`@iobroker/db-objects-${config.objects.type}`).Server;
                objects = new Objects({
                    connection: config.objects,
                    logger: {
                        silly: _msg => {},
                        debug: _msg => {},
                        info:  _msg => {},
                        warn:  msg => console.log(msg),
                        error: msg => console.log(msg)
                    },
                    connected: () => {
                        isObjectConnected = true;
                        if (isStatesConnected && typeof callback === 'function') {
                            return void callback(objects, states, true, config.objects.type, config);
                        }
                    }
                });
            } else {
                console.log('No connection to objects ' + config.objects.host + ':' + config.objects.port + '[' + config.objects.type + ']');
                if (onlyCheck) {
                    callback && callback(objects, states, true, config.objects.type, config);
                    callback = null;
                } else {
                    processExit(EXIT_CODES.NO_CONNECTION_TO_OBJ_DB);
                }
            }
        }

        if (!isStatesConnected) {
            if (states) { // Destroy Client we tried to connect with
                states.destroy();
                states = null;
            }
            if (tools.statesDbHasServer(config.states.type)) {
                // Just open in memory DB itself
                States = require(`@iobroker/db-states-${config.states.type}`).Server;
                states = new States({
                    connection: config.states,
                    logger: {
                        silly: _msg => {},
                        debug: _msg => {},
                        info:  _msg => {},
                        warn:  msg => console.log(msg),
                        error: msg => console.log(msg)
                    },
                    connected: () => {
                        isStatesConnected = true;
                        if (isObjectConnected && typeof callback === 'function') {
                            return void callback(objects, states, true, config.objects.type, config);
                        }
                    },
                    // react on change
                    change: (id, msg) => states.onChange && states.onChange(id, msg)
                });
                states.onChange = null; // here the custom onChange handler could be installed
            } else {
                if (states) { // Destroy Client we tried to connect with
                    states.destroy();
                    states = null;
                }
                if (objects) { // Destroy Client we tried to connect with
                    objects.destroy();
                    objects = null;
                }
                console.log('No connection to states ' + config.states.host + ':' + config.states.port + '[' + config.states.type + ']');
                if (onlyCheck) {
                    callback && callback(objects, states, true, config.objects.type, config);
                    callback = null;
                } else {
                    processExit(EXIT_CODES.NO_CONNECTION_TO_OBJ_DB);
                }
            }
        }

        setTimeout(() => { // Failsafe
            if (isObjectConnected && isStatesConnected) {
                return;
            }

            console.log('No connection to databases possible ...');
            if (onlyCheck) {
                callback && callback(null, null, true, config.objects.type, config);
                callback = null;
            } else {
                processExit(EXIT_CODES.NO_CONNECTION_TO_OBJ_DB);
            }
        }, params.timeout || config.objects.connectTimeout || 2000);

    }, params.timeout || config.objects.connectTimeout || 2000);

    // try to connect as client
    objects = new Objects({
        connection: config.objects,
        logger: {
            silly: _msg => {},
            debug: _msg => {},
            info:  _msg => {},
            warn:  msg => console.log(msg),
            error: msg => console.log(msg)
        },
        connected: () => {
            if (isObjectConnected) {
                return;
            }
            isObjectConnected = true;

            if (isStatesConnected && typeof callback === 'function') {
                checkSystemOffline(onlyCheck, isOffline => {
                    callback(objects, states, isOffline, config.objects.type, config);
                });
            }
        }
    });

    states = new States({
        connection: config.states,
        logger: {
            silly: _msg => {},
            debug: _msg => {},
            info:  _msg => {},
            warn:  msg => console.log(msg),
            error: msg => console.log(msg)
        },
        connected: () => {
            if (isStatesConnected) {
                return;
            }
            isStatesConnected = true;

            if (isObjectConnected && typeof callback === 'function') {
                checkSystemOffline(onlyCheck, isOffline => {
                    callback(objects, states, isOffline, config.objects.type, config);
                });
            }
        },
        change: (id, state) => states.onChange && states.onChange(id, state)
    });
}

module.exports.processCommand = function (_objects, _states, command, args, params, callback) {
    objects = _objects;
    states  = _states;
    processCommand(command, args, params, callback);
};
const processCommandAsync = tools.promisifyNoError(module.exports.processCommand);
module.exports.processCommandAsync = function (_objects, _states, _command, _args, _params) {
    return processCommandAsync.apply(undefined, arguments);
};

module.exports.execute = function () {
    // direct call
    const _yargs = initYargs();
    const command = _yargs.argv._[0];

    const args = [];
    for (let a = 1; a < _yargs.argv._.length; a++) {
        args.push(_yargs.argv._[a]);
    }

    processCommand(command, args, _yargs.argv, processExit);
};

process.on('unhandledRejection', err => {
    console.error(`Uncaught Rejection: ${err.stack || err}`);
    processExit(EXIT_CODES.UNCAUGHT_EXCEPTION);
});
