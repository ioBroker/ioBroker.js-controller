[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetStatesOptions

# Interface: InternalGetStatesOptions

Defined in: [adapter/src/lib/\_Types.ts:731](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/_Types.ts#L731)

Options for reading multiple states

## Properties

### callback

> **callback**: [`GetStatesCallback`](../type-aliases/GetStatesCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:742](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/_Types.ts#L742)

Called with the matching states

***

### options

> **options**: `object`

Defined in: [adapter/src/lib/\_Types.ts:735](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/_Types.ts#L735)

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

Defined in: [adapter/src/lib/\_Types.ts:733](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/_Types.ts#L733)

The pattern to match state ids against
