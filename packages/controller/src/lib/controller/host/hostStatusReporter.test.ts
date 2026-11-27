import assert from 'node:assert/strict';
import sinon from 'sinon';
import { HostStatusReporter } from '@/lib/controller/host/hostStatusReporter.js';
import { testConfig, testIdentity, testState, testStatistics } from '@/lib/controller/testing.test-utils.js';

const ALIVE = 'system.host.testhost.alive';

/**
 * A states client which keeps the written states in memory
 */
function fakeStates(): { store: Map<string, ioBroker.State>; client: any } {
    const store = new Map<string, ioBroker.State>();
    const client = {
        getState: sinon.stub().callsFake((id: string) => Promise.resolve(store.get(id) ?? null)),
        setState: sinon.stub().callsFake((id: string, state: ioBroker.State) => {
            store.set(id, state);
            return Promise.resolve();
        }),
    };
    return { store, client };
}

/**
 * Create a reporter on the fake states
 *
 * @param client the states client
 * @param aliveExpired called if the own alive expired
 */
function createReporter(client: any, aliveExpired: () => void): HostStatusReporter {
    const config = testConfig();
    config.system.checkDiskInterval = 0;
    return new HostStatusReporter({
        states: client,
        config,
        isCompactGroupController: false,
        compactGroup: null,
        notificationHandler: {} as any,
        instances: { procs: {}, compactProcs: {} } as any,
        statistics: testStatistics(),
        state: testState(),
        logWriteErrors: () => {},
        stopController: async () => {},
        aliveExpired,
        ...testIdentity(),
    });
}

/** Let the alive write settle */
const settle = (): Promise<void> => new Promise(resolve => setImmediate(resolve));

describe('lib/controller/host/hostStatusReporter', function () {
    // reportStatus() reads pidusage, whose first call on Windows starts wmic/PowerShell and takes a few seconds
    this.timeout(10_000);

    it('does not check the alive on the first renewal', async () => {
        const { client } = fakeStates();
        const expired = sinon.spy();
        const reporter = createReporter(client, expired);

        await reporter.reportStatus();

        assert.equal(client.getState.withArgs(ALIVE).callCount, 0);
        assert.equal(expired.callCount, 0);
    });

    it('does nothing while the own alive is the last write', async () => {
        const { client } = fakeStates();
        const expired = sinon.spy();
        const reporter = createReporter(client, expired);

        await reporter.reportStatus();
        await settle();
        await reporter.reportStatus();

        assert.equal(client.getState.withArgs(ALIVE).callCount, 1);
        assert.equal(expired.callCount, 0);
    });

    it('reports an expired alive once, after renewing it', async () => {
        const { store, client } = fakeStates();
        const expired = sinon.spy(() =>
            assert.equal(client.setState.withArgs(ALIVE).callCount, 2, 'renewed before the recheck'),
        );
        const reporter = createReporter(client, expired);

        await reporter.reportStatus();
        await settle();
        store.delete(ALIVE);
        await reporter.reportStatus();
        await settle();
        await reporter.reportStatus();

        assert.equal(expired.callCount, 1);
    });

    it('does not check after a failed write or when told to skip', async () => {
        const { store, client } = fakeStates();
        const expired = sinon.spy();
        const reporter = createReporter(client, expired);

        client.setState.withArgs(ALIVE).onFirstCall().rejects(new Error('no connection'));
        await reporter.reportStatus();
        await settle();
        await reporter.reportStatus();
        await settle();

        reporter.skipAliveCheck();
        store.delete(ALIVE);
        await reporter.reportStatus();

        assert.equal(client.getState.withArgs(ALIVE).callCount, 0);
        assert.equal(expired.callCount, 0);
    });
});
