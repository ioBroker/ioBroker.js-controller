'use strict';

module.exports = Object.freeze({
	error_stateNotFound: (
		/** @type {string} */ stateID,
		/** @type {string?} */ error
	) => `The state ${stateID} was not found!` + error ? ` Reason: ${error}`: '',
	error_objectNotFound: (
		/** @type {string} */ objectID,
		/** @type {string?} */ error
	) => `The object ${objectID} was not found!` + error ? ` Reason: ${error}`: '',
	error_objectPropertyNotFound: (
		/** @type {string} */ objectID,
		/** @type {string} */ propPath
	) => `The requested property "${propPath}" or one of its parents was not found in the object "${objectID}"!`,
	error_invalidPropertyOrValue: () => `The property path or value is not valid. Please make sure the value is valid JSON.`,
	error_unknownCommand: (
		/** @type {string} */ prefix,
		/** @type {string} */ command
	) => `Unknown command "${prefix} ${command}"!`,

	success_objectUpdated: (/** @type {string} */ objectID) => `The object ${objectID} was updated successfully.`,
	success_objectDeleted: (/** @type {string} */ objectID) => `The object ${objectID} was deleted successfully.`,
	success_stateDeleted: (/** @type {string} */ stateID) => `The state ${stateID} was deleted successfully.`,
});