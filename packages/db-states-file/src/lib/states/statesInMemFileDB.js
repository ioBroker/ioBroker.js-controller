/**
 *      States DB in memory - Server
 *
 *      Copyright 2013-2024 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

import { InMemoryFileDB } from '@iobroker/db-base';
import { tools } from '@iobroker/db-base';

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
 */
export class StatesInMemoryFileDB extends InMemoryFileDB {
    constructor(settings) {
        settings = settings || {};
        settings.fileDB = settings.fileDB || {
            fileName: 'states.json',
            backupDirName: 'backup-objects',
        };
        super(settings);

        this.META_ID = '**META**';
        this.logs = {};
        this.session = {};
        this.globalMessageId = Math.round(Math.random() * 100_000_000);
        this.globalLogId = Math.round(Math.random() * 100_000_000);

        this.stateExpires = {};
        this.sessionExpires = {};
        this.ONE_DAY_IN_SECS = 24 * 60 * 60 * 1_000;
        this.writeFileInterval =
            this.settings.connection && typeof this.settings.connection.writeFileInterval === 'number'
                ? parseInt(this.settings.connection.writeFileInterval)
                : 30_000;
        if (settings.jsonlDB) {
            this.log.silly(`${this.namespace} States DB uses file write interval of ${this.writeFileInterval} ms`);
        }

        //this.settings.connection.maxQueue = this.settings.connection.maxQueue || 1000;

        // Reset expires, that are still in DB
        this._expireAll();
    }

    // internal functionality
    _expireAll() {
        Object.keys(this.stateExpires).forEach(id => {
            clearTimeout(this.stateExpires[id]);
            this._expireState(id);
        });
        // Set as expire all states that could expire
        Object.entries(this.dataset).forEach(([id, obj]) => {
            if (obj && obj.expire) {
                this._expireState(id, true);
            }
        });

        if (!this.stateTimer) {
            this.stateTimer = setTimeout(() => this.saveState(), this.writeFileInterval);
        }
    }

    // internal functionality
    _expireState(id, dontPublish) {
        if (this.stateExpires[id] !== undefined) {
            delete this.stateExpires[id];
        }

        if (this.dataset[id] !== undefined) {
            delete this.dataset[id];
            !dontPublish && setImmediate(() => this.publishAll('state', id, null));
        }

        if (!this.stateTimer) {
            this.stateTimer = setTimeout(() => this.saveState(), this.writeFileInterval);
        }
    }

    // internal functionality
    _expireSession(id) {
        if (this.sessionExpires[id] && this.sessionExpires[id].timeout) {
            clearTimeout(this.sessionExpires[id].timeout);
            delete this.sessionExpires[id];
        }

        if (this.session[id] !== undefined) {
            delete this.session[id];
        }
    }

    // Destructor of the class. Called by shutting down.
    // internal functionality
    async destroy() {
        this._expireAll();

        await super.destroy();

        if (this.stateTimer) {
            clearTimeout(this.stateTimer);
            this.stateTimer = null;
        }
    }

    // needed by Server
    _getStates(keys) {
        if (!keys || !Array.isArray(keys)) {
            throw new Error('no keys');
        }
        return keys.map(el => {
            const obj = this.dataset[el];
            return obj !== undefined ? obj : null;
        });
    }

    // needed by Server
    _getState(id) {
        return this.dataset[id];
    }

    _ensureMetaDict() {
        let meta = this.dataset[this.META_ID];
        if (!meta) {
            meta = {};
            this.dataset[this.META_ID] = meta;
        }
        return meta;
    }

    /**
     * Get value of given meta id
     *
     * @param id
     * @returns
     */
    getMeta(id) {
        const meta = this._ensureMetaDict();
        return meta[id];
    }

    /**
     * Sets given value to id in metaNamespace
     *
     * @param id
     * @param value
     */
    setMeta(id, value) {
        const meta = this._ensureMetaDict();
        meta[id] = value;
        // Make sure the object gets re-written, especially when using an external DB
        this.dataset[this.META_ID] = meta;

        setImmediate(() => {
            // publish event in states
            this.log.silly(`${this.namespace} memory publish meta ${id} ${value}`);
            this.publishAll('meta', id, value);
        });

        if (!this.stateTimer) {
            this.stateTimer = setTimeout(() => this.saveState(), this.writeFileInterval);
        }
    }

