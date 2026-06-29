[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetEnumOptions

# Interface: InternalGetEnumOptions

Defined in: [adapter/src/lib/\_Types.ts:559](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L559)

Options for reading a single enum

## Properties

### \_enum

> **\_enum**: `string`

Defined in: [adapter/src/lib/\_Types.ts:561](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L561)

The name of the enum to read

***

### callback?

> `optional` **callback?**: [`GetEnumCallback`](../type-aliases/GetEnumCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L565)

Called with the enum

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:563](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L563)

Optional settings including the user context
