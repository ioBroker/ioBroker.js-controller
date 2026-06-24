/**
 *      Common functions between client and server
 *
 *      Copyright 2013-2026 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

import path from 'node:path';
import deepClone from 'deep-clone';
import mime from 'mime-types';

import { tools } from '@iobroker/db-base';
import * as CONSTS from '@/lib/objects/constants.js';
import type { Client as ObjectClient } from '@iobroker/db-objects-redis';
import { SYSTEM_ADMIN_GROUP, SYSTEM_ADMIN_USER } from '@/lib/objects/constants.js';

export * as CONSTS from '@/lib/objects/constants.js';
export const ERRORS = CONSTS.ERRORS;
export const REG_CHECK_ID = CONSTS.REG_CHECK_ID;

const USER_STARTS_WITH = CONSTS.USER_STARTS_WITH;
const GROUP_STARTS_WITH = CONSTS.GROUP_STARTS_WITH;

export interface UserContext {
    user: ioBroker.ObjectIDs.User;
    group: ioBroker.ObjectIDs.Group;
    groups: ioBroker.ObjectIDs.Group[];
    acl: ioBroker.ObjectPermissions;
    checked?: boolean;
}

/** Information about a file's mime type */
export interface FileMimeInformation {
    /** the mime type, of the file */
    mimeType: string;
    /** if content is binary or textual */
    isBinary: boolean;
}

/** Access control list of an object, state or file */
export interface ACLObject {
    /** The user that owns the object */
    owner: ioBroker.ObjectIDs.User;
    /** The group that owns the object */
    ownerGroup: ioBroker.ObjectIDs.Group;
    /** Permission bitmask for object access */
    object: number;
    /** Permission bitmask for state access */
    state: number;
    /** Permission bitmask for file access */
    file: number;
}

/** Metadata of a stored file */
export interface FileObject {
    /** Whether this is a virtual file (a directory placeholder) */
    virtualFile?: boolean;
    /** File system stats of the file */
    stats?: {
        size?: number;
    };
    /** Timestamp (ms) when the file was last modified */
    modifiedAt?: number;
    /** Timestamp (ms) when the file was created */
    createdAt?: number;
    /** Evaluated access control list of the file */
    acl?: ioBroker.EvaluatedFileACL;
    isDir?: boolean;
    notExists?: boolean;
    mimeType?: string;
    binary?: boolean;
}

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
const defaultAcl: {
    groups: ioBroker.ObjectIDs.Group[];
    acl: ioBroker.ObjectPermissions;
} = {
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
};

// FIXME: This should have better types. Probably Record<string, {acl: ioBroker.ObjectPermissions, [x: string | number | symbol]: any}>
let users: Record<
    ioBroker.ObjectIDs.User,
    {
        groups: ioBroker.ObjectIDs.Group[];
        acl: ioBroker.ObjectPermissions;
    }
> = {};
let groups: ioBroker.GroupObject[] = [];

/**
 * Determines the mime type, of an extension and if it is binary content
 *
 * @param ext file extension e.g. `.txt`
 * @param isTextData if content is of type string
 */
