[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetStatesOptions

# Interface: InternalGetStatesOptions

Defined in: [adapter/src/lib/\_Types.ts:766](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/_Types.ts#L766)

Options for reading multiple states

## Properties

### callback

> **callback**: [`GetStatesCallback`](../type-aliases/GetStatesCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:777](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/_Types.ts#L777)

Called with the matching states

***

### options

> **options**: `object`

Defined in: [adapter/src/lib/\_Types.ts:770](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/_Types.ts#L770)

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

Defined in: [adapter/src/lib/\_Types.ts:768](https://github.com/ioBroker/ioBroker.js-controller/blob/a17e80dea823ba7c3680a13c50b1c95e26a6a048/packages/adapter/src/lib/_Types.ts#L768)

The pattern to match state ids against
