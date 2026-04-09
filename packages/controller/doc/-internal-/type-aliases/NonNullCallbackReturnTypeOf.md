[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonNullCallbackReturnTypeOf

# Type Alias: NonNullCallbackReturnTypeOf\<T\>

> **NonNullCallbackReturnTypeOf**\<`T`\> = `Exclude`\<[`SecondParameterOf`](SecondParameterOf.md)\<`T`\>, `null` \| `undefined`\>

Defined in: [types-dev/index.d.ts:470](https://github.com/ioBroker/ioBroker.js-controller/blob/feacb179dc3edcfa0fe65100ac8cbe242bfb19d4/packages/types-dev/index.d.ts#L470)

Infers the return type from a callback-style API and strips out null and undefined

## Type Parameters

### T

`T` *extends* (...`args`) => `any`
