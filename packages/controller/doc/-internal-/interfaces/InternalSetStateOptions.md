[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetStateOptions

# Interface: InternalSetStateOptions

Defined in: [adapter/src/lib/\_Types.ts:600](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L600)

Options for setting a state

## Extended by

- [`InternalSetStateChangedOptions`](InternalSetStateChangedOptions.md)

## Properties

### ack?

> `optional` **ack?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:606](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L606)

Whether the state should be acknowledged

***

### callback?

> `optional` **callback?**: [`SetStateCallback`](../type-aliases/SetStateCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:610](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L610)

Called once the state has been set

***

### id

> **id**: `string` \| [`IdObject`](IdObject.md)

Defined in: [adapter/src/lib/\_Types.ts:602](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L602)

The id of the state, or an id object

***

### options?

> `optional` **options?**: `Partial`\<[`GetUserGroupsOptions`](GetUserGroupsOptions.md)\> \| `null`

Defined in: [adapter/src/lib/\_Types.ts:608](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L608)

Optional settings including the user context

***

### state

> **state**: [`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

Defined in: [adapter/src/lib/\_Types.ts:604](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L604)

The value (or full state object) to set
