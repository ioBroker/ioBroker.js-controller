import fs from 'fs-extra';
import type cp from 'node:child_process';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { setTimeout as wait } from 'node:timers/promises';
import { valid } from 'semver';
import { tools } from '@iobroker/js-controller-common';
import { SYSTEM_HOST_PREFIX } from '@iobroker/js-controller-common-db/constants';
import { execFileAsync, getWindowsServiceInstallation } from '@iobroker/js-controller-common-db/tools';
import { PacketManager, type UpgradePacket } from '@iobroker/js-controller-cli';
import type { UpgradeArguments } from '@/lib/upgradeManager.js';
import type { NotificationHandler } from '@iobroker/js-controller-common';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import type { BlocklistManager } from '@/lib/blocklistManager.js';
import type { AdapterAutoUpgradeManager } from '@/lib/adapterAutoUpgradeManager.js';
import type { ControllerLogger } from '@/lib/controller/types.js';

// eslint-disable-next-line unicorn/prefer-module
const require = createRequire(import.meta.url || `file://${__filename}`);

/** This file exists on most linux systems if a reboot is required */
const REBOOT_REQUIRED_PATH = '/var/run/reboot-required';
/** This file contains a list of packages which require the reboot, separated by newline */
const REBOOT_REQUIRED_PACKAGES_PATH = '/var/run/reboot-required.pkgs';

const WINDOWS_SERVICE_DOES_NOT_EXIST = 1060;
const WINDOWS_SERVICE_IS_NOT_STARTED = 1062;
const WINDOWS_HELPER_REMOVAL_RETRIES = 20;
const WINDOWS_HELPER_REMOVAL_RETRY_DELAY_MS = 250;

type RunServiceControl = (file: string, args: readonly string[]) => Promise<unknown>;
type RemoveFile = (file: string) => Promise<unknown>;
type WaitForRetry = (delay: number) => Promise<unknown>;

/**
 * Escape a value before inserting it into a WinSW XML configuration.
 *
 * @param value value to escape
 */
export function escapeWindowsServiceXml(value: string | number): string {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
}

/**
 * Validate values received through the controller upgrade host message before starting any process.
 *
 * @param version requested controller version
 * @param adminInstance Admin instance that requested the upgrade
 */
export function validateControllerUpgradeArguments(version: unknown, adminInstance: unknown): void {
    if (typeof version !== 'string' || !valid(version)) {
        throw new Error(`Invalid version "${String(version)}"`);
    }
    if (!Number.isInteger(adminInstance) || (adminInstance as number) < 0) {
        throw new Error(`Invalid admin instance "${String(adminInstance)}"`);
    }
}

function isServiceControlError(error: unknown, expectedCode: number): boolean {
    const candidate = error as { code?: number | string; message?: string };
    return (
        Number(candidate?.code) === expectedCode || new RegExp(`\\b${expectedCode}\\b`).test(candidate?.message || '')
    );
}

/**
 * Remove a helper service left behind by an interrupted earlier controller upgrade.
 *
 * @param serviceId Windows service id of the temporary helper
 * @param configFile path to its WinSW configuration
 * @param runServiceControl service control command runner, replaceable for tests
 * @param removeFile file removal function, replaceable for tests
 * @param waitForRetry delay function, replaceable for tests
 */
