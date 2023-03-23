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

  ↳ [`ChartObject`](internal_.ChartObject.md)

  ↳ [`ScheduleObject`](internal_.ScheduleObject.md)

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

[types-dev/objects.d.ts:586](https://github.com/ioBroker/ioBroker.js-controller/blob/6ba47816/packages/types-dev/objects.d.ts#L586)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Defined in

[types-dev/objects.d.ts:593](https://github.com/ioBroker/ioBroker.js-controller/blob/6ba47816/packages/types-dev/objects.d.ts#L593)

___

### common

• **common**: `Record`<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:591](https://github.com/ioBroker/ioBroker.js-controller/blob/6ba47816/packages/types-dev/objects.d.ts#L591)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Defined in

[types-dev/objects.d.ts:592](https://github.com/ioBroker/ioBroker.js-controller/blob/6ba47816/packages/types-dev/objects.d.ts#L592)

___

### from

• `Optional` **from**: `string`

#### Defined in

[types-dev/objects.d.ts:594](https://github.com/ioBroker/ioBroker.js-controller/blob/6ba47816/packages/types-dev/objects.d.ts#L594)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:590](https://github.com/ioBroker/ioBroker.js-controller/blob/6ba47816/packages/types-dev/objects.d.ts#L590)

___

### ts

• `Optional` **ts**: `number`

#### Defined in

[types-dev/objects.d.ts:597](https://github.com/ioBroker/ioBroker.js-controller/blob/6ba47816/packages/types-dev/objects.d.ts#L597)

___

### type

• **type**: [`ObjectType`](../modules/internal_.md#objecttype)

#### Defined in

[types-dev/objects.d.ts:587](https://github.com/ioBroker/ioBroker.js-controller/blob/6ba47816/packages/types-dev/objects.d.ts#L587)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Defined in

[types-dev/objects.d.ts:596](https://github.com/ioBroker/ioBroker.js-controller/blob/6ba47816/packages/types-dev/objects.d.ts#L596)
