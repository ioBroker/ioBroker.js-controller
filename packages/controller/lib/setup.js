/**
 *
 *  ioBroker Command Line Interface (CLI)
 *
 *  7'2014-2021 bluefox <dogafox@gmail.com>
 *         2014 hobbyquaker <hq@ccu.io>
 *
 */

/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
'use strict';
// TODO need info about progress of stopping

const fs = require('fs-extra');
const { tools } = require('@iobroker/js-controller-common');
const cli = require('@iobroker/js-controller-cli');
const { EXIT_CODES } = require('@iobroker/js-controller-common');
const { enumHosts } = require('@iobroker/js-controller-cli').tools;
const deepClone = require('deep-clone');
const { isDeepStrictEqual } = require('util');
const debug = require('debug')('iobroker:cli');
const { tools: dbTools, getObjectsConstructor, getStatesConstructor } = require('@iobroker/js-controller-common-db');
const path = require('path');
const { PluginHandler } = require('@iobroker/plugin-base');

let pluginHandler;

// @ts-ignore
require('events').EventEmitter.prototype._maxListeners = 100;
process.setMaxListeners(0);

/** @type {import('yargs')} */
let yargs;

function initYargs() {
    yargs = require('yargs')
        .scriptName(tools.appName)
        .locale('en') // otherwise it could be mixed, because our implementations are in english
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
        .command(
            'start [all|<adapter>.<instance>]',
            'Starts the js-controller or a specified adapter instance',
            yargs => {
                yargs
                    .command('all', 'Starts js-controller and all adapters')
                    .command('<adapter>[.<instance>]', 'Starts a specified adapter instance');
            }
        )
        .command('stop [<adapter>.<instance>]', 'stops the js-controller or a specified adapter instance', yargs => {
            yargs.command('<adapter>[.<instance>]', 'Stops a specified adapter instance');
        })
        .command(
            ['restart [<adapter>.<instance>]', 'r [<adapter>.<instance>]'],
            'Restarts js-controller or a specified adapter instance',
            yargs => {
                yargs.command('<adapter>[.<instance>]', 'Restarts a specified adapter instance', {});
            }
        )
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
            'lines=1000': {
                // TODO: it's the only place we use = we should avoid this
                describe: 'Number of lines',
                type: 'string'
            },
            watch: {
                describe: 'Watch',
                type: 'boolean'
            }
        })
        .command(['add <adapter> [desiredNumber]', 'a <adapter> [desiredNumber]'], 'Add instance of adapter', {
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
        .command(['install <adapter>', 'i <adapter>'], 'Installs a specified adapter', {})
        .command('rebuild [<path>]', 'Rebuild all native modules or path', {})
        .command('url <url> [<name>]', 'Install adapter from specified url, e.g. GitHub', {})
        .command(['del <adapter>', 'delete <adapter>'], 'Remove adapter from system', {
            custom: {
                describe: 'Remove adapter custom attribute from all objects',
                type: 'boolean'
            }
        })
        .command(['del <adapter>.<instance>', 'delete <adapter>.<instance>'], 'Remove adapter instance', {
            custom: {
                describe: 'Remove instance custom attribute from all objects',
                type: 'boolean'
            }
        })
        .command('update [<repositoryUrl>]', 'Update repository and list adapters', {
            updatable: {
                describe: 'Only show updatable adapters',
                alias: 'u',
                type: 'boolean'
            },
            all: {
                describe: 'Show all available adapters',
                alias: 'a',
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
                .option('yes', {
                    describe: 'Bypass questionnaire',
                    alias: 'y',
                    type: 'boolean'
                })
                .command('[<repositoryUrl>]', 'Upgrade all adapters, optionally you can specify the repository url', {})
                .command(
                    'all [<repositoryUrl>]',
                    'Upgrade all adapters, optionally you can specify the repository url',
                    {}
                )
                .command(
                    'self [<repositoryUrl>]',
                    'Upgrade js-controller, optionally you can specify the repository url',
                    {}
                )
                .command(
                    '<adapter> [<repositoryUrl>]',
                    'Upgrade specified adapter, optionally you can specify the repository url',
                    {}
                );
        })
        .command(['upload [all|<adapter>]', 'u [all|<adapter>]'], 'Upload management', yargs => {
            yargs
                .command(
                    `<pathToLocalFile> <pathIn${tools.appName}>`,
                    'Upload given files to provided path to make them available for instances',
                    {}
                )
                .command('all', 'Upload all adapter files to make them available for instances', {})
                .command('<adapter>', 'Upload specified adapter files to make them available for instances', {});
        })
        .command(['object', 'o'], 'Object management', yargs => {
            yargs
                .command('get <id>', 'Get object specified by id', {})
                .command('set <id> <json-value>', 'Set object with the given id by providing a new json object', {})
                .command(
                    'set <id> propertyname=<value or json-value>',
                    'Update part of the object by providing a new value or partial object',
                    {}
                )
                .command(
                    'extend <id> <json-value>',
                    'Extend object with the given id by providing a new json object',
                    {}
                )
                .command('del <id|pattern>', 'Delete object with given id or all objects matching the pattern', {
                    y: {
                        describe: 'Bypass questionnaire',
                        alias: 'y',
                        type: 'boolean'
                    }
                })
                .command('chmod <object-mode> [state-mode] <id>', 'Change object rights', {})
                .command('chown <user> <group> <id>', 'Change object ownership', {})
                .command('list <pattern>', 'List object matching given pattern', {})
                .command('setDBVersion <version>', 'Sets the protocol version of the objects database')
                .command('getDBVersion', 'Get the protocol version of the objects database');
        })
        .command(['state', 's'], 'State management', yargs => {
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
                .command('del <id>', 'Delete state, specified by id', {})
                .command('setDBVersion <version>', 'Sets the protocol version of the states database')
                .command('getDBVersion', 'Get the protocol version of the states database');
        })
        .command('message <adapter>[.instance] <command> [<message>]', 'Send message to adapter instance/s', {})
        .command('list <type> [<filter>]', 'List all entries, like objects', {})
        .command('chmod <mode> <file>', 'Change file rights', {})
        .command('chown <user> <group> <file>', 'Change file ownership', {})
        .command('touch <file>', 'Touch file', {})
        .command('rm <file>', 'Remove file', {})
        .command('file', 'File management', yargs => {
            yargs
                .command(
                    `read <${tools.appName}-path-to-read> [<filesystem-path-to-write>]`,
                    `Read file from ${tools.appName} path and optionally write to destination`,
                    {}
                )
                .command(
                    `write <filesystem-path-to-read> <${tools.appName}-path-to-write>`,
                    `Read file from path and write it to ${tools.appName} path`,
                    {}
                )
                .command(`rm <${tools.appName}-path-to-delete>`, 'Remove file', {})
                .command('sync', 'Sync files', {});
        })
        .command('user', 'User commands', yargs => {
            yargs
                .command('add <user>', 'Add new user', yargs => {
                    yargs
                        .option('ingroup', {
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
                    yargs.option('password', {
                        describe: 'User password',
                        type: 'string'
                    });
                })
                .command('enable <user>', 'Enable user', {})
                .command('disable <user>', 'Disable user', {})
                .command('get <user>', 'Get user', {})
                .command('check <user>', 'Check user password', yargs => {
                    yargs.option('password', {
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
                describe:
                    'Set the name of the parameter you want to change as option followed by its value, e. g. --port 80'
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
        .command(['status [all|<adapter>.<instance>]', 'isrun'], 'Status of ioBroker or adapter instance', yargs => {
            yargs
                .command('all', 'Show entire config')
                .command('<adapter>[.<instance>]', 'Status of a specified adapter instance');
        })
        .command('repo [<name>]', 'Show repo information', yargs => {
            yargs
                .command('set <name>', 'Set active repository')
                .command('del <name>', 'Remove repository')
                .command('add <name> <url>', 'Add repository')
                .command('addset <name> <url>', 'Add repository and set it as active one')
                .command('show', 'List repositories');
        })
        .command(['uuid', 'id'], 'Show uuid of the installation', {})
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
                .command(
                    '<adapter>.<instance> <disable|off> [group-id]',
                    'Enable or disable compact mode for specified adapter instance and set compact group optionally'
                )
                .command(
                    '<adapter>.<instance> <enable|on> [group-id]',
                    'Enable or disable compact mode for specified adapter instance and set compact group optionally'
                );
        })
        .command('plugin', 'Plugin management', yargs => {
            yargs
                .command(
                    'enable <pluginname>',
                    'Enables a plugin for the specified host or instance. If no host is specified, the current one is used',
                    {
                        host: {
                            describe: 'Hostname',
                            type: 'string'
                        },
                        instance: {
                            describe: 'Instance, e.g. hm-rpc.0',
                            type: 'string'
                        }
                    }
                )
                .command(
                    'disable <pluginname>',
                    'Disables a plugin for the specified host or instance. If no host is specified, the current one is used',
                    {
                        host: {
                            describe: 'Hostname',
                            type: 'string'
                        },
                        instance: {
                            describe: 'Instance, e.g. hm-rpc.0',
                            type: 'string'
                        }
                    }
                )
                .command(
                    'status <pluginname>',
                    'Checks if a plugin is enabled for the specified host or instance. If no host is specified, the current one is used',
                    {
                        host: {
                            describe: 'Hostname',
                            type: 'string'
                        },
                        instance: {
                            describe: 'Instance, e.g. hm-rpc.0',
                            type: 'string'
                        }
                    }
                );
        })
        .command(['version [<adapter>]', 'v [<adapter>]'], 'Show version of js-controller or specified adapter')
        .wrap(null);

    return yargs;
}

/**
 * Show yargs help, if processCommand is used as import, yargs won't be initialized
 * @param {object?} _yargs - yargs instance
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
let States; // constructor
let states; // instance

/**
 * Process the given CLI command
 *
 * @param {string|number} command - command to execute
 * @param {any[]} args - arguments passed to yargs
 * @param {object} params - object with parsed params by yargs, e. g. --force is params.force
 * @param {(exitCode?: number) => void} callback
 */
async function processCommand(command, args, params, callback) {
    if (typeof args === 'function') {
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

    /** @type {import('@iobroker/js-controller-cli/lib/cli/cliCommand').CLICommandContext} */
    const commandContext = { dbConnect, callback, showHelp };
    /** @type {import('@iobroker/js-controller-cli/lib/cli/cliCommand').CLICommandOptions} */
    const commandOptions = Object.assign({}, params, commandContext);
    debug(`commandOptions: ${JSON.stringify(commandOptions)}`);
    debug(`args: ${args}`);

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
            Objects = getObjectsConstructor();
            const repoUrl = args[0]; // Repo url or name
            dbConnect(params, async (_objects, _states) => {
                const Repo = require('./setup/setupRepo.js');
                const repo = new Repo({
                    objects: _objects,
                    states: _states
                });

                await repo.showRepo(repoUrl, params);
                setTimeout(callback, 1000);
            });
            break;
        }

        case 'setup': {
            const Setup = require('./setup/setupSetup.js');
            const setup = new Setup({
                dbConnect,
                processExit: callback,
                cleanDatabaseAsync,
                restartControllerAsync,
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

                setup.setup(
                    async (isFirst, _isRedis) => {
                        if (isFirst) {
                            // Creates all instances that are needed on a fresh installation
                            const Install = require('./setup/setupInstall.js');
                            const install = new Install({
                                objects,
                                states,
                                getRepository,
                                processExit: callback,
                                params
                            });
                            // Define the necessary instances
                            const initialInstances = ['admin', 'discovery', 'backitup'];
                            // And try to install each of them
                            for (const instance of initialInstances) {
                                try {
                                    const path = require.resolve(tools.appName + '.' + instance);
                                    if (path) {
                                        await install.createInstanceAsync(instance, {
                                            enabled: true,
                                            ignoreIfExists: true
                                        });
                                    }
                                } catch {
                                    // not found, just continue
                                }
                            }

                            await new Promise(resolve => {
                                // Creates a fresh certificate
                                const Cert = cli.command.cert;
                                // Create a new instance of the cert command,
                                // but use the resolve method as a callback
                                const cert = new Cert(Object.assign({}, commandOptions, { callback: resolve }));
                                cert.create();
                            });
                            callback && callback();
                        } else {
                            // else we update existing stuff (this is executed on installation)
                            // Rename repositories
                            const Repo = require('./setup/setupRepo.js');
                            const repo = new Repo({ objects, states });

                            try {
                                await repo.rename(
                                    'default',
                                    'stable',
                                    'http://download.iobroker.net/sources-dist.json'
                                );
                                await repo.rename(
                                    'latest',
                                    'beta',
                                    'http://download.iobroker.net/sources-dist-latest.json'
                                );
                            } catch (err) {
                                console.warn(`Cannot rename: ${err.message}`);
                            }

                            // there has been a bug that user can uplaod js-controller
                            try {
                                await objects.delObjectAsync('system.adapter.js-controller');
                            } catch {
                                // ignore
                            }

                            try {
                                const configFile = tools.getConfigFileName();

                                const configOrig = fs.readJSONSync(configFile);
                                const config = deepClone(configOrig);

                                config.objects.options = config.objects.options || {
                                    auth_pass: null,
                                    retry_max_delay: 5000
                                };
                                if (
                                    config.objects.options.retry_max_delay === 15000 ||
                                    !config.objects.options.retry_max_delay
                                ) {
                                    config.objects.options.retry_max_delay = 5000;
                                }
                                config.states.options = config.states.options || {
                                    auth_pass: null,
                                    retry_max_delay: 5000
                                };
                                if (
                                    config.states.options.retry_max_delay === 15000 ||
                                    !config.states.options.retry_max_delay
                                ) {
                                    config.states.options.retry_max_delay = 5000;
                                }

                                if (!isDeepStrictEqual(config, configOrig)) {
                                    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
                                    console.log('ioBroker configuration updated');
                                }
                            } catch (err) {
                                console.log(`Could not update ioBroker configuration: ${err.message}`);
                            }

                            return void callback();
                        }
                    },
                    isFirst,
                    isRedis
                );
            }
            break;
        }

        case 'url': {
            Objects = getObjectsConstructor();

            let url = args[0];
            const name = args[1];

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
                    objects,
                    states,
                    getRepository,
                    processExit: callback,
                    params
                });

                install.installAdapterFromUrl(url, name, callback);
            });
            break;
        }

        case 'info': {
            Objects = getObjectsConstructor();
            dbConnect(params, async objects => {
                try {
                    const data = await tools.getHostInfo(objects);
                    const formatters = require('./formatters');
                    const formatInfo = {
                        Uptime: formatters.formatSeconds,
                        'System uptime': formatters.formatSeconds,
                        RAM: formatters.formatRam,
                        Speed: formatters.formatSpeed,
                        'Disk size': formatters.formatBytes,
                        'Disk free': formatters.formatBytes
                    };

                    for (const attr of Object.keys(data)) {
                        console.log(
                            `${attr}${attr.length < 16 ? new Array(16 - attr.length).join(' ') : ''}: ${
                                formatInfo[attr] ? formatInfo[attr](data[attr]) : data[attr] || ''
                            }`
                        );
                    }
                } catch (err) {
                    console.error('Cannot read host info: ' + (typeof err === 'object' ? JSON.stringify(err) : err));
                    return callback(EXIT_CODES.CANNOT_GET_HOST_INFO);
                }

                return void callback();
            });
            break;
        }

        case 'a':
        case 'add':
        case 'install':
        case 'i': {
            Objects = getObjectsConstructor();

            let name = args[0];
            let instance = args[1];
            let repoUrl = args[2];

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

            dbConnect(params, async () => {
                const Install = require('./setup/setupInstall.js');
                const install = new Install({
                    objects,
                    states,
                    getRepository,
                    processExit: callback,
                    params
                });

                if (params.host && params.host !== tools.getHostName()) {
                    // if host argument provided we should check, that host actually exists in mh environment
                    let obj;
                    try {
                        obj = await objects.getObjectAsync(`system.host.${params.host}`);
                    } catch (err) {
                        console.warn(`Could not check existence of host "${params.host}": ${err.message}`);
                    }

                    if (!obj) {
                        console.error(`Cannot add instance to non-existing host "${params.host}"`);
                        return void callback(EXIT_CODES.NON_EXISTING_HOST);
                    }
                }

                if (!fs.existsSync(adapterDir)) {
                    try {
                        await install.downloadPacketAsync(repoUrl, installName);
                        await install.installAdapterAsync(installName, repoUrl);
                        if (command !== 'install' && command !== 'i') {
                            await install.createInstanceAsync(name, params);
                        }
                        return void callback();
                    } catch (err) {
                        console.error(`adapter "${name}" cannot be installed: ${err.message}`);
                        return void callback(EXIT_CODES.UNKNOWN_ERROR);
                    }
                } else if (command !== 'install' && command !== 'i') {
                    try {
                        await install.createInstanceAsync(name, params);
                        return void callback();
                    } catch (err) {
                        console.error(`adapter "${name}" cannot be installed: ${err.message}`);
                        return void callback(EXIT_CODES.UNKNOWN_ERROR);
                    }
                } else {
                    console.log(`adapter "${name}" already installed. Use "upgrade" to upgrade to a newer version.`);
                    return void callback(EXIT_CODES.ADAPTER_ALREADY_INSTALLED);
                }
            });
            break;
        }

        case 'rebuild': {
            const options = { debug: process.argv.includes('--debug') };

            if (commandOptions.path) {
                if (path.isAbsolute(commandOptions.path)) {
                    options.cwd = commandOptions.path;
                } else {
                    console.log('Path argument needs to be an absolute path!');
                    return processExit(EXIT_CODES.INVALID_ARGUMENTS);
                }
            }

            console.log(`Rebuilding native modules${options.cwd ? ` in ${options.cwd}` : ''} ...`);
            const result = await tools.rebuildNodeModules(options);

            if (result.success) {
                console.log();
                console.log(`Rebuilding native modules done`);
                return void callback();
            } else {
                processExit(`Rebuilding native modules failed with exit code ${result.exitCode}`);
            }
            break;
        }

        case 'upload':
        case 'u': {
            Objects = getObjectsConstructor();
            const name = args[0];
            const subTree = args[1];
            if (name) {
                dbConnect(params, async () => {
                    const Upload = require('./setup/setupUpload.js');
                    const upload = new Upload({ states, objects });

                    if (name === 'all') {
                        try {
                            const objs = await objects.getObjectListAsync({
                                startkey: 'system.adapter.',
                                endkey: 'system.adapter.\u9999'
                            });
                            const adapters = [];
                            for (let i = 0; i < objs.rows.length; i++) {
                                if (objs.rows[i].value.type !== 'adapter') {
                                    continue;
                                }
                                adapters.push(objs.rows[i].value.common.name);
                            }

                            await upload.uploadAdapterFullAsync(adapters);
                            callback();
                        } catch (err) {
                            console.error(`Cannot upload all adapters: ${err.message}`);
                            return void callback(EXIT_CODES.CANNOT_UPLOAD_DATA);
                        }
                    } else {
                        // if upload of file
                        if (name.includes('.')) {
                            if (!subTree) {
                                console.log(
                                    `Please specify target name, like:\n${tools.appName} upload /file/picture.png /vis.0/main/img/picture.png`
                                );
                                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                            }

                            try {
                                const newName = await upload.uploadFileAsync(name, subTree);
                                console.log(`File "${name}" is successfully saved under ${newName}`);
                                return void callback();
                            } catch (err) {
                                console.error(`Cannot upload file "${name}": ${err.message}`);
                                return void callback(EXIT_CODES.CANNOT_UPLOAD_DATA);
                            }
                        } else {
                            try {
                                if (subTree) {
                                    await upload.uploadAdapterAsync(name, false, true, subTree);
                                } else {
                                    await upload.uploadAdapterFullAsync([name]);
                                }
                                return void callback();
                            } catch (err) {
                                console.error(`Cannot upload files "${name}": ${err.message}`);
                                return void callback(EXIT_CODES.CANNOT_UPLOAD_DATA);
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
            let adapter = args[0];
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
                    [adapter, instance] = adapter.split('.', 2);
                }
            } else {
                // ensure that adapter contains a valid adapter identifier
                // and the instance is a number
                if (!cli.tools.validateAdapterIdentifier(adapter) || !/^\d+$/.test(instance)) {
                    showHelp();
                    return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
                }
            }

            if (instance || instance === 0) {
                dbConnect(params, async () => {
                    const Install = require('./setup/setupInstall.js');
                    const install = new Install({
                        objects,
                        states,
                        getRepository,
                        processExit: callback,
                        params
                    });

                    console.log(`Delete instance "${adapter}.${instance}"`);
                    await install.deleteInstanceAsync(adapter, instance);
                    callback();
                });
            } else {
                dbConnect(params, async () => {
                    const Install = require('./setup/setupInstall.js');
                    const install = new Install({
                        objects,
                        states,
                        getRepository,
                        processExit: callback,
                        params
                    });
                    console.log(`Delete adapter "${adapter}"`);
                    const resultCode = await install.deleteAdapterAsync(adapter);
                    callback(resultCode);
                });
            }
            break;
        }
        case 'unsetup': {
            const rl = require('readline').createInterface({
                input: process.stdin,
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
            Objects = getObjectsConstructor();

            let adapter = cli.tools.normalizeAdapterName(args[0]);

            if (adapter === 'all') {
                adapter = null;
            }

            dbConnect(params, async () => {
                const Upgrade = require('./setup/setupUpgrade.js');
                const upgrade = new Upgrade({
                    objects,
                    states,
                    getRepository,
                    params,
                    processExit: callback,
                    restartController
                });

                if (adapter) {
                    try {
                        if (adapter === 'self') {
                            const hostAlive = await states.getStateAsync(`system.host.${tools.getHostName()}.alive`);
                            await upgrade.upgradeControllerAsync(
                                '',
                                params.force || params.f,
                                hostAlive && hostAlive.val
                            );
                        } else {
                            await upgrade.upgradeAdapterAsync(
                                '',
                                adapter,
                                params.force || params.f,
                                params.y || params.yes,
                                false
                            );
                        }
                        return void callback();
                    } catch (err) {
                        console.error(`Cannot upgrade: ${err.message}`);
                        return void callback(EXIT_CODES.INVALID_REPO);
                    }
                } else {
                    // upgrade all
                    try {
                        const links = await getRepository();
                        if (!links) {
                            return void callback(EXIT_CODES.INVALID_REPO);
                        }
                        await upgrade.upgradeAdapterHelperAsync(
                            links,
                            Object.keys(links).sort(),
                            false,
                            params.y || params.yes
                        );
                        return void callback();
                    } catch (err) {
                        console.error(`Cannot upgrade: ${err.message}`);
                        return void callback(EXIT_CODES.INVALID_REPO);
                    }
                }
            });
            break;
        }

        case 'clean': {
            const yes = args[0];
            if (yes !== 'yes') {
                console.log(
                    `Command "clean" clears all Objects and States. To execute it write "${tools.appName} clean yes"`
                );
            } else {
                dbConnect(params, (_obj, _stat, isNotRun) => {
                    if (!isNotRun) {
                        console.error(`Stop ${tools.appName} first!`);
                        return void callback(EXIT_CODES.CONTROLLER_RUNNING);
                    }
                    cleanDatabase(true, count => {
                        console.log('Deleted ' + count + ' states');
                        restartController(() => {
                            console.log(`Restarting ${tools.appName}...`);
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
                    console.error(`Stop ${tools.appName} first!`);
                    return void callback(EXIT_CODES.CONTROLLER_RUNNING);
                }

                const backup = new Backup({
                    states,
                    objects,
                    cleanDatabaseAsync,
                    restartControllerAsync,
                    processExit: callback
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

            dbConnect(params, async () => {
                const backup = new Backup({
                    states,
                    objects,
                    cleanDatabaseAsync,
                    restartControllerAsync,
                    processExit: callback
                });

                try {
                    const filePath = await backup.createBackupAsync(name);
                    console.log('Backup created: ' + filePath);
                    return void callback(EXIT_CODES.NO_ERROR);
                } catch (err) {
                    console.log('Cannot create backup: ' + err);
                    return void callback(EXIT_CODES.CANNOT_EXTRACT_FROM_ZIP);
                }
            });
            break;
        }

        case 'validate': {
            const name = args[0];
            const Backup = require('./setup/setupBackup.js');
            dbConnect(params, async () => {
                const backup = new Backup({
                    states,
                    objects,
                    cleanDatabaseAsync,
                    restartControllerAsync,
                    processExit: callback
                });

                try {
                    await backup.validateBackup(name);
                    console.log('Backup OK');
                    processExit(0);
                } catch (err) {
                    console.log(`Backup check failed: ${err.message}`);
                    processExit(1);
                }
            });
            break;
        }

        case 'l':
        case 'list': {
            dbConnect(params, (_objects, _states, _isOffline, _objectsType, config) => {
                const { setupList: List } = require('@iobroker/js-controller-cli');
                const list = new List({
                    states,
                    objects,
                    processExit: callback,
                    config
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
                    objects.getObjectList(
                        {
                            startkey: 'system.adapter.',
                            endkey: 'system.adapter.\u9999'
                        },
                        (err, arr) => {
                            if (!err && arr && arr.rows) {
                                const files = [];
                                let count = 0;
                                for (let i = 0; i < arr.rows.length; i++) {
                                    if (arr.rows[i].value.type !== 'adapter') {
                                        continue;
                                    }
                                    count++;
                                    objects.touch(
                                        arr.rows[i].value.common.name,
                                        '*',
                                        { user: 'system.user.admin' },
                                        (err, processed, _id) => {
                                            if (!err && processed) {
                                                files.push({ id: _id, processed: processed });
                                            }
                                            if (!--count) {
                                                const { setupList: List } = require('@iobroker/js-controller-cli');
                                                const list = new List({
                                                    states,
                                                    objects,
                                                    processExit: callback
                                                });
                                                files.sort((a, b) => a.id.localeCompare(b.id));

                                                for (let k = 0; k < files.length; k++) {
                                                    for (let t = 0; t < files[k].processed.length; t++) {
                                                        list.showFile(
                                                            files[k].id,
                                                            files[k].processed[t].path,
                                                            files[k].processed[t]
                                                        );
                                                    }
                                                }
                                                setTimeout(callback, 1000);
                                            }
                                        }
                                    );
                                }
                                if (!count) {
                                    console.log('Nothing found');
                                    return void callback();
                                }
                            }
                        }
                    );
                } else {
                    const parts = pattern.split('/');
                    const id = parts.shift();
                    const path = parts.join('/');

                    objects.touch(id, path, { user: 'system.user.admin' }, (err, processed) => {
                        if (err) {
                            console.error(err);
                        } else {
                            if (processed) {
                                const { setupList: List } = require('@iobroker/js-controller-cli');
                                const list = new List({
                                    states,
                                    objects,
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
                    objects.getObjectList(
                        {
                            startkey: 'system.adapter.',
                            endkey: 'system.adapter.\u9999'
                        },
                        (err, arr) => {
                            if (!err && arr && arr.rows) {
                                const files = [];
                                let count = 0;
                                for (let i = 0; i < arr.rows.length; i++) {
                                    if (arr.rows[i].value.type !== 'adapter') {
                                        continue;
                                    }
                                    count++;
                                    objects.rm(
                                        arr.rows[i].value.common.name,
                                        '*',
                                        { user: 'system.user.admin' },
                                        (err, processed, _id) => {
                                            if (!err && processed) {
                                                files.push({ id: _id, processed: processed });
                                            }
                                            if (!--count) {
                                                const { setupList: List } = require('@iobroker/js-controller-cli');
                                                const list = new List({
                                                    states,
                                                    objects,
                                                    processExit: callback
                                                });
                                                files.sort((a, b) => a.id.localeCompare(b.id));

                                                list.showFileHeader();
                                                for (let k = 0; k < files.length; k++) {
                                                    for (let t = 0; t < files[k].processed.length; t++) {
                                                        list.showFile(
                                                            files[k].id,
                                                            files[k].processed[t].path,
                                                            files[k].processed[t]
                                                        );
                                                    }
                                                }
                                                setTimeout(callback, 1000);
                                            }
                                        }
                                    );
                                }
                                if (!count) {
                                    console.log('Nothing found');
                                    return void callback();
                                }
                            }
                        }
                    );
                } else {
                    const parts = pattern.split('/');
                    const id = parts.shift();
                    const path = parts.join('/');

                    objects.rm(id, path, { user: 'system.user.admin' }, (err, processed) => {
                        if (err) {
                            console.error(err);
                        } else {
                            if (processed) {
                                const { setupList: List } = require('@iobroker/js-controller-cli');
                                const list = new List({
                                    states,
                                    objects,
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
            let mode = args[0];
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
                    objects.getObjectList(
                        {
                            startkey: 'system.adapter.',
                            endkey: 'system.adapter.\u9999'
                        },
                        (err, arr) => {
                            if (!err && arr && arr.rows) {
                                const files = [];
                                let count = 0;
                                for (let i = 0; i < arr.rows.length; i++) {
                                    if (arr.rows[i].value.type !== 'adapter') {
                                        continue;
                                    }
                                    count++;
                                    objects.chmodFile(
                                        arr.rows[i].value.common.name,
                                        '*',
                                        {
                                            user: 'system.user.admin',
                                            mode
                                        },
                                        (err, processed, _id) => {
                                            if (!err && processed) {
                                                files.push({ id: _id, processed: processed });
                                            }
                                            if (!--count) {
                                                const { setupList: List } = require('@iobroker/js-controller-cli');
                                                const list = new List({
                                                    states,
                                                    objects,
                                                    processExit: callback
                                                });
                                                files.sort((a, b) => a.id.localeCompare(b.id));

                                                list.showFileHeader();
                                                for (let k = 0; k < files.length; k++) {
                                                    for (let t = 0; t < files[k].processed.length; t++) {
                                                        list.showFile(
                                                            files[k].id,
                                                            files[k].processed[t].path,
                                                            files[k].processed[t]
                                                        );
                                                    }
                                                }
                                                setTimeout(callback, 1000);
                                            }
                                        }
                                    );
                                }
                                if (!count) {
                                    console.log('Nothing found');
                                    return void callback();
                                }
                            }
                        }
                    );
                } else {
                    const parts = pattern.split('/');
                    const id = parts.shift();
                    const path = parts.join('/');

                    objects.chmodFile(id, path, { user: 'system.user.admin', mode: mode }, (err, processed) => {
                        if (err) {
                            console.error(err);
                        } else {
                            if (processed) {
                                const { setupList: List } = require('@iobroker/js-controller-cli');
                                const list = new List({
                                    states,
                                    objects,
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
            let user = args[0];
            let group = args[1];
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
                    objects.getObjectList(
                        {
                            startkey: 'system.adapter.',
                            endkey: 'system.adapter.\u9999'
                        },
                        (err, arr) => {
                            if (!err && arr && arr.rows) {
                                const files = [];
                                let count = 0;
                                for (let i = 0; i < arr.rows.length; i++) {
                                    if (arr.rows[i].value.type !== 'adapter') {
                                        continue;
                                    }
                                    count++;
                                    objects.chownFile(
                                        arr.rows[i].value.common.name,
                                        '*',
                                        {
                                            user: 'system.user.admin',
                                            owner: user,
                                            ownerGroup: group
                                        },
                                        (err, processed, _id) => {
                                            if (!err && processed) {
                                                files.push({ id: _id, processed: processed });
                                            }
                                            if (!--count) {
                                                const { setupList: List } = require('@iobroker/js-controller-cli');
                                                const list = new List({
                                                    states,
                                                    objects,
                                                    processExit: callback
                                                });
                                                files.sort((a, b) => a.id.localeCompare(b.id));

                                                list.showFileHeader();
                                                for (let k = 0; k < files.length; k++) {
                                                    for (let t = 0; t < files[k].processed.length; t++) {
                                                        list.showFile(
                                                            files[k].id,
                                                            files[k].processed[t].path,
                                                            files[k].processed[t]
                                                        );
                                                    }
                                                }
                                                setTimeout(callback, 1000);
                                            }
                                        }
                                    );
                                }
                                if (!count) {
                                    console.log('Nothing found');
                                    return void callback();
                                }
                            }
                        }
                    );
                } else {
                    const parts = pattern.split('/');
                    const id = parts.shift();
                    const path = parts.join('/');

                    objects.chownFile(
                        id,
                        path,
                        {
                            user: 'system.user.admin',
                            owner: user,
                            ownerGroup: group
                        },
                        (err, processed) => {
                            if (err) {
                                console.error(err);
                            } else {
                                // call here list
                                if (processed) {
                                    const { setupList: List } = require('@iobroker/js-controller-cli');
                                    const list = new List({
                                        states,
                                        objects,
                                        processExit: callback
                                    });
                                    list.showFileHeader();
                                    for (let i = 0; i < processed.length; i++) {
                                        list.showFile(id, processed[i].path, processed[i]);
                                    }
                                }
                            }
                            setTimeout(callback, 1000);
                        }
                    );
                }
            });
            break;
        }

        case 'user': {
            const command = args[0] || '';
            let user = args[1] || '';

            if (user && user.startsWith('system.user.')) {
                user = user.substring('system.user.'.length);
            }

            dbConnect(params, () => {
                const Users = require('./setup/setupUsers.js');
                const users = new Users({
                    objects,
                    processExit: callback
                });
                const password = params.password;
                const group = params.ingroup || 'system.group.administrator';

                if (command === 'add') {
                    users.addUserPrompt(user, group, password, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`User "${user}" created (Group: ${group.replace('system.group.', '')})`);
                            return void callback();
                        }
                    });
                } else if (command === 'del' || command === 'delete') {
                    users.delUser(user, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`User "${user}" deleted`);
                            return void callback();
                        }
                    });
                } else if (command === 'check') {
                    users.checkUserPassword(user, password, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`Password for user "${user}" matches.`);
                            return void callback();
                        }
                    });
                } else if (command === 'set' || command === 'passwd') {
                    users.setUserPassword(user, password, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`Password for "${user}" was successfully set.`);
                            return void callback();
                        }
                    });
                } else if (command === 'enable' || command === 'e') {
                    users.enableUser(user, true, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`User "${user}" was successfully enabled.`);
                            return void callback();
                        }
                    });
                } else if (command === 'disable' || command === 'd') {
                    users.enableUser(user, false, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`User "${user}" was successfully disabled.`);
                            return void callback();
                        }
                    });
                } else if (command === 'get') {
                    users.getUser(user, (err, isEnabled) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`User "${user}" is ${isEnabled ? 'enabled' : 'disabled'}`);
                            return void callback();
                        }
                    });
                } else {
                    console.warn(
                        `Unknown command "${command}". Available commands are: add, del, passwd, enable, disable, check, get`
                    );
                    return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                }
            });
            break;
        }

        case 'g':
        case 'group': {
            const command = args[0] || '';
            let group = args[1] || '';
            let user = args[2] || '';

            if (group && group.startsWith('system.group.')) {
                group = group.substring('system.group.'.length);
            }
            if (user && user.startsWith('system.user.')) {
                user = user.substring('system.user.'.length);
            }
            if (!command) {
                console.warn(
                    `Unknown command "${command}". Available commands are: add, del, passwd, enable, disable, list, get`
                );
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            if (!group) {
                console.warn(`Please define group name: group ${command} groupName`);
                return callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
            }

            dbConnect(params, () => {
                const Users = require('./setup/setupUsers.js');
                const users = new Users({
                    objects,
                    processExit: callback
                });

                if (command === 'useradd' || command === 'adduser') {
                    if (!user) {
                        console.warn('Please define user name: "group useradd groupName userName"');
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    }
                    users.addUserToGroup(user, group, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`User "${user}" was added to group "${group}"`);
                            return void callback();
                        }
                    });
                } else if (command === 'userdel' || command === 'deluser') {
                    if (!user) {
                        console.warn('Please define user name: "group userdel groupName userName"');
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    }
                    users.removeUserFromGroup(user, group, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`User "${user}" was deleted from group "${group}"`);
                            return void callback();
                        }
                    });
                } else if (command === 'add') {
                    users.addGroup(group, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`Group "${group}" was created`);
                            return void callback();
                        }
                    });
                } else if (command === 'del' || command === 'delete') {
                    users.delGroup(group, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`Group "${group}" was deleted`);
                            return void callback();
                        }
                    });
                } else if (command === 'list' || command === 'l') {
                    users.getGroup(group, (err, isEnabled, list) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(
                                `Group "${group}" is ${isEnabled ? 'enabled' : 'disabled'} and has following members:`
                            );
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
                            console.log(`Group "${group}" was successfully enabled.`);
                            return void callback();
                        }
                    });
                } else if (command === 'disable' || command === 'd') {
                    users.enableGroup(group, false, err => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`Group "${group}" was successfully disabled.`);
                            return void callback();
                        }
                    });
                } else if (command === 'get') {
                    users.getGroup(group, (err, isEnabled, _list) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        } else {
                            console.log(`Group "${group}" is ${isEnabled ? 'enabled' : 'disabled'}`);
                            return void callback();
                        }
                    });
                } else {
                    console.warn(
                        `Unknown command "${command}". Available commands are: add, del, passwd, enable, disable, list, get`
                    );
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
                    objects,
                    processExit: callback
                });
                users.addUserPrompt(user, group, password, err => {
                    if (err) {
                        console.error(err);
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    } else {
                        console.log(`User "${user}" created (Group: ${group.replace('system.group.', '')})`);
                        return void callback();
                    }
                });
            });
            break;
        }

        case 'passwd': {
            const user = args[0];
            const password = params.password;
            dbConnect(params, () => {
                const Users = require('./setup/setupUsers.js');
                const users = new Users({
                    objects,
                    processExit: callback
                });
                users.setUserPassword(user, password, err => {
                    if (err) {
                        console.error(err);
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    } else {
                        console.log(`Password for "${user}" was successfully set.`);
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
                    objects,
                    processExit: callback
                });
                users.delUser(user, err => {
                    if (err) {
                        console.error(err);
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    } else {
                        console.log(`User "${user}" deleted`);
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
                    node: '>=12'
                },
                optionalDependencies: {},
                dependencies: {},
                author: 'bluefox <dogafox@gmail.com>'
            };
            json.dependencies[tools.appName + '.js-controller'] = '*';
            json.dependencies[tools.appName + '.admin'] = '*';

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
                console.warn(`please specify instance, like "${instance}.0"`);
                return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
            }
            dbConnect(params, () => {
                objects.getObject('system.adapter.' + instance, (err, obj) => {
                    if (!err && obj) {
                        let changed = false;
                        for (let a = 0; a < process.argv.length; a++) {
                            if (
                                process.argv[a].startsWith('--') &&
                                process.argv[a + 1] &&
                                !process.argv[a + 1].startsWith('--')
                            ) {
                                const attr = process.argv[a].substring(2);
                                /** @type {number | string | boolean} */
                                let val = process.argv[a + 1];
                                if (val === '__EMPTY__') {
                                    val = '';
                                } else if (val === 'true') {
                                    val = true;
                                } else if (val === 'false') {
                                    val = false;
                                } else if (parseFloat(val).toString() === val) {
                                    val = parseFloat(val);
                                }
                                if (attr.indexOf('.') !== -1) {
                                    const parts = attr.split('.');
                                    if (!obj.native[parts[0]] || obj.native[parts[0]][parts[1]] === undefined) {
                                        console.warn(`Adapter "${instance}" has no setting "${attr}".`);
                                    } else {
                                        changed = true;
                                        obj.native[parts[0]][parts[1]] = val;
                                        console.log(`New ${attr} for "${instance}" is: ${val}`);
                                    }
                                } else {
                                    if (obj.native[attr] === undefined) {
                                        console.warn(`Adapter "${instance}" has no setting "${attr}".`);
                                    } else {
                                        changed = true;
                                        obj.native[attr] = val;
                                        console.log(`New ${attr} for "${instance}" is: ${val}`);
                                    }
                                }
                                a++;
                            }
                        }
                        if (changed) {
                            obj.from = 'system.host.' + tools.getHostName() + '.cli';
                            obj.ts = new Date().getTime();
                            objects.setObject('system.adapter.' + instance, obj, () => {
                                console.log(`Instance settings for "${instance}" are changed.`);
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
            if (widgetset && widgetset.startsWith('vis-')) {
                widgetset = widgetset.substring(4);
            }

            const VisDebug = require('./setup/setupVisDebug.js');

            dbConnect(params, _objects => {
                const visDebug = new VisDebug({
                    objects: _objects,
                    processExit: callback
                });

                visDebug.enableDebug(widgetset);
            });
            break;
        }

        case 'file':
        case 'f': {
            const cmd = args[0];
            if (
                cmd !== 'read' &&
                cmd !== 'r' &&
                cmd !== 'w' &&
                cmd !== 'write' &&
                cmd !== 'sync' &&
                cmd !== 'rm' &&
                cmd !== 'unlink' &&
                cmd !== 'del'
            ) {
                console.log(
                    'Invalid parameters: write "file read /vis.0/main/img/picture.png /opt/picture/image.png" to read the file'
                );
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            if (cmd !== 'sync' && !args[1]) {
                console.log(
                    'Invalid parameters: write "file read /vis.0/main/img/picture.png /opt/picture/image.png" to read the file from DB and store it on disk'
                );
                console.log(
                    'or                        "file write /opt/SOURCE/image.png /vis.0/main/DESTINATION/picture.png" to write the file into DB from disk'
                );
                console.log('or                        "file rm /vis.0/main/img/picture.png" to delete the file in DB');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }

            dbConnect(params, async (objects, _states, isOffline, objectType) => {
                if (cmd === 'read' || cmd === 'r') {
                    const toRead = args[1];
                    const parts = toRead.replace(/\\/g, '/').split('/');

                    const path = (args[2] || process.cwd()).replace(/\\/g, '/').split('/');
                    const file = path[path.length - 1];
                    if (!file.match(/\.[a-zA-Z0-9]+$/)) {
                        // If destination location seems to be a directory, add filename
                        if (file !== '') {
                            path.push(parts[parts.length - 1]);
                        } else {
                            // trailing slash
                            path[path.length - 1] = parts[parts.length - 1];
                        }
                    }
                    let adapt = parts.shift();
                    if (!adapt) {
                        // leading slash
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
                } else if (cmd === 'write' || cmd === 'w') {
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
                    if (!fileDest || !fileDest.match(/\.[a-zA-Z0-9]+$/)) {
                        // last portion of destination has no extension, consider being a directory
                        fileDest = '';
                    }
                    if (!fileSrc || !fs.existsSync(toRead)) {
                        console.log(
                            `Please provide a valid file name as source file: "file write /opt/SOURCE/script.js /vis/DESTINATION/script.js"`
                        );
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }
                    const srcStat = fs.statSync(toRead);
                    if (!srcStat.isFile()) {
                        console.log(
                            `Please provide a valid file name as source file: "file write /opt/SOURCE/script.js /vis/DESTINATION/script.js"`
                        );
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }
                    if (!fileDest) {
                        // destination filename is not given, use same name as source file
                        fileDest = fileSrc;
                    }
                    if (fileDest !== path[path.length - 1]) {
                        // if last part of path is different then filename, add filename
                        if (path[path.length - 1] !== '') {
                            path.push(fileDest);
                        } else {
                            // trailing slash
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
                } else if (cmd === 'del' || cmd === 'rm' || cmd === 'unlink') {
                    const toDelete = args[1];
                    const parts = toDelete.replace(/\\/g, '/').split('/');

                    let adapt = parts.shift();
                    if (!adapt) {
                        // leading slash
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
                } else if (cmd === 'sync') {
                    // Sync
                    if (objectType !== 'file') {
                        console.log('File Sync is only available when database type "file" is used.');
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }
                    if (!objects.syncFileDirectory || !objects.dirExists) {
                        // functionality only exists in server class
                        console.log(
                            'Please stop ioBroker before syncing files and only use this command on the ioBroker master host!'
                        );
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
                    } catch (err) {
                        console.warn(`Could not create directory "meta.user": ${err.message}`);
                    }

                    try {
                        const { numberSuccess, notifications } = objects.syncFileDirectory(args[1]);
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
                    console.log(
                        'Invalid parameters: write "file read /vis.0/main/img/picture.png /opt/picture/image.png" to read the file from DB and store it on disk'
                    );
                    console.log(
                        'or                        "file write /opt/SOURCE/image.png /vis.0/main/DESTINATION/picture.png" to write the file into DB from disk'
                    );
                    console.log(
                        'or                        "file rm /vis.0/main/img/picture.png" to delete the file in DB'
                    );
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
                    iopckg = { version: '"' + adapter + '" not found' };
                }
            } else {
                iopckg = require('../package.json');
            }
            console.log(iopckg.version);

            return void callback();
        }

        case 'checklog': {
            dbConnect(params, (objects, states, isOffline, objectType) => {
                if (isOffline && dbTools.objectsDbHasServer(objectType)) {
                    console.log(tools.appName + ' is not running');
                    return void callback(EXIT_CODES.CONTROLLER_NOT_RUNNING);
                } else {
                    console.log(tools.appName + ' is running');
                    objects.getObjectList(
                        {
                            startkey: 'system.host.',
                            endkey: 'system.host.' + '\u9999'
                        },
                        null,
                        (err, res) => {
                            if (!err && res.rows.length) {
                                for (let i = 0; i < res.rows.length; i++) {
                                    const parts = res.rows[i].id.split('.');
                                    // ignore system.host.name.alive and so on
                                    if (parts.length === 3) {
                                        states.pushMessage(res.rows[i].id, {
                                            command: 'checkLogging',
                                            message: null,
                                            from: 'console'
                                        });
                                    }
                                }
                            }
                            setTimeout(callback, 200);
                        }
                    );
                }
            });
            break;
        }

        case 'repo': {
            Objects = getObjectsConstructor();
            let repoUrlOrCommand = args[0]; // Repo url or name or "add" / "del" / "set" / "show" / "addset" / "unset"
            const repoName = args[1]; // Repo url or name
            let repoUrl = args[2]; // Repo url or name
            if (
                repoUrlOrCommand !== 'add' &&
                repoUrlOrCommand !== 'del' &&
                repoUrlOrCommand !== 'set' &&
                repoUrlOrCommand !== 'show' &&
                repoUrlOrCommand !== 'addset' &&
                repoUrlOrCommand !== 'unset'
            ) {
                repoUrl = repoUrlOrCommand;
                repoUrlOrCommand = 'show';
            }

            dbConnect(params, async (_objects, _states) => {
                const Repo = require('./setup/setupRepo.js');
                const repo = new Repo({
                    objects: _objects,
                    states: _states
                });

                if (repoUrlOrCommand === 'show') {
                    try {
                        await repo.showRepoStatus();
                        return void callback();
                    } catch (err) {
                        console.error(`Cannot show repository status: ${err.message}`);
                        return void callback(EXIT_CODES.INVALID_REPO);
                    }
                } else if (
                    repoUrlOrCommand === 'add' ||
                    repoUrlOrCommand === 'del' ||
                    repoUrlOrCommand === 'set' ||
                    repoUrlOrCommand === 'addset' ||
                    repoUrlOrCommand === 'unset'
                ) {
                    if (!repoName || !repoName.match(/[-_\w\d]+/)) {
                        console.error(`Invalid repository name: "${repoName}"`);
                        return void callback();
                    } else {
                        if (repoUrlOrCommand === 'add' || repoUrlOrCommand === 'addset') {
                            if (!repoUrl) {
                                console.warn(
                                    `Please define repository URL or path: ${tools.appName} add <repoName> <repoUrlOrPath>`
                                );
                                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                            } else {
                                try {
                                    await repo.add(repoName, repoUrl);

                                    if (repoUrlOrCommand === 'addset') {
                                        await repo.setActive(repoName);
                                        console.log(`Repository "${repoName}" set as active: "${repoUrl}"`);
                                        await repo.showRepoStatus();
                                        return void callback();
                                    } else {
                                        console.log(`Repository "${repoName}" added as "${repoUrl}"`);
                                        await repo.showRepoStatus();
                                        return void callback();
                                    }
                                } catch (err) {
                                    console.error(`Cannot add repository location: ${err.message}`);
                                    return void callback(EXIT_CODES.INVALID_REPO);
                                }
                            }
                        } else if (repoUrlOrCommand === 'set') {
                            try {
                                await repo.setActive(repoName);
                                console.log(`Repository "${repoName}" set as active.`);
                                await repo.showRepoStatus();
                                return void callback();
                            } catch (err) {
                                console.error(`Cannot activate repository: ${err.message}`);
                                return void callback(EXIT_CODES.INVALID_REPO);
                            }
                        } else if (repoUrlOrCommand === 'del') {
                            try {
                                await repo.del(repoName);
                                console.log(`Repository "${repoName}" deleted.`);
                                await repo.showRepoStatus();
                                return void callback();
                            } catch (err) {
                                console.error(`Cannot remove repository: ${err.message}`);
                                return void callback(EXIT_CODES.INVALID_REPO);
                            }
                        } else if (repoUrlOrCommand === 'unset') {
                            try {
                                await repo.setInactive(repoName);
                                console.log(`Repository "${repoName}" deactivated.`);
                                await repo.showRepoStatus();
                                return void callback();
                            } catch (err) {
                                console.error(`Cannot deactivate repository: ${err.message}`);
                                return void callback(EXIT_CODES.INVALID_REPO);
                            }
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
            if (
                cmd !== 'c' &&
                cmd !== 'connect' &&
                cmd !== 's' &&
                cmd !== 'status' &&
                cmd !== 'b' &&
                cmd !== 'browse' &&
                cmd !== 'e' &&
                cmd !== 'enable' &&
                cmd !== 'd' &&
                cmd !== 'disable'
            ) {
                console.log('Invalid parameters. Following is possible: enable, browse, connect, status');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            } else {
                dbConnect(params, () => {
                    const Multihost = require('./setup/setupMultihost.js');
                    const mh = new Multihost({
                        params,
                        processExit: callback,
                        objects
                    });

                    if (cmd === 's' || cmd === 'status') {
                        mh.status(() => void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP));
                    } else if (cmd === 'b' || cmd === 'browse') {
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
                                states.pushMessage(
                                    `system.host.${tools.getHostName()}`,
                                    {
                                        command: 'updateMultihost',
                                        message: null,
                                        from: 'setup'
                                    },
                                    callback
                                );
                            }
                        });
                    } else if (cmd === 'd' || cmd === 'disable') {
                        mh.enable(false, err => {
                            if (err) {
                                console.error(err);
                                return void callback(EXIT_CODES.CANNOT_ENABLE_MULTIHOST);
                            } else {
                                states.pushMessage(
                                    `system.host.${tools.getHostName()}`,
                                    {
                                        command: 'updateMultihost',
                                        message: null,
                                        from: 'setup'
                                    },
                                    callback
                                );
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
            const file = args[1];
            if (!password) {
                console.warn(
                    `Please specify the password to update the vendor information!\n${tools.appName.toLowerCase()} vendor <PASS_PHRASE> <vendor.json>`
                );
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            if (!file) {
                console.warn(
                    `Please specify the path to the vendor file to update the vendor information!\n${tools.appName.toLowerCase()} vendor <PASS_PHRASE> <vendor.json>`
                );
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            } else {
                dbConnect(params, async () => {
                    const Vendor = require('./setup/setupVendor');
                    const vendor = new Vendor({ objects });

                    try {
                        await vendor.checkVendor(file, password);
                        console.log(`Synchronised vendor information.`);
                        return void callback();
                    } catch (err) {
                        console.error(`Cannot update vendor information: ${err.message}`);
                        return void callback(EXIT_CODES.CANNOT_UPDATE_VENDOR);
                    }
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
                console.warn(
                    `Please specify the path to the license file or place license text directly!\n${tools.appName.toLowerCase()} license <license.file or license.text>`
                );
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            } else {
                dbConnect(params, async () => {
                    const License = require('./setup/setupLicense');
                    const license = new License({ objects });
                    try {
                        const type = await license.setLicense(file);
                        console.log(`License ${type} updated.`);
                        return void callback();
                    } catch (err) {
                        console.error(`Cannot update license: ${err.message}`);
                        return void callback(EXIT_CODES.CANNOT_UPDATE_LICENSE);
                    }
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
                        iopckg = { version: '"' + command + '" not found' };
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
    if (pluginHandler) {
        pluginHandler.destroyAll();
    }

    if (objects && objects.destroy) {
        await objects.destroy();
    }
    if (states && states.destroy) {
        await states.destroy();
    }
    setTimeout(() => {
        process.exit(exitCode);
    }, 1000);
}

const OBJECTS_THAT_CANNOT_BE_DELETED = [
    '0_userdata.0',
    'alias.0',
    'enum.functions',
    'enum.rooms',
    'system.config',
    'system.group.administrator',
    'system.group.user',
    'system.repositories',
    'system.user.admin'
];

async function delObjects(ids) {
    if (ids && ids.length) {
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            if (!OBJECTS_THAT_CANNOT_BE_DELETED.includes(id)) {
                try {
                    await objects.delObjectAsync(id);
                } catch (err) {
                    console.warn(`[Not critical] Cannot delete object ${id}: ${JSON.stringify(err)}`);
                }
            }
        }
    }
}

async function delStates() {
    const keys = await states.getKeys('*');
    if (keys) {
        console.log(`clean ${keys.length} states...`);
        for (let i = 0; i < keys.length; i++) {
            try {
                await states.delState(keys[i]);
            } catch (err) {
                console.error(`[Not critical] Cannot delete state ${keys[i]}: ${err.message}`);
            }
        }
    }
    return keys ? keys.length : 0;
}

function cleanDatabase(isDeleteDb, callback) {
    if (isDeleteDb) {
        objects.destroyDB(async () => {
            // Clean up states
            const keysCount = await delStates();

            if (callback) {
                return void callback(keysCount);
            }
        });
    } else {
        // Clean only objects, not the views
        objects.getObjectList({ startkey: '\u0000', endkey: '\u9999' }, async (err, res) => {
            let ids = [];
            if (!err && res.rows.length) {
                console.log(`clean ${res.rows.length} objects...`);
                ids = res.rows.map(e => e.id);
            }
            await delObjects(ids);
            // Clean up states
            const keysCount = await delStates();

            if (callback) {
                return void callback(keysCount);
            }
        });
    }
}

const cleanDatabaseAsync = tools.promisifyNoError(cleanDatabase);

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
                    // allow with parameter --keepsecret to not delete the secret
                    // This is very specific use case for vendors and must not be described in documentation
                    if (!params.keepsecret) {
                        obj.native && delete obj.native.secret;
                    }

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

const restartControllerAsync = tools.promisifyNoError(restartController);

async function getRepository(repoName, params) {
    params = params || {};

    if (!objects) {
        await dbConnectAsync(params);
    }

    if (!repoName || repoName === 'auto') {
        const systemConfig = await objects.getObjectAsync('system.config');
        repoName = systemConfig.common.activeRepo;
    }

    if (!Array.isArray(repoName)) {
        repoName = [repoName];
    }

    const systemRepos = await objects.getObjectAsync('system.repositories');
    const allSources = {};
    let changed = false;
    let anyFound = false;
    for (let r = 0; r < repoName.length; r++) {
        const repo = repoName[r];
        if (systemRepos.native.repositories[repo]) {
            if (typeof systemRepos.native.repositories[repo] === 'string') {
                systemRepos.native.repositories[repo] = {
                    link: systemRepos.native.repositories[repo],
                    json: null
                };
                changed = true;
            }

            // If repo is not yet loaded
            if (!systemRepos.native.repositories[repo].json) {
                console.log(`Update repository "${repo}" under "${systemRepos.native.repositories[repo].link}"`);
                const data = await tools.getRepositoryFileAsync(systemRepos.native.repositories[repo].link);
                systemRepos.native.repositories[repo].json = data.json;
                systemRepos.native.repositories[repo].hash = data.hash;
                systemRepos.from = `system.host.${tools.getHostName()}.cli`;
                systemRepos.ts = new Date().getTime();
                changed = true;
            }

            if (systemRepos.native.repositories[repo].json) {
                Object.assign(allSources, systemRepos.native.repositories[repo].json);
                anyFound = true;
            }
        }

        if (changed) {
            await objects.setObjectAsync('system.repositories', systemRepos);
        }
    }

    if (!anyFound) {
        console.error(
            `ERROR: No repositories defined. Please define one repository as active:  "iob repo set <${Object.keys(
                systemRepos.native.repositories
            ).join(' | ')}>`
        );
        throw new Error(EXIT_CODES.INVALID_REPO);
    } else {
        return allSources;
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
        Objects = null;
    }
    if (States) {
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

/**
 * Checks if system is offline
 *
 * @param {boolean} onlyCheck - returns true then
 * @returns {Promise<boolean>}
 */
async function checkSystemOffline(onlyCheck) {
    if (!objects || !states) {
        // should never happen
        return true;
    }
    if (onlyCheck) {
        return true;
    }

    const offlineStatus = await new Promise(resolve => {
        setTimeout(async () => {
            // Slight delay to allow "setup first" from Pre 2.0 to 2.0
            try {
                const hosts = await enumHosts(objects);
                const hostToCheck = hosts.map(host => `system.host.${host.common.hostname}.alive`);

                const res = await states.getStatesAsync(hostToCheck);
                Array.isArray(res) &&
                    res.forEach(aliveState => {
                        if (aliveState && aliveState.val) {
                            resolve(false);
                        }
                    });
                resolve(true);
            } catch {
                resolve(true);
            }
        }, 500);
    });

    return offlineStatus;
}

/**
 * Initialize plugins from io-pack and config json
 *
 * @param {object} config - parsed content of iobroker.json
 * returns {Promise<void>}
 */
function initializePlugins(config) {
    const ioPackage = fs.readJsonSync(path.join(__dirname, '..', 'io-package.json'));
    const packageJson = fs.readJsonSync(path.join(__dirname, '..', 'package.json'));
    const hostname = tools.getHostName();

    const pluginSettings = {
        namespace: `system.host.${hostname}`,
        logNamespace: `host.${hostname}`,
        scope: 'controller',
        log: {
            // cli should be clean, only log warn/error
            silly: _msg => {},
            debug: _msg => {},
            info: _msg => {},
            warn: msg => console.log(msg),
            error: msg => console.log(msg)
        },
        iobrokerConfig: config,
        parentPackage: packageJson,
        controllerVersion: ioPackage.common.version
    };

    pluginHandler = new PluginHandler(pluginSettings);
    pluginHandler.addPlugins(ioPackage.common.plugins, __dirname); // Plugins from io-package have priority over ...
    pluginHandler.addPlugins(config.plugins, __dirname); // ... plugins from iobroker.json
    pluginHandler.setDatabaseForPlugins(objects, states);

    return new Promise(resolve => {
        pluginHandler.initPlugins(ioPackage, resolve);
    });
}

/**
 * Connects to the DB or tests the connection. The callback has the following signature:
 * `(objects: any, states: any, isOffline?: boolean, objectsDBType?: string) => void`
 */
function dbConnect(onlyCheck, params, callback) {
    if (typeof onlyCheck === 'object') {
        callback = params;
        params = onlyCheck;
        onlyCheck = false;
    }
    if (typeof onlyCheck === 'function') {
        callback = onlyCheck;
        onlyCheck = false;
    }
    if (typeof params === 'function') {
        callback = params;
        params = null;
    }
    params = params || {};

    const config = fs.readJSONSync(tools.getConfigFileName());

    if (objects && states) {
        return void callback(objects, states, false, config.objects.type, config);
    }

    config.states = config.states || { type: 'file' };
    config.objects = config.objects || { type: 'file' };

    Objects = getObjectsConstructor(); // Objects DB Client object
    States = getStatesConstructor(); // States DB Client object

    // Give to controller 2 seconds for connection
    let isObjectConnected = false;
    let isStatesConnected = false;

    // Detect timeout or try to open file itself
    setTimeout(async () => {
        if (isObjectConnected && isStatesConnected) {
            return;
        }

        if (!isObjectConnected) {
            if (objects) {
                // Destroy Client we tried to connect with
                await objects.destroy();
                objects = null;
            }
            if (dbTools.objectsDbHasServer(config.objects.type)) {
                // Just open in memory DB itself
                Objects = require(`@iobroker/db-objects-${config.objects.type}`).Server;
                objects = new Objects({
                    connection: config.objects,
                    logger: {
                        silly: _msg => {},
                        debug: _msg => {},
                        info: _msg => {},
                        warn: msg => console.log(msg),
                        error: msg => console.log(msg)
                    },
                    connected: async () => {
                        isObjectConnected = true;
                        if (isStatesConnected && typeof callback === 'function') {
                            try {
                                await initializePlugins(config);
                            } catch {
                                // ignore in silence
                            }
                            return void callback(objects, states, true, config.objects.type, config);
                        }
                    }
                });
            } else {
                console.log(
                    `No connection to objects ${config.objects.host}:${config.objects.port}[${config.objects.type}]`
                );
                if (onlyCheck) {
                    callback && callback(objects, states, true, config.objects.type, config);
                    callback = null;
                } else {
                    processExit(EXIT_CODES.NO_CONNECTION_TO_OBJ_DB);
                }
            }
        }

        if (!isStatesConnected) {
            if (states) {
                // Destroy Client we tried to connect with
                await states.destroy();
                states = null;
            }
            if (dbTools.statesDbHasServer(config.states.type)) {
                // Just open in memory DB itself
                States = require(`@iobroker/db-states-${config.states.type}`).Server;
                states = new States({
                    connection: config.states,
                    logger: {
                        silly: _msg => {},
                        debug: _msg => {},
                        info: _msg => {},
                        warn: msg => console.log(msg),
                        error: msg => console.log(msg)
                    },
                    connected: async () => {
                        isStatesConnected = true;
                        if (isObjectConnected && typeof callback === 'function') {
                            try {
                                await initializePlugins(config);
                            } catch {
                                // ignore in silence
                            }
                            return void callback(objects, states, true, config.objects.type, config);
                        }
                    },
                    // react on change
                    change: (id, msg) => states.onChange && states.onChange(id, msg)
                });
                states.onChange = null; // here the custom onChange handler could be installed
            } else {
                if (states) {
                    // Destroy Client we tried to connect with
                    await states.destroy();
                    states = null;
                }
                if (objects) {
                    // Destroy Client we tried to connect with
                    await objects.destroy();
                    objects = null;
                }
                console.log(
                    `No connection to states ${config.states.host}:${config.states.port}[${config.states.type}]`
                );
                if (onlyCheck) {
                    callback && callback(objects, states, true, config.objects.type, config);
                    callback = null;
                } else {
                    processExit(EXIT_CODES.NO_CONNECTION_TO_OBJ_DB);
                }
            }
        }

        setTimeout(() => {
            // Failsafe
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
        }, params.timeout || 10000 + config.objects.connectTimeout || 12000);
    }, params.timeout || config.objects.connectTimeout * 2 || 4000);

    // try to connect as client
    objects = new Objects({
        connection: config.objects,
        logger: {
            silly: _msg => {},
            debug: _msg => {},
            info: _msg => {},
            warn: msg => console.log(msg),
            error: msg => console.log(msg)
        },
        connected: async () => {
            if (isObjectConnected) {
                return;
            }
            isObjectConnected = true;

            if (isStatesConnected && typeof callback === 'function') {
                const isOffline = await checkSystemOffline(onlyCheck);
                try {
                    await initializePlugins(config);
                } catch {
                    // ignore in silence
                }
                callback(objects, states, isOffline, config.objects.type, config);
            }
        }
    });

    states = new States({
        connection: config.states,
        logger: {
            silly: _msg => {},
            debug: _msg => {},
            info: _msg => {},
            warn: msg => console.log(msg),
            error: msg => console.log(msg)
        },
        connected: async () => {
            if (isStatesConnected) {
                return;
            }
            isStatesConnected = true;

            if (isObjectConnected && typeof callback === 'function') {
                const isOffline = await checkSystemOffline(onlyCheck);
                try {
                    await initializePlugins(config);
                } catch {
                    // ignore in silence
                }
                callback(objects, states, isOffline, config.objects.type, config);
            }
        },
        change: (id, state) => states.onChange && states.onChange(id, state)
    });
}

/**
 * Connects to the DB or tests the connection. The response has the following structure:
 * `{objects: any, states: any, isOffline?: boolean, objectsDBType?: string, config}`
 */
function dbConnectAsync(onlyCheck, params) {
    return new Promise((resolve, reject) =>
        dbConnect(onlyCheck, params, (err, objects, states, isOffline, objectsDBType, config) =>
            err ? reject(err) : resolve({ objects, states, isOffline, objectsDBType, config })
        )
    );
}

module.exports.execute = function () {
    // direct call
    const _yargs = initYargs();
    const command = _yargs.argv._[0];

    const args = [];

    // skip interpreter, filename and command
    for (let i = 3; i < process.argv.length; i++) {
        if (process.argv[i].startsWith('-')) {
            // on first param we have all our args
            break;
        }
        args.push(process.argv[i]);
    }

    processCommand(command, args, _yargs.argv, processExit);
};

process.on('unhandledRejection', e => {
    console.error(`Uncaught Rejection: ${e.stack || e}`);
    processExit(EXIT_CODES.UNCAUGHT_EXCEPTION);
});
