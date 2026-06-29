[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetSessionOptions

# Interface: InternalSetSessionOptions

Defined in: [adapter/src/lib/\_Types.ts:314](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L314)

Options for storing a session

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:322](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L322)

Called once the session has been stored

***

### data

> **data**: [`Session`](../type-aliases/Session.md)

Defined in: [adapter/src/lib/\_Types.ts:320](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L320)

The session data to store

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:316](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L316)

The session id

***

### ttl

> **ttl**: `number`

Defined in: [adapter/src/lib/\_Types.ts:318](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L318)

Time to live in seconds
