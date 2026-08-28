[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetSessionOptions

# Interface: InternalSetSessionOptions

Defined in: [adapter/src/lib/\_Types.ts:315](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/_Types.ts#L315)

Options for storing a session

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:323](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/_Types.ts#L323)

Called once the session has been stored

***

### data

> **data**: [`Session`](../type-aliases/Session.md)

Defined in: [adapter/src/lib/\_Types.ts:321](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/_Types.ts#L321)

The session data to store

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:317](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/_Types.ts#L317)

The session id

***

### ttl

> **ttl**: `number`

Defined in: [adapter/src/lib/\_Types.ts:319](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/_Types.ts#L319)

Time to live in seconds
