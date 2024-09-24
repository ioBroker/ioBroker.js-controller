/* eslint-disable @typescript-eslint/no-unused-vars */

import { maybeCallback, maybeCallbackWithError, maybeCallbackWithRedisError } from '@/lib/common/maybeCallback.js';

// ============================================================
// maybeCallbackWithError => Callback

() => {
    // maybeCallbackWithError, empty callback
    const cb = (): void => {};

    // No error, but also no arguments
    maybeCallbackWithError(cb, null);

    // No error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithError(cb, null, 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');

    // No error, but forgot the error argument
    // @ts-expect-error
    maybeCallbackWithError(cb);

    // Has an error, no arguments
    maybeCallbackWithError(cb, 'this is an error');

    // Has an error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithError(cb, 'this is an error', 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');
};

() => {
    // maybeCallbackWithError, callback only takes an error argument
    const cb = (err?: Error | null): void => {};

    // No error, but also no arguments
    maybeCallbackWithError(cb, null);

    // No error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithError(cb, null, 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');

    // No error, but forgot the error argument
    // @ts-expect-error
    maybeCallbackWithError(cb);

    // Has an error, no arguments
    maybeCallbackWithError(cb, 'this is an error');

    // Has an error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithError(cb, 'this is an error', 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');
};

() => {
    // maybeCallbackWithError, callback only takes an argument that's not compatible with Error
    const cb = (err?: number): void => {};
    // @ts-expect-error
    maybeCallbackWithError(cb, null);
};

() => {
    // maybeCallbackWithError, callback takes an error and some additional args
    const cb = (err: Error | null | undefined, arg1: number, arg2: string): void => {};

    // No error, but forgot the arguments
    // @ts-expect-error
    maybeCallbackWithError(cb, null);

    // No error, correct number of arguments
    maybeCallbackWithError(cb, null, 1, 'two');

    // No error, incompatible arguments
    // @ts-expect-error
    maybeCallbackWithError(cb, null, 'one', 'two');

    // No error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithError(cb, null, 1, 'two', 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');

    // Has an error, no arguments
    maybeCallbackWithError(cb, 'this is an error');

    // Has an error, correct number of (ignored) arguments
    maybeCallbackWithError(cb, 'this is an error', 1, 'two');

    // Has an error, additional, incompatible arguments
    // @ts-expect-error
    maybeCallbackWithError(cb, 'this is an error', 'one', 'two');

    // Has an error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithError(cb, new Error('this is an error'), 1, 'two', 'nope!');
};

// ============================================================
// maybeCallbackWithError => Promise

() => {
    // maybeCallbackWithError, empty callback, or maybe no callback
    const cb = undefined as (() => void) | undefined;

    // No error, but also no arguments
    maybeCallbackWithError(cb, null);

    // No error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithError(cb, null, 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');

    // No error, but forgot the error argument
    // @ts-expect-error
    maybeCallbackWithError(cb);

    // Has an error, no arguments
    maybeCallbackWithError(cb, 'this is an error');

    // Has an error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithError(cb, 'this is an error', 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');
};

async () => {
    // maybeCallbackWithError, definitely no callback
    const cb = undefined;

    // No error, but also no arguments
    maybeCallbackWithError(cb, null);

    // No error, we don't know that the arguments are too many
    const p1: [string, number] = await maybeCallbackWithError(cb, null, 'one', 2);

    // No error, but forgot the error argument
    // @ts-expect-error
    maybeCallbackWithError(cb);

    // Has an error, no arguments
    const p2: never = await maybeCallbackWithError(cb, 'this is an error');

    // Has an error, but with superfluous arguments (we can't know that)
    const p3: never = await maybeCallbackWithError(
        cb,
        'this is an error',
        'why',
        'are',
        'you',
        'calling',
        'me',
        'with',
        'arguments',
    );
};

// ============================================================
// maybeCallbackWithRedisError => Callback

() => {
    // maybeCallbackWithRedisError, empty callback
    const cb = (): void => {};

    // No error, but also no arguments
    maybeCallbackWithRedisError(cb, null);

    // No error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithRedisError(cb, null, 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');

    // No error, but forgot the error argument
    // @ts-expect-error
    maybeCallbackWithRedisError(cb);

    // Has an error, no arguments
    maybeCallbackWithRedisError(cb, 'this is an error');

    // Has an error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithRedisError(cb, 'this is an error', 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');
};

() => {
    // maybeCallbackWithRedisError, callback only takes an error argument
    const cb = (err?: Error | null): void => {};

    // No error, but also no arguments
    maybeCallbackWithRedisError(cb, null);

    // No error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithRedisError(cb, null, 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');

    // No error, but forgot the error argument
    // @ts-expect-error
    maybeCallbackWithRedisError(cb);

    // Has an error, no arguments
    maybeCallbackWithRedisError(cb, 'this is an error');

    // Has an error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithRedisError(cb, 'this is an error', 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');
};

() => {
    // maybeCallbackWithRedisError, callback only takes an argument that's not compatible with Error
    const cb = (err?: number): void => {};
    // @ts-expect-error
    maybeCallbackWithRedisError(cb, null);
};

() => {
    // maybeCallbackWithRedisError, callback takes an error and some additional args
    const cb = (err: Error | null | undefined, arg1: number, arg2: string): void => {};

    // No error, but forgot the arguments
    // @ts-expect-error
    maybeCallbackWithRedisError(cb, null);

    // No error, correct number of arguments
    maybeCallbackWithRedisError(cb, null, 1, 'two');

    // No error, incompatible arguments
    // @ts-expect-error
    maybeCallbackWithRedisError(cb, null, 'one', 'two');

    // No error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithRedisError(cb, null, 1, 'two', 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');

    // Has an error, no arguments
    maybeCallbackWithRedisError(cb, 'this is an error');

    // Has an error, correct number of (ignored) arguments
    maybeCallbackWithRedisError(cb, 'this is an error', 1, 'two');

    // Has an error, additional, incompatible arguments
    // @ts-expect-error
    maybeCallbackWithRedisError(cb, 'this is an error', 'one', 'two');

    // Has an error, but with superfluous arguments
    // @ts-expect-error
    maybeCallbackWithRedisError(cb, new Error('this is an error'), 1, 'two', 'nope!');
};

// ============================================================
// maybeCallback => Callback

() => {
    // maybeCallback, empty callback
    const cb = (): void => {};

    // OK
    maybeCallback(cb);

    // With superfluous arguments
    // @ts-expect-error
    maybeCallback(cb, 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');
};

() => {
    // maybeCallback, callback takes some args
    const cb = (arg1: number, arg2?: string): void => {};

    // Forgot one arg
    // @ts-expect-error
    maybeCallback(cb);

    // Only one arg
    maybeCallback(cb, 1);

    // Both args
    maybeCallback(cb, 1, 'two');

    // Too many args
    // @ts-expect-error
    maybeCallback(cb, 1, 'two', 3);
};

// ============================================================
// maybeCallback => Promise

() => {
    // maybeCallback, empty callback, or maybe no callback
    const cb = undefined as (() => void) | undefined;

    // OK
    maybeCallback(cb);

    // With superfluous arguments
    // @ts-expect-error
    maybeCallback(cb, 'why', 'are', 'you', 'calling', 'me', 'with', 'arguments');
};

async () => {
    // maybeCallback, definitely no callback
    const cb = undefined;

    // No arguments
    const p1: void = await maybeCallback(cb);

    // Two arguments
    const p2: [string, number] = await maybeCallback(cb, 'one', 2);
};
