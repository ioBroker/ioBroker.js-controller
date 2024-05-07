/**
 *      States DB in memory - Server
 *
 *      Copyright 2013-2022 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

import fs from 'fs-extra';
import path from 'node:path';
import { tools } from '@iobroker/js-controller-common';
import type { InternalLogger } from '@iobroker/js-controller-common/tools';
import { createGzip } from 'node:zlib';
import type { RedisHandler } from '@/lib/redisHandler.js';

// settings = {
//    change:    function (id, state) {},
//    connected: function (nameOfServer) {},
//    logger: {
//           silly: function (msg) {},
//           debug: function (msg) {},
//           info:  function (msg) {},
//           warn:  function (msg) {},
//           error: function (msg) {}
//    },
//    connection: {
//           dataDir: 'relative path'
//    },
//    auth: null, //unused
//    secure: true/false,
//    certificates: as required by createServer
//    port: 9000,
//    host: localhost
// };
//

export interface ConnectionOptions {
    pass?: string;
    sentinelName?: string;
    /** array on sentinel */
    host: string | string[];
    /** array on sentinel */
    port: number | number[];
    options: Record<string, any>;
    maxQueue?: number;
    enhancedLogging?: boolean;
    backup?: BackupOptions;
    /** relative path to the data dir */
    dataDir: string;
}

type ChangeFunction = (id: string, state: any) => void;

export interface DbStatus {
    type: string;
    server: boolean;
}

interface BackupOptions {
    /** deactivates backup if true */
    disabled: boolean;
    /** minimum number of files */
    files: number;
    hours: number;
    /** minutes */
    period: number;
    path: string;
}

export interface DbOptions {
    backupDirName: string;
    fileName: string;
}

interface FileDbSettings {
    fileDB: DbOptions;
    jsonlDB: DbOptions;
    backup: BackupOptions;
    change?: ChangeFunction;
    connected: (nameOfServer: string) => void;
    logger: InternalLogger;
    connection: ConnectionOptions;
    /** unused */
    auth?: null;
    secure: boolean;
    /** as required by createServer TODO: if createServer is typed, add type */
    certificates: any;
    port: number;
    host: string;
    /** logging namespace */
    namespace?: string;
}

interface Subscription {
    pattern: string;
    regex: RegExp;
    options: any;
}

interface SubscriptionClient extends Partial<InstanceType<typeof RedisHandler>> {
    _subscribe?: Map<string, Subscription[]>;
}

interface SubscriptionClientRegex {
    /** The RegExp object */
    regex: RegExp;
    /** All clients for this regexp */
    clients: { client: SubscriptionClient; pattern: string }[];
}

interface AddRemoveRegexOptions {
    /** The type of subscription to remove */
    type: string;
    /** The pattern to remove */
    pattern: string;
    /** The client to remove */
    client: SubscriptionClient;
}

/** Nested map, outer map for type, inner for regexp */
type RegExpsClients = Map<string, Map<string, SubscriptionClientRegex>>;

/**
 * The parent of the class structure, which provides basic JSON storage
 * and general subscription and publish functionality
 */
export class InMemoryFileDB {
    /** Store all clients per RegExp */
    private regExps: RegExpsClients = new Map();
    private settings: FileDbSettings;
    private readonly change: ChangeFunction | undefined;
    protected dataset: Record<string, any>;
    private readonly namespace: string;
    private lastSave: null | number;
    private stateTimer: NodeJS.Timeout | null;
    private callbackSubscriptionClient: SubscriptionClient;
    private readonly dataDir: string;
    private readonly datasetName: string;
    private log: InternalLogger;
    private readonly backupDir: string;

    constructor(settings: FileDbSettings) {
        this.settings = settings || {};

        this.change = this.settings.change;

        this.dataset = {};

        this.namespace = this.settings.namespace || '';
        this.lastSave = null;
        this.callbackSubscriptionClient = {};

        this.settings.backup = this.settings.connection.backup || {
            disabled: false, // deactivates
            files: 24, // minimum number of files
            hours: 48, // hours
            period: 120, // minutes
            path: '' // use default path
        };

        this.dataDir = this.settings.connection.dataDir || tools.getDefaultDataDir();
        if (!path.isAbsolute(this.dataDir)) {
            this.dataDir = path.normalize(path.join(tools.getControllerDir(), this.dataDir));
        }
        this.dataDir = this.dataDir.replace(/\\/g, '/');

        const fileName = this.settings.jsonlDB ? this.settings.jsonlDB.fileName : this.settings.fileDB.fileName;
        this.datasetName = path.join(this.dataDir, fileName);
        const parts = path.dirname(this.datasetName);
        fs.ensureDirSync(parts);

        this.stateTimer = null;

        this.backupDir = this.settings.backup.path || path.join(this.dataDir, this.settings.fileDB.backupDirName);

        this.log = tools.getLogger(this.settings.logger);

        if (!this.settings.backup.disabled) {
            try {
                this.initBackupDir();
            } catch (e) {
                this.log.error(
                    `Database backups are disabled, because backup directory could not be initialized: ${e.message}`
                );
                this.log.error(
                    'This leads to an increased risk of data loss, please check that the configured backup directory is available and restart the controller'
                );
                this.settings.backup.disabled = true;
            }
        }

        this.log.debug(`${this.namespace} Data File: ${this.datasetName}`);
    }

