/**
 *      Object DB in memory - Server
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
/* jshint -W061 */
'use strict';

const ObjectsInMemoryFileDB = require('@iobroker/db-objects-file').ObjectsInMemoryFileDB;
const { JsonlDB } = require('@alcalzone/jsonl-db');
const path = require('path');
const fs = require('fs');
const os = require('os');

/**
 * This class inherits InMemoryFileDB class and adds all relevant logic for objects
 * including the available methods for use by js-controller directly
 **/
class ObjectsInMemoryJsonlDB extends ObjectsInMemoryFileDB {
    constructor(settings) {
        settings = settings || {};
        settings.fileDB = {
            fileName: 'objects.json',
            backupDirName: 'backup-objects'
        };
        /** @type {import("@alcalzone/jsonl-db").JsonlDBOptions<any>} */
        const jsonlOptions = {
            autoCompress: {
                sizeFactor: 2,
                sizeFactorMinimumSize: 25000
            },
            ignoreReadErrors: true,
            throttleFS: {
                intervalMs: 60000,
                maxBufferedCommands: 100
            }
        };
        settings.jsonlDB = {
            fileName: 'objects.jsonl',
            options: jsonlOptions
        };
        super(settings);

        /** @type {JsonlDB<any>} */
        this._db = new JsonlDB(path.join(this.dataDir, settings.jsonlDB.fileName), jsonlOptions);
    }

    async open() {
        await this._db.open();

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

    async saveState() {
        // Nothing to do, the DB saves behind the scenes
    }

    // Is regularly called and stores a compressed backup of the DB
    async saveBackup() {
        const now = Date.now();
        const tmpBackupFileName = path.join(os.tmpdir(), this.getTimeStr(now) + '_' + this.settings.jsonlDB.fileName);
        const backupFileName = path.join(
            this.backupDir,
            this.getTimeStr(now) + '_' + this.settings.jsonlDB.fileName + '.gz'
        );
        try {
            if (fs.existsSync(backupFileName)) {
                return;
            }

            // Create a DB dump
            await this._db.dump(tmpBackupFileName);
            // and zip it

            const zlib = require('zlib');
            const input = fs.createReadStream(tmpBackupFileName);
            const output = fs.createWriteStream(backupFileName);
            output.on('error', err => {
                this.log.error(`${this.namespace} Cannot save ${this.datasetName}: ${err}`);
            });
            const compress = zlib.createGzip();
            input.pipe(compress).pipe(output);

            fs.unlinkSync(tmpBackupFileName);

            // analyse older files
            this.deleteOldBackupFiles(this.settings.jsonlDB.fileName);
        } catch (e) {
            this.log.error(`${this.namespace} Cannot save backup ${backupFileName}: ${e.message}`);
        }
    }

    async destroy() {
        if (this._db) {
            await this._db.close();
        }
        if (this._backupInterval) {
            clearInterval(this._backupInterval);
        }
    }
}

module.exports = ObjectsInMemoryJsonlDB;
