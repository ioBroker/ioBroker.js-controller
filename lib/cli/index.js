// This should be the entry point for a refactoring of the CLI
// We'll start with the messages

const cli_success = require('./messages').success;
const cli_error = require('./messages').error;

// Capsule success messages in console.log
/** Prints predefined success messages on the CLI */
module.exports.success = /** @type {typeof cli_success} */ ({});
for (const method of Object.keys(cli_success)) {
	module.exports.success[method] = (...args) => console.log(cli_success[method](...args));
}
// and error messages in console.error
/** Prints predefined success messages on the CLI */
module.exports.error = /** @type {typeof cli_error} */ ({});
for (const method of Object.keys(cli_error)) {
	module.exports.error[method] = (...args) => console.error(cli_error[method](...args));
}
