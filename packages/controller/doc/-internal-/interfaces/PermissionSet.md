[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PermissionSet

# Interface: PermissionSet

Defined in: [types-dev/index.d.ts:283](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L283)

Defined the complete set of access rights a user has

## Extends

- [`ObjectPermissions`](ObjectPermissions.md)

## Properties

### file

> **file**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:274](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L274)

The access rights for files

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`file`](ObjectPermissions.md#file)

***

### groups

> **groups**: `` `system.group.${string}` ``[]

Defined in: [types-dev/index.d.ts:287](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L287)

The name of the groups this ACL was merged from

***

### object

> **object**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:276](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L276)

The access rights for objects

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`object`](ObjectPermissions.md#object)

***

### other

> **other**: `object`

Defined in: [types-dev/index.d.ts:289](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L289)

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

Defined in: [types-dev/index.d.ts:280](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L280)

The access rights for states

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`state`](ObjectPermissions.md#state)

***

### user

> **user**: `` `system.user.${string}` ``

Defined in: [types-dev/index.d.ts:285](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L285)

The name of the user this ACL is for

***

### users

> **users**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:278](https://github.com/ioBroker/ioBroker.js-controller/blob/d07571064cc52d1c5a17e823e5925d743d638713/packages/types-dev/index.d.ts#L278)

The access rights for users/groups

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`users`](ObjectPermissions.md#users)
