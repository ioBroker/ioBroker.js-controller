import { EXIT_CODES } from '@iobroker/js-controller-common';
import { SYSTEM_HOST_PREFIX } from '@iobroker/js-controller-common-db/constants';
import { cleanErrors, getErrorText } from '@/lib/controller/helpers.js';
import type { ControllerContext } from '@/lib/controller/context.js';

/** Everything the exit handler needs to know about the instance it belongs to */
export interface InstanceLaunchContext {
    /** The id of the instance, like `system.adapter.hm-rpc.0` */
    id: ioBroker.ObjectIDs.Instance;
    /** The instance object */
    instance: ioBroker.InstanceObject;
    /** The mode the instance has been started with */
    mode: string;
    /** If the instance has only been started to be woken up */
    wakeUp: boolean;
}

/** After this time without a crash, the crash counter of an instance is reset */
const CRASH_RESET_TIME = 1_000 * 600;
/** How often an instance may crash in a row before the controller stops restarting it */
const MAX_CRASHES = 3;
/** How often the rebuild of an adapter is tried before it is given up */
const MAX_REBUILDS = 4;

/**
 * Create the handler which is called as soon as the process of an instance has exited
 *
 * It takes care of the log redirection, the restart of the instance, the crash loop detection
 * and the rebuild of native modules.
 *
 * @param controllerCtx Shared controller context providing live runtime state
 * @param ctx Information about the instance which has been started
 */
