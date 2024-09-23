import { MAX_TIMEOUT, SYSTEM_ADMIN_USER } from '@/lib/adapter/constants.js';
import { tools, EXIT_CODES } from '@iobroker/js-controller-common';

type Callback = (...args: any[]) => void | Promise<void>;
type OptionalCallback = undefined | Callback;
type Pattern = string | string[];

export interface ValidateIdOptions {
    /** in maintenance mode, we can access invalid ids to delete them, only works with the admin user */
    maintenance?: boolean;
    /** User used to check for access rights */
    user?: string;
}

export class Validator {
    private readonly objects: any;
    private readonly states: any;
    private readonly namespaceLog: string;
    private readonly log: any;
    private readonly namespace: string;
    private readonly namespaceRegExp: RegExp;

    /**
     * Validator for internal adapter.js usage
     *
     * @param objects - Objects DB
     * @param states - States DB
     * @param namespaceLog - Log prefix
     * @param logger - Logger instance
     * @param namespace - the namespace of the adapter
     * @param namespaceRegExp - the namespace RegExp of the adapter `adapter.0`
     */
    constructor(
        objects: any,
        states: any,
        namespaceLog: string,
        logger: any,
        namespace: string,
        namespaceRegExp: RegExp,
    ) {
        this.objects = objects;
        this.states = states;
        this.namespaceLog = namespaceLog;
        this.namespace = namespace;
        this.namespaceRegExp = namespaceRegExp;
        this.log = logger;
    }

