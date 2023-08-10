import type { EXIT_CODES } from '@iobroker/js-controller-common';

export interface IoBrokerErrorOptions {
    /** The error message */
    message: string;
    /** An ioBroker error code */
    code: EXIT_CODES;
}

/**
 * A custom ioBroker CLI error to propagate the exit code down
 */
export class IoBrokerError extends Error {
    readonly code: EXIT_CODES;
    constructor(options: IoBrokerErrorOptions) {
        super(options.message);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);

        // you may also assign additional properties to your error
        this.code = options.code;
    }
}
