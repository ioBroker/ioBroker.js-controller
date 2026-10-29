[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / BaseObject

# Interface: BaseObject

Defined in: [types-dev/objects.d.ts:1033](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L1033)

## Extended by

- [`EnumObject`](EnumObject.md)
- [`InstanceObject`](InstanceObject.md)
- [`AdapterObject`](AdapterObject.md)
- [`ChannelObject`](ChannelObject.md)
- [`MetaObject`](MetaObject.md)
- [`FolderObject`](FolderObject.md)
- [`DeviceObject`](DeviceObject.md)
- [`StateObject`](StateObject.md)
- [`ScriptObject`](ScriptObject.md)
- [`GroupObject`](GroupObject.md)
- [`UserObject`](UserObject.md)
- [`HostObject`](HostObject.md)
- [`RepositoryObject`](RepositoryObject.md)
- [`OtherObject`](OtherObject.md)
- [`ChartObject`](ChartObject.md)
- [`ScheduleObject`](ScheduleObject.md)
- [`SystemConfigObject`](SystemConfigObject.md)

## Properties

### \_id

> **\_id**: `string`

Defined in: [types-dev/objects.d.ts:1035](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L1035)

The ID of this object

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1042](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L1042)

***

### common

> **common**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1040](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L1040)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1041](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L1041)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1043](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L1043)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1039](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L1039)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1048](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L1048)

These properties can only be edited if the correct password is provided

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1046](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L1046)

***

### type

> **type**: [`ObjectType`](../type-aliases/ObjectType.md)

Defined in: [types-dev/objects.d.ts:1036](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L1036)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1045](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/objects.d.ts#L1045)

The user who created or updated this object
