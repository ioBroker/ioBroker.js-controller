import assert from 'node:assert/strict';
import {
    getUsedResourceKey,
    getUsedResourcesMode,
    isRegisteredResource,
    isValidUsedResourceType,
    matchesUsedResourceData,
    normalizeUsedResourceData,
    resolveSerialPortName,
    UsedResourcesRegistry,
    validateUsedResourceData,
    withSerialPortDevice,
} from '../src/lib/usedResources.js';

/** Fixed clock so that the `ts` of registered resources is deterministic in the tests */
const FIXED_TS = 1_700_000_000_000;
const newRegistry = (): UsedResourcesRegistry => new UsedResourcesRegistry({ now: () => FIXED_TS });

describe('lib/usedResources: getUsedResourcesMode', () => {
    const instanceWith = (common: Record<string, unknown>): Pick<ioBroker.InstanceObject, 'common'> => ({
        common: common as unknown as ioBroker.InstanceCommon,
    });

    it('lets the adapter declare its resources when the flag is true', () => {
        assert.strictEqual(getUsedResourcesMode(instanceWith({ declareUsedResources: true })), 'adapter');
    });

    it('opts the instance out of the registry when the flag is false', () => {
        assert.strictEqual(getUsedResourcesMode(instanceWith({ declareUsedResources: false })), 'none');
    });

    it('derives the resources in the controller when the flag is not set', () => {
        assert.strictEqual(getUsedResourcesMode(instanceWith({})), 'controller');
        assert.strictEqual(getUsedResourcesMode(instanceWith({ declareUsedResources: undefined })), 'controller');
    });

    it('only takes a real boolean as an explicit decision', () => {
        // a value that is merely falsy must not silently drop the configured port from the registry
        assert.strictEqual(getUsedResourcesMode(instanceWith({ declareUsedResources: 0 })), 'controller');
        assert.strictEqual(getUsedResourcesMode(instanceWith({ declareUsedResources: 'false' })), 'controller');
        assert.strictEqual(getUsedResourcesMode(instanceWith({ declareUsedResources: null })), 'controller');
    });

    it('handles an instance without common', () => {
        assert.strictEqual(getUsedResourcesMode({} as Pick<ioBroker.InstanceObject, 'common'>), 'controller');
    });
});

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

    it('rejects an entry whose payload does not satisfy its type', () => {
        // e.g. persisted before registrations were validated - it would conflict with every tcpPort of the host
        assert.ok(!isRegisteredResource({ ...valid, data: {} }));
        assert.ok(!isRegisteredResource({ ...valid, data: { port: '8080' } }));
    });
});

