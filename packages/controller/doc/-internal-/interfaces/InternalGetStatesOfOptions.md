[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetStatesOfOptions

# Interface: InternalGetStatesOfOptions

Defined in: [adapter/src/lib/\_Types.ts:795](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L795)

Options for reading the states of a device or channel

## Properties

### callback

> **callback**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`StateObject`](StateObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:803](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L803)

Called with the states

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:801](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L801)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string` \| `null` \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:799](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L799)

The parent channel name

***

### parentDevice

> **parentDevice**: `string` \| `null` \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:797](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L797)

The parent device name
