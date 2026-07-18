[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetStateOptions

# Interface: InternalSetStateOptions

Defined in: [adapter/src/lib/\_Types.ts:614](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L614)

Options for setting a state

## Extended by

- [`InternalSetStateChangedOptions`](InternalSetStateChangedOptions.md)

## Properties

### ack?

> `optional` **ack?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:620](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L620)

Whether the state should be acknowledged

***

### callback?

> `optional` **callback?**: [`SetStateCallback`](../type-aliases/SetStateCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:624](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L624)

Called once the state has been set

***

### id

> **id**: `string` \| [`IdObject`](IdObject.md)

Defined in: [adapter/src/lib/\_Types.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L616)

The id of the state, or an id object

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:622](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L622)

Optional settings including the user context

***

### state

> **state**: [`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

Defined in: [adapter/src/lib/\_Types.ts:618](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L618)

The value (or full state object) to set
