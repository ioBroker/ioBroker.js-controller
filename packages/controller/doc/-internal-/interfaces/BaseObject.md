[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / BaseObject

# Interface: BaseObject

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L997)

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

Defined in: [types-dev/objects.d.ts:999](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L999)

The ID of this object

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1006](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1006)

***

### common

> **common**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1004](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1004)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1005](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1005)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1007](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1007)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1003](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1003)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1012](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1012)

These properties can only be edited if the correct password is provided

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1010](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1010)

***

### type

> **type**: [`ObjectType`](../type-aliases/ObjectType.md)

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1000)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1009](https://github.com/ioBroker/ioBroker.js-controller/blob/145a7ac703ef8c4a61ce27a72337ddb9e2049038/packages/types-dev/objects.d.ts#L1009)

The user who created or updated this object
