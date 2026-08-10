import assert from 'node:assert/strict';
import sinon from 'sinon';
import { handleStateChange } from '@/lib/controller/db/stateChangeRouter.js';
import type { StateChangeRouterDeps } from '@/lib/controller/db/stateChangeRouter.js';
import { silentLogger, testConfig, testIdentity, testStatistics } from '@/lib/controller/testing.test-utils.js';
import type { IoPackageFile } from '@iobroker/plugin-base';

/**
 * A states client that accepts every write, enough to look "connected"
 *
 * @param over Additional or replacing methods this test needs
 */
function connectedStates(over: Record<string, any> = {}): Record<string, any> {
    return { setState: sinon.stub().resolves(), ...over };
}

/**
 * An objects client that accepts every write, enough to look "connected"
 *
 * @param over Additional or replacing methods this test needs
 */
function connectedObjects(over: Record<string, any> = {}): Record<string, any> {
    return { setObject: sinon.stub().resolves(), ...over };
}

/**
 * Build a context which reports both databases as connected
 *
 * An empty instance manager is part of the default, because the wake-up check sits in front of the
 * remaining branches of the routing chain and is therefore reached by every unrelated state change.
 *
 * @param over Parts of the context this test wants to control
 */
function connectedContext(over: Partial<StateChangeRouterDeps> = {}): StateChangeRouterDeps {
    return {
        states: connectedStates() as any,
        objects: connectedObjects() as any,
        config: testConfig(),
        controllerDir: '/opt/iobroker',
        ioPackage: { common: {} as ioBroker.AdapterCommon } as IoPackageFile,
        isCompactGroupController: false,
        instances: { subscribe: {}, procs: {}, startInstance: sinon.stub().resolves() } as any,
        messages: {} as any,
        messageHandler: {} as any,
        status: {} as any,
        pluginHandler: {} as any,
        statistics: testStatistics(),
        logRedirect: () => {},
        ...testIdentity(),
        ...over,
    };
}

describe('handleStateChange connection handling', () => {
    it('counts every change it receives', async () => {
        const ctx = connectedContext();

        await handleStateChange(ctx, 'some.unhandled.state', { val: 1, ack: true } as ioBroker.State);

        assert.equal(ctx.statistics.inputCount, 1);
    });

    it('complains about a change without an id', async () => {
        const error = sinon.stub();
        const logger = silentLogger({ error });
        const ctx = connectedContext({ logger });

        await handleStateChange(ctx, '', { val: 1, ack: true } as ioBroker.State);

        assert.equal(error.calledOnce, true);
        assert.match(error.firstCall.args[0], /change event with no ID/);
    });
});

describe('handleStateChange log redirection', () => {
    it('enables the log redirection of an instance', async () => {
        const logRedirect = sinon.stub();
        const ctx = connectedContext({ logRedirect });

        await handleStateChange(ctx, 'system.adapter.admin.0.logging', { val: true, ack: true } as ioBroker.State);

        assert.deepEqual(logRedirect.firstCall.args, [
            true,
            'system.adapter.admin.0',
            'system.adapter.admin.0.logging',
        ]);
    });

    it('disables the redirection when the state has been deleted', async () => {
        const logRedirect = sinon.stub();
        const ctx = connectedContext({ logRedirect });

        await handleStateChange(ctx, 'system.adapter.admin.0.logging', null);

        assert.equal(logRedirect.firstCall.args[0], false);
    });
});

describe('handleStateChange host messagebox', () => {
    const messageId = 'messagebox.system.host.testhost';
    const message = { command: 'getVersion', message: null, from: 'system.adapter.admin.0' } as ioBroker.Message;

    it('lets the message handler process a new request', async () => {
        const process = sinon.stub().resolves();
        const handleResponse = sinon.stub().returns(false);
        const ctx = connectedContext({ messages: { handleResponse } as any, messageHandler: { process } as any });

        await handleStateChange(ctx, messageId, message);

        assert.equal(handleResponse.calledOnce, true);
        assert.equal(process.calledOnce, true);
        assert.equal(process.firstCall.args[0], message);
    });

    it('does not process a message which was the answer to our own request', async () => {
        const process = sinon.stub().resolves();
        const handleResponse = sinon.stub().returns(true);
        const ctx = connectedContext({ messages: { handleResponse } as any, messageHandler: { process } as any });

        await handleStateChange(ctx, messageId, message);

        assert.equal(process.called, false);
    });

    it('leaves the host messages to the main controller when running as compact group', async () => {
        const process = sinon.stub().resolves();
        const handleResponse = sinon.stub().returns(false);
        const ctx = connectedContext({
            isCompactGroupController: true,
            messages: { handleResponse } as any,
            messageHandler: { process } as any,
        });

        await handleStateChange(ctx, messageId, message);

        assert.equal(handleResponse.called, false);
        assert.equal(process.called, false);
    });
});

