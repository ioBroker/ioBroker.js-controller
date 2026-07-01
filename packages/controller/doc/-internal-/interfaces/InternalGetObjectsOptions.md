[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetObjectsOptions

# Interface: InternalGetObjectsOptions

Defined in: [adapter/src/lib/\_Types.ts:520](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L520)

Options for reading multiple objects

## Properties

### callback?

> `optional` **callback?**: [`GetObjectsCallbackTyped`](../type-aliases/GetObjectsCallbackTyped.md)\<`any`\>

Defined in: [adapter/src/lib/\_Types.ts:530](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L530)

Called with the matching objects

***

### enums?

> `optional` **enums?**: [`EnumList`](../type-aliases/EnumList.md)

Defined in: [adapter/src/lib/\_Types.ts:526](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L526)

Restrict the result to objects within these enums

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:528](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L528)

Optional settings including the user context

***

### pattern

> **pattern**: [`Pattern`](../type-aliases/Pattern.md)

Defined in: [adapter/src/lib/\_Types.ts:522](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L522)

The pattern to match object ids against

***

### type?

> `optional` **type?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:524](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/_Types.ts#L524)

Restrict the result to objects of this type
