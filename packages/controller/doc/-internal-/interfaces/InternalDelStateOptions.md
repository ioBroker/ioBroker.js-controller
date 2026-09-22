[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalDelStateOptions

# Interface: InternalDelStateOptions

Defined in: [adapter/src/lib/\_Types.ts:496](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/adapter/src/lib/_Types.ts#L496)

Options for deleting a state

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/adapter/src/lib/_Types.ts#L502)

Called once the state has been deleted

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:498](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/adapter/src/lib/_Types.ts#L498)

The id of the state

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:500](https://github.com/ioBroker/ioBroker.js-controller/blob/2e634e3875a421a903d87f899728bd9369523ca6/packages/adapter/src/lib/_Types.ts#L500)

Optional settings including the user context
