import assert from 'node:assert/strict';
import sinon from 'sinon';
import fs from 'fs-extra';
import { InstanceManager } from '@/lib/controller/instances/instanceManager.js';
import type { InstanceManagerOptions } from '@/lib/controller/instances/instanceManager.js';
import {
    silentLogger,
    testConfig,
    testIdentity,
    testState,
    testStatistics,
} from '@/lib/controller/testing.test-utils.js';

/**
 * Build an instance object as it is stored in the objects database
 *
 * @param over Parts of the instance object this test cares about
 */
function instanceObject(over: Record<string, any> = {}): ioBroker.InstanceObject {
    const { common, native, ...rest } = over;

    return {
        _id: 'system.adapter.hm-rpc.0',
        type: 'instance',
        common: { name: 'hm-rpc', host: 'testhost', enabled: true, mode: 'daemon', ...common },
        native: { ...native },
        instanceObjects: [],
        objects: [],
        ...rest,
    };
}

/**
 * Create a manager together with the options it runs on
 *
 * @param over The parts this test wants to control
 */
function createManager(over: Partial<InstanceManagerOptions> = {}): {
    manager: InstanceManager;
    options: InstanceManagerOptions;
} {
    const options: InstanceManagerOptions = {
        objects: {} as any,
        states: {} as any,
        config: testConfig(),
        ioPackage: { common: { name: 'js-controller', version: '7.0.0' } },
        isDaemon: false,
        isCompactGroupController: false,
        compactGroup: null,
        notificationHandler: {} as any,
        blocklistManager: {} as any,
        messages: {} as any,
        statistics: testStatistics(),
        state: testState(),
        logWriteErrors: () => {},
        uploadAdapter: async () => {},
        requestRebuild: () => {},
        ...testIdentity(),
        ...over,
    };

    return { manager: new InstanceManager(options), options };
}

describe('InstanceManager.checkAndAddInstance', () => {
    it('ignores an instance which belongs to another host', async () => {
        const { manager } = createManager();

        const added = await manager.checkAndAddInstance(instanceObject({ common: { host: 'otherhost' } }), [
            '192.168.0.2',
        ]);

        assert.equal(added, false);
        assert.deepEqual(Object.keys(manager.procs), []);
    });

    it('accepts an instance whose host matches one of our IP addresses', async () => {
        const { manager } = createManager();

        const added = await manager.checkAndAddInstance(instanceObject({ common: { host: '192.168.0.2' } }), [
            '192.168.0.2',
        ]);

        assert.equal(added, true);
    });

    it('ignores an instance which has been marked as deleted', async () => {
        const { manager } = createManager();

        const added = await manager.checkAndAddInstance(instanceObject({ deleted: true }), []);

        assert.equal(added, false);
        assert.deepEqual(Object.keys(manager.procs), []);
    });

    it('claims an instance without a host and writes the host name back', async () => {
        const setObject = sinon.stub().resolves();
        const { manager } = createManager({ objects: { setObject } as any });
        const instance = instanceObject({ common: { host: '' } });

        const added = await manager.checkAndAddInstance(instance, []);

        assert.equal(added, true);
        assert.equal(instance.common.host, 'testhost');
        assert.equal(setObject.calledOnce, true);
        assert.equal(setObject.firstCall.args[0], 'system.adapter.hm-rpc.0');
    });

    it('still claims the instance when the host name could not be written', async () => {
        const setObject = sinon.stub().rejects(new Error('db down'));
        const error = sinon.stub();
        const logger = silentLogger({ error });
        const { manager } = createManager({ objects: { setObject } as any, logger });

        const added = await manager.checkAndAddInstance(instanceObject({ common: { host: '' } }), []);

        assert.equal(added, true);
        assert.equal(error.calledOnce, true);
        assert.match(error.firstCall.args[0], /Cannot update hostname/);
    });

    it('stores a copy of the instance config, not the object itself', async () => {
        const { manager } = createManager();
        const instance = instanceObject();

        await manager.checkAndAddInstance(instance, []);

        const stored = manager.procs['system.adapter.hm-rpc.0'].config;
        assert.deepEqual(stored, instance);
        assert.notEqual(stored, instance);
    });

    it('keeps an already known config when the instance is checked again', async () => {
        const { manager } = createManager();

        await manager.checkAndAddInstance(instanceObject({ common: { loglevel: 'debug' } }), []);
        const firstConfig = manager.procs['system.adapter.hm-rpc.0'].config;

        await manager.checkAndAddInstance(instanceObject({ common: { loglevel: 'info' } }), []);

        assert.equal(manager.procs['system.adapter.hm-rpc.0'].config, firstConfig);
        assert.equal(firstConfig.common.loglevel, 'debug');
    });
});

