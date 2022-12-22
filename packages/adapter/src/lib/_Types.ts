import type { ChangeFileFunction } from '@iobroker/db-objects-redis';
import type { IdObject } from './adapter/utils';

export interface AdapterOptions {
    subscribesChange?: (subs: Record<string, { regex: RegExp }>) => void;
    /** If the adapter collects logs from all adapters (experts only). Default: false */
    logTransporter?: boolean;
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
    /** callback function (id, file) that will be called if file changed */
    fileChange?: ChangeFileFunction;
    /** callback to inform about new message the adapter */
    message?: ioBroker.MessageHandler;
    /** callback to stop the adapter */
    unload?: ioBroker.UnloadHandler;
    /** called when adapter is ready */
    ready?: ioBroker.ReadyHandler;
    /** called on reconnection to DB */
    reconnect?: () => MaybePromise;
    /** Handler to handle uncaught exceptions, return true if no further handling required */
    error?: ioBroker.ErrorHandler;
}

export type Pattern = string | string[];

export interface AdapterOptionsConfig {
    log: {
        level: ioBroker.LogLevel;
    };
}

export interface InternalFormatDateOptions {
    dateObj: string | Date | number;
    isDuration: boolean;
    _format?: string;
}

export interface AliasDetails {
    source: AliasDetailsSource | null;
    targets: AliasTargetEntry[];
}

export interface AliasDetailsSource {
    min?: number;
    max?: number;
    type: string;
    unit?: string;
}

export interface AliasTargetEntry {
    alias: ioBroker.StateCommon['alias'];
    id: string;
    pattern: string;
    type: string;
    max?: number;
    min?: number;
    unit?: string;
}

export interface CheckStatesResult {
    objs: ioBroker.StateObject[];
    ids: string[];
}

export interface SetStateChangedResult {
    notChanged: boolean;
    id: string;
}

export interface GetUserGroupsOptions {
    user: `system.user.${string}`;
    [other: string]: any;
}

export type CheckStateCommand = 'getState' | 'setState' | 'delState';

export type MaybePromise = Promise<void> | void;

export interface InternalSetSessionOptions {
    id: string;
    ttl: number;
    data: Record<string, any>;
    callback?: ioBroker.ErrorCallback;
}

export interface InternalGetSessionOptions {
    id: string;
    callback: ioBroker.GetSessionCallback;
}

export interface InternalDestroySessionOptions {
    id: string;
    callback?: ioBroker.ErrorCallback;
}

export interface InternalGetPortOptions {
    port: number;
    host?: string;
    callback?: (port: number) => void;
}

export type CheckPasswordCallback = (success: boolean, user: string) => void;

export interface InternalCheckPasswordOptions {
    user: string;
    pw: string;
    options?: Record<string, any> | null;
    callback: CheckPasswordCallback;
}

export interface InternalGetUserIDOptions {
    username: string;
}

export interface InternalSetPasswordOptions {
    user: string;
    pw: string;
    options?: Record<string, any> | null;
    callback?: ioBroker.ErrorCallback;
}

export type CheckGroupCallback = (result: boolean) => void;

export interface InternalCheckGroupOptions {
    user: string;
    group: string;
    options?: Record<string, any> | null;
    callback?: CheckGroupCallback;
}

export type CommandsPermissionsEntry = { type: 'object' | 'state' | '' | 'other' | 'file'; operation: string };
export type CommandsPermissionsObject = {
    [permission: string]: CommandsPermissionsEntry;
};

export type CommandsPermissions = CommandsPermissionsObject | CommandsPermissionsEntry[];

export type CalculatePermissionsCallback = (result: ioBroker.PermissionSet) => void;

export interface InternalCalculatePermissionsOptions {
    user: string;
    commandsPermissions: CommandsPermissions;
    options?: Record<string, any> | null;
    callback?: CalculatePermissionsCallback;
}

export type GetCertificatesCallback = (
    err: string | null,
    certs?: ioBroker.Certificates,
    useLetsEncryptCert?: boolean
) => void;

export interface InternalGetCertificatesOptions {
    publicName: string;
    privateName: string;
    chainedName: string;
    callback?: GetCertificatesCallback;
}

export interface InternalUpdateConfigOptions {
    newConfig: Record<string, any>;
}

export type GetEncryptedConfigCallback = (error: Error | null | undefined, result?: string) => void;

export interface InternalGetEncryptedConfigOptions {
    attribute: string;
    callback?: GetEncryptedConfigCallback;
}

export type TimeoutCallback = (args?: any[]) => void;

export interface InternalSetObjectOptions {
    id: string;
    options?: Record<string, any> | null;
    obj: ioBroker.SettableObject;
    callback?: ioBroker.SetObjectCallback;
}

export interface InternalDelStateOptions {
    id: string;
    options?: Record<string, any> | null;
    callback?: ioBroker.ErrorCallback;
}

export interface InternalGetObjectOptions {
    id: string;
    options: unknown;
    callback?: ioBroker.GetObjectCallback<any>;
}

export interface InternalGetHistoryOptions {
    id: string;
    options?: ioBroker.GetHistoryOptions | null;
    callback: ioBroker.GetHistoryCallback;
}

