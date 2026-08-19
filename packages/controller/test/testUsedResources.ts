import assert from 'node:assert/strict';
import {
    getUsedResourceKey,
    isRegisteredResource,
    isValidUsedResourceType,
    matchesUsedResourceData,
    UsedResourcesRegistry,
} from '../src/lib/usedResources.js';

/** Fixed clock so that the `ts` of registered resources is deterministic in the tests */
const FIXED_TS = 1_700_000_000_000;
const newRegistry = (): UsedResourcesRegistry => new UsedResourcesRegistry({ now: () => FIXED_TS });

describe('lib/usedResources: getUsedResourceKey', () => {
    it('ignores the bookkeeping fields ts and isBlocked', () => {
        const a = {
            type: 'serialPort',
            instance: 'mqtt.0',
            data: { port: '/dev/ttyUSB0' },
            ts: 1,
            isBlocked: true,
        } as any;
        const b = {
            type: 'serialPort',
            instance: 'mqtt.0',
            data: { port: '/dev/ttyUSB0' },
            ts: 999,
            isBlocked: false,
        } as any;
        assert.strictEqual(getUsedResourceKey(a), getUsedResourceKey(b));
    });

    it('is stable regardless of payload property order', () => {
        const a = { type: 'tcpPort', instance: 'web.0', data: { port: 8081, bind: '0.0.0.0' } } as any;
        const b = { type: 'tcpPort', instance: 'web.0', data: { bind: '0.0.0.0', port: 8081 } } as any;
        assert.strictEqual(getUsedResourceKey(a), getUsedResourceKey(b));
    });

    it('differs for different instance, type or payload', () => {
        const base = { type: 'tcpPort', instance: 'web.0', data: { port: 8081 } } as any;
        const otherInstance = { ...base, instance: 'web.1' };
        const otherType = { ...base, type: 'udpPort' };
        const otherPayload = { ...base, data: { port: 9090 } };
        const keys = new Set([
            getUsedResourceKey(base),
            getUsedResourceKey(otherInstance),
            getUsedResourceKey(otherType),
            getUsedResourceKey(otherPayload),
        ]);
        assert.strictEqual(keys.size, 4);
    });

    it('keeps values of different types apart', () => {
        const asNumber = { type: 'tcpPort', instance: 'web.0', data: { port: 80 } } as any;
        const asString = { type: 'tcpPort', instance: 'web.0', data: { port: '80' } } as any;
        assert.notStrictEqual(getUsedResourceKey(asNumber), getUsedResourceKey(asString));
    });

    it('keeps structured payload values apart', () => {
        const a = { type: 'usb', instance: 'a.0', data: { path: { bus: 1 } } } as any;
        const b = { type: 'usb', instance: 'a.0', data: { path: { bus: 2 } } } as any;
        assert.notStrictEqual(getUsedResourceKey(a), getUsedResourceKey(b));
    });

    it('treats an explicitly undefined payload field like an omitted one', () => {
        const explicit = { type: 'tcpPort', instance: 'web.0', data: { port: 8080, bind: undefined } } as any;
        const omitted = { type: 'tcpPort', instance: 'web.0', data: { port: 8080 } } as any;
        assert.strictEqual(getUsedResourceKey(explicit), getUsedResourceKey(omitted));
    });

    it('handles a missing payload', () => {
        const withoutData = { type: 'gpio', instance: 'rpi.0', data: undefined } as any;
        assert.strictEqual(getUsedResourceKey(withoutData), 'rpi.0|gpio|');
    });
});

describe('lib/usedResources: isValidUsedResourceType', () => {
    it('accepts known and custom type names', () => {
        assert.ok(isValidUsedResourceType('tcpPort'));
        assert.ok(isValidUsedResourceType('canBus'));
        assert.ok(isValidUsedResourceType('my-custom_1'));
    });

    it('rejects anything that would break the state id', () => {
        assert.ok(!isValidUsedResourceType(undefined));
        assert.ok(!isValidUsedResourceType(null));
        assert.ok(!isValidUsedResourceType(42));
        assert.ok(!isValidUsedResourceType(''));
        assert.ok(!isValidUsedResourceType('with.dot'));
        assert.ok(!isValidUsedResourceType('with space'));
        assert.ok(!isValidUsedResourceType('with*star'));
    });
});

