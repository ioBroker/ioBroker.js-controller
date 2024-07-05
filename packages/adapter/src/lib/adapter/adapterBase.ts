import net from 'node:net';
import fs from 'fs-extra';
import os from 'node:os';
import jwt from 'jsonwebtoken';
import { EventEmitter } from 'node:events';
import pidUsage from 'pidusage';
import deepClone from 'deep-clone';
import { PluginHandler } from '@iobroker/plugin-base';
import semver from 'semver';
import path from 'node:path';
import {
    getObjectsConstructor,
    getStatesConstructor,
    tools,
    EXIT_CODES,
    password,
    logger
} from '@iobroker/js-controller-common';
import {
    decryptArray,
    encryptArray,
    getSupportedFeatures,
    isMessageboxSupported,
    getAdapterScopedPackageIdentifier,
    listInstalledNodeModules
} from '@/lib/adapter/utils.js';
// @ts-expect-error no ts file
import extend from 'node.extend';
import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type Winston from 'winston';
import type NodeSchedule from 'node-schedule';
import yargs from 'yargs/yargs';

// local version is always the same as controller version, since lerna exact: true is used
import packJson from '@iobroker/js-controller-adapter/package.json' assert { type: 'json' };

const controllerVersion = packJson.version;

import { Log } from '@/lib/adapter/log.js';
import { Validator } from './validator.js';

const { FORBIDDEN_CHARS } = tools;
import {
    DEFAULT_SECRET,
    ALIAS_STARTS_WITH,
    SYSTEM_ADMIN_USER,
    SYSTEM_ADMIN_GROUP,
    ERROR_PERMISSION,
    ACCESS_EVERY_READ,
    ACCESS_EVERY_WRITE,
    ACCESS_GROUP_WRITE,
    ACCESS_GROUP_READ,
    ACCESS_USER_WRITE,
    ACCESS_USER_READ,
    NO_PROTECT_ADAPTERS,
    STATE_QUALITY,
    type SupportedFeature
} from '@/lib/adapter/constants.js';
import type { PluginHandlerSettings } from '@iobroker/plugin-base/types';
import type {
    AdapterOptions,
    AliasDetails,
    CalculatePermissionsCallback,
    CheckGroupCallback,
    CheckPasswordCallback,
    CheckStateCommand,
    CommandsPermissions,
    GetCertificatesCallback,
    GetEncryptedConfigCallback,
    GetUserGroupsOptions,
    InternalAddChannelToEnumOptions,
    InternalAddStateToEnumOptions,
    InternalCalculatePermissionsOptions,
    InternalCheckGroupOptions,
    InternalCheckPasswordOptions,
    InternalCreateDeviceOptions,
    InternalCreateStateOptions,
    InternalDeleteChannelFromEnumOptions,
    InternalDeleteChannelOptions,
    InternalDeleteDeviceOptions,
    InternalDeleteStateFromEnumOptions,
    InternalDeleteStateOptions,
    InternalDelObjectOptions,
    InternalDelStateOptions,
    InternalDestroySessionOptions,
    InternalFormatDateOptions,
    InternalGetAdapterObjectsOptions,
    InternalGetCertificatesOptions,
    InternalGetChannelsOfOptions,
    InternalGetDevicesOptions,
    InternalGetEncryptedConfigOptions,
    InternalGetEnumOptions,
    InternalGetEnumsOptions,
    InternalGetHistoryOptions,
    InternalGetObjectOptions,
    InternalGetObjectsOptions,
    InternalGetObjectViewOptions,
    InternalGetPortOptions,
    InternalGetSessionOptions,
    InternalGetStateOptions,
    InternalGetStatesOfOptions,
    InternalGetStatesOptions,
    InternalGetUserIDOptions,
    InternalSendToHostOptions,
    InternalSendToOptions,
    InternalSetObjectOptions,
    InternalSetPasswordOptions,
    InternalSetSessionOptions,
    InternalSetStateChangedOptions,
    InternalSetStateOptions,
    InternalSubscribeOptions,
    InternalUpdateConfigOptions,
    TimeoutCallback,
    MaybePromise,
    SetStateChangedResult,
    CheckStatesResult,
    Pattern,
    MessageCallbackObject,
    SendToOptions,
    GetCertificatesPromiseReturnType,
    InternalAdapterConfig,
    UserInterfaceClientRemoveMessage,
    SendToUserInterfaceClientOptions,
    AllPropsUnknown,
    IoPackageInstanceObject,
    AliasTargetEntry,
    InternalReportDeprecationOption,
    SuitableLicense,
    InstallNodeModuleOptions,
    InternalInstallNodeModuleOptions,
    StopParameters,
    InternalStopParameters
} from '@/lib/_Types.js';
import { UserInterfaceMessagingController } from '@/lib/adapter/userInterfaceMessagingController.js';
import { SYSTEM_ADAPTER_PREFIX } from '@iobroker/js-controller-common-db/constants';
import type { CommandResult } from '@alcalzone/pak';

