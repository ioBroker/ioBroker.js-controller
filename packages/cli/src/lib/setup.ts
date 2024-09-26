import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common';
import { EXIT_CODES } from '@iobroker/js-controller-common';
import deepClone from 'deep-clone';
import { isDeepStrictEqual } from 'node:util';
import Debug from 'debug';
import { objectsDbHasServer, isLocalObjectsDbServer, isLocalStatesDbServer } from '@iobroker/js-controller-common';
import path from 'node:path';
import yargs from 'yargs/yargs';
import * as CLITools from '@/lib/cli/cliTools.js';
import { CLIHost } from '@/lib/cli/cliHost.js';
import { CLIStates } from '@/lib/cli/cliStates.js';
import { CLIDebug } from '@/lib/cli/cliDebug.js';
import { CLICert } from '@/lib/cli/cliCert.js';
import { CLIObjects } from '@/lib/cli/cliObjects.js';
import { CLICompact } from '@/lib/cli/cliCompact.js';
import { CLILogs } from '@/lib/cli/cliLogs.js';
import { CLIProcess } from '@/lib/cli/cliProcess.js';
import { CLIMessage } from '@/lib/cli/cliMessage.js';
import { CLIPlugin } from '@/lib/cli/cliPlugin.js';
import { error as CLIError } from '@/lib/cli/messages.js';
import type { CLICommandContext, CLICommandOptions } from '@/lib/cli/cliCommand.js';
import { getRepository, ignoreVersion, recognizeVersion } from '@/lib/setup/utils.js';
import { dbConnect, dbConnectAsync, exitApplicationSave } from '@/lib/setup/dbConnection.js';
import { IoBrokerError } from '@/lib/setup/customError.js';
import type { ListType } from '@/lib/setup/setupList.js';
import * as url from 'node:url';
import * as events from 'node:events';

// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));
import { createRequire } from 'node:module';
// eslint-disable-next-line unicorn/prefer-module
const require = createRequire(import.meta.url || `file://${__filename}`);

tools.ensureDNSOrder();

const debug = Debug('iobroker:cli');

events.EventEmitter.setMaxListeners(100);
process.setMaxListeners(0);

let _yargs: ReturnType<typeof yargs>;

type ExitCodeCb = (exitCode?: number) => void;

interface InternalRebuildOptions {
    cwd?: string;
    module?: string;
    debug: boolean;
}

/**
 * Initialize Yargs to parse commands correctly and be able to output correct help
 */
function initYargs(): ReturnType<typeof yargs> {
    _yargs = yargs(process.argv.slice(2))
        .scriptName(tools.appName)
        .locale('en') // otherwise it could be mixed, because our implementations are in english
        .version(false) // disable yargs own version handling, because we have our own depending on passed instances
        .completion('_createCompletion', false) // can be created via iob _createCompletion >> ~/.bashrc or ~/.bash_profile for OSX
        .command('setup', 'Setup ioBroker', {
            redis: {
                describe: 'Setup as redis',
                type: 'boolean',
            },
            objects: {
                describe: 'Objects <host>',
                default: tools.getLocalAddress(),
                type: 'number',
            },
            states: {
                describe: 'States <host>',
                default: tools.getLocalAddress(),
                type: 'number',
            },
            'port <port>': {
                describe: 'Port of redis',
                default: 6379,
                type: 'number',
            },
            custom: {
                describe: 'Custom setup',
                type: 'boolean',
            },
            first: {
                describe: 'Initial setup',
                type: 'boolean',
            },
        })
        .command(
            'start [all|<adapter>.<instance>|<adapter>]',
            'Starts the js-controller or a specified adapter instance or all instances of an adapter',
            yargs => {
                yargs
                    .command('all', 'Starts js-controller and all adapters')
                    .command('<adapter>[.<instance>]', 'Starts a specified adapter instance');
            },
        )
        .command(
            'stop [<adapter>.<instance>|<adapter>]',
            'stops the js-controller or a specified adapter instance or all instances of an adapter',
            yargs => {
                yargs.command('<adapter>[.<instance>]', 'Stops a specified adapter instance');
            },
        )
        .command(
            ['restart [<adapter>.<instance>|<adapter>]', 'r [<adapter>.<instance>|<adapter>]'],
            'Restarts js-controller or a specified adapter instance or all instances of an adapter',
            yargs => {
                yargs.command('<adapter>[.<instance>]', 'Restarts a specified adapter instance', {});
            },
        )
        .command('debug <adapter>[.<instance>]', 'Starts a Node.js debugging session for the adapter instance', {
            ip: {
                describe: 'IP-address <ip>',
                type: 'string',
            },
            port: {
                describe: 'Port <port>',
                type: 'number',
            },
            wait: {
                describe: 'Wait',
                type: 'boolean',
            },
        })
        .command('info', 'Shows the host info', {})
        .command('logs [<adapter>]', 'Monitor log', {
            'lines=1000': {
                // TODO: it's the only place we use = we should avoid this
                describe: 'Number of lines',
                type: 'string',
            },
            watch: {
                describe: 'Watch',
                type: 'boolean',
            },
        })
        .command(['add <adapter> [desiredNumber]', 'a <adapter> [desiredNumber]'], 'Add instance of adapter', {
            enabled: {
                describe: 'Enable adapter',
                type: 'boolean',
            },
            host: {
                describe: 'Host <host>',
                type: 'string',
            },
            port: {
                describe: 'Port <port>',
                type: 'number',
            },
        })
        .command(['install <adapter>', 'i <adapter>'], 'Installs a specified adapter', {})
        .command('rebuild [<module>]', 'Rebuild all native modules or path', {
            path: {
                describe: 'Executes rebuild command in given path',
                type: 'string',
            },
        })
        .command(
            'url <url> [<name>]',
            'Install adapter from specified url, e.g. GitHub, if a package name is provided instead of an url, it will be installed from npm',
            {},
        )
        .command(['del <adapter>', 'delete <adapter>'], 'Remove adapter and all instances from this host', {
            custom: {
                describe: 'Remove adapter custom attribute from all objects',
                type: 'boolean',
            },
        })
        .command(['del <adapter>.<instance>', 'delete <adapter>.<instance>'], 'Remove adapter instance', {
            custom: {
                describe: 'Remove instance custom attribute from all objects',
                type: 'boolean',
            },
        })
        .command('update [<repositoryUrl>]', 'Update repository and list adapters', {
            updatable: {
                describe: 'Only show updatable adapters',
                alias: 'u',
                type: 'boolean',
            },
            all: {
                describe: 'Show all available adapters',
                alias: 'a',
                type: 'boolean',
            },
            force: {
                describe: 'Bypass hash check',
                alias: 'f',
                type: 'boolean',
            },
        })
        .command('upgrade', 'Upgrade management', yargs => {
            yargs
                .option('yes', {
                    describe: 'Bypass questionnaire',
                    alias: 'y',
                    type: 'boolean',
                })
                .command('[<repositoryUrl>]', 'Upgrade all adapters, optionally you can specify the repository url', {})
                .command(
                    'all [<repositoryUrl>]',
                    'Upgrade all adapters, optionally you can specify the repository url',
                    {},
                )
                .command(
                    'self [<repositoryUrl>]',
                    'Upgrade js-controller, optionally you can specify the repository url',
                    {},
                )
                .command(
                    '<adapter> [<repositoryUrl>]',
                    'Upgrade specified adapter, optionally you can specify the repository url',
                    {},
                );
        })
        .command(['upload [all|<adapter>]', 'u [all|<adapter>]'], 'Upload management', yargs => {
            yargs
                .command(
                    `<pathToLocalFile> <pathIn${tools.appName}>`,
                    'Upload given files to provided path to make them available for instances',
                    {},
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
                    {},
                )
                .command(
                    'extend <id> <json-value>',
                    'Extend object with the given id by providing a new json object',
                    {},
                )
                .command('del <id|pattern>', 'Delete object with given id or all objects matching the pattern', {
                    y: {
                        describe: 'Bypass questionnaire',
                        alias: 'y',
                        type: 'boolean',
                    },
                })
                .command('chmod <object-mode> [state-mode] <id>', 'Change object rights', {})
                .command('chown <user> <group> <id>', 'Change object ownership', {})
                .command('list <pattern>', 'List object matching given pattern', {})
                .command('setDBVersion <version>', 'Sets the protocol version of the objects database')
                .command('getDBVersion', 'Get the protocol version of the objects database')
                .command('activateSets', 'Activate the usage of Redis Sets')
                .command('deactivateSets', 'Deactivate the usage of Redis Sets');
        })
        .command(['state', 's'], 'State management', yargs => {
            yargs
                .command('get <id>', 'Get state, specified by id', {})
                .command('getPlain <id>', 'Get plain state, specified by id', {
                    pretty: {
                        describe: 'Prettify output',
                        type: 'boolean',
                    },
                })
                .command('getValue <id>', 'Get state value, specified by id', {})
                .command('set <id> <value> [<ack>]', 'Set state, specified by id', {})
                .command('del <id>', 'Delete state, specified by id', {})
                .command('setDBVersion <version>', 'Sets the protocol version of the states database')
                .command('getDBVersion', 'Get the protocol version of the states database');
        })
        .command('message <adapter>[.instance] <command> [<message>]', 'Send message to adapter instance/s', {})
        .command('list <type> [<filter>]', 'List all entries, like objects', yargs => {
            yargs.positional('type', {
                describe: 'Type of the objects which should be listed',
                type: 'string',
                choices: [
                    'objects',
                    'o',
                    'states',
                    's',
                    'instances',
                    'i',
                    'adapters',
                    'a',
                    'users',
                    'u',
                    'groups',
                    'g',
                    'enums',
                    'e',
                    'files',
                    'f',
                    'hosts',
                    'h',
                ],
            });

            yargs.positional('filter', {
                describe: 'Filter for matching pattern e.g. "admin*"',
                type: 'string',
            });
        })
        .command('chmod <mode> <file>', 'Change file rights', {})
        .command('chown <user> <group> <file>', 'Change file ownership', {})
        .command('touch <file>', 'Touch file', {})
        .command('rm <file>', 'Remove file', {})
        .command('file', 'File management', yargs => {
            yargs
                .command(
                    `read <${tools.appName}-path-to-read> [<filesystem-path-to-write>]`,
                    `Read file from ${tools.appName} path and optionally write to destination`,
                    {},
                )
                .command(
                    `write <filesystem-path-to-read> <${tools.appName}-path-to-write>`,
                    `Read file from path and write it to ${tools.appName} path`,
                    {},
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
                            type: 'string',
                        })
                        .option('password', {
                            describe: 'User password',
                            type: 'string',
                        });
                })
                .command('del <user>', 'Delete user', {})
                .command('passwd <user>', 'Change user password', yargs => {
                    yargs.option('password', {
                        describe: 'User password',
                        type: 'string',
                    });
                })
                .command('enable <user>', 'Enable user', {})
                .command('disable <user>', 'Disable user', {})
                .command('get <user>', 'Get user', {})
                .command('check <user>', 'Check user password', yargs => {
                    yargs.option('password', {
                        describe: 'User password',
                        type: 'string',
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
                    'Set the name of the parameter you want to change as option followed by its value, e. g. --port 80',
            },
        })
        .command('license <license.file or license.text>', 'Update license by given file', {})
        .command('cert', 'Certificate management', yargs => {
            yargs
                .command('create', 'Create certificate', {})
                .command('view [<certificate name>]', 'Show certificate', {});
        })
        .command('clean <yes>', 'Clears all objects and states', {})
        .command('backup', 'Create backup', {})
        .command('restore <backup name or path>', 'Restore a specified backup', {
            force: {
                describe: 'Restore backup of different controller version',
                alias: 'f',
                type: 'boolean',
            },
        })
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
        .command('nodejs-update [<major-version>]', 'Upgrade the Node.JS installation to the current LTS', {})
        .command('multihost', 'Multihost management', yargs => {
            yargs
                .command('enable', 'Enable multihost discovery', {
                    secure: {
                        describe: 'Use secure connection',
                        type: 'boolean',
                    },
                    persist: {
                        describe: 'Enable persistent discovery',
                        type: 'boolean',
                    },
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
                    '<adapter>.<instance> <disable|off> [<group-id>]',
                    'Enable or disable compact mode for specified adapter instance and set compact group optionally',
                )
                .command(
                    '<adapter>.<instance> <enable|on> [<group-id>]',
                    'Enable or disable compact mode for specified adapter instance and set compact group optionally',
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
                            type: 'string',
                        },
                        instance: {
                            describe: 'Instance, e.g. hm-rpc.0',
                            type: 'string',
                        },
                    },
                )
                .command(
                    'disable <pluginname>',
                    'Disables a plugin for the specified host or instance. If no host is specified, the current one is used',
                    {
                        host: {
                            describe: 'Hostname',
                            type: 'string',
                        },
                        instance: {
                            describe: 'Instance, e.g. hm-rpc.0',
                            type: 'string',
                        },
                    },
                )
                .command(
                    'status <pluginname>',
                    'Checks if a plugin is enabled for the specified host or instance. If no host is specified, the current one is used',
                    {
                        host: {
                            describe: 'Hostname',
                            type: 'string',
                        },
                        instance: {
                            describe: 'Instance, e.g. hm-rpc.0',
                            type: 'string',
                        },
                    },
                );
        })
        .command('vendor <passphrase> [<vendor.json>]', 'Update the vendor information using given passphrase')
        .command(['version [<adapter>]', 'v [<adapter>]'], 'Show version of js-controller or specified adapter', {
            ignore: {
                describe:
                    'Ignore specific version of this adapter. The adapter will not be upgradeable to this specific version.',
                type: 'string',
            },
            recognize: {
                describe: 'No longer ignore specific versions of this adapter.',
                type: 'boolean',
            },
        })
        .wrap(null);

    return _yargs;
}