describe('lib/usedResources: isRegisteredResource', () => {
    const valid = { type: 'tcpPort', data: { port: 8080 }, instance: 'web.0', ts: 1, isBlocked: false };

    it('accepts a complete entry', () => {
        assert.ok(isRegisteredResource(valid));
    });

    it('rejects entries with a missing or malformed field', () => {
        assert.ok(!isRegisteredResource(null));
        assert.ok(!isRegisteredResource('nope'));
        assert.ok(!isRegisteredResource({ ...valid, type: undefined }));
        assert.ok(!isRegisteredResource({ ...valid, instance: '' }));
        assert.ok(!isRegisteredResource({ ...valid, ts: 'now' }));
        assert.ok(!isRegisteredResource({ ...valid, isBlocked: 'yes' }));
        assert.ok(!isRegisteredResource({ ...valid, data: undefined }));
        assert.ok(!isRegisteredResource({ ...valid, data: [] }));
    });

    it('rejects an entry in the old flat format', () => {
        assert.ok(!isRegisteredResource({ type: 'tcpPort', port: 8080, instance: 'web.0', ts: 1, isBlocked: false }));
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
            data: { port: '/dev/ttyUSB0' },
            instance: 'mqtt.0',
            ts: FIXED_TS,
            isBlocked: true,
        });
    });

    it('does not let the payload overwrite the bookkeeping fields', () => {
        const reg = newRegistry();
        // a payload carrying keys that also exist as bookkeeping fields must not take them over
        reg.register('tcpPort', { port: 80, instance: 'evil.0', isBlocked: false, type: 'gpio' } as any, 'mqtt.0');

        const [entry] = reg.get('tcpPort');
        assert.strictEqual(entry.type, 'tcpPort');
        assert.strictEqual(entry.instance, 'mqtt.0');
        assert.strictEqual(entry.isBlocked, true);
        assert.strictEqual(entry.ts, FIXED_TS);

        // ... and the entry stays reachable for all by-instance operations
        assert.deepStrictEqual(reg.setInstanceBlocked('mqtt.0', false), ['tcpPort']);
        assert.deepStrictEqual(reg.removeInstance('mqtt.0'), ['tcpPort']);
        assert.deepStrictEqual(reg.get(), []);
    });

    it('is additive and independent of the call order', () => {
        const reg = newRegistry();
        reg.register('serialPort', { port: '/dev/ttyUSB0' }, 'mqtt.0');
        const changed = reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        reg.register('tcpPort', { port: 8081 }, 'mqtt.0');

        // registering one type must not touch the entries of another one
        assert.deepStrictEqual(changed, ['tcpPort']);
        assert.strictEqual(reg.get('serialPort').length, 1);
        assert.strictEqual(reg.get('tcpPort').length, 2);
        assert.strictEqual(reg.get().length, 3);
    });

    it('drops the previous registrations only on the explicit removeInstance', () => {
        const reg = newRegistry();
        reg.register('serialPort', { port: '/dev/ttyUSB0' }, 'mqtt.0');
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');

        // what the controller does when the instance (re)starts with a possibly changed configuration
        assert.deepStrictEqual(reg.removeInstance('mqtt.0').sort(), ['serialPort', 'tcpPort']);
        assert.deepStrictEqual(reg.get(), []);
    });

    it('does not duplicate an identical registration but refreshes it', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');

        assert.strictEqual(reg.get('tcpPort').length, 1);
    });

    it('keeps resources of different instances side by side', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        reg.register('tcpPort', { port: 1884 }, 'mqtt.1');

        assert.strictEqual(reg.get('tcpPort').length, 2);
    });
});

