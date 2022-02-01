/**
 *      States DB in memory - Server
 *
 *      Copyright 2013-2021 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

/** @module StatesInMemoryFileDB */

/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
'use strict';

const StatesInMemoryFileDB = require('@iobroker/db-states-file').StatesInMemoryFileDB;
const { JsonlDB } = require('@alcalzone/jsonl-db');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { tools } = require('@iobroker/js-controller-common');

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

/**
 * This class inherits InMemoryFileDB class and adds all relevant logic for states
 * including the available methods for use by js-controller directly
 **/
class StatesInMemoryJsonlDB extends StatesInMemoryFileDB {
    constructor(settings) {
        settings = settings || {};
        // Not really used
        settings.fileDB = {
            fileName: 'states.json',
            backupDirName: 'backup-objects'
        };
        super(settings);

        /** @type {import("@alcalzone/jsonl-db").JsonlDBOptions<any>} */
        const jsonlOptions = this.settings.connection.jsonlOptions || {
            autoCompress: {
                sizeFactor: 10,
                sizeFactorMinimumSize: 50000
            },
            ignoreReadErrors: true,
            throttleFS: {
                intervalMs: 60000,
                maxBufferedCommands: 2000
            }
        };
        settings.jsonlDB = {
            fileName: 'states.jsonl'
        };

        /** @type {JsonlDB<any>} */
        this._db = new JsonlDB(path.join(this.dataDir, settings.jsonlDB.fileName), jsonlOptions);
    }

    async open() {
        if (!(await this._maybeMigrateFileDB())) {
            await this._db.open();
        }

        // Create an object-like wrapper around the internal Map
        this.dataset = new Proxy(this._db, {
            /** @param {any} prop */
            get(target, prop) {
                return target.get(prop);
            },
            /** @param {any} prop */
            has(target, prop) {
                return target.has(prop);
            },
            /** @param {any} prop */
            set(target, prop, value) {
                target.set(prop, value);
                return true;
            },
            /** @param {any} prop */
            deleteProperty(target, prop) {
                return target.delete(prop);
            },
            ownKeys(target) {
                return [...target.keys()];
            },
            /** @param {any} prop */
            getOwnPropertyDescriptor(target, prop) {
                if (!target.has(prop)) {
                    return undefined;
                }
                return {
                    configurable: true,
                    enumerable: true,
                    writable: true,
                    value: target.get(prop)
                };
            }
        });

        if (this.settings.backup && this.settings.backup.period && !this.settings.backup.disabled) {
            this._backupInterval = setInterval(() => {
                this.saveBackup();
            }, this.settings.backup.period);
        }
    }

    /**
     * Checks if an existing file DB should be migrated to JSONL
     * @returns {Promise<boolean>} true if the file DB was migrated. false if not.
     * If this returns true, the jsonl DB was opened and doesn't need to be opened again.
     */
    async _maybeMigrateFileDB() {
        const jsonlFileName = path.join(this.dataDir, this.settings.jsonlDB.fileName);
        const jsonFileName = path.join(this.dataDir, this.settings.fileDB.fileName);
        const bakFileName = path.join(this.dataDir, this.settings.fileDB.fileName + '.bak');

        // Check the timestamps of each file, defaulting to 0 if they don't exist
        let jsonlTimeStamp = 0;
        let jsonTimeStamp = 0;
        let bakTimeStamp = 0;
        try {
            const stat = fs.statSync(jsonlFileName);
            if (stat.isFile()) {
                jsonlTimeStamp = stat.mtime;
            }
        } catch {
            // ignore
        }
        try {
            const stat = fs.statSync(jsonFileName);
            if (stat.isFile()) {
                jsonTimeStamp = stat.mtime;
            }
        } catch {
            // ignore
        }
        try {
            const stat = fs.statSync(bakFileName);
            if (stat.isFile()) {
                bakTimeStamp = stat.mtime;
            }
        } catch {
            // ignore
        }

        // Figure out which file needs to be imported
        /** @type {string} */
        let importFilename;
        if (jsonTimeStamp > 0 && jsonTimeStamp >= bakTimeStamp && jsonTimeStamp >= jsonlTimeStamp) {
            importFilename = jsonFileName;
        } else if (bakTimeStamp > 0 && bakTimeStamp >= jsonTimeStamp && bakTimeStamp >= jsonlTimeStamp) {
            importFilename = bakFileName;
        } else {
            // None of the File DB files are newer than the JSONL file
            // There is nothing to restore, we're done
            return false;
        }

        await this._db.open();
        this._db.clear();
        await this._db.importJson(importFilename);

        // And rename the existing files to avoid redoing the work next time
        if (fs.existsSync(jsonFileName)) {
            try {
                fs.renameSync(jsonFileName, `${jsonFileName}.migrated`);
            } catch {
                // ignore
            }
        }
        if (fs.existsSync(bakFileName)) {
            try {
                fs.renameSync(bakFileName, `${bakFileName}.migrated`);
            } catch {
                // ignore
            }
        }

        // Signal to the caller that the DB is already open
        return true;
    }

    async saveState() {
        // Nothing to do, the DB saves behind the scenes
    }

    // Is regularly called and stores a compressed backup of the DB
    async saveBackup() {
        const now = Date.now();
        const tmpBackupFileName = path.join(os.tmpdir(), `${this.getTimeStr(now)}_${this.settings.jsonlDB.fileName}`);
        const backupFileName = path.join(
            this.backupDir,
            `${this.getTimeStr(now)}_${this.settings.jsonlDB.fileName}.gz`
        );
        try {
            if (fs.existsSync(backupFileName)) {
                return;
            }

            // Create a DB dump
            await this._db.dump(tmpBackupFileName);
            // and zip it
            await tools.compressFileGZip(tmpBackupFileName, backupFileName, { deleteInput: true });
            // figure out if older files need to be deleted
            this.deleteOldBackupFiles(this.settings.jsonlDB.fileName);
        } catch (e) {
            this.log.error(`${this.namespace} Cannot save backup ${backupFileName}: ${e.message}`);
        }
    }

    async destroy() {
        await super.destroy();

        if (this._db) {
            await this._db.close();
        }
        if (this._backupInterval) {
            clearInterval(this._backupInterval);
        }
    }
}

module.exports = StatesInMemoryJsonlDB;
