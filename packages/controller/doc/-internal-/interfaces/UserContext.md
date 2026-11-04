[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserContext

# Interface: UserContext

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:15

Resolved permission context of the user performing a request

## Properties

### acl

> **acl**: [`ObjectPermissions`](ObjectPermissions.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:23

The effective permissions resolved from the user and its groups

***

### checked?

> `optional` **checked?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:25

Whether the permissions have already been resolved/checked

***

### group

> **group**: `` `system.group.${string}` ``

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:19

The primary group of the user

***

### groups

> **groups**: `` `system.group.${string}` ``[]

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:21

All groups the user is a member of

***

### user

> **user**: `` `system.user.${string}` ``

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:17

The user on whose behalf the request is performed
