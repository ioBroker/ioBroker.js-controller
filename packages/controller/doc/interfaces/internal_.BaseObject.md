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
- [nonEdit](internal_.BaseObject.md#nonedit)
- [ts](internal_.BaseObject.md#ts)
- [type](internal_.BaseObject.md#type)
- [user](internal_.BaseObject.md#user)

## Properties

### \_id

• **\_id**: `string`

The ID of this object

#### Defined in

[types-dev/objects.d.ts:608](https://github.com/ioBroker/ioBroker.js-controller/blob/d22bbffe/packages/types-dev/objects.d.ts#L608)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Defined in

[types-dev/objects.d.ts:615](https://github.com/ioBroker/ioBroker.js-controller/blob/d22bbffe/packages/types-dev/objects.d.ts#L615)

___

### common

• **common**: `Record`<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:613](https://github.com/ioBroker/ioBroker.js-controller/blob/d22bbffe/packages/types-dev/objects.d.ts#L613)

___

### enums

• `Optional` **enums**: `Record`<`string`, `string`\>

#### Defined in

[types-dev/objects.d.ts:614](https://github.com/ioBroker/ioBroker.js-controller/blob/d22bbffe/packages/types-dev/objects.d.ts#L614)

___

### from

• `Optional` **from**: `string`

#### Defined in

[types-dev/objects.d.ts:616](https://github.com/ioBroker/ioBroker.js-controller/blob/d22bbffe/packages/types-dev/objects.d.ts#L616)

___

### native

• **native**: `Record`<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:612](https://github.com/ioBroker/ioBroker.js-controller/blob/d22bbffe/packages/types-dev/objects.d.ts#L612)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Defined in

[types-dev/objects.d.ts:621](https://github.com/ioBroker/ioBroker.js-controller/blob/d22bbffe/packages/types-dev/objects.d.ts#L621)

___

### ts

• `Optional` **ts**: `number`

#### Defined in

[types-dev/objects.d.ts:619](https://github.com/ioBroker/ioBroker.js-controller/blob/d22bbffe/packages/types-dev/objects.d.ts#L619)

___

### type

• **type**: [`ObjectType`](../modules/internal_.md#objecttype)

#### Defined in

[types-dev/objects.d.ts:609](https://github.com/ioBroker/ioBroker.js-controller/blob/d22bbffe/packages/types-dev/objects.d.ts#L609)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Defined in

[types-dev/objects.d.ts:618](https://github.com/ioBroker/ioBroker.js-controller/blob/d22bbffe/packages/types-dev/objects.d.ts#L618)
