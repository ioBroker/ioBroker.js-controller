/**
 *      Object DB in memory - Server
 *
 *      Copyright 2013-2024 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

import fs from 'fs-extra';
import path from 'node:path';
import { InMemoryFileDB } from '@iobroker/db-base';
import { tools } from '@iobroker/db-base';
import { objectsUtils as utils } from '@iobroker/db-objects-redis';
import deepClone from 'deep-clone';

/**
 * This class inherits InMemoryFileDB class and adds all relevant logic for objects
 * including the available methods for use by js-controller directly
 */
export class ObjectsInMemoryFileDB extends InMemoryFileDB {
    constructor(settings) {
        settings = settings || {};
        settings.fileDB = settings.fileDB || {
            fileName: 'objects.json',
            backupDirName: 'backup-objects',
        };
        super(settings);

        if (!this.change) {
            this.change = id => {
                this.log.silly(`${this.namespace} objects change: ${id} ${JSON.stringify(this.change)}`);
            };
        }

        this.META_ID = '**META**';
        this.fileOptions = {};
        this.files = {};
        this.writeTimer = null;
        this.writeIds = [];
        this.preserveSettings = ['custom'];
        this.defaultNewAcl = this.settings.defaultNewAcl || null;
        this.namespace = this.settings.namespace || this.settings.hostname || '';
        this.writeFileInterval =
            this.settings.connection && typeof this.settings.connection.writeFileInterval === 'number'
                ? parseInt(this.settings.connection.writeFileInterval)
                : 5_000;
        if (!settings.jsonlDB) {
            this.log.silly(`${this.namespace} Objects DB uses file write interval of ${this.writeFileInterval} ms`);
        }

        this.objectsDir = path.join(this.dataDir, 'files');

        // cached meta information for file operations
        this.existingMetaObjects = {};

        // Handle some < js-controller 2.0 broken objects and correct them
        for (const obj of Object.values(this.dataset)) {
            if (tools.isObject(obj) && obj.acl && obj.acl.permissions && !obj.acl.object) {
                obj.acl.object = obj.acl.permissions;
                delete obj.acl.permissions;
            }
        }

        // init default new acl
        const configObj = this.dataset['system.config'];
        if (configObj && configObj.common && configObj.common.defaultNewAcl) {
            this.defaultNewAcl = deepClone(configObj.common.defaultNewAcl);
        }
    }

    // internal functionality
    _normalizeFilename(name) {
        return name ? name.replace(/[/\\]+/g, '/') : name;
    }

    // -------------- FILE FUNCTIONS -------------------------------------------
    // internal functionality
    _saveFileSettings(id, force) {
        if (typeof id === 'boolean') {
            force = id;
            id = undefined;
        }

        id !== undefined && !this.writeIds.includes(id) && this.writeIds.push(id);

        this.writeTimer && clearTimeout(this.writeTimer);

        // if store immediately
        if (force) {
            this.writeTimer = null;
            // Store dirs description
            for (const writeId of this.writeIds) {
                const location = path.join(this.objectsDir, writeId, '_data.json');
                try {
                    if (fs.existsSync(path.join(this.objectsDir, writeId))) {
                        fs.writeFileSync(location, JSON.stringify(this.fileOptions[writeId]));
                    }
                } catch (e) {
                    this.log.error(`${this.namespace} Cannot write files: ${location}: ${e.message}`);
                }
            }
            this.writeIds = [];
        } else {
            this.writeTimer = setTimeout(() => {
                // Store dirs description
                for (const writeId of this.writeIds) {
                    const location = path.join(this.objectsDir, writeId, '_data.json');
                    try {
                        fs.writeFileSync(location, JSON.stringify(this.fileOptions[writeId]));
                    } catch (e) {
                        this.log.error(`${this.namespace} Cannot write files: ${location}: ${e.message}`);
                    }
                }
                this.writeIds = [];
            }, 1_000);
        }
    }