    /**
     * Performs the strict object check, which includes checking object existence, read-only logic, type and min/max
     * additionally it rounds state values whose objects have a `common.step` attribute defined
     *
     * @param id - id of the state
     * @param state - ioBroker setState object
     */
    async performStrictObjectCheck(id: string, state: ioBroker.SettableState): Promise<void> {
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
                    `${this.namespaceLog} State "${id}" has no existing object, this might lead to an error in future versions`,
                );
                return;
            }

            // for a state object, we require common.type to exist
            if (obj.common?.type) {
                // check if we are allowed to write (read-only can only be written with ack: true)
                if (!state.ack && obj.common.write === false) {
                    this.log.warn(
                        `${this.namespaceLog} Read-only state "${id}" has been written without ack-flag with value "${state.val}"`,
                    );
                }

                if (state.val !== null) {
                    // now check if a type is correct, null is always allowed
                    if (
                        !(
                            (obj.common.type === 'mixed' && typeof state.val !== 'object') ||
                            (obj.common.type !== 'object' && obj.common.type === typeof state.val) ||
                            (obj.common.type === 'array' && typeof state.val === 'string') ||
                            (obj.common.type === 'json' && typeof state.val === 'string') ||
                            (obj.common.type === 'object' && typeof state.val === 'string')
                        )
                    ) {
                        // types can be 'number', 'string', 'boolean', 'array', 'object', 'mixed', 'json';
                        // 'array', 'object', 'json' need to be string
                        if (['object', 'json', 'array'].includes(obj.common.type)) {
                            this.log.info(
                                `${
                                    this.namespaceLog
                                } State value to set for "${id}" has to be stringified but received type "${typeof state.val}"`,
                            );
                        } else {
                            this.log.info(
                                `${this.namespaceLog} State value to set for "${id}" has to be ${
                                    obj.common.type === 'mixed'
                                        ? `one of type "string", "number", "boolean"`
                                        : `type "${obj.common.type}"`
                                } but received type "${typeof state.val}" `,
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
                                `${this.namespaceLog} State value to set for "${id}" has value "${state.val}" greater than max "${obj.common.max}"`,
                            );
                        }

                        if (obj.common.min !== undefined && state.val < obj.common.min) {
                            this.log.warn(
                                `${this.namespaceLog} State value to set for "${id}" has value "${state.val}" less than min "${obj.common.min}"`,
                            );
                        }
                    }
                }
            } else {
                this.log.warn(
                    `${this.namespaceLog} Object of state "${id}" is missing the required property "common.type"`,
                );
            }
        } catch (e) {
            this.log.warn(`${this.namespaceLog} Could not perform strict object check of state ${id}: ${e.message}`);
        }
    }

    /**
     * Checks if a passed ID is valid. Throws an error if id is invalid
     *
     * @param id id to check or object with properties device, channel and state
     * @param isForeignId true&false if the ID is a foreign/full ID or only an "adapter local" id
     * @param options optional
     * @throws Error when id is invalid
     */
    validateId(id: any, isForeignId: boolean, options?: ValidateIdOptions | null): asserts id is string {
        // there is a special maintenance mode to clear the DB from invalid IDs
        if (options && options.maintenance && options.user === SYSTEM_ADMIN_USER) {
            return;
        }

        if (!id && id !== 0) {
            throw new Error('The id is empty! Please provide a valid id.');
        }

        const type = typeof id;

        if (!isForeignId && type === 'number') {
            this.log.warn(
                `${this.namespaceLog} The id "${id}" has an invalid type! Expected "string" or "object", received "number".`,
            );
            this.log.warn(
                `${this.namespaceLog} This will be refused in future versions. Please report this to the developer.`,
            );
        } else if (type !== 'string' && !tools.isObject(id)) {
            throw new Error(`The id "${id}" has an invalid type! Expected "string" or "object", received "${type}".`);
        }

        if (tools.isObject(id)) {
            // id can be an object, at least one of the following properties has to exist
            const reqProperties = ['device', 'channel', 'state'];
            let found = false;
            for (const reqProperty of reqProperties) {
                if (id[reqProperty] !== undefined) {
                    if (typeof id[reqProperty] !== 'string') {
                        throw new Error(
                            `The id's property "${reqProperty}" of "${JSON.stringify(
                                id,
                            )}" has an invalid type! Expected "string", received "${typeof id[reqProperty]}".`,
                        );
                    }

                    if (id[reqProperty].includes('.')) {
                        throw new Error(
                            `The id's property "${reqProperty}" of "${JSON.stringify(
                                id,
                            )}" contains the invalid character "."!`,
                        );
                    }
                    found = true;
                }
            }
            if (!found) {
                throw new Error(
                    `The id "${JSON.stringify(
                        id,
                    )}" is an invalid object! Expected at least one of the properties "device", "channel" or "state" to exist.`,
                );
            }
        } else {
            if (type !== 'string') {
                throw new Error(
                    `The id "${JSON.stringify(id)}" has an invalid type! Expected "string", received "${type}".`,
                );
            }
            if (id.endsWith('.')) {
                throw new Error(`The id "${id}" is invalid. Ids are not allowed to end in "."`);
            }
        }
    }

    /**
     * Look up the error description for an error code
     *
     * @param code error code
     * @returns error description
     */
    static getErrorText(code: number): string {
        code = code || 0;
        return (EXIT_CODES[code] || code).toString();
    }

    /**
     * Throws if a type is not matching the expected type
     *
     * @param value value to check a type of
     * @param name name of the parameter for logging
     */
    static assertString(value: unknown, name: string): asserts value is string {
        if (typeof value !== 'string') {
            throw new Error(
                `Parameter "${name}" needs to be of type "string" but type "${typeof value}" has been passed`,
            );
        }
    }

    /**
     * Throws if a type is not a pattern
     *
     * @param value value to check a type of
     * @param name name of the parameter for logging
     */
    static assertPattern(value: unknown, name: string): asserts value is Pattern {
        if (typeof value !== 'string' && !Array.isArray(value)) {
            throw new Error(
                `Parameter "${name}" needs to be of type "string" or an array of type "string", "${typeof value}" has been passed`,
            );
        } else if (Array.isArray(value)) {
            for (const entry of value) {
                if (typeof entry !== 'string') {
                    throw new Error(
                        `Parameter "${name}" needs to be of type "string" or an array of type "string", but the array contains a value of type "${typeof value}"`,
                    );
                }
            }
        }
    }

    /**
     * Throws if a type is not matching the expected type
     *
     * @param value value to check a type of
     * @param name name of the parameter for logging
     */
    static assertBoolean(value: unknown, name: string): asserts value is boolean {
        if (typeof value !== 'boolean') {
            throw new Error(
                `Parameter "${name}" needs to be of type "boolean" but type "${typeof value}" has been passed`,
            );
        }
    }

    /**
     * Throws if a type is not matching the expected type
     *
     * @param value value to check a type of
     * @param name name of the parameter for logging
     */
    static assertNumber(value: unknown, name: string): asserts value is number {
        if (typeof value !== 'number') {
            throw new Error(
                `Parameter "${name}" needs to be of type "number" but type "${typeof value}" has been passed`,
            );
        }
    }

    /**
     * Throws if a type is not matching the expected type
     *
     * @param value value to check a type of
     * @param name name of the parameter for logging
     */
    static assertObject<T extends Record<string, any> = Record<string, any>>(
        value: unknown,
        name: string,
    ): asserts value is T {
        if (!tools.isObject(value)) {
            throw new Error(`Parameter "${name}" needs to be a real object but type "${typeof value}" has been passed`);
        }
    }

    /**
     * Throws if a type is not an optional callback
     *
     * @param value value to check a type of
     * @param name name of the parameter for logging
     */
    static assertBuffer(value: unknown, name: string): asserts value is Buffer {
        if (!Buffer.isBuffer(value)) {
            throw new Error(`Parameter "${name}" needs to be a Buffer but type "${typeof value}" has been passed`);
        }
    }

    /**
     * Throws if a type is not an optional callback
     *
     * @param value value to check a type of
     * @param name name of the parameter for logging
     */
    static assertOptionalCallback(value: unknown, name: string): asserts value is OptionalCallback {
        if (value && typeof value !== 'function') {
            throw new Error(
                `Parameter "${name}" needs to be of type "null", "undefined" or "function" but type "${typeof value}" has been passed`,
            );
        }
    }

    /**
     * Throws if a type is not an optional callback
     *
     * @param value value to check a type of
     * @param name name of the parameter for logging
     */
    static assertCallback(value: unknown, name: string): asserts value is Callback {
        if (typeof value !== 'function') {
            throw new Error(
                `Parameter "${name}" needs to be of type "function" but type "${typeof value}" has been passed`,
            );
        }
    }

    /**
     * Adds the namespace to the ID if it is missing, if an object is passed it will be converted to an id string
     *
     * @param id id which will be fixed
     * @param isPattern if the id is a pattern
     */
    fixId(id: string | ioBroker.IdObject, isPattern = false): string {
        if (!id) {
            id = '';
        }

        let result = '';
        if (typeof id === 'string') {
            result = id;

            // if not the instance name itself and also not starts with namespace and "."
            if (id !== this.namespace && !this.namespaceRegExp.test(id)) {
                if (!isPattern) {
                    result = this.namespace + (id ? `.${id}` : '');
                } else {
                    result = `${this.namespace}.${id ? id : ''}`;
                }
            }
        } else if (tools.isObject(id)) {
            // If ID is an object
            // Add namespace + device + channel
            result = `${this.namespace}.${id.device ? `${id.device}.` : ''}${id.channel ? `${id.channel}.` : ''}${
                id.state ? id.state : ''
            }`;
        }
        return result;
    }

    /**
     * Validates the object-type argument that is passed to setState
     *
     * @param obj object to validate
     */
    validateSetStateObjectArgument(obj: Record<string, any>): void {
        // Check that we have at least one existing non-undefined property at all, else invalid
        if (!Object.values(obj).some(prop => prop !== undefined)) {
            throw new Error(`The state contains no properties! At least one property is expected!`);
        }

        /*
        The following object parameters and types are allowed:
        val:    any,     (optional)
        ack:    boolean, (optional)
        ts:     number,  (optional)
        q:      number,  (optional)
        from:   string,  (optional)
        c:      string,  (optional)
        expire: number   (optional)
        lc:     number   (optional)
        user:   string   (optional)

        Everything else is forbidden
    */
        const optionalProperties: Record<string, string> = {
            val: 'any',
            ack: 'boolean',
            ts: 'number',
            q: 'number',
            from: 'string',
            c: 'string',
            expire: 'number',
            lc: 'number',
            user: 'string',
        };

        // Are there any forbidden properties?
        const forbiddenProperties = Object.keys(obj).filter(k => !optionalProperties[k]);
        if (forbiddenProperties.length) {
            throw new Error(`The state contains the forbidden properties ${forbiddenProperties.join(', ')}!`);
        }
        // Do all properties have the correct type?
        for (const [key, type] of Object.entries(optionalProperties)) {
            // any permits all types
            if (type === 'any') {
                continue;
            }
            // don't flag optional properties when they don't exist or are undefined
            if (!(key in obj) || obj[key] === undefined) {
                continue;
            }
            if (type !== typeof obj[key]) {
                throw new Error(
                    `The state property "${key}" has the wrong type "${typeof obj[key]}" (should be "${type}")!`,
                );
            }
        }
    }

    /**
     * Validates that the timeout is not exceeding a 32-bit signed integer
     *
     * @param ms milliseconds to validate
     */
    static assertTimeout(ms: number): void {
        if (ms > MAX_TIMEOUT) {
            throw new Error(`Timeout (${ms}) is larger than a 32-bit signed integer (${MAX_TIMEOUT})`);
        }

        if (ms < 0) {
            throw new Error(`Timeout (${ms}) is smaller than 0`);
        }
    }
}
