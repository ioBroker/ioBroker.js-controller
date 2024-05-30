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

[types-dev/objects.d.ts:1032](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L1032)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:833](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L833)

___

### common

• `Optional` **common**: `Partial`\<[`UserCommon`](internal_.UserCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1038](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L1038)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L832)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L834)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L830)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L839)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:837](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L837)

___

### type

• `Optional` **type**: ``"user"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:1033](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L1033)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/b38e017469404c79bd0d8ccdfa858a2754d65823/packages/types-dev/objects.d.ts#L836)
