[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonNullCallbackReturnTypeOf

# Type Alias: NonNullCallbackReturnTypeOf\<T\>

> **NonNullCallbackReturnTypeOf**\<`T`\> = `Exclude`\<[`SecondParameterOf`](SecondParameterOf.md)\<`T`\>, `null` \| `undefined`\>

Defined in: [types-dev/index.d.ts:470](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/types-dev/index.d.ts#L470)

Infers the return type from a callback-style API and strips out null and undefined

## Type Parameters

### T

`T` *extends* (...`args`) => `any`
