/**
 *      List different objects for CLI
 *
 *      Copyright 2013-2024 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

import { EXIT_CODES } from '@iobroker/js-controller-common';
import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common';
import type { Client as StatesRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';

interface File {
    adapter: string;
    path: string;
    file: ioBroker.ReadDirResult;
}

interface IdValueObject {
    id: string;
    value: any;
}

interface FlagObject {
    alive?: boolean;
    enabled?: boolean;
    disabled?: boolean;
    port?: number;
    ssl?: boolean;
    ip?: string;
}

interface CLIListOptions {
    states: StatesRedisClient;
    objects: ObjectsRedisClient;
    processExit: (exitCode?: number) => void;
}

export type ListType =
    | 'objects'
    | 'o'
    | 'states'
    | 's'
    | 'adapters'
    | 'a'
    | 'instances'
    | 'i'
    | 'users'
    | 'u'
    | 'groups'
    | 'g'
    | 'hosts'
    | 'h'
    | 'enums'
    | 'e'
    | 'files'
    | 'f';

interface AdapterListEntry {
    /** The object id */
    id: string;
    /** Adapter name */
    name: string;
    /** Version of adapter */
    version: string;
    /** The configured upgrade policy */
    'upgrade policy': ioBroker.AutoUpgradePolicy;
}

export class List {
    private config: Record<string, any>;
    private objects: ObjectsRedisClient;
    private states: StatesRedisClient;
    private readonly processExit: (exitCode?: number) => void;

    constructor(options: CLIListOptions) {
        options = options || {};

        if (!options.states) {
            throw new Error('Invalid Modified arguments: states is missing');
        }
        if (!options.objects) {
            throw new Error('Invalid arguments: objects is missing');
        }
        if (!options.processExit) {
            throw new Error('Invalid arguments: processExit is missing');
        }

        this.config = fs.readJSONSync(tools.getConfigFileName());

        this.objects = options.objects;
        this.states = options.states;
        this.processExit = options.processExit;
    }

    private static _perm2str(perm: number): string {
        let result = '';
        // user
        result += perm & 0x400 ? 'r' : '-';
        result += perm & 0x200 ? 'w' : '-';
        result += perm & 0x100 ? 'x' : '-';
        // group
        result += perm & 0x040 ? 'r' : '-';
        result += perm & 0x020 ? 'w' : '-';
        result += perm & 0x010 ? 'x' : '-';
        // any
        result += perm & 0x004 ? 'r' : '-';
        result += perm & 0x002 ? 'w' : '-';
        result += perm & 0x001 ? 'x' : '-';
        return result;
    }

    showFileHeader(adapter?: string): void {
        if (adapter) {
            console.log(`\n-- ${adapter} --`);
        }

        console.log('   Modified at  |Permission|     User     |     Group    | Size | Name');
        console.log('----------------+----------+--------------+--------------+------+---------');
    }

    showFile(adapter: string, path: string, file: ioBroker.ReadDirResult): void {
        //drwxr-xr-x   1 odroid odroid    43 Oct  3  2013 .xsessionrc
        let text = '';
        let time = '';
        if (file.modifiedAt) {
            const ts = new Date(file.modifiedAt);
            time = ts.toISOString();
            time = time.replace('T', ' ');
            time = `${time.substring(0, 16)} `;
        }
        text += time.padEnd(17);

        if (file.acl) {
            text += (file.isDir ? 'd' : '-') + List._perm2str(file.acl.permissions || 0);
            let owner = file.acl.owner;
            // cut system.user.
            owner = owner.substring(12);

            text += ` ${owner.padStart(14)}`;
            let group = file.acl.ownerGroup;
            // cut system.group.
            group = group.substring(13);
            text += ` ${group.padStart(14)}`;
        } else {
            text += `${file.isDir ? 'd' : '-'}?????????${new Array(31).join(' ')}`;
        }
        const size = file.stats && file.stats.size ? file.stats.size.toString() : '';

        text += ` ${size.padStart(6)} ${adapter}${!path || path[0] === '/' ? '' : '/'}${path}/${file.file}`;
        if (file.isDir) {
            text += '/';
            console.log(text);
        } else {
            console.log(text);
        }
    }

    showObjectHeader(): void {
        console.log('ObjectAC | StateAC |     User     |     Group    | ID');
        console.log('---------+---------+--------------+--------------+--------------');
    }

