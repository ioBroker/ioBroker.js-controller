[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetStatesOfOptions

# Interface: InternalGetStatesOfOptions

Defined in: [adapter/src/lib/\_Types.ts:780](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L780)

Options for reading the states of a device or channel

## Properties

### callback

> **callback**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`StateObject`](StateObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:788](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L788)

Called with the states

***

### options?

> `optional` **options?**: `Record`\<`string`, `any`\> \| `null`

Defined in: [adapter/src/lib/\_Types.ts:786](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L786)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string` \| `null` \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:784](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L784)

The parent channel name

***

### parentDevice

> **parentDevice**: `string` \| `null` \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:782](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L782)

The parent device name
