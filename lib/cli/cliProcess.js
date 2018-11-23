'use strict';
const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const tools = require('../tools.js');

module.exports = class CLIProcess extends CLICommand {

    /** @param {import('./cliCommand').CLICommandOptions} options */
    constructor(options) {
        super(options);
    }

    // These CLI commands have no subcommands, but belong together thematically
    // (start/stop/restart/status)

    /**
     * Checks if ioBroker is running or not
     * @param {any[]} args 
     */
    status(args) {
        const { callback, dbConnect } = this.options;
        const showEntireConfig = !!args[0];

        dbConnect((_objects, _states, isOffline) => {
            const config = require(tools.getConfigFileName());
            CLI.success.controllerStatus(!isOffline);

            console.log();
            if (showEntireConfig) {
                showConfig(config);
            } else {
                console.log(`Objects type: ${config.objects.type}`);
                console.log(`States  type: ${config.states.type}`);
            }
            return void callback(isOffline ? 100 : undefined);
        });
    }
}

/** Prints the config file to the console */
function showConfig(config, root) {
    root = root || [];
    const prefix = root.join('/').toUpperCase();
    for (const attr in config) {
        if (!config.hasOwnProperty(attr)) continue;
        if (attr.match(/comment$/i)) continue;
        if (typeof config[attr] === 'object') {
            const nextRoot = JSON.parse(JSON.stringify(root));
            nextRoot.push(attr);
            showConfig(config[attr], nextRoot);
        } else {
            console.log(`${prefix}${(prefix ? '/' : '') + attr}: ` + config[attr]);
        }
    }
}
