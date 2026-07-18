[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetObjectsOptions

# Interface: InternalGetObjectsOptions

Defined in: [adapter/src/lib/\_Types.ts:526](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L526)

Options for reading multiple objects

## Properties

### callback?

> `optional` **callback?**: [`GetObjectsCallbackTyped`](../type-aliases/GetObjectsCallbackTyped.md)\<`any`\>

Defined in: [adapter/src/lib/\_Types.ts:536](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L536)

Called with the matching objects

***

### enums?

> `optional` **enums?**: [`EnumList`](../type-aliases/EnumList.md)

Defined in: [adapter/src/lib/\_Types.ts:532](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L532)

Restrict the result to objects within these enums

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:534](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L534)

Optional settings including the user context

***

### pattern

> **pattern**: [`Pattern`](../type-aliases/Pattern.md)

Defined in: [adapter/src/lib/\_Types.ts:528](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L528)

The pattern to match object ids against

***

### type?

> `optional` **type?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:530](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/adapter/src/lib/_Types.ts#L530)

Restrict the result to objects of this type
