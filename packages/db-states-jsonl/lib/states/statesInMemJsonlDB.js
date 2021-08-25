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
const { JsonlDB }          = require('@alcalzone/jsonl-db');
const path                 = require('path');

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
        /** @type {import("@alcalzone/jsonl-db").JsonlDBOptions<any>} */
        const jsonlOptions = {
            autoCompress: {
                sizeFactor: 2,
                sizeFactorMinimumSize: 1000
            },
            ignoreReadErrors: true,
            throttleFS: {
                intervalMs: 60000,
                maxBufferedCommands: 2000
            }
        };
        settings.jsonlDB = {
            fileName: 'states.jsonl',
            options: jsonlOptions
        };
        super(settings);

        /** @type {JsonlDB<any>} */
        this._db = new JsonlDB(
            path.join(this.dataDir, settings.jsonlDB.fileName),
            jsonlOptions
        );
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
    }

    async saveState() {
        // Nothing to do, the DB saves behind the scenes
    }

    async destroy() {
        if (this._db) {
            await this._db.close();
        }
    }
}

module.exports = StatesInMemoryJsonlDB;
