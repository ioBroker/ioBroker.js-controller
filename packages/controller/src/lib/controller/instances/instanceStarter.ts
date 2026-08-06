import os from 'node:os';
import path from 'node:path';
import fs from 'fs-extra';
import cp from 'node:child_process';
import semver from 'semver';
import decache from 'decache';
import { createRequire } from 'node:module';
import { isInstalledFromNpm, tools } from '@iobroker/js-controller-common';
import { SYSTEM_HOST_PREFIX } from '@iobroker/js-controller-common-db/constants';
import { isAdapterEsmModule } from '@iobroker/js-controller-common-db/tools';
import { cleanErrors, determineRebuildArgsFromLog } from '@/lib/controller/helpers.js';
import { checkVersions } from '@/lib/controller/dependencyChecker.js';
import { createInstanceExitHandler } from '@/lib/controller/instances/instanceExitHandler.js';
import type { Controller } from '@/lib/controller/controller.js';
import type { Process } from '@/lib/controller/types.js';

// eslint-disable-next-line unicorn/prefer-module
const require = createRequire(import.meta.url || `file://${__filename}`);

/** Everything which is needed to start the process of an instance */
interface DaemonLaunchContext {
    /** The id of the instance, like `system.adapter.hm-rpc.0` */
    id: ioBroker.ObjectIDs.Instance;
    /** The instance object */
    instance: ioBroker.InstanceObject;
    /** Name of the adapter */
    name: string;
    /** Number of the instance as string */
    instanceNo: string;
    /** The mode the instance is started with */
    mode: string;
    /** If the instance is only started to be woken up */
    wakeUp: boolean;
    /** Args passed to the actual adapter code */
    args: string[];
    /** Args passed to Node.js */
    execArgv: string[];
    /** Directory of the adapter */
    adapterDir: string;
    /** Full path of the main file of the adapter */
    adapterMainFile: string;
    /** Called as soon as the process of the instance has exited */
    exitHandler: (code: number, signal: string) => void;
}

/** Limit the collected stderr output of an instance to this number of messages */
const MAX_STORED_ERRORS = 300;

/**
 * Performs all checks which are needed to start an instance and finally starts its process
 */
export class InstanceStarter {
    /**
     * @param controller The controller this instance starter belongs to
     */
    constructor(private readonly controller: Controller) {}

