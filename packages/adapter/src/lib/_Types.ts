/** Options passed to the adapter constructor */
export interface AdapterOptions {
    /** Called with the current subscriptions whenever they change */
    subscribesChange?: (
        subs: Record<
            string,
            {
                /** Compiled regular expression of the subscription pattern */
                regex: RegExp;
            }
        >,
    ) => void;
    /** If the adapter collects logs from all adapters (experts only). Default: false */
    logTransporter?: boolean;
    /** if true, the date format from system.config */
    useFormatDate?: boolean;
    /** if it is possible for other instances to retrieve states of this adapter automatically */
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
    /** callback function (id, obj) that will be called if an object changed */
    objectChange?: ioBroker.ObjectChangeHandler;
    /** callback function (id, obj) that will be called if state changed */
    stateChange?: ioBroker.StateChangeHandler;
    /** callback function (id, file) that will be called if file changed */
    fileChange?: ioBroker.FileChangeHandler;
    /** callback function that will be called when a new UI client subscribes */
    uiClientSubscribe?: UserInterfaceClientSubscribeHandler;
    /** callback function that will be called when a new UI client unsubscribes */
    uiClientUnsubscribe?: UserInterfaceClientUnsubscribeHandler;
    /** callback to inform about a new message the adapter */
    message?: ioBroker.MessageHandler;
    /** callback to stop the adapter */
    unload?: ioBroker.UnloadHandler;
    /** called when adapter is ready */
    ready?: ioBroker.ReadyHandler;
    /** called when adapter is installed */
    install?: ioBroker.ReadyHandler;
    /** called on reconnection to DB */
    reconnect?: () => MaybePromise;
    /** Handler to handle uncaught exceptions, return true if no further handling required */
    error?: ioBroker.ErrorHandler;
}

export type IoPackageInstanceObject =
    | ioBroker.StateObject
    | ioBroker.DeviceObject
    | ioBroker.ChannelObject
    | ioBroker.FolderObject
    | ioBroker.MetaObject;

type MessageUnsubscribeReason = 'client' | 'disconnect';
export type ClientUnsubscribeReason = MessageUnsubscribeReason | 'clientSubscribeError';
type UserInterfaceClientUnsubscribeReason = ClientUnsubscribeReason | 'timeout';

type Invoice = 'free' | (string & {});

/** A license that may be suitable for use by an adapter */
export interface SuitableLicense {
    /** Name of the license type, not necessarily matching adapter */
    product: string;
    /** E-Mail of a license owner */
    email: string;
    /** Unique id of this license */
    id: string;
    /** The actual license */
    json: string;
    /** If it is a free license or not */
    invoice: Invoice;
    /** The adapter instance which uses this license */
    usedBy?: string;
    /** Version for which this license is valid */
    version: string;
    /** License is only valid for given UUID */
    uuid?: string;
    /** License if valid until this date 0000-00-00 00:00:00 if unlimited */
    validTill: string;
    /** License is only valid for X number of datapoints */
    datapoints?: number;
    /** Decoded property from jwt verify on json content with cloud cert */
    decoded: {
        /** E-Mail of license owner */
        email: string;
        /** Free text comment */
        comment: string;
        /** License type, eg private */
        type: string;
        /** Adapter name */
        name: string;
        /** Address of license owner */
        address: {
            /** Country of the license owner */
            Country: string;
            /** Name of the license owner */
            Name: string;
            /** First address line */
            AddressLine1: string;
            /** Second address line */
            AddressLine2: string;
            /** ZIP / postal code */
            ZIP: string;
            /** City of the license owner */
            City: string;
        };
        /** License type identifier */
        ltype: string;
        /** Country code of the license owner */
        country: string;
        /** Whether the license owner is within the EU */
        eu: string;
        /** VAT in percent */
        vatP: 19;
        /** Netto price information */
        netto: number;
        /** VAT price information */
        vat: number;
        /** Date when license expires */
        expires: number;
        /** How long license is valid, always in future if valid */
        valid_till: string;
        /** Unique id of the license */
        id: string;
        /** Issued-at timestamp of the JWT */
        iat: number;
        /** Version for which this license is valid */
        version: string;
        /** License is only valid for given UUID */
        uuid?: string;
        /** If it is a free license or not */
        invoice: Invoice;
    };
}

