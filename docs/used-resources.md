# Used Resources Registry

A central registry of **exclusive resources** occupied by adapter instances — resources that can only be
claimed by a single instance at a time (serial ports, TCP/UDP ports, USB devices, Bluetooth/HCI adapters,
GPIO pins, …).

## Why

Without this registry there is no reliable way to tell which serial port, network port, or hardware device is
already occupied by an existing instance. When a user configures a **new** instance they have to guess, which
leads to conflicts, silent failures, and hard-to-debug "device busy" errors.

The registry gives the user (and the admin UI) a clear overview of occupied vs. free resources per host, so a
free one can be picked confidently when creating or reconfiguring an instance.

## How it works

1. A running adapter declares the resources it occupies by calling `registerUsedResource(...)`.
2. The call is forwarded to the **host the instance runs on**. Only the host mutates the registry, which keeps
   it consistent across all instances (no races between adapters).
3. The host keeps the registry in memory and mirrors it into the state's DB under
   `system.host.<hostname>.usedResources.<type>` (one state per resource type, a JSON array of entries).
4. Reading is done directly from those states — no round-trip to the host — via `getUsedResources(...)`.

```
 Adapter                          Host (js-controller)                 States DB
 ───────                          ────────────────────                 ─────────
 registerUsedResource() ───push──▶ registry (in memory) ──persist──▶ system.host.<h>.usedResources.<type>
 freeUsedResource()     ───push──▶ registry (in memory) ──persist──▶            ▲
 getUsedResources()  ──────────────────read states directly──────────────────────┘
```

## Adapter API

```ts
registerUsedResource<T extends ioBroker.UsedResourceType>(
    type: T,
    data: ioBroker.UsedResourceData<T>,
    doNotDeleteAlreadyUsed?: boolean,
): Promise<void>;

freeUsedResource<T extends ioBroker.UsedResourceType>(
    type: T,
    data?: ioBroker.UsedResourceData<T>,
): Promise<void>;

getUsedResources<T extends ioBroker.UsedResourceType>(
    type?: T,
): Promise<ioBroker.RegisteredResource<T>[]>;
```

The `type` selects the resource kind; `data` is the **strictly typed** payload for that kind (see
[Resource types](#resource-types)). Passing a payload that does not match the `type` is a compile-time error.

### `registerUsedResource(type, data, doNotDeleteAlreadyUsed?)`

Registers a resource as occupied by this instance. Call it on adapter start-up once the resource is actually
open.

By default the host first **drops all resources previously registered by this instance** before adding the new
one. This is intended: the user may have changed the settings before the (re)start, so the old registrations
could be invalid and must be replaced by what the instance actually uses now.

To register **more than one** resource for the same instance, pass `doNotDeleteAlreadyUsed = true` on every
call except the first:

```ts
// on adapter start:
await this.registerUsedResource('serialPort', { port: '/dev/ttyUSB0', baudRate: 9600 });
await this.registerUsedResource('tcpPort', { port: 1883 }, true); // keep the serial port, add a TCP port
await this.registerUsedResource('tcpPort', { port: 8081 }, true); // add another port
```

### `freeUsedResource(type, data?)`

Frees a previously registered resource. If `data` is omitted, **all** resources of the given `type` for this
instance are freed.

```ts
await this.freeUsedResource('tcpPort', { port: 8081 }); // free one specific port
await this.freeUsedResource('serialPort'); // free all serial ports of this instance
```

You normally do not need to call this on shutdown — the host handles stop/crash automatically (see
[Lifecycle](#lifecycle)). Use it when an instance releases a resource while it keeps running.

### `getUsedResources(type?)`

Returns the resources currently registered on the host this instance runs on, across **all** instances of that
host, so an overview can be presented. Optionally filtered by `type`. Reads directly from the state's DB.

```ts
const all = await this.getUsedResources(); // every occupied resource on this host
const serial = await this.getUsedResources('serialPort'); // only serial ports

const freePort = 1883;
const inUse = (await this.getUsedResources('tcpPort')).some(r => r.port === freePort && r.isBlocked);
```

## Registered resource shape

`getUsedResources()` returns entries of type `ioBroker.RegisteredResource`: the typed payload plus these
bookkeeping fields:

| Field       | Type    | Meaning                                                                                                                                   |
| ----------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `type`      | string  | The resource type, e.g. `"serialPort"`.                                                                                                   |
| `instance`  | string  | The instance that occupies the resource, e.g. `"mqtt.0"`.                                                                                 |
| `ts`        | number  | Timestamp (ms) when the resource was registered.                                                                                          |
| `isBlocked` | boolean | `true`: the instance is running and actively holding the resource. `false`: the instance is not running but would occupy it when started. |

`isBlocked` lets the UI distinguish an **actively used** resource from one that is merely **reserved** by a
currently stopped instance.

## Lifecycle

The host (js-controller) keeps the registry and `isBlocked` in sync with the instance lifecycle:

| Event                                          | Effect on the registry                                                                       |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Instance start → adapter `register` (1st call) | previous registrations of this instance are dropped, new entry added with `isBlocked = true` |
| further `register(..., true)`                  | additional entry added with `isBlocked = true`                                               |
| Instance stop / crash (process exit)           | entries are **kept**, but set to `isBlocked = false`                                         |
| Instance deleted (controller running)          | all entries of the instance are removed by the host                                          |
| Instance deleted via CLI (controller stopped)  | the CLI removes the instance's entries from every host's registry states                     |
| Controller restart                             | registry is restored from states, then an assessment runs (see below)                        |

Resources are only registered/blocked when an instance **starts** and its adapter calls `registerUsedResource`.
This is deliberate: if the user edits the settings before the first start, the resource is only recorded once
the instance actually runs with the current configuration.

### Controller start assessment

On controller start the registry is restored from `system.host.<host>.usedResources.*` and then cleaned up:

- **all `isBlocked` flags are reset to `false`** — at start no instance is running yet; each instance re-blocks
  its resources when it starts and its adapter re-registers them;
- **entries of instances that no longer exist are removed** — e.g. an instance deleted via the CLI while the
  controller was down (belt-and-suspenders together with the CLI cleanup).

## Storage layout

For every resource type in use there is one state on the host:

```
system.host.<hostname>.usedResources.<type>
```

The state value is a JSON-serialized array of `RegisteredResource` entries (object type `state`,
`common.type = 'array'`, `common.role = 'json'`, read-only). The objects are created on demand.

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

| Command                | Message payload                                    |
| ---------------------- | -------------------------------------------------- |
| `registerUsedResource` | `{ type, data, instance, doNotDeleteAlreadyUsed }` |
| `freeUsedResource`     | `{ type, data?, instance }`                        |

`getUsedResources` does **not** use a message — the adapter reads the `usedResources.<type>` states directly.
