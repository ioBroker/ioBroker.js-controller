/**
 * Constants needed for adapter.js
 */
export const DEFAULT_SECRET = 'Zgfr56gFe87jJOM';
export const ALIAS_STARTS_WITH = 'alias.';
export const SYSTEM_ADMIN_USER = 'system.user.admin';
export const SYSTEM_ADMIN_GROUP = 'system.group.administrator';
export const QUALITY_SUBS_INITIAL = 0x20;
export const ERROR_PERMISSION = 'permissionError';
export const ACCESS_GROUP_READ = 0x40;
export const ACCESS_GROUP_WRITE = 0x20;
export const ACCESS_EVERY_WRITE = 0x2;
export const ACCESS_EVERY_READ = 0x4;
export const ACCESS_USER_READ = 0x400;
export const ACCESS_USER_WRITE = 0x200;
export const NO_PROTECT_ADAPTERS = ['admin', 'iot', 'cloud'];
export const SUPPORTED_FEATURES = [
    'ALIAS', // Alias Feature supported, Since `js-controller` 2.0
    'ALIAS_SEPARATE_READ_WRITE_ID', // Alias support separated ids for read and write, Since `js-controller` 3.0
    'ADAPTER_GETPORT_BIND', // getPort method of adapter supports second parameter to bind to a special network interface, Since js-controller 2.0
    'ADAPTER_DEL_OBJECT_RECURSIVE', // delObject supports options.recursive flag to delete objects structures recursive, Since js-controller 2.2
    'ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE', // setObject(*) methods set the default (def) value via setState after the object is created. Since js-controller 2.0
    'ADAPTER_AUTO_DECRYPT_NATIVE', // all native attributes, that are listed in an array `encryptedNative` in io-pack will be automatically decrypted and encrypted. Since js-controller 3.0
    'PLUGINS', // configurable plugins supported. Since `js-controller` 3.0
    'CONTROLLER_NPM_AUTO_REBUILD', // Automatic rebuild when node version mismatch is detected. Since `js-controller` 3.0
    'CONTROLLER_READWRITE_BASE_SETTINGS', // If base settings could be read and written. Since js-controller 3.0
    'CONTROLLER_MULTI_REPO', // Controller supports multiple repositories
    'CONTROLLER_LICENSE_MANAGER', // Controller can read licenses from iobroker.net. Since js-controller 4.0
    'DEL_INSTANCE_CUSTOM', // instances/adapter can be deleted with --custom flag to remove corresponding custom of all objects. Since js-controller 4.0
    'BINARY_STATE_EVENT', // stateChange event could be received for binary states too. Deprecated in js-controller 5.0
    'CUSTOM_FULL_VIEW', // `getObjectView('system', 'custom-full', ...)` will return full objects and not only `common.custom` part. Since `js-controller` 5.0
    'ADAPTER_GET_OBJECTS_BY_ARRAY' // getForeignObjects supports array of ids too. Since js-controller 5.0
];

/** Maximum possible value for 32-bit signed integer */
export const MAX_TIMEOUT = 2 ** 32 / 2 - 1;
