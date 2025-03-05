[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonNullCallbackReturnTypeOf

# Type Alias: NonNullCallbackReturnTypeOf\<T\>

> **NonNullCallbackReturnTypeOf**\<`T`\>: `Exclude`\<[`SecondParameterOf`](SecondParameterOf.md)\<`T`\>, `null` \| `undefined`\>

Infers the return type from a callback-style API and strips out null and undefined

## Type Parameters

• **T** *extends* (...`args`) => `any`

## Defined in

[types-dev/index.d.ts:459](https://github.com/ioBroker/ioBroker.js-controller/blob/1bddb836daa1042928a00fd5fb5e1f69cf0ebd69/packages/types-dev/index.d.ts#L459)
