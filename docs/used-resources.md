# Used Resources Registry

A central registry of the **statically occupied exclusive resources** of adapter instances — resources that
can only be claimed by a single instance at a time (serial ports, TCP/UDP ports, USB devices, Bluetooth/HCI
adapters, GPIO pins, …).

**Static** is the important word: the registry answers "which resource is spoken for, so which one can I still
choose?". That only works for resources an instance occupies by configuration or by a fixed decision — a
listening port taken from the configuration, the serial port a device is wired to. Resources that are assigned
dynamically at runtime (an ephemeral source port of an outgoing connection, a port the OS hands out when you
bind to `0`) do not belong in here: nobody can collide with them, and they would only add noise.

## Why

Without this registry there is no reliable way to tell which serial port, network port, or hardware device is
already occupied by an existing instance. When a user configures a **new** instance they have to guess, which
leads to conflicts, silent failures, and hard-to-debug "device busy" errors.

The registry gives the user (and the admin UI) a clear overview of occupied vs. free resources per host, so a
free one can be picked confidently when creating or reconfiguring an instance.

## Who fills the registry

There are two ways an instance's resources end up in the registry:

- **Controller-managed (the default)** — `native.port` is the established ioBroker convention for the port an
  instance listens on, and js-controller uses it: without any adapter change, the configured `native.port`
  (plus `native.bind`, if set) is listed as a `tcpPort`. Because the source is the **configuration** and not a
  running process, the port is listed for an instance that was never started or is currently stopped as well,
  and a changed `native.port` is picked up immediately instead of at the next restart.
- **Adapter-declared** — the adapter sets `common.declareUsedResources: true` in its `io-package.json` and
  calls `registerUsedResource(...)` / `freeUsedResource(...)` itself. Use this whenever the occupied resources
  are something other than the configured `native.port`: a serial port, several ports, a UDP port, a USB
  device. The controller then derives nothing for that instance — the adapter knows best what it really opens.

Whether the controller supports the registry at all can be checked with
`adapter.supportsFeature('CONTROLLER_USED_RESOURCES')`.

## How it works

1. A running adapter declares the resources it occupies by calling `registerUsedResource(...)`; for an
   instance without `common.declareUsedResources` the host derives the entries from the instance object instead.
2. The call is forwarded to the **host the instance runs on**. Only the host mutates the registry, which keeps
   it consistent across all instances (no races between adapters).
3. The host keeps the registry in memory and mirrors it into the state's DB under
   `system.host.<hostname>.usedResources.<type>` (one state per resource type, a JSON array of entries).
4. Reading is done directly from those states — no round-trip to the host — via `getHostUsedResources(...)`.

```
 Adapter                          Host (js-controller)                 States DB
 ───────                          ────────────────────                 ─────────
 registerUsedResource()  ───push──▶ registry (in memory) ──persist──▶ system.host.<h>.usedResources.<type>
 freeUsedResource()      ───push──▶ registry (in memory) ──persist──▶            ▲
 getHostUsedResources() ───────────────read states directly──────────────────────┘
```

## Adapter API

```ts
registerUsedResource<T extends ioBroker.UsedResourceType>(
    type: T,
    data: ioBroker.UsedResourceData<T>,
): Promise<void>;

freeUsedResource<T extends ioBroker.UsedResourceType>(
    type: T,
    data?: Partial<ioBroker.UsedResourceData<T>>,
): Promise<void>;

clearUsedResources(): Promise<void>;

getHostUsedResources<T extends ioBroker.UsedResourceType>(
    type: T,
): Promise<ioBroker.RegisteredResource<T>[]>;
getHostUsedResources(): Promise<ioBroker.RegisteredResource[]>;
```