    async open(): Promise<void> {
        // load values from file
        this.dataset = await this.loadDataset(this.datasetName);
    }

    /**
     * Loads a dataset file
     *
     * @param datasetName Filename of the file to load
     * @returns obj read data, normally as object
     */
    async loadDatasetFile(datasetName: string): Promise<Record<string, any>> {
        if (!(await fs.pathExists(datasetName))) {
            throw new Error(`Database file ${datasetName} does not exists.`);
        }
        return fs.readJSON(datasetName);
    }

    /**
     * Loads the dataset including pot. Fallback handling
     *
     * @param datasetName Filename of the file to load
     * @returns obj dataset read as object
     */
    async loadDataset(datasetName: string): Promise<Record<string, any>> {
        let ret = {};
        try {
            ret = await this.loadDatasetFile(datasetName);

            // loading worked, make sure that "bak" File is not broken
            try {
                await fs.readJSON(`${datasetName}.bak`);
            } catch (e) {
                this.log.info(
                    `${this.namespace} Rewrite bak file, because error on verify ${datasetName}.bak: ${e.message}`
                );
                try {
                    const jsonString = JSON.stringify(ret);
                    await fs.writeFile(`${datasetName}.bak`, jsonString);
                } catch (e) {
                    this.log.error(`${this.namespace} Cannot save ${datasetName}.bak: ${e.message}`);
                }
            }
        } catch (err) {
            this.log.error(`${this.namespace} Cannot load ${datasetName}: ${err.message}. We try last Backup!`);

            try {
                ret = await this.loadDatasetFile(`${datasetName}.bak`);

                // it worked, lets overwrite old file and store the broken one for pot. forensic check
                try {
                    if (await fs.pathExists(datasetName)) {
                        try {
                            await fs.move(datasetName, `${datasetName}.broken`, { overwrite: true });
                        } catch (e) {
                            this.log.error(
                                `${this.namespace} Cannot copy the broken file ${datasetName} to ${datasetName}.broken ${e.message}`
                            );
                        }
                        try {
                            await fs.writeFile(datasetName, JSON.stringify(ret));
                        } catch (e) {
                            this.log.error(
                                `${this.namespace} Cannot restore backup file as new main ${datasetName}: ${e.message}`
                            );
                        }
                    }
                } catch {
                    // ignore, file does not exist
                }
            } catch (err) {
                this.log.error(
                    `${this.namespace} Cannot load ${datasetName}.bak: ${err.message}. Continue with empty dataset!`
                );
                this.log.error(
                    `${this.namespace} If this is no Migration or initial start please restore the last backup from ${this.backupDir}`
                );
            }
        }
        return ret;
    }

    initBackupDir(): void {
        // Interval in minutes => to milliseconds
        this.settings.backup.period =
            this.settings.backup.period === undefined ? 120 : parseInt(String(this.settings.backup.period));
        if (isNaN(this.settings.backup.period)) {
            this.settings.backup.period = 120;
        }
        // Node.js timeouts overflow after roughly 24 days, defaulting to 1 millisecond, which causes chaos.
        // If a user configured the backup this way, we use our default of 120 minutes instead.
        const maxTimeoutMinutes = Math.floor((2 ** 31 - 1) / 60000);
        if (this.settings.backup.period > maxTimeoutMinutes) {
            this.log.warn(
                `${this.namespace} Configured backup period ${this.settings.backup.period} is larger than the supported maximum of ${maxTimeoutMinutes} minutes. Defaulting to 120 minutes.`
            );
            this.settings.backup.period = 120;
        }
        this.settings.backup.period *= 60_000;

        this.settings.backup.files =
            this.settings.backup.files === undefined ? 24 : parseInt(String(this.settings.backup.files));
        if (isNaN(this.settings.backup.files)) {
            this.settings.backup.files = 24;
        }

        this.settings.backup.hours =
            this.settings.backup.hours === undefined ? 48 : parseInt(String(this.settings.backup.hours));
        if (isNaN(this.settings.backup.hours)) {
            this.settings.backup.hours = 48;
        }
        // Create backup directory
        fs.ensureDirSync(this.backupDir);
    }

