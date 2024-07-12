[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialDeviceObject

# Interface: PartialDeviceObject

[\<internal\>](../modules/internal_.md).PartialDeviceObject

## Hierarchy

- `Partial`\<`Omit`\<[`DeviceObject`](internal_.DeviceObject.md), ``"common"``\>\>

  ↳ **`PartialDeviceObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialDeviceObject.md#_id)
- [acl](internal_.PartialDeviceObject.md#acl)
- [common](internal_.PartialDeviceObject.md#common)
- [enums](internal_.PartialDeviceObject.md#enums)
- [from](internal_.PartialDeviceObject.md#from)
- [native](internal_.PartialDeviceObject.md#native)
- [nonEdit](internal_.PartialDeviceObject.md#nonedit)
- [ts](internal_.PartialDeviceObject.md#ts)
- [type](internal_.PartialDeviceObject.md#type)
- [user](internal_.PartialDeviceObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L832)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L839)

___

### common

• `Optional` **common**: `Partial`\<[`DeviceCommon`](internal_.DeviceCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:874](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L874)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:838](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L838)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:840](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L840)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L836)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:845](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L845)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:843](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L843)

___

### type

• `Optional` **type**: ``"device"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:869](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L869)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:842](https://github.com/ioBroker/ioBroker.js-controller/blob/5c723a4aca9318c1ca4bf76890cc718cda8d7a8f/packages/types-dev/objects.d.ts#L842)
