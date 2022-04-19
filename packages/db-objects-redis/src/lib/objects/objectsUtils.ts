/**
 *      Common functions between client and server
 *
 *      Copyright 2013-2022 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';
import { Writable, WritableOptions } from 'stream';
import path from 'path';
import deepClone from 'deep-clone';
import { tools } from '@iobroker/db-base';
import * as CONSTS from './constants';

export * as CONSTS from './constants';
export const ERRORS = CONSTS.ERRORS;
export const REG_CHECK_ID = CONSTS.REG_CHECK_ID;

const USER_STARTS_WITH = CONSTS.USER_STARTS_WITH;
const GROUP_STARTS_WITH = CONSTS.GROUP_STARTS_WITH;
const memStore: Record<string, Buffer> = {};

export interface ACLObject {
    owner: string;
    ownerGroup: string;
    object: number;
    state: number;
    file: number;
}

const mimeTypes = {
    '.css': { type: 'text/css', binary: false },
    '.bmp': { type: 'image/bmp', binary: true },
    '.png': { type: 'image/png', binary: true },
    '.jpg': { type: 'image/jpeg', binary: true },
    '.jpeg': { type: 'image/jpeg', binary: true },
    '.gif': { type: 'image/gif', binary: true },
    '.ico': { type: 'image/x-icon', binary: true },
    '.webp': { type: 'image/webp', binary: true },
    '.wbmp': { type: 'image/vnd.wap.wbmp', binary: true },
    '.tif': { type: 'image/tiff', binary: true },
    '.js': { type: 'application/javascript', binary: false },
    '.html': { type: 'text/html', binary: false },
    '.htm': { type: 'text/html', binary: false },
    '.json': { type: 'application/json', binary: false },
    '.md': { type: 'text/markdown', binary: false },
    '.xml': { type: 'text/xml', binary: false },
    '.svg': { type: 'image/svg+xml', binary: false },
    '.eot': { type: 'application/vnd.ms-fontobject', binary: true },
    '.ttf': { type: 'application/font-sfnt', binary: true },
    '.cur': { type: 'application/x-win-bitmap', binary: true },
    '.woff': { type: 'application/font-woff', binary: true },
    '.wav': { type: 'audio/wav', binary: true },
    '.mp3': { type: 'audio/mpeg3', binary: true },
    '.avi': { type: 'video/avi', binary: true },
    '.qt': { type: 'video/quicktime', binary: true },
    '.ppt': { type: 'application/vnd.ms-powerpoint', binary: true },
    '.pptx': { type: 'application/vnd.ms-powerpoint', binary: true },
    '.doc': { type: 'application/msword', binary: true },
    '.docx': { type: 'application/msword', binary: true },
    '.xls': { type: 'application/vnd.ms-excel', binary: true },
    '.xlsx': { type: 'application/vnd.ms-excel', binary: true },
    '.mp4': { type: 'video/mp4', binary: true },
    '.mkv': { type: 'video/mkv', binary: true },
    '.zip': { type: 'application/zip', binary: true },
    '.ogg': { type: 'audio/ogg', binary: true },
    '.manifest': { type: 'text/cache-manifest', binary: false },
    '.pdf': { type: 'application/pdf', binary: true },
    '.gz': { type: 'application/gzip', binary: true },
    '.gzip': { type: 'application/gzip', binary: true }
} as const;

function isKnownMimeType(ext: string): ext is keyof typeof mimeTypes {
    return ext in mimeTypes;
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

// FIXME: This should have better types. Probably Record<string, {acl: ioBroker.ObjectPermissions, [x: string | number | symbol]: any}>
let users: Record<string, any> = {};
let groups: ioBroker.GroupObject[] = [];

export function getMimeType(ext: string[] | string): { mimeType: string; isBinary: boolean } {
    if (!ext) {
        return { mimeType: 'text/html', isBinary: false };
    }
    if (ext instanceof Array) {
        ext = ext[0];
    }
    ext = ext.toLowerCase();
    let mimeType = 'text/javascript';
    let isBinary = false;

    if (isKnownMimeType(ext)) {
        mimeType = mimeTypes[ext].type;
        isBinary = mimeTypes[ext].binary;
    }

    return { mimeType, isBinary };
}

/**
 * Writable memory stream
 */
export class WMStrm extends Writable {
    private readonly key: string;
    constructor(key: string, options: WritableOptions) {
        super(options); // init super
        this.key = key; // save key
        memStore[key] = Buffer.alloc(0); // empty
    }

    _write(chunk: string | Buffer, enc: BufferEncoding, cb: () => void): void {
        if (chunk) {
            // our memory store stores things in buffers
            const buffer = Buffer.isBuffer(chunk)
                ? chunk // already is Buffer use it
                : Buffer.from(chunk, enc); // string, convert

            // concatenate to the buffer already there
            if (!memStore[this.key]) {
                memStore[this.key] = Buffer.alloc(0);
                console.log(`memstore for ${this.key} is null`);
            }
            memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
        }
        if (!cb) {
            throw new Error('Callback is empty');
        }
        cb();
    }
}

