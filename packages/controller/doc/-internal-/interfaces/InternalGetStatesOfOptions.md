[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetStatesOfOptions

# Interface: InternalGetStatesOfOptions

Defined in: [adapter/src/lib/\_Types.ts:790](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L790)

Options for reading the states of a device or channel

## Properties

### callback

> **callback**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`StateObject`](StateObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:798](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L798)

Called with the states

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:796](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L796)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string` \| `null` \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:794](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L794)

The parent channel name

***

### parentDevice

> **parentDevice**: `string` \| `null` \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:792](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L792)

The parent device name
