/**
 *      Common functions between client and server
 *
 *      Copyright 2013-2024 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

import path from 'node:path';
import deepClone from 'deep-clone';
import { tools } from '@iobroker/db-base';
import * as CONSTS from '@/lib/objects/constants.js';
import mime from 'mime-types';

export * as CONSTS from '@/lib/objects/constants.js';
export const ERRORS = CONSTS.ERRORS;
export const REG_CHECK_ID = CONSTS.REG_CHECK_ID;

const USER_STARTS_WITH = CONSTS.USER_STARTS_WITH;
const GROUP_STARTS_WITH = CONSTS.GROUP_STARTS_WITH;

export interface FileMimeInformation {
    /** the mime type, of the file */
    mimeType: string;
    /** if content is binary or textual */
    isBinary: boolean;
}

export interface ACLObject {
    owner: string;
    ownerGroup: string;
    object: number;
    state: number;
    file: number;
}

export interface FileObject {
    virtualFile?: boolean;
    stats: any;
    modifiedAt: number;
    createdAt: number;
    acl: ioBroker.EvaluatedFileACL;
}

export type CheckFileRightsCallback = (err: Error | null | undefined, options: Record<string, any>, opt?: any) => void;

const textTypes = ['.js', '.json', '.svg'];

/**
 * Checks if the mime type, of an extension is a known one and if it corresponds to binary content
 *
 * @param ext the file extension e.g. `.txt`
 */
function getKnownMimeType(ext: string): FileMimeInformation | null {
    try {
        const mimeType = mime.lookup(ext);
        if (mimeType) {
            return { mimeType, isBinary: !mimeType.startsWith('text/') && !textTypes.includes(ext) };
        }
    } catch {
        // ignore
    }

    return null;
}

// For objects
const defaultAcl = {
    groups: [],
    acl: {
        file: {
            list: false,
            read: false,
            write: false,
            create: false,
            delete: false,
        },
        object: {
            list: false,
            read: false,
            write: false,
            create: false,
            delete: false,
        },
        state: {
            list: false,
            read: false,
            write: false,
            create: false,
            delete: false,
        },
        users: {
            list: false,
            read: false,
            write: false,
            create: false,
            delete: false,
        },
    },
} as const;

// FIXME: This should have better types. Probably Record<string, {acl: ioBroker.ObjectPermissions, [x: string | number | symbol]: any}>
let users: Record<ioBroker.ObjectIDs.User, any> = {};
let groups: ioBroker.GroupObject[] = [];

/**
 * Determines the mime type, of an extension and if it is binary content
 *
 * @param ext file extension e.g. `.txt`
 * @param isTextData if content is of type string
 */
export function getMimeType(ext: string, isTextData: boolean): FileMimeInformation {
    if (!ext) {
        return { mimeType: isTextData ? 'text/plain' : 'application/octet-stream', isBinary: !isTextData };
    }

    ext = ext.toLowerCase();
    const mimeInfo = getKnownMimeType(ext);
    if (mimeInfo) {
        return mimeInfo;
    }
    return { mimeType: isTextData ? 'text/plain' : 'application/octet-stream', isBinary: !isTextData };
}

