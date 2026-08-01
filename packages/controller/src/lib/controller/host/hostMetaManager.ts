import fs from 'fs-extra';
import { isDeepStrictEqual } from 'node:util';
import { setTimeout as wait } from 'node:timers/promises';
import { tools } from '@iobroker/js-controller-common';
import {
    HIGHEST_UNICODE_SYMBOL,
    SYSTEM_ADAPTER_PREFIX,
    SYSTEM_HOST_PREFIX,
} from '@iobroker/js-controller-common-db/constants';
import { getHostObject } from '@iobroker/js-controller-common-db/tools';
import { getHostObjects } from '@/lib/objects.js';
import { COMPACT_GROUP_OBJECT_PREFIX, VENDOR_BOOTSTRAP_FILE, VENDOR_FILE } from '@/lib/controller/constants.js';
import type { Controller } from '@/lib/controller/controller.js';

/**
 * Creates and maintains the host object and all states which belong to this host
 */
export class HostMetaManager {
    /**
     * @param controller The controller this host meta manager belongs to
     */
    constructor(private readonly controller: Controller) {}

    /**
     * Reassign the given instance objects from one host to another
     *
     * @param objs The instance objects to reassign
     * @param oldHostname The hostname the instances currently belong to
     * @param newHostname The hostname the instances should be moved to
     */
    private async changeHost(
        objs: ioBroker.GetObjectViewItem<ioBroker.InstanceObject>[],
        oldHostname: string,
        newHostname: string,
    ): Promise<void> {
        const { objects, logger, hostLogPrefix } = this.controller;

        for (const row of objs) {
            if (row?.value?.common.host === oldHostname) {
                const obj = row.value;
                obj.common.host = newHostname;
                logger.info(
                    `${hostLogPrefix} Reassign instance ${obj._id.substring(
                        SYSTEM_ADAPTER_PREFIX.length,
                    )} from ${oldHostname} to ${newHostname}`,
                );
                obj.from = `system.host.${tools.getHostName()}`;
                obj.ts = Date.now();

                try {
                    await objects!.setObject(obj._id, obj);
                } catch (e) {
                    logger.error(`Error changing host of ${obj._id}: ${e.message}`);
                }
            }
        }
    }

    /**
     * Delete the given objects from the objects database
     *
     * @param objs The objects to delete
     */
    async delObjects(objs: ioBroker.GetObjectViewItem<ioBroker.AnyObject>[]): Promise<void> {
        const { objects, states, logger, hostLogPrefix } = this.controller;

        for (const row of objs) {
            if (row?.id) {
                logger.info(`${hostLogPrefix} Delete state "${row.id}"`);
                try {
                    if (row.value && row.value.type === 'state') {
                        await states!.delState(row.id);
                        await objects!.delObject(row.id);
                    } else {
                        await objects!.delObject(row.id);
                    }
                } catch {
                    // ignore
                }
            }
        }
    }

    /**
     * Extends objects, optionally you can provide a state at each task (does not throw)
     *
     * @param tasks The objects to extend, each optionally carrying a state to set
     */
    async extendObjects(tasks: Record<string, any>[]): Promise<void> {
        const { objects, states } = this.controller;

        for (const task of tasks) {
            const state = task.state;
            if (state !== undefined) {
                delete task.state;
            }

            try {
                await objects!.extendObject(task._id, task);
                // if extend throws, we don't want to set corresponding state
                if (state) {
                    await states!.setState(task._id, state);
                }
            } catch {
                // ignore
            }
        }
    }

