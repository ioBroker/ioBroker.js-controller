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
import { AdapterFile } from '@/lib/adapter/adapterFile.js';

export default class Adapter extends AdapterFile {
    /** Features supported by the running instance */
    private readonly SUPPORTED_FEATURES = getSupportedFeatures();

    constructor(options: AdapterOptions | string) {
        super(options);

        this.createAsyncFunctions();

        this.initBase()
            .catch(e => console.log(`Error in initBase: ${e}`));
    }

    private createAsyncFunctions() {
        this.createAsyncFunctionsForFiles();
        this.createAsyncFunctionsForStates();
        this.createAsyncFunctionsForObjects();
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

     * @returns true/false if the feature is in the list of supported features
     */
    supportsFeature(
        /** the name of the feature to check */
        featureName: string
    ): boolean {
        if (typeof featureName === 'string') {
            return this.SUPPORTED_FEATURES.includes(featureName as SupportedFeature);
        }
        return false;
    }
    /**
     * stops the execution of adapter, but not disables it.
     *
     * Sometimes, the adapter must be stopped if some libraries are missing.
     */
    terminate(
        /** optional termination description */
        reason?: string | number,
        /** optional exit code */
        exitCode?: number
    ): void {
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
            await this.terminateStates();
            await this.terminateObjects();
            if (this.startedInCompactMode) {
                this.emit('exit', _exitCode, reason);
            } else {
                process.exit(_exitCode);
            }
        }, 500);
    }

    /**
     * Stop an instance gracefully
     */
    protected async _stop(
        /** information about the stoppage */
        options: InternalStopParameters = {}
    ): Promise<void> {
        const { isPause, isScheduled, reason } = options;
        let { exitCode, updateAliveState } = options;

        exitCode = exitCode || (isScheduled ? EXIT_CODES.START_IMMEDIATELY_AFTER_STOP : 0);
        if (updateAliveState === undefined) {
            updateAliveState = true;
        }

        if (!this._stopInProgress || this._config.isInstall) {
            // when an interval is deleted, we already had a stop call before
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

                await this.stopStates(updateAliveState, id as ioBroker.ObjectIDs.Instance);

                if (!isPause) {
                    this._logger.info(`${this.namespaceLog} terminating`);
                }
                // To this moment, the class could be destroyed
                this.terminate(reason, exitCode);
            };

            // if we were never ready, we don't trigger the unloading procedure
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
                                `${this.namespaceLog} Error in ${id}: The unload method must return a Promise if it does not accept a callback!`
                            );
                        }
                    }
                } else {
                    this.emit('unload', finishUnload);
                }
            }

            // Even if the developer forgets to call the unloading callback, we need to stop the process.
            // Therefore, wait a short while and then force the unloading procedure
            setTimeout(() => {
                if (this.states) {
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
     * Called if states and objects successfully initialized
     */
    private async _prepareInitAdapter(): Promise<void> {
        if (this.terminated || !this.objects || !this.states) {
            return;
        }

        if (this._options.instance !== undefined) {
            return this._initAdapter(this._options);
        }

        const resAlive = await this.states.getState(`system.adapter.${this.namespace}.alive`);
        const killRes = await this.states.getState(`system.adapter.${this.namespace}.sigKill`);

        if (killRes?.val !== undefined) {
            killRes.val = parseInt(killRes.val as any, 10);
        }
        if (!this._config.isInstall && this.startedInCompactMode && killRes && !killRes.ack && killRes.val === -1) {
            this._logger.error(
                `${this.namespaceLog} ${this.namespace} needs to be stopped because not correctly started in compact mode`
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
                `${this.namespaceLog} ${this.namespace} invalid process id scenario ${killRes.val} vs. own ID ${process.pid}. Stopping`
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
                res = await this.objects.getObject(`system.adapter.${this.namespace}`);
            } catch (e) {
                this._logger.error(
                    `${this.namespaceLog} ${this.namespace} Could not get instance object: ${e.message}`
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
     * Initialize the logging logic
     */
    private async _initLogging(): Promise<void> {
        if (!this.states) {
            // if adapterState was destroyed, we cannot continue
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
            } else if (this.states?.pushLog) {
                // Send to all adapter, that required logs
                for (const instanceId of this.logList) {
                    this.states.pushLog(instanceId, info);
                }
            }
        });

        const keys = await this.states.getKeys(`${SYSTEM_ADAPTER_PREFIX}*.logging`);
        if (keys?.length) {
            if (!this.states) {
                // if adapterState was destroyed, we can not continue
                return;
            }

            const obj = await this.states.getStates(keys);
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
                if (this.logList.size && messages?.length && this.states) {
                    for (const message of messages) {
                        for (const instanceId of this.logList) {
                            this.states.pushLog(instanceId, message);
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
                if (!this.states) {
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
                            if (this.states) {
                                try {
                                    await this.setForeignStateAsync(
                                        `system.adapter.${this.namespace}.logging`,
                                        {
                                            val: false,
                                            ack: true,
                                            from: `system.adapter.${this.namespace}`
                                        },
                                        options
                                    );
                                } catch (e) {
                                    this._logger.warn(
                                        `${this.namespaceLog} Could not change log subscriber state to "false": ${e.message}`
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
                                        from: `system.adapter.${this.namespace}`
                                    },
                                    options
                                );
                            } catch (e) {
                                this._logger.warn(
                                    `${this.namespaceLog} Could not change log subscriber state to "true": ${e.message}`
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

            this.states.subscribeLog(`system.adapter.${this.namespace}`);
        } else {
            this.requireLog = isActive => {
                if (isActive) {
                    this._logger.warn(
                        `${this.namespaceLog} requireLog is not supported by this adapter! Please set common.logTransporter to true`
                    );
                }
            };
        }
    }

    /**
     * Calls the ready handler, if it is an "install"-run it calls the "install" handler instead
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

    /**
     * Initialize the adapter
     *
     * @param adapterConfig the AdapterOptions or the InstanceObject, is null/undefined if it is "install" process
     */
    private async _initAdapter(adapterConfig?: AdapterOptions | ioBroker.InstanceObject | null): Promise<void> {
        await this._initLogging();

        if (!this.pluginHandler) {
            return;
        }
        this.pluginHandler.setDatabaseForPlugins(this.objects, this.states);
        this.pluginHandler.initPlugins(adapterConfig || {}, async () => {
            if (!this.states || !this.objects || this.terminated) {
                // if adapterState was destroyed,we should not continue
                return;
            }

            this.states.subscribe(`system.adapter.${this.namespace}.plugins.*`);
            if (this._options.instance === undefined) {
                if (!adapterConfig || !('common' in adapterConfig) || !adapterConfig.common.enabled) {
                    if (adapterConfig && 'common' in adapterConfig && adapterConfig.common.enabled !== undefined) {
                        !this._config.isInstall && this._logger.error(`${this.namespaceLog} adapter disabled`);
                    } else {
                        !this._config.isInstall &&
                        this._logger.error(`${this.namespaceLog} no config found for adapter`);
                    }

                    if (!this._config.isInstall && (!process.argv || !this._config.forceIfDisabled)) {
                        const id = `system.adapter.${this.namespace}`;
                        this.outputCount += 2;
                        this.states.setState(`${id}.alive`, { val: true, ack: true, expire: 30, from: id });
                        let done = false;
                        this.states.setState(
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
                        native: {}
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
                this.states.subscribe(`${SYSTEM_ADAPTER_PREFIX}*.logging`);

                if (
                    typeof this._options.message === 'function' &&
                    // @ts-expect-error, we should infer correctly that this is an InstanceObject in this case
                    !isMessageboxSupported(adapterConfig.common)
                ) {
                    this._logger.error(
                        `${this.namespaceLog} : message handler implemented, but messagebox not enabled. Define common.messagebox in io-package.json for adapter or delete message handler.`
                    );
                    // @ts-expect-error we should infer adapterConfig correctly
                } else if (isMessageboxSupported(adapterConfig.common)) {
                    this.mboxSubscribed = true;
                    this.states.subscribeMessage(`system.adapter.${this.namespace}`);
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
                this.objects,
                this.states,
                this.namespaceLog,
                this._logger,
                this.namespace,
                this._namespaceRegExp
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
                                        `${this.namespaceLog} Can not decrypt attribute ${attr}: ${e.message}`
                                    )
                                )
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

            if (!this.states) {
                // if this.adapterStates was destroyed, we should not continue
                return;
            }

            this.outputCount++;
            // set current loglevel
            this.states.setState(`system.adapter.${this.namespace}.logLevel`, {
                val: this._config.log.level,
                ack: true,
                from: `system.adapter.${this.namespace}`
            });

            if (this._options.instance === undefined) {
                this.version = this.pack?.version
                    ? this.pack.version
                    : this.ioPack?.common
                        ? this.ioPack.common.version
                        : 'unknown';
                // display if it's a non-official version - only if installedFrom is explicitly given and differs it's not npm
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
                this._config.system.statisticsInterval = parseInt(this._config.system.statisticsInterval, 10) || 15_000;
                if (!this._config.isInstall) {
                    this._reportInterval = setInterval(
                        () => this._reportStatus(),
                        this._config.system.statisticsInterval
                    );
                    this._reportStatus();
                    const id = `system.adapter.${this.namespace}`;
                    this.states.setState(`${id}.compactMode`, {
                        ack: true,
                        from: id,
                        val: !!this.startedInCompactMode
                    });

                    this.outputCount++;

                    if (this.startedInCompactMode) {
                        this.states.setState(`${id}.cpu`, { ack: true, from: id, val: 0 });
                        this.states.setState(`${id}.cputime`, { ack: true, from: id, val: 0 });
                        this.states.setState(`${id}.memRss`, { val: 0, ack: true, from: id });
                        this.states.setState(`${id}.memHeapTotal`, { val: 0, ack: true, from: id });
                        this.states.setState(`${id}.memHeapUsed`, { val: 0, ack: true, from: id });
                        this.states.setState(`${id}.eventLoopLag`, { val: 0, ack: true, from: id });
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
                    this._logger.debug(
                        `${this.namespaceLog} Schedule restart: ${adapterConfig.common.restartSchedule}`
                    );
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
        });
    }

    protected async initBase(): Promise<void> {
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

        await this.preInitStates();

        await this.preInitObjects();

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

        this.pluginHandler = new PluginHandler(pluginSettings);
        try {
            this.pluginHandler.addPlugins(this.ioPack.common.plugins, [this.adapterDir, thisDir]); // first resolve from adapter directory, else from js-controller
        } catch (e) {
            this._logger.error(`Could not add plugins: ${e.message}`);
        }

        // finally init
        this.postInitObjects(() => {
            if (this.inited) {
                this._logger.warn(`${this.namespaceLog} Reconnection to DB.`);
                return;
            }

            this.inited = true;
            this._logger.silly(`${this.namespaceLog} objectDB connected`);
            this.postInitStates(() => this._prepareInitAdapter());
        });
    }
}
