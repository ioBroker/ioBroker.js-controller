/**
 * In-memory registry of exclusive resources (serial ports, TCP/UDP ports, USB devices, ...) occupied by the
 * adapter instances running on a host.
 *
 * This module contains only the pure, side-effect-free bookkeeping logic so that it can be unit tested without
 * a running controller. Persistence into `system.host.<name>.usedResources.<type>` and the message handling
 * live in `main.ts`, which owns a single {@link UsedResourcesRegistry} instance and persists the resource types
 * that the mutating methods report as changed.
 */

// Both checks live in common-db: an adapter reading the registry states has to apply the same ones, and a
// second spelling of "is this an entry of the registry" in a second package is what drifts apart.
import { hasRegisteredResourceShape, isValidUsedResourceType } from '@iobroker/js-controller-common-db/tools';

export { isValidUsedResourceType };

/** Rule for one payload field of a known resource type */
interface PayloadFieldRule {
    /** Whether a registration has to name the field */
    required: boolean;
    /** What the value has to look like, for the error message */
    expected: string;
    /** Check the value of the field */
    isValid: (value: unknown) => boolean;
    /** Bring an incoming value into its stored form before it is checked, see {@link normalizeUsedResourceData} */
    normalize?: (value: unknown) => unknown;
}

const isString = (value: unknown): boolean => typeof value === 'string';
const isNonEmptyString = (value: unknown): boolean => typeof value === 'string' && value.trim() !== '';

/**
 * Payload values are flat: they identify a port, a path or a pin, and are compared with `===`.
 *
 * @param value the value of a payload field
 */
const isPrimitive = (value: unknown): boolean =>
    typeof value === 'string' || typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value));

/**
 * A number field may arrive as a string of digits, e.g. a port taken from a text field of the configuration.
 * Only plain digits are converted - `'0x50'` or `'1e3'` stay strings and are refused.
 *
 * @param value the incoming value of a number field
 */
const digitsToNumber = (value: unknown): unknown =>
    typeof value === 'string' && /^\s*\d+\s*$/.test(value) ? Number(value) : value;

/** The payload rules shared by `tcpPort` and `udpPort` */
const NETWORK_PORT_RULES: Record<
    keyof ioBroker.TcpPortResourceData & keyof ioBroker.UdpPortResourceData,
    PayloadFieldRule
> = {
    port: {
        required: true,
        expected: 'an integer between 1 and 65535',
        isValid: value => Number.isInteger(value) && (value as number) >= 1 && (value as number) <= 65_535,
        normalize: digitsToNumber,
    },
    bind: { required: false, expected: 'a string', isValid: isString },
    family: {
        required: false,
        expected: '4 or 6',
        isValid: value => value === 4 || value === 6,
        normalize: digitsToNumber,
    },
};

/**
 * The payload rules of every resource type known to the controller. Typed against `UsedResourceDataMap`, so a
 * new type or field there does not compile until it has a rule here.
 */
