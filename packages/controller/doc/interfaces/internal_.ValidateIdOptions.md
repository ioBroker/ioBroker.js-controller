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

[adapter/src/lib/adapter/validator.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L10)

___

### user

• `Optional` **user**: `string`

User used to check for access rights

#### Defined in

[adapter/src/lib/adapter/validator.ts:12](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/adapter/src/lib/adapter/validator.ts#L12)
