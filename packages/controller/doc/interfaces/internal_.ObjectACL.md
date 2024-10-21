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

[types-dev/objects.d.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/610f8794837c90e96c314dec3a8f4af930e84d94/packages/types-dev/objects.d.ts#L31)

___

### owner

• **owner**: `string`

Full name of the user who owns this object, e.g. "system.user.admin"

#### Defined in

[types-dev/objects.d.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/610f8794837c90e96c314dec3a8f4af930e84d94/packages/types-dev/objects.d.ts#L27)

___

### ownerGroup

• **ownerGroup**: `string`

Full name of the group who owns this object, e.g. "system.group.administrator"

#### Defined in

[types-dev/objects.d.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/610f8794837c90e96c314dec3a8f4af930e84d94/packages/types-dev/objects.d.ts#L29)
