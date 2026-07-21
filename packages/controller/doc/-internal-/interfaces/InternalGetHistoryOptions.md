[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetHistoryOptions

# Interface: InternalGetHistoryOptions

Defined in: [adapter/src/lib/\_Types.ts:516](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L516)

Options for reading the history of a state

## Properties

### callback

> **callback**: [`GetHistoryCallback`](../type-aliases/GetHistoryCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:522](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L522)

Called with the history data

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:518](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L518)

The id of the state

***

### options?

> `optional` **options?**: [`GetHistoryOptions`](GetHistoryOptions.md) \| `null`

Defined in: [adapter/src/lib/\_Types.ts:520](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L520)

Options controlling the history query
