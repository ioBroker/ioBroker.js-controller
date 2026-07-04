[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / BaseObject

# Interface: BaseObject

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/objects.d.ts#L995)

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

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/objects.d.ts#L997)

The ID of this object

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1004](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/objects.d.ts#L1004)

***

### common

> **common**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1002](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/objects.d.ts#L1002)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1003](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/objects.d.ts#L1003)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1005](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/objects.d.ts#L1005)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1001](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/objects.d.ts#L1001)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1010](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/objects.d.ts#L1010)

These properties can only be edited if the correct password is provided

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1008](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/objects.d.ts#L1008)

***

### type

> **type**: [`ObjectType`](../type-aliases/ObjectType.md)

Defined in: [types-dev/objects.d.ts:998](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/objects.d.ts#L998)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1007](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/objects.d.ts#L1007)

The user who created or updated this object
