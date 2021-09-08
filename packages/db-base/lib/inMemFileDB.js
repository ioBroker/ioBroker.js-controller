/**
 *      States DB in memory - Server
 *
 *      Copyright 2013-2021 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

/** @module inMemoryFileDB */

/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
'use strict';

const fs                = require('fs-extra');
const path              = require('path');
const tools             = require('./tools.js');

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
 * The parent of the class structure, which provides basic JSON storage
 * and general subscription and publish functionality
 **/
class InMemoryFileDB {

    constructor(settings) {
        this.settings = settings || {};

        this.change = this.settings.change;

        this.dataset = {};

        this.namespace = this.settings.namespace || '';
        this.lastSave = null;
        this.zlib = null;
        this.callbackSubscriptionClient = {};

        this.settings.backup = this.settings.backup || {
            disabled: false,  // deactivates
            files: 24,     // minimum number of files
            hours: 48,     // hours
            period: 120,    // minutes
            path: ''      // use default path
        };

        this.dataDir = (this.settings.connection.dataDir || tools.getDefaultDataDir());
        if (!path.isAbsolute(this.dataDir)) {
            this.dataDir = path.normalize(path.join(tools.getControllerDir(), this.dataDir));
        }
        this.dataDir = this.dataDir.replace(/\\/g, '/');

        this.datasetName = path.join(this.dataDir, this.settings.fileDB.fileName);
        const parts = path.dirname(this.datasetName);
        fs.ensureDirSync(parts);

        this.stateTimer = null;

        this.backupDir = this.settings.backup.path || (path.join(this.dataDir, this.settings.fileDB.backupDirName));

        if (!this.settings.backup.disabled) {
            this.initBackupDir();
        }

        this.log = tools.getLogger(this.settings.logger);

        this.log.debug(`${this.namespace} Data File: ${this.datasetName}`);
    }

    /** @returns {Promise<void>} */
    async open() {
        // load values from file
        this.dataset = await this.loadDataset(this.datasetName);
    }

    /**
     * Loads a dataset file
     *
     * @param datasetName {string} Filename of the file to load
     * @returns {Promise<Record<string, any>>} read data, normally as object
     */
    async loadDatasetFile(datasetName) {
        if (!(await fs.pathExists(datasetName))) {
            throw new Error(`Database file ${datasetName} does not exists.`);
        }
        return fs.readJSON(datasetName);
    }

    /**
     * Loads the dataset including pot. Fallback handling
     *
     * @param datasetName {string} Filename of the file to load
     * @returns {Promise<Record<string, any>>} dataset read as object
     */
    async loadDataset(datasetName) {
        let ret = {};
        try {
            ret = await this.loadDatasetFile(datasetName);
        } catch (err) {
            this.log.error(`${this.namespace} Cannot load ${datasetName}: ${err.message}. We try last Backup!`);

            try {
                ret = await this.loadDatasetFile(datasetName + '.bak');

                // it worked, lets overwrite old file and store the broken one for pot. forensic check
                try {
                    if (await fs.pathExists(datasetName)) {
                        try {
                            await fs.move(datasetName, `${datasetName}.broken`, {overwrite: true});
                        } catch (e) {
                            this.log.error(`${this.namespace} Cannot copy the broken file ${datasetName} to ${datasetName}.broken ${e.message}`);
                        }
                        try {
                            await fs.writeFile(datasetName, JSON.stringify(ret));
                        } catch (e) {
                            this.log.error(`${this.namespace} Cannot restore backup file as new main ${datasetName}: ${e.message}`);
                        }
                    }
                } catch {
                    // ignore, file does not exist
                }
            } catch (err) {
                this.log.error(`${this.namespace} Cannot load ${datasetName}.bak: ${err.message}. Continue with empty dataset!`);
                this.log.error(`${this.namespace} If this is no Migration or initial start please restore the last backup from ${this.backupDir}`);
            }
        }
        return ret;
    }

    initBackupDir() {
        this.zlib = this.zlib || require('zlib');
        // Interval in minutes => to milliseconds
        this.settings.backup.period = this.settings.backup.period === undefined ? 120 : parseInt(this.settings.backup.period);
        if (isNaN(this.settings.backup.period)) {
            this.settings.backup.period = 120;
        }
        this.settings.backup.period *= 60000;

        this.settings.backup.files = this.settings.backup.files === undefined ? 24 : parseInt(this.settings.backup.files);
        if (isNaN(this.settings.backup.files)) {
            this.settings.backup.files = 24;
        }

        this.settings.backup.hours = this.settings.backup.hours === undefined ? 48 : parseInt(this.settings.backup.hours);
        if (isNaN(this.settings.backup.hours)) {
            this.settings.backup.hours = 48;
        }
        // Create backup directory
        fs.ensureDirSync(this.backupDir);
    }

