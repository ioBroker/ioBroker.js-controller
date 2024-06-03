[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / BaseObject

# Interface: BaseObject

[\<internal\>](../modules/internal_.md).BaseObject

## Hierarchy

- **`BaseObject`**

  ↳ [`StateObject`](internal_.StateObject.md)

  ↳ [`DeviceObject`](internal_.DeviceObject.md)

  ↳ [`ChannelObject`](internal_.ChannelObject.md)

  ↳ [`FolderObject`](internal_.FolderObject.md)

  ↳ [`MetaObject`](internal_.MetaObject.md)

  ↳ [`EnumObject`](internal_.EnumObject.md)

  ↳ [`HostObject`](internal_.HostObject.md)

  ↳ [`AdapterObject`](internal_.AdapterObject.md)

  ↳ [`InstanceObject`](internal_.InstanceObject.md)

  ↳ [`UserObject`](internal_.UserObject.md)

  ↳ [`GroupObject`](internal_.GroupObject.md)

  ↳ [`ScriptObject`](internal_.ScriptObject.md)

  ↳ [`ChartObject`](internal_.ChartObject.md)

  ↳ [`ScheduleObject`](internal_.ScheduleObject.md)

  ↳ [`RepositoryObject`](internal_.RepositoryObject.md)

  ↳ [`OtherObject`](internal_.OtherObject.md)

  ↳ [`SystemConfigObject`](internal_.SystemConfigObject.md)

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

[types-dev/objects.d.ts:826](https://github.com/ioBroker/ioBroker.js-controller/blob/3deca26fa44043f003a1a0b2a2f9fc7a9d2ca7ae/packages/types-dev/objects.d.ts#L826)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Defined in

[types-dev/objects.d.ts:833](https://github.com/ioBroker/ioBroker.js-controller/blob/3deca26fa44043f003a1a0b2a2f9fc7a9d2ca7ae/packages/types-dev/objects.d.ts#L833)

___

### common

• **common**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:831](https://github.com/ioBroker/ioBroker.js-controller/blob/3deca26fa44043f003a1a0b2a2f9fc7a9d2ca7ae/packages/types-dev/objects.d.ts#L831)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Defined in

[types-dev/objects.d.ts:832](https://github.com/ioBroker/ioBroker.js-controller/blob/3deca26fa44043f003a1a0b2a2f9fc7a9d2ca7ae/packages/types-dev/objects.d.ts#L832)

___

### from

• `Optional` **from**: `string`

#### Defined in

[types-dev/objects.d.ts:834](https://github.com/ioBroker/ioBroker.js-controller/blob/3deca26fa44043f003a1a0b2a2f9fc7a9d2ca7ae/packages/types-dev/objects.d.ts#L834)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:830](https://github.com/ioBroker/ioBroker.js-controller/blob/3deca26fa44043f003a1a0b2a2f9fc7a9d2ca7ae/packages/types-dev/objects.d.ts#L830)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Defined in

[types-dev/objects.d.ts:839](https://github.com/ioBroker/ioBroker.js-controller/blob/3deca26fa44043f003a1a0b2a2f9fc7a9d2ca7ae/packages/types-dev/objects.d.ts#L839)

___

### ts

• `Optional` **ts**: `number`

#### Defined in

[types-dev/objects.d.ts:837](https://github.com/ioBroker/ioBroker.js-controller/blob/3deca26fa44043f003a1a0b2a2f9fc7a9d2ca7ae/packages/types-dev/objects.d.ts#L837)

___

### type

• **type**: [`ObjectType`](../modules/internal_.md#objecttype)

#### Defined in

[types-dev/objects.d.ts:827](https://github.com/ioBroker/ioBroker.js-controller/blob/3deca26fa44043f003a1a0b2a2f9fc7a9d2ca7ae/packages/types-dev/objects.d.ts#L827)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Defined in

[types-dev/objects.d.ts:836](https://github.com/ioBroker/ioBroker.js-controller/blob/3deca26fa44043f003a1a0b2a2f9fc7a9d2ca7ae/packages/types-dev/objects.d.ts#L836)
