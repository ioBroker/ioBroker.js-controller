"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_FEATURES = exports.ACCESS_USER_WRITE = exports.ACCESS_USER_READ = exports.ACCESS_EVERY_READ = exports.ACCESS_EVERY_WRITE = exports.ACCESS_GROUP_WRITE = exports.ACCESS_GROUP_READ = exports.ERROR_PERMISSION = exports.QUALITY_SUBS_INITIAL = exports.SYSTEM_ADMIN_GROUP = exports.SYSTEM_ADMIN_USER = exports.ALIAS_STARTS_WITH = exports.DEFAULT_SECRET = void 0;
/**
 * Constants needed for adapter.js
 */
exports.DEFAULT_SECRET = 'Zgfr56gFe87jJOM';
exports.ALIAS_STARTS_WITH = 'alias.';
exports.SYSTEM_ADMIN_USER = 'system.user.admin';
exports.SYSTEM_ADMIN_GROUP = 'system.group.administrator';
exports.QUALITY_SUBS_INITIAL = 0x20;
exports.ERROR_PERMISSION = 'permissionError';
exports.ACCESS_GROUP_READ = 0x40;
exports.ACCESS_GROUP_WRITE = 0x20;
exports.ACCESS_EVERY_WRITE = 0x2;
exports.ACCESS_EVERY_READ = 0x4;
exports.ACCESS_USER_READ = 0x400;
exports.ACCESS_USER_WRITE = 0x200;
exports.SUPPORTED_FEATURES = [
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
];
//# sourceMappingURL=constants.js.map