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

/** Maximum possible value for 32-bit signed integer */
export const MAX_TIMEOUT = 2 ** 32 / 2 - 1;
