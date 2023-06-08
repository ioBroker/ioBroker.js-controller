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

interface UpgradeAdapterOptions extends RepositoryAdapter {
    /** Current active repository */
    repoName: string;
}

interface RepositoryAdapter {
    /** Adapter name */
    name: string;
    /** Newest available version */
    version: string;
    /** Other Adapter related properties, not important for this implementation */
    [other: string]: any;
}

type UpgradePolicy = 'none' | 'patch' | 'minor' | 'major';

interface AdapterUpgradeConfiguration {
    /** Name of the adapter */
    name: string;
    /** Current installed version */
    version: string;
    /** Configured upgrade policy */
    upgradePolicy: UpgradePolicy;
}

export class AdapterAutoUpgradeManager {
    private readonly objects: ObjectsClient;
    private readonly states: StatesClient;
    /** Mapping from semver range to range identifier */
    private SEMVER_RANGE_MAPPING = {
        none: '',
        patch: '~',
        minor: '^',
        major: '>'
    } as const;
    /** Prefix for log messages */
    private logPrefix: string;
    /** Logger which needs to be prefixed */
    private logger: ReturnType<typeof logger>;

    constructor(options: AdapterAutoUpgradeOptions) {
        this.objects = options.objects;
        this.states = options.states;
        this.logger = options.logger;
        this.logPrefix = options.logPrefix;
    }

    /**
     * Checks the current `system.repositories` object and checks if one needs to be performed according to the adapter configuration
     */
    async upgradeAdapters(): Promise<void> {
        this.logger.info(`${this.logPrefix} Check for available automatic adapter upgrades`);
        const repoName = await this.getConfiguredRepositoryName();
        const repoInformation = await this.getRepository(repoName);

        const installedAdaptersConfig = await this.getAutoUpdateConfiguration();

        for (const adapterConfig of installedAdaptersConfig) {
            this.logger.info(this.logPrefix + ' ' + JSON.stringify(adapterConfig));

            const repoAdapterInfo = repoInformation[adapterConfig.name];
            if (!repoAdapterInfo) {
                continue;
            }

            if (semver.gt(adapterConfig.version, repoAdapterInfo.version)) {
                continue;
            }

            if (
                semver.satisfies(
                    repoAdapterInfo.version,
                    `${this.SEMVER_RANGE_MAPPING[adapterConfig.upgradePolicy]}${adapterConfig.version}`,
                    { includePrerelease: true }
                )
            ) {
                await this.upgradeAdapter({ ...repoAdapterInfo, repoName });
                this.logger.info(
                    `${this.logPrefix} Successfully upgraded adapter "${repoAdapterInfo.name}" to ${repoAdapterInfo.version}`
                );
            }
        }
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
            processExit: () => {
                return undefined;
            }
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
    private async getRepository(name: string): Promise<Record<string, RepositoryAdapter>> {
        const obj = await this.objects.getObjectAsync('system.repositories');

        if (!obj?.native?.repositories?.[name]) {
            throw new Error(`Could not get repository information for "${name}"`);
        }

        delete obj.native.repositories[name]._repoInfo;
        return obj.native.repositories[name].json;
    }

    /**
     * Get the auto upgrade configuration of all adapters
     */
    private async getAutoUpdateConfiguration(): Promise<AdapterUpgradeConfiguration[]> {
        const res = await this.objects.getObjectViewAsync('system', 'adapter', {
            startkey: 'system.adapter.',
            endkey: 'system.adapter.\u9999'
        });

        if (!res) {
            throw new Error('Did not get information about installed adapters');
        }

        return res.rows
            .filter(row => row.value.common.automaticUpgrade !== 'none')
            .map(row => {
                return {
                    name: row.value.common.name,
                    version: row.value.common.version,
                    upgradePolicy: row.value.common.automaticUpgrade
                };
            });
    }
}