    handleSubscribe(client, type, pattern, options, cb) {
        if (typeof options === 'function') {
            cb = options;
            options = undefined;
        }
        client._subscribe = client._subscribe || {};
        client._subscribe[type] = client._subscribe[type] || [];

        const s = client._subscribe[type];

        if (pattern instanceof Array) {
            pattern.forEach(pattern => {
                if (s.find(sub => sub.pattern === pattern)) {
                    return;
                }

                s.push({pattern: pattern, regex: new RegExp(tools.pattern2RegEx(pattern)), options: options});
            });
        } else {
            if (!s.find(sub => sub.pattern === pattern)) {
                s.push({pattern: pattern, regex: new RegExp(tools.pattern2RegEx(pattern)), options: options});
            }
        }
        typeof cb === 'function' && cb();
    }

    handleUnsubscribe(client, type, pattern, cb) {
        if (!client._subscribe || !client._subscribe[type]) {
            if (typeof cb === 'function') {
                cb();
            }
            return;
        }
        const s = client._subscribe[type];
        if (pattern instanceof Array) {
            pattern.forEach(pattern => {
                const index = s.findIndex(sub => sub.pattern === pattern);
                if (index > -1) {
                    s.splice(index, 1);
                }
            });
        } else {
            const index = s.findIndex(sub => sub.pattern === pattern);
            if (index > -1) {
                s.splice(index, 1);
                return typeof cb === 'function' && cb();
            }
        }
        typeof cb === 'function' && cb();
    }

    /** @returns {number} */
    publishToClients(_client, _type, _id, _obj) {
        throw new Error('no communication handling implemented');
    }

    deleteOldBackupFiles() {
        // delete files only if settings.backupNumber is not 0
        let files = fs.readdirSync(this.backupDir);
        files.sort();
        const limit = Date.now() - this.settings.backup.hours * 3600000;

        files = files.filter(f => f.endsWith(this.settings.fileDB.fileName + '.gz'));

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
                    this.log.error(`${this.namespace} Cannot delete file "${path.join(this.backupDir, file)}: ${e.message}`);
                }
            }
        }
    }

    getTimeStr(date) {
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
    async saveState() {
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
     * @returns {Promise<string>} JSON string of the complete dataset to also be stored into a compressed backup file
     */
    async saveDataset() {
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
                    await fs.move(this.datasetName, `${this.datasetName}.bak`, {overwrite: true});
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
            await fs.move(`${this.datasetName}.new`, this.datasetName, {overwrite: true});
        } catch (e) {
            this.log.error(`${this.namespace} Cannot move ${this.datasetName}.new to ${this.datasetName}: ${e.message}. Try direct write as fallback`);
            try {
                await fs.writeFile(this.datasetName, jsonString);
            } catch (e) {
                this.log.error(`${this.namespace} Cannot directly write Dataset to ${this.datasetName}: ${e.message}`);
                return jsonString;
            }

        }

        if (!bakOk) { // it seems the bak File is not successfully there, write current content again
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
     * @param jsonString {string} JSON string of the complete dataset to also be stored into a compressed backup file
     */
    saveBackup(jsonString) {
        // save files for the last x hours
        const now = Date.now();

        // makes backups only if settings.backupInterval is not 0
        if (this.settings.backup.period && (!this.lastSave || now - this.lastSave > this.settings.backup.period)) {
            this.lastSave = now;
            const backFileName = path.join(this.backupDir, this.getTimeStr(now) + '_' + this.settings.fileDB.fileName + '.gz');

            try {
                if (!fs.existsSync(backFileName)) {
                    this.zlib = this.zlib || require('zlib');
                    const output = fs.createWriteStream(backFileName);
                    output.on('error', err => {
                        this.log.error(`${this.namespace} Cannot save ${this.datasetName}: ${err}`);
                    });
                    const compress = this.zlib.createGzip();
                    /* The following line will pipe everything written into compress to the file stream */
                    compress.pipe(output);
                    /* Since we're piped through the file stream, the following line will do:
                       'Hello World!'->gzip compression->file which is the desired effect */
                    compress.write(jsonString);
                    compress.end();

                    // analyse older files
                    this.deleteOldBackupFiles();
                }
            } catch (e) {
                this.log.error(`${this.namespace} Cannot save backup ${backFileName}: ${e.message}`);
            }
        }
    }

    getStatus() {
        return {type: 'file', server: true};
    }

    /** @returns {object} */
    getClients() {
        return {};
    }

    publishAll(type, id, obj) {
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
        if (this.change && this.callbackSubscriptionClient._subscribe && this.callbackSubscriptionClient._subscribe[type]) {
            for (let j = 0; j < this.callbackSubscriptionClient._subscribe[type].length; j++) {
                if (this.callbackSubscriptionClient._subscribe[type][j].regex.test(id)) {
                    setImmediate(() =>
                        this.change(id, obj));
                    break;
                }
            }
        }
        return publishCount;
    }

    // Destructor of the class. Called by shutting down.
    async destroy() {
        if (this.stateTimer) {
            clearTimeout(this.stateTimer);
            await this.saveState();
        }
    }
}

module.exports = InMemoryFileDB;
