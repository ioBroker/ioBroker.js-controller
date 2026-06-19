interface DatabaseBackupOptions {
    disabled: boolean;
    /** Minimal number of backup files, after the deletion will be executed according to backupTime settings */
    files: number;
    '// files': string;
    /** All backups older than configured hours will be deleted. But only if the number of files is greater than of backupNumber */
    hours: number;
    '// hours': string;
    /** By default backup every 2 hours. Time is in minutes. To disable backup set the value to 0 */
    period: number;
    '// period': string;
    /** Absolute path to back-up directory or empty to back-up in data directory */
    path: string;
    '// path': string;
}

interface JsonlOptions {
    '// autoCompress (1)': string;
    '// autoCompress (2)': string;
    '// autoCompress (3)': string;
    /**
     * The JSONL DB is append-only and will contain unnecessary entries after a while.
     * It will be compressed when the uncompressed size is >= size * sizeFactor AND >= sizeFactorMinimumSize
     * Note that too low values here will cause the DB to be rewritten often.
     */
    autoCompress: {
        sizeFactor: number;
        sizeFactorMinimumSize: number;
    };
    '// ignoreReadErrors': string;
    /** If single lines in the DB are corrupted, they can be ignored without losing the whole DB. */
    ignoreReadErrors: true;
    '// throttleFS (1)': string;
    '// throttleFS (2)': string;
    /**
     * By default, the database immediately writes to the database file. Write access can be reduced using the throttleFS option.
     * Be aware that buffered changes will be lost in case the process crashes
     */
    throttleFS: {
        '// intervalMs': string;
        /** Write to the database file no more than every intervalMs milliseconds. */
        intervalMs: number;
        '// maxBufferedCommands': string;
        /** Force writing of buffered commands after so many changes. This reduces memory consumption and data loss in case of a crash. */
        maxBufferedCommands: number;
    };
}

/** Configuration of a database connection (objects or states) */
export interface DatabaseOptions {
    /** Possible values: 'file' - [port 9001], 'jsonl' - [port 9001], 'redis' - [port 6379 or 26379 for sentinel]. */
    type: 'jsonl' | 'file' | 'redis';
    /** Name of the sentinel master to connect to */
    sentinelName?: string;
    /** Host name(s) or IP address(es) of the database server */
    host: string | string[];
    /** Port(s) of the database server */
    port: number | number[];
    /** Maximum time in milliseconds to wait for a connection to be established */
    connectTimeout: number;
    /** Interval in milliseconds between flushing the in-memory database to file */
    writeFileInterval: number;
    /** Directory where the database files are stored, relative to the controller dir */
    dataDir?: string;
    /** Low-level connection options passed to the database driver */
    options: {
        /** Password used to authenticate against the database */
        auth_pass: string;
        /** Maximum delay in milliseconds between reconnection attempts */
        retry_max_delay: number;
        /** Maximum number of reconnection attempts */
        retry_max_count: number;
        /** Redis database index to use */
        db: number;
        /** IP stack to use (4 for IPv4, 6 for IPv6) */
        family: number;
        /** As soon as the tls property is defined, redis will try to connect via tls (currently only for redis) */
        tls?: {
            /** Needs to be false with self-signed certs */
            rejectUnauthorized?: boolean;
            /** The certificate content */
            ca?: string;
            /** The key file content */
            key?: string;
            /** The cert file content */
            cert?: string;
        };
    };
    /** Backup configuration for the database */
    backup: DatabaseBackupOptions;
    /** Options specific to the JSONL database backend */
    jsonlOptions: JsonlOptions;
}

/** Configuration of the objects database connection */
export interface ObjectsDatabaseOptions extends DatabaseOptions {
    /** Disable the in-memory file cache for objects */
    noFileCache: boolean;
}

/** Configuration of the states database connection */
export interface StatesDatabaseOptions extends DatabaseOptions {
    /** Limit maximum number of log entries in the list (only read by adapter.ts from the config file) */
    maxQueue: number;
}

/**
 * The ioBroker global config
 */
export interface IoBJson {
    /** System-wide controller settings */
    system: {
        /** Do not use more than memory limit mb by ioB process (0 to deactivate) */
        memoryLimitMB: number;
        /** If empty, determine use real hostname */
        hostname: string;
        /** Interval how often the counters for input/output in adapters and controller will be updated in ms */
        statisticsInterval: number;
        '// statisticsInterval': string;
        /** Interval how often the disk size will be checked in ms */
        checkDiskInterval: number;
        '// checkDiskInterval': string;
        /** Interval to wait between multiple instances starts */
        instanceStartInterval: number;
        /** Controller will try to start the instances as a part of the same process. No spawn will be done. Only by adapters that support it and have flag compact flag in io-package.json */
        compact: boolean;
        '// compact': string;
        /** Allow execution of "shell" sendToHost commands */
        allowShellCommands: boolean;
        '// allowShellCommands': string;
        /** If the available RAM is below this threshold on adapter start, a warning will be logged. */
        memLimitWarn: number;
        '// memLimitWarn': string;
        /** If the available RAM is below this threshold on adapter start, an error will be logged. */
        memLimitError: number;
        '// memLimitError': string;
    };
    /** Configuration of the multihost service used to connect several ioBroker hosts */
    multihostService: {
        enabled: boolean;
        secure: boolean;
        password: string;
        persist: boolean;
    };
    /** Configuration of the objects database */
    objects: ObjectsDatabaseOptions;
    /** Configuration of the states database */
    states: StatesDatabaseOptions;
    /** Logging configuration */
    log: {
        level: ioBroker.LogLevel;
        maxDays: number;
        noStdout: boolean;
        transport: Record<string, any>;
    };
    /** Always relative to iobroker.js-controller/ */
    dataDir: string;
    /** Comment/hint shown next to the dataDir setting in the JSON config */
    '// dataDir': string;
    /** Controller plugins configuration keyed by plugin name */
    plugins: {
        [pluginName: string]: {
            enabled: boolean;
            [other: string]: unknown;
        };
    };
    /** Comment/hint shown next to the dnsResolution setting in the JSON config */
    '// dnsResolution': string;
    /** Use 'verbatim' for ipv6 first, else use 'ipv4first' */
    dnsResolution: 'verbatim' | 'ipv4first';
}
