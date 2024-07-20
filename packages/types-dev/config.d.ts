interface DatabaseBackupOptions {
    disabled: boolean;
    /** Minimal number of backup files, after the deletion will be executed according to backupTime settings */
    files: number;
    '// files': string;
    /** All backups older than configured hours will be deleted. But only if the number of files is greater than of backupNumber */
    hours: number;
    '// hours': string;
    /** by default backup every 2 hours. Time is in minutes. To disable backup set the value to 0 */
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

export interface DatabaseOptions {
    /** Possible values: 'file' - [port 9001], 'jsonl' - [port 9001], 'redis' - [port 6379 or 26379 for sentinel]. */
    type: 'jsonl' | 'file' | 'redis';
    '// type': string;
    host: string;
    port: number;
    connectTimeout: number;
    writeFileInterval: number;
    dataDir: string;
    options: {
        auth_pass: string;
        retry_max_delay: number;
        retry_max_count: number;
        db: number;
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
    backup: DatabaseBackupOptions;
    jsonlOptions: JsonlOptions;
}

export interface ObjectsDatabaseOptions extends DatabaseOptions {
    noFileCache: boolean;
    maxQueue: number;
}

/**
 * The ioBroker global config
 */
export interface IoBJson {
    system: {
        /** do not use more than memory limit mb by ioB process (0 to deactivate) */
        memoryLimitMB: number;
        /** if empty, determine use real hostname */
        hostname: string;
        /** Interval how often the counters for input/output in adapters and controller will be updated in ms */
        statisticsInterval: number;
        '// statisticsInterval': string;
        /** Interval how often the disk size will be checked in ms */
        checkDiskInterval: number;
        '// checkDiskInterval': string;
        /** interval to wait between multiple instances starts */
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
    multihostService: {
        enabled: boolean;
        secure: boolean;
        password: string;
        persist: boolean;
    };
    objects: ObjectsDatabaseOptions;
    states: DatabaseOptions;
    log: {
        level: string;
        maxDays: number;
        noStdout: boolean;
        transport: Record<string, any>;
    };
    /** Always relative to iobroker.js-controller/ */
    dataDir: string;
    '// dataDir': string;
    plugins: {
        [pluginName: string]: {
            enabled: boolean;
            [other: string]: unknown;
        };
    };
    '// dnsResolution': string;
    /** Use 'verbatim' for ipv6 first, else use 'ipv4first' */
    dnsResolution: 'verbatim' | 'ipv4first';
}
