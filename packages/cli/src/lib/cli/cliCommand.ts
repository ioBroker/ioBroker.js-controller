import type { DbConnectCallback } from '../_Types.js';

export interface CLICommandContext {
    /** Invoke this before doing anything in the database */
    dbConnect: (callback: DbConnectCallback) => void;
    callback: (code?: number) => void;
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
    wait?: boolean;
    yes?: boolean;
    f?: boolean;
    y?: boolean;
    all?: boolean;
}

export type CLICommandOptions = CLICommandContext & CLICommandParams;

/** The base class for any CLI command */
export class CLICommand<TCommandOptions extends CLICommandOptions = CLICommandOptions> {
    protected readonly options: TCommandOptions;

    constructor(options: TCommandOptions) {
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
     *
     * @param arg
     */
    requireOption(arg: keyof CLICommandOptions): void {
        if (this.options[arg] === undefined) {
            throw new Error(`Invalid arguments: ${arg} is missing`);
        }
    }
}
