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

[types/index.d.ts:90](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/index.d.ts#L90)

___

### groups

• **groups**: `string`[]

The name of the groups this ACL was merged from

#### Defined in

[types/index.d.ts:103](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/index.d.ts#L103)

___

### object

• **object**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for objects

#### Inherited from

[ObjectPermissions](internal_.ObjectPermissions.md).[object](internal_.ObjectPermissions.md#object)

#### Defined in

[types/index.d.ts:92](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/index.d.ts#L92)

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

[types/index.d.ts:105](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/index.d.ts#L105)

___

### state

• `Optional` **state**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for states

#### Inherited from

[ObjectPermissions](internal_.ObjectPermissions.md).[state](internal_.ObjectPermissions.md#state)

#### Defined in

[types/index.d.ts:96](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/index.d.ts#L96)

___

### user

• **user**: `string`

The name of the user this ACL is for

#### Defined in

[types/index.d.ts:101](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/index.d.ts#L101)

___

### users

• **users**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for users/groups

#### Inherited from

[ObjectPermissions](internal_.ObjectPermissions.md).[users](internal_.ObjectPermissions.md#users)

#### Defined in

[types/index.d.ts:94](https://github.com/ioBroker/ioBroker.js-controller/blob/16cebeed/packages/types/index.d.ts#L94)
