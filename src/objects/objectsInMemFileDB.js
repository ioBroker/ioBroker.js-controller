/**
 *      Object DB in memory - Server
 *
 *      Copyright 2013-2019 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
/* jshint -W061 */
'use strict';

const extend            = require('node.extend');
const fs                = require('fs');
const path              = require('path');
const mkdirp            = require('mkdirp');
const InMemoryFileDB    = require('../inMemFileDB');
const tools             = require('../tools.js');
const utils             = require('./objectsUtils');

/**
 * This class inherits InMemoryFileDB class and adds all relevant logic for objects
 * including the available methods for use by js-controller directly
 **/
class ObjectsInMemoryFileDB extends InMemoryFileDB {

    constructor(settings) {
        settings = settings || {};
        settings.fileDB = {
            fileName: 'objects.json',
            backupDirName: 'backup-objects'
        };
        super(settings);

        if (!this.change) {
            this.change = (id /*, obj */) => {
                this.log.silly(this.namespace + ' objects change: ' + id + ' ' + JSON.stringify(this.change));
            };
        }
        this.fileOptions = {};
        this.files = {};
        this.writeTimer = null;
        this.writeIds = [];
        this.preserveSettings = [];
        this.defaultNewAcl = this.settings.defaultNewAcl || null;
        this.namespace = this.settings.namespace || this.settings.hostname || '';

        this.objectsDir = path.join(this.dataDir, 'files');

        /*function prepareRights(options) {
         let fOptions = {};
         options = options || {};
         if (!options.user) {
         options = {
         user: SYSTEM_ADMIN_USER,
         params: options
         };
         }

         // acl.owner = user this creates or owns the file
         // acl.group = group, this assigned to file
         // acl.permissions = '0777' - default 1 (execute, 2 write, 4 read
         if (!options.user) {
         fOptions.acl = {
         owner:      SYSTEM_ADMIN_USER,
         ownerGroup: SYSTEM_ADMIN_GROUP,
         permissions: 0x644 // '0777'
         };
         } else {
         fOptions.acl = {
         owner: options.user
         };
         fOptions.acl.ownerGroup  = options.group;
         fOptions.acl.permissions = 0x644;
         }
         fOptions.acl.ownerGroup  = fOptions.acl.ownerGroup || SYSTEM_ADMIN_GROUP;

         return fOptions;
         }*/

        // Handle some < js-controller 2.0 broken objects and correct them
        for (const key of Object.keys(this.dataset)) {
            if (typeof this.dataset[key] === 'object' && this.dataset[key].acl && this.dataset[key].acl.permissions && !this.dataset[key].acl.object) {
                this.dataset[key].acl.object = this.dataset[key].acl.permissions;
                delete this.dataset[key].acl.permissions;
            }
        }

        // init default new acl
        if (this.dataset['system.config'] && this.dataset['system.config'].common && this.dataset['system.config'].common.defaultNewAcl) {
            this.defaultNewAcl = JSON.parse(JSON.stringify(this.dataset['system.config'].common.defaultNewAcl));
        }
    }

    normalizeFilename(name) {
        return name ? name.replace(/[\/]+/g, '/') : name;
    }

    // -------------- FILE FUNCTIONS -------------------------------------------
    saveFileSettings(id, force) {
        if (typeof id === 'boolean') {
            force = id;
            id = undefined;
        }

        if (id !== undefined && this.writeIds.indexOf(id) === -1) this.writeIds.push(id);

        if (this.writeTimer) clearTimeout(this.writeTimer);

        // if store immediately
        if (force) {
            this.writeTimer = null;
            // Store dirs description
            for (let _id = 0; _id < this.writeIds.length; _id++) {
                const location = path.join(this.objectsDir, this.writeIds[_id], '_data.json');
                try {
                    fs.writeFileSync(location, JSON.stringify(this.fileOptions[this.writeIds[_id]]));
                } catch (e) {
                    this.log.error(this.namespace + ' Cannot write files: ' + location + ': ' + e.message);
                }
            }
            this.writeIds = [];
        } else {
            this.writeTimer = setTimeout(() => {
                // Store dirs description
                for (let id = 0; id < this.writeIds.length; id++) {
                    const location = path.join(this.objectsDir, this.writeIds[id], '_data.json');
                    try {
                        fs.writeFileSync(location, JSON.stringify(this.fileOptions[this.writeIds[id]]));
                    } catch (e) {
                        this.log.error(this.namespace + ' Cannot write files: ' + location + ': ' + e.message);
                    }
                }
                this.writeIds = [];
            }, 1000);
        }
    }

    loadFileSettings(id) {
        if (!this.fileOptions[id]) {
            const location = path.join(this.objectsDir, id, '_data.json');
            if (fs.existsSync(location)) {
                try {
                    this.fileOptions[id] = JSON.parse(fs.readFileSync(location, 'utf8'));
                } catch (e) {
                    this.log.error(this.namespace + ' Cannot parse ' + location + ': ' + e);
                    this.fileOptions[id] = {};
                }
                let corrected = false;
                Object.keys(this.fileOptions[id]).forEach(filename => {
                   const normalized = this.normalizeFilename(filename);
                   if (normalized !== filename) {
                       const options = this.fileOptions[id][filename];
                       delete this.fileOptions[id][filename];
                       this.fileOptions[id][normalized] = options;
                       corrected = true;
                   }
                   if (corrected) {
                       try {
                           fs.writeFileSync(location, JSON.stringify(this.fileOptions[id]));
                       } catch (e) {
                           this.log.error(this.namespace + ' Cannot write files: ' + location + ': ' + e.message);
                       }
                   }
                });
            } else {
                this.fileOptions[id] = {};
            }
        }
    }

    checkFile(id, name, options, flag, callback) {
        this.loadFileSettings(id);

        const acl = this.fileOptions[id][name] || {};

        if (utils.checkFile(acl, options, flag, this.defaultNewAcl)) {
            return callback && callback(false, options);
        } else {
            return callback && callback(true, options);
        }
    }

    checkFileRights(id, name, options, flag, callback) {
        return utils.checkFileRights(this, id, name, options, flag, callback);
    }

    setDefaultAcl(callback) {
        try {
            // deep copy
            this.defaultNewAcl = JSON.parse(JSON.stringify(this.dataset['system.config'].common.defaultNewAcl));
        } catch (e) {
            this.defaultNewAcl = {
                owner:      utils.CONSTS.SYSTEM_ADMIN_USER,
                ownerGroup: utils.CONSTS.SYSTEM_ADMIN_GROUP,
                object:     (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_RW | utils.CONSTS.ACCESS_EVERY_READ),
                state:      (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_RW | utils.CONSTS.ACCESS_EVERY_READ),
                file:       (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_RW | utils.CONSTS.ACCESS_EVERY_READ)
            };
            this.dataset['system.config'].common.defaultNewAcl = JSON.parse(JSON.stringify(this.defaultNewAcl));
        }

        let count = 0;
        // Set all objects without ACL to this one
        for (const id in this.dataset) {
            if (this.dataset.hasOwnProperty(id) && this.dataset[id] && !this.dataset[id].acl) {
                // deep copy
                this.dataset[id].acl = JSON.parse(JSON.stringify(this.defaultNewAcl));
                delete this.dataset[id].acl.file;
                if (this.dataset[id].type !== 'state') {
                    delete this.dataset[id].acl.state;
                }

                count++;
            }
        }
        if (typeof callback === 'function') callback(null, count);
    }

    getUserGroup(user, callback) {
        return utils.getUserGroup(this, user, (error, user, userGroups, userAcl) => {
            error && this.log.error(this.namespace + ' ' + error);
            callback.call(this, user, userGroups, userAcl);
        });
    }

    insert(id, attName, ignore, options, obj, callback) {
        return utils.insert(this, id, attName, ignore, options, obj, callback);
    }

