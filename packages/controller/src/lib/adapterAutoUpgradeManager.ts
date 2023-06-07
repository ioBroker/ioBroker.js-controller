import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import semver from 'semver';

interface AdapterAutoUpgradeOptions {
    /** The objects DB client */
    objects: ObjectsClient;
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

    constructor(options: AdapterAutoUpgradeOptions) {
        this.objects = options.objects;
    }

    /**
     * Checks the current `system.repositories` object and checks if one needs to be performed according to the adapter configuration
     */
    async upgradeAdapters(): Promise<void> {
        const repoName = await this.getConfiguredRepositoryName();
        const repoInformation = await this.getRepository(repoName);

        const installedAdaptersConfig = await this.getAutoUpdateConfiguration();

        for (const adapterConfig of installedAdaptersConfig) {
            // TODO: check if repo version is newer than installed
            // TODO: check if repo version is in range
            // TODO: if in range upgrade to the new version
        }
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
