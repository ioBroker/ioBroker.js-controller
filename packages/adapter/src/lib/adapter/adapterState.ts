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
import { AdapterObject } from '@/lib/adapter/adapterObject.js';
import { AdapterBase } from '@/lib/adapter/adapterBase.js';
import { ObjectOperationPermissions } from '@iobroker/types-dev';

/**
 * Here we define dynamically created methods
 */
export interface AdapterState extends AdapterObject {
    // TODO correct types needed
    getHistoryAsync(...args: any[]): Promise<any>;
    /** Deletes a state from the states DB, but not the associated object. Consider using deleteState instead */
    delStateAsync(id: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** Deletes a state from the states DB, but not the associated object */
    delForeignStateAsync(id: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** Read all states of this adapter that match the given pattern */
    getStatesAsync(pattern: string, options?: ioBroker.RequestOptions | null): ioBroker.GetStatesPromise;
    /** Read all states (which might not belong to this adapter) which match the given pattern */
    getForeignStatesAsync(pattern: Pattern, options?: ioBroker.RequestOptions | null): ioBroker.GetStatesPromise;
    /** Subscribe to changes of states (which might not belong to this adapter) */
    subscribeForeignStatesAsync(pattern: Pattern, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** Subscribe from changes of states (which might not belong to this adapter) */
    unsubscribeForeignStatesAsync(pattern: Pattern, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** Subscribe to changes of states in this instance */
    subscribeStatesAsync(pattern: Pattern, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** Subscribe from changes of states in this instance */
    unsubscribeStatesAsync(pattern: Pattern, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** Read a value (which might not belong to this adapter) from the states DB. */
    getForeignStateAsync(id: string, options?: ioBroker.RequestOptions | null): ioBroker.GetStatePromise;
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
        message: ioBroker.MessagePayload,
        options?: SendToOptions
    ): Promise<ioBroker.Message | undefined>;

    /**
     * Writes a value into the states DB.
     *
     * @deprecated use `adapter.setState` without a callback instead
     */
    setStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack?: boolean
    ): ioBroker.SetStatePromise;
    /** @deprecated use `adapter.setState` without a callback instead */
    setStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options?: ioBroker.RequestOptions | null
    ): ioBroker.SetStatePromise;
    /** @deprecated use `adapter.setState` without a callback instead */
    setStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: ioBroker.RequestOptions | null
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
        options?: ioBroker.RequestOptions | null
    ): ioBroker.SetStatePromise;
    setForeignStateAsync(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: ioBroker.RequestOptions | null
    ): ioBroker.SetStatePromise;
}

interface RequestOptionsInternal {
    // Initially, the request comes only with this attribute or empty
    /** name of the user, which make a request */
    user: ioBroker.ObjectIDs.User;

    // These parameters will be added during access check
    groups: ioBroker.ObjectIDs.Group[];
    group: ioBroker.ObjectIDs.Group | undefined; // user may belong to several groups or to no one group
    acl: ioBroker.ObjectPermissions;

    owner?: ioBroker.ObjectIDs.User;
    ownerGroup?: ioBroker.ObjectIDs.Group;
    checked?: boolean;
}

export interface InternalGetStatesOptions {
    pattern: Pattern;
    options: ioBroker.RequestOptions;
    callback: ioBroker.GetStatesCallback;
}

type UserRights = { groups: ioBroker.ObjectIDs.Group[], acl: ioBroker.ObjectPermissions };

// EventEmitter => AdapterBase => AdapterObject => AdapterState => AdapterFile => Adapter
export abstract class AdapterState extends AdapterObject {
    private _initializeStatesTimeout?: NodeJS.Timeout | null;


    /** States DB constructor */
    private States?: typeof StatesInRedisClient;

    /**
     * Contains a live cache of the adapter's states.
     * NOTE: This is only defined if the adapter was initialized with the option states: true.
     */
    oStates?: Record<string, ioBroker.State | undefined>;

    /** The cache of users */
    private users: Record<ioBroker.ObjectIDs.User, UserRights> = {};

    /** The cache of user groups */
    private groups: Record<string, ioBroker.GroupObject> = {};

    constructor(options: AdapterOptions | string) {
        super(options);
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

    createAsyncFunctionsForStates() {
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
    }

    sendTo(
        instanceName: string,
        message: any,
        callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo
    ): void;
    sendTo(
        instanceName: string,
        command: string,
        message: any,
        callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo,
        options?: SendToOptions
    ): void;

    /**
     * Send a message to another adapter instance or all instances of adapter.
     *
     * This function sends a message to specific instance or all instances of some specific adapter.
     * If no instance is given (e.g. "pushover"), the callback argument will be ignored. Because normally, many responses will come.
     *
     * @param instanceName name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0".
     * @param command command name, like "send", "browse", "list". Command is depending on target adapter implementation.
     * @param message object that will be given as argument for request
     * @param callback optional return result
     *        ```js
     *            function (result) {
     *              // result is target-adapter-specific and can vary from adapter to adapter
     *              if (!result) adapter.log.error('No response received');
     *            }
     *        ```
     * @param options optional options to define a timeout. This allows getting an error callback if no answer received in time (only if target is specific instance)
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
            callback: callback as ioBroker.MessageCallbackInfo | ioBroker.MessageCallback
        });
    }

    /**
     * Async version of sendTo
     * As we have a special case (first arg can be an error or result, we need to promisify manually)
     *
     * @param instanceName name of the instance where the message must be sent to. E.g. "pushover.0" or "system.adapter.pushover.0".
     * @param command command name, like "send", "browse", "list". Command is depending on target adapter implementation.
     * @param message object that will be given as argument for request
     * @param options optional options to define a timeout. This allows getting an error callback if no answer received in time (only if target is specific instance)
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
                options as SendToOptions
            );
        });
    }

    private async _sendTo(_options: InternalSendToOptions): Promise<void> {
        const { command, message, callback, options } = _options;
        let { instanceName } = _options;

        const obj: ioBroker.SendableMessage = {
            command: command,
            message: message,
            from: `system.adapter.${this.namespace}`
        };

        if (!instanceName) {
            // @ts-expect-error TODO it could also be the cb object
            return tools.maybeCallbackWithError(callback, 'No instanceName provided or not a string');
        }

        if (!instanceName.startsWith('system.adapter.')) {
            instanceName = `system.adapter.${instanceName}`;
        }

        if (!this.states) {
            // if the instance of states is no longer existing, we do not need to unsubscribe
            this._logger.info(`${this.namespaceLog} sendTo not processed because States database not connected`);
            // @ts-expect-error TODO it could also be the cb object
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
            if (!this.objects) {
                this._logger.info(`${this.namespaceLog} sendTo not processed because Objects database not connected`);
                // @ts-expect-error TODO it could also be the cb object
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            try {
                // Send to all instances of adapter
                const res = await this.objects.getObjectView('system', 'instance', {
                    startkey: `${instanceName}.`,
                    endkey: `${instanceName}.\u9999`
                });

                if (res) {
                    for (const row of res.rows) {
                        try {
                            await this.states!.pushMessage(row.id, obj);
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
                        this.states.subscribeMessage(`system.adapter.${this.namespace}`);
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
                    obj.callback = callback;
                    obj.callback!.ack = true;
                }
            }

            try {
                await this.states.pushMessage(instanceName, obj);
            } catch (e) {
                // @ts-expect-error TODO it could also be the cb object
                return tools.maybeCallbackWithError(callback, e);
            }
        }
    }

    sendToHost(
        hostName: string | null,
        message: any,
        callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo
    ): void;
    sendToHost(
        hostName: string | null,
        command: string,
        message: any,
        callback?: ioBroker.MessageCallback | ioBroker.MessageCallbackInfo
    ): void;

    /**
     * Send a message to a specific host or to all hosts.
     *
     * This function sends a message to specific host or all hosts.
     * If no host name is given (e.g., null), the callback argument will be ignored. Because normally, many responses will come.
     *
     * @param hostName name of the host where the message must be sent to. E.g. "myPC" or "system.host.myPC". If the argument is null, the message will be sent to all hosts.
     * @param command command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage)
     * @param message object that will be given as argument for request
     * @param callback optional return result
     *        ```js
     *            function (result) {
     *              // result is target-adapter-specific and can vary from command to command
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
            callback: callback as ioBroker.MessageCallback | ioBroker.MessageCallbackInfo
        });
    }

    private async _sendToHost(_options: InternalSendToHostOptions): Promise<void> {
        const { command, message, callback } = _options;
        let { hostName } = _options;
        const obj: Partial<ioBroker.Message> = { command, message, from: `system.adapter.${this.namespace}` };

        if (!this.states) {
            // if the instance of states is no longer existing, we do not need to unsubscribe
            this._logger.info(`${this.namespaceLog} sendToHost not processed because States database not connected`);
            // @ts-expect-error TODO it could also be the cb object
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (hostName && !hostName.startsWith('system.host.')) {
            hostName = `system.host.${hostName}`;
        }

        if (!hostName) {
            if (!this.objects) {
                this._logger.info(
                    `${this.namespaceLog} sendToHost not processed because Objects database not connected`
                );
                // @ts-expect-error TODO it could also be the cb object
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            // Send to all hosts
            this.objects.getObjectList(
                {
                    startkey: 'system.host.',
                    endkey: `system.host.\u9999`
                },
                null,
                async (err, res) => {
                    if (!this.states) {
                        // if the instance of states is no longer existing, we do not need to unsubscribe
                        return;
                    }
                    if (!err && res?.rows.length) {
                        for (const row of res.rows) {
                            const parts: string[] = row.id.split('.');
                            // ignore system.host.name.alive and so on
                            if (parts.length === 3) {
                                try {
                                    await this.states!.pushMessage(row.id, obj as any);
                                } catch (e) {
                                    // @ts-expect-error TODO it could also be the cb object
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
                    if (!isMessageboxSupported(this.common!) && !this.mboxSubscribed) {
                        this.mboxSubscribed = true;
                        this.states.subscribeMessage(`system.adapter.${this.namespace}`);
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

                    this.messageCallbacks.set(obj.callback.id, { cb: callback, time: Date.now() });
                } else {
                    obj.callback = callback;
                    obj.callback.ack = true;
                }
            }

            try {
                await this.states.pushMessage(hostName, obj as any);
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
        if (!this.states) {
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        const { clientId, data } = options;

        if (clientId === undefined) {
            return this.uiMessagingController.sendToAllClients({
                data,
                states: this.states
            });
        }

        Validator.assertString(clientId, 'clientId');

        return this.uiMessagingController.sendToClient({
            clientId,
            data,
            states: this.states
        });
    }

    registerNotification<Scope extends keyof ioBroker.NotificationScopes>(
        scope: Scope,
        category: ioBroker.NotificationScopes[Scope] | null,
        message: string
    ): Promise<void>;

    /**
     * Send notification with given scope and category to host of this adapter
     *
     * @param scope - scope to be addressed
     * @param category - to be addressed, if a null message is checked by regex of given scope
     * @param message - message to be stored/checked
     */
    async registerNotification(scope: unknown, category: unknown, message: unknown): Promise<void> {
        if (!this.states) {
            // if the instance of states is no longer existing, we do not need to set
            this._logger.info(
                `${this.namespaceLog} registerNotification not processed because States database not connected`
            );
            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        Validator.assertString(scope, 'scope');
        if (category !== null) {
            Validator.assertString(category, 'category');
        }
        Validator.assertString(message, 'message');

        const obj = {
            command: 'addNotification',
            message: { scope, category, message, instance: this.namespace },
            from: `system.adapter.${this.namespace}`
        };

        await this.states.pushMessage(`system.host.${this.host}`, obj as any);
    }

    // external signatures
    setState<T extends ioBroker.SetStateCallback | undefined>(
        id: string | ioBroker.IdObject,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        callback?: T
    ): T extends unknown ? ioBroker.SetStatePromise : void;
    setState<T extends ioBroker.SetStateCallback | undefined>(
        id: string | ioBroker.IdObject,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        callback?: T
    ): T extends unknown ? ioBroker.SetStatePromise : void;
    setState<T extends ioBroker.SetStateCallback | undefined>(
        id: string | ioBroker.IdObject,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options?: Partial<GetUserGroupsOptions> | null,
        callback?: T
    ): T extends unknown ? ioBroker.SetStatePromise : void;
    setState<T extends ioBroker.SetStateCallback | undefined>(
        id: string | ioBroker.IdObject,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options?: Partial<GetUserGroupsOptions> | null,
        callback?: T
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
        callback?: unknown
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

        if (!this.states) {
            // if the instance of states is no longer existing, we do not need to set
            this._logger.info(`${this.namespaceLog} setState not processed because States database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }
        if (!this.objects) {
            this._logger.info(`${this.namespaceLog} setState not processed because Objects database not connected`);
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, false, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
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
                obj = (await this.objects.getObject(fixedId, options)) as ioBroker.StateObject | null | undefined;
            }
        } catch (e) {
            return tools.maybeCallbackWithError(callback, e);
        }

        if (!this.objects) {
            // if instance of objects is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} setForeignState not processed because Objects database not connected`
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
                        `Error validating alias id of ${fixedId}: ${e.message}`
                    );
                }

                // check the rights
                let targetObj;
                try {
                    if (permCheckRequired) {
                        targetObj = (await this._checkStates(aliasId, options || {}, 'setState')).objs[0];
                    } else {
                        targetObj = (await this.objects.getObject(aliasId, options)) as
                            | ioBroker.StateObject
                            | null
                            | undefined;
                    }
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }

                if (!this.states) {
                    // if the instance of states is no longer existing, we do not need to unsubscribe
                    this._logger.info(
                        `${this.namespaceLog} setForeignState not processed because States database not connected`
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                // write target state
                this.outputCount++;
                try {
                    const res = await this.states.setState(
                        aliasId,
                        tools.formatAliasValue({
                            sourceCommon: obj?.common,
                            targetCommon: targetObj?.common as any,
                            state: stateObj as ioBroker.State,
                            logger: this._logger,
                            logNamespace: this.namespaceLog,
                            sourceId: obj?._id,
                            targetId: targetObj?._id
                        })
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
            if (!this.states) {
                // if the instance of states is no longer existing, we do not need to unsubscribe
                this._logger.info(
                    `${this.namespaceLog} setForeignState not processed because States database not connected`
                );
                return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
            }

            this.outputCount++;
            try {
                const res = await this.states.setState(fixedId, stateObj);
                return tools.maybeCallbackWithError(callback, null, res);
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        }
    }

    // Cache will be cleared if user or group changes. Important! only if subscribed.
    private async _getUserGroups(options: RequestOptionsInternal): Promise<RequestOptionsInternal> {
        if (this.users[options.user]) {
            options.groups = this.users[options.user].groups;
            options.acl = this.users[options.user].acl;
            return options;
        }

        options.groups = [];

        let groups;
        try {
            groups = await this.getForeignObjectsAsync('*', 'group', null, null);
        } catch {
            // ignore
        }

        // aggregate all groups permissions, where this user is
        if (groups) {
            for (const group of Object.values(groups)) {
                this.groups[group._id] = group;
                if (group.common.members.includes(options.user)) {
                    options.groups.push(group._id);
                }
            }
        }

        // read all groups for this user
        const userAcl: ioBroker.ObjectPermissions = {
            users: {
                read: false,
                write: false,
                create: false,
                'delete': false,
                list: false
            },
            state: {
                read: false,
                write: false,
                create: false,
                'delete': false,
                list: false
            },
            file: {
                read: false,
                write: false,
                create: false,
                'delete': false,
                list: false
            },
            object: {
                read: false,
                write: false,
                create: false,
                'delete': false,
                list: false
            }
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
                const groupAcl = group.common.acl.file;
                if (!user.acl?.file) {
                    user.acl = user.acl || {};
                    user.acl.file = user.acl.file || ({} as ioBroker.ObjectOperationPermissions);
                    const userAcl = user.acl.file;

                    userAcl.create = groupAcl.create;
                    userAcl.read = groupAcl.read;
                    userAcl.write = groupAcl.write;
                    userAcl.delete = groupAcl.delete;
                    userAcl.list = groupAcl.list;
                } else {
                    const userAcl = user.acl.file;
                    userAcl.create = userAcl.create || groupAcl.create;
                    userAcl.read = userAcl.read || groupAcl.read;
                    userAcl.write = userAcl.write || groupAcl.write;
                    userAcl.delete = userAcl.delete || groupAcl.delete;
                    userAcl.list = userAcl.list || groupAcl.list;
                }
            }

            if (group.common?.acl?.object) {
                const groupAcl = group.common.acl.object;
                if (!user.acl?.object) {
                    user.acl = user.acl || {};
                    user.acl.object = user.acl.object || ({} as ioBroker.ObjectOperationPermissions);
                    const userAcl = user.acl.object;

                    userAcl.create = groupAcl.create;
                    userAcl.read = groupAcl.read;
                    userAcl.write = groupAcl.write;
                    userAcl.delete = groupAcl.delete;
                    userAcl.list = groupAcl.list;
                } else {
                    const userAcl = user.acl.object;
                    userAcl.create = userAcl.create || groupAcl.create;
                    userAcl.read = userAcl.read || groupAcl.read;
                    userAcl.write = userAcl.write || groupAcl.write;
                    userAcl.delete = userAcl.delete || groupAcl.delete;
                    userAcl.list = userAcl.list || groupAcl.list;
                }
            }

            if (group.common?.acl?.users) {
                const groupAcl = group.common.acl.users;
                if (!user.acl?.users) {
                    user.acl = user.acl || {};
                    user.acl.users = user.acl.users || ({} as ioBroker.ObjectOperationPermissions);
                    const userAcl = user.acl.users;

                    userAcl.create = groupAcl.create;
                    userAcl.read = groupAcl.read;
                    userAcl.write = groupAcl.write;
                    userAcl.delete = groupAcl.delete;
                    userAcl.list = groupAcl.list;
                } else {
                    const userAcl = user.acl.users;
                    userAcl.create = userAcl.create || groupAcl.create;
                    userAcl.read = userAcl.read || groupAcl.read;
                    userAcl.write = userAcl.write || groupAcl.write;
                    userAcl.delete = userAcl.delete || groupAcl.delete;
                    userAcl.list = userAcl.list || groupAcl.list;
                }
            }

            if (group.common?.acl?.state) {
                const groupAcl = group.common.acl.state;
                if (!user.acl?.state) {
                    user.acl = user.acl || {};
                    user.acl.state = user.acl.state || ({} as ioBroker.ObjectOperationPermissions);
                    const userAcl = user.acl.state;

                    userAcl.create = groupAcl.create;
                    userAcl.read = groupAcl.read;
                    userAcl.write = groupAcl.write;
                    userAcl.delete = groupAcl.delete;
                    userAcl.list = groupAcl.list;
                } else {
                    const userAcl = user.acl.state;
                    userAcl.create = userAcl.create || groupAcl.create;
                    userAcl.read = userAcl.read || groupAcl.read;
                    userAcl.write = userAcl.write || groupAcl.write;
                    userAcl.delete = userAcl.delete || groupAcl.delete;
                    userAcl.list = userAcl.list || groupAcl.list;
                }
            }
        }

        this.users[options.user] = {
            groups: options.groups,
            acl: userAcl
        };
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

    private async _checkStates(
        ids: Pattern,
        options: RequestOptionsInternal,
        command: CheckStateCommand
    ): Promise<CheckStatesResult> {
        if (!options.groups) {
            options = await this._getUserGroups(options);
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

            if (!this.objects) {
                this._logger.info(
                    `${this.namespaceLog} checkStates not processed because Objects database not connected`
                );

                throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
            }

            const obj = (await this.objects.getObject(id, options)) as ioBroker.StateObject;

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
                this.groups[id] = obj || {} as ioBroker.GroupObject;
            }
        }
    }

    private async _setStateChangedHelper(id: string, state: ioBroker.SettableState): Promise<SetStateChangedResult> {
        if (!this.objects) {
            this._logger.info(
                `${this.namespaceLog} setStateChanged not processed because Objects database not connected`
            );

            throw new Error(tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (id.startsWith(ALIAS_STARTS_WITH)) {
            let obj;
            let err;
            try {
                obj = await this.objects.getObject(id);
            } catch (e) {
                err = e;
            }
            if (obj?.common?.alias?.id) {
                // id can be string or can have attribute write
                const aliasId = tools.isObject(obj.common.alias.id) ? obj.common.alias.id.write : obj.common.alias.id;
                return this._setStateChangedHelper(aliasId, state);
            } else {
                this._logger.warn(`${this.namespaceLog} ${err ? err.message : `Alias ${id} has no target 1`}`);
                throw new Error(err ? err.message : `Alias ${id} has no target`);
            }
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
                await this.states!.setState(id, state);
                return { id, notChanged: false };
            } else {
                return { id, notChanged: true };
            }
        }
    }

    setStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        callback?: ioBroker.SetStateChangedCallback
    ): void;
    setStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        callback?: ioBroker.SetStateChangedCallback
    ): void;
    setStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options: unknown,
        callback?: ioBroker.SetStateChangedCallback
    ): void;
    setStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown,
        callback?: ioBroker.SetStateChangedCallback
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
        if (!this.states) {
            // if the instance of states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} setStateChanged not processed because States database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, false, null);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
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
        } else {
            const res = await this._setStateChangedHelper(fixedId, stateObj);
            // @ts-expect-error todo fix it
            return tools.maybeCallbackWithError(callback, null, res.id, res.notChanged);
        }
    }

    setForeignState(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        callback?: ioBroker.SetStateCallback
    ): void;
    setForeignState(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        callback?: ioBroker.SetStateCallback
    ): void;
    setForeignState(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options: unknown,
        callback?: ioBroker.SetStateCallback
    ): void;
    setForeignState(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown,
        callback?: ioBroker.SetStateCallback
    ): void;

    /**
     * Writes value into the "states" DB for any instance.
     *
     * This function can write values into the "states" DB for all instances and system states too.
     * ack, options and callback are optional
     *
     * @param id object ID of the state.
     * @param state simple value or object with attributes.
     *  If state is object, so the ack will be ignored and must be included in an object.
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

        if (!this.states) {
            // if the instance of states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} setForeignState not processed because States database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!this.objects) {
            this._logger.info(
                `${this.namespaceLog} setForeignState not processed because Objects database not connected`
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
            if (!this.states) {
                // if the instance of states is no longer existing, we do not need to unsubscribe
                this._logger.info(
                    `${this.namespaceLog} setForeignState not processed because States database not connected`
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
                            `Error validating alias id of ${id}: ${e.message}`
                        );
                    }

                    let targetObj;
                    // we ignore permissions on the target object and thus get it as admin user
                    try {
                        targetObj = await this.objects.getObject(aliasId, {
                            ...options,
                            user: SYSTEM_ADMIN_USER
                        });
                    } catch (e) {
                        return tools.maybeCallbackWithError(callback, e);
                    }
                    if (!this.states) {
                        // if the instance of states is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            `${this.namespaceLog} setForeignState not processed because States database not connected`
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    this.outputCount++;
                    this.states.setState(
                        aliasId,
                        tools.formatAliasValue({
                            sourceCommon: obj?.common,
                            targetCommon: targetObj && (targetObj.common as any),
                            state,
                            logger: this._logger,
                            logNamespace: this.namespaceLog,
                            sourceId: obj?._id,
                            targetId: targetObj?._id
                        }),
                        callback
                    );
                } else {
                    this._logger.warn(`${this.namespaceLog} Alias ${id} has no target 3`);
                    return tools.maybeCallbackWithError(callback, `Alias ${id} has no target`);
                }
            } else {
                if (!this.states) {
                    // if the instance of states is no longer existing, we do not need to unsubscribe
                    this._logger.info(
                        `${this.namespaceLog} setForeignState not processed because States database not connected`
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                this.outputCount++;
                this.states.setState(id, state, callback);
            }
        } else {
            // write alias
            if (id.startsWith(ALIAS_STARTS_WITH)) {
                if (!this.objects) {
                    this._logger.info(
                        `${this.namespaceLog} setForeignState not processed because Objects database not connected`
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                // read alias id
                const obj = (await this.objects.getObjectAsync(id, options)) as ioBroker.StateObject;

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
                            `Error validating alias id of ${id}: ${e.message}`
                        );
                    }

                    if (!this.objects) {
                        // if objects is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            `${this.namespaceLog} setForeignState not processed because Objects database not connected`
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    // read object for formatting - we ignore permissions on the target object and thus get it as admin user
                    const targetObj = await this.objects.getObject(targetId, {
                        ...options,
                        user: SYSTEM_ADMIN_USER
                    });

                    if (!this.states) {
                        // if the instance of states is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            `${this.namespaceLog} setForeignState not processed because States database not connected`
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    this.outputCount++;
                    this.states.setState(
                        targetId,
                        tools.formatAliasValue({
                            sourceCommon: obj.common as ioBroker.StateCommon,
                            targetCommon: targetObj?.common as ioBroker.StateCommon | undefined,
                            state,
                            logger: this._logger,
                            logNamespace: this.namespaceLog,
                            sourceId: obj._id,
                            targetId: targetObj?._id
                        }),
                        callback
                    );
                } else {
                    this._logger.warn(`${this.namespaceLog} Alias ${id} has no target 4`);
                    return tools.maybeCallbackWithError(callback, `Alias ${id} has no target`);
                }
            } else {
                if (this.performStrictObjectChecks) {
                    if (!this.objects) {
                        // if objects is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            `${this.namespaceLog} setForeignState not processed because Objects database not connected`
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    // validate that object exists, read-only logic ok, type ok, etc. won't throw now
                    await this._utils.performStrictObjectCheck(id, state);
                }
                if (!this.states) {
                    // if the instance of states is no longer existing, we do not need to unsubscribe
                    this._logger.info(
                        `${this.namespaceLog} setForeignState not processed because States database not connected`
                    );
                    return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                }

                this.outputCount++;
                this.states.setState(id, state, callback);
            }
        }
    }

    setForeignStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        callback?: ioBroker.SetStateChangedCallback
    ): void;
    setForeignStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        callback?: ioBroker.SetStateChangedCallback
    ): void;
    setForeignStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        options: unknown,
        callback?: ioBroker.SetStateChangedCallback
    ): void;
    setForeignStateChanged(
        id: string,
        state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
        ack: boolean,
        options: unknown,
        callback?: ioBroker.SetStateChangedCallback
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
        callback?: any
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

        if (!this.states) {
            // if the instance of states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} setForeignStateChanged not processed because States database not connected`
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
        } else {
            const res = await this._setStateChangedHelper(id, state);
            return tools.maybeCallbackWithError(callback, null, res.id, res.notChanged);
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
        callback?: unknown
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
        _options: InternalGetStateOptions
    ): Promise<ioBroker.CallbackReturnTypeOf<ioBroker.GetStateCallback> | void> {
        const { id, options, callback } = _options;

        if (!this.states) {
            // if the instance of states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} getForeignState not processed because States database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!this.objects) {
            this._logger.info(
                `${this.namespaceLog} getForeignState not processed because Objects database not connected`
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
                obj = (await this._checkStates(id, options, 'getState')).objs[0];
            } else {
                obj = (await this.objects.getObject(id, options)) as ioBroker.StateObject | null | undefined;
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
                        sourceObj = (await this.objects.getObject(aliasId, {
                            ...options,
                            user: SYSTEM_ADMIN_USER
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
                            state = await this.states.getState(aliasId);
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
                            targetId: obj._id
                        })
                    );
                }
            } else {
                // alias object non-existing or points to nowhere -> handle it like a non-existing state
                return tools.maybeCallbackWithError(callback, null, null);
            }
        } else {
            if (this.oStates && this.oStates[id]) {
                return tools.maybeCallbackWithError(callback, null, this.oStates[id]);
            } else {
                return this.states.getState(id, callback);
            }
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
                    _obj = await this.objects!.getObjectViewAsync('system', 'instance', {
                        startkey: 'system.adapter.',
                        endkey: 'system.adapter.\u9999'
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
     *      - none - No aggregation at all. Only raw values in a given period.
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
        } catch (err) {
            // @ts-expect-error
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
     * Convert ID into an object with device's, channel's and state's name.
     *
     * Convert "adapter.instance.D.C.S" in an object `{device: D, channel: C, state: S}`
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
     * Deletes the state of this instance.
     * The object will NOT be deleted. If you want to delete it too, use @delObject instead.
     *
     * It is not required to provide the adapter namespace, because it will automatically be added.
     * E.g., to delete "adapterName.X.myObject", only "myObject" is required as ID.
     *
     * No error is returned if the state does not exist.
     *
     * @param id exactly object ID (without a namespace)
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
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
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

        if (!this.states) {
            // if the instance of states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} delForeignState not processed because States database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        try {
            this._utils.validateId(id, true, options);
        } catch (err) {
            return tools.maybeCallbackWithError(callback, err);
        }

        if (options?.user && options.user !== SYSTEM_ADMIN_USER) {
            try {
                await this._checkStates(id, options, 'delState');
            } catch (e) {
                return tools.maybeCallbackWithError(callback, e);
            }
        }
        this.states.delState(id, callback);
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
        srcObjs: (ioBroker.StateObject | null)[] | null
    ): Promise<ioBroker.GetStatesPromise> {
        const arr = await this.states!.getStates(keys);

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
                            state: arr![i] || null,
                            logger: this._logger,
                            logNamespace: this.namespaceLog,
                            sourceId: srcObj._id,
                            targetId: obj._id
                        }) || null;
                } else {
                    result[obj._id || keys[i]] = arr![i] || null;
                }
            } else {
                result[obj?._id || keys[i]] = arr![i] || null;
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
        } else {
            return this._processStatesSecondary(keys, null, null);
        }
    }

    getForeignStates(pattern: Pattern, callback: ioBroker.GetStatesCallback): void;
    getForeignStates(pattern: Pattern, options: unknown, callback: ioBroker.GetStatesCallback): void;

    /**
     * Read all states of all adapters (and system states), that pass the pattern
     *
     * Allows reading all states of the current adapter according to pattern. To read all states of current adapter use:
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

        if (!this.states) {
            // if the instance of states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} getForeignStates not processed because States database not connected`
            );

            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (!this.objects) {
            // if the instance of states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} getForeignStates not processed because Objects database not connected`
            );

            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        // if a pattern is an array
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
                    endkey: pattern.replace(/\*/g, '\u9999')
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
                    const keys = await this.states.getKeys(pattern);
                    const res = await this._processStatesSecondary(keys || [], null, null);
                    return tools.maybeCallbackWithError(callback, null, res);
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }
            }

            try {
                const res = await this.objects.getObjectView('system', 'state', params, options);
                if (originalChecked !== undefined) {
                    options.checked = originalChecked;
                } else {
                    options.checked = undefined;
                }

                if (!res) {
                    return tools.maybeCallbackWithError(callback, null, {});
                }
                const keys: string[] = [];
                const objs: ioBroker.StateObject[] = [];

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

    private async _addAliasSubscribe(
        aliasObj: ioBroker.StateObject,
        pattern: string,
        callback?: ioBroker.ErrorCallback
    ): Promise<void> {
        if (aliasObj?.common?.alias?.id) {
            if (aliasObj.type !== 'state') {
                this._logger.warn(
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${this.namespaceLog} Expected alias ${aliasObj._id} to be of type "state", got "${aliasObj.type}"`
                );
                return tools.maybeCallbackWithError(
                    callback,
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    new Error(`Expected alias ${aliasObj._id} to be of type "state", got "${aliasObj.type}"`)
                );
            }

            // id can be string or can have attribute read
            const sourceId = tools.isObject(aliasObj.common.alias.id)
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
                aliasDetails = this.aliases.get(sourceId) || { source: null, targets: [] };
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
                    await this.states!.subscribe(sourceId);
                    // we ignore permissions on the source object and thus get it as admin user
                    sourceObj = await this.objects!.getObject(sourceId, { user: SYSTEM_ADMIN_USER });
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }

                if (sourceObj?.common) {
                    if (!this.aliases.has(sourceObj._id)) {
                        // TODO what means this, we ensured alias existed, did some async stuff now it's gone -> alias has been deleted?
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
            this._logger.warn(`${this.namespaceLog} Alias ${aliasObj._id} has no target 5`);
            return tools.maybeCallbackWithError(callback, new Error(`Alias ${aliasObj._id} has no target`));
        } else {
            return tools.maybeCallback(callback);
        }
    }

    private async _removeAliasSubscribe(
        sourceId: string,
        aliasObj: number | AliasTargetEntry,
        callback?: () => void
    ): Promise<void> {
        if (!this.aliases.has(sourceId)) {
            return tools.maybeCallback(callback);
        }

        // remove from the targets array
        const pos = typeof aliasObj === 'number' ? aliasObj : this.aliases.get(sourceId)!.targets.indexOf(aliasObj);

        if (pos !== -1) {
            this.aliases.get(sourceId)!.targets.splice(pos, 1);

            // unsubscribe if no more aliases exists
            if (!this.aliases.get(sourceId)!.targets.length) {
                this.aliases.delete(sourceId);
                await this.states!.unsubscribe(sourceId);
            }
        }
        return tools.maybeCallback(callback);
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
                `Regexp is not supported for "subscribeForeignStates", received "${pattern.toString()}"`
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

        if (!this.states) {
            // if the instance of states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} subscribeForeignStates not processed because States database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }
        if (!this.objects) {
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
                    state = await this.states.getState(`system.adapter.${autoSubEntry}.subscribes`);
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
                this.states.setState(`system.adapter.${autoSubEntry}.subscribes`, JSON.stringify(subs));
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
                    this.objects.subscribe(`${ALIAS_STARTS_WITH}*`);
                }

                const aliasObjs = await this._getObjectsByArray(aliasesIds, options);

                for (const aliasObj of aliasObjs) {
                    if (aliasObj) {
                        // @ts-expect-error check if alias subscribe also takes non-state objects and then ignores
                        promises.push(new Promise(resolve => this._addAliasSubscribe(aliasObj, aliasObj._id, resolve)));
                    }
                }
            }

            if (nonAliasesIds.length) {
                for (const id of nonAliasesIds) {
                    promises.push(new Promise(resolve => this.states!.subscribeUser(id, resolve)));
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
                    this.objects.subscribe(`${ALIAS_STARTS_WITH}*`);
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
                            // @ts-expect-error
                            promises.push(new Promise(resolve => this._addAliasSubscribe(aliasObj, pattern, resolve)));
                        }
                    }

                    try {
                        await Promise.all(promises);
                    } catch (e) {
                        this._logger.error(`${this.namespaceLog} Error on "subscribeForeignStates": ${e.message}`);
                    }

                    if (!this.states) {
                        // if the instance of states is no longer existing, we do not need to unsubscribe
                        this._logger.info(
                            `${this.namespaceLog} subscribeForeignStates not processed because States database not connected`
                        );
                        return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
                    }

                    if (promises.length && pattern !== '*') {
                        return tools.maybeCallback(callback);
                    } else {
                        // no alias objects found or pattern *
                        this.states.subscribeUser(pattern, callback);
                    }
                } catch (e) {
                    this._logger.warn(`${this.namespaceLog} Cannot subscribe to ${pattern}: ${e.message}`);
                    return tools.maybeCallbackWithError(callback, e);
                }
            } else {
                this.states.subscribeUser(pattern, callback);
            }
        } else if (pattern.startsWith(ALIAS_STARTS_WITH)) {
            if (!this._aliasObjectsSubscribed) {
                this._aliasObjectsSubscribed = true;
                this.objects.subscribe(`${ALIAS_STARTS_WITH}*`);
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
                const aliasObj = await this.objects.getObjectAsync(pattern, options);
                if (aliasObj) {
                    // cb will be called, but await for catching promisified part
                    await this._addAliasSubscribe(aliasObj as ioBroker.StateObject, pattern, callback);
                } else {
                    return tools.maybeCallback(callback);
                }
            } catch (e) {
                this._logger.warn(`${this.namespaceLog} cannot subscribe on alias "${pattern}": ${e.message}`);
            }
        } else {
            this.states.subscribeUser(pattern, callback);
        }
    }

    unsubscribeForeignStates(pattern: Pattern, callback?: ioBroker.ErrorCallback): void;
    unsubscribeForeignStates(pattern: Pattern, options: unknown, callback?: ioBroker.ErrorCallback): void;

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
                `Regexp is not supported for "unsubscribeForeignStates", received "${pattern.toString()}"`
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

        if (!this.states) {
            // if the instance of states is no longer existing, we do not need to unsubscribe
            this._logger.info(
                `${this.namespaceLog} unsubscrubeForeignStates not processed because States database not connected`
            );
            return tools.maybeCallbackWithError(callback, tools.ERRORS.ERROR_DB_CLOSED);
        }

        if (this.autoSubscribe && typeof pattern === 'string') {
            for (const autoSub of this.autoSubscribe) {
                if (pattern === '*' || pattern.substring(0, autoSub.length + 1) === `${autoSub}.`) {
                    // remove this pattern from adapter list
                    let state;
                    try {
                        state = await this.states.getState(`system.adapter.${autoSub}.subscribes`);
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
                    this.states.setState(`system.adapter.${autoSub}.subscribes`, JSON.stringify(subs));
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
                    promises.push(this.states.unsubscribeUser(pattern));
                }
            } else {
                promises.push(this.states.unsubscribeUser(pattern));
            }
        } else {
            promises.push(this.states.unsubscribeUser(pattern));
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
            this.objects!.unsubscribe(`${ALIAS_STARTS_WITH}*`);
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
            callback
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
            callback
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
        if (!this.autoSubscribe && this.objects) {
            try {
                // collect all
                const res = await this.objects.getObjectViewAsync('system', 'instance', {
                    startkey: 'system.adapter.',
                    endkey: 'system.adapter.\u9999'
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
                await this.objects.subscribeAsync('system.adapter.*');
            } catch {
                // ignore
            }
        }
    }

    async terminateStates(): Promise<void> {
        // give last states some time to get handled
        if (this.states) {
            try {
                await this.states.destroy();
            } catch {
                // ignore
            }
        }

        if (this.startedInCompactMode) {
            this.states = null;
        }
    }

    async stopStates(updateAliveState: boolean, instanceId: ioBroker.ObjectIDs.Instance): Promise<void> {
        if (this.states && updateAliveState) {
            this.outputCount++;
            await this.states.setState(`${instanceId}.alive`, { val: false, ack: true, from: instanceId });
        }
    }

    async preInitStates(): Promise<void> {
        if (this._config.states && this._config.states.type) {
            try {
                this.States = (await import(`@iobroker/db-states-${this._config.states.type}`)).Client;
            } catch (err) {
                throw new Error(`Unknown states type: ${this._config.states.type}: ${err.message}`);
            }
        } else {
            this.States = await getStatesConstructor();
        }
    }

    // debug function to find error with stop logging
    private _checkLogging(): void {
        let logs: null | string[] = [];
        // LogList
        logs.push(`Actual Loglist - ${JSON.stringify(Array.from(this.logList))}`);

        if (!this.states) {
            // if adapterState was destroyed, we cannot continue
            return;
        }

        // Read the current state of all log subscribers
        this.states.getKeys(`${SYSTEM_ADAPTER_PREFIX}*.logging`, (err, keys) => {
            if (keys?.length) {
                if (!this.states) {
                    // if adapterState was destroyed, we can not continue
                    return;
                }

                this.states.getStates(keys, (err, obj) => {
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
                                            `${this.namespaceLog} LOGINFO: Subscriber - ${id} (disabled)`
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


    protected _reportStatus(): void {
        if (!this.states) {
            return;
        }

        /** Time after which states regularly set by the status report expire in seconds */
        const reportStatusExpirySec = Math.floor(this._config.system.statisticsInterval / 1_000) + 10;

        const id = `system.adapter.${this.namespace}`;
        this.states.setState(`${id}.alive`, {
            val: true,
            ack: true,
            expire: reportStatusExpirySec,
            from: id
        });
        this.outputCount++;
        if (this.connected) {
            this.states.setState(`${id}.connected`, {
                val: true,
                ack: true,
                expire: reportStatusExpirySec,
                from: id
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
                if (!err && this?.states?.setState && stats) {
                    this.states.setState(`${id}.cpu`, {
                        ack: true,
                        from: id,
                        val: Math.round(100 * stats.cpu) / 100,
                        expire: reportStatusExpirySec
                    });
                    this.states.setState(`${id}.cputime`, {
                        ack: true,
                        from: id,
                        val: stats.ctime / 1_000,
                        expire: reportStatusExpirySec
                    });
                    this.outputCount += 2;
                }
            });
            try {
                //RSS is the resident set size, the portion of the process's memory held in RAM (as opposed to the swap space or the part held in the filesystem).
                const mem = process.memoryUsage();
                this.states.setState(`${id}.memRss`, {
                    val: parseFloat(
                        (mem.rss / 1048576) /* 1MB */
                            .toFixed(2)
                    ),
                    ack: true,
                    from: id,
                    expire: reportStatusExpirySec
                });
                this.states.setState(`${id}.memHeapTotal`, {
                    val: parseFloat(
                        (mem.heapTotal / 1048576) /* 1MB */
                            .toFixed(2)
                    ),
                    ack: true,
                    from: id,
                    expire: reportStatusExpirySec
                });
                this.states.setState(`${id}.memHeapUsed`, {
                    val: parseFloat(
                        (mem.heapUsed / 1048576) /* 1MB */
                            .toFixed(2)
                    ),
                    ack: true,
                    from: id,
                    expire: reportStatusExpirySec
                });
            } catch (err) {
                this._logger.warn(`${this.namespaceLog} Could not query used process memory: ${err.message}`);
            }
            this.outputCount += 3;
            if (this.eventLoopLags.length) {
                const eventLoopLag = Math.ceil(this.eventLoopLags.reduce((a, b) => a + b) / this.eventLoopLags.length);
                this.states.setState(`${id}.eventLoopLag`, {
                    val: eventLoopLag,
                    ack: true,
                    from: id,
                    expire: reportStatusExpirySec
                }); // average of measured values
                this.eventLoopLags = [];
                this.outputCount++;
            }
        }
        this.outputCount += 3;
        this.states.setState(`${id}.uptime`, {
            val: parseInt(process.uptime().toFixed(), 10),
            ack: true,
            from: id,
            expire: reportStatusExpirySec
        });
        this.states.setState(`${id}.inputCount`, {
            val: this.inputCount,
            ack: true,
            from: id,
            expire: reportStatusExpirySec
        });
        this.states.setState(`${id}.outputCount`, {
            val: this.outputCount,
            ack: true,
            from: id,
            expire: reportStatusExpirySec
        });
        this.inputCount = 0;
        this.outputCount = 0;
    }

    // initStates is called from initAdapter
    protected postInitStates(cb: () => void): void {

        this._config.states.maxQueue = this._config.states.maxQueue || 1_000;

        this._initializeStatesTimeout = setTimeout(() => {
            this._initializeStatesTimeout = null;
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
        } else {
            // Internal object, but some special adapters want to access it anyway.
            this.states = new this.States({
                namespace: this.namespaceLog,
                connection: this._config.states,
                connected: async () => {
                    if (!this.states) {
                        return;
                    }

                    this._logger.silly(`${this.namespaceLog} statesDB connected`);
                    this.statesConnectedTime = Date.now();

                    if (this._initializeStatesTimeout) {
                        clearTimeout(this._initializeStatesTimeout);
                        this._initializeStatesTimeout = null;
                    }

                    if (!this._config.isInstall) {
                        // Subscribe for process exit signal
                        this.states.subscribe(`system.adapter.${this.namespace}.sigKill`);

                        // Subscribe for loglevel
                        this.states.subscribe(`system.adapter.${this.namespace}.logLevel`);
                    }
                    if (this._options.subscribable) {
                        // subscribe on if other instance wants to have states of this adapter
                        this.states.subscribe(`system.adapter.${this.namespace}.subscribes`);

                        // read actual autosubscribe requests
                        let state;
                        try {
                            state = await this.states.getStateAsync(`system.adapter.${this.namespace}.subscribes`);
                        } catch {
                            // ignore
                        }
                        if (!state?.val) {
                            this.patterns = {};
                        } else {
                            try {
                                this.patterns = JSON.parse(state.val as string);
                                Object.keys(this.patterns!).forEach(
                                    p => (this.patterns![p].regex = tools.pattern2RegEx(p))
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
                                    }`
                                );
                            } else {
                                this._logger.warn(
                                    `${this.namespaceLog} Got terminate signal. Checking desired PID: ${sigKillVal} vs own PID ${process.pid}`
                                );
                            }
                            // by deletion of state, stop this instance
                            if (sigKillVal !== process.pid && !this._config.forceIfDisabled) {
                                this._stop({
                                    isPause: false,
                                    isScheduled: false,
                                    exitCode: EXIT_CODES.ADAPTER_REQUESTED_TERMINATION,
                                    updateAliveState: false
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
                                    `${this.namespaceLog} Loglevel changed from "${currentLevel}" to "${state.val}"`
                                );
                                currentLevel = state.val;
                            } else if (state.val && state.val !== currentLevel) {
                                this._logger.info(`${this.namespaceLog} Got invalid loglevel "${state.val}", ignoring`);
                            }
                            this.outputCount++;
                            this.states &&
                            this.states.setState(`system.adapter.${this.namespace}.logLevel`, {
                                val: currentLevel,
                                ack: true,
                                from: `system.adapter.${this.namespace}`
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
                        this.logRedirect!(state ? !!state.val : false, instance);
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
                            if (obj.callback && obj.callback.ack && obj.callback.id && callbackObj) {
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
                                        obj as UserInterfaceClientRemoveMessage
                                    );
                                }

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
                                if (!this.pluginHandler.isPluginInstanciated(pluginName)) {
                                    this.pluginHandler.instanciatePlugin(
                                        pluginName,
                                        this.pluginHandler.getPluginConfig(pluginName) || {},
                                        AdapterBase.thisDir
                                    );
                                    this.pluginHandler.setDatabaseForPlugin(pluginName, this.objects, this.states);
                                    this.pluginHandler.initPlugin(pluginName, this.adapterConfig || {});
                                }
                            } else {
                                if (!this.pluginHandler.destroy(pluginName)) {
                                    this._logger.info(
                                        `${this.namespaceLog} Plugin ${pluginName} could not be disabled. Please restart adapter to disable it.`
                                    );
                                }
                            }
                        }
                    } else if (!this._stopInProgress && this.adapterReady && this.aliases.has(id)) {
                        // If adapter is ready and for this ID exist some alias links
                        const alias = this.aliases.get(id);
                        /** Prevent multiple publishes if multiple patterns contain this alias id */
                        const uniqueTargets = new Set<string>();

                        for (const target of alias!.targets) {
                            const targetId = target.id;
                            if (uniqueTargets.has(targetId)) {
                                continue;
                            }

                            uniqueTargets.add(targetId);

                            const source = alias!.source!;

                            const aState = state
                                ? tools.formatAliasValue({
                                    sourceCommon: source,
                                    targetCommon: target,
                                    state: deepClone(state),
                                    logger: this._logger,
                                    logNamespace: this.namespaceLog,
                                    sourceId: id,
                                    targetId
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
                }
            });
        }
    }

    private async _addAliasSubscribe(
        aliasObj: ioBroker.StateObject,
        pattern: string,
        callback?: ioBroker.ErrorCallback
    ): Promise<void> {
        if (aliasObj?.common?.alias?.id) {
            if (aliasObj.type !== 'state') {
                this._logger.warn(
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${this.namespaceLog} Expected alias ${aliasObj._id} to be of type "state", got "${aliasObj.type}"`
                );
                return tools.maybeCallbackWithError(
                    callback,
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    new Error(`Expected alias ${aliasObj._id} to be of type "state", got "${aliasObj.type}"`)
                );
            }

            // id can be string or can have attribute read
            const sourceId = tools.isObject(aliasObj.common.alias.id)
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
                aliasDetails = this.aliases.get(sourceId) || { source: null, targets: [] };
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
                    await this.states!.subscribe(sourceId);
                    // we ignore permissions on the source object and thus get it as admin user
                    sourceObj = await this.objects!.getObject(sourceId, { user: SYSTEM_ADMIN_USER });
                } catch (e) {
                    return tools.maybeCallbackWithError(callback, e);
                }

                if (sourceObj?.common) {
                    if (!this.aliases.has(sourceObj._id)) {
                        // TODO what means this, we ensured alias existed, did some async stuff now it's gone -> alias has been deleted?
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
            this._logger.warn(`${this.namespaceLog} Alias ${aliasObj._id} has no target 5`);
            return tools.maybeCallbackWithError(callback, new Error(`Alias ${aliasObj._id} has no target`));
        } else {
            return tools.maybeCallback(callback);
        }
    }

    private async _removeAliasSubscribe(
        sourceId: string,
        aliasObj: number | AliasTargetEntry,
        callback?: () => void
    ): Promise<void> {
        if (!this.aliases.has(sourceId)) {
            return tools.maybeCallback(callback);
        }

        // remove from the targets array
        const pos = typeof aliasObj === 'number' ? aliasObj : this.aliases.get(sourceId)!.targets.indexOf(aliasObj);

        if (pos !== -1) {
            this.aliases.get(sourceId)!.targets.splice(pos, 1);

            // unsubscribe if no more aliases exists
            if (!this.aliases.get(sourceId)!.targets.length) {
                this.aliases.delete(sourceId);
                await this.states!.unsubscribe(sourceId);
            }
        }
        return tools.maybeCallback(callback);
    }
}
