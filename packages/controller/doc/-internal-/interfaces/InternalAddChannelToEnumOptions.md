[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalAddChannelToEnumOptions

# Interface: InternalAddChannelToEnumOptions

Defined in: [adapter/src/lib/\_Types.ts:652](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L652)

Options for adding a channel to an enum

## Properties

### addTo

> **addTo**: `string`

Defined in: [adapter/src/lib/\_Types.ts:656](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L656)

The enum id to add the channel to

***

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:664](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L664)

Called once the channel has been added

***

### channelName

> **channelName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:660](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L660)

The name of the channel

***

### enumName

> **enumName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:654](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L654)

The category of the enum (e.g. rooms, functions)

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:662](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L662)

Optional settings including the user context

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:658](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/adapter/src/lib/_Types.ts#L658)

The parent device name
