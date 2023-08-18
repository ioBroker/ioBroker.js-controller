import { isObject, isControllerUiUpgradeSupported, encrypt, decrypt } from '@iobroker/js-controller-common/tools';
import { SUPPORTED_FEATURES, SupportedFeature } from './constants';

interface EncryptArrayOptions {
    /** The objects whose values should be en/decrypted */
    obj: Record<string, unknown>;
    /** Keys which need to be en/decrypted */
    keys: string[];
    /** Secret to use for en/decryption */
    secret: string;
}

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

/**
 * Encrypt given keys of given object
 *
 * @param options keys, object and secret information
 */
export function encryptArray(options: EncryptArrayOptions): void {
    const { secret, obj, keys } = options;

    for (const attr of keys) {
        const val = obj[attr];
        if (typeof val === 'string') {
            obj[attr] = encrypt(secret, val);
        }
    }
}

/**
 * Decrypt given keys of given object
 *
 * @param options keys, object and secret information
 */
export function decryptArray(options: EncryptArrayOptions): void {
    const { secret, obj, keys } = options;

    for (const attr of keys) {
        const val = obj[attr];
        if (typeof val === 'string') {
            obj[attr] = decrypt(secret, val);
        }
    }
}
