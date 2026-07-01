[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetStateChangedOptions

# Interface: InternalSetStateChangedOptions

Defined in: [adapter/src/lib/\_Types.ts:622](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L622)

Options for setting a state only if it changed

## Extends

- [`InternalSetStateOptions`](InternalSetStateOptions.md)

## Properties

### ack?

> `optional` **ack?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:614](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L614)

Whether the state should be acknowledged

#### Inherited from

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`ack`](InternalSetStateOptions.md#ack)

***

### callback?

> `optional` **callback?**: [`SetStateChangedCallback`](../type-aliases/SetStateChangedCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:624](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L624)

Called with whether the state was changed

#### Overrides

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`callback`](InternalSetStateOptions.md#callback)

***

### id

> **id**: `string` \| [`IdObject`](IdObject.md)

Defined in: [adapter/src/lib/\_Types.ts:610](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L610)

The id of the state, or an id object

#### Inherited from

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`id`](InternalSetStateOptions.md#id)

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L616)

Optional settings including the user context

#### Inherited from

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`options`](InternalSetStateOptions.md#options)

***

### state

> **state**: [`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

Defined in: [adapter/src/lib/\_Types.ts:612](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L612)

The value (or full state object) to set

#### Inherited from

[`InternalSetStateOptions`](InternalSetStateOptions.md).[`state`](InternalSetStateOptions.md#state)
