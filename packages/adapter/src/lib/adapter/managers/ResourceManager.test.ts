import assert from 'node:assert/strict';
import sinon from 'sinon';
import { tools } from '@iobroker/js-controller-common';
import { ResourceManager } from './ResourceManager.js';
import { MessagingManager } from './MessagingManager.js';
import type { AdapterContext } from '../context.js';

/**
 * A ResourceManager whose host commands are captured instead of sent.
 *
 * @param over Context fields to override
 * @param reply What the host is made to answer
 */
function makeManager(
    over: Partial<AdapterContext> = {},
    reply: unknown = { result: 'ok' },
): { mgr: ResourceManager; sendToHost: sinon.SinonStub } {
    const sendToHost = sinon.stub().resolves(reply);
    const mgr = new ResourceManager(makeContext(over), () => ({ sendToHost }) as any);
    return { mgr, sendToHost };
}

/**
 * A ResourceManager on the real messaging manager, so the DB-closed guard is exercised.
 *
 * @param over Context fields to override
 */
function makeRealManager(over: Partial<AdapterContext> = {}): ResourceManager {
    const ctx = makeContext(over);
    return new ResourceManager(ctx, () => new MessagingManager(ctx));
}

function makeContext(over: Partial<AdapterContext> = {}): AdapterContext {
    return {
        namespace: 'test.0',
        namespaceLog: 'test.0',
        logger: { silly() {}, debug() {}, info() {}, warn() {}, error() {} } as any,
        uiMessagingController: {} as any,
        states: null,
        objects: null,
        common: undefined,
        config: {} as ioBroker.AdapterConfig,
        host: 'localhost',
        ...over,
    };
}

describe('ResourceManager.registerUsedResource', () => {
    it('rejects with ERROR_DB_CLOSED when states is not connected', async () => {
        const mgr = makeRealManager({ states: null });
        await assert.rejects(
            () => mgr.registerUsedResource('serialPort', { port: '/dev/ttyUSB0' }),
            new RegExp(tools.ERRORS.ERROR_DB_CLOSED),
        );
    });

    it('forwards the resource to the host with the instance and waits for the verdict', async () => {
        const { mgr, sendToHost } = makeManager();

        await mgr.registerUsedResource('serialPort', { port: '/dev/ttyUSB0' });

        assert.equal(sendToHost.callCount, 1);
        const [opts] = sendToHost.firstCall.args;
        assert.equal(opts.hostName, 'localhost');
        assert.equal(opts.command, 'registerUsedResource');
        assert.equal(opts.expectReply, true, 'without a reply a refusal would go unnoticed');
        assert.ok(opts.options?.timeout, 'without a timeout there is no timer at all');
        assert.deepEqual(opts.message, {
            type: 'serialPort',
            data: { port: '/dev/ttyUSB0' },
            instance: 'test.0',
        });
    });

    it('rejects when the host refuses the registration', async () => {
        const { mgr } = makeManager({}, { error: 'instance "test.0" does not declare its used resources' });

        await assert.rejects(
            () => mgr.registerUsedResource('serialPort', { port: '/dev/ttyUSB0' }),
            /does not declare its used resources/,
        );
    });

    it('rejects when the host of this instance is unknown', async () => {
        const { mgr, sendToHost } = makeManager({ host: undefined });

        await assert.rejects(
            () => mgr.registerUsedResource('serialPort', { port: '/dev/ttyUSB0' }),
            /host of this instance is unknown/,
        );
        assert.equal(sendToHost.callCount, 0, 'must not broadcast to every host');
    });

    it('is additive: every call forwards its own resource', async () => {
        const { mgr, sendToHost } = makeManager();

        await mgr.registerUsedResource('serialPort', { port: '/dev/ttyUSB0' });
        await mgr.registerUsedResource('tcpPort', { port: 1883 });

        assert.equal(sendToHost.callCount, 2);
        assert.deepEqual(
            sendToHost.getCalls().map(call => call.args[0].message.type),
            ['serialPort', 'tcpPort'],
        );
    });
});

