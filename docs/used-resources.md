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

`common.declareUsedResources` in the adapter's `io-package.json` decides how an instance's resources end up in
the registry — or that they do not:

- **Controller-managed (the default)** — `native.port` is the established ioBroker convention for the port an
  instance listens on, and js-controller uses it: without any adapter change, the configured `native.port`
  (plus `native.bind`, if set) is listed as a `tcpPort`. Because the source is the **configuration** and not a
  running process, the port is listed for an instance that was never started or is currently stopped as well,
  and a changed `native.port` is picked up immediately instead of at the next restart.
- **Adapter-declared** — the adapter sets `common.declareUsedResources: true` in its `io-package.json` and
  calls `registerUsedResource(...)` / `freeUsedResource(...)` itself. Use this whenever the occupied resources
  are something other than the configured `native.port`: a serial port, several ports, a UDP port, a USB
  device. The controller then derives nothing for that instance — the adapter knows best what it really opens.
- **Opted out** — the adapter sets `common.declareUsedResources: false`. The controller derives nothing and
  refuses `registerUsedResource(...)`, so the instances of that adapter have no entries at all. Use this when
  `native.port` is **not** a port the adapter listens on — typically the port of the device or server it
  connects to — which the controller would otherwise list as occupied. Entries left over from before the flag
  was set (e.g. derived before an adapter update) are removed as soon as the host sees the changed instance
  object, and at the latest on the next controller start.

| `common.declareUsedResources` | Entries come from                                          | Registering, freeing, clearing |
| ----------------------------- | ---------------------------------------------------------- | ------------------------------ |
| not set                       | the controller, derived from `native.port` / `native.bind` | refused                        |
| `true`                        | the adapter                                                | accepted                       |
| `false`                       | nobody — the instance has no entries                       | refused                        |

Whether the controller supports the registry at all can be checked with
`adapter.supportsFeature('CONTROLLER_USED_RESOURCES')`.

## How it works

1. A running adapter declares the resources it occupies by calling `registerUsedResource(...)`; for an
   instance without `common.declareUsedResources` the host derives the entries from the instance object instead,
   and for one with `common.declareUsedResources: false` there are none.
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

checkUsedResource<T extends ioBroker.UsedResourceType>(
    type: T,
    data?: Partial<ioBroker.UsedResourceData<T>>,
): Promise<ioBroker.RegisteredResource[]>;

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