export function checkFile(
    fileOptions: Record<string, any>,
    options: Record<string, any>,
    flag: any,
    defaultNewAcl?: ACLObject | null,
): boolean {
    if (typeof fileOptions.acl !== 'object') {
        fileOptions = {};
        fileOptions.mimeType = deepClone(fileOptions);
        fileOptions.acl = {
            owner: (defaultNewAcl && defaultNewAcl.owner) || CONSTS.SYSTEM_ADMIN_USER,
            ownerGroup: (defaultNewAcl && defaultNewAcl.ownerGroup) || CONSTS.SYSTEM_ADMIN_GROUP,
            permissions:
                (defaultNewAcl && defaultNewAcl.file) ||
                CONSTS.ACCESS_USER_RW | CONSTS.ACCESS_GROUP_READ | CONSTS.ACCESS_EVERY_READ, // '0644'
        };
    }

    // Set default owner group
    fileOptions.acl.ownerGroup =
        fileOptions.acl.ownerGroup || (defaultNewAcl && defaultNewAcl.ownerGroup) || CONSTS.SYSTEM_ADMIN_GROUP;
    fileOptions.acl.owner = fileOptions.acl.owner || (defaultNewAcl && defaultNewAcl.owner) || CONSTS.SYSTEM_ADMIN_USER;
    fileOptions.acl.permissions =
        fileOptions.acl.permissions ||
        (defaultNewAcl && defaultNewAcl.file) ||
        CONSTS.ACCESS_USER_RW | CONSTS.ACCESS_GROUP_READ | CONSTS.ACCESS_EVERY_READ; // '0644'

    if (
        options.user !== CONSTS.SYSTEM_ADMIN_USER &&
        options.groups.indexOf(CONSTS.SYSTEM_ADMIN_GROUP) === -1 &&
        fileOptions.acl
    ) {
        if (fileOptions.acl.owner !== options.user) {
            // Check if the user is in the group
            if (options.groups.indexOf(fileOptions.acl.ownerGroup) !== -1) {
                // Check group rights
                if (!(fileOptions.acl.permissions & (flag << 4))) {
                    return false;
                }
            } else {
                // everybody
                if (!(fileOptions.acl.permissions & flag)) {
                    return false;
                }
            }
        } else {
            // Check user rights
            if (!(fileOptions.acl.permissions & (flag << 8))) {
                return false;
            }
        }
    }
    return true;
}

export function checkFileRights(
    objects: any,
    id: string,
    name: string | null,
    options: Record<string, any> | null | undefined,
    flag: CONSTS.GenericAccessFlags,
    callback?: CheckFileRightsCallback,
): any {
    const _options = options || {};
    if (!_options.user) {
        // Before files converted, lets think: if no options it is admin
        _options.user = 'system.user.admin';
        _options.params = _options;
        _options.group = 'system.group.administrator';
    }

    if (!_options.acl) {
        objects.getUserGroup(_options.user, (_user: any, groups: any, acl: Record<string, any>) => {
            _options.acl = acl || {};
            _options.groups = groups;
            _options.group = groups ? groups[0] : null;
            checkFileRights(objects, id, name, _options, flag, callback);
        });
        return;
    }
    // If user may write
    if (flag === CONSTS.ACCESS_WRITE && !_options.acl.file.write) {
        // write
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, _options);
    }
    // If user may read
    if (flag === CONSTS.ACCESS_READ && !_options.acl.file.read) {
        // read
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, _options);
    }

    _options.checked = true;
    objects.checkFile(id, name, _options, flag, (err: Error, options: Record<string, any>, opt: any) => {
        if (err) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
        }
        return tools.maybeCallbackWithError(callback, null, options, opt);
    });
}

// For users and groups
function getDefaultAdminRights(
    acl?: ioBroker.ObjectPermissions,
    _isState?: boolean,
): Omit<ioBroker.PermissionSet, 'user' | 'groups'> {
    return {
        ...acl,
        file: {
            list: true,
            read: true,
            write: true,
            create: true,
            delete: true,
        },
        object: {
            create: true,
            list: true,
            read: true,
            write: true,
            delete: true,
        },
        users: {
            create: true,
            list: true,
            read: true,
            write: true,
            delete: true,
        },
        state: {
            read: true,
            write: true,
            delete: true,
            create: true,
            list: true,
        },
        other: {
            execute: false,
            http: false,
            sendto: false,
        },
    };
}

export type GetUserGroupPromiseReturn = [user: string, groups: string[], acl: ioBroker.ObjectPermissions];

type GetUserGroupCallback = (
    err: Error | null | undefined,
    user: string,
    groups: string[],
    acl: ioBroker.ObjectPermissions,
) => void;

