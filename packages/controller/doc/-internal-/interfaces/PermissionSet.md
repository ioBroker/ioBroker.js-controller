[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PermissionSet

# Interface: PermissionSet

Defined the complete set of access rights a user has

## Extends

- [`ObjectPermissions`](ObjectPermissions.md)

## Properties

### file

> **file**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

The access rights for files

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`file`](ObjectPermissions.md#file)

#### Defined in

[types-dev/index.d.ts:116](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L116)

***

### groups

> **groups**: `string`[]

The name of the groups this ACL was merged from

#### Defined in

[types-dev/index.d.ts:129](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L129)

***

### object

> **object**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

The access rights for objects

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`object`](ObjectPermissions.md#object)

#### Defined in

[types-dev/index.d.ts:118](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L118)

***

### other

> **other**: `object`

The access rights for certain commands

#### execute

> **execute**: `boolean`

#### http

> **http**: `boolean`

#### sendto

> **sendto**: `boolean`

#### Defined in

[types-dev/index.d.ts:131](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L131)

***

### state?

> `optional` **state**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

The access rights for states

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`state`](ObjectPermissions.md#state)

#### Defined in

[types-dev/index.d.ts:122](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L122)

***

### user

> **user**: `string`

The name of the user this ACL is for

#### Defined in

[types-dev/index.d.ts:127](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L127)

***

### users

> **users**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

The access rights for users/groups

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`users`](ObjectPermissions.md#users)

#### Defined in

[types-dev/index.d.ts:120](https://github.com/ioBroker/ioBroker.js-controller/blob/d94f6cd4c9c8578765fb6ec827c46b6c6382af9b/packages/types-dev/index.d.ts#L120)
