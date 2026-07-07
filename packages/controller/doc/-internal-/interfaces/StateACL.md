[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StateACL

# Interface: StateACL

Defined in: [types-dev/objects.d.ts:35](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/types-dev/objects.d.ts#L35)

Defines access rights for a single state object

## Extends

- [`ObjectACL`](ObjectACL.md)

## Properties

### object

> **object**: `number`

Defined in: [types-dev/objects.d.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/types-dev/objects.d.ts#L31)

Linux-type permissions defining access to this object

#### Inherited from

[`ObjectACL`](ObjectACL.md).[`object`](ObjectACL.md#object)

***

### owner

> **owner**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/types-dev/objects.d.ts#L27)

Full name of the user who owns this object, e.g. "system.user.admin"

#### Inherited from

[`ObjectACL`](ObjectACL.md).[`owner`](ObjectACL.md#owner)

***

### ownerGroup

> **ownerGroup**: `` `system.group.${string}` ``

Defined in: [types-dev/objects.d.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/types-dev/objects.d.ts#L29)

Full name of the group who owns this object, e.g. "system.group.administrator"

#### Inherited from

[`ObjectACL`](ObjectACL.md).[`ownerGroup`](ObjectACL.md#ownergroup)

***

### state

> **state**: `number`

Defined in: [types-dev/objects.d.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/145570d2c8ee8cfe3cedd5279a30628b5a1ed28e/packages/types-dev/objects.d.ts#L37)

Linux-type permissions defining access to this state
