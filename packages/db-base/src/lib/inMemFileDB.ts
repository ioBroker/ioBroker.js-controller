/**
 *      States DB in memory - Server
 *
 *      Copyright 2013-2026 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */
/// <reference types="@iobroker/types-dev" />

import fs from 'fs-extra';
import path from 'node:path';
import { tools } from '@iobroker/js-controller-common-db';
import type { InternalLogger } from '@iobroker/js-controller-common-db/tools';
import { createGzip } from 'node:zlib';

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

export type MetaObject = Record<string, string>;
export type FileSize = number;

/** Options describing how to connect to the database server */
export interface ConnectionOptions {
    /** Password for authentication, if required */
    pass?: string;
    /** Name of the sentinel master to connect to */
    sentinelName?: string;
    /** array on sentinel */
    host: string | string[];
    /** array on sentinel */
    port: number | number[];
    /** Additional connection options passed to the database driver */
    options: ioBroker.ObjectsDatabaseOptions['options'];
    /** Options forwarded to the JSONL database backend */
    jsonlOptions?: ioBroker.ObjectsDatabaseOptions['jsonlOptions'];
    /** Redis key prefix used by the in-memory server */
    redisNamespace?: string;
    /** Enable more verbose connection logging */
    enhancedLogging?: boolean;
    /** Disable the in-memory file cache and always read files from disk */
    noFileCache?: boolean;
    /** Whether the connection should be secured via TLS */
    secure?: boolean;
    /** Backup configuration */
    backup?: BackupOptions;
    /** relative path to the data dir */
    dataDir?: string;
    /** Interval in milliseconds in which the in-memory states are persisted to disk */
    writeFileInterval?: number;
}

type ChangeFunction<TObject> = (id: string, obj: TObject) => void;

/** Status information about the database */
export interface DbStatus {
    /** Type of the database backend (e.g. file, jsonl, redis) */
    type: string;
    /** Whether this process runs the database server */
    server: boolean;
}

/** Options describing where the database stores its files */
export interface DbOptions {
    /** Name of the directory used for backups */
    backupDirName: string;
    /** Name of the database file */
    fileName: string;
}

/** Settings accepted by the in-memory database classes and their subclasses */
export interface FileDbSettings<TObject> {
    /** File DB storage options (filled in by the subclass constructor before `super()`) */
    fileDB?: DbOptions;
    /** JSONL DB storage options (only set by the JSONL backend; only the file name is used) */
    jsonlDB?: Pick<DbOptions, 'fileName'>;
    /** Backup options (derived from `connection.backup` by the base constructor) */
    backup?: BackupOptions;
    /** Callback invoked when a value in the database changes */
    change?: ChangeFunction<TObject>;
    /** Callback invoked once the database server is ready */
    connected: (nameOfServer?: string) => void;
    /** Logger instance (or logger configuration) used for all database logging */
    logger?: InternalLogger;
    /** Options describing how to connect to the database server */
    connection: ConnectionOptions;
    /** unused */
    auth?: null;
    /** Whether the server connection should be secured via TLS */
    secure?: boolean;
    /** as required by createServer TODO: if createServer is typed, add type */
    certificates?: any;
    /** Port the in-memory server listens on */
    port?: number;
    /** Host the in-memory server binds to */
    host?: string;
    /** logging namespace */
    namespace?: string;
    /** Host name used as a fallback for the logging namespace */
    hostname?: string;
    /** Default ACL applied to newly created objects */
    defaultNewAcl?: {
        object: number;
        state: number;
        file: number;
        owner: string;
        ownerGroup: string;
    };
    /** Redis key prefix used by the in-memory server (defaults to "io") */
    redisNamespace?: string;
    /** Namespace used for the message box */
    namespaceMsg?: string;
    /** Namespace used for log messages */
    namespaceLog?: string;
    /** Namespace used for sessions */
    namespaceSession?: string;
    /** Namespace used for meta information */
    metaNamespace?: string;
    /** Redis key prefix used for object meta information (defaults to "meta") */
    namespaceMeta?: string;
}

