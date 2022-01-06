"use strict";
const { SYSTEM_ADMIN_USER } = require('./constants');
const { tools, EXIT_CODES } = require('@iobroker/js-controller-common');
class Utils {
    /**
     * Utils for internal adapter.js usage
     * @param {object} objects - Objects DB
     * @param {object} states - States DB
     * @param {string} namespaceLog - Log prefix
     * @param {object} logger - Logger instance
     */
    constructor(objects, states, namespaceLog, logger) {
        this.objects = objects;
        this.states = states;
        this.namespaceLog = namespaceLog;
        this.log = logger;
    }

    /**
     * Performs the strict object check, which includes checking object existence, read-only logic, type and min/max
     * additionally it rounds state values whose objects have a common.step attribute defined
     *
     * @param {string} id - id of the state
     * @param {object} state - ioBroker setState object
     * @return {Promise<void>}
     */
    async performStrictObjectCheck(id, state) {
        // TODO: in js-c 3.5 (or 2 releases after 3.3) we should let it throw and add tests, maybe we
        // can already let the non existing object case throw with 3.4 because this is already producing a warning
        try {
            if (state.val === undefined) {
                // only ack etc. is also possible to acknowledge the current value,
                // if only undefined provided, it should have thrown before
                return;
            }

            const obj = await this.objects.getObjectAsync(id);
            // at first check object existence
            if (!obj) {
                this.log.warn(
                    `${this.namespaceLog} State "${id}" has no existing object, this might lead to an error in future versions`
                );
                return;
            }

            // for a state object we require common.type to exist
            if (obj.common && obj.common.type) {
                // check if we are allowed to write (read-only can only be written with ack: true)
                if (!state.ack && obj.common.write === false) {
                    this.log.warn(
                        `${this.namespaceLog} Read-only state "${id}" has been written without ack-flag with value "${state.val}"`
                    );
                }

                if (state.val !== null) {
                    // now check if type is correct, null is always allowed
                    if (obj.common.type === 'file') {
                        // file has to be set with setBinaryState
                        this.log.warn(
                            `${this.namespaceLog} State to set for "${id}" has to be written with setBinaryState/Async, because its object is of type "file"`
                        );
                    } else if (
                        !(
                            (obj.common.type === 'mixed' && typeof state.val !== 'object') ||
                            (obj.common.type !== 'object' && obj.common.type === typeof state.val) ||
                            (obj.common.type === 'array' && typeof state.val === 'string') ||
                            (obj.common.type === 'json' && typeof state.val === 'string') ||
                            (obj.common.type === 'file' && typeof state.val === 'string') ||
                            (obj.common.type === 'object' && typeof state.val === 'string')
                        )
                    ) {
                        // types can be 'number', 'string', 'boolean', 'array', 'object', 'mixed', 'json'
                        // array, object, json need to be string
                        if (['object', 'json', 'array'].includes(obj.common.type)) {
                            this.log.info(
                                `${
                                    this.namespaceLog
                                } State value to set for "${id}" has to be stringified but received type "${typeof state.val}"`
                            );
                        } else {
                            this.log.info(
                                `${this.namespaceLog} State value to set for "${id}" has to be ${
                                    obj.common.type === 'mixed'
                                        ? `one of type "string", "number", "boolean"`
                                        : `type "${obj.common.type}"`
                                } but received type "${typeof state.val}" `
                            );
                        }
                    }

                    // now round step and check min/max if it's a number
                    if (typeof state.val === 'number') {
                        if (typeof obj.common.step === 'number' && obj.common.step > 0) {
                            // round to next step
                            const inv = 1 / obj.common.step;
                            state.val = Math.round(state.val * inv) / inv;
                        }

                        if (obj.common.max !== undefined && state.val > obj.common.max) {
                            this.log.warn(
                                `${this.namespaceLog} State value to set for "${id}" has value "${state.val}" greater than max "${obj.common.max}"`
                            );
                        }

                        if (obj.common.min !== undefined && state.val < obj.common.min) {
                            this.log.warn(
                                `${this.namespaceLog} State value to set for "${id}" has value "${state.val}" less than min "${obj.common.min}"`
                            );
                        }
                    }
                }
            } else {
                this.log.warn(
                    `${this.namespaceLog} Object of state "${id}" is missing the required property "common.type"`
                );
            }
        } catch (e) {
            this.log.warn(`${this.namespaceLog} Could not perform strict object check of state ${id}: ${e.message}`);
        }
    }

    /**
     * Checks if a passed ID is valid. Throws an error if id is invalid
     *
     * @param {string|object} id id to check or object with properties device, channel and state
     * @param {boolean} isForeignId true&false if the ID is a foreign/full ID or only an "adapter local" id
     * @param {object} options optional
     * @throws Error when id is invalid
     */
    validateId(id, isForeignId, options) {
        // there is special maintenance mode to clear the DB from invalid IDs
        if (options && options.maintenance && options.user === SYSTEM_ADMIN_USER) {
            return;
        }
        if (!id && id !== 0) {
            throw new Error('The id is empty! Please provide a valid id.');
        }
        const type = typeof id;
        if (!isForeignId && type === 'number') {
            this.log.warn(`${this.namespaceLog} The id "${id}" has an invalid type! Expected "string" or "object", received "number".`);
            this.log.warn(`${this.namespaceLog} This will be refused in future versions. Please report this to the developer.`);
        }
        else if (type !== 'string' && !tools.isObject(id)) {
            throw new Error(`The id "${id}" has an invalid type! Expected "string" or "object", received "${type}".`);
        }
        if (tools.isObject(id)) {
            // id can be an object, at least one of the following properties has to exist
            const reqProperties = ['device', 'channel', 'state'];
            let found = false;
            for (const reqProperty of reqProperties) {
                if (reqProperty !== undefined) {
                    if (typeof reqProperty !== 'string') {
                        throw new Error(`The id's property "${reqProperty}" of "${JSON.stringify(id)}" has an invalid type! Expected "string", received "${typeof reqProperty}".`);
                    }
                    if (reqProperty.includes('.')) {
                        throw new Error(`The id's property "${reqProperty}" of "${JSON.stringify(id)}" contains the invalid character "."!`);
                    }
                    found = true;
                }
            }
            if (found === false) {
                throw new Error(`The id "${JSON.stringify(id)}" is an invalid object! Expected at least one of the properties "device", "channel" or "state" to exist.`);
            }
        }
        else {
            if (type !== 'string') {
                throw new Error(`The id "${JSON.stringify(id)}" has an invalid type! Expected "string", received "${type}".`);
            }
            if (id.endsWith('.')) {
                throw new Error(`The id "${id}" is invalid. Ids are not allowed to end in "."`);
            }
        }
    }
    /**
     * Look up the error description for an error code
     *
     * @param {number} code error code
     * @return {string} error description
     */
    getErrorText(code) {
        code = code || 0;
        return (EXIT_CODES[code] || code).toString();
    }
}
module.exports = Utils;
//# sourceMappingURL=utils.js.map
