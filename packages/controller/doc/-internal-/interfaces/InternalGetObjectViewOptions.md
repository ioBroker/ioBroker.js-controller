[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetObjectViewOptions

# Interface: InternalGetObjectViewOptions

Defined in: [adapter/src/lib/\_Types.ts:542](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L542)

Options for querying an object view

## Properties

### callback?

> `optional` **callback?**: [`GetObjectViewCallback`](../type-aliases/GetObjectViewCallback.md)\<[`AnyObject`](../type-aliases/AnyObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:552](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L552)

Called with the matching rows

***

### design

> **design**: `string`

Defined in: [adapter/src/lib/\_Types.ts:544](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L544)

The design document name

***

### options?

> `optional` **options?**: `Record`\<`string`, `any`\> \| `null`

Defined in: [adapter/src/lib/\_Types.ts:550](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L550)

Optional settings including the user context

***

### params

> **params**: [`GetObjectViewParams`](GetObjectViewParams.md)

Defined in: [adapter/src/lib/\_Types.ts:548](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L548)

Query parameters such as startkey and endkey

***

### search

> **search**: `string`

Defined in: [adapter/src/lib/\_Types.ts:546](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L546)

The view name within the design document
