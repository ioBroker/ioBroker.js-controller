[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / BaseObject

# Interface: BaseObject

[<internal>](../modules/internal_.md).BaseObject

## Hierarchy

- **`BaseObject`**

  ↳ [`GroupObject`](internal_.GroupObject.md)

  ↳ [`InstanceObject`](internal_.InstanceObject.md)

  ↳ [`DeviceObject`](internal_.DeviceObject.md)

  ↳ [`ChannelObject`](internal_.ChannelObject.md)

  ↳ [`StateObject`](internal_.StateObject.md)

  ↳ [`FolderObject`](internal_.FolderObject.md)

  ↳ [`EnumObject`](internal_.EnumObject.md)

  ↳ [`MetaObject`](internal_.MetaObject.md)

  ↳ [`HostObject`](internal_.HostObject.md)

  ↳ [`AdapterObject`](internal_.AdapterObject.md)

  ↳ [`UserObject`](internal_.UserObject.md)

  ↳ [`ScriptObject`](internal_.ScriptObject.md)

  ↳ [`OtherObject`](internal_.OtherObject.md)

## Table of contents

### Properties

- [\_id](internal_.BaseObject.md#_id)
- [acl](internal_.BaseObject.md#acl)
- [common](internal_.BaseObject.md#common)
- [enums](internal_.BaseObject.md#enums)
- [from](internal_.BaseObject.md#from)
- [native](internal_.BaseObject.md#native)
- [ts](internal_.BaseObject.md#ts)
- [type](internal_.BaseObject.md#type)
- [user](internal_.BaseObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Defined in

node_modules/@types/iobroker/objects.d.ts:530

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:537

___

### common

• **common**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:535

___

### enums

• `Optional` **enums**: [`Record`](../modules/internal_.md#record)<`string`, `string`\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:536

___

### from

• `Optional` **from**: `string`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:538

___

### native

• **native**: [`Record`](../modules/internal_.md#record)<`string`, `any`\>

#### Defined in

node_modules/@types/iobroker/objects.d.ts:534

___

### ts

• `Optional` **ts**: `number`

#### Defined in

node_modules/@types/iobroker/objects.d.ts:541

___

### type

• **type**: [`ObjectType`](../modules/internal_.md#objecttype)

#### Defined in

node_modules/@types/iobroker/objects.d.ts:531

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Defined in

node_modules/@types/iobroker/objects.d.ts:540
