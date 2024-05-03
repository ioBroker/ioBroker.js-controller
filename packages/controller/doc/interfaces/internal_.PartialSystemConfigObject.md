[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / PartialSystemConfigObject

# Interface: PartialSystemConfigObject

[\<internal\>](../modules/internal_.md).PartialSystemConfigObject

## Hierarchy

- `Partial`\<`Omit`\<[`SystemConfigObject`](internal_.SystemConfigObject.md), ``"common"``\>\>

  ↳ **`PartialSystemConfigObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialSystemConfigObject.md#_id)
- [acl](internal_.PartialSystemConfigObject.md#acl)
- [common](internal_.PartialSystemConfigObject.md#common)
- [enums](internal_.PartialSystemConfigObject.md#enums)
- [from](internal_.PartialSystemConfigObject.md#from)
- [native](internal_.PartialSystemConfigObject.md#native)
- [nonEdit](internal_.PartialSystemConfigObject.md#nonedit)
- [ts](internal_.PartialSystemConfigObject.md#ts)
- [type](internal_.PartialSystemConfigObject.md#type)
- [user](internal_.PartialSystemConfigObject.md#user)

## Properties

### \_id

• `Optional` **\_id**: `string`

The ID of this object

#### Inherited from

Partial.\_id

#### Defined in

[types-dev/objects.d.ts:802](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/objects.d.ts#L802)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

[types-dev/objects.d.ts:809](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/objects.d.ts#L809)

___

### common

• `Optional` **common**: `Partial`\<[`SystemConfigCommon`](internal_.SystemConfigCommon.md)\>

#### Defined in

[types-dev/objects.d.ts:1042](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/objects.d.ts#L1042)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Inherited from

Partial.enums

#### Defined in

[types-dev/objects.d.ts:808](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/objects.d.ts#L808)

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

[types-dev/objects.d.ts:810](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/objects.d.ts#L810)

___

### native

• `Optional` **native**: `Record`\<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

[types-dev/objects.d.ts:806](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/objects.d.ts#L806)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Inherited from

Partial.nonEdit

#### Defined in

[types-dev/objects.d.ts:815](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/objects.d.ts#L815)

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

[types-dev/objects.d.ts:813](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/objects.d.ts#L813)

___

### type

• `Optional` **type**: ``"config"``

#### Inherited from

Partial.type

#### Defined in

[types-dev/objects.d.ts:1037](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/objects.d.ts#L1037)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

[types-dev/objects.d.ts:812](https://github.com/ioBroker/ioBroker.js-controller/blob/e03492751/packages/types-dev/objects.d.ts#L812)
