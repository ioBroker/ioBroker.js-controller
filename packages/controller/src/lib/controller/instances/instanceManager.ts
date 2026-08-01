import fs from 'fs-extra';
import deepClone from 'deep-clone';
import { setTimeout as wait } from 'node:timers/promises';
import { getInstancesOrderedByStartPrio, tools } from '@iobroker/js-controller-common';
import { HIGHEST_UNICODE_SYMBOL, SYSTEM_ADAPTER_PREFIX } from '@iobroker/js-controller-common-db/constants';
import { InstallQueue } from '@/lib/controller/instances/installQueue.js';
import { InstanceStarter } from '@/lib/controller/instances/instanceStarter.js';
import { CompactGroupManager } from '@/lib/controller/instances/compactGroupManager.js';
import { ScheduleRunner } from '@/lib/controller/instances/scheduleRunner.js';
import type { Controller } from '@/lib/controller/controller.js';
import type { CompactProcess, Process, ScheduledInstanceEntry, StopTimeoutObject } from '@/lib/controller/types.js';

/** Pause between the start of two instances */
const DEFAULT_INSTANCE_START_INTERVAL = 2_000;
/** How often we check if all instances have been stopped */
const WAIT_FOR_INSTANCES_INTERVAL = 200;

/**
 * Knows all instances which are handled by this host and takes care of starting and stopping them
 */
export class InstanceManager {
    /** All instances which are handled by this controller */
    readonly procs: Record<string, Process> = {};
    /** All compact group controllers of this host */
    readonly compactProcs: Record<string, CompactProcess> = {};
    /** All instances which are currently being stopped */
    readonly stopTimeouts: Record<string, StopTimeoutObject> = {};
    /** All states which wake up an instance, mapped to the instances which are woken up */
    readonly subscribe: Record<string, ioBroker.ObjectIDs.Instance[]> = {};
    /** All instances of type `schedule` which are waiting to be started */
    readonly scheduledInstances: Record<string, ScheduledInstanceEntry> = {};
    /** If all instances of this host are stopped */
    allInstancesStopped = true;

    /** Installs and rebuilds adapters */
    readonly installQueue: InstallQueue;
    /** Starts the processes of the instances */
    private readonly starter: InstanceStarter;
    /** Manages the compact group controllers */
    readonly compactGroups: CompactGroupManager;
    /** Starts the instances of type `schedule` */
    readonly scheduler: ScheduleRunner;

    /** Timer which delays the writing of the pids file */
    private storeTimer: NodeJS.Timeout | null = null;

    /**
     * @param controller The controller this instance manager belongs to
     */
    constructor(private readonly controller: Controller) {
        this.installQueue = new InstallQueue(controller);
        this.starter = new InstanceStarter(controller);
        this.compactGroups = new CompactGroupManager(controller);
        this.scheduler = new ScheduleRunner(controller);
    }

    /**
     * Start given instance
     *
     * @param id - id of instance, like 'system.adapter.hm-rpc.0'
     * @param wakeUp Whether the instance is being started because of a wake-up (scheduled or message) event
     */
    async startInstance(id: ioBroker.ObjectIDs.Instance, wakeUp = false): Promise<void> {
        return this.starter.startInstance(id, wakeUp);
    }