/** Information about a UI client subscription */
export interface UserInterfaceSubscribeInfo {
    /** The client id, which can be used to send information to clients */
    clientId: string;
    /** The message used for subscription */
    message: ioBroker.Message;
}

export type UserInterfaceClientSubscribeHandler = (
    subscribeInfo: UserInterfaceSubscribeInfo,
) => UserInterfaceClientSubscribeReturnType | Promise<UserInterfaceClientSubscribeReturnType>;

/** Result returned by the adapter when a UI client subscribes */
export interface UserInterfaceClientSubscribeReturnType {
    /** If the adapter has accepted the client subscription */
    accepted: boolean;
    /** Optional heartbeat, if set, the client needs to re-subscribe every heartbeat interval */
    heartbeat?: number;
    /** Optional error if not accepted */
    error?: string;
}

type UserInterfaceUnsubscribeInfoBaseObject = {
    /** The handler id, which can be used to send information to clients */
    clientId: string;
};

export type UserInterfaceUnsubscribeInfo = UserInterfaceUnsubscribeInfoBaseObject &
    (
        | {
              /** Reason for unsubscribing */
              reason: Exclude<UserInterfaceClientUnsubscribeReason, ClientUnsubscribeReason>;
              /** No message is present for this unsubscribe reason */
              message?: undefined;
          }
        | {
              /** Reason for unsubscribing */
              reason: ClientUnsubscribeReason;
              /** Message used for unsubscribing */
              message: ioBroker.Message;
          }
    );

export type UserInterfaceClientUnsubscribeHandler = (
    unsubscribeInfo: UserInterfaceUnsubscribeInfo,
) => void | Promise<void>;

export type UserInterfaceClientRemoveMessage =
    | (Omit<ioBroker.Message, 'message' | 'command'> & {
          /** Command identifying this as a client unsubscribe message */
          command: 'clientUnsubscribe';
          /** Details of the unsubscribe */
          message: {
              /** Reason for unsubscribing */
              reason: MessageUnsubscribeReason;
              /** The subscription types affected */
              type: string[];
          };
      })
    | (Omit<ioBroker.Message, 'message' | 'command'> & {
          /** Command identifying this as a client subscribe error message */
          command: 'clientSubscribeError';
          /** Details of the subscribe error */
          message: {
              /** No reason is provided for a subscribe error */
              reason: undefined;
              /** The subscription types affected */
              type: string[];
          };
      });

export type Pattern = string | string[];

/** Subset of the adapter config relevant for the connection to the controller */
export interface AdapterOptionsConfig {
    /** Logging configuration */
    log: {
        /** The log level to use */
        level: ioBroker.LogLevel;
    };
}

/** Internal options for formatting a date */
export interface InternalFormatDateOptions {
    /** The date to format, as Date, timestamp or string */
    dateObj: string | Date | number;
    /** Whether the value represents a duration instead of a point in time */
    isDuration: boolean;
    /** Optional explicit format string */
    _format?: string;
}

/** Details about an alias and its targets */
export interface AliasDetails {
    /** Source definition of the alias */
    source?: AliasDetailsSource;
    /** Target states the alias points to */
    targets: AliasTargetEntry[];
}

/** Source definition of an alias */
export interface AliasDetailsSource {
    /** Minimum value of the source */
    min?: number;
    /** Maximum value of the source */
    max?: number;
    /** Common type of the source */
    type?: ioBroker.CommonType;
    /** Unit of the source value */
    unit?: string;
}

/** A single target of an alias */
export interface AliasTargetEntry {
    /** Alias definition of the target's common section */
    alias: ioBroker.StateCommon['alias'];
    /** The id of the target state */
    id: string;
    /** The subscription pattern of the target */
    pattern: string;
    /** Common type of the target */
    type?: ioBroker.CommonType;
    /** Maximum value of the target */
    max?: number;
    /** Minimum value of the target */
    min?: number;
    /** Unit of the target value */
    unit?: string;
}

