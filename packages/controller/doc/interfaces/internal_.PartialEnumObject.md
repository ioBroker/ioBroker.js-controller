[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialEnumObject

# Interface: PartialEnumObject

[\<internal\>](../modules/internal_.md).PartialEnumObject

## Hierarchy

- `Partial`\<`Omit`\<[`EnumObject`](internal_.EnumObject.md), ``"common"``\>\>

  ↳ **`PartialEnumObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialEnumObject.md#_id)
- [acl](internal_.PartialEnumObject.md#acl)
- [common](internal_.PartialEnumObject.md#common)
- [enums](internal_.PartialEnumObject.md#enums)
- [from](internal_.PartialEnumObject.md#from)
- [native](internal_.PartialEnumObject.md#native)
- [nonEdit](internal_.PartialEnumObject.md#nonedit)
- [ts](internal_.PartialEnumObject.md#ts)
- [type](internal_.PartialEnumObject.md#type)
- [user](internal_.PartialEnumObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:826](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L826)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:833](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L833)

___

### common

• `Optional` **common**: `Partial`\<[`EnumCommon`](internal_.EnumCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:887](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L887)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L832)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L834)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L830)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L839)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:837](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L837)

___

### type

• `Optional` **type**: ``"enum"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:882](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L882)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/8378eb65cafb11585b021f48b68d110664ca52a8/packages/types-dev/objects.d.ts#L836)
