[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetStateOptions

# Interface: InternalGetStateOptions

Defined in: [adapter/src/lib/\_Types.ts:733](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/adapter/src/lib/_Types.ts#L733)

Options for reading a state

## Properties

### callback?

> `optional` **callback?**: [`GetStateCallback`](../type-aliases/GetStateCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:739](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/adapter/src/lib/_Types.ts#L739)

Called with the state

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:735](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/adapter/src/lib/_Types.ts#L735)

The id of the state

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:737](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/adapter/src/lib/_Types.ts#L737)

Optional settings including the user context