export interface InternalGetObjectsOptions {
    pattern: Pattern;
    type?: string;
    enums?: ioBroker.EnumList | null;
    options?: Record<string, any> | null;
    callback?: ioBroker.GetObjectsCallbackTyped<any>;
}

export interface InternalGetChannelsOfOptions {
    parentDevice?: string;
    callback?: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>;
    options?: Record<string, any> | null;
}

export interface InternalGetAdapterObjectsOptions {
    callback?: (objects: Record<string, ioBroker.AdapterScopedObject>) => void;
}

export interface InternalGetObjectViewOptions {
    design: string;
    search: string;
    params: ioBroker.GetObjectViewParams;
    options?: Record<string, any> | null;
    callback?: ioBroker.GetObjectViewCallback<ioBroker.AnyObject>;
}

export interface InternalGetEnumOptions {
    _enum: string;
    options?: Record<string, any> | null;
    callback?: ioBroker.GetEnumCallback;
}

export interface InternalGetEnumsOptions {
    _enumList?: ioBroker.EnumList;
    options?: Record<string, any> | null;
    callback?: ioBroker.GetEnumsCallback;
}

export interface InternalDelObjectOptions {
    id: string;
    options?: ioBroker.DelObjectOptions | null;
    callback?: ioBroker.ErrorCallback;
}

export interface InternalCreateDeviceOptions {
    deviceName: string;
    common?: Partial<ioBroker.DeviceCommon>;
    _native?: Record<string, any> | null;
    options: unknown;
    callback?: ioBroker.SetObjectCallback;
}

export interface InternalSetStateOptions {
    id: string | IdObject;
    state: ioBroker.StateValue | ioBroker.SettableState;
    ack?: boolean;
    options?: Record<string, any> | null;
    callback?: ioBroker.SetStateCallback;
}

export interface InternalSetStateChangedOptions extends InternalSetStateOptions {
    callback?: ioBroker.SetStateChangedCallback;
}

export interface InternalCreateStateOptions {
    parentDevice: string;
    parentChannel: string;
    stateName: string;
    common: Partial<ioBroker.StateCommon>;
    _native: Record<string, any>;
    options?: Record<string, any> | null;
    callback?: ioBroker.SetObjectCallback;
}

export interface InternalSubscribeOptions {
    pattern: Pattern;
    options?: Record<string, any> | null;
    callback?: ioBroker.ErrorCallback;
}

export interface InternalSetBinaryStateOptions {
    id: string;
    options?: Record<string, any> | null;
    binary: Buffer;
    callback?: ioBroker.SetStateCallback;
}

export interface InternalAddChannelToEnumOptions {
    enumName: string;
    addTo: string;
    parentDevice: string;
    channelName: string;
    options?: Record<string, any> | null;
    callback?: ioBroker.ErrorCallback;
}

export interface InternalSendToOptions {
    instanceName: string;
    command: string;
    message: any;
    callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo;
}

export interface InternalSendToHostOptions {
    hostName: string;
    command: string;
    message: any;
    callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo;
}

export interface InternalGetStateOptions {
    id: string;
    options?: Record<string, any> | null;
    callback?: ioBroker.GetStateCallback;
}

export interface InternalGetStatesOptions {
    pattern: Pattern;
    options: Record<string, any>;
    callback: ioBroker.GetStatesCallback;
}

export interface InternalGetBinaryStateOption {
    id: string;
    options: Record<string, any>;
    callback?: ioBroker.GetBinaryStateCallback;
}

export interface InternalDelBinaryStateOptions {
    id: string;
    options: Record<string, any>;
    callback?: ioBroker.ErrorCallback;
}

export interface InternalDeleteDeviceOptions {
    deviceName: string;
    callback?: ioBroker.ErrorCallback;
}

export interface InternalDeleteChannelFromEnumOptions {
    enumName: string;
    parentDevice: string;
    channelName: string;
    options?: Record<string, any> | null;
    callback?: ioBroker.ErrorCallback;
}

export interface InternalDeleteChannelOptions {
    parentDevice: string;
    channelName: string;
    callback?: ioBroker.ErrorCallback;
}

export interface InternalDeleteStateOptions {
    parentDevice: string;
    parentChannel: string;
    stateName: string;
    options?: Record<string, any> | null;
    callback?: ioBroker.ErrorCallback;
}

export interface InternalGetDevicesOptions {
    options?: Record<string, any> | null;
    callback: ioBroker.GetObjectsCallback3<ioBroker.DeviceObject>;
}

export interface InternalGetStatesOfOptions {
    parentDevice: string | null | undefined;
    parentChannel: string | null | undefined;
    options?: Record<string, any> | null;
    callback: ioBroker.GetObjectsCallback3<ioBroker.StateObject>;
}

export interface InternalAddStateToEnumOptions {
    enumName: string;
    addTo: string;
    parentDevice: string;
    parentChannel: string;
    stateName: string;
    options?: Record<string, any> | null;
    callback?: ioBroker.ErrorCallback;
}

export interface InternalDeleteStateFromEnumOptions {
    enumName: string;
    parentDevice: string;
    parentChannel: string;
    stateName: string;
    options?: Record<string, any> | null;
    callback?: ioBroker.ErrorCallback;
}