export async function removeStaleWindowsUpgradeHelper(
    serviceId: string,
    configFile: string,
    runServiceControl: RunServiceControl = execFileAsync,
    removeFile: RemoveFile = fs.remove,
    waitForRetry: WaitForRetry = wait,
): Promise<void> {
    try {
        await runServiceControl('sc.exe', ['query', serviceId]);
    } catch (error) {
        if (!isServiceControlError(error, WINDOWS_SERVICE_DOES_NOT_EXIST)) {
            throw error;
        }
        await removeFile(configFile);
        return;
    }

    try {
        await runServiceControl('sc.exe', ['stop', serviceId]);
    } catch (error) {
        if (
            !isServiceControlError(error, WINDOWS_SERVICE_IS_NOT_STARTED) &&
            !isServiceControlError(error, WINDOWS_SERVICE_DOES_NOT_EXIST)
        ) {
            throw error;
        }
    }

    try {
        await runServiceControl('sc.exe', ['delete', serviceId]);
    } catch (error) {
        if (!isServiceControlError(error, WINDOWS_SERVICE_DOES_NOT_EXIST)) {
            throw error;
        }
    }

    for (let attempt = 0; attempt < WINDOWS_HELPER_REMOVAL_RETRIES; attempt++) {
        try {
            await runServiceControl('sc.exe', ['query', serviceId]);
        } catch (error) {
            if (isServiceControlError(error, WINDOWS_SERVICE_DOES_NOT_EXIST)) {
                await removeFile(configFile);
                return;
            }
            throw error;
        }
        await waitForRetry(WINDOWS_HELPER_REMOVAL_RETRY_DELAY_MS);
    }

    throw new Error(`Could not remove stale Windows upgrade helper service "${serviceId}"`);
}

/** Everything the system checks need to do their work */
export interface SystemChecksOptions {
    /** The connected objects database client */
    objects: ObjectsClient;
    /** The connected states database client */
    states: StatesClient;
    /** The logger of this controller */
    logger: ControllerLogger;
    /** Prefix of all log messages of this controller */
    hostLogPrefix: string;
    /** The id of the host object of this controller */
    hostObjectPrefix: ioBroker.ObjectIDs.Host;
    /** Name of this host, used as the instance of the created notifications */
    hostname: string;
    /** Handles the notifications of this host */
    notificationHandler: NotificationHandler;
    /** Upgrades adapters automatically */
    autoUpgradeManager: AdapterAutoUpgradeManager;
    /** Checks adapters against the block list */
    blocklistManager: BlocklistManager;
}

/**
 * Checks the system this host runs on for available updates and other problems and creates notifications for them
 */
export class SystemChecks {
    readonly #objects: ObjectsClient;
    readonly #states: StatesClient;
    readonly #logger: ControllerLogger;
    readonly #hostLogPrefix: string;
    readonly #hostObjectPrefix: ioBroker.ObjectIDs.Host;
    readonly #hostname: string;
    readonly #notificationHandler: NotificationHandler;
    readonly #autoUpgradeManager: AdapterAutoUpgradeManager;
    readonly #blocklistManager: BlocklistManager;

    /** If a system reboot is required */
    #isRebootRequired = false;

    /**
     * @param options Everything the system checks need to do their work
     */
    constructor(options: SystemChecksOptions) {
        this.#objects = options.objects;
        this.#states = options.states;
        this.#logger = options.logger;
        this.#hostLogPrefix = options.hostLogPrefix;
        this.#hostObjectPrefix = options.hostObjectPrefix;
        this.#hostname = options.hostname;
        this.#notificationHandler = options.notificationHandler;
        this.#autoUpgradeManager = options.autoUpgradeManager;
        this.#blocklistManager = options.blocklistManager;
    }

