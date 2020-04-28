/**
 *      States DB in memory - Server
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

/** @module inMemoryFileDB */

/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
'use strict';

const fs                = require('fs');
const path              = require('path');
const tools             = require('./tools.js');
const getDefaultDataDir = tools.getDefaultDataDir;
const utils             = require('./objects/objectsUtils'); // TODO move to tools?

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

        this.dataDir = (this.settings.connection.dataDir || getDefaultDataDir());
        if (!path.isAbsolute(this.dataDir)) {
            this.dataDir = path.normalize(path.join(__dirname, '..', this.dataDir));
        }
        this.dataDir = this.dataDir.replace(/\\/g, '/');

        // Create data directory
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir);
        }

        this.datasetName = path.join(this.dataDir, this.settings.fileDB.fileName);
        this.stateTimer = null;

        this.backupDir = this.settings.backup.path || (path.join(this.dataDir, this.settings.fileDB.backupDirName));

        if (!this.settings.backup.disabled) {
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
            if (!fs.existsSync(this.backupDir)) {
                fs.mkdirSync(this.backupDir);
            }
        }

        this.log = utils.getLogger(this.settings.logger);

        // load values from file
        if (fs.existsSync(this.datasetName)) {
            try {
                this.dataset = JSON.parse(fs.readFileSync(this.datasetName, 'utf8'));
            } catch (e) {
                this.log.error(this.namespace + ' Cannot parse ' + this.datasetName + ': ' + e);
                if (fs.existsSync(this.datasetName + '.bak')) {
                    try {
                        this.dataset = JSON.parse(fs.readFileSync(this.datasetName + '.bak', 'utf8'));
                    } catch (e) {
                        this.log.error(this.namespace + ' Cannot parse ' + this.datasetName + '.bak: ' + e);
                        this.dataset = {};
                    }
                } else {
                    this.dataset = {};
                }
            }
        } else if (fs.existsSync(this.datasetName + '.bak')) {
            try {
                this.dataset = JSON.parse(fs.readFileSync(this.datasetName + '.bak', 'utf8'));
            } catch (e) {
                this.log.error(this.namespace + ' Cannot parse ' + this.datasetName + '.bak: ' + e);
                this.dataset = {};
            }
        } else {
            this.dataset = {};
        }

        // Check if directory exists
        this.datasetName = this.datasetName.replace(/\\/g, '/');

        const parts = path.dirname(this.datasetName);
        if (!fs.existsSync(parts)) {
            fs.mkdirSync(parts);
        }
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
                    return;
                }
            });
        } else {
            const index = s.findIndex(sub => sub.pattern === pattern);
            if (index > -1) {
                s.splice(index, 1);
                if (typeof cb === 'function') {
                    cb();
                }
                return;
            }
        }
        if (typeof cb === 'function') {
            cb();
        }

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

        files = files.filter(f => !f.endsWith(this.settings.fileDB.fileName + '.gz'));

        while (files.length > this.settings.backup.files) {
            const file = files.shift();
            // extract time
            const ms = new Date(file.substring(0, 10) + ' ' + file.substring(11, 16).replace('-', ':') + ':00').getTime();
            if (limit > ms) {
                try {
                    fs.unlinkSync(path.join(this.backupDir, file));
                } catch (e) {
                    this.log.error(`Cannot delete file "${path.join(this.backupDir, file)}: ${JSON.stringify(e)}`);
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

    saveState() {
        try {
            if (fs.existsSync(this.datasetName)) {
                const old = fs.readFileSync(this.datasetName);
                fs.writeFileSync(this.datasetName + '.bak', old);
            }

            const actual = JSON.stringify(this.dataset);
            fs.writeFileSync(this.datasetName, actual);

            if (!this.settings.backup.disabled) {
                // save files for the last x hours
                const now = Date.now();

                // makes backups only if settings.backupInterval is not 0
                if (this.settings.backup.period && (!this.lastSave || now - this.lastSave > this.settings.backup.period)) {
                    this.lastSave = now;
                    const backFileName = path.join(this.backupDir, this.getTimeStr(now) + '_' + this.settings.fileDB.fileName + '.gz');

                    if (!fs.existsSync(backFileName)) {
                        this.zlib = this.zlib || require('zlib');
                        const output = fs.createWriteStream(backFileName);
                        const compress = this.zlib.createGzip();
                        /* The following line will pipe everything written into compress to the file stream */
                        compress.pipe(output);
                        /* Since we're piped through the file stream, the following line will do:
                           'Hello World!'->gzip compression->file which is the desired effect */
                        compress.write(actual);
                        compress.end();

                        // analyse older files
                        this.deleteOldBackupFiles();
                    }
                }
            }
        } catch (e) {
            this.log.error(this.namespace + ' Cannot save ' + this.datasetName + ': ' + e);
        }
        if (this.stateTimer) {
            clearTimeout(this.stateTimer);
            this.stateTimer = null;
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
            this.log.error('Can not publish empty ID');
            return 0;
        }

        const clients = this.getClients();
        let publishCount = 0;

        for (const i in clients) {
            if (clients.hasOwnProperty(i)) {
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
    destroy() {
        this.stateTimer && this.saveState();
    }
}

module.exports = InMemoryFileDB;
