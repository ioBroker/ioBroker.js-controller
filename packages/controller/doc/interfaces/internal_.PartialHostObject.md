[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialHostObject

# Interface: PartialHostObject

[<internal>](../modules/internal_.md).PartialHostObject

Make all properties in T optional

## Hierarchy

- [`Partial`](../modules/internal_.md#partial)<[`Omit`](../modules/internal_.md#omit)<[`HostObject`](internal_.HostObject.md), ``"common"`` \| ``"native"``\>\>

  ↳ **`PartialHostObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialHostObject.md#_id)
- [acl](internal_.PartialHostObject.md#acl)
- [common](internal_.PartialHostObject.md#common)
- [enums](internal_.PartialHostObject.md#enums)
- [from](internal_.PartialHostObject.md#from)
- [native](internal_.PartialHostObject.md#native)
- [ts](internal_.PartialHostObject.md#ts)
- [type](internal_.PartialHostObject.md#type)
- [user](internal_.PartialHostObject.md#user)

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

• `Optional` **common**: [`Partial`](../modules/internal_.md#partial)<[`HostCommon`](internal_.HostCommon.md)\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:622

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

• `Optional` **native**: [`Partial`](../modules/internal_.md#partial)<[`HostNative`](internal_.HostNative.md)\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:623

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

node_modules/@types/iobroker/objects.d.ts:541

___

### type

• `Optional` **type**: ``"host"``

#### Inherited from

Partial.type

#### Defined in

node_modules/@types/iobroker/objects.d.ts:617

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

node_modules/@types/iobroker/objects.d.ts:540
