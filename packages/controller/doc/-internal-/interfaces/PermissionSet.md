[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PermissionSet

# Interface: PermissionSet

Defined in: [types-dev/index.d.ts:284](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L284)

Defined the complete set of access rights a user has

## Extends

- [`ObjectPermissions`](ObjectPermissions.md)

## Properties

### file

> **file**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:275](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L275)

The access rights for files

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`file`](ObjectPermissions.md#file)

***

### groups

> **groups**: `` `system.group.${string}` ``[]

Defined in: [types-dev/index.d.ts:288](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L288)

The name of the groups this ACL was merged from

***

### object

> **object**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:277](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L277)

The access rights for objects

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`object`](ObjectPermissions.md#object)

***

### other

> **other**: `object`

Defined in: [types-dev/index.d.ts:290](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L290)

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

Defined in: [types-dev/index.d.ts:281](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L281)

The access rights for states

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`state`](ObjectPermissions.md#state)

***

### user

> **user**: `` `system.user.${string}` ``

Defined in: [types-dev/index.d.ts:286](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L286)

The name of the user this ACL is for

***

### users

> **users**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:279](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L279)

The access rights for users/groups

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`users`](ObjectPermissions.md#users)
