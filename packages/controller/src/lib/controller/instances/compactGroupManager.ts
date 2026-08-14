import path from 'node:path';
import cp from 'node:child_process';
import * as url from 'node:url';
import { EXIT_CODES } from '@iobroker/js-controller-common';
import { cleanErrors, getErrorText } from '@/lib/controller/helpers.js';
import type { InstanceManager, InstanceManagerOptions } from '@/lib/controller/instances/instanceManager.js';
import type { Process } from '@/lib/controller/types.js';

/** Everything the compact group manager needs to do its work */
export type CompactGroupManagerOptions = Pick<
    InstanceManagerOptions,
    'states' | 'logger' | 'hostLogPrefix' | 'hostObjectPrefix' | 'statistics' | 'state' | 'logWriteErrors'
> & {
    /** The instances of this host, the group controllers run their processes */
    instances: InstanceManager;
};

// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

/**
 * Starts and monitors the compact group controllers, which run multiple adapters in one process
 */
export class CompactGroupManager {
    readonly #options: CompactGroupManagerOptions;

    /**
     * @param options Everything the compact group manager needs to do its work
     */
    constructor(options: CompactGroupManagerOptions) {
        this.#options = options;
    }

    /**
     * Assign the given instance to its compact group controller and start the group controller if needed
     *
     * @param id The id of the instance, like `system.adapter.hm-rpc.0`
     * @param instance The instance object
     * @param proc The process information of the instance
     */
    startInstanceInGroup(id: ioBroker.ObjectIDs.Instance, instance: ioBroker.InstanceObject, proc: Process): void {
        const { logger, hostLogPrefix, instances } = this.#options;
        const { compactProcs } = instances;

        const compactGroup = instance.common.compactGroup!;

        // a group controller for this group is not yet started, execute one
        compactProcs[compactGroup] = compactProcs[compactGroup] || {
            instances: [],
        };

        const compactProc = compactProcs[compactGroup];

        if (!compactProc.process) {
            /** Args passed to the actual adapter */
            const compactControllerArgs = [compactGroup.toString()];
            /** Args passed to Node.js */
            const execArgv: string[] = [];

            if (instance.common.memoryLimitMB && Math.round(instance.common.memoryLimitMB)) {
                execArgv.push(`--max-old-space-size=${Math.round(instance.common.memoryLimitMB)}`);
            }

            logger.info(`${hostLogPrefix} start controller for compactgroup ${instance.common.compactGroup}`);

            try {
                compactProc.process = cp.fork(
                    path.join(thisDir, '..', '..', '..', 'compactgroupController.js'),
                    compactControllerArgs,
                    {
                        execArgv,
                        stdio: ['ignore', 'ignore', 'pipe', 'ipc'],
                        // @ts-expect-error missing from types, but we already tested it is needed
                        windowsHide: true,
                    },
                );
            } catch (err) {
                delete compactProc.process;
                logger.info(
                    `${hostLogPrefix} controller for compactgroup ${instance.common.compactGroup} could not be started: ${err}`,
                );
            }

            if (compactProc.process) {
                if (compactProc.process.stderr) {
                    compactProc.process.stderr.on('data', data => {
                        const compactProc = compactProcs[compactGroup];
                        if (!data || !compactProc || typeof compactProc !== 'object') {
                            return;
                        }
                        const text = data.toString();
                        // show for debug
                        console.error(text);
                        compactProc.errors = compactProc.errors || [];
                        const now = Date.now();
                        compactProc.errors.push({ ts: now, text: text });
                        // limit output to 300 messages
                        if (compactProc.errors.length > 300) {
                            compactProc.errors.splice(compactProc.errors.length - 300);
                        }
                        cleanErrors({ procObj: compactProc, now, logger, logPrefix: hostLogPrefix });
                    });
                }

                compactProcs[compactGroup].process!.on(
                    'exit',
                    this.#createGroupExitHandler(instance.common.compactGroup!, proc),
                );
            }
        }

        if (compactProcs[compactGroup].process) {
            if (!compactProcs[compactGroup].instances.includes(id)) {
                compactProcs[compactGroup].instances.push(id);
            }

            proc.process = compactProcs[compactGroup].process;
            proc.startedAsCompactGroup = true;
        }
    }

    /**
     * Mark the given compact-mode instances as stopped
     *
     * @param instanceIds The instances to mark as stopped
     */
    async #markCompactInstancesAsStopped(instanceIds: ioBroker.ObjectIDs.Instance[]): Promise<void> {
        const { states, hostObjectPrefix, instances, statistics, state, logWriteErrors } = this.#options;

