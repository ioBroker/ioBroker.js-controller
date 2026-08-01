import path from 'node:path';
import { spawn } from 'node:child_process';
import { EXIT_CODES, tools } from '@iobroker/js-controller-common';
import { getDefaultNodeArgs } from '@iobroker/js-controller-common-db/tools';
import type { Controller } from '@/lib/controller/controller.js';
import type { InstallQueueEntry } from '@/lib/controller/types.js';

/** How often the installation of an adapter is retried before it is given up */
const MAX_DOWNLOAD_RETRIES = 4;

/**
 * Installs and rebuilds adapters one after another, because npm cannot run in parallel
 */
export class InstallQueue {
    /** All adapters which are waiting for an installation or rebuild */
    private queue: InstallQueueEntry[] = [];

    /**
     * @param controller The controller this install queue belongs to
     */
    constructor(private readonly controller: Controller) {}

    /**
     * Check if the given instance is already queued for installation or rebuild
     *
     * @param id The instance id to look for
     */
    has(id: string): boolean {
        return this.queue.some(entry => entry.id === id);
    }

    /**
     * Get the queue entry of the given instance if it exists
     *
     * @param id The instance id to look for
     */
    find(id: string): InstallQueueEntry | undefined {
        return this.queue.find(entry => entry.id === id);
    }

    /**
     * Add an adapter to the installation queue and start the processing if it is not running yet
     *
     * @param entry The adapter which needs to be installed or rebuilt
     */
    push(entry: InstallQueueEntry): void {
        this.queue.push(entry);

        // start install queue if not started
        if (this.queue.length === 1) {
            this.processQueue();
        }
    }

