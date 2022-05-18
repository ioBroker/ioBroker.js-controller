import net from 'net';
import fs from 'fs-extra';
import os from 'os';
import jwt from 'jsonwebtoken';
import { EventEmitter } from 'events';
import { tools, EXIT_CODES, password, logger } from '@iobroker/js-controller-common';
import pidUsage from 'pidusage';
import deepClone from 'deep-clone';
import { PluginHandler } from '@iobroker/plugin-base';
import semver from 'semver';
import path from 'path';
import { getObjectsConstructor, getStatesConstructor } from '@iobroker/js-controller-common-db';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const extend = require('node.extend');
import type { Client as StatesInRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsInRedisClient } from '@iobroker/db-objects-redis';
import type Winston from 'winston';
import type NodeSchedule from 'node-schedule';

// local version is always same as controller version, since lerna exact: true is used
// eslint-disable-next-line @typescript-eslint/no-var-requires
const controllerVersion = require('@iobroker/js-controller-adapter/package.json').version;

import { Log } from './log';
import { ID, Utils } from './utils';

const { FORBIDDEN_CHARS } = tools;
import {
    DEFAULT_SECRET,
    ALIAS_STARTS_WITH,
    SYSTEM_ADMIN_USER,
    SYSTEM_ADMIN_GROUP,
    QUALITY_SUBS_INITIAL,
    SUPPORTED_FEATURES,
    ERROR_PERMISSION,
    ACCESS_EVERY_READ,
    ACCESS_EVERY_WRITE,
    ACCESS_GROUP_WRITE,
    ACCESS_GROUP_READ,
    ACCESS_USER_WRITE,
    ACCESS_USER_READ
} from './constants';
import type { PluginHandlerSettings } from '@iobroker/plugin-base/types';

// keep them outside until we have migrated to TS, else devs can access them
let adapterStates: StatesInRedisClient;
let adapterObjects: ObjectsInRedisClient;

interface AdapterOptions {
    /** if true, the date format from system.config */
    useFormatDate?: boolean;
    /** if it is possible for other instances to retrive states of this adapter automatically */
    subscribable?: boolean;
    /** compact group instance if running in compact mode */
    compactInstance?: number;
    /** if desired to have oStates. This is a list with all states values, and it will be updated automatically. */
    states?: boolean;
    /** if desired to have oObjects. This is a list with all states, channels and devices of this adapter, and it will be updated automatically.*/
    objects?: boolean;
    /** instance number of adapter */
    instance?: number;
    /** adapter directory name */
    dirname?: string;
    /** flag which defaults to true - if true, adapter warns if states are set without a corresponding existing object */
    strictObjectChecks?: boolean;
    /** If true runs in compact mode */
    compact?: boolean;
    /** configuration of the connection to controller */
    config?: AdapterOptionsConfig;
    /** name of the adapter. Must be exactly the same as directory name. */
    name: string;
    /** If true, the systemConfig (iobroker.json) will be available in this.systemConfig */
    systemConfig?: boolean;
    /** callback function (id, obj) that will be called if object changed */
    objectChange?: ioBroker.ObjectChangeHandler;
    /** callback function (id, obj) that will be called if state changed */
    stateChange?: ioBroker.StateChangeHandler;
    /** callback to inform about new message the adapter */
    message?: ioBroker.MessageHandler;
    /** callback to stop the adapter */
    unload?: ioBroker.UnloadHandler;
    /** called when adapter is ready */
    ready?: ioBroker.ReadyHandler;
    /** called on reconnection to DB */
    reconnect?: () => void | Promise<void>;
    /** Handler to handle uncaught exceptions, return true if no further handling required */
    error?: ioBroker.ErrorHandler;
}

interface AdapterOptionsConfig {
    log: Record<string, any>; // TODO: specify
}

interface AliasDetails {
    source: AliasDetailsSource | null;
    targets: AliasTargetEntry[];
}

interface AliasDetailsSource {
    min?: number;
    max?: number;
    type: string;
    unit?: string;
}

interface AliasTargetEntry {
    alias: Record<string, any>; // TODO: specify
    id: string;
    pattern: string;
    type: string;
    max?: number;
    min?: number;
    unit?: string;
}

interface PortRunningObject {
    port: number;
    host?: string;
    callback?: (port: number) => void;
}

type CheckStateCommand = 'getState' | 'setState' | 'delState';

interface InternalSetSessionOptions {
    id: string;
    ttl: number;
    data: Record<string, any>;
    callback?: ioBroker.ErrorCallback;
}

interface InternalGetSessionOptions {
    id: string;
    callback?: ioBroker.ErrorCallback;
}

interface InternalDestroySessionOptions {
    id: string;
    callback?: ioBroker.ErrorCallback;
}

interface InternalGetPortOptions {
    port: number;
    host?: string;
    callback?: (port: number) => void;
}

type CheckPasswordCallback = (success: boolean, user: string) => void;

interface InternalCheckPasswordOptions {
    user: string;
    pw: string;
    options?: Record<string, any> | null;
    callback: CheckPasswordCallback;
}

interface InternalGetUserIDOptions {
    username: string;
}

interface InternalSetPasswordOptions {
    user: string;
    pw: string;
    options?: Record<string, any> | null;
    callback?: ioBroker.ErrorCallback;
}

type CheckGroupCallback = (result: boolean) => void;

interface InternalCheckGroupOptions {
    user: string;
    group: string;
    options?: Record<string, any> | null;
    callback?: CheckGroupCallback;
}

type CommandsPermissions = {
    [permission: string]: { type: 'object' | 'state' | '' | 'other' | 'file'; operation: string };
};

type CalculatePermissionsCallback = (result: ioBroker.PermissionSet) => void;

interface InternalCalculatePermissionsOptions {
    user: string;
    commandsPermissions: CommandsPermissions;
    options?: Record<string, any> | null;
    callback?: CalculatePermissionsCallback;
}

type GetCertificatesCallback = (
    err: string | null,
    certs?: ioBroker.Certificates,
    useLetsEncryptCert?: boolean
) => void;

interface InternalGetCertificatesOptions {
    publicName: string;
    privateName: string;
    chainedName: string;
    callback?: GetCertificatesCallback;
}

interface InternalUpdateConfigOptions {
    newConfig: Record<string, any>;
}

type GetEncryptedConfigCallback = (error: Error | null | undefined, result?: string) => void;

interface InternalGetEncryptedConfigOptions {
    attribute: string;
    callback?: GetEncryptedConfigCallback;
}

type TimeoutCallback = (args?: any[]) => void;

interface InternalSetObjectOptions {
    id: string;
    options?: Record<string, any> | null;
    obj: ioBroker.SettableObject;
    callback?: ioBroker.SetObjectCallback;
}

interface InternalGetObjectOptions {
    id: string;
    options: unknown;
    callback?: ioBroker.GetObjectCallback<any>;
}

interface InternalGetObjectsOptions {
    pattern: string;
    type?: string;
    enums?: ioBroker.EnumList | null;
    options?: unknown;
    callback?: ioBroker.GetObjectsCallbackTyped<any>;
}

/**
 * Here we define dynamic methods which need overloads
 */
interface AdapterClass {
    /**
     * Reads an object (which might not belong to this adapter) from the object db
     */
    getForeignObjectAsync<T extends string>(id: T, options?: unknown): ioBroker.GetObjectPromise<T>;

    /**
     * Writes a value (which might not belong to this adapter) into the states DB only if it has changed.
     */
    setForeignStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack?: boolean
    ): ioBroker.SetStateChangedPromise;
    setForeignStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options?: unknown
    ): ioBroker.SetStateChangedPromise;
    setForeignStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown
    ): ioBroker.SetStateChangedPromise;

    /**
     * Writes a value into the states DB only if it has changed.
     */
    setStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack?: boolean
    ): ioBroker.SetStateChangedPromise;
    setStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options?: unknown
    ): ioBroker.SetStateChangedPromise;
    setStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown
    ): ioBroker.SetStateChangedPromise;

    /**
     * Sends a message to a specific host or all hosts.
     */
    sendToHostAsync(hostName: string, message: ioBroker.MessagePayload): Promise<ioBroker.Message | undefined>;
    sendToHostAsync(
        hostName: string,
        command: string,
        message: ioBroker.MessagePayload
    ): Promise<ioBroker.Message | undefined>;

    /**
     * Sends a message to a specific instance or all instances of some specific adapter.
     */
    sendToAsync(instanceName: string, message: ioBroker.MessagePayload): Promise<ioBroker.Message | undefined>;
    sendToAsync(
        instanceName: string,
        command: string,
        message: ioBroker.MessagePayload
    ): Promise<ioBroker.Message | undefined>;

    /**
     * Deletes a given file
     */
    delFile(adapterName: string | null, path: string, callback: ioBroker.ErrnoCallback): void;
    delFile(adapterName: string | null, path: string, options: unknown, callback: ioBroker.ErrnoCallback): void;

    /**
     * Writes a value into the states DB.
     */
    setStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack?: boolean
    ): ioBroker.SetStatePromise;
    setStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options?: unknown
    ): ioBroker.SetStatePromise;
    setStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown
    ): ioBroker.SetStatePromise;

    /**
     * Writes a value (which might not belong to this adapter) into the states DB.
     */
    setForeignStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack?: boolean
    ): ioBroker.SetStatePromise;
    setForeignStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options?: unknown
    ): ioBroker.SetStatePromise;
    setForeignStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown
    ): ioBroker.SetStatePromise;

    /**
     * Get foreign objects by pattern, by specific type and resolve their enums.
     */
    getForeignObjectsAsync<T extends ioBroker.ObjectType>(
        pattern: string,
        type: T,
        enums: ioBroker.EnumList,
        options?: unknown
    ): ioBroker.GetObjectsPromiseTyped<T>;
    getForeignObjectsAsync<T extends ioBroker.ObjectType>(
        pattern: string,
        type: T,
        options?: unknown
    ): ioBroker.GetObjectsPromiseTyped<T>;
    getForeignObjectsAsync(pattern: string, options?: unknown): ioBroker.GetObjectsPromise;

    /**
     * creates an object with type device
     */
    createDeviceAsync(deviceName: string, common?: Partial<ioBroker.DeviceCommon>): ioBroker.SetObjectPromise;
    createDeviceAsync(
        deviceName: string,
        common: Partial<ioBroker.DeviceCommon>,
        native?: Record<string, any>
    ): ioBroker.SetObjectPromise;
    createDeviceAsync(
        deviceName: string,
        common: Partial<ioBroker.DeviceCommon>,
        native: Record<string, any>,
        options?: unknown
    ): ioBroker.SetObjectPromise;

    /**
     * Finds an object by its ID or name
     */
    findForeignObjectAsync(idOrName: string, type: string): Promise<{ id: string; name: string }>;

    /**
     * Creates an object with type channel. It must be located under a device
     */
    createChannelAsync(
        parentDevice: string,
        channelName: string,
        roleOrCommon?: string | Partial<ioBroker.ChannelCommon>
    ): ioBroker.SetObjectPromise;
    createChannelAsync(
        parentDevice: string,
        channelName: string,
        roleOrCommon: string | Partial<ioBroker.ChannelCommon>,
        native?: Record<string, any>
    ): ioBroker.SetObjectPromise;
    createChannelAsync(
        parentDevice: string,
        channelName: string,
        roleOrCommon: string | Partial<ioBroker.ChannelCommon>,
        native: Record<string, any>,
        options?: unknown
    ): ioBroker.SetObjectPromise;

    /**
     * Creates a state and the corresponding object. It must be located in a channel under a device
     */
    createStateAsync(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon?: string | Partial<ioBroker.StateCommon>
    ): ioBroker.SetObjectPromise;
    createStateAsync(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon: string | Partial<ioBroker.StateCommon>,
        native?: Record<string, any>
    ): ioBroker.SetObjectPromise;
    createStateAsync(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon: string | Partial<ioBroker.StateCommon>,
        native: Record<string, any>,
        options?: unknown
    ): ioBroker.SetObjectPromise;

    /**
     * Deletes a channel and its states. It must have been created with createChannel
     */
    deleteChannelAsync(channelName: string, options?: unknown): Promise<void>;
    deleteChannelAsync(parentDevice: string, channelName: string, options?: unknown): Promise<void>;

    /**
     * Deletes a state. It must have been created with createState
     */
    deleteStateAsync(stateName: string, options?: unknown): Promise<void>;
    deleteStateAsync(parentChannel: string, stateName: string, options?: unknown): Promise<void>;
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
        callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>
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

interface InternalGetChannelsOfOptions {
    parentDevice: string;
    callback?: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>;
    options: unknown;
}

interface InternalGetAdapterObjectsOptions {
    callback?: (objects: Record<string, ioBroker.AdapterScopedObject>) => void;
}

interface InternalGetObjectViewOptions {
    design: string;
    search: string;
    params: ioBroker.GetObjectViewParams;
    options: unknown;
    callback?: ioBroker.GetObjectViewCallback<ioBroker.AnyObject>;
}

interface InternalGetEnumOptions {
    _enum: string;
    options: unknown;
    callback?: ioBroker.GetEnumCallback;
}

interface InternalGetEnumsOptions {
    _enumList?: ioBroker.EnumList;
    options: unknown;
    callback?: ioBroker.GetEnumsCallback;
}

interface InternalDelObjectOptions {
    id: string;
    options?: ioBroker.DelObjectOptions | null;
    callback?: ioBroker.ErrorCallback;
}

interface InternalCreateDeviceOptions {
    deviceName: string;
    common?: Partial<ioBroker.DeviceCommon>;
    _native?: Record<string, any> | null;
    options: unknown;
    callback?: ioBroker.SetObjectCallback;
}

interface InternalSetStateOptions {
    id: string;
    state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState;
    ack?: boolean;
    options?: Record<string, any> | null;
    callback?: ioBroker.SetStateCallback;
}

/**
 * Adapter class
 *
 * How the initialization happens:
 *  initObjects => initStates => prepareInitAdapter => initAdapter => initLogging => createInstancesObjects => ready
 *
 */
