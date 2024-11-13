/**
 * Constants needed for adapter.js
 */
export const DEFAULT_SECRET = 'Zgfr56gFe87jJOM';
export const ALIAS_STARTS_WITH = 'alias.';
export const SYSTEM_ADMIN_USER = 'system.user.admin';
export const SYSTEM_ADMIN_GROUP = 'system.group.administrator';
export const ERROR_PERMISSION = 'permissionError';
export const ACCESS_GROUP_READ = 0x40;
export const ACCESS_GROUP_WRITE = 0x20;
export const ACCESS_EVERY_WRITE = 0x2;
export const ACCESS_EVERY_READ = 0x4;
export const ACCESS_USER_READ = 0x400;
export const ACCESS_USER_WRITE = 0x200;
export const NO_PROTECT_ADAPTERS = ['admin', 'iot', 'cloud', 'discovery'];

/** Two-way mapping for state quality ("q" attribute of a state) */
export enum STATE_QUALITY {
    /** The default value for a state */
    GOOD = 0x00,
    /** General problem */
    BAD = 0x01,
    /** The instance cannot establish a connection */
    CONNECTION_PROBLEM = 0x02,
    /** Substitute value from controller. Do not set this in adapters */
    SUBSTITUTE_FROM_CONTROLLER = 0x10,
    /** Quality for default values */
    SUBSTITUTE_INITIAL_VALUE = 0x20,
    /** Substitute value from instance or device */
    SUBSTITUTE_DEVICE_INSTANCE_VALUE = 0x40,
    /** Substitute value from a sensor */
    SUBSTITUTE_SENSOR_VALUE = 0x80,
    /** General problem by instance */
    GENERAL_INSTANCE_PROBLEM = 0x11,
    /** General problem by device */
    GENERAL_DEVICE_PROBLEM = 0x41,
    /** General problem by sensor */
    GENERAL_SENSOR_PROBLEM = 0x81,
    /** The instance is not connected */
    INSTANCE_NOT_CONNECTED = 0x12,
    /** The device is not connected */
    DEVICE_NOT_CONNECTED = 0x42,
    /** The sensor is not connected */
    SENSOR_NOT_CONNECTED = 0x82,
    /** The device has reported an error */
    DEVICE_ERROR_REPORT = 0x44,
    /** The sensor has reported an error */
    SENSOR_ERROR_REPORT = 0x84,
}

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
] as const;

export const SUPPORTED_FEATURES = [...SUPPORTED_FEATURES_INTERNAL];

export type SupportedFeature = (typeof SUPPORTED_FEATURES)[number];

/** Maximum possible value for 32-bit signed integer */
export const MAX_TIMEOUT = 2 ** 32 / 2 - 1;