export function createInstanceExitHandler(
    controllerCtx: ControllerContext,
    ctx: InstanceLaunchContext,
): (code: number, signal: string) => void {
    const { id, instance, mode, wakeUp } = ctx;

    /**
     * Handle the exit of the instance process
     *
     * @param code The exit code of the process
     * @param signal The signal which has terminated the process
     */
    const handleExit = async (code: number, signal: string): Promise<void> => {
        // `states` and `notificationHandler` are read inside their branch, they are not needed
        // on every exit and only exist once the databases are connected
        const { logger, hostLogPrefix, hostObjectPrefix, hostname, instances } = controllerCtx;
        const { procs, compactProcs, stopTimeouts } = instances;

        instances
            .setInstanceOfflineStates(id)
            .catch(e => logger.error(`${hostLogPrefix} Cannot set instance ${id} offline: ${e.message}`));

        // if we have waiting kill timeouts from stopInstance clear them
        // and resolve the pending stop because the process ended now
        const stopTimeout = stopTimeouts[id];
        if (stopTimeout?.timeout) {
            clearTimeout(stopTimeout.timeout);
            stopTimeout.timeout = null;
            if (stopTimeout.resolve) {
                stopTimeout.resolve();
                stopTimeout.resolve = null;
            }
        }

        await instances.cleanAutoSubscribes(id);

        const proc = procs[id];

        if (proc?.config?.common.logTransporter) {
            controllerCtx.countOutput();
            console.log(`================================== > LOG REDIRECT ${id} => false [Process stopped]`);
            controllerCtx.states
                .setState(`${id}.logging`, { val: false, ack: true, from: hostObjectPrefix })
                .catch(e => logger.error(`${hostLogPrefix} Cannot set ${id}.logging: ${e.message}`));
        }

        // show stored errors
        cleanErrors({
            procObj: proc,
            now: null,
            doOutput:
                code !== EXIT_CODES.START_IMMEDIATELY_AFTER_STOP && code !== EXIT_CODES.ADAPTER_REQUESTED_TERMINATION,
            logger,
            logPrefix: hostLogPrefix,
        });

        if (mode !== 'once') {
            if (signal) {
                logger.warn(`${hostLogPrefix} instance ${id} terminated due to ${signal}`);
            } else if (code === null) {
                logger.error(`${hostLogPrefix} instance ${id} terminated abnormally`);
            }

            if (proc?.stopping || controllerCtx.isStopping || wakeUp) {
                logger.info(
                    `${hostLogPrefix} instance ${id} terminated with code ${code} (${getErrorText(code) || ''})`,
                );

                if (proc) {
                    if (proc.stopping !== undefined) {
                        delete proc.stopping;
                    }

                    if (proc.process) {
                        delete proc.process;
                    }
                }

                if (controllerCtx.isStopping) {
                    logger.silly(`${hostLogPrefix} Check Stopping ${id}`);
                    for (const proc of Object.values(procs)) {
                        if (proc.process) {
                            logger.silly(`${hostLogPrefix} ${proc.config.common.name} still running`);
                            return;
                        }
                    }
                    for (const [i, compactProc] of Object.entries(compactProcs)) {
                        if (compactProc.process) {
                            logger.silly(`${hostLogPrefix} Compact group ${i} still running`);
                            return;
                        }
                    }
                    logger.info(`${hostLogPrefix} All instances are stopped.`);
                    instances.allInstancesStopped = true;
                }
                instances.storePids();
                return;
            }

            if (code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION && proc?.restartExpected) {
                logger.info(`${hostLogPrefix} instance ${id} terminated for restart.`);
            } else if (code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION) {
                logger.info(
                    `${hostLogPrefix} instance ${id} terminated by request of the instance itself and will not be restarted, before user restarts it.`,
                );
            } else if (code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP && proc?.config?.common.restartSchedule) {
                logger.info(
                    `${hostLogPrefix} instance ${id} scheduled normal terminated and will be restarted on schedule.`,
                );
            } else if (code === EXIT_CODES.ADAPTER_REQUESTED_REBUILD && proc) {
                logger.info(
                    `${hostLogPrefix} instance ${id} requested a rebuild of its dependencies and will be restarted after that is done.`,
                );
                proc.needsRebuild = true;
            } else {
                const text = `${hostLogPrefix} instance ${id} terminated with code ${code} (${
                    getErrorText(code) || ''
                })`;
                if (
                    !code ||
                    code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION ||
                    code === EXIT_CODES.NO_ERROR ||
                    code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP
                ) {
                    logger.info(text);
                } else {
                    logger.error(text);
                }
            }
        }

        if (proc?.process) {
            delete proc.process;
        }

        if (proc?.needsRebuild) {
            proc.rebuildCounter = proc.rebuildCounter ?? 0;
            proc.rebuildCounter++;
            if (proc.rebuildCounter < MAX_REBUILDS) {
                logger.info(
                    `${hostLogPrefix} Adapter ${id} needs rebuild ${
                        proc.rebuildArgs ? `of ${proc.rebuildArgs.module} ` : ''
                    }and will be restarted afterwards.`,
                );
                const msg: Record<string, any> = {
                    command: 'rebuildAdapter',
                    message: { id: instance._id },
                };

                // if rebuild args are given, send them
                if (proc.rebuildArgs) {
                    msg.message.rebuildArgs = proc.rebuildArgs;
                    delete proc.rebuildArgs;
                }

                if (!controllerCtx.isCompactGroupController) {
                    // execute directly
                    controllerCtx.messageHandler
                        .process(msg as any)
                        .catch(e => logger.error(`${hostLogPrefix} Cannot process message: ${e.message}`));
                } else {
                    // send to the main controller to make sure only one npm process runs at a time
                    controllerCtx.messages
                        .sendTo(`${SYSTEM_HOST_PREFIX}${hostname}`, 'rebuildAdapter', msg)
                        .catch(e => logger.error(`${hostLogPrefix} Cannot send rebuildAdapter: ${e.message}`));
                }
            } else {
                logger.info(
                    `${hostLogPrefix} Rebuild for adapter ${id} not successful in 3 tries. Adapter will not be restarted again. Please execute "npm install --production" in adapter directory manually.`,
                );
            }

            instances.storePids();
            return;
        }

        if (proc) {
            proc.rebuildCounter = 0;
        }

        if (
            code !== EXIT_CODES.ADAPTER_REQUESTED_TERMINATION &&
            !wakeUp &&
            controllerCtx.connected &&
            !controllerCtx.isStopping &&
            proc?.config?.common.enabled &&
            !proc.config.native.webInstance &&
            mode !== 'once'
        ) {
            if (code === EXIT_CODES.UNCAUGHT_EXCEPTION) {
                // if it's an uncaught exception, detect restart loop
                proc.crashCount = proc.crashCount ?? 0;
                proc.crashCount++;
                logger.debug(`${hostLogPrefix} Crash count of ${id}: ${proc.crashCount}`);

                if (proc.crashResetTimer) {
                    logger.debug(`${hostLogPrefix} Reset crash timer of ${id}, to be initialized anew`);
                    clearTimeout(proc.crashResetTimer);
                }

                // after 10 minutes without a crash, we reset the counter
                logger.debug(`${hostLogPrefix} Initialize crash timer of ${id}`);
                proc.crashResetTimer = setTimeout(() => {
                    logger.debug(`${hostLogPrefix} Cleared crash counter of ${id}, because 10 minutes no crash`);
                    // check that process id still exists - could be moved to another host
                    if (proc) {
                        proc.crashCount = 0;
                    }
                }, CRASH_RESET_TIME);
            } else {
                // reset crash count and timer because non-crash exit
                logger.debug(`${hostLogPrefix} Reset crash count of ${id}, because non-crash exit`);
                proc.crashCount = 0;
                if (proc.crashResetTimer) {
                    logger.debug(`${hostLogPrefix} Cleared crash timer of ${id}, because non-crash exit`);
                    clearTimeout(proc.crashResetTimer);
                    delete proc.crashResetTimer;
                }
            }

            logger.info(`${hostLogPrefix} Restart adapter ${id} because enabled`);

            const restartTimerExisting = !!proc.restartTimer;
            if (proc.restartTimer) {
                clearTimeout(proc.restartTimer);
            }

            if (!proc.crashCount || proc.crashCount < MAX_CRASHES) {
                proc.restartTimer = setTimeout(
                    _id => instances.startInstance(_id),
                    code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP
                        ? 1_000
                        : proc.config.common.restartSchedule || restartTimerExisting
                          ? 1_000
                          : 30_000,
                    id,
                );
                // 156 is special code that adapter wants itself to be restarted immediately
            } else {
                // 3 crashes - do not restart anymore
                logger.warn(`${hostLogPrefix} Do not restart adapter ${id} because restart loop detected`);
                await controllerCtx.notificationHandler.addMessage({
                    scope: 'system',
                    category: 'restartLoop',
                    message: 'Restart loop detected',
                    instance: id,
                });
                proc.crashCount = 0;
                if (proc.crashResetTimer) {
                    logger.debug(`${hostLogPrefix} Cleared crash timer of ${id}, because adapter stopped`);
                    clearTimeout(proc.crashResetTimer);
                    delete proc.crashResetTimer;
                }
            }
        } else if (code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION && proc && proc.restartExpected) {
            logger.info(`${hostLogPrefix} Adapter ${id} will be restarted automatically`);
        } else if (code === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION) {
            logger.info(`${hostLogPrefix} Do not restart adapter ${id} because desired by instance`);
        } else if (mode !== 'once') {
            logger.info(`${hostLogPrefix} Do not restart adapter ${id} because disabled or deleted`);
        } else {
            logger.info(`${hostLogPrefix} instance ${id} terminated while should be started once`);
        }

        instances.storePids();
    };

    return (code: number, signal: string): void => {
        handleExit(code, signal).catch(e =>
            controllerCtx.logger.error(
                `${controllerCtx.hostLogPrefix} Cannot handle exit of instance ${id}: ${e.message}`,
            ),
        );
    };
}
