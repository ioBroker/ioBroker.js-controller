import type { Client as StatesRedisClient } from '@iobroker/db-states-redis';
import type { Client as ObjectsRedisClient } from '@iobroker/db-objects-redis';

export type ProcessExitCallback = (exitCode: number) => void;
export type CleanDatabaseHandler = (isDeleteDb: boolean) => any;
export type DbConnectCallback = (params: DbConnectAsyncReturn) => void;

export type DbConnect = (
    onlyCheckOrParams?: boolean | Record<string, any>,
    paramsOrCb?: Record<string, any> | DbConnectCallback,
    callback?: DbConnectCallback,
) => void;

export interface DbConnectAsyncReturn {
    objects: ObjectsRedisClient;
    states: StatesRedisClient;
    isOffline?: boolean;
    objectsDBType: string;
    /** The iobroker.json config file */
    config: ioBroker.IoBrokerJson;
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
    common: IoPackageCommon;
}
