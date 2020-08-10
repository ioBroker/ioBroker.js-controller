'use strict';
const tools = require('../tools');

const errorMessages = Object.freeze({
    stateNotFound: (
        /** @type {string} */ stateID,
        /** @type {string?} */ error
    ) => `The state ${stateID} was not found!` + (error ? ` Reason: ${error}` : ''),
    objectNotFound: (
        /** @type {string} */ objectID,
        /** @type {string?} */ error
    ) => `The object ${objectID} was not found!` + (error ? ` Reason: ${error}` : ''),
    cannotUpdateObject: (
        /** @type {string} */ objectID,
        /** @type {string?} */ error
    ) => `The object ${objectID} could not be updated!` + (error ? ` Reason: ${error}` : ''),
    cannotDeleteObject: (
        /** @type {string} */ objectID,
        /** @type {string?} */ error
    ) => `The object ${objectID} cannot be deleted!` + (error ? ` Reason: ${error}` : ''),
    cannotDeleteObjectFromEnums: (
        /** @type {string} */ objectID,
        /** @type {string?} */ error
    ) => `The object ${objectID} could not be deleted from enums!` + (error ? ` Reason: ${error}` : ''),
    cannotChangeObject: (
        /** @type {string} */ objectID,
        /** @type {string?} */ error
    ) => `The object ${objectID} cannot be changed!` + (error ? ` Reason: ${error}` : ''),
    objectPropertyNotFound: (
        /** @type {string} */ objectID,
        /** @type {string} */ propPath
    ) => `The requested property "${propPath}" or one of its parents was not found in the object "${objectID}"!`,
    invalidPropertyOrValue: () => `The property path or value is not valid. Please make sure the value is valid JSON.`,
    invalidJSONValue: () => `The given value is not valid JSON.`,

    unknownCommand: (
        /** @type {string} */ prefix,
        /** @type {string} */ command
    ) => `Unknown command "${prefix} ${command}"!`,
    requiredArgumentMissing: (
        /** @type {string} */ argName,
        /** @type {string?} */ exampleCommand
    ) => `The required argument "${argName}" is missing!` + (exampleCommand ? ` Example: "${exampleCommand}"` : ''),

    noInstancesFound: adapter => `Cannot find any instances of "${adapter}"!`,
    invalidInstance: instance => `The instance "${instance}" does not exist!`,
    specifyInstance: (/** @type {string} */ adapter, /** @type {Array<string>?} */adapterInstances) => `The adapter "${adapter}" has multiple instances! Please specify which one should be started: "${adapterInstances.join('", "')}".`,
    adapterDirNotFound: adapter => `Cannot find the installation dir for adapter "${adapter}"!`,
    mainFileNotFound: adapter => `Cannot find the main file for adapter "${adapter}"!`,
    cannotLoadIoPackage: adapter => `Cannot load the io-package.json file for adapter "${adapter}"!`,

    wrongCommandPrefix: (
        /** @type {string} */ wrongPrefix,
        /** @type {string} */ command,
        /** @type {string?} */ correctPrefix
    ) => `The command ${command} is not intended to be used with ${wrongPrefix}!`
    + correctPrefix ? `Please use "${correctPrefix} ${command}" instead.` : '',
    unknown: err => `An unknown error occurred: ${err}`,

    cannotChangeRunningSystem: () => `Cannot execute changes on running system. Stop ${tools.appName} first.`,
    noHostThisInMultihost: () => `Cannot use this command in multihost!`,
    hostAlreadyExists: hostname => `A host with the name "${hostname}" already exists!`,
    hostDoesNotExist: hostname => `The host "${hostname}" does not exist!`,
    dontRemoveCurrentHost: hostname => `Cannot remove host "${hostname}" from itself!`,

    pluginNotDefined: (pluginName, host, instance) => `The plugin "${pluginName}" does not exist for ${host ? `host "${host}"` : `instance "${instance}"`}!`,

    cert: certName => `Certificate "${certName}" not found or error parsing certificate information.`
});

const successMessages = Object.freeze({
    objectUpdated: objectID => `The object "${objectID}" was updated successfully.`,
    objectDeleted: objectID => `The object "${objectID}" was deleted.`,
    stateUpdated: (
        /** @type {string} */ stateID,
        /** @type {any} */ value,
        /** @type {boolean | undefined} */ ack
    ) => `The state "${stateID}" was set to "${value}"${ack === undefined ? '' : ` with flag ack=${ack}`}`,
    stateDeleted: stateID => `The state "${stateID}" was deleted.`,
    adapterStarted: adapter => `The adapter "${adapter}" was started.`,
    adapterStopped: adapter => `The adapter "${adapter}" was stopped.`,
    adapterRestarted: adapter => `The adapter "${adapter}" was restarted.`,
    systemStatus: isRunning => isRunning ? `At least one ${tools.appName} host is running.` : `No ${tools.appName} host is running.`,
    controllerStatus: isRunning => `${tools.appName} is ${isRunning ? '' : 'not '}running on this host.`,
    messageSent: (
        /** @type {string} */ adapter,
        /** @type {string} */ command,
        /** @type {any} */ message
    ) => `The command "${command}" was sent to "${adapter}" with the message "${message}".`,
    hostRenamed: (
        /** @type {string} */ from,
        /** @type {string} */ to
    ) => `Host "${from}" successfully renamed to "${to}".`,
    instanceHostChanged: (
        /** @type {string} */ instance,
        /** @type {string} */ from,
        /** @type {string} */ to
    ) => `The host for instance "${instance}" was changed from "${from}" to "${to}".`,
    hostDeleted: hostname => `The host "${hostname}" was deleted.`,

    pluginEnabledOrDisabled: (pluginName, host, instance, status) => `The plugin "${pluginName}" was successfully ${status ? 'enabled' : 'disabled'} for ${host ? `host "${host}"` : `instance "${instance}"`}.`,
    pluginStatus: (pluginName, host, instance, status) => `The plugin "${pluginName}" is ${status ? 'enabled' : 'disabled'} for ${host ? `host "${host}"` : `instance "${instance}"`}.`
});

const warnings = Object.freeze({
    noInstancesFoundOnHost: hostname => hostname ? `No instances found for host "${hostname}"!` : `No instances found!`
});

// Capsule success messages in console.log
/** Prints predefined success messages on the CLI */
module.exports.success = /** @type {typeof successMessages} */ ({});
for (const method of Object.keys(successMessages)) {
    module.exports.success[method] = (...args) => console.log(successMessages[method](...args));
}
// warnings in console.warning
module.exports.warn = /** @type {typeof warnings} */ ({});
for (const method of Object.keys(warnings)) {
    module.exports.warn[method] = (...args) => console.log(warnings[method](...args));
}
// error messages in console.error
/** Prints predefined error messages on the CLI */
module.exports.error = /** @type {typeof errorMessages} */ ({});
for (const method of Object.keys(errorMessages)) {
    module.exports.error[method] = (...args) => console.error(errorMessages[method](...args));
}
