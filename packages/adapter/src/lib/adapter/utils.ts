import {
    isObject,
    isControllerUiUpgradeSupported,
    encrypt,
    decrypt,
    appNameLowerCase,
    getRootDir,
    execAsync,
} from '@iobroker/js-controller-common-db/tools';
import { SUPPORTED_FEATURES, type SupportedFeature } from '@/lib/adapter/constants.js';
import path from 'node:path';
import fs from 'fs-extra';

interface EncryptArrayOptions {
    /** The objects whose values should be en/decrypted */
    obj: Record<string, unknown>;
    /** Keys which need to be en/decrypted */
    keys: string[];
    /** Secret to use for en/decryption */
    secret: string;
}

interface GetScopedPackageIdentifierOptions {
    /** Name of the node module */
    moduleName: string;
    /** Adapter namespace */
    namespace: string;
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
        const val = getObjectAttribute(obj, attr);
        if (Array.isArray(val)) {
            const encrypted: string[] = [];
            for (let i = 0; i < val.length; i++) {
                encrypted[i] = typeof val[i] === 'string' ? encrypt(secret, val[i]) : val[i];
            }
            setObjectAttribute(obj, attr, encrypted);
        } else if (typeof val === 'string') {
            setObjectAttribute(obj, attr, encrypt(secret, val));
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
        const val = getObjectAttribute(obj, attr);
        if (Array.isArray(val)) {
            const decrypted: string[] = [];
            for (let i = 0; i < val.length; i++) {
                decrypted[i] = typeof val[i] === 'string' ? decrypt(secret, val[i]) : val[i];
            }
            setObjectAttribute(obj, attr, decrypted);
        } else if (typeof val === 'string') {
            setObjectAttribute(obj, attr, decrypt(secret, val));
        }
    }
}

/**
 * Transform a npm moduleName to the adapter scoped name, like `axios` to `@iobroker-javascript.0/axios`
 *
 * @param options name of the node module and namespace information
 */
