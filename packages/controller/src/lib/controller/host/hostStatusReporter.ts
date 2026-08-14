import os from 'node:os';
import fs from 'fs-extra';
import pidUsage from 'pidusage';
import { tools, type NotificationHandler } from '@iobroker/js-controller-common';
import type { GetDiskInfoResponse } from '@iobroker/js-controller-common-db/tools';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import { DEFAULT_DISK_WARNING_LEVEL } from '@/lib/utils.js';
import type { InstanceManager } from '@/lib/controller/instances/instanceManager.js';
import type { ControllerState } from '@/lib/controller/state.js';
import type { Statistics } from '@/lib/controller/statistics.js';
import type { ControllerLogger } from '@/lib/controller/types.js';

/** Everything the status reporter needs to do its work */
export interface HostStatusReporterOptions {
    /** The connected states database client */
    states: StatesClient;
    /** The configuration of this host (iobroker.json) */
    config: ioBroker.IoBrokerJson;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
    /** The id of the host object of this controller, all reported states live below it */
    hostObjectPrefix: ioBroker.ObjectIDs.Host;
    /** Name of this host, used as the instance of the disk space notification */
    hostname: string;
    /** If this controller is a compact group controller */
    isCompactGroupController: boolean;
    /** The compact group this controller is responsible for */
    compactGroup: number | null;
    /** Creates the notification about a full disk */
    notificationHandler: NotificationHandler;
    /** Provides the number of running instances */
    instances: InstanceManager;
    /** The counters which are reported and reset on every run */
    statistics: Statistics;
    /** Lifecycle state, an empty compact group controller stops itself */
    state: ControllerState;
    /** Run fire-and-forget database writes in parallel and log any that reject */
    logWriteErrors: (writes: Promise<unknown>[], errorText: string) => void;
    /** Stops the controller, used by an empty compact group controller */
    stopController: (force?: boolean, exitProcess?: boolean) => Promise<void>;
}

/**
 * Cyclically reports the status of this host, like cpu and memory usage, into the states database
 */
export class HostStatusReporter {
    readonly #states: StatesClient;
    readonly #config: ioBroker.IoBrokerJson;
    readonly #logger: ControllerLogger;
    readonly #hostLogPrefix: string;
    readonly #hostObjectPrefix: ioBroker.ObjectIDs.Host;
    readonly #hostname: string;
    readonly #isCompactGroupController: boolean;
    readonly #compactGroup: number | null;
    readonly #notificationHandler: NotificationHandler;
    readonly #instances: InstanceManager;
    readonly #statistics: Statistics;
    readonly #state: ControllerState;
    readonly #logWriteErrors: (writes: Promise<unknown>[], errorText: string) => void;
    readonly #stopController: (force?: boolean, exitProcess?: boolean) => Promise<void>;

    /** Timer for the cyclic status report */
    #reportInterval: NodeJS.Timeout | null = null;
    /** Timestamp of the last disk size check */
    #lastDiskSizeCheck = 0;
    /** All measured event loop lags since the last report */
    #eventLoopLags: number[] = [];
    /** If less than this disk space free in %, generate a warning */
    #diskWarningLevel = DEFAULT_DISK_WARNING_LEVEL;

    /**
     * @param options Everything the status reporter needs to do its work
     */
    constructor(options: HostStatusReporterOptions) {
        this.#states = options.states;
        this.#config = options.config;
        this.#logger = options.logger;
        this.#hostLogPrefix = options.hostLogPrefix;
        this.#hostObjectPrefix = options.hostObjectPrefix;
        this.#hostname = options.hostname;
        this.#isCompactGroupController = options.isCompactGroupController;
        this.#compactGroup = options.compactGroup;
        this.#notificationHandler = options.notificationHandler;
        this.#instances = options.instances;
        this.#statistics = options.statistics;
        this.#state = options.state;
        this.#logWriteErrors = options.logWriteErrors;
        this.#stopController = options.stopController;
    }

    /**
     * Configure at which amount of free disk space in % a warning notification is created
     *
     * @param level The new warning level in percent
     */
    setDiskWarningLevel(level: number): void {
        this.#diskWarningLevel = level;
    }

