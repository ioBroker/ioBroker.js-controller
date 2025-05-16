[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonNullCallbackReturnTypeOf

# Type Alias: NonNullCallbackReturnTypeOf\<T\>

> **NonNullCallbackReturnTypeOf**\<`T`\>: `Exclude`\<[`SecondParameterOf`](SecondParameterOf.md)\<`T`\>, `null` \| `undefined`\>

Infers the return type from a callback-style API and strips out null and undefined

## Type Parameters

• **T** *extends* (...`args`) => `any`

## Defined in

[types-dev/index.d.ts:461](https://github.com/ioBroker/ioBroker.js-controller/blob/5cf8c0f8f818a3bd00a8d0bf4c2516676b695603/packages/types-dev/index.d.ts#L461)