describe('InstanceManager.checkAndAddInstance in compact mode', () => {
    /** iobroker.json with compact mode switched on */
    const compactConfig = {
        system: { compact: true, statisticsInterval: 15_000, checkDiskInterval: 0 },
        objects: { type: 'jsonl' },
        states: { type: 'jsonl' },
        log: { level: 'info', transport: {} },
    } as unknown as ioBroker.IoBrokerJson;

    it('applies the compact defaults of an instance which supports it', async () => {
        const { manager } = createManager({ config: compactConfig });
        const instance = instanceObject({ common: { compact: true } });

        await manager.checkAndAddInstance(instance, []);

        assert.equal(instance.common.runAsCompactMode, false);
        assert.equal(instance.common.compactGroup, 1);
    });

    it('registers the compact group of an instance which runs in compact mode', async () => {
        const { manager } = createManager({ config: compactConfig });

        await manager.checkAndAddInstance(
            instanceObject({ common: { compact: true, runAsCompactMode: true, compactGroup: 2 } }),
            [],
        );

        assert.deepEqual(manager.compactProcs[2].instances, []);
    });

    it('a compact group controller ignores instances of another group', async () => {
        const { manager } = createManager({
            config: compactConfig,
            isCompactGroupController: true,
            compactGroup: 1,
        });

        const added = await manager.checkAndAddInstance(
            instanceObject({ common: { compact: true, runAsCompactMode: true, compactGroup: 2 } }),
            [],
        );

        assert.equal(added, false);
    });

    it('a compact group controller takes the instances of its own group', async () => {
        const { manager } = createManager({
            config: compactConfig,
            isCompactGroupController: true,
            compactGroup: 2,
        });

        const added = await manager.checkAndAddInstance(
            instanceObject({ common: { compact: true, runAsCompactMode: true, compactGroup: 2 } }),
            [],
        );

        assert.equal(added, true);
    });

    it('a compact group controller ignores instances which do not run in compact mode', async () => {
        const { manager } = createManager({
            config: compactConfig,
            isCompactGroupController: true,
            compactGroup: 1,
        });

        const added = await manager.checkAndAddInstance(
            instanceObject({ common: { compact: true, runAsCompactMode: false, compactGroup: 1 } }),
            [],
        );

        assert.equal(added, false);
    });
});

describe('InstanceManager.setInstanceOfflineStates', () => {
    it('resets alive and connected and counts both writes', async () => {
        const setState = sinon.stub().resolves();
        const getState = sinon.stub().resolves(null);
        const { manager, options } = createManager({ states: { setState, getState } as any });

        await manager.setInstanceOfflineStates('system.adapter.hm-rpc.0');

        assert.equal(setState.callCount, 2);
        assert.equal(setState.firstCall.args[0], 'system.adapter.hm-rpc.0.alive');
        assert.equal(setState.secondCall.args[0], 'system.adapter.hm-rpc.0.connected');
        assert.equal(options.statistics.outputCount, 2);
    });

    it('also resets the connection state of the adapter when it was connected', async () => {
        const setState = sinon.stub().resolves();
        const getState = sinon.stub().resolves({ val: true });
        const { manager, options } = createManager({ states: { setState, getState } as any });

        await manager.setInstanceOfflineStates('system.adapter.hm-rpc.0');

        assert.equal(getState.firstCall.args[0], 'hm-rpc.0.info.connection');
        assert.equal(setState.callCount, 3);
        assert.equal(setState.thirdCall.args[0], 'hm-rpc.0');
        assert.equal(options.statistics.outputCount, 3);
    });
});

