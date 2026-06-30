[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalSetStateOptions

# Interface: InternalSetStateOptions

Defined in: [adapter/src/lib/\_Types.ts:603](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L603)

Options for setting a state

## Extended by

- [`InternalSetStateChangedOptions`](InternalSetStateChangedOptions.md)

## Properties

### ack?

> `optional` **ack?**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:609](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L609)

Whether the state should be acknowledged

***

### callback?

> `optional` **callback?**: [`SetStateCallback`](../type-aliases/SetStateCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:613](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L613)

Called once the state has been set

***

### id

> **id**: `string` \| [`IdObject`](IdObject.md)

Defined in: [adapter/src/lib/\_Types.ts:605](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L605)

The id of the state, or an id object

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:611](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L611)

Optional settings including the user context

***

### state

> **state**: [`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

Defined in: [adapter/src/lib/\_Types.ts:607](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L607)

The value (or full state object) to set