    // internal functionality
    _loadFileSettings(id) {
        if (!this.fileOptions[id]) {
            const location = path.join(this.objectsDir, id, '_data.json');
            if (fs.existsSync(location)) {
                try {
                    this.fileOptions[id] = fs.readJSONSync(location);
                } catch (e) {
                    this.log.error(`${this.namespace} Cannot parse ${location}: ${e.message}`);
                    this.fileOptions[id] = {};
                }
                let corrected = false;
                Object.keys(this.fileOptions[id]).forEach(filename => {
                    const normalized = this._normalizeFilename(filename);
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
                            this.log.error(`${this.namespace} Cannot write files: ${location}: ${e.message}`);
                        }
                    }
                });
            } else {
                this.fileOptions[id] = {};
            }
        }
    }

    // server only functionality
    syncFileDirectory(limitId) {
        const resNotifies = [];
        let resSynced = 0;

        function getAllFiles(dir) {
            let results = [];
            const list = fs.readdirSync(dir);
            list.forEach(file => {
                file = `${dir}/${file}`;
                const stat = fs.statSync(file);
                if (stat && stat.isDirectory()) {
                    /* Recurse into a subdirectory */
                    results = results.concat(getAllFiles(file));
                } else {
                    /* Is a file */
                    results.push(file);
                }
            });
            return results;
        }

        const res = this._getObjectView('system', 'meta', null);

        // collect meta ids to generate warning if non existing
        const metaIds = res.rows.map(obj => obj.id).filter(id => !limitId || limitId === id);

        if (!fs.existsSync(this.objectsDir)) {
            return {
                numberSuccess: resSynced,
                notifications: resNotifies,
            };
        }
        const baseDirs = fs.readdirSync(this.objectsDir);
        baseDirs.forEach(dir => {
            let dirSynced = 0;
            if (dir === '..' || dir === '.') {
                return;
            }
            const dirPath = path.join(this.objectsDir, dir);
            const stat = fs.statSync(dirPath);
            if (!stat.isDirectory()) {
                return;
            }
            if (limitId && dir !== limitId) {
                return;
            }
            if (!metaIds.includes(dir)) {
                resNotifies.push(
                    `Ignoring Directory "${dir}" because officially not created as meta object. Please remove directory!`,
                );
                return;
            }
            this._loadFileSettings(dir);
            const files = getAllFiles(dirPath);
            files.forEach(file => {
                const localFile = file.substr(dirPath.length + 1);
                if (localFile === '_data.json') {
                    return;
                }
                if (!this.fileOptions[dir][localFile]) {
                    const fileStat = fs.statSync(file);
                    const ext = path.extname(localFile);
                    const mime = utils.getMimeType(ext);
                    const _mimeType = mime.mimeType;
                    const isBinary = mime.isBinary;

                    this.fileOptions[dir][localFile] = {
                        createdAt: fileStat.ctimeMs,
                        acl: {
                            owner: (this.defaultNewAcl && this.defaultNewAcl.owner) || utils.CONSTS.SYSTEM_ADMIN_USER,
                            ownerGroup:
                                (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) ||
                                utils.CONSTS.SYSTEM_ADMIN_GROUP,
                            permissions:
                                (this.defaultNewAcl && this.defaultNewAcl.file) ||
                                utils.CONSTS.ACCESS_USER_RW |
                                    utils.CONSTS.ACCESS_GROUP_READ |
                                    utils.CONSTS.ACCESS_EVERY_READ, // 0x644
                        },
                        mimeType: _mimeType,
                        binary: isBinary,
                        modifiedAt: fileStat.mtimeMs,
                    };
                    dirSynced++;
                }
            });
            this._saveFileSettings(dir);
            resSynced += dirSynced;
            dirSynced && resNotifies.push(`Added ${dirSynced} Files in Directory "${dir}"`);
        });
        return {
            numberSuccess: resSynced,
            notifications: resNotifies,
        };
    }

    // needed by server
    _writeFile(id, name, data, options) {
        if (typeof options === 'string') {
            options = { mimeType: options };
        }
        if (options && options.acl) {
            options.acl = null;
        }

        const _path = utils.sanitizePath(id, name);
        id = _path.id;
        name = _path.name;

        options = options || {};

        this._loadFileSettings(id);

        this.files[id] = this.files[id] || {};

        try {
            if (!fs.existsSync(this.objectsDir)) {
                fs.mkdirSync(this.objectsDir);
            }
            if (!fs.existsSync(path.join(this.objectsDir, id))) {
                fs.mkdirSync(path.join(this.objectsDir, id));
            }
        } catch (e) {
            this.log.error(
                `${this.namespace} Cannot create directories: ${path.join(this.objectsDir, id)}: ${e.message}`,
            );
            this.log.error(
                `${this.namespace} Check the permissions! Or run installation fixer or "iobroker fix" command!`,
            );
            throw e;
        }

        const ext = path.extname(name);
        const mime = utils.getMimeType(ext);
        const _mimeType = mime.mimeType;
        const isBinary = mime.isBinary;

        this.fileOptions[id][name] = this.fileOptions[id][name] || { createdAt: Date.now() };
        this.fileOptions[id][name].acl = this.fileOptions[id][name].acl || {
            owner: options.user || (this.defaultNewAcl && this.defaultNewAcl.owner) || utils.CONSTS.SYSTEM_ADMIN_USER,
            ownerGroup:
                options.group ||
                (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) ||
                utils.CONSTS.SYSTEM_ADMIN_GROUP,
            permissions:
                options.mode ||
                (this.defaultNewAcl && this.defaultNewAcl.file) ||
                utils.CONSTS.ACCESS_USER_RW | utils.CONSTS.ACCESS_GROUP_READ | utils.CONSTS.ACCESS_EVERY_READ, // 0x644
        };

        this.fileOptions[id][name].mimeType = options.mimeType || _mimeType;
        this.fileOptions[id][name].binary = isBinary;
        this.fileOptions[id][name].acl.ownerGroup =
            this.fileOptions[id][name].acl.ownerGroup ||
            (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) ||
            utils.CONSTS.SYSTEM_ADMIN_GROUP;
        this.fileOptions[id][name].modifiedAt = Date.now();

        try {
            // Create directories if complex structure
            fs.ensureDirSync(path.join(this.objectsDir, id, path.dirname(name)));
            // Store file
            fs.writeFileSync(path.join(this.objectsDir, id, name), data, {
                flag: 'w',
                encoding: isBinary ? 'binary' : 'utf8',
            });

            if (isBinary) {
                // Reload by read
                delete this.files[id][name];
            } else {
                this.files[id][name] = data;
            }

            // Store dir description
            this._saveFileSettings(id);
        } catch (e) {
            this.log.error(
                `${this.namespace} Cannot write files: ${path.join(this.objectsDir, id, name)}: ${e.message}`,
            );
            throw e;
        }

        setImmediate(
            (name, size) => {
                // publish event in states
                this.log.silly(`${this.namespace} memory publish ${id} ${JSON.stringify({ name, file: true, size })}`);
                this.publishAll('files', `${id}$%$${name}`, size);
            },
            name,
            data.byteLength,
        );
    }

    // needed by server
    _readFile(id, name, options) {
        if (options && options.acl) {
            options.acl = null;
        }

        const _path = utils.sanitizePath(id, name);
        id = _path.id;
        name = _path.name;

        options = options || {};
        try {
            this._loadFileSettings(id);

            this.files[id] = this.files[id] || {};

            if (!this.files[id][name] || this.settings.connection.noFileCache || options.noFileCache) {
                const location = path.join(this.objectsDir, id, name);
                if (fs.existsSync(location)) {
                    // Create description object if not exists
                    this.fileOptions[id][name] = this.fileOptions[id][name] || {
                        acl: {
                            owner: (this.defaultNewAcl && this.defaultNewAcl.owner) || utils.CONSTS.SYSTEM_ADMIN_USER,
                            ownerGroup:
                                (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) ||
                                utils.CONSTS.SYSTEM_ADMIN_GROUP,
                            permissions:
                                (this.defaultNewAcl && this.defaultNewAcl.file.permissions) ||
                                utils.CONSTS.ACCESS_USER_ALL |
                                    utils.CONSTS.ACCESS_GROUP_ALL |
                                    utils.CONSTS.ACCESS_EVERY_ALL, // 777
                        },
                    };
                    if (typeof this.fileOptions[id][name] !== 'object') {
                        this.fileOptions[id][name] = {
                            mimeType: this.fileOptions[id][name],
                            acl: {
                                owner:
                                    (this.defaultNewAcl && this.defaultNewAcl.owner) || utils.CONSTS.SYSTEM_ADMIN_USER,
                                ownerGroup:
                                    (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) ||
                                    utils.CONSTS.SYSTEM_ADMIN_GROUP,
                                permissions:
                                    (this.defaultNewAcl && this.defaultNewAcl.file.permissions) ||
                                    utils.CONSTS.ACCESS_USER_ALL |
                                        utils.CONSTS.ACCESS_GROUP_ALL |
                                        utils.CONSTS.ACCESS_EVERY_ALL, // 777
                            },
                        };
                    }

                    this.files[id][name] = fs.readFileSync(location);
                    if (this.fileOptions[id][name].binary === undefined) {
                        const ext = path.extname(name);
                        const mimeType = utils.getMimeType(ext);
                        this.fileOptions[id][name].binary = mimeType.isBinary;
                        this.fileOptions[id][name].mimeType = mimeType.mimeType;
                    }

                    if (!this.fileOptions[id][name].binary) {
                        if (this.files[id][name]) {
                            this.files[id][name] = this.files[id][name].toString();
                        }
                    }
                } else {
                    if (this.fileOptions[id][name] !== undefined) {
                        delete this.fileOptions[id][name];
                    }
                    if (this.files[id][name] !== undefined) {
                        delete this.files[id][name];
                    }
                }
            }

            if (this.fileOptions[id][name] && !this.fileOptions[id][name].acl) {
                // all files belong to admin by default, but everyone can edit it
                this.fileOptions[id][name].acl = {
                    owner: (this.defaultNewAcl && this.defaultNewAcl.owner) || utils.CONSTS.SYSTEM_ADMIN_USER,
                    ownerGroup:
                        (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || utils.CONSTS.SYSTEM_ADMIN_GROUP,
                    permissions:
                        (this.defaultNewAcl && this.defaultNewAcl.file.permissions) ||
                        utils.CONSTS.ACCESS_USER_ALL | utils.CONSTS.ACCESS_GROUP_ALL | utils.CONSTS.ACCESS_EVERY_RW, // 776
                };
            }

            if (this.fileOptions[id][name] !== null && this.fileOptions[id][name] !== undefined) {
                if (!this.fileOptions[id][name].mimeType) {
                    const _ext = path.extname(name);
                    const _mimeType = utils.getMimeType(_ext);
                    this.fileOptions[id][name].mimeType = _mimeType.mimeType;
                }
                return {
                    fileContent: this.files[id][name],
                    fileMime: this.fileOptions[id][name].mimeType,
                };
            }
        } catch (e) {
            this.log.warn(`${this.namespace} Cannot read file ${id} / ${name}: ${e.message}`);
            throw e;
        }
        throw new Error(utils.ERRORS.ERROR_NOT_FOUND);
    }

    /**
     * Check if given object exists
     *
     * @param id id of the object
     * @returns if the object exists
     */
    // needed by server
    _objectExists(id) {
        if (!id || typeof id !== 'string') {
            throw new Error(`invalid id ${JSON.stringify(id)}`);
        }

        try {
            // check if the id exists
            return Object.prototype.hasOwnProperty.call(this.dataset, id);
        } catch (e) {
            this.log.error(`${this.namespace} Cannot check object existence of "${id}": ${e.message}`);
            throw new Error(`Cannot check object existence of "${id}": ${e.message}`);
        }
    }

    /**
     * Check if given file exists
     *
     * @param id id of the namespace
     * @param [name] name of the file
     * @returns
     */
    // needed by server
    _fileExists(id, name) {
        if (typeof name !== 'string') {
            name = '';
        }

        const location = path.join(this.objectsDir, id, name);

        try {
            const stat = fs.statSync(location);
            return stat.isFile();
        } catch (e) {
            if (e.code !== 'ENOENT') {
                this.log.error(`${this.namespace} Cannot check file existence of "${location}": ${e.message}`);
                throw new Error(`Cannot check file existence of "${location}": ${e.message}`);
            }
            return false;
        }
    }

    /**
     * Check if given directory exists
     *
     * @param id id of the namespace
     * @param [name] name of the directory
     * @returns
     */
    // special functionality only for Server (used together with SyncFileDirectory)
    dirExists(id, name) {
        if (typeof name !== 'string') {
            name = '';
        }

        const location = path.join(this.objectsDir, id, name);

        try {
            const stat = fs.statSync(location);
            return stat.isDirectory();
        } catch (e) {
            if (e.code !== 'ENOENT') {
                this.log.error(`${this.namespace} Cannot check directory existence of "${location}": ${e.message}`);
                throw new Error(`Cannot check directory existence of "${location}": ${e.message}`);
            }
            return false;
        }
    }

    // needed by server
    _unlink(id, name) {
        const _path = utils.sanitizePath(id, name);
        id = _path.id;
        name = _path.name;

        this._loadFileSettings(id);

        const location = path.join(this.objectsDir, id, name);
        if (fs.existsSync(location)) {
            const stat = fs.statSync(location);

            if (stat.isDirectory()) {
                // read all entries and delete every one
                fs.readdirSync(location).forEach(dir => this._unlink(id, `${name}/${dir}`));

                this.log.debug(`Delete directory ${path.join(id, name)}`);
                try {
                    fs.removeSync(location);
                } catch (e) {
                    this.log.error(`${this.namespace} Cannot delete directory "${path.join(id, name)}": ${e.message}`);
                    throw e;
                }

                if (this.fileOptions[id]) {
                    delete this.fileOptions[id];
                }
                if (this.files[id] && this.files[id]) {
                    delete this.files[id];
                }
            } else {
                this.log.debug(`Delete file ${path.join(id, name)}`);
                try {
                    fs.removeSync(location);
                } catch (e) {
                    this.log.error(`${this.namespace} Cannot delete file "${path.join(id, name)}": ${e.message}`);
                    throw e;
                }

                if (this.fileOptions[id][name]) {
                    delete this.fileOptions[id][name];
                }
                if (this.files[id] && this.files[id][name]) {
                    delete this.files[id][name];
                }

                // Store dir description
                this._saveFileSettings(id, true);
            }

            setImmediate(
                (id, name) => {
                    // publish event in states
                    this.log.silly(
                        `${this.namespace} memory publish ${id} ${JSON.stringify({ name, file: true, size: null })}`,
                    );
                    this.publishAll('files', `${id}$%$${name}`, null);
                },
                id,
                name,
            );
        }
    }

    // needed by server
    _readDir(id, name, options) {
        if (options && options.acl) {
            options.acl = null;
        }
        if ((id === '' || id === '/' || id === '*') && (name === '' || name === '*')) {
            // read root of xxx-data/files
        } else {
            const _path = utils.sanitizePath(id, name);
            id = _path.id;
            name = _path.name;
        }

        options = options || {};
        // Find all files and directories starts with name
        const _files = [];

        if (id && id === '*') {
            id = '';
        }
        if (name && name[name.length - 1] !== '/') {
            name += '/';
        }

        this._loadFileSettings(id);

        const len = name ? name.length : 0;
        for (const f of Object.keys(this.fileOptions[id])) {
            if (!name || f.substring(0, len) === name) {
                let rest = f.substring(len);
                rest = rest.split('/', 2);
                if (rest[0] && _files.indexOf(rest[0]) === -1) {
                    _files.push(rest[0]);
                }
            }
        }

        const location = path.join(this.objectsDir, id, name);
        if (fs.existsSync(location)) {
            const dirFiles = fs.readdirSync(location);
            for (let i = 0; i < dirFiles.length; i++) {
                if (dirFiles[i] === '..' || dirFiles[i] === '.') {
                    continue;
                }
                if (dirFiles[i] !== '_data.json' && _files.indexOf(dirFiles[i]) === -1) {
                    _files.push(dirFiles[i]);
                }
            }
        } else {
            throw new Error(utils.ERRORS.ERROR_NOT_FOUND);
        }

        _files.sort();
        const res = [];
        for (const file of _files) {
            if (file === '..' || file === '.') {
                continue;
            }
            if (fs.existsSync(path.join(location, file))) {
                try {
                    const stats = fs.statSync(path.join(location, file));
                    const acl =
                        this.fileOptions[id][name + file] && this.fileOptions[id][name + file].acl
                            ? deepClone(this.fileOptions[id][name + file].acl) // copy settings
                            : {
                                  read: true,
                                  write: true,
                                  owner:
                                      (this.defaultNewAcl && this.defaultNewAcl.owner) ||
                                      utils.CONSTS.SYSTEM_ADMIN_USER,
                                  ownerGroup:
                                      (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) ||
                                      utils.CONSTS.SYSTEM_ADMIN_GROUP,
                                  permissions:
                                      (this.defaultNewAcl && this.defaultNewAcl.file.permissions) ||
                                      utils.CONSTS.ACCESS_USER_RW |
                                          utils.CONSTS.ACCESS_GROUP_READ |
                                          utils.CONSTS.ACCESS_EVERY_READ,
                              };

                    // if filter for user
                    if (options.filter && acl) {
                        // If user may not write
                        if (!options.acl.file.write) {
                            // write
                            acl.permissions &= ~(
                                utils.CONSTS.ACCESS_USER_WRITE |
                                utils.CONSTS.ACCESS_GROUP_WRITE |
                                utils.CONSTS.ACCESS_EVERY_WRITE
                            );
                        }
                        // If user may not read
                        if (!options.acl.file.read) {
                            // read
                            acl.permissions &= ~(
                                utils.CONSTS.ACCESS_USER_READ |
                                utils.CONSTS.ACCESS_GROUP_READ |
                                utils.CONSTS.ACCESS_EVERY_READ
                            );
                        }

                        if (
                            options.user !== utils.CONSTS.SYSTEM_ADMIN_USER &&
                            options.groups.includes(utils.CONSTS.SYSTEM_ADMIN_GROUP)
                        ) {
                            if (acl.owner !== options.user) {
                                // Check if the user is in the group
                                if (options.groups.includes(acl.ownerGroup)) {
                                    // Check group rights
                                    if (!(acl.permissions & utils.CONSTS.ACCESS_GROUP_RW)) {
                                        continue;
                                    }
                                    acl.read = !!(acl.permissions & utils.CONSTS.ACCESS_GROUP_READ);
                                    acl.write = !!(acl.permissions & utils.CONSTS.ACCESS_GROUP_WRITE);
                                } else {
                                    // everybody
                                    if (!(acl.permissions & utils.CONSTS.ACCESS_EVERY_RW)) {
                                        continue;
                                    }
                                    acl.read = !!(acl.permissions & utils.CONSTS.ACCESS_EVERY_READ);
                                    acl.write = !!(acl.permissions & utils.CONSTS.ACCESS_EVERY_WRITE);
                                }
                            } else {
                                // Check user rights
                                if (!(acl.permissions & utils.CONSTS.ACCESS_USER_RW)) {
                                    continue;
                                }
                                acl.read = !!(acl.permissions & utils.CONSTS.ACCESS_USER_READ);
                                acl.write = !!(acl.permissions & utils.CONSTS.ACCESS_USER_WRITE);
                            }
                        } else {
                            acl.read = true;
                            acl.write = true;
                        }
                    }

                    res.push({
                        file,
                        stats: stats,
                        isDir: stats.isDirectory(),
                        acl: acl,
                        modifiedAt: this.fileOptions[id][name + file]
                            ? this.fileOptions[id][name + file].modifiedAt
                            : undefined,
                        createdAt: this.fileOptions[id][name + file]
                            ? this.fileOptions[id][name + file].createdAt
                            : undefined,
                    });
                } catch (e) {
                    this.log.error(
                        `${this.namespace} Cannot read permissions of ${path.join(this.objectsDir, id, name, file)}: ${
                            e.message
                        }`,
                    );
                }
            }
        }

        return res;
    }

    // needed by server
    _rename(id, oldName, newName) {
        const _path = utils.sanitizePath(id, oldName);
        id = _path.id;
        oldName = _path.name;
        if (newName[0] === '/') {
            newName = newName.substring(1);
        }

        this._loadFileSettings(id);

        if (fs.existsSync(path.join(this.objectsDir, id, oldName))) {
            fs.renameSync(path.join(this.objectsDir, id, oldName), path.join(this.objectsDir, id, newName));
        } else {
            throw new Error(utils.ERRORS.ERROR_NOT_FOUND);
        }

        Object.keys(this.fileOptions[id]).forEach(name => {
            const type = this.fileOptions[id][name];
            if (name.startsWith(oldName)) {
                delete this.fileOptions[id][name];
                this.fileOptions[id][name.replace(oldName, newName)] = type;
            }
        });
        Object.keys(this.files[id]).forEach(name => {
            const data = this.files[id][name];
            if (name.startsWith(oldName)) {
                delete this.files[id][name];
                this.files[id][name.replace(oldName, newName)] = data;
            }
        });
        this._saveFileSettings(id, true);
    }

    // internal functionality
    _clone(obj) {
        if (obj === null || obj === undefined || !tools.isObject(obj)) {
            return obj;
        }

        const temp = obj.constructor(); // changed

        for (const key of Object.keys(obj)) {
            temp[key] = this._clone(obj[key]);
        }
        return temp;
    }

    _subscribeMeta(client, pattern) {
        this.handleSubscribe(client, 'meta', pattern);
    }

    // needed by server
    _subscribeConfigForClient(client, pattern) {
        this.handleSubscribe(client, 'objects', pattern);
    }

    // needed by server
    _unsubscribeConfigForClient(client, pattern) {
        this.handleUnsubscribe(client, 'objects', pattern); // ignore options => unsubscribe may everyone
    }

    // needed by server
    _subscribeFileForClient(client, id, pattern) {
        if (Array.isArray(pattern)) {
            pattern.forEach(pattern => this.handleSubscribe(client, 'files', `${id}$%$${pattern}`));
        } else {
            this.handleSubscribe(client, 'files', `${id}$%$${pattern}`);
        }
    }

    // needed by server
    _unsubscribeFileForClient(client, id, pattern) {
        if (Array.isArray(pattern)) {
            pattern.forEach(pattern => this.handleUnsubscribe(client, 'files', `${id}$%$${pattern}`));
        } else {
            this.handleUnsubscribe(client, 'files', `${id}$%$${pattern}`);
        }
    }

    // needed by server
    _getObject(id) {
        return this.dataset[id];
    }

    // needed by server
    _getKeys(pattern) {
        const r = new RegExp(tools.pattern2RegEx(pattern));
        const result = Object.keys(this.dataset).filter(id => r.test(id) && id !== this.META_ID);
        result.sort();
        return result;
    }

    // needed by server
    _getObjects(keys) {
        if (!keys) {
            throw new Error('no keys');
        }

        return keys.map(id => this.dataset[id]);
    }

    _ensureMetaDict() {
        let meta = this.dataset[this.META_ID];
        if (!meta) {
            meta = {};
            this.dataset[this.META_ID] = meta;
        }
        return meta;
    }

    /**
     * Get value of given meta id
     *
     * @param id
     * @returns
     */
    getMeta(id) {
        const meta = this._ensureMetaDict();
        return meta[id];
    }

    /**
     * Sets given value to id in metaNamespace
     *
     * @param id
     * @param value
     */
    setMeta(id, value) {
        const meta = this._ensureMetaDict();
        meta[id] = value;
        // Make sure the object gets re-written, especially when using an external DB
        this.dataset[this.META_ID] = meta;

        setImmediate(() => {
            // publish event in states
            this.log.silly(`${this.namespace} memory publish meta ${id} ${value}`);
            this.publishAll('meta', id, value);
        });

        if (!this.stateTimer) {
            this.stateTimer = setTimeout(() => this.saveState(), this.writeFileInterval);
        }
    }

    // needed by server
    _setObjectDirect(id, obj) {
        this.dataset[id] = obj;

        // object updated -> if type changed to meta -> cache
        if (obj.type === 'meta' && this.existingMetaObjects[id] === false) {
            this.existingMetaObjects[id] = true;
        }

        setImmediate(() => this.publishAll('objects', id, obj));

        this.stateTimer = this.stateTimer || setTimeout(() => this.saveState(), this.writeFileInterval);
    }

    /**
     * Delete the given object from the dataset
     *
     * @param id unique id of the object
     */
    _delObject(id) {
        const obj = this.dataset[id];
        if (!obj) {
            // Not existent, so goal reached :-)
            return;
        }

        if (obj.common?.dontDelete) {
            throw new Error('Object is marked as non deletable');
        }

        delete this.dataset[id];

        // object has been deleted -> remove from cached meta if there
        if (this.existingMetaObjects[id]) {
            this.existingMetaObjects[id] = false;
        }

        setImmediate(() => this.publishAll('objects', id, null));

        if (!this.stateTimer) {
            this.stateTimer = setTimeout(() => this.saveState(), this.writeFileInterval);
        }
    }

    // internal functionality
    _applyView(func, params) {
        const result = {
            rows: [],
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function _emit_(id, obj) {
            result.rows.push({ id: id, value: obj });
        }

        const f = eval(`(${func.map.replace(/emit/g, '_emit_')})`);

        for (const [id, obj] of Object.entries(this.dataset)) {
            if (params) {
                if (params.startkey && id < params.startkey) {
                    continue;
                }
                if (params.endkey && id > params.endkey) {
                    continue;
                }
            }

            if (obj) {
                try {
                    f(obj);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot execute map: ${e.message}`);
                }
            }
        }
        // Calculate max
        if (func.reduce === '_stats') {
            let max = null;
            for (const row of result.rows) {
                if (max === null || row.value > max) {
                    max = row.value;
                }
            }
            if (max !== null) {
                result.rows = [{ id: '_stats', value: { max: max } }];
            } else {
                result.rows = [];
            }
        }

        return result;
    }

    // needed by server
    _getObjectView(design, search, params) {
        const designObj = this.dataset[`_design/${design}`];
        if (!designObj) {
            this.log.error(`${this.namespace} Cannot find view "${design}"`);
            throw new Error(`Cannot find view "${design}"`);
        }
        if (!(designObj.views && designObj.views[search])) {
            this.log.warn(`${this.namespace} Cannot find search "${search}" in "${design}"`);
            throw new Error(`Cannot find search "${search}" in "${design}"`);
        }
        return this._applyView(designObj.views[search], params);
    }

    /**
     * Destructor of the class. Called by shutting down.
     */
    async destroy() {
        await super.destroy();

        this._saveFileSettings(true);
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
