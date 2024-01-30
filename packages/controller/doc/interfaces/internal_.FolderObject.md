[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / FolderObject

# Interface: FolderObject

[\<internal\>](../modules/internal_.md).FolderObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`FolderObject`**

## Table of contents

### Properties

- [\_id](internal_.FolderObject.md#_id)
- [acl](internal_.FolderObject.md#acl)
- [common](internal_.FolderObject.md#common)
- [enums](internal_.FolderObject.md#enums)
- [from](internal_.FolderObject.md#from)
- [native](internal_.FolderObject.md#native)
- [nonEdit](internal_.FolderObject.md#nonedit)
- [ts](internal_.FolderObject.md#ts)
- [type](internal_.FolderObject.md#type)
- [user](internal_.FolderObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

[types-dev/objects.d.ts:699](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L699)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

[types-dev/objects.d.ts:706](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L706)

___

### common

• **common**: [`OtherCommon`](internal_.OtherCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

[types-dev/objects.d.ts:745](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L745)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

[types-dev/objects.d.ts:705](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L705)

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

[types-dev/objects.d.ts:707](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L707)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

[types-dev/objects.d.ts:703](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L703)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

[BaseObject](internal_.BaseObject.md).[nonEdit](internal_.BaseObject.md#nonedit)

#### Defined in

[types-dev/objects.d.ts:712](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L712)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

[types-dev/objects.d.ts:710](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L710)

___

### type

• **type**: ``"folder"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

[types-dev/objects.d.ts:743](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L743)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

[types-dev/objects.d.ts:709](https://github.com/ioBroker/ioBroker.js-controller/blob/70007768/packages/types-dev/objects.d.ts#L709)
