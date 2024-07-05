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
import {
    AllPossibleRequestOptions,
    RequestOptionsInternal,
    MetaFileData
} from '@/lib/objects/objectsInRedisClient.js';

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
    stats: { size?: number };
    modifiedAt: number;
    createdAt: number;
    acl: ioBroker.EvaluatedFileACL;
}

export type CheckFileRightsCallback = (err: Error | null | undefined, options: RequestOptionsInternal, meta?: MetaFileData) => void;

const textTypes = ['.js', '.json', '.svg'];

/**
 * Checks if the mime type, of an extension that is known and if it corresponds to binary content
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

export type UserRights = { groups: ioBroker.ObjectIDs.Group[], acl: ioBroker.ObjectPermissions };

// For objects
const defaultAcl: UserRights = {
    groups: [],
    acl: {
        file: {
            list: false,
            read: false,
            write: false,
            create: false,
            delete: false
        },
        object: {
            list: false,
            read: false,
            write: false,
            create: false,
            delete: false
        },
        state: {
            list: false,
            read: false,
            write: false,
            create: false,
            delete: false
        },
        users: {
            list: false,
            read: false,
            write: false,
            create: false,
            delete: false
        }
    }
} as const;

let users: Record<ioBroker.ObjectIDs.User, UserRights> = {};
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
    fileOptions: MetaFileData,
    options: RequestOptionsInternal,
    flag: number,
    defaultNewAcl?: ACLObject | null
): boolean {
    if (!fileOptions?.acl) {
        fileOptions = {
            acl: {
                owner: defaultNewAcl?.owner || CONSTS.SYSTEM_ADMIN_USER,
                ownerGroup: defaultNewAcl?.ownerGroup || CONSTS.SYSTEM_ADMIN_GROUP,
                permissions: defaultNewAcl?.file ||
                    (CONSTS.ACCESS_USER_RW | CONSTS.ACCESS_GROUP_READ | CONSTS.ACCESS_EVERY_READ) // '0644'
            }
        };
    }

    // Set default owner group
    if (fileOptions.acl) {
        if (!fileOptions.acl.ownerGroup) {
            fileOptions.acl.ownerGroup = defaultNewAcl?.ownerGroup || CONSTS.SYSTEM_ADMIN_GROUP;
        }
        if (!fileOptions.acl.owner) {
            fileOptions.acl.owner = defaultNewAcl?.owner || CONSTS.SYSTEM_ADMIN_USER;
        }
        if (!fileOptions.acl.permissions) {
            fileOptions.acl.permissions = defaultNewAcl?.file ||
                (CONSTS.ACCESS_USER_RW | CONSTS.ACCESS_GROUP_READ | CONSTS.ACCESS_EVERY_READ); // '0644'
        }
    }

    if (
        options.user !== CONSTS.SYSTEM_ADMIN_USER &&
        options.group !== CONSTS.SYSTEM_ADMIN_GROUP &&
        !options.groups.includes(CONSTS.SYSTEM_ADMIN_GROUP) &&
        fileOptions.acl
    ) {
        if (fileOptions.acl.owner !== options.user) {
            // Check if the user is in the group
            if (options.groups.includes(fileOptions.acl.ownerGroup as ioBroker.ObjectIDs.Group)) {
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
    options: AllPossibleRequestOptions | null | undefined,
    flag: CONSTS.GenericAccessFlags,
    callback?: CheckFileRightsCallback
): any {
    let internalOptions: RequestOptionsInternal;
    if (!options) {
        // Before files converted, let's think: if no options it is "admin"
        objects.getUserGroup(CONSTS.SYSTEM_ADMIN_USER, (_user: ioBroker.ObjectIDs.User, groups: ioBroker.ObjectIDs.Group[], acl: ioBroker.ObjectPermissions) => {
            internalOptions = {
                acl,
                user: CONSTS.SYSTEM_ADMIN_USER,
                group: CONSTS.SYSTEM_ADMIN_GROUP,
                groups,
            }
            checkFileRights(objects, id, name, internalOptions, flag, callback);
        });
        return;
    }

    internalOptions = options as RequestOptionsInternal;

    if (!internalOptions.user) {
        // Before files converted, let's think: if no options it is "admin"
        internalOptions.user = CONSTS.SYSTEM_ADMIN_USER;
        internalOptions.group = CONSTS.SYSTEM_ADMIN_GROUP;
        internalOptions.groups = [CONSTS.SYSTEM_ADMIN_GROUP];
    }

    if (!internalOptions.acl) {
        objects.getUserGroup(internalOptions.user, (_user: ioBroker.ObjectIDs.User, groups: ioBroker.ObjectIDs.Group[], acl: ioBroker.ObjectPermissions) => {
            internalOptions.acl = acl;
            internalOptions.groups = groups;
            internalOptions.group = groups ? groups[0] : undefined;
            checkFileRights(objects, id, name, internalOptions, flag, callback);
        });
        return;
    }

    // If user may write
    if (flag === CONSTS.ACCESS_WRITE && !internalOptions.acl.file.write) {
        // write
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
    }
    // If user may create
    if (flag === CONSTS.ACCESS_CREATE && !internalOptions.acl.file.create) {
        // create
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
    }
    // If user may delete
    if (flag === CONSTS.ACCESS_DELETE && !internalOptions.acl.file.delete) {
        // create
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
    }
    // If user may list
    if (flag === CONSTS.ACCESS_LIST && !internalOptions.acl.file.list) {
        // create
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
    }
    // If user may read
    if (flag === CONSTS.ACCESS_READ && !internalOptions.acl.file.read) {
        // read
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
    }

    // migrate all rights to write or read
    if (flag === CONSTS.ACCESS_CREATE || flag === CONSTS.ACCESS_DELETE) {
        flag = CONSTS.ACCESS_WRITE;
    } else if (flag === CONSTS.ACCESS_LIST) {
        flag = CONSTS.ACCESS_READ;
    }

    internalOptions.checked = true;
    objects.checkFile(id, name, internalOptions, flag as number, (err: Error, _internalOptions: RequestOptionsInternal, meta?: MetaFileData) => {
        if (err) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, _internalOptions);
        }

        return tools.maybeCallbackWithError(callback, null, _internalOptions, meta);
    });
}

// For users and groups
function getDefaultAdminRights(
    acl?: ioBroker.ObjectPermissions,
    _isState?: boolean
): Omit<ioBroker.PermissionSet, 'user' | 'groups'> {
    return {
        ...acl,
        file: {
            list: true,
            read: true,
            write: true,
            create: true,
            delete: true
        },
        object: {
            create: true,
            list: true,
            read: true,
            write: true,
            delete: true
        },
        users: {
            create: true,
            list: true,
            read: true,
            write: true,
            delete: true
        },
        state: {
            read: true,
            write: true,
            delete: true,
            create: true,
            list: true
        },
        other: {
            execute: false,
            http: false,
            sendto: false
        }
    };
}

export type GetUserGroupPromiseReturn = [user: ioBroker.ObjectIDs.User, groups: ioBroker.ObjectIDs.Group[], acl: ioBroker.ObjectPermissions];

type GetUserGroupCallback = (
    err: Error | null | undefined,
    user: ioBroker.ObjectIDs.User,
    groups: ioBroker.ObjectIDs.Group[],
    acl: ioBroker.ObjectPermissions
) => void;

export function getUserGroup(
    objects: any,
    user: ioBroker.ObjectIDs.User,
    callback?: GetUserGroupCallback
): Promise<GetUserGroupPromiseReturn> | void {
    if (!user || typeof user !== 'string' || !user.startsWith(USER_STARTS_WITH)) {
        console.log(`invalid user name: ${user}`);

        return tools.maybeCallbackWithError(
            callback,
            `invalid user name: ${user}`,
            deepClone(user),
            [],
            deepClone(defaultAcl.acl)
        );
    }
    // if cached
    if (users[user]) {
        return tools.maybeCallbackWithError(callback, null, user, users[user].groups, users[user].acl);
    }

    let error: Error;
    // Read all groups
    objects.getObjectList(
        { startkey: 'system.group.', endkey: 'system.group.\u9999' },
        { checked: true },
        (err: Error, arr: { rows: Array<ioBroker.GetObjectViewItem<ioBroker.GroupObject>> }) => {
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
                (err?: Error | null, arr?: { rows: ioBroker.GetObjectListItem<ioBroker.UserObject>[] }) => {
                    if (err) {
                        error = err;
                    }
                    users = {};

                    if (arr) {
                        for (const row of arr.rows) {
                            // cannot use here Object.assign, because required deep copy
                            users[row.value._id as ioBroker.ObjectIDs.User] = deepClone<UserRights>(defaultAcl);
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

                            if (groups[g].common.acl?.file) {
                                const groupAcl: ioBroker.ObjectOperationPermissions = groups[g].common.acl.file;
                                if (!users[u].acl?.file) {
                                    users[u].acl = users[u].acl || {};
                                    users[u].acl.file = users[u].acl.file || {};
                                    const stateAcl: ioBroker.ObjectOperationPermissions = users[u].acl.file;

                                    stateAcl.create = groupAcl.create;
                                    stateAcl.read = groupAcl.read;
                                    stateAcl.write = groupAcl.write;
                                    stateAcl.delete = groupAcl.delete;
                                    stateAcl.list = groupAcl.list;
                                } else {
                                    const stateAcl: ioBroker.ObjectOperationPermissions = users[u].acl.file;
                                    // merge rights all together
                                    stateAcl.create = stateAcl.create || groupAcl.create;
                                    stateAcl.read = stateAcl.read || groupAcl.read;
                                    stateAcl.write = stateAcl.write || groupAcl.write;
                                    stateAcl.delete = stateAcl.delete || groupAcl.delete;
                                    stateAcl.list = stateAcl.list || groupAcl.list;
                                }
                            }

                            if (groups[g].common.acl?.object) {
                                const groupAcl: ioBroker.ObjectOperationPermissions = groups[g].common.acl.object;
                                if (!users[u].acl?.object) {
                                    users[u].acl = users[u].acl || {};
                                    users[u].acl.object = users[u].acl.object || {};
                                    const stateAcl: ioBroker.ObjectOperationPermissions = users[u].acl.object;

                                    stateAcl.create = groupAcl.create;
                                    stateAcl.read = groupAcl.read;
                                    stateAcl.write = groupAcl.write;
                                    stateAcl.delete = groupAcl.delete;
                                    stateAcl.list = groupAcl.list;
                                } else {
                                    const stateAcl: ioBroker.ObjectOperationPermissions = users[u].acl.object;
                                    // merge rights all together
                                    stateAcl.create = stateAcl.create || groupAcl.create;
                                    stateAcl.read = stateAcl.read || groupAcl.read;
                                    stateAcl.write = stateAcl.write || groupAcl.write;
                                    stateAcl.delete = stateAcl.delete || groupAcl.delete;
                                    stateAcl.list = stateAcl.list || groupAcl.list;
                                }
                            }

                            if (groups[g].common.acl?.users) {
                                const groupAcl: ioBroker.ObjectOperationPermissions = groups[g].common.acl.users;
                                if (!users[u].acl?.users) {
                                    users[u].acl = users[u].acl || {};
                                    users[u].acl.users = users[u].acl.users || {};
                                    const stateAcl: ioBroker.ObjectOperationPermissions = users[u].acl.users;

                                    stateAcl.create = groupAcl.create;
                                    stateAcl.read = groupAcl.read;
                                    stateAcl.write = groupAcl.write;
                                    stateAcl.delete = groupAcl.delete;
                                    stateAcl.list = groupAcl.list;
                                } else {
                                    const stateAcl: ioBroker.ObjectOperationPermissions = users[u].acl.users;
                                    // merge rights all together
                                    stateAcl.create = stateAcl.create || groupAcl.create;
                                    stateAcl.read = stateAcl.read || groupAcl.read;
                                    stateAcl.write = stateAcl.write || groupAcl.write;
                                    stateAcl.delete = stateAcl.delete || groupAcl.delete;
                                    stateAcl.list = stateAcl.list || groupAcl.list;
                                }
                            }

                            if (groups[g].common.acl?.state) {
                                const groupAcl: ioBroker.ObjectOperationPermissions = groups[g].common.acl.state as ioBroker.ObjectOperationPermissions;
                                if (!users[u].acl?.state) {
                                    users[u].acl = users[u].acl || ({} as ioBroker.PermissionSet);
                                    users[u].acl.state = users[u].acl.state || ({} as ioBroker.ObjectOperationPermissions);
                                    const stateAcl: ioBroker.ObjectOperationPermissions = users[u].acl.state as ioBroker.ObjectOperationPermissions;

                                    stateAcl.create = groupAcl.create;
                                    stateAcl.read = groupAcl.read;
                                    stateAcl.write = groupAcl.write;
                                    stateAcl.delete = groupAcl.delete;
                                    stateAcl.list = groupAcl.list;
                                } else {
                                    const stateAcl: ioBroker.ObjectOperationPermissions = users[u].acl.state as ioBroker.ObjectOperationPermissions;
                                    // merge rights all together
                                    stateAcl.create = stateAcl.create || groupAcl.create;
                                    stateAcl.read = stateAcl.read || groupAcl.read;
                                    stateAcl.write = stateAcl.write || groupAcl.write;
                                    stateAcl.delete = stateAcl.delete || groupAcl.delete;
                                    stateAcl.list = stateAcl.list || groupAcl.list;
                                }
                            }
                        }
                    }

                    return tools.maybeCallbackWithError(
                        callback,
                        error,
                        user,
                        users[user] ? users[user].groups : [],
                        users[user] ? users[user].acl : deepClone(defaultAcl.acl)
                    );
                }
            );
        }
    );
}

export function sanitizePath(id: string, name: string): { id: string; name: string } {
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
    id = id.replace(/\.\./g, ''); // do not allow writing in parent directories

    if (name.includes('..')) {
        name = path.normalize('/' + name);
    }
    if (name.includes('..')) {
        // Also after normalization we still have ".." in it - should not happen if normalize worked correctly
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
    options: RequestOptionsInternal,
    flag: CONSTS.GenericAccessFlags
): boolean {
    // read the rights of an object
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

    // ACCESS_DELETE and ACCESS_CREATE will be converted to ACCESS_WRITE
    if (flag === CONSTS.ACCESS_DELETE || flag === CONSTS.ACCESS_CREATE) {
        flag = CONSTS.ACCESS_WRITE;
    } else if (flag as any as string === CONSTS.ACCESS_LIST) {
        flag = CONSTS.ACCESS_READ;
    }

    // checkObject always called after checkObjectRights and admin is checked there
    if (obj.acl.owner !== options.user) {
        // Check if the user is in the group
        if (
            (options.group && options.group === obj.acl.ownerGroup) ||
            (options.groups && options.groups.includes(obj.acl.ownerGroup as ioBroker.ObjectIDs.Group))
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
    options: AllPossibleRequestOptions | null | undefined,
    flag: CONSTS.GenericAccessFlags,
    callback: (err: Error | null | undefined, internalOptions: RequestOptionsInternal) => void
): void | Promise<Record<string, any>> {
    let internalOptions: RequestOptionsInternal;

    if (!options?.user) {
        // Before files converted, let's think: if no options it is "admin"
        internalOptions = {
            user: CONSTS.SYSTEM_ADMIN_USER,
            group: CONSTS.SYSTEM_ADMIN_GROUP,
            groups: [CONSTS.SYSTEM_ADMIN_GROUP],
            acl: getDefaultAdminRights()
        };
    } else {
        internalOptions = options as RequestOptionsInternal;
    }

    if (!internalOptions.acl) {
        return objects.getUserGroup(internalOptions.user, (_user: ioBroker.ObjectIDs.User, groups: ioBroker.ObjectIDs.Group[], acl: ioBroker.ObjectPermissions) => {
            // TODO: ts needs it because we are doing async call before
            internalOptions.acl = acl;
            internalOptions.groups = groups;
            internalOptions.group = groups ? groups[0] : undefined;
            checkObjectRights(objects, id, object, options, flag, callback);
        });
    }

    // now options are filled and we can go
    if (
        internalOptions.user === CONSTS.SYSTEM_ADMIN_USER ||
        internalOptions.group === CONSTS.SYSTEM_ADMIN_GROUP ||
        (internalOptions.groups && internalOptions.groups.includes(CONSTS.SYSTEM_ADMIN_GROUP))
    ) {
        return tools.maybeCallbackWithError(callback, null, internalOptions);
    }

    // if user or group objects
    if (typeof id === 'string' && (id.startsWith(USER_STARTS_WITH) || id.startsWith(GROUP_STARTS_WITH))) {
        // If user may write
        if (flag === CONSTS.ACCESS_WRITE && !internalOptions.acl.users.write) {
            // write
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
        }

        // If user may read
        if (flag === CONSTS.ACCESS_READ && !internalOptions.acl.users.read) {
            // read
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
        }

        // If user may delete
        if (flag === CONSTS.ACCESS_DELETE && !internalOptions.acl.users.delete) {
            // delete
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
        }

        // If user may list
        if (flag === CONSTS.ACCESS_LIST && !internalOptions.acl.users.list) {
            // list
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
        }

        // If user may create
        if (flag === CONSTS.ACCESS_CREATE && !internalOptions.acl.users.create) {
            // create
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
        }

        // If user may write
        if (flag === CONSTS.ACCESS_DELETE) {
            // he may delete
            flag = CONSTS.ACCESS_WRITE;
        }
    }

    // If user may write
    if (flag === CONSTS.ACCESS_WRITE && !internalOptions.acl.object.write) {
        // write
        tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
    }

    // If user may read
    if (flag === CONSTS.ACCESS_READ && !internalOptions.acl.object.read) {
        // read
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
    }

    // If user may delete
    if (flag === CONSTS.ACCESS_DELETE && !internalOptions.acl.object.delete) {
        // delete
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
    }

    // If user may list
    if (flag === CONSTS.ACCESS_LIST && !internalOptions.acl.object.list) {
        // list
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
    }

    // If user may create
    if (flag === CONSTS.ACCESS_CREATE && !internalOptions.acl.object.create) {
        // list
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
    }

    if (id && !checkObject(object, internalOptions, flag)) {
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, internalOptions);
    }

    return tools.maybeCallbackWithError(callback, null, internalOptions);
}
