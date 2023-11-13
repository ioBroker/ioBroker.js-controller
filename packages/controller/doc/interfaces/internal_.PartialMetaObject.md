[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialMetaObject

# Interface: PartialMetaObject

[<internal>](../modules/internal_.md).PartialMetaObject

## Hierarchy

- `Partial`<`Omit`<[`MetaObject`](internal_.MetaObject.md), ``"common"``\>\>

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

[types-dev/objects.d.ts:667](https://github.com/ioBroker/ioBroker.js-controller/blob/73031bf7/packages/types-dev/objects.d.ts#L667)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:674](https://github.com/ioBroker/ioBroker.js-controller/blob/73031bf7/packages/types-dev/objects.d.ts#L674)

___

### common

• `Optional` **common**: `Partial`<[`MetaCommon`](internal_.MetaCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:732](https://github.com/ioBroker/ioBroker.js-controller/blob/73031bf7/packages/types-dev/objects.d.ts#L732)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:673](https://github.com/ioBroker/ioBroker.js-controller/blob/73031bf7/packages/types-dev/objects.d.ts#L673)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:675](https://github.com/ioBroker/ioBroker.js-controller/blob/73031bf7/packages/types-dev/objects.d.ts#L675)

___

### native

• `Optional` **native**: `Record`<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:671](https://github.com/ioBroker/ioBroker.js-controller/blob/73031bf7/packages/types-dev/objects.d.ts#L671)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:680](https://github.com/ioBroker/ioBroker.js-controller/blob/73031bf7/packages/types-dev/objects.d.ts#L680)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:678](https://github.com/ioBroker/ioBroker.js-controller/blob/73031bf7/packages/types-dev/objects.d.ts#L678)

___

### type

• `Optional` **type**: ``"meta"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:728](https://github.com/ioBroker/ioBroker.js-controller/blob/73031bf7/packages/types-dev/objects.d.ts#L728)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:677](https://github.com/ioBroker/ioBroker.js-controller/blob/73031bf7/packages/types-dev/objects.d.ts#L677)
