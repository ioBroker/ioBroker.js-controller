[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialOtherObject

# Interface: PartialOtherObject

[<internal>](../modules/internal_.md).PartialOtherObject

Make all properties in T optional

## Hierarchy

- [`Partial`](../modules/internal_.md#partial)<[`Omit`](../modules/internal_.md#omit)<[`OtherObject`](internal_.OtherObject.md), ``"common"``\>\>

  ↳ **`PartialOtherObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialOtherObject.md#_id)
- [acl](internal_.PartialOtherObject.md#acl)
- [common](internal_.PartialOtherObject.md#common)
- [enums](internal_.PartialOtherObject.md#enums)
- [from](internal_.PartialOtherObject.md#from)
- [native](internal_.PartialOtherObject.md#native)
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

node_modules/@types/iobroker/objects.d.ts:530

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

Partial.acl

#### Defined in

node_modules/@types/iobroker/objects.d.ts:537

___

### common

• `Optional` **common**: [`Partial`](../modules/internal_.md#partial)<[`OtherCommon`](internal_.OtherCommon.md)\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:655

___

### enums

• `Optional` **enums**: [`Record`](../modules/internal_.md#record)<`string`, `string`\>

#### Inherited from

Partial.enums

#### Defined in

node_modules/@types/iobroker/objects.d.ts:536

___

### from

• `Optional` **from**: `string`

#### Inherited from

Partial.from

#### Defined in

node_modules/@types/iobroker/objects.d.ts:538

___

### native

• `Optional` **native**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Inherited from

Partial.native

#### Defined in

node_modules/@types/iobroker/objects.d.ts:534

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

node_modules/@types/iobroker/objects.d.ts:541

___

### type

• `Optional` **type**: ``"config"`` \| ``"chart"``

#### Inherited from

Partial.type

#### Defined in

node_modules/@types/iobroker/objects.d.ts:651

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

node_modules/@types/iobroker/objects.d.ts:540
