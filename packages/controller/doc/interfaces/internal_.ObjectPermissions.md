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

[types/index.d.ts:90](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/index.d.ts#L90)

___

### object

• **object**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for objects

#### Defined in

[types/index.d.ts:92](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/index.d.ts#L92)

___

### state

• `Optional` **state**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for states

#### Defined in

[types/index.d.ts:96](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/index.d.ts#L96)

___

### users

• **users**: [`ObjectOperationPermissions`](internal_.ObjectOperationPermissions.md)

The access rights for users/groups

#### Defined in

[types/index.d.ts:94](https://github.com/ioBroker/ioBroker.js-controller/blob/57263052/packages/types/index.d.ts#L94)
