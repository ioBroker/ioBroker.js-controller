/**
 *      States DB in redis - Client
 *
 *      Copyright 2013-2024 bluefox <dogafox@gmail.com>
 *      Copyright 2013-2014 hobbyquaker
 *
 *      MIT License
 *
 */

import Redis from 'ioredis';
import { tools } from '@iobroker/db-base';
import { isDeepStrictEqual } from 'node:util';
import type { InternalLogger } from '@iobroker/js-controller-common-db/tools';
import type IORedis from 'ioredis';
import type { DbStatus, ConnectionOptions } from '@iobroker/db-base/inMemFileDB';

type JSONDecoderValue = Record<string, any>;

/**
 * Decodes a JSON with buffer value
 *
 * @param key
 * @param value
 */
function bufferJsonDecoder(key: string, value: JSONDecoderValue): Buffer | JSONDecoderValue {
    if (tools.isObject(value) && value.type === 'Buffer' && value.data && Array.isArray(value.data)) {
        return Buffer.from(value.data);
    }
    return value;
}

interface LogObject {
    /** id of the source instance */
    from: string;
    /** log level */
    severity: string;
    /** timestamp */
    ts: number;
    /** actual content */
    message: string;
}

interface InternalLogObject extends LogObject {
    /** internal id */
    _id: number;
}

type UserChangeFunction = (id: string, state: ioBroker.State | null) => void;
type ChangeFunction = (id: string, state: ioBroker.State | ioBroker.Message | null) => void;

export interface StatesSettings {
    connected?: () => void;
    disconnected?: () => void;
    changeUser?: UserChangeFunction;
    change?: ChangeFunction;
    connection: ConnectionOptions;
    autoConnect?: boolean;
    logger?: InternalLogger;
    hostname?: string;
    namespace?: string;
    metaNamespace?: string;
    namespaceSession?: string;
    namespaceLog?: string;
    namespaceMsg?: string;
    redisNamespace?: string;
}

export class StateRedisClient {
    private settings: StatesSettings;
    private readonly namespaceRedis: string;
    private readonly namespaceRedisL: number;
    namespaceMsg: string;
    private readonly namespaceLog: string;
    private readonly namespaceSession: string;
    private readonly metaNamespace: string;
    private globalMessageId: number;
    private globalLogId: number;
    private readonly namespace: string;
    private readonly supportedProtocolVersions: string[];
    private stop: boolean;
    private client: IORedis.Redis | null;
    /** Client for user events */
    private sub: IORedis.Redis | null;
    /** Client for system events */
    private subSystem: IORedis.Redis | null;
    private log: InternalLogger;
    private activeProtocolVersion?: string;
    private readonly userSubscriptions: Record<string, RegExp>;
    /** System level subscriptions value true means messagebox is subscribed */
    private readonly systemSubscriptions: Record<string, RegExp | true>;

