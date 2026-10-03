[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / BaseObject

# Interface: BaseObject

Defined in: [types-dev/objects.d.ts:987](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L987)

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

Defined in: [types-dev/objects.d.ts:989](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L989)

The ID of this object

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:996](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L996)

***

### common

> **common**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:994](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L994)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:995](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L995)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:997](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L997)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:993](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L993)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1002](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1002)

These properties can only be edited if the correct password is provided

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1000](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L1000)

***

### type

> **type**: [`ObjectType`](../type-aliases/ObjectType.md)

Defined in: [types-dev/objects.d.ts:990](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L990)

***

### user?

> `optional` **user?**: `string`

Defined in: [types-dev/objects.d.ts:999](https://github.com/ioBroker/ioBroker.js-controller/blob/358e450ca3e15f75b0260e31130214f7e9618d91/packages/types-dev/objects.d.ts#L999)

The user who created or updated this object
