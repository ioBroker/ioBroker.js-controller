import assert from 'node:assert/strict';
import { FenceGate } from './fenceGate.js';

/**
 * Whether the promise has settled after the pending microtasks ran
 *
 * @param promise the promise to check
 */
async function isSettled(promise: Promise<unknown>): Promise<boolean> {
    let settled = false;
    promise.then(
        () => (settled = true),
        () => (settled = true),
    );
    await new Promise(resolve => setImmediate(resolve));
    return settled;
}

describe('FenceGate', () => {
    it('lets commands through while it was never closed', async () => {
        const gate = new FenceGate(() => Promise.resolve(true));

        assert.equal(await isSettled(gate.passed()), true);
    });

    it('holds commands from the lost connection until the fence passes', async () => {
        let pass!: (value: boolean) => void;
        const gate = new FenceGate(() => new Promise(resolve => (pass = resolve)));

        gate.close();
        const held = gate.passed();
        const check = gate.check();
        assert.equal(await isSettled(held), false);

        pass(true);
        assert.equal(await check, true);
        assert.equal(await isSettled(held), true);
        assert.equal(await isSettled(gate.passed()), true);
    });

    it('keeps everything held if the fence fails', async () => {
        const gate = new FenceGate(() => Promise.resolve(false));

        gate.close();
        const held = gate.passed();

        assert.equal(await gate.check(), false);
        assert.equal(await isSettled(held), false);
    });

    it('keeps everything held if the fence throws', async () => {
        const gate = new FenceGate(() => Promise.reject(new Error('timeout')));

        assert.equal(await gate.check(), false);
        assert.equal(await isSettled(gate.passed()), false);
    });

    it('runs one fence for sockets which reconnect at the same time', async () => {
        let calls = 0;
        const gate = new FenceGate(() => {
            calls++;
            return Promise.resolve(true);
        });

        const results = await Promise.all([gate.check(), gate.check(), gate.check()]);

        assert.deepEqual(results, [true, true, true]);
        assert.equal(calls, 1);
    });
});
