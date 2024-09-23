import * as CLI from './messages.js';
import { CLICommand, type CLICommandOptions } from './cliCommand.js';
import { enumHosts, enumObjects, getObjectFrom, enumInstances } from './cliTools.js';
import { tools, EXIT_CODES } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import os from 'node:os';
import fs from 'fs-extra';

/** Command iobroker host ... */
export class CLIHost extends CLICommand {
    constructor(options: CLICommandOptions) {
        super(options);
    }

    /**
     * Executes a command
     *
     * @param args
     */
    execute(args: any[]): void {
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
     *
     * @param _args
     */
    self(_args: any[]): void {
        this.renameHost(undefined, os.hostname());
    }

    /**
     * Changes the current host's hostname to the given one
     *
     * @param args
     */
    set(args: any[]): void {
        const { callback } = this.options;

        const newHostname: string = args[1];
        if (!newHostname) {
            CLI.error.requiredArgumentMissing('newHostname', 'host set newHostname');
            return void callback(34);
        }

        this.renameHost(tools.getHostName(), newHostname);
    }

    /**
     * Removes the host with the given name
     *
     * @param args
     */
    remove(args: any[]): void {
        const { callback, dbConnect } = this.options;

        const hostname: string = args[1];
        if (!hostname) {
            CLI.error.requiredArgumentMissing('hostname', 'host remove hostname');
            return void callback(34);
        }

        const newHostname = tools.getHostName();

        if (hostname === newHostname) {
            // avoid object deletion when target host is same host
            CLI.error.dontRemoveCurrentHost(hostname);
            return void callback(35);
        }

        dbConnect(async params => {
            const { objects, isOffline } = params;

            try {
                if (!isOffline) {
                    CLI.error.cannotChangeRunningSystem();
                    return void callback(EXIT_CODES.CONTROLLER_RUNNING);
                }

                // Find the requested host object
                const hosts = await enumHosts(objects);
                const hostToDelete = hosts.find(host => host?.common.hostname === hostname);
                if (!hostToDelete) {
                    CLI.error.hostDoesNotExist(hostname);
                    return void callback(30);
                }

                // Delete it
                try {
                    await objects.delObjectAsync(hostToDelete._id);
                } catch (err) {
                    CLI.error.cannotDeleteObject(hostToDelete._id, err.message);
                    return void callback(30);
                }

                // Also delete its states
                const hostStates = await enumObjects(objects, 'state', `system.host.${hostname}.`);
                for (const state of hostStates) {
                    // Therefore delete the old one because we will recreate it under a new name
                    try {
                        await objects.delObjectAsync(state._id);
                        CLI.success.stateDeleted(state._id);
                    } catch (err) {
                        CLI.error.cannotDeleteObject(state._id, err.message);
                    }
                }

                // Move all instances from the deleted host to the current one
                const instances = await enumInstances(objects);
                const instancesToRename = instances.filter(i => i?.common.host === hostname);
                for (const instance of instancesToRename) {
                    await changeInstanceHost(objects, instance, newHostname);
                }

                // Notify the user that we are done
                CLI.success.hostDeleted(hostname);
                return void callback(EXIT_CODES.NO_ERROR);
            } catch (err) {
                CLI.error.unknown(err.message);
                return void callback(1);
            }
        });
    }

    /**
     * Renames the host with the given name to the current one (opposite of `set()`)
     *
     * @param args
     */
    rename(args: any[]): void {
        const { callback } = this.options;

        const oldHostname: string = args[0];

        if (!oldHostname) {
            CLI.error.requiredArgumentMissing('oldHostname', 'host oldHostname');
            return void callback(34);
        }

        this.renameHost(oldHostname, os.hostname());
    }

    /**
     * Renames the host with the hostname `oldHostname` to the hostname `newHostname`
     *
     * @param oldHostname The hostname to rename from or `undefined` to rename all hosts (single-host mode only!)
     * @param newHostname The hostname to rename to
     */
    renameHost(oldHostname: string | undefined, newHostname: string): void {
        const { callback, dbConnect, showHelp } = this.options;
        dbConnect(async params => {
            const { isOffline, objects } = params;

            try {
                if (!isOffline) {
                    CLI.error.cannotChangeRunningSystem();
                    return void callback(EXIT_CODES.CONTROLLER_RUNNING);
                }

                const hosts = await enumHosts(objects);
                if (hosts.length > 1 && oldHostname === undefined) {
                    // iobroker host this/self in multihost is not allowed
                    CLI.error.noHostThisInMultihost();
                    showHelp();
                    return void callback(30);
                }

                // Does another host with the target name exist?
                const hostExists = !!hosts.find(obj => obj?.common.hostname === newHostname);
                if (hostExists) {
                    // This prevents migration of instances if host already exists, but we need it to prevent
                    // multiple hosts with same name. Thus we only allow if no instances are on the host
                    // Note: this is only a heuristic, if problems occur we need a `force` flag
                    const instances = await enumInstances(objects);
                    const hasExistingInstances = !!instances.find(instance => instance?.common.host === newHostname);

                    if (hasExistingInstances) {
                        CLI.error.hostAlreadyExists(newHostname);
                        return void callback(EXIT_CODES.INSTANCE_ALREADY_EXISTS);
                    }
                }

                // Remember the new hostname in the system settings
                const configFileName = tools.getConfigFileName();
                const configData = fs.readJSONSync(configFileName);
                if (configData.system && configData.system.hostname !== newHostname) {
                    configData.system.hostname = newHostname;
                    fs.writeFileSync(configFileName, JSON.stringify(configData, null, 2), 'utf8');
                }

                // Rename the host(s)
                for (const host of hosts) {
                    // Remember the current hostname of this object because we need it later
                    const prevHostname = host.common.hostname;

                    // Rename only the hostname we're supposed to rename!
                    if (oldHostname && prevHostname !== oldHostname) {
                        continue;
                    }

                    // Rename the host object
                    // Therefore delete the old one because we will recreate it under a new name
                    try {
                        await objects.delObjectAsync(host._id);
                    } catch (err) {
                        CLI.error.cannotDeleteObject(host._id, err.message);
                        continue;
                    }

                    // Now update the object
                    Object.assign(host, {
                        _id: `system.host.${newHostname}`,
                        from: getObjectFrom(),
                        ts: Date.now(),
                    });
                    Object.assign(host.common, {
                        name: host._id,
                        hostname: newHostname,
                        address: [],
                        cmd: '',
                        native: { process: {}, os: {}, hardware: {} },
                    });
                    // And save it
                    try {
                        await objects.setObjectAsync(host._id, host);
                    } catch (err) {
                        CLI.error.cannotChangeObject(host._id, err.message);
                        continue;
                    }

                    // Rename its states
                    const hostStateObjects = await enumObjects(objects, 'state', `system.host.${prevHostname}.`);
                    const hostFolders = await enumObjects(objects, 'folder', `system.host.${prevHostname}.`);
                    for (const object of [...hostStateObjects, ...hostFolders]) {
                        // Therefore delete the old one because we will recreate it under a new name
                        try {
                            await objects.delObjectAsync(object._id);
                        } catch (err) {
                            CLI.error.cannotDeleteObject(object._id, err.message);
                            continue;
                        }

                        // Now update the object
                        Object.assign(object, {
                            _id: object._id.replace(`system.host.${prevHostname}`, `system.host.${newHostname}`),
                            from: getObjectFrom(),
                            ts: Date.now(),
                        });

                        // And save it
                        try {
                            await objects.setObjectAsync(object._id, object);
                        } catch (err) {
                            CLI.error.cannotChangeObject(object._id, err.message);
                        }
                    }

                    CLI.success.hostRenamed(prevHostname, newHostname);
                }

                // Also rename all instances
                const instances = await enumInstances(objects);
                const instancesToRename =
                    oldHostname === undefined ? instances : instances.filter(i => i.common.host === oldHostname);
                if (instancesToRename.length > 0) {
                    for (const instance of instancesToRename) {
                        // Update each instance object
                        await changeInstanceHost(objects, instance, newHostname);
                    }
                } else {
                    CLI.warn.noInstancesFoundOnHost(oldHostname);
                }
                return void callback(EXIT_CODES.NO_ERROR);
            } catch (err) {
                CLI.error.unknown(err.message);
                return void callback(1);
            }
        });
    }
}

/**
 * Changes the host an instance is running on
 *
 * @param objects The objects DB to use
 * @param instance The instance object
 * @param newHostname The new hostname the instance should be running on
 */
async function changeInstanceHost(
    objects: ObjectsClient,
    instance: ioBroker.InstanceObject,
    newHostname: string,
): Promise<void> {
    const oldInstanceHost = instance.common.host;
    instance.from = getObjectFrom();
    instance.ts = Date.now();
    instance.common.host = newHostname;
    // and save it
    try {
        await objects.setObjectAsync(instance._id, instance);
        CLI.success.instanceHostChanged(instance._id, oldInstanceHost, newHostname);
    } catch (e) {
        CLI.error.cannotChangeObject(instance._id, e.message);
        // resolve anyways, we don't want to cause errors
    }
}
