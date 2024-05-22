[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ObjectACL

# Interface: ObjectACL

[\<internal\>](../modules/internal_.md).ObjectACL

Defines access rights for a single object

## Hierarchy

- **`ObjectACL`**

  ↳ [`StateACL`](internal_.StateACL.md)

## Table of contents

### Properties

- [object](internal_.ObjectACL.md#object)
- [owner](internal_.ObjectACL.md#owner)
- [ownerGroup](internal_.ObjectACL.md#ownergroup)

## Properties

### object

• **object**: `number`

Linux-type permissions defining access to this object

#### Defined in

[types-dev/objects.d.ts:30](https://github.com/ioBroker/ioBroker.js-controller/blob/04f0eac95/packages/types-dev/objects.d.ts#L30)

___

### owner

• **owner**: `string`

Full name of the user who owns this object, e.g. "system.user.admin"

#### Defined in

[types-dev/objects.d.ts:26](https://github.com/ioBroker/ioBroker.js-controller/blob/04f0eac95/packages/types-dev/objects.d.ts#L26)

___

### ownerGroup

• **ownerGroup**: `string`

Full name of the group who owns this object, e.g. "system.group.administrator"

#### Defined in

[types-dev/objects.d.ts:28](https://github.com/ioBroker/ioBroker.js-controller/blob/04f0eac95/packages/types-dev/objects.d.ts#L28)