describe('lib/usedResources: validateUsedResourceData', () => {
    const validate = (type: string, data: Record<string, unknown>, partial = false): string | undefined =>
        validateUsedResourceData(type as ioBroker.UsedResourceType, data, partial);

    it('accepts complete payloads of every known type', () => {
        assert.strictEqual(validate('serialPort', { port: '/dev/ttyUSB0', baudRate: 9600 }), undefined);
        assert.strictEqual(validate('tcpPort', { port: 1883, bind: '127.0.0.1', family: 4 }), undefined);
        assert.strictEqual(validate('udpPort', { port: 5683, family: 6 }), undefined);
        assert.strictEqual(
            validate('usb', { path: '/dev/bus/usb/001/004', vendorId: '10c4', productId: 'ea60' }),
            undefined,
        );
        assert.strictEqual(validate('bluetooth', { hci: 'hci0' }), undefined);
        assert.strictEqual(validate('gpio', { pin: 0 }), undefined);
    });

    it('refuses a registration without the identifying field, which would match every entry of its type', () => {
        assert.strictEqual(validate('tcpPort', {}), '"port" is required');
        assert.strictEqual(validate('tcpPort', { bind: '0.0.0.0' }), '"port" is required');
        assert.strictEqual(validate('serialPort', { baudRate: 9600 }), '"port" is required');
        assert.strictEqual(validate('usb', { vendorId: '10c4' }), '"path" is required');
        assert.strictEqual(validate('bluetooth', {}), '"hci" is required');
        assert.strictEqual(validate('gpio', {}), '"pin" is required');
    });

    it('treats an explicitly undefined field as not named', () => {
        // what a `{ port: this.config.port }` with an unset port looks like
        assert.strictEqual(validate('tcpPort', { port: undefined }), '"port" is required');
    });

    it('refuses values of the wrong type or out of range', () => {
        assert.strictEqual(
            validate('tcpPort', { port: '1883' }),
            '"port" must be an integer between 1 and 65535, got "1883"',
        );
        assert.ok(validate('tcpPort', { port: 0 }));
        assert.ok(validate('tcpPort', { port: 65_536 }));
        assert.ok(validate('udpPort', { port: 80.5 }));
        assert.ok(validate('tcpPort', { port: 80, bind: 1 }));
        assert.ok(validate('tcpPort', { port: 80, family: 5 }));
        assert.ok(validate('serialPort', { port: '' }));
        assert.ok(validate('serialPort', { port: '/dev/ttyUSB0', baudRate: -9600 }));
        assert.ok(validate('gpio', { pin: -1 }));
        assert.ok(validate('bluetooth', { hci: null }));
    });

    it('lets a filter leave fields out, but checks the ones it names', () => {
        assert.strictEqual(validate('tcpPort', {}, true), undefined);
        assert.strictEqual(validate('tcpPort', { bind: '127.0.0.1' }, true), undefined);
        // could never match a registered port
        assert.ok(validate('tcpPort', { port: '1883' }, true));
    });

    it('leaves fields alone that the type does not know', () => {
        assert.strictEqual(validate('tcpPort', { port: 1883, protocol: 'mqtt' }), undefined);
    });

    it('only requires a non-empty registration for a custom type', () => {
        assert.strictEqual(validate('canBus', { iface: 'can0' }), undefined);
        assert.strictEqual(validate('canBus', {}), 'the payload must name at least one field');
        assert.strictEqual(validate('canBus', { iface: undefined }), 'the payload must name at least one field');
        assert.strictEqual(validate('canBus', {}, true), undefined);
    });

    it('does not take a type named like an Object property for a known one', () => {
        assert.strictEqual(validate('constructor', {}), 'the payload must name at least one field');
        assert.strictEqual(validate('toString', {}), 'the payload must name at least one field');
    });

    it('refuses structured values, also in unknown fields and custom types', () => {
        assert.strictEqual(
            validate('usb', { path: { bus: 1 } }),
            '"path" must be a string, a number or a boolean, got {"bus":1}',
        );
        assert.ok(validate('tcpPort', { port: 1883, extra: [1] }));
        assert.ok(validate('canBus', { iface: { name: 'can0' } }));
        assert.ok(validate('canBus', { iface: null }));
        assert.ok(validate('canBus', { iface: Number.NaN }));
        assert.strictEqual(validate('canBus', { iface: 'can0', listenOnly: true, bitrate: 500_000 }), undefined);
    });
});

describe('lib/usedResources: normalizeUsedResourceData', () => {
    const normalize = (type: string, data: Record<string, unknown>, partial = false): unknown =>
        normalizeUsedResourceData(type as ioBroker.UsedResourceType, data, partial);

    it('stores a number field given as a string of digits as a number', () => {
        // e.g. a port taken from a text field of the configuration
        assert.deepStrictEqual(normalize('tcpPort', { port: '1883' }), { data: { port: 1883 } });
        assert.deepStrictEqual(normalize('udpPort', { port: ' 5683 ', family: '6' }), {
            data: { port: 5683, family: 6 },
        });
        assert.deepStrictEqual(normalize('serialPort', { port: 'COM3', baudRate: '9600' }), {
            data: { port: 'COM3', baudRate: 9600 },
        });
        assert.deepStrictEqual(normalize('gpio', { pin: '17' }), { data: { pin: 17 } });
    });

    it('brings the GPIO chip into one form', () => {
        // libgpiod addresses a chip by name, by number or by its device node
        for (const chip of ['gpiochip2', '2', 2, '/dev/gpiochip2', ' gpiochip2 ']) {
            assert.deepStrictEqual(normalize('gpio', { pin: 17, chip }), { data: { pin: 17, chip: 'gpiochip2' } });
        }
        // a chip addressed by its label stays as it is
        assert.deepStrictEqual(normalize('gpio', { pin: 17, chip: 'pinctrl-bcm2835' }), {
            data: { pin: 17, chip: 'pinctrl-bcm2835' },
        });
        assert.ok('error' in (normalize('gpio', { pin: 17, chip: '' }) as object));
        assert.ok('error' in (normalize('gpio', { pin: 17, chip: true }) as object));
    });

    it('normalizes a filter the same way', () => {
        assert.deepStrictEqual(normalize('tcpPort', { port: '1883' }, true), { data: { port: 1883 } });
    });

    it('converts only plain digits', () => {
        for (const port of ['0x50', '1e3', '', ' ', '80.5', '-80']) {
            assert.ok('error' in (normalize('tcpPort', { port }) as object), `"${port}" must be refused`);
        }
    });

    it('leaves strings alone where a string is expected, and fields of unknown meaning', () => {
        assert.deepStrictEqual(normalize('serialPort', { port: '3' }), { data: { port: '3' } });
        assert.deepStrictEqual(normalize('tcpPort', { port: 80, bind: '1' }), { data: { port: 80, bind: '1' } });
        assert.deepStrictEqual(normalize('canBus', { iface: '0' }), { data: { iface: '0' } });
    });

    it('drops fields set to undefined', () => {
        assert.deepStrictEqual(normalize('tcpPort', { port: 80, bind: undefined }), { data: { port: 80 } });
    });

    it('reports what is wrong', () => {
        assert.deepStrictEqual(normalize('tcpPort', {}), { error: '"port" is required' });
    });

    it('does not change the payload it was given', () => {
        const data = { port: '1883' };
        normalize('tcpPort', data);
        assert.deepStrictEqual(data, { port: '1883' });
    });
});

