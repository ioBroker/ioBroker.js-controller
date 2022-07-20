/**
 *      Backup
 *
 *      Copyright 2013-2022 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common';
import path from 'path';
import { Upload } from './setupUpload';
import { EXIT_CODES } from '@iobroker/js-controller-common';
import cpPromise from 'promisify-child-process';
import tar from 'tar';
import type { Client as StatesRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';

const hostname = tools.getHostName();

const controllerDir = tools.getControllerDir();
const tmpDir = path.normalize(path.join(controllerDir, 'tmp'));
const bkpDir = path.normalize(path.join(controllerDir, 'backups'));

export interface CLIBackupRestoreOptions {
    dbMigration?: boolean;
    states: StatesRedisClient;
    objects: ObjectsRedisClient;
    processExit: (exitCode?: number) => void;
    cleanDatabase: (isDeleteDb: boolean) => any;
    restartController: () => void;
}

interface CreateBackupInternalResult {
    config?: null | Record<string, any>;
    objects: null | Omit<ioBroker.GetObjectListItem, 'doc'>[];
    states: Record<string, ioBroker.State>;
}

export class BackupRestore {
    private readonly objects: ObjectsRedisClient;
    private readonly states: StatesRedisClient;
    private readonly processExit: CLIBackupRestoreOptions['processExit'];
    private readonly restartController: CLIBackupRestoreOptions['restartController'];
    private readonly cleanDatabase: CLIBackupRestoreOptions['cleanDatabase'];
    private readonly dbMigration: boolean;
    /** these adapters will be reinstalled during restore, while others will be installed after next controller start */
    private readonly PRESERVE_ADAPTERS: string[];
    private readonly upload: Upload;
    private configParts: string[];
    private readonly configDir: string;

    constructor(options: CLIBackupRestoreOptions) {
        options = options || {};

        if (!options.states) {
            throw new Error('Invalid arguments: states is missing');
        }
        if (!options.objects) {
            throw new Error('Invalid arguments: objects is missing');
        }
        if (!options.processExit) {
            throw new Error('Invalid arguments: processExit is missing');
        }
        if (!options.cleanDatabase) {
            throw new Error('Invalid arguments: cleanDatabase is missing');
        }
        if (!options.restartController) {
            throw new Error('Invalid arguments: restartController is missing');
        }

        this.objects = options.objects;
        this.states = options.states;
        this.processExit = options.processExit;
        this.cleanDatabase = options.cleanDatabase;
        this.restartController = options.restartController;
        this.dbMigration = options.dbMigration || false;
        this.PRESERVE_ADAPTERS = ['admin', 'backitup'];

        this.upload = new Upload(options);

        this.configParts = tools.getConfigFileName().split('/');
        this.configParts.pop(); // remove *.json
        this.configDir = this.configParts.join('/'); // => name-data
    }

    // --------------------------------------- BACKUP ---------------------------------------------------
    private async _copyFile(id: string, srcPath: string, destPath: string): Promise<void> {
        try {
            // @ts-expect-error #1917
            const data = await this.objects.readFileAsync(id, srcPath);
            if (data) {
                if (data.data !== undefined) {
                    fs.writeFileSync(destPath, data.data);
                } else {
                    // @ts-expect-error #1917 revisit
                    fs.writeFileSync(destPath, data);
                }
            }
        } catch (err) {
            console.log(`Can not copy File ${id}${srcPath} to ${destPath}: ${err.message}`);
        }
    }

    async copyDir(id: string, srcPath: string, destPath: string): Promise<void> {
        !fs.existsSync(destPath) && fs.mkdirSync(destPath);

        try {
            // @ts-expect-error #1917
            const res = await this.objects.readDirAsync(id, srcPath);
            if (res) {
                for (const entry of res) {
                    if (entry.isDir) {
                        await this.copyDir(id, `${srcPath}/${entry.file}`, `${destPath}/${entry.file}`);
                    } else {
                        fs.ensureDirSync(destPath);
                        await this._copyFile(id, `${srcPath}/${entry.file}`, `${destPath}/${entry.file}`);
                    }
                }
            }
        } catch (err) {
            if (!err.message.includes('Not exists')) {
                console.warn(`Directory ${id}/${srcPath} cannot be copied: ${err}`);
            }
        }
    }

    static getBackupDir(): string {
        const dataDir = path.join(controllerDir, tools.getDefaultDataDir());

        const parts = dataDir.split('/');
        parts.pop(); // remove data or appName-data
        parts.pop();

        return path.normalize(`${parts.join('/')}/backups/`);
    }

    copyFileSync(source: string, target: string): void {
        let targetFile = target;

        try {
            // if target is a directory a new file with the same name will be created
            if (fs.existsSync(target)) {
                if (fs.statSync(target).isDirectory()) {
                    targetFile = path.join(target, path.basename(source));
                }
            }

            fs.writeFileSync(targetFile, fs.readFileSync(source));
        } catch (e) {
            console.error(`Could not copy ${targetFile} to ${source}: ${e.message}`);
        }
    }

    copyFolderRecursiveSync(source: string, target: string): void {
        let files = [];

        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }

        // check if folder needs to be created or integrated
        const targetFolder = path.join(target, path.basename(source));
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder);
        }

        // copy
        if (fs.existsSync(source) && fs.statSync(source).isDirectory()) {
            files = fs.readdirSync(source);
            files.forEach(file => {
                const curSource = path.join(source, file);
                if (!fs.existsSync(curSource)) {
                    return;
                }
                if (fs.statSync(curSource).isDirectory()) {
                    this.copyFolderRecursiveSync(curSource, targetFolder);
                } else {
                    this.copyFileSync(curSource, targetFolder);
                }
            });
        }
    }

    /**
     * Pack and compress the backup
     *
     * @param name - backup name
     */
    private _packBackup(name: string): Promise<string> {
        // 2021_10_25 BF (TODO): store letsencrypt files too
        const letsEncrypt = `${this.configDir}/letsencrypt`;
        if (fs.existsSync(letsEncrypt)) {
            this.copyFolderRecursiveSync(letsEncrypt, `${tmpDir}/backup`);
        }

        return new Promise(resolve => {
            const f = fs.createWriteStream(name);
            f.on('finish', () => {
                tools.rmdirRecursiveSync(`${tmpDir}/backup`);
                resolve(path.normalize(name));
            });

            f.on('error', err => {
                console.error(`host.${hostname} Cannot pack directory ${tmpDir}/backup: ${err.message}`);
                this.processExit(EXIT_CODES.CANNOT_GZIP_DIRECTORY);
            });

            try {
                tar.create({ gzip: true, cwd: `${tmpDir}/` }, ['backup']).pipe(f);
            } catch (err) {
                console.error(`host.${hostname} Cannot pack directory ${tmpDir}/backup: ${err.message}`);
                return void this.processExit(EXIT_CODES.CANNOT_GZIP_DIRECTORY);
            }
        });
    }

    /**
     * Creates backup and stores with given name
     *
     * @param name - name of the backup
     * @param noConfig - do not store configs
     */
    async createBackup(name: string, noConfig?: boolean): Promise<string | void> {
        if (!name) {
            const d = new Date();
            name =
                d.getFullYear() +
                '_' +
                ('0' + (d.getMonth() + 1)).slice(-2) +
                '_' +
                ('0' + d.getDate()).slice(-2) +
                '-' +
                ('0' + d.getHours()).slice(-2) +
                '_' +
                ('0' + d.getMinutes()).slice(-2) +
                '_' +
                ('0' + d.getSeconds()).slice(-2) +
                `_backup${tools.appName}`;
        }

        name = name.toString().replace(/\\/g, '/');
        if (!name.includes('/')) {
            const backupPath = BackupRestore.getBackupDir();

            // create directory if not exists
            if (!fs.existsSync(backupPath)) {
                fs.mkdirSync(backupPath);
            }

            if (!name.includes('.tar.gz')) {
                name = `${backupPath + name}.tar.gz`;
            } else {
                name = backupPath + name;
            }
        }

        let result: CreateBackupInternalResult | null = { objects: null, states: {} };

        const hostname = tools.getHostName();

        try {
            // @ts-expect-error #1917
            const res = await this.objects.getObjectListAsync({ include_docs: true });
            if (res) {
                // getObjectList returns value and doc as the same so filter out doc to reduce backup size
                result.objects = res.rows.map(entry => {
                    return {
                        id: entry.id,
                        value: entry.value
                    };
                });
            }
        } catch (e) {
            console.error(`host.${hostname} Cannot get objects: ${e.message}`);
        }

        if (!noConfig) {
            result.config = null;
        }

        if (!noConfig && fs.existsSync(tools.getConfigFileName())) {
            result.config = fs.readJSONSync(tools.getConfigFileName());
        }

        const r = new RegExp(`^system\\.host\\.${hostname}\\.(\\w+)$`);

        try {
            // @ts-expect-error #1917
            const keys = await this.states.getKeys('*');

            // NOTE for all "replace" with $$$$ ... result will be just $$
            // @ts-expect-error #1917
            const objs = await this.states.getStates(keys);

            // read iobroker.json
            let isCustomHostname;

            try {
                const config = await fs.readJSON(tools.getConfigFileName());
                // if a hostname is configured
                isCustomHostname = !!config.system.hostname;
            } catch (e) {
                console.error(`host.${hostname} Cannot read config file: ${e.message}`);
            }

            if (keys && objs) {
                for (let i = 0; i < keys.length; i++) {
                    const obj = objs[i];

                    if (!obj) {
                        continue;
                    }

                    if (!isCustomHostname) {
                        // if its a default hostname, we will have a new default after restore and need to replace
                        if (obj.from === `system.host.${hostname}` || r.test(obj.from)) {
                            obj.from.replace(`system.host.${hostname}`, 'system.host.$$$$__hostname__$$$$');
                        }
                        if (r.test(keys[i])) {
                            keys[i] = keys[i].replace(hostname, '$$$$__hostname__$$$$');
                        }
                    }
                    result.states[keys[i]] = obj;
                }

                console.log(`host.${hostname} ${keys.length} states saved`);
            }
        } catch (e) {
            console.error(`host.${hostname} Cannot get states: ${e.message}`);
        }

        if (!fs.existsSync(bkpDir)) {
            fs.mkdirSync(bkpDir);
        }
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }

        try {
            tools.rmdirRecursiveSync(`${tmpDir}/backup/`);
        } catch (e) {
            console.error(`host.${hostname} Cannot clear temporary backup directory: ${e.message}`);
        }

        if (!fs.existsSync(`${tmpDir}/backup`)) {
            fs.mkdirSync(`${tmpDir}/backup`);
        }
        if (!fs.existsSync(`${tmpDir}/backup/files`)) {
            fs.mkdirSync(`${tmpDir}/backup/files`);
        }

        // try to find user files
        if (result.objects) {
            for (const object of result.objects) {
                if (!object || !object.value || !object.value._id || !object.value.common) {
                    continue;
                }
                if (
                    object.value._id.match(/^system\.adapter\.([\w\d_-]+).(\d+)$/) &&
                    object.value.common.host === hostname
                ) {
                    object.value.common.host = '$$__hostname__$$';
                    if (object.value) {
                        object.value.common.host = '$$__hostname__$$';
                    }
                } else if (r.test(object.value._id)) {
                    object.value._id = object.value._id.replace(hostname, '$$$$__hostname__$$$$');
                    object.id = object.value._id;
                } else if (object.value._id === 'system.host.' + hostname) {
                    object.value._id = 'system.host.$$__hostname__$$';
                    object.value.common.name = object.value._id;
                    object.value.common.hostname = '$$__hostname__$$';
                    if (object.value.native && object.value.native.os) {
                        object.value.native.os.hostname = '$$__hostname__$$';
                    }
                    object.id = object.value._id;
                    if (object.value) {
                        object.value.common.name = object.value._id;
                        object.value.common.hostname = '$$__hostname__$$';
                        if (object.value.native && object.value.native.os) {
                            object.value.native.os.hostname = '$$__hostname__$$';
                        }
                    }
                }

                // Read all files
                if (object.value.type === 'meta' && object.value.common && object.value.common.type === 'meta.user') {
                    // do not process "xxx.0. " and "xxx.0."
                    if (object.id.trim() === object.id && object.id[object.id.length - 1] !== '.') {
                        await this.copyDir(object.id, '', `${tmpDir}/backup/files/${object.id}`);
                    }
                }

                // Read all files
                if (object.value.type === 'instance' && object.value.common && object.value.common.dataFolder) {
                    let dataFolderPath = object.value.common.dataFolder;

                    if (dataFolderPath[0] !== '/' && !dataFolderPath.match(/^\w:/)) {
                        dataFolderPath = path.join(this.configDir, dataFolderPath);
                    }

                    if (fs.existsSync(dataFolderPath)) {
                        this.copyFolderRecursiveSync(dataFolderPath, `${tmpDir}/backup`);
                    }
                }
            }
        }

        // special case: copy vis vis-common-user.css file
        try {
            // @ts-expect-error #1917
            const data = await this.objects.readFileAsync('vis', 'css/vis-common-user.css');
            if (data) {
                const dir = `${tmpDir}/backup/files/`;
                !fs.existsSync(`${dir}vis`) && fs.mkdirSync(`${dir}vis`);
                !fs.existsSync(`${dir}vis/css`) && fs.mkdirSync(`${dir}vis/css`);

                // @ts-expect-error #1917
                fs.writeFileSync(`${dir}vis/css/vis-common-user.css`, data.data !== undefined ? data.data : data);
            }
        } catch {
            // do not process 'css/vis-common-user.css'
        }

        console.log(`host.${hostname} ${result.objects?.length || 'no'} objects saved`);

        try {
            fs.writeFileSync(`${tmpDir}/backup/backup.json`, JSON.stringify(result, null, 2));
            result = null; // ... to allow GC to clean it up because no longer needed

            this._validateBackupAfterCreation();
            return await this._packBackup(name);
        } catch (err) {
            console.error(`host.${hostname} Backup not created: ${err.message}`);
            try {
                tools.rmdirRecursiveSync(`${tmpDir}/backup/`);
            } catch (e) {
                console.error(`host.${hostname} Cannot clear temporary backup directory: ${e.message}`);
            }
            return void this.processExit(EXIT_CODES.CANNOT_EXTRACT_FROM_ZIP);
        }
    }

    //--------------------------------------- RESTORE ---------------------------------------------------
    /**
     * Helper to restore raw states
     *
     * @param statesList - list of state ids
     * @param stateObjects - list of state objects
     */
    private async _setStateHelper(statesList: string[], stateObjects: ioBroker.State[]): Promise<void> {
        for (let i = 0; i < statesList.length; i++) {
            try {
                // @ts-expect-error #1917 TODO revisit after merge
                await this.states.setRawState(statesList[i], stateObjects[statesList[i]]);
            } catch (err) {
                console.log(`host.${hostname} Could not set value for state ${statesList[i]}: ${err.message}`);
            }
            if (i % 200 === 0) {
                console.log(`host.${hostname} Processed ${i}/${statesList.length} states`);
            }
        }
    }

    /**
     * Sets all objects to the db and disables all adapters
     *
     * @param _objects - array of all objects to be set
     */
    private async _setObjHelper(_objects: ioBroker.GetObjectListItem[]): Promise<void> {
        for (let i = 0; i < _objects.length; i++) {
            // Disable all adapters.
            if (
                !this.dbMigration &&
                _objects[i].id &&
                /^system\.adapter\..+\.\d$/.test(_objects[i].id) &&
                !_objects[i].id.startsWith('system.adapter.admin.') &&
                !_objects[i].id.startsWith('system.adapter.backitup.')
            ) {
                if (_objects[i].value.common?.enabled) {
                    _objects[i].value.common.enabled = false;
                }
            }

            try {
                await this.objects.setObjectAsync(_objects[i].id, _objects[i].value);
            } catch (err) {
                console.warn(`host.${hostname} Cannot restore ${_objects[i].id}: ${err.message}`);
            }

            if (i % 200 === 0) {
                console.log(`host.${hostname} Processed ${i}/${_objects.length} objects`);
            }
        }
    }

    /**
     * Creates all provided object if non existing
     *
     * @param objectList - list of objects to be created
     */
    private async _reloadAdapterObject(objectList: ioBroker.Object[]): Promise<void> {
        if (!Array.isArray(objectList)) {
            return;
        }

        for (const object of objectList) {
            let obj;
            try {
                obj = await this.objects.getObjectAsync(object._id);
            } catch {
                // ignore
            }

            if (!obj) {
                // object not existing -> create it
                try {
                    await this.objects.setObjectAsync(object._id, object);
                    console.log(`host.${hostname} object ${object._id} created`);
                } catch {
                    // ignore
                }
            }
        }
    }

    private async _reloadAdaptersObjects(): Promise<void> {
        const dirs: string[] = [];
        let _modules;
        let p = path.join(controllerDir, 'node_modules');

        if (fs.existsSync(p)) {
            if (!p.includes('js-controller')) {
                _modules = fs.readdirSync(p).filter(dir => fs.existsSync(`${p}/${dir}/io-package.json`));
                if (_modules) {
                    const regEx = new RegExp(`^${tools.appName}\\.`, 'i');
                    for (const module of _modules) {
                        if (regEx.test(module) && !dirs.includes(module.substring(tools.appName.length + 1))) {
                            dirs.push(module);
                        }
                    }
                }
            } else {
                p = path.join(controllerDir, '..', 'node_modules');
                if (fs.existsSync(p)) {
                    _modules = fs.readdirSync(p).filter(dir => fs.existsSync(`${p}/${dir}/io-package.json`));
                    if (_modules) {
                        const regEx = new RegExp(`^${tools.appName}\\.`, 'i');
                        for (const module of _modules) {
                            if (regEx.test(module) && !dirs.includes(module.substring(tools.appName.length + 1))) {
                                dirs.push(module);
                            }
                        }
                    }
                }
            }
        }

        // if installed as npm
        if (fs.existsSync(path.join(controllerDir, '..', '..', 'node_modules', `${tools.appName}.js-controller`))) {
            const p = path.join(controllerDir, '..');
            _modules = fs.readdirSync(p).filter(dir => fs.existsSync(`${p}/${dir}/io-package.json`));
            const regEx_ = new RegExp(`^${tools.appName}\\.`, 'i');
            for (const module of _modules) {
                // if starting from application name + '.'
                if (
                    regEx_.test(module) &&
                    // If not js-controller
                    module.substring(tools.appName.length + 1) !== 'js-controller' &&
                    !dirs.includes(module.substring(tools.appName.length + 1))
                ) {
                    dirs.push(module);
                }
            }
        }

        for (const dir of dirs) {
            const adapterName = dir.replace(/^iobroker\./i, '');
            await this.upload.uploadAdapter(adapterName, false, true);
            await this.upload.uploadAdapter(adapterName, true, true);

            let pkg = null;
            if (!dir) {
                console.error('Wrong');
            }
            const adapterDir = tools.getAdapterDir(adapterName);
            if (fs.existsSync(`${adapterDir}/io-package.json`)) {
                pkg = fs.readJSONSync(`${adapterDir}/io-package.json`);
            }

            if (pkg && pkg.objects && pkg.objects.length) {
                console.log(`host.${hostname} Setup "${dir}" adapter`);
                await this._reloadAdapterObject(pkg.objects);
            }
        }
    }

    private async _uploadUserFiles(root: string, uploadPath?: string) {
        uploadPath = uploadPath || '';
        if (!fs.existsSync(root)) {
            return;
        }
        const files = fs.readdirSync(root + uploadPath);
        for (const file of files) {
            const fName = path.join(root, uploadPath, file);
            if (!fs.existsSync(fName)) {
                continue;
            }
            const stat = fs.statSync(fName);
            if (stat.isDirectory()) {
                try {
                    await this._uploadUserFiles(root, `${uploadPath}/${file}`);
                } catch (err) {
                    console.error(`Error: ${err}`);
                }
            } else {
                const parts = uploadPath.split('/');
                const adapter = parts.splice(0, 2)[1];
                const _path = `${parts.join('/')}/${file}`;
                console.log(`host.${hostname} Upload user file "${adapter}/${_path}`);
                try {
                    await this.objects.writeFileAsync(adapter, _path, fs.readFileSync(`${root + uploadPath}/${file}`));
                } catch (err) {
                    console.error(`Error: ${err.message}`);
                }
            }
        }
    }

    private _copyBackupedFiles(backupDir: string) {
        try {
            if (!fs.existsSync(backupDir)) {
                console.log('No additional files to restore');
                return;
            }
            const dirs = fs.readdirSync(backupDir);

            dirs.forEach(dir => {
                if (dir === 'files') {
                    return;
                }
                const backupPath = path.join(backupDir, dir);
                let stat;
                try {
                    if (!fs.existsSync(backupPath)) {
                        return;
                    }
                    stat = fs.statSync(backupPath);
                } catch (err) {
                    console.error(`Ignoring ${backupPath} because can not get file type: ${err.message}`);
                    return;
                }
                if (stat.isDirectory()) {
                    this.copyFolderRecursiveSync(backupPath, this.configDir);
                }
            });
        } catch (err) {
            console.error(`Ignoring ${backupDir} because can not read directory: ${err.message}`);
        }
    }

    /**
     * Restore after controller has been stopped
     *
     * @param restartOnFinish - restart controller after restore
     * @param force - skip the controller version check
     * @param dontDeleteAdapters - skip adapter deletion, e.g. for setup custom db migration
     */
    private async _restoreAfterStop(
        restartOnFinish: boolean,
        force: boolean,
        dontDeleteAdapters: boolean
    ): Promise<number> {
        // Open file
        let data = fs.readFileSync(`${tmpDir}/backup/backup.json`, 'utf8');
        const hostname = tools.getHostName();
        // replace all hostnames of instances etc with the new host
        data = data.replace(/\$\$__hostname__\$\$/g, hostname);
        fs.writeFileSync(`${tmpDir}/backup/backup_.json`, data);
        let restore;
        try {
            restore = JSON.parse(data);
        } catch (err) {
            console.error(`Cannot parse "${tmpDir}/backup/backup_.json": ${err.message}`);
            return EXIT_CODES.CANNOT_RESTORE_BACKUP;
        }

        // check that the same controller version is installed as it is contained in backup
        const exitCode = this._ensureCompatibility(
            controllerDir,
            restore.config ? restore.config.system.hostname || hostname : hostname,
            restore.objects,
            force
        );

        if (exitCode) {
            // we had an error
            return exitCode;
        }

        if (!dontDeleteAdapters) {
            // prevent having wrong versions of adapters
            await this._removeAllAdapters();
        }

        // stop all adapters
        console.log(`host.${hostname} Clear all objects and states...`);
        await this.cleanDatabase(false);
        console.log(`host.${hostname} done.`);
        // upload all data into DB
        // restore ioBroker.json
        if (restore.config) {
            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(restore.config, null, 2));
        }

        const sList = Object.keys(restore.states);

        await this._setObjHelper(restore.objects);
        console.log(`${restore.objects.length} objects restored.`);
        await this._setStateHelper(sList, restore.states);
        console.log(`${sList.length} states restored.`);
        // Load user files into DB
        await this._uploadUserFiles(`${tmpDir}/backup/files`);
        // reload objects of adapters (if some couldn't be removed - normally this shouldn't be necessary anymore)
        await this._reloadAdaptersObjects();
        // Reload host objects
        const packageIO = fs.readJSONSync(path.join(controllerDir, 'io-package.json'));
        await this._reloadAdapterObject(packageIO ? packageIO.objects : null);
        // copy all files into iob-data
        await this._copyBackupedFiles(path.join(tmpDir, 'backup'));
        // reinstall preserve adapters
        await this._restorePreservedAdapters();

        if (force) {
            // js-controller version has changed (setup never called for this version)
            console.log('Forced restore - executing setup ...');
            try {
                await cpPromise.exec(
                    `"${process.execPath}" "${path.join(controllerDir, `${tools.appName.toLowerCase()}.js`)}" setup`
                );
            } catch (e) {
                console.error(
                    `Could not execute "setup" command, please ensure "setup" is called before starting ioBroker: ${e.message}`
                );
            }
        }

        if (restartOnFinish) {
            this.restartController();
        }

        return EXIT_CODES.NO_ERROR;
    }

    /**
     * Removes all adapters
     */
    private async _removeAllAdapters(): Promise<void> {
        const nodeModulePath = path.join(controllerDir, '..');
        const nodeModuleDirs = fs.readdirSync(nodeModulePath, { withFileTypes: true });
        // we need to uninstall current adapters to get exact the same system as before backup
        for (const dir of nodeModuleDirs) {
            if (
                dir.isDirectory() &&
                dir.name.startsWith(`${tools.appName.toLowerCase()}.`) &&
                dir.name !== `${tools.appName.toLowerCase()}.js-controller`
            ) {
                try {
                    const packJson = fs.readJsonSync(path.join(nodeModulePath, dir.name, 'package.json'));
                    console.log(`Removing current installation of ${packJson.name}`);
                    await tools.uninstallNodeModule(packJson.name);
                } catch {
                    // ignore
                }
            }
        }
    }

    /**
     * Ensure that installed controller version matches version in backup
     *
     * @param controllerDir - directory of js-controller
     * @param backupHostname - hostname in backup file
     * @param backupObjects - the objects contained in the backup
     * @param force - if force is true, only log
     */
    private _ensureCompatibility(
        controllerDir: string,
        backupHostname: string,
        backupObjects: ioBroker.GetObjectListItem[],
        force: boolean
    ): void | number {
        try {
            const ioPackJson = fs.readJsonSync(path.join(controllerDir, 'io-package.json'));
            const hostObj = backupObjects.find(obj => obj.id === `system.host.${backupHostname}`);

            if (!hostObj) {
                console.error('No host object found, your backup seems to be corrupted!');
                return EXIT_CODES.CANNOT_RESTORE_BACKUP;
            }

            if (hostObj.value.common.installedVersion !== ioPackJson.common.version) {
                if (!force) {
                    console.warn('The current version of js-controller differs from the version in the backup.');
                    console.warn('The js-controller version of the backup can not be restored automatically.');
                    console.warn(
                        `To restore the js-controller version of the backup, execute "npm i iobroker.js-controller@${hostObj.value.common.installedVersion} --production" inside your ioBroker directory`
                    );
                    console.warn(
                        'If you really want to restore the backup with the current installed js-controller, execute the restore command with the --force flag'
                    );

                    return EXIT_CODES.CANNOT_RESTORE_BACKUP;
                } else {
                    console.info('The current version of js-controller differs from the version in the backup.');
                    console.info('The js-controller version of the backup can not be restored automatically.');
                    console.info('Note, that your backup might differ in behavior due to this version change!');
                }
            }
        } catch {
            // ignore
        }
    }

    /**
     * Returns all backups as array
     */
    listBackups(): string[] {
        const dir = BackupRestore.getBackupDir();
        const result: string[] = [];
        if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                if (file.match(/\.tar\.gz$/i)) {
                    result.push(file);
                }
            }
            return result;
        } else {
            return result;
        }
    }

    /**
     * Validates the backup.json and all json files inside the backup after (in temporary directory), here we only abort if backup.json is corrupted
     */
    private _validateBackupAfterCreation() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const backupJSON = require(`${tmpDir}/backup/backup.json`);
        if (!backupJSON.objects || !backupJSON.objects.length) {
            throw new Error('Backup does not contain valid objects');
        }

        // we check all other json files, we assume them as optional, because user created files may be no valid json
        try {
            this._checkDirectory(`${tmpDir}/backup/files`);
        } catch (err) {
            console.warn(`host.${hostname} One or more optional files are corrupted: ${err.message}`);
            console.warn(`host.${hostname} Please ensure that self-created JSON files are valid`);
        }
    }

    /**
     * Validates the given backup.json and all json files in the backup, calls processExit afterwards
     * @param _name - index or name of the backup
     */
    validateBackup(_name: string | number): Promise<void> | undefined {
        let backups;
        let name = typeof _name === 'number' ? _name.toString() : _name;

        if (!name) {
            backups = this.listBackups();
            backups.sort((a, b) => (b > a ? 1 : b === a ? 0 : -1));
            if (backups.length) {
                // List all available backups
                console.log('Please specify one of the backup names:');

                for (const t in backups) {
                    console.log(`${backups[t]} or ${backups[t].replace(`_backup${tools.appName}.tar.gz`, '')} or ${t}`);
                }
            } else {
                console.warn(`No backups found. Create a backup, using "${tools.appName} backup" first`);
            }
            return void this.processExit(10);
        }
        // If number
        if (parseInt(name, 10).toString() === name.toString()) {
            backups = this.listBackups();
            backups.sort((a, b) => (b > a ? 1 : b === a ? 0 : -1));
            name = backups[parseInt(name, 10)];
            if (!name) {
                console.log('No matching backup found');
                if (backups.length) {
                    console.log('Please specify one of the backup names:');
                    for (const t in backups) {
                        console.log(
                            `${backups[t]} or ${backups[t].replace(`_backup${tools.appName}.tar.gz`, '')} or ${t}`
                        );
                    }
                } else {
                    console.log(`No existing backups. Create a backup, using "${tools.appName} backup" first`);
                }
                return void this.processExit(10);
            } else {
                console.log(`host.${hostname} Using backup file ${name}`);
            }
        }

        name = name.toString().replace(/\\/g, '/');
        if (!name.includes('/')) {
            name = BackupRestore.getBackupDir() + name;
            const regEx = new RegExp(`_backup${tools.appName}`, 'i');
            if (!regEx.test(name)) {
                name += `_backup${tools.appName}`;
            }
            if (!name.match(/\.tar\.gz$/i)) {
                name += '.tar.gz';
            }
        }
        if (!fs.existsSync(name)) {
            console.error(`host.${hostname} Cannot find ${name}`);
            return void this.processExit(11);
        }

        if (fs.existsSync(`${tmpDir}/backup/backup.json`)) {
            fs.unlinkSync(`${tmpDir}/backup/backup.json`);
        }

        return new Promise(resolve => {
            tar.extract(
                {
                    file: name,
                    cwd: tmpDir
                },
                undefined,
                err => {
                    if (err) {
                        console.error(`host.${hostname} Cannot extract from file "${name}": ${err.message}`);
                        return void this.processExit(9);
                    }
                    if (!fs.existsSync(`${tmpDir}/backup/backup.json`)) {
                        console.error(
                            `host.${hostname} Validation failed. Cannot find extracted file from file "${tmpDir}/backup/backup.json"`
                        );
                        return void this.processExit(9);
                    }

                    console.log(`host.${hostname} Starting validation ...`);
                    let backupJSON;
                    try {
                        backupJSON = require(`${tmpDir}/backup/backup.json`);
                    } catch (err) {
                        console.error(
                            `host.${hostname} Backup corrupted. Backup ${name} does not contain a valid backup.json file: ${err.message}`
                        );
                        try {
                            tools.rmdirRecursiveSync(`${tmpDir}/backup/`);
                        } catch (e) {
                            console.error(`host.${hostname} Cannot clear temporary backup directory: ${e.message}`);
                        }
                        return void this.processExit(26);
                    }

                    if (!backupJSON || !backupJSON.objects || !backupJSON.objects.length) {
                        console.error(`host.${hostname} Backup corrupted. Backup does not contain valid objects`);
                        try {
                            tools.rmdirRecursiveSync(`${tmpDir}/backup/`);
                        } catch (e) {
                            console.error(`host.${hostname} Cannot clear temporary backup directory: ${e.message}`);
                        }
                        return void this.processExit(26);
                    }

                    console.log(`host.${hostname} backup.json OK`);

                    try {
                        this._checkDirectory(`${tmpDir}/backup/files`, true);
                        try {
                            tools.rmdirRecursiveSync(`${tmpDir}/backup/`);
                        } catch (e) {
                            console.error(`host.${hostname} Cannot clear temporary backup directory: ${e.message}`);
                        }
                        resolve();
                    } catch (err) {
                        console.error(`host.${hostname} Backup corrupted: ${err.message}`);
                        return void this.processExit(26);
                    }
                }
            );
        });
    }

    /**
     * Checks a directory for json files and validates them, steps down recursive in subdirectories
     * @param path - path to the directory
     * @param verbose - if logging should be verbose
     */
    private _checkDirectory(path: string, verbose = false): void {
        if (fs.existsSync(path)) {
            const files = fs.readdirSync(path);
            if (!files.length) {
                return;
            }
            for (const file of files) {
                const filePath = `${path}/${file}`;
                if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
                    // if directory then check it
                    this._checkDirectory(filePath, verbose);
                } else if (file.endsWith('.json')) {
                    try {
                        require(filePath);
                        if (verbose) {
                            console.log(`host.${hostname} ${file} OK`);
                        }
                    } catch {
                        throw new Error(`host.${hostname} ${filePath} is not a valid json file`);
                    }
                }
            }
        }
    }

    /**
     * Restores a backup
     *
     * @param _name - backup name or index
     * @param force - if force, js-controller is allowed to have a different version
     * @param dontDeleteAdapters - skip adapter deletion, e.g. for setup custom db migration
     * @param callback
     */
    restoreBackup(
        _name: string | number,
        force: boolean,
        dontDeleteAdapters: boolean,
        callback: (exitCode: number) => void
    ): void {
        let backups;
        let name = typeof _name === 'number' ? _name.toString() : _name;

        if (!name) {
            // List all available backups
            console.log('Please specify one of the backup names:');
            backups = this.listBackups();
            backups.sort((a, b) => (b > a ? 1 : b === a ? 0 : -1));
            if (backups.length) {
                backups.forEach((backup, i) =>
                    console.log(`${backup} or ${backup.replace(`_backup${tools.appName}.tar.gz`, '')} or ${i}`)
                );
            } else {
                console.warn('No backups found');
            }
            return void this.processExit(10);
        }

        if (!this.cleanDatabase) {
            throw new Error('Invalid arguments: cleanDatabase is missing');
        }
        if (!this.restartController) {
            throw new Error('Invalid arguments: restartController is missing');
        }

        // If number
        if (parseInt(name, 10).toString() === name.toString()) {
            backups = this.listBackups();
            backups.sort((a, b) => (b > a ? 1 : b === a ? 0 : -1));
            name = backups[parseInt(name, 10)];
            if (!name) {
                console.log('No matching backup found');
                if (backups.length) {
                    console.log('Please specify one of the backup names:');
                    backups.forEach((backup, i) =>
                        console.log(`${backup} or ${backup.replace(`_backup${tools.appName}.tar.gz`, '')} or ${i}`)
                    );
                }
            } else {
                console.log(`host.${hostname} Using backup file ${name}`);
            }
        }

        name = name.toString().replace(/\\/g, '/');
        if (!name.includes('/')) {
            name = BackupRestore.getBackupDir() + name;
            const regEx = new RegExp(`_backup${tools.appName}`, 'i');
            if (!regEx.test(name)) {
                name += '_backup' + tools.appName;
            }
            if (!name.match(/\.tar\.gz$/i)) {
                name += '.tar.gz';
            }
        }
        if (!fs.existsSync(name)) {
            console.error(`host.${hostname} Cannot find ${name}`);
            return void this.processExit(11);
        }

        // delete /backup/backup.json
        fs.existsSync(`${tmpDir}/backup/backup.json`) && fs.unlinkSync(`${tmpDir}/backup/backup.json`);

        tar.extract(
            {
                file: name,
                cwd: tmpDir
            },
            undefined,
            err => {
                if (err) {
                    console.error(`host.${hostname} Cannot extract from file "${name}": ${err.message}`);
                    return void this.processExit(9);
                }
                if (!fs.existsSync(`${tmpDir}/backup/backup.json`)) {
                    console.error(
                        `host.${hostname} Cannot find extracted file from file "${tmpDir}/backup/backup.json"`
                    );
                    return void this.processExit(9);
                }
                // Stop controller
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const daemon = require('daemonize2').setup({
                    main: path.join(controllerDir, 'controller.js'),
                    name: `${tools.appName} controller`,
                    pidfile: path.join(controllerDir, `${tools.appName}.pid`),
                    cwd: controllerDir,
                    stopTimeout: 1000
                });
                daemon.on('error', async () => {
                    const exitCode = await this._restoreAfterStop(false, force, dontDeleteAdapters);
                    callback && callback(exitCode);
                });
                daemon.on('stopped', async () => {
                    const exitCode = await this._restoreAfterStop(true, force, dontDeleteAdapters);
                    callback && callback(exitCode);
                });
                daemon.on('notrunning', async () => {
                    console.log(`host.${hostname} OK.`);
                    const exitCode = await this._restoreAfterStop(false, force, dontDeleteAdapters);
                    callback && callback(exitCode);
                });

                daemon.stop();
            }
        );
    }

    /**
     * This method checks if adapter of PRESERVE_ADAPTERS exist, and reinstalls them if this is the case
     */
    private async _restorePreservedAdapters(): Promise<void> {
        for (const adapterName of this.PRESERVE_ADAPTERS) {
            try {
                const adapterObj = await this.objects.getObjectAsync(`system.adapter.${adapterName}`);
                if (adapterObj && adapterObj.common && adapterObj.common.version) {
                    let installSource;
                    // @ts-expect-error https://github.com/ioBroker/adapter-core/issues/455
                    if (adapterObj.common.installedFrom) {
                        // @ts-expect-error https://github.com/ioBroker/adapter-core/issues/455
                        installSource = adapterObj.common.installedFrom;
                    } else {
                        installSource = `${tools.appName.toLowerCase()}.${adapterName}@${adapterObj.common.version}`;
                    }

                    console.log(`Reinstalling adapter "${adapterName}" from "${installSource}"`);
                    await tools.installNodeModule(installSource);
                }
            } catch (e) {
                console.error(`Could not ensure existence of adapter "${adapterName}": ${e.message}`);
            }
        }
    }
}
