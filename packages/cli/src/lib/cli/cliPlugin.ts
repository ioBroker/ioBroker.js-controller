import * as CLI from './messages.js';
import { type CLICommandOptions, CLICommand } from './cliCommand.js';
import { getObjectFrom } from './cliTools.js';
import { tools } from '@iobroker/js-controller-common';
import fs from 'fs-extra';
import path from 'node:path';
import { createRequire } from 'node:module';

// eslint-disable-next-line unicorn/prefer-module
const require = createRequire(import.meta.url || `file://${__filename}`);

const controllerIoPackPath = require.resolve('iobroker.js-controller/io-package.json');

interface CLIPluginOptions extends CLICommandOptions {
    /** If plugin is scoped on adapter */
    adapter?: string;
    /** If plugin is scoped on instance */
    instance?: string;
}

/** Command iobroker plugin <enable/disable/status> <pluginname> [--host this/hostname] ... */
export class CLIPlugin extends CLICommand<CLIPluginOptions> {
    /** @param options the cli command options */
    constructor(options: CLIPluginOptions) {
        super(options);
    }

    /**
     * Executes a command
     *
     * @param args parsed cli args
     */
    execute(args: any[]): void {
        const { callback, showHelp } = this.options;
        const command = args[0];

        switch (command) {
            case 'on':
            case 'enable':
                return this.set(args, true);
            case 'off':
            case 'disable':
                return this.set(args, false);
            case 'status':
                return this.status(args);
            default:
                CLI.error.unknownCommand('plugin', command);
                showHelp();
                return void callback(3);
        }
    }

    /**
     * Enables or disables the given plugin
     *
     * @param args the parsed CLI args
     * @param enabled if plugin should be enabled
     */
    set(args: any[], enabled: boolean): void {
        const { callback, dbConnect } = this.options;
        const pluginName: string = args[1];
        if (!pluginName) {
            CLI.error.requiredArgumentMissing('pluginName', 'plugin enable <pluginname>');
            return void callback(34);
        }

        let hostname: string;
        let instance: string;

        if (this.options.adapter || this.options.instance) {
            instance = (this.options.adapter || this.options.instance) as string;
            // default to instance 0
            if (!/\.\d+$/.test(instance)) {
                instance += '.0';
            }
        } else {
            // Use host if no adapter was specified and fallback to the current one
            hostname = this.options.host;
            if (!hostname || hostname === 'this') {
                hostname = tools.getHostName();
            }
        }

        dbConnect(async params => {
            const { states, objects, config: iobrokerJson } = params;

            try {
                // Check if the host or instance exists
                let objectNamespace: string;
                if (hostname) {
                    objectNamespace = `system.host.${hostname}`;
                    const hostObject = await objects.getObject(objectNamespace);
                    if (!hostObject) {
                        CLI.error.hostDoesNotExist(hostname);
                        return void callback(30);
                    }
                } else {
                    objectNamespace = `system.adapter.${instance}`;
                    const instanceObject = await objects.getObject(objectNamespace);
                    if (!instanceObject) {
                        CLI.error.invalidInstance(instance);
                        return void callback(30);
                    }
                }

                // Check if the plugin is defined
                if (!pluginExists(pluginName, iobrokerJson, instance)) {
                    CLI.error.pluginNotDefined(pluginName, hostname, instance);
                    return void callback(30);
                }

                // Create the plugin state if it does not exist
                const pluginsFolderId = `${objectNamespace}.plugins`;
                if (!(await objects.getObjectAsync(pluginsFolderId))) {
                    await objects.setObject(pluginsFolderId, {
                        type: 'folder',
                        common: {
                            name: `${hostname ? 'host' : 'instance'}: plugin states`,
                        },
                        native: {},
                    });
                }
                const pluginFolderId = `${objectNamespace}.plugins.${pluginName}`;
                if (!(await objects.getObjectAsync(pluginFolderId))) {
                    await objects.setObject(pluginFolderId, {
                        type: 'folder',
                        common: {
                            name: `${pluginName}: plugin states`,
                        },
                        native: {},
                    });
                }
                const pluginEnabledId = `${pluginFolderId}.enabled`;
                if (!(await objects.getObjectAsync(pluginEnabledId))) {
                    await objects.setObject(pluginEnabledId, {
                        type: 'state',
                        common: {
                            name: 'Plugin enabled',
                            type: 'boolean',
                            read: true,
                            write: true,
                            role: 'value',
                        },
                        native: {},
                    });
                }

                // Update the state
                await states.setStateAsync(pluginEnabledId, {
                    val: enabled,
                    from: getObjectFrom(),
                });

                // Notify the user that we are done
                CLI.success.pluginEnabledOrDisabled(pluginName, hostname, instance, enabled);
                return void callback();
            } catch (err) {
                CLI.error.unknown(err.message);
                return void callback(1);
            }
        });
    }