    showObject(obj: ioBroker.AnyObject): void {
        //drwxr-xr-x   1 odroid odroid    43 Oct  3  2013 .xsessionrc
        let text = '';
        if (obj.acl) {
            text += `${List._perm2str(obj.acl.object || 0)} ${
                obj.type === 'state' ? List._perm2str(obj.acl.state || 0) : '         '
            }`;
            let owner = obj.acl.owner;
            // cut system.user.
            owner = owner.substring(12);

            text += ` ${owner.padStart(14)}`;
            let group = obj.acl.ownerGroup;
            // cut system.group.
            group = group.substring(13);
            text += ` ${group.padStart(14)}`;
        } else {
            text += `?????????${obj.type === 'state' ? ' ?????????' : '          '}${new Array(31).join(' ')}`;
        }
        text += ` ${obj._id}`;
        console.log(text);
    }

    listDirectory(
        adapter: string,
        path: string | null | undefined,
        allFiles?: File[] | ((allFiles: File[]) => void),
        callback?: (allFiles: File[]) => void,
    ): void {
        if (typeof path === 'function') {
            callback = path;
            path = '';
            allFiles = [];
        }
        if (typeof allFiles === 'function') {
            callback = allFiles;
            allFiles = [];
        }
        const _allFiles = allFiles || [];
        const _path = path || '';

        this.objects.readDir(adapter, _path, null, (err, files) => {
            if (err && err.code === 'ENOTDIR') {
                const pos = _path.lastIndexOf('/');
                if (pos !== -1) {
                    const dir = _path.substring(0, pos);
                    const fname = _path.substring(pos + 1);
                    this.objects.readDir(adapter, dir, null, (err, files) => {
                        if (err) {
                            console.log(`Cannot read "${path}": ${err.message}`);
                            typeof callback === 'function' && callback(_allFiles);
                        } else {
                            // @ts-expect-error if no error, files are guranteed to be an Array https://github.com/ioBroker/adapter-core/issues/455
                            for (const file of files) {
                                if (file.file === '.' || file.file === '..') {
                                    continue;
                                }
                                if (file.file === fname) {
                                    _allFiles.push({ adapter, path: _path, file });
                                    break;
                                }
                            }
                            typeof callback === 'function' && callback(_allFiles);
                        }
                    });
                } else if (typeof callback === 'function') {
                    callback(_allFiles);
                }
            } else {
                let count = 0;
                // @ts-expect-error if no error, files are guranteed to be an Array https://github.com/ioBroker/adapter-core/issues/455
                for (const file of files) {
                    if (file.file === '.' || file.file === '..') {
                        continue;
                    }
                    _allFiles.push({ adapter: adapter, path: _path, file });
                    if (file.isDir) {
                        count++;
                        this.listDirectory(adapter, `${path}/${file.file}`, allFiles, () => {
                            if (!--count && callback) {
                                typeof callback === 'function' && callback(_allFiles);
                            }
                        });
                    }
                }
                if (!count && typeof callback === 'function') {
                    callback(_allFiles);
                }
            }
        });
    }

    sortFiles(a: File, b: File): number {
        let a1 = a.path + a.file.file;
        if (a1[0] !== '/') {
            a1 = `/${a1}`;
        }
        let b1 = b.path + b.file.file;
        if (b1[0] !== '/') {
            b1 = `/${b1}`;
        }
        return a1.localeCompare(b1);
    }

    listAdaptersFiles(adapters: string[], filter?: null | string, callback?: () => void): void | Promise<void> {
        if (typeof filter === 'function') {
            callback = filter;
            filter = null;
        }
        if (filter) {
            filter = filter.replace(/\*/g, '');
            if (filter[filter.length - 1] === '/') {
                filter = filter.substring(0, filter.length - 1);
            }
        }

        if (adapters && adapters.length) {
            const adapter = adapters.shift() as string;
            this.listDirectory(adapter, filter, files => {
                files.sort(this.sortFiles);
                this.showFileHeader(adapter);

                files
                    .filter(f => !filter || `${f.path}/${f.file.file}`.startsWith(filter))
                    .forEach(f => this.showFile(f.adapter, f.path, f.file));

                this.listAdaptersFiles(adapters, filter, callback);
            });
        } else {
            return tools.maybeCallback(callback);
        }
    }

