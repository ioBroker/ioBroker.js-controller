[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalCreateStateOptions

# Interface: InternalCreateStateOptions

Defined in: [adapter/src/lib/\_Types.ts:620](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L620)

Options for creating a state

## Properties

### \_native

> **\_native**: `Record`\<`string`, `any`\>

Defined in: [adapter/src/lib/\_Types.ts:630](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L630)

The native section of the state object

***

### callback?

> `optional` **callback?**: [`SetObjectCallback`](../type-aliases/SetObjectCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L634)

Called once the state has been created

***

### common

> **common**: `Partial`\<[`StateCommon`](StateCommon.md)\>

Defined in: [adapter/src/lib/\_Types.ts:628](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L628)

The common section of the state object

***

### options?

> `optional` **options?**: `Record`\<`string`, `any`\> \| `null`

Defined in: [adapter/src/lib/\_Types.ts:632](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L632)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string`

Defined in: [adapter/src/lib/\_Types.ts:624](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L624)

The parent channel name

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:622](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L622)

The parent device name

***

### stateName

> **stateName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:626](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L626)

The name of the state