    /**
     * try to check host in objects
     * <p>
     * This function tries to find all hosts in the objects and if
     * only one host found and it is not actual host, change the
     * host name to new one.
     * <p>
     */
    async checkHost(): Promise<void> {
        const { objects, logger, hostLogPrefix, hostname, isCompactGroupController } = this.controller;

        const objectData = objects!.getStatus();
        // only file master host controller needs to check/fix the host assignments from the instances
        // for redis it is currently not possible to detect a single host system with a changed hostname for sure!
        if (isCompactGroupController || !objectData.server) {
            return;
        }

        let hostDoc;

        try {
            hostDoc = await objects!.getObjectViewAsync('system', 'host', {
                startkey: SYSTEM_HOST_PREFIX,
                endkey: `${SYSTEM_HOST_PREFIX}${HIGHEST_UNICODE_SYMBOL}`,
            });
        } catch {
            // ignore
        }

        if (hostDoc?.rows.length === 1 && hostDoc?.rows[0].value.common.name !== hostname) {
            const oldHostname = hostDoc.rows[0].value.common.name;
            const oldId = hostDoc.rows[0].value._id;

            let instanceDoc;

            try {
                // find out all instances and rewrite it to actual hostname
                instanceDoc = await objects!.getObjectViewAsync('system', 'instance', {
                    startkey: SYSTEM_ADAPTER_PREFIX,
                    endkey: `${SYSTEM_ADAPTER_PREFIX}${HIGHEST_UNICODE_SYMBOL}`,
                });
            } catch (e) {
                if (e.message.startsWith('Cannot find ')) {
                    return;
                }
            }

            if (!instanceDoc?.rows || instanceDoc.rows.length === 0) {
                logger.info(`${hostLogPrefix} no instances found`);
                // no instances found
                return;
            }
            // reassign all instances
            await this.changeHost(instanceDoc.rows, oldHostname, hostname);
            logger.info(`${hostLogPrefix} Delete host ${oldId}`);

            try {
                // delete host object
                await objects!.delObjectAsync(oldId);
            } catch {
                // ignore
            }

            try {
                // delete all hosts states
                const newHostDoc = await objects!.getObjectViewAsync('system', 'state', {
                    startkey: `${SYSTEM_HOST_PREFIX}${oldHostname}.`,
                    endkey: `${SYSTEM_HOST_PREFIX}${oldHostname}.${HIGHEST_UNICODE_SYMBOL}`,
                    include_docs: true,
                });

                await this.delObjects(newHostDoc.rows);
                return;
            } catch {
                // ignore
            }
        }
    }

