import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import { appName } from '@iobroker/js-controller-common-db/tools';
import type { InternalLogger } from '@iobroker/js-controller-common-db/tools';

export interface OrderedInstancesObject {
    1: ioBroker.InstanceObject[];
    2: ioBroker.InstanceObject[];
    3: ioBroker.InstanceObject[];
    admin: ioBroker.InstanceObject[];
}

/**
 * Get ordered instances according to tier level
 *
 * @param objects - Objects DB
 * @param logger - logger object
 * @param logPrefix prefix for logging
 */
export async function getInstancesOrderedByStartPrio(
    objects: ObjectsClient,
    logger: InternalLogger | typeof console,
    logPrefix = '',
): Promise<ioBroker.InstanceObject[]> {
    const instances: OrderedInstancesObject = { 1: [], 2: [], 3: [], admin: [] };
    const allowedTiers = [1, 2, 3];

    if (logPrefix) {
        // append space if we have a prefix
        logPrefix += ' ';
    }

    let doc: Awaited<ioBroker.GetObjectViewPromise<ioBroker.InstanceObject>> = { rows: [] };
    try {
        doc = await objects.getObjectViewAsync('system', 'instance', {
            startkey: 'system.adapter.',
            endkey: 'system.adapter.\u9999',
        });
    } catch (e) {
        if (e.message?.startsWith('Cannot find ')) {
            logger.error(`${logPrefix} _design/system missing - call node ${appName}.js setup`);
        } else {
            logger.error(`${logPrefix} Can not get instances: ${e.message}`);
        }
    }

    if (!doc.rows || doc.rows.length === 0) {
        logger.info(`${logPrefix} no instances found`);
    } else {
        for (const row of doc.rows) {
            if (row?.value) {
                if (row.value._id.startsWith('system.adapter.admin')) {
                    instances.admin.push(row.value);
                } else if (
                    row.value.common?.tier !== undefined &&
                    allowedTiers.includes(Math.round(row.value.common.tier))
                ) {
                    instances[row.value.common.tier].push(row.value);
                } else {
                    // no valid tier, so put it in the last one
                    instances['3'].push(row.value);
                }
            }
        }
    }

    return [...instances.admin, ...instances['1'], ...instances['2'], ...instances['3']];
}

interface IsInstalledFromNpmOptions {
    /** Installed from attribute of instance/adapter object */
    installedFrom?: ioBroker.InstalledFrom;
    /** Name of the adapter */
    adapterName: string;
}

/**
 * Check if the adapter has been installed from NPM
 *
 * @param options installedFrom and name information
 */
export function isInstalledFromNpm(options: IsInstalledFromNpmOptions): boolean {
    const { adapterName, installedFrom } = options;

    if (installedFrom === undefined) {
        return true;
    }

    return installedFrom.startsWith(`${appName.toLowerCase()}.${adapterName}`);
}
