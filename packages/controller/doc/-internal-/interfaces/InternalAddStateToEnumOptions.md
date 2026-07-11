[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalAddStateToEnumOptions

# Interface: InternalAddStateToEnumOptions

Defined in: [adapter/src/lib/\_Types.ts:802](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L802)

Options for adding a state to an enum

## Properties

### addTo

> **addTo**: `string`

Defined in: [adapter/src/lib/\_Types.ts:806](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L806)

The enum id to add the state to

***

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:816](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L816)

Called once the state has been added

***

### enumName

> **enumName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:804](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L804)

The category of the enum (e.g. rooms, functions)

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:814](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L814)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string`

Defined in: [adapter/src/lib/\_Types.ts:810](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L810)

The parent channel name

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:808](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L808)

The parent device name

***

### stateName

> **stateName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:812](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L812)

The name of the state
