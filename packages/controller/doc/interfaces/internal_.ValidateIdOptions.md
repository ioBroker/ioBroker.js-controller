[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ValidateIdOptions

# Interface: ValidateIdOptions

[\<internal\>](../modules/internal_.md).ValidateIdOptions

## Table of contents

### Properties

- [maintenance](internal_.ValidateIdOptions.md#maintenance)
- [user](internal_.ValidateIdOptions.md#user)

## Properties

### maintenance

• `Optional` **maintenance**: `boolean`

in maintenance mode, we can access invalid ids to delete them, only works with the admin user

#### Defined in

[adapter/src/lib/adapter/validator.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/4e8189ae010aadbff9fb35ee4b3861b5e29992c4/packages/adapter/src/lib/adapter/validator.ts#L10)

___

### user

• `Optional` **user**: `string`

User used to check for access rights

#### Defined in

[adapter/src/lib/adapter/validator.ts:12](https://github.com/ioBroker/ioBroker.js-controller/blob/4e8189ae010aadbff9fb35ee4b3861b5e29992c4/packages/adapter/src/lib/adapter/validator.ts#L12)
