import cp from 'node:child_process';
import schedule from 'node-schedule';
import { setTimeout as wait } from 'node:timers/promises';
import { CronExpressionParser } from 'cron-parser';
import { EXIT_CODES, isInstalledFromNpm, tools } from '@iobroker/js-controller-common';
import { getCronExpression } from '@/lib/utils.js';
import { getErrorText } from '@/lib/controller/helpers.js';
import { ControllerContextBase } from '@/lib/controller/contextBase.js';
import type { Process, ScheduledInstanceEntry } from '@/lib/controller/types.js';

/** Everything which is needed to schedule an instance */
export interface ScheduleInstanceContext {
    /** The id of the instance, like `system.adapter.hm-rpc.0` */
    id: ioBroker.ObjectIDs.Instance;
    /** The instance object */
    instance: ioBroker.InstanceObject;
    /** The process information of the instance */
    proc: Process;
    /** Full path of the main file of the adapter */
    adapterMainFile: string;
    /** Directory of the adapter */
    adapterDir: string;
    /** Args passed to the actual adapter code */
    args: string[];
    /** Args passed to Node.js */
    execArgv: string[];
    /** If the instance is only started to be woken up */
    wakeUp: boolean;
}

/**
 * Starts instances of type `schedule` at their configured time
 */
export class ScheduleRunner extends ControllerContextBase {
    /**
     * Register the cron job of an instance of type `schedule`
     *
     * @param ctx Everything which is needed to schedule the instance
     */
    scheduleInstance(ctx: ScheduleInstanceContext): void {
        const { id, instance, proc, adapterMainFile, adapterDir, args, execArgv, wakeUp } = ctx;
        const { states, logger, hostLogPrefix, hostObjectPrefix, instances, isCompactGroupController } = this;

        if (isCompactGroupController) {
            logger.debug(`${hostLogPrefix} ${instance._id} schedule is not started by compact group controller`);
            return;
        }
        if (!instance.common.schedule) {
            logger.error(`${hostLogPrefix} ${instance._id} schedule attribute missing`);
            return;
        }

        // cancel current schedule
        if (proc.schedule) {
            proc.schedule.cancel();
            logger.info(`${hostLogPrefix} instance canceled schedule ${instance._id}`);
        }

        try {
            CronExpressionParser.parse(instance.common.schedule);
        } catch (e) {
            logger.error(`${hostLogPrefix} Cannot schedule start of instance ${instance._id}: ${e.message}`);
            return;
        }

        proc.schedule = schedule.scheduleJob(
            getCronExpression({
                cronExpression: instance.common.schedule,
                connectionType: instance.common.connectionType,
            }),
            () => {
                // queue up, but only if not already queued
                instances.scheduledInstances[id] = {
                    fileNameFull: adapterMainFile,
                    adapterDir,
                    wakeUp,
                };
                Object.keys(instances.scheduledInstances).length === 1 &&
                    this.startScheduledInstance().catch(e =>
                        logger.error(`${hostLogPrefix} Cannot start scheduled instance: ${e.message}`),
                    );
            },
        );
        logger.info(`${hostLogPrefix} instance scheduled ${instance._id} ${instance.common.schedule}`);

        // Start one time adapter by start or if configuration changed
        if (!instance.common.allowInit) {
            return;
        }

        try {
            proc.process = cp.fork(adapterMainFile, args, {
                execArgv: [...tools.getDefaultNodeArgs(adapterMainFile), ...execArgv],
                // @ts-expect-error missing from types, but we already tested it is necessary
                windowsHide: true,
                cwd: adapterDir,
            });
        } catch (e) {
            logger.info(`${hostLogPrefix} instance ${instance._id} could not be started: ${e.message}`);
        }

        if (!proc.process) {
            return;
        }

        instances.storePids();
        const isNpm = isInstalledFromNpm({
            installedFrom: instance.common.installedFrom,
            adapterName: instance.common.name,
        });

        logger.info(
            `${hostLogPrefix} instance ${instance._id} in version "${instance.common.version}"${!isNpm ? ` (non-npm: ${instance.common.installedFrom})` : ''} started with pid ${proc.process.pid}`,
        );

        /**
         * Handle the exit of the one time started instance
         *
         * @param code The exit code of the process
         * @param signal The signal which has terminated the process
         */
        const handleExit = async (code: number | null, signal: string | null): Promise<void> => {
            await instances.cleanAutoSubscribes(id);

            const proc = instances.procs[id];

            this.countOutput();
            states
                .setState(`${id}.alive`, { val: false, ack: true, from: hostObjectPrefix })
                .catch(e => logger.error(`${hostLogPrefix} Cannot set ${id}.alive: ${e.message}`));
            if (signal) {
                logger.warn(`${hostLogPrefix} instance ${id} terminated due to ${signal}`);
            } else if (code === null) {
                logger.error(`${hostLogPrefix} instance ${id} terminated abnormally`);
            } else {
                const text = `${hostLogPrefix} instance ${id} terminated with code ${code} (${
                    getErrorText(code) || ''
                })`;
                if (!code || code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION || code === EXIT_CODES.NO_ERROR) {
                    logger.info(text);
                } else {
                    logger.error(text);
                }
            }
            if (proc) {
                delete proc.process;
            }

            instances.storePids();
        };

        proc.process.on('exit', (code, signal) => {
            handleExit(code, signal).catch(e =>
                logger.error(`${hostLogPrefix} Cannot handle exit of instance ${id}: ${e.message}`),
            );
        });
    }

