[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetSessionOptions

# Interface: InternalSetSessionOptions

Defined in: [adapter/src/lib/\_Types.ts:319](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L319)

Options for storing a session

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:327](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L327)

Called once the session has been stored

***

### data

> **data**: [`Session`](../type-aliases/Session.md)

Defined in: [adapter/src/lib/\_Types.ts:325](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L325)

The session data to store

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:321](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L321)

The session id

***

### ttl

> **ttl**: `number`

Defined in: [adapter/src/lib/\_Types.ts:323](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L323)

Time to live in seconds
