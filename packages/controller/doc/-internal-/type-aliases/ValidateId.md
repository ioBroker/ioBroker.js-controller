[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ValidateId

# Type Alias: ValidateId

> **ValidateId** = (`id`, `isForeignId`, `options?`) => `void`

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/f762c04602a1e8ae23acc09fb04a327aa5278c52/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L10)

Validates a (possibly foreign) id; throws on invalid. Bound to the adapter's Validator.

## Parameters

### id

`string`

### isForeignId

`boolean`

### options?

[`ValidateIdOptions`](../interfaces/ValidateIdOptions.md) \| `null`

## Returns

`void`
