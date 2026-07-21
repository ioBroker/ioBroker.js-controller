import assert from 'node:assert/strict';
import sinon from 'sinon';
import { tools } from '@iobroker/js-controller-common';
import { ResourceManager } from './ResourceManager.js';
import type { AdapterContext } from '../context.js';

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
        const mgr = new ResourceManager(makeContext({ states: null }));
        await assert.rejects(
            () => mgr.registerUsedResource('serialPort', { port: '/dev/ttyUSB0' }),
            new RegExp(tools.ERRORS.ERROR_DB_CLOSED),
        );
    });

    it('forwards the resource to the host with the instance and coerced flag', async () => {
        const pushMessage = sinon.stub().resolves();
        const mgr = new ResourceManager(makeContext({ states: { pushMessage } as any }));

        await mgr.registerUsedResource('serialPort', { port: '/dev/ttyUSB0' });

        assert.equal(pushMessage.callCount, 1);
        const [target, obj] = pushMessage.firstCall.args;
        assert.equal(target, 'system.host.localhost');
        assert.equal(obj.command, 'registerUsedResource');
        assert.equal(obj.from, 'system.adapter.test.0');
        assert.deepEqual(obj.message, {
            type: 'serialPort',
            data: { port: '/dev/ttyUSB0' },
            instance: 'test.0',
            doNotDeleteAlreadyUsed: false,
        });
    });

    it('passes doNotDeleteAlreadyUsed through as a boolean', async () => {
        const pushMessage = sinon.stub().resolves();
        const mgr = new ResourceManager(makeContext({ states: { pushMessage } as any }));

        await mgr.registerUsedResource('serialPort', { port: '/dev/ttyUSB0' }, true);

        assert.equal(pushMessage.firstCall.args[1].message.doNotDeleteAlreadyUsed, true);
    });
});

describe('ResourceManager.freeUsedResource', () => {
    it('rejects with ERROR_DB_CLOSED when states is not connected', async () => {
        const mgr = new ResourceManager(makeContext({ states: null }));
        await assert.rejects(() => mgr.freeUsedResource('serialPort'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('forwards a specific resource to free to the host', async () => {
        const pushMessage = sinon.stub().resolves();
        const mgr = new ResourceManager(makeContext({ states: { pushMessage } as any }));

        await mgr.freeUsedResource('serialPort', { port: '/dev/ttyUSB0' });

        const [target, obj] = pushMessage.firstCall.args;
        assert.equal(target, 'system.host.localhost');
        assert.equal(obj.command, 'freeUsedResource');
        assert.deepEqual(obj.message, {
            type: 'serialPort',
            data: { port: '/dev/ttyUSB0' },
            instance: 'test.0',
        });
    });

    it('forwards a free-all request (no data) to the host', async () => {
        const pushMessage = sinon.stub().resolves();
        const mgr = new ResourceManager(makeContext({ states: { pushMessage } as any }));

        await mgr.freeUsedResource('serialPort');

        assert.equal(pushMessage.firstCall.args[1].message.data, undefined);
    });
});

describe('ResourceManager.getUsedResources', () => {
    it('throws when the host is unknown', async () => {
        const mgr = new ResourceManager(makeContext({ host: undefined, states: {} as any }));
        await assert.rejects(() => mgr.getUsedResources('serialPort'), /host of this instance is unknown/);
    });

    it('reads and parses the resources of the given type from the host state', async () => {
        const entries = [{ type: 'serialPort', port: '/dev/ttyUSB0', instance: 'test.0', ts: 1, isBlocked: true }];
        const getState = sinon.stub().resolves({ val: JSON.stringify(entries) });
        const mgr = new ResourceManager(makeContext({ states: { getState } as any }));

        const res = await mgr.getUsedResources('serialPort');

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

        assert.deepEqual(await mgr.getUsedResources('serialPort'), []);
        assert.deepEqual(await mgr.getUsedResources('serialPort'), []);
        assert.deepEqual(await mgr.getUsedResources('serialPort'), []);
        assert.deepEqual(await mgr.getUsedResources('serialPort'), []);
    });
});

describe('ResourceManager.getAllUsedResources', () => {
    it('throws when the host is unknown', async () => {
        const mgr = new ResourceManager(makeContext({ host: undefined, states: {} as any }));
        await assert.rejects(() => mgr.getAllUsedResources(), /host of this instance is unknown/);
    });

    it('collects and flattens resources across all types of the host', async () => {
        const serial = [{ type: 'serialPort', port: '/dev/ttyUSB0', instance: 'test.0', ts: 1, isBlocked: true }];
        const tcp = [{ type: 'tcpPort', port: 8080, instance: 'web.0', ts: 2, isBlocked: false }];
        const getKeys = sinon
            .stub()
            .resolves([
                'system.host.localhost.usedResources.serialPort',
                'system.host.localhost.usedResources.tcpPort',
            ]);
        const getStates = sinon.stub().resolves([{ val: JSON.stringify(serial) }, { val: JSON.stringify(tcp) }]);
        const mgr = new ResourceManager(makeContext({ states: { getKeys, getStates } as any }));

        const res = await mgr.getAllUsedResources();

        assert.equal(getKeys.firstCall.args[0], 'system.host.localhost.usedResources.*');
        assert.deepEqual(res, [...serial, ...tcp]);
    });

    it('returns an empty list when the host has no resource states', async () => {
        const getKeys = sinon.stub().resolves([]);
        const getStates = sinon.stub().resolves([]);
        const mgr = new ResourceManager(makeContext({ states: { getKeys, getStates } as any }));

        assert.deepEqual(await mgr.getAllUsedResources(), []);
        assert.equal(getStates.callCount, 0);
    });
});
