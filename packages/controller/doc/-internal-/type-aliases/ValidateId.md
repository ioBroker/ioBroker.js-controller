[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ValidateId

# Type Alias: ValidateId

> **ValidateId** = (`id`, `isForeignId`, `options?`) => `void`

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/00e1bb8a11db1fc2c9d83f2c9fa6c2c89245df07/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L10)

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
