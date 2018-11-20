'use strict';

module.exports.error = Object.freeze({
	stateNotFound: (
		/** @type {string} */ stateID,
		/** @type {string?} */ error
	) => `The state ${stateID} was not found!` + error ? ` Reason: ${error}`: '',
	objectNotFound: (
		/** @type {string} */ objectID,
		/** @type {string?} */ error
	) => `The object ${objectID} was not found!` + error ? ` Reason: ${error}`: '',
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
	) => `The required argument "${argName}" is missing!` + exampleCommand ? ` Example: "${exampleCommand}"`: '',
	noInstancesFound: (/** @type {string} */ adapter) => `Cannot find any instances of "${adapter}"!`,
	invalidInstance: (/** @type {string} */ instance) => `The instance "${instance}" does not exist!`,
});

module.exports.success = Object.freeze({
	objectUpdated: (/** @type {string} */ objectID) => `The object "${objectID}" was updated successfully.`,
	objectDeleted: (/** @type {string} */ objectID) => `The object "${objectID}" was deleted successfully.`,
	stateDeleted: (/** @type {string} */ stateID) => `The state "${stateID}" was deleted successfully.`,
	adapterStarted: (/** @type {string} */ adapter) => `The adapter "${adapter}" was started.`,
	adapterStopped: (/** @type {string} */ adapter) => `The adapter "${adapter}" was stopped.`,
	adapterRestarted: (/** @type {string} */ adapter) => `The adapter "${adapter}" was restarted.`,
});