"use strict";
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
        'ALIAS',
        'ALIAS_SEPARATE_READ_WRITE_ID',
        'ADAPTER_GETPORT_BIND',
        'ADAPTER_DEL_OBJECT_RECURSIVE',
        'ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE',
        'ADAPTER_AUTO_DECRYPT_NATIVE',
        'PLUGINS',
        'CONTROLLER_NPM_AUTO_REBUILD',
        'CONTROLLER_READWRITE_BASE_SETTINGS',
        'CONTROLLER_MULTI_REPO',
        'CONTROLLER_LICENSE_MANAGER',
        'DEL_INSTANCE_CUSTOM' // instances/adapter can be deleted with --custom flag to remove corresponding custom of all objects. Since js-controller 4.0
    ]
};
//# sourceMappingURL=constants.js.map