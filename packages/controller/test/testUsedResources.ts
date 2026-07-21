import assert from 'node:assert/strict';
import { getUsedResourceKey, UsedResourcesRegistry } from '../src/lib/usedResources.js';

/** Fixed clock so that the `ts` of registered resources is deterministic in the tests */
const FIXED_TS = 1_700_000_000_000;
const newRegistry = (): UsedResourcesRegistry => new UsedResourcesRegistry({ now: () => FIXED_TS });

describe('lib/usedResources: getUsedResourceKey', () => {
    it('ignores the bookkeeping fields ts and isBlocked', () => {
        const a = { type: 'serialPort', instance: 'mqtt.0', ts: 1, isBlocked: true, port: '/dev/ttyUSB0' } as any;
        const b = { type: 'serialPort', instance: 'mqtt.0', ts: 999, isBlocked: false, port: '/dev/ttyUSB0' } as any;
        assert.strictEqual(getUsedResourceKey(a), getUsedResourceKey(b));
    });

    it('is stable regardless of payload property order', () => {
        const a = { type: 'tcpPort', instance: 'web.0', ts: 0, isBlocked: false, port: 8081, bind: '0.0.0.0' } as any;
        const b = { type: 'tcpPort', instance: 'web.0', ts: 0, isBlocked: false, bind: '0.0.0.0', port: 8081 } as any;
        assert.strictEqual(getUsedResourceKey(a), getUsedResourceKey(b));
    });

    it('differs for different instance, type or payload', () => {
        const base = { type: 'tcpPort', instance: 'web.0', ts: 0, isBlocked: false, port: 8081 } as any;
        const otherInstance = { ...base, instance: 'web.1' };
        const otherType = { ...base, type: 'udpPort' };
        const otherPayload = { ...base, port: 9090 };
        const keys = new Set([
            getUsedResourceKey(base),
            getUsedResourceKey(otherInstance),
            getUsedResourceKey(otherType),
            getUsedResourceKey(otherPayload),
        ]);
        assert.strictEqual(keys.size, 4);
    });
});

describe('lib/usedResources: UsedResourcesRegistry.register', () => {
    it('adds a resource as blocked with the injected timestamp', () => {
        const reg = newRegistry();
        const changed = reg.register('serialPort', { port: '/dev/ttyUSB0' }, 'mqtt.0');

        assert.deepStrictEqual(changed, ['serialPort']);
        const all = reg.get();
        assert.strictEqual(all.length, 1);
        assert.deepStrictEqual(all[0], {
            type: 'serialPort',
            instance: 'mqtt.0',
            ts: FIXED_TS,
            isBlocked: true,
            port: '/dev/ttyUSB0',
        });
    });

    it('drops the previous registrations of the same instance by default', () => {
        const reg = newRegistry();
        reg.register('serialPort', { port: '/dev/ttyUSB0' }, 'mqtt.0');
        // a new start with a changed configuration: default wipes the old serial port
        const changed = reg.register('tcpPort', { port: 1883 }, 'mqtt.0');

        assert.deepStrictEqual(changed.sort(), ['serialPort', 'tcpPort']);
        assert.deepStrictEqual(reg.get('serialPort'), []);
        assert.strictEqual(reg.get('tcpPort').length, 1);
    });

    it('keeps the previous registrations when doNotDeleteAlreadyUsed is set', () => {
        const reg = newRegistry();
        reg.register('serialPort', { port: '/dev/ttyUSB0' }, 'mqtt.0');
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0', true);
        reg.register('tcpPort', { port: 8081 }, 'mqtt.0', true);

        assert.strictEqual(reg.get('serialPort').length, 1);
        assert.strictEqual(reg.get('tcpPort').length, 2);
        assert.strictEqual(reg.get().length, 3);
    });

    it('does not duplicate an identical registration but refreshes it', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0', true);

        assert.strictEqual(reg.get('tcpPort').length, 1);
    });

    it('keeps resources of different instances side by side', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        reg.register('tcpPort', { port: 1884 }, 'mqtt.1');

        assert.strictEqual(reg.get('tcpPort').length, 2);
    });
});