class AdapterClass extends EventEmitter {
    /** Contents of iobroker.json */
    private readonly _config: Record<string, any>;
    private readonly _options: AdapterOptions;
    private readonly startedInCompactMode: boolean;
    /** List of instances which want our logs */
    private readonly logList: Set<string>;
    private readonly aliases: Map<string, AliasDetails>;
    private readonly aliasPatterns: Set<string>;
    private enums: Record<string, any>;
    private eventLoopLags: number[];
    private overwriteLogLevel: boolean;
    protected adapterReady: boolean;
    /**
     * Contains a live cache of the adapter's states.
     * NOTE: This is only defined if the adapter was initialized with the option states: true.
     */
    protected oStates?: Record<string, ioBroker.State | undefined>;
    /**
     * Contains a live cache of the adapter's objects.
     * NOTE: This is only defined if the adapter was initialized with the option objects: true.
     */
    protected oObjects?: Record<string, ioBroker.Object | undefined>;
    private _stopInProgress: boolean;
    private _callbackId: number;
    private _firstConnection: boolean;
    private _timers: Set<any>;
    private _intervals: Set<any>;
    private _delays: Set<any>;
    private tools: any; // TODO remove the shim
    protected log?: Log;
    private readonly performStrictObjectChecks: boolean;
    private readonly _logger: Winston.Logger;
    private _restartScheduleJob: any;
    private _schedule: typeof NodeSchedule | undefined;
    // @ts-expect-error decide how to handle it
    private namespaceLog: string;
    private namespace: string;
    private name: string;
    private _systemSecret?: string;
    private terminated: boolean;
    private usernames: Record<string, { id: string }>;
    private readonly FORBIDDEN_CHARS: RegExp;
    private inputCount: number;
    private outputCount: number;
    private users: Record<string, any>; // TODO
    private groups: Record<string, any>; // TODO
    private autoSubscribe: string[];
    private defaultHistory: null | string;
    private pluginHandler?: typeof PluginHandler;
    private _reportInterval?: null | NodeJS.Timer;
    private getPortRunning: null | PortRunningObject;
    private readonly _namespaceRegExp: RegExp;
    private instance?: number;
    // @ts-expect-error decide how to handle it
    private _utils: Utils;
    /** contents of io-package.json */
    protected adapterConfig?: Record<string, any>; // TODO: contents of io-pack?
    private connected?: boolean;
    protected adapterDir?: string | null;
    /** contents of package.json */
    protected pack?: Record<string, any>;
    /** contents of io-package.json */
    protected ioPack?: Record<string, any>; // contents of io-package.json TODO difference to adapterConfig?
    private _initializeTimeout?: NodeJS.Timeout | null;
    private inited?: boolean;
    /** contents of iobroker.json if required via AdapterOptions */
    private systemConfig?: Record<string, any>;
    /** the configured date format of system.config, only vailable if requested via AdapterOptions `useFormatDate` */
    private dateFormat?: any;
    /** if float comma instead of dot is used, only vailable if requested via AdapterOptions `useFormatDate` */
    private isFloatComma?: boolean;
    /** configured language of system.config, only vailable if requested via AdapterOptions `useFormatDate` */
    private language?: ioBroker.Languages;
    /** longitude configured in system.config, only vailable if requested via AdapterOptions `useFormatDate`*/
    private longitude?: number;
    /** latitude configured in system.config, only vailable if requested via AdapterOptions `useFormatDate`*/
    private latitude?: number;
    private _defaultObjs?: Record<string, Partial<ioBroker.StateCommon>>;
    private _aliasObjectsSubscribed?: boolean;
    protected config?: Record<string, any>;
    protected host?: string;
    protected common?: Record<string, any>;
    private mboxSubscribed?: boolean;
    protected readonly getPortAsync: (port: number) => Promise<number>;
    protected readonly getForeignStateAsync: (id: string, options?: unknown) => ioBroker.GetStatePromise;
    protected readonly checkPasswordAsync: (user: string, password: string, options?: unknown) => Promise<boolean>;
    protected readonly setPasswordAsync: (user: string, password: string, options?: unknown) => Promise<void>;
    protected readonly checkGroupAsync: (user: string, group: string, options?: unknown) => Promise<boolean>;
    protected readonly calculatePermissionsAsync: (
        user: string,
        commandsPermissions: CommandsPermissions,
        options?: unknown
    ) => Promise<ioBroker.PermissionSet>;
    protected readonly setObjectAsync: (
        id: string,
        obj: ioBroker.SettableObject,
        options?: unknown
    ) => ioBroker.SetObjectPromise;
    protected readonly setForeignObjectAsync: <T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options?: unknown
    ) => ioBroker.SetObjectPromise;
    // TODO: correct types
    protected readonly getCertificatesAsync: (...args: any[]) => Promise<any>;
    protected readonly getAdapterObjectsAsync: () => Promise<Record<string, ioBroker.AdapterScopedObject>>;
    protected readonly extendObjectAsync: (
        id: string,
        objPart: ioBroker.PartialObject,
        options?: ioBroker.ExtendObjectOptions
    ) => ioBroker.SetObjectPromise;
    protected readonly setExecutableCapabilities: (
        execPath: string,
        capabilities: string[],
        modeEffective?: boolean,
        modePermitted?: boolean,
        modeInherited?: boolean
    ) => Promise<void>;
    protected readonly extendForeignObjectAsync: <T extends string>(
        id: T,
        objPart: ioBroker.PartialObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options?: ioBroker.ExtendObjectOptions
    ) => ioBroker.SetObjectPromise;
    protected readonly getObjectAsync: (id: string, options?: unknown) => ioBroker.GetObjectPromise;
    protected readonly getObjectViewAsync: <Design extends string = string, Search extends string = string>(
        design: Design,
        search: Search,
        params: ioBroker.GetObjectViewParams | null | undefined,
        options?: unknown
    ) => ioBroker.GetObjectViewPromise<ioBroker.InferGetObjectViewItemType<Design, Search>>;
    protected readonly getObjectListAsync: (
        params: ioBroker.GetObjectListParams | null,
        options?: { sorted?: boolean } | Record<string, any>
    ) => ioBroker.GetObjectListPromise;
    protected readonly getEnumAsync: (
        name: string,
        options?: unknown
    ) => Promise<{ result: Record<string, any>; requestEnum: string }>;
    protected readonly getEnumsAsync: (enumList: ioBroker.EnumList, options?: unknown) => ioBroker.GetEnumsPromise;

    protected readonly delObjectAsync: (id: string, options?: ioBroker.DelObjectOptions) => Promise<void>;
    protected readonly delForeignObjectAsync: (id: string, options?: ioBroker.DelObjectOptions) => Promise<void>;
    protected readonly subscribeObjectsAsync: (pattern: string, options?: unknown) => Promise<void>;
    protected readonly unsubscribeObjectsAsync: (pattern: string, options?: unknown) => Promise<void>;
    protected readonly getStateAsync: (id: string, options?: unknown) => ioBroker.GetStatePromise;
    protected readonly subscribeForeignObjectsAsync: (pattern: string, options?: unknown) => Promise<void>;
    protected readonly unsubscribeForeignObjectsAsync: (pattern: string, options?: unknown) => Promise<void>;
    protected readonly setObjectNotExistsAsync: (
        id: string,
        obj: ioBroker.SettableObject,
        options?: unknown
    ) => ioBroker.SetObjectPromise;
    protected readonly setForeignObjectNotExistsAsync: <T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options?: unknown
    ) => ioBroker.SetObjectPromise;

    protected readonly deleteDeviceAsync: (deviceName: string, options?: unknown) => Promise<void>;
    protected readonly addChannelToEnumAsync: (
        enumName: string,
        addTo: string,
        parentDevice: string,
        channelName: string,
        options?: unknown
    ) => Promise<void>;
    protected readonly deleteChannelFromEnumAsync: (
        enumName: string,
        parentDevice: string,
        channelName: string,
        options?: unknown
    ) => Promise<void>;

    protected readonly getDevicesAsync: (options?: unknown) => Promise<ioBroker.DeviceObject[]>;

    protected readonly addStateToEnumAsync: (
        enumName: string,
        addTo: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        options?: unknown
    ) => Promise<void>;
    protected readonly deleteStateFromEnumAsync: (
        enumName: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        options?: unknown
    ) => Promise<void>;
    protected readonly chmodFileAsync: (
        adapter: string | null,
        path: string,
        options: { mode: number | string } | Record<string, any>
    ) => Promise<{ entries: ioBroker.ChownFileResult[]; id: string }>;
    // TODO: correct types
    protected readonly chownFileAsync: (...args: any[]) => Promise<any>;
    protected readonly readDirAsync: (
        adapterName: string | null,
        path: string,
        options?: unknown
    ) => ioBroker.ReadDirPromise;
    protected readonly unlinkAsync: (adapterName: string | null, path: string, options?: unknown) => Promise<void>;

    protected readonly delFileAsync: (adapterName: string | null, path: string, options?: unknown) => Promise<void>;
    protected readonly renameAsync: (
        adapterName: string | null,
        oldName: string,
        newName: string,
        options?: unknown
    ) => Promise<void>;
    protected readonly mkdirAsync: (adapterName: string | null, path: string, options?: unknown) => Promise<void>;
    protected readonly readFileAsync: (
        adapterName: string | null,
        path: string,
        options?: unknown
    ) => ioBroker.ReadFilePromise;
    protected readonly writeFileAsync: (
        adapterName: string | null,
        path: string,
        data: Buffer | string,
        options?: unknown
    ) => Promise<void>;
    protected readonly fileExistsAsync: (
        adapterName: string | null,
        path: string,
        options?: unknown
    ) => Promise<boolean>;

    // TODO correct types needed
    protected readonly getHistoryAsync: (...args: any[]) => Promise<any>;
    protected readonly delStateAsync: (id: string, options?: unknown) => Promise<void>;
    protected readonly delForeignStateAsync: (id: string, options?: unknown) => Promise<void>;
    protected readonly getStatesAsync: (pattern: string, options?: unknown) => ioBroker.GetStatesPromise;
    protected readonly getForeignStatesAsync: (pattern: string, options?: unknown) => ioBroker.GetStatesPromise;
    protected readonly subscribeForeignStatesAsync: (pattern: string, options?: unknown) => Promise<void>;
    protected readonly unsubscribeForeignStatesAsync: (pattern: string, options?: unknown) => Promise<void>;
    protected readonly subscribeStatesAsync: (pattern: string, options?: unknown) => Promise<void>;
    protected readonly unsubscribeStatesAsync: (pattern: string, options?: unknown) => Promise<void>;
    protected readonly setForeignBinaryStateAsync: (
        id: string,
        binary: Buffer,
        options?: unknown
    ) => ioBroker.SetStatePromise;
    protected readonly setBinaryStateAsync: (id: string, binary: Buffer, options?: unknown) => ioBroker.SetStatePromise;
    protected readonly getForeignBinaryStateAsync: (id: string, options?: unknown) => ioBroker.GetBinaryStatePromise;
    protected readonly getBinaryStateAsync: (id: string, options?: unknown) => ioBroker.GetBinaryStatePromise;
    protected readonly delForeignBinaryStateAsync: (id: string, options?: unknown) => Promise<void>;
    protected readonly delBinaryStateAsync: (id: string, options?: unknown) => Promise<void>;
    protected readonly stop?: () => Promise<void>;

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
            this._config.states.connectTimeout = Math.max(this._config.states.connectTimeout || 0, 5000);
            this._config.objects.connectTimeout = Math.max(this._config.objects.connectTimeout || 0, 5000);
        } else {
            throw new Error(`Cannot find ${configFileName}`);
        }

        if (!this._options || !this._options.config) {
            throw new Error('Configuration not set!');
        }

        if (this._options.config && !this._options.config.log) {
            this._options.config.log = this._config.log;
        }

        this._config = this._options.config || this._config;
        this.startedInCompactMode = !!this._options.compact;

        this.logList = new Set();
        this.aliases = new Map();
        this.aliasPatterns = new Set();
        this.enums = {};
        /** The cache of users */
        this.users = {};
        /** The cache of usernames */
        this.usernames = {};
        /** The cache of user groups */
        this.groups = {};
        this.defaultHistory = null;
        /** An array of instances, that support auto subscribe */
        this.autoSubscribe = [];
        this.inputCount = 0;
        this.outputCount = 0;

        this.getPortRunning = null;
        this.eventLoopLags = [];
        this.overwriteLogLevel = false;
        this.adapterReady = false;
        this._stopInProgress = false;
        this._callbackId = 1;
        this._firstConnection = true;

        this._timers = new Set();
        this._intervals = new Set();
        this._delays = new Set();

        /** A RegExp to test for forbidden chars in object IDs */
        this.FORBIDDEN_CHARS = FORBIDDEN_CHARS;
        /** Whether the adapter has already terminated */
        this.terminated = false;

        // TODO: remove shim
        // Provide selected tools methods for backward compatibility use in adapter
        this.tools = {
            encrypt: tools.encrypt,
            decrypt: tools.decrypt
        };

        // possible arguments
        // 0,1,.. - instance
        // info, debug, warn, error - log level
        // --force
        // --logs
        // --silent
        // --install
        // --debug = --force + --logs
        if (process.argv) {
            for (let a = 1; a < process.argv.length; a++) {
                if (
                    process.argv[a] === 'info' ||
                    process.argv[a] === 'debug' ||
                    process.argv[a] === 'error' ||
                    process.argv[a] === 'warn' ||
                    process.argv[a] === 'silly'
                ) {
                    this._config.log.level = process.argv[a];
                    this.overwriteLogLevel = true;
                } else if (process.argv[a] === '--silent') {
                    this._config.isInstall = true;
                    process.argv[a] = '--install';
                } else if (process.argv[a] === '--install') {
                    this._config.isInstall = true;
                } else if (process.argv[a] === '--logs') {
                    this._config.consoleOutput = true;
                } else if (process.argv[a] === '--force') {
                    this._config.forceIfDisabled = true;
                } else if (process.argv[a] === '--debug') {
                    this._config.forceIfDisabled = true;
                    this._config.consoleOutput = true;
                    if (this._config.log.level !== 'silly') {
                        this._config.log.level = 'debug';
                        this.overwriteLogLevel = true;
                    }
                } else if (process.argv[a] === '--console') {
                    this._config.consoleOutput = true;
                } else if (parseInt(process.argv[a], 10).toString() === process.argv[a]) {
                    this._config.instance = parseInt(process.argv[a], 10);
                }
            }
        }

        this._config.log.level = this._config.log.level || 'info';

        this._config.log.noStdout = !this._config.consoleOutput;

        this.performStrictObjectChecks = this._options.strictObjectChecks !== false;

        if (!this._options.name) {
            throw new Error('No name of adapter!');
        }

        this.name = this._options.name;

        const instance = parseInt(
            this._options.compactInstance !== undefined
                ? this._options.compactInstance
                : this._options.instance !== undefined
                ? this._options.instance
                : this._config.instance || 0,
            10
        );

        this.namespace = `${this._options.name}.${instance}`;
        this._namespaceRegExp = new RegExp(`^${`${this.namespace}.`.replace(/\./g, '\\.')}`); // cache the regex object 'adapter.0.'

        this._logger = logger(this._config.log);

        // compatibility
        if (!this._logger.silly) {
            this._logger.silly = this._logger.debug;
        }

        // Create dynamic methods
        /**
         * Promise-version of Adapter.getPort
         */
        this.getPortAsync = tools.promisifyNoError(this.getPort, this);

        /**
         * Promise-version of Adapter.checkPassword
         */
        this.checkPasswordAsync = tools.promisifyNoError(this.checkPassword, this);

        /**
         * Promise-version of Adapter.setPassword
         */
        this.setPasswordAsync = tools.promisify(this.setPassword, this);

        /**
         * Promise-version of Adapter.checkGroup
         */
        this.checkGroupAsync = tools.promisifyNoError(this.checkGroup, this);

        /**
         * Promise-version of Adapter.calculatePermissions
         */
        this.calculatePermissionsAsync = tools.promisifyNoError(this.calculatePermissions, this);

        /**
         * Promise-version of Adapter.getCertificates
         */
        this.getCertificatesAsync = tools.promisify(this.getCertificates, this);

        /**
         * Promise-version of Adapter.setObject
         */
        this.setObjectAsync = tools.promisify(this.setObject, this);

        /**
         * Promise-version of Adapter.getAdapterObjects
         */
        this.getAdapterObjectsAsync = tools.promisifyNoError(this.getAdapterObjects, this);

        /**
         * Promise-version of Adapter.extendObject
         */
        this.extendObjectAsync = tools.promisify(this.extendObject, this);

        /**
         * Promise-version of Adapter.setForeignObject
         */
        this.setForeignObjectAsync = tools.promisify(this.setForeignObject, this);

        /**
         * Promise-version of Adapter.extendForeignObject
         */
        this.extendForeignObjectAsync = tools.promisify(this.extendForeignObject, this);

        /**
         * Promise-version of Adapter.getObject
         */
        this.getObjectAsync = tools.promisify(this.getObject, this);

        /**
         * Promise-version of Adapter.getObjectView
         */
        this.getObjectViewAsync = tools.promisify(this.getObjectView, this);

        /**
         * Promise-version of Adapter.getObjectList
         */
        this.getObjectListAsync = tools.promisify(this.getObjectList, this);

        /**
         * Promise-version of Adapter.getEnum
         */
        this.getEnumAsync = tools.promisify(this.getEnum, this, ['result', 'requestEnum']);

        /**
         * Promise-version of Adapter.getEnums
         */
        this.getEnumsAsync = tools.promisify(this.getEnums, this);

        /**
         * Promise-version of Adapter.getForeignObjects
         */
        this.getForeignObjectsAsync = tools.promisify(this.getForeignObjects, this);

        /**
         * Promise-version of Adapter.findForeignObject
         */
        this.findForeignObjectAsync = tools.promisify(this.findForeignObject, this, ['id', 'name']);

        /**
         * Promise-version of Adapter.getForeignObject
         */
        this.getForeignObjectAsync = tools.promisify(this.getForeignObject, this);

        /**
         * Promise-version of Adapter.delObject
         */
        this.delObjectAsync = tools.promisify(this.delObject, this);

        /**
         * Promise-version of Adapter.delForeignObject
         */
        this.delForeignObjectAsync = tools.promisify(this.delForeignObject, this);

        /**
         * Promise-version of Adapter.subscribeObjects
         */
        this.subscribeObjectsAsync = tools.promisify(this.subscribeObjects, this);

        /**
         * Promise-version of Adapter.unsubscribeObjects
         */
        this.unsubscribeObjectsAsync = tools.promisify(this.unsubscribeObjects, this);

        /**
         * Promise-version of Adapter.subscribeForeignObjects
         */
        this.subscribeForeignObjectsAsync = tools.promisify(this.subscribeForeignObjects, this);

        /**
         * Promise-version of Adapter.unsubscribeForeignObjects
         */
        this.unsubscribeForeignObjectsAsync = tools.promisify(this.unsubscribeForeignObjects, this);

        /**
         * Promise-version of Adapter.setObjectNotExists
         */
        this.setObjectNotExistsAsync = tools.promisify(this.setObjectNotExists, this);

        /**
         * Promise-version of Adapter.setForeignObjectNotExists
         */
        this.setForeignObjectNotExistsAsync = tools.promisify(this.setForeignObjectNotExists, this);

        /**
         * Promise-version of Adapter.createDevice
         */
        this.createDeviceAsync = tools.promisify(this.createDevice, this);

        /**
         * Promise-version of Adapter.createChannel
         */
        this.createChannelAsync = tools.promisify(this.createChannel, this);

        /**
         * Promise-version of Adapter.createState
         */
        this.createStateAsync = tools.promisify(this.createState, this);

        /**
         * Promise-version of Adapter.deleteDevice
         */
        this.deleteDeviceAsync = tools.promisify(this.deleteDevice, this);

        /**
         * Promise-version of Adapter.addChannelToEnum
         */
        this.addChannelToEnumAsync = tools.promisify(this.addChannelToEnum, this);

        /**
         * Promise-version of Adapter.deleteChannelFromEnum
         */
        this.deleteChannelFromEnumAsync = tools.promisify(this.deleteChannelFromEnum, this);

        /**
         * Promise-version of Adapter.deleteChannel
         */
        this.deleteChannelAsync = tools.promisify(this.deleteChannel, this);

        /**
         * Promise-version of Adapter.deleteState
         */
        this.deleteStateAsync = tools.promisify(this.deleteState, this);

        /**
         * Promise-version of Adapter.getDevices
         */
        this.getDevicesAsync = tools.promisify(this.getDevices, this);

        /**
         * Promise-version of Adapter.getChannelsOf
         */
        this.getChannelsOfAsync = tools.promisify(this.getChannelsOf, this);

        this.getChannels = this.getChannelsOf;
        this.getChannelsAsync = this.getChannelsOfAsync;

        /**
         * Promise-version of Adapter.getStatesOf
         */
        this.getStatesOfAsync = tools.promisify(this.getStatesOf, this);

        /**
         * Promise-version of Adapter.addStateToEnum
         */
        this.addStateToEnumAsync = tools.promisify(this.addStateToEnum, this);

        /**
         * Promise-version of Adapter.deleteStateFromEnum
         */
        this.deleteStateFromEnumAsync = tools.promisify(this.deleteStateFromEnum, this);

        /**
         * Promise-version of Adapter.chmodFile
         */
        this.chmodFileAsync = tools.promisify(this.chmodFile, this);

        /**
         * Promise-version of Adapter.chownFile
         */
        this.chownFileAsync = tools.promisify(this.chownFile, this);

        /**
         * Promise-version of Adapter.readDir
         */
        this.readDirAsync = tools.promisify(this.readDir, this);

        /**
         * Promise-version of Adapter.unlink
         */
        this.unlinkAsync = tools.promisify(this.unlink, this);

        this.delFile = this.unlink;
        this.delFileAsync = this.unlinkAsync;

        /**
         * Promise-version of Adapter.rename
         */
        this.renameAsync = tools.promisify(this.rename, this);

        /**
         * Promise-version of Adapter.mkdir
         */
        this.mkdirAsync = tools.promisify(this.mkdir, this);

        /**
         * Promise-version of Adapter.readFile
         */
        this.readFileAsync = tools.promisify(this.readFile, this, ['file', 'mimeType']);

        /**
         * Promise-version of Adapter.writeFile
         */
        this.writeFileAsync = tools.promisify(this.writeFile, this);

        /**
         * Promise-version of Adapter.fileExists
         */
        this.fileExistsAsync = tools.promisify(this.fileExists, this);

        /**
         * Promise-version of Adapter.sendTo
         */
        this.sendToAsync = tools.promisifyNoError(this.sendTo, this);

        /**
         * Promise-version of Adapter.sendToHost
         */
        this.sendToHostAsync = tools.promisifyNoError(this.sendToHost, this);

        /**
         * Promise-version of Adapter.setState
         */
        this.setStateAsync = tools.promisify(this.setState, this);

        /**
         * Promise-version of Adapter.setStateChanged
         */
        this.setStateChangedAsync = tools.promisify(this.setStateChanged, this, ['id', 'notChanged']);

        /**
         * Promise-version of Adapter.setForeignState
         */
        this.setForeignStateAsync = tools.promisify(this.setForeignState, this);

        /**
         * Promise-version of Adapter.setForeignStateChanged
         */
        this.setForeignStateChangedAsync = tools.promisify(this.setForeignStateChanged, this);

        /**
         * Promise-version of Adapter.getState
         */
        this.getStateAsync = tools.promisify(this.getState, this);

        /**
         * Promise-version of Adapter.getForeignState
         */
        this.getForeignStateAsync = tools.promisify(this.getForeignState, this);

        /**
         * Promise-version of Adapter.getHistory
         */
        this.getHistoryAsync = tools.promisify(this.getHistory, this, ['result', 'step', 'sessionId']);

        /**
         * Promise-version of Adapter.delState
         */
        this.delStateAsync = tools.promisify(this.delState, this);

        /**
         * Promise-version of Adapter.delForeignState
         */
        this.delForeignStateAsync = tools.promisify(this.delForeignState, this);

        /**
         * Promise-version of Adapter.getStates
         */
        this.getStatesAsync = tools.promisify(this.getStates, this);

        /**
         * Promise-version of Adapter.getForeignStates
         */
        this.getForeignStatesAsync = tools.promisify(this.getForeignStates, this);

        /**
         * Promise-version of Adapter.subscribeForeignStates
         */
        this.subscribeForeignStatesAsync = tools.promisify(this.subscribeForeignStates, this);

        /**
         * Promise-version of Adapter.unsubscribeForeignStates
         */
        this.unsubscribeForeignStatesAsync = tools.promisify(this.unsubscribeForeignStates, this);

        /**
         * Promise-version of Adapter.subscribeStates
         */
        this.subscribeStatesAsync = tools.promisify(this.subscribeStates, this);

        /**
         * Promise-version of Adapter.unsubscribeStates
         */
        this.unsubscribeStatesAsync = tools.promisify(this.unsubscribeStates, this);

        /**
         * Promise-version of Adapter.setBinaryState
         *
         * @alias setForeignBinaryStateAsync
         * @memberof Adapter
         * @param {string} id of state
         * @param {Buffer} binary data
         * @param {object} [options] optional
         * @return {Promise}
         *
         */
        this.setForeignBinaryStateAsync = tools.promisify(this.setForeignBinaryState, this);

        /**
         * Async version of setBinaryState
         *
         * @alias setBinaryStateAsync
         * @memberof Adapter
         *
         * @param {string} id of state
         * @param {Buffer} binary data
         * @param {object} [options] optional
         * @param {Promise<void>}
         */
        this.setBinaryStateAsync = tools.promisify(this.setBinaryState, this);

        /**
         * Promise-version of Adapter.getBinaryState
         *
         * @alias getForeignBinaryStateAsync
         * @memberof Adapter
         *
         */
        this.getForeignBinaryStateAsync = tools.promisify(this.getForeignBinaryState, this);

        /**
         * Promisified version of getBinaryState
         *
         * @param {string} id The state ID
         * @param {object} options optional
         * @return {Promise<Buffer>}
         */
        this.getBinaryStateAsync = tools.promisify(this.getBinaryState, this);

        /**
         * Promise-version of Adapter.delForeignBinaryState
         *
         * @alias delForeignBinaryStateAsync
         * @memberof Adapter
         * @param {string} id
         * @param {object} [options]
         * @return {Promise<void>}
         *
         */
        this.delForeignBinaryStateAsync = tools.promisify(this.delForeignBinaryState, this);

        /**
         * Promise-version of Adapter.delBinaryState
         *
         * @alias delBinaryStateAsync
         * @memberof Adapter
         * @param {string} id
         * @param {object} [options]
         * @return {Promise<void>}
         *
         */
        this.delBinaryStateAsync = tools.promisify(this.delBinaryState, this);

        this.setExecutableCapabilities = tools.setExecutableCapabilities;
        this._init();
    }

    // overload with real types
    decrypt(secretVal: string, value?: string): string;
    /**
     * Decrypt the password/value with given key
     * @param secretVal to use for decrypt (or value if only one parameter is given)
     * @param  [value] value to decrypt (if secret is provided)
     */
    decrypt(secretVal: unknown, value?: unknown): string {
        if (value === undefined) {
            value = secretVal;
            secretVal = this._systemSecret;
        }

        Utils.assertsString(secretVal, 'secretVal');
        Utils.assertsString(value, 'value');

        return tools.decrypt(secretVal, value);
    }

    // overload with real types
    encrypt(secretVal: string, value?: string): string;
    /**
     * Encrypt the password/value with given key
     * @param secretVal to use for encrypt (or value if only one parameter is given)
     * @param [value] value to encrypt (if secret is provided)
     */
    encrypt(secretVal: unknown, value: unknown): string {
        if (value === undefined) {
            value = secretVal;
            secretVal = this._systemSecret;
        }

        Utils.assertsString(secretVal, 'secretVal');
        Utils.assertsString(value, 'value');

        return tools.encrypt(secretVal, value);
    }

    // real types overload
    getSession(id: string, callback: ioBroker.GetSessionCallback): void | Promise<void>;
    // unknown guard implementation
    getSession(id: unknown, callback: unknown): void | Promise<void> {
        Utils.assertsString(id, 'id');
        Utils.assertsOptionalCallback(callback, 'callback');

        return this._getSession({ id, callback });
    }

    // actual implementation
    private _getSession(options: InternalGetSessionOptions): void | Promise<void> {
        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(`${this.namespaceLog} getSession not processed because States database not connected`);
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterStates.getSession(options.id, options.callback);
    }

    // overload for docs
    setSession(
        id: string,
        ttl: number,
        data: Record<string, any>,
        callback?: ioBroker.ErrorCallback
    ): void | Promise<void>;

    // unknown implementation guards
    setSession(id: unknown, ttl: unknown, data: unknown, callback: unknown): void | Promise<void> {
        Utils.assertsString(id, 'id');
        Utils.assertsOptionalCallback(callback, 'callback');
        Utils.assertsNumber(ttl, 'ttl');
        Utils.assertsObject(data, 'data');

        return this._setSession({ id, ttl, data, callback });
    }

    // actual implementation
    private _setSession(options: InternalSetSessionOptions): void | Promise<void> {
        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                this.namespaceLog + ' ' + 'setSession not processed because States database not connected'
            );
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }
        adapterStates.setSession(options.id, options.ttl, options.data, options.callback);
    }

    // real types overload
    destroySession(id: string, callback?: ioBroker.ErrorCallback): void | Promise<void>;
    destroySession(id: unknown, callback: unknown): void | Promise<void> {
        Utils.assertsString(id, 'id');
        Utils.assertsOptionalCallback(callback, 'callback');

        return this._destroySession({ id, callback });
    }

    private _destroySession(options: InternalDestroySessionOptions) {
        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} destroySession not processed because States database not connected`
            );
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterStates.destroySession(options.id, options.callback);
    }

    private async _getObjectsByArray(
        keys: string[],
        objects: ioBroker.AnyObject[] | null,
        options: Record<string, any>
    ) {
        if (objects) {
            return objects;
        }

        const res: (ioBroker.AnyObject | null | undefined)[] = [];
        for (const key of keys) {
            try {
                const obj = await this.getForeignObjectAsync(key, options);
                res.push(obj);
            } catch {
                res.push(null);
            }
        }

        return res;
    }

    // external signature
    terminate(reason?: string | number, exitCode?: number): void;

    /**
     * stops the execution of adapter, but not disables it.
     *
     * Sometimes, the adapter must be stopped if some libraries are missing.
     *
     * @param reason optional termination description
     * @param exitCode optional exit code
     */
    terminate(reason: unknown, exitCode: unknown): void {
        // This function must be defined very first, because in the next lines will be yet used.
        if (this.terminated) {
            return;
        }
        this.terminated = true;

        // @ts-expect-error types not infered correctly
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
            _exitCode =
                process.argv.indexOf('--install') === -1
                    ? EXIT_CODES.ADAPTER_REQUESTED_TERMINATION
                    : EXIT_CODES.NO_ERROR;
        } else {
            _exitCode = exitCode;
        }

        const isNotCritical =
            exitCode === EXIT_CODES.ADAPTER_REQUESTED_TERMINATION ||
            exitCode === EXIT_CODES.START_IMMEDIATELY_AFTER_STOP ||
            exitCode === EXIT_CODES.NO_ERROR;
        const text = `${this.namespaceLog} Terminated (${Utils.getErrorText(_exitCode)}): ${_reason}`;
        if (isNotCritical) {
            this._logger.info(text);
        } else {
            this._logger.warn(text);
        }
        setTimeout(async () => {
            // give last states some time to get handled
            if (adapterStates) {
                try {
                    await adapterStates.destroy();
                } catch {
                    // ignore
                }
            }
            if (adapterObjects) {
                try {
                    await adapterObjects.destroy();
                } catch {
                    //ignore
                }
            }
            if (this.startedInCompactMode) {
                this.emit('exit', _exitCode, reason);
                adapterStates = null;
                adapterObjects = null;
            } else {
                process.exit(_exitCode);
            }
        }, 500);
    }

    // external signature
    getPort(port: number, host?: string, callback?: (port: number) => void): void;
    /**
     * Helper function to find next free port
     *
     * Looks for first free TCP port starting with given one:
     * <pre><code>
     *     adapter.getPort(8081, function (port) {
     *         adapter.log.debug('Following port is free: ' + port);
     *     });
     * </code></pre>
     *
     * @alias getPort
     * @memberof Adapter
     * @param port port number to start the search for free port
     * @param [host] optional hostname for the port search
     * @param callback return result
     *        <pre><code>function (port) {}</code></pre>
     */
    getPort(port: unknown, host: unknown, callback: unknown): void {
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
            Utils.assertsString(host, 'host');
            _host = host;
        }

        Utils.assertsNumber(port, 'port');
        Utils.assertsOptionalCallback(callback, 'callback');

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

    supportsFeature(featureName: string): boolean;

    /**
     * Method to check for available Features for adapter development
     *
     * Use it like ...
     * <pre><code>
     *     if (adapter.supportsFeature && adapter.supportsFeature('ALIAS')) {
     *         ...
     *     }
     * </code></pre>

     * @param featureName the name of the feature to check
     * @returns true/false if the feature is in the list of supported features
     */
    supportsFeature(featureName: unknown): boolean {
        if (typeof featureName === 'string') {
            return SUPPORTED_FEATURES.includes(featureName);
        } else {
            return false;
        }
    }

    // external signature
    checkPassword(
        user: string,
        pw: string,
        options?: Record<string, any>,
        callback?: CheckPasswordCallback
    ): Promise<void>;
    /**
     * validates user and password
     *
     *
     * @alias checkPassword
     * @memberof Adapter
     * @param user user name as text
     * @param pw password as text
     * @param [options] optional user context
     * @param callback return result
     *        <pre><code>
     *            function (result) {
     *              if (result) adapter.log.debug('User is valid');
     *            }
     *        </code></pre>
     */
    checkPassword(user: unknown, pw: unknown, options: unknown, callback: unknown): Promise<void> {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        Utils.assertsOptionalCallback(callback, 'callback');
        Utils.assertsString(user, 'user');
        Utils.assertsString(pw, 'pw');

        if (!callback) {
            throw new Error('checkPassword: no callback');
        }

        if (options !== undefined && options !== null) {
            Utils.assertsObject(options, 'options');
        }

        return this._checkPassword({ user, pw, options, callback });
    }

    private async _checkPassword(options: InternalCheckPasswordOptions): Promise<void> {
        if (options.user && !options.user.startsWith('system.user.')) {
            // its not yet a `system.user.xy` id, thus we assume it's a username
            if (!this.usernames[options.user]) {
                // we did not find the id of the username in our cache -> update cache
                try {
                    await this._updateUsernameCache();
                } catch (e) {
                    this._logger.error(`${this.namespaceLog} ${e.message}`);
                }
                if (!this.usernames[options.user]) {
                    // user still not there, its no valid user -> fallback to legacy check
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
            if (err || !obj || !obj.common || (!obj.common.enabled && options.user !== SYSTEM_ADMIN_USER)) {
                return tools.maybeCallback(options.callback, false, options.user);
            } else {
                password(options.pw).check(obj.common.password, (err, res) => {
                    return tools.maybeCallback(options.callback, !!res, options.user);
                });
            }
        });
    }

    /**
     * This method update the cached values in this.usernames
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
    getUserID(username: string): Promise<string | void>;
    /**
     * Return ID of given username
     *
     * @param username - name of the user
     */
    getUserID(username: unknown): Promise<string | void> {
        Utils.assertsString(username, 'username');

        return this._getUserID({ username });
    }

    async _getUserID(options: InternalGetUserIDOptions): Promise<void | string> {
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
        callback?: ioBroker.ErrorCallback
    ): Promise<void>;

    /**
     * sets the user's password
     *
     * @alias setPassword
     * @param user user name as text
     * @param pw password as text
     * @param [options] optional user context
     * @param [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot set password: ' + err);
     *            }
     *        </code></pre>
     */
    setPassword(user: unknown, pw: unknown, options: unknown, callback: unknown): Promise<void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Utils.assertsString(user, 'user');
        Utils.assertsString(pw, 'pw');
        Utils.assertsOptionalCallback(callback, 'callback');
        if (options !== undefined && options !== null) {
            Utils.assertsObject(options, 'options');
        }

        return this._setPassword({ user, pw, options, callback });
    }

    private async _setPassword(options: InternalSetPasswordOptions) {
        if (options.user && !options.user.startsWith('system.user.')) {
            // its not yet a `system.user.xy` id, thus we assume it's a username
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
                            password: ''
                        }
                    },
                    options.options || {},
                    () => {
                        return tools.maybeCallback(options.callback);
                    }
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
                                password: res
                            }
                        },
                        options.options || {},
                        () => {
                            return tools.maybeCallbackWithError(options.callback, null);
                        }
                    );
                });
            }
        });
    }

    // external signature
    checkGroup(
        user: string,
        group: string,
        options?: Record<string, any>,
        callback?: CheckGroupCallback
    ): Promise<void>;
    /**
     * returns if user exists and is in the group
     *
     * This function used mostly internally and the adapter developer do not require it.
     *
     * @alias checkGroup
     * @memberof Adapter
     * @param user user name as text
     * @param group group name
     * @param [options] optional user context
     * @param callback return result
     *        <pre><code>
     *            function (result) {
     *              if (result) adapter.log.debug('User exists and in the group');
     *            }
     *        </code></pre>
     */
    checkGroup(user: unknown, group: unknown, options: unknown, callback: unknown): Promise<void> {
        user = user || '';

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Utils.assertsString(user, 'user');
        Utils.assertsString(group, 'group');
        if (options !== undefined && options !== null) {
            Utils.assertsObject(options, 'options');
        }
        Utils.assertsOptionalCallback(callback, 'callback');

        return this._checkGroup({ user, group, options, callback });
    }

    private async _checkGroup(options: InternalCheckGroupOptions): Promise<void> {
        if (options.user && !options.user.startsWith('system.user.')) {
            // its not yet a `system.user.xy` id, thus we assume it's a username
            if (!this.usernames[options.user]) {
                // we did not find the id of the username in our cache -> update cache
                try {
                    await this._updateUsernameCache();
                } catch (e) {
                    this._logger.error(`${this.namespaceLog} ${e}`);
                }

                if (!this.usernames[options.user]) {
                    // user still not there, its no valid user -> fallback
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
                } else {
                    return tools.maybeCallback(options.callback, false);
                }
            });
        });
    }

    // external signature
    calculatePermissions(
        user: string,
        commandsPermissions: CommandsPermissions,
        options?: Record<string, any>,
        callback?: CalculatePermissionsCallback
    ): Promise<void | ioBroker.PermissionSet>;

    /**
     * get the user permissions
     *
     * This function used mostly internally and the adapter developer do not require it.
     * The function reads permissions of user's groups (it can be more than one) and merge permissions together
     *
     * @param  user user name as text
     * @param  commandsPermissions object that describes the access rights like
     *     <pre><code>
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
     *        </code></pre>
     * @param [options] optional user context
     * @param [callback] return result
     *        <pre><code>
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
     *        </code></pre>
     */
    calculatePermissions(
        user: unknown,
        commandsPermissions: unknown,
        options: unknown,
        callback: unknown
    ): Promise<void | ioBroker.PermissionSet> {
        user = user || '';

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Utils.assertsString(user, 'user');
        Utils.assertsObject(commandsPermissions, 'commandsPermissions');
        if (options !== undefined && options !== null) {
            Utils.assertsObject(options, 'options');
        }
        Utils.assertsOptionalCallback(callback, 'callback');

        return this._calculatePermissions({ user, commandsPermissions, options, callback });
    }

    private async _calculatePermissions(
        options: InternalCalculatePermissionsOptions
    ): Promise<void | ioBroker.PermissionSet> {
        if (options.user && !options.user.startsWith('system.user.')) {
            // its not yet a `system.user.xy` id, thus we assume it's a username
            if (!this.usernames[options.user]) {
                // we did not find the id of the username in our cache -> update cache
                try {
                    await this._updateUsernameCache();
                } catch (e) {
                    this._logger.error(this.namespaceLog + ' ' + e.message);
                }
                // user still not there, fallback
                if (!this.usernames[options.user]) {
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

        // read all groups
        let acl: Partial<ioBroker.PermissionSet> = { user: options.user };
        if (options.user === SYSTEM_ADMIN_USER) {
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

            return tools.maybeCallback(options.callback, acl);
        }
        this.getForeignObjects('*', 'group', null, options, (err, groups) => {
            acl.groups = [];
            // aggregate all groups permissions, where this user is
            if (groups) {
                for (const g of Object.keys(groups)) {
                    if (
                        groups[g] &&
                        groups[g].common &&
                        groups[g].common.members &&
                        groups[g].common.members.includes(options.user)
                    ) {
                        acl.groups.push(groups[g]._id);
                        if (groups[g]._id === SYSTEM_ADMIN_GROUP) {
                            acl = {
                                file: {
                                    read: true,
                                    write: true,
                                    delete: true,
                                    create: true,
                                    list: true
                                },
                                // @ts-expect-error create is missing
                                object: {
                                    read: true,
                                    write: true,
                                    delete: true,
                                    list: true
                                },
                                state: {
                                    read: true,
                                    write: true,
                                    delete: true,
                                    create: true,
                                    list: true
                                },
                                user: options.user,
                                users: {
                                    read: true,
                                    write: true,
                                    create: true,
                                    delete: true,
                                    list: true
                                },
                                other: {
                                    execute: true,
                                    http: true,
                                    sendto: true
                                },
                                groups: acl.groups
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

            return tools.maybeCallback(options.callback, acl);
        });
    }

    private async _stop(isPause?: boolean, isScheduled?: boolean, exitCode?: number, updateAliveState?: boolean) {
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

            const finishUnload = () => {
                if (this._timers.size) {
                    this._timers.forEach(id => clearTimeout(id));
                    this._timers.clear();
                }

                if (this._intervals.size) {
                    this._intervals.forEach(id => clearInterval(id));
                    this._intervals.clear();
                }

                if (this._delays.size) {
                    this._delays.forEach(id => clearTimeout(id));
                    this._delays.clear();
                }

                if (adapterStates && updateAliveState) {
                    this.outputCount++;
                    adapterStates.setState(`${id}.alive`, { val: false, ack: true, from: id }, () => {
                        if (!isPause && this._logger) {
                            this._logger.info(`${this.namespaceLog} terminating`);
                        }

                        // To this moment, the class could be destroyed
                        this.terminate(exitCode);
                    });
                } else {
                    if (!isPause && this.log) {
                        this._logger.info(`${this.namespaceLog} terminating`);
                    }
                    this.terminate(exitCode);
                }
            };

            // if we were never ready, we don't trigger unload
            if (this.adapterReady) {
                if (typeof this._options.unload === 'function') {
                    if (this._options.unload.length >= 1) {
                        // The method takes (at least) a callback
                        this._options.unload(finishUnload);
                    } else {
                        // The method takes no arguments, so it must return a Promise
                        // @ts-expect-error already fixed in latest types
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
                                `${this.namespaceLog} Error in ${id}: The unload method must return a Promise if it does not accept a callback!`
                            );
                        }
                    }
                } else {
                    this.emit('unload', finishUnload);
                }
            }

            // Even if the developer forgets to call the unload callback, we need to stop the process
            // Therefore wait a short while and then force the unload
            setTimeout(() => {
                if (adapterStates) {
                    finishUnload();

                    // Give 1 seconds to write the value
                    setTimeout(() => {
                        if (!isPause && this.log) {
                            this._logger.info(`${this.namespaceLog} terminating with timeout`);
                        }
                        this.terminate(exitCode);
                    }, 1000);
                } else {
                    if (!isPause && this.log) {
                        this._logger.info(`${this.namespaceLog} terminating`);
                    }
                    this.terminate(exitCode);
                }
            }, (this.common && this.common.stopTimeout) || 500);
        }
    }

    /**
     * Reads the file certificate from given path and adds a file watcher to restart adapter on cert changes
     * if a cert is passed it is returned as it is
     * @param cert
     */
    private _readFileCertificate(cert: string): string {
        if (typeof cert === 'string') {
            try {
                // if length < 1024 its no valid cert, so we assume a path to a valid certificate
                if (cert.length < 1024 && fs.existsSync(cert)) {
                    const certFile = cert;
                    cert = fs.readFileSync(certFile, 'utf8');
                    // start watcher of this file
                    fs.watch(certFile, (eventType, filename) => {
                        this._logger.warn(
                            `${this.namespaceLog} New certificate "${filename}" detected. Restart adapter`
                        );
                        setTimeout(() => this._stop(false, true), 2000);
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
        callback?: GetCertificatesCallback
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
     *        <pre><code>
     *            function (err, certs, letsEncrypt) {
     *              adapter.log.debug('private key: ' + certs.key);
     *              adapter.log.debug('public cert: ' + certs.cert);
     *              adapter.log.debug('chained cert: ' + certs.ca);
     *            }
     *        </code></pre>
     */
    getCertificates(publicName: unknown, privateName: unknown, chainedName: unknown, callback: unknown): void {
        if (!this.config) {
            throw new Error(tools.ERRORS.ERROR_NOT_READY);
        }

        if (typeof publicName === 'function') {
            callback = publicName;
            publicName = null;
        }
        if (typeof privateName === 'function') {
            callback = privateName;
            privateName = null;
        }
        if (typeof chainedName === 'function') {
            callback = chainedName;
            chainedName = null;
        }
        publicName = publicName || this.config.certPublic;
        privateName = privateName || this.config.certPrivate;
        chainedName = chainedName || this.config.certChained;

        Utils.assertsString(publicName, 'publicName');
        Utils.assertsString(privateName, 'privateName');
        Utils.assertsString(chainedName, 'chainedName');
        Utils.assertsOptionalCallback(callback, 'callback');

        return this._getCertificates({ publicName, privateName, chainedName, callback });
    }

    private _getCertificates(options: InternalGetCertificatesOptions) {
        // Load certificates
        this.getForeignObject('system.certificates', null, (err, obj) => {
            if (
                err ||
                !obj ||
                !obj.native.certificates ||
                !options.publicName ||
                !options.privateName ||
                !obj.native.certificates[options.publicName] ||
                !obj.native.certificates[options.privateName] ||
                (options.chainedName && !obj.native.certificates[options.chainedName])
            ) {
                this._logger.error(
                    `${this.namespaceLog} Cannot configure secure web server, because no certificates found: ${options.publicName}, ${options.privateName}, ${options.chainedName}`
                );
                return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_NOT_FOUND);
            } else {
                let ca;
                if (options.chainedName) {
                    const chained = this._readFileCertificate(obj.native.certificates[options.chainedName]).split(
                        '-----END CERTIFICATE-----\r\n'
                    );
                    ca = [];
                    for (const cert of chained) {
                        if (cert.replace(/(\r\n|\r|\n)/g, '').trim()) {
                            ca.push(cert + '-----END CERTIFICATE-----\r\n');
                        }
                    }
                }

                return tools.maybeCallbackWithError(
                    options.callback,
                    null,
                    {
                        key: this._readFileCertificate(obj.native.certificates[options.privateName]),
                        cert: this._readFileCertificate(obj.native.certificates[options.publicName]),
                        ca
                    },
                    obj.native.letsEncrypt
                );
            }
        });
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
     * since merging with the existing config is done automatically, e.g. like this:
     *
     * `adapter.updateConfig({prop1: "newValue1"})`
     *
     * After updating the configuration, the adapter is automatically restarted.
     *
     * @param newConfig The new config values to be stored
     */
    updateConfig(newConfig: unknown): ioBroker.SetObjectPromise {
        Utils.assertsObject(newConfig, 'newConfig');

        return this._updateConfig({ newConfig });
    }

    private async _updateConfig(options: InternalUpdateConfigOptions): ioBroker.SetObjectPromise {
        // merge the old and new configuration
        const _config = Object.assign({}, this.config, options.newConfig);
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

        obj.native = _config;
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
     * @param attribute - attribute name in native configuration part
     * @param [callback] - optional callback
     *
     */
    getEncryptedConfig(attribute: unknown, callback: unknown): Promise<string | void> {
        Utils.assertsString(attribute, 'attribute');
        Utils.assertsOptionalCallback(callback, 'callback');

        return this._getEncryptedConfig({ attribute, callback });
    }

    private async _getEncryptedConfig(options: InternalGetEncryptedConfigOptions) {
        if (!this.config) {
            throw new Error(tools.ERRORS.ERROR_NOT_READY);
        }

        if (Object.prototype.hasOwnProperty.call(this.config, options.attribute)) {
            if (this._systemSecret !== undefined) {
                return tools.maybeCallbackWithError(
                    options.callback,
                    null,
                    tools.decrypt(this._systemSecret, this.config[options.attribute])
                );
            } else {
                try {
                    const data = await this.getForeignObjectAsync('system.config');
                    if (data && data.native) {
                        this._systemSecret = data.native.secret;
                    }
                } catch {
                    // do nothing - we initialize default secret below
                }
                this._systemSecret = this._systemSecret || DEFAULT_SECRET;
                return tools.maybeCallbackWithError(
                    options.callback,
                    null,
                    tools.decrypt(this._systemSecret, this.config[options.attribute])
                );
            }
        } else {
            return tools.maybeCallbackWithError(options.callback, `Attribute "${options.attribute}" not found`);
        }
    }

    // external signature
    setTimeout(cb: TimeoutCallback, timeout: number, ...args: any[]): NodeJS.Timeout | void;
    /**
     * Same as setTimeout
     * but it clears the running timers on unload
     * does not work after unload has been called
     *
     * @param cb - timer callback
     * @param timeout - timeout in milliseconds
     * @param args - as many arguments as needed, which will be passed to setTimeout
     * @returns timer id
     */
    setTimeout(cb: unknown, timeout: unknown, ...args: unknown[]): NodeJS.Timeout | void {
        if (typeof cb !== 'function') {
            this._logger.warn(
                this.namespaceLog +
                    ' ' +
                    `setTimeout expected callback to be of type "function", but got "${typeof cb}"`
            );
            return;
        }

        if (this._stopInProgress) {
            this._logger.warn(this.namespaceLog + ' ' + `setTimeout called, but adapter is shutting down`);
            return;
        }

        Utils.assertsNumber(timeout, 'timeout');

        const id = setTimeout.call(
            null,
            () => {
                this._timers.delete(id);
                cb(...args);
            },
            timeout
        );
        this._timers.add(id);

        return id;
    }

    clearTimeout(id: unknown): void;

    /**
     * Same as clearTimeout
     * but it check the running timers on unload
     *
     * @param id - timer id
     */
    clearTimeout(id: unknown): void {
        Utils.assertsNumber(id, 'id');

        // @ts-expect-error todo fix it
        clearTimeout(id);
        this._timers.delete(id);
    }

    // external signature
    delay(timeout: number): Promise<void>;

    /**
     * delays the fullfillment of the promise the amount of time.
     * it will not fullfill during and after adapter shutdown
     *
     * @param timeout - timeout in milliseconds
     * @returns promise when timeout is over
     */
    delay(timeout: unknown): Promise<void> {
        if (this._stopInProgress) {
            this._logger.warn(this.namespaceLog + ' ' + `delay called, but adapter is shutting down`);
        }

        Utils.assertsNumber(timeout, 'timeout');

        return new Promise(resolve => {
            const id = setTimeout(() => {
                this._delays.delete(id);
                if (!this._stopInProgress) {
                    resolve();
                }
            }, timeout);
            this._delays.add(id);
        });
    }

    // external signature
    setInterval(cb: TimeoutCallback, timeout: number, ...args: any[]): NodeJS.Timeout | void;

    /**
     * Same as setInterval
     * but it clears the running intervals on unload
     * does not work after unload has been called
     *
     * @param cb - interval callback
     * @param timeout - interval in milliseconds
     * @param args - as many arguments as needed, which will be passed to setTimeout
     * @returns interval id
     */
    setInterval(cb: unknown, timeout: unknown, ...args: unknown[]): NodeJS.Timeout | void {
        if (typeof cb !== 'function') {
            this._logger.error(
                this.namespaceLog +
                    ' ' +
                    `setInterval expected callback to be of type "function", but got "${typeof cb}"`
            );
            return;
        }

        if (this._stopInProgress) {
            this._logger.warn(this.namespaceLog + ' ' + `setInterval called, but adapter is shutting down`);
            return;
        }

        Utils.assertsNumber(timeout, 'timeout');

        const id = setInterval(() => cb(...args), timeout);
        this._intervals.add(id);

        return id;
    }

    // external signature
    clearInterval(id: number): void;

    /**
     * Same as clearInterval
     * but it check the running intervals on unload
     *
     * @param id - interval id
     */
    clearInterval(id: unknown): void {
        Utils.assertsNumber(id, 'id');
        // @ts-expect-error todo fix
        clearInterval(id);
        this._intervals.delete(id);
    }

    setObject(id: ID, obj: ioBroker.SettableObject, callback?: ioBroker.SetObjectCallback): Promise<void>;
    setObject(
        id: ID,
        obj: ioBroker.SettableObject,
        options: unknown,
        callback?: ioBroker.SetObjectCallback
    ): Promise<void>;
    /**
     * Creates or overwrites object in objectDB.
     *
     * This function can create or overwrite objects in objectDB for this adapter.
     * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
     * <b>common</b>, <b>native</b> and <b>type</b> attributes are mandatory and it will be checked.
     * Additionally type "state" requires <b>role</b>, <b>type</b> and <b>name</b>, e.g.:
     * <pre><code>{
     *     common: {
     *          name: 'object name',
     *          type: 'number', // string, boolean, object, mixed, array
     *          role: 'value'   // see https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole
     *     },
     *     native: {},
     *     type: 'state' // channel, device
     * }</code></pre>
     *
     * @param id object ID, that must be overwritten or created.
     * @param obj new object
     * @param [options] optional user context
     * @param [callback] return result
     *        <pre><code>
     *            function (err, obj) {
     *              // obj is {id: id}
     *              if (err) adapter.log.error('Cannot write object: ' + err);
     *            }
     *        </code></pre>
     */
    setObject(id: unknown, obj: unknown, options: unknown, callback?: unknown): Promise<void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Utils.assertsString(id, 'id');
        Utils.assertsObject(obj, 'obj');
        if (options !== null && options !== undefined) {
            Utils.assertsObject(options, 'options');
        }
        Utils.assertsOptionalCallback(callback, 'callback');

        return this._setObject({ id, obj: obj as ioBroker.SettableObject, options, callback });
    }

    private async _setObject(options: InternalSetObjectOptions) {
        if (!this._defaultObjs) {
            this._defaultObjs = (await import('./defaultObjs.js')).createDefaults();
        }

        if (!options.obj) {
            this._logger.error(`${this.namespaceLog} setObject: try to set null object for ${options.id}`);
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_EMPTY_OBJECT);
        }

        if (!tools.isObject(options.obj)) {
            this._logger.error(
                `${
                    this.namespaceLog
                } setForeignObject: type of object parameter expected to be an object, but "${typeof options.obj}" provided`
            );
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_NO_OBJECT);
        }

        if (options.obj.type !== 'meta') {
            try {
                this._utils.validateId(options.id, false, null);
            } catch (err) {
                this._logger.error(tools.appendStackTrace(`${this.namespaceLog} ${err.message}`));
                return;
            }
        }

        if (Object.prototype.hasOwnProperty.call(options.obj, 'type')) {
            if (!Object.prototype.hasOwnProperty.call(options.obj, 'native')) {
                this._logger.warn(
                    `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property native missing!`
                );
                options.obj.native = {};
            }
            // Check property 'common'
            if (!Object.prototype.hasOwnProperty.call(options.obj, 'common')) {
                this._logger.warn(
                    `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property common missing!`
                );
                // @ts-expect-error fix later on
                options.obj.common = {};
            } else if (options.obj.type === 'state') {
                // Try to extend the model for type='state'
                // Check property 'role' by 'state'
                if (
                    Object.prototype.hasOwnProperty.call(options.obj.common, 'role') &&
                    this._defaultObjs[options.obj.common.role]
                ) {
                    options.obj.common = extend(
                        true,
                        {},
                        this._defaultObjs[options.obj.common.role],
                        options.obj.common
                    );
                } else if (!Object.prototype.hasOwnProperty.call(options.obj.common, 'role')) {
                    this._logger.warn(
                        `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property common.role missing!`
                    );
                }
                if (!Object.prototype.hasOwnProperty.call(options.obj.common, 'type')) {
                    this._logger.warn(
                        `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property common.type missing!`
                    );
                }
                if (
                    Object.prototype.hasOwnProperty.call(options.obj.common, 'custom') &&
                    options.obj.common.custom !== null &&
                    !tools.isObject(options.obj.common.custom)
                ) {
                    this._logger.error(
                        `${this.namespaceLog} setObject ${options.id} (type=${
                            options.obj.type
                        }) property common.custom is of type ${typeof options.obj.common.custom}, expected object.`
                    );
                    return tools.maybeCallbackWithError(options.callback, 'common.custom needs to be an object');
                }
            } else {
                if (
                    Object.prototype.hasOwnProperty.call(options.obj.common, 'custom') &&
                    options.obj.common.custom !== null
                ) {
                    this._logger.warn(
                        `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property common.custom must not exist.`
                    );
                    delete options.obj.common.custom;
                }
            }

            if (!Object.prototype.hasOwnProperty.call(options.obj.common, 'name')) {
                options.obj.common.name = options.id;
                // it is more an unimportant warning as debug
                this._logger.debug(
                    `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property common.name missing, using id as name`
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
     * @param id of the object
     * @param obj The object to set
     * @param [options]
     * @param [callback]
     */
    private async _setObjectWithDefaultValue(
        id: string,
        obj: ioBroker.SettableObject,
        options?: Record<string, any> | null,
        callback?: ioBroker.SetObjectCallback
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback> | void> {
        if (!adapterObjects) {
            this._logger.info(`${this.namespaceLog} setObject not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            tools.validateGeneralObjectProperties(obj, false);
        } catch (e) {
            // todo: in the future we will not create this object
            this._logger.warn(`${this.namespaceLog} Object ${id} is invalid: ${e.message}`);
            this._logger.warn(
                `${this.namespaceLog} This object will not be created in future versions. Please report this to the developer.`
            );
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        try {
            const result = await adapterObjects.setObjectAsync(id, obj, options);
            if (obj.type === 'state' && obj.common && obj.common.def !== undefined && obj.common.def !== null) {
                const state = await this.getForeignStateAsync(id);
                // only set the def state, if state is non-existent
                if (!state || state.val === undefined) {
                    await this.setForeignStateAsync(id, {
                        val: obj.common.def,
                        q: QUALITY_SUBS_INITIAL,
                        ack: true
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
        callback: (objects: Record<string, ioBroker.AdapterScopedObject>) => void
    ): Promise<Record<string, ioBroker.AdapterScopedObject> | void>;

    /**
     * Get all states, channels and devices of this adapter.
     *
     * @alias getAdapterObjects
     * @memberof Adapter
     * @param {(objects: Record<string, ioBroker.Object>) => void} callback return result
     *        <pre><code>
     *            function (objects) {
     *                for (var id in objects) {
     *                    adapter.log.debug(id);
     *                }
     *            }
     *        </code></pre>
     */
    getAdapterObjects(callback: unknown): Promise<Record<string, ioBroker.AdapterScopedObject> | void> {
        Utils.assertsOptionalCallback(callback, 'callback');

        return this._getAdapterObjects({ callback });
    }

    private async _getAdapterObjects(
        options: InternalGetAdapterObjectsOptions
    ): Promise<Record<string, ioBroker.AdapterScopedObject> | void> {
        const ret: Record<string, ioBroker.AdapterScopedObject> = {};
        // Adds result rows to the return object
        const addRows = (rows: any[] | undefined) => {
            if (rows) {
                for (const { id, value } of rows) {
                    ret[id] = value;
                }
            }
        };

        if (!adapterObjects) {
            return tools.maybeCallback(options.callback, ret);
        }

        const params = {
            startkey: `${this.namespace}.`,
            endkey: `${this.namespace}.\u9999`,
            include_docs: true
        };

        try {
            const folders = await adapterObjects.getObjectViewAsync('system', 'folder', params);
            if (folders) {
                addRows(folders.rows);
            }
        } catch {
            /* ignore, we'll return what we get till now */
        }
        try {
            const devices = await adapterObjects.getObjectViewAsync('system', 'device', params);
            if (devices) {
                addRows(devices.rows);
            }
        } catch {
            /* ignore, we'll return what we get till now */
        }
        try {
            const channels = await adapterObjects.getObjectViewAsync('system', 'channel', params);
            if (channels) {
                addRows(channels.rows);
            }
        } catch {
            /* ignore, we'll return what we get till now */
        }
        try {
            const states = await adapterObjects.getObjectViewAsync('system', 'state', params);
            if (states) {
                addRows(states.rows);
            }
        } catch {
            /* ignore, we'll return what we get till now */
        }

        return tools.maybeCallback(options.callback, ret);
    }

    // public signatures
    extendObject(id: string, objPart: ioBroker.PartialObject, callback?: ioBroker.SetObjectCallback): void;
    extendObject(
        id: string,
        objPart: ioBroker.PartialObject,
        options: ioBroker.ExtendObjectOptions,
        callback?: ioBroker.SetObjectCallback
    ): void;

    /**
     * Extend some object and create it if it does not exist
     *
     * You can change or extend some object. E.g existing object is:
     * <pre><code>
     *     {
     *          common: {
     *              name: 'Adapter name',
     *              desc: 'Description'
     *          },
     *          type: 'state',
     *          native: {
     *              unused: 'text'
     *          }
     *     }
     * </code></pre>
     *
     * If following object will be passed as argument
     *
     * <pre><code>
     *     {
     *          common: {
     *              desc: 'New description',
     *              min: 0,
     *              max: 100
     *          },
     *          native: {
     *              unused: null
     *          }
     *     }
     * </code></pre>
     *
     * We will get as output:
     * <pre><code>
     *     {
     *          common: {
     *              desc: 'New description',
     *              min: 0,
     *              max: 100
     *          },
     *          type: 'state',
     *          native: {
     *          }
     *     }
     * </code></pre>
     *
     *
     * @alias extendObject
     * @memberof Adapter
     * @param {string} id object ID, that must be extended
     * @param {object} obj part that must be extended
     * @param {object} [options] optional user context
     * @param {ioBroker.ExtendObjectCallback} [callback] return result
     *        <pre><code>
     *            function (err, obj) {
     *                if (err) adapter.log.error(err);
     *                // obj is {"id": id}
     *            }
     *        </code></pre>
     */
    extendObject(id: unknown, obj: unknown, options: unknown, callback?: unknown) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Utils.assertsOptionalCallback(callback, 'callback');
        Utils.assertsString(id, 'id');

        if (!obj) {
            this._logger.error(`${this.namespaceLog} extendObject: try to extend null object for ${id}`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_EMPTY_OBJECT);
        }

        if (!tools.isObject(obj)) {
            this._logger.error(
                `${
                    this.namespaceLog
                } extendObject: type of object parameter expected to be an object, but ${typeof obj} provided`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_NO_OBJECT);
        }

        if (options !== null && options !== undefined) {
            Utils.assertsObject(options, 'options');
        }

        return this._extendObject({ id, obj: obj as ioBroker.SettableObject, options, callback });
    }

    private async _extendObject(options: InternalSetObjectOptions) {
        if (!adapterObjects) {
            this._logger.info(`${this.namespaceLog} extendObject not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            tools.validateGeneralObjectProperties(options.obj, true);
        } catch (e) {
            // todo: in the future we will not create this object
            this._logger.warn(`${this.namespaceLog} Object ${options.id} is invalid: ${e.message}`);
            this._logger.warn(
                `${this.namespaceLog} This object will not be created in future versions. Please report this to the developer.`
            );
        }

        try {
            this._utils.validateId(options.id, false, null);
        } catch (err) {
            return tools.maybeCallbackWithError(options.callback, err);
        }

        options.id = this._utils.fixId(options.id, false);

        const mId = options.id.replace(FORBIDDEN_CHARS, '_');
        if (mId !== options.id) {
            this._logger.warn(`${this.namespaceLog} Used invalid characters: ${options.id} changed to ${mId}`);
            options.id = mId;
        }

        if ('children' in options.obj || 'parent' in options.obj) {
            this._logger.warn(`${this.namespaceLog} Do not use parent or children for ${options.id}`);
        }

        // Read whole object
        let oldObj;
        try {
            oldObj = await adapterObjects.getObjectAsync(options.id, options.options);
        } catch (e) {
            return tools.maybeCallbackWithError(options.callback, e);
        }

        if (!adapterObjects) {
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

            return adapterObjects.setObject(options.id, options.obj, options.options, options.callback);
        } else {
            options.obj.from = options.obj.from || `system.adapter.${this.namespace}`;
            options.obj.user = options.obj.user || (options.options ? options.options.user : '') || SYSTEM_ADMIN_USER;
            options.obj.ts = options.obj.ts || Date.now();

            if (
                (options.obj.type && options.obj.type === 'state') ||
                (!options.obj.type && oldObj && oldObj.type === 'state')
            ) {
                if (
                    options.obj.common &&
                    Object.prototype.hasOwnProperty.call(options.obj.common, 'custom') &&
                    options.obj.common.custom !== null &&
                    !tools.isObject(options.obj.common.custom)
                ) {
                    this._logger.error(
                        `${this.namespaceLog} extendObject ${options.id} (type=${
                            options.obj.type
                        }) property common.custom is of type ${typeof options.obj.common.custom}, expected object.`
                    );
                    return tools.maybeCallbackWithError(options.callback, 'common.custom needs to be an object');
                }
            } else {
                if (
                    options.obj.common &&
                    Object.prototype.hasOwnProperty.call(options.obj.common, 'custom') &&
                    options.obj.common.custom !== null
                ) {
                    this._logger.warn(
                        `${this.namespaceLog} setObject ${options.id} (type=${options.obj.type}) property common.custom must not exist.`
                    );
                    delete options.obj.common.custom;
                }
            }

            if (!oldObj) {
                // if old object is not existing we behave like setObject
                return this.setForeignObject(options.id, options.obj, options.options, options.callback);
            }

            try {
                const cbObj = await adapterObjects.extendObjectAsync(options.id, options.obj, options);
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
                                q: QUALITY_SUBS_INITIAL,
                                ack: true
                            });
                        } catch (e) {
                            this._logger.info(
                                `${this.namespaceLog} Default value for state "${options.id}" could not be set: ${e.message}`
                            );
                        }
                    }
                }
                return tools.maybeCallbackWithError(options.callback, null, cbObj);
            } catch (e) {
                return tools.maybeCallbackWithError(options.callback, e);
            }
        }
    }

    // external signatures
    setForeignObject<T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        callback?: ioBroker.SetObjectCallback
    ): void;
    setForeignObject<T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options: unknown,
        callback?: ioBroker.SetObjectCallback
    ): void;

    /**
     * Same as {@link Adapter.setObject}, but for any object.
     *
     * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"
     *
     * @alias setForeignObject
     * @memberof Adapter
     * @param {string} id object ID, that must be overwritten or created.
     * @param {object} obj new object
     * @param {object} [options] optional user context
     * @param {ioBroker.SetObjectCallback} [callback] return result
     *        <pre><code>
     *            function (err, obj) {
     *              // obj is {id: id}
     *              if (err) adapter.log.error('Cannot write object: ' + err);
     *            }
     *        </code></pre>
     */
    setForeignObject(id: unknown, obj: unknown, options: unknown, callback?: unknown): void {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Utils.assertsOptionalCallback(callback, 'callback');
        Utils.assertsString(id, 'id');
        if (options !== null && options !== undefined) {
            Utils.assertsObject(options, 'options');
        }

        if (!obj) {
            this._logger.error(`${this.namespaceLog} setForeignObject: try to set null object for ${id}`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_EMPTY_OBJECT);
        }

        if (!tools.isObject(obj)) {
            this._logger.error(
                `${
                    this.namespaceLog
                } setForeignObject: type of object parameter expected to be an object, but ${typeof obj} provided`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_NO_OBJECT);
        }

        return this._setForeignObject({ id, obj: obj as ioBroker.SettableObject, options, callback });
    }

    private _setForeignObject(_options: InternalSetObjectOptions): void {
        const { options, callback, obj } = _options;
        let { id } = _options;

        obj.from = obj.from || 'system.adapter.' + this.namespace;
        obj.user = obj.user || (options ? options.user : '') || SYSTEM_ADMIN_USER;
        obj.ts = obj.ts || Date.now();

        if (id) {
            const mId = id.replace(FORBIDDEN_CHARS, '_');
            if (mId !== id) {
                this._logger.warn(`${this.namespaceLog} Used invalid characters: ${id} changed to ${mId}`);
                id = mId;
            }
        }

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
        callback?: ioBroker.SetObjectCallback
    ): void;
    extendForeignObject<T extends string>(
        id: T,
        objPart: ioBroker.PartialObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options: ioBroker.ExtendObjectOptions,
        callback?: ioBroker.SetObjectCallback
    ): void;

    /**
     * Same as {@link Adapter.extendObject}, but for any object.
     *
     * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"
     *
     * @alias extendForeignObject
     * @memberof Adapter
     * @param {string} id object ID, that must be extended
     * @param {object} obj part that must be extended
     * @param {object} [options] optional user context, or use attribute preserve e.g. {preserve: {common: ['name']}} to preserve common.name
     * @param {ioBroker.SetObjectCallback} [callback] return result
     *        <pre><code>
     *            function (err, obj) {
     *                // obj is {"id": id}
     *                if (err) adapter.log.error(err);
     *            }
     *        </code></pre>
     */
    extendForeignObject(id: unknown, obj: unknown, options: unknown, callback?: unknown): Promise<void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} extendForeignObject not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        const mId = id.replace(FORBIDDEN_CHARS, '_');
        if (mId !== id) {
            this._logger.warn(`${this.namespaceLog} Used invalid characters: ${id} changed to ${mId}`);
            id = mId;
        }

        Utils.assertsString(id, 'id');

        if (!obj) {
            this._logger.error(`${this.namespaceLog} extendForeignObject: try to set null object for ${id}`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_EMPTY_OBJECT);
        }

        Utils.assertsObject(obj, 'obj');
        if (options !== null && options !== undefined) {
            Utils.assertsObject(options, 'options');
        }
        Utils.assertsOptionalCallback(callback, 'callback');

        return this._extendForeignObjectAsync({ id, obj: obj as ioBroker.SettableObject, callback, options });
    }

    private async _extendForeignObjectAsync(_options: InternalSetObjectOptions): Promise<void> {
        const { id, callback, options } = _options;
        let { obj } = _options;

        // Read whole object
        let oldObj;
        try {
            oldObj = await adapterObjects.getObjectAsync(id, options);
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
            obj.user = obj.user || (options ? options.user : '') || SYSTEM_ADMIN_USER;
            obj.ts = obj.ts || Date.now();

            obj = extend(true, oldObj, obj);

            return adapterObjects.setObject(id, obj, options, callback);
        } else {
            obj.from = obj.from || `system.adapter.${this.namespace}`;
            obj.user = obj.user || (options ? options.user : '') || SYSTEM_ADMIN_USER;
            obj.ts = obj.ts || Date.now();

            if ((obj.type && obj.type === 'state') || (!obj.type && oldObj && oldObj.type === 'state')) {
                if (
                    obj.common &&
                    Object.prototype.hasOwnProperty.call(obj.common, 'custom') &&
                    obj.common.custom !== null &&
                    !tools.isObject(obj.common.custom)
                ) {
                    this._logger.error(
                        `${this.namespaceLog} extendObject ${id} (type=${
                            obj.type
                        }) property common.custom is of type ${typeof obj.common.custom}, expected object.`
                    );
                    return tools.maybeCallbackWithError(callback, 'common.custom needs to be an object');
                }
            } else {
                if (
                    obj.common &&
                    Object.prototype.hasOwnProperty.call(obj.common, 'custom') &&
                    obj.common.custom !== null
                ) {
                    this._logger.warn(
                        `${this.namespaceLog} setObject ${id} (type=${obj.type}) property common.custom must not exist.`
                    );
                    delete obj.common.custom;
                }
            }

            if (!oldObj) {
                // if old object is not existing we behave like setObject
                return this.setForeignObject(id, obj, options, callback);
            }

            try {
                const cbObj = await adapterObjects.extendObjectAsync(id, obj, options);
                if (cbObj.value.type === 'state') {
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
                                    q: QUALITY_SUBS_INITIAL,
                                    ack: true
                                });
                            } catch (e) {
                                this._logger.info(
                                    `${this.namespaceLog} Default value for state "${id}" could not be set: ${e.message}`
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
    }

    // external signature
    getObject(id: string, callback: ioBroker.GetObjectCallback): void;
    getObject(id: string, options: unknown, callback: ioBroker.GetObjectCallback): void;

    /**
     * Get object of this instance.
     *
     * It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.
     *
     * @alias getObject
     * @memberof Adapter
     * @param {string} id exactly object ID (without namespace)
     * @param {object} [options] optional user context
     * @param {ioBroker.GetObjectCallback} callback return result
     *        <pre><code>
     *            function (err, obj) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *            }
     *        </code></pre>
     */
    getObject(id: unknown, options: unknown, callback?: unknown) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(`${this.namespaceLog} getObject not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, false, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        adapterObjects.getObject(this._utils.fixId(id), options, callback);
    }

    getObjectView<Design extends string = string, Search extends string = string>(
        design: Design,
        search: Search,
        params: ioBroker.GetObjectViewParams | null | undefined,
        callback: ioBroker.GetObjectViewCallback<ioBroker.InferGetObjectViewItemType<Design, Search>>
    ): void;
    getObjectView<Design extends string = string, Search extends string = string>(
        design: Design,
        search: Search,
        params: ioBroker.GetObjectViewParams | null | undefined,
        options: unknown,
        callback: ioBroker.GetObjectViewCallback<ioBroker.InferGetObjectViewItemType<Design, Search>>
    ): void;

    /**
     * Read object view from DB.
     *
     * It is required, that ID consists namespace in startkey and endkey. E.g. {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}
     * to get all objects of the instance.
     *
     * @alias getObjectView
     * @memberof Adapter
     * @param {string} design name of the design
     * @param {string} search name of the view
     * @param {object} params object containing startkey: first id to include in result; endkey: last id to include in result
     * @param {object} options
     * @param {ioBroker.GetObjectViewCallback} callback return result
     *      <pre><code>
     *          function (err, doc) {
     *              if (doc && doc.rows) {
     *                   for (var i = 0; i < doc.rows.length; i++) {
     *                       var id  = doc.rows[i].id;
     *                        var obj = doc.rows[i].value;
     *                        console.log('Found ' + id + ': ' + JSON.stringify(obj));
     *                   }
     *                           if (!doc.rows.length) console.log('No objects found.');
     *               } else {
     *                   console.log('No objects found: ' + err);
     *               }
     *           }
     *           </code></pre>
     */
    getObjectView(design: unknown, search: unknown, params: unknown, options: unknown, callback?: unknown): void {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} getObjectView not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        params = params || {};
        Utils.assertsString(design, 'design');
        Utils.assertsString(search, 'search');
        Utils.assertsObject(params, 'params');
        Utils.assertsOptionalCallback(callback, 'callback');

        return this._getObjectView({ design, search, params, options, callback });
    }

    private _getObjectView(_options: InternalGetObjectViewOptions) {
        const { design, search, params, options, callback } = _options;
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

        return adapterObjects.getObjectView(design, search, params, options, callback);
    }

    // external signatures
    getObjectList(params: ioBroker.GetObjectListParams | null, callback: ioBroker.GetObjectListCallback): void;
    getObjectList(
        params: ioBroker.GetObjectListParams | null,
        options: { sorted?: boolean } | Record<string, any>,
        callback: ioBroker.GetObjectListCallback
    ): void;

    /**
     * Read object list from DB.
     *
     * It is required, that ID consists namespace in startkey and endkey. E.g. {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}
     * to get all objects of the instance.
     *
     * @alias getObjectList
     * @memberof Adapter
     *
     * @param {object} params
     * @param {object} options
     * @param {ioBroker.GetObjectListCallback} callback
     *      <pre><code>
     *          function (err, res) {
     *              if (res && res.rows) {
     *                   for (var i = 0; i < res.rows.length; i++) {
     *                       var id  = res.rows[i].id;
     *                       var obj = res.rows[i].value;
     *                       console.log('Found ' + id + ': ' + JSON.stringify(obj));
     *                   }
     *                   if (!res.rows.length) console.log('No objects found.');
     *              } else {
     *                  console.log('No objects found: ' + err);
     *              }
     *          }
     *       </code></pre>
     */
    getObjectList(params: unknown, options: unknown, callback?: unknown) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} getObjectList not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.getObjectList(params, options, callback);
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
     * <pre><code>
     *      adapter.getEnums(function (err, enums, requestEnum) {
     *        // All enums
     *        if (err) adapter.log.error('Cannot get object: ' + err);
     *        for (var e in enums) {
     *           adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
     *        }
     *      });
     * </code></pre>
     *
     * @alias getEnum
     * @memberof Adapter
     * @param {string} _enum enum name, e.g. 'rooms', 'function' or '' (all enums)
     * @param {object} [options] optional user context
     * @param {ioBroker.GetEnumCallback} callback return result
     *        <pre><code>
     *            function (err, enums, requestEnum) {
     *              // requestEnum is _enum
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *              for (var e in enums) {
     *                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
     *              }
     *            }
     *        </code></pre>
     */
    getEnum(_enum: unknown, options?: unknown, callback?: unknown) {
        if (typeof _enum === 'function') {
            callback = _enum;
            options = null;
            _enum = '';
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Utils.assertsString(_enum, '_enum');
        Utils.assertsOptionalCallback(callback, 'callback');

        return this._getEnum({ _enum, options, callback });
    }

    private _getEnum(_options: InternalGetEnumOptions) {
        const { options, callback } = _options;
        let { _enum } = _options;

        if (!adapterObjects) {
            this._logger.info(`${this.namespaceLog} getEnum not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!_enum.startsWith('enum.')) {
            _enum = `enum.${_enum}`;
        }
        const result: Record<string, ioBroker.Enum> = {};

        adapterObjects.getObjectView(
            'system',
            'enum',
            {
                startkey: `${_enum}.`,
                endkey: `${_enum}.\u9999`
            },
            options,
            (err, res) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }
                if (res && res.rows) {
                    for (const row of res.rows) {
                        result[row.id] = row.value;
                    }
                }
                return tools.maybeCallbackWithError(callback, err, result, _enum);
            }
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
     * @alias getEnums
     * @memberof Adapter
     * @param {string|array} _enumList enum name or names, e.g. ['rooms', 'function']
     * @param {object} [options] optional user context
     * @param {ioBroker.GetEnumsCallback} callback return result
     *        <pre><code>
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
     *        </code></pre>
     */
    getEnums(_enumList: unknown, options?: unknown, callback?: unknown): Promise<void> {
        if (typeof _enumList === 'function') {
            callback = _enumList;
            _enumList = null;
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Utils.assertsOptionalCallback(callback, 'callback');

        return this._getEnums({ _enumList: _enumList as ioBroker.EnumList, options, callback });
    }

    private async _getEnums(_options: InternalGetEnumsOptions): Promise<void> {
        const { options, callback } = _options;
        let { _enumList } = _options;

        if (!adapterObjects) {
            this._logger.info(`${this.namespaceLog} getEnums not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        const _enums: {
            [groupName: string]: Record<string, ioBroker.Enum>;
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
                        })
                    )
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
            adapterObjects.getObjectView(
                'system',
                'enum',
                {
                    startkey: 'enum.',
                    endkey: 'enum.\u9999'
                },
                options,
                (err, res) => {
                    // be aware, that res.rows[x].id is the name of enum!
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                    const result: {
                        [groupName: string]: Record<string, ioBroker.Enum>;
                    } = {};
                    if (res && res.rows) {
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
                }
            );
        }
    }

    // external signatures
    getForeignObjects(pattern: string, callback: ioBroker.GetObjectsCallback): void;
    getForeignObjects(pattern: string, options: unknown, callback: ioBroker.GetObjectsCallback): void;
    getForeignObjects<T extends ioBroker.ObjectType>(
        pattern: string,
        type: T,
        callback: ioBroker.GetObjectsCallbackTyped<T>
    ): void;
    getForeignObjects<T extends ioBroker.ObjectType>(
        pattern: string,
        type: T,
        enums: ioBroker.EnumList,
        callback: ioBroker.GetObjectsCallbackTyped<T>
    ): void;
    getForeignObjects<T extends ioBroker.ObjectType>(
        pattern: string,
        type: T,
        options: unknown,
        callback: ioBroker.GetObjectsCallbackTyped<T>
    ): void;
    getForeignObjects<T extends ioBroker.ObjectType>(
        pattern: string,
        type: T,
        enums: ioBroker.EnumList | null,
        options: unknown,
        callback: ioBroker.GetObjectsCallbackTyped<T>
    ): void;
    /**
     * Get objects by pattern, by specific type and resolve their enums.
     *
     * Get all objects in the system of specified type. E.g.:
     *
     *        <pre><code>
     *            adapter.getForeignObjects('hm-rega.0.*', 'state', ['rooms', 'functions'], function (err, objs) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *              // objs look like:
     *              // {
     *              //    "hm-rega.0.ABC0000.1.STATE": {
     *              //        common: {...},
     *              //        native: {},
     *              //        type: 'state',
     *              //        enums: {
     *              //           'enums.rooms.livingroom': 'Living room',
     *              //           'enums.functions.light': 'Light'
     *              //       }
     *              //    },
     *              //    "hm-rega.0.ABC0000.2.STATE": {
     *              //        common: {...},
     *              //        native: {},
     *              //        type: 'state',
     *              //        enums: {
     *              //           'enums.rooms.sleepingroom': 'Sleeping room',
     *              //           'enums.functions.window': 'Windows'
     *              //       }
     *              //    }
     *            }
     *        </code></pre>
     *
     * @alias getForeignObjects
     * @memberof Adapter
     * @param {string} pattern object ID/wildchars
     * @param {string} type type of object: 'state', 'channel' or 'device'. Default - 'state'
     * @param {string|string[]} enums object ID, that must be overwritten or created.
     * @param {object} [options] optional user context
     * @param {ioBroker.GetObjectsCallback} callback return result
     *        <pre><code>
     *            function (err, obj) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *            }
     *        </code></pre>
     */
    getForeignObjects(
        pattern: unknown,
        type: unknown,
        enums?: unknown,
        options?: unknown,
        callback?: unknown
    ): void | Promise<void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (typeof enums === 'function') {
            callback = enums;
            enums = null;
        }
        if (typeof type === 'function') {
            callback = type;
            type = null;
        }
        if (typeof type === 'object') {
            options = type;
            type = null;
        }
        if (typeof enums === 'object' && !Array.isArray(enums)) {
            options = enums;
            enums = null;
        }

        Utils.assertsOptionalCallback(callback, 'callback');

        if (typeof pattern !== 'string') {
            return tools.maybeCallbackWithError(
                callback,
                new Error(`Expected pattern to be of type "string", got "${typeof pattern}"`)
            );
        }

        if (type !== undefined) {
            Utils.assertsString(type, 'type');
        }

        return this._getForeignObjects({
            pattern,
            type,
            enums: enums as ioBroker.EnumList | undefined | null,
            options,
            callback
        });
    }

    private _getForeignObjects(options: InternalGetObjectsOptions) {
        let params = {};
        if (options.pattern && options.pattern !== '*') {
            params = {
                startkey: options.pattern.replace(/\*/g, ''),
                endkey: options.pattern.replace(/\*/g, '\u9999')
            };
        }

        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} getForeignObjects not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.getObjectView('system', options.type || 'state', params, options, (err, res) => {
            if (err) {
                return tools.maybeCallbackWithError(options.callback, err);
            }

            // don't forget, that enums returns names in row[x].id and not IDs, you can find id in rows[x].value._id
            // @ts-expect-error adjust type checks or code here
            this.getEnums(options.enums, null, (err, _enums) => {
                const list: Record<string, any> = {};
                if (res && res.rows) {
                    for (let i = 0; i < res.rows.length; i++) {
                        if (!res.rows[i].value) {
                            // it is more an unimportant warning as debug
                            this._logger.debug(
                                `${this.namespaceLog} getEnums(${JSON.stringify(
                                    options.enums
                                )}) returned an enum without a value at index ${i}, obj - ${JSON.stringify(
                                    res.rows[i]
                                )}`
                            );
                            continue;
                        }
                        const id: string = res.rows[i].value._id;
                        list[id] = res.rows[i].value;
                        if (_enums && id) {
                            // get device or channel of this state and check it too
                            const parts = id.split('.');
                            parts.splice(parts.length - 1, 1);
                            const channel = parts.join('.');
                            parts.splice(parts.length - 1, 1);
                            const device = parts.join('.');

                            list[id].enums = {};
                            for (const es of Object.keys(_enums)) {
                                for (const e of Object.keys(_enums[es])) {
                                    if (!_enums[es][e] || !_enums[es][e].common || !_enums[es][e].common.members) {
                                        continue;
                                    }
                                    if (
                                        _enums[es][e].common.members.includes(id) ||
                                        _enums[es][e].common.members.includes(channel) ||
                                        _enums[es][e].common.members.includes(device)
                                    ) {
                                        list[id].enums[e] = _enums[es][e].common.name;
                                    }
                                }
                            }
                        }
                    }
                }
                return tools.maybeCallbackWithError(options.callback, null, list);
            });
        });
    }

    // external signature
    findForeignObject(idOrName: string, type: string, callback: ioBroker.FindObjectCallback): void;
    findForeignObject(idOrName: string, type: string, options: unknown, callback: ioBroker.FindObjectCallback): void;

    /**
     * Find any object by name or ID.
     *
     * Find object by the exact name or ID.
     *
     * @alias findForeignObject
     * @memberof Adapter
     * @param {string} id exactly object ID (without namespace)
     * @param {string} type optional common.type of state: 'number', 'string', 'boolean', 'file', ...
     * @param {object} options optional user context
     * @param {ioBroker.FindObjectCallback} callback return result
     *        <pre><code>
     *            adapter.findForeignObject('Some name', function (err, id, name) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *              adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');
     *            }
     *        </code></pre>
     */
    findForeignObject(id: unknown, type: unknown, options: unknown, callback?: unknown) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof type === 'function') {
            callback = type;
            type = null;
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} findForeignObject not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        adapterObjects.findObject(id, type, options, callback);
    }

    // external signatures
    getForeignObject<T extends string>(id: T, callback: ioBroker.GetObjectCallback<T>): void | Promise<void>;
    getForeignObject<T extends string>(
        id: T,
        options: unknown,
        callback: ioBroker.GetObjectCallback<T>
    ): void | Promise<void>;

    /**
     * Get any object.
     *
     * ID must be specified with namespace.
     *
     * @alias getForeignObject
     * @memberof Adapter
     * @param {string} id exactly object ID (with namespace)
     * @param {object} [options] optional user context
     * @param {ioBroker.GetObjectCallback} callback return result
     *        <pre><code>
     *            function (err, obj) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *            }
     *        </code></pre>
     */
    getForeignObject(id: unknown, options: unknown, callback?: unknown): void | Promise<void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Utils.assertsOptionalCallback(callback, 'callback');

        try {
            this._utils.validateId(id, true, options);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        return this._getForeignObject({ id, options, callback });
    }

    private _getForeignObject(options: InternalGetObjectOptions): void | Promise<void> {
        if (!adapterObjects) {
            this._logger.info(
                this.namespaceLog + ' ' + 'getForeignObject not processed because Objects database not connected'
            );
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.getObject(options.id, options, (err, obj) => {
            const adapterName = this.namespace.split('.')[0];
            // remove protectedNative if not admin or own adapter
            if (
                obj &&
                obj.protectedNative &&
                obj.protectedNative.length &&
                obj._id &&
                obj._id.startsWith('system.adapter.') &&
                adapterName !== 'admin' &&
                adapterName !== obj._id.split('.')[2]
            ) {
                for (const attr of obj.protectedNative) {
                    delete obj.native[attr];
                } // endFor
            } // endIf

            return tools.maybeCallbackWithError(options.callback, err, obj);
        });
    }

    delObject(id: string, callback?: ioBroker.ErrorCallback): void;
    delObject(id: string, options: ioBroker.DelObjectOptions, callback?: ioBroker.ErrorCallback): void;

    /**
     * Delete an object of this instance.
     *
     * It is not required to provice the adapter namespace, because it will automatically be added.
     * E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.
     *
     * The corresponding state will be deleted too if the object has type "state".
     *
     * @alias delObject
     * @memberof Adapter
     * @param {string} id exactly object ID (without namespace)
     * @param {object} [options] optional user context. E.g. recursive option could be true
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete object: ' + err);
     *            }
     *        </code></pre>
     */
    delObject(id: unknown, options: unknown, callback?: unknown) {
        Utils.assertsString(id, 'id');

        // delObject does the same as delForeignObject, but fixes the ID first
        id = this._utils.fixId(id);

        // @ts-expect-error we have ensured that it is string
        this.delForeignObject(id, options, callback);
    }

    private _deleteObjects(
        tasks: { id: string; [other: string]: any }[],
        options: Record<string, any>,
        cb?: () => void
    ) {
        if (!tasks || !tasks.length) {
            return tools.maybeCallback(cb);
        } else {
            const task = tasks.shift();
            adapterObjects.delObject(task!.id, options, async err => {
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
                    await tools.removeIdFromAllEnums(adapterObjects, task!.id, this.enums);
                } catch (e) {
                    this._logger.warn(`${this.namespaceLog} Could not remove ${task!.id} from enums: ${e.message}`);
                }
                setImmediate(() => this._deleteObjects(tasks, options, cb));
            });
        }
    }

    delForeignObject(id: string, callback?: ioBroker.ErrorCallback): void;
    delForeignObject(id: string, options: ioBroker.DelObjectOptions, callback?: ioBroker.ErrorCallback): void;

    /**
     * Delete any object.
     *
     * The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".
     *
     * @alias delForeignObject
     * @memberof Adapter
     * @param {string} id exactly object ID (with namespace)
     * @param {object} [options] optional user context or {recursive:true} to delete all underlying objects
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete object: ' + err);
     *            }
     *        </code></pre>
     */
    delForeignObject(id: unknown, options: unknown, callback?: unknown) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} delForeignObject not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        if (options !== null && options !== undefined) {
            Utils.assertsObject(options, 'options');
        }

        Utils.assertsOptionalCallback(callback, 'callback');

        return this._delForeignObject({ id, options, callback });
    }

    private _delForeignObject(_options: InternalDelObjectOptions) {
        const { id, options, callback } = _options;

        // If recursive deletion of all underlying objects, including id
        if (options && options.recursive) {
            // read object itself
            adapterObjects.getObject(id, options, (err, obj) => {
                const tasks =
                    obj && (!obj.common || !obj.common.dontDelete) ? [{ id, state: obj.type === 'state' }] : [];

                const selector = { startkey: `${id}.`, endkey: `${id}.\u9999` };
                // read all underlying states
                adapterObjects.getObjectList(selector, options, (err, res) => {
                    res &&
                        res.rows &&
                        res.rows.forEach(
                            (item: ioBroker.GetObjectListItem) =>
                                !tasks.find(task => task.id === item.id) &&
                                (!item.value || !item.value.common || !item.value.common.dontDelete) && // exclude objects with dontDelete flag
                                tasks.push({ id: item.id, state: item.value && item.value.type === 'state' })
                        );
                    this._deleteObjects(tasks, options, callback);
                });
            });
        } else {
            adapterObjects.getObject(id, options, async (err, obj) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else if (obj) {
                    // do not allow deletion of objects with dontDelete flag
                    if (obj.common && obj.common.dontDelete) {
                        return tools.maybeCallbackWithError(callback, new Error('not deletable'));
                    }

                    try {
                        await adapterObjects.delObject(obj._id, options);
                    } catch (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    }
                    if (obj.type === 'state') {
                        try {
                            if (obj.binary) {
                                await this.delBinaryStateAsync(id, options);
                            } else {
                                await this.delForeignStateAsync(id, options);
                            }
                        } catch {
                            // Ignore
                        }
                    }
                    try {
                        await tools.removeIdFromAllEnums(adapterObjects, id, this.enums);
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, e);
                    }
                }
                return tools.maybeCallback(callback);
            });
        }
    }

    // external signatures
    subscribeObjects(pattern: string, callback?: ioBroker.ErrorCallback): void;
    subscribeObjects(pattern: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Subscribe for the changes of objects in this instance.
     *
     * @alias subscribeObjects
     * @memberof Adapter
     * @param {string} pattern pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] optional returns result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot subscribe object: ' + err);
     *            }
     *        </code></pre>
     */
    subscribeObjects(pattern: unknown, options: unknown, callback?: unknown) {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} subscribeObjects not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        Utils.assertsString(pattern, 'pattern');

        if (pattern === '*') {
            adapterObjects.subscribeUser(`${this.namespace}.*`, options, callback);
        } else {
            pattern = this._utils.fixId(pattern, true);
            adapterObjects.subscribeUser(pattern, options, callback);
        }
    }

    unsubscribeObjects(pattern: string, callback?: ioBroker.ErrorCallback): void;
    unsubscribeObjects(pattern: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Unsubscribe on the changes of objects in this instance.
     *
     * @alias unsubscribeObjects
     * @memberof Adapter
     * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] optional returns result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
     *            }
     *        </code></pre>
     */
    unsubscribeObjects(pattern: unknown, options: unknown, callback?: unknown) {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} unsubscribeObjects not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        Utils.assertsString(pattern, 'pattern');

        if (pattern === '*') {
            adapterObjects.unsubscribeUser(`${this.namespace}.*`, options, callback);
        } else {
            pattern = this._utils.fixId(pattern, true);
            adapterObjects.unsubscribeUser(pattern, options, callback);
        }
    }

    // external signatures
    subscribeForeignObjects(pattern: string, callback?: ioBroker.ErrorCallback): void;
    subscribeForeignObjects(pattern: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Subscribe for the changes of objects in any instance.
     *
     * @alias subscribeForeignObjects
     * @memberof Adapter
     * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] optional returns result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot subscribe object: ' + err);
     *            }
     *        </code></pre>
     */
    subscribeForeignObjects(pattern: unknown, options: unknown, callback?: unknown) {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} subscribeForeignObjects not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.subscribeUser(pattern, options, callback);
    }

    // external signatures
    unsubscribeForeignObjects(pattern: string, callback?: ioBroker.ErrorCallback): void;
    unsubscribeForeignObjects(pattern: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Unsubscribe for the patterns on all objects.
     *
     * @alias unsubscribeForeignObjects
     * @memberof Adapter
     * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] optional returns result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
     *            }
     *        </code></pre>
     */
    unsubscribeForeignObjects(pattern: unknown, options: unknown, callback?: unknown) {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }
        if (!pattern) {
            pattern = '*';
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} unsubscribeForeignObjects not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.unsubscribeUser(pattern, options, callback);
    }

    // external signatures
    subscribeForeignFiles(pattern: string, callback?: ioBroker.ErrorCallback): void;
    subscribeForeignFiles(pattern: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Subscribe for the changes of files in specific instance.
     * This is async function!
     * @alias subscribeForeignFiles
     * @memberof Adapter
     * @param {string} id adapter ID like 'vis.0' or 'vis.admin'
     * @param {string} pattern pattern like 'channel.*' or '*' (all files) - without namespaces. You can use array of patterns
     * @param {object} [options] optional user context
     * @returns {Promise<>}
     */
    subscribeForeignFiles(id: unknown, pattern: unknown, options?: unknown) {
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} subscribeForeignFiles not processed because Objects database not connected`
            );
            return Promise.reject(tools.ERRORS.ERROR_DB_CLOSED);
        }

        return adapterObjects.subscribeUserFile(id, pattern, options);
    }

    // external signatures
    unsubscribeForeignFiles(pattern: string, callback?: ioBroker.ErrorCallback): void;
    unsubscribeForeignFiles(pattern: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Unsubscribe for the changes of files on specific instance.
     * This is async function!
     * @alias unsubscribeForeignFiles
     * @memberof Adapter
     * @param {string} id adapter ID like 'vis.0' or 'vis.admin'
     * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
     * @param {object} [options] optional user context
     * @returns {Promise<>}
     */
    unsubscribeForeignFiles(id: unknown, pattern: unknown, options?: unknown) {
        if (!pattern) {
            pattern = '*';
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} unsubscribeForeignFiles not processed because Objects database not connected`
            );
            return Promise.reject(tools.ERRORS.ERROR_DB_CLOSED);
        }

        return adapterObjects.unsubscribeUserFile(id, pattern, options);
    }

    // external signatures
    setObjectNotExists(
        id: string,
        obj: ioBroker.SettableObject,
        callback?: ioBroker.SetObjectCallback
    ): Promise<void | ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback>> | void;
    setObjectNotExists(
        id: string,
        obj: ioBroker.SettableObject,
        options: unknown,
        callback?: ioBroker.SetObjectCallback
    ): Promise<void | ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback>> | void;
    /**
     * Same as {@link Adapter.setObject}, but with check if the object exists.
     *
     * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
     * New object will be created only if no object exists with such ID.
     *
     * @alias setObjectNotExists
     * @memberof Adapter
     * @param {string} id object ID, that must be overwritten or created.
     * @param {object} obj new object
     * @param {object} [options] optional user context
     * @param {ioBroker.SetObjectCallback} [callback] return result
     *        <pre><code>
     *            function (err, obj) {
     *              // obj is {id: id}
     *              if (err) adapter.log.error('Cannot write object: ' + err);
     *            }
     *        </code></pre>
     * @returns {Promise<{id: string}>}
     */
    setObjectNotExists(
        id: unknown,
        obj: unknown,
        options?: unknown,
        callback?: unknown
    ): Promise<void | ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback>> | void {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Utils.assertsOptionalCallback(callback, 'callback');
        if (options !== undefined && options !== null) {
            Utils.assertsObject(options, 'options');
        }

        Utils.assertsObject(obj, 'obj');

        try {
            this._utils.validateId(id, false, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        id = this._utils.fixId(id);

        return this._setObjectNotExists({ id, obj, options, callback });
    }

    private async _setObjectNotExists(
        options: InternalSetObjectOptions
    ): Promise<void | ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback>> {
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} setObjectNotExists not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(options.callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if ('children' in options.obj || 'parent' in options.obj) {
            this._logger.warn(`${this.namespaceLog} Do not use parent or children for ${options.id}`);
        }

        // check if object already exists
        let objExists;
        try {
            objExists = await adapterObjects.objectExists(options.id, options);
        } catch (e) {
            return tools.maybeCallbackWithError(
                options.callback,
                `Could not check object existence of ${options.id}: ${e.message}`
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
        } else {
            return tools.maybeCallbackWithError(options.callback, null);
        }
    }

    // external signatures
    setForeignObjectNotExists<T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        callback?: ioBroker.SetObjectCallback
    ): void;
    setForeignObjectNotExists<T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options: unknown,
        callback?: ioBroker.SetObjectCallback
    ): void;

    /**
     * Same as {@link Adapter.setForeignObject}, but with check if the object exists.
     *
     * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE".
     * New object will be created only if no object exists with such ID.
     *
     * @alias setForeignObjectNotExists
     * @memberof Adapter
     * @param {string} id object ID, that must be overwritten or created.
     * @param {object} obj new object
     * @param {object} [options] optional user context
     * @param {ioBroker.SetObjectCallback} [callback] return result
     *        <pre><code>
     *            function (err, obj) {
     *              // obj is {id: id}
     *              if (err) adapter.log.error('Cannot write object: ' + err);
     *            }
     *        </code></pre>
     * @returns {Promise<{id: string}>}
     */
    setForeignObjectNotExists(
        id: unknown,
        obj: unknown,
        options: unknown,
        callback?: unknown
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback> | void> {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Utils.assertsString(id, 'id');
        Utils.assertsObject(obj, 'obj');
        if (options !== null && options !== undefined) {
            Utils.assertsObject(options, 'options');
        }

        Utils.assertsOptionalCallback(callback, 'callback');

        return this._setForeignObjectNotExists({ id, obj: obj as ioBroker.SettableObject, options, callback });
    }

    private async _setForeignObjectNotExists(
        _options: InternalSetObjectOptions
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.SetObjectCallback> | void> {
        const { id, obj, options, callback } = _options;

        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} setForeignObjectNotExists not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        // check if object exists
        let objExists;
        try {
            objExists = await adapterObjects.objectExists(id, options);
        } catch (e) {
            return tools.maybeCallbackWithError(callback, `Could not check object existence of ${id}: ${e.message}`);
        }

        if (objExists === false) {
            if (!obj.from) {
                obj.from = `system.adapter.${this.namespace}`;
            }
            if (!obj.user) {
                obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
            }
            if (!obj.ts) {
                obj.ts = Date.now();
            }

            return this._setObjectWithDefaultValue(id, obj, null, callback);
        } else {
            return tools.maybeCallbackWithError(callback, null);
        }
    }

    private _DCS2ID(device: string, channel: string, stateOrPoint?: boolean | string): ID {
        let id = '';
        if (device) {
            id += device;
        }
        if (channel) {
            id += (id ? '.' : '') + channel;
        }

        if (stateOrPoint !== true && stateOrPoint !== false) {
            if (stateOrPoint) {
                id += (id ? '.' : '') + stateOrPoint;
            }
        } else if (stateOrPoint === true && id) {
            id += '.';
        }
        return id as ID;
    }

    // external signatures
    createDevice(deviceName: string, callback?: ioBroker.SetObjectCallback): void;
    createDevice(
        deviceName: string,
        common: Partial<ioBroker.DeviceCommon>,
        callback?: ioBroker.SetObjectCallback
    ): void;
    createDevice(
        deviceName: string,
        common: Partial<ioBroker.DeviceCommon>,
        native: Record<string, any>,
        callback?: ioBroker.SetObjectCallback
    ): void;
    createDevice(
        deviceName: string,
        common: Partial<ioBroker.DeviceCommon>,
        native: Record<string, any>,
        options: unknown,
        callback?: ioBroker.SetObjectCallback
    ): void;

    createDevice(deviceName: unknown, common: unknown, _native?: unknown, options?: unknown, callback?: unknown) {
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

        Utils.assertsOptionalCallback(callback, 'callback');
        Utils.assertsString(deviceName, 'deviceName');
        if (_native !== undefined && _native !== null) {
            Utils.assertsObject(_native, '_native');
        }

        return this._createDevice({
            common: common as Partial<ioBroker.DeviceCommon>,
            deviceName,
            _native,
            callback,
            options
        });
    }

    private _createDevice(_options: InternalCreateDeviceOptions) {
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
                native: _native
            } as ioBroker.SettableDeviceObject,
            options,
            callback
        );
    }

    createChannel(parentDevice: string, channelName: string, callback?: ioBroker.SetObjectCallback): void;
    createChannel(
        parentDevice: string,
        channelName: string,
        roleOrCommon: string | Partial<ioBroker.ChannelCommon>,
        callback?: ioBroker.SetObjectCallback
    ): void;
    createChannel(
        parentDevice: string,
        channelName: string,
        roleOrCommon: string | Partial<ioBroker.ChannelCommon>,
        native: Record<string, any>,
        callback?: ioBroker.SetObjectCallback
    ): void;
    createChannel(
        parentDevice: string,
        channelName: string,
        roleOrCommon: string | Partial<ioBroker.ChannelCommon>,
        native: Record<string, any>,
        options: unknown,
        callback?: ioBroker.SetObjectCallback
    ): void;

    // name of channel must be in format "channel"
    createChannel(
        parentDevice: unknown,
        channelName: unknown,
        roleOrCommon?: unknown,
        _native?: unknown,
        options?: unknown,
        callback?: unknown
    ) {
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
                role: roleOrCommon
            };
        } else if (tools.isObject(roleOrCommon)) {
            // @ts-expect-error should be ok
            common = roleOrCommon;
        }

        Utils.assertsObject(common, 'common');
        Utils.assertsString(channelName, 'channelName');
        Utils.assertsString(parentDevice, 'parentDevice');
        Utils.assertsOptionalCallback(callback, 'callback');

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
            native: _native
        } as const;

        this.setObjectNotExists(channelName as string, obj as any, options, callback);
    }

    createState(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        callback?: ioBroker.SetObjectCallback
    ): void;
    createState(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon: string | Partial<ioBroker.StateCommon>,
        callback?: ioBroker.SetObjectCallback
    ): void;
    createState(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon: string | Partial<ioBroker.StateCommon>,
        native: Record<string, any>,
        callback?: ioBroker.SetObjectCallback
    ): void;
    createState(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon: string | Partial<ioBroker.StateCommon>,
        native: Record<string, any>,
        options: unknown,
        callback?: ioBroker.SetObjectCallback
    ): void;
    createState(
        parentDevice: unknown,
        parentChannel: unknown,
        stateName: unknown,
        roleOrCommon: unknown,
        _native?: unknown,
        options?: unknown,
        callback?: unknown
    ) {
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

        let common: Partial<ioBroker.StateCommon> = {};
        if (typeof roleOrCommon === 'string') {
            common = {
                read: true,
                write: false,
                name: '',
                role: roleOrCommon
            };
        } else if (tools.isObject(roleOrCommon)) {
            // @ts-expect-error should be okay
            common = roleOrCommon;
        }

        Utils.assertsObject(common, 'common');
        Utils.assertsString(stateName, 'stateName');
        Utils.assertsString(parentDevice, 'parentDevice');
        Utils.assertsString(parentChannel, 'parentChannel');
        Utils.assertsOptionalCallback(callback, 'callback');

        common.name = common.name || stateName;
        _native = _native || {};

        common.read = common.read === undefined ? true : common.read;
        common.write = common.write === undefined ? false : common.write;

        if (!common.role) {
            this._logger.error(
                `${this.namespaceLog} Try to create state ${
                    parentDevice ? `${parentDevice}.` : ''
                }${parentChannel}.${stateName} without role`
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
            device: parentDevice as string,
            channel: parentChannel as string,
            state: stateName as string
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
                    } else {
                        common.min = min;
                    }
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
                    } else {
                        common.max = max;
                    }
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
                    } else {
                        common.def = def;
                    }
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
                native: _native as any
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
            }
        );
    }

    deleteDevice(deviceName: string, callback?: ioBroker.ErrorCallback): void;
    deleteDevice(deviceName: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Delete device with all its channels and states.
     *
     * @alias deleteDevice
     * @memberof Adapter
     * @param {string} deviceName is the part of ID like: adapter.instance.<deviceName>
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete device: ' + err);
     *            }
     *        </code></pre>
     */
    async deleteDevice(deviceName, options, callback?) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
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
        callback?: ioBroker.ErrorCallback
    ): void;
    addChannelToEnum(
        enumName: string,
        addTo: string,
        parentDevice: string,
        channelName: string,
        options: unknown,
        callback?: ioBroker.ErrorCallback
    ): void;

    addChannelToEnum(enumName, addTo, parentDevice, channelName, options, callback?) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} addChannelToEnum not processed because Objects database not connected`
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
            adapterObjects.getObject(addTo, options, (err, obj) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else if (obj) {
                    if (!obj.common.members.includes(objId)) {
                        obj.common.members.push(objId);
                        obj.from = 'system.adapter.' + this.namespace;
                        obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                        obj.ts = Date.now();

                        adapterObjects.setObject(obj._id, obj, options, callback);
                    } else {
                        return tools.maybeCallback(callback);
                    }
                }
            });
        } else {
            if (enumName.startsWith('enum.')) {
                enumName = enumName.substring(5);
            }

            adapterObjects.getObject(`enum.${enumName}.${addTo}`, options, (err, obj) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }

                if (obj) {
                    if (!obj.common.members.includes(objId)) {
                        obj.common.members.push(objId);

                        obj.from = 'system.adapter.' + this.namespace;
                        obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                        obj.ts = Date.now();

                        adapterObjects.setObject(obj._id, obj, options, callback);
                    } else {
                        return tools.maybeCallback(callback);
                    }
                } else {
                    // Create enum
                    adapterObjects.setObject(
                        `enum.${enumName}.${addTo}`,
                        {
                            common: {
                                name: addTo,
                                members: [objId]
                            },
                            from: 'system.adapter.' + this.namespace,
                            ts: Date.now(),
                            type: 'enum'
                        },
                        options,
                        callback
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
        callback?: ioBroker.ErrorCallback
    ): void;
    deleteChannelFromEnum(
        enumName: string,
        parentDevice: string,
        channelName: string,
        options: unknown,
        callback?: ioBroker.ErrorCallback
    ): void;

    deleteChannelFromEnum(enumName, parentDevice, channelName, options, callback?) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} deleteChannelFromEnum not processed because Objects database not connected`
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

        const objId = this.namespace + '.' + this._DCS2ID(parentDevice, channelName);

        if (enumName) {
            enumName = `enum.${enumName}.`;
        } else {
            enumName = 'enum.';
        }

        adapterObjects.getObjectView(
            'system',
            'enum',
            {
                startkey: enumName,
                endkey: enumName + '\u9999'
            },
            options,
            async (err, res) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }

                if (res && res.rows) {
                    for (let i = 0; i < res.rows.length; i++) {
                        try {
                            const obj = await adapterObjects.getObject(res.rows[i].id, options);

                            if (obj && obj.common && obj.common.members) {
                                const pos = obj.common.members.indexOf(objId);
                                if (pos !== -1) {
                                    obj.common.members.splice(pos, 1);
                                    obj.from = 'system.adapter.' + this.namespace;
                                    obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                                    obj.ts = Date.now();

                                    await adapterObjects.setObjectAsync(obj._id, obj, options);
                                }
                            }
                        } catch (e) {
                            return tools.maybeCallbackWithError(callback, e);
                        }
                    }
                }
                return tools.maybeCallback(callback);
            }
        );
    }

    // external signature
    deleteChannel(channelName: string, options?: unknown, callback?: ioBroker.ErrorCallback): void;
    deleteChannel(
        parentDevice: string,
        channelName: string,
        options?: unknown,
        callback?: ioBroker.ErrorCallback
    ): void;

    /**
     * Deletes channel and udnerlying structure
     * @alais deleteChannel
     *
     * @param {string} parentDevice is the part of ID like: adapter.instance.<deviceName>
     * @param {string} channelName is the part of ID like: adapter.instance.<deviceName>.<channelName>
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete device: ' + err);
     *            }
     *        </code></pre>
     */
    async deleteChannel(parentDevice, channelName, options, callback?) {
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
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} deleteChannel not processed because Objects database not connected`
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
    deleteState(stateName: string, options?: unknown, callback?: ioBroker.ErrorCallback): void;
    deleteState(parentChannel: string, stateName: string, options?: unknown, callback?: ioBroker.ErrorCallback): void;
    deleteState(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        options?: unknown,
        callback?: ioBroker.ErrorCallback
    ): void;

    deleteState(parentDevice, parentChannel, stateName, options?, callback?) {
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

    getDevices(options, callback?) {
        if (typeof options === 'function' && typeof callback === 'object') {
            const tmp = callback;
            callback = options;
            options = tmp;
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!adapterObjects) {
            this._logger.info(`${this.namespaceLog} getDevices not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.getObjectView(
            'system',
            'device',
            {
                startkey: `${this.namespace}.`,
                endkey: this.namespace + '.\u9999'
            },
            options,
            (err, obj) => {
                if (err || !obj || !obj.rows || !obj.rows.length) {
                    return tools.maybeCallbackWithError(callback, err, err ? undefined : []);
                }
                const res = [];
                for (let i = 0; i < obj.rows.length; i++) {
                    res.push(obj.rows[i].value);
                }
                return tools.maybeCallbackWithError(callback, null, res);
            }
        );
    }

    // public signature
    getChannelsOf(callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>): void;
    getChannelsOf(parentDevice: string, callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>): void;
    getChannelsOf(
        parentDevice: string,
        options: unknown,
        callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>
    ): void;
    getChannelsOf(parentDevice: unknown, options?: unknown, callback?: unknown) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (typeof parentDevice === 'function') {
            callback = parentDevice;
            parentDevice = null;
        }

        Utils.assertsOptionalCallback(callback, 'callback');
        Utils.assertsString(parentDevice, 'parentDevice');

        return this._getChannelsOf({ parentDevice, options, callback });
    }

    private _getChannelsOf(options: InternalGetChannelsOfOptions) {
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} getChannelsOf not processed because Objects database not connected`
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
        options.parentDevice = this.namespace + (options.parentDevice ? '.' + options.parentDevice : '');
        adapterObjects.getObjectView(
            'system',
            'channel',
            {
                startkey: options.parentDevice + '.',
                endkey: options.parentDevice + '.\u9999'
            },
            options.options,
            (err, obj) => {
                if (err || !obj || !obj.rows || !obj.rows.length) {
                    return tools.maybeCallbackWithError(options.callback, err, err ? undefined : []);
                }
                const res = [];
                for (const row of obj.rows) {
                    res.push(row.value);
                }
                return tools.maybeCallbackWithError(options.callback, null, res);
            }
        );
    }

    // external signature
    getStatesOf(callback: ioBroker.GetObjectsCallback3<ioBroker.StateObject>): void;
    getStatesOf(parentDevice: string, callback: ioBroker.GetObjectsCallback3<ioBroker.StateObject>): void;
    getStatesOf(
        parentDevice: string,
        parentChannel: string,
        callback: ioBroker.GetObjectsCallback3<ioBroker.StateObject>
    ): void;
    getStatesOf(
        parentDevice: string,
        parentChannel: string,
        options: unknown,
        callback: ioBroker.GetObjectsCallback3<ioBroker.StateObject>
    ): void;
    getStatesOf(parentDevice, parentChannel?, options?, callback?) {
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

        if (!adapterObjects) {
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

        adapterObjects.getObjectView(
            'system',
            'state',
            {
                startkey: id,
                endkey: id + '\u9999'
            },
            options,
            (err, obj) => {
                if (err || !obj || !obj.rows || !obj.rows.length) {
                    return tools.maybeCallbackWithError(callback, err, err ? undefined : []);
                }
                const res: ioBroker.StateObject[] = [];
                let read = 0;
                for (let i = 0; i < obj.rows.length; i++) {
                    read++;
                    adapterObjects.getObject(obj.rows[i].id, (err, subObj) => {
                        if (subObj) {
                            res.push(subObj);
                        }

                        if (!--read) {
                            return tools.maybeCallbackWithError(callback, null, res);
                        }
                    });
                }
            }
        );
    }

    // external signature
    addStateToEnum(
        enumName: string,
        addTo: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        callback?: ioBroker.ErrorCallback
    ): void;
    addStateToEnum(
        enumName: string,
        addTo: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        options: unknown,
        callback?: ioBroker.ErrorCallback
    ): void;
    addStateToEnum(enumName, addTo, parentDevice, parentChannel, stateName, options, callback?) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} addStateToEnum not processed because Objects database not connected`
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
            adapterObjects.getObject(addTo, options, (err, obj) => {
                if (err || !obj) {
                    return tools.maybeCallbackWithError(callback, err || tools.ERRORS.ERROR_NOT_FOUND);
                }
                if (!obj.common.members.includes(objId)) {
                    obj.common.members.push(objId);
                    obj.from = 'system.adapter.' + this.namespace;
                    obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                    obj.ts = Date.now();
                    adapterObjects.setObject(obj._id, obj, options, callback);
                } else {
                    return tools.maybeCallback(callback);
                }
            });
        } else {
            if (enumName.startsWith('enum.')) {
                enumName = enumName.substring(5);
            }

            adapterObjects.getObject('enum.' + enumName + '.' + addTo, options, (err, obj) => {
                if (!err && obj) {
                    if (!obj.common.members.includes(objId)) {
                        obj.common.members.push(objId);
                        obj.from = 'system.adapter.' + this.namespace;
                        obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                        obj.ts = Date.now();
                        adapterObjects.setObject(obj._id, obj, callback);
                    } else {
                        return tools.maybeCallback(callback);
                    }
                } else {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    }

                    // Create enum
                    adapterObjects.setObject(
                        'enum.' + enumName + '.' + addTo,
                        {
                            common: {
                                name: addTo,
                                members: [objId]
                            },
                            from: 'system.adapter.' + this.namespace,
                            ts: Date.now(),
                            type: 'enum'
                        },
                        options,
                        callback
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
        callback?: ioBroker.ErrorCallback
    ): void;
    deleteStateFromEnum(
        enumName: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        options: unknown,
        callback?: ioBroker.ErrorCallback
    ): void;
    deleteStateFromEnum(enumName, parentDevice, parentChannel, stateName, options, callback?) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} deleteStateFromEnum not processed because Objects database not connected`
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
                state: stateName
            },
            false /*, 'state'*/
        );

        if (enumName) {
            enumName = 'enum.' + enumName + '.';
        } else {
            enumName = 'enum.';
        }

        adapterObjects.getObjectView(
            'system',
            'enum',
            {
                startkey: enumName,
                endkey: enumName + '\u9999'
            },
            options,
            async (err, res) => {
                if (err || !res || !res.rows) {
                    return tools.maybeCallbackWithError(callback, err);
                }

                for (const row of res.rows) {
                    try {
                        const obj = await adapterObjects.getObjectAsync(row.id);
                        if (obj && obj.common && obj.common.members) {
                            const pos = obj.common.members.indexOf(objId);
                            if (pos !== -1) {
                                obj.common.members.splice(pos, 1);
                                obj.from = 'system.adapter.' + this.namespace;
                                obj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;
                                obj.ts = Date.now();
                                await adapterObjects.setObjectAsync(obj._id, obj);
                            }
                        }
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, e);
                    }
                }
                return tools.maybeCallback(callback);
            }
        );
    }

    // external signature
    chmodFile(
        adapter: string | null,
        path: string,
        options: { mode: number | string } | Record<string, any>,
        callback: ioBroker.ChownFileCallback
    ): void;

    /**
     * Change file access rights
     *
     * This function updates the file access rights
     * <pre><code>
     *      adapter.chmodFile('vis.0', '/main/vis-views.json', {mode: 0x644}, function (err, processed) {
     *        if (err) adapter.log.error('Cannot read file: ' + err);
     *        console.log('New files: ' + JSON.stringify(processed));
     *      });
     * </code></pre>
     *
     * @alias chownFile
     * @memberof Adapter
     * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
     * @param {string} path path to file without adapter name. E.g. If you want to update "/vis.0/main/*", here must be "/main/*" and _adapter must be equal to "vis.0".
     * @param {object} options data with mode
     * @param {function} callback return result
     *        <pre><code>
     *            function (err, processedFiles) {
     *                list of processed files with new groups
     *            }
     *        </code></pre>
     */
    chmodFile(_adapter: unknown, path: unknown, options: unknown, callback: unknown) {
        if (_adapter === null) {
            _adapter = this.name;
        }

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(`${this.namespaceLog} chmodFile not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.chmodFile(_adapter, path, options, callback);
    }

    chownFile(
        _adapter: string,
        path: string,
        options: unknown,
        callback: (err?: Error | null, processedFiles?: any) => void
    ): void;

    /**
     * Change file owner
     *
     * This function updates the file owner and ownerGroup
     * <pre><code>
     *      adapter.chownFile('vis.0', '/main/vis-views.json', {owner: 'newOwner', ownerGroup: 'newgroup'}, function (err, processed) {
     *        if (err) adapter.log.error('Cannot read file: ' + err);
     *        console.log('New files: ' + JSON.stringify(processed));
     *      });
     * </code></pre>
     *
     * @alias chownFile
     * @memberof Adapter
     * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
     * @param {string} path path to file without adapter name. E.g. If you want to update "/vis.0/main/*", here must be "/main/*" and _adapter must be equal to "vis.0".
     * @param {object} options data with owner and ownerGroup
     * @param {function} callback return result
     *        <pre><code>
     *            function (err, processedFiles) {
     *                list of processed files with new groups
     *            }
     *        </code></pre>
     */
    chownFile(_adapter: unknown, path: unknown, options: unknown, callback: unknown) {
        if (_adapter === null) {
            _adapter = this.name;
        }

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(`${this.namespaceLog} chownFile not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.chownFile(_adapter, path, options, callback);
    }

    // external signatures
    readDir(adapterName: string | null, path: string, callback: ioBroker.ReadDirCallback): void;
    readDir(adapterName: string | null, path: string, options: unknown, callback: ioBroker.ReadDirCallback): void;

    /**
     * Read directory from DB.
     *
     * This function reads the content of directory from DB for given adapter and path.
     * If getEnum called with no enum specified, all enums will be returned:
     * <pre><code>
     *      adapter.readDir('vis.0', '/main/', function (err, filesOrDirs) {
     *        // All enums
     *        if (err) adapter.log.error('Cannot read directory: ' + err);
     *        if (filesOrDirs) {
     *           for (var f = 0; f < filesOrDirs.length; f++) {
     *              adapter.log.debug('Directory main has following files and dirs: ' + filesOrDirs[f].file + '[dir - ' + filesOrDirs[f].isDir + ']');
     *           }
     *       }
     *      });
     * </code></pre>
     *
     * @alias readDir
     * @memberof Adapter
     * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
     * @param {string} path path to direcory without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0".
     * @param {object} options optional user context
     * @param {ioBroker.ReadDirCallback} callback return result
     *        <pre><code>
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
     *        </code></pre>
     */
    readDir(_adapter, path, options, callback) {
        if (_adapter === null) {
            _adapter = this.name;
        }

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(this.namespaceLog + ' ' + 'readDir not processed because Objects database not connected');
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.readDir(_adapter, path, options, callback);
    }

    // public signature
    unlink(adapterName: string | null, path: string, callback: ioBroker.ErrnoCallback): void;
    unlink(adapterName: string | null, path: string, options: unknown, callback: ioBroker.ErrnoCallback): void;
    unlink(_adapter: unknown, name: unknown, options: unknown, callback?: unknown) {
        if (_adapter === null) {
            _adapter = this.name;
        }

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        Utils.assertsOptionalCallback(callback, 'callback');
        Utils.assertsString(_adapter, '_adapter');
        Utils.assertsString(name, 'name');

        if (!adapterObjects) {
            this._logger.info(`${this.namespaceLog} unlink not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.unlink(_adapter, name, options, callback);
    }

    // external signatures
    rename(adapterName: string | null, oldName: string, newName: string, callback: ioBroker.ErrnoCallback): void;
    rename(
        adapterName: string | null,
        oldName: string,
        newName: string,
        options: unknown,
        callback: ioBroker.ErrnoCallback
    ): void;

    rename(_adapter, oldName, newName, options, callback) {
        if (_adapter === null) {
            _adapter = this.name;
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(`${this.namespaceLog} rename not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.rename(_adapter, oldName, newName, options, callback);
    }

    mkdir(_adapter, dirname, options, callback) {
        if (_adapter === null) {
            _adapter = this.name;
        }
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(this.namespaceLog + ' ' + 'mkdir not processed because Objects database not connected');
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.mkdir(_adapter, dirname, options, callback);
    }

    readFile(adapterName: string | null, path: string, callback: ioBroker.ReadFileCallback): void;
    readFile(adapterName: string | null, path: string, options: unknown, callback: ioBroker.ReadFileCallback): void;

    /**
     * Read file from DB.
     *
     * This function reads the content of one file from DB for given adapter and file name.
     * <pre><code>
     *      adapter.readFile('vis.0', '/main/vis-views.json', function (err, data) {
     *        // All enums
     *        if (err) adapter.log.error('Cannot read file: ' + err);
     *        console.log('Content of file is: ' + data);
     *      });
     * </code></pre>
     *
     * @alias readFile
     * @memberof Adapter
     * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
     * @param {string} filename path to file without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0".
     * @param {object} options optional user context
     * @param {ioBroker.ReadFileCallback} callback return result
     *        <pre><code>
     *            function (err, data) {
     *                // data is utf8 or binary Buffer depends on the file extension.
     *            }
     *        </code></pre>
     */
    readFile(_adapter, filename, options, callback?) {
        if (_adapter === null) {
            _adapter = this.name;
        }

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(
                this.namespaceLog + ' ' + 'readFile not processed because Objects database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        adapterObjects.readFile(_adapter, filename, options, callback);
    }

    // external signatures
    writeFile(adapterName: string | null, path: string, data: Buffer | string, callback: ioBroker.ErrnoCallback): void;
    writeFile(
        adapterName: string | null,
        path: string,
        data: Buffer | string,
        options: unknown,
        callback: ioBroker.ErrnoCallback
    ): void;

    /**
     * Write file to DB.
     *
     * This function writes the content of one file into DB for given adapter and file name.
     * <pre><code>
     *      adapter.writeFile('vis.0', '/main/vis-views.json', data, function (err) {
     *        err && adapter.log.error('Cannot write file: ' + err);
     *      });
     * </code></pre>
     *
     * @alias writeFile
     * @memberof Adapter
     * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
     * @param {string} filename path to file without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0".
     * @param {object} data data as UTF8 string or buffer depends on the file extension.
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *
     *            }
     *        </code></pre>
     */
    writeFile(_adapter, filename, data, options, callback?) {
        if (_adapter === null) {
            _adapter = this.name;
        }

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }
        if (!adapterObjects) {
            this._logger.info(`${this.namespaceLog} writeFile not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        return adapterObjects.writeFile(_adapter, filename, data, options, callback);
    }

    fileExists(adapterName: string | null, path: string, callback: ioBroker.GenericCallback<boolean>): void;
    fileExists(
        adapterName: string | null,
        path: string,
        options: unknown,
        callback: ioBroker.GenericCallback<boolean>
    ): void;

    /**
     * Checks if file exists in DB.
     *
     * @alias fileExists
     * @memberof Adapter
     * @param {string} _adapter adapter name
     * @param {string} filename path to file without adapter name. E.g. If you want to check "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0".
     * @param {object} [options] optional user context
     * @param {function} [callback] cb function if none provided, a promise is returned
     * @returns {Promise<boolean>}
     */
    async fileExists(_adapter, filename, options, callback?) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (typeof callback !== 'function') {
            return new Promise((resolve, reject) => {
                this.fileExists(_adapter, filename, options, (err, existent) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(existent);
                    }
                });
            });
        }

        if (!adapterObjects) {
            this._logger.info(
                this.namespaceLog + ' ' + 'fileExists not processed because Objects database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            const exists = await adapterObjects.fileExists(_adapter, filename, options);
            callback(null, exists);
        } catch (e) {
            callback(e);
        }
    }

    // external signatures
    formatValue(value: number | string, format: any): string;
    formatValue(value: number | string, decimals: number, format: any): string;
    formatValue(value: unknown, decimals: unknown, _format?: unknown) {
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
    formatDate(dateObj: string | Date | number, format: string): string;
    formatDate(dateObj: string | Date | number, isDuration: boolean | string, format: string): string;

    // TODO make strict later
    formatDate(dateObj: any, isDuration: any, _format?: any) {
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
        const type = typeof dateObj;
        if (type === 'string') {
            dateObj = new Date(dateObj);
        }

        if (type !== 'object') {
            const j = parseInt(dateObj, 10);
            if (j === dateObj) {
                // may this is interval
                if (j < 946681200) {
                    isDuration = true;
                    dateObj = new Date(dateObj);
                } else {
                    // if less 2000.01.01 00:00:00
                    dateObj = j < 946681200000 ? new Date(j * 1000) : new Date(j);
                }
            } else {
                dateObj = new Date(dateObj);
            }
        }
        const format = _format || this.dateFormat || 'DD.MM.YYYY';

        if (isDuration) {
            dateObj.setMilliseconds(dateObj.getMilliseconds() + dateObj.getTimezoneOffset() * 60 * 1000);
        }

        const validFormatChars = 'YJГMМDTДhSчmмsс';
        let s = '';
        let result = '';

        const put = (s: string) => {
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
                        // @ts-expect-error
                        v %= 100;
                    }
                    if (v <= 9) {
                        v = '0' + v;
                    }
                    break;
                case 'MM':
                case 'M':
                case 'ММ':
                case 'М':
                    v = dateObj.getMonth() + 1;
                    if (v < 10 && s.length === 2) {
                        v = '0' + v;
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
                        v = '0' + v;
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
                        v = '0' + v;
                    }
                    break;
                case 'mm':
                case 'm':
                case 'мм':
                case 'м':
                    v = dateObj.getMinutes();
                    if (v < 10 && s.length === 2) {
                        v = '0' + v;
                    }
                    break;
                case 'ss':
                case 's':
                case 'cc':
                case 'c':
                    v = dateObj.getSeconds();
                    if (v < 10 && s.length === 2) {
                        v = '0' + v;
                    }
                    v = v.toString();
                    break;
                case 'sss':
                case 'ссс':
                    v = dateObj.getMilliseconds();
                    if (v < 10) {
                        v = '00' + v;
                    } else if (v < 100) {
                        v = '0' + v;
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
        message: ioBroker.MessagePayload,
        callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo
    ): void;
    sendTo(
        instanceName: string,
        command: string,
        message: ioBroker.MessagePayload,
        callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo
    ): void;

    /**
     * Send message to other adapter instance or all instances of adapter.
     *
     * This function sends a message to specific instance or all instances of some specific adapter.
     * If no instance given (e.g. "pushover"), the callback argument will be ignored. Because normally many responses will come.
     *
     * @alias sendTo
     * @memberof Adapter
     * @param {string} instanceName name of the instance where the message must be send to. E.g. "pushover.0" or "system.adapter.pushover.0".
     * @param {string} command command name, like "send", "browse", "list". Command is depend on target adapter implementation.
     * @param {object} message object that will be given as argument for request
     * @param {function(any):any} [callback] optional return result
     *        <pre><code>
     *            function (result) {
     *              // result is target adapter specific and can vary from adapter to adapter
     *              if (!result) adapter.log.error('No response received');
     *            }
     *        </code></pre>
     */
    async sendTo(instanceName, command, message, callback?) {
        if (typeof message === 'function' && typeof callback === 'undefined') {
            callback = message;
            message = undefined;
        }
        if (typeof message === 'undefined') {
            message = command;
            command = 'send';
        }
        const obj = { command: command, message: message, from: `system.adapter.${this.namespace}` };

        if (typeof instanceName !== 'string' || !instanceName) {
            return tools.maybeCallbackWithError(callback, 'No instanceName provided or not a string');
        }

        if (!instanceName.startsWith('system.adapter.')) {
            instanceName = 'system.adapter.' + instanceName;
        }

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(this.namespaceLog + ' ' + 'sendTo not processed because States database not connected');
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (typeof message !== 'object') {
            this._logger.silly(
                `${this.namespaceLog} sendTo "${command}" to ${instanceName} from system.adapter.${this.namespace}: ${message}`
            );
        } else {
            this._logger.silly(
                `${this.namespaceLog} sendTo "${command}" to ${instanceName} from system.adapter.${this.namespace}`
            );
        }

        // If not specific instance
        if (!instanceName.match(/\.[0-9]+$/)) {
            if (!adapterObjects) {
                this._logger.info(
                    this.namespaceLog + ' ' + 'sendTo not processed because Objects database not connected'
                );
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            // Send to all instances of adapter
            adapterObjects.getObjectView(
                'system',
                'instance',
                {
                    startkey: instanceName + '.',
                    endkey: instanceName + '.\u9999'
                },
                async (err, _obj) => {
                    if (_obj && _obj.rows) {
                        for (let i = 0; i < _obj.rows.length; i++) {
                            try {
                                await adapterStates.pushMessage(_obj.rows[i].id, obj);
                            } catch (e) {
                                return tools.maybeCallbackWithError(callback, e);
                            }
                        }
                    }
                }
            );
        } else {
            if (callback) {
                if (typeof callback === 'function') {
                    // force subscribe even no messagebox enabled
                    if (!this.common.messagebox && !this.mboxSubscribed) {
                        this.mboxSubscribed = true;
                        adapterStates.subscribeMessage(`system.adapter.${this.namespace}`);
                    }

                    obj.callback = {
                        message: message,
                        id: this._callbackId++,
                        ack: false,
                        time: Date.now()
                    };
                    if (this._callbackId >= 0xffffffff) {
                        this._callbackId = 1;
                    }
                    if (!this.callbacks) {
                        this.callbacks = {};
                    }
                    this.callbacks[`_${obj.callback.id}`] = { cb: callback };

                    // delete too old callbacks IDs
                    const now = Date.now();
                    for (const _id in this.callbacks) {
                        if (now - this.callbacks[_id].time > 3600000) {
                            delete this.callbacks[_id];
                        }
                    }
                } else {
                    obj.callback = callback;
                    obj.callback.ack = true;
                }
            }

            try {
                await adapterStates.pushMessage(instanceName, obj);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        }
    }

    sendToHost(
        hostName: string,
        message: ioBroker.MessagePayload,
        callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo
    ): void;
    sendToHost(
        hostName: string,
        command: string,
        message: ioBroker.MessagePayload,
        callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo
    ): void;

    /**
     * Send message to specific host or to all hosts.
     *
     * This function sends a message to specific host or all hosts.
     * If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.
     *
     * @alias sendToHost
     * @memberof Adapter
     * @param {any} hostName name of the host where the message must be send to. E.g. "myPC" or "system.host.myPC". If argument is empty, the message will be sent to all hosts.
     * @param {string} command command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage)
     * @param {object} message object that will be given as argument for request
     * @param {function(any):any} [callback] optional return result
     *        <pre><code>
     *            function (result) {
     *              // result is target adapter specific and can vary from command to command
     *              if (!result) adapter.log.error('No response received');
     *            }
     *        </code></pre>
     */
    async sendToHost(hostName, command, message, callback?) {
        if (typeof message === 'undefined') {
            message = command;
            command = 'send';
        }
        const obj = { command, message, from: `system.adapter.${this.namespace}` };

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                this.namespaceLog + ' ' + 'sendToHost not processed because States database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (hostName && typeof hostName !== 'string') {
            hostName = hostName.toString();
        }

        if (hostName && !hostName.startsWith('system.host.')) {
            hostName = 'system.host.' + hostName;
        }

        if (!hostName) {
            if (!adapterObjects) {
                this._logger.info(
                    this.namespaceLog + ' ' + 'sendToHost not processed because Objects database not connected'
                );
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            // Send to all hosts
            adapterObjects.getObjectList(
                {
                    startkey: 'system.host.',
                    endkey: `system.host.\u9999`
                },
                null,
                async (err, res) => {
                    if (!adapterStates) {
                        // if states is no longer existing, we do not need to unsubscribe
                        return;
                    }
                    if (!err && res.rows.length) {
                        for (let i = 0; i < res.rows.length; i++) {
                            const parts = res.rows[i].id.split('.');
                            // ignore system.host.name.alive and so on
                            if (parts.length === 3) {
                                try {
                                    await adapterStates.pushMessage(res.rows[i].id, obj);
                                } catch (e) {
                                    return tools.maybeCallbackWithError(callback, e);
                                }
                            }
                        }
                    }
                }
            );
        } else {
            if (callback) {
                if (typeof callback === 'function') {
                    // force subscribe even no messagebox enabled
                    if (!this.common.messagebox && !this.mboxSubscribed) {
                        this.mboxSubscribed = true;
                        adapterStates.subscribeMessage(`system.adapter.${this.namespace}`);
                    }

                    obj.callback = {
                        message,
                        id: this._callbackId++,
                        ack: false,
                        time: Date.now()
                    };
                    if (this._callbackId >= 0xffffffff) {
                        this._callbackId = 1;
                    }
                    this.callbacks = this.callbacks || {};
                    this.callbacks[`_${obj.callback.id}`] = { cb: callback };
                } else {
                    obj.callback = callback;
                    obj.callback.ack = true;
                }
            }

            try {
                await adapterStates.pushMessage(hostName, obj);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        }
    }

    registerNotification<Scope extends keyof ioBroker.NotificationScopes>(
        scope: Scope,
        category: ioBroker.NotificationScopes[Scope] | null,
        message: string
    ): Promise<void>;

    /**
     * Send notification with given scope and category to host of this adapter
     *
     * @param {string} scope - scope to be addressed
     * @param {string|null} category - to be addressed, if null message will be checked by regex of given scope
     * @param {string} message - message to be stored/checked
     * @return Promise<void>
     */
    async registerNotification(scope, category, message) {
        const obj = {
            command: 'addNotification',
            message: { scope, category, message, instance: this.namespace },
            from: `system.adapter.${this.namespace}`
        };

        await adapterStates.pushMessage(this.host, obj);
    }

    // external signatures
    setState(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        callback?: ioBroker.SetStateCallback
    ): void;
    setState(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        callback?: ioBroker.SetStateCallback
    ): void;
    setState(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options: unknown,
        callback?: ioBroker.SetStateCallback
    ): void;
    setState(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown,
        callback?: ioBroker.SetStateCallback
    ): void;

    /**
     * Writes value into states DB.
     *
     * This function can write values into states DB for this adapter.
     * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
     * ack, options and callback are optional
     *
     * @alias setState
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object|string|number|boolean} state simple value or object with attribues.
     *  If state is object and ack exists too as function argument, function argument has priority.
     *  <pre><code>
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
     *  </code></pre>
     * @param {boolean} [ack] optional is command(false) or status(true)
     * @param {object} [options] optional user context
     * @param {ioBroker.SetStateCallback} [callback] optional return error and id
     *        <pre><code>
     *            function (err, id) {
     *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
     *            }
     *        </code></pre>
     */
    setState(id: unknown, state: unknown, ack: unknown, options?: unknown, callback?: unknown) {
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

        Utils.assertsString(id, 'id');
        if (ack !== undefined) {
            Utils.assertsBoolean(ack, 'ack');
        }

        Utils.assertsOptionalCallback(callback, 'callback');

        if (options !== undefined && options !== null) {
            Utils.assertsObject(options, 'options');
        }

        return this._setState({ id, state: state as ioBroker.SettableState, ack, options, callback });
    }

    private async _setState(_options: InternalSetStateOptions) {
        const { state, ack, options, callback } = _options;
        let { id } = _options;

        if (!adapterStates) {
            // if states is no longer existing, we do not need to set
            this._logger.info(`${this.namespaceLog} setState not processed because States database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }
        if (!adapterObjects) {
            this._logger.info(`${this.namespaceLog} setState not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, false, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        id = this._utils.fixId(id, false);
        let stateObj: ioBroker.State | ioBroker.SettableState;

        if (tools.isObject(state)) {
            // Verify that the passed state object is valid
            try {
                // @ts-expect-error fix later
                this._utils.validateSetStateObjectArgument(state);
                // @ts-expect-error fix later
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
            this._logger.info(`${this.namespaceLog} undefined is not a valid state value for id "${id}"`);
            // TODO: reactivate line below + test in next controller version (02.05.2021)
            // return tools.maybeCallbackWithError(callback, 'undefined is not a valid state value');
        }

        if (ack !== undefined) {
            stateObj.ack = ack;
        }

        // if state.from provided, we use it else, we set default property
        stateObj.from =
            typeof stateObj.from === 'string' && stateObj.from !== ''
                ? stateObj.from
                : `system.adapter.${this.namespace}`;
        stateObj.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;

        if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
            this._checkStates(id, options, 'setState', async (err, obj) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    if (!adapterObjects) {
                        // if objects is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            `${this.namespaceLog} setForeignState not processed because Objects database not connected`
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    if (this.performStrictObjectChecks) {
                        // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                        // @ts-expect-error fix later
                        await this._utils.performStrictObjectCheck(id, stateObj);
                    }

                    if (id.startsWith(ALIAS_STARTS_WITH)) {
                        // write alias
                        if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                            // id can be string or can have attribute write
                            const aliasId =
                                // @ts-expect-error fix later on
                                typeof obj.common.alias.id.write === 'string'
                                    ? obj.common.alias.id.write
                                    : obj.common.alias.id;

                            // validate here because we use objects/states db directly
                            try {
                                this._utils.validateId(aliasId, true, null);
                            } catch (e) {
                                this._logger.warn(
                                    `${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`
                                );
                                return tools.maybeCallbackWithError(
                                    callback,
                                    `Error validating alias id of ${id}: ${e.message}`
                                );
                            }

                            // check the rights
                            this._checkStates(aliasId, options, 'setState', (err, targetObj) => {
                                if (err) {
                                    return tools.maybeCallbackWithError(callback, err);
                                } else {
                                    if (!adapterStates) {
                                        // if states is no longer existing, we do not need to unsubscribe
                                        this._logger.info(
                                            `${this.namespaceLog} setForeignState not processed because States database not connected`
                                        );
                                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                                    }

                                    // write target state
                                    this.outputCount++;
                                    adapterStates.setState(
                                        aliasId,
                                        tools.formatAliasValue(
                                            obj && obj.common,
                                            targetObj && targetObj.common,
                                            state,
                                            this._logger,
                                            this.namespaceLog
                                        ),
                                        callback
                                    );
                                }
                            });
                        } else {
                            this._logger.warn(`${this.namespaceLog} ${`Alias ${id} has no target 2`}`);
                            return tools.maybeCallbackWithError(callback, `Alias ${id} has no target`);
                        }
                    } else {
                        if (!adapterStates) {
                            // if states is no longer existing, we do not need to unsubscribe
                            this._logger.info(
                                `${this.namespaceLog} setForeignState not processed because States database not connected`
                            );
                            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                        }

                        this.outputCount++;
                        adapterStates.setState(id, state, callback);
                    }
                }
            });
        } else {
            if (id.startsWith(ALIAS_STARTS_WITH)) {
                // write alias
                // read alias id
                adapterObjects.getObject(id, options, (err, obj) => {
                    if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                        const aliasId =
                            typeof obj.common.alias.id.write === 'string'
                                ? obj.common.alias.id.write
                                : obj.common.alias.id;

                        // validate here because we use objects/states db directly
                        try {
                            this._utils.validateId(aliasId, true, null);
                        } catch (e) {
                            this._logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                            return tools.maybeCallbackWithError(
                                callback,
                                `Error validating alias id of ${id}: ${e.message}`
                            );
                        }

                        // read object for formatting
                        adapterObjects.getObject(aliasId, options, (err, targetObj) => {
                            // write target state
                            this.outputCount++;
                            adapterStates.setState(
                                aliasId,
                                tools.formatAliasValue(
                                    obj && obj.common,
                                    targetObj && targetObj.common,
                                    state,
                                    this._logger,
                                    this.namespaceLog
                                ),
                                callback
                            );
                        });
                    } else {
                        this._logger.warn(`${this.namespaceLog} ${err ? err.message : `Alias ${id} has no target 3`}`);
                        return tools.maybeCallbackWithError(callback, err ? err.message : `Alias ${id} has no target`);
                    }
                });
            } else {
                if (this.performStrictObjectChecks) {
                    // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                    // @ts-expect-error fix later on
                    await this._utils.performStrictObjectCheck(id, state);
                }

                if (!adapterStates) {
                    // if states is no longer existing, we do not need to set
                    this._logger.info(
                        `${this.namespaceLog} setState not processed because States database not connected`
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                this.outputCount++;
                adapterStates.setState(id, state, callback);
            }
        }
    }

    // Cache will be cleared if user or group changes.. Important! only if subscribed.
    private _getUserGroups(
        options: Record<string, any>,
        callback: (err?: Error | null, options?: Record<string, any>) => void
    ) {
        if (this.users[options.user]) {
            options.groups = this.users[options.user].groups;
            options.acl = this.users[options.user].acl;
            return tools.maybeCallback(callback, options);
        }
        options.groups = [];
        this.getForeignObject(options.user, null, (err, userAcl) => {
            if (!userAcl) {
                // User does not exists
                this._logger.error(`${this.namespaceLog} unknown user "${options.user}"`);
                return tools.maybeCallback(callback, options);
            } else {
                this.getForeignObjects('*', 'group', null, null, async (err, groups) => {
                    // aggregate all groups permissions, where this user is
                    if (groups) {
                        for (const g in groups) {
                            if (
                                Object.prototype.hasOwnProperty.call(groups, g) &&
                                groups[g] &&
                                groups[g].common &&
                                groups[g].common.members &&
                                groups[g].common.members.includes(options.user)
                            ) {
                                options.groups.push(groups[g]._id);
                            }
                        }
                    }

                    // read all groups for this user
                    this.users[options.user] = {
                        groups: options.groups,
                        // @ts-expect-error
                        acl: (userAcl.common && userAcl.common.acl) || {}
                    };
                    await this._getGroups(options.groups);
                    // combine all rights
                    const user = this.users[options.user];
                    for (let g = 0; g < options.groups.length; g++) {
                        const gName = options.groups[g];
                        if (!this.groups[gName] || !this.groups[gName].common || !this.groups[gName].common.acl) {
                            continue;
                        }
                        const group = this.groups[gName];

                        if (group.common.acl && group.common.acl.file) {
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

                        if (group.common.acl && group.common.acl.object) {
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

                        if (group.common.acl && group.common.acl.users) {
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
                        if (group.common.acl && group.common.acl.state) {
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
                    return tools.maybeCallback(callback, options);
                });
            }
        });
    }

    private _checkState(obj: ioBroker.StateObject, options: Record<string, any>, command: CheckStateCommand) {
        const limitToOwnerRights = options.limitToOwnerRights === true;
        if (obj && obj.acl) {
            obj.acl.state = obj.acl.state || obj.acl.object;

            if (obj.acl.state) {
                // If user is owner
                if (options.user === obj.acl.owner) {
                    if (command === 'setState' || command === 'delState') {
                        if (command === 'delState' && !options.acl.state.delete) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`
                            );
                            return false;
                        } else if (command === 'setState' && !options.acl.state.write) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`
                            );
                            return false;
                        } else if (!(obj.acl.state & ACCESS_USER_WRITE)) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`
                            );
                            return false;
                        }
                    } else if (command === 'getState') {
                        if (!(obj.acl.state & ACCESS_USER_READ) || !options.acl.state.read) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`
                            );
                            return false;
                        }
                    } else {
                        this._logger.warn(
                            `${this.namespaceLog} Called unknown command on "${obj._id}": ${command as any}`
                        );
                    }
                } else if (options.groups.includes(obj.acl.ownerGroup) && !limitToOwnerRights) {
                    if (command === 'setState' || command === 'delState') {
                        if (command === 'delState' && !options.acl.state.delete) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`
                            );
                            return false;
                        } else if (command === 'setState' && !options.acl.state.write) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`
                            );
                            return false;
                        } else if (!(obj.acl.state & ACCESS_GROUP_WRITE)) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`
                            );
                            return false;
                        }
                    } else if (command === 'getState') {
                        if (!(obj.acl.state & ACCESS_GROUP_READ) || !options.acl.state.read) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`
                            );
                            return false;
                        }
                    } else {
                        this._logger.warn(
                            `${this.namespaceLog} Called unknown command on "${obj._id}": ${command as any}`
                        );
                    }
                } else if (!limitToOwnerRights) {
                    if (command === 'setState' || command === 'delState') {
                        if (command === 'delState' && !options.acl.state.delete) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`
                            );
                            return false;
                        } else if (command === 'setState' && !options.acl.state.write) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user} on "${obj._id}": ${command}`
                            );
                            return false;
                        } else if (!(obj.acl.state & ACCESS_EVERY_WRITE)) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user}" on "${obj._id}": ${command}`
                            );
                            return false;
                        }
                    } else if (command === 'getState') {
                        if (!(obj.acl.state & ACCESS_EVERY_READ) || !options.acl.state.read) {
                            this._logger.warn(
                                `${this.namespaceLog} Permission error for user "${options.user}"on "${obj._id}" : ${command}`
                            );
                            return false;
                        }
                    } else {
                        this._logger.warn(
                            `${this.namespaceLog} Called unknown command on "${obj._id}": ${command as any}`
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

    // with string, we have only one object in callback
    private _checkStates(
        id: string,
        options: Record<string, any>,
        command: CheckStateCommand,
        callback: (err?: Error, obj?: ioBroker.StateObject) => void,
        _helper?: any
    ): void;
    // else multiple objects
    private _checkStates(
        ids: string[],
        options: Record<string, any>,
        command: CheckStateCommand,
        callback: (err?: Error, ids?: string[], objs?: ioBroker.StateObject[]) => void,
        _helper?: any
    ): void;
    private _checkStates(
        ids: string | string[],
        options: Record<string, any>,
        command: CheckStateCommand,
        callback:
            | ((err?: Error, ids?: string[], objs?: ioBroker.StateObject[]) => void)
            | ((err?: Error, obj?: ioBroker.StateObject) => void),
        _helper?: any
    ): void {
        if (!options.groups) {
            // @ts-expect-error ts not able to combine the overloads
            return this._getUserGroups(options, () => this._checkStates(ids, options, command, callback));
        }

        if (Array.isArray(ids)) {
            if (!ids.length) {
                return tools.maybeCallbackWithError(callback, null, ids);
            }

            if (options._objects) {
                const ids: string[] = [];
                const objs: ioBroker.StateObject[] = [];
                for (const obj of options._objects) {
                    if (obj && this._checkState(obj, options, command)) {
                        ids.push(obj._id);
                        objs.push(obj);
                    }
                }

                options._objects = undefined;
                return tools.maybeCallbackWithError(callback, null, ids, objs);
            } else {
                _helper = _helper || {
                    i: 0,
                    objs: options._objects || [],
                    errors: []
                };

                // this must be a serial call
                this._checkStates(ids[_helper.i], options, command, (err, obj) => {
                    if (err && obj) {
                        _helper.errors.push(obj._id);
                    }

                    if (obj) {
                        _helper.objs[_helper.i] = obj;
                    }

                    // if finished
                    if (_helper.i + 1 >= ids.length) {
                        if (_helper.errors.length) {
                            for (let j = ids.length - 1; j >= 0; j--) {
                                if (_helper.errors.includes(ids[j])) {
                                    ids.splice(j, 1);
                                    _helper.objs.splice(j, 1);
                                }
                            }
                        }

                        return tools.maybeCallbackWithError(callback, null, ids, _helper.objs);
                    } else {
                        _helper.i++;
                        // @ts-expect-error fix later on
                        setImmediate(() => this._checkStates(ids, options, command, callback, _helper));
                    }
                });
            }
        } else {
            let originalChecked: boolean;

            if (options.checked !== undefined) {
                originalChecked = options.checked;
            }

            options.checked = true;

            if (!adapterObjects) {
                this._logger.info(
                    `${this.namespaceLog} checkStates not processed because Objects database not connected`
                );
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }
            adapterObjects.getObject(ids, options, (err, obj) => {
                if (originalChecked !== undefined) {
                    options.checked = originalChecked;
                } else {
                    options.checked = undefined;
                }
                if (err) {
                    return tools.maybeCallbackWithError(callback, err, { _id: ids });
                } else {
                    if (!this._checkState(obj, options, command)) {
                        return tools.maybeCallbackWithError(callback, ERROR_PERMISSION, { _id: ids });
                    }
                }
                return tools.maybeCallbackWithError(callback, null, obj);
            });
        }
    }

    private async _getGroups(ids: string[]): Promise<void> {
        for (const id of ids) {
            let obj;
            try {
                obj = await this.getForeignObjectAsync(id);
            } catch {
                // ignore
            }
            if (this.groups[id] === undefined) {
                this.groups[id] = obj || {};
            }
        }
    }

    private _setStateChangedHelper(id: string, state: ioBroker.State, callback: () => void) {
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} setStateChanged not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (id.startsWith(ALIAS_STARTS_WITH)) {
            adapterObjects.getObject(id, (err, obj) => {
                if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                    // id can be string or can have attribute write
                    const aliasId =
                        typeof obj.common.alias.id.write === 'string' ? obj.common.alias.id.write : obj.common.alias.id;
                    this._setStateChangedHelper(aliasId, state, callback);
                } else {
                    this._logger.warn(`${this.namespaceLog} ${err ? err.message : `Alias ${id} has no target 1`}`);
                    return tools.maybeCallbackWithError(callback, err ? err.message : `Alias ${id} has no target`);
                }
            });
        } else {
            this.getForeignState(id, null, async (err, oldState) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
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
                        adapterStates.setState(id, state, () => {
                            return tools.maybeCallbackWithError(callback, null, id, false);
                        });
                    } else {
                        return tools.maybeCallbackWithError(callback, null, id, true);
                    }
                }
            });
        }
    }

    /**
     * Writes value into states DB only if the value really changed.
     *
     * This function can write values into states DB for this adapter.
     * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
     * ack, options and callback are optional
     *
     * @alias setStateChanged
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object|string|number|boolean} state simple value or object with attribues.
     * @param {boolean} [ack] optional is command(false) or status(true)
     * @param {object} [options] optional user context
     * @param {ioBroker.SetStateChangedCallback} [callback] optional return error, id and notChanged
     *        <pre><code>
     *            function (err, id, notChanged) {
     *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
     *              if (!notChanged) adapter.log.debug('Value was changed');
     *            }
     *        </code></pre>
     */
    setStateChanged(id, state, ack, options, callback) {
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

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                this.namespaceLog + ' ' + 'setStateCHanged not processed because States database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, false, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        id = this._utils.fixId(id, false);

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
            this._logger.info(this.namespaceLog + ' ' + `undefined is not a valid state value for id "${id}"`);
            // TODO: reactivate line below + test in in next controller version (02.05.2021)
            // return tools.maybeCallbackWithError(callback, 'undefined is not a valid state value');
        }

        if (ack !== undefined) {
            state.ack = ack;
        }

        // if state.from provided, we use it else, we set default property
        state.from =
            typeof state.from === 'string' && state.from !== '' ? state.from : `system.adapter.${this.namespace}`;
        if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
            this._checkStates(id, options, 'setState', err => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    this._setStateChangedHelper(id, state, callback);
                }
            });
        } else {
            this._setStateChangedHelper(id, state, callback);
        }
    }

    /**
     * Writes value into states DB for any instance.
     *
     * This function can write values into states DB for all instances and system states too.
     * ack, options and callback are optional
     *
     * @alias setForeignState
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object|string|number|boolean} state simple value or object with attribues.
     *  If state is object, so the ack will be ignored and must be included into object.
     *  <pre><code>
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
     *  </code></pre>
     * @param {boolean} [ack] optional is command(false) or status(true)
     * @param {object} [options] optional user context
     * @param {ioBroker.SetStateCallback} [callback] optional return error and id
     *        <pre><code>
     *            function (err, id) {
     *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
     *            }
     *        </code></pre>
     */
    async setForeignState(id, state, ack, options, callback) {
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

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                this.namespaceLog + ' ' + 'setForeignState not processed because States database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
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
            this._logger.info(this.namespaceLog + ' ' + `undefined is not a valid state value for id "${id}"`);
            // TODO: reactivate line below + test in in next controller version (02.05.2021)
            // return tools.maybeCallbackWithError(callback, 'undefined is not a valid state value');
        }

        if (ack !== undefined) {
            state.ack = ack;
        }

        // if state.from provided, we use it else, we set default property
        state.from =
            typeof state.from === 'string' && state.from !== '' ? state.from : `system.adapter.${this.namespace}`;
        state.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;

        if (!id || typeof id !== 'string') {
            const warn = id ? `ID can be only string and not "${typeof id}"` : `Empty ID: ${JSON.stringify(state)}`;
            this._logger.warn(`${this.namespaceLog} ${warn}`);
            return tools.maybeCallbackWithError(callback, warn);
        }

        const mId = id.replace(FORBIDDEN_CHARS, '_');
        if (mId !== id) {
            this._logger.warn(`${this.namespaceLog} Used invalid characters: ${id} changed to ${mId}`);
            id = mId;
        }

        if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
            this._checkStates(id, options, 'setState', async (err, obj) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    if (!adapterStates) {
                        // if states is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            this.namespaceLog +
                                ' ' +
                                'setForeignState not processed because States database not connected'
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    if (this.performStrictObjectChecks) {
                        // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                        await this._utils.performStrictObjectCheck(id, state);
                    }

                    if (id.startsWith(ALIAS_STARTS_WITH)) {
                        // write alias
                        if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                            // id can be string or can have attribute write
                            const aliasId =
                                typeof obj.common.alias.id.write === 'string'
                                    ? obj.common.alias.id.write
                                    : obj.common.alias.id;

                            // validate here because we use objects/states db directly
                            try {
                                this._utils.validateId(aliasId, true, null);
                            } catch (e) {
                                this._logger.warn(
                                    `${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`
                                );
                                return tools.maybeCallbackWithError(
                                    callback,
                                    `Error validating alias id of ${id}: ${e.message}`
                                );
                            }

                            // check the rights
                            this._checkStates(aliasId, options, 'setState', (err, targetObj) => {
                                if (err) {
                                    return tools.maybeCallbackWithError(callback, err);
                                } else {
                                    if (!adapterStates) {
                                        // if states is no longer existing, we do not need to unsubscribe
                                        this._logger.info(
                                            this.namespaceLog +
                                                ' ' +
                                                'setForeignState not processed because States database not connected'
                                        );
                                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                                    }

                                    this.outputCount++;
                                    adapterStates.setState(
                                        aliasId,
                                        tools.formatAliasValue(
                                            obj && obj.common,
                                            targetObj && targetObj.common,
                                            state,
                                            this._logger,
                                            this.namespaceLog
                                        ),
                                        callback
                                    );
                                }
                            });
                        } else {
                            this._logger.warn(`${this.namespaceLog} Alias ${id} has no target 4`);
                            return tools.maybeCallbackWithError(callback, `Alias ${id} has no target`);
                        }
                    } else {
                        if (!adapterStates) {
                            // if states is no longer existing, we do not need to unsubscribe
                            this._logger.info(
                                this.namespaceLog +
                                    ' ' +
                                    'setForeignState not processed because States database not connected'
                            );
                            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                        }

                        this.outputCount++;
                        adapterStates.setState(id, state, callback);
                    }
                }
            });
        } else {
            // write alias
            if (id.startsWith(ALIAS_STARTS_WITH)) {
                if (!adapterObjects) {
                    this._logger.info(
                        this.namespaceLog + ' ' + 'setForeignState not processed because Objects database not connected'
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                // read alias id
                adapterObjects.getObject(id, options, (err, obj) => {
                    if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                        // alias id can be a string or can have id.write
                        const aliasId =
                            typeof obj.common.alias.id.write === 'string'
                                ? obj.common.alias.id.write
                                : obj.common.alias.id;

                        // validate here because we use objects/states db directly
                        try {
                            this._utils.validateId(aliasId, true, null);
                        } catch (e) {
                            this._logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                            return tools.maybeCallbackWithError(
                                callback,
                                `Error validating alias id of ${id}: ${e.message}`
                            );
                        }

                        if (!adapterObjects) {
                            // if objects is no longer existing, we do not need to unsubscribe
                            this._logger.info(
                                this.namespaceLog +
                                    ' ' +
                                    'setForeignState not processed because Objects database not connected'
                            );
                            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                        }

                        // read object for formatting
                        adapterObjects.getObject(aliasId, options, (err, targetObj) => {
                            if (!adapterStates) {
                                // if states is no longer existing, we do not need to unsubscribe
                                this._logger.info(
                                    this.namespaceLog +
                                        ' ' +
                                        'setForeignState not processed because States database not connected'
                                );
                                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                            }

                            this.outputCount++;
                            adapterStates.setState(
                                aliasId,
                                tools.formatAliasValue(
                                    obj && obj.common,
                                    targetObj && targetObj.common,
                                    state,
                                    this._logger,
                                    this.namespaceLog
                                ),
                                callback
                            );
                        });
                    } else {
                        this._logger.warn(`${this.namespaceLog} ${err ? err.message : `Alias ${id} has no target 5`}`);
                        return tools.maybeCallbackWithError(callback, err ? err.message : `Alias ${id} has no target`);
                    }
                });
            } else {
                if (this.performStrictObjectChecks) {
                    if (!adapterObjects) {
                        // if objects is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            this.namespaceLog +
                                ' ' +
                                'setForeignState not processed because Objects database not connected'
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                    await this._utils.performStrictObjectCheck(id, state);
                }
                if (!adapterStates) {
                    // if states is no longer existing, we do not need to unsubscribe
                    this._logger.info(
                        this.namespaceLog + ' ' + 'setForeignState not processed because States database not connected'
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                this.outputCount++;
                adapterStates.setState(id, state, callback);
            }
        }
    }

    /**
     * Writes value into states DB for any instance, but only if state changed.
     *
     * This function can write values into states DB for all instances and system states too.
     * ack, options and callback are optional
     *
     * @alias setForeignStateChanged
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object|string|number|boolean} state simple value or object with attribues.
     *  If state is object and ack exists too as function argument, function argument has priority.
     *  <pre><code>
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
     *  </code></pre>
     * @param {boolean} [ack] optional is command(false) or status(true)
     * @param {object} [options] optional user context
     * @param {ioBroker.SetStateChangedCallback} [callback] optional return error and id
     *        <pre><code>
     *            function (err, id) {
     *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
     *            }
     *        </code></pre>
     */
    setForeignStateChanged(id, state, ack, options, callback) {
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

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                this.namespaceLog + ' ' + 'setForeignStateChanged not processed because States database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
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
            this._logger.info(this.namespaceLog + ' ' + `undefined is not a valid state value for id "${id}"`);
            // TODO: reactivate line below + test in in next controller version (02.05.2021)
            // return tools.maybeCallbackWithError(callback, 'undefined is not a valid state value');
        }

        if (ack !== undefined) {
            state.ack = ack;
        }

        // if state.from provided, we use it else, we set default property
        state.from =
            typeof state.from === 'string' && state.from !== '' ? state.from : `system.adapter.${this.namespace}`;
        state.user = (options ? options.user : '') || SYSTEM_ADMIN_USER;

        const mId = id.replace(FORBIDDEN_CHARS, '_');
        if (mId !== id) {
            this._logger.warn(`${this.namespaceLog} Used invalid characters: ${id} changed to ${mId}`);
            id = mId;
        }

        if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
            this._checkStates(id, options, 'setState', err => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    this._setStateChangedHelper(id, state, callback);
                }
            });
        } else {
            this._setStateChangedHelper(id, state, callback);
        }
    }

    getState(id: string, callback: ioBroker.GetStateCallback): void;
    getState(id: string, options: unknown, callback: ioBroker.GetStateCallback): void;

    /**
     * Read value from states DB.
     *
     * This function can read values from states DB for this adapter.
     * Only Ids that belong to this adapter can be read. So the function automatically adds "adapter.X." to ID.
     *
     * @alias getState
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object} options optional user context
     * @param {ioBroker.GetStateCallback} callback return result
     *        <pre><code>
     *            function (err, state) {
     *              if (err) adapter.log.error('Cannot read value: ' + err);
     *            }
     *        </code></pre>
     *
     *        See possible attributes of the state in @setState explanation
     */
    getState(id, options, callback?) {
        // get state does the same as getForeignState but fixes the id first
        id = this._utils.fixId(id, false);
        return this.getForeignState(id, options, callback);
    }

    getForeignState(id: string, callback: ioBroker.GetStateCallback): void;
    getForeignState(id: string, options: unknown, callback: ioBroker.GetStateCallback): void;

    /**
     * Read value from states DB for any instance and system state.
     *
     * This function can read values from states DB for all instances and adapters. It expects the full path of object ID.
     *
     * @alias getForeignState
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object} options optional user context
     * @param {ioBroker.GetStateCallback} callback return result
     *        <pre><code>
     *            function (err, state) {
     *              if (err) adapter.log.error('Cannot read value: ' + err);
     *            }
     *        </code></pre>
     *
     *        See possible attributes of the state in @setState explanation
     */
    getForeignState(id, options, callback?) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} getForeignState not processed because States database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} getForeignState not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
            this._checkStates(id, options, 'getState', (err, obj) => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    if (id.startsWith(ALIAS_STARTS_WITH)) {
                        if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                            // id can be string or can have attribute id.read
                            const aliasId =
                                // @ts-expect-error
                                typeof obj.common.alias.id.read === 'string'
                                    ? // @ts-expect-error
                                      obj.common.alias.id.read
                                    : obj.common.alias.id;

                            // validate here because we use objects/states db directly
                            try {
                                this._utils.validateId(aliasId, true, null);
                            } catch (e) {
                                this._logger.warn(
                                    `${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`
                                );
                                return tools.maybeCallbackWithError(
                                    callback,
                                    `Error validating alias id of ${id}: ${e.message}`
                                );
                            }

                            if (aliasId) {
                                if (this.oStates && this.oStates[aliasId]) {
                                    this._checkStates(aliasId, options, 'getState', (err, sourceObj) => {
                                        if (err) {
                                            return tools.maybeCallbackWithError(callback, err);
                                        } else {
                                            const state = deepClone(this.oStates[aliasId]);
                                            return tools.maybeCallbackWithError(
                                                callback,
                                                err,
                                                tools.formatAliasValue(
                                                    sourceObj && sourceObj.common,
                                                    obj.common,
                                                    state,
                                                    this._logger,
                                                    this.namespaceLog
                                                )
                                            );
                                        }
                                    });
                                } else {
                                    this._checkStates(aliasId, options, 'getState', (err, sourceObj) => {
                                        if (err) {
                                            return tools.maybeCallbackWithError(callback, err);
                                        } else {
                                            this.inputCount++;
                                            adapterStates.getState(aliasId, (err, state) =>
                                                tools.maybeCallbackWithError(
                                                    callback,
                                                    err,
                                                    tools.formatAliasValue(
                                                        sourceObj && sourceObj.common,
                                                        obj.common,
                                                        state,
                                                        this._logger,
                                                        this.namespaceLog
                                                    )
                                                )
                                            );
                                        }
                                    });
                                }
                            }
                        } else {
                            this._logger.warn(`${this.namespaceLog} Alias ${id} has no target 8`);
                            return tools.maybeCallbackWithError(callback, `Alias ${id} has no target`);
                        }
                    } else {
                        if (this.oStates && this.oStates[id]) {
                            return tools.maybeCallbackWithError(callback, null, this.oStates[id]);
                        } else {
                            adapterStates.getState(id, callback);
                        }
                    }
                }
            });
        } else {
            if (id.startsWith(ALIAS_STARTS_WITH)) {
                adapterObjects.getObject(id, (err, obj) => {
                    if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                        // id can be string or can have attribute id.read
                        const aliasId =
                            typeof obj.common.alias.id.read === 'string'
                                ? obj.common.alias.id.read
                                : obj.common.alias.id;

                        // validate here because we use objects/states db directly
                        try {
                            this._utils.validateId(aliasId, true, null);
                        } catch (e) {
                            this._logger.warn(`${this.namespaceLog} Error validating alias id of ${id}: ${e.message}`);
                            return tools.maybeCallbackWithError(
                                callback,
                                `Error validating alias id of ${id}: ${e.message}`
                            );
                        }

                        adapterObjects.getObject(aliasId, (err, sourceObj) => {
                            if (err) {
                                return tools.maybeCallbackWithError(callback, err);
                            }
                            if (this.oStates && this.oStates[aliasId]) {
                                const state = deepClone(this.oStates[aliasId]);
                                return tools.maybeCallbackWithError(
                                    callback,
                                    err,
                                    tools.formatAliasValue(
                                        sourceObj && sourceObj.common,
                                        obj.common,
                                        state,
                                        this._logger,
                                        this.namespaceLog
                                    )
                                );
                            } else {
                                this.inputCount++;
                                adapterStates.getState(aliasId, (err, state) => {
                                    return tools.maybeCallbackWithError(
                                        callback,
                                        err,
                                        tools.formatAliasValue(
                                            sourceObj && sourceObj.common,
                                            obj.common,
                                            state,
                                            this._logger,
                                            this.namespaceLog
                                        )
                                    );
                                });
                            }
                        });
                    } else {
                        this._logger.warn(`${this.namespaceLog} ${err ? err.message : `Alias ${id} has no target 9`}`);
                        return tools.maybeCallbackWithError(callback, err ? err.message : `Alias ${id} has no target`);
                    }
                });
            } else {
                if (this.oStates && this.oStates[id]) {
                    return tools.maybeCallbackWithError(callback, null, this.oStates[id]);
                } else {
                    this.inputCount++;
                    adapterStates.getState(id, callback);
                }
            }
        }
    }

    // find out default history instance
    private async _getDefaultHistory() {
        if (!this.defaultHistory) {
            // read default history instance from system.config
            let data;
            try {
                data = await this.getForeignObjectAsync('system.config', null);
            } catch {
                // ignore
            }

            if (data && data.common) {
                this.defaultHistory = data.common.defaultHistory;
            }
            if (data && data.native) {
                this._systemSecret = data.native.secret;
            }

            // if no default history set
            if (!this.defaultHistory) {
                let _obj;
                // read all adapters
                try {
                    _obj = await adapterObjects.getObjectViewAsync('system', 'instance', {
                        startkey: 'system.adapter.',
                        endkey: 'system.adapter.\u9999'
                    });
                } catch (e) {
                    // ignore
                }

                if (_obj && _obj.rows) {
                    for (let i = 0; i < _obj.rows.length; i++) {
                        if (_obj.rows[i].value.common && _obj.rows[i].value.common.type === 'storage') {
                            this.defaultHistory = _obj.rows[i].id.substring('system.adapter.'.length);
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

    /**
     * Read historian data for states of any instance or system state.
     *
     * This function can read values from history adapters like: history, sql, influxdb. It expects the full path of object ID.
     * Normally only foreign history has interest, so there is no getHistory and getForeignHistory
     *
     * Possible options:
     *
     *  - instance - (optional) name of instance, where to read the historian data, e.g. 'history.0', 'sql.1'. By default will be taken from system settings.
     *  - start - (optional) time in ms - Date.now()', by default is (now - 1 week)
     *  - end - (optional) time in ms - Date.now()', by default is (now + 5000 seconds)
     *  - step - (optional) used in aggregate (m4, max, min, average, total) step in ms of intervals
     *  - count - number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set.
     *  - from - if from field should be included in answer
     *  - ack - if ack field should be included in answer
     *  - q - if q field should be included in answer
     *  - addId - if id field should be included in answer
     *  - limit - do not return more entries than limit
     *  - ignoreNull - if null values should be include (false), replaced by last not null value (true) or replaced with 0 (0)
     *  - sessionId - (optional) identifier of request, will be returned back in the answer
     *  - aggregate - aggregate method:
     *      - minmax - used special algorithm. Splice the whole time range in small intervals and find for every interval max, min, start and end values.
     *      - max - Splice the whole time range in small intervals and find for every interval max value and use it for this interval (nulls will be ignored).
     *      - min - Same as max, but take minimal value.
     *      - average - Same as max, but take average value.
     *      - total - Same as max, but calculate total value.
     *      - count - Same as max, but calculate number of values (nulls will be calculated).
     *      - none - No aggregation at all. Only raw values in given period.
     *
     * @alias getHistory
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object} options see function description
     * @param {ioBroker.GetHistoryCallback} callback return result
     *        <pre><code>
     *            function (error, result, step, sessionId) {
     *              if (error) adapter.log.error('Cannot read value: ' + err);
     *            }
     *        </code></pre>
     *
     *        See possible attributes of the state in @setState explanation
     */
    async getHistory(id, options, callback) {
        try {
            this._utils.validateId(id, true, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
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
            } else {
                options.instance = this.defaultHistory;
            }
        }

        this.sendTo(options.instance || 'history.0', 'getHistory', { id: id, options: options }, res =>
            tools.maybeCallbackWithError(callback, res.error, res.result, res.step, res.sessionId)
        );
    }

    /**
     * Convert ID into object with device's, channel's and state's name.
     *
     * Convert "adapter.instance.D.C.S" in object {device: D, channel: C, state: S}
     * Convert ID to {device: D, channel: C, state: S}
     *
     * @alias idToDCS
     * @memberof Adapter
     * @param {string} id short or long string of ID like "stateID" or "adapterName.0.stateID".
     * @return {object} parsed ID as an object
     */
    idToDCS(id) {
        if (!id) {
            return null;
        }
        const parts = id.split('.');
        if (parts[0] + '.' + parts[1] !== this.namespace) {
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
     * @alias delState
     * @memberof Adapter
     * @param {string} id exactly object ID (without namespace)
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete object: ' + err);
     *            }
     *        </code></pre>
     */
    delState(id, options, callback) {
        try {
            this._utils.validateId(id, false, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        // delState does the same as delForeignState, but fixes the ID first
        id = this._utils.fixId(id);
        this.delForeignState(id, options, callback);
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
     * @alias delForeignState
     * @memberof Adapter
     * @param {string} id long string for ID like "adapterName.0.stateID".
     * @param {object} [options] optional argument to describe the user context
     * @param {ioBroker.ErrorCallback} [callback] return result function (err) {}
     */
    delForeignState(id, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                this.namespaceLog + ' ' + 'delForeignState not processed because States database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
            this._checkStates(id, options, 'delState', err => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    adapterStates.delState(id, callback);
                }
            });
        } else {
            adapterStates.delState(id, callback);
        }
    }

    // external signature
    getStates(pattern: string, callback: ioBroker.GetStatesCallback): void;
    getStates(pattern: string, options: unknown, callback: ioBroker.GetStatesCallback): void;

    /**
     * Read all states of this adapter, that pass the pattern
     *
     * Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
     * <pre><code>
     *     adapter.getStates('*', function (err, states) {
     *         for (var id in states) {
     *              adapter.log.debug('"' + id + '" = "' + states[id].val);
     *         }
     *     });
     * </code></pre>
     *
     * @alias getStates
     * @memberof Adapter
     * @param {string} pattern string in form 'adapter.0.*' or like this. It can be array of IDs too.
     * @param {object} options optional argument to describe the user context
     * @param {ioBroker.GetStatesCallback} callback return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
     */
    getStates(pattern, options, callback?) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        pattern = this._utils.fixId(pattern, true);
        this.getForeignStates(pattern, options, callback);
    }

    private _processStatesSecondary(
        keys: string[],
        targetObjs: (ioBroker.StateObject | null)[] | null,
        srcObjs: (ioBroker.StateObject | null)[] | null,
        callback: (err?: Error | null, result?: any) => void
    ) {
        adapterStates.getStates(keys, (err, arr) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            }

            const result: Record<string, { val: any; ts: number; q: number } | null> = {};

            for (let i = 0; i < keys.length; i++) {
                const obj = targetObjs && targetObjs[i];
                if (typeof arr[i] === 'string') {
                    try {
                        arr[i] = JSON.parse(arr[i]);
                    } catch {
                        // if it is not binary state
                        arr[i] < 2000 &&
                            this._logger.error(`${this.namespaceLog} Cannot parse state "${keys[i]}: ${arr[i]}`);
                    }
                }

                if (obj && obj.common && obj.common.alias) {
                    if (obj.common.alias.val !== undefined) {
                        result[obj._id] = { val: obj.common.alias.val, ts: Date.now(), q: 0 };
                    } else if (srcObjs[i]) {
                        result[obj._id] =
                            tools.formatAliasValue(
                                srcObjs[i].common,
                                obj.common,
                                arr[i] || null,
                                this._logger,
                                this.namespaceLog
                            ) || null;
                    } else {
                        result[obj._id || keys[i]] = arr[i] || null;
                    }
                } else {
                    result[(obj && obj._id) || keys[i]] = arr[i] || null;
                }
            }
            return tools.maybeCallbackWithError(callback, null, result);
        });
    }

    private async _processStates(
        keys: string[],
        targetObjs: (ioBroker.StateObject | null)[],
        callback: (err?: Error | null, result?: any) => void
    ) {
        let aliasFound;
        const aIds = keys.map(id => {
            if (typeof id === 'string' && id.startsWith(ALIAS_STARTS_WITH)) {
                aliasFound = true;
                return id;
            } else {
                return null;
            }
        });

        // if any ID from aliases found
        if (aliasFound) {
            // make a copy of original array
            keys = [...keys];

            // read aliases objects
            // @ts-expect-error
            targetObjs = await this._getObjectsByArray(aIds, targetObjs, this._options);
            const srcIds: string[] = [];
            // replace aliases ID with targets
            targetObjs.forEach((obj, i) => {
                if (obj && obj.common && obj.common.alias) {
                    // alias id can be string or can have attribute read (this is used by getStates -> so read is important)
                    const aliasId =
                        obj.common.alias.id && typeof obj.common.alias.id.read === 'string'
                            ? obj.common.alias.id.read
                            : obj.common.alias.id;

                    keys[i] = aliasId || null;
                    srcIds[i] = keys[i];
                }
            });

            // srcObjs and targetObjs could be merged
            const srcObjs = await this._getObjectsByArray(srcIds, null, this._options);
            // @ts-expect-error fix later
            this._processStatesSecondary(keys, targetObjs, srcObjs, callback);
        } else {
            this._processStatesSecondary(keys, null, null, callback);
        }
    }

    /**
     * Read all states of all adapters (and system states), that pass the pattern
     *
     * Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
     * <pre><code>
     *     adapter.getStates('*', function (err, states) {
     *         for (var id in states) {
     *              adapter.log.debug('"' + id + '" = "' + states[id].val);
     *         }
     *     });
     * </code></pre>
     *
     * @alias getForeignStates
     * @memberof Adapter
     * @param {string | string[]} pattern string in form 'adapter.0.*' or like this. It can be array of IDs too.
     * @param {object} options optional argument to describe the user context
     * @param {ioBroker.GetStatesCallback} callback return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
     */
    getForeignStates(pattern, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        if (typeof pattern === 'function') {
            callback = pattern;
            pattern = '*';
        }

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                this.namespaceLog + ' ' + 'getForeignStates not processed because States database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!adapterObjects) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                this.namespaceLog + ' ' + 'getForeignStates not processed because Objects database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (pattern instanceof RegExp) {
            this._logger.error(`${this.namespaceLog} Regexp is not supported for "getForeignStates"`);
            return tools.maybeCallbackWithError(callback, 'Regexp is not supported for "getForeignStates"');
        }

        if (!Array.isArray(pattern) && typeof pattern !== 'string') {
            this._logger.error(
                `${
                    this.namespaceLog
                } The Pattern for "getForeignStates" needs to be an Array or an String. ${typeof pattern} provided.`
            );
            return tools.maybeCallbackWithError(
                callback,
                `The Pattern for "getForeignStates" needs to be an Array or an String. ${typeof pattern} provided.`
            );
        }

        // if pattern is array
        if (Array.isArray(pattern)) {
            if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
                this._checkStates(pattern, options, 'getState', (err, keys, objs) => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else {
                        this._processStates(keys, objs, callback);
                    }
                });
            } else {
                this._processStates(pattern, options && options._objects, callback);
            }
        } else {
            // read first the keys for pattern
            let params = {};
            if (pattern && pattern !== '*') {
                params = {
                    startkey: pattern.replace(/\*/g, ''),
                    endkey: pattern.replace(/\*/g, '\u9999')
                };
            }
            let originalChecked = undefined;
            if (options.checked !== undefined) {
                originalChecked = options.checked;
            }
            options.checked = true;

            // in special maintenance mode, just returns all states. Aliases are not supported in this mode
            if (options.user === SYSTEM_ADMIN_USER && options.maintenance) {
                adapterStates.getKeys(pattern, (err, keys) => {
                    if (err) {
                        return tools.maybeCallbackWithError(callback, err);
                    } else {
                        this._processStatesSecondary(keys, null, null, callback);
                    }
                });
            }

            adapterObjects.getObjectView('system', 'state', params, options, (err, res) => {
                if (originalChecked !== undefined) {
                    options.checked = originalChecked;
                } else {
                    options.checked = undefined;
                }
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                }
                if (!res || !res.rows) {
                    return tools.maybeCallbackWithError(callback, null, {});
                }
                const keys = [];
                const objs = [];

                // filter out
                let regEx;
                // process patterns like "*.someValue". The patterns "someValue.*" will be processed by getObjectView
                if (pattern !== '*' && pattern[pattern.length - 1] !== '*') {
                    regEx = new RegExp(tools.pattern2RegEx(pattern));
                }
                for (let i = 0; i < res.rows.length; i++) {
                    const id = res.rows[i].id;
                    if (id && (!regEx || regEx.test(id))) {
                        keys.push(id);
                        objs.push(res.rows[i].value);
                    }
                }
                options._objects = objs;
                this.getForeignStates(keys, options, callback);
            });
        }
    }

    private async _addAliasSubscribe(
        aliasObj: ioBroker.StateObject,
        pattern: string,
        callback: ioBroker.ErrorCallback
    ): Promise<void> {
        if (aliasObj && aliasObj.common && aliasObj.common.alias && aliasObj.common.alias.id) {
            if (aliasObj.type !== 'state') {
                this._logger.warn(
                    `${this.namespaceLog} Expected alias ${aliasObj._id} to be of type "state", got "${aliasObj.type}"`
                );
                return tools.maybeCallbackWithError(
                    callback,
                    new Error(`Expected alias ${aliasObj._id} to be of type "state", got "${aliasObj.type}"`)
                );
            }

            // id can be string or can have attribute read
            const sourceId =
                typeof aliasObj.common.alias.id.read === 'string'
                    ? aliasObj.common.alias.id.read
                    : aliasObj.common.alias.id;

            // validate here because we use objects/states db directly
            try {
                this._utils.validateId(sourceId, true, null);
            } catch (e) {
                this._logger.warn(`${this.namespaceLog} Error validating alias id of ${aliasObj._id}: ${e.message}`);
                return tools.maybeCallbackWithError(
                    callback,
                    new Error(`Error validating alias id of ${aliasObj._id}: ${e.message}`)
                );
            }

            let aliasDetails;
            if (!this.aliases.has(sourceId)) {
                aliasDetails = { source: null, targets: [] };
                this.aliases.set(sourceId, aliasDetails);
            } else {
                aliasDetails = this.aliases.get(sourceId);
            }

            const targetEntry = {
                alias: deepClone(aliasObj.common.alias),
                id: aliasObj._id,
                pattern,
                type: aliasObj.common.type,
                max: aliasObj.common.max,
                min: aliasObj.common.min,
                unit: aliasObj.common.unit
            };

            aliasDetails.targets.push(targetEntry);

            if (!aliasDetails.source) {
                let sourceObj;
                try {
                    await adapterStates.subscribe(sourceId);
                    sourceObj = await adapterObjects.getObject(sourceId, this._options);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }

                if (sourceObj && sourceObj.common) {
                    if (!this.aliases.has(sourceObj._id)) {
                        // TODO what means this, we ensured alias existed, did some async stuff now its gone -> alias has been deleted?
                        this._logger.error(
                            `${
                                this.namespaceLog
                            } Alias subscription error. Please check your alias definitions: sourceId=${sourceId}, sourceObj=${JSON.stringify(
                                sourceObj
                            )}`
                        );
                    } else {
                        aliasDetails.source = {
                            min: sourceObj.common.min,
                            max: sourceObj.common.max,
                            type: sourceObj.common.type,
                            unit: sourceObj.common.unit
                        };
                    }
                }

                return tools.maybeCallback(callback);
            } else {
                return tools.maybeCallback(callback);
            }
        } else if (aliasObj && aliasObj.type === 'state') {
            // if state and no id given -> if no state just ignore it
            this._logger.warn(`${this.namespaceLog} Alias ${aliasObj._id} has no target 12`);
            return tools.maybeCallbackWithError(callback, new Error(`Alias ${aliasObj._id} has no target 12`));
        } else {
            return tools.maybeCallback(callback);
        }
    }

    private async _removeAliasSubscribe(
        sourceId: string,
        aliasObj: number | Record<string, any>,
        callback?: () => void
    ): Promise<void> {
        if (!this.aliases.has(sourceId)) {
            return tools.maybeCallback(callback);
        }

        // remove from targets array
        // @ts-expect-error
        const pos = typeof aliasObj === 'number' ? aliasObj : this.aliases.get(sourceId).targets.indexOf(aliasObj);

        if (pos !== -1) {
            // @ts-expect-error
            this.aliases.get(sourceId).targets.splice(pos, 1);

            // unsubscribe if no more aliases exists
            // @ts-expect-error
            if (!this.aliases.get(sourceId).targets.length) {
                this.aliases.delete(sourceId);
                await adapterStates.unsubscribe(sourceId);
            }
        }
        return tools.maybeCallback(callback);
    }

    subscribeForeignStates(pattern: string, callback?: ioBroker.ErrorCallback): void;
    subscribeForeignStates(pattern: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Subscribe for changes on all states of all adapters (and system states), that pass the pattern
     *
     * Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
     * <pre><code>
     *     adapter.subscribeForeignStates('adapterName.X.*');
     * </code></pre>
     *
     * @alias subscribeForeignStates
     * @memberof Adapter
     * @param {string | string[]} pattern string in form 'adapter.0.*' or like this. It can be array of IDs too.
     * @param {object} [options] optional argument to describe the user context
     * @param {ioBroker.ErrorCallback} [callback] return result function (err) {}
     */
    async subscribeForeignStates(pattern, options, callback?) {
        pattern = pattern || '*';

        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (pattern instanceof RegExp) {
            return tools.maybeCallbackWithError(
                callback,
                `Regexp is not supported for "subscribeForeignStates", received "${pattern.toString()}"`
            );
        }

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} subscribeForeignStates not processed because States database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        // Todo check rights for options
        await this._autoSubscribeOn();

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} subscribeForeignStates not processed because States database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }
        if (!adapterObjects) {
            this._logger.info(
                `${this.namespaceLog} subscribeForeignStates not processed because Objects database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        // compare if this pattern for one of auto-subscribe adapters
        for (const autoSubEntry of this.autoSubscribe) {
            if (typeof pattern === 'string' && (pattern === '*' || pattern.startsWith(`${autoSubEntry}.`))) {
                // put this pattern into adapter list
                let state;
                try {
                    state = await adapterStates.getState(`system.adapter.${autoSubEntry}.subscribes`);
                } catch {
                    // ignore
                }
                state = state || {};
                state.val = state.val || '{}';
                let subs;
                try {
                    subs = JSON.parse(state.val);
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
                adapterStates.setState(`system.adapter.${autoSubEntry}.subscribes`, JSON.stringify(subs));
            }
        }

        if (Array.isArray(pattern)) {
            // get all aliases
            const aliasesIds = pattern
                .map(id => (typeof id === 'string' && id.startsWith(ALIAS_STARTS_WITH) ? id : null))
                .filter(id => id);

            // get all non aliases
            const nonAliasesIds = pattern
                .map(id => (typeof id === 'string' && !id.startsWith(ALIAS_STARTS_WITH) ? id : null))
                .filter(id => id);

            for (const aliasPattern of pattern) {
                if (
                    typeof aliasPattern === 'string' &&
                    (aliasPattern.startsWith(ALIAS_STARTS_WITH) || aliasPattern.includes('*')) &&
                    !this.aliasPatterns.has(aliasPattern)
                ) {
                    // its a new alias conform pattern to store
                    this.aliasPatterns.add(aliasPattern);
                }
            }

            const promises = [];

            if (aliasesIds.length) {
                if (!this._aliasObjectsSubscribed) {
                    this._aliasObjectsSubscribed = true;
                    adapterObjects.subscribe(`${ALIAS_STARTS_WITH}*`);
                }

                const aliasObjs = await this._getObjectsByArray(aliasesIds, null, options);

                for (const aliasObj of aliasObjs) {
                    promises.push(new Promise(resolve => this._addAliasSubscribe(aliasObj, aliasObj._id, resolve)));
                }
            }

            if (nonAliasesIds.length) {
                for (const id of nonAliasesIds) {
                    promises.push(new Promise(resolve => adapterStates.subscribeUser(id, resolve)));
                }
            }

            try {
                await Promise.all(promises);
            } catch (e) {
                this._logger.error(`${this.namespaceLog} Error on "subscribeForeignStates": ${e.message}`);
            }
            return tools.maybeCallback(callback);
        } else if (typeof pattern === 'string' && pattern.includes('*')) {
            if (pattern === '*' || pattern.startsWith(ALIAS_STARTS_WITH)) {
                if (!this._aliasObjectsSubscribed) {
                    this._aliasObjectsSubscribed = true;
                    adapterObjects.subscribe(`${ALIAS_STARTS_WITH}*`);
                }

                // read all aliases
                try {
                    const objs = await this.getForeignObjectsAsync(pattern, null, null, options);
                    const promises = [];
                    if (!this.aliasPatterns.has(pattern)) {
                        // its a new pattern to store
                        this.aliasPatterns.add(pattern);
                    }

                    for (const id of Object.keys(objs)) {
                        // If alias
                        if (id.startsWith(ALIAS_STARTS_WITH)) {
                            const aliasObj = objs[id];
                            promises.push(new Promise(resolve => this._addAliasSubscribe(aliasObj, pattern, resolve)));
                        }
                    }

                    try {
                        await Promise.all(promises);
                    } catch (e) {
                        this._logger.error(`${this.namespaceLog} Error on "subscribeForeignStates": ${e.message}`);
                    }

                    if (!adapterStates) {
                        // if states is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            this.namespaceLog +
                                ' ' +
                                'subscribeForeignStates not processed because States database not connected'
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    if (promises.length && pattern !== '*') {
                        return tools.maybeCallback(callback);
                    } else {
                        // no alias objects found or pattern *
                        adapterStates.subscribeUser(pattern, callback);
                    }
                } catch (e) {
                    this._logger.warn(`${this.namespaceLog} Cannot subscribe to ${pattern}: ${e.message}`);
                    return tools.maybeCallbackWithError(callback, e);
                }
            } else {
                adapterStates.subscribeUser(pattern, callback);
            }
        } else if (typeof pattern === 'string' && pattern.startsWith(ALIAS_STARTS_WITH)) {
            if (!this._aliasObjectsSubscribed) {
                this._aliasObjectsSubscribed = true;
                adapterObjects.subscribe(`${ALIAS_STARTS_WITH}*`);
            }

            // aliases['sourceId'] = {
            //     source: {common attributes},
            //     targets: [
            //         {
            //             alias: {},
            //             id: 'aliasId',
            //             pattern: 'some pattern',
            //             type: stateType,
            //             max: number,
            //             min: number,
            //         }
            //     ]
            // };

            // just read one alias Object
            try {
                const aliasObj = await adapterObjects.getObjectAsync(pattern, options);
                if (aliasObj) {
                    // cb will be called, but await for catching promisified part
                    await this._addAliasSubscribe(aliasObj, pattern, callback);
                } else {
                    return tools.maybeCallback(callback);
                }
            } catch (e) {
                this._logger.warn(`${this.namespaceLog} cannot subscribe on alias "${pattern}": ${e.message}`);
            }
        } else {
            adapterStates.subscribeUser(pattern, callback);
        }
    }

    /**
     * Unsubscribe for changes for given pattern
     *
     * This function allows to unsubscribe from changes. The pattern must be equal to requested one.
     *
     * <pre><code>
     *     adapter.subscribeForeignStates('adapterName.X.*');
     *     adapter.unsubscribeForeignStates('adapterName.X.abc*'); // This will not work
     *     adapter.unsubscribeForeignStates('adapterName.X.*'); // Valid unsubscribe
     * </code></pre>
     *
     * @alias unsubscribeForeignStates
     * @memberof Adapter
     * @param {string | string[]} pattern string in form 'adapter.0.*'. Must be the same as subscribe.
     * @param {object} [options] optional argument to describe the user context
     * @param {ioBroker.ErrorCallback} [callback] return result function (err) {}
     */
    async unsubscribeForeignStates(pattern, options, callback) {
        pattern = pattern || '*';

        // Todo check rights for options
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (pattern instanceof RegExp) {
            return tools.maybeCallbackWithError(
                callback,
                `Regexp is not supported for "unsubscribeForeignStates", received "${pattern.toString()}"`
            );
        }

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                this.namespaceLog + ' ' + 'unsubscrubeForeignStates not processed because States database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (this.autoSubscribe && typeof pattern === 'string') {
            for (const autoSub of this.autoSubscribe) {
                if (pattern === '*' || pattern.substring(0, autoSub.length + 1) === `${autoSub}.`) {
                    // remove this pattern from adapter list
                    let state;
                    try {
                        state = await adapterStates.getState(`system.adapter.${autoSub}.subscribes`);
                    } catch {
                        // ignore
                    }
                    if (!state || !state.val) {
                        continue;
                    }
                    let subs;
                    try {
                        subs = JSON.parse(state.val);
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
                    adapterStates.setState(`system.adapter.${autoSub}.subscribes`, JSON.stringify(subs));
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
        } else if (typeof pattern === 'string' && (pattern.includes('*') || pattern.startsWith(ALIAS_STARTS_WITH))) {
            if (pattern === '*' || pattern.startsWith(ALIAS_STARTS_WITH)) {
                aliasPattern = pattern; // check all aliases
                if (pattern === '*') {
                    promises.push(adapterStates.unsubscribeUser(pattern));
                }
            } else {
                promises.push(adapterStates.unsubscribeUser(pattern));
            }
        } else {
            promises.push(adapterStates.unsubscribeUser(pattern));
        }

        // if pattern known, remove it from alias patterns to not subscribe to further matching aliases
        this.aliasPatterns.delete(aliasPattern);

        if (aliasPattern) {
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
            adapterObjects.unsubscribe(`${ALIAS_STARTS_WITH}*`);
        }
        return tools.maybeCallback(callback);
    }

    subscribeStates(pattern: string, callback?: ioBroker.ErrorCallback): void;
    subscribeStates(pattern: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Subscribe for changes on all states of this instance, that pass the pattern
     *
     * Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
     * <pre><code>
     *     adapter.subscribeStates('*'); // subscribe for all states of this adapter
     * </code></pre>
     *
     * @alias subscribeStates
     * @memberof Adapter
     * @param {string} pattern string in form 'adapter.0.*' or like this. Only string allowed
     * @param {object} [options] optional argument to describe the user context
     * @param {ioBroker.ErrorCallback} [callback]
     */
    subscribeStates(pattern, options, callback?) {
        // Todo check rights for options
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                this.namespaceLog + ' ' + 'subscribeStates not processed because States database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        // Exception. Handle the '*' case automatically
        if (!pattern || pattern === '*') {
            adapterStates.subscribeUser(`${this.namespace}.*`, callback);
        } else {
            pattern = this._utils.fixId(pattern, true);
            adapterStates.subscribeUser(pattern, callback);
        }
    }

    unsubscribeStates(pattern: string, callback?: ioBroker.ErrorCallback): void;
    unsubscribeStates(pattern: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Unsubscribe for changes for given pattern for own states.
     *
     * This function allows to unsubscribe from changes. The pattern must be equal to requested one.
     *
     * <pre><code>
     *     adapter.subscribeForeignStates('*');
     *     adapter.unsubscribeForeignStates('abc*'); // This will not work
     *     adapter.unsubscribeForeignStates('*');    // Valid unsubscribe
     * </code></pre>
     *
     * @alias unsubscribeStates
     * @memberof Adapter
     * @param {string} pattern string in form 'adapter.0.*'. Must be the same as subscribe.
     * @param {object} [options] optional argument to describe the user context
     * @param {ioBroker.ErrorCallback} [callback]
     */
    unsubscribeStates(pattern, options, callback) {
        // Todo check rights for options
        if (typeof options === 'function') {
            callback = options;
            options = null;
        }

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} unsubscribeStates not processed because States database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!pattern || pattern === '*') {
            adapterStates.unsubscribeUser(`${this.namespace}.*`, callback);
        } else {
            pattern = this._utils.fixId(pattern, true);
            adapterStates.unsubscribeUser(pattern, callback);
        }
    }

    setForeignBinaryState(id: string, binary: Buffer, callback: ioBroker.SetStateCallback): void;
    setForeignBinaryState(id: string, binary: Buffer, options: unknown, callback: ioBroker.SetStateCallback): void;

    /**
     * Write binary block into redis, e.g image
     *
     * @alias setForeignBinaryState
     * @memberof Adapter
     *
     * @param {string} id of state
     * @param {Buffer} binary data
     * @param {object} [options] optional
     * @param {ioBroker.ErrorCallback} [callback]
     *
     */
    async setForeignBinaryState(id, binary, options, callback?) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        if (this.performStrictObjectChecks) {
            // obj needs to exist and has to be of type "file" - custom check for binary state
            try {
                if (!adapterObjects) {
                    this._logger.info(
                        `${this.namespaceLog} setBinaryState not processed because Objects database not connected`
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                const obj = await adapterObjects.getObjectAsync(id);

                // at first check object existence
                if (!obj) {
                    this._logger.warn(
                        `${this.namespaceLog} Binary state "${id}" has no existing object, this might lead to an error in future versions`
                    );
                }

                // for a state object we require common.type to exist
                if (obj.common && obj.common.type) {
                    if (obj.common.type !== 'file') {
                        this._logger.info(
                            `${this.namespaceLog} Binary state object has to be type "file" but is "${obj.common.type}"`
                        );
                    }
                }
            } catch (e) {
                this._logger.warn(
                    `${this.namespaceLog} Could not perform strict object check of binary state ${id}: ${e.message}`
                );
            }
        }

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} setBinaryState not processed because States database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        // we need at least user or group for checkStates - if no given assume admin
        if (!options || !options.user) {
            options = options || {};
            options.user = SYSTEM_ADMIN_USER;
        }

        if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
            // always read according object to set the binary flag
            this._checkStates(id, options, 'setState', (err, obj) => {
                if (!err && !obj) {
                    return tools.maybeCallbackWithError(callback, 'Object does not exist');
                } else if (!err && obj && !('binary' in obj)) {
                    // @ts-expect-error probably need to adjust types
                    obj.binary = true;

                    if (!adapterObjects) {
                        this._logger.info(
                            `${this.namespaceLog} setBinaryState not processed because Objects database not connected`
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    adapterObjects.setObject(id, obj, err => {
                        if (err) {
                            return tools.maybeCallbackWithError(callback, err);
                        } else {
                            if (!adapterStates) {
                                // if states is no longer existing, we do not need to unsubscribe
                                this._logger.info(
                                    `${this.namespaceLog} setBinaryState not processed because States database not connected`
                                );
                                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                            }

                            this.outputCount++;
                            adapterStates.setBinaryState(id, binary, callback);
                        }
                    });
                } else if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    if (!adapterStates) {
                        // if states is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            `${this.namespaceLog} setBinaryState not processed because States database not connected`
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    this.outputCount++;
                    adapterStates.setBinaryState(id, binary, callback);
                }
            });
        } else {
            this.outputCount++;
            adapterStates.setBinaryState(id, binary, callback);
        }
    }

    setBinaryState(id: string, binary: Buffer, callback: ioBroker.SetStateCallback): void;
    setBinaryState(id: string, binary: Buffer, options: unknown, callback: ioBroker.SetStateCallback): void;

    /**
     * Same as setForeignBinaryState but prefixes the own namespace to the id
     *
     * @alias setBinaryState
     * @memberof Adapter
     *
     * @param {string} id of state
     * @param {Buffer} binary data
     * @param {object} [options] optional
     * @param {ioBroker.ErrorCallback} [callback]
     */
    setBinaryState(id, binary, options, callback?) {
        // TODO: call fixId as soon as adapters are migrated to setForeignBinaryState
        // id = this._utils.fixId(id, false);
        return this.setForeignBinaryState(id, binary, options, callback);
    }

    getForeignBinaryState(id: string, callback: ioBroker.GetBinaryStateCallback): void;
    getForeignBinaryState(id: string, options: unknown, callback: ioBroker.GetBinaryStateCallback): void;

    /**
     * Read a binary block from redis, e.g. an image
     *
     * @param {string} id The state ID
     * @param {object} options optional
     * @param {ioBroker.GetBinaryStateCallback} callback
     */
    getForeignBinaryState(id, options, callback?) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                this.namespaceLog + ' ' + 'getBinaryState not processed because States database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        // we need at least user or group for checkStates - if no given assume admin
        if (!options || !options.user) {
            options = options || {};
            options.user = SYSTEM_ADMIN_USER;
        }
        // always read according object to set the binary flag
        this._checkStates(id, options, 'getState', (err, obj) => {
            if (err) {
                return tools.maybeCallbackWithError(callback, err);
            } else {
                adapterStates.getBinaryState(id, (err, data) => {
                    if (!err && data && obj && !obj.binary) {
                        obj.binary = true;
                        adapterObjects.setObject(id, obj, err => {
                            if (err) {
                                return tools.maybeCallbackWithError(callback, err);
                            } else {
                                return tools.maybeCallbackWithError(callback, null, data);
                            }
                        });
                    } else {
                        // if no buffer, and state marked as not binary
                        if (!err && !data && obj && !obj.binary) {
                            return tools.maybeCallbackWithError(callback, 'State is not binary');
                        } else {
                            return tools.maybeCallbackWithError(callback, err, data);
                        }
                    }
                });
            }
        });
    }

    getBinaryState(id: string, callback: ioBroker.GetBinaryStateCallback): void;
    getBinaryState(id: string, options: unknown, callback: ioBroker.GetBinaryStateCallback): void;

    /**
     * Same as getForeignBinaryState but prefixes the own namespace to the id
     *
     * @param {string} id The state ID
     * @param {object} options optional
     * @param {ioBroker.GetBinaryStateCallback} callback
     */
    getBinaryState(id, options, callback) {
        // TODO: fixId as soon as all adapters are migrated to setForeignBinaryState
        // id =this._utils.fixId(id);
        return this.getForeignBinaryState(id, options, callback);
    }

    delForeignBinaryState(id: string, callback?: ioBroker.ErrorCallback): void;
    delForeignBinaryState(id: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Deletes binary state
     *
     * @alias delForeignBinaryState
     * @memberof Adapter
     *
     * @param {string} id
     * @param {object} [options]
     * @param {ioBroker.ErrorCallback} [callback]
     *
     */
    delForeignBinaryState(id, options, callback?) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }

        if (!adapterStates) {
            // if states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                this.namespaceLog + ' ' + 'delBinaryState not processed because States database not connected'
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        if (options && options.user && options.user !== SYSTEM_ADMIN_USER) {
            this._checkStates(id, options, 'delState', err => {
                if (err) {
                    return tools.maybeCallbackWithError(callback, err);
                } else {
                    adapterStates.delBinaryState(id, callback);
                }
            });
        } else {
            adapterStates.delBinaryState(id, callback);
        }
    }

    delBinaryState(id: string, callback?: ioBroker.ErrorCallback): void;
    delBinaryState(id: string, options: unknown, callback?: ioBroker.ErrorCallback): void;

    /**
     * Deletes binary state but prefixes the own namespace to the id
     *
     * @alias delBinaryState
     * @memberof Adapter
     *
     * @param {string} id
     * @param {object} [options]
     * @param {ioBroker.ErrorCallback} [callback]
     *
     */
    delBinaryState(id, options, callback?) {
        // TODO: call fixId as soon as adapters are migrated to setForeignBinaryState
        // id = this._utils.fixId(id, false);
        return this.delForeignBinaryState(id, options, callback);
    }

    getPluginInstance(name: string): ioBroker.Plugin | null;

    /**
     * Return plugin instance
     *
     * @param name {string} name of the plugin to return
     * @returns {object} plugin instance or null if not existent or not isActive
     */
    getPluginInstance(name: unknown): ioBroker.Plugin | null {
        if (!this.pluginHandler) {
            return null;
        }
        // @ts-expect-error
        return this.pluginHandler.getPluginInstance(name);
    }

    getPluginConfig(name: string): Record<string, any> | null;

    /**
     * Return plugin configuration
     *
     * @param name {string} name of the plugin to return
     * @returns {object} plugin configuration or null if not existent or not isActive
     */
    getPluginConfig(name: unknown): Record<string, any> | null {
        if (!this.pluginHandler) {
            return null;
        }
        // @ts-expect-error
        return this.pluginHandler.getPluginConfig(name);
    }

    private async _autoSubscribeOn(): Promise<void> {
        if (!this.autoSubscribe && adapterObjects) {
            try {
                // collect all
                const res = await adapterObjects.getObjectViewAsync('system', 'instance', {
                    startkey: 'system.adapter.',
                    endkey: 'system.adapter.\u9999'
                });

                if (res && res.rows) {
                    this.autoSubscribe = [];
                    for (const row of res.rows) {
                        if (row.value.common.subscribable) {
                            const _id = row.id.substring(15); // cut system.adapter.
                            if (!this.autoSubscribe.includes(_id)) {
                                this.autoSubscribe.push(_id);
                            }
                        }
                    }
                }

                // because of autoSubscribe
                await adapterObjects.subscribeAsync('system.adapter.*');
            } catch {
                // ignore
            }
        }
    }

    getSuitableLicenses(all: boolean): Promise<any[]>;

    /**
     * This method returns the list of license that can be used by this adapter
     * @param {boolean} all if return the licenses, that used by other instances (true) or only for this instance (false)
     * @returns {Promise<object[]>} list of suitable licenses
     */
    async getSuitableLicenses(all) {
        const licenses: any[] = [];
        try {
            const obj = await this.getForeignObjectAsync('system.licenses');
            const uuidObj = await this.getForeignObjectAsync('system.meta.uuid');
            let uuid;
            if (!uuidObj || !uuidObj.native || !uuidObj.native.uuid) {
                this._logger.warn(this.namespaceLog + ' No UUID found!');
                return licenses;
            } else {
                uuid = uuidObj.native.uuid;
            }

            if (obj && obj.native && obj.native.licenses && obj.native.licenses.length) {
                const now = Date.now();
                const cert = fs.readFileSync(path.join(__dirname, '..', '..', 'cert', 'cloudCert.crt'));
                const version = semver.major(this.pack.version);

                obj.native.licenses.forEach(license => {
                    try {
                        const decoded = jwt.verify(license.json, cert);
                        if (
                            decoded.name &&
                            (!decoded.valid_till ||
                                decoded.valid_till === '0000-00-00 00:00:00' ||
                                new Date(decoded.valid_till).getTime() > now)
                        ) {
                            if (
                                decoded.name.startsWith(`iobroker.${this.name}`) &&
                                (all || !license.usedBy || license.usedBy === this.namespace)
                            ) {
                                // Licenses for version ranges 0.x and 1.x are handled identically and are valid for both version ranges.
                                //
                                // If license is for adapter with version 0 or 1
                                if (
                                    decoded.version === '&lt;2' ||
                                    decoded.version === '<2' ||
                                    decoded.version === '<1' ||
                                    decoded.version === '<=1'
                                ) {
                                    // check the current adapter major version
                                    if (version !== 0 && version !== 1) {
                                        return;
                                    }
                                } else if (decoded.version && decoded.version !== version) {
                                    // Licenses for adapter versions >=2 need to match to the adapter major version
                                    // which means that a new major version requires new licenses if it would be "included"
                                    // in last purchase

                                    // decoded.version could be only '<2' or direct version, like "2", "3" and so on
                                    return;
                                }
                                if (decoded.uuid && decoded.uuid !== uuid) {
                                    // License is not for this server
                                    return;
                                }

                                // remove free license if commercial license found
                                if (decoded.invoice !== 'free') {
                                    const pos = licenses.findIndex(item => item.invoice === 'free');
                                    if (pos !== -1) {
                                        licenses.splice(pos, 1);
                                    }
                                }
                                license.decoded = decoded;
                                licenses.push(license);
                            }
                        }
                    } catch (err) {
                        this._logger.error(
                            `${this.namespaceLog} Cannot decode license "${license.name}": ${err.message}`
                        );
                    }
                });
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
        });

        return licenses;
    }

    private async _init(): Promise<void> {
        /**
         * Initiates the databases
         */
        const _initDBs = () => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            initObjects(() => {
                if (this.inited) {
                    this.log && this._logger.warn(`${this.namespaceLog} Reconnection to DB.`);
                    return;
                }

                this.inited = true;
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                initStates(prepareInitAdapter);
            });
        };

        // If installed as npm module
        if (this._options.dirname) {
            this.adapterDir = this._options.dirname.replace(/\\/g, '/');
        } else {
            this.adapterDir = tools.getAdapterDir(this._options.name);

            if (!this.adapterDir) {
                this._logger.error(`${this.namespaceLog} Cannot find directory of adapter ${this._options.name}`);
                this.terminate(EXIT_CODES.CANNOT_FIND_ADAPTER_DIR);
            }
        }

        if (fs.existsSync(`${this.adapterDir}/package.json`)) {
            this.pack = fs.readJSONSync(`${this.adapterDir}/package.json`);
        } else {
            this._logger.info(`${this.namespaceLog} Non npm module. No package.json`);
        }

        if (!this.pack || !this.pack.io) {
            if (fs.existsSync(`${this.adapterDir}/io-package.json`)) {
                this.ioPack = fs.readJSONSync(`${this.adapterDir}/io-package.json`);
            } else {
                this._logger.error(`${this.namespaceLog} Cannot find: ${this.adapterDir}/io-package.json`);
                this.terminate(EXIT_CODES.CANNOT_FIND_ADAPTER_DIR);
            }
        } else {
            this.ioPack = this.pack.io;
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

        let States: typeof StatesInRedisClient;
        if (this._config.states && this._config.states.type) {
            try {
                States = (await import(`@iobroker/db-states-${this._config.states.type}`)).Client;
            } catch (err) {
                throw new Error(`Unknown states type: ${this._config.states.type}: ${err.message}`);
            }
        } else {
            States = getStatesConstructor();
        }

        let Objects: typeof ObjectsInRedisClient;
        if (this._config.objects && this._config.objects.type) {
            try {
                Objects = (await import(`@iobroker/db-objects-${this._config.objects.type}`)).Client;
            } catch (err) {
                throw new Error(`Unknown objects type: ${this._config.objects.type}: ${err.message}`);
            }
        } else {
            Objects = getObjectsConstructor();
        }

        const ifaces = os.networkInterfaces();
        const ipArr = [];
        for (const dev of Object.keys(ifaces)) {
            ifaces[dev].forEach(details => !details.internal && ipArr.push(details.address));
        }

        this.namespaceLog = this.namespace + (this.startedInCompactMode ? ' (COMPACT)' : ` (${process.pid})`);

        // Can be later deleted if no more appears TODO: check
        this.inited = false;

        const extendObjects = async (tasks, callback) => {
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
                // todo: in the future we will not create this object
                this._logger.warn(`${this.namespaceLog} Object ${task._id} is invalid: ${e.message}`);
                this._logger.warn(
                    `${this.namespaceLog} This object will not be created in future versions. Please report this to the developer.`
                );
            }

            if (!adapterObjects) {
                this._logger.info(
                    `${this.namespaceLog} extendObjects not processed because Objects database not connected.`
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
                if (!adapterStates) {
                    this._logger.info(
                        `${this.namespaceLog} extendObjects not processed because States database not connected.`
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }
                this.outputCount++;
                adapterStates.setState(
                    task._id,
                    {
                        val: state,
                        from: `system.adapter.${this.namespace}`,
                        ack: true
                    },
                    () => setImmediate(extendObjects, tasks, callback)
                );
            } else {
                setImmediate(extendObjects, tasks, callback);
            }
        };

        const createInstancesObjects = async (instanceObj: ioBroker.InstanceObject) => {
            let objs;

            if (
                instanceObj &&
                instanceObj.common &&
                !instanceObj.common.onlyWWW &&
                instanceObj.common.mode !== 'once'
            ) {
                objs = tools.getInstanceIndicatorObjects(this.namespace, instanceObj.common.wakeup);
            } else {
                objs = [];
            }

            if (instanceObj && instanceObj.instanceObjects) {
                for (const obj of instanceObj.instanceObjects) {
                    if (!obj._id.startsWith(this.namespace)) {
                        // instanceObjects are normally defined without namespace prefix
                        obj._id = obj._id === '' ? this.namespace : `${this.namespace}.${obj._id}`;
                    }

                    if (obj && (obj._id || obj.type === 'meta')) {
                        if (obj.common) {
                            if (obj.common.name) {
                                // if name has many languages
                                if (typeof obj.common.name === 'object') {
                                    Object.keys(obj.common.name).forEach(
                                        lang =>
                                            (obj.common.name[lang] = obj.common.name[lang].replace(
                                                '%INSTANCE%',
                                                this.instance
                                            ))
                                    );
                                } else {
                                    obj.common.name = obj.common.name.replace('%INSTANCE%', this.instance);
                                }
                            }
                            if (obj.common.desc) {
                                // if description has many languages
                                if (typeof obj.common.desc === 'object') {
                                    Object.keys(obj.common.desc).forEach(
                                        lang =>
                                            (obj.common.desc[lang] = obj.common.desc[lang].replace(
                                                '%INSTANCE%',
                                                this.instance
                                            ))
                                    );
                                } else {
                                    obj.common.desc = obj.common.desc.replace('%INSTANCE%', this.instance);
                                }
                            }

                            if (obj.type === 'state' && obj.common.def !== undefined) {
                                // default value given - if obj non existing we have to set it
                                try {
                                    const checkObj = await this.getForeignObjectAsync(obj._id);
                                    if (!checkObj) {
                                        obj.state = obj.common.def;
                                    }
                                } catch (e) {
                                    this._logger.warn(
                                        `${this.namespaceLog} Did not add default (${obj.common.def}) value on creation of ${obj._id}: ${e.message}`
                                    );
                                }
                            }
                        }

                        objs.push(obj);
                    } else {
                        this._logger.error(
                            `${this.namespaceLog} ${this._options.name}.${
                                this.instance
                            } invalid instance object: ${JSON.stringify(obj)}`
                        );
                    }
                }
            }

            return new Promise(resolve => {
                extendObjects(objs, resolve);
            });
        };

        /**
         * Called if states and objects successfully initialized
         */
        const prepareInitAdapter = () => {
            if (this.terminated) {
                return;
            }

            if (this._options.instance !== undefined) {
                initAdapter(this._options);
            } else {
                adapterStates.getState(`system.adapter.${this.namespace}.alive`, (err, resAlive) => {
                    adapterStates.getState(`system.adapter.${this.namespace}.sigKill`, (err, killRes) => {
                        if (killRes && killRes.val !== undefined) {
                            killRes.val = parseInt(killRes.val, 10);
                        }
                        if (
                            !this._config.isInstall &&
                            this.startedInCompactMode &&
                            killRes &&
                            !killRes.ack &&
                            killRes.val === -1
                        ) {
                            this._logger.error(
                                `${this.namespaceLog} ${this._options.name}.${instance} needs to be stopped because not correctly started in compact mode`
                            );
                            this.terminate(EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);
                        } else if (
                            !this._config.forceIfDisabled &&
                            !this._config.isInstall &&
                            !this.startedInCompactMode &&
                            killRes &&
                            killRes.from &&
                            killRes.from.startsWith('system.host.') &&
                            killRes.ack &&
                            !isNaN(killRes.val) &&
                            killRes.val !== process.pid
                        ) {
                            this._logger.error(
                                `${this.namespaceLog} ${this._options.name}.${instance} invalid process id scenario ${killRes.val} vs. own ID ${process.pid}. Stopping`
                            );
                            this.terminate(EXIT_CODES.ADAPTER_REQUESTED_TERMINATION);
                        } else if (
                            !this._config.isInstall &&
                            resAlive &&
                            resAlive.val === true &&
                            resAlive.ack &&
                            !this._config.forceIfDisabled
                        ) {
                            this._logger.error(
                                `${this.namespaceLog} ${this._options.name}.${instance} already running`
                            );
                            this.terminate(EXIT_CODES.ADAPTER_ALREADY_RUNNING);
                        } else {
                            adapterObjects.getObject(`system.adapter.${this.namespace}`, (err, res) => {
                                if ((err || !res) && !this._config.isInstall) {
                                    this._logger.error(
                                        `${this.namespaceLog} ${this._options.name}.${instance} invalid config`
                                    );
                                    this.terminate(EXIT_CODES.INVALID_ADAPTER_CONFIG);
                                } else {
                                    initAdapter(res);
                                }
                            });
                        }
                    });
                });
            }
        };

        const initObjects = (cb: () => void) => {
            this._initializeTimeout = setTimeout(() => {
                this._initializeTimeout = null;
                if (this._config.isInstall) {
                    this._logger && this._logger.warn(`${this.namespaceLog} no connection to objects DB. Terminating`);
                    this.terminate(EXIT_CODES.NO_ERROR);
                } else {
                    this._logger &&
                        this._logger.warn(`${this.namespaceLog} slow connection to objects DB. Still waiting ...`);
                }
            }, this._config.objects.connectTimeout * 2); // Because we do not connect only anymore, give it a bit more time

            adapterObjects = new Objects({
                namespace: this.namespaceLog,
                connection: this._config.objects,
                logger: this._logger,
                connected: async () => {
                    this.connected = true;
                    if (this._initializeTimeout) {
                        clearTimeout(this._initializeTimeout);
                        this._initializeTimeout = null;
                    }

                    // subscribe to user changes
                    adapterObjects.subscribe('system.user.*');

                    // get all enums and register for enum changes
                    this.enums = await tools.getAllEnums(adapterObjects);
                    adapterObjects.subscribe('enum.*');

                    // Read dateformat if using of formatDate is announced
                    if (this._options.useFormatDate) {
                        adapterObjects.getObject('system.config', (err, data) => {
                            if (data && data.common) {
                                this.dateFormat = data.common.dateFormat;
                                this.isFloatComma = data.common.isFloatComma;
                                this.language = data.common.language;
                                this.longitude = data.common.longitude;
                                this.latitude = data.common.latitude;
                                this.defaultHistory = data.common.defaultHistory;
                            }
                            if (data && data.native) {
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
                            this._logger &&
                                this._logger.warn(
                                    `${this.namespaceLog} Cannot connect/reconnect to objects DB. Terminating`
                                );
                            this.terminate(EXIT_CODES.NO_ERROR);
                        }, 4000);
                },
                change: async (id, obj) => {
                    // System level object changes (and alias objects)
                    if (obj === 'null' || obj === '') {
                        obj = null;
                    }

                    if (!id) {
                        this._logger.error(`${this.namespaceLog} change ID is empty: ${JSON.stringify(obj)}`);
                        return;
                    }

                    // If desired, that adapter must be terminated
                    if (
                        id === `system.adapter.${this.namespace}` &&
                        obj &&
                        obj.common &&
                        obj.common.enabled === false
                    ) {
                        this._logger.info(`${this.namespaceLog} Adapter is disabled => stop`);
                        this._stop();
                        setTimeout(() => this.terminate(EXIT_CODES.NO_ERROR), 4000);
                        return;
                    }

                    // update language, dateFormat and comma
                    if (
                        id === 'system.config' &&
                        obj &&
                        obj.common &&
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
                        // aliases['sourceId'] = {
                        //     source: {common attributes},
                        //     targets: [
                        //         {
                        //             alias: {},
                        //             id: 'aliasId',
                        //             pattern: 'some pattern',
                        //             type: stateType,
                        //             max: number,
                        //             min: number,
                        //         }
                        //     ]
                        // };

                        // if this.aliases is empty, or no target found its a new alias
                        let isNewAlias = true;

                        for (const [sourceId, alias] of this.aliases) {
                            const targetAlias = alias.targets.find(entry => entry.id === id);

                            // Find entry for this alias
                            if (targetAlias) {
                                isNewAlias = false;

                                // new sourceId or same
                                if (obj && obj.common && obj.common.alias && obj.common.alias.id) {
                                    // check if id.read or id
                                    const newSourceId =
                                        typeof obj.common.alias.id.read === 'string'
                                            ? obj.common.alias.id.read
                                            : obj.common.alias.id;

                                    // if linked ID changed
                                    if (newSourceId !== sourceId) {
                                        this._removeAliasSubscribe(sourceId, targetAlias, async () => {
                                            try {
                                                await this._addAliasSubscribe(obj, targetAlias.pattern);
                                            } catch (e) {
                                                this._logger.error(
                                                    `${this.namespaceLog} Could not add alias subscription: ${e.message}`
                                                );
                                            }
                                        });
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
                                    this._removeAliasSubscribe(sourceId, targetAlias);
                                }
                            }
                        }

                        // it's a new alias, we add it to our subscription
                        if (isNewAlias) {
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
                                            this.namespaceLog + ' ' + `Could not add alias subscription: ${e.message}`
                                        );
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // process auto-subscribe adapters
                    if (id.startsWith('system.adapter.')) {
                        if (obj && obj.common && obj.common.subscribable) {
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
                    if (obj === 'null' || obj === '') {
                        obj = null;
                    }

                    if (!id) {
                        this._logger.error(`${this.namespaceLog} change ID is empty: ${JSON.stringify(obj)}`);
                        return;
                    }

                    // remove protectedNative if not admin or own adapter
                    const adapterName = this.namespace.split('.')[0];
                    if (
                        obj &&
                        obj.protectedNative &&
                        obj.protectedNative.length &&
                        obj._id &&
                        obj._id.startsWith('system.adapter.') &&
                        adapterName !== 'admin' &&
                        adapterName !== obj._id.split('.')[2]
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
                            setImmediate(() => this._options.fileChange(id, fileName, size));
                        // emit 'fileChange' event instantly
                        setImmediate(() => this.emit('fileChange', id, fileName, size));
                    }
                }
            });
        };

        // initStates is called from initAdapter
        const initStates = cb => {
            this._logger.silly(`${this.namespaceLog} objectDB connected`);

            this._config.states.maxQueue = this._config.states.maxQueue || 1000;

            this._initializeTimeout = setTimeout(() => {
                this._initializeTimeout = null;
                if (this._config.isInstall) {
                    this._logger && this._logger.warn(`${this.namespaceLog} no connection to states DB. Terminating.`);
                    this.terminate(EXIT_CODES.NO_ERROR);
                } else {
                    this._logger &&
                        this._logger.warn(`${this.namespaceLog} slow connection to states DB. Still waiting ...`);
                }
            }, this._config.states.connectTimeout || 2000);

            // Internal object, but some special adapters want to access it anyway.
            adapterStates = new States({
                namespace: this.namespaceLog,
                connection: this._config.states,
                connected: async () => {
                    this._logger.silly(`${this.namespaceLog} statesDB connected`);
                    this.statesConnectedTime = Date.now();

                    if (this._initializeTimeout) {
                        clearTimeout(this._initializeTimeout);
                        this._initializeTimeout = null;
                    }

                    if (!this._config.isInstall) {
                        // Subscribe for process exit signal
                        adapterStates.subscribe(`system.adapter.${this.namespace}.sigKill`);

                        // Subscribe for loglevel
                        adapterStates.subscribe(`system.adapter.${this.namespace}.logLevel`);
                    }
                    if (this._options.subscribable) {
                        // subscribe on if other instance wants to have states of this adapter
                        adapterStates.subscribe(`system.adapter.${this.namespace}.subscribes`);

                        // read actual autosubscribe requests
                        let state;
                        try {
                            state = await adapterStates.getStateAsync(`system.adapter.${this.namespace}.subscribes`);
                        } catch {
                            // ignore
                        }
                        if (!state || !state.val) {
                            this.patterns = {};
                        } else {
                            try {
                                this.patterns = JSON.parse(state.val);
                                Object.keys(this.patterns).forEach(
                                    p => (this.patterns[p].regex = tools.pattern2RegEx(p))
                                );
                            } catch {
                                this.patterns = {};
                            }
                        }
                        return tools.maybeCallback(cb);
                    } else {
                        return tools.maybeCallback(cb);
                    }
                },
                logger: this._logger,
                change: (id, state) => {
                    this.inputCount++;
                    if (state === 'null' || state === '') {
                        state = null;
                    }

                    if (!id || typeof id !== 'string') {
                        console.log(`Something is wrong! ${JSON.stringify(id)}`);
                        return;
                    }

                    if (
                        id === `system.adapter.${this.namespace}.sigKill` &&
                        state &&
                        state.ts > this.statesConnectedTime &&
                        state.from &&
                        state.from.startsWith('system.host.')
                    ) {
                        const sigKillVal = parseInt(state.val);
                        if (!isNaN(sigKillVal)) {
                            if (this.startedInCompactMode || sigKillVal === -1) {
                                this._logger.info(
                                    `${this.namespaceLog} Got terminate signal ${
                                        sigKillVal === -1 ? 'TERMINATE_YOURSELF' : ` TERMINATE ${sigKillVal}`
                                    }`
                                );
                            } else {
                                this._logger.warn(
                                    `${this.namespaceLog} Got terminate signal. Checking desired PID: ${sigKillVal} vs own PID ${process.pid}`
                                );
                            }
                            // by deletion of state, stop this instance
                            if (sigKillVal !== process.pid && !this._config.forceIfDisabled) {
                                this._stop(false, false, EXIT_CODES.ADAPTER_REQUESTED_TERMINATION, false);
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
                                ['silly', 'debug', 'info', 'warn', 'error'].includes(state.val)
                            ) {
                                this.overwriteLogLevel = true;
                                this._config.log.level = state.val;
                                for (const transport in this._logger.transports) {
                                    if (!Object.prototype.hasOwnProperty.call(this._logger.transports, transport)) {
                                        continue;
                                    }
                                    // set the loglevel on transport only if no loglevel was pinned in log config
                                    if (!this._logger.transports[transport]._defaultConfigLoglevel) {
                                        this._logger.transports[transport].level = state.val;
                                    }
                                }
                                this._logger.info(
                                    `${this.namespaceLog} Loglevel changed from "${currentLevel}" to "${state.val}"`
                                );
                                currentLevel = state.val;
                            } else if (state.val && state.val !== currentLevel) {
                                this._logger.info(`${this.namespaceLog} Got invalid loglevel "${state.val}", ignoring`);
                            }
                            this.outputCount++;
                            adapterStates &&
                                adapterStates.setState(`system.adapter.${this.namespace}.logLevel`, {
                                    val: currentLevel,
                                    ack: true,
                                    from: `system.adapter.${this.namespace}`
                                });
                        }
                    }

                    // todo remove it as an error with log will be found
                    if (id === `system.adapter.${this.namespace}.checkLogging`) {
                        checkLogging();
                    }

                    // someone subscribes or unsubscribes from adapter
                    if (this._options.subscribable && id === `system.adapter.${this.namespace}.subscribes`) {
                        let subs;
                        try {
                            subs = JSON.parse((state && state.val) || '{}');
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
                    if (id.endsWith('.logging')) {
                        const instance = id.substring(0, id.length - '.logging'.length);
                        this._logger &&
                            this._logger.silly(
                                `${this.namespaceLog} ${instance}: logging ${state ? state.val : false}`
                            );
                        this.logRedirect(state ? state.val : false, instance);
                    } else if (id === `log.system.adapter.${this.namespace}`) {
                        this._options.logTransporter && this.processLog && this.processLog(state);
                    } else if (id === `messagebox.system.adapter.${this.namespace}` && state) {
                        // If this is messagebox
                        const obj = state;

                        if (obj) {
                            // If callback stored for this request
                            if (
                                obj.callback &&
                                obj.callback.ack &&
                                obj.callback.id &&
                                this.callbacks &&
                                this.callbacks[`_${obj.callback.id}`]
                            ) {
                                // Call callback function
                                if (this.callbacks[`_${obj.callback.id}`].cb) {
                                    this.callbacks[`_${obj.callback.id}`].cb(obj.message);
                                    delete this.callbacks[`_${obj.callback.id}`];
                                }
                                // delete too old callbacks IDs, like garbage collector
                                const now = Date.now();
                                for (const _id in this.callbacks) {
                                    if (now - this.callbacks[_id].time > 3600000) {
                                        delete this.callbacks[_id];
                                    }
                                }
                            } else if (!this._stopInProgress) {
                                if (this._options.message) {
                                    // Else inform about new message the adapter
                                    this._options.message(obj);
                                }
                                this.emit('message', obj);
                            }
                        }
                    } else if (id.startsWith(`system.adapter.${this.namespace}.plugins.`) && id.endsWith('.enabled')) {
                        if (!state || state.ack) {
                            return;
                        }
                        const pluginStatesIndex = ('system.adapter.' + this.namespace + '.plugins.').length;
                        let nameEndIndex = id.indexOf('.', pluginStatesIndex + 1);
                        if (nameEndIndex === -1) {
                            nameEndIndex = undefined;
                        }
                        const pluginName = id.substring(pluginStatesIndex, nameEndIndex);
                        if (!this.pluginHandler.pluginExists(pluginName)) {
                            return;
                        }
                        if (this.pluginHandler.isPluginActive(pluginName) !== state.val) {
                            if (state.val) {
                                if (!this.pluginHandler.isPluginInstanciated(pluginName)) {
                                    this.pluginHandler.instanciatePlugin(
                                        pluginName,
                                        this.pluginHandler.getPluginConfig(pluginName),
                                        __dirname
                                    );
                                    this.pluginHandler.setDatabaseForPlugin(pluginName, adapterObjects, adapterStates);
                                    this.pluginHandler.initPlugin(pluginName, this.adapterConfig);
                                }
                            } else {
                                if (!this.pluginHandler.destroy(pluginName)) {
                                    this._logger.info(
                                        `${this.namespaceLog} Plugin ${pluginName} could not be disabled. Please restart adapter to disable it.`
                                    );
                                }
                            }
                        }
                    } else if (this.adapterReady && this.aliases.has(id)) {
                        // If adapter is ready and for this ID exist some alias links
                        this.aliases.get(id).targets.forEach(target => {
                            const aState = state
                                ? tools.formatAliasValue(
                                      this.aliases.get(id).source,
                                      target,
                                      deepClone(state),
                                      this._logger,
                                      this.namespaceLog
                                  )
                                : null;
                            const targetId = target.id.read === 'string' ? target.id.read : target.id;

                            if (!this._stopInProgress && (aState || !state)) {
                                if (typeof this._options.stateChange === 'function') {
                                    this._options.stateChange(targetId, aState);
                                } else {
                                    // emit 'stateChange' event instantly
                                    setImmediate(() => this.emit('stateChange', targetId, aState));
                                }
                            }
                        });
                    }
                },
                changeUser: (id, state) => {
                    this.inputCount++;
                    if (state === 'null' || state === '') {
                        state = null;
                    }

                    if (!id || typeof id !== 'string') {
                        console.log(`Something is wrong! ${JSON.stringify(id)}`);
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
                                setImmediate(() => this._options.stateChange(id, state));
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
                            this._logger &&
                                this._logger.warn(
                                    this.namespaceLog + ' Cannot connect/reconnect to states DB. Terminating'
                                );
                            this.terminate(EXIT_CODES.NO_ERROR);
                        }, 5000);
                }
            });
        };

        // debug function to find error with stop logging
        const checkLogging = () => {
            let logs = [];
            // LogList
            logs.push(`Actual Loglist - ${JSON.stringify(Array.from(this.logList))}`);

            if (!adapterStates) {
                // if adapterState was destroyed, we can not continue
                return;
            }

            // Read current state of all log subscribers
            adapterStates.getKeys('*.logging', (err, keys) => {
                if (keys && keys.length) {
                    if (!adapterStates) {
                        // if adapterState was destroyed, we can not continue
                        return;
                    }

                    adapterStates.getStates(keys, (err, obj) => {
                        if (obj) {
                            for (let i = 0; i < keys.length; i++) {
                                // We can JSON.parse, but index is 16x faster
                                if (obj[i]) {
                                    const id = keys[i].substring(0, keys[i].length - '.logging'.length);
                                    if (
                                        (typeof obj[i] === 'string' &&
                                            (obj[i].includes('"val":true') || obj[i].includes('"val":"true"'))) ||
                                        (typeof obj[i] === 'object' && (obj[i].val === true || obj[i].val === 'true'))
                                    ) {
                                        logs.push(`Subscriber - ${id} ENABLED`);
                                    } else {
                                        if (logs) {
                                            logs.push(`Subscriber - ${id} (disabled)`);
                                        } else {
                                            this._logger.error(
                                                `${this.namespaceLog} LOGINFO: Subscriber - ${id} (disabled)`
                                            );
                                        }
                                    }
                                }
                            }
                        }
                        if (logs) {
                            for (let m = 0; m < logs.length; m++) {
                                this._logger.error(this.namespaceLog + ' LOGINFO: ' + logs[m]);
                            }
                            logs = null;
                        }
                    });
                }
            });
        };

        const initLogging = callback => {
            // temporary log buffer
            let messages = [];
            // Read current state of all log subscriber

            if (!adapterStates) {
                // if adapterState was destroyed, we can not continue
                return;
            }

            adapterStates.getKeys('*.logging', (err, keys) => {
                if (keys && keys.length) {
                    if (!adapterStates) {
                        // if adapterState was destroyed, we can not continue
                        return;
                    }

                    adapterStates.getStates(keys, (err, obj) => {
                        if (obj) {
                            for (let i = 0; i < keys.length; i++) {
                                // We can JSON.parse, but index is 16x faster
                                if (!obj[i]) {
                                    continue;
                                }
                                const id = keys[i].substring(0, keys[i].length - '.logging'.length);
                                if (
                                    typeof obj[i] === 'string' &&
                                    (obj[i].includes('"val":true') || obj[i].includes('"val":"true"'))
                                ) {
                                    this.logRedirect(true, id);
                                } else if (
                                    typeof obj[i] === 'object' &&
                                    (obj[i].val === true || obj[i].val === 'true')
                                ) {
                                    this.logRedirect(true, id);
                                }
                            }
                            if (
                                this.logList.size &&
                                messages &&
                                messages.length &&
                                adapterStates &&
                                adapterStates.pushLog
                            ) {
                                for (const message of messages) {
                                    for (const instanceId of this.logList) {
                                        adapterStates.pushLog(instanceId, message);
                                    }
                                }
                            }
                        }
                        // clear log buffer
                        messages = null;
                    });
                } else {
                    // disable log buffer
                    messages = null;
                }
                return tools.maybeCallback(callback);
            });

            this.logRedirect = (isActive, id) => {
                // ignore itself
                if (id === 'system.adapter.' + this.namespace) {
                    return;
                }

                if (isActive) {
                    if (!this.logList.has(id)) {
                        this.logList.add(id);
                    }
                } else {
                    this.logList.delete(id);
                }
            };

            // If some message from logger
            // find our notifier transport
            const ts = this._logger.transports.find(t => t.name === 'NT');
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
                } else if (adapterStates && adapterStates.pushLog) {
                    // Send to all adapter, that required logs
                    for (const instanceId of this.logList) {
                        adapterStates.pushLog(instanceId, info);
                    }
                }
            });

            this._options.logTransporter = this._options.logTransporter || this.ioPack.common.logTransporter;

            if (this._options.logTransporter) {
                this.requireLog = isActive => {
                    if (adapterStates) {
                        if (this.logRequired !== isActive) {
                            this.logRequired = isActive; // remember state
                            if (!isActive) {
                                if (this.logOffTimer) {
                                    clearTimeout(this.logOffTimer);
                                }
                                // disable log receiving after 10 seconds
                                this.logOffTimer = setTimeout(() => {
                                    this.logOffTimer = null;
                                    this._logger.silly(this.namespaceLog + ' Change log subscriber state: FALSE');
                                    this.outputCount++;
                                    adapterStates.setState('system.adapter.' + this.namespace + '.logging', {
                                        val: false,
                                        ack: true,
                                        from: 'system.adapter.' + this.namespace
                                    });
                                }, 10000);
                            } else {
                                if (this.logOffTimer) {
                                    clearTimeout(this.logOffTimer);
                                    this.logOffTimer = null;
                                } else {
                                    this._logger.silly(this.namespaceLog + ' Change log subscriber state: true');
                                    this.outputCount++;
                                    adapterStates.setState('system.adapter.' + this.namespace + '.logging', {
                                        val: true,
                                        ack: true,
                                        from: 'system.adapter.' + this.namespace
                                    });
                                }
                            }
                        }
                    }
                };

                this.processLog = msg => {
                    msg && !this._stopInProgress && this.emit('log', msg);
                };

                adapterStates.subscribeLog('system.adapter.' + this.namespace);
            } else {
                this.requireLog = _isActive => {
                    this._logger.warn(
                        `${this.namespaceLog} requireLog is not supported by this adapter! Please set common.logTransporter to true`
                    );
                };
            }
        };

        const initAdapter = adapterConfig => {
            initLogging(() => {
                this.pluginHandler.setDatabaseForPlugins(adapterObjects, adapterStates);
                this.pluginHandler.initPlugins(adapterConfig, async () => {
                    if (!adapterStates || this.terminated) {
                        // if adapterState was destroyed,we should not continue
                        return;
                    }

                    adapterStates.subscribe(`system.adapter.${this.namespace}.plugins.*`);
                    if (this._options.instance === undefined) {
                        if (!adapterConfig || !adapterConfig.common || !adapterConfig.common.enabled) {
                            if (adapterConfig && adapterConfig.common && adapterConfig.common.enabled !== undefined) {
                                !this._config.isInstall && this._logger.error(`${this.namespaceLog} adapter disabled`);
                            } else {
                                !this._config.isInstall &&
                                    this._logger.error(`${this.namespaceLog} no config found for adapter`);
                            }

                            if (!this._config.isInstall && (!process.argv || !this._config.forceIfDisabled)) {
                                const id = `system.adapter.${this.namespace}`;
                                this.outputCount += 2;
                                adapterStates.setState(`${id}.alive`, { val: true, ack: true, expire: 30, from: id });
                                let done = false;
                                adapterStates.setState(
                                    `${id}.connected`,
                                    {
                                        val: true,
                                        ack: true,
                                        expire: 30,
                                        from: id
                                    },
                                    () => {
                                        if (!done) {
                                            done = true;
                                            this.terminate(EXIT_CODES.NO_ADAPTER_CONFIG_FOUND);
                                        }
                                    }
                                );
                                setTimeout(() => {
                                    if (!done) {
                                        done = true;
                                        this.terminate(EXIT_CODES.NO_ADAPTER_CONFIG_FOUND);
                                    }
                                }, 1000);
                                return;
                            }
                        }

                        if (!this._config.isInstall && !adapterConfig._id) {
                            this._logger.error(`${this.namespaceLog} invalid config: no _id found`);
                            this.terminate(EXIT_CODES.INVALID_ADAPTER_ID);
                            return;
                        }

                        let name;
                        let instance;

                        if (!this._config.isInstall) {
                            const tmp = adapterConfig._id.match(/^system\.adapter\.([a-zA-Z0-9-_]+)\.([0-9]+)$/);
                            if (!tmp) {
                                this._logger.error(`${this.namespaceLog} invalid config`);
                                this.terminate(EXIT_CODES.INVALID_ADAPTER_ID);
                                return;
                            }
                            name = tmp[1];
                            instance = parseInt(tmp[2]) || 0;
                        } else {
                            name = this._options.name;
                            instance = 0;
                            adapterConfig = adapterConfig || {
                                common: { mode: 'once', name: name, protectedNative: [] },
                                native: {}
                            };
                        }

                        if (adapterConfig.common.loglevel && !this.overwriteLogLevel) {
                            // set configured in DB log level
                            for (const trans of Object.values(this._logger.transports)) {
                                // set the loglevel on transport only if no loglevel was pinned in log config
                                if (!trans._defaultConfigLoglevel) {
                                    trans.level = adapterConfig.common.loglevel;
                                }
                            }
                            this._config.log.level = adapterConfig.common.loglevel;
                        }

                        this.name = adapterConfig.common.name;
                        this.instance = instance;
                        this.namespace = `${name}.${instance}`;
                        this.namespaceLog =
                            this.namespace + (this.startedInCompactMode ? ' (COMPACT)' : ` (${process.pid})`);
                        if (!this.startedInCompactMode) {
                            process.title = 'io.' + this.namespace;
                        }

                        this.config = adapterConfig.native;
                        this.host = adapterConfig.common.host;
                        this.common = adapterConfig.common;

                        if (
                            adapterConfig.common.mode === 'subscribe' ||
                            adapterConfig.common.mode === 'schedule' ||
                            adapterConfig.common.mode === 'once'
                        ) {
                            this.stop = () => this._stop(true);
                        } else if (this.startedInCompactMode) {
                            this.stop = () => this._stop(false);
                            this.kill = this.stop;
                        } else {
                            this.stop = () => this._stop(false);
                        }

                        // Monitor logging state
                        adapterStates.subscribe('*.logging');

                        if (typeof this._options.message === 'function' && !adapterConfig.common.messagebox) {
                            this._logger.error(
                                `${this.namespaceLog} : message handler implemented, but messagebox not enabled. Define common.messagebox in io-package.json for adapter or delete message handler.`
                            );
                        } else if (adapterConfig.common.messagebox) {
                            this.mboxSubscribed = true;
                            adapterStates.subscribeMessage('system.adapter.' + this.namespace);
                        }
                    } else {
                        this.name = adapterConfig.name || this._options.name;
                        this.instance = adapterConfig.instance || 0;
                        this.namespace = `${this.name}.${this.instance}`;
                        this.namespaceLog =
                            this.namespace + (this.startedInCompactMode ? ' (COMPACT)' : ` (${process.pid})`);

                        this.config = adapterConfig.native || {};
                        this.common = adapterConfig.common || {};
                        this.host = this.common.host || tools.getHostName() || os.hostname();
                    }

                    this.adapterConfig = adapterConfig;

                    this._utils = new Utils(
                        adapterObjects,
                        adapterStates,
                        this.namespaceLog,
                        this._logger,
                        this.namespace,
                        this._namespaceRegExp
                    );

                    this.log = new Log(this.namespaceLog, this._config.log.level, this._logger);

                    //
                    // From here on "this" methods can be used that might log with "this.log" !!
                    // Above this line only use logger!
                    //

                    await createInstancesObjects(adapterConfig);

                    // auto oObjects
                    if (this._options.objects) {
                        this.oObjects = await this.getAdapterObjectsAsync();
                        await this.subscribeObjectsAsync('*');
                    }

                    // read the systemSecret
                    if (this._systemSecret === undefined) {
                        try {
                            const data = await adapterObjects.getObjectAsync('system.config');
                            if (data && data.native) {
                                this._systemSecret = data.native.secret;
                            }
                        } catch {
                            // ignore
                        }
                        this._systemSecret = this._systemSecret || DEFAULT_SECRET;
                    }

                    // Decrypt all attributes of encryptedNative
                    const promises = [];
                    if (Array.isArray(adapterConfig.encryptedNative)) {
                        for (const attr of adapterConfig.encryptedNative) {
                            // we can only decrypt strings
                            if (typeof this.config[attr] === 'string') {
                                promises.push(
                                    this.getEncryptedConfig(attr)
                                        .then(decryptedValue => (this.config[attr] = decryptedValue))
                                        .catch(e =>
                                            this._logger.error(
                                                `${this.namespaceLog} Can not decrypt attribute ${attr}: ${e.message}`
                                            )
                                        )
                                );
                            }
                        }
                    } else {
                        // remove encrypted native from supported features, otherwise this can cause issues, if no adapter upload done with js-c v3+ yet
                        const idx = SUPPORTED_FEATURES.indexOf('ADAPTER_AUTO_DECRYPT_NATIVE');
                        if (idx !== -1) {
                            SUPPORTED_FEATURES.splice(idx, 1);
                        }
                    }

                    // Wait till all attributes decrypted
                    await Promise.all(promises);

                    if (!adapterStates) {
                        // if adapterStates was destroyed, we should not continue
                        return;
                    }

                    this.outputCount++;
                    // set current loglevel
                    adapterStates.setState(`system.adapter.${this.namespace}.logLevel`, {
                        val: this._config.log.level,
                        ack: true,
                        from: `system.adapter.${this.namespace}`
                    });

                    if (this._options.instance === undefined) {
                        this.version =
                            this.pack && this.pack.version
                                ? this.pack.version
                                : this.ioPack && this.ioPack.common
                                ? this.ioPack.common.version
                                : 'unknown';
                        // display if it's a non official version - only if installedFrom is explicitly given and differs it's not npm
                        const isNpmVersion =
                            !this.ioPack ||
                            !this.ioPack.common ||
                            typeof this.ioPack.common.installedFrom !== 'string' ||
                            this.ioPack.common.installedFrom.startsWith(`${tools.appName.toLowerCase()}.${this.name}`);

                        this._logger.info(
                            `${this.namespaceLog} starting. Version ${this.version} ${
                                !isNpmVersion ? `(non-npm: ${this.ioPack.common.installedFrom}) ` : ''
                            }in ${this.adapterDir}, node: ${process.version}, js-controller: ${controllerVersion}`
                        );
                        this._config.system = this._config.system || {};
                        this._config.system.statisticsInterval =
                            parseInt(this._config.system.statisticsInterval, 10) || 15000;
                        if (!this._config.isInstall) {
                            this._reportInterval = setInterval(reportStatus, this._config.system.statisticsInterval);
                            reportStatus();
                            const id = `system.adapter.${this.namespace}`;
                            adapterStates.setState(`${id}.compactMode`, {
                                ack: true,
                                from: id,
                                val: !!this.startedInCompactMode
                            });

                            this.outputCount++;

                            if (this.startedInCompactMode) {
                                adapterStates.setState(id + '.cpu', { ack: true, from: id, val: 0 });
                                adapterStates.setState(id + '.cputime', { ack: true, from: id, val: 0 });
                                adapterStates.setState(id + '.memRss', { val: 0, ack: true, from: id });
                                adapterStates.setState(id + '.memHeapTotal', { val: 0, ack: true, from: id });
                                adapterStates.setState(id + '.memHeapUsed', { val: 0, ack: true, from: id });
                                adapterStates.setState(id + '.eventLoopLag', { val: 0, ack: true, from: id });
                                this.outputCount += 6;
                            } else {
                                tools.measureEventLoopLag(1000, lag => this.eventLoopLags.push(lag));
                            }
                        }
                    }

                    if (adapterConfig && adapterConfig.common && adapterConfig.common.restartSchedule) {
                        try {
                            this._schedule = await import('node-schedule');
                        } catch {
                            this._logger.error(
                                `${this.namespaceLog} Cannot load node-schedule. Scheduled restart is disabled`
                            );
                        }
                        if (this._schedule) {
                            this._logger.debug(
                                `${this.namespaceLog} Schedule restart: ${adapterConfig.common.restartSchedule}`
                            );
                            this._restartScheduleJob = this._schedule.scheduleJob(
                                adapterConfig.common.restartSchedule,
                                () => {
                                    this._logger.info(`${this.namespaceLog} Scheduled restart.`);
                                    this._stop(false, true);
                                }
                            );
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
                                typeof this._options.ready === 'function' && this._options.ready();
                                this.emit('ready');
                            } else {
                                typeof this._options.reconnect === 'function' && this._options.reconnect();
                                this.emit('reconnect');
                            }
                            this.adapterReady = true;
                        });
                    } else if (!this._stopInProgress) {
                        typeof this._options.ready === 'function' && this._options.ready();
                        this.emit('ready');
                        this.adapterReady = true;

                        // todo remove it later, when the error is fixed
                        adapterStates.subscribe(`${this.namespace}.checkLogging`);
                    }
                });
            });
        };

        const reportStatus = () => {
            if (!adapterStates) {
                return;
            }
            const id = 'system.adapter.' + this.namespace;
            adapterStates.setState(id + '.alive', {
                val: true,
                ack: true,
                expire: Math.floor(this._config.system.statisticsInterval / 1000) + 10,
                from: id
            });
            this.outputCount++;
            if (this.connected) {
                adapterStates.setState(id + '.connected', { val: true, ack: true, expire: 30, from: id });
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
                    if (!err && this && adapterStates && adapterStates.setState && stats) {
                        adapterStates.setState(id + '.cpu', {
                            ack: true,
                            from: id,
                            val: Math.round(100 * parseFloat(stats.cpu)) / 100
                        });
                        adapterStates.setState(id + '.cputime', { ack: true, from: id, val: stats.ctime / 1000 });
                        this.outputCount += 2;
                    }
                });
                try {
                    //RSS is the resident set size, the portion of the process's memory held in RAM (as opposed to the swap space or the part held in the filesystem).
                    const mem = process.memoryUsage();
                    adapterStates.setState(id + '.memRss', {
                        val: parseFloat(
                            (mem.rss / 1048576) /* 1MB */
                                .toFixed(2)
                        ),
                        ack: true,
                        from: id
                    });
                    adapterStates.setState(id + '.memHeapTotal', {
                        val: parseFloat(
                            (mem.heapTotal / 1048576) /* 1MB */
                                .toFixed(2)
                        ),
                        ack: true,
                        from: id
                    });
                    adapterStates.setState(id + '.memHeapUsed', {
                        val: parseFloat(
                            (mem.heapUsed / 1048576) /* 1MB */
                                .toFixed(2)
                        ),
                        ack: true,
                        from: id
                    });
                } catch (err) {
                    this._logger.warn(`${this.namespaceLog} Could not query used process memory: ${err.message}`);
                }
                this.outputCount += 3;
                if (this.eventLoopLags.length) {
                    const eventLoopLag = Math.ceil(
                        this.eventLoopLags.reduce((a, b) => a + b) / this.eventLoopLags.length
                    );
                    adapterStates.setState(id + '.eventLoopLag', { val: eventLoopLag, ack: true, from: id }); // average of measured values
                    this.eventLoopLags = [];
                    this.outputCount++;
                }
            }
            this.outputCount += 3;
            adapterStates.setState(id + '.uptime', {
                val: parseInt(process.uptime().toFixed(), 10),
                ack: true,
                from: id
            });
            adapterStates.setState(`${id}.inputCount`, { val: this.inputCount, ack: true, from: id });
            adapterStates.setState(`${id}.outputCount`, { val: this.outputCount, ack: true, from: id });
            this.inputCount = 0;
            this.outputCount = 0;
        };

        const exceptionHandler = async (err: NodeJS.ErrnoException, isUnhandledRejection: boolean) => {
            // If the adapter has a callback to listen for unhandled errors
            // give it a chance to handle the error itself instead of restarting it
            if (typeof this._options.error === 'function') {
                try {
                    // if error handler in the adapter returned exactly true,
                    // we expect the error to be handled and do nothing more
                    const wasHandled = this._options.error(err);
                    if (wasHandled === true) {
                        return;
                    }
                } catch (e) {
                    console.error(`Error in adapter error handler: ${e.message}`);
                }
            }

            // catch it on windows
            if (this.getPortRunning && err && err.message === 'listen EADDRINUSE') {
                const { host, port, callback } = this.getPortRunning;
                this._logger.warn(
                    `${this.namespaceLog} Port ${port}${host ? ` for host ${host}` : ''} is in use. Get next`
                );

                setImmediate(() => this.getPort(port + 1, host, callback));
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
                this._stop(false, false, EXIT_CODES.UNCAUGHT_EXCEPTION, false);
                setTimeout(() => this.terminate(EXIT_CODES.UNCAUGHT_EXCEPTION), 1000);
            } catch (err) {
                this._logger.error(`${this.namespaceLog} exception by stop: ${err ? err.message : err}`);
            }
        };

        process.once('SIGINT', () => this._stop());
        process.once('SIGTERM', () => this._stop());
        // And the exit event shuts down the child.
        process.once('exit', () => this._stop());

        process.on('uncaughtException', err => exceptionHandler(err));
        process.on('unhandledRejection', err => exceptionHandler(err, true));

        const pluginSettings: PluginHandlerSettings = {
            scope: 'adapter',
            namespace: `system.adapter.${this.namespace}`,
            logNamespace: this.namespaceLog,
            // @ts-expect-error
            log: this._logger,
            iobrokerConfig: this._config,
            // @ts-expect-error
            parentPackage: this.pack,
            controllerVersion
        };

        // @ts-expect-error
        this.pluginHandler = new PluginHandler(pluginSettings);
        // @ts-expect-error
        this.pluginHandler.addPlugins(this.ioPack.common.plugins, [this.adapterDir, __dirname]); // first resolve from adapter directory, else from js-controller

        // finally init
        _initDBs();
    }
}

/**
 * Polyfill to allow calling without `new`
 * @type {AdapterClass}
 */
export const Adapter = new Proxy(AdapterClass, {
    apply(target, thisArg, argArray) {
        // @ts-expect-error fix later on if necessary
        return new target(...argArray);
    }
});
