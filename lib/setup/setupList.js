'use strict';
function List(options) {
    var fs = require('fs');
    var tools = require(__dirname + '/../tools.js');

    var that = this;

    options = options || {};

    if (!options.states)      throw 'Invalid arguments: states is missing';
    if (!options.objects)     throw 'Invalid arguments: objects is missing';
    if (!options.processExit) throw 'Invalid arguments: processExit is missing';

    var objects           = options.objects;
    var states            = options.states;
    var processExit       = options.processExit;

    function perm2str(perm) {
        var result = '';
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

    this.showFileHeader = function () {
        console.log('   Modified at  |Permission|     User     |     Group    | Size | Name');
        console.log('----------------+----------+--------------+--------------+------+---------');
    };

    this.showFile = function (adapter, path, file) {
        //drwxr-xr-x   1 odroid odroid    43 Oct  3  2013 .xsessionrc
        var text = '';
        var time;
        if (file.modifiedAt) {
            var ts = new Date(file.modifiedAt);
            time = ts.toISOString();
            time = time.replace('T', ' ');
            time = time.substring(0, 16) + ' ';
        } else {
            time =  Array(18).join(' ');
        }
        text += time;

        if (file.acl){
            text += (file.isDir ? 'd' : '-') + perm2str(file.acl.permissions || 0);
            var owner = file.acl.owner;
            if (owner) {
                owner = owner.substring(12);
                if (owner.length < 15) owner = Array(15 - owner.length).join(' ') + owner;
            } else {
                owner =  Array(15).join(' ');
            }
            text += ' ' + owner;
            var group = file.acl.ownerGroup;
            if (group) {
                group = group.substring(13);
                if (group.length < 15) group = Array(15 - group.length).join(' ') + group;
            } else {
                group =  Array(15).join(' ');
            }

            text += ' ' + group;
        } else {
            text += (file.isDir ? 'd' : '-') + '?????????' + Array(31).join(' ');
        }
        var size = (file.stats) ? file.stats.size.toString() : '';
        if (size.length < 7) size = Array(7 - size.length).join(' ') + size;

        text += ' ' + size + ' ' + adapter + ((!path || path[0] === '/') ? '' : '/') + path + '/' + file.file;
        if (file.isDir) {
            text += '/';
            console.log(text);
        } else {
            console.log(text);
        }
    };

    this.showObjectHeader = function () {
        console.log('ObjectAC | StateAC |     User     |     Group    | ID');
        console.log('---------+---------+--------------+--------------+--------------');
    };

    this.showObject = function (obj) {
        //drwxr-xr-x   1 odroid odroid    43 Oct  3  2013 .xsessionrc
        var text = '';
        if (obj.acl){
            text += perm2str(obj.acl.object || 0) + ' ' + ((obj.type === 'state') ? perm2str(obj.acl.state || 0) : '         ');
            var owner = obj.acl.owner;
            if (owner) {
                owner = owner.substring(12);
                if (owner.length < 15) owner = Array(15 - owner.length).join(' ') + owner;
            } else {
                owner =  Array(15).join(' ');
            }
            text += ' ' + owner;
            var group = obj.acl.ownerGroup;
            if (group) {
                group = group.substring(13);
                if (group.length < 15) group = Array(15 - group.length).join(' ') + group;
            } else {
                group =  Array(15).join(' ');
            }
            text += ' ' + group;
        } else {
            text += '?????????' + ((obj.type === 'state') ? ' ?????????' : '          ') + Array(31).join(' ');
        }
        text += ' ' + obj._id;
        console.log(text);
    };

    this.listDirectory = function (adapter, path, allFiles, callback) {
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

        objects.readDir(adapter, path, null, function (err, files) {
            if (err && err.code === 'ENOTDIR') {
                var pos = path.lastIndexOf('/');
                if (pos !== -1) {
                    var dir = path.substring(0, pos);
                    var fname = path.substring(pos + 1);
                    objects.readDir(adapter, dir, null, function (err, files) {
                        if (err) {
                            console.log('Cannot read "' + path + '": ' + err);
                            callback(allFiles);
                        } else {
                            for (var f = 0; f < files.length; f++) {
                                if (files[f].file === '.' || files[f].file === '..') continue;
                                if (files[f].file === fname) {
                                    allFiles.push({adapter: adapter, path: path, file: files[f]});
                                    break;
                                }
                            }
                            callback(allFiles);
                        }
                    });
                } else {
                    callback(allFiles);
                }
            } else {
                var count = 0;
                for (var f = 0; f < files.length; f++) {
                    if (files[f].file === '.' || files[f].file === '..') continue;
                    allFiles.push({adapter: adapter, path: path, file: files[f]});
                    if (files[f].isDir) {
                        count++;
                        that.listDirectory(adapter, path + '/' + files[f].file, allFiles, function () {
                            if (!--count && callback) {
                                callback(allFiles);
                            }
                        });
                    }
                }
                if (!count && callback) callback(allFiles);
            }
        });
    };

    function pattern2RegEx(pattern) {
        if (pattern !== '*') {
            if (pattern[0] === '*' && pattern[pattern.length - 1] !== '*') pattern += '$';
            if (pattern[0] !== '*' && pattern[pattern.length - 1] === '*') pattern = '^' + pattern;
        }
        pattern = pattern.replace(/\./g, '\\.');
        pattern = pattern.replace(/\*/g, '.*');
        return pattern;
    }

    function sortFiles (a, b) {
        var a1 = a.path + a.file.file;
        if (a1[0] !== '/') a1 = '/' + a1;
        var b1 = b.path + b.file.file;
        if (b1[0] !== '/') b1 = '/' + b1;
        return a1.localeCompare(b1);
    }

    this.listAdaptersFiles = function (adapters, filter, callback) {
        if (typeof filter === 'function') {
            callback = filter;
            filter = null;
        }
        if (filter) {
            filter = filter.replace('*', '');
            if (filter[filter.length - 1] === '/') filter = filter.substring(0, filter.length - 1);
        }


        if (adapters && adapters.length) {
            var adapter = adapters.pop();
            this.listDirectory(adapter, filter, function (files) {
                files.sort(sortFiles);
                that.showFileHeader();
                for (var k = 0; k < files.length; k++) {
                    if (filter && filter !== (files[k].path + '/'+ files[k].file.file).substring(0, filter.length)) continue;

                    that.showFile(files[k].adapter, files[k].path, files[k].file);
                }

                that.listDirectory(adapter + '.admin', filter, function (files) {
                    files.sort(sortFiles);
                    for (var k = 0; k < files.length; k++) {
                        if (filter && filter !== (files[k].path + '/'+ files[k].file.file).substring(0, filter.length)) continue;

                        that.showFile(files[k].adapter, files[k].path, files[k].file);
                    }

                    that.listAdaptersFiles(adapters, callback);
                });
            });
        } else {
            if (callback) callback ();
        }
    };

    this.list = function (type, filter, flags) {
        switch (type) {
            case 'objects':
            case 'o':
                objects.getObjectList(null, function (err, objs) {
                    var reg = filter ? new RegExp(pattern2RegEx(filter)) : null;
                    for (var i = 0; i < objs.rows.length; i++) {
                        if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(objs.rows[i].value.common.name))) {
                            if (objs.rows[i].value.type) {
                                var id = objs.rows[i].value._id;
                                var type = objs.rows[i].value.type;
                                if (id.length < 40)   id   += Array(40 - id.length).join(' ');
                                if (type.length < 10) type += Array(10 - type.length).join(' ');

                                console.log(id + ': ' + type + ' - ' + (objs.rows[i].value.common.name || ''));
                            } else {
                                console.log(objs.rows[i].value._id);
                            }
                        }
                    }
                    setTimeout(function () {
                        processExit();
                    }, 1000);
                });
                break;

            case 'states':
            case 's':
                states.getKeys(filter || '*', function (err, keys) {
                    if (err) {
                        console.error(err);
                        processExit(23);
                    }
                    states.getStates(keys, function (err, states) {
                        if (err) {
                            console.error(err);
                            processExit(23);
                        }
                        for (var i = 0; i < states.length; i++) {
                            var id = keys[i];
                            var from = states[i].from || '';
                            var type = typeof states[i].val;
                            if (type.length < 10) type += Array(10 - type.length).join(' ');
                            if (id.length < 40) id += Array(40 - id.length).join(' ');
                            if (from.length < 30) from += Array(30 - from.length).join(' ');
                            console.log(id + ': from [' + from + '] (' + type + ') ' + (states[i].ack ? '    ack': 'not ack') + ' ' + JSON.stringify(states[i].val));
                        }
                        setTimeout(function () {
                            processExit();
                        }, 1000);
                    });
                });
                break;

            case 'adapters':
            case 'a':
                objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, function (err, objs) {
                    var reg = filter ? new RegExp(pattern2RegEx('system.adapter.' + filter)) : null;
                    for (var i = 0; i < objs.rows.length; i++) {
                        if (objs.rows[i].value.type !== 'adapter') continue;
                        if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(objs.rows[i].value.common.name))) {
                            var id = objs.rows[i].value._id;
                            var name = objs.rows[i].value.common.name;

                            if (id.length < 40) id += Array(40 - id.length).join(' ');
                            if (name.length < 12) name += Array(12 - name.length).join(' ');

                            var text = id + ': ' + name + ' - ' +
                                objs.rows[i].value.common.version;

                            console.log(text);
                        }
                    }
                    setTimeout(function () {
                        processExit();
                    }, 1000);
                });
                break;

            case 'instances':
            case 'i':
                objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, function (err, objs) {
                    var reg = filter ? new RegExp(pattern2RegEx('system.adapter.' + filter)) : null;
                    objs.rows.sort(function (a, b) {
                        if (a.id > b.id) return 1;
                        if (a.id < b.id) return -1;
                        return 0;
                    });
                    for (var i = 0; i < objs.rows.length; i++) {
                        if (objs.rows[i].value.type !== 'instance') continue;
                        if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(objs.rows[i].value.common.name))) {
                            if (flags.enabled  && !objs.rows[i].value.common.enabled) continue;
                            if (flags.disabled && objs.rows[i].value.common.enabled) continue;
                            if (flags.port     && objs.rows[i].value.native.port   === undefined) continue;
                            if (flags.ssl      && objs.rows[i].value.native.secure === undefined) continue;
                            if (flags.ip       && objs.rows[i].value.native.bind   === undefined) continue;

                            var id = objs.rows[i].value._id;
                            var name = objs.rows[i].value.common.name;

                            if (id.length < 40) id += Array(40 - id.length).join(' ');
                            if (name && name.length < 12) name += Array(12 - name.length).join(' ');

                            var text = id + ': ' + (name || '') + ' - ' +
                                (objs.rows[i].value.common.enabled ? ' enabled' : 'disabled');

                            if (objs.rows[i].value.native && objs.rows[i].value.native.port) {
                                text += ', port: ' + objs.rows[i].value.native.port;
                            }
                            if (objs.rows[i].value.native && objs.rows[i].value.native.bind) {
                                text += ', bind: ' + objs.rows[i].value.native.bind;
                            }
                            if (objs.rows[i].value.native && objs.rows[i].value.native.secure) {
                                text += ' (SSL)';
                            }
                            if (objs.rows[i].value.native && objs.rows[i].value.native.defaultUser) {
                                text += ', run as: ' + objs.rows[i].value.native.defaultUser;
                            }
                            console.log(text);
                        }
                    }
                    setTimeout(function () {
                        processExit();
                    }, 1000);
                });
                break;

            case 'users':
            case 'u':
                objects.getObjectList({startkey: 'system.user.', endkey: 'system.user.\u9999'}, function (err, objs) {
                    objects.getObjectList({startkey: 'system.group.', endkey: 'system.group.\u9999'}, function (err, groups) {
                        var reg = filter ? new RegExp(pattern2RegEx('system.user.' + filter)) : null;
                        console.log('    ID                                 | Name        | Active   | Groups');
                        console.log('---------------------------------------+-------------+----------+--------------');
                        for (var i = 0; i < objs.rows.length; i++) {
                            if (objs.rows[i].value.type !== 'user') continue;

                            if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(objs.rows[i].value.common.name))) {
                                var id   = objs.rows[i].value._id;
                                var name = objs.rows[i].value.common.name;

                                if (id.length < 40)   id   += Array(40 - id.length).join(' ');
                                if (name.length < 12) name += Array(12 - name.length).join(' ');

                                var text = id + '| ' + name + ' | ' +
                                    (objs.rows[i].value.common.enabled ? ' enabled' : 'disabled') + ' |';
                                var gs = [];
                                // find all groups
                                for (var g = 0; g < groups.rows.length; g++) {
                                    if (groups.rows[g].value.common.members && groups.rows[g].value.common.members.indexOf(objs.rows[i].value._id) !== -1) {
                                        gs.push(groups.rows[g].value._id.substring(13));
                                    }
                                }
                                console.log(text + ' ' + gs.join(', '));
                            }
                        }
                        setTimeout(function () {
                            processExit();
                        }, 1000);
                    });
                });
                break;

            case 'groups':
            case 'g':
                objects.getObjectList({startkey: 'system.group.', endkey: 'system.group.\u9999'}, function (err, objs) {
                    var reg = filter ? new RegExp(pattern2RegEx('system.group.' + filter)) : null;
                    console.log('');
                    console.log('  system.group      | object  | state   | file      | user  | others                 | users');
                    console.log('                    | l r w d | l r w d | l r w c d | w c d |                        |');
                    console.log('--------------------+---------+---------+-----------+-------+------------------------+---------');
                    for (var i = 0; i < objs.rows.length; i++) {
                        if (objs.rows[i].value.type !== 'group') continue;
                        if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(objs.rows[i].value.common.name))) {
                            var id   = objs.rows[i].value._id.substring(13);
                            //var name = objs.rows[i].value.common.name;

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

                            if (id.length < 20) id += Array(20 - id.length).join(' ');
                            var text = id;
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
                                var others = '';
                                for (var r in objs.rows[i].value.common.acl.other) {
                                    others += r + (objs.rows[i].value.common.acl.other[r] ? '+' : '-') + ' ';
                                }
                                if (others.length < 23) others += Array(23 - others.length).join(' ');
                                text += others + '|';
                            } else {
                                text +=  Array(25).join(' ') + '|';
                            }

                            //if (name.length < 30) name += Array(30 - name.length).join(' ');
                            if ( objs.rows[i].value.common.members) {
                                for (var m = 0; m < objs.rows[i].value.common.members.length; m++) {
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
                    setTimeout(function () {
                        processExit();
                    }, 1000);
                });
                break;

            case 'h':
            case 'hosts':
                objects.getObjectList({startkey: 'system.host.', endkey: 'system.host.\u9999'}, function (err, objs) {
                    states.getKeys('system.host.*', function (err, keys) {
                        states.getStates(keys, function (err, states) {
                            var reg = filter ? new RegExp(pattern2RegEx('system.host.' + filter)) : null;

                            for (var i = 0; i < objs.rows.length; i++) {
                                if (objs.rows[i].value.type !== 'host') continue;
                                if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(objs.rows[i].value.common.name))) {
                                    var id   = objs.rows[i].value._id.substring(12);
                                    var name = objs.rows[i].value.common.name;
                                    if (id.length < 20) id += Array(20 - id.length).join(' ');
                                    var hostname = objs.rows[i].value.common.hostname;
                                    if (hostname.length < 15) hostname += Array(15 - hostname.length).join(' ');
                                    var version  = objs.rows[i].value.common.installedVersion;
                                    var alive  = '';
                                    var uptime = '';
                                    for (var k = 0; k < keys.length; k++) {
                                        if (keys[k] === objs.rows[i].value._id + '.alive') {
                                            alive = states[k].val;
                                        }
                                        if (keys[k] === objs.rows[i].value._id + '.uptime') {
                                            uptime = states[k].val;
                                        }
                                    }
                                    alive    = alive ? 'alive' : ' dead';
                                    //if (uptime.toString().length < 10) uptime = Array(10 - uptime.toString().length).join(' ') + uptime.toString();
                                    if (!uptime) uptime = '-';
                                    var text = id + ' ' + name + ' (version: ' + version + ', hostname: ' + hostname + ', ' + alive +  ', uptime: ' + uptime + ')';
                                    // todo
                                    console.log(text);
                                }
                            }

                            setTimeout(function () {
                                processExit();
                            }, 1000);
                        });
                    });
                });
                break;

            case 'enums':
            case 'e':
                objects.getObjectList({startkey: 'enum.', endkey: 'enum.\u9999'}, function (err, objs) {
                    var reg = filter ? new RegExp(pattern2RegEx('enum.' + filter)) : null;
                    for (var i = 0; i < objs.rows.length; i++) {
                        if (objs.rows[i].value.type !== 'enum') continue;
                        if (!reg || reg.test(objs.rows[i].value._id) || (objs.rows[i].value.common && reg.test(objs.rows[i].value.common.name))) {
                            console.log('\n=====================================================================================');
                            var id   = objs.rows[i].value._id.substring(5);
                            var name = objs.rows[i].value.common.name;
                            if (id.length < 20) id += Array(20 - id.length).join(' ');
                            console.log(id + '(' + name + ')');
                            console.log('-------------------------------------------------------------------------------------');

                            if (objs.rows[i].value.common.members) {
                                console.log(objs.rows[i].value.common.members.join(', '));
                            }
                        }
                    }
                    setTimeout(function () {
                        processExit();
                    }, 1000);
                });
                break;

            case 'files':
            case 'f':
                objects.getObjectList({startkey: 'system.adapter.', endkey: 'system.adapter.\u9999'}, function (err, objs) {
                    var adapter = filter || null;
                    var names = filter ? filter.split('/') : null;
                    if (names && !names[0]) names.splice(0, 1);

                    var adapters = [];
                    for (var i = 0; i < objs.rows.length; i++) {
                        if (objs.rows[i].value.type === 'adapter') {
                            if (adapter && objs.rows[i].value.common.name !== names[0]) continue;
                            adapters.push(objs.rows[i].value.common.name);
                        } else if (objs.rows[i].value.type === 'instance') {
                            if (adapter && objs.rows[i].value._id.substring(15) !== names[0]) continue;
                            adapters.push(objs.rows[i].value._id.substring(15));
                        }
                    }
                    if (names) names.shift();
                    that.listAdaptersFiles(adapters, names ? names.join('/') : null, function () {
                        setTimeout(function () {
                            processExit();
                        }, 1000);
                    });
                });
                break;

            default:
                if (type) {
                    console.error('Unknown type: ' + type);
                    processExit(23);
                } else {
                    console.log('Please specify type: objects, states, instances, adapters, users, groups, enums, files');
                    processExit();
                }
                break;
        }
    };
}

module.exports = List;
