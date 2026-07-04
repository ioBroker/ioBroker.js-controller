[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetObjectViewOptions

# Interface: InternalGetObjectViewOptions

Defined in: [adapter/src/lib/\_Types.ts:546](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L546)

Options for querying an object view

## Properties

### callback?

> `optional` **callback?**: [`GetObjectViewCallback`](../type-aliases/GetObjectViewCallback.md)\<[`AnyObject`](../type-aliases/AnyObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:556](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L556)

Called with the matching rows

***

### design

> **design**: `string`

Defined in: [adapter/src/lib/\_Types.ts:548](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L548)

The design document name

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:554](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L554)

Optional settings including the user context

***

### params

> **params**: [`GetObjectViewParams`](GetObjectViewParams.md)

Defined in: [adapter/src/lib/\_Types.ts:552](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L552)

Query parameters such as startkey and endkey

***

### search

> **search**: `string`

Defined in: [adapter/src/lib/\_Types.ts:550](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L550)

The view name within the design document
