import { StatesInMemoryFileDB } from '@iobroker/db-states-file';
import assert from 'node:assert/strict';
import { useFakeTimers } from 'sinon';

type TestHandler = {
    _subscribe?: Record<string, { pattern: string; regex: RegExp }[]>;
};

function createStatesDb(): StatesInMemoryFileDB<TestHandler> {
    const db = Object.create(StatesInMemoryFileDB.prototype) as StatesInMemoryFileDB<TestHandler>;

    Reflect.set(db, 'session', {});
    Reflect.set(db, 'sessionExpires', {});
    Reflect.set(db, 'ONE_DAY_IN_SECS', 24 * 60 * 60 * 1_000);

    return db;
}

describe('StatesInMemoryFileDB sessions', () => {
    it('removes a short-lived session and its expiry metadata', () => {
        const clock = useFakeTimers({ now: new Date('2026-01-01T00:00:00.000Z') });

        try {
            const db = createStatesDb();

            db._setSession('short', 10, {});

            clock.tick(9_999);
            assert.ok(db._getSession('short'));
            assert.ok(Reflect.get(db, 'sessionExpires').short);

            clock.tick(1);
            assert.strictEqual(db._getSession('short'), undefined);
            assert.strictEqual(Reflect.get(db, 'sessionExpires').short, undefined);
        } finally {
            clock.restore();
        }
    });

    it('removes expiry metadata after the final chunk of a long-lived session', () => {
        const clock = useFakeTimers({ now: new Date('2026-01-01T00:00:00.000Z') });
        const oneDayInSeconds = 24 * 60 * 60;

        try {
            const db = createStatesDb();

            db._setSession('long', oneDayInSeconds + 10, {});

            clock.tick(oneDayInSeconds * 1_000);
            assert.ok(db._getSession('long'));
            assert.ok(Reflect.get(db, 'sessionExpires').long);

            clock.tick(10_000);
            assert.strictEqual(db._getSession('long'), undefined);
            assert.strictEqual(Reflect.get(db, 'sessionExpires').long, undefined);
        } finally {
            clock.restore();
        }
    });

    it('clears the timeout and expiry metadata when destroying a session', () => {
        const clock = useFakeTimers({ now: new Date('2026-01-01T00:00:00.000Z') });

        try {
            const db = createStatesDb();

            db._setSession('destroyed', 60, {});
            assert.strictEqual(clock.countTimers(), 1);

            db._destroySession('destroyed');

            assert.strictEqual(db._getSession('destroyed'), undefined);
            assert.strictEqual(Reflect.get(db, 'sessionExpires').destroyed, undefined);
            assert.strictEqual(clock.countTimers(), 0);
        } finally {
            clock.restore();
        }
    });
});
