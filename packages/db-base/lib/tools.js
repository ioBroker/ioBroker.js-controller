const { tools } = require('@iobroker/js-controller-common')

module.exports = tools;
const controllerDir = tools.getControllerDir() || __dirname;
module.exports.getControllerDir = () => controllerDir;

/**
 * Checks if the given callback is a function and if so calls it with the given error and parameter immediately, else a resolved or rejected Promise is returned. Redis-Error "Connection is closed." is converted into ERROR_DB_CLOSED
 *
 * @param {((error: Error | null | undefined, ...args: any[]) => void) | null | undefined} callback - callback function to be executed
 * @param {Error | string | null | undefined} error - error which will be used by the callback function. If callback is not a function and
 * error is given, a rejected Promise is returned. If error is given but it is not an instance of Error, it is converted into one.
 * @param {any[]} args - as many arguments as needed, which will be returned by the callback function or by the Promise
 * @returns {Promise<any>} - if Promise is resolved with multiple arguments, an array is returned
 */
module.exports.maybeCallbackWithRedisError = (callback, error, ...args) => {
    if (error instanceof Error && error.message.includes('Connection is closed')) {
        error.message = module.exports.ERRORS.ERROR_DB_CLOSED;
    }
    return module.exports.maybeCallbackWithError(callback, error, ...args);
};