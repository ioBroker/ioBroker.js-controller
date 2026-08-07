[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonNullCallbackReturnTypeOf

# Type Alias: NonNullCallbackReturnTypeOf\<T\>

> **NonNullCallbackReturnTypeOf**\<`T`\> = `Exclude`\<[`SecondParameterOf`](SecondParameterOf.md)\<`T`\>, `null` \| `undefined`\>

Defined in: [types-dev/index.d.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/e528bb4382035c90837f1909f28abae31a2cd84c/packages/types-dev/index.d.ts#L502)

Infers the return type from a callback-style API and strips out null and undefined

## Type Parameters

### T

`T` *extends* (...`args`) => `any`