    /**
     * Start given instance
     *
     * @param id - id of instance, like 'system.adapter.hm-rpc.0'
     * @param wakeUp Whether the instance is being started because of a wake-up (scheduled or message) event
     */
    async startInstance(id: ioBroker.ObjectIDs.Instance, wakeUp = false): Promise<void> {
        const {
            objects,
            logger,
            hostLogPrefix,
            hostname,
            ioPackage,
            notificationHandler,
            blocklistManager,
            instances,
        } = this.controller;
        const { procs } = instances;

        if (this.controller.isStopping || !this.controller.connected || !objects) {
            return;
        }

        const proc = procs[id];

        if (!proc) {
            logger.error(`${hostLogPrefix} startInstance ${id}: object not found!`);
            return;
        }

        const instance = proc.config;
        const name = id.split('.')[2];
        let mode = instance.common.mode;

        if (proc.restartTimer) {
            clearTimeout(proc.restartTimer);
            delete proc.restartTimer;
        }

        proc.restartExpected = false;

        if (wakeUp && mode !== 'extension') {
            mode = 'daemon';
        }

        // Check if all required adapters installed and have a valid version
        if (instance.common.dependencies || instance.common.globalDependencies) {
            try {
                await checkVersions({
                    objects,
                    id,
                    deps: instance.common.dependencies,
                    globalDeps: instance.common.globalDependencies,
                    hostname,
                    controllerVersion: ioPackage.common.version,
                    logger,
                    logPrefix: hostLogPrefix,
                });
            } catch (e) {
                logger.error(`${hostLogPrefix} startInstance ${id} ${e.message}`);
                // Do not start this instance
                return;
            }
        }

        const adapterDir = tools.getAdapterDir(name);
        if (adapterDir === null || !fs.existsSync(adapterDir)) {
            proc.downloadRetry = proc.downloadRetry || 0;
            logger.debug(`${hostLogPrefix} startInstance Queue ${id} for installation`);
            instances.installQueue.push({
                id,
                version: instance.common.installedVersion || instance.common.version,
                installedFrom: instance.common.installedFrom,
                wakeUp,
            });
            return;
        }

        const loglevel = instance.common.loglevel || 'info';
        const instanceNo = instance._id.split('.').pop() || '0';
        /** Args passed to the actual adapter code */
        const args =
            instance?._id && instance.common
                ? ['--instance', instanceNo, '--loglevel', loglevel]
                : ['--instance', '0', '--loglevel', 'info'];

        /** Args passed to Node.js */
        const execArgv: string[] = [];

        // define memory limit for adapter
        if (instance.common.memoryLimitMB && Math.round(instance.common.memoryLimitMB)) {
            execArgv.push(`--max-old-space-size=${Math.round(instance.common.memoryLimitMB)}`);
        }

        if (Array.isArray(instance.common.nodeProcessParams) && instance.common.nodeProcessParams.length) {
            execArgv.push(...instance.common.nodeProcessParams);

            if (instance.common.compact) {
                instance.common.compact = false;
                logger.warn(
                    `${hostLogPrefix} Adapter ${instance.common.name} has "compact=true" as well as "nodeProcessParams" specified, this is not supported, please report to developer`,
                );
            }
        }

        try {
            // check if the io-package content is uploaded to the database
            const ioPack = fs.readJSONSync(path.join(adapterDir, 'io-package.json'));

            if (ioPack.common.version !== instance.common.version) {
                logger.warn(`${hostLogPrefix} Detected missing upload of adapter "${name}" - starting upload now.`);
                await this.controller.uploadAdapter({ adapter: name });
                return;
            }
        } catch (e) {
            logger.error(
                `${hostLogPrefix} startInstance ${name}.${instanceNo}: Error while ensuring adapter is uploaded: ${e.message}`,
            );
        }

        const isBlocked = await blocklistManager.isAdapterVersionBlocked({
            version: instance.common.version,
            adapterName: instance.common.name,
        });

        if (isBlocked) {
            const message = `Do not start instance "${id}", because the version "${instance.common.version}" has been blocked by the developer`;
            logger.error(`${hostLogPrefix} ${message}`);

            await notificationHandler.addMessage({
                scope: 'system',
                category: 'blockedVersions',
                message,
                instance: SYSTEM_HOST_PREFIX + hostname,
            });
            return;
        }

        // workaround for old vis
        if (instance.common.onlyWWW && name === 'vis') {
            instance.common.onlyWWW = false;
        }

        // www-only adapters have no start file
        if (instance.common.onlyWWW) {
            logger.debug(`${hostLogPrefix} startInstance ${name}.${instanceNo} only WWW files. Nothing to start`);
            return;
        }

        let adapterMainFile: string;
        // Web extensions have a separate field for the main file. We don't need to search it in that case
        if (instance.common.mode !== 'extension') {
            try {
                adapterMainFile = await tools.resolveAdapterMainFile(name);
            } catch {
                logger.error(`${hostLogPrefix} startInstance ${name}.${instanceNo}: cannot find start file!`);
                return;
            }
        }

        proc.downloadRetry = 0;

        // read node.js engine requirements
        try {
            // read directly from disk and not via require to allow "on the fly" updates of adapters.
            const packJSON = fs.readJSONSync(path.join(adapterDir, 'package.json'));
            proc.engine = packJSON?.engines?.node;
        } catch {
            logger.error(
                `${hostLogPrefix} startInstance ${name}.${instanceNo}: Cannot read and parse "${adapterDir}/package.json"`,
            );
        }

        // check node.js version if defined in package.json
        if (proc.engine) {
            if (!semver.satisfies(process.version.replace(/^v/, ''), proc.engine)) {
                logger.warn(
                    `${hostLogPrefix} startInstance ${name}.${instanceNo}: required Node.js version ${proc.engine}, actual version ${process.version}`,
                );
                // disable instance
                const obj = await objects.getObject(id);
                if (obj?.common?.enabled) {
                    obj.common.enabled = false;
                    await objects.setObject(obj._id, obj);
                    logger.warn(
                        `${hostLogPrefix} startInstance ${name}.${instanceNo}: instance disabled because of Node.js version mismatch`,
                    );
                }
                return;
            }
        }

        await this.checkAvailableMemory();

        proc.startedInCompactMode = false;
        proc.startedAsCompactGroup = false;

        if (proc.config?.notifications) {
            try {
                await notificationHandler.addConfig(proc.config.notifications);
                logger.debug(`${hostLogPrefix} added notifications configuration of ${id}`);
            } catch (e) {
                logger.error(`${hostLogPrefix} Could not add notifications config of ${id}: ${e.message}`);
            }
        }

        switch (mode) {
            case 'once':
            case 'daemon':
                await this.startDaemon({
                    id,
                    instance,
                    name,
                    instanceNo,
                    mode,
                    wakeUp,
                    args,
                    execArgv,
                    adapterDir,
                    adapterMainFile: adapterMainFile!,
                    exitHandler: createInstanceExitHandler(this.controller, { id, instance, mode, wakeUp }),
                });
                break;

            case 'schedule':
                instances.scheduler.scheduleInstance({
                    id,
                    instance,
                    proc,
                    adapterMainFile: adapterMainFile!,
                    adapterDir,
                    args,
                    execArgv,
                    wakeUp,
                });
                break;

            case 'extension':
                break;

            default:
                logger.error(`${hostLogPrefix} ${instance._id} has the invalid mode "${mode}"`);
        }
    }