describe('lib/usedResources: resolveSerialPortName', () => {
    const links: Record<string, string> = {
        '/dev/serial/by-id/usb-Silicon_Labs_CP2102-if00-port0': '/dev/ttyUSB0',
        '/dev/serial0': '/dev/ttyAMA0',
    };
    const realpath = (path: string): Promise<string> =>
        path in links ? Promise.resolve(links[path]) : Promise.reject(new Error(`ENOENT: ${path}`));

    it('follows symlinks on Linux', async () => {
        assert.strictEqual(
            await resolveSerialPortName('/dev/serial/by-id/usb-Silicon_Labs_CP2102-if00-port0', 'linux', realpath),
            '/dev/ttyUSB0',
        );
        assert.strictEqual(await resolveSerialPortName('/dev/serial0', 'linux', realpath), '/dev/ttyAMA0');
    });

    it('keeps a name that cannot be resolved', async () => {
        // unplugged right now
        assert.strictEqual(await resolveSerialPortName('/dev/ttyUSB7', 'linux', realpath), '/dev/ttyUSB7');
        // not a path at all, e.g. a network coordinator
        let asked = false;
        const name = await resolveSerialPortName('tcp://192.168.1.10:6638', 'linux', path => {
            asked = true;
            return realpath(path);
        });
        assert.strictEqual(name, 'tcp://192.168.1.10:6638');
        assert.ok(!asked);
    });

    it('treats both nodes of a macOS port as one', async () => {
        assert.strictEqual(
            await resolveSerialPortName('/dev/cu.usbserial-1410', 'darwin', realpath),
            '/dev/tty.usbserial-1410',
        );
        assert.strictEqual(
            await resolveSerialPortName('/dev/tty.usbserial-1410', 'darwin', realpath),
            '/dev/tty.usbserial-1410',
        );
    });

    it('ignores the case and the device namespace prefix on Windows', async () => {
        assert.strictEqual(await resolveSerialPortName('com3', 'win32', realpath), 'COM3');
        assert.strictEqual(await resolveSerialPortName('\\\\.\\COM10', 'win32', realpath), 'COM10');
        assert.strictEqual(await resolveSerialPortName('\\\\?\\com4', 'win32', realpath), 'COM4');
    });
});

