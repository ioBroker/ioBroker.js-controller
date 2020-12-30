/**
 *      List different objects for CLI
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';

/** @class */
function List(options) {
    const that = this;

    options = options || {};

    if (!options.states)      {
        throw new Error('Invalid Modified arguments: states is missing');
    }
    if (!options.objects)     {
        throw new Error('Invalid arguments: objects is missing');
    }
    if (!options.processExit) {
        throw new Error('Invalid arguments: processExit is missing');
    }

    const tools             = require('../tools');
    const fs                = require('fs-extra');
    const EXIT_CODES        = require('../exitCodes');

    this.config = fs.readJSONSync(tools.getConfigFileName());

    const objects           = options.objects;
    const states            = options.states;
    const processExit       = options.processExit;

    function perm2str(perm) {
        let result = '';
        // user
        result += (perm & 0x400) ? 'r' : '-';
        result += (perm & 0x200) ? 'w' : '-';
        result += (perm & 0x100) ? 'x' : '-';
        // group
        result += (perm & 0x040) ? 'r' : '-';
        result += (perm & 0x020) ? 'w' : '-';
        result += (perm & 0x010) ? 'x' : '-';
        // any
        result += (perm & 0x004) ? 'r' : '-';
        result += (perm & 0x002) ? 'w' : '-';
        result += (perm & 0x001) ? 'x' : '-';
        return result;
    }

    this.showFileHeader = function (adapter) {
        adapter && console.log(`\n-- ${adapter} --`);
        console.log('   Modified at  |Permission|     User     |     Group    | Size | Name');
        console.log('----------------+----------+--------------+--------------+------+---------');
    };

    this.showFile = (adapter, path, file) => {
        //drwxr-xr-x   1 odroid odroid    43 Oct  3  2013 .xsessionrc
        let text = '';
        let time;
        if (file.modifiedAt) {
            const ts = new Date(file.modifiedAt);
            time = ts.toISOString();
            time = time.replace('T', ' ');
            time = time.substring(0, 16) + ' ';
        } else {
            time = new Array(18).join(' ');
        }
        text += time;

        if (file.acl){
            text += (file.isDir ? 'd' : '-') + perm2str(file.acl.permissions || 0);
            let owner = file.acl.owner;
            if (owner) {
                owner = owner.substring(12);
                if (owner.length < 15) {
                    owner = new Array(15 - owner.length).join(' ') + owner;
                }
            } else {
                owner = new Array(15).join(' ');
            }
            text += ' ' + owner;
            let group = file.acl.ownerGroup;
            if (group) {
                group = group.substring(13);
                if (group.length < 15) {
                    group = new Array(15 - group.length).join(' ') + group;
                }
            } else {
                group = new Array(15).join(' ');
            }

            text += ' ' + group;
        } else {
            text += (file.isDir ? 'd' : '-') + '?????????' + new Array(31).join(' ');
        }
        let size = (file.stats && file.stats.size) ? file.stats.size.toString() : '';
        if (size.length < 7) {
            size = new Array(7 - size.length).join(' ') + size;
        }

        text += ' ' + size + ' ' + adapter + ((!path || path[0] === '/') ? '' : '/') + path + '/' + file.file;
        if (file.isDir) {
            text += '/';
            console.log(text);
        } else {
            console.log(text);
        }
    };

    this.showObjectHeader = () => {
        console.log('ObjectAC | StateAC |     User     |     Group    | ID');
        console.log('---------+---------+--------------+--------------+--------------');
    };

    this.showObject = obj => {
        //drwxr-xr-x   1 odroid odroid    43 Oct  3  2013 .xsessionrc
        let text = '';
        if (obj.acl){
            text += perm2str(obj.acl.object || 0) + ' ' + ((obj.type === 'state') ? perm2str(obj.acl.state || 0) : '         ');
            let owner = obj.acl.owner;
            if (owner) {
                owner = owner.substring(12);
                if (owner.length < 15) {
                    owner = new Array(15 - owner.length).join(' ') + owner;
                }
            } else {
                owner = new Array(15).join(' ');
            }
            text += ' ' + owner;
            let group = obj.acl.ownerGroup;
            if (group) {
                group = group.substring(13);
                if (group.length < 15) {
                    group = new Array(15 - group.length).join(' ') + group;
                }
            } else {
                group = new Array(15).join(' ');
            }
            text += ' ' + group;
        } else {
            text += '?????????' + ((obj.type === 'state') ? ' ?????????' : '          ') + new Array(31).join(' ');
        }
        text += ' ' + obj._id;
        console.log(text);
    };

    this.listDirectory = (adapter, path, allFiles, callback) => {
        if (typeof path === 'function') {
            callback = path;
            path = '';
            allFiles = [];
        }
        if (typeof allFiles === 'function') {
            callback = allFiles;
            allFiles = [];
        }
        allFiles = allFiles || [];

        path = path || '';

        objects.readDir(adapter, path, null, (err, files) => {
            if (err && err.code === 'ENOTDIR') {
                const pos = path.lastIndexOf('/');
                if (pos !== -1) {
                    const dir = path.substring(0, pos);
                    const fname = path.substring(pos + 1);
                    objects.readDir(adapter, dir, null, function (err, files) {
                        if (err) {
                            console.log('Cannot read "' + path + '": ' + err);
                            typeof callback === 'function' && callback(allFiles);
                        } else {
                            for (let f = 0; f < files.length; f++) {
                                if (files[f].file === '.' || files[f].file === '..') {
                                    continue;
                                }
                                if (files[f].file === fname) {
                                    allFiles.push({adapter: adapter, path: path, file: files[f]});
                                    break;
                                }
                            }
                            typeof callback === 'function' && callback(allFiles);
                        }
                    });
                } else if (typeof callback === 'function') {
                    callback(allFiles);
                }
            } else {
                let count = 0;
                for (let f = 0; f < files.length; f++) {
                    if (files[f].file === '.' || files[f].file === '..') {
                        continue;
                    }
                    allFiles.push({adapter: adapter, path: path, file: files[f]});
                    if (files[f].isDir) {
                        count++;
                        that.listDirectory(adapter, path + '/' + files[f].file, allFiles, function () {
                            if (!--count && callback) {
                                typeof callback === 'function' && callback(allFiles);
                            }
                        });
                    }
                }
                if (!count && typeof callback === 'function') {
                    callback(allFiles);
                }
            }
        });
    };

    function sortFiles (a, b) {
        let a1 = a.path + a.file.file;
        if (a1[0] !== '/') {
            a1 = '/' + a1;
        }
        let b1 = b.path + b.file.file;
        if (b1[0] !== '/') {
            b1 = '/' + b1;
        }
        return a1.localeCompare(b1);
    }

    this.listAdaptersFiles = (adapters, filter, callback) => {
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
            const adapter = adapters.shift();
            this.listDirectory(adapter, filter, files => {
                files.sort(sortFiles);
                that.showFileHeader(adapter);

                files.filter(f => !filter || (f.path + '/'+ f.file.file).startsWith(filter))
                    .forEach(f => that.showFile(f.adapter, f.path, f.file));

                that.listAdaptersFiles(adapters, callback);
            });
        } else {
            typeof callback === 'function' &&  callback ();
        }
    };

    function readOnlineState(lines, flags, cb, _result) {
        _result = _result || [];
        if (!lines || !lines.length) {
            cb(_result);
        } else {
            const task = lines.shift();
            const id = task.id + '.alive';
            states.getState(id, (err, state) => {
                if (state && state.val) {
                    _result.push('+ ' + task.value);
                } else if (!flags.alive) {
                    _result.push('  ' + task.value);
                }
                setImmediate(readOnlineState, lines, flags, cb, _result);
            });
        }
    }

    this.list = (type, filter, flags) => {
        objects.getObject('system.config', (err, systemConf) => {
            const lang = (systemConf && systemConf.common && systemConf.common.language) || 'en';
            switch (type) {
                case 'objects':
                case 'o':
                    objects.getObjectList(null, (err, objs) => {
                        const reg = filter ? new RegExp(tools.pattern2RegEx(filter)) : null;
                        for (let i = 0; i < objs.rows.length; i++) {
                            let name = objs.rows[i].value && objs.rows[i].value.common && objs.rows[i].value.common.name;
                            if (typeof name === 'object') {
                                name = name[lang] || name.en;
                            }
                            if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(name))) {
                                if (objs.rows[i].value.type) {
                                    let id = objs.rows[i].value._id;
                                    let type = objs.rows[i].value.type;
                                    if (id.length < 40)   {
                                        id   += new Array(40 - id.length).join(' ');
                                    }
                                    if (type.length < 10) {
                                        type += new Array(10 - type.length).join(' ');
                                    }

                                    console.log(id + ': ' + type + ' - ' + (name || ''));
                                } else {
                                    console.log(objs.rows[i].value._id);
                                }
                            }
                        }
                        setTimeout(processExit, 1000, null);
                    });
                    break;

                case 'states':
                case 's':
                    states.getKeys(filter || '*', (err, keys) => {
                        if (err) {
                            console.error(err);
                            processExit(EXIT_CODES.CANNOT_GET_STATES);
                        }
                        states.getStates(keys, (err, states) => {
                            if (err) {
                                console.error(err);
                                return processExit(EXIT_CODES.CANNOT_GET_STATES);
                            }
                            for (let i = 0; i < states.length; i++) {
                                let id = keys[i];
                                let from = states[i].from || '';
                                let type = typeof states[i].val;
                                if (type.length < 10) {
                                    type += new Array(10 - type.length).join(' ');
                                }
                                if (id.length < 40) {
                                    id += new Array(40 - id.length).join(' ');
                                }
                                if (from.length < 30) {
                                    from += new Array(30 - from.length).join(' ');
                                }
                                console.log(id + ': from [' + from + '] (' + type + ') ' + (states[i].ack ? '    ack': 'not ack') + ' ' + JSON.stringify(states[i].val));
                            }
                            setTimeout(processExit, 1000, null);
                        });
                    });
                    break;

                case 'adapters':
                case 'a':
                    objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, (err, objs) => {
                        const reg = filter ? new RegExp(tools.pattern2RegEx('system.adapter.' + filter)) : null;
                        for (let i = 0; i < objs.rows.length; i++) {
                            if (objs.rows[i].value.type !== 'adapter') {
                                continue;
                            }
                            if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(objs.rows[i].value.common.name))) {
                                let id = objs.rows[i].value._id;
                                let name = objs.rows[i].value.common.name;
                                if (typeof name === 'object') {
                                    name = name[lang] || name.en;
                                }
                                if (id.length < 40) {
                                    id += new Array(40 - id.length).join(' ');
                                }
                                if (name.length < 15) {
                                    name += new Array(15 - name.length).join(' ');
                                }

                                const text = id + ': ' + name + ' - v' +
                                    objs.rows[i].value.common.version;

                                console.log(text);
                            }
                        }
                        setTimeout(processExit, 1000, null);
                    });
                    break;

                case 'instances':
                case 'i':
                    objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, (err, objs) => {
                        const reg = filter ? new RegExp(tools.pattern2RegEx('system.adapter.' + filter)) : null;
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
                            if (!reg || reg.test(row.value._id) || (row.value.common && reg.test(row.value.common.name))) {
                                if (flags.enabled  && !row.value.common.enabled) {
                                    continue;
                                }
                                if (flags.disabled && row.value.common.enabled) {
                                    continue;
                                }
                                if (flags.port     && row.value.native.port   === undefined) {
                                    continue;
                                }
                                if (flags.ssl      && row.value.native.secure === undefined) {
                                    continue;
                                }
                                if (flags.ip       && row.value.native.bind   === undefined) {
                                    continue;
                                }

                                let id = row.value._id;
                                let name = row.value.common.name;
                                let host = row.value.common.host;
                                if (typeof name === 'object') {
                                    name = name[lang] || name.en;
                                }
                                if (id.length < 40) {
                                    id = id.padEnd(40);
                                }
                                if (name && name.length < 22) {
                                    name = name.padEnd(22);
                                }

                                if (host && host.length < 40) {
                                    host = host.padEnd(40);
                                }

                                let text = `${id}: ${name || ''}: ${host} - ${row.value.common.enabled ? ' enabled' : 'disabled'}`;

                                if (this.config.system && this.config.system.compact && row.value.common.compact) {
                                    text += ', compact ' + (row.value.common.compact && row.value.common.runAsCompactMode ? 'enabled (group ' + (row.value.common.compactGroup !== undefined ? row.value.common.compactGroup : 1) + ')' : 'disabled');
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
                                lines.push({id: row.value._id, value: text});
                            }
                        }
                        readOnlineState(lines, flags, result => {
                            console.log(result.join('\n'));
                            console.log('\n+ instance is alive');
                            setTimeout(processExit, 1000, null);
                        });
                    });
                    break;

                case 'users':
                case 'u':
                    objects.getObjectList({startkey: 'system.user.', endkey: 'system.user.\u9999'}, (err, objs) => {
                        objects.getObjectList({startkey: 'system.group.', endkey: 'system.group.\u9999'}, (err, groups) => {
                            const reg = filter ? new RegExp(tools.pattern2RegEx('system.user.' + filter)) : null;
                            console.log('    ID                                 | Name        | Active   | Groups');
                            console.log('---------------------------------------+-------------+----------+--------------');
                            for (let i = 0; i < objs.rows.length; i++) {
                                if (objs.rows[i].value.type !== 'user') {
                                    continue;
                                }

                                if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(objs.rows[i].value.common.name))) {
                                    let id   = objs.rows[i].value._id;
                                    let name = objs.rows[i].value.common.name;
                                    if (typeof name === 'object') {
                                        name = name[lang] || name.en;
                                    }
                                    if (id.length < 40)   {
                                        id   += new Array(40 - id.length).join(' ');
                                    }
                                    if (name.length < 12) {
                                        name += new Array(12 - name.length).join(' ');
                                    }

                                    const text = id + '| ' + name + ' | ' +
                                        (objs.rows[i].value.common.enabled ? ' enabled' : 'disabled') + ' |';
                                    const gs = [];
                                    // find all groups
                                    for (let g = 0; g < groups.rows.length; g++) {
                                        if (groups.rows[g].value.common.members && groups.rows[g].value.common.members.indexOf(objs.rows[i].value._id) !== -1) {
                                            gs.push(groups.rows[g].value._id.substring(13));
                                        }
                                    }
                                    console.log(text + ' ' + gs.join(', '));
                                }
                            }
                            setTimeout(processExit, 1000, null);
                        });
                    });
                    break;

                case 'groups':
                case 'g':
                    objects.getObjectList({startkey: 'system.group.', endkey: 'system.group.\u9999'}, (err, objs) => {
                        const reg = filter ? new RegExp(tools.pattern2RegEx('system.group.' + filter)) : null;
                        console.log('');
                        console.log('  system.group      | object  | state   | file      | user  | others                 | users');
                        console.log('                    | l r w d | l r w d | l r w c d | w c d |                        |');
                        console.log('--------------------+---------+---------+-----------+-------+------------------------+---------');
                        for (let i = 0; i < objs.rows.length; i++) {
                            if (objs.rows[i].value.type !== 'group') {
                                continue;
                            }
                            if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(objs.rows[i].value.common.name))) {
                                let id   = objs.rows[i].value._id.substring(13);
                                //let name = objs.rows[i].value.common.name;

                                if (id === 'administrator') {
                                    objs.rows[i].value.common.acl = {
                                        file: {
                                            read: true,
                                            write: true,
                                            'delete': true,
                                            create: true,
                                            list: true
                                        },
                                        object: {
                                            read: true,
                                            write: true,
                                            'delete': true,
                                            list: true
                                        },
                                        state: {
                                            read: true,
                                            write: true,
                                            'delete': true,
                                            create: true,
                                            list: true
                                        },
                                        user:  {
                                            write: true,
                                            create: true,
                                            'delete': true
                                        },
                                        other: {
                                            execute: true,
                                            http: true,
                                            sendto: true
                                        }
                                    };
                                }

                                if (id.length < 20) {
                                    id += new Array(20 - id.length).join(' ');
                                }
                                let text = id;
                                text += ' | ';
                                if (objs.rows[i].value.common.acl && objs.rows[i].value.common.acl.object) {
                                    text += (objs.rows[i].value.common.acl.object.list   ? '+': '-') + ' ';
                                    text += (objs.rows[i].value.common.acl.object.read   ? '+': '-') + ' ';
                                    text += (objs.rows[i].value.common.acl.object.write  ? '+': '-') + ' ';
                                    text += (objs.rows[i].value.common.acl.object.delete ? '+': '-') + ' ';
                                    text += '|';
                                } else {
                                    text += '        |';
                                }
                                if (objs.rows[i].value.common.acl && objs.rows[i].value.common.acl.state) {
                                    text += ' ';
                                    text +=(objs.rows[i].value.common.acl.state.list   ? '+': '-') + ' ';
                                    text +=(objs.rows[i].value.common.acl.state.read   ? '+': '-') + ' ';
                                    text +=(objs.rows[i].value.common.acl.state.write  ? '+': '-') + ' ';
                                    text +=(objs.rows[i].value.common.acl.state.delete ? '+': '-') + ' ';
                                    text += '|';
                                } else {
                                    text += '         |';
                                }
                                if (objs.rows[i].value.common.acl && objs.rows[i].value.common.acl.file) {
                                    text += ' ';
                                    text += (objs.rows[i].value.common.acl.file.list   ? '+': '-') + ' ';
                                    text += (objs.rows[i].value.common.acl.file.read   ? '+': '-') + ' ';
                                    text += (objs.rows[i].value.common.acl.file.write  ? '+': '-') + ' ';
                                    text += (objs.rows[i].value.common.acl.file.create ? '+': '-') + ' ';
                                    text += (objs.rows[i].value.common.acl.file.delete ? '+': '-') + ' ';
                                    text += '|';
                                } else {
                                    text += '           |';
                                }
                                if (objs.rows[i].value.common.acl && objs.rows[i].value.common.acl.users) {
                                    text += ' ';
                                    text += (objs.rows[i].value.common.acl.users.write  ? '+': '-') + ' ';
                                    text += (objs.rows[i].value.common.acl.users.create ? '+': '-') + ' ';
                                    text += (objs.rows[i].value.common.acl.users.delete ? '+': '-') + ' ';
                                    text += '|';
                                } else {
                                    text += '       |';
                                }
                                if (objs.rows[i].value.common.acl && objs.rows[i].value.common.acl.other) {
                                    text += ' ';
                                    let others = '';
                                    for (const r of Object.keys(objs.rows[i].value.common.acl.other)) {
                                        others += r + (objs.rows[i].value.common.acl.other[r] ? '+' : '-') + ' ';
                                    }
                                    if (others.length < 23) {
                                        others += new Array(23 - others.length).join(' ');
                                    }
                                    text += others + '|';
                                } else {
                                    text += new Array(25).join(' ') + '|';
                                }

                                //if (name.length < 30) name += new Array(30 - name.length).join(' ');
                                if ( objs.rows[i].value.common.members) {
                                    for (let m = 0; m < objs.rows[i].value.common.members.length; m++) {
                                        objs.rows[i].value.common.members[m] = objs.rows[i].value.common.members[m].substring(12);
                                    }
                                    text += ' ' + objs.rows[i].value.common.members.join(', ');
                                }
                                //text += '| (' + name + ')';
                                console.log(text);
                            }
                        }

                        console.log('--------------------+---------+---------+-----------+-------+------------------------+---------');
                        console.log('Legend: (l)ist, (r)ead, (w)rite, (c)reate, (d)elete');
                        setTimeout(processExit, 1000, null);
                    });
                    break;

                case 'h':
                case 'hosts':
                    objects.getObjectList({startkey: 'system.host.', endkey: 'system.host.\u9999'}, (err, objs) => {
                        states.getKeys('system.host.*', (err, keys) => {
                            states.getStates(keys, (err, states) => {
                                const reg = filter ? new RegExp(tools.pattern2RegEx('system.host.' + filter)) : null;

                                for (let i = 0; i < objs.rows.length; i++) {
                                    if (objs.rows[i].value.type !== 'host') {
                                        continue;
                                    }
                                    if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(objs.rows[i].value.common.name))) {
                                        let id   = objs.rows[i].value._id.substring(12);
                                        let name = objs.rows[i].value.common.name;
                                        if (typeof name === 'object') {
                                            name = name[lang] || name.en;
                                        }
                                        if (id.length < 20) {
                                            id += new Array(20 - id.length).join(' ');
                                        }
                                        let hostname = objs.rows[i].value.common.hostname;
                                        if (hostname.length < 15) {
                                            hostname += new Array(15 - hostname.length).join(' ');
                                        }
                                        const version  = objs.rows[i].value.common.installedVersion;
                                        let alive  = '';
                                        let uptime = '';
                                        for (let k = 0; k < keys.length; k++) {
                                            if (keys[k] === objs.rows[i].value._id + '.alive') {
                                                alive = states[k].val;
                                            }
                                            if (keys[k] === objs.rows[i].value._id + '.uptime') {
                                                uptime = states[k].val;
                                            }
                                        }
                                        alive    = alive ? 'alive' : ' dead';
                                        //if (uptime.toString().length < 10) uptime = new Array(10 - uptime.toString().length).join(' ') + uptime.toString();
                                        if (!uptime) {
                                            uptime = '-';
                                        }
                                        const text = id + ' ' + name + ' (version: ' + version + ', hostname: ' + hostname + ', ' + alive +  ', uptime: ' + uptime + ')';
                                        // todo
                                        console.log(text);
                                    }
                                }

                                setTimeout(processExit, 1000, null);
                            });
                        });
                    });
                    break;

                case 'enums':
                case 'e':
                    objects.getObjectList({startkey: 'enum.', endkey: 'enum.\u9999'}, (err, objs) => {
                        const reg = filter ? new RegExp(tools.pattern2RegEx('enum.' + filter)) : null;
                        for (let i = 0; i < objs.rows.length; i++) {
                            if (objs.rows[i].value.type !== 'enum') {
                                continue;
                            }
                            if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(objs.rows[i].value.common.name))) {
                                console.log('\n=====================================================================================');
                                let id   = objs.rows[i].value._id.substring(5);
                                let name = objs.rows[i].value.common.name;
                                if (typeof name === 'object') {
                                    name = name[lang] || name.en;
                                }
                                if (id.length < 20) {
                                    id += new Array(20 - id.length).join(' ');
                                }
                                console.log(id + '(' + name + ')');
                                console.log('-------------------------------------------------------------------------------------');

                                if (objs.rows[i].value.common.members) {
                                    console.log(objs.rows[i].value.common.members.join(', '));
                                }
                            }
                        }
                        setTimeout(processExit, 1000, null);
                    });
                    break;

                case 'files':
                case 'f':
                    objects.getObjectList({startkey: '', endkey: '\u9999'}, (err, objs) => {
                        const adapter = filter || null;
                        const names = filter ? filter.split('/') : null;
                        if (names && !names[0]) {
                            names.splice(0, 1);
                        }

                        const adapters = objs.rows.filter(row => row.value.type === 'meta' && !(adapter && row.value._id !== names[0] && !row.value._id.startsWith(`${names[0]}.`))).map(row => row.value._id);

                        names && names.shift();

                        that.listAdaptersFiles(adapters, names ? names.join('/') : null, () =>
                            setTimeout(processExit, 1000, null));
                    });
                    break;

                default:
                    if (type) {
                        console.error('Unknown type: ' + type);
                        processExit(EXIT_CODES.INVALID_ARGUMENTS);
                    } else {
                        console.log('Please specify type: objects, states, instances, adapters, users, groups, enums, files');
                        processExit();
                    }
                    break;
            }
        });
    };
}

module.exports = List;
