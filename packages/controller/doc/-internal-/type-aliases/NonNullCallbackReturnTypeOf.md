[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonNullCallbackReturnTypeOf

# Type Alias: NonNullCallbackReturnTypeOf\<T\>

> **NonNullCallbackReturnTypeOf**\<`T`\>: `Exclude`\<[`SecondParameterOf`](SecondParameterOf.md)\<`T`\>, `null` \| `undefined`\>

Infers the return type from a callback-style API and strips out null and undefined

## Type Parameters

• **T** *extends* (...`args`) => `any`

## Defined in

[types-dev/index.d.ts:470](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L470)
