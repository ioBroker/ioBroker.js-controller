[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetStateChangedOptions

# Interface: InternalSetStateChangedOptions

Defined in: [adapter/src/lib/\_Types.ts:618](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L618)

Options for setting a state only if it changed

## Extends

- [`InternalSetStateOptions`](InternalSetStateOptions.md)

## Properties

### ack?

> `optional` **ack?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:610](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L610)

Whether the state should be acknowledged

#### Inherited from

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`ack`](InternalSetStateOptions.md#ack)

***

### callback?

> `optional` **callback?**: [`SetStateChangedCallback`](../type-aliases/SetStateChangedCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:620](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L620)

Called with whether the state was changed

#### Overrides

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`callback`](InternalSetStateOptions.md#callback)

***

### id

> **id**: `string` \| [`IdObject`](IdObject.md)

Defined in: [adapter/src/lib/\_Types.ts:606](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L606)

The id of the state, or an id object

#### Inherited from

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`id`](InternalSetStateOptions.md#id)

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:612](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L612)

Optional settings including the user context

#### Inherited from

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`options`](InternalSetStateOptions.md#options)

***

### state

> **state**: [`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

Defined in: [adapter/src/lib/\_Types.ts:608](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L608)

The value (or full state object) to set

#### Inherited from

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`state`](InternalSetStateOptions.md#state)
