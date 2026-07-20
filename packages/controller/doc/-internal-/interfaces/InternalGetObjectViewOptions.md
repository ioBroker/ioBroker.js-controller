[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetObjectViewOptions

# Interface: InternalGetObjectViewOptions

Defined in: [adapter/src/lib/\_Types.ts:556](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L556)

Options for querying an object view

## Properties

### callback?

> `optional` **callback?**: [`GetObjectViewCallback`](../type-aliases/GetObjectViewCallback.md)\<[`AnyObject`](../type-aliases/AnyObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:566](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L566)

Called with the matching rows

***

### design

> **design**: `string`

Defined in: [adapter/src/lib/\_Types.ts:558](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L558)

The design document name

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L564)

Optional settings including the user context

***

### params

> **params**: [`GetObjectViewParams`](GetObjectViewParams.md)

Defined in: [adapter/src/lib/\_Types.ts:562](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L562)

Query parameters such as startkey and endkey

***

### search

> **search**: `string`

Defined in: [adapter/src/lib/\_Types.ts:560](https://github.com/ioBroker/ioBroker.js-controller/blob/d3842b2ac919375043ba1c8bcfb637022c2bb575/packages/adapter/src/lib/_Types.ts#L560)

The view name within the design document