describe('InstanceManager.stopInstances', () => {
    it('marks the controller as stopping', async () => {
        const { manager, options } = createManager();

        assert.equal(options.state.isStopping, null);
        await manager.stopInstances(false, 10_000);

        assert.equal(typeof options.state.isStopping, 'number');
    });

    it('keeps the timestamp of the first stop request', async () => {
        const { manager, options } = createManager();

        await manager.stopInstances(false, 10_000);
        const first = options.state.isStopping;
        await manager.stopInstances(false, 10_000);

        assert.equal(options.state.isStopping, first);
    });

    it('reports a forced shutdown when the stop timeout has already passed', async () => {
        const { manager } = createManager();

        assert.equal(await manager.stopInstances(false, 0), true);
    });

    it('considers everything stopped after a forced stop', async () => {
        const { manager } = createManager();
        manager.allInstancesStopped = false;

        assert.equal(await manager.stopInstances(true, 10_000), false);
        assert.equal(manager.allInstancesStopped, true);
    });

    it('kills the compact group controllers on a forced stop', async () => {
        const kill = sinon.stub();
        const { manager } = createManager();
        manager.compactProcs['1'] = { instances: [], process: { kill } as any } as any;

        await manager.stopInstances(true, 10_000);

        assert.equal(kill.calledOnce, true);
    });
});

describe('InstanceManager.storePids', () => {
    it('writes the pid file once, delayed', () => {
        const clock = sinon.useFakeTimers();
        const writeFileSync = sinon.stub(fs, 'writeFileSync');
        try {
            const { manager } = createManager();

            manager.storePids();
            manager.storePids(); // a second request while one is pending is ignored
            assert.equal(writeFileSync.called, false);

            clock.tick(1_000);

            assert.equal(writeFileSync.calledOnce, true);
            assert.deepEqual(JSON.parse(writeFileSync.firstCall.args[1] as string), [process.pid]);
        } finally {
            writeFileSync.restore();
            clock.restore();
        }
    });

    it('does not write the pid file after the timer has been cleared', () => {
        const clock = sinon.useFakeTimers();
        const writeFileSync = sinon.stub(fs, 'writeFileSync');
        try {
            const { manager } = createManager();

            manager.storePids();
            manager.clearStoreTimer();
            clock.tick(1_000);

            assert.equal(writeFileSync.called, false);
        } finally {
            writeFileSync.restore();
            clock.restore();
        }
    });
});

describe('InstanceManager.handleObjectChange', () => {
    it('ignores changes before the instances have been started', async () => {
        const { manager } = createManager({ state: testState({ started: false }) });

        await manager.handleObjectChange('system.adapter.hm-rpc.0', instanceObject());

        assert.deepEqual(Object.keys(manager.procs), []);
    });

    it('ignores ids which are not an instance', async () => {
        const { manager } = createManager();

        await manager.handleObjectChange('system.adapter.hm-rpc', instanceObject());
        await manager.handleObjectChange('system.host.testhost', instanceObject());

        assert.deepEqual(Object.keys(manager.procs), []);
    });

    it('takes over a newly created instance and schedules its start', async () => {
        const { manager } = createManager({
            notificationHandler: { clearNotifications: sinon.stub().resolves() } as any,
        });

        await manager.handleObjectChange('system.adapter.hm-rpc.0', instanceObject());

        const proc = manager.procs['system.adapter.hm-rpc.0'];
        assert.ok(proc, 'the instance should be known now');
        assert.ok(proc.restartTimer, 'the start of the instance should be scheduled');
        clearTimeout(proc.restartTimer);
    });

    it('drops a deleted instance and clears its notifications', async () => {
        const clearNotifications = sinon.stub().resolves();
        const { manager } = createManager({ notificationHandler: { clearNotifications } as any });

        await manager.handleObjectChange('system.adapter.hm-rpc.0', instanceObject());
        clearTimeout(manager.procs['system.adapter.hm-rpc.0'].restartTimer);

        await manager.handleObjectChange('system.adapter.hm-rpc.0', null);

        assert.equal(clearNotifications.calledOnce, true);
        assert.deepEqual(clearNotifications.firstCall.args, [null, null, 'system.adapter.hm-rpc.0']);
        assert.equal(manager.procs['system.adapter.hm-rpc.0'], undefined);
    });
});
