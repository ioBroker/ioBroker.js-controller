export = Utils;
declare class Utils {
    /**
     * Utils for internal adapter.js usage
     * @param {object} objects - Objects DB
     * @param {object} states - States DB
     * @param {string} namespaceLog - Log prefix
     * @param {object} logger - Logger instance
     */
    constructor(objects: object, states: object, namespaceLog: string, logger: object);
    objects: object;
    states: object;
    namespaceLog: string;
    log: object;
    /**
     * Performs the strict object check, which includes checking object existence, read-only logic, type and min/max
     * additionally it rounds state values whose objects have a common.step attribute defined
     *
     * @param {string} id - id of the state
     * @param {object} state - ioBroker setState object
     * @return {Promise<void>}
     */
    performStrictObjectCheck(id: string, state: object): Promise<void>;
    /**
     * Checks if a passed ID is valid. Throws an error if id is invalid
     *
     * @param {string|object} id id to check or object with properties device, channel and state
     * @param {boolean} isForeignId true&false if the ID is a foreign/full ID or only an "adapter local" id
     * @param {object} options optional
     * @throws Error when id is invalid
     */
    validateId(id: string | object, isForeignId: boolean, options: object): void;
    /**
     * Look up the error description for an error code
     *
     * @param {number} code error code
     * @return {string} error description
     */
    getErrorText(code: number): string;
}
//# sourceMappingURL=utils.d.ts.map