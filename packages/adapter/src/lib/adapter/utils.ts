import { isObject } from '@iobroker/js-controller-common/tools';

/**
 * Check if messagebox is configured for given instance
 * This means, at least one of the properties has a value different from false
 *
 * @param instanceCommon Instance common
 */
export function isMessageboxSupported(instanceCommon: ioBroker.InstanceCommon): boolean {
    if (!isObject(instanceCommon.supportedMessages)) {
        return !!instanceCommon.messagebox;
    }

    return Object.values(instanceCommon.supportedMessages).find(val => val !== false) !== undefined;
}