    /**
     * Collect all instances on this host and start them
     */
    async getInstances(): Promise<void> {
        const { objects, logger, hostLogPrefix, hostname, isCompactGroupController } = this.controller;

        if (!objects) {
            throw new Error('Objects database not connected');
        }

        const instances = await getInstancesOrderedByStartPrio(objects, logger, hostLogPrefix);

        if (instances.length === 0) {
            logger.info(`${hostLogPrefix} no instances found`);
        } else {
            const _ipArr = tools.findIPs();
            if (!isCompactGroupController) {
                logger.info(`${hostLogPrefix} ${instances.length} instance${instances.length === 1 ? '' : 's'} found`);
            }
            let count = 0;

            // first mark all instances as disabled to detect disabled once
            for (const proc of Object.values(this.procs)) {
                if (proc.config?.common?.enabled) {
                    proc.config.common.enabled = false;
                }
            }

            for (const instance of instances) {
                // register all common fields that may not be deleted, like "mobile" or "history"
                if (instance.common.preserveSettings) {
                    objects.addPreserveSettings(instance.common.preserveSettings);
                }

                // @ts-expect-error is mode web valid, it is not in schema
                if (instance.common.mode === 'web' || instance.common.mode === 'none') {
                    if (instance.common.host === hostname) {
                        const name = instance._id.split('.')[2];
                        const adapterDir = tools.getAdapterDir(name);
                        if (!fs.existsSync(adapterDir!)) {
                            // @ts-expect-error check if we already need to add the config here
                            this.procs[instance._id] = { downloadRetry: 0, config: { common: { enabled: false } } };
                            this.installQueue.push({
                                id: instance._id,
                                disabled: true,
                                version: instance.common.installedVersion || instance.common.version,
                                installedFrom: instance.common.installedFrom,
                            });
                        }
                    }
                    continue;
                }

                logger.debug(`${hostLogPrefix} check instance "${instance._id}" for host "${instance.common.host}"`);
                console.log(`${hostLogPrefix} check instance "${instance._id}" for host "${instance.common.host}"`);

                if (
                    (await this.checkAndAddInstance(instance, _ipArr)) &&
                    instance.common.enabled &&
                    (instance.common.mode !== 'extension' || !instance.native.webInstance)
                ) {
                    count++;
                }
            }

            if (count > 0) {
                logger.info(`${hostLogPrefix} starting ${count} instance${count > 1 ? 's' : ''}`);
            } else {
                logger.warn(`${hostLogPrefix} does not start any instances on this host`);
            }
        }

        this.initInstances();
    }

    /**
     * Checks if an instance is relevant for this host to be considered or not
     *
     * @param instance Object of the instance
     * @returns true if instance needs to be handled by this host else false
     */
    private instanceRelevantForThisController(instance: ioBroker.InstanceObject): boolean {
        const { config, compactGroup, isCompactGroupController } = this.controller;

        // Normalize Compact group configuration
        if (config.system.compact && instance.common.compact) {
            if (instance.common.runAsCompactMode === undefined) {
                instance.common.runAsCompactMode = false;
            } // TODO repo logic!! -> someone can further specify this comment?
            if (instance.common.compactGroup === undefined) {
                instance.common.compactGroup = 1;
            } // run in controller by default
        }

        if (isCompactGroupController) {
            if (!config.system.compact || !instance.common.compact || !instance.common.runAsCompactMode) {
                return false;
            }
            if (instance.common.runAsCompactMode && instance.common.compactGroup !== compactGroup) {
                return false;
            }
        }
        return true;
    }

