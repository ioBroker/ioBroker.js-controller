[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetObjectViewOptions

# Interface: InternalGetObjectViewOptions

Defined in: [adapter/src/lib/\_Types.ts:550](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L550)

Options for querying an object view

## Properties

### callback?

> `optional` **callback?**: [`GetObjectViewCallback`](../type-aliases/GetObjectViewCallback.md)\<[`AnyObject`](../type-aliases/AnyObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:560](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L560)

Called with the matching rows

***

### design

> **design**: `string`

Defined in: [adapter/src/lib/\_Types.ts:552](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L552)

The design document name

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:558](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L558)

Optional settings including the user context

***

### params

> **params**: [`GetObjectViewParams`](GetObjectViewParams.md)

Defined in: [adapter/src/lib/\_Types.ts:556](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L556)

Query parameters such as startkey and endkey

***

### search

> **search**: `string`

Defined in: [adapter/src/lib/\_Types.ts:554](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L554)

The view name within the design document