    /**
     * Start the cyclic reporting of the host status
     */
    startAliveInterval(): void {
        const config = this.#config;
        const logger = this.#logger;
        const hostLogPrefix = this.#hostLogPrefix;
        const hostObjectPrefix = this.#hostObjectPrefix;

        // this is called again after every reconnect, do not leave the previous interval behind
        this.close();

        config.system = config.system || {};
        config.system.statisticsInterval = Math.round(config.system.statisticsInterval) || 15_000;
        config.system.checkDiskInterval =
            config.system.checkDiskInterval !== 0 ? Math.round(config.system.checkDiskInterval) || 300_000 : 0;

        if (!this.#isCompactGroupController) {
            // Provide info to see for each host if compact is enabled or not and be able to use in Admin or such
            this.#states
                .setState(`${hostObjectPrefix}.compactModeEnabled`, {
                    ack: true,
                    from: hostObjectPrefix,
                    val: config.system.compact || false,
                })
                .catch(e => logger.error(`${hostLogPrefix} Cannot set compactModeEnabled state: ${e.message}`));
        }

        this.#reportInterval = setInterval(
            () => this.reportStatus().catch(e => logger.error(`${hostLogPrefix} Cannot report status: ${e.message}`)),
            config.system.statisticsInterval,
        );

        this.reportStatus().catch(e => logger.error(`${hostLogPrefix} Cannot report status: ${e.message}`));
        tools.measureEventLoopLag(1_000, lag => this.#eventLoopLags.push(lag!));
    }

    /**
     * Write the current status of this host into the states database
     */
    async reportStatus(): Promise<void> {
        const states = this.#states;
        const config = this.#config;
        const logger = this.#logger;
        const hostLogPrefix = this.#hostLogPrefix;
        const instances = this.#instances;
        const id = this.#hostObjectPrefix;

        this.#statistics.countOutput(10);

        states
            .setState(`${id}.alive`, {
                val: true,
                ack: true,
                expire: Math.floor(config.system.statisticsInterval / 1_000) + 10,
                from: id,
            })
            .catch(e => logger.error(`${hostLogPrefix} Cannot update host alive state: ${e.message}`));

        // provide infos about current process

        // pidUsage([pid,pid,...], function (err, stats) {
        // => {
        //   cpu: 10.0,            // percentage (from 0 to 100*vcore)
        //   memory: 357306368,    // bytes
        //   ppid: 312,            // PPID
        //   pid: 727,             // PID
        //   ctime: 867000,        // ms user + system time
        //   elapsed: 6650000,     // ms since the start of the process
        //   timestamp: 864000000  // ms since epoch
        // }
        try {
            const stats = await pidUsage(process.pid);

            if (stats) {
                this.#logWriteErrors(
                    [
                        states.setState(`${id}.cpu`, {
                            ack: true,
                            from: id,
                            val: Math.round(100 * stats.cpu) / 100,
                        }),
                        states.setState(`${id}.cputime`, { ack: true, from: id, val: stats.ctime / 1_000 }),
                    ],
                    'Cannot update process status states',
                );
                this.#statistics.countOutput(2);
            }
        } catch (e) {
            logger.error(`${hostLogPrefix} Cannot read pidUsage data : ${e.message}`);
        }

