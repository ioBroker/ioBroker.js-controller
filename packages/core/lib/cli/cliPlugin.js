'use strict';
const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const { getObjectFrom } = require('./cliTools');
const tools = require('../tools.js');
const fs = require('fs');
const path = require('path');

const controllerIoPackPath = path.join(__dirname, '../../io-package.json');

/** Command iobroker plugin <enable/disable/status> <pluginname> [--host this/hostname] ... */
module.exports = class CLIPlugin extends CLICommand {
    /** @param {import('./cliCommand').CLICommandOptions} options */
    constructor(options) {
        super(options);
    }

    /**
     * Executes a command
     * @param {any[]} args
     */
    execute(args) {
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
     * @param {any[]} args
     * @param {boolean} enabled
     */
    set(args, enabled) {
        const { callback, dbConnect } = this.options;
        /** @type {string} */
        const pluginName = args[1];
        if (!pluginName) {
            CLI.error.requiredArgumentMissing(
                'pluginName',
                'plugin enable <pluginname>'
            );
            return void callback(34);
        }

        /** @type {string | undefined} */
        let hostname;
        /** @type {string | undefined} */
        let instance;

        if (this.options.adapter || this.options.instance) {
            instance = this.options.adapter || this.options.instance;
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

        dbConnect(
            async (objects, states, _isOffline, _dbType, iobrokerJson) => {
                try {
                    // Check if the host or instance exists
                    /** @type {string} */ let objectNamespace;
                    if (hostname) {
                        objectNamespace = `system.host.${hostname}`;
                        const hostObject = await objects.getObject(
                            objectNamespace
                        );
                        if (!hostObject) {
                            CLI.error.hostDoesNotExist(hostname);
                            return void callback(30);
                        }
                    } else {
                        objectNamespace = `system.adapter.${instance}`;
                        const instanceObject = await objects.getObject(
                            objectNamespace
                        );
                        if (!instanceObject) {
                            CLI.error.invalidInstance(instance);
                            return void callback(30);
                        }
                    }

                    // Check if the plugin is defined
                    if (!pluginExists(pluginName, iobrokerJson, instance)) {
                        CLI.error.pluginNotDefined(
                            pluginName,
                            hostname,
                            instance
                        );
                        return void callback(30);
                    }

                    // Create the plugin state if it does not exist
                    const pluginsFolderId = `${objectNamespace}.plugins`;
                    if (!(await objects.getObjectAsync(pluginsFolderId))) {
                        await objects.setObject(pluginsFolderId, {
                            type: 'folder',
                            common: {
                                name: `${
                                    hostname ? 'host' : 'instance'
                                }: plugin states`
                            },
                            native: {}
                        });
                    }
                    const pluginFolderId = `${objectNamespace}.plugins.${pluginName}`;
                    if (!(await objects.getObjectAsync(pluginFolderId))) {
                        await objects.setObject(pluginFolderId, {
                            type: 'folder',
                            common: {
                                name: `${pluginName}: plugin states`
                            },
                            native: {}
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
                                role: 'value'
                            },
                            native: {}
                        });
                    }

                    // Update the state
                    await states.setStateAsync(pluginEnabledId, {
                        val: enabled,
                        from: getObjectFrom()
                    });

                    // Notify the user that we are done
                    CLI.success.pluginEnabledOrDisabled(
                        pluginName,
                        hostname,
                        instance,
                        enabled
                    );
                    return void callback();
                } catch (err) {
                    CLI.error.unknown(err.message);
                    return void callback(1);
                }
            }
        );
    }

    /**
     * Prints the status of the given plugin
     * @param {any[]} args
     */
    status(args) {
        const { callback, dbConnect } = this.options;
        /** @type {string} */
        const pluginName = args[1];
        if (!pluginName) {
            CLI.error.requiredArgumentMissing(
                'pluginName',
                'plugin status <pluginname>'
            );
            return void callback(34);
        }

        /** @type {string | undefined} */
        let hostname;
        /** @type {string | undefined} */
        let instance;

        if (this.options.adapter || this.options.instance) {
            instance = this.options.adapter || this.options.instance;
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

        dbConnect(
            async (objects, states, _isOffline, _dbType, iobrokerJson) => {
                try {
                    // Check if the host or instance exists
                    /** @type {string} */ let objectNamespace;
                    if (hostname) {
                        objectNamespace = `system.host.${hostname}`;
                        const hostObject = await objects.getObject(
                            objectNamespace
                        );
                        if (!hostObject) {
                            CLI.error.hostDoesNotExist(hostname);
                            return void callback(30);
                        }
                    } else {
                        objectNamespace = `system.adapter.${instance}`;
                        const instanceObject = await objects.getObject(
                            objectNamespace
                        );
                        if (!instanceObject) {
                            CLI.error.invalidInstance(instance);
                            return void callback(30);
                        }
                    }

                    // Check if the plugin is defined
                    if (!pluginExists(pluginName, iobrokerJson, instance)) {
                        CLI.error.pluginNotDefined(
                            pluginName,
                            hostname,
                            instance
                        );
                        return void callback(30);
                    }

                    const pluginEnabledId = `${objectNamespace}.plugins.${pluginName}.enabled`;

                    // Read the state
                    try {
                        const { val } = await states.getStateAsync(pluginEnabledId);

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
                        iobrokerJson
                    );
                    CLI.success.pluginStatus(
                        pluginName,
                        hostname,
                        instance,
                        enabled
                    );
                    return void callback();
                } catch (err) {
                    CLI.error.unknown(err.message);
                    return void callback(1);
                }
            }
        );
    }
};

/**
 * Checks if a plugin exists and can be configured
 * @param {string} pluginName
 * @param {Record<string, any>} iobrokerJson The contents of iobroker.json
 * @param {string} [adapter] (optional) - If passed, the adapter configuration will be searched for defined plugins instead of js-controller
 */
function pluginExists(pluginName, iobrokerJson, adapter) {
    // 1. check if the plugin is defined in io-package.json
    // TODO: replace this with fs-extra methods #799
    try {
        const ioPackPath = adapter
            ? path.join(tools.getAdapterDir(adapter), 'io-package.json')
            : controllerIoPackPath;
        const ioPack = JSON.parse(fs.readFileSync(ioPackPath, 'utf8'));
        if (
            ioPack &&
            ioPack.common &&
            ioPack.common.plugins &&
            pluginName in ioPack.common.plugins
        ) {
            return true;
        }
    } catch {
        /* ignore */
    }

    // 2. check if the plugin is defined in iobroker.json
    return (
        iobrokerJson &&
        iobrokerJson.plugins &&
        pluginName in iobrokerJson.plugins
    );
}

/**
 * Checks if a plugin exists and can be configured
 * @param {string} pluginName
 * @param {string | undefined} adapter If defined, the adapter configuration will be searched for defined plugins instead of js-controller
 * @param {Record<string, any>} systemConfig The system.config object
 * @param {Record<string, any>} iobrokerJson The contents of iobroker.json
 */
function pluginEnabled(pluginName, adapter, systemConfig, iobrokerJson) {
    // 1. check if diagnostics are disabled in ioBroker
    if (
        systemConfig &&
        systemConfig.common &&
        systemConfig.common.diag === 'none'
    ) {
        return false;
    }

    // 2. check if the plugin is disabled in io-package.json
    // TODO: replace this with fs-extra methods #799
    try {
        const ioPackPath = adapter
            ? path.join(tools.getAdapterDir(adapter), 'io-package.json')
            : controllerIoPackPath;
        const ioPack = JSON.parse(fs.readFileSync(ioPackPath, 'utf8'));
        if (
            ioPack &&
            ioPack.common &&
            ioPack.common.plugins &&
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
        iobrokerJson &&
        iobrokerJson.plugins &&
        pluginName in iobrokerJson.plugins &&
        iobrokerJson.plugins[pluginName].enabled === false
    ) {
        return false;
    }

    // default: enabled
    return true;
}