/** Result of checking a set of states */
export interface CheckStatesResult {
    /** The matching state objects */
    objs: ioBroker.StateObject[];
    /** The matching state ids */
    ids: string[];
}

/** Result of setting a state only if it changed */
export interface SetStateChangedResult {
    /** Whether the state value was unchanged */
    notChanged: boolean;
    /** The id of the state */
    id: string;
}

/** Options for resolving the groups of a user */
export interface GetUserGroupsOptions {
    /** The user whose groups should be resolved */
    user: ioBroker.ObjectIDs.User;
    groups?: ioBroker.ObjectIDs.Group[];
    _objects?: (ioBroker.StateObject | null)[];
    checked?: boolean;
    acl: any;
}

export type CheckStateCommand = 'getState' | 'setState' | 'delState';

export type MaybePromise = Promise<void> | void;

/** Options for storing a session */
export interface InternalSetSessionOptions {
    /** The session id */
    id: string;
    /** Time to live in seconds */
    ttl: number;
    /** The session data to store */
    data: Record<string, any>;
    /** Called once the session has been stored */
    callback?: ioBroker.ErrorCallback;
}

/** Options for reading a session */
export interface InternalGetSessionOptions {
    /** The session id */
    id: string;
    /** Called with the session data */
    callback: ioBroker.GetSessionCallback;
}

/** Options for destroying a session */
export interface InternalDestroySessionOptions {
    /** The session id */
    id: string;
    /** Called once the session has been destroyed */
    callback?: ioBroker.ErrorCallback;
}

/** Options for finding a free port */
export interface InternalGetPortOptions {
    /** The preferred port to start searching from */
    port: number;
    /** The host to bind to */
    host?: string;
    /** Called with the free port that was found */
    callback?: (port: number) => void;
}

export type CheckPasswordCallback = (success: boolean, user: string) => void;

/** Options for checking a user's password */
export interface InternalCheckPasswordOptions {
    /** The user to check */
    user: string;
    /** The password to verify */
    pw: string;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called with the result of the check */
    callback: CheckPasswordCallback;
}

/** Options for resolving a user id */
export interface InternalGetUserIDOptions {
    /** The user name to resolve */
    username: string;
}

/** Options for setting a user's password */
export interface InternalSetPasswordOptions {
    /** The user whose password is set */
    user: string;
    /** The new password */
    pw: string;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called once the password has been set */
    callback?: ioBroker.ErrorCallback;
}

export type CheckGroupCallback = (result: boolean) => void;

/** Options for checking whether a user belongs to a group */
export interface InternalCheckGroupOptions {
    /** The user to check */
    user: string;
    /** The group to check membership of */
    group: string;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called with the result of the check */
    callback?: CheckGroupCallback;
}

/** A single command permission requirement */
export type CommandsPermissionsEntry = {
    /** The object category the permission applies to */
    type: 'object' | 'state' | '' | 'other' | 'file';
    /** The operation requiring the permission */
    operation: string;
};
export type CommandsPermissionsObject = {
    [permission: string]: CommandsPermissionsEntry;
};

export type CommandsPermissions = CommandsPermissionsObject | CommandsPermissionsEntry[];

export type CalculatePermissionsCallback = (result: ioBroker.PermissionSet) => void;

/** Options for sending data to a UI client */
export interface SendToUserInterfaceClientOptions {
    /** id of the UI client, if not given send to all active clients */
    clientId?: string;
    /** data to send to the client */
    data: unknown;
}

export type AllPropsUnknown<T> = { [K in keyof T]: unknown };

/** Options for calculating the permissions of a user */
export interface InternalCalculatePermissionsOptions {
    /** The user to calculate the permissions for */
    user: string;
    /** The permission requirements of the commands */
    commandsPermissions: CommandsPermissions;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called with the calculated permission set */
    callback?: CalculatePermissionsCallback;
}

