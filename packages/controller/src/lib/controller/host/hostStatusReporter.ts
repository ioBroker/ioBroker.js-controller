import os from 'node:os';
import fs from 'fs-extra';
import pidUsage from 'pidusage';
import { tools } from '@iobroker/js-controller-common';
import type { GetDiskInfoResponse } from '@iobroker/js-controller-common-db/tools';
import type { Controller } from '@/lib/controller/controller.js';

/**
 * Cyclically reports the status of this host, like cpu and memory usage, into the states database
 */
export class HostStatusReporter {
    /** Timer for the cyclic status report */
    private reportInterval: NodeJS.Timeout | null = null;
    /** Timestamp of the last disk size check */
    private lastDiskSizeCheck = 0;
    /** All measured event loop lags since the last report */
    private eventLoopLags: number[] = [];

    /**
     * @param controller The controller this status reporter belongs to
     */
    constructor(private readonly controller: Controller) {}

    /**
     * Start the cyclic reporting of the host status
     */
    startAliveInterval(): void {
        const { config, states, logger, hostLogPrefix, hostObjectPrefix, isCompactGroupController } = this.controller;

        config.system = config.system || {};
        config.system.statisticsInterval = Math.round(config.system.statisticsInterval) || 15_000;
        config.system.checkDiskInterval =
            config.system.checkDiskInterval !== 0 ? Math.round(config.system.checkDiskInterval) || 300_000 : 0;

        if (!isCompactGroupController) {
            // Provide info to see for each host if compact is enabled or not and be able to use in Admin or such
            states!
                .setState(`${hostObjectPrefix}.compactModeEnabled`, {
                    ack: true,
                    from: hostObjectPrefix,
                    val: config.system.compact || false,
                })
                .catch(e => logger.error(`${hostLogPrefix} Cannot set compactModeEnabled state: ${e.message}`));
        }

        this.reportInterval = setInterval(
            () => this.reportStatus().catch(e => logger.error(`${hostLogPrefix} Cannot report status: ${e.message}`)),
            config.system.statisticsInterval,
        );

        this.reportStatus().catch(e => logger.error(`${hostLogPrefix} Cannot report status: ${e.message}`));
        tools.measureEventLoopLag(1_000, lag => this.eventLoopLags.push(lag!));
    }

    /**
     * Write the current status of this host into the states database
     */
    async reportStatus(): Promise<void> {
        const {
            config,
            states,
            logger,
            hostLogPrefix,
            hostObjectPrefix,
            hostname,
            notificationHandler,
            instances,
            isCompactGroupController,
        } = this.controller;

        if (!states) {
            return;
        }

        const id = hostObjectPrefix;
        this.controller.outputCount += 10;

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

            // controller.s might be stopped, but this is still running
            if (states.setState && stats) {
                this.controller.logWriteErrors(
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
                this.controller.outputCount += 2;
            }
        } catch (e) {
            logger.error(`${hostLogPrefix} Cannot read pidUsage data : ${e.message}`);
        }

        try {
            const mem = process.memoryUsage();
            this.controller.logWriteErrors(
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
        this.controller.logWriteErrors(
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
                    this.controller.outputCount++;
                }
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot read /proc/meminfo: ${e.message}`);
            }
        }

        if (config.system.checkDiskInterval && Date.now() - this.lastDiskSizeCheck >= config.system.checkDiskInterval) {
            this.lastDiskSizeCheck = Date.now();
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
                    const isDiskWarningActive = percentageFree < this.controller.diskWarningLevel;

                    if (isDiskWarningActive) {
                        await notificationHandler.addMessage({
                            scope: 'system',
                            category: 'diskSpaceIssues',
                            message: `Your system has only ${percentageFree.toFixed(2)} % of disk space left.`,
                            instance: `system.host.${hostname}`,
                        });
                    }

                    this.controller.logWriteErrors(
                        [
                            states.setState(`${id}.diskSize`, { val: diskSize, ack: true, from: id }),
                            states.setState(`${id}.diskFree`, { val: diskFree, ack: true, from: id }),
                        ],
                        'Cannot update disk status states',
                    );

                    this.controller.outputCount += 2;
                }
            } catch (e) {
                logger.error(`${hostLogPrefix} Cannot read disk information: ${e.message}`);
            }
        }

        // some statistics
        this.controller.logWriteErrors(
            [
                states.setState(`${id}.inputCount`, { val: this.controller.inputCount, ack: true, from: id }),
                states.setState(`${id}.outputCount`, { val: this.controller.outputCount, ack: true, from: id }),
            ],
            'Cannot update statistics states',
        );

        if (this.eventLoopLags.length) {
            const eventLoopLag = Math.ceil(this.eventLoopLags.reduce((a, b) => a + b) / this.eventLoopLags.length);
            // average of measured values
            states
                .setState(`${id}.eventLoopLag`, { val: eventLoopLag, ack: true, from: id })
                .catch(e => logger.error(`${hostLogPrefix} Cannot update eventLoopLag state: ${e.message}`));
            this.eventLoopLags = [];
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

        this.controller.logWriteErrors(
            [
                states.setState(`${id}.instancesAsProcess`, { val: realProcesses, ack: true, from: id }),
                states.setState(`${id}.instancesAsCompact`, { val: compactProcesses, ack: true, from: id }),
            ],
            'Cannot update instance count states',
        );

        this.controller.inputCount = 0;
        this.controller.outputCount = 0;

        if (
            !this.controller.isStopping &&
            isCompactGroupController &&
            this.controller.started &&
            compactProcesses === 0 &&
            realProcesses === 0
        ) {
            logger.info(
                `${hostLogPrefix} Compact group controller ${this.controller.compactGroup} does not own any processes, stop`,
            );
            await this.controller.stop(false);
        }
    }

    /**
     * Stop the cyclic reporting of the host status
     */
    close(): void {
        if (this.reportInterval) {
            clearInterval(this.reportInterval);
            this.reportInterval = null;
        }
    }
}
