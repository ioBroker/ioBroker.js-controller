/**
 *      Common functions between client and server
 *
 *      Copyright 2013-2019 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';
const stream      = require('stream');
const Writable    = stream.Writable;
const memStore    = {};
const util        = require('util');
const path        = require('path');

const regUser     = /^system\.user\./;
const regGroup    = /^system\.group\./;
const regCheckId  = /[*?\[\]]|\$%\$/;

const SYSTEM_ADMIN_USER  = 'system.user.admin';
const SYSTEM_ADMIN_GROUP = 'system.group.administrator';

const ERROR_PERMISSION   = 'permissionError';
const ERROR_NOT_FOUND    = 'Not exists';
const ERROR_DB_CLOSED    = 'DB closed';

const ACCESS_EVERY_EXEC  = 0x1;
const ACCESS_EVERY_WRITE = 0x2;
const ACCESS_EVERY_READ  = 0x4;
const ACCESS_EVERY_RW    = ACCESS_EVERY_WRITE | ACCESS_EVERY_READ;
const ACCESS_EVERY_ALL   = ACCESS_EVERY_WRITE | ACCESS_EVERY_READ | ACCESS_EVERY_EXEC;

const ACCESS_GROUP_EXEC  = 0x10;
const ACCESS_GROUP_WRITE = 0x20;
const ACCESS_GROUP_READ  = 0x40;
const ACCESS_GROUP_RW    = ACCESS_GROUP_WRITE | ACCESS_GROUP_READ;
const ACCESS_GROUP_ALL   = ACCESS_GROUP_WRITE | ACCESS_GROUP_READ | ACCESS_GROUP_EXEC;

const ACCESS_USER_EXEC   = 0x100;
const ACCESS_USER_WRITE  = 0x200;
const ACCESS_USER_READ   = 0x400;
const ACCESS_USER_RW     = ACCESS_USER_WRITE | ACCESS_USER_READ;
const ACCESS_USER_ALL    = ACCESS_USER_WRITE | ACCESS_USER_READ | ACCESS_USER_EXEC;

const ACCESS_WRITE       = 0x2;
const ACCESS_READ        = 0x4;
const ACCESS_LIST        = 'list';
const ACCESS_DELETE      = 'delete';
const ACCESS_CREATE      = 'create';

const mimeTypes = {
    '.css':     {type: 'text/css',                  binary: false},
    '.bmp':     {type: 'image/bmp',                 binary: true},
    '.png':     {type: 'image/png',                 binary: true},
    '.jpg':     {type: 'image/jpeg',                binary: true},
    '.jpeg':    {type: 'image/jpeg',                binary: true},
    '.gif':     {type: 'image/gif',                 binary: true},
    '.ico':     {type: 'image/x-icon',              binary: true},
    '.webp':    {type: 'image/webp',                binary: true},
    '.wbmp':    {type: 'image/vnd.wap.wbmp',        binary: true},
    '.tif':     {type: 'image/tiff',                binary: true},
    '.js':      {type: 'application/javascript',    binary: false},
    '.html':    {type: 'text/html',                 binary: false},
    '.htm':     {type: 'text/html',                 binary: false},
    '.json':    {type: 'application/json',          binary: false},
    '.md':      {type: 'text/markdown',             binary: false},
    '.xml':     {type: 'text/xml',                  binary: false},
    '.svg':     {type: 'image/svg+xml',              binary: false},
    '.eot':     {type: 'application/vnd.ms-fontobject', binary: true},
    '.ttf':     {type: 'application/font-sfnt',     binary: true},
    '.cur':     {type: 'application/x-win-bitmap',  binary: true},
    '.woff':    {type: 'application/font-woff',     binary: true},
    '.wav':     {type: 'audio/wav',                 binary: true},
    '.mp3':     {type: 'audio/mpeg3',               binary: true},
    '.avi':     {type: 'video/avi',                 binary: true},
    '.qt':      {type: 'video/quicktime',           binary: true},
    '.ppt':     {type: 'application/vnd.ms-powerpoint', binary: true},
    '.pptx':    {type: 'application/vnd.ms-powerpoint', binary: true},
    '.doc':     {type: 'application/msword',        binary: true},
    '.docx':    {type: 'application/msword',        binary: true},
    '.xls':     {type: 'application/vnd.ms-excel',  binary: true},
    '.xlsx':    {type: 'application/vnd.ms-excel',  binary: true},
    '.mp4':     {type: 'video/mp4',                 binary: true},
    '.mkv':     {type: 'video/mkv',                 binary: true},
    '.zip':     {type: 'application/zip',           binary: true},
    '.ogg':     {type: 'audio/ogg',                 binary: true},
    '.manifest':{type: 'text/cache-manifest',       binary: false},
    '.pdf':     {type: 'application/pdf',           binary: true},
    '.gz':      {type: 'application/gzip',          binary: true},
    '.gzip':    {type: 'application/gzip',          binary: true}
};

let users                = {};
let groups               = {};

function getMimeType(ext) {
    if (!ext) {
        return {mimeType: 'text/html', isBinary: false};
    }
    if (ext instanceof Array) ext = ext[0];
    ext = ext.toLowerCase();
    let mimeType = 'text/javascript';
    let isBinary  = false;

    if (mimeTypes[ext]) {
        mimeType = mimeTypes[ext].type;
        isBinary = mimeTypes[ext].binary;
    }

    return {mimeType, isBinary};
}

/**
 * @class
 * Writable memory stream
 */
