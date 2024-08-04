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

[types-dev/objects.d.ts:860](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L860)

___

### acl

• `Optional` **acl**: [`ObjectACL`](internal_.ObjectACL.md)

#### Defined in

[types-dev/objects.d.ts:867](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L867)

___

### common

• **common**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:865](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L865)

___

### enums

• `Optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../modules/internal_.md#translated)\>

#### Defined in

[types-dev/objects.d.ts:866](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L866)

___

### from

• `Optional` **from**: `string`

#### Defined in

[types-dev/objects.d.ts:868](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L868)

___

### native

• **native**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:864](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L864)

___

### nonEdit

• `Optional` **nonEdit**: [`NonEditable`](internal_.NonEditable.md)

These properties can only be edited if the correct password is provided

#### Defined in

[types-dev/objects.d.ts:873](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L873)

___

### ts

• `Optional` **ts**: `number`

#### Defined in

[types-dev/objects.d.ts:871](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L871)

___

### type

• **type**: [`ObjectType`](../modules/internal_.md#objecttype)

#### Defined in

[types-dev/objects.d.ts:861](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L861)

___

### user

• `Optional` **user**: `string`

The user who created or updated this object

#### Defined in

[types-dev/objects.d.ts:870](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/types-dev/objects.d.ts#L870)
