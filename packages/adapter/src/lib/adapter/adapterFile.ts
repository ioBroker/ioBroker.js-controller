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
import { AdapterState } from '@/lib/adapter/adapterState.js';

export interface AdapterFile extends AdapterState {
    /** Changes access rights of all files in the adapter directory */
    chmodFileAsync(
        adapter: string | null,
        path: string,
        options: ioBroker.ChangeModeFileOptions
    ): Promise<{ entries: ioBroker.ChownFileResult[]; id: string }>;
    // TODO: correct types
    chownFileAsync(...args: any[]): Promise<any>;
    /** reads the content of directory from DB for given adapter and path */
    readDirAsync(adapterName: string | null, path: string, options?: ioBroker.RequestOptions | null): ioBroker.ReadDirPromise;
    /** Deletes a given file */
    unlinkAsync(adapterName: string | null, path: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** Deletes a given file */
    delFileAsync(adapterName: string | null, path: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    renameAsync(adapterName: string | null, oldName: string, newName: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    mkdirAsync(adapterName: string | null, path: string, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** reads the content of directory from DB for given adapter and path */
    readFileAsync(adapterName: string | null, path: string, options?: ioBroker.RequestOptions | null): ioBroker.ReadFilePromise;
    writeFileAsync(adapterName: string | null, path: string, data: Buffer | string, options?: ioBroker.RequestOptions | null): Promise<void>;
    /** Checks if a file exists in the DB */
    fileExistsAsync(adapterName: string | null, path: string, options?: ioBroker.RequestOptions | null): Promise<boolean>;

    /**
     * Deletes a given file
     */
    delFile(adapterName: string | null, path: string, callback: ioBroker.ErrnoCallback): void;
    delFile(adapterName: string | null, path: string, options: ioBroker.DelObjectOptions | null, callback: ioBroker.ErrnoCallback): void;
}

// EventEmitter => AdapterBase => AdapterObject => AdapterState => AdapterFile => Adapter
export abstract class AdapterFile extends AdapterState {
    constructor(options: AdapterOptions | string) {
        super(options);
    }

    createAsyncFunctionsForFiles() {
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
    }

    initFile() {
    }
}