interface Subscription {
    pattern: string;
    regex: RegExp;
}

interface SubscriptionClient {
    _subscribe?: Record<string, Subscription[]>;
}

/**
 * The parent of the class structure, which provides basic JSON storage
 * and general subscription and publish functionality
 */
export class InMemoryFileDB<TObject, THandler extends SubscriptionClient = SubscriptionClient> {
    protected settings: FileDbSettings<TObject>;
    protected change: ChangeFunction<TObject> | undefined;
    protected dataset: Record<string, TObject | MetaObject>;
    protected namespace: string;
    private lastSave: null | number;
    protected stateTimer: NodeJS.Timeout | null;
    private callbackSubscriptionClient: SubscriptionClient;
    protected readonly dataDir: string;
    private readonly datasetName: string;
    protected log: InternalLogger;
    protected readonly backupDir: string;

    /**
     * @param settings Settings for the database, the connection and backups
     */
    constructor(settings: FileDbSettings<TObject>) {
        this.settings = settings;

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
            path: '', // use default path
        };
        const backup: BackupOptions = this.settings.backup;

        this.dataDir = this.settings.connection.dataDir || tools.getDefaultDataDir();
        if (!path.isAbsolute(this.dataDir)) {
            this.dataDir = path.normalize(path.join(tools.getControllerDir(), this.dataDir));
        }
        this.dataDir = this.dataDir.replace(/\\/g, '/');

        const fileDbOptions = this.settings.fileDB;
        if (!fileDbOptions) {
            throw new Error(`${this.namespace} No fileDB storage options were provided`);
        }
        const fileName = this.settings.jsonlDB ? this.settings.jsonlDB.fileName : fileDbOptions.fileName;
        this.datasetName = path.join(this.dataDir, fileName);
        const parts = path.dirname(this.datasetName);
        fs.ensureDirSync(parts);

        this.stateTimer = null;

        this.backupDir = backup.path || path.join(this.dataDir, fileDbOptions.backupDirName);

        this.log = tools.getLogger(this.settings.logger);

        if (!backup.disabled) {
            try {
                this.initBackupDir();
            } catch (e) {
                this.log.error(
                    `Database backups are disabled, because backup directory could not be initialized: ${e.message}`,
                );
                this.log.error(
                    'This leads to an increased risk of data loss, please check that the configured backup directory is available and restart the controller',
                );
                backup.disabled = true;
            }
        }

