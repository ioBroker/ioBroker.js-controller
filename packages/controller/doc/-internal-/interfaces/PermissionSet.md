[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PermissionSet

# Interface: PermissionSet

Defined in: [types-dev/index.d.ts:289](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L289)

Defined the complete set of access rights a user has

## Extends

- [`ObjectPermissions`](ObjectPermissions.md)

## Properties

### file

> **file**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:280](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L280)

The access rights for files

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`file`](ObjectPermissions.md#file)

***

### groups

> **groups**: `` `system.group.${string}` ``[]

Defined in: [types-dev/index.d.ts:293](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L293)

The name of the groups this ACL was merged from

***

### object

> **object**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:282](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L282)

The access rights for objects

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`object`](ObjectPermissions.md#object)

***

### other

> **other**: `object`

Defined in: [types-dev/index.d.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L295)

The access rights for certain commands

#### execute

> **execute**: `boolean`

#### http

> **http**: `boolean`

#### sendto

> **sendto**: `boolean`

***

### state?

> `optional` **state?**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:286](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L286)

The access rights for states

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`state`](ObjectPermissions.md#state)

***

### user

> **user**: `` `system.user.${string}` ``

Defined in: [types-dev/index.d.ts:291](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L291)

The name of the user this ACL is for

***

### users

> **users**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:284](https://github.com/ioBroker/ioBroker.js-controller/blob/98273cb4cc0c7037120155b66f48ca6569e88c55/packages/types-dev/index.d.ts#L284)

The access rights for users/groups

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`users`](ObjectPermissions.md#users)
