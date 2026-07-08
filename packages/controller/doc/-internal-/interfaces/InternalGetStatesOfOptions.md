[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetStatesOfOptions

# Interface: InternalGetStatesOfOptions

Defined in: [adapter/src/lib/\_Types.ts:791](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L791)

Options for reading the states of a device or channel

## Properties

### callback

> **callback**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`StateObject`](StateObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:799](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L799)

Called with the states

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:797](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L797)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string` \| `null` \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:795](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L795)

The parent channel name

***

### parentDevice

> **parentDevice**: `string` \| `null` \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:793](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L793)

The parent device name