export function getAdapterScopedPackageIdentifier(options: GetScopedPackageIdentifierOptions): string {
    const { moduleName, namespace } = options;

    let internalModuleName = moduleName;
    if (internalModuleName.startsWith('@')) {
        internalModuleName = internalModuleName.substring(1).replace(/\//g, '-');
    }

    return `@${appNameLowerCase}-${namespace}/${internalModuleName}`;
}

/**
 * List all packages installed in the given adapter namespace
 *
 * @param namespace namespace to check installed modules for
 */
export async function listInstalledNodeModules(namespace: string): Promise<string[]> {
    const packJson = (await fs.readJson(path.join(getRootDir(), 'package.json'))) as {
        dependencies: Record<string, string>;
    };
    const dependencies: string[] = [];

    for (const [dependency, versionInfo] of Object.entries(packJson.dependencies)) {
        if (!dependency.startsWith(`@${appNameLowerCase}-${namespace}/`)) {
            continue;
        }

        let realDependencyName: string;
        // remove npm: and version after last @
        if (versionInfo.startsWith('npm:')) {
            realDependencyName = versionInfo.substring(4, versionInfo.lastIndexOf('@'));
        } else {
            realDependencyName = await requestModuleNameByUrl(versionInfo);
        }

        dependencies.push(realDependencyName);
    }

    return dependencies;
}

/**
 * Request a module name by given url using `npm view`
 *
 * @param url the url to the package which should be installed via npm
 */
export async function requestModuleNameByUrl(url: string): Promise<string> {
    const res = await execAsync(`npm view ${url} name`);

    if (typeof res.stdout !== 'string') {
        throw new Error(
            `Could not determine module name for url "${url}". Unexpected stdout: "${res.stdout ? res.stdout.toString() : ''}"`,
        );
    }

    return res.stdout.trim();
}

/**
 * Get attribute of an object with complex names
 *
 * @param obj - object to get the attribute from
 * @param attrParts - attribute parts
 * @param index - index of attribute part
 */
function _getObjectAttribute(obj: Record<string, any>, attrParts: string[], index: number): any {
    if (index === attrParts.length - 1) {
        return obj[attrParts[index]];
    }
    if (!obj[attrParts[index]] || typeof obj[attrParts[index]] !== 'object') {
        return;
    }
    if (Array.isArray(obj[attrParts[index]])) {
        const result: any = [];
        for (let i = 0; i < obj[attrParts[index]].length; i++) {
            result.push(_getObjectAttribute(obj[attrParts[index]][i], attrParts, index + 1));
        }
        return result;
    }

    return _getObjectAttribute(obj[attrParts[index]], attrParts, index + 1);
}

/**
 * Get attribute of an object with complex or simple names
 *
 * @param obj - object to get the attribute from
 * @param attr - attribute name, can be complex like `attr1.attr2.attr3`
 * @return could be a value or an array
 */
export function getObjectAttribute(obj: Record<string, any>, attr: string): any {
    // Optimization for 98% of the cases
    if (!attr.includes('.')) {
        return obj[attr];
    }
    return _getObjectAttribute(obj, attr.split('.'), 0);
}

/**
 * Set attribute in an object with complex names
 *
 * @param obj - object to get the attribute from
 * @param value - value to set (Could be an array)
 * @param attrParts - attribute parts
 * @param index - index of attribute part
 */
function _setObjectAttribute(obj: Record<string, any>, value: any, attrParts: string[], index: number): any {
    if (index === attrParts.length - 1) {
        obj[attrParts[index]] = value;
        return;
    }
    if (!obj[attrParts[index]] || typeof obj[attrParts[index]] !== 'object') {
        return;
    }
    if (Array.isArray(obj[attrParts[index]])) {
        if (!Array.isArray(value)) {
            throw new Error('Value is not an array');
        }
        for (let i = 0; i < obj[attrParts[index]].length; i++) {
            _setObjectAttribute(obj[attrParts[index]][i], value[i], attrParts, index + 1);
        }
        return;
    }

    _setObjectAttribute(obj[attrParts[index]], value, attrParts, index + 1);
}

/**
 * Set attribute in an object with complex or simple names
 *
 * @param obj - object to get the attribute from
 * @param attr - attribute name, can be complex like `attr1.attr2.attr3`
 * @param value - value to set (could be a value or an array)
 */
export function setObjectAttribute(obj: Record<string, any>, attr: string, value: any): void {
    // Optimization for 98% of the cases
    if (!attr.includes('.')) {
        obj[attr] = value;
        return;
    }
    _setObjectAttribute(obj, value, attr.split('.'), 0);
}

/**
 * Delete attribute in an object with complex names
 *
 * @param obj - object to get the attribute from
 * @param attrParts - attribute parts
 * @param index - index of attribute part
 */
function _deleteObjectAttribute(obj: Record<string, any>, attrParts: string[], index: number): any {
    if (index === attrParts.length - 1) {
        delete obj[attrParts[index]];
        return;
    }
    if (!obj[attrParts[index]] || typeof obj[attrParts[index]] !== 'object') {
        return;
    }
    if (Array.isArray(obj[attrParts[index]])) {
        for (let i = 0; i < obj[attrParts[index]].length; i++) {
            _deleteObjectAttribute(obj[attrParts[index]][i], attrParts, index + 1);
        }
        return;
    }

    _deleteObjectAttribute(obj[attrParts[index]], attrParts, index + 1);
}

/**
 * Delete attribute in an object with complex names
 *
 * @param obj - object to get the attribute from
 * @param attr - attribute name, can be complex like `attr1.attr2.attr3`
 */
export function deleteObjectAttribute(obj: Record<string, any>, attr: string): void {
    // Optimization for 98% of the cases
    if (!attr.includes('.')) {
        delete obj[attr];
        return;
    }

    _deleteObjectAttribute(obj, attr.split('.'), 0);
}
