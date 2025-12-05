[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonNullCallbackReturnTypeOf

# Type Alias: NonNullCallbackReturnTypeOf\<T\>

> **NonNullCallbackReturnTypeOf**\<`T`\>: `Exclude`\<[`SecondParameterOf`](SecondParameterOf.md)\<`T`\>, `null` \| `undefined`\>

Infers the return type from a callback-style API and strips out null and undefined

## Type Parameters

• **T** *extends* (...`args`) => `any`

## Defined in

[types-dev/index.d.ts:470](https://github.com/ioBroker/ioBroker.js-controller/blob/335bb5daf65504b8d1d2ebe31260f371e6c9ea1d/packages/types-dev/index.d.ts#L470)
