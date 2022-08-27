[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / InstanceObject

# Interface: InstanceObject

[<internal>](../modules/internal_.md).InstanceObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`InstanceObject`**

## Table of contents

### Properties

- [\_id](internal_.InstanceObject.md#_id)
- [acl](internal_.InstanceObject.md#acl)
- [common](internal_.InstanceObject.md#common)
- [enums](internal_.InstanceObject.md#enums)
- [from](internal_.InstanceObject.md#from)
- [native](internal_.InstanceObject.md#native)
- [ts](internal_.InstanceObject.md#ts)
- [type](internal_.InstanceObject.md#type)
- [user](internal_.InstanceObject.md#user)

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

• **common**: [`InstanceCommon`](internal_.InstanceCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:598

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

### ts

• `Optional` **ts**: `number`

#### Inherited from

[BaseObject](internal_.BaseObject.md).[ts](internal_.BaseObject.md#ts)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:541

___

### type

• **type**: ``"instance"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:597

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:540
