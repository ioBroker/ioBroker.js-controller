import fs from 'fs-extra';
import path from 'node:path';
import { EXIT_CODES, tools } from '@iobroker/js-controller-common';
import { exec as execAsync } from 'promisify-child-process';
import tar from 'tar';
import type { Client as StatesRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';
import { Upload } from './setupUpload.js';
import type { CleanDatabaseHandler, ProcessExitCallback, RestartController } from '../_Types.js';
import { dbConnectAsync, resetDbConnect } from './dbConnection.js';
import { IoBrokerError } from './customError.js';
import { CLIProcess } from '@/lib/cli/cliProcess.js';
import { open, writeFile } from 'node:fs/promises';

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
    exitCode: EXIT_CODES;
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

interface PreprocessObjectOptions {
    /** The hostname */
    hostname: string;
    /** The object to preprocess */
    object: ioBroker.Object;
    /** If the host has a custom hostname */
    isCustomHostname: boolean;
    /** String to check if it is a sub object or state of this host (will not match the host object directly) */
    thisHostNameStartsWith: string;
}

export interface RestoreBackupOptions {
    /** backup name, absolute path or index */
    name: string | number;
    /** if force flag is set, js-controller is allowed to have a different version */
    force: boolean;
    /** skip adapter deletion, e.g. for setup custom db migration */
    dontDeleteAdapters: boolean;
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
            fs.rmSync(path.join(this.tmpDir, 'backup'), { recursive: true, force: true });
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
            name = `${d.getFullYear()}_${`0${d.getMonth() + 1}`.slice(-2)}_${`0${d.getDate()}`.slice(-2)}-${`0${d.getHours()}`.slice(
                -2,
            )}_${`0${d.getMinutes()}`.slice(-2)}_${`0${d.getSeconds()}`.slice(-2)}_backup${tools.appName}`;
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

        const hostname = tools.getHostName();
        // String to check if it is a sub object or state of this host (will not match the host object directly)
        const thisHostNameStartsWith = `system.host.${hostname}.`;

        fs.ensureDirSync(this.bkpDir);
        fs.ensureDirSync(this.tmpDir);

        this.removeTempBackupDir();

        const backupBasePath = path.join(this.tmpDir, 'backup');
        fs.ensureDirSync(backupBasePath);
        fs.ensureDirSync(path.join(backupBasePath, 'files'));

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

        if (!noConfig && config) {
            await writeFile(path.join(backupBasePath, 'config.json'), JSON.stringify(config), { encoding: 'utf-8' });
        }

        const objectsFd = await open(path.join(backupBasePath, 'objects.jsonl'), 'a');

        try {
            const res = await this.objects.getObjectListAsync({ include_docs: true });
            for (const row of res.rows) {
                const preprocessedValue = await this._preprocessObject({
                    object: row.value,
                    isCustomHostname,
                    hostname,
                    thisHostNameStartsWith,
                });
                await objectsFd.write(`${JSON.stringify(preprocessedValue)}\n`);
            }

            console.log(`host.${hostname} ${res.rows.length || 'no'} objects saved`);
        } catch (e) {
            console.error(`host.${hostname} Cannot get objects: ${e.message}`);
        }

        await objectsFd.close();

        const statesFd = await open(path.join(backupBasePath, 'states.jsonl'), 'a');

        try {
            const keys = await this.states.getKeys('*');
            const objs = await this.states.getStates(keys!);

            if (keys) {
                for (let i = 0; i < keys.length; i++) {
                    const obj = objs[i];

                    if (!obj) {
                        continue;
                    }

                    if (!isCustomHostname) {
                        // if it's a default hostname, we will have a new default after restore and need to replace
                        if (obj.from === `system.host.${hostname}`) {
                            obj.from.replace(
                                `system.host.${hostname}`,
                                `system.host.${this.HOSTNAME_PLACEHOLDER_REPLACE}`,
                            );
                        }
                        if (keys[i].startsWith(thisHostNameStartsWith)) {
                            keys[i] = keys[i].replace(hostname, this.HOSTNAME_PLACEHOLDER_REPLACE);
                        }
                    }

                    await statesFd.write(`${JSON.stringify({ id: keys[i], state: obj })}\n`);
                }

                await statesFd.close();
                console.log(`host.${hostname} ${keys.length} states saved`);
            }
        } catch (e) {
            console.error(`host.${hostname} Cannot get states: ${e.message}`);
        }

        console.log(`host.${hostname} Validating backup ...`);
        try {
            await this._validateBackupAfterCreation();
            console.log(`host.${hostname} The backup is valid!`);

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
     * Helper to restore raw state
     *
     * @param stateId - state ID
     * @param stateObject - the corresponding state object
     */
    private async _setStateHelper(stateId: string, stateObject: ioBroker.State): Promise<void> {
        try {
            await this.states.setRawState(stateId, stateObject);
        } catch (e) {
            console.log(`host.${this.hostname} Could not set value for state ${stateId}: ${e.message}`);
        }
    }

    /**
     * Sets all objects to the db and disables all adapters
     *
     * @param object - object to be set
     */
    private async _setObjHelper(object: ioBroker.Object): Promise<void> {
        // Disable all adapters.
        if (
            !this.dbMigration &&
            object._id &&
            /^system\.adapter\..+\.\d$/.test(object._id) &&
            !object._id.startsWith('system.adapter.admin.') &&
            !object._id.startsWith('system.adapter.backitup.')
        ) {
            if (object.common?.enabled) {
                object.common.enabled = false;
            }
        }

        try {
            await this.objects.setObject(object._id, object);
        } catch (e) {
            console.warn(`host.${this.hostname} Cannot restore ${object._id}: ${e.message}`);
        }
    }

    /**
     * Creates all provided object if non-existing
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
                obj = await this.objects.getObject(object._id);
            } catch {
                // ignore
            }

            if (!obj) {
                // object not existing -> create it
                try {
                    await this.objects.setObject(object._id, object);
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
                path.join(controllerDir, '..', '..', 'node_modules', `${tools.appName.toLowerCase()}.js-controller`),
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

    /**
     * Preprocess object before storing it in the backup file
     *
     * @param options object and host information
     */
    private async _preprocessObject(options: PreprocessObjectOptions): Promise<ioBroker.Object> {
        const { object, isCustomHostname, hostname, thisHostNameStartsWith } = options;

        if (!object || !object._id || !object.common) {
            return object;
        }

        if (!isCustomHostname) {
            if (object._id.match(/^system\.adapter\.([\w\d_-]+).(\d+)$/) && object.common.host === hostname) {
                object.common.host = this.HOSTNAME_PLACEHOLDER;
                object.common.host = this.HOSTNAME_PLACEHOLDER;
            } else if (object._id.startsWith(thisHostNameStartsWith)) {
                object._id = object._id.replace(hostname, this.HOSTNAME_PLACEHOLDER_REPLACE);
            } else if (object._id === `system.host.${hostname}`) {
                object._id = `system.host.${this.HOSTNAME_PLACEHOLDER}`;
                object.common.name = object._id;
                object.common.hostname = this.HOSTNAME_PLACEHOLDER;
                if (object.native && object.native.os) {
                    object.native.os.hostname = this.HOSTNAME_PLACEHOLDER;
                }

                object.common.name = object._id;
                object.common.hostname = this.HOSTNAME_PLACEHOLDER;
                if (object.native?.os) {
                    object.native.os.hostname = this.HOSTNAME_PLACEHOLDER;
                }
            }
        }

        // Read all files
        if (object.type === 'meta' && object.common?.type === 'meta.user') {
            // do not process "xxx.0. " and "xxx.0."
            if (object._id.trim() === object._id && object._id[object._id.length - 1] !== '.') {
                await this.copyDir(object._id, '', `${this.tmpDir}/backup/files/${object._id}`);
            }
        }

        // Read all files
        if (object.type === 'instance' && object.common?.dataFolder) {
            let dataFolderPath = object.common.dataFolder;

            if (dataFolderPath[0] !== '/' && !dataFolderPath.match(/^\w:/)) {
                dataFolderPath = path.join(this.configDir, dataFolderPath);
            }

            if (fs.existsSync(dataFolderPath)) {
                try {
                    this.copyFolderRecursiveSync(dataFolderPath, `${this.tmpDir}/backup`);
                } catch (e) {
                    console.error(`host.${hostname} Could not backup "${dataFolderPath}" directory: ${e.message}`);
                    this.removeTempBackupDir();
                    throw new IoBrokerError({ message: e.message, code: EXIT_CODES.CANNOT_COPY_DIR });
                }
            }
        }

        return object;
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
                } catch (e) {
                    console.error(`Ignoring ${backupPath} because can not get file type: ${e.message}`);
                    return;
                }
                if (stat.isDirectory()) {
                    this.copyFolderRecursiveSync(backupPath, this.configDir);
                }
            });
        } catch (e) {
            console.error(`Ignoring ${backupDir} because can not read directory: ${e.message}`);
        }
    }

    /**
     * Restore JSONL backup after controller has been stopped
     *
     * @param options The restore options
     */
    private async _restoreJsonlBackup(options: RestoreAfterStopOptions): Promise<EXIT_CODES> {
        const { force, dontDeleteAdapters } = options;
        const hostname = tools.getHostName();

        const backupBaseDir = path.join(this.tmpDir, 'backup');

        const config: ioBroker.IoBrokerJson = await fs.readJSON(path.join(backupBaseDir, 'config.json'));
        const backupHostName = config.system?.hostname || hostname;

        // we need to find the host obj for the compatibility check
        const objFd = await open(path.join(backupBaseDir, 'objects.jsonl'));
        const rlObj = objFd.readLines();

        const hostObjArr: BackupObject[] = [];

        for await (let line of rlObj) {
            line = line.replace(this.HOSTNAME_PLACEHOLDER_REGEX, hostname);
            const obj: ioBroker.Object = JSON.parse(line);
            if (obj._id === `system.host.${backupHostName}`) {
                hostObjArr.push({ id: obj._id, value: obj });
                break;
            }
        }

        await objFd.close();

        // check that the same controller version is installed as it is contained in backup
        const exitCode = this._ensureCompatibility(controllerDir, backupHostName, hostObjArr, force);

        if (exitCode) {
            // we had an error
            return exitCode;
        }

        if (!dontDeleteAdapters) {
            // prevent having wrong versions of adapters
            await this._removeAllAdapters();
        }

        // restore ioBroker.json
        fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(config, null, 2));
        await this.connectToNewDatabase(config);

        console.log(`host.${hostname} Clear all objects and states...`);
        await this.cleanDatabase(false);
        console.log(`host.${hostname} done.`);

        const objectsFd = await open(path.join(backupBaseDir, 'objects.jsonl'));
        const rlObjects = objectsFd.readLines();

        let count = 0;

        for await (let line of rlObjects) {
            line = line.replace(this.HOSTNAME_PLACEHOLDER_REGEX, hostname);
            const obj: ioBroker.Object = JSON.parse(line);
            await this._setObjHelper(obj);
            count++;
        }

        console.log(`${count} objects restored.`);

        await objectsFd.close();

        const statesFd = await open(path.join(backupBaseDir, 'states.jsonl'));
        const rlStates = statesFd.readLines();

        count = 0;

        for await (let line of rlStates) {
            line = line.replace(this.HOSTNAME_PLACEHOLDER_REGEX, hostname);
            const state: {
                id: string;
                state: ioBroker.State;
            } = JSON.parse(line);
            await this._setStateHelper(state.id, state.state);
            count++;
        }

        console.log(`${count} states restored.`);

        await statesFd.close();

        return EXIT_CODES.NO_ERROR;
    }

    /**
     * Restore after controller has been stopped
     *
     * @param options The restore options
     */
    private async _restoreAfterStop(options: RestoreAfterStopOptions): Promise<EXIT_CODES> {
        const { force, restartOnFinish, dontDeleteAdapters } = options;

        const backupBaseDir = path.join(this.tmpDir, 'backup');
        const isJsonl = await fs.pathExists(path.join(backupBaseDir, 'config.json'));

        if (isJsonl) {
            const exitCode = await this._restoreJsonlBackup(options);
            if (exitCode !== EXIT_CODES.NO_ERROR) {
                return exitCode;
            }
        } else {
            const hostname = tools.getHostName();
            console.log(`host.${hostname} Restore legacy backup.`);

            // Open file
            let data = fs.readFileSync(path.join(backupBaseDir, 'backup.json'), 'utf8');
            // replace all hostnames of instances etc with the new host
            data = data.replace(this.HOSTNAME_PLACEHOLDER_REGEX, hostname);
            fs.writeFileSync(path.join(backupBaseDir, 'backup_.json'), data);
            let restore: Backup;
            try {
                restore = JSON.parse(data);
            } catch (e) {
                console.error(`Cannot parse "${path.join(backupBaseDir, 'backup_.json')}": ${e.message}`);
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
                force,
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

            for (let i = 0; i < restore.objects.length; i++) {
                await this._setObjHelper(restore.objects[i].value);
                if (i % 200 === 0) {
                    console.log(`host.${this.hostname} Processed ${i}/${restore.objects.length} objects`);
                }
            }

            console.log(`${restore.objects.length} objects restored.`);
            for (let i = 0; i < sList.length; i++) {
                const id = sList[i];
                await this._setStateHelper(id, restore.states[id]);
                if (i % 200 === 0) {
                    console.log(`host.${this.hostname} Processed ${i}/${sList.length} states`);
                }
            }

            console.log(`${sList.length} states restored.`);
        }

        // Load user files into DB
        await this._uploadUserFiles(path.join(backupBaseDir, 'files'));
        // reload objects of adapters (if some couldn't be removed - normally this shouldn't be necessary anymore)
        await this._reloadAdaptersObjects();
        // Reload host objects
        const packageIO = fs.readJSONSync(path.join(controllerDir, 'io-package.json'));
        await this._reloadAdapterObject(packageIO ? packageIO.objects : null);
        // copy all files into iob-data
        this._copyBackupedFiles(backupBaseDir);
        // reinstall preserve adapters
        await this._restorePreservedAdapters();

        if (force) {
            // js-controller version has changed (setup never called for this version)
            console.log('Forced restore - executing setup ...');
            try {
                await execAsync(
                    `"${process.execPath}" "${path.join(controllerDir, `${tools.appName.toLowerCase()}.js`)}" setup`,
                );
            } catch (e) {
                console.error(
                    `Could not execute "setup" command, please ensure "setup" is called before starting ioBroker: ${e.message}`,
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
     * Meant to be used after the configuration file has been overwritten
     *
     * @param config The new config, needed for logging purposes
     */
    private async connectToNewDatabase(config: ioBroker.IoBrokerJson): Promise<void> {
        console.log(
            `host.${this.hostname} Connecting to new DB "${config.states.type}/${config.objects.type}" (can take up to 20s) ...`,
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
        force: boolean,
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
                        `To restore the js-controller version of the backup, execute "npm i iobroker.js-controller@${hostObj.value.common.installedVersion} --omit=dev" inside your ioBroker directory`,
                    );
                    console.warn(
                        'If you really want to restore the backup with the current installed js-controller, execute the restore command with the --force flag',
                    );

                    return EXIT_CODES.CANNOT_RESTORE_BACKUP;
                }
                console.info('The current version of js-controller differs from the version in the backup.');
                console.info('The js-controller version of the backup can not be restored automatically.');
                console.info('Note, that your backup might differ in behavior due to this version change!');
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
        }
        return result;
    }

    /**
     * Validates the backup.json and all json files inside the backup after (in temporary directory), here we only abort if backup.json is corrupted
     */
    private async _validateBackupAfterCreation(): Promise<void> {
        const backupBaseDir = path.join(this.tmpDir, 'backup');
        await fs.readJSON(path.join(backupBaseDir, 'config.json'));

        if (!(await fs.pathExists(path.join(backupBaseDir, 'objects.jsonl')))) {
            throw new Error('Backup does not contain valid objects');
        }

        if (!(await fs.pathExists(path.join(backupBaseDir, 'states.jsonl')))) {
            throw new Error('Backup does not contain valid states');
        }

        await this._validateDatabaseFiles();

        // we check all other json files, we assume them as optional, because user created files may be no valid json
        try {
            this._checkDirectory(path.join(backupBaseDir, 'files'));
        } catch (e) {
            console.warn(`host.${this.hostname} One or more optional files are corrupted: ${e.message}`);
            console.warn(`host.${this.hostname} Please ensure that self-created JSON files are valid`);
        }
    }

    /**
     * Validate that the created JSONL files in the temporary directories are parseable
     */
    private async _validateDatabaseFiles(): Promise<void> {
        const backupBaseDir = path.join(this.tmpDir, 'backup');

        const objectsFd = await open(path.join(backupBaseDir, 'objects.jsonl'));
        const rlObjects = objectsFd.readLines();

        for await (const line of rlObjects) {
            try {
                JSON.parse(line);
            } catch (e) {
                throw new Error(`The "objects.jsonl" file is corrupted: ${e.message}`);
            }
        }

        await objectsFd.close();

        const statesFd = await open(path.join(backupBaseDir, 'states.jsonl'));
        const rlStates = statesFd.readLines();

        for await (const line of rlStates) {
            try {
                JSON.parse(line);
            } catch (e) {
                throw new Error(`The "states.jsonl" file is corrupted: ${e.message}`);
            }
        }

        await statesFd.close();
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
            return void this.processExit(EXIT_CODES.INVALID_ARGUMENTS);
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
                            `${backups[t]} or ${backups[t].replace(`_backup${tools.appName}.tar.gz`, '')} or ${t}`,
                        );
                    }
                } else {
                    console.log(`No existing backups. Create a backup, using "${tools.appName} backup" first`);
                }
                return void this.processExit(EXIT_CODES.INVALID_ARGUMENTS);
            }
            console.log(`host.${this.hostname} Using backup file ${name}`);
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
            return void this.processExit(EXIT_CODES.INVALID_ARGUMENTS);
        }

        if (fs.existsSync(`${this.tmpDir}/backup/backup.json`)) {
            fs.unlinkSync(`${this.tmpDir}/backup/backup.json`);
        }

        return new Promise(resolve => {
            tar.extract(
                {
                    file: name,
                    cwd: this.tmpDir,
                },
                undefined,
                err => {
                    if (err) {
                        console.error(`host.${this.hostname} Cannot extract from file "${name}": ${err.message}`);
                        return void this.processExit(EXIT_CODES.INVALID_ARGUMENTS);
                    }
                    if (!fs.existsSync(`${this.tmpDir}/backup/backup.json`)) {
                        console.error(
                            `host.${this.hostname} Validation failed. Cannot find extracted file from file "${this.tmpDir}/backup/backup.json"`,
                        );
                        return void this.processExit(EXIT_CODES.CANNOT_EXTRACT_FROM_ZIP);
                    }

                    console.log(`host.${this.hostname} Starting validation ...`);
                    let backupJSON;
                    try {
                        backupJSON = fs.readJSONSync(`${this.tmpDir}/backup/backup.json`);
                    } catch (err) {
                        console.error(
                            `host.${this.hostname} Backup corrupted. Backup ${name} does not contain a valid backup.json file: ${err.message}`,
                        );
                        this.removeTempBackupDir();

                        return void this.processExit(EXIT_CODES.CANNOT_EXTRACT_FROM_ZIP);
                    }

                    if (!backupJSON || !backupJSON.objects || !backupJSON.objects.length) {
                        console.error(`host.${this.hostname} Backup corrupted. Backup does not contain valid objects`);
                        try {
                            this.removeTempBackupDir();
                        } catch (e) {
                            console.error(
                                `host.${this.hostname} Cannot clear temporary backup directory: ${e.message}`,
                            );
                        }
                        return void this.processExit(EXIT_CODES.CANNOT_EXTRACT_FROM_ZIP);
                    }

                    console.log(`host.${this.hostname} backup.json OK`);

                    try {
                        this._checkDirectory(`${this.tmpDir}/backup/files`, true);
                        this.removeTempBackupDir();

                        resolve();
                    } catch (err) {
                        console.error(`host.${this.hostname} Backup corrupted: ${err.message}`);
                        return void this.processExit(EXIT_CODES.CANNOT_EXTRACT_FROM_ZIP);
                    }
                },
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
    async restoreBackup(options: RestoreBackupOptions): Promise<RestoreBackupReturnValue> {
        const { name: _name, dontDeleteAdapters, force } = options;

        let backups;
        let name = typeof _name === 'number' ? _name.toString() : _name;

        if (!name) {
            // List all available backups
            console.log('Please specify one of the backup names:');
            backups = this.listBackups();
            backups.sort((a, b) => (b > a ? 1 : b === a ? 0 : -1));
            if (backups.length) {
                backups.forEach((backup, i) =>
                    console.log(`${backup} or ${backup.replace(`_backup${tools.appName}.tar.gz`, '')} or ${i}`),
                );
            } else {
                console.warn('No backups found');
            }
            return { exitCode: EXIT_CODES.INVALID_ARGUMENTS, objects: this.objects, states: this.states };
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
                        console.log(`${backup} or ${backup.replace(`_backup${tools.appName}.tar.gz`, '')} or ${i}`),
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
            return { exitCode: EXIT_CODES.INVALID_ARGUMENTS, objects: this.objects, states: this.states };
        }

        const backupBasePath = path.join(this.tmpDir, 'backup');

        // delete /backup/backup.json
        if (fs.existsSync(path.join(backupBasePath, 'backup.json'))) {
            fs.unlinkSync(path.join(backupBasePath, 'backup.json'));
        }

        try {
            await tar.extract({
                file: name,
                cwd: this.tmpDir,
            });
        } catch (e) {
            console.error(`host.${this.hostname} Cannot extract from file "${name}": ${e.message}`);
            return { exitCode: EXIT_CODES.CANNOT_EXTRACT_FROM_ZIP, objects: this.objects, states: this.states };
        }

        if (
            !(await fs.pathExists(path.join(backupBasePath, 'backup.json'))) &&
            !(await fs.pathExists(path.join(backupBasePath, 'config.json')))
        ) {
            console.error(
                `host.${this.hostname} Cannot find extracted file "${path.join(backupBasePath, 'backup.json')}" or "${path.join(backupBasePath, 'config.json')}"`,
            );
            return { exitCode: EXIT_CODES.CANNOT_EXTRACT_FROM_ZIP, objects: this.objects, states: this.states };
        }

        await CLIProcess.stopJSController();
        const exitCode = await this._restoreAfterStop({
            restartOnFinish: false,
            force,
            dontDeleteAdapters,
        });

        this.removeTempBackupDir();

        return { exitCode, objects: this.objects, states: this.states };
    }

    /**
     * This method checks if adapter of PRESERVE_ADAPTERS exists, and re-installs them if this is the case
     */
    private async _restorePreservedAdapters(): Promise<void> {
        for (const adapterName of this.PRESERVE_ADAPTERS) {
            try {
                const adapterObj = await this.objects.getObject(`system.adapter.${adapterName}`);
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