    /**
     * Install or rebuild the first adapter of the queue
     */
    private processQueue(): void {
        const { states, objects, logger, hostLogPrefix, hostObjectPrefix, instances, isCompactGroupController } =
            this.controller;

        if (!this.queue.length) {
            return;
        }

        const task = this.queue[0];
        if (task.inProgress) {
            return;
        }

        let name = task.id.split('.')[2];
        if (task.version && !task.rebuild) {
            name += `@${task.version}`;
        }

        const commandScope = task.rebuild ? 'rebuild' : 'install';
        if (isCompactGroupController && !task.rebuild) {
            logger.info(
                `${hostLogPrefix} adapter ${name} is not installed, installation will be handled by main controller ... waiting `,
            );
            setImmediate(() => {
                this.queue.shift();
                this.processQueue();
            });
            return;
        }

        const proc = instances.procs[task.id];
        proc.downloadRetry = proc.downloadRetry ?? 0;

        if (proc?.downloadRetry >= MAX_DOWNLOAD_RETRIES) {
            if (task.rebuild) {
                logger.error(
                    `${hostLogPrefix} Cannot rebuild adapter "${name}". To retry it disable/enable the adapter or restart host. Also check the error messages in the log or execute "npm install --production" in adapter directory manually!`,
                );
            } else {
                logger.error(
                    `${hostLogPrefix} Cannot download and install adapter "${name}". To retry it disable/enable the adapter or restart host. Also check the error messages in the log!`,
                );
            }
            setTimeout(() => {
                this.queue.shift();
                this.processQueue();
            }, 500);
            return;
        }

        proc.downloadRetry++;

        if (task.rebuild) {
            logger.warn(
                `${hostLogPrefix} adapter "${name}" seems to be installed for a different version of Node.js. Trying to rebuild it... ${
                    instances.procs[task.id].rebuildCounter
                } attempt`,
            );
        } else {
            logger.warn(
                `${hostLogPrefix} startInstance cannot find adapter "${name}". Try to install it... ${proc.downloadRetry} attempt`,
            );
        }

        const mainFile = path.join(tools.getControllerDir(), `${tools.appName.toLowerCase()}.js`);
        const installArgs = [];
        const installOptions = { windowsHide: true };

        if (!task.rebuild && task.installedFrom && proc.downloadRetry < 3) {
            // two tries with installed location, afterward we try the normal npm version install
            if (tools.isShortGithubUrl(task.installedFrom) || task.installedFrom.includes('://')) {
                // Installing from URL supports raw http(s) and file URLs as well as the short GitHub URL format
                installArgs.push('url');
                installArgs.push(task.installedFrom);
                installArgs.push(task.id.split('.')[2]); // adapter name
            } else {
                installArgs.push('install');
                let installedFrom = task.installedFrom;
                if (installedFrom.startsWith(`${tools.appName}.`)) {
                    installedFrom = installedFrom.substring(tools.appName.length + 1);
                }
                installArgs.push(installedFrom);
            }
        } else {
            installArgs.push(commandScope);
            if (!task.rebuild) {
                installArgs.push(name);
            } else if (task.rebuildArgs) {
                installArgs.push(`${task.rebuildArgs.module}@${task.rebuildArgs.version}`);
                if (task.rebuildArgs.path) {
                    installArgs.push('--path');
                    installArgs.push(task.rebuildArgs.path);
                }
            }
        }

        logger.info(
            `${hostLogPrefix} ${tools.appName.toLowerCase()} ${installArgs.join(' ')}${
                task.rebuild
                    ? ''
                    : ` using ${proc.downloadRetry < 3 && task.installedFrom ? 'installedFrom' : 'installedVersion'}`
            }`,
        );

        installArgs.unshift(...getDefaultNodeArgs(mainFile), mainFile);

        /**
         * Start the instance of a finished task or tell the user why it is not started
         *
         * @param task The task which has been processed
         */
        const finishTask = (task: InstallQueueEntry): void => {
            if (!instances.procs[task.id]) {
                return;
            }

            instances.procs[task.id].needsRebuild = false;

            if (task.disabled) {
                logger.debug(
                    `${hostLogPrefix} ${tools.appName} ${commandScope} successful but the instance is disabled`,
                );
                return;
            }

            if (!instances.procs[task.id].config.common.enabled) {
                logger.info(
                    `${hostLogPrefix} startInstance ${task.id}: instance is disabled but should be started, re-enabling it`,
                );
                states!
                    .setState(`${task.id}.alive`, {
                        val: true,
                        ack: false,
                        from: hostObjectPrefix,
                    })
                    .catch(e => logger.error(`${hostLogPrefix} Cannot set ${task.id}.alive: ${e.message}`));
            } else if (task.rebuild) {
                // on rebuild, we send a restart signal via object change to also reach compact group processes
                objects!
                    .extendObject(task.id, {})
                    .catch(e => logger.error(`${hostLogPrefix} Cannot rebuild ${task.id}: ${e.message}`));
            } else {
                instances
                    .startInstance(task.id, task.wakeUp)
                    .catch(e => logger.error(`${hostLogPrefix} Cannot start instance ${task.id}: ${e.message}`));
            }
        };

        try {
            task.inProgress = true;
            const child = spawn(process.execPath, installArgs, installOptions);
            if (child.stdout) {
                child.stdout.on('data', data => {
                    data = data.toString().replace(/\n/g, '');
                    logger.info(`${hostLogPrefix} ${tools.appName} npm-${commandScope}: ${data}`);
                });
            }
            if (child.stderr) {
                child.stderr.on('data', data => {
                    data = data.toString().replace(/\n/g, '');
                    logger.error(`${hostLogPrefix} ${tools.appName} npm-${commandScope}: ${data}`);
                });
            }

            child.on('exit', exitCode => {
                logger.info(`${hostLogPrefix} ${tools.appName} npm-${commandScope}: exit ${exitCode}`);
                if (exitCode === EXIT_CODES.CANNOT_INSTALL_NPM_PACKET) {
                    task.inProgress = false;
                    // Move task to the end of the queue to try again (up to 3 times)
                    this.queue.shift();
                    this.queue.push(task);
                } else if (task.rebuild) {
                    // This was a rebuild - find all tasks that required a rebuild and "finish" them (including the current one)
                    // Since we rebuild globally now, they should all be done too.
                    const rebuildTasks = this.queue.filter(t => t.rebuild);
                    // Remove all rebuild tasks from the queue
                    this.queue = this.queue.filter(t => !t.rebuild);
                    rebuildTasks.forEach(t => finishTask(t));
                } else {
                    this.queue.shift();
                    finishTask(task);
                }

                setTimeout(() => this.processQueue(), 1_000);
            });
            child.on('error', err => {
                logger.error(
                    `${hostLogPrefix} Cannot execute "${tools.getControllerDir()}/${tools.appName.toLowerCase()}.js ${commandScope} ${name}: ${
                        err.message
                    }`,
                );
                setTimeout(() => {
                    this.queue.shift();
                    this.processQueue();
                }, 1_000);
            });
        } catch (err) {
            logger.error(
                `${hostLogPrefix} Cannot execute "${tools.getControllerDir()}/${tools.appName.toLowerCase()}.js ${commandScope} ${name}: ${err}`,
            );
            setTimeout(() => {
                this.queue.shift();
                this.processQueue();
            }, 1_000);
        }
    }
}
