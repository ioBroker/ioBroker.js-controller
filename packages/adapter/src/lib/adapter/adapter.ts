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
    logger,
    isInstalledFromNpm,
} from '@iobroker/js-controller-common';
import {
    decryptArray,
    encryptArray,
    getSupportedFeatures,
    isMessageboxSupported,
    getAdapterScopedPackageIdentifier,
    listInstalledNodeModules,
    requestModuleNameByUrl,
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
    type SupportedFeature,
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
    InternalStopParameters,
    NotificationOptions,
} from '@/lib/_Types.js';
import { UserInterfaceMessagingController } from '@/lib/adapter/userInterfaceMessagingController.js';
import { SYSTEM_ADAPTER_PREFIX } from '@iobroker/js-controller-common-db/constants';
import type { CommandResult } from '@alcalzone/pak';

import * as url from 'node:url';
// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));
tools.ensureDNSOrder();

/**
 * Here we define dynamically created methods
 */
export interface AdapterClass {
    on(event: 'stateChange', listener: ioBroker.StateChangeHandler): this;
    on(event: 'objectChange', listener: ioBroker.ObjectChangeHandler): this;
    on(event: 'fileChange', listener: ioBroker.FileChangeHandler): this;
    on(event: 'ready', listener: ioBroker.ReadyHandler): this;
    on(event: 'install', listener: ioBroker.ReadyHandler): this;
    on(event: 'unload', listener: ioBroker.UnloadHandler): this;
    on(event: 'message', listener: ioBroker.MessageHandler): this;
    /** Only emitted for compact instances */
    on(event: 'exit', listener: (exitCode: number, reason: string) => Promise<void> | void): this;
    on(event: 'log', listener: (info: any) => Promise<void> | void): this;
    /**
     * Extend an object and create it if it might not exist
     *
     * @deprecated use `adapter.extendObject` without callback instead
     */
    extendObjectAsync(
        id: string,
        objPart: ioBroker.PartialObject,
        options?: ioBroker.ExtendObjectOptions,
    ): ioBroker.SetObjectPromise;
    /** Set capabilities of the given executable. Only works on Linux systems. */
    setExecutableCapabilities(
        execPath: string,
        capabilities: string[],
        modeEffective?: boolean,
        modePermitted?: boolean,
        modeInherited?: boolean,
    ): Promise<void>;
    /** Extend an object (which might not belong to this adapter) and create it if it might not exist */
    extendForeignObjectAsync<T extends string>(
        id: T,
        objPart: ioBroker.PartialObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options?: ioBroker.ExtendObjectOptions,
    ): ioBroker.SetObjectPromise;
    /** Reads an object from the object db */
    getObjectAsync(id: string, options?: unknown): ioBroker.GetObjectPromise;
    /**
     * Query a predefined object view (similar to SQL stored procedures) and return the results
     * For a detailed description refer to https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#object-fields
     * or http://guide.couchdb.org/editions/1/en/views.html
     */
    getObjectViewAsync<Design extends string = string, Search extends string = string>(
        design: Design,
        search: Search,
        params: ioBroker.GetObjectViewParams | null | undefined,
        options?: unknown,
    ): ioBroker.GetObjectViewPromise<ioBroker.InferGetObjectViewItemType<Design, Search>>;
    /** Returns a list of objects with id between params.startkey and params.endkey */
    getObjectListAsync(
        params: ioBroker.GetObjectListParams | null,
        options?: { sorted?: boolean } | Record<string, any>,
    ): ioBroker.GetObjectListPromise;
    /** Returns the enum tree, filtered by the optional enum name */
    getEnumAsync(name: string, options?: unknown): Promise<{ result: Record<string, any>; requestEnum: string }>;
    /** Returns the enum tree, filtered by the optional enum name */
    getEnumsAsync(enumList?: ioBroker.EnumList, options?: unknown): ioBroker.GetEnumsPromise;
    /** Deletes an object from the object db */
    delObjectAsync(id: string, options?: ioBroker.DelObjectOptions): Promise<void>;
    /** Deletes an object (which might not belong to this adapter) from the object db */
    delForeignObjectAsync(id: string, options?: ioBroker.DelObjectOptions): Promise<void>;
    /** Subscribe to changes of objects in this instance */
    subscribeObjectsAsync(pattern: string, options?: unknown): Promise<void>;
    /** Unsubscribe from changes of objects in this instance */
    unsubscribeObjectsAsync(pattern: string, options?: unknown): Promise<void>;
    /** Read a value from the states DB. */
    getStateAsync(id: string, options?: unknown): ioBroker.GetStatePromise;
    /** Subscribe to changes of objects (which might not belong to this adapter) */
    subscribeForeignObjectsAsync(pattern: string | string[], options?: unknown): Promise<void>;
    /** Unsubscribe from changes of objects (which might not belong to this adapter) */
    unsubscribeForeignObjectsAsync(pattern: string | string[], options?: unknown): Promise<void>;
    /** Creates an object in the object db. Existing objects are not overwritten. */
    setObjectNotExistsAsync(id: string, obj: ioBroker.SettableObject, options?: unknown): ioBroker.SetObjectPromise;
    /** Creates an object (which might not belong to this adapter) in the object db. Existing objects are not overwritten. */
    setForeignObjectNotExistsAsync<T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options?: unknown,
    ): ioBroker.SetObjectPromise;

    /** deletes a device, its channels and states */
    deleteDeviceAsync(deviceName: string, options?: unknown): Promise<void>;
    addChannelToEnumAsync(
        enumName: string,
        addTo: string,
        parentDevice: string,
        channelName: string,
        options?: unknown,
    ): Promise<void>;
    deleteChannelFromEnumAsync(
        enumName: string,
        parentDevice: string,
        channelName: string,
        options?: unknown,
    ): Promise<void>;

    /** Returns a list of all devices in this adapter instance */
    getDevicesAsync(options?: unknown): Promise<ioBroker.DeviceObject[]>;

    addStateToEnumAsync(
        enumName: string,
        addTo: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        options?: unknown,
    ): Promise<void>;
    deleteStateFromEnumAsync(
        enumName: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        options?: unknown,
    ): Promise<void>;
    /** Changes access rights of all files in the adapter directory */
    chmodFileAsync(
        adapter: string | null,
        path: string,
        options: { mode: number | string } | Record<string, any>,
    ): Promise<{ entries: ioBroker.ChownFileResult[]; id: string }>;
    // TODO: correct types
    chownFileAsync(...args: any[]): Promise<any>;
    /** reads the content of directory from DB for given adapter and path */
    readDirAsync(adapterName: string | null, path: string, options?: unknown): ioBroker.ReadDirPromise;
    /** Deletes a given file */
    unlinkAsync(adapterName: string | null, path: string, options?: unknown): Promise<void>;
    /** Deletes a given file */
    delFileAsync(adapterName: string | null, path: string, options?: unknown): Promise<void>;
    renameAsync(adapterName: string | null, oldName: string, newName: string, options?: unknown): Promise<void>;
    mkdirAsync(adapterName: string | null, path: string, options?: unknown): Promise<void>;
    /** reads the content of directory from DB for given adapter and path */
    readFileAsync(adapterName: string | null, path: string, options?: unknown): ioBroker.ReadFilePromise;
    writeFileAsync(adapterName: string | null, path: string, data: Buffer | string, options?: unknown): Promise<void>;
    /** Checks if a file exists in the DB */
    fileExistsAsync(adapterName: string | null, path: string, options?: unknown): Promise<boolean>;

    // TODO correct types needed
    getHistoryAsync(...args: any[]): Promise<any>;
    /** Deletes a state from the states DB, but not the associated object. Consider using deleteState instead */
    delStateAsync(id: string, options?: unknown): Promise<void>;
    /** Deletes a state from the states DB, but not the associated object */
    delForeignStateAsync(id: string, options?: unknown): Promise<void>;
    /** Read all states of this adapter which match the given pattern */
    getStatesAsync(pattern: string, options?: unknown): ioBroker.GetStatesPromise;
    /** Read all states (which might not belong to this adapter) which match the given pattern */
    getForeignStatesAsync(pattern: Pattern, options?: unknown): ioBroker.GetStatesPromise;
    /** Subscribe to changes of states (which might not belong to this adapter) */
    subscribeForeignStatesAsync(pattern: string | string[], options?: unknown): Promise<void>;
    /** Subscribe from changes of states (which might not belong to this adapter) */
    unsubscribeForeignStatesAsync(pattern: string | string[], options?: unknown): Promise<void>;
    /** Subscribe to changes of states in this instance */
    subscribeStatesAsync(pattern: Pattern, options?: unknown): Promise<void>;
    /** Subscribe from changes of states in this instance */
    unsubscribeStatesAsync(pattern: Pattern, options?: unknown): Promise<void>;
    /**
     * Helper function that looks for first free TCP port starting with the given one.
     */
    getPortAsync(port: number): Promise<number>;
    /** Read a value (which might not belong to this adapter) from the states DB. */
    getForeignStateAsync(id: string, options?: unknown): ioBroker.GetStatePromise;
    /** Validates username and password */
    checkPasswordAsync(user: string, password: string, options?: unknown): Promise<boolean>;
    /** Sets a new password for the given user */
    setPasswordAsync(user: string, password: string, options?: unknown): Promise<void>;
    /** <INTERNAL> Checks if a user exists and is in the given group. */
    checkGroupAsync(user: string, group: string, options?: unknown): Promise<boolean>;
    /** <INTERNAL> Determines the users permissions */
    calculatePermissionsAsync(
        user: string,
        commandsPermissions: CommandsPermissions,
        options?: unknown,
    ): Promise<ioBroker.PermissionSet>;
    /** Creates or overwrites an object in the object db */
    setObjectAsync(id: string, obj: ioBroker.SettableObject, options?: unknown): ioBroker.SetObjectPromise;
    /** Creates or overwrites an object (which might not belong to this adapter) in the object db */
    setForeignObjectAsync<T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options?: unknown,
    ): ioBroker.SetObjectPromise;
    // TODO: correct types
    getCertificatesAsync(
        publicName?: string,
        privateName?: string,
        chainedName?: string,
    ): Promise<GetCertificatesPromiseReturnType>;
    /** Get all states, channels, devices and folders of this adapter */
    getAdapterObjectsAsync(): Promise<Record<string, ioBroker.AdapterScopedObject>>;

    /** Reads an object (which might not belong to this adapter) from the object db*/
    getForeignObjectAsync<T extends string>(id: T, options?: unknown): ioBroker.GetObjectPromise<T>;

    /**
     * Writes a value (which might not belong to this adapter) into the states DB only if it has changed.
     */
    setForeignStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack?: boolean,
    ): ioBroker.SetStateChangedPromise;
    setForeignStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options?: unknown,
    ): ioBroker.SetStateChangedPromise;
    setForeignStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown,
    ): ioBroker.SetStateChangedPromise;

    /**
     * Writes a value into the states DB only if it has changed.
     */
    setStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack?: boolean,
    ): ioBroker.SetStateChangedPromise;
    setStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options?: unknown,
    ): ioBroker.SetStateChangedPromise;
    setStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown,
    ): ioBroker.SetStateChangedPromise;

    /**
     * Sends a message to a specific host or all hosts.
     */
    sendToHostAsync(hostName: string, message: ioBroker.MessagePayload): Promise<ioBroker.Message | undefined>;
    sendToHostAsync(
        hostName: string,
        command: string,
        message: ioBroker.MessagePayload,
    ): Promise<ioBroker.Message | undefined>;

    /**
     * Sends a message to a specific instance or all instances of some specific adapter.
     */
    sendToAsync(instanceName: string, message: ioBroker.MessagePayload): Promise<ioBroker.Message | undefined>;
    sendToAsync(
        instanceName: string,
        command: string,
        message: ioBroker.MessagePayload,
        options?: SendToOptions,
    ): Promise<ioBroker.Message | undefined>;

    /**
     * Deletes a given file
     */
    delFile(adapterName: string | null, path: string, callback: ioBroker.ErrnoCallback): void;
    delFile(adapterName: string | null, path: string, options: unknown, callback: ioBroker.ErrnoCallback): void;

    /**
     * Writes a value into the states DB.
     *
     * @deprecated use `adapter.setState` without callback instead
     */
    setStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack?: boolean,
    ): ioBroker.SetStatePromise;
    /** @deprecated use `adapter.setState` without callback instead */
    setStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options?: unknown,
    ): ioBroker.SetStatePromise;
    /** @deprecated use `adapter.setState` without callback instead */
    setStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown,
    ): ioBroker.SetStatePromise;

    /**
     * Writes a value (which might not belong to this adapter) into the states DB.
     */
    setForeignStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack?: boolean,
    ): ioBroker.SetStatePromise;
    setForeignStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options?: unknown,
    ): ioBroker.SetStatePromise;
    setForeignStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown,
    ): ioBroker.SetStatePromise;

    /**
     * Get foreign objects by pattern, by specific type and resolve their enums.
     */
    getForeignObjectsAsync<T extends ioBroker.ObjectType>(
        pattern: Pattern,
        type: T,
        enums?: ioBroker.EnumList | null,
        options?: unknown,
    ): ioBroker.GetObjectsPromiseTyped<T>;
    getForeignObjectsAsync<T extends ioBroker.ObjectType>(
        pattern: Pattern,
        type: T,
        options?: unknown,
    ): ioBroker.GetObjectsPromiseTyped<T>;
    getForeignObjectsAsync(pattern: Pattern, options?: unknown): ioBroker.GetObjectsPromise;

    /**
     * creates an object with type device
     *
     * @deprecated use `extendObject` instead
     */
    createDeviceAsync(deviceName: string, common?: Partial<ioBroker.DeviceCommon>): ioBroker.SetObjectPromise;
    /** @deprecated use `extendObject` instead */
    createDeviceAsync(
        deviceName: string,
        common: Partial<ioBroker.DeviceCommon>,
        native?: Record<string, any>,
    ): ioBroker.SetObjectPromise;
    /** @deprecated use `extendObject` instead */
    createDeviceAsync(
        deviceName: string,
        common: Partial<ioBroker.DeviceCommon>,
        native: Record<string, any>,
        options?: unknown,
    ): ioBroker.SetObjectPromise;

    /**
     * Finds an object by its ID or name
     */
    findForeignObjectAsync(idOrName: string, type: string): Promise<{ id: string; name: string }>;

    /**
     * Creates an object with type channel. It must be located under a device
     *
     * @deprecated use `extendObject` instead
     */
    createChannelAsync(
        parentDevice: string,
        channelName: string,
        roleOrCommon?: string | Partial<ioBroker.ChannelCommon>,
    ): ioBroker.SetObjectPromise;
    /** @deprecated use `extendObject` instead */
    createChannelAsync(
        parentDevice: string,
        channelName: string,
        roleOrCommon: string | Partial<ioBroker.ChannelCommon>,
        native?: Record<string, any>,
    ): ioBroker.SetObjectPromise;
    /** @deprecated use `extendObject` instead */
    createChannelAsync(
        parentDevice: string,
        channelName: string,
        roleOrCommon: string | Partial<ioBroker.ChannelCommon>,
        native: Record<string, any>,
        options?: unknown,
    ): ioBroker.SetObjectPromise;

    /**
     * Creates a state and the corresponding object. It must be located in a channel under a device
     *
     * @deprecated use `extendObject` instead
     */
    createStateAsync(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon?: string | Partial<ioBroker.StateCommon>,
    ): ioBroker.SetObjectPromise;
    /** @deprecated use `extendObject` instead */
    createStateAsync(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon: string | Partial<ioBroker.StateCommon>,
        native?: Record<string, any>,
    ): ioBroker.SetObjectPromise;
    /** @deprecated use `extendObject` instead */
    createStateAsync(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon: string | Partial<ioBroker.StateCommon>,
        native: Record<string, any>,
        options?: unknown,
    ): ioBroker.SetObjectPromise;

    /**
     * Deletes a channel and its states. It must have been created with createChannel
     *
     * @deprecated use `this.delObject` instead
     */
    deleteChannelAsync(channelName: string, options?: unknown): Promise<void>;
    /** @deprecated use `this.delObject` instead */
    deleteChannelAsync(parentDevice: string, channelName: string, options?: unknown): Promise<void>;

    /**
     * Deletes a state. It must have been created with createState
     *
     * @deprecated use `this.delObject` instead
     */
    deleteStateAsync(stateName: string, options?: unknown): Promise<void>;
    /** @deprecated use `this.delObject` instead */
    deleteStateAsync(parentChannel: string, stateName: string, options?: unknown): Promise<void>;
    /** @deprecated use `this.delObject` instead */
    deleteStateAsync(parentDevice: string, parentChannel: string, stateName: string, options?: unknown): Promise<void>;

    /**
     * Returns a list of all channels in this adapter instance @param parentDevice (optional) Name
     * of the parent device to filter the channels by @param options (optional) Some internal options.
     */
    getChannelsOfAsync(): Promise<ioBroker.ChannelObject[]>;
    getChannelsOfAsync(parentDevice: string, options?: unknown): Promise<ioBroker.ChannelObject[]>;

    /**
     * Returns a list of all channels in this adapter instance
     */
    getChannels(callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>): void;
    getChannels(parentDevice: string, callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>): void;
    getChannels(
        parentDevice: string,
        options: unknown,
        callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>,
    ): void;

    /**
     * Returns a list of all channels in this adapter instance @param parentDevice (optional)
     * Name of the parent device to filter the channels by @param options (optional) Some internal options.
     */
    getChannelsAsync(): Promise<ioBroker.ChannelObject[]>;
    getChannelsAsync(parentDevice: string, options?: unknown): Promise<ioBroker.ChannelObject[]>;

    /**
     * Returns a list of all states in this adapter instance @param parentDevice (optional)
     * Name of the parent device to filter the channels by @param parentChannel (optional)
     * Name of the parent channel to filter the channels by @param options (optional) Some internal options.
     */
    getStatesOfAsync(): Promise<ioBroker.StateObject[]>;
    getStatesOfAsync(parentDevice: string, parentChannel?: string): Promise<ioBroker.StateObject[]>;
    getStatesOfAsync(parentDevice: string, parentChannel: string, options?: unknown): Promise<ioBroker.StateObject[]>;
}

/**
 * Adapter class
 *
 * How the initialization happens:
 *  _initObjects => _initStates => _prepareInitAdapter => _initAdapter => _initLogging => _createInstancesObjects => ready
 *
 */
export class AdapterClass extends EventEmitter {
    /** Cache of all deprecations which have already been transmitted */
    private reportedDeprecations = new Set<string>();
    /** Instance to access states DB */
    #states?: StatesInRedisClient | null;
    /** Instance to access objects DB */
    #objects?: ObjectsInRedisClient | null;
    /** States DB constructor */
    private States?: typeof StatesInRedisClient;
    /** Objects DB constructor */
    private Objects?: typeof ObjectsInRedisClient;
    /** Contents of iobroker.json */
    private readonly _config: Record<string, any>;
    private readonly _options: AdapterOptions;
    private readonly startedInCompactMode: boolean;
    /** List of instances which want our logs */
    private readonly logList = new Set<string>();
    private readonly aliases = new Map<string, AliasDetails>();
    private readonly aliasPatterns = new Set<string>();
    private enums: Record<string, any> = {};
    private eventLoopLags: number[] = [];
    private overwriteLogLevel: boolean = false;
    adapterReady: boolean = false;
    /** Callbacks from sendTo */
    private readonly messageCallbacks = new Map<number, MessageCallbackObject>();
    /**
     * Contains a live cache of the adapter's states.
     * NOTE: This is only defined if the adapter was initialized with the option states: true.
     */
    oStates?: Record<string, ioBroker.State | undefined>;
    /**
     * Contains a live cache of the adapter's objects.
     * NOTE: This is only defined if the adapter was initialized with the option objects: true.
     */
    oObjects?: Record<string, ioBroker.Object | undefined>;
    private _stopInProgress: boolean = false;
    private _callbackId: number = 1;
    private _firstConnection: boolean = true;
    private readonly _timers = new Set<NodeJS.Timeout>();
    private readonly _intervals = new Set<NodeJS.Timeout>();
    private readonly _delays = new Set<NodeJS.Timeout>();
    /** For ease of use the log property is always defined, however it is only available after `ready` has been called. */
    log!: Log;
    performStrictObjectChecks: boolean;
    private readonly _logger: Winston.Logger;
    private _restartScheduleJob: any;
    private _schedule?: typeof NodeSchedule;
    private namespaceLog: string;
    namespace: `${string}.${number}`;
    name: string;
    private _systemSecret?: string;
    /** Whether the adapter has already terminated */
    private terminated: boolean = false;
    /** The cache of usernames */
    private usernames: Record<string, { id: string }> = {};
    /** A RegExp to test for forbidden chars in object IDs */
    readonly FORBIDDEN_CHARS: RegExp = FORBIDDEN_CHARS;
    private inputCount: number = 0;
    private outputCount: number = 0;
    /** The cache of users */
    private users: Record<ioBroker.ObjectIDs.User, { groups: any; acl: any }> = {}; // todo
    /** The cache of user groups */
    private groups: Record<string, Partial<ioBroker.GroupObject>> = {};
    /** An array of instances, that support auto subscribe */
    private autoSubscribe: string[] = [];
    private defaultHistory: null | string = null;
    private pluginHandler?: InstanceType<typeof PluginHandler>;
    private _reportInterval?: null | NodeJS.Timeout;
    private getPortRunning: null | InternalGetPortOptions = null;
    private readonly _namespaceRegExp: RegExp;
    instance?: number;
    // @ts-expect-error decide how to handle it
    private _utils: Validator;
    /** contents of io-package.json */
    adapterConfig?: AdapterOptions | ioBroker.InstanceObject | null;
    connected?: boolean;
    adapterDir: string;
    /** contents of package.json */
    pack?: Record<string, any>;
    /** contents of io-package.json */
    ioPack: ioBroker.InstanceObject;
    private _initializeTimeout?: NodeJS.Timeout | null;
    private inited?: boolean;
    /** contents of iobroker.json if required via AdapterOptions */
    systemConfig?: Record<string, any>;
    /** the configured date format of system.config, only available if requested via AdapterOptions `useFormatDate` */
    dateFormat?: any;
    /** if float comma instead of dot is used, only available if requested via AdapterOptions `useFormatDate` */
    isFloatComma?: boolean;
    /** configured language of system.config, only available if requested via AdapterOptions `useFormatDate` */
    language?: ioBroker.Languages;
    /** longitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`*/
    longitude?: number;
    /** latitude configured in system.config, only available if requested via AdapterOptions `useFormatDate`*/
    latitude?: number;
    private _defaultObjs?: Record<string, Partial<ioBroker.StateCommon>>;
    private _aliasObjectsSubscribed?: boolean;
    config: ioBroker.AdapterConfig = {};
    host?: string;
    common?: ioBroker.InstanceCommon;
    private mboxSubscribed?: boolean;
    /** Stop the adapter */
    stop?: (params?: StopParameters) => Promise<void>;
    version?: string;
    /** Stop the adapter only defined in compact, not for external usage */
    protected kill?: () => Promise<void>;
    processLog?: (msg: any) => void;
    /**
     * Start or stop subscribing to log messages
     * The method is only available if logTransporter is active via io-pack or adapter options
     * Note, that stopping will stop after 10 seconds, not immediately
     *
     * @param isActive - if log subscription should be activated or deactivated
     * @param options - options passed to setState e.g. user permissions
     */
    requireLog?: (isActive: boolean, options?: Partial<GetUserGroupsOptions>) => Promise<void> | void;
    private logOffTimer?: NodeJS.Timeout | null;
    private logRequired?: boolean;
    private patterns?: Record<string, { regex: string }>;
    private statesConnectedTime?: number;
    /** Constants for frequent use in adapters */
    readonly constants = {
        STATE_QUALITY,
    } as const;

    /** Features supported by the running instance */
    private readonly SUPPORTED_FEATURES = getSupportedFeatures();
    /** Controller for messaging related functionality */
    private readonly uiMessagingController: UserInterfaceMessagingController;

    constructor(options: AdapterOptions | string) {
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
                    type: 'string',
                },
                silent: {
                    describe: 'If is install run',
                    type: 'boolean',
                },
                install: {
                    describe: 'If is install run',
                    type: 'boolean',
                },
                logs: {
                    describe: 'If console output desired',
                    type: 'boolean',
                },
                console: {
                    describe: 'If console output desired',
                    type: 'boolean',
                },
                force: {
                    describe: 'If force start even if disabled',
                    type: 'boolean',
                },
                debug: {
                    describe: 'Same as --force combined with --console',
                    type: 'boolean',
                },
                instance: {
                    describe: 'Instance id, e.g. 0',
                    type: 'string',
                },
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
            10,
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

            this.adapterDir = adapterDir;
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
            unsubscribeCallback: this._options.uiClientUnsubscribe,
        });

        // Create dynamic methods
        /**
         * Promise-version of `Adapter.getPort`
         */
        this.getPortAsync = tools.promisifyNoError(this.getPort, this);

        /**
         * Promise-version of `Adapter.checkPassword`
         */
        this.checkPasswordAsync = tools.promisifyNoError(this.checkPassword, this);

        /**
         * Promise-version of `Adapter.setPassword`
         */
        this.setPasswordAsync = tools.promisify(this.setPassword, this);

        /**
         * Promise-version of `Adapter.checkGroup`
         */
        this.checkGroupAsync = tools.promisifyNoError(this.checkGroup, this);

        /**
         * Promise-version of `Adapter.calculatePermissions`
         */
        this.calculatePermissionsAsync = tools.promisifyNoError(this.calculatePermissions, this);

        /**
         * Promise-version of `Adapter.getCertificates`
         */
        this.getCertificatesAsync = tools.promisify(this.getCertificates, this);

        /**
         * Promise-version of `Adapter.setObject`
         */
        this.setObjectAsync = tools.promisify(this.setObject, this);

        /**
         * Promise-version of `Adapter.getAdapterObjects`
         */
        this.getAdapterObjectsAsync = tools.promisifyNoError(this.getAdapterObjects, this);

        /**
         * Promise-version of `Adapter.extendObject`
         */
        this.extendObjectAsync = tools.promisify(this.extendObject, this);

        /**
         * Promise-version of `Adapter.setForeignObject`
         */
        this.setForeignObjectAsync = tools.promisify(this.setForeignObject, this);

        /**
         * Promise-version of `Adapter.extendForeignObject`
         */
        this.extendForeignObjectAsync = tools.promisify(this.extendForeignObject, this);

        /**
         * Promise-version of `Adapter.getObject`
         */
        this.getObjectAsync = tools.promisify(this.getObject, this);

        /**
         * Promise-version of `Adapter.getObjectView`
         */
        this.getObjectViewAsync = tools.promisify(this.getObjectView, this);

        /**
         * Promise-version of `Adapter.getObjectList`
         */
        this.getObjectListAsync = tools.promisify(this.getObjectList, this);

        /**
         * Promise-version of `Adapter.getEnum`
         */
        this.getEnumAsync = tools.promisify(this.getEnum, this, ['result', 'requestEnum']);

        /**
         * Promise-version of `Adapter.getEnums`
         */
        this.getEnumsAsync = tools.promisify(this.getEnums, this);

        /**
         * Promise-version of `Adapter.getForeignObjects`
         */
        this.getForeignObjectsAsync = tools.promisify(this.getForeignObjects, this);

        /**
         * Promise-version of `Adapter.findForeignObject`
         */
        this.findForeignObjectAsync = tools.promisify(this.findForeignObject, this, ['id', 'name']);

        /**
         * Promise-version of `Adapter.getForeignObject`
         */
        this.getForeignObjectAsync = tools.promisify(this.getForeignObject, this);

        /**
         * Promise-version of `Adapter.delObject`
         */
        this.delObjectAsync = tools.promisify(this.delObject, this);

        /**
         * Promise-version of `Adapter.delForeignObject`
         */
        this.delForeignObjectAsync = tools.promisify(this.delForeignObject, this);

        /**
         * Promise-version of `Adapter.subscribeObjects`
         */
        this.subscribeObjectsAsync = tools.promisify(this.subscribeObjects, this);

        /**
         * Promise-version of `Adapter.unsubscribeObjects`
         */
        this.unsubscribeObjectsAsync = tools.promisify(this.unsubscribeObjects, this);

        /**
         * Promise-version of `Adapter.subscribeForeignObjects`
         */
        this.subscribeForeignObjectsAsync = tools.promisify(this.subscribeForeignObjects, this);

        /**
         * Promise-version of `Adapter.unsubscribeForeignObjects`
         */
        this.unsubscribeForeignObjectsAsync = tools.promisify(this.unsubscribeForeignObjects, this);

        /**
         * Promise-version of `Adapter.setObjectNotExists`
         */
        this.setObjectNotExistsAsync = tools.promisify(this.setObjectNotExists, this);

        /**
         * Promise-version of `Adapter.setForeignObjectNotExists`
         */
        this.setForeignObjectNotExistsAsync = tools.promisify(this.setForeignObjectNotExists, this);

        /**
         * Promise-version of `Adapter.createDevice`
         *
         * @deprecated use `extendObject` instead
         */
        this.createDeviceAsync = tools.promisify(this.createDevice, this);

        /**
         * Promise-version of `Adapter.createChannel`
         *
         * @deprecated use `extendObject` instead
         */
        this.createChannelAsync = tools.promisify(this.createChannel, this);

        /**
         * Promise-version of `Adapter.createState`
         *
         * @deprecated use `extendObject` instead
         */
        this.createStateAsync = tools.promisify(this.createState, this);

        /**
         * Promise-version of `Adapter.deleteDevice`
         *
         * @deprecated use `delObject` instead
         */
        this.deleteDeviceAsync = tools.promisify(this.deleteDevice, this);

        /**
         * Promise-version of `Adapter.addChannelToEnum`
         */
        this.addChannelToEnumAsync = tools.promisify(this.addChannelToEnum, this);

        /**
         * Promise-version of `Adapter.deleteChannelFromEnum`
         */
        this.deleteChannelFromEnumAsync = tools.promisify(this.deleteChannelFromEnum, this);

        /**
         * Promise-version of `Adapter.deleteChannel`
         *
         * @deprecated use `delObject` instead
         */
        this.deleteChannelAsync = tools.promisify(this.deleteChannel, this);

        /**
         * Promise-version of `Adapter.deleteState`
         *
         * @deprecated use `delObject` instead
         */
        this.deleteStateAsync = tools.promisify(this.deleteState, this);

        /**
         * Promise-version of `Adapter.getDevices`
         */
        this.getDevicesAsync = tools.promisify(this.getDevices, this);

        /**
         * Promise-version of `Adapter.getChannelsOf`
         */
        this.getChannelsOfAsync = tools.promisify(this.getChannelsOf, this);

        this.getChannels = this.getChannelsOf;
        this.getChannelsAsync = this.getChannelsOfAsync;

        /**
         * Promise-version of `Adapter.getStatesOf`
         */
        this.getStatesOfAsync = tools.promisify(this.getStatesOf, this);

        /**
         * Promise-version of `Adapter.addStateToEnum`
         */
        this.addStateToEnumAsync = tools.promisify(this.addStateToEnum, this);

        /**
         * Promise-version of `Adapter.deleteStateFromEnum`
         */
        this.deleteStateFromEnumAsync = tools.promisify(this.deleteStateFromEnum, this);

        /**
         * Promise-version of `Adapter.chmodFile`
         */
        this.chmodFileAsync = tools.promisify(this.chmodFile, this);

        /**
         * Promise-version of `Adapter.chownFile`
         */
        this.chownFileAsync = tools.promisify(this.chownFile, this);

        /**
         * Promise-version of `Adapter.readDir`
         */
        this.readDirAsync = tools.promisify(this.readDir, this);

        /**
         * Promise-version of `Adapter.unlink`
         */
        this.unlinkAsync = tools.promisify(this.unlink, this);

        this.delFile = this.unlink;
        this.delFileAsync = this.unlinkAsync;

        /**
         * Promise-version of `Adapter.rename`
         */
        this.renameAsync = tools.promisify(this.rename, this);

        /**
         * Promise-version of `Adapter.mkdir`
         */
        this.mkdirAsync = tools.promisify(this.mkdir, this);

        /**
         * Promise-version of `Adapter.readFile`
         */
        this.readFileAsync = tools.promisify(this.readFile, this, ['file', 'mimeType']);

        /**
         * Promise-version of `Adapter.writeFile`
         */
        this.writeFileAsync = tools.promisify(this.writeFile, this);

        /**
         * Promise-version of `Adapter.fileExists`
         */
        this.fileExistsAsync = tools.promisify(this.fileExists, this);

        /**
         * Promise-version of `Adapter.sendToHost`
         */
        this.sendToHostAsync = tools.promisifyNoError(this.sendToHost, this);

        /**
         * Promise-version of `Adapter.setState`
         */
        this.setStateAsync = tools.promisify(this.setState, this);

        /**
         * Promise-version of `Adapter.setStateChanged`
         */
        this.setStateChangedAsync = tools.promisify(this.setStateChanged, this, ['id', 'notChanged']);

        /**
         * Promise-version of `Adapter.setForeignState`
         */
        this.setForeignStateAsync = tools.promisify(this.setForeignState, this);

        /**
         * Promise-version of `Adapter.setForeignStateChanged`
         */
        this.setForeignStateChangedAsync = tools.promisify(this.setForeignStateChanged, this);

        /**
         * Promise-version of `Adapter.getState`
         */
        this.getStateAsync = tools.promisify(this.getState, this);

        /**
         * Promise-version of `Adapter.getForeignState`
         */
        this.getForeignStateAsync = tools.promisify(this.getForeignState, this);

        /**
         * Promise-version of `Adapter.getHistory`
         */
        this.getHistoryAsync = tools.promisify(this.getHistory, this, ['result', 'step', 'sessionId']);

        /**
         * Promise-version of `Adapter.delState`
         */
        this.delStateAsync = tools.promisify(this.delState, this);

        /**
         * Promise-version of `Adapter.delForeignState`
         */
        this.delForeignStateAsync = tools.promisify(this.delForeignState, this);

        /**
         * Promise-version of `Adapter.getStates`
         */
        this.getStatesAsync = tools.promisify(this.getStates, this);

        /**
         * Promise-version of `Adapter.getForeignStates`
         */
        this.getForeignStatesAsync = tools.promisify(this.getForeignStates, this);

        /**
         * Promise-version of `Adapter.subscribeForeignStates`
         */
        this.subscribeForeignStatesAsync = tools.promisify(this.subscribeForeignStates, this);

        /**
         * Promise-version of `Adapter.unsubscribeForeignStates`
         */
        this.unsubscribeForeignStatesAsync = tools.promisify(this.unsubscribeForeignStates, this);

        /**
         * Promise-version of `Adapter.subscribeStates`
         */
        this.subscribeStatesAsync = tools.promisify(this.subscribeStates, this);

        /**
         * Promise-version of `Adapter.unsubscribeStates`
         */
        this.unsubscribeStatesAsync = tools.promisify(this.unsubscribeStates, this);

        this.setExecutableCapabilities = tools.setExecutableCapabilities;
        this._init();
    }

    /**
     * Get the adapter scoped package identifier of a node module
     *
     * @param moduleName name of the node module
     */
    getAdapterScopedPackageIdentifier(moduleName: string): string {
        return getAdapterScopedPackageIdentifier({ moduleName, namespace: this.namespace });
    }

    installNodeModule(moduleName: string, options: InstallNodeModuleOptions): Promise<CommandResult>;

    /**
     * Install specified npm module
     *
     * @param moduleNameOrUrl name of the node module or GitHub url which can be passed to `npm install`
     * @param options version information
     */
    installNodeModule(moduleNameOrUrl: unknown, options: unknown): Promise<CommandResult> {
        Validator.assertString(moduleNameOrUrl, 'moduleNameOrUrl');
        Validator.assertObject<InstallNodeModuleOptions>(options, 'options');

        return this._installNodeModule({ ...options, moduleNameOrUrl });
    }

    private async _installNodeModule(options: InternalInstallNodeModuleOptions): Promise<CommandResult> {
        const { moduleNameOrUrl, version } = options;

        let moduleName = moduleNameOrUrl;
        const isUrl = URL.canParse(moduleNameOrUrl);

        if (isUrl) {
            moduleName = await requestModuleNameByUrl(moduleNameOrUrl);
        }

        const internalModuleName = getAdapterScopedPackageIdentifier({ moduleName, namespace: this.namespace });
        const packageIdentifier = isUrl ? moduleNameOrUrl : `npm:${moduleName}@${version}`;

        return tools.installNodeModule(`${internalModuleName}@${packageIdentifier}`);
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
    uninstallNodeModule(moduleName: unknown): Promise<CommandResult> {
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
    importNodeModule(moduleName: unknown): Promise<unknown> {
        Validator.assertString(moduleName, 'moduleName');

        const internalModuleName = getAdapterScopedPackageIdentifier({ moduleName, namespace: this.namespace });
        // TODO: if https://github.com/microsoft/TypeScript/issues/54022 ever gets resolved, we should improve the return type
        return import(internalModuleName);
    }

    // overload with real types
    decrypt(secretVal: string, value?: string): string;
    decrypt(value: string): string;
    /**
     * Decrypt the password/value with given key
     *
     * @param secretVal to use for decrypt (or value if only one parameter is given)
     * @param value value to decrypt (if secret is provided)
     */
    decrypt(secretVal: unknown, value?: unknown): string {
        if (value === undefined) {
            value = secretVal;
            secretVal = this._systemSecret;
        }

        Validator.assertString(secretVal, 'secretVal');
        Validator.assertString(value, 'value');

        return tools.decrypt(secretVal, value);
    }

    // overload with real types
    encrypt(secretVal: string, value?: string): string;
    encrypt(value: string): string;

    /**
     * Encrypt the password/value with given key
     *
     * @param secretVal to use for encrypting (or value if only one parameter is given)
     * @param [value] value to encrypt (if secret is provided)
     */
    encrypt(secretVal: unknown, value?: unknown): string {
        if (value === undefined) {
            value = secretVal;
            secretVal = this._systemSecret;
        }

        Validator.assertString(secretVal, 'secretVal');
        Validator.assertString(value, 'value');

        return tools.encrypt(secretVal, value);
    }

    // real types overload
    getSession(id: string, callback: ioBroker.GetSessionCallback): MaybePromise;
    // unknown guard implementation
    getSession(id: unknown, callback: unknown): MaybePromise {
        Validator.assertString(id, 'id');
        Validator.assertCallback(callback, 'callback');

        return this._getSession({ id, callback });
    }

    // actual implementation
    private _getSession(options: InternalGetSessionOptions): MaybePromise {
        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(`${this.namespaceLog} getSession not processed because States database not connected`);
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#states.getSession(options.id, options.callback);
    }

    // overload for docs
    setSession(id: string, ttl: number, data: Record<string, any>, callback?: ioBroker.ErrorCallback): MaybePromise;

    // unknown implementation guards
    setSession(id: unknown, ttl: unknown, data: unknown, callback: unknown): MaybePromise {
        Validator.assertString(id, 'id');
        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertNumber(ttl, 'ttl');
        Validator.assertObject(data, 'data');

        return this._setSession({ id, ttl, data, callback });
    }

    // actual implementation
    private _setSession(options: InternalSetSessionOptions): MaybePromise {
        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(`${this.namespaceLog} setSession not processed because States database not connected`);
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }
        this.#states.setSession(options.id, options.ttl, options.data, options.callback);
    }

    // real types overload
    destroySession(id: string, callback?: ioBroker.ErrorCallback): MaybePromise;
    destroySession(id: unknown, callback: unknown): MaybePromise {
        Validator.assertString(id, 'id');
        Validator.assertOptionalCallback(callback, 'callback');

        return this._destroySession({ id, callback });
    }

    private _destroySession(options: InternalDestroySessionOptions): void | Promise<void> {
        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} destroySession not processed because States database not connected`,
            );
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#states.destroySession(options.id, options.callback);
    }

    private async _getObjectsByArray(
        keys: string[],
        options?: Record<string, any> | null,
    ): Promise<(ioBroker.AnyObject | null)[]> {
        try {
            const res = await this.#objects!.getObjects(keys, options);
            return res;
        } catch (e) {
            this._logger.error(`Could not get objects by array: ${e.message}`);
            return [];
        }
    }

    // external signature
    terminate(exitCode?: number): never;
    terminate(reason?: string, exitCode?: number): never;

    /**
     * stops the execution of adapter, but not disables it.
     *
     * Sometimes, the adapter must be stopped if some libraries are missing.
     *
     * @param reason optional termination description
     * @param exitCode optional exit code
     */
    terminate(reason: unknown, exitCode?: unknown): void {
        // This function must be defined very first, because in the next lines will be yet used.
        if (this.terminated) {
            return;
        }
        this.terminated = true;

        this.pluginHandler && this.pluginHandler.destroyAll();

        if (this._reportInterval) {
            clearInterval(this._reportInterval);
            this._reportInterval = null;
        }
        if (this._restartScheduleJob) {
            this._restartScheduleJob.cancel();
            this._restartScheduleJob = null;
        }

        let _reason = 'Without reason';
        let _exitCode: number;

        if (typeof reason === 'number') {
            // Only the exit code was passed
            exitCode = reason;
            _reason = 'Without reason';
        } else if (reason && typeof reason === 'string') {
            _reason = reason;
        }

        if (typeof exitCode !== 'number') {
            _exitCode = !this._config.isInstall ? EXIT_CODES.ADAPTER_REQUESTED_TERMINATION : EXIT_CODES.NO_ERROR;
        } else {
            _exitCode = exitCode;
        }

        const isNotCritical =
            _exitCode === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION ||
            _exitCode === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP ||
            _exitCode === EXIT_CODES.NO_ERROR;
        const text = `${this.namespaceLog} Terminated (${Validator.getErrorText(_exitCode)}): ${_reason}`;
        if (isNotCritical) {
            this._logger.info(text);
        } else {
            this._logger.warn(text);
        }
        setTimeout(async () => {
            // give last states some time to get handled
            if (this.#states) {
                try {
                    await this.#states.destroy();
                } catch {
                    // ignore
                }
            }
            if (this.#objects) {
                try {
                    await this.#objects.destroy();
                } catch {
                    //ignore
                }
            }
            if (this.startedInCompactMode) {
                this.emit('exit', _exitCode, reason);
                this.#states = null;
                this.#objects = null;
            } else {
                process.exit(_exitCode);
            }
        }, 500);
    }

    // external signature
    getPort(port: number, host?: string, callback?: (port: number) => void): void;
    getPort(port: number, callback?: (port: number) => void): void;

    /**
     * Helper function to find next free port
     *
     * Looks for first free TCP port starting with given one:
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
    getPort(port: unknown, host: unknown, callback?: unknown): void {
        if (!port) {
            throw new Error('adapterGetPort: no port');
        }

        if (typeof host === 'function') {
            callback = host;
            host = null;
        }

        if (typeof port === 'string') {
            port = parseInt(port, 10);
        }

        let _host: string | undefined;
        if (!host) {
            _host = undefined;
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
                setTimeout(() => this.getPort(options.port + 1, options.host, options.callback), 100);
            });
        } catch {
            setImmediate(() => this.getPort(options.port + 1, options.host, options.callback));
        }
    }

    supportsFeature(featureName: SupportedFeature): boolean;

    /**
     * Method to check for available Features for adapter development
     *
     * Use it like ...
     * ```js
     *     if (adapter.supportsFeature && adapter.supportsFeature('ALIAS')) {
     *         ...
     *     }
     * ```
     
     * @param featureName the name of the feature to check
     * @returns true/false if the feature is in the list of supported features
     */
    supportsFeature(featureName: unknown): boolean {
        if (typeof featureName === 'string') {
            return this.SUPPORTED_FEATURES.includes(featureName as SupportedFeature);
        }
        return false;
    }

    // external signature
    checkPassword(
        user: string,
        pw: string,
        options: Record<string, any>,
        callback: CheckPasswordCallback,
    ): Promise<void>;
    checkPassword(user: string, pw: string, callback: CheckPasswordCallback): Promise<void>;

    /**
     * validates user and password
     *
     * @param user user name as text
     * @param pw password as text
     * @param [options] optional user context
     * @param callback return result
     *        ```js
     *            function (result) {
     *              if (result) adapter.log.debug('User is valid');
     *            }
     *        ```
     */
    checkPassword(user: unknown, pw: unknown, options: unknown, callback?: unknown): Promise<void> {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (!callback) {
            throw new Error('checkPassword: no callback');
        }

        Validator.assertCallback(callback, 'callback');
        Validator.assertString(user, 'user');
        Validator.assertString(pw, 'pw');

        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }

        return this._checkPassword({ user, pw, options, callback });
    }

    private async _checkPassword(options: InternalCheckPasswordOptions): Promise<void> {
        let { user } = options;
        const { callback, pw } = options;

        if (user && !user.startsWith('system.user.')) {
            // it's not yet a `system.user.xy` id, thus we assume it's a username
            if (!this.usernames[user]) {
                // we did not find the id of the username in our cache -> update cache
                try {
                    await this._updateUsernameCache();
                } catch (e) {
                    this._logger.error(`${this.namespaceLog} ${e.message}`);
                }
                if (!this.usernames[user]) {
                    // user still not there, it's no valid user -> fallback to legacy check
                    user = `system.user.${user
                        .toString()
                        .replace(this.FORBIDDEN_CHARS, '_')
                        .replace(/\s/g, '_')
                        .replace(/\./g, '_')
                        .toLowerCase()}`;
                } else {
                    user = this.usernames[user].id;
                }
            } else {
                user = this.usernames[user].id;
            }
        }

        this.getForeignObject(user, options, (err, obj) => {
            if (err || !obj || !obj.common || (!obj.common.enabled && user !== SYSTEM_ADMIN_USER)) {
                return tools.maybeCallback(callback, false, user);
            }
            password(pw).check(obj.common.password, (err, res) => {
                return tools.maybeCallback(callback, !!res, user);
            });
        });
    }

    /**
     * This method update the cached values in `this.usernames`
     */
    private async _updateUsernameCache(): Promise<void> {
        try {
            // get all users
            const obj = await this.getObjectListAsync({ startkey: 'system.user.', endkey: 'system.user.\u9999' });
            // make sure cache is cleared
            this.usernames = {};
            for (const row of obj.rows) {
                if (row.value.common && typeof row.value.common.name === 'string') {
                    this.usernames[row.value.common.name] = { id: row.id.replace(FORBIDDEN_CHARS, '_') };
                } else {
                    this._logger.warn(`${this.namespaceLog} Invalid username for id "${row.id}"`);
                }
            }
        } catch (e) {
            throw new Error(`Could not update user cache: ${e.message}`);
        }
    }

    // external signature
    getUserID(username: string): Promise<string | undefined>;
    /**
     * Return ID of given username
     *
     * @param username - name of the user
     */
    getUserID(username: unknown): Promise<string | undefined> {
        Validator.assertString(username, 'username');

        return this._getUserID({ username });
    }

    private async _getUserID(options: InternalGetUserIDOptions): Promise<string | undefined> {
        if (!this.usernames[options.username]) {
            try {
                // did not find username, we should have a look in the cache
                await this._updateUsernameCache();

                if (!this.usernames[options.username]) {
                    return;
                }
            } catch (e) {
                this._logger.error(`${this.namespaceLog} ${e.message}`);
                return;
            }
        }

        return this.usernames[options.username].id;
    }

    // external signature
    setPassword(
        user: string,
        pw: string,
        options: Record<string, any>,
        callback?: ioBroker.ErrorCallback,
    ): Promise<void>;

    setPassword(user: string, pw: string, callback?: ioBroker.ErrorCallback): Promise<void>;

    /**
     * sets the user's password
     *
     * @param user user name as text
     * @param pw password as text
     * @param [options] optional user context
     * @param [callback] return result
     *        ```js
     *            function (err) {
     *              if (err) adapter.log.error('Cannot set password: ' + err);
     *            }
     *        ```
     */
    setPassword(user: unknown, pw: unknown, options: unknown, callback?: unknown): Promise<void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(user, 'user');
        Validator.assertString(pw, 'pw');
        Validator.assertOptionalCallback(callback, 'callback');
        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }

        return this._setPassword({ user, pw, options, callback });
    }

    private async _setPassword(options: InternalSetPasswordOptions): Promise<void> {
        if (options.user && !options.user.startsWith('system.user.')) {
            // it's not yet a `system.user.xy` id, thus we assume it's a username
            if (!this.usernames[options.user]) {
                // we did not find the id of the username in our cache -> update cache
                try {
                    await this._updateUsernameCache();
                } catch (e) {
                    this._logger.error(`${this.namespaceLog} ${e}`);
                }
                if (!this.usernames[options.user]) {
                    // user still not there, fallback to legacy check
                    options.user = `system.user.${options.user
                        .toString()
                        .replace(this.FORBIDDEN_CHARS, '_')
                        .replace(/\s/g, '_')
                        .replace(/\./g, '_')
                        .toLowerCase()}`;
                } else {
                    options.user = this.usernames[options.user].id;
                }
            } else {
                options.user = this.usernames[options.user].id;
            }
        }

        this.getForeignObject(options.user, options, (err, obj) => {
            if (err || !obj) {
                return tools.maybeCallbackWithError(options.callback, 'User does not exist');
            }

            // BF: (2020.05.22) are the empty passwords allowed??
            if (!options.pw) {
                this.extendForeignObject(
                    options.user,
                    {
                        common: {
                            password: '',
                        },
                    },
                    options.options || {},
                    () => {
                        return tools.maybeCallback(options.callback);
                    },
                );
            } else {
                password(options.pw).hash(null, null, (err, res) => {
                    if (err) {
                        return tools.maybeCallbackWithError(options.callback, err);
                    }
                    this.extendForeignObject(
                        options.user,
                        {
                            common: {
                                password: res,
                            },
                        },
                        options.options || {},
                        () => {
                            return tools.maybeCallbackWithError(options.callback, null);
                        },
                    );
                });
            }
        });
    }

    // external signature
    checkGroup(user: string, group: string, options: Record<string, any>, callback?: CheckGroupCallback): Promise<void>;
    checkGroup(user: string, group: string, callback?: CheckGroupCallback): Promise<void>;

    /**
     * returns if user exists and is in the group
     *
     * This function used mostly internally and the adapter developer do not require it.
     *
     * @param user user name as text
     * @param group group name
     * @param [options] optional user context
     * @param callback return result
     *        ```js
     *            function (result) {
     *              if (result) adapter.log.debug('User exists and in the group');
     *            }
     *        ```
     */
    checkGroup(user: unknown, group: unknown, options: unknown, callback?: unknown): Promise<void> {
        user = user || '';

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(user, 'user');
        Validator.assertString(group, 'group');
        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertOptionalCallback(callback, 'callback');

        return this._checkGroup({ user, group, options, callback });
    }

    private async _checkGroup(options: InternalCheckGroupOptions): Promise<void> {
        if (options.user && !options.user.startsWith('system.user.')) {
            // it's not yet a `system.user.xy` id, thus we assume it's a username
            if (!this.usernames[options.user]) {
                // we did not find the id of the username in our cache -> update cache
                try {
                    await this._updateUsernameCache();
                } catch (e) {
                    this._logger.error(`${this.namespaceLog} ${e}`);
                }

                if (!this.usernames[options.user]) {
                    // user still not there, it's no valid user -> fallback
                    options.user = `system.user.${options.user
                        .toString()
                        .replace(this.FORBIDDEN_CHARS, '_')
                        .replace(/\s/g, '_')
                        .replace(/\./g, '_')
                        .toLowerCase()}`;
                } else {
                    options.user = this.usernames[options.user].id;
                }
            } else {
                options.user = this.usernames[options.user].id;
            }
        }

        if (options.group && !options.group.startsWith('system.group.')) {
            options.group = `system.group.${options.group}`;
        }
        this.getForeignObject(options.user, options, (err, obj) => {
            if (err || !obj) {
                return tools.maybeCallback(options.callback, false);
            }
            this.getForeignObject(options.group, options, (err, obj) => {
                if (err || !obj) {
                    return tools.maybeCallback(options.callback, false);
                }
                if (obj.common.members.includes(options.user)) {
                    return tools.maybeCallback(options.callback, true);
                }
                return tools.maybeCallback(options.callback, false);
            });
        });
    }

    // external signature
    calculatePermissions(
        user: string,
        commandsPermissions: CommandsPermissions,
        options?: Record<string, any>,
        callback?: CalculatePermissionsCallback,
    ): Promise<void | ioBroker.PermissionSet>;
    calculatePermissions(
        user: string,
        commandsPermissions: CommandsPermissions,
        callback?: CalculatePermissionsCallback,
    ): Promise<void | ioBroker.PermissionSet>;

    /**
     * get the user permissions
     *
     * This function used mostly internally and the adapter developer do not require it.
     * The function reads permissions of user's groups (it can be more than one) and merge permissions together
     *
     * @param  user user name as text
     * @param  commandsPermissions object that describes the access rights like
     *     ```js
     *         // static information
     *         var commandsPermissions = {
     *            getObject:          {type: 'object',    operation: 'read'},
     *            getObjects:         {type: 'object',    operation: 'list'},
     *            getObjectView:      {type: 'object',    operation: 'list'},
     *            setObject:          {type: 'object',    operation: 'write'},
     *            subscribeObjects:   {type: 'object',    operation: 'read'},
     *            unsubscribeObjects: {type: 'object',    operation: 'read'},
     *            subscribeFiles:     {type: 'object',    operation: 'read'},
     *            unsubscribeFiles:   {type: 'object',    operation: 'read'},
     *
     *            getStates:          {type: 'state',     operation: 'list'},
     *            getState:           {type: 'state',     operation: 'read'},
     *            setState:           {type: 'state',     operation: 'write'},
     *            getStateHistory:    {type: 'state',     operation: 'read'},
     *            subscribe:          {type: 'state',     operation: 'read'},
     *            unsubscribe:        {type: 'state',     operation: 'read'},
     *            getVersion:         {type: '',          operation: ''},
     *
     *            httpGet:            {type: 'other',     operation: 'http'},
     *            sendTo:             {type: 'other',     operation: 'sendto'},
     *            sendToHost:         {type: 'other',     operation: 'sendto'},
     *
     *            readFile:           {type: 'file',      operation: 'read'},
     *            readFile64:         {type: 'file',      operation: 'read'},
     *            writeFile:          {type: 'file',      operation: 'write'},
     *            writeFile64:        {type: 'file',      operation: 'write'},
     *            unlink:             {type: 'file',      operation: 'delete'},
     *            rename:             {type: 'file',      operation: 'write'},
     *            mkdir:              {type: 'file',      operation: 'write'},
     *            readDir:            {type: 'file',      operation: 'list'},
     *            chmodFile:          {type: 'file',      operation: 'write'},
     *            chownFile:          {type: 'file',      operation: 'write'},
     *
     *            authEnabled:        {type: '',          operation: ''},
     *            disconnect:         {type: '',          operation: ''},
     *            listPermissions:    {type: '',          operation: ''},
     *            getUserPermissions: {type: 'object',    operation: 'read'}
     *         };
     *        ```
     * @param [options] optional user context
     * @param [callback] return result
     *        ```js
     *            function (acl) {
     *              // Access control object for admin looks like:
     *              // {
     *              //    file: {
     *              //         read:       true,
     *              //         write:      true,
     *              //         'delete':   true,
     *              //         create:     true,
     *              //         list:       true
     *              //     },
     *              //     object: {
     *              //         read:       true,
     *              //         write:      true,
     *              //         'delete':   true,
     *              //         list:       true
     *              //     },
     *              //     state: {
     *              //         read:       true,
     *              //         write:      true,
     *              //         'delete':   true,
     *              //         create:     true,
     *              //         list:       true
     *              //     },
     *              //     user: 'admin',
     *              //     users:  {
     *              //         read:       true,
     *              //         write:      true,
     *              //         create:     true,
     *              //         'delete':   true,
     *              //         list:       true
     *              //     },
     *              //     other: {
     *              //         execute:    true,
     *              //         http:       true,
     *              //         sendto:     true
     *              //     },
     *              //     groups: ['administrator'] // can be more than one
     *              // }
     *            }
     *        ```
     */
    calculatePermissions(
        user: unknown,
        commandsPermissions: unknown,
        options: unknown,
        callback?: unknown,
    ): Promise<void | ioBroker.PermissionSet> {
        user = user || '';

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(user, 'user');
        if (!Array.isArray(commandsPermissions)) {
            Validator.assertObject(commandsPermissions, 'commandsPermissions');
        }
        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertOptionalCallback(callback, 'callback');

        return this._calculatePermissions({ user, commandsPermissions, options, callback });
    }

    private async _calculatePermissions(
        options: InternalCalculatePermissionsOptions,
    ): Promise<void | ioBroker.PermissionSet> {
        const { user } = options;
        let userId: ioBroker.ObjectIDs.User;

        if (user && !user.startsWith('system.user.')) {
            // it's not yet a `system.user.xy` id, thus we assume it's a username
            if (!this.usernames[options.user]) {
                // we did not find the id of the username in our cache -> update cache
                try {
                    await this._updateUsernameCache();
                } catch (e) {
                    this._logger.error(`${this.namespaceLog} ${e.message}`);
                }
                // user still not there, fallback
                if (!this.usernames[user]) {
                    userId = `system.user.${user
                        .toString()
                        .replace(this.FORBIDDEN_CHARS, '_')
                        .replace(/\s/g, '_')
                        .replace(/\./g, '_')
                        .toLowerCase()}`;
                } else {
                    userId = this.usernames[user].id as ioBroker.ObjectIDs.User;
                }
            } else {
                userId = this.usernames[user].id as ioBroker.ObjectIDs.User;
            }
        } else {
            userId = user as ioBroker.ObjectIDs.User;
        }

        // read all groups
        let acl: Partial<ioBroker.PermissionSet> = { user: userId };
        if (userId === SYSTEM_ADMIN_USER) {
            acl.groups = [SYSTEM_ADMIN_GROUP];
            for (const commandPermission of Object.values(options.commandsPermissions)) {
                if (!commandPermission.type) {
                    continue;
                }
                // @ts-expect-error we fix this later
                acl[commandPermission.type] = acl[commandPermission.type] || {};
                // @ts-expect-error we fix this later
                acl[commandPermission.type][commandPermission.operation] = true;
            }

            return tools.maybeCallback(options.callback, acl as ioBroker.PermissionSet);
        }
        this.getForeignObjects('*', 'group', null, options, (err, groups) => {
            acl.groups = [];
            // aggregate all groups permissions, where this user is
            if (groups) {
                for (const g of Object.keys(groups)) {
                    if (groups[g]?.common?.members && groups[g].common.members.includes(userId)) {
                        acl.groups.push(groups[g]._id);
                        if (groups[g]._id === SYSTEM_ADMIN_GROUP) {
                            acl = {
                                file: {
                                    read: true,
                                    write: true,
                                    delete: true,
                                    create: true,
                                    list: true,
                                },
                                // @ts-expect-error create is missing
                                object: {
                                    read: true,
                                    write: true,
                                    delete: true,
                                    list: true,
                                },
                                state: {
                                    read: true,
                                    write: true,
                                    delete: true,
                                    create: true,
                                    list: true,
                                },
                                user: userId,
                                users: {
                                    read: true,
                                    write: true,
                                    create: true,
                                    delete: true,
                                    list: true,
                                },
                                other: {
                                    execute: true,
                                    http: true,
                                    sendto: true,
                                },
                                groups: acl.groups,
                            };
                            break;
                        }

                        const gAcl = groups[g].common.acl;
                        try {
                            for (const type of Object.keys(gAcl)) {
                                // fix bug. Some version have user instead of users.
                                if (type === 'user') {
                                    // @ts-expect-error fix it
                                    acl.users = acl.users || {};
                                } else {
                                    // @ts-expect-error fix it
                                    acl[type] = acl[type] || {};
                                }
                                // @ts-expect-error fix it
                                for (const op of Object.keys(gAcl[type])) {
                                    // fix error
                                    if (type === 'user') {
                                        // @ts-expect-error fix it
                                        acl.users[op] = acl.users[op] || gAcl.user[op];
                                    } else {
                                        // @ts-expect-error fix it
                                        acl[type][op] = acl[type][op] || gAcl[type][op];
                                    }
                                }
                            }
                        } catch (e) {
                            this._logger.error(`${this.namespaceLog} Cannot set acl: ${e.message}`);
                            this._logger.error(`${this.namespaceLog} Cannot set acl: ${JSON.stringify(gAcl)}`);
                            this._logger.error(`${this.namespaceLog} Cannot set acl: ${JSON.stringify(acl)}`);
                        }
                    }
                }
            }

            return tools.maybeCallback(options.callback, acl as ioBroker.PermissionSet);
        });
    }

    /**
     * Stop an instance gracefully
     *
     * @param options information about the stoppage
     */
    private async _stop(options: InternalStopParameters = {}): Promise<void> {
        const { isPause, isScheduled, reason } = options;
        let { exitCode, updateAliveState } = options;

        exitCode = exitCode || (isScheduled ? EXIT_CODES.START_IMMEDIATELY_AFTER_STOP : 0);
        if (updateAliveState === undefined) {
            updateAliveState = true;
        }

        if (!this._stopInProgress || this._config.isInstall) {
            // when interval is deleted we already had a stop call before
            this._stopInProgress = true;
            this._reportInterval && clearInterval(this._reportInterval);
            this._reportInterval = null;
            const id = `system.adapter.${this.namespace}`;

            const finishUnload = async (): Promise<void> => {
                if (this._timers.size) {
                    this._timers.forEach(timer => clearTimeout(timer));
                    this._timers.clear();
                }

                if (this._intervals.size) {
                    this._intervals.forEach(interval => clearInterval(interval));
                    this._intervals.clear();
                }

                if (this._delays.size) {
                    this._delays.forEach(timer => clearTimeout(timer));
                    this._delays.clear();
                }

                if (this.messageCallbacks.size) {
                    this.messageCallbacks.forEach(callbackObj => clearTimeout(callbackObj.timer));
                    this.messageCallbacks.clear();
                }

                if (this.#states && updateAliveState) {
                    this.outputCount++;
                    await this.#states.setState(`${id}.alive`, { val: false, ack: true, from: id });
                    if (!isPause) {
                        this._logger.info(`${this.namespaceLog} terminating`);
                    }

                    // To this moment, the class could be destroyed
                    this.terminate(reason, exitCode);
                } else {
                    if (!isPause) {
                        this._logger.info(`${this.namespaceLog} terminating`);
                    }
                    this.terminate(reason, exitCode);
                }
            };

            // if we were never ready, we don't trigger the unload procedure
            if (this.adapterReady) {
                if (typeof this._options.unload === 'function') {
                    if (this._options.unload.length >= 1) {
                        // The method takes (at least) a callback
                        this._options.unload(finishUnload);
                    } else {
                        // The method takes no arguments, so it must return a Promise
                        // @ts-expect-error already fixed in the latest types
                        const unloadPromise = this._options.unload();
                        if (unloadPromise instanceof Promise) {
                            // Call finishUnload in the case of success and failure
                            try {
                                await unloadPromise;
                            } finally {
                                finishUnload();
                            }
                        } else {
                            // No callback accepted and no Promise returned - force unload
                            this._logger.error(
                                `${this.namespaceLog} Error in ${id}: The unload method must return a Promise if it does not accept a callback!`,
                            );
                        }
                    }
                } else {
                    this.emit('unload', finishUnload);
                }
            }

            // Even if the developer forgets to call the unload callback, we need to stop the process.
            // Therefore, wait a short while and then force the unload procedure
            setTimeout(() => {
                if (this.#states) {
                    finishUnload();

                    // Give 1 second to write the value
                    setTimeout(() => {
                        if (!isPause) {
                            this._logger.info(`${this.namespaceLog} terminating with timeout`);
                        }
                        this.terminate(exitCode);
                    }, 1_000);
                } else {
                    if (!isPause) {
                        this._logger.info(`${this.namespaceLog} terminating`);
                    }
                    this.terminate(exitCode);
                }
            }, this.common?.stopTimeout || 500);
        }
    }

    /**
     * Reads the file certificate from a given path and adds a file watcher to restart adapter on cert changes
     * if a cert is passed it is returned as it is
     *
     * @param cert cert or path to cert
     */
    private _readFileCertificate(cert: string): string {
        if (typeof cert === 'string') {
            try {
                // if length < 1024 it's no valid cert, so we assume a path to a valid certificate
                if (cert.length < 1024 && fs.existsSync(cert)) {
                    const certFile = cert;
                    cert = fs.readFileSync(certFile, 'utf8');
                    // start watcher of this file
                    fs.watch(certFile, (eventType, filename) => {
                        this._logger.warn(
                            `${this.namespaceLog} New certificate "${filename}" detected. Restart adapter`,
                        );
                        setTimeout(() => this._stop({ isPause: false, isScheduled: true }), 2_000);
                    });
                }
            } catch (e) {
                this._logger.error(`${this.namespaceLog} Could not read certificate from file ${cert}: ${e.message}`);
            }
        }
        return cert;
    }

    // public signature
    getCertificates(
        publicName?: string,
        privateName?: string,
        chainedName?: string,
        callback?: GetCertificatesCallback,
    ): void;

    /**
     * returns SSL certificates by name
     *
     * This function returns SSL certificates (private key, public cert and chained certificate).
     * Names are defined in the system's configuration in admin, e.g. "defaultPrivate", "defaultPublic".
     * The result can be directly used for creation of https server.
     *
     * @param [publicName] public certificate name
     * @param [privateName] private certificate name
     * @param [chainedName] optional chained certificate name
     * @param callback return result
     *        ```js
     *            function (err, certs, letsEncrypt) {
     *              adapter.log.debug('private key: ' + certs.key);
     *              adapter.log.debug('public cert: ' + certs.cert);
     *              adapter.log.debug('chained cert: ' + certs.ca);
     *            }
     *        ```
     */
    getCertificates(
        publicName: unknown,
        privateName: unknown,
        chainedName: unknown,
        callback: unknown,
    ): Promise<GetCertificatesPromiseReturnType | void> {
        if (typeof publicName === 'function') {
            callback = publicName;
            publicName = undefined;
        }
        if (typeof privateName === 'function') {
            callback = privateName;
            privateName = undefined;
        }
        if (typeof chainedName === 'function') {
            callback = chainedName;
            chainedName = undefined;
        }

        const config = this.config as InternalAdapterConfig;

        publicName = publicName || config.certPublic;
        privateName = privateName || config.certPrivate;
        chainedName = chainedName || config.certChained;

        if (publicName !== undefined) {
            Validator.assertString(publicName, 'publicName');
        }

        if (privateName !== undefined) {
            Validator.assertString(privateName, 'privateName');
        }

        if (chainedName !== undefined) {
            Validator.assertString(chainedName, 'chainedName');
        }

        Validator.assertOptionalCallback(callback, 'callback');

        return this._getCertificates({ publicName, privateName, chainedName, callback });
    }

    private async _getCertificates(
        options: InternalGetCertificatesOptions,
    ): Promise<[cert: ioBroker.Certificates, useLetsEncryptCert?: boolean] | void> {
        const { publicName, chainedName, privateName, callback } = options;
        let obj: ioBroker.OtherObject | undefined | null;

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} getCertificates not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            // Load certificates
            obj = await this.#objects.getObject('system.certificates');
        } catch {
            // ignore
        }

        if (
            !obj ||
            !obj.native.certificates ||
            !publicName ||
            !privateName ||
            !obj.native.certificates[publicName] ||
            !obj.native.certificates[privateName] ||
            (chainedName && !obj.native.certificates[chainedName])
        ) {
            this._logger.error(
                `${this.namespaceLog} Cannot configure secure web server, because no certificates found: ${publicName}, ${privateName}, ${chainedName}`,
            );
            if (publicName === 'defaultPublic' || privateName === 'defaultPrivate') {
                this._logger.info(
                    `${this.namespaceLog} Default certificates seem to be configured but missing. You can execute "iobroker cert create" in your shell to create these.`,
                );
            }

            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_NOT_FOUND);
        }
        let ca: string | undefined;
        if (chainedName) {
            const chained = this._readFileCertificate(obj.native.certificates[chainedName]).split(
                '-----END CERTIFICATE-----\r\n',
            );
            // it is still a file name, and the file maybe does not exist, but we can omit this error
            if (chained.join('').length >= 512) {
                const caArr = [];
                for (const cert of chained) {
                    if (cert.replace(/(\r\n|\r|\n)/g, '').trim()) {
                        caArr.push(`${cert}-----END CERTIFICATE-----\r\n`);
                    }
                }
                ca = caArr.join('');
            }
        }

        return tools.maybeCallbackWithError(
            callback,
            null,
            {
                key: this._readFileCertificate(obj.native.certificates[privateName]),
                cert: this._readFileCertificate(obj.native.certificates[publicName]),
                ca,
            },
            obj.native.letsEncrypt,
        );
    }

    /**
     * Restarts an instance of the adapter.
     *
     */
    restart(): void {
        if (this.stop) {
            this._logger.warn(`${this.namespaceLog} Restart initiated`);
            this.stop();
        } else {
            this._logger.warn(`${this.namespaceLog} Cannot initiate restart, because this.stop is not defined`);
        }
    }

    updateConfig(newConfig: Record<string, any>): ioBroker.SetObjectPromise;
    /**
     * Updates the adapter config with new values. Only a subset of the configuration has to be provided,
     * since merging with the existing config is done automatically, e.g., like this:
     *
     * `adapter.updateConfig({prop1: "newValue1"})`
     *
     * After updating the configuration, the adapter is automatically restarted.
     *
     * @param newConfig The new config values to be stored
     */
    updateConfig(newConfig: unknown): ioBroker.SetObjectPromise {
        Validator.assertObject(newConfig, 'newConfig');

        return this._updateConfig({ newConfig });
    }

    private async _updateConfig(options: InternalUpdateConfigOptions): ioBroker.SetObjectPromise {
        const { newConfig } = options;

        // update the adapter config object
        const configObjId = `system.adapter.${this.namespace}`;
        let obj;
        try {
            obj = await this.getForeignObjectAsync(configObjId);
        } catch (e) {
            this._logger.error(`${this.namespaceLog} Updating the adapter config failed: ${e.message}`);
        }

        if (!obj) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        const oldConfig = obj.native;
        let mergedConfig: Record<string, unknown>;

        // merge the old and new configuration
        if ('encryptedNative' in obj && Array.isArray(obj.encryptedNative)) {
            const secret = await this.getSystemSecret();
            decryptArray({ obj: oldConfig, secret, keys: obj.encryptedNative });
            mergedConfig = { ...oldConfig, ...newConfig };
            encryptArray({ obj: mergedConfig, secret, keys: obj.encryptedNative });
        } else {
            mergedConfig = { ...oldConfig, ...newConfig };
        }

        obj.native = mergedConfig;

        return this.setForeignObjectAsync(configObjId, obj);
    }

    /**
     * Disables and stops the adapter instance.
     *
     */
    async disable(): ioBroker.SetObjectPromise {
        // update the adapter config object
        const configObjId = `system.adapter.${this.namespace}`;
        let obj;
        try {
            obj = await this.getForeignObjectAsync(configObjId);
        } catch (e) {
            this._logger.error(`${this.namespaceLog} Disabling the adapter instance failed: ${e.message}`);
        }

        if (!obj) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }
        obj.common.enabled = false;
        return this.setForeignObjectAsync(configObjId, obj);
    }

    async getEncryptedConfig(attribute: string, callback?: GetEncryptedConfigCallback): Promise<string | void>;

    /**
     * Reads the encrypted parameter from config.
     *
     * It returns promise if no callback is provided.
     *
     * @param attribute - attribute name in native configuration part
     * @param [callback] - optional callback
     */
    getEncryptedConfig(attribute: unknown, callback: unknown): Promise<string | void> {
        Validator.assertString(attribute, 'attribute');
        Validator.assertOptionalCallback(callback, 'callback');

        return this._getEncryptedConfig({ attribute, callback });
    }

    private async _getEncryptedConfig(options: InternalGetEncryptedConfigOptions): Promise<string | void> {
        const { attribute, callback } = options;

        const value = (this.config as InternalAdapterConfig)[attribute];

        if (typeof value === 'string') {
            const secret = await this.getSystemSecret();
            return tools.maybeCallbackWithError(callback, null, tools.decrypt(secret, value));
        }
        return tools.maybeCallbackWithError(callback, `Attribute "${attribute}" not found`);
    }

    /**
     * Get the system secret, after retrived once it will be read from cache
     */
    private async getSystemSecret(): Promise<string> {
        if (this._systemSecret !== undefined) {
            return this._systemSecret;
        }

        try {
            const data = await this.getForeignObjectAsync('system.config');
            if (data?.native) {
                this._systemSecret = data.native.secret;
            }
        } catch {
            // do nothing - we initialize default secret below
        }

        this._systemSecret = this._systemSecret || DEFAULT_SECRET;
        return this._systemSecret;
    }

    // external signature
    setTimeout<TCallback extends TimeoutCallback>(
        cb: TCallback,
        timeout: number,
        ...args: Parameters<TCallback>
    ): ioBroker.Timeout | undefined;
    /**
     * Same as setTimeout,
     * but it clears the running timers during the unload process
     * does not work after unload has been called
     *
     * @param cb - timer callback
     * @param timeout - timeout in milliseconds
     * @param args - as many arguments as needed, which will be passed to setTimeout
     * @returns timer id
     */
    setTimeout(cb: unknown, timeout: unknown, ...args: unknown[]): ioBroker.Timeout | undefined {
        if (typeof cb !== 'function') {
            this._logger.warn(
                `${this.namespaceLog} setTimeout expected callback to be of type "function", but got "${typeof cb}"`,
            );
            return;
        }

        if (this._stopInProgress) {
            this._logger.warn(`${this.namespaceLog} setTimeout called, but adapter is shutting down`);
            return;
        }

        Validator.assertNumber(timeout, 'timeout');
        Validator.assertTimeout(timeout);

        const timer = setTimeout.call(
            null,
            () => {
                this._timers.delete(timer);
                cb(...args);
            },
            timeout,
        );
        this._timers.add(timer);

        return timer as unknown as ioBroker.Timeout;
    }

    clearTimeout(timer: ioBroker.Timeout | undefined): void;

    /**
     * Same as clearTimeout
     * but it checks the running timers on unload
     *
     * @param timer - the timer object
     */
    clearTimeout(timer: unknown): void {
        if (timer === undefined) {
            return;
        }

        // should we further validate this?
        clearTimeout(timer as NodeJS.Timeout);
        this._timers.delete(timer as NodeJS.Timeout);
    }

    // external signature
    delay(timeout: number): Promise<void>;

    /**
     * delays the fulfillment of the promise the amount of time.
     * it will not fulfill during and after adapter shutdown
     *
     * @param timeout - timeout in milliseconds
     * @returns promise when timeout is over
     */
    delay(timeout: unknown): Promise<void> {
        if (this._stopInProgress) {
            this._logger.warn(`${this.namespaceLog} delay called, but adapter is shutting down`);
        }

        Validator.assertNumber(timeout, 'timeout');

        return new Promise(resolve => {
            const timer = setTimeout(() => {
                this._delays.delete(timer);
                if (!this._stopInProgress) {
                    resolve();
                }
            }, timeout);
            this._delays.add(timer);
        });
    }

    // external signature
    setInterval<TCallback extends TimeoutCallback>(
        cb: TCallback,
        timeout: number,
        ...args: Parameters<TCallback>
    ): ioBroker.Interval | undefined;

    /**
     * Same as setInterval
     * but it clears the running intervals during the unload process
     * does not work after unload has been called
     *
     * @param cb - interval callback
     * @param timeout - interval in milliseconds
     * @param args - as many arguments as needed, which will be passed to setTimeout
     * @returns interval interval object
     */
    setInterval(cb: unknown, timeout: unknown, ...args: unknown[]): ioBroker.Interval | undefined {
        if (typeof cb !== 'function') {
            this._logger.error(
                `${this.namespaceLog} setInterval expected callback to be of type "function", but got "${typeof cb}"`,
            );
            return;
        }

        if (this._stopInProgress) {
            this._logger.warn(`${this.namespaceLog} setInterval called, but adapter is shutting down`);
            return;
        }

        Validator.assertNumber(timeout, 'timeout');
        Validator.assertTimeout(timeout);

        const id = setInterval(() => cb(...args), timeout);
        this._intervals.add(id);

        return id as unknown as ioBroker.Interval;
    }

    // external signature
    clearInterval(interval: ioBroker.Interval | undefined): void;

    /**
     * Same as clearInterval
     * but it checks the running intervals on unload
     *
     * @param interval - interval object
     */
    clearInterval(interval: unknown): void {
        if (interval === undefined) {
            return;
        }

        // should we further validate it is a valid interval?
        clearInterval(interval as NodeJS.Timeout);
        this._intervals.delete(interval as NodeJS.Timeout);
    }

    setObject(id: string, obj: ioBroker.SettableObject, callback?: ioBroker.SetObjectCallback): Promise<void>;
    setObject(
        id: string,
        obj: ioBroker.SettableObject,
        options: unknown,
        callback?: ioBroker.SetObjectCallback,
    ): Promise<void>;
    setObject(id: string, obj: ioBroker.SettableObject, callback?: ioBroker.SetObjectCallback): Promise<void>;
    /**
     * Creates or overwrites an object in objectDB.
     *
     * This function can create or overwrite objects in objectDB for this adapter.
     * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
     * <b>common</b>, <b>native</b> and <b>type</b> attributes are mandatory, and it will be checked.
     * Additionally, type "state" requires <b>role</b>, <b>type</b> and <b>name</b>, e.g.:
     * ```js
     * {
     *     common: {
     *          name: 'object name',
     *          type: 'number', // string, boolean, object, mixed, array
     *          role: 'value'   // see https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole
     *     },
     *     native: {},
     *     type: 'state' // channel, device
     * }
     * ```
     *
     * @param id object ID, that must be overwritten or created.
     * @param obj new object
     * @param [options] optional user context
     * @param [callback] return result
     *        ```js
     *            function (err, obj) {
     *              // obj is {id: id}
     *              if (err) adapter.log.error('Cannot write object: ' + err);
     *            }
     *        ```
     */
    setObject(id: unknown, obj: unknown, options: unknown, callback?: unknown): Promise<void> | void {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(id, 'id');
        Validator.assertObject(obj, 'obj');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertOptionalCallback(callback, 'callback');

        return this._setObject({ id, obj: obj as ioBroker.SettableObject, options, callback });
    }

    private async _setObject(options: InternalSetObjectOptions): Promise<void> {
        if (!this._defaultObjs) {
            this._defaultObjs = (await import('./defaultObjs.js')).createDefaults();
        }

        if (!options.obj) {
            this._logger.error(`${this.namespaceLog} setObject: try to set null object for ${options.id}`);
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_EMPTY_OBJECT);
        }

        // TODO: refactor the following checks in a separate validation method
        if (!tools.isObject(options.obj)) {
            this._logger.error(
                `${
                    this.namespaceLog
                } setForeignObject: type of object parameter expected to be an object, but "${typeof options.obj}" provided`,
            );
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_NO_OBJECT);
        }

        if (options.obj.type !== 'meta') {
            try {
                this._utils.validateId(options.id, false, null);
            } catch (e) {
                this._logger.error(tools.appendStackTrace(`${this.namespaceLog} ${e.message}`));
                return;
            }
        }

        if (options.obj.type) {
            if (!options.obj.native) {
                this._logger.warn(
                    `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property native missing!`,
                );
                options.obj.native = {};
            }
            // Check property 'common'
            if (!options.obj.common) {
                this._logger.warn(
                    `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property common missing!`,
                );
                // @ts-expect-error fix later on
                options.obj.common = {};
            } else if (options.obj.type === 'state') {
                // Try to extend the model for type='state'
                // Check property 'role' by 'state'
                if (options.obj.common.role && this._defaultObjs[options.obj.common.role]) {
                    options.obj.common = extend(
                        true,
                        {},
                        this._defaultObjs[options.obj.common.role],
                        options.obj.common,
                    );
                } else if (!options.obj.common.role) {
                    this._logger.warn(
                        `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property common.role missing!`,
                    );
                }
                if (!options.obj.common.type) {
                    this._logger.warn(
                        `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property common.type missing!`,
                    );
                }
                if (
                    'custom' in options.obj.common &&
                    options.obj.common.custom !== null &&
                    !tools.isObject(options.obj.common.custom)
                ) {
                    this._logger.error(
                        `${this.namespaceLog} setObject ${options.id} (type=${
                            options.obj.type
                        }) property common.custom is of type ${typeof options.obj.common.custom}, expected object.`,
                    );
                    return tools.maybeCallbackWithError(options.callback, 'common.custom needs to be an object');
                }
            } else if (options.obj.common) {
                if ('custom' in options.obj.common && options.obj.common.custom !== null) {
                    this._logger.warn(
                        `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property common.custom must not exist.`,
                    );
                    delete options.obj.common.custom;
                }
            }

            if (options.obj.common && !Object.prototype.hasOwnProperty.call(options.obj.common, 'name')) {
                options.obj.common.name = options.id;
                // it is a more unimportant warning as debug
                this._logger.debug(
                    `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property common.name missing, using id as name`,
                );
            }

            options.id = this._utils.fixId(options.id, false);

            if ('children' in options.obj || 'parent' in options.obj) {
                this._logger.warn(`${this.namespaceLog} Do not use parent or children for ${options.id}`);
            }

            options.obj.from = options.obj.from || `system.adapter.${this.namespace}`;
            options.obj.user = options.obj.user || (options.options ? options.options.user : '') || SYSTEM_ADMIN_USER;
            options.obj.ts = options.obj.ts || Date.now();

            this._setObjectWithDefaultValue(options.id, options.obj, options.options, options.callback);
        } else {
            this._logger.error(`${this.namespaceLog} setObject ${options.id} mandatory property type missing!`);
            return tools.maybeCallbackWithError(options.callback, 'mandatory property type missing!');
        }
    }

    /**
     * Helper method for `set[Foreign]Object[NotExists]` that also sets the default value if one is configured
     *
     * @param id of the object
     * @param obj The object to set
     * @param options optional user context
     * @param callback optional callback
     */
    private async _setObjectWithDefaultValue(
        id: string,
        obj: ioBroker.SettableObject,
        options?: Record<string, any> | null,
        callback?: ioBroker.SetObjectCallback,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback> | void> {
        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} setObject not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            tools.validateGeneralObjectProperties(obj, false);
        } catch (e) {
            await this.reportDeprecation({
                deprecationMessage: `Object ${id} is invalid: ${e.message}`,
                version: '7.0.0',
            });
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        try {
            const result = await this.#objects.setObjectAsync(id, obj, options);
            if (obj.type === 'state' && obj.common && obj.common.def !== undefined && obj.common.def !== null) {
                const state = await this.getForeignStateAsync(id);
                // only set the def state, if state is non-existent
                if (!state || state.val === undefined) {
                    await this.setForeignStateAsync(id, {
                        val: obj.common.def,
                        q: this.constants.STATE_QUALITY.SUBSTITUTE_INITIAL_VALUE,
                        ack: true,
                    });
                }
            }
            return tools.maybeCallbackWithError(callback, null, result);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }
    }

    // external signature
    getAdapterObjects(
        callback: (objects: Record<string, ioBroker.AdapterScopedObject>) => void,
    ): Promise<Record<string, ioBroker.AdapterScopedObject> | void>;

    /**
     * Get all states, channels and devices of this adapter.
     *
     * @param callback return result
     *        ```js
     *            function (objects) {
     *                for (var id in objects) {
     *                    adapter.log.debug(id);
     *                }
     *            }
     *        ```
     */
    getAdapterObjects(callback: unknown): Promise<Record<string, ioBroker.AdapterScopedObject> | void> {
        Validator.assertOptionalCallback(callback, 'callback');

        return this._getAdapterObjects({ callback });
    }

    private async _getAdapterObjects(
        options: InternalGetAdapterObjectsOptions,
    ): Promise<Record<string, ioBroker.AdapterScopedObject> | void> {
        const ret: Record<string, ioBroker.AdapterScopedObject> = {};
        // Adds result rows to the return object
        const addRows = (rows: any[] | undefined): void => {
            if (rows) {
                for (const { id, value } of rows) {
                    ret[id] = value;
                }
            }
        };

        if (!this.#objects) {
            return tools.maybeCallback(options.callback, ret);
        }

        const params = {
            startkey: `${this.namespace}.`,
            endkey: `${this.namespace}.\u9999`,
            include_docs: true,
        };

        try {
            const folders = await this.#objects.getObjectViewAsync('system', 'folder', params);
            if (folders) {
                addRows(folders.rows);
            }
        } catch {
            /* ignore, we'll return what we get till now */
        }
        try {
            const devices = await this.#objects.getObjectViewAsync('system', 'device', params);
            if (devices) {
                addRows(devices.rows);
            }
        } catch {
            /* ignore, we'll return what we get till now */
        }
        try {
            const channels = await this.#objects.getObjectViewAsync('system', 'channel', params);
            if (channels) {
                addRows(channels.rows);
            }
        } catch {
            /* ignore, we'll return what we get till now */
        }
        try {
            const states = await this.#objects.getObjectViewAsync('system', 'state', params);
            if (states) {
                addRows(states.rows);
            }
        } catch {
            /* ignore, we'll return what we get till now */
        }

        return tools.maybeCallback(options.callback, ret);
    }

    // public signatures
    extendObject(id: string, objPart: ioBroker.PartialObject): ioBroker.SetObjectPromise;
    extendObject(id: string, objPart: ioBroker.PartialObject, callback?: ioBroker.SetObjectCallback): void;
    extendObject(
        id: string,
        objPart: ioBroker.PartialObject,
        options: ioBroker.ExtendObjectOptions,
    ): ioBroker.SetObjectPromise;
    extendObject(
        id: string,
        objPart: ioBroker.PartialObject,
        options: ioBroker.ExtendObjectOptions,
        callback?: ioBroker.SetObjectCallback,
    ): void;

    /**
     * Extend some object and create it if it does not exist
     *
     * You can change or extend some object. E.g. existing object is:
     * ```js
     * {
     *   common: {
     *     name: 'Adapter name',
     *     desc: 'Description'
     *   },
     *   type: 'state',
     *   native: {
     *     unused: 'text'
     *  }
     * }
     * ```
     *
     * If following object will be passed as argument
     *
     * ```js
     * {
     *   common: {
     *     desc: 'New description',
     *     min: 0,
     *     max: 100
     *   },
     *   native: {
     *     unused: null
     *   }
     * }
     * ```
     *
     * We will get as output:
     * ```js
     * {
     *   common: {
     *     desc: 'New description',
     *     min: 0,
     *     max: 100
     *   },
     *   type: 'state',
     *   native: {}
     * }
     * ```
     *
     * @param id object ID, that must be extended
     * @param obj part that must be extended
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err, obj) {
     *                if (err) adapter.log.error(err);
     *                // obj is {"id": id}
     *            }
     *        ```
     */
    extendObject(id: unknown, obj: unknown, options?: unknown, callback?: unknown): Promise<any> | void {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertString(id, 'id');

        if (!obj) {
            this._logger.error(`${this.namespaceLog} extendObject: try to extend null object for ${id}`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_EMPTY_OBJECT);
        }

        if (!tools.isObject(obj)) {
            this._logger.error(
                `${
                    this.namespaceLog
                } extendObject: type of object parameter expected to be an object, but ${typeof obj} provided`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_NO_OBJECT);
        }

        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._extendObject({ id, obj: obj as ioBroker.SettableObject, options, callback });
    }

    // TODO: the public return type needs to be defined correctly, probably needs to be discussed
    private async _extendObject(options: InternalSetObjectOptions): Promise<any> {
        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} extendObject not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            tools.validateGeneralObjectProperties(options.obj, true);
        } catch (e) {
            await this.reportDeprecation({
                deprecationMessage: `Object ${options.id} is invalid: ${e.message}`,
                version: '7.0.0',
            });
        }

        try {
            this._utils.validateId(options.id, false, null);
        } catch (e) {
            return tools.maybeCallbackWithError(options.callback, e);
        }

        options.id = this._utils.fixId(options.id, false);
        options.id = this.fixForbiddenCharsInId(options.id);

        if ('children' in options.obj || 'parent' in options.obj) {
            this._logger.warn(`${this.namespaceLog} Do not use parent or children for ${options.id}`);
        }

        // Read whole object
        let oldObj;
        try {
            oldObj = await this.#objects.getObjectAsync(options.id, options.options);
        } catch (e) {
            return tools.maybeCallbackWithError(options.callback, e);
        }

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} extendObject not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        // remove the preserve attributes
        if (oldObj && options.options && tools.isObject(options.options.preserve)) {
            tools.removePreservedProperties(options.options.preserve, oldObj, options.obj);
        }

        // delete arrays if they should be changed
        if (
            options.obj &&
            ((options.obj.common && 'members' in options.obj.common) ||
                (options.obj.native && 'repositories' in options.obj.native) ||
                (options.obj.native && 'certificates' in options.obj.native) ||
                (options.obj.native && 'devices' in options.obj.native))
        ) {
            if (!oldObj) {
                this._logger.error(`${this.namespaceLog} Object ${options.id} not exist!`);
                oldObj = {};
            }
            if (
                options.obj.native &&
                'repositories' in options.obj.native &&
                oldObj.native &&
                oldObj.native.repositories
            ) {
                oldObj.native.repositories = [];
            }
            if (options.obj.common && 'members' in options.obj.common && oldObj.common && oldObj.common.members) {
                oldObj.common.members = [];
            }
            if (
                options.obj.native &&
                'certificates' in options.obj.native &&
                oldObj.native &&
                oldObj.native.certificates
            ) {
                oldObj.native.certificates = [];
            }
            if (options.obj.native && 'devices' in options.obj.native && oldObj.native && oldObj.native.devices) {
                oldObj.native.devices = [];
            }

            options.obj.from = options.obj.from || `system.adapter.${this.namespace}`;
            options.obj.user = options.obj.user || (options.options ? options.options.user : '') || SYSTEM_ADMIN_USER;
            options.obj.ts = options.obj.ts || Date.now();

            options.obj = extend(true, oldObj, options.obj);

            // @ts-expect-error TODO we are returning type Object for ease of use to devs, but formally these are AnyObjects, e.g. not guaranteed to have common
            return this.#objects.setObject(options.id, options.obj, options.options, options.callback);
        }
        options.obj.from = options.obj.from || `system.adapter.${this.namespace}`;
        options.obj.user = options.obj.user || (options.options ? options.options.user : '') || SYSTEM_ADMIN_USER;
        options.obj.ts = options.obj.ts || Date.now();

        if (
            (options.obj.type && options.obj.type === 'state') ||
            (!options.obj.type && oldObj && oldObj.type === 'state')
        ) {
            if (
                options.obj.common &&
                'custom' in options.obj.common &&
                options.obj.common.custom !== null &&
                !tools.isObject(options.obj.common.custom)
            ) {
                this._logger.error(
                    `${this.namespaceLog} extendObject ${options.id} (type=${
                        options.obj.type
                    }) property common.custom is of type ${typeof options.obj.common.custom}, expected object.`,
                );
                return tools.maybeCallbackWithError(options.callback, 'common.custom needs to be an object');
            }
        } else {
            if (options.obj.common && 'custom' in options.obj.common && options.obj.common.custom !== null) {
                this._logger.warn(
                    `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property common.custom must not exist.`,
                );
                delete options.obj.common.custom;
            }
        }

        if (!oldObj) {
            // if old object is not existing we behave like setObject
            return this.setForeignObject(options.id, options.obj, options.options, options.callback);
        }

        try {
            const cbObj = await this.#objects.extendObjectAsync(options.id, options.obj, options.options || {});
            let defState;
            if (options.obj.type === 'state' || oldObj.type === 'state') {
                if (options.obj.common && 'def' in options.obj.common && options.obj.common.def !== undefined) {
                    defState = options.obj.common.def;
                } else if (oldObj.common && oldObj.common.def !== undefined) {
                    defState = oldObj.common.def;
                }
            }

            if (defState !== undefined) {
                let currentStateObj;
                try {
                    currentStateObj = await this.getForeignStateAsync(options.id);
                } catch {
                    // do nothing
                }
                if (!currentStateObj) {
                    try {
                        await this.setForeignStateAsync(options.id, {
                            val: defState,
                            q: this.constants.STATE_QUALITY.SUBSTITUTE_INITIAL_VALUE,
                            ack: true,
                        });
                    } catch (e) {
                        this._logger.info(
                            `${this.namespaceLog} Default value for state "${options.id}" could not be set: ${e.message}`,
                        );
                    }
                }
            }
            return tools.maybeCallbackWithError(options.callback, null, cbObj);
        } catch (e) {
            return tools.maybeCallbackWithError(options.callback, e);
        }
    }

    // external signatures
    setForeignObject<T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        callback?: ioBroker.SetObjectCallback,
    ): void;
    setForeignObject<T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options: unknown,
        callback?: ioBroker.SetObjectCallback,
    ): void;

    /**
     * Same as {@link AdapterClass.setObject}, but for any object.
     *
     * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"
     *
     * @param id object ID, that must be overwritten or created.
     * @param obj new object
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err, obj) {
     *              // obj is {id: id}
     *              if (err) adapter.log.error('Cannot write object: ' + err);
     *            }
     *        ```
     */
    setForeignObject(id: unknown, obj: unknown, options: unknown, callback?: unknown): MaybePromise {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertString(id, 'id');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        if (!obj) {
            this._logger.error(`${this.namespaceLog} setForeignObject: try to set null object for ${id}`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_EMPTY_OBJECT);
        }

        if (!tools.isObject(obj)) {
            this._logger.error(
                `${
                    this.namespaceLog
                } setForeignObject: type of object parameter expected to be an object, but ${typeof obj} provided`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_NO_OBJECT);
        }

        return this._setForeignObject({ id, obj: obj as ioBroker.SettableObject, options, callback });
    }

    private _setForeignObject(_options: InternalSetObjectOptions): MaybePromise {
        const { options, callback, obj } = _options;
        let { id } = _options;

        obj.from = obj.from || `system.adapter.${this.namespace}`;
        obj.user = obj.user || options?.user || SYSTEM_ADMIN_USER;
        obj.ts = obj.ts || Date.now();

        id = this.fixForbiddenCharsInId(id);

        // check that alias is valid if given
        if (obj.common && 'alias' in obj.common && obj.common.alias.id) {
            // if alias is object validate read and write
            if (typeof obj.common.alias.id === 'object') {
                try {
                    this._utils.validateId(obj.common.alias.id.write, true, null);
                    this._utils.validateId(obj.common.alias.id.read, true, null);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, `Alias id is invalid: ${e.message}`);
                }

                if (
                    obj.common.alias.id.write.startsWith(ALIAS_STARTS_WITH) ||
                    obj.common.alias.id.read.startsWith(ALIAS_STARTS_WITH)
                ) {
                    return tools.maybeCallbackWithError(callback, 'Aliases cannot be used as target for aliases');
                }
            } else {
                try {
                    this._utils.validateId(obj.common.alias.id, true, null);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, `Alias id is invalid: ${e.message}`);
                }

                if (obj.common.alias.id.startsWith(ALIAS_STARTS_WITH)) {
                    return tools.maybeCallbackWithError(callback, 'Aliases cannot be used as target for aliases');
                }
            }
        }

        this._setObjectWithDefaultValue(id, obj, options, callback);
    }

    // external signatures
    extendForeignObject<T extends string>(
        id: T,
        objPart: ioBroker.PartialObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        callback?: ioBroker.SetObjectCallback,
    ): void;
    extendForeignObject<T extends string>(
        id: T,
        objPart: ioBroker.PartialObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options: ioBroker.ExtendObjectOptions,
        callback?: ioBroker.SetObjectCallback,
    ): void;

    /**
     * Same as {@link AdapterClass.extendObject}, but for any object.
     *
     * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"
     *
     * @param id object ID, that must be extended
     * @param obj part that must be extended
     * @param options optional user context, or use attribute preserve e.g. `{preserve: {common: ['name']}}` to preserve common.name
     * @param callback return result
     *        ```js
     *            function (err, obj) {
     *                // obj is {"id": id}
     *                if (err) adapter.log.error(err);
     *            }
     *        ```
     */
    extendForeignObject(
        id: unknown,
        obj: unknown,
        options: unknown,
        callback?: unknown,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback> | void> | void {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertOptionalCallback(callback, 'callback');

        try {
            this._utils.validateId(id, true, null);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        Validator.assertString(id, 'id');

        if (!obj) {
            this._logger.error(`${this.namespaceLog} extendForeignObject: try to set null object for ${id}`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_EMPTY_OBJECT);
        }

        Validator.assertObject(obj, 'obj');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertOptionalCallback(callback, 'callback');

        return this._extendForeignObjectAsync({
            id: this.fixForbiddenCharsInId(id),
            obj: obj as ioBroker.SettableObject,
            callback,
            options,
        });
    }

    private async _extendForeignObjectAsync(
        _options: InternalSetObjectOptions,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback> | void> {
        const { id, callback, options } = _options;
        let { obj } = _options;

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} extendForeignObject not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        // Read whole object
        let oldObj;
        try {
            oldObj = await this.#objects.getObjectAsync(id, options);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        // remove the preserve attributes
        if (oldObj && options && tools.isObject(options.preserve)) {
            tools.removePreservedProperties(options.preserve, oldObj, obj);
        }

        // delete arrays if they should be changed
        if (
            obj &&
            ((obj.common && 'members' in obj.common) ||
                (obj.native && 'repositories' in obj.native) ||
                (obj.native && 'certificates' in obj.native) ||
                (obj.native && 'devices' in obj.native))
        ) {
            if (!oldObj) {
                this._logger.error(`${this.namespaceLog} Object ${id} not exist!`);
                oldObj = {};
            }
            if (obj.native && 'repositories' in obj.native && oldObj.native && oldObj.native.repositories) {
                oldObj.native.repositories = [];
            }
            if (obj.common && 'members' in obj.common && oldObj.common && oldObj.common.members) {
                oldObj.common.members = [];
            }
            if (obj.native && 'certificates' in obj.native && oldObj.native && oldObj.native.certificates) {
                oldObj.native.certificates = [];
            }
            if (obj.native && 'devices' in obj.native && oldObj.native && oldObj.native.devices) {
                oldObj.native.devices = [];
            }

            obj.from = obj.from || `system.adapter.${this.namespace}`;
            obj.user = obj.user || options?.user || SYSTEM_ADMIN_USER;
            obj.ts = obj.ts || Date.now();

            obj = extend(true, oldObj, obj);

            // @ts-expect-error TODO we are returning type Object for ease of use to devs, but formally these are AnyObjects, e.g. not guaranteed to have common
            return this.#objects.setObject(id, obj, options, callback);
        }
        obj.from = obj.from || `system.adapter.${this.namespace}`;
        obj.user = obj.user || options?.user || SYSTEM_ADMIN_USER;
        obj.ts = obj.ts || Date.now();

        if ((obj.type && obj.type === 'state') || (!obj.type && oldObj && oldObj.type === 'state')) {
            if (
                obj.common &&
                'custom' in obj.common &&
                obj.common.custom !== null &&
                !tools.isObject(obj.common.custom)
            ) {
                this._logger.error(
                    `${this.namespaceLog} extendObject ${id} (type=${
                        obj.type
                    }) property common.custom is of type ${typeof obj.common.custom}, expected object.`,
                );
                return tools.maybeCallbackWithError(callback, 'common.custom needs to be an object');
            }
        } else {
            if (obj.common && 'custom' in obj.common && obj.common.custom !== null) {
                this._logger.warn(
                    `${this.namespaceLog} setObject ${id} (type=${obj.type}) property common.custom must not exist.`,
                );
                delete obj.common.custom;
            }
        }

        if (!oldObj) {
            // if old object is not existing we behave like setObject
            return this.setForeignObject(id, obj, options, callback);
        }

        try {
            const cbObj = await this.#objects.extendObjectAsync(id, obj, options || {});
            if (cbObj?.value.type === 'state') {
                let defState;
                if (obj.common && 'def' in obj.common && obj.common.def !== undefined) {
                    defState = obj.common.def;
                } else if (oldObj.common && oldObj.common.def !== undefined) {
                    defState = oldObj.common.def;
                }
                if (defState !== undefined) {
                    let currentStateObj;
                    try {
                        currentStateObj = await this.getForeignStateAsync(id);
                    } catch {
                        // do nothing
                    }
                    if (!currentStateObj) {
                        try {
                            await this.setForeignStateAsync(id, {
                                val: defState,
                                q: this.constants.STATE_QUALITY.SUBSTITUTE_INITIAL_VALUE,
                                ack: true,
                            });
                        } catch (e) {
                            this._logger.info(
                                `${this.namespaceLog} Default value for state "${id}" could not be set: ${e.message}`,
                            );
                        }
                    }
                }
            }

            return tools.maybeCallbackWithError(callback, null, cbObj);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }
    }

    // external signature
    objectExists(id: string, options?: Record<string, any> | null): Promise<boolean | void>;

    /**
     * Checks if an object exists to the given id, id will be fixed first
     *
     * @param id id of the object
     * @param options optional user context
     */
    objectExists(id: unknown, options: unknown): Promise<boolean | void> {
        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} objectExists not processed because Objects database not connected`);
            return Promise.resolve();
        }

        Validator.assertString(id, 'id');
        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }

        id = this._utils.fixId(id);

        this._utils.validateId(id, false, null);

        return this.#objects.objectExists(id, options);
    }

    // external signature
    foreignObjectExists(id: string, options?: Record<string, any> | null): Promise<boolean | void>;

    /**
     * Checks if an object exists to the given id
     *
     * @param id id of the object
     * @param options optional user context
     */
    foreignObjectExists(id: unknown, options: unknown): Promise<boolean | void> {
        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} foreignObjectExists not processed because Objects database not connected`,
            );
            return Promise.resolve();
        }

        Validator.assertString(id, 'id');
        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }

        this._utils.validateId(id, true, null);

        return this.#objects.objectExists(id, options);
    }

    // external signature
    getObject(id: string, callback: ioBroker.GetObjectCallback): void;
    getObject(id: string, options: unknown, callback: ioBroker.GetObjectCallback): void;

    /**
     * Get object of this instance.
     *
     * It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.
     *
     * @param id exactly object ID (without namespace)
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err, obj) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *            }
     *        ```
     */
    getObject(id: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertCallback(callback, 'callback');
        Validator.assertString(id, 'id');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} getObject not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, false, null);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        this.#objects.getObject(this._utils.fixId(id), options, callback);
    }

    getObjectView<Design extends string = string, Search extends string = string>(
        design: Design,
        search: Search,
        params: ioBroker.GetObjectViewParams | null | undefined,
        callback: ioBroker.GetObjectViewCallback<ioBroker.InferGetObjectViewItemType<Design, Search>>,
    ): void;
    getObjectView<Design extends string = string, Search extends string = string>(
        design: Design,
        search: Search,
        params: ioBroker.GetObjectViewParams | null | undefined,
        options: unknown,
        callback: ioBroker.GetObjectViewCallback<ioBroker.InferGetObjectViewItemType<Design, Search>>,
    ): void;

    /**
     * Read object view from DB.
     *
     * It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
     * to get all objects of the instance.
     *
     * @param design name of the design
     * @param search name of the view
     * @param params object containing startkey: first id to include in result; endkey: last id to include in result
     * @param options additional objects, e.g. for permissions
     * @param callback return result
     *      ```js
     *          function (err, doc) {
     *              if (doc && doc.rows) {
     *                   for (var i = 0; i < doc.rows.length; i++) {
     *                       var id  = doc.rows[i].id;
     *                        var obj = doc.rows[i].value;
     *                        adapter.log.info('Found ' + id + ': ' + JSON.stringify(obj));
     *                   }
     *                           if (!doc.rows.length) adapter.log.info('No objects found.');
     *               } else {
     *                   adapter.log.info('No objects found: ' + err);
     *               }
     *           }
     *           ```
     */
    getObjectView(
        design: unknown,
        search: unknown,
        params: unknown,
        options: unknown,
        callback?: unknown,
    ): void | ioBroker.GetObjectViewPromise<any> {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }

        Validator.assertString(design, 'design');
        Validator.assertString(search, 'search');
        Validator.assertOptionalCallback(callback, 'callback');
        params = params || {};
        Validator.assertObject(params, 'params');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._getObjectView({ design, search, params, options, callback });
    }

    private _getObjectView(_options: InternalGetObjectViewOptions): void | ioBroker.GetObjectViewPromise<any> {
        const { design, search, params, options, callback } = _options;

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} getObjectView not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        // Limit search ranges for system views to the relevant namespaces
        // to prevent too wide searches where the objects never will be
        if (design === 'system' && !params.startkey && (!params.endkey || params.endkey === '\u9999')) {
            switch (search) {
                case 'host':
                    params.startkey = 'system.host.';
                    params.endkey = 'system.host.\u9999';
                    break;
                case 'adapter':
                case 'instance':
                case 'instanceStats':
                    params.startkey = 'system.adapter.';
                    params.endkey = 'system.adapter.\u9999';
                    break;
                case 'enum':
                    params.startkey = 'enum.';
                    params.endkey = 'enum.\u9999';
                    break;
                case 'script':
                    params.startkey = 'script.';
                    params.endkey = 'script.\u9999';
                    break;
                case 'group':
                    params.startkey = 'system.group.';
                    params.endkey = 'system.group.\u9999';
                    break;
                case 'user':
                    params.startkey = 'system.user.';
                    params.endkey = 'system.user.\u9999';
                    break;
                case 'config':
                    params.startkey = 'system.';
                    params.endkey = 'system.\u9999';
                    break;
            }
        }

        // @ts-expect-error fix it
        return this.#objects.getObjectView(design, search, params, options, callback);
    }

    // external signatures
    getObjectList(
        params: ioBroker.GetObjectListParams | null,
        callback: ioBroker.GetObjectListCallback<ioBroker.Object>,
    ): void;
    getObjectList(
        params: ioBroker.GetObjectListParams | null,
        options: { sorted?: boolean } | Record<string, any>,
        callback: ioBroker.GetObjectListCallback<ioBroker.Object>,
    ): void;

    /**
     * Read object list from DB.
     *
     * It is required, that ID consists namespace in startkey and endkey. E.g. `{startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}`
     * to get all objects of the instance.
     *
     * @param params startkey and endkey information
     * @param options additional options, e.g. for permissions
     * @param callback optional callback
     *      ```js
     *          function (err, res) {
     *              if (res && res.rows) {
     *                   for (var i = 0; i < res.rows.length; i++) {
     *                       var id  = res.rows[i].id;
     *                       var obj = res.rows[i].value;
     *                       adapter.log.info('Found ' + id + ': ' + JSON.stringify(obj));
     *                   }
     *                   if (!res.rows.length) adapter.log.info('No objects found.');
     *              } else {
     *                  adapter.log.info('No objects found: ' + err);
     *              }
     *          }
     *       ```
     */
    getObjectList(params: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        Validator.assertObject(params, 'params');
        Validator.assertOptionalCallback(callback, 'callback');

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} getObjectList not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#objects.getObjectList(params, options, callback);
    }

    // external signatures
    getEnum(callback: ioBroker.GetEnumCallback): void;
    getEnum(name: string, callback: ioBroker.GetEnumCallback): void;
    getEnum(name: string, options: unknown, callback: ioBroker.GetEnumCallback): void;

    /**
     * Get the enum tree.
     *
     * Get enums of specified tree or all enums if nothing specified as object with values.
     * If getEnum called with no enum specified, all enums will be returned:
     * ```js
     *      adapter.getEnums(function (err, enums, requestEnum) {
     *        // All enums
     *        if (err) adapter.log.error('Cannot get object: ' + err);
     *        for (var e in enums) {
     *           adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
     *        }
     *      });
     * ```
     *
     * @param _enum enum name, e.g. 'rooms', 'function' or '' (all enums)
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err, enums, requestEnum) {
     *              // requestEnum is _enum
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *              for (var e in enums) {
     *                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
     *              }
     *            }
     *        ```
     */
    getEnum(_enum: unknown, options?: unknown, callback?: unknown): any {
        if (typeof _enum === 'function') {
            callback = _enum;
            options = null;
            _enum = '';
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(_enum, '_enum');
        Validator.assertOptionalCallback(callback, 'callback');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._getEnum({ _enum, options, callback });
    }

    private _getEnum(_options: InternalGetEnumOptions): Promise<void> | void {
        const { options, callback } = _options;
        let { _enum } = _options;

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} getEnum not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!_enum.startsWith('enum.')) {
            _enum = `enum.${_enum}`;
        }
        const result: Record<string, ioBroker.EnumObject> = {};

        this.#objects.getObjectView(
            'system',
            'enum',
            {
                startkey: `${_enum}.`,
                endkey: `${_enum}.\u9999`,
            },
            options,
            (err, res) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }
                if (res?.rows) {
                    for (const row of res.rows) {
                        result[row.id] = row.value;
                    }
                }
                return tools.maybeCallbackWithError(callback, err, result, _enum);
            },
        );
    }

    // public signatures
    getEnums(callback: ioBroker.GetEnumsCallback): void;
    getEnums(enumList: ioBroker.EnumList, callback: ioBroker.GetEnumsCallback): void;
    getEnums(enumList: ioBroker.EnumList, options: unknown, callback: ioBroker.GetEnumsCallback): void;

    /**
     * Read the members of given enums.
     *
     * Get enums of specified tree or all enums if nothing specified as object with values.
     *
     * @param _enumList enum name or names, e.g. ['rooms', 'function']
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err, enums) {
     *              // requestEnum is _enum
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *              // Result is like
     *              // {
     *              //    "enum.rooms": {
     *              //       "enum.rooms.livingroom": {
     *              //           common: {
     *              //              members: ['ID1', 'ID2']
     *              //           }
     *              //       },
     *              //       "enum.rooms.sleepingroom": {
     *              //           common: {
     *              //              members: ['ID3', 'ID4']
     *              //           }
     *              //       }
     *              //    },
     *              //    "enum.functions": {
     *              //       "enum.rooms.light": {
     *              //           common: {
     *              //              members: ['ID1', 'ID6']
     *              //           }
     *              //       },
     *              //       "enum.rooms.weather": {
     *              //           common: {
     *              //              members: ['ID4', 'ID7']
     *              //           }
     *              //       }
     *              //    }
     *              // }
     *            }
     *        ```
     */
    getEnums(
        _enumList: unknown,
        options?: unknown,
        callback?: unknown,
    ): Promise<{ [groupName: string]: Record<string, ioBroker.EnumObject> } | void> {
        if (typeof _enumList === 'function') {
            callback = _enumList;
            _enumList = undefined;
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertOptionalCallback(callback, 'callback');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._getEnums({ _enumList: _enumList as ioBroker.EnumList | undefined, options, callback });
    }

    private async _getEnums(
        _options: InternalGetEnumsOptions,
    ): Promise<{ [groupName: string]: Record<string, ioBroker.EnumObject> } | void> {
        const { options, callback } = _options;
        let { _enumList } = _options;

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} getEnums not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        const _enums: {
            [groupName: string]: Record<string, ioBroker.EnumObject>;
        } = {};
        if (_enumList) {
            if (typeof _enumList === 'string') {
                _enumList = [_enumList];
            }
            const promises = [];

            for (const currEnum of _enumList) {
                promises.push(
                    new Promise<void>((resolve, reject) =>
                        this.getEnum(currEnum, options, (err, list, _enum) => {
                            if (err) {
                                return reject(err);
                            } else if (list && _enum) {
                                _enums[_enum] = list;
                            }
                            resolve();
                        }),
                    ),
                );
            }

            try {
                await Promise.all(promises);
                return tools.maybeCallbackWithError(callback, null, _enums);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        } else {
            // Read all enums
            this.#objects.getObjectView(
                'system',
                'enum',
                {
                    startkey: 'enum.',
                    endkey: 'enum.\u9999',
                },
                options,
                (err, res) => {
                    // be aware, that res.rows[x].id is the name of enum!
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                    const result: {
                        [groupName: string]: Record<string, ioBroker.EnumObject>;
                    } = {};
                    if (res?.rows) {
                        for (const row of res.rows) {
                            const parts: string[] = row.id.split('.', 3);
                            if (!parts[2]) {
                                continue;
                            }
                            if (!result[`${parts[0]}.${parts[1]}`]) {
                                result[`${parts[0]}.${parts[1]}`] = {};
                            }
                            result[`${parts[0]}.${parts[1]}`][row.id] = row.value;
                        }
                    }

                    return tools.maybeCallbackWithError(callback, err, result);
                },
            );
        }
    }

    // external signatures
    getForeignObjects(patter: Pattern): Promise<ioBroker.NonNullCallbackReturnTypeOf<ioBroker.GetObjectsCallback>>;
    getForeignObjects(pattern: Pattern, callback: ioBroker.GetObjectsCallback): void;
    getForeignObjects(pattern: Pattern, options: unknown, callback: ioBroker.GetObjectsCallback): void;
    getForeignObjects<T extends ioBroker.ObjectType>(
        pattern: Pattern,
        type: T,
        callback: ioBroker.GetObjectsCallbackTyped<T>,
    ): void;
    getForeignObjects<T extends ioBroker.ObjectType>(
        pattern: Pattern,
        type: T,
        enums: ioBroker.EnumList,
        callback: ioBroker.GetObjectsCallbackTyped<T>,
    ): void;
    getForeignObjects<T extends ioBroker.ObjectType>(
        pattern: Pattern,
        type: T,
        options: unknown,
        callback: ioBroker.GetObjectsCallbackTyped<T>,
    ): void;
    getForeignObjects<T extends ioBroker.ObjectType>(
        pattern: Pattern,
        type: T,
        enums: ioBroker.EnumList | null,
        options: unknown,
        callback: ioBroker.GetObjectsCallbackTyped<T>,
    ): void;
    /**
     * Get objects by pattern, by specific type and resolve their enums.
     *
     * Get all objects in the system of specified type. E.g.:
     *
     * ```js
     * adapter.getForeignObjects('hm-rega.0.*', 'state', ['rooms', 'functions'], function (err, objs) {
     *   if (err) adapter.log.error('Cannot get object: ' + err);
     *   // objs look like:
     *   // {
     *   //    "hm-rega.0.ABC0000.1.STATE": {
     *   //        common: {...},
     *   //        native: {},
     *   //        type: 'state',
     *   //        enums: {
     *   //           'enums.rooms.livingroom': 'Living room',
     *   //           'enums.functions.light': 'Light'
     *   //       }
     *   //    },
     *   //    "hm-rega.0.ABC0000.2.STATE": {
     *   //        common: {...},
     *   //        native: {},
     *   //        type: 'state',
     *   //        enums: {
     *   //           'enums.rooms.sleepingroom': 'Sleeping room',
     *   //           'enums.functions.window': 'Windows'
     *   //       }
     *   //    }
     * }
     * ```
     *
     * @param pattern object ID/wildcards
     * @param type type of object: 'state', 'channel' or 'device'. Default - 'state'
     * @param enums object ID, that must be overwritten or created.
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err, obj) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *            }
     *        ```
     */
    getForeignObjects(
        pattern: unknown,
        type?: unknown,
        enums?: unknown,
        options?: unknown,
        callback?: unknown,
    ): Promise<ioBroker.NonNullCallbackReturnTypeOf<ioBroker.GetObjectsCallback> | void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (typeof enums === 'function') {
            callback = enums;
            enums = undefined;
        }
        if (typeof type === 'function') {
            callback = type;
            type = undefined;
        }
        if (typeof type === 'object') {
            options = type;
            type = undefined;
        }
        if (typeof enums === 'object' && !Array.isArray(enums)) {
            options = enums;
            enums = undefined;
        }

        Validator.assertOptionalCallback(callback, 'callback');

        Validator.assertPattern(pattern, 'pattern');

        if (type !== undefined) {
            Validator.assertString(type, 'type');
        }

        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._getForeignObjects({
            pattern,
            type,
            enums: enums as ioBroker.EnumList | undefined,
            options,
            callback,
        });
    }

    private async _getForeignObjects(
        _options: InternalGetObjectsOptions,
    ): Promise<ioBroker.NonNullCallbackReturnTypeOf<ioBroker.GetObjectsCallback> | void> {
        const { options, callback, type, pattern, enums } = _options;

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} getForeignObjects not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        let objs: (ioBroker.AnyObject | null)[];

        if (Array.isArray(pattern)) {
            try {
                objs = await this.#objects.getObjects(pattern, options);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        } else {
            let params: ioBroker.GetObjectViewParams = {};

            if (pattern && pattern !== '*') {
                params = {
                    startkey: pattern.replace(/\*/g, ''),
                    endkey: pattern.replace(/\*/g, '\u9999'),
                };
            }

            try {
                const res = await this.#objects.getObjectView('system', type || 'state', params, options);
                objs = res.rows.map(row => row.value);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        }

        // don't forget, that enums returns names in row[x].id and not IDs, you can find id in rows[x].value._id
        let _enums;
        try {
            _enums = await this.getEnumsAsync(enums);
        } catch (e) {
            this._logger.warn(`Cannot get enums on getForeignObjects: ${e.message}`);
        }

        const list: Record<string, any> = {};

        for (let i = 0; i < objs.length; i++) {
            const obj = objs[i];
            if (!obj) {
                // It is not so important warning, so print it as debug
                this._logger.debug(
                    `${this.namespaceLog} getEnums(${JSON.stringify(
                        enums,
                    )}) returned an enum without a value at index ${i}, obj - ${JSON.stringify(obj)}`,
                );
                continue;
            }

            const id: string = obj._id;
            list[id] = obj;
            if (_enums && id) {
                // get device or channel of this state and check it too
                const parts = id.split('.');
                parts.splice(parts.length - 1, 1);
                const channel = parts.join('.');
                parts.splice(parts.length - 1, 1);
                const device = parts.join('.');

                list[id].enums = {};
                for (const _enum of Object.values(_enums)) {
                    for (const [enumID, enumObj] of Object.entries(_enum)) {
                        if (!enumObj?.common?.members) {
                            continue;
                        }

                        if (
                            enumObj.common.members.includes(id) ||
                            enumObj.common.members.includes(channel) ||
                            enumObj.common.members.includes(device)
                        ) {
                            list[id].enums[enumID] = enumObj.common.name;
                        }
                    }
                }
            }
            // remove protectedNative if not admin, not cloud or not own adapter
            if (
                obj &&
                'protectedNative' in obj &&
                Array.isArray(obj.protectedNative) &&
                obj.native &&
                id &&
                id.startsWith('system.adapter.') &&
                !NO_PROTECT_ADAPTERS.includes(this.name) &&
                this.name !== id.split('.')[2]
            ) {
                for (const attr of obj.protectedNative) {
                    delete obj.native[attr];
                }
            }
        }
        return tools.maybeCallbackWithError(callback, null, list);
    }

    // external signature
    findForeignObject(idOrName: string, type: string | null, callback: ioBroker.FindObjectCallback): void;
    findForeignObject(
        idOrName: string,
        type: string | null,
        options: unknown,
        callback: ioBroker.FindObjectCallback,
    ): void;

    /**
     * Find any object by name or ID.
     *
     * Find object by the exact name or ID.
     *
     * @param id exactly object ID (without namespace)
     * @param type optional common.type of state: 'number', 'string', 'boolean', 'file', ...
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            adapter.findForeignObject('Some name', function (err, id, name) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *              adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');
     *            }
     *        ```
     */
    findForeignObject(id: unknown, type: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof type === 'function') {
            callback = type;
            type = null;
        }

        Validator.assertCallback(callback, 'callback');
        if (type !== null) {
            Validator.assertString(type, 'type');
        }
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} findForeignObject not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, null);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        this.#objects.findObject(id, type, options || {}, callback);
    }

    // external signatures
    getForeignObject<T extends string>(
        id: T,
        callback: ioBroker.GetObjectCallback<T>,
    ): void | Promise<void | ioBroker.ObjectIdToObjectType<T> | null>;
    getForeignObject<T extends string>(
        id: T,
        options: unknown,
        callback: ioBroker.GetObjectCallback<T>,
    ): void | Promise<void | ioBroker.ObjectIdToObjectType<T> | null>;

    /**
     * Get any object.
     *
     * ID must be specified with namespace.
     *
     * @param id exactly object ID (with namespace)
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err, obj) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *            }
     *        ```
     */
    getForeignObject(
        id: unknown,
        options: unknown,
        callback?: unknown,
    ): void | Promise<void | ioBroker.AnyObject | null> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertOptionalCallback(callback, 'callback');
        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        return this._getForeignObject({ id, options, callback });
    }

    private async _getForeignObject(options: InternalGetObjectOptions): Promise<void | ioBroker.AnyObject | null> {
        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} getForeignObject not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            const obj = await this.#objects.getObjectAsync(options.id, options);
            // remove protectedNative if not admin, not cloud or not own adapter
            if (
                obj &&
                'protectedNative' in obj &&
                Array.isArray(obj.protectedNative) &&
                obj._id &&
                obj._id.startsWith('system.adapter.') &&
                obj.native &&
                !NO_PROTECT_ADAPTERS.includes(this.name) &&
                this.name !== obj._id.split('.')[2]
            ) {
                for (const attr of obj.protectedNative) {
                    delete obj.native[attr];
                }
            }

            return tools.maybeCallbackWithError(options.callback, null, obj);
        } catch (e) {
            return tools.maybeCallbackWithError(options.callback, e);
        }
    }

    delObject(id: string, callback?: ioBroker.ErrorCallback): void;
    delObject(id: string, options?: ioBroker.DelObjectOptions | null, callback?: ioBroker.ErrorCallback): void;

    /**
     * Delete an object of this instance.
     *
     * It is not required to provide the adapter namespace, because it will automatically be added.
     * E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.
     *
     * The corresponding state will be deleted too if the object has type "state".
     *
     * @param id exactly object ID (without namespace)
     * @param options optional user context. E.g. recursive option could be true
     * @param callback return result
     *        ```js
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete object: ' + err);
     *            }
     *        ```
     */
    delObject(id: unknown, options: unknown, callback?: unknown): any {
        Validator.assertString(id, 'id');

        // delObject does the same as delForeignObject, but fixes the ID first
        id = this._utils.fixId(id);

        // @ts-expect-error we have ensured that it is string for the rest the method will validate again
        this.delForeignObject(id, options, callback);
    }

    private _deleteObjects(
        tasks: { id: string; [other: string]: any }[],
        options: Record<string, any>,
        cb?: () => void,
    ): void | Promise<void> {
        if (!tasks || !tasks.length) {
            return tools.maybeCallback(cb);
        }
        const task = tasks.shift();
        this.#objects!.delObject(task!.id, options, async err => {
            if (err) {
                return tools.maybeCallbackWithError(cb, err);
            }
            if (task!.state) {
                try {
                    await this.delForeignStateAsync(task!.id, options);
                } catch (e) {
                    this._logger.warn(`${this.namespaceLog} Could not remove state of ${task!.id}: ${e.message}`);
                }
            }
            try {
                await tools.removeIdFromAllEnums(this.#objects, task!.id, this.enums);
            } catch (e) {
                this._logger.warn(`${this.namespaceLog} Could not remove ${task!.id} from enums: ${e.message}`);
            }
            setImmediate(() => this._deleteObjects(tasks, options, cb));
        });
    }

    delForeignObject(id: string, callback?: ioBroker.ErrorCallback): void;
    delForeignObject(id: string, options: ioBroker.DelObjectOptions, callback?: ioBroker.ErrorCallback): void;

    /**
     * Delete any object.
     *
     * The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".
     *
     * @param id exactly object ID (with namespace)
     * @param options optional user context or `{ recursive: true }` to delete all underlying objects
     * @param callback return result
     *        ```js
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete object: ' + err);
     *            }
     *        ```
     */
    delForeignObject(id: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(id, 'id');
        Validator.assertOptionalCallback(callback, 'callback');
        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} delForeignObject not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        Validator.assertOptionalCallback(callback, 'callback');

        return this._delForeignObject({ id, options, callback });
    }

    private _delForeignObject(_options: InternalDelObjectOptions): void {
        const { id, options, callback } = _options;

        // If recursive deletion of all underlying objects, including id
        if (options?.recursive) {
            // read object itself
            this.#objects!.getObject(id, options, (err, obj) => {
                const tasks =
                    obj && (!obj.common || !obj.common.dontDelete) ? [{ id, state: obj.type === 'state' }] : [];

                const selector = { startkey: `${id}.`, endkey: `${id}.\u9999` };
                // read all underlying states
                this.#objects!.getObjectList(selector, options, (err, res) => {
                    res &&
                        res.rows.forEach(
                            (item: ioBroker.GetObjectListItem<ioBroker.Object>) =>
                                !tasks.find(task => task.id === item.id) &&
                                (!item.value || !item.value.common || !item.value.common.dontDelete) && // exclude objects with dontDelete flag
                                tasks.push({ id: item.id, state: item.value && item.value.type === 'state' }),
                        );
                    this._deleteObjects(tasks, options, callback);
                });
            });
        } else {
            this.#objects!.getObject(id, options, async (err, obj) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else if (obj) {
                    // do not allow deletion of objects with dontDelete flag
                    if (obj.common?.dontDelete) {
                        return tools.maybeCallbackWithError(callback, new Error('not deletable'));
                    }

                    try {
                        await this.#objects!.delObject(obj._id, options);
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, e);
                    }
                    if (obj.type === 'state') {
                        try {
                            await this.delForeignStateAsync(id, options);
                        } catch {
                            // Ignore
                        }
                    }
                    try {
                        await tools.removeIdFromAllEnums(this.#objects, id, this.enums);
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, e);
                    }
                }
                return tools.maybeCallback(callback);
            });
        }
    }

    // external signatures
    subscribeObjects(pattern: Pattern, callback?: ioBroker.ErrorCallback): void;
    subscribeObjects(pattern: Pattern, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Subscribe for the changes of objects in this instance.
     *
     * @param pattern pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces
     * @param options optional user context
     * @param callback optional returns result
     *        ```js
     *            function (err) {
     *              if (err) adapter.log.error('Cannot subscribe object: ' + err);
     *            }
     *        ```
     */
    subscribeObjects(pattern: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }

        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertPattern(pattern, 'pattern');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} subscribeObjects not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (pattern === '*') {
            this.#objects.subscribeUser(`${this.namespace}.*`, options, callback);
        } else {
            const fixedPattern = Array.isArray(pattern) ? pattern : this._utils.fixId(pattern, true);
            this.#objects.subscribeUser(fixedPattern, options, callback);
        }
    }

    unsubscribeObjects(pattern: Pattern, callback?: ioBroker.ErrorCallback): void;
    unsubscribeObjects(pattern: Pattern, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Unsubscribe on the changes of objects in this instance.
     *
     * @param pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
     * @param options optional user context
     * @param callback optional returns result
     *        ```js
     *            function (err) {
     *              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
     *            }
     *        ```
     */
    unsubscribeObjects(pattern: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }

        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertPattern(pattern, 'pattern');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} unsubscribeObjects not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (pattern === '*') {
            this.#objects.unsubscribeUser(`${this.namespace}.*`, options, callback);
        } else {
            const fixedPattern = Array.isArray(pattern) ? pattern : this._utils.fixId(pattern, true);
            this.#objects.unsubscribeUser(fixedPattern, options, callback);
        }
    }

    // external signatures
    subscribeForeignObjects(pattern: string | string[], callback?: ioBroker.ErrorCallback): void;
    subscribeForeignObjects(pattern: string | string[], options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Subscribe for the changes of objects in any instance.
     *
     * @param pattern pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns
     * @param options optional user context
     * @param callback optional returns result
     *        ```js
     *            function (err) {
     *              if (err) adapter.log.error('Cannot subscribe object: ' + err);
     *            }
     *        ```
     */
    subscribeForeignObjects(pattern: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }

        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertPattern(pattern, 'pattern');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} subscribeForeignObjects not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#objects.subscribeUser(pattern, options, callback);
    }

    // external signatures
    unsubscribeForeignObjects(pattern: string | string[], callback?: ioBroker.ErrorCallback): void;
    unsubscribeForeignObjects(pattern: string | string[], options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Unsubscribe for the patterns on all objects.
     *
     * @param pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
     * @param options optional user context
     * @param callback optional returns result
     *        ```js
     *            function (err) {
     *              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
     *            }
     *        ```
     */
    unsubscribeForeignObjects(pattern: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }
        if (!pattern) {
            pattern = '*';
        }

        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertPattern(pattern, 'pattern');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} unsubscribeForeignObjects not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#objects.unsubscribeUser(pattern, options, callback);
    }

    // external signatures
    subscribeForeignFiles(id: string, pattern: string | string[], options?: unknown): Promise<void>;

    /**
     * Subscribe for the changes of files in specific instance.
     *
     * @param id adapter ID like 'vis-2.0' or 'vis-2.admin'
     * @param pattern pattern like 'channel.*' or '*' (all files) - without namespaces. You can use array of patterns
     * @param options optional user context
     */
    subscribeForeignFiles(id: unknown, pattern: unknown, options?: unknown): Promise<void> {
        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} subscribeForeignFiles not processed because Objects database not connected`,
            );

            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        Validator.assertString(id, 'id');
        Validator.assertPattern(pattern, 'pattern');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this.#objects.subscribeUserFile(id, pattern, options);
    }

    // external signatures
    unsubscribeForeignFiles(id: string, pattern: string | string[], options?: unknown): Promise<void>;

    /**
     * Unsubscribe for the changes of files on specific instance.
     *
     * @param id adapter ID like 'vis-2.0' or 'vis-2.admin'
     * @param pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
     * @param options optional user context
     */
    unsubscribeForeignFiles(id: unknown, pattern: unknown, options?: unknown): Promise<void> {
        if (!pattern) {
            pattern = '*';
        }
        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} unsubscribeForeignFiles not processed because Objects database not connected`,
            );

            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        Validator.assertString(id, 'id');
        Validator.assertPattern(pattern, 'pattern');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this.#objects.unsubscribeUserFile(id, pattern, options);
    }

    // external signatures
    setObjectNotExists(
        id: string,
        obj: ioBroker.SettableObject,
        callback?: ioBroker.SetObjectCallback,
    ): Promise<void | ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback>> | void;
    setObjectNotExists(
        id: string,
        obj: ioBroker.SettableObject,
        options: unknown,
        callback?: ioBroker.SetObjectCallback,
    ): Promise<void | ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback>> | void;
    /**
     * Same as {@link AdapterClass.setObject}, but with check if the object exists.
     *
     * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
     * New object will be created only if no object exists with such ID.
     *
     * @param id object ID, that must be overwritten or created.
     * @param obj new object
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err, obj) {
     *              // obj is {id: id}
     *              if (err) adapter.log.error('Cannot write object: ' + err);
     *            }
     *        ```
     */
    setObjectNotExists(
        id: unknown,
        obj: unknown,
        options?: unknown,
        callback?: unknown,
    ): Promise<void | ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback>> | void {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertOptionalCallback(callback, 'callback');
        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }

        Validator.assertObject(obj, 'obj');

        try {
            this._utils.validateId(id, false, null);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        return this._setObjectNotExists({
            id: this.fixForbiddenCharsInId(this._utils.fixId(id)),
            obj: obj as any,
            options,
            callback,
        });
    }

    private async _setObjectNotExists(
        options: InternalSetObjectOptions,
    ): Promise<void | ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback>> {
        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} setObjectNotExists not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if ('children' in options.obj || 'parent' in options.obj) {
            this._logger.warn(`${this.namespaceLog} Do not use parent or children for ${options.id}`);
        }

        // check if object already exists
        let objExists;
        try {
            objExists = await this.#objects.objectExists(options.id, options.options);
        } catch (e) {
            return tools.maybeCallbackWithError(
                options.callback,
                `Could not check object existence of ${options.id}: ${e.message}`,
            );
        }

        if (objExists === false) {
            if (!options.obj.from) {
                options.obj.from = `system.adapter.${this.namespace}`;
            }
            if (!options.obj.user) {
                options.obj.user = (options.options ? options.options.user : '') || SYSTEM_ADMIN_USER;
            }
            if (!options.obj.ts) {
                options.obj.ts = Date.now();
            }

            return this._setObjectWithDefaultValue(options.id, options.obj, null, options.callback);
        }
        return tools.maybeCallbackWithError(options.callback, null);
    }

    // external signatures
    setForeignObjectNotExists<T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        callback?: ioBroker.SetObjectCallback,
    ): void;
    setForeignObjectNotExists<T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options: unknown,
        callback?: ioBroker.SetObjectCallback,
    ): void;

    /**
     * Same as {@link AdapterClass.setForeignObject}, but with check if the object exists.
     *
     * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE".
     * New object will be created only if no object exists with such ID.
     *
     * @param id object ID, that must be overwritten or created.
     * @param obj new object
     * @param options user context
     * @param callback return result
     *        ```js
     *            function (err, obj) {
     *              // obj is {id: id}
     *              if (err) adapter.log.error('Cannot write object: ' + err);
     *            }
     *        ```
     */
    setForeignObjectNotExists(
        id: unknown,
        obj: unknown,
        options: unknown,
        callback?: unknown,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback> | void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(id, 'id');
        Validator.assertObject(obj, 'obj');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        Validator.assertOptionalCallback(callback, 'callback');

        return this._setForeignObjectNotExists({ id, obj: obj as ioBroker.SettableObject, options, callback });
    }

    private async _setForeignObjectNotExists(
        _options: InternalSetObjectOptions,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback> | void> {
        const { id, obj, options, callback } = _options;

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} setForeignObjectNotExists not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, null);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        // check if the object exists
        let objExists;
        try {
            objExists = await this.#objects.objectExists(id, options || {});
        } catch (e) {
            return tools.maybeCallbackWithError(callback, `Could not check object existence of ${id}: ${e.message}`);
        }

        if (objExists === false) {
            if (!obj.from) {
                obj.from = `system.adapter.${this.namespace}`;
            }
            if (!obj.user) {
                obj.user = options?.user || SYSTEM_ADMIN_USER;
            }
            if (!obj.ts) {
                obj.ts = Date.now();
            }

            return this._setObjectWithDefaultValue(id, obj, null, callback);
        }
        return tools.maybeCallbackWithError(callback, null);
    }

    private _DCS2ID(device: string, channel: string, stateOrPoint?: boolean | string): string {
        let id = '';
        if (device) {
            id += device;
        }
        if (channel) {
            id += (id ? '.' : '') + channel;
        }

        if (typeof stateOrPoint === 'string') {
            if (stateOrPoint) {
                id += (id ? '.' : '') + stateOrPoint;
            }
        } else if (stateOrPoint === true && id) {
            id += '.';
        }
        return id;
    }

    // external signatures
    /** @deprecated use `this.extendObject` instead */
    createDevice(deviceName: string, callback?: ioBroker.SetObjectCallback): void;
    /** @deprecated use `this.extendObject` instead */
    createDevice(
        deviceName: string,
        common: Partial<ioBroker.DeviceCommon>,
        callback?: ioBroker.SetObjectCallback,
    ): void;
    /** @deprecated use `this.extendObject` instead */
    createDevice(
        deviceName: string,
        common: Partial<ioBroker.DeviceCommon>,
        native: Record<string, any>,
        callback?: ioBroker.SetObjectCallback,
    ): void;
    /** @deprecated use `this.extendObject` instead */
    createDevice(
        deviceName: string,
        common: Partial<ioBroker.DeviceCommon>,
        native: Record<string, any>,
        options: unknown,
        callback?: ioBroker.SetObjectCallback,
    ): void;

    /**
     * @param deviceName
     * @param common
     * @param _native
     * @param options
     * @param callback
     * @deprecated use `this.extendObject` instead
     */
    createDevice(deviceName: unknown, common: unknown, _native?: unknown, options?: unknown, callback?: unknown): any {
        this._logger.info(
            `${this.namespaceLog} Method "createDevice" is deprecated and will be removed in js-controller 7.1, use "extendObject/setObjectNotExists" instead`,
        );

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!deviceName) {
            this._logger.error(`${this.namespaceLog} Try to create device with empty name!`);
            return;
        }
        if (typeof _native === 'function') {
            callback = _native;
            _native = {};
        }
        if (typeof common === 'function') {
            callback = common;
            common = {};
        }

        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertString(deviceName, 'deviceName');
        if (_native !== undefined && _native !== null) {
            Validator.assertObject(_native, '_native');
        }

        return this._createDevice({
            common: common as Partial<ioBroker.DeviceCommon>,
            deviceName,
            _native,
            callback,
            options,
        });
    }

    private _createDevice(_options: InternalCreateDeviceOptions): void {
        let { common, deviceName, _native } = _options;
        const { callback, options } = _options;
        common = common || {};
        common.name = common.name || deviceName;

        deviceName = deviceName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        _native = _native || {};

        this.setObjectNotExists(
            deviceName,
            {
                type: 'device',
                common: common,
                native: _native,
            } as ioBroker.SettableDeviceObject,
            options,
            callback,
        );
    }

    /** @deprecated use `this.extendObject` instead */
    createChannel(parentDevice: string, channelName: string, callback?: ioBroker.SetObjectCallback): void;
    /** @deprecated use `this.extendObject` instead */
    createChannel(
        parentDevice: string,
        channelName: string,
        roleOrCommon: string | Partial<ioBroker.ChannelCommon>,
        callback?: ioBroker.SetObjectCallback,
    ): void;
    /** @deprecated use `this.extendObject` instead */
    createChannel(
        parentDevice: string,
        channelName: string,
        roleOrCommon: string | Partial<ioBroker.ChannelCommon>,
        native: Record<string, any>,
        callback?: ioBroker.SetObjectCallback,
    ): void;
    /** @deprecated use `this.extendObject` instead */
    createChannel(
        parentDevice: string,
        channelName: string,
        roleOrCommon: string | Partial<ioBroker.ChannelCommon>,
        native: Record<string, any>,
        options: unknown,
        callback?: ioBroker.SetObjectCallback,
    ): void;

    /**
     * Name of channel must be in format "channel"
     *
     * @param parentDevice
     * @param channelName
     * @param roleOrCommon
     * @param _native
     * @param options
     * @param callback
     * @deprecated use `this.extendObject` instead
     */
    createChannel(
        parentDevice: unknown,
        channelName: unknown,
        roleOrCommon?: unknown,
        _native?: unknown,
        options?: unknown,
        callback?: unknown,
    ): any {
        this._logger.info(
            `${this.namespaceLog} Method "createChannel" is deprecated and will be removed in js-controller 7.1, use "extendObject/setObjectNotExists" instead`,
        );

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!channelName) {
            throw new Error('Cannot create a channel without a name!');
        }

        if (typeof _native === 'function') {
            callback = _native;
            _native = {};
        }

        if (typeof roleOrCommon === 'function') {
            callback = roleOrCommon;
            roleOrCommon = undefined;
        }

        let common = {};
        if (typeof roleOrCommon === 'string') {
            common = {
                name: '',
                role: roleOrCommon,
            };
        } else if (tools.isObject(roleOrCommon)) {
            common = roleOrCommon;
        }

        Validator.assertObject(common, 'common');
        Validator.assertString(channelName, 'channelName');
        Validator.assertString(parentDevice, 'parentDevice');
        Validator.assertOptionalCallback(callback, 'callback');

        common.name = common.name || channelName;

        if (parentDevice) {
            parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }
        channelName = channelName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        // @ts-expect-error ts somehow loses types here
        channelName = this._DCS2ID(parentDevice, channelName);

        _native = _native || {};

        const obj = {
            type: 'channel',
            common: common,
            native: _native,
        } as const;

        this.setObjectNotExists(channelName as string, obj as any, options, callback);
    }

    /** @deprecated use `this.extendObject` instead */
    createState(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        callback?: ioBroker.SetObjectCallback,
    ): void;
    /** @deprecated use `this.extendObject` instead */
    createState(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon: string | Partial<ioBroker.StateCommon>,
        callback?: ioBroker.SetObjectCallback,
    ): void;
    /** @deprecated use `this.extendObject` instead */
    createState(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon: string | Partial<ioBroker.StateCommon>,
        native: Record<string, any>,
        callback?: ioBroker.SetObjectCallback,
    ): void;
    /** @deprecated use `this.extendObject` instead */
    createState(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon: string | Partial<ioBroker.StateCommon>,
        native: Record<string, any>,
        options: unknown,
        callback?: ioBroker.SetObjectCallback,
    ): void;

    /**
     * @param parentDevice
     * @param parentChannel
     * @param stateName
     * @param roleOrCommon
     * @param _native
     * @param options
     * @param callback
     * @deprecated use `this.extendObject` instead
     */
    createState(
        parentDevice: unknown,
        parentChannel: unknown,
        stateName: unknown,
        roleOrCommon: unknown,
        _native?: unknown,
        options?: unknown,
        callback?: unknown,
    ): any {
        this._logger.info(
            `${this.namespaceLog} Method "createState" is deprecated and will be removed in js-controller 7.1, use "extendObject/setObjectNotExists" instead`,
        );

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!stateName) {
            throw new Error('Cannot create a state without a name!');
        }

        if (typeof _native === 'function') {
            callback = _native;
            _native = {};
        }

        if (typeof roleOrCommon === 'function') {
            callback = roleOrCommon;
            roleOrCommon = undefined;
        }

        let common: any = {};
        if (typeof roleOrCommon === 'string') {
            common = {
                read: true,
                write: false,
                name: '',
                role: roleOrCommon,
            };
        } else if (tools.isObject(roleOrCommon)) {
            common = roleOrCommon;
        }

        _native = _native || {};

        Validator.assertObject(common, 'common');
        Validator.assertString(stateName, 'stateName');
        Validator.assertString(parentDevice, 'parentDevice');
        Validator.assertString(parentChannel, 'parentChannel');
        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertObject(_native, '_native');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._createState({ parentDevice, parentChannel, callback, stateName, common, _native, options });
    }

    private _createState(_options: InternalCreateStateOptions): Promise<void> | void {
        const { _native, common, callback, options } = _options;
        let { parentChannel, parentDevice, stateName } = _options;

        common.name = common.name || stateName;

        common.read = common.read === undefined ? true : common.read;
        common.write = common.write === undefined ? false : common.write;

        if (!common.role) {
            this._logger.error(
                `${this.namespaceLog} Try to create state ${
                    parentDevice ? `${parentDevice}.` : ''
                }${parentChannel}.${stateName} without role`,
            );
            return;
        }

        if (parentDevice) {
            parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }
        if (parentChannel) {
            parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }
        stateName = stateName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        const id = this._utils.fixId({
            device: parentDevice,
            channel: parentChannel,
            state: stateName,
        });

        // Check min, max and def values for number
        if (common.type !== undefined && common.type === 'number') {
            let min = 0;
            let max = 0;
            let def = 0;
            let err;
            if (common.min !== undefined) {
                min = common.min;
                if (typeof min !== 'number') {
                    min = parseFloat(min);
                    if (isNaN(min)) {
                        err = `Wrong type of ${id}.common.min`;
                        this._logger.error(`${this.namespaceLog} ${err}`);
                        return tools.maybeCallbackWithError(callback, err);
                    }
                    common.min = min;
                }
            }
            if (common.max !== undefined) {
                max = common.max;
                if (typeof max !== 'number') {
                    max = parseFloat(max);
                    if (isNaN(max)) {
                        err = `Wrong type of ${id}.common.max`;
                        this._logger.error(`${this.namespaceLog} ${err}`);
                        return tools.maybeCallbackWithError(callback, err);
                    }
                    common.max = max;
                }
            }
            if (common.def !== undefined) {
                def = common.def;
                if (typeof def !== 'number') {
                    def = parseFloat(def);
                    if (isNaN(def)) {
                        err = new Error(`Wrong type of ${id}.common.def`);
                        this._logger.error(`${this.namespaceLog} ${err.message}`);
                        return tools.maybeCallbackWithError(callback, err);
                    }
                    common.def = def;
                }
            }
            if (common.min !== undefined && common.max !== undefined && min > max) {
                common.max = min;
                common.min = max;
            }
            if (common.def !== undefined && common.min !== undefined && def < min) {
                common.def = min;
            }
            if (common.def !== undefined && common.max !== undefined && def > max) {
                common.def = max;
            }
        }

        this.setObjectNotExists(
            id,
            {
                type: 'state',
                common: common as any,
                native: _native as any,
            },
            options,
            err => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else if (common.def !== undefined) {
                    this.getState(id, null, (err, state) => {
                        if (!state) {
                            if (common.defAck !== undefined) {
                                this.setState(id, common.def, common.defAck, options, callback as any);
                            } else {
                                this.setState(id, common.def, options, callback as any);
                            }
                        } else {
                            return tools.maybeCallback(callback);
                        }
                    });
                } else {
                    this.getState(id, null, (err, state) => {
                        if (!state) {
                            this.setState(id, null, true, options, callback as any);
                        } else {
                            return tools.maybeCallback(callback);
                        }
                    });
                }
            },
        );
    }

    /** @deprecated use `this.delObject` instead */
    deleteDevice(deviceName: string, callback?: ioBroker.ErrorCallback): void;
    /** @deprecated use `this.delObject` instead */
    deleteDevice(deviceName: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Delete device with all its channels and states.
     *
     * @deprecated use `this.delObject` instead
     * @param deviceName is the part of ID like: adapter.instance.<deviceName>
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete device: ' + err);
     *            }
     *        ```
     */
    deleteDevice(deviceName: unknown, options: unknown, callback?: unknown): any {
        this._logger.info(
            `${this.namespaceLog} Method "deleteDevice" is deprecated and will be removed in js-controller 7.1, use "delObject" instead`,
        );

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(deviceName, 'deviceName');
        Validator.assertOptionalCallback(callback, 'callback');

        return this._deleteDevice({ deviceName, callback });
    }

    private async _deleteDevice(_options: InternalDeleteDeviceOptions): Promise<void> {
        const { callback } = _options;
        let { deviceName } = _options;

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} deleteDevice not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        deviceName = deviceName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        if (!this._namespaceRegExp.test(deviceName)) {
            // make it an id
            deviceName = `${this.namespace}.${deviceName}`;
        }

        // get object to check if it is a device
        let obj;
        try {
            obj = await this.getForeignObjectAsync(deviceName);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        if (!obj || obj.type !== 'device') {
            // it's not a device, so return but no error
            return tools.maybeCallback(callback);
        }

        // it's a device now delete it + underlying structure
        try {
            await this.delForeignObjectAsync(deviceName, { recursive: true });
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        return tools.maybeCallback(callback);
    }

    // external signature
    addChannelToEnum(
        enumName: string,
        addTo: string,
        parentDevice: string,
        channelName: string,
        callback?: ioBroker.ErrorCallback,
    ): void;
    addChannelToEnum(
        enumName: string,
        addTo: string,
        parentDevice: string,
        channelName: string,
        options: unknown,
        callback?: ioBroker.ErrorCallback,
    ): void;

    addChannelToEnum(
        enumName: unknown,
        addTo: unknown,
        parentDevice: unknown,
        channelName: unknown,
        options: unknown,
        callback?: unknown,
    ): MaybePromise {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(enumName, 'enumName');
        Validator.assertString(addTo, 'addTo');
        Validator.assertString(parentDevice, 'parentDevice');
        Validator.assertString(channelName, 'channelName');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertOptionalCallback(callback, 'callback');

        return this._addChannelToEnum({ enumName, addTo, parentDevice, channelName, options, callback });
    }

    private _addChannelToEnum(_options: InternalAddChannelToEnumOptions): Promise<void> | void {
        const { addTo, options, callback } = _options;
        let { enumName, parentDevice, channelName } = _options;

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} addChannelToEnum not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (parentDevice) {
            if (this._namespaceRegExp.test(parentDevice)) {
                parentDevice = parentDevice.substring(this.namespace.length + 1);
            }
            parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }

        if (this._namespaceRegExp.test(channelName)) {
            channelName = channelName.substring(this.namespace.length + 1);
        }
        if (parentDevice && channelName.substring(0, parentDevice.length) === parentDevice) {
            channelName = channelName.substring(parentDevice.length + 1);
        }
        channelName = channelName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

        const objId = `${this.namespace}.${this._DCS2ID(parentDevice, channelName)}`;

        if (addTo.startsWith('enum.')) {
            this.#objects.getObject(addTo, options, (err, obj) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else if (obj) {
                    if (!obj.common.members.includes(objId)) {
                        obj.common.members.push(objId);
                        obj.from = `system.adapter.${this.namespace}`;
                        obj.user = options?.user || SYSTEM_ADMIN_USER;
                        obj.ts = Date.now();

                        this.#objects!.setObject(obj._id, obj, options, callback);
                    } else {
                        return tools.maybeCallback(callback);
                    }
                }
            });
        } else {
            if (enumName.startsWith('enum.')) {
                enumName = enumName.substring(5);
            }

            this.#objects.getObject(`enum.${enumName}.${addTo}`, options, (err, obj) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }

                if (obj) {
                    // @ts-expect-error
                    if (!obj.common.members.includes(objId)) {
                        // @ts-expect-error
                        obj.common.members.push(objId);

                        obj.from = `system.adapter.${this.namespace}`;
                        obj.user = options?.user || SYSTEM_ADMIN_USER;
                        obj.ts = Date.now();

                        this.#objects!.setObject(obj._id, obj, options, callback);
                    } else {
                        return tools.maybeCallback(callback);
                    }
                } else {
                    // Create enum
                    this.#objects!.setObject(
                        `enum.${enumName}.${addTo}`,
                        {
                            common: {
                                name: addTo,
                                members: [objId],
                            },
                            from: `system.adapter.${this.namespace}`,
                            ts: Date.now(),
                            type: 'enum',
                            native: {},
                        },
                        options,
                        callback,
                    );
                }
            });
        }
    }

    // external signature
    deleteChannelFromEnum(
        enumName: string,
        parentDevice: string,
        channelName: string,
        callback?: ioBroker.ErrorCallback,
    ): void;
    deleteChannelFromEnum(
        enumName: string,
        parentDevice: string,
        channelName: string,
        options: unknown,
        callback?: ioBroker.ErrorCallback,
    ): void;

    deleteChannelFromEnum(
        enumName: unknown,
        parentDevice: unknown,
        channelName: unknown,
        options: unknown,
        callback?: unknown,
    ): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(enumName, 'enumName');
        Validator.assertString(parentDevice, 'parentDevice');
        Validator.assertString(channelName, 'channelName');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertOptionalCallback(callback, 'callback');

        return this._deleteChannelFromEnum({ enumName, parentDevice, channelName, options, callback });
    }

    private _deleteChannelFromEnum(_options: InternalDeleteChannelFromEnumOptions): Promise<void> | void {
        const { options, callback } = _options;
        let { enumName, channelName, parentDevice } = _options;

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} deleteChannelFromEnum not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (parentDevice) {
            if (parentDevice.substring(0, this.namespace.length) === this.namespace) {
                parentDevice = parentDevice.substring(this.namespace.length + 1);
            }
            parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }

        if (channelName && channelName.substring(0, this.namespace.length) === this.namespace) {
            channelName = channelName.substring(this.namespace.length + 1);
        }
        if (parentDevice && channelName && channelName.substring(0, parentDevice.length) === parentDevice) {
            channelName = channelName.substring(parentDevice.length + 1);
        }
        channelName = channelName || '';
        channelName = channelName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

        const objId = `${this.namespace}.${this._DCS2ID(parentDevice, channelName)}`;

        if (enumName) {
            enumName = `enum.${enumName}.`;
        } else {
            enumName = 'enum.';
        }

        this.#objects.getObjectView(
            'system',
            'enum',
            {
                startkey: enumName,
                endkey: `${enumName}\u9999`,
            },
            options,
            async (err, res) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }

                if (res) {
                    for (const row of res.rows) {
                        try {
                            const obj = (await this.#objects!.getObject(row.id, options)) as
                                | ioBroker.EnumObject
                                | null
                                | undefined;

                            if (obj?.common?.members) {
                                const pos = obj.common.members.indexOf(objId);
                                if (pos !== -1) {
                                    obj.common.members.splice(pos, 1);
                                    obj.from = `system.adapter.${this.namespace}`;
                                    obj.user = options?.user || SYSTEM_ADMIN_USER;
                                    obj.ts = Date.now();

                                    await this.#objects!.setObjectAsync(obj._id, obj, options);
                                }
                            }
                        } catch (e) {
                            return tools.maybeCallbackWithError(callback, e);
                        }
                    }
                }
                return tools.maybeCallback(callback);
            },
        );
    }

    // external signature
    /** @deprecated use `this.delObject` instead */
    deleteChannel(channelName: string, callback?: ioBroker.ErrorCallback): void;
    /** @deprecated use `this.delObject` instead */
    deleteChannel(channelName: string, options?: unknown, callback?: ioBroker.ErrorCallback): void;
    /** @deprecated use `this.delObject` instead */
    deleteChannel(
        parentDevice: string,
        channelName: string,
        options?: unknown,
        callback?: ioBroker.ErrorCallback,
    ): void;

    /**
     * Deletes channel and underlying structure
     *
     * @deprecated use `this.delObject` instead
     * @alias deleteChannel
     * @param parentDevice is the part of ID like: adapter.instance.<deviceName>
     * @param channelName is the part of ID like: adapter.instance.<deviceName>.<channelName>
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete device: ' + err);
     *            }
     *        ```
     */
    deleteChannel(parentDevice: unknown, channelName: unknown, options?: unknown, callback?: unknown): any {
        this._logger.info(
            `${this.namespaceLog} Method "deleteChannel" is deprecated and will be removed in js-controller 7.1, use "delObject" instead`,
        );

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof channelName === 'function') {
            callback = channelName;
            channelName = parentDevice;
            parentDevice = '';
        }
        if (parentDevice && !channelName) {
            channelName = parentDevice;
            parentDevice = '';
        } else if (parentDevice && typeof channelName === 'function') {
            callback = channelName;
            channelName = parentDevice;
            parentDevice = '';
        }

        Validator.assertString(parentDevice, 'parentDevice');
        Validator.assertString(channelName, 'channelName');
        Validator.assertOptionalCallback(callback, 'callback');

        return this._deleteChannel({ parentDevice, channelName, callback });
    }

    private async _deleteChannel(_options: InternalDeleteChannelOptions): Promise<void> {
        const { callback } = _options;
        let { channelName, parentDevice } = _options;

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} deleteChannel not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!parentDevice) {
            parentDevice = '';
        }

        if (parentDevice) {
            if (this._namespaceRegExp.test(parentDevice)) {
                parentDevice = parentDevice.substring(this.namespace.length + 1);
            }
            parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }

        if (channelName && this._namespaceRegExp.test(channelName)) {
            channelName = channelName.substring(this.namespace.length + 1);
        }
        if (parentDevice && channelName && channelName.substring(0, parentDevice.length) === parentDevice) {
            channelName = channelName.substring(parentDevice.length + 1);
        }
        channelName = channelName || '';
        channelName = channelName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

        channelName = `${this.namespace}.${this._DCS2ID(parentDevice, channelName)}`;

        // get object to check if it is a channel
        let obj;
        try {
            obj = await this.getForeignObjectAsync(channelName);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        if (!obj || obj.type !== 'channel') {
            // it's not a channel, so return but no error
            return tools.maybeCallback(callback);
        }

        this._logger.info(`${this.namespaceLog} Delete channel ${channelName}`);

        // it's a channel now delete it + underlying structure
        try {
            await this.delForeignObjectAsync(channelName, { recursive: true });
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        return tools.maybeCallback(callback);
    }

    // external signature
    /** @deprecated use `this.delObject` instead */
    deleteState(parentChannel: string, stateName: string, options?: unknown, callback?: ioBroker.ErrorCallback): void;
    /** @deprecated use `this.delObject` instead */
    deleteState(stateName: string, options?: unknown, callback?: ioBroker.ErrorCallback): void;
    /** @deprecated use `this.delObject` instead */
    deleteState(
        parentDevice: string | null,
        parentChannel: string | null,
        stateName: string,
        options?: unknown,
        callback?: ioBroker.ErrorCallback,
    ): void;

    /**
     * @param parentDevice
     * @param parentChannel
     * @param stateName
     * @param options
     * @param callback
     * @deprecated use `this.delObject` instead
     */
    deleteState(
        parentDevice: unknown,
        parentChannel: unknown,
        stateName?: unknown,
        options?: unknown,
        callback?: unknown,
    ): any {
        this._logger.info(
            `${this.namespaceLog} Method "deleteState" is deprecated and will be removed in js-controller 7.1, use "delObject" instead`,
        );

        if (typeof parentChannel === 'function' && stateName === undefined) {
            stateName = parentDevice;
            callback = parentChannel;
            parentChannel = '';
            parentDevice = '';
        } else if (parentChannel === undefined && stateName === undefined) {
            stateName = parentDevice;
            parentDevice = '';
            parentChannel = '';
        } else {
            if (typeof options === 'function') {
                callback = options;
                options = null;
            }
            if (typeof stateName === 'function') {
                callback = stateName;
                stateName = parentChannel;
                parentChannel = parentDevice;
                parentDevice = '';
            }
            if (typeof parentChannel === 'function') {
                callback = parentChannel;
                stateName = parentDevice;
                parentChannel = '';
                parentDevice = '';
            }
            if (typeof parentChannel === 'function') {
                callback = parentChannel;
                stateName = parentDevice;
                parentChannel = '';
                parentDevice = '';
            }
        }

        parentDevice = parentDevice ?? '';
        parentChannel = parentChannel ?? '';
        stateName = stateName ?? '';

        Validator.assertString(parentDevice, 'parentDevice');
        Validator.assertString(parentChannel, 'parentChannel');
        Validator.assertString(stateName, 'stateName');
        Validator.assertOptionalCallback(callback, 'callback');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._deleteState({ parentDevice, parentChannel, stateName, options, callback });
    }

    private _deleteState(_options: InternalDeleteStateOptions): void {
        const { callback, options } = _options;
        let { stateName, parentDevice, parentChannel } = _options;

        if (parentDevice) {
            if (this._namespaceRegExp.test(parentDevice)) {
                parentDevice = parentDevice.substring(this.namespace.length + 1);
            }

            parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }

        if (parentChannel) {
            if (this._namespaceRegExp.test(parentChannel)) {
                parentChannel = parentChannel.substring(this.namespace.length + 1);
            }
            if (parentDevice && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                parentChannel = parentChannel.substring(parentDevice.length + 1);
            }

            parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }

        if (this._namespaceRegExp.test(stateName)) {
            stateName = stateName.substring(this.namespace.length + 1);
        }
        if (parentDevice && stateName.substring(0, parentDevice.length) === parentDevice) {
            stateName = stateName.substring(parentDevice.length + 1);
        }
        if (parentChannel && stateName.substring(0, parentChannel.length) === parentChannel) {
            stateName = stateName.substring(parentChannel.length + 1);
        }
        stateName = stateName || '';
        stateName = stateName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

        const _name = this._DCS2ID(parentDevice, parentChannel, stateName);
        this.delObject(_name, options, callback);
    }

    // external signature
    getDevices(callback: ioBroker.GetObjectsCallback3<ioBroker.DeviceObject>): void;
    getDevices(options: unknown, callback: ioBroker.GetObjectsCallback3<ioBroker.DeviceObject>): void;

    getDevices(options: unknown, callback?: unknown): any {
        if (typeof options === 'function' && typeof callback === 'object') {
            const tmp = callback;
            callback = options;
            options = tmp;
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertCallback(callback, 'callback');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._getDevices({ options, callback });
    }

    private _getDevices(_options: InternalGetDevicesOptions): Promise<void> | void {
        const { options, callback } = _options;

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} getDevices not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#objects.getObjectView(
            'system',
            'device',
            {
                startkey: `${this.namespace}.`,
                endkey: `${this.namespace}.\u9999`,
            },
            options,
            (err, obj) => {
                if (err || !obj || !obj.rows || !obj.rows.length) {
                    return tools.maybeCallbackWithError(callback, err, err ? undefined : []);
                }
                const res = [];
                for (const row of obj.rows) {
                    if (row.value) {
                        res.push(row.value);
                    }
                }
                return tools.maybeCallbackWithError(callback, null, res);
            },
        );
    }

    // public signature
    getChannelsOf(callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>): void;
    getChannelsOf(parentDevice: string, callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>): void;
    getChannelsOf(
        parentDevice: string,
        options: unknown,
        callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>,
    ): void;
    getChannelsOf(parentDevice: unknown, options?: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof parentDevice === 'function') {
            callback = parentDevice;
            parentDevice = undefined;
        }

        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        Validator.assertOptionalCallback(callback, 'callback');
        if (parentDevice !== undefined) {
            Validator.assertString(parentDevice, 'parentDevice');
        }

        return this._getChannelsOf({ parentDevice, options, callback });
    }

    private _getChannelsOf(options: InternalGetChannelsOfOptions): Promise<void> | void {
        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} getChannelsOf not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!options.parentDevice) {
            options.parentDevice = '';
        }

        if (options.parentDevice && this._namespaceRegExp.test(options.parentDevice)) {
            options.parentDevice = options.parentDevice.substring(this.namespace.length + 1);
        }

        options.parentDevice = options.parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        options.parentDevice = this.namespace + (options.parentDevice ? `.${options.parentDevice}` : '');
        this.#objects.getObjectView(
            'system',
            'channel',
            {
                startkey: `${options.parentDevice}.`,
                endkey: `${options.parentDevice}.\u9999`,
            },
            options.options || {},
            (err, obj) => {
                if (err || !obj || !obj.rows || !obj.rows.length) {
                    return tools.maybeCallbackWithError(options.callback, err, err ? undefined : []);
                }
                const res = [];
                for (const row of obj.rows) {
                    if (row.value) {
                        res.push(row.value);
                    }
                }
                return tools.maybeCallbackWithError(options.callback, null, res);
            },
        );
    }

    // external signature
    getStatesOf(callback: ioBroker.GetObjectsCallback3<ioBroker.StateObject>): void;
    getStatesOf(parentDevice: string, callback: ioBroker.GetObjectsCallback3<ioBroker.StateObject>): void;
    getStatesOf(
        parentDevice: string | null | undefined,
        parentChannel: string | null | undefined,
        callback: ioBroker.GetObjectsCallback3<ioBroker.StateObject>,
    ): void;
    getStatesOf(
        parentDevice: string | null | undefined,
        parentChannel: string | null | undefined,
        options: unknown,
        callback: ioBroker.GetObjectsCallback3<ioBroker.StateObject>,
    ): void;
    getStatesOf(parentDevice: unknown, parentChannel?: unknown, options?: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof parentDevice === 'function') {
            callback = parentDevice;
            parentDevice = null;
            parentChannel = null;
        }
        if (typeof parentChannel === 'function') {
            callback = parentChannel;
            parentChannel = null;
        }
        if (!callback) {
            return;
        }

        Validator.assertCallback(callback, 'callback');

        if (parentDevice !== null && parentDevice !== undefined) {
            Validator.assertString(parentDevice, 'parentDevice');
        }

        if (parentChannel !== null && parentChannel !== undefined) {
            Validator.assertString(parentChannel, 'parentChannel');
        }

        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._getStatesOf({ parentDevice, parentChannel, options, callback });
    }

    private _getStatesOf(_options: InternalGetStatesOfOptions): Promise<void> | void {
        const { options, callback } = _options;
        let { parentDevice, parentChannel } = _options;

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} getStatesOf not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!parentDevice) {
            parentDevice = '';
        } else {
            if (this._namespaceRegExp.test(parentDevice)) {
                parentDevice = parentDevice.substring(this.namespace.length + 1);
            }

            parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }

        if (!parentChannel) {
            parentChannel = '';
        } else if (this._namespaceRegExp.test(parentChannel)) {
            parentChannel = parentChannel.substring(this.namespace.length + 1);
        }

        if (parentDevice && parentChannel && parentChannel.substring(0, parentDevice.length) === parentDevice) {
            parentChannel = parentChannel.substring(parentDevice.length + 1);
        }

        parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

        const id = `${this.namespace}.${this._DCS2ID(parentDevice, parentChannel, true)}`;

        this.#objects.getObjectView(
            'system',
            'state',
            {
                startkey: id,
                endkey: `${id}\u9999`,
            },
            options,
            (err, obj) => {
                if (err || !obj || !obj.rows || !obj.rows.length) {
                    return tools.maybeCallbackWithError(callback, err, err ? undefined : []);
                }
                const res: ioBroker.StateObject[] = [];
                let read = 0;
                for (const row of obj.rows) {
                    read++;
                    this.#objects!.getObject(row.id, (err, subObj) => {
                        if (subObj) {
                            res.push(subObj as ioBroker.StateObject);
                        }

                        if (!--read) {
                            return tools.maybeCallbackWithError(callback, null, res);
                        }
                    });
                }
            },
        );
    }

    // external signature
    addStateToEnum(
        enumName: string,
        addTo: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        callback?: ioBroker.ErrorCallback,
    ): void;
    addStateToEnum(
        enumName: string,
        addTo: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        options: unknown,
        callback?: ioBroker.ErrorCallback,
    ): void;
    addStateToEnum(
        enumName: unknown,
        addTo: unknown,
        parentDevice: unknown,
        parentChannel: unknown,
        stateName: unknown,
        options: unknown,
        callback?: unknown,
    ): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(enumName, 'enumName');
        Validator.assertString(addTo, 'addTo');
        Validator.assertString(parentDevice, 'parentDevice');
        Validator.assertString(parentChannel, 'parentChannel');
        Validator.assertString(stateName, 'stateName');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertOptionalCallback(callback, 'callback');

        return this._addStateToEnum({ enumName, addTo, parentDevice, parentChannel, stateName, options, callback });
    }

    private _addStateToEnum(_options: InternalAddStateToEnumOptions): Promise<void> | void {
        const { addTo, options, callback } = _options;
        let { enumName, parentDevice, parentChannel, stateName } = _options;

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} addStateToEnum not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (parentDevice) {
            if (this._namespaceRegExp.test(parentDevice)) {
                parentDevice = parentDevice.substring(this.namespace.length + 1);
            }

            parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }

        if (parentChannel) {
            if (this._namespaceRegExp.test(parentChannel)) {
                parentChannel = parentChannel.substring(this.namespace.length + 1);
            }
            if (parentDevice && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                parentChannel = parentChannel.substring(parentDevice.length + 1);
            }

            parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }

        if (this._namespaceRegExp.test(stateName)) {
            stateName = stateName.substring(this.namespace.length + 1);
        }
        if (parentDevice && stateName.substring(0, parentDevice.length) === parentDevice) {
            stateName = stateName.substring(parentDevice.length + 1);
        }
        if (parentChannel && stateName.substring(0, parentChannel.length) === parentChannel) {
            stateName = stateName.substring(parentChannel.length + 1);
        }
        stateName = stateName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

        const objId = this._utils.fixId({ device: parentDevice, channel: parentChannel, state: stateName });

        if (addTo.startsWith('enum.')) {
            this.#objects.getObject(addTo, options, (err, obj) => {
                if (err || !obj) {
                    return tools.maybeCallbackWithError(callback, err || tools.ERRORS.ERROR_NOT_FOUND);
                }

                if (!obj.common.members.includes(objId)) {
                    obj.common.members.push(objId);
                    obj.from = `system.adapter.${this.namespace}`;
                    obj.user = options?.user || SYSTEM_ADMIN_USER;
                    obj.ts = Date.now();
                    this.#objects!.setObject(obj._id, obj, options, callback);
                } else {
                    return tools.maybeCallback(callback);
                }
            });
        } else {
            if (enumName.startsWith('enum.')) {
                enumName = enumName.substring(5);
            }

            this.#objects.getObject(`enum.${enumName}.${addTo}`, options, (err, obj) => {
                if (!err && obj) {
                    // @ts-expect-error cast to enum object
                    if (!obj.common.members.includes(objId)) {
                        obj.common.members!.push(objId);
                        obj.from = `system.adapter.${this.namespace}`;
                        obj.user = options?.user || SYSTEM_ADMIN_USER;
                        obj.ts = Date.now();
                        this.#objects!.setObject(obj._id, obj, callback);
                    } else {
                        return tools.maybeCallback(callback);
                    }
                } else {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    }

                    // Create enum
                    this.#objects!.setObject(
                        `enum.${enumName}.${addTo}`,
                        {
                            common: {
                                name: addTo,
                                members: [objId],
                            },
                            from: `system.adapter.${this.namespace}`,
                            ts: Date.now(),
                            type: 'enum',
                            native: {},
                        },
                        options,
                        callback,
                    );
                }
            });
        }
    }

    // external signature
    deleteStateFromEnum(
        enumName: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        callback?: ioBroker.ErrorCallback,
    ): void;
    deleteStateFromEnum(
        enumName: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        options: unknown,
        callback?: ioBroker.ErrorCallback,
    ): void;
    deleteStateFromEnum(
        enumName: unknown,
        parentDevice: unknown,
        parentChannel: unknown,
        stateName: unknown,
        options: unknown,
        callback?: unknown,
    ): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(enumName, 'enumName');
        Validator.assertString(parentDevice, 'parentDevice');
        Validator.assertString(parentChannel, 'parentChannel');
        Validator.assertString(stateName, 'stateName');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertOptionalCallback(callback, 'callback');

        return this._deleteStateFromEnum({ enumName, parentDevice, parentChannel, stateName, options, callback });
    }

    private _deleteStateFromEnum(_options: InternalDeleteStateFromEnumOptions): Promise<void> | void {
        const { options, callback } = _options;
        let { enumName, parentDevice, parentChannel, stateName } = _options;

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} deleteStateFromEnum not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (parentDevice) {
            if (this._namespaceRegExp.test(parentDevice)) {
                parentDevice = parentDevice.substring(this.namespace.length + 1);
            }

            parentDevice = parentDevice.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }

        if (parentChannel) {
            if (this._namespaceRegExp.test(parentChannel)) {
                parentChannel = parentChannel.substring(this.namespace.length + 1);
            }
            if (parentDevice && parentChannel.substring(0, parentDevice.length) === parentDevice) {
                parentChannel = parentChannel.substring(parentDevice.length + 1);
            }

            parentChannel = parentChannel.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');
        }

        if (this._namespaceRegExp.test(stateName)) {
            stateName = stateName.substring(this.namespace.length + 1);
        }
        if (parentDevice && stateName.substring(0, parentDevice.length) === parentDevice) {
            stateName = stateName.substring(parentDevice.length + 1);
        }
        if (parentChannel && stateName.substring(0, parentChannel.length) === parentChannel) {
            stateName = stateName.substring(parentChannel.length + 1);
        }
        stateName = stateName.replace(FORBIDDEN_CHARS, '_').replace(/\./g, '_');

        const objId = this._utils.fixId(
            {
                device: parentDevice,
                channel: parentChannel,
                state: stateName,
            },
            false /*, 'state'*/,
        );

        if (enumName) {
            enumName = `enum.${enumName}.`;
        } else {
            enumName = 'enum.';
        }

        this.#objects.getObjectView(
            'system',
            'enum',
            {
                startkey: enumName,
                endkey: `${enumName}\u9999`,
            },
            options,
            async (err, res) => {
                if (err || !res) {
                    return tools.maybeCallbackWithError(callback, err);
                }

                for (const row of res.rows) {
                    try {
                        const obj = await this.#objects!.getObjectAsync(row.id);
                        if (obj && obj.common && obj.common.members) {
                            const pos = obj.common.members.indexOf(objId);
                            if (pos !== -1) {
                                obj.common.members.splice(pos, 1);
                                obj.from = `system.adapter.${this.namespace}`;
                                obj.user = options?.user || SYSTEM_ADMIN_USER;
                                obj.ts = Date.now();
                                await this.#objects!.setObjectAsync(obj._id, obj);
                            }
                        }
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, e);
                    }
                }
                return tools.maybeCallback(callback);
            },
        );
    }
    // external signature
    chmodFile(
        adapter: string | null,
        path: string,
        options: { mode: number | string } | Record<string, any>,
        callback: ioBroker.ChownFileCallback,
    ): void;

    chmodFile(adapter: string | null, path: string, callback: ioBroker.ChownFileCallback): void;

    /**
     * Change file access rights
     *
     * This function updates the file access rights
     * ```js
     *      adapter.chmodFile('vis-2.0', '/main/vis-views.json', {mode: 0x644}, function (err, processed) {
     *        if (err) adapter.log.error('Cannot read file: ' + err);
     *        adapter.log.info('New files: ' + JSON.stringify(processed));
     *      });
     * ```
     *
     * @param _adapter adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.
     * @param path path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0".
     * @param options data with mode
     * @param callback return result
     *        ```js
     *            function (err, processedFiles) {
     *                list of processed files with new groups
     *            }
     *        ```
     */
    chmodFile(_adapter: unknown, path: unknown, options: unknown, callback?: unknown): any {
        if (_adapter === null) {
            _adapter = this.name;
        }

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} chmodFile not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback as any, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#objects.chmodFile(_adapter as any, path as any, options as any, callback as any);
    }

    chownFile(
        _adapter: string,
        path: string,
        options: unknown,
        callback: (err?: Error | null, processedFiles?: any) => void,
    ): void;

    chownFile(_adapter: string, path: string, callback: (err?: Error | null, processedFiles?: any) => void): void;

    /**
     * Change a file owner
     *
     * This function updates the file owner and ownerGroup
     * ```js
     *      adapter.chownFile('vis-2.0', '/main/vis-views.json', {owner: 'newOwner', ownerGroup: 'newgroup'}, function (err, processed) {
     *        if (err) adapter.log.error('Cannot read file: ' + err);
     *        adapter.log.info('New files: ' + JSON.stringify(processed));
     *      });
     * ```
     *
     * @param _adapter adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.
     * @param path path to file without adapter name. E.g., If you want to update "/vis-2.0/main/*", here must be "/main/*" and _adapter must be equal to "vis-2.0".
     * @param options data with owner and ownerGroup
     * @param callback return result
     *        ```js
     *            function (err, processedFiles) {
     *                list of processed files with new groups
     *            }
     *        ```
     */
    chownFile(_adapter: unknown, path: unknown, options: unknown, callback?: unknown): any {
        if (_adapter === null) {
            _adapter = this.name;
        }

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} chownFile not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback as any, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#objects.chownFile(_adapter as string, path as string, options as any, callback as any);
    }

    // external signatures
    readDir(adapterName: string | null, path: string, callback: ioBroker.ReadDirCallback): void;
    readDir(adapterName: string | null, path: string, options: unknown, callback: ioBroker.ReadDirCallback): void;

    /**
     * Read directory from DB.
     *
     * This function reads the content of directory from DB for given adapter and path.
     * If getEnum called with no enum specified, all enums will be returned:
     * ```js
     *      adapter.readDir('vis-2.0', '/main/', function (err, filesOrDirs) {
     *        // All enums
     *        if (err) adapter.log.error('Cannot read directory: ' + err);
     *        if (filesOrDirs) {
     *           for (var f = 0; f < filesOrDirs.length; f++) {
     *              adapter.log.debug('Directory main has the following files and dirs: ' + filesOrDirs[f].file + '[dir - ' + filesOrDirs[f].isDir + ']');
     *           }
     *       }
     *      });
     * ```
     *
     * @param _adapter adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.
     * @param path path to directory without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err, filesOrDirs) {
     *                // filesOrDirs is array with elements like
     *                // {
     *                //      file:       'views.json,
     *                //      stats:      node.js stats object like https://nodejs.org/api/fs.html#fs_class_fs_stats ,
     *                //      isDir:      true/false,
     *                //      acl:        access control list object,
     *                //      modifiedAt: time when modified,
     *                //      createdAt:  time when created
     *                // }
     *            }
     *        ```
     */
    readDir(_adapter: unknown, path: unknown, options: unknown, callback?: unknown): any {
        if (_adapter === null) {
            _adapter = this.name;
        }

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertCallback(callback, 'callback');
        Validator.assertString(_adapter, '_adapter');
        Validator.assertString(path, 'path');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} readDir not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#objects.readDir(_adapter, path, options, callback);
    }

    // public signature
    unlink(adapterName: string | null, path: string, callback: ioBroker.ErrnoCallback): void;
    unlink(adapterName: string | null, path: string, options: unknown, callback: ioBroker.ErrnoCallback): void;
    unlink(_adapter: unknown, name: unknown, options: unknown, callback?: unknown): any {
        if (_adapter === null) {
            _adapter = this.name;
        }

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertString(_adapter, '_adapter');
        Validator.assertString(name, 'name');
        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} unlink not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#objects.unlink(_adapter, name, options, callback);
    }

    // external signatures
    rename(adapterName: string | null, oldName: string, newName: string, callback: ioBroker.ErrnoCallback): void;
    rename(
        adapterName: string | null,
        oldName: string,
        newName: string,
        options: unknown,
        callback: ioBroker.ErrnoCallback,
    ): void;

    rename(_adapter: unknown, oldName: unknown, newName: unknown, options: unknown, callback?: unknown): any {
        if (_adapter === null) {
            _adapter = this.name;
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertString(oldName, 'oldName');
        Validator.assertString(newName, 'newName');
        Validator.assertString(_adapter, '_adapter');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} rename not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#objects.rename(_adapter, oldName, newName, options, callback);
    }

    mkdir(adapterName: string | null, path: string, callback: ioBroker.ErrnoCallback): void;
    mkdir(adapterName: string | null, path: string, options: unknown, callback: ioBroker.ErrnoCallback): void;
    mkdir(_adapter: unknown, dirname: unknown, options: unknown, callback?: unknown): any {
        if (_adapter === null) {
            _adapter = this.name;
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertString(_adapter, '_adapter');
        Validator.assertString(dirname, 'dirname');
        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} mkdir not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#objects.mkdir(_adapter, dirname, options, callback);
    }

    readFile(adapterName: string | null, path: string, callback: ioBroker.ReadFileCallback): void;
    readFile(adapterName: string | null, path: string, options: unknown, callback: ioBroker.ReadFileCallback): void;

    /**
     * Read file from DB.
     *
     * This function reads the content of one file from DB for given adapter and file name.
     * ```js
     *      adapter.readFile('vis-2.0', '/main/vis-views.json', function (err, data) {
     *        // All enums
     *        if (err) adapter.log.error('Cannot read file: ' + err);
     *        adapter.log.info('Content of file is: ' + data);
     *      });
     * ```
     *
     * @param _adapter adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.
     * @param filename path to file without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err, data) {
     *                // data is utf8 or binary Buffer depends on the file extension.
     *            }
     *        ```
     */
    readFile(_adapter: unknown, filename: unknown, options: unknown, callback?: unknown): any {
        if (_adapter === null) {
            _adapter = this.name;
        }

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(_adapter, '_adapter');
        Validator.assertString(filename, 'filename');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertCallback(callback, 'callback');

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} readFile not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        this.#objects.readFile(_adapter, filename, options, callback);
    }

    // external signatures
    writeFile(adapterName: string | null, path: string, data: Buffer | string, callback: ioBroker.ErrnoCallback): void;
    writeFile(
        adapterName: string | null,
        path: string,
        data: Buffer | string,
        options: unknown,
        callback: ioBroker.ErrnoCallback,
    ): void;

    /**
     * Write file to DB.
     *
     * This function writes the content of one file into DB for given adapter and file name.
     * ```js
     *      adapter.writeFile('vis-2.0', '/main/vis-views.json', data, function (err) {
     *        err && adapter.log.error('Cannot write file: ' + err);
     *      });
     * ```
     *
     * @param _adapter adapter name. If the adapter name is null, so the name (not instance) of the current adapter will be taken.
     * @param filename path to file without adapter name. E.g., If you want to read "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".
     * @param data data as UTF8 string or buffer depends on the file extension.
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err) {
     *
     *            }
     *        ```
     */
    writeFile(_adapter: unknown, filename: unknown, data: unknown, options: unknown, callback?: unknown): MaybePromise {
        if (_adapter === null) {
            _adapter = this.name;
        }

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(_adapter, '_adapter');
        Validator.assertString(filename, 'filename');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertOptionalCallback(callback, 'callback');
        if (typeof data !== 'string') {
            Validator.assertBuffer(data, 'data');
        }

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} writeFile not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        return this.#objects.writeFile(_adapter, filename, data, options, callback);
    }

    fileExists(adapterName: string | null, path: string): Promise<boolean>;
    fileExists(adapterName: string | null, path: string, callback?: ioBroker.GenericCallback<boolean>): void;
    fileExists(
        adapterName: string | null,
        path: string,
        options: unknown,
        callback: ioBroker.GenericCallback<boolean>,
    ): void;

    /**
     * Checks if file exists in DB.
     *
     * @param _adapter adapter name
     * @param filename path to file without adapter name. E.g., If you want to check "/vis-2.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis-2.0".
     * @param options optional user context
     * @param callback cb function if none provided, a promise is returned
     */
    async fileExists(
        _adapter: unknown,
        filename: unknown,
        options?: unknown,
        callback?: unknown,
    ): Promise<boolean | void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertOptionalCallback(callback, 'callback');
        Validator.assertString(_adapter, '_adapter');
        Validator.assertString(filename, 'filename');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} fileExists not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            const exists = await this.#objects.fileExists(_adapter, filename, options);
            return tools.maybeCallbackWithError(callback, null, exists);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }
    }

    // external signatures
    formatValue(value: number | string, format?: string): string;
    formatValue(value: number | string, decimals: number, format?: string): string;
    formatValue(value: unknown, decimals: unknown, _format?: unknown): any {
        if (typeof decimals !== 'number') {
            _format = decimals;
            decimals = 2;
        }

        const format =
            // @ts-expect-error fix later
            !_format || _format.length !== 2
                ? this.isFloatComma === undefined
                    ? '.,'
                    : this.isFloatComma
                      ? '.,'
                      : ',.'
                : _format;

        if (typeof value !== 'number') {
            // @ts-expect-error fix later
            value = parseFloat(value);
        }
        // @ts-expect-error fix later
        return isNaN(value)
            ? ''
            : // @ts-expect-error fix later
              value
                  .toFixed(decimals)
                  // @ts-expect-error fix later
                  .replace(format[0], format[1])
                  // @ts-expect-error fix later
                  .replace(/\B(?=(\d{3})+(?!\d))/g, format[0]);
    }

    // external signature
    formatDate(dateObj: string | Date | number, format?: string): string;
    formatDate(dateObj: string | Date | number, isDuration: boolean | string, format?: string): string;

    formatDate(dateObj: unknown, isDuration: unknown, _format?: unknown): any {
        if ((typeof isDuration === 'string' && isDuration.toLowerCase() === 'duration') || isDuration === true) {
            isDuration = true;
        }
        if (typeof isDuration !== 'boolean') {
            _format = isDuration;
            isDuration = false;
        }

        if (!dateObj) {
            return '';
        }

        Validator.assertBoolean(isDuration, 'isDuration');
        if (_format !== undefined) {
            Validator.assertString(_format, 'format');
        }

        return this._formatDate({ dateObj: dateObj as any, isDuration, _format });
    }

    private _formatDate(_options: InternalFormatDateOptions): string {
        const { _format, dateObj: _dateObj } = _options;
        let { isDuration } = _options;

        let dateObj: Date;

        if (typeof _dateObj === 'string') {
            dateObj = new Date(_dateObj);
        }

        if (typeof _dateObj !== 'object') {
            const j = typeof _dateObj === 'number' ? _dateObj : parseInt(_dateObj, 10);
            if (j === _dateObj) {
                // may this is interval
                if (j < 946681200) {
                    isDuration = true;
                    dateObj = new Date(_dateObj);
                } else {
                    // if less 2000.01.01 00:00:00
                    dateObj = j < 946681200000 ? new Date(j * 1_000) : new Date(j);
                }
            } else {
                dateObj = new Date(_dateObj);
            }
        } else {
            dateObj = _dateObj;
        }
        const format = _format || this.dateFormat || 'DD.MM.YYYY';

        if (isDuration) {
            dateObj.setMilliseconds(dateObj.getMilliseconds() + dateObj.getTimezoneOffset() * 60 * 1_000);
        }

        const validFormatChars = 'YJГMМDTДhSчmмsс';
        let s = '';
        let result = '';

        const put = (s: string): string => {
            let v: number | string = '';
            switch (s) {
                case 'YYYY':
                case 'JJJJ':
                case 'ГГГГ':
                case 'YY':
                case 'JJ':
                case 'ГГ':
                    v = dateObj.getFullYear();
                    if (s.length === 2) {
                        v %= 100;
                    }
                    if (v <= 9) {
                        v = `0${v}`;
                    }
                    break;
                case 'MM':
                case 'M':
                case 'ММ':
                case 'М':
                    v = dateObj.getMonth() + 1;
                    if (v < 10 && s.length === 2) {
                        v = `0${v}`;
                    }
                    break;
                case 'DD':
                case 'TT':
                case 'D':
                case 'T':
                case 'ДД':
                case 'Д':
                    v = dateObj.getDate();
                    if (v < 10 && s.length === 2) {
                        v = `0${v}`;
                    }
                    break;
                case 'hh':
                case 'SS':
                case 'h':
                case 'S':
                case 'чч':
                case 'ч':
                    v = dateObj.getHours();
                    if (v < 10 && s.length === 2) {
                        v = `0${v}`;
                    }
                    break;
                case 'mm':
                case 'm':
                case 'мм':
                case 'м':
                    v = dateObj.getMinutes();
                    if (v < 10 && s.length === 2) {
                        v = `0${v}`;
                    }
                    break;
                case 'ss':
                case 's':
                case 'cc':
                case 'c':
                    v = dateObj.getSeconds();
                    if (v < 10 && s.length === 2) {
                        v = `0${v}`;
                    }
                    v = v.toString();
                    break;
                case 'sss':
                case 'ссс':
                    v = dateObj.getMilliseconds();
                    if (v < 10) {
                        v = `00${v}`;
                    } else if (v < 100) {
                        v = `0${v}`;
                    }
                    v = v.toString();
            }
            return (result += v);
        };

        for (let i = 0; i < format.length; i++) {
            if (validFormatChars.includes(format[i])) {
                s += format[i];
            } else {
                put(s);
                s = '';
                result += format[i];
            }
        }
        put(s);
        return result;
    }

    sendTo(
        instanceName: string,
        message: any,
        callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo,
    ): void;
    sendTo(
        instanceName: string,
        command: string,
        message: any,
        callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo,
        options?: SendToOptions,
    ): void;

    /**
     * Send message to other adapter instance or all instances of adapter.
     *
     * This function sends a message to specific instance or all instances of some specific adapter.
     * If no instance given (e.g. "pushover"), the callback argument will be ignored. Because normally many responses will come.
     *
     * @param instanceName name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0".
     * @param command command name, like "send", "browse", "list". Command is depend on target adapter implementation.
     * @param message object that will be given as argument for request
     * @param callback optional return result
     *        ```js
     *            function (result) {
     *              // result is target adapter specific and can vary from adapter to adapter
     *              if (!result) adapter.log.error('No response received');
     *            }
     *        ```
     * @param options optional options to define a timeout. This allows to get an error callback if no answer received in time (only if target is specific instance)
     */
    sendTo(instanceName: unknown, command: unknown, message: unknown, callback?: unknown, options?: unknown): any {
        if (typeof message === 'function' && typeof callback === 'undefined') {
            callback = message;
            message = undefined;
        }
        if (typeof message === 'undefined') {
            message = command;
            command = 'send';
        }

        Validator.assertString(instanceName, 'instanceName');
        Validator.assertString(command, 'command');

        if (!tools.isObject(callback)) {
            Validator.assertOptionalCallback(callback, 'callback');
        }

        if (options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._sendTo({
            instanceName,
            command,
            message,
            options,
            callback: callback as ioBroker.MessageCallbackInfo | ioBroker.MessageCallback,
        });
    }

    /**
     * Async version of sendTo
     * As we have a special case (first arg can be error or result, we need to promisify manually)
     *
     * @param instanceName name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0".
     * @param command command name, like "send", "browse", "list". Command is depend on target adapter implementation.
     * @param message object that will be given as argument for request
     * @param options optional options to define a timeout. This allows to get an error callback if no answer received in time (only if target is specific instance)
     */
    sendToAsync(instanceName: unknown, command: unknown, message?: unknown, options?: unknown): any {
        return new Promise((resolve, reject) => {
            const callback: ioBroker.MessageCallback = resOrError => {
                if (resOrError instanceof Error) {
                    reject(resOrError);
                }

                resolve(resOrError);
            };

            // validation takes place inside sendTo so skip here
            this.sendTo(
                instanceName as string,
                command as string,
                message as string,
                callback,
                options as SendToOptions,
            );
        });
    }

    private async _sendTo(_options: InternalSendToOptions): Promise<void> {
        const { command, message, callback, options } = _options;
        let { instanceName } = _options;

        const obj: ioBroker.SendableMessage = {
            command,
            message,
            from: `system.adapter.${this.namespace}`,
        };

        if (!instanceName) {
            // @ts-expect-error TODO it could also be the cb object
            return tools.maybeCallbackWithError(callback, 'No instanceName provided or not a string');
        }

        if (!instanceName.startsWith('system.adapter.')) {
            instanceName = `system.adapter.${instanceName}`;
        }

        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(`${this.namespaceLog} sendTo not processed because States database not connected`);
            // @ts-expect-error TODO it could also be the cb object
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (typeof message !== 'object') {
            this._logger.silly(
                `${this.namespaceLog} sendTo "${command}" to ${instanceName} from system.adapter.${this.namespace}: ${message}`,
            );
        } else {
            this._logger.silly(
                `${this.namespaceLog} sendTo "${command}" to ${instanceName} from system.adapter.${this.namespace}`,
            );
        }

        // If not specific instance
        if (!instanceName.match(/\.[0-9]+$/)) {
            if (!this.#objects) {
                this._logger.info(`${this.namespaceLog} sendTo not processed because Objects database not connected`);
                // @ts-expect-error TODO it could also be the cb object
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                // Send it to all instances of adapter
                const res = await this.#objects.getObjectView('system', 'instance', {
                    startkey: `${instanceName}.`,
                    endkey: `${instanceName}.\u9999`,
                });

                if (res) {
                    for (const row of res.rows) {
                        try {
                            await this.#states.pushMessage(row.id, obj);
                        } catch (e) {
                            // @ts-expect-error TODO it could also be the cb object
                            return tools.maybeCallbackWithError(callback, e);
                        }
                    }
                }
            } catch {
                //ignore
            }
        } else {
            if (callback) {
                if (typeof callback === 'function') {
                    // force subscribe even no messagebox enabled
                    if (!isMessageboxSupported(this.common!) && !this.mboxSubscribed) {
                        this.mboxSubscribed = true;
                        this.#states.subscribeMessage(`system.adapter.${this.namespace}`);
                    }

                    obj.callback = {
                        message,
                        id: this._callbackId++,
                        ack: false,
                        time: Date.now(),
                    };
                    if (this._callbackId >= 0xffffffff) {
                        this._callbackId = 1;
                    }

                    const callbackId = obj.callback.id;

                    let timer: undefined | NodeJS.Timeout;

                    if (options?.timeout) {
                        timer = setTimeout(() => {
                            const callbackObj = this.messageCallbacks.get(callbackId);

                            if (callbackObj) {
                                callbackObj.cb(new Error('Timeout exceeded'));
                                this.messageCallbacks.delete(callbackId);
                            }
                        }, options.timeout);
                    }

                    this.messageCallbacks.set(callbackId, { cb: callback, time: Date.now(), timer });

                    // delete too old callbacks IDs
                    const now = Date.now();
                    for (const [_id, cb] of this.messageCallbacks) {
                        if (now - cb.time > 3_600_000) {
                            this.messageCallbacks.delete(_id);
                        }
                    }
                } else {
                    // callback is an object
                    obj.callback = callback;
                    obj.callback.ack = true;
                }
            }

            try {
                await this.#states.pushMessage(instanceName, obj);
            } catch (e) {
                // @ts-expect-error TODO it could also be the cb object
                return tools.maybeCallbackWithError(callback, e);
            }
        }
    }

    sendToHost(
        hostName: string | null,
        message: any,
        callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo,
    ): void;
    sendToHost(
        hostName: string | null,
        command: string,
        message: any,
        callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo,
    ): void;

    /**
     * Send message to specific host or to all hosts.
     *
     * This function sends a message to specific host or all hosts.
     * If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.
     *
     * @param hostName name of the host where the message must be sent to. E.g. "myPC" or "system.host.myPC". If argument is null, the message will be sent to all hosts.
     * @param command command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage)
     * @param message object that will be given as argument for request
     * @param callback optional return result
     *        ```js
     *            function (result) {
     *              // result is target adapter specific and can vary from command to command
     *              if (!result) adapter.log.error('No response received');
     *            }
     *        ```
     */
    sendToHost(hostName: unknown, command: unknown, message: unknown, callback?: unknown): any {
        if (typeof message === 'undefined') {
            message = command;
            command = 'send';
        }

        if (hostName !== null) {
            Validator.assertString(hostName, 'hostName');
        }

        Validator.assertString(command, 'command');

        if (!tools.isObject(callback)) {
            Validator.assertOptionalCallback(callback, 'callback');
        }

        return this._sendToHost({
            hostName,
            command,
            message,
            callback: callback as ioBroker.MessageCallback | ioBroker.MessageCallbackInfo,
        });
    }

    private async _sendToHost(_options: InternalSendToHostOptions): Promise<void> {
        const { command, message, callback } = _options;
        let { hostName } = _options;
        const obj: Partial<ioBroker.Message> = { command, message, from: `system.adapter.${this.namespace}` };

        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(`${this.namespaceLog} sendToHost not processed because States database not connected`);
            // @ts-expect-error TODO it could also be the cb object
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (hostName && !hostName.startsWith('system.host.')) {
            hostName = `system.host.${hostName}`;
        }

        if (!hostName) {
            if (!this.#objects) {
                this._logger.info(
                    `${this.namespaceLog} sendToHost not processed because Objects database not connected`,
                );
                // @ts-expect-error TODO it could also be the cb object
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            // Send to all hosts
            this.#objects.getObjectList(
                {
                    startkey: 'system.host.',
                    endkey: `system.host.\u9999`,
                },
                null,
                async (err, res) => {
                    if (!this.#states) {
                        // if states is no longer existing, we do not need to unsubscribe
                        return;
                    }
                    if (!err && res?.rows.length) {
                        for (const row of res.rows) {
                            const parts: string[] = row.id.split('.');
                            // ignore system.host.name.alive and so on
                            if (parts.length === 3) {
                                try {
                                    await this.#states.pushMessage(row.id, obj as any);
                                } catch (e) {
                                    // @ts-expect-error TODO it could also be the cb object
                                    return tools.maybeCallbackWithError(callback, e);
                                }
                            }
                        }
                    }
                },
            );
        } else {
            if (callback) {
                if (typeof callback === 'function') {
                    // force subscribe even no messagebox enabled
                    if (!isMessageboxSupported(this.common!) && !this.mboxSubscribed) {
                        this.mboxSubscribed = true;
                        this.#states.subscribeMessage(`system.adapter.${this.namespace}`);
                    }

                    obj.callback = {
                        message,
                        id: this._callbackId++,
                        ack: false,
                        time: Date.now(),
                    };
                    if (this._callbackId >= 0xffffffff) {
                        this._callbackId = 1;
                    }

                    this.messageCallbacks.set(obj.callback.id, { cb: callback, time: Date.now() });
                } else {
                    // callback is an object
                    obj.callback = callback;
                    obj.callback.ack = true;
                }
            }

            try {
                await this.#states.pushMessage(hostName, obj as any);
            } catch (e) {
                // @ts-expect-error TODO it could also be the cb object
                return tools.maybeCallbackWithError(callback, e);
            }
        }
    }

    sendToUI(options: SendToUserInterfaceClientOptions): Promise<void>;

    /**
     * Send a message to an active UI Client
     *
     * @param options clientId and data options
     */
    sendToUI(options: AllPropsUnknown<SendToUserInterfaceClientOptions>): Promise<void> {
        if (!this.#states) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        const { clientId, data } = options;

        if (clientId === undefined) {
            return this.uiMessagingController.sendToAllClients({
                data,
                states: this.#states,
            });
        }

        Validator.assertString(clientId, 'clientId');

        return this.uiMessagingController.sendToClient({
            clientId,
            data,
            states: this.#states,
        });
    }

    registerNotification<Scope extends keyof ioBroker.NotificationScopes>(
        scope: Scope,
        category: ioBroker.NotificationScopes[Scope] | null,
        message: string,
        options?: NotificationOptions,
    ): Promise<void>;

    /**
     * Send notification with given scope and category to host of this adapter
     *
     * @param scope - scope to be addressed
     * @param category - to be addressed, if a null message will be checked by regex of given scope
     * @param message - message to be stored/checked
     * @param options - Additional options for the notification, currently `contextData` is supported
     */
    async registerNotification(scope: unknown, category: unknown, message: unknown, options?: unknown): Promise<void> {
        if (!this.#states) {
            // if states is no longer existing, we do not need to set
            this._logger.info(
                `${this.namespaceLog} registerNotification not processed because States database not connected`,
            );
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        Validator.assertString(scope, 'scope');
        if (category !== null) {
            Validator.assertString(category, 'category');
        }
        Validator.assertString(message, 'message');

        if (options !== undefined) {
            Validator.assertObject<NotificationOptions>(options, 'options');
        }

        const obj = {
            command: 'addNotification',
            message: {
                scope,
                category,
                message,
                instance: this.namespace,
                contextData: options?.contextData,
            },
            from: `system.adapter.${this.namespace}`,
        };

        await this.#states.pushMessage(`system.host.${this.host}`, obj as any);
    }

    // external signatures
    setState<T extends ioBroker.SetStateCallback | undefined>(
        id: string | ioBroker.IdObject,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        callback?: T,
    ): T extends unknown ? ioBroker.SetStatePromise : void;
    setState<T extends ioBroker.SetStateCallback | undefined>(
        id: string | ioBroker.IdObject,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        callback?: T,
    ): T extends unknown ? ioBroker.SetStatePromise : void;
    setState<T extends ioBroker.SetStateCallback | undefined>(
        id: string | ioBroker.IdObject,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options?: Partial<GetUserGroupsOptions> | null,
        callback?: T,
    ): T extends unknown ? ioBroker.SetStatePromise : void;
    setState<T extends ioBroker.SetStateCallback | undefined>(
        id: string | ioBroker.IdObject,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options?: Partial<GetUserGroupsOptions> | null,
        callback?: T,
    ): T extends unknown ? ioBroker.SetStatePromise : void;

    /**
     * Writes value into states DB.
     *
     * This function can write values into states DB for this adapter.
     * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
     * ack, options and callback are optional
     *
     * @param id object ID of the state.
     * @param state simple value or object with attributes.
     *  If state is object and ack exists too as function argument, function argument has priority.
     *  ```js
     *      {
     *          val:    value,
     *          ack:    true|false,       // default - false; is command(false) or status(true)
     *          ts:     timestampMS,      // default - now
     *          q:      qualityAsNumber,  // default - 0 (ok)
     *          from:   origin,           // default - this adapter
     *          c:      comment,          // default - empty
     *          expire: expireInSeconds   // default - 0
     *          lc:     timestampMS       // default - automatic calculation
     *      }
     *  ```
     * @param ack optional is command(false) or status(true)
     * @param options optional user context
     * @param callback optional return error and id
     *        ```js
     *            function (err, id) {
     *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
     *            }
     *        ```
     */
    setState(
        id: unknown,
        state: unknown,
        ack: unknown,
        options?: unknown,
        callback?: unknown,
    ): Promise<void | string> | void {
        if (typeof state === 'object' && typeof ack !== 'boolean') {
            callback = options;
            options = ack;
            ack = undefined;
        }
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof ack === 'function') {
            callback = ack;
            ack = undefined;
        }

        if (!tools.isObject(id)) {
            // it can be id object or string
            Validator.assertString(id, 'id');
        }

        if (ack !== undefined) {
            Validator.assertBoolean(ack, 'ack');
        }

        Validator.assertOptionalCallback(callback, 'callback');

        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }

        return this._setState({ id, state: state as ioBroker.SettableState, ack, options, callback });
    }

    private async _setState(_options: InternalSetStateOptions): Promise<void | string> {
        const { state, ack, options, callback } = _options;
        const { id } = _options;

        if (!this.#states) {
            // if states is no longer existing, we do not need to set
            this._logger.info(`${this.namespaceLog} setState not processed because States database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }
        if (!this.#objects) {
            this._logger.info(`${this.namespaceLog} setState not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, false, null);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        const fixedId = this._utils.fixId(id, false);
        let stateObj: ioBroker.SettableState;

        if (tools.isObject(state)) {
            // Verify that the passed state object is valid
            try {
                this._utils.validateSetStateObjectArgument(state);
                stateObj = state;
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        } else {
            // wrap non-object values in a state object
            // @ts-expect-error fix later
            stateObj = state !== undefined ? { val: state } : {};
        }

        if (stateObj.val === undefined && !Object.keys(stateObj).length) {
            // undefined is not allowed as state.val -> return
            return tools.maybeCallbackWithError(callback, 'undefined is not a valid state value');
        }

        if (ack !== undefined) {
            stateObj.ack = ack;
        }

        // if state.from provided, we use it else, we set default property
        stateObj.from =
            typeof stateObj.from === 'string' && stateObj.from !== ''
                ? stateObj.from
                : `system.adapter.${this.namespace}`;
        stateObj.user = options?.user || SYSTEM_ADMIN_USER;

        let permCheckRequired = false;
        if (options?.user && options.user !== SYSTEM_ADMIN_USER) {
            permCheckRequired = true;
        }

        let obj: ioBroker.StateObject | null | undefined;
        try {
            if (permCheckRequired) {
                obj = (await this._checkStates(fixedId, options || {}, 'setState')).objs[0];
            } else {
                obj = (await this.#objects.getObject(fixedId, options)) as ioBroker.StateObject | null | undefined;
            }
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        if (!this.#objects) {
            // if objects is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} setForeignState not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (this.performStrictObjectChecks) {
            // validate that object exists, read-only logic ok, type ok, etc. won't throw now
            await this._utils.performStrictObjectCheck(fixedId, stateObj);
        }

        if (fixedId.startsWith(ALIAS_STARTS_WITH)) {
            // write alias
            if (obj?.common?.alias?.id) {
                // id can be string or can have attribute write
                const aliasId = tools.isObject(obj.common.alias.id) ? obj.common.alias.id.write : obj.common.alias.id;

                // validate here because we use objects/states db directly
                try {
                    this._utils.validateId(aliasId, true, null);
                } catch (e) {
                    this._logger.warn(`${this.namespaceLog} Error validating alias id of ${fixedId}: ${e.message}`);
                    return tools.maybeCallbackWithError(
                        callback,
                        `Error validating alias id of ${fixedId}: ${e.message}`,
                    );
                }

                // check the rights
                let targetObj;
                try {
                    if (permCheckRequired) {
                        targetObj = (await this._checkStates(aliasId, options || {}, 'setState')).objs[0];
                    } else {
                        targetObj = (await this.#objects.getObject(aliasId, options)) as
                            | ioBroker.StateObject
                            | null
                            | undefined;
                    }
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }

                if (!this.#states) {
                    // if states is no longer existing, we do not need to unsubscribe
                    this._logger.info(
                        `${this.namespaceLog} setForeignState not processed because States database not connected`,
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                // write target state
                this.outputCount++;
                try {
                    const res = await this.#states.setState(
                        aliasId,
                        tools.formatAliasValue({
                            sourceCommon: obj?.common,
                            targetCommon: targetObj?.common,
                            state: stateObj as ioBroker.State,
                            logger: this._logger,
                            logNamespace: this.namespaceLog,
                            sourceId: obj?._id,
                            targetId: targetObj?._id,
                        }),
                    );

                    return tools.maybeCallbackWithError(callback, null, res);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }
            } else {
                this._logger.warn(`${this.namespaceLog} Alias ${fixedId} has no target 2`);
                return tools.maybeCallbackWithError(callback, `Alias ${fixedId} has no target`);
            }
        } else {
            if (!this.#states) {
                // if states is no longer existing, we do not need to unsubscribe
                this._logger.info(
                    `${this.namespaceLog} setForeignState not processed because States database not connected`,
                );
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            this.outputCount++;
            try {
                const res = await this.#states.setState(fixedId, stateObj);
                return tools.maybeCallbackWithError(callback, null, res);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        }
    }

    // Cache will be cleared if user or group changes. Important! only if subscribed.
    private async _getUserGroups(options: GetUserGroupsOptions): Promise<GetUserGroupsOptions> {
        if (this.users[options.user]) {
            options.groups = this.users[options.user].groups;
            options.acl = this.users[options.user].acl;
            return options;
        }
        options.groups = [];
        let userAcl: ioBroker.UserObject | null | undefined;
        try {
            userAcl = await this.getForeignObjectAsync(options.user, null);
        } catch {
            // ignore
        }

        if (!userAcl) {
            // User does not exists
            this._logger.error(`${this.namespaceLog} unknown user "${options.user}"`);
            return options;
        }
        let groups;
        try {
            groups = await this.getForeignObjectsAsync('*', 'group', null, null);
        } catch {
            // ignore
        }

        // aggregate all groups permissions, where this user is
        if (groups) {
            for (const group of Object.values(groups)) {
                if (group.common.members.includes(options.user)) {
                    options.groups.push(group._id);
                }
            }
        }

        // read all groups for this user
        this.users[options.user] = {
            groups: options.groups,
            // @ts-expect-error TODO: UserCommon has no acl
            acl: userAcl.common?.acl || {},
        };
        await this._getGroups(options.groups);
        // combine all rights
        const user = this.users[options.user];
        for (const gName of options.groups) {
            if (!this.groups[gName].common?.acl) {
                continue;
            }
            const group = this.groups[gName];

            if (group.common?.acl?.file) {
                if (!user.acl || !user.acl.file) {
                    user.acl = user.acl || {};
                    user.acl.file = user.acl.file || {};

                    user.acl.file.create = group.common.acl.file.create;
                    user.acl.file.read = group.common.acl.file.read;
                    user.acl.file.write = group.common.acl.file.write;
                    user.acl.file.delete = group.common.acl.file.delete;
                    user.acl.file.list = group.common.acl.file.list;
                } else {
                    user.acl.file.create = user.acl.file.create || group.common.acl.file.create;
                    user.acl.file.read = user.acl.file.read || group.common.acl.file.read;
                    user.acl.file.write = user.acl.file.write || group.common.acl.file.write;
                    user.acl.file.delete = user.acl.file.delete || group.common.acl.file.delete;
                    user.acl.file.list = user.acl.file.list || group.common.acl.file.list;
                }
            }

            if (group.common?.acl?.object) {
                if (!user.acl || !user.acl.object) {
                    user.acl = user.acl || {};
                    user.acl.object = user.acl.object || {};

                    user.acl.object.create = group.common.acl.object.create;
                    user.acl.object.read = group.common.acl.object.read;
                    user.acl.object.write = group.common.acl.object.write;
                    user.acl.object.delete = group.common.acl.object.delete;
                    user.acl.object.list = group.common.acl.object.list;
                } else {
                    user.acl.object.create = user.acl.object.create || group.common.acl.object.create;
                    user.acl.object.read = user.acl.object.read || group.common.acl.object.read;
                    user.acl.object.write = user.acl.object.write || group.common.acl.object.write;
                    user.acl.object.delete = user.acl.object.delete || group.common.acl.object.delete;
                    user.acl.object.list = user.acl.object.list || group.common.acl.object.list;
                }
            }

            if (group.common?.acl?.users) {
                if (!user.acl || !user.acl.users) {
                    user.acl = user.acl || {};
                    user.acl.users = user.acl.users || {};

                    user.acl.users.create = group.common.acl.users.create;
                    user.acl.users.read = group.common.acl.users.read;
                    user.acl.users.write = group.common.acl.users.write;
                    user.acl.users.delete = group.common.acl.users.delete;
                    user.acl.users.list = group.common.acl.users.list;
                } else {
                    user.acl.users.create = user.acl.users.create || group.common.acl.users.create;
                    user.acl.users.read = user.acl.users.read || group.common.acl.users.read;
                    user.acl.users.write = user.acl.users.write || group.common.acl.users.write;
                    user.acl.users.delete = user.acl.users.delete || group.common.acl.users.delete;
                    user.acl.users.list = user.acl.users.list || group.common.acl.users.list;
                }
            }
            if (group.common?.acl?.state) {
                if (!user.acl || !user.acl.state) {
                    user.acl = user.acl || {};
                    user.acl.state = user.acl.state || {};

                    user.acl.state.create = group.common.acl.state.create;
                    user.acl.state.read = group.common.acl.state.read;
                    user.acl.state.write = group.common.acl.state.write;
                    user.acl.state.delete = group.common.acl.state.delete;
                    user.acl.state.list = group.common.acl.state.list;
                } else {
                    user.acl.state.create = user.acl.state.create || group.common.acl.state.create;
                    user.acl.state.read = user.acl.state.read || group.common.acl.state.read;
                    user.acl.state.write = user.acl.state.write || group.common.acl.state.write;
                    user.acl.state.delete = user.acl.state.delete || group.common.acl.state.delete;
                    user.acl.state.list = user.acl.state.list || group.common.acl.state.list;
                }
            }
        }
        options.acl = user.acl;
        return options;
    }

    private _checkState(obj: ioBroker.StateObject, options: Record<string, any>, command: CheckStateCommand): boolean {
        const limitToOwnerRights = options.limitToOwnerRights === true;
        if (obj?.acl) {
            obj.acl.state = obj.acl.state || obj.acl.object;

            if (obj.acl.state) {
                // If user is owner
                if (options.user === obj.acl.owner) {
                    if (command === 'setState' || command === 'delState') {
                        if (command === 'delState' && !options.acl.state.delete) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`,
                            );
                            return false;
                        } else if (command === 'setState' && !options.acl.state.write) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`,
                            );
                            return false;
                        } else if (!(obj.acl.state & ACCESS_USER_WRITE)) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`,
                            );
                            return false;
                        }
                    } else if (command === 'getState') {
                        if (!(obj.acl.state & ACCESS_USER_READ) || !options.acl.state.read) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`,
                            );
                            return false;
                        }
                    } else {
                        this._logger.warn(
                            `${this.namespaceLog} Called unknown command on "${obj._id}": ${command as any}`,
                        );
                    }
                } else if (options.groups.includes(obj.acl.ownerGroup) && !limitToOwnerRights) {
                    if (command === 'setState' || command === 'delState') {
                        if (command === 'delState' && !options.acl.state.delete) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`,
                            );
                            return false;
                        } else if (command === 'setState' && !options.acl.state.write) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`,
                            );
                            return false;
                        } else if (!(obj.acl.state & ACCESS_GROUP_WRITE)) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`,
                            );
                            return false;
                        }
                    } else if (command === 'getState') {
                        if (!(obj.acl.state & ACCESS_GROUP_READ) || !options.acl.state.read) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`,
                            );
                            return false;
                        }
                    } else {
                        this._logger.warn(
                            `${this.namespaceLog} Called unknown command on "${obj._id}": ${command as any}`,
                        );
                    }
                } else if (!limitToOwnerRights) {
                    if (command === 'setState' || command === 'delState') {
                        if (command === 'delState' && !options.acl.state.delete) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`,
                            );
                            return false;
                        } else if (command === 'setState' && !options.acl.state.write) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`,
                            );
                            return false;
                        } else if (!(obj.acl.state & ACCESS_EVERY_WRITE)) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user}" on "${obj._id}": ${command}`,
                            );
                            return false;
                        }
                    } else if (command === 'getState') {
                        if (!(obj.acl.state & ACCESS_EVERY_READ) || !options.acl.state.read) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user}"on "${obj._id}" : ${command}`,
                            );
                            return false;
                        }
                    } else {
                        this._logger.warn(
                            `${this.namespaceLog} Called unknown command on "${obj._id}": ${command as any}`,
                        );
                        return false;
                    }
                } else {
                    this._logger.warn(`${this.namespaceLog} Permissions limited to Owner rights on "${obj._id}"`);
                    return false;
                }
            } else if (limitToOwnerRights) {
                this._logger.warn(`${this.namespaceLog} Permissions limited to Owner rights on "${obj._id}"`);
                return false;
            }
        } else if (limitToOwnerRights) {
            this._logger.warn(`${this.namespaceLog} Permissions limited to Owner rights on "${obj._id}"`);
            return false;
        }

        return true;
    }

    private async _checkStates(
        ids: string | string[],
        options: Partial<GetUserGroupsOptions>,
        command: CheckStateCommand,
    ): Promise<CheckStatesResult> {
        if (!options.groups) {
            options = await this._getUserGroups(options as GetUserGroupsOptions);
        }

        if (!Array.isArray(ids)) {
            ids = [ids];
        }

        if (options._objects) {
            if (!ids.length) {
                return { ids, objs: [] };
            }

            const objs: ioBroker.StateObject[] = [];

            for (const obj of options._objects) {
                if (obj && this._checkState(obj, options, command)) {
                    objs.push(obj);
                }
            }

            return { ids, objs };
        }
        const objs: ioBroker.StateObject[] = [];

        for (const id of ids) {
            let originalChecked: boolean | undefined;

            if (options.checked !== undefined) {
                originalChecked = options.checked;
            }

            options.checked = true;

            if (!this.#objects) {
                this._logger.info(
                    `${this.namespaceLog} checkStates not processed because Objects database not connected`,
                );

                throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
            }

            const obj = (await this.#objects.getObject(id, options)) as ioBroker.StateObject;

            objs.push(obj);

            if (originalChecked !== undefined) {
                options.checked = originalChecked;
            } else {
                options.checked = undefined;
            }

            if (!this._checkState(obj, options, command)) {
                throw new Error(ERROR_PERMISSION);
            }
        }

        return { ids, objs };
    }

    private async _getGroups(ids: string[]): Promise<void> {
        for (const id of ids) {
            let obj;
            try {
                obj = (await this.getForeignObjectAsync(id)) as ioBroker.GroupObject;
            } catch {
                // ignore
            }
            if (this.groups[id] === undefined) {
                this.groups[id] = obj || {};
            }
        }
    }

    private async _setStateChangedHelper(id: string, state: ioBroker.SettableState): Promise<SetStateChangedResult> {
        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} setStateChanged not processed because Objects database not connected`,
            );

            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (id.startsWith(ALIAS_STARTS_WITH)) {
            let obj;
            let err;
            try {
                obj = await this.#objects.getObject(id);
            } catch (e) {
                err = e;
            }
            if (obj?.common?.alias?.id) {
                // id can be string or can have attribute write
                const aliasId = tools.isObject(obj.common.alias.id) ? obj.common.alias.id.write : obj.common.alias.id;
                return this._setStateChangedHelper(aliasId, state);
            }
            this._logger.warn(`${this.namespaceLog} ${err ? err.message : `Alias ${id} has no target 1`}`);
            throw new Error(err ? err.message : `Alias ${id} has no target`);
        } else {
            const oldState = await this.getForeignStateAsync(id, null);

            let differ = false;
            if (!oldState) {
                differ = true;
            } else if (state.val !== oldState.val) {
                differ = true;
            } else if (state.ack !== undefined && state.ack !== oldState.ack) {
                differ = true;
            } else if (state.q !== undefined && state.q !== oldState.q) {
                differ = true;
            } else if (state.ts !== undefined && state.ts !== oldState.ts) {
                differ = true;
            } else if (state.c !== undefined && state.c !== oldState.c) {
                // if comment changed
                differ = true;
            } else if (state.expire !== undefined && state.expire !== oldState.expire) {
                differ = true;
            } else if (state.from !== undefined && state.from !== oldState.from) {
                differ = true;
            } else if (state.user !== undefined && state.user !== oldState.user) {
                differ = true;
            }

            if (differ) {
                if (this.performStrictObjectChecks) {
                    // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                    await this._utils.performStrictObjectCheck(id, state);
                }
                this.outputCount++;
                await this.#states!.setState(id, state);
                return { id, notChanged: false };
            }
            return { id, notChanged: true };
        }
    }

    setStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        callback?: ioBroker.SetStateChangedCallback,
    ): void;
    setStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        callback?: ioBroker.SetStateChangedCallback,
    ): void;
    setStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options: unknown,
        callback?: ioBroker.SetStateChangedCallback,
    ): void;
    setStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown,
        callback?: ioBroker.SetStateChangedCallback,
    ): void;

    /**
     * Writes value into states DB only if the value really changed.
     *
     * This function can write values into states DB for this adapter.
     * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
     * ack, options and callback are optional
     *
     * @param id object ID of the state.
     * @param state simple value or object with attribues.
     * @param ack optional is command(false) or status(true)
     * @param options optional user context
     * @param callback optional return error, id and notChanged
     *        ```js
     *            function (err, id, notChanged) {
     *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
     *              if (!notChanged) adapter.log.debug('Value was changed');
     *            }
     *        ```
     */
    setStateChanged(id: unknown, state: unknown, ack: unknown, options?: unknown, callback?: unknown): any {
        if (typeof state === 'object' && typeof ack !== 'boolean') {
            callback = options;
            options = ack;
            ack = undefined;
        }
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof ack === 'function') {
            callback = ack;
            ack = undefined;
        }

        if (!tools.isObject(id)) {
            // it can be id object or string
            Validator.assertString(id, 'id');
        }

        if (ack !== undefined) {
            Validator.assertBoolean(ack, 'ack');
        }

        Validator.assertOptionalCallback(callback, 'callback');

        if (options !== undefined && options !== null) {
            Validator.assertObject(options, 'options');
        }

        return this._setStateChanged({ id, state: state as ioBroker.SettableState, ack, options, callback });
    }

    private async _setStateChanged(_options: InternalSetStateChangedOptions): Promise<void> {
        const { id, ack, options, callback, state } = _options;
        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} setStateChanged not processed because States database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, false, null);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        const fixedId = this._utils.fixId(id, false);

        let stateObj: ioBroker.SettableState;

        if (tools.isObject(state)) {
            // Verify that the passed state object is valid
            try {
                this._utils.validateSetStateObjectArgument(state);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
            stateObj = state;
        } else {
            // wrap non-object values in a state object
            // @ts-expect-error fix later
            stateObj = state !== undefined ? { val: state } : {};
        }

        if (stateObj.val === undefined && !Object.keys(stateObj).length) {
            // undefined is not allowed as state.val -> return
            return tools.maybeCallbackWithError(callback, 'undefined is not a valid state value');
        }

        if (ack !== undefined) {
            stateObj.ack = ack;
        }

        // if state.from provided, we use it else, we set default property
        stateObj.from =
            typeof stateObj.from === 'string' && stateObj.from !== ''
                ? stateObj.from
                : `system.adapter.${this.namespace}`;
        if (options?.user && options.user !== SYSTEM_ADMIN_USER) {
            try {
                await this._checkStates(fixedId, options, 'setState');
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }

            const res = await this._setStateChangedHelper(fixedId, stateObj);
            // @ts-expect-error todo fix it
            return tools.maybeCallbackWithError(callback, null, res.id, res.notChanged);
        }
        const res = await this._setStateChangedHelper(fixedId, stateObj);
        // @ts-expect-error todo fix it
        return tools.maybeCallbackWithError(callback, null, res.id, res.notChanged);
    }

    setForeignState(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        callback?: ioBroker.SetStateCallback,
    ): void;
    setForeignState(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        callback?: ioBroker.SetStateCallback,
    ): void;
    setForeignState(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options: unknown,
        callback?: ioBroker.SetStateCallback,
    ): void;
    setForeignState(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown,
        callback?: ioBroker.SetStateCallback,
    ): void;

    /**
     * Writes value into states DB for any instance.
     *
     * This function can write values into states DB for all instances and system states too.
     * ack, options and callback are optional
     *
     * @param id object ID of the state.
     * @param state simple value or object with attribues.
     *  If state is object, so the ack will be ignored and must be included into object.
     *  ```js
     *      {
     *          val:    value,
     *          ack:    true|false,       // default - false; is command(false) or status(true)
     *          ts:     timestampMS,      // default - now
     *          q:      qualityAsNumber,  // default - 0 (ok)
     *          from:   origin,           // default - this adapter
     *          c:      comment,          // default - empty
     *          expire: expireInSeconds   // default - 0
     *          lc:     timestampMS       // default - automatic calculation
     *      }
     *  ```
     * @param ack optional is command(false) or status(true)
     * @param options optional user context
     * @param callback optional return error and id
     *        ```js
     *            function (err, id) {
     *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
     *            }
     *        ```
     */
    async setForeignState(id: any, state: any, ack: any, options?: any, callback?: any): Promise<any> {
        if (typeof state === 'object' && typeof ack !== 'boolean') {
            callback = options;
            options = ack;
            ack = undefined;
        }

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof ack === 'function') {
            callback = ack;
            ack = undefined;
        }

        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} setForeignState not processed because States database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} setForeignState not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, null);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        if (tools.isObject(state)) {
            // Verify that the passed state object is valid
            try {
                this._utils.validateSetStateObjectArgument(state);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        } else {
            // wrap non-object values in a state object
            state = state !== undefined ? { val: state } : {};
        }

        if (state.val === undefined && !Object.keys(state).length) {
            // undefined is not allowed as state.val -> return
            this._logger.info(`${this.namespaceLog} undefined is not a valid state value for id "${id}"`);
            // TODO: reactivate line below + test in in next controller version (02.05.2021)
            // return tools.maybeCallbackWithError(callback, 'undefined is not a valid state value');
        }

        if (ack !== undefined) {
            state.ack = ack;
        }

        // if state.from provided, we use it else, we set default property
        state.from =
            typeof state.from === 'string' && state.from !== '' ? state.from : `system.adapter.${this.namespace}`;
        state.user = options?.user || SYSTEM_ADMIN_USER;

        if (!id || typeof id !== 'string') {
            const warn = id ? `ID can be only string and not "${typeof id}"` : `Empty ID: ${JSON.stringify(state)}`;
            this._logger.warn(`${this.namespaceLog} ${warn}`);
            return tools.maybeCallbackWithError(callback, warn);
        }

        id = this.fixForbiddenCharsInId(id);

        if (options?.user && options.user !== SYSTEM_ADMIN_USER) {
            let obj: ioBroker.StateObject;
            try {
                obj = (await this._checkStates(id, options, 'setState')).objs[0];
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
            if (!this.#states) {
                // if states is no longer existing, we do not need to unsubscribe
                this._logger.info(
                    `${this.namespaceLog} setForeignState not processed because States database not connected`,
                );
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            if (this.performStrictObjectChecks) {
                // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                await this._utils.performStrictObjectCheck(id, state);
            }

            if (id.startsWith(ALIAS_STARTS_WITH)) {
                // write alias
                if (obj?.common?.alias?.id) {
                    // id can be string or can have attribute write
                    const aliasId = tools.isObject(obj.common.alias.id)
                        ? obj.common.alias.id.write
                        : obj.common.alias.id;

                    // validate here because we use objects/states db directly
                    try {
                        this._utils.validateId(aliasId, true, null);
                    } catch (e) {
                        this._logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                        return tools.maybeCallbackWithError(
                            callback,
                            `Error validating alias id of ${id}: ${e.message}`,
                        );
                    }

                    let targetObj;
                    // we ignore permissions on the target object and thus get it as admin user
                    try {
                        targetObj = await this.#objects.getObject(aliasId, {
                            ...options,
                            user: SYSTEM_ADMIN_USER,
                        });
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, e);
                    }
                    if (!this.#states) {
                        // if states is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            `${this.namespaceLog} setForeignState not processed because States database not connected`,
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    this.outputCount++;
                    this.#states.setState(
                        aliasId,
                        tools.formatAliasValue({
                            sourceCommon: obj?.common,
                            targetCommon: targetObj && (targetObj.common as any),
                            state,
                            logger: this._logger,
                            logNamespace: this.namespaceLog,
                            sourceId: obj?._id,
                            targetId: targetObj?._id,
                        }),
                        callback,
                    );
                } else {
                    this._logger.warn(`${this.namespaceLog} Alias ${id} has no target 3`);
                    return tools.maybeCallbackWithError(callback, `Alias ${id} has no target`);
                }
            } else {
                if (!this.#states) {
                    // if states is no longer existing, we do not need to unsubscribe
                    this._logger.info(
                        `${this.namespaceLog} setForeignState not processed because States database not connected`,
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                this.outputCount++;
                this.#states.setState(id, state, callback);
            }
        } else {
            // write alias
            if (id.startsWith(ALIAS_STARTS_WITH)) {
                if (!this.#objects) {
                    this._logger.info(
                        `${this.namespaceLog} setForeignState not processed because Objects database not connected`,
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                // read alias id
                const obj = (await this.#objects.getObjectAsync(id, options)) as ioBroker.StateObject;

                if (obj?.common?.alias?.id) {
                    // alias id can be a string or can have id.write
                    const targetId = tools.isObject(obj.common.alias.id)
                        ? obj.common.alias.id.write
                        : obj.common.alias.id;

                    // validate here because we use objects/states db directly
                    try {
                        this._utils.validateId(targetId, true, null);
                    } catch (e) {
                        this._logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                        return tools.maybeCallbackWithError(
                            callback,
                            `Error validating alias id of ${id}: ${e.message}`,
                        );
                    }

                    if (!this.#objects) {
                        // if objects is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            `${this.namespaceLog} setForeignState not processed because Objects database not connected`,
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    // read object for formatting - we ignore permissions on the target object and thus get it as admin user
                    const targetObj = await this.#objects.getObject(targetId, {
                        ...options,
                        user: SYSTEM_ADMIN_USER,
                    });

                    if (!this.#states) {
                        // if states is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            `${this.namespaceLog} setForeignState not processed because States database not connected`,
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    this.outputCount++;
                    this.#states.setState(
                        targetId,
                        tools.formatAliasValue({
                            sourceCommon: obj.common,
                            targetCommon: targetObj?.common as ioBroker.StateCommon | undefined,
                            state,
                            logger: this._logger,
                            logNamespace: this.namespaceLog,
                            sourceId: obj._id,
                            targetId: targetObj?._id,
                        }),
                        callback,
                    );
                } else {
                    this._logger.warn(`${this.namespaceLog} Alias ${id} has no target 4`);
                    return tools.maybeCallbackWithError(callback, `Alias ${id} has no target`);
                }
            } else {
                if (this.performStrictObjectChecks) {
                    if (!this.#objects) {
                        // if objects is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            `${this.namespaceLog} setForeignState not processed because Objects database not connected`,
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                    await this._utils.performStrictObjectCheck(id, state);
                }
                if (!this.#states) {
                    // if states is no longer existing, we do not need to unsubscribe
                    this._logger.info(
                        `${this.namespaceLog} setForeignState not processed because States database not connected`,
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                this.outputCount++;
                this.#states.setState(id, state, callback);
            }
        }
    }

    setForeignStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        callback?: ioBroker.SetStateChangedCallback,
    ): void;
    setForeignStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        callback?: ioBroker.SetStateChangedCallback,
    ): void;
    setForeignStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options: unknown,
        callback?: ioBroker.SetStateChangedCallback,
    ): void;
    setForeignStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown,
        callback?: ioBroker.SetStateChangedCallback,
    ): void;

    /**
     * Writes value into states DB for any instance, but only if state changed.
     *
     * This function can write values into states DB for all instances and system states too.
     * ack, options and callback are optional
     *
     * @param id object ID of the state.
     * @param state simple value or object with attribues.
     *  If state is object and ack exists too as function argument, function argument has priority.
     *  ```js
     *      {
     *          val:    value,
     *          ack:    true|false,       // default - false; is command(false) or status(true)
     *          ts:     timestampMS,      // default - now
     *          q:      qualityAsNumber,  // default - 0 (ok)
     *          from:   origin,           // default - this adapter
     *          c:      comment,          // default - empty
     *          expire: expireInSeconds   // default - 0
     *          lc:     timestampMS       // default - automatic calculation
     *      }
     *  ```
     * @param ack optional is command(false) or status(true)
     * @param options optional user context
     * @param callback optional return error and id
     *        ```js
     *            function (err, id) {
     *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
     *            }
     *        ```
     */
    async setForeignStateChanged(
        id: any,
        state: any,
        ack: any,
        options?: any,
        callback?: any,
    ): Promise<void | [id: string, changed: boolean]> {
        if (typeof state === 'object' && typeof ack !== 'boolean') {
            callback = options;
            options = ack;
            ack = undefined;
        }

        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (typeof ack === 'function') {
            callback = ack;
            ack = undefined;
        }

        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} setForeignStateChanged not processed because States database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, null);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        if (tools.isObject(state)) {
            // Verify that the passed state object is valid
            try {
                this._utils.validateSetStateObjectArgument(state);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        } else {
            // wrap non-object values in a state object
            state = state !== undefined ? { val: state } : {};
        }

        if (state.val === undefined && !Object.keys(state).length) {
            // undefined is not allowed as state.val -> return
            this._logger.info(`${this.namespaceLog} undefined is not a valid state value for id "${id}"`);
            // TODO: reactivate line below + test in in next controller version (02.05.2021)
            // return tools.maybeCallbackWithError(callback, 'undefined is not a valid state value');
        }

        if (ack !== undefined) {
            state.ack = ack;
        }

        // if state.from provided, we use it else, we set default property
        state.from =
            typeof state.from === 'string' && state.from !== '' ? state.from : `system.adapter.${this.namespace}`;
        state.user = options?.user || SYSTEM_ADMIN_USER;

        id = this.fixForbiddenCharsInId(id);

        if (options?.user && options.user !== SYSTEM_ADMIN_USER) {
            try {
                await this._checkStates(id, options, 'setState');
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }

            const res = await this._setStateChangedHelper(id, state);
            return tools.maybeCallbackWithError(callback, null, res.id, res.notChanged);
        }
        const res = await this._setStateChangedHelper(id, state);
        return tools.maybeCallbackWithError(callback, null, res.id, res.notChanged);
    }

    getState(id: string, callback: ioBroker.GetStateCallback): void;
    getState(id: string, options: unknown, callback: ioBroker.GetStateCallback): void;

    /**
     * Read value from states DB.
     *
     * This function can read values from states DB for this adapter.
     * Only Ids that belong to this adapter can be read. So the function automatically adds "adapter.X." to ID.
     *
     * @param id object ID of the state.
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err, state) {
     *              if (err) adapter.log.error('Cannot read value: ' + err);
     *            }
     *        ```
     *
     *        See possible attributes of the state in @setState explanation
     */
    getState(id: unknown, options: any, callback?: any): ioBroker.GetStatePromise {
        // we use any types here, because validation takes place in foreign method
        // get state does the same as getForeignState but fixes the id first

        if (!tools.isObject(id)) {
            Validator.assertString(id, 'id');
        }
        const fixedId = this._utils.fixId(id, false);
        return this.getForeignState(fixedId, options, callback);
    }

    getForeignState(id: string, callback: ioBroker.GetStateCallback): ioBroker.GetStatePromise;
    getForeignState(id: string, options: unknown, callback: ioBroker.GetStateCallback): ioBroker.GetStatePromise;

    /**
     * Read value from states DB for any instance and system state.
     *
     * This function can read values from states DB for all instances and adapters. It expects the full path of object ID.
     *
     * @param id object ID of the state.
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err, state) {
     *              if (err) adapter.log.error('Cannot read value: ' + err);
     *            }
     *        ```
     *
     *        See possible attributes of the state in @setState explanation
     */
    getForeignState(
        id: unknown,
        options: unknown,
        callback?: unknown,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetStateCallback> | void> {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        Validator.assertString(id, 'id');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertOptionalCallback(callback, 'callback');

        return this._getForeignState({ id, options, callback });
    }

    private async _getForeignState(
        _options: InternalGetStateOptions,
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetStateCallback> | void> {
        const { id, options, callback } = _options;

        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} getForeignState not processed because States database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} getForeignState not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        let permCheckRequired = false;
        if (options?.user && options.user !== SYSTEM_ADMIN_USER) {
            permCheckRequired = true;
        }

        let obj: ioBroker.StateObject | null | undefined;
        try {
            if (permCheckRequired) {
                obj = (await this._checkStates(id, options || {}, 'getState')).objs[0];
            } else {
                obj = (await this.#objects.getObject(id, options)) as ioBroker.StateObject | null | undefined;
            }
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        if (id.startsWith(ALIAS_STARTS_WITH)) {
            if (obj?.common?.alias?.id) {
                // id can be string or can have attribute id.read
                const aliasId = tools.isObject(obj.common.alias.id) ? obj.common.alias.id.read : obj.common.alias.id;

                // validate here because we use objects/states db directly
                try {
                    this._utils.validateId(aliasId, true, null);
                } catch (e) {
                    this._logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                    return tools.maybeCallbackWithError(callback, `Error validating alias id of ${id}: ${e.message}`);
                }

                if (aliasId) {
                    let sourceObj;
                    try {
                        // we ignore permissions on the source object and thus get it as admin user
                        sourceObj = (await this.#objects.getObject(aliasId, {
                            ...options,
                            user: SYSTEM_ADMIN_USER,
                        })) as ioBroker.StateObject | null | undefined;
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, e);
                    }

                    let state: ioBroker.State | undefined | null;
                    if (this.oStates && this.oStates[aliasId]) {
                        state = deepClone(this.oStates[aliasId]);
                    } else {
                        this.inputCount++;
                        try {
                            state = await this.#states.getState(aliasId);
                        } catch (e) {
                            return tools.maybeCallbackWithError(callback, e);
                        }
                    }

                    return tools.maybeCallbackWithError(
                        callback,
                        null,
                        tools.formatAliasValue({
                            sourceCommon: sourceObj?.common,
                            targetCommon: obj.common,
                            state,
                            logger: this._logger,
                            logNamespace: this.namespaceLog,
                            sourceId: sourceObj?._id,
                            targetId: obj._id,
                        }),
                    );
                }
            } else {
                // alias object non-existing or points to nowhere -> handle it like a non-existing state
                return tools.maybeCallbackWithError(callback, null, null);
            }
        } else {
            if (this.oStates && this.oStates[id]) {
                return tools.maybeCallbackWithError(callback, null, this.oStates[id]);
            }
            return this.#states.getState(id, callback);
        }
    }

    // find out default history instance
    private async _getDefaultHistory(): Promise<void> {
        if (!this.defaultHistory) {
            // read default history instance from system.config
            let data;
            try {
                data = await this.getForeignObjectAsync('system.config', null);
            } catch {
                // ignore
            }

            if (data?.common) {
                this.defaultHistory = data.common.defaultHistory;
            }
            if (data?.native) {
                this._systemSecret = data.native.secret;
            }

            // if no default history set
            if (!this.defaultHistory) {
                let _obj;
                // read all adapters
                try {
                    _obj = await this.#objects!.getObjectViewAsync('system', 'instance', {
                        startkey: 'system.adapter.',
                        endkey: 'system.adapter.\u9999',
                    });
                } catch {
                    // ignore
                }

                if (_obj?.rows) {
                    for (const row of _obj.rows) {
                        if (row.value?.common && row.value.common.type === 'storage') {
                            this.defaultHistory = row.id.substring('system.adapter.'.length);
                            break;
                        }
                    }
                }
                if (!this.defaultHistory) {
                    this.defaultHistory = 'history.0';
                }
            }
        }
    }

    getHistory(id: string, options: ioBroker.GetHistoryOptions, callback: ioBroker.GetHistoryCallback): void;
    getHistory(id: string, callback: ioBroker.GetHistoryCallback): void;

    /**
     * Read historian data for states of any instance or system state.
     *
     * This function can read values from history adapters like: history, sql, influxdb. It expects the full path of object ID.
     * Normally only foreign history has interest, so there is no getHistory and getForeignHistory
     *
     * Possible options:
     *
     *  - instance - (optional) name of instance, where to read the historian data, e.g. 'history.0', 'sql.1'. By default, will be taken from system settings.
     *  - start - (optional) time in ms - Date.now()', by default is (now - 1 week)
     *  - end - (optional) time in ms - Date.now()', by default is (now + 5000 seconds)
     *  - step - (optional) used in aggregate (m4, max, min, average, total) step in ms of intervals
     *  - count - number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set.
     *  - from - if from field should be included in answer
     *  - ack - if ack field should be included in answer
     *  - q - if q field should be included in answer
     *  - addId - if id field should be included in answer
     *  - limit - do not return more entries than limit
     *  - ignoreNull - if null values should be included (false), replaced by last not null value (true) or replaced with 0 (0)
     *  - sessionId - (optional) identifier of request, will be returned back in the answer
     *  - aggregate - aggregate method:
     *      - minmax - used special algorithm. Splice the whole time range in small intervals and find for every interval max, min, start and end values.
     *      - max - Splice the whole time range in small intervals and find for every interval max value and use it for this interval (nulls will be ignored).
     *      - min - Same as max, but take minimal value.
     *      - average - Same as max, but take average value.
     *      - total - Same as max, but calculate total value.
     *      - count - Same as max, but calculate number of values (nulls will be calculated).
     *      - none - No aggregation at all. Only raw values in the given period.
     *
     * @param id object ID of the state.
     * @param options see function description
     * @param callback return result
     *        ```js
     *            function (error, result, step, sessionId) {
     *              if (error) adapter.log.error('Cannot read value: ' + err);
     *            }
     *        ```
     *
     *        See possible attributes of the state in @setState explanation
     */
    getHistory(id: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        Validator.assertString(id, 'id');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertCallback(callback, 'callback');

        return this._getHistory({ id, options, callback });
    }

    // Checked implementation
    private async _getHistory(_options: InternalGetHistoryOptions): Promise<void> {
        const { id, callback } = _options;
        let { options } = _options;

        try {
            this._utils.validateId(id, true, null);
        } catch (e) {
            // @ts-expect-error
            return tools.maybeCallbackWithError(callback, e);
        }

        options = options || {};
        options.end = options.end || Date.now() + 5000000;
        if (!options.count && !options.start) {
            options.start = options.start || Date.now() - 604800000; // - 1 week
        }

        if (!options.instance) {
            if (!this.defaultHistory) {
                // read default history instance from system.config
                await this._getDefaultHistory();
                return this.getHistory(id, options, callback);
            }
            options.instance = this.defaultHistory;
        }

        this.sendTo(options.instance || 'history.0', 'getHistory', { id: id, options: options }, res => {
            // @ts-expect-error
            tools.maybeCallbackWithError(callback, res.error, res.result, res.step, res.sessionId);
        });
    }

    idToDCS(id: string): {
        device: string;
        channel: string;
        state: string;
    } | null;

    /**
     * Convert ID into object with device's, channel's and state's name.
     *
     * Convert "adapter.instance.D.C.S" in object `{device: D, channel: C, state: S}`
     * Convert ID to `{device: D, channel: C, state: S}`
     *
     * @param id short or long string of ID like "stateID" or "adapterName.0.stateID".
     * @returns parsed ID as an object
     */
    idToDCS(id: unknown): {
        device: string;
        channel: string;
        state: string;
    } | null {
        if (!id) {
            return null;
        }

        Validator.assertString(id, 'id');

        const parts = id.split('.');
        if (`${parts[0]}.${parts[1]}` !== this.namespace) {
            this._logger.warn(`${this.namespaceLog} Try to decode id not from this adapter`);
            return null;
        }
        return { device: parts[2], channel: parts[3], state: parts[4] };
    }

    // external signature
    delState(id: string, callback?: ioBroker.ErrorCallback): void;
    delState(id: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Deletes a state of this instance.
     * The object will NOT be deleted. If you want to delete it too, use @delObject instead.
     *
     * It is not required to provice the adapter namespace, because it will automatically be added.
     * E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.
     *
     * No error is returned if state does not exist.
     *
     * @param id exactly object ID (without namespace)
     * @param options optional user context
     * @param callback return result
     *        ```js
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete object: ' + err);
     *            }
     *        ```
     */
    delState(id: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(id, 'id');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertOptionalCallback(callback, 'callback');

        return this._delState({ id, options, callback });
    }

    private _delState(_options: InternalDelStateOptions): Promise<void> | void {
        const { options, callback } = _options;
        let { id } = _options;

        try {
            this._utils.validateId(id, false, null);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        // delState does the same as delForeignState, but fixes the ID first
        id = this._utils.fixId(id);
        return this.delForeignState(id, options, callback);
    }

    // external signature
    delForeignState(id: string, callback?: ioBroker.ErrorCallback): void;
    delForeignState(id: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Deletes a state of any adapter.
     * The object is NOT deleted. If you want to delete it too, use @delForeignObject instead.
     *
     * No error is returned if state does not exist.
     *
     * @param id long string for ID like "adapterName.0.stateID".
     * @param options optional argument to describe the user context
     * @param callback return result
     * ```js
     * function (err) {}
     * ```
     */
    delForeignState(id: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertString(id, 'id');
        Validator.assertOptionalCallback(callback, 'callback');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._delForeignState({ id, options, callback });
    }

    private async _delForeignState(_options: InternalDelStateOptions): Promise<void> {
        const { id, options, callback } = _options;

        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} delForeignState not processed because States database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        if (options?.user && options.user !== SYSTEM_ADMIN_USER) {
            try {
                await this._checkStates(id, options, 'delState');
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        }
        this.#states.delState(id, callback);
    }

    // external signature
    getStates(pattern: Pattern, callback: ioBroker.GetStatesCallback): void;
    getStates(pattern: Pattern, options: unknown, callback: ioBroker.GetStatesCallback): void;

    /**
     * Read all states of this adapter, that pass the pattern
     *
     * Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
     * ```js
     *     adapter.getStates('*', function (err, states) {
     *         for (var id in states) {
     *              adapter.log.debug('"' + id + '" = "' + states[id].val);
     *         }
     *     });
     * ```
     *
     * @param pattern string in form 'adapter.0.*' or like this. It can be an array of IDs too.
     * @param options optional argument to describe the user context
     * @param callback return result
     * ```js
     * function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
     * ```
     */
    getStates(pattern: unknown, options: any, callback?: any): any {
        // we use any types here, because validation takes place in foreign method
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        Validator.assertPattern(pattern, 'pattern');

        const fixedPattern = Array.isArray(pattern) ? pattern : this._utils.fixId(pattern, true);

        this.getForeignStates(fixedPattern, options, callback);
    }

    private async _processStatesSecondary(
        keys: string[],
        targetObjs: (ioBroker.StateObject | null)[] | null,
        srcObjs: (ioBroker.StateObject | null)[] | null,
    ): Promise<ioBroker.GetStatesPromise> {
        const arr = await this.#states!.getStates(keys);

        const result: Record<string, Partial<ioBroker.State> | null> = {};

        for (let i = 0; i < keys.length; i++) {
            const obj = targetObjs && targetObjs[i];

            if (obj?.common?.alias && srcObjs) {
                const srcObj = srcObjs[i];

                if (srcObj) {
                    result[obj._id] =
                        tools.formatAliasValue({
                            sourceCommon: srcObj.common,
                            targetCommon: obj.common,
                            state: arr[i] || null,
                            logger: this._logger,
                            logNamespace: this.namespaceLog,
                            sourceId: srcObj._id,
                            targetId: obj._id,
                        }) || null;
                } else {
                    result[obj._id || keys[i]] = arr[i] || null;
                }
            } else {
                result[obj?._id || keys[i]] = arr[i] || null;
            }
        }

        // @ts-expect-error adapt the return type?
        return result;
    }

    /**
     * Ensures, that object information is read, and the alias id is mapped to the source id if an alias is contained in the getStates call
     * The adaption of the actual values is then performed in _processStatesSecondary, to apply alias conversion methods
     *
     * @param keys all ids of the getStates call
     * @param targetObjs the target objects (e.g. alias objects or the actual objects)
     */
    private async _processStates(keys: string[], targetObjs: ioBroker.StateObject[]): ioBroker.GetStatesPromise {
        const aliasIndexes: number[] = [];
        const aliasIds: string[] = [];
        /** Target objects with null placeholders for non-alias keys */
        const fullTargetObjs: (ioBroker.StateObject | null)[] = new Array(keys.length).fill(null);

        keys.forEach((id, idx) => {
            if (id.startsWith(ALIAS_STARTS_WITH)) {
                aliasIndexes.push(idx);
                aliasIds.push(id);
            }
        });

        // if any ID from aliases found
        if (aliasIds.length) {
            // make a copy of original array
            keys = [...keys];

            if (!targetObjs) {
                // read aliases objects to get information of source objects
                targetObjs = (await this._getObjectsByArray(aliasIds)) as ioBroker.StateObject[];
            } else {
                // we are only interested in keeping alias target objects
                targetObjs = targetObjs.filter((_val, idx) => aliasIndexes.includes(idx));
            }

            // replace alias ids with targets
            for (let i = 0; i < aliasIds.length; i++) {
                const obj = targetObjs[i];
                const aliasIdx = aliasIndexes[i];
                fullTargetObjs[aliasIdx] = obj;

                if (obj?.common?.alias) {
                    // alias id can be string or can have attribute read (this is used by getStates -> so read is important)
                    keys[aliasIdx] =
                        tools.isObject(obj.common.alias.id) && 'read' in obj.common.alias.id
                            ? obj.common.alias.id.read
                            : obj.common.alias.id;
                }
            }

            // srcObjs and targetObjs could be merged
            const srcObjs = (await this._getObjectsByArray(keys)) as (ioBroker.StateObject | null)[];

            return this._processStatesSecondary(keys, fullTargetObjs, srcObjs);
        }
        return this._processStatesSecondary(keys, null, null);
    }

    getForeignStates(pattern: Pattern, callback: ioBroker.GetStatesCallback): void;
    getForeignStates(pattern: Pattern, options: unknown, callback: ioBroker.GetStatesCallback): void;

    /**
     * Read all states of all adapters (and system states), that pass the pattern
     *
     * Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
     * ```js
     *     adapter.getStates('*', function (err, states) {
     *         for (var id in states) {
     *              adapter.log.debug('"' + id + '" = "' + states[id].val);
     *         }
     *     });
     * ```
     *
     * @param pattern string in form 'adapter.0.*' or like this. It can be an array of IDs too.
     * @param options optional argument to describe the user context
     * @param callback return result
     * ```js
     * function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
     * ```
     */
    getForeignStates(pattern: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        if (typeof pattern === 'function') {
            callback = pattern;
            pattern = '*';
        }

        Validator.assertPattern(pattern, 'pattern');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertCallback(callback, 'callback');

        return this._getForeignStates({ pattern, options: options || {}, callback });
    }

    private async _getForeignStates(_options: InternalGetStatesOptions): Promise<void> {
        const { options, pattern, callback } = _options;

        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} getForeignStates not processed because States database not connected`,
            );

            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!this.#objects) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} getForeignStates not processed because Objects database not connected`,
            );

            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        // if pattern is array
        if (Array.isArray(pattern)) {
            if (options.user && options.user !== SYSTEM_ADMIN_USER) {
                try {
                    const { objs, ids } = await this._checkStates(pattern, options, 'getState');
                    const res = await this._processStates(ids, objs);
                    return tools.maybeCallbackWithError(callback, null, res);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }
            } else {
                const res = await this._processStates(pattern, options?._objects);
                return tools.maybeCallbackWithError(callback, null, res);
            }
        } else {
            // read first the keys for pattern
            let params = {};
            if (pattern && pattern !== '*') {
                params = {
                    startkey: pattern.replace(/\*/g, ''),
                    endkey: pattern.replace(/\*/g, '\u9999'),
                };
            }

            let originalChecked: boolean | undefined;
            if (options.checked !== undefined) {
                originalChecked = options.checked;
            }
            options.checked = true;

            // in special maintenance mode, just returns all states. Aliases are not supported in this mode
            if (options.user === SYSTEM_ADMIN_USER && options.maintenance) {
                try {
                    const keys = await this.#states.getKeys(pattern);
                    const res = await this._processStatesSecondary(keys || [], null, null);
                    return tools.maybeCallbackWithError(callback, null, res);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }
            }

            try {
                const res = await this.#objects.getObjectView('system', 'state', params, options);
                if (originalChecked !== undefined) {
                    options.checked = originalChecked;
                } else {
                    options.checked = undefined;
                }

                if (!res) {
                    return tools.maybeCallbackWithError(callback, null, {});
                }
                const keys = [];
                const objs = [];

                // filter out
                let regEx;
                // process patterns like "*.someValue". The patterns "someValue.*" will be processed by getObjectView
                try {
                    if (pattern !== '*' && pattern[pattern.length - 1] !== '*') {
                        regEx = new RegExp(tools.pattern2RegEx(pattern));
                    }
                    for (const row of res.rows) {
                        const id = row.id;
                        if (id && (!regEx || regEx.test(id))) {
                            keys.push(id);
                            objs.push(row.value);
                        }
                    }
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }

                options._objects = objs;
                this.getForeignStates(keys, options, callback);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        }
    }

    /**
     * Add subscription for given alias, if it is not a state it will be ignored
     *
     * @param aliasObj the alias object
     * @param pattern pattern to subscribe for
     */
    private async _addAliasSubscribe(aliasObj: ioBroker.AnyObject, pattern: string): Promise<void> {
        if (aliasObj.type !== 'state') {
            // no state types do not need to be subscribed
            return;
        }

        if (!aliasObj.common?.alias?.id) {
            // if state and no id given
            this._logger.warn(`${this.namespaceLog} Alias ${aliasObj._id} has no target 5`);
            throw new Error(`Alias ${aliasObj._id} has no target`);
        }

        // id can be string or can have attribute read
        const sourceId = tools.isObject(aliasObj.common.alias.id)
            ? aliasObj.common.alias.id.read
            : aliasObj.common.alias.id;

        // validate here because we use objects/states db directly
        try {
            this._utils.validateId(sourceId, true, null);
        } catch (e) {
            throw new Error(`Error validating alias id of ${aliasObj._id}: ${e.message}`);
        }

        const targetEntry = {
            alias: deepClone(aliasObj.common.alias),
            id: aliasObj._id,
            pattern,
            type: aliasObj.common.type,
            max: aliasObj.common.max,
            min: aliasObj.common.min,
            unit: aliasObj.common.unit,
        };

        let aliasDetails: AliasDetails;

        if (!this.aliases.has(sourceId)) {
            aliasDetails = { targets: [] };
            // add the alias before doing anything async, so if a delete comes in between we can detect it
            this.aliases.set(sourceId, aliasDetails);
        } else {
            aliasDetails = this.aliases.get(sourceId)!;
        }

        if (!aliasDetails.source) {
            await this.#states!.subscribe(sourceId);
            // we ignore permissions on the source object and thus get it as admin user
            const sourceObj = await this.#objects!.getObject(sourceId, { user: SYSTEM_ADMIN_USER });

            // if we have a common and the alias has not been removed in-between
            if (sourceObj?.common && this.aliases.has(sourceObj._id)) {
                aliasDetails.source = {
                    min: sourceObj.common.min,
                    max: sourceObj.common.max,
                    type: sourceObj.common.type,
                    unit: sourceObj.common.unit,
                };
            }
        }

        // add the alias target after we have ensured that we have the source set
        aliasDetails.targets.push(targetEntry);
    }

    /**
     * Remove an alias subscribe
     *
     * @param sourceId id of the source object
     * @param aliasObjOrIdx the alias target or the index of the targets array
     */
    private async _removeAliasSubscribe(sourceId: string, aliasObjOrIdx: number | AliasTargetEntry): Promise<void> {
        if (!this.aliases.has(sourceId)) {
            return;
        }

        const alias = this.aliases.get(sourceId)!;

        // remove from targets array
        const pos = typeof aliasObjOrIdx === 'number' ? aliasObjOrIdx : alias.targets.indexOf(aliasObjOrIdx);

        if (pos !== -1) {
            alias.targets.splice(pos, 1);

            // unsubscribe if no more aliases exists
            if (!alias.targets.length) {
                this.aliases.delete(sourceId);
                await this.#states!.unsubscribe(sourceId);
            }
        }
    }

    subscribeForeignStates(pattern: Pattern, callback?: ioBroker.ErrorCallback): void;
    subscribeForeignStates(pattern: Pattern, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Subscribe for changes on all states of all adapters (and system states), that pass the pattern
     *
     * Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
     * ```js
     *     adapter.subscribeForeignStates('adapterName.X.*');
     * ```
     *
     * @param pattern string in form 'adapter.0.*' or like this. It can be an array of IDs too.
     * @param options optional argument to describe the user context
     * @param callback return result ```function (err) {}```
     */
    subscribeForeignStates(pattern: unknown, options: unknown, callback?: unknown): any {
        pattern = pattern || '*';

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertOptionalCallback(callback, 'callback');

        if (pattern instanceof RegExp) {
            return tools.maybeCallbackWithError(
                callback,
                `Regexp is not supported for "subscribeForeignStates", received "${pattern.toString()}"`,
            );
        }

        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }
        Validator.assertPattern(pattern, 'pattern');

        return this._subscribeForeignStates({ pattern, options, callback });
    }

    private async _subscribeForeignStates(_options: InternalSubscribeOptions): Promise<void> {
        const { pattern, options, callback } = _options;

        // Todo check rights for options
        await this._autoSubscribeOn();

        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} subscribeForeignStates not processed because States database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }
        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} subscribeForeignStates not processed because Objects database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        // compare if this pattern for one of auto-subscribe adapters
        for (const autoSubEntry of this.autoSubscribe) {
            if (typeof pattern === 'string' && (pattern === '*' || pattern.startsWith(`${autoSubEntry}.`))) {
                // put this pattern into adapter list
                let state;
                try {
                    state = await this.#states.getState(`system.adapter.${autoSubEntry}.subscribes`);
                } catch {
                    // ignore
                }
                state = state || { val: '{}' };
                state.val = state.val || '{}';
                let subs;
                try {
                    subs = JSON.parse(state.val as any);
                } catch {
                    this._logger.error(`${this.namespaceLog} Cannot parse subscribes for "${autoSubEntry}.subscribes"`);
                }

                // validate that correct structure read from state.val
                if (!tools.isObject(subs)) {
                    subs = {};
                }

                if (!tools.isObject(subs[pattern])) {
                    subs[pattern] = {};
                }

                if (typeof subs[pattern][this.namespace] !== 'number') {
                    subs[pattern][this.namespace] = 0;
                }

                subs[pattern][this.namespace]++;
                this.outputCount++;
                this.#states.setState(`system.adapter.${autoSubEntry}.subscribes`, JSON.stringify(subs));
            }
        }

        if (Array.isArray(pattern)) {
            // get all aliases
            const aliasesIds = pattern
                .map(id => (id.startsWith(ALIAS_STARTS_WITH) ? id : null))
                .filter(id => id) as string[];

            // get all non aliases
            const nonAliasesIds = pattern
                .map(id => (!id.startsWith(ALIAS_STARTS_WITH) ? id : null))
                .filter(id => id) as string[];

            for (const aliasPattern of pattern) {
                if (
                    (aliasPattern.startsWith(ALIAS_STARTS_WITH) || aliasPattern.includes('*')) &&
                    !this.aliasPatterns.has(aliasPattern)
                ) {
                    // it's a new alias conform pattern to store
                    this.aliasPatterns.add(aliasPattern);
                }
            }

            const promises = [];

            if (aliasesIds.length) {
                if (!this._aliasObjectsSubscribed) {
                    this._aliasObjectsSubscribed = true;
                    this.#objects.subscribe(`${ALIAS_STARTS_WITH}*`);
                }

                const aliasObjs = await this._getObjectsByArray(aliasesIds, options);

                for (const aliasObj of aliasObjs) {
                    if (aliasObj) {
                        promises.push(this._addAliasSubscribe(aliasObj, aliasObj._id));
                    }
                }
            }

            if (nonAliasesIds.length) {
                for (const id of nonAliasesIds) {
                    promises.push(new Promise(resolve => this.#states!.subscribeUser(id, resolve)));
                }
            }

            try {
                await Promise.all(promises);
            } catch (e) {
                this._logger.error(`${this.namespaceLog} Error on "subscribeForeignStates": ${e.message}`);
            }
            return tools.maybeCallback(callback);
        } else if (pattern.includes('*')) {
            if (pattern === '*' || pattern.startsWith(ALIAS_STARTS_WITH)) {
                if (!this._aliasObjectsSubscribed) {
                    this._aliasObjectsSubscribed = true;
                    this.#objects.subscribe(`${ALIAS_STARTS_WITH}*`);
                }

                // read all aliases
                try {
                    // @ts-expect-error adjust types
                    const objs = await this.getForeignObjectsAsync(pattern, null, null, options);
                    const promises = [];
                    if (!this.aliasPatterns.has(pattern)) {
                        // it's a new pattern to store
                        this.aliasPatterns.add(pattern);
                    }

                    for (const id of Object.keys(objs)) {
                        // If alias
                        if (id.startsWith(ALIAS_STARTS_WITH)) {
                            const aliasObj = objs[id];
                            promises.push(this._addAliasSubscribe(aliasObj, pattern));
                        }
                    }

                    try {
                        await Promise.all(promises);
                    } catch (e) {
                        this._logger.error(`${this.namespaceLog} Error on "subscribeForeignStates": ${e.message}`);
                    }

                    if (!this.#states) {
                        // if states is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            `${this.namespaceLog} subscribeForeignStates not processed because States database not connected`,
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    if (promises.length && pattern !== '*') {
                        return tools.maybeCallback(callback);
                    }
                    // no alias objects found or pattern *
                    this.#states.subscribeUser(pattern, callback);
                } catch (e) {
                    this._logger.warn(`${this.namespaceLog} Cannot subscribe to ${pattern}: ${e.message}`);
                    return tools.maybeCallbackWithError(callback, e);
                }
            } else {
                this.#states.subscribeUser(pattern, callback);
            }
        } else if (pattern.startsWith(ALIAS_STARTS_WITH)) {
            if (!this._aliasObjectsSubscribed) {
                this._aliasObjectsSubscribed = true;
                this.#objects.subscribe(`${ALIAS_STARTS_WITH}*`);
            }

            // just read one alias Object
            try {
                const aliasObj = await this.#objects.getObject(pattern, options);
                if (aliasObj) {
                    await this._addAliasSubscribe(aliasObj, pattern);
                    return tools.maybeCallback(callback);
                }
                return tools.maybeCallback(callback);
            } catch (e) {
                this._logger.warn(`${this.namespaceLog} cannot subscribe on alias "${pattern}": ${e.message}`);
            }
        } else {
            this.#states.subscribeUser(pattern, callback);
        }
    }

    unsubscribeForeignStates(pattern: string | string[], callback?: ioBroker.ErrorCallback): void;
    unsubscribeForeignStates(pattern: string | string[], options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Unsubscribe for changes for given pattern
     *
     * This function allows to unsubscribe from changes. The pattern must be equal to requested one.
     * ```js
     *     adapter.subscribeForeignStates('adapterName.X.*');
     *     adapter.unsubscribeForeignStates('adapterName.X.abc*'); // This will not work
     *     adapter.unsubscribeForeignStates('adapterName.X.*'); // Valid unsubscribe
     * ```
     *
     * @param pattern string in form 'adapter.0.*'. Must be the same as subscribe.
     * @param options optional argument to describe the user context
     * @param callback return result
     * ```js
     * function (err) {}
     * ```
     */
    unsubscribeForeignStates(pattern: unknown, options: unknown, callback?: unknown): any {
        pattern = pattern || '*';

        // Todo check rights for options
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertOptionalCallback(callback, 'callback');

        if (pattern instanceof RegExp) {
            return tools.maybeCallbackWithError(
                callback,
                `Regexp is not supported for "unsubscribeForeignStates", received "${pattern.toString()}"`,
            );
        }

        Validator.assertPattern(pattern, 'pattern');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._unsubscribeForeignStates({ pattern, options, callback });
    }

    private async _unsubscribeForeignStates(_options: InternalSubscribeOptions): Promise<void> {
        const { pattern, callback } = _options;

        if (!this.#states) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} unsubscrubeForeignStates not processed because States database not connected`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (this.autoSubscribe && typeof pattern === 'string') {
            for (const autoSub of this.autoSubscribe) {
                if (pattern === '*' || pattern.substring(0, autoSub.length + 1) === `${autoSub}.`) {
                    // remove this pattern from adapter list
                    let state;
                    try {
                        state = await this.#states.getState(`system.adapter.${autoSub}.subscribes`);
                    } catch {
                        // ignore
                    }
                    if (!state || !state.val) {
                        continue;
                    }
                    let subs;
                    try {
                        subs = JSON.parse(state.val as any);
                    } catch {
                        this._logger.error(`${this.namespaceLog} Cannot parse subscribes for "${autoSub}.subscribes"`);
                        continue;
                    }

                    if (
                        !tools.isObject(subs) ||
                        !tools.isObject(subs[pattern]) ||
                        subs[pattern][this.namespace] === undefined
                    ) {
                        // check subs is a valid object, because it comes from state.val
                        continue;
                    }

                    if (typeof subs[pattern][this.namespace] === 'number') {
                        subs[pattern][this.namespace]--;
                        if (subs[pattern][this.namespace] <= 0) {
                            delete subs[pattern][this.namespace];
                        }
                    } else {
                        // corrupted info, we can only delete
                        delete subs[pattern][this.namespace];
                    }

                    // if no other subs are there
                    if (!Object.keys(subs[pattern]).length) {
                        delete subs[pattern];
                    }
                    this.outputCount++;
                    this.#states.setState(`system.adapter.${autoSub}.subscribes`, JSON.stringify(subs));
                }
            }
        }

        let aliasPattern;
        const promises = [];

        if (Array.isArray(pattern)) {
            // process every entry as single unsubscribe
            for (const _pattern of pattern) {
                promises.push(this.unsubscribeForeignStatesAsync(_pattern));
            }
        } else if (pattern.includes('*') || pattern.startsWith(ALIAS_STARTS_WITH)) {
            if (pattern === '*' || pattern.startsWith(ALIAS_STARTS_WITH)) {
                aliasPattern = pattern; // check all aliases
                if (pattern === '*') {
                    promises.push(this.#states.unsubscribeUser(pattern));
                }
            } else {
                promises.push(this.#states.unsubscribeUser(pattern));
            }
        } else {
            promises.push(this.#states.unsubscribeUser(pattern));
        }

        if (aliasPattern) {
            // if pattern known, remove it from alias patterns to not subscribe to further matching aliases
            this.aliasPatterns.delete(aliasPattern);

            for (const [sourceId, alias] of this.aliases) {
                for (let i = alias.targets.length - 1; i >= 0; i--) {
                    if (alias.targets[i].pattern === aliasPattern) {
                        promises.push(this._removeAliasSubscribe(sourceId, i));
                    }
                }
            }
        }

        await Promise.all(promises);
        // if no alias subscribed any longer, remove subscription
        if (!this.aliases.size && this._aliasObjectsSubscribed) {
            this._aliasObjectsSubscribed = false;
            this.#objects!.unsubscribe(`${ALIAS_STARTS_WITH}*`);
        }
        return tools.maybeCallback(callback);
    }

    subscribeStates(pattern: Pattern, callback?: ioBroker.ErrorCallback): void;
    subscribeStates(pattern: Pattern, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Subscribe for changes on all states of this instance, that pass the pattern
     *
     * Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
     * ```js
     *     adapter.subscribeStates('*'); // subscribe for all states of this adapter
     * ```
     *
     * @param pattern string in form 'adapter.0.*' or like this. Only string allowed
     * @param options optional argument to describe the user context
     * @param callback optional callback
     */
    subscribeStates(pattern: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertPattern(pattern, 'pattern');
        Validator.assertOptionalCallback(callback, 'callback');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._subscribeForeignStates({
            pattern: Array.isArray(pattern) ? pattern : this._utils.fixId(pattern, true),
            options,
            callback,
        });
    }

    unsubscribeStates(pattern: Pattern, callback?: ioBroker.ErrorCallback): void;
    unsubscribeStates(pattern: Pattern, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Unsubscribe for changes for given pattern for own states.
     *
     * This function allows to unsubscribe from changes. The pattern must be equal to requested one.
     *
     * ```js
     *     adapter.unsubscribeStates('abc*'); // This will not work
     *     adapter.unsubscribeStates('*');    // Valid unsubscribe
     * ```
     *
     * @param pattern string in form 'adapter.0.*'. Must be the same as subscribe.
     * @param options optional argument to describe the user context
     * @param callback optional callback
     */
    unsubscribeStates(pattern: unknown, options: unknown, callback?: unknown): any {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Validator.assertPattern(pattern, 'pattern');
        Validator.assertOptionalCallback(callback, 'callback');
        if (options !== null && options !== undefined) {
            Validator.assertObject(options, 'options');
        }

        return this._unsubscribeForeignStates({
            pattern: Array.isArray(pattern) ? pattern : this._utils.fixId(pattern, true),
            options,
            callback,
        });
    }

    getPluginInstance(name: string): ioBroker.Plugin | null;

    /**
     * Return plugin instance
     *
     * @param name name of the plugin to return
     * @returns plugin instance or null if not existent or not isActive
     */
    getPluginInstance(name: unknown): ioBroker.Plugin | null {
        if (!this.pluginHandler) {
            return null;
        }

        Validator.assertString(name, 'name');

        return this.pluginHandler.getPluginInstance(name);
    }

    getPluginConfig(name: string): Record<string, any> | null;

    /**
     * Return plugin configuration
     *
     * @param name name of the plugin to return
     * @returns plugin configuration or null if not existent or not isActive
     */
    getPluginConfig(name: unknown): Record<string, any> | null {
        if (!this.pluginHandler) {
            return null;
        }

        Validator.assertString(name, 'name');
        return this.pluginHandler.getPluginConfig(name);
    }

    private async _autoSubscribeOn(): Promise<void> {
        if (!this.autoSubscribe && this.#objects) {
            try {
                // collect all
                const res = await this.#objects.getObjectViewAsync('system', 'instance', {
                    startkey: 'system.adapter.',
                    endkey: 'system.adapter.\u9999',
                });

                this.autoSubscribe = [];
                for (const row of res.rows) {
                    if (row.value?.common.subscribable) {
                        const _id = row.id.substring(15); // cut system.adapter.
                        if (!this.autoSubscribe.includes(_id)) {
                            this.autoSubscribe.push(_id);
                        }
                    }
                }

                // because of autoSubscribe
                await this.#objects.subscribeAsync('system.adapter.*');
            } catch {
                // ignore
            }
        }
    }

    getSuitableLicenses(all?: boolean, adapterName?: string): Promise<any[]>;

    /**
     * This method returns the list of license that can be used by this adapter
     *
     * @param all if return the licenses, that used by other instances (true) or only for this instance (false)
     * @param adapterName Return licenses for specific adapter
     * @returns list of suitable licenses
     */
    async getSuitableLicenses(all?: boolean, adapterName?: string): Promise<SuitableLicense[]> {
        const licenses: SuitableLicense[] = [];
        try {
            const obj = await this.getForeignObjectAsync('system.licenses');
            const uuidObj = await this.getForeignObjectAsync('system.meta.uuid');
            if (!uuidObj?.native?.uuid) {
                this._logger.warn(`${this.namespaceLog} No UUID found!`);
                return licenses;
            }

            const uuid: string = uuidObj.native.uuid;

            if (obj?.native?.licenses?.length) {
                const now = Date.now();
                const cert = fs.readFileSync(path.join(thisDir, '..', '..', 'cert', 'cloudCert.crt'));
                let adapterObj: ioBroker.AdapterObject | null | undefined;
                if (adapterName) {
                    try {
                        adapterObj = await this.getForeignObjectAsync(`system.adapter.${adapterName}`);
                    } catch {
                        // ignore
                    }
                }

                const version = semver.major(adapterObj?.common?.version || this.pack!.version);

                for (const license of obj.native.licenses as Omit<SuitableLicense, 'decoded'>[]) {
                    try {
                        const decoded: any = jwt.verify(license.json, cert);
                        if (
                            decoded.name &&
                            (!decoded.valid_till ||
                                decoded.valid_till === '0000-00-00 00:00:00' ||
                                new Date(decoded.valid_till).getTime() > now)
                        ) {
                            if (
                                decoded.name.startsWith(`iobroker.${adapterName || this.name}`) &&
                                (all || !license.usedBy || license.usedBy === this.namespace)
                            ) {
                                // Licenses for version ranges 0.x and 1.x are handled identically and are valid for both version ranges.
                                // If license is for adapter with version 0 or 1
                                if (
                                    decoded.version === '&lt;2' ||
                                    decoded.version === '<2' ||
                                    decoded.version === '<1' ||
                                    decoded.version === '<=1'
                                ) {
                                    // check the current adapter major version
                                    if (version !== 0 && version !== 1) {
                                        // exception if vis-1 has UUID, so it is valid for vis-2
                                        const exception =
                                            decoded.name === 'iobroker.vis' && version === 2 && decoded.uuid;

                                        if (!exception) {
                                            continue;
                                        }
                                    }
                                } else if (decoded.version && decoded.version !== version) {
                                    // Licenses for adapter versions >=2 need to match to the adapter major version,
                                    // which means that a new major version requires new licenses if it would be "included"
                                    //  in the last purchase

                                    // decoded.version could be only '<2' or direct version, like "2", "3" and so on
                                    continue;
                                }
                                if (decoded.uuid && decoded.uuid !== uuid) {
                                    // License is not for this server
                                    continue;
                                }

                                // remove free license if commercial license found
                                if (decoded.invoice !== 'free') {
                                    const pos = licenses.findIndex(item => item.invoice === 'free');
                                    if (pos !== -1) {
                                        licenses.splice(pos, 1);
                                    }
                                }

                                licenses.push({ ...license, decoded });
                            }
                        }
                    } catch (e) {
                        this._logger.error(
                            `${this.namespaceLog} Cannot decode license "${license.product}": ${e.message}`,
                        );
                    }
                }
            }
        } catch {
            // ignore
        }

        licenses.sort((a, b) => {
            const aInvoice = a.decoded.invoice !== 'free';
            const bInvoice = b.decoded.invoice !== 'free';
            if (aInvoice === bInvoice) {
                return 0;
            } else if (aInvoice) {
                return -1;
            } else if (bInvoice) {
                return 1;
            }

            return 0;
        });

        return licenses;
    }

    /**
     * Add given id to log redirect list
     *
     * @param isActive if id should be added or removed
     * @param id the id to add
     */
    private logRedirect(isActive: boolean, id: string): void {
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

    private _reportStatus(): void {
        if (!this.#states) {
            return;
        }

        /** Time after which states regularly set by the status report expire in seconds */
        const reportStatusExpirySec = Math.floor(this._config.system.statisticsInterval / 1_000) + 10;

        const id = `system.adapter.${this.namespace}`;
        this.#states.setState(`${id}.alive`, {
            val: true,
            ack: true,
            expire: reportStatusExpirySec,
            from: id,
        });
        this.outputCount++;
        if (this.connected) {
            this.#states.setState(`${id}.connected`, {
                val: true,
                ack: true,
                expire: reportStatusExpirySec,
                from: id,
            });
            this.outputCount++;
        }
        if (!this.startedInCompactMode) {
            // pidUsage([pid,pid,...], function (err, stats) {
            // => {
            //   cpu: 10.0,            // percentage (from 0 to 100*vcore)
            //   memory: 357306368,    // bytes
            //   ppid: 312,            // PPID
            //   pid: 727,             // PID
            //   ctime: 867000,        // ms user + system time
            //   elapsed: 6650000,     // ms since the start of the process
            //   timestamp: 864000000  // ms since epoch
            // }
            pidUsage(process.pid, (err, stats) => {
                // sometimes adapter is stopped, but this is still running
                if (!err && this && this.#states && this.#states.setState && stats) {
                    this.#states.setState(`${id}.cpu`, {
                        ack: true,
                        from: id,
                        val: Math.round(100 * stats.cpu) / 100,
                        expire: reportStatusExpirySec,
                    });
                    this.#states.setState(`${id}.cputime`, {
                        ack: true,
                        from: id,
                        val: stats.ctime / 1_000,
                        expire: reportStatusExpirySec,
                    });
                    this.outputCount += 2;
                }
            });
            try {
                //RSS is the resident set size, the portion of the process's memory held in RAM (as opposed to the swap space or the part held in the filesystem).
                const mem = process.memoryUsage();
                this.#states.setState(`${id}.memRss`, {
                    val: parseFloat(
                        (mem.rss / 1048576) /* 1MB */
                            .toFixed(2),
                    ),
                    ack: true,
                    from: id,
                    expire: reportStatusExpirySec,
                });
                this.#states.setState(`${id}.memHeapTotal`, {
                    val: parseFloat(
                        (mem.heapTotal / 1048576) /* 1MB */
                            .toFixed(2),
                    ),
                    ack: true,
                    from: id,
                    expire: reportStatusExpirySec,
                });
                this.#states.setState(`${id}.memHeapUsed`, {
                    val: parseFloat(
                        (mem.heapUsed / 1048576) /* 1MB */
                            .toFixed(2),
                    ),
                    ack: true,
                    from: id,
                    expire: reportStatusExpirySec,
                });
            } catch (e) {
                this._logger.warn(`${this.namespaceLog} Could not query used process memory: ${e.message}`);
            }
            this.outputCount += 3;
            if (this.eventLoopLags.length) {
                const eventLoopLag = Math.ceil(this.eventLoopLags.reduce((a, b) => a + b) / this.eventLoopLags.length);
                this.#states.setState(`${id}.eventLoopLag`, {
                    val: eventLoopLag,
                    ack: true,
                    from: id,
                    expire: reportStatusExpirySec,
                }); // average of measured values
                this.eventLoopLags = [];
                this.outputCount++;
            }
        }
        this.outputCount += 3;
        this.#states.setState(`${id}.uptime`, {
            val: parseInt(process.uptime().toFixed(), 10),
            ack: true,
            from: id,
            expire: reportStatusExpirySec,
        });
        this.#states.setState(`${id}.inputCount`, {
            val: this.inputCount,
            ack: true,
            from: id,
            expire: reportStatusExpirySec,
        });
        this.#states.setState(`${id}.outputCount`, {
            val: this.outputCount,
            ack: true,
            from: id,
            expire: reportStatusExpirySec,
        });
        this.inputCount = 0;
        this.outputCount = 0;
    }

    // debug function to find error with stop logging
    private _checkLogging(): void {
        let logs: null | string[] = [];
        // LogList
        logs.push(`Actual Loglist - ${JSON.stringify(Array.from(this.logList))}`);

        if (!this.#states) {
            // if adapterState was destroyed, we can not continue
            return;
        }

        // Read current state of all log subscribers
        this.#states.getKeys(`${SYSTEM_ADAPTER_PREFIX}*.logging`, (err, keys) => {
            if (keys?.length) {
                if (!this.#states) {
                    // if adapterState was destroyed, we can not continue
                    return;
                }

                this.#states.getStates(keys, (err, obj) => {
                    if (obj) {
                        for (let i = 0; i < keys.length; i++) {
                            const objPart = obj[i];
                            // We can JSON.parse, but index is 16x faster
                            if (objPart) {
                                const id = keys[i].substring(0, keys[i].length - '.logging'.length);
                                if (
                                    (typeof objPart === 'string' &&
                                        // @ts-expect-error recheck code-wise this should not be possible to have a string
                                        (objPart.includes('"val":true') || objPart.includes('"val":"true"'))) ||
                                    (typeof objPart === 'object' && (objPart.val === true || objPart.val === 'true'))
                                ) {
                                    logs!.push(`Subscriber - ${id} ENABLED`);
                                } else {
                                    if (logs) {
                                        logs.push(`Subscriber - ${id} (disabled)`);
                                    } else {
                                        this._logger.error(
                                            `${this.namespaceLog} LOGINFO: Subscriber - ${id} (disabled)`,
                                        );
                                    }
                                }
                            }
                        }
                    }
                    if (logs) {
                        for (let m = 0; m < logs.length; m++) {
                            this._logger.error(`${this.namespaceLog} LOGINFO: ${logs[m]}`);
                        }
                        logs = null;
                    }
                });
            }
        });
    }

    /**
     * Initialize the logging logic
     */
    private async _initLogging(): Promise<void> {
        if (!this.#states) {
            // if adapterState was destroyed, we can not continue
            return;
        }

        // temporary log buffer
        let messages: null | any[] = [];

        // If some message from logger
        // find our notifier transport
        // @ts-expect-error
        const ts = this._logger.transports.find(t => t.name === 'NT');
        // @ts-expect-error
        ts.on('logged', info => {
            info.from = this.namespace;
            // emit to itself
            if (this._options.logTransporter && this.logRequired && !this._stopInProgress) {
                this.emit('log', info);
            }

            if (!this.logList.size) {
                // if log buffer still active
                if (messages && !this._options.logTransporter) {
                    messages.push(info);

                    // do not let messages grow without limit
                    if (messages.length > this._config.states.maxQueue) {
                        messages.splice(0, messages.length - this._config.states.maxQueue);
                    }
                }
            } else if (this.#states?.pushLog) {
                // Send to all adapter, that required logs
                for (const instanceId of this.logList) {
                    this.#states.pushLog(instanceId, info);
                }
            }
        });

        const keys = await this.#states.getKeys(`${SYSTEM_ADAPTER_PREFIX}*.logging`);
        if (keys?.length) {
            if (!this.#states) {
                // if adapterState was destroyed, we can not continue
                return;
            }

            const obj = await this.#states.getStates(keys);
            if (obj) {
                for (let i = 0; i < keys.length; i++) {
                    const objPart = obj[i];
                    // We can JSON.parse, but index is 16x faster
                    if (!objPart) {
                        continue;
                    }
                    const id = keys[i].substring(0, keys[i].length - '.logging'.length);

                    if (typeof objPart === 'object' && (objPart.val === true || objPart.val === 'true')) {
                        this.logRedirect(true, id);
                    }
                }
                if (this.logList.size && messages?.length && this.#states) {
                    for (const message of messages) {
                        for (const instanceId of this.logList) {
                            this.#states.pushLog(instanceId, message);
                        }
                    }
                }
            }
            // clear log buffer
            messages = null;
        } else {
            // disable log buffer
            messages = null;
        }

        this._options.logTransporter = this._options.logTransporter || this.ioPack.common.logTransporter;

        if (this._options.logTransporter) {
            this.requireLog = async (isActive, options) => {
                if (!this.#states) {
                    return;
                }

                if (this.logRequired !== isActive) {
                    this.logRequired = isActive; // remember state
                    if (!isActive) {
                        if (this.logOffTimer) {
                            clearTimeout(this.logOffTimer);
                        }
                        // disable log receiving after 10 seconds
                        this.logOffTimer = setTimeout(async () => {
                            this.logOffTimer = null;
                            this._logger.silly(`${this.namespaceLog} Change log subscriber state: FALSE`);
                            this.outputCount++;
                            if (this.#states) {
                                try {
                                    await this.setForeignStateAsync(
                                        `system.adapter.${this.namespace}.logging`,
                                        {
                                            val: false,
                                            ack: true,
                                            from: `system.adapter.${this.namespace}`,
                                        },
                                        options,
                                    );
                                } catch (e) {
                                    this._logger.warn(
                                        `${this.namespaceLog} Could not change log subscriber state to "false": ${e.message}`,
                                    );
                                }
                            }
                        }, 10_000);
                    } else {
                        if (this.logOffTimer) {
                            clearTimeout(this.logOffTimer);
                            this.logOffTimer = null;
                        } else {
                            this._logger.silly(`${this.namespaceLog} Change log subscriber state: true`);
                            this.outputCount++;
                            try {
                                await this.setForeignStateAsync(
                                    `system.adapter.${this.namespace}.logging`,
                                    {
                                        val: true,
                                        ack: true,
                                        from: `system.adapter.${this.namespace}`,
                                    },
                                    options,
                                );
                            } catch (e) {
                                this._logger.warn(
                                    `${this.namespaceLog} Could not change log subscriber state to "true": ${e.message}`,
                                );
                            }
                        }
                    }
                }
            };

            this.processLog = msg => {
                if (msg && !this._stopInProgress) {
                    this.emit('log', msg);
                }
            };

            this.#states.subscribeLog(`system.adapter.${this.namespace}`);
        } else {
            this.requireLog = isActive => {
                if (isActive) {
                    this._logger.warn(
                        `${this.namespaceLog} requireLog is not supported by this adapter! Please set common.logTransporter to true`,
                    );
                }
            };
        }
    }

    // initStates is called from initAdapter
    private _initStates(cb: () => void): void {
        this._logger.silly(`${this.namespaceLog} objectDB connected`);

        this._config.states.maxQueue = this._config.states.maxQueue || 1_000;

        this._initializeTimeout = setTimeout(() => {
            this._initializeTimeout = null;
            if (this._config.isInstall) {
                this._logger.warn(`${this.namespaceLog} no connection to states DB. Terminating.`);
                this.terminate(EXIT_CODES.NO_ERROR);
            } else {
                this._logger.warn(`${this.namespaceLog} slow connection to states DB. Still waiting ...`);
            }
        }, this._config.states.connectTimeout || 2_000);

        if (!this.States) {
            this._logger.warn(`${this.namespaceLog} States DB constructor has not been initialized`);
            this.terminate(EXIT_CODES.NO_ERROR);
        }

        // Internal object, but some special adapters want to access it anyway.
        this.#states = new this.States({
            namespace: this.namespaceLog,
            connection: this._config.states,
            connected: async () => {
                if (!this.#states) {
                    return;
                }

                this._logger.silly(`${this.namespaceLog} statesDB connected`);
                this.statesConnectedTime = Date.now();

                if (this._initializeTimeout) {
                    clearTimeout(this._initializeTimeout);
                    this._initializeTimeout = null;
                }

                if (!this._config.isInstall) {
                    // Subscribe for process exit signal
                    this.#states.subscribe(`system.adapter.${this.namespace}.sigKill`);

                    // Subscribe for loglevel
                    this.#states.subscribe(`system.adapter.${this.namespace}.logLevel`);
                }
                if (this._options.subscribable) {
                    // subscribe on if other instance wants to have states of this adapter
                    this.#states.subscribe(`system.adapter.${this.namespace}.subscribes`);

                    // read actual autosubscribe requests
                    let state;
                    try {
                        state = await this.#states.getStateAsync(`system.adapter.${this.namespace}.subscribes`);
                    } catch {
                        // ignore
                    }
                    if (!state?.val) {
                        this.patterns = {};
                    } else {
                        try {
                            this.patterns = JSON.parse(state.val as string);
                            Object.keys(this.patterns!).forEach(
                                p => (this.patterns![p].regex = tools.pattern2RegEx(p)),
                            );
                        } catch {
                            this.patterns = {};
                        }
                    }
                    return tools.maybeCallback(cb);
                }
                return tools.maybeCallback(cb);
            },
            logger: this._logger,
            change: async (id, stateOrMessage) => {
                this.inputCount++;
                // for simplicity reasons we exclude Message for now TODO
                const state = stateOrMessage as ioBroker.State | null;

                if (!id || typeof id !== 'string') {
                    this._logger.warn(`${this.namespaceLog} Invalid id on system state change: ${JSON.stringify(id)}`);
                    return;
                }

                if (
                    id === `system.adapter.${this.namespace}.sigKill` &&
                    state &&
                    state.ts > this.statesConnectedTime! &&
                    state.from &&
                    state.from.startsWith('system.host.')
                ) {
                    const sigKillVal = parseInt(state.val as any);
                    if (!isNaN(sigKillVal)) {
                        if (this.startedInCompactMode || sigKillVal === -1) {
                            this._logger.info(
                                `${this.namespaceLog} Got terminate signal ${
                                    sigKillVal === -1 ? 'TERMINATE_YOURSELF' : ` TERMINATE ${sigKillVal}`
                                }`,
                            );
                        } else {
                            this._logger.warn(
                                `${this.namespaceLog} Got terminate signal. Checking desired PID: ${sigKillVal} vs own PID ${process.pid}`,
                            );
                        }
                        // by deletion of state, stop this instance
                        if (sigKillVal !== process.pid && !this._config.forceIfDisabled) {
                            this._stop({
                                isPause: false,
                                isScheduled: false,
                                exitCode: EXIT_CODES.ADAPTER_REQUESTED_TERMINATION,
                                updateAliveState: false,
                            });
                            setTimeout(() => this.terminate(EXIT_CODES.ADAPTER_REQUESTED_TERMINATION), 4000);
                        }
                    }
                }

                if (id === `system.adapter.${this.namespace}.logLevel`) {
                    if (this._config && this._config.log && state && !state.ack) {
                        let currentLevel = this._config.log.level;
                        if (
                            state.val &&
                            state.val !== currentLevel &&
                            ['silly', 'debug', 'info', 'warn', 'error'].includes(state.val as string)
                        ) {
                            this.overwriteLogLevel = true;
                            this._config.log.level = state.val;
                            for (const transport in this._logger.transports) {
                                if (!Object.prototype.hasOwnProperty.call(this._logger.transports, transport)) {
                                    continue;
                                }
                                // set the loglevel on transport only if no loglevel was pinned in log config
                                // @ts-expect-error it is our own modification
                                if (!this._logger.transports[transport]._defaultConfigLoglevel) {
                                    this._logger.transports[transport].level = state.val as string;
                                }
                            }
                            this._logger.info(
                                `${this.namespaceLog} Loglevel changed from "${currentLevel}" to "${state.val}"`,
                            );
                            currentLevel = state.val;
                        } else if (state.val && state.val !== currentLevel) {
                            this._logger.info(`${this.namespaceLog} Got invalid loglevel "${state.val}", ignoring`);
                        }
                        this.outputCount++;
                        this.#states &&
                            this.#states.setState(`system.adapter.${this.namespace}.logLevel`, {
                                val: currentLevel,
                                ack: true,
                                from: `system.adapter.${this.namespace}`,
                            });
                    }
                }

                // todo remove it as an error with log will be found
                if (id === `system.adapter.${this.namespace}.checkLogging`) {
                    this._checkLogging();
                }

                // someone subscribes or unsubscribes from adapter
                if (this._options.subscribable && id === `system.adapter.${this.namespace}.subscribes`) {
                    let subs: Record<string, any>;
                    try {
                        subs = JSON.parse((state && (state.val as string)) || '{}');
                        Object.keys(subs).forEach(p => (subs[p].regex = tools.pattern2RegEx(p)));
                    } catch {
                        subs = {};
                    }

                    this.patterns = subs;
                    if (!this._stopInProgress) {
                        if (typeof this._options.subscribesChange === 'function') {
                            this._options.subscribesChange(subs);
                        } else {
                            this.emit('subscribesChange', subs);
                        }
                    }
                }

                // If someone want to have log messages
                if (id.startsWith(SYSTEM_ADAPTER_PREFIX) && id.endsWith('.logging')) {
                    const instance = id.substring(0, id.length - '.logging'.length);

                    this._logger.silly(`${this.namespaceLog} ${instance}: logging ${state ? state.val : false}`);
                    this.logRedirect(state ? !!state.val : false, instance);
                } else if (id === `log.system.adapter.${this.namespace}`) {
                    this._options.logTransporter && this.processLog && this.processLog(state);
                } else if (id === `messagebox.system.adapter.${this.namespace}` && state) {
                    // If this is messagebox
                    const obj = state as unknown as ioBroker.Message;

                    if (obj) {
                        let callbackObj: MessageCallbackObject | undefined;

                        if (obj.callback?.id) {
                            callbackObj = this.messageCallbacks.get(obj.callback.id);
                        }

                        // If callback stored for this request
                        if (obj.callback?.ack && obj.callback.id && callbackObj) {
                            // Call callback function
                            if (typeof callbackObj.cb === 'function') {
                                callbackObj.cb(obj.message);

                                if (callbackObj.timer) {
                                    clearTimeout(callbackObj.timer);
                                }

                                this.messageCallbacks.delete(obj.callback.id);
                            }
                            // delete too old callbacks IDs, like garbage collector
                            const now = Date.now();
                            for (const [_id, callback] of this.messageCallbacks) {
                                if (now - callback.time > 3_600_000) {
                                    this.messageCallbacks.delete(_id);
                                }
                            }
                        } else if (!this._stopInProgress) {
                            if (obj.command === 'clientSubscribe') {
                                const res = await this.uiMessagingController.registerClientSubscribeByMessage(obj);
                                this.sendTo(obj.from, obj.command, res, obj.callback);
                                return;
                            }

                            if (obj.command === 'clientUnsubscribe' || obj.command === 'clientSubscribeError') {
                                return this.uiMessagingController.removeClientSubscribeByMessage(
                                    obj as UserInterfaceClientRemoveMessage,
                                );
                            }

                            if (this._options.message) {
                                // Else inform about a new message the adapter
                                this._options.message(obj);
                            }
                            this.emit('message', obj);
                        }
                    }
                } else if (id.startsWith(`system.adapter.${this.namespace}.plugins.`) && id.endsWith('.enabled')) {
                    if (!state || state.ack) {
                        return;
                    }
                    const pluginStatesIndex = `system.adapter.${this.namespace}.plugins.`.length;
                    let nameEndIndex: number | undefined = id.indexOf('.', pluginStatesIndex + 1);
                    if (nameEndIndex === -1) {
                        nameEndIndex = undefined;
                    }
                    const pluginName = id.substring(pluginStatesIndex, nameEndIndex);

                    if (!this.pluginHandler?.pluginExists(pluginName)) {
                        return;
                    }

                    if (this.pluginHandler.isPluginActive(pluginName) !== state.val) {
                        if (state.val) {
                            if (!this.pluginHandler.isPluginInstantiated(pluginName)) {
                                this.pluginHandler.instantiatePlugin(
                                    pluginName,
                                    this.pluginHandler.getPluginConfig(pluginName) || {},
                                    thisDir,
                                );
                                this.pluginHandler.setDatabaseForPlugin(pluginName, this.#objects, this.#states);
                                this.pluginHandler.initPlugin(pluginName, this.adapterConfig || {});
                            }
                        } else {
                            if (!this.pluginHandler.destroy(pluginName)) {
                                this._logger.info(
                                    `${this.namespaceLog} Plugin ${pluginName} could not be disabled. Please restart adapter to disable it.`,
                                );
                            }
                        }
                    }
                } else if (!this._stopInProgress && this.adapterReady && this.aliases.has(id)) {
                    // If adapter is ready and for this ID exist some alias links
                    const alias = this.aliases.get(id)!;
                    /** Prevent multiple publishes if multiple pattern contain this alias id */
                    const uniqueTargets = new Set<string>();

                    for (const target of alias.targets) {
                        const targetId = target.id;
                        if (uniqueTargets.has(targetId)) {
                            continue;
                        }

                        uniqueTargets.add(targetId);

                        const source = alias.source;

                        const aState = state
                            ? tools.formatAliasValue({
                                  sourceCommon: source,
                                  targetCommon: target,
                                  state: deepClone(state),
                                  logger: this._logger,
                                  logNamespace: this.namespaceLog,
                                  sourceId: id,
                                  targetId,
                              })
                            : null;

                        if (aState || !state) {
                            if (typeof this._options.stateChange === 'function') {
                                this._options.stateChange(targetId, aState);
                            } else {
                                // emit 'stateChange' event instantly
                                setImmediate(() => this.emit('stateChange', targetId, aState));
                            }
                        }
                    }
                }
            },
            changeUser: (id, state) => {
                this.inputCount++;

                if (!id || typeof id !== 'string') {
                    this._logger.warn(`${this.namespaceLog} Invalid id on state change: ${JSON.stringify(id)}`);
                    return;
                }

                if (this.adapterReady) {
                    if (this.oStates) {
                        if (!state) {
                            delete this.oStates[id];
                        } else {
                            this.oStates[id] = state;
                        }
                    }

                    if (!this._stopInProgress) {
                        if (typeof this._options.stateChange === 'function') {
                            setImmediate(() => this._options.stateChange!(id, state));
                        } else {
                            // emit 'stateChange' event instantly
                            setImmediate(() => this.emit('stateChange', id, state));
                        }
                    }
                }
            },
            disconnected: () => {
                this.connected = false;
                !this.terminated &&
                    setTimeout(() => {
                        if (this.connected) {
                            return;
                        } // If reconnected in the meantime, do not terminate
                        this._logger.warn(`${this.namespaceLog} Cannot connect/reconnect to states DB. Terminating`);
                        this.terminate(EXIT_CODES.NO_ERROR);
                    }, 5000);
            },
        });
    }

    private _initObjects(cb: () => void): void {
        this._initializeTimeout = setTimeout(() => {
            this._initializeTimeout = null;
            if (this._config.isInstall) {
                this._logger.warn(`${this.namespaceLog} no connection to objects DB. Terminating`);
                this.terminate(EXIT_CODES.NO_ERROR);
            } else {
                this._logger.warn(`${this.namespaceLog} slow connection to objects DB. Still waiting ...`);
            }
        }, this._config.objects.connectTimeout * 2); // Because we do not connect only anymore, give it a bit more time

        if (!this.Objects) {
            this._logger.warn(`${this.namespaceLog} Objects DB constructor has not been initialized`);
            this.terminate(EXIT_CODES.NO_ERROR);
        }

        this.#objects = new this.Objects({
            namespace: this.namespaceLog,
            connection: this._config.objects,
            logger: this._logger,
            connected: async () => {
                this.connected = true;
                if (this._initializeTimeout) {
                    clearTimeout(this._initializeTimeout);
                    this._initializeTimeout = null;
                }

                if (!this.#objects) {
                    return;
                }

                // subscribe to user changes
                this.#objects.subscribe('system.user.*');

                // get all enums and register for enum changes
                this.enums = await tools.getAllEnums(this.#objects);
                this.#objects.subscribe('enum.*');

                // Read dateformat if using of formatDate is announced
                if (this._options.useFormatDate) {
                    this.#objects.getObject('system.config', (err, data) => {
                        if (data?.common) {
                            this.dateFormat = data.common.dateFormat;
                            this.isFloatComma = data.common.isFloatComma;
                            this.language = data.common.language;
                            this.longitude = data.common.longitude;
                            this.latitude = data.common.latitude;
                            this.defaultHistory = data.common.defaultHistory;
                        }
                        if (data?.native) {
                            this._systemSecret = data.native.secret;
                        }
                        return tools.maybeCallback(cb);
                    });
                } else {
                    return tools.maybeCallback(cb);
                }
            },
            disconnected: () => {
                this.connected = false;
                !this.terminated &&
                    setTimeout(() => {
                        if (this.connected) {
                            return;
                        } // If reconnected in the meantime, do not terminate

                        this._logger.warn(`${this.namespaceLog} Cannot connect/reconnect to objects DB. Terminating`);
                        this.terminate(EXIT_CODES.NO_ERROR);
                    }, 4000);
            },
            change: async (id, obj) => {
                // System level object changes (and alias objects)
                if (!id) {
                    this._logger.error(`${this.namespaceLog} change ID is empty: ${JSON.stringify(obj)}`);
                    return;
                }

                // If desired, that adapter must be terminated
                if (id === `system.adapter.${this.namespace}` && obj?.common?.enabled === false) {
                    this._logger.info(`${this.namespaceLog} Adapter is disabled => stop`);
                    this._stop();
                    setTimeout(() => this.terminate(EXIT_CODES.NO_ERROR), 4_000);
                    return;
                }

                // update language, dateFormat and comma
                if (
                    id === 'system.config' &&
                    obj?.common &&
                    (this._options.useFormatDate || this.defaultHistory !== undefined)
                ) {
                    this.dateFormat = obj.common.dateFormat;
                    this.isFloatComma = obj.common.isFloatComma;
                    this.language = obj.common.language;
                    this.longitude = obj.common.longitude;
                    this.latitude = obj.common.latitude;
                    this.defaultHistory = obj.common.defaultHistory;
                }

                // if alias
                if (id.startsWith(ALIAS_STARTS_WITH)) {
                    // if `this.aliases` is empty, or no target found, it's a new alias
                    let isNewAlias = true;

                    for (const [sourceId, alias] of this.aliases) {
                        const targetAlias = alias.targets.find(entry => entry.id === id);

                        // Find entry for this alias
                        if (targetAlias) {
                            isNewAlias = false;

                            // new sourceId or same
                            if (obj?.common?.alias?.id) {
                                // check if id.read or id
                                const newSourceId =
                                    typeof obj.common.alias.id.read === 'string'
                                        ? obj.common.alias.id.read
                                        : obj.common.alias.id;

                                // if linked ID changed
                                if (newSourceId !== sourceId) {
                                    await this._removeAliasSubscribe(sourceId, targetAlias);
                                    try {
                                        await this._addAliasSubscribe(obj, targetAlias.pattern);
                                    } catch (e) {
                                        this._logger.error(
                                            `${this.namespaceLog} Could not add alias subscription: ${e.message}`,
                                        );
                                    }
                                } else {
                                    // update attributes
                                    targetAlias.min = obj.common.min;
                                    targetAlias.max = obj.common.max;
                                    targetAlias.type = obj.common.type;
                                    targetAlias.alias = deepClone(obj.common.alias);
                                }
                            } else {
                                // link was deleted
                                // remove from targets array
                                await this._removeAliasSubscribe(sourceId, targetAlias);
                            }
                        }
                    }

                    // it's a new alias, we add it to our subscription
                    if (isNewAlias && obj) {
                        for (const aliasPattern of this.aliasPatterns) {
                            // check if it's in our subs range, if so add it
                            const testPattern =
                                aliasPattern.slice(-1) === '*'
                                    ? new RegExp(tools.pattern2RegEx(aliasPattern))
                                    : aliasPattern;

                            if (
                                (typeof testPattern === 'string' && aliasPattern === id) ||
                                (testPattern instanceof RegExp && testPattern.test(id))
                            ) {
                                try {
                                    await this._addAliasSubscribe(obj, id);
                                } catch (e) {
                                    this._logger.warn(
                                        `${this.namespaceLog} Could not add alias subscription: ${e.message}`,
                                    );
                                }
                                break;
                            }
                        }
                    }
                }

                // process auto-subscribe adapters
                if (id.startsWith('system.adapter.')) {
                    if (obj?.common?.subscribable) {
                        const _id = id.substring(15); // 'system.adapter.'.length
                        if (obj.common.enabled) {
                            if (!this.autoSubscribe.includes(_id)) {
                                this.autoSubscribe.push(_id);
                            }
                        } else {
                            const pos = this.autoSubscribe.indexOf(_id);
                            if (pos !== -1) {
                                this.autoSubscribe.splice(pos, 1);
                            }
                        }
                    }
                }

                // Clear cache if got the message about change (Will work for admin and javascript - TODO: maybe always subscribe?)
                if (id.startsWith('system.user.') || id.startsWith('system.group.')) {
                    this.users = {};
                    this.groups = {};
                    this.usernames = {};
                }

                if (id.startsWith('enum.')) {
                    if (!obj) {
                        delete this.enums[id];
                    } else if (obj.type === 'enum') {
                        this.enums[id] = obj;
                    }
                }
            },
            changeUser: (id, obj) => {
                // User level object changes
                if (!id) {
                    this._logger.error(`${this.namespaceLog} change ID is empty: ${JSON.stringify(obj)}`);
                    return;
                }

                // remove protectedNative if not admin or own adapter
                if (
                    obj &&
                    'protectedNative' in obj &&
                    Array.isArray(obj.protectedNative) &&
                    obj._id &&
                    obj._id.startsWith('system.adapter.') &&
                    obj.native &&
                    !NO_PROTECT_ADAPTERS.includes(this.name) &&
                    this.name !== obj._id.split('.')[2]
                ) {
                    for (const attr of obj.protectedNative) {
                        delete obj.native[attr];
                    }
                }

                if (this.adapterReady) {
                    // update oObjects structure if desired
                    if (this.oObjects) {
                        if (obj) {
                            this.oObjects[id] = obj;
                        } else {
                            delete this.oObjects[id];
                        }
                    }

                    if (!this._stopInProgress) {
                        typeof this._options.objectChange === 'function' &&
                            // @ts-expect-error
                            setImmediate(() => this._options.objectChange(id, obj));
                        // emit 'objectChange' event instantly
                        setImmediate(() => this.emit('objectChange', id, obj));
                    }
                }
            },
            changeFileUser: (id, fileName, size) => {
                if (!id) {
                    this._logger.error(`${this.namespaceLog} change file name is empty`);
                    return;
                }
                if (this.adapterReady && !this._stopInProgress) {
                    typeof this._options.fileChange === 'function' &&
                        setImmediate(() => this._options.fileChange!(id, fileName, size));
                    // emit 'fileChange' event instantly
                    setImmediate(() => this.emit('fileChange', id, fileName, size));
                }
            },
        });
    }

    /**
     * Called if states and objects successfully initialized
     */
    private async _prepareInitAdapter(): Promise<void> {
        if (this.terminated || !this.#objects || !this.#states) {
            return;
        }

        if (this._options.instance !== undefined) {
            return this._initAdapter(this._options);
        }
        const resAlive = await this.#states.getState(`system.adapter.${this.namespace}.alive`);
        const killRes = await this.#states.getState(`system.adapter.${this.namespace}.sigKill`);

        if (killRes?.val !== undefined) {
            killRes.val = parseInt(killRes.val as any, 10);
        }
        if (!this._config.isInstall && this.startedInCompactMode && killRes && !killRes.ack && killRes.val === -1) {
            this._logger.error(
                `${this.namespaceLog} ${this.namespace} needs to be stopped because not correctly started in compact mode`,
            );
            this.terminate(EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);
        } else if (
            !this._config.forceIfDisabled &&
            !this._config.isInstall &&
            !this.startedInCompactMode &&
            killRes &&
            killRes.from?.startsWith('system.host.') &&
            killRes.ack &&
            !isNaN(killRes.val as any) &&
            killRes.val !== process.pid
        ) {
            this._logger.error(
                `${this.namespaceLog} ${this.namespace} invalid process id scenario ${killRes.val} vs. own ID ${process.pid}. Stopping`,
            );
            this.terminate(EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);
        } else if (
            !this._config.isInstall &&
            resAlive &&
            resAlive.val === true &&
            resAlive.ack &&
            !this._config.forceIfDisabled
        ) {
            this._logger.error(`${this.namespaceLog} ${this.namespace} already running`);
            this.terminate(EXIT_CODES.ADAPTER_ALREADY_RUNNING);
        } else {
            let res: ioBroker.InstanceObject | null | undefined;
            try {
                res = await this.#objects.getObject(`system.adapter.${this.namespace}`);
            } catch (e) {
                this._logger.error(
                    `${this.namespaceLog} ${this.namespace} Could not get instance object: ${e.message}`,
                );
            }

            if (!res && !this._config.isInstall) {
                this._logger.error(`${this.namespaceLog} ${this.namespace} invalid config`);
                this.terminate(EXIT_CODES.INVALID_ADAPTER_CONFIG);
            } else {
                return this._initAdapter(res);
            }
        }
    }

    /**
     * Initialize the adapter
     *
     * @param adapterConfig the AdapterOptions or the InstanceObject, is null/undefined if it is install process
     */
    private async _initAdapter(adapterConfig?: AdapterOptions | ioBroker.InstanceObject | null): Promise<void> {
        await this._initLogging();

        if (!this.pluginHandler) {
            return;
        }
        this.pluginHandler.setDatabaseForPlugins(this.#objects, this.#states);
        await this.pluginHandler.initPlugins(adapterConfig || {});
        if (!this.#states || !this.#objects || this.terminated) {
            // if adapterState was destroyed,we should not continue
            return;
        }

        this.#states.subscribe(`system.adapter.${this.namespace}.plugins.*`);
        if (this._options.instance === undefined) {
            if (!adapterConfig || !('common' in adapterConfig) || !adapterConfig.common.enabled) {
                if (adapterConfig && 'common' in adapterConfig && adapterConfig.common.enabled !== undefined) {
                    !this._config.isInstall && this._logger.error(`${this.namespaceLog} adapter disabled`);
                } else {
                    !this._config.isInstall && this._logger.error(`${this.namespaceLog} no config found for adapter`);
                }

                if (!this._config.isInstall && (!process.argv || !this._config.forceIfDisabled)) {
                    const id = `system.adapter.${this.namespace}`;
                    this.outputCount += 2;
                    this.#states.setState(`${id}.alive`, { val: true, ack: true, expire: 30, from: id });
                    let done = false;
                    this.#states.setState(
                        `${id}.connected`,
                        {
                            val: true,
                            ack: true,
                            expire: 30,
                            from: id,
                        },
                        () => {
                            if (!done) {
                                done = true;
                                this.terminate(EXIT_CODES.NO_ADAPTER_CONFIG_FOUND);
                            }
                        },
                    );
                    setTimeout(() => {
                        if (!done) {
                            done = true;
                            this.terminate(EXIT_CODES.NO_ADAPTER_CONFIG_FOUND);
                        }
                    }, 1_000);
                    return;
                }
            }

            if (!this._config.isInstall && (!adapterConfig || !('_id' in adapterConfig))) {
                this._logger.error(`${this.namespaceLog} invalid config: no _id found`);
                this.terminate(EXIT_CODES.INVALID_ADAPTER_ID);
                return;
            }

            let name;
            let instance;

            if (!this._config.isInstall) {
                // @ts-expect-error
                const tmp = adapterConfig._id.match(/^system\.adapter\.([a-zA-Z0-9-_]+)\.([0-9]+)$/);
                if (!tmp) {
                    this._logger.error(`${this.namespaceLog} invalid config`);
                    this.terminate(EXIT_CODES.INVALID_ADAPTER_ID);
                    return;
                }
                name = tmp[1];
                instance = parseInt(tmp[2]) || 0;
            } else {
                name = this.name;
                instance = 0;
                adapterConfig = adapterConfig || {
                    // @ts-expect-error protectedNative exists on instance objects
                    common: { mode: 'once', name: name, protectedNative: [] },
                    native: {},
                };
            }

            // @ts-expect-error
            if (adapterConfig.common.loglevel && !this.overwriteLogLevel) {
                // set configured in DB log level
                for (const trans of Object.values(this._logger.transports)) {
                    // set the loglevel on transport only if no loglevel was pinned in log config
                    // @ts-expect-error it is our own modification
                    if (!trans._defaultConfigLoglevel) {
                        // @ts-expect-error
                        trans.level = adapterConfig.common.loglevel;
                    }
                }
                // @ts-expect-error
                this._config.log.level = adapterConfig.common.loglevel;
            }

            // @ts-expect-error
            this.name = adapterConfig.common.name;
            this.instance = instance;
            this.namespace = `${name}.${instance}`;
            this.namespaceLog = this.namespace + (this.startedInCompactMode ? ' (COMPACT)' : ` (${process.pid})`);
            if (!this.startedInCompactMode) {
                process.title = `io.${this.namespace}`;
            }

            // @ts-expect-error
            this.config = adapterConfig.native;
            // @ts-expect-error
            this.host = adapterConfig.common.host;
            // @ts-expect-error
            this.common = adapterConfig.common;

            if (
                // @ts-expect-error
                adapterConfig.common.mode === 'schedule' ||
                // @ts-expect-error
                adapterConfig.common.mode === 'once'
            ) {
                this.stop = params => this._stop({ ...params, isPause: true });
            } else if (this.startedInCompactMode) {
                this.stop = params => this._stop({ ...params, isPause: false });
                this.kill = this.stop;
            } else {
                this.stop = params => this._stop({ ...params, isPause: false });
            }

            // Monitor logging state
            this.#states.subscribe(`${SYSTEM_ADAPTER_PREFIX}*.logging`);

            if (
                typeof this._options.message === 'function' &&
                // @ts-expect-error, we should infer correctly that this is an InstanceObject in this case
                !isMessageboxSupported(adapterConfig.common)
            ) {
                this._logger.error(
                    `${this.namespaceLog} : message handler implemented, but messagebox not enabled. Define common.messagebox in io-package.json for adapter or delete message handler.`,
                );
                // @ts-expect-error we should infer adapterConfig correctly
            } else if (isMessageboxSupported(adapterConfig.common)) {
                this.mboxSubscribed = true;
                this.#states.subscribeMessage(`system.adapter.${this.namespace}`);
            }
        } else {
            // @ts-expect-error
            this.name = adapterConfig.name || this.name;
            // @ts-expect-error
            this.instance = adapterConfig.instance || 0;
            this.namespace = `${this.name}.${this.instance!}`;
            this.namespaceLog = this.namespace + (this.startedInCompactMode ? ' (COMPACT)' : ` (${process.pid})`);
            // @ts-expect-error
            this.config = adapterConfig.native || {};
            // @ts-expect-error
            this.common = adapterConfig.common || {};
            this.host = this.common?.host || tools.getHostName() || os.hostname();
        }

        this.adapterConfig = adapterConfig;

        this._utils = new Validator(
            this.#objects,
            this.#states,
            this.namespaceLog,
            this._logger,
            this.namespace,
            this._namespaceRegExp,
        );

        this.log = new Log(this.namespaceLog, this._config.log.level, this._logger);

        await this._createInstancesObjects(adapterConfig as ioBroker.InstanceObject);

        // auto oObjects
        if (this._options.objects) {
            this.oObjects = await this.getAdapterObjectsAsync();
            await this.subscribeObjectsAsync('*');
        }

        // initialize the system secret
        await this.getSystemSecret();

        // Decrypt all attributes of encryptedNative
        const promises = [];
        // @ts-expect-error
        if (Array.isArray(adapterConfig.encryptedNative)) {
            // @ts-expect-error
            for (const attr of adapterConfig.encryptedNative) {
                // we can only decrypt strings
                // @ts-expect-error
                if (typeof this.config[attr] === 'string') {
                    promises.push(
                        this.getEncryptedConfig(attr)
                            // @ts-expect-error
                            .then(decryptedValue => (this.config[attr] = decryptedValue))
                            .catch(e =>
                                this._logger.error(
                                    `${this.namespaceLog} Can not decrypt attribute ${attr}: ${e.message}`,
                                ),
                            ),
                    );
                }
            }
        } else {
            // remove encrypted native from supported features, otherwise this can cause issues, if no adapter upload done with js-c v3+ yet
            const idx = this.SUPPORTED_FEATURES.indexOf('ADAPTER_AUTO_DECRYPT_NATIVE');
            if (idx !== -1) {
                this.SUPPORTED_FEATURES.splice(idx, 1);
            }
        }

        // Wait till all attributes decrypted
        await Promise.all(promises);

        if (!this.#states) {
            // if this.adapterStates was destroyed, we should not continue
            return;
        }

        this.outputCount++;
        // set current loglevel
        this.#states.setState(`system.adapter.${this.namespace}.logLevel`, {
            val: this._config.log.level,
            ack: true,
            from: `system.adapter.${this.namespace}`,
        });

        if (this._options.instance === undefined) {
            this.version = this.pack?.version
                ? this.pack.version
                : this.ioPack?.common
                  ? this.ioPack.common.version
                  : 'unknown';
            // display if it's a non-official version - only if installedFrom is explicitly given and differs it's not npm
            // display if it's a non-official version - only if installedFrom is explicitly given and differs it's not npm
            const isNpmVersion = isInstalledFromNpm({
                adapterName: this.name,
                installedFrom: this.ioPack.common.installedFrom,
            });

            this._logger.info(
                `${this.namespaceLog} starting. Version ${this.version} ${
                    !isNpmVersion ? `(non-npm: ${this.ioPack.common.installedFrom}) ` : ''
                }in ${this.adapterDir}, node: ${process.version}, js-controller: ${controllerVersion}`,
            );
            this._config.system = this._config.system || {};
            this._config.system.statisticsInterval = parseInt(this._config.system.statisticsInterval, 10) || 15_000;
            if (!this._config.isInstall) {
                this._reportInterval = setInterval(() => this._reportStatus(), this._config.system.statisticsInterval);
                this._reportStatus();
                const id = `system.adapter.${this.namespace}`;
                this.#states.setState(`${id}.compactMode`, {
                    ack: true,
                    from: id,
                    val: !!this.startedInCompactMode,
                });

                this.outputCount++;

                if (this.startedInCompactMode) {
                    this.#states.setState(`${id}.cpu`, { ack: true, from: id, val: 0 });
                    this.#states.setState(`${id}.cputime`, { ack: true, from: id, val: 0 });
                    this.#states.setState(`${id}.memRss`, { val: 0, ack: true, from: id });
                    this.#states.setState(`${id}.memHeapTotal`, { val: 0, ack: true, from: id });
                    this.#states.setState(`${id}.memHeapUsed`, { val: 0, ack: true, from: id });
                    this.#states.setState(`${id}.eventLoopLag`, { val: 0, ack: true, from: id });
                    this.outputCount += 6;
                } else {
                    tools.measureEventLoopLag(1_000, lag => {
                        if (lag) {
                            this.eventLoopLags.push(lag);
                        }
                    });
                }
            }
        }

        if (adapterConfig && 'common' in adapterConfig && adapterConfig.common.restartSchedule) {
            try {
                this._schedule = await import('node-schedule');
            } catch {
                this._logger.error(`${this.namespaceLog} Cannot load node-schedule. Scheduled restart is disabled`);
            }
            if (this._schedule) {
                this._logger.debug(`${this.namespaceLog} Schedule restart: ${adapterConfig.common.restartSchedule}`);
                this._restartScheduleJob = this._schedule.scheduleJob(adapterConfig.common.restartSchedule, () => {
                    this._logger.info(`${this.namespaceLog} Scheduled restart.`);
                    this._stop({ isPause: false, isScheduled: true });
                });
            }
        }

        // auto oStates
        if (this._options.states) {
            this.getStates('*', null, (err, _states) => {
                if (this._stopInProgress) {
                    return;
                }

                this.oStates = _states;
                this.subscribeStates('*');

                if (this._firstConnection) {
                    this._firstConnection = false;
                    this._callReadyHandler();
                }

                this.adapterReady = true;
            });
        } else if (!this._stopInProgress) {
            this._callReadyHandler();
            this.adapterReady = true;
        }
    }

    /**
     * Calls the ready handler, if it is an install run it calls the install handler instead
     */
    private _callReadyHandler(): void {
        if (
            this._config.isInstall &&
            (typeof this._options.install === 'function' || this.listeners('install').length)
        ) {
            if (typeof this._options.install === 'function') {
                this._options.install();
            }
            this.emit('install');
        } else {
            if (typeof this._options.ready === 'function') {
                this._options.ready();
            }
            this.emit('ready');
        }
    }

    private async _exceptionHandler(err: NodeJS.ErrnoException, isUnhandledRejection?: boolean): Promise<void> {
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
                `${this.namespaceLog} Port ${port}${host ? ` for host ${host}` : ''} is in use. Get next`,
            );

            setImmediate(() => this.getPort(port + 1, host, callback));
            return;
        }

        if (isUnhandledRejection) {
            this._logger.error(
                `${this.namespaceLog} Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().`,
            );
        }
        this._logger.error(
            `${this.namespaceLog} ${isUnhandledRejection ? 'unhandled promise rejection' : 'uncaught exception'}: ${
                err ? err.message : err
            }`,
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
                updateAliveState: false,
            });
            setTimeout(() => this.terminate(EXIT_CODES.UNCAUGHT_EXCEPTION), 1_000);
        } catch (e) {
            this._logger.error(`${this.namespaceLog} exception by stop: ${e ? e.message : e}`);
        }
    }

    private async _createInstancesObjects(instanceObj: ioBroker.InstanceObject): Promise<void> {
        let objs: (IoPackageInstanceObject & { state?: unknown })[];

        if (instanceObj?.common && !('onlyWWW' in instanceObj.common) && instanceObj.common.mode !== 'once') {
            objs = tools.getInstanceIndicatorObjects(this.namespace);
        } else {
            objs = [];
        }

        if (instanceObj && 'instanceObjects' in instanceObj) {
            for (const instObj of instanceObj.instanceObjects) {
                const obj: IoPackageInstanceObject & { state?: unknown } = instObj;

                const allowedTopLevelTypes: ioBroker.ObjectType[] = ['meta', 'device'];

                // the object comes from non-checked io-package, so treat the id as unknown
                if (
                    !obj ||
                    typeof (obj._id as unknown) !== 'string' ||
                    (obj._id === '' && !allowedTopLevelTypes.includes(obj.type))
                ) {
                    this._logger.error(
                        `${this.namespaceLog} ${this.namespace} invalid instance object: ${JSON.stringify(obj)}`,
                    );
                    continue;
                }

                if (!obj._id.startsWith(this.namespace)) {
                    // instanceObjects are normally defined without namespace prefix
                    obj._id = obj._id === '' ? this.namespace : `${this.namespace}.${obj._id}`;
                }

                if (obj.common?.name) {
                    const commonName = obj.common.name;
                    // if name has many languages
                    if (tools.isObject(commonName)) {
                        for (const [lang, value] of Object.entries(commonName)) {
                            commonName[lang as ioBroker.Languages] = value.replace(
                                '%INSTANCE%',
                                this.instance!.toString(),
                            );
                        }
                    } else {
                        obj.common.name = commonName.replace('%INSTANCE%', this.instance!.toString());
                    }

                    if ('desc' in obj.common) {
                        const commonDesc = obj.common.desc;

                        // if description has many languages
                        if (tools.isObject(commonDesc)) {
                            for (const [lang, value] of Object.entries(commonDesc)) {
                                commonDesc[lang as ioBroker.Languages] = value.replace(
                                    '%INSTANCE%',
                                    this.instance!.toString(),
                                );
                            }
                        } else if (commonDesc) {
                            obj.common.desc = commonDesc.replace('%INSTANCE%', this.instance!.toString());
                        }
                    }

                    if (obj.type === 'state' && obj.common.def !== undefined) {
                        // default value given - if obj non-existing we have to set it
                        try {
                            const checkObj = await this.#objects!.objectExists(obj._id);
                            if (!checkObj) {
                                obj.state = obj.common.def;
                            }
                        } catch (e) {
                            this._logger.warn(
                                `${this.namespaceLog} Did not add default (${obj.common.def}) value on creation of ${obj._id}: ${e.message}`,
                            );
                        }
                    }
                }

                objs.push(obj);
            }
        }

        // create logging object for log-transporter instances
        if (instanceObj?.common?.logTransporter) {
            // create system.adapter.ADAPTERNAME.instance.logger
            objs.push({
                _id: `system.adapter.${this.namespace}.logging`,
                common: {
                    type: 'boolean',
                    name: 'Logging for instance activated',
                    role: 'indicator.state',
                    write: false,
                    read: true,
                    def: false,
                },
                type: 'state',
                native: {},
            });
        }

        return new Promise(resolve => {
            this._extendObjects(objs, resolve);
        });
    }

    private async _extendObjects(tasks: Record<string, any>, callback: () => void): Promise<void> {
        if (!tasks || !tasks.length) {
            return tools.maybeCallback(callback);
        }
        const task = tasks.shift();
        const state = task.state;
        if (state !== undefined) {
            delete task.state;
        }

        try {
            tools.validateGeneralObjectProperties(task, true);
        } catch (e) {
            this._logger.error(`${this.namespaceLog} Object ${task._id} is invalid: ${e.message}`);
            return tools.maybeCallbackWithError(callback, e);
        }

        if (!this.#objects) {
            this._logger.info(
                `${this.namespaceLog} extendObjects not processed because Objects database not connected.`,
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        // preserve attributes on instance creation
        const options = { preserve: { common: ['name'], native: true } };

        try {
            await this.extendForeignObjectAsync(task._id, task, options);
        } catch {
            // ignore
        }

        if (state !== undefined) {
            if (!this.#states) {
                this._logger.info(
                    `${this.namespaceLog} extendObjects not processed because States database not connected.`,
                );
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }
            this.outputCount++;
            this.#states.setState(
                task._id,
                {
                    val: state,
                    from: `system.adapter.${this.namespace}`,
                    ack: true,
                },
                () => setImmediate(() => this._extendObjects(tasks, callback)),
            );
        } else {
            setImmediate(() => this._extendObjects(tasks, callback));
        }
    }

    /**
     * Replaces forbidden chars in an id if present
     * Additionally logs a warning
     *
     * @param id the id which will be replaced
     */
    private fixForbiddenCharsInId(id: string): string {
        const mId = id.replace(FORBIDDEN_CHARS, '_');
        if (mId !== id) {
            this._logger.warn(`${this.namespaceLog} Used invalid characters: ${id} changed to ${mId}`);
        }

        return mId;
    }

    /**
     * This method reports deprecations via Sentry (controller own instance) and can only be used internally
     *
     * @param options information about version to remove feature and the log message
     */
    private async reportDeprecation(options: InternalReportDeprecationOption): Promise<void> {
        if (!this.#states) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        const { version, deprecationMessage } = options;

        const additionalMsg = version
            ? `This will throw an error up from js-controller version ${version}! `
            : 'Please report to the developer.';

        this._logger.warn(`${this.namespaceLog} ${deprecationMessage} ${additionalMsg}`);

        if (this.reportedDeprecations.has(deprecationMessage)) {
            return;
        }

        this.reportedDeprecations.add(deprecationMessage);

        const obj = {
            command: 'sendToSentry',
            message: {
                extraInfo: {
                    deprecationMessage,
                    adapter: this.name,
                    version: this.version,
                },
                message: `Deprecation ${this.name}`,
                level: 'info',
            },
            from: `system.adapter.${this.namespace}`,
        };

        await this.#states.pushMessage(`system.host.${this.host}`, obj as any);
    }

    /**
     * Initialize the plugin handler for this adapter
     */
    private _initPluginHandler(): void {
        const pluginSettings: PluginHandlerSettings = {
            scope: 'adapter',
            namespace: `system.adapter.${this.namespace}`,
            logNamespace: this.namespaceLog,
            // @ts-expect-error
            log: this._logger,
            iobrokerConfig: this._config,
            // @ts-expect-error
            parentPackage: this.pack,
            controllerVersion,
        };

        this.pluginHandler = new PluginHandler(pluginSettings);
        try {
            this.pluginHandler.addPlugins(this.ioPack.common.plugins || {}, [this.adapterDir, thisDir]); // first resolve from adapter directory, else from js-controller
        } catch (e) {
            this._logger.error(`Could not add plugins: ${e.message}`);
        }
    }

    /**
     * Initializes the adapter
     */
    private async _init(): Promise<void> {
        /**
         * Initiates the databases
         */
        const _initDBs = (): void => {
            this._initObjects(() => {
                if (this.inited) {
                    this._logger.warn(`${this.namespaceLog} Reconnection to DB.`);
                    return;
                }

                this.inited = true;
                this._initStates(() => this._prepareInitAdapter());
            });
        };

        if (fs.existsSync(`${this.adapterDir}/package.json`)) {
            this.pack = fs.readJSONSync(`${this.adapterDir}/package.json`);
        } else {
            this._logger.info(`${this.namespaceLog} Non npm module. No package.json`);
        }

        // If required system configuration. Store it in systemConfig attribute
        if (this._options.systemConfig) {
            this.systemConfig = this._config;
            // Workaround for an admin 5 issue which could lead to deleting the dataDir folder
            // TODO: remove it as soon as all adapters are fixed which use systemConfig.dataDir
            if (!Object.prototype.hasOwnProperty.call(this.systemConfig, 'dataDir')) {
                this.systemConfig.dataDir = tools.getDefaultDataDir();
            }
        }

        if (this._config.states && this._config.states.type) {
            try {
                this.States = (await import(`@iobroker/db-states-${this._config.states.type}`)).Client;
            } catch (e) {
                throw new Error(`Unknown states type: ${this._config.states.type}: ${e.message}`);
            }
        } else {
            this.States = await getStatesConstructor();
        }

        if (this._config.objects && this._config.objects.type) {
            try {
                this.Objects = (await import(`@iobroker/db-objects-${this._config.objects.type}`)).Client;
            } catch (e) {
                throw new Error(`Unknown objects type: ${this._config.objects.type}: ${e.message}`);
            }
        } else {
            this.Objects = await getObjectsConstructor();
        }

        const ifaces = os.networkInterfaces();
        const ipArr = [];
        for (const iface of Object.values(ifaces)) {
            if (iface) {
                iface.forEach(details => !details.internal && ipArr.push(details.address));
            }
        }

        this.namespaceLog = this.namespace + (this.startedInCompactMode ? ' (COMPACT)' : ` (${process.pid})`);

        // Can be later deleted if no more appears TODO: check
        this.inited = false;

        process.once('SIGINT', () => this._stop());
        process.once('SIGTERM', () => this._stop());
        // And the exit event shuts down the child.
        process.once('exit', () => this._stop());

        process.on('uncaughtException', err => this._exceptionHandler(err));
        process.on('unhandledRejection', err => this._exceptionHandler(err as any, true));

        this._initPluginHandler();
        // finally init
        _initDBs();
    }
}

/**
 * Polyfill to allow calling without `new`
 */
export const Adapter = new Proxy(AdapterClass, {
    apply(target, thisArg, argArray) {
        // @ts-expect-error fix later on if necessary
        return new target(...argArray);
    },
});
