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

[types/objects.d.ts:554](https://github.com/ioBroker/ioBroker.js-controller/blob/6912de44/packages/types/objects.d.ts#L554)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Defined in

[types/objects.d.ts:561](https://github.com/ioBroker/ioBroker.js-controller/blob/6912de44/packages/types/objects.d.ts#L561)

___

### common

• **common**: `Record`<`string`, `any`\>

#### Defined in

[types/objects.d.ts:559](https://github.com/ioBroker/ioBroker.js-controller/blob/6912de44/packages/types/objects.d.ts#L559)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Defined in

[types/objects.d.ts:560](https://github.com/ioBroker/ioBroker.js-controller/blob/6912de44/packages/types/objects.d.ts#L560)

___

### from

• `Optional` **from**: `string`

#### Defined in

[types/objects.d.ts:562](https://github.com/ioBroker/ioBroker.js-controller/blob/6912de44/packages/types/objects.d.ts#L562)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Defined in

[types/objects.d.ts:558](https://github.com/ioBroker/ioBroker.js-controller/blob/6912de44/packages/types/objects.d.ts#L558)

___

### ts

• `Optional` **ts**: `number`

#### Defined in

[types/objects.d.ts:565](https://github.com/ioBroker/ioBroker.js-controller/blob/6912de44/packages/types/objects.d.ts#L565)

___

### type

• **type**: [`ObjectType`](../modules/internal_.md#objecttype)

#### Defined in

[types/objects.d.ts:555](https://github.com/ioBroker/ioBroker.js-controller/blob/6912de44/packages/types/objects.d.ts#L555)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Defined in

[types/objects.d.ts:564](https://github.com/ioBroker/ioBroker.js-controller/blob/6912de44/packages/types/objects.d.ts#L564)
