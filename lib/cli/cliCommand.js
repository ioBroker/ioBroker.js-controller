/**
 * @typedef {(objects: any, states: any) => void} DBActionCallback
 */

/** 
 * @typedef {Object.<string, any>} CLICommandOptions
 * @property {boolean} [pretty]
 * @property {boolean} [force]
 * @property {(code: number = 0) => void} callback
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
 * @property {(callback: DBActionCallback) => void} dbAction - Invoke this before doing anything in the database
 */

/** The base class for any CLI command */
module.exports = class CLICommand {
    /** @param {CLICommandOptions} options */
    constructor(options) {
        if (options == null) throw new Error(`No options given`);

        this.options = options;
        // Always require the callback and a wrapper for DB actions
        this.requireOption("callback");
        this.requireOption("dbAction");
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
}