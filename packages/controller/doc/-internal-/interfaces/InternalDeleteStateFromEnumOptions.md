[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalDeleteStateFromEnumOptions

# Interface: InternalDeleteStateFromEnumOptions

Defined in: [adapter/src/lib/\_Types.ts:865](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/_Types.ts#L865)

Options for removing a state from an enum

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:877](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/_Types.ts#L877)

Called once the state has been removed

***

### enumName

> **enumName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:867](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/_Types.ts#L867)

The category of the enum (e.g. rooms, functions)

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:875](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/_Types.ts#L875)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string`

Defined in: [adapter/src/lib/\_Types.ts:871](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/_Types.ts#L871)

The parent channel name

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:869](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/_Types.ts#L869)

The parent device name

***

### stateName

> **stateName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:873](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/_Types.ts#L873)

The name of the state
