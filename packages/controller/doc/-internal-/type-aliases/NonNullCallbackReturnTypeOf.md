[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / NonNullCallbackReturnTypeOf

# Type Alias: NonNullCallbackReturnTypeOf\<T\>

> **NonNullCallbackReturnTypeOf**\<`T`\> = `Exclude`\<[`SecondParameterOf`](SecondParameterOf.md)\<`T`\>, `null` \| `undefined`\>

Defined in: [types-dev/index.d.ts:502](https://github.com/ioBroker/ioBroker.js-controller/blob/b0890493ef07142eea65eaaa9f128f16abadf220/packages/types-dev/index.d.ts#L502)

Infers the return type from a callback-style API and strips out null and undefined

## Type Parameters

### T

`T` *extends* (...`args`) => `any`
