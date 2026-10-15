[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetChannelsOfOptions

# Interface: InternalGetChannelsOfOptions

Defined in: [adapter/src/lib/\_Types.ts:540](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L540)

Options for reading the channels of a device

## Properties

### callback?

> `optional` **callback?**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](ChannelObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:544](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L544)

Called with the channels

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:546](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L546)

Optional settings including the user context

***

### parentDevice?

> `optional` **parentDevice?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/_Types.ts#L542)

The parent device to read the channels of
