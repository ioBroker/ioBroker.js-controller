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

[types-dev/objects.d.ts:728](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L728)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Defined in

[types-dev/objects.d.ts:735](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L735)

___

### common

• **common**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:733](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L733)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Defined in

[types-dev/objects.d.ts:734](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L734)

___

### from

• `Optional` **from**: `string`

#### Defined in

[types-dev/objects.d.ts:736](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L736)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:732](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L732)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if correct password is provided

#### Defined in

[types-dev/objects.d.ts:741](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L741)

___

### ts

• `Optional` **ts**: `number`

#### Defined in

[types-dev/objects.d.ts:739](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L739)

___

### type

• **type**: [`ObjectType`](../modules/internal_.md#objecttype)

#### Defined in

[types-dev/objects.d.ts:729](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L729)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Defined in

[types-dev/objects.d.ts:738](https://github.com/ioBroker/ioBroker.js-controller/blob/ae4125d6/packages/types-dev/objects.d.ts#L738)
