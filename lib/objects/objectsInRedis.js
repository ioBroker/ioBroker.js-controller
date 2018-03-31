/**
 *      Object DB in REDIS - Client
 *
 *      Copyright 2014-2018 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */
/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
/* jshint -W061 */
'use strict';

const extend      = require('node.extend');
const tools       = require(__dirname + '/../tools');
const redis       = require('redis');
const stream      = require('stream');
const util        = require('util');
const Writable    = stream.Writable;
let   memStore    = {};

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

function ObjectsInRedis(settings) {
    settings = settings || {};
    const redisNamespace  = (settings.redisNamespace || 'config') + '.';
    const ioRegExp        = new RegExp('^' + redisNamespace);
    const onChange        = settings.change; // on change handler
    const redisNamespaceL = redisNamespace.length;

    let client;
    let sub;
    let that                = this;
    let users               = {};
    let groups              = {};
    let fileOptions         = {};
    let preserveSettings    = [];
    let regUser             = /^system\.user/;
    let regGroup            = /^system\.group/;
    let defaultAcl          = {
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
    let defaultNewAcl       = settings.defaultNewAcl || null;

    let log = settings.logger;
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

    // -------------- FILE FUNCTIONS -------------------------------------------
    function checkFile(id, name, options, flag) {
        // read file settings from redis
        
        if (typeof fileOptions[id][name].acl !== 'object') {
            fileOptions[id][name] = {
                mimeType: fileOptions[id][name],
                acl: {
                    owner:       (defaultNewAcl && defaultNewAcl.owner)      || 'system.user.admin',
                    ownerGroup:  (defaultNewAcl && defaultNewAcl.ownerGroup) || 'system.group.administrator',
                    permissions: (defaultNewAcl && defaultNewAcl.file)       || 0x644 // '0644'
                }
            };
        }

        // Set default owner group
        fileOptions[id][name].acl.ownerGroup  = fileOptions[id][name].acl.ownerGroup  || (defaultNewAcl && defaultNewAcl.ownerGroup) || 'system.group.administrator';
        fileOptions[id][name].acl.owner       = fileOptions[id][name].acl.owner       || (defaultNewAcl && defaultNewAcl.owner)      || 'system.user.admin';
        fileOptions[id][name].acl.permissions = fileOptions[id][name].acl.permissions || (defaultNewAcl && defaultNewAcl.file)       || 0x644; // '0644'

        if (options.user !== 'system.user.admin' &&
            options.groups.indexOf('system.group.administrator') === -1 &&
            fileOptions[id][name].acl) {
            if (fileOptions[id][name].acl.owner !== options.user) {
                // Check if the user is in the group
                if (options.groups.indexOf(fileOptions[id][name].acl.ownerGroup) !== -1) {
                    // Check group rights
                    if (!(fileOptions[id][name].acl.permissions & (flag << 4))) {
                        return false;
                    }
                } else {
                    // everybody
                    if (!(fileOptions[id][name].acl.permissions & flag)) {
                        return false;
                    }
                }
            } else {
                // Check user rights
                if (!(fileOptions[id][name].acl.permissions & (flag << 8))) {
                    return false;
                }
            }
        }
        return true;
    }

    function checkFileRights(id, name, options, flag, callback) {
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
            that.getUserGroup(options.user, function (user, groups, acl) {
                options.acl    = acl || {};
                options.groups = groups;
                options.group  = groups ? groups[0] : null;
                checkFileRights(id, name, options, flag, callback);
            });
            return;
        }
        // If user may write
        if (flag === 2 && !options.acl.file.write) {// write
            return callback('permissionError', options);
        }
        // If user may read
        if (flag === 4 && !options.acl.file.read) {// read
            return callback('permissionError', options);
        }

        // read rights of file
        if (!fileOptions[id]) {
            // Redis actually does not support the file rights for users
            /*if (fs.existsSync(objectsDir + id + '/_data.json')) {
                try {
                    fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json', 'utf8'));
                } catch (e) {
                    log.error('Cannot parse ' + objectsDir + id + '/_data.json: ' + e);
                }
            } else*/ {
                fileOptions[id] = {};
            }
        }

        options.checked = true;
        if (!name || !fileOptions[id] || !fileOptions[id][name]) {
            return callback(null, options);
        }
        if (checkFile(id, name, options,flag)) {
            return callback(null, options);
        } else {
            return callback('permissionError', options);
        }

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
         return callback('permissionError', options);
         }
         } else {
         // everybody
         if (!(fileOptions[id][name].acl.permissions & flag)) {
         return callback('permissionError', options);
         }
         }
         } else {
         // Check user rights
         if (!(fileOptions[id][name].acl.permissions & (flag << 8))) {
         return callback('permissionError', options);
         }
         }
         }
         return callback(null, options);*/
    }

    function setDefaultAcl(callback) {
        try {
            defaultNewAcl = Object.assign({}, objects['system.config'].common.defaultNewAcl);
        } catch (e) {
            defaultNewAcl = {
                owner: 'system.user.admin',
                ownerGroup: 'system.group.administrator',
                object: 0x664,
                state: 0x664,
                file: 0x664
            };
            objects['system.config'].common.defaultNewAcl = Object.assign({}, defaultNewAcl);
        }

        let count = 0;
        // Set all objects without ACL to this one
        // todo
        /*
        for (let id in objects) {
            if (objects.hasOwnProperty(id) && objects[id] && !objects[id].acl) {
                objects[id].acl = Object.assign({}, defaultNewAcl);
                delete objects[id].acl.file;
                if (objects[id].type !== 'state') {
                    delete objects[id].acl.state;
                }

                count++;
            }
        }
        */
        if (typeof callback === 'function') callback(null, count);
    }

    this.getUserGroup = function (user, callback) {
        if (!user || typeof user !== 'string' || !user.match(/^system\.user\./)) {
            console.log('invalid user name: ' + user);
            user = JSON.stringify(user);
            return callback.call(that, user, [], Object.assign({}, defaultAcl.acl));
        }
        if (users[user]) {
            return callback.call(that, user, users[user].groups, users[user].acl);
        }

        // Read all groups
        this.getObjectList({startkey: 'system.group.', endkey: 'system.group.\u9999'}, {checked: true}, function (err, arr) {
            if (err) log.error(err);
            groups = [];
            if (arr) {
                // Read all groups
                for (let g = 0; g < arr.rows.length; g++) {
                    groups[g] = arr.rows[g].value;
                    if (groups[g]._id === 'system.group.administrator') {
                        groups[g].common.acl = {
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

            that.getObjectList({startkey: 'system.user.', endkey: 'system.user.\u9999'}, {checked: true}, function (err, arr) {
                if (err) log.error(err);
                users = {};

                if (arr) {
                    for (let i = 0; i < arr.rows.length; i++) {
                        users[arr.rows[i].value._id] = Object.assign({}, defaultAcl);
                        if (arr.rows[i].value._id === 'system.user.admin') {
                            users['system.user.admin'].acl.file = {
                                list:     true,
                                read:     true,
                                write:    true,
                                create:   true,
                                'delete': true
                            };
                            users['system.user.admin'].acl.object = {
                                create:   true,
                                list:     true,
                                read:     true,
                                write:    true,
                                'delete': true
                            };
                            users['system.user.admin'].acl.users = {
                                create:   true,
                                list:     true,
                                read:     true,
                                write:    true,
                                'delete': true
                            };
                        }
                    }
                }

                for (let g = 0; g < groups.length; g++) {
                    if (!groups[g].common.members) continue;
                    for (let m = 0; m < groups[g].common.members.length; m++) {
                        let u = groups[g].common.members[m];
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
                    }
                }

                callback.call(that, user, users[user] ? users[user].groups : [], users[user] ? users[user].acl : Object.assign({}, defaultAcl.acl));
            });
        });
    };

    this.getMimeType = function (ext) {
        if (ext instanceof Array) ext = ext[0];
        let _mimeType = 'text/javascript';
        let isBinary  = false;

        if (ext === '.css') {
            _mimeType = 'text/css';
        } else if (ext === '.bmp') {
            _mimeType = 'image/bmp';
            isBinary = true;
        } else if (ext === '.png') {
            isBinary = true;
            _mimeType = 'image/png';
        } else if (ext === '.jpg') {
            isBinary = true;
            _mimeType = 'image/jpeg';
        } else if (ext === '.jpeg') {
            isBinary = true;
            _mimeType = 'image/jpeg';
        } else if (ext === '.gif') {
            isBinary = true;
            _mimeType = 'image/gif';
        } else if (ext === '.tif') {
            isBinary = true;
            _mimeType = 'image/tiff';
        } else if (ext === '.js') {
            _mimeType = 'application/javascript';
        } else if (ext === '.html') {
            _mimeType = 'text/html';
        } else if (ext === '.htm') {
            _mimeType = 'text/html';
        } else if (ext === '.json') {
            _mimeType = 'application/json';
        } else if (ext === '.xml') {
            _mimeType = 'text/xml';
        } else if (ext === '.svg') {
            _mimeType = 'image/svg+xml';
        } else if (ext === '.eot') {
            isBinary = true;
            _mimeType = 'application/vnd.ms-fontobject';
        } else if (ext === '.ttf') {
            isBinary = true;
            _mimeType = 'application/font-sfnt';
        } else if (ext === '.cur') {
            isBinary = true;
            _mimeType = 'application/x-win-bitmap';
        } else if (ext === '.woff') {
            isBinary = true;
            _mimeType = 'application/font-woff';
        } else if (ext === '.wav') {
            isBinary = true;
            _mimeType = 'audio/wav';
        } else if (ext === '.mp3') {
            isBinary = true;
            _mimeType = 'audio/mpeg3';
        } else if (ext === '.avi') {
            isBinary = true;
            _mimeType = 'video/avi';
        } else if (ext === '.mp4') {
            isBinary = true;
            _mimeType = 'video/mp4';
        } else if (ext === '.mkv') {
            isBinary = true;
            _mimeType = 'video/mkv';
        } else if (ext === '.zip') {
            isBinary = true;
            _mimeType = 'application/zip';
        } else if (ext === '.ogg') {
            isBinary = true;
            _mimeType = 'audio/ogg';
        } else if (ext === '.manifest') {
            _mimeType = 'text/cache-manifest';
        } else {
            _mimeType = 'text/javascript';
        }

        return {mimeType: _mimeType, isBinary: isBinary};
    };

    this.insert = function (id, attName, ignore, options, obj, callback) {
        if (typeof options === 'string') {
            options = {mimeType: options};
        }

        //return pipe for write into redis
        let strm = new WMStrm(id + '/' + attName);
        strm.on('finish', function () {
            if (!memStore[id + '/' + attName]) log.error('File ' + id + ' / ' +  attName + ' is empty');
            that.writeFile(id, attName, memStore[id + '/' + attName] || '', options, function () {
                if (memStore[id + '/' + attName] !== undefined) delete memStore[id + '/' + attName];
                if (callback) setImmediate(callback, null, null);
            });
        });
        return strm;
    };

    this.writeFile = function (id, name, data, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof options === 'string') {
            options = {mimeType: options};
        }

        if (name[0] === '/') name = name.substring(1);

        // If file yet exists => check the permissions
        if (!options || !options.checked) {
            return checkFileRights(id, name, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return that.writeFile(id, name, data, options, callback);
                }
            });
        }

        let isBinary;
        let ext         = name.match(/\.[^.]+$/);
        let mime        = that.getMimeType(ext);
        let _mimeType   = mime.mimeType;
        isBinary        = mime.isBinary;

        if (!fileOptions[id][name]) {
            fileOptions[id][name] = {createdAt: (new Date()).getTime()};
        }
        if (!fileOptions[id][name].acl) {
            fileOptions[id][name].acl = {
                owner:       options.user  || (defaultNewAcl && defaultNewAcl.owner)      || 'system.user.admin',
                ownerGroup:  options.group || (defaultNewAcl && defaultNewAcl.ownerGroup) || 'system.group.administrator',
                permissions: options.mode  || (defaultNewAcl && defaultNewAcl.file)       || 0x644
            };
        }

        fileOptions[id][name].mimeType       = options.mimeType || _mimeType;
        fileOptions[id][name].binary         = isBinary;
        fileOptions[id][name].acl.ownerGroup = fileOptions[id][name].acl.ownerGroup || (defaultNewAcl && defaultNewAcl.ownerGroup) || 'system.group.administrator';
        fileOptions[id][name].modifiedAt     = (new Date()).getTime();

        states.getConfig(id, function (err, _obj) {
            if (_obj) {
                _obj._attachments = _obj._attachments || {};
                if (!_obj._attachments[name]) {
                    _obj._attachments[name] = fileOptions[id][name];
                }
                states.setConfig(id, _obj, function () {
                    states.setBinaryState('_files/' + id + '/' + name, data, callback);
                });
            } else {
                states.setBinaryState('_files/' + id + '/' + name, data, callback);
            }
        });
    };

    this.readFile = function (id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }

        if (name[0] === '/') name = name.substring(1);

        if (!options || !options.checked) {
            checkFileRights(id, name, options, 0x4/*read*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return that.readFile(id, name, options, callback);
                }
            });
            return;
        }

        states.getConfig(id, function (err, _obj) {
            states.getBinaryState('_files/' + id + '/' + name, function (err, buffer) {
                if (typeof callback === 'function') {
                    let mimeType;
                    if (_obj && _obj._attachments && _obj._attachments.mimeType) {
                        mimeType = _obj._attachments.mimeType;
                        if (!_obj._attachments.binary) {
                            buffer = buffer.toString();
                        }
                    } else {
                        let ext  = name.match(/\.[^.]+$/);
                        let mime = that.getMimeType(ext);
                        mimeType = mime.mimeType;
                    }

                    callback(err, buffer, mimeType);
                }
            });
        });
    };

    this.unlink = function (id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }

        if (name[0] === '/') name = name.substring(1);

        if (!options || !options.checked) {
            checkFileRights(id, name, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    if (!options.acl.file['delete']) {
                        if (typeof callback === 'function') callback('permissionError');
                    } else {
                        return that.unlink(id, name, options, callback);
                    }
                }
            });
            return;
        }
        
        states.getConfig(id, function (err, _obj) {
            if (_obj && _obj._attachments) {
                if (_obj._attachments[name]) {
                    delete _obj._attachments[name];
                }
                states.setConfig(id, _obj);
            }
            states.delBinaryState('_files/' + id + '/' + name, callback);
        });
    };

    this.readDir = function (id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkFileRights(id, name, options, 0x4/*read*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    if (!options.acl.file.list) {
                        if (typeof callback === 'function') callback('permissionError');
                    } else {
                        return that.readDir(id, name, options, callback);
                    }
                }
            });
            return;
        }

        // TODO

        if (typeof callback === 'function') {
            setImmediate(function () {
                callback('not implemented');
            });
        }
    };

    this.rename = function (id, oldName, newName, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (oldName[0] === '/') oldName = oldName.substring(1);
        if (newName[0] === '/') newName = newName.substring(1);

        if (!options || !options.checked) {
            checkFileRights(id, oldName, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    if (!options.acl.file.write) {
                        if (typeof callback === 'function') callback('permissionError');
                    } else {
                        return that.rename(id, oldName, newName, options, callback);
                    }
                }
            });
            return;
        }

        // TODO
        if (typeof callback === 'function') callback('not implemented');
    };

    this.touch = function (id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkFileRights(id, null, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return that.touch(id, name, options, callback);
                }
            });
            return;
        }

        // TODO
        if (typeof callback === 'function') callback('not implemented');
    };

    this.rm = function (id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkFileRights(id, null, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    if (!options.acl.file['delete']) {
                        if (typeof callback === 'function') callback('permissionError');
                    } else {
                        return that.rm(id, name, options, callback);
                    }
                }
            });
            return;
        }
        // TODO
        if (typeof callback === 'function') callback('not implemented');
    };

    this.mkdir = function (id, dirname, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (dirname[0] === '/') dirname = dirname.substring(1);

        if (!options || !options.checked) {
            checkFileRights(id, dirname, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    if (!options.acl.file.write) {
                        if (typeof callback === 'function') callback('permissionError');
                    } else {
                        return that.mkdir(id, dirname, options, callback);
                    }
                }
            });
            return;
        }
        // TODO
        if (typeof callback === 'function') callback('not implemented');
    };

    this.chownFile = function (id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};
        if (typeof options !== 'object') {
            options = {owner: options};
        }

        if (name[0] === '/') name = name.substring(1);

        if (!options.ownerGroup && options.group) options.ownerGroup = options.group;
        if (!options.owner      && options.user)  options.owner      = options.user;

        if (!options.owner) {
            log.error('user is not defined');
            if (typeof callback === 'function') callback('invalid parameter');
            return;
        }

        if (!options.ownerGroup) {
            // get user group
            this.getUserGroup(options.owner, function (user, groups /* , permissions */) {
                if (!groups || !groups[0]) {
                    if (typeof callback === 'function') callback('user "' + options.owner + '" belongs to no group');
                    return;
                } else {
                    options.ownerGroup = groups[0];
                }
                that.chownFile(id, name, options, callback);
            });
            return;
        }

        if (!options.checked) {
            checkFileRights(id, null, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    if (!options.acl.file.write) {
                        if (typeof callback === 'function') callback('permissionError');
                    } else {
                        return that.chownFile(id, name, options, callback);
                    }
                }
            });
            return;
        }

        // TODO
        if (typeof callback === 'function') callback('not implemented');
    };

    this.chmodFile = function (id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};

        if (name[0] === '/') name = name.substring(1);

        if (typeof options !== 'object') {
            options = {mode: options};
        }

        if (options.mode === undefined) {
            log.error('mode is not defined');
            if (typeof callback === 'function') callback('invalid parameter');
            return;
        } else if (typeof options.mode === 'string') {
            options.mode = parseInt(options.mode, 16);
        }

        if (!options.checked) {
            checkFileRights(id, null, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    if (!options.acl.file.write) {
                        if (typeof callback === 'function') callback('permissionError');
                    } else {
                        return that.chmodFile(id, name, options, callback);
                    }
                }
            });
            return;
        }

        // TODO
        if (typeof callback === 'function') callback('not implemented');
    };

    this.enableFileCache = function (enabled, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkObjectRights(options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.enableFileCache(enabled, options, callback);
                }
            }.bind(this));
            return;
        }

        if (typeof callback === 'function') {
            // cache cannot be enabled
            setImmediate(function () {
                callback(null, false);
            });
        }
    };

    // -------------- OBJECT FUNCTIONS -------------------------------------------
    function checkObject(obj, options, flag) {
        // read rights of object
        if (!obj || !obj.common || !obj.acl || flag === 'list') {
            return true;
        }

        if (options.user !== 'system.user.admin' &&
            options.groups && options.groups.indexOf('system.group.administrator') === -1) {
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
        }
        return true;
    }

    function checkObjectRights(options, flag, callback) {
        options = options || {};
        if (!options.user) {
            // Before files converted, lets think: if no options it is admin
            options = {
                user:    'system.user.admin',
                params:  options,
                group:   'system.group.administrator',
                acl: {
                    object: {
                        read: true,
                        write: true,
                        'delete': true,
                        create: true,
                        list: true
                    },
                    file: {
                        read: true,
                        write: true,
                        'delete': true,
                        create: true,
                        list: true
                    },
                    /*                    state: {
                     read: true,
                     write: true,
                     'delete': true,
                     create: true,
                     list: true
                     },*/
                    users:  {
                        read: true,
                        write: true,
                        create: true,
                        'delete': true,
                        list: true
                    }
                }
            };
        }

        if (options.checked) {
            return callback(null, options);
        }

        if (!options.acl) {
            that.getUserGroup(options.user, function (user, groups, acl) {
                options.acl    = acl || {};
                options.groups = groups;
                options.group  = groups ? groups[0] : null;
                checkObjectRights(options, flag, callback);
            });
            return;
        }

        // if user or group objects
        if (regUser.test(id) || regGroup.test(id)) {
            // If user may write
            if (flag === 2 && !options.acl.users.write) {// write
                return callback('permissionError', options);
            }

            // If user may read
            if (flag === 4 && !options.acl.users.read) {// read
                return callback('permissionError', options);
            }

            // If user may delete
            if (flag === 'delete' && !options.acl.users.delete) {// delete
                return callback('permissionError', options);
            }

            // If user may list
            if (flag === 'list' && !options.acl.users.list) {// list
                return callback('permissionError', options);
            }

            // If user may create
            if (flag === 'create' && !options.acl.users.create) {// create
                return callback('permissionError', options);
            }

            if (flag === 'delete') flag = 2; // write
        }

        // If user may write
        if (flag === 2 && !options.acl.object.write) {// write
            return callback('permissionError', options);
        }

        // If user may read
        if (flag === 4 && !options.acl.object.read) {// read
            return callback('permissionError', options);
        }

        // If user may delete
        if (flag === 'delete' && !options.acl.object.delete) {// delete
            return callback('permissionError', options);
        }

        // If user may list
        if (flag === 'list' && !options.acl.object.list) {// list
            return callback('permissionError', options);
        }

        if (flag === 'delete') flag = 2; // write

        options.checked = true;

        return callback(null, options);
    }
    
    function clone(obj) {
        if (obj === null || obj === undefined || typeof obj !== 'object')
            return obj;

        let temp = obj.constructor(); // changed

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                temp[key] = clone(obj[key]);
            }
        }
        return temp;
    }

    this.subscribe = (pattern, options, callback) => {
        if (!options || !options.checked) {
            checkObjectRights(options, 'list', (err, options) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.subscribe(pattern, options, callback);
                }
            });
            return;
        }

        log.silly(settings.namespace + ' redis psubscribe ' + redisNamespace + pattern);
        sub.psubscribe(redisNamespace + pattern, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.unsubscribe = (pattern, options, callback) => {
        if (!options || !options.checked) {
            checkObjectRights(options, 'list', (err, options) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.unsubscribe(pattern, options, callback);
                }
            });
            return;
        }

        log.silly(settings.namespace + ' redis punsubscribe ' + redisNamespace + pattern);
        sub.punsubscribe(redisNamespace + pattern, function (err) {
            if (typeof callback === 'function') callback(err);
        });
    };

    this.chownObject = function (pattern, options, callback) {
        options = options || {};
        if (typeof options !== 'object') {
            options = {owner: options};
        }

        // renaming
        if (!options.ownerGroup && options.group) options.ownerGroup = options.group;
        if (!options.owner      && options.user)  options.owner      = options.user;

        if (!options.owner) {
            log.error('user is not defined');
            if (typeof callback === 'function') callback('invalid parameter');
            return;
        }

        if (!options.ownerGroup) {
            // get user group
            this.getUserGroup(options.owner, (user, groups /* , permissions */) => {
                if (!groups || !groups[0]) {
                    if (typeof callback === 'function') callback('user "' + options.owner + '" belongs to no group');
                    return;
                } else {
                    options.ownerGroup = groups[0];
                }
                this.chownObject(pattern, options, callback);
            });
            return;
        }

        if (!options.checked) {
            checkObjectRights(options, 0x2/*write*/, (err, options) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    if (!options.acl.object || !options.acl.object.write) {
                        if (typeof callback === 'function') callback('permissionError');
                    } else {
                        return this.chownObject(pattern, options, callback);
                    }
                }
            });
        }

        // TODO
    };

    this.chmodObject = function (pattern, options, callback) {
        options = options || {};

        if (typeof options !== 'object') {
            options = {object: options};
        }

        if (options.mode && !options.object) options.object = options.mode;

        if (options.object === undefined) {
            log.error('mode is not defined');
            if (typeof callback === 'function') callback('invalid parameter');
            return;
        } else if (typeof options.mode === 'string') {
            options.mode = parseInt(options.mode, 16);
        }

        if (!options.checked) {
            checkObjectRights(options, 0x2/*write*/, (err, options) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    if (!options.acl.file.write) {
                        if (typeof callback === 'function') callback('permissionError');
                    } else {
                        return that.chmodObject(pattern, options, callback);
                    }
                }
            });
        }
        
        // TODO
    };

    this.getObject = function (id, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(options, 0x4/*read*/, (err, options) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.getObject(id, options, callback);
                }
            });
            return;
        }

        if (typeof callback === 'function') {
            client.get(redisNamespace + id, function (err, obj) {
                if (err) {
                    log.warn(settings.namespace + ' redis get ' + id + ', error - ' + err);
                } else {
                    log.silly(settings.namespace + ' redis get ' + id + ' ok: ' + obj);
                }
                try {
                    obj = obj ? JSON.parse(obj) : null;
                } catch (e) {
                    log.error(`Cannot parse ${id} - ${obj}: ${JSON.stringify(e)}`);
                }
                callback(err, obj ? JSON.parse(obj) : null);
            });
        }
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

    this.getKeys = function (pattern, options, callback, dontModify) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkObjectRights(options, 'list', (err, options) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.getConfigKeys(pattern, options, callback, dontModify);
                }
            });
            return;
        }

        let r = new RegExp(pattern2RegEx(pattern));
        client.keys(redisNamespace + pattern, (err, keys) => {
            log.silly(settings.namespace + ' redis keys ' + obj.length + ' ' + pattern);
            if (typeof callback === 'function') {
                let result = [];
                if (keys) {
                    keys.sort();
                    if (options.user === 'system.user.admin' || options.group === 'system.group.administrator') {
                        setImmediate(function () {
                            callback(err, keys);
                        });
                    } else {
                        let result = [];
                        // Check permissions
                        client.mget(keys, function (err, objs) {
                            for (let i = 0; i < keys.length; i++) {
                                if (r.test(keys[i]) && checkObject(objs[i], options, 0x4/*read*/)) {
                                    if (!dontModify) {
                                        result.push(keys[i].substring(redisNamespaceL));
                                    } else {
                                        result.push(keys[i]);
                                    }
                                }
                            }
                            setImmediate(function () {
                                callback(err, result);
                            });
                        })
                    }
                } else {
                    setImmediate(function () {
                        callback(err, result);
                    });
                }
            }
        });
    };
    this.getConfigKeys = this.getKeys;

    this.getObjects = function (keys, options, callback, dontModify) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkObjectRights(options, 0x4/*read*/, (err, options) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.getObjects(keys, options, callback, dontModify);
                }
            });
            return;
        }

        if (!keys) {
            if (typeof callback === 'function') callback('no keys', null);
            return;
        }
        if (!keys.length) {
            if (typeof callback === 'function') callback(null, []);
            return;
        }

        let _keys;
        if (!dontModify) {
            _keys = [];
            for (let i = 0; i < keys.length; i++) {
                _keys[i] = redisNamespace + keys[i];
            }
        } else {
            _keys = keys;
        }
        client.mget(_keys, function (err, objs) {
            let result = [];
            if (err) {
                log.warn(settings.namespace + ' redis mget ' + ((!objs) ? 0 :  objs.length) + ' ' + _keys.length + ', err: ' + err);
            } else {
                log.silly(settings.namespace + ' redis mget ' + ((!objs) ? 0 : objs.length) + ' ' + _keys.length);
            }
            if (objs) {
                if (options.user !== 'system.user.admin' && options.group !== 'system.group.administrator') {
                    for (let i = 0; i < objs.length; i++) {
                        if (checkObject(objs[i], options, 4 /*read*/)) {
                            result.push(objs[i]);
                        } else {
                            result.push({error: 'permissionError'});
                        }
                    }
                } else {
                    result = objs;
                }
            }
            if (typeof callback === 'function') {
                setImmediate(function () {
                    callback(null, result);
                });
            }
        });
    };

    this.getObjectsByPattern = (pattern, options, callback) => {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkObjectRights(options, 0x4/*read*/, (err, options) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.getObjectsByPattern(keys, options, callback);
                }
            });
            return;
        }
        client.keys(redisNamespace + pattern, (err, keys) => {
            log.silly(settings.namespace + ' redis keys ' + obj.length + ' ' + pattern);
            if (typeof callback === 'function') {
                let result = [];
                if (keys) {
                    keys.sort();
                    // read objects
                    client.mget(keys, function (err, objs) {
                        let result = [];
                        if (err) {
                            log.warn(settings.namespace + ' redis mget ' + ((!objs) ? 0 :  objs.length) + ' ' + keys.length + ', err: ' + err);
                        } else {
                            log.silly(settings.namespace + ' redis mget ' + ((!objs) ? 0 : objs.length) + ' ' + keys.length);
                        }
                        if (objs) {
                            if (options.user !== 'system.user.admin' && options.group !== 'system.group.administrator') {
                                const r = new RegExp(pattern2RegEx(pattern));
                                for (let i = 0; i < objs.length; i++) {
                                    if (!objs[i] || (r.test(objs[i]._id) && checkObject(objs[i], options, 4 /*read*/))) {
                                        result.push(objs[i]);
                                    } else {
                                        result.push({error: 'permissionError'});
                                    }
                                }
                            } else {
                                result = objs;
                            }
                        }
                        if (typeof callback === 'function') {
                            setImmediate(function () {
                                callback(null, result);
                            });
                        }
                    });
                } else {
                    setImmediate(function () {
                        callback(err, result);
                    });
                }
            }
        });
    };

    /**
     * set anew or update object
     *
     * This function writes the object into DB
     *
     * @alias setObject
     * @memberof objectsInMemServer
     * @param {string} id ID of the object
     * @param {object} obj
     * @param {object} options options for access control are optional
     * @param {function} callback return function
     */
    this.setObject = function (id, obj, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.setObject(id, obj, options, callback);
                }
            }.bind(this));
            return;
        }

        if (!obj) {
            log.error('setObject: Argument object is null');
            if (typeof callback === 'function') callback('obj is null');
            return;
        }

        obj._id = id;

        // read object
        client.get(redisNamespace + id, (err, oldObj) => {
            if (err) {
                log.warn(settings.namespace + ' redis get ' + id + ', error - ' + err);
            } else {
                log.silly(settings.namespace + ' redis get ' + id + ' ok: ' + oldObj);
            }
            try {
                oldObj = oldObj ? JSON.parse(oldObj) : null;
            } catch (e) {
                log.error(`Cannot parse ${id} - ${oldObj}: ${JSON.stringify(e)}`);
            }

            if (!checkObject(oldObj, options, 0x2/*write*/)) {
                if (typeof callback === 'function') {
                    callback({error: 'permissionError'});
                }
                return;
            }

            if (id === 'system.config' && obj && obj.common && oldObj && oldObj.common && JSON.stringify(obj.common.defaultNewAcl) !== JSON.stringify(oldObj.common.defaultNewAcl)) {
                oldObj = obj;
                return setDefaultAcl(function () {
                    that.setObject(id, obj, options, callback);
                });
            }

            if (!tools.checkNonEditable(oldObj, obj)) {
                if (typeof callback === 'function') {
                    callback('Invalid password for update of vendor information');
                }
                return;
            }

            // do not delete common settings, like "history" or "mobile". It can be erased only with "null"
            if (oldObj && oldObj.common) {
                for (let i = 0; i < preserveSettings.length; i++) {
                    // remove settings if desired
                    if (obj.common && obj.common[preserveSettings[i]] === null) {
                        delete obj.common[preserveSettings[i]];
                        continue;
                    }

                    if (oldObj.common[preserveSettings[i]] !== undefined && (!obj.common || obj.common[preserveSettings[i]] === undefined)) {
                        if (!obj.common) obj.common = {};
                        obj.common[preserveSettings[i]] = oldObj.common[preserveSettings[i]];
                    }
                }
            }

            if (oldObj && oldObj.acl && !obj.acl) {
                obj.acl = oldObj.acl;
            }

            // add user default rights
            if (defaultNewAcl && !obj.acl) {
                obj.acl = Object.assign({}, defaultNewAcl);
                delete obj.acl.file;
                if (obj.type !== 'state') {
                    delete obj.acl.state;
                }
                if (options.owner) {
                    obj.acl.owner = options.owner;

                    if (!options.ownerGroup) {
                        obj.acl.ownerGroup = null;
                        this.getUserGroup(options.owner, (user, groups /* , permissions */) => {
                            if (!groups || !groups[0]) {
                                options.ownerGroup = (defaultNewAcl && defaultNewAcl.ownerGroup) || 'system.group.administrator';
                            } else {
                                options.ownerGroup = groups[0];
                            }
                            this.setObject(id, obj, options, callback);
                        });
                        return;
                    }
                }
            }
            if (defaultNewAcl && obj.acl && !obj.acl.ownerGroup && options.ownerGroup) {
                obj.acl.ownerGroup = options.ownerGroup;
            }
            const jsonObj = JSON.stringify(obj);
            client.set(redisNamespace + id, jsonObj, function (err) {
                log.silly(settings.namespace + ' redis set', id, obj);
                client.publish(redisNamespace + id, jsonObj);
                if (typeof callback === 'function') {
                    callback(err, {id: id});
                }
            })
        });
    };

    this.delObject = function (id, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(options, 'delete', (err, options) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.delObject(id, options, callback);
                }
            });
            return;
        }
        // read object
        client.get(redisNamespace + id, (err, oldObj) => {
            if (err) {
                log.warn(settings.namespace + ' redis get ' + id + ', error - ' + err);
            } else {
                log.silly(settings.namespace + ' redis get ' + id + ' ok: ' + oldObj);
            }
            try {
                oldObj = oldObj ? JSON.parse(oldObj) : null;
            } catch (e) {
                log.error(`Cannot parse ${id} - ${oldObj}: ${JSON.stringify(e)}`);
            }

            if (!checkObject(oldObj, options, 2/* write */)) {
                if (typeof callback === 'function') {
                    callback({error: 'permissionError'});
                }
                return;
            }
            client.del(redisNamespace + id, function (err) {
                client.publish(redisNamespace + id, null);
                if (typeof callback === 'function') callback(err);
            });
        });
    };
    // this function is very ineffective. Because reads all objects and then process them
    function _applyView(func, params, options, callback) {
        let result = {
            rows: []
        };

        function _emit_(id, obj) {
            result.rows.push({id: id, value: obj});
        }
        params = params || {startkey: '', endkey: '\u9999'};
        client.keys(redisNamespace + '*', (err, keys) => {
            keys.sort();
            client.mget(keys, (err, objs) => {
                let f = eval('(' + func.map.replace(/emit/g, '_emit_') + ')');

                for (let i = 0; i < keys.length; i++) {
                    const id = keys[i];
                    if (params) {
                        if (params.startkey && id < params.startkey) continue;
                        if (params.endkey   && id > params.endkey)   continue;
                    }
                    if (objects[id]) {
                        try {
                            f(objects[id]);
                        } catch (e) {
                            console.log('Cannot execute map: ' + e.message);

                        }
                    }
                }
                // Calculate max
                if (func.reduce === '_stats') {
                    let max = null;
                    for (let i = 0; i < result.rows.length; i++) {
                        if (max === null || result.rows[i].value > max) {
                            max = result.rows[i].value;
                        }
                    }
                    if (max !== null) {
                        result.rows = [{id: '_stats', value: {max: max}}];
                    } else {
                        result.rows = [];
                    }
                }

                if (typeof callback === 'function') callback(null, result);
            });
        });
    }

    this.getObjectView = function (design, search, params, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(options, 4/*read*/, (err, options) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.getObjectView(design, search, params, options, callback);
                }
            });
            return;
        }
        if (typeof callback === 'function') {
            client.get(redisNamespace + '_design/' + design, (err, obj) => {
                if (err) {
                    console.error('Cannot find view "' + design + '": ' + err);
                }
                if (obj && obj.views && obj.views[search]) {
                    this.getObjectList(params, options, (err, _result) => {
                        const func = obj.views[search];
                        let f = eval('(' + func.map.replace(/emit/g, '_emit_') + ')');
                        let result = {rows: []};

                        // required for getObjectView
                        function _emit_(id, obj) {
                            result.rows.push({id: id, value: obj});
                        }

                        for (let i = 0; i < _result.rows.length; i++) {
                            const id  = _result.rows[i].id;
                            const obj = _result.rows[i].value;
                            if (obj) {
                                try {
                                    f(obj);
                                } catch (e) {
                                    console.log('Cannot execute map: ' + e.message);
                                }
                            }
                        }
                        // Calculate max
                        if (func.reduce === '_stats') {
                            let max = null;
                            for (let i = 0; i < result.rows.length; i++) {
                                if (max === null || result.rows[i].value > max) {
                                    max = result.rows[i].value;
                                }
                            }
                            if (max !== null) {
                                result.rows = [{id: '_stats', value: {max: max}}];
                            } else {
                                result.rows = [];
                            }
                        }

                        callback(null, result);
                    });
                } else {
                    console.log('Cannot find view "' + design + '"');
                    callback('Cannot find view "' + design + '"');
                }
            });
        }
    };

    this.getObjectList = function (params, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(options, 4/*read*/, (err, options) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.getObjectList(params, options, callback);
                }
            });
            return;
        }

        if (typeof callback === 'function') {
            //params = {startkey, endkey, include_docs}
            params = params || {startkey: '', endkey: '\u9999'};
            let pattern = (params.endkey.substring(0, params.startkey.length) === params.startkey) ? redisNamespace + params.startkey + '*' : redisNamespace + '*';
            client.keys(pattern, (err, keys) => {
                let _keys = [];
                for (let i = 0; i < keys.length; i++) {
                    if (params.startkey && keys[i] < params.startkey) continue;
                    if (params.endkey && keys[i] > params.endkey) continue;
                    if (!params.include_docs && keys[i][redisNamespaceL] === '_') continue;
                    _keys.push(keys[i]);
                }
                keys.sort();
                client.mget(_keys, function (err, objs) {
                    // return rows with id and doc
                    let result = {
                        rows: []
                    };
                    for (let r = 0; r < objs.length; r++) {
                        let obj = JSON.parse(objs[r]);
                        if (!checkObject(obj, options, 4/*read*/)) continue;
                        result.rows.push({id: keys[r], value: obj, doc: obj});
                    }
                    callback(null, result);
                });
            });
        }
    };

    this.getObjectListAsync = (params, options) => {
        return new Promise((resolve, reject) => {
            this.getObjectList(params, options, (err, arr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(arr);
                }
            })
        });
    };

    // could be optimised, to read object only once. Now it will read 3 times
    this.extendObject = function (id, obj, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(options, 2/*write*/, (err, options) => {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.extendObject(id, obj, options, callback);
                }
            });
            return;
        }

        this.getObject(id, options, function (err, data) {
            let newObj = extend(true, data || {}, obj);
            that.setObject(id, newObj, options, function (err, res) {
                if (typeof callback === 'function') callback(err, {id: id, value: res}, id);
            });
        });
    };

    this.setConfig = this.setObject;

    this.delConfig = this.delObject;

    this.getConfig = this.getObject;

    this.getConfigs = this.getObjects;

    this.findObject = function (idOrName, type, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(options, 'list', function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.findObject(idOrName, type, options, callback);
                }
            }.bind(this));
            return;
        }

        if (!objects) {
            if (typeof callback === 'function') callback('Not implemented');
            return;
        }

        // Assume it is ID
        if (objects[idOrName] && (!type || (objects[idOrName].common && objects[idOrName].common.type === type))) {
            if (typeof callback === 'function') callback(null, idOrName, objects[idOrName].common.name);
        } else {
            // Assume it is name
            for (let id in objects) {
                if (!checkObject(objects[id], options, 4/*read*/)) continue;
                if (objects[id].common &&
                    objects[id].common.name === idOrName &&
                    (!type || (objects[id].common && objects[id].common.type === type))) {
                    if (typeof callback === 'function') callback(null, id, idOrName);
                    return;
                }
            }
            if (typeof callback === 'function') callback(null, null, idOrName);
        }
    };

    // can be called only from js-controller
    this.addPreserveSettings = function (settings) {
        if (typeof settings !== 'object') settings = [settings];

        for (let s = 0; s < settings.length; s++) {
            if (preserveSettings.indexOf(settings[s]) === -1) preserveSettings.push(settings[s]);
        }
    };

    this.destroyDB = function (options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};

        if (!options.checked) {
            checkObjectRights(options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    if (!options.acl.file.write) {
                        if (typeof callback === 'function') callback('permissionError');
                    } else {
                        return that.destroyDB(options, callback);
                    }
                }
            });
            return;
        }

        states.getConfigKeys('*', function (err, obj) {
            for (let t = 0; t < obj.length; t++) {
                states.delConfig(obj.substring(7));
            }
            if (typeof callback === 'function') callback();
        });
    };

    // Destructor of the class. Called by shutting down.
    this.destroy = () => {
        if (client) {
            client.end(true);
            client = null;
        }
        if (sub) {
            sub.end();
            sub = null;
        }
    };

    (function __construct() {
        if (settings.connection.port === 0) {
            // initiate a unix socket connection using the parameter 'host'
            client = redis.createClient(settings.connection.host, settings.connection.options);
            sub    = redis.createClient(settings.connection.host, settings.connection.options);
        } else {
            client = redis.createClient(settings.connection.port, settings.connection.host, settings.connection.options);
            sub    = redis.createClient(settings.connection.port, settings.connection.host, settings.connection.options);
        }

        if (typeof onChange === 'function') {
            sub.on('pmessage', (pattern, channel, message) => {
                log.debug(settings.namespace + ' redis pmessage ', pattern, channel, message);
                try {
                    if (ioRegExp.test(channel)) {
                        const id = channel.substring(redisNamespaceL);
                        try {
                            const obj = message ? JSON.parse(message) : null;
                            onChange(id, obj);
                        } catch (e) {
                            log.error(`Cannot parse ${id} - ${message}: ${JSON.stringify(e)}`);
                        }
                    } else {
                        log.error(`Received unexpected pmessage: ${channel}`);
                    }
                } catch (e) {
                    log.error(settings.namespace + ' pmessage ' + channel + ' ' + message + ' ' + e.message);
                    log.error(settings.namespace + ' ' + e.stack);
                }
            });
        }

        client.on('error', error => {
            if (typeof settings.disconnected === 'function') {
                settings.disconnected(error);
            } else {
                log.error(settings.namespace + ' ' + error.message);
                log.error(settings.namespace + ' ' + error.stack);
            }
        });

        sub.on('error', error => {
            log.error(settings.namespace + ' No redis connection!');
        });

        sub.on('connect', error => {
            if (settings.connection.port === 0) {
                log.info(settings.namespace + ' Objects connected to redis: ' + settings.connection.host);
            } else {
                log.info(settings.namespace + ' Objects connected to redis: ' + settings.connection.host + ':' + settings.connection.port);
            }
        });

        client.on('connect', error => {
            if (typeof settings.connected === 'function') settings.connected();
        });
    })();
    return this;
}


module.exports = ObjectsInRedis;