import { isObject, isControllerUiUpgradeSupported } from '@iobroker/js-controller-common/tools';
import { SUPPORTED_FEATURES, SupportedFeature } from './constants';

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

/**
 * Get the supported features for the current running controller
 */
export function getSupportedFeatures(): SupportedFeature[] {
    if (!isControllerUiUpgradeSupported()) {
        const idx = SUPPORTED_FEATURES.indexOf('CONTROLLER_UI_UPGRADE');
        if (idx !== -1) {
            SUPPORTED_FEATURES.splice(idx, 1);
        }
    }

    return SUPPORTED_FEATURES;
}
