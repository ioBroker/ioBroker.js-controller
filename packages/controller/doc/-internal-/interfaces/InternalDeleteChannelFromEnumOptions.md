[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalDeleteChannelFromEnumOptions

# Interface: InternalDeleteChannelFromEnumOptions

Defined in: [adapter/src/lib/\_Types.ts:766](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/adapter/src/lib/_Types.ts#L766)

Options for removing a channel from an enum

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:776](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/adapter/src/lib/_Types.ts#L776)

Called once the channel has been removed

***

### channelName

> **channelName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:772](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/adapter/src/lib/_Types.ts#L772)

The name of the channel

***

### enumName

> **enumName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:768](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/adapter/src/lib/_Types.ts#L768)

The category of the enum (e.g. rooms, functions)

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:774](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/adapter/src/lib/_Types.ts#L774)

Optional settings including the user context

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:770](https://github.com/ioBroker/ioBroker.js-controller/blob/c3c2ce2df82625eae67326b09085f3e88ee12d45/packages/adapter/src/lib/_Types.ts#L770)

The parent device name
