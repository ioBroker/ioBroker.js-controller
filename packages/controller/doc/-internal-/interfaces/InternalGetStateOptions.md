[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetStateOptions

# Interface: InternalGetStateOptions

Defined in: [adapter/src/lib/\_Types.ts:710](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L710)

Options for reading a state

## Properties

### callback?

> `optional` **callback?**: [`GetStateCallback`](../type-aliases/GetStateCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:716](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L716)

Called with the state

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:712](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L712)

The id of the state

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:714](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L714)

Optional settings including the user context