    /**
     * Start all queued instances of type `schedule` one after another
     */
    async startScheduledInstance(): Promise<void> {
        const { config, logger, hostLogPrefix, instances } = this;
        const { scheduledInstances } = instances;

        let idsToStart = Object.keys(scheduledInstances);

        while (idsToStart.length) {
            const id = idsToStart[0];
            let skipped: boolean;

            try {
                skipped = await this.#startSingleScheduledInstance(id, scheduledInstances[id]);
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot start scheduled instance ${id}: ${e.message}`);
                skipped = true;
            }

            // 4 seconds pause between the start of two instances
            const interval = (config.system && config.system.instanceStartInterval) || 2_000;
            await wait(skipped ? 0 : interval + 2_000);

            delete scheduledInstances[id];
            idsToStart = Object.keys(scheduledInstances);
        }
    }

    /**
     * Start a single queued instance of type `schedule`
     *
     * @param id The id of the instance, like `system.adapter.hm-rpc.0`
     * @param entry The information which has been queued by the cron job
     * @returns true if the instance has not been started, so the next one does not need to wait
     */
    async #startSingleScheduledInstance(id: string, entry: ScheduledInstanceEntry): Promise<boolean> {
        const { states, logger, hostLogPrefix, hostObjectPrefix, instances } = this;
        const { procs } = instances;
        const { adapterDir, fileNameFull, wakeUp } = entry;

        const proc = procs[id];

        if (!proc) {
            logger.error(`${hostLogPrefix} scheduleJob: Task deleted (${id})`);
            return true;
        }

        const instance = proc.config;

        // After sleep of PC all scheduled runs come together. There is no need to run it X times in one second. Just the last.
        if (proc.lastStart && Date.now() - proc.lastStart < 2_000) {
            logger.warn(
                `${hostLogPrefix} instance ${instance._id} not started, because start has already been initialized less than 2 seconds ago`,
            );
            return true;
        }

        // Remember the last run
        proc.lastStart = Date.now();

        if (proc.process) {
            !wakeUp &&
                logger.warn(`${hostLogPrefix} instance ${instance._id} already running with pid ${proc.process.pid}`);
            return true;
        }

        // reset sigKill to 0 if it was set to another value from "once run"
        await states.setState(`${instance._id}.sigKill`, { val: 0, ack: false, from: hostObjectPrefix });

        const args = [
            '--instance',
            instance._id.split('.').pop() || '0',
            '--loglevel',
            instance.common.loglevel || 'info',
        ];

        try {
            proc.process = cp.fork(fileNameFull, args, {
                execArgv: tools.getDefaultNodeArgs(fileNameFull),
                // @ts-expect-error missing from types, but we already tested it is needed
                windowsHide: true,
                cwd: adapterDir,
            });
        } catch (err) {
            logger.error(`${hostLogPrefix} instance ${id} could not be started: ${err.message}`);
            delete proc.process;
        }

        if (proc.process) {
            instances.storePids();
            const { pid } = proc.process;

            const isNpm = isInstalledFromNpm({
                installedFrom: instance.common.installedFrom,
                adapterName: instance.common.name,
            });

            logger.info(
                `${hostLogPrefix} instance ${instance._id} in version "${instance.common.version}"${!isNpm ? ` (non-npm: ${instance.common.installedFrom})` : ''} started with pid ${proc.process.pid}`,
            );

            proc.process.on('exit', (code, signal) => {
                this.countOutput();
                states
                    .setState(`${id}.alive`, { val: false, ack: true, from: hostObjectPrefix })
                    .catch(e => logger.error(`${hostLogPrefix} Cannot set ${id}.alive: ${e.message}`));
                if (signal) {
                    logger.warn(`${hostLogPrefix} instance ${id} terminated due to ${signal}`);
                } else if (code === null) {
                    logger.error(`${hostLogPrefix} instance ${id} terminated abnormally`);
                } else {
                    const text = `${hostLogPrefix} instance ${id} having pid ${pid} terminated with code ${code} (${
                        getErrorText(code) || ''
                    })`;
                    if (!code || code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION || code === EXIT_CODES.NO_ERROR) {
                        logger.info(text);
                    } else {
                        logger.error(text);
                    }
                }

                if (proc.process) {
                    delete proc.process;
                }
                instances.storePids();
            });
        }

        return false;
    }
}
