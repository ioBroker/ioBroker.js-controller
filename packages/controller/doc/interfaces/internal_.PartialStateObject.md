[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialStateObject

# Interface: PartialStateObject

[<internal>](../modules/internal_.md).PartialStateObject

Make all properties in T optional

## Hierarchy

- [`Partial`](../modules/internal_.md#partial)<[`Omit`](../modules/internal_.md#omit)<[`StateObject`](internal_.StateObject.md), ``"common"`` \| ``"acl"``\>\>

  ↳ **`PartialStateObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialStateObject.md#_id)
- [acl](internal_.PartialStateObject.md#acl)
- [common](internal_.PartialStateObject.md#common)
- [enums](internal_.PartialStateObject.md#enums)
- [from](internal_.PartialStateObject.md#from)
- [native](internal_.PartialStateObject.md#native)
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

node_modules/@types/iobroker/objects.d.ts:530

___

### acl

• `Optional` **acl**: [`Partial`](../modules/internal_.md#partial)<[`StateACL`](internal_.StateACL.md)\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:551

___

### common

• `Optional` **common**: [`Partial`](../modules/internal_.md#partial)<[`StateCommon`](internal_.StateCommon.md)\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:550

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

• `Optional` **type**: ``"state"``

#### Inherited from

Partial.type

#### Defined in

node_modules/@types/iobroker/objects.d.ts:545

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

node_modules/@types/iobroker/objects.d.ts:540
