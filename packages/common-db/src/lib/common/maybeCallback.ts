// Beware, below be TypeScript dragons!

import { ERRORS } from '@/lib/common/tools.js';

type MaybeCbCallback<T extends any[]> = (...args: T) => void;
type MaybeCbErrCallback<T extends any[]> = (error: Error | null | undefined, ...args: T) => void;

// Helper type to infer the return type of the maybeCallbackWithError function
// If the callback is given, the return type is void
// otherwise, the return type is a Promise whose resolved value type depends on the given arguments, or the error variable
type MaybeCbErrReturnType<
    TCb extends MaybeCbErrCallback<any> | null | undefined,
    TErr extends Error | string | null | undefined,
    TArgs extends any[],
> =
    TCb extends MaybeCbErrCallback<any>
        ? void
        : // If there is an error given, the promise will never resolve
          TErr extends Error | string
          ? Promise<never>
          : // Infer the return type from the arguments
            Promise<
                [] extends TArgs
                    ? void // if ([] === T) void
                    : [any] extends TArgs
                      ? TArgs[0] // else if (T has one element) => take first element
                      : TArgs // else return T entirely
            >;

// Helper type to infer the callback arguments for the maybeCallbackWithError function
// If a callback is given, they must match its arguments. Otherwise, they are inferred and default to any[]
type MaybeCbErrCallbackParameters<
    CB extends MaybeCbErrCallback<any> | null | undefined,
    TErr extends Error | string | null | undefined,
> =
    Exclude<CB, undefined | null> extends MaybeCbErrCallback<infer U>
        ? // If the error argument is given,
          TErr extends Error | string
            ? //  don't require arguments, but allow passing them
              U | []
            : // Otherwise, require the correct args
              U
        : any[];

// Helper type to infer the callback arguments for the maybeCallback function
// If a callback is given, they must match its arguments. Otherwise, they are inferred and default to any[]
type MaybeCbCallbackParameters<CB extends MaybeCbCallback<any> | null | undefined> =
    Exclude<CB, undefined | null> extends MaybeCbCallback<infer U> ? U : any[];

// Helper type to infer the return type of the maybeCallback function
// If the callback is given, the return type is void
// otherwise, the return type is a Promise whose resolved value type depends on the given arguments
type MaybeCbReturnType<TCb extends MaybeCbErrCallback<any> | null | undefined, TArgs extends any[]> =
    TCb extends MaybeCbCallback<any>
        ? void
        : // Infer the return type from the arguments
          Promise<
              [] extends TArgs
                  ? void // if ([] === T) void
                  : [any] extends TArgs
                    ? TArgs[0] // else if (T has one element) => take first element
                    : TArgs // else return T entirely
          >;

// Helper type to lower the inference priority of an argument
type NoInfer<T> = T & { [K in keyof T]: T[K] };

// This is the publicly visible signature of maybeCallback. The one below is just internal
// and makes implementing the function much, much easier (although a bit unsound).
export function maybeCallback<
    // Limit the callback type to a valid callback type
    TCb extends MaybeCbCallback<any> | null | undefined,
    // The callback arguments must match the callback args
    TArgs extends MaybeCbCallbackParameters<TCb> = MaybeCbCallbackParameters<TCb>,
>(
    callback: TCb,
    // Infer the arguments with lower priority than the callback - they need to match it.
    ...args: NoInfer<TArgs>
): MaybeCbReturnType<TCb, TArgs>;

/**
 * Checks if the given callback is a function and if so calls it with the given parameter immediately, else a resolved Promise is returned
 *
 * @param callback - callback function to be executed
 * @param args - as many arguments as needed, which will be returned by the callback function or by the Promise
 * @returns if Promise is resolved with multiple arguments, an array is returned
 */
export function maybeCallback<T extends any[]>(callback?: MaybeCbCallback<T> | null, ...args: T): Promise<any> | void {
    if (typeof callback === 'function') {
        // if function we call it with given param
        setImmediate(callback, ...args);
    } else {
        return Promise.resolve(args.length > 1 ? args : args[0]);
    }
}

