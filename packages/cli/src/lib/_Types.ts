import type { Client as StatesRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';

export type ProcessExitCallback = (exitCode: number) => void;
export type GetRepositoryHandler = (
    repoName: string | undefined,
    params: Record<string, any>
) => Promise<Record<string, any>>;
export type CleanDatabaseHandler = (isDeleteDb: boolean) => any;
type DbConnectCallback = (
    objects: ObjectsRedisClient,
    states: StatesRedisClient,
    isOffline?: boolean,
    objectsDBType?: string
) => void;
export type DbConnect = (
    onlyCheckOrParams?: boolean | Record<string, any>,
    paramsOrCb?: Record<string, any> | DbConnectCallback,
    callback?: DbConnectCallback
) => void;

interface DbConnectAsyncReturn {
    objects: ObjectsRedisClient;
    states: StatesRedisClient;
    isOffline?: boolean;
    objectsDBType?: string;
}

export type DbConnectAsync = (onlyCheck: boolean, params?: Record<string, any>) => Promise<DbConnectAsyncReturn>;
export type RestartController = () => void;
export type ResetDbConnect = () => Promise<void>;

interface IoPackageCommon extends ioBroker.AdapterCommon {
    plugins: {
        [pluginName: string]: {
            [configKey: string]: any;
        };
    };
}
export interface IoPackage extends ioBroker.AdapterObject {
    objects: ioBroker.Object[];
    instanceObjects: ioBroker.Object[];
    common: IoPackageCommon;
}

export interface IoBrokerJSON {
    plugins: {
        [pluginName: string]: {
            enabled: boolean;
            [other: string]: unknown;
        };
    };
    [other: string]: unknown;
}