    /**
     * Add client subscribe to a regex for given type
     *
     * @param options pattern, client and type information
     */
    private addSubscribeToRegex(options: AddRemoveRegexOptions): void {
        const { type, pattern, client } = options;

        const regExpsForType = this.regExps.get(type)!;
        const regexStr = tools.pattern2RegEx(pattern);
        const regex = new RegExp(regexStr);

        if (!regExpsForType.has(regexStr)) {
            regExpsForType.set(regexStr, { regex, clients: [] });
        }

        const regExs = regExpsForType.get(regexStr)!;

        const found = !!regExs.clients.find(cl => cl === client);
        if (!found) {
            regExs.clients.push({ client, pattern });
        }
    }

    handleSubscribe(client: SubscriptionClient, type: string, pattern: string | string[]): void {
        if (!this.regExps.has(type)) {
            this.regExps.set(type, new Map());
        }

        if (pattern instanceof Array) {
            for (const patternStr of pattern) {
                this.addSubscribeToRegex({ pattern: patternStr, client, type });
            }
        } else {
            this.addSubscribeToRegex({ pattern, client, type });
        }
    }

    /**
     * Remove client subscribe from a regex for given type
     *
     * @param options pattern, client and type information
     */
    private removeSubscribeFromRegex(options: AddRemoveRegexOptions): void {
        const { type, pattern, client } = options;

        const regExpsForType = this.regExps.get(type)!;
        const regexStr = tools.pattern2RegEx(pattern);

        const entry = regExpsForType.get(regexStr);

        if (!entry) {
            return;
        }

        const clientIndex = entry.clients.findIndex(cl => cl.client === client);

        if (clientIndex > -1) {
            entry.clients.splice(clientIndex, 1);
        }

        if (entry.clients.length === 0) {
            regExpsForType.delete(regexStr);
        }
    }

    handleUnsubscribe(client: SubscriptionClient, type: string, pattern: string | string[]): void | Promise<void> {
        if (pattern instanceof Array) {
            for (const p of pattern) {
                this.removeSubscribeFromRegex({ pattern: p, client, type });
            }
        } else {
            this.removeSubscribeFromRegex({ pattern, client, type });
        }
    }

    publishPattern(_patternInformation: SubscriptionClientRegex, _type: string, _id: string, _obj: unknown): number {
        throw new Error('no communication handling implemented');
    }

    deleteOldBackupFiles(baseFilename: string): void {
        // delete files only if settings.backupNumber is not 0
        let files = fs.readdirSync(this.backupDir);
        files.sort();
        const limit = Date.now() - this.settings.backup.hours * 3600000;

        files = files.filter(f => f.endsWith(baseFilename + '.gz'));

        while (files.length > this.settings.backup.files) {
            const file = files.shift();
            if (!file) {
                continue;
            }
            // extract time
            const ms = new Date(`${file.substring(0, 10)} ${file.substring(11, 16).replace('-', ':')}:00`).getTime();
            if (limit > ms) {
                try {
                    fs.unlinkSync(path.join(this.backupDir, file));
                } catch (e) {
                    this.log.error(
                        `${this.namespace} Cannot delete file "${path.join(this.backupDir, file)}: ${e.message}`
                    );
                }
            }
        }
    }

    getTimeStr(date: number): string {
        const dateObj = new Date(date);

        let text = dateObj.getFullYear().toString() + '-';
        let v = dateObj.getMonth() + 1;
        if (v < 10) {
            text += '0';
        }
        text += v.toString() + '-';

        v = dateObj.getDate();
        if (v < 10) {
            text += '0';
        }
        text += v.toString() + '_';

        v = dateObj.getHours();
        if (v < 10) {
            text += '0';
        }
        text += v.toString() + '-';

        v = dateObj.getMinutes();
        if (v < 10) {
            text += '0';
        }
        text += v.toString();

        return text;
    }

    /**
     * Handle saving the dataset incl. backups
     */
    async saveState(): Promise<void> {
        try {
            const jsonString = await this.saveDataset();

            if (!this.settings.backup.disabled && jsonString) {
                this.saveBackup(jsonString);
            }
        } finally {
            if (this.stateTimer) {
                clearTimeout(this.stateTimer);
                this.stateTimer = null;
            }
        }
    }