    /**
     * Check if the current redis Locale is supported, else register notification
     */
    async checkSystemLocaleSupported(): Promise<void> {
        const { notificationHandler, hostname } = {
            notificationHandler: this.#notificationHandler,
            hostname: this.#hostname,
        };

        const isSupported = await this.#objects.isSystemLocaleSupported();

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
        const notificationHandler = this.#notificationHandler;
        const hostObjectPrefix = this.#hostObjectPrefix;
        const hostname = this.#hostname;
        const states = this.#states;

        const dockerInfo = tools.getDockerInformation();

        if (!dockerInfo.isOfficial) {
            return;
        }

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
        const notificationHandler = this.#notificationHandler;
        const hostObjectPrefix = this.#hostObjectPrefix;
        const hostname = this.#hostname;
        const states = this.#states;

        if (tools.isDocker()) {
            return;
        }

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
        validateControllerUpgradeArguments(version, adminInstance);
        const upgradeProcessPath = require.resolve('../../upgradeManager');

        if (process.platform === 'win32') {
            const windowsService = getWindowsServiceInstallation();
            if (!windowsService) {
                throw new Error('Cannot start controller upgrade: no WinSW service installation found');
            }

            const daemonDir = path.dirname(windowsService.executable);
            const helperServiceId = `iob_controller_upgrade_${this.#hostname.replace(/[^a-zA-Z0-9_.-]/g, '_')}`;
            const helperConfig = path.join(daemonDir, `${helperServiceId}.xml`);
            const rootDir = tools.getRootDir();
            const helperXml = `<service>
    <id>${escapeWindowsServiceXml(helperServiceId)}</id>
    <name>${escapeWindowsServiceXml(`ioBroker controller upgrade (${this.#hostname})`)}</name>
    <description>Temporary service for an ioBroker js-controller upgrade</description>
    <executable>${escapeWindowsServiceXml(process.execPath)}</executable>
    <arguments>&quot;${escapeWindowsServiceXml(upgradeProcessPath)}&quot; ${escapeWindowsServiceXml(version)} ${escapeWindowsServiceXml(adminInstance)} ${escapeWindowsServiceXml(uid)} ${escapeWindowsServiceXml(gid)}</arguments>
    <workingdirectory>${escapeWindowsServiceXml(rootDir)}</workingdirectory>
    <env name="IOBROKER_WINDOWS_UPGRADE_HELPER_SERVICE" value="${escapeWindowsServiceXml(helperServiceId)}"/>
    <env name="IOBROKER_WINDOWS_UPGRADE_HELPER_CONFIG" value="${escapeWindowsServiceXml(helperConfig)}"/>
    <env name="IOBROKER_WINDOWS_MAIN_SERVICE_CONFIG" value="${escapeWindowsServiceXml(windowsService.config)}"/>
    <env name="IOBROKER_ROOT_DIR" value="${escapeWindowsServiceXml(rootDir)}"/>
    <log mode="none"/>
    <stoptimeout>30sec</stoptimeout>
</service>
`;

            await removeStaleWindowsUpgradeHelper(helperServiceId, helperConfig);
            await fs.writeFile(helperConfig, helperXml, 'utf8');
            let installed = false;

            try {
                await execFileAsync(windowsService.executable, ['install', helperConfig, '--no-elevate'], {
                    cwd: daemonDir,
                });
                installed = true;
                await execFileAsync(windowsService.executable, ['start', helperConfig, '--no-elevate'], {
                    cwd: daemonDir,
                });
            } catch (e) {
                if (installed) {
                    try {
                        await execFileAsync(windowsService.executable, ['uninstall', helperConfig, '--no-elevate'], {
                            cwd: daemonDir,
                        });
                    } catch {
                        // Keep the original error
                    }
                }
                await fs.remove(helperConfig);
                throw e;
            }
            return;
        }

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
        const logger = this.#logger;
        const hostLogPrefix = this.#hostLogPrefix;
        const notificationHandler = this.#notificationHandler;
        const hostname = this.#hostname;

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
        const logger = this.#logger;
        const hostLogPrefix = this.#hostLogPrefix;
        const notificationHandler = this.#notificationHandler;
        const autoUpgradeManager = this.#autoUpgradeManager;
        const hostname = this.#hostname;

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
                        .map(entry => `${entry.name}: ${entry.oldVersion} -> ${entry.newVersion}: ${entry.reason}`)
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
        const logger = this.#logger;
        const hostLogPrefix = this.#hostLogPrefix;
        const notificationHandler = this.#notificationHandler;
        const blocklistManager = this.#blocklistManager;
        const hostname = this.#hostname;

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
