[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StateACL

# Interface: StateACL

Defines access rights for a single state object

## Extends

- [`ObjectACL`](ObjectACL.md)

## Properties

### object

> **object**: `number`

Linux-type permissions defining access to this object

#### Inherited from

[`ObjectACL`](ObjectACL.md).[`object`](ObjectACL.md#object)

#### Defined in

[types-dev/objects.d.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L31)

***

### owner

> **owner**: `string`

Full name of the user who owns this object, e.g. "system.user.admin"

#### Inherited from

[`ObjectACL`](ObjectACL.md).[`owner`](ObjectACL.md#owner)

#### Defined in

[types-dev/objects.d.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L27)

***

### ownerGroup

> **ownerGroup**: `string`

Full name of the group who owns this object, e.g. "system.group.administrator"

#### Inherited from

[`ObjectACL`](ObjectACL.md).[`ownerGroup`](ObjectACL.md#ownergroup)

#### Defined in

[types-dev/objects.d.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L29)

***

### state

> **state**: `number`

Linux-type permissions defining access to this state

#### Defined in

[types-dev/objects.d.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/78e6b4abb1172f2465daea1c5c2c1a34bdd12a81/packages/types-dev/objects.d.ts#L37)