    /**
     * Saves the dataset into File incl. handling of a fallback backup file
     *
     * @returns dataset JSON string of the complete dataset to also be stored into a compressed backup file
     */
    async saveDataset(): Promise<string> {
        const jsonString = JSON.stringify(this.dataset);

        try {
            await fs.writeFile(`${this.datasetName}.new`, jsonString);
        } catch (e) {
            this.log.error(`${this.namespace} Cannot save Dataset to ${this.datasetName}.new: ${e.message}`);
            return jsonString;
        }

        let bakOk = true;
        try {
            if (await fs.pathExists(this.datasetName)) {
                try {
                    await fs.move(this.datasetName, `${this.datasetName}.bak`, { overwrite: true });
                } catch (e) {
                    bakOk = false;
                    this.log.error(`${this.namespace} Cannot backup file ${this.datasetName}.bak: ${e.message}`);
                }
            } else {
                bakOk = false;
            }
        } catch {
            bakOk = false;
            // ignore, file does not exist
        }

        try {
            await fs.move(`${this.datasetName}.new`, this.datasetName, { overwrite: true });
        } catch (e) {
            this.log.error(
                `${this.namespace} Cannot move ${this.datasetName}.new to ${this.datasetName}: ${e.message}. Try direct write as fallback`
            );
            try {
                await fs.writeFile(this.datasetName, jsonString);
            } catch (e) {
                this.log.error(`${this.namespace} Cannot directly write Dataset to ${this.datasetName}: ${e.message}`);
                return jsonString;
            }
        }

        if (!bakOk) {
            // it seems the bak File is not successfully there, write current content again
            try {
                await fs.writeFile(`${this.datasetName}.bak`, jsonString);
            } catch (e) {
                this.log.error(`${this.namespace} Cannot save ${this.datasetName}.bak: ${e.message}`);
            }
        }

        return jsonString;
    }

    /**
     * Stores a compressed backup of the DB in definable intervals
     *
     * @param jsonString JSON string of the complete dataset to also be stored into a compressed backup file
     */
    saveBackup(jsonString: string): void {
        // save files for the last x hours
        const now = Date.now();

        // makes backups only if settings.backupInterval is not 0
        if (this.settings.backup.period && (!this.lastSave || now - this.lastSave > this.settings.backup.period)) {
            this.lastSave = now;
            const backFileName = path.join(
                this.backupDir,
                this.getTimeStr(now) + '_' + this.settings.fileDB.fileName + '.gz'
            );

            try {
                if (!fs.existsSync(backFileName)) {
                    const output = fs.createWriteStream(backFileName);
                    output.on('error', err => {
                        this.log.error(`${this.namespace} Cannot save ${this.datasetName}: ${err.stack}`);
                    });

                    const compress = createGzip();
                    /* The following line will pipe everything written into compress to the file stream */
                    compress.pipe(output);
                    /* Since we're piped through the file stream, the following line will do:
                       'Hello World!'->gzip compression->file which is the desired effect */
                    compress.write(jsonString);
                    compress.end();

                    // analyse older files
                    this.deleteOldBackupFiles(this.settings.fileDB.fileName);
                }
            } catch (e) {
                this.log.error(`${this.namespace} Cannot save backup ${backFileName}: ${e.message}`);
            }
        }
    }

    getStatus(): DbStatus {
        return { type: 'file', server: true };
    }

    getClients(): Map<string, SubscriptionClient> {
        return new Map();
    }

    publishAll(type: string, id: string, obj: any): number {
        if (id === undefined) {
            this.log.error(`${this.namespace} Can not publish empty ID`);
            return 0;
        }

        //const clients = this.getClients();
        let publishCount = 0;

        const patternInfo = this.regExps.get(type);

        if (!patternInfo) {
            return 0;
        }

        for (const regex of patternInfo.values()) {
            publishCount += this.publishPattern(regex, type, id, obj);
        }

        // local subscriptions
        if (
            this.change &&
            this.callbackSubscriptionClient._subscribe &&
            this.callbackSubscriptionClient._subscribe.has(type)
        ) {
            for (const entry of this.callbackSubscriptionClient._subscribe.get(type)!) {
                if (entry.regex.test(id)) {
                    // @ts-expect-error we have checked 3 lines above
                    setImmediate(() => this.change(id, obj));
                    break;
                }
            }
        }

        return publishCount;
    }

    // Destructor of the class. Called by shutting down.
    async destroy(): Promise<void> {
        if (this.stateTimer) {
            clearTimeout(this.stateTimer);
            await this.saveState();
        }
    }
}