    private _readOnlineState(
        lines: IdValueObject[],
        flags: FlagObject,
        cb: (res: any[]) => void,
        _result?: any[],
    ): void {
        const result = _result || [];
        if (!lines || !lines.length) {
            cb(result);
        } else {
            const task = lines.shift() as IdValueObject;
            const id = `${task.id}.alive`;
            this.states.getState(id, (err, state) => {
                if (state && state.val) {
                    result.push(`+ ${task.value}`);
                } else if (!flags.alive) {
                    result.push(`  ${task.value}`);
                }
                setImmediate(() => this._readOnlineState(lines, flags, cb, result));
            });
        }
    }

    list(type: ListType, filter: string, flags: FlagObject): void {
        this.objects.getObject('system.config', (err, systemConf) => {
            const lang: ioBroker.Languages = systemConf?.common?.language || 'en';
            switch (type) {
                case 'objects':
                case 'o':
                    this.objects.getObjectList({}, (err, objs) => {
                        if (!objs) {
                            this.processExit();
                            return;
                        }
                        const reg = filter ? new RegExp(tools.pattern2RegEx(filter)) : null;
                        for (const obj of objs.rows) {
                            let name = obj.value?.common?.name;
                            if (tools.isObject(name)) {
                                name = name[lang] || name.en;
                            }

                            if (!reg || reg.test(obj.value._id) || (name && reg.test(name))) {
                                if (obj.value.type) {
                                    const id = obj.value._id;
                                    const type = obj.value.type;

                                    console.log(`${id.padStart(39)}: ${type.padStart(39)} - ${name || ''}`);
                                }
                            }
                        }
                        this.processExit();
                    });
                    break;

                case 'states':
                case 's':
                    this.states.getKeys(filter || '*', (err, keys) => {
                        if (err) {
                            console.error(err);
                            return void this.processExit(EXIT_CODES.CANNOT_GET_STATES);
                        }

                        if (!keys) {
                            return void this.processExit();
                        }

                        this.states.getStates(keys, (err, states) => {
                            if (err || !states) {
                                console.error(err);
                                return void this.processExit(EXIT_CODES.CANNOT_GET_STATES);
                            }
                            for (let i = 0; i < states.length; i++) {
                                const state = states[i];
                                if (!state) {
                                    continue;
                                }

                                const id = keys[i];
                                const from = state.from || '';
                                const type = typeof state.val;

                                console.log(
                                    `${id.padEnd(39)}: from [${from.padEnd(29)}] (${type.padEnd(9)}) ${
                                        state.ack ? '    ack' : 'not ack'
                                    } ${JSON.stringify(state.val)}`,
                                );
                            }
                            this.processExit();
                        });
                    });
                    break;

                case 'adapters':
                case 'a':
                    this.objects.getObjectList(
                        { startkey: 'system.adapter.', endkey: 'system.adapter.\u9999' },
                        (err, objs) => {
                            if (!objs) {
                                this.processExit();
                                return;
                            }
                            const reg = filter ? new RegExp(tools.pattern2RegEx(`system.adapter.${filter}`)) : null;
                            const adapterList: AdapterListEntry[] = [];
                            for (const obj of objs.rows) {
                                if (obj.value.type !== 'adapter') {
                                    continue;
                                }

                                if (
                                    !reg ||
                                    reg.test(obj.value._id) ||
                                    (obj.value.common && reg.test(obj.value.common.name))
                                ) {
                                    const id = obj.value._id;
                                    let name = obj.value.common.name;
                                    if (tools.isObject(name)) {
                                        name = name[lang] || name.en;
                                    }

                                    adapterList.push({
                                        id,
                                        name,
                                        version: obj.value.common.version,
                                        'upgrade policy': obj.value.common.automaticUpgrade ?? 'none',
                                    });
                                }
                            }

                            console.table(adapterList);
                            this.processExit();
                        },
                    );
                    break;

                case 'instances':
                case 'i':
                    this.objects.getObjectList(
                        { startkey: 'system.adapter.', endkey: 'system.adapter.\u9999' },
                        (err, objs) => {
                            if (!objs) {
                                this.processExit();
                                return;
                            }
                            const reg = filter ? new RegExp(tools.pattern2RegEx(`system.adapter.${filter}`)) : null;
                            objs.rows.sort((a, b) => {
                                if (a.id > b.id) {
                                    return 1;
                                } else if (a.id < b.id) {
                                    return -1;
                                }
                                return 0;
                            });
                            const lines = [];
                            for (const row of objs.rows) {
                                if (row.value.type !== 'instance') {
                                    continue;
                                }

                                let name = row.value.common?.name;

                                if (tools.isObject(name)) {
                                    name = name[lang] || name.en;
                                }

                                if (!reg || reg.test(row.value._id) || (name && reg.test(name))) {
                                    if (flags.enabled && !row.value.common.enabled) {
                                        continue;
                                    }
                                    if (flags.disabled && row.value.common.enabled) {
                                        continue;
                                    }
                                    if (flags.port && row.value.native.port === undefined) {
                                        continue;
                                    }
                                    if (flags.ssl && row.value.native.secure === undefined) {
                                        continue;
                                    }
                                    if (flags.ip && row.value.native.bind === undefined) {
                                        continue;
                                    }

                                    let id: string = row.value._id;
                                    let host = row.value.common.host;

                                    if (id.length < 40) {
                                        id = id.padEnd(40);
                                    }
                                    if (name && name.length < 22) {
                                        name = name.padEnd(22);
                                    }

                                    if (host && host.length < 40) {
                                        host = host.padEnd(40);
                                    }

                                    let text = `${id}: ${name || ''}: ${host} - ${
                                        row.value.common.enabled ? ' enabled' : 'disabled'
                                    }`;

                                    if (this.config.system && this.config.system.compact && row.value.common.compact) {
                                        text += `, compact ${
                                            row.value.common.compact && row.value.common.runAsCompactMode
                                                ? `enabled (group ${
                                                      row.value.common.compactGroup !== undefined
                                                          ? row.value.common.compactGroup
                                                          : 1
                                                  })`
                                                : 'disabled'
                                        }`;
                                    }

                                    if (row.value.native && row.value.native.port) {
                                        text += `, port: ${row.value.native.port}`;
                                    }
                                    if (row.value.native && row.value.native.bind) {
                                        text += `, bind: ${row.value.native.bind}`;
                                    }
                                    if (row.value.native && row.value.native.secure) {
                                        text += ' (SSL)';
                                    }
                                    if (row.value.native && row.value.native.defaultUser) {
                                        text += `, run as: ${row.value.native.defaultUser}`;
                                    }
                                    lines.push({ id: row.value._id, value: text });
                                }
                            }
                            this._readOnlineState(lines, flags, result => {
                                console.log(result.join('\n'));
                                console.log('\n+ instance is alive');
                                this.processExit();
                            });
                        },
                    );
                    break;

                case 'users':
                case 'u':
                    this.objects.getObjectList(
                        { startkey: 'system.user.', endkey: 'system.user.\u9999' },
                        (err, objs) => {
                            this.objects.getObjectList(
                                { startkey: 'system.group.', endkey: 'system.group.\u9999' },
                                (err, groups) => {
                                    if (!objs) {
                                        this.processExit();
                                        return;
                                    }
                                    const reg = filter
                                        ? new RegExp(tools.pattern2RegEx(`system.user.${filter}`))
                                        : null;
                                    console.log(
                                        '    ID                                 | Name        | Active   | Groups',
                                    );
                                    console.log(
                                        '---------------------------------------+-------------+----------+--------------',
                                    );
                                    for (const obj of objs.rows) {
                                        if (obj.value.type !== 'user') {
                                            continue;
                                        }

                                        if (
                                            !reg ||
                                            reg.test(obj.value._id) ||
                                            (obj.value.common &&
                                                reg.test(
                                                    tools.isObject(obj.value.common.name)
                                                        ? obj.value.common.name[lang] || obj.value.common.name.en
                                                        : obj.value.common.name,
                                                ))
                                        ) {
                                            const id = obj.value._id;
                                            let name = obj.value.common.name;
                                            if (tools.isObject(name)) {
                                                name = name[lang] || name.en;
                                            }

                                            const text = `${id.padEnd(39)}| ${name.padEnd(11)} | ${
                                                obj.value.common.enabled ? ' enabled' : 'disabled'
                                            } |`;
                                            if (groups) {
                                                const gs = [];
                                                // find all groups
                                                for (const group of groups.rows) {
                                                    if (
                                                        group.value.common.members &&
                                                        group.value.common.members.indexOf(obj.value._id) !== -1
                                                    ) {
                                                        gs.push(group.value._id.substring(13));
                                                    }
                                                }
                                                console.log(`${text} ${gs.join(', ')}`);
                                            }
                                        }
                                    }
                                    this.processExit();
                                },
                            );
                        },
                    );
                    break;

                case 'groups':
                case 'g':
                    this.objects.getObjectList(
                        { startkey: 'system.group.', endkey: 'system.group.\u9999' },
                        (err, objs) => {
                            if (!objs) {
                                this.processExit();
                                return;
                            }
                            const reg = filter ? new RegExp(tools.pattern2RegEx(`system.group.${filter}`)) : null;
                            console.log('');
                            console.log(
                                '  system.group      | object  | state   | file      | user  | others                 | users',
                            );
                            console.log(
                                '                    | l r w d | l r w d | l r w c d | w c d |                        |',
                            );
                            console.log(
                                '--------------------+---------+---------+-----------+-------+------------------------+---------',
                            );
                            for (const obj of objs.rows) {
                                if (obj.value.type !== 'group') {
                                    continue;
                                }
                                if (
                                    !reg ||
                                    reg.test(obj.value._id) ||
                                    (obj.value.common &&
                                        reg.test(
                                            tools.isObject(obj.value.common.name)
                                                ? obj.value.common.name[lang] || obj.value.common.name.en
                                                : obj.value.common.name,
                                        ))
                                ) {
                                    const id = obj.value._id.substring(13);
                                    if (id === 'administrator') {
                                        obj.value.common.acl = {
                                            file: {
                                                read: true,
                                                write: true,
                                                delete: true,
                                                create: true,
                                                list: true,
                                            },
                                            object: {
                                                read: true,
                                                write: true,
                                                create: true,
                                                delete: true,
                                                list: true,
                                            },
                                            state: {
                                                read: true,
                                                write: true,
                                                delete: true,
                                                create: true,
                                                list: true,
                                            },
                                            users: {
                                                write: true,
                                                create: true,
                                                delete: true,
                                                list: true,
                                                read: true,
                                            },
                                            other: {
                                                execute: true,
                                                http: true,
                                                sendto: true,
                                            },
                                        };
                                    }

                                    let text = id.padEnd(19);
                                    text += ' | ';
                                    if (obj.value.common.acl?.object) {
                                        text += `${obj.value.common.acl.object.list ? '+' : '-'} `;
                                        text += `${obj.value.common.acl.object.read ? '+' : '-'} `;
                                        text += `${obj.value.common.acl.object.write ? '+' : '-'} `;
                                        text += `${obj.value.common.acl.object.delete ? '+' : '-'} `;
                                        text += '|';
                                    } else {
                                        text += '        |';
                                    }
                                    if (obj.value.common.acl?.state) {
                                        text += ' ';
                                        text += `${obj.value.common.acl.state.list ? '+' : '-'} `;
                                        text += `${obj.value.common.acl.state.read ? '+' : '-'} `;
                                        text += `${obj.value.common.acl.state.write ? '+' : '-'} `;
                                        text += `${obj.value.common.acl.state.delete ? '+' : '-'} `;
                                        text += '|';
                                    } else {
                                        text += '         |';
                                    }
                                    if (obj.value.common.acl?.file) {
                                        text += ' ';
                                        text += `${obj.value.common.acl.file.list ? '+' : '-'} `;
                                        text += `${obj.value.common.acl.file.read ? '+' : '-'} `;
                                        text += `${obj.value.common.acl.file.write ? '+' : '-'} `;
                                        text += `${obj.value.common.acl.file.create ? '+' : '-'} `;
                                        text += `${obj.value.common.acl.file.delete ? '+' : '-'} `;
                                        text += '|';
                                    } else {
                                        text += '           |';
                                    }
                                    if (obj.value.common.acl?.users) {
                                        text += ' ';
                                        text += `${obj.value.common.acl.users.write ? '+' : '-'} `;
                                        text += `${obj.value.common.acl.users.create ? '+' : '-'} `;
                                        text += `${obj.value.common.acl.users.delete ? '+' : '-'} `;
                                        text += '|';
                                    } else {
                                        text += '       |';
                                    }
                                    if (obj.value.common.acl?.other) {
                                        text += ' ';
                                        let others = '';
                                        for (const [r, otherPerm] of Object.entries(obj.value.common.acl.other)) {
                                            others += `${r + (otherPerm ? '+' : '-')} `;
                                        }

                                        text += `${others.padEnd(22)}|`;
                                    } else {
                                        text += `${new Array(25).join(' ')}|`;
                                    }

                                    if (obj.value.common.members) {
                                        for (let m = 0; m < obj.value.common.members.length; m++) {
                                            obj.value.common.members[m] = obj.value.common.members[m].substring(
                                                12,
                                            ) as ioBroker.ObjectIDs.User;
                                        }
                                        text += ` ${obj.value.common.members.join(', ')}`;
                                    }
                                    console.log(text);
                                }
                            }

                            console.log(
                                '--------------------+---------+---------+-----------+-------+------------------------+---------',
                            );
                            console.log('Legend: (l)ist, (r)ead, (w)rite, (c)reate, (d)elete');
                            this.processExit();
                        },
                    );
                    break;

                case 'h':
                case 'hosts':
                    this.objects.getObjectList(
                        { startkey: 'system.host.', endkey: 'system.host.\u9999' },
                        (err, objs) => {
                            if (!objs) {
                                this.processExit();
                                return;
                            }
                            this.states.getKeys('system.host.*', (err, keys) => {
                                if (!keys) {
                                    this.processExit();
                                    return;
                                }
                                this.states.getStates(keys, (err, states) => {
                                    if (!states) {
                                        this.processExit();
                                        return;
                                    }

                                    const reg = filter
                                        ? new RegExp(tools.pattern2RegEx(`system.host.${filter}`))
                                        : null;

                                    for (const obj of objs.rows) {
                                        if (obj.value.type !== 'host') {
                                            continue;
                                        }
                                        if (
                                            !reg ||
                                            reg.test(obj.value._id) ||
                                            (obj.value.common && reg.test(obj.value.common.name))
                                        ) {
                                            const id = obj.value._id.substring(12);
                                            let name = obj.value.common.name;
                                            if (tools.isObject(name)) {
                                                name = name[lang] || name.en;
                                            }

                                            const hostname = obj.value.common.hostname;

                                            const version = obj.value.common.installedVersion;
                                            let alive = '';
                                            let uptime = '';
                                            for (let k = 0; k < keys.length; k++) {
                                                if (keys[k] === `${obj.value._id}.alive`) {
                                                    alive = 'alive';
                                                }
                                                if (keys[k] === `${obj.value._id}.uptime`) {
                                                    uptime = states[k]!.val?.toString() || '-';
                                                }
                                            }
                                            alive = alive || 'dead';

                                            if (!uptime) {
                                                uptime = '-';
                                            }
                                            const text = `${id.padEnd(
                                                19,
                                            )} ${name} (version: ${version}, hostname: ${hostname.padEnd(
                                                14,
                                            )}, ${alive}, uptime: ${uptime})`;
                                            // todo
                                            console.log(text);
                                        }
                                    }

                                    this.processExit();
                                });
                            });
                        },
                    );
                    break;

                case 'enums':
                case 'e':
                    this.objects.getObjectList({ startkey: 'enum.', endkey: 'enum.\u9999' }, (err, objs) => {
                        if (!objs) {
                            this.processExit();
                            return;
                        }
                        const reg = filter ? new RegExp(tools.pattern2RegEx(`enum.${filter}`)) : null;
                        for (const obj of objs.rows) {
                            if (obj.value.type !== 'enum') {
                                continue;
                            }

                            let name = obj.value.common?.name;
                            if (tools.isObject(name)) {
                                name = name[lang] || name.en;
                            }

                            if (!reg || reg.test(obj.value._id) || (name && reg.test(name))) {
                                console.log(
                                    '\n=====================================================================================',
                                );
                                const id = obj.value._id.substring(5);

                                console.log(`${id.padEnd(19)}(${name})`);
                                console.log(
                                    '-------------------------------------------------------------------------------------',
                                );

                                if (obj.value.common.members) {
                                    console.log(obj.value.common.members.join(', '));
                                }
                            }
                        }
                        this.processExit();
                    });
                    break;

                case 'files':
                case 'f':
                    this.objects.getObjectList({ startkey: '', endkey: '\u9999' }, (err, objs) => {
                        if (!objs) {
                            this.processExit();
                            return;
                        }

                        const adapter = filter || null;
                        const names = filter ? filter.split('/') : null;
                        if (names && !names[0]) {
                            names.splice(0, 1);
                        }

                        const adapters = objs.rows
                            .filter(
                                row =>
                                    row.value.type === 'meta' &&
                                    !(
                                        names &&
                                        adapter &&
                                        row.value._id !== names[0] &&
                                        !row.value._id.startsWith(`${names[0]}.`)
                                    ),
                            )
                            .map(row => row.value._id);

                        if (names) {
                            names.shift();
                        }

                        this.listAdaptersFiles(adapters, names ? names.join('/') : null, () => this.processExit());
                    });
                    break;
            }
        });
    }
}
