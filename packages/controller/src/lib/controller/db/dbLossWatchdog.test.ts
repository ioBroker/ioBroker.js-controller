import assert from 'node:assert/strict';
import sinon from 'sinon';
import { DbLossWatchdog } from '@/lib/controller/db/dbLossWatchdog.js';

describe('lib/controller/db/dbLossWatchdog', () => {
    let clock: sinon.SinonFakeTimers;

    beforeEach(() => {
        clock = sinon.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'performance'] });
    });

    afterEach(() => clock.restore());

    it('stays quiet while every database answers', async () => {
        const onLoss = sinon.spy();
        const probe = sinon.stub().resolves();
        const watchdog = new DbLossWatchdog({ timeoutMs: 5_000, probes: [probe, probe], onLoss });

        watchdog.start();
        await clock.tickAsync(20_000);
        watchdog.stop();

        assert.equal(onLoss.callCount, 0);
        assert.equal(probe.callCount, 40);
    });

    it('reports a database without answer once, after the timeout, without piling up probes', async () => {
        const onLoss = sinon.spy();
        const answering = sinon.stub().resolves();
        const silent = sinon.stub().returns(new Promise(() => {}));
        const watchdog = new DbLossWatchdog({ timeoutMs: 5_000, probes: [answering, silent], onLoss });

        watchdog.start();
        await clock.tickAsync(4_000);
        assert.equal(onLoss.callCount, 0);
        await clock.tickAsync(1_000);
        assert.equal(onLoss.callCount, 1);
        assert.ok(onLoss.firstCall.args[0] >= 5_000);
        await clock.tickAsync(10_000);

        assert.equal(onLoss.callCount, 1);
        assert.equal(silent.callCount, 1);
    });

    it('counts an error as no answer', async () => {
        const onLoss = sinon.spy();
        const watchdog = new DbLossWatchdog({
            timeoutMs: 3_000,
            probes: [sinon.stub().rejects(new Error('Connection is closed.'))],
            onLoss,
        });

        watchdog.start();
        await clock.tickAsync(3_000);

        assert.equal(onLoss.callCount, 1);
    });

    it('does not count a stall of this process as a lost database', async () => {
        const onLoss = sinon.spy();
        const watchdog = new DbLossWatchdog({ timeoutMs: 5_000, probes: [sinon.stub().resolves()], onLoss });

        watchdog.start();
        await clock.tickAsync(1_000);
        // the timers of a frozen process fire late, all at once
        clock.jump(60_000);
        await clock.tickAsync(2_000);
        watchdog.stop();

        assert.equal(onLoss.callCount, 0);
    });
});
