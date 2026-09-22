[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetChannelsOfOptions

# Interface: InternalGetChannelsOfOptions

Defined in: [adapter/src/lib/\_Types.ts:540](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/adapter/src/lib/_Types.ts#L540)

Options for reading the channels of a device

## Properties

### callback?

> `optional` **callback?**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](ChannelObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:544](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/adapter/src/lib/_Types.ts#L544)

Called with the channels

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:546](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/adapter/src/lib/_Types.ts#L546)

Optional settings including the user context

***

### parentDevice?

> `optional` **parentDevice?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/adapter/src/lib/_Types.ts#L542)

The parent device to read the channels of