    /**
     * Prints the status of the given plugin
     *
     * @param args the parsed CLI arguments
     */
    status(args: any[]): void {
        const { callback, dbConnect } = this.options;
        const pluginName = args[1];
        if (!pluginName) {
            CLI.error.requiredArgumentMissing('pluginName', 'plugin status <pluginname>');
            return void callback(34);
        }

        let hostname: string;
        let instance: string;

        if (this.options.adapter || this.options.instance) {
            instance = (this.options.adapter || this.options.instance) as string;
            // default to instance 0
            if (!/\.\d+$/.test(instance)) {
                instance += '.0';
            }
        } else {
            // Use host if no adapter was specified and fallback to the current one
            hostname = this.options.host;
            if (!hostname || hostname === 'this') {
                hostname = tools.getHostName();
            }
        }

        dbConnect(async params => {
            const { states, objects, config: iobrokerJson } = params;

            try {
                // Check if the host or instance exists
                let objectNamespace: string;
                if (hostname) {
                    objectNamespace = `system.host.${hostname}`;
                    const hostObject = await objects.getObject(objectNamespace);
                    if (!hostObject) {
                        CLI.error.hostDoesNotExist(hostname);
                        return void callback(30);
                    }
                } else {
                    objectNamespace = `system.adapter.${instance}`;
                    const instanceObject = await objects.getObject(objectNamespace);
                    if (!instanceObject) {
                        CLI.error.invalidInstance(instance);
                        return void callback(30);
                    }
                }

                // Check if the plugin is defined
                if (!pluginExists(pluginName, iobrokerJson, instance)) {
                    CLI.error.pluginNotDefined(pluginName, hostname, instance);
                    return void callback(30);
                }

                const pluginEnabledId = `${objectNamespace}.plugins.${pluginName}.enabled`;

                // Read the state
                try {
                    const val = (await states.getStateAsync(pluginEnabledId))?.val;

                    if (typeof val === 'boolean') {
                        CLI.success.pluginStatus(pluginName, hostname, instance, val);
                        return void callback();
                    }
                } catch {
                    /* ignore */
                }

                // If the state could not be read or had no value, fall back to the configuration
                const enabled = pluginEnabled(
                    pluginName,
                    instance,
                    await objects.getObjectAsync('system.config'),
                    iobrokerJson,
                );
                CLI.success.pluginStatus(pluginName, hostname, instance, enabled);
                return void callback();
            } catch (err) {
                CLI.error.unknown(err.message);
                return void callback(1);
            }
        });
    }
}

/**
 * Checks if a plugin exists and can be configured
 *
 * @param pluginName
 * @param iobrokerJson The contents of iobroker.json
 * @param [adapter] (optional) - If passed, the adapter configuration will be searched for defined plugins instead of js-controller
 */
function pluginExists(pluginName: string, iobrokerJson?: ioBroker.IoBrokerJson, adapter?: string): boolean {
    // 1. check if the plugin is defined in io-package.json
    try {
        const ioPackPath = adapter ? path.join(tools.getAdapterDir(adapter)!, 'io-package.json') : controllerIoPackPath;
        const ioPack = fs.readJSONSync(ioPackPath, { encoding: 'utf8' });
        if (ioPack?.common?.plugins && pluginName in ioPack.common.plugins) {
            return true;
        }
    } catch {
        /* ignore */
    }

    // 2. check if the plugin is defined in iobroker.json
    return !!(iobrokerJson?.plugins && pluginName in iobrokerJson.plugins);
}

/**
 * Checks if a plugin exists and can be configured
 *
 * @param pluginName name of the plugin, e.g. `sentry`
 * @param adapter If defined, the adapter configuration will be searched for defined plugins instead of js-controller
 * @param systemConfig The system.config object
 * @param iobrokerJson The contents of iobroker.json
 */
function pluginEnabled(
    pluginName: string,
    adapter?: string,
    systemConfig?: ioBroker.SystemConfigObject | null,
    iobrokerJson?: ioBroker.IoBrokerJson,
): boolean {
    // 1. check if diagnostics are disabled in ioBroker
    if (systemConfig?.common?.diag === 'none') {
        return false;
    }

    // 2. check if the plugin is disabled in io-package.json
    try {
        const ioPackPath = adapter ? path.join(tools.getAdapterDir(adapter)!, 'io-package.json') : controllerIoPackPath;
        const ioPack = fs.readJSONSync(ioPackPath, { encoding: 'utf8' });
        if (
            ioPack?.common?.plugins &&
            pluginName in ioPack.common.plugins &&
            ioPack.common.plugins[pluginName].enabled === false
        ) {
            return false;
        }
    } catch {
        /* ignore */
    }

    // 3. check if the plugin is disabled in iobroker.json
    if (
        iobrokerJson?.plugins &&
        pluginName in iobrokerJson.plugins &&
        iobrokerJson.plugins[pluginName].enabled === false
    ) {
        return false;
    }

    // default: enabled
    return true;
}