function WMStrm(key, options) {
    // allow use without new operator
    if (!(this instanceof WMStrm)) return new WMStrm(key, options);

    Writable.call(this, options); // init super
    this.key = key; // save key
    memStore[key] = Buffer.alloc(0); // empty
}
util.inherits(WMStrm, Writable);

WMStrm.prototype._write = function (chunk, enc, cb) {
    if (chunk) {
        // our memory store stores things in buffers
        const buffer = (Buffer.isBuffer(chunk)) ?
            chunk :  // already is Buffer use it
            Buffer.from(chunk, enc);  // string, convert

        // concatenate to the buffer already there
        if (!memStore[this.key]) {
            memStore[this.key] = Buffer.alloc(0);
            console.log('memstore for ' + this.key + ' is null');
        }
        memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
    }
    if (!cb) throw 'Callback is empty';
    cb();
};

function insert(objects, id, attName, _ignore, options, _obj, callback) {
    if (typeof options === 'string') {
        options = {mimeType: options};
    }

    // return pipe for write into redis
    const strm = new WMStrm(id + '/' + attName);
    // @ts-ignore
    strm.on('finish', () => {
        let error = null;
        if (!memStore[id + '/' + attName]) {
            error = 'File ' + id + ' / ' +  attName + ' is empty';
        }
        objects.writeFile(id, attName, memStore[id + '/' + attName] || '', options, () => {
            if (memStore[id + '/' + attName] !== undefined) {
                delete memStore[id + '/' + attName];
            }
            callback && setImmediate(callback, error, null);
        });
    });
    return strm;
}

