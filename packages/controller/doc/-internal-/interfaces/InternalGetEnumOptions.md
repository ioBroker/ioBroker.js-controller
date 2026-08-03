[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetEnumOptions

# Interface: InternalGetEnumOptions

Defined in: [adapter/src/lib/\_Types.ts:570](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L570)

Options for reading a single enum

## Properties

### \_enum

> **\_enum**: `string`

Defined in: [adapter/src/lib/\_Types.ts:572](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L572)

The name of the enum to read

***

### callback?

> `optional` **callback?**: [`GetEnumCallback`](../type-aliases/GetEnumCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:576](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L576)

Called with the enum

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:574](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L574)

Optional settings including the user context
