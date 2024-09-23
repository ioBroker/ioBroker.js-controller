import { tools } from '@iobroker/js-controller-common';

const errorMessages = Object.freeze({
    stateNotFound: (stateID: string, error?: string) =>
        `The state ${stateID} was not found!${error ? ` Reason: ${error}` : ''}`,
    stateNotBinary: (stateId: string) => `State "${stateId}" is not binary.`,
    stateBinaryGetUnsupported: (stateId: string) => `State "${stateId}" is a binary state, please use getBinary.`,
    stateBinarySetUnsupported: (stateId: string) => `State "${stateId}" is a binary state and cannot be set via cli.`,
    objectNotFound: (objectID: string, error?: string) =>
        `The object ${objectID} was not found!${error ? ` Reason: ${error}` : ''}`,
    cannotUpdateObject: (objectID: string, error?: string) =>
        `The object ${objectID} could not be updated!${error ? ` Reason: ${error}` : ''}`,
    cannotDeleteObject: (objectID: string, error?: string) =>
        `The object ${objectID} cannot be deleted!${error ? ` Reason: ${error}` : ''}`,
    cannotDeleteObjectFromEnums: (objectID: string, error?: string) =>
        `The object ${objectID} could not be deleted from enums!${error ? ` Reason: ${error}` : ''}`,
    cannotChangeObject: (objectID: string, error?: string) =>
        `The object ${objectID} cannot be changed!${error ? ` Reason: ${error}` : ''}`,
    objectPropertyNotFound: (objectID: string, propPath: string) =>
        `The requested property "${propPath}" or one of its parents was not found in the object "${objectID}"!`,
    invalidPropertyOrValue: () => `The property path or value is not valid. Please make sure the value is valid JSON.`,
    invalidJSONValue: () => `The given value is not valid JSON.`,

    unknownCommand: (prefix: string, command: string) => `Unknown command "${prefix} ${command}"!`,
    requiredArgumentMissing: (argName: string, exampleCommand?: string) =>
        `The required argument "${argName}" is missing!${exampleCommand ? ` Example: "${exampleCommand}"` : ''}`,

    noInstancesFound: (adapter: string) => `Cannot find any instances of "${adapter}"!`,
    invalidInstance: (instance: string) => `The instance "${instance}" does not exist!`,
    specifyInstance: (adapter: string, adapterInstances: string[]) =>
        `The adapter "${adapter}" has multiple instances! Please specify which one should be started: "${adapterInstances.join(
            '", "',
        )}".`,
    adapterDirNotFound: (adapter: string) => `Cannot find the installation dir for adapter "${adapter}"!`,
    mainFileNotFound: (adapter: string) => `Cannot find the main file for adapter "${adapter}"!`,
    cannotLoadIoPackage: (adapter: string) => `Cannot load the io-package.json file for adapter "${adapter}"!`,

    wrongCommandPrefix: (wrongPrefix: string, command: string, correctPrefix?: string) =>
        `The command ${command} is not intended to be used with ${wrongPrefix}!${
            correctPrefix ? ` Please use "${correctPrefix} ${command}" instead.` : ''
        }`,
    unknown: (err: string) => `An unknown error occurred: ${err}`,

    cannotChangeRunningSystem: () => `Cannot execute changes on running system. Stop ${tools.appName} first.`,
    noHostThisInMultihost: () => `Cannot use this command in multihost!`,
    hostAlreadyExists: (hostname: string) => `A host with the name "${hostname}" already exists!`,
    hostDoesNotExist: (hostname: string) => `The host "${hostname}" does not exist!`,
    dontRemoveCurrentHost: (hostname: string) => `Cannot remove host "${hostname}" from itself!`,

    pluginNotDefined: (pluginName: string, host: string, instance: string) =>
        `The plugin "${pluginName}" does not exist for ${host ? `host "${host}"` : `instance "${instance}"`}!`,

    cert: (certName: string) => `Certificate "${certName}" not found or error parsing certificate information.`,
    instanceAlreadyRunning: (instance: string) =>
        `The instance "${instance}" is already running, please stop instance first.`,
});

const successMessages = Object.freeze({
    objectUpdated: (objectID: string) => `The object "${objectID}" was updated successfully.`,
    objectDeleted: (objectID: string) => `The object "${objectID}" was deleted.`,
    stateUpdated: (stateID: string, value: any, ack?: boolean) =>
        `The state "${stateID}" was set to "${value}"${ack === undefined ? '' : ` with flag ack=${ack}`}`,
    stateDeleted: (stateID: string) => `The state "${stateID}" was deleted.`,
    adapterStarted: (adapter: string) => `The adapter "${adapter}" was started.`,
    adapterStopped: (adapter: string) => `The adapter "${adapter}" was stopped.`,
    adapterRestarted: (adapter: string) => `The adapter "${adapter}" was restarted.`,
    systemStatus: (isRunning: boolean) =>
        isRunning ? `At least one ${tools.appName} host is running.` : `No ${tools.appName} host is running.`,
    controllerStatus: (isRunning: boolean) => `${tools.appName} is ${isRunning ? '' : 'not '}running on this host.`,
    messageSent: (adapter: string, command: string, message: string) =>
        `The command "${command}" was sent to "${adapter}" with the message "${message}".`,
    hostRenamed: (from: string, to: string) => `Host "${from}" successfully renamed to "${to}".`,
    instanceHostChanged: (instance: string, from: string, to: string) =>
        `The host for instance "${instance}" was changed from "${from}" to "${to}".`,
    hostDeleted: (hostname: string) => `The host "${hostname}" was deleted.`,

    pluginEnabledOrDisabled: (pluginName: string, host: string, instance: string, status: boolean) =>
        `The plugin "${pluginName}" was successfully ${status ? 'enabled' : 'disabled'} for ${
            host ? `host "${host}"` : `instance "${instance}"`
        }.`,
    pluginStatus: (pluginName: string, host: string, instance: string, status: boolean) =>
        `The plugin "${pluginName}" is ${status ? 'enabled' : 'disabled'} for ${
            host ? `host "${host}"` : `instance "${instance}"`
        }.`,
});

const warnings = Object.freeze({
    noInstancesFoundOnHost: (hostname?: string) =>
        hostname ? `No instances found for host "${hostname}"!` : `No instances found!`,
});

// Capsule success messages in console.log
/** Prints predefined success messages on the CLI */
export const success = {} as typeof successMessages;
for (const method of Object.keys(successMessages)) {
    // @ts-expect-error we are only using keys of sucessMessages so method is keyof
    success[method] = (...args: string[]) => console.log(successMessages[method](...args));
}
// warnings in console.warning
export const warn = {} as typeof warnings;
for (const method of Object.keys(warnings)) {
    // @ts-expect-error we are only using keys of sucessMessages so method is keyof
    warn[method] = (...args) => console.log(warnings[method](...args));
}

// error messages in console.error
/** Prints predefined error messages on the CLI */
export const error = {} as typeof errorMessages;
for (const method of Object.keys(errorMessages)) {
    // @ts-expect-error we are only using keys of sucessMessages so method is keyof
    error[method] = (...args) => console.error(errorMessages[method](...args));
}
