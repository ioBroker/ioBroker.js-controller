[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PermissionSet

# Interface: PermissionSet

[\<internal\>](../modules/internal_.md).PermissionSet

Defined the complete set of access rights a user has

## Hierarchy

- [`ObjectPermissions`](internal_.ObjectPermissions.md)

  ↳ **`PermissionSet`**

## Table of contents

### Properties

- [file](internal_.PermissionSet.md#file)
- [groups](internal_.PermissionSet.md#groups)
- [object](internal_.PermissionSet.md#object)
- [other](internal_.PermissionSet.md#other)
- [state](internal_.PermissionSet.md#state)
- [user](internal_.PermissionSet.md#user)
- [users](internal_.PermissionSet.md#users)

## Properties

### file

• **file**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for files

#### Inherited from

[ObjectPermissions](internal_.ObjectPermissions.md).[file](internal_.ObjectPermissions.md#file)

#### Defined in

[types-dev/index.d.ts:108](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/index.d.ts#L108)

___

### groups

• **groups**: `string`[]

The name of the groups this ACL was merged from

#### Defined in

[types-dev/index.d.ts:121](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/index.d.ts#L121)

___

### object

• **object**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for objects

#### Inherited from

[ObjectPermissions](internal_.ObjectPermissions.md).[object](internal_.ObjectPermissions.md#object)

#### Defined in

[types-dev/index.d.ts:110](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/index.d.ts#L110)

___

### other

• **other**: `Object`

The access rights for certain commands

#### Type declaration

| Name | Type |
| :------ | :------ |
| `execute` | `boolean` |
| `http` | `boolean` |
| `sendto` | `boolean` |

#### Defined in

[types-dev/index.d.ts:123](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/index.d.ts#L123)

___

### state

• `Optional` **state**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for states

#### Inherited from

[ObjectPermissions](internal_.ObjectPermissions.md).[state](internal_.ObjectPermissions.md#state)

#### Defined in

[types-dev/index.d.ts:114](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/index.d.ts#L114)

___

### user

• **user**: `string`

The name of the user this ACL is for

#### Defined in

[types-dev/index.d.ts:119](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/index.d.ts#L119)

___

### users

• **users**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for users/groups

#### Inherited from

[ObjectPermissions](internal_.ObjectPermissions.md).[users](internal_.ObjectPermissions.md#users)

#### Defined in

[types-dev/index.d.ts:112](https://github.com/ioBroker/ioBroker.js-controller/blob/63fb6f8b0/packages/types-dev/index.d.ts#L112)
