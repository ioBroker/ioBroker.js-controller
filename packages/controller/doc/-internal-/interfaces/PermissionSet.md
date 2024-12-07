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

[types-dev/index.d.ts:112](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/index.d.ts#L112)

***

### groups

> **groups**: `string`[]

The name of the groups this ACL was merged from

#### Defined in

[types-dev/index.d.ts:125](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/index.d.ts#L125)

***

### object

> **object**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

The access rights for objects

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`object`](ObjectPermissions.md#object)

#### Defined in

[types-dev/index.d.ts:114](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/index.d.ts#L114)

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

[types-dev/index.d.ts:127](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/index.d.ts#L127)

***

### state?

> `optional` **state**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

The access rights for states

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`state`](ObjectPermissions.md#state)

#### Defined in

[types-dev/index.d.ts:118](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/index.d.ts#L118)

***

### user

> **user**: `string`

The name of the user this ACL is for

#### Defined in

[types-dev/index.d.ts:123](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/index.d.ts#L123)

***

### users

> **users**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

The access rights for users/groups

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`users`](ObjectPermissions.md#users)

#### Defined in

[types-dev/index.d.ts:116](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/index.d.ts#L116)
