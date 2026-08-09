import assert from 'node:assert/strict';
import sinon from 'sinon';
import { EXIT_CODES } from '@iobroker/js-controller-common';
import { createInstanceExitHandler } from '@/lib/controller/instances/instanceExitHandler.js';
import type { InstanceExitHandlerOptions } from '@/lib/controller/instances/instanceExitHandler.js';
import { testIdentity, testState, testStatistics } from '@/lib/controller/testing.test-utils.js';
import type { Process } from '@/lib/controller/types.js';

const INSTANCE_ID = 'system.adapter.hm-rpc.0' as ioBroker.ObjectIDs.Instance;

/**
 * Build the instance object the exit handler was created for
 */
function instanceObject(): ioBroker.InstanceObject {
    return {
        _id: INSTANCE_ID,
        type: 'instance',
        common: { name: 'hm-rpc', host: 'testhost', enabled: true, mode: 'daemon' },
        native: {},
        instanceObjects: [],
        objects: [],
    } as unknown as ioBroker.InstanceObject;
}

/**
 * Build the fake instance manager the exit handler works on
 *
 * @param procs The known processes of this host
 */
function fakeInstances(procs: Record<string, Partial<Process>> = {}): any {
    return {
        procs,
        compactProcs: {},
        stopTimeouts: {} as Record<string, any>,
        allInstancesStopped: false,
        setInstanceOfflineStates: sinon.stub().resolves(),
        cleanAutoSubscribes: sinon.stub().resolves(),
        storePids: sinon.stub(),
        startInstance: sinon.stub().resolves(),
    };
}

/**
 * Build the options of an exit handler
 *
 * @param over The parts this test wants to control
 */
function exitOptions(over: Partial<InstanceExitHandlerOptions> = {}): InstanceExitHandlerOptions {
    return {
        states: {} as any,
        notificationHandler: {} as any,
        statistics: testStatistics(),
        state: testState(),
        requestRebuild: () => {},
        instances: fakeInstances(),
        ...testIdentity(),
        ...over,
    };
}

/**
 * Run the exit handler and wait until its asynchronous body has settled
 *
 * The handler itself is a synchronous fire-and-forget callback for `process.on('exit')`.
 *
 * @param options Everything needed to build and invoke the handler
 * @param options.ctx Parts of the controller context this test wants to control
 * @param options.instances The fake instance manager the handler works on
 * @param options.mode The mode the instance had been started with
 * @param options.wakeUp If the instance had only been started to be woken up
 * @param options.code The exit code of the instance process
 * @param options.signal The signal which terminated the instance process
 */
async function runExit(options: {
    ctx?: Partial<InstanceExitHandlerOptions>;
    instances: any;
    mode?: string;
    wakeUp?: boolean;
    code: number;
    signal?: string | null;
}): Promise<void> {
    const { instances, mode = 'daemon', wakeUp = false, code, signal = null } = options;
    const handler = createInstanceExitHandler(exitOptions({ instances, ...options.ctx }), {
        id: INSTANCE_ID,
        instance: instanceObject(),
        mode,
        wakeUp,
    });

    handler(code, signal as string);

    // the handler awaits a few promises internally before it is done
    for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setImmediate(resolve));
    }
}

describe('createInstanceExitHandler cleanup', () => {
    it('marks the instance as offline and cleans its auto subscribes', async () => {
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instanceObject() } });

        await runExit({ instances, code: 0 });

        assert.equal(instances.setInstanceOfflineStates.calledOnce, true);
        assert.equal(instances.setInstanceOfflineStates.firstCall.args[0], INSTANCE_ID);
        assert.equal(instances.cleanAutoSubscribes.calledOnce, true);
        assert.equal(instances.storePids.called, true);
    });

    it('resolves a pending stop request and clears its kill timer', async () => {
        const resolve = sinon.stub();
        const timeout = setTimeout(() => {}, 60_000);
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instanceObject() } });
        instances.stopTimeouts[INSTANCE_ID] = { timeout, resolve };

        await runExit({ instances, code: 0 });

        assert.equal(instances.stopTimeouts[INSTANCE_ID].timeout, null);
        assert.equal(resolve.calledOnce, true);
        assert.equal(instances.stopTimeouts[INSTANCE_ID].resolve, null);
    });

    it('resets the log redirection of a log transporter instance', async () => {
        const instance = instanceObject();
        instance.common.logTransporter = true;
        const setState = sinon.stub().resolves();
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instance } });
        const statistics = testStatistics();
        const options = exitOptions({ instances, states: { setState } as any, statistics });
        const handler = createInstanceExitHandler(options, {
            id: INSTANCE_ID,
            instance,
            mode: 'daemon',
            wakeUp: false,
        });

        handler(0, null as unknown as string);
        for (let i = 0; i < 5; i++) {
            await new Promise(resolve => setImmediate(resolve));
        }

        assert.equal(setState.calledOnce, true);
        assert.equal(setState.firstCall.args[0], `${INSTANCE_ID}.logging`);
        assert.equal(setState.firstCall.args[1].val, false);
        assert.equal(statistics.outputCount, 1);
    });
});

