[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalAddStateToEnumOptions

# Interface: InternalAddStateToEnumOptions

Defined in: [adapter/src/lib/\_Types.ts:824](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/adapter/src/lib/_Types.ts#L824)

Options for adding a state to an enum

## Properties

### addTo

> **addTo**: `string`

Defined in: [adapter/src/lib/\_Types.ts:828](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/adapter/src/lib/_Types.ts#L828)

The enum id to add the state to

***

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:838](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/adapter/src/lib/_Types.ts#L838)

Called once the state has been added

***

### enumName

> **enumName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:826](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/adapter/src/lib/_Types.ts#L826)

The category of the enum (e.g. rooms, functions)

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/adapter/src/lib/_Types.ts#L836)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string`

Defined in: [adapter/src/lib/\_Types.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/adapter/src/lib/_Types.ts#L832)

The parent channel name

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/adapter/src/lib/_Types.ts#L830)

The parent device name

***

### stateName

> **stateName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/adapter/src/lib/_Types.ts#L834)

The name of the state
