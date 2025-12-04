[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / BaseObject

# Interface: BaseObject

## Extended by

- [`StateObject`](StateObject.md)
- [`DeviceObject`](DeviceObject.md)
- [`ChannelObject`](ChannelObject.md)
- [`FolderObject`](FolderObject.md)
- [`MetaObject`](MetaObject.md)
- [`EnumObject`](EnumObject.md)
- [`HostObject`](HostObject.md)
- [`AdapterObject`](AdapterObject.md)
- [`InstanceObject`](InstanceObject.md)
- [`UserObject`](UserObject.md)
- [`GroupObject`](GroupObject.md)
- [`ScriptObject`](ScriptObject.md)
- [`ChartObject`](ChartObject.md)
- [`ScheduleObject`](ScheduleObject.md)
- [`RepositoryObject`](RepositoryObject.md)
- [`OtherObject`](OtherObject.md)
- [`SystemConfigObject`](SystemConfigObject.md)

## Properties

### \_id

> **\_id**: `string`

The ID of this object

#### Defined in

[types-dev/objects.d.ts:959](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/objects.d.ts#L959)

***

### acl?

> `optional` **acl**: [`ObjectACL`](ObjectACL.md)

#### Defined in

[types-dev/objects.d.ts:966](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/objects.d.ts#L966)

***

### common

> **common**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:964](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/objects.d.ts#L964)

***

### enums?

> `optional` **enums**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

#### Defined in

[types-dev/objects.d.ts:965](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/objects.d.ts#L965)

***

### from?

> `optional` **from**: `string`

#### Defined in

[types-dev/objects.d.ts:967](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/objects.d.ts#L967)

***

### native

> **native**: `Record`\<`string`, `any`\>

#### Defined in

[types-dev/objects.d.ts:963](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/objects.d.ts#L963)

***

### nonEdit?

> `optional` **nonEdit**: [`NonEditable`](NonEditable.md)

These properties can only be edited if the correct password is provided

#### Defined in

[types-dev/objects.d.ts:972](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/objects.d.ts#L972)

***

### ts?

> `optional` **ts**: `number`

#### Defined in

[types-dev/objects.d.ts:970](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/objects.d.ts#L970)

***

### type

> **type**: [`ObjectType`](../type-aliases/ObjectType.md)

#### Defined in

[types-dev/objects.d.ts:960](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/objects.d.ts#L960)

***

### user?

> `optional` **user**: `string`

The user who created or updated this object

#### Defined in

[types-dev/objects.d.ts:969](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/objects.d.ts#L969)
