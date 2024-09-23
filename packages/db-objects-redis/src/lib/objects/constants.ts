export enum ERRORS {
    ERROR_PERMISSION = 'permissionError',
    ERROR_NOT_FOUND = 'Not exists',
    ERROR_DB_CLOSED = 'DB closed',
}

export const SYSTEM_ADMIN_USER = 'system.user.admin';
export const SYSTEM_ADMIN_GROUP = 'system.group.administrator';

export const ACCESS_EVERY_EXEC = 0x1;
export const ACCESS_EVERY_WRITE = 0x2;
export const ACCESS_EVERY_READ = 0x4;
export const ACCESS_EVERY_RW = ACCESS_EVERY_WRITE | ACCESS_EVERY_READ;
export const ACCESS_EVERY_ALL = ACCESS_EVERY_WRITE | ACCESS_EVERY_READ | ACCESS_EVERY_EXEC;

export const ACCESS_GROUP_EXEC = 0x10;
export const ACCESS_GROUP_WRITE = 0x20;
export const ACCESS_GROUP_READ = 0x40;
export const ACCESS_GROUP_RW = ACCESS_GROUP_WRITE | ACCESS_GROUP_READ;
export const ACCESS_GROUP_ALL = ACCESS_GROUP_WRITE | ACCESS_GROUP_READ | ACCESS_GROUP_EXEC;

export const ACCESS_USER_EXEC = 0x100;
export const ACCESS_USER_WRITE = 0x200;
export const ACCESS_USER_READ = 0x400;
export const ACCESS_USER_RW = ACCESS_USER_WRITE | ACCESS_USER_READ;
export const ACCESS_USER_ALL = ACCESS_USER_WRITE | ACCESS_USER_READ | ACCESS_USER_EXEC;

export const ACCESS_WRITE = 0x2;
export const ACCESS_READ = 0x4;
export const ACCESS_LIST = 'list';
export const ACCESS_DELETE = 'delete';
export const ACCESS_CREATE = 'create';

export type GenericAccessFlags =
    | typeof ACCESS_WRITE
    | typeof ACCESS_READ
    | typeof ACCESS_LIST
    | typeof ACCESS_DELETE
    | typeof ACCESS_CREATE;

export const REG_CHECK_ID = /[*?[\]]|\$%\$/;

export const USER_STARTS_WITH = 'system.user.';
export const GROUP_STARTS_WITH = 'system.group.';
