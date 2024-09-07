[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / DeviceObject

# Interface: DeviceObject

[\<internal\>](../modules/internal_.md).DeviceObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`DeviceObject`**

## Table of contents

### Properties

- [\_id](internal_.DeviceObject.md#_id)
- [acl](internal_.DeviceObject.md#acl)
- [common](internal_.DeviceObject.md#common)
- [enums](internal_.DeviceObject.md#enums)
- [from](internal_.DeviceObject.md#from)
- [native](internal_.DeviceObject.md#native)
- [nonEdit](internal_.DeviceObject.md#nonedit)
- [ts](internal_.DeviceObject.md#ts)
- [type](internal_.DeviceObject.md#type)
- [user](internal_.DeviceObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:893](https://github.com/ioBroker/ioBroker.js-controller/blob/52bf8f589890e40e13e9ca18db712f69fc63488f/packages/types-dev/objects.d.ts#L893)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:900](https://github.com/ioBroker/ioBroker.js-controller/blob/52bf8f589890e40e13e9ca18db712f69fc63488f/packages/types-dev/objects.d.ts#L900)

___

### common

• **common**: [`DeviceCommon`](internal_.DeviceCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:931](https://github.com/ioBroker/ioBroker.js-controller/blob/52bf8f589890e40e13e9ca18db712f69fc63488f/packages/types-dev/objects.d.ts#L931)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:899](https://github.com/ioBroker/ioBroker.js-controller/blob/52bf8f589890e40e13e9ca18db712f69fc63488f/packages/types-dev/objects.d.ts#L899)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:901](https://github.com/ioBroker/ioBroker.js-controller/blob/52bf8f589890e40e13e9ca18db712f69fc63488f/packages/types-dev/objects.d.ts#L901)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:897](https://github.com/ioBroker/ioBroker.js-controller/blob/52bf8f589890e40e13e9ca18db712f69fc63488f/packages/types-dev/objects.d.ts#L897)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:906](https://github.com/ioBroker/ioBroker.js-controller/blob/52bf8f589890e40e13e9ca18db712f69fc63488f/packages/types-dev/objects.d.ts#L906)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:904](https://github.com/ioBroker/ioBroker.js-controller/blob/52bf8f589890e40e13e9ca18db712f69fc63488f/packages/types-dev/objects.d.ts#L904)

___

### type

• **type**: ``"device"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:930](https://github.com/ioBroker/ioBroker.js-controller/blob/52bf8f589890e40e13e9ca18db712f69fc63488f/packages/types-dev/objects.d.ts#L930)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:903](https://github.com/ioBroker/ioBroker.js-controller/blob/52bf8f589890e40e13e9ca18db712f69fc63488f/packages/types-dev/objects.d.ts#L903)
