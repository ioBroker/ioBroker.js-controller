[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetHistoryOptions

# Interface: InternalGetHistoryOptions

Defined in: [adapter/src/lib/\_Types.ts:505](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L505)

Options for reading the history of a state

## Properties

### callback

> **callback**: [`GetHistoryCallback`](../type-aliases/GetHistoryCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:511](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L511)

Called with the history data

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:507](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L507)

The id of the state

***

### options?

> `optional` **options?**: [`GetHistoryOptions`](GetHistoryOptions.md) \| `null`

Defined in: [adapter/src/lib/\_Types.ts:509](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L509)

Options controlling the history query
