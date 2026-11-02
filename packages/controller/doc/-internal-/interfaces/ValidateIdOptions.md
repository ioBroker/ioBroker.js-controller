[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ValidateIdOptions

# Interface: ValidateIdOptions

Defined in: [adapter/src/lib/adapter/validator.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/adapter/src/lib/adapter/validator.ts#L10)

Options for validating an object/state id

## Properties

### maintenance?

> `optional` **maintenance?**: `boolean`

Defined in: [adapter/src/lib/adapter/validator.ts:12](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/adapter/src/lib/adapter/validator.ts#L12)

in maintenance mode, we can access invalid ids to delete them, only works with the admin user

***

### user?

> `optional` **user?**: `string`

Defined in: [adapter/src/lib/adapter/validator.ts:14](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/adapter/src/lib/adapter/validator.ts#L14)

User used to check for access rights
