[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectACL

# Interface: ObjectACL

Defined in: [types-dev/objects.d.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L25)

Defines access rights for a single object

## Extended by

- [`StateACL`](StateACL.md)

## Properties

### object

> **object**: `number`

Defined in: [types-dev/objects.d.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L31)

Linux-type permissions defining access to this object

***

### owner

> **owner**: `string`

Defined in: [types-dev/objects.d.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L27)

Full name of the user who owns this object, e.g. "system.user.admin"

***

### ownerGroup

> **ownerGroup**: `string`

Defined in: [types-dev/objects.d.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/42efadab3febad1eb5d878e0072bbd67b3eb0223/packages/types-dev/objects.d.ts#L29)

Full name of the group who owns this object, e.g. "system.group.administrator"
