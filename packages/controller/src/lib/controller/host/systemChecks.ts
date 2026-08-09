import fs from 'fs-extra';
import type cp from 'node:child_process';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { tools } from '@iobroker/js-controller-common';
import { SYSTEM_HOST_PREFIX } from '@iobroker/js-controller-common-db/constants';
import { PacketManager, type UpgradePacket } from '@iobroker/js-controller-cli';
import type { UpgradeArguments } from '@/lib/upgradeManager.js';
import { ControllerContextBase } from '@/lib/controller/contextBase.js';

// eslint-disable-next-line unicorn/prefer-module
const require = createRequire(import.meta.url || `file://${__filename}`);

/** This file exists on most linux systems if a reboot is required */
const REBOOT_REQUIRED_PATH = '/var/run/reboot-required';
/** This file contains a list of packages which require the reboot, separated by newline */
const REBOOT_REQUIRED_PACKAGES_PATH = '/var/run/reboot-required.pkgs';

/**
 * Checks the system this host runs on for available updates and other problems and creates notifications for them
 */
export class SystemChecks extends ControllerContextBase {
    /** If a system reboot is required */
    #isRebootRequired = false;

    /**
     * Check if the current redis Locale is supported, else register notification
     */
    async checkSystemLocaleSupported(): Promise<void> {
        const { notificationHandler, hostname } = this;

        const isSupported = await this.objects.isSystemLocaleSupported();

        if (!isSupported) {
            await notificationHandler.addMessage({
                category: 'system',
                scope: 'databaseErrors',
                message:
                    'Your redis server is using an unsupported locale. This can lead to unexpected behavior of your ioBroker installation as well as data loss. ' +
                    'Please configure your Redis Server according to https://forum.iobroker.net/topic/52976/wichtiger-hinweis-f%C3%BCr-redis-installationen?_=1678099836122',
                instance: `${SYSTEM_HOST_PREFIX}${hostname}`,
            });
        }
    }

    /**
     * Check if a new Docker Image version is available
     */
    async checkAvailableDockerUpdate(): Promise<void> {
        const { notificationHandler, hostObjectPrefix, hostname } = this;

        const dockerInfo = tools.getDockerInformation();

        if (!dockerInfo.isOfficial || !this.isStatesConnected) {
            return;
        }

        const states = this.states;

        const { isNew, lastUpdated, version } = await tools.getNewestDockerImageVersion();

        if (!isNew) {
            return;
        }

        const dockerVersionStateId = `${hostObjectPrefix}.availableDockerBuild`;
        const knownLastUpdated = (await states.getState(dockerVersionStateId))?.val;
        await states.setState(dockerVersionStateId, { val: lastUpdated, ack: true });

        if (knownLastUpdated === lastUpdated) {
            return;
        }

        await notificationHandler.addMessage({
            scope: 'system',
            category: 'dockerUpdate',
            message: `${version} (${lastUpdated})`,
            instance: `${SYSTEM_HOST_PREFIX}${hostname}`,
        });
    }

    /**
     * Check for updatable OS packages and register them as notification
     */
    async listUpdatableOsPackages(): Promise<void> {
        const { notificationHandler, hostObjectPrefix, hostname } = this;

        if (tools.isDocker() || !this.isStatesConnected) {
            return;
        }

        const states = this.states;

        const packManager = new PacketManager();
        await packManager.ready();

        const packages = await packManager.listUpgradeablePackages();

        const packageStateId = `${hostObjectPrefix}.osPackageUpdates`;
        const packagesState = await states.getState(packageStateId);

        await states.setState(packageStateId, { val: JSON.stringify(packages), ack: true });

        if (!packages.length) {
            await notificationHandler.clearNotifications(
                'system',
                'packageUpdates',
                `${SYSTEM_HOST_PREFIX}${hostname}`,
            );
            return;
        }

        const knownPackages: string[] = typeof packagesState?.val === 'string' ? JSON.parse(packagesState.val) : [];
        const hasNewPackage = packages.some(pack => !knownPackages.includes(pack));

        if (!hasNewPackage) {
            return;
        }

        await notificationHandler.addMessage({
            scope: 'system',
            category: 'packageUpdates',
            message: packages.join('\n'),
            instance: `${SYSTEM_HOST_PREFIX}${hostname}`,
        });
    }

    /**
     * Upgrade given operating system packages
     *
     * @param packages package names and version information
     */
    async upgradeOsPackages(packages: UpgradePacket[]): Promise<void> {
        const packManager = new PacketManager();
        await packManager.ready();

        await packManager.upgrade(packages);
    }