        try {
            const mem = process.memoryUsage();
            this.#logWriteErrors(
                [
                    states.setState(`${id}.memRss`, {
                        val: Math.round(mem.rss / 10485.76 /* 1MB / 100 */) / 100,
                        ack: true,
                        from: id,
                    }),
                    states.setState(`${id}.memHeapTotal`, {
                        val: Math.round(mem.heapTotal / 10485.76 /* 1MB / 100 */) / 100,
                        ack: true,
                        from: id,
                    }),
                    states.setState(`${id}.memHeapUsed`, {
                        val: Math.round(mem.heapUsed / 10485.76 /* 1MB / 100 */) / 100,
                        ack: true,
                        from: id,
                    }),
                ],
                'Cannot update memory status states',
            );
        } catch (e) {
            logger.error(`${hostLogPrefix} Cannot read memoryUsage data: ${e.message}`);
        }

        // provide machine infos
        this.#logWriteErrors(
            [
                states.setState(`${id}.load`, { val: Math.round(os.loadavg()[0] * 100) / 100, ack: true, from: id }),
                states.setState(`${id}.uptime`, { val: Math.round(process.uptime()), ack: true, from: id }),
                states.setState(`${id}.mem`, {
                    val: Math.round(100 - (os.freemem() / os.totalmem()) * 100),
                    ack: true,
                    from: id,
                }),
                states.setState(`${id}.freemem`, {
                    val: Math.round(os.freemem() / 1_048_576 /* 1MB */),
                    ack: true,
                    from: id,
                }),
            ],
            'Cannot update machine status states',
        );

        if (fs.existsSync('/proc/meminfo')) {
            try {
                const text = fs.readFileSync('/proc/meminfo', 'utf8');
                const m = text && text.match(/MemAvailable:\s*(\d+)/);
                if (m && m[1]) {
                    states
                        .setState(`${id}.memAvailable`, {
                            val: Math.round(parseInt(m[1], 10) * 0.001024),
                            ack: true,
                            from: id,
                        })
                        .catch(e => logger.error(`${hostLogPrefix} Cannot update memAvailable state: ${e.message}`));
                    this.#statistics.countOutput();
                }
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot read /proc/meminfo: ${e.message}`);
            }
        }

        if (
            config.system.checkDiskInterval &&
            Date.now() - this.#lastDiskSizeCheck >= config.system.checkDiskInterval
        ) {
            this.#lastDiskSizeCheck = Date.now();
            let info: GetDiskInfoResponse | null = null;

            try {
                info = await tools.getDiskInfo();
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot read disk size: ${e.message}`);
            }

            try {
                if (info) {
                    const diskSize = Math.round((info['Disk size'] || 0) / (1024 * 1024));
                    const diskFree = Math.round((info['Disk free'] || 0) / (1024 * 1024));
                    const percentageFree = (diskFree / diskSize) * 100;
                    const isDiskWarningActive = percentageFree < this.#diskWarningLevel;

                    if (isDiskWarningActive) {
                        await this.#notificationHandler.addMessage({
                            scope: 'system',
                            category: 'diskSpaceIssues',
                            message: `Your system has only ${percentageFree.toFixed(2)} % of disk space left.`,
                            instance: `system.host.${this.#hostname}`,
                        });
                    }

                    this.#logWriteErrors(
                        [
                            states.setState(`${id}.diskSize`, { val: diskSize, ack: true, from: id }),
                            states.setState(`${id}.diskFree`, { val: diskFree, ack: true, from: id }),
                        ],
                        'Cannot update disk status states',
                    );

                    this.#statistics.countOutput(2);
                }
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot read disk information: ${e.message}`);
            }
        }

        // some statistics
        this.#logWriteErrors(
            [
                states.setState(`${id}.inputCount`, { val: this.#statistics.inputCount, ack: true, from: id }),
                states.setState(`${id}.outputCount`, { val: this.#statistics.outputCount, ack: true, from: id }),
            ],
            'Cannot update statistics states',
        );

        if (this.#eventLoopLags.length) {
            const eventLoopLag = Math.ceil(this.#eventLoopLags.reduce((a, b) => a + b) / this.#eventLoopLags.length);
            // average of measured values
            states
                .setState(`${id}.eventLoopLag`, { val: eventLoopLag, ack: true, from: id })
                .catch(e => logger.error(`${hostLogPrefix} Cannot update eventLoopLag state: ${e.message}`));
            this.#eventLoopLags = [];
        }

        states
            .setState(`${id}.compactgroupProcesses`, {
                val: Object.keys(instances.compactProcs).length,
                ack: true,
                from: id,
            })
            .catch(e => logger.error(`${hostLogPrefix} Cannot update compactgroupProcesses state: ${e.message}`));

        let realProcesses = 0;
        let compactProcesses = 0;
        Object.values(instances.procs).forEach(proc => {
            if (proc.process) {
                if (proc.startedInCompactMode) {
                    compactProcesses++;
                } else {
                    realProcesses++;
                }
            }
        });

        this.#logWriteErrors(
            [
                states.setState(`${id}.instancesAsProcess`, { val: realProcesses, ack: true, from: id }),
                states.setState(`${id}.instancesAsCompact`, { val: compactProcesses, ack: true, from: id }),
            ],
            'Cannot update instance count states',
        );

        this.#statistics.reset();

        if (
            !this.#state.isStopping &&
            this.#isCompactGroupController &&
            this.#state.started &&
            compactProcesses === 0 &&
            realProcesses === 0
        ) {
            logger.info(
                `${hostLogPrefix} Compact group controller ${this.#compactGroup} does not own any processes, stop`,
            );
            await this.#stopController(false);
        }
    }

    /**
     * Stop the cyclic reporting of the host status
     */
    close(): void {
        if (this.#reportInterval) {
            clearInterval(this.#reportInterval);
            this.#reportInterval = null;
        }
    }
}