    /**
     * Check how much memory is left and log a warning or error if it is critical
     */
    private async checkAvailableMemory(): Promise<void> {
        const { config, logger, hostLogPrefix, hostname, notificationHandler } = this.controller;

        let availableMemMB;

        if (fs.existsSync('/proc/meminfo')) {
            // on linux we read mem available
            try {
                const text = fs.readFileSync('/proc/meminfo', 'utf8');
                const m = text && text.match(/MemAvailable:\s*(\d+)/);
                if (m && m[1]) {
                    availableMemMB = Math.round(parseInt(m[1], 10) * 0.001024); // convert to MB
                }
            } catch (err) {
                logger.warn(`${hostLogPrefix} Cannot read /proc/meminfo: ${err}`);
            }
        } else {
            // else just use freemem
            availableMemMB = Math.round(os.freemem() / 1048576); // convert to MB
        }

        // default: if less than 100 MB log warning, less than 50 MB log error, but check config first
        if (
            availableMemMB === undefined ||
            availableMemMB >= (typeof config.system.memLimitWarn === 'number' ? config.system.memLimitWarn : 100)
        ) {
            return;
        }

        if (availableMemMB < (typeof config.system.memLimitError === 'number' ? config.system.memLimitError : 50)) {
            logger.error(
                `${hostLogPrefix} Your system has only ${availableMemMB} MB RAM left available and an additional adapter process is started. Please check your system, settings and active instances to prevent swapping and Out-Of-Memory situations!`,
            );
            logger.error(`${hostLogPrefix} In future versions, the adapter might not be started!`);
        } else {
            logger.warn(
                `${hostLogPrefix} Your system has only ${availableMemMB} MB RAM left available and an additional adapter process is started. Please check your system, settings and active instances to prevent swapping and Out-Of-Memory situations!`,
            );
        }

        // add it to notifications for popup
        try {
            await notificationHandler.addMessage({
                scope: 'system',
                category: 'memIssues',
                message: `Your system has only ${availableMemMB} MB RAM left available and an additional adapter process is started. Please check your system, settings and active instances to prevent swapping and Out-Of-Memory situations!`,
                instance: `system.host.${hostname}`,
            });
        } catch (e) {
            logger.warn(`${hostLogPrefix} Could not add OOM notification: ${e.message}`);
        }
    }

