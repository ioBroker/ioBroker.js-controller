[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectACL

# Interface: ObjectACL

Defined in: [types-dev/objects.d.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/types-dev/objects.d.ts#L25)

Defines access rights for a single object

## Extended by

- [`StateACL`](StateACL.md)

## Properties

### object

> **object**: `number`

Defined in: [types-dev/objects.d.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/types-dev/objects.d.ts#L31)

Linux-type permissions defining access to this object

***

### owner

> **owner**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/types-dev/objects.d.ts#L27)

Full name of the user who owns this object, e.g. "system.user.admin"

***

### ownerGroup

> **ownerGroup**: `` `system.group.${string}` ``

Defined in: [types-dev/objects.d.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/types-dev/objects.d.ts#L29)

Full name of the group who owns this object, e.g. "system.group.administrator"
