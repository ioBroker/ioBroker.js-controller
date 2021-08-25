const path = require('path');
const fs = require('fs');

function getControllerDir() {
    const possibilities = ['iobroker.js-controller', 'ioBroker.js-controller'];
    for (const pkg of possibilities) {
        try {
            // package.json is guaranteed to be in the module root folder
            // so once that is resolved, take the dirname and we're done
            const possiblePath = require.resolve(`${pkg}/package.json`);
            if (fs.existsSync(possiblePath)) {
                return path.dirname(possiblePath);
            }
        } catch {
            /* not found */
        }
    }

    // Apparently, checking vs null/undefined may miss the odd case of controllerPath being ""
    // Thus we check for falsyness, which includes failing on an empty path
    let checkPath = path.join(__dirname, '../..');
    // Also check in the current check dir (along with iobroker.js-controller subdirs)
    possibilities.unshift('');
    while (true) {
        for (const pkg of possibilities) {
            try {
                const possiblePath = path.join(checkPath, pkg);
                if (fs.existsSync(path.join(possiblePath, 'lib/tools.js'))) {
                    return possiblePath;
                }
            } catch {
                // not found, continue with next possiblity
            }
        }

        // Controller not found here - go to the parent dir
        const newPath = path.dirname(checkPath);
        if (newPath === checkPath) {
            // We already reached the root dir, abort
            break;
        }
        checkPath = newPath;
    }
}

const controllerDir = getControllerDir() || __dirname;

module.exports = require(path.join(controllerDir , 'lib/tools.js'));
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