describe('handleStateChange alive state', () => {
    const aliveId = 'system.adapter.hm-rpc.0.alive';

    it('enables an instance which was switched on via its alive state', async () => {
        const getObject = sinon.stub().resolves({ _id: 'system.adapter.hm-rpc.0', common: { enabled: false } });
        const setObject = sinon.stub().resolves();
        const ctx = connectedContext({ objects: connectedObjects({ getObject, setObject }) as any });

        await handleStateChange(ctx, aliveId, { val: true, ack: false } as ioBroker.State);

        assert.equal(getObject.firstCall.args[0], 'system.adapter.hm-rpc.0');
        assert.equal(setObject.calledOnce, true);
        assert.equal(setObject.firstCall.args[1].common.enabled, true);
        assert.equal(setObject.firstCall.args[1].from, 'system.host.testhost');
    });

    it('ignores an acknowledged alive state, that is just the instance reporting itself', async () => {
        const getObject = sinon.stub().resolves({ _id: 'system.adapter.hm-rpc.0', common: { enabled: false } });
        const setObject = sinon.stub().resolves();
        const ctx = connectedContext({ objects: connectedObjects({ getObject, setObject }) as any });

        await handleStateChange(ctx, aliveId, { val: true, ack: true } as ioBroker.State);

        assert.equal(getObject.called, false);
        assert.equal(setObject.called, false);
    });

    it('does not write the object when the enabled flag already matches', async () => {
        const getObject = sinon.stub().resolves({ _id: 'system.adapter.hm-rpc.0', common: { enabled: true } });
        const setObject = sinon.stub().resolves();
        const ctx = connectedContext({ objects: connectedObjects({ getObject, setObject }) as any });

        await handleStateChange(ctx, aliveId, { val: true, ack: false } as ioBroker.State);

        assert.equal(setObject.called, false);
    });
});

describe('handleStateChange instance wake up', () => {
    it('starts the instances which are subscribed to the changed state', async () => {
        const startInstance = sinon.stub().resolves();
        const instances = {
            subscribe: { 'some.trigger.state': ['system.adapter.hm-rpc.0'] },
            procs: { 'system.adapter.hm-rpc.0': {} },
            startInstance,
        } as any;
        const ctx = connectedContext({ instances });

        await handleStateChange(ctx, 'some.trigger.state', { val: 1, ack: true } as ioBroker.State);

        assert.equal(startInstance.calledOnce, true);
        assert.deepEqual(startInstance.firstCall.args, ['system.adapter.hm-rpc.0', true]);
    });

    it('warns when a subscribed instance does not exist anymore', async () => {
        const warn = sinon.stub();
        const logger = silentLogger({ warn });
        const startInstance = sinon.stub().resolves();
        const instances = {
            subscribe: { 'some.trigger.state': ['system.adapter.gone.0'] },
            procs: {},
            startInstance,
        } as any;
        const ctx = connectedContext({ instances, logger });

        await handleStateChange(ctx, 'some.trigger.state', { val: 1, ack: true } as ioBroker.State);

        assert.equal(startInstance.called, false);
        assert.equal(warn.calledOnce, true);
    });
});

describe('handleStateChange log level', () => {
    const logLevelId = 'system.host.testhost.logLevel';

    it('applies a new log level and acknowledges it', async () => {
        const setState = sinon.stub().resolves();
        const ctx = connectedContext({ states: connectedStates({ setState }) as any });

        await handleStateChange(ctx, logLevelId, { val: 'debug', ack: false } as ioBroker.State);

        assert.equal(ctx.config.log.level, 'debug');
        assert.equal(setState.calledOnce, true);
        assert.deepEqual(setState.firstCall.args[1], {
            val: 'debug',
            ack: true,
            from: 'system.host.testhost',
        });
    });

    it('keeps the current level when an invalid one is requested', async () => {
        const setState = sinon.stub().resolves();
        const ctx = connectedContext({ states: connectedStates({ setState }) as any });

        await handleStateChange(ctx, logLevelId, { val: 'verbose', ack: false } as ioBroker.State);

        assert.equal(ctx.config.log.level, 'info');
        assert.equal(setState.firstCall.args[1].val, 'info');
    });

    it('ignores its own acknowledged write', async () => {
        const setState = sinon.stub().resolves();
        const ctx = connectedContext({ states: connectedStates({ setState }) as any });

        await handleStateChange(ctx, logLevelId, { val: 'debug', ack: true } as ioBroker.State);

        assert.equal(setState.called, false);
        assert.equal(ctx.config.log.level, 'info');
    });
});

describe('handleStateChange disk warning', () => {
    const diskWarningId = 'system.host.testhost.diskWarning';

    it('hands the new warning level to the status reporter and acknowledges it', async () => {
        const setDiskWarningLevel = sinon.stub();
        const setState = sinon.stub().resolves();
        const ctx = connectedContext({
            states: connectedStates({ setState }) as any,
            status: { setDiskWarningLevel } as any,
        });

        await handleStateChange(ctx, diskWarningId, { val: 12, ack: false } as ioBroker.State);

        assert.equal(setDiskWarningLevel.calledOnce, true);
        assert.equal(setDiskWarningLevel.firstCall.args[0], 12);
        assert.deepEqual(setState.firstCall.args, [diskWarningId, { val: 12, ack: true }]);
    });

    it('ignores its own acknowledged write', async () => {
        const setDiskWarningLevel = sinon.stub();
        const ctx = connectedContext({ status: { setDiskWarningLevel } as any });

        await handleStateChange(ctx, diskWarningId, { val: 12, ack: true } as ioBroker.State);

        assert.equal(setDiskWarningLevel.called, false);
    });
});
