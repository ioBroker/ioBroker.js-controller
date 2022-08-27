[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / UserObject

# Interface: UserObject

[<internal>](../modules/internal_.md).UserObject

## Hierarchy

- [`BaseObject`](internal_.BaseObject.md)

  ↳ **`UserObject`**

## Table of contents

### Properties

- [\_id](internal_.UserObject.md#_id)
- [acl](internal_.UserObject.md#acl)
- [common](internal_.UserObject.md#common)
- [enums](internal_.UserObject.md#enums)
- [from](internal_.UserObject.md#from)
- [native](internal_.UserObject.md#native)
- [ts](internal_.UserObject.md#ts)
- [type](internal_.UserObject.md#type)
- [user](internal_.UserObject.md#user)

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

• **common**: [`UserCommon`](internal_.UserCommon.md)

#### Overrides

[BaseObject](internal_.BaseObject.md).[common](internal_.BaseObject.md#common)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:628

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

• **type**: ``"user"``

#### Overrides

[BaseObject](internal_.BaseObject.md).[type](internal_.BaseObject.md#type)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:627

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Inherited from

[BaseObject](internal_.BaseObject.md).[user](internal_.BaseObject.md#user)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:540
