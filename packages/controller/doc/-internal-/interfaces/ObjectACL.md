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

[types-dev/objects.d.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L31)

***

### owner

> **owner**: `string`

Full name of the user who owns this object, e.g. "system.user.admin"

#### Defined in

[types-dev/objects.d.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L27)

***

### ownerGroup

> **ownerGroup**: `string`

Full name of the group who owns this object, e.g. "system.group.administrator"

#### Defined in

[types-dev/objects.d.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/d2df4abc6ba7ce21ad5f7176f979fca5189c4bea/packages/types-dev/objects.d.ts#L29)
