[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalAddStateToEnumOptions

# Interface: InternalAddStateToEnumOptions

Defined in: [adapter/src/lib/\_Types.ts:847](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/_Types.ts#L847)

Options for adding a state to an enum

## Properties

### addTo

> **addTo**: `string`

Defined in: [adapter/src/lib/\_Types.ts:851](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/_Types.ts#L851)

The enum id to add the state to

***

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:861](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/_Types.ts#L861)

Called once the state has been added

***

### enumName

> **enumName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:849](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/_Types.ts#L849)

The category of the enum (e.g. rooms, functions)

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:859](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/_Types.ts#L859)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string`

Defined in: [adapter/src/lib/\_Types.ts:855](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/_Types.ts#L855)

The parent channel name

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:853](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/_Types.ts#L853)

The parent device name

***

### stateName

> **stateName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:857](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/_Types.ts#L857)

The name of the state
