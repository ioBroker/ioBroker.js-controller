[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetChannelsOfOptions

# Interface: InternalGetChannelsOfOptions

Defined in: [adapter/src/lib/\_Types.ts:530](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L530)

Options for reading the channels of a device

## Properties

### callback?

> `optional` **callback?**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](ChannelObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:534](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L534)

Called with the channels

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:536](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L536)

Optional settings including the user context

***

### parentDevice?

> `optional` **parentDevice?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:532](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L532)

The parent device to read the channels of
