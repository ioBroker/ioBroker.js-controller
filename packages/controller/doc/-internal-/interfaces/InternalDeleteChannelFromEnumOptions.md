[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalDeleteChannelFromEnumOptions

# Interface: InternalDeleteChannelFromEnumOptions

Defined in: [adapter/src/lib/\_Types.ts:749](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L749)

Options for removing a channel from an enum

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:759](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L759)

Called once the channel has been removed

***

### channelName

> **channelName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:755](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L755)

The name of the channel

***

### enumName

> **enumName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:751](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L751)

The category of the enum (e.g. rooms, functions)

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:757](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L757)

Optional settings including the user context

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:753](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L753)

The parent device name
