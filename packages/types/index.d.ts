// Type definitions for ioBroker 4.0
// Project: https://github.com/ioBroker/ioBroker, http://iobroker.net
// Definitions by: AlCalzone <https://github.com/AlCalzone>
// Definitions: https://github.com/iobroker/iobroker.js-controller
// TypeScript Version: 4.5

// Note: This is not the definition for the package `iobroker`,
// which is just an installer, not a library.
// The definitions may change with updates to ioBroker.js-controller

/// <reference types="node" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./objects.d.ts" />

import { AdapterClass, AdapterOptions as _AdapterOptions } from './build/types';
import * as fs from 'fs';
export {}; // avoids exporting AtLeastOne into the global scope

// Requires at least one of the properties of T to be given, whether it's optional or not
type AtLeastOne<T, Req = { [K in keyof T]-?: T[K] }, Opt = { [K in keyof T]+?: T[K] }> = {
    [K in keyof Req]: Omit<Opt, K> & { [P in K]: Req[P] };
}[keyof Req];

declare global {
    namespace ioBroker {
        enum StateQuality {
            good = 0x00, // or undefined or null
            bad = 0x01,
            general_problem = 0x01,
            general_device_problem = 0x41,
            general_sensor_problem = 0x81,
            device_not_connected = 0x42,
            sensor_not_connected = 0x82,
            device_reports_error = 0x44,
            sensor_reports_error = 0x84
        }

        type StateValue = string | number | boolean | null;

        interface State {
            /** The value of the state. */
            val: StateValue;

            /** Direction flag: false for desired value and true for actual value. Default: false. */
            ack: boolean;

            /** Unix timestamp. Default: current time */
            ts: number;

            /** Unix timestamp of the last time the value changed */
            lc: number;

            /** Name of the adapter instance which set the value, e.g. "system.adapter.web.0" */
            from: string;

            /** The user who set this value */
            user?: string;

            /** Optional time in seconds after which the state is reset to null */
            expire?: number;

            /** Optional quality of the state value */
            q?: StateQuality;

            /** Optional comment */
            c?: string;
        }

        type SettableState = AtLeastOne<State>;

        type Session = any; // TODO: implement

        /** Defines access rights for a single object type */
        interface ObjectOperationPermissions {
            /** Whether a user may enumerate objects of this type */
            list: boolean;
            /** Whether a user may read objects of this type */
            read: boolean;
            /** Whether a user may write objects of this type */
            write: boolean;
            /** Whether a user may create objects of this type */
            create: boolean;
            /** Whether a user may delete objects of this type */
            delete: boolean;
        }

        /** Defines the rights a user or group has to change objects */
        interface ObjectPermissions {
            /** The access rights for files */
            file: ObjectOperationPermissions;
            /** The access rights for objects */
            object: ObjectOperationPermissions;
            /** The access rights for users/groups */
            users: ObjectOperationPermissions;
            /** The access rights for states */
            state?: ObjectOperationPermissions;
        }
        /** Defined the complete set of access rights a user has */
        interface PermissionSet extends ObjectPermissions {
            /** The name of the user this ACL is for */
            user: string;
            /** The name of the groups this ACL was merged from */
            groups: string[];
            /** The access rights for certain commands */
            other: {
                execute: boolean;
                http: boolean;
                sendto: boolean;
            };
        }

        interface Permission {
            /** The type of the permission */
            type: string;
            /** Which kind of operation is required */
            operation: string;
        }
        interface ObjectOrStatePermission extends Permission {
            type: 'object' | 'file' | 'users' | 'state';
            operation: 'list' | 'read' | 'write' | 'create' | 'delete';
        }
        interface OtherPermission extends Permission {
            type: 'other';
            operation: 'execute' | 'http' | 'sendto';
        }
        interface CommandsPermissions {
            // TODO: Are all properties required or is a partial object ok?
            getObject: ObjectOrStatePermission;
            getObjects: ObjectOrStatePermission;
            getObjectView: ObjectOrStatePermission;
            setObject: ObjectOrStatePermission;
            subscribeObjects: ObjectOrStatePermission;
            unsubscribeObjects: ObjectOrStatePermission;
            getStates: ObjectOrStatePermission;
            getState: ObjectOrStatePermission;
            setState: ObjectOrStatePermission;
            getStateHistory: ObjectOrStatePermission;
            subscribe: ObjectOrStatePermission;
            unsubscribe: ObjectOrStatePermission;
            getVersion: Permission;
            httpGet: OtherPermission;
            sendTo: OtherPermission;
            sendToHost: OtherPermission;
            readFile: ObjectOrStatePermission;
            readFile64: ObjectOrStatePermission;
            writeFile: ObjectOrStatePermission;
            writeFile64: ObjectOrStatePermission;
            unlink: ObjectOrStatePermission;
            rename: ObjectOrStatePermission;
            mkdir: ObjectOrStatePermission;
            readDir: ObjectOrStatePermission;
            chmodFile: ObjectOrStatePermission;
            authEnabled: Permission;
            disconnect: Permission;
            listPermissions: Permission;
            getUserPermissions: ObjectOrStatePermission;
        }

        type UserGroup = any; // TODO find out how this looks like
        // interface UserGroup { }

        /** Contains information about a user */
        interface User {
            /** Which groups this user belongs to */
            groups: UserGroup[];
            /** Access rights of this user */
            acl: ObjectPermissions;
        }

        /** Parameters for adapter.getObjectView */
        interface GetObjectViewParams {
            /** First id to include in the return list */
            startkey?: string;
            /** Last id to include in the return list */
            endkey?: string;
            /** Whether docs should be included in the return list */ // TODO: What are docs?
            include_docs?: boolean;
        }

        /** Parameters for adapter.getObjectList */
        type GetObjectListParams = GetObjectViewParams;

        type LogLevel = 'silly' | 'debug' | 'info' | 'warn' | 'error';
        interface Logger {
            /** log message with silly level */
            silly(message: string): void;
            /** log message with debug level */
            debug(message: string): void;
            /** log message with info level (default output level for all adapters) */
            info(message: string): void;
            /** log message with warning severity */
            warn(message: string): void;
            /** log message with error severity */
            error(message: string): void;

            /** Verbosity of the log output */
            level: LogLevel;
        }

        interface Certificates {
            /** private key file */
            key: string | Buffer;
            /** public certificate */
            cert: string | Buffer;
            /** chained CA certificates */
            ca: Array<string | Buffer>;
        }

        type MessagePayload = any;

        /** Callback information for a passed message */
        interface MessageCallbackInfo {
            /** The original message payload */
            message: MessagePayload;
            /** ID of this callback */
            id: number;
            // ???
            ack: boolean;
            /** Timestamp of this message */
            time: number;
        }

        interface SendableMessage {
            /** The command to be executed */
            command: string;
            /** The message payload */
            message: MessagePayload;
            /** The source of this message */
            from: string;
            /** Callback information. This is set when the source expects a response */
            callback?: MessageCallbackInfo;
        }

        /** A message being passed between adapter instances */
        interface Message extends SendableMessage {
            /** ID of this message */
            _id: number;
        }

        type Log = any; // TODO: define this https://github.com/ioBroker/ioBroker.js-controller/blob/master/lib/states/statesInMemServer.js#L873

        type EnumList = string | string[];

        type Enum = any; // TODO: implement this

        type Plugin = Record<string, any>; // TODO: Add definition

        interface DirectoryEntry {
            file: string;
            stats: fs.Stats;
            isDir: boolean;
            acl: any; // access control list object
            modifiedAt: number;
            createdAt: number;
        }

        interface GetHistoryOptions {
            instance?: string;
            start?: number;
            end?: number;
            step?: number;
            count?: number;
            from?: boolean;
            ack?: boolean;
            q?: boolean;
            addID?: boolean;
            limit?: number;
            ignoreNull?: boolean;
            sessionId?: any;
            aggregate?: 'minmax' | 'min' | 'max' | 'average' | 'total' | 'count' | 'none';
        }

        interface DelObjectOptions {
            /** Whether all child objects should be deleted aswell */
            recursive?: boolean;
            // Allow non-documented properties
            [other: string]: unknown;
        }

        interface ExtendObjectOptionsPreserve {
            [prop: string]: ExtendObjectOptionsPreserve | boolean | string[];
        }

        interface ExtendObjectOptions {
            /** Which properties of the original object should be preserved */
            preserve?: ExtendObjectOptionsPreserve;
            // Allow non-documented properties
            [other: string]: unknown;
        }

        /** Predefined notification scopes and their categories */
        interface NotificationScopes {
            system:
                | 'memIssues'
                | 'fsIoErrors'
                | 'noDiskSpace'
                | 'accessErrors'
                | 'nonExistingFileErrors'
                | 'remoteHostErrors'
                | 'restartLoop'
                | 'fileToJsonl';
        }

        type AdapterOptions = _AdapterOptions;

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface AdapterConfig {
            // This is a stub to be augmented in every adapter
        }

        type Adapter = AdapterClass;

        type ReadyHandler = () => void | Promise<void>;
        type ObjectChangeHandler = (id: string, obj: ioBroker.Object | null | undefined) => void | Promise<void>;
        type StateChangeHandler = (id: string, obj: State | null | undefined) => void | Promise<void>;
        type MessageHandler = (obj: Message) => void | Promise<void>;
        type UnloadHandler = (callback: EmptyCallback) => void | Promise<void>;
        type ErrorHandler = (err: Error) => boolean;

        type EmptyCallback = () => void;
        type ErrorCallback = (err?: Error | null) => void;
        /** Special variant of ErrorCallback for methods where Node.js returns an ErrnoException */
        type ErrnoCallback = (err?: NodeJS.ErrnoException | null) => void;
        // TODO: Redefine callbacks as subclass of GenericCallback
        type GenericCallback<T> = (err?: Error | null, result?: T) => void;

        type MessageCallback = (response?: Message) => void;

        type SetObjectCallback = (err?: Error | null, obj?: { id: string }) => void;
        type SetObjectPromise = Promise<NonNullCallbackReturnTypeOf<SetObjectCallback>>;

        type GetObjectCallback<T extends string = string> = (
            err?: Error | null,
            obj?: ObjectIdToObjectType<T> | null
        ) => void;
        type GetObjectPromise<T extends string = string> = Promise<CallbackReturnTypeOf<GetObjectCallback<T>>>;

        type GetEnumCallback = (err?: Error | null, enums?: Record<string, Enum>, requestedEnum?: string) => void;
        type GetEnumsCallback = (
            err?: Error | null,
            result?: {
                [groupName: string]: Record<string, Enum>;
            }
        ) => void;
        type GetEnumsPromise = Promise<NonNullCallbackReturnTypeOf<GetEnumsCallback>>;

        type GetObjectsCallback = (err?: Error | null, objects?: Record<string, ioBroker.Object>) => void;
        type GetObjectsPromise = Promise<NonNullCallbackReturnTypeOf<GetObjectsCallback>>;

        type GetObjectsCallbackTyped<T extends ObjectType> = (
            err?: Error | null,
            objects?: Record<string, ioBroker.AnyObject & { type: T }>
        ) => void;
        type GetObjectsPromiseTyped<T extends ObjectType> = Promise<
            NonNullCallbackReturnTypeOf<GetObjectsCallbackTyped<T>>
        >;

        type FindObjectCallback = (
            /** If an error happened, this contains the message */
            err?: Error | null,
            /** If an object was found, this contains the ID */
            id?: string,
            /** If an object was found, this contains the common.name */
            name?: StringOrTranslated
        ) => void;

        // This is a version used by GetDevices/GetChannelsOf/GetStatesOf
        type GetObjectsCallback3<T extends BaseObject> = (err?: Error | null, result?: T[]) => void;

        type SecondParameterOf<T extends (...args: any[]) => any> = T extends (
            arg0: any,
            arg1: infer R,
            ...args: any[]
        ) => any
            ? R
            : never;
        /** Infers the return type from a callback-style API and strips out null and undefined */
        type NonNullCallbackReturnTypeOf<T extends (...args: any[]) => any> = Exclude<
            SecondParameterOf<T>,
            null | undefined
        >;
        /** Infers the return type from a callback-style API and and leaves null and undefined in */
        type CallbackReturnTypeOf<T extends (...args: any[]) => any> = SecondParameterOf<T>;

        type GetStateCallback = (err: Error | null, state?: State | null) => void;
        type GetStatePromise = Promise<CallbackReturnTypeOf<GetStateCallback>>;

        type GetStatesCallback = (err: Error | null, states?: Record<string, State>) => void;
        type GetStatesPromise = Promise<NonNullCallbackReturnTypeOf<GetStatesCallback>>;

        type GetBinaryStateCallback = (err?: Error | null, state?: Buffer) => void;
        type GetBinaryStatePromise = Promise<CallbackReturnTypeOf<GetBinaryStateCallback>>;

        type SetStateCallback = (err?: Error | null, id?: string) => void;
        type SetStatePromise = Promise<NonNullCallbackReturnTypeOf<SetStateCallback>>;

        type SetStateChangedCallback = (err?: Error | null, id?: string, notChanged?: boolean) => void;
        type SetStateChangedPromise = Promise<NonNullCallbackReturnTypeOf<SetStateChangedCallback>>;

        type DeleteStateCallback = (err?: Error | null, id?: string) => void;

        type GetHistoryResult = Array<State & { id?: string }>;
        type GetHistoryCallback = (
            err: Error | null,
            result?: GetHistoryResult,
            step?: number,
            sessionId?: string
        ) => void;

        /** Contains the return values of readDir */
        interface ReadDirResult {
            /** Name of the file or directory */
            file: string;
            /** File system stats */
            stats: Partial<fs.Stats>;
            /** Whether this is a directory or a file */
            isDir: boolean;
            /** Access rights */
            acl?: EvaluatedFileACL;
            /** Date of last modification */
            modifiedAt?: number;
            /** Date of creation */
            createdAt?: number;
        }
        type ReadDirCallback = (err?: NodeJS.ErrnoException | null, entries?: ReadDirResult[]) => void;
        type ReadDirPromise = Promise<NonNullCallbackReturnTypeOf<ReadDirCallback>>;

        type ReadFileCallback = (err?: NodeJS.ErrnoException | null, data?: Buffer | string, mimeType?: string) => void;
        type ReadFilePromise = Promise<{ data: string | Buffer; mimeType?: string }>;

        /** Contains the return values of chownFile */
        interface ChownFileResult {
            /** The parent directory of the processed file or directory */
            path: string;
            /** Name of the file or directory */
            file: string;
            /** File system stats */
            stats: fs.Stats;
            /** Whether this is a directory or a file */
            isDir: boolean;
            /** Access rights */
            acl: FileACL;
            /** Date of last modification */
            modifiedAt: number;
            /** Date of creation */
            createdAt: number;
        }
        type ChownFileCallback = (err?: NodeJS.ErrnoException | null, processed?: ChownFileResult[]) => void;

        /** Contains the return values of rm */
        interface RmResult {
            /** The parent directory of the deleted file or directory */
            path: string;
            /** The name of the deleted file or directory */
            file: string;
        }
        type RmCallback = (err?: NodeJS.ErrnoException | null, entries?: RmResult[]) => void;

        type ChownObjectCallback = (err?: NodeJS.ErrnoException | null, list?: ioBroker.Object[]) => void;

        type GetConfigKeysCallback = (err?: Error | null, list?: string[]) => void;

        interface GetObjectViewItem<T> {
            /** The ID of this object */
            id: string;
            /** A copy of the object from the DB */
            value: T | null;
        }
        type GetObjectViewCallback<T> = (err?: Error | null, result?: { rows: Array<GetObjectViewItem<T>> }) => void;
        type GetObjectViewPromise<T> = Promise<NonNullCallbackReturnTypeOf<GetObjectViewCallback<T>>>;

        interface GetObjectListItem extends GetObjectViewItem<ioBroker.Object> {
            /** A copy of the object */
            value: ioBroker.Object;
            /** The same as @link{value} */
            doc: ioBroker.Object;
        }
        type GetObjectListCallback = (err?: Error | null, result?: { rows: GetObjectListItem[] }) => void;
        type GetObjectListPromise = Promise<NonNullCallbackReturnTypeOf<GetObjectListCallback>>;

        type ExtendObjectCallback = (
            err?: Error | null,
            result?: { id: string; value: ioBroker.Object },
            id?: string
        ) => void;

        type GetSessionCallback = (session: Session) => void;

        type Timeout = number & { __ioBrokerBrand: 'Timeout' };
        type Interval = number & { __ioBrokerBrand: 'Interval' };
    } // end namespace ioBroker
} // end declare global