describe('ResourceManager.clearUsedResources', () => {
    it('rejects with ERROR_DB_CLOSED when states is not connected', async () => {
        const mgr = makeRealManager({ states: null });
        await assert.rejects(() => mgr.clearUsedResources(), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('forwards the request to the host', async () => {
        const { mgr, sendToHost } = makeManager();

        await mgr.clearUsedResources();

        const [opts] = sendToHost.firstCall.args;
        assert.equal(opts.hostName, 'localhost');
        assert.equal(opts.command, 'clearUsedResources');
        assert.deepEqual(opts.message, { instance: 'test.0' });
    });

    it('rejects when the host refuses', async () => {
        const { mgr } = makeManager({}, { error: 'No valid instance' });
        await assert.rejects(() => mgr.clearUsedResources(), /No valid instance/);
    });
});

describe('ResourceManager.freeUsedResource', () => {
    it('rejects with ERROR_DB_CLOSED when states is not connected', async () => {
        const mgr = makeRealManager({ states: null });
        await assert.rejects(() => mgr.freeUsedResource('serialPort'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('forwards a specific resource to free to the host', async () => {
        const { mgr, sendToHost } = makeManager();

        await mgr.freeUsedResource('serialPort', { port: '/dev/ttyUSB0' });

        const [opts] = sendToHost.firstCall.args;
        assert.equal(opts.hostName, 'localhost');
        assert.equal(opts.command, 'freeUsedResource');
        assert.deepEqual(opts.message, {
            type: 'serialPort',
            data: { port: '/dev/ttyUSB0' },
            instance: 'test.0',
        });
    });

    it('forwards a free-all request (no data) to the host', async () => {
        const { mgr, sendToHost } = makeManager();

        await mgr.freeUsedResource('serialPort');

        assert.equal(sendToHost.firstCall.args[0].message.data, undefined);
    });
});

describe('ResourceManager.checkUsedResource', () => {
    it('asks the host without registering anything', async () => {
        const conflicts = [{ type: 'tcpPort', data: { port: 1883 }, instance: 'mqtt.0', ts: 1, isBlocked: true }];
        const { mgr, sendToHost } = makeManager({}, { result: 'ok', conflicts });

        const res = await mgr.checkUsedResource('tcpPort', { port: 1883 });

        const [opts] = sendToHost.firstCall.args;
        assert.equal(opts.command, 'checkUsedResource');
        assert.deepEqual(opts.message, { type: 'tcpPort', data: { port: 1883 }, instance: 'test.0' });
        assert.deepEqual(res, conflicts);
    });

    it('returns an empty list when nobody holds it', async () => {
        const { mgr } = makeManager({}, { result: 'ok', conflicts: [] });
        assert.deepEqual(await mgr.checkUsedResource('tcpPort', { port: 1883 }), []);
    });

    it('tolerates an answer without conflicts', async () => {
        const { mgr } = makeManager({}, { result: 'ok' });
        assert.deepEqual(await mgr.checkUsedResource('tcpPort', { port: 1883 }), []);
    });

    it('rejects when the host refuses', async () => {
        const { mgr } = makeManager({}, { error: 'invalid resource type' });
        await assert.rejects(() => mgr.checkUsedResource('tcpPort', { port: 1883 }), /invalid resource type/);
    });
});

describe('ResourceManager.getHostUsedResources', () => {
    it('throws when the host is unknown', async () => {
        const mgr = new ResourceManager(makeContext({ host: undefined, states: {} as any }));
        await assert.rejects(() => mgr.getHostUsedResources('serialPort'), /host of this instance is unknown/);
        await assert.rejects(() => mgr.getHostUsedResources(), /host of this instance is unknown/);
    });

    it('reads and parses the resources of the given type from the host state', async () => {
        const entries = [
            { type: 'serialPort', data: { port: '/dev/ttyUSB0' }, instance: 'test.0', ts: 1, isBlocked: true },
        ];
        const getState = sinon.stub().resolves({ val: JSON.stringify(entries) });
        const mgr = new ResourceManager(makeContext({ states: { getState } as any }));

        const res = await mgr.getHostUsedResources('serialPort');

        assert.equal(getState.firstCall.args[0], 'system.host.localhost.usedResources.serialPort');
        assert.deepEqual(res, entries);
    });

    it('returns an empty list for a missing, empty or malformed state', async () => {
        const getState = sinon.stub();
        getState.onCall(0).resolves(null);
        getState.onCall(1).resolves({ val: '' });
        getState.onCall(2).resolves({ val: 'not-json' });
        getState.onCall(3).resolves({ val: '{"not":"an array"}' });
        const mgr = new ResourceManager(makeContext({ states: { getState } as any }));

        assert.deepEqual(await mgr.getHostUsedResources('serialPort'), []);
        assert.deepEqual(await mgr.getHostUsedResources('serialPort'), []);
        assert.deepEqual(await mgr.getHostUsedResources('serialPort'), []);
        assert.deepEqual(await mgr.getHostUsedResources('serialPort'), []);
    });

    it('collects and flattens resources across all types when no type is given', async () => {
        const serial = [
            { type: 'serialPort', data: { port: '/dev/ttyUSB0' }, instance: 'test.0', ts: 1, isBlocked: true },
        ];
        const tcp = [{ type: 'tcpPort', data: { port: 8080 }, instance: 'web.0', ts: 2, isBlocked: false }];
        const getKeys = sinon
            .stub()
            .resolves([
                'system.host.localhost.usedResources.serialPort',
                'system.host.localhost.usedResources.tcpPort',
            ]);
        const getStates = sinon.stub().resolves([{ val: JSON.stringify(serial) }, { val: JSON.stringify(tcp) }]);
        const mgr = new ResourceManager(makeContext({ states: { getKeys, getStates } as any }));

        const res = await mgr.getHostUsedResources();

        assert.equal(getKeys.firstCall.args[0], 'system.host.localhost.usedResources.*');
        assert.deepEqual(res, [...serial, ...tcp]);
    });

    it('returns an empty list when the host has no resource states', async () => {
        const getKeys = sinon.stub().resolves([]);
        const getStates = sinon.stub().resolves([]);
        const mgr = new ResourceManager(makeContext({ states: { getKeys, getStates } as any }));

        assert.deepEqual(await mgr.getHostUsedResources(), []);
        assert.equal(getStates.callCount, 0);
    });
});
