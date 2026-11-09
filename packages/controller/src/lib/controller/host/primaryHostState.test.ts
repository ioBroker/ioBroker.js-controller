import assert from 'node:assert/strict';
import sinon from 'sinon';
import { PrimaryHostState } from '@/lib/controller/host/primaryHostState.js';

/**
 * A states client which only records `setState`
 */
function fakeStates(): any {
    return { setState: sinon.stub().resolves() };
}

describe('lib/controller/host/primaryHostState', () => {
    it('writes true with an expiry equal to the lock time on every call', async () => {
        const states = fakeStates();
        const primary = new PrimaryHostState('system.host.iob-a', 60_000);

        await primary.publish(states, true);
        await primary.publish(states, true);

        assert.equal(states.setState.callCount, 2);
        assert.deepEqual(states.setState.firstCall.args, [
            'system.host.iob-a.isPrimary',
            { val: true, ack: true, from: 'system.host.iob-a', expire: 60 },
        ]);
    });

    it('writes false without expiry, and only when it changes', async () => {
        const states = fakeStates();
        const primary = new PrimaryHostState('system.host.iob-a', 60_000);

        await primary.publish(states, false);
        await primary.publish(states, false);
        await primary.publish(states, true);
        await primary.publish(states, false);

        assert.equal(states.setState.callCount, 3);
        assert.deepEqual(states.setState.firstCall.args[1], { val: false, ack: true, from: 'system.host.iob-a' });
        assert.deepEqual(states.setState.thirdCall.args[1], { val: false, ack: true, from: 'system.host.iob-a' });
    });

    it('writes false again if the previous write failed', async () => {
        const states = fakeStates();
        states.setState.onFirstCall().rejects(new Error('no connection'));
        const primary = new PrimaryHostState('system.host.iob-a', 60_000);

        await assert.rejects(primary.publish(states, false));
        await primary.publish(states, false);

        assert.equal(states.setState.callCount, 2);
    });
});
