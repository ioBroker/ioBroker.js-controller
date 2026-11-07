[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalCheckGroupOptions

# Interface: InternalCheckGroupOptions

Defined in: [adapter/src/lib/\_Types.ts:387](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/_Types.ts#L387)

Options for checking whether a user belongs to a group

## Properties

### callback?

> `optional` **callback?**: [`CheckGroupCallback`](../type-aliases/CheckGroupCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:395](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/_Types.ts#L395)

Called with the result of the check

***

### group

> **group**: `string`

Defined in: [adapter/src/lib/\_Types.ts:391](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/_Types.ts#L391)

The group to check membership of

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:393](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/_Types.ts#L393)

Optional settings including the user context

***

### user

> **user**: `string`

Defined in: [adapter/src/lib/\_Types.ts:389](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/adapter/src/lib/_Types.ts#L389)

The user to check