describe('lib/usedResources: matchesUsedResourceData', () => {
    const data = { port: 8080, bind: '0.0.0.0' } as any;

    it('matches when the filter is omitted or empty', () => {
        assert.ok(matchesUsedResourceData(data, undefined));
        assert.ok(matchesUsedResourceData(data, {}));
    });

    it('ignores the fields the filter does not name', () => {
        assert.ok(matchesUsedResourceData(data, { port: 8080 }));
        assert.ok(matchesUsedResourceData(data, { bind: '0.0.0.0' }));
    });

    it('does not match when a named field differs', () => {
        assert.ok(!matchesUsedResourceData(data, { port: 8081 }));
        assert.ok(!matchesUsedResourceData(data, { bind: '127.0.0.1' }));
        // a field the payload does not have at all
        assert.ok(!matchesUsedResourceData(data, { family: 4 } as any));
    });

    it('compares by value and type', () => {
        assert.ok(!matchesUsedResourceData(data, { port: '8080' }));
        assert.ok(matchesUsedResourceData({ path: { bus: 1 } } as any, { path: { bus: 1 } } as any));
        assert.ok(!matchesUsedResourceData({ path: { bus: 1 } } as any, { path: { bus: 2 } } as any));
    });

    it('treats an explicitly undefined filter field as not named', () => {
        assert.ok(matchesUsedResourceData(data, { port: 8080, family: undefined }));
    });
});

