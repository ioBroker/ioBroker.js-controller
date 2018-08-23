const stream      = require('stream');
const Writable    = stream.Writable;
let   memStore    = {};
const util        = require('util');
const path        = require('path');

const regUser     = /^system\.user/;
const regGroup    = /^system\.group/;
const regCheckId  = /[*?\[\]]|\$%\$/;

const SYSTEM_ADMIN_USER  = 'system.user.admin';
const SYSTEM_ADMIN_GROUP = 'system.group.administrator';

const PERMISSION_ERROR   = 'permissionError';

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
    '.gzip':    {type: 'application/gzip',          binary: true},
};

function getMimeType(ext) {
    if (ext instanceof Array) ext = ext[0];
    ext = ext.toLowerCase();
    let _mimeType = 'text/javascript';
    let isBinary  = false;

    if (mimeTypes[ext]) {
        _mimeType = mimeTypes[ext].type;
        isBinary = mimeTypes[ext].binary;
    } else {
        _mimeType = 'text/javascript';
    }

    return {mimeType: _mimeType, isBinary: isBinary};
}

/* Writable memory stream */
function WMStrm(key, options) {
    // allow use without new operator
    if (!(this instanceof WMStrm)) return new WMStrm(key, options);

    Writable.call(this, options); // init super
    this.key = key; // save key
    memStore[key] = new Buffer(''); // empty
}
util.inherits(WMStrm, Writable);

WMStrm.prototype._write = function (chunk, enc, cb) {
    if (chunk) {
        // our memory store stores things in buffers
        let buffer = (Buffer.isBuffer(chunk)) ?
            chunk :  // already is Buffer use it
            new Buffer(chunk, enc);  // string, convert

        // concatenate to the buffer already there
        if (!memStore[this.key]) {
            memStore[this.key] = new Buffer('');
            console.log('memstore for ' + this.key + ' is null');
        }
        memStore[this.key] = Buffer.concat([memStore[this.key], buffer]);
    }
    if (!cb) throw 'Callback is empty';
    cb();
};

function insert(objects, id, attName, ignore, options, obj, callback) {
    if (typeof options === 'string') {
        options = {mimeType: options};
    }

    // return pipe for write into redis
    let strm = new WMStrm(id + '/' + attName);
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
        fileOptions.mimeType = fileOptions;
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

    if (options.checked) {
        return callback(null, options);
    }

    if (!options.acl) {
        objects.getUserGroup(options.user, function (user, groups, acl) {
            options.acl    = acl || {};
            options.groups = groups;
            options.group  = groups ? groups[0] : null;
            checkFileRights(id, name, options, flag, callback);
        });
        return;
    }
    // If user may write
    if (flag === 2 && !options.acl.file.write) {// write
        return callback(PERMISSION_ERROR, options);
    }
    // If user may read
    if (flag === 4 && !options.acl.file.read) {// read
        return callback(PERMISSION_ERROR, options);
    }

    options.checked = true;
    objects.checkFile(id, name, options, flag, (err, opt) => {
        if (err) {
            return callback(PERMISSION_ERROR, opt);
        } else {
            return callback(null, options);
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
     return callback(PERMISSION_ERROR, options);
     }
     } else {
     // everybody
     if (!(fileOptions[id][name].acl.permissions & flag)) {
     return callback(PERMISSION_ERROR, options);
     }
     }
     } else {
     // Check user rights
     if (!(fileOptions[id][name].acl.permissions & (flag << 8))) {
     return callback(PERMISSION_ERROR, options);
     }
     }
     }
     return callback(null, options);*/
}

