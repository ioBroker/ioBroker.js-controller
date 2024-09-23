import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import type { logger } from '@iobroker/js-controller-common';
import { Upgrade } from '@iobroker/js-controller-cli';
import semver from 'semver';

interface AdapterAutoUpgradeOptions {
    /** The objects DB client */
    objects: ObjectsClient;
    /** The states DB client */
    states: StatesClient;
    /** Logger which needs to be prefixed */
    logger: ReturnType<typeof logger>;
    /** Prefix for log messages */
    logPrefix: string;
}

interface UpgradeAdapterOptions extends ioBroker.RepositoryJsonAdapterContent {
    /** Current active repository */
    repoName: string;
}

interface UpgradedAdapter {
    /** Name of the adapter */
    name: string;
    /** Version before upgrade */
    oldVersion: string;
    /** Newly installed version */
    newVersion: string;
}

interface UpgradeAdaptersResult {
    /** Adapters which were successfully upgraded */
    upgradedAdapters: UpgradedAdapter[];
    /** Adapters which were failed to upgrade */
    failedAdapters: UpgradedAdapter[];
}

interface AdapterUpgradeConfiguration {
    /** Name of the adapter */
    name: string;
    /** Current installed version */
    version: string;
    /** Configured upgrade policy */
    upgradePolicy: ioBroker.AutoUpgradePolicy;
}

export class AdapterAutoUpgradeManager {
    private readonly objects: ObjectsClient;
    private readonly states: StatesClient;
    /** Mapping from semver range to range identifier */
    private SEMVER_RANGE_MAPPING = {
        none: '',
        patch: '~',
        minor: '^',
        major: '>',
    } as const;
    /** Prefix for log messages */
    private readonly logPrefix: string;
    /** Logger which needs to be prefixed */
    private logger: ReturnType<typeof logger>;

    constructor(options: AdapterAutoUpgradeOptions) {
        this.objects = options.objects;
        this.states = options.states;
        this.logger = options.logger;
        this.logPrefix = options.logPrefix;
    }

    /**
     * Checks if auto upgrade is enabled for the current configured repository
     */
    async isAutoUpgradeEnabled(): Promise<boolean> {
        let sysConf: ioBroker.SystemConfigObject | null | undefined;

        try {
            sysConf = await this.objects.getObjectAsync('system.config');
        } catch {
            // ignore
        }

        if (!sysConf?.common.activeRepo?.length || !sysConf.common.adapterAutoUpgrade) {
            return false;
        }

        const activeRepo = sysConf.common.activeRepo[0];

        return sysConf.common.adapterAutoUpgrade.repositories[activeRepo];
    }

    /**
     * Checks the current `system.repositories` object and checks if one needs to be performed according to the adapter configuration
     */
    async upgradeAdapters(): Promise<UpgradeAdaptersResult> {
        this.logger.info(`${this.logPrefix} Check for available automatic adapter upgrades`);
        const upgradedAdapters: UpgradedAdapter[] = [];
        const failedAdapters: UpgradedAdapter[] = [];
        const repoName = await this.getConfiguredRepositoryName();
        const repoInformation = await this.getRepository(repoName);

        const installedAdaptersConfig = await this.getAutoUpdateConfiguration();

        for (const adapterConfig of installedAdaptersConfig) {
            const repoAdapterInfo = repoInformation[adapterConfig.name];
            if (!repoAdapterInfo) {
                continue;
            }

            if (semver.gte(adapterConfig.version, repoAdapterInfo.version)) {
                continue;
            }

            if (
                semver.satisfies(
                    repoAdapterInfo.version,
                    `${this.SEMVER_RANGE_MAPPING[adapterConfig.upgradePolicy]}${adapterConfig.version}`,
                    { includePrerelease: true },
                )
            ) {
                try {
                    await this.upgradeAdapter({ ...repoAdapterInfo, repoName });
                    upgradedAdapters.push({
                        name: repoAdapterInfo.name,
                        newVersion: repoAdapterInfo.version,
                        oldVersion: adapterConfig.version,
                    });
                    this.logger.info(
                        `${this.logPrefix} Successfully upgraded adapter "${repoAdapterInfo.name}" to ${repoAdapterInfo.version}`,
                    );
                } catch (e) {
                    this.logger.error(
                        `${this.logPrefix} Could not upgrade adapter "${repoAdapterInfo.name}" to ${repoAdapterInfo.version}: ${e.message}`,
                    );
                    failedAdapters.push({
                        name: repoAdapterInfo.name,
                        newVersion: repoAdapterInfo.version,
                        oldVersion: adapterConfig.version,
                    });
                }
            }
        }

        return { upgradedAdapters, failedAdapters };
    }

