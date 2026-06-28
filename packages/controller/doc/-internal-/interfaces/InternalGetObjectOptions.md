[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetObjectOptions

# Interface: InternalGetObjectOptions\<T\>

Defined in: [adapter/src/lib/\_Types.ts:495](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L495)

Options for reading an object

## Type Parameters

### T

`T` *extends* `string` = `string`

## Properties

### callback?

> `optional` **callback?**: [`GetObjectCallback`](../type-aliases/GetObjectCallback.md)\<`T`\>

Defined in: [adapter/src/lib/\_Types.ts:501](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L501)

Called with the object

***

### id

> **id**: `string`

Defined in: [adapter/src/lib/\_Types.ts:497](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L497)

The id of the object

***

### options

> **options**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null` \| `undefined`

Defined in: [adapter/src/lib/\_Types.ts:499](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L499)

Optional settings including the user context
