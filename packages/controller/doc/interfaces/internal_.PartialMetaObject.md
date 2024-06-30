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

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/f2a3be78f776ca603f69da1c766b390d89e943cc/packages/types-dev/objects.d.ts#L832)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/f2a3be78f776ca603f69da1c766b390d89e943cc/packages/types-dev/objects.d.ts#L839)

___

### common

• `Optional` **common**: `Partial`\<[`MetaCommon`](internal_.MetaCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:902](https://github.com/ioBroker/ioBroker.js-controller/blob/f2a3be78f776ca603f69da1c766b390d89e943cc/packages/types-dev/objects.d.ts#L902)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:838](https://github.com/ioBroker/ioBroker.js-controller/blob/f2a3be78f776ca603f69da1c766b390d89e943cc/packages/types-dev/objects.d.ts#L838)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:840](https://github.com/ioBroker/ioBroker.js-controller/blob/f2a3be78f776ca603f69da1c766b390d89e943cc/packages/types-dev/objects.d.ts#L840)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/f2a3be78f776ca603f69da1c766b390d89e943cc/packages/types-dev/objects.d.ts#L836)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:845](https://github.com/ioBroker/ioBroker.js-controller/blob/f2a3be78f776ca603f69da1c766b390d89e943cc/packages/types-dev/objects.d.ts#L845)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:843](https://github.com/ioBroker/ioBroker.js-controller/blob/f2a3be78f776ca603f69da1c766b390d89e943cc/packages/types-dev/objects.d.ts#L843)

___

### type

• `Optional` **type**: ``"meta"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:897](https://github.com/ioBroker/ioBroker.js-controller/blob/f2a3be78f776ca603f69da1c766b390d89e943cc/packages/types-dev/objects.d.ts#L897)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:842](https://github.com/ioBroker/ioBroker.js-controller/blob/f2a3be78f776ca603f69da1c766b390d89e943cc/packages/types-dev/objects.d.ts#L842)
