[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / BaseObject

# Interface: BaseObject

Defined in: [types-dev/objects.d.ts:1084](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1084)

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

Defined in: [types-dev/objects.d.ts:1086](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1086)

The ID of this object

***

### acl?

> `optional` **acl?**: [`ObjectACL`](ObjectACL.md)

Defined in: [types-dev/objects.d.ts:1093](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1093)

***

### common

> **common**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1091](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1091)

***

### enums?

> `optional` **enums?**: `Record`\<`string`, `string` \| [`Translated`](../type-aliases/Translated.md)\>

Defined in: [types-dev/objects.d.ts:1092](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1092)

***

### from?

> `optional` **from?**: `string`

Defined in: [types-dev/objects.d.ts:1094](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1094)

***

### native

> **native**: `Record`\<`string`, `any`\>

Defined in: [types-dev/objects.d.ts:1090](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1090)

***

### nonEdit?

> `optional` **nonEdit?**: [`NonEditable`](NonEditable.md)

Defined in: [types-dev/objects.d.ts:1099](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1099)

These properties can only be edited if the correct password is provided

***

### ts?

> `optional` **ts?**: `number`

Defined in: [types-dev/objects.d.ts:1097](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1097)

***

### type

> **type**: [`ObjectType`](../type-aliases/ObjectType.md)

Defined in: [types-dev/objects.d.ts:1087](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1087)

***

### user?

> `optional` **user?**: `` `system.user.${string}` ``

Defined in: [types-dev/objects.d.ts:1096](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/objects.d.ts#L1096)

The user who created or updated this object