import * as url from 'node:url';
// eslint-disable-next-line unicorn/prefer-module
tools.ensureDNSOrder();

/**
 * Here we define dynamically created methods
 */
export interface AdapterBase {
    // Cannot move the next 3 functions into appropriate classes. Linter will complain about it.
    on(event: 'stateChange', listener: ioBroker.StateChangeHandler): this;
    on(event: 'fileChange', listener: ioBroker.FileChangeHandler): this;
    on(event: 'objectChange', listener: ioBroker.ObjectChangeHandler): this;

    on(event: 'ready', listener: ioBroker.ReadyHandler): this;
    on(event: 'install', listener: ioBroker.ReadyHandler): this;
    on(event: 'unload', listener: ioBroker.UnloadHandler): this;
    on(event: 'message', listener: ioBroker.MessageHandler): this;
    /** Only emitted for compact instances */
    on(event: 'exit', listener: (exitCode: number, reason: string) => Promise<void> | void): this;
    on(event: 'log', listener: (info: any) => Promise<void> | void): this;
    /** Set the capabilities of the given executable. Only works on Linux systems. */
    setExecutableCapabilities(
        execPath: string,
        capabilities: string[],
        modeEffective?: boolean,
        modePermitted?: boolean,
        modeInherited?: boolean
    ): Promise<void>;
     /**
     * Helper function that looks for the first free TCP port starting with the given one.
     */
    getPortAsync(port: number): Promise<number>;
 }

