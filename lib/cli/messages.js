'use strict';
const tools = require('../tools');

const errorMessages = Object.freeze({
    stateNotFound: (
        /** @type {string} */ stateID,
        /** @type {string?} */ error
    ) => `The state ${stateID} was not found!` + error ? ` Reason: ${error}` : '',
    objectNotFound: (
        /** @type {string} */ objectID,
        /** @type {string?} */ error
    ) => `The object ${objectID} was not found!` + error ? ` Reason: ${error}` : '',
    objectPropertyNotFound: (
        /** @type {string} */ objectID,
        /** @type {string} */ propPath
    ) => `The requested property "${propPath}" or one of its parents was not found in the object "${objectID}"!`,
    invalidPropertyOrValue: () => `The property path or value is not valid. Please make sure the value is valid JSON.`,
    unknownCommand: (
        /** @type {string} */ prefix,
        /** @type {string} */ command
    ) => `Unknown command "${prefix} ${command}"!`,
    requiredArgumentMissing: (
        /** @type {string} */ argName,
        /** @type {string?} */ exampleCommand
    ) => `The required argument "${argName}" is missing!` + exampleCommand ? ` Example: "${exampleCommand}"` : '',
    noInstancesFound: (/** @type {string} */ adapter) => `Cannot find any instances of "${adapter}"!`,
    invalidInstance: (/** @type {string} */ instance) => `The instance "${instance}" does not exist!`,
    wrongCommandPrefix: (
        /** @type {string} */ wrongPrefix,
        /** @type {string} */ command,
        /** @type {string?} */ correctPrefix,
    ) => `The command ${command} is not intended to be used with ${wrongPrefix}!`
        + correctPrefix ? `Please use "${correctPrefix} ${command}" instead.` : '',
    unknown: (/** @type {string} */err) => `An unknown error occured: ${err}`,
});

const successMessages = Object.freeze({
    objectUpdated: (/** @type {string} */ objectID) => `The object "${objectID}" was updated successfully.`,
    objectDeleted: (/** @type {string} */ objectID) => `The object "${objectID}" was deleted successfully.`,
    stateUpdated: (
        /** @type {string} */ stateID,
        /** @type {any} */ value,
        /** @type {boolean | undefined} */ ack,
    ) => `The state "${stateID}" was set to "${value}"${ack === undefined ? '' : ` with flag ack=${ack}`}`,
    stateDeleted: (/** @type {string} */ stateID) => `The state "${stateID}" was deleted successfully.`,
    adapterStarted: (/** @type {string} */ adapter) => `The adapter "${adapter}" was started.`,
    adapterStopped: (/** @type {string} */ adapter) => `The adapter "${adapter}" was stopped.`,
    adapterRestarted: (/** @type {string} */ adapter) => `The adapter "${adapter}" was restarted.`,
    controllerStatus: (/** @type {boolean} */ isRunning) => `${tools.appName} is ${isRunning ? '' : 'not '}running.`,
});

// Capsule success messages in console.log
/** Prints predefined success messages on the CLI */
module.exports.success = /** @type {typeof successMessages} */ ({});
for (const method of Object.keys(successMessages)) {
    module.exports.success[method] = (...args) => console.log(successMessages[method](...args));
}
// and error messages in console.error
/** Prints predefined success messages on the CLI */
module.exports.error = /** @type {typeof errorMessages} */ ({});
for (const method of Object.keys(errorMessages)) {
    module.exports.error[method] = (...args) => console.error(errorMessages[method](...args));
}
