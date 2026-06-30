[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetPortOptions

# Interface: InternalGetPortOptions

Defined in: [adapter/src/lib/\_Types.ts:342](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L342)

Options for finding a free port

## Properties

### callback?

> `optional` **callback?**: (`port`) => `void`

Defined in: [adapter/src/lib/\_Types.ts:348](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L348)

Called with the free port that was found

#### Parameters

##### port

`number`

#### Returns

`void`

***

### host?

> `optional` **host?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:346](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L346)

The host to bind to

***

### port

> **port**: `number`

Defined in: [adapter/src/lib/\_Types.ts:344](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L344)

The preferred port to start searching from
