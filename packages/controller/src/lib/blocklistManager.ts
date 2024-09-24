import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import {
    HIGHEST_UNICODE_SYMBOL,
    SYSTEM_ADAPTER_PREFIX,
    SYSTEM_CONFIG_ID,
    SYSTEM_REPOSITORIES_ID,
} from '@iobroker/js-controller-common-db/constants';
import semver from 'semver';

interface BlocklistManagerOptions {
    /** The objects client */
    objects: ObjectsClient;
}

interface AdapterVersionBlockedOptions {
    /** The version of the adapter instance */
    version: string;
    /** Name of the adapter */
    adapterName: string;
}

interface InternalAdapterVersionBlockedOptions extends AdapterVersionBlockedOptions {
    /** The system repository object */
    systemRepoObj: ioBroker.RepositoryObject;
    /** The system config object */
    systemConfigObj: ioBroker.SystemConfigObject;
}

export class BlocklistManager {
    /** The objects client */
    private readonly objects: ObjectsClient;

    constructor(options: BlocklistManagerOptions) {
        this.objects = options.objects;
    }

    /**
     * Iterates over all instances, disables blocklisted once if enabled
     *
     * @returns A list of disabled instances
     */
    async disableAllBlocklistedInstances(): Promise<ioBroker.InstanceObject[]> {
        /** List of instances which we have disabled */
        const disabledList: ioBroker.InstanceObject[] = [];

        const systemRepoObj = await this.objects.getObject(SYSTEM_REPOSITORIES_ID);
        const systemConfigObj = await this.objects.getObject(SYSTEM_CONFIG_ID);

        if (!systemConfigObj || !systemRepoObj) {
            return disabledList;
        }

        const instancesView = await this.objects.getObjectViewAsync('system', 'instance', {
            startkey: SYSTEM_ADAPTER_PREFIX,
            endkey: SYSTEM_ADAPTER_PREFIX + HIGHEST_UNICODE_SYMBOL,
        });

        for (const row of instancesView.rows) {
            const obj = row.value;

            if (!obj.common.enabled) {
                continue;
            }

            const isBlocked = this.internalIsAdapterVersionBlocked({
                systemConfigObj,
                systemRepoObj,
                adapterName: obj.common.name,
                version: obj.common.version,
            });

            if (!isBlocked) {
                continue;
            }

            obj.common.enabled = false;

            await this.objects.setObject(obj._id, obj);
            disabledList.push(row.value);
        }

        return disabledList;
    }

    /**
     * Check if version of a specific adapter is blocked
     *
     * @param options adapter version and name information
     * @returns A boolean indicating if the adapter version is blocked
     */
    async isAdapterVersionBlocked(options: AdapterVersionBlockedOptions): Promise<boolean> {
        const systemRepoObj = await this.objects.getObject(SYSTEM_REPOSITORIES_ID);
        const systemConfigObj = await this.objects.getObject(SYSTEM_CONFIG_ID);

        if (!systemConfigObj || !systemRepoObj) {
            return false;
        }

        return this.internalIsAdapterVersionBlocked({ ...options, systemRepoObj, systemConfigObj });
    }

    /**
     * Check if version of a specific adapter is blocked
     *
     * @param options information about adapter, version and cached objects
     * @returns A boolean indicating if the adapter version is blocked
     */
    private internalIsAdapterVersionBlocked(options: InternalAdapterVersionBlockedOptions): boolean {
        const { adapterName, version, systemRepoObj, systemConfigObj } = options;

        for (const activeRepoName of systemConfigObj.common.activeRepo) {
            if (!(activeRepoName in systemRepoObj.native.repositories)) {
                return false;
            }

            const repo = systemRepoObj.native.repositories[activeRepoName];
            const adapterEntry = repo.json?.[adapterName];

            if (!adapterEntry || !('blockedVersions' in adapterEntry)) {
                return false;
            }

            for (const blockedVersion of adapterEntry.blockedVersions) {
                if (semver.satisfies(version, blockedVersion, { includePrerelease: true })) {
                    return true;
                }
            }
        }

        return false;
    }
}
