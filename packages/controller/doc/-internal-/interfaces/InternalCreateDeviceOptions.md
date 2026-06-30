[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalCreateDeviceOptions

# Interface: InternalCreateDeviceOptions

Defined in: [adapter/src/lib/\_Types.ts:589](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L589)

Options for creating a device

## Properties

### \_native?

> `optional` **\_native?**: `Record`\<`string`, `any`\> \| `null`

Defined in: [adapter/src/lib/\_Types.ts:595](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L595)

The native section of the device object

***

### callback?

> `optional` **callback?**: [`SetObjectCallback`](../type-aliases/SetObjectCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:599](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L599)

Called once the device has been created

***

### common?

> `optional` **common?**: `Partial`\<[`DeviceCommon`](DeviceCommon.md)\>

Defined in: [adapter/src/lib/\_Types.ts:593](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L593)

The common section of the device object

***

### deviceName

> **deviceName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L591)

The name of the device

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:597](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L597)

Optional settings including the user context