export function getMimeType(ext: string, isTextData?: boolean): FileMimeInformation {
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

/**
 * Check if the given options have the required rights on a file according to its ACL
 *
 * @param fileOptions The stored file options including its ACL
 * @param userContext The current request options including the user and group
 * @param flag The access flag(s) to check for
 * @param defaultNewAcl The default ACL to use if the file has none yet
 */
export function checkFile(
    fileOptions: {
        mimeType?: string;
        notExists?: boolean;
        acl?: ioBroker.FileACL;
    },
    userContext: UserContext,
    flag: number,
    defaultNewAcl?: ACLObject | null,
): boolean {
    // convert string to structure
    fileOptions ||= {};
    fileOptions.acl ||= {
        owner: defaultNewAcl?.owner || CONSTS.SYSTEM_ADMIN_USER,
        ownerGroup: defaultNewAcl?.ownerGroup || CONSTS.SYSTEM_ADMIN_GROUP,
        permissions: defaultNewAcl?.file || CONSTS.ACCESS_USER_RW | CONSTS.ACCESS_GROUP_READ | CONSTS.ACCESS_EVERY_READ, // '0644'
    };

    // Set default owner group
    fileOptions.acl.owner ||= defaultNewAcl?.owner || CONSTS.SYSTEM_ADMIN_USER;
    fileOptions.acl.ownerGroup ||= defaultNewAcl?.ownerGroup || CONSTS.SYSTEM_ADMIN_GROUP;
    fileOptions.acl.permissions ||=
        defaultNewAcl?.file || CONSTS.ACCESS_USER_RW | CONSTS.ACCESS_GROUP_READ | CONSTS.ACCESS_EVERY_READ; // '0644'

    if (
        userContext.user !== CONSTS.SYSTEM_ADMIN_USER &&
        !userContext.groups.includes(CONSTS.SYSTEM_ADMIN_GROUP) &&
        fileOptions.acl
    ) {
        if (fileOptions.acl.owner !== userContext.user) {
            // Check if the user is in the group
            if (userContext.groups.includes(fileOptions.acl.ownerGroup)) {
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

/**
 * Check whether the given user is allowed to access a file and call back with the effective options
 *
 * @param objects The objects database client
 * @param id The id of the object owning the file
 * @param name The file name, or null for the whole namespace
 * @param options The current request options including the user
 * @param flag The access flag(s) to check for
 */
export async function checkFileRightsAsync(
    objects: ObjectClient,
    id: string,
    name: string | null,
    options:
        | {
              user?: ioBroker.ObjectIDs.User;
          }
        | null
        | undefined,
    flag: CONSTS.GenericAccessFlags,
): Promise<{
    fileOptions: FileObject;
    userContext: UserContext;
}> {
    let userContext: UserContext;
    if (!options?.user) {
        // Before files converted, lets think: if no options it is admin
        userContext = {
            user: SYSTEM_ADMIN_USER,
            group: SYSTEM_ADMIN_GROUP,
            groups: [SYSTEM_ADMIN_GROUP],
            acl: deepClone(defaultAcl.acl),
        };
    } else {
        const [, groups, acl] = await getUserGroupAsync(objects, options.user);
        userContext = {
            user: options.user,
            group: groups?.[0] || null,
            groups,
            acl,
        };
    }

    if (!name) {
        throw new Error(ERRORS.ERROR_NOT_FOUND);
    }
    if (flag === CONSTS.ACCESS_WRITE && !userContext.acl.file.write) {
        // If user may write
        throw new Error(ERRORS.ERROR_PERMISSION);
    }
    // If user may read
    if (flag === CONSTS.ACCESS_READ && !userContext.acl.file.read) {
        // read
        throw new Error(ERRORS.ERROR_PERMISSION);
    }

    userContext.checked = true;
    const fileOptions = await objects.checkFileAsync(id, name, userContext, flag);
    if (!fileOptions) {
        throw new Error(ERRORS.ERROR_PERMISSION);
    }

    return { fileOptions, userContext };
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

export type GetUserGroupPromiseReturn = [
    user: ioBroker.ObjectIDs.User,
    groups: ioBroker.ObjectIDs.Group[],
    acl: ioBroker.ObjectPermissions,
];

type GetUserGroupCallback = (
    err: Error | null | undefined,
    user: ioBroker.ObjectIDs.User,
    groups: ioBroker.ObjectIDs.Group[],
    acl: ioBroker.ObjectPermissions,
) => void;

/**
 * Determine the groups and effective ACL of the given user
 *
 * @param objects The objects database client
 * @param user The id of the user to look up
 * @param callback Called with the user, its groups and the effective ACL
 */
export function getUserGroup(
    objects: ObjectClient,
    user: ioBroker.ObjectIDs.User,
    callback: GetUserGroupCallback,
): void {
    try {
        getUserGroupAsync(objects, user)
            .then(result => tools.maybeCallbackWithError(callback, null, result[0], result[1], result[2]))
            .catch(err => tools.maybeCallbackWithError(callback, err, deepClone(user), [], deepClone(defaultAcl.acl)));
    } catch (err) {
        return tools.maybeCallbackWithError(callback, err, deepClone(user), [], deepClone(defaultAcl.acl));
    }
}

/**
 * Determine the groups and effective ACL of the given user
 *
 * @param objects The objects database client
 * @param user The id of the user to look up
 */
export async function getUserGroupAsync(
    objects: ObjectClient,
    user: ioBroker.ObjectIDs.User,
): Promise<GetUserGroupPromiseReturn> {
    if (!user || typeof user !== 'string' || !user.startsWith(USER_STARTS_WITH)) {
        console.log(`invalid user name: ${user}`);

        throw new Error(`invalid user name: ${user}`);
    }

    if (users[user]) {
        return [user, users[user].groups, users[user].acl];
    }

    let error: Error | string | undefined;
    groups = [];
    // Read all groups
    const groupList = await objects.getObjectListAsync(
        { startkey: 'system.group.', endkey: 'system.group.\u9999' },
        { checked: true },
    );
    if (groupList) {
        // Read all groups
        for (let g = 0; g < groupList.rows.length; g++) {
            const val = groupList.rows[g].value;
            if (!val) {
                continue;
            }

            groups[g] = val as ioBroker.GroupObject;
            if (groups[g]._id === CONSTS.SYSTEM_ADMIN_GROUP) {
                groups[g].common.acl = getDefaultAdminRights(groups[g].common.acl);
            }
        }
    }

    users = {};
    const userList = await objects.getObjectListAsync(
        { startkey: 'system.user.', endkey: 'system.user.\u9999' },
        { checked: true },
    );
    if (userList) {
        for (const row of userList.rows) {
            // cannot use here Object.assign, because required deep copy
            users[(row.value as ioBroker.UserObject)._id] = deepClone<{
                groups: ioBroker.ObjectIDs.Group[];
                acl: ioBroker.ObjectPermissions;
            }>(defaultAcl);
        }
    }

    users[CONSTS.SYSTEM_ADMIN_USER] ||= deepClone(defaultAcl);
    users[CONSTS.SYSTEM_ADMIN_USER].acl = getDefaultAdminRights(users[CONSTS.SYSTEM_ADMIN_USER].acl);

    for (let g = 0; g < groups.length; g++) {
        if (!groups[g]?.common?.members) {
            continue;
        }
        for (let m = 0; m < groups[g].common.members.length; m++) {
            const u = groups[g].common.members[m];
            if (!users[u]) {
                error ||= `Unknown user in group "${groups[g]._id.replace('system.group.', '')}": ${u}`;
                continue;
            }
            users[u].groups.push(groups[g]._id);

            if (groups[g].common.acl?.file) {
                if (!users[u].acl?.file) {
                    users[u].acl ||= {} as ioBroker.ObjectPermissions;
                    users[u].acl.file ||= {} as ioBroker.ObjectPermissions['file'];

                    users[u].acl.file.create = groups[g].common.acl.file.create;
                    users[u].acl.file.read = groups[g].common.acl.file.read;
                    users[u].acl.file.write = groups[g].common.acl.file.write;
                    users[u].acl.file.delete = groups[g].common.acl.file.delete;
                    users[u].acl.file.list = groups[g].common.acl.file.list;
                } else {
                    users[u].acl.file.create ||= groups[g].common.acl.file.create;
                    users[u].acl.file.read ||= groups[g].common.acl.file.read;
                    users[u].acl.file.write ||= groups[g].common.acl.file.write;
                    users[u].acl.file.delete ||= groups[g].common.acl.file.delete;
                    users[u].acl.file.list ||= groups[g].common.acl.file.list;
                }
            }

            if (groups[g].common.acl?.object) {
                if (!users[u].acl?.object) {
                    users[u].acl ||= {} as ioBroker.ObjectPermissions;
                    users[u].acl.object ||= {} as ioBroker.ObjectPermissions['object'];

                    users[u].acl.object.create = groups[g].common.acl.object.create;
                    users[u].acl.object.read = groups[g].common.acl.object.read;
                    users[u].acl.object.write = groups[g].common.acl.object.write;
                    users[u].acl.object.delete = groups[g].common.acl.object.delete;
                    users[u].acl.object.list = groups[g].common.acl.object.list;
                } else {
                    users[u].acl.object.create ||= groups[g].common.acl.object.create;
                    users[u].acl.object.read ||= groups[g].common.acl.object.read;
                    users[u].acl.object.write ||= groups[g].common.acl.object.write;
                    users[u].acl.object.delete ||= groups[g].common.acl.object.delete;
                    users[u].acl.object.list ||= groups[g].common.acl.object.list;
                }
            }

            if (groups[g].common.acl?.users) {
                if (!users[u].acl?.users) {
                    users[u].acl ||= {} as ioBroker.ObjectPermissions;
                    users[u].acl.users ||= {} as ioBroker.ObjectPermissions['users'];

                    users[u].acl.users.create = groups[g].common.acl.users.create;
                    users[u].acl.users.read = groups[g].common.acl.users.read;
                    users[u].acl.users.write = groups[g].common.acl.users.write;
                    users[u].acl.users.delete = groups[g].common.acl.users.delete;
                    users[u].acl.users.list = groups[g].common.acl.users.list;
                } else {
                    users[u].acl.users.create ||= groups[g].common.acl.users.create;
                    users[u].acl.users.read ||= groups[g].common.acl.users.read;
                    users[u].acl.users.write ||= groups[g].common.acl.users.write;
                    users[u].acl.users.delete ||= groups[g].common.acl.users.delete;
                    users[u].acl.users.list ||= groups[g].common.acl.users.list;
                }
            }

            if (groups[g].common.acl?.state) {
                if (!users[u].acl?.state) {
                    users[u].acl ||= {} as ioBroker.ObjectPermissions;
                    users[u].acl.state ||= {} as ioBroker.ObjectPermissions['state'];

                    users[u].acl.state!.create = groups[g].common.acl.state!.create;
                    users[u].acl.state!.read = groups[g].common.acl.state!.read;
                    users[u].acl.state!.write = groups[g].common.acl.state!.write;
                    users[u].acl.state!.delete = groups[g].common.acl.state!.delete;
                    users[u].acl.state!.list = groups[g].common.acl.state!.list;
                } else {
                    users[u].acl.state.create ||= groups[g].common.acl.state!.create;
                    users[u].acl.state.read ||= groups[g].common.acl.state!.read;
                    users[u].acl.state.write ||= groups[g].common.acl.state!.write;
                    users[u].acl.state.delete ||= groups[g].common.acl.state!.delete;
                    users[u].acl.state.list ||= groups[g].common.acl.state!.list;
                }
            }
        }
    }
    return [user, users[user]?.groups || [], users[user]?.acl || deepClone(defaultAcl.acl)];
}

/**
 * Sanitize an object id and file name so they cannot escape the intended directory
 *
 * @param id The object id owning the file
 * @param name The file name to sanitize
 */
export function sanitizePath(
    id: string,
    name: string,
): {
    /** The sanitized object id */
    id: string;
    /** The sanitized file name */
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

/**
 * Check if the given options have the required rights on an object according to its ACL
 *
 * @param obj The object (or file object) to check, or null
 * @param options The current request options including the user and group
 * @param flag The access flag(s) to check for
 */
export function checkObject(
    obj: ioBroker.AnyObject | FileObject | null,
    options: UserContext,
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

/**
 * Check whether the given user is allowed to access an object and call back with the effective options
 *
 * @param objects The objects database client
 * @param id The id of the object, or null
 * @param object The object to check, or null
 * @param options The current request options including the user
 * @param flag The access flag(s) to check for
 * @param callback Called with the effective options once the rights have been checked
 */
export function checkObjectRights(
    objects: ObjectClient,
    id: string | null,
    object: ioBroker.Object | null,
    options: { user?: ioBroker.ObjectIDs.User } | null | undefined,
    flag: CONSTS.GenericAccessFlags,
    callback: (err: Error | null | undefined, userContext?: UserContext) => void,
): void {
    try {
        checkObjectRightsAsync(objects, id, object, options, flag)
            .then(userContext => tools.maybeCallbackWithError(callback, null, userContext))
            .catch(error => tools.maybeCallbackWithError(callback, error));
    } catch (error) {
        tools.maybeCallbackWithError(callback, error);
    }
}

/**
 * Check whether the given user is allowed to access an object and call back with the effective options
 *
 * @param objects The objects database client
 * @param id The id of the object, or null
 * @param object The object to check, or null
 * @param options The current request options including the user
 * @param flag The access flag(s) to check for
 */
export async function checkObjectRightsAsync(
    objects: ObjectClient,
    id: string | null,
    object: ioBroker.Object | null,
    options: { user?: ioBroker.ObjectIDs.User } | null | undefined,
    flag: CONSTS.GenericAccessFlags,
): Promise<UserContext> {
    let userContext: UserContext;
    options ||= {};

    if (!options?.user) {
        // Before files converted, lets think: if no options it is admin
        userContext = {
            user: CONSTS.SYSTEM_ADMIN_USER,
            group: CONSTS.SYSTEM_ADMIN_GROUP,
            groups: [CONSTS.SYSTEM_ADMIN_GROUP],
            acl: getDefaultAdminRights(),
        };
    } else {
        const [, groups, acl] = await getUserGroupAsync(objects, options.user);
        userContext = {
            user: options.user,
            groups,
            acl: acl || {},
            group: groups?.[0] || null,
        };
    }

    // now options are filled and we can go
    if (
        userContext.user === CONSTS.SYSTEM_ADMIN_USER ||
        userContext.group === CONSTS.SYSTEM_ADMIN_GROUP ||
        userContext.groups?.includes(CONSTS.SYSTEM_ADMIN_GROUP)
    ) {
        return userContext;
    }

    // if user or group objects
    if (typeof id === 'string' && (id.startsWith(USER_STARTS_WITH) || id.startsWith(GROUP_STARTS_WITH))) {
        // If user may write
        if (flag === CONSTS.ACCESS_WRITE && !userContext.acl.users.write) {
            // write
            throw new Error(ERRORS.ERROR_PERMISSION);
        }

        // If user may read
        if (flag === CONSTS.ACCESS_READ && !userContext.acl.users.read) {
            // read
            throw new Error(ERRORS.ERROR_PERMISSION);
        }

        // If user may delete
        if (flag === CONSTS.ACCESS_DELETE && !userContext.acl.users.delete) {
            // delete
            throw new Error(ERRORS.ERROR_PERMISSION);
        }

        // If user may list
        if (flag === CONSTS.ACCESS_LIST && !userContext.acl.users.list) {
            // list
            throw new Error(ERRORS.ERROR_PERMISSION);
        }

        // If user may create
        if (flag === CONSTS.ACCESS_CREATE && !userContext.acl.users.create) {
            // create
            throw new Error(ERRORS.ERROR_PERMISSION);
        }

        // If user may write
        if (flag === CONSTS.ACCESS_DELETE) {
            // he may delete
            flag = CONSTS.ACCESS_WRITE;
        }
    }

    // If user may write
    if (flag === CONSTS.ACCESS_WRITE && !userContext.acl.object.write) {
        // write
        throw new Error(ERRORS.ERROR_PERMISSION);
    }

    // If user may read
    if (flag === CONSTS.ACCESS_READ && !userContext.acl.object.read) {
        // read
        throw new Error(ERRORS.ERROR_PERMISSION);
    }

    // If user may delete
    if (flag === CONSTS.ACCESS_DELETE && !userContext.acl.object.delete) {
        // delete
        throw new Error(ERRORS.ERROR_PERMISSION);
    }

    // If user may list
    if (flag === CONSTS.ACCESS_LIST && !userContext.acl.object.list) {
        // list
        throw new Error(ERRORS.ERROR_PERMISSION);
    }

    if (flag === CONSTS.ACCESS_DELETE) {
        // write
        flag = CONSTS.ACCESS_WRITE;
    }

    if (id && !checkObject(object, userContext, flag)) {
        throw new Error(ERRORS.ERROR_PERMISSION);
    }
    return userContext;
}
