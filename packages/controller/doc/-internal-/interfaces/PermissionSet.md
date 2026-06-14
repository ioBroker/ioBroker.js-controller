[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / PermissionSet

# Interface: PermissionSet

Defined in: [types-dev/index.d.ts:151](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/index.d.ts#L151)

Defined the complete set of access rights a user has

## Extends

- [`ObjectPermissions`](ObjectPermissions.md)

## Properties

### file

> **file**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:142](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/index.d.ts#L142)

The access rights for files

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`file`](ObjectPermissions.md#file)

***

### groups

> **groups**: `string`[]

Defined in: [types-dev/index.d.ts:155](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/index.d.ts#L155)

The name of the groups this ACL was merged from

***

### object

> **object**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:144](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/index.d.ts#L144)

The access rights for objects

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`object`](ObjectPermissions.md#object)

***

### other

> **other**: `object`

Defined in: [types-dev/index.d.ts:157](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/index.d.ts#L157)

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

Defined in: [types-dev/index.d.ts:148](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/index.d.ts#L148)

The access rights for states

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`state`](ObjectPermissions.md#state)

***

### user

> **user**: `string`

Defined in: [types-dev/index.d.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/index.d.ts#L153)

The name of the user this ACL is for

***

### users

> **users**: [`ObjectOperationPermissions`](ObjectOperationPermissions.md)

Defined in: [types-dev/index.d.ts:146](https://github.com/ioBroker/ioBroker.js-controller/blob/3e1084b5e193c89d503d0adb2605bf9ae4601cf3/packages/types-dev/index.d.ts#L146)

The access rights for users/groups

#### Inherited from

[`ObjectPermissions`](ObjectPermissions.md).[`users`](ObjectPermissions.md#users)
