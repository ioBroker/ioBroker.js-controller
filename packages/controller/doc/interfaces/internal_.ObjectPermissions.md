[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ObjectPermissions

# Interface: ObjectPermissions

[<internal>](../modules/internal_.md).ObjectPermissions

Defines the rights a user or group has to change objects

## Hierarchy

- **`ObjectPermissions`**

  ↳ [`PermissionSet`](internal_.PermissionSet.md)

## Table of contents

### Properties

- [file](internal_.ObjectPermissions.md#file)
- [object](internal_.ObjectPermissions.md#object)
- [state](internal_.ObjectPermissions.md#state)
- [users](internal_.ObjectPermissions.md#users)

## Properties

### file

• **file**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for files

#### Defined in

node_modules/@types/iobroker/index.d.ts:87

___

### object

• **object**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for objects

#### Defined in

node_modules/@types/iobroker/index.d.ts:89

___

### state

• `Optional` **state**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for states

#### Defined in

node_modules/@types/iobroker/index.d.ts:93

___

### users

• **users**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for users/groups

#### Defined in

node_modules/@types/iobroker/index.d.ts:91