describe('createInstanceExitHandler restart behaviour', () => {
    it('restarts an enabled instance after a normal exit', async () => {
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instanceObject() } });

        await runExit({ instances, code: 0 });

        const proc = instances.procs[INSTANCE_ID];
        assert.ok(proc.restartTimer, 'a restart should have been scheduled');
        clearTimeout(proc.restartTimer);
    });

    it('does not restart an instance which is being stopped', async () => {
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instanceObject(), stopping: true } });

        await runExit({ instances, code: 0 });

        assert.equal(instances.procs[INSTANCE_ID].restartTimer, undefined);
        // the stopping marker has been consumed
        assert.equal(instances.procs[INSTANCE_ID].stopping, undefined);
    });

    it('does not restart an instance which was started only once', async () => {
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instanceObject() } });

        await runExit({ instances, mode: 'once', code: 0 });

        assert.equal(instances.procs[INSTANCE_ID].restartTimer, undefined);
    });

    it('does not restart a disabled instance', async () => {
        const instance = instanceObject();
        instance.common.enabled = false;
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instance } });

        await runExit({ instances, code: 0 });

        assert.equal(instances.procs[INSTANCE_ID].restartTimer, undefined);
    });

    it('does not restart when the instance asked to be terminated', async () => {
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instanceObject() } });

        await runExit({ instances, code: EXIT_CODES.ADAPTER_REQUESTED_TERMINATION });

        assert.equal(instances.procs[INSTANCE_ID].restartTimer, undefined);
    });

    it('reports that all instances are stopped once the last one exited', async () => {
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instanceObject(), stopping: true } });

        await runExit({ instances, ctx: { state: testState({ stopping: true }) }, code: 0 });

        assert.equal(instances.allInstancesStopped, true);
    });
});

describe('createInstanceExitHandler crash loop detection', () => {
    it('counts an uncaught exception as a crash', async () => {
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instanceObject() } });

        await runExit({ instances, code: EXIT_CODES.UNCAUGHT_EXCEPTION });

        const proc = instances.procs[INSTANCE_ID];
        assert.equal(proc.crashCount, 1);
        assert.ok(proc.restartTimer, 'the first crash is still restarted');
        clearTimeout(proc.restartTimer);
        clearTimeout(proc.crashResetTimer);
    });

    it('stops restarting and notifies after too many crashes in a row', async () => {
        const addMessage = sinon.stub().resolves();
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instanceObject(), crashCount: 2 } });

        await runExit({
            instances,
            ctx: { notificationHandler: { addMessage } as any },
            code: EXIT_CODES.UNCAUGHT_EXCEPTION,
        });

        const proc = instances.procs[INSTANCE_ID];
        assert.equal(proc.restartTimer, undefined);
        assert.equal(addMessage.calledOnce, true);
        assert.equal(addMessage.firstCall.args[0].category, 'restartLoop');
        assert.equal(addMessage.firstCall.args[0].instance, INSTANCE_ID);
        // the counter is reset, so the instance can be started again by hand
        assert.equal(proc.crashCount, 0);
    });

    it('resets the crash counter after a clean exit', async () => {
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instanceObject(), crashCount: 2 } });

        await runExit({ instances, code: 0 });

        const proc = instances.procs[INSTANCE_ID];
        assert.equal(proc.crashCount, 0);
        clearTimeout(proc.restartTimer);
    });
});

describe('createInstanceExitHandler rebuild requests', () => {
    it('requests the rebuild of the adapter', async () => {
        const requestRebuild = sinon.stub();
        const instances = fakeInstances({ [INSTANCE_ID]: { config: instanceObject(), needsRebuild: true } });

        await runExit({ instances, ctx: { requestRebuild }, code: 0 });

        assert.equal(requestRebuild.calledOnce, true);
        assert.equal(requestRebuild.firstCall.args[0].command, 'rebuildAdapter');
        assert.equal(requestRebuild.firstCall.args[0].message.id, INSTANCE_ID);
        // no restart, the rebuild takes care of that
        assert.equal(instances.procs[INSTANCE_ID].restartTimer, undefined);
    });

    it('passes the collected rebuild arguments along', async () => {
        const requestRebuild = sinon.stub();
        const rebuildArgs = { module: 'serialport', path: '/opt', version: '1.0.0' };
        const instances = fakeInstances({
            [INSTANCE_ID]: { config: instanceObject(), needsRebuild: true, rebuildArgs },
        });

        await runExit({ instances, ctx: { requestRebuild }, code: 0 });

        assert.deepEqual(requestRebuild.firstCall.args[0].message.rebuildArgs, rebuildArgs);
    });

    it('gives up after too many rebuild attempts', async () => {
        const requestRebuild = sinon.stub();
        const instances = fakeInstances({
            [INSTANCE_ID]: { config: instanceObject(), needsRebuild: true, rebuildCounter: 3 },
        });

        await runExit({ instances, ctx: { requestRebuild }, code: 0 });

        assert.equal(requestRebuild.called, false);
    });
});