    /**
     * Create the host meta data like host objects and states
     */
    async setMeta(): Promise<void> {
        const {
            objects,
            config,
            logger,
            hostObjectPrefix,
            hostLogPrefix,
            hostname,
            compactGroup,
            isCompactGroupController,
            pluginHandler,
            notificationHandler,
            ips,
        } = this.controller;

        const id = hostObjectPrefix;

        const oldObj = await objects!.getObject(id);
        let newObj: ioBroker.HostObject | ioBroker.FolderObject;

        if (isCompactGroupController) {
            newObj = {
                _id: id,
                type: 'folder',
                common: {
                    name: hostname + COMPACT_GROUP_OBJECT_PREFIX + compactGroup,
                    cmd: `${process.argv[0]} ${`${process.execArgv.join(' ')} `.replace(
                        /--inspect-brk=\d+ /,
                        '',
                    )}${process.argv.slice(1).join(' ')}`,
                    hostname: hostname,
                    address: tools.findIPs(),
                },
                native: {},
            };
        } else {
            newObj = getHostObject(oldObj);
        }

        if (oldObj) {
            // @ts-expect-error todo: can be removed?
            delete oldObj.cmd;
            delete oldObj.from;
            delete oldObj.ts;
            delete oldObj.acl;
        }

        if (!oldObj || !isDeepStrictEqual(newObj, oldObj)) {
            newObj.from = hostObjectPrefix;
            newObj.ts = Date.now();
            try {
                // @ts-expect-error TODO: for compact controller we are setting a folder object to a system.host.XY id
                await objects!.setObject(id, newObj);
                await ips.setIPs(newObj.common.address);
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot write host object: ${e.message}`);
            }
        } else {
            await ips.setIPs(newObj.common.address);
        }

        config.system.checkDiskInterval =
            config.system.checkDiskInterval !== 0 ? Math.round(config.system.checkDiskInterval) || 300_000 : 0;

        const tasks = getHostObjects({
            id,
            hostname,
            config,
            isCompactGroupController,
        });

        // delete obsolete states and create new ones
        let doc: { rows: ioBroker.GetObjectViewItem<ioBroker.StateObject>[] } | undefined;

        try {
            doc = await objects!.getObjectViewAsync('system', 'state', {
                startkey: `${hostObjectPrefix}.`,
                endkey: `${hostObjectPrefix}.${HIGHEST_UNICODE_SYMBOL}`,
                include_docs: true,
            });
        } catch (e) {
            logger?.error(
                `${hostLogPrefix} Could not collect ${hostObjectPrefix} states to check for obsolete states: ${e.message}`,
            );
        }

        if (doc?.rows) {
            // identify existing states for deletion, because they are not in the new tasks-list
            let thisHostStates = doc.rows;
            if (!isCompactGroupController) {
                thisHostStates = doc.rows.filter(
                    out1 => !out1.id.includes(hostObjectPrefix + COMPACT_GROUP_OBJECT_PREFIX),
                );
            }
            const pluginStatesIndex = `${hostObjectPrefix}.plugins.`.length;
            const notificationStatesIndex = `${hostObjectPrefix}.notifications.`.length;
            const toDelete = thisHostStates.filter(out1 => {
                const found = tasks.find(out2 => out1.id === out2._id);
                if (found === undefined) {
                    if (out1.id.startsWith(`${hostObjectPrefix}.plugins.`)) {
                        let nameEndIndex: number | undefined = out1.id.indexOf('.', pluginStatesIndex + 1);
                        if (nameEndIndex === -1) {
                            nameEndIndex = undefined;
                        }
                        return !pluginHandler.pluginExists(out1.id.substring(pluginStatesIndex, nameEndIndex));
                    } else if (out1.id.startsWith(`${hostObjectPrefix}.notifications.`)) {
                        // notification states are allowed to exist if their scope still exists
                        return !notificationHandler.scopeExists(out1.id.substring(notificationStatesIndex));
                    }
                }

                return found === undefined;
            });

            if (toDelete && toDelete.length > 0) {
                await this.delObjects(toDelete);
                logger?.info(`${hostLogPrefix} Some obsolete host states deleted.`);
            }
        }

        await this.extendObjects(tasks);

        // create UUID if not exist
        if (!isCompactGroupController) {
            await this.createUuidAndApplyVendor();
        }
    }

    /**
     * Create the UUID of this installation if it does not exist yet and apply a potential vendor file
     */
    private async createUuidAndApplyVendor(): Promise<void> {
        const { objects, logger, hostLogPrefix } = this.controller;

        const uuid = await tools.createUuid(objects);
        if (uuid) {
            logger?.info(`${hostLogPrefix} Created UUID: ${uuid}`);
        }

        if (!fs.existsSync(VENDOR_BOOTSTRAP_FILE)) {
            return;
        }

        logger?.info(`${hostLogPrefix} Detected vendor file: ${fs.existsSync(VENDOR_BOOTSTRAP_FILE)}`);
        let restartRequired = false;

        try {
            const startScript: {
                password?: string;
                javascriptPassword?: string;
            } = fs.readJSONSync(VENDOR_BOOTSTRAP_FILE);

            if (startScript.password) {
                const { Vendor } = await import('@iobroker/js-controller-cli');
                const vendor = new Vendor({ objects: objects! });

                logger?.info(`${hostLogPrefix} Apply vendor file: ${VENDOR_FILE}`);
                try {
                    restartRequired = await vendor.checkVendor(
                        VENDOR_FILE,
                        startScript.password,
                        startScript.javascriptPassword,
                        logger,
                    );
                    logger?.info(`${hostLogPrefix} Vendor information synchronised.`);
                    try {
                        if (fs.existsSync(VENDOR_BOOTSTRAP_FILE)) {
                            fs.unlinkSync(VENDOR_BOOTSTRAP_FILE);
                        }
                    } catch (e) {
                        logger?.error(`${hostLogPrefix} Cannot delete file ${VENDOR_BOOTSTRAP_FILE}: ${e.message}`);
                    }
                } catch (e) {
                    logger?.error(`${hostLogPrefix} Cannot update vendor information: ${e.message}`);
                    try {
                        fs.existsSync(VENDOR_BOOTSTRAP_FILE) && fs.unlinkSync(VENDOR_BOOTSTRAP_FILE);
                    } catch (e) {
                        logger?.error(`${hostLogPrefix} Cannot delete file ${VENDOR_BOOTSTRAP_FILE}: ${e.message}`);
                    }
                }
            }
        } catch (e) {
            logger?.error(`${hostLogPrefix} Cannot parse ${VENDOR_BOOTSTRAP_FILE}: ${e.message}`);
            try {
                fs.existsSync(VENDOR_BOOTSTRAP_FILE) && fs.unlinkSync(VENDOR_BOOTSTRAP_FILE);
            } catch (e) {
                logger?.error(`${hostLogPrefix} Cannot delete file ${VENDOR_BOOTSTRAP_FILE}: ${e.message}`);
            }
        }

        if (restartRequired) {
            // terminate ioBroker to restart the controller as UUID probably changed
            logger.info(`${hostLogPrefix} Restart js-controller because vendor information updated`);
            await wait(200);
            await this.controller.restartSelf();
        }
    }
}