    /**
     * Start a detached process of the upgrade manager
     * Handles Docker installation accordingly
     *
     * @param options Arguments passed to the UpgradeManager process
     */
    async startUpgradeManager(options: UpgradeArguments): Promise<void> {
        const { version, adminInstance, uid, gid } = options;
        const upgradeProcessPath = require.resolve('../../upgradeManager');
        let upgradeProcess: cp.ChildProcess;

        const isSystemd = await tools.isIoBrokerInstalledAsSystemd();

        if (isSystemd) {
            upgradeProcess = spawn(
                'sudo',
                [
                    'systemd-run',
                    '--no-ask-password',
                    process.execPath,
                    upgradeProcessPath,
                    version,
                    adminInstance.toString(),
                    uid.toString(),
                    gid.toString(),
                ],
                {
                    detached: true,
                    stdio: 'ignore',
                },
            );
        } else {
            upgradeProcess = spawn(
                process.execPath,
                [upgradeProcessPath, version, adminInstance.toString(), uid.toString(), gid.toString()],
                {
                    detached: true,
                    stdio: 'ignore',
                },
            );
        }

        upgradeProcess.unref();
    }

    /**
     * Checks if a system reboot is required and generates a notification if this is the case
     */
    async checkRebootRequired(): Promise<void> {
        const { logger, hostLogPrefix, notificationHandler, hostname } = this;

        if (process.platform !== 'linux' || this.#isRebootRequired) {
            return;
        }

        this.#isRebootRequired = await fs.pathExists(REBOOT_REQUIRED_PATH);

        if (!this.#isRebootRequired) {
            return;
        }

        let message = 'At least one package update requires a system reboot';

        try {
            const content = await fs.readFile(REBOOT_REQUIRED_PACKAGES_PATH, { encoding: 'utf-8' });
            message = `The following package updates require a restart of the system: ${content.split('\n').join(', ')}`;
        } catch (e) {
            if (e.code !== 'ENOENT') {
                logger.error(`${hostLogPrefix} Could not read file "${REBOOT_REQUIRED_PACKAGES_PATH}": ${e.message}`);
            }
        }

        await notificationHandler.addMessage({
            scope: 'system',
            category: 'systemRebootRequired',
            message,
            instance: `${SYSTEM_HOST_PREFIX}${hostname}`,
        });
    }

    /**
     * Upgrade all upgradeable adapters with respect to their auto upgrade policy
     */
    async autoUpgradeAdapters(): Promise<void> {
        const { logger, hostLogPrefix, notificationHandler, autoUpgradeManager, hostname } = this;

        try {
            if (!(await autoUpgradeManager.isAutoUpgradeEnabled())) {
                logger.debug(`${hostLogPrefix} Automatic adapter upgrades are disabled for the current repository`);
                return;
            }

            const { upgradedAdapters, failedAdapters } = await autoUpgradeManager.upgradeAdapters();

            if (upgradedAdapters.length) {
                await notificationHandler.addMessage({
                    scope: 'system',
                    category: 'automaticAdapterUpgradeSuccessful',
                    message: upgradedAdapters
                        .map(entry => `${entry.name}: ${entry.oldVersion} -> ${entry.newVersion}`)
                        .join('\n'),
                    instance: `${SYSTEM_HOST_PREFIX}${hostname}`,
                });
            }

            if (failedAdapters.length) {
                await notificationHandler.addMessage({
                    scope: 'system',
                    category: 'automaticAdapterUpgradeFailed',
                    message: failedAdapters
                        .map(entry => `${entry.name}: ${entry.oldVersion} -> ${entry.newVersion}`)
                        .join('\n'),
                    instance: `${SYSTEM_HOST_PREFIX}${hostname}`,
                });
            }
        } catch (e) {
            logger.error(
                `${hostLogPrefix} An error occurred while processing automatic adapter upgrades: ${e.message}`,
            );
        }
    }

    /**
     * Disables all blocklisted instances which are currently enabled and generates notifications
     */
    async disableBlocklistedInstances(): Promise<void> {
        const { logger, hostLogPrefix, notificationHandler, blocklistManager, hostname } = this;

        let newlyDisabledInstances: ioBroker.InstanceObject[];

        try {
            newlyDisabledInstances = await blocklistManager.disableAllBlocklistedInstances();
        } catch (e) {
            logger.error(`${hostLogPrefix} Could not check if blocklisted adapters need to be disabled: ${e.message}`);
            return;
        }

        for (const disabledInstance of newlyDisabledInstances) {
            const message = `Instance "${disabledInstance._id}" has been stopped and disabled because the version "${disabledInstance.common.version}" has been blocked by the developer`;
            logger.error(`${hostLogPrefix} ${message}`);

            await notificationHandler.addMessage({
                scope: 'system',
                category: 'blockedVersions',
                message,
                instance: SYSTEM_HOST_PREFIX + hostname,
            });
        }
    }
}