const PAYLOAD_RULES: {
    [T in keyof ioBroker.UsedResourceDataMap]: Record<keyof ioBroker.UsedResourceDataMap[T], PayloadFieldRule>;
} = {
    serialPort: {
        port: { required: true, expected: 'a non-empty string', isValid: isNonEmptyString },
        baudRate: {
            required: false,
            expected: 'a positive integer',
            isValid: value => Number.isInteger(value) && (value as number) > 0,
            normalize: digitsToNumber,
        },
        device: { required: false, expected: 'a non-empty string', isValid: isNonEmptyString },
    },
    tcpPort: NETWORK_PORT_RULES,
    udpPort: NETWORK_PORT_RULES,
    usb: {
        path: { required: true, expected: 'a non-empty string', isValid: isNonEmptyString },
        vendorId: { required: false, expected: 'a string', isValid: isString },
        productId: { required: false, expected: 'a string', isValid: isString },
    },
    bluetooth: {
        hci: { required: true, expected: 'a non-empty string', isValid: isNonEmptyString },
    },
    gpio: {
        pin: {
            required: true,
            expected: 'an integer >= 0 (the line offset on its chip)',
            isValid: value => Number.isInteger(value) && (value as number) >= 0,
            normalize: digitsToNumber,
        },
        chip: {
            required: false,
            expected: 'a non-empty string',
            isValid: isNonEmptyString,
            // "2", 2 and "/dev/gpiochip2" all mean the same chip
            normalize: value => {
                const name = typeof value === 'number' ? String(value) : typeof value === 'string' ? value.trim() : '';
                if (!name) {
                    return value;
                }
                const bare = name.replace(/^\/dev\//, '');
                return /^\d+$/.test(bare) ? `gpiochip${bare}` : bare;
            },
        },
    },
};

/**
 * Get the payload rules of a resource type.
 *
 * @param type the resource type
 * @returns the rules, or undefined for a custom type (module augmentation), of which nothing is known
 */
function getPayloadRules(type: ioBroker.UsedResourceType): Record<string, PayloadFieldRule> | undefined {
    // hasOwn, because a type like "constructor" is a valid identifier as well
    return Object.hasOwn(PAYLOAD_RULES, type) ? PAYLOAD_RULES[type] : undefined;
}

/**
 * Check a payload against the rules of its resource type.
 *
 * A registration (`partial` false) has to name every required field. Without them the payload would be a
 * wildcard: `{}` names no field, so as a filter it matches every entry of its type, and
 * {@link UsedResourcesRegistry.findConflicts}, which compares in both directions, would report such an entry as
 * a conflict with every resource of that type on the host. A filter for free/check (`partial` true) may leave
 * fields out, but the ones it names must have the right type - `{ port: '1883' }` could never match anything.
 *
 * Every value has to be a string, a finite number or a boolean - also of fields a type does not know and of a
 * custom type (module augmentation). Beyond that, fields a type does not know are left alone, and of a custom
 * type nothing is known, so a registration only has to name at least one field.
 *
 * This checks the stored form, so a string of digits in a number field is refused here - see
 * {@link normalizeUsedResourceData} for incoming payloads.
 *
 * @param type the resource type, e.g. "tcpPort"
 * @param data the payload
 * @param partial whether the payload is a filter instead of a complete description of the resource
 * @returns a description of the first problem, or undefined if the payload is valid
 */
export function validateUsedResourceData(
    type: ioBroker.UsedResourceType,
    data: Partial<ioBroker.UsedResourceData>,
    partial: boolean,
): string | undefined {
    const payload = data as unknown as Record<string, unknown>;

    // A payload that arrived as JSON can carry `__proto__` as an own key. Copying that onto an ordinary object
    // sets the prototype instead of a property: the required field would then be found through the prototype
    // chain while the payload itself stays empty, which is the wildcard entry this validation exists to keep
    // out. No resource is described by such a field, so it is refused by name.
    if (Object.hasOwn(payload, '__proto__')) {
        return '"__proto__" is not a field name a payload may use';
    }

    for (const [field, value] of Object.entries(payload)) {
        if (value !== undefined && !isPrimitive(value)) {
            return `"${field}" must be a string, a number or a boolean, got ${JSON.stringify(value)}`;
        }
    }

    const rules = getPayloadRules(type);
    if (!rules) {
        if (!partial && !Object.values(payload).some(value => value !== undefined)) {
            return 'the payload must name at least one field';
        }
        return undefined;
    }

    for (const [field, rule] of Object.entries(rules)) {
        // own properties only: a payload from a message can carry `__proto__`, and reading through the
        // prototype chain would let a required field be satisfied by something that is not in the payload
        const value = Object.hasOwn(payload, field) ? payload[field] : undefined;
        // an explicitly undefined field counts as not named, like everywhere else in the registry
        if (value === undefined) {
            if (rule.required && !partial) {
                return `"${field}" is required`;
            }
            continue;
        }
        if (!rule.isValid(value)) {
            return `"${field}" must be ${rule.expected}, got ${JSON.stringify(value)}`;
        }
    }

    return undefined;
}

/**
 * Bring an incoming payload into its stored form and check it (see {@link validateUsedResourceData}).
 *
 * A number field of a known type also accepts a string of digits and stores it as a number, so a port taken
 * from a text field of the configuration still is the same port as one given as a number. Everything is
 * converted once on the way in, which is what lets {@link matchesUsedResourceData} compare strictly and keeps it
 * in line with {@link getUsedResourceKey}. Fields set to `undefined` are dropped.
 *
 * @param type the resource type, e.g. "tcpPort"
 * @param data the payload as it arrived
 * @param partial whether the payload is a filter instead of a complete description of the resource
 * @returns the normalized copy of the payload, or a description of the first problem
 */
export function normalizeUsedResourceData(
    type: ioBroker.UsedResourceType,
    data: object,
    partial: boolean,
): { data: Partial<ioBroker.UsedResourceData> } | { error: string } {
    const rules = getPayloadRules(type);
    const normalized: Record<string, unknown> = {};
    for (const [field, value] of Object.entries(data)) {
        if (field === '__proto__') {
            // Refused here rather than below, because the assignment itself is the problem: it would set the
            // prototype of `normalized` instead of adding a property, and what is left to check is an empty
            // payload whose required field answers through the prototype chain.
            return { error: '"__proto__" is not a field name a payload may use' };
        }
        if (value === undefined) {
            continue;
        }
        const normalize = rules && Object.hasOwn(rules, field) ? rules[field].normalize : undefined;
        normalized[field] = normalize ? normalize(value) : value;
    }

    const error = validateUsedResourceData(type, normalized, partial);
    return error ? { error } : { data: normalized };
}

/**
 * Resolve the name of a serial port to the device it denotes, so that two names of the same port are recognized
 * as one: `/dev/serial/by-id/...` and `/dev/serial0` are symlinks to a `/dev/ttyUSB0` or `/dev/ttyAMA0`, macOS
 * has a `/dev/cu.*` and a `/dev/tty.*` node for every port, and Windows neither cares about the case of `COM3`
 * nor about a `\\.\` in front of it.
 *
 * A name that cannot be resolved - the device is unplugged, or the name is no path at all like `tcp://...` - is
 * returned as it is.
 *
 * @param name the name of the serial port, as an adapter opens it
 * @param platform the platform of the host the port belongs to
 * @param realpath resolves the symlinks of a path, e.g. `fs.promises.realpath`
 * @returns the name of the device
 */
export async function resolveSerialPortName(
    name: string,
    platform: NodeJS.Platform,
    realpath: (path: string) => Promise<string>,
): Promise<string> {
    if (platform === 'win32') {
        return name.replace(/^\\\\[.?]\\/, '').toUpperCase();
    }
    if (!name.startsWith('/')) {
        return name;
    }

    let resolved = name;
    try {
        resolved = await realpath(name);
    } catch {
        // not present right now - then the name is all there is to compare
    }

    // both nodes of a macOS port lead to the same device
    return platform === 'darwin' ? resolved.replace(/^\/dev\/cu\./, '/dev/tty.') : resolved;
}

/**
 * Put the device a serial port resolves to into its payload - the device is what identifies the port.
 *
 * A registration keeps the `port` it was given, because `/dev/serial/by-id/...` tells the user more than
 * `/dev/ttyUSB0` and survives a replug, and gets the resolved `device` next to it; a `device` sent by the adapter
 * is replaced. A filter is turned into a filter on `device`, so it finds the port under whatever name it was
 * registered.
 *
 * @param data the normalized payload of a serial port
 * @param isRegistration whether the payload registers the port or is a filter
 * @param resolveName resolves the name of a port, see {@link resolveSerialPortName}
 * @returns the payload with the resolved device
 */
export async function withSerialPortDevice(
    data: Partial<ioBroker.SerialPortResourceData>,
    isRegistration: boolean,
    resolveName: (name: string) => Promise<string>,
): Promise<Partial<ioBroker.SerialPortResourceData>> {
    const { port, device, ...rest } = data;
    const name = isRegistration ? port : (port ?? device);
    if (name === undefined) {
        return rest;
    }

    const resolved = await resolveName(name);
    return isRegistration ? { ...rest, port: name, device: resolved } : { ...rest, device: resolved };
}

/**
 * The part of a payload that identifies a resource when looking for conflicts.
 *
 * Some types have fields that describe a resource without making it a different one - the baud rate a serial
 * port is opened with, the vendor of a USB device. Comparing the payload as a whole would let those hide a
 * conflict: neither of two entries is a subset of the other, so the same device would be reported as free.
 *
 * A serial port is therefore identified by its resolved device alone, a USB device by its path. Everything
 * else is compared as a whole, which is also what a custom type has to fall back to.
 *
 * @param type the resource type
 * @param data the payload
 */
function getConflictIdentity(
    type: ioBroker.UsedResourceType,
    data: Partial<ioBroker.UsedResourceData>,
): Partial<ioBroker.UsedResourceData> {
    if (type === 'serialPort') {
        const { device, port } = data as Partial<ioBroker.SerialPortResourceData>;
        // an entry without a resolved device - registered directly, not through the host - falls back to its name
        const name = device ?? port;

        return name === undefined ? {} : { device: name };
    }

    if (type === 'usb') {
        const { path } = data as Partial<ioBroker.UsbResourceData>;

        return path === undefined ? {} : { path };
    }

    return data;
}

/** Addresses a socket binds to when it wants every address of the host */
const WILDCARD_BIND_ADDRESSES = new Set(['0.0.0.0', '::', '*', '']);

/**
 * Whether two bind addresses can be held at the same time on one port.
 *
 * An address that is not named asks about every address, and a wildcard occupies every address - so
 * `0.0.0.0:8080` and `127.0.0.1:8080` collide, while `192.168.0.2:8080` and `127.0.0.1:8080` do not.
 *
 * @param a the bind address of one payload
 * @param b the bind address of the other payload
 */
function bindAddressesOverlap(a: string | undefined, b: string | undefined): boolean {
    if (a === undefined || b === undefined) {
        return true;
    }
    return WILDCARD_BIND_ADDRESSES.has(a.trim()) || WILDCARD_BIND_ADDRESSES.has(b.trim()) || a === b;
}

/**
 * Whether two `tcpPort` / `udpPort` payloads describe sockets that cannot both exist.
 *
 * Plain field equality is not enough here: the operating system hands out a port per address, so the wildcard
 * addresses have to be taken into account, while two different address families are two different sockets.
 * Fields neither type knows do not keep the sockets apart - the port is what is occupied.
 *
 * @param a one payload
 * @param b the other payload
 */
function networkPortsOverlap(
    a: Partial<ioBroker.TcpPortResourceData>,
    b: Partial<ioBroker.TcpPortResourceData>,
): boolean {
    // a filter that does not name the port asks about every port of its type
    if (a.port !== undefined && b.port !== undefined && a.port !== b.port) {
        return false;
    }
    if (a.family !== undefined && b.family !== undefined && a.family !== b.family) {
        return false;
    }
    return bindAddressesOverlap(a.bind, b.bind);
}

/**
 * Whether two payloads of the same resource type describe a resource that only one of them can have.
 *
 * @param type the resource type
 * @param a one payload
 * @param b the other payload
 */
function usedResourcesOverlap(
    type: ioBroker.UsedResourceType,
    a: Partial<ioBroker.UsedResourceData>,
    b: Partial<ioBroker.UsedResourceData>,
): boolean {
    if (type === 'tcpPort' || type === 'udpPort') {
        return networkPortsOverlap(
            a as Partial<ioBroker.TcpPortResourceData>,
            b as Partial<ioBroker.TcpPortResourceData>,
        );
    }

    // everything else overlaps when one payload describes a subset of the other
    const identityA = getConflictIdentity(type, a);
    const identityB = getConflictIdentity(type, b);
    return matchesUsedResourceData(identityA, identityB) || matchesUsedResourceData(identityB, identityA);
}

/**
 * Check that a value has the shape of a registered resource with a valid payload. Used when reading entries back
 * from the persisted state, so that malformed or outdated content cannot enter the registry.
 *
 * @param entry the value to check
 */
export function isRegisteredResource(entry: unknown): entry is ioBroker.RegisteredResource {
    // the shape is what both ends check; the payload rules are the host's own
    return hasRegisteredResourceShape(entry) && validateUsedResourceData(entry.type, entry.data, false) === undefined;
}

/**
 * Build a stable comparison key for a registered resource so that duplicates can be detected and the correct
 * entry can be freed. The key is composed of the instance, the type and the sorted payload; the bookkeeping
 * fields (`ts`, `isBlocked`) are intentionally ignored so that re-registering or (un)blocking hits the same entry.
 *
 * Payload values are serialized with `JSON.stringify`, so `80` and `"80"` stay distinguishable, and keys with
 * an `undefined` value are dropped, so passing an optional field explicitly as `undefined` produces the same
 * key as omitting it (which is also what survives the JSON round-trip through the persisted state).
 *
 * @param resource the resource to build the key for
 * @param resource.type the resource type, e.g. "serialPort"
 * @param resource.instance the instance that occupies the resource, e.g. "mqtt.0"
 * @param resource.data the type-specific payload describing the resource
 */
export function getUsedResourceKey(resource: {
    type: ioBroker.UsedResourceType;
    instance: string;
    data: ioBroker.UsedResourceData | undefined;
}): string {
    const { type, instance } = resource;
    const data = (resource.data || {}) as Record<string, unknown>;
    const sorted = Object.keys(data)
        .filter(key => data[key] !== undefined)
        .sort()
        .map(key => `${key}=${JSON.stringify(data[key])}`)
        .join(',');
    return `${instance}|${type}|${sorted}`;
}

/**
 * Check whether a registered payload matches a filter: every field the filter names must be equal, fields it
 * does not name are ignored. An omitted or empty filter matches everything.
 *
 * Values are primitives in their stored form - {@link normalizeUsedResourceData} already turned a port given as
 * `'80'` into `80` - so they are compared strictly, like {@link getUsedResourceKey} keeps them apart. A field
 * explicitly set to `undefined` counts as not named, because that is also what survives the JSON round-trip
 * through the persisted state.
 *
 * @param data the payload of a registered resource
 * @param filter the fields that have to match
 */
export function matchesUsedResourceData(
    data: Partial<ioBroker.UsedResourceData>,
    filter: Partial<ioBroker.UsedResourceData> | undefined,
): boolean {
    if (!filter) {
        return true;
    }

    const entries = data as unknown as Record<string, unknown>;
    for (const [key, value] of Object.entries(filter as Record<string, unknown>)) {
        if (value === undefined) {
            continue;
        }
        if (entries[key] !== value) {
            return false;
        }
    }

    return true;
}

/**
 * Who keeps the used resources of an instance in the registry:
 * - `adapter`: the adapter declares them itself via `registerUsedResource(...)`
 * - `controller`: the controller derives them from `native.port` / `native.bind`
 * - `none`: the instance has no entries at all
 */
export type UsedResourcesMode = 'adapter' | 'controller' | 'none';

/**
 * Determine who keeps the used resources of an instance in the registry, from its `common.declareUsedResources`.
 *
 * Only an explicit `false` opts out - it is meant for an adapter whose `native.port` is not a port it listens on,
 * e.g. the port of the device it connects to, which the controller would otherwise list as occupied.
 *
 * @param instance the instance object
 */
export function getUsedResourcesMode(instance: Pick<ioBroker.InstanceObject, 'common'>): UsedResourcesMode {
    const declare = instance.common?.declareUsedResources;
    if (declare === true) {
        return 'adapter';
    }
    return declare === false ? 'none' : 'controller';
}

/** Options for the {@link UsedResourcesRegistry} */
export interface UsedResourcesRegistryOptions {
    /** Clock used for the `ts` of newly registered resources. Injectable for deterministic tests. Defaults to `Date.now`. */
    now?: () => number;
}

/**
 * Pure in-memory registry of the used resources of a single host.
 *
 * All mutating methods return the list of resource types they changed, so the caller can persist exactly those
 * (and only those) types. Nothing here touches the databases.
 */
export class UsedResourcesRegistry {
    private readonly resources = new Map<ioBroker.UsedResourceType, ioBroker.RegisteredResource[]>();
    private readonly now: () => number;

    /**
     * @param options optional configuration, e.g. an injectable clock for deterministic tests
     */
    constructor(options: UsedResourcesRegistryOptions = {}) {
        this.now = options.now ?? Date.now;
    }

    /**
     * Replace the whole list of a resource type. Used when loading the persisted state back into memory.
     *
     * @param type the resource type
     * @param list the resources of that type
     */
    setType(type: ioBroker.UsedResourceType, list: ioBroker.RegisteredResource[]): void {
        this.setEntries(type, list);
    }

    /**
     * Store the entries of a resource type, dropping the type entirely when nothing is left. An empty bucket
     * would otherwise be reported by {@link UsedResourcesRegistry.getTypes} and be persisted and reloaded
     * forever, for every type any instance of this host ever used.
     *
     * @param type the resource type
     * @param list the remaining resources of that type
     */
    private setEntries(type: ioBroker.UsedResourceType, list: ioBroker.RegisteredResource[]): void {
        if (list.length) {
            this.resources.set(type, list);
        } else {
            this.resources.delete(type);
        }
    }

    /** All resource types that currently hold at least one entry. */
    getTypes(): ioBroker.UsedResourceType[] {
        return [...this.resources.keys()];
    }

    /**
     * Get the registered resources, optionally filtered by type.
     *
     * The entries are deep copies, so a caller cannot reach into the registry through the nested `data` of a
     * returned entry.
     *
     * @param type optional resource type to filter for; if omitted, resources of all types are returned
     */
    get(type?: ioBroker.UsedResourceType): ioBroker.RegisteredResource[] {
        const clone = (r: ioBroker.RegisteredResource): ioBroker.RegisteredResource => structuredClone(r);
        if (type) {
            return (this.resources.get(type) || []).map(clone);
        }
        const all: ioBroker.RegisteredResource[] = [];
        for (const list of this.resources.values()) {
            all.push(...list.map(clone));
        }
        return all;
    }

    /**
     * Register a resource as used by an instance.
     *
     * Registering is always **additive**: an instance registers one entry per resource it occupies, in any
     * order and from any number of async init paths. Dropping what an instance registered earlier is a
     * separate, explicit operation ({@link UsedResourcesRegistry.removeInstance}), which the controller
     * performs once when the instance starts.
     *
     * @param type the resource type, e.g. "serialPort"
     * @param data the type-specific payload describing the resource
     * @param instance the instance that occupies the resource, e.g. "mqtt.0"
     * @returns the resource types that changed and should be persisted
     */
    register<T extends ioBroker.UsedResourceType>(
        type: T,
        data: ioBroker.UsedResourceData<T>,
        instance: string,
    ): ioBroker.UsedResourceType[] {
        // an instance can only register a resource while it is running, so it is actively blocking it.
        // `satisfies` checks the shape against the entry for exactly this `type`; the cast afterwards only
        // widens it to the stored union, which TypeScript cannot derive from the generic on its own.
        const resource = {
            type,
            data,
            instance,
            ts: this.now(),
            isBlocked: true,
        } satisfies ioBroker.RegisteredResource<T> as ioBroker.RegisteredResource;

        const list = this.resources.get(type) || [];
        const key = getUsedResourceKey(resource);
        const existingIndex = list.findIndex(entry => getUsedResourceKey(entry) === key);

        if (existingIndex === -1) {
            list.push(resource);
        } else {
            // refresh the timestamp and blocking flag of an already known resource
            list[existingIndex] = resource;
        }

        this.setEntries(type, list);
        return [type];
    }

    /**
     * Find the resources of *other* instances that overlap with the given description and are
     * currently held.
     *
     * This is a hint, not a verdict. The registry only knows what adapters declare: a port may be
     * occupied by something outside ioBroker, and an adapter may declare a resource it never opens.
     * So an empty result does not promise the resource is free - it only says nobody claimed it here.
     *
     * Only entries with `isBlocked` are considered, because an entry of a stopped instance means
     * "would occupy this when started" and must not stand in the way of an instance that runs now.
     * Two payloads overlap when one describes a subset of the other, so `{ port: 1883 }` conflicts
     * with `{ port: 1883, bind: '0.0.0.0' }`. Two types are compared by what really cannot be shared
     * instead: a network port by port, bind address and family (see {@link networkPortsOverlap}), a
     * serial port by its resolved device (see {@link getConflictIdentity}).
     *
     * @param type the resource type, e.g. "tcpPort"
     * @param data the description of the resource that is about to be used
     * @param instance the instance that asks, e.g. "mqtt.0" - its own entries never conflict
     * @returns the conflicting entries, newest registration first
     */
    findConflicts<T extends ioBroker.UsedResourceType>(
        type: T,
        data: Partial<ioBroker.UsedResourceData<T>>,
        instance: string,
    ): ioBroker.RegisteredResource[] {
        const list = this.resources.get(type);
        if (!list) {
            return [];
        }

        return list
            .filter(
                entry => entry.instance !== instance && entry.isBlocked && usedResourcesOverlap(type, entry.data, data),
            )
            .map(entry => structuredClone(entry))
            .sort((a, b) => b.ts - a.ts);
    }

    /**
     * Free the resources of an instance that match a description.
     *
     * `data` is a **filter, not an exact payload**: every field it names must match, fields it does not name
     * are ignored. So `free('tcpPort', { port: 8080 }, 'web.0')` also frees an entry that was registered as
     * `{ port: 8080, bind: '0.0.0.0' }` - the caller does not have to repeat optional fields it may not even
     * know about (the controller adds `bind` to the resources it derives itself). An omitted or empty `data`
     * matches everything, which frees all resources of that type for the instance.
     *
     * Only the entries of `instance` are ever considered, so a filter can never reach a foreign registration.
     *
     * @param type the resource type, e.g. "serialPort"
     * @param data the fields identifying the resources to free; if omitted, all resources of `type` for the instance are freed
     * @param instance the instance that occupied the resource, e.g. "mqtt.0"
     * @returns the resource types that changed and should be persisted - empty if nothing matched
     */
    free<T extends ioBroker.UsedResourceType>(
        type: T,
        data: Partial<ioBroker.UsedResourceData<T>> | undefined,
        instance: string,
    ): ioBroker.UsedResourceType[] {
        const list = this.resources.get(type);
        if (!list) {
            return [];
        }

        const filtered = list.filter(
            entry => entry.instance !== instance || !matchesUsedResourceData(entry.data, data),
        );

        if (filtered.length === list.length) {
            return [];
        }

        this.setEntries(type, filtered);
        return [type];
    }

    /**
     * Update the `isBlocked` flag of all resources of an instance across all types. Called on instance start
     * (blocked) and stop (not blocked): a stopped instance keeps its registrations, but they are no longer held.
     *
     * @param instance the instance whose resources should be updated, e.g. "mqtt.0"
     * @param isBlocked whether the instance is currently running and actively using the resources
     * @returns the resource types that changed and should be persisted
     */
    setInstanceBlocked(instance: string, isBlocked: boolean): ioBroker.UsedResourceType[] {
        const changed: ioBroker.UsedResourceType[] = [];
        for (const [type, list] of this.resources) {
            let typeChanged = false;
            for (const entry of list) {
                if (entry.instance === instance && entry.isBlocked !== isBlocked) {
                    entry.isBlocked = isBlocked;
                    typeChanged = true;
                }
            }
            if (typeChanged) {
                changed.push(type);
            }
        }
        return changed;
    }

    /**
     * Remove all resources registered by the given instance across all types.
     *
     * Used when an instance is deleted or moved to another host, and once when an instance starts: the user
     * may have changed the settings in between, so what the instance registered before is dropped and the
     * instance (or the controller) declares from scratch what it really occupies now.
     *
     * @param instance the instance whose resources should be removed, e.g. "mqtt.0"
     * @returns the resource types that changed and should be persisted
     */
    removeInstance(instance: string): ioBroker.UsedResourceType[] {
        const changed: ioBroker.UsedResourceType[] = [];
        for (const [type, list] of this.resources) {
            if (list.some(entry => entry.instance === instance)) {
                this.setEntries(
                    type,
                    list.filter(entry => entry.instance !== instance),
                );
                changed.push(type);
            }
        }
        return changed;
    }

    /**
     * Assessment run on controller start: reset every `isBlocked` flag to `false` (no instance is running yet)
     * and drop resources whose instance no longer exists (e.g. deleted via CLI while the controller was down).
     *
     * @param existingInstances the namespaces of the instances that currently exist, e.g. `new Set(['mqtt.0'])`
     * @returns the resource types that changed and should be persisted
     */
    assess(existingInstances: Set<string>): ioBroker.UsedResourceType[] {
        const changed: ioBroker.UsedResourceType[] = [];
        for (const [type, list] of this.resources) {
            const cleaned = list
                .filter(entry => existingInstances.has(entry.instance))
                .map(entry => (entry.isBlocked ? { ...entry, isBlocked: false } : entry));

            const wasChanged = cleaned.length !== list.length || list.some(entry => entry.isBlocked);
            if (wasChanged) {
                this.setEntries(type, cleaned);
                changed.push(type);
            }
        }
        return changed;
    }
}
