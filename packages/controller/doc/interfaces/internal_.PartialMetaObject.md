[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialMetaObject

# Interface: PartialMetaObject

[\<internal\>](../modules/internal_.md).PartialMetaObject

## Hierarchy

- `Partial`\<`Omit`\<[`MetaObject`](internal_.MetaObject.md), ``"common"``\>\>

  ↳ **`PartialMetaObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialMetaObject.md#_id)
- [acl](internal_.PartialMetaObject.md#acl)
- [common](internal_.PartialMetaObject.md#common)
- [enums](internal_.PartialMetaObject.md#enums)
- [from](internal_.PartialMetaObject.md#from)
- [native](internal_.PartialMetaObject.md#native)
- [nonEdit](internal_.PartialMetaObject.md#nonedit)
- [ts](internal_.PartialMetaObject.md#ts)
- [type](internal_.PartialMetaObject.md#type)
- [user](internal_.PartialMetaObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:754](https://github.com/ioBroker/ioBroker.js-controller/blob/ea40ee4f/packages/types-dev/objects.d.ts#L754)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:761](https://github.com/ioBroker/ioBroker.js-controller/blob/ea40ee4f/packages/types-dev/objects.d.ts#L761)

___

### common

• `Optional` **common**: `Partial`\<[`MetaCommon`](internal_.MetaCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:819](https://github.com/ioBroker/ioBroker.js-controller/blob/ea40ee4f/packages/types-dev/objects.d.ts#L819)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:760](https://github.com/ioBroker/ioBroker.js-controller/blob/ea40ee4f/packages/types-dev/objects.d.ts#L760)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:762](https://github.com/ioBroker/ioBroker.js-controller/blob/ea40ee4f/packages/types-dev/objects.d.ts#L762)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:758](https://github.com/ioBroker/ioBroker.js-controller/blob/ea40ee4f/packages/types-dev/objects.d.ts#L758)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:767](https://github.com/ioBroker/ioBroker.js-controller/blob/ea40ee4f/packages/types-dev/objects.d.ts#L767)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:765](https://github.com/ioBroker/ioBroker.js-controller/blob/ea40ee4f/packages/types-dev/objects.d.ts#L765)

___

### type

• `Optional` **type**: ``"meta"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:815](https://github.com/ioBroker/ioBroker.js-controller/blob/ea40ee4f/packages/types-dev/objects.d.ts#L815)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:764](https://github.com/ioBroker/ioBroker.js-controller/blob/ea40ee4f/packages/types-dev/objects.d.ts#L764)
