[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectACL

# Interface: ObjectACL

Defines access rights for a single object

## Extended by

- [`StateACL`](StateACL.md)

## Properties

### object

> **object**: `number`

Linux-type permissions defining access to this object

#### Defined in

[types-dev/objects.d.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L31)

***

### owner

> **owner**: `string`

Full name of the user who owns this object, e.g. "system.user.admin"

#### Defined in

[types-dev/objects.d.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L27)

***

### ownerGroup

> **ownerGroup**: `string`

Full name of the group who owns this object, e.g. "system.group.administrator"

#### Defined in

[types-dev/objects.d.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/ec9b0b016d2d4f5ad1591c6bd149fd060033bed1/packages/types-dev/objects.d.ts#L29)