The `type` selects the resource kind; `data` is the **strictly typed** payload for that kind (see
[Resource types](#resource-types)). Passing a payload that does not match the `type` is a compile-time error.

The three mutating calls always act on **this instance** — an instance can neither register nor free anything
in the name of another one. `getHostUsedResources` is the one that reads across the whole **host**, which is
why it carries `Host` in its name.

### `registerUsedResource(type, data)`

Registers a resource as occupied by this instance. Call it on adapter start-up once the resource is actually
open.

Registering is **additive**: one call per occupied resource, in any order, from any number of async init
paths. There is nothing to reset by hand — the host drops what this instance registered before **whenever the
instance starts**, so a registration from a previous configuration cannot survive a restart:

```ts
// on adapter start, in any order and from wherever the resource actually opens:
await this.registerUsedResource('serialPort', { port: '/dev/ttyUSB0', baudRate: 9600 });
await this.registerUsedResource('tcpPort', { port: 1883 });
await this.registerUsedResource('tcpPort', { port: 8081 });
```

### `freeUsedResource(type, data?)`

Frees previously registered resources of this instance. `data` is a **filter, not the exact payload**: every
field it names must match, fields it does not name are ignored. If `data` is omitted (or empty), **all**
resources of the given `type` for this instance are freed.

```ts
await this.freeUsedResource('tcpPort', { port: 8081 }); // every tcpPort 8081 of this instance,
//                                                         whatever it was registered with besides the port
await this.freeUsedResource('tcpPort', { port: 8081, bind: '127.0.0.1' }); // only the one on that address
await this.freeUsedResource('serialPort'); // all serial ports of this instance
```

That the payload is a filter matters in practice: you do not have to repeat optional fields you may not even
know about — the controller adds `bind` to the resources it derives from `native.bind` itself, and a `free`
call that had to match it byte for byte would silently free nothing.

A filter that matches nothing is **logged as a warning by the host** (`freed no used resource of type …`).
The adapter call itself does not wait for the host, so its promise resolves either way — the log is where a
wrong filter becomes visible.

You normally do not need to call this on shutdown — the host handles stop/crash automatically (see
[Lifecycle](#lifecycle)). Use it when an instance releases a resource while it keeps running.

### `clearUsedResources()`

Frees **all** resources this instance registered, across every type. Needed neither on start-up (the host
already resets the registrations of a starting instance) nor on shutdown; use it when the instance drops
everything it occupied while it keeps running, e.g. on a reconfiguration.

### `getHostUsedResources(type?)`

Returns the resources currently registered on the host this instance runs on, across **all** instances of that
host, so an overview can be presented. With a `type` only that kind is read, without one the resources of every
type. Reads directly from the state's DB.

```ts
const all = await this.getHostUsedResources(); // every occupied resource on this host
const serial = await this.getHostUsedResources('serialPort'); // only serial ports

const wantedPort = 1883;
const inUse = (await this.getHostUsedResources('tcpPort')).some(r => r.data.port === wantedPort && r.isBlocked);
```

## Registered resource shape

The read method returns entries of type `ioBroker.RegisteredResource`: the typed payload in `data` plus these
bookkeeping fields:

| Field       | Type    | Meaning                                                                                                                                   |
| ----------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `type`      | string  | The resource type, e.g. `"serialPort"`.                                                                                                   |
| `data`      | object  | The type-specific payload, exactly as passed to `registerUsedResource`, e.g. `{ port: '/dev/ttyUSB0' }`.                                   |
| `instance`  | string  | The instance that occupies the resource, e.g. `"mqtt.0"`.                                                                                 |
| `ts`        | number  | Timestamp (ms) when the resource was registered.                                                                                          |
| `isBlocked` | boolean | `true`: the instance is running and actively holding the resource. `false`: the instance is not running and would maybe occupy it when started — "maybe", because its configuration can still change before that. |

```ts
{ type: 'tcpPort', data: { port: 1883 }, instance: 'mqtt.0', ts: 1723632000000, isBlocked: true }
```

The payload is **nested** and not merged into the entry, so a payload key can never shadow a bookkeeping
field: whatever keys a resource type uses now or in the future, `type`, `instance`, `ts` and `isBlocked`
always describe the registration itself. `type` also stays a reliable discriminator — narrowing on it narrows
`data` to the matching payload type.

`isBlocked` lets the UI distinguish an **actively used** resource from one that is merely **reserved** by a
currently stopped instance.

## Lifecycle

The host (js-controller) keeps the registry and `isBlocked` in sync with the instance lifecycle:

| Event                                              | Effect on the registry                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Instance created / `native` changed (controller-managed) | entries are re-derived from the configuration, `isBlocked` reflects whether it runs     |
| Instance start (adapter-managed)                   | previous registrations of this instance are dropped; the adapter registers what it uses now |
| adapter `registerUsedResource(...)`                | entry added with `isBlocked = true` (additive)                                             |
| Instance start (controller-managed)                | the derived entries are set to `isBlocked = true`                                          |
| Instance stop / crash (process exit)               | entries are **kept**, but set to `isBlocked = false`                                       |
| Instance deleted or moved to another host          | all entries of the instance are removed by the host                                        |
| Instance deleted via CLI                           | the CLI removes the instance's entries from the registry states of the hosts that are **down** - a running host does that itself |
| Controller restart                                 | registry is restored from states, an assessment runs (see below) and the controller-managed entries are re-derived |

An adapter-managed resource is only recorded once the instance **runs** and its adapter registers it — the
adapter is the only one that knows what it really opened. A controller-managed resource comes from the
instance configuration and is therefore listed as soon as it is configured, which is what makes "pick a port
that is still free" work while setting up a new instance.

### Controller start assessment

On controller start the registry is restored from `system.host.<host>.usedResources.*` and then cleaned up:

- **all `isBlocked` flags are reset to `false`** — at start no instance is running yet; each instance re-blocks
  its resources when it starts;
- **entries of instances that no longer exist are removed** — e.g. an instance deleted via the CLI while the
  controller was down (belt-and-suspenders together with the CLI cleanup);
- **malformed entries are dropped** — anything that does not have the shape of a `RegisteredResource`;
- **controller-managed entries are re-derived** from the instance objects of this host, so the registry
  matches the current configuration even if it changed while the controller was down.

## Storage layout

For every resource type in use there is one state on the host:

```
system.host.<hostname>.usedResources.<type>
```

The state value is a JSON-serialized array of `RegisteredResource` entries (object type `state`,
`common.type = 'array'`, `common.role = 'json'`, read-only). The object is created the first time the host
writes that type; afterwards only the state is written.

When the last entry of a type disappears, the state stays and holds `[]` — a reader that subscribed to it
still sees the change. Writes of the same type are serialized by the host, so a state never falls back to
older content.

## Resource types

Each resource type has its own strictly typed payload. The types are defined in
`@iobroker/types-dev` (`packages/types-dev/index.d.ts`) via the `UsedResourceDataMap` interface:

| Type         | Payload (`UsedResourceData<type>`)                        |
| ------------ | --------------------------------------------------------- |
| `serialPort` | `{ port: string; baudRate?: number }`                     |
| `tcpPort`    | `{ port: number; bind?: string }`                         |
| `udpPort`    | `{ port: number; bind?: string }`                         |
| `usb`        | `{ path: string; vendorId?: string; productId?: string }` |
| `bluetooth`  | `{ hci: string }`                                         |
| `gpio`       | `{ pin: number }`                                         |

### Adding a new resource type

1. Add a payload interface and a `UsedResourceDataMap` entry in `packages/types-dev/index.d.ts`:

    ```ts
    /** A CAN bus interface occupied by an instance */
    interface CanBusResourceData {
        /** Interface name, e.g. "can0" */
        iface: string;
    }

    interface UsedResourceDataMap {
        // ...existing entries...
        canBus: CanBusResourceData;
    }
    ```

2. No controller or adapter change is required — `UsedResourceType`, `UsedResourceData<T>` and
   `RegisteredResource<T>` derive from the map, and the host stores/reads the type generically.

The map is also open for module augmentation, so an adapter that owns a custom resource can extend it in its
own type declarations.

## Message protocol (internal)

`registerUsedResource` and `freeUsedResource` are sent to the host via the states message box (`pushMessage` to
`system.host.<hostname>`), because only the host may mutate the registry:

| Command                | Message payload             | Answer (only if a callback is passed)     |
| ---------------------- | --------------------------- | ----------------------------------------- |
| `registerUsedResource` | `{ type, data, instance }`  | `{ result: 'ok' }`                        |
| `freeUsedResource`     | `{ type, data?, instance }` | `{ result: 'ok', freed: boolean }`        |
| `clearUsedResources`   | `{ instance }`              | `{ result: 'ok' }`                        |

Every command answers with `{ error }` instead if it was rejected. The adapter API does not pass a callback —
it sends and returns — so the host also logs what went wrong.

The host **derives the instance from the sender** (`from: system.adapter.<namespace>`) instead of trusting
`message.instance`, so no instance can register resources in the name of another one or free another one's
registrations; a message whose `instance` does not match the sender is rejected. The `type` is validated as
well, because it becomes the last segment of the state id.

`getHostUsedResources` does **not** use a message — the adapter reads the
`usedResources.<type>` states directly.