    /**
     * Check if an instance is handled by this host process and initialize internal data structures
     *
     * @param instance instance object
     * @param ipArr IP-Array from this host
     * @returns true if instance needs to be handled by this host (true) or not
     */
    async checkAndAddInstance(instance: ioBroker.InstanceObject, ipArr: string[]): Promise<boolean> {
        const { objects, config, logger, hostLogPrefix, hostname, isCompactGroupController } = this.controller;

        if (!ipArr.includes(instance.common.host) && instance.common.host && instance.common.host !== hostname) {
            return false;
        }
        // @ts-expect-error todo who does this? legacy or still needed?
        if (instance.deleted) {
            return false;
        }

        // update host name to current host if host name is empty
        if (!instance.common.host) {
            instance.common.host = hostname;

            try {
                await objects!.setObject(instance._id, instance);
                logger.info(`${hostLogPrefix} Set hostname ${hostname} for ${instance._id}`);
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot update hostname for ${instance._id}: ${e.message}`);
            }
        }

        if (!this.instanceRelevantForThisController(instance)) {
            return false;
        }

        if (config.system.compact && instance.common.compact) {
            if (instance.common.runAsCompactMode) {
                // @ts-expect-error we need types if this can exist
                this.compactProcs[instance.common.compactGroup] = this.compactProcs[instance.common.compactGroup] || {
                    instances: [],
                };
            }
        }

        if (isCompactGroupController) {
            logger.debug(`${hostLogPrefix} instance ${instance._id} is managed by this controller`);
        }
        this.procs[instance._id] = this.procs[instance._id] || {};
        if (!this.procs[instance._id].config) {
            this.procs[instance._id].config = deepClone(instance);
        }
        return true;
    }

    /**
     * Start all enabled instances of this host, the admin instances first
     */
    initInstances(): void {
        const { config, logger, hostLogPrefix } = this.controller;

        let seconds = 0;
        const interval = (config.system && config.system.instanceStartInterval) || DEFAULT_INSTANCE_START_INTERVAL;

        // Start first admin
        for (const [id, proc] of Object.entries(this.procs)) {
            if (
                proc.config.common.enabled &&
                (proc.config.common.mode !== 'extension' || !proc.config.native.webInstance)
            ) {
                if (id.startsWith(`${SYSTEM_ADAPTER_PREFIX}admin`)) {
                    // do not process if still running. It will be started when old one will be finished
                    if (proc.process) {
                        logger.info(`${hostLogPrefix} instance "${id}" was not started, because running.`);
                        continue;
                    }
                    if (!this.installQueue.find(id)) {
                        if (proc.restartTimer) {
                            clearTimeout(proc.restartTimer);
                        }
                        // @ts-expect-error tell ts it is an instance id
                        proc.restartTimer = setTimeout(_id => this.startInstance(_id), interval * seconds, id);

                        seconds += 2; // 4-seconds pause between starts
                    }
                }
            } else if (this.procs[id].process) {
                // stop instance if disabled
                this.stopInstance(id, false).catch(e =>
                    logger.error(`${hostLogPrefix} Cannot stop instance ${id}: ${e.message}`),
                );
            }
        }

        for (const [id, proc] of Object.entries(this.procs)) {
            if (
                proc.config.common.enabled &&
                (proc.config.common.mode !== 'extension' || !proc.config.native.webInstance)
            ) {
                if (!id.startsWith(`${SYSTEM_ADAPTER_PREFIX}admin`)) {
                    // Do not process if still running. It will be started when the old one is finished
                    if (proc.process) {
                        logger.info(`${hostLogPrefix} instance "${id}" was not started, because already running.`);
                        continue;
                    }

                    if (!this.installQueue.find(id)) {
                        if (proc.restartTimer) {
                            clearTimeout(proc.restartTimer);
                        }
                        // @ts-expect-error tell ts it is an instance id
                        proc.restartTimer = setTimeout(_id => this.startInstance(_id), interval * seconds, id);

                        if (!proc.config.common.onlyWWW) {
                            seconds += 2; // 4 seconds pause between starts if not only www files
                        }
                    }
                }
            } else {
                const name = id.split('.')[2];
                const adapterDir = tools.getAdapterDir(name);
                if (!fs.existsSync(adapterDir!)) {
                    proc.downloadRetry = proc.downloadRetry || 0;
                    this.installQueue.push({
                        // @ts-expect-error ts not knows that these are instance ids
                        id: id,
                        disabled: true,
                        version: proc.config.common.installedVersion || proc.config.common.version,
                        installedFrom: proc.config.common.installedFrom,
                    });
                }
            }
        }
    }

    /**
     * Store process IDS to make possible kill them all by restart
     */
    storePids(): void {
        const { logger, hostLogPrefix } = this.controller;

        if (this.storeTimer) {
            return;
        }

        this.storeTimer = setTimeout(() => {
            this.storeTimer = null;
            const pids = [];
            for (const id of Object.keys(this.procs)) {
                const proc = this.procs[id];

                if (proc.process?.pid && !proc.startedAsCompactGroup) {
                    pids.push(proc.process.pid);
                }
            }
            for (const id of Object.keys(this.compactProcs)) {
                const compactProc = this.compactProcs[id];

                if (compactProc.process?.pid) {
                    pids.push(compactProc.process.pid);
                }
            }
            pids.push(process.pid);
            try {
                fs.writeFileSync(tools.getPidsFileName(), JSON.stringify(pids));
            } catch (err) {
                logger.error(
                    `${hostLogPrefix} could not store process id list in ${tools.getPidsFileName()}! Please check permissions and user ownership of this file. Was ioBroker started as a different user? Please also check left over processes when stopping ioBroker!\n${err}`,
                );
                logger.error(`${hostLogPrefix} Please consider running the installation fixer when on Linux.`);
            }
        }, 1_000);
    }

    /**
     * Stop the timer which writes the pids file
     */
    clearStoreTimer(): void {
        if (this.storeTimer) {
            clearTimeout(this.storeTimer);
        }
    }

    /**
     * Mark given adapter instance as offline on state level
     *
     * @param id id of the instance
     */
    async setInstanceOfflineStates(id: ioBroker.ObjectIDs.Instance): Promise<void> {
        const { states, hostObjectPrefix } = this.controller;

        this.controller.outputCount += 2;
        await states!.setState(`${id}.alive`, { val: false, ack: true, from: hostObjectPrefix });
        await states!.setState(`${id}.connected`, { val: false, ack: true, from: hostObjectPrefix });

        const adapterInstance = id.substring(SYSTEM_ADAPTER_PREFIX.length);

        const state = await states!.getState(`${adapterInstance}.info.connection`);

        if (state?.val === true) {
            this.controller.outputCount++;
            await states!.setState(adapterInstance, { val: false, ack: true, from: hostObjectPrefix });
        }
    }

    /**
     * Clean a single auto subscribe
     *
     * @param instance instance id without `system.adapter.` prefix
     * @param autoInstance instance id
     */
    private async cleanAutoSubscribe(instance: string, autoInstance: ioBroker.ObjectIDs.Instance): Promise<void> {
        const { states, logger, hostLogPrefix } = this.controller;

        this.controller.inputCount++;
        const state = await states!.getState(`${autoInstance}.subscribes`);

        if (!state || !state.val) {
            return;
        }

        let subs;
        try {
            subs = JSON.parse(state.val as string);
        } catch {
            logger.error(`${hostLogPrefix} Cannot parse subscribes: ${state.val}`);
            return;
        }

        let modified = false;
        // look for all subscribes from this instance
        for (const pattern of Object.keys(subs)) {
            for (const id of Object.keys(subs[pattern])) {
                if (id === instance) {
                    modified = true;
                    delete subs[pattern][id];
                }
            }

            // check if the array is now empty
            if (!Object.keys(subs[pattern]).length) {
                modified = true;
                delete subs[pattern];
            }
        }

        if (modified) {
            this.controller.outputCount++;
            await states!.setState(`${autoInstance}.subscribes`, subs);
        }
    }

    /**
     * Clean all auto subscribes of the given instance
     *
     * @param instanceID The full instance id (e.g. "system.adapter.admin.0")
     */
    async cleanAutoSubscribes(instanceID: ioBroker.ObjectIDs.Instance): Promise<void> {
        const { objects } = this.controller;
        const instance = instanceID.substring(15); // get name.0

        // read all instances
        const res = await objects!.getObjectViewAsync('system', 'instance', {
            startkey: SYSTEM_ADAPTER_PREFIX,
            endkey: `${SYSTEM_ADAPTER_PREFIX}${HIGHEST_UNICODE_SYMBOL}`,
        });

        await Promise.all(
            res.rows
                // remove this instance from autoSubscribe
                .filter(row => row.value?.common.subscribable)
                .map(row => this.cleanAutoSubscribe(instance, row.id)),
        );
    }

    /**
     * Sends kill signal via sigKill state or a kill after timeouts or if forced
     *
     * @param id instance id
     * @param force if forced we will kill the pid
     */
    async stopInstance(id: string, force: boolean): Promise<void> {
        const { states, logger, hostLogPrefix, hostObjectPrefix, isCompactGroupController } = this.controller;
        const proc = this.procs[id];

        if (!proc) {
            logger.warn(`${hostLogPrefix} stopInstance unknown instance ${id}`);
            return;
        }

        logger.info(
            `${hostLogPrefix} stopInstance ${id} (force=${force}, process=${this.procs[id].process ? 'true' : 'false'})`,
        );

        const instance = proc.config;
        if (!instance?.common?.mode) {
            if (proc.process) {
                proc.stopping = true;
                if (!proc.startedAsCompactGroup) {
                    try {
                        proc.process.kill(); // call stop directly in adapter.js or call kill of a process
                    } catch (e) {
                        logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                    }
                }
                delete proc.process;
            }

            if (proc.schedule) {
                proc.schedule.cancel();
                delete proc.schedule;
            }

            if (proc.subscribe) {
                // Remove this id from subscribed on this message
                if (this.subscribe[proc.subscribe] && this.subscribe[proc.subscribe].includes(id as any)) {
                    this.subscribe[proc.subscribe].splice(this.subscribe[proc.subscribe].indexOf(id as any), 1);

                    // If no one subscribed
                    if (!this.subscribe[proc.subscribe].length) {
                        // Delete item
                        delete this.subscribe[proc.subscribe];

                        // Unsubscribe
                        if (proc.subscribe.startsWith('messagebox.')) {
                            await states!.unsubscribeMessage(proc.subscribe.substring('messagebox.'.length));
                        } else {
                            await states!.unsubscribe(proc.subscribe);
                        }
                    }
                }
            }
            return;
        }

        const stopTimeout = this.stopTimeouts[id] || {};
        this.stopTimeouts[id] = stopTimeout;
        if (stopTimeout.timeout) {
            clearTimeout(stopTimeout.timeout);
            stopTimeout.timeout = null;
        }

        switch (instance.common.mode) {
            case 'daemon':
                if (!proc.process) {
                    if (proc.config?.common.enabled && !proc.startedAsCompactGroup) {
                        !this.controller.isStopping &&
                            logger.warn(`${hostLogPrefix} stopInstance ${instance._id} not running`);
                    }
                    return;
                }
                if (force && !proc.startedAsCompactGroup) {
                    logger.info(`${hostLogPrefix} stopInstance forced ${instance._id} killing pid ${proc.process.pid}`);
                    proc.stopping = true;
                    try {
                        proc.process.kill('SIGKILL'); // call stop directly in adapter.js or call kill of a process
                    } catch (e) {
                        logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                    }
                    delete proc.process;
                } else if (
                    (instance.common.messagebox && instance.common.supportStopInstance) ||
                    instance.common.supportedMessages?.stopInstance
                ) {
                    /**
                     * Ask the instance to stop itself and kill it as soon as it has answered
                     */
                    const requestSelfStop = async (): Promise<void> => {
                        // Send to adapter signal "stopInstance" because on some systems SIGTERM does not work
                        const result = await this.controller.messages.sendToAndWait(instance._id, 'stopInstance', null);

                        const stopTimeout = this.stopTimeouts[id];
                        if (stopTimeout?.timeout) {
                            clearTimeout(stopTimeout.timeout);
                            stopTimeout.timeout = null;
                        }
                        logger.info(
                            `${hostLogPrefix} stopInstance self ${instance._id} killing pid ${
                                proc.process ? proc.process.pid : 'undefined'
                            }${result ? `: ${result}` : ''}`,
                        );
                        if (proc.process && !proc.startedAsCompactGroup) {
                            proc.stopping = true;
                            try {
                                proc.process.kill('SIGKILL'); // call stop directly in adapter.js or call kill of a process
                            } catch (e) {
                                logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                            }
                            delete proc.process;
                        }

                        if (stopTimeout?.resolve) {
                            stopTimeout.resolve();
                            stopTimeout.resolve = null;
                        }
                    };

                    requestSelfStop().catch(e =>
                        logger.error(`${hostLogPrefix} Cannot request stop of ${id}: ${e.message}`),
                    );

                    const supportStopInstanceVal: boolean | number | undefined =
                        instance.common.supportStopInstance || instance.common.supportedMessages?.stopInstance;

                    const timeoutDuration = supportStopInstanceVal === true ? 1_000 : supportStopInstanceVal || 1_000;
                    return new Promise(resolve => {
                        // If no response from adapter, kill it in 1 second
                        stopTimeout.resolve = resolve;
                        stopTimeout.timeout = setTimeout(() => {
                            const stopTimeout = this.stopTimeouts[id];
                            const proc = this.procs[id];

                            if (stopTimeout) {
                                stopTimeout.timeout = null;
                            }
                            if (proc?.process && !proc.startedAsCompactGroup) {
                                logger.info(
                                    `${hostLogPrefix} stopInstance timeout ${timeoutDuration} ${instance._id} killing pid ${proc.process.pid}`,
                                );
                                proc.stopping = true;
                                try {
                                    proc.process.kill('SIGKILL'); // call stop directly in adapter.js or call kill of a process
                                } catch (e) {
                                    logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                                }
                                delete proc.process;
                            } else if (!isCompactGroupController && proc?.process) {
                                // was compact mode in another group
                                delete proc.process; // we consider that the other group controller managed to stop it
                            }
                            if (stopTimeout?.resolve) {
                                stopTimeout.resolve();
                                stopTimeout.resolve = null;
                            }
                        }, timeoutDuration);
                    });
                } else if (!proc.startedAsCompactGroup) {
                    let err;
                    try {
                        // if started, let it end itself as first try
                        await states!.setState(`${id}.sigKill`, { val: -1, ack: false, from: hostObjectPrefix });
                    } catch (e) {
                        err = e;
                    }
                    // send kill signal
                    logger.info(`${hostLogPrefix} stopInstance ${instance._id} send kill signal`);
                    const proc = this.procs[id];
                    const stopTimeout = this.stopTimeouts[id];

                    if (!err) {
                        if (proc) {
                            proc.stopping = true;
                        }
                    }
                    const timeoutDuration = instance.common.stopTimeout || 1_000;

                    return new Promise(resolve => {
                        // If no response from adapter, kill it in 1 second
                        stopTimeout.resolve = resolve;
                        stopTimeout.timeout = setTimeout(() => {
                            const proc = this.procs[id];
                            const stopTimeout = this.stopTimeouts[id];

                            if (stopTimeout) {
                                stopTimeout.timeout = null;
                            }

                            if (proc?.process && !proc.startedAsCompactGroup) {
                                logger.info(
                                    `${hostLogPrefix} stopInstance timeout ${instance._id} killing pid ${proc.process.pid}`,
                                );
                                proc.stopping = true;
                                try {
                                    proc.process.kill('SIGKILL');
                                } catch (e) {
                                    logger.error(`${hostLogPrefix} Cannot stop ${id}: ${JSON.stringify(e)}`);
                                }
                                delete proc.process;
                            }
                            if (stopTimeout?.resolve) {
                                stopTimeout.resolve();
                                stopTimeout.resolve = null;
                            }
                        }, timeoutDuration);
                    });
                } else {
                    if (proc) {
                        delete proc.process;
                    }
                }

                break;

            case 'schedule':
                if (!proc.schedule) {
                    !this.controller.isStopping &&
                        logger.debug(`${hostLogPrefix} stopInstance ${instance._id} not scheduled`);
                } else {
                    proc.schedule.cancel();
                    delete proc.schedule;
                    if (this.scheduledInstances[id]) {
                        delete this.scheduledInstances[id];
                    }
                    logger.info(`${hostLogPrefix} stopInstance canceled schedule ${instance._id}`);
                }
                break;

            default:
        }
    }

    /**
     * Stop all running instances
     *
     * @param forceStop Whether to force-stop the instances instead of waiting for a graceful shutdown
     * @param stopTimeout Maximum time to wait for the instances to stop
     * @returns true if the instances had to be terminated forcefully
     */
    async stopInstances(forceStop: boolean, stopTimeout: number): Promise<boolean> {
        const { logger, hostLogPrefix, isDaemon } = this.controller;
        let elapsed = 0;

        try {
            this.controller.isStopping = this.controller.isStopping || Date.now(); // Sometimes a process receives SIGTERM twice
            elapsed = Date.now() - this.controller.isStopping;
            logger.debug(
                `${hostLogPrefix} stop isStopping=${elapsed} isDaemon=${isDaemon} allInstancesStopped=${this.allInstancesStopped}`,
            );

            for (const id of Object.keys(this.procs)) {
                this.stopInstance(id, forceStop).catch(e =>
                    logger.error(`${hostLogPrefix} Cannot stop instance ${id}: ${e.message}`),
                );
            }

            if (forceStop || isDaemon) {
                // send instances SIGTERM, only needed if running in a background (isDaemon)
                // or slave lost connection to master
                for (const id of Object.keys(this.compactProcs)) {
                    const proc = this.compactProcs[id];

                    if (proc.process) {
                        proc.process.kill();
                    }
                }
                if (forceStop) {
                    this.allInstancesStopped = true;
                }
            }
        } catch (e) {
            logger.error(`${hostLogPrefix} ${e.message}`);
            return false;
        }

        if (elapsed >= stopTimeout) {
            return true;
        }

        // wait for the instances, but force the shutdown after the stop timeout
        const waitingSince = Date.now();
        while (!this.allInstancesStopped) {
            if (Date.now() - waitingSince >= stopTimeout) {
                return true;
            }
            await wait(WAIT_FOR_INSTANCES_INTERVAL);
        }

        return false;
    }

    /**
     * React on a change of an instance object, e.g. start, stop or move an instance
     *
     * @param _id The id of the changed object
     * @param _obj The changed object or null if it has been deleted
     */
    async handleObjectChange(_id: string, _obj: ioBroker.AnyObject | null | undefined): Promise<void> {
        const { logger, hostLogPrefix, notificationHandler, compactGroup, isCompactGroupController } = this.controller;

        if (!this.controller.started || !_id.match(/^system\.adapter\.[a-zA-Z0-9-_]+\.[0-9]+$/)) {
            return;
        }

        const obj = _obj as ioBroker.InstanceObject | null;
        const id = _id as ioBroker.ObjectIDs.Instance;

        try {
            logger.debug(`${hostLogPrefix} object change ${id} (from: ${obj ? obj.from : null})`);
            // known adapter
            const proc = this.procs[id];

            if (proc) {
                // if adapter deleted
                if (!obj) {
                    // deleted: also remove from an instance list of compactGroup
                    this.removeFromCompactGroup(id, proc);

                    // instance removed -> remove all notifications
                    await notificationHandler.clearNotifications(null, null, id);
                    proc.config.common.enabled = false;
                    // @ts-expect-error check if we can handle it differently
                    proc.config.common.host = null;
                    // @ts-expect-error it is only used in checkAndAddInstance, find a way without modifying the InstanceObject
                    proc.config.deleted = true;
                    logger.info(`${hostLogPrefix} object deleted ${id}`);
                } else {
                    if (proc.config.common.enabled && !obj.common.enabled) {
                        logger.info(`${hostLogPrefix} "${id}" disabled`);
                    }
                    if (!proc.config.common.enabled && obj.common.enabled) {
                        logger.info(`${hostLogPrefix} "${id}" enabled`);
                        proc.downloadRetry = 0;
                    }

                    // Check if compactgroup or compact mode changed
                    if (
                        !isCompactGroupController &&
                        proc.config.common.compactGroup &&
                        (proc.config.common.compactGroup !== obj.common.compactGroup ||
                            proc.config.common.runAsCompactMode !== obj.common.runAsCompactMode) &&
                        this.compactProcs[proc.config.common.compactGroup]?.instances?.includes(id)
                    ) {
                        this.compactProcs[proc.config.common.compactGroup].instances.splice(
                            this.compactProcs[proc.config.common.compactGroup].instances.indexOf(id),
                            1,
                        );
                    }
                    proc.config = obj;
                }

                if (proc.process || proc.config.common.mode === 'schedule') {
                    proc.restartExpected = true;
                    await this.stopInstance(id, false);
                    if (!this.procs[id]) {
                        return;
                    }
                    const _ipArr = tools.findIPs();

                    if (await this.checkAndAddInstance(proc.config, _ipArr)) {
                        if (
                            proc.config.common.enabled &&
                            (proc.config.common.mode !== 'extension' || !proc.config.native.webInstance)
                        ) {
                            if (proc.restartTimer) {
                                clearTimeout(proc.restartTimer);
                            }
                            const restartTimeout = 2_500;
                            proc.restartTimer = setTimeout(_id => this.startInstance(_id), restartTimeout, id);
                        }
                    } else {
                        // moved: also remove from an instance list of compactGroup
                        this.removeFromCompactGroup(id, proc);

                        if (proc.restartTimer) {
                            clearTimeout(proc.restartTimer);
                            delete proc.restartTimer;
                        }

                        // instance moved -> remove all notifications, new host has to take care
                        await notificationHandler.clearNotifications(null, null, id);

                        delete this.procs[id];
                    }
                } else if (this.installQueue.find(id)) {
                    // ignore object changes when still in the installation queue
                    logger.debug(
                        `${hostLogPrefix} ignore object change because the adapter is still in installation/rebuild queue`,
                    );
                } else {
                    const _ipArr = tools.findIPs();
                    if (proc.config && (await this.checkAndAddInstance(proc.config, _ipArr))) {
                        if (
                            proc.config.common.enabled &&
                            (proc.config.common.mode !== 'extension' || !proc.config.native.webInstance)
                        ) {
                            this.startInstance(id).catch(e =>
                                logger.error(`${hostLogPrefix} Cannot start instance ${id}: ${e.message}`),
                            );
                        }
                    } else {
                        // moved: also remove from an instance list of compactGroup
                        this.removeFromCompactGroup(id, proc);

                        if (proc.restartTimer) {
                            clearTimeout(proc.restartTimer);
                            delete proc.restartTimer;
                        }

                        delete this.procs[id];
                    }
                }
            } else if (obj?.common) {
                const _ipArr = tools.findIPs();
                // new adapter
                if (!(await this.checkAndAddInstance(obj, _ipArr))) {
                    return;
                }

                const proc = this.procs[id];
                if (
                    proc.config.common.enabled &&
                    (proc.config.common.mode !== 'extension' || !proc.config.native.webInstance)
                ) {
                    // We should give a slight delay to allow a potentially former existing process on another host to exit
                    const restartTimeout = (proc.config.common.stopTimeout || 500) + 2_500;
                    proc.restartTimer = setTimeout(_id => this.startInstance(_id), restartTimeout, id);
                }
            }
        } catch (err) {
            if (
                !isCompactGroupController ||
                (obj?.common?.runAsCompactMode && obj.common.compactGroup === compactGroup)
            ) {
                logger.error(`${hostLogPrefix} cannot process: ${id}: ${err} / ${err.stack}`);
            }
        }
    }

    /**
     * Remove the given instance from the instance list of its compact group
     *
     * @param id The id of the instance
     * @param proc The process information of the instance
     */
    private removeFromCompactGroup(id: ioBroker.ObjectIDs.Instance, proc: Process): void {
        const { isCompactGroupController } = this.controller;

        if (
            !isCompactGroupController &&
            proc.config.common.compactGroup &&
            this.compactProcs[proc.config.common.compactGroup]?.instances?.includes(id)
        ) {
            this.compactProcs[proc.config.common.compactGroup].instances.splice(
                this.compactProcs[proc.config.common.compactGroup].instances.indexOf(id),
                1,
            );
        }
    }
}
