[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetObjectViewOptions

# Interface: InternalGetObjectViewOptions

Defined in: [adapter/src/lib/\_Types.ts:545](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L545)

Options for querying an object view

## Properties

### callback?

> `optional` **callback?**: [`GetObjectViewCallback`](../type-aliases/GetObjectViewCallback.md)\<[`AnyObject`](../type-aliases/AnyObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:555](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L555)

Called with the matching rows

***

### design

> **design**: `string`

Defined in: [adapter/src/lib/\_Types.ts:547](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L547)

The design document name

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:553](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L553)

Optional settings including the user context

***

### params

> **params**: [`GetObjectViewParams`](GetObjectViewParams.md)

Defined in: [adapter/src/lib/\_Types.ts:551](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L551)

Query parameters such as startkey and endkey

***

### search

> **search**: `string`

Defined in: [adapter/src/lib/\_Types.ts:549](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/adapter/src/lib/_Types.ts#L549)

The view name within the design document
