[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetHistoryOptions

# Interface: InternalGetHistoryOptions

Defined in: [adapter/src/lib/\_Types.ts:506](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L506)

Options for reading the history of a state

## Properties

### callback

> **callback**: [`GetHistoryCallback`](../type-aliases/GetHistoryCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:512](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L512)

Called with the history data

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L508)

The id of the state

***

### options?

> `optional` **options?**: [`GetHistoryOptions`](GetHistoryOptions.md) \| `null`

Defined in: [adapter/src/lib/\_Types.ts:510](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L510)

Options controlling the history query
