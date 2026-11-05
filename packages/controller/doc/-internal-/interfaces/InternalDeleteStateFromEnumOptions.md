[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalDeleteStateFromEnumOptions

# Interface: InternalDeleteStateFromEnumOptions

Defined in: [adapter/src/lib/\_Types.ts:842](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/adapter/src/lib/_Types.ts#L842)

Options for removing a state from an enum

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:854](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/adapter/src/lib/_Types.ts#L854)

Called once the state has been removed

***

### enumName

> **enumName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:844](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/adapter/src/lib/_Types.ts#L844)

The category of the enum (e.g. rooms, functions)

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:852](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/adapter/src/lib/_Types.ts#L852)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string`

Defined in: [adapter/src/lib/\_Types.ts:848](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/adapter/src/lib/_Types.ts#L848)

The parent channel name

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:846](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/adapter/src/lib/_Types.ts#L846)

The parent device name

***

### stateName

> **stateName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:850](https://github.com/ioBroker/ioBroker.js-controller/blob/0aa40743758497cbace847600f063425df31d9bf/packages/adapter/src/lib/_Types.ts#L850)

The name of the state
