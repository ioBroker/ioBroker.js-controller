[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetStateChangedOptions

# Interface: InternalSetStateChangedOptions

Defined in: [adapter/src/lib/\_Types.ts:617](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L617)

Options for setting a state only if it changed

## Extends

- [`InternalSetStateOptions`](InternalSetStateOptions.md)

## Properties

### ack?

> `optional` **ack?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:609](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L609)

Whether the state should be acknowledged

#### Inherited from

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`ack`](InternalSetStateOptions.md#ack)

***

### callback?

> `optional` **callback?**: [`SetStateChangedCallback`](../type-aliases/SetStateChangedCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:619](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L619)

Called with whether the state was changed

#### Overrides

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`callback`](InternalSetStateOptions.md#callback)

***

### id

> **id**: `string` \| [`IdObject`](IdObject.md)

Defined in: [adapter/src/lib/\_Types.ts:605](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L605)

The id of the state, or an id object

#### Inherited from

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`id`](InternalSetStateOptions.md#id)

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:611](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L611)

Optional settings including the user context

#### Inherited from

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`options`](InternalSetStateOptions.md#options)

***

### state

> **state**: [`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

Defined in: [adapter/src/lib/\_Types.ts:607](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L607)

The value (or full state object) to set

#### Inherited from

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`state`](InternalSetStateOptions.md#state)
