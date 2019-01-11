'use strict';
const CLI = require('./messages.js');
const CLICommand = require('./cliCommand.js');
const { enumHosts, enumObjects, getObjectFrom, enumInstances } = require('./cliTools');
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
     * @param {any[]} _args
     */
    self(_args) {
        this.renameHost(undefined, os.hostname());
    }

    /**
     * Changes the current host's hostname to the given one
     * @param {any[]} args
     */
    set(args) {
        const { callback } = this.options;

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
        const { callback } = this.options;

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
        const { callback } = this.options;

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

                // Rename the host(s)
                for (const host of hosts) {
                    // Remember the current hostname of this object because we need it later
                    const prevHostname = host.common.hostname;

                    // Rename only the hostname we're supposed to rename!
                    if (oldHostname && prevHostname !== oldHostname) continue;

                    // Rename the host object
                    // Therefore delete the old one because we will recreate it under a new name
                    try {
                        yield objects.delObjectAsync(host._id);
                    } catch (err) {
                        CLI.error.cannotDeleteObject(host._id, err);
                        continue;
                    }

                    // Now update the object
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

                    // Rename its states
                    const hostStates = yield enumObjects(objects, 'state', `system.host.${prevHostname}.`);
                    for (const state of hostStates) {
                        // Therefore delete the old one because we will recreate it under a new name
                        try {
                            yield objects.delObjectAsync(state._id);
                        } catch (err) {
                            CLI.error.cannotDeleteObject(state._id, err);
                            continue;
                        }
                        // Now update the object

                        Object.assign(state, {
                            _id: state._id.replace(`system.host.${prevHostname}`, `system.host.${newHostname}`),
                            from: getObjectFrom(),
                            ts: Date.now()
                        });
                        // And save it
                        try {
                            yield objects.setObjectAsync(state._id, state);
                        } catch (err) {
                            CLI.error.cannotChangeObject(state._id, err);
                            continue;
                        }
                    }

                    CLI.success.renameHost(prevHostname, newHostname);
                }

                // Also rename all instances
                const instances = yield enumInstances(objects);
                const instancesToRename = oldHostname === undefined ? instances
                    : instances.filter(i => i.common.host = oldHostname)
                    ;
                if (instancesToRename.length > 0) {
                    for (const instance of instancesToRename) {
                        // Update each instance object
                        const oldInstanceHost = instance.common.host;
                        instance.from = getObjectFrom();
                        instance.ts = Date.now();
                        instance.common.host = newHostname;
                        // and save it
                        try {
                            yield objects.setObjectAsync(instance._id, instance);
                        } catch (err) {
                            CLI.error.cannotChangeObject(instance._id, err);
                            continue;
                        }
                        CLI.success.instanceHostChanged(instance._id, oldInstanceHost, newHostname);
                    }
                } else {
                    CLI.warn.noInstancesFoundOnHost(oldHostname);
                }
                return void callback();

            })().catch(err => {
                CLI.error.unknown(err);
                return void callback(1);
            });
        });
    }
};