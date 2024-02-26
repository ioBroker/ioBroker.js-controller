[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialOtherObject

# Interface: PartialOtherObject

[\<internal\>](../modules/internal_.md).PartialOtherObject

## Hierarchy

- `Partial`\<`Omit`\<[`OtherObject`](internal_.OtherObject.md), ``"common"``\>\>

  ↳ **`PartialOtherObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialOtherObject.md#_id)
- [acl](internal_.PartialOtherObject.md#acl)
- [common](internal_.PartialOtherObject.md#common)
- [enums](internal_.PartialOtherObject.md#enums)
- [from](internal_.PartialOtherObject.md#from)
- [native](internal_.PartialOtherObject.md#native)
- [nonEdit](internal_.PartialOtherObject.md#nonedit)
- [ts](internal_.PartialOtherObject.md#ts)
- [type](internal_.PartialOtherObject.md#type)
- [user](internal_.PartialOtherObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:761](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L761)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:768](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L768)

___

### common

• `Optional` **common**: `Partial`\<[`OtherCommon`](internal_.OtherCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1006](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L1006)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:767](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L767)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:769](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L769)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:765](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L765)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:774](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L774)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:772](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L772)

___

### type

• `Optional` **type**: ``"config"`` \| ``"chart"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:1001](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L1001)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:771](https://github.com/ioBroker/ioBroker.js-controller/blob/9b2b813d/packages/types-dev/objects.d.ts#L771)