    /**
     * Start an instance of mode `daemon` or `once`
     *
     * @param ctx Everything which is needed to start the process of the instance
     */
    private async startDaemon(ctx: DaemonLaunchContext): Promise<void> {
        const { id, instance, name, instanceNo, wakeUp } = ctx;
        const { states, config, logger, hostLogPrefix, hostObjectPrefix, instances, isCompactGroupController } =
            this.controller;
        const proc = instances.procs[id];

        if (proc?.process) {
            if (!wakeUp && proc) {
                logger.warn(
                    `${hostLogPrefix} instance ${instance._id} ${
                        proc.stopping ? 'still' : 'already'
                    } running with pid ${proc.process.pid}`,
                );
            }
            if (proc.stopping) {
                delete proc.stopping;
            }
            return;
        }

        if (!proc) {
            return;
        }

        instances.allInstancesStopped = false;
        if (proc.stopping) {
            delete proc.stopping;
        }

        logger.debug(
            `${hostLogPrefix} startInstance ${name}.${instanceNo} loglevel=${instance.common.loglevel || 'info'}, compact=${
                instance.common.compact && instance.common.runAsCompactMode
                    ? `true (${instance.common.compactGroup})`
                    : 'false'
            }`,
        );

        // If system has compact mode enabled and adapter supports it and instance has it enabled
        if (config.system.compact && instance.common.compact && instance.common.runAsCompactMode) {
            // compact group = 0 is executed by main js.controller, all others as own processes
            if (
                (!isCompactGroupController && instance.common.compactGroup === 0) ||
                (isCompactGroupController && instance.common.compactGroup !== 0)
            ) {
                await this.startInCompactMode(ctx);
            } else {
                instances.compactGroups.startInstanceInGroup(id, instance, proc);
            }
        } else {
            try {
                // set to 0 to stop any pot. already running instances, especially broken compactModes
                await states!.setState(`${id}.sigKill`, {
                    val: 0,
                    ack: false,
                    from: hostObjectPrefix,
                });
            } catch {
                // ignore
            }
        }

        this.handleAdapterProcessStart(ctx);
    }

    /**
     * Start the adapter inside the process of this controller
     *
     * @param ctx Everything which is needed to start the instance
     */
    private async startInCompactMode(ctx: DaemonLaunchContext): Promise<void> {
        const { id, instance, name, adapterMainFile, exitHandler } = ctx;
        const { states, logger, hostLogPrefix, hostObjectPrefix, instances } = this.controller;

        try {
            // set to 0 to stop any pot. already running instances, especially broken compactModes
            await states!.setState(`${id}.sigKill`, { val: 0, ack: false, from: hostObjectPrefix });
        } catch {
            // ignore
        }

        const proc = instances.procs[id];
        const _instance = instance?._id && instance.common ? instance._id.split('.').pop() || 0 : 0;
        const logLevel = instance?._id && instance.common ? instance.common.loglevel || 'info' : 'info';

        if (adapterMainFile) {
            try {
                // @ts-expect-error commonjs module TODO: validate
                decache(adapterMainFile);

                // Prior to requiring the main file, make sure that the esbuild require hook was loaded
                // if this is a TypeScript adapter
                if (adapterMainFile.endsWith('.ts')) {
                    require('@alcalzone/esbuild-register');
                }

                const module = (await isAdapterEsmModule(name))
                    ? (await import(`${adapterMainFile}?update=${Date.now()}`)).default
                    : require(adapterMainFile);

                proc.process = {
                    // @ts-expect-error TODO type compact processes too
                    logic: module({
                        logLevel,
                        compactInstance: _instance,
                        compact: true,
                    }),
                };

                // @ts-expect-error todo add types for compact adapter procs
                proc.process.logic.on('exit', exitHandler);

                proc.startedInCompactMode = true;
            } catch (e) {
                logger.error(
                    `${hostLogPrefix} Cannot start ${name}.${_instance} in compact mode. Fallback to normal start: ${e.message}`,
                );
                logger.error(e.stackTrace);
                if (proc.process) {
                    delete proc.process;
                }

                // if started, let it end itself
                await states!.setState(`${id}.sigKill`, {
                    val: -1,
                    ack: false,
                    from: hostObjectPrefix,
                });
            }
        } else {
            logger.warn(`${hostLogPrefix} Cannot start ${name}.${_instance} in compact mode: Filename invalid`);
        }

        if (proc.process && !proc.process.kill) {
            proc.process.kill = () => {
                states!
                    .setState(`${id}.sigKill`, {
                        val: -1,
                        ack: false,
                        from: hostObjectPrefix,
                    })
                    .catch(e => logger.error(`${hostLogPrefix} Cannot set ${id}.sigKill: ${e.message}`));

                return true;
            };
        }
    }