describe('lib/usedResources: UsedResourcesRegistry.free', () => {
    it('frees a single resource identified by its payload', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        reg.register('tcpPort', { port: 8081 }, 'mqtt.0');

        const changed = reg.free('tcpPort', { port: 8081 }, 'mqtt.0');
        assert.deepStrictEqual(changed, ['tcpPort']);
        assert.deepStrictEqual(
            reg.get('tcpPort').map(r => (r.data as ioBroker.TcpPortResourceData).port),
            [1883],
        );
    });

    it('frees a resource that was registered with an explicitly undefined optional field', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 8080, bind: undefined }, 'web.0');

        assert.deepStrictEqual(reg.free('tcpPort', { port: 8080 }, 'web.0'), ['tcpPort']);
        assert.deepStrictEqual(reg.get('tcpPort'), []);
    });

    it('frees by a partial payload without repeating the optional fields', () => {
        const reg = newRegistry();
        // this is what the controller derives itself when native.bind is set
        reg.register('tcpPort', { port: 8080, bind: '0.0.0.0' }, 'web.0');

        assert.deepStrictEqual(reg.free('tcpPort', { port: 8080 }, 'web.0'), ['tcpPort']);
        assert.deepStrictEqual(reg.get('tcpPort'), []);
    });

    it('frees every entry the filter matches', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 8080, bind: '0.0.0.0' }, 'web.0');
        reg.register('tcpPort', { port: 8080, bind: '127.0.0.1' }, 'web.0');
        reg.register('tcpPort', { port: 9090 }, 'web.0');

        assert.deepStrictEqual(reg.free('tcpPort', { port: 8080 }, 'web.0'), ['tcpPort']);
        assert.deepStrictEqual(
            reg.get('tcpPort').map(r => (r.data as ioBroker.TcpPortResourceData).port),
            [9090],
        );
    });

    it('does not free more than the filter says', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 8080, bind: '0.0.0.0' }, 'web.0');

        assert.deepStrictEqual(reg.free('tcpPort', { port: 8080, bind: '127.0.0.1' }, 'web.0'), []);
        assert.strictEqual(reg.get('tcpPort').length, 1);
    });

    it('never reaches the resources of another instance', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 8080 }, 'web.0');
        reg.register('tcpPort', { port: 8080 }, 'web.1');

        assert.deepStrictEqual(reg.free('tcpPort', { port: 8080 }, 'web.0'), ['tcpPort']);
        assert.deepStrictEqual(
            reg.get('tcpPort').map(r => r.instance),
            ['web.1'],
        );
    });

    it('treats an empty filter like an omitted one', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 8080 }, 'web.0');
        reg.register('tcpPort', { port: 9090 }, 'web.0');

        assert.deepStrictEqual(reg.free('tcpPort', {}, 'web.0'), ['tcpPort']);
        assert.deepStrictEqual(reg.get('tcpPort'), []);
    });

    it('frees all resources of a type for the instance when no payload is given', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        reg.register('tcpPort', { port: 8081 }, 'mqtt.0');
        reg.register('tcpPort', { port: 1884 }, 'mqtt.1');

        const changed = reg.free('tcpPort', undefined, 'mqtt.0');
        assert.deepStrictEqual(changed, ['tcpPort']);
        assert.deepStrictEqual(
            reg.get('tcpPort').map(r => r.instance),
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

describe('lib/usedResources: UsedResourcesRegistry.findConflicts', () => {
    it('reports another instance holding the same resource', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');

        const conflicts = reg.findConflicts('tcpPort', { port: 1883 }, 'other.0');
        assert.strictEqual(conflicts.length, 1);
        assert.strictEqual(conflicts[0].instance, 'mqtt.0');
    });

    it('never reports the asking instance itself', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');

        assert.deepStrictEqual(reg.findConflicts('tcpPort', { port: 1883 }, 'mqtt.0'), []);
    });

    it('ignores an instance that is not running', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        reg.setInstanceBlocked('mqtt.0', false);

        // "would occupy this when started" must not stand in the way of an instance running now
        assert.deepStrictEqual(reg.findConflicts('tcpPort', { port: 1883 }, 'other.0'), []);
    });

    it('overlaps in both directions', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 8080, bind: '0.0.0.0' }, 'web.0');

        // asking with less detail than was registered, and the other way round
        assert.strictEqual(reg.findConflicts('tcpPort', { port: 8080 }, 'other.0').length, 1);
        assert.strictEqual(
            reg.findConflicts('tcpPort', { port: 8080, bind: '0.0.0.0', family: 4 }, 'other.0').length,
            1,
        );
    });

    it('does not report a different resource of the same type', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');

        assert.deepStrictEqual(reg.findConflicts('tcpPort', { port: 9999 }, 'other.0'), []);
        assert.deepStrictEqual(reg.findConflicts('serialPort', { port: '/dev/ttyUSB0' }, 'other.0'), []);
    });

    it('returns copies, newest registration first', () => {
        const clock = { now: 1_000 };
        const reg = new UsedResourcesRegistry({ now: () => clock.now });
        reg.register('tcpPort', { port: 1883 }, 'old.0');
        clock.now = 2_000;
        reg.register('tcpPort', { port: 1883 }, 'new.0');

        const conflicts = reg.findConflicts('tcpPort', { port: 1883 }, 'asking.0');
        assert.deepStrictEqual(
            conflicts.map(entry => entry.instance),
            ['new.0', 'old.0'],
        );

        (conflicts[0].data as ioBroker.TcpPortResourceData).port = 1;
        assert.strictEqual((reg.get('tcpPort')[0].data as ioBroker.TcpPortResourceData).port, 1883);
    });
});