        for (const id of instanceIds) {
            statistics.countOutput(2);
            logWriteErrors(
                [
                    states.setState(`${id}.alive`, {
                        val: false,
                        ack: true,
                        from: hostObjectPrefix,
                    }),
                    states.setState(`${id}.connected`, {
                        val: false,
                        ack: true,
                        from: hostObjectPrefix,
                    }),
                ],
                `Cannot reset ${id} alive/connected states`,
            );

            await instances.cleanAutoSubscribes(id);

            const proc = instances.procs[id];

            if (proc?.stopping || state.isStopping) {
                if (proc?.stopping !== undefined) {
                    delete proc.stopping;
                }
            }

            if (proc?.process) {
                delete proc.process;
            }
        }
    }

    /**
     * Create the handler which is called as soon as a compact group controller has exited
     *
     * @param currentCompactGroup The compact group the exited controller was responsible for
     * @param proc The process information of the instance which has started this group controller
     */
    #createGroupExitHandler(currentCompactGroup: number, proc: Process): (code: number, signal: string) => void {
        const handleGroupExit = async (code: number, signal: string): Promise<void> => {
            const { logger, hostLogPrefix, instances, state } = this.#options;
            const { procs, compactProcs } = instances;

            if (signal) {
                logger.warn(
                    `${hostLogPrefix} compactgroup controller ${currentCompactGroup} terminated due to ${signal}`,
                );
            } else if (code !== null) {
                logger.info(
                    `${hostLogPrefix} compactgroup controller ${currentCompactGroup} terminated with code ${code} (${
                        getErrorText(code) || ''
                    })`,
                );
            } else {
                logger.info(`${hostLogPrefix} compactgroup controller ${currentCompactGroup} terminated`);
            }

            if (compactProcs[currentCompactGroup] && compactProcs[currentCompactGroup].process) {
                delete compactProcs[currentCompactGroup].process;
            }

            // mark all instances that should be handled by this controller also as not running.
            const killedInstances: ioBroker.ObjectIDs.Instance[] = [];
            compactProcs[currentCompactGroup].instances.forEach(el => killedInstances.push(el));

            await this.#markCompactInstancesAsStopped(killedInstances);

            // show stored errors
            cleanErrors({
                procObj: compactProcs[currentCompactGroup],
                now: null,
                doOutput: true,
                logger,
                logPrefix: hostLogPrefix,
            });

            if (state.isStopping) {
                logger.silly(`${hostLogPrefix} Check after group exit ${currentCompactGroup}`);
                for (const proc of Object.values(procs)) {
                    if (proc.process) {
                        logger.silly(`${hostLogPrefix} ${proc.config.common.name} still running`);
                        return;
                    }
                }
                for (const [i, compactProc] of Object.entries(compactProcs)) {
                    if (compactProc.process) {
                        logger.silly(`${hostLogPrefix} Compact group ${i} still running (compact)`);
                        return;
                    }
                }
                logger.info(`${hostLogPrefix} All instances are stopped.`);
                instances.allInstancesStopped = true;

                instances.storePids();
                return;
            }

            // Restart group controller because still instances assigned to him, done via startInstance
            if (state.connected && compactProcs[currentCompactGroup].instances.length) {
                logger.info(`${hostLogPrefix} Restart compact group controller ${currentCompactGroup}`);
                logger.debug(
                    `${hostLogPrefix} Instances: ${JSON.stringify(compactProcs[currentCompactGroup].instances)}`,
                );

                compactProcs[currentCompactGroup].instances.forEach(id => {
                    if (proc.restartTimer) {
                        clearTimeout(proc.restartTimer);
                    }

                    // START_IMMEDIATELY_AFTER_STOP is a special code that adapter wants itself to be restarted immediately
                    proc.restartTimer = setTimeout(
                        _id => instances.startInstance(_id),
                        code === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP
                            ? 1_000
                            : procs[id].config.common.restartSchedule
                              ? 1_000
                              : 30_000,
                        id,
                    );
                });
            } else {
                logger.info(
                    `${hostLogPrefix} Do not restart compact group controller ${currentCompactGroup} because no instances assigned to him`,
                );
            }

            instances.storePids();
        };

        return (code: number, signal: string): void => {
            handleGroupExit(code, signal).catch(e =>
                this.#options.logger.error(
                    `${this.#options.hostLogPrefix} Cannot handle exit of compact group ${currentCompactGroup}: ${e.message}`,
                ),
            );
        };
    }
}
