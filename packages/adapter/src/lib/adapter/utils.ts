import { isObject } from '@iobroker/js-controller-common/tools';

/**
 * Check if messagebox is configured for given instance
 *
 * @param instanceCommon Instance common
 */
export function isMessageboxSupported(instanceCommon: ioBroker.InstanceCommon): boolean {
    if (!isObject(instanceCommon.supportedMessages)) {
        return !!instanceCommon.messagebox;
    }

    return Object.values(instanceCommon.supportedMessages).includes(true);
}