All four calls that go to the host wait for its verdict and **reject** when it refuses, so a mistake — a
misspelled type, a payload that is not an object or does not satisfy its type (see
[Resource types](#resource-types)), or, for the three mutating ones, a `common.declareUsedResources` in the
`io-package.json` that is not `true` — surfaces where the adapter can see it instead of only in the host's log. If the host does not answer within
five seconds, the call rejects with `Timeout exceeded`; check
`supportsFeature('CONTROLLER_USED_RESOURCES')` when an older controller may be in play.

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

A filter that matches nothing is **logged as a warning by the host** (`freed no used resource of type …`)
but is not an error — freeing something twice is harmless. The call still waits for the host, so a genuine
refusal (an unknown type, a malformed payload) rejects.

You normally do not need to call this on shutdown — the host handles stop/crash automatically (see
[Lifecycle](#lifecycle)). Use it when an instance releases a resource while it keeps running.

### `clearUsedResources()`

Frees **all** resources this instance registered, across every type. Needed neither on start-up (the host
already resets the registrations of a starting instance) nor on shutdown; use it when the instance drops
everything it occupied while it keeps running, e.g. on a reconfiguration.

### `checkUsedResource(type, data?)`

Asks whether **another** instance on this host currently holds the resource, without registering
anything. Returns the conflicting entries, newest registration first, or an empty list.

This one works for **every** instance, whatever `common.declareUsedResources` says — also for one whose
resources the controller derives, or one that opted out. Asking changes nothing, and those are exactly the
instances that want to know whether a port is free before they open it.

```ts
const held = await this.checkUsedResource('tcpPort', { port: 1883 });
if (held.length) {
    this.log.warn(`Port 1883 is already used by ${held.map(entry => entry.instance).join(', ')}`);
}
```

Call it **before** opening the port or the device. Afterwards the operating system has already
decided the conflict, and all this can add is a better message than `EADDRINUSE`.

The answer is a **hint, not a permission**. The registry knows what adapters declare, so an empty
list does not promise the resource is free — something outside ioBroker may hold it, and an adapter
may declare something it never opens. Registering is never refused because of a conflict; the host
only writes a warning naming both instances. Deciding what to do is the adapter's business.

Only instances that are actually running count: an entry with `isBlocked: false` means "would occupy
this when started" and must not stand in the way of an instance running now.

Two payloads count as overlapping when one describes a subset of the other, so `{ port: 1883 }` conflicts with
`{ port: 1883, bind: '0.0.0.0' }`. Two types are compared by what really cannot be shared instead:

- **`tcpPort` / `udpPort`** by port, bind address and family. A wildcard address (`0.0.0.0`, `::`, `*`) occupies
  every address, so `0.0.0.0:8080` conflicts with `127.0.0.1:8080`, while `192.168.0.2:8080` and
  `127.0.0.1:8080` do not. Two different families are two sockets and never conflict; a field that is not named
  asks about every value of it.
- **`serialPort`** by the device it resolves to, so it is found under any of its names and whatever baud rate
  each instance opens it with (see [Serial ports](#serial-ports)).

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
| Instance changed (opted out)                       | all entries of the instance are removed by the host                                        |
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
  controller was down (belt-and-suspenders together with the CLI cleanup) — and so are the entries of instances
  that opted out (`common.declareUsedResources: false`);
- **malformed entries are dropped** — anything that does not have the shape of a `RegisteredResource` or whose
  payload does not satisfy its type (see [Resource types](#resource-types));
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

| Type         | Payload (`UsedResourceData<type>`)                                  | Checked by the host                                 |
| ------------ | ------------------------------------------------------------------- | --------------------------------------------------- |
| `serialPort` | `{ port: string; baudRate?: number; device?: string }`              | `port` non-empty, `baudRate` a positive integer     |
| `tcpPort`    | `{ port: number; bind?: string; family?: 4 \| 6 }`                  | `port` an integer between 1 and 65535               |
| `udpPort`    | `{ port: number; bind?: string; family?: 4 \| 6 }`                  | `port` an integer between 1 and 65535               |
| `usb`        | `{ path: string; vendorId?: string; productId?: string }`           | `path` non-empty                                    |
| `bluetooth`  | `{ hci: string }`                                                   | `hci` non-empty                                     |
| `gpio`       | `{ pin: number; chip?: string }`                                    | `pin` an integer >= 0, `chip` non-empty             |

The host enforces the payload at runtime too, because a JavaScript adapter — or a `{ port: this.config.port }`
with an unset port, which arrives as `{}` — gets past the compiler:

- **Values are flat**: every value has to be a string, a finite number or a boolean, also in fields a type does
  not know and in custom types. A resource is identified by a port, a path or a pin, not by a structure.
- **A number field accepts a string of digits** and stores it as a number, so a port taken from a text field of
  the configuration (`'1883'`) is the same port as `1883`. Only plain digits are converted: `'0x50'`, `'1e3'` or
  `''` are refused. Because every value is converted once on the way in, the host compares strictly afterwards.
- **`registerUsedResource`** has to name every required field. A payload without its identifying field would be
  a wildcard: `{}` names nothing, so it would overlap with every resource of its type, and every
  `checkUsedResource` / `registerUsedResource` of that type on the host would report it as a conflict.
- **`freeUsedResource` / `checkUsedResource`** take a filter, so fields may be left out — but a field that is
  named is checked and converted the same way.
- Fields a type does not know are ignored beyond being flat. A custom type (module augmentation) is unknown to
  the host, so its registration only has to name at least one field.

A refused payload rejects the call with the reason, e.g.
`invalid payload for resource type "tcpPort": "port" must be an integer between 1 and 65535, got "0x50"`.

### Serial ports

The same port has several names: `/dev/ttyUSB0` and the stable `/dev/serial/by-id/usb-...` link on Linux,
`/dev/serial0` pointing to `/dev/ttyAMA0` or `/dev/ttyS0` on a Raspberry Pi, a `/dev/cu.*` and a `/dev/tty.*`
node on macOS, `COM3`, `com3` or `\\.\COM3` on Windows. Two instances using the same port under different names
still cannot share it, so the host resolves the name when a serial port is registered — it is the machine the
port belongs to:

- symlinks are followed (`/dev/serial/by-id/...` → `/dev/ttyUSB0`), on macOS `cu.*` and `tty.*` count as one,
  on Windows the case and a leading `\\.\` do not matter;
- the entry keeps the `port` the adapter gave — the `by-id` name tells the user more and survives a replug — and
  the host adds the resolved `device` next to it. An adapter does not set `device`;
- conflicts are looked for by `device` only, and the filter of `freeUsedResource` / `checkUsedResource` is
  resolved the same way, so a port is found under any of its names.

A name that cannot be resolved — the device is unplugged — is compared as it is. A network coordinator such as
`tcp://192.168.1.10:6638` is no local serial port and should not be registered as one.

### GPIO pins

`pin` is the line offset of the pin on its GPIO chip. On the main chip of a Raspberry Pi that is the **BCM
number**, so GPIO 17 is header pin 11. Physical header pin numbers, wiringPi numbers or sysfs numbers (which
start at 512 on newer kernels) have to be converted before registering — the host cannot tell them apart, and the
same pin would not be recognized.

`chip` names the GPIO chip the pin belongs to, e.g. `gpiochip2` for an I²C port expander:

- **Leave it out for the main chip of the board.** Its name is not the same everywhere — on a Raspberry Pi 5 the
  header sits on `gpiochip4` or `gpiochip0`, depending on the kernel — so naming it would only look precise.
- An entry **without** a chip counts as overlapping with the same pin on **any** chip, because the host cannot
  tell which one was meant. It warns rather than staying silent; two entries naming *different* chips never
  conflict.
- The name is brought into one form, so `'gpiochip2'`, `'2'`, `2` and `'/dev/gpiochip2'` mean the same chip. A
  chip addressed by its label (`pinctrl-bcm2835`) is kept as it is.

```ts
await this.registerUsedResource('gpio', { pin: 17 }); // BCM 17 on the main chip
await this.registerUsedResource('gpio', { pin: 3, chip: 'gpiochip2' }); // line 3 of an expander
```

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

2. Add the rules of its fields to `PAYLOAD_RULES` in `packages/controller/src/lib/usedResources.ts`. The
   controller does not compile until every type and field of the map has a rule there. Nothing else is
   required — `UsedResourceType`, `UsedResourceData<T>` and `RegisteredResource<T>` derive from the map, and the
   host stores/reads the type generically.

The map is also open for module augmentation, so an adapter that owns a custom resource can extend it in its
own type declarations. The host then knows nothing about the fields and only requires a registration to name
at least one.

## Message protocol (internal)

`registerUsedResource` and `freeUsedResource` are sent to the host via the states message box (`pushMessage` to
`system.host.<hostname>`), because only the host may mutate the registry:

| Command                | Message payload             | Answer (only if a callback is passed)     |
| ---------------------- | --------------------------- | ----------------------------------------- |
| `registerUsedResource` | `{ type, data, instance }`  | `{ result: 'ok', conflicts: [] }`         |
| `freeUsedResource`     | `{ type, data?, instance }` | `{ result: 'ok', freed: boolean }`        |
| `clearUsedResources`   | `{ instance }`              | `{ result: 'ok' }`                        |
| `checkUsedResource`    | `{ type, data?, instance }` | `{ result: 'ok', conflicts: [] }`         |

Every command answers with `{ error }` instead if it was rejected. The adapter API sends these messages with
`expectReply: true` and waits for the answer, so a refusal reaches the caller as a rejected promise; the host
logs it as well, which is what another protocol implementer sees when it does not ask for a reply.

The host **derives the instance from the sender** (`from: system.adapter.<namespace>`) instead of trusting
`message.instance`, so no instance can register resources in the name of another one or free another one's
registrations; a message whose `instance` does not match the sender is rejected. The `type` is validated as
well, because it becomes the last segment of the state id.

`getHostUsedResources` does **not** use a message — the adapter reads the
`usedResources.<type>` states directly.
