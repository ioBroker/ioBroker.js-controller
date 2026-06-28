[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetObjectsOptions

# Interface: InternalGetObjectsOptions

Defined in: [adapter/src/lib/\_Types.ts:515](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L515)

Options for reading multiple objects

## Properties

### callback?

> `optional` **callback?**: [`GetObjectsCallbackTyped`](../type-aliases/GetObjectsCallbackTyped.md)\<`any`\>

Defined in: [adapter/src/lib/\_Types.ts:525](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L525)

Called with the matching objects

***

### enums?

> `optional` **enums?**: [`EnumList`](../type-aliases/EnumList.md)

Defined in: [adapter/src/lib/\_Types.ts:521](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L521)

Restrict the result to objects within these enums

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:523](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L523)

Optional settings including the user context

***

### pattern

> **pattern**: [`Pattern`](../type-aliases/Pattern.md)

Defined in: [adapter/src/lib/\_Types.ts:517](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L517)

The pattern to match object ids against

***

### type?

> `optional` **type?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:519](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L519)

Restrict the result to objects of this type
