[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetChannelsOfOptions

# Interface: InternalGetChannelsOfOptions

Defined in: [adapter/src/lib/\_Types.ts:529](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L529)

Options for reading the channels of a device

## Properties

### callback?

> `optional` **callback?**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](ChannelObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:533](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L533)

Called with the channels

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:535](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L535)

Optional settings including the user context

***

### parentDevice?

> `optional` **parentDevice?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:531](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L531)

The parent device to read the channels of
