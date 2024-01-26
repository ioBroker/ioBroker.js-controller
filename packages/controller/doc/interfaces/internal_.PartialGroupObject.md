[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialGroupObject

# Interface: PartialGroupObject

[\<internal\>](../modules/internal_.md).PartialGroupObject

## Hierarchy

- `Partial`\<`Omit`\<[`GroupObject`](internal_.GroupObject.md), ``"common"``\>\>

  ↳ **`PartialGroupObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialGroupObject.md#_id)
- [acl](internal_.PartialGroupObject.md#acl)
- [common](internal_.PartialGroupObject.md#common)
- [enums](internal_.PartialGroupObject.md#enums)
- [from](internal_.PartialGroupObject.md#from)
- [native](internal_.PartialGroupObject.md#native)
- [nonEdit](internal_.PartialGroupObject.md#nonedit)
- [ts](internal_.PartialGroupObject.md#ts)
- [type](internal_.PartialGroupObject.md#type)
- [user](internal_.PartialGroupObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.group.$\{string}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:929](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L929)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:735](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L735)

___

### common

• `Optional` **common**: `Partial`\<[`GroupCommon`](internal_.GroupCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:934](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L934)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:734](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L734)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:736](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L736)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:732](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L732)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:741](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L741)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:739](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L739)

___

### type

• `Optional` **type**: ``"group"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:930](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L930)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:738](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L738)
