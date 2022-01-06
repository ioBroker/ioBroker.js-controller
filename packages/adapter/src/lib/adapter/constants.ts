/**
 * Constants needed for adapter.js
 */
module.exports = {
    DEFAULT_SECRET: 'Zgfr56gFe87jJOM',
    ALIAS_STARTS_WITH: 'alias.',
    SYSTEM_ADMIN_USER: 'system.user.admin',
    SYSTEM_ADMIN_GROUP: 'system.group.administrator',
    QUALITY_SUBS_INITIAL: 0x20,
    ERROR_PERMISSION: 'permissionError',
    ACCESS_GROUP_READ: 0x40,
    ACCESS_GROUP_WRITE: 0x20,
    ACCESS_EVERY_WRITE: 0x2,
    ACCESS_EVERY_READ: 0x4,
    ACCESS_USER_READ: 0x400,
    ACCESS_USER_WRITE: 0x200,
    SUPPORTED_FEATURES: [
        'ALIAS', // Alias Feature supported, Since js-controller 2.0
        'ALIAS_SEPARATE_READ_WRITE_ID', // Alias support separated ids for read and write, Since js-controller 3.0
        'ADAPTER_GETPORT_BIND', // getPort method of adapter supports second parameter to bind to a special network interface, Since js-controller 2.0
        'ADAPTER_DEL_OBJECT_RECURSIVE', // delObject supports options.recursive flag to delete objects structures recursive, Since js-controller 2.2
        'ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE', // setObject(*) methods set the default (def) value via setState after the object is created. Since js-controller 2.0
        'ADAPTER_AUTO_DECRYPT_NATIVE', // all native attributes, that are listed in an array `encryptedNative` in io-pack will be automatically decrypted and encrypted. Since js-controller 3.0
        'PLUGINS', // configurable plugins supported. Since js-controller 3.0
        'CONTROLLER_NPM_AUTO_REBUILD', // Automatic rebuild when node version mismatch is detected. Since js-controller 3.0
        'CONTROLLER_READWRITE_BASE_SETTINGS', // If base settings could be read and written. Since js-controller 3.0
        'CONTROLLER_MULTI_REPO', // Controller supports multiple repositories
        'CONTROLLER_LICENSE_MANAGER', // Controller can read licenses from iobroker.net. Since js-controller 4.0    'CONTROLLER_MULTI_REPO', // Controller supports multiple repositories
        'DEL_INSTANCE_CUSTOM' // instances/adapter can be deleted with --custom flag to remove corresponding custom of all objects. Since js-controller 4.0
    ]
};