export type GetCertificatesCallback = (
    err?: Error | null,
    certs?: ioBroker.Certificates,
    useLetsEncryptCert?: boolean,
) => void;

export type GetCertificatesPromiseReturnType = [cert: ioBroker.Certificates, useLetsEncryptCert?: boolean];

/** Options for reading the SSL certificates */
export interface InternalGetCertificatesOptions {
    /** Name of the public certificate */
    publicName?: string;
    /** Name of the private key */
    privateName?: string;
    /** Name of the chained certificate */
    chainedName?: string;
    /** Called with the certificates */
    callback?: GetCertificatesCallback;
}

/** Options for updating the adapter config */
export interface InternalUpdateConfigOptions {
    /** The new configuration values */
    newConfig: Record<string, any>;
}

export type GetEncryptedConfigCallback = (error: Error | null | undefined, result?: string | string[]) => void;

/** Options for reading an encrypted config value */
export interface InternalGetEncryptedConfigOptions {
    /** The config attribute to decrypt */
    attribute: string;
    /** Called with the decrypted value */
    callback?: GetEncryptedConfigCallback;
}

export type TimeoutCallback = (...args: any[]) => void;

/** Options for setting an object */
export interface InternalSetObjectOptions {
    /** The id of the object */
    id: string;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User; preserve?: { [key: string]: boolean } } | null;
    /** The object to set */
    obj: ioBroker.SettableObject;
    /** Called once the object has been set */
    callback?: ioBroker.SetObjectCallback;
}

/** Options for deleting a state */
export interface InternalDelStateOptions {
    /** The id of the state */
    id: string;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called once the state has been deleted */
    callback?: ioBroker.ErrorCallback;
}

/** Options for reading an object */
export interface InternalGetObjectOptions {
    /** The id of the object */
    id: string;
    /** Optional settings including the user context */
    options: { user?: ioBroker.ObjectIDs.User } | null | undefined;
    /** Called with the object */
    callback?: ioBroker.GetObjectCallback<any>;
}

/** Options for reading the history of a state */
export interface InternalGetHistoryOptions {
    /** The id of the state */
    id: string;
    /** Options controlling the history query */
    options?: ioBroker.GetHistoryOptions | null;
    /** Called with the history data */
    callback: ioBroker.GetHistoryCallback;
}

/** Options for reading multiple objects */
export interface InternalGetObjectsOptions {
    /** The pattern to match object ids against */
    pattern: Pattern;
    /** Restrict the result to objects of this type */
    type?: string;
    /** Restrict the result to objects within these enums */
    enums?: ioBroker.EnumList;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called with the matching objects */
    callback?: ioBroker.GetObjectsCallbackTyped<any>;
}

/** Options for reading the channels of a device */
export interface InternalGetChannelsOfOptions {
    /** The parent device to read the channels of */
    parentDevice?: string;
    /** Called with the channels */
    callback?: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
}

/** Options for reading all objects of the adapter */
export interface InternalGetAdapterObjectsOptions {
    /** Called with the adapter's objects */
    callback?: (objects: Record<string, ioBroker.AdapterScopedObject>) => void;
}

/** Options for querying an object view */
export interface InternalGetObjectViewOptions {
    /** The design document name */
    design: string;
    /** The view name within the design document */
    search: string;
    /** Query parameters such as startkey and endkey */
    params: ioBroker.GetObjectViewParams;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called with the matching rows */
    callback?: ioBroker.GetObjectViewCallback<ioBroker.AnyObject>;
}

/** Options for reading a single enum */
export interface InternalGetEnumOptions {
    /** The name of the enum to read */
    _enum: string;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called with the enum */
    callback?: ioBroker.GetEnumCallback;
}

/** Options for reading multiple enums */
export interface InternalGetEnumsOptions {
    /** The list of enums to read */
    _enumList?: ioBroker.EnumList;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called with the enums */
    callback?: ioBroker.GetEnumsCallback;
}