    /**
     * Upgrade specified adapter to given version
     *
     * @param options information of the adapter to install, e.g. version and name, sa well as active repo
     */
    private async upgradeAdapter(options: UpgradeAdapterOptions): Promise<void> {
        const { repoName, name, version } = options;

        this.logger.info(`${this.logPrefix} Upgrade adapter "${name}" to ${version}`);

        const upgrade = new Upgrade({
            objects: this.objects,
            states: this.states,
            params: {},
            processExit: () => undefined,
        });

        await upgrade.upgradeAdapter(repoName, `${name}@${version}`, false, true, false);
    }

    /**
     * Get the current active repository name
     */
    private async getConfiguredRepositoryName(): Promise<string> {
        const obj = await this.objects.getObjectAsync('system.config');

        if (!obj?.common?.activeRepo?.length) {
            throw new Error('Could not find an active repository');
        }

        return obj.common.activeRepo[0];
    }

    /**
     * Get the repository information for the given repository
     *
     * @param name Name of the repository
     */
    private async getRepository(name: string): Promise<Record<string, ioBroker.RepositoryJsonAdapterContent>> {
        const obj = await this.objects.getObjectAsync('system.repositories');

        const jsonContent:
            | (ioBroker.RepositoryJson & {
                  _repoInfo?: any;
              })
            | null
            | undefined = obj?.native?.repositories?.[name]?.json;

        if (!jsonContent) {
            throw new Error(`Could not get repository information for "${name}"`);
        }

        delete jsonContent._repoInfo;
        return jsonContent as Record<string, ioBroker.RepositoryJsonAdapterContent>;
    }

    /**
     * Get the auto upgrade configuration of all adapters
     */
    private async getAutoUpdateConfiguration(): Promise<AdapterUpgradeConfiguration[]> {
        const res = await this.objects.getObjectViewAsync('system', 'adapter', {
            startkey: 'system.adapter.',
            endkey: 'system.adapter.\u9999',
        });

        if (!res) {
            throw new Error('Did not get information about installed adapters');
        }

        const defaultPolicy = await this.getDefaultUpgradePolicy();

        return res.rows
            .filter(
                row =>
                    (defaultPolicy && defaultPolicy !== 'none') ||
                    (row.value?.common.automaticUpgrade && row.value.common.automaticUpgrade !== 'none'),
            )
            .map(row => {
                return {
                    // ts can not infer, that we filtered out falsy row.value entries
                    name: row.value.common.name,
                    version: row.value.common.version,
                    upgradePolicy: row.value.common.automaticUpgrade! || defaultPolicy,
                };
            });
    }

    /**
     * Get the default upgrade policy from the system config
     */
    private async getDefaultUpgradePolicy(): Promise<ioBroker.AutoUpgradePolicy | undefined> {
        let sysConf: ioBroker.SystemConfigObject | null | undefined;

        try {
            sysConf = await this.objects.getObjectAsync('system.config');
        } catch {
            // ignore
        }

        return sysConf?.common.adapterAutoUpgrade?.defaultPolicy;
    }
}
