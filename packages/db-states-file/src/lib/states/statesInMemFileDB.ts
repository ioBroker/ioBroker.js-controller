/**
 *      States DB in memory - Server
 *
 *      Copyright 2013-2026 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */
/// <reference types="@iobroker/types-dev" />

import { InMemoryFileDB, tools, type FileDbSettings } from '@iobroker/db-base';

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
export class StatesInMemoryFileDB<
    THandler extends {
        _subscribe?: Record<
            string,
            {
                pattern: string;
                regex: RegExp;
            }[]
        >;
    },
> extends InMemoryFileDB<ioBroker.State | Record<string, string>, THandler> {
    protected readonly META_ID: string;
    protected logs: Record<string, any>;
    protected session: Record<string, Record<string, any>>;
    protected globalMessageId: number;
    protected globalLogId: number;
    protected stateExpires: Record<string, NodeJS.Timeout>;
    protected sessionExpires: Record<string, { sessionEnd: number; timeout: NodeJS.Timeout | null }>;
    protected readonly ONE_DAY_IN_SECS: number;
    protected writeFileInterval: number;

    /**
     * @param settings Settings for the states database
     */
    constructor(settings: FileDbSettings<ioBroker.State | Record<string, any>>) {
        settings.fileDB ??= {
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
                ? this.settings.connection.writeFileInterval
                : 30_000;
        if (settings.jsonlDB) {
            this.log.silly(`${this.namespace} States DB uses file write interval of ${this.writeFileInterval} ms`);
        }

        // Reset expires, that are still in DB
        this._expireAll();
    }

    /**
     * Expire all states that have an expiration set and (re)start the save timer
     */
    _expireAll(): void {
        Object.keys(this.stateExpires).forEach(id => {
            clearTimeout(this.stateExpires[id]);
            this._expireState(id);
        });
        // Set as expire all states that could expire
        Object.entries(this.dataset).forEach(([id, obj]) => {
            if ((obj as ioBroker.State)?.expire) {
                this._expireState(id, true);
            }
        });

        if (!this.stateTimer) {
            this.stateTimer = setTimeout(() => this.saveState(), this.writeFileInterval);
        }
    }

    /**
     * Remove an expired state and optionally publish the deletion
     *
     * @param id The ID of the state to expire
     * @param dontPublish If true, do not publish the deletion to subscribers
     */
    _expireState(id: string, dontPublish?: boolean): void {
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

    /**
     * Remove an expired session and clear its timeout
     *
     * @param id The ID of the session to expire
     */
    _expireSession(id: string): void {
        if (this.sessionExpires[id]?.timeout) {
            clearTimeout(this.sessionExpires[id].timeout);
            delete this.sessionExpires[id];
        }

        if (this.session[id] !== undefined) {
            delete this.session[id];
        }
    }

    /**
     * Destructor of the class. Called when shutting down to expire states and clear the save timer.
     */
    async destroy(): Promise<void> {
        this._expireAll();

        await super.destroy();

        if (this.stateTimer) {
            clearTimeout(this.stateTimer);
            this.stateTimer = null;
        }
    }

    /**
     * Get the values of the given state IDs (used by the server)
     *
     * @param keys The state IDs to read
     */
    _getStates(keys: string[]): any[] {
        if (!keys || !Array.isArray(keys)) {
            throw new Error('no keys');
        }
        return keys.map(el => {
            const obj = this.dataset[el];
            return obj !== undefined ? obj : null;
        });
    }

    /**
     * Get the value of a single state (used by the server)
     *
     * @param id The state ID to read
     */
    _getState(id: string): ioBroker.State {
        return this.dataset[id] as ioBroker.State;
    }

    /**
     * Get the meta dictionary, creating it if it does not exist yet
     */
    _ensureMetaDict(): Record<string, any> {
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
     * @param id The meta ID to read
     * @returns the stored meta value
     */
    getMeta(id: string): any {
        const meta = this._ensureMetaDict();
        return meta[id];
    }

    /**
     * Sets given value to ID in metaNamespace
     *
     * @param id The meta ID to write
     * @param value The value to store
     */
    setMeta(id: string, value: string): void {
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

    /**
     * Directly set a state value and optionally schedule its expiration (used by the server)
     *
     * @param id The state ID to set
     * @param obj The state object to store
     * @param expire Optional expiration time in seconds
     */
    _setStateDirect(id: string, obj: ioBroker.State, expire?: number): void {
        if (this.stateExpires[id]) {
            clearTimeout(this.stateExpires[id]);
            delete this.stateExpires[id];
        }
        this.dataset[id] = obj;

        if (expire) {
            this.stateExpires[id] = setTimeout(() => this._expireState(id), expire * 1000);
            this.dataset[id].expire = 1;
        }
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

    /**
     * Delete a state and publish the deletion (used by the server)
     *
     * @param id The state ID to delete
     */
    _delState(id: string): void {
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

    /**
     * Get all state IDs matching the given pattern (used by the server)
     *
     * @param pattern The pattern to match state IDs against
     */
    _getKeys(pattern: string): string[] {
        const r = new RegExp(tools.pattern2RegEx(pattern));
        return Object.keys(this.dataset).filter(id => r.test(id) && id !== this.META_ID);
    }

    /**
     * Subscribe a client to state changes (used by the server)
     *
     * @param client The client to subscribe
     * @param pattern The pattern of state IDs to subscribe to
     */
    _subscribeForClient(client: any, pattern: string): void {
        this.handleSubscribe(client, 'state', pattern);
    }

    /**
     * Subscribe a client to meta changes
     *
     * @param client The client to subscribe
     * @param pattern The pattern of meta IDs to subscribe to
     */
    _subscribeMeta(client: any, pattern: string): void {
        this.handleSubscribe(client, 'meta', pattern);
    }

    /**
     * Unsubscribe a client from state changes (used by the server)
     *
     * @param client The client to unsubscribe
     * @param pattern The pattern of state IDs to unsubscribe from
     */
    _unsubscribeForClient(client: any, pattern: string): void {
        (this.handleUnsubscribe(client, 'state', pattern) as Promise<void>).catch(e =>
            this.log.error(`${this.namespace} Cannot unsubscribe client from states: ${e.message}`),
        );
    }

    /**
     * Subscribe a client to its message box (used by the server)
     *
     * @param client The client to subscribe
     * @param id The ID of the message box owner
     */
    _subscribeMessageForClient(client: any, id: string): void {
        this.handleSubscribe(client, 'messagebox', `messagebox.${id}`);
    }

    /**
     * Unsubscribe a client from its message box (used by the server)
     *
     * @param client The client to unsubscribe
     * @param id The ID of the message box owner
     */
    _unsubscribeMessageForClient(client: any, id: string): void {
        (this.handleUnsubscribe(client, 'messagebox', `messagebox.${id}`) as Promise<void>).catch(e =>
            this.log.error(`${this.namespace} Cannot unsubscribe client from messagebox: ${e.message}`),
        );
    }

    /**
     * Subscribe a client to log messages (used by the server)
     *
     * @param client The client to subscribe
     * @param id The ID of the log owner
     */
    _subscribeLogForClient(client: any, id: string): void {
        this.handleSubscribe(client, 'log', `log.${id}`);
    }

    /**
     * Unsubscribe a client from log messages (used by the server)
     *
     * @param client The client to unsubscribe
     * @param id The ID of the log owner
     */
    _unsubscribeLogForClient(client: any, id: string): void {
        (this.handleUnsubscribe(client, 'log', `log.${id}`) as Promise<void>).catch(e =>
            this.log.error(`${this.namespace} Cannot unsubscribe client from log: ${e.message}`),
        );
    }

    /**
     * Get a session by its ID (used by the server)
     *
     * @param id The session ID to read
     */
    _getSession(id: string): any {
        return this.session[id];
    }

    /**
     * Schedule the expiration of a session, splitting long delays into daily chunks
     *
     * @param id The session ID
     * @param expireDate Timestamp in milliseconds when the session should expire
     */
    _handleSessionExpire(id: string, expireDate: number): void {
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

    /**
     * Create or update a session and schedule its expiration (used by the server)
     *
     * @param id The session ID
     * @param expire Expiration time in seconds from now
     * @param sessionData The session data to store
     */
    _setSession(id: string, expire: number, sessionData: Record<string, any>): void {
        this.session[id] = sessionData || {};

        if (this.sessionExpires[id] && this.sessionExpires[id].timeout) {
            clearTimeout(this.sessionExpires[id].timeout);
            delete this.sessionExpires[id];
        }

        this._handleSessionExpire(id, Date.now() + expire * 1000);
        this.session[id]._expire = true;
    }

    /**
     * Destroy a session immediately (used by the server)
     *
     * @param id The session ID to destroy
     */
    _destroySession(id: string): void {
        if (this.session[id]) {
            delete this.session[id];
        }
    }
}
