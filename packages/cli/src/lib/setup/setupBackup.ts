import fs from 'fs-extra';
import { EXIT_CODES, tools } from '@iobroker/js-controller-common';
import path from 'node:path';
import { Upload } from './setupUpload.js';
import { exec as execAsync } from 'promisify-child-process';
import tar from 'tar';
import type { Client as StatesRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';
import type { CleanDatabaseHandler, ProcessExitCallback, RestartController } from '../_Types.js';
import { dbConnectAsync, resetDbConnect } from './dbConnection.js';
import { IoBrokerError } from './customError.js';

export interface CLIBackupRestoreOptions {
    dbMigration?: boolean;
    states: StatesRedisClient;
    objects: ObjectsRedisClient;
    processExit: ProcessExitCallback;
    cleanDatabase: CleanDatabaseHandler;
    restartController: RestartController;
}

type BackupObject = Omit<ioBroker.GetObjectListItem<ioBroker.Object>, 'doc'>;

export interface RestoreBackupReturnValue {
    /** Exit code of the process */
    exitCode: number;
    /** The new states db connection after restore */
    states: StatesRedisClient;
    /** The new objects db connection after restore */
    objects: ObjectsRedisClient;
}

interface RestoreAfterStopOptions {
    /** restart controller after restore */
    restartOnFinish: boolean;
    /** skip the controller version check */
    force: boolean;
    /** skip adapter deletion, e.g. for setup custom db migration */
    dontDeleteAdapters: boolean;
}

interface Backup {
    config?: null | ioBroker.IoBrokerJson;
    objects: null | BackupObject[];
    states: Record<string, ioBroker.State>;
}

export interface RestoreBackupOptions {
    /** backup name, absolute path or index */
    name: string | number;
    /** if force flag is set, js-controller is allowed to have a different version */
    force: boolean;
    /** skip adapter deletion, e.g. for setup custom db migration */
    dontDeleteAdapters: boolean;
    callback: (res: RestoreBackupReturnValue) => void;
}

const controllerDir = tools.getControllerDir();

export class BackupRestore {
    private readonly hostname = tools.getHostName();
    private readonly tmpDir = path.normalize(path.join(controllerDir, 'tmp'));
    private readonly bkpDir = path.normalize(path.join(controllerDir, 'backups'));
    private objects: ObjectsRedisClient;
    private states: StatesRedisClient;
    private readonly processExit: CLIBackupRestoreOptions['processExit'];
    private readonly restartController: CLIBackupRestoreOptions['restartController'];
    private readonly cleanDatabase: CLIBackupRestoreOptions['cleanDatabase'];
    private readonly dbMigration: boolean;
    /** these adapters will be reinstalled during restore, while others will be installed after next controller start */
    private readonly PRESERVE_ADAPTERS = ['admin', 'backitup'] as const;
    private upload: Upload;
    private configParts: string[];
    private readonly configDir: string;
    /** Placeholder inserted during backup creation if no custom hostname defined */
    private readonly HOSTNAME_PLACEHOLDER = '$$__hostname__$$';
    /** Same as HOSTNAME_PLACEHOLDER but used in replace method */
    private readonly HOSTNAME_PLACEHOLDER_REPLACE = '$$$$__hostname__$$$$';
    /** Regex to replace all occurrences of the HOSTNAME_PLACEHOLDER */
    private readonly HOSTNAME_PLACEHOLDER_REGEX = /\$\$__hostname__\$\$/g;

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

        this.upload = new Upload(options);

        this.configParts = tools.getConfigFileName().split('/');
        this.configParts.pop(); // remove *.json
        this.configDir = this.configParts.join('/'); // => name-data
    }

    // --------------------------------------- BACKUP ---------------------------------------------------
    private async _copyFile(id: string, srcPath: string, destPath: string): Promise<void> {
        try {
            const data = await this.objects.readFile(id, srcPath);
            if (data) {
                fs.writeFileSync(destPath, data.file);
            }
        } catch (err) {
            console.log(`Can not copy File ${id}${srcPath} to ${destPath}: ${err.message}`);
        }
    }

    async copyDir(id: string, srcPath: string, destPath: string): Promise<void> {
        fs.ensureDirSync(destPath);

        try {
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

    /**
     * Get the directory where backups should be stored
     */
    static getBackupDir(): string {
        return path.join(tools.getRootDir(), 'backups/');
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
     * Removes the temporary backup directory, never throws
     */
    private removeTempBackupDir(): void {
        try {
            fs.rmSync(`${this.tmpDir}/backup`, { recursive: true, force: true });
        } catch (e) {
            console.error(`host.${this.hostname} Cannot clear temporary backup directory: ${e.message}`);
        }
    }

    /**
     * Pack and compress the backup
     *
     * @param name - backup name
     */
    private _packBackup(name: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const f = fs.createWriteStream(name);
            f.on('finish', () => {
                this.removeTempBackupDir();
                resolve(path.normalize(name));
            });

            f.on('error', e => {
                console.error(`host.${this.hostname} Cannot pack directory ${this.tmpDir}/backup: ${e.message}`);
                reject(new IoBrokerError({ message: e.message, code: EXIT_CODES.CANNOT_GZIP_DIRECTORY }));
            });

            try {
                tar.create({ gzip: true, cwd: `${this.tmpDir}/` }, ['backup']).pipe(f);
            } catch (e) {
                console.error(`host.${this.hostname} Cannot pack directory ${this.tmpDir}/backup: ${e.message}`);
                reject(new IoBrokerError({ message: e.message, code: EXIT_CODES.CANNOT_GZIP_DIRECTORY }));
            }
        });
    }

    /**
     * Creates backup and stores with given name
     *
     * @param name - name of the backup
     * @param noConfig - do not store configs (used by setup custom migration)
     */
    async createBackup(name: string, noConfig?: boolean): Promise<string> {
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
            fs.ensureDirSync(backupPath);

            if (!name.includes('.tar.gz')) {
                name = `${backupPath + name}.tar.gz`;
            } else {
                name = backupPath + name;
            }
        }

        let result: Backup | null = { objects: null, states: {} };

        const hostname = tools.getHostName();

        try {
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

        let isCustomHostname = false;
        let config: ioBroker.IoBrokerJson | undefined;

        // read iobroker.json
        try {
            config = (await fs.readJSON(tools.getConfigFileName())) as ioBroker.IoBrokerJson;
            // if a hostname is configured
            isCustomHostname = !!config.system.hostname;
        } catch (e) {
            console.error(`host.${hostname} Cannot read config file: ${e.message}`);
        }

        result.config = !noConfig && config ? config : null;

        const r = new RegExp(`^system\\.host\\.${hostname}\\.(\\w+)$`);

        try {
            const keys = await this.states.getKeys('*');
            const objs = await this.states.getStates(keys!);

            if (keys && objs) {
                for (let i = 0; i < keys.length; i++) {
                    const obj = objs[i];

                    if (!obj) {
                        continue;
                    }

                    if (!isCustomHostname) {
                        // if it's a default hostname, we will have a new default after restore and need to replace
                        if (obj.from === `system.host.${hostname}` || r.test(obj.from)) {
                            obj.from.replace(
                                `system.host.${hostname}`,
                                `system.host.${this.HOSTNAME_PLACEHOLDER_REPLACE}`
                            );
                        }
                        if (r.test(keys[i])) {
                            keys[i] = keys[i].replace(hostname, this.HOSTNAME_PLACEHOLDER_REPLACE);
                        }
                    }
                    result.states[keys[i]] = obj;
                }

                console.log(`host.${hostname} ${keys.length} states saved`);
            }
        } catch (e) {
            console.error(`host.${hostname} Cannot get states: ${e.message}`);
        }

        fs.ensureDirSync(this.bkpDir);
        fs.ensureDirSync(this.tmpDir);

        this.removeTempBackupDir();

        fs.ensureDirSync(`${this.tmpDir}/backup`);
        fs.ensureDirSync(`${this.tmpDir}/backup/files`);

        // try to find user files
        if (result.objects) {
            for (const object of result.objects) {
                if (!object?.value || !object.value._id || !object.value.common) {
                    continue;
                }

                if (!isCustomHostname) {
                    if (
                        object.value._id.match(/^system\.adapter\.([\w\d_-]+).(\d+)$/) &&
                        object.value.common.host === hostname
                    ) {
                        object.value.common.host = this.HOSTNAME_PLACEHOLDER;
                        if (object.value) {
                            object.value.common.host = this.HOSTNAME_PLACEHOLDER;
                        }
                    } else if (r.test(object.value._id)) {
                        object.value._id = object.value._id.replace(hostname, this.HOSTNAME_PLACEHOLDER_REPLACE);
                        object.id = object.value._id;
                    } else if (object.value._id === `system.host.${hostname}`) {
                        object.value._id = `system.host.${this.HOSTNAME_PLACEHOLDER}`;
                        object.value.common.name = object.value._id;
                        object.value.common.hostname = this.HOSTNAME_PLACEHOLDER;
                        if (object.value.native && object.value.native.os) {
                            object.value.native.os.hostname = this.HOSTNAME_PLACEHOLDER;
                        }
                        object.id = object.value._id;
                        if (object.value) {
                            object.value.common.name = object.value._id;
                            object.value.common.hostname = this.HOSTNAME_PLACEHOLDER;
                            if (object.value.native?.os) {
                                object.value.native.os.hostname = this.HOSTNAME_PLACEHOLDER;
                            }
                        }
                    }
                }

                // Read all files
                if (object.value.type === 'meta' && object.value.common?.type === 'meta.user') {
                    // do not process "xxx.0. " and "xxx.0."
                    if (object.id.trim() === object.id && object.id[object.id.length - 1] !== '.') {
                        await this.copyDir(object.id, '', `${this.tmpDir}/backup/files/${object.id}`);
                    }
                }

                // Read all files
                if (object.value.type === 'instance' && object.value.common?.dataFolder) {
                    let dataFolderPath = object.value.common.dataFolder;

                    if (dataFolderPath[0] !== '/' && !dataFolderPath.match(/^\w:/)) {
                        dataFolderPath = path.join(this.configDir, dataFolderPath);
                    }

                    if (fs.existsSync(dataFolderPath)) {
                        try {
                            this.copyFolderRecursiveSync(dataFolderPath, `${this.tmpDir}/backup`);
                        } catch (e) {
                            console.error(
                                `host.${hostname} Could not backup "${dataFolderPath}" directory: ${e.message}`
                            );
                            this.removeTempBackupDir();
                            throw new IoBrokerError({ message: e.message, code: EXIT_CODES.CANNOT_COPY_DIR });
                        }
                    }
                }
            }
        }

        console.log(`host.${hostname} ${result.objects?.length || 'no'} objects saved`);

        try {
            await fs.writeJSON(`${this.tmpDir}/backup/backup.json`, result, { spaces: 0 });
            result = null; // ... to allow GC to clean it up because no longer needed

            this._validateBackupAfterCreation();
            return await this._packBackup(name);
        } catch (e) {
            console.error(`host.${hostname} Backup not created: ${e.message}`);
            this.removeTempBackupDir();

            if (e instanceof IoBrokerError) {
                throw e;
            }

            throw new IoBrokerError({ message: e.message, code: EXIT_CODES.CANNOT_EXTRACT_FROM_ZIP });
        }
    }

    //--------------------------------------- RESTORE ---------------------------------------------------
    /**
     * Helper to restore raw states
     *
     * @param statesList - list of state ids
     * @param stateObjects - list of state objects
     */
    private async _setStateHelper(statesList: string[], stateObjects: Record<string, ioBroker.State>): Promise<void> {
        for (let i = 0; i < statesList.length; i++) {
            try {
                await this.states.setRawState(statesList[i], stateObjects[statesList[i]]);
            } catch (err) {
                console.log(`host.${this.hostname} Could not set value for state ${statesList[i]}: ${err.message}`);
            }
            if (i % 200 === 0) {
                console.log(`host.${this.hostname} Processed ${i}/${statesList.length} states`);
            }
        }
    }

    /**
     * Sets all objects to the db and disables all adapters
     *
     * @param _objects - array of all objects to be set
     */
    private async _setObjHelper(_objects: BackupObject[]): Promise<void> {
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
                console.warn(`host.${this.hostname} Cannot restore ${_objects[i].id}: ${err.message}`);
            }

            if (i % 200 === 0) {
                console.log(`host.${this.hostname} Processed ${i}/${_objects.length} objects`);
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
                    console.log(`host.${this.hostname} object ${object._id} created`);
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

        if (p.includes('js-controller')) {
            p = path.join(controllerDir, '..', 'node_modules');
        }

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

        // if installed as npm
        if (
            fs.existsSync(
                path.join(controllerDir, '..', '..', 'node_modules', `${tools.appName.toLowerCase()}.js-controller`)
            )
        ) {
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

            let pkg;

            if (!dir) {
                console.error('Wrong');
            }
            const adapterDir = tools.getAdapterDir(adapterName);
            if (fs.existsSync(`${adapterDir}/io-package.json`)) {
                pkg = fs.readJSONSync(`${adapterDir}/io-package.json`);
            }

            if (pkg?.objects?.length) {
                console.log(`host.${this.hostname} Setup "${dir}" adapter`);
                await this._reloadAdapterObject(pkg.objects);
            }
        }
    }

    private async _uploadUserFiles(root: string, uploadPath?: string): Promise<void> {
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
                console.log(`host.${this.hostname} Upload user file "${adapter}/${_path}`);
                try {
                    await this.objects.writeFileAsync(adapter, _path, fs.readFileSync(`${root + uploadPath}/${file}`));
                } catch (err) {
                    console.error(`Error: ${err.message}`);
                }
            }
        }
    }

    private _copyBackupedFiles(backupDir: string): void {
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
     * @param options The restore options
     */
    private async _restoreAfterStop(options: RestoreAfterStopOptions): Promise<number> {
        const { force, restartOnFinish, dontDeleteAdapters } = options;

        // Open file
        let data = fs.readFileSync(`${this.tmpDir}/backup/backup.json`, 'utf8');
        const hostname = tools.getHostName();
        // replace all hostnames of instances etc with the new host
        data = data.replace(this.HOSTNAME_PLACEHOLDER_REGEX, hostname);
        fs.writeFileSync(`${this.tmpDir}/backup/backup_.json`, data);
        let restore: Backup;
        try {
            restore = JSON.parse(data);
        } catch (err) {
            console.error(`Cannot parse "${this.tmpDir}/backup/backup_.json": ${err.message}`);
            return EXIT_CODES.CANNOT_RESTORE_BACKUP;
        }

        if (!restore.objects) {
            console.error('The backup does not contain any objects.');
            return EXIT_CODES.CANNOT_RESTORE_BACKUP;
        }

        // check that the same controller version is installed as it is contained in backup
        const exitCode = this._ensureCompatibility(
            controllerDir,
            restore.config?.system?.hostname || hostname,
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

        // restore ioBroker.json
        if (restore.config) {
            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(restore.config, null, 2));
            await this.connectToNewDatabase(restore.config);
        }

        console.log(`host.${hostname} Clear all objects and states...`);
        await this.cleanDatabase(false);
        console.log(`host.${hostname} done.`);

        const sList = Object.keys(restore.states);

        await this._setObjHelper(restore.objects);
        console.log(`${restore.objects.length} objects restored.`);
        await this._setStateHelper(sList, restore.states);
        console.log(`${sList.length} states restored.`);
        // Load user files into DB
        await this._uploadUserFiles(`${this.tmpDir}/backup/files`);
        // reload objects of adapters (if some couldn't be removed - normally this shouldn't be necessary anymore)
        await this._reloadAdaptersObjects();
        // Reload host objects
        const packageIO = fs.readJSONSync(path.join(controllerDir, 'io-package.json'));
        await this._reloadAdapterObject(packageIO ? packageIO.objects : null);
        // copy all files into iob-data
        await this._copyBackupedFiles(path.join(this.tmpDir, 'backup'));
        // reinstall preserve adapters
        await this._restorePreservedAdapters();

        if (force) {
            // js-controller version has changed (setup never called for this version)
            console.log('Forced restore - executing setup ...');
            try {
                await execAsync(
                    `"${process.execPath}" "${path.join(controllerDir, `${tools.appName.toLowerCase()}.js`)}" setup`
                );
            } catch (e) {
                console.error(
                    `Could not execute "setup" command, please ensure "setup" is called before starting ioBroker: ${e.message}`
                );
            }
        }

        if (restartOnFinish) {
            console.log('restart');
            this.restartController();
        }

        return EXIT_CODES.NO_ERROR;
    }

    /**
     * Connects to the database which is configured in `iobroker.json`
     * Meant to be used after configuration file has been overwritten
     *
     * @param config The new config, needed for logging purposes
     */
    private async connectToNewDatabase(config: ioBroker.IoBrokerJson): Promise<void> {
        console.log(
            `host.${this.hostname} Connecting to new DB "${config.states.type}/${config.objects.type}" (can take up to 20s) ...`
        );
        await resetDbConnect();
        const { objects, states } = await dbConnectAsync(false);
        console.log(`host.${this.hostname} Successfully connected to new DB`);

        this.upload = new Upload({ states, objects });

        this.objects = objects;
        this.states = states;
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
        backupObjects: BackupObject[],
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
                        `To restore the js-controller version of the backup, execute "npm i iobroker.js-controller@${hostObj.value.common.installedVersion} --omit=dev" inside your ioBroker directory`
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
    private _validateBackupAfterCreation(): void {
        const backupJSON = fs.readJSONSync(`${this.tmpDir}/backup/backup.json`);
        if (!backupJSON.objects || !backupJSON.objects.length) {
            throw new Error('Backup does not contain valid objects');
        }

        // we check all other json files, we assume them as optional, because user created files may be no valid json
        try {
            this._checkDirectory(`${this.tmpDir}/backup/files`);
        } catch (err) {
            console.warn(`host.${this.hostname} One or more optional files are corrupted: ${err.message}`);
            console.warn(`host.${this.hostname} Please ensure that self-created JSON files are valid`);
        }
    }

    /**
     * Validates the given backup.json and all json files in the backup, calls processExit afterwards
     *
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
                console.log(`host.${this.hostname} Using backup file ${name}`);
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
            console.error(`host.${this.hostname} Cannot find ${name}`);
            return void this.processExit(11);
        }

        if (fs.existsSync(`${this.tmpDir}/backup/backup.json`)) {
            fs.unlinkSync(`${this.tmpDir}/backup/backup.json`);
        }

        return new Promise(resolve => {
            tar.extract(
                {
                    file: name,
                    cwd: this.tmpDir
                },
                undefined,
                err => {
                    if (err) {
                        console.error(`host.${this.hostname} Cannot extract from file "${name}": ${err.message}`);
                        return void this.processExit(9);
                    }
                    if (!fs.existsSync(`${this.tmpDir}/backup/backup.json`)) {
                        console.error(
                            `host.${this.hostname} Validation failed. Cannot find extracted file from file "${this.tmpDir}/backup/backup.json"`
                        );
                        return void this.processExit(9);
                    }

                    console.log(`host.${this.hostname} Starting validation ...`);
                    let backupJSON;
                    try {
                        backupJSON = fs.readJSONSync(`${this.tmpDir}/backup/backup.json`);
                    } catch (err) {
                        console.error(
                            `host.${this.hostname} Backup corrupted. Backup ${name} does not contain a valid backup.json file: ${err.message}`
                        );
                        this.removeTempBackupDir();

                        return void this.processExit(26);
                    }

                    if (!backupJSON || !backupJSON.objects || !backupJSON.objects.length) {
                        console.error(`host.${this.hostname} Backup corrupted. Backup does not contain valid objects`);
                        try {
                            this.removeTempBackupDir();
                        } catch (e) {
                            console.error(
                                `host.${this.hostname} Cannot clear temporary backup directory: ${e.message}`
                            );
                        }
                        return void this.processExit(26);
                    }

                    console.log(`host.${this.hostname} backup.json OK`);

                    try {
                        this._checkDirectory(`${this.tmpDir}/backup/files`, true);
                        this.removeTempBackupDir();

                        resolve();
                    } catch (err) {
                        console.error(`host.${this.hostname} Backup corrupted: ${err.message}`);
                        return void this.processExit(26);
                    }
                }
            );
        });
    }

    /**
     * Checks a directory for json files and validates them, steps down recursive in subdirectories
     *
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
                        fs.readJSONSync(filePath);
                        if (verbose) {
                            console.log(`host.${this.hostname} ${file} OK`);
                        }
                    } catch {
                        throw new Error(`host.${this.hostname} ${filePath} is not a valid json file`);
                    }
                }
            }
        }
    }

    /**
     * Restores a backup
     *
     * @param options Restore options
     */
    restoreBackup(options: RestoreBackupOptions): void {
        const { name: _name, dontDeleteAdapters, force, callback } = options;

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
                console.log(`host.${this.hostname} Using backup file ${name}`);
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
            console.error(`host.${this.hostname} Cannot find ${name}`);
            return void this.processExit(11);
        }

        // delete /backup/backup.json
        if (fs.existsSync(`${this.tmpDir}/backup/backup.json`)) {
            fs.unlinkSync(`${this.tmpDir}/backup/backup.json`);
        }

        tar.extract(
            {
                file: name,
                cwd: this.tmpDir
            },
            undefined,
            async err => {
                if (err) {
                    console.error(`host.${this.hostname} Cannot extract from file "${name}": ${err.message}`);
                    return void this.processExit(9);
                }
                if (!fs.existsSync(`${this.tmpDir}/backup/backup.json`)) {
                    console.error(
                        `host.${this.hostname} Cannot find extracted file from file "${this.tmpDir}/backup/backup.json"`
                    );
                    return void this.processExit(9);
                }
                // Stop controller
                // @ts-expect-error not a ts module
                const daemon = (await import('daemonize2')).setup({
                    main: path.join(controllerDir, 'controller.js'),
                    name: `${tools.appName} controller`,
                    pidfile: path.join(controllerDir, `${tools.appName}.pid`),
                    cwd: controllerDir,
                    stopTimeout: 1_000
                });

                daemon.on('error', async () => {
                    const exitCode = await this._restoreAfterStop({
                        restartOnFinish: false,
                        force,
                        dontDeleteAdapters
                    });
                    callback && callback({ exitCode, objects: this.objects, states: this.states });
                });
                daemon.on('stopped', async () => {
                    const exitCode = await this._restoreAfterStop({
                        restartOnFinish: true,
                        force,
                        dontDeleteAdapters
                    });
                    callback && callback({ exitCode, objects: this.objects, states: this.states });
                });
                daemon.on('notrunning', async () => {
                    console.log(`host.${this.hostname} OK.`);
                    const exitCode = await this._restoreAfterStop({
                        restartOnFinish: false,
                        force,
                        dontDeleteAdapters
                    });
                    callback && callback({ exitCode, objects: this.objects, states: this.states });
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
                if (adapterObj?.common?.version) {
                    let installSource;
                    if (adapterObj.common.installedFrom) {
                        installSource = adapterObj.common.installedFrom;
                    } else {
                        installSource = `${tools.appName.toLowerCase()}.${adapterName}@${adapterObj.common.version}`;
                    }

                    console.log(`Reinstalling adapter "${adapterName}" from "${installSource}"`);
                    const res = await tools.installNodeModule(installSource);

                    if (!res.success) {
                        console.error(`Could not install adapter "${adapterName}" (${res.exitCode}): ${res.stderr}`);
                    }
                }
            } catch (e) {
                console.error(`Could not ensure existence of adapter "${adapterName}": ${e.message}`);
            }
        }
    }
}
