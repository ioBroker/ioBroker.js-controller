import assert from 'node:assert/strict';
import sinon from 'sinon';
import { InstallQueue } from '@/lib/controller/instances/installQueue.js';
import { createTestContext } from '@/lib/controller/context.test-utils.js';
import type { Process } from '@/lib/controller/types.js';

/**
 * Build the `instances` part of the context which the queue reads
 *
 * @param procs The process entries the queue is allowed to see
 */
function fakeInstances(procs: Record<string, Partial<Process>> = {}): any {
    return { procs, startInstance: sinon.stub().resolves() };
}

/**
 * Let a `setImmediate` scheduled continuation of the queue run
 */
async function flush(): Promise<void> {
    return new Promise(resolve => setImmediate(resolve));
}

describe('InstallQueue.has / find', () => {
    it('reports an empty queue', () => {
        const queue = new InstallQueue(createTestContext({ instances: fakeInstances() }));

        assert.equal(queue.has('system.adapter.hm-rpc.0'), false);
        assert.equal(queue.find('system.adapter.hm-rpc.0'), undefined);
    });

    it('finds a queued entry and returns it unchanged', async () => {
        // a compact group controller parks non-rebuild tasks instead of installing them itself,
        // so the queue can be inspected without ever spawning npm
        const ctx = createTestContext({ isCompactGroupController: true, instances: fakeInstances() });
        const queue = new InstallQueue(ctx);
        const entry = { id: 'system.adapter.hm-rpc.0' as ioBroker.ObjectIDs.Instance, version: '1.2.3' };

        queue.push(entry);

        assert.equal(queue.has('system.adapter.hm-rpc.0'), true);
        assert.equal(queue.find('system.adapter.hm-rpc.0'), entry);
        assert.equal(queue.find('system.adapter.other.0'), undefined);

        await flush();
    });
});

describe('InstallQueue.push', () => {
    it('lets the main controller do the installation for a compact group controller', async () => {
        const info = sinon.stub();
        const logger = { silly() {}, debug() {}, info, warn() {}, error() {} } as any;
        const instances = fakeInstances();
        const ctx = createTestContext({ isCompactGroupController: true, instances, logger });
        const queue = new InstallQueue(ctx);

        queue.push({ id: 'system.adapter.hm-rpc.0' });
        await flush();

        assert.equal(info.calledOnce, true);
        assert.match(info.firstCall.args[0], /will be handled by main controller/);
        // the task has been dropped again, nothing was installed here
        assert.equal(queue.has('system.adapter.hm-rpc.0'), false);
        assert.equal(instances.startInstance.called, false);
    });

    it('works without a database connection while the task is only parked', async () => {
        // no states/objects in the context - the queue must not touch them on this path
        const ctx = createTestContext({ isCompactGroupController: true, instances: fakeInstances() });
        const queue = new InstallQueue(ctx);

        assert.doesNotThrow(() => queue.push({ id: 'system.adapter.hm-rpc.0' }));

        await flush();
    });

    it('processes the queue one entry after another', async () => {
        const ctx = createTestContext({ isCompactGroupController: true, instances: fakeInstances() });
        const queue = new InstallQueue(ctx);

        queue.push({ id: 'system.adapter.a.0' });
        queue.push({ id: 'system.adapter.b.0' });

        // both are queued, only the first one is being processed
        assert.equal(queue.has('system.adapter.a.0'), true);
        assert.equal(queue.has('system.adapter.b.0'), true);

        await flush();
        await flush();

        assert.equal(queue.has('system.adapter.a.0'), false);
        assert.equal(queue.has('system.adapter.b.0'), false);
    });

    it('gives up on an adapter which could not be installed often enough', () => {
        const clock = sinon.useFakeTimers();
        try {
            const error = sinon.stub();
            const logger = { silly() {}, debug() {}, info() {}, warn() {}, error } as any;
            const instances = fakeInstances({ 'system.adapter.hm-rpc.0': { downloadRetry: 4 } });
            const ctx = createTestContext({ instances, logger });
            const queue = new InstallQueue(ctx);

            queue.push({ id: 'system.adapter.hm-rpc.0' });

            assert.equal(error.calledOnce, true);
            assert.match(error.firstCall.args[0], /Cannot download and install adapter/);

            // the entry is dropped after the retry pause, so the queue does not block
            clock.tick(500);
            assert.equal(queue.has('system.adapter.hm-rpc.0'), false);
            assert.equal(instances.startInstance.called, false);
        } finally {
            clock.restore();
        }
    });

    it('reports a failed rebuild with the rebuild specific hint', () => {
        const clock = sinon.useFakeTimers();
        try {
            const error = sinon.stub();
            const logger = { silly() {}, debug() {}, info() {}, warn() {}, error } as any;
            const instances = fakeInstances({ 'system.adapter.hm-rpc.0': { downloadRetry: 4 } });
            const queue = new InstallQueue(createTestContext({ instances, logger }));

            queue.push({ id: 'system.adapter.hm-rpc.0', rebuild: true });

            assert.match(error.firstCall.args[0], /Cannot rebuild adapter/);
        } finally {
            clock.restore();
        }
    });
});