    constructor(settings: StatesSettings) {
        this.settings = settings || {};
        this.namespaceRedis = `${this.settings.redisNamespace || 'io'}.`;
        this.namespaceRedisL = this.namespaceRedis.length;
        this.namespaceMsg = `${this.settings.namespaceMsg || 'messagebox'}.`;
        this.namespaceLog = `${this.settings.namespaceLog || 'log'}.`;
        this.namespaceSession = `${this.settings.namespaceSession || 'session'}.`;
        this.metaNamespace = `${this.settings.metaNamespace || 'meta'}.`;

        this.globalMessageId = Math.round(Math.random() * 100_000_000);
        this.globalLogId = Math.round(Math.random() * 100_000_000);
        this.namespace = this.settings.namespace || this.settings.hostname || '';

        this.supportedProtocolVersions = ['4'];

        this.stop = false;
        this.client = null;
        this.sub = null;
        this.subSystem = null;

        this.userSubscriptions = {};
        this.systemSubscriptions = {};

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

        let protoVersion;
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

    connectDb(): void {
        this.settings.connection = this.settings.connection || {};

        const onChange = this.settings.change; // on change handler
        const onChangeUser = this.settings.changeUser; // on change handler for User events

        let ready = false;
        let initError = false;
        let connected = false;
        let reconnectCounter = 0;
        let errorLogged = false;

        // limit max number of log entries in the list
        this.settings.connection.maxQueue = this.settings.connection.maxQueue || 1000;

        this.settings.connection.options = this.settings.connection.options || {};
        const retry_max_delay = this.settings.connection.options.retry_max_delay || 5000;
        const retry_max_count = this.settings.connection.options.retry_max_count || 19;
        this.settings.connection.options.retryStrategy = (reconnectCount: number) => {
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
                `${this.namespace} Redis States: Use Redis connection: ${this.settings.connection.options.host}:${this.settings.connection.options.port}`,
            );
        }
        if (this.settings.connection.options.db === undefined) {
            this.settings.connection.options.db = 0;
        }
        if (this.settings.connection.options.family === undefined) {
            this.settings.connection.options.family = 0;
        }
        this.settings.connection.options.password =
            this.settings.connection.options.auth_pass || this.settings.connection.pass || null;
        this.settings.connection.options.autoResubscribe = false; // We do our own resubscribe because other sometimes not work
        // REDIS does not allow whitespaces, we have some because of pid
        this.settings.connection.options.connectionName = this.namespace.replace(/\s/g, '');

        this.client = new Redis(this.settings.connection.options);

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
                        `${this.namespace} Could not connect to states database at ${this.settings.connection.options.host}:${this.settings.connection.options.port} (invalid protocol). Please make sure the configured IP and port points to a host running JS-Controller >= 2.0. and that the port is not occupied by other software!`,
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
                this.settings.disconnected();
            }
        });

        this.client.on('connect', () => {
            this.settings.connection.enhancedLogging &&
                this.log.silly(`${this.namespace} States-Redis Event connect (stop=${this.stop})`);
            connected = true;
            if (errorLogged) {
                this.log.info(`${this.namespace} Objects database successfully reconnected`);
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
                    `${this.namespace} The DB port  ${this.settings.connection.options.port} is occupied by something that is not a Redis protocol server. Please check other software running on this port or, if you use iobroker, make sure to update to js-controller 2.0 or higher!`,
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
                this.subSystem = new Redis(this.settings.connection.options);

                if (typeof onChange === 'function') {
                    this.subSystem.on('pmessage', (pattern, channel, message) => {
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

                            try {
                                message = message
                                    ? JSON.parse(message, message.includes('"Buffer"') ? bufferJsonDecoder : undefined)
                                    : null;
                            } catch {
                                this.log.warn(`${this.namespace} Cannot parse system pmessage "${message}"`);
                                message = null;
                            }

                            try {
                                if (channel.startsWith(this.namespaceRedis) && channel.length > this.namespaceRedisL) {
                                    onChange(channel.substring(this.namespaceRedisL), message);
                                } else {
                                    onChange(channel, message);
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

                    this.subSystem.on('reconnecting', reconnectCounter =>
                        this.log.silly(
                            `${this.namespace} PubSub client States-Redis System Event reconnect (reconnectCounter=${reconnectCounter}, stop=${this.stop})`,
                        ),
                    );
                }

                this.subSystem.on('ready', async _error => {
                    try {
                        this.subSystem &&
                            (await this.subSystem.subscribe(
                                `__keyevent@${this.settings.connection.options.db}__:expired`,
                            ));
                    } catch (e) {
                        this.log.warn(
                            `${this.namespace} Unable to subscribe to expiry Keyspace events from Redis Server: ${e.message}`,
                        );
                    }

                    try {
                        this.subSystem &&
                            (await this.subSystem.subscribe(
                                `__keyevent@${this.settings.connection.options.db}__:evicted`,
                            ));
                    } catch (e) {
                        this.log.warn(
                            `${this.namespace} Unable to subscribe to evicted Keyspace events from Redis Server: ${e.message}`,
                        );
                    }

                    // subscribe to meta changes
                    try {
                        this.subSystem && (await this.subSystem.psubscribe(`${this.metaNamespace}*`));
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
                        !ready && typeof this.settings.connected === 'function' && this.settings.connected();
                        ready = true;
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
                this.sub = new Redis(this.settings.connection.options);

                this.sub.on('pmessage', (pattern, channel, message) => {
                    setImmediate(() => {
                        this.log.silly(`${this.namespace} States user redis pmessage ${pattern}/${channel}:${message}`);

                        try {
                            message = message
                                ? JSON.parse(message, message.includes('"Buffer"') ? bufferJsonDecoder : undefined)
                                : null;
                        } catch {
                            this.log.warn(`${this.namespace} Cannot parse user pmessage "${message}"`);
                            message = null;
                        }

                        try {
                            if (channel.startsWith(this.namespaceRedis) && channel.length > this.namespaceRedisL) {
                                onChangeUser(channel.substring(this.namespaceRedisL), message);
                            } else {
                                onChangeUser(channel, message);
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

                    this.sub.on('reconnecting', reconnectCounter => {
                        this.log.silly(
                            `${this.namespace} PubSub client States-Redis User Event reconnect (reconnectCounter=${reconnectCounter}, stop=${this.stop})`,
                        );
                    });
                }

                this.sub.on('ready', async _error => {
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
        });
    }

    getStatus(): DbStatus {
        return { type: 'redis', server: false };
    }

    setState(id: string, state: ioBroker.SettableState | ioBroker.StateValue): Promise<string>;

    /** @deprecated migrate to promisified version (without callback) */
    setState(
        id: string,
        state: ioBroker.SettableState | ioBroker.StateValue,
        callback: (err: Error | null | undefined, id: string) => void,
    ): Promise<void>;

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

        if (state.ts !== undefined) {
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

        if (state.lc !== undefined) {
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

        // set object in redis
        if (expire) {
            try {
                await this.client.setex(this.namespaceRedis + id, expire, objString);
                // publish event in redis
                this.settings.connection.enhancedLogging &&
                    this.log.silly(`${this.namespace} redis publish ${this.namespaceRedis}${id} ${objString}`);
                await this.client.publish(this.namespaceRedis + id, objString);
                return tools.maybeCallbackWithError(callback, null, id);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e, id);
            }
        } else {
            try {
                await this.client.set(this.namespaceRedis + id, objString);
                // publish event in redis
                this.settings.connection.enhancedLogging &&
                    this.log.silly(`${this.namespace} redis publish ${this.namespaceRedis}${id} ${objString}`);
                await this.client.publish(this.namespaceRedis + id, objString);
                return tools.maybeCallbackWithError(callback, null, id);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e, id);
            }
        }
    }

    /**
     * Promise-version of setState
     *
     * @param id
     * @param state
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

    // Used for restore function (do not call it)
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

    getState(id: string): ioBroker.GetStatePromise;
    getState(
        id: string,
        callback?: (err: Error | null | undefined, state?: ioBroker.State | null) => void,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetStateCallback> | void>;

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
     * @param id
     */
    getStateAsync(id: string): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetStateCallback> | void> {
        return this.getState(id);
    }

    getStates(keys: string[], callback?: undefined, dontModify?: boolean): Promise<(ioBroker.State | null)[]>;
    getStates(
        keys: string[],
        callback: (err: Error | undefined | null, states?: (ioBroker.State | null)[]) => void,
        dontModify?: boolean,
    ): Promise<void>;
    getStates(
        keys: string[],
        callback: (err: Error | undefined | null, states?: (ioBroker.State | null)[]) => void,
        dontModify?: boolean,
    ): Promise<void>;

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

    // Destructor of the class. Called by shutting down.
    async destroy(): Promise<void> {
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

    getKeys(
        pattern: string,
        callback?: undefined,
        dontModify?: boolean,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetKeysCallback>>;
    getKeys(pattern: string, callback: ioBroker.GetKeysCallback, dontModify?: boolean): Promise<void>;

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

    async subscribe(pattern: string, callback?: ioBroker.ErrorCallback): Promise<void>;
    async subscribe(pattern: string, asUser: boolean, callback?: ioBroker.ErrorCallback): Promise<void>;

    /**
     * @param pattern
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
     * @param pattern
     * @param callback callback function (optional)
     */
    subscribeUser(pattern: string, callback?: ioBroker.ErrorCallback): Promise<void> {
        return this.subscribe(pattern, true, callback);
    }

    async unsubscribe(pattern: string, asUser: boolean, callback?: ioBroker.ErrorCallback): Promise<void>;
    async unsubscribe(pattern: string, callback?: ioBroker.ErrorCallback): Promise<void>;
    /**
     * Unsubscribe pattern
     *
     * @param pattern
     * @param asUser - if true it will be unsubscribed as user
     * @param callback
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
     * @param pattern
     * @param callback callback function (optional)
     */
    unsubscribeUser(pattern: string, callback?: ioBroker.ErrorCallback): Promise<void> {
        return this.unsubscribe(pattern, true, callback);
    }

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

    async pushLog(
        id: string,
        log: LogObject,
        callback?: (err: Error | undefined | null, id?: string) => void,
    ): Promise<string | void>;

    // implementation uses an modified pushLog with internal _id
    async pushLog(
        id: string,
        log: InternalLogObject,
        callback?: (err: Error | undefined | null, id?: string) => void,
    ): Promise<string | void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        log._id = this.globalLogId++;
        if (this.globalLogId >= 0xffffffff) {
            this.globalLogId = 0;
        }

        if (this.client) {
            try {
                await this.client.publish(this.namespaceLog + id, JSON.stringify(log));
                return tools.maybeCallbackWithError(callback, null, id);
            } catch (e) {
                return tools.maybeCallbackWithRedisError(callback, e);
            }
        }
    }

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

    // TODO: types session obj
    async getSession(
        id: string,
        callback: (err: Error | undefined | null, session?: Record<string, any> | null) => void,
    ): Promise<Record<string, any> | null | void> {
        if (!id || typeof id !== 'string') {
            return tools.maybeCallbackWithError(callback, `invalid id ${JSON.stringify(id)}`);
        }

        if (!this.client) {
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        let obj;
        try {
            obj = await this.client.get(this.namespaceSession + id);
        } catch {
            // ignore
        }

        this.settings.connection.enhancedLogging && this.log.silly(`${this.namespace} redis get ${id} ${obj}`);
        try {
            obj = obj ? JSON.parse(obj) : null;
        } catch {
            this.log.warn(`${this.namespace} Cannot parse "${obj}"`);
            obj = null;
        }
        return tools.maybeCallback(callback, obj);
    }

    // TODO: types obj
    async setSession(
        id: string,
        expireS: number,
        obj: Record<string, any>,
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
            this.settings.connection.enhancedLogging &&
                this.log.silly(`${this.namespace} redis setex ${id} ${expireS} ${JSON.stringify(obj)}`);
            return tools.maybeCallback(callback);
        } catch (e) {
            return tools.maybeCallbackWithRedisError(callback, e);
        }
    }

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