    _writeFile(id, name, data, options, callback) {
        try {
            try {
                if (!fs.existsSync(this.objectsDir)) fs.mkdirSync(this.objectsDir);
                if (!fs.existsSync(path.join(this.objectsDir, id))) fs.mkdirSync(path.join(this.objectsDir, id));
            } catch (e) {
                this.log.error(this.namespace + ' Cannot create directories: ' + path.join(this.objectsDir, id) + ': ' + e.message);
                this.log.error(this.namespace + ' Check the permissions! Or call "sudo chmod -R 774 *" in ' + tools.appName +' dir');
                typeof callback === 'function' && setImmediate(() => callback(e.message));
                return;
            }

            const ext         = path.extname(name);
            const mime        = utils.getMimeType(ext);
            const _mimeType   = mime.mimeType;
            const isBinary    = mime.isBinary;

            this.fileOptions[id][name]                = this.fileOptions[id][name] || {createdAt: Date.now()};
            this.fileOptions[id][name].acl            = this.fileOptions[id][name].acl || {
                owner:       options.user  || (this.defaultNewAcl && this.defaultNewAcl.owner)      || utils.CONSTS.SYSTEM_ADMIN_USER,
                ownerGroup:  options.group || (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                permissions: options.mode  || (this.defaultNewAcl && this.defaultNewAcl.file)       || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ)// 0x644
            };

            this.fileOptions[id][name].mimeType       = options.mimeType || _mimeType;
            this.fileOptions[id][name].binary         = isBinary;
            this.fileOptions[id][name].acl.ownerGroup = this.fileOptions[id][name].acl.ownerGroup || (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP;
            this.fileOptions[id][name].modifiedAt     = Date.now();

            if (isBinary) {
                // Reload by read
                delete this.files[id][name];
            } else {
                this.files[id][name] = data;
            }

            try {
                // Create directories if complex structure
                mkdirp.sync(path.join(this.objectsDir, id, path.dirname(name)));
                // Store file
                fs.writeFileSync(path.join(this.objectsDir, id, name), data, {'flag': 'w', 'encoding': isBinary ? 'binary' : 'utf8'});
                // Store dir description
                this.saveFileSettings(id);
            } catch (e) {
                this.log.error(this.namespace + ' Cannot write files: ' + path.join(this.objectsDir, id, name) + ': ' + e.message);
                typeof callback === 'function' && setImmediate(() => callback(e.message));
                return;
            }
            typeof callback === 'function' && setImmediate(() => callback());
        } catch (e) {
            typeof callback === 'function' && setImmediate(() => callback(e.message));
        }
    }

    writeFile(id, name, data, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof options === 'string') {
            options = {mimeType: options};
        }
        if (options && options.acl) {
            options.acl = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.writeFile(id, name, data, options, (err, res, mimeType) => {
                    if (!err) {
                        resolve({res, mimeType});
                    } else {
                        reject(err);
                    }
                });
            });
        }

        const _path = utils.sanitizePath(id, name, callback);
        if (!_path) return;
        id = _path.id;
        name = _path.name;

        try {
            this.loadFileSettings(id);

            this.files[id] = this.files[id] || {};

            // If file yet exists => check the permissions
            return this.checkFileRights(id, name, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
                if (err) {
                    typeof callback === 'function' && setImmediate(() => callback(err));
                } else {
                    return this._writeFile(id, name, data, options, callback);
                }
            });
        } catch (e) {
            typeof callback === 'function' && setImmediate(() => callback(e.message));
        }
    }

    _readFile(id, name, options, callback) {
        try {
            this.loadFileSettings(id);

            if (!this.files[id]) this.files[id] = {};

            if (!this.files[id][name] || this.settings.connection.noFileCache || options.noFileCache) {
                const location = path.join(this.objectsDir, id, name);
                if (fs.existsSync(location)) {
                    // Create description object if not exists
                    this.fileOptions[id][name] = this.fileOptions[id][name] || {
                        acl: {
                            owner:       (this.defaultNewAcl && this.defaultNewAcl.owner)            || utils.CONSTS.SYSTEM_ADMIN_USER,
                            ownerGroup:  (this.defaultNewAcl && this.defaultNewAcl.ownerGroup)       || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                            permissions: (this.defaultNewAcl && this.defaultNewAcl.file.permissions) || (utils.CONSTS.ACCESS_USER_ALL | utils.CONSTS.ACCESS_GROUP_ALL | utils.CONSTS.ACCESS_EVERY_ALL) // 777

                        }
                    };
                    if (typeof this.fileOptions[id][name] !== 'object') {
                        this.fileOptions[id][name] = {
                            mimeType:    this.fileOptions[id][name],
                            acl: {
                                owner:       (this.defaultNewAcl && this.defaultNewAcl.owner)            || utils.CONSTS.SYSTEM_ADMIN_USER,
                                ownerGroup:  (this.defaultNewAcl && this.defaultNewAcl.ownerGroup)       || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                                permissions: (this.defaultNewAcl && this.defaultNewAcl.file.permissions) || (utils.CONSTS.ACCESS_USER_ALL | utils.CONSTS.ACCESS_GROUP_ALL | utils.CONSTS.ACCESS_EVERY_ALL) // 777
                            }
                        };
                    }

                    this.files[id][name] = fs.readFileSync(location);
                    if (this.fileOptions[id][name].binary === undefined) {
                        const ext = path.extname(name);
                        const mimeType = utils.getMimeType(ext);
                        this.fileOptions[id][name].binary   = mimeType.isBinary;
                        this.fileOptions[id][name].mimeType = mimeType.mimeType;
                    }

                    if (!this.fileOptions[id][name].binary) {
                        if (this.files[id][name]) this.files[id][name] = this.files[id][name].toString();
                    }
                } else {
                    if (this.fileOptions[id][name] !== undefined) delete this.fileOptions[id][name];
                    if (this.files[id][name]       !== undefined) delete this.files[id][name];
                }
            }

            if (this.fileOptions[id][name] && !this.fileOptions[id][name].acl) {
                // all files belongs to admin by default, but everyone can edit it
                this.fileOptions[id][name].acl = {
                    owner:       (this.defaultNewAcl && this.defaultNewAcl.owner)            || utils.CONSTS.SYSTEM_ADMIN_USER,
                    ownerGroup:  (this.defaultNewAcl && this.defaultNewAcl.ownerGroup)       || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                    permissions: (this.defaultNewAcl && this.defaultNewAcl.file.permissions) || (utils.CONSTS.ACCESS_USER_ALL | utils.CONSTS.ACCESS_GROUP_ALL | utils.CONSTS.ACCESS_EVERY_RW) // 776
                };
            }

            if (typeof callback === 'function') {
                if (this.fileOptions[id][name] !== null && this.fileOptions[id][name] !== undefined) {
                    if (!this.fileOptions[id][name].mimeType) {
                        const _ext = path.extname(name);
                        const _mimeType = utils.getMimeType(_ext);
                        this.fileOptions[id][name].mimeType = _mimeType.mimeType;
                    }
                    setImmediate(() => callback(null, this.files[id][name], this.fileOptions[id][name].mimeType));
                } else {
                    setImmediate(() => callback(utils.ERRORS.ERROR_NOT_FOUND));
                }
            }
        } catch (e) {
            this.log.warn(`Cannot read file ${id} / ${name}: ${JSON.stringify(e)}`);
            typeof callback === 'function' && setImmediate(() => callback(e.message));
        }
    }

    readFile(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }

        if (!callback) {
            return new Promise((resolve, reject) => {
                this.readFile(id, name, options, (err, res, mimeType) =>{
                    if (!err) {
                        resolve({data: res, mimeType: mimeType});
                    } else {
                        reject(err);
                    }
                });
            });
        }

        const _path = utils.sanitizePath(id, name, callback);
        if (!_path) return;
        id = _path.id;
        name = _path.name;

        this.checkFileRights(id, name, options, utils.CONSTS.ACCESS_READ, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._readFile(id, name, options, callback);
            }
        });
    }

    _unlink(id, name, options, callback) {
        try {
            let changed = false;

            this.loadFileSettings(id);

            if (this.fileOptions[id][name]) {
                changed = true;
                delete this.fileOptions[id][name];
            }
            if (this.files[id] && this.files[id][name]) {
                delete this.files[id][name];
            }
            const location = path.join(this.objectsDir, id, name);
            if (fs.existsSync(location)) {
                const stat = fs.statSync(location);

                if (stat.isDirectory()) {
                    // read all entries and delete every one
                    const fdir = fs.readdirSync(location);
                    let cnt = 0;
                    for (let f = 0; f < fdir.length; f++) {
                        cnt++;
                        this.unlink(id, name + '/' + fdir[f], options, err => {
                            if (!--cnt) {
                                this.log.debug('Delete directory ' + path.join(id, name));
                                try {
                                    fs.rmdirSync(location);
                                } catch (e) {
                                    this.log.error('Cannot delete directory "' + path.join(id, name) + '": ' + e);
                                }
                                typeof callback === 'function' && setImmediate(() => callback(err));
                            }
                        });
                    }
                    if (!cnt) {
                        this.log.debug('Delete directory ' + path.join(id, name));
                        try {
                            fs.rmdirSync(location);
                        } catch (e) {
                            this.log.error('Cannot delete directory "' + path.join(id, name) + '": ' + e);
                        }
                        typeof callback === 'function' && setImmediate(() => callback());
                    }
                } else {
                    this.log.debug('Delete file ' + path.join(id, name));
                    try {
                        fs.unlinkSync(location);
                    } catch (e) {
                        this.log.error('Cannot delete file "' + path.join(id, name) + '": ' + e);
                    }
                    typeof callback === 'function' && setImmediate(() => callback());
                }
            } else {
                typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_NOT_FOUND));
            }
            // Store dir description
            if (changed) this.saveFileSettings(id);
        } catch (e) {
            typeof callback === 'function' && setImmediate(() => callback(e.message));
        }
    }
    unlink(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options  = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }
        const _path = utils.sanitizePath(id, name, callback);
        if (!_path) return;
        id   = _path.id;
        name = _path.name;

        this.checkFileRights(id, name, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                if (!options.acl.file['delete']) {
                    typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_PERMISSION));
                } else {
                    return this._unlink(id, name, options, callback);
                }
            }
        });
    }

    delFile(id, name, options, callback) {
        return this.unlink(id, name, options, callback);
    }

    _readDir(id, name, options, callback) {
        // Find all files and directories starts with name
        const _files = [];

        if (id && id === '*') id = '';
        if (name && name[name.length - 1] !== '/') name += '/';

        this.loadFileSettings(id);

        const len = (name) ? name.length : 0;
        for (const f in this.fileOptions[id]) {
            if (this.fileOptions[id].hasOwnProperty(f) && (!name || f.substring(0, len) === name)) {
                /** @type {string|string[]} */
                let rest = f.substring(len);
                rest = rest.split('/', 2);
                if (rest[0] && _files.indexOf(rest[0]) === -1) {
                    _files.push(rest[0]);
                }
            }
        }

        const location = path.join(this.objectsDir, id, name);
        if (fs.existsSync(location)) {
            try {
                const dirFiles = fs.readdirSync(location);
                for (let i = 0; i < dirFiles.length; i++) {
                    if (dirFiles[i] === '..' || dirFiles[i] === '.') continue;
                    if (dirFiles[i] !== '_data.json' && _files.indexOf(dirFiles[i]) === -1) {
                        _files.push(dirFiles[i]);
                    }
                }
            } catch (e) {
                typeof callback === 'function' && setImmediate(() => callback(e, []));
                return;
            }
        } else {
            typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_NOT_FOUND, []));
            return;
        }

        _files.sort();
        const res = [];
        for (let j = 0; j < _files.length; j++) {
            if (_files[j] === '..' || _files[j] === '.') continue;
            if (fs.existsSync(path.join(location, _files[j]))) {
                const stats = fs.statSync(path.join(location, _files[j]));
                const acl = (this.fileOptions[id][name + _files[j]] && this.fileOptions[id][name + _files[j]].acl) ?
                    JSON.parse(JSON.stringify(this.fileOptions[id][name + _files[j]].acl)) : // copy settings
                    {
                        read:        true,
                        write :      true,
                        owner:       (this.defaultNewAcl && this.defaultNewAcl.owner)            || utils.CONSTS.SYSTEM_ADMIN_USER,
                        ownerGroup:  (this.defaultNewAcl && this.defaultNewAcl.ownerGroup)       || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                        permissions: (this.defaultNewAcl && this.defaultNewAcl.file.permissions) || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ)
                    };

                try {
                    // if filter for user
                    if (options.filter && acl) {
                        // If user may not write
                        if (!options.acl.file.write) {// write
                            acl.permissions &= ~(utils.CONSTS.ACCESS_USER_WRITE | utils.CONSTS.ACCESS_GROUP_WRITE | utils.CONSTS.ACCESS_EVERY_WRITE);
                        }
                        // If user may not read
                        if (!options.acl.file.read) {// read
                            acl.permissions &= ~(utils.CONSTS.ACCESS_USER_READ | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ);
                        }

                        if (options.user !== utils.CONSTS.SYSTEM_ADMIN_USER && options.groups.includes(utils.CONSTS.SYSTEM_ADMIN_GROUP)) {
                            if (acl.owner !== options.user) {
                                // Check if the user is in the group
                                if (options.groups.includes(acl.ownerGroup)) {
                                    // Check group rights
                                    if (!(acl.permissions & utils.CONSTS.ACCESS_GROUP_RW)) {
                                        continue;
                                    }
                                    acl.read  = !!(acl.permissions & utils.CONSTS.ACCESS_GROUP_READ);
                                    acl.write = !!(acl.permissions & utils.CONSTS.ACCESS_GROUP_WRITE);
                                } else {
                                    // everybody
                                    if (!(acl.permissions & utils.CONSTS.ACCESS_EVERY_RW)) {
                                        continue;
                                    }
                                    acl.read  = !!(acl.permissions & utils.CONSTS.ACCESS_EVERY_READ);
                                    acl.write = !!(acl.permissions & utils.CONSTS.ACCESS_EVERY_WRITE);
                                }
                            } else {
                                // Check user rights
                                if (!(acl.permissions & utils.CONSTS.ACCESS_USER_RW)) {
                                    continue;
                                }
                                acl.read  = !!(acl.permissions & utils.CONSTS.ACCESS_USER_READ);
                                acl.write = !!(acl.permissions & utils.CONSTS.ACCESS_USER_WRITE);
                            }
                        } else {
                            acl.read  = true;
                            acl.write = true;
                        }
                    }
                } catch (e) {
                    this.log.error(this.namespace + ' Cannot read permssions of  ' + path.join(this.objectsDir, id, name, _files[j]) + ': ' + e);
                }

                res.push({
                    file:       _files[j],
                    stats:      stats,
                    isDir:      stats.isDirectory(),
                    acl:        acl,
                    modifiedAt: this.fileOptions[id][name + _files[j]] ? this.fileOptions[id][name + _files[j]].modifiedAt : undefined,
                    createdAt:  this.fileOptions[id][name + _files[j]] ? this.fileOptions[id][name + _files[j]].createdAt : undefined
                });
            }
        }

        typeof callback === 'function' && setImmediate(() => callback(null, res));
    }

    readDir(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }
        if ((id === '' || id === '/' || id === '*') && (name === '' || name === '*')) {
            // read root of xxx-data/files
        } else {
            const _path = utils.sanitizePath(id, name, callback);
            if (!_path) return;
            id = _path.id;
            name = _path.name;
        }

        this.checkFileRights(id, name, options, utils.CONSTS.ACCESS_READ, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                if (!options.acl.file.list) {
                    typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_PERMISSION));
                } else {
                    return this._readDir(id, name, options, callback);
                }
            }
        });
    }

    _rename(id, oldName, newName, _options, callback) {
        try {
            this.loadFileSettings(id);

            const location = path.join(this.objectsDir, id, '_data.json');
            Object.keys(this.fileOptions[id]).forEach(name => {
                const type = this.fileOptions[id][name];
                if (name.startsWith(oldName)) {
                    delete this.fileOptions[id][name];
                    this.fileOptions[id][name.replace(oldName, newName)] = type;
                }
            });
            fs.writeFileSync(location, JSON.stringify(this.fileOptions[id]));
            Object.keys(this.files[id]).forEach(name => {
                const data = this.fileOptions[id][name];
                if (name.startsWith(oldName)) {
                    delete this.files[id][name];
                    this.files[id][name.replace(oldName, newName)] = data;
                }
            });
            if (fs.existsSync(path.join(this.objectsDir, id, oldName))) {
                fs.renameSync(path.join(this.objectsDir, id, oldName), path.join(this.objectsDir, id, newName));
                typeof callback === 'function' && setImmediate(() => callback());
            } else {
                typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_NOT_FOUND));
            }
        } catch (e) {
            typeof callback === 'function' && setImmediate(() => callback(e.message));
        }
    }

    rename(id, oldName, newName, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }
        const _path = utils.sanitizePath(id, oldName, callback);
        if (!_path) return;
        id = _path.id;
        oldName = _path.name;
        if (newName[0] === '/') newName = newName.substring(1);

        this.checkFileRights(id, oldName, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                if (!options.acl.file.write) {
                    typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_PERMISSION));
                } else {
                    return this._rename(id, oldName, newName, options, callback);
                }
            }
        });
    }

    _touch(id, name, options, callback) {
        try {
            this.loadFileSettings(id);

            const regEx = new RegExp(tools.pattern2RegEx(name));
            const processed = [];
            const now = Date.now();
            let changed = false;
            for (const f in this.fileOptions[id]) {
                if (!this.fileOptions[id].hasOwnProperty(f)) continue;
                if (regEx.test(f) && utils.checkFile(this.fileOptions[id][f], options, utils.CONSTS.ACCESS_WRITE)) {
                    changed = true;
                    // Check if file exists
                    if (fs.existsSync(path.join(this.objectsDir, id, f))) {
                        if (!this.fileOptions[id][f]) {
                            this.fileOptions[id][f] = {};
                            this.fileOptions[id][f].createdAt = now;
                        }

                        if (typeof this.fileOptions[id][f] !== 'object') {
                            this.fileOptions[id][f] = {
                                mimeType: this.fileOptions[id][f]
                            };
                        }

                        if (!this.fileOptions[id][f].mimeType) {
                            const ext = path.extname(name);
                            const mimeType = utils.getMimeType(ext);
                            this.fileOptions[id][f].binary   = mimeType.isBinary;
                            this.fileOptions[id][f].mimeType = mimeType.mimeType;
                        }

                        if (!this.fileOptions[id][f].acl) {
                            this.fileOptions[id][f].acl = {
                                owner:       (this.defaultNewAcl && this.defaultNewAcl.owner)      || utils.CONSTS.SYSTEM_ADMIN_USER,
                                ownerGroup:  (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                                permissions: (this.defaultNewAcl && this.defaultNewAcl.file)       || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ) // '0644'
                            };
                        }
                        const fOp = this.fileOptions[id][f];
                        fOp.modifiedAt = now;

                        const stats = fs.statSync(path.join(this.objectsDir, id, f));
                        const fileName = path.basename(f);
                        processed.push({
                            path:       path.dirname(f),
                            file:       fileName,
                            stats:      stats,
                            isDir:      stats.isDirectory(),
                            acl:        fOp.acl || {},
                            modifiedAt: fOp.modifiedAt,
                            createdAt:  fOp.createdAt
                        });
                    } else {
                        delete this.fileOptions[id][f];
                    }
                }
            }

            // Store dir description
            if (changed) fs.writeFileSync(path.join(this.objectsDir, id, '_data.json'), JSON.stringify(this.fileOptions[id]));

            typeof callback === 'function' && setImmediate(() => callback(null, processed));
        } catch (e) {
            typeof callback === 'function' && setImmediate(() => callback(e.message));
        }
    }
    touch(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }
        const _path = utils.sanitizePath(id, name, callback);
        if (!_path) return;
        id = _path.id;
        name = _path.name;

        this.checkFileRights(id, null, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._touch(id, name, options, callback);
            }
        });
    }

    _rm(id, name, options, callback) {
        try {
            this.loadFileSettings(id);

            const regEx = new RegExp(tools.pattern2RegEx(name));
            const processed = [];
            let changed = false;
            const dirs = [];
            for (const f in this.fileOptions[id]) {
                if (!this.fileOptions[id].hasOwnProperty(f)) continue;
                if (regEx.test(f) && utils.checkFile(this.fileOptions[id][f], options, utils.CONSTS.ACCESS_WRITE)) {
                    let stat;
                    if (this.fileOptions[id][f]) {
                        changed = true;
                        delete this.fileOptions[id][f];
                    }
                    if (this.files && this.files[id] && this.files[id][f]) {
                        delete this.files[id][f];
                    }
                    const location = path.join(this.objectsDir, id, f);
                    if (fs.existsSync(location)) {
                        stat = fs.statSync(location);

                        if (stat.isDirectory()) {
                            if (dirs.indexOf(f) === -1) dirs.push(f);
                        } else {
                            fs.unlinkSync(location);
                        }
                    }
                    const filePath = path.dirname(f);
                    const fileName = path.basename(f);
                    if (dirs.indexOf(filePath) === -1) dirs.push(filePath);
                    processed.push({
                        path:       filePath,
                        file:       fileName,
                        isDir:      stat && stat.isDirectory()
                    });
                }
            }

            // try to delete directories
            for (let d = 0; d < dirs.length; d++) {
                try {
                    const _files = fs.readdirSync(path.join(this.objectsDir, id, dirs[d]));

                    if (_files.length) {
                        this.log.warn('Directory ' + path.join(id, dirs[d]) + ' is not empty');
                    } else {
                        fs.rmdirSync(path.join(this.objectsDir, id, dirs[d]));
                    }
                } catch (e) {
                    this.log.error('Cannot delete ' + path.join(id, dirs[d]) + ': ' + e);
                }
            }

            // Store dir description
            if (changed) fs.writeFileSync(path.join(this.objectsDir, id, '_data.json'), JSON.stringify(this.fileOptions[id]));

            typeof callback === 'function' && setImmediate(() => callback(null, processed));
        } catch (e) {
            typeof callback === 'function' && setImmediate(() => callback(e.message));
        }
    }
    rm(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }
        const _path = utils.sanitizePath(id, name, callback);
        if (!_path) return;
        id = _path.id;
        name = _path.name;

        this.checkFileRights(id, null, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                if (!options.acl.file['delete']) {
                    typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_PERMISSION));
                } else {
                    return this._rm(id, name, options, callback);
                }
            }
        });
    }

    _mkdir(id, dirname, _options, callback) {
        try {
            this.loadFileSettings(id);

            if (!fs.existsSync(path.join(this.objectsDir, id, dirname))) {
                fs.mkdirSync(path.join(this.objectsDir, id, dirname));
                typeof callback === 'function' && setImmediate(() => callback());
            } else {
                typeof callback === 'function' && setImmediate(() => callback('Yet exists'));
            }
        } catch (e) {
            typeof callback === 'function' && setImmediate(() => callback(e.message));
        }
    }
    mkdir(id, dirname, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }
        const _path = utils.sanitizePath(id, dirname, callback);
        if (!_path) return;
        id = _path.id;
        dirname = _path.name;

        this.checkFileRights(id, dirname, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                if (!options.acl.file.write) {
                    typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_PERMISSION));
                } else {
                    return this._mkdir(id, dirname, options, callback);
                }
            }
        });
    }

    _chownFile(id, name, options, callback) {
        try {
            this.loadFileSettings(id);

            const regEx = new RegExp(tools.pattern2RegEx(name));
            const processed = [];
            let changed = false;
            for (const f in this.fileOptions[id]) {
                if (!this.fileOptions[id].hasOwnProperty(f)) continue;
                if (regEx.test(f) && utils.checkFile(this.fileOptions[id][f], options, utils.CONSTS.ACCESS_WRITE)) {
                    changed = true;
                    if (typeof this.fileOptions[id][f] !== 'object') {
                        this.fileOptions[id][f] = {
                            mimeType: this.fileOptions[id][f]
                        };
                    }

                    if (!this.fileOptions[id][f].acl) {
                        this.fileOptions[id][f].acl = {
                            owner:       (this.defaultNewAcl && this.defaultNewAcl.owner)      || utils.CONSTS.SYSTEM_ADMIN_USER,
                            ownerGroup:  (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                            permissions: (this.defaultNewAcl && this.defaultNewAcl.file)       || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ) // '0644'
                        };
                    }

                    this.fileOptions[id][f].acl.owner      = options.owner;
                    this.fileOptions[id][f].acl.ownerGroup = options.ownerGroup;

                    if (fs.existsSync(path.join(this.objectsDir, id, f))) {
                        const stats = fs.statSync(path.join(this.objectsDir, id, f));
                        const acl = this.fileOptions[id][f];
                        const fileName = path.basename(f);
                        processed.push({
                            path:       path.dirname(f),
                            file:       fileName,
                            stats:      stats,
                            isDir:      stats.isDirectory(),
                            acl:        acl.acl || {},
                            modifiedAt: this.fileOptions[id][f].modifiedAt,
                            createdAt:  this.fileOptions[id][f].createdAt
                        });
                    }
                }
            }

            // Store dir description
            if (changed) fs.writeFileSync(path.join(this.objectsDir, id, '_data.json'), JSON.stringify(this.fileOptions[id]));
            typeof callback === 'function' && setImmediate(() => callback(null, processed, id));
        } catch (e) {
            typeof callback === 'function' && setImmediate(() => callback(e.message));
        }
    }
    chownFile(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};
        if (typeof options !== 'object') {
            options = {owner: options};
        }
        options.acl = null;
        const _path = utils.sanitizePath(id, name, callback);
        if (!_path) return;
        id = _path.id;
        name = _path.name;

        if (!options.ownerGroup && options.group) options.ownerGroup = options.group;
        if (!options.owner      && options.user)  options.owner      = options.user;

        if (!options.owner) {
            this.log.error(this.namespace + ' user is not defined');
            typeof callback === 'function' && setImmediate(() => callback('invalid parameter'));
            return;
        }

        if (!options.ownerGroup) {
            // get user group
            this.getUserGroup(options.owner, (_user, groups /* , permissions */) => {
                if (!groups || !groups[0]) {
                    typeof callback === 'function' && setImmediate(() => callback('user "' + options.owner + '" belongs to no group'));
                    return;
                } else {
                    options.ownerGroup = groups[0];
                }
                this.chownFile(id, name, options, callback);
            });
            return;
        }

        this.checkFileRights(id, null, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                if (!options.acl.file.write) {
                    typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_PERMISSION));
                } else {
                    return this._chownFile(id, name, options, callback);
                }
            }
        });
    }

    _chmodFile(id, name, options, callback) {
        try {
            this.loadFileSettings(id);

            const regEx = new RegExp(tools.pattern2RegEx(name));
            const processed = [];
            let changed = false;
            for (const f in this.fileOptions[id]) {
                if (!this.fileOptions[id].hasOwnProperty(f)) continue;
                if (regEx.test(f) && utils.checkFile(this.fileOptions[id][f], options, utils.CONSTS.ACCESS_WRITE)) {
                    changed = true;
                    if (typeof this.fileOptions[id][f] !== 'object') {
                        this.fileOptions[id][f] = {
                            mimeType: this.fileOptions[id][f]
                        };
                    }

                    if (!this.fileOptions[id][f].acl) {
                        this.fileOptions[id][f].acl = {
                            owner:       (this.defaultNewAcl && this.defaultNewAcl.owner)      || utils.CONSTS.SYSTEM_ADMIN_USER,
                            ownerGroup:  (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                            permissions: (this.defaultNewAcl && this.defaultNewAcl.file)       || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ) // '0644'
                        };
                    }

                    this.fileOptions[id][f].acl.permissions = options.mode;
                    if (fs.existsSync(path.join(this.objectsDir, id, f))) {
                        const stats = fs.statSync(path.join(this.objectsDir, id, f));
                        const acl = this.fileOptions[id][f];
                        const fileName = path.basename(f);
                        processed.push({
                            path:       path.dirname(f),
                            file:       fileName,
                            stats:      stats,
                            isDir:      stats.isDirectory(),
                            acl:        acl.acl || {},
                            modifiedAt: acl.modifiedAt,
                            createdAt:  acl.createdAt
                        });
                    }
                }
            }

            // Store dir description
            if (changed) fs.writeFileSync(path.join(this.objectsDir, id, '_data.json'), JSON.stringify(this.fileOptions[id]));
            typeof callback === 'function' && setImmediate(() => callback(null, processed, id));
        } catch (e) {
            typeof callback === 'function' && setImmediate(() => callback(e.message));
        }
    }
    chmodFile(id, name, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};
        options.acl = null;

        const _path = utils.sanitizePath(id, name, callback);
        if (!_path) return;
        id = _path.id;
        name = _path.name;

        if (typeof options !== 'object') {
            options = {mode: options};
        }

        if (options.mode === undefined) {
            this.log.error(this.namespace + ' mode is not defined');
            typeof callback === 'function' && setImmediate(() => callback('invalid parameter'));
            return;
        } else if (typeof options.mode === 'string') {
            options.mode = parseInt(options.mode, 16);
        }

        this.checkFileRights(id, null, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                if (!options.acl.file.write) {
                    typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_PERMISSION));
                } else {
                    return this._chmodFile(id, name, options, callback);
                }
            }
        });
    }

    _enableFileCache(enabled, _options, callback) {
        if (this.settings.connection.noFileCache !== enabled) {
            this.settings.connection.noFileCache = !!enabled;
            if (!this.settings.connection.noFileCache) {
                // clear cache
                this.files = {};
            }
        }
        typeof callback === 'function' && setImmediate(() => callback(null, this.settings.connection.noFileCache));
    }
    enableFileCache(enabled, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (options && options.acl) {
            options.acl = null;
        }

        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._enableFileCache(enabled, options, callback);
            }
        });
    }

    // -------------- OBJECT FUNCTIONS -------------------------------------------
    clone(obj) {
        if (obj === null || obj === undefined || typeof obj !== 'object') {
            return obj;
        }

        const temp = obj.constructor(); // changed

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                temp[key] = this.clone(obj[key]);
            }
        }
        return temp;
    }

    subscribe(pattern, options, callback) {
        return this.subscribeConfig(pattern, options, callback);
    }

    subscribeConfig(pattern, options, callback) {
        this.subscribeConfigForClient(this.callbackSubscriptionClient, pattern, options, callback);
    }

    _subscribeConfigForClient(client, pattern, options, callback) {
        this.handleSubscribe(client, 'objects', pattern, options);

        typeof callback === 'function' && setImmediate(() => callback());
    }

    subscribeConfigForClient(client, pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_LIST, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._subscribeConfigForClient(client, pattern, options, callback);
            }
        });
    }

    unsubscribe(pattern, options, callback) {
        this.unsubscribeConfig(pattern, options, callback);
    }

    unsubscribeConfig(pattern, options, callback) {
        this.unsubscribeConfigForClient(this.callbackSubscriptionClient, pattern, options, callback);
    }

    _unsubscribeConfigForClient(client, pattern, _options, callback) {
        this.handleUnsubscribe(client, 'objects', pattern);
        // ignore options => unsubscribe may everyone
        typeof callback === 'function' && setImmediate(() => callback());
    }

    unsubscribeConfigForClient(client, pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_LIST, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._unsubscribeConfigForClient(client, pattern, options, callback);
            }
        });

    }

    _chownObject(pattern, options, callback) {
        this.getConfigKeys(pattern, options, (err, keys) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
                return;
            }
            const list = [];
            for (let k = 0; k < keys.length; k++) {
                if (!utils.checkObject(this.dataset[keys[k]], options, utils.CONSTS.ACCESS_WRITE)) continue;
                if (!this.dataset[keys[k]].acl) {
                    this.dataset[keys[k]].acl = {
                        owner:      (this.defaultNewAcl && this.defaultNewAcl.owner)      || utils.CONSTS.SYSTEM_ADMIN_USER,
                        ownerGroup: (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                        object:     (this.defaultNewAcl && this.defaultNewAcl.object)     || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ) // '0644'
                    };
                    if (this.dataset[keys[k]].type === 'state') {
                        this.dataset[keys[k]].acl.state = (this.defaultNewAcl && this.defaultNewAcl.state) || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ); // '0644'
                    }
                }
                this.dataset[keys[k]].acl.owner      = options.owner;
                this.dataset[keys[k]].acl.ownerGroup = options.ownerGroup;
                list.push(JSON.parse(JSON.stringify(this.dataset[keys[k]])));
            }
            typeof callback === 'function' && setImmediate(() => callback(null, list));
            if (!this.stateTimer) this.stateTimer = setTimeout(() => this.saveState(), 5000);
        });
    }
    chownObject(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};
        options.acl = null;

        if (typeof options !== 'object') {
            options = {owner: options};
        }

        if (!options.ownerGroup && options.group) options.ownerGroup = options.group;
        if (!options.owner && options.user)  options.owner = options.user;

        if (!options.owner) {
            this.log.error(this.namespace + ' user is not defined');
            typeof callback === 'function' && setImmediate(() => callback('invalid parameter'));
            return;
        }

        if (!options.ownerGroup) {
            // get user group
            this.getUserGroup(options.owner, (_user, groups /* , permissions*/) => {
                if (!groups || !groups[0]) {
                    typeof callback === 'function' && setImmediate(() => callback('user "' + options.owner + '" belongs to no group'));
                    return;
                } else {
                    options.ownerGroup = groups[0];
                }
                this.chownObject(pattern, options, callback);
            });
            return;
        }

        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                if (!options.acl.object || !options.acl.object.write) {
                    typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_PERMISSION));
                } else {
                    return this._chownObject(pattern, options, callback);
                }
            }
        });
    }

    _chmodObject(pattern, options, callback) {
        this.getConfigKeys(pattern, options, (err, keys) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
                return;
            }
            const list = [];
            for (let k = 0; k < keys.length; k++) {
                if (!utils.checkObject(this.dataset[keys[k]], options, utils.CONSTS.ACCESS_WRITE)) continue;
                if (!this.dataset[keys[k]].acl) {
                    this.dataset[keys[k]].acl = {
                        owner:      (this.defaultNewAcl && this.defaultNewAcl.owner)      || utils.CONSTS.SYSTEM_ADMIN_USER,
                        ownerGroup: (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                        object:     (this.defaultNewAcl && this.defaultNewAcl.object)     || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ) // '0644'
                    };
                    if (this.dataset[keys[k]].type === 'state') {
                        this.dataset[keys[k]].acl.state = (this.defaultNewAcl && this.defaultNewAcl.state) || (utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ); // '0644'
                    }
                }
                if (options.object !== undefined) this.dataset[keys[k]].acl.object = options.object;
                if (options.state  !== undefined) this.dataset[keys[k]].acl.state  = options.state;
                list.push(JSON.parse(JSON.stringify(this.dataset[keys[k]])));
            }
            typeof callback === 'function' && setImmediate(() => callback(null, list));
            if (!this.stateTimer) this.stateTimer = setTimeout(() => this.saveState(), 5000);
        });
    }
    chmodObject(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        options = options || {};
        options.acl = null;

        if (typeof options !== 'object') {
            options = {object: options};
        }

        if (options.mode && !options.object) options.object = options.mode;

        if (options.object === undefined) {
            this.log.error(this.namespace + ' mode is not defined');
            typeof callback === 'function' && setImmediate(() => callback('invalid parameter'));
            return;
        } else if (typeof options.mode === 'string') {
            options.mode = parseInt(options.mode, 16);
        }

        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                if (!options.acl.file.write) {
                    typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_PERMISSION));
                } else {
                    return this._chmodObject(pattern, options, callback);
                }
            }
        });
    }

    _getObject(id, _options, callback) {
        const obj = this.clone(this.dataset[id]);
        typeof callback === 'function' && setImmediate(() => callback(null, obj));
    }
    getObject(id, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getObject(id, options, (err, obj) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(obj);
                    }
                });
            });
        }

        if (typeof callback === 'function') {
            if (options && options.acl) {
                options.acl = null;
            }
            utils.checkObjectRights(this, id, this.dataset[id], options, utils.CONSTS.ACCESS_READ, (err, options) => {
                if (err) {
                    setImmediate(() => callback(err));
                } else {
                    return this._getObject(id, options, callback);
                }
            });
        }
    }

    getObjectAsync(id, options) {
        return new Promise((resolve, reject) => {
            this.getObject(id, options, (err, obj) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(obj);
                }
            });
        });
    }

    _getKeys(pattern, options, callback, _dontModify) {
        const r = new RegExp(tools.pattern2RegEx(pattern));
        const result = [];
        for (const id in this.dataset) {
            if (!this.dataset.hasOwnProperty(id)) continue;
            if (r.test(id) && utils.checkObject(this.dataset[id], options, utils.CONSTS.ACCESS_LIST)) {
                result.push(id);
            }
        }
        result.sort();
        typeof callback === 'function' && setImmediate(() => callback(null, result));
    }
    getKeys(pattern, options, callback, dontModify) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getKeys(pattern, options, (err, obj) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(obj);
                    }
                }, dontModify);
            });
        }

        if (options && options.acl) options.acl = null;
        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_LIST, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._getKeys(pattern, options, callback, dontModify);
            }
        });
    }

    getConfigKeys(pattern, options, callback, dontModify) {
        return this.getKeys(pattern, options, callback, dontModify);
    }

    _getObjects(keys, options, callback, _dontModify) {
        if (!keys) {
            typeof callback === 'function' && setImmediate(() => callback('no keys', null));
            return;
        }
        if (!keys.length) {
            typeof callback === 'function' && setImmediate(() => callback(null, []));
            return;
        }
        const result = [];
        for (let i = 0; i < keys.length; i++) {
            if (utils.checkObject(this.dataset[keys[i]], options, utils.CONSTS.ACCESS_READ)) {
                result.push(this.clone(this.dataset[keys[i]]));
            } else {
                result.push({error: utils.ERRORS.ERROR_PERMISSION});
            }
        }
        typeof callback === 'function' && setImmediate(() => callback(null, result));
    }
    getObjects(keys, options, callback, dontModify) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getObjects(keys, options, (err, objs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(objs);
                    }
                }, dontModify);
            });
        }

        if (options && options.acl) options.acl = null;
        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_READ, (err, options) => {
                if (err) {
                    setImmediate(() => callback(err));
                } else {
                    return this._getObjects(keys, options, callback, dontModify);
                }
            });
        }
    }

    _getObjectsByPattern(pattern, options, callback) {
        const r = new RegExp(tools.pattern2RegEx(pattern));
        const keys = [];
        for (const id in this.dataset) {
            if (!this.dataset.hasOwnProperty(id)) continue;
            if (r.test(id) && utils.checkObject(this.dataset[id], options, utils.CONSTS.ACCESS_READ)) {
                keys.push(id);
            }
        }
        keys.sort();
        const result = [];
        for (let i = 0; i < keys.length; i++) {
            result.push(JSON.parse(JSON.stringify(this.dataset[keys[i]])));
        }
        typeof callback === 'function' && setImmediate(() => callback(null, result));
    }
    getObjectsByPattern(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getObjectsByPattern(pattern, options, (err, obj) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(obj);
                    }
                });
            });
        }
        if (options && options.acl) options.acl = null;
        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_READ, (err, options) => {
                if (err) {
                    setImmediate(() => callback(err));
                } else {
                    return this._getObjectsByPattern(pattern, options, callback);
                }
            });
        }
    }

    _setObject(id, obj, options, callback) {
        if (!id || utils.regCheckId.test(id)) {
            if (typeof callback === 'function') {
                callback(`Invalid ID: ${id}`);
            }
            return;
        }

        if (!obj) {
            this.log.error(this.namespace + ' setObject: Argument object is null');
            typeof callback === 'function' && setImmediate(() => callback('obj is null'));
            return;
        }

        obj._id = id;

        if (id === 'system.config' && obj.common && this.dataset[id] && this.dataset[id].common && JSON.stringify(obj.common.defaultNewAcl) !== JSON.stringify(this.dataset[id].common.defaultNewAcl)) {
            this.dataset[id] = obj;
            return this.setDefaultAcl(() => this.setObject(id, obj, options, callback));
        }

        if (!tools.checkNonEditable(this.dataset[id], obj)) {
            typeof callback === 'function' && setImmediate(() => callback('Invalid password for update of vendor information'));
            return;
        }

        // do not delete common settings, like "history" or "mobile". It can be erased only with "null"
        if (this.dataset[id] && this.dataset[id].common) {
            for (let i = 0; i < this.preserveSettings.length; i++) {
                // remove settings if desired
                if (obj.common && obj.common[this.preserveSettings[i]] === null) {
                    delete obj.common[this.preserveSettings[i]];
                    continue;
                }

                if (this.dataset[id].common[this.preserveSettings[i]] !== undefined && (!obj.common || obj.common[this.preserveSettings[i]] === undefined)) {
                    if (!obj.common) obj.common = {};
                    obj.common[this.preserveSettings[i]] = this.dataset[id].common[this.preserveSettings[i]];
                }
            }
        }

        if (obj.common && obj.common.alias && obj.common.alias.id && obj.common.alias.id.startsWith('alias.')) {
            typeof callback === 'function' && setImmediate(() => callback('Cannot make alias on alias'));
            return;
        }

        if (this.dataset[id] && this.dataset[id].acl && !obj.acl) {
            obj.acl = this.dataset[id].acl;
        }

        // add user default rights
        if (this.defaultNewAcl && !obj.acl) {
            obj.acl = JSON.parse(JSON.stringify(this.defaultNewAcl));
            delete obj.acl.file;
            if (obj.type !== 'state') {
                delete obj.acl.state;
            }
            if (options.owner) {
                obj.acl.owner = options.owner;

                if (!options.ownerGroup) {
                    obj.acl.ownerGroup = null;
                    this.getUserGroup(options.owner, (_user, groups /* , permissions */) => {
                        if (!groups || !groups[0]) {
                            options.ownerGroup = (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP;
                        } else {
                            options.ownerGroup = groups[0];
                        }
                        this._setObject(id, obj, options, callback);
                    });
                    return;
                }
            }
        }
        if (this.defaultNewAcl && obj.acl && !obj.acl.ownerGroup && options.ownerGroup) {
            obj.acl.ownerGroup = options.ownerGroup;
        }
        this._setObjectDirect(id, obj, callback);
    }

    _setObjectDirect(id, obj, callback) {
        this.dataset[id] = JSON.parse(JSON.stringify(obj));

        typeof callback === 'function' && setImmediate(() => callback(null, {id: id}));

        setImmediate(() => this.publishAll('objects', id, obj));

        if (!this.stateTimer) this.stateTimer = setTimeout(() => this.saveState(), 5000);
    }

    /**
     * set a new or update object
     *
     * This function writes the object into DB
     *
     * @param {string} id ID of the object
     * @param {object} obj
     * @param {object} options optional options for access control are optional
     * @param {function} callback return function
     */
    setObject(id, obj, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.setObject(id, obj, options, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            });
        }
        if (options && options.acl) options.acl = null;

        utils.checkObjectRights(this, id, this.dataset[id], options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._setObject(id, obj, options, callback);
            }
        });
    }

    setObjectAsync(id, obj, options) {
        return new Promise((resolve, reject) => {
            this.setObject(id, obj, options, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    _delObject(id, _options, callback) {
        if (this.dataset[id]) {
            if (this.dataset[id].common && this.dataset[id].common.dontDelete) {
                typeof callback === 'function' && setImmediate(() => callback('Object is marked as non deletable'));
                return;
            }

            delete this.dataset[id];

            typeof callback === 'function' && setImmediate(() => callback(null));

            setImmediate(() => this.publishAll('objects', id, null));

            if (!this.stateTimer) this.stateTimer = setTimeout(() => this.saveState(), 5000);
        } else {
            typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_NOT_FOUND));
        }
    }
    delObject(id, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.delObject(id, options, (err, obj) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(obj);
                    }
                });
            });
        }

        if (options && options.acl) options.acl = null;
        utils.checkObjectRights(this, id, this.dataset[id], options, utils.CONSTS.ACCESS_DELETE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._delObject(id, options, callback);
            }
        });
    }

    delObjectAsync(id, options) {
        return new Promise((resolve, reject) => {
            this.delObject(id, options, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    _applyViewFunc(func, params, options, callback) {
        const result = {
            rows: []
        };

        // eslint-disable-next-line no-unused-vars
        function _emit_(id, obj) {
            result.rows.push({id: id, value: obj});
        }

        const f = eval('(' + func.map.replace(/emit/g, '_emit_') + ')');

        for (const id in this.dataset) {
            if (!this.dataset.hasOwnProperty(id)) continue;
            if (params) {
                if (params.startkey && id < params.startkey) continue;
                if (params.endkey   && id > params.endkey)   continue;
            }
            if (this.dataset[id]) {
                if (!utils.checkObject(this.dataset[id], options, utils.CONSTS.ACCESS_READ)) continue;
                try {
                    f(this.dataset[id]);
                } catch (e) {
                    this.log.warn('Cannot execute map: ' + e.message);

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

        typeof callback === 'function' && setImmediate(() => callback(null, result));
    }

    _applyView(func, params, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this._applyView(func, params, options, (err, obj) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(obj);
                    }
                });
            });
        }

        if (options && options.acl) options.acl = null;

        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_LIST, (err, options) => {
                if (err) {
                    setImmediate(() => callback(err));
                } else {
                    return this._applyViewFunc(func, params, options, callback);
                }
            });
        }
    }

    _getObjectView(design, search, params, options, callback) {
        if (this.dataset['_design/' + design]) {
            if (this.dataset['_design/' + design].views && this.dataset['_design/' + design].views[search]) {
                this._applyView(this.dataset['_design/' + design].views[search], params, options, callback);
            } else {
                this.log.warn('Cannot find search "' + search + '" in "' + design + '"');
                setImmediate(() => callback({status_code: 404, status_text: 'Cannot find search "' + search + '" in "' + design + '"'}));
            }
        } else {
            this.log.error('Cannot find view "' + design + '"');
            setImmediate(() => callback({status_code: 404, status_text: 'Cannot find view "' + design + '"'}));
        }
    }
    getObjectView(design, search, params, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getObjectView(design, search, params, options, (err, obj) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(obj);
                    }
                });
            });
        }

        if (options && options.acl) options.acl = null;

        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_LIST, (err, options) => {
                if (err) {
                    setImmediate(() => callback(err));
                } else {
                    return this._getObjectView(design, search, params, options, callback);
                }
            });
        }
    }

    _getObjectList(params, options, callback) {
        // return rows with id and doc
        const result = {
            rows: []
        };

        for (const id in this.dataset) {
            if (!this.dataset.hasOwnProperty(id) || !utils.checkObject(this.dataset[id], options, utils.CONSTS.ACCESS_READ)) continue;
            if (params) {
                if (params.startkey && id < params.startkey) continue;
                if (params.endkey   && id > params.endkey)   continue;
                if (!params.include_docs && id[0] === '_')   continue;
            }
            const obj = {id: id, value: this.clone(this.dataset[id])};
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
                    for (let t = 1; t < result.rows.length; t++) {
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
        callback(null, result);
    }
    getObjectList(params, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.getObjectList(params, options, (err, obj) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(obj);
                    }
                });
            });
        }

        if (options && options.acl) options.acl = null;

        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_LIST, (err, options) => {
                if (err) {
                    setImmediate(() => callback(err));
                } else {
                    return this._getObjectList(params, options, callback);
                }
            });
        }
    }

    getObjectListAsync(params, options) {
        return new Promise((resolve, reject) => {
            this.getObjectList(params, options, (err, arr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(arr);
                }
            });
        });
    }

    _extendObject(id, obj, options, callback) {
        if (!id || utils.regCheckId.test(id)) {
            typeof callback === 'function' && setImmediate(() => callback(`Invalid ID: ${id}`));
            return;
        }

        if (id === 'system.config' && obj && obj.common && this.dataset[id] && this.dataset[id].common && JSON.stringify(obj.common.defaultNewAcl) !== JSON.stringify(this.dataset[id].common.defaultNewAcl)) {
            this.dataset[id] = obj;
            return this.setDefaultAcl(() => this._extendObject(id, obj, options, callback));
        }

        let oldObj;
        if (this.dataset[id] && this.dataset[id].nonEdit) {
            oldObj = JSON.parse(JSON.stringify(this.dataset[id]));
        }

        this.dataset[id] = this.dataset[id] || {};
        this.dataset[id] = extend(true, this.dataset[id], obj);
        this.dataset[id]._id = id;

        // add user default rights
        if (this.defaultNewAcl && !this.dataset[id].acl) {
            this.dataset[id].acl = JSON.parse(JSON.stringify(this.defaultNewAcl));
            delete this.dataset[id].acl.file;
            if (this.dataset[id].type !== 'state') {
                delete this.dataset[id].acl.state;
            }

            if (options.owner) {
                this.dataset[id].acl.owner = options.owner;

                if (!options.ownerGroup) {
                    this.dataset[id].acl.ownerGroup = null;
                    this.getUserGroup(options.owner, (_user, groups /*, permissions */) => {
                        if (!groups || !groups[0]) {
                            options.ownerGroup = (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP;
                        } else {
                            options.ownerGroup = groups[0];
                        }
                        this._extendObject(id, obj, options, callback);
                    });
                    return;
                }
            }
        }

        if (this.defaultNewAcl && options.ownerGroup && this.dataset[id].acl && !this.dataset[id].acl.ownerGroup) {
            this.dataset[id].acl.ownerGroup = options.ownerGroup;
        }

        if (oldObj && !tools.checkNonEditable(oldObj, this.dataset[id])) {
            typeof callback === 'function' && setImmediate(() => callback('Invalid password for update of vendor information'));
            return;
        }

        typeof callback === 'function' && setImmediate(() => callback(null, {id: id, value: this.dataset[id]}, id));

        setImmediate(() => this.publishAll('objects', id, this.dataset[id]));

        if (!this.stateTimer) this.stateTimer = setTimeout(() => this.saveState(), 5000);
    }
    extendObject(id, obj, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.extendObject(id, obj, options, (err, obj) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(obj);
                    }
                });
            });
        }

        if (options && options.acl) options.acl = null;

        utils.checkObjectRights(this, id, this.dataset[id], options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                return this._extendObject(id, obj, options, callback);
            }
        });
    }

    extendObjectAsync(id, obj, options) {
        return new Promise((resolve, reject) => {
            this.extendObject(id, obj, options, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    setConfig(id, obj, options, callback) {
        return this.setObject(id, obj, options, callback);
    }

    delConfig(id, options, callback) {
        return this.delObject(id, options, callback);
    }

    getConfig(id, options, callback) {
        return this.getObject(id, options, callback);
    }

    getConfigs(keys, options, callback, dontModify) {
        return this.getObjects(keys, options, callback, dontModify);
    }

    _findObject(idOrName, type, options, callback) {
        if (!this.dataset) {
            typeof callback === 'function' && setImmediate(() => callback('Not implemented'));
            return;
        }

        // Assume it is ID
        if (this.dataset[idOrName] && (!type || (this.dataset[idOrName].common && this.dataset[idOrName].common.type === type))) {
            typeof callback === 'function' && setImmediate(() => callback(null, idOrName, this.dataset[idOrName].common.name));
        } else {
            // Assume it is name
            for (const id in this.dataset) {
                if (!this.dataset.hasOwnProperty(id) || !utils.checkObject(this.dataset[id], options, utils.CONSTS.ACCESS_READ)) continue;
                if (this.dataset[id].common &&
                    this.dataset[id].common.name === idOrName &&
                    (!type || (this.dataset[id].common && this.dataset[id].common.type === type))) {
                    typeof callback === 'function' && setImmediate(() => callback(null, id, idOrName));
                    return;
                }
            }
            typeof callback === 'function' && setImmediate(() => callback(null, null, idOrName));
        }
    }
    findObject(idOrName, type, options, callback) {
        if (typeof type === 'function') {
            callback = type;
            options = null;
            type = null;
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.findObject(idOrName, type, options, (err, id, _idOrName) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(id);
                    }
                });
            });
        }

        if (options && options.acl) options.acl = null;

        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_LIST, (err, options) => {
                if (err) {
                    setImmediate(() => callback(err));
                } else {
                    return this._findObject(idOrName, type, options, callback);
                }
            });
        }
    }

    // can be called only from js-controller
    addPreserveSettings(settings) {
        if (typeof settings !== 'object') settings = [settings];

        for (let s = 0; s < settings.length; s++) {
            if (this.preserveSettings.indexOf(settings[s]) === -1) this.preserveSettings.push(settings[s]);
        }
    }

    _destroyDB(_options, callback) {
        if (fs.existsSync(this.datasetName)) {
            fs.unlinkSync(this.datasetName);
        }
        typeof callback === 'function' && setImmediate(() => callback());
    }
    destroyDB(options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};

        if (!callback) {
            return new Promise((resolve, reject) => {
                this.destroyDB(options, (err, obj) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(obj);
                    }
                });
            });
        }

        options.acl = null;

        utils.checkObjectRights(this, null, null, options, utils.CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                typeof callback === 'function' && setImmediate(() => callback(err));
            } else {
                // ONLY admin can destroy DB
                if (!options.acl.file.write || options.user !== utils.CONSTS.SYSTEM_ADMIN_USER) {
                    typeof callback === 'function' && setImmediate(() => callback(utils.ERRORS.ERROR_PERMISSION));
                } else {
                    return this._destroyDB(options, callback);
                }
            }
        });
    }

    // Destructor of the class. Called by shutting down.
    destroy() {
        super.destroy();

        this.saveFileSettings(true);
        if (this.stateTimer) {
            clearTimeout(this.stateTimer);
            this.stateTimer = null;
        }
        if (this.writeTimer) {
            clearTimeout(this.writeTimer);
            this.writeTimer = null;
        }
    }
}

module.exports = ObjectsInMemoryFileDB;
