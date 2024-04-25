import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import { SYSTEM_CONFIG_ID, SYSTEM_REPOSITORIES_ID } from '@iobroker/js-controller-common/constants';
import semver from 'semver';

interface AdapterVersionBlockedOptions {
    /** The version of the adapter instance */
    version: string;
    /** Name of the adapter */
    adapterName: string;
    /** The objects client */
    objects: ObjectsClient;
}

/**
 * Check if version of a specific adapter is blocked
 *
 * @param options adapter version and name information
 */
export async function isAdapterVersionBlocked(options: AdapterVersionBlockedOptions): Promise<boolean> {
    const { version, adapterName, objects } = options;

    const systemRepoObj = await objects.getObject(SYSTEM_REPOSITORIES_ID);
    const systemConfigObj = await objects.getObject(SYSTEM_CONFIG_ID);

    if (!systemConfigObj || !systemRepoObj) {
        return false;
    }

    const repo = systemRepoObj.native.repositories[systemConfigObj.common.activeRepo[0]];

    const adapterEntry = repo.json?.[adapterName];

    if (!adapterEntry || !('blockedVersions' in adapterEntry)) {
        return false;
    }

    for (const blockedVersion of adapterEntry.blockedVersions) {
        if (semver.satisfies(version, blockedVersion, { includePrerelease: true })) {
            return true;
        }
    }

    return false;
}
