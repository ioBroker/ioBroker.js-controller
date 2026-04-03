[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PermissionSet

# Interface: PermissionSet

Defined in: [types-dev/index.d.ts:125](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L125)

Defined the complete set of access rights a user has

## Extends

- [`ObjectPermissions`](ObjectPermissions.md)

## Properties

### file

> **file**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:116](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L116)

The access rights for files

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`file`](ObjectPermissions.md#file)

***

### groups

> **groups**: `string`[]

Defined in: [types-dev/index.d.ts:129](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L129)

The name of the groups this ACL was merged from

***

### object

> **object**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:118](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L118)

The access rights for objects

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`object`](ObjectPermissions.md#object)

***

### other

> **other**: `object`

Defined in: [types-dev/index.d.ts:131](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L131)

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

Defined in: [types-dev/index.d.ts:122](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L122)

The access rights for states

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`state`](ObjectPermissions.md#state)

***

### user

> **user**: `string`

Defined in: [types-dev/index.d.ts:127](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L127)

The name of the user this ACL is for

***

### users

> **users**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:120](https://github.com/ioBroker/ioBroker.js-controller/blob/a3193055d7036f87e1ec37944282c0a27e0c2990/packages/types-dev/index.d.ts#L120)

The access rights for users/groups

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`users`](ObjectPermissions.md#users)
