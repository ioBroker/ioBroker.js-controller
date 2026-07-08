[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetStatesOptions

# Interface: InternalGetStatesOptions

Defined in: [adapter/src/lib/\_Types.ts:722](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L722)

Options for reading multiple states

## Properties

### callback

> **callback**: [`GetStatesCallback`](../type-aliases/GetStatesCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:733](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L733)

Called with the matching states

***

### options

> **options**: `object`

Defined in: [adapter/src/lib/\_Types.ts:726](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L726)

Optional settings including the user context

#### \_objects?

> `optional` **\_objects?**: ([`StateObject`](StateObject.md) \| `null`)[]

#### checked?

> `optional` **checked?**: `boolean`

#### maintenance?

> `optional` **maintenance?**: `boolean`

#### user?

> `optional` **user?**: `` `system.user.${string}` ``

***

### pattern

> **pattern**: [`Pattern`](../type-aliases/Pattern.md)

Defined in: [adapter/src/lib/\_Types.ts:724](https://github.com/ioBroker/ioBroker.js-controller/blob/0b1c41301d3844d4f8b3814b951fb59399cf9204/packages/adapter/src/lib/_Types.ts#L724)

The pattern to match state ids against