describe('lib/usedResources: withSerialPortDevice', () => {
    const resolveName = (name: string): Promise<string> => Promise.resolve(name.toUpperCase());

    it('keeps the name of a registration and adds the device', async () => {
        assert.deepStrictEqual(await withSerialPortDevice({ port: 'com3', baudRate: 9600 }, true, resolveName), {
            port: 'com3',
            baudRate: 9600,
            device: 'COM3',
        });
    });

    it('replaces a device sent by the adapter', async () => {
        assert.deepStrictEqual(await withSerialPortDevice({ port: 'com3', device: 'COM9' }, true, resolveName), {
            port: 'com3',
            device: 'COM3',
        });
    });

    it('turns a filter into a filter on the device', async () => {
        assert.deepStrictEqual(await withSerialPortDevice({ port: 'com3' }, false, resolveName), { device: 'COM3' });
        assert.deepStrictEqual(await withSerialPortDevice({ device: 'com3' }, false, resolveName), {
            device: 'COM3',
        });
        assert.deepStrictEqual(await withSerialPortDevice({ baudRate: 9600 }, false, resolveName), {
            baudRate: 9600,
        });
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
        // a port given as a string is converted on the way in, see normalizeUsedResourceData
        assert.ok(!matchesUsedResourceData(data, { port: '8080' }));
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

    it('recognizes a serial port under another name by its device', () => {
        const reg = newRegistry();
        reg.register(
            'serialPort',
            { port: '/dev/serial/by-id/usb-Silicon_Labs_CP2102-if00-port0', device: '/dev/ttyUSB0' },
            'zigbee.0',
        );

        const conflicts = reg.findConflicts('serialPort', { port: '/dev/ttyUSB0', device: '/dev/ttyUSB0' }, 'modbus.0');
        assert.deepStrictEqual(
            conflicts.map(entry => entry.instance),
            ['zigbee.0'],
        );
        assert.deepStrictEqual(reg.findConflicts('serialPort', { device: '/dev/ttyUSB1' }, 'modbus.0'), []);
    });

    it('reports a serial port opened with another baud rate', () => {
        const reg = newRegistry();
        reg.register('serialPort', { port: 'COM3', device: 'COM3', baudRate: 115_200 }, 'zigbee.0');

        // one port cannot be shared, whatever speed each instance talks with
        assert.strictEqual(
            reg.findConflicts('serialPort', { port: 'COM3', device: 'COM3', baudRate: 9600 }, 'modbus.0').length,
            1,
        );
    });

    it('reports a wildcard address against every address of that port', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 8080, bind: '0.0.0.0' }, 'web.0');

        // the socket on 0.0.0.0 holds 127.0.0.1:8080 as well, although neither payload is a subset of the other
        assert.strictEqual(reg.findConflicts('tcpPort', { port: 8080, bind: '127.0.0.1' }, 'other.0').length, 1);
        assert.strictEqual(reg.findConflicts('tcpPort', { port: 8080 }, 'other.0').length, 1);
        assert.deepStrictEqual(reg.findConflicts('tcpPort', { port: 8081, bind: '127.0.0.1' }, 'other.0'), []);
    });

    it('keeps two addresses of the same port apart', () => {
        const reg = newRegistry();
        reg.register('udpPort', { port: 5683, bind: '192.168.0.2' }, 'coap.0');

        assert.deepStrictEqual(reg.findConflicts('udpPort', { port: 5683, bind: '127.0.0.1' }, 'other.0'), []);
        assert.strictEqual(reg.findConflicts('udpPort', { port: 5683, bind: '192.168.0.2' }, 'other.0').length, 1);
        // an unnamed address asks about every address of that port
        assert.strictEqual(reg.findConflicts('udpPort', { port: 5683 }, 'other.0').length, 1);
    });

    it('treats the two address families as two sockets', () => {
        const reg = newRegistry();
        reg.register('tcpPort', { port: 8080, bind: '::', family: 6 }, 'web.0');

        assert.deepStrictEqual(reg.findConflicts('tcpPort', { port: 8080, family: 4 }, 'other.0'), []);
        assert.strictEqual(reg.findConflicts('tcpPort', { port: 8080, family: 6 }, 'other.0').length, 1);
        assert.strictEqual(reg.findConflicts('tcpPort', { port: 8080 }, 'other.0').length, 1);
    });

    it('sees the same USB device through the metadata around it', () => {
        const reg = newRegistry();
        reg.register('usb', { path: '/dev/bus/usb/001/004', vendorId: '10c4' }, 'zwave.0');

        // `vendorId` and `productId` describe the device, they do not make it a second one - and neither
        // payload is a subset of the other, so comparing them as a whole would report the device as free
        assert.strictEqual(
            reg.findConflicts('usb', { path: '/dev/bus/usb/001/004', productId: 'ea60' }, 'other.0').length,
            1,
        );
        assert.deepStrictEqual(reg.findConflicts('usb', { path: '/dev/bus/usb/001/005' }, 'other.0'), []);
    });

    it('keeps the pins of two GPIO chips apart', () => {
        const reg = newRegistry();
        reg.register('gpio', { pin: 17, chip: 'gpiochip2' }, 'expander.0');

        assert.deepStrictEqual(reg.findConflicts('gpio', { pin: 17, chip: 'gpiochip0' }, 'rpi.0'), []);
        assert.strictEqual(reg.findConflicts('gpio', { pin: 17, chip: 'gpiochip2' }, 'rpi.0').length, 1);
        // without a chip the host cannot tell which one is meant, so it warns rather than stays silent
        assert.strictEqual(reg.findConflicts('gpio', { pin: 17 }, 'rpi.0').length, 1);
        assert.deepStrictEqual(reg.findConflicts('gpio', { pin: 18 }, 'rpi.0'), []);
    });

    it('falls back to the name of a serial port without a resolved device', () => {
        const reg = newRegistry();
        reg.register('serialPort', { port: '/dev/ttyUSB0' }, 'zigbee.0');

        assert.strictEqual(reg.findConflicts('serialPort', { device: '/dev/ttyUSB0' }, 'modbus.0').length, 1);
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