// EventEmitter => AdapterBase => AdapterObject => AdapterState => AdapterFile => Adapter
export abstract class AdapterBase extends EventEmitter {
    protected static thisDir: string = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));
    /** Cache of all deprecations which have already been transmitted */
    private reportedDeprecations = new Set<string>();
     /** Contents of iobroker.json */
    protected readonly _config: Record<string, any>;
    protected readonly _options: AdapterOptions;
    protected readonly startedInCompactMode: boolean;
    protected readonly aliases = new Map<string, AliasDetails>();
    protected readonly aliasPatterns = new Set<string>();
    protected eventLoopLags: number[] = [];
    protected overwriteLogLevel: boolean = false;
    adapterReady: boolean = false;
    /** Callbacks from sendTo */
    protected readonly messageCallbacks = new Map<number, MessageCallbackObject>();
    protected _stopInProgress: boolean = false;
    protected _callbackId: number = 1;
    protected _firstConnection: boolean = true;
    protected readonly _timers = new Set<NodeJS.Timeout>();
    protected readonly _intervals = new Set<NodeJS.Timeout>();
    protected readonly _delays = new Set<NodeJS.Timeout>();
    performStrictObjectChecks: boolean;
    protected _restartScheduleJob: any;
    protected _schedule?: typeof NodeSchedule;
    namespace: `${string}.${number}`;
    name: string;
    protected _systemSecret?: string;
    /** Whether the adapter has already terminated */
    protected terminated: boolean = false;
    /** The cache of usernames */
    protected usernames: Record<string, { id: string }> = {};
    /** A RegExp to test for forbidden chars in object IDs */
    readonly FORBIDDEN_CHARS: RegExp = FORBIDDEN_CHARS;
    protected inputCount: number = 0;
    protected outputCount: number = 0;
    /** An array of instances, that support auto subscribe */
    protected autoSubscribe: string[] = [];
    protected pluginHandler?: InstanceType<typeof PluginHandler>;
    protected _reportInterval?: null | NodeJS.Timeout;
    protected getPortRunning: null | InternalGetPortOptions = null;
    protected readonly _namespaceRegExp: RegExp;
    instance?: number;
    // @ts-expect-error decide how to handle it
    protected _utils: Validator;
    /** contents of io-package.json */
    adapterConfig?: AdapterOptions | ioBroker.InstanceObject | null;
    connected?: boolean;
    adapterDir: string;
    /** contents of package.json */
    pack?: Record<string, any>;
    /** contents of io-package.json */
    ioPack: Record<string, any>; // contents of io-package.json TODO difference to adapterConfig?
    protected inited?: boolean;
    /** contents of iobroker.json if required via AdapterOptions */
    systemConfig?: ioBroker.SystemConfigCommon;
    /** the configured date format of system.config, only available if requested via AdapterOptions `useFormatDate` */
    dateFormat?: any;
    /** if float comma instead of dot is used, only available if requested via AdapterOptions `useFormatDate` */
    isFloatComma?: boolean;
    /** configured language of system.config, only available if requested via AdapterOptions `useFormatDate` */
    language?: ioBroker.Languages;
    /** longitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`*/
    longitude?: string;
    /** latitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`*/
    latitude?: string;
    protected _defaultObjs?: Record<string, Partial<ioBroker.StateCommon>>;
    protected _aliasObjectsSubscribed?: boolean;
    config: ioBroker.AdapterConfig = {};
    host?: string;
    common?: ioBroker.InstanceCommon;
    protected mboxSubscribed?: boolean;
    /** Stop the adapter */
    stop?: (params?: StopParameters) => Promise<void>;
    version?: string;
    /** Stop the adapter only defined in compact, not for external usage */
    protected kill?: () => Promise<void>;
    protected patterns?: Record<string, { regex: string }>;
    protected statesConnectedTime?: number;
    /** Constants for frequent use in adapters */
    readonly constants = {
        STATE_QUALITY
    } as const;

    /** Controller for messaging related functionality */
    protected readonly uiMessagingController: UserInterfaceMessagingController;

    /** List of instances which want our logs */
    protected readonly logList = new Set<string>();
    /** For ease of use, the log property is always defined. However, it is only available after `ready` has been called. */
    log!: Log;
    protected namespaceLog: string = '';
    processLog?: (msg: any) => void;
    protected readonly _logger: Winston.Logger;
    /**
     * Start or stop subscribing to log messages
     * The method is only available if logTransporter is active via io-pack or adapter options
     * Note, that stopping will stop after 10 seconds, not immediately
     *
     * @param isActive - if log subscription should be activated or deactivated
     * @param options - options passed to setState e.g. user permissions
     */
    requireLog?: (isActive: boolean, options?: Partial<GetUserGroupsOptions>) => Promise<void> | void;
    protected logOffTimer?: NodeJS.Timeout | null;
    protected logRequired?: boolean;

    /** Instance to access objects DB */
    protected objects?: ObjectsInRedisClient | null;
    /** Instance to access states DB */
    protected states?: StatesInRedisClient | null;

    protected constructor(options: AdapterOptions | string) {
        super();

        // enable "const adapter = require(__dirname + '/../../lib/adapter.js')('adapterName');" call
        if (typeof options === 'string') {
            this._options = { name: options };
        } else {
            this._options = options;
        }

        const configFileName = tools.getConfigFileName();

        if (fs.pathExistsSync(configFileName)) {
            this._config = fs.readJsonSync(configFileName);
            this._config.states = this._config.states || { type: 'jsonl' };
            this._config.objects = this._config.objects || { type: 'jsonl' };
            // Make sure the DB has enough time (5s). JsonL can take a bit longer if the process just crashed before
            // because the lockfile might not have been freed.
            this._config.states.connectTimeout = Math.max(this._config.states.connectTimeout || 0, 5_000);
            this._config.objects.connectTimeout = Math.max(this._config.objects.connectTimeout || 0, 5_000);
        } else {
            throw new Error(`Cannot find ${configFileName}`);
        }

        if (!this._options) {
            throw new Error('Configuration not set!');
        }

        if (this._options.config && !this._options.config.log) {
            this._options.config.log = this._config.log;
        }

        this._config = this._options.config || this._config;
        this.startedInCompactMode = !!this._options.compact;

        const parsedArgs = yargs(process.argv.slice(2))
            .options({
                loglevel: {
                    describe: 'Define adapter log level',
                    type: 'string'
                },
                silent: {
                    describe: 'If is install run',
                    type: 'boolean'
                },
                install: {
                    describe: 'If is install run',
                    type: 'boolean'
                },
                logs: {
                    describe: 'If console output desired',
                    type: 'boolean'
                },
                console: {
                    describe: 'If console output desired',
                    type: 'boolean'
                },
                force: {
                    describe: 'If force start even if disabled',
                    type: 'boolean'
                },
                debug: {
                    describe: 'Same as --force combined with --console',
                    type: 'boolean'
                },
                instance: {
                    describe: 'Instance id, e.g. 0',
                    type: 'string'
                }
            })
            .parseSync();

        if (parsedArgs.loglevel && ['info', 'debug', 'error', 'warn', 'silly'].includes(parsedArgs.loglevel)) {
            this._config.log.level = parsedArgs.loglevel;
            this.overwriteLogLevel = true;
        }

        if (parsedArgs.silent || parsedArgs.install) {
            this._config.isInstall = true;
        }

        if (parsedArgs.logs || parsedArgs.console) {
            this._config.consoleOutput = true;
        }

        if (parsedArgs.force) {
            this._config.forceIfDisabled = true;
        }

        if (parsedArgs.debug) {
            this._config.forceIfDisabled = true;
            this._config.consoleOutput = true;
            if (this._config.log.level !== 'silly') {
                this._config.log.level = 'debug';
                this.overwriteLogLevel = true;
            }
        }

        if (parsedArgs.instance && parseInt(parsedArgs.instance, 10).toString() === parsedArgs.instance) {
            this._config.instance = parseInt(parsedArgs.instance, 10);
        }

        this._config.log.level = this._config.log.level || 'info';

        this._config.log.noStdout = !this._config.consoleOutput;

        this.performStrictObjectChecks = this._options.strictObjectChecks !== false;

        this.name = this._options.name;

        if (!this.name) {
            throw new Error('No name of adapter!');
        }

        const instance = parseInt(
            this._options.compactInstance !== undefined
                ? this._options.compactInstance
                : this._options.instance !== undefined
                    ? this._options.instance
                    : this._config.instance || 0,
            10
        );

        this.namespace = `${this.name}.${instance}`;
        this.namespaceLog = this.namespace + (this.startedInCompactMode ? ' (COMPACT)' : ` (${process.pid})`);
        this._namespaceRegExp = new RegExp(`^${`${this.namespace}.`.replace(/\./g, '\\.')}`); // cache the regex object 'adapter.0.'

        this._logger = logger(this._config.log);

        // compatibility
        if (!this._logger.silly) {
            this._logger.silly = this._logger.debug;
        }

        // If installed as npm module
        if (this._options.dirname) {
            this.adapterDir = this._options.dirname.replace(/\\/g, '/');
        } else {
            const adapterDir = tools.getAdapterDir(this.name);

            if (!adapterDir) {
                this._logger.error(`${this.namespaceLog} Cannot find directory of adapter ${this.name}`);
                this.terminate(EXIT_CODES.CANNOT_FIND_ADAPTER_DIR);
            }

            this.adapterDir = adapterDir as string;
        }

        if (fs.existsSync(`${this.adapterDir}/io-package.json`)) {
            this.ioPack = fs.readJSONSync(`${this.adapterDir}/io-package.json`);
        } else {
            this._logger.error(`${this.namespaceLog} Cannot find: ${this.adapterDir}/io-package.json`);
            this.terminate(EXIT_CODES.CANNOT_FIND_ADAPTER_DIR);
        }

        this.uiMessagingController = new UserInterfaceMessagingController({
            adapter: this,
            subscribeCallback: this._options.uiClientSubscribe,
            unsubscribeCallback: this._options.uiClientUnsubscribe
        });

        // Create dynamic methods
        /**
         * Promise-version of `Adapter.getPort`
         */
        this.getPortAsync = tools.promisifyNoError(this.getPort, this);

        this.setExecutableCapabilities = tools.setExecutableCapabilities;
    }

    installNodeModule(moduleName: string, options: InstallNodeModuleOptions): Promise<CommandResult>;

    /**
     * Install specified npm module
     *
     * @param moduleName name of the node module
     * @param options version information
     */
    installNodeModule(moduleName: string, options: InstallNodeModuleOptions): Promise<CommandResult> {
        Validator.assertString(moduleName, 'moduleName');
        Validator.assertObject<InstallNodeModuleOptions>(options, 'options');

        return this._installNodeModule({ ...options, moduleName });
    }

    private _installNodeModule(options: InternalInstallNodeModuleOptions): Promise<CommandResult> {
        const { moduleName, version } = options;

        const internalModuleName = getAdapterScopedPackageIdentifier({ moduleName, namespace: this.namespace });
        return tools.installNodeModule(`${internalModuleName}@npm:${moduleName}@${version}`);
    }

    /**
     * List all additional installed node modules from this adapter
     */
    listInstalledNodeModules(): Promise<string[]> {
        return listInstalledNodeModules(this.namespace);
    }

    uninstallNodeModule(moduleName: string): Promise<CommandResult>;

    /**
     * Uninstall specified npm module
     *
     * @param moduleName name of the node module
     */
    uninstallNodeModule(moduleName: string): Promise<CommandResult> {
        Validator.assertString(moduleName, 'moduleName');

        const internalModuleName = getAdapterScopedPackageIdentifier({ moduleName, namespace: this.namespace });
        return tools.uninstallNodeModule(internalModuleName);
    }

    importNodeModule(moduleName: string): Promise<unknown>;

    /**
     * Import a node module which has been installed via `installNodeModule`
     *
     * @param moduleName name of the node module
     * @returns the required node module
     */
    importNodeModule(moduleName: string): Promise<unknown> {
        Validator.assertString(moduleName, 'moduleName');

        const internalModuleName = getAdapterScopedPackageIdentifier({ moduleName, namespace: this.namespace });
        // TODO: if https://github.com/microsoft/TypeScript/issues/54022 ever gets resolved, we should improve the return type
        return import(internalModuleName);
    }

    /**
     * Decrypt the password/value with a given key
     */
    decrypt(
        /** to use for decrypt (or value if only one parameter is given) */
        secretVal: string,
        /** value to decrypt (if secret is provided) */
        value?: string
    ): string {
        if (value === undefined) {
            value = secretVal;
            secretVal = this._systemSecret as string;
        }

        Validator.assertString(secretVal, 'secretVal');
        Validator.assertString(value, 'value');

        return tools.decrypt(secretVal, value);
    }

    /**
     * Encrypt the password/value with a given key
     */
    encrypt(
        /** to use for encrypting (or value if only one parameter is given) */
        secretVal: string,
        /** value to encrypt (if secret is provided) */
        value?: string
    ): string {
        if (value === undefined) {
            value = secretVal;
            secretVal = this._systemSecret as string;
        }

        Validator.assertString(secretVal, 'secretVal');
        Validator.assertString(value, 'value');

        return tools.encrypt(secretVal, value);
    }

    /**
     * Helper function to find the next free port
     *
     * It looks for the first free TCP port starting with given one:
     * ```js
     *     adapter.getPort(8081, function (port) {
     *         adapter.log.debug('Following port is free: ' + port);
     *     });
     * ```
     *
     * @param port port number to start the search for free port
     * @param [host] optional hostname for the port search
     * @param callback return result
     *        ```js
     *        function (port) {}
     *        ```
     */
    getPort(
        /** port number to start the search for free port */
        port: number,
        /** optional hostname for the port search */
        host: string | ((port: number) => void),
        callback?: (port: number) => void
    ): void {
        if (!port) {
            throw new Error('adapterGetPort: no port');
        }

        if (typeof port === 'string') {
            port = parseInt(port, 10);
        }
        let _host: string | undefined;
        if (typeof host === 'function') {
            callback = host;
        } else {
            Validator.assertString(host, 'host');
            _host = host;
        }

        Validator.assertNumber(port, 'port');
        Validator.assertOptionalCallback(callback, 'callback');

        return this._getPort({ port, host: _host, callback });
    }

    private _getPort(options: InternalGetPortOptions): void {
        this.getPortRunning = options;
        const server = net.createServer();
        try {
            server.listen({ port: options.port, host: options.host }, () => {
                server.once('close', () => {
                    return tools.maybeCallback(options.callback, options.port);
                });
                server.close();
            });
            server.on('error', () => {
                setTimeout(() => this.getPort(options.port + 1, options.host as string, options.callback), 100);
            });
        } catch {
            setImmediate(() => this.getPort(options.port + 1, options.host as string, options.callback));
        }
    }

    abstract registerNotification<Scope extends keyof ioBroker.NotificationScopes>(
        scope: Scope,
        category: ioBroker.NotificationScopes[Scope] | null,
        message: string
    ): Promise<void>;

    protected async _exceptionHandler(err: NodeJS.ErrnoException, isUnhandledRejection?: boolean): Promise<void> {
        // If the adapter has a callback to listen for unhandled errors
        // give it a chance to handle the error itself instead of restarting it
        if (typeof this._options.error === 'function') {
            try {
                // if the error handler in the adapter returned exactly true,
                // we expect the error to be handled and do nothing more
                const wasHandled = this._options.error(err);
                if (wasHandled === true) {
                    return;
                }
            } catch (e) {
                console.error(`Error in adapter error handler: ${e.message}`);
            }
        }

        // catch it on Windows
        if (this.getPortRunning && err?.message === 'listen EADDRINUSE') {
            const { host, port, callback } = this.getPortRunning;
            this._logger.warn(
                `${this.namespaceLog} Port ${port}${host ? ` for host ${host}` : ''} is in use. Get next`
            );

            setImmediate(() => this.getPort(port + 1, host as string, callback));
            return;
        }

        if (isUnhandledRejection) {
            this._logger.error(
                `${this.namespaceLog} Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().`
            );
        }
        this._logger.error(
            `${this.namespaceLog} ${isUnhandledRejection ? 'unhandled promise rejection' : 'uncaught exception'}: ${
                err ? err.message : err
            }`
        );
        if (err && err.stack) {
            this._logger.error(`${this.namespaceLog} ${err.stack}`);
        }

        if (err) {
            const message = err.code ? `Exception-Code: ${err.code}: ${err.message}` : err.message;
            this._logger.error(`${this.namespaceLog} ${message}`);
            try {
                await this.registerNotification('system', null, message);
            } catch {
                // ignore
            }
        }

        try {
            this._stop({
                isPause: false,
                isScheduled: false,
                exitCode: EXIT_CODES.UNCAUGHT_EXCEPTION,
                updateAliveState: false
            });
            setTimeout(() => this.terminate(EXIT_CODES.UNCAUGHT_EXCEPTION), 1_000);
        } catch (err) {
            this._logger.error(`${this.namespaceLog} exception by stop: ${err ? err.message : err}`);
        }
    }

    /**
     * Add given id to log redirect list
     *
     * @param isActive if id should be added or removed
     * @param id the id to add
     */
    protected logRedirect(isActive: boolean, id: string): void {
        // ignore itself
        if (id === `system.adapter.${this.namespace}`) {
            return;
        }

        if (isActive) {
            if (!this.logList.has(id)) {
                this.logList.add(id);
            }
        } else {
            this.logList.delete(id);
        }
    }

    abstract terminate(reason?: string | number, exitCode?: number): void;
    protected abstract _stop(options: InternalStopParameters): Promise<void>;
}