export function getUserGroup(
    objects: any,
    user: ioBroker.ObjectIDs.User,
    callback?: GetUserGroupCallback,
): Promise<GetUserGroupPromiseReturn> | void {
    if (!user || typeof user !== 'string' || !user.startsWith(USER_STARTS_WITH)) {
        console.log(`invalid user name: ${user}`);

        return tools.maybeCallbackWithError(
            callback,
            `invalid user name: ${user}`,
            deepClone(user),
            [],
            deepClone(defaultAcl.acl),
        );
    }
    if (users[user]) {
        return tools.maybeCallbackWithError(callback, null, user, users[user].groups, users[user].acl);
    }

    let error: Error;
    // Read all groups
    objects.getObjectList(
        { startkey: 'system.group.', endkey: 'system.group.\u9999' },
        { checked: true },
        (
            err: Error,
            arr: {
                rows: Array<ioBroker.GetObjectViewItem<ioBroker.GroupObject>>;
            },
        ) => {
            if (err) {
                error = err;
            }
            groups = [];
            if (arr) {
                // Read all groups
                for (const g in arr.rows) {
                    const val = arr.rows[g].value;
                    if (!val) {
                        continue;
                    }

                    groups[g] = val;
                    if (groups[g]._id === CONSTS.SYSTEM_ADMIN_GROUP) {
                        groups[g].common.acl = getDefaultAdminRights(groups[g].common.acl);
                    }
                }
            }

            objects.getObjectList(
                { startkey: 'system.user.', endkey: 'system.user.\u9999' },
                { checked: true },
                (
                    err?: Error | null,
                    arr?: {
                        rows: ioBroker.GetObjectListItem<ioBroker.UserObject>[];
                    },
                ) => {
                    if (err) {
                        error = err;
                    }
                    users = {};

                    if (arr) {
                        for (const row of arr.rows) {
                            // cannot use here Object.assign, because required deep copy
                            users[row.value._id] = deepClone(defaultAcl);
                        }
                    }
                    users[CONSTS.SYSTEM_ADMIN_USER] = users[CONSTS.SYSTEM_ADMIN_USER] || deepClone(defaultAcl);
                    users[CONSTS.SYSTEM_ADMIN_USER].acl = getDefaultAdminRights(users[CONSTS.SYSTEM_ADMIN_USER].acl);

                    for (let g = 0; g < groups.length; g++) {
                        if (!groups[g] || !groups[g].common || !groups[g].common.members) {
                            continue;
                        }
                        for (let m = 0; m < groups[g].common.members.length; m++) {
                            const u = groups[g].common.members[m];
                            if (!users[u]) {
                                error =
                                    error ||
                                    `Unknown user in group "${groups[g]._id.replace('system.group.', '')}": ${u}`;
                                continue;
                            }
                            users[u].groups.push(groups[g]._id);

                            if (groups[g].common.acl && groups[g].common.acl.file) {
                                if (!users[u].acl || !users[u].acl.file) {
                                    users[u].acl = users[u].acl || {};
                                    users[u].acl.file = users[u].acl.file || {};

                                    users[u].acl.file.create = groups[g].common.acl.file.create;
                                    users[u].acl.file.read = groups[g].common.acl.file.read;
                                    users[u].acl.file.write = groups[g].common.acl.file.write;
                                    users[u].acl.file.delete = groups[g].common.acl.file.delete;
                                    users[u].acl.file.list = groups[g].common.acl.file.list;
                                } else {
                                    users[u].acl.file.create =
                                        users[u].acl.file.create || groups[g].common.acl.file.create;
                                    users[u].acl.file.read = users[u].acl.file.read || groups[g].common.acl.file.read;
                                    users[u].acl.file.write =
                                        users[u].acl.file.write || groups[g].common.acl.file.write;
                                    users[u].acl.file.delete =
                                        users[u].acl.file.delete || groups[g].common.acl.file.delete;
                                    users[u].acl.file.list = users[u].acl.file.list || groups[g].common.acl.file.list;
                                }
                            }

                            if (groups[g].common.acl && groups[g].common.acl.object) {
                                if (!users[u].acl || !users[u].acl.object) {
                                    users[u].acl = users[u].acl || {};
                                    users[u].acl.object = users[u].acl.object || {};

                                    users[u].acl.object.create = groups[g].common.acl.object.create;
                                    users[u].acl.object.read = groups[g].common.acl.object.read;
                                    users[u].acl.object.write = groups[g].common.acl.object.write;
                                    users[u].acl.object.delete = groups[g].common.acl.object.delete;
                                    users[u].acl.object.list = groups[g].common.acl.object.list;
                                } else {
                                    users[u].acl.object.create =
                                        users[u].acl.object.create || groups[g].common.acl.object.create;
                                    users[u].acl.object.read =
                                        users[u].acl.object.read || groups[g].common.acl.object.read;
                                    users[u].acl.object.write =
                                        users[u].acl.object.write || groups[g].common.acl.object.write;
                                    users[u].acl.object.delete =
                                        users[u].acl.object.delete || groups[g].common.acl.object.delete;
                                    users[u].acl.object.list =
                                        users[u].acl.object.list || groups[g].common.acl.object.list;
                                }
                            }

                            if (groups[g].common.acl && groups[g].common.acl.users) {
                                if (!users[u].acl || !users[u].acl.users) {
                                    users[u].acl = users[u].acl || {};
                                    users[u].acl.users = users[u].acl.users || {};

                                    users[u].acl.users.create = groups[g].common.acl.users.create;
                                    users[u].acl.users.read = groups[g].common.acl.users.read;
                                    users[u].acl.users.write = groups[g].common.acl.users.write;
                                    users[u].acl.users.delete = groups[g].common.acl.users.delete;
                                    users[u].acl.users.list = groups[g].common.acl.users.list;
                                } else {
                                    users[u].acl.users.create =
                                        users[u].acl.users.create || groups[g].common.acl.users.create;
                                    users[u].acl.users.read =
                                        users[u].acl.users.read || groups[g].common.acl.users.read;
                                    users[u].acl.users.write =
                                        users[u].acl.users.write || groups[g].common.acl.users.write;
                                    users[u].acl.users.delete =
                                        users[u].acl.users.delete || groups[g].common.acl.users.delete;
                                    users[u].acl.users.list =
                                        users[u].acl.users.list || groups[g].common.acl.users.list;
                                }
                            }

                            if (groups[g].common.acl && groups[g].common.acl.state) {
                                if (!users[u].acl || !users[u].acl.state) {
                                    users[u].acl = users[u].acl || {};
                                    users[u].acl.state = users[u].acl.state || {};

                                    users[u].acl.state.create = groups[g].common.acl.state?.create;
                                    users[u].acl.state.read = groups[g].common.acl.state?.read;
                                    users[u].acl.state.write = groups[g].common.acl.state?.write;
                                    users[u].acl.state.delete = groups[g].common.acl.state?.delete;
                                    users[u].acl.state.list = groups[g].common.acl.state?.list;
                                } else {
                                    users[u].acl.state.create =
                                        users[u].acl.state.create || groups[g].common.acl.state?.create;
                                    users[u].acl.state.read =
                                        users[u].acl.state.read || groups[g].common.acl.state?.read;
                                    users[u].acl.state.write =
                                        users[u].acl.state.write || groups[g].common.acl.state?.write;
                                    users[u].acl.state.delete =
                                        users[u].acl.state.delete || groups[g].common.acl.state?.delete;
                                    users[u].acl.state.list =
                                        users[u].acl.state.list || groups[g].common.acl.state?.list;
                                }
                            }
                        }
                    }

                    return tools.maybeCallbackWithError(
                        callback,
                        error,
                        user,
                        users[user] ? users[user].groups : [],
                        users[user] ? users[user].acl : deepClone(defaultAcl.acl),
                    );
                },
            );
        },
    );
}

