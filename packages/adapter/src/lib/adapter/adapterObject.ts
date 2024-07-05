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
import { AdapterBase } from '@/lib/adapter/adapterBase.js';
/**
 * Here we define dynamically created methods
 */
export interface AdapterObject extends AdapterBase {
    /**
     * Extend an object and create it if it might not exist
     *
     * @deprecated use `adapter.extendObject` without a callback instead
     */
    extendObjectAsync(
        id: string,
        objPart: ioBroker.PartialObject,
        options?: ioBroker.ExtendObjectOptions
    ): ioBroker.SetObjectPromise;
    /** Set the capabilities of the given executable. Only works on Linux systems. */
    setExecutableCapabilities(
        execPath: string,
        capabilities: string[],
        modeEffective?: boolean,
        modePermitted?: boolean,
        modeInherited?: boolean
    ): Promise<void>;
    /** Extend an object (which might not belong to this adapter) and create it if it might not exist */
    extendForeignObjectAsync<T extends string>(
        id: T,
        objPart: ioBroker.PartialObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options?: ioBroker.ExtendObjectOptions
    ): ioBroker.SetObjectPromise;
    /** Reads an object from the object db */
    getObjectAsync(id: string, options?: ioBroker.RequestOptions | null): ioBroker.GetObjectPromise;
    /**
     * Query a predefined object view (similar to SQL stored procedures) and return the results
     * For a detailed description refer to https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#object-fields
     * or http://guide.couchdb.org/editions/1/en/views.html
     */
    getObjectViewAsync<Design extends string = string, Search extends string = string>(
        design: Design,
        search: Search,
        params: ioBroker.GetObjectViewParams | null | undefined,
        options?: ioBroker.RequestOptions | null
    ): ioBroker.GetObjectViewPromise<ioBroker.InferGetObjectViewItemType<Design, Search>>;
    /** Returns a list of objects with id between params.startkey and params.endkey */
    getObjectListAsync(
        params: ioBroker.GetObjectListParams | null,
        options?: { sorted?: boolean } | Record<string, any>
    ): ioBroker.GetObjectListPromise;
    /** Returns the enum tree, filtered by the optional enum name */
    getEnumAsync(name: string, options?: ioBroker.RequestOptions | null): Promise<{ result: Record<string, any>; requestEnum: string }>;
    /** Returns the enum tree, filtered by the optional enum name */
    getEnumsAsync(enumList?: ioBroker.EnumList, options?: ioBroker.RequestOptions | null): ioBroker.GetEnumsPromise;
    /** Deletes an object from the object db */
    delObjectAsync(id: string, options?: ioBroker.DelObjectOptions): Promise<void>;
    /** Deletes an object (which might not belong to this adapter) from the object db */
    delForeignObjectAsync(id: string, options?: ioBroker.DelObjectOptions): Promise<void>;
    /** Subscribe to changes of objects in this instance */
    subscribeObjectsAsync(pattern: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** Unsubscribe from changes of objects in this instance */
    unsubscribeObjectsAsync(pattern: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** Read a value from the states DB. */
    getStateAsync(id: string, options?: ioBroker.RequestOptions | null): ioBroker.GetStatePromise;
    /** Subscribe to changes of objects (which might not belong to this adapter) */
    subscribeForeignObjectsAsync(pattern: Pattern, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** Unsubscribe from changes of objects (which might not belong to this adapter) */
    unsubscribeForeignObjectsAsync(pattern: Pattern, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** Creates an object in the object db. Existing objects are not overwritten. */
    setObjectNotExistsAsync(id: string, obj: ioBroker.SettableObject, options?: ioBroker.RequestOptions | null): ioBroker.SetObjectPromise;
    /** Creates an object (which might not belong to this adapter) in the object db. Existing objects are not overwritten. */
    setForeignObjectNotExistsAsync<T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options?: unknown
    ): ioBroker.SetObjectPromise;

    /** deletes a device, its channels and states */
    deleteDeviceAsync(deviceName: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    addChannelToEnumAsync(
        enumName: string,
        addTo: string,
        parentDevice: string,
        channelName: string,
        options?: ioBroker.RequestOptions | null
    ): Promise<void>;
    deleteChannelFromEnumAsync(
        enumName: string,
        parentDevice: string,
        channelName: string,
        options?: ioBroker.RequestOptions | null
    ): Promise<void>;

    /** Returns a list of all devices in this adapter instance */
    getDevicesAsync(options?: ioBroker.RequestOptions | null): Promise<ioBroker.DeviceObject[]>;

    addStateToEnumAsync(
        enumName: string,
        addTo: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        options?: ioBroker.RequestOptions | null
    ): Promise<void>;
    deleteStateFromEnumAsync(
        enumName: string,
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        options?: ioBroker.RequestOptions | null
    ): Promise<void>;
    /** Validates username and password */
    checkPasswordAsync(user: string, password: string, options?: ioBroker.RequestOptions | null): Promise<boolean>;
    /** Sets a new password for the given user */
    setPasswordAsync(user: string, password: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** <INTERNAL> Checks if a user exists and is in the given group. */
    checkGroupAsync(user: string, group: string, options?: ioBroker.RequestOptions | null): Promise<boolean>;
    /** <INTERNAL> Determines the users permissions */
    calculatePermissionsAsync(
        user: string,
        commandsPermissions: CommandsPermissions,
        options?: ioBroker.RequestOptions | null
    ): Promise<ioBroker.PermissionSet>;
    /** Creates or overwrites an object in the object db */
    setObjectAsync(id: string, obj: ioBroker.SettableObject, options?: ioBroker.RequestOptions | null): ioBroker.SetObjectPromise;
    /** Creates or overwrites an object (which might not belong to this adapter) in the object db */
    setForeignObjectAsync<T extends string>(
        id: T,
        obj: ioBroker.SettableObject<ioBroker.ObjectIdToObjectType<T, 'write'>>,
        options?: ioBroker.RequestOptions | null
    ): ioBroker.SetObjectPromise;
    // TODO: correct types
    getCertificatesAsync(
        publicName?: string,
        privateName?: string,
        chainedName?: string
    ): Promise<GetCertificatesPromiseReturnType>;
    /** Get all states, channels, devices and folders of this adapter */
    getAdapterObjectsAsync(): Promise<Record<string, ioBroker.AdapterScopedObject>>;

    /** Reads an object (which might not belong to this adapter) from the object db*/
    getForeignObjectAsync<T extends string>(id: T, options?: ioBroker.RequestOptions | null): ioBroker.GetObjectPromise<T>;

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
        options?: ioBroker.RequestOptions | null
    ): ioBroker.SetStateChangedPromise;
    setForeignStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: ioBroker.RequestOptions | null
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
        options?: ioBroker.RequestOptions | null
    ): ioBroker.SetStateChangedPromise;
    setStateChangedAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: ioBroker.RequestOptions | null
    ): ioBroker.SetStateChangedPromise;


    /**
     * Get foreign objects by pattern, by specific type and resolve their enums.
     */
    getForeignObjectsAsync<T extends ioBroker.ObjectType>(
        pattern: Pattern,
        type: T,
        enums?: ioBroker.EnumList | null,
        options?: ioBroker.RequestOptions | null
    ): ioBroker.GetObjectsPromiseTyped<T>;
    getForeignObjectsAsync<T extends ioBroker.ObjectType>(
        pattern: Pattern,
        type: T,
        options?: ioBroker.RequestOptions | null
    ): ioBroker.GetObjectsPromiseTyped<T>;
    getForeignObjectsAsync(pattern: Pattern, options?: ioBroker.RequestOptions | null): ioBroker.GetObjectsPromise;

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
        native?: Record<string, any>
    ): ioBroker.SetObjectPromise;
    /** @deprecated use `extendObject` instead */
    createDeviceAsync(
        deviceName: string,
        common: Partial<ioBroker.DeviceCommon>,
        native: Record<string, any>,
        options?: ioBroker.RequestOptions | null
    ): ioBroker.SetObjectPromise;

    /**
     * Finds an object by its ID or name
     */
    findForeignObjectAsync(idOrName: string, type: string): Promise<{ id: string; name: string }>;

    /**
     * Creates an object with a type channel. It must be located under a device
     *
     * @deprecated use `extendObject` instead
     */
    createChannelAsync(
        parentDevice: string,
        channelName: string,
        roleOrCommon?: string | Partial<ioBroker.ChannelCommon>
    ): ioBroker.SetObjectPromise;
    /** @deprecated use `extendObject` instead */
    createChannelAsync(
        parentDevice: string,
        channelName: string,
        roleOrCommon: string | Partial<ioBroker.ChannelCommon>,
        native?: Record<string, any>
    ): ioBroker.SetObjectPromise;
    /** @deprecated use `extendObject` instead */
    createChannelAsync(
        parentDevice: string,
        channelName: string,
        roleOrCommon: string | Partial<ioBroker.ChannelCommon>,
        native: Record<string, any>,
        options?: ioBroker.RequestOptions | null
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
        roleOrCommon?: string | Partial<ioBroker.StateCommon>
    ): ioBroker.SetObjectPromise;
    /** @deprecated use `extendObject` instead */
    createStateAsync(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon: string | Partial<ioBroker.StateCommon>,
        native?: Record<string, any>
    ): ioBroker.SetObjectPromise;
    /** @deprecated use `extendObject` instead */
    createStateAsync(
        parentDevice: string,
        parentChannel: string,
        stateName: string,
        roleOrCommon: string | Partial<ioBroker.StateCommon>,
        native: Record<string, any>,
        options?: ioBroker.RequestOptions | null
    ): ioBroker.SetObjectPromise;

    /**
     * Deletes a channel and its states. It must have been created with createChannel
     *
     * @deprecated use `this.delObject` instead
     */
    deleteChannelAsync(channelName: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** @deprecated use `this.delObject` instead */
    deleteChannelAsync(parentDevice: string, channelName: string, options?: ioBroker.RequestOptions | null): Promise<void>;

    /**
     * Deletes a state. It must have been created with createState
     *
     * @deprecated use `this.delObject` instead
     */
    deleteStateAsync(stateName: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** @deprecated use `this.delObject` instead */
    deleteStateAsync(parentChannel: string, stateName: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** @deprecated use `this.delObject` instead */
    deleteStateAsync(parentDevice: string, parentChannel: string, stateName: string, options?: ioBroker.RequestOptions | null): Promise<void>;

    /**
     * Returns a list of all channels in this adapter instance @param parentDevice (optional) Name
     * of the parent device to filter the channels by @param options (optional) Some internal options.
     */
    getChannelsOfAsync(): Promise<ioBroker.ChannelObject[]>;
    getChannelsOfAsync(parentDevice: string, options?: ioBroker.RequestOptions | null): Promise<ioBroker.ChannelObject[]>;

    /**
     * Returns a list of all channels in this adapter instance
     */
    getChannels(callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>): void;
    getChannels(parentDevice: string, callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>): void;
    getChannels(
        parentDevice: string,
        options: ioBroker.RequestOptions | null,
        callback: ioBroker.GetObjectsCallback3<ioBroker.ChannelObject>
    ): void;

    /**
     * Returns a list of all channels in this adapter instance @param parentDevice (optional)
     * Name of the parent device to filter the channels by @param options (optional) Some internal options.
     */
    getChannelsAsync(): Promise<ioBroker.ChannelObject[]>;
    getChannelsAsync(parentDevice: string, options?: ioBroker.RequestOptions | null): Promise<ioBroker.ChannelObject[]>;

    /**
     * Returns a list of all states in this adapter instance @param parentDevice (optional)
     * Name of the parent device to filter the channels by @param parentChannel (optional)
     * Name of the parent channel to filter the channels by @param options (optional) Some internal options.
     */
    getStatesOfAsync(): Promise<ioBroker.StateObject[]>;
    getStatesOfAsync(parentDevice: string, parentChannel?: string): Promise<ioBroker.StateObject[]>;
    getStatesOfAsync(parentDevice: string, parentChannel: string, options?: ioBroker.RequestOptions | null): Promise<ioBroker.StateObject[]>;
}

// EventEmitter => AdapterBase => AdapterObject => AdapterState => AdapterFile => Adapter
export abstract class AdapterObject extends AdapterBase {
    /** Objects DB constructor */
    private Objects?: typeof ObjectsInRedisClient;

    private enums: Record<string, any> = {};

    /**
     * Contains a live cache of the adapter's objects.
     * NOTE: This is only defined if the adapter was initialized with the option objects: true.
     */
    oObjects?: Record<string, ioBroker.Object | undefined>;

    private _initializeTimeout?: NodeJS.Timeout | null;

    private defaultHistory: null | string = null;

    constructor(options: AdapterOptions | string) {
        super(options);
    }

    protected async _createInstancesObjects(instanceObj: ioBroker.InstanceObject): Promise<void> {
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
                        `${this.namespaceLog} ${this.namespace} invalid instance object: ${JSON.stringify(obj)}`
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
                                this.instance!.toString()
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
                                    this.instance!.toString()
                                );
                            }
                        } else if (commonDesc) {
                            obj.common.desc = commonDesc.replace('%INSTANCE%', this.instance!.toString());
                        }
                    }

                    if (obj.type === 'state' && obj.common.def !== undefined) {
                        // default value given - if obj non-existing we have to set it
                        try {
                            const checkObj = await this.objects!.objectExists(obj._id);
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
                    def: false
                },
                type: 'state',
                native: {}
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

        if (!this.objects) {
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
            if (!this.states) {
                this._logger.info(
                    `${this.namespaceLog} extendObjects not processed because States database not connected.`
                );
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }
            this.outputCount++;
            this.states.setState(
                task._id,
                {
                    val: state,
                    from: `system.adapter.${this.namespace}`,
                    ack: true
                },
                () => setImmediate(() => this._extendObjects(tasks, callback))
            );
        } else {
            setImmediate(() => this._extendObjects(tasks, callback));
        }
    }

    async getEncryptedConfig(attribute: string, callback?: GetEncryptedConfigCallback): Promise<string | void>;

    /**
     * Reads the encrypted parameter from config.
     *
     * It returns promise if no callback is provided.
     */
    getEncryptedConfig(
        /** attribute name in native configuration part */
        attribute: string,
        /** optional callback */
        callback?: GetEncryptedConfigCallback
    ): Promise<string | void> {
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
    protected async getSystemSecret(): Promise<string> {
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

    createAsyncFunctionsForObjects() {
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
         * Promise-version of `Adapter.calculatePermissions`
         */
        this.calculatePermissionsAsync = tools.promisifyNoError(this.calculatePermissions, this);
    }

    async terminateObjects(): Promise<void> {
        if (this.objects) {
            try {
                await this.objects.destroy();
            } catch {
                //ignore
            }
        }
        if (this.startedInCompactMode) {
            this.objects = null;
        }
    }

    protected postInitObjects(cb: () => void): void {
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
        } else {
            this.objects = new this.Objects({
                namespace: this.namespaceLog,
                connection: this._config.objects,
                logger: this._logger,
                connected: async () => {
                    this.connected = true;
                    if (this._initializeTimeout) {
                        clearTimeout(this._initializeTimeout);
                        this._initializeTimeout = null;
                    }

                    if (!this.objects) {
                        return;
                    }

                    // subscribe to user changes
                    this.objects.subscribe('system.user.*');

                    // get all enums and register for enum changes
                    this.enums = await tools.getAllEnums(this.objects);
                    this.objects.subscribe('enum.*');

                    // Read dateformat if using of formatDate is announced
                    if (this._options.useFormatDate) {
                        this.objects.getObject('system.config', (err, data) => {
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
                                        this._removeAliasSubscribe(sourceId, targetAlias, async () => {
                                            try {
                                                await this._addAliasSubscribe(
                                                    obj as ioBroker.StateObject,
                                                    targetAlias.pattern
                                                );
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
                                        await this._addAliasSubscribe(obj as ioBroker.StateObject, id);
                                    } catch (e) {
                                        this._logger.warn(
                                            `${this.namespaceLog} Could not add alias subscription: ${e.message}`
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
                }
            });
        }
    }

    protected async preInitObjects() {
        if (this._config.objects && this._config.objects.type) {
            try {
                this.Objects = (await import(`@iobroker/db-objects-${this._config.objects.type}`)).Client;
            } catch (err) {
                throw new Error(`Unknown objects type: ${this._config.objects.type}: ${err.message}`);
            }
        } else {
            this.Objects = await getObjectsConstructor();
        }
    }
}
