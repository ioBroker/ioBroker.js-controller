/**
 * Constants needed for adapter.js and controller
 */

/** Using the const array just for type inference */
const SUPPORTED_FEATURES_INTERNAL = [
    'ALIAS', // Alias Feature supported, Since `js-controller` 2.0
    'ALIAS_SEPARATE_READ_WRITE_ID', // Alias support separated ids for read and write, Since `js-controller` 3.0
    'ADAPTER_GETPORT_BIND', // getPort method of adapter supports second parameter to bind to a special network interface, Since js-controller 2.0
    'ADAPTER_DEL_OBJECT_RECURSIVE', // delObject supports options.recursive flag to delete objects structures recursive, Since js-controller 2.2
    'ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE', // setObject(*) methods set the default (def) value via setState after the object is created. Since js-controller 2.0
    'ADAPTER_AUTO_DECRYPT_NATIVE', // all native attributes that are listed in an array `encryptedNative` in io-pack will be automatically decrypted and encrypted. Since js-controller 3.0
    'PLUGINS', // configurable plugins supported. Since `js-controller` 3.0
    'CONTROLLER_NPM_AUTO_REBUILD', // Automatic rebuild when node version mismatch is detected. Since `js-controller` 3.0
    'CONTROLLER_READWRITE_BASE_SETTINGS', // If base settings could be read and written. Since js-controller 3.0
    'CONTROLLER_MULTI_REPO', // Controller supports multiple repositories
    'CONTROLLER_LICENSE_MANAGER', // Controller can read licenses from iobroker.net. Since js-controller 4.0
    'CONTROLLER_OS_PACKAGE_UPGRADE', // Controller can upgrade OS packages
    'DEL_INSTANCE_CUSTOM', // instances/adapter can be deleted with --custom flag to remove corresponding custom of all objects. Since js-controller 4.0
    'CUSTOM_FULL_VIEW', // `getObjectView('system', 'custom-full', ...)` will return full objects and not only `common.custom` part. Since `js-controller` 5.0
    'ADAPTER_GET_OBJECTS_BY_ARRAY', // getForeignObjects supports an array of ids too. Since js-controller 5.0
    'CONTROLLER_UI_UPGRADE', // Controller can be updated via sendToHost('upgradeController', ...)
    'ADAPTER_WEBSERVER_UPGRADE', // Controller supports upgrading adapter and provides a webserver (triggered via sendToHost). Since `js-controller` 5.0
    'CONTROLLER_CMD_EXEC_FILES', // cmdExec host message supports sending files together with the command. Since `js-controller` 7.2
    'CONTROLLER_FEATURE_REQUEST', // Is js-controller supports feature supported requests. Since `js-controller` 7.2
] as const;

export const SUPPORTED_FEATURES = [...SUPPORTED_FEATURES_INTERNAL];

export type SupportedFeature = (typeof SUPPORTED_FEATURES)[number];

// Compile-time guarantee that the runtime list stays in sync with the public `ioBroker.SupportedFeature` type (defined in @iobroker/types-dev)
type AssertExtends<T extends U, U> = T;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _AssertFeaturesInSync = AssertExtends<SupportedFeature, ioBroker.SupportedFeature> &
    AssertExtends<ioBroker.SupportedFeature, SupportedFeature>;