    /**
     * Some parts of the adapter start logic are async, so "the finalization" is put into this method
     *
     * @param ctx Everything which is needed to start the instance
     */
    private handleAdapterProcessStart(ctx: DaemonLaunchContext): void {
        const { id, instance, mode, wakeUp, args, execArgv, adapterDir, adapterMainFile, exitHandler } = ctx;
        const { states, logger, hostLogPrefix, hostObjectPrefix, instances } = this.controller;

        const proc: Process = instances.procs[id];

        if (!proc) {
            return;
        }

        if (!proc.process) {
            // We were not able or should not start as compact mode
            try {
                proc.process = cp.fork(adapterMainFile, args, {
                    execArgv: [...tools.getDefaultNodeArgs(adapterMainFile), ...execArgv],
                    stdio: ['ignore', 'ignore', 'pipe', 'ipc'],
                    // @ts-expect-error missing from types, but we already tested it is needed
                    windowsHide: true,
                    cwd: adapterDir,
                });
            } catch (err) {
                logger.error(`${hostLogPrefix} instance ${instance._id} could not be started: ${err}`);
            }
        }

        if (!proc.startedInCompactMode && !proc.startedAsCompactGroup && proc.process) {
            states!
                .setState(`${id}.sigKill`, {
                    val: proc.process.pid,
                    ack: true,
                    from: hostObjectPrefix,
                })
                .catch(e => logger.error(`${hostLogPrefix} Cannot set ${id}.sigKill: ${e.message}`));
        }

        // catch error output
        if (!proc.startedInCompactMode && !proc.startedAsCompactGroup && proc.process?.stderr) {
            proc.process.stderr.on('data', data => {
                const proc = instances.procs[id];

                if (!data || !proc || !tools.isObject(proc)) {
                    return;
                }
                const text = data.toString();

                // show for debug
                console.error(text);
                if (
                    text.includes('NODE_MODULE_VERSION') ||
                    text.includes('npm rebuild') ||
                    text.includes("Error: The module '") ||
                    text.includes('Could not locate the bindings file.') ||
                    text.includes('Cannot find module')
                ) {
                    // only try this at second rebuild
                    if (proc.rebuildCounter === 1) {
                        proc.rebuildArgs = determineRebuildArgsFromLog({
                            text,
                            logger,
                            logPrefix: hostLogPrefix,
                        });
                    }
                    proc.needsRebuild = true;
                }
                proc.errors = proc.errors || [];
                const now = Date.now();
                proc.errors.push({ ts: now, text: text });
                // limit output to 300 messages
                if (proc.errors.length > MAX_STORED_ERRORS) {
                    proc.errors.splice(proc.errors.length - MAX_STORED_ERRORS);
                }
                cleanErrors({ procObj: proc, now, logger, logPrefix: hostLogPrefix });
            });
        }

        instances.storePids();

        if (!proc.startedInCompactMode && !proc.startedAsCompactGroup && proc.process) {
            proc.process.on('exit', exitHandler);
        }

        if (
            !wakeUp &&
            proc?.process &&
            proc.config.common?.enabled &&
            (proc.config.common.mode !== 'extension' || !proc.config.native.webInstance) &&
            mode !== 'once'
        ) {
            if (proc.startedInCompactMode) {
                logger.info(`${hostLogPrefix} instance ${instance._id} started in COMPACT mode`);
            } else if (proc.startedAsCompactGroup) {
                logger.info(
                    `${hostLogPrefix} instance ${instance._id} is handled by compact group controller pid ${proc.process.pid}`,
                );
            } else {
                const isNpm = isInstalledFromNpm({
                    installedFrom: instance.common.installedFrom,
                    adapterName: instance.common.name,
                });

                logger.info(
                    `${hostLogPrefix} instance ${instance._id} in version "${instance.common.version}"${!isNpm ? ` (non-npm: ${instance.common.installedFrom})` : ''} started with pid ${proc.process.pid}`,
                );
            }
        }
    }
}
