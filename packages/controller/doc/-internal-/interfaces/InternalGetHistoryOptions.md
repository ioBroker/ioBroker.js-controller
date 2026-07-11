[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetHistoryOptions

# Interface: InternalGetHistoryOptions

Defined in: [adapter/src/lib/\_Types.ts:506](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L506)

Options for reading the history of a state

## Properties

### callback

> **callback**: [`GetHistoryCallback`](../type-aliases/GetHistoryCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:512](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L512)

Called with the history data

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:508](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L508)

The id of the state

***

### options?

> `optional` **options?**: [`GetHistoryOptions`](GetHistoryOptions.md) \| `null`

Defined in: [adapter/src/lib/\_Types.ts:510](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L510)

Options controlling the history query
