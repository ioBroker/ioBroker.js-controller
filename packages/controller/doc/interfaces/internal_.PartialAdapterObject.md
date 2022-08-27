[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / PartialAdapterObject

# Interface: PartialAdapterObject

[<internal>](../modules/internal_.md).PartialAdapterObject

Make all properties in T optional

## Hierarchy

- [`Partial`](../modules/internal_.md#partial)<[`Omit`](../modules/internal_.md#omit)<[`AdapterObject`](internal_.AdapterObject.md), ``"common"``\>\>

  ↳ **`PartialAdapterObject`**

## Table of contents

### Properties

- [\_id](internal_.PartialAdapterObject.md#_id)
- [acl](internal_.PartialAdapterObject.md#acl)
- [common](internal_.PartialAdapterObject.md#common)
- [encryptedNative](internal_.PartialAdapterObject.md#encryptednative)
- [enums](internal_.PartialAdapterObject.md#enums)
- [from](internal_.PartialAdapterObject.md#from)
- [native](internal_.PartialAdapterObject.md#native)
- [protectedNative](internal_.PartialAdapterObject.md#protectednative)
- [ts](internal_.PartialAdapterObject.md#ts)
- [type](internal_.PartialAdapterObject.md#type)
- [user](internal_.PartialAdapterObject.md#user)

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

• `Optional` **common**: [`Partial`](../modules/internal_.md#partial)<[`AdapterCommon`](internal_.AdapterCommon.md)\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:613

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Inherited from

Partial.encryptedNative

#### Defined in

node_modules/@types/iobroker/objects.d.ts:610

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

### protectedNative

• `Optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Inherited from

Partial.protectedNative

#### Defined in

node_modules/@types/iobroker/objects.d.ts:608

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

Partial.ts

#### Defined in

node_modules/@types/iobroker/objects.d.ts:541

___

### type

• `Optional` **type**: ``"adapter"``

#### Inherited from

Partial.type

#### Defined in

node_modules/@types/iobroker/objects.d.ts:605

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

Partial.user

#### Defined in

node_modules/@types/iobroker/objects.d.ts:540
