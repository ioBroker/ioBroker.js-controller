import type { DbConnectCallback } from '../_Types.js';

/** Context provided to every CLI command */
export interface CLICommandContext {
    /** Invoke this before doing anything in the database */
    dbConnect: (callback: DbConnectCallback) => void;
    /** Finish the command with the given exit code */
    callback: (code?: number) => void;
    /** Show the command help */
    showHelp: (yargs?: any) => void;
}

/** Parameters (CLI flags) that may be passed to a command */
export interface CLICommandParams {
    /** Text encoding to use for output */
    encoding?: BufferEncoding;
    /** Pretty-print the output */
    pretty?: boolean;
    /** Force the operation even if it would normally be refused */
    force?: boolean;
    /** Password to use */
    password?: any;
    /** Restrict the operation to the given group */
    ingroup?: any;
    /** Short alias for the version flag */
    v?: any;
    /** Show the version */
    version?: any;
    /** Timeout in milliseconds */
    timeout?: any;
    /** Only include enabled instances */
    enabled?: any;
    /** Only include disabled instances */
    disabled?: any;
    /** Port to use */
    port?: any;
    /** Use SSL */
    ssl?: any;
    /** IP address to bind to */
    ip?: any;
    /** Only include updatable adapters */
    updatable?: any;
    /** Host to operate on */
    host?: any;
    /** Certificate to use */
    cert?: any;
    /** Working directory */
    cwd?: string;
    /** File system path */
    path?: string;
    /** Module name */
    module?: string;
    /** Wait for the operation to complete */
    wait?: boolean;
    /** Automatically answer yes to confirmation prompts */
    yes?: boolean;
    /** Short alias for force */
    f?: boolean;
    /** Short alias for yes */
    y?: boolean;
    /** Apply the operation to all matching items */
    all?: boolean;
}

export type CLICommandOptions = CLICommandContext & CLICommandParams;

/** The base class for any CLI command */
export class CLICommand<TCommandOptions extends CLICommandOptions = CLICommandOptions> {
    protected readonly options: TCommandOptions;

    /**
     * @param options The command options including the context (callback, dbConnect) and parameters
     */
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
     * @param arg The name of the option that is required
     */
    requireOption(arg: keyof CLICommandOptions): void {
        if (this.options[arg] === undefined) {
            throw new Error(`Invalid arguments: ${arg} is missing`);
        }
    }
}