/** Options for deleting an object */
export interface InternalDelObjectOptions {
    /** The id of the object */
    id: string;
    /** Options controlling the deletion */
    options?: ioBroker.DelObjectOptions | null;
    /** Called once the object has been deleted */
    callback?: ioBroker.ErrorCallback;
}

/** Options for creating a device */
export interface InternalCreateDeviceOptions {
    /** The name of the device */
    deviceName: string;
    /** The common section of the device object */
    common?: Partial<ioBroker.DeviceCommon>;
    /** The native section of the device object */
    _native?: Record<string, any> | null;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called once the device has been created */
    callback?: ioBroker.SetObjectCallback;
}

/** Options for setting a state */
export interface InternalSetStateOptions {
    /** The id of the state, or an id object */
    id: string | ioBroker.IdObject;
    /** The value (or full state object) to set */
    state: ioBroker.StateValue | ioBroker.SettableState;
    /** Whether the state should be acknowledged */
    ack?: boolean;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called once the state has been set */
    callback?: ioBroker.SetStateCallback;
}

/** Options for setting a state only if it changed */
export interface InternalSetStateChangedOptions extends InternalSetStateOptions {
    /** Called with whether the state was changed */
    callback?: ioBroker.SetStateChangedCallback;
}

/** Options for creating a state */
export interface InternalCreateStateOptions {
    /** The parent device name */
    parentDevice: string;
    /** The parent channel name */
    parentChannel: string;
    /** The name of the state */
    stateName: string;
    /** The common section of the state object */
    common: Partial<ioBroker.StateCommon>;
    /** The native section of the state object */
    _native: Record<string, any>;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called once the state has been created */
    callback?: ioBroker.SetObjectCallback;
}

/** Options for subscribing to states or objects */
export interface InternalSubscribeOptions {
    /** The pattern to subscribe to */
    pattern: Pattern;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called once the subscription is registered */
    callback?: ioBroker.ErrorCallback;
}

/** Options for adding a channel to an enum */
export interface InternalAddChannelToEnumOptions {
    /** The category of the enum (e.g. rooms, functions) */
    enumName: string;
    /** The enum id to add the channel to */
    addTo: string;
    /** The parent device name */
    parentDevice: string;
    /** The name of the channel */
    channelName: string;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called once the channel has been added */
    callback?: ioBroker.ErrorCallback;
}

/** Options controlling how a message is sent */
export interface SendToOptions {
    /** Method throws or calls error cb, if callback not called in time, works for single targets only */
    timeout?: number;
}

/** Options for sending a message to another instance */
export interface InternalSendToOptions {
    /** The instance to send the message to */
    instanceName: string;
    /** The command to send */
    command: string;
    /** The message payload */
    message: any;
    /** Called with the response */
    callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo;
    /** Additional send options */
    options?: SendToOptions;
}

/** Message Callback used internally */
export interface MessageCallbackObject {
    /** the callback itself */
    cb: ioBroker.MessageCallback;
    /** The timestamp of the initial message */
    time: number;
    /** An optional timer, if a timeout has been specified */
    timer?: NodeJS.Timeout;
}

/** Options for sending a message to a host */
export interface InternalSendToHostOptions {
    /** if null, send to all hosts */
    hostName: string | null;
    /** The command to send */
    command: string;
    /** The message payload */
    message: any;
    /** Called with the response */
    callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo;
}

/** Options for reading a state */
export interface InternalGetStateOptions {
    /** The id of the state */
    id: string;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called with the state */
    callback?: ioBroker.GetStateCallback;
}

/** Options for reading multiple states */
export interface InternalGetStatesOptions {
    /** The pattern to match state ids against */
    pattern: Pattern;
    /** Optional settings including the user context */
    options: {
        user?: ioBroker.ObjectIDs.User;
        _objects?: (ioBroker.StateObject | null)[];
        checked?: boolean;
        maintenance?: boolean;
    };
    /** Called with the matching states */
    callback: ioBroker.GetStatesCallback;
}

/** Options for deleting a device */
export interface InternalDeleteDeviceOptions {
    /** The name of the device */
    deviceName: string;
    /** Called once the device has been deleted */
    callback?: ioBroker.ErrorCallback;
}