describe('lib/usedResources: UsedResourcesRegistry.setInstanceBlocked', () => {
    it('toggles isBlocked across all types of an instance and reports changed types', () => {
        const reg = newRegistry();
        reg.register('serialPort', { port: '/dev/ttyUSB0' }, 'mqtt.0');
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        reg.register('tcpPort', { port: 1884 }, 'other.0');

        const changed = reg.setInstanceBlocked('mqtt.0', false);
        assert.deepStrictEqual(changed.sort(), ['serialPort', 'tcpPort']);
        for (const r of reg.get()) {
            assert.strictEqual(r.isBlocked, r.instance !== 'mqtt.0');
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
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        reg.register('tcpPort', { port: 1884 }, 'other.0');

        const changed = reg.removeInstance('mqtt.0');
        assert.deepStrictEqual(changed.sort(), ['serialPort', 'tcpPort']);
        assert.deepStrictEqual(
            reg.get().map(r => r.instance),
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
            { type: 'tcpPort', data: { port: 1883 }, instance: 'mqtt.0', ts: 1, isBlocked: true },
            { type: 'tcpPort', data: { port: 1884 }, instance: 'deleted.0', ts: 1, isBlocked: true },
        ]);

        const changed = reg.assess(new Set(['mqtt.0']));
        assert.deepStrictEqual(changed, ['tcpPort']);

        const remaining = reg.get('tcpPort');
        assert.strictEqual(remaining.length, 1);
        assert.strictEqual(remaining[0].instance, 'mqtt.0');
        assert.strictEqual(remaining[0].isBlocked, false);
    });

    it('reports no change when everything is already valid and unblocked', () => {
        const reg = newRegistry();
        reg.setType('tcpPort', [
            { type: 'tcpPort', data: { port: 1883 }, instance: 'mqtt.0', ts: 1, isBlocked: false },
        ]);

        assert.deepStrictEqual(reg.assess(new Set(['mqtt.0'])), []);
    });
});

describe('lib/usedResources: UsedResourcesRegistry.get', () => {
    it('returns copies so callers cannot mutate the internal state', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');

        const list = reg.get('tcpPort');
        list.push({ type: 'tcpPort', data: { port: 1 }, instance: 'evil.0', ts: 0, isBlocked: true });
        assert.strictEqual(reg.get('tcpPort').length, 1);
    });

    it('returns deep copies so the nested payload cannot be mutated either', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');

        const [entry] = reg.get('tcpPort');
        (entry.data as ioBroker.TcpPortResourceData).port = 9999;
        entry.instance = 'evil.0';
        entry.isBlocked = false;

        const [stored] = reg.get('tcpPort');
        assert.strictEqual((stored.data as ioBroker.TcpPortResourceData).port, 1883);
        assert.strictEqual(stored.instance, 'mqtt.0');
        assert.strictEqual(stored.isBlocked, true);
    });

    it('getTypes lists the types that hold entries', () => {
        const reg = newRegistry();
        reg.register('serialPort', { port: '/dev/ttyUSB0' }, 'mqtt.0');
        reg.register('tcpPort', { port: 1883 }, 'mqtt.0');
        assert.deepStrictEqual(reg.getTypes().sort(), ['serialPort', 'tcpPort']);
    });
});

describe('lib/usedResources: UsedResourcesRegistry empty types', () => {
    it('drops a type when its last entry is freed', () => {
        const reg = newRegistry();
        reg.register('gpio', { pin: 4 }, 'rpi.0');

        assert.deepStrictEqual(reg.free('gpio', undefined, 'rpi.0'), ['gpio']);
        assert.deepStrictEqual(reg.getTypes(), []);
        assert.deepStrictEqual(reg.get(), []);
    });

    it('drops a type when its last entry is removed with the instance', () => {
        const reg = newRegistry();
        reg.register('gpio', { pin: 4 }, 'rpi.0');
        reg.register('tcpPort', { port: 8080 }, 'web.0');

        assert.deepStrictEqual(reg.removeInstance('rpi.0'), ['gpio']);
        assert.deepStrictEqual(reg.getTypes(), ['tcpPort']);
    });

    it('drops a type whose entries are all dropped by the start assessment', () => {
        const reg = newRegistry();
        reg.setType('tcpPort', [
            { type: 'tcpPort', data: { port: 1883 }, instance: 'deleted.0', ts: 1, isBlocked: true },
        ]);

        assert.deepStrictEqual(reg.assess(new Set(['mqtt.0'])), ['tcpPort']);
        assert.deepStrictEqual(reg.getTypes(), []);
    });

    it('does not create a type when an empty list is loaded from the persisted state', () => {
        const reg = newRegistry();
        reg.setType('tcpPort', []);

        assert.deepStrictEqual(reg.getTypes(), []);
    });
});
