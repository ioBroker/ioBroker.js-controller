[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ACLObject

# Interface: ACLObject

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:29

Access control list of an object, state or file

## Properties

### file

> **file**: `number`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:39

Permission bitmask for file access

***

### object

> **object**: `number`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:35

Permission bitmask for object access

***

### owner

> **owner**: `` `system.user.${string}` ``

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:31

The user that owns the object

***

### ownerGroup

> **ownerGroup**: `` `system.group.${string}` ``

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:33

The group that owns the object

***

### state

> **state**: `number`

Defined in: db-objects-redis/build/esm/lib/objects/objectsUtils.d.ts:37

Permission bitmask for state access