export function sanitizePath(
    id: string,
    name: string,
): {
    id: string;
    name: string;
} {
    if (!name) {
        name = '';
    }
    if (name[0] === '/') {
        name = name.substring(1);
    }

    if (!id) {
        throw new Error('Empty ID');
    }

    id = id.replace(/[\][*,;'"`<>\\?/]/g, ''); // remove all invalid characters from states plus slashes
    id = id.replace(/\.\./g, ''); // do not allow to write in parent directories

    if (name.includes('..')) {
        name = path.normalize(`/${name}`);
    }
    if (name.includes('..')) {
        // Also after normalization we still have .. in it - should not happen if normalize worked correctly
        name = name.replace(/\.\./g, '');
        name = path.normalize(`/${name}`);
    }

    name = name.replace(/\\/g, '/'); // replace win path backslashes

    if (name[0] === '/') {
        name = name.substring(1);
    } // do not allow absolute paths

    return { id: id, name: name };
}

export function checkObject(
    obj: ioBroker.AnyObject | FileObject | null,
    options: Record<string, any>,
    flag: CONSTS.GenericAccessFlags,
): boolean {
    // read rights of object
    if (!obj || !('common' in obj) || !obj.acl || flag === CONSTS.ACCESS_LIST) {
        return true;
    }

    if (options.user === CONSTS.SYSTEM_ADMIN_USER) {
        return true;
    }

    // admins may always see everything
    if (options.group === CONSTS.SYSTEM_ADMIN_GROUP || options.groups.includes(CONSTS.SYSTEM_ADMIN_GROUP)) {
        return true;
    }

    // FIXME: what if flag is ACCESS_DELETE or ACCESS_CREATE? currently it will end in false
    if (flag === CONSTS.ACCESS_DELETE || flag === CONSTS.ACCESS_CREATE) {
        return false;
    }

    // checkObject always called after checkObjectRights and admin is checked there
    if (obj.acl.owner !== options.user) {
        // Check if the user is in the group
        if (
            (options.group && options.group === obj.acl.ownerGroup) ||
            (options.groups && options.groups.includes(obj.acl.ownerGroup))
        ) {
            // Check group rights
            if (!(obj.acl.object & (flag << 4))) {
                return false;
            }
        } else {
            // everybody
            if (!(obj.acl.object & flag)) {
                return false;
            }
        }
    } else {
        // Check group rights
        if (!(obj.acl.object & (flag << 8))) {
            return false;
        }
    }
    return true; // ALL OK
}

export function checkObjectRights(
    objects: any,
    id: string | null,
    object: ioBroker.Object | null,
    options: Record<string, any> | null | undefined,
    flag: CONSTS.GenericAccessFlags,
    callback: (err: Error | null | undefined, options: Record<string, any>) => void,
): void | Promise<Record<string, any>> {
    options = options || {};

    if (!options.user) {
        // Before files converted, lets think: if no options it is admin
        options = {
            user: CONSTS.SYSTEM_ADMIN_USER,
            params: options,
            group: CONSTS.SYSTEM_ADMIN_GROUP,
            groups: [CONSTS.SYSTEM_ADMIN_GROUP],
            acl: getDefaultAdminRights(),
        };
    }

    if (!options.acl) {
        return objects.getUserGroup(options.user, (_user: string, groups: any, acl: Record<string, any>) => {
            // TODO: ts needs it because we are doing async call before
            options = options || {};
            options.acl = acl || {};
            options.groups = groups;
            options.group = groups ? groups[0] : null;
            checkObjectRights(objects, id, object, options, flag, callback);
        });
    }

    // now options are filled and we can go
    if (
        options.user === CONSTS.SYSTEM_ADMIN_USER ||
        options.group === CONSTS.SYSTEM_ADMIN_GROUP ||
        (options.groups && options.groups.includes(CONSTS.SYSTEM_ADMIN_GROUP))
    ) {
        return tools.maybeCallbackWithError(callback, null, options);
    }

    // if user or group objects
    if (typeof id === 'string' && (id.startsWith(USER_STARTS_WITH) || id.startsWith(GROUP_STARTS_WITH))) {
        // If user may write
        if (flag === CONSTS.ACCESS_WRITE && !options.acl.users.write) {
            // write
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
        }

        // If user may read
        if (flag === CONSTS.ACCESS_READ && !options.acl.users.read) {
            // read
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
        }

        // If user may delete
        if (flag === CONSTS.ACCESS_DELETE && !options.acl.users.delete) {
            // delete
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
        }

        // If user may list
        if (flag === CONSTS.ACCESS_LIST && !options.acl.users.list) {
            // list
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
        }

        // If user may create
        if (flag === CONSTS.ACCESS_CREATE && !options.acl.users.create) {
            // create
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
        }

        // If user may write
        if (flag === CONSTS.ACCESS_DELETE) {
            // he may delete
            flag = CONSTS.ACCESS_WRITE;
        }
    }

    // If user may write
    if (flag === CONSTS.ACCESS_WRITE && !options.acl.object.write) {
        // write
        tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
    }

    // If user may read
    if (flag === CONSTS.ACCESS_READ && !options.acl.object.read) {
        // read
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
    }

    // If user may delete
    if (flag === CONSTS.ACCESS_DELETE && !options.acl.object.delete) {
        // delete
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
    }

    // If user may list
    if (flag === CONSTS.ACCESS_LIST && !options.acl.object.list) {
        // list
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
    }

    if (flag === CONSTS.ACCESS_DELETE) {
        // write
        flag = CONSTS.ACCESS_WRITE;
    }

    if (id && !checkObject(object, options, flag)) {
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
    }
    return tools.maybeCallbackWithError(callback, null, options);
}
