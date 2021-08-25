/**
 * @typedef {(objects: any, states: any, isOffline?: boolean, objectsDBType?: string) => void} DBConnectCallback
 */

/**
 * @typedef {Object.<string, any>} CLICommandContext
 * @property {(callback: DBConnectCallback) => void} dbConnect - Invoke this before doing anything in the database
 * @property {(code: number = 0) => void} callback
 * @property {() => void} showHelp
 */

/**
 * @typedef {Object.<string, any>} CLICommandParams
 * @property {boolean} [pretty]
 * @property {boolean} [force]
 * @property {any} [password]
 * @property {any} [ingroup]
 * @property {any} [v]
 * @property {any} [version]
 * @property {any} [timeout]
 * @property {any} [enabled]
 * @property {any} [disabled]
 * @property {any} [port]
 * @property {any} [ssl]
 * @property {any} [ip]
 * @property {any} [updatable]
 * @property {any} [host]
 * @property {any} [enabled]
 * @property {any} [port]
 * @property {any} [cert]
 */
/** @typedef {CLICommandContext & CLICommandParams} CLICommandOptions */

/** The base class for any CLI command */
module.exports = class CLICommand {
    /** @param {CLICommandOptions} options */
    constructor(options) {
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
     * @param {keyof CLICommandOptions} arg
     */
    requireOption(arg) {
        if (this.options[arg] === undefined) {
            throw new Error(`Invalid arguments: ${arg} is missing`);
        }
    }
};
