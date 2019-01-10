'use strict';
const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const { enumHosts, getObjectFrom } = require('./cliTools');
const tools = require('../tools.js');
const os = require('os');

/** Command iobroker host ... */
module.exports = class CLIHost extends CLICommand {

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
            case 'this':
            case 'self':
                return this.self(args);
            case 'set':
                return this.set(args);
            case 'remove':
                return this.remove(args);
            default:
                return this.rename(args);
        }
    }

    /**
     * When in single-host mode, changes the hostname of the host and all instances to the current one
     * @param {any[]} args
     */
    self(args) {
        this.renameHost(undefined, os.hostname());
    }

    /**
     * Changes the current host's hostname to the given one
     * @param {any[]} args
     */
    set(args) {
        const { callback, dbConnect } = this.options;

        /** @type {string} */
        const newHostname = args[1];
        if (!newHostname) {
            CLI.error.requiredArgumentMissing('newHostname', 'host set newHostname');
            return void callback(34);
        }

        this.renameHost(tools.getHostName(), newHostname);
    }

    /**
     * Removes the host with the given name
     * @param {any[]} args
     */
    remove(args) {
        const { callback, dbConnect } = this.options;

        /** @type {string} */
        const hostname = args[1];
        if (!hostname) {
            CLI.error.requiredArgumentMissing('hostname', 'host remove newHostname');
            return void callback(34);
        }

        // TODO
    }

    /**
     * Renames the host with the given name to the current one (opposite of `set()`)
     * @param {any[]} args
     */
    rename(args) {
        const { callback, dbConnect } = this.options;

        /** @type {string} */
        const oldHostname = args[1];
        if (!oldHostname) {
            CLI.error.requiredArgumentMissing('oldHostname', 'host oldHostname');
            return void callback(34);
        }
        this.renameHost(oldHostname, os.hostname());
    }

    /**
     * Renames the host with the hostname `oldHostname` to the hostname `newHostname`
     * @param {string?} oldHostname The hostname to rename from or `undefined` to rename all hosts (single-host mode only!)
     * @param {string} newHostname The hostname to rename to
     */
    renameHost(oldHostname, newHostname) {
        const { callback, dbConnect, showHelp } = this.options;
        dbConnect((objects, states, isOffline) => {
            tools.poorMansAsync(function* () {
                if (!isOffline) {
                    CLI.error.cannotChangeRunningSystem();
                    return void callback(30);
                }

                const hosts = yield enumHosts(objects);
                if (hosts.length > 1 && oldHostname === undefined) {
                    // iobroker host this/self in multihost is not allowed
                    CLI.error.noHostThisInMultihost();
                    showHelp();
                    return void callback(30);
                }

                // Does another host with the target name exist?
                if (hosts.find(obj => obj.common.hostname === newHostname)) {
                    // TODO: Is this the correct behavior?
                    CLI.error.hostAlreadyExists(newHostname);
                    return void callback(30);
                }

                for (const host of hosts) {
                    // Rename the host object
                    // Therefore delete the old one because we will recreate it under a new name
                    try {
                        yield objects.delObjectAsync(host._id);
                    } catch (err) {
                        CLI.error.cannotDeleteObject(host._id, err);
                        continue;
                    }

                    // Now update the object
                    const oldHostname = host.common.hostname;
                    Object.assign(host, {
                        _id: `system.host.${newHostname}`,
                        from: getObjectFrom(),
                        ts: Date.now()
                    });
                    Object.assign(host.common, {
                        name: host._id,
                        hostname: newHostname,
                        address: [],
                        cmd: '',
                        native: { process: {}, os: {}, hardware: {} }
                    });
                    // And save it
                    try {
                        yield objects.setObjectAsync(host._id, host);
                    } catch (err) {
                        CLI.error.cannotChangeObject(host._id, err);
                        continue;
                    }
                    CLI.success.renameHost(oldHostname, newHostname);

                    // TODO: Rename its states
                }
            })().catch(err => {
                CLI.error.unknown(err);
                return void callback(1);
            });
        });
    }
}