function getUserGroup(objects, user, callback) {
    if (!user || typeof user !== 'string' || !user.match(/^system\.user\./)) {
        console.log('invalid user name: ' + user);
        user = JSON.stringify(user);
        // deep copy
        return callback.call(this, user, [], JSON.parse(JSON.stringify(objects.defaultAcl.acl)));
    }
    if (objects.users[user]) {
        return callback.call(this, user, objects.users[user].groups, objects.users[user].acl);
    }

    let error;
    // Read all groups
    objects.getObjectList({startkey: 'system.group.', endkey: 'system.group.\u9999'}, {checked: true}, (err, arr) => {
        if (err) error = err;
        objects.groups = [];
        if (arr) {
            // Read all groups
            for (let g = 0; g < arr.rows.length; g++) {
                objects.groups[g] = arr.rows[g].value;
                if (objects.groups[g]._id === SYSTEM_ADMIN_GROUP) {
                    objects.groups[g].common.acl = {
                        file: {
                            list:     true,
                            read:     true,
                            write:    true,
                            create:   true,
                            'delete': true
                        },
                        object: {
                            list:     true,
                            read:     true,
                            write:    true,
                            create:   true,
                            'delete': true
                        },
                        users: {
                            list:     true,
                            read:     true,
                            write:    true,
                            create:   true,
                            'delete': true
                        }
                    };
                }
            }
        }

        objects.getObjectList({startkey: 'system.user.', endkey: 'system.user.\u9999'}, {checked: true}, (err, arr) => {
            if (err) error = err;
            objects.users = {};

            if (arr) {
                for (let i = 0; i < arr.rows.length; i++) {
                    // cannot use here Object.assign, becasue required deep copy
                    objects.users[arr.rows[i].value._id] = JSON.parse(JSON.stringify(objects.defaultAcl));
                    if (arr.rows[i].value._id === SYSTEM_ADMIN_USER) {
                        objects.users[SYSTEM_ADMIN_USER].acl.file = {
                            list:     true,
                            read:     true,
                            write:    true,
                            create:   true,
                            'delete': true
                        };
                        objects.users[SYSTEM_ADMIN_USER].acl.object = {
                            create:   true,
                            list:     true,
                            read:     true,
                            write:    true,
                            'delete': true
                        };
                        objects.users[SYSTEM_ADMIN_USER].acl.users = {
                            create:   true,
                            list:     true,
                            read:     true,
                            write:    true,
                            'delete': true
                        };
                    }
                }
            }

            for (let g = 0; g < objects.groups.length; g++) {
                if (!objects.groups[g] || !objects.groups[g].common || !objects.groups[g].common.members) continue;
                for (let m = 0; m < objects.groups[g].common.members.length; m++) {
                    let u = objects.groups[g].common.members[m];
                    if (!objects.users[u]) {
                        error = error || 'Unknown user in group "' + g + '": ' + u;
                        continue;
                    }
                    objects.users[u].groups.push(objects.groups[g]._id);

                    if (objects.groups[g].common.acl && objects.groups[g].common.acl.file) {
                        if (!objects.users[u].acl || !objects.users[u].acl.file) {
                            objects.users[u].acl      = objects.users[u].acl || {};
                            objects.users[u].acl.file = objects.users[u].acl.file || {};

                            objects.users[u].acl.file.create    = objects.groups[g].common.acl.file.create;
                            objects.users[u].acl.file.read      = objects.groups[g].common.acl.file.read;
                            objects.users[u].acl.file.write     = objects.groups[g].common.acl.file.write;
                            objects.users[u].acl.file['delete'] = objects.groups[g].common.acl.file['delete'];
                            objects.users[u].acl.file.list      = objects.groups[g].common.acl.file.list;
                        } else {
                            objects.users[u].acl.file.create    = objects.users[u].acl.file.create    || objects.groups[g].common.acl.file.create;
                            objects.users[u].acl.file.read      = objects.users[u].acl.file.read      || objects.groups[g].common.acl.file.read;
                            objects.users[u].acl.file.write     = objects.users[u].acl.file.write     || objects.groups[g].common.acl.file.write;
                            objects.users[u].acl.file['delete'] = objects.users[u].acl.file['delete'] || objects.groups[g].common.acl.file['delete'];
                            objects.users[u].acl.file.list      = objects.users[u].acl.file.list      || objects.groups[g].common.acl.file.list;
                        }
                    }

                    if (objects.groups[g].common.acl && objects.groups[g].common.acl.object) {
                        if (!objects.users[u].acl || !objects.users[u].acl.object) {
                            objects.users[u].acl        = objects.users[u].acl || {};
                            objects.users[u].acl.object = objects.users[u].acl.object || {};

                            objects.users[u].acl.object.create    = objects.groups[g].common.acl.object.create;
                            objects.users[u].acl.object.read      = objects.groups[g].common.acl.object.read;
                            objects.users[u].acl.object.write     = objects.groups[g].common.acl.object.write;
                            objects.users[u].acl.object['delete'] = objects.groups[g].common.acl.object['delete'];
                            objects.users[u].acl.object.list      = objects.groups[g].common.acl.object.list;
                        } else {
                            objects.users[u].acl.object.create    = objects.users[u].acl.object.create    || objects.groups[g].common.acl.object.create;
                            objects.users[u].acl.object.read      = objects.users[u].acl.object.read      || objects.groups[g].common.acl.object.read;
                            objects.users[u].acl.object.write     = objects.users[u].acl.object.write     || objects.groups[g].common.acl.object.write;
                            objects.users[u].acl.object['delete'] = objects.users[u].acl.object['delete'] || objects.groups[g].common.acl.object['delete'];
                            objects.users[u].acl.object.list      = objects.users[u].acl.object.list      || objects.groups[g].common.acl.object.list;
                        }
                    }

                    if (objects.groups[g].common.acl && objects.groups[g].common.acl.users) {
                        if (!objects.users[u].acl || !objects.users[u].acl.users) {
                            objects.users[u].acl       = objects.users[u].acl || {};
                            objects.users[u].acl.users = objects.users[u].acl.users || {};

                            objects.users[u].acl.users.create    = objects.groups[g].common.acl.users.create;
                            objects.users[u].acl.users.read      = objects.groups[g].common.acl.users.read;
                            objects.users[u].acl.users.write     = objects.groups[g].common.acl.users.write;
                            objects.users[u].acl.users['delete'] = objects.groups[g].common.acl.users['delete'];
                            objects.users[u].acl.users.list      = objects.groups[g].common.acl.users.list;

                        } else {
                            objects.users[u].acl.users.create    = objects.users[u].acl.users.create    || objects.groups[g].common.acl.users.create;
                            objects.users[u].acl.users.read      = objects.users[u].acl.users.read      || objects.groups[g].common.acl.users.read;
                            objects.users[u].acl.users.write     = objects.users[u].acl.users.write     || objects.groups[g].common.acl.users.write;
                            objects.users[u].acl.users['delete'] = objects.users[u].acl.users['delete'] || objects.groups[g].common.acl.users['delete'];
                            objects.users[u].acl.users.list      = objects.users[u].acl.users.list      || objects.groups[g].common.acl.users.list;
                        }
                    }
                }
            }

            callback(
                error,
                user,
                objects.users[user] ? objects.users[user].groups : [],
                objects.users[user] ? objects.users[user].acl : JSON.parse(JSON.stringify(objects.defaultAcl.acl))
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
        id = id.replace(/\.\./g, ''); // do not allow to write in parent directories
    }

    if (name.indexOf('..') !== -1) {
        name = path.normalize(name);
        name = name.replace(/\//g, '/');
    }
    if (name[0] === '/') name = name.substring(1); // do not allow absolute paths

    return {id: id, name: name};
}

function checkObject(obj, options, flag) {
    // read rights of object
    if (!obj || !obj.common || !obj.acl || flag === ACCESS_LIST) {
        return true;
    }

    // checkObject always called after checkObjectRights and admin is checked there
    if (obj.acl.owner !== options.user) {
        // Check if the user is in the group
        if (options.groups.indexOf(obj.acl.ownerGroup) !== -1) {
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
            acl: {
                object: {
                    read:       true,
                    write:      true,
                    'delete':   true,
                    create:     true,
                    list:       true
                },
                file: {
                    read:       true,
                    write:      true,
                    'delete':   true,
                    create:     true,
                    list:       true
                },
                /*                    state: {
                 read: true,
                 write: true,
                 'delete': true,
                 create: true,
                 list: true
                 },*/
                users:  {
                    read:       true,
                    write:      true,
                    create:     true,
                    'delete':   true,
                    list:       true
                }
            }
        };
    }

    if (!options.acl) {
        return objects.getUserGroup(options.user, (user, groups, acl) => {
            options.acl    = acl || {};
            options.groups = groups;
            options.group  = groups ? groups[0] : null;
            checkObjectRights(objects, id, options, flag, callback);
        });
    }

    // now options are filled and we can go
    if (options.user === SYSTEM_ADMIN_USER || options.group === SYSTEM_ADMIN_GROUP || (options.groups && options.groups.indexOf(SYSTEM_ADMIN_GROUP) !== -1)) {
        return callback(null, options);
    }

    // if user or group objects
    if (regUser.test(id) || regGroup.test(id)) {
        // If user may write
        if (flag === ACCESS_WRITE && !options.acl.users.write) {// write
            return callback(PERMISSION_ERROR, options);
        }

        // If user may read
        if (flag === ACCESS_READ && !options.acl.users.read) {// read
            return callback(PERMISSION_ERROR, options);
        }

        // If user may delete
        if (flag === ACCESS_DELETE && !options.acl.users.delete) {// delete
            return callback(PERMISSION_ERROR, options);
        }

        // If user may list
        if (flag === ACCESS_LIST && !options.acl.users.list) {// list
            return callback(PERMISSION_ERROR, options);
        }

        // If user may create
        if (flag === ACCESS_CREATE && !options.acl.users.create) {// create
            return callback(PERMISSION_ERROR, options);
        }

        if (flag === ACCESS_DELETE) flag = ACCESS_WRITE; // write
    }

    // If user may write
    if (flag === ACCESS_WRITE && !options.acl.object.write) {// write
        return callback(PERMISSION_ERROR, options);
    }

    // If user may read
    if (flag === ACCESS_READ && !options.acl.object.read) {// read
        return callback(PERMISSION_ERROR, options);
    }

    // If user may delete
    if (flag === ACCESS_DELETE && !options.acl.object.delete) {// delete
        return callback(PERMISSION_ERROR, options);
    }

    // If user may list
    if (flag === ACCESS_LIST && !options.acl.object.list) {// list
        return callback(PERMISSION_ERROR, options);
    }

    if (flag === ACCESS_DELETE) flag = ACCESS_WRITE; // write

    if (id && !checkObject(object, options, flag)) {
        callback(PERMISSION_ERROR, options);
    } else {
        callback(null, options);
    }
}

function getLogger(log) {
    if (!log) {
        log = {
            silly: function (msg) {/*console.log(msg);*/},
            debug: function (msg) {/*console.log(msg);*/},
            info:  function (msg) {/*console.log(msg);*/},
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
    defaultAcl,

    consts: {
        SYSTEM_ADMIN_USER,
        SYSTEM_ADMIN_GROUP,
        PERMISSION_ERROR,
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
