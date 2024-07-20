[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / StateACL

# Interface: StateACL

[\<internal\>](../modules/internal_.md).StateACL

Defines access rights for a single state object

## Hierarchy

- [`ObjectACL`](internal_.ObjectACL.md)

  ↳ **`StateACL`**

## Table of contents

### Properties

- [object](internal_.StateACL.md#object)
- [owner](internal_.StateACL.md#owner)
- [ownerGroup](internal_.StateACL.md#ownergroup)
- [state](internal_.StateACL.md#state)

## Properties

### object

• **object**: `number`

Linux-type permissions defining access to this object

#### Inherited from

[ObjectACL](internal_.ObjectACL.md).[object](internal_.ObjectACL.md#object)

#### Defined in

[types-dev/objects.d.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L31)

___

### owner

• **owner**: `string`

Full name of the user who owns this object, e.g. "system.user.admin"

#### Inherited from

[ObjectACL](internal_.ObjectACL.md).[owner](internal_.ObjectACL.md#owner)

#### Defined in

[types-dev/objects.d.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L27)

___

### ownerGroup

• **ownerGroup**: `string`

Full name of the group who owns this object, e.g. "system.group.administrator"

#### Inherited from

[ObjectACL](internal_.ObjectACL.md).[ownerGroup](internal_.ObjectACL.md#ownergroup)

#### Defined in

[types-dev/objects.d.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L29)

___

### state

• **state**: `number`

Linux-type permissions defining access to this state

#### Defined in

[types-dev/objects.d.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/0e3f4a4745f0024873156040d8f9f1cc55edbba6/packages/types-dev/objects.d.ts#L37)