        this.log.debug(`${this.namespace} Data File: ${this.datasetName}`);
    }

    /**
     * Open the database by loading the dataset from disk
     */
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
    async loadDatasetFile(datasetName: string): Promise<Record<string, TObject>> {
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
    async loadDataset(datasetName: string): Promise<Record<string, TObject>> {
        let ret = {};
        try {
            ret = await this.loadDatasetFile(datasetName);

            // loading worked, make sure that "bak" File is not broken
            try {
                await fs.readJSON(`${datasetName}.bak`);
            } catch (e) {
                this.log.info(
                    `${this.namespace} Rewrite bak file, because error on verify ${datasetName}.bak: ${e.message}`,
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
                                `${this.namespace} Cannot copy the broken file ${datasetName} to ${datasetName}.broken ${e.message}`,
                            );
                        }
                        try {
                            await fs.writeFile(datasetName, JSON.stringify(ret));
                        } catch (e) {
                            this.log.error(
                                `${this.namespace} Cannot restore backup file as new main ${datasetName}: ${e.message}`,
                            );
                        }
                    }
                } catch {
                    // ignore, file does not exist
                }
            } catch (err) {
                this.log.error(
                    `${this.namespace} Cannot load ${datasetName}.bak: ${err.message}. Continue with empty dataset!`,
                );
                this.log.error(
                    `${this.namespace} If this is no Migration or initial start please restore the last backup from ${this.backupDir}`,
                );
            }
        }
        return ret;
    }

    /**
     * Normalize the backup settings and create the backup directory
     */
    initBackupDir(): void {
        // Create backup directory
        fs.ensureDirSync(this.backupDir);

        const backup = this.settings.backup;
        if (!backup) {
            return;
        }
        // Interval in minutes => to milliseconds
        backup.period = backup.period === undefined ? 120 : parseInt(String(backup.period));
        if (isNaN(backup.period)) {
            backup.period = 120;
        }
        // Node.js timeouts overflow after roughly 24 days, defaulting to 1 millisecond, which causes chaos.
        // If a user configured the backup this way, we use our default of 120 minutes instead.
        const maxTimeoutMinutes = Math.floor((2 ** 31 - 1) / 60000);
        if (backup.period > maxTimeoutMinutes) {
            this.log.warn(
                `${this.namespace} Configured backup period ${backup.period} is larger than the supported maximum of ${maxTimeoutMinutes} minutes. Defaulting to 120 minutes.`,
            );
            backup.period = 120;
        }
        backup.period *= 60_000;

        backup.files = backup.files === undefined ? 24 : parseInt(String(backup.files));
        if (isNaN(backup.files)) {
            backup.files = 24;
        }

        backup.hours = backup.hours === undefined ? 48 : parseInt(String(backup.hours));
        if (isNaN(backup.hours)) {
            backup.hours = 48;
        }
    }

    /**
     * Subscribe a client to changes matching the given pattern
     *
     * @param client The client to register the subscription for
     * @param type The subscription type (e.g. objects or states)
     * @param pattern One or more patterns to subscribe to
     * @param cb Called once the subscription has been registered
     */
    handleSubscribe(client: SubscriptionClient, type: string, pattern: string | string[], cb?: () => void): void;
    /**
     * Subscribe a client to changes matching the given pattern
     *
     * @param client The client to register the subscription for
     * @param type The subscription type (e.g. objects or states)
     * @param pattern One or more patterns to subscribe to
     */
    handleSubscribe(client: SubscriptionClient, type: string, pattern: string | string[]): void;

    /**
     * Subscribe a client to changes matching the given pattern
     *
     * @param client The client to register the subscription for
     * @param type The subscription type (e.g. objects or states)
     * @param pattern One or more patterns to subscribe to
     */
    handleSubscribe(client: SubscriptionClient, type: string, pattern: string | string[]): void {
        client._subscribe ||= {};
        client._subscribe[type] ||= [];

        const s = client._subscribe[type];

        if (pattern instanceof Array) {
            pattern.forEach(pattern => {
                if (s.find(sub => sub.pattern === pattern)) {
                    return;
                }

                s.push({ pattern, regex: new RegExp(tools.pattern2RegEx(pattern)) });
            });
        } else {
            if (!s.find(sub => sub.pattern === pattern)) {
                s.push({ pattern, regex: new RegExp(tools.pattern2RegEx(pattern)) });
            }
        }
    }

    /**
     * Remove a client's subscription for the given pattern
     *
     * @param client The client whose subscription should be removed
     * @param type The subscription type (e.g. objects or states)
     * @param pattern One or more patterns to unsubscribe from
     * @param cb Called once the subscription has been removed
     */
    handleUnsubscribe(
        client: SubscriptionClient,
        type: string,
        pattern: string | string[],
        cb?: () => void,
    ): void | Promise<void> {
        const s = client?._subscribe?.[type];
        if (s) {
            const removeEntry = (p: string): void => {
                const index = s.findIndex(sub => sub.pattern === p);
                if (index > -1) {
                    s.splice(index, 1);
                }
            };

            if (pattern instanceof Array) {
                pattern.forEach(p => {
                    removeEntry(p);
                });
            } else {
                removeEntry(pattern);
            }
        }

        return tools.maybeCallback(cb);
    }

    /**
     * Publish a change to a single client. Must be implemented by a subclass that handles client communication.
     *
     * @param _client The client to publish to
     * @param _type The change type (e.g. objects or states)
     * @param _id The ID of the changed object or state
     * @param _obj The new value of the object or state
     */
    publishToClients(
        _client: SubscriptionClient,
        _type: string,
        _id: string,
        _obj: TObject | string | null | FileSize,
    ): number {
        throw new Error('no communication handling implemented');
    }

    /**
     * Delete outdated backup files according to the configured retention settings
     *
     * @param baseFilename Base file name of the backups that should be pruned
     */
    deleteOldBackupFiles(baseFilename: string): void {
        // delete files only if settings.backupNumber is not 0
        let files = fs.readdirSync(this.backupDir);
        files.sort();
        const limit = Date.now() - (this.settings.backup?.hours ?? 48) * 3600000;

        files = files.filter(f => f.endsWith(`${baseFilename}.gz`));

        while (files.length > (this.settings.backup?.files ?? 24)) {
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
                        `${this.namespace} Cannot delete file "${path.join(this.backupDir, file)}: ${e.message}`,
                    );
                }
            }
        }
    }

    /**
     * Format a timestamp into a "YYYY-MM-DD_HH-MM-SS" string used for backup file names
     *
     * @param date Timestamp in milliseconds
     */
    getTimeStr(date: number): string {
        const dateObj = new Date(date);

        let text = `${dateObj.getFullYear().toString()}-`;
        let v = dateObj.getMonth() + 1;
        if (v < 10) {
            text += '0';
        }
        text += `${v.toString()}-`;

        v = dateObj.getDate();
        if (v < 10) {
            text += '0';
        }
        text += `${v.toString()}_`;

        v = dateObj.getHours();
        if (v < 10) {
            text += '0';
        }
        text += `${v.toString()}-`;

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

            if (!this.settings.backup?.disabled && jsonString) {
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
                `${this.namespace} Cannot move ${this.datasetName}.new to ${this.datasetName}: ${e.message}. Try direct write as fallback`,
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
        const fileName = this.settings.fileDB?.fileName;
        if (
            fileName &&
            this.settings.backup?.period &&
            (!this.lastSave || now - this.lastSave > this.settings.backup.period)
        ) {
            this.lastSave = now;
            const backFileName = path.join(this.backupDir, `${this.getTimeStr(now)}_${fileName}.gz`);

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
                    this.deleteOldBackupFiles(fileName);
                }
            } catch (e) {
                this.log.error(`${this.namespace} Cannot save backup ${backFileName}: ${e.message}`);
            }
        }
    }

    /**
     * Get the current status of the database
     */
    getStatus(): DbStatus {
        return { type: 'file', server: true };
    }

    /**
     * Get the currently connected clients. Subclasses override this to return the real clients.
     */
    getClients(): Record<string, THandler> {
        return {};
    }

    /**
     * Publish a change to all connected clients and local subscribers
     *
     * @param type The change type (e.g. objects or states)
     * @param id The ID of the changed object or state
     * @param obj The new value of the object or state
     */
    publishAll(type: string, id: string, obj: TObject | string | null | FileSize): number {
        if (id === undefined) {
            this.log.error(`${this.namespace} Can not publish empty ID`);
            return 0;
        }

        const clients = this.getClients();
        let publishCount = 0;

        if (clients && typeof clients === 'object') {
            for (const i of Object.keys(clients)) {
                publishCount += this.publishToClients(clients[i], type, id, obj);
            }
        }

        // local subscriptions
        if (
            this.change &&
            this.callbackSubscriptionClient._subscribe &&
            this.callbackSubscriptionClient._subscribe[type]
        ) {
            for (const entry of this.callbackSubscriptionClient._subscribe[type]) {
                if (entry.regex.test(id)) {
                    // @ts-expect-error we have checked 3 lines above
                    setImmediate(() => this.change(id, obj));
                    break;
                }
            }
        }

        return publishCount;
    }

    /**
     * Destructor of the class. Called when shutting down to persist state and clear timers.
     */
    async destroy(): Promise<void> {
        if (this.stateTimer) {
            clearTimeout(this.stateTimer);
            await this.saveState();
        }
    }
}