/** Options for removing a channel from an enum */
export interface InternalDeleteChannelFromEnumOptions {
    /** The category of the enum (e.g. rooms, functions) */
    enumName: string;
    /** The parent device name */
    parentDevice: string;
    /** The name of the channel */
    channelName: string;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called once the channel has been removed */
    callback?: ioBroker.ErrorCallback;
}

/** Options for deleting a channel */
export interface InternalDeleteChannelOptions {
    /** The parent device name */
    parentDevice: string;
    /** The name of the channel */
    channelName: string;
    /** Called once the channel has been deleted */
    callback?: ioBroker.ErrorCallback;
}

/** Options for deleting a state by device/channel/name */
export interface InternalDeleteStateOptions {
    /** The parent device name */
    parentDevice: string;
    /** The parent channel name */
    parentChannel: string;
    /** The name of the state */
    stateName: string;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called once the state has been deleted */
    callback?: ioBroker.ErrorCallback;
}

/** Options for reading all devices */
export interface InternalGetDevicesOptions {
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called with the devices */
    callback: ioBroker.GetObjectsCallback3<ioBroker.DeviceObject>;
}

/** Options for reading the states of a device or channel */
export interface InternalGetStatesOfOptions {
    /** The parent device name */
    parentDevice: string | null | undefined;
    /** The parent channel name */
    parentChannel: string | null | undefined;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called with the states */
    callback: ioBroker.GetObjectsCallback3<ioBroker.StateObject>;
}

/** Options for adding a state to an enum */
export interface InternalAddStateToEnumOptions {
    /** The category of the enum (e.g. rooms, functions) */
    enumName: string;
    /** The enum id to add the state to */
    addTo: string;
    /** The parent device name */
    parentDevice: string;
    /** The parent channel name */
    parentChannel: string;
    /** The name of the state */
    stateName: string;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called once the state has been added */
    callback?: ioBroker.ErrorCallback;
}

/** Options for removing a state from an enum */
export interface InternalDeleteStateFromEnumOptions {
    /** The category of the enum (e.g. rooms, functions) */
    enumName: string;
    /** The parent device name */
    parentDevice: string;
    /** The parent channel name */
    parentChannel: string;
    /** The name of the state */
    stateName: string;
    /** Optional settings including the user context */
    options?: { user?: ioBroker.ObjectIDs.User } | null;
    /** Called once the state has been removed */
    callback?: ioBroker.ErrorCallback;
}

/** Options for reporting a deprecation warning */
export interface InternalReportDeprecationOption {
    /** Version in which this warning will throw an error instead */
    version?: string;
    /** The log line to report */
    deprecationMessage: string;
}

/** Parameters controlling how the adapter stops */
export interface StopParameters {
    /** Specify an optional exit code */
    exitCode?: number;
    /** Specify an optional reason for stoppage */
    reason?: string;
}

/** Internal parameters controlling how the adapter stops */
export interface InternalStopParameters extends StopParameters {
    /** If mode is schedule or once */
    isPause?: boolean;
    /** If it has a restart schedule running */
    isScheduled?: boolean;
    /** If alive state should be updated, if undefined defaults to true */
    updateAliveState?: boolean;
}

/**
 * The internal adapter config type should only be used to access config properties which are set by the adapter developers.
 * Only use it like `this.config as InternalAdapterConfig`
 */
export type InternalAdapterConfig = Record<string, unknown>;

/** Options for installing a node module */
export interface InstallNodeModuleOptions {
    /** Version of node module */
    version: string;
}

/** Internal options for installing a node module */
export interface InternalInstallNodeModuleOptions extends InstallNodeModuleOptions {
    /** Name of the npm module or an installable url ẁorking with `npm install` */
    moduleNameOrUrl: string;
}

/**
 * Options for the generated notification
 */
export interface NotificationOptions {
    /**
     * Additional context for the notification which can be used by notification processing adapters
     */
    contextData: ioBroker.NotificationContextData;
}
