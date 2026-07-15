[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectACL

# Interface: ObjectACL

Defined in: [types-dev/objects.d.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/types-dev/objects.d.ts#L25)

Defines access rights for a single object

## Extended by

- [`StateACL`](StateACL.md)

## Properties

### object

> **object**: `number`

Defined in: [types-dev/objects.d.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/types-dev/objects.d.ts#L31)

Linux-type permissions defining access to this object

***

### owner

> **owner**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/types-dev/objects.d.ts#L27)

Full name of the user who owns this object, e.g. "system.user.admin"

***

### ownerGroup

> **ownerGroup**: `` `system.group.${string}` ``

Defined in: [types-dev/objects.d.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/3ea5f3c89aeec51f86485f57f5c7b330263229f6/packages/types-dev/objects.d.ts#L29)

Full name of the group who owns this object, e.g. "system.group.administrator"
