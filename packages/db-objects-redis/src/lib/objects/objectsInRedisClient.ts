/**
 * Object DB in REDIS - Client
 *
 * MIT License
 * Written by bluefox <dogafox@gmail.com>, 2014-2022
 *
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const extend = require('node.extend');
import Redis from 'ioredis';
import type IORedis from 'ioredis';
import { tools } from '@iobroker/db-base';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { isDeepStrictEqual } from 'util';
import deepClone from 'deep-clone';
import * as utils from './objectsUtils.js';
import semver from 'semver';
import * as CONSTS from './constants';
import type { InternalLogger } from '@iobroker/js-controller-common/tools';
import type { ACLObject, CheckFileRightsCallback } from './objectsUtils.js';
const ERRORS = CONSTS.ERRORS;

type ChangeFunction = (id: string, object: Record<string, any> | null) => void;

type GetUserGroupCallbackNoError = (user: string, groups: string[], acl: ioBroker.ObjectPermissions) => void;

interface ViewFuncResult<T> {
    rows: ioBroker.GetObjectViewItem<T>[];
}

interface ObjectListResult {
    rows: ioBroker.GetObjectListItem[];
}

interface ObjectsSettings {
    connected: () => void;
    controller?: boolean;
    primaryHostLost?: () => void;
    disconnected?: () => void;
    change?: ChangeFunction;
    changeUser?: ChangeFunction;
    autoConnect: boolean;
    logger: InternalLogger;
    hostname?: string;
    namespace?: string;
    defaultNewAcl?: ACLObject;
    metaNamespace?: string;
    redisNamespace?: string;
    connection: Record<string, any>; // TODO: wait for states-redis pr
}

type FileObject = ioBroker.Object & { virtualFile?: boolean; stats: any; modifiedAt: number; createdAt: number };

interface CallOptions {
    groups?: string[];
    group?: string;
    user?: string;
    owner?: string;
    ownerGroup?: string;
    acl?: any;
    [other: string]: any;
}

interface ObjectIdValue {
    id: string;
    value: ioBroker.Object;
}

interface ObjectViewFunction {
    map: string;
    reduce?: '_stats';
}

interface WriteFileOptions extends CallOptions {
    mimeType?: string;
}

interface MetaObject {
    modifiedAt?: number;
    createdAt?: number;
    binary?: boolean;
    mimeType?: string;
    notExists?: boolean;
    path?: string;
    file?: string;
    stats?: any;
    isDir?: boolean;
    acl?: any;
}

interface Script {
    name: string;
    hash: string;
    text: Buffer;
    loaded?: boolean;
}

class ObjectsInRedisClient {
    private client: IORedis.Redis | null;
    private readonly fileNamespace: string;
    private readonly redisNamespace: string;
    private readonly fileNamespaceL: number;
    private readonly objNamespace: string;
    private readonly setNamespace: string;
    private readonly metaNamespace: string;
    private readonly objNamespaceL: number;
    private readonly supportedProtocolVersions: string[];
    private stop: boolean;
    private sub: IORedis.Redis | null;
    private subSystem: IORedis.Redis | null;
    private settings: ObjectsSettings;
    private readonly preserveSettings: string[];
    private defaultNewAcl: ACLObject | null;
    private readonly namespace: string;
    private readonly hostname: string;
    private scripts: Record<string, any>; // TODO
    private readonly existingMetaObjects: Record<string, any>; // TODO
    private log: InternalLogger;
    private activeProtocolVersion?: string;
    private useSets?: boolean;
    private noLegacyMultihost?: boolean;
    private readonly userSubscriptions: Record<string, boolean>;
    private readonly systemSubscriptions: Record<string, boolean>;

    constructor(settings: ObjectsSettings) {
        this.settings = settings || {};
        this.redisNamespace =
            (this.settings.redisNamespace ||
                (this.settings.connection && this.settings.connection.redisNamespace) ||
                'cfg') + '.';
        this.fileNamespace = this.redisNamespace + 'f.';
        this.fileNamespaceL = this.fileNamespace.length;
        this.objNamespace = this.redisNamespace + 'o.';
        this.setNamespace = this.redisNamespace + 's.';
        this.metaNamespace = (this.settings.metaNamespace || 'meta') + '.';
        this.objNamespaceL = this.objNamespace.length;
        this.supportedProtocolVersions = ['4'];

        this.stop = false;
        this.client = null;
        this.sub = null;
        this.subSystem = null;
        this.preserveSettings = ['custom', 'smartName', 'material', 'habpanel', 'mobile'];
        this.defaultNewAcl = this.settings.defaultNewAcl || null;
        this.namespace = this.settings.namespace || this.settings.hostname || '';
        this.hostname = this.settings.hostname || tools.getHostName();
        this.scripts = {};
        this.userSubscriptions = {};
        this.systemSubscriptions = {};

        // cached meta objects for file operations
        this.existingMetaObjects = {};

        this.log = tools.getLogger(this.settings.logger);

        if (this.settings.autoConnect !== false) {
            this.connectDb();
        }
    }

    /**
     * Checks if we are allowed to start and sets the protocol version accordingly
     *
     * @returns {Promise<void>}
     * @private
     */
    async _determineProtocolVersion() {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        let protoVersion;
        try {
            protoVersion = await this.client.get(`${this.metaNamespace}objects.protocolVersion`);
        } catch (e) {
            if (e.message.includes('GET-UNSUPPORTED')) {
                // secondary updated and primary < 4.0
                return;
            }
        }

        if (!protoVersion) {
            // if no proto version existent yet, we set ours
            const highestVersion = Math.max(...this.supportedProtocolVersions.map(value => parseInt(value)));
            await this.setProtocolVersion(highestVersion);
            this.activeProtocolVersion = highestVersion.toString();
            return;
        }

        // check if we can support this version
        if (this.supportedProtocolVersions.includes(protoVersion)) {
            this.activeProtocolVersion = protoVersion;
        } else {
            throw new Error(`This host does not support protocol version "${protoVersion}"`);
        }
    }

    connectDb() {
        this.settings.connection = this.settings.connection || {};

        const onChange = this.settings.change; // on change handler
        const onChangeUser = this.settings.changeUser; // on change handler for User events

        // limit max number of log entries in the list
        this.settings.connection.maxQueue = this.settings.connection.maxQueue || 1000;

        this.settings.connection.options = this.settings.connection.options || {};
        const retry_max_delay = this.settings.connection.options.retry_max_delay || 5000;
        const retry_max_count = this.settings.connection.options.retry_max_count || 19;

        let ready = false;
        let initError = false;
        let ignoreErrors = false;
        let connected = false;
        let reconnectCounter = 0;
        let errorLogged = false;

        this.settings.connection.options.retryStrategy = (reconnectCount: number) => {
            if (!ready && initError && ignoreErrors) {
                return new Error('No more tries');
            }
            if (this.stop) {
                return new Error('Client has stopped ... no retries anymore');
            }
            if (ready && reconnectCount >= retry_max_count) {
                return new Error('Stop trying to reconnect');
            }
            // A function that receives an options object as parameter including the retry attempt,
            // the total_retry_time indicating how much time passed since the last time connected,
            // the error why the connection was lost and the number of times_connected in total.
            // If you return a number from this function, the retry will happen exactly after that
            // time in milliseconds. If you return a non-number, no further retry will happen and
            // all offline commands are flushed with errors. Return an error to return that
            // specific error to all offline commands.

            if (!ready) {
                return 300;
            } else {
                return retry_max_delay;
            }
            /*if (options.error.code === 'ECONNREFUSED') {
                // End reconnecting on a specific error and flush all commands with a individual error
                return new Error('The server refused the connection');
            }
            if (options.total_retry_time > 1000 * 60 * 60) {
                // End reconnecting after a specific timeout and flush all commands with a individual error
                return new Error('Retry time exhausted');
            }
            if (options.times_connected > 10) {
                // End reconnecting with built in error
                return undefined;
            }
            // reconnect after
            return Math.max(options.attempt * 100, 3000);*/
        };

        delete this.settings.connection.options.retry_max_delay;
        this.settings.connection.options.enableReadyCheck = true;

        if (this.settings.connection.port === 0) {
            // Port = 0 means unix socket
            // initiate a unix socket connection
            this.settings.connection.options.path = this.settings.connection.host;
            this.log.debug(
                `${this.namespace} Redis Objects: Use File Socket for connection: ${this.settings.connection.options.path}`
            );
        } else if (Array.isArray(this.settings.connection.host)) {
            // Host is an array means we use a sentinel
            const defaultPort = Array.isArray(this.settings.connection.port) ? null : this.settings.connection.port;

            this.settings.connection.options.sentinels = this.settings.connection.host.map((redisNode, idx) => ({
                host: redisNode,
                port: defaultPort || this.settings.connection.port[idx]
            }));

            this.settings.connection.options.name = this.settings.connection.sentinelName
                ? this.settings.connection.sentinelName
                : 'mymaster';
            this.log.debug(
                `${this.namespace} Redis Objects: Use Sentinel for connection: ${
                    this.settings.connection.options.name
                }, ${JSON.stringify(this.settings.connection.options.sentinels)}`
            );
        } else {
            this.settings.connection.options.host = this.settings.connection.host;
            this.settings.connection.options.port = this.settings.connection.port;
            this.log.debug(
                `${this.namespace} Redis Objects: Use Redis connection: ${this.settings.connection.options.host}:${this.settings.connection.options.port}`
            );
        }
        this.settings.connection.options.db = this.settings.connection.options.db || 0;
        this.settings.connection.options.family = this.settings.connection.options.family || 0;
        this.settings.connection.options.password =
            this.settings.connection.options.auth_pass || this.settings.connection.pass || null;

        this.settings.connection.options.autoResubscribe = false; // We do our own resubscribe because other sometimes not work
        // REDIS does not allow whitespaces, we have some because of pid
        this.settings.connection.options.connectionName = this.namespace.replace(/\s/g, '');

        this.client = new Redis(this.settings.connection.options);

        this.client.on('error', error => {
            this.settings.connection.enhancedLogging &&
                this.log.silly(
                    `${this.namespace} Redis ERROR Objects: (${ignoreErrors}/${this.stop}) ${error.message} / ${error.stack}`
                );
            if (this.stop) {
                return;
            }
            if (!ready) {
                initError = true;
                // Seems we have a socket.io server
                if (!ignoreErrors && error.message.startsWith('Protocol error, got "H" as reply type byte.')) {
                    this.log.error(
                        `${this.namespace} Could not connect to objects database at ${this.settings.connection.options.host}:${this.settings.connection.options.port} (invalid protocol). Please make sure the configured IP and port points to a host running JS-Controller >= 2.0. and that the port is not occupied by other software!`
                    );
                }
                return;
            }
            this.log.error(`${this.namespace} Objects database error: ${error.message}`);
            errorLogged = true;
        });

        this.client.on('end', () => {
            this.settings.connection.enhancedLogging &&
                this.log.silly(`${this.namespace} Objects-Redis Event end (stop=${this.stop})`);
            ready && typeof this.settings.disconnected === 'function' && this.settings.disconnected();
        });

        this.client.on('connect', () => {
            this.settings.connection.enhancedLogging &&
                this.log.silly(`${this.namespace} Objects-Redis Event connect (stop=${this.stop})`);
            connected = true;
            if (errorLogged) {
                this.log.info(`${this.namespace} Objects database successfully reconnected`);
                errorLogged = false;
            }
        });

        this.client.on('close', () => {
            this.settings.connection.enhancedLogging &&
                this.log.silly(`${this.namespace} Objects-Redis Event close (stop=${this.stop})`);
            //if (ready && typeof this.settings.disconnected === 'function') this.settings.disconnected();
        });

        this.client.on('reconnecting', () => {
            if (connected && !ready && !initError && !ignoreErrors) {
                reconnectCounter++;
            }

            this.settings.connection.enhancedLogging &&
                this.log.silly(
                    `${this.namespace} Objects-Redis Event reconnect (reconnectCounter=${reconnectCounter}, stop=${this.stop})`
                );

            if (reconnectCounter > 2) {
                // fallback logic for nodejs <10
                this.log.error(
                    `${this.namespace} The DB port  ${this.settings.connection.options.port} is occupied by something that is not a Redis protocol server. Please check other software running on this port or, if you use iobroker, make sure to update to js-controller 2.0 or higher!`
                );
                return;
            }
            connected = false;
            initError = false;
        });

        this.client.on('ready', async () => {
            if (this.stop || !this.client) {
                return;
            }
            initError = false;
            ignoreErrors = false;

            this.log.debug(`${this.namespace} Objects client ready ... initialize now`);
            try {
                await this.client.config('SET', 'lua-time-limit', 10000); // increase LUA timeout TODO still necessary with scan?
            } catch (e) {
                this.log.warn(`${this.namespace} Unable to increase LUA script timeout: ${e.message}`);
            }

            let initCounter = 0;
            if (!this.subSystem && typeof onChange === 'function') {
                initCounter++;
                this.log.debug(`${this.namespace} Objects create System PubSub Client`);
                this.subSystem = new Redis(this.settings.connection.options);

                if (typeof this.settings.primaryHostLost === 'function') {
                    try {
                        // enable Expiry/Evicted events in server - same as states (could be same db)
                        await this.client.config('SET', 'notify-keyspace-events', 'Exe');
                    } catch (e) {
                        this.log.warn(
                            `${this.namespace} Unable to enable Expiry Keyspace events from Redis Server: ${e.message}`
                        );
                    }

                    this.subSystem.on('message', (channel, message) => {
                        if (
                            channel === `__keyevent@${this.settings.connection.options.db}__:expired` ||
                            channel === `__keyevent@${this.settings.connection.options.db}__:evicted`
                        ) {
                            this.log.silly(`${this.namespace} redis message expired/evicted ${channel}:${message}`);

                            if (
                                message === `${this.metaNamespace}objects.primaryHost` &&
                                typeof this.settings.primaryHostLost === 'function'
                            ) {
                                this.settings.primaryHostLost();
                            }
                        }
                    });
                }

                if (typeof onChange === 'function') {
                    this.subSystem.on('pmessage', (pattern, channel, message) =>
                        setImmediate(() => {
                            this.log.silly(
                                `${this.namespace} Objects system redis pmessage ${pattern}/${channel}:${message}`
                            );

                            if (channel.startsWith(this.metaNamespace)) {
                                if (
                                    channel === `${this.metaNamespace}objects.protocolVersion` &&
                                    message !== this.activeProtocolVersion
                                ) {
                                    if (typeof this.settings.disconnected === 'function') {
                                        // protocol version has changed, restart controller
                                        this.log.info(
                                            `${this.namespace} Objects protocol version has changed, disconnecting!`
                                        );
                                        this.settings.disconnected();
                                    }
                                } else if (channel === `${this.metaNamespace}objects.features.useSets`) {
                                    const newUseSets = !!parseInt(message);
                                    if (newUseSets !== this.useSets) {
                                        this.log.info(
                                            `${this.namespace} Sets ${
                                                newUseSets ? 'activated' : 'deactivated'
                                            }: restarting ...`
                                        );
                                        this.useSets = newUseSets;
                                        // luas are no longer up to date, lets restart
                                        if (typeof this.settings.disconnected === 'function') {
                                            this.settings.disconnected();
                                        }
                                    }
                                }
                                return;
                            }

                            try {
                                if (channel.startsWith(this.objNamespace) && channel.length > this.objNamespaceL) {
                                    const id = channel.substring(this.objNamespaceL);
                                    try {
                                        const obj = message ? JSON.parse(message) : null;

                                        if (
                                            id === 'system.config' &&
                                            obj &&
                                            obj.common &&
                                            obj.common.defaultNewAcl &&
                                            !isDeepStrictEqual(obj.common.defaultNewAcl, this.defaultNewAcl)
                                        ) {
                                            this.defaultNewAcl = deepClone(obj.common.defaultNewAcl);
                                            this.settings.controller && this.setDefaultAcl(this.defaultNewAcl);
                                        }

                                        onChange(id, obj);
                                    } catch (e) {
                                        this.log.warn(
                                            `${this.namespace} Objects Cannot process system pmessage ${id} - ${message}: ${e.message}`
                                        );
                                        this.log.warn(`${this.namespace} ${e.stack}`);
                                    }
                                } else {
                                    this.log.warn(
                                        `${this.namespace} Objects Received unexpected system pmessage: ${channel}`
                                    );
                                }
                            } catch (e) {
                                this.log.warn(
                                    `${this.namespace} Objects system pmessage ${channel} ${JSON.stringify(message)} ${
                                        e.message
                                    }`
                                );
                                this.log.warn(`${this.namespace} ${e.stack}`);
                            }
                        })
                    );
                }

                this.subSystem.on('end', () => {
                    this.settings.connection.enhancedLogging &&
                        this.log.silly(`${this.namespace} Objects-Redis System Event end sub (stop=${this.stop})`);
                    ready && typeof this.settings.disconnected === 'function' && this.settings.disconnected();
                });

                this.subSystem.on('error', error => {
                    if (this.stop) {
                        return;
                    }
                    this.settings.connection.enhancedLogging &&
                        this.log.silly(
                            this.namespace +
                                ' PubSub System client Objects No redis connection: ' +
                                JSON.stringify(error)
                        );
                });

                if (this.settings.connection.enhancedLogging) {
                    this.subSystem.on('connect', () =>
                        this.log.silly(
                            `${this.namespace} PubSub System client Objects-Redis Event connect (stop=${this.stop})`
                        )
                    );

                    this.subSystem.on('close', () =>
                        this.log.silly(
                            `${this.namespace} PubSub System client Objects-Redis Event close (stop=${this.stop})`
                        )
                    );

                    this.subSystem.on('reconnecting', reconnectCounter =>
                        this.log.silly(
                            `${this.namespace} PubSub System client Objects-Redis Event reconnect (reconnectCounter=${reconnectCounter}, stop=${this.stop})`
                        )
                    );
                }

                this.subSystem.on('ready', async () => {
                    if (--initCounter < 1) {
                        if (this.settings.connection.port === 0) {
                            this.log.debug(
                                `${this.namespace} Objects ${ready ? 'system re' : ''}connected to redis: ${
                                    this.settings.connection.host
                                }`
                            );
                        } else {
                            this.log.debug(
                                `${this.namespace} Objects ${ready ? 'system re' : ''}connected to redis: ${
                                    this.settings.connection.host
                                }:${this.settings.connection.port}`
                            );
                        }
                        !ready && typeof this.settings.connected === 'function' && this.settings.connected();
                        ready = true;
                    }
                    // subscribe on system.config anytime because also adapters need stuff like defaultNewAcl (especially admin)
                    try {
                        this.subSystem && (await this.subSystem.psubscribe(`${this.objNamespace}system.config`));
                    } catch {
                        // ignore
                    }

                    // subscribe to meta changes
                    try {
                        this.subSystem && (await this.subSystem.psubscribe(`${this.metaNamespace}*`));
                    } catch (e) {
                        this.log.warn(
                            `${this.namespace} Unable to subscribe to meta namespace "${this.metaNamespace}" changes: ${e.message}`
                        );
                    }

                    if (this.subSystem) {
                        for (const sub of Object.keys(this.systemSubscriptions)) {
                            try {
                                await this.subSystem.psubscribe(sub);
                            } catch {
                                // ignore
                            }
                        }
                    }
                });
            }

            if (!this.sub && typeof onChangeUser === 'function') {
                initCounter++;
                this.log.debug(`${this.namespace} Objects create User PubSub Client`);
                this.sub = new Redis(this.settings.connection.options);

                this.sub.on('pmessage', (pattern, channel, message) => {
                    setImmediate(() => {
                        this.log.silly(
                            `${this.namespace} Objects user redis pmessage ${pattern}/${channel}:${message}`
                        );
                        try {
                            if (channel.startsWith(this.objNamespace) && channel.length > this.objNamespaceL) {
                                const id = channel.substring(this.objNamespaceL);
                                try {
                                    const obj = message ? JSON.parse(message) : null;

                                    onChangeUser(id, obj);
                                } catch (e) {
                                    this.log.warn(
                                        `${this.namespace} Objects user cannot process pmessage ${id} - ${message}: ${e.message}`
                                    );
                                    this.log.warn(`${this.namespace} ${e.stack}`);
                                }
                            } else {
                                this.log.warn(
                                    `${this.namespace} Objects user received unexpected pmessage: ${channel}`
                                );
                            }
                        } catch (e) {
                            this.log.warn(
                                `${this.namespace} Objects user pmessage ${channel} ${JSON.stringify(message)} ${
                                    e.message
                                }`
                            );
                            this.log.warn(`${this.namespace} ${e.stack}`);
                        }
                    });
                });

                this.sub.on('end', () => {
                    this.settings.connection.enhancedLogging &&
                        this.log.silly(`${this.namespace} Objects-Redis Event end user sub (stop=${this.stop})`);
                    ready && typeof this.settings.disconnected === 'function' && this.settings.disconnected();
                });

                this.sub.on('error', error => {
                    if (this.stop) {
                        return;
                    }
                    this.settings.connection.enhancedLogging &&
                        this.log.silly(
                            `${this.namespace} PubSub user client Objects No redis connection: ${JSON.stringify(error)}`
                        );
                });

                if (this.settings.connection.enhancedLogging) {
                    this.sub.on('connect', () =>
                        this.log.silly(
                            `${this.namespace} PubSub user client Objects-Redis Event connect (stop=${this.stop})`
                        )
                    );

                    this.sub.on('close', () =>
                        this.log.silly(
                            `${this.namespace} PubSub user client Objects-Redis Event close (stop=${this.stop})`
                        )
                    );

                    this.sub.on('reconnecting', reconnectCounter =>
                        this.log.silly(
                            `${this.namespace} PubSub user client Objects-Redis Event reconnect (reconnectCounter=${reconnectCounter}, stop=${this.stop})`
                        )
                    );
                }

                this.sub.on('ready', async () => {
                    if (!this.sub) {
                        // client gone while ready emitted, can maybe not happen but ts is happy
                        return;
                    }

                    if (--initCounter < 1) {
                        if (this.settings.connection.port === 0) {
                            this.log.debug(
                                `${this.namespace} Objects ${ready ? 'user re' : ''}connected to redis: ${
                                    this.settings.connection.host
                                }`
                            );
                        } else {
                            this.log.debug(
                                `${this.namespace} Objects ${ready ? 'user re' : ''}connected to redis: ${
                                    this.settings.connection.host
                                }:${this.settings.connection.port}`
                            );
                        }
                        !ready && typeof this.settings.connected === 'function' && this.settings.connected();
                        ready = true;
                    }

                    for (const sub of Object.keys(this.userSubscriptions)) {
                        try {
                            await this.sub.psubscribe(sub);
                        } catch {
                            // ignore
                        }
                    }
                });
            }

            if (!this.client) {
                return;
            }

            // do this before starting with async calls ;-)
            initCounter++;

            try {
                // check if we are allowed to use sets
                this.useSets = !!parseInt(
                    (await this.client.get(`${this.metaNamespace}objects.features.useSets`)) || '0'
                );
            } catch (e) {
                // if unsupported we have a legacy host
                if (!e.message.includes('UNSUPPORTED')) {
                    this.log.error(`${this.namespace} Cannot determine Set feature status: ${e.message}`);
                    return;
                } else {
                    this.useSets = false;
                }
            }

            try {
                await this._determineProtocolVersion();
            } catch (e) {
                this.log.error(`${this.namespace} ${e.message}`);
                throw new Error('Objects DB is not allowed to start in the current Multihost environment');
            }

            // for controller v4 we have to check if we can use the new lua scripts and set logic
            // TODO: remove this backward shim if controller v4.0 is old enough
            let keys = await this._getKeysViaScan(`${this.objNamespace}system.host.*`);

            // filter out obvious non-host objects
            const hostRegex = new RegExp(`^${this.objNamespace.replace(/\./g, '\\.')}system\\.host\\.[^.]+$`);
            keys = keys.filter(id => hostRegex.test(id));
            /** if false we have a host smaller 4 (no proto version for this existing) */
            this.noLegacyMultihost = true;

            try {
                if (keys.length) {
                    // else no host known yet - so we are single host
                    const objs = await this.client.mget(keys);
                    for (const strObj of objs) {
                        const obj = strObj !== null ? JSON.parse(strObj) : strObj;
                        if (
                            obj &&
                            obj.type === 'host' &&
                            obj._id !== `system.host.${this.hostname}` &&
                            obj.common &&
                            obj.common.installedVersion &&
                            semver.lt(obj.common.installedVersion, '4.0.0')
                        ) {
                            // one of the host has a version smaller 4, we have to use legacy db
                            this.noLegacyMultihost = false;
                            this.log.info(`${this.namespace} Sets unsupported`);
                        }
                    }
                }
            } catch (e) {
                this.log.error(
                    `${this.namespace} Cannot determine Lua scripts strategy: ${e.message} ${JSON.stringify(keys)}`
                );
                return;
            }

            this.log.debug(`${this.namespace} Objects client initialize lua scripts`);

            try {
                await this.loadLuaScripts();
            } catch (err) {
                this.log.error(`${this.namespace} Cannot initialize database scripts: ${err.message}`);
                return;
            }

            // init default new acl
            let obj;
            try {
                obj = await this.client.get(`${this.objNamespace}system.config`);
            } catch {
                // ignore
            }
            if (obj) {
                try {
                    obj = JSON.parse(obj);
                } catch {
                    this.log.error(`${this.namespace} Cannot parse JSON system.config: ${obj}`);
                    obj = null;
                }
                if (obj && obj.common && obj.common.defaultNewAcl) {
                    this.defaultNewAcl = obj.common.defaultNewAcl;
                }
            } else {
                this.log.error(`${this.namespace} Cannot read system.config: ${obj} (OK when migrating or restoring)`);
            }

            if (--initCounter < 1) {
                if (this.settings.connection.port === 0) {
                    this.log.debug(
                        this.namespace +
                            ' Objects ' +
                            (ready ? 'client re' : '') +
                            'connected to redis: ' +
                            this.settings.connection.host
                    );
                } else {
                    this.log.debug(
                        this.namespace +
                            ' Objects ' +
                            (ready ? 'client re' : '') +
                            'connected to redis: ' +
                            this.settings.connection.host +
                            ':' +
                            this.settings.connection.port
                    );
                }
                !ready && typeof this.settings.connected === 'function' && this.settings.connected();
                ready = true;
            }
        });
    }

    getStatus() {
        return { type: 'redis', server: false };
    }

    /**
     * Checks if given Id is a meta object, else throws error
     *
     * @param {string} id to check
     * @throws Error if id is invalid
     */
    async validateMetaObject(id: string): Promise<void> {
        if (this.existingMetaObjects[id] === undefined) {
            // if not cached -> getObject
            const obj = await this.getObjectAsync(id);
            if (obj && obj.type === 'meta') {
                this.existingMetaObjects[id] = true;
            } else {
                this.existingMetaObjects[id] = false;
                return Promise.reject(new Error(`${id} is not an object of type "meta"`));
            }
        } else if (this.existingMetaObjects[id] === false) {
            return Promise.reject(new Error(`${id} is not an object of type "meta"`));
        }
    }

    normalizeFilename(name: string): string {
        return name ? name.replace(/[/\\]+/g, '/') : name;
    }

    // -------------- FILE FUNCTIONS -------------------------------------------
    private async _setBinaryState(id: string, data: Buffer, callback?: ioBroker.ErrorCallback): Promise<void> {
        if (!this.client) {
            return tools.maybeCallbackWithRedisError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        if (!Buffer.isBuffer(data)) {
            data = Buffer.from(data);
        }
        try {
            await this.client.set(id, data);
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * get buffer of given id from redis
     *
     * @param id - id of the data with namespace prefix
     */
    private _getBinaryState(id: string): Promise<Buffer> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        return this.client.getBuffer(id);
    }

    /**
     * deletes binary state of given id from redis db
     *
     * @param id - id to delete, with namespace prefix
     */
    private async _delBinaryState(id: string): Promise<void> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        } else {
            await this.client.del(id);
        }
    }

    getFileId(id: string, name: string, isMeta?: boolean): string {
        name = this.normalizeFilename(name);
        // e.g. ekey.admin and admin/ekey.png
        if (id.endsWith('.admin')) {
            if (name.startsWith('admin/')) {
                name = name.replace(/^admin\//, '');
            } else if (name.match(/^iobroker.[-\d\w]\/admin\//i)) {
                // e.g. ekey.admin and iobroker.ekey/admin/ekey.png
                name = name.replace(/^iobroker.[-\d\w]\/admin\//i, '');
            }
        }
        let normalized;
        try {
            normalized = utils.sanitizePath(id, name);
        } catch {
            this.log.debug(this.namespace + ' Invalid file path ' + id + '/' + name);
            return '';
        }
        if (id !== '*') {
            id = normalized.id;
        }
        name = normalized.name;

        return `${this.fileNamespace + id}$%$${name}${isMeta !== undefined ? (isMeta ? '$%$meta' : '$%$data') : ''}`;
    }

    async checkFile(
        id: string,
        name: string,
        options: CallOptions,
        flag: any,
        callback?: (checkFailed: boolean, options: CallOptions, fileOptions?: { notExists: boolean }) => void
    ) {
        // read file settings from redis
        const fileId = this.getFileId(id, name, true);
        if (!fileId) {
            const fileOptions = { notExists: true };
            if (utils.checkFile(fileOptions, options, flag, this.defaultNewAcl)) {
                return tools.maybeCallback(callback, false, options, fileOptions); // NO error
            } else {
                return tools.maybeCallback(callback, true, options); // error
            }
        }
        if (!this.client) {
            // TODO: not in specs, better just maybe cb check false?
            return tools.maybeCallbackWithRedisError(callback, ERRORS.ERROR_DB_CLOSED, options);
        }
        let fileOptions;
        try {
            fileOptions = await this.client.get(fileId);
        } catch {
            // ignore
        }
        fileOptions = fileOptions || '{"notExists": true}';
        try {
            fileOptions = JSON.parse(fileOptions);
        } catch {
            this.log.error(`${this.namespace} Cannot parse JSON ${id}: ${fileOptions}`);
            fileOptions = { notExists: true };
        }
        if (utils.checkFile(fileOptions, options, flag, this.defaultNewAcl)) {
            return typeof callback === 'function' && callback(false, options, fileOptions); // NO error
        } else {
            return typeof callback === 'function' && callback(true, options); // error
        }
    }

    checkFileRights(
        id: string,
        name: string | null,
        options?: CallOptions | null,
        flag?: any,
        callback?: CheckFileRightsCallback
    ) {
        return utils.checkFileRights(this, id, name, options, flag, callback);
    }

    private async _setDefaultAcl(ids: string[], defaultAcl: any): Promise<void> {
        for (const id of ids) {
            try {
                const obj = await this.getObject(id);
                if (obj && !obj.acl) {
                    obj.acl = defaultAcl;
                    await this.setObjectAsync(id, obj, null);
                }
            } catch (e) {
                this.log.error(
                    `${this.namespace} _setDefaultAcl error on id "${id}" with acl "${JSON.stringify(defaultAcl)}": ${
                        e.message
                    }`
                );
            }
        }
    }

    async setDefaultAcl(defaultNewAcl: ACLObject | null) {
        this.defaultNewAcl = defaultNewAcl || {
            owner: CONSTS.SYSTEM_ADMIN_USER,
            ownerGroup: CONSTS.SYSTEM_ADMIN_GROUP,
            object: 0x664,
            state: 0x664,
            file: 0x664
        };
        try {
            // Get ALL Objects
            const ids = await this.getKeysAsync('*');
            await this._setDefaultAcl(ids, this.defaultNewAcl);
        } catch (e) {
            this.log.error(`${this.namespace} Could not update default acl: ${e.message}`);
        }
    }

    getUserGroup(user: string, callback: GetUserGroupCallbackNoError) {
        return utils.getUserGroup(this, user, (error, user, userGroups, userAcl) => {
            if (error) {
                this.log.error(`${this.namespace} ${error.stack}`);
            }
            return tools.maybeCallback(callback, user, userGroups, userAcl);
        });
    }

    insert(
        id: string,
        attName: string,
        ignore: any,
        options: string | Record<string, any>,
        obj: any,
        callback: (err: Error | null | undefined, param: null) => void
    ) {
        return utils.insert(this, id, attName, ignore, options, obj, callback);
    }

    private async _writeFile(
        id: string,
        name: string,
        data: Buffer,
        options: { virtualFile?: any; user?: any; group?: any; mode?: any; mimeType?: string },
        callback: ioBroker.ErrorCallback | undefined,
        meta: {
            acl?: any;
            stats?: any;
            notExists?: any;
            mimeType?: any;
            binary?: any;
            modifiedAt?: any;
            virtualFile?: boolean;
            createdAt?: number;
        }
    ) {
        const ext = name.match(/\.[^.]+$/);
        if (!ext) {
            return tools.maybeCallbackWithError(callback, new Error(`Invalid name "${name}" on _writeFile`));
        }
        const mime = utils.getMimeType(ext);
        const _mimeType = mime.mimeType;
        const isBinary = mime.isBinary;

        const metaID = this.getFileId(id, name, true);
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        // virtual files only get Meta objects
        if (options.virtualFile) {
            meta = {
                notExists: true,
                virtualFile: true
            }; // Store file with flags as it would not exist
            try {
                await this.client.set(metaID, JSON.stringify(meta));
                return tools.maybeCallback(callback);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        } else {
            if (!meta) {
                meta = { createdAt: Date.now() };
            }
            if (!meta.acl) {
                meta.acl = {
                    owner: options.user || (this.defaultNewAcl && this.defaultNewAcl.owner) || CONSTS.SYSTEM_ADMIN_USER,
                    ownerGroup:
                        options.group ||
                        (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) ||
                        CONSTS.SYSTEM_ADMIN_GROUP,
                    permissions: options.mode || (this.defaultNewAcl && this.defaultNewAcl.file) || 0x644
                };
            }
            meta.stats = {
                size: data ? data.length : 0
            };
            if (Object.prototype.hasOwnProperty.call(meta, 'notExists')) {
                delete meta.notExists;
            }

            meta.mimeType = options.mimeType || _mimeType;
            meta.binary = isBinary;
            meta.acl.ownerGroup =
                meta.acl.ownerGroup ||
                (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) ||
                CONSTS.SYSTEM_ADMIN_GROUP;
            meta.modifiedAt = Date.now();

            try {
                await this._setBinaryState(this.getFileId(id, name, false), data);
                await this.client.set(metaID, JSON.stringify(meta));
                return tools.maybeCallback(callback);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
    }

    // No options provided by the user
    async writeFile(id: string, name: string, data: any, callback?: ioBroker.ErrorCallback): Promise<void>;
    // Options provided by the user
    async writeFile(
        id: string,
        name: string,
        data: any,
        options?: WriteFileOptions | null,
        callback?: ioBroker.ErrorCallback
    ): Promise<void>;

    async writeFile(
        id: string,
        name: string,
        data: any,
        options?: WriteFileOptions | ioBroker.ErrorCallback | null,
        callback?: ioBroker.ErrorCallback
    ): Promise<void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof options === 'string') {
            options = { mimeType: options };
        }

        if (options && options.acl) {
            options.acl = null;
        }

        if (!callback) {
            return this.writeFileAsync(id, name, data, options);
        }

        try {
            await this.validateMetaObject(id);
        } catch (e) {
            this.log.error(`${this.namespace} Cannot write file ${name}: ${e.message}`);
            return tools.maybeCallbackWithError(callback, e);
        }

        if (typeof name !== 'string' || !name.length || name === '/') {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
        }

        if (name.startsWith('/')) {
            name = name.substring(1);
        }

        if (data === undefined) {
            data = null;
        }

        // If file yet exists => check the permissions
        return this.checkFileRights(id, name, options, CONSTS.ACCESS_WRITE, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                return this._writeFile(id, name, data, options, callback, meta);
            }
        });
    }

    writeFileAsync(id: string, name: string, data: any, options?: WriteFileOptions | null): Promise<void> {
        return new Promise<void>((resolve, reject) =>
            this.writeFile(id, name, data, options, err => (err ? reject(err) : resolve()))
        );
    }

    async _readFile(
        id: string,
        name: string,
        options: CallOptions,
        callback: ioBroker.ReadFileCallback,
        meta: MetaObject
    ) {
        if (meta.notExists) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }

        let buffer;
        try {
            buffer = await this._getBinaryState(this.getFileId(id, name, false));
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }
        const mimeType = meta && meta.mimeType;
        if (meta && !meta.binary && buffer) {
            buffer = buffer.toString();
        }
        return tools.maybeCallbackWithError(callback, null, buffer, mimeType);
    }

    // User has provided no callback, we will return the Promise
    readFile(
        id: string,
        name: string,
        options: CallOptions | null
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.ReadFileCallback>>;

    // User has provided a callback, thus we will call it
    readFile(id: string, name: string, options: CallOptions | null, callback: ioBroker.ReadFileCallback): void;
    readFile(
        id: string,
        name: string,
        options: CallOptions | null,
        callback?: ioBroker.ReadFileCallback
    ): void | Promise<ioBroker.CallbackReturnTypeOf<ioBroker.ReadFileCallback>> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }

        if (!callback) {
            return new Promise((resolve, reject) =>
                this.readFile(id, name, options, (err, res, mimeType) =>
                    err ? reject(err) : resolve({ data: res, mimeType: mimeType })
                )
            );
        }

        if (typeof name !== 'string' || !name.length || name === '/') {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
        }

        if (name.startsWith('/')) {
            name = name.substring(1);
        }

        options = options || {};
        this.checkFileRights(id, name, options, CONSTS.ACCESS_READ, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                // @ts-expect-error if callback would be falsy, we would already have returned above
                return this._readFile(id, name, options, callback, meta);
            }
        });
    }

    readFileAsync(id: string, name: string, options: CallOptions): Promise<any> {
        return new Promise((resolve, reject) =>
            this.readFile(id, name, options, (err, res, mimeType) =>
                err ? reject(err) : resolve({ data: res, mimeType: mimeType })
            )
        );
    }

    /**
     * Check if given object exists
     *
     * @param id id of the object
     * @param options optional user context
     */
    async objectExists(id: string, options: CallOptions): Promise<boolean> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }
        if (!id || typeof id !== 'string') {
            throw new Error(`invalid id ${JSON.stringify(id)}`);
        }

        try {
            await new Promise<void>((resolve, reject) => {
                utils.checkObjectRights(this, null, null, options, CONSTS.ACCESS_LIST, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            const exists = await this.client.exists(this.objNamespace + id);
            return !!exists;
        } catch (e) {
            this.log.error(`${this.namespace} Cannot check object existence of "${id}": ${e.message}`);
            return Promise.reject(new Error(`Cannot check object existence of "${id}": ${e.message}`));
        }
    }

    /**
     * Check if given file exists
     *
     * @param id id of the namespace
     * @param name name of the file
     * @param options optional user context
     */
    async fileExists(id: string, name: string, options: CallOptions): Promise<boolean> {
        if (typeof name !== 'string') {
            name = '';
        }

        if (name.startsWith('/')) {
            name = name.substring(1);
        }

        try {
            await new Promise<void>((resolve, reject) => {
                this.checkFileRights(id, name, options, CONSTS.ACCESS_READ, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            if (!this.client) {
                throw new Error(ERRORS.ERROR_DB_CLOSED);
            }

            id = this.getFileId(id, name, false);
            const exists = await this.client.exists(id);
            return !!exists;
        } catch (e) {
            this.log.error(`${this.namespace} Cannot check file existence of "${id}": ${e.message}`);
            throw new Error(`Cannot check file existence of "${id}": ${e.message}`);
        }
    }

    async _unlink(
        id: string,
        name: string,
        options: CallOptions,
        meta: MetaObject
    ): Promise<void | ioBroker.RmResult[]> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }
        if (meta && meta.notExists) {
            const files = await this._rm(id, name, options);
            return files;
        } else {
            const metaID = this.getFileId(id, name, true);
            const dataID = this.getFileId(id, name, false);
            await this._delBinaryState(dataID);
            await this.client.del(metaID);
        }
    }

    unlink(id: string, name: string, options: CallOptions | null, callback: ioBroker.RmCallback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof name !== 'string') {
            name = '';
        }

        if (name.startsWith('/')) {
            name = name.substring(1);
        }

        this.checkFileRights(id, name, options, CONSTS.ACCESS_DELETE, async (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file.delete) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
                } else {
                    try {
                        const files = await this._unlink(id, name, options, meta);
                        return tools.maybeCallbackWithError(callback, null, files);
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, e);
                    }
                }
            }
        });
    }

    unlinkAsync(id: string, name: string, options: CallOptions): Promise<void> {
        return new Promise<void>((resolve, reject) =>
            this.unlink(id, name, options, err => (err ? reject(err) : resolve()))
        );
    }

    delFile(id: string, name: string, options: CallOptions, callback: ioBroker.ErrorCallback) {
        return this.unlink(id, name, options, callback);
    }

    delFileAsync(id: string, name: string, options: CallOptions): Promise<void> {
        return this.unlinkAsync(id, name, options);
    }

    private async _readDir(
        id: string,
        name: string,
        options: CallOptions,
        callback: (err?: Error | null, res?: ioBroker.ReadDirResult[]) => void
    ) {
        name = this.normalizeFilename(name);
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        if (id === '') {
            // special case for "root"
            const dirID = this.getFileId('*', '*');

            let keys;
            try {
                keys = await this._getKeysViaScan(dirID);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }

            if (!this.client) {
                return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
            }

            const result: ioBroker.ReadDirResult[] = [];
            if (!keys || !keys.length) {
                return tools.maybeCallbackWithError(callback, null, result);
            }
            let lastDir: string;
            keys.sort().forEach(dir => {
                dir = dir.substring(this.fileNamespaceL, dir.indexOf('$%$'));
                if (dir !== lastDir) {
                    result.push({
                        file: dir,
                        stats: {},
                        isDir: true
                    });
                }
                lastDir = dir;
            });
            return tools.maybeCallbackWithError(callback, null, result);
        }

        const dirID = this.getFileId(id, name + (name.length ? '/' : '') + '*');

        let keys;
        try {
            keys = await this._getKeysViaScan(dirID);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }

        const start = dirID.indexOf('$%$') + 3;
        const end = '$%$meta'.length;

        const baseName = name + (name.length ? '/' : '');
        const dirs: string[] = [];
        const deepLevel = baseName.split('/').length;
        if (!keys || !keys.length) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND, []);
        }
        keys = keys.sort().filter(key => {
            if (key.endsWith('$%$meta')) {
                const parts = key.substr(start, key.length - end).split('/');
                if (parts.length === deepLevel) {
                    return !key.includes('/_data.json$%$') && key !== '_data.json'; // sort out "virtual" files that are used to mark directories
                } else {
                    const dir = parts[deepLevel - 1];
                    if (dirs.indexOf(dir) === -1) {
                        dirs.push(dir);
                    }
                }
            }
        });
        if (!keys.length) {
            const result: ioBroker.ReadDirResult[] = [];
            while (dirs.length) {
                result.push({
                    file: dirs.shift(),
                    stats: {},
                    isDir: true
                });
            }
            return tools.maybeCallbackWithError(callback, null, result);
        }

        // Check permissions
        let strObjs: (null | string)[];
        try {
            strObjs = await this.client.mget(keys);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        const result: ioBroker.ReadDirResult[] = [];
        const dontCheck =
            options.user === CONSTS.SYSTEM_ADMIN_USER ||
            options.group !== CONSTS.SYSTEM_ADMIN_GROUP ||
            (options.groups && options.groups.indexOf(CONSTS.SYSTEM_ADMIN_GROUP) !== -1);

        for (let i = 0; i < keys.length; i++) {
            const file = keys[i].substring(start + baseName.length, keys[i].length - end);
            while (dirs.length && dirs[0] < file) {
                result.push({
                    file: dirs.shift(),
                    stats: {},
                    isDir: true
                });
            }

            const strObj = strObjs[i];
            let obj: FileObject | null;
            try {
                obj = strObj ? JSON.parse(strObj) : null;
            } catch {
                this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${strObj}`);
                continue;
            }
            if (dontCheck || utils.checkObject(obj, options, CONSTS.ACCESS_READ)) {
                if (!obj || obj.virtualFile) {
                    // virtual file, ignore
                    continue;
                }
                obj.acl = obj.acl || {};
                if (
                    options.user !== CONSTS.SYSTEM_ADMIN_USER &&
                    options.groups &&
                    options.groups.indexOf(CONSTS.SYSTEM_ADMIN_GROUP) === -1
                ) {
                    obj.acl.read = !!(obj.acl.permissions & CONSTS.ACCESS_EVERY_READ);
                    obj.acl.write = !!(obj.acl.permissions & CONSTS.ACCESS_EVERY_WRITE);
                } else {
                    obj.acl.read = true;
                    obj.acl.write = true;
                }
                result.push({
                    file: file,
                    stats: obj.stats,
                    isDir: false,
                    acl: obj.acl,
                    modifiedAt: obj.modifiedAt,
                    createdAt: obj.createdAt
                });
            }
        }
        while (dirs.length) {
            result.push({
                file: dirs.shift(),
                stats: {},
                isDir: true
            });
        }
        return tools.maybeCallbackWithError(callback, null, result);
    }

    readDir(id: string, name: string, options: CallOptions | null, callback: ioBroker.ReadDirCallback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof name !== 'string') {
            name = '';
        }

        // remove first and last
        if (name.startsWith('/')) {
            name = name.substring(1);
        }
        if (name.endsWith('/')) {
            name = name.substring(0, name.length - 1);
        }

        this.checkFileRights(id, name, options, CONSTS.ACCESS_READ, (err, options) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file.list) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
                } else {
                    this._readDir(id, name, options, callback);
                }
            }
        });
    }

    readDirAsync(id: string, name: string, options: CallOptions) {
        return new Promise((resolve, reject) =>
            this.readDir(id, name, options, (err, res) => (err ? reject(err) : resolve(res)))
        );
    }

    private async _renameHelper(keys: string[], oldBase: string, newBase: string, callback: ioBroker.ErrorCallback) {
        if (!keys || !keys.length) {
            return tools.maybeCallback(callback);
        } else {
            if (!this.client) {
                return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
            }
            for (const id of keys) {
                try {
                    try {
                        await this.client.rename(
                            id.replace(/\$%\$meta$/, '$%$data'),
                            id.replace(oldBase, newBase).replace(/\$%\$meta$/, '$%$data')
                        );
                    } catch (e) {
                        // _data.json is not having a data key, so ignore error
                        if (!(id.endsWith('/_data.json$%$meta') && e.message.includes('no such key'))) {
                            throw e;
                        }
                    }
                    await this.client.rename(id, id.replace(oldBase, newBase));
                } catch (e) {
                    return tools.maybeCallbackWithRedisError(callback, e);
                }
            }
            return tools.maybeCallback(callback);
        }
    }

    async _rename(
        id: string,
        oldName: string,
        newName: string,
        options: CallOptions,
        callback: ioBroker.ErrorCallback,
        meta: MetaObject
    ) {
        const oldMetaID = this.getFileId(id, oldName, true);
        const oldDataID = this.getFileId(id, oldName, false);
        const newMetaID = this.getFileId(id, newName, true);
        const newDataID = this.getFileId(id, newName, false);
        if (!meta || !this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        } else if (meta.notExists) {
            oldName = this.normalizeFilename(oldName);
            newName = this.normalizeFilename(newName);

            // it could be dir
            if (!oldName.endsWith('/*')) {
                oldName += '/*';
            } else if (oldName.endsWith('/')) {
                oldName += '*';
            }

            if (!newName.endsWith('/*')) {
                newName += '/*';
            } else if (newName.endsWith('/')) {
                newName += '*';
            }

            const oldBase = oldName.substring(0, oldName.length - 1);
            const newBase = newName.substring(0, newName.length - 1);
            const dirID = this.getFileId(id, oldName);
            let keys;
            try {
                keys = await this._getKeysViaScan(dirID);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }

            if (!this.client) {
                return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
            }
            if (!keys) {
                return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
            }

            keys = keys.sort().filter(key => key.endsWith('$%$meta'));

            if (!keys.length) {
                return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
            }
            // Check permissions
            let strObjs: (string | null)[];
            try {
                strObjs = await this.client.mget(keys);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
            let result;
            const dontCheck =
                options.user === CONSTS.SYSTEM_ADMIN_USER ||
                options.group !== CONSTS.SYSTEM_ADMIN_GROUP ||
                (options.groups && options.groups.indexOf(CONSTS.SYSTEM_ADMIN_GROUP) !== -1);

            if (!dontCheck) {
                result = [];
                for (let i = 0; i < keys.length; i++) {
                    const strObj = strObjs[i];
                    let obj: ioBroker.Object | null;
                    try {
                        obj = strObj ? JSON.parse(strObj) : null;
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${strObj}`);
                        continue;
                    }
                    if (utils.checkObject(obj, options, CONSTS.ACCESS_READ)) {
                        result.push(keys[i]);
                    }
                }
            } else {
                result = keys;
            }
            return this._renameHelper(result, oldBase, newBase, callback);
        } else {
            try {
                await this.client.rename(oldDataID, newDataID);
                await this.client.rename(oldMetaID, newMetaID);
                return tools.maybeCallback(callback);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
    }

    rename(
        id: string,
        oldName: string,
        newName: string,
        options: CallOptions | null,
        callback: ioBroker.ErrorCallback
    ) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }
        if (
            typeof oldName !== 'string' ||
            !oldName.length ||
            oldName === '/' ||
            oldName === '//' ||
            typeof newName !== 'string' ||
            !newName.length ||
            newName === '/' ||
            newName === '//'
        ) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
        }
        if (oldName.startsWith('/')) {
            oldName = oldName.substring(1);
        }
        if (newName.startsWith('/')) {
            newName = newName.substring(1);
        }
        if (oldName.endsWith('/')) {
            oldName = oldName.substring(0, oldName.length - 1);
        }
        if (newName.endsWith('/')) {
            newName = newName.substring(0, newName.length - 1);
        }

        this.checkFileRights(id, oldName, options, CONSTS.ACCESS_WRITE, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file.write) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
                } else {
                    this._rename(id, oldName, newName, options, callback, meta);
                }
            }
        });
    }

    renameAsync(id: string, oldName: string, newName: string, options: CallOptions): Promise<void> {
        return new Promise<void>((resolve, reject) =>
            this.rename(id, oldName, newName, options, err => (err ? reject(err) : resolve()))
        );
    }

    async _touch(id: string, name: string, options: CallOptions, callback: ioBroker.ErrorCallback, meta: MetaObject) {
        const metaID = this.getFileId(id, name, true);
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        if (!meta || meta.notExists) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
        }
        meta.modifiedAt = Date.now();
        try {
            await this.client.set(metaID, JSON.stringify(meta));
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    touch(id: string, name: string, options: CallOptions | null, callback: ioBroker.ErrorCallback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof name !== 'string' || !name.length || name === '/') {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
        }

        if (name.startsWith('/')) {
            name = name.substring(1);
        }

        this.checkFileRights(id, name, options, CONSTS.ACCESS_WRITE, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                return this._touch(id, name, options, callback, meta);
            }
        });
    }

    touchAsync(id: string, name: string, options: CallOptions): Promise<void> {
        return new Promise((resolve, reject) => this.touch(id, name, options, err => (err ? reject(err) : resolve())));
    }

    private async _rmHelper(keys: string[]): Promise<void> {
        if (!keys.length) {
            return;
        } else {
            if (!this.client) {
                throw new Error(ERRORS.ERROR_DB_CLOSED);
            }

            for (const id of keys) {
                await this._delBinaryState(id.replace(/\$%\$meta$/, '$%$data'));
                await this.client.del(id);
            }
        }
    }

    private async _rm(id: string, name: string, options: CallOptions, meta?: any): Promise<ioBroker.RmResult[] | void> {
        if (meta && !meta.isDir) {
            // it is file
            const metaID = this.getFileId(id, name, true);
            const dataID = this.getFileId(id, name, false);
            await this.delObjectAsync(dataID);
            await this.delObjectAsync(metaID);
        } else {
            if (!this.client) {
                throw new Error(ERRORS.ERROR_DB_CLOSED);
            }
            name = this.normalizeFilename(name);
            // it could be dir
            if (!name.endsWith('/*')) {
                name += '/*';
            } else if (name.endsWith('/')) {
                name += '*';
            }
            const dirID = this.getFileId(id, name);
            let keys = await this._getKeysViaScan(dirID);

            if (!this.client) {
                throw new Error(ERRORS.ERROR_DB_CLOSED);
            }
            if (!keys) {
                throw new Error(ERRORS.ERROR_NOT_FOUND);
            }

            keys = keys.sort().filter(key => key.endsWith('$%$meta'));

            if (!keys.length) {
                throw new Error(ERRORS.ERROR_NOT_FOUND);
            }
            // Check permissions
            let objs;
            try {
                objs = await this.client.mget(keys);
            } catch {
                // ignore
            }
            let result;
            const dontCheck =
                options.user === CONSTS.SYSTEM_ADMIN_USER ||
                options.group !== CONSTS.SYSTEM_ADMIN_GROUP ||
                (options.groups && options.groups.indexOf(CONSTS.SYSTEM_ADMIN_GROUP) !== -1);

            objs = objs || [];
            if (!dontCheck) {
                result = [];
                for (let i = 0; i < keys.length; i++) {
                    try {
                        const strObj = objs[i];
                        const obj: ioBroker.Object | null = strObj ? JSON.parse(strObj) : null;
                        if (utils.checkObject(obj, options, CONSTS.ACCESS_READ)) {
                            result.push(keys[i]);
                        }
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${objs[i]}`);
                        continue;
                    }
                }
            } else {
                result = keys;
            }
            const files = result.map(key => {
                const name = key.substring(this.fileNamespaceL + id.length + 3, key.length - 7);
                const pos = name.lastIndexOf('/');
                if (pos !== -1) {
                    return { file: name.substring(pos + 1), path: name.substring(0, pos) };
                } else {
                    return { file: id, path: '' };
                }
            });

            try {
                await this._rmHelper(result);
            } catch (e) {
                this.log.error(`${this.namespace} Could not remove files: ${e.message}`);
            }

            return files;
        }
    }

    rm(id: string, name: string, options: CallOptions | null, callback: ioBroker.RmCallback): void {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof name !== 'string') {
            name = '';
        }

        this.checkFileRights(id, null, options, CONSTS.ACCESS_DELETE, async (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file.delete) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
                } else {
                    try {
                        const files = await this._rm(id, name, options, meta && meta.notExists ? null : meta);
                        return tools.maybeCallbackWithError(callback, null, files);
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, e);
                    }
                }
            }
        });
    }

    rmAsync(id: string, name: string, options: CallOptions): Promise<void | ioBroker.RmResult[]> {
        return new Promise((resolve, reject) =>
            this.rm(id, name, options, (err, files) => (err ? reject(err) : resolve(files)))
        );
    }

    // simulate. redis has no dirs
    mkdir(id: string, dirName: string, options: CallOptions | null, callback: ioBroker.ErrorCallback): void {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof dirName !== 'string') {
            dirName = '';
        }

        dirName = this.normalizeFilename(dirName);
        if (dirName.startsWith('/')) {
            dirName = dirName.substring(1);
        }
        this.checkFileRights(id, dirName, options, CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file.write) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
                } else {
                    // we create a dummy file (for file this file exists to store meta data)
                    options = options || {};
                    options.virtualFile = true; // this is a virtual File
                    const realName = dirName + (dirName.endsWith('/') ? '' : '/');
                    this.writeFile(id, realName + '_data.json', '', options, callback);
                }
            }
        });
    }

    mkdirAsync(id: string, dirName: string, options: CallOptions): Promise<void> {
        return new Promise<void>((resolve, reject) =>
            this.mkdir(id, dirName, options, err => (err ? reject(err) : resolve()))
        );
    }

    private async _chownFileHelper(
        keys: string[],
        metas: any[],
        options: CallOptions,
        callback: ioBroker.ErrorCallback
    ): Promise<void> {
        if (!keys.length) {
            return tools.maybeCallback(callback);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }

        for (const id of keys) {
            const meta = metas.shift();
            meta.acl.owner = options.owner;
            meta.acl.ownerGroup = options.ownerGroup;
            try {
                await this.client.set(id, JSON.stringify(meta));
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
        return tools.maybeCallback(callback);
    }

    async _chownFile(
        id: string,
        name: string,
        options: CallOptions,
        callback: ioBroker.ChownFileCallback,
        meta: MetaObject
    ): Promise<ioBroker.ChownFileResult | void> {
        if (!meta) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
        }

        name = this.normalizeFilename(name);
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        if (!meta.isDir && !meta.notExists) {
            // it is file
            const metaID = this.getFileId(id, name, true);
            meta.acl.owner = options.owner;
            meta.acl.ownerGroup = options.ownerGroup;
            try {
                await this.client.set(metaID, JSON.stringify(meta));
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
            const nameArr = name.split('/');
            const file = nameArr.pop();
            const res = [
                {
                    path: nameArr.join('/'),
                    file: file,
                    stats: meta.stats,
                    isDir: false,
                    acl: meta.acl || {},
                    modifiedAt: meta.modifiedAt,
                    createdAt: meta.createdAt
                }
            ];
            return tools.maybeCallbackWithError(callback, null, res);
        }

        // it could be dir
        if (!name.endsWith('/*')) {
            name += '/*';
        } else if (name.endsWith('/')) {
            name += '*';
        }
        const dirID = this.getFileId(id, name);

        let keys;
        try {
            keys = await this._getKeysViaScan(dirID);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        if (!keys) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
        }

        keys = keys.sort().filter(key => key.endsWith('$%$meta'));

        // Check permissions
        let metasStr: (string | null)[];
        try {
            metasStr = await this.client.mget(keys);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
        const dontCheck =
            options.user === CONSTS.SYSTEM_ADMIN_USER ||
            options.group !== CONSTS.SYSTEM_ADMIN_GROUP ||
            (options.groups && options.groups.indexOf(CONSTS.SYSTEM_ADMIN_GROUP) !== -1);
        const keysFiltered = [];
        const objsFiltered = [];
        const processed: ioBroker.ChownFileResult[] = [];
        const start = dirID.indexOf('$%$') + 3;
        const end = '$%$meta'.length;

        for (let i = 0; i < keys.length; i++) {
            const metaStr = metasStr[i];
            let meta: null | FileObject;
            try {
                meta = metaStr ? JSON.parse(metaStr) : null;
            } catch {
                this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${metaStr}`);
                continue;
            }
            if (dontCheck || utils.checkObject(meta, options, CONSTS.ACCESS_WRITE)) {
                if (!meta || meta.virtualFile) {
                    continue;
                } // virtual file, ignore
                keysFiltered.push(keys[i]);
                objsFiltered.push(meta);

                const name = keys[i].substring(start, keys[i].length - end);
                const nameArr = name.split('/');
                const file = nameArr.pop();
                processed.push({
                    path: nameArr.join('/'),
                    file: file,
                    stats: meta.stats || {},
                    isDir: false,
                    acl: meta.acl || {},
                    modifiedAt: meta.modifiedAt,
                    createdAt: meta.createdAt
                });
            }
        }
        this._chownFileHelper(keysFiltered, objsFiltered, options, err => {
            return tools.maybeCallbackWithError(callback, err, processed);
        });
    }

    chownFile(id: string, name: string, options: CallOptions, callback: ioBroker.ChownFileCallback) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        options = options || {};
        if (typeof options !== 'object') {
            options = { owner: options };
        }

        if (typeof name !== 'string' || !name.length || name === '/') {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
        }

        if (name.startsWith('/')) {
            name = name.substring(1);
        }

        if (!options.ownerGroup && options.group) {
            options.ownerGroup = options.group;
        }
        if (!options.owner && options.user) {
            options.owner = options.user;
        }

        if (!options.owner) {
            this.log.error(`${this.namespace} user is not defined`);
            return tools.maybeCallbackWithError(callback, 'invalid parameter');
        }

        if (!options.ownerGroup) {
            // get user group
            this.getUserGroup(options.owner, (user, groups) => {
                if (!groups || !groups[0]) {
                    return tools.maybeCallbackWithError(callback, `user "${options.owner}" belongs to no group`);
                } else {
                    options.ownerGroup = groups[0];
                }
                this.chownFile(id, name, options, callback);
            });
            return;
        }

        this.checkFileRights(id, name, options, CONSTS.ACCESS_WRITE, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file.write) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
                } else {
                    return this._chownFile(id, name, options, callback, meta);
                }
            }
        });
    }

    chownFileAsync(
        id: string,
        name: string,
        options: CallOptions
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.ChownFileCallback>> {
        return new Promise((resolve, reject) =>
            this.chownFile(id, name, options, (err, processed) => (err ? reject(err) : resolve(processed)))
        );
    }

    /**
     *
     * @param keys Key names to handle
     * @param metas Objects for the keys to handle
     * @param options options
     * @param callback callback function
     */
    private async _chmodFileHelper(
        keys: string[],
        metas: any[],
        options: CallOptions,
        callback: ioBroker.ErrorCallback
    ) {
        if (!keys || !keys.length) {
            return tools.maybeCallback(callback);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }

        for (const i in keys) {
            const id = keys[i];
            const meta = metas[i];
            meta.acl.permissions = options.mode;
            try {
                await this.client.set(id, JSON.stringify(meta));
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
        return tools.maybeCallback(callback);
    }

    private async _chmodFile(
        id: string,
        name: string,
        options: CallOptions,
        callback: ioBroker.ChownFileCallback,
        meta: MetaObject
    ) {
        if (!meta) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
        }
        name = this.normalizeFilename(name);
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        if (!meta.isDir && !meta.notExists) {
            // it is file
            const metaID = this.getFileId(id, name, true);
            meta.acl.permissions = options.mode;
            try {
                await this.client.set(metaID, JSON.stringify(meta));
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }

            const nameArr = name.split('/');
            const file = nameArr.pop() as string;
            const res = [
                {
                    path: nameArr.join('/'),
                    file: file,
                    stats: meta.stats,
                    isDir: false,
                    acl: meta.acl || {},
                    modifiedAt: meta.modifiedAt,
                    createdAt: meta.createdAt
                }
            ];
            return tools.maybeCallbackWithError(callback, null, res);
        }

        // it could be dir
        if (!name.endsWith('/*')) {
            name += '/*';
        } else if (name.endsWith('/')) {
            name += '*';
        }
        const dirID = this.getFileId(id, name);

        let keys;
        try {
            keys = await this._getKeysViaScan(dirID);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        if (!keys) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
        }

        keys = keys.sort().filter(key => key.endsWith('$%$meta'));

        // Check permissions
        let strObjs: (null | string)[];
        try {
            strObjs = await this.client.mget(keys);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        const dontCheck =
            options.user === CONSTS.SYSTEM_ADMIN_USER ||
            options.group !== CONSTS.SYSTEM_ADMIN_GROUP ||
            (options.groups && options.groups.indexOf(CONSTS.SYSTEM_ADMIN_GROUP) !== -1);

        const keysFiltered = [];
        const objsFiltered = [];
        const processed: ioBroker.ChownFileResult[] = [];
        const start = dirID.indexOf('$%$') + 3;
        const end = '$%$meta'.length;

        for (let i = 0; i < keys.length; i++) {
            const strObj = strObjs[i];
            let obj: null | FileObject;
            try {
                obj = strObj ? JSON.parse(strObj) : null;
            } catch {
                this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${strObj}`);
                continue;
            }
            if (dontCheck || utils.checkObject(obj, options, CONSTS.ACCESS_WRITE)) {
                if (!obj || obj.virtualFile) {
                    continue;
                } // virtual file, ignore
                keysFiltered.push(keys[i]);
                objsFiltered.push(obj);

                const name = keys[i].substring(start, keys[i].length - end);
                const nameArr = name.split('/');
                const file = nameArr.pop() as string;
                processed.push({
                    path: nameArr.join('/'),
                    file: file,
                    stats: obj.stats,
                    isDir: false,
                    acl: obj.acl || {},
                    modifiedAt: obj.modifiedAt,
                    createdAt: obj.createdAt
                });
            }
        }
        this._chmodFileHelper(keysFiltered, objsFiltered, options, err =>
            tools.maybeCallbackWithError(callback, err, processed)
        );
    }

    chmodFile(id: string, name: string, options: CallOptions | null, callback: ioBroker.ChownFileCallback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};

        if (typeof name !== 'string' || !name.length || name === '/') {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
        }

        if (name[0].startsWith('/')) {
            name = name.substring(1);
        }

        if (typeof options !== 'object') {
            options = { mode: options };
        }

        if (options.mode === undefined) {
            this.log.error(`${this.namespace} mode is not defined`);
            return tools.maybeCallbackWithError(callback, 'invalid parameter');
        } else if (typeof options.mode === 'string') {
            options.mode = parseInt(options.mode, 16);
        }

        this.checkFileRights(id, name, options, CONSTS.ACCESS_WRITE, (err, options, meta) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                if (!options.acl.file.write) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
                } else {
                    return this._chmodFile(id, name, options, callback, meta);
                }
            }
        });
    }

    chmodFileAsync(
        id: string,
        name: string,
        options: CallOptions
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.ChownFileCallback>> {
        return new Promise((resolve, reject) =>
            this.chmodFile(id, name, options, (err, processed) => (err ? reject(err) : resolve(processed)))
        );
    }

    // no options provided by user
    enableFileCache(enabled: boolean, callback?: (err: Error | null, res: boolean) => void): void;
    // options provided by user
    enableFileCache(
        enabled: boolean,
        options?: CallOptions,
        callback?: (err: Error | null | undefined, res: boolean) => void
    ): void;
    enableFileCache(
        enabled: boolean,
        options?: any,
        callback?: (err: Error | null | undefined, res: boolean) => void
    ): void {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (options && options.acl) {
            options.acl = null;
        }

        utils.checkObjectRights(this, null, null, options, CONSTS.ACCESS_WRITE, (err, _options) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                // cache cannot be enabled
                return tools.maybeCallbackWithError(callback, null, false);
            }
        });
    }

    enableFileCacheAsync(enabled: boolean, options?: CallOptions): Promise<boolean> {
        return new Promise((resolve, reject) =>
            this.enableFileCache(enabled, options, (err, res) => (err ? reject(err) : resolve(res)))
        );
    }

    // -------------- OBJECT FUNCTIONS -------------------------------------------
    // No callback provided by user, we return a Promise
    _subscribe(pattern: string, options: CallOptions | null | undefined, asUser: boolean): Promise<void>;
    // Callback provided by user, we call callback
    _subscribe(
        pattern: string,
        options: CallOptions | null | undefined,
        asUser: boolean,
        callback?: ioBroker.ErrorCallback
    ): void;
    _subscribe(
        pattern: string,
        options: CallOptions | null | undefined,
        asUser: boolean,
        callback?: ioBroker.ErrorCallback
    ): void | Promise<void> {
        const subClient = asUser ? this.sub : this.subSystem;
        if (!subClient) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        if (Array.isArray(pattern)) {
            let count = pattern.length;
            pattern.forEach(pattern => {
                this.log.silly(`${this.namespace} redis psubscribe ${this.objNamespace}${pattern}`);
                subClient.psubscribe(this.objNamespace + pattern, err => {
                    if (!err) {
                        const subscriptions = asUser ? this.userSubscriptions : this.systemSubscriptions;
                        subscriptions[this.objNamespace + pattern] = true;
                    }
                    if (!--count) {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                });
            });
        } else {
            this.log.silly(`${this.namespace} redis psubscribe ${this.objNamespace}${pattern}`);
            subClient.psubscribe(this.objNamespace + pattern, err => {
                if (!err) {
                    const subscriptions = asUser ? this.userSubscriptions : this.systemSubscriptions;
                    subscriptions[this.objNamespace + pattern] = true;
                }
                return tools.maybeCallbackWithError(callback, err);
            });
        }
    }

    subscribeConfig(pattern: string, callback?: ioBroker.ErrorCallback): void;
    subscribeConfig(pattern: string, options?: CallOptions, callback?: ioBroker.ErrorCallback): void;
    subscribeConfig(pattern: string, options?: any, callback?: ioBroker.ErrorCallback): void {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
            if (err) {
                return tools.maybeCallbackWithRedisError(callback, err);
            } else {
                return this._subscribe(pattern, options, false, callback);
            }
        });
    }

    subscribe(pattern: string, options: CallOptions, callback: ioBroker.ErrorCallback) {
        return this.subscribeConfig(pattern, options, callback);
    }

    subscribeAsync(pattern: string, options: CallOptions): Promise<void> {
        return new Promise<void>((resolve, reject) =>
            this.subscribe(pattern, options, err => (err ? reject(err) : resolve()))
        );
    }

    // User has called the method without providing options
    subscribeUser(pattern: string, callback?: ioBroker.ErrorCallback): void;
    // User has called the method by providing options
    subscribeUser(pattern: string, options: CallOptions, callback?: ioBroker.ErrorCallback): void;
    subscribeUser(pattern: string, options: any, callback?: ioBroker.ErrorCallback): void {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
            if (err) {
                return tools.maybeCallbackWithRedisError(callback, err);
            } else {
                return this._subscribe(pattern, options, true, callback);
            }
        });
    }

    subscribeUserAsync(pattern: string, options: CallOptions): Promise<void> {
        return new Promise<void>((resolve, reject) =>
            this.subscribeUser(pattern, options, err => (err ? reject(err) : resolve()))
        );
    }

    private async _unsubscribe(
        pattern: string | string[],
        options: CallOptions | null | undefined,
        asUser: boolean
    ): Promise<void> {
        const subClient = asUser ? this.sub : this.subSystem;
        if (!subClient) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }
        if (Array.isArray(pattern)) {
            for (const _pattern of pattern) {
                this.log.silly(`${this.namespace} redis punsubscribe ${this.objNamespace}${_pattern}`);
                await subClient.punsubscribe(this.objNamespace + _pattern);
                const subscriptions = asUser ? this.userSubscriptions : this.systemSubscriptions;
                if (subscriptions[this.objNamespace + _pattern] !== undefined) {
                    delete subscriptions[this.objNamespace + _pattern];
                }
            }
        } else {
            this.log.silly(`${this.namespace} redis punsubscribe ${this.objNamespace}${pattern}`);

            await subClient.punsubscribe(this.objNamespace + pattern);
            const subscriptions = asUser ? this.userSubscriptions : this.systemSubscriptions;
            if (subscriptions[this.objNamespace + pattern] !== undefined) {
                delete subscriptions[this.objNamespace + pattern];
            }
        }
    }

    // User has not provided any options
    unsubscribeConfig(pattern: string | string[], callback?: ioBroker.ErrorCallback): void;
    // User has provided options
    unsubscribeConfig(
        pattern: string | string[],
        options?: CallOptions | null,
        callback?: ioBroker.ErrorCallback
    ): void;
    unsubscribeConfig(
        pattern: string | string[],
        options?: CallOptions | ioBroker.ErrorCallback | null,
        callback?: ioBroker.ErrorCallback
    ): void {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        utils.checkObjectRights(this, null, null, options, 'list', async (err, options) => {
            if (err) {
                return tools.maybeCallbackWithRedisError(callback, err);
            } else {
                try {
                    await this._unsubscribe(pattern, options, false);
                    return tools.maybeCallback(callback);
                } catch (e) {
                    return tools.maybeCallbackWithRedisError(callback, e);
                }
            }
        });
    }

    unsubscribe(pattern: string | string[], options?: CallOptions | null, callback?: ioBroker.ErrorCallback): void {
        return this.unsubscribeConfig(pattern, options, callback);
    }

    unsubscribeAsync(pattern: string, options: CallOptions): Promise<void> {
        return new Promise<void>((resolve, reject) =>
            this.unsubscribe(pattern, options, err => (err ? reject(err) : resolve()))
        );
    }

    unsubscribeUser(pattern: string | string[], options?: CallOptions | null, callback?: ioBroker.ErrorCallback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        utils.checkObjectRights(this, null, null, options, 'list', async (err, options) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                try {
                    await this._unsubscribe(pattern, options, true);
                    return tools.maybeCallback(callback);
                } catch (e) {
                    return tools.maybeCallbackWithRedisError(callback, e);
                }
            }
        });
    }

    unsubscribeUserAsync(pattern: string, options: CallOptions): Promise<void> {
        return new Promise<void>((resolve, reject) =>
            this.unsubscribeUser(pattern, options, err => (err ? reject(err) : resolve()))
        );
    }

    private async _objectHelper(keys: string[], objs: any[]) {
        if (!keys.length) {
            return;
        } else {
            if (!this.client) {
                throw new Error(ERRORS.ERROR_DB_CLOSED);
            }
            for (const id of keys) {
                const obj = objs.shift();
                const message = JSON.stringify(obj);
                const commands = [];
                if (this.useSets) {
                    if (obj.type) {
                        // e.g. _design/ has no type
                        // add the object to the set + set object atomic
                        commands.push(['sadd', `${this.setNamespace}object.type.${obj.type}`, id]);
                    }

                    if (obj.common && obj.common.custom) {
                        // add to "common" set
                        commands.push(['sadd', `${this.setNamespace}object.common.custom`, id]);
                    }
                }

                if (!commands.length) {
                    // only set
                    await this.client.set(id, message);
                } else {
                    // set all commands atomic
                    commands.push(['set', id, message]);
                    await this.client.multi(commands).exec();
                }
                await this.client.publish(id, message);
            }
        }
    }

    private _chownObject(pattern: string, options: CallOptions, callback?: ioBroker.ChownObjectCallback): void {
        this.getConfigKeys(
            pattern,
            options,
            async (err, keys) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }
                if (!this.client) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
                }

                if (!keys) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
                }

                let strObjects;
                try {
                    strObjects = await this.client.mget(keys);
                } catch (e) {
                    return tools.maybeCallbackWithRedisError(callback, e);
                }
                const filteredKeys = [];
                const filteredObjs = [];

                for (let i = 0; i < keys.length; i++) {
                    const strObj = strObjects[i];
                    let obj: null | ioBroker.Object;
                    try {
                        obj = strObj ? JSON.parse(strObj) : null;
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${strObj}`);
                        continue;
                    }
                    if (!obj || !utils.checkObject(obj, options, CONSTS.ACCESS_WRITE)) {
                        continue;
                    }
                    if (!obj.acl) {
                        obj.acl = {
                            owner: (this.defaultNewAcl && this.defaultNewAcl.owner) || CONSTS.SYSTEM_ADMIN_USER,
                            ownerGroup:
                                (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || CONSTS.SYSTEM_ADMIN_GROUP,
                            object:
                                (this.defaultNewAcl && this.defaultNewAcl.object) ||
                                CONSTS.ACCESS_USER_RW | CONSTS.ACCESS_GROUP_READ | CONSTS.ACCESS_EVERY_READ // '0644'
                        };
                        if (obj.type === 'state') {
                            // @ts-expect-error we have ensured above, that property acl exists
                            obj.acl.state =
                                (this.defaultNewAcl && this.defaultNewAcl.state) ||
                                CONSTS.ACCESS_USER_RW | CONSTS.ACCESS_GROUP_READ | CONSTS.ACCESS_EVERY_READ; // '0644'
                        }
                    }
                    obj.acl.owner = options.owner;
                    obj.acl.ownerGroup = options.ownerGroup;
                    filteredKeys.push(keys[i]);
                    filteredObjs.push(obj);
                }
                try {
                    await this._objectHelper(filteredKeys, filteredObjs);
                } catch (e) {
                    this.log.error(`${this.namespace} _chownObject error: ${e.message}`);
                }
                return tools.maybeCallbackWithError(callback, null, filteredObjs);
            },
            true
        );
    }

    chownObject(pattern: string, options: CallOptions, callback?: ioBroker.ChownObjectCallback) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        options = options || {};
        options.acl = null;

        if (typeof options !== 'object') {
            options = { owner: options };
        }

        if (!options.ownerGroup && options.group) {
            options.ownerGroup = options.group;
        }
        if (!options.owner && options.user) {
            options.owner = options.user;
        }

        if (!options.owner) {
            this.log.error(`${this.namespace} user is not defined`);
            return tools.maybeCallbackWithError(callback, 'invalid parameter');
        }

        if (!options.ownerGroup) {
            // get user group
            this.getUserGroup(options.owner, (user, groups /* , permissions*/) => {
                if (!groups || !groups[0]) {
                    return tools.maybeCallbackWithError(callback, `user "${options.owner}" belongs to no group`);
                } else {
                    options.ownerGroup = groups[0];
                }
                this.chownObject(pattern, options, callback);
            });
            return;
        }

        utils.checkObjectRights(this, null, null, options, CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                return tools.maybeCallbackWithRedisError(callback, err);
            } else {
                if (!options.acl.object || !options.acl.object.write) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
                } else {
                    return this._chownObject(pattern, options, callback);
                }
            }
        });
    }

    chownObjectAsync(
        pattern: string,
        options: CallOptions
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.ChownObjectCallback>> {
        return new Promise((resolve, reject) =>
            this.chownObject(pattern, options, (err, list) => (err ? reject(err) : resolve(list)))
        );
    }

    private _chmodObject(pattern: string, options: CallOptions, callback?: ioBroker.ChownObjectCallback): void {
        this.getConfigKeys(
            pattern,
            options,
            async (err, keys) => {
                if (err) {
                    return tools.maybeCallbackWithRedisError(callback, err);
                }
                if (!this.client) {
                    return tools.maybeCallbackWithRedisError(callback, ERRORS.ERROR_DB_CLOSED);
                }

                if (!keys) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_NOT_FOUND);
                }

                let strObjs: (null | string)[];
                try {
                    strObjs = await this.client.mget(keys);
                } catch (e) {
                    return tools.maybeCallbackWithRedisError(callback, e);
                }

                const filteredKeys = [];
                const filteredObjs = [];

                for (let i = 0; i < keys.length; i++) {
                    const strObj = strObjs[i];
                    let obj: null | ioBroker.Object;
                    try {
                        obj = strObj ? JSON.parse(strObj) : null;
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${strObj}`);
                        continue;
                    }
                    if (!utils.checkObject(obj, options, CONSTS.ACCESS_WRITE) || !obj) {
                        continue;
                    }
                    if (!obj.acl) {
                        obj.acl = {
                            owner: (this.defaultNewAcl && this.defaultNewAcl.owner) || CONSTS.SYSTEM_ADMIN_USER,
                            ownerGroup:
                                (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || CONSTS.SYSTEM_ADMIN_GROUP,
                            object:
                                (this.defaultNewAcl && this.defaultNewAcl.object) ||
                                CONSTS.ACCESS_USER_RW | CONSTS.ACCESS_GROUP_READ | CONSTS.ACCESS_EVERY_READ // '0644'
                        };
                        if (obj.type === 'state') {
                            // @ts-expect-error we have ensured, that property acl exists
                            obj.acl.state =
                                (this.defaultNewAcl && this.defaultNewAcl.state) ||
                                CONSTS.ACCESS_USER_RW | CONSTS.ACCESS_GROUP_READ | CONSTS.ACCESS_EVERY_READ; // '0644'
                        }
                    }
                    if (options.object !== undefined) {
                        obj.acl.object = options.object;
                    }
                    if (options.state !== undefined) {
                        // @ts-expect-error TODO: state not allowed or types incorrect?
                        obj.acl.state = options.state;
                    }
                    filteredKeys.push(keys[i]);
                    filteredObjs.push(obj);
                }
                try {
                    await this._objectHelper(filteredKeys, filteredObjs);
                } catch (e) {
                    this.log.error(`${this.namespace} _chmodObject error: ${e.message}`);
                }
            },
            true
        );
    }

    chmodObject(pattern: string, options: CallOptions | null, callback?: ioBroker.ChownObjectCallback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};
        options.acl = null;

        if (typeof options !== 'object') {
            options = { object: options };
        }

        if (options.mode && !options.object) {
            options.object = options.mode;
        }

        if (options.object === undefined) {
            this.log.error(`${this.namespace} mode is not defined`);
            return tools.maybeCallbackWithError(callback, 'invalid parameter');
        } else if (typeof options.mode === 'string') {
            options.mode = parseInt(options.mode, 16);
        }

        utils.checkObjectRights(this, null, null, options, CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                return tools.maybeCallbackWithRedisError(callback, err);
            } else {
                if (!options.acl.file.write) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
                } else {
                    return this._chmodObject(pattern, options, callback);
                }
            }
        });
    }

    chmodObjectAsync(
        pattern: string,
        options: CallOptions
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.ChownObjectCallback>> {
        return new Promise((resolve, reject) =>
            this.chmodObject(pattern, options, (err, list) => (err ? reject(err) : resolve(list)))
        );
    }

    private async _getObject(id: string, options: CallOptions, callback: ioBroker.GetObjectCallback) {
        if (!this.client) {
            return tools.maybeCallbackWithRedisError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        let obj, err;
        try {
            obj = await this.client.get(this.objNamespace + id);
        } catch (e) {
            this.log.debug(`${this.namespace} redis get ${id}, error - ${e.message}`);
            err = e;
        }

        try {
            obj = obj ? JSON.parse(obj) : null;
        } catch (e) {
            this.log.warn(`${this.namespace} Cannot parse ${id} - ${obj}: ${e.message}`);
            obj = null;
            if (!err) {
                err = e;
            }
        }
        if (obj) {
            // Check permissions
            if (utils.checkObject(obj, options, CONSTS.ACCESS_READ)) {
                return tools.maybeCallbackWithError(callback, null, obj);
            } else {
                return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
            }
        } else {
            return tools.maybeCallbackWithRedisError(callback, err, obj);
        }
    }

    // cb version with options
    getObject(id: string, options: Record<string, any> | undefined, callback: ioBroker.GetObjectCallback): void;
    // Promise version
    getObject(
        id: string,
        options?: Record<string, any>
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetObjectCallback>>;
    // no options but cb
    getObject(id: string, callback: ioBroker.ErrorCallback): void;
    getObject(id: string, options?: any, callback?: ioBroker.ErrorCallback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.getObject(id, options, (err, obj) => (err ? reject(err) : resolve(obj)))
            );
        }

        if (typeof callback === 'function') {
            if (options && options.acl) {
                options.acl = null;
            }
            utils.checkObjectRights(this, null, null, options, CONSTS.ACCESS_READ, (err, options) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    // @ts-expect-error the callback is there else we would have returned
                    return this._getObject(id, options, callback);
                }
            });
        }
    }

    getObjectAsync(
        id: string,
        options?: Record<string, any>
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetObjectCallback>> {
        return new Promise((resolve, reject) =>
            this.getObject(id, options, (err, obj) => (err ? reject(err) : resolve(obj)))
        );
    }

    private async _getKeys(
        pattern: string,
        options: CallOptions,
        callback?: ioBroker.GetConfigKeysCallback,
        dontModify?: boolean
    ) {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        if (!pattern || typeof pattern !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid pattern ${JSON.stringify(pattern)}`);
        }

        const r = new RegExp(tools.pattern2RegEx(pattern));
        let keys;

        try {
            keys = await this._getKeysViaScan(this.objNamespace + pattern);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }

        const result: string[] = [];
        if (keys) {
            keys.sort();
            const result = [];
            const dontCheck =
                options.user === CONSTS.SYSTEM_ADMIN_USER ||
                options.group !== CONSTS.SYSTEM_ADMIN_GROUP ||
                (options.groups && options.groups.indexOf(CONSTS.SYSTEM_ADMIN_GROUP) !== -1);

            if (dontCheck) {
                for (let i = 0; i < keys.length; i++) {
                    const id = keys[i].substring(this.objNamespaceL);
                    if (r.test(id)) {
                        if (!dontModify) {
                            result.push(id);
                        } else {
                            result.push(keys[i]);
                        }
                    }
                }
                return tools.maybeCallbackWithError(callback, null, result);
            } else {
                // Check permissions
                let metas: (string | null)[];
                try {
                    metas = await this.client.mget(keys);
                } catch (e) {
                    return tools.maybeCallbackWithRedisError(callback, e);
                }
                metas = metas || [];
                for (let i = 0; i < keys.length; i++) {
                    const metaStr = metas[i];
                    let meta: ioBroker.Object;
                    try {
                        meta = metaStr ? JSON.parse(metaStr) : null;
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${metaStr}`);
                        continue;
                    }

                    if (r.test(keys[i]) && utils.checkObject(meta, options, CONSTS.ACCESS_READ)) {
                        if (!dontModify) {
                            result.push(keys[i].substring(this.objNamespaceL));
                        } else {
                            result.push(keys[i]);
                        }
                    }
                }
                return tools.maybeCallbackWithError(callback, null, result);
            }
        } else {
            return tools.maybeCallbackWithError(callback, null, result);
        }
    }

    // User has provided a callback, thus we call the callback function
    getKeys(
        pattern: string,
        options: CallOptions | null | undefined,
        callback: ioBroker.GetConfigKeysCallback,
        dontModify?: boolean
    ): void;
    // User has provided callback without options, we call it
    getKeys(pattern: string, callback: ioBroker.GetConfigKeysCallback): void;
    // User has provided no callback, we return a promise
    getKeys(
        pattern: string,
        options?: CallOptions | null,
        callback?: undefined,
        dontModify?: boolean
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetConfigKeysCallback>>;
    getKeys(
        pattern: string,
        options?: CallOptions | null | ioBroker.GetConfigKeysCallback,
        callback?: ioBroker.GetConfigKeysCallback,
        dontModify?: boolean
    ): void | Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetConfigKeysCallback>> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.getKeys(pattern, options, (err, obj) => (err ? reject(err) : resolve(obj)), dontModify)
            );
        }
        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
                if (err) {
                    return tools.maybeCallbackWithRedisError(callback, err);
                } else {
                    return this._getKeys(pattern, options, callback, dontModify);
                }
            });
        }
    }

    getKeysAsync(
        id: string,
        options?: CallOptions
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetConfigKeysCallback>> {
        return this.getKeys(id, options);
    }

    getConfigKeys(
        pattern: string,
        options: CallOptions,
        callback: ioBroker.GetConfigKeysCallback,
        dontModify: boolean
    ) {
        return this.getKeys(pattern, options, callback, dontModify);
    }

    async _getObjects(
        keys: string[],
        options: CallOptions,
        callback?: (err?: Error | null, objs?: ioBroker.Object[]) => void,
        dontModify?: boolean
    ) {
        if (!keys) {
            return tools.maybeCallbackWithError(callback, 'no keys');
        }
        if (!keys.length) {
            return tools.maybeCallbackWithError(callback, null, []);
        }

        let _keys: string[];
        if (!dontModify) {
            _keys = [];
            for (let i = 0; i < keys.length; i++) {
                _keys[i] = this.objNamespace + keys[i];
            }
        } else {
            _keys = keys;
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }

        let objs;
        try {
            objs = await this.client.mget(_keys);
            this.settings.connection.enhancedLogging &&
                this.log.silly(`${this.namespace} redis mget ${!objs ? 0 : objs.length} ${_keys.length}`);
        } catch (e) {
            this.log.warn(`${this.namespace} redis mget ${!objs ? 0 : objs.length} ${_keys.length}, err: ${e.message}`);
        }
        let result = [];

        if (objs) {
            const dontCheck =
                options &&
                (options.user === CONSTS.SYSTEM_ADMIN_USER ||
                    options.group !== CONSTS.SYSTEM_ADMIN_GROUP ||
                    (options.groups && options.groups.indexOf(CONSTS.SYSTEM_ADMIN_GROUP) !== -1));

            if (!dontCheck) {
                for (let i = 0; i < objs.length; i++) {
                    const strObj = objs[i];
                    let obj: ioBroker.Object | null;
                    try {
                        obj = strObj ? JSON.parse(strObj) : null;
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON ${_keys[i]}: ${objs[i]}`);
                        // TODO why permission error? It should better be something like parse error
                        result.push({ error: ERRORS.ERROR_PERMISSION });
                        continue;
                    }
                    if (utils.checkObject(obj, options, CONSTS.ACCESS_READ)) {
                        result.push(obj);
                    } else {
                        result.push({ error: ERRORS.ERROR_PERMISSION });
                    }
                }
            } else {
                result = objs.map((obj, i) => {
                    try {
                        return obj !== null ? JSON.parse(obj) : obj;
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON ${_keys[i]}: ${obj}`);
                        return null;
                    }
                });
            }
        }
        return tools.maybeCallbackWithError(callback, null, result);
    }

    getObjects(
        keys: string[],
        options?: CallOptions | null,
        callback?: (err?: Error | null, objs?: ioBroker.Object[]) => void,
        dontModify?: boolean
    ): void | Promise<ioBroker.Object[]> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                // @ts-expect-error need to clarify, that objs is not undefined if no error is provided
                this.getObjects(keys, options, (err, objs) => (err ? reject(err) : resolve(objs)), dontModify)
            );
        }

        if (options && options.acl) {
            options.acl = null;
        }
        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, CONSTS.ACCESS_READ, (err, options) => {
                if (err) {
                    return tools.maybeCallbackWithRedisError(callback, err);
                } else {
                    return this._getObjects(keys, options, callback, dontModify);
                }
            });
        }
    }

    getObjectsAsync(keys: string[], options?: CallOptions | null) {
        return new Promise((resolve, reject) =>
            this.getObjects(keys, options, (err, objs) => (err ? reject(err) : resolve(objs)))
        );
    }

    async _getObjectsByPattern(
        pattern: string,
        options: CallOptions,
        callback: (err?: Error | null, objs?: ioBroker.Object[]) => void
    ) {
        if (!pattern || typeof pattern !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid pattern ${JSON.stringify(pattern)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithRedisError(callback, ERRORS.ERROR_DB_CLOSED);
        }

        let keys;
        try {
            keys = await this._getKeysViaScan(this.objNamespace + pattern);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }

        this.settings.connection.enhancedLogging &&
            this.log.silly(`${this.namespace} redis keys ${keys.length} ${pattern}`);
        this._getObjects(keys, options, callback, true);
    }

    getObjectsByPattern(
        pattern: string,
        options: CallOptions | null,
        callback: (err?: Error | null, objs?: ioBroker.Object[]) => void
    ): void | Promise<ioBroker.Object[] | void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.getObjectsByPattern(pattern, options, (err, obj) => (err ? reject(err) : resolve(obj)))
            );
        }
        if (options && options.acl) {
            options.acl = null;
        }
        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, CONSTS.ACCESS_READ, (err, options) => {
                if (err) {
                    return tools.maybeCallbackWithRedisError(callback, err);
                } else {
                    return this._getObjectsByPattern(pattern, options, callback);
                }
            });
        }
    }

    getObjectsByPatternAsync(pattern: string, options: CallOptions) {
        return new Promise((resolve, reject) =>
            this.getObjectsByPattern(pattern, options, (err, objs) => (err ? reject(err) : resolve(objs)))
        );
    }

    async _setObject(
        id: string,
        obj: ioBroker.SettableObject,
        options: CallOptions,
        callback: ioBroker.SetObjectCallback
    ) {
        if (!id || typeof id !== 'string' || utils.REG_CHECK_ID.test(id)) {
            return tools.maybeCallbackWithError(callback, `Invalid ID: ${id}`);
        }

        if (!obj) {
            this.log.warn(this.namespace + ' setObject: Argument object is null');
            return tools.maybeCallbackWithError(callback, 'obj is null');
        }
        if (!tools.isObject(obj)) {
            this.log.warn(this.namespace + ' setObject: Argument object is no object: ' + obj);
            return tools.maybeCallbackWithError(callback, 'obj is no object');
        }
        if (!this.client) {
            return tools.maybeCallbackWithRedisError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        // make a copy of object, because we will modify it
        obj = deepClone(obj);

        obj._id = id;

        let oldObjStr: string | null;
        try {
            oldObjStr = await this.client.get(this.objNamespace + id);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        let oldObj: ioBroker.Object | null;
        try {
            oldObj = oldObjStr ? JSON.parse(oldObjStr) : null;
        } catch (e) {
            this.log.error(`${this.namespace} Cannot parse ${id} - ${oldObjStr}: ${e.message}`);
            return tools.maybeCallbackWithError(callback, `Cannot parse ${id} - ${oldObjStr}: ${e.message}`);
        }

        if (!tools.checkNonEditable(oldObj, obj)) {
            return tools.maybeCallbackWithError(callback, 'Invalid password for update of vendor information');
        }

        // we need to know if custom has been added/deleted
        const oldObjHasCustom = oldObj && oldObj.common && oldObj.common && oldObj.common.custom;

        // do not delete common settings, like "history" or "mobile". It can be erased only with "null"
        if (oldObj && oldObj.common) {
            for (const commonSetting of this.preserveSettings) {
                // special case if "custom"
                if (commonSetting === 'custom') {
                    // we had broken objects where common.custom was a "non-object" ... check and fix them here, no warning because users will most likely have no idea how to deal with it
                    if (
                        oldObj.common.custom !== undefined &&
                        oldObj.common.custom !== null &&
                        !tools.isObject(oldObj.common.custom)
                    ) {
                        delete oldObj.common.custom;
                    }
                    // also remove invalid data from new objects ... should not happen because adapter.js checks too
                    if (
                        obj.common &&
                        obj.common.custom !== undefined &&
                        obj.common.custom !== null &&
                        !tools.isObject(obj.common.custom)
                    ) {
                        delete obj.common.custom;
                    }

                    if (!oldObj.common.custom) {
                        // do nothing
                    } else if ((!obj.common || !obj.common.custom) && oldObj.common.custom) {
                        obj.common = obj.common || {};
                        obj.common.custom = oldObj.common.custom;
                    } else if (obj.common && obj.common.custom && oldObj.common.custom) {
                        // merge together
                        for (const attr of Object.keys(oldObj.common.custom)) {
                            if (obj.common.custom[attr] === null) {
                                delete obj.common.custom[attr];
                            } else if (obj.common.custom[attr] === undefined) {
                                obj.common.custom[attr] = oldObj.common.custom[attr];
                            }
                        }
                    }
                    // remove custom if no one attribute inside
                    if (obj.common && obj.common.custom) {
                        for (const attr of Object.keys(obj.common.custom)) {
                            if (obj.common.custom[attr] === null) {
                                delete obj.common.custom[attr];
                            }
                        }

                        if (!Object.keys(obj.common.custom).length) {
                            delete obj.common.custom;
                        }
                    }
                } else {
                    // remove settings if desired
                    if (obj.common && obj.common[commonSetting] === null) {
                        delete obj.common[commonSetting];
                    } else if (
                        // if old setting present and new setting is absent
                        oldObj.common[commonSetting] !== undefined &&
                        (!obj.common || obj.common[commonSetting] === undefined)
                    ) {
                        obj.common = obj.common || {};
                        obj.common[commonSetting] = oldObj.common[commonSetting];
                    }
                }
            }
        }

        if (obj.common && 'alias' in obj.common && obj.common.alias.id) {
            if (typeof obj.common.alias.id === 'object') {
                if (typeof obj.common.alias.id.write !== 'string' || typeof obj.common.alias.id.read !== 'string') {
                    return tools.maybeCallbackWithError(callback, 'Invalid alias ID');
                }

                if (obj.common.alias.id.write.startsWith('alias.') || obj.common.alias.id.read.startsWith('alias.')) {
                    return tools.maybeCallbackWithError(callback, 'Cannot make alias on alias');
                }
            } else {
                if (typeof obj.common.alias.id !== 'string') {
                    return tools.maybeCallbackWithError(callback, 'Invalid alias ID');
                }

                if (obj.common.alias.id.startsWith('alias.')) {
                    return tools.maybeCallbackWithError(callback, 'Cannot make alias on alias');
                }
            }
        }

        if (oldObj && oldObj.acl && !obj.acl) {
            obj.acl = oldObj.acl;
        }

        // add user default rights if no acl provided
        if (this.defaultNewAcl && !obj.acl) {
            obj.acl = deepClone(this.defaultNewAcl);
            // @ts-expect-error need to change assignments logic
            delete obj.acl.file;
            if (obj.type !== 'state') {
                // @ts-expect-error need to change assignments logic
                delete obj.acl.state;
            }
            // take the current user as owner if given, but if admin we keep default
            if (options.user && options.user !== CONSTS.SYSTEM_ADMIN_USER) {
                obj.acl.owner = options.user;
            }
            // take the current group as owner if given, but if admin we keep default
            if (options.group && options.group !== CONSTS.SYSTEM_ADMIN_GROUP) {
                obj.acl.ownerGroup = options.group;
            }
        }

        if (this.defaultNewAcl && obj.acl && !obj.acl.ownerGroup && options.group) {
            obj.acl.ownerGroup = options.group;
        }

        try {
            const message = JSON.stringify(obj);

            const commands = [];
            if (this.useSets) {
                if (obj.type && (!oldObj || !oldObj.type)) {
                    // new object or oldObj had no type -> add to set + set object
                    commands.push(['sadd', `${this.setNamespace}object.type.${obj.type}`, this.objNamespace + id]);
                } else if (obj.type && oldObj && oldObj.type && oldObj.type !== obj.type) {
                    // the old obj had a type which differs from the new type -> rem old, add new
                    commands.push(
                        ['sadd', `${this.setNamespace}object.type.${obj.type}`, this.objNamespace + id],
                        ['srem', `${this.setNamespace}object.type.${oldObj.type}`, this.objNamespace + id]
                    );
                } else if (oldObj && oldObj.type && !obj.type) {
                    // the oldObj had a type, the new one has no -> rem
                    // @ts-expect-error TODO: TS assumes that there cannot be an obj without type - but e.g. design/chart has type (OtherObject)
                    commands.push(['srem', `${this.setNamespace}object.type.${obj.type}`, this.objNamespace + id]);
                }

                if (obj.common && obj.common.custom && !oldObjHasCustom) {
                    // we now have custom, old object had no custom
                    commands.push(['sadd', `${this.setNamespace}object.common.custom`, this.objNamespace + id]);
                } else if (oldObjHasCustom && (!obj.common || !obj.common.custom)) {
                    // we no longer have custom
                    commands.push(['srem', `${this.setNamespace}object.common.custom`, this.objNamespace + id]);
                }
            }

            if (!commands.length) {
                await this.client.set(this.objNamespace + id, message);
            } else {
                // set all commands atomic
                commands.push(['set', this.objNamespace + id, message]);
                await this.client.multi(commands).exec();
            }

            //this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis publish ' + this.objNamespace + id + ' ' + message);
            // object updated -> if type changed to meta -> cache
            if (oldObj && oldObj.type === 'meta' && this.existingMetaObjects[id] === false) {
                this.existingMetaObjects[id] = true;
            }

            await this.client.publish(this.objNamespace + id, message);
            return tools.maybeCallbackWithError(callback, null, { id });
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * set anew or update object
     *
     * This function writes the object into DB
     *
     * @alias setObject
     * @memberof objectsInMemServer
     * @param id ID of the object
     * @param obj
     * @param options options for access control are optional
     * @param callback return function
     */
    setObject(
        id: string,
        obj: ioBroker.SettableObject,
        options?: CallOptions | null,
        callback?: ioBroker.SetObjectCallback
    ): void | Promise<ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback>> {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.setObject(id, obj, options, (err, res) => (err ? reject(err) : resolve(res)))
            );
        }
        if (options && options.acl) {
            options.acl = null;
        }

        utils.checkObjectRights(this, null, null, options, CONSTS.ACCESS_WRITE, err => {
            // do not use options from checkObjectRights because this will mess up configured default acl
            if (err) {
                return tools.maybeCallbackWithRedisError(callback, err);
            } else {
                // @ts-expect-error we have ensured that options is an object
                return this._setObject(id, obj, options, callback);
            }
        });
    }

    setObjectAsync(
        id: string,
        obj: ioBroker.SettableObject,
        options?: CallOptions | null
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback>> {
        return new Promise((resolve, reject) =>
            this.setObject(id, obj, options, (err, res) => (err ? reject(err) : resolve(res)))
        );
    }

    async _delObject(id: string, options: CallOptions, callback?: ioBroker.ErrorCallback) {
        if (!id || typeof id !== 'string' || utils.REG_CHECK_ID.test(id)) {
            return tools.maybeCallbackWithError(callback, `Invalid ID: ${id}`);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }

        // read object
        let oldObj;
        try {
            oldObj = await this.client.get(this.objNamespace + id);
        } catch (e) {
            this.log.warn(`${this.namespace} redis get ${id}, error - ${e.message}`);
        }

        if (!oldObj) {
            // Not existent, so goal reached :-)
            return tools.maybeCallback(callback);
        }

        try {
            oldObj = JSON.parse(oldObj);
        } catch (e) {
            this.log.warn(`${this.namespace} Cannot parse ${id} - ${oldObj}: ${e.message}`);
            oldObj = null;
        }

        if (!utils.checkObject(oldObj, options, CONSTS.ACCESS_WRITE)) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
        } else {
            try {
                const commands = [];

                if (this.useSets) {
                    if (oldObj.type) {
                        // e.g. _design/ has no type
                        // del the object from the set + del object atomic
                        commands.push([
                            'srem',
                            `${this.setNamespace}object.type.${oldObj.type}`,
                            this.objNamespace + id
                        ]);
                    }

                    if (oldObj.common && oldObj.common.custom) {
                        // del the object from "custom" set
                        commands.push(['srem', `${this.setNamespace}object.common.custom`, this.objNamespace + id]);
                    }
                }

                if (!commands.length) {
                    // only del
                    await this.client.del(this.objNamespace + id);
                } else {
                    // set all commands atomic
                    commands.push(['del', this.objNamespace + id]);
                    await this.client.multi(commands).exec();
                }

                // object has been deleted -> remove from cached meta if there
                if (this.existingMetaObjects[id]) {
                    this.existingMetaObjects[id] = false;
                }
                //this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis publish ' + this.objNamespace + id + ' null');
                await this.client.publish(this.objNamespace + id, 'null');
                return tools.maybeCallback(callback);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
    }

    // User has not passed options parameter
    delObject(id: string, callback: ioBroker.ErrorCallback): void;
    // User has  passed options parameter
    delObject(id: string, options: CallOptions | null, callback: ioBroker.ErrorCallback): void;
    // User has not passed a callback, we will return a Promise
    delObject(id: string, options?: CallOptions | null): Promise<void>;

    delObject(id: string, options: CallOptions | null, callback?: ioBroker.ErrorCallback): void | Promise<void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.delObject(id, options, err => (err ? reject(err) : resolve()))
            );
        }

        if (options && options.acl) {
            options.acl = null;
        }
        utils.checkObjectRights(this, null, null, options, CONSTS.ACCESS_DELETE, (err, options) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                return this._delObject(id, options, callback);
            }
        });
    }

    delObjectAsync(id: string, options?: CallOptions): Promise<void> {
        return this.delObject(id, options);
    }

    // this function is very ineffective. Because reads all objects and then process them
    async _applyViewFunc(
        func: ObjectViewFunction,
        params: ioBroker.GetObjectViewParams,
        options: CallOptions,
        callback?: ioBroker.GetObjectViewCallback<any>
    ) {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        }
        const result: ViewFuncResult<any> = {
            rows: []
        };

        /**
         * filters objs which are already present (and parse Errors) in array by property 'id'
         *
         * @param arr - Array of objects which should be filtered
         * @param duplicateFiltering - if duplicates need to be filtered
         */
        const filterEntries = (arr: ObjectIdValue[], duplicateFiltering: boolean): ObjectIdValue[] => {
            if (duplicateFiltering) {
                const included: Record<string, boolean> = {};
                return arr.filter(obj => {
                    if (included[obj.id] || obj.id === 'parseError') {
                        return false;
                    } else {
                        included[obj.id] = true;
                        return true;
                    }
                });
            } else {
                return arr.filter(obj => {
                    // only filter parse Errors
                    return obj.id !== 'parseError';
                });
            }
        };

        params = params || {};
        params.startkey = params.startkey || '';
        params.endkey = params.endkey || '\u9999';
        const wildcardPos = params.endkey.indexOf('\u9999');
        let wildCardLastPos = true;
        if (wildcardPos !== -1 && wildcardPos !== params.endkey.length - 1) {
            wildCardLastPos = false; // TODO do in LUA
        }

        // if start and and end keys are equal modify end key
        if (params.startkey === params.endkey) {
            params.endkey = params.endkey + '\u0000';
        }

        const matches: string[] | null = func.map.match(
            /if\s\(doc\.type\s?===?\s?'(\w+)'\)\semit\(([^,]+),\s?doc\s?\)/
        );

        // filter by type
        if (wildCardLastPos && func && func.map && this.scripts.filter && matches) {
            let cursor = '0';
            let filterRequired = true;
            do {
                if (!this.client) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
                }

                let objs: string[];
                try {
                    objs = await this.client.evalsha([
                        this.scripts.filter,
                        6,
                        this.objNamespace,
                        params.startkey,
                        params.endkey,
                        matches[1],
                        cursor,
                        `${this.setNamespace}object.type.${matches[1]}`
                    ]);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot get view: ${e.message}`);
                    return tools.maybeCallbackWithError(callback, e);
                }
                objs = objs || [];
                // if real redis we will have e.g. [[objs..], '0'], else [{}, .., {}]
                if (Array.isArray(objs[0])) {
                    cursor = objs[1] || '0';
                    objs = objs[0];
                } else {
                    cursor = '0';
                    filterRequired = false;
                }

                const currRows = objs.map(_obj => {
                    let obj: ioBroker.Object;
                    try {
                        obj = JSON.parse(_obj);
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON: ${_obj}`);
                        return { id: 'parseError', value: null };
                    }

                    if (matches[2] && matches[2].trim() === 'doc._id') {
                        return { id: obj._id, value: obj };
                    } else if (matches[2] && matches[2].trim() === 'doc.common.name' && obj.common) {
                        if (typeof obj.common.name === 'object') {
                            if (obj.common.name.en) {
                                return { id: obj.common.name.en, value: obj };
                            } else {
                                return { id: JSON.stringify(obj.common.name), value: obj };
                            }
                        } else {
                            return { id: obj.common.name, value: obj };
                        }
                    } else {
                        this.log.error(`${this.namespace} Cannot filter "${matches[2]}": ${JSON.stringify(obj)}`);
                        return { id: 'parseError', value: null };
                    }
                });
                if (currRows.length) {
                    result.rows = [...result.rows, ...currRows];
                } // endIf
            } while (cursor !== '0');

            // Now we have all objects -> calculate max if desired
            if (func.reduce === '_stats') {
                let max = null;
                for (let i = 0; i < result.rows.length; i++) {
                    if (max === null || result.rows[i].value > max) {
                        max = result.rows[i].value;
                    }
                }
                if (max !== null) {
                    result.rows = [{ id: '_stats', value: { max: max } }];
                } else {
                    result.rows = [];
                }
            }

            // apply filter if needed
            result.rows = filterEntries(result.rows, filterRequired);
            return tools.maybeCallbackWithError(callback, null, result);
        } else if (
            // filter by script
            wildCardLastPos &&
            func &&
            func.map &&
            this.scripts.script &&
            func.map.indexOf('doc.common.engineType') !== -1
        ) {
            let cursor = '0';
            let filterRequired = true;
            do {
                if (!this.client) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
                }
                let res: string[] | [objStrings: string[], cursor: string];
                try {
                    res = await this.client.evalsha([
                        this.scripts.script,
                        5,
                        this.objNamespace,
                        params.startkey,
                        params.endkey,
                        cursor,
                        `${this.setNamespace}object.type.script`
                    ]);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot get "scripts" view: ${e.message}`);
                    return tools.maybeCallbackWithError(callback, e, result);
                }

                let objs: string[];
                // if real redis we will have e.g. [[objs..], '0'], else [{}, .., {}]
                if (Array.isArray(res[0])) {
                    cursor = res[1] || '0';
                    objs = res[0];
                } else {
                    cursor = '0';
                    filterRequired = false;
                    objs = res as string[];
                }

                const currRows = objs.map(obj => {
                    try {
                        const scriptObj: ioBroker.ScriptObject = JSON.parse(obj);
                        return { id: scriptObj._id, value: scriptObj };
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON: ${obj}`);
                        return { id: 'parseError', value: null };
                    }
                });
                if (currRows.length) {
                    result.rows = [...result.rows, ...currRows];
                } // endIf
            } while (cursor !== '0');

            // apply filter if needed
            result.rows = filterEntries(result.rows, filterRequired);
            return tools.maybeCallbackWithError(callback, null, result);
        } else if (
            // filter by hm-rega programs

            wildCardLastPos &&
            func &&
            func.map &&
            this.scripts.programs &&
            func.map.indexOf("doc.native.TypeName === 'PROGRAM'") !== -1
        ) {
            let cursor = '0';
            let filterRequired = true;
            do {
                if (!this.client) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
                }

                let objs: string[];
                try {
                    objs = await this.client.evalsha([
                        this.scripts.programs,
                        5,
                        `${this.objNamespace}hm-rega.`,
                        params.startkey,
                        params.endkey,
                        cursor,
                        `${this.setNamespace}object.type.channel`
                    ]);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot get view: ${e.message}`);
                    return tools.maybeCallbackWithError(callback, e);
                }
                // if real redis we will have e.g. [[objs..], '0'], else [{}, .., {}]
                if (Array.isArray(objs[0])) {
                    cursor = objs[1] || '0';
                    objs = objs[0];
                } else {
                    cursor = '0';
                    filterRequired = false;
                }

                const currRows = objs.map(_obj => {
                    try {
                        const obj: ioBroker.Object = JSON.parse(_obj);
                        return { id: obj._id, value: obj };
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON: ${_obj}`);
                        return { id: 'parseError', value: null };
                    }
                });
                if (currRows.length) {
                    result.rows = [...result.rows, ...currRows];
                } // endIf
            } while (cursor !== '0');

            // apply filter if needed
            result.rows = filterEntries(result.rows, filterRequired);
            return tools.maybeCallbackWithError(callback, null, result);
        } else if (
            // filter by hm-rega variables
            wildCardLastPos &&
            func &&
            func.map &&
            this.scripts.variables &&
            func.map.indexOf("doc.native.TypeName === 'ALARMDP'") !== -1
        ) {
            let cursor = '0';
            let filterRequired = true;
            do {
                if (!this.client) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
                }

                let objs: string[];
                try {
                    objs = await this.client.evalsha([
                        this.scripts.variables,
                        5,
                        `${this.objNamespace}hm-rega.`,
                        params.startkey,
                        params.endkey,
                        cursor,
                        `${this.setNamespace}object.type.state`
                    ]);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot get view ${e.message}`);
                    return tools.maybeCallbackWithError(callback, e);
                }
                // if real redis we will have e.g. [[objs..], '0'], else [{}, .., {}]
                if (Array.isArray(objs[0])) {
                    cursor = objs[1] || '0';
                    objs = objs[0];
                } else {
                    cursor = '0';
                    filterRequired = false;
                }

                const currRows = objs.map(_obj => {
                    try {
                        const obj: ioBroker.Object = JSON.parse(_obj);
                        return { id: obj._id, value: obj };
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON: ${_obj}`);
                        return { id: 'parseError', value: null };
                    }
                });
                if (currRows.length) {
                    result.rows = [...result.rows, ...currRows];
                } // endIf
            } while (cursor !== '0');

            // apply filter if needed
            result.rows = filterEntries(result.rows, filterRequired);
            typeof callback === 'function' && callback(null, result);
        } else if (
            // filter by custom, redis also returns if common.custom is not present
            wildCardLastPos &&
            func &&
            func.map &&
            this.scripts.custom &&
            func.map.indexOf('doc.common.custom') !== -1
        ) {
            let cursor = '0';
            let filterRequired = true;
            do {
                if (!this.client) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
                }
                let objs: string[];
                try {
                    objs = await this.client.evalsha([
                        this.scripts.custom,
                        5,
                        this.objNamespace,
                        params.startkey,
                        params.endkey,
                        cursor,
                        `${this.setNamespace}object.common.custom`
                    ]);
                } catch (e) {
                    this.log.warn(`${this.namespace} Cannot get view: ${e.message}`);
                    return tools.maybeCallbackWithError(callback, e);
                }
                // if real redis we will have e.g. [[objs..], '0'], else [{}, .., {}]
                if (Array.isArray(objs[0])) {
                    cursor = objs[1] || '0';
                    objs = objs[0];
                } else {
                    cursor = '0';
                    filterRequired = false;
                }

                for (const _obj of objs) {
                    let obj: ioBroker.Object;
                    try {
                        obj = JSON.parse(_obj);
                    } catch {
                        this.log.error(`${this.namespace} Cannot parse JSON: ${_obj}`);
                        continue;
                    }

                    if (obj && obj.common && obj.common.custom) {
                        result.rows.push({ id: obj._id, value: obj.common.custom });
                    }
                }
            } while (cursor !== '0');

            // apply filter if needed
            result.rows = filterEntries(result.rows, filterRequired);
            return tools.maybeCallbackWithError(callback, null, result);
        } else {
            if (!wildCardLastPos) {
                this.log.debug(
                    `${this.namespace} Search can't be optimized because wildcard not at the end, fallback to keys!: ${func.map}`
                );
            } else {
                this.log.debug(`${this.namespace} No suitable Lua script, fallback to keys!: ${func.map}`);
            }

            let searchKeys = this.objNamespace + '*';
            if (wildcardPos !== -1) {
                // Wildcard included
                searchKeys = this.objNamespace + params.endkey.replace(/\u9999/g, '*');
            }

            let keys;
            try {
                keys = await this._getKeysViaScan(searchKeys);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }

            if (!this.client) {
                return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
            }

            const endAfterWildcard = params.endkey.substr(wildcardPos + 1);
            params.startkey = this.objNamespace + params.startkey;
            params.endkey = this.objNamespace + params.endkey;

            keys = keys.sort().filter(key => {
                if (key && !utils.REG_CHECK_ID.test(key)) {
                    if (params && wildcardPos > 0) {
                        if (params.startkey && key < params.startkey) {
                            return false;
                        }
                        if (params.endkey && key > params.endkey) {
                            return false;
                        }
                    } else if (params && wildcardPos === 0) {
                        if (!key.endsWith(endAfterWildcard)) {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return false;
                }
            });

            let objs: (null | string)[];
            try {
                objs = await this.client.mget(keys);
            } catch {
                objs = [];
            }

            const _emit_ = (id: string, obj: ioBroker.Object) => {
                result.rows.push({ id: id, value: obj });
            };

            const f = eval(`(${func.map.replace(/^function\(([a-z0-9A-Z_]+)\)/g, 'function($1, emit)')})`);

            for (let i = 0; i < keys.length; i++) {
                const strObj = objs[i];
                let obj: ioBroker.Object | null;
                try {
                    obj = strObj !== null ? JSON.parse(strObj) : null;
                } catch {
                    this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${objs[i]}`);
                    continue;
                }
                if (!utils.checkObject(obj, options, CONSTS.ACCESS_READ)) {
                    continue;
                }

                if (obj) {
                    try {
                        f(obj, _emit_);
                    } catch (e) {
                        this.log.error(`${this.namespace} Cannot execute map: ${e.message}`);
                    }
                }
            }
            // Calculate max
            if (func.reduce === '_stats') {
                let max = null;
                for (let i = 0; i < result.rows.length; i++) {
                    if (max === null || result.rows[i].value > max) {
                        max = result.rows[i].value;
                    }
                }
                if (max !== null) {
                    result.rows = [{ id: '_stats', value: { max: max } }];
                } else {
                    result.rows = [];
                }
            }
            return tools.maybeCallbackWithError(callback, null, result);
        }
    }

    private _applyView(
        func: ObjectViewFunction,
        params: ioBroker.GetObjectViewParams,
        options: CallOptions | null,
        callback: ioBroker.GetObjectViewCallback<any>
    ): void | Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetObjectViewCallback<any>>> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this._applyView(func, params, options, (err, obj) => (err ? reject(err) : resolve(obj)))
            );
        }

        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
                if (err) {
                    typeof callback === 'function' && callback(err);
                } else {
                    return this._applyViewFunc(func, params, options, callback);
                }
            });
        }
    }

    private async _getObjectView(
        design: string,
        search: string,
        params: ioBroker.GetObjectViewParams,
        options: CallOptions,
        callback?: ioBroker.GetObjectViewCallback<any>
    ) {
        if (!this.client) {
            return tools.maybeCallbackWithRedisError(callback, ERRORS.ERROR_DB_CLOSED);
        }

        let obj;
        try {
            obj = await this.client.get(`${this.objNamespace}_design/${design}`);
        } catch (e) {
            this.log.error(`${this.namespace} Cannot find view "${design}" for search "${search}" : ${e.message}`);
            return tools.maybeCallbackWithError(callback, new Error(`Cannot find view "${design}"`));
        }

        if (obj) {
            try {
                obj = JSON.parse(obj);
            } catch {
                this.log.error(`${this.namespace} Cannot parse JSON: ${obj}`);
                return tools.maybeCallbackWithError(
                    callback,
                    new Error(`Cannot parse JSON: "_design/${design}" / "${obj}"`)
                );
            }

            if (obj.views && obj.views[search]) {
                return this._applyViewFunc(obj.views[search], params, options, callback);
            } else {
                this.log.error(`${this.namespace} Cannot find search "${search}" in "${design}"`);
                return tools.maybeCallbackWithError(
                    callback,
                    new Error(`Cannot find search "${search}" in "${design}"`)
                );
            }
        } else {
            this.log.error(`${this.namespace} Cannot find view "${design}" for search "${search}"`);
            return tools.maybeCallbackWithError(callback, new Error(`Cannot find view "${design}"`));
        }
    }

    // no callback provided, thus we return a result Promise
    getObjectView(
        design: string,
        search: string,
        params: ioBroker.GetObjectViewParams,
        options?: CallOptions
    ): ioBroker.GetObjectViewPromise<any>;

    // callback and options provided, we send result in callback
    getObjectView(
        design: string,
        search: string,
        params: ioBroker.GetObjectViewParams,
        options: CallOptions,
        callback: ioBroker.GetObjectViewCallback<any>
    ): void;

    // callback but no options provided, we send result in callback
    getObjectView(
        design: string,
        search: string,
        params: ioBroker.GetObjectViewParams,
        callback: ioBroker.GetObjectViewCallback<any>
    ): void;

    getObjectView(
        design: string,
        search: string,
        params: ioBroker.GetObjectViewParams,
        options?: any,
        callback?: ioBroker.GetObjectViewCallback<any>
    ) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.getObjectView(design, search, params, options, (err, obj) => (err ? reject(err) : resolve(obj)))
            );
        }

        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, 'list', (err, options) => {
                if (err) {
                    return tools.maybeCallbackWithRedisError(callback, err);
                } else {
                    return this._getObjectView(design, search, params, options, callback);
                }
            });
        }
    }

    getObjectViewAsync(
        design: string,
        search: string,
        params: ioBroker.GetObjectViewParams,
        options: CallOptions
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetObjectViewCallback<any>>> {
        return new Promise((resolve, reject) =>
            this.getObjectView(design, search, params, options, (err, arr) => (err ? reject(err) : resolve(arr)))
        );
    }

    private async _getObjectList(
        params: ioBroker.GetObjectListParams,
        options: CallOptions
    ): ioBroker.GetObjectListPromise {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }
        //params = {startkey, endkey, include_docs}
        params = params || {};
        params.startkey = params.startkey || '';
        params.endkey = params.endkey || '\u9999';
        const pattern =
            params.endkey.substring(0, params.startkey.length) === params.startkey
                ? this.objNamespace + params.startkey + '*'
                : this.objNamespace + '*';

        // todo: use lua script for this
        const keys = await this._getKeysViaScan(pattern);

        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        const _keys = [];
        for (const key of keys) {
            const id = key.substring(this.objNamespaceL);
            if (params.startkey && id < params.startkey) {
                continue;
            }
            if (params.endkey && id > params.endkey) {
                continue;
            }
            if (!id || utils.REG_CHECK_ID.test(id) || id.match(/\|file\$%\$/)) {
                continue;
            }
            if (!params.include_docs && id[0] === '_') {
                continue;
            }
            _keys.push(key);
        }
        _keys.sort();
        let objs;
        try {
            objs = await this.client.mget(_keys);
        } catch {
            // ignore
        }
        // return rows with id and doc
        const result: ObjectListResult = {
            rows: []
        };
        if (objs) {
            for (let i = 0; i < objs.length; i++) {
                const strObj = objs[i];
                let obj: ioBroker.Object | null;
                try {
                    obj = strObj ? JSON.parse(strObj) : null;
                } catch {
                    this.log.error(`${this.namespace} Cannot parse JSON ${_keys[i]}: ${objs[i]}`);
                    continue;
                }

                if (!obj || !utils.checkObject(obj, options, CONSTS.ACCESS_READ)) {
                    continue;
                }
                result.rows.push({ id: obj._id, value: obj, doc: obj });
            }
        }
        return result;
    }

    getObjectList(
        params: ioBroker.GetObjectListParams,
        options?: CallOptions | null,
        callback?: ioBroker.GetObjectListCallback
    ): void | Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetObjectListCallback>> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.getObjectList(params, options, (err, obj) => (err ? reject(err) : resolve(obj)))
            );
        }

        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, 'list', async (err, options) => {
                if (err) {
                    return tools.maybeCallbackWithRedisError(callback, err);
                } else {
                    try {
                        const res = await this._getObjectList(params, options || {});
                        return tools.maybeCallbackWithError(callback, null, res);
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, e);
                    }
                }
            });
        }
    }

    getObjectListAsync(params: ioBroker.GetObjectListParams, options: CallOptions) {
        return new Promise((resolve, reject) =>
            this.getObjectList(params, options, (err, arr) => (err ? reject(err) : resolve(arr)))
        );
    }

    // could be optimized, to read object only once. Now it will read 3 times
    private async _extendObject(
        id: string,
        obj: Partial<ioBroker.Object>,
        options: CallOptions,
        callback?: (err?: Error | null, obj?: ObjectIdValue, id?: string) => void
    ): Promise<[ObjectIdValue, string] | void> {
        if (!id || typeof id !== 'string' || utils.REG_CHECK_ID.test(id)) {
            return tools.maybeCallbackWithError(callback, `Invalid ID: ${id}`);
        }
        if (!this.client) {
            return tools.maybeCallbackWithRedisError(callback, ERRORS.ERROR_DB_CLOSED);
        }

        let oldObj;
        try {
            oldObj = await this.client.get(this.objNamespace + id);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        try {
            oldObj = oldObj ? JSON.parse(oldObj) : null;
        } catch {
            this.log.error(`${this.namespace} Cannot parse JSON ${id}: ${oldObj}`);
            return tools.maybeCallbackWithError(callback, `Cannot parse JSON ${id}: ${oldObj}`);
        }
        if (!utils.checkObject(oldObj, options, CONSTS.ACCESS_WRITE)) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
        }

        let _oldObj;
        if (oldObj && oldObj.nonEdit) {
            // copy object
            _oldObj = deepClone(oldObj);
        }

        // we need to know if custom has been added/deleted
        const oldObjHasCustom = oldObj && oldObj.common && oldObj.common && oldObj.common.custom;

        oldObj = oldObj || {};
        obj = deepClone(obj); // copy here to prevent "sandboxed" objects from JavaScript adapter
        if (
            oldObj.common &&
            oldObj.common.custom !== undefined &&
            oldObj.common.custom !== null &&
            !tools.isObject(oldObj.common.custom)
        ) {
            // custom has to be an object, else clean up
            delete oldObj.common.custom;
        }

        // we need to check if type has changed
        const oldType = oldObj.type;

        oldObj = extend(true, oldObj, obj);
        oldObj._id = id;

        // add user default rights
        if (this.defaultNewAcl && !oldObj.acl) {
            oldObj.acl = deepClone(this.defaultNewAcl);
            delete oldObj.acl.file;
            if (oldObj.type !== 'state') {
                delete oldObj.acl.state;
            }

            if (options.owner) {
                oldObj.acl.owner = options.owner;

                if (!options.ownerGroup) {
                    oldObj.acl.ownerGroup = null;
                    return void this.getUserGroup(options.owner, (user, groups /*, permissions */) => {
                        if (!groups || !groups[0]) {
                            options.ownerGroup =
                                (this.defaultNewAcl && this.defaultNewAcl.ownerGroup) || CONSTS.SYSTEM_ADMIN_GROUP;
                        } else {
                            options.ownerGroup = groups[0];
                        }
                        this._extendObject(id, obj, options, callback);
                    });
                }
            }
        }

        if (this.defaultNewAcl && options.ownerGroup && oldObj.acl && !oldObj.acl.ownerGroup) {
            oldObj.acl.ownerGroup = options.ownerGroup;
        }

        if (obj.common && obj.common.alias && obj.common.alias.id) {
            if (typeof obj.common.alias.id === 'object') {
                if (typeof obj.common.alias.id.write !== 'string' || typeof obj.common.alias.id.read !== 'string') {
                    return tools.maybeCallbackWithError(callback, 'Invalid alias ID');
                }

                if (obj.common.alias.id.write.startsWith('alias.') || obj.common.alias.id.read.startsWith('alias.')) {
                    return tools.maybeCallbackWithError(callback, 'Cannot make alias on alias');
                }
            } else {
                if (typeof obj.common.alias.id !== 'string') {
                    return tools.maybeCallbackWithError(callback, 'Invalid alias ID');
                }

                if (obj.common.alias.id.startsWith('alias.')) {
                    return tools.maybeCallbackWithError(callback, 'Cannot make alias on alias');
                }
            }
        }

        if (_oldObj && !tools.checkNonEditable(_oldObj, oldObj)) {
            return tools.maybeCallbackWithError(callback, 'Invalid password for update of vendor information');
        }
        const message = JSON.stringify(oldObj);

        try {
            const commands = [];
            if (this.useSets) {
                // what is called oldObj is acutally the obj we set, because it has been extended
                if (oldObj.type && !oldType) {
                    // new object or oldObj had no type -> add to set + set object
                    commands.push(['sadd', `${this.setNamespace}object.type.${obj.type}`, this.objNamespace + id]);
                } else if (oldObj.type && oldType && oldObj.type !== oldType) {
                    // the old obj had a type which differs from the new type -> rem old, add new
                    commands.push(
                        ['sadd', `${this.setNamespace}object.type.${obj.type}`, this.objNamespace + id],
                        ['srem', `${this.setNamespace}object.type.${oldObj.type}`, this.objNamespace + id]
                    );
                } else if (oldType && !oldObj.type) {
                    // the oldObj had a type, the new one has no -> rem
                    commands.push(['srem', `${this.setNamespace}object.type.${obj.type}`, this.objNamespace + id]);
                }
            }

            if (oldObj.common && oldObj.common.custom && !oldObjHasCustom) {
                // we now have custom, old object had no custom
                commands.push(['sadd', `${this.setNamespace}object.common.custom`, this.objNamespace + id]);
            } else if (oldObjHasCustom && (!oldObj.common || !oldObj.common.custom)) {
                // we no longer have custom
                commands.push(['srem', `${this.setNamespace}object.common.custom`, this.objNamespace + id]);
            }

            if (!commands.length) {
                await this.client.set(this.objNamespace + id, message);
            } else {
                // set all commands atomic
                commands.push(['set', this.objNamespace + id, message]);
                await this.client.multi(commands).exec();
            }

            // extended -> if its now type meta and currently marked as not -> cache
            if (this.existingMetaObjects[id] === false && oldObj && oldObj.type === 'meta') {
                this.existingMetaObjects[id] = true;
            }
            //this.settings.connection.enhancedLogging && this.log.silly(this.namespace + ' redis publish ' + this.objNamespace + id + ' ' + message);
            await this.client.publish(this.objNamespace + id, message);
            return tools.maybeCallbackWithError(callback, null, { id: id, value: oldObj }, id);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    extendObject(
        id: string,
        obj: Partial<ioBroker.Object>,
        options?: ioBroker.ExtendObjectOptions | null,
        callback?: ioBroker.ExtendObjectCallback
    ): void | Promise<ioBroker.CallbackReturnTypeOf<ioBroker.ExtendObjectCallback>> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.extendObject(id, obj, options, (err, res) => (err ? reject(err) : resolve(res)))
            );
        }

        if (options && options.acl) {
            options.acl = null;
        }

        utils.checkObjectRights(this, null, null, options, CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                return tools.maybeCallbackWithRedisError(callback, err);
            } else {
                return this._extendObject(id, obj, options, callback);
            }
        });
    }

    extendObjectAsync(id: string, obj: Partial<ioBroker.Object>, options: ioBroker.ExtendObjectOptions) {
        return new Promise((resolve, reject) =>
            this.extendObject(id, obj, options, (err, res) => (err ? reject(err) : resolve(res)))
        );
    }

    setConfig(id: string, obj: ioBroker.SettableObject, options: CallOptions, callback: ioBroker.SetObjectCallback) {
        return this.setObject(id, obj, options, callback);
    }

    delConfig(id: string, options: CallOptions, callback: ioBroker.ErrorCallback) {
        return this.delObject(id, options, callback);
    }

    getConfig(id: string, options: CallOptions, callback: ioBroker.GetObjectCallback) {
        return this.getObject(id, options, callback);
    }

    getConfigs(
        keys: string[],
        options: CallOptions,
        callback: (err?: Error | null, objs?: ioBroker.Object[]) => void,
        dontModify: boolean
    ) {
        return this.getObjects(keys, options, callback, dontModify);
    }

    /**
     * Returns the object id if found
     * @param idOrName
     * @param type
     * @param options
     * @param callback
     */
    private _findObject(
        idOrName: string,
        type: string | null,
        options: CallOptions,
        callback?: ioBroker.FindObjectCallback
    ) {
        this._getObject(idOrName, options, (err, obj) => {
            // Assume it is ID
            if (
                obj &&
                utils.checkObject(obj, options, CONSTS.ACCESS_READ) &&
                (!type || (obj.common && obj.common.type === type))
            ) {
                // @ts-expect-error https://github.com/ioBroker/adapter-core/issues/455
                return tools.maybeCallbackWithError(callback, null, idOrName, obj.common.name);
            } else {
                this._getKeys(
                    '*',
                    options,
                    async (err, keys) => {
                        if (!this.client) {
                            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
                        }

                        if (!keys || err) {
                            return tools.maybeCallbackWithError(callback, err);
                        }

                        let objs;
                        try {
                            objs = await this.client.mget(keys);
                        } catch (e) {
                            return tools.maybeCallbackWithRedisError(callback, e);
                        }
                        objs = objs || [];
                        // Assume it is name
                        for (let i = 0; i < keys.length; i++) {
                            const strObj = objs[i];
                            let obj: ioBroker.Object | null;
                            try {
                                obj = strObj ? JSON.parse(strObj) : null;
                            } catch {
                                this.log.error(`${this.namespace} Cannot parse JSON ${keys[i]}: ${objs[i]}`);
                                continue;
                            }
                            if (
                                obj &&
                                obj.common &&
                                obj.common.name === idOrName &&
                                (!type || obj.common.type === type)
                            ) {
                                return tools.maybeCallbackWithError(callback, null, obj._id, idOrName);
                            }
                        }
                        return tools.maybeCallbackWithError(callback, null, undefined, idOrName);
                    },
                    true
                );
            }
        });
    }

    // The user has provided a callback, thus we call it
    findObject(
        idOrName: string,
        type: string | null,
        options: CallOptions | null,
        callback: ioBroker.FindObjectCallback
    ): void;

    // The user has provided a callback without options
    findObject(idOrName: string, type: string | null, callback: ioBroker.FindObjectCallback): void;

    // No callback provided by user, we return a promise
    findObject(
        idOrName: string,
        type: string | null,
        options?: CallOptions | null
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.FindObjectCallback>>;

    findObject(
        idOrName: string,
        type: string | null,
        options: CallOptions | null,
        callback?: ioBroker.FindObjectCallback
    ): void | Promise<ioBroker.CallbackReturnTypeOf<ioBroker.FindObjectCallback>> {
        if (typeof type === 'function') {
            callback = type;
            options = null;
            type = null;
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!callback) {
            return new Promise((resolve, reject) =>
                this.findObject(idOrName, type, options, (err, id, _idOrName) => (err ? reject(err) : resolve(id)))
            );
        }

        if (options && options.acl) {
            options.acl = null;
        }

        if (typeof callback === 'function') {
            utils.checkObjectRights(this, null, null, options, CONSTS.ACCESS_LIST, (err, options) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    return this._findObject(idOrName, type, options, callback);
                }
            });
        }
    }

    findObjectAsync(
        idOrName: string,
        type: string,
        options: CallOptions
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.FindObjectCallback>> {
        return this.findObject(idOrName, type, options);
    }

    // can be called only from js-controller
    addPreserveSettings(settings: string[] | string) {
        if (!Array.isArray(settings)) {
            settings = [settings];
        }

        for (const setting of settings) {
            if (this.preserveSettings.indexOf(setting) === -1) {
                this.preserveSettings.push(setting);
            }
        }
    }

    private async _destroyDBHelper(keys: string[], callback: ioBroker.ErrorCallback) {
        if (!keys || !keys.length) {
            return tools.maybeCallback(callback);
        } else {
            if (!this.client) {
                return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
            }

            for (const id of keys) {
                try {
                    await this.client.del(id);
                } catch {
                    // ignore
                }
            }

            return tools.maybeCallback(callback);
        }
    }

    private async _destroyDB(options: CallOptions, callback: ioBroker.ErrorCallback) {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, ERRORS.ERROR_DB_CLOSED);
        } else {
            try {
                const keys = await this._getKeysViaScan(`${this.redisNamespace}*`);
                return this._destroyDBHelper(keys, callback);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
    }

    destroyDB(options: CallOptions | null, callback: ioBroker.ErrorCallback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        options = options || {};

        utils.checkObjectRights(this, null, null, options, CONSTS.ACCESS_WRITE, (err, options) => {
            if (err) {
                return tools.maybeCallbackWithRedisError(callback, err);
            } else {
                if (!options.acl.file.write || options.user !== CONSTS.SYSTEM_ADMIN_USER) {
                    return tools.maybeCallbackWithError(callback, ERRORS.ERROR_PERMISSION);
                } else {
                    return this._destroyDB(options, callback);
                }
            }
        });
    }

    destroyDBAsync(options: CallOptions): Promise<void> {
        return new Promise<void>((resolve, reject) => this.destroyDB(options, err => (err ? reject(err) : resolve())));
    }

    // Destructor of the class. Called by shutting down.
    async destroy() {
        this.stop = true;
        if (this.client) {
            try {
                await this.client.quit();
                this.client.removeAllListeners();
                this.client = null;
            } catch {
                // ignore error
            }
        }
        if (this.sub) {
            try {
                await this.sub.quit();
                this.sub.removeAllListeners();
                this.sub = null;
            } catch {
                // ignore error
            }
        }
        if (this.subSystem) {
            try {
                await this.subSystem.quit();
                this.subSystem.removeAllListeners();
                this.subSystem = null;
            } catch {
                // ignore error
            }
        }
    }

    async loadLuaScripts(): Promise<void> {
        let luaDirName;

        if (this.noLegacyMultihost && this.useSets) {
            luaDirName = 'lua-v4';
        } else if (this.noLegacyMultihost) {
            luaDirName = 'lua-v4-no-sets';
        } else {
            luaDirName = 'lua-v3';
        }

        const luaPath = path.join(__dirname, luaDirName);
        const scripts: Script[] = fs.readdirSync(luaPath).map(name => {
            const shasum = crypto.createHash('sha1');
            const script = fs.readFileSync(path.join(luaPath, name));
            shasum.update(script);
            const hash = shasum.digest('hex');
            return { name: name.replace(/\.lua$/, ''), text: script, hash };
        });

        const hashes = scripts.map(e => e.hash);
        hashes.unshift('EXISTS');

        if (!this.client) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        let arr: any[];
        try {
            arr = await this.client.script(hashes);
            arr && scripts.forEach((e, i) => (scripts[i].loaded = !!arr[i]));
        } catch {
            // ignore
        }

        if (!this.client) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        for (let i = 0; i < scripts.length; i++) {
            if (!scripts[i].loaded) {
                const script = scripts[i];
                let hash;
                try {
                    hash = await this.client.script(['LOAD', script.text]);
                    script.loaded = true;
                } catch (e) {
                    script.loaded = false;
                    this.log.error(`${this.namespace} Cannot load "${script.name}": ${e.message}`);
                    if (!script.name.startsWith('redlock_')) {
                        // because of #1753 an upgrade from < 4.0 will run against the old db server which will not know redlock
                        // TODO: remove if controller 4.0 is old enough
                        throw new Error(`Cannot load "${script.name}" into objects database: ${e.message}`);
                    }
                }
                script.hash = hash;
            }
        }
        this.scripts = {};
        scripts.forEach(e => (this.scripts[e.name] = e.hash));
    }

    /**
     * Get all keys matching a pattern using redis SCAN command, duplicates are filtered out
     *
     * @param pattern - pattern to match, e. g. io.hm-rpc.0*
     * @param count - count argument used by redis SCAN, default is 250
     */
    private _getKeysViaScan(pattern: string, count = 250): Promise<string[]> {
        return new Promise((resolve, reject) => {
            if (!this.client) {
                reject(new Error(ERRORS.ERROR_DB_CLOSED));
                return;
            }

            const stream = this.client.scanStream({ match: pattern, count: count });
            let uniqueKeys: string[] = [];

            stream.on('data', resultKeys => {
                if (!Array.isArray(resultKeys)) {
                    return;
                }
                // append result keys to uniqueKeys without duplicates
                uniqueKeys = [...uniqueKeys, ...resultKeys];
            });

            stream.on('end', () => {
                // return without duplicates
                resolve(Array.from(new Set(uniqueKeys)));
            });
        });
    }

    /**
     * Checks if a given set exists
     * @param id - id of the set
     */
    async setExists(id: string): Promise<boolean> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        const exists = await this.client.exists(this.setNamespace + id);
        return !!exists;
    }

    /**
     * Migrate all objects to sets
     * @return number of migrated sets
     */
    async migrateToSets(): Promise<number> {
        if (!this.useSets) {
            return 0;
        }

        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        // to be safe we remove all sets before migration
        const keys = await this._getKeysViaScan(`${this.setNamespace}object.type.*`);
        for (const key of keys) {
            await this.client.del(key);
        }

        let noMigrated = 0;
        // get all objs without using view
        const objs = await this.getObjectList({ startkey: '', endkey: '\u9999' });

        if (!objs) {
            return noMigrated;
        }

        for (const obj of objs.rows) {
            if (obj.value.type) {
                // e.g. _design/.. has no type
                // 1 if added else 0 (mostly always part of the set)
                const migrated = await this.client.sadd(
                    `${this.setNamespace}object.type.${obj.value.type}`,
                    this.objNamespace + obj.id
                );
                noMigrated += migrated;
            }

            // check for custom
            if (obj.value.common && obj.value.common.custom) {
                const migrated = await this.client.sadd(
                    `${this.setNamespace}object.common.custom`,
                    this.objNamespace + obj.id
                );
                noMigrated += migrated;
            }
        }
        return noMigrated;
    }

    /**
     * Returns the protocol version from DB
     */
    getProtocolVersion(): Promise<string | null> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        return this.client.get(`${this.metaNamespace}objects.protocolVersion`);
    }

    /**
     * Extend the primary host lock time
     * Value will expire after ms milliseconds
     *
     * @param ms - ms until value expires
     * @return 1 if extended else 0
     */
    extendPrimaryHostLock(ms: number): Promise<number> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        // we have a host version smaller 3 no one can be primary
        if (!this.noLegacyMultihost) {
            return Promise.resolve(0);
        }

        // try to extend lock
        return this.client.evalsha([
            this.scripts.redlock_extend,
            3,
            `${this.metaNamespace}objects.primaryHost`,
            this.hostname,
            ms
        ]);
    }

    /**
     * Sets current host as primary if no primary host active
     * Value will expire after ms milliseconds
     *
     * @param ms - ms until value expires
     * @return 1 if lock acquired else 0
     */
    setPrimaryHost(ms: number): Promise<number> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        // we have a host version smaller 3 no one can be primary
        if (!this.noLegacyMultihost) {
            return Promise.resolve(0);
        }

        // try to acquire lock
        return this.client.evalsha([
            this.scripts.redlock_acquire,
            3,
            `${this.metaNamespace}objects.primaryHost`,
            this.hostname,
            ms
        ]);
    }

    /**
     * Get name of the primary host
     */
    getPrimaryHost(): Promise<string | null> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        // we have a host version smaller 3 no one can be primary
        if (!this.noLegacyMultihost) {
            return Promise.resolve('');
        }

        return this.client.get(`${this.metaNamespace}objects.primaryHost`);
    }

    /**
     * Ensure we are no longer the primary host
     */
    releasePrimaryHost(): Promise<void> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        if (!this.noLegacyMultihost) {
            return Promise.resolve();
        }

        // try to release lock
        return this.client.evalsha([
            this.scripts.redlock_release,
            4,
            `${this.metaNamespace}objects.primaryHost`,
            this.hostname,
            this.settings.connection.options.db,
            `${this.metaNamespace}objects.primaryHost`
        ]);
    }

    /**
     * Sets the protocol version to the DB
     * @param version - protocol version
     */
    async setProtocolVersion(version: number | string): Promise<void> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        version = version.toString();
        // we can only set a protocol if we actually support it
        if (this.supportedProtocolVersions.includes(version)) {
            await this.client.set(`${this.metaNamespace}objects.protocolVersion`, version);
            await this.client.publish(`${this.metaNamespace}objects.protocolVersion`, version);
        } else {
            throw new Error('Cannot set an unsupported protocol version on the current host');
        }
    }

    /**
     * Subscribe to expired events to get expiration of primary host
     */
    async subscribePrimaryHost(): Promise<void> {
        if (this.subSystem) {
            await this.subSystem.subscribe(`__keyevent@${this.settings.connection.options.db}__:expired`);
            await this.subSystem.subscribe(`__keyevent@${this.settings.connection.options.db}__:evicted`);
        }
    }

    /**
     * Activates the usage of sets
     */
    async activateSets(): Promise<void> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        await this.client.set(`${this.metaNamespace}objects.features.useSets`, '1');
        this.useSets = true;
    }

    /**
     * Deactivates the usage of sets
     */
    async deactivateSets(): Promise<void> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        await this.client.set(`${this.metaNamespace}objects.features.useSets`, '0');
        this.useSets = false;
    }

    /**
     * Get value from meta namespace
     *
     * @param id redis key
     */
    getMeta(id: string): Promise<string | null> {
        if (!this.client) {
            throw new Error(ERRORS.ERROR_DB_CLOSED);
        }

        return this.client.get(this.metaNamespace + id);
    }
}

module.exports = ObjectsInRedisClient;
