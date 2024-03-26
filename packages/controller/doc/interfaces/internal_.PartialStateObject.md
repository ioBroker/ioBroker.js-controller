[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialStateObject

# Interface: PartialStateObject

[\<internal\>](../modules/internal_.md).PartialStateObject

## Hierarchy

- `Partial`\<`Omit`\<[`StateObject`](internal_.StateObject.md), ``"common"`` \| ``"acl"``\>\>

  ↳ **`PartialStateObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialStateObject.md#_id)
- [acl](internal_.PartialStateObject.md#acl)
- [common](internal_.PartialStateObject.md#common)
- [enums](internal_.PartialStateObject.md#enums)
- [from](internal_.PartialStateObject.md#from)
- [native](internal_.PartialStateObject.md#native)
- [nonEdit](internal_.PartialStateObject.md#nonedit)
- [ts](internal_.PartialStateObject.md#ts)
- [type](internal_.PartialStateObject.md#type)
- [user](internal_.PartialStateObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:781](https://github.com/ioBroker/ioBroker.js-controller/blob/1f96ea5e/packages/types-dev/objects.d.ts#L781)

___

### acl

• `Optional` **acl**: `Partial`\<[`StateACL`](internal_.StateACL.md)\>

#### Defined in

[types-dev/objects.d.ts:805](https://github.com/ioBroker/ioBroker.js-controller/blob/1f96ea5e/packages/types-dev/objects.d.ts#L805)

___

### common

• `Optional` **common**: `Partial`\<[`StateCommon`](internal_.StateCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:804](https://github.com/ioBroker/ioBroker.js-controller/blob/1f96ea5e/packages/types-dev/objects.d.ts#L804)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:787](https://github.com/ioBroker/ioBroker.js-controller/blob/1f96ea5e/packages/types-dev/objects.d.ts#L787)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:789](https://github.com/ioBroker/ioBroker.js-controller/blob/1f96ea5e/packages/types-dev/objects.d.ts#L789)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:785](https://github.com/ioBroker/ioBroker.js-controller/blob/1f96ea5e/packages/types-dev/objects.d.ts#L785)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:794](https://github.com/ioBroker/ioBroker.js-controller/blob/1f96ea5e/packages/types-dev/objects.d.ts#L794)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:792](https://github.com/ioBroker/ioBroker.js-controller/blob/1f96ea5e/packages/types-dev/objects.d.ts#L792)

___

### type

• `Optional` **type**: ``"state"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:798](https://github.com/ioBroker/ioBroker.js-controller/blob/1f96ea5e/packages/types-dev/objects.d.ts#L798)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:791](https://github.com/ioBroker/ioBroker.js-controller/blob/1f96ea5e/packages/types-dev/objects.d.ts#L791)
