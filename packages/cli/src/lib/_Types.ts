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

/** Result returned once the database connection has been established */
export interface DbConnectAsyncReturn {
    /** The connected objects database client */
    objects: ObjectsRedisClient;
    /** The connected states database client */
    states: StatesRedisClient;
    /** Whether the controller is offline (no running host) */
    isOffline?: boolean;
    /** Type of the objects database backend */
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
/** An adapter object as stored in io-package.json */
export interface IoPackage extends ioBroker.AdapterObject {
    /** The common section including the plugins configuration */
    common: IoPackageCommon;
}
