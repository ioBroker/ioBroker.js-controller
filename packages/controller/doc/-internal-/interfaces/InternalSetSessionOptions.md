[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetSessionOptions

# Interface: InternalSetSessionOptions

Defined in: [adapter/src/lib/\_Types.ts:311](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L311)

Options for storing a session

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:319](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L319)

Called once the session has been stored

***

### data

> **data**: `Record`\<`string`, `any`\>

Defined in: [adapter/src/lib/\_Types.ts:317](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L317)

The session data to store

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:313](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L313)

The session id

***

### ttl

> **ttl**: `number`

Defined in: [adapter/src/lib/\_Types.ts:315](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L315)

Time to live in seconds
