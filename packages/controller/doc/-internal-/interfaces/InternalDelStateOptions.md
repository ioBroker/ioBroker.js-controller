[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalDelStateOptions

# Interface: InternalDelStateOptions

Defined in: [adapter/src/lib/\_Types.ts:486](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L486)

Options for deleting a state

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:492](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L492)

Called once the state has been deleted

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:488](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L488)

The id of the state

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:490](https://github.com/ioBroker/ioBroker.js-controller/blob/8d8c9c5ed5ad4e65169ae0484170606409fde5eb/packages/adapter/src/lib/_Types.ts#L490)

Optional settings including the user context
