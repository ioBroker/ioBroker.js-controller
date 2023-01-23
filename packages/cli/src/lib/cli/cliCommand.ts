import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';

export type DBConnectCallback = (params: {
    objects: ObjectsClient;
    states: StatesClient;
    isOffline: boolean;
    objectsDBType: string;
    /** the iobroker.json config file */
    config?: Record<string, any>;
}) => void;

export interface CLICommandContext {
    /** Invoke this before doing anything in the database */
    dbConnect: (callback: DBConnectCallback) => void;
    callback: (code: number) => void;
    showHelp: (yargs?: any) => void;
}

export interface CLICommandParams {
    encoding?: BufferEncoding;
    pretty?: boolean;
    force?: boolean;
    password?: any;
    ingroup?: any;
    v?: any;
    version?: any;
    timeout?: any;
    enabled?: any;
    disabled?: any;
    port?: any;
    ssl?: any;
    ip?: any;
    updatable?: any;
    host?: any;
    cert?: any;
    cwd?: string;
    path?: string;
    module?: string;
}

export type CLICommandOptions = CLICommandContext & CLICommandParams;

/** The base class for any CLI command */
export class CLICommand {
    protected readonly options: CLICommandOptions;
    constructor(options: CLICommandOptions) {
        if (options === null || options === undefined) {
            throw new Error(`No options given`);
        }

        this.options = options;
        // Always require the callback and a wrapper for DB actions
        this.requireOption('callback');
        this.requireOption('dbConnect');
    }

    /**
     * Ensures that an argument was passed in the options.
     * Throws otherwise
     * @param arg
     */
    requireOption(arg: keyof CLICommandOptions): void {
        if (this.options[arg] === undefined) {
            throw new Error(`Invalid arguments: ${arg} is missing`);
        }
    }
}
