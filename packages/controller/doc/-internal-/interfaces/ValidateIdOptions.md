[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ValidateIdOptions

# Interface: ValidateIdOptions

Defined in: [adapter/src/lib/adapter/validator.ts:8](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/adapter/src/lib/adapter/validator.ts#L8)

## Properties

### maintenance?

> `optional` **maintenance?**: `boolean`

Defined in: [adapter/src/lib/adapter/validator.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/adapter/src/lib/adapter/validator.ts#L10)

in maintenance mode, we can access invalid ids to delete them, only works with the admin user

***

### user?

> `optional` **user?**: `string`

Defined in: [adapter/src/lib/adapter/validator.ts:12](https://github.com/ioBroker/ioBroker.js-controller/blob/0a6edee6fb903bd31f152637b37035ff05ce3fc6/packages/adapter/src/lib/adapter/validator.ts#L12)

User used to check for access rights
