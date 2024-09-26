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

[types-dev/objects.d.ts:901](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L901)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:908](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L908)

___

### common

• `Optional` **common**: `Partial`\<[`OtherCommon`](internal_.OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:953](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L953)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:907](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L907)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:909](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L909)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:905](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L905)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:914](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L914)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:912](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L912)

___

### type

• `Optional` **type**: ``"folder"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:947](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L947)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:911](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/objects.d.ts#L911)
