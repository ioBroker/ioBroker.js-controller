[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ValidateIdOptions

# Interface: ValidateIdOptions

Defined in: [adapter/src/lib/adapter/validator.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/validator.ts#L10)

Options for validating an object/state id

## Properties

### maintenance?

> `optional` **maintenance?**: `boolean`

Defined in: [adapter/src/lib/adapter/validator.ts:12](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/validator.ts#L12)

in maintenance mode, we can access invalid ids to delete them, only works with the admin user

***

### user?

> `optional` **user?**: `string`

Defined in: [adapter/src/lib/adapter/validator.ts:14](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/validator.ts#L14)

User used to check for access rights