function checkFile(fileOptions, options, flag, defaultNewAcl) {
    if (typeof fileOptions.acl !== 'object') {
        fileOptions.mimeType = JSON.parse(JSON.stringify(fileOptions));
        fileOptions.acl = {
            owner:       (defaultNewAcl && defaultNewAcl.owner)      || SYSTEM_ADMIN_USER,
            ownerGroup:  (defaultNewAcl && defaultNewAcl.ownerGroup) || SYSTEM_ADMIN_GROUP,
            permissions: (defaultNewAcl && defaultNewAcl.file)       || (ACCESS_USER_RW | ACCESS_GROUP_READ | ACCESS_EVERY_READ) // '0644'
        };
    }

    // Set default owner group
    fileOptions.acl.ownerGroup  = fileOptions.acl.ownerGroup  || (defaultNewAcl && defaultNewAcl.ownerGroup) || SYSTEM_ADMIN_GROUP;
    fileOptions.acl.owner       = fileOptions.acl.owner       || (defaultNewAcl && defaultNewAcl.owner)      || SYSTEM_ADMIN_USER;
    fileOptions.acl.permissions = fileOptions.acl.permissions || (defaultNewAcl && defaultNewAcl.file)       || (ACCESS_USER_RW | ACCESS_GROUP_READ | ACCESS_EVERY_READ); // '0644'

    if (options.user !== SYSTEM_ADMIN_USER &&
        options.groups.indexOf(SYSTEM_ADMIN_GROUP) === -1 &&
        fileOptions.acl) {
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

function checkFileRights(objects, id, name, options, flag, callback) {
    options = options || {};
    if (!options.user) {
        // Before files converted, lets think: if no options it is admin
        options = {
            user:    'system.user.admin',
            params:  options,
            group:   'system.group.administrator'
        };
    }

    /*if (options.checked) {
        return callback(null, options);
    }*/

    if (!options.acl) {
        objects.getUserGroup(options.user, (_user, groups, acl) => {
            options.acl    = acl || {};
            options.groups = groups;
            options.group  = groups ? groups[0] : null;
            checkFileRights(objects, id, name, options, flag, callback);
        });
        return;
    }
    // If user may write
    if (flag === 2 && !options.acl.file.write) {// write
        return callback(ERROR_PERMISSION, options);
    }
    // If user may read
    if (flag === 4 && !options.acl.file.read) {// read
        return callback(ERROR_PERMISSION, options);
    }

    options.checked = true;
    objects.checkFile(id, name, options, flag, (err, options, opt) => {
        if (err) {
            return callback(ERROR_PERMISSION, options);
        } else {
            return callback(null, options, opt);
        }
    });

    /*if (typeof fileOptions[id][name].acl != 'object') {
     fileOptions[id][name] = {
     mimeType: fileOptions[id][name],
     acl: {
     owner:       'system.user.admin',
     permissions: 0x644,
     ownerGroup:  'system.group.administrator'
     }
     };
     }
     // Set default onwer group
     fileOptions[id][name].acl.ownerGroup = fileOptions[id][name].acl.ownerGroup || 'system.group.administrator';

     if (options.user != 'system.user.admin' &&
     options.groups.indexOf('system.group.administrator') == -1 &&
     fileOptions[id][name].acl) {
     if (fileOptions[id][name].acl.owner != options.user) {
     // Check if the user is in the group
     if (options.groups.indexOf(fileOptions[id][name].acl.ownerGroup) != -1) {
     // Check group rights
     if (!(fileOptions[id][name].acl.permissions & (flag << 4))) {
     return callback(ERROR_PERMISSION, options);
     }
     } else {
     // everybody
     if (!(fileOptions[id][name].acl.permissions & flag)) {
     return callback(ERROR_PERMISSION, options);
     }
     }
     } else {
     // Check user rights
     if (!(fileOptions[id][name].acl.permissions & (flag << 8))) {
     return callback(ERROR_PERMISSION, options);
     }
     }
     }
     return callback(null, options);*/
}
// For users and groups
function getDefaultAdminRights(acl, _isState) {
    acl = acl || {};
    acl.file = {
        list:     true,
        read:     true,
        write:    true,
        create:   true,
        'delete': true
    };
    acl.object = {
        create:   true,
        list:     true,
        read:     true,
        write:    true,
        'delete': true
    };
    acl.users = {
        create:   true,
        list:     true,
        read:     true,
        write:    true,
        'delete': true
    };
    acl.state = {
        read: true,
        write: true,
        'delete': true,
        create: true,
        list: true
    };

    return acl;
}

function getUserGroup(objects, user, callback) {
    if (!user || typeof user !== 'string' || !user.match(regUser)) {
        console.log('invalid user name: ' + user);
        user = JSON.stringify(user);
        // deep copy
        return callback.call(objects, 'invalid user name: ' + user, user, [], JSON.parse(JSON.stringify(defaultAcl.acl)));
    }
    if (users[user]) {
        return callback.call(objects, null, user, users[user].groups, users[user].acl);
    }

    let error;
    // Read all groups
    objects.getObjectList({startkey: 'system.group.', endkey: 'system.group.\u9999'}, {checked: true}, (err, arr) => {
        if (err) error = err;
        groups = [];
        if (arr) {
            // Read all groups
            for (let g = 0; g < arr.rows.length; g++) {
                groups[g] = arr.rows[g].value;
                if (groups[g]._id === SYSTEM_ADMIN_GROUP) {
                    groups[g].common.acl = getDefaultAdminRights(groups[g].common.acl);
                }
            }
        }

        objects.getObjectList({startkey: 'system.user.', endkey: 'system.user.\u9999'}, {checked: true}, (err, arr) => {
            if (err) error = err;
            users = {};

            if (arr) {
                for (let i = 0; i < arr.rows.length; i++) {
                    // cannot use here Object.assign, because required deep copy
                    users[arr.rows[i].value._id] = JSON.parse(JSON.stringify(defaultAcl));
                }
            }
            users[SYSTEM_ADMIN_USER] = users[SYSTEM_ADMIN_USER] || JSON.parse(JSON.stringify(defaultAcl));
            users[SYSTEM_ADMIN_USER].acl = getDefaultAdminRights(users[SYSTEM_ADMIN_USER].acl);

            for (let g = 0; g < groups.length; g++) {
                if (!groups[g] || !groups[g].common || !groups[g].common.members) continue;
                for (let m = 0; m < groups[g].common.members.length; m++) {
                    const u = groups[g].common.members[m];
                    if (!users[u]) {
                        error = error || 'Unknown user in group "' + g + '": ' + u;
                        continue;
                    }
                    users[u].groups.push(groups[g]._id);

                    if (groups[g].common.acl && groups[g].common.acl.file) {
                        if (!users[u].acl || !users[u].acl.file) {
                            users[u].acl      = users[u].acl || {};
                            users[u].acl.file = users[u].acl.file || {};

                            users[u].acl.file.create    = groups[g].common.acl.file.create;
                            users[u].acl.file.read      = groups[g].common.acl.file.read;
                            users[u].acl.file.write     = groups[g].common.acl.file.write;
                            users[u].acl.file['delete'] = groups[g].common.acl.file['delete'];
                            users[u].acl.file.list      = groups[g].common.acl.file.list;
                        } else {
                            users[u].acl.file.create    = users[u].acl.file.create    || groups[g].common.acl.file.create;
                            users[u].acl.file.read      = users[u].acl.file.read      || groups[g].common.acl.file.read;
                            users[u].acl.file.write     = users[u].acl.file.write     || groups[g].common.acl.file.write;
                            users[u].acl.file['delete'] = users[u].acl.file['delete'] || groups[g].common.acl.file['delete'];
                            users[u].acl.file.list      = users[u].acl.file.list      || groups[g].common.acl.file.list;
                        }
                    }

                    if (groups[g].common.acl && groups[g].common.acl.object) {
                        if (!users[u].acl || !users[u].acl.object) {
                            users[u].acl        = users[u].acl || {};
                            users[u].acl.object = users[u].acl.object || {};

                            users[u].acl.object.create    = groups[g].common.acl.object.create;
                            users[u].acl.object.read      = groups[g].common.acl.object.read;
                            users[u].acl.object.write     = groups[g].common.acl.object.write;
                            users[u].acl.object['delete'] = groups[g].common.acl.object['delete'];
                            users[u].acl.object.list      = groups[g].common.acl.object.list;
                        } else {
                            users[u].acl.object.create    = users[u].acl.object.create    || groups[g].common.acl.object.create;
                            users[u].acl.object.read      = users[u].acl.object.read      || groups[g].common.acl.object.read;
                            users[u].acl.object.write     = users[u].acl.object.write     || groups[g].common.acl.object.write;
                            users[u].acl.object['delete'] = users[u].acl.object['delete'] || groups[g].common.acl.object['delete'];
                            users[u].acl.object.list      = users[u].acl.object.list      || groups[g].common.acl.object.list;
                        }
                    }

                    if (groups[g].common.acl && groups[g].common.acl.users) {
                        if (!users[u].acl || !users[u].acl.users) {
                            users[u].acl       = users[u].acl || {};
                            users[u].acl.users = users[u].acl.users || {};

                            users[u].acl.users.create    = groups[g].common.acl.users.create;
                            users[u].acl.users.read      = groups[g].common.acl.users.read;
                            users[u].acl.users.write     = groups[g].common.acl.users.write;
                            users[u].acl.users['delete'] = groups[g].common.acl.users['delete'];
                            users[u].acl.users.list      = groups[g].common.acl.users.list;

                        } else {
                            users[u].acl.users.create    = users[u].acl.users.create    || groups[g].common.acl.users.create;
                            users[u].acl.users.read      = users[u].acl.users.read      || groups[g].common.acl.users.read;
                            users[u].acl.users.write     = users[u].acl.users.write     || groups[g].common.acl.users.write;
                            users[u].acl.users['delete'] = users[u].acl.users['delete'] || groups[g].common.acl.users['delete'];
                            users[u].acl.users.list      = users[u].acl.users.list      || groups[g].common.acl.users.list;
                        }
                    }

                    if (groups[g].common.acl && groups[g].common.acl.state) {
                        if (!users[u].acl || !users[u].acl.state) {
                            users[u].acl       = users[u].acl || {};
                            users[u].acl.state = users[u].acl.state || {};

                            users[u].acl.state.create    = groups[g].common.acl.state.create;
                            users[u].acl.state.read      = groups[g].common.acl.state.read;
                            users[u].acl.state.write     = groups[g].common.acl.state.write;
                            users[u].acl.state['delete'] = groups[g].common.acl.state['delete'];
                            users[u].acl.state.list      = groups[g].common.acl.state.list;

                        } else {
                            users[u].acl.state.create    = users[u].acl.state.create    || groups[g].common.acl.state.create;
                            users[u].acl.state.read      = users[u].acl.state.read      || groups[g].common.acl.state.read;
                            users[u].acl.state.write     = users[u].acl.state.write     || groups[g].common.acl.state.write;
                            users[u].acl.state['delete'] = users[u].acl.state['delete'] || groups[g].common.acl.state['delete'];
                            users[u].acl.state.list      = users[u].acl.state.list      || groups[g].common.acl.state.list;
                        }
                    }
                }
            }

            callback(
                error,
                user,
                users[user] ? users[user].groups : [],
                users[user] ? users[user].acl : JSON.parse(JSON.stringify(defaultAcl.acl))
            );
        });
    });
}

function sanitizePath(id, name, callback) {
    if (name[0] === '/') name = name.substring(1);

    if (!id) {
        if (typeof callback === 'function') {
            callback('Empty ID');
        }
        return;
    }

    if (id) {
        id = id.replace(/[\]\[*,;'"`<>\\?\/]/g, ''); // remove all invalid characters from states plus slashes
    }

    if (name.includes('..')) {
        name = path.normalize('/' + name);
        name = name.replace(/\\/g, '/');
    }
    if (name.includes('..')) {
        // Also after normalization we still have .. in it - should not happen if normalize worked correctly
        name = name.replace(/\.\./g, '');
        name = path.normalize('/' + name);
        name = name.replace(/\\/g, '/');
    }
    if (name[0] === '/') name = name.substring(1); // do not allow absolute paths

    return {id: id, name: name};
}

function checkObject(obj, options, flag) {
    // read rights of object
    if (!obj || !obj.common || !obj.acl || flag === ACCESS_LIST) {
        return true;
    }

    if (options.user === SYSTEM_ADMIN_USER) {
        return true;
    }

    // checkObject always called after checkObjectRights and admin is checked there
    if (obj.acl.owner !== options.user) {
        // Check if the user is in the group
        if (options.groups.includes(obj.acl.ownerGroup) || options.groups.includes(SYSTEM_ADMIN_GROUP)) {
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

function checkObjectRights(objects, id, object, options, flag, callback) {
    options = options || {};

    if (!options.user) {
        // Before files converted, lets think: if no options it is admin
        options = {
            user:    SYSTEM_ADMIN_USER,
            params:  options,
            group:   SYSTEM_ADMIN_GROUP,
            groups:  [SYSTEM_ADMIN_GROUP],
            acl:     getDefaultAdminRights()
        };
    }

    if (!options.acl) {
        return objects.getUserGroup(options.user, (_user, groups, acl) => {
            options.acl    = acl || {};
            options.groups = groups;
            options.group  = groups ? groups[0] : null;
            checkObjectRights(objects, id, object, options, flag, callback);
        });
    }

    // now options are filled and we can go
    if (options.user === SYSTEM_ADMIN_USER || options.group === SYSTEM_ADMIN_GROUP || (options.groups && options.groups.includes(SYSTEM_ADMIN_GROUP))) {
        return callback(null, options);
    }

    // if user or group objects
    if (regUser.test(id) || regGroup.test(id)) {
        // If user may write
        if (flag === ACCESS_WRITE && !options.acl.users.write) {// write
            return callback(ERROR_PERMISSION, options);
        }

        // If user may read
        if (flag === ACCESS_READ && !options.acl.users.read) {// read
            return callback(ERROR_PERMISSION, options);
        }

        // If user may delete
        if (flag === ACCESS_DELETE && !options.acl.users.delete) {// delete
            return callback(ERROR_PERMISSION, options);
        }

        // If user may list
        if (flag === ACCESS_LIST && !options.acl.users.list) {// list
            return callback(ERROR_PERMISSION, options);
        }

        // If user may create
        if (flag === ACCESS_CREATE && !options.acl.users.create) {// create
            return callback(ERROR_PERMISSION, options);
        }

        if (flag === ACCESS_DELETE) flag = ACCESS_WRITE; // write
    }

    // If user may write
    if (flag === ACCESS_WRITE && !options.acl.object.write) {// write
        return callback(ERROR_PERMISSION, options);
    }

    // If user may read
    if (flag === ACCESS_READ && !options.acl.object.read) {// read
        return callback(ERROR_PERMISSION, options);
    }

    // If user may delete
    if (flag === ACCESS_DELETE && !options.acl.object.delete) {// delete
        return callback(ERROR_PERMISSION, options);
    }

    // If user may list
    if (flag === ACCESS_LIST && !options.acl.object.list) {// list
        return callback(ERROR_PERMISSION, options);
    }

    if (flag === ACCESS_DELETE) flag = ACCESS_WRITE; // write

    if (id && !checkObject(object, options, flag)) {
        callback(ERROR_PERMISSION, options);
    } else {
        callback(null, options);
    }
}

function getLogger(log) {
    if (!log) {
        log = {
            silly: function (_msg) {/*console.log(msg);*/},
            debug: function (_msg) {/*console.log(msg);*/},
            info:  function (_msg) {/*console.log(msg);*/},
            warn:  function (msg) {
                console.log(msg);
            },
            error: function (msg) {
                console.log(msg);
            }
        };
    } else if (!log.silly) {
        log.silly = log.debug;
    }
    return log;
}

// For objects
const defaultAcl = {
    groups: [],
    acl: {
        file: {
            list:     false,
            read:     false,
            write:    false,
            create:   false,
            'delete': false
        },
        object: {
            list:     false,
            read:     false,
            write:    false,
            create:   false,
            'delete': false
        },
        state: {
            list:     false,
            read:     false,
            write:    false,
            create:   false,
            'delete': false
        },
        users: {
            list:     false,
            read:     false,
            write:    false,
            create:   false,
            'delete': false
        }
    }
};

module.exports = {
    getMimeType,
    insert,
    checkFileRights,
    checkFile,
    getUserGroup,
    sanitizePath,
    checkObject,
    checkObjectRights,
    getLogger,

    regCheckId,

    ERRORS: {
        ERROR_PERMISSION,
        ERROR_NOT_FOUND,
        ERROR_DB_CLOSED
    },
    CONSTS: {
        SYSTEM_ADMIN_USER,
        SYSTEM_ADMIN_GROUP,

        ACCESS_EVERY_EXEC,
        ACCESS_EVERY_WRITE,
        ACCESS_EVERY_READ,
        ACCESS_EVERY_RW,
        ACCESS_EVERY_ALL,

        ACCESS_GROUP_EXEC,
        ACCESS_GROUP_WRITE,
        ACCESS_GROUP_READ,
        ACCESS_GROUP_RW,
        ACCESS_GROUP_ALL,

        ACCESS_USER_EXEC,
        ACCESS_USER_WRITE,
        ACCESS_USER_READ,
        ACCESS_USER_RW,
        ACCESS_USER_ALL,

        ACCESS_WRITE,
        ACCESS_READ,
        ACCESS_LIST,
        ACCESS_DELETE,
        ACCESS_CREATE
    }
};