// This is the publicly visible signature of maybeCallbackWithError. The one below is just internal
// and makes implementing the function much, much easier (although a bit unsound).
export function maybeCallbackWithError<
    // Limit the callback type to a valid callback type
    TCb extends MaybeCbErrCallback<any> | null | undefined,
    // And the error to either an error or sting, or null/undefined
    TErr extends Error | string | null | undefined,
    // The callback arguments must match the callback args
    TArgs extends MaybeCbErrCallbackParameters<TCb, TErr> = MaybeCbErrCallbackParameters<TCb, TErr>,
>(
    callback: TCb,
    error: TErr,
    // Infer the arguments with lower priority than the callback - they need to match it.
    ...args: NoInfer<TArgs>
): MaybeCbErrReturnType<TCb, TErr, TArgs>;

/**
 * Checks if the given callback is a function and if so calls it with the given error and parameter immediately, else a resolved or rejected Promise is returned. Error ERROR_DB_CLOSED are not rejecting the promise
 *
 * @param callback - callback function to be executed
 * @param error - error which will be used by the callback function. If callback is not a function and
 * error is given, a rejected Promise is returned. If error is given, but it is not an instance of Error, it is converted into one.
 * @param args - as many arguments as needed, which will be returned by the callback function or by the Promise
 * @returns if Promise is resolved with multiple arguments, an array is returned
 */
export function maybeCallbackWithError<T extends any[]>(
    callback: MaybeCbErrCallback<T> | null | undefined,
    error: Error | string | null | undefined,
    ...args: T
): Promise<any> | void {
    if (error !== undefined && error !== null && !(error instanceof Error)) {
        // if it's not a real Error, we convert it into one
        error = new Error(error);
    }
    const isDbError = error ? error.message === ERRORS.ERROR_DB_CLOSED : false;

    if (typeof callback === 'function') {
        setImmediate(callback, error, ...args);
    } else if (error && !isDbError) {
        return Promise.reject(error);
    } else {
        return Promise.resolve(args.length > 1 ? args : args[0]);
    }
}

// This is the publicly visible signature of maybeCallbackWithRedisError, which is an exact copy of maybeCallbackWithError's signature.
// The one below is just internal and makes implementing the function much, much easier (although a bit unsound).
export function maybeCallbackWithRedisError<
    // Limit the callback type to a valid callback type
    TCb extends MaybeCbErrCallback<any> | null | undefined,
    // And the error to either an error or sting, or null/undefined
    TErr extends Error | string | null | undefined,
    // The callback arguments must match the callback args
    TArgs extends MaybeCbErrCallbackParameters<TCb, TErr> = MaybeCbErrCallbackParameters<TCb, TErr>,
>(
    callback: TCb,
    error: TErr,
    // Infer the arguments with lower priority than the callback - they need to match it.
    ...args: NoInfer<TArgs>
): MaybeCbErrReturnType<TCb, TErr, TArgs>;

/**
 * Checks if the given callback is a function and if so calls it with the given error and parameter immediately, else a resolved or rejected Promise is returned. Redis-Error "Connection is closed." is converted into ERROR_DB_CLOSED
 *
 * @param callback - callback function to be executed
 * @param error - error which will be used by the callback function. If callback is not a function and
 * error is given, a rejected Promise is returned. If error is given, but it is not an instance of Error, it is converted into one.
 * @param args - as many arguments as needed, which will be returned by the callback function or by the Promise
 * @returns Promise if Promise is resolved with multiple arguments, an array is returned
 */
export function maybeCallbackWithRedisError<T extends any[]>(
    callback: MaybeCbErrCallback<T> | null | undefined,
    error: Error | string | null | undefined,
    ...args: T
): Promise<any> | void {
    if (error instanceof Error && error.message.includes('Connection is closed')) {
        error.message = ERRORS.ERROR_DB_CLOSED;
    }
    return maybeCallbackWithError(callback, error, ...args);
}
