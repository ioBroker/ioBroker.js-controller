import assert from 'node:assert/strict';
import sinon from 'sinon';
import { UsedResourcesManager } from '@/lib/controller/instances/usedResourcesManager.js';
import type { UsedResourcesManagerOptions } from '@/lib/controller/instances/usedResourcesManager.js';
import { testIdentity } from '@/lib/controller/testing.test-utils.js';
import type { Process } from '@/lib/controller/types.js';

const INSTANCE_ID = 'system.adapter.mqtt.0' as ioBroker.ObjectIDs.Instance;

/**
 * Build an instance object of this host
 *
 * @param over The parts this test wants to control
 * @param native The native configuration of the instance
 */
function instanceObject(over: Partial<ioBroker.InstanceObject['common']> = {}, native = {}): ioBroker.InstanceObject {
    return {
        _id: INSTANCE_ID,
        type: 'instance',
        common: { name: 'mqtt', host: 'testhost', enabled: true, mode: 'daemon', ...over },
        native,
    } as unknown as ioBroker.InstanceObject;
}

/**
 * Build a manager whose database writes are stubs
 *
 * @param over The parts this test wants to control
 * @param procs The known processes of this host
 */
function createManager(
    over: Partial<UsedResourcesManagerOptions> = {},
    procs: Record<string, Partial<Process>> = {},
): {
    manager: UsedResourcesManager;
    states: { setState: sinon.SinonStub; getKeys: sinon.SinonStub; getStates: sinon.SinonStub };
    objects: { extendObject: sinon.SinonStub };
} {
    const states = {
        setState: sinon.stub().resolves(),
        getKeys: sinon.stub().resolves([]),
        getStates: sinon.stub().resolves([]),
    };
    const objects = { extendObject: sinon.stub().resolves() };

    const options = {
        objects: objects as any,
        states: states as any,
        isCompactGroupController: false,
        instances: { procs } as any,
        ...testIdentity(),
        ...over,
    } as UsedResourcesManagerOptions;

    return { manager: new UsedResourcesManager(options), states, objects };
}

describe('UsedResourcesManager', () => {
    it('creates the state object of a type only once and writes the registry into it', async () => {
        const { manager, states, objects } = createManager();

        manager.registry.register('tcpPort', { port: 1883 }, 'mqtt.0');
        await manager.persistTypes(['tcpPort']);
        await manager.persistTypes(['tcpPort']);

        // extendObject costs a write plus a change event for every connected client, so it is not
        // worth paying on every resource change
        assert.equal(objects.extendObject.callCount, 1);
        assert.equal(states.setState.callCount, 2);
        assert.equal(states.setState.firstCall.args[0], 'system.host.testhost.usedResources.tcpPort');

        const written = JSON.parse(states.setState.firstCall.args[1].val);
        assert.equal(written.length, 1);
        assert.equal(written[0].data.port, 1883);
        assert.equal(written[0].instance, 'mqtt.0');
    });

    it('writes nothing in a compact group controller', async () => {
        // the registry of a host belongs to its main controller, a group controller would compete with it
        const { manager, states } = createManager({ isCompactGroupController: true });

        manager.registry.register('tcpPort', { port: 1883 }, 'mqtt.0');
        const persisted = await manager.persistTypes(['tcpPort']);

        assert.equal(persisted, true, 'the caller must not be told its change failed');
        assert.equal(states.setState.called, false);
    });

    it('reports a failed write instead of rejecting', async () => {
        // the callers are partly fire-and-forget, the request/response handlers need the verdict
        const { manager, states } = createManager();
        states.setState.rejects(new Error('database gone'));

        assert.equal(await manager.persistTypes(['tcpPort']), false);
    });

    it('derives the configured port of an instance the controller manages', async () => {
        const { manager } = createManager();

        await manager.syncInstance(INSTANCE_ID, instanceObject({}, { port: '1883', bind: '0.0.0.0' }));

        const [entry] = manager.registry.get('tcpPort');
        assert.equal(entry.data.port, 1883, 'a port configured as a string is still a port');
        assert.equal(entry.data.bind, '0.0.0.0');
        // nothing is running, so the port is listed but not held
        assert.equal(entry.isBlocked, false);
    });

    it('does not derive a port which is picked at runtime', async () => {
        const { manager } = createManager();

        await manager.syncInstance(INSTANCE_ID, instanceObject({}, { port: 0 }));

        assert.deepEqual(manager.registry.get('tcpPort'), []);
    });

    it('drops the entries of an instance which moved to another host', async () => {
        const { manager } = createManager();

        await manager.syncInstance(INSTANCE_ID, instanceObject({}, { port: 1883 }));
        assert.equal(manager.registry.get('tcpPort').length, 1);

        await manager.syncInstance(INSTANCE_ID, instanceObject({ host: 'otherhost' }, { port: 1883 }));

        assert.deepEqual(manager.registry.get('tcpPort'), [], 'nothing else would ever remove them');
    });

    it('drops the entries of a deleted instance', async () => {
        const { manager } = createManager();

        await manager.syncInstance(INSTANCE_ID, instanceObject({}, { port: 1883 }));
        await manager.syncInstance(INSTANCE_ID, null);

        assert.deepEqual(manager.registry.get('tcpPort'), []);
    });

    it('leaves a running instance which declares its resources itself alone', async () => {
        const { manager } = createManager({}, { [INSTANCE_ID]: { process: {} as any } });

        manager.registry.register('serialPort', { name: '/dev/ttyUSB0' }, 'mqtt.0');
        await manager.syncInstance(INSTANCE_ID, instanceObject({ declareUsedResources: true }));

        assert.equal(manager.registry.get('serialPort').length, 1, 'nothing would register them again');
    });

    it('drops what an adapter declared before it is started again', async () => {
        // the settings may have changed in between, what it registers now is additive
        const { manager } = createManager();

        manager.registry.register('serialPort', { name: '/dev/ttyUSB0' }, 'mqtt.0');
        await manager.markStarting(INSTANCE_ID, instanceObject({ declareUsedResources: true }));

        assert.deepEqual(manager.registry.get('serialPort'), []);
    });

    it('holds and releases the derived resources of an instance around its run', async () => {
        const { manager } = createManager();

        await manager.syncInstance(INSTANCE_ID, instanceObject({}, { port: 1883 }));
        await manager.markStarting(INSTANCE_ID, instanceObject({}, { port: 1883 }));

        assert.equal(manager.registry.get('tcpPort')[0].isBlocked, true);

        await manager.markStopped(INSTANCE_ID);

        const [entry] = manager.registry.get('tcpPort');
        assert.equal(entry.isBlocked, false, 'the user still sees what it would occupy when started again');
        assert.equal(entry.data.port, 1883, 'the registration itself is kept');
    });

    it('accepts the namespace of an instance as well as its id', async () => {
        const { manager } = createManager();

        await manager.syncInstance(INSTANCE_ID, instanceObject({}, { port: 1883 }));
        await manager.markStarting(INSTANCE_ID, instanceObject({}, { port: 1883 }));
        await manager.markStopped('mqtt.0');

        assert.equal(manager.registry.get('tcpPort')[0].isBlocked, false);
    });
});
