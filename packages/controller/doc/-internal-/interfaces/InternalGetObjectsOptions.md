[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetObjectsOptions

# Interface: InternalGetObjectsOptions

Defined in: [adapter/src/lib/\_Types.ts:516](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L516)

Options for reading multiple objects

## Properties

### callback?

> `optional` **callback?**: [`GetObjectsCallbackTyped`](../type-aliases/GetObjectsCallbackTyped.md)\<`any`\>

Defined in: [adapter/src/lib/\_Types.ts:526](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L526)

Called with the matching objects

***

### enums?

> `optional` **enums?**: [`EnumList`](../type-aliases/EnumList.md)

Defined in: [adapter/src/lib/\_Types.ts:522](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L522)

Restrict the result to objects within these enums

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:524](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L524)

Optional settings including the user context

***

### pattern

> **pattern**: [`Pattern`](../type-aliases/Pattern.md)

Defined in: [adapter/src/lib/\_Types.ts:518](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L518)

The pattern to match object ids against

***

### type?

> `optional` **type?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:520](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L520)

Restrict the result to objects of this type
