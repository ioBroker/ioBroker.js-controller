[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialChannelObject

# Interface: PartialChannelObject

[\<internal\>](../modules/internal_.md).PartialChannelObject

## Hierarchy

- `Partial`\<`Omit`\<[`ChannelObject`](internal_.ChannelObject.md), ``"common"``\>\>

  ↳ **`PartialChannelObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialChannelObject.md#_id)
- [acl](internal_.PartialChannelObject.md#acl)
- [common](internal_.PartialChannelObject.md#common)
- [enums](internal_.PartialChannelObject.md#enums)
- [from](internal_.PartialChannelObject.md#from)
- [native](internal_.PartialChannelObject.md#native)
- [nonEdit](internal_.PartialChannelObject.md#nonedit)
- [ts](internal_.PartialChannelObject.md#ts)
- [type](internal_.PartialChannelObject.md#type)
- [user](internal_.PartialChannelObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:778](https://github.com/ioBroker/ioBroker.js-controller/blob/74044f09/packages/types-dev/objects.d.ts#L778)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:785](https://github.com/ioBroker/ioBroker.js-controller/blob/74044f09/packages/types-dev/objects.d.ts#L785)

___

### common

• `Optional` **common**: `Partial`\<[`ChannelCommon`](internal_.ChannelCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:811](https://github.com/ioBroker/ioBroker.js-controller/blob/74044f09/packages/types-dev/objects.d.ts#L811)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:784](https://github.com/ioBroker/ioBroker.js-controller/blob/74044f09/packages/types-dev/objects.d.ts#L784)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:786](https://github.com/ioBroker/ioBroker.js-controller/blob/74044f09/packages/types-dev/objects.d.ts#L786)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:782](https://github.com/ioBroker/ioBroker.js-controller/blob/74044f09/packages/types-dev/objects.d.ts#L782)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:791](https://github.com/ioBroker/ioBroker.js-controller/blob/74044f09/packages/types-dev/objects.d.ts#L791)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:789](https://github.com/ioBroker/ioBroker.js-controller/blob/74044f09/packages/types-dev/objects.d.ts#L789)

___

### type

• `Optional` **type**: ``"channel"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:806](https://github.com/ioBroker/ioBroker.js-controller/blob/74044f09/packages/types-dev/objects.d.ts#L806)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:788](https://github.com/ioBroker/ioBroker.js-controller/blob/74044f09/packages/types-dev/objects.d.ts#L788)
