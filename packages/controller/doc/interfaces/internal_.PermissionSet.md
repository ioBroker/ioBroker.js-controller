[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PermissionSet

# Interface: PermissionSet

[<internal>](../modules/internal_.md).PermissionSet

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

node_modules/@types/iobroker/index.d.ts:87

___

### groups

• **groups**: `string`[]

The name of the groups this ACL was merged from

#### Defined in

node_modules/@types/iobroker/index.d.ts:100

___

### object

• **object**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for objects

#### Inherited from

[ObjectPermissions](internal_.ObjectPermissions.md).[object](internal_.ObjectPermissions.md#object)

#### Defined in

node_modules/@types/iobroker/index.d.ts:89

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

node_modules/@types/iobroker/index.d.ts:102

___

### state

• `Optional` **state**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for states

#### Inherited from

[ObjectPermissions](internal_.ObjectPermissions.md).[state](internal_.ObjectPermissions.md#state)

#### Defined in

node_modules/@types/iobroker/index.d.ts:93

___

### user

• **user**: `string`

The name of the user this ACL is for

#### Defined in

node_modules/@types/iobroker/index.d.ts:98

___

### users

• **users**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for users/groups

#### Inherited from

[ObjectPermissions](internal_.ObjectPermissions.md).[users](internal_.ObjectPermissions.md#users)

#### Defined in

node_modules/@types/iobroker/index.d.ts:91
