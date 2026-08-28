[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ValidateId

# Type Alias: ValidateId

> **ValidateId** = (`id`, `isForeignId`, `options?`) => `void`

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L10)

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
