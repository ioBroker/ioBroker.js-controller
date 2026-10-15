/**
 *      States DB in redis - Client
 *
 *      Copyright 2013-2026 bluefox <dogafox@gmail.com>
 *      Copyright 2013-2014 hobbyquaker
 *
 *      MIT License
 *
 */

import { isDeepStrictEqual } from 'node:util';
import Redis from 'ioredis';
import type IORedis from 'ioredis';

import { tools } from '@iobroker/db-base';
import type { InternalLogger } from '@iobroker/js-controller-common-db/tools';
import type { DbStatus, ConnectionOptions } from '@iobroker/db-base/inMemFileDB';

type JSONDecoderValue = Record<string, any>;

/**
 * Decodes a JSON with buffer value
 *
 * @param _key The current property key (unused, required by the JSON.parse reviver signature)
 * @param value The value to potentially decode into a Buffer
 */
function bufferJsonDecoder(_key: string, value: JSONDecoderValue): Buffer | JSONDecoderValue {
    if (tools.isObject(value) && value.type === 'Buffer' && value.data && Array.isArray(value.data)) {
        return Buffer.from(value.data);
    }
    return value;
}

type UserChangeFunction = (id: string, state: ioBroker.State | null) => void;
type ChangeFunction = (id: string, state: ioBroker.State | ioBroker.Message | null) => void;

/** Settings for the states database client */
export interface StatesSettings {
    /** Called once the client is connected */
    connected?: () => void;
    /** Called when the client gets disconnected */
    disconnected?: () => void;
    /** Handler for user-level state changes */
    changeUser?: UserChangeFunction;
    /** Handler for system-level state and message changes */
    change?: ChangeFunction;
    /** Connection options for the redis server */
    connection: ConnectionOptions;
    /** Whether to connect to the database immediately (default true) */
    autoConnect?: boolean;
    /** Logger instance to use */
    logger?: InternalLogger;
    /** Name of this host */
    hostname?: string;
    /** Namespace of this client */
    namespace?: string;
    /** Namespace used for meta information */
    metaNamespace?: string;
    /** Namespace used for sessions */
    namespaceSession?: string;
    /** Namespace used for log messages */
    namespaceLog?: string;
    /** Namespace used for the message box */
    namespaceMsg?: string;
    /** Redis key prefix (defaults to "io") */
    redisNamespace?: string;
}

/** The internal log message does not have an _id parameter */
type LogMessageInternal = Omit<ioBroker.LogMessage, '_id'>;

/**
 * Client for the states database backed by Redis (or the in-memory redis-protocol server)
 */
export class StateRedisClient {
    private settings: StatesSettings;
    private readonly namespaceRedis: string;
    private readonly namespaceRedisL: number;
    private readonly namespaceMsg: string;
    private readonly namespaceLog: string;
    private readonly namespaceSession: string;
    private readonly metaNamespace: string;
    private globalMessageId = Math.round(Math.random() * 100_000_000);
    private globalLogId = Math.round(Math.random() * 100_000_000);
    private readonly namespace: string;
    private readonly supportedProtocolVersions: string[] = ['4'];
    private stop = false;
    private client: IORedis.Redis | null = null;
    /** Client for user events */
    private sub: IORedis.Redis | null = null;
    /** Client for system events */
    private subSystem: IORedis.Redis | null = null;
    private log: InternalLogger;
    private activeProtocolVersion?: string;
    private readonly userSubscriptions: Record<string, RegExp> = {};
    /** System level subscriptions value true means messagebox is subscribed */
    private readonly systemSubscriptions: Record<string, RegExp | true> = {};
    /** True while a reconnect-triggered subscription replay is running (coalesces overlapping replays) */
    private replayInProgress = false;
    /** Set to true when a reconnect fires while a replay is already running, so the replay runs once more afterwards */
    private replayPending = false;
    /**
     * Monotonic generation counter for the system pub/sub socket (`subSystem`). It is bumped on
     * every `close` of that socket, independent of the one-shot `ready` replay. A subscription
     * (e.g. `messagebox.system.host.<name>`) acknowledged in one generation is lost if the socket
     * is torn down afterwards, so the replay re-runs the system pass whenever this value changes
     * while it is restoring subscriptions (see issue #3524 epoch race).
     */
    private systemSubEpoch = 0;

    /**
     * @param settings Settings for the states client including connection and namespaces
     */
    constructor(settings: StatesSettings) {
        this.settings = settings || {};
        this.namespaceRedis = `${this.settings.redisNamespace || 'io'}.`;
        this.namespaceRedisL = this.namespaceRedis.length;
        this.namespaceMsg = `${this.settings.namespaceMsg || 'messagebox'}.`;
        this.namespaceLog = `${this.settings.namespaceLog || 'log'}.`;
        this.namespaceSession = `${this.settings.namespaceSession || 'session'}.`;
        this.metaNamespace = `${this.settings.metaNamespace || 'meta'}.`;

        this.namespace = this.settings.namespace || this.settings.hostname || '';

        this.log = tools.getLogger(this.settings.logger);

        if (this.settings.autoConnect !== false) {
            this.connectDb();
        }
    }

