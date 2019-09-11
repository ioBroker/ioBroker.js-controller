'use strict';
const CLICommand = require('./cliCommand.js');
const messages = require('./messages.js');
const tools = require('../tools.js');
const fs = require('fs');

/** Command ioBroker compact ... */
module.exports = class CLICompact extends CLICommand {

    /** @param {import('./cliCommand.js').CLICommandOptions} options */
    constructor(options) {
        super(options);
        this.config = JSON.parse(fs.readFileSync(tools.getConfigFileName(), 'utf8'));
    }

    /**
     * Executes a command
     * @param {any[]} args
     */
    execute(args) {
        const { callback, showHelp } = this.options;
        const command = args[0];
        switch (command) {
            case 'status':
                return this.statusCompactModeHost();
            case 'enable':
            case 'on':
                return this.setCompactModeHost(true);
            case 'disable':
            case 'off':
                return this.setCompactModeHost(false);
            default:
                if (command && command.includes('.')) {
                    if (args[1]) {
                        switch (args[1]) {
                            case 'status':
                                return this.statusCompactModeInstance(command);
                            case 'enable':
                            case 'on':
                                return this.setCompactModeInstance(command, true, args[2]);
                            case 'disable':
                            case 'off':
                                return this.setCompactModeInstance(command, false);
                            case 'group':
                                return this.setCompactModeInstance(command, undefined, args[2]);
                        }
                    }
                }

                messages.error.unknownCommand('compact', command);
                showHelp();
                return void callback(3);
        }
    }

    /**
     * Output status of compact mode for host
     */
    statusCompactModeHost() {
        const { callback } = this.options;

        const compactMode = !!(this.config && this.config.system && this.config.system.compact);
        console.log('Compact mode for this host is currently ' + (compactMode ? 'enabled' : 'disabled'));

        return void callback();
    }

    /**
     * Set compact mode for this host
     * @param targetState target state to set for host
     */
    setCompactModeHost(targetState) {
        const { callback, dbConnect } = this.options;

        dbConnect((_objects, _states, isOffline) => {
            const currentState = !!(this.config && this.config.system && this.config.system.compact);
            console.log('Compact mode for this host is currently ' + (currentState ? 'enabled' : 'disabled'));

            if (targetState === currentState) {
                return void callback();
            }

            this.config.system = this.config.system || {};
            this.config.system.compact = targetState;
            const configFileName = tools.getConfigFileName();
            fs.writeFileSync(configFileName, JSON.stringify(this.config, null, 4), 'utf8');

            console.log();
            console.log('Compact mode for this host changed to ' + (targetState ? 'enabled' : 'disabled'));

            if (!isOffline) {
                console.log();
                console.log('Please restart ioBroker for this change to take effect!');
            }
            return void callback();
        });
    }

    /**
     * Output the compact mode status for a defined adapter instance
     * @param instance instance to otput status for
     */
    statusCompactModeInstance(instance) {
        const { callback, dbConnect } = this.options;

        dbConnect((objects, _states, _isOffline, _objectDbType, _config) => {
            if (!this.config.system || !this.config.system.compact) {
                console.log('Compact mode is disabled for this host. All compact mode settings will have no effect!');
                console.log();
            }
            objects.getObject('system.adapter.' + instance, (err, obj) => {
                if (!err && obj) {
                    console.log('Compact mode supported: ' + !!obj.common.compact);
                    console.log('Compact mode enabled:   ' + !!obj.common.runAsCompactMode);
                    console.log('Compact group:          ' + (obj.common.compactGroup !== undefined ? obj.common.compactGroup : 1));
                    return void callback();
                } else {
                    messages.error.invalidInstance(instance);
                    return void callback(24);
                }
            });
        });
    }

    setCompactModeInstance(instance, targetState, groupId) {
        const { callback, dbConnect } = this.options;

        dbConnect((objects, _states, _isOffline, _objectDbType, _config) => {
            if (!this.config.system || !this.config.system.compact) {
                console.log('Compact mode is disabled on this host. This setting will have no effect!');
                console.log();
            }
            objects.getObject('system.adapter.' + instance, (err, obj) => {
                if (!err && obj) {
                    console.log('Compact mode supported: ' + !!obj.common.compact);
                    let newRunAsCompactMode;
                    if (targetState !== undefined && targetState !== !!obj.common.runAsCompactMode) {
                        newRunAsCompactMode = targetState;
                    }
                    let newCompactGroup;
                    if (obj.common.compactGroup === undefined) {
                        obj.common.compactGroup = 1;
                        newCompactGroup = obj.common.compactGroup;
                    }
                    if (groupId !== undefined) {
                        groupId = parseInt(groupId, 10);
                        if (!isNaN(groupId) && groupId !== obj.common.compactGroup) {
                            newCompactGroup = groupId;
                        }
                    }
                    console.log('Compact mode enabled:   ' + !!obj.common.runAsCompactMode + (newRunAsCompactMode !== undefined ? ' --> ' + newRunAsCompactMode : ''));
                    console.log('Compact group:          ' + obj.common.compactGroup + (newCompactGroup !== undefined ? ' --> ' + newCompactGroup : ''));
                    if (newRunAsCompactMode !== undefined || newCompactGroup !== undefined) {
                        if (newCompactGroup !== undefined) {
                            obj.common.compactGroup = newCompactGroup;
                        }
                        if (newRunAsCompactMode !== undefined) {
                            obj.common.runAsCompactMode = newRunAsCompactMode;
                        }

                        obj.from = 'system.host.' + tools.getHostName() + '.cli';
                        obj.ts = new Date().getTime();
                        objects.setObject('system.adapter.' + instance, obj, (err) => {
                            if (err) console.log(err);
                            console.log('Instance settings for "' + instance + '" are changed.');
                            callback();
                        });
                    } else {
                        console.log('No settings changed.');
                        return void callback();
                    }
                } else {
                    messages.error.invalidInstance(instance);
                    return void callback(24);
                }
            });
        });
    }

};