[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialUserObject

# Interface: PartialUserObject

[\<internal\>](../modules/internal_.md).PartialUserObject

## Hierarchy

- `Partial`\<`Omit`\<[`UserObject`](internal_.UserObject.md), ``"common"``\>\>

  ↳ **`PartialUserObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialUserObject.md#_id)
- [acl](internal_.PartialUserObject.md#acl)
- [common](internal_.PartialUserObject.md#common)
- [enums](internal_.PartialUserObject.md#enums)
- [from](internal_.PartialUserObject.md#from)
- [native](internal_.PartialUserObject.md#native)
- [nonEdit](internal_.PartialUserObject.md#nonedit)
- [ts](internal_.PartialUserObject.md#ts)
- [type](internal_.PartialUserObject.md#type)
- [user](internal_.PartialUserObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: \`system.user.$\{string}\`

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/objects.d.ts#L997)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:802](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/objects.d.ts#L802)

___

### common

• `Optional` **common**: `Partial`\<[`UserCommon`](internal_.UserCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1003](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/objects.d.ts#L1003)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:801](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/objects.d.ts#L801)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:803](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/objects.d.ts#L803)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:799](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/objects.d.ts#L799)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:808](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/objects.d.ts#L808)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:806](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/objects.d.ts#L806)

___

### type

• `Optional` **type**: ``"user"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:998](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/objects.d.ts#L998)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:805](https://github.com/ioBroker/ioBroker.js-controller/blob/e4f9cfa5/packages/types-dev/objects.d.ts#L805)
