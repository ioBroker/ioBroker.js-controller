[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / AdapterObject

# Interface: AdapterObject

[<internal>](../modules/internal_.md).AdapterObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`AdapterObject`**

## Table of contents

### Properties

- [\_id](internal_.AdapterObject.md#_id)
- [acl](internal_.AdapterObject.md#acl)
- [common](internal_.AdapterObject.md#common)
- [encryptedNative](internal_.AdapterObject.md#encryptednative)
- [enums](internal_.AdapterObject.md#enums)
- [from](internal_.AdapterObject.md#from)
- [native](internal_.AdapterObject.md#native)
- [protectedNative](internal_.AdapterObject.md#protectednative)
- [ts](internal_.AdapterObject.md#ts)
- [type](internal_.AdapterObject.md#type)
- [user](internal_.AdapterObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[_id](internal_.BaseObject.md#_id)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:530

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Inherited from

[BaseObject](internal_.BaseObject.md).[acl](internal_.BaseObject.md#acl)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:537

___

### common

• **common**: [`AdapterCommon`](internal_.AdapterCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:606

___

### encryptedNative

• `Optional` **encryptedNative**: `string`[]

Like protectedNative, but the properties are also encrypted and decrypted automatically

#### Defined in

node_modules/@types/iobroker/objects.d.ts:610

___

### enums

• `Optional` **enums**: [`Record`](../modules/internal_.md#record)<`string`, `string`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[enums](internal_.BaseObject.md#enums)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:536

___

### from

• `Optional` **from**: `string`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[from](internal_.BaseObject.md#from)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:538

___

### native

• **native**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Inherited from

[BaseObject](internal_.BaseObject.md).[native](internal_.BaseObject.md#native)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:534

___

### protectedNative

• `Optional` **protectedNative**: `string`[]

An array of `native` properties which cannot be accessed from outside the defining adapter

#### Defined in

node_modules/@types/iobroker/objects.d.ts:608

___

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:541

___

### type

• **type**: ``"adapter"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:605

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:540