    /**
     * Checks if we are allowed to start and sets the protocol version accordingly
     *
     */
    async _determineProtocolVersion(): Promise<void> {
        if (!this.client) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        let protoVersion: string | null = null;
        try {
            protoVersion = await this.client.get(`${this.metaNamespace}states.protocolVersion`);
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

    /**
     * Connect to the states database and set up the change and message subscriptions
     */
    connectDb(): void {
        this.settings.connection ||= {} as ConnectionOptions;

        const onChange = this.settings.change; // on change handler
        const onChangeUser = this.settings.changeUser; // on change handler for User events

        let ready = false;
        let initError = false;
        let connected = false;
        let reconnectCounter = 0;
        let errorLogged = false;
        // Sentinel is in use when a list of hosts is configured
        const isSentinel = Array.isArray(this.settings.connection.host);
        // Becomes true after the first successful "ready" so we can tell a
        // re-connection apart from the initial connection
        let wasReady = false;

        this.settings.connection.options ||= {} as ioBroker.ObjectsDatabaseOptions['options'];
        const retry_max_delay = this.settings.connection.options.retry_max_delay || 5000;
        const retry_max_count = this.settings.connection.options.retry_max_count || 19;
        this.settings.connection.options.retryStrategy = (reconnectCount: number): number | Error => {
            if (!ready && initError) {
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
            }
            return retry_max_delay;
            /*if (options.error.code === 'ECONNREFUSED') {
                // End reconnecting on a specific error and flush all commands with a individual error
                return new Error('The server refused the connection');
            }
            if (options.total_retry_time > 1000 * 60 * 60) {
                // End reconnecting after a specific timeout and flush all commands with a individual error
                return new Error('Retry time exhausted');
            }
            if (options.times_connected > 10) {
                // End reconnecting with built-in error
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
            this.settings.connection.options.path = this.settings.connection.host as string;
            this.log.debug(
                `${this.namespace} Redis States: Use File Socket for connection: ${this.settings.connection.options.path}`,
            );
        } else if (Array.isArray(this.settings.connection.host)) {
            // Host is an array means we use a sentinel
            this.settings.connection.options.sentinels = this.settings.connection.host.map((redisNode, idx) => ({
                host: redisNode,
                port: Array.isArray(this.settings.connection.port)
                    ? this.settings.connection.port[idx]
                    : this.settings.connection.port,
            }));
            this.settings.connection.options.name = this.settings.connection.sentinelName
                ? this.settings.connection.sentinelName
                : 'mymaster';
            this.log.debug(
                `${this.namespace} Redis States: Use Sentinel for connection: ${
                    this.settings.connection.options.name
                }, ${JSON.stringify(this.settings.connection.options.sentinels)}`,
            );
        } else {
            this.settings.connection.options.host = this.settings.connection.host;
            this.settings.connection.options.port = this.settings.connection.port;
            this.log.debug(
                `${this.namespace} Redis States: Use Redis connection: ${this.settings.connection.options.host}:${this.settings.connection.options.port as number}`,
            );
        }
        if (this.settings.connection.options.db === undefined) {
            this.settings.connection.options.db = 0;
        }
        if (this.settings.connection.options.family === undefined) {
            this.settings.connection.options.family = 0;
        }
        this.settings.connection.options.password =
            this.settings.connection.options.auth_pass || this.settings.connection.pass || undefined;
        this.settings.connection.options.autoResubscribe = false; // We do our own resubscribe because other sometimes not work
        // REDIS does not allow whitespaces, we have some because of pid
        this.settings.connection.options.connectionName = this.namespace.replace(/\s/g, '');

        this.client = new Redis.Redis(this.settings.connection.options as Redis.RedisOptions);

        this.client.on('error', error => {
            this.settings.connection.enhancedLogging &&
                this.log.silly(
                    `${this.namespace} Redis ERROR States: (${this.stop}) ${error.message} / ${error.stack}`,
                );
            if (this.stop) {
                return;
            }
            if (!ready) {
                initError = true;
                // Seems we have a socket.io server
                if (error.message.startsWith('Protocol error, got "H" as reply type byte.')) {
                    this.log.error(
                        `${this.namespace} Could not connect to states database at ${this.settings.connection.options.host as string}:${this.settings.connection.options.port as number} (invalid protocol). Please make sure the configured IP and port points to a host running JS-Controller >= 2.0. and that the port is not occupied by other software!`,
                    );
                }
                return;
            }
            this.log.error(`${this.namespace} States database error: ${error.message}`);
            errorLogged = true;
        });

        this.client.on('end', () => {
            this.settings.connection.enhancedLogging &&
                this.log.silly(`${this.namespace} States-Redis Event end (stop=${this.stop})`);
            if (ready && typeof this.settings.disconnected === 'function') {
                // only an unexpected disconnect is worth a warning, not an intentional shutdown
                if (!this.stop) {
                    this.log.warn(`❌ ${this.namespace} States database disconnected`);
                }
                this.settings.disconnected();
            }
        });

        this.client.on('connect', () => {
            this.settings.connection.enhancedLogging &&
                this.log.silly(`${this.namespace} States-Redis Event connect (stop=${this.stop})`);
            connected = true;
            if (errorLogged) {
                this.log.info(`✅ ${this.namespace} States database successfully reconnected`);
                errorLogged = false;
            }
        });

        this.client.on('close', () => {
            this.settings.connection.enhancedLogging &&
                this.log.silly(`${this.namespace} States-Redis Event close (stop=${this.stop})`);
            //if (ready && typeof this.settings.disconnected === 'function') this.settings.disconnected();
        });

        this.client.on('reconnecting', () => {
            if (connected && !ready && !initError) {
                reconnectCounter++;
            }
            this.settings.connection.enhancedLogging &&
                this.log.silly(
                    `${this.namespace} States-Redis Event reconnect (reconnectCounter=${reconnectCounter}, stop=${this.stop})`,
                );
            if (reconnectCounter > 2) {
                // fallback logic for nodejs <10
                this.log.error(
                    `${this.namespace} The DB port  ${this.settings.connection.options.port as number} is occupied by something that is not a Redis protocol server. Please check other software running on this port or, if you use iobroker, make sure to update to js-controller 2.0 or higher!`,
                );
                return;
            }
            connected = false;
            initError = false;
        });

        this.client.on('ready', async () => {
            this.settings.connection.enhancedLogging &&
                this.log.silly(`${this.namespace} States-Redis Event ready (stop=${this.stop})`);
            if (this.stop || !this.client) {
                return;
            }
            initError = false;

            if (isSentinel && wasReady) {
                this.log.info(
                    `✅ ${this.namespace} States DB reconnected via Redis Sentinel (master group "${this.settings.connection.options.name}")`,
                );
            }
            // Capture whether the main client already reached "ready" before: on a reconnect the
            // sibling pub/sub connections (subSystem/sub) are not recreated, so their own "ready"
            // based subscription replay does not run and the messagebox subscription is lost.
            const isReconnect = wasReady;
            wasReady = true;

            let initCounter = 0;
            if (!this.subSystem && typeof onChange === 'function') {
                initCounter++;
                try {
                    await this.client.config('SET', 'notify-keyspace-events', 'Exe'); // enable Expiry/Evicted events in server
                } catch (e) {
                    this.log.warn(
                        `${this.namespace} Unable to enable Expiry Keyspace events from Redis Server: ${e.message}`,
                    );
                }

                this.log.debug(`${this.namespace} States create System PubSub Client`);
                this.subSystem = new Redis.Redis(this.settings.connection.options as Redis.RedisOptions);

                if (typeof onChange === 'function') {
                    this.subSystem.on('pmessage', (pattern: string, channel: string, message: string): void => {
                        setImmediate(() => {
                            this.log.silly(
                                `${this.namespace} States system redis pmessage ${pattern}/${channel}:${message}`,
                            );

                            if (channel.startsWith(this.metaNamespace)) {
                                if (
                                    channel === `${this.metaNamespace}states.protocolVersion` &&
                                    message !== this.activeProtocolVersion
                                ) {
                                    if (typeof this.settings.disconnected === 'function') {
                                        // protocol version has changed, restart controller
                                        this.log.info(
                                            `${this.namespace} States protocol version has changed, disconnecting!`,
                                        );
                                        this.settings.disconnected();
                                    }
                                }
                                return;
                            }

                            let stateObj: ioBroker.State | null;
                            try {
                                stateObj = message
                                    ? JSON.parse(message, message.includes('"Buffer"') ? bufferJsonDecoder : undefined)
                                    : null;
                            } catch {
                                this.log.warn(`${this.namespace} Cannot parse system pmessage "${message}"`);
                                stateObj = null;
                            }

                            try {
                                if (channel.startsWith(this.namespaceRedis) && channel.length > this.namespaceRedisL) {
                                    onChange(channel.substring(this.namespaceRedisL), stateObj);
                                } else {
                                    onChange(channel, stateObj);
                                }
                            } catch (e) {
                                this.log.warn(
                                    `${this.namespace} States system pmessage ${channel} ${JSON.stringify(message)} ${
                                        e.message
                                    }`,
                                );
                                this.log.warn(`${this.namespace} ${e.stack}`);
                            }
                        });
                    });
                }

                if (typeof onChange === 'function' || typeof onChangeUser === 'function') {
                    // subscribe on key expired or evicted (auto removed because of memory full) message
                    this.subSystem.on('message', (channel, message) =>
                        setImmediate(() => {
                            this.log.silly(`${this.namespace} redis message expired/evicted ${channel}:${message}`);
                            try {
                                if (channel === `__keyevent@${this.settings.connection.options.db}__:evicted`) {
                                    this.log.warn(
                                        `${this.namespace} Redis has evicted state ${message}. Please check your maxMemory settings for your redis instance!`,
                                    );
                                } else if (channel !== `__keyevent@${this.settings.connection.options.db}__:expired`) {
                                    this.log.warn(`${this.namespace} Unknown user message ${channel} ${message}`);
                                    return;
                                }
                                if (typeof onChange === 'function') {
                                    // Find deleted states and notify user
                                    const found = Object.values(this.systemSubscriptions).find(
                                        regex => regex !== true && regex.test(message),
                                    );
                                    found && onChange(message.substring(this.namespaceRedisL), null);
                                }
                                if (typeof onChangeUser === 'function' && this.sub) {
                                    // Find deleted states and notify user
                                    const found = Object.values(this.userSubscriptions).find(regex =>
                                        regex.test(message),
                                    );
                                    found && onChangeUser(message.substring(this.namespaceRedisL), null);
                                }
                            } catch (e) {
                                this.log.warn(`${this.namespace} user message ${channel} ${message} ${e.message}`);
                                this.log.warn(`${this.namespace} ${e.stack}`);
                            }
                        }),
                    );
                }
                this.subSystem.on('end', () => {
                    this.settings.connection.enhancedLogging &&
                        this.log.silly(`${this.namespace} States-Redis System Event end sub (stop=${this.stop})`);
                    ready && typeof this.settings.disconnected === 'function' && this.settings.disconnected();
                });

                // Bump the system pub/sub generation on every socket close (transient drop or
                // permanent end). The reconnect replay reads this to detect that the socket changed
                // underneath it and that an already-acknowledged psubscribe (e.g. the messagebox
                // channel) was lost with the old socket - see issue #3524 epoch race.
                this.subSystem.on('close', () => {
                    this.systemSubEpoch++;
                });

                this.subSystem.on('error', error => {
                    if (this.stop) {
                        return;
                    }
                    this.settings.connection.enhancedLogging &&
                        this.log.silly(
                            `${this.namespace} Sub-Client States System No redis connection: ${JSON.stringify(error)}`,
                        );
                });

                if (this.settings.connection.enhancedLogging) {
                    this.subSystem.on('connect', () =>
                        this.log.silly(
                            `${this.namespace} PubSub client States-Redis System Event connect (stop=${this.stop})`,
                        ),
                    );

                    this.subSystem.on('close', () =>
                        this.log.silly(
                            `${this.namespace} PubSub client States-Redis System Event close (stop=${this.stop})`,
                        ),
                    );

                    this.subSystem.on('reconnecting', (reconnectCounter: number): void =>
                        this.log.silly(
                            `${this.namespace} PubSub client States-Redis System Event reconnect (reconnectCounter=${reconnectCounter}, stop=${this.stop})`,
                        ),
                    );
                }

                this.subSystem.on('ready', async () => {
                    try {
                        if (this.subSystem) {
                            await this.subSystem.subscribe(
                                `__keyevent@${this.settings.connection.options.db}__:expired`,
                            );
                        }
                    } catch (e) {
                        this.log.warn(
                            `${this.namespace} Unable to subscribe to expiry Keyspace events from Redis Server: ${e.message}`,
                        );
                    }

                    try {
                        if (this.subSystem) {
                            await this.subSystem.subscribe(
                                `__keyevent@${this.settings.connection.options.db}__:evicted`,
                            );
                        }
                    } catch (e) {
                        this.log.warn(
                            `${this.namespace} Unable to subscribe to evicted Keyspace events from Redis Server: ${e.message}`,
                        );
                    }

                    // subscribe to meta changes
                    try {
                        if (this.subSystem) {
                            await this.subSystem.psubscribe(`${this.metaNamespace}*`);
                        }
                    } catch (e) {
                        this.log.warn(
                            `${this.namespace} Unable to subscribe to meta namespace "${this.metaNamespace}" changes: ${e.message}`,
                        );
                    }

                    if (--initCounter < 1) {
                        if (this.settings.connection.port === 0) {
                            this.log.debug(
                                `${this.namespace} States ${
                                    ready ? 'system re' : ''
                                }connected to redis: ${tools.maybeArrayToString(this.settings.connection.host)}`,
                            );
                        } else {
                            this.log.debug(
                                `${this.namespace} States ${
                                    ready ? 'system re' : ''
                                }connected to redis: ${tools.maybeArrayToString(
                                    this.settings.connection.host,
                                )}:${tools.maybeArrayToString(this.settings.connection.port)}`,
                            );
                        }
                        if (!ready) {
                            if (typeof this.settings.connected === 'function') {
                                this.settings.connected();
                            }
                            ready = true;
                        }
                    }

                    if (this.subSystem) {
                        for (const sub of Object.keys(this.systemSubscriptions)) {
                            try {
                                await this.subSystem.psubscribe(sub);
                            } catch {
                                //ignore
                            }
                        }
                    }
                });
            }

            if (!this.sub && typeof onChangeUser === 'function') {
                initCounter++;

                this.log.debug(`${this.namespace} States create User PubSub Client`);
                this.sub = new Redis.Redis(this.settings.connection.options as Redis.RedisOptions);

                this.sub.on('pmessage', (pattern, channel, message) => {
                    setImmediate(() => {
                        this.log.silly(`${this.namespace} States user redis pmessage ${pattern}/${channel}:${message}`);

                        let stateObj: ioBroker.State | null;
                        try {
                            stateObj = message
                                ? JSON.parse(message, message.includes('"Buffer"') ? bufferJsonDecoder : undefined)
                                : null;
                        } catch {
                            this.log.warn(`${this.namespace} Cannot parse user pmessage "${message}"`);
                            stateObj = null;
                        }

                        try {
                            if (channel.startsWith(this.namespaceRedis) && channel.length > this.namespaceRedisL) {
                                onChangeUser(channel.substring(this.namespaceRedisL), stateObj);
                            } else {
                                onChangeUser(channel, stateObj);
                            }
                        } catch (e) {
                            this.log.warn(
                                `${this.namespace} States user pmessage ${channel} ${JSON.stringify(message)} ${
                                    e.message
                                }`,
                            );
                            this.log.warn(`${this.namespace} ${e.stack}`);
                        }
                    });
                });

                this.sub.on('end', () => {
                    this.settings.connection.enhancedLogging &&
                        this.log.silly(`${this.namespace} States-Redis User Event end sub (stop=${this.stop})`);
                    if (ready && typeof this.settings.disconnected === 'function') {
                        this.settings.disconnected();
                    }
                });

                this.sub.on('error', error => {
                    if (this.stop) {
                        return;
                    }
                    if (this.settings.connection.enhancedLogging) {
                        this.log.silly(
                            `${this.namespace} Sub-Client States User No redis connection: ${JSON.stringify(error)}`,
                        );
                    }
                });

                if (this.settings.connection.enhancedLogging) {
                    this.sub.on('connect', () => {
                        this.log.silly(
                            `${this.namespace} PubSub client States-Redis User Event connect (stop=${this.stop})`,
                        );
                    });

                    this.sub.on('close', () => {
                        this.log.silly(
                            `${this.namespace} PubSub client States-Redis User Event close (stop=${this.stop})`,
                        );
                    });

                    this.sub.on('reconnecting', (reconnectCounter: number): void => {
                        this.log.silly(
                            `${this.namespace} PubSub client States-Redis User Event reconnect (reconnectCounter=${reconnectCounter}, stop=${this.stop})`,
                        );
                    });
                }

                this.sub.on('ready', async () => {
                    if (!this.sub) {
                        // client gone while ready emitted, can maybe not happen but ts is happy
                        return;
                    }

                    if (--initCounter < 1) {
                        if (this.settings.connection.port === 0) {
                            this.log.debug(
                                `${this.namespace} States ${
                                    ready ? 'user re' : ''
                                }connected to redis: ${tools.maybeArrayToString(this.settings.connection.host)}`,
                            );
                        } else {
                            this.log.debug(
                                `${this.namespace} States ${
                                    ready ? 'user re' : ''
                                }connected to redis: ${tools.maybeArrayToString(
                                    this.settings.connection.host,
                                )}:${tools.maybeArrayToString(this.settings.connection.port)}`,
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

            try {
                await this._determineProtocolVersion();
            } catch (e) {
                this.log.error(`${this.namespace} ${e.message}`);
                throw new Error('States DB is not allowed to start in the current Multihost environment');
            }

            if (initCounter < 1) {
                if (this.settings.connection.port === 0) {
                    this.log.debug(
                        `${this.namespace} States ${
                            ready ? 'client re' : ''
                        }connected to redis: ${tools.maybeArrayToString(this.settings.connection.host)}`,
                    );
                } else {
                    this.log.debug(
                        `${this.namespace} States ${
                            ready ? 'client re' : ''
                        }connected to redis: ${tools.maybeArrayToString(
                            this.settings.connection.host,
                        )}:${tools.maybeArrayToString(this.settings.connection.port)}`,
                    );
                }
                !ready && typeof this.settings.connected === 'function' && this.settings.connected();
                ready = true;
            }

            // On a reconnect the sibling pub/sub connections already exist, so the first-connect
            // subscription setup above is skipped and their own "ready" handlers may never fire
            // again (see issue #3524). Re-arm the pub/sub subscriptions explicitly so host message
            // handling (messagebox.system.host.<name>) resumes after a states DB reconnect.
            // This intentionally runs after the _determineProtocolVersion() check above: we do not
            // want to re-subscribe before the protocol has been validated. A transient throw there
            // aborts this handler, but the next "ready" (reconnect) will run the replay again.
            if (isReconnect) {
                void this.replaySubscriptions();
            }
        });
    }

    /**
     * Make sure a sibling pub/sub ioredis client is connected and ready before we replay
     * subscriptions against it.
     *
     * The three ioredis connections (main `client`, `sub`, `subSystem`) each have their own socket
     * and retry lifecycle. When the main client reaches `ready` again after a states DB drop, a
     * sibling may still be `reconnecting`, or may have permanently ended (its retry strategy stops
     * after `retry_max_count` attempts, status `end`). In both cases simply issuing `psubscribe`
     * does NOT guarantee the pattern reaches the server: an ended socket never flushes its offline
     * queue. This brings the sibling back to `ready` - reviving an ended socket via `connect()` -
     * so the subsequent replay is issued against a live connection.
     *
     * @param client the sibling ioredis client (`subSystem` or `sub`) to bring to a ready state
     * @param timeoutMs how long to wait for the client to reach `ready` before giving up
     * @returns true if the client is connected and ready, false otherwise
     */
    private async ensureSubClientReady(client: IORedis.Redis, timeoutMs = 5_000): Promise<boolean> {
        if (this.stop) {
            return false;
        }
        const isReady = (): boolean => client.status === 'ready';
        if (isReady()) {
            return true;
        }

        // An ended socket will not reconnect by itself (retry strategy exhausted / stopped).
        // Revive it explicitly; connect() rejects if it is already connecting/connected, which is
        // fine - we fall through to waiting for the `ready` event below.
        const status: string = client.status;
        if (status === 'end' || status === 'wait') {
            try {
                await client.connect();
                return isReady();
            } catch {
                // already connecting/connected, or connect failed - fall through to waiting
            }
        }

        // Socket is connecting/reconnecting: wait (bounded) for it to become ready.
        return new Promise<boolean>(resolve => {
            let settled = false;
            let timer: NodeJS.Timeout | null = null;
            // Resolve true as soon as the socket reports ready; `once` auto-removes this listener.
            const onReady = (): void => {
                if (settled) {
                    return;
                }
                settled = true;
                // Clear the fallback timer so it does not linger and keep the event loop alive
                // (relevant for a clean process exit and under rapid reconnects).
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                resolve(true);
            };
            client.once('ready', onReady);
            // Bounded fallback: if `ready` never fires, stop waiting. A late `ready` after this is
            // harmless because `settled` guards the listener. unref() so the timer never by itself
            // keeps the process alive.
            timer = setTimeout(() => {
                timer = null;
                if (settled) {
                    return;
                }
                settled = true;
                client.removeListener('ready', onReady);
                resolve(isReady());
            }, timeoutMs);
            timer.unref?.();
        });
    }

    /**
     * Re-arm the system and user pub/sub subscriptions after a states DB reconnect.
     *
     * On a reconnect the `subSystem`/`sub` ioredis instances are reused (not recreated), so the
     * subscription replay that normally happens inside their one-shot `ready` handlers does not
     * run again (see issue #3524). This re-issues the keyspace/meta subscriptions and every entry
     * in `systemSubscriptions` (notably `messagebox.system.host.<name>`) and `userSubscriptions`.
     *
     * Robustness guarantees for the #3524 failure mode:
     * - It first brings each sibling connection back to `ready` ({@link ensureSubClientReady}),
     *   because the main client reaching `ready` does not prove a sibling is usable.
     * - It tracks per-pattern success and retries once the sibling is confirmed ready, so a
     *   mid-replay disconnect cannot silently leave the messagebox pattern unsubscribed.
     * - If a `systemSubscriptions` pattern (the inbound host-message channel) still cannot be
     *   re-established, it escalates through `settings.disconnected()` so the controller performs a
     *   full reconnect cycle (which recreates the siblings and re-runs the first-connect path),
     *   rather than running on with reads/writes alive but inter-host commands dead.
     * - Overlapping replays are coalesced via `replayInProgress`/`replayPending`, so a reconnect
     *   storm results in a single additional run instead of racing detached replays.
     *
     * It is idempotent: re-subscribing an already active pattern is a no-op on the server, and
     * every step is guarded so a transient failure never throws out of the `ready` handler.
     */
    private async replaySubscriptions(): Promise<void> {
        if (this.stop) {
            return;
        }

        // Coalesce overlapping replays: if one is already running, remember that another reconnect
        // happened and let the active run repeat itself once it finishes.
        if (this.replayInProgress) {
            this.replayPending = true;
            return;
        }
        this.replayInProgress = true;

        try {
            do {
                this.replayPending = false;
                await this.doReplaySubscriptions();
            } while (this.replayPending && !this.stop);
        } finally {
            this.replayInProgress = false;
        }
    }

    /**
     * Single pass of the subscription replay. See {@link replaySubscriptions} for the overall
     * contract; this method performs one attempt and escalates on an unrecoverable messagebox
     * failure.
     *
     * The system pub/sub channel is restored first and then re-validated against the connection
     * generation ({@link systemSubEpoch}): the user pass can take time, and if `subSystem` is torn
     * down and reconnects while it runs, the server-side messagebox subscription acknowledged in
     * the previous generation is gone. Because the sibling `ready` handler is not a reliable
     * trigger (issue #3524), the pass re-runs the system replay whenever the generation changed
     * until it completes within a single stable generation, so no acknowledged subscription is
     * silently lost.
     */
    private async doReplaySubscriptions(): Promise<void> {
        this.settings.connection.enhancedLogging &&
            this.log.silly(`${this.namespace} States replay subscriptions after reconnect`);

        // Bounded number of system re-passes within one replay, so a reconnect storm cannot spin
        // here forever. The outer replayPending loop re-runs the whole replay if more happen.
        const maxSystemPasses = 5;
        let systemPasses = 0;
        let systemReplayFailed = false;
        let epochBeforeSystem = this.systemSubEpoch;

        if (this.subSystem) {
            // Restore the system channel until it completes within a single, unchanged connection
            // generation. If the socket flipped (epoch changed) while we were psubscribing, the
            // acknowledgements may have landed on a now-dead socket, so run it again.
            do {
                epochBeforeSystem = this.systemSubEpoch;
                systemReplayFailed = !(await this.replaySystemSubscriptions());
                systemPasses++;
            } while (
                !systemReplayFailed &&
                this.systemSubEpoch !== epochBeforeSystem &&
                !this.stop &&
                systemPasses < maxSystemPasses
            );

            if (this.stop) {
                return;
            }

            // If we exhausted the pass budget while the generation was still changing, the last
            // pass's acknowledgements may belong to a now-dead socket. The capped state is not a
            // stable generation, so treat it as a failure and escalate rather than running on with
            // a possibly unsubscribed messagebox channel (issue #3524 silent-degradation state).
            if (!systemReplayFailed && this.systemSubEpoch !== epochBeforeSystem) {
                systemReplayFailed = true;
            }
        }

        if (this.sub && !this.stop) {
            const sub = this.sub;
            const userReady = await this.ensureSubClientReady(sub);
            if (userReady) {
                const failedUserSubs: string[] = [];
                for (const pattern of Object.keys(this.userSubscriptions)) {
                    if (this.stop) {
                        return;
                    }
                    try {
                        await sub.psubscribe(pattern);
                    } catch {
                        failedUserSubs.push(pattern);
                    }
                }
                if (failedUserSubs.length && !this.stop && (await this.ensureSubClientReady(sub))) {
                    for (const pattern of failedUserSubs) {
                        if (this.stop) {
                            return;
                        }
                        try {
                            await sub.psubscribe(pattern);
                        } catch {
                            // user subscriptions are not part of the #3524 escalation; a stale read
                            // subscription is recovered on the next reconnect
                        }
                    }
                }
            }
        }

        // The user pass may have taken a while. If the system socket flipped generation since the
        // last good system pass, the messagebox subscription acknowledged earlier was lost with the
        // old socket - replay the system channel again (still bounded) before deciding success.
        if (this.subSystem && !systemReplayFailed && !this.stop && this.systemSubEpoch !== epochBeforeSystem) {
            if (systemPasses < maxSystemPasses) {
                do {
                    epochBeforeSystem = this.systemSubEpoch;
                    systemReplayFailed = !(await this.replaySystemSubscriptions());
                    systemPasses++;
                } while (
                    !systemReplayFailed &&
                    this.systemSubEpoch !== epochBeforeSystem &&
                    !this.stop &&
                    systemPasses < maxSystemPasses
                );
            }

            // Whether we re-passed and still ended on a changed generation, or the pass budget was
            // already exhausted so we could not re-pass at all, the system channel is not in a
            // stable generation: the messagebox acknowledgement may belong to a dead socket. Treat
            // it as a failure and escalate instead of accepting an indeterminate state (#3524).
            if (!systemReplayFailed && !this.stop && this.systemSubEpoch !== epochBeforeSystem) {
                systemReplayFailed = true;
            }
        }

        // The messagebox subscription is what inter-host commands rely on. If we could not restore
        // the system subscriptions, do not run on silently (reads/writes alive, host commands dead).
        // Signal a disconnect so the controller tears down and reconnects, which recreates the
        // sibling connections and re-runs the first-connect subscription path.
        if (systemReplayFailed && !this.stop && typeof this.settings.disconnected === 'function') {
            this.log.warn(
                `${this.namespace} Could not restore states system subscriptions after reconnect, forcing reconnect`,
            );
            try {
                this.settings.disconnected();
            } catch (e) {
                // never let the escalation throw out of the void-ed replay promise
                this.log.warn(`${this.namespace} Error while forcing reconnect after failed replay: ${e.message}`);
            }
        }
    }

    /**
     * Replay the system pub/sub subscriptions (keyspace/meta channels and every
     * `systemSubscriptions` entry, notably `messagebox.system.host.<name>`) against the current
     * `subSystem` socket exactly once.
     *
     * It brings the socket to `ready` first, re-issues each pattern, and retries any that fail once
     * the socket is confirmed ready again, so a mid-replay drop does not silently leave the
     * messagebox pattern unsubscribed. Detecting a generation flip that happens *after* a
     * successful pass is the caller's responsibility (see {@link doReplaySubscriptions}).
     *
     * @returns true if the system subscriptions were (re)issued against a ready socket, false if
     * the socket could not be made ready or a pattern could not be restored
     */
    private async replaySystemSubscriptions(): Promise<boolean> {
        const subSystem = this.subSystem;
        if (!subSystem) {
            return true;
        }

        const systemReady = await this.ensureSubClientReady(subSystem);
        if (this.stop) {
            return true;
        }

        if (!systemReady) {
            // The system pub/sub socket could not be brought back - inbound host messages
            // (messagebox) would stay dead. Report failure so the caller escalates.
            this.log.warn(
                `${this.namespace} States system pub/sub connection not ready on reconnect, cannot replay subscriptions`,
            );
            return false;
        }

        try {
            await subSystem.subscribe(`__keyevent@${this.settings.connection.options.db}__:expired`);
        } catch (e) {
            this.log.warn(
                `${this.namespace} Unable to re-subscribe to expiry Keyspace events from Redis Server: ${e.message}`,
            );
        }

        try {
            await subSystem.subscribe(`__keyevent@${this.settings.connection.options.db}__:evicted`);
        } catch (e) {
            this.log.warn(
                `${this.namespace} Unable to re-subscribe to evicted Keyspace events from Redis Server: ${e.message}`,
            );
        }

        try {
            await subSystem.psubscribe(`${this.metaNamespace}*`);
        } catch (e) {
            this.log.warn(
                `${this.namespace} Unable to re-subscribe to meta namespace "${this.metaNamespace}" changes: ${e.message}`,
            );
        }

        // Replay the host/system subscriptions (incl. messagebox.system.host.<name>).
        // Collect patterns that fail so we can retry them once more after confirming the
        // socket is ready again - a mid-replay disconnect must not silently drop them.
        const failedSystemSubs: string[] = [];
        for (const sub of Object.keys(this.systemSubscriptions)) {
            if (this.stop) {
                return true;
            }
            try {
                await subSystem.psubscribe(sub);
            } catch {
                failedSystemSubs.push(sub);
            }
        }

        if (failedSystemSubs.length && !this.stop) {
            const retryReady = await this.ensureSubClientReady(subSystem);
            if (retryReady) {
                for (const sub of failedSystemSubs.splice(0)) {
                    if (this.stop) {
                        return true;
                    }
                    try {
                        await subSystem.psubscribe(sub);
                    } catch {
                        failedSystemSubs.push(sub);
                    }
                }
            }
            if (failedSystemSubs.length) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get the current status of the database
     */
    getStatus(): DbStatus {
        return { type: 'redis', server: false };
    }

    /**
     * Set the value of a state
     *
     * @param id The id of the state to set
     * @param state The value (or full state object) to set
     */
    setState(id: string, state: ioBroker.SettableState | ioBroker.StateValue): Promise<string>;

    /** @deprecated migrate to promisified version (without callback) */
    setState(
        id: string,
        state: ioBroker.SettableState | ioBroker.StateValue,
        callback: (err: Error | null | undefined, id: string) => void,
    ): void;

    /**
     * @param id the id of the value. '<this.namespaceRedis>.' will be prepended
     * @param state
     *
     *
     *      an object containing the actual value and some metadata:<br>
     *      setState(id, {'val': val, 'ts': ts, 'ack': ack, 'from': from, 'lc': lc, 'user': user})
     *
     *      if no object is given state is treated as val:<br>
     *      setState(id, val)
     *
     *      <ul><li><b>val</b>  the actual value. Can be any JSON-stringifiable object. If undefined the
     *                          value is kept unchanged.</li>
     *
     *      <li><b>ack</b>  a boolean that can be used to mark a value as confirmed, used in bidirectional systems which
     *                      acknowledge that a value has been successfully set. Will be set to false if undefined.</li>
     *
     *      <li><b>ts</b>   a unix timestamp indicating the last write-operation on the state. Will be set by the
     *                      setState method if undefined.</li>
     *
     *      <li><b>lc</b>   a unix timestamp indicating the last change of the actual value. this should be undefined
     *                      when calling setState, it will be set by the setValue method itself.</li></ul>
     * @param callback will be called when redis confirmed reception of the command
     */
    async setState(
        id: string,
        state: ioBroker.SettableState | ioBroker.StateValue,
        callback?: (err: Error | null | undefined, id: string) => void,
    ): Promise<string | void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!tools.isObject(state)) {
            state = {
                val: state,
            };
        }

        let expire;
        if (state.expire) {
            expire = state.expire;
            delete state.expire;
        }

        let oldObj;
        try {
            oldObj = await this.client.get(this.namespaceRedis + id);
        } catch (e) {
            this.log.warn(`${this.namespace} get state error: ${e.message}`);
            return tools.maybeCallbackWithRedisError(callback, e, id);
        }
        if (!this.client) {
            return;
        }

        if (!oldObj) {
            oldObj = { val: null };
        } else {
            try {
                oldObj = JSON.parse(oldObj);
            } catch {
                this.log.warn(`${this.namespace} Cannot parse "${oldObj}"`);
                oldObj = { val: null };
            }
        }

        const obj: Partial<ioBroker.State> = {};

        if (state.val !== undefined) {
            obj.val = state.val;
        } else {
            obj.val = oldObj.val;
        }

        if (state.ack !== undefined) {
            obj.ack = state.ack === null ? oldObj.ack || false : state.ack;
        } else {
            obj.ack = false;
        }

        if (typeof state.ts === 'number') {
            obj.ts = state.ts < 946681200000 ? state.ts * 1000 : state.ts; // if less 2000.01.01 00:00:00
        } else {
            obj.ts = new Date().getTime();
        }

        if (state.q !== undefined) {
            obj.q = state.q;
        } else {
            obj.q = 0;
        }

        // set comment
        if (typeof state.c === 'string' && state.c) {
            obj.c = state.c.substring(0, 512);
        }

        obj.from = state.from;

        if (state.user !== undefined) {
            obj.user = state.user;
        }

        let hasChanged;

        if (typeof state.lc === 'number') {
            obj.lc = state.lc;
        } else {
            // isDeepStrictEqual works on objects and primitive values
            hasChanged = !isDeepStrictEqual(oldObj.val, obj.val);
            if (!oldObj.lc || hasChanged) {
                obj.lc = obj.ts;
            } else {
                obj.lc = oldObj.lc;
            }
        }

        const objString = JSON.stringify(obj);

        // publish event in redis
        this.settings.connection.enhancedLogging &&
            this.log.silly(`${this.namespace} redis publish ${this.namespaceRedis}${id} ${objString}`);

        // Write the state and publish the change in a single MULTI so both are sent
        // in one round-trip instead of two. setState is the hottest path in the
        // system, so saving a round-trip per call adds up significantly under load.
        const commands: string[][] = expire
            ? [['setex', this.namespaceRedis + id, String(expire), objString]]
            : [['set', this.namespaceRedis + id, objString]];
        commands.push(['publish', this.namespaceRedis + id, objString]);

        try {
            await this.client.multi(commands).exec();
            return tools.maybeCallbackWithError(callback, null, id);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e, id);
        }
    }

    /**
     * Promise-version of setState
     *
     * @param id The id of the state to set
     * @param state The value (or full state object) to set
     * @deprecated use version without `Async` postfix
     */
    setStateAsync(id: string, state: ioBroker.SettableState | ioBroker.StateValue): Promise<string> {
        return new Promise((resolve, reject) => {
            this.setState(id, state, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    /**
     * Directly set the raw stored value of a state without publishing a change (used for restore, do not call it)
     *
     * @param id The id of the state to set
     * @param state The raw state object to store
     */
    async setRawState(id: string, state: ioBroker.SettableState): Promise<string> {
        if (!id || typeof id !== 'string') {
            throw new Error(`invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        await this.client.set(this.namespaceRedis + id, JSON.stringify(state));
        return id;
    }

    /**
     * Get state from database
     *
     * @param id id of the state
     */
    getState(id: string): ioBroker.GetStatePromise;
    /**
     * Get state from database
     *
     * @param id id of the state
     * @param callback optional callback, leave out and use promise return type
     */
    getState(id: string, callback: (err: Error | null | undefined, state?: ioBroker.State | null) => void): void;

    /**
     * Get state from database
     *
     * @param id id of the state
     * @param callback optional callback, leave out and use promise return type
     */
    async getState(
        id: string,
        callback?: (err: Error | null | undefined, state?: ioBroker.State | null) => void,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetStateCallback> | void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        let obj;
        try {
            obj = await this.client.get(this.namespaceRedis + id);
            this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis get ${id} ok: ${obj}`);
        } catch (e) {
            this.log.warn(`${this.namespace} redis get ${id}, error - ${e.message}`);
        }

        if (!obj) {
            return tools.maybeCallbackWithError(callback, null, null);
        }
        try {
            obj = JSON.parse(obj);
        } catch {
            this.log.warn(`${this.namespace} Cannot parse "${obj}"`);
            obj = null;
        }
        return tools.maybeCallbackWithError(callback, null, obj);
    }

    /**
     * Promise-version of getState
     *
     * @param id id of the state to get
     */
    getStateAsync(id: string): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetStateCallback> | void> {
        return this.getState(id);
    }

    /**
     * Get the values of multiple states
     *
     * @param keys The ids of the states to read
     * @param callback Optional callback, leave out and use the promise return type
     * @param dontModify If true, the returned states are not cloned/modified
     */
    getStates(keys: string[], callback?: undefined, dontModify?: boolean): Promise<(ioBroker.State | null)[]>;
    /**
     * Get the values of multiple states
     *
     * @param keys The ids of the states to read
     * @param callback Callback called with the read states
     * @param dontModify If true, the returned states are not cloned/modified
     */
    getStates(
        keys: string[],
        callback: (err: Error | undefined | null, states?: (ioBroker.State | null)[]) => void,
        dontModify?: boolean,
    ): void;

    /**
     * Get the values of multiple states
     *
     * @param keys The ids of the states to read
     * @param callback Optional callback called with the read states
     * @param dontModify If true, the returned states are not cloned/modified
     */
    async getStates(
        keys: string[],
        callback?: (err: Error | undefined | null, states?: (ioBroker.State | null)[]) => void,
        dontModify?: boolean,
    ): Promise<(ioBroker.State | null)[] | void> {
        if (!keys || !Array.isArray(keys)) {
            return tools.maybeCallbackWithError(callback, 'no keys');
        }
        if (!keys.length) {
            return tools.maybeCallbackWithError(callback, null, []);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }
        let _keys: string[];
        if (!dontModify) {
            _keys = keys.map(k => this.namespaceRedis + k);
        } else {
            _keys = keys;
        }

        let obj: (string | null)[];
        try {
            obj = await this.client.mget(_keys);
            this.settings.connection.enhancedLogging &&
                this.log.silly(`${this.namespace} redis mget ${!obj ? 0 : obj.length} ${_keys.length}`);
        } catch (e) {
            this.log.warn(`${this.namespace} redis mget of ${_keys.length} keys, err: ${e.message}`);
            return tools.maybeCallbackWithRedisError(callback, e, []);
        }
        const result: (ioBroker.State | null)[] = [];

        obj.forEach((state, i) => {
            try {
                result.push(state ? JSON.parse(state) : null);
            } catch (e) {
                this.log.error(
                    `Parsing error on getStates("${_keys[i]}"), returning "null" for "${state}": ${e.message}`,
                );
                result.push(null);
            }
        });

        return tools.maybeCallbackWithError(callback, null, result);
    }

    /**
     * @param keys - array of keys which will be deleted from db
     * @param callback function to be executed after keys have been deleted
     */
    async _destroyDBHelper(keys: string[], callback?: ioBroker.ErrorCallback): Promise<void> {
        if (!keys || !keys.length) {
            return tools.maybeCallback(callback);
        }
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
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

    /**
     * Destroy (delete) all states in the database
     */
    destroyDB(): Promise<void>;
    /**
     * @param callback cb function to be executed after DB has been destroyed
     */
    destroyDB(callback: ioBroker.ErrorCallback): void;

    /**
     * @param callback cb function to be executed after DB has been destroyed
     */
    async destroyDB(callback?: ioBroker.ErrorCallback): Promise<void> {
        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }
        let keys;
        try {
            keys = await this.client.keys(`${this.namespaceRedis}*`);
        } catch {
            //ignore
        }
        return this._destroyDBHelper(keys || [], callback);
    }

    /**
     * Destructor of the class. Called when shutting down to close the redis connections.
     */
    async destroy(): Promise<void> {
        this.stop = true;
        // Cancel any pending reconnect replay; the running loop checks `this.stop` and will exit.
        this.replayPending = false;
        if (this.client) {
            try {
                await this.client.quit();
                this.client.removeAllListeners();
                this.client = null;
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
        if (this.sub) {
            try {
                await this.sub.quit();
                this.sub.removeAllListeners();
                this.sub = null;
            } catch {
                // ignore error
            }
        }
    }

    /**
     * Delete a state and publish the deletion
     *
     * @param id The id of the state to delete
     */
    delState(id: string): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.DeleteStateCallback>>;
    /**
     * Delete a state and publish the deletion
     *
     * @param id The id of the state to delete
     * @param callback Callback called with the deleted id
     */
    delState(id: string, callback: ioBroker.DeleteStateCallback): void;

    /**
     * Delete a state and publish the deletion
     *
     * @param id The id of the state to delete
     * @param callback Optional callback called with the deleted id
     */
    async delState(
        id: string,
        callback?: ioBroker.DeleteStateCallback,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.DeleteStateCallback> | void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            await this.client.del(this.namespaceRedis + id);
            await this.client.publish(this.namespaceRedis + id, 'null');
            this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis del ${id}, ok`);
            return tools.maybeCallbackWithError(callback, null, id);
        } catch (e) {
            this.log.warn(`${this.namespace} redis del ${id}, error - ${e.message}`);
            return tools.maybeCallbackWithRedisError(callback, e, id);
        }
    }

    /**
     * Get all state ids matching the given pattern
     *
     * @param pattern The pattern to match state ids against
     * @param callback Optional callback, leave out and use the promise return type
     * @param dontModify If true, the returned keys are not stripped of the namespace
     */
    getKeys(
        pattern: string,
        callback?: undefined,
        dontModify?: boolean,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetKeysCallback>>;
    /**
     * Get all state ids matching the given pattern
     *
     * @param pattern The pattern to match state ids against
     * @param callback Callback called with the matching keys
     * @param dontModify If true, the returned keys are not stripped of the namespace
     */
    getKeys(pattern: string, callback: ioBroker.GetKeysCallback, dontModify?: boolean): void;

    /**
     * Get all state ids matching the given pattern
     *
     * @param pattern The pattern to match state ids against
     * @param callback Optional callback called with the matching keys
     * @param dontModify If true, the returned keys are not stripped of the namespace
     */
    async getKeys(
        pattern: string,
        callback?: ioBroker.GetKeysCallback,
        dontModify?: boolean,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetKeysCallback> | void> {
        if (!pattern || typeof pattern !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid pattern ${JSON.stringify(pattern)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        let obj;
        try {
            obj = await this.client.keys(this.namespaceRedis + pattern);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
        this.settings.connection.enhancedLogging &&
            this.log.silly(`${this.namespace} redis keys ${obj.length} ${pattern}`);
        if (obj && !dontModify) {
            const len = this.namespaceRedisL;
            obj = obj.map(el => el.substring(len));
        }
        return tools.maybeCallbackWithError(callback, null, obj);
    }

    /**
     * Subscribe to state changes matching the given pattern
     *
     * @param pattern The pattern to subscribe to
     */
    subscribe(pattern: string): Promise<void>;
    /**
     * Subscribe to state changes matching the given pattern
     *
     * @param pattern The pattern to subscribe to
     * @param callback callback function
     */
    subscribe(pattern: string, callback: ioBroker.ErrorCallback): void;
    /**
     * Subscribe to state changes matching the given pattern
     *
     * @param pattern The pattern to subscribe to
     * @param asUser - if true it will be subscribed as user
     */
    subscribe(pattern: string, asUser: boolean): Promise<void>;
    /**
     * Subscribe to state changes matching the given pattern
     *
     * @param pattern The pattern to subscribe to
     * @param asUser - if true it will be subscribed as user
     * @param callback callback function
     */
    subscribe(pattern: string, asUser: boolean, callback: ioBroker.ErrorCallback): void;

    /**
     * @param pattern The pattern to subscribe to
     * @param asUser - if true it will be subscribed as user
     * @param callback callback function (optional)
     */
    async subscribe(
        pattern: string,
        asUser?: boolean | ioBroker.ErrorCallback,
        callback?: ioBroker.ErrorCallback,
    ): Promise<void> {
        if (!pattern || typeof pattern !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid pattern ${JSON.stringify(pattern)}`);
        }

        if (typeof asUser === 'function') {
            callback = asUser;
            asUser = false;
        }
        const subClient = asUser ? this.sub : this.subSystem;

        if (!subClient) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.settings.connection.enhancedLogging &&
            this.log.silly(`${this.namespace} redis psubscribe ${this.namespaceRedis}${pattern}`);
        try {
            await subClient.psubscribe(this.namespaceRedis + pattern);
            if (asUser) {
                this.userSubscriptions[this.namespaceRedis + pattern] = new RegExp(
                    tools.pattern2RegEx(this.namespaceRedis + pattern),
                );
            } else {
                this.systemSubscriptions[this.namespaceRedis + pattern] = new RegExp(
                    tools.pattern2RegEx(this.namespaceRedis + pattern),
                );
            }
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * Subscribe to state changes matching the given pattern as a user
     *
     * @param pattern The pattern to subscribe to
     */
    subscribeUser(pattern: string): Promise<void>;
    /**
     * Subscribe to state changes matching the given pattern as a user
     *
     * @param pattern The pattern to subscribe to
     * @param callback callback function
     */
    subscribeUser(pattern: string, callback: ioBroker.ErrorCallback): void;

    /**
     * Subscribe to state changes matching the given pattern as a user
     *
     * @param pattern The pattern to subscribe to
     * @param callback callback function (optional)
     */
    subscribeUser(pattern: string, callback?: ioBroker.ErrorCallback): Promise<void> | void {
        if (callback) {
            return this.subscribe(pattern, true, callback);
        }
        return this.subscribe(pattern, true);
    }

    /**
     * Unsubscribe from state changes matching the given pattern
     *
     * @param pattern The pattern to unsubscribe from
     */
    unsubscribe(pattern: string): Promise<void>;
    /**
     * Unsubscribe from state changes matching the given pattern
     *
     * @param pattern The pattern to unsubscribe from
     * @param callback callback function
     */
    unsubscribe(pattern: string, callback: ioBroker.ErrorCallback): void;
    /**
     * Unsubscribe from state changes matching the given pattern
     *
     * @param pattern The pattern to unsubscribe from
     * @param asUser - if true it will be unsubscribed as user
     */
    unsubscribe(pattern: string, asUser: boolean): Promise<void>;
    /**
     * Unsubscribe from state changes matching the given pattern
     *
     * @param pattern The pattern to unsubscribe from
     * @param asUser - if true it will be unsubscribed as user
     * @param callback callback function
     */
    unsubscribe(pattern: string, asUser: boolean, callback: ioBroker.ErrorCallback): void;
    /**
     * Unsubscribe pattern
     *
     * @param pattern The pattern to unsubscribe from
     * @param asUser - if true it will be unsubscribed as user
     * @param callback callback function (optional)
     */
    async unsubscribe(
        pattern: string,
        asUser?: boolean | ioBroker.ErrorCallback,
        callback?: ioBroker.ErrorCallback,
    ): Promise<void> {
        if (!pattern || typeof pattern !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid pattern ${JSON.stringify(pattern)}`);
        }
        if (typeof asUser === 'function') {
            callback = asUser;
            asUser = false;
        }
        const subClient = asUser ? this.sub : this.subSystem;

        if (!subClient) {
            return tools.maybeCallbackWithRedisError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.settings.connection.enhancedLogging &&
            this.log.silly(`${this.namespace} redis punsubscribe ${this.namespaceRedis}${pattern}`);
        try {
            await subClient.punsubscribe(this.namespaceRedis + pattern);
            if (asUser) {
                if (this.userSubscriptions[this.namespaceRedis + pattern] !== undefined) {
                    delete this.userSubscriptions[this.namespaceRedis + pattern];
                }
            } else {
                if (this.systemSubscriptions[this.namespaceRedis + pattern] !== undefined) {
                    delete this.systemSubscriptions[this.namespaceRedis + pattern];
                }
            }

            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * Unsubscribe from state changes matching the given pattern as a user
     *
     * @param pattern The pattern to unsubscribe from
     */
    unsubscribeUser(pattern: string): Promise<void>;
    /**
     * Unsubscribe from state changes matching the given pattern as a user
     *
     * @param pattern The pattern to unsubscribe from
     * @param callback callback function
     */
    unsubscribeUser(pattern: string, callback: ioBroker.ErrorCallback): void;

    /**
     * Unsubscribe from state changes matching the given pattern as a user
     *
     * @param pattern The pattern to unsubscribe from
     * @param callback callback function (optional)
     */
    unsubscribeUser(pattern: string, callback?: ioBroker.ErrorCallback): Promise<void> | void {
        if (callback) {
            return this.unsubscribe(pattern, true, callback);
        }
        return this.unsubscribe(pattern, true);
    }

    /**
     * Push a message into the message box of the given id
     *
     * @param id The id of the message box owner
     * @param message The message to push
     */
    async pushMessage(id: string, message: ioBroker.SendableMessage): Promise<void> {
        if (!id || typeof id !== 'string') {
            throw new Error(`invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        const fullMessage: ioBroker.Message = { ...message, _id: this.globalMessageId++ };

        if (this.globalMessageId >= 0xffffffff) {
            this.globalMessageId = 0;
        }

        await this.client.publish(this.namespaceMsg + id, JSON.stringify(fullMessage));
    }

    /**
     * Subscribe to messages sent to the given id
     *
     * @param id The id of the message box to subscribe to
     */
    subscribeMessage(id: string): Promise<void>;
    /**
     * Subscribe to messages sent to the given id
     *
     * @param id The id of the message box to subscribe to
     * @param callback callback function
     */
    subscribeMessage(id: string, callback: ioBroker.ErrorCallback): void;

    /**
     * Subscribe to messages sent to the given id
     *
     * @param id The id of the message box to subscribe to
     * @param callback callback function (optional)
     */
    async subscribeMessage(id: string, callback?: ioBroker.ErrorCallback): Promise<void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.subSystem) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (id.startsWith('.')) {
            id = id.substring(1);
        }
        this.settings.connection.enhancedLogging &&
            this.log.silly(`${this.namespace} redis subscribeMessage ${this.namespaceMsg}${id}`);
        try {
            await this.subSystem.psubscribe(this.namespaceMsg + id);
            this.systemSubscriptions[this.namespaceMsg + id] = true;
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * Unsubscribe from messages sent to the given id
     *
     * @param id The id of the message box to unsubscribe from
     */
    unsubscribeMessage(id: string): Promise<void>;
    /**
     * Unsubscribe from messages sent to the given id
     *
     * @param id The id of the message box to unsubscribe from
     * @param callback callback function
     */
    unsubscribeMessage(id: string, callback: ioBroker.ErrorCallback): void;

    /**
     * Unsubscribe from messages sent to the given id
     *
     * @param id The id of the message box to unsubscribe from
     * @param callback callback function (optional)
     */
    async unsubscribeMessage(id: string, callback?: ioBroker.ErrorCallback): Promise<void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.subSystem) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (id.startsWith('.')) {
            id = id.substring(1);
        }
        this.settings.connection.enhancedLogging &&
            this.log.silly(`${this.namespace} redis unsubscribeMessage ${this.namespaceMsg}${id}`);
        try {
            await this.subSystem.punsubscribe(this.namespaceMsg + id);
            if (this.systemSubscriptions[this.namespaceMsg + id] !== undefined) {
                delete this.systemSubscriptions[this.namespaceMsg + id];
            }
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * Push a log message to the given log target
     *
     * @param id The id of the log target
     * @param log The log message to push
     * @param callback Optional callback called with the generated log id
     */
    pushLog(id: string, log: LogMessageInternal): Promise<string>;
    /**
     * Push a log message to the given log target
     *
     * @param id The id of the log target
     * @param log The log message to push
     * @param callback Callback called with the generated log id
     */
    pushLog(id: string, log: LogMessageInternal, callback: (err: Error | undefined | null, id?: string) => void): void;

    /**
     * Push a log message to the given log target
     *
     * @param id The id of the log target
     * @param log The log message to push
     * @param callback Optional callback called with the generated log id
     */
    async pushLog(
        id: string,
        log: ioBroker.LogMessage,
        callback?: (err: Error | undefined | null, id?: string) => void,
    ): Promise<string | void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        log._id = this.globalLogId++;
        if (this.globalLogId >= 0xffffffff) {
            this.globalLogId = 0;
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            await this.client.publish(this.namespaceLog + id, JSON.stringify(log));
            return tools.maybeCallbackWithError(callback, null, id);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * Subscribe to log messages of the given id
     *
     * @param id The id of the log target to subscribe to
     */
    subscribeLog(id: string): Promise<void>;
    /**
     * Subscribe to log messages of the given id
     *
     * @param id The id of the log target to subscribe to
     * @param callback callback function
     */
    subscribeLog(id: string, callback: ioBroker.ErrorCallback): void;

    /**
     * Subscribe to log messages of the given id
     *
     * @param id The id of the log target to subscribe to
     * @param callback callback function (optional)
     */
    async subscribeLog(id: string, callback?: ioBroker.ErrorCallback): Promise<void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.subSystem) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.settings.connection.enhancedLogging &&
            this.log.silly(`${this.namespace} redis subscribeMessage ${this.namespaceLog}${id}`);
        try {
            await this.subSystem.psubscribe(this.namespaceLog + id);
            this.systemSubscriptions[this.namespaceLog + id] = true;
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * Unsubscribe from log messages of the given id
     *
     * @param id The id of the log target to unsubscribe from
     */
    unsubscribeLog(id: string): Promise<void>;
    /**
     * Unsubscribe from log messages of the given id
     *
     * @param id The id of the log target to unsubscribe from
     * @param callback callback function
     */
    unsubscribeLog(id: string, callback: ioBroker.ErrorCallback): void;

    /**
     * Unsubscribe from log messages of the given id
     *
     * @param id The id of the log target to unsubscribe from
     * @param callback callback function (optional)
     */
    async unsubscribeLog(id: string, callback?: ioBroker.ErrorCallback): Promise<void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.subSystem) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.settings.connection.enhancedLogging &&
            this.log.silly(`${this.namespace} redis unsubscribeMessage ${this.namespaceLog}${id}`);
        try {
            await this.subSystem.punsubscribe(this.namespaceLog + id);
            if (this.systemSubscriptions[this.namespaceLog + id] !== undefined) {
                delete this.systemSubscriptions[this.namespaceLog + id];
            }
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * Get a stored session by its id
     *
     * @param id The id of the session to read
     */
    getSession(id: string): Promise<ioBroker.Session | null>;
    /**
     * Get a stored session by its id
     *
     * @param id The id of the session to read
     * @param callback Called with the session object, or null if not found
     */
    getSession(id: string, callback: (err: Error | undefined | null, session?: ioBroker.Session | null) => void): void;

    // TODO: types session obj
    /**
     * Get a stored session by its id
     *
     * @param id The id of the session to read
     * @param callback Called with the session object, or null if not found
     */
    async getSession(
        id: string,
        callback?: (err: Error | undefined | null, session?: ioBroker.Session | null) => void,
    ): Promise<ioBroker.Session | null | void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        let obj;
        try {
            obj = await this.client.get(this.namespaceSession + id);
        } catch (e) {
            // A failed read is a database problem, not a missing session. Swallowing it here
            // turns every connection error into a silent "not logged in".
            return tools.maybeCallbackWithRedisError(callback, e);
        }

        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis get ${id} ${obj}`);
        try {
            obj = obj ? JSON.parse(obj) : null;
        } catch {
            this.log.warn(`${this.namespace} Cannot parse "${obj}"`);
            obj = null;
        }
        // The callback is node style, like the error paths above: passing the session as the
        // first argument would make every caller read it as the error and see no session.
        return tools.maybeCallbackWithError(callback, null, obj);
    }

    /**
     * Create or update a session and set its expiration
     *
     * @param id The id of the session
     * @param expireS Expiration time in seconds from now
     * @param obj The session data to store
     */
    setSession(id: string, expireS: number, obj: ioBroker.Session): Promise<void>;
    /**
     * Create or update a session and set its expiration
     *
     * @param id The id of the session
     * @param expireS Expiration time in seconds from now
     * @param obj The session data to store
     * @param callback callback function
     */
    setSession(id: string, expireS: number, obj: ioBroker.Session, callback: ioBroker.ErrorCallback): void;

    // TODO: types obj
    /**
     * Create or update a session and set its expiration
     *
     * @param id The id of the session
     * @param expireS Expiration time in seconds from now
     * @param obj The session data to store
     * @param callback callback function (optional)
     */
    async setSession(
        id: string,
        expireS: number,
        obj: ioBroker.Session,
        callback?: ioBroker.ErrorCallback,
    ): Promise<void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            await this.client.setex(this.namespaceSession + id, expireS, JSON.stringify(obj));
            if (this.settings.connection.enhancedLogging) {
                this.log.silly(`${this.namespace} redis setex ${id} ${expireS} ${JSON.stringify(obj)}`);
            }
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * Destroy (delete) a session by its id
     *
     * @param id The id of the session to destroy
     */
    destroySession(id: string): Promise<void>;
    /**
     * Destroy (delete) a session by its id
     *
     * @param id The id of the session to destroy
     * @param callback callback function
     */
    destroySession(id: string, callback: ioBroker.ErrorCallback): void;

    /**
     * Destroy (delete) a session by its id
     *
     * @param id The id of the session to destroy
     * @param callback callback function (optional)
     */
    async destroySession(id: string, callback?: ioBroker.ErrorCallback): Promise<void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        id = this.namespaceSession + id;
        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis del ${id}`);
        try {
            await this.client.del(id);
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

    /**
     * Returns the protocol version from DB
     *
     */
    getProtocolVersion(): Promise<string | null> {
        if (!this.client) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        return this.client.get(`${this.metaNamespace}states.protocolVersion`);
    }

    /**
     * Sets the protocol version to the DB
     *
     * @param version - protocol version
     */
    async setProtocolVersion(version: number): Promise<void> {
        if (!this.client) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        const versionStr = version.toString();
        // we can only set a protocol if we actually support it
        if (this.supportedProtocolVersions.includes(versionStr)) {
            await this.client.set(`${this.metaNamespace}states.protocolVersion`, versionStr);
            await this.client.publish(`${this.metaNamespace}states.protocolVersion`, versionStr);
        } else {
            throw new Error('Cannot set an unsupported protocol version on the current host');
        }
    }
}
