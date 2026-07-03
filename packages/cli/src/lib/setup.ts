import fs from 'fs-extra';
import Debug from 'debug';
import path from 'node:path';
import yargs from 'yargs/yargs';
import * as url from 'node:url';
import * as events from 'node:events';
import { createRequire } from 'node:module';

import { tools, EXIT_CODES, objectsDbHasServer } from '@iobroker/js-controller-common';
import { SYSTEM_CONFIG_ID, SYSTEM_REPOSITORIES_ID } from '@iobroker/js-controller-common-db/constants';

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
import type { CLICommandContext, CLICommandOptions, ProcessCommandOptions } from '@/lib/cli/cliCommand.js';
import { ignoreVersion, recognizeVersion } from '@/lib/setup/utils.js';
import { dbConnect, dbConnectAsync, exitApplicationSave } from '@/lib/setup/dbConnection.js';
import { IoBrokerError } from '@/lib/setup/customError.js';
import { List, type ListType } from '@/lib/setup/setupList.js';
import * as formatters from '@/lib/setup/formatters.js';

// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));
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
                    'self[@<version>] [<repositoryUrl>]',
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
        .command('repo', 'Show repo information', yargs => {
            yargs
                .command('set <name>|<index>', 'Set active repository')
                .command('del <name>|<index>', 'Remove repository')
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
    params: Record<string, string | boolean | number>,
    callback: ExitCodeCb,
): Promise<void> {
    const commandContext: CLICommandContext = { dbConnect, callback, showHelp };
    const commandOptions: CLICommandOptions = { ...params, ...commandContext };
    const options: ProcessCommandOptions = {
        command,
        args,
        params,
        callback,
        commandOptions,
        cleanDatabase,
        restartController,
    };
    debug(`commandOptions: ${JSON.stringify(commandOptions)}`);
    debug(`args: ${JSON.stringify(args)}`);

    switch (command) {
        case 'start':
        case 'stop': {
            const procCommand = new CLIProcess(commandOptions);
            procCommand[command](args).catch(e => console.error(`Cannot ${command}: ${e.message}`));
            break;
        }

        case 'debug': {
            const debugCommand = new CLIDebug(commandOptions);
            debugCommand.execute(args).catch(e => console.error(`Cannot debug: ${e.message}`));
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
            procCommand.restart(args).catch(e => console.error(`Cannot restart: ${e.message}`));
            break;
        }

        case '_restart':
            restartController().catch(e => console.error(`Cannot restart controller: ${e.message}`));
            callback();
            break;

        case 'update': {
            const { processCommandUpdate } = await import('@/lib/setup/setupRepo.js');
            return processCommandUpdate(options);
        }

        case 'setup': {
            const { processCommandSetup } = await import('@/lib/setup/setupSetup.js');
            return processCommandSetup(options);
        }

        case 'url': {
            const { processCommandUrl } = await import('@/lib/setup/setupInstall.js');
            return processCommandUrl(options);
        }

        case 'info':
            return processCommandInfo(options);

        case 'a':
        case 'add':
        case 'install':
        case 'i': {
            const { processCommandInstall } = await import('@/lib/setup/setupInstall.js');
            return processCommandInstall(options);
        }

        case 'rebuild':
            return processCommandRebuild(options);

        case 'upload':
        case 'u': {
            const { processCommandUpload } = await import('@/lib/setup/setupUpload.js');
            return processCommandUpload(options);
        }

        case 'delete':
        case 'del': {
            const { processCommandDelete } = await import('@/lib/setup/setupInstall.js');
            return processCommandDelete(options);
        }
        case 'unsetup':
            return processCommandUnsetup(options);

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
            const { processCommandUpgrade } = await import('@/lib/setup/setupUpgrade.js');
            return processCommandUpgrade(options);
        }

        case 'clean':
            return processCommandClean(options);

        case 'restore': {
            const { processCommandRestore } = await import('@/lib/setup/setupBackup.js');
            return processCommandRestore(options);
        }

        case 'backup': {
            const { processCommandBackup } = await import('@/lib/setup/setupBackup.js');
            return processCommandBackup(options);
        }

        case 'validate': {
            const { processCommandValidate } = await import('@/lib/setup/setupBackup.js');
            return processCommandValidate(options);
        }

        case 'l':
        case 'list': {
            dbConnect(params, ({ objects, states }) => {
                const list = new List({
                    states,
                    objects,
                    processExit: callback,
                });
                list.list(args[0] as ListType, args[1], params);
            });
            break;
        }

        case 'touch':
            return processCommandTouch(options);

        case 'rm':
            return processCommandRm(options);

        case 'chmod':
            return processCommandChmod(options);

        case 'chown':
            return processCommandChown(options);

        case 'user': {
            const { processCommandUser } = await import('@/lib/setup/setupUsers.js');
            return processCommandUser(options);
        }

        case 'g':
        case 'group': {
            const { processCommandGroup } = await import('@/lib/setup/setupUsers.js');
            return processCommandGroup(options);
        }

        case 'adduser': {
            const { processCommandAddUser } = await import('@/lib/setup/setupUsers.js');
            return processCommandAddUser(options);
        }

        case 'passwd': {
            const { processCommandPassword } = await import('@/lib/setup/setupUsers.js');
            return processCommandPassword(options);
        }

        case 'ud':
        case 'udel':
        case 'userdel':
        case 'deluser': {
            const { processCommandUserDel } = await import('@/lib/setup/setupUsers.js');
            return processCommandUserDel(options);
        }

        case 'package':
            return processCommandPackage(options);

        case 'set':
            return processCommandSet(options);

        case 'host': {
            const hostCommand = new CLIHost(commandOptions);
            hostCommand.execute(args);
            break;
        }

        case 'visdebug': {
            const { processCommandVisDebug } = await import('@/lib/setup/setupVisDebug.js');
            return processCommandVisDebug(options);
        }

        case 'file':
        case 'f':
            return processCommandFile(options);

        case 'id':
        case 'uuid':
            return processCommandUuid(options);

        case 'v':
        case 'version':
            return processCommandVersion(options);

        case 'checklog':
            return processCommandCheckLog(options);

        case 'repo': {
            const { processCommandRepo } = await import('@/lib/setup/setupRepo.js');
            return processCommandRepo(options);
        }

        case 'multihost':
        case 'mh': {
            const { processCommandMultihost } = await import('@/lib/setup/setupMultihost.js');
            return processCommandMultihost(options);
        }

        case 'vendor': {
            const { processCommandVendor } = await import('@/lib/setup/setupVendor.js');
            return processCommandVendor(options);
        }

        case 'cert': {
            const certCommand = new CLICert(commandOptions);
            Promise.resolve(certCommand.execute(args)).catch(e =>
                console.error(`Cannot execute cert command: ${e.message}`),
            );
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
            const { processCommandLicense } = await import('@/lib/setup/setupLicense.js');
            return processCommandLicense(options);
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

/**
 * Process the `info` CLI command: print host information
 *
 * @param options command options provided by the dispatcher
 */
function processCommandInfo(options: ProcessCommandOptions): void {
    const { params, callback } = options;
    dbConnect(params, async ({ objects }) => {
        try {
            const data = await tools.getHostInfo(objects);

            for (const attr in data) {
                let info: string;
                if (attr === 'Uptime' || attr === 'System uptime') {
                    info = formatters.formatSeconds(data[attr as keyof tools.HostInfo] as number);
                } else if (attr === 'RAM') {
                    info = formatters.formatRam(data[attr as keyof tools.HostInfo] as number);
                } else if (attr === 'Speed') {
                    info = formatters.formatSpeed(data[attr as keyof tools.HostInfo] as number);
                } else if (attr === 'Disk size' || attr === 'Disk free') {
                    info = formatters.formatBytes(data[attr as keyof tools.HostInfo] as number);
                } else {
                    info = data[attr as keyof tools.HostInfo] as string;
                }
                console.log(`${attr}${attr.length < 16 ? new Array(16 - attr.length).join(' ') : ''}: ${info || ''}`);
            }
        } catch (err) {
            console.error(`Cannot read host info: ${typeof err === 'object' ? JSON.stringify(err) : err}`);
            return callback(EXIT_CODES.CANNOT_GET_HOST_INFO);
        }

        return void callback();
    });
}

/**
 * Process the `rebuild` CLI command: rebuild all native modules or a single native module
 *
 * @param options command options provided by the dispatcher
 */
async function processCommandRebuild(options: ProcessCommandOptions): Promise<void> {
    const { callback, commandOptions } = options;
    const rebuildOptions: InternalRebuildOptions = { debug: process.argv.includes('--debug') };

    if (commandOptions.path) {
        if (path.isAbsolute(commandOptions.path)) {
            rebuildOptions.cwd = commandOptions.path;
        } else {
            console.log('Path argument needs to be an absolute path!');
            return void exitApplicationSave(EXIT_CODES.INVALID_ARGUMENTS);
        }
    }

    if (commandOptions.module) {
        rebuildOptions.module = commandOptions.module;
        console.log(
            `Rebuilding native module "${commandOptions.module}"${rebuildOptions.cwd ? ` in ${rebuildOptions.cwd}` : ''} ...`,
        );
    } else {
        console.log(`Rebuilding native modules${rebuildOptions.cwd ? ` in ${rebuildOptions.cwd}` : ''} ...`);
    }

    const result = await tools.rebuildNodeModules(rebuildOptions);

    if (result.success) {
        console.log();
        console.log(`Rebuilding native modules done`);
        return void callback();
    }
    console.error('Rebuilding native modules failed');
    return void exitApplicationSave(result.exitCode);
}

/**
 * Process the `unsetup` CLI command: delete the installation UUID after confirmation
 *
 * @param options command options provided by the dispatcher
 */
async function processCommandUnsetup(options: ProcessCommandOptions): Promise<void> {
    const { params, callback } = options;
    const rl = (await import('node:readline')).createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    if (params.yes || params.y || params.Y) {
        unsetup(params, callback).catch(e => console.error(`Cannot unsetup: ${e.message}`));
    } else {
        rl.question('UUID will be deleted. Are you sure? [y/N]: ', answer => {
            rl.close();
            answer = answer.toLowerCase();
            if (answer === 'y' || answer === 'yes' || answer === 'ja' || answer === 'j') {
                unsetup(params, callback).catch(e => console.error(`Cannot unsetup: ${e.message}`));
                return;
            }
            console.log('Nothing deleted');
            return void callback();
        });
    }
}

/**
 * Process the `clean` CLI command: clear all objects and states
 *
 * @param options command options provided by the dispatcher
 */
function processCommandClean(options: ProcessCommandOptions): void {
    const { args, params, callback } = options;
    const yes = args[0];
if (yes !== 'yes') {
    console.log(`Command "clean" clears all Objects and States. To execute it write "${tools.appName} clean yes"`);
    return void callback(EXIT_CODES.INVALID_ARGUMENTS);
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
            restartController().catch(e => console.error(`Cannot restart controller: ${e.message}`));
            console.log(`Restarting ${tools.appName}...`);
            callback();
        });
    }
}

/**
 * Process the `touch` CLI command: touch files matching the given pattern
 *
 * @param options command options provided by the dispatcher
 */
function processCommandTouch(options: ProcessCommandOptions): void {
    const { args, params, callback } = options;
    let pattern = args[0];

    if (!pattern) {
        console.log('No file path found. Example: "touch /vis-2.0/main/*"');
        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
    }
    dbConnect(params, ({ objects }) => {
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
                async (err, arr) => {
                    if (!err && arr?.rows) {
                        const files: string[] = [];
                        for (const row of arr.rows) {
                            const rowTyped = row.value as ioBroker.AdapterObject | ioBroker.InstanceObject;
                            if (rowTyped.type !== 'adapter') {
                                continue;
                            }
                            await new Promise<void>(resolve =>
                                objects.touch(rowTyped.common.name, '*', { user: 'system.user.admin' }, err => {
                                    if (!err) {
                                        files.push(rowTyped.common.name);
                                    } else {
                                        console.warn(`Cannot touch file ${rowTyped.common.name}`);
                                    }
                                    resolve();
                                }),
                            );
                        }
                        files.sort((a, b) => a.localeCompare(b));

                        for (const file of files) {
                            console.log(`Touched ${file}`);
                        }
                        setTimeout(callback, 1_000);
                    }
                },
            );
        } else {
            const parts = pattern.split('/');
            const id = parts.shift()!;
            const path = parts.join('/');

            objects.touch(id, path, { user: 'system.user.admin' }, err => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Touched ${id}/${path}`);
                }
                setTimeout(callback, 1_000);
            });
        }
    });
}

/**
 * Process the `rm` CLI command: remove files matching the given pattern
 *
 * @param options command options provided by the dispatcher
 */
function processCommandRm(options: ProcessCommandOptions): void {
    const { args, params, callback } = options;
    let pattern = args[0];

    if (!pattern) {
        console.log('No file path found. Example: "touch /vis-2.0/main/*"');
        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
    }
    dbConnect(params, ({ objects }) => {
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
                async (err, arr) => {
                    if (!err && arr?.rows) {
                        const files: { id: string; processed: ioBroker.RmResult[] }[] = [];
                        for (const row of arr.rows) {
                            const rowTyped = row.value as ioBroker.AdapterObject | ioBroker.InstanceObject;
                            if (rowTyped.type !== 'adapter') {
                                continue;
                            }
                            await new Promise<void>(resolve =>
                                objects.rm(
                                    rowTyped.common.name,
                                    '*',
                                    { user: 'system.user.admin' },
                                    (err, processed) => {
                                        if (!err && processed) {
                                            files.push({ id: rowTyped.common.name, processed });
                                        }
                                        resolve();
                                    },
                                ),
                            );
                        }
                        files.sort((a, b) => a.id.localeCompare(b.id));

                        for (const file of files) {
                            for (const processedFile of file.processed) {
                                console.log(`Removed ${processedFile.path}/${processedFile.file}`);
                            }
                        }
                        setTimeout(callback, 1_000);
                    }
                },
            );
        } else {
            const parts = pattern.split('/');
            const id = parts.shift()!;
            const path = parts.join('/');

            objects.rm(id, path, { user: 'system.user.admin' }, (err, processed) => {
                if (err) {
                    console.error(err);
                } else {
                    if (processed) {
                        for (const file of processed) {
                            console.log(`Removed ${file.path}/${file.file}`);
                        }
                    }
                }
                setTimeout(callback, 1_000);
            });
        }
    });
}

/**
 * Process the `chmod` CLI command: change file rights for files matching the given pattern
 *
 * @param options command options provided by the dispatcher
 */
function processCommandChmod(options: ProcessCommandOptions): void {
    const { args, params, callback } = options;
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
                async (err, arr) => {
                    if (!err && arr?.rows) {
                        const files: { id: string; processed: ioBroker.ChownFileResult[] }[] = [];
                        for (const row of arr.rows) {
                            const rowTyped = row.value as ioBroker.AdapterObject | ioBroker.InstanceObject;
                            if (rowTyped.type !== 'adapter') {
                                continue;
                            }
                            await new Promise<void>(resolve =>
                                objects.chmodFile(
                                    rowTyped.common.name,
                                    '*',
                                    {
                                        user: 'system.user.admin',
                                        mode,
                                    },
                                    (err, processed) => {
                                        if (!err && processed) {
                                            files.push({ id: rowTyped.common.name, processed });
                                        }
                                        resolve();
                                    },
                                ),
                            );
                        }
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
        } else {
            const parts = pattern.split('/');
            const id = parts.shift()!;
            const path = parts.join('/');

            objects.chmodFile(id, path, { user: 'system.user.admin', mode: mode }, (err, processed) => {
                if (err) {
                    console.error(err);
                } else {
                    if (processed) {
                        const list = new List({
                            states,
                            objects,
                            processExit: callback,
                        });
                        list.showFileHeader();
                        for (const file of processed) {
                            list.showFile(id, file.path, file);
                        }
                    }
                }
                setTimeout(callback, 1_000);
            });
        }
    });
}

/**
 * Process the `chown` CLI command: change file ownership for files matching the given pattern
 *
 * @param options command options provided by the dispatcher
 */
function processCommandChown(options: ProcessCommandOptions): void {
    const { args, params, callback } = options;
    let user = args[0] as ioBroker.ObjectIDs.User;
    let group: ioBroker.ObjectIDs.Group | undefined = args[1] as ioBroker.ObjectIDs.Group;
    let pattern = args[2];

    if (!pattern) {
        pattern = group;
        group = undefined;
    }

    if (!user) {
        CLIError.requiredArgumentMissing('user', 'chown user /vis-2.0/main/*');
        return void callback(EXIT_CODES.INVALID_ARGUMENTS);
    }
    if (user.substring(12) !== 'system.user.') {
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
                async (err, arr) => {
                    if (!err && arr?.rows) {
                        const files: { id: string; processed: ioBroker.ChownFileResult[] }[] = [];
                        for (const row of arr.rows) {
                            const rowTyped = row.value as ioBroker.AdapterObject | ioBroker.InstanceObject;
                            if (rowTyped.type !== 'adapter') {
                                continue;
                            }
                            await new Promise<void>(resolve =>
                                objects.chownFile(
                                    rowTyped.common.name,
                                    '*',
                                    {
                                        user: 'system.user.admin',
                                        owner: user,
                                        ownerGroup: group,
                                    },
                                    (err, processed) => {
                                        if (!err && processed) {
                                            files.push({ id: rowTyped.common.name, processed });
                                        }
                                        resolve();
                                    },
                                ),
                            );
                        }
                        if (!files.length) {
                            console.log('Nothing found');
                            return void callback();
                        }
                        const list = new List({
                            states,
                            objects,
                            processExit: callback,
                        });
                        files.sort((a, b) => a.id.localeCompare(b.id));

                        list.showFileHeader();
                        for (let k = 0; k < files.length; k++) {
                            for (let t = 0; t < files[k].processed.length; t++) {
                                list.showFile(files[k].id, files[k].processed[t].path, files[k].processed[t]);
                            }
                        }
                        setTimeout(callback, 1_000);
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
                    owner: user,
                    ownerGroup: group,
                },
                (err, processed) => {
                    if (err) {
                        console.error(err);
                    } else {
                        // call here list
                        if (processed) {
                            const list = new List({
                                states,
                                objects,
                                processExit: callback,
                            });
                            list.showFileHeader();
                            for (const file of processed) {
                                list.showFile(id, file.path, file);
                            }
                        }
                    }
                    setTimeout(callback, 1_000);
                },
            );
        }
    });
}

/**
 * Process the `package` CLI command: create the package.json for the ioBroker installation
 *
 * @param options command options provided by the dispatcher
 */
async function processCommandPackage(options: ProcessCommandOptions): Promise<void> {
    const { callback } = options;
    // Create package.json in /opt/' + tools.appName + '
    const json = {
        name: tools.appName,
        engines: {
            node: '>=22',
        },
        optionalDependencies: {} as Record<string, string>,
        dependencies: {
            [`${tools.appName.toLowerCase()}.js-controller`]: '*',
            [`${tools.appName.toLowerCase()}.admin`]: '*',
        },
        author: 'bluefox <dogafox@gmail.com>',
    };

    try {
        const sources = await tools.getRepositoryFile();
        if (sources) {
            for (const s in sources) {
                if (Object.prototype.hasOwnProperty.call(sources, s)) {
                    if ((sources[s] as ioBroker.RepositoryJsonAdapterContent).url) {
                        if (!json.dependencies[`${tools.appName}.${s}`]) {
                            json.optionalDependencies[`${tools.appName}.${s}`] = (
                                sources[s] as ioBroker.RepositoryJsonAdapterContent
                            ).url!;
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
} catch (e) {
    console.error(`Cannot read repository file: ${e as Error}`);
    return void callback(EXIT_CODES.UNKNOWN_ERROR);
}

/**
 * Process the `set` CLI command: change settings of an adapter instance config
 *
 * @param options command options provided by the dispatcher
 */
async function processCommandSet(options: ProcessCommandOptions): Promise<void> {
    const { args, params, callback } = options;
    const instance = args[0] as `${string}.${number}`;
    if (!instance) {
        console.warn('please specify instance.');
        return void callback(EXIT_CODES.INVALID_ADAPTER_ID);
    }
    if (!instance.includes('.')) {
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
            if (process.argv[a].startsWith('--') && process.argv[a + 1] && !process.argv[a + 1].startsWith('--')) {
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
}

/**
 * Process the `file` CLI command: read, write, delete or sync files in the objects DB
 *
 * @param options command options provided by the dispatcher
 */
function processCommandFile(options: ProcessCommandOptions): void {
    const { args, params, callback } = options;
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
        console.log('or                        "file rm /vis-2.0/main/img/picture.png" to delete the file in DB');
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
                if (err) {
                    console.error(err);
                }
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

            objects
                .writeFile(adapt, destFilename, data, _err => {
                    console.log(`File "${toRead}" stored as "${destFilename}"`);
                    return void callback(EXIT_CODES.NO_ERROR);
                })
                .catch(e => console.error(`Cannot write file: ${e.message}`));
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
                if (err) {
                    console.error(err);
                } else {
                    console.log(`File "${toDelete}" was deleted`);
                }
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
                    console.log('\nThe following notifications happened during sync: ');
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
            console.log('or                        "file rm /vis-2.0/main/img/picture.png" to delete the file in DB');
            return void callback(EXIT_CODES.INVALID_ARGUMENTS);
        }
    });
}

/**
 * Process the `uuid` CLI command: print the installation UUID
 *
 * @param options command options provided by the dispatcher
 */
function processCommandUuid(options: ProcessCommandOptions): void {
    const { params, callback } = options;
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
}

/**
 * Process the `version` CLI command: show version of js-controller or a specified adapter
 *
 * @param options command options provided by the dispatcher
 */
async function processCommandVersion(options: ProcessCommandOptions): Promise<void> {
    const { params, callback } = options;
    const adapter = params.adapter as string;

    if (params.ignore) {
        try {
            const { objects } = await dbConnectAsync(false, params);
            await ignoreVersion({ adapterName: adapter, version: params.ignore as string, objects });
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

/**
 * Process the `checklog` CLI command: trigger a logging check on all hosts
 *
 * @param options command options provided by the dispatcher
 */
function processCommandCheckLog(options: ProcessCommandOptions): void {
    const { params, callback } = options;
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
                            states
                                .pushMessage(row.id, {
                                    command: 'checkLogging',
                                    message: null,
                                    from: 'console',
                                })
                                .catch(e => console.error(`Cannot push checkLogging message: ${e.message}`));
                        }
                    }
                }
                setTimeout(callback, 200);
            },
        );
    });
}

const OBJECTS_THAT_CANNOT_BE_DELETED = [
    '0_userdata.0',
    'alias.0',
    'enum.functions',
    'enum.rooms',
    SYSTEM_CONFIG_ID,
    'system.group.administrator',
    'system.group.user',
    SYSTEM_REPOSITORIES_ID,
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
        // Clean up states and return keys count
        return await delStates();
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
    // Clean up states and return the key count
    return await delStates();
}

async function unsetup(params: Record<string, string | number | boolean>, callback: ExitCodeCb): Promise<void> {
    const { objects } = await dbConnectAsync(false, params);

    objects.delObject('system.meta.uuid', err => {
        if (err) {
            console.log(`uuid cannot be deleted: ${err.message}`);
        } else {
            console.log('system.meta.uuid deleted');
        }
        objects.getObject(SYSTEM_CONFIG_ID, (_err, obj) => {
            if (obj?.common.licenseConfirmed || obj?.common.language || obj?.native?.secret) {
                obj.common.language = 'en';
                // allow with parameter --keepsecret to not delete the secret
                // This is a very specific use case for vendors and must not be described in documentation
                if (!params.keepsecret) {
                    obj.common.licenseConfirmed = false;
                    if (obj.native) {
                        delete obj.native.secret;
                    }
                }

                obj.from = `system.host.${tools.getHostName()}.cli`;
                obj.ts = new Date().getTime();

                objects.setObject(SYSTEM_CONFIG_ID, obj, err => {
                    if (err) {
                        console.log(`not found: ${err.message}`);
                        return void callback(EXIT_CODES.CANNOT_SET_OBJECT);
                    }
                    console.log(`${SYSTEM_CONFIG_ID} reset`);
                    return void callback();
                });
            } else {
                console.log(`${SYSTEM_CONFIG_ID} is OK`);
                return void callback();
            }
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
    const command = (
        _yargs.argv as {
            [x: string]: unknown;
            _: (string | number)[];
            $0: string;
        }
    )._[0];

    const args: string[] = [];

    // skip interpreter, filename and command
    for (let i = 3; i < process.argv.length; i++) {
        if (process.argv[i].startsWith('-')) {
            // on first param we have all our args
            break;
        }
        args.push(process.argv[i]);
    }

    processCommand(command, args, _yargs.argv as Record<string, string | boolean | number>, exitApplicationSave).catch(
        e => console.error(`Cannot process command: ${e.message}`),
    );
}

process.on('unhandledRejection', (e: any) => {
    console.error(`Uncaught Rejection: ${e.stack || e}`);
    return exitApplicationSave(EXIT_CODES.UNCAUGHT_EXCEPTION);
});
