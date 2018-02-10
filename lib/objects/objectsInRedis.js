/* jshint -W097 */// jshint strict:false
/*jslint node: true */
/*jshint -W061 */
'use strict';

var extend      = require('node.extend');
var StatesRedis = require(__dirname + '/../states/statesInRedis.js');

var fs       = require('fs');
var stream   = require('stream');
var util     = require('util');
var Writable = stream.Writable;
var memStore = {};

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
		var buffer = (Buffer.isBuffer(chunk)) ?
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

function ObjectsInMem(settings) {
    settings = settings || {};

    var states;
    var that                = this;
    var objects             = {};
    var users               = {};
    var groups              = {};
    var fileOptions         = {};
    var preserveSettings    = [];
    var regUser             = /^system\.user/;
    var regGroup            = /^system\.group/;
    var defaultAcl          = {
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
    var defaultNewAcl       = settings.defaultNewAcl || null;

    var log = settings.logger;
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
        // read file setings from redis
        
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
            // ERROR: objectsDir not found!
            if (fs.existsSync(objectsDir + id + '/_data.json')) {
                try {
                    fileOptions[id] = JSON.parse(fs.readFileSync(objectsDir + id + '/_data.json', 'utf8'));
                } catch (e) {
                    log.error('Cannot parse ' + objectsDir + id + '/_data.json: ' + e);
                }
            } else {
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

        var count = 0;
        // Set all objects without ACL to this one
        // todo
        /*
        for (var id in objects) {
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
                for (var g = 0; g < arr.rows.length; g++) {
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
                    for (var i = 0; i < arr.rows.length; i++) {
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

                for (var g = 0; g < groups.length; g++) {
                    if (!groups[g].common.members) continue;
                    for (var m = 0; m < groups[g].common.members.length; m++) {
                        var u = groups[g].common.members[m];
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
        var _mimeType = 'text/javascript';
        var isBinary  = false;

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
        var strm = new WMStrm(id + '/' + attName);
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
        
        states.getConfig(id, function (err, _obj) {
            if (_obj) {
                _obj._attachments = _obj._attachments || {};
                if (!_obj._attachments[name]) {
                    // ERROR: mimeType not found
                    _obj._attachments[name] = mimeType;
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
                if (typeof callback === 'function') callback(err, buffer, (_obj && _obj._attachments) ? _obj._attachments[name] || 'text/html': 'text/html');
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
            checkObjectRights(null, options, 0x2/*write*/, function (err, options) {
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
    function checkObject(id, options, flag) {
        // read rights of object
        if (!objects[id] || !objects[id].common || !objects[id].acl || flag === 'list') {
            return true;
        }

        if (options.user !== 'system.user.admin' &&
            options.groups && options.groups.indexOf('system.group.administrator') === -1) {
            if (objects[id].acl.owner !== options.user) {
                // Check if the user is in the group
                if (options.groups.indexOf(objects[id].acl.ownerGroup) !== -1) {
                    // Check group rights
                    if (!(objects[id].acl.object & (flag << 4))) {
                        return false;
                    }
                } else {
                    // everybody
                    if (!(objects[id].acl.object & flag)) {
                        return false;
                    }
                }
            } else {
                // Check group rights
                if (!(objects[id].acl.object & (flag << 8))) {
                    return false;
                }
            }
        }
        return true;
    }

    function checkObjectRights(id, options, flag, callback) {
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
                checkObjectRights(id, options, flag, callback);
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

        if (id && !checkObject(id, options, flag)) {
            return callback('permissionError', options);
        }

        return callback(null, options);
    }
    
    function clone(obj) {
        if (obj === null || obj === undefined || typeof obj !== 'object')
            return obj;

        var temp = obj.constructor(); // changed

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                temp[key] = clone(obj[key]);
            }
        }
        return temp;
    }

    this.subscribeConfig = function (pattern, options, callback) {
        if (!options || !options.checked) {
            var socket = this;
            checkObjectRights(null, options, 'list', function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return that.subscribeConfig.call(socket, pattern, options, callback);
                }
            }.bind(this));
            return;
        }

        if (!states) {
            setTimeout(function (_pattern, _options, _callback) {
                that.subscribeConfig(_pattern, _options, _callback);
            }, 100, pattern, options, callback);
            return;
        }

        states.subscribeConfig(pattern, callback);
    };
    this.subscribe   = this.subscribeConfig;

    this.unsubscribeConfig = function (pattern, options, callback) {
        if (!options || !options.checked) {
            var socket = this;
            checkObjectRights(null, options, 'list', function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return that.unsubscribeConfig.call(socket, pattern, options, callback);
                }
            }.bind(this));
            return;
        }

        if (!states) {
            setTimeout(function (_pattern, _options, _callback) {
                that.unsubscribeConfig(_pattern, _options, _callback);
            }, 100, pattern, options, callback);
            return;
        }
        
        states.unsubscribeConfig(pattern, callback);
    };
    this.unsubscribe = this.unsubscribeConfig;

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
            this.getUserGroup(options.owner, function (user, groups /* , permissions */) {
                if (!groups || !groups[0]) {
                    if (typeof callback === 'function') callback('user "' + options.owner + '" belongs to no group');
                    return;
                } else {
                    options.ownerGroup = groups[0];
                }
                that.chownObject(pattern, options, callback);
            });
            return;
        }

        if (!options.checked) {
            checkObjectRights(null, options, 0x2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    if (!options.acl.object || !options.acl.object.write) {
                        if (typeof callback === 'function') callback('permissionError');
                    } else {
                        return that.chownObject(pattern, options, callback);
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
            checkObjectRights(null, options, 0x2/*write*/, function (err, options) {
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
            checkObjectRights(id, options, 0x4/*read*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.getObject(id, options, callback);
                }
            }.bind(this));
            return;
        }

        if (typeof callback === 'function') {
            states.getConfig(id, function (err, body) {
                if (objects) objects[id] = body;
                // Todo Error handling
                callback(err, Object.assign({}, body));
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

    this.getConfigKeys = function (pattern, options, callback, dontModify) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkObjectRights(null, options, 'list', function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.getConfigKeys(pattern, options, callback, dontModify);
                }
            }.bind(this));
            return;
        }

        var r = new RegExp(pattern2RegEx(pattern));
        var result = [];
        if (objects) {
            for (var id in objects) {
                if (!objects.hasOwnProperty(id)) continue;
                if (r.test(id) && checkObject(id, options, 'list')) {
                    result.push(id);
                }
            }
        }
        
        result.sort();
        if (typeof callback === 'function') {
            setImmediate(function () {
                callback(null, result);
            });
        }
    };

    this.getObjects = function (keys, options, callback, dontModify) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkObjectRights(null, options, 0x4/*read*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.getObjects(keys, options, callback, dontModify);
                }
            }.bind(this));
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
        // TODO
        var result = [];
        for (var i = 0; i < keys.length; i++) {
            if (checkObject(keys[i], options, 4 /*read*/)) {
                result.push(clone(objects[keys[i]]));
            } else {
                result.push({error: 'permissionError'});
            }
        }
        if (typeof callback === 'function') {
            setImmediate(function () {
                callback(null, result);
            });
        }
    };
    
    this.setObject = function (id, obj, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!options || !options.checked) {
            checkObjectRights(id, options, 0x2/*write*/, function (err, options) {
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

        // do not delete common settings, like "history" or "mobile". It can be erased only with "null"
        if (objects && objects[id] && objects[id].common) {
            for (var i = 0; i < preserveSettings.length; i++) {
                // remove settings if desired
                if (obj.common && obj.common[preserveSettings[i]] === null) {
                    delete obj.common[preserveSettings[i]];
                    continue;
                }

                if (objects[id].common[preserveSettings[i]] && (!obj.common || obj.common[preserveSettings[i]] === undefined)) {
                    if (!obj.common) obj.common = {};
                    obj.common[preserveSettings[i]] = objects[id].common[preserveSettings[i]];
                }
            }
        }

        // add user default rights
        if (defaultNewAcl && (!objects[id] || !objects[id].acl)) {
            obj.acl = Object.assign({}, defaultNewAcl);
            delete obj.acl.file;
            if (obj.type !== 'state') {
                delete obj.acl.state;
            }
            if (options.owner) {
                obj.acl.owner = options.owner;

                if (!options.ownerGroup) {
                    obj.acl.ownerGroup = null;
                    this.getUserGroup(options.owner, function (user, groups/*, permissions */) {
                        if (!groups || !groups[0]) {
                            options.ownerGroup = (defaultNewAcl && defaultNewAcl.ownerGroup) || 'system.group.administrator';
                        } else {
                            options.ownerGroup = groups[0];
                        }
                        that.setObject(id, obj, options, callback);
                    });
                    return;
                }
            }
        }
        if (defaultNewAcl && options.ownerGroup && obj.acl && !obj.acl.ownerGroup) {
            obj.acl.ownerGroup = options.ownerGroup;
        }

        if (id === 'system.config' && obj && obj.common && objects[id] && objects[id].common && JSON.stringify(obj.common.defaultNewAcl) !== JSON.stringify(objects[id].common.defaultNewAcl)) {
            objects[id] = obj;
            return setDefaultAcl(function () {
                that.extendObject(id, obj, options, callback);
            });
        }

        log.silly('objectsInRedis setObject ' + id);
        if (objects) objects[id] = clone(obj);
        states.setConfig(id, obj, callback);
    };

    this.delObject = function (id, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(id, options, 'delete', function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.delObject(id, options, callback);
                }
            }.bind(this));
            return;
        }

        states.delConfig(id, callback);
    };
    
    this._applyView = function (func, params, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(null, options, 'list', function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this._applyView(func, params, options, callback);
                }
            }.bind(this));
            return;
        }

        var result = {
            rows: []
        };

        function _emit_(id, obj) {
            result.rows.push({id: id, value: obj});
        }

        var f = eval('(' + func.map.replace(/emit/g, '_emit_') + ')');

        for (var id in objects) {
            if (!objects.hasOwnProperty(id)) continue;
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
            var max = null;
            for (var i = 0; i < result.rows.length; i++) {
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
    };

    this.getObjectView = function (design, search, params, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(null, options, 'list', function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.getObjectView(design, search, params, options, callback);
                }
            }.bind(this));
            return;
        }

        if (!objects) {
            if (that.processObjects) {
                setTimeout(function () {
                    that.getObjectView(design, search, params, options, callback);
                }, 500);
            } else {
                that.processObjects = true;
                this._getObjects(function () {
                    that.processObjects = false;
                    that.getObjectView(design, search, params, options, callback);
                });
            }
            return;
        }

        if (objects['_design/' + design]) {
            if (objects['_design/' + design].views && objects['_design/' + design].views[search]) {
                that._applyView(objects['_design/' + design].views[search], params, options, callback);
            } else {
                console.log('Cannot find search "' + search + '" in "' + design + '"');
                if (typeof callback === 'function') callback({status_code: 404, status_text: 'Cannot find search "' + search + '" in "' + design + '"'});
            }
        } else {
            states.getConfig('_design/' + design, function (err, obj) {
                if (err) {
                    console.error('Cannot find view "' + design + '": ' + err);
                }
                if (obj && obj.views && obj.views[search]) {
                    objects[obj._id] = obj;
                    // ERROR: result not found
                    that._applyView(result, obj.views[search], params, options, callback);
                } else {
                    console.log('Cannot find view "' + design + '"');
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
            checkObjectRights(null, options, 'list', function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.getObjectList(params, options, callback);
                }
            }.bind(this));
            return;
        }

        if (!objects) {
            if (that.processObjects) {
                setTimeout(function () {
                    that.getObjectList(params, options, callback);
                }, 500);
            } else {
                that.processObjects = true;
                this._getObjects(function () {
                    that.processObjects = false;
                    that.getObjectList(params, options, callback);
                });
            }
            return;
        }
        //params = {startkey, endkey, include_docs}
        // return rows with id and doc
        var result = {
            rows: []
        };

        for (var id in objects) {
            if (!checkObject(id, options, 'read')) continue;
            if (params) {
                if (params.startkey && id < params.startkey) continue;
                if (params.endkey   && id > params.endkey)   continue;
                if (!params.include_docs && id[0] === '_')    continue;
            }
            var obj = {id: id, value: clone(objects[id])};
            obj.doc = obj.value;

            if (options.sorted) {
                // insert sorted
                if (!result.rows.length) {
                    result.rows.push(obj);
                } else if (obj.id <= result.rows[0].id) {
                    result.rows.unshift(obj);
                } else if (obj.id >= result.rows[result.rows.length - 1].id) {
                    result.rows.push(obj);
                } else {
                    for (var t = 1; t < result.rows.length; t++) {
                        if (obj.id > result.rows[t - 1].id && obj.id <= result.rows[t].id) {
                            result.rows.splice(t, 0, obj);
                            break;
                        }
                    }
                }
            } else {
                result.rows.push(obj);
            }
        }
        if (typeof callback === 'function') callback(null, result);
    };

    this.extendObject = function (id, obj, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!options || !options.checked) {
            checkObjectRights(id, options, 2/*write*/, function (err, options) {
                if (err) {
                    if (typeof callback === 'function') callback(err);
                } else {
                    return this.extendObject(id, obj, options, callback);
                }
            }.bind(this));
            return;
        }

        this.getObject(id, function (err, data) {
            objects[id] = extend(true, data || {}, obj);
            objects[id]._id = id;

            // add user default rights
            if (defaultNewAcl && !objects[id].acl) {
                objects[id].acl = Object.assign({}, defaultNewAcl);
                delete objects[id].acl.file;
                if (objects[id].type !== 'state') {
                    delete objects[id].acl.state;
                }
                if (options.owner) {
                    objects[id].acl.owner = options.owner;

                    if (!options.ownerGroup) {
                        objects[id].acl.ownerGroup = null;
                        this.getUserGroup(options.owner, function (user, groups/* , permissions */) {
                            if (!groups || !groups[0]) {
                                options.ownerGroup = (defaultNewAcl && defaultNewAcl.ownerGroup) || 'system.group.administrator';
                            } else {
                                options.ownerGroup = groups[0];
                            }
                            that.extendObject(id, obj, options, callback);
                        });
                        return;
                    }
                }
            }
            if (defaultNewAcl && options.ownerGroup && objects[id].acl && !objects[id].acl.ownerGroup) {
                objects[id].acl.ownerGroup = options.ownerGroup;
            }

            that.setObject(id, obj, function (err, res) {
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
            checkObjectRights(null, options, 'list', function (err, options) {
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
            for (var id in objects) {
                if (!checkObject(id, options, 4/*read*/)) continue;
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

        for (var s = 0; s < settings.length; s++) {
            if (preserveSettings.indexOf(settings[s]) === -1) preserveSettings.push(settings[s]);
        }
    };

    this._getObjects = function (callback) {
        states.getConfigKeys('*', function (err, list) {
            states.getConfigs(list, function (err, res) {
                objects = {};
                for (var i = 0; i < list.length; i++) {
                    try {
                        objects[list[i].substring(7) /*"config.".length*/] = JSON.parse(res[i]);
                    } catch (e) {
                        console.log('Cannot parse ' + list[i]);
                    }
                }

                // init default new acl
                if (objects['system.config'] && objects['system.config'].common && objects['system.config'].common.defaultNewAcl) {
                    defaultNewAcl = objects['system.config'].common.defaultNewAcl;
                }

                if (typeof callback === 'function') callback(list);
            }, true);
        }, true);
    };

    this.destroyDB = function (options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};

        if (!options.checked) {
            checkObjectRights(null, options, 0x2/*write*/, function (err, options) {
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
            for (var t = 0; t < obj.length; t++) {
                states.delConfig(obj.substring(7));
            }
            if (typeof callback === 'function') callback();
        });
    };

    // Destructor of the class. Called by shutting down.
    this.destroy = function () {
        if (states && states.destroy) states.destroy();
    };

    var __construct = (function () {
        if (!settings.redis) settings.redis = {};

        if (typeof settings.change !== 'function') settings.change = function () {};
        
        states = new StatesRedis({
            connection: settings.connection,
            change:  function (id, obj) {
                if (obj) {
                    objects[id] = obj;
                } else if (objects[id]) {
                    delete objects[id];
                }
                id = id.substring(7);
                settings.change(id, clone(obj));
            },
            connected: function () {
                if (typeof settings.connected === 'function') settings.connected('InRedisDB');
            },
            disconnected: function (error) {
                if (error) {
                    log.error('objectsInRedis: ' + error.message);
                    log.error('objectsInRedis: ' + error.stack);
                }
                if (typeof settings.disconnected === 'function') settings.disconnected();
            }
        });
    })();
}


module.exports = ObjectsInMem;