describe('lib/usedResources: UsedResourcesRegistry.free', () => {
    it('frees a single resource identified by its payload', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        reg.register('tcpPort', { port: 8081 }, 'mqtt.0', true);

        const changed = reg.free('tcpPort', { port: 8081 }, 'mqtt.0');
        assert.deepStrictEqual(changed, ['tcpPort']);
        assert.deepStrictEqual(
            reg.get('tcpPort').map(r => (r as any).port),
            [1883],
        );
    });

    it('frees all resources of a type for the instance when no payload is given', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        reg.register('tcpPort', { port: 8081 }, 'mqtt.0', true);
        reg.register('tcpPort', { port: 1884 }, 'mqtt.1', true);

        const changed = reg.free('tcpPort', undefined, 'mqtt.0');
        assert.deepStrictEqual(changed, ['tcpPort']);
        assert.deepStrictEqual(
            reg.get('tcpPort').map(r => (r as any).instance),
            ['mqtt.1'],
        );
    });

    it('reports no change when nothing matched', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');

        assert.deepStrictEqual(reg.free('tcpPort', { port: 9999 }, 'mqtt.0'), []);
        assert.deepStrictEqual(reg.free('serialPort', undefined, 'mqtt.0'), []);
        assert.strictEqual(reg.get('tcpPort').length, 1);
    });
});

describe('lib/usedResources: UsedResourcesRegistry.setInstanceBlocked', () => {
    it('toggles isBlocked across all types of an instance and reports changed types', () => {
        const reg = newRegistry();
        reg.register('serialPort', { port: '/dev/ttyUSB0' }, 'mqtt.0');
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0', true);
        reg.register('tcpPort', { port: 1884 }, 'other.0', true);

        const changed = reg.setInstanceBlocked('mqtt.0', false);
        assert.deepStrictEqual(changed.sort(), ['serialPort', 'tcpPort']);
        for (const r of reg.get()) {
            assert.strictEqual((r as any).isBlocked, (r as any).instance !== 'mqtt.0');
        }
    });

    it('reports no change when the flag already has the desired value', () => {
        const reg = newRegistry();
        reg.register('serialPort', { port: '/dev/ttyUSB0' }, 'mqtt.0'); // already blocked
        assert.deepStrictEqual(reg.setInstanceBlocked('mqtt.0', true), []);
    });
});

describe('lib/usedResources: UsedResourcesRegistry.removeInstance', () => {
    it('removes all resources of an instance across types', () => {
        const reg = newRegistry();
        reg.register('serialPort', { port: '/dev/ttyUSB0' }, 'mqtt.0');
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0', true);
        reg.register('tcpPort', { port: 1884 }, 'other.0', true);

        const changed = reg.removeInstance('mqtt.0');
        assert.deepStrictEqual(changed.sort(), ['serialPort', 'tcpPort']);
        assert.deepStrictEqual(
            reg.get().map(r => (r as any).instance),
            ['other.0'],
        );
    });

    it('reports no change for an unknown instance', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        assert.deepStrictEqual(reg.removeInstance('nope.0'), []);
    });
});

describe('lib/usedResources: UsedResourcesRegistry.assess (controller start)', () => {
    it('resets isBlocked and drops resources of no longer existing instances', () => {
        const reg = newRegistry();
        // simulate a state loaded from persistence: two instances, blocked
        reg.setType('tcpPort', [
            { type: 'tcpPort', instance: 'mqtt.0', ts: 1, isBlocked: true, port: 1883 } as any,
            { type: 'tcpPort', instance: 'deleted.0', ts: 1, isBlocked: true, port: 1884 } as any,
        ]);

        const changed = reg.assess(new Set(['mqtt.0']));
        assert.deepStrictEqual(changed, ['tcpPort']);

        const remaining = reg.get('tcpPort');
        assert.strictEqual(remaining.length, 1);
        assert.strictEqual((remaining[0] as any).instance, 'mqtt.0');
        assert.strictEqual((remaining[0] as any).isBlocked, false);
    });

    it('reports no change when everything is already valid and unblocked', () => {
        const reg = newRegistry();
        reg.setType('tcpPort', [{ type: 'tcpPort', instance: 'mqtt.0', ts: 1, isBlocked: false, port: 1883 } as any]);

        assert.deepStrictEqual(reg.assess(new Set(['mqtt.0'])), []);
    });
});

describe('lib/usedResources: UsedResourcesRegistry.get', () => {
    it('returns copies so callers cannot mutate the internal state', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');

        const list = reg.get('tcpPort');
        list.push({ type: 'tcpPort', instance: 'evil.0', ts: 0, isBlocked: true, port: 1 } as any);
        assert.strictEqual(reg.get('tcpPort').length, 1);
    });

    it('getTypes lists the types that hold entries', () => {
        const reg = newRegistry();
        reg.register('serialPort', { port: '/dev/ttyUSB0' }, 'mqtt.0');
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0', true);
        assert.deepStrictEqual(reg.getTypes().sort(), ['serialPort', 'tcpPort']);
    });
});