export function insert(
    objects: any,
    id: string,
    attName: string,
    _ignore: any,
    options: Record<string, any> | string,
    _obj: any,
    callback: (err: Error | null | undefined, param: null) => void
): WMStrm {
    if (typeof options === 'string') {
        options = { mimeType: options };
    }

    // return pipe for write into redis
    const strm = new WMStrm(`${id}/${attName}`, {});
    strm.on('finish', () => {
        let error: null | string = null;
        if (!memStore[id + '/' + attName]) {
            error = `File ${id} / ${attName} is empty`;
        }
        objects.writeFile(id, attName, memStore[id + '/' + attName] || '', options, () => {
            if (memStore[id + '/' + attName] !== undefined) {
                delete memStore[id + '/' + attName];
            }
            return tools.maybeCallbackWithError(callback, error, null);
        });
    });
    return strm;
}

export function checkFile(
    fileOptions: Record<string, any>,
    options: Record<string, any>,
    flag: any,
    defaultNewAcl?: ACLObject | null
): boolean {
    if (typeof fileOptions.acl !== 'object') {
        fileOptions = {};
        fileOptions.mimeType = deepClone(fileOptions);
        fileOptions.acl = {
            owner: (defaultNewAcl && defaultNewAcl.owner) || CONSTS.SYSTEM_ADMIN_USER,
            ownerGroup: (defaultNewAcl && defaultNewAcl.ownerGroup) || CONSTS.SYSTEM_ADMIN_GROUP,
            permissions:
                (defaultNewAcl && defaultNewAcl.file) ||
                CONSTS.ACCESS_USER_RW | CONSTS.ACCESS_GROUP_READ | CONSTS.ACCESS_EVERY_READ // '0644'
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
    name: string,
    options: Record<string, any>,
    flag: CONSTS.GenericAccessFlags,
    callback: (err: Error | null | undefined, options: Record<string, any>, opt?: any) => void
): any {
    options = options || {};
    if (!options.user) {
        // Before files converted, lets think: if no options it is admin
        options = {
            user: 'system.user.admin',
            params: options,
            group: 'system.group.administrator'
        };
    }

    /*if (options.checked) {
        return callback(null, options);
    }*/

    if (!options.acl) {
        objects.getUserGroup(options.user, (_user: any, groups: any, acl: Record<string, any>) => {
            options.acl = acl || {};
            options.groups = groups;
            options.group = groups ? groups[0] : null;
            checkFileRights(objects, id, name, options, flag, callback);
        });
        return;
    }
    // If user may write
    if (flag === CONSTS.ACCESS_WRITE && !options.acl.file.write) {
        // write
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
    }
    // If user may read
    if (flag === CONSTS.ACCESS_READ && !options.acl.file.read) {
        // read
        return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
    }

    options.checked = true;
    objects.checkFile(id, name, options, flag, (err: Error, options: Record<string, any>, opt: any) => {
        if (err) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION, options);
        } else {
            return tools.maybeCallbackWithError(callback, null, options, opt);
        }
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

export type GetUserGroupPromiseReturn = [user: string, groups: string[], acl: ioBroker.ObjectPermissions];

export type GetUserGroupCallback = (
    err: Error | null | undefined,
    user: string,
    groups: string[],
    acl: ioBroker.ObjectPermissions
) => void;

export function getUserGroup(
    objects: any,
    user: string,
    callback?: GetUserGroupCallback
): Promise<GetUserGroupPromiseReturn> | void {
    if (!user || typeof user !== 'string' || !user.startsWith(USER_STARTS_WITH)) {
        console.log(`invalid user name: ${user}`);
        user = JSON.stringify(user);
        // deep copy
        return tools.maybeCallbackWithError(
            callback,
            `invalid user name: ${user}`,
            user,
            [],
            deepClone(defaultAcl.acl)
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
                (err?: Error | null, arr?: { rows: ioBroker.GetObjectListItem[] }) => {
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
    id = id.replace(/\.\./g, ''); // do not allow to write in parent directories

    if (name.includes('..')) {
        name = path.normalize('/' + name);
    }
    if (name.includes('..')) {
        // Also after normalization we still have .. in it - should not happen if normalize worked correctly
        name = name.replace(/\.\./g, '');
        name = path.normalize('/' + name);
    }

    name = name.replace(/\\/g, '/'); // replace win path backslashes

    if (name[0] === '/') {
        name = name.substring(1);
    } // do not allow absolute paths

    return { id: id, name: name };
}

export function checkObject(
    obj: ioBroker.Object | null,
    options: Record<string, any>,
    flag: CONSTS.GenericAccessFlags
): boolean {
    // read rights of object
    if (!obj || !obj.common || !obj.acl || flag === CONSTS.ACCESS_LIST) {
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
    options: Record<string, any>,
    flag: CONSTS.GenericAccessFlags,
    callback: (err: Error | null | undefined, options?: Record<string, any>) => void
): void | Promise<Record<string, any>> {
    options = options || {};

    if (!options.user) {
        // Before files converted, lets think: if no options it is admin
        options = {
            user: CONSTS.SYSTEM_ADMIN_USER,
            params: options,
            group: CONSTS.SYSTEM_ADMIN_GROUP,
            groups: [CONSTS.SYSTEM_ADMIN_GROUP],
            acl: getDefaultAdminRights()
        };
    }

    if (!options.acl) {
        return objects.getUserGroup(options.user, (_user: string, groups: any, acl: Record<string, any>) => {
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
    } else {
        return tools.maybeCallbackWithError(callback, null, options);
    }
}
