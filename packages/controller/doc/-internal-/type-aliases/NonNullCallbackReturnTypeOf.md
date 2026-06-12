[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonNullCallbackReturnTypeOf

# Type Alias: NonNullCallbackReturnTypeOf\<T\>

> **NonNullCallbackReturnTypeOf**\<`T`\> = `Exclude`\<[`SecondParameterOf`](SecondParameterOf.md)\<`T`\>, `null` \| `undefined`\>

Defined in: [types-dev/index.d.ts:496](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/index.d.ts#L496)

Infers the return type from a callback-style API and strips out null and undefined

## Type Parameters

### T

`T` *extends* (...`args`) => `any`