/**
 * Show yargs help, if processCommand is used as import, yargs won't be initialized
 */
function showHelp(): void {
    if (_yargs) {
        _yargs.showHelp();
    }
}

/**
 * Process the given CLI command
 *
 * @param command - command to execute
 * @param args - arguments passed to yargs
 * @param params - object with parsed params by yargs, e. g. --force is params.force
 * @param callback - callback to be called with the exit code
 */
async function processCommand(
    command: string | number,
    args: string[],
    params: Record<string, any>,
    callback: ExitCodeCb,
): Promise<void> {
    const commandContext: CLICommandContext = { dbConnect, callback, showHelp };
    const commandOptions: CLICommandOptions = { ...params, ...commandContext };
    debug(`commandOptions: ${JSON.stringify(commandOptions)}`);
    debug(`args: ${JSON.stringify(args)}`);

    switch (command) {
        case 'start':
        case 'stop': {
            const procCommand = new CLIProcess(commandOptions);
            procCommand[command](args);
            break;
        }

        case 'debug': {
            const debugCommand = new CLIDebug(commandOptions);
            debugCommand.execute(args);
            break;
        }

        case 'status':
        case 'isrun': {
            const procCommand = new CLIProcess(commandOptions);
            procCommand.status(args);
            break;
        }

        case 'r':
        case 'restart': {
            const procCommand = new CLIProcess(commandOptions);
            procCommand.restart(args);
            break;
        }

        case '_restart':
            restartController();
            callback();
            break;

        case 'update': {
            const repoUrl = args[0]; // Repo url or name
            dbConnect(params, async ({ objects, states }) => {
                const { Repo } = await import('./setup/setupRepo.js');
                const repo = new Repo({
                    objects,
                    states,
                });

                await repo.showRepo(repoUrl, params);
                setTimeout(callback, 1_000);
            });
            break;
        }

        case 'setup': {
            const { Setup } = await import('./setup/setupSetup.js');
            const setup = new Setup({
                processExit: callback,
                cleanDatabase,
                restartController,
                params,
            });
            if (args[0] === 'custom' || params.custom) {
                const exitCode = await setup.setupCustom();
                callback(exitCode);
                return;
            }

            let isFirst = false;
            let isRedis = false;

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

            setup.setup({
                callback: async () => {
                    const { states, objects } = await dbConnectAsync(false, params);
                    if (isFirst) {
                        // Creates all instances that are needed on a fresh installation
                        const { Install } = await import('./setup/setupInstall.js');
                        const install = new Install({
                            objects,
                            states,
                            processExit: callback,
                            params,
                        });
                        // Define the necessary instances
                        const initialInstances = ['admin', 'discovery', 'backitup'];
                        // And try to install each of them
                        for (const instance of initialInstances) {
                            try {
                                const adapterInstalled = !!require.resolve(
                                    `${tools.appName.toLowerCase()}.${instance}`,
                                );

                                if (adapterInstalled) {
                                    let otherInstanceExists = false;
                                    try {
                                        // check if another instance exists
                                        const res = await objects.getObjectViewAsync('system', 'instance', {
                                            startkey: `system.adapter.${instance}`,
                                            endkey: `system.adapter.${instance}\u9999`,
                                        });

                                        otherInstanceExists = !!res.rows.length;
                                    } catch {
                                        // ignore - on install we have no object views
                                    }

                                    if (!otherInstanceExists) {
                                        await install.createInstance(instance, {
                                            enabled: true,
                                            ignoreIfExists: true,
                                        });
                                    }
                                }
                            } catch {
                                // not found, just continue
                            }
                        }

                        await new Promise(resolve => {
                            // Creates a fresh certificate
                            // Create a new instance of the cert command,
                            // but use the resolve method as a callback
                            const cert = new CLICert({ ...commandOptions, callback: resolve });
                            cert.create();
                        });
                    }

                    // we update existing things, in first as well as normal setup
                    // Rename repositories
                    const { Repo } = await import('./setup/setupRepo.js');
                    const repo = new Repo({ objects, states });

                    try {
                        await repo.rename('default', 'stable', 'http://download.iobroker.net/sources-dist.json');
                        await repo.rename('latest', 'beta', 'http://download.iobroker.net/sources-dist-latest.json');
                    } catch (err) {
                        console.warn(`Cannot rename: ${err.message}`);
                    }

                    // there has been a bug that user can upload js-controller
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
                            retry_max_delay: 5_000,
                        };
                        if (
                            config.objects.options.retry_max_delay === 15_000 ||
                            !config.objects.options.retry_max_delay
                        ) {
                            config.objects.options.retry_max_delay = 5_000;
                        }
                        config.states.options = config.states.options || {
                            auth_pass: null,
                            retry_max_delay: 5_000,
                        };
                        if (
                            config.states.options.retry_max_delay === 15_000 ||
                            !config.states.options.retry_max_delay
                        ) {
                            config.states.options.retry_max_delay = 5_000;
                        }

                        let migrated = '';
                        // We migrate file to jsonl
                        if (config.states.type === 'file') {
                            config.states.type = 'jsonl';

                            const hasLocalStatesServer = await isLocalStatesDbServer('file', config.states.host);
                            if (hasLocalStatesServer) {
                                // silent config change on secondaries
                                console.log('States DB type migrated from "file" to "jsonl"');
                                migrated += 'States';
                            }
                        }

                        if (config.objects.type === 'file') {
                            config.objects.type = 'jsonl';

                            const hasLocalObjectsServer = await isLocalObjectsDbServer('file', config.objects.host);
                            if (hasLocalObjectsServer) {
                                // silent config change on secondaries
                                console.log('Objects DB type migrated from "file" to "jsonl"');
                                migrated += migrated ? ' and Objects' : 'Objects';
                            }
                        }

                        if (migrated) {
                            const { NotificationHandler } = await import('@iobroker/js-controller-common');

                            const hostname = tools.getHostName();

                            const notificationSettings = {
                                states,
                                objects,
                                log: console,
                                logPrefix: '',
                                host: hostname,
                            };

                            const notificationHandler = new NotificationHandler(notificationSettings);

                            try {
                                const ioPackage = fs.readJsonSync(
                                    path.join(tools.getControllerDir(), 'io-package.json'),
                                );
                                await notificationHandler.addConfig(ioPackage.notifications);

                                await notificationHandler.addMessage({
                                    scope: 'system',
                                    category: 'fileToJsonl',
                                    message: `Migrated: ${migrated}`,
                                    instance: `system.host.${hostname}`,
                                });

                                notificationHandler.storeNotifications();
                            } catch (e) {
                                console.warn(`Could not add File-to-JSONL notification: ${e.message}`);
                            }
                        }

                        if (!isDeepStrictEqual(config, configOrig)) {
                            fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
                            console.log('ioBroker configuration updated');
                        }
                    } catch (err) {
                        console.log(`Could not update ioBroker configuration: ${err.message}`);
                    }

                    return void callback();
                },
                ignoreIfExist: isFirst,
                useRedis: isRedis,
            });
            break;
        }

        case 'url': {
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

            dbConnect(params, async ({ objects, states }) => {
                const { Install } = await import('./setup/setupInstall.js');
                const install = new Install({
                    objects,
                    states,
                    processExit: callback,
                    params,
                });

                try {
                    await install.installAdapterFromUrl(url, name);
                    return void callback(EXIT_CODES.NO_ERROR);
                } catch (e) {
                    console.error(`Could not install adapter from url: ${e.message}`);
                    return void callback(EXIT_CODES.CANNOT_INSTALL_NPM_PACKET);
                }
            });
            break;
        }

        case 'info': {
            dbConnect(params, async ({ objects }) => {
                try {
                    const data = await tools.getHostInfo(objects);
                    const formatters = await import('./setup/formatters.js');
                    const formatInfo = {
                        Uptime: formatters.formatSeconds,
                        'System uptime': formatters.formatSeconds,
                        RAM: formatters.formatRam,
                        Speed: formatters.formatSpeed,
                        'Disk size': formatters.formatBytes,
                        'Disk free': formatters.formatBytes,
                    };

                    for (const attr of Object.keys(data)) {
                        console.log(
                            `${attr}${attr.length < 16 ? new Array(16 - attr.length).join(' ') : ''}: ${
                                // @ts-expect-error todo would need checks
                                formatInfo[attr] ? formatInfo[attr](data[attr]) : data[attr] || ''
                            }`,
                        );
                    }
                } catch (err) {
                    console.error(`Cannot read host info: ${typeof err === 'object' ? JSON.stringify(err) : err}`);
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
            let name = args[0];
            let instance: string | undefined = args[1];
            let repoUrl: string | undefined = args[2];

            if (parseInt(instance, 10).toString() !== (instance || '').toString()) {
                repoUrl = instance;
                instance = undefined;
            }
            if (parseInt(repoUrl, 10).toString() === (repoUrl || '').toString()) {
                const temp = instance;
                instance = repoUrl;
                repoUrl = temp;
            }
            if (instance && parseInt(instance, 10).toString() === (instance || '').toString()) {
                params.instance = parseInt(instance, 10);
            }

            // If user accidentally wrote tools.appName.adapter => remove adapter
            name = CLITools.normalizeAdapterName(name);

            const parsedName = CLITools.splitAdapterOrInstanceIdentifierWithVersion(name);
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

            dbConnect(params, async ({ objects, states }) => {
                const { Install } = await import('./setup/setupInstall.js');
                const install = new Install({
                    objects,
                    states,
                    processExit: callback,
                    params,
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

                if (!adapterDir || !fs.existsSync(adapterDir)) {
                    try {
                        const { stoppedList } = await install.downloadPacket(repoUrl, installName);
                        await install.installAdapter(installName, repoUrl);
                        await install.enableInstances(stoppedList, true); // even if unlikely make sure to re-enable disabled instances
                        if (command !== 'install' && command !== 'i') {
                            await install.createInstance(name, params);
                        }
                        return void callback();
                    } catch (e) {
                        console.error(`adapter "${name}" cannot be installed: ${e.message}`);
                        return void callback(e instanceof IoBrokerError ? e.code : EXIT_CODES.UNKNOWN_ERROR);
                    }
                } else if (command !== 'install' && command !== 'i') {
                    try {
                        await install.createInstance(name, params);
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
            const options: InternalRebuildOptions = { debug: process.argv.includes('--debug') };

            if (commandOptions.path) {
                if (path.isAbsolute(commandOptions.path)) {
                    options.cwd = commandOptions.path;
                } else {
                    console.log('Path argument needs to be an absolute path!');
                    return void exitApplicationSave(EXIT_CODES.INVALID_ARGUMENTS);
                }
            }

            if (commandOptions.module) {
                options.module = commandOptions.module;
                console.log(
                    `Rebuilding native module "${commandOptions.module}"${options.cwd ? ` in ${options.cwd}` : ''} ...`,
                );
            } else {
                console.log(`Rebuilding native modules${options.cwd ? ` in ${options.cwd}` : ''} ...`);
            }

            const result = await tools.rebuildNodeModules(options);

            if (result.success) {
                console.log();
                console.log(`Rebuilding native modules done`);
                return void callback();
            }
            console.error('Rebuilding native modules failed');
            return void exitApplicationSave(result.exitCode);
        }

        case 'upload':
        case 'u': {
            const name = args[0];
            const subTree = args[1];
            if (name) {
                dbConnect(params, async ({ objects, states }) => {
                    const { Upload } = await import('./setup/setupUpload.js');
                    const upload = new Upload({ states, objects });

                    if (name === 'all') {
                        try {
                            const objs = await objects.getObjectListAsync({
                                startkey: 'system.adapter.',
                                endkey: 'system.adapter.\u9999',
                            });

                            if (objs) {
                                const adapters = [];

                                for (const row of objs.rows) {
                                    if (row.value.type !== 'adapter') {
                                        continue;
                                    }

                                    adapters.push(
                                        tools.isObject(row.value.common.name)
                                            ? row.value.common.name.en
                                            : row.value.common.name,
                                    );
                                }

                                await upload.uploadAdapterFullAsync(adapters);
                            }
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
                                    `Please specify target name, like:\n${tools.appName} upload /file/picture.png /vis-2.0/main/img/picture.png`,
                                );
                                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                            }

                            try {
                                const newName = await upload.uploadFile(name, subTree);
                                console.log(`File "${name}" is successfully saved under ${newName}`);
                                return void callback();
                            } catch (err) {
                                console.error(`Cannot upload file "${name}": ${err.message}`);
                                return void callback(EXIT_CODES.CANNOT_UPLOAD_DATA);
                            }
                        } else {
                            try {
                                if (subTree) {
                                    await upload.uploadAdapter(name, false, true, subTree);
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
            adapter = CLITools.normalizeAdapterName(adapter);

            // Avoid deleting stuff we don't want to delete
            // e.g. `system.adapter.*`
            if (!instance) {
                // Ensure that adapter contains a valid adapter (without instance nr)
                // or instance (with instance nr) identifier
                if (!CLITools.validateAdapterOrInstanceIdentifier(adapter)) {
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
                if (!CLITools.validateAdapterIdentifier(adapter) || !/^\d+$/.test(instance)) {
                    showHelp();
                    return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
                }
            }

            if (instance) {
                dbConnect(params, async ({ objects, states }) => {
                    const { Install } = await import('@/lib/setup/setupInstall.js');
                    const install = new Install({
                        objects,
                        states,
                        processExit: callback,
                        params,
                    });

                    console.log(`Delete instance "${adapter}.${instance}"`);
                    await install.deleteInstance(adapter, parseInt(instance));
                    callback();
                });
            } else {
                dbConnect(params, async ({ objects, states }) => {
                    const { Install } = await import('@/lib/setup/setupInstall.js');
                    const install = new Install({
                        objects,
                        states,
                        processExit: callback,
                        params,
                    });
                    console.log(`Delete adapter "${adapter}"`);
                    const resultCode = await install.deleteAdapter(adapter);
                    callback(resultCode);
                });
            }
            break;
        }
        case 'unsetup': {
            const rl = (await import('node:readline')).createInterface({
                input: process.stdin,
                output: process.stdout,
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
            const objectsCommand = new CLIObjects(commandOptions);
            objectsCommand.execute(args);
            break;
        }

        case 's':
        case 'state': {
            const statesCommand = new CLIStates(commandOptions);
            statesCommand.execute(args);
            break;
        }

        case 'msg':
        case 'message': {
            const messageCommand = new CLIMessage(commandOptions);
            messageCommand.execute(args);
            break;
        }

        case 'logs': {
            const logsCommand = new CLILogs(commandOptions);
            logsCommand.execute(args, params);
            break;
        }

        case 'upgrade': {
            let adapter: string | null = CLITools.normalizeAdapterName(args[0]);

            if (adapter === 'all') {
                adapter = null;
            }

            dbConnect(params, async ({ objects, states }) => {
                const { Upgrade } = await import('./setup/setupUpgrade.js');
                const upgrade = new Upgrade({
                    objects,
                    states,
                    params,
                    processExit: callback,
                });

                if (adapter) {
                    try {
                        if (adapter === 'self') {
                            const hostAlive = await states.getStateAsync(`system.host.${tools.getHostName()}.alive`);
                            await upgrade.upgradeController('', params.force || params.f, !!hostAlive?.val);
                        } else {
                            await upgrade.upgradeAdapter(
                                '',
                                adapter,
                                params.force || params.f,
                                params.y || params.yes,
                                false,
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
                        const links = await getRepository({ objects });
                        if (!links) {
                            return void callback(EXIT_CODES.INVALID_REPO);
                        }
                        await upgrade.upgradeAdapterHelper(
                            links,
                            Object.keys(links).sort(),
                            false,
                            params.y || params.yes,
                        );
                        return void callback();
                    } catch (e) {
                        console.error(`Cannot upgrade: ${e.message}`);
                        return void callback(e instanceof IoBrokerError ? e.code : EXIT_CODES.INVALID_REPO);
                    }
                }
            });
            break;
        }

        case 'clean': {
            const yes = args[0];
            if (yes !== 'yes') {
                console.log(
                    `Command "clean" clears all Objects and States. To execute it write "${tools.appName} clean yes"`,
                );
            } else {
                dbConnect(params, async ({ isOffline }) => {
                    if (!isOffline) {
                        console.error(`Stop ${tools.appName} first!`);
                        return void callback(EXIT_CODES.CONTROLLER_RUNNING);
                    }

                    try {
                        const count = await cleanDatabase(true);
                        console.log(`Deleted ${count} states`);
                    } catch {
                        // ignore
                    }
                    restartController();
                    console.log(`Restarting ${tools.appName}...`);
                    callback();
                });
            }
            break;
        }

        case 'restore': {
            const { BackupRestore } = await import('./setup/setupBackup.js');

            dbConnect(params, async ({ isOffline, objects, states }) => {
                if (!isOffline) {
                    console.error(`Stop ${tools.appName} first!`);
                    return void callback(EXIT_CODES.CONTROLLER_RUNNING);
                }

                const backup = new BackupRestore({
                    states,
                    objects,
                    cleanDatabase,
                    restartController,
                    processExit: callback,
                });

                const { exitCode } = await backup.restoreBackup({
                    name: args[0],
                    force: !!params.force,
                    dontDeleteAdapters: false,
                });

                if (exitCode === EXIT_CODES.NO_ERROR) {
                    console.log('System successfully restored!');
                }
                return void callback(exitCode);
            });
            break;
        }

        case 'backup': {
            const name = args[0];
            const { BackupRestore } = await import('./setup/setupBackup.js');

            dbConnect(params, async ({ states, objects }) => {
                const backup = new BackupRestore({
                    states,
                    objects,
                    cleanDatabase,
                    restartController,
                    processExit: callback,
                });

                try {
                    const filePath = await backup.createBackup(name);
                    console.log(`Backup created: ${filePath}`);
                    console.log('This backup can only be restored with js-controller version 7.0 or higher');
                    return void callback(EXIT_CODES.NO_ERROR);
                } catch (e) {
                    console.log(`Cannot create backup: ${e.message}`);
                    return void callback(e instanceof IoBrokerError ? e.code : EXIT_CODES.CANNOT_EXTRACT_FROM_ZIP);
                }
            });
            break;
        }

        case 'validate': {
            const name = args[0];
            const { BackupRestore } = await import('./setup/setupBackup.js');
            dbConnect(params, async ({ objects, states }) => {
                const backup = new BackupRestore({
                    states,
                    objects,
                    cleanDatabase,
                    restartController,
                    processExit: callback,
                });

                try {
                    await backup.validateBackup(name);
                    console.log('Backup OK');
                    return void exitApplicationSave(0);
                } catch (err) {
                    console.log(`Backup check failed: ${err.message}`);
                    return void exitApplicationSave(1);
                }
            });
            break;
        }

        case 'l':
        case 'list': {
            dbConnect(params, async ({ objects, states }) => {
                const { List } = await import('./setup/setupList.js');
                const list = new List({
                    states,
                    objects,
                    processExit: callback,
                });
                list.list(args[0] as ListType, args[1], params);
            });
            break;
        }

        case 'touch': {
            let pattern = args[0];

            if (!pattern) {
                console.log('No file path found. Example: "touch /vis-2.0/main/*"');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            dbConnect(params, ({ states, objects }) => {
                // extract id
                pattern = pattern.replace(/\\/g, '/');
                if (pattern[0] === '/') {
                    pattern = pattern.substring(1);
                }

                if (pattern === '*') {
                    objects.getObjectList(
                        {
                            startkey: 'system.adapter.',
                            endkey: 'system.adapter.\u9999',
                        },
                        (err, arr) => {
                            if (!err && arr?.rows) {
                                const files: any[] = [];
                                let count = 0;
                                for (const row of arr.rows) {
                                    if (row.value.type !== 'adapter') {
                                        continue;
                                    }
                                    count++;
                                    objects.touch(
                                        row.value.common.name,
                                        '*',
                                        { user: 'system.user.admin' },
                                        // @ts-expect-error todo this looks wrong, we have no cb args other than err
                                        async (err, processed, _id) => {
                                            if (!err && processed) {
                                                files.push({ id: _id, processed: processed });
                                            }
                                            if (!--count) {
                                                const { List } = await import('./setup/setupList.js');
                                                const list = new List({
                                                    states,
                                                    objects,
                                                    processExit: callback,
                                                });
                                                files.sort((a, b) => a.id.localeCompare(b.id));

                                                for (const file of files) {
                                                    for (const processedFile of processed) {
                                                        list.showFile(file.id, processedFile.path, processedFile);
                                                    }
                                                }
                                                setTimeout(callback, 1_000);
                                            }
                                        },
                                    );
                                }
                                if (!count) {
                                    console.log('Nothing found');
                                    return void callback();
                                }
                            }
                        },
                    );
                } else {
                    const parts = pattern.split('/');
                    const id = parts.shift()!;
                    const path = parts.join('/');

                    // @ts-expect-error todo processed should not exist, how to proceed?
                    objects.touch(id, path, { user: 'system.user.admin' }, async (err, processed) => {
                        if (err) {
                            console.error(err);
                        } else {
                            if (processed) {
                                const { List } = await import('./setup/setupList.js');
                                const list = new List({
                                    states,
                                    objects,
                                    processExit: callback,
                                });
                                for (const processedFile of processed) {
                                    list.showFile(id, processedFile.path, processedFile);
                                }
                            }
                        }
                        setTimeout(callback, 1_000);
                    });
                }
            });
            break;
        }

        case 'rm': {
            let pattern = args[0];

            if (!pattern) {
                console.log('No file path found. Example: "touch /vis-2.0/main/*"');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            dbConnect(params, ({ objects, states }) => {
                // extract id
                pattern = pattern.replace(/\\/g, '/');
                if (pattern[0] === '/') {
                    pattern = pattern.substring(1);
                }

                if (pattern === '*') {
                    objects.getObjectList(
                        {
                            startkey: 'system.adapter.',
                            endkey: 'system.adapter.\u9999',
                        },
                        (err, arr) => {
                            if (!err && arr?.rows) {
                                const files: any[] = [];
                                let count = 0;
                                for (const row of arr.rows) {
                                    if (row.value.type !== 'adapter') {
                                        continue;
                                    }
                                    count++;
                                    objects.rm(
                                        row.value.common.name,
                                        '*',
                                        { user: 'system.user.admin' },
                                        // @ts-expect-error todo id should not exist according to types check it
                                        async (err, processed, _id) => {
                                            if (!err && processed) {
                                                files.push({ id: _id, processed: processed });
                                            }
                                            if (!--count) {
                                                const { List } = await import('./setup/setupList.js');
                                                const list = new List({
                                                    states,
                                                    objects,
                                                    processExit: callback,
                                                });
                                                files.sort((a, b) => a.id.localeCompare(b.id));

                                                list.showFileHeader();
                                                for (const file of files) {
                                                    for (const processedFile of processed) {
                                                        list.showFile(file.id, processedFile.path, processedFile);
                                                    }
                                                }
                                                setTimeout(callback, 1_000);
                                            }
                                        },
                                    );
                                }
                                if (!count) {
                                    console.log('Nothing found');
                                    return void callback();
                                }
                            }
                        },
                    );
                } else {
                    const parts = pattern.split('/');
                    const id = parts.shift()!;
                    const path = parts.join('/');

                    objects.rm(id, path, { user: 'system.user.admin' }, async (err, processed) => {
                        if (err) {
                            console.error(err);
                        } else {
                            if (processed) {
                                const { List } = await import('./setup/setupList.js');
                                const list = new List({
                                    states,
                                    objects,
                                    processExit: callback,
                                });
                                list.showFileHeader();
                                for (const file of processed) {
                                    // @ts-expect-error todo types adjustment needed
                                    list.showFile(id, file.path, file);
                                }
                            }
                        }
                        setTimeout(callback, 1_000);
                    });
                }
            });
            break;
        }

        case 'chmod': {
            let mode: string | number = args[0];
            let pattern = args[1];

            if (!mode) {
                CLIError.requiredArgumentMissing('mode', 'chmod 777 /vis-2.0/main/*');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            // yargs has converted it to number
            mode = parseInt(mode.toString(), 16);

            if (!pattern) {
                CLIError.requiredArgumentMissing('file path', 'chmod 777 /vis-2.0/main/*');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            dbConnect(params, ({ objects, states }) => {
                // extract id
                pattern = pattern.replace(/\\/g, '/');
                if (pattern[0] === '/') {
                    pattern = pattern.substring(1);
                }

                if (pattern === '*') {
                    objects.getObjectList(
                        {
                            startkey: 'system.adapter.',
                            endkey: 'system.adapter.\u9999',
                        },
                        (err, arr) => {
                            if (!err && arr?.rows) {
                                const files: any[] = [];
                                let count = 0;
                                for (const row of arr.rows) {
                                    if (row.value.type !== 'adapter') {
                                        continue;
                                    }
                                    count++;
                                    objects.chmodFile(
                                        row.value.common.name,
                                        '*',
                                        {
                                            user: 'system.user.admin',
                                            mode,
                                        },
                                        // @ts-expect-error todo _id should not exist how to handle
                                        async (err, processed, _id) => {
                                            if (!err && processed) {
                                                files.push({ id: _id, processed: processed });
                                            }
                                            if (!--count) {
                                                const { List } = await import('./setup/setupList.js');
                                                const list = new List({
                                                    states,
                                                    objects,
                                                    processExit: callback,
                                                });
                                                files.sort((a, b) => a.id.localeCompare(b.id));

                                                list.showFileHeader();
                                                for (const file of files) {
                                                    for (const processedFile of file.processed) {
                                                        list.showFile(file.id, processedFile.path, processedFile);
                                                    }
                                                }
                                                setTimeout(callback, 1_000);
                                            }
                                        },
                                    );
                                }
                                if (!count) {
                                    console.log('Nothing found');
                                    return void callback();
                                }
                            }
                        },
                    );
                } else {
                    const parts = pattern.split('/');
                    const id = parts.shift()!;
                    const path = parts.join('/');

                    objects.chmodFile(id, path, { user: 'system.user.admin', mode: mode }, async (err, processed) => {
                        if (err) {
                            console.error(err);
                        } else {
                            if (processed) {
                                const { List } = await import('./setup/setupList.js');
                                const list = new List({
                                    states,
                                    objects,
                                    processExit: callback,
                                });
                                list.showFileHeader();
                                for (const file of processed) {
                                    // @ts-expect-error todo types adjustment needed
                                    list.showFile(id, file.path, file);
                                }
                            }
                        }
                        setTimeout(callback, 1_000);
                    });
                }
            });
            break;
        }

        case 'chown': {
            let user = args[0];
            let group: string | undefined = args[1];
            let pattern = args[2];

            if (!pattern) {
                pattern = group;
                group = undefined;
            }

            if (!user) {
                CLIError.requiredArgumentMissing('user', 'chown user /vis-2.0/main/*');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            } else if (user.substring(12) !== 'system.user.') {
                user = `system.user.${user}`;
            }
            if (group && group.substring(13) !== 'system.group.') {
                group = `system.group.${group}`;
            }

            if (!pattern) {
                CLIError.requiredArgumentMissing('file path', 'chown user /vis-2.0/main/*');
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            dbConnect(params, ({ objects, states }) => {
                // extract id
                pattern = pattern.replace(/\\/g, '/');
                if (pattern[0] === '/') {
                    pattern = pattern.substring(1);
                }

                if (pattern === '*') {
                    objects.getObjectList(
                        {
                            startkey: 'system.adapter.',
                            endkey: 'system.adapter.\u9999',
                        },
                        (err, arr) => {
                            if (!err && arr?.rows) {
                                const files: any[] = [];
                                let count = 0;
                                for (const row of arr.rows) {
                                    if (row.value.type !== 'adapter') {
                                        continue;
                                    }
                                    count++;
                                    objects.chownFile(
                                        row.value.common.name,
                                        '*',
                                        {
                                            user: 'system.user.admin',
                                            owner: user as ioBroker.ObjectIDs.User,
                                            ownerGroup: group,
                                        },
                                        // @ts-expect-error todo _id should not exist how to handle
                                        async (err, processed, _id) => {
                                            if (!err && processed) {
                                                files.push({ id: _id, processed: processed });
                                            }
                                            if (!--count) {
                                                const { List } = await import('./setup/setupList.js');
                                                const list = new List({
                                                    states,
                                                    objects,
                                                    processExit: callback,
                                                });
                                                files.sort((a, b) => a.id.localeCompare(b.id));

                                                list.showFileHeader();
                                                for (let k = 0; k < files.length; k++) {
                                                    for (let t = 0; t < files[k].processed.length; t++) {
                                                        list.showFile(
                                                            files[k].id,
                                                            files[k].processed[t].path,
                                                            files[k].processed[t],
                                                        );
                                                    }
                                                }
                                                setTimeout(callback, 1_000);
                                            }
                                        },
                                    );
                                }
                                if (!count) {
                                    console.log('Nothing found');
                                    return void callback();
                                }
                            }
                        },
                    );
                } else {
                    const parts = pattern.split('/');
                    const id = parts.shift()!;
                    const path = parts.join('/');

                    objects.chownFile(
                        id,
                        path,
                        {
                            user: 'system.user.admin',
                            owner: user as ioBroker.ObjectIDs.User,
                            ownerGroup: group,
                        },
                        async (err, processed) => {
                            if (err) {
                                console.error(err);
                            } else {
                                // call here list
                                if (processed) {
                                    const { List } = await import('./setup/setupList.js');
                                    const list = new List({
                                        states,
                                        objects,
                                        processExit: callback,
                                    });
                                    list.showFileHeader();
                                    for (const file of processed) {
                                        // @ts-expect-error todo types adjustment needed
                                        list.showFile(id, file.path, file);
                                    }
                                }
                            }
                            setTimeout(callback, 1_000);
                        },
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

            dbConnect(params, async ({ objects }) => {
                const { Users } = await import('./setup/setupUsers.js');
                const users = new Users({
                    objects,
                    processExit: callback,
                });
                const password = params.password;
                const group = params.ingroup || 'system.group.administrator';

                if (command === 'add') {
                    users.addUserPrompt(user, group, password, (err: any) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`User "${user}" created (Group: ${group.replace('system.group.', '')})`);
                        return void callback();
                    });
                } else if (command === 'del' || command === 'delete') {
                    users.delUser(user, (err: any) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`User "${user}" deleted`);
                        return void callback();
                    });
                } else if (command === 'check') {
                    users.checkUserPassword(user, password, err => {
                        if (err) {
                            console.error(err.message);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`Password for user "${user}" matches.`);
                        return void callback();
                    });
                } else if (command === 'set' || command === 'passwd') {
                    users.setUserPassword(user, password, err => {
                        if (err) {
                            console.error(err.message);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`Password for "${user}" was successfully set.`);
                        return void callback();
                    });
                } else if (command === 'enable' || command === 'e') {
                    users.enableUser(user, true, err => {
                        if (err) {
                            console.error(err.message);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`User "${user}" was successfully enabled.`);
                        return void callback();
                    });
                } else if (command === 'disable' || command === 'd') {
                    users.enableUser(user, false, err => {
                        if (err) {
                            console.error(err.message);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`User "${user}" was successfully disabled.`);
                        return void callback();
                    });
                } else if (command === 'get') {
                    users.getUser(user, (err, isEnabled) => {
                        if (err) {
                            console.error(err.message);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`User "${user}" is ${isEnabled ? 'enabled' : 'disabled'}`);
                        return void callback();
                    });
                } else {
                    console.warn(
                        `Unknown command "${command}". Available commands are: add, del, passwd, enable, disable, check, get`,
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
                    `Unknown command "${command}". Available commands are: add, del, passwd, enable, disable, list, get`,
                );
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            if (!group) {
                console.warn(`Please define group name: group ${command} groupName`);
                return callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
            }

            dbConnect(params, async ({ objects }) => {
                const { Users } = await import('./setup/setupUsers.js');
                const users = new Users({
                    objects,
                    processExit: callback,
                });

                if (command === 'useradd' || command === 'adduser') {
                    if (!user) {
                        console.warn('Please define user name: "group useradd groupName userName"');
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    }
                    users.addUserToGroup(user, group, (err: any) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`User "${user}" was added to group "${group}"`);
                        return void callback();
                    });
                } else if (command === 'userdel' || command === 'deluser') {
                    if (!user) {
                        console.warn('Please define user name: "group userdel groupName userName"');
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    }
                    users.removeUserFromGroup(user, group, (err: any) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`User "${user}" was deleted from group "${group}"`);
                        return void callback();
                    });
                } else if (command === 'add') {
                    try {
                        await users.addGroup(group);
                        console.log(`Group "${group}" was created`);
                        return void callback();
                    } catch {
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    }
                } else if (command === 'del' || command === 'delete') {
                    users.delGroup(group, (err: any) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`Group "${group}" was deleted`);
                        return void callback();
                    });
                } else if (command === 'list' || command === 'l') {
                    users.getGroup(group, (err, isEnabled, members) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(
                            `Group "${group}" is ${isEnabled ? 'enabled' : 'disabled'} and has following members:`,
                        );
                        if (members) {
                            for (const member of members) {
                                console.log(member.substring('system.user.'.length));
                            }
                        }
                        return void callback();
                    });
                } else if (command === 'enable' || command === 'e') {
                    users.enableGroup(group, true, (err: any) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`Group "${group}" was successfully enabled.`);
                        return void callback();
                    });
                } else if (command === 'disable' || command === 'd') {
                    users.enableGroup(group, false, (err: any) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`Group "${group}" was successfully disabled.`);
                        return void callback();
                    });
                } else if (command === 'get') {
                    users.getGroup(group, (err, isEnabled) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                        }
                        console.log(`Group "${group}" is ${isEnabled ? 'enabled' : 'disabled'}`);
                        return void callback();
                    });
                } else {
                    console.warn(
                        `Unknown command "${command}". Available commands are: add, del, passwd, enable, disable, list, get`,
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

            dbConnect(params, async ({ objects }) => {
                const { Users } = await import('./setup/setupUsers.js');
                const users = new Users({
                    objects,
                    processExit: callback,
                });
                users.addUserPrompt(user, group, password, (err: any) => {
                    if (err) {
                        console.error(err);
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    }
                    console.log(`User "${user}" created (Group: ${group.replace('system.group.', '')})`);
                    return void callback();
                });
            });
            break;
        }

        case 'passwd': {
            const user = args[0];
            const password = params.password;
            dbConnect(params, async ({ objects }) => {
                const { Users } = await import('./setup/setupUsers.js');
                const users = new Users({
                    objects,
                    processExit: callback,
                });
                users.setUserPassword(user, password, (err: any) => {
                    if (err) {
                        console.error(err);
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    }
                    console.log(`Password for "${user}" was successfully set.`);
                    return void callback();
                });
            });
            break;
        }

        case 'ud':
        case 'udel':
        case 'userdel':
        case 'deluser': {
            const user = args[0];

            dbConnect(params, async ({ objects }) => {
                const { Users } = await import('./setup/setupUsers.js');
                const users = new Users({
                    objects,
                    processExit: callback,
                });
                users.delUser(user, (err: any) => {
                    if (err) {
                        console.error(err);
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    }
                    console.log(`User "${user}" deleted`);
                    return void callback();
                });
            });
            break;
        }

        // Create package.json in /opt/' + tools.appName + '
        case 'package': {
            const json = {
                name: tools.appName,
                engines: {
                    node: '>=12',
                },
                optionalDependencies: {} as Record<string, string>,
                dependencies: {
                    [`${tools.appName.toLowerCase()}.js-controller`]: '*',
                    [`${tools.appName.toLowerCase()}.admin`]: '*',
                },
                author: 'bluefox <dogafox@gmail.com>',
            };

            // @ts-expect-error todo fix it
            tools.getRepositoryFile(null, null, (_err, sources, _sourcesHash) => {
                if (sources) {
                    for (const s in sources) {
                        if (Object.prototype.hasOwnProperty.call(sources, s)) {
                            if (sources[s].url) {
                                if (!json.dependencies[`${tools.appName}.${s}`]) {
                                    json.optionalDependencies[`${tools.appName}.${s}`] = sources[s].url;
                                }
                            } else {
                                if (!json.dependencies[`${tools.appName}.${s}`]) {
                                    json.optionalDependencies[`${tools.appName}.${s}`] = '*';
                                }
                            }
                        }
                    }
                }

                fs.writeFileSync(path.join(tools.getRootDir(), 'package.json'), JSON.stringify(json, null, 2));
                return void callback();
            });
            break;
        }

        case 'set': {
            const instance = args[0] as `${string}.${number}`;
            if (!instance) {
                console.warn('please specify instance.');
                return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
            }
            if (instance.indexOf('.') === -1) {
                console.warn(`please specify instance, like "${instance}.0"`);
                return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
            }
            const { objects } = await dbConnectAsync(false, params);

            let obj: ioBroker.InstanceObject | undefined | null;

            try {
                obj = await objects.getObjectAsync(`system.adapter.${instance}`);
            } catch {
                // ignore
            }

            if (obj) {
                let changed = false;
                for (let a = 0; a < process.argv.length; a++) {
                    if (
                        process.argv[a].startsWith('--') &&
                        process.argv[a + 1] &&
                        !process.argv[a + 1].startsWith('--')
                    ) {
                        const attr = process.argv[a].substring(2);
                        let val: number | string | boolean = process.argv[a + 1];
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
                    obj.from = `system.host.${tools.getHostName()}.cli`;
                    obj.ts = new Date().getTime();
                    objects.setObject(`system.adapter.${instance}`, obj, () => {
                        console.log(`Instance settings for "${instance}" are changed.`);
                        return void callback();
                    });
                } else {
                    console.log('No parameters set.');
                    return void callback();
                }
            } else {
                CLIError.invalidInstance(instance);
                return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
            }
            break;
        }

        case 'host': {
            const hostCommand = new CLIHost(commandOptions);
            hostCommand.execute(args);
            break;
        }

        case 'visdebug': {
            let widgetset = args[0];
            if (widgetset && widgetset.startsWith('vis-')) {
                widgetset = widgetset.substring(4);
            }
            const { VisDebug } = await import('./setup/setupVisDebug.js');

            dbConnect(params, ({ objects }) => {
                const visDebug = new VisDebug({
                    objects,
                    processExit: callback,
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
                    'Invalid parameters: write "file read /vis-2.0/main/img/picture.png /opt/picture/image.png" to read the file',
                );
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            if (cmd !== 'sync' && !args[1]) {
                console.log(
                    'Invalid parameters: write "file read /vis-2.0/main/img/picture.png /opt/picture/image.png" to read the file from DB and store it on disk',
                );
                console.log(
                    'or                        "file write /opt/SOURCE/image.png /vis-2.0/main/DESTINATION/picture.png" to write the file into DB from disk',
                );
                console.log(
                    'or                        "file rm /vis-2.0/main/img/picture.png" to delete the file in DB',
                );
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }

            dbConnect(params, async ({ objects, objectsDBType }) => {
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

                    objects.readFile(adapt, parts.join('/'), null, (err, data) => {
                        err && console.error(err);
                        if (data) {
                            const destFilename = path.join('/');
                            fs.writeFileSync(destFilename, data);
                            console.log(`File "${toRead}" stored as "${destFilename}"`);
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
                            `Please provide a valid file name as source file: "file write /opt/SOURCE/script.js /vis-2/DESTINATION/script.js"`,
                        );
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }
                    const srcStat = fs.statSync(toRead);
                    if (!srcStat.isFile()) {
                        console.log(
                            `Please provide a valid file name as source file: "file write /opt/SOURCE/script.js /vis-2/DESTINATION/script.js"`,
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
                        console.log(`File "${toRead}" stored as "${destFilename}"`);
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

                    objects.unlink(adapt, parts.join('/'), null, err => {
                        err && console.error(err);
                        !err && console.log(`File "${toDelete}" was deleted`);
                        return void callback(EXIT_CODES.NO_ERROR);
                    });
                } else if (cmd === 'sync') {
                    // Sync
                    if (objectsDBType === 'redis') {
                        console.log('File Sync is not available when database type "redis" is used.');
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                    }
                    // @ts-expect-error todo look in depth how to handle
                    if (!objects.syncFileDirectory || !objects.dirExists) {
                        // functionality only exists in server class
                        console.log(
                            'Please stop ioBroker before syncing files and only use this command on the ioBroker master host!',
                        );
                        return void callback(EXIT_CODES.CONTROLLER_RUNNING);
                    }

                    // check meta.user
                    try {
                        const objExists = await objects.objectExists('meta.user');
                        if (objExists) {
                            // check if dir is missing
                            // @ts-expect-error todo look in depth how to handle
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
                        // @ts-expect-error todo types needed for this one? but only exists sometimes..
                        const { numberSuccess, notifications } = objects.syncFileDirectory(args[1]);
                        console.log(`${numberSuccess} file(s) successfully synchronized with ioBroker storage`);
                        if (notifications.length) {
                            console.log();
                            console.log('The following notifications happened during sync: ');
                            notifications.forEach((el: string) => console.log(`- ${el}`));
                        }
                        return void callback(EXIT_CODES.NO_ERROR);
                    } catch (err) {
                        console.error(`Error on sync: ${err.message}. Partial content might have been synced.`);
                        return void callback(EXIT_CODES.CANNOT_SYNC_FILES);
                    }
                } else {
                    console.log(
                        'Invalid parameters: write "file read /vis-2.0/main/img/picture.png /opt/picture/image.png" to read the file from DB and store it on disk',
                    );
                    console.log(
                        'or                        "file write /opt/SOURCE/image.png /vis-2.0/main/DESTINATION/picture.png" to write the file into DB from disk',
                    );
                    console.log(
                        'or                        "file rm /vis-2.0/main/img/picture.png" to delete the file in DB',
                    );
                    return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                }
            });
            break;
        }

        case 'id':
        case 'uuid': {
            dbConnect(params, ({ objects }) => {
                objects.getObject('system.meta.uuid', (err, obj) => {
                    if (err) {
                        console.error(`Error: ${err.message}`);
                        return void callback(EXIT_CODES.CANNOT_GET_UUID);
                    }
                    if (obj?.native) {
                        console.log(obj.native.uuid);
                        return void callback();
                    }
                    console.error('Error: no UUID found');
                    return void callback(EXIT_CODES.CANNOT_GET_UUID);
                });
            });
            break;
        }

        case 'v':
        case 'version': {
            const adapter = params.adapter;

            if (params.ignore) {
                try {
                    const { objects } = await dbConnectAsync(false, params);
                    await ignoreVersion({ adapterName: adapter, version: params.ignore, objects });
                } catch (e) {
                    console.error(e.message);
                    callback(e instanceof IoBrokerError ? e.code : EXIT_CODES.UNKNOWN_ERROR);
                    return;
                }
                console.log(`Successfully ignored version "${params.ignore}" of adapter "${params.adapter}"!`);
                callback();
                return;
            }

            if (params.recognize) {
                try {
                    const { objects } = await dbConnectAsync(false, params);
                    await recognizeVersion({ adapterName: adapter, objects });
                } catch (e) {
                    console.error(e.message);
                    callback(e instanceof IoBrokerError ? e.code : EXIT_CODES.UNKNOWN_ERROR);
                }
                console.log(`Successfully recognized all versions of adapter "${params.adapter}" again!`);
                callback();
                return;
            }

            let packJson;
            if (adapter) {
                try {
                    packJson = require(`${tools.appName.toLowerCase()}.${adapter}/package.json`);
                } catch {
                    packJson = { version: `"${adapter}" not found` };
                }
            } else {
                packJson = require(`@iobroker/js-controller-common/package.json`);
            }
            console.log(packJson.version);

            return void callback();
        }

        case 'checklog': {
            dbConnect(params, async ({ objects, states, isOffline, objectsDBType }) => {
                const hasLocalObjectsServer = await objectsDbHasServer(objectsDBType);
                if (isOffline && hasLocalObjectsServer) {
                    console.log(`${tools.appName} is not running`);
                    return void callback(EXIT_CODES.CONTROLLER_NOT_RUNNING);
                }
                console.log(`${tools.appName} is running`);
                objects.getObjectList(
                    {
                        startkey: 'system.host.',
                        endkey: `system.host.\u9999`,
                    },
                    null,
                    (err, res) => {
                        if (!err && res?.rows.length) {
                            for (const row of res.rows) {
                                const parts = row.id.split('.');
                                // ignore system.host.name.alive and so on
                                if (parts.length === 3) {
                                    states.pushMessage(row.id, {
                                        command: 'checkLogging',
                                        message: null,
                                        from: 'console',
                                    });
                                }
                            }
                        }
                        setTimeout(callback, 200);
                    },
                );
            });
            break;
        }

        case 'repo': {
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

            dbConnect(params, async ({ objects, states }) => {
                const { Repo } = await import('./setup/setupRepo.js');
                const repo = new Repo({
                    objects,
                    states,
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
                    }
                    if (repoUrlOrCommand === 'add' || repoUrlOrCommand === 'addset') {
                        if (!repoUrl) {
                            console.warn(
                                `Please define repository URL or path: ${tools.appName.toLowerCase()} add <repoName> <repoUrlOrPath>`,
                            );
                            return void callback(EXIT_CODES.INVALID_ARGUMENTS);
                        }
                        try {
                            await repo.add(repoName, repoUrl);

                            if (repoUrlOrCommand === 'addset') {
                                await repo.setActive(repoName);
                                console.log(`Repository "${repoName}" set as active: "${repoUrl}"`);
                                await repo.showRepoStatus();
                                return void callback();
                            }
                            console.log(`Repository "${repoName}" added as "${repoUrl}"`);
                            await repo.showRepoStatus();
                            return void callback();
                        } catch (err) {
                            console.error(`Cannot add repository location: ${err.message}`);
                            return void callback(EXIT_CODES.INVALID_REPO);
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
                        console.warn(`Unknown repo command: ${repoUrlOrCommand as string}`);
                        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
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
            }
            dbConnect(params, async ({ objects, states }) => {
                const { Multihost } = await import('./setup/setupMultihost.js');
                const mh = new Multihost({
                    params,
                    objects,
                });

                if (cmd === 's' || cmd === 'status') {
                    mh.status();
                    return void callback();
                } else if (cmd === 'b' || cmd === 'browse') {
                    try {
                        const list = await mh.browse();
                        mh.showHosts(list);
                        return void callback();
                    } catch (e) {
                        console.error(e.message);
                        return void callback(EXIT_CODES.CANNOT_CREATE_USER_OR_GROUP);
                    }
                } else if (cmd === 'e' || cmd === 'enable') {
                    mh.enable(true, async (err: any) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_ENABLE_MULTIHOST);
                        }
                        await states.pushMessage(`system.host.${tools.getHostName()}`, {
                            command: 'updateMultihost',
                            message: null,
                            from: 'setup',
                        });

                        callback();
                    });
                } else if (cmd === 'd' || cmd === 'disable') {
                    mh.enable(false, async (err: any) => {
                        if (err) {
                            console.error(err);
                            return void callback(EXIT_CODES.CANNOT_ENABLE_MULTIHOST);
                        }
                        await states.pushMessage(`system.host.${tools.getHostName()}`, {
                            command: 'updateMultihost',
                            message: null,
                            from: 'setup',
                        });

                        callback();
                    });
                } else if (cmd === 'c' || cmd === 'connect') {
                    mh.connect(parseInt(args[1]), args[2], (err: any) => {
                        if (err) {
                            console.error(err);
                        }
                        return void callback(err ? 1 : 0);
                    });
                }
            });

            break;
        }

        case 'vendor': {
            const password = args[0];
            const file = args[1];
            if (!password) {
                console.warn(
                    `Please specify the password to update the vendor information!\n${tools.appName.toLowerCase()} vendor <PASS_PHRASE> <vendor.json>`,
                );
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }

            const { objects } = await dbConnectAsync(false, params);
            const { Vendor } = await import('./setup/setupVendor.js');
            const vendor = new Vendor({ objects });

            try {
                await vendor.checkVendor(file, password);
                console.log(`Synchronised vendor information.`);
                return void callback();
            } catch (err) {
                console.error(`Cannot update vendor information: ${err.message}`);
                return void callback(EXIT_CODES.CANNOT_UPDATE_VENDOR);
            }
        }

        case 'cert': {
            const certCommand = new CLICert(commandOptions);
            certCommand.execute(args);
            break;
        }

        case 'compact': {
            const compactCommand = new CLICompact(commandOptions);
            compactCommand.execute(args);
            break;
        }

        case 'plugin': {
            const pluginCommand = new CLIPlugin(commandOptions);
            pluginCommand.execute(args);
            break;
        }

        case 'license': {
            const file = args[0];
            if (!file) {
                console.warn(
                    `Please specify the path to the license file or place license text directly!\n${tools.appName.toLowerCase()} license <license.file or license.text>`,
                );
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            dbConnect(params, async ({ objects }) => {
                const { License } = await import('./setup/setupLicense.js');
                const license = new License({ objects });
                try {
                    await license.setLicense(file);
                    console.log(`License updated.`);
                    return void callback();
                } catch (err) {
                    console.error(`Cannot update license: ${err.message}`);
                    return void callback(EXIT_CODES.CANNOT_UPDATE_LICENSE);
                }
            });

            break;
        }

        default: {
            if (params.v || params.version) {
                let pckg;
                if (command) {
                    try {
                        pckg = require(`${tools.appName.toLowerCase()}.${command}/package.json`);
                    } catch {
                        pckg = { version: `"${command}" not found` };
                    }
                } else {
                    pckg = require(`@iobroker/js-controller-common/package.json`);
                }
                console.log(pckg.version);
            } else {
                showHelp();
                return void callback(EXIT_CODES.INVALID_ARGUMENTS);
            }
            return void callback();
        }
    }
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
    'system.user.admin',
];

/**
 * Deletes given objects from the database
 *
 * @param ids ids to delete from database
 */
async function delObjects(ids: string[]): Promise<void> {
    const { objects } = await dbConnectAsync(false);

    if (ids?.length) {
        for (const id of ids) {
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

/**
 * Deletes all states from the database
 */
async function delStates(): Promise<number> {
    const { states } = await dbConnectAsync(false);

    const keys = await states.getKeys('*');
    if (keys) {
        console.log(`clean ${keys.length} states...`);
        for (const key of keys) {
            try {
                await states.delState(key);
            } catch (err) {
                console.error(`[Not critical] Cannot delete state ${key}: ${err.message}`);
            }
        }
    }
    return keys ? keys.length : 0;
}

/**
 * Cleans the database
 *
 * @param isDeleteDb - if whole db should be destroyed
 */
async function cleanDatabase(isDeleteDb: boolean): Promise<number> {
    const { objects } = await dbConnectAsync(false);

    if (isDeleteDb) {
        await objects.destroyDBAsync();
        // Clean up states
        const keysCount = await delStates();
        return keysCount;
    }
    // Clean only objects, not the views
    let ids: string[] = [];

    try {
        const res = await objects.getObjectListAsync({ startkey: '\u0000', endkey: '\u9999' });
        if (res.rows.length) {
            console.log(`clean ${res.rows.length} objects...`);
            ids = res.rows.map(e => e.id);
        }
    } catch {
        // ignore
    }

    await delObjects(ids);
    // Clean up states
    const keysCount = await delStates();
    return keysCount;
}

function unsetup(params: Record<string, any>, callback: ExitCodeCb): void {
    dbConnect(params, ({ objects }) => {
        objects.delObject('system.meta.uuid', err => {
            if (err) {
                console.log(`uuid cannot be deleted: ${err.message}`);
            } else {
                console.log('system.meta.uuid deleted');
            }
            objects.getObject('system.config', (_err, obj) => {
                if (obj?.common.licenseConfirmed || obj?.common.language || obj?.native?.secret) {
                    obj.common.language = 'en';
                    // allow with parameter --keepsecret to not delete the secret
                    // This is very specific use case for vendors and must not be described in documentation
                    if (!params.keepsecret) {
                        obj.common.licenseConfirmed = false;
                        obj.native && delete obj.native.secret;
                    }

                    obj.from = `system.host.${tools.getHostName()}.cli`;
                    obj.ts = new Date().getTime();

                    objects.setObject('system.config', obj as any, err => {
                        if (err) {
                            console.log(`not found: ${err.message}`);
                            return void callback(EXIT_CODES.CANNOT_SET_OBJECT);
                        }
                        console.log('system.config reset');
                        return void callback();
                    });
                } else {
                    console.log('system.config is OK');
                    return void callback();
                }
            });
        });
    });
}

/**
 * Spawns a process which restarts the controller
 */
async function restartController(): Promise<void> {
    console.log('Starting node restart.js');
    const { spawn } = await import('node:child_process');

    const child = spawn('node', [`${thisDir}/restart.js`], {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore'],
        windowsHide: true,
    });

    child.unref();
}

/**
 * Method which should be called from CLI to initialize the handling of all args
 */
export function execute(): void {
    // direct call
    const _yargs = initYargs();
    // @ts-expect-error todo fix it
    const command = _yargs.argv._[0];

    const args: string[] = [];

    // skip interpreter, filename and command
    for (let i = 3; i < process.argv.length; i++) {
        if (process.argv[i].startsWith('-')) {
            // on first param we have all our args
            break;
        }
        args.push(process.argv[i]);
    }

    processCommand(command, args, _yargs.argv, exitApplicationSave);
}

process.on('unhandledRejection', (e: any) => {
    console.error(`Uncaught Rejection: ${e.stack || e}`);
    exitApplicationSave(EXIT_CODES.UNCAUGHT_EXCEPTION);
});