    // needed by Server
    _setStateDirect(id, obj, expire) {
        if (this.stateExpires[id]) {
            clearTimeout(this.stateExpires[id]);
            delete this.stateExpires[id];
        }

        if (expire) {
            this.stateExpires[id] = setTimeout(() => this._expireState(id), expire * 1000);

            obj.expire = true;
        }
        this.dataset[id] = obj;

        // If val === undefined, the state was just created and not filled with value
        if (obj.val !== undefined) {
            setImmediate(() => {
                // publish event in states
                this.log.silly(`${this.namespace} memory publish ${id} ${JSON.stringify(obj)}`);
                this.publishAll('state', id, obj);
            });
        }

        if (!this.stateTimer) {
            this.stateTimer = setTimeout(() => this.saveState(), this.writeFileInterval);
        }
    }

    // needed by Server
    _delState(id) {
        if (this.stateExpires[id]) {
            clearTimeout(this.stateExpires[id]);
            delete this.stateExpires[id];
        }

        const state = this.dataset[id];
        if (state) {
            delete this.dataset[id];
            setImmediate(() => this.publishAll('state', id, null));
        }

        if (!this.stateTimer) {
            this.stateTimer = setTimeout(() => this.saveState(), this.writeFileInterval);
        }
    }

    // needed by Server
    _getKeys(pattern) {
        const r = new RegExp(tools.pattern2RegEx(pattern));
        return Object.keys(this.dataset).filter(id => r.test(id) && id !== this.META_ID);
    }

    // needed by Server
    _subscribeForClient(client, pattern) {
        this.handleSubscribe(client, 'state', pattern);
    }

    _subscribeMeta(client, pattern) {
        this.handleSubscribe(client, 'meta', pattern);
    }

    // needed by Server
    _unsubscribeForClient(client, pattern) {
        this.handleUnsubscribe(client, 'state', pattern);
    }

    // needed by Server
    _subscribeMessageForClient(client, id) {
        this.handleSubscribe(client, 'messagebox', `messagebox.${id}`);
    }

    // needed by Server
    _unsubscribeMessageForClient(client, id) {
        this.handleUnsubscribe(client, 'messagebox', `messagebox.${id}`);
    }

    // needed by Server
    _subscribeLogForClient(client, id) {
        this.handleSubscribe(client, 'log', `log.${id}`);
    }

    // needed by Server
    _unsubscribeLogForClient(client, id) {
        this.handleUnsubscribe(client, 'log', `log.${id}`);
    }

    // needed by Server
    _getSession(id) {
        return this.session[id];
    }

    // internal functionality
    _handleSessionExpire(id, expireDate) {
        if (this.sessionExpires[id] && this.sessionExpires[id].timeout) {
            clearTimeout(this.sessionExpires[id].timeout);
            delete this.sessionExpires[id];
        }
        const expireDelay = expireDate - Date.now();
        if (expireDelay <= 0) {
            this._expireSession(id);
        } else if (expireDate <= this.ONE_DAY_IN_SECS) {
            this.sessionExpires[id] = {
                sessionEnd: expireDate,
                timeout: setTimeout(() => {
                    this.sessionExpires[id].timeout = null;
                    this._expireSession(id);
                }, expireDate),
            };
        } else {
            this.sessionExpires[id] = {
                sessionEnd: expireDate,
                timeout: setTimeout(() => {
                    this.sessionExpires[id].timeout = null;
                    this._handleSessionExpire(id, expireDate);
                }, this.ONE_DAY_IN_SECS),
            };
        }
    }

    // needed by Server
    _setSession(id, expire, obj) {
        this.session[id] = obj || {};

        if (this.sessionExpires[id] && this.sessionExpires[id].timeout) {
            clearTimeout(this.sessionExpires[id].timeout);
            delete this.sessionExpires[id];
        }

        this._handleSessionExpire(id, Date.now() + expire * 1000);
        this.session[id]._expire = true;
    }

    // needed by Server
    _destroySession(id) {
        if (this.session[id]) {
            delete this.session[id];
        }
    }
}
