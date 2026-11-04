[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ACLObject

# Interface: ACLObject

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:35

The access control list of an object, state or file

## Properties

### file

> **file**: `number`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:45

Permission bitmask for file access

***

### object

> **object**: `number`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:41

Permission bitmask for object access

***

### owner

> **owner**: `` `system.user.${string}` ``

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:37

The user that owns the object

***

### ownerGroup

> **ownerGroup**: `` `system.group.${string}` ``

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:39

The group that owns the object

***

### state

> **state**: `number`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:43

Permission bitmask for state access
