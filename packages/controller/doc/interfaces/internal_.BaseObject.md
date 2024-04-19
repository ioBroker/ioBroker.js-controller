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

[types-dev/objects.d.ts:781](https://github.com/ioBroker/ioBroker.js-controller/blob/d343afbb/packages/types-dev/objects.d.ts#L781)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Defined in

[types-dev/objects.d.ts:788](https://github.com/ioBroker/ioBroker.js-controller/blob/d343afbb/packages/types-dev/objects.d.ts#L788)

___

### common

• **common**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:786](https://github.com/ioBroker/ioBroker.js-controller/blob/d343afbb/packages/types-dev/objects.d.ts#L786)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Defined in

[types-dev/objects.d.ts:787](https://github.com/ioBroker/ioBroker.js-controller/blob/d343afbb/packages/types-dev/objects.d.ts#L787)

___

### from

• `Optional` **from**: `string`

#### Defined in

[types-dev/objects.d.ts:789](https://github.com/ioBroker/ioBroker.js-controller/blob/d343afbb/packages/types-dev/objects.d.ts#L789)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:785](https://github.com/ioBroker/ioBroker.js-controller/blob/d343afbb/packages/types-dev/objects.d.ts#L785)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Defined in

[types-dev/objects.d.ts:794](https://github.com/ioBroker/ioBroker.js-controller/blob/d343afbb/packages/types-dev/objects.d.ts#L794)

___

### ts

• `Optional` **ts**: `number`

#### Defined in

[types-dev/objects.d.ts:792](https://github.com/ioBroker/ioBroker.js-controller/blob/d343afbb/packages/types-dev/objects.d.ts#L792)

___

### type

• **type**: [`ObjectType`](../modules/internal_.md#objecttype)

#### Defined in

[types-dev/objects.d.ts:782](https://github.com/ioBroker/ioBroker.js-controller/blob/d343afbb/packages/types-dev/objects.d.ts#L782)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Defined in

[types-dev/objects.d.ts:791](https://github.com/ioBroker/ioBroker.js-controller/blob/d343afbb/packages/types-dev/objects.d.ts#L791)
