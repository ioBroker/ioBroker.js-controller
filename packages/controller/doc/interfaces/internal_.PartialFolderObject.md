[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialFolderObject

# Interface: PartialFolderObject

[\<internal\>](../modules/internal_.md).PartialFolderObject

## Hierarchy

- `Partial`\<`Omit`\<[`FolderObject`](internal_.FolderObject.md), ``"common"``\>\>

  ↳ **`PartialFolderObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialFolderObject.md#_id)
- [acl](internal_.PartialFolderObject.md#acl)
- [common](internal_.PartialFolderObject.md#common)
- [enums](internal_.PartialFolderObject.md#enums)
- [from](internal_.PartialFolderObject.md#from)
- [native](internal_.PartialFolderObject.md#native)
- [nonEdit](internal_.PartialFolderObject.md#nonedit)
- [ts](internal_.PartialFolderObject.md#ts)
- [type](internal_.PartialFolderObject.md#type)
- [user](internal_.PartialFolderObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:699](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L699)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L706)

___

### common

• `Optional` **common**: `Partial`\<[`OtherCommon`](internal_.OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:748](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L748)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:705](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L705)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:707](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L707)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:703](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L703)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:712](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L712)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:710](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L710)

___

### type

• `Optional` **type**: ``"folder"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:743](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L743)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:709](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L709)
