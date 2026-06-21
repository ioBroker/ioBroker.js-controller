[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetPortOptions

# Interface: InternalGetPortOptions

Defined in: [adapter/src/lib/\_Types.ts:339](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L339)

Options for finding a free port

## Properties

### callback?

> `optional` **callback?**: (`port`) => `void`

Defined in: [adapter/src/lib/\_Types.ts:345](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L345)

Called with the free port that was found

#### Parameters

##### port

`number`

#### Returns

`void`

***

### host?

> `optional` **host?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:343](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L343)

The host to bind to

***

### port

> **port**: `number`

Defined in: [adapter/src/lib/\_Types.ts:341](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L341)

The preferred port to start searching from
